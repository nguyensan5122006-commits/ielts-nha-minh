/**
 * POST /api/ai/explain-mistake — NÚT "TẠI SAO SAI?"
 * Body: { question, userAnswer, correctAnswer, context? }
 * AI giải thích ngắn gọn bằng tiếng Việt + tiếng Anh vì sao đáp án đúng là đúng.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { AiError, askGeminiForJson, countAiUsageOrReject } from '../../../backend-helpers/gemini-client'

const SYSTEM_INSTRUCTION = `You are a patient English teacher for Vietnamese learners (IELTS band 0-6.5).
Explain why the learner's answer is wrong and why the correct answer is right.
Keep it short, concrete, with 1-2 extra example sentences. Natural Vietnamese.
Return ONLY JSON: { "explanationVi": string, "explanationEn": string, "examples": [{ "en": string, "vi": string }], "memoryTipVi": string }`

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const body = (await request.json()) as {
    question?: string
    userAnswer?: string
    correctAnswer?: string
    context?: string
  }
  if (!body.question || !body.correctAnswer) return errorResponse('Thiếu câu hỏi hoặc đáp án')

  try {
    await countAiUsageOrReject(env, user.id)
    const result = await askGeminiForJson(env, SYSTEM_INSTRUCTION, [
      {
        text: [
          body.context ? `CONTEXT (passage/audio script):\n${body.context.slice(0, 6000)}` : '',
          `QUESTION:\n${body.question}`,
          `LEARNER ANSWER: ${body.userAnswer || '(no answer)'}`,
          `CORRECT ANSWER: ${body.correctAnswer}`,
        ]
          .filter(Boolean)
          .join('\n\n'),
      },
    ])
    return jsonResponse({ result })
  } catch (error) {
    if (error instanceof AiError) return errorResponse(error.message, error.status)
    throw error
  }
}
