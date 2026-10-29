/**
 * /api/exam-results — KẾT QUẢ THI
 *   GET  : danh sách bài thi đã làm (mới nhất trước). ?id=123 -> lấy chi tiết 1 bài.
 *   POST : lưu kết quả 1 bài thi. Body: { examId, result }
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../backend-helpers/read-logged-in-user'

export const onRequestGet: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const id = new URL(request.url).searchParams.get('id')

  if (id) {
    const row = await env.DB.prepare(
      'SELECT id, exam_id, result_json, created_at FROM exam_results WHERE id = ? AND user_id = ?',
    )
      .bind(Number(id), user.id)
      .first<{ id: number; exam_id: string; result_json: string; created_at: string }>()
    if (!row) return errorResponse('Không tìm thấy kết quả', 404)
    return jsonResponse({ id: row.id, examId: row.exam_id, createdAt: row.created_at, result: JSON.parse(row.result_json) })
  }

  // Danh sách: chỉ lấy phần tóm tắt (điểm tổng) cho nhẹ
  const { results } = await env.DB.prepare(
    `SELECT id, exam_id AS examId, created_at AS createdAt,
            json_extract(result_json, '$.overallBand') AS overallBand,
            json_extract(result_json, '$.percent') AS percent
       FROM exam_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`,
  )
    .bind(user.id)
    .all()
  return jsonResponse({ results })
}

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const body = (await request.json()) as { examId?: string; result?: unknown }
  if (!body.examId || !body.result) return errorResponse('Thiếu examId hoặc result')
  const json = JSON.stringify(body.result)
  if (json.length > 300_000) return errorResponse('Kết quả quá lớn', 413)
  const inserted = await env.DB.prepare('INSERT INTO exam_results (user_id, exam_id, result_json) VALUES (?, ?, ?)')
    .bind(user.id, body.examId, json)
    .run()
  return jsonResponse({ id: Number(inserted.meta.last_row_id) }, 201)
}
