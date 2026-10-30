/**
 * claude-client.ts
 * ----------------------------------------------------------------------------
 * Gọi Claude (Anthropic) để chấm bài — DỰ PHÒNG khi Gemini lỗi / hết lượt miễn phí.
 * Không gọi trực tiếp từ API; luôn đi qua askAiForJson() trong ai-client.ts.
 *
 * - Model: biến CLAUDE_MODEL trong wrangler.toml (mặc định claude-haiku-5-5, rẻ nhất)
 * - Khoá: bí mật ANTHROPIC_API_KEY trên Cloudflare (không bao giờ gửi xuống trình duyệt)
 * - Claude chỉ đọc được CHỮ, không nghe được audio -> bài nói không dùng dự phòng này.
 *
 * Tài liệu API: https://platform.claude.com/docs/en/api/messages
 * ----------------------------------------------------------------------------
 */
import Anthropic from '@anthropic-ai/sdk'
import { AiError } from './gemini-client'
import type { ServerEnvironment } from './server-environment'

/** Có cấu hình Claude chưa (đã đặt ANTHROPIC_API_KEY)? */
export function isClaudeConfigured(env: ServerEnvironment): boolean {
  return !!env.ANTHROPIC_API_KEY?.trim()
}

/**
 * Gửi đề + bài làm (dạng chữ) cho Claude, nhận về JSON.
 * @param systemInstruction vai trò của AI — dùng chung câu lệnh với Gemini
 * @param userText toàn bộ nội dung chữ (đề bài, bài làm...)
 */
export async function askClaudeForJson<T>(env: ServerEnvironment, systemInstruction: string, userText: string): Promise<T> {
  if (!isClaudeConfigured(env)) {
    throw new AiError('Chưa cấu hình ANTHROPIC_API_KEY trên máy chủ / Claude API key is not set', 503)
  }
  const client = new Anthropic({
    apiKey: env.ANTHROPIC_API_KEY!.trim(),
    timeout: 60_000, // 60 giây / lần gọi (SDK tự thử lại tối đa 2 lần khi quá tải)
  })

  let response: Anthropic.Message
  try {
    response = await client.messages.create({
      model: env.CLAUDE_MODEL || 'claude-haiku-5-5',
      max_tokens: 16000,
      output_config: { effort: 'medium' }, // mức "suy nghĩ" vừa phải: đủ chấm chuẩn, không tốn token
      system: `${systemInstruction}\nOutput the JSON object only, with no markdown code fences and no extra text.`,
      messages: [{ role: 'user', content: userText }],
    })
  } catch (error) {
    // Bắt lỗi từ cụ thể -> chung (lớp lỗi có sẵn trong SDK, không so chuỗi)
    if (error instanceof Anthropic.AuthenticationError) {
      throw new AiError('ANTHROPIC_API_KEY không hợp lệ — kiểm tra lại khoá trên Cloudflare / Invalid Claude API key', 503)
    }
    if (error instanceof Anthropic.RateLimitError) {
      throw new AiError('Claude đang quá tải hoặc hết hạn mức, thử lại sau ít phút', 429)
    }
    if (error instanceof Anthropic.APIConnectionError) {
      throw new AiError('Không kết nối được tới Claude, hãy thử lại', 503)
    }
    if (error instanceof Anthropic.APIError) {
      throw new AiError(`Claude lỗi ${error.status}: ${error.message.slice(0, 300)}`, 502)
    }
    throw error
  }

  // "refusal" = Claude từ chối vì lý do an toàn; "max_tokens" = câu trả lời bị cắt giữa chừng
  if (response.stop_reason === 'refusal') throw new AiError('AI từ chối chấm nội dung này', 422)
  if (response.stop_reason === 'max_tokens') throw new AiError('AI trả lời quá dài, hãy thử lại', 502)

  const text = response.content
    .map((block) => (block.type === 'text' ? block.text : ''))
    .join('')
    .trim()
    // phòng khi AI vẫn bọc JSON trong ```json ... ```
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/, '')
  try {
    return JSON.parse(text) as T
  } catch {
    throw new AiError('AI trả về dữ liệu không đọc được, hãy thử lại', 502)
  }
}
