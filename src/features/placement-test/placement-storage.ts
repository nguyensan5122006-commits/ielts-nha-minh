/**
 * placement-storage.ts
 * ----------------------------------------------------------------------------
 * LƯU BÀI XẾP LỚP CỦA KHÁCH (chưa đăng nhập) VÀO localStorage.
 *
 * Vì sao không dùng progress-store?
 *   progress-store chỉ chạy khi ĐÃ đăng nhập (mỗi người 1 cục tiến độ trên máy chủ).
 *   Khách làm bài xếp lớp TRƯỚC khi có tài khoản, nên kết quả tạm nằm trong máy.
 *   Khi khách tạo tài khoản / đăng nhập, use-apply-placement.ts mới chép kết quả này
 *   sang progress-store (setPlacementV3 + setProfile) — đúng hợp đồng 03-DATA-LAYER.
 *
 * 3 "ngăn" trong localStorage:
 *   1. DRAFT   — bài đang làm dở: lựa chọn ở bước 1 + các câu đã trả lời.
 *                Ghi sau MỖI câu -> tải lại trang là làm tiếp đúng câu.
 *   2. RESULT  — kết quả đã chấm + lựa chọn kế hoạch (phút/ngày, giờ học).
 *                Hiện ngay ở /start/result, KHÔNG khoá sau đăng nhập.
 *   3. PENDING — cờ "người này vừa bấm Lưu / Đăng nhập từ màn kết quả":
 *                đăng nhập xong thì áp kết quả vào tài khoản (1 lần rồi xoá cờ).
 * ----------------------------------------------------------------------------
 */
import type { TrackId } from '../../content/content-types'
import type { PlacementAnswer, PlacementEstimate } from '../../content/exams/index-v3'
import type { AgeGroup } from '../../../backend-helpers/age-groups'

const DRAFT_KEY = 'ielts-placement-v3-draft'
const RESULT_KEY = 'ielts-placement-v3-result'
const PENDING_KEY = 'ielts-placement-v3-pending'

/** Kết quả quá cũ thì coi như không còn (người học nên làm lại cho đúng trình độ hiện tại). */
const RESULT_MAX_AGE_DAYS = 30

/** Lựa chọn ở bước 1 của /start. */
export interface PlacementSetup {
  track: TrackId
  ageGroup: AgeGroup
}

/** Bài đang làm dở. */
export interface PlacementDraft {
  version: 1
  setup: PlacementSetup
  answers: PlacementAnswer[]
  /** Đã hiện lời mời "bắt đầu Level 1" chưa (chỉ hiện 1 lần) */
  levelOneOfferShown: boolean
  startedAt: string
  updatedAt: string
}

/** Kế hoạch người học chọn trên màn kết quả (áp vào progress.profile khi lưu). */
export interface StudyPlanChoices {
  dailyGoalMinutes: number
  /** "Tôi sẽ học sau …" — VD "sau bữa tối" */
  studyCue?: string
  /** "… lúc HH:MM" */
  studyTime?: string
}

/** Kết quả bài xếp lớp (đã chấm). */
export interface SavedPlacementResult {
  version: 1
  setup: PlacementSetup
  estimate: PlacementEstimate
  /** Giữ lại câu trả lời để màn kết quả có mục "Xem lại câu đã làm" */
  answers: PlacementAnswer[]
  /** test = làm hết bài · early = dừng sớm / chọn "bắt đầu Level 1" · beginner = "Tôi mới bắt đầu từ 0" */
  via: 'test' | 'early' | 'beginner'
  /** Số phút đã làm bài (tính vào phút học hôm nay khi lưu) */
  minutesSpent: number
  finishedAt: string
  plan: StudyPlanChoices
  /** Đã áp vào tài khoản nào (để không áp lại 2 lần) */
  appliedToUserId?: number
}

/* ---------------------------- đọc / ghi an toàn ---------------------------- */

function readJson<T>(key: string): T | null {
  try {
    const text = localStorage.getItem(key)
    return text ? (JSON.parse(text) as T) : null
  } catch {
    return null // chế độ riêng tư / dữ liệu hỏng
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* hết chỗ / bị chặn: bỏ qua — bài vẫn chạy, chỉ là không làm tiếp được sau khi tải lại */
  }
}

function remove(key: string) {
  try {
    localStorage.removeItem(key)
  } catch {
    /* bỏ qua */
  }
}

/* --------------------------------- DRAFT ---------------------------------- */

export function loadDraft(): PlacementDraft | null {
  const draft = readJson<PlacementDraft>(DRAFT_KEY)
  return draft?.version === 1 && Array.isArray(draft.answers) && draft.setup ? draft : null
}

export function saveDraft(draft: PlacementDraft) {
  writeJson(DRAFT_KEY, { ...draft, updatedAt: new Date().toISOString() })
}

export function clearDraft() {
  remove(DRAFT_KEY)
}

export function newDraft(setup: PlacementSetup): PlacementDraft {
  const now = new Date().toISOString()
  return { version: 1, setup, answers: [], levelOneOfferShown: false, startedAt: now, updatedAt: now }
}

/* --------------------------------- RESULT --------------------------------- */

export function loadResult(): SavedPlacementResult | null {
  const result = readJson<SavedPlacementResult>(RESULT_KEY)
  if (result?.version !== 1 || !result.estimate || !result.setup) return null
  const ageDays = (Date.now() - new Date(result.finishedAt).getTime()) / 86_400_000
  return ageDays <= RESULT_MAX_AGE_DAYS ? result : null
}

export function saveResult(result: SavedPlacementResult) {
  writeJson(RESULT_KEY, result)
}

/** Sửa 1 phần kết quả đã lưu (VD đổi số phút/ngày trên màn kết quả). */
export function updateResult(patch: Partial<SavedPlacementResult>) {
  const current = loadResult()
  if (current) saveResult({ ...current, ...patch })
}

export function clearResult() {
  remove(RESULT_KEY)
}

/* --------------------------------- PENDING -------------------------------- */

/** Đánh dấu: đăng nhập / đăng ký xong thì áp kết quả xếp lớp vào tài khoản. */
export function markPendingApply() {
  writeJson(PENDING_KEY, { at: new Date().toISOString() })
}

/** Có cờ chờ áp không (cờ quá 1 ngày thì bỏ — người học đã đổi ý). */
export function hasPendingApply(): boolean {
  const pending = readJson<{ at: string }>(PENDING_KEY)
  if (!pending) return false
  return Date.now() - new Date(pending.at).getTime() < 86_400_000
}

export function clearPendingApply() {
  remove(PENDING_KEY)
}
