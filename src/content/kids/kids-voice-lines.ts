/**
 * kids-voice-lines.ts
 * ----------------------------------------------------------------------------
 * MỌI CÂU MASCOT NÓI TRONG KHU TRÒ CHƠI TRẺ EM — tiếng Việt + tiếng Anh.
 * Các câu này sẽ được đổi thành file âm thanh (TTS), nên:
 *   - viết như người nói, không ký hiệu lạ, số viết bằng chữ ("ba mươi phút");
 *   - {mascot} = tên mascot (chưa chốt) → thay tên thật TRƯỚC khi tạo audio.
 *
 * Luật soạn (psych-kids.md mục 4 + mục 12):
 *   - Hướng dẫn (category 'instruction') ≤ 12 từ tiếng Việt (luật 13).
 *   - Thang gợi ý 3 bậc (luật 15): bậc 1 nghe lại, KHÔNG lộ đáp án → bậc 2 bớt đáp án + gợi ý
 *     → bậc 3 hiện đáp án, bé tự bấm lại, câu quay lại cuối vòng. Không có lần sai thứ 4.
 *   - Khen QUÁ TRÌNH / KẾT QUẢ CỤ THỂ, không khen con người. Cấm: "giỏi quá", "thông minh",
 *     "thiên tài", "giỏi nhất", chữ IN HOA, nhiều dấu "!" (luật 17). Khen bằng lời ≤ 1 lần / 4 câu đúng,
 *     không lặp câu trong 1 buổi (luật 18) → có 30 câu khen để xoay vòng.
 *   - Không dùng lời gây áp lực / tội lỗi / tiếc nuối (luật 8, 19). Phần nói không bao giờ nói "Sai" (luật 32).
 *   - Nhắc nghỉ 30 phút: nhẹ nhàng, không khoá, không trách (luật 5–8).
 *
 * Cách dùng trong code: tra theo `id` (VD getKidsVoiceLine('kids-vl-hint1-listen')),
 * hoặc lọc theo `category` / `gameId` / `hintStep` để chọn ngẫu nhiên 1 câu.
 * File audio đề xuất: public/audio/kids/<id>-vi.mp3 và <id>-en.mp3.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content-types'

/** 8 trò chơi trong khu trẻ em (01-ARCHITECTURE.md mục 5). */
export type KidsGameId =
  | 'listen-tap' // 1. Nghe và chạm
  | 'memory-match' // 2. Lật thẻ ghép cặp
  | 'spell-it' // 3. Xếp chữ thành từ
  | 'balloon-pop' // 4. Bóng bay chữ
  | 'sentence-builder' // 5. Ghép câu
  | 'colour-command' // 6. Nghe lệnh tô màu
  | 'speak-unlock' // 7. Nói để mở khoá
  | 'patrol-adventure' // 8. Phiêu lưu cùng mascot

export const KIDS_GAMES: { id: KidsGameId; title: BilingualText }[] = [
  { id: 'listen-tap', title: { vi: 'Nghe và chạm', en: 'Listen & tap' } },
  { id: 'memory-match', title: { vi: 'Lật thẻ ghép cặp', en: 'Memory match' } },
  { id: 'spell-it', title: { vi: 'Xếp chữ thành từ', en: 'Spell it' } },
  { id: 'balloon-pop', title: { vi: 'Bóng bay chữ', en: 'Balloon pop' } },
  { id: 'sentence-builder', title: { vi: 'Ghép câu', en: 'Sentence builder' } },
  { id: 'colour-command', title: { vi: 'Nghe lệnh tô màu', en: 'Colour by command' } },
  { id: 'speak-unlock', title: { vi: 'Nói để mở khoá', en: 'Say it to unlock' } },
  { id: 'patrol-adventure', title: { vi: 'Phiêu lưu cùng {mascot}', en: 'Patrol with {mascot}' } },
]

export type KidsVoiceCategory =
  | 'instruction' // hướng dẫn cách chơi
  | 'hint' // thang gợi ý 3 bậc
  | 'praise-process' // khen cách làm / chiến thuật
  | 'praise-result' // khen kết quả cụ thể
  | 'praise-milestone' // khen lớn — chỉ cho mốc thật (thuộc từ sau 7 ngày, xong bộ)
  | 'try-again' // sai: trung tính, không trách
  | 'speak-retry' // phần nói: máy chưa nghe rõ (không bao giờ nói "Sai")
  | 'round-end' // hết vòng / xong mục tiêu
  | 'rest-reminder' // nhắc nghỉ mắt sau 30 phút
  | 'unlock' // sticker / trang phục mới
  | 'welcome' // chào khi vào khu trẻ em
  | 'story' // mở đầu / kết thúc chương truyện

export interface KidsVoiceLine {
  id: string
  category: KidsVoiceCategory
  vi: string
  en: string
  /** Chỉ dùng trong 1 trò. Không có = dùng chung mọi trò. */
  gameId?: KidsGameId
  /** Chỉ cho category 'hint': bậc 1, 2 hay 3. */
  hintStep?: 1 | 2 | 3
  /** Chỉ cho câu mở khoá trang phục. */
  outfitId?: string
  /** Khi nào phát câu này (ghi chú cho lập trình viên). */
  whenVi?: string
}

export const KIDS_VOICE_LINES: KidsVoiceLine[] = [
  /* ===================== HƯỚNG DẪN (≤ 12 từ tiếng Việt) ===================== */
  { id: 'kids-vl-instr-pick-goal', category: 'instruction', vi: 'Hôm nay bạn muốn chơi mấy vòng?', en: 'How many rounds do you want to play today?',
    whenVi: 'Đầu buổi, màn chọn mục tiêu 1 / 2 / 3 vòng.' },
  { id: 'kids-vl-instr-pick-game', category: 'instruction', vi: 'Chọn một trò bạn thích nhé.', en: 'Pick a game you like.',
    whenVi: 'Sảnh: 3 trò gợi ý hôm nay.' },
  { id: 'kids-vl-instr-replay', category: 'instruction', vi: 'Bấm vào cái loa để nghe lại.', en: 'Tap the speaker to hear it again.' },
  { id: 'kids-vl-instr-slow', category: 'instruction', vi: 'Bấm con rùa để nghe chậm hơn.', en: 'Tap the tortoise to hear it more slowly.' },
  { id: 'kids-vl-instr-keys', category: 'instruction', vi: 'Nhấn phím một đến bốn để chọn đáp án.', en: 'Press one to four to choose an answer.' },
  { id: 'kids-vl-instr-listen-tap', category: 'instruction', gameId: 'listen-tap',
    vi: 'Nghe từ, rồi bấm vào hình đúng.', en: 'Listen, then tap the right picture.' },
  { id: 'kids-vl-instr-memory-picture', category: 'instruction', gameId: 'memory-match',
    vi: 'Lật hai thẻ. Tìm hình và chữ đi cùng nhau.', en: 'Flip two cards. Find a picture and its word.' },
  { id: 'kids-vl-instr-memory-sound', category: 'instruction', gameId: 'memory-match',
    vi: 'Lật thẻ để nghe. Tìm hai thẻ cùng một từ.', en: 'Flip a card to hear it. Find two cards with the same word.' },
  { id: 'kids-vl-instr-spell-it', category: 'instruction', gameId: 'spell-it',
    vi: 'Nghe từ, rồi bấm các chữ cái theo đúng thứ tự.', en: 'Listen, then tap the letters in the right order.' },
  { id: 'kids-vl-instr-balloon-pop', category: 'instruction', gameId: 'balloon-pop',
    vi: 'Nghe từ, rồi bấm vào quả bóng có từ đó.', en: 'Listen, then pop the balloon with that word.' },
  { id: 'kids-vl-instr-balloon-calm', category: 'instruction', gameId: 'balloon-pop',
    vi: 'Bóng bay qua mất cũng không sao, bóng sẽ quay lại.', en: 'Missed a balloon? No problem. It will come back.',
    whenVi: 'Lần đầu có bóng bay khỏi màn hình.' },
  { id: 'kids-vl-instr-sentence-builder', category: 'instruction', gameId: 'sentence-builder',
    vi: 'Bấm các khối chữ để ghép thành câu đúng.', en: 'Tap the word blocks to build the sentence.' },
  { id: 'kids-vl-instr-sentence-meaning', category: 'instruction', gameId: 'sentence-builder',
    vi: 'Đọc nghĩa tiếng Việt, rồi ghép câu tiếng Anh.', en: 'Read the Vietnamese, then build the English sentence.' },
  { id: 'kids-vl-instr-colour-command', category: 'instruction', gameId: 'colour-command',
    vi: 'Nghe lệnh, chọn màu, rồi tô đúng đồ vật.', en: 'Listen, pick a colour, then colour the right thing.' },
  { id: 'kids-vl-instr-speak-unlock', category: 'instruction', gameId: 'speak-unlock',
    vi: 'Bấm nút micro, rồi đọc to từ này.', en: 'Tap the microphone, then say the word.' },
  { id: 'kids-vl-instr-speak-skip', category: 'instruction', gameId: 'speak-unlock',
    vi: 'Không muốn nói? Bấm Bỏ qua, không sao cả.', en: "Don't want to speak? Tap Skip. That's fine." },
  { id: 'kids-vl-instr-speak-self-check', category: 'instruction', gameId: 'speak-unlock',
    vi: 'Nghe mẫu, nghe giọng bạn, rồi chọn Giống hoặc Chưa giống.', en: 'Listen to both, then choose Same or Not yet.',
    whenVi: 'Sau 2 lần máy không nhận ra giọng (luật 33).' },
  { id: 'kids-vl-instr-patrol-adventure', category: 'instruction', gameId: 'patrol-adventure',
    vi: 'Trả lời đúng để giúp {mascot} đi tiếp.', en: 'Answer the question to help {mascot} go on.' },
  { id: 'kids-vl-instr-patrol-skip', category: 'instruction', gameId: 'patrol-adventure',
    vi: 'Muốn vào câu hỏi luôn? Bấm Bỏ qua nhé.', en: 'Want to go to the question? Tap Skip.' },

  /* ===================== GỢI Ý — BẬC 1: nghe / đọc lại, không lộ đáp án ===================== */
  { id: 'kids-vl-hint1-listen', category: 'hint', hintStep: 1, vi: 'Gần rồi. Nghe lại thật kĩ nhé.', en: 'Almost. Listen again carefully.',
    whenVi: 'Sai lần 1 ở trò nghe (listen-tap, balloon-pop, memory-match). Tự phát lại audio.' },
  { id: 'kids-vl-hint1-spell', category: 'hint', hintStep: 1, gameId: 'spell-it', vi: 'Gần rồi. Nghe lại từng âm nhé.', en: 'Almost. Listen to each sound again.' },
  { id: 'kids-vl-hint1-sentence', category: 'hint', hintStep: 1, gameId: 'sentence-builder', vi: 'Gần rồi. Đọc lại nghĩa tiếng Việt nhé.', en: 'Almost. Read the Vietnamese again.' },
  { id: 'kids-vl-hint1-colour', category: 'hint', hintStep: 1, gameId: 'colour-command', vi: 'Gần rồi. Nghe lại lệnh tô màu nhé.', en: 'Almost. Listen to the instruction again.' },
  { id: 'kids-vl-hint1-story', category: 'hint', hintStep: 1, gameId: 'patrol-adventure', vi: 'Gần rồi. Đọc lại câu chuyện một chút nhé.', en: 'Almost. Look at the story again.' },

  /* ===================== GỢI Ý — BẬC 2: bớt đáp án + 1 manh mối ===================== */
  { id: 'kids-vl-hint2-fewer', category: 'hint', hintStep: 2, vi: 'Mình bỏ bớt đáp án rồi. Chọn lại nhé.', en: 'I took some answers away. Try again.',
    whenVi: 'Sai lần 2: còn 2 đáp án.' },
  { id: 'kids-vl-hint2-first-letter', category: 'hint', hintStep: 2, vi: 'Gợi ý: nghe chữ cái đầu tiên nhé.', en: "Hint: here's the first letter.",
    whenVi: 'Phát âm chữ cái đầu ngay sau câu này.' },
  { id: 'kids-vl-hint2-meaning', category: 'hint', hintStep: 2, vi: 'Gợi ý: xem nghĩa tiếng Việt nhé.', en: 'Hint: look at the Vietnamese meaning.' },
  { id: 'kids-vl-hint2-picture', category: 'hint', hintStep: 2, vi: 'Gợi ý: nhìn hình nhỏ ở góc nhé.', en: 'Hint: look at the small picture.' },
  { id: 'kids-vl-hint2-spell', category: 'hint', hintStep: 2, gameId: 'spell-it', vi: 'Gợi ý: chữ cái tiếp theo đang sáng lên.', en: 'Hint: the next letter is glowing.' },
  { id: 'kids-vl-hint2-sentence', category: 'hint', hintStep: 2, gameId: 'sentence-builder', vi: 'Gợi ý: khối chữ đầu tiên đã vào chỗ.', en: 'Hint: the first block is in place now.' },
  { id: 'kids-vl-hint2-colour', category: 'hint', hintStep: 2, gameId: 'colour-command', vi: 'Gợi ý: đồ vật cần tô đang sáng lên.', en: 'Hint: the thing to colour is glowing.' },

  /* ===================== GỢI Ý — BẬC 3: hiện đáp án, bé tự làm lại, câu quay lại cuối vòng ===================== */
  { id: 'kids-vl-hint3-show', category: 'hint', hintStep: 3, vi: 'Đáp án đúng đây. Bấm vào nó nhé.', en: "Here's the right answer. Tap it." },
  { id: 'kids-vl-hint3-spell', category: 'hint', hintStep: 3, gameId: 'spell-it', vi: 'Đây là cách viết đúng. Bấm lại từng chữ nhé.', en: "Here's the spelling. Tap the letters again." },
  { id: 'kids-vl-hint3-sentence', category: 'hint', hintStep: 3, gameId: 'sentence-builder', vi: 'Đây là câu đúng. Ghép lại theo câu này nhé.', en: "Here's the sentence. Build it again." },
  { id: 'kids-vl-hint3-colour', category: 'hint', hintStep: 3, gameId: 'colour-command', vi: 'Đây là chỗ cần tô. Chọn màu rồi tô nhé.', en: "Here's the right thing. Pick the colour and colour it." },
  { id: 'kids-vl-hint3-later', category: 'hint', hintStep: 3, vi: 'Câu này mình gặp lại ở cuối vòng nhé.', en: "We'll see this one again at the end.",
    whenVi: 'Sau khi bé bấm lại đáp án đúng ở bậc 3.' },

  /* ===================== KHEN CÁCH LÀM (process) ===================== */
  { id: 'kids-vl-praise-p01', category: 'praise-process', vi: 'Nghe lại rồi mới chọn, cách làm rất chắc.', en: 'You listened again before choosing. Good plan.' },
  { id: 'kids-vl-praise-p02', category: 'praise-process', vi: 'Bạn nhìn kĩ hình rồi mới bấm.', en: 'You looked carefully before you tapped.' },
  { id: 'kids-vl-praise-p03', category: 'praise-process', vi: 'Sai rồi sửa ngay, học như vậy là nhanh nhất.', en: "You fixed it straight away. That's how we learn." },
  { id: 'kids-vl-praise-p04', category: 'praise-process', gameId: 'spell-it', vi: 'Bạn đánh vần từng chữ một, rất cẩn thận.', en: 'You spelled it letter by letter. Very careful.' },
  { id: 'kids-vl-praise-p05', category: 'praise-process', vi: 'Dùng chữ cái đầu để đoán, chiến thuật hay đấy.', en: 'Using the first letter was a good trick.' },
  { id: 'kids-vl-praise-p06', category: 'praise-process', vi: 'Câu khó mà bạn vẫn kiên trì đến cùng.', en: 'That one was hard, and you kept going.',
    whenVi: 'Chỉ dùng sau câu bé đã sai ít nhất 1 lần (không khen nỗ lực cho câu dễ).' },
  { id: 'kids-vl-praise-p07', category: 'praise-process', gameId: 'sentence-builder', vi: 'Bạn đọc hết câu rồi mới ghép, chuẩn rồi.', en: 'You read the whole sentence first. Nice work.' },
  { id: 'kids-vl-praise-p08', category: 'praise-process', vi: 'Bạn nghe ra đúng từ khoá trong câu.', en: 'You caught the key word in the sentence.' },
  { id: 'kids-vl-praise-p09', category: 'praise-process', gameId: 'speak-unlock', vi: 'Bạn nói to và rõ, {mascot} nghe được hết.', en: 'You spoke loud and clear. {mascot} heard every word.' },
  { id: 'kids-vl-praise-p10', category: 'praise-process', gameId: 'speak-unlock', vi: 'Bạn đọc rõ cả âm cuối của từ.', en: 'You said the last sound clearly.' },
  { id: 'kids-vl-praise-p11', category: 'praise-process', vi: 'Bạn tự sửa lại, giờ thì đúng rồi.', en: "You fixed it yourself. Now it's right." },
  { id: 'kids-vl-praise-p12', category: 'praise-process', gameId: 'memory-match', vi: 'Bạn nhớ được vị trí từng thẻ, hay đấy.', en: 'You remembered where the cards were. Nice.' },
  { id: 'kids-vl-praise-p13', category: 'praise-process', vi: 'Chậm mà chắc, đúng ngay từ lần đầu.', en: 'Slow and steady. Right the first time.' },
  { id: 'kids-vl-praise-p14', category: 'praise-process', gameId: 'sentence-builder', vi: 'Bạn dựa vào nghĩa tiếng Việt để ghép, rất khéo.', en: 'You used the Vietnamese meaning to build it. Good thinking.' },
  { id: 'kids-vl-praise-p15', category: 'praise-process', gameId: 'colour-command', vi: 'Bạn nghe hết lệnh rồi mới tô, rất cẩn thận.', en: 'You listened to the whole instruction first. Careful work.' },

  /* ===================== KHEN KẾT QUẢ CỤ THỂ (result) ===================== */
  { id: 'kids-vl-praise-r01', category: 'praise-result', vi: 'Vòng này bạn đúng nhiều hơn vòng trước.', en: 'You got more right than last round.',
    whenVi: 'Chỉ phát khi điều này đúng thật.' },
  { id: 'kids-vl-praise-r02', category: 'praise-result', vi: 'Không cần gợi ý mà vẫn đúng.', en: 'No hints needed this time.' },
  { id: 'kids-vl-praise-r03', category: 'praise-result', vi: 'Lần trước sai từ này, lần này đúng rồi.', en: 'You missed this word last time. Not this time.' },
  { id: 'kids-vl-praise-r04', category: 'praise-result', gameId: 'sentence-builder', vi: 'Câu dài thế mà khối nào cũng đúng chỗ.', en: 'A long sentence, and every block is in the right place.' },
  { id: 'kids-vl-praise-r05', category: 'praise-result', gameId: 'colour-command', vi: 'Đúng màu, đúng chỗ luôn.', en: 'Right colour, right place.' },
  { id: 'kids-vl-praise-r06', category: 'praise-result', vi: 'Bạn nghe một lần là nhận ra từ.', en: 'You knew the word after one listen.' },
  { id: 'kids-vl-praise-r07', category: 'praise-result', gameId: 'memory-match', vi: 'Ghép hết các cặp mà lật rất ít lần.', en: 'All pairs matched with very few flips.' },
  { id: 'kids-vl-praise-r08', category: 'praise-result', gameId: 'balloon-pop', vi: 'Bóng nào bạn bấm cũng đúng từ.', en: 'Every balloon you popped was the right word.' },
  { id: 'kids-vl-praise-r09', category: 'praise-result', gameId: 'patrol-adventure', vi: 'Nhiệm vụ hoàn thành. Cảm ơn đồng đội!', en: 'Mission complete. Thanks, partner!' },
  { id: 'kids-vl-praise-r10', category: 'praise-result', vi: 'Hôm nay bạn đã thêm từ mới vào sổ.', en: 'You added new words to your book today.' },
  { id: 'kids-vl-praise-r11', category: 'praise-result', vi: 'Đây là từ khó hơn, và bạn đã làm được.', en: 'That was a harder word, and you got it.',
    whenVi: 'Khi bé đúng 1 từ cấp Flyers.' },

  /* ===================== KHEN MỐC THẬT (milestone) ===================== */
  { id: 'kids-vl-praise-m01', category: 'praise-milestone', vi: 'Một tuần rồi mà bạn vẫn nhớ từ này. Từ này đã vào trí nhớ dài hạn.',
    en: 'A whole week, and you still remember this word. It is in your long-term memory now.', whenVi: 'Từ lên "đã thuộc" (ôn đúng ở mốc ≥ 7 ngày).' },
  { id: 'kids-vl-praise-m02', category: 'praise-milestone', vi: 'Bạn đã thuộc tất cả các từ của chủ đề này.', en: 'You know every word in this topic now.' },
  { id: 'kids-vl-praise-m03', category: 'praise-milestone', vi: 'Bạn đã chơi thử đủ cả tám trò rồi.', en: 'You have tried all eight games now.' },
  { id: 'kids-vl-praise-m04', category: 'praise-milestone', vi: 'Thẻ tem tuần này đã đủ tem.', en: 'Your stamp card is full this week.' },

  /* ===================== SAI — TRUNG TÍNH ===================== */
  { id: 'kids-vl-retry-01', category: 'try-again', vi: 'Chưa đúng. Thử lại nhé.', en: 'Not quite. Try again.' },
  { id: 'kids-vl-retry-02', category: 'try-again', vi: 'Gần đúng rồi. Mình thử lần nữa.', en: "Close. Let's try once more." },
  { id: 'kids-vl-retry-03', category: 'try-again', vi: 'Câu này hơi khó. Không sao đâu.', en: "This one is tricky. That's OK." },
  { id: 'kids-vl-retry-04', category: 'try-again', vi: 'Chưa phải từ này. Nghe lại xem.', en: 'Not that one. Listen again.' },
  { id: 'kids-vl-retry-05', category: 'try-again', vi: 'Thử cách khác xem sao.', en: "Let's try another way." },

  /* ===================== PHẦN NÓI — máy chưa nghe rõ (không bao giờ nói "Sai") ===================== */
  { id: 'kids-vl-speak-01', category: 'speak-retry', gameId: 'speak-unlock', vi: '{mascot} chưa nghe rõ. Nói lại một lần nữa nhé.', en: "{mascot} didn't catch that. Say it once more?" },
  { id: 'kids-vl-speak-02', category: 'speak-retry', gameId: 'speak-unlock', vi: 'Thử nói chậm hơn một chút nhé.', en: 'Try saying it a little more slowly.' },
  { id: 'kids-vl-speak-03', category: 'speak-retry', gameId: 'speak-unlock', vi: 'Không sao. Mình chuyển sang tự nghe và so sánh nhé.', en: "No problem. Let's listen and compare instead.",
    whenVi: 'Sau 2 lần máy không nhận ra → màn tự kiểm tra.' },
  { id: 'kids-vl-speak-04', category: 'speak-retry', gameId: 'speak-unlock', vi: 'Micro chưa bật. Bạn có thể bỏ qua phần nói.', en: 'The microphone is off. You can skip speaking.' },

  /* ===================== HẾT VÒNG — không FOMO, 2 nút ngang nhau ===================== */
  { id: 'kids-vl-end-01', category: 'round-end', vi: 'Xong một vòng rồi. Bạn muốn làm gì tiếp?', en: 'Round done. What would you like to do next?' },
  { id: 'kids-vl-end-02', category: 'round-end', vi: 'Xong mục tiêu hôm nay rồi.', en: "Today's goal is done." },
  { id: 'kids-vl-end-03', category: 'round-end', vi: 'Chơi thêm một vòng hay nghỉ ở đây đều được.', en: 'One more round, or stop here. Both are fine.' },
  { id: 'kids-vl-end-04', category: 'round-end', vi: 'Hôm nay mình chơi vậy là xong. Hẹn gặp lại nhé.', en: "We're done for today. See you next time." },
  { id: 'kids-vl-end-05', category: 'round-end', vi: 'Mấy từ khó hôm nay sẽ quay lại ở lượt sau.', en: "Today's tricky words will come back next time." },
  { id: 'kids-vl-end-06', category: 'round-end', vi: 'Mình nghỉ ở đây nhé. Mọi thứ đã được lưu.', en: "Let's stop here. Everything is saved." },

  /* ===================== NHẮC NGHỈ MẮT (30 phút) — nhẹ nhàng, không khoá ===================== */
  { id: 'kids-vl-rest-01', category: 'rest-reminder', vi: 'Mình chơi được ba mươi phút rồi. Cho mắt nghỉ một chút nhé.', en: "We've played for thirty minutes. Let's rest our eyes for a bit.",
    whenVi: 'Phát ở ranh giới vòng, không cắt giữa câu.' },
  { id: 'kids-vl-rest-02', category: 'rest-reminder', vi: 'Nhìn ra cửa sổ, ngắm một thứ thật xa nhé.', en: 'Look out of the window at something far away.' },
  { id: 'kids-vl-rest-03', category: 'rest-reminder', vi: 'Bạn có thể chơi nốt vòng này rồi nghỉ.', en: 'You can finish this round, then take a break.' },
  { id: 'kids-vl-rest-04', category: 'rest-reminder', vi: 'Đứng dậy vươn vai cùng {mascot} nào.', en: "Let's stand up and stretch with {mascot}." },
  { id: 'kids-vl-rest-05', category: 'rest-reminder', vi: 'Nghỉ ngơi xong mình gặp lại nhé.', en: 'See you after your break.' },

  /* ===================== MỞ KHOÁ STICKER / TRANG PHỤC ===================== */
  { id: 'kids-vl-unlock-sticker', category: 'unlock', vi: 'Bạn đã thuộc từ này. Thêm một sticker vào sổ sưu tập.', en: 'You know this word now. A new sticker for your album.' },
  { id: 'kids-vl-unlock-set', category: 'unlock', vi: 'Trang sticker của chủ đề này đã đầy.', en: 'This topic page in your album is full.' },
  { id: 'kids-vl-unlock-outfit', category: 'unlock', vi: 'Trang phục mới đã mở khoá. Vào tủ đồ xem nhé.', en: 'A new outfit is unlocked. Come and see it in the wardrobe.' },
  { id: 'kids-vl-outfit-police-uniform', category: 'unlock', outfitId: 'police-uniform', vi: 'Bộ đồng phục quen thuộc. {mascot} đứng nghiêm chào bạn.', en: 'The usual uniform. {mascot} salutes you.',
    whenVi: 'Khi bé chọn lại bộ đồ mặc định trong tủ đồ.' },
  { id: 'kids-vl-outfit-safari-explorer', category: 'unlock', outfitId: 'safari-explorer', vi: '{mascot} sẵn sàng đi thám hiểm rừng xanh rồi.', en: '{mascot} is ready to explore the forest.' },
  { id: 'kids-vl-outfit-doctor', category: 'unlock', outfitId: 'doctor', vi: '{mascot} đeo ống nghe rồi. Khám cho gấu bông nào.', en: '{mascot} has a stethoscope now. Time to check on Teddy.' },
  { id: 'kids-vl-outfit-chef', category: 'unlock', outfitId: 'chef', vi: 'Mũ đầu bếp đây rồi. Hôm nay {mascot} nấu món gì nhỉ?', en: "Here's the chef hat. What shall {mascot} cook today?" },
  { id: 'kids-vl-outfit-graduate', category: 'unlock', outfitId: 'graduate', vi: 'Mũ tốt nghiệp đây rồi. Cả chủ đề trường lớp đã xong.', en: "Here's the graduation cap. The whole school topic is done." },
  { id: 'kids-vl-outfit-party-time', category: 'unlock', outfitId: 'party-time', vi: 'Đội mũ tiệc vào. Bắt đầu bữa tiệc thôi!', en: "Party hat on. Let's start the party!" },
  { id: 'kids-vl-outfit-pyjamas', category: 'unlock', outfitId: 'pyjamas', vi: 'Bộ đồ ngủ êm quá. {mascot} ngáp một cái thật to.', en: 'Soft pyjamas. {mascot} gives a big yawn.' },
  { id: 'kids-vl-outfit-football-kit', category: 'unlock', outfitId: 'football-kit', vi: 'Áo đá bóng đây rồi. Ra sân thôi!', en: "Football kit on. Let's play!" },
  { id: 'kids-vl-outfit-pilot', category: 'unlock', outfitId: 'pilot', vi: 'Phi công {mascot} sẵn sàng cất cánh.', en: 'Pilot {mascot} is ready to take off.' },
  { id: 'kids-vl-outfit-raincoat', category: 'unlock', outfitId: 'raincoat', vi: 'Áo mưa vàng đây rồi. Trời mưa cũng không lo.', en: 'Yellow raincoat on. Rain is no problem now.' },
  { id: 'kids-vl-outfit-firefighter', category: 'unlock', outfitId: 'firefighter', vi: 'Mũ cứu hoả đây rồi. {mascot} sẵn sàng giúp mọi người.', en: "Firefighter helmet on. {mascot} is ready to help." },

  /* ===================== CHÀO MỪNG — không trách, không hỏi "sao lâu thế" ===================== */
  { id: 'kids-vl-welcome-01', category: 'welcome', vi: 'Chào đồng đội! Hôm nay mình tuần tra chủ đề nào?', en: 'Hi, partner! Which topic shall we patrol today?' },
  { id: 'kids-vl-welcome-02', category: 'welcome', vi: 'Lại gặp bạn rồi. Mình ôn mấy từ cũ trước nhé?', en: 'Good to see you again. Shall we start with some old words?' },
  { id: 'kids-vl-welcome-03', category: 'welcome', vi: 'Lâu rồi mới gặp. Mình ôn nhẹ vài từ nhé.', en: "It's been a while. Let's warm up with a few words.",
    whenVi: 'Bé quay lại sau ≥ 3 ngày nghỉ. Không nhắc số ngày đã nghỉ.' },
  { id: 'kids-vl-welcome-04', category: 'welcome', vi: 'Chào buổi sáng! {mascot} đã sẵn sàng.', en: 'Good morning! {mascot} is ready.' },
  { id: 'kids-vl-welcome-05', category: 'welcome', vi: 'Chào buổi chiều! Mình chơi một vòng nhé?', en: 'Good afternoon! Shall we play a round?' },
  { id: 'kids-vl-welcome-06', category: 'welcome', vi: 'Chào buổi tối! Sẵn sàng chơi chưa nào?', en: 'Good evening! Ready to play?' },
  { id: 'kids-vl-welcome-07', category: 'welcome', vi: 'Hôm qua bạn đã học thêm từ mới. Hôm nay mình ôn lại nhé.', en: "You learned new words yesterday. Let's review them today." },

  /* ===================== TRUYỆN TUẦN TRA ===================== */
  { id: 'kids-vl-story-start', category: 'story', gameId: 'patrol-adventure', vi: 'Có nhiệm vụ mới! Cùng {mascot} lên đường nào.', en: "A new mission! Let's go with {mascot}." },
  { id: 'kids-vl-story-end', category: 'story', gameId: 'patrol-adventure', vi: 'Chương này xong rồi. Cảm ơn đồng đội đã giúp {mascot}.', en: 'This chapter is done. Thanks for helping {mascot}, partner.' },
]

/** Tra 1 câu theo id. Trả về undefined nếu không có (giao diện nên im lặng thay vì báo lỗi). */
export function getKidsVoiceLine(id: string): KidsVoiceLine | undefined {
  return KIDS_VOICE_LINES.find((line) => line.id === id)
}
