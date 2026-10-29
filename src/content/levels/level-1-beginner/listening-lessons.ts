/**
 * listening-lessons.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI HỌC KỸ NĂNG NGHE (LISTENING) — LEVEL 1 (band 0 – 2.0, người mới bắt đầu).
 *
 * File này CHỈ chứa dữ liệu (nội dung), không có giao diện.
 * Mỗi bài học (Lesson) gồm:
 *   - teachingCards : thẻ lý thuyết + mẹo nghe (song ngữ Việt/Anh)
 *   - exercises     : 10 bài luyện nhỏ kiểu Duolingo
 *   - miniTest      : 6 câu kiểm tra cuối bài (có tính tim)
 *
 * Các dạng bài dùng ở đây:
 *   - 'listen-choose' : máy đọc audioText, người học chọn đáp án đúng
 *   - 'listen-type'   : máy đọc audioText, người học gõ lại những gì nghe được
 *   - 'multiple-choice' / 'fill-blank' / 'match-pairs' : ôn lại kiến thức
 *
 * Hội thoại được viết trong 1 chuỗi dạng "Tên: lời thoại. Tên: lời thoại."
 * để máy đọc có thể đổi giọng theo từng người nói.
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1ListeningLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Âm thanh & đánh vần — nghe chữ cái, nghe đánh vần tên
  // (giống IELTS Listening Part 1: người nói đánh vần tên, họ, tên đường...)
  // ==========================================================================
  {
    id: "l1-listen-01",
    skill: 'listening',
    title: { vi: "Nghe chữ cái và đánh vần tên", en: "Letters and spelling names" },
    description: {
      vi: "Nhận ra 26 chữ cái khi nghe và chép lại tên được đánh vần.",
      en: "Recognise the 26 letters by ear and write down spelled names.",
    },
    teachingCards: [
      {
        title: { vi: "Bảng chữ cái theo nhóm âm", en: "The alphabet in sound groups" },
        body: {
          vi: "Học chữ cái theo **nhóm có cùng âm** sẽ dễ nhớ hơn:\n**A H J K** – âm /eɪ/ (như 'day')\n**B C D E G P T V** – âm /iː/ (như 'see')\n**F L M N S X Z** – âm /e/ (như 'bed')\n**I Y** – âm /aɪ/ (như 'my')\n**O** – âm /əʊ/ (như 'go')\n**Q U W** – âm /juː/ (như 'you')\n**R** – âm /ɑː/ (như 'car')",
          en: "Letters are easier to remember in **groups with the same sound**:\n**A H J K** – /eɪ/ (like 'day')\n**B C D E G P T V** – /iː/ (like 'see')\n**F L M N S X Z** – /e/ (like 'bed')\n**I Y** – /aɪ/ (like 'my')\n**O** – /əʊ/ (like 'go')\n**Q U W** – /juː/ (like 'you')\n**R** – /ɑː/ (like 'car')",
        },
        examples: [
          { en: "A, H, J, K", vi: "Nhóm âm /eɪ/" },
          { en: "B, C, D, E, G, P, T, V", vi: "Nhóm âm /iː/" },
        ],
      },
      {
        title: { vi: "Những chữ cái người Việt hay nhầm", en: "Letters Vietnamese learners often confuse" },
        body: {
          vi: "Chú ý các cặp sau:\n**A** /eɪ/ ≠ **E** /iː/ ≠ **I** /aɪ/ (khác hẳn cách đọc tiếng Việt!)\n**G** /dʒiː/ ≠ **J** /dʒeɪ/\n**B** ≠ **V** ≠ **P**\n**M** ≠ **N**\nMẹo: khi nghe, hãy chú ý **nguyên âm cuối** của chữ cái để phân biệt.",
          en: "Watch out for these pairs:\n**A** /eɪ/ ≠ **E** /iː/ ≠ **I** /aɪ/ (very different from Vietnamese!)\n**G** /dʒiː/ ≠ **J** /dʒeɪ/\n**B** ≠ **V** ≠ **P**\n**M** ≠ **N**\nTip: listen to the **vowel sound at the end** of each letter.",
        },
        examples: [
          { en: "G, J", vi: "G đọc 'ji', J đọc 'jei'" },
          { en: "A, E, I", vi: "A đọc 'ây', E đọc 'i', I đọc 'ai'" },
        ],
      },
      {
        title: { vi: "Đánh vần tên: 'double L'", en: "Spelling names: 'double L'" },
        body: {
          vi: "Trong IELTS Listening Part 1, người nói thường **đánh vần tên**.\nHai chữ cái giống nhau đứng liền nhau được đọc là **double** + chữ cái.\nVD: Bella = B, E, **double L**, A.\nCâu hỏi hay gặp: **How do you spell that?** (Bạn đánh vần thế nào?)\nNhớ: viết hoa chữ cái đầu của tên riêng.",
          en: "In IELTS Listening Part 1, speakers often **spell names**.\nTwo same letters together are said as **double** + letter.\nE.g. Bella = B, E, **double L**, A.\nCommon question: **How do you spell that?**\nRemember: names start with a capital letter.",
        },
        examples: [
          { en: "How do you spell your name?", vi: "Bạn đánh vần tên mình thế nào?" },
          { en: "It's Bella. B, E, double L, A.", vi: "Là Bella. B, E, hai chữ L, A." },
          { en: "Green: G, R, double E, N.", vi: "Green: G, R, hai chữ E, N." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-01-ex01",
        type: 'listen-choose',
        audioText: "B",
        question: "Which letter do you hear? (Bạn nghe thấy chữ cái nào?)",
        options: ["B", "P", "V", "D"],
        correctIndex: 0,
        explanation: {
          vi: "B đọc là /biː/, môi mím lại rồi bật ra nhẹ. P bật hơi mạnh hơn, V có răng chạm môi dưới.",
          en: "B is /biː/. P has a stronger puff of air, and V uses the top teeth on the bottom lip.",
        },
      },
      {
        id: "l1-listen-01-ex02",
        type: 'listen-choose',
        audioText: "G",
        question: "Which letter do you hear? (Bạn nghe thấy chữ cái nào?)",
        options: ["J", "G", "Z", "C"],
        correctIndex: 1,
        explanation: {
          vi: "G đọc là /dʒiː/ (kết thúc bằng âm 'i'), còn J là /dʒeɪ/ (kết thúc bằng âm 'ây').",
          en: "G is /dʒiː/ (ends in 'ee'), but J is /dʒeɪ/ (ends in 'ay').",
        },
      },
      {
        id: "l1-listen-01-ex03",
        type: 'listen-choose',
        audioText: "E",
        question: "Which letter do you hear? (Bạn nghe thấy chữ cái nào?)",
        options: ["A", "I", "E", "Y"],
        correctIndex: 2,
        explanation: {
          vi: "E đọc là /iː/ (giống 'i' kéo dài). Đừng nhầm với I đọc là /aɪ/ ('ai').",
          en: "E is /iː/. Don't confuse it with I, which is /aɪ/.",
        },
      },
      {
        id: "l1-listen-01-ex04",
        type: 'listen-choose',
        audioText: "Man: What's your first name? Woman: Kate. K, A, T, E.",
        question: "What is the woman's first name? (Tên của người phụ nữ là gì?)",
        options: ["Cate", "Kate", "Keit", "Kathy"],
        correctIndex: 1,
        explanation: {
          vi: "Cô ấy đánh vần K, A, T, E → Kate. Tên 'Cate' cũng tồn tại nhưng bắt đầu bằng C, nên phải nghe kỹ chữ cái đầu.",
          en: "She spells K, A, T, E → Kate. 'Cate' also exists, but it starts with C, so listen carefully to the first letter.",
        },
      },
      {
        id: "l1-listen-01-ex05",
        type: 'listen-type',
        audioText: "S, M, I, T, H.",
        acceptedAnswers: ["Smith", "S M I T H", "S, M, I, T, H"],
        explanation: {
          vi: "Các chữ cái S, M, I, T, H ghép lại thành họ **Smith** — một họ rất phổ biến ở Anh.",
          en: "The letters S, M, I, T, H spell the surname **Smith** — a very common British surname.",
        },
      },
      {
        id: "l1-listen-01-ex06",
        type: 'multiple-choice',
        question: "How do people usually say 'LL' when they spell 'Bella'? (Khi đánh vần 'Bella', người ta thường đọc 'LL' thế nào?)",
        options: ["L, L only", "double L", "two L", "L double"],
        correctIndex: 1,
        explanation: {
          vi: "Người bản xứ thường nói **double L** cho hai chữ L liền nhau (đọc 'L, L' cũng được nhưng ít gặp hơn).",
          en: "Native speakers usually say **double L** for two Ls together ('L, L' is possible but less common).",
        },
      },
      {
        id: "l1-listen-01-ex07",
        type: 'listen-choose',
        audioText: "Man: Can you spell your surname, please? Woman: Yes. W, I, double L, S. Wills.",
        question: "What is the woman's surname? (Họ của người phụ nữ là gì?)",
        options: ["Wils", "Willis", "Wills", "Whills"],
        correctIndex: 2,
        explanation: {
          vi: "W, I, double L (= LL), S → **Wills**. 'Double L' nghĩa là viết hai chữ L.",
          en: "W, I, double L (= LL), S → **Wills**. 'Double L' means you write two Ls.",
        },
      },
      {
        id: "l1-listen-01-ex08",
        type: 'listen-type',
        audioText: "J, O, N, E, S.",
        acceptedAnswers: ["Jones", "J O N E S", "J, O, N, E, S"],
        explanation: {
          vi: "J (/dʒeɪ/), O, N, E (/iː/), S → **Jones**. Chú ý J đọc là 'jei', không phải 'ji'.",
          en: "J (/dʒeɪ/), O, N, E (/iː/), S → **Jones**. Note that J sounds like 'jay', not 'gee'.",
        },
      },
      {
        id: "l1-listen-01-ex09",
        type: 'fill-blank',
        sentence: "How do you ___ your name?",
        acceptedAnswers: ["spell"],
        hint: "(đánh vần)",
        explanation: {
          vi: "**How do you spell your name?** = Bạn đánh vần tên mình thế nào? Câu này xuất hiện rất nhiều trong IELTS Listening Part 1.",
          en: "**How do you spell your name?** is a very common question in IELTS Listening Part 1.",
        },
      },
      {
        id: "l1-listen-01-ex10",
        type: 'match-pairs',
        instruction: {
          vi: "Nối mỗi chữ cái với âm giống nó.",
          en: "Match each letter with a word that has the same sound.",
        },
        pairs: [
          { left: "A", right: "sounds like 'day'" },
          { left: "E", right: "sounds like 'see'" },
          { left: "I", right: "sounds like 'my'" },
          { left: "O", right: "sounds like 'go'" },
          { left: "U", right: "sounds like 'you'" },
          { left: "R", right: "sounds like 'car'" },
        ],
        explanation: {
          vi: "Ghi nhớ nguyên âm của từng chữ cái giúp bạn không nhầm A, E, I khi nghe đánh vần.",
          en: "Knowing the vowel sound of each letter stops you mixing up A, E and I.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-01-test01",
        type: 'listen-choose',
        audioText: "V",
        question: "Which letter do you hear?",
        options: ["B", "V", "W", "F"],
        correctIndex: 1,
        explanation: {
          vi: "V đọc là /viː/, răng trên chạm môi dưới. W đọc là /ˈdʌb.əl.juː/ (dài hơn nhiều).",
          en: "V is /viː/, with the top teeth on the bottom lip. W is /ˈdʌb.əl.juː/, which is much longer.",
        },
      },
      {
        id: "l1-listen-01-test02",
        type: 'listen-choose',
        audioText: "J",
        question: "Which letter do you hear?",
        options: ["G", "J", "Y", "H"],
        correctIndex: 1,
        explanation: {
          vi: "J đọc là /dʒeɪ/ (vần 'ây', cùng nhóm với A, H, K).",
          en: "J is /dʒeɪ/ (it rhymes with A, H and K).",
        },
      },
      {
        id: "l1-listen-01-test03",
        type: 'listen-type',
        audioText: "B, R, O, W, N.",
        acceptedAnswers: ["Brown", "B R O W N", "B, R, O, W, N"],
        explanation: {
          vi: "B, R, O, W, N → **Brown**. W đọc là 'double U'.",
          en: "B, R, O, W, N → **Brown**. W is said 'double U'.",
        },
      },
      {
        id: "l1-listen-01-test04",
        type: 'listen-choose',
        audioText: "Woman: What's your surname? Man: It's Parker. P, A, R, K, E, R.",
        question: "What is the man's surname?",
        options: ["Barker", "Parker", "Packer", "Parka"],
        correctIndex: 1,
        explanation: {
          vi: "Anh ấy đánh vần P, A, R, K, E, R → **Parker**. Chữ đầu là P, không phải B.",
          en: "He spells P, A, R, K, E, R → **Parker**. The first letter is P, not B.",
        },
      },
      {
        id: "l1-listen-01-test05",
        type: 'listen-type',
        audioText: "G, R, double E, N.",
        acceptedAnswers: ["Green", "G R E E N", "G, R, E, E, N"],
        explanation: {
          vi: "'Double E' = EE, nên tên là **Green**.",
          en: "'Double E' means EE, so the name is **Green**.",
        },
      },
      {
        id: "l1-listen-01-test06",
        type: 'multiple-choice',
        question: "Which letters have the same sound as A /eɪ/? (Những chữ nào cùng âm với A?)",
        options: ["H, J, K", "B, C, D", "F, L, M", "Q, U, W"],
        correctIndex: 0,
        explanation: {
          vi: "A, H, J, K cùng có âm /eɪ/.",
          en: "A, H, J and K all have the /eɪ/ sound.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Con số — phân biệt 13/30, số điện thoại, giá tiền
  // ==========================================================================
  {
    id: "l1-listen-02",
    skill: 'listening',
    title: { vi: "Nghe số, số điện thoại và giá tiền", en: "Numbers, phone numbers and prices" },
    description: {
      vi: "Phân biệt 13 và 30, nghe số điện thoại và giá tiền chính xác.",
      en: "Tell 13 from 30 and catch phone numbers and prices correctly.",
    },
    teachingCards: [
      {
        title: { vi: "Phân biệt 13 và 30", en: "13 or 30?" },
        body: {
          vi: "Đây là lỗi nghe phổ biến nhất!\nSố **-teen** (13–19): nhấn ở **cuối**, âm 'teen' dài và rõ chữ **n**: thir**TEEN**.\nSố **-ty** (20, 30...90): nhấn ở **đầu**, đuôi 'ty' ngắn: **THIR**ty.\nMẹo: nghe xem có âm **n** ở cuối hay không.",
          en: "This is the most common listening mistake!\n**-teen** numbers (13–19): stress at the **end**, a long 'teen' with a clear **n**: thir**TEEN**.\n**-ty** numbers (20, 30...90): stress at the **start**, a short 'ty': **THIR**ty.\nTip: listen for the **n** sound at the end.",
        },
        examples: [
          { en: "thirteen – thirty", vi: "13 – 30" },
          { en: "fourteen – forty", vi: "14 – 40" },
          { en: "fifteen – fifty", vi: "15 – 50" },
        ],
      },
      {
        title: { vi: "Số điện thoại", en: "Phone numbers" },
        body: {
          vi: "Số điện thoại được đọc **từng chữ số một**.\nSố **0** thường đọc là **'oh'** (giống chữ O), đôi khi là 'zero'.\nHai số giống nhau liền nhau: **double** + số. VD: 55 = 'double five'.\nNgười nói thường ngắt nhóm 3–4 số, hãy viết nhanh từng nhóm.",
          en: "Phone numbers are said **one digit at a time**.\n**0** is usually said **'oh'** (like the letter O), sometimes 'zero'.\nTwo same digits together: **double** + number, e.g. 55 = 'double five'.\nSpeakers pause between groups of 3–4 digits, so write each group quickly.",
        },
        examples: [
          { en: "Oh nine one two, four double five.", vi: "0912 455" },
          { en: "My number is oh seven eight, double three.", vi: "Số của tôi là 078 33" },
        ],
      },
      {
        title: { vi: "Giá tiền", en: "Prices" },
        body: {
          vi: "Giá tiền thường được đọc ngắn gọn:\n£4.50 = **four pounds fifty** (hoặc 'four fifty')\n$12.99 = **twelve dollars ninety-nine** (hoặc 'twelve ninety-nine')\nCâu hỏi giá: **How much is it?** / **How much are they?**",
          en: "Prices are usually said in a short way:\n£4.50 = **four pounds fifty** (or 'four fifty')\n$12.99 = **twelve dollars ninety-nine** (or 'twelve ninety-nine')\nAsking the price: **How much is it?** / **How much are they?**",
        },
        examples: [
          { en: "It's twelve pounds fifty.", vi: "Nó giá 12,50 bảng." },
          { en: "How much are the apples?", vi: "Táo giá bao nhiêu?" },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-02-ex01",
        type: 'listen-choose',
        audioText: "fifteen",
        question: "Which number do you hear? (Bạn nghe thấy số nào?)",
        options: ["15", "50", "5", "51"],
        correctIndex: 0,
        explanation: {
          vi: "fif**TEEN** nhấn ở cuối và có âm 'n' → 15. Còn **FIF**ty (50) nhấn ở đầu.",
          en: "fif**TEEN** has the stress at the end and an 'n' sound → 15. **FIF**ty (50) is stressed at the start.",
        },
      },
      {
        id: "l1-listen-02-ex02",
        type: 'listen-choose',
        audioText: "The ticket is thirty pounds.",
        question: "How much is the ticket? (Vé giá bao nhiêu?)",
        options: ["£13", "£30", "£33", "£3"],
        correctIndex: 1,
        explanation: {
          vi: "**THIR**ty nhấn ở đầu, đuôi 'ty' ngắn, không có âm 'n' → 30.",
          en: "**THIR**ty is stressed at the start with a short 'ty' and no 'n' → 30.",
        },
      },
      {
        id: "l1-listen-02-ex03",
        type: 'listen-choose',
        audioText: "I am seventeen years old.",
        question: "How old is the speaker? (Người nói bao nhiêu tuổi?)",
        options: ["17", "70", "7", "27"],
        correctIndex: 0,
        explanation: {
          vi: "seven**TEEN** = 17. Nghe âm 'teen' kéo dài ở cuối.",
          en: "seven**TEEN** = 17. Listen for the long 'teen' at the end.",
        },
      },
      {
        id: "l1-listen-02-ex04",
        type: 'listen-type',
        audioText: "Oh nine one two, four double five, eight seven oh.",
        acceptedAnswers: ["0912455870", "0912 455 870", "0912 455870"],
        explanation: {
          vi: "'Oh' = 0, 'double five' = 55. Số đầy đủ: **0912 455 870**.",
          en: "'Oh' = 0 and 'double five' = 55. The full number is **0912 455 870**.",
        },
      },
      {
        id: "l1-listen-02-ex05",
        type: 'listen-choose',
        audioText: "Man: What's your phone number? Woman: It's oh seven eight, double three nine, one four two.",
        question: "What is the woman's phone number?",
        options: ["078 339 142", "078 399 142", "087 339 142", "078 339 124"],
        correctIndex: 0,
        explanation: {
          vi: "oh seven eight = 078; double three nine = 339; one four two = 142 → **078 339 142**.",
          en: "oh seven eight = 078; double three nine = 339; one four two = 142 → **078 339 142**.",
        },
      },
      {
        id: "l1-listen-02-ex06",
        type: 'multiple-choice',
        question: "How do British people often say '0' in a phone number? (Người Anh thường đọc số 0 trong số điện thoại thế nào?)",
        options: ["'oh' (or 'zero')", "'ten'", "'double'", "'none'"],
        correctIndex: 0,
        explanation: {
          vi: "Số 0 trong số điện thoại thường đọc là **'oh'**, giống chữ O. Cũng có thể đọc 'zero'.",
          en: "In phone numbers, 0 is usually said **'oh'**, like the letter O. 'Zero' is also possible.",
        },
      },
      {
        id: "l1-listen-02-ex07",
        type: 'listen-choose',
        audioText: "Woman: How much is this T-shirt? Man: It's twelve pounds fifty.",
        question: "How much is the T-shirt?",
        options: ["£12.15", "£12.50", "£20.50", "£15.12"],
        correctIndex: 1,
        explanation: {
          vi: "'Twelve pounds fifty' = £12.50 (12 bảng 50 xu).",
          en: "'Twelve pounds fifty' = £12.50.",
        },
      },
      {
        id: "l1-listen-02-ex08",
        type: 'listen-type',
        audioText: "It costs forty dollars.",
        acceptedAnswers: ["It costs forty dollars", "It costs 40 dollars", "It costs $40"],
        explanation: {
          vi: "**forty** (40) — chú ý cách viết: forty, KHÔNG phải 'fourty'.",
          en: "**forty** (40) — note the spelling: forty, NOT 'fourty'.",
        },
      },
      {
        id: "l1-listen-02-ex09",
        type: 'fill-blank',
        sentence: "The number 04551 is said: oh four ___ five one.",
        acceptedAnswers: ["double"],
        hint: "(hai số giống nhau)",
        explanation: {
          vi: "Hai số 5 liền nhau đọc là **double five**.",
          en: "Two 5s together are said **double five**.",
        },
      },
      {
        id: "l1-listen-02-ex10",
        type: 'match-pairs',
        instruction: {
          vi: "Nối chữ với số đúng.",
          en: "Match the words with the numbers.",
        },
        pairs: [
          { left: "thirteen", right: "13" },
          { left: "thirty", right: "30" },
          { left: "fourteen", right: "14" },
          { left: "forty", right: "40" },
          { left: "fifteen", right: "15" },
          { left: "fifty", right: "50" },
        ],
        explanation: {
          vi: "-teen = 13 đến 19; -ty = các số tròn chục (20, 30, 40...).",
          en: "-teen = 13 to 19; -ty = tens (20, 30, 40...).",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-02-test01",
        type: 'listen-choose',
        audioText: "nineteen",
        question: "Which number do you hear?",
        options: ["90", "19", "9", "91"],
        correctIndex: 1,
        explanation: {
          vi: "nine**TEEN** nhấn cuối → 19.",
          en: "nine**TEEN** is stressed at the end → 19.",
        },
      },
      {
        id: "l1-listen-02-test02",
        type: 'listen-choose',
        audioText: "There are sixteen students in my class.",
        question: "How many students are there?",
        options: ["16", "60", "6", "66"],
        correctIndex: 0,
        explanation: {
          vi: "six**TEEN** = 16, có âm 'n' rõ ở cuối.",
          en: "six**TEEN** = 16, with a clear 'n' at the end.",
        },
      },
      {
        id: "l1-listen-02-test03",
        type: 'listen-type',
        audioText: "Double seven, two, oh, five.",
        acceptedAnswers: ["77205", "772 05", "7 7 2 0 5"],
        explanation: {
          vi: "double seven = 77, two = 2, oh = 0, five = 5 → **77205**.",
          en: "double seven = 77, two = 2, oh = 0, five = 5 → **77205**.",
        },
      },
      {
        id: "l1-listen-02-test04",
        type: 'listen-choose',
        audioText: "Man: How much are the apples? Woman: Two pounds eighty a kilo.",
        question: "How much is one kilo of apples?",
        options: ["£2.18", "£2.80", "£8.20", "£2.08"],
        correctIndex: 1,
        explanation: {
          vi: "'Two pounds eighty' = £2.80. **EIGH**ty (80) nhấn đầu, khác eigh**TEEN** (18).",
          en: "'Two pounds eighty' = £2.80. **EIGH**ty (80) is stressed at the start, unlike eigh**TEEN** (18).",
        },
      },
      {
        id: "l1-listen-02-test05",
        type: 'listen-choose',
        audioText: "Woman: Can I have your phone number? Man: Sure. It's oh nine eight, five five two, double one three.",
        question: "What is the man's phone number?",
        options: ["098 552 113", "098 525 113", "089 552 113", "098 552 131"],
        correctIndex: 0,
        explanation: {
          vi: "oh nine eight = 098; five five two = 552; double one three = 113 → **098 552 113**.",
          en: "oh nine eight = 098; five five two = 552; double one three = 113 → **098 552 113**.",
        },
      },
      {
        id: "l1-listen-02-test06",
        type: 'multiple-choice',
        question: "Where is the stress in 'fourteen'? (Trọng âm của 'fourteen' ở đâu?)",
        options: ["FOUR-teen (first part)", "four-TEEN (last part)", "on both parts", "there is no stress"],
        correctIndex: 1,
        explanation: {
          vi: "Các số -teen nhấn ở phần cuối: four**TEEN**. Số 40 thì nhấn đầu: **FOR**ty.",
          en: "-teen numbers are stressed at the end: four**TEEN**. 40 is stressed at the start: **FOR**ty.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Hội thoại ngắn hằng ngày — làm quen, chào hỏi, mua sắm
  // ==========================================================================
  {
    id: "l1-listen-03",
    skill: 'listening',
    title: { vi: "Hội thoại ngắn hằng ngày", en: "Short everyday conversations" },
    description: {
      vi: "Nghe hiểu các đoạn hội thoại ngắn khi làm quen và đi mua sắm.",
      en: "Understand short conversations when meeting people and shopping.",
    },
    teachingCards: [
      {
        title: { vi: "Làm quen và giới thiệu", en: "Meeting people" },
        body: {
          vi: "Các câu thường gặp khi gặp người mới:\n**Hi, I'm ...** – Chào, mình là ...\n**Nice to meet you.** → trả lời: **Nice to meet you, too.**\n**Where are you from?** → **I'm from Vietnam.**\n**How old are you?** → **I'm fourteen.**",
          en: "Common phrases when you meet someone new:\n**Hi, I'm ...**\n**Nice to meet you.** → answer: **Nice to meet you, too.**\n**Where are you from?** → **I'm from Vietnam.**\n**How old are you?** → **I'm fourteen.**",
        },
        examples: [
          { en: "Hi, I'm Anna. Nice to meet you.", vi: "Chào, mình là Anna. Rất vui được gặp bạn." },
          { en: "Where are you from?", vi: "Bạn đến từ đâu?" },
        ],
      },
      {
        title: { vi: "Đi mua sắm", en: "Shopping" },
        body: {
          vi: "Người bán hàng: **Can I help you?** (Tôi có thể giúp gì?)\nKhách: **I'd like ..., please.** (Tôi muốn mua ...)\nHỏi giá: **How much is it?**\nQuyết định mua: **I'll take it.** (Tôi lấy cái này.)\nĐưa hàng: **Here you are.** (Của bạn đây.)",
          en: "Shop assistant: **Can I help you?**\nCustomer: **I'd like ..., please.**\nAsking the price: **How much is it?**\nDeciding to buy: **I'll take it.**\nGiving something: **Here you are.**",
        },
        examples: [
          { en: "I'd like a bottle of water, please.", vi: "Cho tôi một chai nước." },
          { en: "OK, I'll take the black one.", vi: "Được, tôi lấy cái màu đen." },
        ],
      },
      {
        title: { vi: "Mẹo: cẩn thận khi người nói đổi ý", en: "Tip: watch out for changes" },
        body: {
          vi: "Trong IELTS, đáp án đầu tiên bạn nghe **chưa chắc là đáp án đúng**.\nNgười nói hay đổi ý với các từ: **Actually...**, **No, wait...**, **Sorry, I mean...**\nVì vậy hãy **nghe đến hết** rồi mới chọn.\nNgoài ra: đọc câu hỏi trước và gạch chân từ khóa (who, where, how much...).",
          en: "In IELTS, the first answer you hear is **not always the right one**.\nSpeakers often change their mind with: **Actually...**, **No, wait...**, **Sorry, I mean...**\nSo **listen to the end** before you choose.\nAlso: read the question first and underline key words (who, where, how much...).",
        },
        examples: [
          { en: "The red one... no, wait. The blue one, please.", vi: "Cái màu đỏ... à không. Cho tôi cái màu xanh." },
          { en: "It's on Monday. Sorry, I mean Tuesday.", vi: "Vào thứ Hai. Xin lỗi, ý tôi là thứ Ba." },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-03-ex01",
        type: 'listen-choose',
        audioText: "Anna: Hi, I'm Anna. Tom: Hello, Anna. I'm Tom. Nice to meet you.",
        question: "What is the man's name? (Người đàn ông tên gì?)",
        options: ["Anna", "Tom", "Tim", "Tony"],
        correctIndex: 1,
        explanation: {
          vi: "Người đàn ông nói: 'I'm Tom.' → tên anh ấy là Tom.",
          en: "The man says, 'I'm Tom.' → his name is Tom.",
        },
      },
      {
        id: "l1-listen-03-ex02",
        type: 'listen-choose',
        audioText: "Anna: Where are you from, Tom? Tom: I'm from Canada.",
        question: "Where is Tom from? (Tom đến từ đâu?)",
        options: ["Australia", "Canada", "China", "England"],
        correctIndex: 1,
        explanation: {
          vi: "Tom nói: 'I'm from Canada.' (Tôi đến từ Canada.)",
          en: "Tom says, 'I'm from Canada.'",
        },
      },
      {
        id: "l1-listen-03-ex03",
        type: 'listen-type',
        audioText: "Nice to meet you.",
        acceptedAnswers: ["Nice to meet you"],
        explanation: {
          vi: "'Nice to meet you' = Rất vui được gặp bạn. Câu đáp lại: 'Nice to meet you, too.'",
          en: "'Nice to meet you' is used when you meet someone for the first time. Reply: 'Nice to meet you, too.'",
        },
      },
      {
        id: "l1-listen-03-ex04",
        type: 'listen-choose',
        audioText: "Lan: How old are you, Mike? Mike: I'm fourteen. And you? Lan: I'm thirteen.",
        question: "How old is Lan? (Lan bao nhiêu tuổi?)",
        options: ["13", "14", "30", "40"],
        correctIndex: 0,
        explanation: {
          vi: "Mike 14 tuổi, còn Lan nói 'I'm thirteen' → 13. Đọc kỹ câu hỏi hỏi về ai!",
          en: "Mike is 14, but Lan says 'I'm thirteen' → 13. Check who the question is about!",
        },
      },
      {
        id: "l1-listen-03-ex05",
        type: 'listen-choose',
        audioText: "Assistant: Can I help you? Customer: Yes, I'd like a bottle of water, please. Assistant: Here you are. That's one pound.",
        question: "What does the customer buy? (Khách hàng mua gì?)",
        options: ["juice", "water", "milk", "tea"],
        correctIndex: 1,
        explanation: {
          vi: "Khách nói: 'I'd like a bottle of water' → một chai nước.",
          en: "The customer says, 'I'd like a bottle of water.'",
        },
      },
      {
        id: "l1-listen-03-ex06",
        type: 'listen-choose',
        audioText: "Customer: How much is this bag? Assistant: It's twenty-five pounds. Customer: And the black one? Assistant: That one is eighteen pounds. Customer: OK, I'll take the black one.",
        question: "How much does the customer pay? (Khách trả bao nhiêu tiền?)",
        options: ["£25", "£18", "£80", "£15"],
        correctIndex: 1,
        explanation: {
          vi: "£25 là giá túi đầu tiên (bẫy!). Khách mua túi màu đen: 'I'll take the black one' → £18.",
          en: "£25 is the first bag (a trap!). The customer buys the black one: 'I'll take the black one' → £18.",
        },
      },
      {
        id: "l1-listen-03-ex07",
        type: 'multiple-choice',
        question: "Someone says, 'Nice to meet you.' What do you answer? (Bạn đáp lại thế nào?)",
        options: ["Nice to meet you, too.", "I'm fine, thank you.", "Goodbye.", "Yes, please."],
        correctIndex: 0,
        explanation: {
          vi: "Đáp lại 'Nice to meet you' bằng 'Nice to meet you, too.' Câu 'I'm fine, thank you' dùng để trả lời 'How are you?'.",
          en: "Answer 'Nice to meet you' with 'Nice to meet you, too.' 'I'm fine, thank you' answers 'How are you?'.",
        },
      },
      {
        id: "l1-listen-03-ex08",
        type: 'fill-blank',
        sentence: "How ___ is this T-shirt? – It's ten dollars.",
        acceptedAnswers: ["much"],
        hint: "(bao nhiêu – tiền)",
        explanation: {
          vi: "Hỏi giá dùng **How much ...?**",
          en: "Use **How much ...?** to ask about price.",
        },
      },
      {
        id: "l1-listen-03-ex09",
        type: 'listen-type',
        audioText: "How much is it?",
        acceptedAnswers: ["How much is it"],
        explanation: {
          vi: "'How much is it?' = Cái này giá bao nhiêu? Trong câu nói nhanh, 'much is it' nghe gần như dính liền.",
          en: "'How much is it?' asks the price. In fast speech, 'much is it' sounds linked together.",
        },
      },
      {
        id: "l1-listen-03-ex10",
        type: 'match-pairs',
        instruction: {
          vi: "Nối câu hỏi với câu trả lời phù hợp.",
          en: "Match each question with the right answer.",
        },
        pairs: [
          { left: "How are you?", right: "I'm fine, thanks." },
          { left: "Where are you from?", right: "I'm from Vietnam." },
          { left: "What's your name?", right: "My name is Lan." },
          { left: "How much is it?", right: "It's five dollars." },
          { left: "Can I help you?", right: "Yes, I'd like a coffee." },
        ],
        explanation: {
          vi: "Đây là những cặp hỏi – đáp cơ bản nhất trong giao tiếp hằng ngày.",
          en: "These are the most basic question–answer pairs in everyday English.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-03-test01",
        type: 'listen-choose',
        audioText: "Ben: Hi, I'm Ben. I'm a student. Mai: Hi, Ben. I'm Mai. I'm a nurse.",
        question: "What is Mai's job?",
        options: ["student", "teacher", "nurse", "doctor"],
        correctIndex: 2,
        explanation: {
          vi: "Ben là học sinh, còn Mai nói 'I'm a nurse' → y tá.",
          en: "Ben is a student, but Mai says 'I'm a nurse.'",
        },
      },
      {
        id: "l1-listen-03-test02",
        type: 'listen-choose',
        audioText: "Tom: Where do you live, Hoa? Hoa: I live in Da Nang, but I'm from Hue.",
        question: "Where is Hoa from?",
        options: ["Da Nang", "Hue", "Hanoi", "Ho Chi Minh City"],
        correctIndex: 1,
        explanation: {
          vi: "Hoa sống ở Đà Nẵng (live in) nhưng quê ở Huế (I'm from Hue). 'Be from' = quê ở.",
          en: "Hoa lives in Da Nang, but she is from Hue. 'Be from' tells you someone's home town.",
        },
      },
      {
        id: "l1-listen-03-test03",
        type: 'listen-type',
        audioText: "Where are you from?",
        acceptedAnswers: ["Where are you from"],
        explanation: {
          vi: "'Where are you from?' = Bạn đến từ đâu?",
          en: "'Where are you from?' asks about someone's country or home town.",
        },
      },
      {
        id: "l1-listen-03-test04",
        type: 'listen-choose',
        audioText: "Customer: I'd like two coffees, please. Assistant: Large or small? Customer: Small, please. Assistant: That's four dollars.",
        question: "How much does the customer pay?",
        options: ["$2", "$4", "$14", "$40"],
        correctIndex: 1,
        explanation: {
          vi: "'two coffees' là số lượng (2 cốc). Giá là 'four dollars' → $4.",
          en: "'Two coffees' is the number of cups. The price is 'four dollars' → $4.",
        },
      },
      {
        id: "l1-listen-03-test05",
        type: 'listen-choose',
        audioText: "Assistant: Do you want the red shoes or the blue shoes? Customer: The red ones... no, wait. The blue ones, please.",
        question: "Which shoes does the customer want?",
        options: ["red", "blue", "black", "white"],
        correctIndex: 1,
        explanation: {
          vi: "Khách nói 'red' rồi đổi ý: 'no, wait. The blue ones' → màu xanh. Luôn nghe đến hết!",
          en: "The customer says 'red', then changes: 'no, wait. The blue ones' → blue. Always listen to the end!",
        },
      },
      {
        id: "l1-listen-03-test06",
        type: 'multiple-choice',
        question: "A shop assistant says, 'Can I help you?' What is the best answer?",
        options: ["Yes, I'm looking for a jacket.", "I'm from Vietnam.", "Nice to meet you.", "I'm fourteen."],
        correctIndex: 0,
        explanation: {
          vi: "Người bán hỏi cần giúp gì, nên trả lời bạn đang tìm mua gì: 'I'm looking for a jacket.'",
          en: "The assistant offers help, so say what you want to buy: 'I'm looking for a jacket.'",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Giờ, ngày tháng & điền mẫu đơn đơn giản
  // (làm quen IELTS Listening Part 1: điền form tên, số điện thoại, ngày, giờ)
  // ==========================================================================
  {
    id: "l1-listen-04",
    skill: 'listening',
    title: { vi: "Giờ, ngày tháng và điền mẫu đơn", en: "Times, dates and simple forms" },
    description: {
      vi: "Nghe giờ, ngày tháng và làm quen dạng điền form của IELTS Listening Part 1.",
      en: "Catch times and dates, and try the form-filling task of IELTS Listening Part 1.",
    },
    teachingCards: [
      {
        title: { vi: "Cách nói giờ", en: "Telling the time" },
        body: {
          vi: "Có 2 cách nói giờ:\n**Cách 1 (dễ):** nói giờ rồi phút. 10:15 = **ten fifteen**.\n**Cách 2:** dùng **past** (qua) và **to** (kém):\n7:30 = **half past seven**\n6:15 = **quarter past six**\n8:45 = **quarter to nine** (9 giờ kém 15)\n5:20 = **twenty past five**",
          en: "There are two ways to say the time:\n**Way 1 (easy):** hour then minutes. 10:15 = **ten fifteen**.\n**Way 2:** use **past** and **to**:\n7:30 = **half past seven**\n6:15 = **quarter past six**\n8:45 = **quarter to nine**\n5:20 = **twenty past five**",
        },
        examples: [
          { en: "It's half past seven.", vi: "Bây giờ là 7 giờ 30." },
          { en: "The class starts at quarter to nine.", vi: "Lớp học bắt đầu lúc 8 giờ 45." },
        ],
      },
      {
        title: { vi: "Ngày tháng: dùng số thứ tự", en: "Dates: ordinal numbers" },
        body: {
          vi: "Ngày trong tháng dùng **số thứ tự**: 1st **first**, 2nd **second**, 3rd **third**, 4th **fourth**, 5th **fifth**, 12th **twelfth**, 21st **twenty-first**.\nCách nói: **the third of March** hoặc **March the third**.\nThứ trong tuần: Monday, Tuesday, **Wednesday** (chữ d câm), Thursday, Friday, Saturday, Sunday.",
          en: "Days of the month use **ordinal numbers**: 1st **first**, 2nd **second**, 3rd **third**, 4th **fourth**, 5th **fifth**, 12th **twelfth**, 21st **twenty-first**.\nSay: **the third of March** or **March the third**.\nDays of the week: Monday, Tuesday, **Wednesday** (silent d), Thursday, Friday, Saturday, Sunday.",
        },
        examples: [
          { en: "My birthday is on the third of March.", vi: "Sinh nhật tôi vào ngày 3 tháng 3." },
          { en: "The course starts on the twenty-first of June.", vi: "Khóa học bắt đầu ngày 21 tháng 6." },
        ],
      },
      {
        title: { vi: "IELTS Listening Part 1: điền mẫu đơn", en: "IELTS Listening Part 1: form completion" },
        body: {
          vi: "Part 1 thường là cuộc gọi đặt chỗ/đăng ký, bạn phải **điền vào form**: tên, số điện thoại, ngày, giờ...\nMẹo:\n1. **Đọc form trước** và đoán loại thông tin cần điền (tên? số? ngày?).\n2. Thông tin xuất hiện **theo thứ tự** của form.\n3. Chú ý giới hạn từ, VD **ONE WORD AND/OR A NUMBER**.\n4. Viết đúng chính tả — sai chính tả là mất điểm!",
          en: "Part 1 is often a phone call to book or register, and you **complete a form**: name, phone number, date, time...\nTips:\n1. **Read the form first** and guess the type of answer (name? number? date?).\n2. The answers come **in order**.\n3. Check the word limit, e.g. **ONE WORD AND/OR A NUMBER**.\n4. Spell correctly — wrong spelling loses marks!",
        },
        examples: [
          { en: "Can I have your name, please?", vi: "Cho tôi xin tên của bạn." },
          { en: "What time would you like to come?", vi: "Bạn muốn đến lúc mấy giờ?" },
        ],
      },
    ],
    exercises: [
      {
        id: "l1-listen-04-ex01",
        type: 'listen-choose',
        audioText: "It's half past seven.",
        question: "What time is it? (Bây giờ là mấy giờ?)",
        options: ["7:30", "6:30", "7:15", "8:30"],
        correctIndex: 0,
        explanation: {
          vi: "'Half past seven' = nửa tiếng sau 7 giờ = 7:30.",
          en: "'Half past seven' = thirty minutes after seven = 7:30.",
        },
      },
      {
        id: "l1-listen-04-ex02",
        type: 'listen-choose',
        audioText: "The class starts at quarter to nine.",
        question: "When does the class start?",
        options: ["9:15", "8:45", "9:45", "8:15"],
        correctIndex: 1,
        explanation: {
          vi: "'Quarter to nine' = 9 giờ kém 15 phút = 8:45.",
          en: "'Quarter to nine' = fifteen minutes before nine = 8:45.",
        },
      },
      {
        id: "l1-listen-04-ex03",
        type: 'listen-choose',
        audioText: "My birthday is on the third of March.",
        question: "When is the birthday?",
        options: ["3 March", "13 March", "30 March", "3 May"],
        correctIndex: 0,
        explanation: {
          vi: "'The third of March' = ngày 3 tháng 3. 'Third' là số thứ tự của 3.",
          en: "'The third of March' = 3 March. 'Third' is the ordinal of 3.",
        },
      },
      {
        id: "l1-listen-04-ex04",
        type: 'listen-type',
        audioText: "The meeting is on Monday.",
        acceptedAnswers: ["The meeting is on Monday"],
        explanation: {
          vi: "Trước thứ trong tuần dùng giới từ **on**: on Monday. Thứ luôn viết hoa chữ cái đầu.",
          en: "Use **on** before days: on Monday. Days always start with a capital letter.",
        },
      },
      {
        id: "l1-listen-04-ex05",
        type: 'listen-choose',
        audioText: "Receptionist: When do you want to start the course? Man: On the twenty-first of June.",
        question: "When does the man want to start?",
        options: ["21 June", "20 June", "21 July", "1 June"],
        correctIndex: 0,
        explanation: {
          vi: "'Twenty-first' = 21st. 'June' là tháng 6, đừng nhầm với 'July' (tháng 7).",
          en: "'Twenty-first' = 21st. Don't confuse June with July.",
        },
      },
      {
        id: "l1-listen-04-ex06",
        type: 'multiple-choice',
        question: "How do you say '2nd' in a date? (Đọc '2nd' thế nào?)",
        options: ["two", "second", "twoth", "secondth"],
        correctIndex: 1,
        explanation: {
          vi: "2nd = **second**. Các số đặc biệt: first (1st), second (2nd), third (3rd).",
          en: "2nd = **second**. Special ones: first (1st), second (2nd), third (3rd).",
        },
      },
      {
        id: "l1-listen-04-ex07",
        type: 'fill-blank',
        sentence: "The month after April is ___.",
        acceptedAnswers: ["May"],
        hint: "(tháng 5)",
        explanation: {
          vi: "Sau tháng 4 (April) là tháng 5: **May**. Tên tháng luôn viết hoa.",
          en: "The month after April is **May**. Months always start with a capital letter.",
        },
      },
      {
        id: "l1-listen-04-ex08",
        type: 'listen-type',
        audioText: "Wednesday.",
        acceptedAnswers: ["Wednesday"],
        explanation: {
          vi: "**Wednesday** (thứ Tư) đọc là /ˈwenz.deɪ/ — chữ 'd' đầu tiên câm. Từ này hay bị viết sai!",
          en: "**Wednesday** is said /ˈwenz.deɪ/ — the first 'd' is silent. It's often misspelled!",
        },
      },
      {
        id: "l1-listen-04-ex09",
        type: 'listen-choose',
        audioText: "Receptionist: Good morning, City Sports Centre. Can I have your name, please? Woman: Yes, it's Linda Moore. M, double O, R, E. Receptionist: And what time would you like to come? Woman: At ten fifteen on Saturday.",
        question: "Complete the form. Time: ___ (Điền form: Giờ đến)",
        options: ["10:50", "10:15", "10:05", "9:15"],
        correctIndex: 1,
        explanation: {
          vi: "'Ten fifteen' = 10:15. Đừng nhầm fif**TEEN** (15) với **FIF**ty (50).",
          en: "'Ten fifteen' = 10:15. Don't confuse fif**TEEN** (15) with **FIF**ty (50).",
        },
      },
      {
        id: "l1-listen-04-ex10",
        type: 'match-pairs',
        instruction: {
          vi: "Nối cách nói giờ với giờ đúng.",
          en: "Match each time phrase with the correct time.",
        },
        pairs: [
          { left: "half past six", right: "6:30" },
          { left: "quarter past six", right: "6:15" },
          { left: "quarter to six", right: "5:45" },
          { left: "six o'clock", right: "6:00" },
          { left: "six fifty", right: "6:50" },
        ],
        explanation: {
          vi: "past = qua (cộng thêm), to = kém (trừ đi), o'clock = giờ đúng.",
          en: "past = after, to = before, o'clock = exactly on the hour.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-listen-04-test01",
        type: 'listen-choose',
        audioText: "The train leaves at twenty past five.",
        question: "When does the train leave?",
        options: ["5:20", "5:40", "4:20", "5:02"],
        correctIndex: 0,
        explanation: {
          vi: "'Twenty past five' = 5 giờ 20 phút.",
          en: "'Twenty past five' = 5:20.",
        },
      },
      {
        id: "l1-listen-04-test02",
        type: 'listen-choose',
        audioText: "My exam is on the fifteenth of October.",
        question: "When is the exam?",
        options: ["15 October", "50 October", "5 October", "15 August"],
        correctIndex: 0,
        explanation: {
          vi: "'Fifteenth' = 15th; 'October' = tháng 10.",
          en: "'Fifteenth' = 15th; the month is October.",
        },
      },
      {
        id: "l1-listen-04-test03",
        type: 'listen-type',
        audioText: "Thursday.",
        acceptedAnswers: ["Thursday"],
        explanation: {
          vi: "**Thursday** = thứ Năm, bắt đầu bằng âm /θ/ (lưỡi đặt giữa hai răng).",
          en: "**Thursday** starts with the /θ/ sound (tongue between the teeth).",
        },
      },
      {
        id: "l1-listen-04-test04",
        type: 'listen-choose',
        audioText: "Receptionist: What's your surname? Man: Taylor. T, A, Y, L, O, R. Receptionist: And your phone number? Man: Oh four one, double six, two five.",
        question: "Complete the form. Phone number: ___",
        options: ["0416625", "0416652", "0146625", "0416265"],
        correctIndex: 0,
        explanation: {
          vi: "oh four one = 041; double six = 66; two five = 25 → **0416625**.",
          en: "oh four one = 041; double six = 66; two five = 25 → **0416625**.",
        },
      },
      {
        id: "l1-listen-04-test05",
        type: 'listen-choose',
        audioText: "Woman: Is the party on Friday the ninth? Man: No, it's on Saturday the tenth.",
        question: "When is the party?",
        options: ["Friday 9th", "Saturday 10th", "Friday 10th", "Saturday 9th"],
        correctIndex: 1,
        explanation: {
          vi: "Người phụ nữ đoán sai (Friday the ninth). Người đàn ông sửa lại: 'No, it's on Saturday the tenth.'",
          en: "The woman's guess is wrong. The man corrects her: 'No, it's on Saturday the tenth.'",
        },
      },
      {
        id: "l1-listen-04-test06",
        type: 'fill-blank',
        sentence: "In IELTS Listening Part 1, you often complete a ___ with names, numbers and dates.",
        acceptedAnswers: ["form"],
        hint: "(mẫu đơn)",
        explanation: {
          vi: "Part 1 thường là dạng điền **form** (mẫu đơn) với thông tin cá nhân.",
          en: "Part 1 is often **form** completion with personal information.",
        },
      },
    ],
  },
]
