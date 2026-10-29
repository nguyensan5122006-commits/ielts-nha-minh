/**
 * register-skill-tasks.ts — ĐĂNG KÝ TRÌNH ĐỌC VỚI TRÌNH HỌC
 * ----------------------------------------------------------------------------
 * Trình học (src/features/lesson-player/skill-task-loader.ts) tự nạp mọi file tên này.
 * lazy(): code trình đọc chỉ tải khi người học tới phần task.
 * layout 'full': bài đọc | câu hỏi 2 cột kéo được cần tràn màn hình.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { registerSkillTask } from '../lesson-player/skill-task-registry'

registerSkillTask(
  'reading',
  lazy(() => import('./ReadingTaskPlayer')),
  { layout: 'full', owner: 'skill-listening-reading' },
)
