/**
 * listening-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "CẦU NỐI" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK TỔNG QUÁT (general)
 * KỸ NĂNG NGHE (mode 'listening')
 *
 * Cấu trúc 1 bài nghe v3:
 *   teachingCards (chiến thuật nghe) → exercises (khởi động, có nghe – chọn, nghe – gõ, nói)
 *   → listeningTask: 3 đoạn hội thoại tự nhiên (segments), mỗi câu hỏi gắn segmentId
 *     để người học bấm "Nghe lại đoạn này". Transcript chỉ hiện sau khi nộp bài.
 *
 * File này chứa 4 bài (mỗi chặng 1 bài):
 *   1. l2b-g-01-listen : Du lịch — làm thủ tục bay, nhận phòng khách sạn, gọi lễ tân nhờ sửa đồ + hỏi đường
 *   2. l2b-g-02-listen : Công việc — ngày đầu đi làm, ghi lời nhắn điện thoại, thông báo đổi lịch họp
 *   3. l2b-g-03-listen : Trường học — hỏi nhau bài tập, cô giáo giao dự án, nhóm phân công việc
 *   4. l2b-g-04-listen : Phim & nhạc — chọn phim, giới thiệu ban nhạc, điểm phim trên radio
 *
 * Giọng đọc: chỉ dùng giọng Anh-Anh (gb-female, gb-male). Số viết bằng chữ như người nói
 * (VD "four-one-six") để máy đọc không đọc sai.
 * Quy ước id: bài "l2b-g-<chặng>-listen", đoạn "...-s<số>", câu hỏi "...-q<số>", bài tập "...-ex<số>".
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralListeningLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — NGHE: Ở SÂN BAY VÀ KHÁCH SẠN
   * Đoạn 1: quầy làm thủ tục (ghế, giờ trễ). Đoạn 2: quầy lễ tân (số phòng, Wi-Fi).
   * Đoạn 3: gọi lễ tân báo hỏng điều hoà + hỏi đường ra chợ đêm.
   * ======================================================================== */
  {
    id: 'l2b-g-01-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Nghe: ở sân bay và khách sạn', en: 'Listening: at the airport and the hotel' },
    description: {
      vi: 'Nghe ba đoạn hội thoại khi đi du lịch: làm thủ tục bay, nhận phòng và gọi lễ tân nhờ giúp.',
      en: 'Listen to three travel conversations: checking in for a flight, arriving at a hotel and calling reception.',
    },
    teachingCards: [
      {
        title: { vi: 'Đoán trước khi nghe', en: 'Predict before you listen' },
        body: {
          vi: "Trước khi bấm nghe, đọc nhanh câu hỏi và **đoán loại đáp án**:\n• 'Seat number', 'Room number' → **một con số**\n• 'delayed by ___ minutes' → **số phút**\n• 'Where...?' → **một nơi chốn**\nĐoán trước giúp tai bạn **chờ sẵn** đúng thông tin cần nghe.",
          en: "Before you press play, read the questions and **guess the type of answer**:\n• 'Seat number', 'Room number' → **a number**\n• 'delayed by ___ minutes' → **minutes**\n• 'Where...?' → **a place**\nPredicting helps your ears **wait for** the right information.",
        },
        examples: [{ en: 'Gate number: ___ → listen for a number', vi: 'Số cổng: ___ → chờ nghe một con số' }],
      },
      {
        title: { vi: 'Nghe số phòng, số ghế, giờ', en: 'Room numbers, seats and times' },
        body: {
          vi: "Người Anh hay đọc số phòng **từng chữ số**: **four-one-six** = 416.\nSố ghế: **twenty-three A** = 23A.\nGiờ: **half past six** = 6.30; **ten forty-five** = 10.45.\n'**oh**' thường là số 0: **three-oh-eight** = 308.",
          en: "Room numbers are often said **digit by digit**: **four-one-six** = 416.\nSeats: **twenty-three A** = 23A.\nTimes: **half past six** = 6.30; **ten forty-five** = 10.45.\n'**Oh**' often means zero: **three-oh-eight** = 308.",
        },
        examples: [
          { en: "You're in room two-oh-five.", vi: 'Bạn ở phòng 205.' },
          { en: 'Breakfast starts at half past six.', vi: 'Bữa sáng bắt đầu lúc 6 giờ 30.' },
        ],
      },
      {
        title: { vi: 'Từ báo hiệu tin không vui', en: 'Signal words for bad news' },
        body: {
          vi: "Khi nghe **I'm afraid...**, **Sorry, but...**, **Unfortunately...** → sắp có **tin không vui** (trễ chuyến, hết phòng, đồ bị hỏng).\nĐáp án thường nằm **ngay sau** những từ này, nên hãy tập trung cao nhất ở đó.",
          en: "When you hear **I'm afraid...**, **Sorry, but...** or **Unfortunately...**, **bad news** is coming (a delay, no rooms, something broken).\nThe answer is often **right after** these words, so listen carefully there.",
        },
        examples: [{ en: "I'm afraid the flight is delayed.", vi: 'Rất tiếc là chuyến bay bị trễ.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-01-listen-ex01',
        type: 'multiple-choice',
        question: "A question says 'Room number: ___'. What kind of answer do you need?",
        options: ['A name', 'A number', 'A time', 'A place'],
        correctIndex: 1,
        explanation: {
          vi: "'Room number' → cần một con số. Đoán trước giúp nghe dễ hơn.",
          en: "'Room number' needs a number. Predicting makes listening easier.",
        },
      },
      {
        id: 'l2b-g-01-listen-ex02',
        type: 'listen-choose',
        audioText: 'Your room is three-oh-eight, on the third floor.',
        question: 'What is the room number?',
        options: ['38', '308', '380', '318'],
        correctIndex: 1,
        explanation: {
          vi: "'oh' = số 0, nên three-oh-eight = 308.",
          en: "'Oh' means zero, so three-oh-eight = 308.",
        },
      },
      {
        id: 'l2b-g-01-listen-ex03',
        type: 'listen-choose',
        audioText: "I'm afraid there's no hot water in my room.",
        question: 'What is the problem?',
        options: ['The room is too hot.', 'There is no hot water.', 'The room is too small.', 'There is no water bottle.'],
        correctIndex: 1,
        explanation: {
          vi: "Sau 'I'm afraid' là vấn đề: 'no hot water' = không có nước nóng.",
          en: "After 'I'm afraid' comes the problem: no hot water.",
        },
      },
      {
        id: 'l2b-g-01-listen-ex04',
        type: 'listen-type',
        audioText: 'Boarding starts at half past nine.',
        acceptedAnswers: ['Boarding starts at half past nine.', 'Boarding starts at 9.30.', 'Boarding starts at 9:30.'],
        explanation: {
          vi: 'half past nine = 9 giờ 30. boarding = lên máy bay.',
          en: 'Half past nine = 9.30. Boarding = getting on the plane.',
        },
      },
      {
        id: 'l2b-g-01-listen-ex05',
        type: 'fill-blank',
        sentence: 'Would you like a window seat or an ___ seat?',
        acceptedAnswers: ['aisle'],
        hint: 'the seat next to the walkway',
        explanation: {
          vi: "aisle /aɪl/ = lối đi giữa hai dãy ghế. Chữ 's' câm.",
          en: "Aisle /aɪl/ is the walkway between seats. The 's' is silent.",
        },
      },
      {
        id: 'l2b-g-01-listen-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm từ trong bài nghe với nghĩa của nó.', en: 'Match the phrases with their meanings.' },
        pairs: [
          { left: 'on time', right: 'not late' },
          { left: 'right away', right: 'immediately' },
          { left: "I'm afraid...", right: 'Sorry, there is bad news...' },
          { left: 'Here you are.', right: 'Take this, please.' },
          { left: 'the ground floor', right: 'the floor at street level' },
        ],
        explanation: {
          vi: 'Đây là các cụm hay gặp ở sân bay và khách sạn.',
          en: 'You often hear these phrases at airports and hotels.',
        },
      },
      {
        id: 'l2b-g-01-listen-ex07',
        type: 'listen-choose',
        audioText: 'Take the second street on the left. The pharmacy is next to the bank.',
        question: 'Where is the pharmacy?',
        options: ['Next to the bank', 'Opposite the bank', 'On the first street', 'Behind the bank'],
        correctIndex: 0,
        explanation: {
          vi: "'next to the bank' = bên cạnh ngân hàng.",
          en: "The speaker says 'next to the bank'.",
        },
      },
      {
        id: 'l2b-g-01-listen-ex08',
        type: 'arrange-words',
        translationVi: 'Bạn có thể cử người đến sửa nó được không ạ?',
        correctSentence: 'Could you send someone to fix it, please?',
        extraWords: ['fixing', 'for'],
        explanation: {
          vi: 'send someone to + động từ = cử ai đến làm gì.',
          en: 'send someone to + verb = ask a person to come and do something.',
        },
      },
      {
        id: 'l2b-g-01-listen-ex09',
        type: 'speak-sentence',
        sentence: "I'm sorry, but the air conditioner isn't working.",
        translationVi: 'Xin lỗi, nhưng máy điều hoà không hoạt động.',
        explanation: {
          vi: "Đọc rõ /nt/ trong 'isn't' và nhấn 'WORK-ing'.",
          en: "Say the /nt/ in 'isn't' and stress 'WORK-ing'.",
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–8. Listen to three conversations. Write ONE WORD AND/OR A NUMBER, or choose the correct answer.',
      strategyTip: {
        vi: "Đọc hết 8 câu hỏi trước khi nghe. Mỗi đoạn có thể nghe lại riêng bằng nút 'Nghe lại đoạn này'.",
        en: 'Read all eight questions before you listen. You can replay each conversation on its own.',
      },
      segments: [
        {
          id: 'l2b-g-01-listen-s1',
          lines: [
            { speaker: 'Staff', voice: 'gb-female', text: 'Good morning. Where are you flying to today?' },
            { speaker: 'Minh', voice: 'gb-male', text: 'Good morning. To London, please.' },
            { speaker: 'Staff', voice: 'gb-female', text: 'Can I see your passport, please?' },
            { speaker: 'Minh', voice: 'gb-male', text: 'Yes, here you are.' },
            { speaker: 'Staff', voice: 'gb-female', text: 'Thank you. How many bags are you checking in?' },
            { speaker: 'Minh', voice: 'gb-male', text: 'Just one. This small bag is coming with me on the plane.' },
            { speaker: 'Staff', voice: 'gb-female', text: "That's fine. Would you like a window seat or an aisle seat?" },
            { speaker: 'Minh', voice: 'gb-male', text: "A window seat, please. I'd love to see the view when we land." },
            { speaker: 'Staff', voice: 'gb-female', text: "No problem. You're in seat twenty-three A. Here's your boarding pass." },
            { speaker: 'Minh', voice: 'gb-male', text: 'Thanks. Is the flight on time?' },
            {
              speaker: 'Staff',
              voice: 'gb-female',
              text: "I'm afraid it's delayed by about thirty minutes. Boarding now starts at ten forty-five, from gate eight.",
            },
            { speaker: 'Minh', voice: 'gb-male', text: 'Gate eight. OK, thank you very much.' },
          ],
        },
        {
          id: 'l2b-g-01-listen-s2',
          lines: [
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: 'Good afternoon, and welcome to the River View Hotel. How can I help you?',
            },
            { speaker: 'Minh', voice: 'gb-male', text: "Hi. I have a reservation. My name's Minh Tran." },
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: "Let me check. Yes, Mr Tran, a single room for three nights. You're in room four-one-six, on the fourth floor.",
            },
            { speaker: 'Minh', voice: 'gb-male', text: 'Great. What time is breakfast?' },
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: "It's from half past six to ten, in the restaurant on the ground floor.",
            },
            { speaker: 'Minh', voice: 'gb-male', text: 'And is there Wi-Fi in the room?' },
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: "Yes, it's free. The password is on the back of your key card.",
            },
            { speaker: 'Minh', voice: 'gb-male', text: 'Perfect. Thank you.' },
          ],
        },
        {
          id: 'l2b-g-01-listen-s3',
          lines: [
            { speaker: 'Receptionist', voice: 'gb-female', text: 'Reception, Anna speaking. How can I help?' },
            {
              speaker: 'Minh',
              voice: 'gb-male',
              text: "Hello, this is Minh Tran in room four-one-six. I'm sorry, but the air conditioner isn't working, and it's really hot in here.",
            },
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: "Oh, I'm so sorry about that. I'll send someone to fix it right away. It usually takes about fifteen minutes.",
            },
            { speaker: 'Minh', voice: 'gb-male', text: "Thank you. And if it still doesn't work?" },
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: "Then we'll move you to another room. Is there anything else?",
            },
            { speaker: 'Minh', voice: 'gb-male', text: 'Yes, actually. Could you tell me how to get to the night market?' },
            {
              speaker: 'Receptionist',
              voice: 'gb-female',
              text: "Of course. Turn right when you leave the hotel and go straight on for about five minutes. The market is opposite the big post office. You can't miss it.",
            },
            { speaker: 'Minh', voice: 'gb-male', text: 'Opposite the post office. Thanks a lot!' },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l2b-g-01-listen-q1',
          segmentId: 'l2b-g-01-listen-s1',
          number: 1,
          prompt: "Minh's seat number: ___",
          acceptedAnswers: ['23A', '23 A', 'twenty-three A', 'twenty three A'],
          explanation: {
            vi: "Nhân viên nói 'seat twenty-three A' → ghế 23A.",
            en: "The staff member says 'seat twenty-three A'.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-01-listen-q2',
          segmentId: 'l2b-g-01-listen-s1',
          number: 2,
          prompt: 'Why does Minh want a window seat?',
          options: ['He wants to sleep.', 'He wants to see the view.', 'His bag is small.', 'It is near the gate.'],
          correctIndex: 1,
          explanation: {
            vi: "Minh nói: 'I'd love to see the view when we land.'",
            en: "Minh says: 'I'd love to see the view when we land.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-01-listen-q3',
          segmentId: 'l2b-g-01-listen-s1',
          number: 3,
          prompt: 'The flight is delayed by about ___ minutes.',
          acceptedAnswers: ['30', 'thirty'],
          explanation: {
            vi: "Ngay sau 'I'm afraid' là tin xấu: trễ khoảng 30 phút.",
            en: "Right after 'I'm afraid' comes the bad news: about thirty minutes.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-01-listen-q4',
          segmentId: 'l2b-g-01-listen-s2',
          number: 4,
          prompt: 'Room number: ___',
          acceptedAnswers: ['416', 'four-one-six', 'four one six', 'four hundred and sixteen'],
          explanation: {
            vi: "'four-one-six' đọc từng chữ số → phòng 416.",
            en: "'Four-one-six' is said digit by digit: 416.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-01-listen-q5',
          segmentId: 'l2b-g-01-listen-s2',
          number: 5,
          prompt: 'Where can Minh find the Wi-Fi password?',
          options: ['At reception', 'On his key card', 'In the restaurant', 'On the fourth floor'],
          correctIndex: 1,
          explanation: {
            vi: "Lễ tân nói: 'The password is on the back of your key card.'",
            en: "'The password is on the back of your key card.'",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-01-listen-q6',
          segmentId: 'l2b-g-01-listen-s3',
          number: 6,
          prompt: "What is the problem in Minh's room?",
          options: [
            'It is too noisy.',
            'The Wi-Fi is not working.',
            'The air conditioner is not working.',
            'There is no hot water.',
          ],
          correctIndex: 2,
          explanation: {
            vi: "Sau 'I'm sorry, but' là vấn đề: điều hoà không chạy.",
            en: "After 'I'm sorry, but' comes the problem: the air conditioner.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-01-listen-q7',
          segmentId: 'l2b-g-01-listen-s3',
          number: 7,
          prompt: 'Fixing the air conditioner usually takes about ___ minutes.',
          acceptedAnswers: ['15', 'fifteen'],
          explanation: {
            vi: "'It usually takes about fifteen minutes' → khoảng 15 phút.",
            en: "'It usually takes about fifteen minutes.'",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-01-listen-q8',
          segmentId: 'l2b-g-01-listen-s3',
          number: 8,
          prompt: 'Where is the night market?',
          options: ['Next to the hotel', 'Opposite the post office', 'Behind the post office', 'On the left of the hotel'],
          correctIndex: 1,
          explanation: {
            vi: "Lễ tân nói: 'The market is opposite the big post office.'",
            en: "'The market is opposite the big post office.'",
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — NGHE: NGÀY ĐẦU ĐI LÀM, CUỘC GỌI, LỊCH HỌP
   * Đoạn 1: trưởng phòng giới thiệu văn phòng. Đoạn 2: ghi lời nhắn qua điện thoại.
   * Đoạn 3: thông báo đổi ngày, đổi phòng họp (bẫy "đổi thông tin").
   * ======================================================================== */
  {
    id: 'l2b-g-02-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Nghe: ngày đầu đi làm, cuộc gọi và lịch họp', en: 'Listening: a first day, a phone call and a meeting' },
    description: {
      vi: 'Nghe giới thiệu ở văn phòng mới, một cuộc gọi để lại lời nhắn và thông báo đổi lịch họp.',
      en: 'Listen to a first day at a new office, a phone message and a change to a meeting.',
    },
    teachingCards: [
      {
        title: { vi: 'Nghe lời giới thiệu ở chỗ làm', en: 'Listening to introductions at work' },
        body: {
          vi: "Khi giới thiệu một người ở chỗ làm, người ta thường nói 3 thông tin: **tên** (This is...), **phòng ban** (She works in...), **việc làm** (She's responsible for... / She looks after...).\nTrước khi nghe, hãy chuẩn bị **chờ đúng 3 thông tin** này.",
          en: "When people introduce someone at work, they usually give three things: a **name** (This is...), a **department** (She works in...) and a **job** (She's responsible for... / She looks after...).\nBefore you listen, get ready for **these three things**.",
        },
        examples: [
          {
            en: 'This is Lan. She works in sales and looks after our big customers.',
            vi: 'Đây là Lan. Cô ấy làm ở phòng kinh doanh và phụ trách các khách hàng lớn.',
          },
        ],
      },
      {
        title: { vi: 'Ghi lời nhắn qua điện thoại', en: 'Taking a phone message' },
        body: {
          vi: "Câu quen thuộc: **Could I speak to...?** (cho tôi gặp...), **I'm afraid she's not available.** (cô ấy không nghe máy được), **Can I take a message?** (tôi ghi lời nhắn nhé?), **I'll ask her to call you back.**\nGhi nhanh 4 ý: **ai gọi – số điện thoại – việc gì – khi nào gọi lại**.",
          en: "Useful phrases: **Could I speak to...?**, **I'm afraid she's not available.**, **Can I take a message?**, **I'll ask her to call you back.**\nWrite down 4 things: **who called – phone number – what about – when to call back**.",
        },
        examples: [{ en: 'Can I take a message?', vi: 'Tôi ghi lời nhắn giúp bạn nhé?' }],
      },
      {
        title: { vi: 'Bẫy đổi thông tin', en: 'Watch out for changes' },
        body: {
          vi: "Người nói hay **đổi thông tin giữa chừng**: 'The meeting is usually on Monday, **but this week** it's on Wednesday **instead**.'\nNghe kỹ sau: **actually**, **no, sorry**, **instead**, **we've moved it to**. Đáp án là thông tin **sau cùng**.",
          en: "Speakers often **change information**: 'The meeting is usually on Monday, **but this week** it's on Wednesday **instead**.'\nListen after **actually**, **no, sorry**, **instead**, **we've moved it to**. The answer is the **final** information.",
        },
        examples: [{ en: "We've moved the meeting from room two to room five.", vi: 'Chúng tôi đã chuyển cuộc họp từ phòng 2 sang phòng 5.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-02-listen-ex01',
        type: 'listen-choose',
        audioText: 'This is Hai. He works in the IT department, and he looks after our computers.',
        question: 'What does Hai do?',
        options: ['He sells computers.', "He looks after the company's computers.", 'He works in sales.', 'He is the manager.'],
        correctIndex: 1,
        explanation: {
          vi: "'looks after our computers' = phụ trách, chăm lo máy tính của công ty.",
          en: "'Looks after our computers' = takes care of the company's computers.",
        },
      },
      {
        id: 'l2b-g-02-listen-ex02',
        type: 'listen-choose',
        audioText: "The meeting was on Tuesday, but we've moved it to Thursday.",
        question: 'When is the meeting now?',
        options: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        correctIndex: 2,
        explanation: {
          vi: "'moved it to Thursday' → thông tin sau cùng là thứ Năm.",
          en: "'Moved it to Thursday' — the final information is Thursday.",
        },
      },
      {
        id: 'l2b-g-02-listen-ex03',
        type: 'multiple-choice',
        question: 'A caller asks for your manager, but she is in a meeting. What do you say?',
        options: [
          "She isn't here. Bye.",
          "I'm afraid she's not available. Can I take a message?",
          'Call later, please.',
          'Who are you?',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Báo tin lịch sự (I\'m afraid...) rồi đề nghị ghi lời nhắn.',
          en: "Give the news politely (I'm afraid...) and offer to take a message.",
        },
      },
      {
        id: 'l2b-g-02-listen-ex04',
        type: 'fill-blank',
        sentence: 'Hello. Could I ___ to Ms Hoa, please?',
        acceptedAnswers: ['speak', 'talk'],
        hint: 'on the phone',
        explanation: {
          vi: 'Could I speak to...? = Cho tôi gặp/nói chuyện với... (qua điện thoại).',
          en: 'Could I speak to...? is how we ask for someone on the phone.',
        },
      },
      {
        id: 'l2b-g-02-listen-ex05',
        type: 'listen-type',
        audioText: "I'll ask her to call you back after lunch.",
        acceptedAnswers: ["I'll ask her to call you back after lunch.", 'I will ask her to call you back after lunch.'],
        explanation: {
          vi: "Chú ý 'call you back' — đại từ đứng giữa.",
          en: "Notice 'call you back' — the pronoun is in the middle.",
        },
      },
      {
        id: 'l2b-g-02-listen-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu nói qua điện thoại với câu đáp phù hợp.', en: 'Match each phone sentence with a reply.' },
        pairs: [
          { left: 'Could I speak to Mr Nam?', right: 'Just a moment, please.' },
          { left: 'Can I take a message?', right: 'Yes, please. Tell him Lan called.' },
          { left: "What's your phone number?", right: "It's 0912 345 678." },
          { left: 'Can you spell your name?', right: "Sure. It's H-O-A." },
          { left: 'Thanks for calling.', right: "You're welcome. Goodbye." },
        ],
        explanation: {
          vi: 'Đây là những cặp câu rất hay gặp khi nghe điện thoại.',
          en: 'These pairs are very common in phone calls.',
        },
      },
      {
        id: 'l2b-g-02-listen-ex07',
        type: 'listen-choose',
        audioText: "The meeting is in room two. No, sorry, it's in room five.",
        question: 'Which room is the meeting in?',
        options: ['Room 2', 'Room 5', 'Room 25', 'Room 7'],
        correctIndex: 1,
        explanation: {
          vi: "'No, sorry' báo hiệu sửa lại → thông tin đúng là phòng 5.",
          en: "'No, sorry' shows a correction, so the answer is room 5.",
        },
      },
      {
        id: 'l2b-g-02-listen-ex08',
        type: 'arrange-words',
        translationVi: 'Tôi có thể ghi lời nhắn cho cô ấy không?',
        correctSentence: 'Can I take a message for her?',
        extraWords: ['make', 'to'],
        explanation: {
          vi: "Nói 'take a message' (ghi lời nhắn), không nói 'make a message'.",
          en: "We say 'take a message', not 'make a message'.",
        },
      },
      {
        id: 'l2b-g-02-listen-ex09',
        type: 'speak-sentence',
        sentence: 'Hello, could I speak to Mr Nam, please?',
        translationVi: 'Xin chào, cho tôi gặp anh Nam được không ạ?',
        explanation: {
          vi: "Nối âm 'could I' và lên giọng nhẹ ở cuối câu.",
          en: "Link 'could I' and let your voice rise a little at the end.",
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–9. Listen to three recordings from an office. Write ONE WORD AND/OR A NUMBER, or choose the correct answer.',
      strategyTip: {
        vi: 'Đoạn 3 có nhiều thông tin bị đổi (ngày, phòng). Hãy ghi thông tin SAU CÙNG.',
        en: 'Recording 3 has several changes (day, room). Write the FINAL information.',
      },
      segments: [
        {
          id: 'l2b-g-02-listen-s1',
          lines: [
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: "Good morning, Duc, and welcome to Blue Sky Travel. I'm Mai, the manager of the marketing department.",
            },
            { speaker: 'Duc', voice: 'gb-male', text: "Nice to meet you, Mai. I'm really happy to be here." },
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: "Let me show you around. There are eight people in our team. That's Peter, by the window. He looks after our website, so if you have any computer problems, ask him.",
            },
            { speaker: 'Duc', voice: 'gb-male', text: 'Peter, the website. Got it.' },
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: "And this is your desk, next to Lily. She writes our emails to customers. She's been here for five years, so she knows everything!",
            },
            { speaker: 'Duc', voice: 'gb-male', text: 'Great. What time do people usually have lunch?' },
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: "Most of us go at half past twelve. There's a nice canteen on the second floor. Oh, and every Monday at nine, we have a short team meeting.",
            },
            { speaker: 'Duc', voice: 'gb-male', text: "Nine o'clock on Mondays. OK." },
          ],
        },
        {
          id: 'l2b-g-02-listen-s2',
          lines: [
            { speaker: 'Duc', voice: 'gb-male', text: 'Good afternoon, Blue Sky Travel, Duc speaking.' },
            { speaker: 'Sarah', voice: 'gb-female', text: 'Hello. Could I speak to Mai, please?' },
            {
              speaker: 'Duc',
              voice: 'gb-male',
              text: "I'm afraid she's not available at the moment. She's in a meeting. Can I take a message?",
            },
            { speaker: 'Sarah', voice: 'gb-female', text: "Yes, please. My name's Sarah Green, from Sunrise Hotels." },
            { speaker: 'Duc', voice: 'gb-male', text: 'Sorry, could you spell your surname, please?' },
            { speaker: 'Sarah', voice: 'gb-female', text: "Sure. It's G, R, E, E, N." },
            { speaker: 'Duc', voice: 'gb-male', text: "Thank you. And what's your phone number?" },
            { speaker: 'Sarah', voice: 'gb-female', text: "It's oh-nine-eight-four, two-two-six, five-one-seven." },
            {
              speaker: 'Duc',
              voice: 'gb-male',
              text: 'Oh-nine-eight-four, two-two-six, five-one-seven. And what is it about?',
            },
            {
              speaker: 'Sarah',
              voice: 'gb-female',
              text: "It's about our summer prices. I've already sent her an email, but I'd like to talk about it today, please.",
            },
            {
              speaker: 'Duc',
              voice: 'gb-male',
              text: "No problem. She'll be free after four. I'll ask her to call you back.",
            },
            { speaker: 'Sarah', voice: 'gb-female', text: 'Lovely. Thanks very much.' },
          ],
        },
        {
          id: 'l2b-g-02-listen-s3',
          lines: [
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: "Hi everyone, a quick message about this week. Our team meeting is usually on Monday morning, but this week it's on Wednesday instead, because I'm visiting a customer on Monday. It starts at half past two.",
            },
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: "And please note, it isn't in room three as usual. We've moved it to room seven, on the fifth floor, because it's bigger. Please bring your ideas for the summer advertising campaign.",
            },
            {
              speaker: 'Mai',
              voice: 'gb-female',
              text: 'Oh, and one more thing. The deadline for the new brochure is Friday, so please send me your part by Thursday evening. Thanks!',
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-listen-q1',
          segmentId: 'l2b-g-02-listen-s1',
          number: 1,
          prompt: 'Mai is the manager of the ___ department.',
          acceptedAnswers: ['marketing'],
          explanation: {
            vi: "Mai nói: 'the manager of the marketing department'.",
            en: "Mai says she is 'the manager of the marketing department'.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-listen-q2',
          segmentId: 'l2b-g-02-listen-s1',
          number: 2,
          prompt: 'Who should Duc ask about computer problems?',
          options: ['Mai', 'Peter', 'Lily', 'Sarah'],
          correctIndex: 1,
          explanation: {
            vi: "Peter 'looks after our website' → có vấn đề máy tính thì hỏi Peter.",
            en: 'Peter looks after the website, so Duc should ask him.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-listen-q3',
          segmentId: 'l2b-g-02-listen-s1',
          number: 3,
          prompt: 'Lily has worked there for ___ years.',
          acceptedAnswers: ['5', 'five'],
          explanation: {
            vi: "'She's been here for five years' = đã làm ở đây 5 năm.",
            en: "'She's been here for five years.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-listen-q4',
          segmentId: 'l2b-g-02-listen-s2',
          number: 4,
          prompt: "Caller's surname: ___",
          acceptedAnswers: ['Green'],
          explanation: {
            vi: "Người gọi đánh vần: G, R, E, E, N → Green.",
            en: 'The caller spells it: G, R, E, E, N.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-listen-q5',
          segmentId: 'l2b-g-02-listen-s2',
          number: 5,
          prompt: 'Phone number: 0984 226 ___',
          acceptedAnswers: ['517', 'five-one-seven', 'five one seven'],
          explanation: {
            vi: "'five-one-seven' → 517. Duc còn nhắc lại số một lần nữa.",
            en: "'Five-one-seven' = 517. Duc repeats the number too.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-listen-q6',
          segmentId: 'l2b-g-02-listen-s2',
          number: 6,
          prompt: 'What does Sarah want to talk about?',
          options: ['A new hotel', 'Summer prices', 'A meeting room', 'A problem with her email'],
          correctIndex: 1,
          explanation: {
            vi: "'It's about our summer prices.' Email chỉ là chi tiết gây nhiễu.",
            en: "'It's about our summer prices.' The email is only a distractor.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-listen-q7',
          segmentId: 'l2b-g-02-listen-s3',
          number: 7,
          prompt: 'When is the team meeting this week?',
          options: ['Monday morning', 'Wednesday at 2.30', 'Thursday evening', 'Friday at 2.30'],
          correctIndex: 1,
          explanation: {
            vi: "'this week it's on Wednesday instead ... at half past two'.",
            en: "'This week it's on Wednesday instead', at half past two.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-listen-q8',
          segmentId: 'l2b-g-02-listen-s3',
          number: 8,
          prompt: 'Meeting room: room ___',
          acceptedAnswers: ['7', 'seven'],
          explanation: {
            vi: "Không phải phòng 3: 'We've moved it to room seven'.",
            en: "Not room three: 'We've moved it to room seven.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-listen-q9',
          segmentId: 'l2b-g-02-listen-s3',
          number: 9,
          prompt: 'Send your part of the brochure by Thursday ___.',
          acceptedAnswers: ['evening'],
          explanation: {
            vi: "Hạn chót là thứ Sáu, nhưng phải gửi 'by Thursday evening'.",
            en: "The deadline is Friday, but send it 'by Thursday evening'.",
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — NGHE: BÀI TẬP, THỜI KHOÁ BIỂU, DỰ ÁN NHÓM
   * Ngữ pháp lồng ghép (chương trình phổ thông): hiện tại hoàn thành, must / mustn't / should,
   * will (nhận việc), so sánh hơn – nhất.
   * ======================================================================== */
  {
    id: 'l2b-g-03-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Nghe: bài tập, thời khoá biểu và dự án nhóm', en: 'Listening: homework, timetables and a group project' },
    description: {
      vi: 'Nghe bạn bè hỏi nhau về bài tập, cô giáo giao dự án và cả nhóm phân công việc.',
      en: 'Listen to friends talking about homework, a teacher setting a project and a group sharing out the work.',
    },
    teachingCards: [
      {
        title: { vi: 'Hiện tại hoàn thành trong hội thoại', en: 'The present perfect in conversations' },
        body: {
          vi: "Bạn bè hay hỏi: **Have you done the homework yet?** – **Yes, I've already finished it.** / **No, I haven't started yet.**\nKhi nghe, chú ý **have / haven't**: chỉ một âm nhỏ nhưng đổi hẳn nghĩa! 'I've done it' (làm rồi) ≠ 'I haven't done it' (chưa làm).",
          en: "Friends often ask: **Have you done the homework yet?** – **Yes, I've already finished it.** / **No, I haven't started yet.**\nListen carefully for **have / haven't**. It's a small sound, but it changes the meaning!",
        },
        examples: [{ en: "I haven't finished the essay yet.", vi: 'Mình chưa viết xong bài luận.' }],
      },
      {
        title: { vi: 'will và be going to', en: 'will and be going to' },
        body: {
          vi: "**be going to** = kế hoạch **đã quyết từ trước**: You're going to do a group project this term.\n**will** = quyết định **ngay lúc nói**, lời hứa, lời đề nghị: 'Who can make the poster?' – '**I'll** do it!'\nKhi nghe nhóm phân công, câu **I'll...** cho biết **ai nhận việc gì**.",
          en: "**be going to** = a plan **made before**: You're going to do a group project this term.\n**will** = a decision **while speaking**, a promise or an offer: 'Who can make the poster?' – '**I'll** do it!'\nIn a group, **I'll...** tells you **who does what**.",
        },
        examples: [{ en: "OK, I'll find the photos.", vi: 'Được rồi, mình sẽ tìm ảnh.' }],
      },
      {
        title: { vi: 'must, mustn\'t và should', en: "must, mustn't and should" },
        body: {
          vi: "**must** = bắt buộc (quy định): You **must** hand it in by Friday.\n**mustn't** = bị cấm: You **mustn't** copy from the internet.\n**should** = lời khuyên: You **should** start early.\nChú ý: 'mustn't' đọc /ˈmʌs.ənt/ — chữ 't' đầu tiên câm.",
          en: "**must** = a rule: You **must** hand it in by Friday.\n**mustn't** = not allowed: You **mustn't** copy from the internet.\n**should** = advice: You **should** start early.\nNote: 'mustn't' sounds like /ˈmʌs.ənt/ — the first 't' is silent.",
        },
        examples: [{ en: "You mustn't use your phone in the exam.", vi: 'Các em không được dùng điện thoại trong giờ thi.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-03-listen-ex01',
        type: 'listen-choose',
        audioText: "I haven't finished the maths homework yet.",
        question: 'Has the speaker finished the maths homework?',
        options: ['Yes, already.', 'No, not yet.', 'Yes, just now.', 'There is no maths homework.'],
        correctIndex: 1,
        explanation: {
          vi: "'haven't finished ... yet' = chưa làm xong.",
          en: "'Haven't finished ... yet' means it isn't finished.",
        },
      },
      {
        id: 'l2b-g-03-listen-ex02',
        type: 'listen-choose',
        audioText: 'We have chemistry on Tuesday this week, not on Thursday.',
        question: 'When do they have chemistry this week?',
        options: ['Tuesday', 'Thursday', 'Tuesday and Thursday', 'Every day'],
        correctIndex: 0,
        explanation: {
          vi: "'on Tuesday ..., not on Thursday' → chỉ thứ Ba.",
          en: "'On Tuesday, not on Thursday' — only Tuesday.",
        },
      },
      {
        id: 'l2b-g-03-listen-ex03',
        type: 'multiple-choice',
        question: "'Who can bring a camera?' – 'I ___ bring mine!' (You decide now.)",
        options: ['will', 'am going to', 'must', 'have'],
        correctIndex: 0,
        explanation: {
          vi: "Quyết định ngay lúc nói → dùng will: I'll bring mine.",
          en: "A decision made while speaking uses will: I'll bring mine.",
        },
      },
      {
        id: 'l2b-g-03-listen-ex04',
        type: 'fill-blank',
        sentence: "You ___ copy from the internet. It's against the rules.",
        acceptedAnswers: ["mustn't", 'must not'],
        hint: 'not allowed',
        explanation: {
          vi: "mustn't = không được phép (bị cấm).",
          en: "Mustn't means it is not allowed.",
        },
      },
      {
        id: 'l2b-g-03-listen-ex05',
        type: 'listen-type',
        audioText: 'You must hand in your project by next Friday.',
        acceptedAnswers: ['You must hand in your project by next Friday.'],
        explanation: {
          vi: 'must = bắt buộc; by next Friday = trước hoặc trong thứ Sáu tới.',
          en: "'Must' is a rule; 'by next Friday' means not later than then.",
        },
      },
      {
        id: 'l2b-g-03-listen-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi câu với ý nghĩa của nó.', en: 'Match each sentence with its meaning.' },
        pairs: [
          { left: 'You must wear a uniform.', right: "It's a rule." },
          { left: 'You should sleep early.', right: "It's advice." },
          { left: "You mustn't run in the hall.", right: "It's not allowed." },
          { left: "I'll help you.", right: "It's an offer." },
          { left: "We're going to visit a museum.", right: "It's a plan." },
        ],
        explanation: {
          vi: 'Mỗi động từ khuyết thiếu / thì tương lai mang một ý riêng.',
          en: 'Each verb form has its own meaning.',
        },
      },
      {
        id: 'l2b-g-03-listen-ex07',
        type: 'multiple-choice',
        question: 'Which sentence means the work is finished?',
        options: ["I haven't done it yet.", "I've already done it.", "I'm going to do it.", 'I should do it.'],
        correctIndex: 1,
        explanation: {
          vi: "'I've already done it' = mình đã làm xong rồi.",
          en: "'I've already done it' means it is finished.",
        },
      },
      {
        id: 'l2b-g-03-listen-ex08',
        type: 'arrange-words',
        translationVi: 'Bạn đã bắt đầu làm dự án lịch sử chưa?',
        correctSentence: 'Have you started the history project yet?',
        extraWords: ['already', 'did'],
        explanation: {
          vi: "Câu hỏi 'đã... chưa?' → Have you + V3 ... yet?",
          en: 'Ask about progress with: Have you + past participle ... yet?',
        },
      },
      {
        id: 'l2b-g-03-listen-ex09',
        type: 'speak-sentence',
        sentence: "I haven't started my project yet.",
        translationVi: 'Mình chưa bắt đầu làm dự án.',
        explanation: {
          vi: "Đọc rõ /nt/ trong 'haven't' và /ɪd/ trong 'started'.",
          en: "Say /nt/ in 'haven't' and /ɪd/ in 'started' clearly.",
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–9. Listen to three recordings at a secondary school. Write ONE WORD AND/OR A NUMBER, or choose the correct answer.',
      strategyTip: {
        vi: 'Đoạn 3 có bẫy giờ: thư viện mở cửa lúc 9 giờ, nhưng nhóm hẹn giờ khác. Nghe đến hết câu!',
        en: 'Recording 3 has a time trap: the library opens at nine, but the group meets at a different time.',
      },
      segments: [
        {
          id: 'l2b-g-03-listen-s1',
          lines: [
            { speaker: 'Linh', voice: 'gb-female', text: 'Hi Bao. Have you done the English homework yet?' },
            { speaker: 'Bao', voice: 'gb-male', text: 'Yes, I finished it last night. It was quite easy. What about you?' },
            { speaker: 'Linh', voice: 'gb-female', text: "I've done the reading part, but I haven't written the paragraph yet." },
            { speaker: 'Bao', voice: 'gb-male', text: "You should do it at break. We've got English after lunch today." },
            { speaker: 'Linh', voice: 'gb-female', text: 'After lunch? I thought it was the first lesson.' },
            {
              speaker: 'Bao',
              voice: 'gb-male',
              text: "No, the timetable has changed. Today we've got maths first, then biology, and English is after lunch.",
            },
            { speaker: 'Linh', voice: 'gb-female', text: "Oh, good! Then I've got time. Thanks, Bao." },
          ],
        },
        {
          id: 'l2b-g-03-listen-s2',
          lines: [
            {
              speaker: 'Ms Hoa',
              voice: 'gb-female',
              text: "OK, class, listen carefully, please. This term, you're going to do a group project for geography. Each group will have four students. Your topic is 'Water in our city'. You can write about rivers, rain, or how families save water at home.",
            },
            {
              speaker: 'Ms Hoa',
              voice: 'gb-female',
              text: 'You must make a poster and give a five-minute presentation. The deadline for the poster is Friday the twentieth of November.',
            },
            {
              speaker: 'Ms Hoa',
              voice: 'gb-female',
              text: "And remember, you mustn't copy information from the internet. You should use your own words, and take your own photos if you can. The best group will show their poster at the school open day.",
            },
          ],
        },
        {
          id: 'l2b-g-03-listen-s3',
          lines: [
            { speaker: 'Bao', voice: 'gb-male', text: "OK, so our topic is how families save water. Who's going to do what?" },
            { speaker: 'Linh', voice: 'gb-female', text: "I'll make the poster. I'm better at drawing than you!" },
            {
              speaker: 'Bao',
              voice: 'gb-male',
              text: "That's true! Then I'll write the questions for a short survey. We can ask our classmates how they save water at home.",
            },
            {
              speaker: 'Linh',
              voice: 'gb-female',
              text: 'Good idea. Minh has a good camera, so he can take the photos. And Thao is the best speaker in our group, so she should start the presentation.',
            },
            { speaker: 'Bao', voice: 'gb-male', text: 'Perfect. When shall we meet?' },
            {
              speaker: 'Linh',
              voice: 'gb-female',
              text: "How about Saturday morning at the library? It's quieter than the café.",
            },
            {
              speaker: 'Bao',
              voice: 'gb-male',
              text: "Saturday's fine, but the library opens at nine. Let's meet at half past nine.",
            },
            { speaker: 'Linh', voice: 'gb-female', text: 'OK, half past nine on Saturday. See you there!' },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l2b-g-03-listen-q1',
          segmentId: 'l2b-g-03-listen-s1',
          number: 1,
          prompt: 'What has Linh NOT finished yet?',
          options: ['The reading part', 'The paragraph', 'The maths homework', 'The biology project'],
          correctIndex: 1,
          explanation: {
            vi: "Linh: 'I've done the reading part, but I haven't written the paragraph yet.'",
            en: "Linh has done the reading but hasn't written the paragraph yet.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-03-listen-q2',
          segmentId: 'l2b-g-03-listen-s1',
          number: 2,
          prompt: 'When is the English lesson today?',
          options: ['It is the first lesson.', 'It is at break time.', 'It is after lunch.', 'It is tomorrow.'],
          correctIndex: 2,
          explanation: {
            vi: "Thời khoá biểu đã đổi: 'English is after lunch'.",
            en: "The timetable has changed: 'English is after lunch.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-listen-q3',
          segmentId: 'l2b-g-03-listen-s2',
          number: 3,
          prompt: 'Number of students in each group: ___',
          acceptedAnswers: ['4', 'four'],
          explanation: {
            vi: "'Each group will have four students.'",
            en: "'Each group will have four students.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-listen-q4',
          segmentId: 'l2b-g-03-listen-s2',
          number: 4,
          prompt: "Project topic: 'Water in our ___'",
          acceptedAnswers: ['city'],
          explanation: {
            vi: "Cô giáo nói: 'Your topic is Water in our city.'",
            en: "'Your topic is Water in our city.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-listen-q5',
          segmentId: 'l2b-g-03-listen-s2',
          number: 5,
          prompt: 'Poster deadline: Friday ___ November',
          acceptedAnswers: ['20', '20th', 'twentieth', 'the twentieth'],
          explanation: {
            vi: "'Friday the twentieth of November' → ngày 20 tháng 11.",
            en: "'Friday the twentieth of November' = 20th November.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-03-listen-q6',
          segmentId: 'l2b-g-03-listen-s2',
          number: 6,
          prompt: 'What must the students NOT do?',
          options: ['Take their own photos', 'Copy information from the internet', 'Write about rain', 'Work in groups'],
          correctIndex: 1,
          explanation: {
            vi: "'You mustn't copy information from the internet' = cấm chép từ mạng.",
            en: "'You mustn't copy information from the internet.'",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-03-listen-q7',
          segmentId: 'l2b-g-03-listen-s3',
          number: 7,
          prompt: 'What will Bao do for the project?',
          options: ['Make the poster', 'Write questions for a survey', 'Take the photos', 'Start the presentation'],
          correctIndex: 1,
          explanation: {
            vi: "Bao nhận việc bằng 'I'll': 'I'll write the questions for a short survey.'",
            en: "Bao offers with 'I'll': he will write the survey questions.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-03-listen-q8',
          segmentId: 'l2b-g-03-listen-s3',
          number: 8,
          prompt: 'Why should Thao start the presentation?',
          options: ['She has a good camera.', 'She is good at drawing.', 'She is the best speaker in the group.', 'She wrote the survey.'],
          correctIndex: 2,
          explanation: {
            vi: "'Thao is the best speaker in our group' (so sánh nhất).",
            en: "'Thao is the best speaker in our group.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-listen-q9',
          segmentId: 'l2b-g-03-listen-s3',
          number: 9,
          prompt: 'The group will meet at the library at ___ on Saturday.',
          acceptedAnswers: ['9.30', '9:30', 'half past nine', 'nine thirty', '9.30 am', '9:30 am'],
          explanation: {
            vi: 'Thư viện mở lúc 9 giờ, nhưng cả nhóm hẹn 9 giờ 30 — bẫy!',
            en: 'The library opens at nine, but they meet at half past nine.',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — NGHE: CHỌN PHIM, NÓI VỀ ÂM NHẠC, ĐIỂM PHIM
   * Đoạn 1: hai bạn chọn phim (giờ chiếu, giá vé nửa giá). Đoạn 2: giới thiệu ban nhạc.
   * Đoạn 3: điểm phim trên radio (paraphrase: "not much happens" = chậm).
   * Tên phim, ban nhạc, bài hát đều là tên tự đặt.
   * ======================================================================== */
  {
    id: 'l2b-g-04-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Nghe: chọn phim và nói về âm nhạc', en: 'Listening: choosing a film and talking about music' },
    description: {
      vi: 'Nghe hai bạn chọn phim, một bạn giới thiệu ban nhạc yêu thích và một bài điểm phim ngắn trên radio.',
      en: 'Listen to friends choosing a film, a friend recommending a band and a short film review on the radio.',
    },
    teachingCards: [
      {
        title: { vi: 'Nghe ý kiến: thích hay không?', en: 'Opinions: like or dislike?' },
        body: {
          vi: "Người Anh hay nói ý kiến **nhẹ nhàng**, ít khi nói thẳng 'I don't like it':\n**It's not really my thing.** = mình không thích lắm\n**I'm not a big fan of...** = mình không mê... lắm\n**It wasn't bad.** = cũng khá được\n**I couldn't stop watching!** = hay đến mức không dừng được",
          en: "People often give opinions **softly**:\n**It's not really my thing.** = I don't really like it\n**I'm not a big fan of...** = I don't like it much\n**It wasn't bad.** = it was quite good\n**I couldn't stop watching!** = it was really good",
        },
        examples: [{ en: "Horror films aren't really my thing.", vi: 'Phim kinh dị không hợp với mình lắm.' }],
      },
      {
        title: { vi: 'Từ đối lập: but, however', en: 'Contrast words: but, however' },
        body: {
          vi: "Sau **but** / **although** / **however** thường là ý **ngược lại** — và hay chứa đáp án:\n'The story is a bit slow, **but** the music is amazing.' → Người nói **thích nhạc**, chê cốt truyện.\nĐừng chọn đáp án khi mới nghe **nửa đầu** câu!",
          en: "After **but** / **although** / **however**, the idea often **changes** — and that's often the answer:\n'The story is a bit slow, **but** the music is amazing.' → The speaker **likes the music**.\nDon't choose an answer after only **half** a sentence!",
        },
        examples: [{ en: "It's quite long, but I loved every minute.", vi: 'Phim hơi dài nhưng mình thích từng phút.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-04-listen-ex01',
        type: 'listen-choose',
        audioText: "Action films aren't really my thing. I prefer comedies.",
        question: 'What kind of film does the speaker like?',
        options: ['Action films', 'Comedies', 'Horror films', 'Documentaries'],
        correctIndex: 1,
        explanation: {
          vi: "'not really my thing' = không thích lắm; 'I prefer comedies' = thích phim hài hơn.",
          en: "'Not really my thing' = not liked; the speaker prefers comedies.",
        },
      },
      {
        id: 'l2b-g-04-listen-ex02',
        type: 'listen-choose',
        audioText: 'The story was a bit slow, but the soundtrack was amazing.',
        question: 'What did the speaker like?',
        options: ['The story', 'The actors', 'The soundtrack', 'Nothing'],
        correctIndex: 2,
        explanation: {
          vi: "Sau 'but' là ý khen: 'the soundtrack was amazing'.",
          en: "After 'but' comes the praise: 'the soundtrack was amazing'.",
        },
      },
      {
        id: 'l2b-g-04-listen-ex03',
        type: 'multiple-choice',
        question: "Someone says 'It wasn't bad.' What do they mean?",
        options: ['It was terrible.', 'It was quite good.', "I didn't watch it.", 'It was the best film ever.'],
        correctIndex: 1,
        explanation: {
          vi: "'It wasn't bad' = cũng khá được (cách khen nhẹ).",
          en: "'It wasn't bad' is a soft way to say 'quite good'.",
        },
      },
      {
        id: 'l2b-g-04-listen-ex04',
        type: 'fill-blank',
        sentence: "I'm not a big ___ of rock music. It's too loud for me.",
        acceptedAnswers: ['fan'],
        hint: 'a person who loves something',
        explanation: {
          vi: "not a big fan of = không mê lắm (cách nói nhẹ của 'không thích').",
          en: "'Not a big fan of' is a soft way to say you don't like it.",
        },
      },
      {
        id: 'l2b-g-04-listen-ex05',
        type: 'listen-type',
        audioText: "I couldn't stop watching it.",
        acceptedAnswers: ["I couldn't stop watching it.", 'I could not stop watching it.'],
        explanation: {
          vi: "Câu khen rất mạnh: hay đến mức không dừng xem được.",
          en: 'A strong compliment: it was too good to stop.',
        },
      },
      {
        id: 'l2b-g-04-listen-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối cách nói với ý nghĩa.', en: 'Match each phrase with its meaning.' },
        pairs: [
          { left: "It's not really my thing.", right: "I don't really like it." },
          { left: "I couldn't stop watching!", right: 'It was really exciting.' },
          { left: "It's worth watching.", right: 'You should see it.' },
          { left: "It wasn't bad.", right: 'It was quite good.' },
          { left: "I'm a big fan of jazz.", right: 'I love jazz.' },
        ],
        explanation: {
          vi: 'Hiểu các cách nói này giúp bạn nghe ra ý kiến thật của người nói.',
          en: "These phrases show the speaker's real opinion.",
        },
      },
      {
        id: 'l2b-g-04-listen-ex07',
        type: 'listen-choose',
        audioText: 'The next show starts at a quarter to eight.',
        question: 'What time does the show start?',
        options: ['7.15', '7.45', '8.15', '8.45'],
        correctIndex: 1,
        explanation: {
          vi: 'a quarter to eight = 8 giờ kém 15 = 7 giờ 45.',
          en: 'A quarter to eight = 7.45.',
        },
      },
      {
        id: 'l2b-g-04-listen-ex08',
        type: 'arrange-words',
        translationVi: 'Phim bắt đầu lúc mấy giờ?',
        correctSentence: 'What time does the film start?',
        extraWords: ['do', 'starts'],
        explanation: {
          vi: "Câu hỏi với 'does' → động từ nguyên mẫu 'start' (không thêm -s).",
          en: "After 'does', use the base verb 'start'.",
        },
      },
      {
        id: 'l2b-g-04-listen-ex09',
        type: 'speak-sentence',
        sentence: "It's not really my thing, but my sister loves it.",
        translationVi: 'Nó không hợp với mình lắm, nhưng chị mình rất thích.',
        explanation: {
          vi: "Nhấn 'not' và 'loves'; nhớ âm /z/ cuối 'loves'.",
          en: "Stress 'not' and 'loves', with a clear /z/ at the end.",
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–9. Listen to three recordings. Write ONE WORD AND/OR A NUMBER, or choose the correct answer.',
      strategyTip: {
        vi: "Câu 7 dùng từ khác với bài nghe (paraphrase): 'not much happens' nghĩa là 'chậm'. Hãy nghe ý, không chỉ nghe từ.",
        en: "Question 7 uses different words: 'not much happens' means 'slow'. Listen for meaning, not only words.",
      },
      segments: [
        {
          id: 'l2b-g-04-listen-s1',
          lines: [
            { speaker: 'Khoa', voice: 'gb-male', text: 'Do you want to see a film this evening?' },
            { speaker: 'An', voice: 'gb-female', text: "Sure. What's on?" },
            { speaker: 'Khoa', voice: 'gb-male', text: "There's a new action film called Night Runner. It starts at seven." },
            { speaker: 'An', voice: 'gb-female', text: "Hmm, action films aren't really my thing. Is there anything else?" },
            {
              speaker: 'Khoa',
              voice: 'gb-male',
              text: "Well, there's an animated film, The Paper Garden. The reviews say it's beautiful, and it's really funny too.",
            },
            { speaker: 'An', voice: 'gb-female', text: 'That sounds better. What time is it on?' },
            { speaker: 'Khoa', voice: 'gb-male', text: "There's a show at half past six and another one at a quarter to nine." },
            {
              speaker: 'An',
              voice: 'gb-female',
              text: "Half past six is too early. I finish work at six. Let's go to the later one.",
            },
            {
              speaker: 'Khoa',
              voice: 'gb-male',
              text: "OK. The tickets are usually eighty thousand dong each, but they're half price on Tuesdays, and today's Tuesday!",
            },
            { speaker: 'An', voice: 'gb-female', text: "Great! So that's forty thousand each." },
          ],
        },
        {
          id: 'l2b-g-04-listen-s2',
          lines: [
            { speaker: 'Tuan', voice: 'gb-male', text: 'What are you listening to?' },
            { speaker: 'Hana', voice: 'gb-female', text: "It's a band called The Morning Kites. Have you heard of them?" },
            { speaker: 'Tuan', voice: 'gb-male', text: "No, I haven't. What kind of music do they play?" },
            {
              speaker: 'Hana',
              voice: 'gb-female',
              text: "It's a mix of pop and folk. They play traditional instruments, like the bamboo flute, with modern guitars. You should listen to their new album.",
            },
            {
              speaker: 'Tuan',
              voice: 'gb-male',
              text: "Hmm, I'm not a big fan of pop, to be honest. I usually listen to rock.",
            },
            {
              speaker: 'Hana',
              voice: 'gb-female',
              text: "I know, but trust me, it's different. My favourite song is called River Lights. It's really relaxing. I listen to it when I study.",
            },
            { speaker: 'Tuan', voice: 'gb-male', text: "OK, I'll give it a try. Are they playing any concerts?" },
            {
              speaker: 'Hana',
              voice: 'gb-female',
              text: "Yes! They're playing in the city park on the twelfth of December. The tickets are cheap because it's an outdoor concert.",
            },
            { speaker: 'Tuan', voice: 'gb-male', text: 'Maybe we can go together!' },
          ],
        },
        {
          id: 'l2b-g-04-listen-s3',
          lines: [
            {
              speaker: 'Presenter',
              voice: 'gb-male',
              text: "And now, our film of the week. The Last Lighthouse is a family drama about a young girl who spends one summer with her grandfather on a small island.",
            },
            {
              speaker: 'Presenter',
              voice: 'gb-male',
              text: 'Not much happens in the first half hour, so some people may feel a bit bored. However, the second half is really moving, and the ending is very surprising. The actors are excellent, especially the eleven-year-old who plays the girl.',
            },
            {
              speaker: 'Presenter',
              voice: 'gb-male',
              text: "The film is two hours long. I'd give it four stars out of five, and I'd recommend it for families with older children.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l2b-g-04-listen-q1',
          segmentId: 'l2b-g-04-listen-s1',
          number: 1,
          prompt: "Why doesn't An want to see Night Runner?",
          options: [
            'It starts too late.',
            "She doesn't really like action films.",
            'The tickets are expensive.',
            'She has seen it before.',
          ],
          correctIndex: 1,
          explanation: {
            vi: "An nói: 'action films aren't really my thing' = không thích phim hành động lắm.",
            en: "An says action films 'aren't really my thing'.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-listen-q2',
          segmentId: 'l2b-g-04-listen-s1',
          number: 2,
          prompt: 'They will go to the show at a quarter to ___.',
          acceptedAnswers: ['nine', '9'],
          explanation: {
            vi: '6 giờ 30 quá sớm, nên họ chọn suất sau: a quarter to nine.',
            en: 'Half past six is too early, so they choose a quarter to nine.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-listen-q3',
          segmentId: 'l2b-g-04-listen-s1',
          number: 3,
          prompt: 'Today, each ticket costs ___ thousand dong.',
          acceptedAnswers: ['40', 'forty'],
          explanation: {
            vi: 'Thứ Ba giảm nửa giá: 80 nghìn → 40 nghìn.',
            en: 'Tuesday is half price: eighty thousand becomes forty thousand.',
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-04-listen-q4',
          segmentId: 'l2b-g-04-listen-s2',
          number: 4,
          prompt: 'What kind of music does The Morning Kites play?',
          options: ['Rock', 'A mix of pop and folk', 'Jazz', 'Only traditional music'],
          correctIndex: 1,
          explanation: {
            vi: "Hana: 'It's a mix of pop and folk.' Rock là nhạc Tuan hay nghe.",
            en: "Hana: 'It's a mix of pop and folk.' Rock is what Tuan likes.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-listen-q5',
          segmentId: 'l2b-g-04-listen-s2',
          number: 5,
          prompt: "Hana's favourite song: 'River ___'",
          acceptedAnswers: ['Lights'],
          explanation: {
            vi: "'My favourite song is called River Lights.'",
            en: "'My favourite song is called River Lights.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-listen-q6',
          segmentId: 'l2b-g-04-listen-s2',
          number: 6,
          prompt: 'Concert date: ___ December',
          acceptedAnswers: ['12', '12th', 'twelfth', 'the twelfth'],
          explanation: {
            vi: "'on the twelfth of December' → ngày 12 tháng 12.",
            en: "'On the twelfth of December' = 12th December.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-04-listen-q7',
          segmentId: 'l2b-g-04-listen-s3',
          number: 7,
          prompt: 'What does the presenter say about the first half hour of the film?',
          options: ['It is very exciting.', 'It is slow.', 'It is the best part.', 'It is very funny.'],
          correctIndex: 1,
          explanation: {
            vi: "'Not much happens' (không có gì xảy ra mấy) = chậm.",
            en: "'Not much happens' means it is slow.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-listen-q8',
          segmentId: 'l2b-g-04-listen-s3',
          number: 8,
          prompt: 'The presenter gives the film ___ stars out of five.',
          acceptedAnswers: ['4', 'four'],
          explanation: {
            vi: "'I'd give it four stars out of five.'",
            en: "'I'd give it four stars out of five.'",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-04-listen-q9',
          segmentId: 'l2b-g-04-listen-s3',
          number: 9,
          prompt: 'Who does the presenter recommend the film for?',
          options: ['Young children only', 'Families with older children', 'People who love action', 'History students'],
          correctIndex: 1,
          explanation: {
            vi: "'I'd recommend it for families with older children.'",
            en: "'I'd recommend it for families with older children.'",
          },
        },
      ],
    },
    miniTest: [],
  },
]
