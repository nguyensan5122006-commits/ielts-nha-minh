/**
 * gemini-client.ts
 * ----------------------------------------------------------------------------
 * Gọi Google Gemini (AI) để chấm bài. Code chạy trên server Cloudflare nên
 * khoá API không bao giờ lộ ra trình duyệt.
 *
 * - askGeminiForJson(): gửi đề + bài làm (chữ hoặc file ghi âm) -> nhận JSON
 * - countAiUsageOrReject(): mỗi người tối đa AI_DAILY_LIMIT lượt/ngày
 *
 * Tài liệu API: https://ai.google.dev/api/generate-content
 * ----------------------------------------------------------------------------
 */
import type { ServerEnvironment } from './server-environment'

/** 1 "mảnh" nội dung gửi cho Gemini: hoặc chữ, hoặc dữ liệu nhị phân (audio) dạng base64. */
export type GeminiPart = { text: string } | { inline_data: { mime_type: string; data: string } }

export class AiError extends Error {
  constructor(
    message: string,
    public status = 500,
  ) {
    super(message)
  }
}

/**
 * Gửi yêu cầu tới Gemini và ép kết quả trả về là JSON.
 * @param systemInstruction vai trò của AI (VD "Bạn là giám khảo IELTS...")
 * @param parts nội dung: đề bài, bài làm, audio...
 */
export async function askGeminiForJson<T>(env: ServerEnvironment, systemInstruction: string, parts: GeminiPart[]): Promise<T> {
  if (!env.GEMINI_API_KEY) {
    throw new AiError('Chưa cấu hình GEMINI_API_KEY trên máy chủ / Gemini API key is not set', 503)
  }
  // model chính + model dự phòng (nhẹ hơn, ít bị quá tải hơn)
  const models = [env.GEMINI_MODEL || 'gemini-flash-latest', env.GEMINI_FALLBACK_MODEL || 'gemini-flash-lite-latest']

  const requestBody = JSON.stringify({
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ role: 'user', parts }],
    generationConfig: {
      responseMimeType: 'application/json', // bắt Gemini trả về JSON thuần
      temperature: 0.3, // thấp = chấm ổn định, ít "sáng tạo"
    },
  })

  // Gemini thỉnh thoảng báo 500/503 "quá tải" trong chốc lát -> mỗi model thử tối đa 3 lần
  // (chờ 1s, 2s giữa các lần); model chính vẫn quá tải thì chuyển sang model dự phòng.
  let response!: Response
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY.trim() },
        body: requestBody,
      })
      if (response.status !== 500 && response.status !== 503) break
    }
    if (response.status !== 500 && response.status !== 503) break
  }

  if (response.status === 503 || response.status === 500) {
    throw new AiError('Gemini đang quá tải, hãy thử lại sau 1-2 phút / Gemini is busy, please retry shortly', 503)
  }
  if (response.status === 429) throw new AiError('Gemini đang quá tải hoặc hết lượt miễn phí, thử lại sau ít phút', 429)
  if (!response.ok) {
    const detail = await response.text()
    if (detail.includes('API_KEY_INVALID')) {
      throw new AiError('GEMINI_API_KEY không hợp lệ — kiểm tra lại khoá trong .dev.vars hoặc Cloudflare / Invalid Gemini API key', 503)
    }
    throw new AiError(`Gemini lỗi ${response.status}: ${detail.slice(0, 300)}`, 502)
  }

  const result = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[]
  }
  const text = result.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? ''
  try {
    return JSON.parse(text) as T
  } catch {
    throw new AiError('AI trả về dữ liệu không đọc được, hãy thử lại', 502)
  }
}

/** Tăng bộ đếm lượt dùng AI hôm nay; vượt giới hạn thì báo lỗi 429. */
export async function countAiUsageOrReject(env: ServerEnvironment, userId: number): Promise<void> {
  const limit = Number(env.AI_DAILY_LIMIT || 40)
  const today = new Date(Date.now() + 7 * 3_600_000).toISOString().slice(0, 10) // ngày theo giờ VN
  const row = await env.DB.prepare(
    `INSERT INTO ai_usage (user_id, day, count) VALUES (?, ?, 1)
     ON CONFLICT(user_id, day) DO UPDATE SET count = count + 1
     RETURNING count`,
  )
    .bind(userId, today)
    .first<{ count: number }>()
  if (row && row.count > limit) {
    throw new AiError(`Hôm nay bạn đã dùng hết ${limit} lượt AI. Mai quay lại nhé! / Daily AI limit reached`, 429)
  }
}

/** Phần mô tả định dạng JSON mà mọi bài chấm đều dùng chung. */
export const GRADING_JSON_FORMAT = `Return ONLY a JSON object with exactly this shape:
{
  "overallBand": number,              // IELTS band 0-9 in 0.5 steps
  "criteria": [                        // the 4 official IELTS criteria
    { "name": string, "band": number, "commentVi": string, "commentEn": string }
  ],
  "summaryVi": string,                 // 2-4 sentences overall feedback in Vietnamese
  "summaryEn": string,                 // same in simple English
  "mistakes": [                        // up to 8 most important errors, quote exactly
    { "original": string, "correction": string, "explanationVi": string, "explanationEn": string }
  ],
  "improvedVersion": string            // the learner's answer rewritten ~1 band higher, keep their ideas
}`
