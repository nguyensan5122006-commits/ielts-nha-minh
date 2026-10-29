/**
 * LandingPage.tsx — TRANG GIỚI THIỆU "/" CHO KHÁCH CHƯA ĐĂNG NHẬP
 * ----------------------------------------------------------------------------
 * Mục tiêu: nhìn 1 lần là muốn bấm "Bắt đầu học"; từ đây tới câu hỏi đầu tiên của bài học
 * chỉ có 2 quyết định chính + bài xếp lớp (psych-adult D2 luật 1).
 *
 * Thứ tự (ngắn, không dài dòng):
 *   1. Hero      — tiêu đề + 1 nút chính "Bắt đầu học" + 1 nút phụ "Tôi đã có tài khoản";
 *                  bên phải cún 3D + thẻ từ bay vòng quanh (HeroStage)
 *   2. Bậc thang — 3 level, "Bạn ở đây?" → "Mục tiêu 6.5" (ý Mochi, làm lại kiểu mình)
 *   3. 2 lộ trình — Tiếng Anh tổng quát / Luyện thi IELTS
 *   4. 5 kỹ năng — icon 3D SkillIcon
 *   5. Khu trẻ em + Bảng xếp hạng gia đình (2 thẻ cạnh nhau)
 *   6. Kêu gọi cuối + chân trang
 *
 * Nút chính tự đổi chữ khi khách đang làm dở bài xếp lớp ("Làm tiếp … câu 4") hoặc đã có
 * kết quả ("Xem lại kết quả") — vẫn chỉ 1 nút chính.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { SkillName } from '../../content/content-types'
import { Button, Icon, Mascot, ProgressBar, SkillIcon, WordImage } from '../../design-system'
import { LevelStaircase } from '../placement-test/route-map/LevelStaircase'
import { loadDraft, loadResult } from '../placement-test/placement-storage'
import { HeroStage } from './HeroStage'
import { PublicHeader } from './PublicHeader'
import { useLandingText } from './landing-text'
import './landing.css'

const SKILLS: SkillName[] = ['listening', 'reading', 'writing', 'speaking', 'vocabulary']

/** Ảnh 3D minh hoạ cho thẻ khu trẻ em */
const KIDS_WORDS = [
  { slug: 'cat', word: 'cat' },
  { slug: 'ice-cream', word: 'ice cream' },
  { slug: 'balloon', word: 'balloon' },
  { slug: 'teddy-bear', word: 'teddy bear' },
  { slug: 'kite', word: 'kite' },
]

/** Bảng xếp hạng MẪU (minh hoạ, không phải người thật): ảnh đại diện + XP tuần */
const SAMPLE_FAMILY = [
  { avatar: 'woman', xp: 420 },
  { avatar: 'girl', xp: 365 },
  { avatar: 'man', xp: 290 },
  { avatar: 'boy', xp: 210 },
]
const MEDALS = ['1st-place-medal', '2nd-place-medal', '3rd-place-medal']

export function LandingPage() {
  const text = useLandingText()
  const draft = loadDraft()
  const result = loadResult()

  // 1 nút chính duy nhất — chữ đổi theo tình trạng bài xếp lớp của khách
  const primary =
    draft && draft.answers.length > 0
      ? { to: '/start', label: text.ctaResume(draft.answers.length) }
      : result && result.appliedToUserId == null // (QA) kết quả đã lưu vào 1 tài khoản rồi -> khách mới làm bài mới
        ? { to: '/start/result', label: text.ctaResult }
        : { to: '/start', label: text.ctaStart }

  return (
    <div className="ob-page lp-page">
      <PublicHeader
        transparent
        action={
          <Button variant="ghost" size="sm" to="/login">
            {text.login}
          </Button>
        }
      />

      {/* ============================ 1. HERO ============================ */}
      <section className="lp-hero ob-container" aria-labelledby="lp-hero-title">
        <div className="lp-hero__copy">
          <span className="lp-eyebrow">
            <WordImage slug="house-with-garden" word="home" size={22} decorative />
            {text.heroEyebrow}
          </span>
          <h1 id="lp-hero-title" className="lp-hero__title ob-display">
            <span>{text.heroTitleLine1}</span>
            <span className="lp-hero__accent">{text.heroTitleLine2}</span>
          </h1>
          <p className="lp-hero__lead">{text.heroLead}</p>
          <div className="lp-hero__actions">
            <Button size="xl" to={primary.to} iconRight="arrow-right" className="lp-cta-main">
              {primary.label}
            </Button>
            <Button size="lg" variant="secondary" to="/login">
              {text.ctaHaveAccount}
            </Button>
          </div>
          <ul className="lp-hero__facts">
            {text.heroFacts.map((fact) => (
              <li key={fact}>
                <Icon name="check" size={16} strokeWidth={2.6} />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <HeroStage />
      </section>

      {/* ======================== 2. BẬC THANG 3 LEVEL ======================== */}
      <section className="lp-section ob-container" aria-labelledby="lp-stairs-title">
        <div className="lp-stairs-card">
          <div className="lp-stairs-card__intro">
            <span className="lp-kicker">{text.stairsEyebrow}</span>
            <h2 id="lp-stairs-title" className="lp-h2 ob-display">
              {text.stairsTitle}
            </h2>
            <p className="lp-lead">{text.stairsLead}</p>
            <Button to="/start" variant="navy" iconRight="arrow-right">
              {text.stairsCta}
            </Button>
          </div>
          <LevelStaircase currentLevel={null} youAreHereLabel={text.youAreHereQuestion} goalLabel={text.goal} className="lp-stairs-card__map" />
        </div>
      </section>

      {/* ============================ 3. 2 LỘ TRÌNH ============================ */}
      <section className="lp-section ob-container" aria-labelledby="lp-tracks-title">
        <h2 id="lp-tracks-title" className="lp-h2 lp-h2--center ob-display">
          {text.tracksTitle}
        </h2>
        <div className="lp-tracks">
          <article className="lp-track lp-track--general">
            <WordImage slug="globe-showing-asia-australia" word="globe" size={88} decorative className="lp-track__art" />
            <h3 className="lp-track__title ob-display">{text.trackGeneralTitle}</h3>
            <p>{text.trackGeneralBody}</p>
            <ul className="lp-track__points">
              {text.trackGeneralPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
          <article className="lp-track lp-track--ielts">
            <WordImage slug="graduation-cap" word="graduation cap" size={88} decorative className="lp-track__art" />
            <h3 className="lp-track__title ob-display">{text.trackIeltsTitle}</h3>
            <p>{text.trackIeltsBody}</p>
            <ul className="lp-track__points">
              {text.trackIeltsPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="lp-note">{text.tracksNote}</p>
      </section>

      {/* ============================ 4. 5 KỸ NĂNG ============================ */}
      <section className="lp-section ob-container" aria-labelledby="lp-skills-title">
        <h2 id="lp-skills-title" className="lp-h2 lp-h2--center ob-display">
          {text.skillsTitle}
        </h2>
        <ul className="lp-skills">
          {SKILLS.map((skill) => (
            <li key={skill} className="lp-skill" style={{ '--skill-color': `var(--skill-${skill})` } as CSSProperties}>
              <SkillIcon skill={skill} size={72} />
              <strong className="lp-skill__name ob-display">{text.skills[skill].name}</strong>
              <span className="lp-skill__line">{text.skills[skill].line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= 5. KHU TRẺ EM + BẢNG XẾP HẠNG GIA ĐÌNH ================= */}
      <section className="lp-section ob-container lp-duo" aria-label={`${text.kidsTitle} · ${text.familyTitle}`}>
        <article className="lp-kids">
          <div className="lp-kids__sky" aria-hidden>
            <span className="lp-cloud lp-cloud--1" />
            <span className="lp-cloud lp-cloud--2" />
          </div>
          <div className="lp-kids__copy">
            <span className="lp-kicker lp-kicker--kids">{text.kidsEyebrow}</span>
            <h2 className="lp-h3 ob-display">{text.kidsTitle}</h2>
            <p>{text.kidsBody}</p>
            <ul className="lp-kids__points">
              {text.kidsPoints.map((point) => (
                <li key={point}>
                  <Icon name="star" size={14} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="lp-kids__art">
            <Mascot pose="wave" size={150} />
            <div className="lp-kids__words">
              {KIDS_WORDS.map((item) => (
                <span key={item.slug} className="lp-kids__word">
                  <WordImage slug={item.slug} word={item.word} size={44} decorative />
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="lp-family">
          <span className="lp-kicker">{text.familyEyebrow}</span>
          <h2 className="lp-h3 ob-display">{text.familyTitle}</h2>
          <p>{text.familyBody}</p>
          <div className="lp-board" aria-label={text.familySample}>
            <div className="lp-board__head">
              <span>{text.familyWeek}</span>
              <span className="lp-board__sample">{text.familySample}</span>
            </div>
            <ol className="lp-board__rows">
              {SAMPLE_FAMILY.map((member, index) => (
                <li key={member.avatar} className="lp-board__row">
                  <span className="lp-board__rank">
                    {MEDALS[index] ? <WordImage slug={MEDALS[index]} word={`#${index + 1}`} size={26} decorative /> : index + 1}
                  </span>
                  <WordImage slug={member.avatar} word={text.familyMembers[index]} size={36} decorative />
                  <span className="lp-board__name">{text.familyMembers[index]}</span>
                  <span className="lp-board__bar">
                    <span style={{ width: `${Math.round((member.xp / SAMPLE_FAMILY[0].xp) * 100)}%` }} />
                  </span>
                  <span className="lp-board__xp">
                    {member.xp} {text.xp}
                  </span>
                </li>
              ))}
            </ol>
            <div className="lp-board__goal">
              <span>{text.familyGoal(18, 21)}</span>
              <ProgressBar value={18} max={21} size="sm" showHead={false} label={text.familyGoal(18, 21)} />
            </div>
          </div>
        </article>
      </section>

      {/* ============================ 6. KÊU GỌI CUỐI ============================ */}
      <section className="lp-section ob-container" aria-labelledby="lp-final-title">
        <div className="lp-final" data-theme="dark">
          <span className="lp-final__stars" aria-hidden />
          <Mascot pose="thumbs-up" size={170} className="lp-final__mascot" />
          <div className="lp-final__copy">
            <h2 id="lp-final-title" className="lp-h2 ob-display">
              {text.finalTitle}
            </h2>
            <p>{text.finalBody}</p>
          </div>
          <Button size="xl" to={primary.to} iconRight="arrow-right">
            {primary.label}
          </Button>
        </div>
      </section>

      <footer className="lp-footer ob-container">
        <span>{text.footer}</span>
        <Link to="/login">{text.login}</Link>
      </footer>
    </div>
  )
}
