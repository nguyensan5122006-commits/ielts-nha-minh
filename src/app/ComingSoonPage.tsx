/**
 * ComingSoonPage.tsx — TRANG TẠM "ĐANG XÂY DỰNG"
 * ----------------------------------------------------------------------------
 * Trong lúc làm redesign v3, các trang học cũ (Trang chủ, Lộ trình, Level, Bài học,
 * Mini-test, Ôn tập, Sổ lỗi sai) đã chuyển vào src/_legacy-v2/ để các nhóm giao diện
 * làm lại. Các đường dẫn đó tạm trỏ tới trang này để web vẫn build và chạy được.
 * Khi trang mới xong, nhóm giao diện đổi route trong App.tsx sang trang mới.
 * ----------------------------------------------------------------------------
 */
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../translations/language-context'

export function ComingSoonPage() {
  const { t, language } = useLanguage()
  const { pathname } = useLocation()
  return (
    <main className="page page--narrow">
      <div className="card stack" style={{ gap: 12, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem' }}>🚧</div>
        <h1>{t('comingSoon')}</h1>
        <p className="muted">
          {language === 'vi'
            ? 'Phần học đang được làm lại cho đẹp và dễ dùng hơn. Tiến độ của bạn vẫn được giữ nguyên.'
            : 'The learning area is being rebuilt. Your progress is safe.'}
        </p>
        <p className="small muted">{pathname}</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link to="/arena" className="button button--secondary">
            ⚔️ Arena
          </Link>
          <Link to="/exams" className="button button--primary">
            📝 {t('navExams')}
          </Link>
        </div>
      </div>
    </main>
  )
}
