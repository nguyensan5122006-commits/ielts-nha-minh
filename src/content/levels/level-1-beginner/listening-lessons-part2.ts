/**
 * listening-lessons-part2.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI HỌC KỸ NĂNG NGHE (LISTENING) — LEVEL 1 (band 0 – 2.0), PHẦN 2.
 *
 * File này nối tiếp listening-lessons.ts, gồm 6 bài nghe tiếp theo:
 *   5.  l1-listen-05: Hỏi đường và chỉ đường đơn giản
 *   6.  l1-listen-06: Gọi đồ ăn, đồ uống ở quán cà phê
 *   7.  l1-listen-07: Kể về cuối tuần (làm quen thì quá khứ đơn)
 *   8.  l1-listen-08: Tin nhắn điện thoại (tên, số, giờ)
 *   9.  l1-listen-09: Bản tin thời tiết đơn giản
 *   10. l1-listen-10: Thông báo ngắn của trường / câu lạc bộ
 *                     (làm quen với IELTS Listening Part 1/2)
 *
 * Mỗi bài học gồm:
 *   - teachingCards : thẻ lý thuyết + mẹo nghe (song ngữ Việt/Anh)
 *   - exercises     : 10 bài luyện nhỏ kiểu Duolingo
 *   - miniTest      : 6 câu kiểm tra cuối bài (có tính tim)
 *
 * Các dạng bài dùng ở đây: 'listen-choose', 'listen-type', 'multiple-choice',
 * 'fill-blank', 'match-pairs'. KHÔNG dùng 'speak-answer' / 'write-answer'
 * (2 dạng đó cần AI chấm, tốn lượt gọi API).
 *
 * Hội thoại được viết trong 1 chuỗi dạng "Tên: lời thoại. Tên: lời thoại."
 * để máy đọc có thể đổi giọng theo từng người nói.
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1ListeningLessonsPart2: Lesson[] = [
  // ==========================================================================
  // BÀI 5: Hỏi đường & chỉ đường — rẽ trái/phải, đi thẳng, vị trí (đối diện,
  // bên cạnh, ở giữa). IELTS Part 2 hay có dạng nghe chỉ đường trên bản đồ.
  // ==========================================================================
  {
    id: "l1-listen-05",
    skill: 'listening',
    title: { vi: "Hỏi đường và chỉ đường", en: "Asking for and giving directions" },
    description: {
      vi: "Nghe hiểu những câu chỉ đường đơn giản và vị trí các địa điểm.",
      en: "Understand simple directions and where places are.",
    },
    teachingCards: [
      {
        title: { vi: "Hỏi đường", en: "Asking the way" },
        body: {
          vi: "Luôn bắt đầu lịch sự bằng **Excuse me** (Xin lỗi cho tôi hỏi).\n**Where is the bank?** – Ngân hàng ở đâu?\n**How do I get to the station?** – Tôi đến nhà ga bằng cách nào?\n**Is there a supermarket near here?** – Gần đây có siêu thị không?",
          en: "Start politely with **Excuse me**.\n**Where is the bank?**\n**How do I get to the station?**\n**Is there a supermarket near here?**",
        },
        examples: [
          { en: "Excuse me, where is the post office?", vi: "Xin lỗi, bưu điện ở đâu ạ?" },
          { en: "How do I get to the park?", vi: "Tôi đến công viên bằng cách nào?" },
        ],
      },
      {
        title: { vi: "Chỉ đường", en: "Giving directions" },
        body: {
          vi: "**Go straight on.** – Đi thẳng.\n**Turn left / Turn right.** – Rẽ trái / Rẽ phải.\n**Take the first / second street on the left.** – Rẽ vào đường thứ nhất / thứ hai bên trái.\n**It's on your left / right.** – Nó ở bên tay trái / phải của bạn.\nMẹo: **left** (trái) và **right** (phải) rất dễ nghe nhầm khi nói nhanh — nghe kỹ âm cuối /t/.",
          en: "**Go straight on.**\n**Turn left / Turn right.**\n**Take the first / second street on the left.**\n**It's on your left / right.**\nTip: listen carefully for **left** and **right** — they are easy to mix up.",
        },
        examples: [
          { en: "Go straight on and turn left.", vi: "Đi thẳng rồi rẽ trái." },
          { en: "Take the second street on the right.", vi: "Rẽ vào đường thứ hai bên phải." },
        ],
      },
      {
        title: { vi: "Vị trí: bên cạnh, đối diện, ở giữa", en: "Places: next to, opposite, between" },
        body: {
          vi: "**next to** = bên cạnh\n**opposite** = đối diện\n**between A and B** = ở giữa A và B\n**in front of** = phía trước\n**behind** = phía sau\n**on the corner** = ở góc phố",
          en: "**next to**, **opposite**, **between A and B**, **in front of**, **behind**, **on the corner**",
        },
        examples: [
          { en: "The café is next to the bank.", vi: "Quán cà phê ở cạnh ngân hàng." },
          { en: "The school is opposite the park.", vi: "Trường học ở đối diện công viên." },
          { en: "The shop is between the school and the hospital.", vi: "Cửa hàng ở giữa trường học và bệnh viện." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-05-ex01",
        type: 'listen-choose',
        audioText: "Turn left.",
        question: "What do you hear? (Bạn nghe thấy gì?)",
        options: ["Turn right.", "Turn left.", "Go straight on.", "Go back."],
        correctIndex: 1,
        explanation: {
          vi: "'Turn left' = rẽ trái.",
          en: "You heard 'Turn left'.",
        },
      },
      {
        id: "l1-listen-05-ex02",
        type: 'listen-choose',
        audioText: "Go straight on and turn right.",
        question: "What do you do after you go straight on? (Sau khi đi thẳng thì làm gì?)",
        options: ["Turn left", "Stop", "Turn right", "Go back"],
        correctIndex: 2,
        explanation: {
          vi: "Câu nói: 'Go straight on and turn right' → đi thẳng rồi rẽ phải.",
          en: "First go straight on, then turn right.",
        },
      },
      {
        id: "l1-listen-05-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối cụm từ với nghĩa", en: "Match the phrases with their meanings" },
        pairs: [
          { left: "turn left", right: "rẽ trái" },
          { left: "turn right", right: "rẽ phải" },
          { left: "go straight on", right: "đi thẳng" },
          { left: "opposite", right: "đối diện" },
          { left: "next to", right: "bên cạnh" },
          { left: "on the corner", right: "ở góc phố" },
        ],
      },
      {
        id: "l1-listen-05-ex04",
        type: 'listen-type',
        audioText: "Excuse me, where is the bank?",
        acceptedAnswers: ["Excuse me, where is the bank?", "Excuse me, where's the bank?"],
        explanation: {
          vi: "Câu hỏi đường lịch sự: 'Excuse me, where is ...?'",
          en: "A polite way to ask for directions.",
        },
      },
      {
        id: "l1-listen-05-ex05",
        type: 'listen-choose',
        audioText: "Woman: Excuse me, where is the post office? Man: It's next to the bank.",
        question: "Where is the post office? (Bưu điện ở đâu?)",
        options: ["Next to the bank", "Opposite the bank", "Behind the bank", "Between the bank and the park"],
        correctIndex: 0,
        explanation: {
          vi: "Người đàn ông nói: 'It's next to the bank' → ở cạnh ngân hàng.",
          en: "The man says, 'It's next to the bank.'",
        },
      },
      {
        id: "l1-listen-05-ex06",
        type: 'listen-choose',
        audioText: "Man: How do I get to the park? Woman: Take the second street on the left. The park is on your right.",
        question: "Which street should the man take? (Người đàn ông phải rẽ vào đường nào?)",
        options: [
          "The first street on the left",
          "The second street on the right",
          "The first street on the right",
          "The second street on the left",
        ],
        correctIndex: 3,
        explanation: {
          vi: "'Take the second street on the left' = rẽ vào đường thứ hai bên trái. 'On your right' là vị trí của công viên, không phải con đường.",
          en: "The street is the second on the left. 'On your right' is where the park is.",
        },
      },
      {
        id: "l1-listen-05-ex07",
        type: 'fill-blank',
        sentence: "The café is ___ the cinema, on the other side of the road.",
        acceptedAnswers: ["opposite"],
        hint: "(đối diện)",
        explanation: {
          vi: "'opposite' = đối diện (ở bên kia đường).",
          en: "'opposite' means on the other side.",
        },
      },
      {
        id: "l1-listen-05-ex08",
        type: 'listen-choose',
        audioText: "Anna: Is there a supermarket near here? Tom: Yes. It's on the corner, between the school and the hospital.",
        question: "The supermarket is between which two places? (Siêu thị nằm giữa hai nơi nào?)",
        options: [
          "The school and the park",
          "The bank and the hospital",
          "The school and the hospital",
          "The café and the school",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Tom nói: 'between the school and the hospital' = giữa trường học và bệnh viện.",
          en: "Tom says it is between the school and the hospital.",
        },
      },
      {
        id: "l1-listen-05-ex09",
        type: 'listen-type',
        audioText: "Turn right at the traffic lights.",
        acceptedAnswers: ["Turn right at the traffic lights."],
        explanation: {
          vi: "'traffic lights' = đèn giao thông. 'Turn right at the traffic lights' = Rẽ phải ở chỗ đèn giao thông.",
          en: "'traffic lights' are the red, yellow and green lights on the road.",
        },
      },
      {
        id: "l1-listen-05-ex10",
        type: 'multiple-choice',
        question: "Which question asks for directions? (Câu nào dùng để hỏi đường?)",
        options: ["How much is it?", "How do I get to the station?", "What time is it?", "How are you?"],
        correctIndex: 1,
        explanation: {
          vi: "'How do I get to ...?' = Tôi đến ... bằng cách nào?",
          en: "'How do I get to ...?' asks for the way.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-05-test01",
        type: 'listen-choose',
        audioText: "The library is opposite the park.",
        question: "Where is the library? (Thư viện ở đâu?)",
        options: ["Next to the park", "Behind the park", "Opposite the park", "In the park"],
        correctIndex: 2,
        explanation: { vi: "'opposite the park' = đối diện công viên.", en: "You heard 'opposite the park'." },
      },
      {
        id: "l1-listen-05-test02",
        type: 'listen-type',
        audioText: "Go straight on.",
        acceptedAnswers: ["Go straight on."],
        explanation: { vi: "'Go straight on' = Đi thẳng.", en: "'Go straight on' means don't turn." },
      },
      {
        id: "l1-listen-05-test03",
        type: 'listen-choose',
        audioText: "Woman: Excuse me, how do I get to the train station? Man: Go straight on, then take the first street on the right. Woman: The first on the right? Man: Yes. The station is on your left.",
        question: "Which street should the woman take? (Người phụ nữ phải rẽ vào đường nào?)",
        options: [
          "The first street on the right",
          "The first street on the left",
          "The second street on the right",
          "The second street on the left",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Người đàn ông nói 'the first street on the right' và xác nhận lại 'Yes'.",
          en: "He says 'the first street on the right' and then confirms it.",
        },
      },
      {
        id: "l1-listen-05-test04",
        type: 'listen-choose',
        audioText: "Man: Where is the bus stop? Woman: Turn left... no, sorry, turn right. It's in front of the hospital.",
        question: "Which way should the man go? (Người đàn ông phải đi hướng nào?)",
        options: ["Left", "Straight on", "Back", "Right"],
        correctIndex: 3,
        explanation: {
          vi: "Cô ấy nói 'left' rồi sửa lại: 'no, sorry, turn right'. Đáp án là 'right' — nhớ nghe đến hết!",
          en: "She changes her answer: 'no, sorry, turn right'.",
        },
      },
      {
        id: "l1-listen-05-test05",
        type: 'fill-blank',
        sentence: "Excuse me, ___ is the hospital?",
        acceptedAnswers: ["where"],
        explanation: { vi: "'Where' = ở đâu, dùng để hỏi vị trí.", en: "'Where' asks about a place." },
      },
      {
        id: "l1-listen-05-test06",
        type: 'listen-choose',
        audioText: "The bank is between the café and the bookshop.",
        question: "Which places are next to the bank? (Những nơi nào ở cạnh ngân hàng?)",
        options: [
          "The park and the café",
          "The café and the bookshop",
          "The school and the bookshop",
          "The hospital and the park",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Ngân hàng ở giữa quán cà phê và hiệu sách → hai nơi đó ở hai bên ngân hàng.",
          en: "The bank is between the café and the bookshop.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Gọi đồ ở quán cà phê — câu gọi món lịch sự, kích cỡ, nóng/đá,
  // ăn tại chỗ hay mang đi, và nghe giá tiền.
  // ==========================================================================
  {
    id: "l1-listen-06",
    skill: 'listening',
    title: { vi: "Gọi đồ ở quán cà phê", en: "Ordering at a café" },
    description: {
      vi: "Nghe hiểu cuộc hội thoại gọi đồ ăn, đồ uống và trả tiền ở quán.",
      en: "Understand conversations about ordering food and drinks in a café.",
    },
    teachingCards: [
      {
        title: { vi: "Nhân viên nói gì?", en: "What the staff say" },
        body: {
          vi: "**What would you like?** / **What can I get you?** – Bạn muốn dùng gì?\n**Anything else?** – Còn gì nữa không?\n**Eat in or take away?** – Ăn tại chỗ hay mang đi?\n**That's four pounds fifty.** – Tổng cộng 4 bảng 50.",
          en: "**What would you like?** / **What can I get you?**\n**Anything else?**\n**Eat in or take away?**\n**That's four pounds fifty.**",
        },
        examples: [
          { en: "Hello! What can I get you?", vi: "Xin chào! Bạn dùng gì ạ?" },
          { en: "Eat in or take away?", vi: "Ăn tại đây hay mang đi ạ?" },
        ],
      },
      {
        title: { vi: "Khách gọi món", en: "What the customer says" },
        body: {
          vi: "**I'd like a ..., please.** (I'd = I would) – Cho tôi một ...\n**Can I have a ..., please?** – Cho tôi ... được không?\nKích cỡ: **small** (nhỏ), **medium** (vừa), **large** (lớn)\nNóng hay đá: **hot** / **iced**\nGọi tính tiền: **Can I have the bill, please?**",
          en: "**I'd like a ..., please.** / **Can I have a ..., please?**\nSizes: **small**, **medium**, **large**\n**hot** or **iced**\nTo pay: **Can I have the bill, please?**",
        },
        examples: [
          { en: "I'd like a small iced coffee, please.", vi: "Cho tôi một cà phê đá cỡ nhỏ." },
          { en: "Can I have a cheese sandwich, please?", vi: "Cho tôi một bánh mì kẹp phô mai nhé?" },
        ],
      },
      {
        title: { vi: "Mẹo: nghe giá tiền và chỗ đổi ý", en: "Tip: prices and changes" },
        body: {
          vi: "Giá tiền được đọc: **six pounds fifty** = £6.50, **three dollars twenty** = $3.20.\nKhách hay đổi ý: **No, wait...** / **Actually...** → đáp án là món SAU CÙNG.\nNghe kỹ **số lượng**: **two teas** (2 trà), **one cake** (1 bánh).",
          en: "Prices: **six pounds fifty** = £6.50.\nCustomers change their mind: **No, wait...** / **Actually...** → the LAST choice is the answer.\nListen for **numbers**: **two teas**, **one cake**.",
        },
        examples: [
          { en: "That's six pounds fifty, please.", vi: "Của bạn hết 6 bảng 50." },
          { en: "A tea... actually, a coffee, please.", vi: "Một trà... à thôi, cho tôi cà phê." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-06-ex01",
        type: 'listen-choose',
        audioText: "Waiter: What would you like? Lan: I'd like a hot chocolate, please.",
        question: "What does Lan want? (Lan muốn gì?)",
        options: ["A hot coffee", "A hot chocolate", "An iced tea", "A chocolate cake"],
        correctIndex: 1,
        explanation: { vi: "Lan nói: 'a hot chocolate' = sô-cô-la nóng.", en: "Lan asks for a hot chocolate." },
      },
      {
        id: "l1-listen-06-ex02",
        type: 'listen-choose',
        audioText: "Can I have a large orange juice, please?",
        question: "What size is the juice? (Ly nước cam cỡ nào?)",
        options: ["Small", "Medium", "Large", "Extra large"],
        correctIndex: 2,
        explanation: { vi: "'large' = cỡ lớn.", en: "You heard 'a large orange juice'." },
      },
      {
        id: "l1-listen-06-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối cụm từ với nghĩa", en: "Match the phrases with their meanings" },
        pairs: [
          { left: "I'd like", right: "tôi muốn" },
          { left: "Anything else?", right: "còn gì nữa không?" },
          { left: "take away", right: "mang đi" },
          { left: "eat in", right: "ăn tại chỗ" },
          { left: "the bill", right: "hóa đơn" },
          { left: "menu", right: "thực đơn" },
        ],
      },
      {
        id: "l1-listen-06-ex04",
        type: 'listen-type',
        audioText: "I'd like a cup of tea, please.",
        acceptedAnswers: ["I'd like a cup of tea, please.", "I would like a cup of tea, please."],
        explanation: {
          vi: "'I'd like' = 'I would like' = Tôi muốn (lịch sự hơn 'I want').",
          en: "'I'd like' is more polite than 'I want'.",
        },
      },
      {
        id: "l1-listen-06-ex05",
        type: 'listen-choose',
        audioText: "Waiter: Eat in or take away? Tom: Take away, please.",
        question: "Does Tom eat in the café? (Tom có ăn tại quán không?)",
        options: ["No, he takes it away.", "Yes, he eats in.", "He does not say."],
        correctIndex: 0,
        explanation: {
          vi: "Tom nói 'Take away' = mang đi, nên anh ấy không ăn tại quán.",
          en: "Tom says 'Take away', so he does not eat in.",
        },
      },
      {
        id: "l1-listen-06-ex06",
        type: 'listen-choose',
        audioText: "Waiter: Anything else? Mai: Yes, a chicken sandwich, please. Waiter: OK. That's six pounds fifty.",
        question: "How much does Mai pay? (Mai trả bao nhiêu tiền?)",
        options: ["£5.60", "£6.15", "£6.50", "£16.50"],
        correctIndex: 2,
        explanation: {
          vi: "'six pounds fifty' = £6.50. Chú ý 'fifty' (50) khác 'fifteen' (15).",
          en: "'six pounds fifty' = £6.50.",
        },
      },
      {
        id: "l1-listen-06-ex07",
        type: 'fill-blank',
        sentence: "Waiter: Anything ___? – No, thank you.",
        acceptedAnswers: ["else"],
        explanation: { vi: "'Anything else?' = Còn gì nữa không?", en: "'Anything else?' asks if you want more." },
      },
      {
        id: "l1-listen-06-ex08",
        type: 'listen-choose',
        audioText: "Ben: Can I have a coffee, please? Waiter: Hot or iced? Ben: Iced, please. Oh, and a small one.",
        question: "What does Ben order? (Ben gọi gì?)",
        options: ["A large hot coffee", "A small hot coffee", "A large iced coffee", "A small iced coffee"],
        correctIndex: 3,
        explanation: {
          vi: "Ben chọn 'Iced' (đá) và 'a small one' (cỡ nhỏ) → cà phê đá cỡ nhỏ.",
          en: "Ben wants it iced and small.",
        },
      },
      {
        id: "l1-listen-06-ex09",
        type: 'listen-type',
        audioText: "Can I have the bill, please?",
        acceptedAnswers: ["Can I have the bill, please?", "Can I have the bill please?"],
        explanation: { vi: "'the bill' = hóa đơn. Câu này dùng khi muốn tính tiền.", en: "Say this when you want to pay." },
      },
      {
        id: "l1-listen-06-ex10",
        type: 'multiple-choice',
        question: "The waiter asks: 'What would you like?' You answer:",
        options: ["I like coffee every day.", "Yes, I would.", "A cheese sandwich, please.", "I am fine."],
        correctIndex: 2,
        explanation: {
          vi: "'What would you like?' hỏi bạn muốn gọi món gì → trả lời bằng tên món + 'please'.",
          en: "Answer with the food or drink you want + 'please'.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-06-test01",
        type: 'listen-choose',
        audioText: "Customer: Two teas and one cake, please.",
        question: "How many teas does the customer want? (Khách muốn mấy ly trà?)",
        options: ["One", "Two", "Three", "Four"],
        correctIndex: 1,
        explanation: { vi: "'Two teas' = hai ly trà; 'one cake' = một cái bánh.", en: "Two teas and one cake." },
      },
      {
        id: "l1-listen-06-test02",
        type: 'listen-type',
        audioText: "Eat in or take away?",
        acceptedAnswers: ["Eat in or take away?"],
        explanation: { vi: "'Eat in or take away?' = Ăn tại chỗ hay mang đi?", en: "The waiter asks where you will eat." },
      },
      {
        id: "l1-listen-06-test03",
        type: 'listen-choose',
        audioText: "Waiter: Hello. What can I get you? Anna: A lemon tea, please. No, wait. A mango juice. Waiter: A mango juice. Anything else? Anna: No, thanks.",
        question: "What does Anna order in the end? (Cuối cùng Anna gọi gì?)",
        options: ["A lemon tea", "A lemon juice", "A mango tea", "A mango juice"],
        correctIndex: 3,
        explanation: {
          vi: "Anna đổi ý: 'No, wait. A mango juice.' → nước ép xoài.",
          en: "Anna changes her mind: 'No, wait. A mango juice.'",
        },
      },
      {
        id: "l1-listen-06-test04",
        type: 'listen-choose',
        audioText: "Waiter: That's four pounds twenty, please.",
        question: "How much is it? (Hết bao nhiêu tiền?)",
        options: ["£4.20", "£4.02", "£40.20", "£14.20"],
        correctIndex: 0,
        explanation: { vi: "'four pounds twenty' = £4.20.", en: "'four pounds twenty' = £4.20." },
      },
      {
        id: "l1-listen-06-test05",
        type: 'fill-blank',
        sentence: "___ I have a glass of water, please?",
        acceptedAnswers: ["Can", "Could", "May"],
        explanation: {
          vi: "'Can I have ...?' = Cho tôi ... được không? (Could / May lịch sự hơn.)",
          en: "'Can I have ...?' is a polite request. 'Could' and 'May' are also fine.",
        },
      },
      {
        id: "l1-listen-06-test06",
        type: 'multiple-choice',
        question: "Which sentence is the most polite way to order?",
        options: ["Give me a coffee.", "Coffee! Now!", "I'd like a coffee, please.", "I want coffee."],
        correctIndex: 2,
        explanation: {
          vi: "'I'd like ..., please' là cách gọi món lịch sự nhất.",
          en: "'I'd like ..., please' is the polite way.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Cuối tuần của bạn thế nào? — lần đầu làm quen với thì quá khứ đơn:
  // was/were, động từ thêm -ed và vài động từ bất quy tắc rất thông dụng.
  // ==========================================================================
  {
    id: "l1-listen-07",
    skill: 'listening',
    title: { vi: "Kể về cuối tuần", en: "Talking about the weekend" },
    description: {
      vi: "Nghe người khác kể cuối tuần và nhận ra động từ ở thì quá khứ đơn.",
      en: "Listen to people talk about their weekend and notice past simple verbs.",
    },
    teachingCards: [
      {
        title: { vi: "Hỏi về cuối tuần", en: "Asking about the weekend" },
        body: {
          vi: "**How was your weekend?** – Cuối tuần của bạn thế nào?\n→ **It was great / good / boring.** (tuyệt / ổn / chán)\n**What did you do at the weekend?** – Cuối tuần bạn đã làm gì?\nTừ chỉ quá khứ: **yesterday** (hôm qua), **last weekend** (cuối tuần trước), **on Saturday**, **last night** (tối qua).",
          en: "**How was your weekend?** → **It was great / good / boring.**\n**What did you do at the weekend?**\nPast time words: **yesterday**, **last weekend**, **on Saturday**, **last night**.",
        },
        examples: [
          { en: "How was your weekend? – It was great!", vi: "Cuối tuần của bạn thế nào? – Tuyệt lắm!" },
          { en: "What did you do yesterday?", vi: "Hôm qua bạn đã làm gì?" },
        ],
      },
      {
        title: { vi: "Động từ có quy tắc: thêm -ed", en: "Regular verbs: add -ed" },
        body: {
          vi: "Hầu hết động từ thêm **-ed** để nói về quá khứ:\nplay → **played**, watch → **watched**, visit → **visited**, cook → **cooked**, stay → **stayed**\nBe: I/he/she **was**, you/we/they **were**.\nKhi nghe: âm **-ed** thường rất nhẹ (/t/, /d/), riêng sau t/d đọc /ɪd/ (visited).",
          en: "Most verbs add **-ed**: played, watched, visited, cooked, stayed.\nBe: I/he/she **was**, you/we/they **were**.\nListening tip: **-ed** is often a very short /t/ or /d/; after t/d it is /ɪd/ (visited).",
        },
        examples: [
          { en: "I watched TV on Saturday.", vi: "Tôi xem tivi vào thứ Bảy." },
          { en: "We were at home all day.", vi: "Chúng tôi ở nhà cả ngày." },
        ],
      },
      {
        title: { vi: "Một số động từ bất quy tắc", en: "Some irregular verbs" },
        body: {
          vi: "Vài động từ đổi dạng hoàn toàn — hãy học thuộc:\ngo → **went** (đi)\nhave → **had** (có, ăn)\nsee → **saw** (thấy, xem)\neat → **ate** (ăn)\nmeet → **met** (gặp)\nsleep → **slept** (ngủ)",
          en: "Some verbs change completely — learn them by heart:\ngo → **went**, have → **had**, see → **saw**, eat → **ate**, meet → **met**, sleep → **slept**",
        },
        examples: [
          { en: "We went to the beach last weekend.", vi: "Cuối tuần trước chúng tôi đi biển." },
          { en: "I met my friends and we had pizza.", vi: "Tôi gặp bạn bè và chúng tôi ăn pizza." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-07-ex01",
        type: 'listen-choose',
        audioText: "I played football on Saturday.",
        question: "When did he play football? (Anh ấy đá bóng khi nào?)",
        options: ["On Sunday", "On Saturday", "Yesterday", "Last Friday"],
        correctIndex: 1,
        explanation: { vi: "'on Saturday' = vào thứ Bảy.", en: "You heard 'on Saturday'." },
      },
      {
        id: "l1-listen-07-ex02",
        type: 'listen-choose',
        audioText: "We went to the beach.",
        question: "What do you hear? (Bạn nghe thấy gì?)",
        options: ["We went to the beach.", "We go to the beach.", "We want the beach.", "We were at the bank."],
        correctIndex: 0,
        explanation: {
          vi: "'went' là quá khứ của 'go'. Đừng nhầm với 'want' (muốn).",
          en: "'went' is the past of 'go'.",
        },
      },
      {
        id: "l1-listen-07-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối động từ với dạng quá khứ", en: "Match the verbs with their past forms" },
        pairs: [
          { left: "go", right: "went" },
          { left: "have", right: "had" },
          { left: "see", right: "saw" },
          { left: "eat", right: "ate" },
          { left: "watch", right: "watched" },
        ],
      },
      {
        id: "l1-listen-07-ex04",
        type: 'listen-type',
        audioText: "I watched a film with my family.",
        acceptedAnswers: ["I watched a film with my family."],
        explanation: {
          vi: "Chú ý âm '-ed' nhẹ ở cuối 'watched' (/wɒtʃt/).",
          en: "Listen for the short /t/ at the end of 'watched'.",
        },
      },
      {
        id: "l1-listen-07-ex05",
        type: 'listen-choose',
        audioText: "Mai: How was your weekend, Tom? Tom: It was great! I visited my grandparents.",
        question: "What did Tom do? (Tom đã làm gì?)",
        options: ["He visited his friends.", "He stayed at home.", "He visited his grandparents.", "He went to school."],
        correctIndex: 2,
        explanation: { vi: "Tom nói: 'I visited my grandparents' = Tôi đã đi thăm ông bà.", en: "Tom visited his grandparents." },
      },
      {
        id: "l1-listen-07-ex06",
        type: 'listen-choose',
        audioText: "Anna: What did you do on Sunday? Nam: I stayed at home and cooked dinner with my mum.",
        question: "Who did Nam cook with? (Nam nấu ăn cùng ai?)",
        options: ["His dad", "His sister", "His friend", "His mum"],
        correctIndex: 3,
        explanation: { vi: "'with my mum' = cùng mẹ tôi.", en: "Nam cooked with his mum." },
      },
      {
        id: "l1-listen-07-ex07",
        type: 'fill-blank',
        sentence: "Last weekend, I ___ to the cinema.",
        acceptedAnswers: ["went"],
        hint: "(go)",
        explanation: { vi: "'Last weekend' → quá khứ; go → went.", en: "Past time → go becomes 'went'." },
      },
      {
        id: "l1-listen-07-ex08",
        type: 'listen-choose',
        audioText: "Lisa: Was it sunny on Saturday? Ben: No, it wasn't. It was rainy, so we played games at home.",
        question: "Where did they play games? (Họ chơi trò chơi ở đâu?)",
        options: ["At home", "At the park", "At school", "At the beach"],
        correctIndex: 0,
        explanation: {
          vi: "Trời mưa nên họ chơi 'at home' (ở nhà).",
          en: "It was rainy, so they played at home.",
        },
      },
      {
        id: "l1-listen-07-ex09",
        type: 'fill-blank',
        sentence: "We ___ very tired after the long walk.",
        acceptedAnswers: ["were"],
        hint: "(be)",
        explanation: { vi: "Quá khứ của 'be' với 'we' là 'were'.", en: "With 'we', the past of 'be' is 'were'." },
      },
      {
        id: "l1-listen-07-ex10",
        type: 'multiple-choice',
        question: "Which word is about the past? (Từ nào chỉ quá khứ?)",
        options: ["tomorrow", "next week", "yesterday", "every day"],
        correctIndex: 2,
        explanation: { vi: "'yesterday' = hôm qua → quá khứ.", en: "'yesterday' is in the past." },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-07-test01",
        type: 'listen-choose',
        audioText: "Yesterday I had noodles for lunch.",
        question: "What did the speaker have for lunch? (Người nói ăn gì vào bữa trưa?)",
        options: ["Rice", "Noodles", "Bread", "Chicken"],
        correctIndex: 1,
        explanation: { vi: "'I had noodles' = Tôi đã ăn mì. 'had' là quá khứ của 'have'.", en: "'had' is the past of 'have'." },
      },
      {
        id: "l1-listen-07-test02",
        type: 'listen-type',
        audioText: "We had a great weekend.",
        acceptedAnswers: ["We had a great weekend."],
        explanation: { vi: "'We had a great weekend' = Chúng tôi đã có một cuối tuần tuyệt vời.", en: "A common way to say your weekend was good." },
      },
      {
        id: "l1-listen-07-test03",
        type: 'listen-choose',
        audioText: "Hoa: Did you go swimming on Saturday? Sam: No, I didn't. I went on Sunday.",
        question: "When did Sam go swimming? (Sam đi bơi khi nào?)",
        options: ["On Saturday", "On Friday", "On Sunday", "He did not go."],
        correctIndex: 2,
        explanation: {
          vi: "Sam nói 'No' với thứ Bảy, rồi 'I went on Sunday' → Chủ nhật.",
          en: "Sam says no to Saturday: 'I went on Sunday.'",
        },
      },
      {
        id: "l1-listen-07-test04",
        type: 'fill-blank',
        sentence: "She ___ a film last night.",
        acceptedAnswers: ["watched", "saw"],
        hint: "(watch)",
        explanation: { vi: "'last night' → quá khứ: watch → watched.", en: "'last night' → past: watched." },
      },
      {
        id: "l1-listen-07-test05",
        type: 'listen-choose',
        audioText: "Tom: My weekend was boring. I was ill, so I slept a lot.",
        question: "How was Tom's weekend? (Cuối tuần của Tom thế nào?)",
        options: ["Great", "Fun", "Busy", "Boring"],
        correctIndex: 3,
        explanation: { vi: "Tom nói 'My weekend was boring' = chán.", en: "Tom says it was boring." },
      },
      {
        id: "l1-listen-07-test06",
        type: 'listen-choose',
        audioText: "Mai: Last Saturday, I met my friends in the park and we played badminton.",
        question: "What did Mai play? (Mai đã chơi môn gì?)",
        options: ["Badminton", "Football", "Tennis", "Basketball"],
        correctIndex: 0,
        explanation: { vi: "'we played badminton' = chúng tôi chơi cầu lông.", en: "They played badminton." },
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Tin nhắn điện thoại — nghe tên (đánh vần), số điện thoại, giờ hẹn.
  // Rất giống IELTS Listening Part 1 (ghi lại thông tin từ cuộc gọi).
  // ==========================================================================
  {
    id: "l1-listen-08",
    skill: 'listening',
    title: { vi: "Nghe tin nhắn điện thoại", en: "A phone message" },
    description: {
      vi: "Nghe cuộc gọi và tin nhắn để ghi lại tên, số điện thoại và giờ hẹn.",
      en: "Listen to calls and messages and note names, phone numbers and times.",
    },
    teachingCards: [
      {
        title: { vi: "Câu thường gặp khi gọi điện", en: "Phone phrases" },
        body: {
          vi: "Giới thiệu mình: **Hello, this is Peter.** (KHÔNG nói 'I am Peter' trên điện thoại)\nMuốn gặp ai: **Can I speak to Mary, please?**\nNgười đó không có ở đây: **Sorry, she isn't here.**\nĐề nghị nhắn lại: **Can I take a message?**\nNhờ gọi lại: **Can you ask her to call me back?**",
          en: "Say who you are: **Hello, this is Peter.**\n**Can I speak to Mary, please?**\n**Sorry, she isn't here.**\n**Can I take a message?**\n**Can you ask her to call me back?**",
        },
        examples: [
          { en: "Hello, this is Peter. Can I speak to Mary, please?", vi: "Alo, tôi là Peter. Cho tôi nói chuyện với Mary được không?" },
          { en: "Sorry, she isn't here. Can I take a message?", vi: "Xin lỗi, cô ấy không có ở đây. Tôi nhắn lại giúp nhé?" },
        ],
      },
      {
        title: { vi: "Nghe số điện thoại", en: "Listening to phone numbers" },
        body: {
          vi: "Số điện thoại đọc **từng chữ số một**, chia thành nhóm nhỏ.\nSố 0 thường đọc là **'oh'** (như chữ O).\nHai số giống nhau: **double five** = 55.\nVD: 0983 455 721 → 'oh nine eight three, four double five, seven two one'.",
          en: "Phone numbers are read **one digit at a time**, in small groups.\n0 is often said **'oh'**.\nTwo same numbers: **double five** = 55.",
        },
        examples: [
          { en: "My number is oh nine one two, three double four, eight six seven.", vi: "Số của tôi là 0912 344 867." },
        ],
      },
      {
        title: { vi: "Ghi lại tin nhắn", en: "Taking notes from a message" },
        body: {
          vi: "Khi nghe tin nhắn, hãy tìm 4 thông tin chính:\n**Who?** – Ai gọi? (tên, có thể được đánh vần)\n**What?** – Có việc gì?\n**When?** – Ngày, giờ nào?\n**Number?** – Gọi lại số nào?\nMẹo: tin nhắn hay có chỗ đổi thông tin — **'on Friday, not Thursday'**.",
          en: "In a message, listen for 4 things:\n**Who?** **What?** **When?** **Number?**\nTip: watch for corrections — **'on Friday, not Thursday'**.",
        },
        examples: [
          { en: "The meeting is on Friday, not Thursday.", vi: "Cuộc họp vào thứ Sáu, không phải thứ Năm." },
          { en: "Please call me back after six o'clock.", vi: "Hãy gọi lại cho tôi sau 6 giờ." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-08-ex01",
        type: 'listen-choose',
        audioText: "Hello, this is Peter. Can I speak to Mary, please?",
        question: "Who is calling? (Ai đang gọi?)",
        options: ["Mary", "Peter", "Paul", "Martin"],
        correctIndex: 1,
        explanation: {
          vi: "'This is Peter' = Tôi là Peter (người gọi). Mary là người anh ấy muốn gặp.",
          en: "'This is Peter' tells us who is calling.",
        },
      },
      {
        id: "l1-listen-08-ex02",
        type: 'listen-choose',
        audioText: "Sorry, she isn't here. Can I take a message?",
        question: "What does the speaker offer to do? (Người nói đề nghị làm gì?)",
        options: ["To call later", "To give a new number", "To take a message", "To send an email"],
        correctIndex: 2,
        explanation: { vi: "'Can I take a message?' = Tôi nhắn lại giúp bạn nhé?", en: "The speaker offers to take a message." },
      },
      {
        id: "l1-listen-08-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối cụm từ với nghĩa", en: "Match the phrases with their meanings" },
        pairs: [
          { left: "take a message", right: "nhận lời nhắn" },
          { left: "call back", right: "gọi lại" },
          { left: "speak to", right: "nói chuyện với" },
          { left: "phone number", right: "số điện thoại" },
          { left: "double five", right: "55" },
        ],
      },
      {
        id: "l1-listen-08-ex04",
        type: 'listen-type',
        audioText: "Can you ask her to call me back?",
        acceptedAnswers: ["Can you ask her to call me back?"],
        explanation: { vi: "'call me back' = gọi lại cho tôi.", en: "'call me back' means phone me again." },
      },
      {
        id: "l1-listen-08-ex05",
        type: 'listen-choose',
        audioText: "My number is oh nine eight three, four five six, seven two one.",
        question: "What is the phone number? (Số điện thoại là gì?)",
        options: ["0983 456 721", "0938 456 721", "0983 465 721", "0983 456 712"],
        correctIndex: 0,
        explanation: {
          vi: "'oh nine eight three' = 0983, 'four five six' = 456, 'seven two one' = 721.",
          en: "0983 456 721.",
        },
      },
      {
        id: "l1-listen-08-ex06",
        type: 'listen-choose',
        audioText: "Jack: Please tell David to meet me at the station at half past four.",
        question: "What time is the meeting? (Họ gặp nhau lúc mấy giờ?)",
        options: ["4:15", "4:45", "5:30", "4:30"],
        correctIndex: 3,
        explanation: { vi: "'half past four' = 4 giờ 30.", en: "'half past four' = 4:30." },
      },
      {
        id: "l1-listen-08-ex07",
        type: 'listen-choose',
        audioText: "My surname is Wood. W, double O, D.",
        question: "How do you spell the surname? (Họ được viết thế nào?)",
        options: ["Wod", "Wood", "Woode", "Wodd"],
        correctIndex: 1,
        explanation: { vi: "'double O' = hai chữ O → W-O-O-D.", en: "'double O' = OO → Wood." },
      },
      {
        id: "l1-listen-08-ex08",
        type: 'fill-blank',
        sentence: "Hello, ___ is Anna. Can I speak to Mr Brown, please?",
        acceptedAnswers: ["this"],
        explanation: {
          vi: "Trên điện thoại, nói 'This is + tên' để giới thiệu mình.",
          en: "On the phone, say 'This is + name'.",
        },
      },
      {
        id: "l1-listen-08-ex09",
        type: 'listen-choose',
        audioText: "Sarah: Hi Tom, it's Sarah. The football match is on Friday, not Thursday. It starts at seven o'clock. Bye!",
        question: "When is the match? (Trận đấu diễn ra khi nào?)",
        options: ["Thursday at 7:00", "Friday at 11:00", "Friday at 7:00", "Thursday at 11:00"],
        correctIndex: 2,
        explanation: {
          vi: "'on Friday, not Thursday' → thứ Sáu; 'seven o'clock' → 7 giờ.",
          en: "Friday (not Thursday) at seven o'clock.",
        },
      },
      {
        id: "l1-listen-08-ex10",
        type: 'multiple-choice',
        question: "On the phone, how do you say who you are? (Trên điện thoại, giới thiệu mình thế nào?)",
        options: ["This is Linh.", "I am the phone of Linh.", "Here is Linh phone.", "My phone is Linh."],
        correctIndex: 0,
        explanation: { vi: "Cách nói chuẩn: 'This is Linh.'", en: "The usual way is 'This is Linh.'" },
      },
    ],
    // Mini test: 4 câu đầu dùng chung 1 tin nhắn thoại dài (giống IELTS Part 1).
    miniTest: [
      {
        id: "l1-listen-08-test01",
        type: 'listen-choose',
        audioText: "Hello, this message is for Mr Lee. This is Emma Clark from Sunny Dental Clinic. Your appointment is on Tuesday at a quarter past ten. Please call us back on oh two four, three eight six, double five, nine one. Thank you.",
        question: "Who is the message for? (Tin nhắn gửi cho ai?)",
        options: ["Mr Lee", "Emma Clark", "Mr Clark", "Ms Lee"],
        correctIndex: 0,
        explanation: { vi: "'This message is for Mr Lee' → gửi cho ông Lee. Emma Clark là người gọi.", en: "The message is for Mr Lee." },
      },
      {
        id: "l1-listen-08-test02",
        type: 'listen-choose',
        audioText: "Hello, this message is for Mr Lee. This is Emma Clark from Sunny Dental Clinic. Your appointment is on Tuesday at a quarter past ten. Please call us back on oh two four, three eight six, double five, nine one. Thank you.",
        question: "What day is the appointment? (Lịch hẹn vào thứ mấy?)",
        options: ["Monday", "Thursday", "Tuesday", "Wednesday"],
        correctIndex: 2,
        explanation: { vi: "'on Tuesday' = vào thứ Ba.", en: "The appointment is on Tuesday." },
      },
      {
        id: "l1-listen-08-test03",
        type: 'listen-choose',
        audioText: "Hello, this message is for Mr Lee. This is Emma Clark from Sunny Dental Clinic. Your appointment is on Tuesday at a quarter past ten. Please call us back on oh two four, three eight six, double five, nine one. Thank you.",
        question: "What time is the appointment? (Lịch hẹn lúc mấy giờ?)",
        options: ["10:45", "10:15", "2:15", "9:15"],
        correctIndex: 1,
        explanation: { vi: "'a quarter past ten' = 10 giờ 15.", en: "'a quarter past ten' = 10:15." },
      },
      {
        id: "l1-listen-08-test04",
        type: 'listen-choose',
        audioText: "Hello, this message is for Mr Lee. This is Emma Clark from Sunny Dental Clinic. Your appointment is on Tuesday at a quarter past ten. Please call us back on oh two four, three eight six, double five, nine one. Thank you.",
        question: "What number should Mr Lee call? (Ông Lee cần gọi lại số nào?)",
        options: ["024 386 5519", "024 368 5591", "042 386 5591", "024 386 5591"],
        correctIndex: 3,
        explanation: {
          vi: "'oh two four' = 024, 'three eight six' = 386, 'double five, nine one' = 5591.",
          en: "024 386 5591.",
        },
      },
      {
        id: "l1-listen-08-test05",
        type: 'listen-type',
        audioText: "Please call me back.",
        acceptedAnswers: ["Please call me back."],
        explanation: { vi: "'Please call me back' = Làm ơn gọi lại cho tôi.", en: "Ask someone to phone you again." },
      },
      {
        id: "l1-listen-08-test06",
        type: 'fill-blank',
        sentence: "Sorry, she isn't here. Can I take a ___?",
        acceptedAnswers: ["message"],
        explanation: { vi: "'take a message' = nhận lời nhắn giúp.", en: "'take a message' = write down information for someone." },
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Bản tin thời tiết — nghe dự báo (will + thời tiết), nhiệt độ, địa
  // điểm và thời điểm (sáng/chiều, hôm nay/ngày mai).
  // ==========================================================================
  {
    id: "l1-listen-09",
    skill: 'listening',
    title: { vi: "Nghe bản tin thời tiết", en: "A simple weather report" },
    description: {
      vi: "Nghe dự báo thời tiết ngắn: thời tiết, nhiệt độ, nơi chốn và thời gian.",
      en: "Understand a short weather forecast: weather, temperature, places and times.",
    },
    teachingCards: [
      {
        title: { vi: "Dự báo dùng 'will'", en: "Forecasts use 'will'" },
        body: {
          vi: "Nói về thời tiết **sắp tới** dùng **will**:\n**It will be sunny tomorrow.** – Ngày mai trời sẽ nắng.\n**There will be rain in the afternoon.** – Buổi chiều sẽ có mưa.\nKhi nói nhanh: **It'll** = It will.\n**forecast** = dự báo; **weather forecast** = dự báo thời tiết.",
          en: "For the **future**, use **will**:\n**It will be sunny tomorrow.**\n**There will be rain in the afternoon.**\nShort form: **It'll** = It will.\n**forecast** = what the weather will be.",
        },
        examples: [
          { en: "It'll be cloudy this morning.", vi: "Sáng nay trời sẽ nhiều mây." },
          { en: "There will be a storm tonight.", vi: "Tối nay sẽ có bão." },
        ],
      },
      {
        title: { vi: "Nhiệt độ", en: "Temperature" },
        body: {
          vi: "**temperature** = nhiệt độ; **degrees** = độ.\n**thirty degrees** = 30°C. **minus two degrees** = -2°C.\nCẩn thận: **thirteen** (13) ≠ **thirty** (30) — trọng âm khác nhau: thir**TEEN** / **THIR**ty.\nSo sánh: **hotter** (nóng hơn), **colder** (lạnh hơn).",
          en: "**temperature**, **degrees**: **thirty degrees** = 30°C.\nCareful: thir**TEEN** (13) vs **THIR**ty (30).\n**hotter**, **colder**.",
        },
        examples: [
          { en: "The temperature is thirty degrees.", vi: "Nhiệt độ là 30 độ." },
          { en: "Tomorrow will be colder.", vi: "Ngày mai sẽ lạnh hơn." },
        ],
      },
      {
        title: { vi: "Mẹo: nghe NƠI và LÚC", en: "Tip: listen for PLACE and TIME" },
        body: {
          vi: "Bản tin thường nói nhiều nơi và nhiều thời điểm. Hãy gạch chân trong câu hỏi:\n**Nơi**: in the north (miền bắc), in the south (miền nam), in Ha Noi...\n**Lúc**: this morning, this afternoon, tonight, tomorrow...\nRồi chỉ nghe kỹ thông tin ĐI SAU từ đó.",
          en: "Reports talk about many places and times. Underline them in the question:\n**Place**: in the north, in the south, in Ha Noi...\n**Time**: this morning, this afternoon, tonight, tomorrow...\nThen listen carefully after those words.",
        },
        examples: [
          { en: "In the north, it will be cold and windy.", vi: "Ở miền bắc, trời sẽ lạnh và có gió." },
          { en: "This afternoon there will be some rain.", vi: "Chiều nay sẽ có mưa." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-09-ex01",
        type: 'listen-choose',
        audioText: "Tomorrow it will be sunny and hot.",
        question: "What will the weather be like tomorrow? (Ngày mai thời tiết thế nào?)",
        options: ["Rainy and cold", "Sunny and hot", "Cloudy", "Windy"],
        correctIndex: 1,
        explanation: { vi: "'sunny and hot' = nắng và nóng.", en: "You heard 'sunny and hot'." },
      },
      {
        id: "l1-listen-09-ex02",
        type: 'listen-choose',
        audioText: "The temperature today is thirty-two degrees.",
        question: "What is the temperature? (Nhiệt độ là bao nhiêu?)",
        options: ["23°C", "30°C", "32°C", "33°C"],
        correctIndex: 2,
        explanation: { vi: "'thirty-two' = 32.", en: "'thirty-two degrees' = 32°C." },
      },
      {
        id: "l1-listen-09-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối từ với nghĩa", en: "Match the words with their meanings" },
        pairs: [
          { left: "forecast", right: "dự báo" },
          { left: "temperature", right: "nhiệt độ" },
          { left: "degrees", right: "độ" },
          { left: "storm", right: "bão" },
          { left: "north", right: "phía bắc" },
          { left: "south", right: "phía nam" },
        ],
      },
      {
        id: "l1-listen-09-ex04",
        type: 'listen-type',
        audioText: "It will be cloudy in the morning.",
        acceptedAnswers: ["It will be cloudy in the morning.", "It'll be cloudy in the morning."],
        explanation: { vi: "'It will be cloudy' = Trời sẽ nhiều mây.", en: "'will be' talks about the future." },
      },
      {
        id: "l1-listen-09-ex05",
        type: 'listen-choose',
        audioText: "In the north, it will be cold and windy. In the south, it will be warm and sunny.",
        question: "What will the weather be like in the south? (Miền nam thời tiết thế nào?)",
        options: ["Cold and windy", "Cold and sunny", "Warm and windy", "Warm and sunny"],
        correctIndex: 3,
        explanation: {
          vi: "Sau 'In the south' là 'warm and sunny' (ấm và nắng). 'Cold and windy' là miền bắc.",
          en: "After 'In the south' you hear 'warm and sunny'.",
        },
      },
      {
        id: "l1-listen-09-ex06",
        type: 'listen-choose',
        audioText: "This morning it is cloudy, but this afternoon there will be heavy rain.",
        question: "What will the weather be like this afternoon? (Chiều nay thời tiết thế nào?)",
        options: ["Heavy rain", "Sunny", "Cloudy", "Snow"],
        correctIndex: 0,
        explanation: {
          vi: "'Cloudy' là buổi sáng. Buổi chiều: 'heavy rain' (mưa to).",
          en: "Cloudy is this morning; this afternoon there will be heavy rain.",
        },
      },
      {
        id: "l1-listen-09-ex07",
        type: 'fill-blank',
        sentence: "Look at the forecast. Tomorrow it ___ be rainy.",
        acceptedAnswers: ["will"],
        explanation: { vi: "Nói về tương lai (tomorrow) dùng 'will'.", en: "Use 'will' for the future." },
      },
      {
        id: "l1-listen-09-ex08",
        type: 'listen-choose',
        audioText: "Here is the weather for Da Nang. Today it is twenty-eight degrees. Tomorrow it will be hotter: thirty-one degrees.",
        question: "What will the temperature be tomorrow? (Nhiệt độ ngày mai là bao nhiêu?)",
        options: ["28°C", "31°C", "21°C", "38°C"],
        correctIndex: 1,
        explanation: {
          vi: "28 độ là hôm nay. Ngày mai: 'thirty-one degrees' = 31°C.",
          en: "28°C is today; tomorrow is 31°C.",
        },
      },
      {
        id: "l1-listen-09-ex09",
        type: 'listen-type',
        audioText: "The temperature is twenty degrees.",
        acceptedAnswers: ["The temperature is twenty degrees.", "The temperature is 20 degrees."],
        explanation: { vi: "'temperature' = nhiệt độ; 'twenty degrees' = 20 độ.", en: "'twenty degrees' = 20°C." },
      },
      {
        id: "l1-listen-09-ex10",
        type: 'multiple-choice',
        question: "A 'storm' is ...",
        options: ["a hot sunny day", "a light wind", "very bad weather with strong wind and rain", "a cold morning"],
        correctIndex: 2,
        explanation: { vi: "'storm' = bão: gió mạnh và mưa to.", en: "A storm has strong wind and heavy rain." },
      },
    ],
    // Mini test: dùng chung 1 bản tin thời tiết (trừ câu nghe-gõ).
    miniTest: [
      {
        id: "l1-listen-09-test01",
        type: 'listen-choose',
        audioText: "Good morning. Here is the weather forecast for Saturday. In Ha Noi, it will be cool and cloudy, with a temperature of nineteen degrees. In Hue, there will be rain all day. In Ho Chi Minh City, it will be hot and sunny, about thirty-four degrees. Have a nice weekend!",
        question: "Which day is the forecast for? (Bản tin dự báo cho ngày nào?)",
        options: ["Friday", "Sunday", "Saturday", "Monday"],
        correctIndex: 2,
        explanation: { vi: "'the weather forecast for Saturday' → thứ Bảy.", en: "The forecast is for Saturday." },
      },
      {
        id: "l1-listen-09-test02",
        type: 'listen-choose',
        audioText: "Good morning. Here is the weather forecast for Saturday. In Ha Noi, it will be cool and cloudy, with a temperature of nineteen degrees. In Hue, there will be rain all day. In Ho Chi Minh City, it will be hot and sunny, about thirty-four degrees. Have a nice weekend!",
        question: "What will the weather be like in Ha Noi? (Thời tiết Hà Nội thế nào?)",
        options: ["Cool and cloudy", "Hot and sunny", "Rainy all day", "Cold and windy"],
        correctIndex: 0,
        explanation: { vi: "'In Ha Noi, it will be cool and cloudy' = mát và nhiều mây.", en: "Ha Noi: cool and cloudy." },
      },
      {
        id: "l1-listen-09-test03",
        type: 'listen-choose',
        audioText: "Good morning. Here is the weather forecast for Saturday. In Ha Noi, it will be cool and cloudy, with a temperature of nineteen degrees. In Hue, there will be rain all day. In Ho Chi Minh City, it will be hot and sunny, about thirty-four degrees. Have a nice weekend!",
        question: "What will the temperature be in Ha Noi? (Nhiệt độ ở Hà Nội là bao nhiêu?)",
        options: ["9°C", "29°C", "15°C", "19°C"],
        correctIndex: 3,
        explanation: { vi: "'nineteen degrees' = 19°C.", en: "'nineteen degrees' = 19°C." },
      },
      {
        id: "l1-listen-09-test04",
        type: 'listen-choose',
        audioText: "Good morning. Here is the weather forecast for Saturday. In Ha Noi, it will be cool and cloudy, with a temperature of nineteen degrees. In Hue, there will be rain all day. In Ho Chi Minh City, it will be hot and sunny, about thirty-four degrees. Have a nice weekend!",
        question: "Where will it rain all day? (Nơi nào mưa cả ngày?)",
        options: ["Ha Noi", "Hue", "Ho Chi Minh City", "Da Nang"],
        correctIndex: 1,
        explanation: { vi: "'In Hue, there will be rain all day' → Huế.", en: "It will rain all day in Hue." },
      },
      {
        id: "l1-listen-09-test05",
        type: 'listen-type',
        audioText: "It will be windy tomorrow.",
        acceptedAnswers: ["It will be windy tomorrow.", "It'll be windy tomorrow."],
        explanation: { vi: "'It will be windy tomorrow' = Ngày mai trời sẽ có gió.", en: "A short forecast for tomorrow." },
      },
      {
        id: "l1-listen-09-test06",
        type: 'listen-choose',
        audioText: "Good morning. Here is the weather forecast for Saturday. In Ha Noi, it will be cool and cloudy, with a temperature of nineteen degrees. In Hue, there will be rain all day. In Ho Chi Minh City, it will be hot and sunny, about thirty-four degrees. Have a nice weekend!",
        question: "How hot will it be in Ho Chi Minh City? (TP. Hồ Chí Minh nóng bao nhiêu độ?)",
        options: ["About 34°C", "About 43°C", "About 30°C", "About 24°C"],
        correctIndex: 0,
        explanation: { vi: "'about thirty-four degrees' = khoảng 34°C.", en: "About thirty-four degrees = 34°C." },
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Thông báo ở trường / câu lạc bộ — một người nói, đưa thông tin
  // (sự kiện gì, ở đâu, lúc nào, mang gì). Đây là bước làm quen với
  // IELTS Listening Part 2 (độc thoại, bối cảnh đời sống).
  // ==========================================================================
  {
    id: "l1-listen-10",
    skill: 'listening',
    title: { vi: "Nghe thông báo của trường, câu lạc bộ", en: "A school or club announcement" },
    description: {
      vi: "Nghe thông báo ngắn và ghi lại sự kiện, thời gian, địa điểm, đồ cần mang.",
      en: "Listen to a short announcement and note the event, time, place and what to bring.",
    },
    teachingCards: [
      {
        title: { vi: "Thông báo có gì?", en: "What is in an announcement?" },
        body: {
          vi: "Thông báo thường mở đầu: **Hello, everyone.** / **Attention, please.** (Mọi người chú ý)\nSau đó cho biết:\n**What** – sự kiện gì (club, trip, meeting)\n**When** – ngày, giờ\n**Where** – ở đâu (Room 12, the hall, the library)\n**What to bring** – mang theo gì\n**How to join** – đăng ký thế nào (**sign up**)",
          en: "Starts with **Hello, everyone.** / **Attention, please.**\nThen tells you:\n**What** – the event\n**When** – day and time\n**Where** – the place\n**What to bring**\n**How to join** – **sign up**",
        },
        examples: [
          { en: "Attention, please. The school trip is on Friday.", vi: "Mọi người chú ý. Chuyến dã ngoại của trường vào thứ Sáu." },
          { en: "Please sign up in the library.", vi: "Hãy đăng ký ở thư viện." },
        ],
      },
      {
        title: { vi: "Từ hay gặp", en: "Useful words" },
        body: {
          vi: "**club** = câu lạc bộ, **meet** = gặp, họp\n**hall** = hội trường, **floor** = tầng (the second floor = tầng 2)\n**bring** = mang theo, **sign up** = đăng ký\n**free** = miễn phí, **cost** = giá, **start** = bắt đầu",
          en: "**club**, **meet**, **hall**, **floor**, **bring**, **sign up**, **free**, **cost**, **start**",
        },
        examples: [
          { en: "The club meets every Wednesday in the hall.", vi: "Câu lạc bộ họp vào thứ Tư hằng tuần ở hội trường." },
          { en: "It's free for students.", vi: "Miễn phí cho học sinh." },
        ],
      },
      {
        title: { vi: "Làm quen với IELTS Part 1 & 2", en: "Getting ready for IELTS Parts 1 & 2" },
        body: {
          vi: "**Part 1**: hai người nói chuyện (VD gọi điện đặt chỗ) → bạn điền thông tin vào mẫu đơn.\n**Part 2**: **một người nói** về một chủ đề đời sống (VD thông báo của câu lạc bộ).\nMẹo: đọc câu hỏi trước và **đoán loại thông tin** cần nghe: giờ? số phòng? tên? giá?",
          en: "**Part 1**: two people talk (e.g. a booking) → you complete a form.\n**Part 2**: **one person** talks about everyday life (e.g. a club announcement).\nTip: read the questions first and **predict the type of answer**: a time? a room number? a name? a price?",
        },
        examples: [
          { en: "The meeting is in Room 15.", vi: "Buổi họp ở phòng 15. (cần nghe một con số)" },
          { en: "It starts at half past three.", vi: "Bắt đầu lúc 3 giờ 30. (cần nghe giờ)" },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-10-ex01",
        type: 'listen-choose',
        audioText: "Hello, everyone. The English Club meets every Wednesday.",
        question: "When does the club meet? (Câu lạc bộ họp khi nào?)",
        options: ["Every Monday", "Every Tuesday", "Every Wednesday", "Every Thursday"],
        correctIndex: 2,
        explanation: { vi: "'every Wednesday' = thứ Tư hằng tuần.", en: "The club meets every Wednesday." },
      },
      {
        id: "l1-listen-10-ex02",
        type: 'listen-choose',
        audioText: "The meeting is in Room 12, on the second floor.",
        question: "Which room is the meeting in? (Buổi họp ở phòng nào?)",
        options: ["Room 20", "Room 12", "Room 2", "Room 21"],
        correctIndex: 1,
        explanation: { vi: "'Room 12' (twelve). 'second floor' là tầng, không phải số phòng.", en: "Room 12; 'second' is the floor." },
      },
      {
        id: "l1-listen-10-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối từ với nghĩa", en: "Match the words with their meanings" },
        pairs: [
          { left: "club", right: "câu lạc bộ" },
          { left: "hall", right: "hội trường" },
          { left: "bring", right: "mang theo" },
          { left: "sign up", right: "đăng ký" },
          { left: "floor", right: "tầng" },
          { left: "free", right: "miễn phí" },
        ],
      },
      {
        id: "l1-listen-10-ex04",
        type: 'listen-type',
        audioText: "Please bring a pen and a notebook.",
        acceptedAnswers: ["Please bring a pen and a notebook."],
        explanation: { vi: "'bring' = mang theo; 'notebook' = vở.", en: "'bring' means take something with you." },
      },
      {
        id: "l1-listen-10-ex05",
        type: 'listen-choose',
        audioText: "The football club starts at four fifteen, after school.",
        question: "What time does the football club start? (Câu lạc bộ bóng đá bắt đầu lúc mấy giờ?)",
        options: ["4:15", "4:50", "5:15", "4:05"],
        correctIndex: 0,
        explanation: { vi: "'four fifteen' = 4:15. Chú ý 'fifteen' (15) khác 'fifty' (50).", en: "'four fifteen' = 4:15." },
      },
      {
        id: "l1-listen-10-ex06",
        type: 'listen-choose',
        audioText: "Attention, please. The school trip is on Friday the tenth of May. The bus leaves at seven thirty.",
        question: "What is the date of the trip? (Chuyến đi vào ngày nào?)",
        options: ["1st May", "7th May", "30th May", "10th May"],
        correctIndex: 3,
        explanation: {
          vi: "'the tenth of May' = ngày 10 tháng 5. 'seven thirty' là giờ xe chạy.",
          en: "'the tenth of May' = 10th May. 'Seven thirty' is the bus time.",
        },
      },
      {
        id: "l1-listen-10-ex07",
        type: 'fill-blank',
        sentence: "Do you want to join the club? Please ___ up in the library.",
        acceptedAnswers: ["sign"],
        explanation: { vi: "'sign up' = đăng ký tham gia.", en: "'sign up' means put your name on the list to join." },
      },
      {
        id: "l1-listen-10-ex08",
        type: 'listen-choose',
        audioText: "The art club is free for students. Teachers pay two pounds.",
        question: "How much do students pay? (Học sinh trả bao nhiêu?)",
        options: ["£2", "Nothing", "£12", "£20"],
        correctIndex: 1,
        explanation: {
          vi: "'free for students' = miễn phí cho học sinh. £2 là giá cho giáo viên.",
          en: "It is free for students; teachers pay £2.",
        },
      },
      {
        id: "l1-listen-10-ex09",
        type: 'listen-choose',
        audioText: "Students in the music club should bring their own instruments. We have chairs and music stands for everyone.",
        question: "What must students bring? (Học sinh phải mang gì?)",
        options: ["Chairs", "Music stands", "Their own instruments", "Books"],
        correctIndex: 2,
        explanation: {
          vi: "'bring their own instruments' = mang nhạc cụ của mình. Ghế và giá nhạc đã có sẵn.",
          en: "They bring their own instruments; chairs and stands are already there.",
        },
      },
      {
        id: "l1-listen-10-ex10",
        type: 'multiple-choice',
        question: "In IELTS Listening Part 2, you usually hear ...",
        options: ["one person giving information", "two friends chatting", "a song", "a teacher and many students talking"],
        correctIndex: 0,
        explanation: {
          vi: "Part 2 là độc thoại: một người nói về chủ đề đời sống, như một thông báo.",
          en: "Part 2 is one speaker talking about an everyday topic, like an announcement.",
        },
      },
    ],
    // Mini test: 5 câu dùng chung 1 thông báo của thầy dạy thể dục.
    miniTest: [
      {
        id: "l1-listen-10-test01",
        type: 'listen-choose',
        audioText: "Good afternoon, students. This is Mr Hall, the sports teacher. Our new swimming club starts next Tuesday. We meet at the city pool at half past three. Please bring a towel and a bottle of water. The club is free, but you need to sign up with me in Room 15 before Friday. Thank you.",
        question: "Who is speaking? (Ai đang nói?)",
        options: ["A music teacher", "A student", "The sports teacher", "A swimmer from the city pool"],
        correctIndex: 2,
        explanation: { vi: "'This is Mr Hall, the sports teacher' → thầy dạy thể dục.", en: "Mr Hall is the sports teacher." },
      },
      {
        id: "l1-listen-10-test02",
        type: 'listen-choose',
        audioText: "Good afternoon, students. This is Mr Hall, the sports teacher. Our new swimming club starts next Tuesday. We meet at the city pool at half past three. Please bring a towel and a bottle of water. The club is free, but you need to sign up with me in Room 15 before Friday. Thank you.",
        question: "When does the swimming club start? (Câu lạc bộ bơi bắt đầu khi nào?)",
        options: ["Next Tuesday", "Next Thursday", "This Friday", "Next Friday"],
        correctIndex: 0,
        explanation: {
          vi: "'starts next Tuesday' = bắt đầu thứ Ba tới. 'Friday' là hạn đăng ký.",
          en: "It starts next Tuesday. Friday is the sign-up deadline.",
        },
      },
      {
        id: "l1-listen-10-test03",
        type: 'listen-choose',
        audioText: "Good afternoon, students. This is Mr Hall, the sports teacher. Our new swimming club starts next Tuesday. We meet at the city pool at half past three. Please bring a towel and a bottle of water. The club is free, but you need to sign up with me in Room 15 before Friday. Thank you.",
        question: "What time do they meet? (Họ gặp nhau lúc mấy giờ?)",
        options: ["3:00", "3:15", "13:30", "3:30"],
        correctIndex: 3,
        explanation: { vi: "'half past three' = 3 giờ 30.", en: "'half past three' = 3:30." },
      },
      {
        id: "l1-listen-10-test04",
        type: 'listen-choose',
        audioText: "Good afternoon, students. This is Mr Hall, the sports teacher. Our new swimming club starts next Tuesday. We meet at the city pool at half past three. Please bring a towel and a bottle of water. The club is free, but you need to sign up with me in Room 15 before Friday. Thank you.",
        question: "What should students bring? (Học sinh nên mang gì?)",
        options: [
          "Swimming shoes and a towel",
          "A towel and a bottle of water",
          "A hat and a bottle of water",
          "Money and a towel",
        ],
        correctIndex: 1,
        explanation: {
          vi: "'bring a towel and a bottle of water' = mang khăn tắm và một chai nước. Câu lạc bộ miễn phí nên không cần tiền.",
          en: "A towel and a bottle of water. The club is free, so no money.",
        },
      },
      {
        id: "l1-listen-10-test05",
        type: 'listen-choose',
        audioText: "Good afternoon, students. This is Mr Hall, the sports teacher. Our new swimming club starts next Tuesday. We meet at the city pool at half past three. Please bring a towel and a bottle of water. The club is free, but you need to sign up with me in Room 15 before Friday. Thank you.",
        question: "Where do students sign up? (Học sinh đăng ký ở đâu?)",
        options: ["At the city pool", "In Room 50", "In Room 15", "In the library"],
        correctIndex: 2,
        explanation: {
          vi: "'sign up with me in Room 15' → phòng 15 (fifteen), không phải 50 (fifty).",
          en: "Room 15 (fifteen), not 50.",
        },
      },
      {
        id: "l1-listen-10-test06",
        type: 'listen-type',
        audioText: "The club is free for all students.",
        acceptedAnswers: ["The club is free for all students."],
        explanation: { vi: "'free' = miễn phí.", en: "'free' means you don't pay." },
      },
    ],
  },
]
