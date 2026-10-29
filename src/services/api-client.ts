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

import type { ChatMessage } from '../game-questions/realtime-protocol'
import type { AgeGroup } from '../../backend-helpers/age-groups'

/* ------------------------- kiểu dữ liệu trả về ---------------------------- */

export interface UserAccount {
  id: number
  username: string
  displayName: string
  /** (v3) nhóm tuổi: bé không được cược chuối, trang chủ là Khu trò chơi */
  ageGroup: AgeGroup
}

/** Thông tin đăng ký tài khoản. ageGroup không gửi = 'adult'. */
export interface RegisterInput {
  username: string
  displayName: string
  password: string
  inviteCode: string
  ageGroup?: AgeGroup
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

  /* ---------- ví chuối, cửa hàng ---------- */
  getEconomy: () => callApi<EconomyState>('/api/economy'),
  earnBananas: (reason: string) => callApi<{ granted: number; balance: number }>('/api/economy/earn', { method: 'POST', body: { reason } }),
  claimReward: (kind: string, id: string) =>
    callApi<{ granted: number; alreadyClaimed: boolean; balance: number }>('/api/economy/claim', { method: 'POST', body: { kind, id } }),
  claimDailyLogin: () =>
    callApi<{ reward: number; loginStreak: number; balance: number; isFirstLogin: boolean }>('/api/economy/daily-login', { method: 'POST' }),
  buyItem: (itemId: string, quantity = 1) =>
    callApi<{ balance: number; inventory: Record<string, number> }>('/api/economy/buy', { method: 'POST', body: { itemId, quantity } }),
  equipItem: (slot: string, itemId: string | null) => callApi('/api/economy/equip', { method: 'POST', body: { slot, itemId } }),
  useItem: (itemId: string) => callApi<{ inventory: Record<string, number> }>('/api/economy/use-item', { method: 'POST', body: { itemId } }),

  /* ---------- gia đình, hồ sơ, chat ---------- */
  getFamilyMembers: () => callApi<{ users: FamilyMember[] }>('/api/users'),
  getProfile: (userId: number) => callApi<ProfileData>(`/api/profile?id=${userId}`),
  getWelcomeNews: () => callApi<WelcomeNews>('/api/welcome-news'),
  getChatMessages: (channel: string, beforeId?: number) =>
    callApi<{ messages: ChatMessage[]; reads: { userId: number; lastReadId: number }[]; hasMore: boolean }>(
      `/api/chat/messages?channel=${encodeURIComponent(channel)}${beforeId ? `&beforeId=${beforeId}` : ''}`,
    ),
  getChatUnread: () => callApi<{ unread: Record<string, number>; channels: string[] }>('/api/chat/unread'),

  /* ---------- trò chơi ---------- */
  getGameRecords: (game: string) =>
    callApi<{ records: { userId: number; displayName: string; bestScore: number; updatedAt: string }[] }>(`/api/games/records?game=${game}`),
  submitGameScore: (game: string, score: number) =>
    callApi<{ isNewRecord: boolean; previousBest: number | null; bananas: number }>('/api/games/records', { method: 'POST', body: { game, score } }),
  getDailyWord: () => callApi<DailyWordState>('/api/games/daily-word'),
  submitDailyWord: (input: { guesses: number; solved: boolean; pattern: string }) =>
    callApi<{ reward: number }>('/api/games/daily-word', { method: 'POST', body: input }),
  getWeeklyTournament: () => callApi<WeeklyTournamentState>('/api/games/weekly-tournament'),
  submitTournamentScore: (score: number) => callApi('/api/games/weekly-tournament', { method: 'POST', body: { score } }),
  getBoss: () => callApi<BossState>('/api/games/boss'),
  attackBoss: (hits: number, damage: number) => callApi<BossState>('/api/games/boss', { method: 'POST', body: { action: 'attack', hits, damage } }),
  claimBoss: () => callApi<{ granted: number; balance: number }>('/api/games/boss', { method: 'POST', body: { action: 'claim' } }),
}

/* ------------------------ kiểu dữ liệu phần mới ------------------------ */

export interface EconomyState {
  bananas: number
  inventory: Record<string, number>
  equipped: { avatar: string; frame: string | null; 'name-color': string | null; title: string | null }
  serverXp: number
  aiUsedToday: number
  aiDailyLimit: number
}

export interface FamilyMember {
  id: number
  displayName: string
  avatar: string
  frame: string | null
  nameColor: string | null
  title: string | null
  totalXp: number
  weekXp: number
  lastActiveAt: string | null
}

export interface ProfileData {
  user: { id: number; displayName: string; avatar: string; frame: string | null; nameColor: string | null; title: string | null; createdAt: string; lastActiveAt: string | null }
  totalXp: number
  stats: Record<string, number | string | null>
  battles: { played: number; won: number }
  records: { game: string; bestScore: number }[]
  tournamentWins: number
  achievements: string[]
}

export interface WelcomeNews {
  unread: Record<string, number>
  challenges: { id: number; gameType: string; topicId: string | null; bet: number; createdAt: string; fromUserId: number; fromName: string }[]
}

export interface DailyWordState {
  day: string
  results: { userId: number; displayName: string; guesses: number; solved: number; pattern: string }[]
  mine: { guesses: number; solved: number; pattern: string } | null
}

export interface WeeklyTournamentState {
  week: string
  topicId: string
  leaderboard: { userId: number; displayName: string; bestScore: number }[]
  lastWeek: { week: string; topicId: string; podium: { userId: number; displayName: string; bestScore: number }[] }
  prizes: number[]
}

export interface BossState {
  week: string
  boss: { emoji: string; name: { vi: string; en: string }; taunt: { vi: string; en: string } }
  maxHp: number
  hp: number
  defeated: boolean
  contributors: { userId: number; displayName: string; damage: number; hits: number }[]
  claimed: boolean
  myDamageToday: number
  dailyDamageLimit: number
  dailyLimitReached?: boolean
}
