/**
 * AuthShell.tsx — KHUNG CHUNG CỦA /login VÀ /signup
 * ----------------------------------------------------------------------------
 *   <AuthShell title="Mừng bạn quay lại" subtitle="…" mascotPose="salute">
 *     …form…
 *   </AuthShell>
 *
 * Desktop: 2 cột — trái là "tấm biển" thương hiệu (cún + 3 điểm lợi ích), phải là thẻ form.
 * Màn hẹp (< 960px): ẩn tấm biển, chỉ còn thẻ form ở giữa.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Icon, Mascot, type MascotPose, WordImage } from '../../design-system'
import { PublicHeader } from '../landing/PublicHeader'
import { useAuthText } from './auth-text'
import './auth.css'

export interface AuthShellProps {
  title: string
  subtitle?: string
  mascotPose?: MascotPose
  /** khối nằm trên form (VD thông báo "kết quả xếp lớp sẽ được lưu") */
  notice?: ReactNode
  /** khối dưới thẻ form (VD "Chưa có tài khoản?") */
  footer?: ReactNode
  children: ReactNode
}

const PANEL_WORDS = ['open-book', 'headphone', 'speech-balloon', 'trophy']

export function AuthShell({ title, subtitle, mascotPose = 'salute', notice, footer, children }: AuthShellProps) {
  const text = useAuthText()
  return (
    <div className="ob-page au-page">
      <PublicHeader />
      <main className="au-layout ob-container">
        <aside className="au-panel" aria-hidden>
          <div className="au-panel__words">
            {PANEL_WORDS.map((slug) => (
              <span key={slug} className="au-panel__word">
                <WordImage slug={slug} word={slug} size={40} decorative />
              </span>
            ))}
          </div>
          <Mascot pose={mascotPose} size={240} placement="hero" />
          <div className="au-panel__copy">
            <strong className="au-panel__title ob-display">{text.sidePanelTitle}</strong>
            <span className="au-panel__line">{text.sidePanelLine}</span>
            <ul className="au-panel__points">
              {text.sidePanelPoints.map((point) => (
                <li key={point}>
                  <Icon name="check" size={16} strokeWidth={2.8} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="au-card" aria-labelledby="au-title">
          <h1 id="au-title" className="au-card__title ob-display">
            {title}
          </h1>
          {subtitle && <p className="au-card__sub">{subtitle}</p>}
          {notice}
          {children}
          {footer && <div className="au-card__footer">{footer}</div>}
        </section>
      </main>
    </div>
  )
}
