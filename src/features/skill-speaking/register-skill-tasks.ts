/**
 * register-skill-tasks.ts — ĐĂNG KÝ TRÌNH SPEAKING VỚI TRÌNH HỌC
 * ----------------------------------------------------------------------------
 * Trình học tự nạp mọi file tên này (src/features/lesson-player/skill-task-loader.ts).
 * lazy(): code trình Speaking (máy ghi âm, sóng âm…) chỉ tải khi người học tới phần task.
 * layout 'full': cột chính + cột cụm từ hữu ích; trình tự giới hạn bề ngang 1240px.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { registerSkillTask } from '../lesson-player/skill-task-registry'

registerSkillTask(
  'speaking',
  lazy(() => import('./SpeakingTaskPlayer')),
  { layout: 'full', owner: 'skill-writing-speaking' },
)
