/**
 * register-skill-tasks.ts — ĐĂNG KÝ TRÌNH NGHE VỚI TRÌNH HỌC
 * ----------------------------------------------------------------------------
 * Trình học (src/features/lesson-player/skill-task-loader.ts) tự nạp mọi file tên này.
 * lazy(): code trình nghe chỉ tải khi người học tới phần task.
 * layout 'full': 2 cột (trình phát | câu hỏi) cần tràn màn hình.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { registerSkillTask } from '../lesson-player/skill-task-registry'

registerSkillTask(
  'listening',
  lazy(() => import('./ListeningTaskPlayer')),
  { layout: 'full', owner: 'skill-listening-reading' },
)
