/**
 * playground-text.ts — CHỮ GIAO DIỆN CỦA "SÂN CHƠI GIA ĐÌNH" (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 * Dùng cho trang /play và các trang cũ được làm lại giao diện (đấu trường, cửa hàng,
 * nhiệm vụ, bảng xếp hạng, chat, sự kiện, mini game…).
 * Chữ CŨ vẫn nằm trong src/translations/ui-text.ts (gọi bằng t('...')) — file này
 * chỉ chứa chữ MỚI của bản v3, để không phải sửa file chung.
 *
 *   const playText = usePlayText()
 *   playText('hubTitle')                       -> "Sân chơi gia đình"
 *   playText('liveOnline', { n: 3 })           -> "3 người đang online"
 *
 * Quy tắc giọng văn (04-DESIGN-SYSTEM mục 11): xưng "bạn", câu ngắn, không khen
 * "giỏi quá / thiên tài", sai = "Chưa đúng" + bước tiếp theo, không viết HOA cả câu.
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

export const PLAY_TEXT = {
  /* ---------- chung ---------- */
  backToPlay: { vi: 'Sân chơi', en: 'Playground' },
  you: { vi: 'Bạn', en: 'You' },
  play: { vi: 'Chơi', en: 'Play' },
  playNow: { vi: 'Chơi ngay', en: 'Play now' },
  seeAll: { vi: 'Xem tất cả', en: 'See all' },
  loadingShort: { vi: 'Đang tải…', en: 'Loading…' },
  couldNotLoad: { vi: 'Chưa tải được — thử lại sau ít phút.', en: "Couldn't load — try again in a minute." },
  retry: { vi: 'Thử lại', en: 'Try again' },
  bananaCount: { vi: '{n} chuối', en: '{n} bananas' },
  bananaShort: { vi: '{n} 🍌', en: '{n} 🍌' },
  points: { vi: '{n} điểm', en: '{n} pts' },
  pointsUnit: { vi: 'điểm', en: 'pts' },
  claimShort: { vi: 'Nhận', en: 'Collect' },
  rankOf: { vi: 'Hạng {rank}/{total}', en: 'Rank {rank} of {total}' },
  daysLeft: { vi: 'Còn {n} ngày', en: '{n} days left' },
  lastDay: { vi: 'Hôm nay là ngày cuối', en: 'Last day today' },

  /* ---------- trang /play ---------- */
  hubTitle: { vi: 'Sân chơi gia đình', en: 'Family playground' },
  hubIntro: { vi: 'Chơi cùng cả nhà sau giờ học — mỗi ván chỉ vài phút.', en: 'Play with your family after studying — each round takes a few minutes.' },
  hubShop: { vi: 'Cửa hàng', en: 'Shop' },

  liveEyebrow: { vi: 'Đấu trực tiếp · 1 đấu 1 hoặc 2–6 người', en: 'Live battle · 1v1 or 2–6 players' },
  liveTitle: { vi: 'Đấu trường gia đình', en: 'Family arena' },
  liveOnline: { vi: '{n} người đang online', en: '{n} online now' },
  liveNobodyOnline: { vi: 'Chưa ai online. Cứ tạo phòng — ai mở web sẽ thấy lời mời.', en: 'Nobody is online. Create a room — whoever opens the app sees your invite.' },
  liveOpenRooms: { vi: 'Phòng đang chờ người', en: 'Rooms waiting for players' },
  liveRoomBy: { vi: 'Phòng của {name}', en: "{name}'s room" },
  liveJoin: { vi: 'Vào phòng', en: 'Join' },
  liveCreate: { vi: 'Tạo phòng', en: 'Create a room' },
  liveChallenge: { vi: 'Thách {name}', en: 'Challenge {name}' },
  liveChallengeAny: { vi: 'Thách đấu', en: 'Challenge' },
  liveBackToRoom: { vi: 'Quay lại phòng của bạn', en: 'Back to your room' },
  liveInRoom: { vi: 'Bạn đang ở trong 1 phòng đấu.', en: 'You are in a battle room.' },
  liveKidNote: { vi: 'Chơi vui, không cược chuối. Thắng vẫn có thưởng!', en: 'Just for fun, no betting. Winners still get a prize!' },
  liveBetNote: { vi: 'Có thể cược chuối — người thắng lấy cả hũ.', en: 'Bet bananas if you like — the winner takes the pot.' },
  liveModes: { vi: '4 kiểu đấu', en: '4 battle modes' },
  liveConnecting: { vi: 'Đang kết nối đấu trường…', en: 'Connecting to the arena…' },

  eventsTitle: { vi: 'Sự kiện', en: 'Events' },
  eventToday: { vi: 'Hôm nay', en: 'Today' },
  eventThisWeek: { vi: 'Tuần này', en: 'This week' },

  dailyNotPlayed: { vi: 'Bạn chưa đoán hôm nay', en: "You haven't guessed today" },
  dailySolved: { vi: 'Bạn đoán ra sau {n}/6 lượt', en: 'You got it in {n}/6' },
  dailyFailed: { vi: 'Hôm nay chưa ra — mai có từ mới', en: 'Not today — a new word comes tomorrow' },
  dailyFamily: { vi: '{n} người trong nhà đã chơi', en: '{n} family members played' },
  dailyNobody: { vi: 'Bạn là người đầu tiên hôm nay', en: 'Be the first one today' },
  dailyPlay: { vi: 'Đoán từ hôm nay', en: "Guess today's word" },
  dailySeeFamily: { vi: 'Xem kết quả cả nhà', en: "See the family's results" },

  tourTopic: { vi: 'Chủ đề tuần', en: 'Topic of the week' },
  tourYourRank: { vi: 'Bạn đang hạng {rank}/{total}', en: 'You are #{rank} of {total}' },
  tourNoScore: { vi: 'Bạn chưa có điểm tuần này', en: 'No score from you this week yet' },
  tourBest: { vi: 'Điểm cao nhất của bạn: {n}', en: 'Your best: {n}' },
  tourLeader: { vi: 'Đứng đầu: {name} · {n}', en: 'Leader: {name} · {n}' },
  tourPlay: { vi: 'Chơi giải tuần', en: 'Play the tournament' },
  tourImprove: { vi: 'Chơi lại để phá điểm', en: 'Play again to beat it' },
  tourPrizes: { vi: 'Thưởng hạng 1–3', en: 'Prizes for top 3' },

  bossHp: { vi: 'Máu boss', en: 'Boss HP' },
  bossLeftToday: { vi: 'Hôm nay bạn còn đánh được {n} sát thương', en: 'You can deal {n} more damage today' },
  bossDoneToday: { vi: 'Hôm nay bạn đã đánh đủ — mai tiếp nhé', en: "You've hit enough today — more tomorrow" },
  bossAttack: { vi: 'Đánh boss', en: 'Attack' },
  bossDefeated: { vi: 'Boss đã gục!', en: 'Boss defeated!' },
  bossClaim: { vi: 'Nhận {n} chuối', en: 'Collect {n} bananas' },
  bossClaimed: { vi: 'Đã nhận thưởng', en: 'Reward collected' },
  bossTeam: { vi: '{n} người đã góp sức', en: '{n} helped so far' },

  gamesTitle: { vi: 'Mini game', en: 'Mini games' },
  gamesIntro: { vi: 'Chơi một mình, phá kỷ lục của cả nhà.', en: 'Play solo and beat the family record.' },
  gameRecord: { vi: 'Kỷ lục nhà: {n} · {name}', en: 'Family record: {n} · {name}' },
  gameNoRecord: { vi: 'Chưa ai lập kỷ lục', en: 'No record yet' },

  questsTitle: { vi: 'Nhiệm vụ hôm nay', en: "Today's quests" },
  questsReady: { vi: '{n} phần thưởng đang chờ', en: '{n} rewards waiting' },
  questsAllClaimed: { vi: 'Xong hết nhiệm vụ hôm nay', en: "All of today's quests done" },
  questsOpen: { vi: 'Xem nhiệm vụ', en: 'See quests' },
  questsClaim: { vi: 'Nhận thưởng', en: 'Collect rewards' },

  badgesTitle: { vi: 'Huy hiệu', en: 'Badges' },
  badgesCount: { vi: '{n}/{total} huy hiệu', en: '{n}/{total} badges' },
  badgesNext: { vi: 'Sắp mở', en: 'Up next' },
  badgesOpen: { vi: 'Xem huy hiệu', en: 'See badges' },

  shopTitle: { vi: 'Cửa hàng', en: 'Shop' },
  shopText: { vi: 'Sức mạnh thi đấu, đồ học tập, trang phục và hiệu ứng chat.', en: 'Battle powers, study items, outfits and chat effects.' },
  shopOpen: { vi: 'Vào cửa hàng', en: 'Open the shop' },
  shopPowers: { vi: 'Sức mạnh bạn đang có', en: 'Powers you own' },

  funTitle: { vi: 'Học vui', en: 'Fun words' },
  funText: { vi: 'Thẻ từ theo chủ đề — xem không tính giờ học, chỉ để vui.', en: 'Topic word cards — just for fun, no pressure.' },
  funCards: { vi: '{seen}/{total} thẻ', en: '{seen}/{total} cards' },

  boardTitle: { vi: 'Xếp hạng tuần', en: 'This week' },
  boardOpen: { vi: 'Bảng đầy đủ', en: 'Full board' },
  boardEmpty: { vi: 'Chưa ai có XP tuần này', en: 'No XP yet this week' },

  /* ---------- trang đấu trường ---------- */
  arenaSettings: { vi: 'Luật trận', en: 'Match rules' },
  arenaWho: { vi: 'Mời ai?', en: 'Who to invite?' },
  arenaInviteHint: { vi: 'Người đang offline sẽ nhận lời thách khi mở web.', en: 'Offline people get the challenge when they open the app.' },
  arenaKidBet: { vi: 'Tài khoản bé chơi không cược. Thắng được {n} 🍌.', en: 'Kid accounts play without betting. A win gives {n} 🍌.' },
  arenaNoRooms: { vi: 'Chưa có phòng nào — bạn mở phòng đầu tiên nhé.', en: 'No rooms yet — open the first one.' },
  arenaNobody: { vi: 'Chưa ai online', en: 'Nobody online' },
  arenaInviteCount: { vi: 'Mời {n} người', en: 'Invite {n}' },

  /* ---------- phòng đấu ---------- */
  roomLobby: { vi: 'Phòng chờ', en: 'Lobby' },
  roomRules: { vi: '{q} câu · {s} giây/câu', en: '{q} questions · {s}s each' },
  roomPot: { vi: 'Hũ chuối: {n}', en: 'Pot: {n}' },
  roomFree: { vi: 'Chơi vui, không cược', en: 'Just for fun' },
  roomWaitingSeat: { vi: 'Chỗ trống', en: 'Open seat' },
  roomNeedTwo: { vi: 'Cần ít nhất 2 người để bắt đầu', en: 'Needs at least 2 players' },
  roomCorrect: { vi: 'Đúng rồi!', en: 'Correct!' },
  roomWrong: { vi: 'Chưa đúng', en: 'Not quite' },
  roomTimeout: { vi: 'Hết giờ', en: "Time's up" },
  roomAnswerWas: { vi: 'Đáp án: {answer}', en: 'Answer: {answer}' },
  roomLive: { vi: 'Bảng điểm', en: 'Scoreboard' },
  roomYourPlace: { vi: 'Bạn về thứ {n}', en: 'You finished #{n}' },
  roomWinnerIs: { vi: '{name} thắng!', en: '{name} wins!' },
  roomDraw: { vi: 'Hoà! Đồng hạng nhất', en: "It's a draw — joint first!" },
  roomFinal: { vi: 'Kết quả chung cuộc', en: 'Final results' },
  roomCorrectCount: { vi: '{n} câu đúng', en: '{n} correct' },
  roomNotInRoom: { vi: 'Bạn chưa ở phòng đấu nào', en: "You're not in a battle room" },
  roomNotInRoomText: { vi: 'Tạo phòng mới hoặc vào phòng cả nhà đang mở.', en: 'Create a room or join one your family opened.' },
  roomCountdown: { vi: 'Chuẩn bị…', en: 'Get ready…' },
  roomFrozen: { vi: 'Bạn bị đóng băng', en: "You're frozen" },
  roomTurnLetter: { vi: 'Chữ bắt đầu', en: 'Starts with' },

  /* ---------- chơi một mình ---------- */
  soloSetup: { vi: 'Chọn ván chơi', en: 'Set up your round' },
  soloScore: { vi: 'Điểm', en: 'Score' },
  soloCombo: { vi: '{n} câu đúng liền!', en: '{n} in a row!' },
  soloCorrectOf: { vi: '{n}/{total} câu đúng', en: '{n}/{total} correct' },
  soloRecordBoard: { vi: 'Kỷ lục cả nhà', en: 'Family records' },
  soloBackToPlay: { vi: 'Về sân chơi', en: 'Back to playground' },

  /* ---------- sự kiện ---------- */
  bossYourHits: { vi: 'Lượt vừa rồi: {hits} đòn · {damage} sát thương', en: 'Last round: {hits} hits · {damage} damage' },
  tourLastRun: { vi: 'Lượt vừa rồi: {score} điểm · {correct}/{total} câu đúng', en: 'Last run: {score} pts · {correct}/{total} correct' },
  wordleHowTo: { vi: 'Xanh = đúng chỗ · Vàng = có chữ này, sai chỗ · Xám = không có', en: 'Green = right spot · Yellow = wrong spot · Grey = not in the word' },
  wordleMeaning: { vi: 'Nghĩa', en: 'Meaning' },

  /* ---------- cửa hàng / nhiệm vụ / xếp hạng / hồ sơ ---------- */
  shopBalance: { vi: 'Số chuối của bạn', en: 'Your bananas' },
  shopPreview: { vi: 'Bạn đang trông thế này', en: 'How you look now' },
  shopNotEnough: { vi: 'Cần thêm {n} 🍌', en: 'Need {n} more 🍌' },
  shopEarnHint: { vi: 'Học bài, làm nhiệm vụ và đăng nhập mỗi ngày để có thêm chuối.', en: 'Study, finish quests and log in daily to earn more bananas.' },
  questsWeekResets: { vi: 'Đặt lại mỗi thứ Hai', en: 'Resets every Monday' },
  questsDayResets: { vi: 'Đổi nhiệm vụ mới lúc 0 giờ', en: 'New quests at midnight' },
  questsFamilyHint: { vi: 'Cả nhà góp XP chung — đủ mốc thì ai cũng nhận thưởng.', en: 'Everyone adds XP together — hit the goal and all get the reward.' },
  badgesLocked: { vi: 'Chưa mở', en: 'Locked' },
  badgesComplete: { vi: 'Đủ bộ', en: 'Complete' },
  boardTabWeek: { vi: 'Tuần này', en: 'This week' },
  boardTabAll: { vi: 'Mọi lúc', en: 'All time' },
  boardYourRank: { vi: 'Bạn đang hạng {rank} trong {total} người', en: 'You are #{rank} of {total}' },
  boardGapUp: { vi: 'Còn {n} XP nữa là vượt {name}', en: '{n} XP to pass {name}' },
  boardTop: { vi: 'Bạn đang dẫn đầu tuần này', en: "You're leading this week" },
  boardStudyCta: { vi: 'Học 1 bài để thêm XP', en: 'Do a lesson to add XP' },
  profileStats: { vi: 'Thống kê học tập', en: 'Study stats' },
  profileSettings: { vi: 'Cài đặt', en: 'Settings' },

  /* ---------- chat ---------- */
  chatTitle: { vi: 'Trò chuyện', en: 'Chat' },
  chatFamilyHint: { vi: 'Kênh chung của cả nhà', en: 'Everyone in the family' },
  chatDirectHint: { vi: 'Tin nhắn riêng', en: 'Direct message' },
  chatOnlineNow: { vi: 'Đang online', en: 'Online now' },
  chatEmpty: { vi: 'Chưa có tin nào', en: 'No messages yet' },
  chatEmptyText: { vi: 'Gửi lời chào đầu tiên — {mascot} đứng gác cho.', en: 'Say hi first — {mascot} is on watch.' },
  chatSend: { vi: 'Gửi', en: 'Send' },
  chatProfile: { vi: 'Hồ sơ', en: 'Profile' },
  chatOpenFull: { vi: 'Mở trang chat', en: 'Open full chat' },
  chatClose: { vi: 'Đóng chat', en: 'Close chat' },
  chatChannels: { vi: 'Kênh chat', en: 'Channels' },
  chatEmoji: { vi: 'Biểu cảm', en: 'Emoji' },
  chatSticker: { vi: 'Sticker', en: 'Stickers' },
  chatImage: { vi: 'Gửi ảnh', en: 'Send a photo' },

  /* ---------- học vui ---------- */
  funIntroShort: { vi: 'Xem thẻ theo chủ đề. Xem hết 1 chủ đề được thưởng chuối.', en: 'Browse cards by topic. Finish a topic to earn bananas.' },
  funContinue: { vi: 'Xem tiếp', en: 'Continue' },
  funStart: { vi: 'Bắt đầu', en: 'Start' },
  funDone: { vi: 'Đã xem hết', en: 'All seen' },
  funKeysMove: { vi: 'chuyển thẻ', en: 'switch cards' },
  funKeysFlip: { vi: 'lật thẻ', en: 'flip' },
  familyMore: { vi: '+{n} người', en: '+{n} more' },
  funGuessMode: { vi: 'Đoán nghĩa (ẩn chữ)', en: 'Guess mode (hide the word)' },
  funTopicDone: { vi: 'Bạn đã xem hết chủ đề này!', en: "You've seen every card in this topic!" },
  funNextTopic: { vi: 'Chủ đề tiếp theo', en: 'Next topic' },

  /* ---------- phòng thi (danh sách) ---------- */
  examsHeroTitle: { vi: 'Phòng thi', en: 'Practice tests' },
  examsHeroText: { vi: 'Bài test cuối level và đề thi thử IELTS. Kết quả được lưu để xem lại.', en: 'Level tests and IELTS mock exams. Results are saved for review.' },
  examsLockedHint: { vi: 'Mở khi bạn học xong 80% bài của level', en: 'Unlocks after 80% of the level' },
  examsPassed: { vi: 'Đã qua · {n}%', en: 'Passed · {n}%' },
  examsSections: { vi: '{n} phần', en: '{n} parts' },
  examsPlacementText: { vi: 'Làm lại bài xếp lớp ngắn (≤ 12 câu, khoảng 5 phút) để xem mình đang ở level nào.', en: 'Retake the short placement test (≤ 12 questions, about 5 minutes) to check your level.' },
  examsHistoryEmpty: { vi: 'Làm bài test level đầu tiên khi học xong 80% bài của level.', en: 'Take your first level test after finishing 80% of a level.' },
  liveModesTitle: { vi: 'Kiểu đấu', en: 'Modes' },

  /* ---------- bảng chào ---------- */
  welcomeBack: { vi: 'Chào {name}, mừng bạn quay lại!', en: 'Welcome back, {name}!' },
  welcomeGift: { vi: 'Quà hôm nay: +{n} 🍌', en: "Today's gift: +{n} 🍌" },
  welcomeGiftStreak: { vi: 'Ngày đăng nhập thứ {n} liên tiếp', en: 'Day {n} in a row' },
  welcomeNext: { vi: 'Bài tiếp theo', en: 'Next lesson' },
  welcomeContinue: { vi: 'Học tiếp', en: 'Continue learning' },
  welcomeLater: { vi: 'Để sau', en: 'Later' },
  welcomeNewTitle: { vi: 'Chào mừng {name}!', en: 'Welcome, {name}!' },
  welcomeNewText: { vi: '{mascot} tặng bạn {n} 🍌 để làm quen. Học trước, chơi sau nhé.', en: '{mascot} gives you {n} 🍌 to start. Learn first, then play.' },
  welcomeStartLearning: { vi: 'Vào học', en: 'Start learning' },
  welcomeLookAround: { vi: 'Xem quanh một chút', en: 'Look around first' },
  welcomeNews: { vi: 'Lúc bạn vắng', en: 'While you were away' },
} satisfies Record<string, { vi: string; en: string }>

export type PlayTextKey = keyof typeof PLAY_TEXT

/** Hook trả về hàm lấy chữ của Sân chơi theo ngôn ngữ đang chọn (có thay {biến} và {mascot}). */
export function usePlayText(): (key: PlayTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = PLAY_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return fillMascotName(text)
    },
    [language],
  )
}
