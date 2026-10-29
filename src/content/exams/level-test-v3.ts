/**
 * level-test-v3.ts
 * ----------------------------------------------------------------------------
 * 3 BÀI KIỂM TRA LEVEL v3 (mỗi level 1 bài, 18–20 câu, đạt 70% thì qua level).
 * Dùng đúng kiểu `Exam` cũ (kind 'level-test') nên phòng thi hiện tại chạy được ngay.
 *
 * Chỉ gồm câu CHẤM TỰ ĐỘNG (từ vựng/ngữ pháp, nghe, đọc). Không có Writing/Speaking vì:
 *   - kết quả qua/không qua không phụ thuộc AI (AI lỗi mạng thì người học vẫn có kết quả ngay);
 *   - W/S đã được luyện + tự chấm theo checklist/bài mẫu trong các bài kỹ năng của từng chặng.
 *   (Muốn thêm W/S: exam-scoring.ts đã tính được — mỗi task = 5 điểm × band AI / band trên của level.)
 *
 * Danh sách:
 *   1. levelTestV3Level1 — 'level-test-v3-level-1' (Level 1: 0–2.0, Pre-A1–A1), 18 câu, ~20 phút
 *        Câu 1–8 từ vựng/ngữ pháp · Câu 9–13 nghe (đăng ký câu lạc bộ) · Câu 14–18 đọc (tin nhắn)
 *        Hướng dẫn có kèm tiếng Việt; giải thích viết tiếng Việt dễ hiểu.
 *   2. levelTestV3Level2 — 'level-test-v3-level-2' (Level 2: 2.0–4.0, A1–A2), 20 câu, ~25 phút
 *        Câu 1–8 từ vựng/ngữ pháp · Câu 9–14 nghe (gọi điện hỏi lớp nấu ăn) · Câu 15–20 đọc (bài blog)
 *   3. levelTestV3Level3 — 'level-test-v3-level-3' (Level 3: 4.0–6.5, B1–B2), 20 câu, ~32 phút, DẠNG ĐỀ IELTS
 *        Listening: Câu 1–5 điền form (Part 1) · Câu 6–10 trắc nghiệm A/B/C (Part 3, có giọng Úc)
 *        Reading  : Câu 11–20 trên 1 bài đọc ~570 từ: matching headings, TRUE/FALSE/NOT GIVEN, điền câu
 *
 * Quy ước: câu đánh số liên tục trong cả bài; id câu "level-test-v3-l{1|2|3}-q{số 2 chữ số}".
 * Kịch bản nghe dạng "Tên: lời thoại", người nói đầu tiên là nữ (script TTS gán giọng theo thứ tự:
 * nữ Anh → nam Anh → nữ Úc). Mỗi giải thích ≤ 20 từ mỗi ngôn ngữ.
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'

/* ============================================================================
 * LEVEL 1 — Pre-A1 → A1 (đạt = sẵn sàng sang Level 2)
 * ========================================================================== */

export const levelTestV3Level1: Exam = {
  id: 'level-test-v3-level-1',
  kind: 'level-test',
  levelId: 'level-1',
  passPercent: 70,
  title: { vi: 'Kiểm tra cuối Level 1', en: 'Level 1 Test' },
  description: {
    vi: 'Khoảng 20 phút, 18 câu: từ vựng – ngữ pháp, nghe và đọc. Đúng từ 70% (13 câu) là qua Level 1.',
    en: 'About 20 minutes, 18 questions: vocabulary and grammar, listening and reading. Score 70% (13 questions) to pass Level 1.',
  },
  sections: [
    {
      skill: 'vocabulary',
      title: 'Vocabulary & Grammar',
      durationMinutes: 6,
      parts: [
        {
          title: 'Part 1',
          instructions: 'Questions 1–8. Choose the correct answer, or write ONE word in the gap. (Chọn đáp án đúng, hoặc viết 1 từ vào chỗ trống.)',
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q01',
              number: 1,
              prompt: "My father's father is my ___.",
              options: ['uncle', 'grandfather', 'brother', 'son'],
              correctIndex: 1,
              explanation: {
                vi: 'Bố của bố là ông nội: "grandfather".',
                en: "Your father's father is your grandfather.",
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q02',
              number: 2,
              prompt: 'We usually have breakfast in the ___.',
              options: ['evening', 'night', 'morning', 'afternoon'],
              correctIndex: 2,
              explanation: {
                vi: 'Bữa sáng (breakfast) ăn vào buổi sáng: "in the morning".',
                en: 'Breakfast is the first meal of the day, eaten in the morning.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l1-q03',
              number: 3,
              prompt: 'There are seven days in a ___.',
              acceptedAnswers: ['week'],
              explanation: {
                vi: 'Một tuần (week) có 7 ngày.',
                en: 'A week has seven days.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q04',
              number: 4,
              prompt: 'She ___ two brothers.',
              options: ['has', 'have', 'is', 'are'],
              correctIndex: 0,
              explanation: {
                vi: 'Với "she, he, it" dùng "has", không dùng "have".',
                en: 'With "she", "he" and "it", use "has", not "have".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q05',
              number: 5,
              prompt: '"___ is your name?" — "My name is Lan."',
              options: ['Who', 'What', 'Where', 'How'],
              correctIndex: 1,
              explanation: {
                vi: 'Hỏi tên dùng "What is your name?". "Where" hỏi nơi chốn.',
                en: 'We ask "What is your name?". "Where" asks about places.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l1-q06',
              number: 6,
              prompt: 'I ___ from Viet Nam. (be)',
              acceptedAnswers: ['am'],
              explanation: {
                vi: 'Chủ ngữ "I" đi với "am": I am from Viet Nam.',
                en: '"I" goes with "am": I am from Viet Nam.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q07',
              number: 7,
              prompt: '"Where are my keys?" — "They are ___ your bag. Look inside it!"',
              options: ['in', 'on', 'under', 'behind'],
              correctIndex: 0,
              explanation: {
                vi: '"Inside" (bên trong) nên dùng "in": in your bag.',
                en: '"Look inside it" tells us the keys are in the bag.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q08',
              number: 8,
              prompt: 'My brother ___ play the piano, but he can play the guitar.',
              options: ["isn't", "don't", "can't", 'not'],
              correctIndex: 2,
              explanation: {
                vi: '"But he can play" cho thấy câu đầu là "can\'t" (không biết chơi).',
                en: '"But he can play the guitar" shows the first part needs "can\'t".',
              },
            },
          ],
        },
      ],
    },
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 6,
      parts: [
        {
          title: 'Part 1',
          instructions:
            'Questions 9–13. Listen to a boy joining an English club. Write ONE WORD AND/OR A NUMBER, or choose the correct answer. (Nghe một bạn nam đăng ký câu lạc bộ tiếng Anh.)',
          audioScript: `Teacher: Hello! Welcome to the Sunday English Club. What's your name?
Minh: Hi. My name is Minh. M-I-N-H.
Teacher: Thank you, Minh. And how old are you?
Minh: I'm fourteen.
Teacher: Great. The club is on Sunday mornings. It starts at nine o'clock and finishes at eleven.
Minh: OK. What do I need to bring?
Teacher: Just a pen and a notebook. We have books here.
Minh: Do I need to pay?
Teacher: No, it's free for students.
Minh: Great! See you on Sunday.`,
          questions: [
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l1-q09',
              number: 9,
              prompt: 'Name: ___',
              acceptedAnswers: ['Minh'],
              explanation: {
                vi: 'Bạn ấy đánh vần tên: M-I-N-H.',
                en: 'He spells his name: M-I-N-H.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l1-q10',
              number: 10,
              prompt: 'Age: ___',
              acceptedAnswers: ['14', 'fourteen'],
              explanation: {
                vi: 'Minh nói "I\'m fourteen" = 14 tuổi.',
                en: 'Minh says, "I\'m fourteen."',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q11',
              number: 11,
              prompt: 'What time does the club start?',
              options: ['8:00', '9:00', '10:00', '11:00'],
              correctIndex: 1,
              explanation: {
                vi: 'Câu lạc bộ bắt đầu lúc 9 giờ ("nine o\'clock"), kết thúc lúc 11 giờ.',
                en: 'It starts at nine o\'clock and finishes at eleven.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q12',
              number: 12,
              prompt: 'What does Minh need to bring?',
              options: ['some books', 'some money', 'a pen and a notebook', 'a computer'],
              correctIndex: 2,
              explanation: {
                vi: 'Cô giáo nói "Just a pen and a notebook". Sách đã có sẵn.',
                en: 'The teacher says, "Just a pen and a notebook." The club has books.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q13',
              number: 13,
              prompt: 'How much does the club cost for students?',
              options: ['nothing — it is free', '£1', '£5', '£10'],
              correctIndex: 0,
              explanation: {
                vi: 'Cô giáo nói "it\'s free for students" = miễn phí cho học sinh.',
                en: 'The teacher says, "It\'s free for students."',
              },
            },
          ],
        },
      ],
    },
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 8,
      parts: [
        {
          title: 'Part 1',
          instructions:
            'Questions 14–18. Read the message. Choose the correct answer, choose TRUE, FALSE or NOT GIVEN, or write ONE WORD AND/OR A NUMBER. (TRUE = đúng; FALSE = sai; NOT GIVEN = tin nhắn không nói.)',
          passage: {
            title: 'A message from Lan',
            text: `Hi Hoa,

I'm at the new swimming pool in Park Street. It's very big and the water is warm! It opens at 7 a.m. and closes at 8 p.m. Tickets are 30,000 dong.

My little brother is here too. He can't swim, so he's in the small pool for children.

Do you want to come with me tomorrow? We can meet at the bus stop at 3 o'clock.

Lan`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l1-q14',
              number: 14,
              prompt: 'Where is Lan now?',
              options: ['at the bus stop', 'at school', 'at home', 'at the swimming pool'],
              correctIndex: 3,
              explanation: {
                vi: 'Câu đầu: "I\'m at the new swimming pool" = Lan đang ở hồ bơi.',
                en: 'The first sentence: "I\'m at the new swimming pool".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l1-q15',
              number: 15,
              prompt: 'The swimming pool opens at 8 a.m.',
              answer: 'FALSE',
              explanation: {
                vi: 'Hồ bơi mở cửa lúc 7 giờ sáng; 8 giờ tối là giờ đóng cửa.',
                en: 'It opens at 7 a.m. It closes at 8 p.m.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l1-q16',
              number: 16,
              prompt: "Lan's little brother is at the swimming pool too.",
              answer: 'TRUE',
              explanation: {
                vi: 'Tin nhắn ghi "My little brother is here too" (em trai cũng ở đây).',
                en: 'The message says, "My little brother is here too."',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l1-q17',
              number: 17,
              prompt: 'There is a café at the swimming pool.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Tin nhắn không nói gì về quán cà phê nên là NOT GIVEN.',
                en: 'The message says nothing about a café.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l1-q18',
              number: 18,
              prompt: "Lan wants to meet Hoa at the bus stop at ___ o'clock.",
              acceptedAnswers: ['3', 'three'],
              explanation: {
                vi: 'Câu cuối: "meet at the bus stop at 3 o\'clock" = 3 giờ.',
                en: 'The message says, "We can meet at the bus stop at 3 o\'clock."',
              },
            },
          ],
        },
      ],
    },
  ],
}

/* ============================================================================
 * LEVEL 2 — A1 → A2+ (đạt = sẵn sàng sang Level 3 / B1)
 * ========================================================================== */

export const levelTestV3Level2: Exam = {
  id: 'level-test-v3-level-2',
  kind: 'level-test',
  levelId: 'level-2',
  passPercent: 70,
  title: { vi: 'Kiểm tra cuối Level 2', en: 'Level 2 Test' },
  description: {
    vi: 'Khoảng 25 phút, 20 câu: từ vựng – ngữ pháp, nghe (điền form như IELTS Part 1) và đọc. Đúng từ 70% (14 câu) là qua Level 2.',
    en: 'About 25 minutes, 20 questions: vocabulary and grammar, listening (IELTS Part 1-style form) and reading. Score 70% (14 questions) to pass Level 2.',
  },
  sections: [
    {
      skill: 'vocabulary',
      title: 'Vocabulary & Grammar',
      durationMinutes: 7,
      parts: [
        {
          title: 'Part 1',
          instructions: 'Questions 1–8. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q01',
              number: 1,
              prompt: "I've never ___ sushi. Is it nice?",
              options: ['ate', 'eat', 'eaten', 'eating'],
              correctIndex: 2,
              explanation: {
                vi: 'Hiện tại hoàn thành: have/has + V3. Eat → ate → eaten.',
                en: 'Present perfect: have + past participle. Eat, ate, eaten.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q02',
              number: 2,
              prompt: "I ___ a shower when you called me, so I didn't hear the phone.",
              options: ['was having', 'had', 'have', 'am having'],
              correctIndex: 0,
              explanation: {
                vi: 'Việc đang diễn ra (đang tắm) thì bị cuộc gọi xen vào: quá khứ tiếp diễn.',
                en: 'An action in progress interrupted by the call: past continuous "was having".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q03',
              number: 3,
              prompt: "You ___ wear a helmet when you ride a motorbike. It's the law.",
              options: ["mustn't", 'must', "don't have to", "can't"],
              correctIndex: 1,
              explanation: {
                vi: '"It\'s the law" (luật bắt buộc) nên dùng "must" = phải.',
                en: '"It\'s the law", so it is necessary: "must".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q04',
              number: 4,
              prompt: "There isn't ___ milk in the fridge. Can you buy some?",
              options: ['many', 'a few', 'much', 'some'],
              correctIndex: 2,
              explanation: {
                vi: '"Milk" không đếm được, câu phủ định dùng "much". "Many, a few" cho danh từ đếm được.',
                en: '"Milk" is uncountable, so use "much". "Many" and "a few" are for countable nouns.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q05',
              number: 5,
              prompt: "I was very ___ when I heard the news. I couldn't believe it!",
              options: ['surprise', 'surprising', 'surprisingly', 'surprised'],
              correctIndex: 3,
              explanation: {
                vi: 'Tả cảm xúc của người dùng đuôi -ed: surprised (ngạc nhiên).',
                en: 'Use the -ed adjective for how a person feels: surprised.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l2-q06',
              number: 6,
              prompt: 'The man ___ lives next door is a doctor.',
              acceptedAnswers: ['who', 'that'],
              explanation: {
                vi: 'Đại từ quan hệ chỉ người: "who" (hoặc "that").',
                en: 'Use "who" (or "that") for people in a relative clause.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q07',
              number: 7,
              prompt: 'I need to ___ an appointment with the dentist.',
              options: ['do', 'make', 'go', 'say'],
              correctIndex: 1,
              explanation: {
                vi: 'Cụm cố định: "make an appointment" = đặt lịch hẹn.',
                en: 'Fixed phrase: "make an appointment".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q08',
              number: 8,
              prompt: 'If you ___ hard, you will pass the exam.',
              options: ['will study', 'studied', 'study', 'studying'],
              correctIndex: 2,
              explanation: {
                vi: 'Điều kiện loại 1: If + hiện tại đơn (study), vế sau dùng "will".',
                en: 'First conditional: If + present simple (study), then "will" + verb.',
              },
            },
          ],
        },
      ],
    },
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 7,
      parts: [
        {
          title: 'Part 1',
          instructions:
            'Questions 9–14. Listen to a man asking about a cooking class. Choose the correct answer, or write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript: `Assistant: Good afternoon, Green Leaf Cooking School. How can I help you?
David: Hello. I'd like some information about your weekend cooking classes, please.
Assistant: Of course. We have a Vietnamese cooking class on Saturdays and an Italian class on Sundays.
David: I'm interested in the Vietnamese one. What time does it start?
Assistant: It starts at ten in the morning and lasts for three hours.
David: And how much does it cost?
Assistant: It's forty-five pounds per person. That includes all the ingredients.
David: That sounds good. Can I book two places for this Saturday?
Assistant: I'm sorry, this Saturday is full. But there are places on the following Saturday, the twelfth.
David: OK, the twelfth is fine.
Assistant: Can I have your surname, please?
David: Yes, it's Parker. P-A-R-K-E-R.
Assistant: Thank you, Mr Parker. Oh, and please wear comfortable shoes, because you'll be standing for most of the class.
David: No problem. Thanks very much.`,
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q09',
              number: 9,
              prompt: 'Which class does David want to take?',
              options: ['Italian', 'Chinese', 'Vietnamese'],
              correctIndex: 2,
              explanation: {
                vi: 'David nói "I\'m interested in the Vietnamese one". Lớp Ý (Italian) là bẫy.',
                en: 'David says, "I\'m interested in the Vietnamese one."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l2-q10',
              number: 10,
              prompt: 'Length of class: ___ hours',
              acceptedAnswers: ['3', 'three'],
              explanation: {
                vi: '"Lasts for three hours" = kéo dài 3 tiếng. "Ten" là giờ bắt đầu.',
                en: 'The class "lasts for three hours". Ten is the start time.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l2-q11',
              number: 11,
              prompt: 'Price per person: £___',
              acceptedAnswers: ['45', 'forty-five', 'forty five'],
              explanation: {
                vi: '"Forty-five pounds per person" = 45 bảng mỗi người.',
                en: 'The assistant says "forty-five pounds per person".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l2-q12',
              number: 12,
              prompt: 'Date of class: Saturday the ___',
              acceptedAnswers: ['12th', '12', 'twelfth'],
              explanation: {
                vi: 'Thứ Bảy này đã kín chỗ; David đồng ý "the twelfth" (ngày 12).',
                en: 'This Saturday is full, so David agrees to "the twelfth".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l2-q13',
              number: 13,
              prompt: 'Surname: ___',
              acceptedAnswers: ['Parker'],
              explanation: {
                vi: 'David đánh vần họ: P-A-R-K-E-R.',
                en: 'David spells his surname: P-A-R-K-E-R.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q14',
              number: 14,
              prompt: 'What does the assistant ask students to wear?',
              options: ['an apron', 'a hat', 'old clothes', 'comfortable shoes'],
              correctIndex: 3,
              explanation: {
                vi: '"Please wear comfortable shoes" vì phải đứng gần hết buổi học.',
                en: '"Please wear comfortable shoes", because students stand for most of the class.',
              },
            },
          ],
        },
      ],
    },
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 10,
      parts: [
        {
          title: 'Part 1',
          instructions:
            'Questions 15–20. Read the blog post. Choose the correct answer, choose TRUE, FALSE or NOT GIVEN, or write ONE WORD AND/OR A NUMBER.',
          passage: {
            title: 'Never Too Late',
            text: `When my grandfather stopped working at the age of sixty, he had never cooked a meal in his life. My grandmother had always done all the cooking. But last year she broke her arm, and for two months she couldn't use it. So my grandfather decided to learn.

At first, it was difficult. He burned the rice twice and put too much salt in the soup. But he didn't give up. He watched cooking videos online every evening and wrote the recipes in a small notebook. After a few weeks, his meals were much better.

Now my grandmother's arm is fine, but my grandfather still cooks dinner three times a week. His favourite dish is fish soup, and he is very proud of it. Next month, he is going to take a cooking class at the community centre with some of his friends. He says that learning something new makes him feel younger.`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q15',
              number: 15,
              prompt: 'Why did the grandfather start cooking?',
              options: ['He stopped working.', 'His wife hurt her arm.', 'He wanted to save money.', 'His friends asked him to.'],
              correctIndex: 1,
              explanation: {
                vi: 'Bà bị gãy tay, không dùng được trong hai tháng, nên ông quyết định học nấu.',
                en: 'His wife broke her arm and could not use it, so he decided to learn.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l2-q16',
              number: 16,
              prompt: 'The grandfather had cooked a few meals before he stopped working.',
              answer: 'FALSE',
              explanation: {
                vi: 'Bài viết: "he had never cooked a meal in his life" — chưa từng nấu bữa nào.',
                en: 'The text says "he had never cooked a meal in his life".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l2-q17',
              number: 17,
              prompt: 'He learned to cook by watching videos.',
              answer: 'TRUE',
              explanation: {
                vi: '"He watched cooking videos online every evening" và món ăn tốt dần lên.',
                en: '"He watched cooking videos online every evening", and his meals improved.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l2-q18',
              number: 18,
              prompt: 'The grandmother taught him how to make fish soup.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài chỉ nói canh cá là món ông thích, không nói ai dạy ông.',
                en: 'Fish soup is his favourite dish, but the text never says who taught him.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l2-q19',
              number: 19,
              prompt: 'Now he cooks dinner ___ times a week.',
              acceptedAnswers: ['3', 'three'],
              explanation: {
                vi: '"Still cooks dinner three times a week" = 3 lần mỗi tuần.',
                en: 'He "still cooks dinner three times a week".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l2-q20',
              number: 20,
              prompt: 'What is he going to do next month?',
              options: ['teach his friends to cook', 'open a small restaurant', 'take a cooking class', 'write a recipe book'],
              correctIndex: 2,
              explanation: {
                vi: '"He is going to take a cooking class" cùng bạn bè, không phải dạy bạn.',
                en: '"He is going to take a cooking class" with friends; he is not teaching them.',
              },
            },
          ],
        },
      ],
    },
  ],
}

/* ============================================================================
 * LEVEL 3 — B1 → B2, dạng đề IELTS (đạt ≈ sẵn sàng làm đề thi thử đầy đủ)
 * ========================================================================== */

/* Danh sách tiêu đề cho dạng Matching Headings (giống mock-ielts-test-1) */
const HEADINGS_L3 = [
  'i. Why the afternoon slump happens',
  'ii. Finding the right length for a nap',
  'iii. Evidence that brief rest boosts performance',
  'iv. A changing attitude towards daytime sleep',
  'v. How some workplaces are responding',
  'vi. The best food to eat before a nap',
  'vii. Unanswered questions about long naps and health',
  "viii. How children's sleep differs from adults'",
]

export const levelTestV3Level3: Exam = {
  id: 'level-test-v3-level-3',
  kind: 'level-test',
  levelId: 'level-3',
  passPercent: 70,
  title: { vi: 'Kiểm tra cuối Level 3 (dạng đề IELTS)', en: 'Level 3 Test (IELTS format)' },
  description: {
    vi: 'Khoảng 32 phút, 20 câu theo đúng dạng đề IELTS: Listening (điền form, trắc nghiệm) và Reading (matching headings, TRUE/FALSE/NOT GIVEN, điền câu). Đúng từ 70% (14 câu) là qua Level 3.',
    en: 'About 32 minutes, 20 IELTS-format questions: Listening (form completion, multiple choice) and Reading (matching headings, TRUE/FALSE/NOT GIVEN, sentence completion). Score 70% (14 questions) to pass Level 3.',
  },
  sections: [
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 12,
      parts: [
        /* ---- Part 1: gọi điện hỏi thuê căn hộ (điền form, có bẫy giá cũ / ngày đã kín) ---- */
        {
          title: 'Part 1',
          instructions: 'Questions 1–5. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript: `Agent: Good morning, Hillside Lettings. Emma speaking.
Kevin: Hi, I'm calling about the one-bedroom flat I saw on your website.
Agent: We have a few of those at the moment. Do you know which street it's on?
Kevin: I think it's Cranwell Street.
Agent: Ah yes, number fourteen. That's C-R-A-N-W-E-L-L. It's a lovely flat on the second floor.
Kevin: Great. The website said the rent was seven hundred and fifty pounds a month. Is that right?
Agent: That was the price last month, but the owner has just repainted it, so it's now eight hundred and twenty.
Kevin: I see. And when is it available?
Agent: The current tenant leaves at the end of May, so you could move in on the first of June.
Kevin: That works for me. Are any bills included in the rent?
Agent: Water is included, but you'd pay for electricity and gas yourself. There's no internet connection at the moment, but the owner says that can be arranged.
Kevin: OK. Would it be possible to see the flat this week?
Agent: Let me check. Wednesday is fully booked, I'm afraid, but I could show you round on Friday at half past five.
Kevin: Friday's perfect. Thank you.`,
          questions: [
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q01',
              number: 1,
              prompt: 'Address: 14 ___ Street',
              acceptedAnswers: ['Cranwell'],
              explanation: {
                vi: 'Nhân viên đánh vần tên phố: C-R-A-N-W-E-L-L.',
                en: 'The agent spells the street name: C-R-A-N-W-E-L-L.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q02',
              number: 2,
              prompt: 'Monthly rent: £___',
              acceptedAnswers: ['820', 'eight hundred and twenty', 'eight hundred twenty'],
              explanation: {
                vi: 'Bẫy: £750 là giá tháng trước. Giá hiện tại "now eight hundred and twenty".',
                en: 'Distractor: £750 was last month\'s price. It is "now eight hundred and twenty".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q03',
              number: 3,
              prompt: 'Available from: 1st ___',
              acceptedAnswers: ['June', 'Jun'],
              explanation: {
                vi: 'Người thuê cũ đi cuối tháng 5, nên dọn vào "on the first of June".',
                en: 'The tenant leaves at the end of May, so it is free "on the first of June".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q04',
              number: 4,
              prompt: 'Bill included in the rent: ___',
              acceptedAnswers: ['water'],
              explanation: {
                vi: '"Water is included"; điện, gas tự trả, còn internet chưa có.',
                en: '"Water is included". Electricity and gas are extra; there is no internet yet.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q05',
              number: 5,
              prompt: 'Viewing: ___ at 5.30 p.m.',
              acceptedAnswers: ['Friday', 'Fri'],
              explanation: {
                vi: 'Thứ Tư đã kín lịch (bẫy); hẹn xem nhà thứ Sáu lúc 5 giờ 30.',
                en: 'Wednesday is fully booked, so the viewing is on Friday at half past five.',
              },
            },
          ],
        },
        /* ---- Part 3: giảng viên + 2 sinh viên bàn bài thuyết trình về cốc dùng một lần (giọng thứ 3 là giọng Úc) ---- */
        {
          title: 'Part 3',
          instructions: 'Questions 6–10. Choose the correct letter, A, B or C.',
          audioScript: `Tutor: So, Sam and Mia, how's your presentation on the campus café going?
Sam: Quite well, thanks. We've decided to focus on single-use cups, rather than plastic packaging in general.
Tutor: Why did you narrow it down?
Mia: Well, at first we wanted to cover everything, but there was far too much information. And cups are something every student uses, so we thought the audience would find the topic easier to relate to.
Tutor: Good thinking. How did you collect your data?
Sam: We were going to interview the café staff, but they were too busy. So in the end we counted the cups in the recycling bins every day for a week.
Tutor: And what did you find?
Mia: Around two thousand cups a week, which is roughly what we'd predicted. What I didn't expect was how few of them were reusable cups, because the café gives a discount if you bring your own.
Sam: Although the discount is only ten pence, which isn't much of an incentive.
Tutor: True. So what are you going to recommend?
Sam: I'd like the café to charge extra for disposable cups, rather than giving a discount for reusable ones. Research suggests people react more strongly to losing money than to saving it.
Mia: I'm not sure the manager would agree to that. I think a better first step would be to sell reusable cups at the counter, so students don't have to remember to bring one from home.
Tutor: You could present both options and let the audience vote. That would make the presentation more interactive.
Mia: Oh, that's a nice idea.
Tutor: One last thing. Your slides have far too much text at the moment. Use more charts and keep the writing to a minimum.
Sam: OK, we'll work on that.`,
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q06',
              number: 6,
              prompt: 'Why did the students decide to focus on single-use cups?',
              options: ['A. They found too little information about packaging.', 'B. They thought the audience could relate to the topic.', 'C. Their tutor suggested the topic.'],
              correctIndex: 1,
              explanation: {
                vi: 'Mia: mọi sinh viên đều dùng cốc nên khán giả "easier to relate to". Thông tin thì quá nhiều.',
                en: 'Every student uses cups, so the audience would "find the topic easier to relate to".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q07',
              number: 7,
              prompt: 'How did the students collect their data?',
              options: ['A. by interviewing café staff', 'B. by giving out a questionnaire', 'C. by counting cups in recycling bins'],
              correctIndex: 2,
              explanation: {
                vi: 'Nhân viên quá bận (bẫy A), nên họ "counted the cups in the recycling bins".',
                en: 'The staff were too busy, so they "counted the cups in the recycling bins".',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q08',
              number: 8,
              prompt: 'What surprised Mia?',
              options: ['A. how few reusable cups were used', 'B. the total number of cups', 'C. how small the discount was'],
              correctIndex: 0,
              explanation: {
                vi: 'Tổng số cốc đúng như dự đoán; điều bất ngờ là "how few of them were reusable".',
                en: 'The total was "roughly what we\'d predicted"; she didn\'t expect "how few" were reusable.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q09',
              number: 9,
              prompt: 'What does Sam want the café to do?',
              options: ['A. give a bigger discount for reusable cups', 'B. charge extra for disposable cups', 'C. sell reusable cups at the counter'],
              correctIndex: 1,
              explanation: {
                vi: 'Sam: "charge extra for disposable cups". Bán cốc tại quầy (C) là ý của Mia.',
                en: 'Sam wants to "charge extra for disposable cups". Option C is Mia\'s idea.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q10',
              number: 10,
              prompt: "What does the tutor say about the students' slides?",
              options: ['A. They contain too much text.', 'B. They need more examples.', 'C. They should include a vote.'],
              correctIndex: 0,
              explanation: {
                vi: 'Giảng viên: "Your slides have far too much text" — nên dùng thêm biểu đồ.',
                en: 'The tutor says, "Your slides have far too much text."',
              },
            },
          ],
        },
      ],
    },
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 20,
      parts: [
        {
          title: 'Passage 1',
          instructions:
            'Questions 11–20. Questions 11–14: Choose the correct heading for paragraphs B–E from the list of headings (i–viii). Example: Paragraph A — iv. Questions 15–18: Choose TRUE, FALSE or NOT GIVEN. Questions 19–20: Complete the sentences. Write ONE WORD ONLY from the passage for each answer.',
          passage: {
            title: 'The Power of the Afternoon Nap',
            text: `A  In many parts of the world, including much of southern Europe, Latin America and Asia, a short sleep after lunch has long been part of daily life. In Viet Nam, office workers commonly rest at their desks for half an hour at midday, and some schools build a rest period into the timetable. In other countries, however, napping during the working day has often been seen as a sign of laziness. Recently, that attitude has begun to change, as research has revealed how much a well-timed nap can do for the brain.

B  Part of the explanation lies in the body's internal clock. Most people experience a natural drop in alertness in the early afternoon, usually between one and three o'clock. Many assume that this 'post-lunch dip' is caused by a heavy meal, but studies show that it happens even when people skip lunch altogether. It is built into our daily rhythm, which is why the urge to sleep at this time of day is so common across cultures.

C  The benefits of a short nap are well documented. In one study of long-distance airline pilots, those who were allowed a planned rest of about twenty-five minutes during a flight were noticeably more alert in the final stages than colleagues who had no rest. Laboratory experiments have also found that a nap can improve memory: people who slept briefly after learning a list of words recalled more of them later than people who stayed awake. Researchers believe the brain uses this time to strengthen new memories.

D  However, longer is not necessarily better. After about thirty minutes, the sleeper is likely to enter deep sleep, and being woken from this stage can leave a person feeling confused and heavy for up to half an hour. This effect, known as 'sleep inertia', can cancel out the benefits of the nap, at least in the short term. For this reason, most sleep experts recommend keeping a daytime nap to between ten and twenty minutes.

E  Some employers have taken note. A number of technology companies now provide quiet rooms or special reclining chairs where staff can rest for a short time, and some hospitals encourage doctors on night shifts to take planned naps. Critics argue that such schemes do not address the real problem, which is that many employees simply do not get enough sleep at night. A nap, they point out, cannot replace a full night's rest.

F  Researchers also add a word of caution. Several large studies have found that older adults who regularly nap for more than an hour a day are more likely to suffer from certain health problems. It is not clear, however, whether long naps cause these problems or whether people who are already unwell simply need more sleep. Meanwhile, people who have trouble sleeping at night are usually advised to avoid daytime naps altogether, so that they feel tired enough at bedtime.`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q11',
              number: 11,
              paragraphLabel: 'B',
              prompt: 'Choose the correct heading for Paragraph B.',
              options: HEADINGS_L3,
              correctIndex: 0,
              explanation: {
                vi: 'Đoạn B giải thích "post-lunch dip" do đồng hồ sinh học, không phải do bữa ăn.',
                en: 'Paragraph B explains the "post-lunch dip" and its cause: the body clock.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q12',
              number: 12,
              paragraphLabel: 'C',
              prompt: 'Choose the correct heading for Paragraph C.',
              options: HEADINGS_L3,
              correctIndex: 2,
              explanation: {
                vi: 'Đoạn C đưa bằng chứng: phi công tỉnh táo hơn, trí nhớ tốt hơn sau giấc ngắn.',
                en: 'Paragraph C gives evidence: more alert pilots and better memory after short naps.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q13',
              number: 13,
              paragraphLabel: 'D',
              prompt: 'Choose the correct heading for Paragraph D.',
              options: HEADINGS_L3,
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn D: ngủ quá 30 phút gây "sleep inertia"; nên ngủ 10–20 phút.',
                en: 'Paragraph D: naps over thirty minutes cause sleep inertia; ten to twenty minutes is best.',
              },
            },
            {
              kind: 'choice',
              id: 'level-test-v3-l3-q14',
              number: 14,
              paragraphLabel: 'E',
              prompt: 'Choose the correct heading for Paragraph E.',
              options: HEADINGS_L3,
              correctIndex: 4,
              explanation: {
                vi: 'Đoạn E nói về công ty, bệnh viện tạo chỗ cho nhân viên ngủ ngắn.',
                en: 'Paragraph E describes companies and hospitals that let staff take naps.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l3-q15',
              number: 15,
              paragraphLabel: 'A',
              prompt: 'Some schools in Viet Nam include a rest period in the school day.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn A: "some schools build a rest period into the timetable".',
                en: 'Paragraph A: "some schools build a rest period into the timetable".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l3-q16',
              number: 16,
              paragraphLabel: 'B',
              prompt: 'The post-lunch dip only affects people who have eaten a large meal.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn B: nó xảy ra "even when people skip lunch altogether".',
                en: 'Paragraph B: it happens "even when people skip lunch altogether".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l3-q17',
              number: 17,
              paragraphLabel: 'C',
              prompt: 'The pilots who rested during the flight made fewer mistakes when landing.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài chỉ nói phi công "more alert", không nhắc lỗi khi hạ cánh.',
                en: 'The pilots were "more alert"; mistakes when landing are not mentioned.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'level-test-v3-l3-q18',
              number: 18,
              paragraphLabel: 'E',
              prompt: 'Critics believe that nap rooms at work solve the problem of poor sleep at night.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn E: người phản đối cho rằng các chương trình này "do not address the real problem".',
                en: 'Paragraph E: critics say such schemes "do not address the real problem".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q19',
              number: 19,
              paragraphLabel: 'D',
              prompt: 'Feeling confused after waking from deep sleep is called sleep ___.',
              acceptedAnswers: ['inertia'],
              explanation: {
                vi: 'Đoạn D: "This effect, known as \'sleep inertia\'".',
                en: 'Paragraph D: "This effect, known as \'sleep inertia\'".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'level-test-v3-l3-q20',
              number: 20,
              paragraphLabel: 'F',
              prompt: 'People who sleep badly at night are usually told to avoid ___ naps.',
              acceptedAnswers: ['daytime'],
              explanation: {
                vi: 'Đoạn F: "advised to avoid daytime naps altogether".',
                en: 'Paragraph F: "usually advised to avoid daytime naps altogether".',
              },
            },
          ],
        },
      ],
    },
  ],
}

/** 3 bài test level v3 theo thứ tự level. */
export const LEVEL_TESTS_V3: Exam[] = [levelTestV3Level1, levelTestV3Level2, levelTestV3Level3]
