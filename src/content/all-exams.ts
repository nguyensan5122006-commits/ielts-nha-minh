/**
 * all-exams.ts
 * ----------------------------------------------------------------------------
 * DANH SÁCH ĐỀ THI. Thêm đề mới: tạo file trong exams/ rồi thêm vào mảng dưới.
 * (v3) EXAMS_V3 = 3 bài test level mới + đề thi thử IELTS số 2 (exams/index-v3.ts).
 * Giữ đề cũ (placementTest, level1Test, level2Test) để kết quả cũ của người dùng vẫn mở được.
 * ----------------------------------------------------------------------------
 */
import type { Exam } from './content-types'
import { placementTest } from './exams/placement-test'
import { level1Test } from './exams/level-1-test'
import { level2Test } from './exams/level-2-test'
import { mockIeltsTest1 } from './exams/mock-ielts-test-1'
import { EXAMS_V3 } from './exams/index-v3'

export const ALL_EXAMS: Exam[] = [placementTest, level1Test, level2Test, mockIeltsTest1, ...EXAMS_V3]

export function findExam(examId: string): Exam | undefined {
  return ALL_EXAMS.find((exam) => exam.id === examId)
}
