/**
 * reading-lessons-part2.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI HỌC ĐỌC (READING) — LEVEL 1, PHẦN 2 (bài 5 → bài 10).
 * Band 0 – 2.0 (người mới bắt đầu, khoảng pre-A1/A1).
 *
 * Nối tiếp file reading-lessons.ts (bài 1-4). Chủ đề phần này:
 *   - Bài 5 : Đọc thực đơn và giá tiền
 *   - Bài 6 : Đọc tin nhắn / đoạn chat giữa hai người bạn
 *   - Bài 7 : Đọc bưu thiếp gửi từ kỳ nghỉ
 *   - Bài 8 : Đọc nội quy phòng gym
 *   - Bài 9 : Đọc đoạn mô tả một thị trấn (100-130 từ)
 *   - Bài 10: Đọc bài blog về cuối tuần (130-150 từ) — True/False/Not Given + nối thông tin
 *
 * Mỗi bài: 2-3 thẻ lý thuyết, 1 đoạn văn (readingPassages), 10 bài luyện, 6 câu mini test.
 * Bài tập nào dựa trên đoạn văn thì có passageId để giao diện hiện đoạn văn bên cạnh.
 * Từ bài 4 trở đi được dùng NOT GIVEN (allowNotGiven: true).
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1ReadingLessonsPart2: Lesson[] = [
  // ==========================================================================
  // BÀI 5: Đọc thực đơn và giá tiền
  // ==========================================================================
  {
    id: 'l1-read-05',
    skill: 'reading',
    title: { vi: 'Đọc thực đơn và giá tiền', en: 'Reading a menu and prices' },
    description: {
      vi: 'Đọc thực đơn quán ăn, hiểu các mục món ăn và cách đọc giá tiền.',
      en: 'Read a café menu, understand its sections and say prices.',
    },
    teachingCards: [
      {
        title: { vi: 'Các phần của một thực đơn', en: 'The parts of a menu' },
        body: {
          vi: 'Thực đơn thường chia thành các mục:\n**BREAKFAST** – bữa sáng · **LUNCH / DINNER** – bữa trưa / tối\n**DESSERTS** – món tráng miệng · **DRINKS** – đồ uống\nKý hiệu **(V)** = **vegetarian** – món chay (không có thịt, cá).\nMẹo: muốn tìm món nào, hãy nhìn **tên mục** trước, rồi mới tìm món.',
          en: 'A menu is usually divided into sections:\n**BREAKFAST** · **LUNCH / DINNER**\n**DESSERTS** – sweet food after a meal · **DRINKS**\n**(V)** = **vegetarian** – no meat or fish.\nTip: to find a dish, look at the **section names** first.',
        },
        examples: [
          { en: 'Vegetable pizza (V)', vi: 'Pizza rau (món chay)' },
          { en: 'DESSERTS: chocolate cake, ice cream', vi: 'TRÁNG MIỆNG: bánh sô-cô-la, kem' },
        ],
      },
      {
        title: { vi: 'Cách đọc giá tiền', en: 'How to say prices' },
        body: {
          vi: 'Ký hiệu **£** = pound (bảng Anh), **$** = dollar (đô la).\n**£4.50** đọc là **four pounds fifty** (hoặc "four fifty").\n**£1.00** đọc là **one pound**.\n**$2.25** đọc là **two dollars twenty-five**.\nHỏi giá: **How much is it?** – Bao nhiêu tiền? Trả lời: **It\'s £3.**',
          en: '**£** = pound, **$** = dollar.\n**£4.50** = **four pounds fifty** (or "four fifty").\n**£1.00** = **one pound**.\n**$2.25** = **two dollars twenty-five**.\nAsk: **How much is it?** Answer: **It\'s £3.**',
        },
        examples: [
          { en: 'How much is the orange juice? – It\'s two pounds twenty.', vi: 'Nước cam bao nhiêu tiền? – Hai bảng hai mươi xu.' },
          { en: 'The burger is seven pounds fifty.', vi: 'Bánh burger giá bảy bảng năm mươi xu.' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l1-read-05-p1',
        title: 'Café Sunflower – Menu',
        text: 'CAFÉ SUNFLOWER\nOpen every day, 7 am – 9 pm\n\nBREAKFAST (7 am – 11 am)\nEggs and toast ........ £4.50\nPancakes with fruit ........ £5.00\n\nLUNCH AND DINNER\nChicken soup ........ £3.80\nBeef burger and chips ........ £7.50\nVegetable pizza (V) ........ £6.00\nFish and rice ........ £8.20\n\nDESSERTS\nChocolate cake ........ £3.00\nIce cream (2 scoops) ........ £2.50\n\nDRINKS\nTea / Coffee ........ £1.80\nOrange juice ........ £2.20\nWater ........ £1.00\n\n(V) = vegetarian – no meat or fish\nKids\' menu: please ask our staff!',
      },
    ],
    exercises: [
      {
        id: 'l1-read-05-ex01',
        type: 'multiple-choice',
        passageId: 'l1-read-05-p1',
        question: 'How much is the fish and rice?',
        options: ['£7.50', '£6.00', '£8.20', '£3.80'],
        correctIndex: 2,
        explanation: {
          vi: 'Thực đơn ghi: "Fish and rice ........ £8.20".',
          en: 'The menu says: "Fish and rice ........ £8.20".',
        },
      },
      {
        id: 'l1-read-05-ex02',
        type: 'multiple-choice',
        passageId: 'l1-read-05-p1',
        question: 'You are a vegetarian (no meat or fish). What can you have for lunch?',
        options: ['Beef burger and chips', 'Chicken soup', 'Fish and rice', 'Vegetable pizza'],
        correctIndex: 3,
        explanation: {
          vi: 'Chỉ có "Vegetable pizza" có ký hiệu (V) = món chay.',
          en: 'Only "Vegetable pizza" has the (V) sign = vegetarian.',
        },
      },
      {
        id: 'l1-read-05-ex03',
        type: 'true-false',
        passageId: 'l1-read-05-p1',
        statement: 'You can order pancakes at 12 noon.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Bữa sáng (có pancakes) chỉ phục vụ từ 7 giờ đến 11 giờ sáng, nên 12 giờ trưa thì không còn.',
          en: 'Breakfast (with pancakes) is only from 7 am to 11 am, so not at 12 noon.',
        },
      },
      {
        id: 'l1-read-05-ex04',
        type: 'true-false',
        passageId: 'l1-read-05-p1',
        statement: 'The café is open on Sundays.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"Open every day" = mở cửa mỗi ngày, vậy Chủ nhật cũng mở.',
          en: '"Open every day" includes Sunday.',
        },
      },
      {
        id: 'l1-read-05-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong thực đơn với nghĩa của nó.', en: 'Match the menu words with their meanings.' },
        pairs: [
          { left: 'dessert', right: 'sweet food after a meal' },
          { left: 'vegetarian', right: 'no meat or fish' },
          { left: 'scoop', right: 'a ball of ice cream' },
          { left: 'juice', right: 'a drink made from fruit' },
          { left: 'staff', right: 'the people who work there' },
        ],
        explanation: {
          vi: 'Đây là những từ rất hay gặp khi đọc thực đơn.',
          en: 'These words are very common on menus.',
        },
      },
      {
        id: 'l1-read-05-ex06',
        type: 'fill-blank',
        passageId: 'l1-read-05-p1',
        sentence: 'One cup of tea and one glass of water cost £___ in total.',
        acceptedAnswers: ['2.80', '2,80'],
        hint: '(£1.80 + £1.00)',
        explanation: {
          vi: 'Trà £1.80 + nước £1.00 = £2.80.',
          en: 'Tea £1.80 + water £1.00 = £2.80.',
        },
      },
      {
        id: 'l1-read-05-ex07',
        type: 'multiple-choice',
        question: 'How do you say "£4.50"?',
        options: ['four pounds fifty', 'forty-five pounds', 'four pound five', 'fifty pounds four'],
        correctIndex: 0,
        explanation: {
          vi: '£4.50 đọc là "four pounds fifty": số bảng trước, số xu sau.',
          en: '£4.50 = "four pounds fifty": pounds first, then pence.',
        },
      },
      {
        id: 'l1-read-05-ex08',
        type: 'true-false',
        passageId: 'l1-read-05-p1',
        statement: 'The chocolate cake is the most popular dessert.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Thực đơn chỉ ghi giá bánh, không nói món nào được yêu thích nhất.',
          en: 'The menu gives the price but says nothing about which dessert is the most popular.',
        },
      },
      {
        id: 'l1-read-05-ex09',
        type: 'multiple-choice',
        passageId: 'l1-read-05-p1',
        question: 'What is the cheapest drink?',
        options: ['Tea', 'Water', 'Orange juice'],
        correctIndex: 1,
        explanation: {
          vi: 'Nước (water) chỉ £1.00 – rẻ nhất trong mục DRINKS.',
          en: 'Water is only £1.00 – the cheapest in DRINKS.',
        },
      },
      {
        id: 'l1-read-05-ex10',
        type: 'fill-blank',
        passageId: 'l1-read-05-p1',
        sentence: 'The ice cream comes with two ___.',
        acceptedAnswers: ['scoops'],
        hint: '(viên kem)',
        explanation: {
          vi: 'Thực đơn ghi "Ice cream (2 scoops)" – 2 viên kem.',
          en: 'The menu says "Ice cream (2 scoops)".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-read-05-test01',
        type: 'multiple-choice',
        passageId: 'l1-read-05-p1',
        question: 'How much is the beef burger and chips?',
        options: ['£6.00', '£8.20', '£4.50', '£7.50'],
        correctIndex: 3,
        explanation: {
          vi: '"Beef burger and chips ........ £7.50".',
          en: '"Beef burger and chips ........ £7.50".',
        },
      },
      {
        id: 'l1-read-05-test02',
        type: 'true-false',
        passageId: 'l1-read-05-p1',
        statement: 'Breakfast starts at 7 am.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"BREAKFAST (7 am – 11 am)" – bữa sáng bắt đầu lúc 7 giờ.',
          en: '"BREAKFAST (7 am – 11 am)".',
        },
      },
      {
        id: 'l1-read-05-test03',
        type: 'true-false',
        passageId: 'l1-read-05-p1',
        statement: 'There is no food for children at the café.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Quán có "Kids\' menu" (thực đơn cho trẻ em) – chỉ cần hỏi nhân viên.',
          en: 'There is a "Kids\' menu" – you just ask the staff.',
        },
      },
      {
        id: 'l1-read-05-test04',
        type: 'multiple-choice',
        passageId: 'l1-read-05-p1',
        question: 'Tom has chicken soup and an orange juice. How much does he pay?',
        options: ['£5.00', '£6.00', '£6.20'],
        correctIndex: 1,
        explanation: {
          vi: 'Súp gà £3.80 + nước cam £2.20 = £6.00.',
          en: 'Chicken soup £3.80 + orange juice £2.20 = £6.00.',
        },
      },
      {
        id: 'l1-read-05-test05',
        type: 'fill-blank',
        passageId: 'l1-read-05-p1',
        sentence: 'On the menu, (V) means ___.',
        acceptedAnswers: ['vegetarian'],
        hint: '(món chay)',
        explanation: {
          vi: '"(V) = vegetarian – no meat or fish".',
          en: '"(V) = vegetarian – no meat or fish".',
        },
      },
      {
        id: 'l1-read-05-test06',
        type: 'true-false',
        passageId: 'l1-read-05-p1',
        statement: 'The café has free Wi-Fi.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Thực đơn không nhắc gì đến Wi-Fi.',
          en: 'The menu does not mention Wi-Fi.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Đọc tin nhắn / đoạn chat giữa hai người bạn
  // ==========================================================================
  {
    id: 'l1-read-06',
    skill: 'reading',
    title: { vi: 'Đọc tin nhắn giữa bạn bè', en: 'Reading text messages' },
    description: {
      vi: 'Hiểu một đoạn chat ngắn: ai rủ ai, đi đâu, khi nào, gặp ở đâu.',
      en: 'Understand a short chat: who, what, when and where.',
    },
    teachingCards: [
      {
        title: { vi: 'Chữ viết tắt khi nhắn tin', en: 'Short forms in text messages' },
        body: {
          vi: 'Khi nhắn tin, người ta hay viết tắt:\n**u** = you · **r** = are · **thx** = thanks\n**pls** = please · **gr8** = great\n**2moro** = tomorrow · **c u** = see you\n**Sat** = Saturday, **Sun** = Sunday\nChỉ dùng khi nhắn tin với bạn bè, **không** dùng trong bài thi viết IELTS!',
          en: 'In text messages, people often use short forms:\n**u** = you · **r** = are · **thx** = thanks\n**pls** = please · **gr8** = great\n**2moro** = tomorrow · **c u** = see you\n**Sat** = Saturday, **Sun** = Sunday\nUse them only with friends – **never** in IELTS Writing!',
        },
        examples: [
          { en: 'Are u free 2moro?', vi: 'Mai bạn rảnh không?' },
          { en: 'Thx! C u on Sat.', vi: 'Cảm ơn! Hẹn gặp thứ Bảy nhé.' },
        ],
      },
      {
        title: { vi: 'Mẹo đọc đoạn chat', en: 'Tips for reading a chat' },
        body: {
          vi: 'Đoạn chat thường là **một kế hoạch**. Hãy tìm 4 thông tin:\n**Who?** – Ai đi?\n**What?** – Làm gì?\n**When?** – Khi nào? (giờ, ngày)\n**Where?** – Ở đâu?\nChú ý: kế hoạch có thể **thay đổi** trong đoạn chat — câu trả lời đúng thường ở tin nhắn sau.',
          en: 'A chat is often **a plan**. Look for 4 things:\n**Who?** **What?** **When?** (time, day) **Where?**\nNote: a plan can **change** during a chat – the correct answer is often in a later message.',
        },
        examples: [
          { en: "Let's meet at 3 pm.", vi: 'Hãy gặp nhau lúc 3 giờ chiều.' },
          { en: "I'm free after 2 pm.", vi: 'Mình rảnh sau 2 giờ chiều.' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l1-read-06-p1',
        title: 'Chat: Mai and Jack',
        text: 'Mai (4:15 pm): Hi Jack! Are u free on Saturday?\n\nJack (4:17 pm): Hi Mai! I have a football match in the morning, but I\'m free after 2 pm. Why?\n\nMai (4:18 pm): It\'s my sister\'s birthday. We want to go bowling. Do u want to come?\n\nJack (4:20 pm): Gr8! Where is it?\n\nMai (4:21 pm): Star Bowling, next to the big supermarket on Park Road. Let\'s meet there at 3 pm.\n\nJack (4:22 pm): OK. Should I bring a present?\n\nMai (4:24 pm): No, u don\'t need to. But she loves chocolate!\n\nJack (4:25 pm): Haha, OK! C u on Sat. Thx for asking!',
      },
    ],
    exercises: [
      {
        id: 'l1-read-06-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối chữ viết tắt với từ đầy đủ.', en: 'Match the short forms with the full words.' },
        pairs: [
          { left: 'u', right: 'you' },
          { left: 'thx', right: 'thanks' },
          { left: 'gr8', right: 'great' },
          { left: '2moro', right: 'tomorrow' },
          { left: 'c u', right: 'see you' },
          { left: 'pls', right: 'please' },
        ],
        explanation: {
          vi: 'Các chữ viết tắt này rất phổ biến trong tin nhắn tiếng Anh.',
          en: 'These short forms are very common in English text messages.',
        },
      },
      {
        id: 'l1-read-06-ex02',
        type: 'multiple-choice',
        passageId: 'l1-read-06-p1',
        question: 'What does Jack do on Saturday morning?',
        options: ['He goes bowling.', 'He buys a present.', 'He visits Mai.', 'He plays football.'],
        correctIndex: 3,
        explanation: {
          vi: 'Jack viết: "I have a football match in the morning" – sáng thứ Bảy cậu ấy đá bóng.',
          en: 'Jack says: "I have a football match in the morning".',
        },
      },
      {
        id: 'l1-read-06-ex03',
        type: 'true-false',
        passageId: 'l1-read-06-p1',
        statement: "Mai's sister has a birthday on Saturday.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: 'Mai hỏi về thứ Bảy và nói: "It\'s my sister\'s birthday."',
          en: 'Mai asks about Saturday and says: "It\'s my sister\'s birthday."',
        },
      },
      {
        id: 'l1-read-06-ex04',
        type: 'multiple-choice',
        passageId: 'l1-read-06-p1',
        question: 'What time do they meet at Star Bowling?',
        options: ['2 pm', '4 pm', '3 pm', '4:15 pm'],
        correctIndex: 2,
        explanation: {
          vi: '"Let\'s meet there at 3 pm." – 2 pm chỉ là giờ Jack bắt đầu rảnh.',
          en: '"Let\'s meet there at 3 pm." 2 pm is only when Jack becomes free.',
        },
      },
      {
        id: 'l1-read-06-ex05',
        type: 'fill-blank',
        passageId: 'l1-read-06-p1',
        sentence: 'Star Bowling is next to the big ___ on Park Road.',
        acceptedAnswers: ['supermarket'],
        hint: '(siêu thị)',
        explanation: {
          vi: '"Star Bowling, next to the big supermarket on Park Road."',
          en: '"Star Bowling, next to the big supermarket on Park Road."',
        },
      },
      {
        id: 'l1-read-06-ex06',
        type: 'true-false',
        passageId: 'l1-read-06-p1',
        statement: 'Jack is free all day on Saturday.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Buổi sáng Jack có trận bóng, cậu ấy chỉ rảnh sau 2 giờ chiều.',
          en: 'Jack has a football match in the morning. He is only free after 2 pm.',
        },
      },
      {
        id: 'l1-read-06-ex07',
        type: 'true-false',
        passageId: 'l1-read-06-p1',
        statement: "Mai's sister is ten years old.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Đoạn chat không nói em/chị của Mai bao nhiêu tuổi.',
          en: "The chat does not say how old Mai's sister is.",
        },
      },
      {
        id: 'l1-read-06-ex08',
        type: 'multiple-choice',
        passageId: 'l1-read-06-p1',
        question: "What does Mai's sister love?",
        options: ['chocolate', 'flowers', 'books', 'football'],
        correctIndex: 0,
        explanation: {
          vi: 'Mai viết: "But she loves chocolate!"',
          en: 'Mai writes: "But she loves chocolate!"',
        },
      },
      {
        id: 'l1-read-06-ex09',
        type: 'multiple-choice',
        question: 'In a text message, "Are u free 2moro?" means…',
        options: ['Are you three tomorrow?', 'Are you free tomorrow?', 'Is it free today?', 'Are you free today?'],
        correctIndex: 1,
        explanation: {
          vi: 'u = you, 2moro = tomorrow → "Are you free tomorrow?" (Mai bạn rảnh không?)',
          en: 'u = you, 2moro = tomorrow → "Are you free tomorrow?"',
        },
      },
      {
        id: 'l1-read-06-ex10',
        type: 'arrange-words',
        translationVi: 'Bạn có rảnh vào thứ Bảy không?',
        correctSentence: 'Are you free on Saturday?',
        extraWords: ['is', 'at'],
        explanation: {
          vi: '"you" đi với "are"; trước ngày trong tuần dùng "on".',
          en: '"you" goes with "are"; use "on" before days.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-read-06-test01',
        type: 'multiple-choice',
        passageId: 'l1-read-06-p1',
        question: 'Where is Star Bowling?',
        options: ['next to the school', 'in Mai\'s house', 'on Park Road', 'near the football field'],
        correctIndex: 2,
        explanation: {
          vi: '"…next to the big supermarket on Park Road."',
          en: '"…next to the big supermarket on Park Road."',
        },
      },
      {
        id: 'l1-read-06-test02',
        type: 'true-false',
        passageId: 'l1-read-06-p1',
        statement: 'Jack wants to go bowling with Mai.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: 'Jack trả lời "Gr8!" (Tuyệt!) và "C u on Sat." – cậu ấy sẽ đi.',
          en: 'Jack says "Gr8!" and "C u on Sat." – he wants to go.',
        },
      },
      {
        id: 'l1-read-06-test03',
        type: 'true-false',
        passageId: 'l1-read-06-p1',
        statement: 'Mai asks Jack to bring a present.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Jack hỏi có cần mang quà không, Mai trả lời "No, u don\'t need to." (Không cần đâu.)',
          en: 'Jack asks about a present and Mai says "No, u don\'t need to."',
        },
      },
      {
        id: 'l1-read-06-test04',
        type: 'fill-blank',
        passageId: 'l1-read-06-p1',
        sentence: 'On Saturday, Jack is free after ___ pm.',
        acceptedAnswers: ['2', 'two'],
        explanation: {
          vi: '"I\'m free after 2 pm."',
          en: '"I\'m free after 2 pm."',
        },
      },
      {
        id: 'l1-read-06-test05',
        type: 'multiple-choice',
        question: 'In a text message, "thx" means…',
        options: ['this', 'three', 'think', 'thanks'],
        correctIndex: 3,
        explanation: {
          vi: 'thx = thanks (cảm ơn).',
          en: 'thx = thanks.',
        },
      },
      {
        id: 'l1-read-06-test06',
        type: 'true-false',
        passageId: 'l1-read-06-p1',
        statement: "Jack's football match starts at 9 am.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Jack chỉ nói trận đấu "in the morning", không nói mấy giờ.',
          en: 'Jack only says "in the morning". The exact time is not given.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Đọc bưu thiếp gửi từ kỳ nghỉ
  // ==========================================================================
  {
    id: 'l1-read-07',
    skill: 'reading',
    title: { vi: 'Đọc bưu thiếp từ kỳ nghỉ', en: 'A postcard from a holiday' },
    description: {
      vi: 'Đọc một tấm bưu thiếp: ở đâu, thời tiết, làm gì, ăn gì trong kỳ nghỉ.',
      en: 'Read a postcard: where, the weather, activities and food on holiday.',
    },
    teachingCards: [
      {
        title: { vi: 'Bố cục một tấm bưu thiếp', en: 'The parts of a postcard' },
        body: {
          vi: 'Bưu thiếp rất ngắn và thân mật:\nMở đầu: **Dear Grandma,** (Bà thân yêu,)\nCâu chào: **Greetings from Nha Trang!** (Gửi lời chào từ Nha Trang!)\nNội dung: nơi ở, thời tiết, hoạt động, đồ ăn.\nKết thúc: **Wish you were here.** (Ước gì bà ở đây.) / **See you soon.**\nKý tên: **Love, Linh** (Thương bà, Linh)',
          en: 'A postcard is short and friendly:\nStart: **Dear Grandma,**\nGreeting: **Greetings from Nha Trang!**\nBody: where you stay, the weather, activities, food.\nEnd: **Wish you were here.** / **See you soon.**\nSign: **Love, Linh**',
        },
        examples: [
          { en: 'Greetings from Da Lat!', vi: 'Gửi lời chào từ Đà Lạt!' },
          { en: 'Wish you were here.', vi: 'Ước gì bạn ở đây.' },
        ],
      },
      {
        title: { vi: 'Từ hay gặp trong bưu thiếp', en: 'Useful postcard words' },
        body: {
          vi: 'Thời tiết: **sunny** (nắng), **hot** (nóng), **windy** (có gió)\nNhận xét: **delicious** (ngon), **beautiful** (đẹp), **clean** (sạch), **friendly** (thân thiện)\nBưu thiếp hay kể việc **đã làm** (quá khứ): **went** (đã đi – từ go), **was** (đã là – từ is).\nVD: Yesterday we **went** to an island. = Hôm qua chúng tôi **đã đi** ra đảo.',
          en: 'Weather: **sunny**, **hot**, **windy**\nOpinions: **delicious**, **beautiful**, **clean**, **friendly**\nPostcards often tell what you **did** (past): **went** (from go), **was** (from is).\nE.g. Yesterday we **went** to an island.',
        },
        examples: [
          { en: 'The food here is delicious.', vi: 'Đồ ăn ở đây rất ngon.' },
          { en: 'The water was so blue!', vi: 'Nước biển xanh quá!' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l1-read-07-p1',
        title: 'A postcard from Nha Trang',
        text: 'Dear Grandma,\n\nGreetings from Nha Trang! We are here for five days. Our hotel is small but very clean, and it is next to the beach.\n\nThe weather is sunny and hot every day. In the morning, Dad and I swim in the sea. Mum likes reading under a big umbrella. Yesterday we went to an island by boat. The water was so blue!\n\nThe seafood here is delicious, but my little brother only eats fried rice.\n\nWe come home on Sunday. I have a present for you!\n\nWish you were here.\nLove,\nLinh',
      },
    ],
    exercises: [
      {
        id: 'l1-read-07-ex01',
        type: 'multiple-choice',
        passageId: 'l1-read-07-p1',
        question: 'Who is the postcard to?',
        options: ['Linh', 'Dad', 'Grandma', 'Mum'],
        correctIndex: 2,
        explanation: {
          vi: 'Bưu thiếp mở đầu bằng "Dear Grandma," – gửi cho bà. Linh là người viết.',
          en: 'It starts with "Dear Grandma," – Linh is the writer.',
        },
      },
      {
        id: 'l1-read-07-ex02',
        type: 'multiple-choice',
        passageId: 'l1-read-07-p1',
        question: 'How long is the family in Nha Trang?',
        options: ['five days', 'three days', 'one week', 'two weeks'],
        correctIndex: 0,
        explanation: {
          vi: '"We are here for five days." – ở đây 5 ngày.',
          en: '"We are here for five days."',
        },
      },
      {
        id: 'l1-read-07-ex03',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: 'The hotel is near the beach.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"…it is next to the beach." – next to (ngay cạnh) nghĩa là rất gần.',
          en: '"…it is next to the beach." Next to = very near.',
        },
      },
      {
        id: 'l1-read-07-ex04',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: 'It rains every afternoon in Nha Trang.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"The weather is sunny and hot every day." – trời nắng mỗi ngày, không mưa.',
          en: '"The weather is sunny and hot every day."',
        },
      },
      {
        id: 'l1-read-07-ex05',
        type: 'fill-blank',
        passageId: 'l1-read-07-p1',
        sentence: 'Mum likes reading under a big ___.',
        acceptedAnswers: ['umbrella'],
        hint: '(cái ô / dù)',
        explanation: {
          vi: '"Mum likes reading under a big umbrella."',
          en: '"Mum likes reading under a big umbrella."',
        },
      },
      {
        id: 'l1-read-07-ex06',
        type: 'multiple-choice',
        passageId: 'l1-read-07-p1',
        question: 'How did they go to the island?',
        options: ['by plane', 'by bus', 'by bike', 'by boat'],
        correctIndex: 3,
        explanation: {
          vi: '"Yesterday we went to an island by boat." – đi bằng thuyền.',
          en: '"Yesterday we went to an island by boat."',
        },
      },
      {
        id: 'l1-read-07-ex07',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: "Linh's little brother eats a lot of seafood.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"…my little brother only eats fried rice." – em trai chỉ ăn cơm rang, không ăn hải sản.',
          en: '"…my little brother only eats fried rice." So he does not eat seafood.',
        },
      },
      {
        id: 'l1-read-07-ex08',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: 'The hotel has a swimming pool.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bưu thiếp nói khách sạn nhỏ, sạch, gần biển — không nhắc đến hồ bơi.',
          en: 'The hotel is small, clean and near the beach – a pool is not mentioned.',
        },
      },
      {
        id: 'l1-read-07-ex09',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm từ trong bưu thiếp với nghĩa tiếng Việt.', en: 'Match the postcard phrases with their Vietnamese meanings.' },
        pairs: [
          { left: 'Greetings from…', right: 'Gửi lời chào từ…' },
          { left: 'Wish you were here.', right: 'Ước gì bạn ở đây.' },
          { left: 'See you soon.', right: 'Hẹn sớm gặp lại.' },
          { left: "We're having a great time.", right: 'Chúng mình đang rất vui.' },
          { left: 'Love,', right: 'Thương (cuối thư),' },
        ],
        explanation: {
          vi: 'Đây là các cụm từ quen thuộc trong bưu thiếp và thư thân mật.',
          en: 'These are common phrases in postcards and friendly letters.',
        },
      },
      {
        id: 'l1-read-07-ex10',
        type: 'multiple-choice',
        passageId: 'l1-read-07-p1',
        question: 'When does the family come home?',
        options: ['on Saturday', 'on Sunday', 'on Monday', 'tomorrow'],
        correctIndex: 1,
        explanation: {
          vi: '"We come home on Sunday."',
          en: '"We come home on Sunday."',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-read-07-test01',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: 'Linh swims in the sea with her dad.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"In the morning, Dad and I swim in the sea."',
          en: '"In the morning, Dad and I swim in the sea."',
        },
      },
      {
        id: 'l1-read-07-test02',
        type: 'multiple-choice',
        passageId: 'l1-read-07-p1',
        question: 'What is the hotel like?',
        options: ['big and new', 'old and dirty', 'far from the beach', 'small but clean'],
        correctIndex: 3,
        explanation: {
          vi: '"Our hotel is small but very clean".',
          en: '"Our hotel is small but very clean".',
        },
      },
      {
        id: 'l1-read-07-test03',
        type: 'fill-blank',
        passageId: 'l1-read-07-p1',
        sentence: 'Near the island, the water was very ___.',
        acceptedAnswers: ['blue'],
        hint: '(màu xanh)',
        explanation: {
          vi: '"The water was so blue!"',
          en: '"The water was so blue!"',
        },
      },
      {
        id: 'l1-read-07-test04',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: 'Linh has a present for her grandma.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"I have a present for you!" – "you" ở đây là bà.',
          en: '"I have a present for you!" – "you" is Grandma.',
        },
      },
      {
        id: 'l1-read-07-test05',
        type: 'multiple-choice',
        question: 'Which word means "very tasty" (rất ngon)?',
        options: ['clean', 'delicious', 'sunny', 'friendly'],
        correctIndex: 1,
        explanation: {
          vi: 'delicious = rất ngon. VD: The seafood is delicious.',
          en: 'delicious = very tasty. E.g. The seafood is delicious.',
        },
      },
      {
        id: 'l1-read-07-test06',
        type: 'true-false',
        passageId: 'l1-read-07-p1',
        statement: "Linh's grandma lives in Hanoi.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bưu thiếp không nói bà sống ở đâu.',
          en: 'The postcard does not say where Grandma lives.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Đọc nội quy phòng gym
  // ==========================================================================
  {
    id: 'l1-read-08',
    skill: 'reading',
    title: { vi: 'Đọc nội quy phòng tập gym', en: 'Reading gym rules' },
    description: {
      vi: 'Hiểu nội quy: điều phải làm, điều không được làm và điều được phép.',
      en: 'Understand rules: what you must do, mustn\'t do and can do.',
    },
    teachingCards: [
      {
        title: { vi: 'must / must not / can / can\'t', en: 'must / must not / can / can\'t' },
        body: {
          vi: '**must** + động từ = **phải** làm: You **must** wear sports shoes.\n**must not (mustn\'t)** = **không được** làm: You **mustn\'t** eat here.\n**can** = **được phép**: You **can** bring water.\n**can\'t** = **không được phép**: Children **can\'t** come alone.\nCâu mệnh lệnh cũng là nội quy: **Show** your card. **Do not** leave bags.',
          en: '**must** + verb = it is necessary: You **must** wear sports shoes.\n**must not (mustn\'t)** = it is not allowed: You **mustn\'t** eat here.\n**can** = it is allowed: You **can** bring water.\n**can\'t** = it is not allowed: Children **can\'t** come alone.\nImperatives are rules too: **Show** your card. **Do not** leave bags.',
        },
        examples: [
          { en: 'You must show your card.', vi: 'Bạn phải xuất trình thẻ.' },
          { en: "You can't bring food into the gym.", vi: 'Bạn không được mang đồ ăn vào phòng tập.' },
        ],
      },
      {
        title: { vi: 'Từ vựng ở phòng gym', en: 'Gym words' },
        body: {
          vi: '**member** – hội viên · **membership card** – thẻ hội viên\n**front desk** – quầy lễ tân · **staff** – nhân viên\n**towel** – khăn · **locker** – tủ có khóa\n**changing room** – phòng thay đồ · **machine** – máy tập\n**adult** – người lớn · **flip-flops** – dép tông',
          en: '**member** · **membership card**\n**front desk** – where you arrive · **staff** – workers\n**towel** · **locker** – a small cupboard with a lock\n**changing room** · **machine**\n**adult** – a grown-up person · **flip-flops** – simple beach sandals',
        },
        examples: [
          { en: 'Put your bag in a locker.', vi: 'Hãy cất túi vào tủ khóa.' },
          { en: 'Ask the staff at the front desk.', vi: 'Hãy hỏi nhân viên ở quầy lễ tân.' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l1-read-08-p1',
        title: 'FitLife Gym – Rules for Members',
        text: 'Welcome to FitLife Gym! Please read our rules.\n\n1. Show your membership card at the front desk every time you come.\n2. You must wear sports shoes in the gym. No sandals or flip-flops.\n3. Bring a towel and clean the machines after you use them.\n4. Do not leave bags on the floor. Use the lockers in the changing rooms. The lockers are free.\n5. Children under 14 can only come with an adult.\n6. You can bring water, but no food in the gym, please.\n7. When people are waiting, don\'t use one machine for more than 20 minutes.\n\nOpening hours: Monday – Saturday, 6 am – 10 pm; Sunday, 8 am – 6 pm.\nQuestions? Ask our staff at the front desk.',
      },
    ],
    exercises: [
      {
        id: 'l1-read-08-ex01',
        type: 'multiple-choice',
        passageId: 'l1-read-08-p1',
        question: 'What must you show at the front desk?',
        options: ['your phone', 'your towel', 'your membership card', 'your sports shoes'],
        correctIndex: 2,
        explanation: {
          vi: 'Quy định 1: "Show your membership card at the front desk".',
          en: 'Rule 1: "Show your membership card at the front desk".',
        },
      },
      {
        id: 'l1-read-08-ex02',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'You can wear flip-flops in the gym.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Quy định 2: "No sandals or flip-flops." – không được đi dép.',
          en: 'Rule 2: "No sandals or flip-flops."',
        },
      },
      {
        id: 'l1-read-08-ex03',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'You do not pay to use a locker.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"The lockers are free." – tủ khóa miễn phí, không phải trả tiền.',
          en: '"The lockers are free."',
        },
      },
      {
        id: 'l1-read-08-ex04',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'A 12-year-old girl can come to the gym with her mother.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: 'Trẻ dưới 14 tuổi được đến nếu đi cùng người lớn (an adult) – mẹ là người lớn.',
          en: 'Children under 14 can come with an adult – her mother is an adult.',
        },
      },
      {
        id: 'l1-read-08-ex05',
        type: 'fill-blank',
        passageId: 'l1-read-08-p1',
        sentence: 'When people are waiting, you can use one machine for ___ minutes or less.',
        acceptedAnswers: ['20', 'twenty'],
        explanation: {
          vi: 'Quy định 7: không dùng một máy quá 20 phút khi có người đang chờ.',
          en: 'Rule 7: not more than 20 minutes when people are waiting.',
        },
      },
      {
        id: 'l1-read-08-ex06',
        type: 'multiple-choice',
        passageId: 'l1-read-08-p1',
        question: 'What can you bring into the gym?',
        options: ['a bottle of water', 'a sandwich', 'a pizza', 'a bag of sweets'],
        correctIndex: 0,
        explanation: {
          vi: 'Quy định 6: "You can bring water, but no food" – được mang nước, không mang đồ ăn.',
          en: 'Rule 6: "You can bring water, but no food".',
        },
      },
      {
        id: 'l1-read-08-ex07',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'The gym has a swimming pool.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Nội quy không nói gì về hồ bơi.',
          en: 'The rules do not mention a swimming pool.',
        },
      },
      {
        id: 'l1-read-08-ex08',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa tiếng Việt.', en: 'Match the words with their Vietnamese meanings.' },
        pairs: [
          { left: 'must', right: 'phải' },
          { left: "mustn't", right: 'không được' },
          { left: 'can', right: 'được phép' },
          { left: 'locker', right: 'tủ có khóa' },
          { left: 'towel', right: 'khăn' },
          { left: 'adult', right: 'người lớn' },
        ],
        explanation: {
          vi: 'must = phải; mustn\'t = không được; can = được phép.',
          en: 'must = necessary; mustn\'t = not allowed; can = allowed.',
        },
      },
      {
        id: 'l1-read-08-ex09',
        type: 'multiple-choice',
        passageId: 'l1-read-08-p1',
        question: 'What time does the gym close on Sunday?',
        options: ['10 pm', '8 am', '6 am', '6 pm'],
        correctIndex: 3,
        explanation: {
          vi: '"Sunday, 8 am – 6 pm" – Chủ nhật đóng cửa lúc 6 giờ tối.',
          en: '"Sunday, 8 am – 6 pm".',
        },
      },
      {
        id: 'l1-read-08-ex10',
        type: 'multiple-choice',
        passageId: 'l1-read-08-p1',
        question: 'What should you do after you use a machine?',
        options: ['Leave your towel on it.', 'Clean it.', 'Tell the staff.', 'Put your bag on it.'],
        correctIndex: 1,
        explanation: {
          vi: 'Quy định 3: "clean the machines after you use them" – lau máy sau khi dùng.',
          en: 'Rule 3: "clean the machines after you use them".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-read-08-test01',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'The gym opens at 6 am on Mondays.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"Monday – Saturday, 6 am – 10 pm".',
          en: '"Monday – Saturday, 6 am – 10 pm".',
        },
      },
      {
        id: 'l1-read-08-test02',
        type: 'multiple-choice',
        passageId: 'l1-read-08-p1',
        question: 'Where are the lockers?',
        options: ['at the front desk', 'next to the machines', 'in the changing rooms', 'outside the gym'],
        correctIndex: 2,
        explanation: {
          vi: '"Use the lockers in the changing rooms."',
          en: '"Use the lockers in the changing rooms."',
        },
      },
      {
        id: 'l1-read-08-test03',
        type: 'fill-blank',
        passageId: 'l1-read-08-p1',
        sentence: 'You must wear sports ___ in the gym.',
        acceptedAnswers: ['shoes'],
        hint: '(giày)',
        explanation: {
          vi: 'Quy định 2: "You must wear sports shoes".',
          en: 'Rule 2: "You must wear sports shoes".',
        },
      },
      {
        id: 'l1-read-08-test04',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'You must not eat food in the gym.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"…no food in the gym, please." – không được ăn trong phòng tập.',
          en: '"…no food in the gym, please."',
        },
      },
      {
        id: 'l1-read-08-test05',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'The gym is closed on Sundays.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Chủ nhật vẫn mở cửa từ 8 giờ sáng đến 6 giờ tối.',
          en: 'It is open on Sunday from 8 am to 6 pm.',
        },
      },
      {
        id: 'l1-read-08-test06',
        type: 'true-false',
        passageId: 'l1-read-08-p1',
        statement: 'Every member gets a free towel.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Nội quy chỉ bảo "Bring a towel" (mang khăn), không nói có tặng khăn miễn phí.',
          en: 'The rules say "Bring a towel" but say nothing about free towels.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Đọc đoạn mô tả một thị trấn (100-130 từ)
  // ==========================================================================
  {
    id: 'l1-read-09',
    skill: 'reading',
    title: { vi: 'Đọc mô tả một thị trấn', en: 'A description of a town' },
    description: {
      vi: 'Đọc đoạn văn khoảng 120 từ về một thị trấn, tìm ý chính và vị trí các địa điểm.',
      en: 'Read a 120-word text about a town and find the main ideas and places.',
    },
    teachingCards: [
      {
        title: { vi: 'There is / There are + giới từ chỉ vị trí', en: 'There is / There are + place words' },
        body: {
          vi: '**There is** + 1 vật: There **is** a market. (Có một cái chợ.)\n**There are** + nhiều vật: There **are** two cafés.\n**There isn\'t** = không có: There **isn\'t** a cinema.\nGiới từ vị trí: **next to** (ngay cạnh), **near** (gần), **opposite** (đối diện), **in the centre of** (ở trung tâm).',
          en: '**There is** + one thing: There **is** a market.\n**There are** + more than one: There **are** two cafés.\n**There isn\'t** = there is no: There **isn\'t** a cinema.\nPlace words: **next to**, **near**, **opposite**, **in the centre of**.',
        },
        examples: [
          { en: 'The library is opposite the post office.', vi: 'Thư viện ở đối diện bưu điện.' },
          { en: 'There is a park next to the river.', vi: 'Có một công viên ngay cạnh con sông.' },
        ],
      },
      {
        title: { vi: 'Mẹo đọc: mỗi đoạn một ý chính', en: 'Reading tip: one main idea per paragraph' },
        body: {
          vi: 'Bài văn ngắn thường có **3-4 đoạn**, mỗi đoạn nói về **một ý**.\nĐọc **câu đầu** của mỗi đoạn để biết đoạn đó nói gì.\nVD: Đoạn 1 – giới thiệu thị trấn; đoạn 2 – trung tâm; đoạn 3 – công viên và đi lại.\nKhi trả lời câu hỏi, bạn sẽ biết **phải tìm ở đoạn nào**.',
          en: 'A short text often has **3-4 paragraphs**, each with **one idea**.\nRead the **first sentence** of each paragraph to know what it is about.\nThen you know **where to look** for each answer.',
        },
        examples: [
          { en: 'Riverside is a small town in the south of England.', vi: 'Riverside là một thị trấn nhỏ ở miền nam nước Anh. (câu chủ đề đoạn 1)' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l1-read-09-p1',
        title: 'Welcome to Riverside',
        text: 'Riverside is a small town in the south of England. About 8,000 people live here. A long river goes through the middle of the town, and there are three old bridges.\n\nIn the town centre, there is a market every Thursday. People sell fruit, vegetables, cheese and flowers. There are also two cafés, a bank and a post office. The library is opposite the post office.\n\nRiverside has a big park next to the river. Families often have picnics there on sunny days. There isn\'t a cinema in the town, so young people take the bus to the city to watch films. The bus takes 40 minutes.\n\nRiverside is quiet and friendly. It is a nice place to live.',
      },
    ],
    exercises: [
      {
        id: 'l1-read-09-ex01',
        type: 'multiple-choice',
        passageId: 'l1-read-09-p1',
        question: 'What is the text mainly about?',
        options: ['a big city', 'a school trip', 'a river boat', 'a small town'],
        correctIndex: 3,
        explanation: {
          vi: 'Câu đầu: "Riverside is a small town…" – cả bài mô tả thị trấn này.',
          en: 'First sentence: "Riverside is a small town…" – the whole text describes it.',
        },
      },
      {
        id: 'l1-read-09-ex02',
        type: 'fill-blank',
        passageId: 'l1-read-09-p1',
        sentence: 'About ___ people live in Riverside.',
        acceptedAnswers: ['8,000', '8000', 'eight thousand'],
        explanation: {
          vi: '"About 8,000 people live here." – khoảng 8.000 người.',
          en: '"About 8,000 people live here."',
        },
      },
      {
        id: 'l1-read-09-ex03',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'There are three bridges in Riverside.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"…there are three old bridges."',
          en: '"…there are three old bridges."',
        },
      },
      {
        id: 'l1-read-09-ex04',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'The market is open every day.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"…there is a market every Thursday." – chợ chỉ họp vào thứ Năm.',
          en: 'The market is only on Thursdays.',
        },
      },
      {
        id: 'l1-read-09-ex05',
        type: 'multiple-choice',
        passageId: 'l1-read-09-p1',
        question: 'Where is the library?',
        options: ['opposite the post office', 'next to the bank', 'in the park', 'near the bridges'],
        correctIndex: 0,
        explanation: {
          vi: '"The library is opposite the post office." – đối diện bưu điện.',
          en: '"The library is opposite the post office."',
        },
      },
      {
        id: 'l1-read-09-ex06',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'There is a cinema in the town centre.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"There isn\'t a cinema in the town" – thị trấn không có rạp chiếu phim.',
          en: '"There isn\'t a cinema in the town".',
        },
      },
      {
        id: 'l1-read-09-ex07',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'The bank opens at 9 am.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài chỉ nói có một ngân hàng, không nói giờ mở cửa.',
          en: 'The text says there is a bank, but not its opening time.',
        },
      },
      {
        id: 'l1-read-09-ex08',
        type: 'match-pairs',
        instruction: { vi: 'Nối địa điểm/thông tin với chi tiết đúng trong bài.', en: 'Match each place with the correct detail from the text.' },
        pairs: [
          { left: 'the market', right: 'every Thursday' },
          { left: 'the park', right: 'next to the river' },
          { left: 'the library', right: 'opposite the post office' },
          { left: 'the bus to the city', right: '40 minutes' },
          { left: 'the bridges', right: 'three' },
        ],
        explanation: {
          vi: 'Dạng nối thông tin: tìm tên địa điểm trong bài, rồi đọc kỹ câu đó.',
          en: 'Matching: find the place name in the text, then read that sentence carefully.',
        },
      },
      {
        id: 'l1-read-09-ex09',
        type: 'multiple-choice',
        passageId: 'l1-read-09-p1',
        question: 'Why do young people take the bus to the city?',
        options: ['to go to the market', 'to watch films', 'to have picnics', 'to visit the library'],
        correctIndex: 1,
        explanation: {
          vi: 'Thị trấn không có rạp, nên họ đi xe buýt lên thành phố "to watch films" (xem phim).',
          en: 'There is no cinema, so they go to the city "to watch films".',
        },
      },
      {
        id: 'l1-read-09-ex10',
        type: 'multiple-choice',
        passageId: 'l1-read-09-p1',
        question: 'Which word describes Riverside?',
        options: ['noisy', 'dangerous', 'quiet', 'modern'],
        correctIndex: 2,
        explanation: {
          vi: '"Riverside is quiet and friendly." – yên tĩnh và thân thiện.',
          en: '"Riverside is quiet and friendly."',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-read-09-test01',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'Riverside is in the north of England.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài viết: "in the south of England" – ở miền nam, không phải miền bắc.',
          en: 'The text says "in the south of England".',
        },
      },
      {
        id: 'l1-read-09-test02',
        type: 'multiple-choice',
        passageId: 'l1-read-09-p1',
        question: 'What can you buy at the market?',
        options: ['clothes', 'phones', 'books', 'cheese'],
        correctIndex: 3,
        explanation: {
          vi: '"People sell fruit, vegetables, cheese and flowers."',
          en: '"People sell fruit, vegetables, cheese and flowers."',
        },
      },
      {
        id: 'l1-read-09-test03',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'Families have picnics in the park on sunny days.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"Families often have picnics there on sunny days."',
          en: '"Families often have picnics there on sunny days."',
        },
      },
      {
        id: 'l1-read-09-test04',
        type: 'fill-blank',
        passageId: 'l1-read-09-p1',
        sentence: 'The market in Riverside is on ___.',
        acceptedAnswers: ['Thursday', 'Thursdays'],
        hint: '(thứ Năm)',
        explanation: {
          vi: '"…there is a market every Thursday."',
          en: '"…there is a market every Thursday."',
        },
      },
      {
        id: 'l1-read-09-test05',
        type: 'true-false',
        passageId: 'l1-read-09-p1',
        statement: 'The cafés in Riverside are expensive.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài chỉ nói có hai quán cà phê, không nói giá đắt hay rẻ.',
          en: 'The text says there are two cafés, but nothing about prices.',
        },
      },
      {
        id: 'l1-read-09-test06',
        type: 'multiple-choice',
        passageId: 'l1-read-09-p1',
        question: 'How many cafés are there in the town centre?',
        options: ['one', 'two', 'three', 'four'],
        correctIndex: 1,
        explanation: {
          vi: '"There are also two cafés…"',
          en: '"There are also two cafés…"',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Đọc bài blog về cuối tuần (130-150 từ) — T/F/NG + nối thông tin
  // ==========================================================================
  {
    id: 'l1-read-10',
    skill: 'reading',
    title: { vi: 'Đọc blog: Cuối tuần của mình', en: 'A blog post about a weekend' },
    description: {
      vi: 'Đọc bài blog khoảng 150 từ, luyện True/False/Not Given và dạng nối thông tin (matching).',
      en: 'Read a 150-word blog post and practise True/False/Not Given and matching.',
    },
    teachingCards: [
      {
        title: { vi: 'Nhận ra thì quá khứ đơn', en: 'Recognising the past simple' },
        body: {
          vi: 'Bài blog kể chuyện **đã xảy ra**, nên dùng **quá khứ đơn**.\nĐộng từ có quy tắc: thêm **-ed**: help → **helped**, play → **played**, watch → **watched**.\nĐộng từ bất quy tắc (phải học thuộc):\n**get → got** · **come → came** · **have → had**\n**do → did** · **ride → rode** · **take → took**',
          en: 'A blog about last weekend uses the **past simple**.\nRegular verbs add **-ed**: help → **helped**, play → **played**, watch → **watched**.\nIrregular verbs (learn them by heart):\n**get → got** · **come → came** · **have → had**\n**do → did** · **ride → rode** · **take → took**',
        },
        examples: [
          { en: 'I got up early and helped my mum.', vi: 'Mình dậy sớm và giúp mẹ.' },
          { en: 'We rode our bikes to the lake.', vi: 'Chúng mình đạp xe ra hồ.' },
        ],
      },
      {
        title: { vi: 'Dạng bài nối thông tin (Matching)', en: 'Matching tasks' },
        body: {
          vi: 'Trong IELTS, bạn thường phải **nối người / thời gian** với **thông tin** đúng.\nCách làm:\n1. Gạch chân **tên người** hoặc **thời gian** trong bài (Duc, Vy, Saturday evening…).\n2. Đọc kỹ câu chứa tên đó.\n3. Chọn thông tin có **cùng nghĩa** (có thể dùng từ khác!).\nVD: "cooked fish soup" = "made a meal".',
          en: 'In IELTS you often **match people / times** with the correct **information**.\nSteps:\n1. Underline **names** or **times** in the text (Duc, Vy, Saturday evening…).\n2. Read that sentence carefully.\n3. Choose the information with the **same meaning** (the words may be different!).',
        },
        examples: [
          { en: 'Duc came to my house. = Duc visited Khoa.', vi: 'Duc đến nhà mình. = Duc đến thăm Khoa.' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l1-read-10-p1',
        title: "Khoa's Blog: My Busy Weekend",
        text: 'Hi everyone! Welcome back to my blog. This weekend was really busy, but it was fun.\n\nOn Saturday morning, I got up early and helped my mum at the market. We sold vegetables until eleven o\'clock. Then my best friend Duc came to my house, and we played video games for two hours.\n\nIn the evening, my family had dinner at my aunt\'s house. She cooked fish soup and spring rolls. My cousin Vy showed me her new kitten. It was so cute!\n\nOn Sunday, I stayed at home in the morning and did my homework. It was difficult, so I asked my sister for help. In the afternoon, Duc and I rode our bikes to the lake. We watched the sunset and took lots of photos.\n\nWhat did you do this weekend? Tell me in the comments!',
      },
    ],
    exercises: [
      {
        id: 'l1-read-10-ex01',
        type: 'multiple-choice',
        passageId: 'l1-read-10-p1',
        question: 'What did Khoa do on Saturday morning?',
        options: ['He played football.', 'He did his homework.', 'He rode his bike.', 'He helped his mum at the market.'],
        correctIndex: 3,
        explanation: {
          vi: '"On Saturday morning, I got up early and helped my mum at the market."',
          en: '"On Saturday morning, I got up early and helped my mum at the market."',
        },
      },
      {
        id: 'l1-read-10-ex02',
        type: 'match-pairs',
        passageId: 'l1-read-10-p1',
        instruction: { vi: 'Nối mỗi người với việc họ làm trong bài.', en: 'Match each person with what they did.' },
        pairs: [
          { left: "Khoa's mum", right: 'sold vegetables' },
          { left: 'Duc', right: 'played video games with Khoa' },
          { left: "Khoa's aunt", right: 'cooked fish soup' },
          { left: 'Vy', right: 'showed Khoa a kitten' },
          { left: "Khoa's sister", right: 'helped with homework' },
        ],
        explanation: {
          vi: 'Tìm từng tên người trong bài, đọc câu chứa tên đó rồi nối.',
          en: 'Find each name in the text, read that sentence, then match.',
        },
      },
      {
        id: 'l1-read-10-ex03',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: 'Khoa got up late on Saturday.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài viết: "I got up early" – dậy sớm, không phải dậy muộn.',
          en: 'The text says "I got up early".',
        },
      },
      {
        id: 'l1-read-10-ex04',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: 'Khoa and Duc played video games for two hours.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"…we played video games for two hours."',
          en: '"…we played video games for two hours."',
        },
      },
      {
        id: 'l1-read-10-ex05',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: "Khoa's aunt lives near the lake.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài có nhắc nhà dì và cái hồ, nhưng không nói nhà dì ở gần hồ.',
          en: "The text mentions the aunt's house and the lake, but not where the aunt lives.",
        },
      },
      {
        id: 'l1-read-10-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng quá khứ của nó.', en: 'Match each verb with its past form.' },
        pairs: [
          { left: 'get', right: 'got' },
          { left: 'come', right: 'came' },
          { left: 'ride', right: 'rode' },
          { left: 'take', right: 'took' },
          { left: 'do', right: 'did' },
          { left: 'have', right: 'had' },
        ],
        explanation: {
          vi: 'Đây là các động từ bất quy tắc xuất hiện trong bài blog.',
          en: 'These irregular verbs all appear in the blog post.',
        },
      },
      {
        id: 'l1-read-10-ex07',
        type: 'fill-blank',
        passageId: 'l1-read-10-p1',
        sentence: 'At the lake, Khoa and Duc watched the ___.',
        acceptedAnswers: ['sunset'],
        hint: '(hoàng hôn)',
        explanation: {
          vi: '"We watched the sunset and took lots of photos."',
          en: '"We watched the sunset and took lots of photos."',
        },
      },
      {
        id: 'l1-read-10-ex08',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: "Khoa's homework was easy.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"It was difficult" – bài tập khó, nên Khoa phải nhờ chị giúp.',
          en: '"It was difficult", so he asked his sister for help.',
        },
      },
      {
        id: 'l1-read-10-ex09',
        type: 'multiple-choice',
        passageId: 'l1-read-10-p1',
        question: 'How did Khoa and Duc go to the lake?',
        options: ['by bus', 'by bike', 'on foot', 'by car'],
        correctIndex: 1,
        explanation: {
          vi: '"Duc and I rode our bikes to the lake." – đạp xe đạp.',
          en: '"Duc and I rode our bikes to the lake."',
        },
      },
      {
        id: 'l1-read-10-ex10',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: "Vy's kitten is black.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài chỉ nói con mèo con rất dễ thương, không nói màu lông.',
          en: 'The text says the kitten was cute, but not its colour.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-read-10-test01',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: "Khoa had dinner at his aunt's house on Saturday evening.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"In the evening, my family had dinner at my aunt\'s house." (tối thứ Bảy)',
          en: '"In the evening, my family had dinner at my aunt\'s house." (Saturday)',
        },
      },
      {
        id: 'l1-read-10-test02',
        type: 'match-pairs',
        passageId: 'l1-read-10-p1',
        instruction: { vi: 'Nối thời gian với hoạt động của Khoa.', en: "Match each time with Khoa's activity." },
        pairs: [
          { left: 'Saturday morning', right: 'at the market' },
          { left: 'Saturday evening', right: "dinner at his aunt's house" },
          { left: 'Sunday morning', right: 'homework at home' },
          { left: 'Sunday afternoon', right: 'a bike ride to the lake' },
        ],
        explanation: {
          vi: 'Gạch chân các cụm thời gian trong bài (On Saturday morning, In the evening, On Sunday…, In the afternoon).',
          en: 'Underline the time phrases in the text first.',
        },
      },
      {
        id: 'l1-read-10-test03',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: 'Khoa took photos at the lake.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"We watched the sunset and took lots of photos."',
          en: '"We watched the sunset and took lots of photos."',
        },
      },
      {
        id: 'l1-read-10-test04',
        type: 'true-false',
        passageId: 'l1-read-10-p1',
        statement: 'Duc has a little brother.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài không nói gì về gia đình của Duc.',
          en: "The text says nothing about Duc's family.",
        },
      },
      {
        id: 'l1-read-10-test05',
        type: 'multiple-choice',
        passageId: 'l1-read-10-p1',
        question: 'At the end of the post, what does Khoa ask his readers to do?',
        options: ['send him photos', 'visit the lake', 'write about their weekend in the comments', 'buy vegetables at the market'],
        correctIndex: 2,
        explanation: {
          vi: '"What did you do this weekend? Tell me in the comments!" – kể cuối tuần của bạn ở phần bình luận.',
          en: '"What did you do this weekend? Tell me in the comments!"',
        },
      },
      {
        id: 'l1-read-10-test06',
        type: 'fill-blank',
        passageId: 'l1-read-10-p1',
        sentence: 'Khoa and his mum sold vegetables until ___ o\'clock.',
        acceptedAnswers: ['eleven', '11'],
        explanation: {
          vi: '"We sold vegetables until eleven o\'clock."',
          en: '"We sold vegetables until eleven o\'clock."',
        },
      },
    ],
  },
]
