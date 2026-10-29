/**
 * reading-lessons.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI HỌC KỸ NĂNG ĐỌC (READING) — LEVEL 2 "FOUNDATION" (band 2.0 – 3.0, CEFR A1+/A2).
 *
 * File này CHỈ chứa dữ liệu (nội dung), không có giao diện.
 * Ở Level 2, người học bắt đầu làm quen TỪNG KỸ NĂNG ĐỌC IELTS, mỗi bài 1 kỹ năng:
 *   Bài 1  : Đọc lướt tìm ý chính (skimming)            — bài báo về đồ ăn đường phố
 *   Bài 2  : Đọc quét tìm tên, con số (scanning)         — quảng cáo giảm giá
 *   Bài 3  : Luyện thêm True / False / Not Given         — email kể chuyện đi chơi
 *   Bài 4  : Chọn tiêu đề cho đoạn văn (matching headings) — mẹo sức khỏe
 *   Bài 5  : Hoàn thành câu (ONE WORD from the text)     — công thức nấu ăn
 *   Bài 6  : Nhận ra cách diễn đạt lại (paraphrase/synonyms) — tiểu sử
 *   Bài 7  : Từ quy chiếu (it / they / this...)          — bài về loài chim cánh cụt
 *   Bài 8  : Đoán nghĩa từ mới qua ngữ cảnh              — blog du lịch Hội An
 *   Bài 9  : Ôn tập kỹ năng — bản tin trường học
 *   Bài 10 : Ôn tập tổng hợp — một câu chuyện ngắn
 *
 * Mỗi bài học (Lesson) gồm:
 *   - teachingCards   : 2-3 thẻ lý thuyết + mẹo làm bài (song ngữ Việt/Anh)
 *   - readingPassages : 1 đoạn văn 150-250 từ (id dạng "l2-read-NN-p1")
 *   - exercises       : 10 bài luyện
 *   - miniTest        : 6 câu kiểm tra cuối bài (có tính tim)
 *
 * Bài tập nào dựa trên đoạn văn thì ghi passageId để giao diện hiện đoạn văn bên cạnh.
 * Ở Level 2, True/False dùng tự do cả NOT GIVEN (allowNotGiven: true).
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level2ReadingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Đọc lướt (skimming) để tìm ý chính — bài báo về đồ ăn đường phố
  // ==========================================================================
  {
    id: "l2-read-01",
    skill: 'reading',
    title: { vi: "Đọc lướt tìm ý chính", en: "Skimming for the main idea" },
    description: {
      vi: "Học cách đọc lướt một bài báo để biết nhanh bài nói về điều gì và ý chính của từng đoạn.",
      en: "Learn to skim an article to find out quickly what it is about and the main idea of each paragraph.",
    },
    teachingCards: [
      {
        title: { vi: "Skimming là gì?", en: "What is skimming?" },
        body: {
          vi: "**Skimming (đọc lướt)** là đọc thật nhanh để biết **bài viết nói về chủ đề gì**, không cần hiểu từng từ.\nCách làm (khoảng 1–2 phút):\n1. Đọc **tiêu đề**.\n2. Đọc **câu đầu tiên** của mỗi đoạn.\n3. Đọc **đoạn cuối** (thường là kết luận).\n4. **Không dừng lại** ở từ mới.",
          en: "**Skimming** means reading very quickly to find out **what the text is about**. You don't need to understand every word.\nHow to do it (about 1–2 minutes):\n1. Read the **title**.\n2. Read the **first sentence** of each paragraph.\n3. Read the **last paragraph** (it often gives the conclusion).\n4. **Don't stop** at new words.",
        },
        examples: [
          { en: "Title: 'Why Teenagers Need More Sleep' → topic: teenagers and sleep", vi: "Tiêu đề cho biết ngay chủ đề: thanh thiếu niên và giấc ngủ" },
        ],
      },
      {
        title: { vi: "Câu chủ đề (topic sentence)", en: "The topic sentence" },
        body: {
          vi: "Mỗi đoạn văn thường có **một ý chính**. Ý chính này hay nằm ở **câu đầu tiên** — gọi là **câu chủ đề**.\nCác câu sau chỉ là **chi tiết**: ví dụ, con số, lý do...\nHỏi bản thân: **\"Đoạn này chủ yếu nói về điều gì?\"**",
          en: "Each paragraph usually has **one main idea**. It is often in the **first sentence** — the **topic sentence**.\nThe other sentences give **details**: examples, numbers, reasons...\nAsk yourself: **\"What is this paragraph mainly about?\"**",
        },
        examples: [
          { en: "There are many ways to save money. (main idea)", vi: "Có nhiều cách để tiết kiệm tiền. (ý chính)" },
          { en: "For example, you can cook at home. (detail)", vi: "Ví dụ, bạn có thể nấu ăn ở nhà. (chi tiết)" },
        ],
      },
      {
        title: { vi: "Ý chính hay chi tiết?", en: "Main idea or detail?" },
        body: {
          vi: "Bẫy hay gặp: một đáp án **đúng với bài** nhưng chỉ là **một chi tiết nhỏ**, không phải ý chính.\nÝ chính phải **bao quát cả đoạn / cả bài**, không quá hẹp, cũng không quá rộng.",
          en: "A common trap: an answer that is **true** but is only **a small detail**, not the main idea.\nThe main idea must **cover the whole paragraph / text** — not too narrow and not too wide.",
        },
        examples: [
          { en: "Too narrow: 'Noodle soup costs 30,000 dong.'", vi: "Quá hẹp: chỉ là một con số" },
          { en: "Too wide: 'Food in Asia.'", vi: "Quá rộng: bài không nói về mọi món ăn châu Á" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-01-p1",
        title: "Why Is Street Food So Popular?",
        text: "In many Asian cities, millions of people eat street food every day. In Vietnam, you can find small food stalls on almost every street. They sell noodle soup, sandwiches, rice dishes and sweet drinks.\n\nThere are three main reasons why street food is so popular. First, it is cheap. A bowl of noodle soup on the street usually costs much less than the same dish in a restaurant. Second, it is fast. Office workers and students are often busy, so they don't want to wait a long time for their lunch. Third, the food is fresh. Most cooks buy their meat and vegetables at the market early in the morning.\n\nHowever, street food is not always perfect. Some stalls are not very clean, and on hot days food can go bad quickly. Doctors say that you should choose busy stalls, because they sell their food quickly and cook new food all the time.\n\nToday, street food is also a big attraction for tourists. Many visitors say that eating at a small plastic table on the pavement is the best part of their holiday.",
      },
    ],
    exercises: [
      {
        id: "l2-read-01-ex01",
        type: 'multiple-choice',
        question: "What do you do when you skim a text? (Đọc lướt là làm gì?)",
        options: [
          "Read quickly to understand the general idea.",
          "Read every word slowly and carefully.",
          "Look up every new word in a dictionary.",
          "Read only the last word of each line.",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Skimming = đọc nhanh để nắm ý chung, không cần hiểu từng từ.",
          en: "Skimming = reading quickly for the general idea, not every word.",
        },
      },
      {
        id: "l2-read-01-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-01-p1",
        question: "What is the whole text mainly about?",
        options: [
          "How to cook noodle soup at home",
          "The best restaurants in Vietnam",
          "Why many people like eating street food",
          "Problems that tourists have in Asia",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Tiêu đề và câu đầu các đoạn đều nói về đồ ăn đường phố và lý do nó được yêu thích.",
          en: "The title and the first sentences of the paragraphs are all about street food and why people like it.",
        },
      },
      {
        id: "l2-read-01-ex03",
        type: 'multiple-choice',
        passageId: "l2-read-01-p1",
        question: "What is paragraph 2 mainly about?",
        options: [
          "The price of noodle soup",
          "Office workers' lunch breaks",
          "Markets in the early morning",
          "The reasons why street food is popular",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Câu chủ đề: 'There are three main reasons why street food is so popular.' Giá, thời gian, chợ chỉ là chi tiết.",
          en: "Topic sentence: 'There are three main reasons why street food is so popular.' Price, time and the market are only details.",
        },
      },
      {
        id: "l2-read-01-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-01-p1",
        question: "What is paragraph 3 mainly about?",
        options: [
          "Hot weather in Vietnam",
          "Some problems with street food and a piece of advice",
          "Why doctors don't eat street food",
          "How to clean a food stall",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Đoạn 3 bắt đầu bằng 'However, street food is not always perfect' (không phải lúc nào cũng hoàn hảo) rồi đưa ra lời khuyên của bác sĩ.",
          en: "Paragraph 3 begins 'However, street food is not always perfect' and then gives the doctors' advice.",
        },
      },
      {
        id: "l2-read-01-ex05",
        type: 'match-pairs',
        passageId: "l2-read-01-p1",
        instruction: {
          vi: "Nối mỗi đoạn văn với ý chính của nó.",
          en: "Match each paragraph with its main idea.",
        },
        pairs: [
          { left: "Paragraph 1", right: "Street food is everywhere" },
          { left: "Paragraph 2", right: "Three good things about street food" },
          { left: "Paragraph 3", right: "Street food can have problems" },
          { left: "Paragraph 4", right: "Tourists love street food too" },
        ],
        explanation: {
          vi: "Chỉ cần đọc câu đầu của mỗi đoạn là tìm được ý chính.",
          en: "Reading the first sentence of each paragraph is enough to find its main idea.",
        },
      },
      {
        id: "l2-read-01-ex06",
        type: 'true-false',
        passageId: "l2-read-01-p1",
        statement: "Street food is usually cheaper than restaurant food.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết: 'usually costs much less than the same dish in a restaurant' → rẻ hơn.",
          en: "The text says it 'usually costs much less than the same dish in a restaurant'.",
        },
      },
      {
        id: "l2-read-01-ex07",
        type: 'true-false',
        passageId: "l2-read-01-p1",
        statement: "Most street food cooks buy their meat and vegetables in the evening.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết nói họ mua ở chợ 'early in the morning' (sáng sớm), không phải buổi tối.",
          en: "The text says they buy them 'early in the morning', not in the evening.",
        },
      },
      {
        id: "l2-read-01-ex08",
        type: 'fill-blank',
        passageId: "l2-read-01-p1",
        sentence: "Doctors say you should choose ___ stalls.",
        acceptedAnswers: ["busy"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "Bài viết: 'you should choose busy stalls' — quán đông khách bán nhanh nên đồ ăn luôn mới.",
          en: "The text says 'you should choose busy stalls', because they sell their food quickly.",
        },
      },
      {
        id: "l2-read-01-ex09",
        type: 'multiple-choice',
        passageId: "l2-read-01-p1",
        question: "Which sentence is a DETAIL, not a main idea?",
        options: [
          "Street food is not always perfect.",
          "Street food is a big attraction for tourists.",
          "There are three main reasons why street food is popular.",
          "Most cooks buy their meat at the market early in the morning.",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Việc đầu bếp mua thịt ở chợ chỉ là chi tiết minh họa cho ý 'đồ ăn tươi'. Ba câu còn lại là câu chủ đề.",
          en: "Buying meat at the market is a detail that supports the idea 'the food is fresh'. The other three are topic sentences.",
        },
      },
      {
        id: "l2-read-01-ex10",
        type: 'multiple-choice',
        question: "You have one minute to skim a text. Which part should you read FIRST?",
        options: [
          "The longest paragraph",
          "The title",
          "The words you don't know",
          "The numbers in the text",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Luôn đọc tiêu đề trước — nó cho biết chủ đề của cả bài.",
          en: "Always read the title first — it tells you the topic of the whole text.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-01-test01",
        type: 'multiple-choice',
        passageId: "l2-read-01-p1",
        question: "What is the last paragraph mainly about?",
        options: [
          "Street food and tourists",
          "Plastic tables and chairs",
          "The cost of holidays in Asia",
          "Where tourists sleep",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Câu chủ đề: 'street food is also a big attraction for tourists' (đồ ăn đường phố hấp dẫn khách du lịch).",
          en: "Topic sentence: 'street food is also a big attraction for tourists'.",
        },
      },
      {
        id: "l2-read-01-test02",
        type: 'true-false',
        passageId: "l2-read-01-p1",
        statement: "Tourists pay more for street food than local people.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài có nói về khách du lịch nhưng không nói họ trả giá cao hơn hay không.",
          en: "The text talks about tourists but says nothing about the prices they pay.",
        },
      },
      {
        id: "l2-read-01-test03",
        type: 'true-false',
        passageId: "l2-read-01-p1",
        statement: "Office workers and students often want their lunch quickly.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết: họ bận nên 'don't want to wait a long time for their lunch' = muốn ăn nhanh.",
          en: "The text says they 'don't want to wait a long time for their lunch' = they want it quickly.",
        },
      },
      {
        id: "l2-read-01-test04",
        type: 'fill-blank',
        passageId: "l2-read-01-p1",
        sentence: "On hot days, food can go ___ quickly.",
        acceptedAnswers: ["bad"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'go bad' = bị hỏng, bị ôi (thức ăn).",
          en: "'go bad' = become old and not safe to eat.",
        },
      },
      {
        id: "l2-read-01-test05",
        type: 'multiple-choice',
        passageId: "l2-read-01-p1",
        question: "Which is the best OTHER title for the text?",
        options: [
          "How to Open a Food Stall",
          "A Doctor's Favourite Food",
          "Cheap, Fast and Fresh: Eating on the Street",
          "The History of Noodle Soup",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Tiêu đề tốt phải bao quát cả bài: đồ ăn đường phố rẻ, nhanh, tươi. Các lựa chọn khác không phải chủ đề của bài.",
          en: "A good title covers the whole text: street food is cheap, fast and fresh. The others are not the topic.",
        },
      },
      {
        id: "l2-read-01-test06",
        type: 'multiple-choice',
        question: "Where is the main idea of a paragraph USUALLY found?",
        options: [
          "In the middle sentence",
          "In the numbers",
          "In the longest word",
          "In the first sentence",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Câu chủ đề (topic sentence) thường là câu đầu tiên của đoạn.",
          en: "The topic sentence is usually the first sentence of the paragraph.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Đọc quét (scanning) tìm tên và con số — quảng cáo giảm giá
  // ==========================================================================
  {
    id: "l2-read-02",
    skill: 'reading',
    title: { vi: "Đọc quét tìm tên và con số", en: "Scanning for names and numbers" },
    description: {
      vi: "Tìm thật nhanh tên riêng, giá tiền, ngày giờ trong một tờ quảng cáo mua sắm.",
      en: "Quickly find names, prices, dates and times in a shopping advert.",
    },
    teachingCards: [
      {
        title: { vi: "Scanning là gì?", en: "What is scanning?" },
        body: {
          vi: "**Scanning (đọc quét)** là lướt mắt thật nhanh để tìm **một thông tin cụ thể** — giống như tìm tên mình trong danh sách lớp.\nCác bước:\n1. Đọc câu hỏi, gạch chân **từ khóa** (VD: price, Saturday, bus).\n2. Đoán dạng đáp án: **con số? tên người? ngày tháng?**\n3. Lướt mắt tìm từ khóa, **bỏ qua phần còn lại**.\n4. Tìm thấy rồi thì **đọc kỹ câu đó**.",
          en: "**Scanning** means moving your eyes quickly to find **one specific piece of information** — like looking for your name on a class list.\nSteps:\n1. Read the question and underline the **key words** (e.g. price, Saturday, bus).\n2. Guess the type of answer: **a number? a name? a date?**\n3. Move your eyes to find the key word and **ignore everything else**.\n4. When you find it, **read that sentence carefully**.",
        },
        examples: [
          { en: "Question: What time does the shop close? → look for a time (9 pm)", vi: "Câu hỏi về giờ đóng cửa → tìm con số chỉ giờ" },
        ],
      },
      {
        title: { vi: "Tên riêng và con số rất dễ thấy", en: "Names and numbers stand out" },
        body: {
          vi: "**Tên riêng** luôn **viết hoa** (Style Corner, TechZone) → mắt dễ bắt được.\n**Con số** có nhiều dạng: giá (£8), ngày (12th July), giờ (9 am), phần trăm (50%).\nChú ý: câu hỏi có thể viết khác bài: **half price = 50% off**, **free = £0**, **a third = 1/3**.",
          en: "**Names** always start with **capital letters** (Style Corner, TechZone), so they are easy to see.\n**Numbers** come in many forms: prices (£8), dates (12th July), times (9 am), percentages (50%).\nBe careful: the question may say it differently: **half price = 50% off**, **free = £0**.",
        },
        examples: [
          { en: "Up to 50% off = some things are half price", vi: "Giảm đến 50% = một số món còn nửa giá" },
          { en: "Buy two, get one free", vi: "Mua hai tặng một" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-02-p1",
        title: "Green Park Shopping Centre – Big Summer Sale!",
        text: "From Friday 12th July to Sunday 21st July, more than 60 shops in Green Park Shopping Centre are having a sale. Prices are up to 50% lower than usual!\n\nFashion: At Style Corner, all T-shirts are only £8 and jeans are £20. At Happy Feet, buy two pairs of shoes and get a third pair free.\n\nElectronics: TechZone has headphones for £15 – that's £10 cheaper than last month. The new SmartFit watch is £79.\n\nFood: The Noodle House on the second floor is giving a free drink with every meal over £10. Children under 6 eat free at Pizza Planet every Saturday.\n\nGetting here: During the sale, Green Park is open from 9 am to 9 pm every day. Take bus number 32 or 47 from the city centre. Parking is free for the first three hours.\n\nJoin the Green Park Club online and get an extra 10% off at any shop. It only takes two minutes!",
      },
    ],
    exercises: [
      {
        id: "l2-read-02-ex01",
        type: 'multiple-choice',
        question: "Question: 'How much are the jeans?' What should you scan for? (Nên tìm gì?)",
        options: ["A name", "A date", "A time", "A price"],
        correctIndex: 3,
        explanation: {
          vi: "'How much' hỏi về giá tiền → tìm con số có ký hiệu £.",
          en: "'How much' asks about money, so scan for a number with £.",
        },
      },
      {
        id: "l2-read-02-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-02-p1",
        question: "When does the sale finish?",
        options: ["Friday 12th July", "Sunday 21st July", "Saturday 20th July", "In two minutes"],
        correctIndex: 1,
        explanation: {
          vi: "'From Friday 12th July to Sunday 21st July' → kết thúc ngày Chủ nhật 21/7.",
          en: "'From Friday 12th July to Sunday 21st July' – it finishes on Sunday 21st July.",
        },
      },
      {
        id: "l2-read-02-ex03",
        type: 'fill-blank',
        passageId: "l2-read-02-p1",
        sentence: "A T-shirt at Style Corner costs £___.",
        acceptedAnswers: ["8", "eight"],
        hint: "a number",
        explanation: {
          vi: "Bài viết: 'all T-shirts are only £8'.",
          en: "The text says 'all T-shirts are only £8'.",
        },
      },
      {
        id: "l2-read-02-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-02-p1",
        question: "Which shop sells headphones?",
        options: ["TechZone", "Happy Feet", "Style Corner", "Pizza Planet"],
        correctIndex: 0,
        explanation: {
          vi: "Lướt tìm 'headphones' → 'TechZone has headphones for £15'.",
          en: "Scan for 'headphones': 'TechZone has headphones for £15'.",
        },
      },
      {
        id: "l2-read-02-ex05",
        type: 'match-pairs',
        passageId: "l2-read-02-p1",
        instruction: {
          vi: "Nối mỗi cửa hàng với điều nó cung cấp.",
          en: "Match each shop with what it offers.",
        },
        pairs: [
          { left: "Happy Feet", right: "a free pair of shoes" },
          { left: "TechZone", right: "a watch for £79" },
          { left: "The Noodle House", right: "a free drink" },
          { left: "Pizza Planet", right: "free meals for small children" },
        ],
        explanation: {
          vi: "Tên cửa hàng viết hoa nên rất dễ tìm khi đọc quét.",
          en: "Shop names have capital letters, so they are easy to find when you scan.",
        },
      },
      {
        id: "l2-read-02-ex06",
        type: 'multiple-choice',
        passageId: "l2-read-02-p1",
        question: "How much did the headphones cost LAST MONTH?",
        options: ["£10", "£15", "£25", "£5"],
        correctIndex: 2,
        explanation: {
          vi: "Bây giờ £15, rẻ hơn tháng trước £10 → tháng trước là £15 + £10 = £25.",
          en: "Now they are £15, which is £10 cheaper than last month, so last month they were £25.",
        },
      },
      {
        id: "l2-read-02-ex07",
        type: 'true-false',
        passageId: "l2-read-02-p1",
        statement: "The Noodle House is on the second floor.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết: 'The Noodle House on the second floor'.",
          en: "The text says 'The Noodle House on the second floor'.",
        },
      },
      {
        id: "l2-read-02-ex08",
        type: 'true-false',
        passageId: "l2-read-02-p1",
        statement: "Children under 6 can eat free at Pizza Planet every day.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Chỉ 'every Saturday' (mỗi thứ Bảy), không phải mỗi ngày.",
          en: "Only 'every Saturday', not every day.",
        },
      },
      {
        id: "l2-read-02-ex09",
        type: 'fill-blank',
        passageId: "l2-read-02-p1",
        sentence: "You can take bus number 32 or ___ from the city centre.",
        acceptedAnswers: ["47", "forty-seven", "forty seven"],
        hint: "a number",
        explanation: {
          vi: "Bài viết: 'Take bus number 32 or 47 from the city centre.'",
          en: "The text says 'Take bus number 32 or 47 from the city centre.'",
        },
      },
      {
        id: "l2-read-02-ex10",
        type: 'multiple-choice',
        question: "A question says 'half price'. Which words in a text mean the SAME?",
        options: ["10% off", "buy one, get one free", "50% off", "two for £20"],
        correctIndex: 2,
        explanation: {
          vi: "Half price (nửa giá) = giảm 50%.",
          en: "Half price = 50% off.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-02-test01",
        type: 'multiple-choice',
        passageId: "l2-read-02-p1",
        question: "What time does Green Park close during the sale?",
        options: ["9 am", "9 pm", "10 pm", "6 pm"],
        correctIndex: 1,
        explanation: {
          vi: "'open from 9 am to 9 pm every day' → đóng cửa lúc 9 giờ tối.",
          en: "'open from 9 am to 9 pm every day', so it closes at 9 pm.",
        },
      },
      {
        id: "l2-read-02-test02",
        type: 'fill-blank',
        passageId: "l2-read-02-p1",
        sentence: "Parking is free for the first ___ hours.",
        acceptedAnswers: ["three", "3"],
        hint: "a number",
        explanation: {
          vi: "Bài viết: 'Parking is free for the first three hours.'",
          en: "The text says 'Parking is free for the first three hours.'",
        },
      },
      {
        id: "l2-read-02-test03",
        type: 'true-false',
        passageId: "l2-read-02-p1",
        statement: "The SmartFit watch is the most expensive thing at TechZone.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài chỉ cho giá đồng hồ (£79), không nói về các món khác ở TechZone.",
          en: "The text gives the price of the watch (£79) but doesn't compare it with everything else at TechZone.",
        },
      },
      {
        id: "l2-read-02-test04",
        type: 'multiple-choice',
        passageId: "l2-read-02-p1",
        question: "How can you get an extra 10% off?",
        options: [
          "Spend more than £10 at The Noodle House",
          "Come on a Saturday",
          "Buy two pairs of shoes",
          "Join the Green Park Club online",
        ],
        correctIndex: 3,
        explanation: {
          vi: "'Join the Green Park Club online and get an extra 10% off at any shop.'",
          en: "'Join the Green Park Club online and get an extra 10% off at any shop.'",
        },
      },
      {
        id: "l2-read-02-test05",
        type: 'multiple-choice',
        passageId: "l2-read-02-p1",
        question: "How many shops are having a sale?",
        options: ["More than 60", "Exactly 50", "About 10", "Fewer than 30"],
        correctIndex: 0,
        explanation: {
          vi: "Bài viết: 'more than 60 shops ... are having a sale'. Số 50 là phần trăm giảm giá — đừng nhầm!",
          en: "The text says 'more than 60 shops'. 50 is the percentage – don't mix them up!",
        },
      },
      {
        id: "l2-read-02-test06",
        type: 'true-false',
        passageId: "l2-read-02-p1",
        statement: "At Happy Feet, you can get three pairs of shoes for the price of two.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'buy two pairs of shoes and get a third pair free' = trả tiền 2 đôi, được 3 đôi.",
          en: "'buy two pairs and get a third pair free' = pay for two, get three.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Luyện thêm True / False / Not Given — email kể chuyện đi Đà Lạt
  // ==========================================================================
  {
    id: "l2-read-03",
    skill: 'reading',
    title: { vi: "Luyện True / False / Not Given", en: "More practice: True / False / Not Given" },
    description: {
      vi: "Đọc một email kể về chuyến đi cuối tuần và luyện phân biệt TRUE, FALSE và NOT GIVEN.",
      en: "Read an email about a weekend trip and practise telling TRUE, FALSE and NOT GIVEN apart.",
    },
    teachingCards: [
      {
        title: { vi: "Nhắc lại 3 đáp án", en: "The three answers again" },
        body: {
          vi: "**TRUE** – bài đọc nói **cùng ý** (có thể bằng từ khác).\n**FALSE** – bài đọc nói **ngược lại**.\n**NOT GIVEN** – bài đọc **không có thông tin** để biết đúng hay sai.\nCâu hỏi đi **theo thứ tự** bài đọc, nên câu 2 sẽ nằm sau câu 1 trong bài.",
          en: "**TRUE** – the text gives **the same idea** (maybe with different words).\n**FALSE** – the text says **the opposite**.\n**NOT GIVEN** – there is **no information** to say if it is true or false.\nThe questions follow **the order** of the text, so the answer to question 2 comes after question 1.",
        },
        examples: [
          { en: "Text: We went there by coach. → 'They travelled by bus.' = TRUE", vi: "coach = xe khách → cùng ý → ĐÚNG" },
          { en: "Text: We went there by coach. → 'They went by plane.' = FALSE", vi: "Ngược với bài → SAI" },
        ],
      },
      {
        title: { vi: "Bẫy FALSE và NOT GIVEN", en: "FALSE and NOT GIVEN traps" },
        body: {
          vi: "**Bẫy 1:** những từ nhỏ như **all, always, only, never, every** có thể biến câu thành FALSE.\n**Bẫy 2:** bài **có nhắc đến chủ đề** nhưng **không nói đến chi tiết** trong câu → NOT GIVEN.\nVD bài nói 'I bought a hat'. Câu 'The hat was red' → bài không nói màu → **NOT GIVEN**.",
          en: "**Trap 1:** small words like **all, always, only, never, every** can make a statement FALSE.\n**Trap 2:** the text **mentions the topic** but **not the detail** in the statement → NOT GIVEN.\nE.g. the text says 'I bought a hat'. Statement: 'The hat was red' → no colour in the text → **NOT GIVEN**.",
        },
        examples: [
          { en: "Text: It rained in the morning. → 'It rained all day.' = FALSE", vi: "Chỉ buổi sáng ≠ cả ngày → SAI" },
          { en: "Text: We visited a farm. → 'The farm was very big.' = NOT GIVEN", vi: "Không nói trang trại to hay nhỏ → KHÔNG CÓ THÔNG TIN" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-03-p1",
        title: "An email from Linh",
        text: "Hi Emma,\n\nI'm writing to tell you about my weekend in Da Lat with my family. We went there by coach from Ho Chi Minh City. The journey took seven hours, which was longer than we expected because there was a lot of traffic.\n\nDa Lat was much cooler than Ho Chi Minh City. In the mornings it was only about 15 degrees, so I wore a jacket all the time. On Saturday we visited a flower garden and a strawberry farm. My little brother ate so many strawberries that he felt sick in the afternoon!\n\nOn Sunday it rained all morning, so we stayed in a café near the lake and played cards. In the evening we walked around the night market. I bought a woolly hat for myself and a scarf for my mum. Everything was cheaper than in the city.\n\nNext summer my parents are going to take us to Da Nang. Would you like to come with us? I'm sure you'll love the beaches there.\n\nWrite back soon!\n\nLove,\nLinh",
      },
    ],
    exercises: [
      {
        id: "l2-read-03-ex01",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Linh and her family travelled to Da Lat by coach.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết: 'We went there by coach from Ho Chi Minh City.'",
          en: "The email says 'We went there by coach from Ho Chi Minh City.'",
        },
      },
      {
        id: "l2-read-03-ex02",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "The journey was shorter than they expected.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết: 'longer than we expected' (lâu hơn dự kiến) — ngược với 'shorter'.",
          en: "The email says 'longer than we expected' – the opposite of 'shorter'.",
        },
      },
      {
        id: "l2-read-03-ex03",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Linh's father drove the family to Da Lat.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Cả nhà đi xe khách (coach), nên bố không tự lái xe.",
          en: "They went by coach, so her father did not drive them.",
        },
      },
      {
        id: "l2-read-03-ex04",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "It was cold in Da Lat in the mornings.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "Buổi sáng chỉ khoảng 15 độ và Linh phải mặc áo khoác → trời lạnh.",
          en: "It was only about 15 degrees and Linh wore a jacket, so it was cold.",
        },
      },
      {
        id: "l2-read-03-ex05",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "The strawberry farm was the biggest in Da Lat.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài có nhắc trang trại dâu nhưng không nói nó to nhất hay không.",
          en: "The email mentions the strawberry farm but says nothing about its size.",
        },
      },
      {
        id: "l2-read-03-ex06",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Linh's brother was ill after eating a lot of strawberries.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'ate so many strawberries that he felt sick' — felt sick = bị mệt/buồn nôn = ill.",
          en: "'he felt sick' means the same as 'he was ill'.",
        },
      },
      {
        id: "l2-read-03-ex07",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "It rained all day on Sunday.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Chỉ mưa 'all morning' (cả buổi sáng); buổi tối họ còn đi chợ đêm.",
          en: "It rained 'all morning' only; in the evening they walked around the night market.",
        },
      },
      {
        id: "l2-read-03-ex08",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Linh won the card game in the café.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài chỉ nói họ chơi bài, không nói ai thắng.",
          en: "The email says they played cards but not who won.",
        },
      },
      {
        id: "l2-read-03-ex09",
        type: 'multiple-choice',
        passageId: "l2-read-03-p1",
        question: "What did Linh buy for her mother?",
        options: ["A woolly hat", "A jacket", "Some strawberries", "A scarf"],
        correctIndex: 3,
        explanation: {
          vi: "'I bought a woolly hat for myself and a scarf for my mum.' Mũ len là cho Linh.",
          en: "'a woolly hat for myself and a scarf for my mum' – the hat was for Linh.",
        },
      },
      {
        id: "l2-read-03-ex10",
        type: 'multiple-choice',
        question: "Text: 'I always walk to school.' Statement: 'I sometimes take the bus to school.' What is the answer?",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 1,
        explanation: {
          vi: "'always walk' (luôn đi bộ) nghĩa là không bao giờ đi xe buýt → câu cho sẵn là SAI.",
          en: "'always walk' means never by bus, so the statement is FALSE.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-03-test01",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "There was heavy traffic on the way to Da Lat.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'there was a lot of traffic' = có nhiều xe cộ = heavy traffic.",
          en: "'there was a lot of traffic' = heavy traffic.",
        },
      },
      {
        id: "l2-read-03-test02",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Things at the night market were more expensive than in Ho Chi Minh City.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài viết: 'Everything was cheaper than in the city' → rẻ hơn, không đắt hơn.",
          en: "The email says 'Everything was cheaper than in the city'.",
        },
      },
      {
        id: "l2-read-03-test03",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Emma has visited Da Nang before.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Linh mời Emma đi Đà Nẵng nhưng không nói Emma đã từng đến đó chưa.",
          en: "Linh invites Emma to Da Nang, but we don't know if Emma has been there.",
        },
      },
      {
        id: "l2-read-03-test04",
        type: 'true-false',
        passageId: "l2-read-03-p1",
        statement: "Linh's family are planning another trip next summer.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'Next summer my parents are going to take us to Da Nang' — 'be going to' = kế hoạch.",
          en: "'Next summer my parents are going to take us to Da Nang' – 'be going to' shows a plan.",
        },
      },
      {
        id: "l2-read-03-test05",
        type: 'multiple-choice',
        passageId: "l2-read-03-p1",
        question: "Why did the family stay in a café on Sunday morning?",
        options: [
          "Because the weather was bad",
          "Because Linh's brother was sick",
          "Because the market was closed",
          "Because they wanted to meet Emma",
        ],
        correctIndex: 0,
        explanation: {
          vi: "'it rained all morning, so we stayed in a café' — 'so' chỉ kết quả, lý do là trời mưa.",
          en: "'it rained all morning, so we stayed in a café' – the reason was the rain.",
        },
      },
      {
        id: "l2-read-03-test06",
        type: 'multiple-choice',
        question: "Text: 'We visited a museum.' Statement: 'The museum was free.' What is the answer?",
        options: ["TRUE", "FALSE", "NOT GIVEN"],
        correctIndex: 2,
        explanation: {
          vi: "Bài nhắc đến bảo tàng nhưng không nói giá vé → NOT GIVEN.",
          en: "The text mentions the museum but not the price, so it is NOT GIVEN.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Chọn tiêu đề cho đoạn văn (matching headings) — mẹo sức khỏe
  // ==========================================================================
  {
    id: "l2-read-04",
    skill: 'reading',
    title: { vi: "Chọn tiêu đề cho đoạn văn", en: "Matching headings to paragraphs" },
    description: {
      vi: "Làm quen dạng bài Matching Headings: chọn tiêu đề phù hợp nhất cho từng đoạn ngắn về sức khỏe.",
      en: "Try the Matching Headings task: choose the best heading for each short paragraph about health.",
    },
    teachingCards: [
      {
        title: { vi: "Dạng bài Matching Headings", en: "The Matching Headings task" },
        body: {
          vi: "Bài đọc chia thành các đoạn **A, B, C...** Bạn có **một danh sách tiêu đề** (i, ii, iii...) và phải chọn tiêu đề đúng cho mỗi đoạn.\nThường có **nhiều tiêu đề hơn số đoạn** → có tiêu đề thừa.\nTiêu đề = **ý chính của cả đoạn**, giống kỹ năng skimming ở Bài 1.",
          en: "The text is divided into paragraphs **A, B, C...** You get **a list of headings** (i, ii, iii...) and choose the right heading for each paragraph.\nThere are usually **more headings than paragraphs**, so some are not used.\nA heading = **the main idea of the whole paragraph** – the same skill as skimming in Lesson 1.",
        },
        examples: [
          { en: "Paragraph about drinking water → heading: 'Don't forget to drink'", vi: "Đoạn nói về uống nước → tiêu đề: 'Đừng quên uống nước'" },
        ],
      },
      {
        title: { vi: "Cách làm và bẫy cần tránh", en: "How to do it – and a trap" },
        body: {
          vi: "1. Đọc **câu đầu và câu cuối** của đoạn.\n2. Tự tóm tắt đoạn bằng **3–5 từ** của mình.\n3. Chọn tiêu đề **gần nghĩa nhất** với bản tóm tắt.\n**Bẫy:** một tiêu đề có **cùng từ** với đoạn văn chưa chắc đã đúng — nó có thể chỉ khớp với **một chi tiết**.",
          en: "1. Read the **first and last sentences** of the paragraph.\n2. Sum up the paragraph in **3–5 words** of your own.\n3. Choose the heading **closest** to your summary.\n**Trap:** a heading with **the same word** as the paragraph is not always right – it may match only **one detail**.",
        },
        examples: [
          { en: "Paragraph C mentions 'phones', but it is about sleep → heading about sleep, not phones", vi: "Đoạn C có từ 'phones' nhưng ý chính là giấc ngủ" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-04-p1",
        title: "Five Tips for a Healthier School Day",
        text: "A\nMany students eat only a small snack in the morning, or nothing at all. But your brain needs energy to learn. A simple breakfast, like eggs, bread or a bowl of rice, helps you concentrate in class.\n\nB\nOur bodies are about 60% water. When you don't drink enough, you can feel tired and get headaches. Try to carry a bottle of water in your bag and drink from it often, not only when you feel thirsty.\n\nC\nTeenagers need eight to ten hours of sleep every night, but many get only six or seven. Phones are a big problem, because their light makes it harder to fall asleep. Turn your phone off one hour before bed.\n\nD\nYou don't need to go to a gym to be active. Walk or cycle to school, take the stairs instead of the lift, or play badminton with friends at the weekend. Thirty minutes of exercise a day is enough.\n\nE\nStudying for many hours without stopping is not a good idea. Every 45 minutes, stand up, stretch and look out of the window for five minutes. Your eyes and your mind will thank you.",
      },
    ],
    exercises: [
      {
        id: "l2-read-04-ex01",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Choose the best heading for paragraph A.",
        options: [
          "Eggs are the best food",
          "Start the day with a meal",
          "Snacks you can buy at school",
          "Why students are always hungry",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Đoạn A nói về tầm quan trọng của bữa sáng. 'Eggs' chỉ là một ví dụ (chi tiết).",
          en: "Paragraph A is about the importance of breakfast. 'Eggs' is only an example (a detail).",
        },
      },
      {
        id: "l2-read-04-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Choose the best heading for paragraph B.",
        options: [
          "Don't wait until you are thirsty",
          "How to stop headaches",
          "Choosing a good school bag",
          "Our bodies are 60% water",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Ý chính: uống nước thường xuyên, không đợi khát mới uống. 'Headaches' và '60%' chỉ là chi tiết.",
          en: "Main idea: drink water often, don't wait until you're thirsty. 'Headaches' and '60%' are details.",
        },
      },
      {
        id: "l2-read-04-ex03",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Choose the best heading for paragraph C.",
        options: [
          "The best phones for teenagers",
          "Teenagers and their friends",
          "Get more sleep",
          "How light works",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Đoạn C nói về giấc ngủ. Có từ 'phones' nhưng điện thoại chỉ là lý do khiến ta ngủ ít — đây là bẫy!",
          en: "Paragraph C is about sleep. It mentions 'phones', but they are only a reason for bad sleep – that's the trap!",
        },
      },
      {
        id: "l2-read-04-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Choose the best heading for paragraph D.",
        options: [
          "Join a gym today",
          "Badminton: a great sport",
          "Never take the lift",
          "Easy ways to be active",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Đoạn D đưa ra nhiều cách vận động đơn giản. Bài còn nói 'không cần đến phòng gym'.",
          en: "Paragraph D gives several simple ways to move. It even says you don't need a gym.",
        },
      },
      {
        id: "l2-read-04-ex05",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Choose the best heading for paragraph E.",
        options: [
          "Take short breaks",
          "Study for longer",
          "Look after your eyes at the beach",
          "Open the windows",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Đoạn E khuyên cứ 45 phút thì nghỉ 5 phút → nghỉ giải lao ngắn.",
          en: "Paragraph E says to stop for five minutes every 45 minutes – short breaks.",
        },
      },
      {
        id: "l2-read-04-ex06",
        type: 'match-pairs',
        passageId: "l2-read-04-p1",
        instruction: {
          vi: "Nối mỗi đoạn với chủ đề chính của nó (3–5 từ tóm tắt).",
          en: "Match each paragraph with its topic (a 3–5 word summary).",
        },
        pairs: [
          { left: "A", right: "eat in the morning" },
          { left: "B", right: "drink water often" },
          { left: "C", right: "sleep for longer" },
          { left: "D", right: "move your body" },
          { left: "E", right: "rest while studying" },
        ],
        explanation: {
          vi: "Tóm tắt mỗi đoạn bằng vài từ là bước quan trọng trước khi chọn tiêu đề.",
          en: "Summing up each paragraph in a few words is the key step before choosing a heading.",
        },
      },
      {
        id: "l2-read-04-ex07",
        type: 'true-false',
        passageId: "l2-read-04-p1",
        statement: "Most teenagers sleep for eight to ten hours a night.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Thanh thiếu niên CẦN 8–10 tiếng, nhưng nhiều bạn chỉ ngủ 6 hoặc 7 tiếng.",
          en: "Teenagers NEED eight to ten hours, but many get only six or seven.",
        },
      },
      {
        id: "l2-read-04-ex08",
        type: 'fill-blank',
        passageId: "l2-read-04-p1",
        sentence: "You should turn your phone off one ___ before bed.",
        acceptedAnswers: ["hour"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "Bài viết: 'Turn your phone off one hour before bed.'",
          en: "The text says 'Turn your phone off one hour before bed.'",
        },
      },
      {
        id: "l2-read-04-ex09",
        type: 'true-false',
        passageId: "l2-read-04-p1",
        statement: "Playing badminton is better for you than cycling.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài nhắc cả cầu lông và đạp xe nhưng không so sánh cái nào tốt hơn.",
          en: "The text mentions both but does not compare them.",
        },
      },
      {
        id: "l2-read-04-ex10",
        type: 'multiple-choice',
        question: "In a Matching Headings task, what is a heading?",
        options: [
          "The first word of a paragraph",
          "A new word you don't know",
          "The main idea of a paragraph",
          "A number in the paragraph",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Tiêu đề phải thể hiện ý chính của cả đoạn văn.",
          en: "A heading shows the main idea of the whole paragraph.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-04-test01",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Which paragraph could have the heading 'Water: your body's best friend'?",
        options: ["Paragraph A", "Paragraph C", "Paragraph E", "Paragraph B"],
        correctIndex: 3,
        explanation: {
          vi: "Đoạn B nói về việc uống nước.",
          en: "Paragraph B is about drinking water.",
        },
      },
      {
        id: "l2-read-04-test02",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Which paragraph could have the heading 'No gym? No problem!'?",
        options: ["Paragraph D", "Paragraph A", "Paragraph B", "Paragraph E"],
        correctIndex: 0,
        explanation: {
          vi: "Đoạn D: 'You don't need to go to a gym to be active.'",
          en: "Paragraph D: 'You don't need to go to a gym to be active.'",
        },
      },
      {
        id: "l2-read-04-test03",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "Which heading is NOT good for any paragraph?",
        options: [
          "Rest your eyes and mind",
          "Breakfast helps you learn",
          "Eat less sugar",
          "Phones and bedtime",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Không đoạn nào nói về đường (sugar). Đây là tiêu đề thừa — luôn có trong bài thật.",
          en: "No paragraph is about sugar. This is an extra heading – real tests always have some.",
        },
      },
      {
        id: "l2-read-04-test04",
        type: 'fill-blank',
        passageId: "l2-read-04-p1",
        sentence: "When you don't drink enough water, you may get ___.",
        acceptedAnswers: ["headaches"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "Bài viết: 'you can feel tired and get headaches'.",
          en: "The text says 'you can feel tired and get headaches'.",
        },
      },
      {
        id: "l2-read-04-test05",
        type: 'true-false',
        passageId: "l2-read-04-p1",
        statement: "The writer says thirty minutes of exercise a day is enough.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "Đoạn D: 'Thirty minutes of exercise a day is enough.'",
          en: "Paragraph D: 'Thirty minutes of exercise a day is enough.'",
        },
      },
      {
        id: "l2-read-04-test06",
        type: 'multiple-choice',
        passageId: "l2-read-04-p1",
        question: "A student chooses 'Problems with phones' as the heading for paragraph C. Why is this wrong?",
        options: [
          "Because paragraph C doesn't mention phones",
          "Because phones are only one detail – the paragraph is about sleep",
          "Because the heading is too short",
          "Because phones are good for sleep",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Tiêu đề chỉ khớp với một chi tiết. Ý chính của đoạn C là ngủ đủ giấc.",
          en: "The heading matches only one detail. The main idea of C is getting enough sleep.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 5: Hoàn thành câu (ONE WORD from the text) — công thức bánh chuối
  // ==========================================================================
  {
    id: "l2-read-05",
    skill: 'reading',
    title: { vi: "Hoàn thành câu: MỘT TỪ trong bài", en: "Sentence completion: ONE WORD from the text" },
    description: {
      vi: "Đọc một công thức nấu ăn và điền MỘT TỪ lấy từ bài đọc vào chỗ trống.",
      en: "Read a recipe and complete sentences with ONE WORD from the text.",
    },
    teachingCards: [
      {
        title: { vi: "Luật của dạng bài điền từ", en: "The rules of sentence completion" },
        body: {
          vi: "Đề thường ghi: **Write ONE WORD ONLY from the text.**\n• Chỉ viết **đúng 1 từ** — viết 2 từ là **sai**, dù đúng ý.\n• Từ phải **lấy y nguyên trong bài**, không tự đổi.\n• **Chính tả** phải chính xác — sai 1 chữ cái cũng mất điểm.\n• Con số viết bằng chữ số (VD: 20) thường được tính là 1 từ.",
          en: "The instructions often say: **Write ONE WORD ONLY from the text.**\n• Write **exactly one word** – two words are **wrong**, even if the meaning is right.\n• **Copy** the word from the text; don't change it.\n• **Spelling** must be correct – one wrong letter loses the mark.\n• A number in digits (e.g. 20) usually counts as one word.",
        },
        examples: [
          { en: "Peel the ___ and put them in a bowl. → bananas ✔", vi: "Viết 'bananas' ✔ — viết 'the bananas' ✘ (2 từ)" },
        ],
      },
      {
        title: { vi: "Đoán loại từ trước khi tìm", en: "Predict the word before you look" },
        body: {
          vi: "Trước khi tìm trong bài, đọc câu và đoán chỗ trống cần **loại từ** gì:\n• sau **a / the / some** → thường là **danh từ** (bowl, eggs)\n• sau **to / can / should** → **động từ** (mix, cook)\n• trước danh từ, sau **very / too** → **tính từ** (hot, sweet)\n• sau **for / about** + thời gian → **con số**\nCâu hỏi thường **diễn đạt lại** câu trong bài, nên hãy tìm **ý giống nhau**.",
          en: "Before you search, read the sentence and guess the **type of word**:\n• after **a / the / some** → usually a **noun** (bowl, eggs)\n• after **to / can / should** → a **verb** (mix, cook)\n• before a noun, or after **very / too** → an **adjective** (hot, sweet)\n• after **for / about** + time → a **number**\nThe sentence often **paraphrases** the text, so look for **the same idea**.",
        },
        examples: [
          { en: "Don't make the pan too ___. → adjective → hot", vi: "Sau 'too' → cần tính từ → hot" },
          { en: "Cook the other side for ___ seconds. → number → 30", vi: "Trước 'seconds' → cần con số → 30" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-05-p1",
        title: "Easy Banana Pancakes",
        text: "These pancakes are quick, cheap and healthy. You only need three main ingredients, and they are ready in 20 minutes. This recipe makes eight small pancakes.\n\nIngredients: 2 ripe bananas, 2 eggs, 4 spoons of flour, a little oil or butter for cooking, and honey or fresh fruit to serve.\n\n1. Peel the bananas and put them in a large bowl. Use a fork to mash them until they are smooth.\n2. Add the eggs and mix well. Then add the flour, one spoon at a time.\n3. Heat a little oil in a frying pan. Don't make the pan too hot, or the pancakes will burn.\n4. Pour two spoons of the mixture into the pan for each pancake. Cook for about one minute, until you can see small bubbles on top.\n5. Turn the pancakes over and cook the other side for 30 seconds.\n6. Serve them warm with honey or fresh fruit.\n\nTip: Brown bananas are better than yellow ones because they are sweeter. You can also add a little cinnamon for extra flavour.",
      },
    ],
    exercises: [
      {
        id: "l2-read-05-ex01",
        type: 'multiple-choice',
        question: "The instructions say 'ONE WORD ONLY'. Which answer is CORRECT for: 'Put the bananas in a large ___.'",
        options: ["big bowl", "bowl", "a bowl", "the bowl"],
        correctIndex: 1,
        explanation: {
          vi: "Chỉ được viết 1 từ: 'bowl'. Các lựa chọn khác đều có 2 từ.",
          en: "Only one word is allowed: 'bowl'. The others have two words.",
        },
      },
      {
        id: "l2-read-05-ex02",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "The pancakes take ___ minutes to make.",
        acceptedAnswers: ["20", "twenty"],
        hint: "ONE WORD / A NUMBER from the text",
        explanation: {
          vi: "'they are ready in 20 minutes' → mất 20 phút.",
          en: "'they are ready in 20 minutes'.",
        },
      },
      {
        id: "l2-read-05-ex03",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "Use a ___ to mash the bananas.",
        acceptedAnswers: ["fork"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "Sau 'a' cần danh từ. Bài viết: 'Use a fork to mash them'.",
          en: "After 'a' we need a noun. The text says 'Use a fork to mash them'.",
        },
      },
      {
        id: "l2-read-05-ex04",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "Add the flour slowly, one ___ at a time.",
        acceptedAnswers: ["spoon"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'add the flour, one spoon at a time' = cho bột từng thìa một.",
          en: "'add the flour, one spoon at a time'.",
        },
      },
      {
        id: "l2-read-05-ex05",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "If the pan is too hot, the pancakes will ___.",
        acceptedAnswers: ["burn"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "Sau 'will' cần động từ nguyên mẫu: 'burn' (bị cháy).",
          en: "After 'will' we need a verb: 'burn'.",
        },
      },
      {
        id: "l2-read-05-ex06",
        type: 'multiple-choice',
        question: "Look at the gap: 'Brown bananas are very ___.' What type of word do you need?",
        options: ["A noun", "A number", "A verb", "An adjective"],
        correctIndex: 3,
        explanation: {
          vi: "Sau 'very' cần tính từ (VD: sweet).",
          en: "After 'very' we need an adjective (e.g. sweet).",
        },
      },
      {
        id: "l2-read-05-ex07",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "When you see small ___ on the pancake, it is time to turn it over.",
        acceptedAnswers: ["bubbles"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'until you can see small bubbles on top' → bong bóng nhỏ. Nhớ viết đúng số nhiều 'bubbles'.",
          en: "'until you can see small bubbles on top'. Copy the plural form 'bubbles'.",
        },
      },
      {
        id: "l2-read-05-ex08",
        type: 'true-false',
        passageId: "l2-read-05-p1",
        statement: "You need six eggs to make these pancakes.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Chỉ cần 2 quả trứng ('2 eggs').",
          en: "You only need '2 eggs'.",
        },
      },
      {
        id: "l2-read-05-ex09",
        type: 'match-pairs',
        passageId: "l2-read-05-p1",
        instruction: {
          vi: "Nối động từ nấu ăn với nghĩa của nó.",
          en: "Match each cooking verb with its meaning.",
        },
        pairs: [
          { left: "peel", right: "take the skin off" },
          { left: "mash", right: "press until soft and smooth" },
          { left: "pour", right: "let a liquid go into something" },
          { left: "heat", right: "make something hot" },
          { left: "serve", right: "give food to people to eat" },
        ],
        explanation: {
          vi: "peel = gọt/bóc vỏ, mash = nghiền, pour = rót/đổ, heat = làm nóng, serve = dọn ra ăn.",
          en: "These verbs are very common in recipes.",
        },
      },
      {
        id: "l2-read-05-ex10",
        type: 'multiple-choice',
        passageId: "l2-read-05-p1",
        question: "Why are brown bananas better than yellow ones?",
        options: [
          "They are cheaper.",
          "They are bigger.",
          "They are sweeter.",
          "They cook faster.",
        ],
        correctIndex: 2,
        explanation: {
          vi: "'Brown bananas are better than yellow ones because they are sweeter.'",
          en: "'Brown bananas are better ... because they are sweeter.'",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-05-test01",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "The recipe makes ___ small pancakes.",
        acceptedAnswers: ["eight", "8"],
        hint: "ONE WORD / A NUMBER from the text",
        explanation: {
          vi: "'This recipe makes eight small pancakes.'",
          en: "'This recipe makes eight small pancakes.'",
        },
      },
      {
        id: "l2-read-05-test02",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "Mash the bananas until they are ___.",
        acceptedAnswers: ["smooth"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'mash them until they are smooth' — smooth = mịn.",
          en: "'mash them until they are smooth'.",
        },
      },
      {
        id: "l2-read-05-test03",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "Cook the second side of each pancake for ___ seconds.",
        acceptedAnswers: ["30", "thirty"],
        hint: "ONE WORD / A NUMBER from the text",
        explanation: {
          vi: "'cook the other side for 30 seconds' — 'the other side' = 'the second side' (diễn đạt lại).",
          en: "'cook the other side for 30 seconds' – 'the other side' = 'the second side' (paraphrase).",
        },
      },
      {
        id: "l2-read-05-test04",
        type: 'fill-blank',
        passageId: "l2-read-05-p1",
        sentence: "For more flavour, you can put in a little ___.",
        acceptedAnswers: ["cinnamon"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'You can also add a little cinnamon for extra flavour.' — cinnamon = quế. Chú ý chính tả!",
          en: "'add a little cinnamon for extra flavour'. Check your spelling!",
        },
      },
      {
        id: "l2-read-05-test05",
        type: 'multiple-choice',
        passageId: "l2-read-05-p1",
        question: "What should you do FIRST?",
        options: [
          "Peel the bananas",
          "Heat the oil",
          "Add the flour",
          "Mix the eggs",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Bước 1: 'Peel the bananas and put them in a large bowl.'",
          en: "Step 1: 'Peel the bananas and put them in a large bowl.'",
        },
      },
      {
        id: "l2-read-05-test06",
        type: 'true-false',
        passageId: "l2-read-05-p1",
        statement: "Banana pancakes are popular with children.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Công thức không nhắc đến trẻ em.",
          en: "The recipe doesn't say anything about children.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Nhận ra cách diễn đạt lại (paraphrase / từ đồng nghĩa) — tiểu sử Marie Curie
  // ==========================================================================
  {
    id: "l2-read-06",
    skill: 'reading',
    title: { vi: "Nhận ra cách diễn đạt lại", en: "Understanding paraphrase and synonyms" },
    description: {
      vi: "Đọc tiểu sử nhà khoa học Marie Curie và nhận ra câu hỏi nói lại cùng một ý bằng từ khác.",
      en: "Read the life story of Marie Curie and notice how questions say the same idea in different words.",
    },
    teachingCards: [
      {
        title: { vi: "IELTS hiếm khi dùng lại đúng từ trong bài", en: "IELTS rarely uses the same words" },
        body: {
          vi: "Câu hỏi thường **diễn đạt lại (paraphrase)** ý trong bài bằng **từ đồng nghĩa** (synonyms).\nNếu chỉ đi tìm **đúng y từ** trong câu hỏi, bạn sẽ dễ bị lạc.\nMột số cặp đồng nghĩa hay gặp:\n**clever = intelligent** · **begin = start** · **move to = go to live in**\n**get married = become husband and wife** · **win = receive (a prize)**",
          en: "Questions often **paraphrase** the text: they say the same idea with **synonyms**.\nIf you only look for **the exact words** from the question, you can get lost.\nCommon pairs:\n**clever = intelligent** · **begin = start** · **move to = go to live in**\n**get married = become husband and wife** · **win = receive (a prize)**",
        },
        examples: [
          { en: "Text: She was a very clever child. → Question: As a girl, she was intelligent.", vi: "clever = intelligent, child = girl" },
        ],
      },
      {
        title: { vi: "Ba cách diễn đạt lại", en: "Three ways to paraphrase" },
        body: {
          vi: "1. **Đổi từ đồng nghĩa:** loved reading → enjoyed books\n2. **Dùng từ trái nghĩa + not:** had very little money → was not rich\n3. **Đổi cấu trúc câu:** She was born in 1867 → Her year of birth was 1867\nMẹo: hãy tập hỏi **\"Câu này có cùng Ý với bài không?\"** chứ không phải **\"có cùng TỪ không?\"**",
          en: "1. **Synonyms:** loved reading → enjoyed books\n2. **Opposite + not:** had very little money → was not rich\n3. **Different grammar:** She was born in 1867 → Her year of birth was 1867\nTip: ask **\"Is it the same IDEA?\"**, not **\"Is it the same WORD?\"**",
        },
        examples: [
          { en: "She worked harder than anyone else. = Nobody worked as hard as her.", vi: "Cô ấy chăm chỉ hơn bất kỳ ai = Không ai chăm bằng cô ấy" },
          { en: "Women could not study at university. = Universities did not accept women.", vi: "Phụ nữ không được học đại học = Đại học không nhận phụ nữ" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-06-p1",
        title: "Marie Curie: A Life of Science",
        text: "Marie Curie was one of the most famous scientists in history. She was born in Warsaw, Poland, in 1867. Her name at birth was Maria Skłodowska. Both of her parents were teachers, and Maria was a very clever child who loved reading.\n\nAt that time, women could not study at university in Poland. So in 1891, Maria moved to Paris to study physics and mathematics. She had very little money and often did not have enough food, but she worked harder than anyone else in her class.\n\nIn Paris she met Pierre Curie, a French scientist, and they got married in 1895. Together they studied radioactivity and discovered two new elements, polonium and radium. In 1903 Marie became the first woman to win a Nobel Prize. In 1911 she won a second Nobel Prize, this time in chemistry.\n\nSadly, Pierre died in a street accident in 1906. Marie continued their work and became the first female professor at the University of Paris. She died in 1934, but her discoveries helped doctors to develop new ways of treating cancer.",
      },
    ],
    exercises: [
      {
        id: "l2-read-06-ex01",
        type: 'match-pairs',
        instruction: {
          vi: "Nối mỗi từ với từ đồng nghĩa của nó.",
          en: "Match each word with its synonym.",
        },
        pairs: [
          { left: "clever", right: "intelligent" },
          { left: "begin", right: "start" },
          { left: "famous", right: "well-known" },
          { left: "sadly", right: "unfortunately" },
          { left: "female", right: "woman" },
        ],
        explanation: {
          vi: "Học từ theo cặp đồng nghĩa giúp bạn nhận ra paraphrase nhanh hơn.",
          en: "Learning words in synonym pairs helps you notice paraphrase faster.",
        },
      },
      {
        id: "l2-read-06-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-06-p1",
        question: "'Both of her parents were teachers.' Which sentence has the SAME meaning?",
        options: [
          "Her mother was a teacher, but her father wasn't.",
          "Her mother and father worked in education.",
          "Her parents wanted her to be a teacher.",
          "She taught her parents.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "both of her parents = her mother and father; teachers = worked in education (làm ngành giáo dục).",
          en: "both of her parents = her mother and father; teachers = worked in education.",
        },
      },
      {
        id: "l2-read-06-ex03",
        type: 'multiple-choice',
        passageId: "l2-read-06-p1",
        question: "Why did Maria leave Poland?",
        options: [
          "She wanted to meet Pierre Curie.",
          "Her parents moved to France.",
          "She wanted to learn French.",
          "Universities in Poland did not accept women.",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Bài viết: 'women could not study at university in Poland' = các trường đại học không nhận nữ sinh.",
          en: "'women could not study at university in Poland' = universities did not accept women.",
        },
      },
      {
        id: "l2-read-06-ex04",
        type: 'true-false',
        passageId: "l2-read-06-p1",
        statement: "Maria was rich when she was a student in Paris.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'She had very little money' (rất ít tiền) → không giàu.",
          en: "'She had very little money', so she was not rich.",
        },
      },
      {
        id: "l2-read-06-ex05",
        type: 'true-false',
        passageId: "l2-read-06-p1",
        statement: "Nobody in her class worked as hard as Maria.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'she worked harder than anyone else in her class' = không ai chăm chỉ bằng cô ấy.",
          en: "'she worked harder than anyone else' = nobody worked as hard as her.",
        },
      },
      {
        id: "l2-read-06-ex06",
        type: 'multiple-choice',
        passageId: "l2-read-06-p1",
        question: "'They got married in 1895.' What does this mean?",
        options: [
          "They became husband and wife in 1895.",
          "They first met in 1895.",
          "They finished university in 1895.",
          "They started working together in 1895.",
        ],
        correctIndex: 0,
        explanation: {
          vi: "get married = kết hôn = become husband and wife.",
          en: "get married = become husband and wife.",
        },
      },
      {
        id: "l2-read-06-ex07",
        type: 'fill-blank',
        passageId: "l2-read-06-p1",
        sentence: "Marie and Pierre found two new ___.",
        acceptedAnswers: ["elements"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "found (tìm ra) = discovered. Bài viết: 'discovered two new elements'.",
          en: "found = discovered. The text says 'discovered two new elements'.",
        },
      },
      {
        id: "l2-read-06-ex08",
        type: 'true-false',
        passageId: "l2-read-06-p1",
        statement: "No woman received a Nobel Prize before Marie Curie.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'the first woman to win a Nobel Prize' = trước bà chưa có phụ nữ nào nhận giải. Receive = win.",
          en: "'the first woman to win a Nobel Prize' = no woman received one before her.",
        },
      },
      {
        id: "l2-read-06-ex09",
        type: 'multiple-choice',
        question: "Which pair is NOT a pair of synonyms?",
        options: ["start – begin", "big – large", "cheap – expensive", "quick – fast"],
        correctIndex: 2,
        explanation: {
          vi: "cheap (rẻ) và expensive (đắt) là từ TRÁI nghĩa, không phải đồng nghĩa.",
          en: "cheap and expensive are opposites, not synonyms.",
        },
      },
      {
        id: "l2-read-06-ex10",
        type: 'true-false',
        passageId: "l2-read-06-p1",
        statement: "Marie Curie spoke five languages.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài không nói bà nói được bao nhiêu thứ tiếng.",
          en: "The text says nothing about the languages she spoke.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-06-test01",
        type: 'multiple-choice',
        passageId: "l2-read-06-p1",
        question: "'Maria was a very clever child who loved reading.' Which is the best paraphrase?",
        options: [
          "Maria didn't like school.",
          "Maria's parents read to her every night.",
          "Maria wrote many books as a child.",
          "As a young girl, Maria was intelligent and enjoyed books.",
        ],
        correctIndex: 3,
        explanation: {
          vi: "clever = intelligent, child = young girl, loved reading = enjoyed books.",
          en: "clever = intelligent, child = young girl, loved reading = enjoyed books.",
        },
      },
      {
        id: "l2-read-06-test02",
        type: 'true-false',
        passageId: "l2-read-06-p1",
        statement: "Pierre Curie was from Poland.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'Pierre Curie, a French scientist' → ông là người Pháp.",
          en: "'Pierre Curie, a French scientist' – he was French.",
        },
      },
      {
        id: "l2-read-06-test03",
        type: 'multiple-choice',
        passageId: "l2-read-06-p1",
        question: "What happened in 1911?",
        options: [
          "Marie received her second Nobel Prize.",
          "Marie moved to Paris.",
          "Pierre died.",
          "Marie became a professor.",
        ],
        correctIndex: 0,
        explanation: {
          vi: "'In 1911 she won a second Nobel Prize' — won = received.",
          en: "'In 1911 she won a second Nobel Prize' – won = received.",
        },
      },
      {
        id: "l2-read-06-test04",
        type: 'fill-blank',
        passageId: "l2-read-06-p1",
        sentence: "After her husband's death, Marie became the university's first woman ___.",
        acceptedAnswers: ["professor"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'the first female professor' — female = woman (đồng nghĩa).",
          en: "'the first female professor' – female = woman.",
        },
      },
      {
        id: "l2-read-06-test05",
        type: 'true-false',
        passageId: "l2-read-06-p1",
        statement: "Marie stopped her scientific work after Pierre died.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'Marie continued their work' (tiếp tục) — ngược với 'stopped' (dừng lại).",
          en: "'Marie continued their work' – the opposite of 'stopped'.",
        },
      },
      {
        id: "l2-read-06-test06",
        type: 'multiple-choice',
        passageId: "l2-read-06-p1",
        question: "'Her discoveries helped doctors to develop new ways of treating cancer.' This means her work was ___",
        options: [
          "dangerous for doctors.",
          "not useful in hospitals.",
          "useful for medicine.",
          "only about chemistry.",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Giúp bác sĩ chữa ung thư = hữu ích cho y học (useful for medicine).",
          en: "Helping doctors treat cancer = useful for medicine.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Từ quy chiếu (it / they / this / he / she) — chim cánh cụt hoàng đế
  // ==========================================================================
  {
    id: "l2-read-07",
    skill: 'reading',
    title: { vi: "Từ quy chiếu: it, they, this...", en: "Reference words: it, they, this..." },
    description: {
      vi: "Đọc bài về chim cánh cụt hoàng đế và tìm xem các từ it, they, this, he, she thay thế cho điều gì.",
      en: "Read about emperor penguins and work out what words like it, they, this, he and she refer to.",
    },
    teachingCards: [
      {
        title: { vi: "Từ quy chiếu là gì?", en: "What are reference words?" },
        body: {
          vi: "Người viết không muốn lặp lại một danh từ nhiều lần, nên dùng **từ quy chiếu** để thay thế:\n**it** – 1 vật / 1 con vật\n**they / them / their** – nhiều người / nhiều vật\n**he / she** – 1 người (hoặc con vật đực / cái)\n**this / these** – điều vừa được nhắc đến\n**there** – nơi chốn vừa nhắc · **then** – thời điểm vừa nhắc\nHầu hết từ quy chiếu chỉ về thứ **đứng TRƯỚC** nó.",
          en: "Writers don't want to repeat a noun many times, so they use **reference words** instead:\n**it** – one thing / animal\n**they / them / their** – more than one person or thing\n**he / she** – one person (or a male / female animal)\n**this / these** – the idea just mentioned\n**there** – a place just mentioned · **then** – a time just mentioned\nMost reference words point **BACK** to something before them.",
        },
        examples: [
          { en: "I have a cat. It sleeps all day. (It = the cat)", vi: "Tôi có một con mèo. Nó ngủ cả ngày. (Nó = con mèo)" },
          { en: "We went to Hue. There, we visited the old city. (There = Hue)", vi: "Chúng tôi đến Huế. Ở đó... (Ở đó = Huế)" },
        ],
      },
      {
        title: { vi: "Cách kiểm tra đáp án", en: "How to check your answer" },
        body: {
          vi: "1. Nhìn **ngược lại** câu trước.\n2. Kiểm tra **số ít / số nhiều**: 'it' không thể thay cho 'penguins'.\n3. **Thay** từ bạn chọn vào chỗ từ quy chiếu rồi đọc lại — nếu câu **có nghĩa** thì đúng.\n'**This**' đôi khi thay cho **cả một ý / cả một câu**, không chỉ một từ.",
          en: "1. Look **back** at the sentence before.\n2. Check **singular / plural**: 'it' can't mean 'penguins'.\n3. **Replace** the reference word with your answer and read again – if it **makes sense**, it's right.\n'**This**' sometimes refers to **a whole idea or sentence**, not just one word.",
        },
        examples: [
          { en: "They can dive 500 metres. This helps them find food. (This = diving deep)", vi: "'This' = việc lặn sâu (cả một ý)" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-07-p1",
        title: "Emperor Penguins",
        text: "Emperor penguins are the largest penguins in the world. They can grow to about 1.2 metres tall and weigh as much as 40 kilograms. They live in Antarctica, the coldest place on Earth. In winter, the temperature there can fall to minus 40 degrees.\n\nThese birds cannot fly, but they are excellent swimmers. They can dive more than 500 metres under the sea to catch fish and squid. This helps them find food that other animals cannot reach.\n\nEmperor penguins have an unusual way of looking after their babies. In winter, the female lays one egg. She then gives it to the male and goes back to the sea to eat. He keeps the egg warm on his feet for about two months. During this time, he eats nothing at all.\n\nThe males stand close together in a large group to stay warm. They take turns to move into the middle, where it is warmer. When the chick comes out of the egg, the mother returns with food for it.\n\nToday, emperor penguins are in danger because the sea ice is melting. Scientists say we must protect their home.",
      },
    ],
    exercises: [
      {
        id: "l2-read-07-ex01",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 1: 'In winter, the temperature THERE can fall to minus 40 degrees.' What does 'there' refer to?",
        options: ["The sea", "Antarctica", "The world", "A zoo"],
        correctIndex: 1,
        explanation: {
          vi: "'there' chỉ nơi chốn vừa nhắc ở câu trước: Antarctica (Nam Cực).",
          en: "'there' refers to the place in the sentence before: Antarctica.",
        },
      },
      {
        id: "l2-read-07-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 2: 'THESE BIRDS cannot fly.' Who are 'these birds'?",
        options: ["Fish", "All birds", "Scientists", "Emperor penguins"],
        correctIndex: 3,
        explanation: {
          vi: "'These birds' = những con chim vừa được nói đến = chim cánh cụt hoàng đế.",
          en: "'These birds' = the birds the text is talking about = emperor penguins.",
        },
      },
      {
        id: "l2-read-07-ex03",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 2: 'THIS helps them find food.' What does 'this' refer to?",
        options: [
          "Being able to dive very deep",
          "Not being able to fly",
          "Living in a cold place",
          "Being very large",
        ],
        correctIndex: 0,
        explanation: {
          vi: "'This' thay cho cả ý ở câu trước: lặn sâu hơn 500 mét.",
          en: "'This' refers to the whole idea before it: diving more than 500 metres.",
        },
      },
      {
        id: "l2-read-07-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 3: 'SHE then gives it to the male.' Who is 'she'?",
        options: ["A scientist", "The chick", "The female penguin", "The mother of the writer"],
        correctIndex: 2,
        explanation: {
          vi: "Câu trước: 'the female lays one egg' → 'she' = chim mái.",
          en: "The sentence before says 'the female lays one egg', so 'she' = the female penguin.",
        },
      },
      {
        id: "l2-read-07-ex05",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 3: 'She then gives IT to the male.' What is 'it'?",
        options: ["The sea", "Some food", "The winter", "The egg"],
        correctIndex: 3,
        explanation: {
          vi: "'it' (số ít) = quả trứng vừa được nhắc đến.",
          en: "'it' (singular) = the egg just mentioned.",
        },
      },
      {
        id: "l2-read-07-ex06",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 3: 'During THIS TIME, he eats nothing at all.' What is 'this time'?",
        options: [
          "The two months when he keeps the egg warm",
          "The summer",
          "One day",
          "The time when he swims in the sea",
        ],
        correctIndex: 0,
        explanation: {
          vi: "'this time' = khoảng thời gian vừa nhắc: khoảng hai tháng ấp trứng.",
          en: "'this time' = the period just mentioned: about two months of keeping the egg warm.",
        },
      },
      {
        id: "l2-read-07-ex07",
        type: 'fill-blank',
        passageId: "l2-read-07-p1",
        sentence: "The male penguin keeps the egg warm on his ___.",
        acceptedAnswers: ["feet"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'He keeps the egg warm on his feet' — feet là số nhiều của foot.",
          en: "'He keeps the egg warm on his feet'.",
        },
      },
      {
        id: "l2-read-07-ex08",
        type: 'true-false',
        passageId: "l2-read-07-p1",
        statement: "The male penguin eats a lot while he looks after the egg.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'he eats nothing at all' = chim bố không ăn gì cả.",
          en: "'he eats nothing at all'.",
        },
      },
      {
        id: "l2-read-07-ex09",
        type: 'match-pairs',
        instruction: {
          vi: "Nối từ quy chiếu với loại từ mà nó thường thay thế.",
          en: "Match each reference word with what it usually refers to.",
        },
        pairs: [
          { left: "it", right: "one thing or animal" },
          { left: "they", right: "two or more things or people" },
          { left: "she", right: "one woman or female animal" },
          { left: "there", right: "a place" },
          { left: "then", right: "a time" },
        ],
        explanation: {
          vi: "Biết từ quy chiếu thay cho loại nào (số ít, số nhiều, nơi chốn, thời gian) giúp tìm đáp án nhanh hơn.",
          en: "Knowing what each word usually refers to helps you find the answer faster.",
        },
      },
      {
        id: "l2-read-07-ex10",
        type: 'true-false',
        passageId: "l2-read-07-p1",
        statement: "Emperor penguins can live for more than 20 years.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài không nhắc đến tuổi thọ của chim cánh cụt.",
          en: "The text doesn't say how long they live.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-07-test01",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 4: 'THEY take turns to move into the middle.' Who are 'they'?",
        options: ["The chicks", "The females", "The males", "The scientists"],
        correctIndex: 2,
        explanation: {
          vi: "Câu trước: 'The males stand close together' → 'they' = các con đực.",
          en: "The sentence before is about 'The males', so 'they' = the males.",
        },
      },
      {
        id: "l2-read-07-test02",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 4: 'the mother returns with food for IT.' What is 'it'?",
        options: ["The chick", "The egg", "The group", "The sea"],
        correctIndex: 0,
        explanation: {
          vi: "Chim mẹ mang thức ăn về cho chim non (the chick) vừa nở.",
          en: "The mother brings food for the chick that has just come out of the egg.",
        },
      },
      {
        id: "l2-read-07-test03",
        type: 'multiple-choice',
        passageId: "l2-read-07-p1",
        question: "Paragraph 5: 'we must protect THEIR home.' Whose home?",
        options: ["The scientists'", "Our", "The fish's", "The emperor penguins'"],
        correctIndex: 3,
        explanation: {
          vi: "Câu trước nói về chim cánh cụt hoàng đế đang gặp nguy hiểm → 'their' = của chim cánh cụt.",
          en: "The sentence before is about emperor penguins, so 'their home' = the penguins' home.",
        },
      },
      {
        id: "l2-read-07-test04",
        type: 'fill-blank',
        passageId: "l2-read-07-p1",
        sentence: "Emperor penguins catch fish and ___ under the sea.",
        acceptedAnswers: ["squid"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'to catch fish and squid' — squid = con mực.",
          en: "'to catch fish and squid'.",
        },
      },
      {
        id: "l2-read-07-test05",
        type: 'true-false',
        passageId: "l2-read-07-p1",
        statement: "The female penguin lays two eggs every winter.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'the female lays one egg' → chỉ một quả trứng.",
          en: "'the female lays one egg' – only one.",
        },
      },
      {
        id: "l2-read-07-test06",
        type: 'true-false',
        passageId: "l2-read-07-p1",
        statement: "Emperor penguins are in danger because their ice home is melting.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'in danger because the sea ice is melting' = đang gặp nguy vì băng tan.",
          en: "'in danger because the sea ice is melting'.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Đoán nghĩa từ mới qua ngữ cảnh — blog du lịch Hội An
  // ==========================================================================
  {
    id: "l2-read-08",
    skill: 'reading',
    title: { vi: "Đoán nghĩa từ qua ngữ cảnh", en: "Guessing words from context" },
    description: {
      vi: "Đọc một blog du lịch về Hội An và học cách đoán nghĩa từ mới mà không cần từ điển.",
      en: "Read a travel blog about Hoi An and learn to guess new words without a dictionary.",
    },
    teachingCards: [
      {
        title: { vi: "Đừng hoảng khi gặp từ mới!", en: "Don't panic at new words!" },
        body: {
          vi: "Trong phòng thi **không có từ điển**. Khi gặp từ mới:\n1. Hỏi: **Từ này có quan trọng với câu hỏi không?** Nếu không → bỏ qua.\n2. Nếu có → xem **loại từ** (danh từ, động từ, tính từ?).\n3. Đọc **câu trước và câu sau** để tìm **manh mối (clues)**.\nThường bạn chỉ cần hiểu **ý chung** (tốt hay xấu, to hay nhỏ...) là đủ.",
          en: "There is **no dictionary** in the exam. When you see a new word:\n1. Ask: **Is it important for the question?** If not → skip it.\n2. If yes → decide the **type of word** (noun, verb, adjective?).\n3. Read **the sentences before and after** to find **clues**.\nOften you only need the **general meaning** (good or bad, big or small...).",
        },
        examples: [
          { en: "The soup was delicious – I ate two bowls! → delicious = very good to eat", vi: "Ăn hai bát → chắc chắn món ăn rất ngon" },
        ],
      },
      {
        title: { vi: "4 loại manh mối", en: "Four kinds of clues" },
        body: {
          vi: "**1. Định nghĩa:** 'tailors. **These are people who** make clothes' → bài tự giải thích.\n**2. Giải thích sau dấu gạch ngang / dấu phẩy:** 'mild **–** not too hot and not too cold'\n**3. Nguyên nhân – kết quả:** 'Cars are not allowed, **so** it is peaceful and quiet.'\n**4. Thành phần của từ:** **in**expensive = không đắt (in- = không), color**ful** = nhiều màu.",
          en: "**1. Definition:** 'tailors. **These are people who** make clothes' – the text explains it.\n**2. Explanation after a dash or comma:** 'mild **–** not too hot and not too cold'\n**3. Cause and result:** 'Cars are not allowed, **so** it is peaceful and quiet.'\n**4. Word parts:** **in**expensive = not expensive, colour**ful** = full of colours.",
        },
        examples: [
          { en: "un- / in- = not: unhappy, inexpensive", vi: "un-, in- = không: không vui, không đắt" },
          { en: "-ful = full of: colourful, peaceful", vi: "-ful = đầy: nhiều màu sắc, yên bình" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-08-p1",
        title: "Three Days in Hoi An – a travel blog by Mark",
        text: "Last month I spent three days in Hoi An, a small town in central Vietnam. It was the highlight of my whole trip – nothing else came close!\n\nThe Old Town is the heart of Hoi An. Cars are not allowed in its narrow streets, so it is peaceful and quiet. I rented a bicycle for just 30,000 dong a day and rode slowly past old yellow houses, temples and small shops.\n\nIn the evening, the town became even more beautiful. Hundreds of colourful silk lanterns lit up the streets, and people put small paper boats with candles on the river. I took so many photos that my phone battery ran out!\n\nHoi An is also famous for its tailors. These are people who make clothes for you. I chose some blue cloth, and a tailor measured me in the afternoon. The next morning my new jacket was ready, and it fitted perfectly.\n\nThe food was delicious and inexpensive. My favourite dish was cao lau, a bowl of thick noodles with pork and fresh herbs. People say you can't find real cao lau anywhere else.\n\nMy advice? Go in February or March, when the weather is mild – not too hot and not too cold.",
      },
    ],
    exercises: [
      {
        id: "l2-read-08-ex01",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'It was the HIGHLIGHT of my whole trip – nothing else came close!' What does 'highlight' mean?",
        options: [
          "The most boring part",
          "The best part",
          "The first day",
          "The most expensive part",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Manh mối: 'nothing else came close' (không gì sánh bằng) → highlight = phần tuyệt nhất.",
          en: "Clue: 'nothing else came close' → highlight = the best part.",
        },
      },
      {
        id: "l2-read-08-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'Cars are not allowed, so it is PEACEFUL and quiet.' What does 'peaceful' mean?",
        options: ["Busy and noisy", "Dirty", "Calm", "Dangerous"],
        correctIndex: 2,
        explanation: {
          vi: "Không có ô tô → yên tĩnh. Từ 'so' cho biết kết quả; 'quiet' đứng cạnh cũng là manh mối. peaceful = yên bình.",
          en: "No cars, so it is calm. 'so' shows the result, and 'quiet' next to it is another clue.",
        },
      },
      {
        id: "l2-read-08-ex03",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'Hundreds of colourful silk LANTERNS lit up the streets.' What are lanterns?",
        options: [
          "Things that give light",
          "Small boats",
          "Types of food",
          "Old houses",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Manh mối: 'lit up the streets' (thắp sáng phố) → lantern = đèn lồng.",
          en: "Clue: they 'lit up the streets', so they give light. Lantern = đèn lồng.",
        },
      },
      {
        id: "l2-read-08-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'I took so many photos that my phone battery RAN OUT!' What does 'ran out' mean here?",
        options: [
          "It ran very fast.",
          "It became new.",
          "It got wet.",
          "It had no power left.",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Chụp quá nhiều ảnh → pin hết. run out = hết, cạn.",
          en: "Taking lots of photos uses the battery, so 'ran out' = had no power left.",
        },
      },
      {
        id: "l2-read-08-ex05",
        type: 'fill-blank',
        passageId: "l2-read-08-p1",
        sentence: "People who make clothes for you are called ___.",
        acceptedAnswers: ["tailors"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "Bài tự định nghĩa: 'tailors. These are people who make clothes for you.' (thợ may)",
          en: "The text gives a definition: 'tailors. These are people who make clothes for you.'",
        },
      },
      {
        id: "l2-read-08-ex06",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'A tailor MEASURED me in the afternoon.' What did the tailor probably do?",
        options: [
          "Took a photo of Mark",
          "Found out how big Mark's body is",
          "Sold Mark a bicycle",
          "Cooked for Mark",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Để may áo vừa người, thợ may phải đo (measure) kích thước cơ thể.",
          en: "To make a jacket that fits, a tailor needs to find out your size – that's 'measure'.",
        },
      },
      {
        id: "l2-read-08-ex07",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'The food was delicious and INEXPENSIVE.' What does 'inexpensive' mean?",
        options: ["Very expensive", "Cold", "Cheap", "Spicy"],
        correctIndex: 2,
        explanation: {
          vi: "Tiền tố in- = không → inexpensive = không đắt = rẻ.",
          en: "The prefix in- means 'not', so inexpensive = not expensive = cheap.",
        },
      },
      {
        id: "l2-read-08-ex08",
        type: 'match-pairs',
        passageId: "l2-read-08-p1",
        instruction: {
          vi: "Nối từ trong bài với nghĩa đoán được từ ngữ cảnh.",
          en: "Match the words from the text with their meanings from context.",
        },
        pairs: [
          { left: "narrow", right: "not wide" },
          { left: "rented", right: "paid money to use for a time" },
          { left: "mild", right: "not too hot and not too cold" },
          { left: "fitted", right: "was the right size" },
          { left: "delicious", right: "very good to eat" },
        ],
        explanation: {
          vi: "narrow = hẹp, rent = thuê, mild = ôn hòa, fit = vừa vặn, delicious = ngon.",
          en: "Use the clues around each word to work out its meaning.",
        },
      },
      {
        id: "l2-read-08-ex09",
        type: 'true-false',
        passageId: "l2-read-08-p1",
        statement: "Mark had to wait one week for his new jacket.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Thợ may đo buổi chiều, sáng hôm sau áo đã xong → chỉ chờ một đêm.",
          en: "He was measured in the afternoon and the jacket was ready the next morning.",
        },
      },
      {
        id: "l2-read-08-ex10",
        type: 'multiple-choice',
        question: "You see a new word in an IELTS text. What should you do FIRST?",
        options: [
          "Stop reading and give up the question.",
          "Ask the examiner what it means.",
          "Read the whole text again from the start.",
          "Decide if the word is important for the question.",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Nhiều từ mới không ảnh hưởng đến câu hỏi — có thể bỏ qua. Chỉ đoán nghĩa khi cần.",
          en: "Many new words are not needed for the question, so you can skip them. Only guess when you need to.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-08-test01",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "'The Old Town is the HEART of Hoi An.' Here, 'heart' means ___",
        options: [
          "the most important central part",
          "a part of the body",
          "a feeling of love",
          "a type of temple",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Ở đây 'heart' không phải trái tim thật, mà là trung tâm, phần quan trọng nhất của thị trấn.",
          en: "Here 'heart' is not the body part; it means the most important central part of the town.",
        },
      },
      {
        id: "l2-read-08-test02",
        type: 'fill-blank',
        passageId: "l2-read-08-p1",
        sentence: "Mark paid 30,000 dong a day to rent a ___.",
        acceptedAnswers: ["bicycle", "bike"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'I rented a bicycle for just 30,000 dong a day.'",
          en: "'I rented a bicycle for just 30,000 dong a day.'",
        },
      },
      {
        id: "l2-read-08-test03",
        type: 'true-false',
        passageId: "l2-read-08-p1",
        statement: "Cars cannot drive in the streets of the Old Town.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'Cars are not allowed' (ô tô không được phép vào) = cannot drive there.",
          en: "'Cars are not allowed' = cars cannot drive there.",
        },
      },
      {
        id: "l2-read-08-test04",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "Which clue helps you understand the word 'mild'?",
        options: [
          "The words 'February or March'",
          "The words after the dash: 'not too hot and not too cold'",
          "The word 'advice'",
          "The question mark",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Phần sau dấu gạch ngang giải thích nghĩa của 'mild' (ôn hòa, dễ chịu).",
          en: "The part after the dash explains 'mild'.",
        },
      },
      {
        id: "l2-read-08-test05",
        type: 'true-false',
        passageId: "l2-read-08-p1",
        statement: "Mark stayed in a hotel near the river.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài không nói Mark ở đâu.",
          en: "The blog doesn't say where Mark stayed.",
        },
      },
      {
        id: "l2-read-08-test06",
        type: 'multiple-choice',
        passageId: "l2-read-08-p1",
        question: "What is cao lau?",
        options: [
          "A kind of paper boat",
          "A kind of blue cloth",
          "A noodle dish",
          "A famous temple",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Bài giải thích ngay sau dấu phẩy: 'cao lau, a bowl of thick noodles with pork and fresh herbs'.",
          en: "The explanation comes after the comma: 'a bowl of thick noodles with pork and fresh herbs'.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Ôn tập kỹ năng — bản tin trường học (skimming + scanning + T/F/NG)
  // ==========================================================================
  {
    id: "l2-read-09",
    skill: 'reading',
    title: { vi: "Bản tin trường học: ôn kỹ năng", en: "School news: putting skills together" },
    description: {
      vi: "Đọc bản tin của một trường học và kết hợp đọc lướt, đọc quét, True/False/Not Given.",
      en: "Read a school newsletter and use skimming, scanning and True/False/Not Given together.",
    },
    teachingCards: [
      {
        title: { vi: "Chọn đúng kỹ năng cho từng câu hỏi", en: "Choose the right skill for each question" },
        body: {
          vi: "Trước khi trả lời, hãy nhìn câu hỏi và chọn **cách đọc** phù hợp:\n• Hỏi **ý chính / tiêu đề** → **skimming** (đọc lướt).\n• Hỏi **tên, số, ngày, giờ, giá** → **scanning** (đọc quét).\n• **True / False / Not Given** → scan tìm chỗ có thông tin, rồi **đọc kỹ** câu đó.\nBản tin thường có **tiêu đề nhỏ** cho mỗi mục — dùng chúng như **bản đồ**!",
          en: "Before you answer, look at the question and choose the right **way to read**:\n• **Main idea / heading** → **skimming**.\n• **Names, numbers, dates, times, prices** → **scanning**.\n• **True / False / Not Given** → scan to find the place, then **read carefully**.\nNewsletters often have a **small heading** for each section – use them like a **map**!",
        },
        examples: [
          { en: "When is the school trip? → scan for a date", vi: "Hỏi ngày → đọc quét tìm ngày tháng" },
          { en: "What is the article about? → skim", vi: "Hỏi bài nói về gì → đọc lướt" },
        ],
      },
      {
        title: { vi: "Cẩn thận với các con số giống nhau", en: "Be careful with similar numbers" },
        body: {
          vi: "Một bài đọc có thể có **nhiều con số**. Hãy đọc kỹ từ **đi kèm** con số:\n**245 points** (điểm) ≠ **230 points** · **Room 14** (phòng) ≠ **14th November** (ngày)\n**20 places** (chỗ) ≠ **12 students** (học sinh đã đăng ký)\nCâu hỏi có thể yêu cầu **tính đơn giản**: 20 chỗ – 12 đã đăng ký = **8 chỗ còn trống**.",
          en: "A text may have **many numbers**. Read the words **next to** each number:\n**245 points** ≠ **230 points** · **Room 14** ≠ **14th November**\n**20 places** ≠ **12 students** (already joined)\nA question may need **simple maths**: 20 places – 12 students = **8 places left**.",
        },
        examples: [
          { en: "The club has 20 places, and 12 students have joined. → 8 places are left.", vi: "Câu lạc bộ có 20 chỗ, 12 bạn đã tham gia → còn 8 chỗ." },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l2-read-09-p1",
        title: "Riverside School News – October",
        text: "Sports Day: a wet but wonderful day\nSports Day took place last Friday. The weather forecast said it was going to be sunny, but it started to rain at ten o'clock. Nobody wanted to stop, so the races continued. Blue Team won with 245 points, and Red Team came second with 230. The fastest runner was Nam Tran from Class 9B. He ran 100 metres in 12.8 seconds – a new school record!\n\nNew club: Photography\nFrom next week, there is going to be a photography club every Wednesday after school, from 3:30 to 5 pm, in Room 14. Mr Peters, our art teacher, will run the club. You don't need an expensive camera – a phone is fine. The club has 20 places, and 12 students have already joined.\n\nLibrary news\nThe library has 300 new books this year, including comics and graphic novels. Students can now borrow five books at a time instead of three.\n\nReminder: Science Museum trip\nThe school trip to the Science Museum is on 14th November. Please give the permission letter, signed by a parent, to your class teacher before 1st November. The trip costs £12.",
      },
    ],
    exercises: [
      {
        id: "l2-read-09-ex01",
        type: 'multiple-choice',
        question: "Question: 'Who is the fastest runner?' Which reading skill should you use?",
        options: ["Skimming", "Scanning", "Reading every word slowly", "Guessing without reading"],
        correctIndex: 1,
        explanation: {
          vi: "Câu hỏi tìm một tên người cụ thể → đọc quét (scanning).",
          en: "The question asks for a specific name, so scan.",
        },
      },
      {
        id: "l2-read-09-ex02",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "What kind of text is this?",
        options: [
          "A story about a runner",
          "An advert for a camera shop",
          "A newsletter with school news",
          "A letter from a parent",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Tiêu đề 'Riverside School News' và nhiều mục tin ngắn → bản tin trường học.",
          en: "The title 'Riverside School News' and the short sections show it is a school newsletter.",
        },
      },
      {
        id: "l2-read-09-ex03",
        type: 'true-false',
        passageId: "l2-read-09-p1",
        statement: "The weather on Sports Day was the same as the forecast.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Dự báo nói trời nắng nhưng thực tế trời mưa → không giống dự báo.",
          en: "The forecast said sunny, but it rained – so it was different.",
        },
      },
      {
        id: "l2-read-09-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "How many points did Red Team get?",
        options: ["245", "100", "12.8", "230"],
        correctIndex: 3,
        explanation: {
          vi: "'Red Team came second with 230' — 245 là điểm của đội Xanh.",
          en: "'Red Team came second with 230' – 245 is Blue Team's score.",
        },
      },
      {
        id: "l2-read-09-ex05",
        type: 'fill-blank',
        passageId: "l2-read-09-p1",
        sentence: "Nam Tran is in Class ___.",
        acceptedAnswers: ["9B"],
        hint: "ONE WORD / A NUMBER from the text",
        explanation: {
          vi: "'Nam Tran from Class 9B'.",
          en: "'Nam Tran from Class 9B'.",
        },
      },
      {
        id: "l2-read-09-ex06",
        type: 'true-false',
        passageId: "l2-read-09-p1",
        statement: "Nam Tran broke the school record for the 100 metres.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'a new school record' = kỷ lục mới của trường → Nam đã phá kỷ lục cũ.",
          en: "'a new school record' means he broke the old record.",
        },
      },
      {
        id: "l2-read-09-ex07",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "Where will the photography club meet?",
        options: ["In Room 14", "In the library", "In the art room", "At the Science Museum"],
        correctIndex: 0,
        explanation: {
          vi: "'every Wednesday after school, from 3:30 to 5 pm, in Room 14'.",
          en: "'every Wednesday after school, from 3:30 to 5 pm, in Room 14'.",
        },
      },
      {
        id: "l2-read-09-ex08",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "How many places are still free in the photography club?",
        options: ["20", "12", "5", "8"],
        correctIndex: 3,
        explanation: {
          vi: "Có 20 chỗ, 12 bạn đã tham gia → còn 20 – 12 = 8 chỗ.",
          en: "20 places – 12 students = 8 places left.",
        },
      },
      {
        id: "l2-read-09-ex09",
        type: 'true-false',
        passageId: "l2-read-09-p1",
        statement: "Students need to buy a good camera to join the club.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'You don't need an expensive camera – a phone is fine.' → không cần mua máy ảnh.",
          en: "'You don't need an expensive camera – a phone is fine.'",
        },
      },
      {
        id: "l2-read-09-ex10",
        type: 'match-pairs',
        passageId: "l2-read-09-p1",
        instruction: {
          vi: "Nối mỗi con số với thông tin đúng trong bản tin.",
          en: "Match each number with the right information in the newsletter.",
        },
        pairs: [
          { left: "245", right: "Blue Team's points" },
          { left: "12.8", right: "Nam's time in seconds" },
          { left: "300", right: "new library books" },
          { left: "5", right: "books you can borrow now" },
          { left: "£12", right: "cost of the museum trip" },
        ],
        explanation: {
          vi: "Luôn đọc từ đi kèm với con số để không nhầm lẫn.",
          en: "Always read the words next to a number so you don't mix them up.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-09-test01",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "What is the main idea of the 'Sports Day' section?",
        options: [
          "Sports Day was cancelled because of rain.",
          "Students enjoyed Sports Day even though it rained.",
          "Blue Team needs more runners.",
          "How to check the weather forecast.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Tiêu đề nhỏ 'a wet but wonderful day' (một ngày ướt át nhưng tuyệt vời) và 'Nobody wanted to stop' → vẫn vui dù mưa.",
          en: "The heading 'a wet but wonderful day' and 'Nobody wanted to stop' show it was good even with the rain.",
        },
      },
      {
        id: "l2-read-09-test02",
        type: 'fill-blank',
        passageId: "l2-read-09-p1",
        sentence: "Mr Peters teaches ___ at Riverside School.",
        acceptedAnswers: ["art"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'Mr Peters, our art teacher' → thầy dạy mỹ thuật.",
          en: "'Mr Peters, our art teacher'.",
        },
      },
      {
        id: "l2-read-09-test03",
        type: 'true-false',
        passageId: "l2-read-09-p1",
        statement: "Before this year, students could borrow only three books at a time.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'borrow five books at a time instead of three' → trước đây chỉ được mượn 3 cuốn.",
          en: "'five books at a time instead of three' – before, the limit was three.",
        },
      },
      {
        id: "l2-read-09-test04",
        type: 'true-false',
        passageId: "l2-read-09-p1",
        statement: "Most students prefer comics to other books.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài chỉ nói thư viện có truyện tranh mới, không nói học sinh thích loại nào hơn.",
          en: "The text says there are new comics but not what students prefer.",
        },
      },
      {
        id: "l2-read-09-test05",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "When must students give the permission letter to their teacher?",
        options: [
          "On 14th November",
          "Next Wednesday",
          "Before 1st November",
          "Last Friday",
        ],
        correctIndex: 2,
        explanation: {
          vi: "'give the permission letter ... before 1st November'. 14/11 là ngày đi tham quan — đừng nhầm!",
          en: "'before 1st November'. 14th November is the day of the trip – don't mix them up!",
        },
      },
      {
        id: "l2-read-09-test06",
        type: 'multiple-choice',
        passageId: "l2-read-09-p1",
        question: "Who must sign the permission letter?",
        options: ["A parent", "The class teacher", "Mr Peters", "The student"],
        correctIndex: 0,
        explanation: {
          vi: "'the permission letter, signed by a parent' → phụ huynh ký.",
          en: "'the permission letter, signed by a parent'.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Ôn tập tổng hợp — truyện ngắn "Chiếc ô đỏ"
  // ==========================================================================
  {
    id: "l2-read-10",
    skill: 'reading',
    title: { vi: "Truyện ngắn: ôn tập tổng hợp", en: "A short story: review of all skills" },
    description: {
      vi: "Đọc một câu chuyện ngắn và dùng tất cả kỹ năng đã học: ý chính, tìm thông tin, T/F/NG, điền từ, từ quy chiếu, đoán nghĩa từ.",
      en: "Read a short story and use every skill you have learnt: main idea, scanning, T/F/NG, completion, reference words and guessing meaning.",
    },
    teachingCards: [
      {
        title: { vi: "Cách đọc một câu chuyện", en: "How to read a story" },
        body: {
          vi: "Hầu hết câu chuyện đều theo cấu trúc:\n**Mở đầu** – Ai? Ở đâu? Khi nào?\n**Vấn đề** – Chuyện gì xảy ra không như mong muốn?\n**Giải quyết** – Vấn đề được giải quyết thế nào?\n**Kết thúc** – Nhân vật cảm thấy thế nào?\nTruyện thường dùng **thì quá khứ đơn** (went, took, said) — hãy nhận ra động từ bất quy tắc.",
          en: "Most stories follow this pattern:\n**Beginning** – Who? Where? When?\n**Problem** – What goes wrong?\n**Solution** – How is the problem solved?\n**Ending** – How do the characters feel?\nStories usually use the **past simple** (went, took, said) – learn to spot irregular verbs.",
        },
        examples: [
          { en: "Mai took her umbrella and ran to catch the bus.", vi: "took = quá khứ của take; ran = quá khứ của run" },
        ],
      },
      {
        title: { vi: "Tổng kết kỹ năng Level 2", en: "Level 2 skills checklist" },
        body: {
          vi: "1. **Skimming** – đọc tiêu đề, câu đầu mỗi đoạn để nắm ý chính.\n2. **Scanning** – tìm nhanh tên, số, ngày.\n3. **T/F/NG** – chú ý only, all, always; 'không nhắc đến' = NOT GIVEN.\n4. **Điền từ** – đúng số từ, chép đúng chính tả.\n5. **Paraphrase** – tìm cùng Ý, không phải cùng TỪ.\n6. **Từ quy chiếu** – nhìn ngược lại câu trước.\n7. **Từ mới** – dùng manh mối xung quanh.",
          en: "1. **Skimming** – read the title and first sentences for the main idea.\n2. **Scanning** – find names, numbers and dates fast.\n3. **T/F/NG** – watch only, all, always; 'not mentioned' = NOT GIVEN.\n4. **Completion** – the right number of words, correct spelling.\n5. **Paraphrase** – look for the same IDEA, not the same WORD.\n6. **Reference words** – look back at the sentence before.\n7. **New words** – use the clues around them.",
        },
      },
    ],
    readingPassages: [
      {
        id: "l2-read-10-p1",
        title: "The Red Umbrella",
        text: "It was a grey Monday morning, and the sky was full of dark clouds. Mai checked the weather app on her phone: heavy rain in the afternoon. She took her grandmother's old red umbrella and ran to catch the bus.\n\nThe bus was crowded, so Mai had to stand near the door. When she got off at her stop, she suddenly realised that her hands were empty. The umbrella was still on the bus! Mai felt terrible. It was not expensive, but it was special because her grandmother used it for more than thirty years.\n\nAfter school, Mai went to the bus station and asked about lost property. A tired man behind the desk shook his head. \"No red umbrellas today, I'm afraid,\" he said.\n\nThe next morning, Mai caught the same bus. When she got on, the driver smiled and held up something red. \"Is this yours?\" he asked. \"I found it under a seat and kept it for you. I thought the owner would take this bus again.\"\n\nMai thanked him again and again. That evening, she told her grandmother the whole story. Her grandmother laughed. \"That umbrella has had lots of adventures,\" she said. \"Now it has one more.\"",
      },
    ],
    exercises: [
      {
        id: "l2-read-10-ex01",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "What is the story mainly about?",
        options: [
          "A girl who loses a special umbrella and gets it back",
          "A bus driver's busy day",
          "A rainy day at school",
          "How to use a weather app",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Vấn đề: Mai làm mất chiếc ô của bà. Giải quyết: tài xế giữ lại và trả cho cô.",
          en: "Problem: Mai loses her grandmother's umbrella. Solution: the driver keeps it and gives it back.",
        },
      },
      {
        id: "l2-read-10-ex02",
        type: 'true-false',
        passageId: "l2-read-10-p1",
        statement: "The weather app said it was going to rain in the morning.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Ứng dụng báo 'heavy rain in the afternoon' (mưa to buổi chiều), không phải buổi sáng.",
          en: "The app said 'heavy rain in the afternoon', not in the morning.",
        },
      },
      {
        id: "l2-read-10-ex03",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "'The bus was CROWDED, so Mai had to stand.' What does 'crowded' mean?",
        options: [
          "Empty and quiet",
          "Very slow",
          "Full of people",
          "Very old",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Manh mối: Mai phải đứng → không còn ghế → xe đông người. crowded = đông đúc.",
          en: "Clue: Mai had to stand, so there were no free seats – the bus was full of people.",
        },
      },
      {
        id: "l2-read-10-ex04",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "Paragraph 2: 'IT was not expensive, but it was special.' What does 'it' refer to?",
        options: ["The bus", "The umbrella", "The phone", "The bus stop"],
        correctIndex: 1,
        explanation: {
          vi: "Câu trước nói 'The umbrella was still on the bus!' → 'it' = chiếc ô.",
          en: "The sentence before is about the umbrella, so 'it' = the umbrella.",
        },
      },
      {
        id: "l2-read-10-ex05",
        type: 'fill-blank',
        passageId: "l2-read-10-p1",
        sentence: "Mai's grandmother used the umbrella for more than ___ years.",
        acceptedAnswers: ["thirty", "30"],
        hint: "ONE WORD / A NUMBER from the text",
        explanation: {
          vi: "'her grandmother used it for more than thirty years'.",
          en: "'her grandmother used it for more than thirty years'.",
        },
      },
      {
        id: "l2-read-10-ex06",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "Why was the umbrella special to Mai?",
        options: [
          "It was very expensive.",
          "It was a birthday present.",
          "It was new.",
          "It belonged to her grandmother for a long time.",
        ],
        correctIndex: 3,
        explanation: {
          vi: "Chiếc ô 'not expensive' nhưng đặc biệt vì bà đã dùng hơn 30 năm.",
          en: "It was 'not expensive', but special because her grandmother used it for over 30 years.",
        },
      },
      {
        id: "l2-read-10-ex07",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "Mai 'asked about LOST PROPERTY' at the bus station. What is 'lost property'?",
        options: [
          "Things that people leave or lose, which are kept for them",
          "Tickets for the next bus",
          "A map of the bus routes",
          "A shop that sells umbrellas",
        ],
        correctIndex: 0,
        explanation: {
          vi: "lost (bị mất) + property (đồ đạc) = đồ thất lạc. Mai đến hỏi xem có ai nhặt được ô không.",
          en: "lost + property (things you own) = things people have lost. Mai wanted to know if someone found her umbrella.",
        },
      },
      {
        id: "l2-read-10-ex08",
        type: 'true-false',
        passageId: "l2-read-10-p1",
        statement: "The man at the bus station had Mai's umbrella.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Ông lắc đầu: 'No red umbrellas today' → không có ô đỏ nào.",
          en: "He shook his head: 'No red umbrellas today'.",
        },
      },
      {
        id: "l2-read-10-ex09",
        type: 'true-false',
        passageId: "l2-read-10-p1",
        statement: "Mai gave the bus driver some money to say thank you.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài chỉ nói Mai cảm ơn nhiều lần, không nói có đưa tiền hay không.",
          en: "The story says she thanked him many times but nothing about money.",
        },
      },
      {
        id: "l2-read-10-ex10",
        type: 'match-pairs',
        passageId: "l2-read-10-p1",
        instruction: {
          vi: "Nối mỗi phần của câu chuyện với nội dung tương ứng.",
          en: "Match each part of the story with what happens.",
        },
        pairs: [
          { left: "Beginning", right: "Mai takes the umbrella and catches the bus." },
          { left: "Problem", right: "Mai leaves the umbrella on the bus." },
          { left: "Solution", right: "The driver gives the umbrella back." },
          { left: "Ending", right: "Mai tells her grandmother the story." },
        ],
        explanation: {
          vi: "Nhận ra cấu trúc mở đầu – vấn đề – giải quyết – kết thúc giúp hiểu nhanh ý chính của truyện.",
          en: "Knowing the beginning – problem – solution – ending pattern helps you understand a story quickly.",
        },
      },
    ],
    miniTest: [
      {
        id: "l2-read-10-test01",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "How did Mai feel when she realised the umbrella was on the bus?",
        options: ["Very happy", "Bored", "Very bad", "Tired but excited"],
        correctIndex: 2,
        explanation: {
          vi: "'Mai felt terrible' — terrible = rất tệ = very bad (paraphrase).",
          en: "'Mai felt terrible' – terrible = very bad (paraphrase).",
        },
      },
      {
        id: "l2-read-10-test02",
        type: 'fill-blank',
        passageId: "l2-read-10-p1",
        sentence: "The driver found the umbrella under a ___.",
        acceptedAnswers: ["seat"],
        hint: "ONE WORD from the text",
        explanation: {
          vi: "'I found it under a seat' — tìm thấy dưới ghế.",
          en: "'I found it under a seat'.",
        },
      },
      {
        id: "l2-read-10-test03",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "'I thought the OWNER would take this bus again.' Who is 'the owner'?",
        options: ["The driver", "The man at the station", "Mai's grandmother's friend", "Mai"],
        correctIndex: 3,
        explanation: {
          vi: "owner = chủ sở hữu, người có cái ô → ở đây tài xế nói về Mai (người để quên ô).",
          en: "The owner is the person the umbrella belongs to – here, the driver means Mai, who left it.",
        },
      },
      {
        id: "l2-read-10-test04",
        type: 'true-false',
        passageId: "l2-read-10-p1",
        statement: "Mai took a different bus the next morning.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'Mai caught the same bus' → cùng chuyến xe, không phải xe khác.",
          en: "'Mai caught the same bus' – not a different one.",
        },
      },
      {
        id: "l2-read-10-test05",
        type: 'true-false',
        passageId: "l2-read-10-p1",
        statement: "Mai's grandmother was angry when she heard the story.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'Her grandmother laughed' → bà cười, không giận.",
          en: "'Her grandmother laughed' – she was not angry.",
        },
      },
      {
        id: "l2-read-10-test06",
        type: 'multiple-choice',
        passageId: "l2-read-10-p1",
        question: "Last paragraph: 'Now IT has one more.' One more what?",
        options: ["Umbrella", "Adventure", "Bus", "Year"],
        correctIndex: 1,
        explanation: {
          vi: "Câu trước: 'That umbrella has had lots of adventures' → giờ chiếc ô có thêm một chuyến phiêu lưu nữa.",
          en: "The sentence before: 'lots of adventures' – now the umbrella has one more adventure.",
        },
      },
    ],
  },
]
