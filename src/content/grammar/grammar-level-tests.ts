/**
 * grammar-level-tests.ts — BÀI KIỂM TRA TỔNG HỢP CUỐI MỖI NHÓM NGỮ PHÁP
 * ----------------------------------------------------------------------------
 * 3 bài kiểm tra, mỗi bài 15 câu trộn mọi điểm ngữ pháp của nhóm đó:
 *   gr-test-l1  Level 1 (A1 – A2)
 *   gr-test-l2  Level 2 (A2 – B1)
 *   gr-test-l3  Level 3 (B1 – B2)
 *
 * Mở từ trang /grammar (thẻ "Bài kiểm tra cuối level", dưới lưới các điểm ngữ pháp).
 * Đăng ký id ở GRAMMAR_LEVEL_TESTS (grammar-topics.ts). Điểm tốt nhất lưu như mọi bài khác.
 * Không gắn vào điểm ngữ pháp nào. Câu hỏi do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson, TeachingCard } from '../content-types'

/** Thẻ dặn dò chung ở đầu mỗi bài kiểm tra. */
function introCard(levelLabel: string): TeachingCard {
  return {
    title: { vi: `Kiểm tra tổng hợp ${levelLabel}`, en: `${levelLabel} review test` },
    body: {
      vi: '15 câu trộn tất cả điểm ngữ pháp của nhóm này, **không có lý thuyết nhắc lại**.\nLàm hết rồi xem điểm: **từ 80%** là bạn đã vững nhóm này. Câu nào sai, đọc lời giải thích rồi quay lại học điểm ngữ pháp đó.',
      en: '15 questions mixing every grammar point in this group, **with no theory reminders**.\nFinish, then check your score: **80% or more** means you have mastered this group. For each mistake, read the explanation and go back to that grammar point.',
    },
  }
}

export const grammarLevelTests: Lesson[] = [
  /* ============================ LEVEL 1 ============================ */
  {
    id: 'gr-test-l1',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Kiểm tra ngữ pháp Level 1', en: 'Level 1 grammar test' },
    description: { vi: '15 câu tổng hợp: to be, các thì cơ bản, mạo từ, giới từ, so sánh, câu hỏi, từ nối.', en: '15 mixed questions: be, basic tenses, articles, prepositions, comparisons, questions and linkers.' },
    teachingCards: [introCard('Level 1')],
    exercises: [
      { id: 'gr-test-l1-q01', type: 'multiple-choice', question: 'My grandparents ___ very healthy.', options: ['is', 'am', 'are', 'be'], correctIndex: 2, explanation: { vi: 'grandparents số nhiều → are.', en: 'grandparents is plural → are.' } },
      { id: 'gr-test-l1-q02', type: 'fill-blank', sentence: 'She usually ___ to work by bus.', acceptedAnswers: ['goes'], hint: '(go)', explanation: { vi: 'she + hiện tại đơn → goes.', en: 'she + present simple → goes.' } },
      { id: 'gr-test-l1-q03', type: 'multiple-choice', question: 'Shh! The baby ___.', options: ['sleeps', 'is sleeping', 'sleep', 'slept'], correctIndex: 1, explanation: { vi: 'Đang xảy ra → is sleeping.', en: 'Happening now → is sleeping.' } },
      { id: 'gr-test-l1-q04', type: 'fill-blank', sentence: 'We ___ a great time at the beach last weekend.', acceptedAnswers: ['had'], hint: '(have)', explanation: { vi: 'last weekend → had.', en: 'last weekend → had.' } },
      { id: 'gr-test-l1-q05', type: 'multiple-choice', question: 'Did you ___ the email I sent?', options: ['got', 'get', 'getting', 'gets'], correctIndex: 1, explanation: { vi: 'Sau did → nguyên mẫu.', en: 'After did → base verb.' } },
      { id: 'gr-test-l1-q06', type: 'multiple-choice', question: 'There ___ some bread on the table.', options: ['are', 'is', 'have', 'has'], correctIndex: 1, explanation: { vi: 'bread không đếm được → is.', en: 'bread is uncountable → is.' } },
      { id: 'gr-test-l1-q07', type: 'fill-blank', sentence: 'He is ___ honest person.', acceptedAnswers: ['an'], hint: '(a / an)', explanation: { vi: 'h câm → an.', en: 'Silent h → an.' } },
      { id: 'gr-test-l1-q08', type: 'multiple-choice', question: 'How ___ sugar do you want?', options: ['many', 'much', 'few', 'a few'], correctIndex: 1, explanation: { vi: 'sugar không đếm được → much.', en: 'sugar is uncountable → much.' } },
      { id: 'gr-test-l1-q09', type: 'multiple-choice', question: 'Is this phone ___? — Yes, it\'s mine.', options: ['you', 'your', 'yours', 'yourself'], correctIndex: 2, explanation: { vi: 'Đứng một mình → yours.', en: 'Standing alone → yours.' } },
      { id: 'gr-test-l1-q10', type: 'fill-blank', sentence: 'The concert starts ___ 7:30.', acceptedAnswers: ['at'], hint: '(in / on / at)', explanation: { vi: 'Giờ → at.', en: 'Clock time → at.' } },
      { id: 'gr-test-l1-q11', type: 'multiple-choice', question: 'She sings ___.', options: ['beautiful', 'beautifully', 'more beautiful', 'beauty'], correctIndex: 1, explanation: { vi: 'Bổ nghĩa động từ → trạng từ.', en: 'Describes a verb → adverb.' } },
      { id: 'gr-test-l1-q12', type: 'multiple-choice', question: 'Mount Everest is ___ mountain in the world.', options: ['the higher', 'the highest', 'highest', 'the most high'], correctIndex: 1, explanation: { vi: 'So sánh nhất → the highest.', en: 'Superlative → the highest.' } },
      { id: 'gr-test-l1-q13', type: 'arrange-words', translationVi: 'Bạn của bạn sống ở đâu?', correctSentence: 'Where does your friend live?', extraWords: ['do', 'lives'], explanation: { vi: 'your friend = he/she → does + live.', en: 'your friend = he/she → does + live.' } },
      { id: 'gr-test-l1-q14', type: 'multiple-choice', question: 'I was sick, ___ I didn\'t go to school.', options: ['because', 'but', 'so', 'however'], correctIndex: 2, explanation: { vi: 'Kết quả → so.', en: 'Result → so.' } },
      { id: 'gr-test-l1-q15', type: 'multiple-choice', question: 'Which sentence is correct?', options: ['I am agree with you.', 'He don\'t like fish.', 'They didn\'t came.', 'She doesn\'t eat meat.'], correctIndex: 3, explanation: { vi: 'doesn\'t + V nguyên mẫu. Các câu khác: I agree; He doesn\'t; didn\'t come.', en: 'doesn\'t + base verb. The others: I agree; He doesn\'t; didn\'t come.' } },
    ],
    miniTest: [],
  },

  /* ============================ LEVEL 2 ============================ */
  {
    id: 'gr-test-l2',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Kiểm tra ngữ pháp Level 2', en: 'Level 2 grammar test' },
    description: { vi: '15 câu tổng hợp: tương lai, hoàn thành, quá khứ tiếp diễn, used to, modal, V-ing/to V, điều kiện, mạo từ, câu hỏi.', en: '15 mixed questions: future forms, perfect, past continuous, used to, modals, V-ing/to V, conditionals, articles and questions.' },
    teachingCards: [introCard('Level 2')],
    exercises: [
      { id: 'gr-test-l2-q01', type: 'multiple-choice', question: 'I\'ve bought the tickets. We ___ the match on Saturday.', options: ['watch', 'are going to watch', 'will watching', 'watched'], correctIndex: 1, explanation: { vi: 'Kế hoạch đã định → be going to.', en: 'A plan already made → be going to.' } },
      { id: 'gr-test-l2-q02', type: 'fill-blank', sentence: 'I ___ never seen snow.', acceptedAnswers: ['have', "'ve"], hint: '(have / has)', explanation: { vi: 'Trải nghiệm → have + V3.', en: 'Experience → have + V3.' } },
      { id: 'gr-test-l2-q03', type: 'multiple-choice', question: 'They have worked here ___ five years.', options: ['since', 'for', 'ago', 'during'], correctIndex: 1, explanation: { vi: 'Khoảng thời gian → for.', en: 'A period → for.' } },
      { id: 'gr-test-l2-q04', type: 'multiple-choice', question: 'While I ___, I saw an accident.', options: ['drove', 'was driving', 'am driving', 'have driven'], correctIndex: 1, explanation: { vi: 'while + hành động dài → was driving.', en: 'while + longer action → was driving.' } },
      { id: 'gr-test-l2-q05', type: 'fill-blank', sentence: 'There ___ to be a cinema here, but now it\'s a bank.', acceptedAnswers: ['used'], hint: '(use)', explanation: { vi: 'Trước đây có, giờ không → used to.', en: 'True in the past, not now → used to.' } },
      { id: 'gr-test-l2-q06', type: 'multiple-choice', question: 'You ___ wear a suit. The party is casual.', options: ["mustn't", "don't have to", "can't", "shouldn't to"], correctIndex: 1, explanation: { vi: 'Không cần → don\'t have to.', en: 'Not necessary → don\'t have to.' } },
      { id: 'gr-test-l2-q07', type: 'multiple-choice', question: 'She avoided ___ the question.', options: ['to answer', 'answer', 'answering', 'answered'], correctIndex: 2, explanation: { vi: 'avoid + V-ing.', en: 'avoid + V-ing.' } },
      { id: 'gr-test-l2-q08', type: 'fill-blank', sentence: 'I want ___ a doctor in the future.', acceptedAnswers: ['to be', 'to become'], hint: '(be)', explanation: { vi: 'want + to V.', en: 'want + to V.' } },
      { id: 'gr-test-l2-q09', type: 'multiple-choice', question: 'If you mix red and white, you ___ pink.', options: ['get', 'will got', 'would get', 'got'], correctIndex: 0, explanation: { vi: 'Loại 0 (sự thật) → hiện tại đơn.', en: 'Zero conditional (a fact) → present simple.' } },
      { id: 'gr-test-l2-q10', type: 'multiple-choice', question: 'If I ___ time tomorrow, I will help you.', options: ['will have', 'have', 'had', 'having'], correctIndex: 1, explanation: { vi: 'Không dùng will sau if → have.', en: 'No will after if → have.' } },
      { id: 'gr-test-l2-q11', type: 'multiple-choice', question: '___ education is important for every child.', options: ['The', 'An', '— (no article)', 'A'], correctIndex: 2, explanation: { vi: 'Nói chung chung, không đếm được → không mạo từ.', en: 'General meaning, uncountable → no article.' } },
      { id: 'gr-test-l2-q12', type: 'multiple-choice', question: 'Can you tell me how much ___?', options: ['does this cost', 'this costs', 'costs this', 'is this cost'], correctIndex: 1, explanation: { vi: 'Câu hỏi gián tiếp → S + V: this costs.', en: 'Indirect question → S + V: this costs.' } },
      { id: 'gr-test-l2-q13', type: 'fill-blank', sentence: 'Who ___ this cake? It\'s delicious!', acceptedAnswers: ['made', 'baked', 'cooked'], hint: '(make)', explanation: { vi: 'Hỏi chủ ngữ → Who + V quá khứ (không dùng did).', en: 'Subject question → Who + past verb (no did).' } },
      { id: 'gr-test-l2-q14', type: 'multiple-choice', question: 'I ___ my keys. I can\'t find them anywhere.', options: ['lost', 'have lost', 'was losing', 'lose'], correctIndex: 1, explanation: { vi: 'Kết quả còn ở hiện tại → have lost.', en: 'The result matters now → have lost.' } },
      { id: 'gr-test-l2-q15', type: 'arrange-words', translationVi: 'Bạn nên nghỉ ngơi nhiều hơn.', correctSentence: 'You should get more rest.', extraWords: ['to', 'must to'], explanation: { vi: 'should + V nguyên mẫu (không "to").', en: 'should + base verb (no "to").' } },
    ],
    miniTest: [],
  },

  /* ============================ LEVEL 3 ============================ */
  {
    id: 'gr-test-l3',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 14,
    title: { vi: 'Kiểm tra ngữ pháp Level 3', en: 'Level 3 grammar test' },
    description: { vi: '15 câu tổng hợp ở mức IELTS 5.0 – 6.5: thì hoàn thành, điều kiện 2–3, bị động, mệnh đề quan hệ, tường thuật, suy đoán, liên kết, so sánh.', en: '15 mixed questions at IELTS 5.0 – 6.5: perfect tenses, 2nd/3rd conditionals, passive, relative clauses, reported speech, deduction, cohesion and comparisons.' },
    teachingCards: [introCard('Level 3')],
    exercises: [
      { id: 'gr-test-l3-q01', type: 'multiple-choice', question: 'She is out of breath because she ___.', options: ['has run', 'has been running', 'runs', 'had run'], correctIndex: 1, explanation: { vi: 'Hoạt động vừa kéo dài, để lại dấu hiệu → has been running.', en: 'A recent ongoing activity with visible results → has been running.' } },
      { id: 'gr-test-l3-q02', type: 'fill-blank', sentence: 'When I got home, everyone had already ___ to bed.', acceptedAnswers: ['gone'], hint: '(go)', explanation: { vi: 'had + V3 → gone.', en: 'had + V3 → gone.' } },
      { id: 'gr-test-l3-q03', type: 'multiple-choice', question: 'If I ___ his number, I would call him.', options: ['know', 'knew', 'had known', 'will know'], correctIndex: 1, explanation: { vi: 'Loại 2 → If + quá khứ.', en: 'Second conditional → If + past.' } },
      { id: 'gr-test-l3-q04', type: 'multiple-choice', question: 'If she had left earlier, she ___ the flight.', options: ['wouldn\'t miss', 'won\'t miss', 'wouldn\'t have missed', 'didn\'t miss'], correctIndex: 2, explanation: { vi: 'Loại 3 → would have + V3.', en: 'Third conditional → would have + V3.' } },
      { id: 'gr-test-l3-q05', type: 'fill-blank', sentence: 'The new hospital will be ___ next year.', acceptedAnswers: ['built', 'opened', 'completed', 'finished'], hint: '(build)', explanation: { vi: 'will be + V3.', en: 'will be + V3.' } },
      { id: 'gr-test-l3-q06', type: 'multiple-choice', question: 'Rice ___ in many parts of Asia.', options: ['grows', 'is grown', 'is growing', 'grown'], correctIndex: 1, explanation: { vi: 'Bị động hiện tại: được trồng → is grown.', en: 'Present passive → is grown.' } },
      { id: 'gr-test-l3-q07', type: 'multiple-choice', question: 'The student ___ essay won the prize is from Hue.', options: ['who', 'which', 'whose', 'that'], correctIndex: 2, explanation: { vi: 'Sở hữu → whose.', en: 'Possession → whose.' } },
      { id: 'gr-test-l3-q08', type: 'fill-blank', sentence: 'She asked me ___ I had finished the report.', acceptedAnswers: ['if', 'whether'], hint: '(yes/no)', explanation: { vi: 'Tường thuật câu hỏi Yes/No → if / whether.', en: 'Reported yes/no question → if / whether.' } },
      { id: 'gr-test-l3-q09', type: 'multiple-choice', question: '"I can swim," he said. → He said he ___ swim.', options: ['can', 'could', 'can be', 'is able'], correctIndex: 1, explanation: { vi: 'Lùi thì: can → could.', en: 'Backshift: can → could.' } },
      { id: 'gr-test-l3-q10', type: 'multiple-choice', question: 'The lights are off. They ___ gone out.', options: ['must have', 'can\'t', 'must', 'should'], correctIndex: 0, explanation: { vi: 'Suy đoán chắc chắn về quá khứ → must have + V3.', en: 'A confident deduction about the past → must have + V3.' } },
      { id: 'gr-test-l3-q11', type: 'multiple-choice', question: '___ the rise in costs, profits remained stable.', options: ['Although', 'Despite', 'Whereas', 'Therefore'], correctIndex: 1, explanation: { vi: 'Cụm danh từ → Despite.', en: 'Noun phrase → Despite.' } },
      { id: 'gr-test-l3-q12', type: 'fill-blank', sentence: 'Sales rose in the north, ___ they fell in the south.', acceptedAnswers: ['whereas', 'while'], hint: '(whereas / despite)', explanation: { vi: 'Đối lập hai vùng → whereas.', en: 'Contrasting two regions → whereas.' } },
      { id: 'gr-test-l3-q13', type: 'multiple-choice', question: 'Prices in 2020 were ___ than in 2019 (10.0 vs 10.1).', options: ['far lower', 'slightly lower', 'much lower', 'considerably lower'], correctIndex: 1, explanation: { vi: 'Chênh rất ít → slightly.', en: 'A tiny difference → slightly.' } },
      { id: 'gr-test-l3-q14', type: 'multiple-choice', question: 'Choose the most academic version.', options: ['Pollution got worse, so people got sick.', 'The deterioration of air quality led to a rise in illness.', 'Air is bad and people are sick.', 'Because air bad, people sick.'], correctIndex: 1, explanation: { vi: 'Danh từ hóa (deterioration, rise) → học thuật.', en: 'Nominalisation (deterioration, rise) → academic.' } },
      { id: 'gr-test-l3-q15', type: 'arrange-words', translationVi: 'Bạn càng luyện tập nhiều, bạn càng nói trôi chảy.', correctSentence: 'The more you practise, the more fluent you become.', extraWords: ['most', 'than'], explanation: { vi: 'The + so sánh hơn …, the + so sánh hơn …', en: 'The + comparative …, the + comparative …' } },
    ],
    miniTest: [],
  },
]
