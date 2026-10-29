/**
 * listening-lessons.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI HỌC KỸ NĂNG NGHE (LISTENING) — LEVEL 2 "FOUNDATION" (band 2.0 – 3.0, CEFR A1+/A2).
 *
 * Ở Level 2, người học bắt đầu làm quen với các dạng bài thật của
 * IELTS Listening Part 1 (hội thoại đời thường, điền mẫu đơn) và Part 2
 * (1 người nói: giới thiệu tham quan, thông báo, bản đồ...).
 *
 * Thứ tự 10 bài đi từ dễ đến khó:
 *   01 Điền mẫu đơn: đặt phòng khách sạn
 *   02 Đánh vần tên, địa chỉ, email
 *   03 Số, ngày, giá tiền và "bẫy" (người nói tự sửa lại)
 *   04 Đoán trước loại đáp án (dự đoán)
 *   05 Điền mẫu đơn: đăng ký phòng gym (tổng hợp bài 1-4)
 *   06 Bắt từ khoá: gọi điện đặt lịch khám bác sĩ
 *   07 Trắc nghiệm và paraphrase (nói cùng ý bằng từ khác)
 *   08 Bản đồ và chỉ đường
 *   09 Bài nói ngắn kiểu Part 2: giới thiệu tham quan nông trại
 *   10 Dự báo thời tiết và thông báo ở ga tàu
 *
 * Mỗi bài học (Lesson) gồm:
 *   - teachingCards : thẻ lý thuyết + mẹo nghe (song ngữ Việt/Anh)
 *   - exercises     : 10 bài luyện
 *   - miniTest      : 6 câu kiểm tra cuối bài (có tính tim)
 *
 * Mẹo đọc code: bài nghe dài được khai báo thành hằng số (VD HOTEL_CALL)
 * ở phía trên, rồi dùng lại cho nhiều câu hỏi — giống đề IELTS thật:
 * nghe 1 đoạn, trả lời nhiều câu.
 * Hội thoại viết dạng "Tên: lời thoại" để máy đọc đổi giọng theo người nói.
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

/* ============================================================================
 * KỊCH BẢN BÀI NGHE DÙNG CHUNG (mỗi đoạn dùng cho nhiều câu hỏi)
 * ========================================================================== */

// Bài 1 — gọi điện đặt phòng khách sạn
const HOTEL_CALL =
  "Receptionist: Good morning, Sea View Hotel. How can I help you? Man: Hi, I'd like to book a room for next weekend, please. Receptionist: Of course. Is that a single or a double room? Man: A double room, please. It's for me and my wife. Receptionist: And how many nights? Man: Two nights. We're arriving on Friday the fourteenth of June. Receptionist: Fine. A double room is eighty-five pounds a night, and that includes breakfast. Man: Great. Does the room have a sea view? Receptionist: Yes, all our double rooms look over the beach. Can I have your name, please? Man: It's David Brown. Receptionist: Thank you. Check-in is from two o'clock. Is there anything else? Man: Yes. Is there parking at the hotel? Receptionist: Yes, there's a free car park behind the building."

// Bài 2 — đăng ký thẻ thư viện (đánh vần tên, địa chỉ, email)
const LIBRARY_CALL =
  "Woman: Hello, I'd like to join the library, please. Man: Sure. What's your surname? Woman: It's Thompson. T, H, O, M, P, S, O, N. Man: Thanks. And your first name? Woman: Rachel. R, A, C, H, E, L. Man: What's your address? Woman: Forty-two Fenwick Street. That's F, E, N, W, I, C, K. Man: And the postcode? Woman: It's B, S, seven, nine, Q, L. Man: Sorry, was that B or P? Woman: B, for book. Man: Lovely. And can I have your email address? Woman: It's rachel dot t at mailbox dot com. All lower case. Man: Great. Your library card will be ready in ten minutes."

// Bài 3 — mua vé đi thuyền (số, ngày, giá + bẫy tự sửa)
const BOAT_TRIP =
  "Man: Hello, I'd like some information about the boat trips, please. Woman: Of course. We have trips every day except Monday. Man: How much are the tickets? Woman: Adults are fifteen pounds. Oh, sorry, that's last year's price. It's eighteen pounds now. Children under twelve pay nine pounds. Man: OK. I'd like to come on the twenty-first of August. Woman: Let me check. Sorry, the twenty-first is full. Man: Then the twenty-third, please. Woman: Fine. The boat leaves at half past ten. Oh no, wait. In August it leaves at a quarter to eleven. Man: And how long is the trip? Woman: About three hours. We come back at a quarter to two. Man: Great. Two adults and one child, then. Woman: That's forty-five pounds in total."

// Bài 4 — hỏi thông tin khoá học nấu ăn
const COOKING_CALL =
  "Woman: Hello, Green Kitchen Cookery School. Man: Hi, I'm calling about your cooking classes for beginners. Woman: Yes, our beginners' course is on Wednesday evenings. Man: What time does it start? Woman: At seven o'clock, and it finishes at nine. Man: And how long is the course? Woman: Six weeks. The first class is on the tenth of October. Man: What do the students cook? Woman: In the first week, we make soup and bread. Later we cook fish and simple desserts. Man: Do I need to bring anything? Woman: Just an apron. We give you all the food. Man: And the price? Woman: It's ninety-five pounds for the whole course. Man: Where is the school? Woman: We're in Castle Street, opposite the bank."

// Bài 5 — đăng ký thành viên phòng gym
const GYM_CALL =
  "Man: Hi, I'd like to join the gym. Woman: Great. Can I take some details? What's your full name? Man: Daniel Okafor. That's O, K, A, F, O, R. Woman: Thank you. And your date of birth? Man: The third of March, two thousand and six. Woman: OK. We have two kinds of membership. The standard one is twenty-five pounds a month. The gold one is thirty-nine pounds, and you can also use the swimming pool. Man: I'll take the standard one. I don't really like swimming. Woman: No problem. When would you like to start? Man: Next Monday, the ninth. Woman: Fine. And why do you want to join? Man: I want to get fitter, and I'm interested in the yoga classes. Woman: Yoga is on Tuesdays and Thursdays at six. How did you hear about us? Man: A friend told me about you. Woman: Lovely. Please bring a photo for your membership card."

// Bài 6 — gọi điện đặt lịch khám bác sĩ
const DOCTOR_CALL =
  "Receptionist: Good morning, Hillside Medical Centre. Woman: Hello. I'd like to make an appointment with a doctor, please. Receptionist: Of course. What's the problem? Woman: I've got a bad cough and a sore throat. I've had it for about five days. Receptionist: Do you have a temperature? Woman: No, I don't think so. Receptionist: OK. Doctor Patel has an appointment at nine fifteen tomorrow morning. Woman: Oh, I'm sorry, I work in the mornings. Is there anything in the afternoon? Receptionist: Yes, Doctor Wilson can see you at twenty past four. Woman: That's perfect. Receptionist: Can I have your name? Woman: Maria Lopez. Receptionist: And your date of birth? Woman: The twelfth of November, nineteen ninety-two. Receptionist: Thank you. Please arrive ten minutes early and bring a list of any medicine you are taking."

// Bài 7 — hai bạn nói về kế hoạch kỳ nghỉ hè (paraphrase)
const HOLIDAY_CHAT =
  "Lisa: Hi Tom. Are you going anywhere for the summer holiday? Tom: Yes, I'm going to visit my cousin in Scotland. Lisa: Are you going to fly? Tom: I thought about it, but flights are really expensive in July. And the bus takes too long, so I'm going to take the train. Lisa: Nice. How long are you staying? Tom: Ten days. My cousin lives near the sea, so we're going to go walking along the coast. Lisa: Will the weather be OK? Tom: It's never very hot there, but it doesn't rain as much in summer. Lisa: What are you going to take for your cousin? Tom: I wanted to buy her a book, but she reads everything on her phone now. So I'm taking some Vietnamese coffee. She loves it. Lisa: Good idea!"

// Bài 8 — giới thiệu sơ đồ công viên (bản đồ, Part 2)
const PARK_MAP =
  "Welcome to Riverside Park. We're standing at the main gate, on the south side of the park. Let me tell you where everything is. Straight ahead of you is the lake. You can hire a boat there in summer. The café is on the right of the lake, next to the children's playground. If you need the toilets, they are behind the café. On the left of the main gate, there is a small car park. Go past the car park and you'll find the tennis courts. Finally, the gift shop is opposite the café, on the other side of the lake. It's open from ten until five every day. Enjoy your visit!"

// Bài 9 — hướng dẫn viên giới thiệu nông trại (bài nói Part 2)
const FARM_TOUR =
  "Good morning, everyone, and welcome to Oakfield Farm. My name is Sarah and I'm going to be your guide today. First, a little history. The farm is over two hundred years old. In the past, there were only cows here, but now we also have sheep, goats and chickens. Our tour is going to last about ninety minutes. First, we're going to visit the animals. Children can feed the goats, but please don't give them any of your own food. After that, we'll walk to the vegetable garden. You can pick some strawberries there and take them home. Then we'll stop at the farm shop. Our cheese is very popular, and it's ten percent cheaper for visitors on the tour today. Finally, at twelve thirty, lunch is served in the old barn. Please remember to wash your hands after you touch the animals. There are sinks next to the toilets. OK, let's go!"

// Bài 10 — dự báo thời tiết trên radio
const WEATHER_FORECAST =
  "Good morning. Here's the weather for today. In the north, it's going to be cloudy and cold this morning, with temperatures of only six degrees. There will be some rain in the afternoon, so don't forget your umbrella. In the south, it's going to be much warmer and sunnier, with a top temperature of fourteen degrees. But it will be very windy near the coast this evening. Tomorrow, the whole country is going to be dry, but there may be some fog early in the morning, so please drive carefully."

// Bài 10 — thông báo ở nhà ga
const STATION_ANNOUNCEMENT =
  "Attention, please. The ten fifteen train to Manchester is delayed by twenty minutes. This train will now leave from platform four, not platform two. It is calling at Macclesfield and Stockport. Passengers for Liverpool should change at Manchester. We are sorry for the delay. The eleven o'clock bus to the airport is cancelled today because of the bad weather. A taxi service is available outside the main entrance."

export const level2ListeningLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Điền mẫu đơn — gọi điện đặt phòng khách sạn
  // (Giới thiệu dạng "form completion" của IELTS Listening Part 1)
  // ==========================================================================
  {
    id: "l2-listen-01",
    skill: 'listening',
    title: { vi: "Điền mẫu đơn: đặt phòng khách sạn", en: "Form completion: booking a hotel room" },
    description: {
      vi: "Làm quen dạng điền mẫu đơn trong IELTS Listening Part 1 qua cuộc gọi đặt phòng.",
      en: "Get to know Part 1 form completion through a hotel booking call.",
    },
    teachingCards: [
      {
        title: { vi: "Part 1 là gì? Dạng điền mẫu đơn", en: "What is Part 1? Form completion" },
        body: {
          vi: "IELTS Listening **Part 1** là một **cuộc hội thoại** về chuyện đời thường: đặt phòng, đăng ký lớp học, hỏi thông tin...\nBạn có một **mẫu đơn (form)** với vài chỗ trống. Nghe và điền thông tin còn thiếu.\n**Đáp án xuất hiện theo đúng thứ tự** câu hỏi.\nTrước khi nghe: **đọc hết form** để biết mình cần nghe gì.",
          en: "IELTS Listening **Part 1** is a **conversation** about everyday life: booking a room, joining a class, asking for information...\nYou get a **form** with some gaps. Listen and fill in the missing information.\n**The answers come in the same order** as the questions.\nBefore you listen: **read the whole form** so you know what to listen for.",
        },
        examples: [
          { en: "Type of room: ___", vi: "Loại phòng: ___ (chờ nghe single/double...)" },
          { en: "Number of nights: ___", vi: "Số đêm: ___ (chờ nghe một con số)" },
        ],
      },
      {
        title: { vi: "Từ vựng đặt phòng khách sạn", en: "Hotel booking words" },
        body: {
          vi: "**book / reserve a room**: đặt phòng\n**single room**: phòng đơn (1 người)\n**double room**: phòng có 1 giường đôi (2 người)\n**twin room**: phòng 2 giường đơn\n**per night / a night**: mỗi đêm\n**check in / check out**: nhận phòng / trả phòng\n**includes breakfast**: đã bao gồm bữa sáng",
          en: "**book / reserve a room**\n**single room**: for one person\n**double room**: one big bed for two people\n**twin room**: two single beds\n**per night / a night**\n**check in / check out**: arrive at / leave the hotel\n**includes breakfast**: breakfast is in the price",
        },
        examples: [
          { en: "I'd like to book a double room for two nights.", vi: "Tôi muốn đặt một phòng đôi trong hai đêm." },
          { en: "The price includes breakfast.", vi: "Giá phòng đã bao gồm bữa sáng." },
        ],
      },
      {
        title: { vi: "Đọc kỹ giới hạn số từ", en: "Read the word limit" },
        body: {
          vi: "Đề luôn ghi giới hạn, VD: **Write ONE WORD AND/OR A NUMBER**.\n→ Được viết: 1 từ (double), 1 số (85), hoặc 1 từ + 1 số (14 June).\n→ KHÔNG được viết: free car park (3 từ).\nViết quá số từ = **sai**, dù nội dung đúng. Và nhớ **viết đúng chính tả**!",
          en: "The task always gives a limit, e.g. **Write ONE WORD AND/OR A NUMBER**.\n→ OK: one word (double), one number (85), or a word + a number (14 June).\n→ NOT OK: free car park (3 words).\nToo many words = **wrong**, even if the meaning is right. And **spell correctly**!",
        },
        examples: [
          { en: "Price per night: £85", vi: "Giá mỗi đêm: 85 bảng (chỉ viết số 85)" },
          { en: "Arrival date: 14 June", vi: "Ngày đến: 14 tháng 6 (1 số + 1 từ)" },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-01-ex01",
        type: 'listen-choose',
        audioText: "Receptionist: Would you like a single or a double room? Woman: A single, please. I'm travelling alone.",
        question: "What kind of room does the woman want? (Người phụ nữ muốn loại phòng nào?)",
        options: ["Double", "Twin", "Single", "Family"],
        correctIndex: 2,
        explanation: {
          vi: "Cô ấy nói 'A single, please. I'm travelling alone' (Tôi đi một mình) → phòng **single**.",
          en: "She says 'A single, please. I'm travelling alone' → a **single** room.",
        },
      },
      {
        id: "l2-listen-01-ex02",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "Complete the form. Type of room: ___",
        options: ["single", "double", "family", "twin"],
        correctIndex: 1,
        explanation: {
          vi: "Người đàn ông nói 'A double room, please. It's for me and my wife.' → **double**.",
          en: "The man says 'A double room, please. It's for me and my wife.' → **double**.",
        },
      },
      {
        id: "l2-listen-01-ex03",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "Complete the form. Number of nights: ___",
        options: ["1", "3", "2", "14"],
        correctIndex: 2,
        explanation: {
          vi: "'And how many nights?' – 'Two nights.' → **2**. Số 14 là ngày đến (14 tháng 6), không phải số đêm.",
          en: "'And how many nights?' – 'Two nights.' → **2**. 14 is the arrival date, not the number of nights.",
        },
      },
      {
        id: "l2-listen-01-ex04",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "Complete the form. Arrival date: ___",
        options: ["Friday 14th June", "Friday 4th June", "Saturday 14th June", "Friday 14th July"],
        correctIndex: 0,
        explanation: {
          vi: "'We're arriving on Friday the fourteenth of June.' → **thứ Sáu, 14 tháng 6**. Chú ý 'fourteenth' (14) khác 'fourth' (4).",
          en: "'We're arriving on Friday the fourteenth of June.' Note: 'fourteenth' (14th) is not 'fourth' (4th).",
        },
      },
      {
        id: "l2-listen-01-ex05",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "Complete the form. Price per night: £___",
        options: ["58", "95", "80", "85"],
        correctIndex: 3,
        explanation: {
          vi: "'A double room is eighty-five pounds a night' → **£85**. Đừng đảo số thành 58!",
          en: "'A double room is eighty-five pounds a night' → **£85**. Don't swap the digits to 58!",
        },
      },
      {
        id: "l2-listen-01-ex06",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ tiếng Anh với nghĩa tiếng Việt.",
          en: "Match the English words with their Vietnamese meanings.",
        },
        pairs: [
          { left: "single room", right: "phòng đơn" },
          { left: "double room", right: "phòng 1 giường đôi" },
          { left: "twin room", right: "phòng 2 giường đơn" },
          { left: "check in", right: "nhận phòng" },
          { left: "check out", right: "trả phòng" },
          { left: "per night", right: "mỗi đêm" },
        ],
        explanation: {
          vi: "Đây là những từ gần như chắc chắn xuất hiện trong bài nghe về khách sạn.",
          en: "These words almost always appear in hotel listening tasks.",
        },
      },
      {
        id: "l2-listen-01-ex07",
        type: 'listen-type',
        audioText: "Check-in is from two o'clock.",
        acceptedAnswers: [
          "Check-in is from two o'clock",
          "Check in is from two o'clock",
          "Check-in is from 2 o'clock",
          "Check in is from 2 o'clock",
          "Checkin is from two o'clock",
        ],
        explanation: {
          vi: "**Check-in is from two o'clock** = Có thể nhận phòng từ 2 giờ. Có thể viết 'two' hoặc '2'.",
          en: "**Check-in is from two o'clock.** You can write 'two' or '2'.",
        },
      },
      {
        id: "l2-listen-01-ex08",
        type: 'fill-blank',
        sentence: "The room costs eighty-five pounds ___ night.",
        acceptedAnswers: ["a", "per"],
        hint: "(mỗi)",
        explanation: {
          vi: "Nói **a night** hoặc **per night** đều đúng, nghĩa là 'mỗi đêm'.",
          en: "Both **a night** and **per night** are correct.",
        },
      },
      {
        id: "l2-listen-01-ex09",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "Where can guests park their car? (Khách đỗ xe ở đâu?)",
        options: ["In the street", "In a free car park behind the hotel", "In a car park next to the beach", "There is no parking."],
        correctIndex: 1,
        explanation: {
          vi: "'There's a free car park behind the building.' → bãi đỗ xe **miễn phí, phía sau** khách sạn.",
          en: "'There's a free car park behind the building.' → a **free** car park **behind** the hotel.",
        },
      },
      {
        id: "l2-listen-01-ex10",
        type: 'true-false',
        statement: "In IELTS Listening Part 1, the answers usually come in the same order as the questions.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "Đúng. Đáp án đi theo thứ tự câu hỏi, nên nếu lỡ 1 câu, hãy chuyển ngay sang câu tiếp theo.",
          en: "True. The answers follow the order of the questions, so if you miss one, move on to the next.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-01-test01",
        type: 'listen-choose',
        audioText: "Woman: I'd like to book a twin room for three nights, please. Receptionist: Certainly. That's sixty pounds a night.",
        question: "How many nights does the woman want?",
        options: ["2", "3", "6", "13"],
        correctIndex: 1,
        explanation: {
          vi: "'...a twin room for three nights' → **3 đêm**. Số 60 là giá phòng.",
          en: "'...a twin room for three nights' → **3**. Sixty is the price.",
        },
      },
      {
        id: "l2-listen-01-test02",
        type: 'listen-choose',
        audioText: "Woman: I'd like to book a twin room for three nights, please. Receptionist: Certainly. That's sixty pounds a night.",
        question: "Price per night: £___",
        options: ["16", "66", "60", "70"],
        correctIndex: 2,
        explanation: {
          vi: "'sixty pounds' = **£60**. Sixty (60) nhấn âm đầu: SIX-ty; sixteen (16) nhấn âm cuối: six-TEEN.",
          en: "'sixty pounds' = **£60**. SIX-ty (60) is stressed at the start; six-TEEN (16) at the end.",
        },
      },
      {
        id: "l2-listen-01-test03",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "Check-in time: from ___",
        options: ["12 o'clock", "10 o'clock", "4 o'clock", "2 o'clock"],
        correctIndex: 3,
        explanation: {
          vi: "'Check-in is from two o'clock.' → từ **2 giờ**.",
          en: "'Check-in is from two o'clock.' → from **2 o'clock**.",
        },
      },
      {
        id: "l2-listen-01-test04",
        type: 'listen-choose',
        audioText: HOTEL_CALL,
        question: "What is included in the price?",
        options: ["Breakfast", "Dinner", "Lunch", "A taxi"],
        correctIndex: 0,
        explanation: {
          vi: "'...eighty-five pounds a night, and that includes breakfast.' → giá đã gồm **bữa sáng**.",
          en: "'...eighty-five pounds a night, and that includes breakfast.' → **breakfast**.",
        },
      },
      {
        id: "l2-listen-01-test05",
        type: 'listen-type',
        audioText: "I'd like to book a double room.",
        acceptedAnswers: ["I'd like to book a double room", "I would like to book a double room"],
        explanation: {
          vi: "**I'd like to book...** (= I would like to) là cách lịch sự để đặt phòng, đặt bàn, đặt vé.",
          en: "**I'd like to book...** (= I would like to) is a polite way to book a room, a table or a ticket.",
        },
      },
      {
        id: "l2-listen-01-test06",
        type: 'multiple-choice',
        question: "Instruction: Write ONE WORD AND/OR A NUMBER. Which answer is NOT allowed? (Đáp án nào KHÔNG hợp lệ?)",
        options: ["double", "85", "free car park", "14 June"],
        correctIndex: 2,
        explanation: {
          vi: "'free car park' có **3 từ** → vượt giới hạn. '14 June' là 1 số + 1 từ nên vẫn hợp lệ.",
          en: "'free car park' has **3 words** → too many. '14 June' is a number + one word, so it's OK.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Đánh vần tên, địa chỉ, mã bưu điện và email
  // (Part 1 rất hay yêu cầu chép tên đường, postcode, email)
  // ==========================================================================
  {
    id: "l2-listen-02",
    skill: 'listening',
    title: { vi: "Đánh vần tên, địa chỉ và email", en: "Spelling names, addresses and emails" },
    description: {
      vi: "Chép đúng tên, tên đường, mã bưu điện và địa chỉ email khi nghe đánh vần.",
      en: "Write down spelled names, street names, postcodes and email addresses correctly.",
    },
    teachingCards: [
      {
        title: { vi: "Địa chỉ kiểu Anh", en: "British addresses" },
        body: {
          vi: "Địa chỉ ở Anh: **số nhà + tên đường + loại đường**.\nLoại đường hay gặp: **Street, Road, Avenue, Lane**.\nVD: 42 Fenwick Street.\n**Postcode** (mã bưu điện) gồm chữ và số: **BS7 9QL**.\nKhi không chắc, người ta hỏi lại: 'Was that B or P?' – 'B, for book.' (B trong từ book).",
          en: "A British address: **number + street name + type of road**.\nCommon types: **Street, Road, Avenue, Lane**.\nE.g. 42 Fenwick Street.\nA **postcode** has letters and numbers: **BS7 9QL**.\nTo check a letter, people say: 'Was that B or P?' – 'B, for book.'",
        },
        examples: [
          { en: "I live at 15 Park Lane.", vi: "Tôi sống ở số 15 đường Park Lane." },
          { en: "Was that M or N? – M, for mother.", vi: "Là M hay N? – M, trong từ mother." },
        ],
      },
      {
        title: { vi: "Đọc địa chỉ email", en: "Saying email addresses" },
        body: {
          vi: "**@** đọc là **at**\n**.** đọc là **dot**\n**_** đọc là **underscore**\n**-** đọc là **hyphen** hoặc **dash**\n'**all lower case**' = viết thường hết\n'**all one word**' = viết liền, không cách.",
          en: "**@** = **at**\n**.** = **dot**\n**_** = **underscore**\n**-** = **hyphen** or **dash**\n'**all lower case**' = no capital letters\n'**all one word**' = no spaces.",
        },
        examples: [
          { en: "rachel dot t at mailbox dot com", vi: "rachel.t@mailbox.com" },
          { en: "j underscore lee at webmail dot co dot uk", vi: "j_lee@webmail.co.uk" },
        ],
      },
      {
        title: { vi: "Bẫy khi chép tên", en: "Name traps" },
        body: {
          vi: "Nhiều tên nghe giống nhau nhưng viết khác: **Thompson / Thomson**, **Smith / Smyth**, **Rachel / Rachael**.\nVì vậy đề thi luôn đánh vần — hãy **chép từng chữ cái**, đừng đoán theo trí nhớ.\nNhớ **double** + chữ cái = 2 chữ giống nhau (Watts = W, A, double T, S).\nViết hoa chữ cái đầu tên riêng.",
          en: "Many names sound the same but are spelled differently: **Thompson / Thomson**, **Smith / Smyth**, **Rachel / Rachael**.\nThat's why speakers spell them — **write each letter**, don't guess.\nRemember **double** + letter = two of the same (Watts = W, A, double T, S).\nStart names with a capital letter.",
        },
        examples: [
          { en: "Is that Smith with an I or a Y? – With a Y.", vi: "Smith viết với I hay Y? – Với Y." },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-02-ex01",
        type: 'listen-type',
        audioText: "T, H, O, M, P, S, O, N.",
        acceptedAnswers: ["Thompson", "T H O M P S O N"],
        explanation: {
          vi: "T-H-O-M-P-S-O-N → **Thompson** (có chữ P, khác với Thomson).",
          en: "T-H-O-M-P-S-O-N → **Thompson** (with a P, unlike Thomson).",
        },
      },
      {
        id: "l2-listen-02-ex02",
        type: 'listen-choose',
        audioText: LIBRARY_CALL,
        question: "Complete the form. First name: ___",
        options: ["Rachael", "Rochel", "Rachelle", "Rachel"],
        correctIndex: 3,
        explanation: {
          vi: "Cô ấy đánh vần R, A, C, H, E, L → **Rachel**.",
          en: "She spells R, A, C, H, E, L → **Rachel**.",
        },
      },
      {
        id: "l2-listen-02-ex03",
        type: 'listen-choose',
        audioText: LIBRARY_CALL,
        question: "Complete the form. Street: ___",
        options: ["Fenwick Street", "Fenwich Street", "Venwick Street", "Fenwick Road"],
        correctIndex: 0,
        explanation: {
          vi: "F, E, N, W, I, C, K → **Fenwick**, và cô ấy nói 'Street' chứ không phải 'Road'.",
          en: "F, E, N, W, I, C, K → **Fenwick**, and she says 'Street', not 'Road'.",
        },
      },
      {
        id: "l2-listen-02-ex04",
        type: 'listen-choose',
        audioText: LIBRARY_CALL,
        question: "Complete the form. House number: ___",
        options: ["24", "40", "42", "12"],
        correctIndex: 2,
        explanation: {
          vi: "'Forty-two Fenwick Street' → số nhà **42**.",
          en: "'Forty-two Fenwick Street' → **42**.",
        },
      },
      {
        id: "l2-listen-02-ex05",
        type: 'listen-choose',
        audioText: LIBRARY_CALL,
        question: "Complete the form. Postcode: ___",
        options: ["PS7 9QL", "BS7 9QL", "BS7 9KL", "BS9 7QL"],
        correctIndex: 1,
        explanation: {
          vi: "B, S, seven, nine, Q, L → **BS7 9QL**. Người đàn ông hỏi lại 'B or P?' và cô ấy xác nhận 'B, for book'.",
          en: "B, S, seven, nine, Q, L → **BS7 9QL**. The man checks 'B or P?' and she says 'B, for book'.",
        },
      },
      {
        id: "l2-listen-02-ex06",
        type: 'listen-choose',
        audioText: LIBRARY_CALL,
        question: "Complete the form. Email: ___",
        options: ["rachelt@mailbox.com", "rachel.t@mail.com", "rachel_t@mailbox.com", "rachel.t@mailbox.com"],
        correctIndex: 3,
        explanation: {
          vi: "'rachel dot t at mailbox dot com' → **rachel.t@mailbox.com** (dot = dấu chấm, at = @).",
          en: "'rachel dot t at mailbox dot com' → **rachel.t@mailbox.com**.",
        },
      },
      {
        id: "l2-listen-02-ex07",
        type: 'match-pairs',
        instruction: {
          vi: "Nối ký hiệu với cách đọc trong tiếng Anh.",
          en: "Match each symbol with how we say it.",
        },
        pairs: [
          { left: "@", right: "at" },
          { left: ".", right: "dot" },
          { left: "_", right: "underscore" },
          { left: "-", right: "hyphen" },
          { left: "LL", right: "double L" },
        ],
        explanation: {
          vi: "Thuộc cách đọc các ký hiệu giúp bạn chép email chính xác.",
          en: "Knowing these helps you write email addresses correctly.",
        },
      },
      {
        id: "l2-listen-02-ex08",
        type: 'listen-type',
        audioText: "My address is fifteen Park Lane.",
        acceptedAnswers: ["My address is fifteen Park Lane", "My address is 15 Park Lane"],
        explanation: {
          vi: "Số nhà thường viết bằng chữ số: **15 Park Lane**. Lane = đường nhỏ, ngõ.",
          en: "House numbers are usually written as digits: **15 Park Lane**.",
        },
      },
      {
        id: "l2-listen-02-ex09",
        type: 'listen-choose',
        audioText: "Man: What's your email address? Woman: It's j underscore lee at webmail dot co dot uk.",
        question: "What is the woman's email address?",
        options: ["j-lee@webmail.co.uk", "j_lee@webmail.co.uk", "jlee@webmail.co.uk", "j_lee@webmail.com"],
        correctIndex: 1,
        explanation: {
          vi: "'underscore' là dấu gạch dưới **_**, còn 'dot co dot uk' là **.co.uk** → j_lee@webmail.co.uk.",
          en: "'underscore' is **_**, and 'dot co dot uk' is **.co.uk** → j_lee@webmail.co.uk.",
        },
      },
      {
        id: "l2-listen-02-ex10",
        type: 'multiple-choice',
        question: "How do you say 'lucy.ng@abc.com'?",
        options: [
          "lucy at n g dot abc at com",
          "lucy dash n g at a b c dash com",
          "lucy dot n g at a b c dot com",
          "lucy dot n g dot a b c at com",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Dấu **.** đọc là 'dot', **@** đọc là 'at' → 'lucy dot n g at a b c dot com'.",
          en: "**.** is 'dot' and **@** is 'at' → 'lucy dot n g at a b c dot com'.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-02-test01",
        type: 'listen-type',
        audioText: "W, A, double T, S.",
        acceptedAnswers: ["Watts", "W A T T S"],
        explanation: {
          vi: "'double T' = TT → **Watts**.",
          en: "'double T' = TT → **Watts**.",
        },
      },
      {
        id: "l2-listen-02-test02",
        type: 'listen-choose',
        audioText: "Man: And which street do you live on? Woman: Gresham Road. G, R, E, S, H, A, M.",
        question: "Address: ___",
        options: ["Gresam Road", "Gresham Road", "Gressham Road", "Gresham Street"],
        correctIndex: 1,
        explanation: {
          vi: "G-R-E-S-H-A-M, và cô ấy nói 'Road' → **Gresham Road**.",
          en: "G-R-E-S-H-A-M, and she says 'Road' → **Gresham Road**.",
        },
      },
      {
        id: "l2-listen-02-test03",
        type: 'listen-choose',
        audioText: LIBRARY_CALL,
        question: "When will the library card be ready?",
        options: ["In twenty minutes", "In two minutes", "In one hour", "In ten minutes"],
        correctIndex: 3,
        explanation: {
          vi: "'Your library card will be ready in ten minutes.' → **10 phút** nữa.",
          en: "'Your library card will be ready in ten minutes.'",
        },
      },
      {
        id: "l2-listen-02-test04",
        type: 'listen-choose',
        audioText: "Woman: My postcode is M, one four, six, A, B.",
        question: "Postcode: ___",
        options: ["M14 6AB", "N14 6AB", "M40 6AB", "M14 6EB"],
        correctIndex: 0,
        explanation: {
          vi: "M, one four (14), six, A, B → **M14 6AB**. 'one four' là 1-4, không phải 40.",
          en: "M, one four (14), six, A, B → **M14 6AB**.",
        },
      },
      {
        id: "l2-listen-02-test05",
        type: 'fill-blank',
        sentence: "In an email address, the symbol @ is read as '___'.",
        acceptedAnswers: ["at"],
        explanation: {
          vi: "Ký hiệu **@** đọc là **at**.",
          en: "The symbol **@** is read as **at**.",
        },
      },
      {
        id: "l2-listen-02-test06",
        type: 'listen-choose',
        audioText: "Man: Is that Smith with an I or a Y? Woman: With a Y. S, M, Y, T, H.",
        question: "What is the woman's surname?",
        options: ["Smith", "Smythe", "Smyth", "Smit"],
        correctIndex: 2,
        explanation: {
          vi: "S, M, Y, T, H → **Smyth** (không có E ở cuối như Smythe).",
          en: "S, M, Y, T, H → **Smyth** (no E at the end).",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Số, ngày tháng, giờ, giá tiền — và bẫy "người nói tự sửa"
  // (Distractors: thông tin đầu tiên nghe được thường KHÔNG phải đáp án)
  // ==========================================================================
  {
    id: "l2-listen-03",
    skill: 'listening',
    title: { vi: "Số, ngày, giá tiền và bẫy tự sửa", en: "Numbers, dates, prices and corrections" },
    description: {
      vi: "Nghe đúng số, ngày, giờ, giá tiền và nhận ra khi người nói đổi ý hoặc sửa lại.",
      en: "Catch numbers, dates, times and prices, and notice when the speaker corrects themselves.",
    },
    teachingCards: [
      {
        title: { vi: "Bẫy: người nói tự sửa lại", en: "Trap: the speaker corrects themselves" },
        body: {
          vi: "Trong IELTS, thông tin **đầu tiên** bạn nghe thường là **bẫy** (distractor).\nHãy chú ý các cụm báo hiệu sửa lại:\n**Oh, sorry, I mean...**\n**Actually, ...**\n**No, wait...**\n**That's last year's price.**\n**Sorry, that day is full.**\n→ Đáp án là thông tin **sau** cụm này.",
          en: "In IELTS, the **first** piece of information you hear is often a **trap** (distractor).\nListen for correction phrases:\n**Oh, sorry, I mean...**\n**Actually, ...**\n**No, wait...**\n**That's last year's price.**\n**Sorry, that day is full.**\n→ The answer comes **after** these phrases.",
        },
        examples: [
          { en: "It's on the fifth. Oh, sorry, I mean the sixth.", vi: "Vào ngày mùng 5. À xin lỗi, ý tôi là mùng 6. (→ đáp án: 6)" },
          { en: "It's fifteen pounds. Actually, it's eighteen now.", vi: "15 bảng. Thật ra bây giờ là 18 bảng. (→ 18)" },
        ],
      },
      {
        title: { vi: "Giờ và ngày tháng", en: "Times and dates" },
        body: {
          vi: "**half past ten** = 10:30\n**a quarter to eleven** = 10:45 (11 giờ kém 15)\n**a quarter past two** = 2:15\n**ten to nine** = 8:50\nNgày: **the twenty-first of August** = 21st August = 21 August.\nCó thể viết ngày theo nhiều cách, nhưng phải đúng số và tháng.",
          en: "**half past ten** = 10:30\n**a quarter to eleven** = 10:45\n**a quarter past two** = 2:15\n**ten to nine** = 8:50\nDates: **the twenty-first of August** = 21st August = 21 August.\nYou can write dates in different ways, but the day and month must be right.",
        },
        examples: [
          { en: "The boat leaves at a quarter to eleven.", vi: "Thuyền rời bến lúc 10 giờ 45." },
          { en: "I'd like to come on the twenty-third of August.", vi: "Tôi muốn đến vào ngày 23 tháng 8." },
        ],
      },
      {
        title: { vi: "Giá tiền và -teen / -ty", en: "Prices and -teen / -ty" },
        body: {
          vi: "**thirteen** (13) nhấn cuối: thir-TEEN; **thirty** (30) nhấn đầu: THIR-ty.\nGiá tiền: **£13.50** đọc là 'thirteen pounds fifty' hoặc 'thirteen fifty'.\n**half price** = giảm một nửa giá.\nKhi nghe tổng tiền, hãy tự **nhẩm lại** để kiểm tra.",
          en: "**thirteen** (13) is stressed at the end: thir-TEEN; **thirty** (30) at the start: THIR-ty.\nPrices: **£13.50** = 'thirteen pounds fifty' or 'thirteen fifty'.\n**half price** = 50% of the price.\nWhen you hear a total, **do the maths** quickly to check.",
        },
        examples: [
          { en: "It costs thirteen pounds fifty.", vi: "Giá 13,50 bảng." },
          { en: "The jacket is half price today.", vi: "Hôm nay áo khoác giảm nửa giá." },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-03-ex01",
        type: 'listen-choose',
        audioText: "Woman: The cooking class starts on the fifth of May. Oh, sorry, I mean the sixth of May.",
        question: "When does the class start?",
        options: ["5th May", "16th May", "6th May", "5th March"],
        correctIndex: 2,
        explanation: {
          vi: "'the fifth' là bẫy. Sau 'Oh, sorry, I mean...' cô ấy sửa thành **the sixth of May**.",
          en: "'the fifth' is the trap. After 'Oh, sorry, I mean...' she changes it to **the sixth of May**.",
        },
      },
      {
        id: "l2-listen-03-ex02",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "Adult ticket: £___",
        options: ["15", "80", "18", "9"],
        correctIndex: 2,
        explanation: {
          vi: "'Adults are fifteen pounds. Oh, sorry, that's last year's price. It's eighteen pounds now.' → **£18**. 15 là giá năm ngoái.",
          en: "£15 is last year's price. 'It's eighteen pounds now.' → **£18**.",
        },
      },
      {
        id: "l2-listen-03-ex03",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "Child ticket (under 12): £___",
        options: ["9", "12", "19", "5"],
        correctIndex: 0,
        explanation: {
          vi: "'Children under twelve pay nine pounds.' → **£9**. Số 12 là độ tuổi, không phải giá.",
          en: "'Children under twelve pay nine pounds.' → **£9**. 12 is the age, not the price.",
        },
      },
      {
        id: "l2-listen-03-ex04",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "Date of trip: ___",
        options: ["21st August", "22nd August", "3rd August", "23rd August"],
        correctIndex: 3,
        explanation: {
          vi: "Ngày 21 đã kín chỗ ('the twenty-first is full'), nên anh ấy chọn **ngày 23 tháng 8**.",
          en: "The 21st is full, so he chooses **the twenty-third of August**.",
        },
      },
      {
        id: "l2-listen-03-ex05",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "In August, the boat leaves at ___",
        options: ["10:30", "11:45", "10:45", "10:15"],
        correctIndex: 2,
        explanation: {
          vi: "'half past ten' (10:30) là bẫy. 'Oh no, wait. In August it leaves at a quarter to eleven.' → **10:45**.",
          en: "'half past ten' is the trap. 'In August it leaves at a quarter to eleven.' → **10:45**.",
        },
      },
      {
        id: "l2-listen-03-ex06",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "On which day are there NO boat trips?",
        options: ["Sunday", "Monday", "Friday", "There are trips every day."],
        correctIndex: 1,
        explanation: {
          vi: "'every day except Monday' = mọi ngày **trừ thứ Hai**.",
          en: "'every day except Monday' → no trips on **Monday**.",
        },
      },
      {
        id: "l2-listen-03-ex07",
        type: 'listen-type',
        audioText: "It costs thirteen pounds fifty.",
        acceptedAnswers: [
          "It costs thirteen pounds fifty",
          "It costs £13.50",
          "It costs 13 pounds 50",
          "It costs 13 pounds fifty",
          "It costs £1350",
          "It costs 13.50",
        ],
        explanation: {
          vi: "'thirteen pounds fifty' = **£13.50**. Nhớ: thir-TEEN (13), không phải THIR-ty (30).",
          en: "'thirteen pounds fifty' = **£13.50**. Remember: thir-TEEN (13), not THIR-ty (30).",
        },
      },
      {
        id: "l2-listen-03-ex08",
        type: 'match-pairs',
        instruction: {
          vi: "Nối cách nói giờ với giờ viết bằng số.",
          en: "Match the spoken time with the digital time.",
        },
        pairs: [
          { left: "half past ten", right: "10:30" },
          { left: "a quarter to eleven", right: "10:45" },
          { left: "a quarter past two", right: "2:15" },
          { left: "ten to nine", right: "8:50" },
          { left: "twenty past six", right: "6:20" },
        ],
        explanation: {
          vi: "**past** = hơn (sau giờ chẵn), **to** = kém (trước giờ chẵn). a quarter = 15 phút, half = 30 phút.",
          en: "**past** = after the hour, **to** = before the hour. a quarter = 15 minutes, half = 30 minutes.",
        },
      },
      {
        id: "l2-listen-03-ex09",
        type: 'listen-choose',
        audioText: "Man: Sorry, was that fourteen or forty? Woman: Forty. Four, zero.",
        question: "What number does the woman say?",
        options: ["14", "40", "44", "4"],
        correctIndex: 1,
        explanation: {
          vi: "Cô ấy xác nhận 'Forty. Four, zero.' → **40**.",
          en: "She confirms 'Forty. Four, zero.' → **40**.",
        },
      },
      {
        id: "l2-listen-03-ex10",
        type: 'multiple-choice',
        question: "Which phrase usually tells you that the speaker is correcting information?",
        options: ["Oh, sorry, I mean...", "That's right.", "Of course.", "Here you are."],
        correctIndex: 0,
        explanation: {
          vi: "**Oh, sorry, I mean...** báo hiệu thông tin trước đó sai → đáp án nằm ngay sau.",
          en: "**Oh, sorry, I mean...** shows the earlier information was wrong → the answer comes next.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-03-test01",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "Total price for two adults and one child: £___",
        options: ["54", "45", "36", "40"],
        correctIndex: 1,
        explanation: {
          vi: "2 người lớn × £18 + 1 trẻ em × £9 = **£45**. Cô ấy cũng nói 'forty-five pounds in total'.",
          en: "2 × £18 + 1 × £9 = **£45**. She also says 'forty-five pounds in total'.",
        },
      },
      {
        id: "l2-listen-03-test02",
        type: 'listen-choose',
        audioText: BOAT_TRIP,
        question: "The boat comes back at ___",
        options: ["2:15", "12:45", "1:45", "3:00"],
        correctIndex: 2,
        explanation: {
          vi: "'We come back at a quarter to two.' → **1:45** (2 giờ kém 15).",
          en: "'We come back at a quarter to two.' → **1:45**.",
        },
      },
      {
        id: "l2-listen-03-test03",
        type: 'listen-choose',
        audioText: "Woman: My phone number is oh one six two five, double five eight, nine three seven. Sorry, nine four seven.",
        question: "Phone number: ___",
        options: ["01625 558937", "01625 588947", "01652 558947", "01625 558947"],
        correctIndex: 3,
        explanation: {
          vi: "Cô ấy sửa 'nine three seven' thành 'nine four seven' → **01625 558947**.",
          en: "She corrects 'nine three seven' to 'nine four seven' → **01625 558947**.",
        },
      },
      {
        id: "l2-listen-03-test04",
        type: 'listen-type',
        audioText: "The shop opens at a quarter past nine.",
        acceptedAnswers: [
          "The shop opens at a quarter past nine",
          "The shop opens at quarter past nine",
          "The shop opens at a quarter past 9",
          "The shop opens at 9:15",
          "The shop opens at 915",
        ],
        explanation: {
          vi: "'a quarter past nine' = **9:15** (9 giờ 15).",
          en: "'a quarter past nine' = **9:15**.",
        },
      },
      {
        id: "l2-listen-03-test05",
        type: 'listen-choose',
        audioText: "Man: This jacket was sixty pounds, but today it's half price.",
        question: "How much is the jacket today?",
        options: ["£60", "£16", "£30", "£13"],
        correctIndex: 2,
        explanation: {
          vi: "'half price' = nửa giá → £60 ÷ 2 = **£30**.",
          en: "'half price' → £60 ÷ 2 = **£30**.",
        },
      },
      {
        id: "l2-listen-03-test06",
        type: 'true-false',
        statement: "In 'Adults are fifteen pounds. Oh, sorry, that's last year's price. It's eighteen pounds now', the correct answer is £15.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. £15 là giá năm ngoái (bẫy). Đáp án đúng là **£18**.",
          en: "False. £15 is last year's price (a trap). The right answer is **£18**.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Đoán trước loại đáp án (predicting)
  // (Kỹ năng quan trọng nhất trước khi nghe: nhìn chỗ trống, đoán loại từ)
  // ==========================================================================
  {
    id: "l2-listen-04",
    skill: 'listening',
    title: { vi: "Đoán trước loại đáp án", en: "Predicting the type of answer" },
    description: {
      vi: "Nhìn chỗ trống, đoán trước cần nghe số, ngày, tên hay danh từ — rồi nghe để kiểm tra.",
      en: "Look at each gap, predict a number, date, name or noun — then listen to check.",
    },
    teachingCards: [
      {
        title: { vi: "Đoán loại đáp án trước khi nghe", en: "Predict before you listen" },
        body: {
          vi: "Trước khi bài nghe bắt đầu, bạn có khoảng 30 giây. Hãy nhìn từng chỗ trống và hỏi: **Mình cần nghe loại thông tin gì?**\n**Số** (giá, số lượng, số điện thoại)\n**Ngày / giờ**\n**Tên** (người, đường phố)\n**Danh từ** (đồ vật, nơi chốn)\n**Tính từ** (big, cheap...)\nKhi đã biết cần nghe gì, bạn sẽ bắt đáp án nhanh hơn rất nhiều.",
          en: "Before the recording starts, you get about 30 seconds. Look at each gap and ask: **What kind of information do I need?**\n**A number** (price, amount, phone number)\n**A date / time**\n**A name** (person, street)\n**A noun** (thing, place)\n**An adjective** (big, cheap...)\nWhen you know what to listen for, you catch the answer much faster.",
        },
        examples: [
          { en: "Price: £___", vi: "→ chắc chắn là một con số" },
          { en: "Classes are on ___ evenings.", vi: "→ một ngày trong tuần" },
        ],
      },
      {
        title: { vi: "Dùng ngữ pháp để đoán", en: "Use grammar clues" },
        body: {
          vi: "Từ đứng **trước và sau** chỗ trống cho bạn gợi ý:\n**a ___** → danh từ số ít (a towel)\n**an ___** → danh từ số ít bắt đầu bằng nguyên âm (an apron)\n**two ___** → danh từ số nhiều (two photos)\n**on ___** → ngày/thứ (on Wednesday)\n**at ___** → giờ hoặc địa điểm (at 7 pm, at the bank)\n**___ Street** → tên riêng",
          en: "The words **before and after** the gap help you:\n**a ___** → singular noun (a towel)\n**an ___** → singular noun starting with a vowel sound (an apron)\n**two ___** → plural noun (two photos)\n**on ___** → day/date (on Wednesday)\n**at ___** → time or place (at 7 pm, at the bank)\n**___ Street** → a name",
        },
        examples: [
          { en: "Bring an ___.", vi: "→ danh từ số ít, bắt đầu bằng nguyên âm: apron" },
          { en: "Students need two ___.", vi: "→ danh từ số nhiều: photos, pencils..." },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-04-ex01",
        type: 'multiple-choice',
        question: "Gap: 'Course price: £___'. What type of answer do you expect?",
        options: ["a name", "a number", "a day of the week", "a place"],
        correctIndex: 1,
        explanation: {
          vi: "Có ký hiệu **£** → chắc chắn cần một **con số**.",
          en: "There's a **£** sign → you need a **number**.",
        },
      },
      {
        id: "l2-listen-04-ex02",
        type: 'multiple-choice',
        question: "Gap: 'Please bring an ___.' What type of answer do you expect?",
        options: ["a number", "a verb", "a singular noun beginning with a vowel sound", "a plural noun"],
        correctIndex: 2,
        explanation: {
          vi: "**an** đứng trước danh từ số ít bắt đầu bằng nguyên âm (an apron, an umbrella).",
          en: "**an** comes before a singular noun starting with a vowel sound (an apron, an umbrella).",
        },
      },
      {
        id: "l2-listen-04-ex03",
        type: 'multiple-choice',
        question: "Gap: 'Classes are on ___ evenings.' What type of answer do you expect?",
        options: ["a time", "a price", "a person's name", "a day of the week"],
        correctIndex: 3,
        explanation: {
          vi: "**on ___ evenings** → cần một **thứ trong tuần** (on Monday evenings).",
          en: "**on ___ evenings** → you need a **day of the week** (on Monday evenings).",
        },
      },
      {
        id: "l2-listen-04-ex04",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Classes are on ___ evenings.",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        correctIndex: 2,
        explanation: {
          vi: "'our beginners' course is on Wednesday evenings' → **Wednesday**. Bạn đã đoán đúng là cần nghe một thứ trong tuần!",
          en: "'our beginners' course is on Wednesday evenings' → **Wednesday**. Your prediction (a day) was right!",
        },
      },
      {
        id: "l2-listen-04-ex05",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Start time: ___",
        options: ["6 pm", "7 pm", "9 pm", "7:30 pm"],
        correctIndex: 1,
        explanation: {
          vi: "'At seven o'clock, and it finishes at nine.' → bắt đầu lúc **7 giờ**. 9 giờ là giờ kết thúc.",
          en: "'At seven o'clock, and it finishes at nine.' → starts at **7 pm**. 9 is the finishing time.",
        },
      },
      {
        id: "l2-listen-04-ex06",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "First class: ___",
        options: ["10th October", "10th November", "2nd October", "12th October"],
        correctIndex: 0,
        explanation: {
          vi: "'The first class is on the tenth of October.' → **10 tháng 10**.",
          en: "'The first class is on the tenth of October.' → **10th October**.",
        },
      },
      {
        id: "l2-listen-04-ex07",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Week 1: soup and ___",
        options: ["bread", "fish", "cake", "salad"],
        correctIndex: 0,
        explanation: {
          vi: "'In the first week, we make soup and bread.' → **bread**. Fish là món học sau.",
          en: "'In the first week, we make soup and bread.' → **bread**. Fish comes later.",
        },
      },
      {
        id: "l2-listen-04-ex08",
        type: 'match-pairs',
        instruction: {
          vi: "Nối mỗi chỗ trống với đáp án phù hợp về loại từ.",
          en: "Match each gap with an answer of the right type.",
        },
        pairs: [
          { left: "Price: £___", right: "95" },
          { left: "Start date: ___", right: "10th October" },
          { left: "Bring an ___", right: "apron" },
          { left: "Address: ___ Street", right: "Castle" },
          { left: "Day: ___", right: "Wednesday" },
        ],
        explanation: {
          vi: "£ → số; date → ngày tháng; an → danh từ bắt đầu bằng nguyên âm; ___ Street → tên riêng; Day → thứ.",
          en: "£ → number; date → a date; an → noun starting with a vowel; ___ Street → a name; Day → a weekday.",
        },
      },
      {
        id: "l2-listen-04-ex09",
        type: 'listen-type',
        audioText: "Just bring an apron.",
        acceptedAnswers: ["Just bring an apron"],
        explanation: {
          vi: "**apron** /ˈeɪ.prən/ = tạp dề. Chú ý dùng **an** vì 'apron' bắt đầu bằng nguyên âm.",
          en: "**apron** /ˈeɪ.prən/. We say **an** because it starts with a vowel sound.",
        },
      },
      {
        id: "l2-listen-04-ex10",
        type: 'fill-blank',
        sentence: "Before you listen, read the gaps and ___ the type of answer.",
        acceptedAnswers: ["predict", "guess"],
        hint: "(đoán trước)",
        explanation: {
          vi: "**predict** = đoán trước. Đây là bước quan trọng nhất trước khi nghe.",
          en: "**predict** = guess before. It's the most important step before you listen.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-04-test01",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Length of course: ___ weeks",
        options: ["six", "two", "nine", "seven"],
        correctIndex: 0,
        explanation: {
          vi: "'And how long is the course?' – 'Six weeks.' → **6 tuần**.",
          en: "'And how long is the course?' – 'Six weeks.'",
        },
      },
      {
        id: "l2-listen-04-test02",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Price: £___",
        options: ["59", "90", "95", "19"],
        correctIndex: 2,
        explanation: {
          vi: "'It's ninety-five pounds for the whole course.' → **£95** cho cả khoá.",
          en: "'It's ninety-five pounds for the whole course.' → **£95**.",
        },
      },
      {
        id: "l2-listen-04-test03",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Where is the school?",
        options: ["Castle Street, next to the bank", "Park Street, opposite the bank", "Castle Road, behind the bank", "Castle Street, opposite the bank"],
        correctIndex: 3,
        explanation: {
          vi: "'We're in Castle Street, opposite the bank.' → **đối diện** ngân hàng, trên phố Castle.",
          en: "'We're in Castle Street, opposite the bank.'",
        },
      },
      {
        id: "l2-listen-04-test04",
        type: 'multiple-choice',
        question: "Gap: 'Meet at the ___ at 9 am.' What type of answer do you expect?",
        options: ["a time", "a place", "a price", "a number"],
        correctIndex: 1,
        explanation: {
          vi: "'at the ___' + đã có giờ (9 am) → cần một **địa điểm** (at the station, at the gate).",
          en: "'at the ___' and the time is already given → you need a **place**.",
        },
      },
      {
        id: "l2-listen-04-test05",
        type: 'multiple-choice',
        question: "Gap: 'Students need two ___.' What type of answer do you expect?",
        options: ["a date", "a singular noun", "a plural noun", "a person's name"],
        correctIndex: 2,
        explanation: {
          vi: "**two** + danh từ **số nhiều** (two photos, two pencils).",
          en: "**two** + a **plural noun** (two photos, two pencils).",
        },
      },
      {
        id: "l2-listen-04-test06",
        type: 'listen-choose',
        audioText: COOKING_CALL,
        question: "Later in the course, students cook ___",
        options: ["meat and pasta", "cakes and bread", "rice and soup", "fish and simple desserts"],
        correctIndex: 3,
        explanation: {
          vi: "'Later we cook fish and simple desserts.' → **cá và món tráng miệng đơn giản**.",
          en: "'Later we cook fish and simple desserts.'",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 5: Điền mẫu đơn — đăng ký phòng gym
  // (Tổng hợp: đoán loại đáp án + đánh vần + số/ngày + bẫy)
  // ==========================================================================
  {
    id: "l2-listen-05",
    skill: 'listening',
    title: { vi: "Điền mẫu đơn: đăng ký phòng gym", en: "Form completion: joining a gym" },
    description: {
      vi: "Luyện trọn vẹn một bài điền form Part 1: đoán, nghe tên, ngày sinh, giá và lựa chọn.",
      en: "Practise a full Part 1 form: predict, then catch a name, a birth date, prices and choices.",
    },
    teachingCards: [
      {
        title: { vi: "Từ vựng phòng gym", en: "Gym words" },
        body: {
          vi: "**join / sign up**: đăng ký tham gia\n**membership**: thẻ hội viên, gói thành viên\n**monthly fee**: phí hằng tháng\n**personal trainer**: huấn luyện viên cá nhân\n**changing room**: phòng thay đồ\n**locker**: tủ đựng đồ có khoá\n**get fit / fitter**: khoẻ hơn, cân đối hơn",
          en: "**join / sign up**: become a member\n**membership**: being a member; a type of plan\n**monthly fee**: money you pay every month\n**personal trainer**: a coach just for you\n**changing room**: where you change clothes\n**locker**: a small cupboard with a lock\n**get fit / fitter**: become healthier",
        },
        examples: [
          { en: "The standard membership is twenty-five pounds a month.", vi: "Gói thành viên thường giá 25 bảng mỗi tháng." },
          { en: "I want to get fitter.", vi: "Tôi muốn khoẻ hơn." },
        ],
      },
      {
        title: { vi: "4 bước làm bài điền form", en: "4 steps for form completion" },
        body: {
          vi: "**1. Đọc** cả form và giới hạn số từ.\n**2. Đoán** loại đáp án cho từng chỗ trống.\n**3. Nghe câu hỏi báo hiệu** của người nói: 'And your date of birth?' → sắp đến đáp án.\n**4. Kiểm tra** chính tả, số từ, và bẫy tự sửa.\nLưu ý: khi có 2 lựa chọn (gói standard và gold), hãy chờ nghe người nói **chọn cái nào**.",
          en: "**1. Read** the whole form and the word limit.\n**2. Predict** the type of answer for each gap.\n**3. Listen for the speaker's question**: 'And your date of birth?' → the answer is coming.\n**4. Check** spelling, word count and corrections.\nNote: when there are two choices (standard and gold), wait to hear **which one** the speaker picks.",
        },
        examples: [
          { en: "I'll take the standard one.", vi: "Tôi sẽ chọn gói thường. (→ đây mới là đáp án)" },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-05-ex01",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "Complete the form. Surname: ___",
        options: ["Okafor", "Okafur", "Ocafor", "Okaffor"],
        correctIndex: 0,
        explanation: {
          vi: "O, K, A, F, O, R → **Okafor**. Chép từng chữ cái, đừng đoán theo âm.",
          en: "O, K, A, F, O, R → **Okafor**. Write each letter; don't guess from the sound.",
        },
      },
      {
        id: "l2-listen-05-ex02",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "Complete the form. Date of birth: ___",
        options: ["3rd May 2006", "13th March 2006", "3rd March 2006", "3rd March 2016"],
        correctIndex: 2,
        explanation: {
          vi: "'The third of March, two thousand and six.' → **3/3/2006**.",
          en: "'The third of March, two thousand and six.' → **3rd March 2006**.",
        },
      },
      {
        id: "l2-listen-05-ex03",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "Complete the form. Type of membership: ___",
        options: ["gold", "standard", "student", "family"],
        correctIndex: 1,
        explanation: {
          vi: "Có 2 gói, nhưng anh ấy chọn: 'I'll take the standard one.' → **standard**.",
          en: "Two choices are mentioned, but he says 'I'll take the standard one.' → **standard**.",
        },
      },
      {
        id: "l2-listen-05-ex04",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "Complete the form. Monthly fee: £___",
        options: ["39", "29", "35", "25"],
        correctIndex: 3,
        explanation: {
          vi: "Gói standard giá **£25**/tháng. £39 là giá gói gold (bẫy).",
          en: "Standard costs **£25** a month. £39 is the gold price (a trap).",
        },
      },
      {
        id: "l2-listen-05-ex05",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "Complete the form. Start date: ___",
        options: ["Sunday 9th", "Monday 19th", "Monday 9th", "Tuesday 9th"],
        correctIndex: 2,
        explanation: {
          vi: "'Next Monday, the ninth.' → **thứ Hai, ngày 9**.",
          en: "'Next Monday, the ninth.' → **Monday 9th**.",
        },
      },
      {
        id: "l2-listen-05-ex06",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "Complete the form. Interested in: ___ classes",
        options: ["swimming", "yoga", "dance", "boxing"],
        correctIndex: 1,
        explanation: {
          vi: "'I'm interested in the yoga classes.' → **yoga**. Anh ấy không thích bơi.",
          en: "'I'm interested in the yoga classes.' → **yoga**. He doesn't like swimming.",
        },
      },
      {
        id: "l2-listen-05-ex07",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ vựng phòng gym với nghĩa tiếng Việt.",
          en: "Match the gym words with their Vietnamese meanings.",
        },
        pairs: [
          { left: "membership", right: "gói hội viên" },
          { left: "monthly fee", right: "phí hằng tháng" },
          { left: "changing room", right: "phòng thay đồ" },
          { left: "locker", right: "tủ có khoá" },
          { left: "personal trainer", right: "huấn luyện viên riêng" },
        ],
        explanation: {
          vi: "Đây là các từ hay gặp trong bài nghe về thể thao, sức khoẻ.",
          en: "These words often appear in listening tasks about sport and health.",
        },
      },
      {
        id: "l2-listen-05-ex08",
        type: 'listen-type',
        audioText: "The monthly fee is twenty-five pounds.",
        acceptedAnswers: [
          "The monthly fee is twenty-five pounds",
          "The monthly fee is twenty five pounds",
          "The monthly fee is 25 pounds",
          "The monthly fee is £25",
        ],
        explanation: {
          vi: "**monthly fee** = phí hằng tháng; 'twenty-five pounds' = **£25**.",
          en: "**monthly fee**; 'twenty-five pounds' = **£25**.",
        },
      },
      {
        id: "l2-listen-05-ex09",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "True, False or Not Given? 'The man chooses the gold membership because he loves swimming.'",
        options: ["True", "False", "Not Given"],
        correctIndex: 1,
        explanation: {
          vi: "Sai. Anh ấy chọn gói **standard** và nói 'I don't really like swimming' (tôi không thích bơi lắm).",
          en: "False. He chooses **standard** and says 'I don't really like swimming'.",
        },
      },
      {
        id: "l2-listen-05-ex10",
        type: 'fill-blank',
        sentence: "Hi, I'd like to ___ the gym.",
        acceptedAnswers: ["join"],
        hint: "(tham gia, đăng ký)",
        explanation: {
          vi: "**join the gym** = đăng ký tập ở phòng gym.",
          en: "**join the gym** = become a member of the gym.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-05-test01",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "When are the yoga classes?",
        options: ["Mondays and Wednesdays", "Tuesdays and Fridays", "Saturdays only", "Tuesdays and Thursdays"],
        correctIndex: 3,
        explanation: {
          vi: "'Yoga is on Tuesdays and Thursdays at six.' → **thứ Ba và thứ Năm**.",
          en: "'Yoga is on Tuesdays and Thursdays at six.'",
        },
      },
      {
        id: "l2-listen-05-test02",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "What time do the yoga classes start?",
        options: ["6 o'clock", "7 o'clock", "9 o'clock", "half past six"],
        correctIndex: 0,
        explanation: {
          vi: "'...at six.' → **6 giờ**.",
          en: "'...at six.' → **6 o'clock**.",
        },
      },
      {
        id: "l2-listen-05-test03",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "What must the man bring for his membership card?",
        options: ["a towel", "a photo", "his passport", "some money"],
        correctIndex: 1,
        explanation: {
          vi: "'Please bring a photo for your membership card.' → **một tấm ảnh**.",
          en: "'Please bring a photo for your membership card.'",
        },
      },
      {
        id: "l2-listen-05-test04",
        type: 'listen-choose',
        audioText: GYM_CALL,
        question: "How did the man hear about the gym?",
        options: ["from an advert", "from the website", "from a friend", "from a leaflet"],
        correctIndex: 2,
        explanation: {
          vi: "'A friend told me about you.' → **từ một người bạn**.",
          en: "'A friend told me about you.' → **from a friend**.",
        },
      },
      {
        id: "l2-listen-05-test05",
        type: 'listen-type',
        audioText: "I'd like to join the gym.",
        acceptedAnswers: ["I'd like to join the gym", "I would like to join the gym"],
        explanation: {
          vi: "**I'd like to join...** = Tôi muốn đăng ký tham gia...",
          en: "**I'd like to join...** = I want to become a member of...",
        },
      },
      {
        id: "l2-listen-05-test06",
        type: 'listen-choose',
        audioText: "Woman: Is that a student membership? Man: No, I finished university last year. Just a normal adult one, please.",
        question: "Membership type: ___",
        options: ["student", "adult", "child", "family"],
        correctIndex: 1,
        explanation: {
          vi: "'student' là bẫy — anh ấy nói 'No... Just a normal adult one' → **adult**.",
          en: "'student' is the trap — he says 'No... Just a normal adult one' → **adult**.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Bắt từ khoá — gọi điện đặt lịch khám bác sĩ
  // (Gạch chân từ khoá trong câu hỏi, chú ý từ báo hiệu như "but")
  // ==========================================================================
  {
    id: "l2-listen-06",
    skill: 'listening',
    title: { vi: "Bắt từ khoá: đặt lịch khám bác sĩ", en: "Catching key words: a doctor's appointment" },
    description: {
      vi: "Tìm từ khoá trong câu hỏi và nghe chúng trong cuộc gọi đặt lịch khám bệnh.",
      en: "Find key words in questions and listen for them in a call to book a doctor's appointment.",
    },
    teachingCards: [
      {
        title: { vi: "Từ khoá là gì?", en: "What are key words?" },
        body: {
          vi: "**Từ khoá** là những từ mang thông tin chính trong câu hỏi: danh từ, động từ chính, số, thời gian, và từ phủ định (**not, never, can't**).\nVD: 'What should the woman **bring** to the appointment?' → từ khoá: **bring**.\nKhi nghe thấy từ khoá (hoặc từ cùng nghĩa), đáp án thường ở **ngay gần đó**.",
          en: "**Key words** carry the main information in a question: nouns, main verbs, numbers, time words and negatives (**not, never, can't**).\nE.g. 'What should the woman **bring** to the appointment?' → key word: **bring**.\nWhen you hear the key word (or a word with the same meaning), the answer is usually **close by**.",
        },
        examples: [
          { en: "Why can't the woman see Doctor Patel?", vi: "Từ khoá: why, can't, Doctor Patel" },
        ],
      },
      {
        title: { vi: "Từ báo hiệu: but, actually, so", en: "Signal words: but, actually, so" },
        body: {
          vi: "**but / however** → thông tin sắp **thay đổi** hoặc trái ngược.\n**actually** → sửa lại điều vừa nói.\n**so / because** → lý do, kết quả.\nVD: 'I usually go on Fridays, **but** this week I'm going on Saturday.' → đáp án: Saturday.",
          en: "**but / however** → the information is going to **change**.\n**actually** → correcting what was just said.\n**so / because** → reason or result.\nE.g. 'I usually go on Fridays, **but** this week I'm going on Saturday.' → answer: Saturday.",
        },
        examples: [
          { en: "I work in the mornings, so is there anything in the afternoon?", vi: "Tôi làm việc buổi sáng, nên có lịch buổi chiều không?" },
        ],
      },
      {
        title: { vi: "Từ vựng đi khám bệnh", en: "Health and doctor words" },
        body: {
          vi: "**make an appointment**: đặt lịch hẹn\n**medical centre**: phòng khám\n**cough**: ho\n**sore throat**: đau họng\n**temperature / fever**: sốt\n**headache / stomach ache**: đau đầu / đau bụng\n**medicine**: thuốc",
          en: "**make an appointment**: book a time to see someone\n**medical centre**: a place with doctors\n**cough**\n**sore throat**\n**temperature / fever**: your body is too hot\n**headache / stomach ache**\n**medicine**: something you take to get better",
        },
        examples: [
          { en: "I've got a bad cough and a sore throat.", vi: "Tôi bị ho nặng và đau họng." },
          { en: "Do you have a temperature?", vi: "Bạn có bị sốt không?" },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-06-ex01",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "What is the woman's problem?",
        options: ["a headache and a cough", "a cough and a sore throat", "a temperature and a sore throat", "a stomach ache"],
        correctIndex: 1,
        explanation: {
          vi: "'I've got a bad cough and a sore throat.' → **ho và đau họng**. Cô ấy không bị sốt.",
          en: "'I've got a bad cough and a sore throat.' She doesn't have a temperature.",
        },
      },
      {
        id: "l2-listen-06-ex02",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "How long has she had the problem?",
        options: ["two days", "a week", "fifteen days", "about five days"],
        correctIndex: 3,
        explanation: {
          vi: "'I've had it for about five days.' → **khoảng 5 ngày**.",
          en: "'I've had it for about five days.'",
        },
      },
      {
        id: "l2-listen-06-ex03",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "Which doctor is she going to see?",
        options: ["Doctor Patel", "Doctor Lopez", "Doctor Wilson", "Doctor Hill"],
        correctIndex: 2,
        explanation: {
          vi: "Lịch của Doctor Patel là buổi sáng nên cô ấy không đi được. Cô ấy gặp **Doctor Wilson** buổi chiều. (Lopez là tên của cô ấy.)",
          en: "Doctor Patel is in the morning, so she can't go. She sees **Doctor Wilson**. (Lopez is her own name.)",
        },
      },
      {
        id: "l2-listen-06-ex04",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "Appointment time: ___",
        options: ["9:15", "4:20", "4:40", "2:20"],
        correctIndex: 1,
        explanation: {
          vi: "9:15 là lịch bị từ chối. 'Doctor Wilson can see you at twenty past four.' → **4:20**.",
          en: "9:15 is refused. 'Doctor Wilson can see you at twenty past four.' → **4:20**.",
        },
      },
      {
        id: "l2-listen-06-ex05",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "Why can't the woman see Doctor Patel?",
        options: ["She works in the mornings.", "She doesn't like him.", "The medical centre is closed.", "She is busy in the afternoon."],
        correctIndex: 0,
        explanation: {
          vi: "'Oh, I'm sorry, I work in the mornings.' → cô ấy **đi làm buổi sáng**.",
          en: "'Oh, I'm sorry, I work in the mornings.'",
        },
      },
      {
        id: "l2-listen-06-ex06",
        type: 'multiple-choice',
        question: "Question: 'What should the woman BRING to the appointment?' Which is the most important key word?",
        options: ["What", "the woman", "bring", "the"],
        correctIndex: 2,
        explanation: {
          vi: "**bring** (mang theo) là thông tin chính. Khi nghe 'bring...', đáp án ở ngay sau.",
          en: "**bring** is the main information. When you hear 'bring...', the answer comes next.",
        },
      },
      {
        id: "l2-listen-06-ex07",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ vựng sức khoẻ với nghĩa tiếng Việt.",
          en: "Match the health words with their Vietnamese meanings.",
        },
        pairs: [
          { left: "cough", right: "ho" },
          { left: "sore throat", right: "đau họng" },
          { left: "temperature", right: "sốt" },
          { left: "headache", right: "đau đầu" },
          { left: "appointment", right: "lịch hẹn" },
          { left: "medicine", right: "thuốc" },
        ],
        explanation: {
          vi: "Lưu ý: 'have a temperature' nghĩa là bị sốt, không chỉ là 'có nhiệt độ'.",
          en: "Note: 'have a temperature' means your body is too hot (a fever).",
        },
      },
      {
        id: "l2-listen-06-ex08",
        type: 'listen-type',
        audioText: "I've got a sore throat.",
        acceptedAnswers: ["I've got a sore throat", "I have got a sore throat", "Ive got a sore throat"],
        explanation: {
          vi: "**I've got a...** dùng để nói mình bị bệnh gì: I've got a cold / a headache.",
          en: "**I've got a...** is used for illnesses: I've got a cold / a headache.",
        },
      },
      {
        id: "l2-listen-06-ex09",
        type: 'listen-choose',
        audioText: "Man: I usually go to the doctor's on Fridays, but this week I'm going on Saturday morning.",
        question: "When is he going this week?",
        options: ["Friday", "Sunday", "Saturday", "Thursday"],
        correctIndex: 2,
        explanation: {
          vi: "Từ **but** báo hiệu thay đổi: tuần này anh ấy đi vào **thứ Bảy**.",
          en: "**but** signals a change: this week he's going on **Saturday**.",
        },
      },
      {
        id: "l2-listen-06-ex10",
        type: 'fill-blank',
        sentence: "Please arrive ten minutes ___.",
        acceptedAnswers: ["early"],
        hint: "(sớm)",
        explanation: {
          vi: "**arrive early** = đến sớm. Người tiếp tân dặn cô ấy đến sớm 10 phút.",
          en: "**arrive early** = come before the time.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-06-test01",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "Patient's date of birth: ___",
        options: ["12th November 1992", "12th December 1992", "20th November 1992", "12th November 1982"],
        correctIndex: 0,
        explanation: {
          vi: "'The twelfth of November, nineteen ninety-two.' → **12/11/1992**.",
          en: "'The twelfth of November, nineteen ninety-two.'",
        },
      },
      {
        id: "l2-listen-06-test02",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "Does the woman have a temperature?",
        options: ["Yes, a very high one.", "She doesn't think so.", "Yes, since yesterday.", "The receptionist doesn't ask."],
        correctIndex: 1,
        explanation: {
          vi: "'Do you have a temperature?' – 'No, I don't think so.' → cô ấy **nghĩ là không**.",
          en: "'Do you have a temperature?' – 'No, I don't think so.'",
        },
      },
      {
        id: "l2-listen-06-test03",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "What should the woman bring?",
        options: ["her passport", "some money", "a letter from work", "a list of the medicine she takes"],
        correctIndex: 3,
        explanation: {
          vi: "'...bring a list of any medicine you are taking.' → **danh sách thuốc** đang dùng.",
          en: "'...bring a list of any medicine you are taking.'",
        },
      },
      {
        id: "l2-listen-06-test04",
        type: 'listen-choose',
        audioText: DOCTOR_CALL,
        question: "Name of the medical centre: ___",
        options: ["Hilltop", "Riverside", "Hillside", "Highfield"],
        correctIndex: 2,
        explanation: {
          vi: "'Good morning, Hillside Medical Centre.' → **Hillside**.",
          en: "'Good morning, Hillside Medical Centre.'",
        },
      },
      {
        id: "l2-listen-06-test05",
        type: 'listen-type',
        audioText: "I'd like to make an appointment.",
        acceptedAnswers: ["I'd like to make an appointment", "I would like to make an appointment"],
        explanation: {
          vi: "**make an appointment** = đặt lịch hẹn (với bác sĩ, nha sĩ...).",
          en: "**make an appointment** = book a time with a doctor, dentist, etc.",
        },
      },
      {
        id: "l2-listen-06-test06",
        type: 'multiple-choice',
        question: "Which word often tells you that the information is going to change?",
        options: ["but", "and", "also", "too"],
        correctIndex: 0,
        explanation: {
          vi: "**but** báo hiệu ý trái ngược / thay đổi → thông tin sau 'but' thường là đáp án.",
          en: "**but** signals a contrast or change → the information after it is often the answer.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Trắc nghiệm và paraphrase
  // (Bài nghe dùng từ KHÁC với câu hỏi nhưng cùng nghĩa)
  // ==========================================================================
  {
    id: "l2-listen-07",
    skill: 'listening',
    title: { vi: "Trắc nghiệm và paraphrase", en: "Multiple choice and paraphrase" },
    description: {
      vi: "Nhận ra cùng một ý được nói bằng từ khác nhau để chọn đúng đáp án trắc nghiệm.",
      en: "Recognise the same idea in different words to choose the right multiple-choice answer.",
    },
    teachingCards: [
      {
        title: { vi: "Paraphrase là gì?", en: "What is paraphrase?" },
        body: {
          vi: "**Paraphrase** = nói cùng một ý bằng từ khác.\nTrong IELTS, đáp án đúng thường **không dùng đúng từ** trong bài nghe.\n**expensive** ↔ costs a lot\n**ten days** ↔ a week and a half\n**train** ↔ rail\n**walking in the countryside** ↔ hiking\n**near the sea** ↔ on the coast",
          en: "**Paraphrase** = saying the same idea in different words.\nIn IELTS, the right option often **doesn't use the same words** as the recording.\n**expensive** ↔ costs a lot\n**ten days** ↔ a week and a half\n**train** ↔ rail\n**walking in the countryside** ↔ hiking\n**near the sea** ↔ on the coast",
        },
        examples: [
          { en: "Flights are really expensive. = Flying costs too much.", vi: "Vé máy bay rất đắt. = Đi máy bay tốn quá nhiều tiền." },
        ],
      },
      {
        title: { vi: "Bẫy trong câu trắc nghiệm", en: "Multiple-choice traps" },
        body: {
          vi: "Bài nghe thường **nhắc đến cả 3-4 phương án**, nhưng chỉ có 1 cái đúng.\nVD: 'I thought about flying, but... the bus takes too long, so I'm going to take the train.'\n→ plane, bus, train đều được nhắc, nhưng đáp án là **train**.\nMẹo: đọc câu hỏi và gạch chân từ khoá trước, nghĩ sẵn các từ đồng nghĩa.",
          en: "The recording often **mentions all 3-4 options**, but only one is right.\nE.g. 'I thought about flying, but... the bus takes too long, so I'm going to take the train.'\n→ plane, bus and train are all mentioned, but the answer is **train**.\nTip: read the question, underline key words and think of synonyms first.",
        },
        examples: [
          { en: "I wanted to buy her a book, but... so I'm taking some coffee.", vi: "Tôi định mua sách, nhưng... nên tôi mang cà phê. (→ đáp án: cà phê)" },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-07-ex01",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "How is Tom going to travel?",
        options: ["by plane", "by bus", "by car", "by rail"],
        correctIndex: 3,
        explanation: {
          vi: "Máy bay đắt, xe buýt lâu → 'I'm going to take the train.' **train = rail** (đường sắt).",
          en: "Planes are expensive and the bus is slow → 'I'm going to take the train.' **train = rail**.",
        },
      },
      {
        id: "l2-listen-07-ex02",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "Why doesn't Tom fly?",
        options: ["It costs too much.", "It takes too long.", "He is afraid of flying.", "There are no flights."],
        correctIndex: 0,
        explanation: {
          vi: "'flights are really expensive' = **It costs too much**. 'Takes too long' là nói về xe buýt.",
          en: "'flights are really expensive' = **It costs too much**. 'Takes too long' is about the bus.",
        },
      },
      {
        id: "l2-listen-07-ex03",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "How long is Tom going to stay?",
        options: ["about a week", "a month", "a week and a half", "two weeks"],
        correctIndex: 2,
        explanation: {
          vi: "'Ten days' = **a week and a half** (7 + 3,5 ≈ 10 ngày). Đây là paraphrase.",
          en: "'Ten days' = **a week and a half**. This is a paraphrase.",
        },
      },
      {
        id: "l2-listen-07-ex04",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "What are Tom and his cousin going to do?",
        options: ["go swimming", "go hiking by the sea", "go shopping", "visit museums"],
        correctIndex: 1,
        explanation: {
          vi: "'go walking along the coast' = **go hiking by the sea**.",
          en: "'go walking along the coast' = **go hiking by the sea**.",
        },
      },
      {
        id: "l2-listen-07-ex05",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "What present is Tom taking for his cousin?",
        options: ["some coffee", "a book", "a new phone", "some tea"],
        correctIndex: 0,
        explanation: {
          vi: "Anh ấy định mua sách **nhưng** cô ấy đọc trên điện thoại → 'So I'm taking some Vietnamese coffee.'",
          en: "He wanted to buy a book, **but** she reads on her phone → 'So I'm taking some Vietnamese coffee.'",
        },
      },
      {
        id: "l2-listen-07-ex06",
        type: 'match-pairs',
        instruction: {
          vi: "Nối mỗi cụm với cụm có cùng nghĩa (paraphrase).",
          en: "Match each phrase with its paraphrase.",
        },
        pairs: [
          { left: "expensive", right: "costs a lot" },
          { left: "ten days", right: "a week and a half" },
          { left: "every day", right: "daily" },
          { left: "by train", right: "by rail" },
          { left: "near the sea", right: "on the coast" },
          { left: "begin", right: "start" },
        ],
        explanation: {
          vi: "Học từ theo cặp đồng nghĩa giúp bạn nhận ra paraphrase nhanh hơn.",
          en: "Learning words in synonym pairs helps you spot paraphrases faster.",
        },
      },
      {
        id: "l2-listen-07-ex07",
        type: 'multiple-choice',
        question: "A question says 'cheap'. Which phrase in the recording could mean the same?",
        options: ["is very expensive", "is very busy", "is quite far", "doesn't cost much"],
        correctIndex: 3,
        explanation: {
          vi: "**cheap** (rẻ) = **doesn't cost much** (không tốn nhiều tiền).",
          en: "**cheap** = **doesn't cost much**.",
        },
      },
      {
        id: "l2-listen-07-ex08",
        type: 'listen-choose',
        audioText: "Woman: I don't usually cook at home. I have lunch in the canteen at work.",
        question: "Where does the woman usually eat lunch?",
        options: ["at home", "at her workplace", "in a restaurant", "at a friend's house"],
        correctIndex: 1,
        explanation: {
          vi: "'in the canteen at work' (căng tin ở chỗ làm) = **at her workplace**.",
          en: "'in the canteen at work' = **at her workplace**.",
        },
      },
      {
        id: "l2-listen-07-ex09",
        type: 'listen-type',
        audioText: "Flights are really expensive in July.",
        acceptedAnswers: ["Flights are really expensive in July"],
        explanation: {
          vi: "**flights** = các chuyến bay; **really expensive** = rất đắt.",
          en: "**flights**; **really expensive** = very expensive.",
        },
      },
      {
        id: "l2-listen-07-ex10",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "What does Tom say about the weather there in summer?",
        options: ["It is very hot.", "There is less rain than at other times.", "It rains all the time.", "It is very cold."],
        correctIndex: 1,
        explanation: {
          vi: "'it doesn't rain as much in summer' = **mưa ít hơn** những lúc khác. Anh ấy nói 'never very hot', nên không phải A.",
          en: "'it doesn't rain as much in summer' = **less rain**. He says it's 'never very hot', so not A.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-07-test01",
        type: 'listen-choose',
        audioText: "Man: I go swimming on Mondays, Wednesdays and Fridays, but never at the weekend.",
        question: "How often does the man go swimming?",
        options: ["once a week", "every day", "three times a week", "only at the weekend"],
        correctIndex: 2,
        explanation: {
          vi: "Thứ Hai, Tư, Sáu = **three times a week** (3 lần/tuần).",
          en: "Monday, Wednesday and Friday = **three times a week**.",
        },
      },
      {
        id: "l2-listen-07-test02",
        type: 'listen-choose',
        audioText: "Woman: The museum is free for students, but adults pay six pounds.",
        question: "Who doesn't have to pay?",
        options: ["adults", "children under six", "nobody", "students"],
        correctIndex: 3,
        explanation: {
          vi: "'free for students' = sinh viên **không phải trả tiền**.",
          en: "'free for students' = students **don't have to pay**.",
        },
      },
      {
        id: "l2-listen-07-test03",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "Where does Tom's cousin live?",
        options: ["in the city centre", "in the mountains", "near an airport", "on the coast"],
        correctIndex: 3,
        explanation: {
          vi: "'My cousin lives near the sea' = **on the coast** (ở vùng ven biển).",
          en: "'My cousin lives near the sea' = **on the coast**.",
        },
      },
      {
        id: "l2-listen-07-test04",
        type: 'listen-choose',
        audioText: HOLIDAY_CHAT,
        question: "Why doesn't Tom buy his cousin a book?",
        options: ["Books are too expensive.", "She doesn't like reading.", "She uses her phone to read.", "The bookshop is closed."],
        correctIndex: 2,
        explanation: {
          vi: "'she reads everything on her phone now' = **She uses her phone to read**. Cô ấy vẫn thích đọc, nên B sai.",
          en: "'she reads everything on her phone now' = **She uses her phone to read**. She still reads, so B is wrong.",
        },
      },
      {
        id: "l2-listen-07-test05",
        type: 'multiple-choice',
        question: "'I'm crazy about football.' means...",
        options: ["I love football.", "I hate football.", "I play football badly.", "I don't know much about football."],
        correctIndex: 0,
        explanation: {
          vi: "**be crazy about** = rất thích, mê → **I love football**.",
          en: "**be crazy about** = love very much.",
        },
      },
      {
        id: "l2-listen-07-test06",
        type: 'listen-type',
        audioText: "I'm going to take the train.",
        acceptedAnswers: ["I'm going to take the train", "I am going to take the train", "Im going to take the train"],
        explanation: {
          vi: "**be going to** + động từ = kế hoạch đã quyết định: Tôi sẽ đi tàu.",
          en: "**be going to** + verb = a plan you have already decided.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Bản đồ và chỉ đường
  // (IELTS Part 2 hay có dạng "map labelling": nghe mô tả, tìm vị trí)
  // ==========================================================================
  {
    id: "l2-listen-08",
    skill: 'listening',
    title: { vi: "Bản đồ và chỉ đường", en: "Maps and directions" },
    description: {
      vi: "Nắm từ chỉ vị trí và chỉ đường để làm dạng bài bản đồ trong IELTS Part 2.",
      en: "Learn place and direction language for IELTS Part 2 map tasks.",
    },
    teachingCards: [
      {
        title: { vi: "Giới từ chỉ vị trí", en: "Prepositions of place" },
        body: {
          vi: "**next to**: bên cạnh\n**opposite**: đối diện\n**between A and B**: ở giữa A và B\n**behind**: phía sau\n**in front of**: phía trước\n**on the corner (of)**: ở góc đường\n**at the end of**: ở cuối (con đường)\n**on your left / right**: bên tay trái / phải",
          en: "**next to**: beside\n**opposite**: facing, on the other side\n**between A and B**\n**behind**\n**in front of**\n**on the corner (of)**\n**at the end of** (a road)\n**on your left / right**",
        },
        examples: [
          { en: "The café is next to the playground.", vi: "Quán cà phê ở cạnh sân chơi." },
          { en: "The bank is between the café and the cinema.", vi: "Ngân hàng ở giữa quán cà phê và rạp chiếu phim." },
        ],
      },
      {
        title: { vi: "Chỉ đường", en: "Giving directions" },
        body: {
          vi: "**go straight on / straight ahead**: đi thẳng\n**turn left / right**: rẽ trái / phải\n**take the second turning on the left**: rẽ vào ngã rẽ thứ hai bên trái\n**go past**: đi qua (không dừng)\n**cross the road**: băng qua đường\n**at the traffic lights**: ở chỗ đèn giao thông",
          en: "**go straight on / straight ahead**\n**turn left / right**\n**take the second turning on the left**\n**go past**: walk by something\n**cross the road**\n**at the traffic lights**",
        },
        examples: [
          { en: "Go past the car park and you'll find the tennis courts.", vi: "Đi qua bãi đỗ xe là bạn sẽ thấy sân tennis." },
        ],
      },
      {
        title: { vi: "Mẹo làm bài bản đồ", en: "Map task tips" },
        body: {
          vi: "1. Tìm **điểm bắt đầu** trên bản đồ (You are here / main gate / entrance).\n2. Xác định hướng: **north** (bắc, thường ở trên), **south** (nam), **east** (đông), **west** (tây).\n3. Nghe từng địa điểm theo thứ tự và **đi theo bằng ngón tay**.\n4. Chú ý giới từ: 'next to' và 'opposite' cho đáp án rất khác nhau!",
          en: "1. Find the **starting point** (You are here / main gate / entrance).\n2. Check the directions: **north** (usually at the top), **south**, **east**, **west**.\n3. Follow each place in order **with your finger**.\n4. Listen carefully to prepositions: 'next to' and 'opposite' give very different answers!",
        },
      },
    ],
    exercises: [
      {
        id: "l2-listen-08-ex01",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ chỉ vị trí với nghĩa tiếng Việt.",
          en: "Match the place words with their Vietnamese meanings.",
        },
        pairs: [
          { left: "next to", right: "bên cạnh" },
          { left: "opposite", right: "đối diện" },
          { left: "between", right: "ở giữa" },
          { left: "behind", right: "phía sau" },
          { left: "in front of", right: "phía trước" },
          { left: "on the corner", right: "ở góc đường" },
        ],
        explanation: {
          vi: "Đây là các từ quan trọng nhất trong dạng bài bản đồ.",
          en: "These are the most important words for map tasks.",
        },
      },
      {
        id: "l2-listen-08-ex02",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "Where is the lake?",
        options: ["next to the car park", "behind the toilets", "straight ahead of the main gate", "opposite the tennis courts"],
        correctIndex: 2,
        explanation: {
          vi: "'Straight ahead of you is the lake.' → hồ nằm **thẳng phía trước** cổng chính.",
          en: "'Straight ahead of you is the lake.'",
        },
      },
      {
        id: "l2-listen-08-ex03",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "The café is ___",
        options: ["next to the children's playground", "behind the toilets", "opposite the car park", "next to the gift shop"],
        correctIndex: 0,
        explanation: {
          vi: "'The café is on the right of the lake, next to the children's playground.'",
          en: "'The café is on the right of the lake, next to the children's playground.'",
        },
      },
      {
        id: "l2-listen-08-ex04",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "Where are the toilets?",
        options: ["in front of the café", "behind the café", "next to the main gate", "in the car park"],
        correctIndex: 1,
        explanation: {
          vi: "'If you need the toilets, they are behind the café.' → **phía sau** quán cà phê.",
          en: "'...they are behind the café.'",
        },
      },
      {
        id: "l2-listen-08-ex05",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "How do you get to the tennis courts?",
        options: ["Walk around the lake.", "Go behind the café.", "Turn right at the main gate.", "Go past the car park."],
        correctIndex: 3,
        explanation: {
          vi: "Bãi đỗ xe ở bên trái cổng chính; 'Go past the car park and you'll find the tennis courts.'",
          en: "'Go past the car park and you'll find the tennis courts.'",
        },
      },
      {
        id: "l2-listen-08-ex06",
        type: 'listen-choose',
        audioText: "Man: Excuse me, where's the bank? Woman: Go straight on and take the second turning on the left. The bank is on your right, opposite the post office.",
        question: "Which turning should the man take?",
        options: ["the first on the left", "the second on the left", "the second on the right", "the first on the right"],
        correctIndex: 1,
        explanation: {
          vi: "'take the second turning on the left' → **ngã rẽ thứ hai bên trái**. 'on your right' là vị trí của ngân hàng, không phải hướng rẽ.",
          en: "'take the second turning on the left'. 'on your right' is where the bank is, not the turning.",
        },
      },
      {
        id: "l2-listen-08-ex07",
        type: 'listen-choose',
        audioText: "Man: Excuse me, where's the bank? Woman: Go straight on and take the second turning on the left. The bank is on your right, opposite the post office.",
        question: "What is opposite the bank?",
        options: ["the station", "the supermarket", "the library", "the post office"],
        correctIndex: 3,
        explanation: {
          vi: "'The bank is on your right, opposite the post office.' → **bưu điện**.",
          en: "'...opposite the post office.'",
        },
      },
      {
        id: "l2-listen-08-ex08",
        type: 'listen-type',
        audioText: "Turn left at the traffic lights.",
        acceptedAnswers: ["Turn left at the traffic lights"],
        explanation: {
          vi: "**traffic lights** = đèn giao thông (luôn ở dạng số nhiều).",
          en: "**traffic lights** is always plural.",
        },
      },
      {
        id: "l2-listen-08-ex09",
        type: 'fill-blank',
        sentence: "The bank is ___ the café and the cinema.",
        acceptedAnswers: ["between"],
        hint: "(ở giữa)",
        explanation: {
          vi: "**between A and B** = ở giữa A và B.",
          en: "**between A and B** = in the middle of A and B.",
        },
      },
      {
        id: "l2-listen-08-ex10",
        type: 'multiple-choice',
        question: "On most maps, the top of the map is ___",
        options: ["south", "east", "north", "west"],
        correctIndex: 2,
        explanation: {
          vi: "Thông thường phía trên bản đồ là **north** (bắc). Đề IELTS hay có mũi tên chỉ hướng bắc.",
          en: "Usually the top of a map is **north**. IELTS maps often have an arrow showing north.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-08-test01",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "The main gate is on the ___ side of the park.",
        options: ["north", "south", "east", "west"],
        correctIndex: 1,
        explanation: {
          vi: "'We're standing at the main gate, on the south side of the park.' → phía **nam**.",
          en: "'...the main gate, on the south side of the park.'",
        },
      },
      {
        id: "l2-listen-08-test02",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "Where can you hire a boat?",
        options: ["at the lake", "at the gift shop", "at the café", "at the car park"],
        correctIndex: 0,
        explanation: {
          vi: "'...the lake. You can hire a boat there in summer.' → thuê thuyền **ở hồ** (vào mùa hè).",
          en: "'...the lake. You can hire a boat there in summer.'",
        },
      },
      {
        id: "l2-listen-08-test03",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "The gift shop is ___",
        options: ["next to the playground", "behind the tennis courts", "at the main gate", "opposite the café"],
        correctIndex: 3,
        explanation: {
          vi: "'the gift shop is opposite the café, on the other side of the lake.' → **đối diện** quán cà phê.",
          en: "'the gift shop is opposite the café, on the other side of the lake.'",
        },
      },
      {
        id: "l2-listen-08-test04",
        type: 'listen-choose',
        audioText: PARK_MAP,
        question: "Gift shop opening hours: ___",
        options: ["9 to 5", "10 to 6", "10 to 5", "10 to 4"],
        correctIndex: 2,
        explanation: {
          vi: "'It's open from ten until five every day.' → **10 giờ đến 5 giờ**.",
          en: "'It's open from ten until five every day.'",
        },
      },
      {
        id: "l2-listen-08-test05",
        type: 'listen-choose',
        audioText: "Woman: Cross the road at the traffic lights. The museum is on the corner, next to a big hotel.",
        question: "Where is the museum?",
        options: ["on the corner, next to a hotel", "between two hotels", "behind the traffic lights", "at the end of the road"],
        correctIndex: 0,
        explanation: {
          vi: "'The museum is on the corner, next to a big hotel.' → ở **góc đường, cạnh khách sạn**.",
          en: "'The museum is on the corner, next to a big hotel.'",
        },
      },
      {
        id: "l2-listen-08-test06",
        type: 'arrange-words',
        translationVi: "Đi thẳng rồi rẽ phải.",
        correctSentence: "Go straight on and turn right.",
        extraWords: ["in", "the"],
        explanation: {
          vi: "**Go straight on** = đi thẳng; **turn right** = rẽ phải (không dùng 'the' trước right).",
          en: "**Go straight on**, then **turn right** (no 'the' before right).",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Bài nói ngắn kiểu Part 2 — tham quan nông trại
  // (1 người nói, có từ nối First / After that / Finally; ôn there was/were, be going to)
  // ==========================================================================
  {
    id: "l2-listen-09",
    skill: 'listening',
    title: { vi: "Bài nói ngắn: tham quan nông trại", en: "A short talk: a farm tour" },
    description: {
      vi: "Nghe một hướng dẫn viên giới thiệu chuyến tham quan — dạng bài độc thoại IELTS Part 2.",
      en: "Listen to a guide introducing a tour — an IELTS Part 2 style monologue.",
    },
    teachingCards: [
      {
        title: { vi: "Part 2: một người nói", en: "Part 2: one speaker" },
        body: {
          vi: "IELTS Listening **Part 2** là **bài nói của 1 người** về chủ đề đời sống: hướng dẫn viên du lịch, thông báo ở trung tâm thể thao, giới thiệu sự kiện...\nVì chỉ có một giọng nói, bạn cần dựa vào **từ nối** để biết người nói đang chuyển sang ý mới.",
          en: "IELTS Listening **Part 2** is **one person talking** about everyday life: a tour guide, an announcement at a sports centre, information about an event...\nThere is only one voice, so use **signpost words** to know when the speaker moves to a new point.",
        },
      },
      {
        title: { vi: "Từ nối (signposts)", en: "Signpost words" },
        body: {
          vi: "**First, ...** – Đầu tiên\n**After that, ... / Then, ...** – Sau đó\n**Finally, ...** – Cuối cùng\n**In the past, ...** – Ngày xưa\n**Please remember ...** – Xin hãy nhớ (thường là quy định quan trọng!)\nNgữ pháp hay gặp: **there was / there were** (quá khứ) và **be going to** (kế hoạch).",
          en: "**First, ...**\n**After that, ... / Then, ...**\n**Finally, ...**\n**In the past, ...**\n**Please remember ...** (often an important rule!)\nCommon grammar: **there was / there were** (past) and **be going to** (plans).",
        },
        examples: [
          { en: "In the past, there were only cows here.", vi: "Ngày xưa ở đây chỉ có bò." },
          { en: "First, we're going to visit the animals.", vi: "Đầu tiên, chúng ta sẽ đi thăm các con vật." },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-09-ex01",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "What is the guide's name?",
        options: ["Sandra", "Sarah", "Sally", "Susan"],
        correctIndex: 1,
        explanation: {
          vi: "'My name is Sarah and I'm going to be your guide today.'",
          en: "'My name is Sarah and I'm going to be your guide today.'",
        },
      },
      {
        id: "l2-listen-09-ex02",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "How old is the farm?",
        options: ["about 100 years old", "about 20 years old", "about 300 years old", "more than 200 years old"],
        correctIndex: 3,
        explanation: {
          vi: "'The farm is over two hundred years old.' **over** = **more than** (hơn).",
          en: "'The farm is over two hundred years old.' **over** = **more than**.",
        },
      },
      {
        id: "l2-listen-09-ex03",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "In the past, the farm only had ___",
        options: ["sheep", "goats", "cows", "chickens"],
        correctIndex: 2,
        explanation: {
          vi: "'In the past, there were only cows here' → ngày xưa chỉ có **bò**.",
          en: "'In the past, there were only cows here'.",
        },
      },
      {
        id: "l2-listen-09-ex04",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "How long is the tour?",
        options: ["one hour", "an hour and a half", "two hours", "nineteen minutes"],
        correctIndex: 1,
        explanation: {
          vi: "'about ninety minutes' = **an hour and a half** (1 tiếng rưỡi). Đây là paraphrase.",
          en: "'about ninety minutes' = **an hour and a half**. A paraphrase!",
        },
      },
      {
        id: "l2-listen-09-ex05",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "What can visitors do in the vegetable garden?",
        options: ["pick strawberries", "feed the chickens", "buy vegetables", "plant flowers"],
        correctIndex: 0,
        explanation: {
          vi: "'You can pick some strawberries there and take them home.' → **hái dâu tây**.",
          en: "'You can pick some strawberries there and take them home.'",
        },
      },
      {
        id: "l2-listen-09-ex06",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "What is cheaper for tour visitors today?",
        options: ["eggs", "milk", "strawberries", "cheese"],
        correctIndex: 3,
        explanation: {
          vi: "'Our cheese is very popular, and it's ten percent cheaper for visitors on the tour today.' → **phô mai**.",
          en: "'Our cheese... is ten percent cheaper for visitors on the tour today.'",
        },
      },
      {
        id: "l2-listen-09-ex07",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "What is the correct order of the tour?",
        options: [
          "animals → garden → shop → lunch",
          "garden → animals → shop → lunch",
          "animals → shop → garden → lunch",
          "shop → animals → garden → lunch",
        ],
        correctIndex: 0,
        explanation: {
          vi: "First (động vật) → After that (vườn rau) → Then (cửa hàng) → Finally (bữa trưa).",
          en: "First (animals) → After that (garden) → Then (shop) → Finally (lunch).",
        },
      },
      {
        id: "l2-listen-09-ex08",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ nối với nghĩa tiếng Việt.",
          en: "Match the signpost words with their Vietnamese meanings.",
        },
        pairs: [
          { left: "First", right: "Đầu tiên" },
          { left: "After that", right: "Sau đó" },
          { left: "Finally", right: "Cuối cùng" },
          { left: "In the past", right: "Ngày xưa" },
          { left: "Please remember", right: "Xin hãy nhớ" },
        ],
        explanation: {
          vi: "Từ nối giúp bạn biết người nói đang ở phần nào của bài nói.",
          en: "Signpost words tell you which part of the talk you are in.",
        },
      },
      {
        id: "l2-listen-09-ex09",
        type: 'listen-type',
        audioText: "We're going to visit the animals.",
        acceptedAnswers: ["We're going to visit the animals", "We are going to visit the animals", "Were going to visit the animals"],
        explanation: {
          vi: "**be going to** + động từ = kế hoạch: Chúng ta sẽ đi thăm các con vật.",
          en: "**be going to** + verb = a plan.",
        },
      },
      {
        id: "l2-listen-09-ex10",
        type: 'fill-blank',
        sentence: "In the past, there ___ only cows on the farm.",
        acceptedAnswers: ["were"],
        hint: "(be)",
        explanation: {
          vi: "Quá khứ + danh từ số nhiều (cows) → **there were**.",
          en: "Past + plural noun (cows) → **there were**.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-09-test01",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "What time is lunch?",
        options: ["12:00", "1:30", "2:30", "12:30"],
        correctIndex: 3,
        explanation: {
          vi: "'Finally, at twelve thirty, lunch is served...' → **12:30**.",
          en: "'Finally, at twelve thirty, lunch is served...'",
        },
      },
      {
        id: "l2-listen-09-test02",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "Where is lunch served?",
        options: ["in the old barn", "in the farm shop", "in the garden", "in a café"],
        correctIndex: 0,
        explanation: {
          vi: "'...lunch is served in the old barn.' → **barn** = nhà kho, chuồng lớn ở nông trại.",
          en: "'...lunch is served in the old barn.'",
        },
      },
      {
        id: "l2-listen-09-test03",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "What must visitors NOT do?",
        options: ["feed the goats", "pick strawberries", "touch the animals", "give the goats their own food"],
        correctIndex: 3,
        explanation: {
          vi: "Trẻ em được cho dê ăn, 'but please don't give them any of your own food' → **không cho dê ăn đồ ăn mang theo**.",
          en: "Children can feed the goats, 'but please don't give them any of your own food'.",
        },
      },
      {
        id: "l2-listen-09-test04",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "How much cheaper is the cheese for tour visitors?",
        options: ["5%", "15%", "10%", "20%"],
        correctIndex: 2,
        explanation: {
          vi: "'it's ten percent cheaper' → rẻ hơn **10%**.",
          en: "'it's ten percent cheaper'.",
        },
      },
      {
        id: "l2-listen-09-test05",
        type: 'listen-choose',
        audioText: FARM_TOUR,
        question: "Where are the sinks for washing hands?",
        options: ["next to the toilets", "in the barn", "in the farm shop", "next to the goats"],
        correctIndex: 0,
        explanation: {
          vi: "'There are sinks next to the toilets.' → bồn rửa tay ở **cạnh nhà vệ sinh**.",
          en: "'There are sinks next to the toilets.'",
        },
      },
      {
        id: "l2-listen-09-test06",
        type: 'listen-type',
        audioText: "Please remember to wash your hands.",
        acceptedAnswers: ["Please remember to wash your hands"],
        explanation: {
          vi: "**Please remember to...** báo hiệu một quy định quan trọng — rất hay ra đề!",
          en: "**Please remember to...** introduces an important rule — often tested!",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Dự báo thời tiết và thông báo ở nhà ga
  // (Nghe thông tin công cộng: thời tiết, tàu trễ, đổi sân ga, huỷ chuyến)
  // ==========================================================================
  {
    id: "l2-listen-10",
    skill: 'listening',
    title: { vi: "Dự báo thời tiết và thông báo nhà ga", en: "Weather forecasts and station announcements" },
    description: {
      vi: "Nghe hiểu bản tin thời tiết và thông báo tàu xe: trễ giờ, đổi sân ga, huỷ chuyến.",
      en: "Understand weather forecasts and travel announcements: delays, platform changes and cancellations.",
    },
    teachingCards: [
      {
        title: { vi: "Từ vựng thời tiết", en: "Weather words" },
        body: {
          vi: "**sunny**: nắng · **cloudy**: nhiều mây · **windy**: có gió · **foggy / fog**: sương mù\n**rain / showers**: mưa / mưa rào · **storm**: bão\n**dry**: khô ráo (không mưa)\n**temperature**: nhiệt độ · **degrees**: độ\n**top temperature**: nhiệt độ cao nhất\nBản tin dùng **will** và **be going to** để nói về tương lai.",
          en: "**sunny** · **cloudy** · **windy** · **foggy / fog**\n**rain / showers** · **storm**\n**dry**: no rain\n**temperature** · **degrees**\n**top temperature**: the highest temperature\nForecasts use **will** and **be going to** for the future.",
        },
        examples: [
          { en: "It's going to be cloudy and cold, with temperatures of only six degrees.", vi: "Trời sẽ nhiều mây và lạnh, nhiệt độ chỉ 6 độ." },
          { en: "There may be some fog early in the morning.", vi: "Có thể có sương mù vào sáng sớm." },
        ],
      },
      {
        title: { vi: "Thông báo ở nhà ga, bến xe", en: "Station announcements" },
        body: {
          vi: "**delayed by 20 minutes**: bị trễ 20 phút\n**cancelled**: bị huỷ\n**platform**: sân ga\n**calling at**: dừng ở các ga...\n**change at**: đổi tàu ở...\n**We are sorry for the delay.**: Xin lỗi vì sự chậm trễ.\nChú ý: '**now** leave from platform four, **not** platform two' → thông tin mới là đáp án.",
          en: "**delayed by 20 minutes**: 20 minutes late\n**cancelled**: not running\n**platform**: where you get on the train\n**calling at**: stopping at...\n**change at**: get off and take another train at...\n**We are sorry for the delay.**\nNote: '**now** leave from platform four, **not** platform two' → the new information is the answer.",
        },
        examples: [
          { en: "The ten fifteen train is delayed by twenty minutes.", vi: "Chuyến tàu 10:15 bị trễ 20 phút (→ đi lúc 10:35)." },
          { en: "Passengers for Liverpool should change at Manchester.", vi: "Hành khách đi Liverpool nên đổi tàu ở Manchester." },
        ],
      },
    ],
    exercises: [
      {
        id: "l2-listen-10-ex01",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ thời tiết với nghĩa tiếng Việt.",
          en: "Match the weather words with their Vietnamese meanings.",
        },
        pairs: [
          { left: "sunny", right: "nắng" },
          { left: "cloudy", right: "nhiều mây" },
          { left: "windy", right: "có gió" },
          { left: "foggy", right: "có sương mù" },
          { left: "dry", right: "khô ráo" },
          { left: "storm", right: "bão" },
        ],
        explanation: {
          vi: "Nhiều tính từ thời tiết = danh từ + y: sun → sunny, cloud → cloudy, wind → windy, fog → foggy.",
          en: "Many weather adjectives = noun + y: sun → sunny, cloud → cloudy, wind → windy, fog → foggy.",
        },
      },
      {
        id: "l2-listen-10-ex02",
        type: 'listen-choose',
        audioText: WEATHER_FORECAST,
        question: "What will the weather be like in the north this morning?",
        options: ["sunny and warm", "windy and wet", "foggy", "cloudy and cold"],
        correctIndex: 3,
        explanation: {
          vi: "'In the north, it's going to be cloudy and cold this morning' → **nhiều mây và lạnh**.",
          en: "'In the north, it's going to be cloudy and cold this morning'.",
        },
      },
      {
        id: "l2-listen-10-ex03",
        type: 'listen-choose',
        audioText: WEATHER_FORECAST,
        question: "Temperature in the north this morning: ___",
        options: ["6°C", "16°C", "14°C", "4°C"],
        correctIndex: 0,
        explanation: {
          vi: "'with temperatures of only six degrees' → **6 độ**. 14 độ là ở miền nam.",
          en: "'with temperatures of only six degrees' → **6°C**. 14°C is in the south.",
        },
      },
      {
        id: "l2-listen-10-ex04",
        type: 'listen-choose',
        audioText: WEATHER_FORECAST,
        question: "Top temperature in the south: ___",
        options: ["4°C", "40°C", "6°C", "14°C"],
        correctIndex: 3,
        explanation: {
          vi: "'with a top temperature of fourteen degrees' → **14 độ**. Chú ý four-TEEN (14), không phải FOR-ty (40).",
          en: "'a top temperature of fourteen degrees' → **14°C**. four-TEEN, not FOR-ty.",
        },
      },
      {
        id: "l2-listen-10-ex05",
        type: 'listen-choose',
        audioText: WEATHER_FORECAST,
        question: "What will the weather be like tomorrow?",
        options: ["rain everywhere", "very windy all day", "dry, but foggy early in the morning", "snow in the north"],
        correctIndex: 2,
        explanation: {
          vi: "'Tomorrow, the whole country is going to be dry, but there may be some fog early in the morning.'",
          en: "'Tomorrow, the whole country is going to be dry, but there may be some fog early in the morning.'",
        },
      },
      {
        id: "l2-listen-10-ex06",
        type: 'listen-choose',
        audioText: STATION_ANNOUNCEMENT,
        question: "The Manchester train will leave from platform ___",
        options: ["2", "4", "14", "10"],
        correctIndex: 1,
        explanation: {
          vi: "'This train will now leave from platform four, not platform two.' → sân ga **số 4**. Số 2 là sân ga cũ.",
          en: "'...will now leave from platform four, not platform two.' → **4**.",
        },
      },
      {
        id: "l2-listen-10-ex07",
        type: 'listen-choose',
        audioText: STATION_ANNOUNCEMENT,
        question: "What time will the Manchester train leave now?",
        options: ["10:35", "10:15", "10:20", "10:50"],
        correctIndex: 0,
        explanation: {
          vi: "Tàu 10:15 trễ 20 phút → 10:15 + 20 phút = **10:35**.",
          en: "The 10:15 train is 20 minutes late → **10:35**.",
        },
      },
      {
        id: "l2-listen-10-ex08",
        type: 'listen-choose',
        audioText: STATION_ANNOUNCEMENT,
        question: "What should passengers for Liverpool do?",
        options: ["change at Stockport", "take the airport bus", "wait on platform two", "change at Manchester"],
        correctIndex: 3,
        explanation: {
          vi: "'Passengers for Liverpool should change at Manchester.' → **đổi tàu ở Manchester**.",
          en: "'Passengers for Liverpool should change at Manchester.'",
        },
      },
      {
        id: "l2-listen-10-ex09",
        type: 'listen-type',
        audioText: "The train is delayed by twenty minutes.",
        acceptedAnswers: ["The train is delayed by twenty minutes", "The train is delayed by 20 minutes"],
        explanation: {
          vi: "**delayed by + thời gian** = bị trễ bao lâu.",
          en: "**delayed by + time** = how late it is.",
        },
      },
      {
        id: "l2-listen-10-ex10",
        type: 'fill-blank',
        sentence: "The airport bus is ___ because of the bad weather, so it is not running today.",
        acceptedAnswers: ["cancelled", "canceled"],
        hint: "(bị huỷ)",
        explanation: {
          vi: "**cancelled** = bị huỷ (Anh-Anh viết 2 chữ L, Anh-Mỹ viết 'canceled').",
          en: "**cancelled** (British) / **canceled** (American).",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-listen-10-test01",
        type: 'listen-choose',
        audioText: STATION_ANNOUNCEMENT,
        question: "What is the problem with the eleven o'clock airport bus?",
        options: ["It is cancelled.", "It is delayed.", "It leaves from platform four.", "It is full."],
        correctIndex: 0,
        explanation: {
          vi: "'The eleven o'clock bus to the airport is cancelled today because of the bad weather.'",
          en: "'The eleven o'clock bus to the airport is cancelled today because of the bad weather.'",
        },
      },
      {
        id: "l2-listen-10-test02",
        type: 'listen-choose',
        audioText: STATION_ANNOUNCEMENT,
        question: "How can airport passengers travel instead?",
        options: ["by another train", "by a later bus", "by taxi", "by a free car"],
        correctIndex: 2,
        explanation: {
          vi: "'A taxi service is available outside the main entrance.' → đi **taxi**.",
          en: "'A taxi service is available outside the main entrance.'",
        },
      },
      {
        id: "l2-listen-10-test03",
        type: 'listen-choose',
        audioText: WEATHER_FORECAST,
        question: "When will it rain in the north?",
        options: ["this morning", "this afternoon", "this evening", "tomorrow"],
        correctIndex: 1,
        explanation: {
          vi: "'There will be some rain in the afternoon' → **chiều nay**.",
          en: "'There will be some rain in the afternoon'.",
        },
      },
      {
        id: "l2-listen-10-test04",
        type: 'listen-choose',
        audioText: WEATHER_FORECAST,
        question: "Where will it be very windy this evening?",
        options: ["in the north", "in the city centre", "in the mountains", "near the coast"],
        correctIndex: 3,
        explanation: {
          vi: "'But it will be very windy near the coast this evening.' → **gần bờ biển**.",
          en: "'But it will be very windy near the coast this evening.'",
        },
      },
      {
        id: "l2-listen-10-test05",
        type: 'listen-choose',
        audioText: "Attention, please. The train to Bristol will now leave from platform seven instead of platform three.",
        question: "Which platform does the Bristol train leave from?",
        options: ["3", "7", "11", "17"],
        correctIndex: 1,
        explanation: {
          vi: "'platform seven **instead of** platform three' → sân ga **7** (instead of = thay vì).",
          en: "'platform seven **instead of** platform three' → **7**.",
        },
      },
      {
        id: "l2-listen-10-test06",
        type: 'listen-type',
        audioText: "There may be some fog early in the morning.",
        acceptedAnswers: ["There may be some fog early in the morning"],
        explanation: {
          vi: "**may** = có thể (không chắc chắn). **fog** = sương mù.",
          en: "**may** = possibly. **fog** = thick cloud near the ground.",
        },
      },
    ],
  },
]
