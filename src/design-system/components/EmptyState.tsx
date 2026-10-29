/**
 * EmptyState.tsx — MÀN "CHƯA CÓ GÌ" (mascot + 1 câu + 1 nút)
 * ----------------------------------------------------------------------------
 *   <EmptyState
 *     pose="thumbs-up"
 *     title="Chưa có câu sai nào"
 *     text="{mascot} sẽ gom các câu bạn làm sai vào đây để ôn lại."
 *     action={<Button to="/learn">Học tiếp</Button>}
 *   />
 * Không bao giờ để người học gặp "ngõ cụt": luôn có 1 nút đi tiếp.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { fillMascotName } from '../mascot-name'
import { Mascot, type MascotPose } from './Mascot'
import './EmptyState.css'

export interface EmptyStateProps {
  /** pose mascot (mặc định thumbs-up) */
  pose?: MascotPose
  title: ReactNode
  /** 1 câu giải thích ngắn (hỗ trợ {mascot}) */
  text?: string
  /** 1 nút hành động chính */
  action?: ReactNode
  /** cỡ mascot, mặc định 160 */
  mascotSize?: number
  className?: string
}

export function EmptyState({ pose = 'thumbs-up', title, text, action, mascotSize = 160, className }: EmptyStateProps) {
  return (
    <div className={['ds-empty', className].filter(Boolean).join(' ')}>
      <Mascot pose={pose} size={mascotSize} />
      <h3 className="ds-empty__title">{title}</h3>
      {text && <p className="ds-empty__text">{fillMascotName(text)}</p>}
      {action && <div className="ds-empty__action">{action}</div>}
    </div>
  )
}
