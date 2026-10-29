/**
 * use-ai-grading.ts — GỌI AI CHẤM (Gemini, qua /api/ai/grade-writing hoặc grade-speaking) + XỬ LÝ LỖI
 * ----------------------------------------------------------------------------
 *   const grading = useAiGrading<AiGradingResultV3>()
 *   grading.run(() => api.gradeWriting({...}).then((r) => r.result))
 *   grading.status    'idle' | 'loading' | 'error' | 'done'
 *   grading.error     { kind: 'busy' | 'limit' | 'offline' | 'too-long' | 'generic', message }
 *   grading.cancel()  thôi chờ (kết quả về muộn sẽ bị bỏ qua — fetch không huỷ được ở api-client)
 *
 * Lỗi 503/500/502 = AI quá tải · 429 = hết lượt trong ngày hoặc quá tải · 0 = mất mạng · 413 = quá dài.
 * Lỗi AI KHÔNG làm mất kết quả tự chấm (giao diện luôn nhắc điều này).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useRef, useState } from 'react'
import { ApiError, type AiGradingResult } from '../../../services/api-client'

/**
 * Kết quả AI + vài trường tuỳ chọn mà máy chủ CÓ THỂ trả thêm sau này (đã đề nghị trong REQUESTS.md):
 * strengthsVi/En (ưu điểm), mistakes[].criterion (lỗi thuộc tiêu chí nào). Không có thì giao diện tự suy ra.
 */
export type AiGradingResultV3 = AiGradingResult & {
  strengthsVi?: string[]
  strengthsEn?: string[]
  mistakes: (AiGradingResult['mistakes'][number] & { criterion?: string })[]
}

export type AiErrorKind = 'busy' | 'limit' | 'offline' | 'too-long' | 'generic'
export type AiStatus = 'idle' | 'loading' | 'error' | 'done'

export function classifyAiError(error: unknown): { kind: AiErrorKind; message: string } {
  if (error instanceof ApiError) {
    if (error.status === 0) return { kind: 'offline', message: error.message }
    if (error.status === 429) return { kind: 'limit', message: error.message }
    if (error.status === 413) return { kind: 'too-long', message: error.message }
    // (QA) lỗi cấu hình khoá AI (máy chủ cũng trả 5xx) không phải "AI quá tải" -> báo lỗi chung,
    // dòng chi tiết bên dưới sẽ nói rõ là khoá sai; tránh vừa "quá tải" vừa "khoá không hợp lệ".
    if (error.status >= 500 && /api[_ ]key/i.test(error.message)) return { kind: 'generic', message: error.message }
    if (error.status >= 500) return { kind: 'busy', message: error.message }
    return { kind: 'generic', message: error.message }
  }
  return { kind: 'generic', message: error instanceof Error ? error.message : String(error) }
}

export function useAiGrading<Result>() {
  const [status, setStatus] = useState<AiStatus>('idle')
  const [error, setError] = useState<{ kind: AiErrorKind; message: string } | null>(null)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const runToken = useRef(0)

  const run = useCallback(async (request: () => Promise<Result>): Promise<Result | null> => {
    const token = ++runToken.current
    setStatus('loading')
    setError(null)
    setStartedAt(Date.now())
    try {
      const result = await request()
      if (token !== runToken.current) return null // người học đã bấm "Huỷ chờ" hoặc gọi lại
      setStatus('done')
      return result
    } catch (caught) {
      if (token !== runToken.current) return null
      setError(classifyAiError(caught))
      setStatus('error')
      return null
    }
  }, [])

  const cancel = useCallback(() => {
    runToken.current++
    setStatus('idle')
  }, [])

  /** Đặt lại trạng thái "đã có kết quả" (VD khôi phục từ resume) */
  const markDone = useCallback(() => setStatus('done'), [])

  return { status, error, startedAt, run, cancel, markDone }
}
