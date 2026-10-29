/**
 * TrackEntry.tsx — "CỬA VÀO" CỦA 2 KHU HỌC + ĐƯỜNG DẪN /learn THÔNG MINH
 * ----------------------------------------------------------------------------
 *   <TrackEntry track="general"><LearnPage /></TrackEntry>   // /english
 *   <TrackEntry track="ielts"><IeltsHomePage /></TrackEntry> // /ielts
 *   <SmartLearnRedirect />                                    // /learn
 *
 * Mỗi khu gắn với 1 track: vào /english là học Tiếng Anh tổng quát, vào /ielts là
 * luyện IELTS. TrackEntry tự đổi progress.profile.track cho khớp khu đang mở
 * (track quyết định XP, cột phải, màu giao diện…), đổi xong mới vẽ trang để không
 * nháy nội dung của track kia.
 *
 * /learn (link cũ, nút "Dừng ở đây" sau bài học…) đưa người học về đúng khu đang học.
 * ----------------------------------------------------------------------------
 */
import { useEffect, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { TrackId } from '../../content/content-types'
import { useProgress } from '../../learning-progress/progress-store'

/** Trang chủ của từng track. */
export const TRACK_HOME: Record<TrackId, string> = { general: '/english', ielts: '/ielts' }

export function TrackEntry({ track, children }: { track: TrackId; children: ReactNode }) {
  const { progress, setTrack } = useProgress()
  const current = progress.profile.track
  useEffect(() => {
    if (current !== track) setTrack(track)
  }, [current, track, setTrack])
  if (current !== track) return null
  return <>{children}</>
}

/** /learn -> trang chủ của track đang học (giữ ?level=… nếu có). */
export function SmartLearnRedirect() {
  const { progress } = useProgress()
  const location = useLocation()
  return <Navigate to={`${TRACK_HOME[progress.profile.track]}${location.search}`} replace />
}
