/**
 * register-skill-tasks.ts — ĐĂNG KÝ TRÌNH WRITING VỚI TRÌNH HỌC
 * ----------------------------------------------------------------------------
 * Trình học tự nạp mọi file tên này (src/features/lesson-player/skill-task-loader.ts).
 * lazy(): code trình Writing chỉ tải khi người học tới phần task (web mở nhanh hơn).
 * layout 'full': 2 cột đề | bài cần cả bề ngang màn hình (trình tự giới hạn 1360px).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { registerSkillTask } from '../lesson-player/skill-task-registry'

registerSkillTask(
  'writing',
  lazy(() => import('./WritingTaskPlayer')),
  { layout: 'full', owner: 'skill-writing-speaking' },
)
