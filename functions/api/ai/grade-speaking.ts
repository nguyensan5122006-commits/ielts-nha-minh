/**
 * POST /api/ai/grade-speaking — AI CHẤM BÀI NÓI
 * Body: {
 *   context: 'lesson' | 'ielts'
 *   partLabel?: string          // VD "Part 2"
 *   targetBand?: string
 *   answers: [{ question: string, audioBase64: string, mimeType: string }]  // 1 hoặc nhiều câu
 * }
 * Gemini nghe trực tiếp file ghi âm (WAV), chép lại lời nói (transcript) rồi chấm
 * theo 4 tiêu chí IELTS Speaking, kể cả phát âm.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import {
  AiError,
  GRADING_JSON_FORMAT,
  askGeminiForJson,
  countAiUsageOrReject,
  type GeminiPart,
} from '../../../backend-helpers/gemini-client'

const MAX_TOTAL_BASE64 = 14_000_000 // ~10MB audio; Gemini giới hạn 20MB / yêu cầu

const SYSTEM_INSTRUCTION = `You are an experienced, fair IELTS Speaking examiner and a kind teacher for Vietnamese learners.
You will receive one or more audio recordings, each answering a question.
First transcribe each recording exactly (keep the learner's errors, mark unclear words as [unclear]).
Then grade with the official public IELTS Speaking band descriptors using criteria:
"Fluency and Coherence", "Lexical Resource", "Grammatical Range and Accuracy", "Pronunciation".
Judge pronunciation from the audio itself (ending sounds, word stress, intonation, typical Vietnamese-speaker issues).
If a recording is silent or not English, give low bands and say so.
For beginner lessons (context "lesson") write encouraging, very simple feedback but keep the band honest.
Vietnamese text must be natural, accurate Vietnamese.
In addition to the fields below, include "transcripts": string[] (one per recording, same order).
${GRADING_JSON_FORMAT}`

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const body = (await request.json()) as {
    context?: string
    partLabel?: string
    targetBand?: string
    answers?: { question: string; audioBase64: string; mimeType: string }[]
  }
  const answers = body.answers ?? []
  if (answers.length === 0) return errorResponse('Chưa có bản ghi âm nào / No recording')
  const totalSize = answers.reduce((sum, a) => sum + (a.audioBase64?.length ?? 0), 0)
  if (totalSize > MAX_TOTAL_BASE64) return errorResponse('Ghi âm quá dài / Recording too long', 413)

  // Ghép nội dung: lời dẫn -> (câu hỏi 1, audio 1) -> (câu hỏi 2, audio 2) ...
  const parts: GeminiPart[] = [
    {
      text: `CONTEXT: ${body.context ?? 'lesson'} ${body.partLabel ?? ''}\n${
        body.targetBand ? `LEARNER LEVEL: ${body.targetBand}\n` : ''
      }Number of recordings: ${answers.length}`,
    },
  ]
  answers.forEach((answer, index) => {
    parts.push({ text: `QUESTION ${index + 1}: ${answer.question}` })
    parts.push({ inline_data: { mime_type: answer.mimeType || 'audio/wav', data: answer.audioBase64 } })
  })

  try {
    await countAiUsageOrReject(env, user.id)
    const result = await askGeminiForJson(env, SYSTEM_INSTRUCTION, parts)
    return jsonResponse({ result })
  } catch (error) {
    if (error instanceof AiError) return errorResponse(error.message, error.status)
    throw error
  }
}
