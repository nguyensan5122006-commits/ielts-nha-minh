/**
 * POST /api/ai/grade-writing — AI CHẤM BÀI VIẾT
 * Body: {
 *   prompt: string        // đề bài
 *   answer: string        // bài làm của người học
 *   taskKind: 'lesson' | 'task1' | 'task2'
 *   targetBand?: string   // band mục tiêu của level, VD "0 – 2.0" (giúp AI nhận xét phù hợp)
 *   chartDescription?: string  // Task 1: dữ liệu biểu đồ dạng chữ
 * }
 * Trả về: kết quả chấm theo GRADING_JSON_FORMAT (band, 4 tiêu chí, lỗi sai, bài sửa).
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { AiError, GRADING_JSON_FORMAT, askGeminiForJson, countAiUsageOrReject } from '../../../backend-helpers/gemini-client'

const SYSTEM_INSTRUCTION = `You are an experienced, fair IELTS Writing examiner and a kind teacher for Vietnamese learners.
Grade strictly with the official public IELTS Writing band descriptors.
Criteria names: for Task 1 use "Task Achievement"; otherwise "Task Response"; then "Coherence and Cohesion", "Lexical Resource", "Grammatical Range and Accuracy".
Overall band = average of the 4 criteria rounded to the nearest 0.5 (round .25 up to .5 and .75 up to next whole band).
If the answer is far below the word count, off-topic, or memorised, lower Task Achievement/Response accordingly.
For beginner lesson exercises (taskKind "lesson"), still give an IELTS band estimate but write encouraging, very simple feedback.
Vietnamese text must be natural, accurate Vietnamese.
${GRADING_JSON_FORMAT}`

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const body = (await request.json()) as {
    prompt?: string
    answer?: string
    taskKind?: string
    targetBand?: string
    chartDescription?: string
  }
  const answer = (body.answer ?? '').trim()
  if (!body.prompt || answer.length < 3) return errorResponse('Bài viết đang trống / The answer is empty')
  if (answer.length > 8000) return errorResponse('Bài viết quá dài')

  try {
    await countAiUsageOrReject(env, user.id)
    const wordCount = answer.split(/\s+/).filter(Boolean).length
    const result = await askGeminiForJson(env, SYSTEM_INSTRUCTION, [
      {
        text: [
          `TASK KIND: ${body.taskKind ?? 'lesson'}`,
          body.targetBand ? `LEARNER LEVEL (band range of current course level): ${body.targetBand}` : '',
          `TASK PROMPT:\n${body.prompt}`,
          body.chartDescription ? `CHART DATA:\n${body.chartDescription}` : '',
          `LEARNER ANSWER (${wordCount} words):\n${answer}`,
        ]
          .filter(Boolean)
          .join('\n\n'),
      },
    ])
    return jsonResponse({ result, wordCount })
  } catch (error) {
    if (error instanceof AiError) return errorResponse(error.message, error.status)
    throw error
  }
}
