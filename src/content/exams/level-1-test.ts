/**
 * level-1-test.ts
 * ----------------------------------------------------------------------------
 * BÀI KIỂM TRA CUỐI LEVEL 1 (band 0 – 2.0), khoảng 35 phút.
 * Đạt từ 70% trở lên (passPercent) thì qua level.
 *
 * Cấu trúc (số câu đánh lại từ 1 ở mỗi phần):
 *   1. Vocabulary (7 phút)  — 12 câu: chào hỏi, gia đình, số/ngày/giờ, thói quen hằng ngày, đồ vật trong nhà/trường
 *   2. Listening (7 phút)   — 10 câu: Part 1 điền form (tên, số, giờ), Part 2 hội thoại ngắn chọn đáp án
 *   3. Reading (8 phút)     — 10 câu: Part 1 thông báo (notice), Part 2 email ngắn (~100 từ), có TRUE/FALSE/NOT GIVEN
 *   4. Writing (10 phút)    — 1 bài viết 40–60 từ về bản thân/gia đình (AI chấm)
 *   5. Speaking (3 phút)    — 4 câu hỏi Part 1 đơn giản, mỗi câu trả lời tối đa 30 giây (AI chấm)
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'

export const level1Test: Exam = {
  id: 'level-1-test',
  kind: 'level-test',
  levelId: 'level-1',
  passPercent: 70,
  title: {
    vi: 'Kiểm tra cuối Level 1',
    en: 'Level 1 Test',
  },
  description: {
    vi: 'Khoảng 35 phút, kiểm tra đủ 5 kỹ năng của Level 1: từ vựng, nghe, đọc, viết và nói. Cần đạt 70% để qua level.',
    en: 'About 35 minutes, testing all five Level 1 skills: vocabulary, listening, reading, writing and speaking. You need 70% to pass.',
  },
  sections: [
    /* ======================================================================
     * PHẦN 1: TỪ VỰNG — 12 câu
     * ==================================================================== */
    {
      skill: 'vocabulary',
      title: 'Vocabulary',
      durationMinutes: 7,
      parts: [
        // Part 1: chào hỏi, gia đình, số đếm, ngày, giờ
        {
          title: 'Part 1',
          instructions: 'Questions 1–7. Choose the correct answer, or write ONE word or number in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'l1t-voc-q1',
              number: 1,
              prompt: "It's 8 o'clock in the morning. You meet your teacher. You say: \"Good ___!\"",
              options: ['night', 'morning', 'evening', 'afternoon'],
              correctIndex: 1,
              explanation: {
                vi: 'Buổi sáng chào "Good morning". "Good afternoon" là buổi chiều, "Good evening" là buổi tối, "Good night" dùng khi chúc ngủ ngon/chia tay buổi tối.',
                en: 'In the morning we say "Good morning". "Good night" is for saying goodbye late in the evening or before bed.',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q2',
              number: 2,
              prompt: 'A: "How are you?"  B: "___"',
              options: ["I'm fine, thank you.", "I'm ten.", "I'm Nam.", "I'm from Viet Nam."],
              correctIndex: 0,
              explanation: {
                vi: '"How are you?" hỏi về sức khỏe/tình trạng, nên trả lời "I\'m fine, thank you." Các đáp án khác trả lời cho câu hỏi tuổi, tên, quê.',
                en: '"How are you?" asks how you feel, so the answer is "I\'m fine, thank you." The others answer questions about age, name and country.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-voc-q3',
              number: 3,
              prompt: "My mother's mother is my ___.",
              acceptedAnswers: ['grandmother', 'grandma', 'granny'],
              explanation: {
                vi: 'Mẹ của mẹ là bà ngoại → "grandmother" (thân mật: grandma, granny).',
                en: 'Your mother\'s mother is your "grandmother" (informal: grandma, granny).',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q4',
              number: 4,
              prompt: 'My father and my mother are my ___.',
              options: ['children', 'parents', 'cousins', 'friends'],
              correctIndex: 1,
              explanation: {
                vi: 'Bố và mẹ gọi chung là "parents" (bố mẹ). "Children" là con cái, "cousins" là anh chị em họ.',
                en: 'Your father and mother together are your "parents". "Children" are sons and daughters.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-voc-q5',
              number: 5,
              prompt: 'Ten plus five is ___.',
              acceptedAnswers: ['15', 'fifteen'],
              explanation: {
                vi: '10 + 5 = 15, viết bằng chữ là "fifteen". Chú ý: fifteen (15) khác fifty (50).',
                en: '10 + 5 = 15, written "fifteen". Be careful: fifteen (15) is different from fifty (50).',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q6',
              number: 6,
              prompt: 'The day after Friday is ___.',
              options: ['Thursday', 'Sunday', 'Saturday', 'Monday'],
              correctIndex: 2,
              explanation: {
                vi: 'Thứ tự: Friday (thứ Sáu) → Saturday (thứ Bảy) → Sunday (Chủ nhật). Vậy sau thứ Sáu là Saturday.',
                en: 'The order is Friday → Saturday → Sunday, so the day after Friday is Saturday.',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q7',
              number: 7,
              prompt: 'The clock says 7:15. What time is it?',
              options: ['a quarter to seven', 'half past seven', 'a quarter past seven', "seven o'clock"],
              correctIndex: 2,
              explanation: {
                vi: '15 phút = "a quarter" (một phần tư giờ). 7:15 là 7 giờ hơn 15 phút → "a quarter past seven". "A quarter to seven" là 6:45.',
                en: '15 minutes is "a quarter". 7:15 = "a quarter past seven". "A quarter to seven" is 6:45.',
              },
            },
          ],
        },
        // Part 2: thói quen hằng ngày, đồ vật trong nhà và ở trường
        {
          title: 'Part 2',
          instructions: 'Questions 8–12. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'gap-fill',
              id: 'l1t-voc-q8',
              number: 8,
              prompt: 'I ___ my teeth every morning and every evening.',
              acceptedAnswers: ['brush', 'clean'],
              explanation: {
                vi: 'Cụm từ "brush my teeth" = đánh răng (cũng có thể nói "clean my teeth").',
                en: 'We say "brush my teeth" (or "clean my teeth").',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q9',
              number: 9,
              prompt: 'She ___ breakfast at half past six.',
              options: ['have', 'has', 'having', 'to have'],
              correctIndex: 1,
              explanation: {
                vi: 'Chủ ngữ "she" (ngôi thứ ba số ít) ở thì hiện tại đơn nên "have" đổi thành "has". "Have breakfast" = ăn sáng.',
                en: 'With "she" in the present simple, "have" becomes "has". "Have breakfast" = eat breakfast.',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q10',
              number: 10,
              prompt: 'You sleep in a ___.',
              options: ['fridge', 'desk', 'bed', 'board'],
              correctIndex: 2,
              explanation: {
                vi: 'Ta ngủ trên giường → "bed". "Fridge" là tủ lạnh, "desk" là bàn học, "board" là cái bảng.',
                en: 'You sleep in a "bed". A fridge keeps food cold, a desk is for studying, a board is for writing on in class.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-voc-q11',
              number: 11,
              prompt: 'I write in my notebook with a ___.',
              acceptedAnswers: ['pen', 'pencil'],
              explanation: {
                vi: 'Dụng cụ để viết là "pen" (bút bi/bút mực) hoặc "pencil" (bút chì).',
                en: 'We write with a "pen" or a "pencil".',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-voc-q12',
              number: 12,
              prompt: 'My mother cooks dinner in the ___.',
              options: ['bathroom', 'kitchen', 'bedroom', 'classroom'],
              correctIndex: 1,
              explanation: {
                vi: 'Nấu ăn ở nhà bếp → "kitchen". "Bathroom" là phòng tắm, "bedroom" là phòng ngủ, "classroom" là lớp học.',
                en: 'We cook in the "kitchen". A bathroom is for washing, a bedroom is for sleeping.',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 2: NGHE — 10 câu, 2 part
     * Mỗi dòng audioScript dạng "Tên: lời thoại" để app đọc bằng nhiều giọng.
     * ==================================================================== */
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 7,
      parts: [
        // Part 1: điền form đăng ký thẻ thư viện (tên đánh vần, tuổi, số nhà, giờ, ngày)
        {
          title: 'Part 1',
          instructions:
            'Questions 1–5. Listen to a boy getting a library card. Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript:
            'Woman: Hello. Welcome to Green Park Library. Can I help you?\n' +
            'Nam: Yes, please. I want a library card.\n' +
            "Woman: OK. What's your first name?\n" +
            'Nam: Nam. N-A-M.\n' +
            'Woman: And your family name?\n' +
            'Nam: Pham. P-H-A-M.\n' +
            'Woman: Thank you. How old are you, Nam?\n' +
            "Nam: I'm twelve.\n" +
            "Woman: And what's your address?\n" +
            "Nam: It's 24 Lake Street.\n" +
            'Woman: 24 Lake Street. Good. Here is your card.\n' +
            'Nam: Thank you. What time does the library open?\n' +
            'Woman: We open at nine in the morning and close at five in the afternoon.\n' +
            'Nam: Is it open every day?\n' +
            "Woman: From Monday to Saturday. It's closed on Sunday.",
          questions: [
            {
              kind: 'gap-fill',
              id: 'l1t-lis-q1',
              number: 1,
              prompt: 'Family name: ___',
              acceptedAnswers: ['Pham'],
              explanation: {
                vi: 'Nam đánh vần họ của mình: "Pham. P-H-A-M." "Family name" = họ. "Nam" là tên (first name).',
                en: 'Nam spells his family name: "P-H-A-M". "Nam" is his first name.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-lis-q2',
              number: 2,
              prompt: 'Age: ___',
              acceptedAnswers: ['12', 'twelve'],
              explanation: {
                vi: 'Nam nói "I\'m twelve." → 12 tuổi. Chú ý twelve (12) khác twenty (20).',
                en: 'Nam says "I\'m twelve." Be careful: twelve (12) is not twenty (20).',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-lis-q3',
              number: 3,
              prompt: 'Address: ___ Lake Street',
              acceptedAnswers: ['24', 'twenty-four', 'twenty four'],
              explanation: {
                vi: 'Nam nói "It\'s 24 Lake Street." và nhân viên nhắc lại "24 Lake Street" → số nhà 24.',
                en: 'Nam says "It\'s 24 Lake Street" and the woman repeats it.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-lis-q4',
              number: 4,
              prompt: 'The library opens at ___ a.m.',
              acceptedAnswers: ['9', 'nine', '9:00', '9.00'],
              explanation: {
                vi: '"We open at nine in the morning" → mở cửa lúc 9 giờ sáng. 5 giờ chiều (five) là giờ đóng cửa.',
                en: '"We open at nine in the morning." Five is the closing time.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-lis-q5',
              number: 5,
              prompt: 'The library is closed on ___.',
              acceptedAnswers: ['Sunday', 'Sundays'],
              explanation: {
                vi: 'Thư viện mở "from Monday to Saturday" và "It\'s closed on Sunday" → đóng cửa Chủ nhật.',
                en: 'It opens Monday to Saturday and "It\'s closed on Sunday."',
              },
            },
          ],
        },
        // Part 2: 5 đoạn hội thoại ngắn, mỗi đoạn 1 câu hỏi trắc nghiệm
        {
          title: 'Part 2',
          instructions:
            'Questions 6–10. Listen to five short conversations. Choose the correct answer for each one.',
          audioScript:
            'Narrator: Conversation one. What time is it?\n' +
            'Lan: Mum, what time is it? Is it eight o\'clock?\n' +
            "Mum: No, it's ten to eight. Hurry up, or you'll be late for school!\n" +
            'Narrator: Conversation two. How many sisters does Anna have?\n' +
            'Ben: Do you have any brothers or sisters, Anna?\n' +
            'Anna: Yes. I have two sisters and one brother.\n' +
            "Narrator: Conversation three. Where is Minh's bag?\n" +
            'Teacher: Minh, where is your bag? Is it on your chair?\n' +
            "Minh: No, it isn't. It's under my desk.\n" +
            'Narrator: Conversation four. When does Peter go swimming?\n' +
            'Hoa: What do you do after school, Peter?\n' +
            'Peter: I play football on Monday and Wednesday. And I go swimming on Saturday.\n' +
            "Narrator: Conversation five. When is Linda's birthday?\n" +
            'Tom: When is your birthday, Linda? Is it the fifteenth of June?\n' +
            "Linda: No, it's the fifth of June.",
          questions: [
            {
              kind: 'choice',
              id: 'l1t-lis-q6',
              number: 6,
              prompt: 'What time is it?',
              options: ['8:00', '7:50', '8:10', '7:10'],
              correctIndex: 1,
              explanation: {
                vi: 'Mẹ nói "It\'s ten to eight" = kém 10 phút là 8 giờ = 7:50. "8:00" là bẫy vì Lan đoán sai.',
                en: 'Mum says "It\'s ten to eight", which is 7:50. Lan\'s guess of eight o\'clock is wrong.',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-lis-q7',
              number: 7,
              prompt: 'How many sisters does Anna have?',
              options: ['one', 'two', 'three', 'none'],
              correctIndex: 1,
              explanation: {
                vi: 'Anna nói "I have two sisters and one brother" → 2 chị/em gái. "One" là số anh/em trai.',
                en: 'Anna says "I have two sisters and one brother." One is the number of brothers.',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-lis-q8',
              number: 8,
              prompt: "Where is Minh's bag?",
              options: ['on his chair', 'on his desk', 'under his desk', 'under his chair'],
              correctIndex: 2,
              explanation: {
                vi: 'Minh nói "It isn\'t (on my chair). It\'s under my desk." → cặp ở dưới bàn. "On" = trên, "under" = dưới.',
                en: 'Minh says it isn\'t on his chair: "It\'s under my desk."',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-lis-q9',
              number: 9,
              prompt: 'When does Peter go swimming?',
              options: ['on Monday', 'on Wednesday', 'on Saturday', 'on Sunday'],
              correctIndex: 2,
              explanation: {
                vi: 'Peter đá bóng thứ Hai và thứ Tư, còn "I go swimming on Saturday" → đi bơi thứ Bảy.',
                en: 'Peter plays football on Monday and Wednesday, but "I go swimming on Saturday."',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-lis-q10',
              number: 10,
              prompt: "When is Linda's birthday?",
              options: ['5 June', '15 June', '5 July', '15 July'],
              correctIndex: 0,
              explanation: {
                vi: 'Tom hỏi "the fifteenth of June?" nhưng Linda sửa lại: "No, it\'s the fifth of June." → ngày 5 tháng 6. Chú ý fifth (thứ 5) khác fifteenth (thứ 15).',
                en: 'Tom asks about the fifteenth, but Linda says "No, it\'s the fifth of June." Fifth (5th) is not fifteenth (15th).',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 3: ĐỌC — 10 câu, 2 part (thông báo + email ngắn)
     * ==================================================================== */
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 8,
      parts: [
        // Part 1: thông báo câu lạc bộ tiếng Anh
        {
          title: 'Part 1',
          instructions:
            'Questions 1–5. Read the notice. Choose the correct answer, write ONE WORD AND/OR A NUMBER, or choose TRUE, FALSE or NOT GIVEN.',
          passage: {
            title: 'English Club',
            text:
              'CITY SCHOOL — ENGLISH CLUB\n\n' +
              'Do you want to practise English? Come to our English Club!\n\n' +
              'When: Every Tuesday and Thursday, 4:00 p.m. to 5:30 p.m.\n' +
              'Where: Room 12, second floor\n' +
              'Who: Students aged 11 to 16\n' +
              'Price: Free\n\n' +
              'Please bring a notebook and a pen. At the club, you can play games, sing songs and watch short films in English.\n\n' +
              'Teacher: Ms Hanh',
          },
          questions: [
            {
              kind: 'choice',
              id: 'l1t-rea-q1',
              number: 1,
              prompt: 'How many days a week does the English Club meet?',
              options: ['one', 'two', 'three', 'five'],
              correctIndex: 1,
              explanation: {
                vi: 'Thông báo ghi "Every Tuesday and Thursday" → thứ Ba và thứ Năm, tức 2 ngày mỗi tuần.',
                en: 'The notice says "Every Tuesday and Thursday" — two days a week.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-rea-q2',
              number: 2,
              prompt: 'The club meets in Room ___.',
              acceptedAnswers: ['12', 'twelve'],
              explanation: {
                vi: 'Dòng "Where: Room 12, second floor" → phòng số 12, tầng 2.',
                en: 'The notice says "Where: Room 12, second floor".',
              },
            },
            {
              kind: 'choice',
              id: 'l1t-rea-q3',
              number: 3,
              prompt: 'What do students need to bring?',
              options: ['a book and a pencil', 'a notebook and a pen', 'some money', 'a computer'],
              correctIndex: 1,
              explanation: {
                vi: '"Please bring a notebook and a pen." → mang vở và bút. Câu lạc bộ miễn phí nên không cần tiền.',
                en: '"Please bring a notebook and a pen." The club is free, so no money is needed.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l1t-rea-q4',
              number: 4,
              prompt: 'Students must pay to join the club.',
              answer: 'FALSE',
              explanation: {
                vi: 'Thông báo ghi "Price: Free" (miễn phí) → ngược với câu "phải trả tiền", nên là FALSE.',
                en: 'The notice says "Price: Free", which contradicts the statement → FALSE.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l1t-rea-q5',
              number: 5,
              prompt: 'Ms Hanh is from England.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Thông báo chỉ cho biết giáo viên là Ms Hanh, không nói cô ấy đến từ đâu → NOT GIVEN (không có thông tin).',
                en: 'The notice only gives the teacher\'s name. It says nothing about where she is from → NOT GIVEN.',
              },
            },
          ],
        },
        // Part 2: email giới thiệu bản thân và gia đình (~100 từ)
        {
          title: 'Part 2',
          instructions:
            'Questions 6–10. Read the email. Choose the correct answer, write ONE WORD, or choose TRUE, FALSE or NOT GIVEN.',
          passage: {
            title: 'An email from Mai',
            text:
              'Hi Sara,\n\n' +
              'My name is Mai and I am fourteen years old. I live in Da Nang with my parents and my little brother, Khoa. He is eight. My father is a doctor and my mother is a teacher at my school.\n\n' +
              'Every day I get up at six o\'clock. I go to school by bike with my best friend, Lan. After school, I do my homework and help my mother in the kitchen. In the evening, we watch TV together. On Sundays, my family often goes to the beach because it is very near our house.\n\n' +
              'Please write and tell me about your family!\n\n' +
              'Mai',
          },
          questions: [
            {
              kind: 'choice',
              id: 'l1t-rea-q6',
              number: 6,
              prompt: "How old is Mai's brother?",
              options: ['four', 'six', 'eight', 'fourteen'],
              correctIndex: 2,
              explanation: {
                vi: '"my little brother, Khoa. He is eight." → em trai Khoa 8 tuổi. 14 là tuổi của Mai.',
                en: '"my little brother, Khoa. He is eight." Fourteen is Mai\'s age.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l1t-rea-q7',
              number: 7,
              prompt: 'Mai goes to school by ___.',
              acceptedAnswers: ['bike', 'bicycle'],
              explanation: {
                vi: '"I go to school by bike" → Mai đi học bằng xe đạp (bike = bicycle).',
                en: '"I go to school by bike" (bike = bicycle).',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l1t-rea-q8',
              number: 8,
              prompt: "Mai's mother works at Mai's school.",
              answer: 'TRUE',
              explanation: {
                vi: '"my mother is a teacher at my school" → mẹ Mai là giáo viên ở trường của Mai → TRUE.',
                en: '"my mother is a teacher at my school" → TRUE.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l1t-rea-q9',
              number: 9,
              prompt: "Mai gets up at seven o'clock.",
              answer: 'FALSE',
              explanation: {
                vi: 'Email viết "I get up at six o\'clock" (6 giờ), không phải 7 giờ → FALSE.',
                en: 'The email says "I get up at six o\'clock", not seven → FALSE.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l1t-rea-q10',
              number: 10,
              prompt: "Mai's family goes to the beach by car.",
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Email chỉ nói gia đình hay ra biển vào Chủ nhật vì biển gần nhà, không nói họ đi bằng phương tiện gì → NOT GIVEN.',
                en: 'The email says they often go to the beach on Sundays, but not how they travel there → NOT GIVEN.',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 4: VIẾT — 1 bài ngắn, AI chấm
     * ==================================================================== */
    {
      skill: 'writing',
      title: 'Writing',
      durationMinutes: 10,
      writingTasks: [
        {
          id: 'l1t-wri-task1',
          taskNumber: 1,
          prompt:
            'Write 40–60 words about yourself and your family. Say:\n' +
            '- your name and age\n' +
            '- where you live\n' +
            '- the people in your family and their jobs\n' +
            '- what you like doing',
          minWords: 40,
          suggestedMinutes: 10,
          sampleAnswer:
            'My name is Thao and I am thirteen years old. I live in Ha Noi with my family. There are four people in my family: my father, my mother, my older brother and me. My father is an engineer and my mother is a nurse. My brother is seventeen. I like reading books and listening to music.',
        },
      ],
    },

    /* ======================================================================
     * PHẦN 5: NÓI — 4 câu hỏi Part 1 đơn giản, AI chấm
     * ==================================================================== */
    {
      skill: 'speaking',
      title: 'Speaking',
      durationMinutes: 3,
      speakingParts: [
        {
          partNumber: 1,
          questions: [
            'What is your name, and how old are you?',
            'Where do you live?',
            'Can you tell me about your family?',
            'What do you usually do after school or after work?',
          ],
          prepSeconds: 0,
          answerSeconds: 30,
        },
      ],
    },
  ],
}
