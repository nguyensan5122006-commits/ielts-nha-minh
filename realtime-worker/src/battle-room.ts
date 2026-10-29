/**
 * battle-room.ts
 * ----------------------------------------------------------------------------
 * 1 PHÒNG THI ĐẤU TRỰC TIẾP (2-6 người).
 *
 * Vòng đời phòng:
 *   'lobby'    : chủ phòng tạo, mời người; ai muốn thì vào (đủ chuối để cược)
 *   'playing'  : chủ phòng bấm bắt đầu -> trừ chuối cược vào "hũ" -> chơi
 *   'finished' : xếp hạng, người nhất lấy cả hũ (hoà thì chia đều)
 *
 * (v3) BÉ KHÔNG CƯỢC: người chơi tài khoản 'kid' vào phòng có cược vẫn được, nhưng
 * tiền cược của bé luôn = 0 (không bị trừ chuối). Hũ chỉ gồm cược của người lớn và chỉ
 * chia cho người lớn thắng. Bé thắng -> nhận thưởng cố định KID_BATTLE_WIN_REWARD
 * (src/game-economy/banana-rewards.ts) do máy chủ cộng thêm. Nếu chỉ có bé thắng thì
 * hũ được TRẢ LẠI cho người lớn đã cược (không ai mất chuối vào tay bé, bé cũng không mất gì).
 *
 * 2 kiểu luật:
 *   - Theo câu hỏi (quiz / spelling / sentence): mọi người cùng trả lời 1 câu,
 *     đúng + nhanh được nhiều điểm (50-100). Có sức mạnh: đóng băng, khiên, 50/50, x2, thêm giờ.
 *   - Nối từ (word-chain): lần lượt từng người nói 1 từ bắt đầu bằng chữ cái cuối
 *     của từ trước. Hết giờ không nói được = bị loại. Người cuối cùng còn lại thắng.
 *
 * Lớp này không tự gửi tin: nó gọi các hàm `io` mà FamilyHub truyền vào.
 * ----------------------------------------------------------------------------
 */
import {
  correctAnswerText,
  generateQuestions,
  hideAnswer,
  isGameAnswerCorrect,
  pointsForAnswer,
  type GameQuestion,
} from '../../src/game-questions/question-bank'
import type { PlayerResult, PowerId, RoomSettings, RoomSummary, ServerMessage } from '../../src/game-questions/realtime-protocol'
import { MAX_POWERS_PER_MATCH } from '../../src/game-economy/shop-catalog'
import { KID_BATTLE_WIN_REWARD } from '../../src/game-economy/banana-rewards'
import { isDictionaryWord } from './word-chain-dictionary'

export const MAX_PLAYERS = 6
const COUNTDOWN_MS = 3000
const REVEAL_PAUSE_MS = 2500
const FREEZE_MS = 2000
const EXTRA_TIME_MS = 5000
const CHAIN_TURN_MS = 15000
const CHAIN_MAX_TURNS = 60
const CHAIN_STARTING_WORDS = ['apple', 'house', 'water', 'happy', 'green', 'music', 'tiger', 'river', 'school', 'family']

/** Các hàm phòng cần từ bên ngoài (gửi tin, tiền chuối, lưu kết quả). */
export interface RoomIO {
  sendTo(userId: number, message: ServerMessage): void
  /** trừ chuối cược; false nếu không đủ */
  takeBet(userId: number, amount: number): Promise<boolean>
  /** trả lại chuối cược (khi trận bị huỷ trước lúc chơi) */
  refundBet(userId: number, amount: number): Promise<void>
  /** dùng 1 sức mạnh trong túi đồ; false nếu không còn */
  consumePower(userId: number, power: PowerId): Promise<boolean>
  /** trận kết thúc: trả chuối cho người thắng, lưu lịch sử */
  finish(room: BattleRoom, ranking: PlayerResult[], winnerIds: number[]): Promise<void>
  /** phòng đổi trạng thái -> báo danh sách phòng cho mọi người */
  roomsChanged(): void
}

interface Player {
  id: number
  name: string
  /** tài khoản bé: không cược */
  isKid: boolean
  /** số chuối người này đã thực sự cược (bé = 0) */
  stake: number
  score: number
  correctCount: number
  left: boolean
  powersUsed: number
  frozenUntil: number
  shieldActive: boolean
  // trạng thái của câu hiện tại
  answer: string | null
  answeredAt: number
  doubleActive: boolean
  extraMs: number
}

export class BattleRoom {
  readonly id: string
  hostId: number
  settings: RoomSettings
  status: 'lobby' | 'playing' | 'finished' = 'lobby'
  players = new Map<number, Player>()
  invited = new Set<number>()
  pot = 0
  /** true = không người lớn nào thắng nên hũ được trả lại cho người đã cược */
  potRefunded = false

  private questions: GameQuestion[] = []
  private questionIndex = -1
  private questionStartedAt = 0
  private timer: ReturnType<typeof setTimeout> | null = null

  // nối từ
  private chainOrder: number[] = []
  private chainTurn = 0
  private chainLastWord = ''
  private chainUsed = new Set<string>()
  private chainHistory: { playerId: number; word: string }[] = []
  private chainDeadline = 0

  constructor(
    id: string,
    host: { id: number; name: string; isKid?: boolean },
    settings: RoomSettings,
    private io: RoomIO,
  ) {
    this.id = id
    this.hostId = host.id
    this.settings = settings
    this.addPlayer(host.id, host.name, host.isKid ?? false)
  }

  /* ----------------------------- phòng chờ ----------------------------- */

  addPlayer(id: number, name: string, isKid = false): string | null {
    if (this.status !== 'lobby') return 'Trận đã bắt đầu'
    if (this.players.size >= MAX_PLAYERS && !this.players.has(id)) return 'Phòng đã đủ 6 người'
    this.players.set(id, {
      id,
      name,
      isKid,
      stake: 0,
      score: 0,
      correctCount: 0,
      left: false,
      powersUsed: 0,
      frozenUntil: 0,
      shieldActive: false,
      answer: null,
      answeredAt: 0,
      doubleActive: false,
      extraMs: 0,
    })
    this.broadcastUpdate()
    return null
  }

  /** Người chơi rời phòng. Trả về true nếu phòng nên bị đóng. */
  removePlayer(id: number): boolean {
    const player = this.players.get(id)
    if (!player) return false
    if (this.status === 'lobby') {
      this.players.delete(id)
      if (id === this.hostId || this.players.size === 0) return true // chủ phòng rời -> đóng phòng
      this.broadcastUpdate()
      return false
    }
    // đang chơi: đánh dấu đã rời, vẫn giữ điểm (mất cược)
    player.left = true
    const stillPlaying = [...this.players.values()].filter((p) => !p.left)
    if (this.status === 'playing' && stillPlaying.length <= 1) void this.endGame()
    else if (this.settings.gameType === 'word-chain' && this.chainOrder[this.chainTurn] === id) this.eliminateChainPlayer(id, 'Đã rời phòng')
    else this.broadcastUpdate()
    return false
  }

  summary(): RoomSummary {
    return {
      id: this.id,
      hostId: this.hostId,
      settings: this.settings,
      status: this.status,
      players: [...this.players.values()].map((p) => ({ id: p.id, name: p.name, score: p.score, left: p.left, isKid: p.isKid })),
      invited: [...this.invited],
    }
  }

  private broadcast(message: ServerMessage) {
    for (const player of this.players.values()) if (!player.left) this.io.sendTo(player.id, message)
  }

  private broadcastUpdate() {
    this.broadcast({ t: 'room:update', room: this.summary() })
    this.io.roomsChanged()
  }

  /* ------------------------------ bắt đầu ------------------------------ */

  async start(byUserId: number): Promise<string | null> {
    if (byUserId !== this.hostId) return 'Chỉ chủ phòng được bắt đầu'
    if (this.status !== 'lobby') return 'Trận đã bắt đầu'
    if (this.players.size < 2) return 'Cần ít nhất 2 người'

    // thu chuối cược; ai không đủ thì bị mời ra. Bé không cược (stake = 0).
    for (const player of [...this.players.values()]) {
      if (player.isKid || this.settings.bet === 0) {
        player.stake = 0
      } else if (!(await this.io.takeBet(player.id, this.settings.bet))) {
        this.players.delete(player.id)
        this.io.sendTo(player.id, { t: 'room:closed', roomId: this.id, reason: 'Bạn không đủ chuối để cược' })
      } else {
        player.stake = this.settings.bet
        this.pot += this.settings.bet
      }
    }
    if (this.players.size < 2) {
      // không đủ người: trả lại cược cho người còn lại, quay về phòng chờ
      for (const player of this.players.values()) {
        if (player.stake > 0) await this.io.refundBet(player.id, player.stake)
        player.stake = 0
      }
      this.pot = 0
      this.broadcastUpdate()
      return 'Không đủ người có chuối để cược'
    }

    this.status = 'playing'
    this.broadcastUpdate()
    const startsAt = Date.now() + COUNTDOWN_MS
    this.broadcast({ t: 'game:countdown', startsAt })

    if (this.settings.gameType === 'word-chain') {
      this.chainOrder = [...this.players.keys()].sort(() => Math.random() - 0.5)
      this.chainLastWord = CHAIN_STARTING_WORDS[Math.floor(Math.random() * CHAIN_STARTING_WORDS.length)]
      this.chainUsed.add(this.chainLastWord)
      this.chainHistory.push({ playerId: 0, word: this.chainLastWord })
      this.timer = setTimeout(() => this.nextChainTurn(true), COUNTDOWN_MS)
    } else {
      this.questions = generateQuestions(this.settings.gameType, this.settings.topicId, this.settings.questionCount, Math.floor(Math.random() * 2 ** 31))
      if (this.questions.length === 0) {
        await this.endGame()
        return 'Chủ đề này không đủ câu hỏi cho kiểu chơi đã chọn'
      }
      this.timer = setTimeout(() => this.nextQuestion(), COUNTDOWN_MS)
    }
    return null
  }

  /* ------------------------ kiểu theo câu hỏi ------------------------ */

  private get timeLimitMs() {
    return this.settings.secondsPerQuestion * 1000
  }

  private nextQuestion() {
    this.questionIndex++
    if (this.questionIndex >= this.questions.length) {
      void this.endGame()
      return
    }
    for (const player of this.players.values()) {
      player.answer = null
      player.answeredAt = 0
      player.doubleActive = false
      player.extraMs = 0
    }
    this.questionStartedAt = Date.now()
    this.broadcast({
      t: 'game:question',
      index: this.questionIndex,
      total: this.questions.length,
      question: hideAnswer(this.questions[this.questionIndex]),
      startedAt: this.questionStartedAt,
      timeLimitMs: this.timeLimitMs,
    })
    // hết giờ (cộng phần thêm giờ tối đa có thể dùng) thì lật đáp án
    this.scheduleReveal(this.timeLimitMs + 300)
  }

  private scheduleReveal(delayMs: number) {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => this.reveal(), delayMs)
  }

  answer(userId: number, questionIndex: number, answer: string): string | null {
    const player = this.players.get(userId)
    if (!player || player.left || this.status !== 'playing' || questionIndex !== this.questionIndex) return null
    if (player.answer !== null) return null
    const now = Date.now()
    if (now < player.frozenUntil) return 'Bạn đang bị đóng băng ❄️'
    if (now > this.questionStartedAt + this.timeLimitMs + player.extraMs + 500) return 'Hết giờ'
    player.answer = answer
    player.answeredAt = now
    // ai cũng trả lời rồi -> lật đáp án sớm
    const active = [...this.players.values()].filter((p) => !p.left)
    if (active.every((p) => p.answer !== null)) this.scheduleReveal(300)
    return null
  }

  private reveal() {
    const question = this.questions[this.questionIndex]
    const results: Record<number, { correct: boolean; points: number; answer: string }> = {}
    for (const player of this.players.values()) {
      const answer = player.answer ?? ''
      const correct = player.answer !== null && isGameAnswerCorrect(question, answer)
      const timeUsed = player.answeredAt ? player.answeredAt - this.questionStartedAt : this.timeLimitMs
      let points = pointsForAnswer(correct, timeUsed, this.timeLimitMs + player.extraMs)
      if (player.doubleActive) points *= 2
      player.score += points
      if (correct) player.correctCount++
      results[player.id] = { correct, points, answer }
    }
    this.broadcast({
      t: 'game:reveal',
      index: this.questionIndex,
      correctAnswer: correctAnswerText(question),
      correctIndex: question.correctIndex,
      results,
      scores: Object.fromEntries([...this.players.values()].map((p) => [p.id, p.score])),
    })
    this.timer = setTimeout(() => this.nextQuestion(), REVEAL_PAUSE_MS)
  }

  /* ------------------------------ sức mạnh ------------------------------ */

  async usePower(userId: number, power: PowerId, targetId?: number): Promise<string | null> {
    const player = this.players.get(userId)
    if (!player || this.status !== 'playing' || this.settings.gameType === 'word-chain') return 'Không dùng được sức mạnh lúc này'
    if (player.powersUsed >= MAX_POWERS_PER_MATCH) return `Mỗi trận chỉ dùng tối đa ${MAX_POWERS_PER_MATCH} sức mạnh`
    const question = this.questions[this.questionIndex]
    if (power === 'power-fifty' && (question?.kind !== 'choice' || (question.options?.length ?? 0) < 3)) return '50/50 chỉ dùng cho câu trắc nghiệm'
    if (power === 'power-freeze') {
      const target = targetId ? this.players.get(targetId) : undefined
      if (!target || target.left || target.id === userId) return 'Chọn 1 đối thủ để đóng băng'
    }
    if (!(await this.io.consumePower(userId, power))) return 'Bạn không còn sức mạnh này — mua thêm ở Cửa hàng'
    player.powersUsed++

    switch (power) {
      case 'power-freeze': {
        const target = this.players.get(targetId!)!
        if (target.shieldActive) {
          target.shieldActive = false
          this.broadcast({ t: 'game:power-used', fromId: userId, power, targetId, blocked: true })
          return null
        }
        target.frozenUntil = Date.now() + FREEZE_MS
        this.io.sendTo(target.id, { t: 'game:frozen', until: target.frozenUntil })
        break
      }
      case 'power-shield':
        player.shieldActive = true
        break
      case 'power-double':
        player.doubleActive = true
        break
      case 'power-time':
        player.extraMs += EXTRA_TIME_MS
        this.io.sendTo(userId, { t: 'game:extra-time', questionIndex: this.questionIndex, extraMs: player.extraMs })
        // lùi giờ lật đáp án để người này có thêm thời gian
        this.scheduleReveal(Math.max(0, this.questionStartedAt + this.timeLimitMs + player.extraMs + 300 - Date.now()))
        break
      case 'power-fifty': {
        const wrong = (question.options ?? []).map((_, i) => i).filter((i) => i !== question.correctIndex)
        const remove = wrong.sort(() => Math.random() - 0.5).slice(0, 2)
        this.io.sendTo(userId, { t: 'game:fifty', questionIndex: this.questionIndex, removeIndexes: remove })
        break
      }
    }
    this.broadcast({ t: 'game:power-used', fromId: userId, power, targetId })
    return null
  }

  /* ------------------------------ nối từ ------------------------------ */

  private aliveChainPlayers(): number[] {
    return this.chainOrder.filter((id) => !this.players.get(id)?.left)
  }

  private nextChainTurn(isFirst = false) {
    const alive = this.aliveChainPlayers()
    if (alive.length <= 1 || this.chainHistory.length > CHAIN_MAX_TURNS) {
      void this.endGame()
      return
    }
    if (!isFirst) this.chainTurn = (this.chainTurn + 1) % this.chainOrder.length
    // bỏ qua người đã bị loại
    while (this.players.get(this.chainOrder[this.chainTurn])?.left) this.chainTurn = (this.chainTurn + 1) % this.chainOrder.length
    this.chainDeadline = Date.now() + CHAIN_TURN_MS
    this.broadcast({
      t: 'game:chain-turn',
      playerId: this.chainOrder[this.chainTurn],
      requiredLetter: this.chainLastWord.slice(-1),
      lastWord: this.chainLastWord,
      deadline: this.chainDeadline,
      alive,
      scores: Object.fromEntries([...this.players.values()].map((p) => [p.id, p.score])),
      history: this.chainHistory.slice(-12),
    })
    if (this.timer) clearTimeout(this.timer)
    const playerId = this.chainOrder[this.chainTurn]
    this.timer = setTimeout(() => this.eliminateChainPlayer(playerId, 'Hết giờ ⏰'), CHAIN_TURN_MS + 300)
  }

  private eliminateChainPlayer(playerId: number, reason: string) {
    const player = this.players.get(playerId)
    if (player) player.left = true
    this.broadcast({ t: 'game:chain-out', playerId, reason })
    // người bị loại vẫn nhận tin để xem tiếp
    if (player) this.io.sendTo(playerId, { t: 'game:chain-out', playerId, reason })
    this.nextChainTurn()
  }

  submitChainWord(userId: number, rawWord: string) {
    if (this.status !== 'playing' || this.settings.gameType !== 'word-chain' || this.chainOrder[this.chainTurn] !== userId) return
    const word = rawWord.trim().toLowerCase()
    const reject = (reason: string) => this.io.sendTo(userId, { t: 'game:chain-rejected', word, reason })
    if (!/^[a-z]{3,}$/.test(word)) return reject('Từ phải có ít nhất 3 chữ cái, không dấu cách')
    if (word[0] !== this.chainLastWord.slice(-1)) return reject(`Phải bắt đầu bằng chữ "${this.chainLastWord.slice(-1).toUpperCase()}"`)
    if (this.chainUsed.has(word)) return reject('Từ này đã dùng rồi')
    if (!isDictionaryWord(word)) return reject('Không có trong từ điển')

    const player = this.players.get(userId)!
    player.score += 10 + Math.max(0, word.length - 3) * 2 // từ càng dài càng nhiều điểm
    player.correctCount++
    this.chainUsed.add(word)
    this.chainLastWord = word
    this.chainHistory.push({ playerId: userId, word })
    this.nextChainTurn()
  }

  /* ------------------------------ kết thúc ------------------------------ */

  private ranking(): PlayerResult[] {
    return [...this.players.values()]
      .map((p) => ({ id: p.id, name: p.name, score: p.score, correctCount: p.correctCount, bananaChange: p.stake > 0 ? -p.stake : 0, isKid: p.isKid }))
      .sort((a, b) => b.score - a.score)
  }

  private async endGame() {
    if (this.status === 'finished') return
    this.status = 'finished'
    if (this.timer) clearTimeout(this.timer)
    const ranking = this.ranking()

    let winnerIds: number[]
    if (this.settings.gameType === 'word-chain') {
      // nối từ: người còn trụ lại thắng; nếu nhiều người còn (hết lượt) thì ai điểm cao nhất
      const alive = this.aliveChainPlayers()
      const pool = alive.length > 0 ? ranking.filter((r) => alive.includes(r.id)) : ranking
      const best = pool[0]?.score ?? 0
      winnerIds = pool.filter((r) => r.score === best).map((r) => r.id)
    } else {
      const best = ranking[0]?.score ?? 0
      winnerIds = ranking.filter((r) => r.score === best && !this.players.get(r.id)?.left).map((r) => r.id)
      if (winnerIds.length === 0) winnerIds = ranking.filter((r) => r.score === best).map((r) => r.id)
    }
    // chia hũ cho người LỚN thắng (bé không nhận hũ)
    const adultWinnerIds = winnerIds.filter((id) => !this.players.get(id)?.isKid)
    if (adultWinnerIds.length > 0) {
      const share = Math.floor(this.pot / adultWinnerIds.length)
      for (const result of ranking) if (adultWinnerIds.includes(result.id)) result.bananaChange += share
      // phần lẻ cho người thắng đầu tiên
      const remainder = this.pot - share * adultWinnerIds.length
      const firstWinner = ranking.find((r) => r.id === adultWinnerIds[0])
      if (firstWinner) firstWinner.bananaChange += remainder
    } else if (this.pot > 0) {
      // chỉ có bé thắng: trả lại cược cho mọi người lớn đã cược
      this.potRefunded = true
      for (const result of ranking) result.bananaChange = 0
    }
    // bé thắng: thưởng cố định (FamilyHub kiểm tra giới hạn / ngày rồi mới cộng thật)
    for (const result of ranking) if (result.isKid && winnerIds.includes(result.id)) result.bananaChange = KID_BATTLE_WIN_REWARD

    await this.io.finish(this, ranking, winnerIds)
    for (const player of this.players.values()) {
      this.io.sendTo(player.id, { t: 'game:over', roomId: this.id, ranking, pot: this.pot, winnerIds })
    }
    this.io.roomsChanged()
  }

  /** Số chuối 1 người đã cược trong trận này (bé = 0). */
  stakeOf(userId: number): number {
    return this.players.get(userId)?.stake ?? 0
  }

  /** Dọn hẹn giờ khi phòng bị huỷ. */
  dispose() {
    if (this.timer) clearTimeout(this.timer)
  }
}
