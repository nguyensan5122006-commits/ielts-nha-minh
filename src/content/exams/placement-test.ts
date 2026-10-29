/**
 * placement-test.ts
 * ----------------------------------------------------------------------------
 * BÀI KIỂM TRA XẾP LỚP (khoảng 20 phút) — chỉ gồm các kỹ năng chấm tự động.
 *
 * Cấu trúc:
 *   1. Vocabulary & Grammar (10 phút) — câu 1–18, chia 3 part (dễ → khó)
 *   2. Reading (5 phút)              — câu 19–24, 1 đoạn văn ngắn
 *   3. Listening (5 phút)            — câu 25–30, 2 đoạn hội thoại
 *
 * Tổng cộng ĐÚNG 30 câu, đánh số liên tục 1..30.
 * Mỗi level (L1..L6) có đúng 5 câu: 3 câu từ vựng/ngữ pháp + 1 câu đọc + 1 câu nghe.
 *
 * QUY ƯỚC id: "pl-L{level}-q{số câu}", VD "pl-L3-q7".
 *   → Ứng dụng đọc con số sau "L" để biết câu đó thuộc level nào,
 *     từ đó tính ra người học đang ở level mấy (đúng nhiều câu level nào thì đạt level đó).
 *
 * Độ khó tăng dần: L1 (0–2.0) rất dễ → L6 (6.0–6.5) ngữ pháp phức tạp,
 * collocation (cụm từ hay đi cùng nhau) và câu hỏi suy luận.
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'

export const placementTest: Exam = {
  id: 'placement-test',
  kind: 'placement',
  title: {
    vi: 'Bài kiểm tra xếp lớp',
    en: 'Placement Test',
  },
  description: {
    vi: 'Khoảng 20 phút, 30 câu từ dễ đến khó gồm từ vựng – ngữ pháp, đọc và nghe. Kết quả giúp gợi ý level phù hợp để bắt đầu học.',
    en: 'About 20 minutes, 30 questions from easy to hard covering vocabulary & grammar, reading and listening. Your result suggests the best level to start with.',
  },
  sections: [
    /* ======================================================================
     * PHẦN 1: TỪ VỰNG & NGỮ PHÁP — 18 câu, 3 part, mỗi part trải 2 level
     * ==================================================================== */
    {
      skill: 'vocabulary',
      title: 'Vocabulary & Grammar',
      durationMinutes: 10,
      parts: [
        // Part 1: Level 1 – 2 (từ vựng gia đình, động từ "to be", thì hiện tại/quá khứ đơn)
        {
          title: 'Part 1',
          instructions:
            'Questions 1–6. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'pl-L1-q1',
              number: 1,
              prompt: "My father's sister is my ___.",
              options: ['uncle', 'aunt', 'cousin', 'niece'],
              correctIndex: 1,
              explanation: {
                vi: 'Chị/em gái của bố là "aunt" (cô). "Uncle" là chú/bác (nam), "cousin" là anh chị em họ, "niece" là cháu gái.',
                en: 'Your father\'s sister is your "aunt". "Uncle" is a man, "cousin" is the child of your aunt or uncle, and "niece" is your brother\'s or sister\'s daughter.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L1-q2',
              number: 2,
              prompt: 'I ___ a student. (be)',
              acceptedAnswers: ['am', "'m"],
              explanation: {
                vi: 'Chủ ngữ "I" luôn đi với "am" (động từ to be). Viết tắt: I\'m.',
                en: 'The subject "I" always goes with "am" (the verb to be). Short form: I\'m.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L1-q3',
              number: 3,
              prompt: 'Which day comes after Monday?',
              options: ['Sunday', 'Thursday', 'Tuesday', 'Friday'],
              correctIndex: 2,
              explanation: {
                vi: 'Thứ tự các ngày: Monday (thứ Hai) → Tuesday (thứ Ba). Vậy ngày sau thứ Hai là Tuesday.',
                en: 'The order of the days is Monday → Tuesday, so Tuesday comes after Monday.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L2-q4',
              number: 4,
              prompt: 'She ___ to school every day.',
              options: ['go', 'goes', 'going', 'gone'],
              correctIndex: 1,
              explanation: {
                vi: '"Every day" là dấu hiệu thì hiện tại đơn. Chủ ngữ "she" (ngôi thứ ba số ít) nên động từ thêm -es: goes.',
                en: '"Every day" signals the present simple. With "she" (third person singular), the verb takes -es: goes.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L2-q5',
              number: 5,
              prompt: 'There ___ two books on the table.',
              acceptedAnswers: ['are'],
              explanation: {
                vi: '"Two books" là danh từ số nhiều nên dùng "There are". "There is" chỉ dùng với danh từ số ít.',
                en: '"Two books" is plural, so we use "There are". "There is" is for singular nouns.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L2-q6',
              number: 6,
              prompt: 'Yesterday I ___ my grandmother.',
              options: ['visit', 'visited', 'visiting', 'will visit'],
              correctIndex: 1,
              explanation: {
                vi: '"Yesterday" (hôm qua) là dấu hiệu thì quá khứ đơn, nên động từ chia quá khứ: visited.',
                en: '"Yesterday" signals the past simple, so the verb must be in the past form: visited.',
              },
            },
          ],
        },
        // Part 2: Level 3 – 4 (so sánh hơn, since/for, câu điều kiện loại 1, bị động, giới từ)
        {
          title: 'Part 2',
          instructions:
            'Questions 7–12. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'pl-L3-q7',
              number: 7,
              prompt: 'This box is ___ than that one.',
              options: ['heavy', 'heavier', 'heaviest', 'more heavy'],
              correctIndex: 1,
              explanation: {
                vi: 'Có "than" nên dùng so sánh hơn. Tính từ ngắn tận cùng bằng -y đổi y → i rồi thêm -er: heavy → heavier.',
                en: '"Than" tells us to use the comparative. Short adjectives ending in -y change y to i and add -er: heavier.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L3-q8',
              number: 8,
              prompt: 'I have lived in this city ___ 2015.',
              acceptedAnswers: ['since'],
              explanation: {
                vi: 'Thì hiện tại hoàn thành + một MỐC thời gian (2015) thì dùng "since". "For" đi với một KHOẢNG thời gian (for ten years).',
                en: 'With the present perfect and a point in time (2015), we use "since". "For" is used with a period of time (for ten years).',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L3-q9',
              number: 9,
              prompt: 'If it rains tomorrow, we ___ at home.',
              options: ['stay', 'will stay', 'stayed', 'would stay'],
              correctIndex: 1,
              explanation: {
                vi: 'Câu điều kiện loại 1 (có thể xảy ra ở tương lai): If + hiện tại đơn, will + động từ nguyên mẫu → will stay.',
                en: 'First conditional (a real future possibility): If + present simple, will + base verb → will stay.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L4-q10',
              number: 10,
              prompt: 'The old bridge ___ in 1990.',
              options: ['built', 'was built', 'has built', 'is building'],
              correctIndex: 1,
              explanation: {
                vi: 'Cây cầu không tự xây được → dùng câu bị động. Có năm 1990 trong quá khứ → bị động quá khứ đơn: was + V3 (was built).',
                en: 'A bridge cannot build itself, so we need the passive. 1990 is in the past, so we use the past simple passive: was built.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L4-q11',
              number: 11,
              prompt: 'She is very interested ___ learning Japanese.',
              acceptedAnswers: ['in'],
              explanation: {
                vi: 'Cụm cố định: "be interested in + V-ing/danh từ" (quan tâm, thích thú với điều gì).',
                en: 'Fixed phrase: "be interested in + -ing/noun".',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L4-q12',
              number: 12,
              prompt: "I'm used to ___ up early, so 5 a.m. is not a problem for me.",
              options: ['get', 'getting', 'got', 'gets'],
              correctIndex: 1,
              explanation: {
                vi: '"Be used to" (đã quen với) có "to" là giới từ, nên theo sau là V-ing: getting. Đừng nhầm với "used to + V" (đã từng).',
                en: 'In "be used to" (be accustomed to), "to" is a preposition, so it is followed by -ing: getting. Don\'t confuse it with "used to + verb" (past habit).',
              },
            },
          ],
        },
        // Part 3: Level 5 – 6 (điều kiện loại 2/3, đảo ngữ, mệnh đề quan hệ, collocation học thuật)
        {
          title: 'Part 3',
          instructions:
            'Questions 13–18. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'pl-L5-q13',
              number: 13,
              prompt: 'If I ___ more money, I would buy a new laptop.',
              options: ['have', 'had', 'will have', 'would have'],
              correctIndex: 1,
              explanation: {
                vi: 'Câu điều kiện loại 2 (giả định không có thật ở hiện tại): If + quá khứ đơn, would + V → "had".',
                en: 'Second conditional (an unreal present situation): If + past simple, would + verb → "had".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L5-q14',
              number: 14,
              prompt: 'The government should take ___ to reduce air pollution in big cities.',
              acceptedAnswers: ['action', 'measures', 'steps'],
              explanation: {
                vi: 'Collocation thường gặp trong IELTS: "take action / take measures / take steps" = hành động, áp dụng biện pháp để giải quyết vấn đề.',
                en: 'Common IELTS collocations: "take action / take measures / take steps" = do something to deal with a problem.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L5-q15',
              number: 15,
              prompt: 'The man ___ car was stolen called the police.',
              options: ['who', 'whose', 'which', 'whom'],
              correctIndex: 1,
              explanation: {
                vi: '"Whose" là đại từ quan hệ chỉ sở hữu: "the man whose car" = người đàn ông MÀ xe CỦA ông ấy bị trộm.',
                en: '"Whose" shows possession: "the man whose car was stolen" = the man; his car was stolen.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L6-q16',
              number: 16,
              prompt: 'Had I known about the traffic jam, I ___ home earlier.',
              options: ['would leave', 'would have left', 'had left', 'will leave'],
              correctIndex: 1,
              explanation: {
                vi: 'Đây là câu điều kiện loại 3 dạng đảo ngữ: "Had I known" = "If I had known" (giả định trái với quá khứ). Mệnh đề chính dùng would have + V3 → would have left.',
                en: 'This is an inverted third conditional: "Had I known" = "If I had known" (unreal past). The main clause uses would have + past participle → would have left.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L6-q17',
              number: 17,
              prompt: 'Not only ___ she speak French, but she also speaks German fluently.',
              acceptedAnswers: ['does'],
              explanation: {
                vi: 'Khi "Not only" đứng đầu câu phải đảo ngữ (trợ động từ lên trước chủ ngữ). Thì hiện tại đơn, chủ ngữ "she" → trợ động từ "does".',
                en: 'When "Not only" starts a sentence, we use inversion (auxiliary before subject). Present simple with "she" → "does".',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L6-q18',
              number: 18,
              prompt: 'The report ___ attention to the growing gap between rich and poor.',
              options: ['makes', 'does', 'draws', 'takes'],
              correctIndex: 2,
              explanation: {
                vi: 'Collocation học thuật: "draw attention to something" = thu hút/hướng sự chú ý đến điều gì. Không nói "make/do/take attention to".',
                en: 'Academic collocation: "draw attention to something" = make people notice it. We don\'t say "make/do/take attention to".',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 2: ĐỌC HIỂU — 1 đoạn văn, 6 câu (mỗi level 1 câu, dễ → khó)
     * ==================================================================== */
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 5,
      parts: [
        {
          title: 'Passage 1',
          instructions:
            'Questions 19–24. Read the text and answer the questions. For gap-fill questions, write ONE WORD AND/OR A NUMBER.',
          passage: {
            title: 'Green Corner Garden',
            text:
              'Green Corner is a small community garden in the centre of Riverton. It is open every day from 7 a.m. to 6 p.m. Anyone can visit for free, but people who want their own vegetable plot must pay £20 a year.\n\n' +
              'The garden was started in 2012 by a group of retired teachers who were tired of seeing an empty car park next to their homes. At first, local officials were doubtful, arguing that the land would be more valuable for new housing. However, after the teachers collected over 2,000 signatures, the council agreed to rent the land to them.\n\n' +
              'Today, the garden has around 80 members. Besides growing food, it runs free cooking classes for families on Saturday mornings. According to a recent survey, many members say the garden has made them feel less lonely, although few mention saving money on food as a main benefit. The organisers now hope to open a second garden, provided they can find enough volunteers.',
          },
          questions: [
            {
              kind: 'choice',
              id: 'pl-L1-q19',
              number: 19,
              prompt: 'What time does the garden close?',
              options: ['7 a.m.', '12 p.m.', '6 p.m.', '8 p.m.'],
              correctIndex: 2,
              explanation: {
                vi: 'Bài đọc viết: "open every day from 7 a.m. to 6 p.m." → vườn đóng cửa lúc 6 giờ tối (6 p.m.). 7 a.m. là giờ mở cửa.',
                en: 'The text says it is "open every day from 7 a.m. to 6 p.m.", so it closes at 6 p.m. 7 a.m. is the opening time.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L2-q20',
              number: 20,
              prompt: 'A vegetable plot costs £___ a year.',
              acceptedAnswers: ['20', 'twenty'],
              explanation: {
                vi: 'Câu "people who want their own vegetable plot must pay £20 a year" → một mảnh vườn rau giá 20 bảng mỗi năm.',
                en: 'The text says plot owners "must pay £20 a year".',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L3-q21',
              number: 21,
              prompt: 'Who started the garden?',
              options: [
                'local officials',
                'a group of retired teachers',
                'families from the cooking class',
                'the city council',
              ],
              correctIndex: 1,
              explanation: {
                vi: '"The garden was started in 2012 by a group of retired teachers" → người lập vườn là nhóm giáo viên đã nghỉ hưu. Chính quyền (officials/council) chỉ cho thuê đất.',
                en: '"The garden was started ... by a group of retired teachers". The council only agreed to rent them the land.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'pl-L4-q22',
              number: 22,
              prompt: 'The local council supported the idea of a garden from the beginning.',
              answer: 'FALSE',
              explanation: {
                vi: 'Bài đọc nói "At first, local officials were doubtful" (lúc đầu chính quyền còn nghi ngờ) và chỉ đồng ý sau khi có hơn 2.000 chữ ký → ngược với câu đề, nên là FALSE.',
                en: 'The text says "At first, local officials were doubtful" and only agreed after 2,000 signatures, which contradicts the statement → FALSE.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'pl-L5-q23',
              number: 23,
              prompt: 'Only garden members can join the Saturday cooking classes.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài chỉ nói lớp nấu ăn miễn phí "for families" vào sáng thứ Bảy, không hề nói có giới hạn chỉ cho thành viên hay không → NOT GIVEN.',
                en: 'The text only says the free classes are "for families" on Saturday mornings. It does not say whether they are limited to members → NOT GIVEN.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L6-q24',
              number: 24,
              prompt: 'What can be inferred about the main benefit of the garden for its members?',
              options: [
                'It is mainly a way to save money on food.',
                'It is valued more for social reasons than financial ones.',
                'It helps members find jobs as volunteers.',
                'It gives members free housing near the city centre.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Khảo sát cho thấy nhiều thành viên "feel less lonely" (bớt cô đơn), còn "few mention saving money" (ít người nhắc tới tiết kiệm tiền) → lợi ích chính mang tính xã hội/tinh thần, không phải tài chính. Đây là câu hỏi suy luận.',
                en: 'Many members "feel less lonely", while "few mention saving money on food" → the garden is valued more for social reasons than financial ones. This answer requires inference.',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 3: NGHE — 2 đoạn hội thoại, 6 câu (Part 1 dễ, Part 2 khó)
     * Dòng "Tên: lời thoại" → app sẽ đọc bằng nhiều giọng khác nhau.
     * ==================================================================== */
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 5,
      parts: [
        // Part 1: đăng ký lớp bơi — nghe thông tin cơ bản (số, ngày, giờ)
        {
          title: 'Part 1',
          instructions:
            'Questions 25–27. Listen to a phone call at a sports centre. Write ONE WORD AND/OR A NUMBER, or choose the correct answer.',
          audioScript:
            'Receptionist: Good morning, City Sports Centre. How can I help you?\n' +
            "Linh: Hi. I'd like to join a swimming class, please.\n" +
            "Receptionist: Sure. What's your name?\n" +
            'Linh: Linh. L-I-N-H. My family name is Tran.\n' +
            'Receptionist: Thank you, Linh. And how old are you?\n' +
            "Linh: I'm fifteen.\n" +
            "Receptionist: OK. Our teen class is on Wednesday evenings... oh, sorry, that one is full now. But there's still space in the Friday class.\n" +
            'Linh: Friday is fine. What time does it start?\n' +
            'Receptionist: At half past five, and it finishes at seven.\n' +
            'Linh: Great. Thank you very much.',
          questions: [
            {
              kind: 'gap-fill',
              id: 'pl-L1-q25',
              number: 25,
              prompt: "Linh's age: ___",
              acceptedAnswers: ['15', 'fifteen'],
              explanation: {
                vi: 'Linh nói "I\'m fifteen." → Linh 15 tuổi.',
                en: 'Linh says "I\'m fifteen."',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L2-q26',
              number: 26,
              prompt: "On which day will Linh's class be?",
              options: ['Wednesday', 'Friday', 'Saturday', 'Sunday'],
              correctIndex: 1,
              explanation: {
                vi: 'Lớp thứ Tư (Wednesday) đã đầy ("that one is full now"), nên Linh chọn lớp thứ Sáu: "Friday is fine." Wednesday là bẫy.',
                en: 'The Wednesday class "is full now", so Linh agrees to the Friday class: "Friday is fine." Wednesday is a distractor.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'pl-L3-q27',
              number: 27,
              prompt: 'The class starts at ___ p.m.',
              acceptedAnswers: ['5:30', '5.30', '530', 'five thirty'],
              explanation: {
                vi: 'Lễ tân nói lớp bắt đầu "at half past five" (5 giờ 30) và kết thúc lúc 7 giờ. "Half past five" = 5:30.',
                en: 'The receptionist says it starts "at half past five" = 5:30. Seven o\'clock is the finishing time.',
              },
            },
          ],
        },
        // Part 2: 2 sinh viên bàn về đề tài thuyết trình — nghe ý kiến, thái độ
        {
          title: 'Part 2',
          instructions:
            'Questions 28–30. Listen to two students discussing a presentation. Choose the correct answer.',
          audioScript:
            'Tom: So, have you decided on a topic for our presentation?\n' +
            'Mai: I was thinking about online learning. At first I wanted to focus on its benefits, but honestly, most people already know those.\n' +
            'Tom: True. So what would you suggest instead?\n' +
            'Mai: Maybe we should look at why so many students drop out of online courses. That would be more original.\n' +
            "Tom: Good idea. And Professor Clark did say she wanted us to analyse a problem rather than just describe something.\n" +
            'Mai: Exactly. The only issue is data. Most of the surveys I found are quite old.\n' +
            "Tom: My cousin works at a university that runs online courses. I could ask whether they'd share some recent figures, as long as we keep the students' names private.\n" +
            "Mai: That would be great. Though we shouldn't count on it. Let's keep looking for other sources as well, just in case.",
          questions: [
            {
              kind: 'choice',
              id: 'pl-L4-q28',
              number: 28,
              prompt: 'What topic does Mai finally suggest?',
              options: [
                'the benefits of online learning',
                'why students drop out of online courses',
                'how universities design online courses',
                'the cost of online courses',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Ban đầu Mai muốn nói về lợi ích nhưng đổi ý vì "most people already know those". Cuối cùng cô đề xuất: "why so many students drop out of online courses".',
                en: 'Mai first thought of the benefits but changed her mind. She finally suggests "why so many students drop out of online courses".',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L5-q29',
              number: 29,
              prompt: 'Why does Tom think the topic is suitable?',
              options: [
                'It will be easy to find data.',
                'The professor wants them to analyse a problem.',
                'His cousin took an online course.',
                'Most surveys on it are very recent.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Tom nói "Professor Clark did say she wanted us to analyse a problem" → đề tài phù hợp vì giáo sư muốn phân tích một vấn đề. Dữ liệu thực ra lại khó tìm (khảo sát đã cũ).',
                en: 'Tom says "Professor Clark did say she wanted us to analyse a problem". In fact, data is a difficulty because the surveys are old.',
              },
            },
            {
              kind: 'choice',
              id: 'pl-L6-q30',
              number: 30,
              prompt: "How does Mai feel about Tom's offer to contact his cousin?",
              options: [
                'She thinks it is unnecessary.',
                'She is worried it will break privacy rules.',
                'She welcomes it but does not want to rely on it.',
                'She is sure it will solve their data problem.',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Mai nói "That would be great" (hoan nghênh) nhưng ngay sau đó "we shouldn\'t count on it" (đừng trông chờ vào nó) và muốn tìm thêm nguồn khác → vui nhưng thận trọng. Cần suy luận thái độ từ "Though...".',
                en: 'Mai says "That would be great" but then "we shouldn\'t count on it" and wants other sources → she welcomes it but won\'t rely on it. You must infer her attitude from "Though...".',
              },
            },
          ],
        },
      ],
    },
  ],
}
