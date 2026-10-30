/**
 * level-2-grammar-lessons-part3.ts — KHU "NGỮ PHÁP" (/grammar) · NHÓM LEVEL 2 (≈ A2 – B1), PHẦN 3
 * ----------------------------------------------------------------------------
 * Bài LUYỆN TẬP riêng cho điểm ngữ pháp trước đây chỉ có bài trên lộ trình.
 *
 * Danh sách bài:
 *   gr-l2-modals   must / have to / should / can — bắt buộc, lời khuyên, khả năng
 *
 * Cấu trúc mỗi bài và quy ước id: giống level-1-grammar-lessons-part2.ts.
 * Toàn bộ câu ví dụ và bài tập do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level2GrammarLessonsPart3: Lesson[] = [
  {
    id: 'gr-l2-modals',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 9,
    title: { vi: 'Luyện tập: must, have to, should, can', en: 'Practice: must, have to, should, can' },
    description: {
      vi: 'Nói điều bắt buộc, không cần thiết, bị cấm và lời khuyên cho đúng sắc thái.',
      en: 'Express obligation, lack of necessity, prohibition and advice with the right meaning.',
    },
    teachingCards: [
      {
        title: { vi: 'Bắt buộc: must và have to', en: 'Obligation: must and have to' },
        body: {
          vi: '**must + V**: người nói thấy cần thiết, hoặc luật lệ viết: You must wear a seatbelt.\n**have to / has to + V**: bắt buộc từ bên ngoài (công việc, lịch): I have to work on Saturdays.\nQuá khứ của cả hai: **had to**. Sau modal, động từ **nguyên mẫu, không "to"**: must **go** (không phải must to go).',
          en: '**must + V**: the speaker feels it is necessary, or written rules: You must wear a seatbelt.\n**have to / has to + V**: obligation from outside (job, schedule): I have to work on Saturdays.\nThe past of both: **had to**. After a modal, use the **base verb without "to"**: must **go** (not must to go).',
        },
        examples: [
          { en: 'Students must turn off their phones in the exam room.', vi: 'Thí sinh phải tắt điện thoại trong phòng thi.' },
          { en: 'She has to take two buses to get to work.', vi: 'Cô ấy phải đi hai chuyến xe buýt để tới chỗ làm.' },
        ],
      },
      {
        title: { vi: 'mustn\'t khác don\'t have to', en: 'mustn\'t is not don\'t have to' },
        body: {
          vi: '**mustn\'t** = **cấm**: You mustn\'t smoke here.\n**don\'t have to** = **không cần**, làm cũng được: You don\'t have to bring food — we have plenty.\nĐây là lỗi rất hay gặp trong bài thi.',
          en: '**mustn\'t** = **not allowed**: You mustn\'t smoke here.\n**don\'t have to** = **not necessary**, but you can: You don\'t have to bring food — we have plenty.\nThis is a very common exam mistake.',
        },
        examples: [
          { en: 'You mustn\'t park in front of the gate.', vi: 'Bạn không được đỗ xe trước cổng.' },
          { en: 'It\'s Sunday, so I don\'t have to get up early.', vi: 'Hôm nay Chủ nhật nên tôi không cần dậy sớm.' },
        ],
      },
      {
        title: { vi: 'Lời khuyên và khả năng: should, can', en: 'Advice and ability: should, can' },
        body: {
          vi: '**should / shouldn\'t + V**: lời khuyên: You should see a doctor.\n**can / can\'t + V**: khả năng hoặc được phép: I can swim. Can I sit here?\nQuá khứ của can: **could**: When I was five, I could read.',
          en: '**should / shouldn\'t + V**: advice: You should see a doctor.\n**can / can\'t + V**: ability or permission: I can swim. Can I sit here?\nThe past of can: **could**: When I was five, I could read.',
        },
        examples: [
          { en: 'You shouldn\'t drink coffee late at night.', vi: 'Bạn không nên uống cà phê khuya.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-modals-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối modal với ý nghĩa.', en: 'Match each modal with its meaning.' },
        pairs: [
          { left: "mustn't", right: 'not allowed' },
          { left: "don't have to", right: 'not necessary' },
          { left: 'should', right: 'a good idea' },
          { left: 'can', right: 'able to' },
        ],
        explanation: { vi: 'mustn\'t = cấm; don\'t have to = không cần; should = nên; can = có thể.', en: 'mustn\'t = prohibited; don\'t have to = unnecessary; should = advice; can = ability.' },
      },
      {
        id: 'gr-l2-modals-ex02',
        type: 'multiple-choice',
        question: 'You ___ touch that wire. It\'s dangerous!',
        options: ["don't have to", "mustn't", "shouldn't to", "can"],
        correctIndex: 1,
        explanation: { vi: 'Nguy hiểm → cấm → mustn\'t.', en: 'It is dangerous → prohibited → mustn\'t.' },
      },
      {
        id: 'gr-l2-modals-ex03',
        type: 'multiple-choice',
        question: 'The museum is free. You ___ pay to go in.',
        options: ["mustn't", "don't have to", "can't", "shouldn't"],
        correctIndex: 1,
        explanation: { vi: 'Miễn phí → không cần trả → don\'t have to.', en: 'It is free → payment is not necessary → don\'t have to.' },
      },
      {
        id: 'gr-l2-modals-ex04',
        type: 'fill-blank',
        sentence: 'You look tired. You ___ go to bed early tonight.',
        acceptedAnswers: ['should', 'must'],
        hint: '(advice)',
        explanation: { vi: 'Lời khuyên → should.', en: 'Advice → should.' },
      },
      {
        id: 'gr-l2-modals-ex05',
        type: 'fill-blank',
        sentence: 'Last year I ___ to work every weekend.',
        acceptedAnswers: ['had'],
        hint: '(have to – past)',
        explanation: { vi: 'Quá khứ của have to / must → had to.', en: 'The past of have to / must → had to.' },
      },
      {
        id: 'gr-l2-modals-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['She must to finish it today.', 'She musts finish it today.', 'She must finish it today.', 'She must finishing it today.'],
        correctIndex: 2,
        explanation: { vi: 'must + V nguyên mẫu, không "to", không thêm -s.', en: 'must + base verb: no "to", no -s.' },
      },
      {
        id: 'gr-l2-modals-ex07',
        type: 'arrange-words',
        translationVi: 'Anh ấy phải mặc đồng phục ở chỗ làm.',
        correctSentence: 'He has to wear a uniform at work.',
        extraWords: ['have', 'must to'],
        explanation: { vi: 'He → has to + V.', en: 'He → has to + V.' },
      },
      {
        id: 'gr-l2-modals-ex08',
        type: 'multiple-choice',
        question: 'When my grandfather was young, he ___ run very fast.',
        options: ['can', 'could', 'must', 'should'],
        correctIndex: 1,
        explanation: { vi: 'Khả năng trong quá khứ → could.', en: 'Ability in the past → could.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l2-modals-t01',
        type: 'multiple-choice',
        question: 'Tomorrow is a holiday, so we ___ go to school.',
        options: ["mustn't", "don't have to", "can't", "shouldn't"],
        correctIndex: 1,
        explanation: { vi: 'Ngày nghỉ → không cần đi → don\'t have to.', en: 'A holiday → not necessary → don\'t have to.' },
      },
      {
        id: 'gr-l2-modals-t02',
        type: 'fill-blank',
        sentence: 'You ___ eat so much sugar. It\'s bad for your teeth.',
        acceptedAnswers: ["shouldn't", 'should not', "mustn't"],
        hint: '(advice, negative)',
        explanation: { vi: 'Lời khuyên phủ định → shouldn\'t.', en: 'Negative advice → shouldn\'t.' },
      },
      {
        id: 'gr-l2-modals-t03',
        type: 'multiple-choice',
        question: 'Passengers ___ show their tickets before boarding.',
        options: ['must', 'can', "don't have to", 'could'],
        correctIndex: 0,
        explanation: { vi: 'Quy định → must.', en: 'A rule → must.' },
      },
      {
        id: 'gr-l2-modals-t04',
        type: 'fill-blank',
        sentence: '___ I borrow your pen, please?',
        acceptedAnswers: ['Can', 'Could', 'May'],
        hint: '(permission)',
        explanation: { vi: 'Xin phép → Can / Could.', en: 'Asking permission → Can / Could.' },
      },
      {
        id: 'gr-l2-modals-t05',
        type: 'multiple-choice',
        question: 'Which sentence means "it is not necessary"?',
        options: ["You mustn't come.", "You can't come.", "You don't have to come.", "You shouldn't come."],
        correctIndex: 2,
        explanation: { vi: 'don\'t have to = không cần.', en: 'don\'t have to = not necessary.' },
      },
    ],
  },
]
