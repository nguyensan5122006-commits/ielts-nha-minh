/**
 * api-client.ts
 * ----------------------------------------------------------------------------
 * Mọi lời gọi từ trang web lên máy chủ (thư mục functions/api) đi qua file này.
 * Cookie đăng nhập được trình duyệt tự gửi kèm (credentials: 'include').
 * ----------------------------------------------------------------------------
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message)
  }
}

/** Hàm gọi API chung: tự chuyển body thành JSON và ném ApiError nếu máy chủ báo lỗi. */
export async function callApi<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      method: options.method ?? 'GET',
      credentials: 'include',
      headers: options.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    })
  } catch {
    throw new ApiError('Không kết nối được máy chủ / Cannot reach server', 0)
  }
  const data = (await response.json().catch(() => ({}))) as { error?: string }
  if (!response.ok) throw new ApiError(data.error ?? `Lỗi ${response.status}`, response.status)
  return data as T
}

import type { ChatMessage } from '../realtime/realtime-protocol'

/* ------------------------- kiểu dữ liệu trả về ---------------------------- */

export interface UserAccount {
  id: number
  username: string
  displayName: string
}

/** Thông tin đăng ký tài khoản (mọi tài khoản như nhau — không chọn nhóm tuổi). */
export interface RegisterInput {
  username: string
  displayName: string
  password: string
  inviteCode: string
}

/** Kết quả AI chấm Writing / Speaking (xem backend-helpers/gemini-client.ts). */
export interface AiGradingResult {
  overallBand: number
  criteria: { name: string; band: number; commentVi: string; commentEn: string }[]
  summaryVi: string
  summaryEn: string
  mistakes: { original: string; correction: string; explanationVi: string; explanationEn: string }[]
  improvedVersion: string
  transcripts?: string[] // chỉ có với Speaking
}

export interface AiExplanation {
  explanationVi: string
  explanationEn: string
  examples: { en: string; vi: string }[]
  memoryTipVi: string
}

/* ------------------------------ các API ----------------------------------- */

export const api = {
  getCurrentUser: () => callApi<{ user: UserAccount | null }>('/api/auth/me'),
  login: (username: string, password: string) =>
    callApi<{ user: UserAccount }>('/api/auth/login', { method: 'POST', body: { username, password } }),
  register: (input: RegisterInput) => callApi<{ user: UserAccount }>('/api/auth/register', { method: 'POST', body: input }),
  logout: () => callApi('/api/auth/logout', { method: 'POST' }),

  loadProgress: () => callApi<{ progress: unknown }>('/api/progress'),
  saveProgress: (progress: unknown) => callApi('/api/progress', { method: 'PUT', body: progress }),
  addXp: (amount: number) => callApi('/api/xp', { method: 'POST', body: { amount } }),

  saveExamResult: (examId: string, result: unknown) =>
    callApi<{ id: number }>('/api/exam-results', { method: 'POST', body: { examId, result } }),
  listExamResults: () =>
    callApi<{ results: { id: number; examId: string; createdAt: string; overallBand: number | null; percent: number | null }[] }>(
      '/api/exam-results',
    ),
  getExamResult: (id: number) =>
    callApi<{ id: number; examId: string; createdAt: string; result: unknown }>(`/api/exam-results?id=${id}`),

  gradeWriting: (input: { prompt: string; answer: string; taskKind: 'lesson' | 'task1' | 'task2'; targetBand?: string; chartDescription?: string }) =>
    callApi<{ result: AiGradingResult; wordCount: number }>('/api/ai/grade-writing', { method: 'POST', body: input }),
  gradeSpeaking: (input: {
    context: 'lesson' | 'ielts'
    partLabel?: string
    targetBand?: string
    answers: { question: string; audioBase64: string; mimeType: string }[]
  }) => callApi<{ result: AiGradingResult }>('/api/ai/grade-speaking', { method: 'POST', body: input }),
  explainMistake: (input: { question: string; userAnswer: string; correctAnswer: string; context?: string }) =>
    callApi<{ result: AiExplanation }>('/api/ai/explain-mistake', { method: 'POST', body: input }),

  /* ---------- gia đình, hồ sơ, chat ---------- */
  getFamilyMembers: () => callApi<{ users: FamilyMember[] }>('/api/users'),
  getProfile: (userId: number) => callApi<ProfileData>(`/api/profile?id=${userId}`),
  getChatMessages: (channel: string, beforeId?: number) =>
    callApi<{ messages: ChatMessage[]; reads: { userId: number; lastReadId: number }[]; hasMore: boolean }>(
      `/api/chat/messages?channel=${encodeURIComponent(channel)}${beforeId ? `&beforeId=${beforeId}` : ''}`,
    ),
  getChatUnread: () => callApi<{ unread: Record<string, number>; channels: string[] }>('/api/chat/unread'),

  /* ---------- trò chơi chữ (Thử thách từ, Spelling Bee, Nối từ) ---------- */
  getGameRecords: (game: string) =>
    callApi<{ records: { userId: number; displayName: string; bestScore: number; updatedAt: string }[] }>(`/api/games/records?game=${game}`),
  submitGameScore: (game: string, score: number) =>
    callApi<{ isNewRecord: boolean; previousBest: number | null }>('/api/games/records', { method: 'POST', body: { game, score } }),
  getDailyWord: () => callApi<DailyWordState>('/api/games/daily-word'),
  submitDailyWord: (input: { guesses: number; solved: boolean; pattern: string }) =>
    callApi<{ ok: boolean }>('/api/games/daily-word', { method: 'POST', body: input }),
}

/* ------------------------ kiểu dữ liệu phần mới ------------------------ */

export interface FamilyMember {
  id: number
  displayName: string
  avatar: string
  totalXp: number
  weekXp: number
  lastActiveAt: string | null
}

export interface ProfileData {
  user: { id: number; displayName: string; avatar: string; createdAt: string; lastActiveAt: string | null }
  totalXp: number
  stats: Record<string, number | string | null>
  records: { game: string; bestScore: number }[]
  achievements: string[]
}

export interface DailyWordState {
  day: string
  results: { userId: number; displayName: string; guesses: number; solved: number; pattern: string }[]
  mine: { guesses: number; solved: number; pattern: string } | null
}
