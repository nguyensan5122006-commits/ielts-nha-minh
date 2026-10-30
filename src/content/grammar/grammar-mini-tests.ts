/**
 * grammar-mini-tests.ts — MINI-TEST CHO CÁC BÀI NGỮ PHÁP VIẾT TRƯỚC
 * ----------------------------------------------------------------------------
 * 19 bài ngữ pháp đầu tiên (level-1/2/3-grammar-lessons*.ts) được soạn với `miniTest: []`.
 * File này bổ sung cho mỗi bài 5 câu kiểm tra (có tính tim, mở ở cuối bài) mà không phải
 * sửa từng bài: các file bài bọc mảng bài bằng withGrammarMiniTests().
 *
 * Bài viết sau (…-part3.ts, level-1-…-part2.ts) ghi miniTest thẳng trong bài, không cần file này.
 * Quy ước id câu kiểm tra: "<id bài>-t<số>". Do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Exercise, Lesson } from '../content-types'

const GRAMMAR_MINI_TESTS: Record<string, Exercise[]> = {
  /* ============================ LEVEL 1 ============================ */
  'gr-l1-quantifiers': [
    { id: 'gr-l1-quantifiers-t01', type: 'multiple-choice', question: 'How ___ water do you drink a day?', options: ['many', 'much', 'few', 'a few'], correctIndex: 1, explanation: { vi: 'water không đếm được → How much.', en: 'water is uncountable → How much.' } },
    { id: 'gr-l1-quantifiers-t02', type: 'fill-blank', sentence: 'There are only a ___ students in the room.', acceptedAnswers: ['few'], hint: '(few / little)', explanation: { vi: 'students đếm được → a few.', en: 'students is countable → a few.' } },
    { id: 'gr-l1-quantifiers-t03', type: 'multiple-choice', question: 'Would you like ___ cake?', options: ['any', 'some', 'many', 'a'], correctIndex: 1, explanation: { vi: 'Lời mời → some.', en: 'An offer → some.' } },
    { id: 'gr-l1-quantifiers-t04', type: 'multiple-choice', question: 'Which is correct?', options: ['two furnitures', 'a furniture', 'some furniture', 'many furniture'], correctIndex: 2, explanation: { vi: 'furniture không đếm được → some furniture.', en: 'furniture is uncountable → some furniture.' } },
    { id: 'gr-l1-quantifiers-t05', type: 'fill-blank', sentence: 'We don\'t have ___ homework today.', acceptedAnswers: ['any', 'much'], hint: '(some / any)', explanation: { vi: 'Phủ định → any.', en: 'Negative → any.' } },
  ],
  'gr-l1-pronouns': [
    { id: 'gr-l1-pronouns-t01', type: 'multiple-choice', question: 'Can you help ___ with this box?', options: ['I', 'me', 'my', 'mine'], correctIndex: 1, explanation: { vi: 'Sau động từ (help) → tân ngữ me.', en: 'After a verb (help) → object me.' } },
    { id: 'gr-l1-pronouns-t02', type: 'fill-blank', sentence: 'This is not my pen. It\'s ___.', acceptedAnswers: ['yours', 'his', 'hers', 'theirs', 'ours'], hint: '(you → ?)', explanation: { vi: 'Đứng một mình, không có danh từ theo sau → đại từ sở hữu: yours.', en: 'Standing alone without a noun → possessive pronoun: yours.' } },
    { id: 'gr-l1-pronouns-t03', type: 'multiple-choice', question: 'My sister loves ___ new job.', options: ['she', 'her', 'hers', 'his'], correctIndex: 1, explanation: { vi: 'Trước danh từ (job) → tính từ sở hữu her.', en: 'Before a noun (job) → possessive adjective her.' } },
    { id: 'gr-l1-pronouns-t04', type: 'multiple-choice', question: 'Which is correct?', options: ["my parent's house (2 parents)", "my parents' house", "my parents house", "my parent house"], correctIndex: 1, explanation: { vi: 'Danh từ số nhiều tận cùng -s → chỉ thêm dấu \' : parents\'.', en: 'A plural noun ending in -s → add only the apostrophe: parents\'.' } },
    { id: 'gr-l1-pronouns-t05', type: 'fill-blank', sentence: 'I bought two apples and ate ___ both.', acceptedAnswers: ['them'], hint: '(they → ?)', explanation: { vi: 'Tân ngữ của they → them.', en: 'The object form of they → them.' } },
  ],
  'gr-l1-adverbs': [
    { id: 'gr-l1-adverbs-t01', type: 'multiple-choice', question: 'She speaks English very ___.', options: ['good', 'well', 'goodly', 'best'], correctIndex: 1, explanation: { vi: 'Bổ nghĩa động từ speak → trạng từ well.', en: 'Describes the verb speak → adverb well.' } },
    { id: 'gr-l1-adverbs-t02', type: 'fill-blank', sentence: 'Please drive ___. The road is wet.', acceptedAnswers: ['carefully', 'slowly'], hint: '(careful)', explanation: { vi: 'Bổ nghĩa động từ drive → carefully.', en: 'Describes the verb drive → carefully.' } },
    { id: 'gr-l1-adverbs-t03', type: 'multiple-choice', question: 'The soup smells ___.', options: ['deliciously', 'delicious', 'well', 'more deliciously'], correctIndex: 1, explanation: { vi: 'smell / look / taste + tính từ.', en: 'smell / look / taste + adjective.' } },
    { id: 'gr-l1-adverbs-t04', type: 'multiple-choice', question: 'This bag is ___ heavy for me to carry.', options: ['very', 'too', 'quite', 'enough'], correctIndex: 1, explanation: { vi: 'Quá mức đến không làm được → too.', en: 'So much that you can\'t do it → too.' } },
    { id: 'gr-l1-adverbs-t05', type: 'fill-blank', sentence: 'He is a ___ runner. He runs fast.', acceptedAnswers: ['fast', 'good', 'quick'], hint: '(fast)', explanation: { vi: 'fast vừa là tính từ vừa là trạng từ.', en: 'fast is both an adjective and an adverb.' } },
  ],

  /* ============================ LEVEL 2 ============================ */
  'gr-l2-future': [
    { id: 'gr-l2-future-t01', type: 'multiple-choice', question: 'Look at those clouds! It ___ rain.', options: ['will', 'is going to', 'rains', 'is raining'], correctIndex: 1, explanation: { vi: 'Dự đoán có bằng chứng trước mắt → be going to.', en: 'A prediction from present evidence → be going to.' } },
    { id: 'gr-l2-future-t02', type: 'fill-blank', sentence: 'The phone is ringing. I ___ answer it.', acceptedAnswers: ["'ll", 'will'], hint: '(quyết định ngay lúc nói)', explanation: { vi: 'Quyết định ngay lúc nói → will.', en: 'A decision made at the moment of speaking → will.' } },
    { id: 'gr-l2-future-t03', type: 'multiple-choice', question: 'I ___ my dentist at 10 tomorrow. It\'s booked.', options: ['see', 'will see', 'am seeing', 'saw'], correctIndex: 2, explanation: { vi: 'Lịch hẹn đã sắp xếp → hiện tại tiếp diễn.', en: 'A fixed arrangement → present continuous.' } },
    { id: 'gr-l2-future-t04', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['I will to call you.', 'I will calling you.', 'I will call you.', 'I wills call you.'], correctIndex: 2, explanation: { vi: 'will + V nguyên mẫu.', en: 'will + base verb.' } },
    { id: 'gr-l2-future-t05', type: 'fill-blank', sentence: 'We are ___ to buy a new car next year.', acceptedAnswers: ['going'], hint: '(be going to)', explanation: { vi: 'Kế hoạch đã định → be going to.', en: 'A plan → be going to.' } },
  ],
  'gr-l2-present-perfect': [
    { id: 'gr-l2-present-perfect-t01', type: 'multiple-choice', question: 'I ___ to Japan twice.', options: ['went', 'have been', 'have went', 'was'], correctIndex: 1, explanation: { vi: 'Trải nghiệm, không nói thời điểm → have been.', en: 'An experience with no time given → have been.' } },
    { id: 'gr-l2-present-perfect-t02', type: 'fill-blank', sentence: 'She has lived here ___ 2018.', acceptedAnswers: ['since'], hint: '(for / since)', explanation: { vi: 'Mốc thời gian → since.', en: 'A starting point → since.' } },
    { id: 'gr-l2-present-perfect-t03', type: 'multiple-choice', question: 'We ___ the film last night.', options: ['have seen', 'saw', 'have saw', 'seen'], correctIndex: 1, explanation: { vi: 'last night = thời điểm xác định → quá khứ đơn.', en: 'last night is a finished time → past simple.' } },
    { id: 'gr-l2-present-perfect-t04', type: 'fill-blank', sentence: 'They have known each other ___ ten years.', acceptedAnswers: ['for'], hint: '(for / since)', explanation: { vi: 'Khoảng thời gian → for.', en: 'A period of time → for.' } },
    { id: 'gr-l2-present-perfect-t05', type: 'multiple-choice', question: '___ you ever eaten durian?', options: ['Did', 'Have', 'Has', 'Do'], correctIndex: 1, explanation: { vi: 'ever + trải nghiệm → Have you ever + V3?', en: 'ever + experience → Have you ever + V3?' } },
  ],
  'gr-l2-past-continuous': [
    { id: 'gr-l2-past-continuous-t01', type: 'multiple-choice', question: 'I ___ dinner when you called.', options: ['cooked', 'was cooking', 'am cooking', 'were cooking'], correctIndex: 1, explanation: { vi: 'Hành động dài bị cắt ngang → was cooking.', en: 'A longer action that was interrupted → was cooking.' } },
    { id: 'gr-l2-past-continuous-t02', type: 'fill-blank', sentence: '___ I was walking home, it started to rain.', acceptedAnswers: ['While', 'As', 'When'], hint: '(when / while)', explanation: { vi: 'while + hành động dài.', en: 'while + longer action.' } },
    { id: 'gr-l2-past-continuous-t03', type: 'multiple-choice', question: 'The children ___ when the teacher came in.', options: ['was shouting', 'were shouting', 'shouting', 'shouts'], correctIndex: 1, explanation: { vi: 'children số nhiều → were + V-ing.', en: 'children is plural → were + V-ing.' } },
    { id: 'gr-l2-past-continuous-t04', type: 'fill-blank', sentence: 'What were you ___ at 8 p.m. yesterday?', acceptedAnswers: ['doing'], hint: '(do)', explanation: { vi: 'Đang làm gì tại một thời điểm quá khứ → were + doing.', en: 'In progress at a past moment → were + doing.' } },
    { id: 'gr-l2-past-continuous-t05', type: 'multiple-choice', question: 'She ___ her leg while she was skiing.', options: ['was breaking', 'broke', 'breaks', 'has broken'], correctIndex: 1, explanation: { vi: 'Hành động ngắn xen vào → quá khứ đơn broke.', en: 'The short interrupting action → past simple broke.' } },
  ],
  'gr-l2-used-to': [
    { id: 'gr-l2-used-to-t01', type: 'multiple-choice', question: 'I ___ play with dolls when I was small.', options: ['use to', 'used to', 'am used to', 'using to'], correctIndex: 1, explanation: { vi: 'Thói quen trong quá khứ → used to + V.', en: 'A past habit → used to + V.' } },
    { id: 'gr-l2-used-to-t02', type: 'fill-blank', sentence: 'Did you ___ to live in the countryside?', acceptedAnswers: ['use'], hint: '(use / used)', explanation: { vi: 'Sau did → use to (không có d).', en: 'After did → use to (no d).' } },
    { id: 'gr-l2-used-to-t03', type: 'multiple-choice', question: 'He ___ have long hair, but now it\'s short.', options: ['would', 'used to', 'was used to', 'uses to'], correctIndex: 1, explanation: { vi: 'Trạng thái (have long hair) → chỉ dùng used to, không dùng would.', en: 'A past state (have long hair) → used to only, not would.' } },
    { id: 'gr-l2-used-to-t04', type: 'fill-blank', sentence: 'We ___ use to have a car.', acceptedAnswers: ["didn't", 'did not'], hint: '(not – past)', explanation: { vi: 'Phủ định: didn\'t use to.', en: 'Negative: didn\'t use to.' } },
    { id: 'gr-l2-used-to-t05', type: 'multiple-choice', question: 'Every summer, my grandmother ___ take us to the beach.', options: ['would', 'was', 'use', 'is used to'], correctIndex: 0, explanation: { vi: 'Hành động lặp lại trong quá khứ → would (hoặc used to).', en: 'A repeated past action → would (or used to).' } },
  ],
  'gr-l2-gerund-infinitive': [
    { id: 'gr-l2-gerund-infinitive-t01', type: 'multiple-choice', question: 'I enjoy ___ to music in the evening.', options: ['listen', 'to listen', 'listening', 'listened'], correctIndex: 2, explanation: { vi: 'enjoy + V-ing.', en: 'enjoy + V-ing.' } },
    { id: 'gr-l2-gerund-infinitive-t02', type: 'fill-blank', sentence: 'She decided ___ abroad next year.', acceptedAnswers: ['to study', 'to go', 'to work', 'to travel', 'to move'], hint: '(study)', explanation: { vi: 'decide + to V.', en: 'decide + to V.' } },
    { id: 'gr-l2-gerund-infinitive-t03', type: 'multiple-choice', question: 'Have you finished ___ the report?', options: ['to write', 'write', 'writing', 'wrote'], correctIndex: 2, explanation: { vi: 'finish + V-ing.', en: 'finish + V-ing.' } },
    { id: 'gr-l2-gerund-infinitive-t04', type: 'multiple-choice', question: 'We hope ___ you again soon.', options: ['seeing', 'to see', 'see', 'saw'], correctIndex: 1, explanation: { vi: 'hope + to V.', en: 'hope + to V.' } },
    { id: 'gr-l2-gerund-infinitive-t05', type: 'fill-blank', sentence: 'He is good at ___ problems.', acceptedAnswers: ['solving', 'fixing'], hint: '(solve)', explanation: { vi: 'Sau giới từ (at) → V-ing.', en: 'After a preposition (at) → V-ing.' } },
  ],
  'gr-l2-conditionals-0-1': [
    { id: 'gr-l2-conditionals-0-1-t01', type: 'multiple-choice', question: 'If it ___ tomorrow, we will stay at home.', options: ['will rain', 'rains', 'rained', 'raining'], correctIndex: 1, explanation: { vi: 'Loại 1: If + hiện tại đơn, will + V.', en: 'First conditional: If + present simple, will + V.' } },
    { id: 'gr-l2-conditionals-0-1-t02', type: 'fill-blank', sentence: 'If you heat ice, it ___.', acceptedAnswers: ['melts'], hint: '(melt)', explanation: { vi: 'Loại 0 (sự thật): hiện tại đơn ở cả hai vế.', en: 'Zero conditional (a fact): present simple in both parts.' } },
    { id: 'gr-l2-conditionals-0-1-t03', type: 'multiple-choice', question: 'You ___ the bus if you don\'t hurry.', options: ['miss', 'will miss', 'missed', 'would miss'], correctIndex: 1, explanation: { vi: 'Kết quả tương lai → will miss.', en: 'A future result → will miss.' } },
    { id: 'gr-l2-conditionals-0-1-t04', type: 'fill-blank', sentence: '___ you study hard, you won\'t pass.', acceptedAnswers: ['Unless'], hint: '(= if not)', explanation: { vi: 'unless = if … not.', en: 'unless = if … not.' } },
    { id: 'gr-l2-conditionals-0-1-t05', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['If I will see her, I will tell her.', 'If I see her, I will tell her.', 'If I saw her, I will tell her.', 'If I see her, I tell her tomorrow.'], correctIndex: 1, explanation: { vi: 'Không dùng will sau if.', en: 'Don\'t use will after if.' } },
  ],
  'gr-l2-articles': [
    { id: 'gr-l2-articles-t01', type: 'multiple-choice', question: '___ life is difficult without friends.', options: ['The', 'A', '— (no article)', 'An'], correctIndex: 2, explanation: { vi: 'Nói chung chung, danh từ không đếm được → không mạo từ.', en: 'General meaning, uncountable noun → no article.' } },
    { id: 'gr-l2-articles-t02', type: 'fill-blank', sentence: '___ Mekong River flows through six countries.', acceptedAnswers: ['The'], hint: '(a / the / —)', explanation: { vi: 'Tên sông → the.', en: 'River names → the.' } },
    { id: 'gr-l2-articles-t03', type: 'multiple-choice', question: 'I love ___ dogs, but I am afraid of ___ dog next door.', options: ['the / the', '— / the', 'the / —', 'a / a'], correctIndex: 1, explanation: { vi: 'Chó nói chung → không mạo từ; con chó cụ thể nhà bên → the.', en: 'Dogs in general → no article; the specific dog next door → the.' } },
    { id: 'gr-l2-articles-t04', type: 'multiple-choice', question: 'She plays ___ piano every day.', options: ['a', 'the', '—', 'an'], correctIndex: 1, explanation: { vi: 'Chơi nhạc cụ → the piano.', en: 'Playing instruments → the piano.' } },
    { id: 'gr-l2-articles-t05', type: 'multiple-choice', question: 'My brother goes to ___ school by bike every day.', options: ['a', 'the', '— (no article)', 'an'], correctIndex: 2, explanation: { vi: 'go to school (đi học, đúng mục đích) → không mạo từ.', en: 'go to school (for its main purpose) → no article.' } },
  ],
  'gr-l2-questions': [
    { id: 'gr-l2-questions-t01', type: 'multiple-choice', question: '___ broke the window?', options: ['Who did', 'Who', 'Whom did', 'Who does'], correctIndex: 1, explanation: { vi: 'Hỏi chủ ngữ → Who + V (không dùng did).', en: 'Subject question → Who + V (no did).' } },
    { id: 'gr-l2-questions-t02', type: 'multiple-choice', question: 'Could you tell me where ___?', options: ['is the station', 'the station is', 'does the station', 'the station does be'], correctIndex: 1, explanation: { vi: 'Câu hỏi gián tiếp → S + V bình thường: the station is.', en: 'Indirect question → normal S + V order: the station is.' } },
    { id: 'gr-l2-questions-t03', type: 'fill-blank', sentence: 'Do you know what time the shop ___?', acceptedAnswers: ['opens', 'closes'], hint: '(open)', explanation: { vi: 'Câu hỏi gián tiếp: không dùng does, chia động từ bình thường → opens.', en: 'Indirect question: no does, normal verb → opens.' } },
    { id: 'gr-l2-questions-t04', type: 'multiple-choice', question: 'Who ___ you about the party?', options: ['did tell', 'told', 'does told', 'tell'], correctIndex: 1, explanation: { vi: 'Hỏi chủ ngữ (ai đã kể) → Who told.', en: 'Subject question (who did the telling) → Who told.' } },
    { id: 'gr-l2-questions-t05', type: 'fill-blank', sentence: 'I wonder ___ she will come tomorrow.', acceptedAnswers: ['if', 'whether'], hint: '(yes/no question)', explanation: { vi: 'Câu hỏi Yes/No gián tiếp → if / whether.', en: 'An indirect yes/no question → if / whether.' } },
  ],

  /* ============================ LEVEL 3 ============================ */
  'gr-l3-present-perfect-continuous': [
    { id: 'gr-l3-present-perfect-continuous-t01', type: 'multiple-choice', question: 'I ___ for you for over an hour!', options: ['wait', 'have been waiting', 'was waiting', 'have waiting'], correctIndex: 1, explanation: { vi: 'Kéo dài từ quá khứ đến giờ, nhấn mạnh thời gian → have been + V-ing.', en: 'Continuing up to now, stressing duration → have been + V-ing.' } },
    { id: 'gr-l3-present-perfect-continuous-t02', type: 'fill-blank', sentence: 'She has been ___ English since she was six.', acceptedAnswers: ['learning', 'studying'], hint: '(learn)', explanation: { vi: 'has been + V-ing.', en: 'has been + V-ing.' } },
    { id: 'gr-l3-present-perfect-continuous-t03', type: 'multiple-choice', question: 'I ___ three books this month.', options: ['have been reading', 'have read', 'read', 'am reading'], correctIndex: 1, explanation: { vi: 'Nói số lượng đã xong (three books) → hiện tại hoàn thành.', en: 'A completed number (three books) → present perfect.' } },
    { id: 'gr-l3-present-perfect-continuous-t04', type: 'multiple-choice', question: 'Your eyes are red. ___ you been crying?', options: ['Did', 'Have', 'Are', 'Were'], correctIndex: 1, explanation: { vi: 'Bằng chứng hiện tại của hoạt động vừa diễn ra → Have you been V-ing?', en: 'Present evidence of a recent activity → Have you been V-ing?' } },
    { id: 'gr-l3-present-perfect-continuous-t05', type: 'multiple-choice', question: 'Which sentence is wrong?', options: ['I have been working here for two years.', 'I have been knowing him for years.', 'It has been raining all day.', 'They have been building the bridge since May.'], correctIndex: 1, explanation: { vi: 'know là động từ trạng thái → I have known him.', en: 'know is a state verb → I have known him.' } },
  ],
  'gr-l3-past-perfect': [
    { id: 'gr-l3-past-perfect-t01', type: 'multiple-choice', question: 'When we arrived, the film ___.', options: ['already started', 'had already started', 'has already started', 'was already start'], correctIndex: 1, explanation: { vi: 'Xảy ra trước một mốc quá khứ → had + V3.', en: 'Before another past moment → had + V3.' } },
    { id: 'gr-l3-past-perfect-t02', type: 'fill-blank', sentence: 'By the time she got to the station, the train had ___.', acceptedAnswers: ['left', 'gone', 'departed'], hint: '(leave)', explanation: { vi: 'had + V3 → left.', en: 'had + V3 → left.' } },
    { id: 'gr-l3-past-perfect-t03', type: 'multiple-choice', question: 'He was nervous because he ___ on a plane before.', options: ["hasn't been", "hadn't been", "wasn't", "didn't be"], correctIndex: 1, explanation: { vi: 'Trước thời điểm "was nervous" → hadn\'t been.', en: 'Before the time of "was nervous" → hadn\'t been.' } },
    { id: 'gr-l3-past-perfect-t04', type: 'fill-blank', sentence: 'After they ___ finished dinner, they went for a walk.', acceptedAnswers: ['had'], hint: '(have → past)', explanation: { vi: 'Việc xảy ra trước → had finished.', en: 'The earlier action → had finished.' } },
    { id: 'gr-l3-past-perfect-t05', type: 'multiple-choice', question: 'I didn\'t recognise her because she ___ a lot.', options: ['changed', 'has changed', 'had changed', 'was change'], correctIndex: 2, explanation: { vi: 'Thay đổi xảy ra trước lúc gặp → had changed.', en: 'The change happened before the meeting → had changed.' } },
  ],
  'gr-l3-conditionals-2-3': [
    { id: 'gr-l3-conditionals-2-3-t01', type: 'multiple-choice', question: 'If I ___ rich, I would travel the world.', options: ['am', 'were', 'will be', 'had been'], correctIndex: 1, explanation: { vi: 'Loại 2 (không có thật ở hiện tại): If + were.', en: 'Second conditional (unreal now): If + were.' } },
    { id: 'gr-l3-conditionals-2-3-t02', type: 'fill-blank', sentence: 'If she had studied harder, she ___ have passed.', acceptedAnswers: ['would', 'could', 'might'], hint: '(would / will)', explanation: { vi: 'Loại 3: would have + V3.', en: 'Third conditional: would have + V3.' } },
    { id: 'gr-l3-conditionals-2-3-t03', type: 'multiple-choice', question: 'What would you do if you ___ a lot of money?', options: ['find', 'found', 'will find', 'had found'], correctIndex: 1, explanation: { vi: 'Loại 2: If + quá khứ đơn.', en: 'Second conditional: If + past simple.' } },
    { id: 'gr-l3-conditionals-2-3-t04', type: 'multiple-choice', question: 'If we ___ the map, we wouldn\'t have got lost.', options: ['took', 'had taken', 'have taken', 'would take'], correctIndex: 1, explanation: { vi: 'Loại 3 (quá khứ không có thật): If + had + V3.', en: 'Third conditional (unreal past): If + had + V3.' } },
    { id: 'gr-l3-conditionals-2-3-t05', type: 'fill-blank', sentence: 'If I ___ you, I would accept the offer.', acceptedAnswers: ['were', 'was'], hint: '(be)', explanation: { vi: 'Lời khuyên: If I were you.', en: 'Advice: If I were you.' } },
  ],
  'gr-l3-passive': [
    { id: 'gr-l3-passive-t01', type: 'multiple-choice', question: 'This bridge ___ in 1995.', options: ['built', 'was built', 'has built', 'is building'], correctIndex: 1, explanation: { vi: 'Bị động quá khứ → was + V3.', en: 'Past passive → was + V3.' } },
    { id: 'gr-l3-passive-t02', type: 'fill-blank', sentence: 'English is ___ in many countries.', acceptedAnswers: ['spoken', 'used', 'taught'], hint: '(speak)', explanation: { vi: 'is + V3 → spoken.', en: 'is + V3 → spoken.' } },
    { id: 'gr-l3-passive-t03', type: 'multiple-choice', question: 'The results ___ next week.', options: ['will announce', 'will be announced', 'are announcing', 'announced'], correctIndex: 1, explanation: { vi: 'Bị động tương lai → will be + V3.', en: 'Future passive → will be + V3.' } },
    { id: 'gr-l3-passive-t04', type: 'fill-blank', sentence: 'Over 500 trees have ___ planted since January.', acceptedAnswers: ['been'], hint: '(be)', explanation: { vi: 'Bị động hiện tại hoàn thành → have been + V3.', en: 'Present perfect passive → have been + V3.' } },
    { id: 'gr-l3-passive-t05', type: 'multiple-choice', question: 'In the diagram, the leaves ___ and then dried.', options: ['collect', 'are collected', 'collecting', 'are collect'], correctIndex: 1, explanation: { vi: 'Mô tả quy trình (Task 1) → bị động hiện tại: are + V3.', en: 'Describing a process (Task 1) → present passive: are + V3.' } },
  ],
  'gr-l3-relative-clauses': [
    { id: 'gr-l3-relative-clauses-t01', type: 'multiple-choice', question: 'The woman ___ lives next door is a nurse.', options: ['which', 'who', 'whose', 'where'], correctIndex: 1, explanation: { vi: 'Chỉ người → who.', en: 'For people → who.' } },
    { id: 'gr-l3-relative-clauses-t02', type: 'fill-blank', sentence: 'This is the town ___ I grew up.', acceptedAnswers: ['where', 'in which'], hint: '(place)', explanation: { vi: 'Nơi chốn → where.', en: 'A place → where.' } },
    { id: 'gr-l3-relative-clauses-t03', type: 'multiple-choice', question: 'I met a man ___ son plays for the national team.', options: ['who', 'whose', 'which', 'that'], correctIndex: 1, explanation: { vi: 'Sở hữu (con trai của ông ấy) → whose.', en: 'Possession (his son) → whose.' } },
    { id: 'gr-l3-relative-clauses-t04', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['My laptop, that I bought last year, is broken.', 'My laptop, which I bought last year, is broken.', 'My laptop which, I bought last year is broken.', 'My laptop, who I bought last year, is broken.'], correctIndex: 1, explanation: { vi: 'Mệnh đề không xác định (có dấu phẩy) → which, không dùng that.', en: 'Non-defining clause (with commas) → which, not that.' } },
    { id: 'gr-l3-relative-clauses-t05', type: 'fill-blank', sentence: 'The book ___ you lent me was excellent.', acceptedAnswers: ['that', 'which'], hint: '(which / that)', explanation: { vi: 'Chỉ vật, xác định → that / which (có thể bỏ vì là tân ngữ).', en: 'A thing, defining → that / which (can be left out because it is the object).' } },
  ],
  'gr-l3-reported-speech': [
    { id: 'gr-l3-reported-speech-t01', type: 'multiple-choice', question: '"I am tired," she said. → She said that she ___ tired.', options: ['is', 'was', 'has been', 'will be'], correctIndex: 1, explanation: { vi: 'Lùi thì: am → was.', en: 'Backshift: am → was.' } },
    { id: 'gr-l3-reported-speech-t02', type: 'fill-blank', sentence: 'He ___ me that he would call later.', acceptedAnswers: ['told'], hint: '(say / tell)', explanation: { vi: 'tell + người (me) → told.', en: 'tell + person (me) → told.' } },
    { id: 'gr-l3-reported-speech-t03', type: 'multiple-choice', question: '"Do you like tea?" → She asked me ___ tea.', options: ['do I like', 'if I liked', 'did I like', 'that I liked'], correctIndex: 1, explanation: { vi: 'Câu hỏi Yes/No → asked if + S + V (lùi thì).', en: 'Yes/no question → asked if + S + V (backshifted).' } },
    { id: 'gr-l3-reported-speech-t04', type: 'multiple-choice', question: '"You should rest." → The doctor advised me ___.', options: ['rest', 'to rest', 'resting', 'that rest'], correctIndex: 1, explanation: { vi: 'advise + người + to V.', en: 'advise + person + to V.' } },
    { id: 'gr-l3-reported-speech-t05', type: 'fill-blank', sentence: '"I will come tomorrow." → He said he would come the ___ day.', acceptedAnswers: ['next', 'following'], hint: '(tomorrow → ?)', explanation: { vi: 'tomorrow → the next / following day.', en: 'tomorrow → the next / following day.' } },
  ],
  'gr-l3-modals-deduction': [
    { id: 'gr-l3-modals-deduction-t01', type: 'multiple-choice', question: 'She has three cars. She ___ be rich.', options: ['can\'t', 'must', 'might not', 'should'], correctIndex: 1, explanation: { vi: 'Gần như chắc chắn đúng → must.', en: 'Almost certainly true → must.' } },
    { id: 'gr-l3-modals-deduction-t02', type: 'fill-blank', sentence: 'That ___ be Tom. He is in London this week.', acceptedAnswers: ["can't", 'cannot', "couldn't"], hint: '(sure it is not true)', explanation: { vi: 'Chắc chắn không phải → can\'t.', en: 'Certain it is not true → can\'t.' } },
    { id: 'gr-l3-modals-deduction-t03', type: 'multiple-choice', question: 'I\'m not sure where Lan is. She ___ be at the library.', options: ['must', 'might', 'can\'t', 'has to'], correctIndex: 1, explanation: { vi: 'Không chắc → might / could.', en: 'Not sure → might / could.' } },
    { id: 'gr-l3-modals-deduction-t04', type: 'multiple-choice', question: 'The ground is wet. It ___ rained last night.', options: ['must have', 'must', 'can\'t have', 'should'], correctIndex: 0, explanation: { vi: 'Suy đoán về quá khứ → must have + V3.', en: 'A deduction about the past → must have + V3.' } },
    { id: 'gr-l3-modals-deduction-t05', type: 'fill-blank', sentence: 'He didn\'t answer. He might have ___ asleep.', acceptedAnswers: ['been', 'fallen'], hint: '(be)', explanation: { vi: 'might have + V3 → been.', en: 'might have + V3 → been.' } },
  ],
  'gr-l3-nominalisation': [
    { id: 'gr-l3-nominalisation-t01', type: 'multiple-choice', question: 'Choose the noun form: "Prices increased sharply." → "There was a sharp ___ in prices."', options: ['increase', 'increasing', 'increased', 'increasely'], correctIndex: 0, explanation: { vi: 'Danh từ: an increase.', en: 'Noun: an increase.' } },
    { id: 'gr-l3-nominalisation-t02', type: 'fill-blank', sentence: 'The ___ of the new road took two years.', acceptedAnswers: ['construction', 'building'], hint: '(construct)', explanation: { vi: 'construct → construction.', en: 'construct → construction.' } },
    { id: 'gr-l3-nominalisation-t03', type: 'multiple-choice', question: '"People are worried because pollution is getting worse." → "The ___ of pollution worries people."', options: ['worse', 'worsening', 'worsen', 'worst'], correctIndex: 1, explanation: { vi: 'Danh từ hóa: the worsening of …', en: 'Nominalised: the worsening of …' } },
    { id: 'gr-l3-nominalisation-t04', type: 'fill-blank', sentence: 'There has been a significant ___ in unemployment.', acceptedAnswers: ['reduction', 'decrease', 'fall', 'drop', 'decline', 'rise', 'increase'], hint: '(reduce)', explanation: { vi: 'reduce → reduction.', en: 'reduce → reduction.' } },
    { id: 'gr-l3-nominalisation-t05', type: 'multiple-choice', question: 'Which is the most academic?', options: ['Because they built more roads, traffic got better.', 'The construction of more roads led to an improvement in traffic.', 'They built roads so traffic is good.', 'Roads were built, traffic good.'], correctIndex: 1, explanation: { vi: 'Danh từ hóa (construction, improvement) → giọng học thuật.', en: 'Nominalisation (construction, improvement) → academic tone.' } },
  ],
}

/** Gắn mini-test vào bài nào có trong bảng trên (bài đã có miniTest thì giữ nguyên). */
export function withGrammarMiniTests(lessons: Lesson[]): Lesson[] {
  return lessons.map((lesson) => {
    const tests = GRAMMAR_MINI_TESTS[lesson.id]
    return tests && lesson.miniTest.length === 0 ? { ...lesson, miniTest: tests } : lesson
  })
}
