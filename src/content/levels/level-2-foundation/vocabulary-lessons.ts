/**
 * vocabulary-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — FOUNDATION (band 2.0 – 3.0, CEFR A1+/A2) — NHÁNH TỪ VỰNG
 *
 * File này chứa 10 bài từ vựng theo 10 chủ đề đời sống quen thuộc:
 *   1. l2-vocab-01: Đồ ăn & nấu nướng
 *   2. l2-vocab-02: Mua sắm & tiền bạc
 *   3. l2-vocab-03: Giao thông & đi lại
 *   4. l2-vocab-04: Thời tiết & các mùa
 *   5. l2-vocab-05: Sức khỏe & cơ thể
 *   6. l2-vocab-06: Sở thích & thời gian rảnh
 *   7. l2-vocab-07: Nhà cửa & đồ nội thất
 *   8. l2-vocab-08: Nghề nghiệp & nơi làm việc
 *   9. l2-vocab-09: Trường học & học tập
 *  10. l2-vocab-10: Kỳ nghỉ & lễ hội
 *
 * Điểm mới so với Level 1: ngoài từ đơn lẻ, mỗi bài dạy thêm
 *   - COLLOCATION (cụm từ hay đi cùng nhau), VD "do the shopping", "catch a bus"
 *   - WORD FAMILY (họ từ), VD health → healthy, celebrate → celebration
 * Câu ví dụ lồng ghép ngữ pháp Level 2: quá khứ đơn, so sánh hơn/nhất,
 * be going to, should/must, some/any/much/many, giới từ chỉ nơi chốn/thời gian...
 *
 * Mỗi bài gồm: 2-3 teachingCards, 8 words, 10 exercises, miniTest 6 câu.
 * KHÔNG dùng 'speak-answer' / 'write-answer' (cần AI chấm, tốn chi phí).
 * Kiểu dữ liệu nằm ở src/content/content-types.ts.
 * ----------------------------------------------------------------------------
 */

import type { Lesson } from '../../content-types'

export const level2VocabularyLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — ĐỒ ĂN & NẤU NƯỚNG
   * Các động từ nấu ăn (boil, fry, bake), cụm "have a meal", "cook dinner"
   * và bẫy thường gặp: cook (đầu bếp) ≠ cooker (cái bếp).
   * ======================================================================== */
  {
    id: 'l2-vocab-01',
    skill: 'vocabulary',
    title: { vi: 'Đồ ăn & nấu nướng', en: 'Food & cooking' },
    description: {
      vi: 'Học các từ về bữa ăn, cách nấu và cụm từ như "cook dinner", "have a meal".',
      en: 'Learn words for meals and cooking, plus phrases like "cook dinner" and "have a meal".',
    },
    teachingCards: [
      {
        title: { vi: 'Các cách nấu ăn', en: 'Ways of cooking' },
        body: {
          vi: '**boil** = luộc, đun sôi (trong nước nóng)\n**fry** = chiên, rán (trong dầu)\n**bake** = nướng bằng lò (bánh mì, bánh ngọt)\n**grill** = nướng trên vỉ\nQuá khứ: boil → **boiled**, fry → **fried**, bake → **baked** (đều là động từ có quy tắc).',
          en: '**boil** = cook in very hot water\n**fry** = cook in hot oil\n**bake** = cook in an oven (bread, cakes)\n**grill** = cook over or under strong heat\nPast simple: **boiled**, **fried**, **baked** (all regular verbs).',
        },
        examples: [
          { en: 'My mum boiled some eggs for breakfast.', vi: 'Mẹ tôi luộc vài quả trứng cho bữa sáng.' },
          { en: 'We fried the fish in a big pan.', vi: 'Chúng tôi chiên cá trong một cái chảo lớn.' },
          { en: 'She is baking a cake for my birthday.', vi: 'Cô ấy đang nướng bánh cho sinh nhật tôi.' },
        ],
      },
      {
        title: { vi: 'Cụm từ về bữa ăn (collocation)', en: 'Meal collocations' },
        body: {
          vi: 'Người Anh nói **have** + bữa ăn: **have breakfast / have lunch / have dinner / have a meal** (KHÔNG nói "eat breakfast" sai, nhưng "have" tự nhiên hơn).\n**cook dinner / make breakfast** = nấu bữa tối / làm bữa sáng\n**eat out** = ăn ở ngoài (nhà hàng)\nKhông dùng "a/the" trước breakfast, lunch, dinner: "I have lunch at 12."',
          en: 'We usually say **have breakfast / lunch / dinner / a meal**.\n**cook dinner**, **make breakfast**\n**eat out** = eat at a restaurant\nNo "a/the" before breakfast, lunch and dinner: "I have lunch at 12."',
        },
        examples: [
          { en: 'We usually have dinner at seven.', vi: 'Chúng tôi thường ăn tối lúc bảy giờ.' },
          { en: 'My dad cooks dinner on Sundays.', vi: 'Bố tôi nấu bữa tối vào các ngày Chủ nhật.' },
          { en: 'Shall we eat out tonight?', vi: 'Tối nay mình đi ăn ngoài nhé?' },
        ],
      },
      {
        title: { vi: 'Họ từ: cook – cooker – cooking', en: 'Word family: cook' },
        body: {
          vi: '**cook** (động từ) = nấu ăn\n**cook** (danh từ) = đầu bếp, người nấu ăn\n**cooker** (danh từ) = cái bếp (đồ vật!) — bẫy rất hay gặp\n**cooking** (danh từ) = việc nấu nướng, món ăn ai đó nấu\n"My mum is a good **cook**." = Mẹ tôi nấu ăn giỏi.',
          en: '**cook** (verb) = make food\n**cook** (noun) = a person who cooks\n**cooker** (noun) = a machine for cooking — not a person!\n**cooking** (noun) = the activity of making food',
        },
        examples: [
          { en: 'My grandmother is a very good cook.', vi: 'Bà tôi là người nấu ăn rất giỏi.' },
          { en: 'I love my mum’s cooking.', vi: 'Tôi rất thích món mẹ tôi nấu.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-meal',
        word: 'meal',
        ipa: '/miːl/',
        partOfSpeech: 'noun',
        meaningVi: 'bữa ăn',
        definitionEn: 'Breakfast, lunch or dinner; the food you eat at one time.',
        examples: [
          { en: 'Dinner is the biggest meal of the day in my family.', vi: 'Bữa tối là bữa lớn nhất trong ngày ở nhà tôi.' },
          { en: 'We had a lovely meal at a Korean restaurant.', vi: 'Chúng tôi đã có một bữa ăn tuyệt vời ở nhà hàng Hàn Quốc.' },
        ],
        usageNote: {
          vi: 'Collocation: **have a meal**, **cook a meal**. "a three-course meal" = bữa ăn ba món.',
          en: 'Collocations: **have a meal**, **cook a meal**.',
        },
      },
      {
        id: 'l2-w-cook',
        word: 'cook',
        ipa: '/kʊk/',
        partOfSpeech: 'verb, noun',
        meaningVi: 'nấu ăn; đầu bếp',
        definitionEn: 'To make food hot and ready to eat; also a person who cooks.',
        examples: [
          { en: 'Can you cook rice?', vi: 'Bạn có biết nấu cơm không?' },
          { en: 'My brother is a better cook than me.', vi: 'Anh trai tôi nấu ăn giỏi hơn tôi.' },
        ],
        usageNote: {
          vi: 'Người nấu ăn là **cook**, KHÔNG phải "cooker" (cooker = cái bếp).',
          en: 'A person is a **cook**; a **cooker** is a machine.',
        },
      },
      {
        id: 'l2-w-boil',
        word: 'boil',
        ipa: '/bɔɪl/',
        partOfSpeech: 'verb',
        meaningVi: 'luộc; đun sôi',
        definitionEn: 'To cook food in very hot water, or to make water very hot.',
        examples: [
          { en: 'Boil the water before you make tea.', vi: 'Hãy đun sôi nước trước khi pha trà.' },
          { en: 'I boiled some vegetables for lunch.', vi: 'Tôi đã luộc một ít rau cho bữa trưa.' },
        ],
      },
      {
        id: 'l2-w-fry',
        word: 'fry',
        ipa: '/fraɪ/',
        partOfSpeech: 'verb',
        meaningVi: 'chiên, rán',
        definitionEn: 'To cook food in hot oil.',
        examples: [
          { en: 'She fried two eggs for breakfast.', vi: 'Cô ấy đã rán hai quả trứng cho bữa sáng.' },
          { en: 'Fried chicken is delicious but not very healthy.', vi: 'Gà rán ngon nhưng không tốt cho sức khỏe lắm.' },
        ],
        usageNote: {
          vi: 'Quá khứ: fry → **fried** (đổi y thành i rồi thêm -ed). "fried rice" = cơm chiên.',
          en: 'Past simple: **fried**. "fried rice", "fried chicken".',
        },
      },
      {
        id: 'l2-w-bake',
        word: 'bake',
        ipa: '/beɪk/',
        partOfSpeech: 'verb',
        meaningVi: 'nướng (bằng lò)',
        definitionEn: 'To cook food such as bread or cakes in an oven.',
        examples: [
          { en: 'We baked a chocolate cake yesterday.', vi: 'Hôm qua chúng tôi đã nướng một chiếc bánh sô-cô-la.' },
          { en: 'This bakery bakes fresh bread every morning.', vi: 'Tiệm bánh này nướng bánh mì mới mỗi sáng.' },
        ],
      },
      {
        id: 'l2-w-recipe',
        word: 'recipe',
        ipa: '/ˈres.ɪ.pi/',
        partOfSpeech: 'noun',
        meaningVi: 'công thức nấu ăn',
        definitionEn: 'A list of food you need and instructions for cooking a dish.',
        examples: [
          { en: 'This is my grandmother’s recipe for spring rolls.', vi: 'Đây là công thức làm nem của bà tôi.' },
          { en: 'I found a good recipe on the internet.', vi: 'Tôi tìm được một công thức hay trên mạng.' },
        ],
        usageNote: {
          vi: 'Phát âm 3 âm tiết: /ˈres.ɪ.pi/ ("ré-xi-pi"), không đọc "ri-xíp".',
          en: 'It has three syllables: RE-ci-pe.',
        },
      },
      {
        id: 'l2-w-delicious',
        word: 'delicious',
        ipa: '/dɪˈlɪʃ.əs/',
        partOfSpeech: 'adjective',
        meaningVi: 'ngon',
        definitionEn: 'Having a very good taste.',
        examples: [
          { en: 'The pho in this café is delicious!', vi: 'Phở ở quán này ngon quá!' },
          { en: 'Thank you, the meal was delicious.', vi: 'Cảm ơn bạn, bữa ăn rất ngon.' },
        ],
        usageNote: {
          vi: '"delicious" đã có nghĩa "rất ngon", nên KHÔNG nói "very delicious". Có thể nói "really delicious" hoặc "absolutely delicious".',
          en: 'Don’t say "very delicious". Say "really delicious" or just "delicious".',
        },
      },
      {
        id: 'l2-w-vegetable',
        word: 'vegetable',
        ipa: '/ˈvedʒ.tə.bəl/',
        partOfSpeech: 'noun',
        meaningVi: 'rau củ',
        definitionEn: 'A plant or part of a plant that you eat, e.g. carrots or cabbage.',
        examples: [
          { en: 'You should eat more vegetables.', vi: 'Bạn nên ăn nhiều rau hơn.' },
          { en: 'There are some vegetables in the fridge.', vi: 'Có một ít rau trong tủ lạnh.' },
        ],
        usageNote: {
          vi: 'Phát âm 3 âm tiết: /ˈvedʒ.tə.bəl/ — chữ "e" thứ hai câm. Là danh từ đếm được: many vegetables.',
          en: 'Say VEDGE-ta-ble (3 syllables). It is countable: many vegetables.',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-01-ex01',
        type: 'multiple-choice',
        question: 'You cook food in hot oil. You ___ it.',
        options: ['fry', 'boil', 'bake', 'wash'],
        correctIndex: 0,
        explanation: {
          vi: '"fry" = chiên/rán trong dầu. "boil" = luộc trong nước, "bake" = nướng lò.',
          en: '"Fry" means cook in hot oil.',
        },
      },
      {
        id: 'l2-vocab-01-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa tiếng Việt', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'meal', right: 'bữa ăn' },
          { left: 'recipe', right: 'công thức nấu ăn' },
          { left: 'boil', right: 'luộc' },
          { left: 'bake', right: 'nướng bằng lò' },
          { left: 'vegetable', right: 'rau củ' },
        ],
      },
      {
        id: 'l2-vocab-01-ex03',
        type: 'fill-blank',
        sentence: 'We usually ___ dinner at seven o’clock.',
        acceptedAnswers: ['have', 'eat'],
        hint: '(ăn)',
        explanation: {
          vi: 'Collocation tự nhiên: "have dinner" = ăn tối. "eat dinner" cũng chấp nhận được.',
          en: '"Have dinner" is the most natural phrase.',
        },
      },
      {
        id: 'l2-vocab-01-ex04',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi là người nấu ăn rất giỏi.',
        correctSentence: 'My mother is a very good cook.',
        extraWords: ['cooker', 'well'],
        explanation: {
          vi: 'Người nấu ăn = "cook". "cooker" là cái bếp, không phải người.',
          en: 'A person who cooks is a "cook", not a "cooker".',
        },
      },
      {
        id: 'l2-vocab-01-ex05',
        type: 'listen-choose',
        audioText: 'I boiled the eggs for ten minutes.',
        question: 'How did the speaker cook the eggs?',
        options: ['In an oven', 'In oil', 'In hot water', 'On a grill'],
        correctIndex: 2,
        explanation: {
          vi: '"boiled" = luộc, tức là nấu trong nước nóng.',
          en: '"Boil" means cook in very hot water.',
        },
      },
      {
        id: 'l2-vocab-01-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'This soup is very delicious.',
          'My dad is a good cooker.',
          'We bake bread in a pan of water.',
          'This soup is really delicious.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Không nói "very delicious" (delicious đã là rất ngon). "cooker" là cái bếp. Bánh mì nướng trong lò, không phải trong nước.',
          en: 'Say "really delicious", not "very delicious".',
        },
      },
      {
        id: 'l2-vocab-01-ex07',
        type: 'listen-type',
        audioText: 'This recipe is very easy.',
        acceptedAnswers: ['This recipe is very easy.', "This recipe's very easy."],
        explanation: {
          vi: '"recipe" /ˈres.ɪ.pi/ = công thức nấu ăn.',
          en: '"Recipe" has three syllables: RE-ci-pe.',
        },
      },
      {
        id: 'l2-vocab-01-ex08',
        type: 'fill-blank',
        sentence: 'Yesterday my sister ___ a cake for my birthday.',
        acceptedAnswers: ['baked', 'made'],
        hint: '(bake — quá khứ)',
        explanation: {
          vi: 'Có "yesterday" → dùng quá khứ đơn: bake → baked.',
          en: '"Yesterday" needs the past simple: baked.',
        },
      },
      {
        id: 'l2-vocab-01-ex09',
        type: 'speak-sentence',
        sentence: 'You should eat more vegetables.',
        translationVi: 'Bạn nên ăn nhiều rau hơn.',
        explanation: {
          vi: 'Chú ý đọc "vegetables" 3 âm tiết: VEDGE-ta-bles.',
          en: 'Say "vegetables" with three syllables.',
        },
      },
      {
        id: 'l2-vocab-01-ex10',
        type: 'multiple-choice',
        question: 'Which one do we usually BAKE?',
        options: ['soup', 'rice', 'bread', 'eggs'],
        correctIndex: 2,
        explanation: {
          vi: 'Bánh mì (bread) thường được nướng trong lò. Soup, rice và eggs thường nấu/luộc.',
          en: 'We bake bread in an oven.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-01-test01',
        type: 'multiple-choice',
        question: '"Công thức nấu ăn" in English is...',
        options: ['receipt', 'menu', 'recipe', 'meal'],
        correctIndex: 2,
        explanation: {
          vi: '"recipe" = công thức nấu ăn. "receipt" = hóa đơn, "menu" = thực đơn.',
          en: 'A recipe tells you how to cook a dish.',
        },
      },
      {
        id: 'l2-vocab-01-test02',
        type: 'fill-blank',
        sentence: 'Fried chicken is tasty, but ___ vegetables are healthier.',
        acceptedAnswers: ['boiled', 'fresh', 'steamed'],
        hint: '(luộc)',
        explanation: {
          vi: '"boiled vegetables" = rau luộc. Tính từ dạng -ed đứng trước danh từ.',
          en: '"Boiled vegetables" are cooked in water, with no oil.',
        },
      },
      {
        id: 'l2-vocab-01-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối nửa đầu với nửa sau thành cụm từ', en: 'Match to make phrases' },
        pairs: [
          { left: 'have', right: 'lunch' },
          { left: 'eat', right: 'out' },
          { left: 'fried', right: 'rice' },
          { left: 'a good', right: 'cook' },
        ],
      },
      {
        id: 'l2-vocab-01-test04',
        type: 'arrange-words',
        translationVi: 'Chúng tôi đã có một bữa ăn ngon ở nhà hàng.',
        correctSentence: 'We had a delicious meal at the restaurant.',
        extraWords: ['very', 'did'],
        explanation: {
          vi: '"have a meal" → quá khứ "had a meal". Không cần "very" trước "delicious".',
          en: 'Past simple of "have a meal" is "had a meal".',
        },
      },
      {
        id: 'l2-vocab-01-test05',
        type: 'listen-choose',
        audioText: 'My dad is the best cook in our family. He cooks dinner every evening.',
        question: 'Who cooks dinner?',
        options: ['The speaker', 'The speaker’s mum', 'A chef in a restaurant', 'The speaker’s dad'],
        correctIndex: 3,
        explanation: {
          vi: '"My dad ... cooks dinner every evening" = bố nấu bữa tối mỗi tối.',
          en: 'The dad cooks dinner every evening.',
        },
      },
      {
        id: 'l2-vocab-01-test06',
        type: 'multiple-choice',
        question: 'A "cooker" is...',
        options: ['a machine for cooking food', 'a person who cooks', 'a kind of vegetable', 'a cooking lesson'],
        correctIndex: 0,
        explanation: {
          vi: '"cooker" = cái bếp (đồ vật). Người nấu ăn là "cook".',
          en: 'A cooker is a machine; a person is a cook.',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 2 — MUA SẮM & TIỀN BẠC
   * Giá cả, đắt/rẻ, trả tiền, tiêu tiền; phân biệt "do the shopping" và
   * "go shopping"; họ từ shop / shopping / shopper.
   * ======================================================================== */
  {
    id: 'l2-vocab-02',
    skill: 'vocabulary',
    title: { vi: 'Mua sắm & tiền bạc', en: 'Shopping & money' },
    description: {
      vi: 'Học cách nói về giá cả, trả tiền và các cụm như "do the shopping", "pay by card".',
      en: 'Learn to talk about prices and paying, with phrases like "do the shopping" and "pay by card".',
    },
    teachingCards: [
      {
        title: { vi: 'do the shopping hay go shopping?', en: 'Do the shopping or go shopping?' },
        body: {
          vi: '**do the shopping** = đi chợ, mua đồ dùng cần thiết hằng ngày (thức ăn, xà phòng...)\n**go shopping** = đi mua sắm (quần áo, giày... thường để vui)\n**shop** (danh từ) = cửa hàng; **shop** (động từ) = mua sắm\n**shopping** = việc mua sắm; **shopper** = người đi mua sắm\n**shopping centre** = trung tâm thương mại',
          en: '**do the shopping** = buy food and things for the home\n**go shopping** = go to shops to buy clothes etc., often for fun\nWord family: **shop**, **shopping**, **shopper**, **shopping centre**',
        },
        examples: [
          { en: 'My mum does the shopping on Saturday mornings.', vi: 'Mẹ tôi đi chợ vào sáng thứ Bảy.' },
          { en: 'Let’s go shopping for new shoes.', vi: 'Mình đi mua giày mới đi.' },
        ],
      },
      {
        title: { vi: 'Hỏi giá & trả tiền', en: 'Prices and paying' },
        body: {
          vi: 'Hỏi giá: **How much is it?** / **How much are they?**\nTrả lời: **It’s 50,000 dong.**\n**pay in cash** = trả bằng tiền mặt\n**pay by card** = trả bằng thẻ\n**spend money on** something = tiêu tiền vào cái gì\n**cheap** (rẻ) → cheaper → the cheapest\n**expensive** (đắt) → **more** expensive → **the most** expensive',
          en: 'Ask: **How much is it? / How much are they?**\n**pay in cash**, **pay by card**\n**spend money on** something\ncheap → cheaper → the cheapest\nexpensive → more expensive → the most expensive',
        },
        examples: [
          { en: 'How much are these jeans?', vi: 'Cái quần jean này bao nhiêu tiền?' },
          { en: 'Can I pay by card?', vi: 'Tôi trả bằng thẻ được không?' },
          { en: 'He spends a lot of money on games.', vi: 'Cậu ấy tiêu rất nhiều tiền vào trò chơi.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-price',
        word: 'price',
        ipa: '/praɪs/',
        partOfSpeech: 'noun',
        meaningVi: 'giá, giá cả',
        definitionEn: 'The amount of money you need to buy something.',
        examples: [
          { en: 'The price of this phone is very high.', vi: 'Giá chiếc điện thoại này rất cao.' },
          { en: 'Prices in the market are lower than in the supermarket.', vi: 'Giá ở chợ thấp hơn ở siêu thị.' },
        ],
        usageNote: {
          vi: 'Giá thì "high/low" (cao/thấp), không nói "the price is expensive". Đồ vật mới "expensive/cheap".',
          en: 'A price is high or low; a thing is expensive or cheap.',
        },
      },
      {
        id: 'l2-w-cheap',
        word: 'cheap',
        ipa: '/tʃiːp/',
        partOfSpeech: 'adjective',
        meaningVi: 'rẻ',
        definitionEn: 'Not costing a lot of money.',
        examples: [
          { en: 'Street food in Vietnam is cheap and tasty.', vi: 'Đồ ăn đường phố ở Việt Nam rẻ và ngon.' },
          { en: 'This bag is cheaper than that one.', vi: 'Cái túi này rẻ hơn cái kia.' },
        ],
      },
      {
        id: 'l2-w-expensive',
        word: 'expensive',
        ipa: '/ɪkˈspen.sɪv/',
        partOfSpeech: 'adjective',
        meaningVi: 'đắt',
        definitionEn: 'Costing a lot of money.',
        examples: [
          { en: 'This is the most expensive watch in the shop.', vi: 'Đây là chiếc đồng hồ đắt nhất cửa hàng.' },
          { en: 'Taxis are more expensive than buses.', vi: 'Taxi đắt hơn xe buýt.' },
        ],
        usageNote: {
          vi: 'Tính từ dài: so sánh hơn dùng **more expensive**, KHÔNG nói "expensiver".',
          en: 'Long adjective: **more expensive**, not "expensiver".',
        },
      },
      {
        id: 'l2-w-spend',
        word: 'spend',
        ipa: '/spend/',
        partOfSpeech: 'verb',
        meaningVi: 'tiêu (tiền); dành (thời gian)',
        definitionEn: 'To use money to buy things; to use time doing something.',
        examples: [
          { en: 'I spent 200,000 dong on books last week.', vi: 'Tuần trước tôi đã tiêu 200.000 đồng vào sách.' },
          { en: 'She spends a lot of time online.', vi: 'Cô ấy dành nhiều thời gian lên mạng.' },
        ],
        usageNote: {
          vi: 'Động từ bất quy tắc: spend → **spent**. Cấu trúc: spend money **on** something.',
          en: 'Irregular: spend → spent. Spend money **on** something.',
        },
      },
      {
        id: 'l2-w-pay',
        word: 'pay',
        ipa: '/peɪ/',
        partOfSpeech: 'verb',
        meaningVi: 'trả tiền',
        definitionEn: 'To give money for something you buy.',
        examples: [
          { en: 'Can I pay by card, please?', vi: 'Tôi trả bằng thẻ được không ạ?' },
          { en: 'I paid for the tickets online.', vi: 'Tôi đã trả tiền vé trên mạng.' },
        ],
        usageNote: {
          vi: 'Bất quy tắc: pay → **paid**. "pay **for** something" (trả tiền cho cái gì), "pay **in** cash", "pay **by** card".',
          en: 'Irregular: paid. Pay **for** something, pay **in** cash, pay **by** card.',
        },
      },
      {
        id: 'l2-w-cash',
        word: 'cash',
        ipa: '/kæʃ/',
        partOfSpeech: 'noun',
        meaningVi: 'tiền mặt',
        definitionEn: 'Money in the form of coins and notes, not a card.',
        examples: [
          { en: 'Many small shops only take cash.', vi: 'Nhiều cửa hàng nhỏ chỉ nhận tiền mặt.' },
          { en: 'I don’t have much cash with me.', vi: 'Tôi không mang nhiều tiền mặt.' },
        ],
        usageNote: {
          vi: 'Danh từ không đếm được: "much cash", "some cash", KHÔNG nói "a cash" hay "cashes".',
          en: 'Uncountable: "much cash", not "a cash".',
        },
      },
      {
        id: 'l2-w-change',
        word: 'change',
        ipa: '/tʃeɪndʒ/',
        partOfSpeech: 'noun',
        meaningVi: 'tiền thừa, tiền thối lại; tiền lẻ',
        definitionEn: 'The money you get back when you pay more than the price.',
        examples: [
          { en: 'Here is your change.', vi: 'Đây là tiền thừa của bạn.' },
          { en: 'Sorry, I don’t have any change.', vi: 'Xin lỗi, tôi không có tiền lẻ.' },
        ],
        usageNote: {
          vi: '"change" còn là động từ "thay đổi". Khi nói về tiền, đây là danh từ không đếm được.',
          en: '"Change" is also a verb (to make different). For money, it is uncountable.',
        },
      },
      {
        id: 'l2-w-customer',
        word: 'customer',
        ipa: '/ˈkʌs.tə.mər/',
        partOfSpeech: 'noun',
        meaningVi: 'khách hàng',
        definitionEn: 'A person who buys things from a shop or business.',
        examples: [
          { en: 'The shop was full of customers.', vi: 'Cửa hàng đầy khách.' },
          { en: 'She always smiles at her customers.', vi: 'Cô ấy luôn mỉm cười với khách hàng.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-02-ex01',
        type: 'multiple-choice',
        question: 'You want to know the price. You ask:',
        options: ['How many is it?', 'What money is it?', 'How much is it?', 'How price is it?'],
        correctIndex: 2,
        explanation: {
          vi: 'Hỏi giá: "How much is it?" (tiền là danh từ không đếm được nên dùng "much").',
          en: 'We ask about prices with "How much ...?".',
        },
      },
      {
        id: 'l2-vocab-02-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'cheap', right: 'rẻ' },
          { left: 'expensive', right: 'đắt' },
          { left: 'cash', right: 'tiền mặt' },
          { left: 'customer', right: 'khách hàng' },
          { left: 'change', right: 'tiền thừa' },
        ],
      },
      {
        id: 'l2-vocab-02-ex03',
        type: 'fill-blank',
        sentence: 'My dad always does the ___ at the supermarket on Sundays.',
        acceptedAnswers: ['shopping'],
        hint: '(việc mua sắm)',
        explanation: {
          vi: '"do the shopping" = đi chợ, mua đồ dùng hằng ngày.',
          en: '"Do the shopping" means buy food and things for the home.',
        },
      },
      {
        id: 'l2-vocab-02-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi có thể trả bằng thẻ không?',
        correctSentence: 'Can I pay by card?',
        extraWords: ['on', 'cash'],
        explanation: {
          vi: '"pay by card" = trả bằng thẻ; "pay in cash" = trả tiền mặt.',
          en: 'We say "pay by card" and "pay in cash".',
        },
      },
      {
        id: 'l2-vocab-02-ex05',
        type: 'listen-choose',
        audioText: 'The red T-shirt is 150,000 dong, but the blue one is only 90,000.',
        question: 'Which T-shirt is cheaper?',
        options: ['The blue one', 'The red one', 'They are the same price', 'The white one'],
        correctIndex: 0,
        explanation: {
          vi: 'Áo xanh 90.000 đồng < áo đỏ 150.000 đồng, nên áo xanh rẻ hơn.',
          en: 'The blue one costs less, so it is cheaper.',
        },
      },
      {
        id: 'l2-vocab-02-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'He spends a lot of money for clothes.',
          'He spends a lot of money on clothes.',
          'He spends a lot of money in clothes.',
          'He spends a lot of money at clothes.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Cấu trúc: spend money **on** something.',
          en: 'We say "spend money on something".',
        },
      },
      {
        id: 'l2-vocab-02-ex07',
        type: 'listen-type',
        audioText: 'Here is your change.',
        acceptedAnswers: ['Here is your change.', "Here's your change."],
        explanation: {
          vi: '"change" ở đây = tiền thừa trả lại cho khách.',
          en: 'Shop assistants say this when they give money back.',
        },
      },
      {
        id: 'l2-vocab-02-ex08',
        type: 'fill-blank',
        sentence: 'A taxi is ___ expensive than a bus.',
        acceptedAnswers: ['more'],
        explanation: {
          vi: '"expensive" là tính từ dài → so sánh hơn: more expensive.',
          en: 'Long adjectives use "more": more expensive.',
        },
      },
      {
        id: 'l2-vocab-02-ex09',
        type: 'speak-sentence',
        sentence: 'How much are these shoes?',
        translationVi: 'Đôi giày này bao nhiêu tiền?',
        explanation: {
          vi: '"shoes" là số nhiều nên dùng "are" và "these".',
          en: 'Plural noun: "How much are these ...?"',
        },
      },
      {
        id: 'l2-vocab-02-ex10',
        type: 'true-false',
        statement: '"Cash" is an uncountable noun, so we say "I don’t have much cash."',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đúng. "cash" không đếm được → dùng "much", không dùng "many".',
          en: 'True. "Cash" is uncountable, so we use "much".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-02-test01',
        type: 'multiple-choice',
        question: 'A person who buys things in a shop is a ___.',
        options: ['seller', 'manager', 'cashier', 'customer'],
        correctIndex: 3,
        explanation: {
          vi: '"customer" = khách hàng. "seller" = người bán, "cashier" = thu ngân.',
          en: 'A customer buys things.',
        },
      },
      {
        id: 'l2-vocab-02-test02',
        type: 'fill-blank',
        sentence: 'Last weekend I ___ 300,000 dong on a new bag.',
        acceptedAnswers: ['spent', 'paid'],
        hint: '(spend — quá khứ)',
        explanation: {
          vi: 'Quá khứ bất quy tắc: spend → spent.',
          en: 'Irregular past: spend → spent.',
        },
      },
      {
        id: 'l2-vocab-02-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối để tạo cụm từ đúng', en: 'Match to make correct phrases' },
        pairs: [
          { left: 'pay by', right: 'card' },
          { left: 'pay in', right: 'cash' },
          { left: 'go', right: 'shopping' },
          { left: 'get a', right: 'discount' },
        ],
      },
      {
        id: 'l2-vocab-02-test04',
        type: 'arrange-words',
        translationVi: 'Đây là chiếc điện thoại đắt nhất trong cửa hàng.',
        correctSentence: 'This is the most expensive phone in the shop.',
        extraWords: ['more', 'expensiver'],
        explanation: {
          vi: 'So sánh nhất của tính từ dài: the most expensive.',
          en: 'Superlative of a long adjective: the most expensive.',
        },
      },
      {
        id: 'l2-vocab-02-test05',
        type: 'listen-choose',
        audioText: 'Woman: That is 85,000 dong, please. Man: Here is 100,000. Woman: Thank you. Here is your change.',
        question: 'How much change does the man get?',
        options: ['85,000 dong', '100,000 dong', '15,000 dong', '50,000 dong'],
        correctIndex: 2,
        explanation: {
          vi: '100.000 − 85.000 = 15.000 đồng tiền thừa.',
          en: '100,000 minus 85,000 is 15,000.',
        },
      },
      {
        id: 'l2-vocab-02-test06',
        type: 'multiple-choice',
        question: 'Which is the best word? "The ___ of rice went up this year."',
        options: ['price', 'cash', 'change', 'customer'],
        correctIndex: 0,
        explanation: {
          vi: '"The price of rice went up" = Giá gạo tăng lên.',
          en: 'A price can go up or go down.',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 3 — GIAO THÔNG & ĐI LẠI
   * Collocation: catch / miss / get on / get off a bus; by bus, on foot.
   * Họ từ: travel → traveller, drive → driver.
   * ======================================================================== */
  {
    id: 'l2-vocab-03',
    skill: 'vocabulary',
    title: { vi: 'Giao thông & đi lại', en: 'Transport & travel' },
    description: {
      vi: 'Học từ về phương tiện, nhà ga, sân bay và cụm như "catch a bus", "miss the train".',
      en: 'Learn words about transport and travel, with phrases like "catch a bus" and "miss the train".',
    },
    teachingCards: [
      {
        title: { vi: 'Đi bằng phương tiện gì?', en: 'How do you travel?' },
        body: {
          vi: '**by** + phương tiện (không có "a/the"): **by bus, by train, by car, by plane, by motorbike**\nNhưng đi bộ là **on foot** (KHÔNG nói "by foot").\n**get on / get off** the bus = lên / xuống xe buýt (xe buýt, tàu, máy bay)\n**get in / get out of** a car / a taxi = lên / xuống ô tô, taxi',
          en: '**by** + transport: **by bus, by train, by car**\nBut walking = **on foot**.\n**get on / get off** a bus, train or plane\n**get in / get out of** a car or taxi',
        },
        examples: [
          { en: 'I go to school by bus.', vi: 'Tôi đi học bằng xe buýt.' },
          { en: 'She goes to work on foot.', vi: 'Cô ấy đi bộ đi làm.' },
          { en: 'Get off at the next stop.', vi: 'Hãy xuống ở trạm kế tiếp.' },
        ],
      },
      {
        title: { vi: 'catch & miss', en: 'Catch and miss' },
        body: {
          vi: '**catch a bus / a train / a plane** = bắt kịp, đón (chuyến xe)\n**miss the bus / the train** = lỡ, nhỡ chuyến\nQuá khứ: catch → **caught** (bất quy tắc), miss → **missed**\n**take a taxi / take the bus** = đi taxi / đi xe buýt',
          en: '**catch** a bus/train/plane = get on it in time\n**miss** the bus/train = be too late for it\nPast: catch → **caught**, miss → **missed**\n**take** a taxi / the bus',
        },
        examples: [
          { en: 'I caught the 7 o’clock bus.', vi: 'Tôi đã bắt kịp chuyến xe buýt lúc 7 giờ.' },
          { en: 'Hurry up or we will miss the train!', vi: 'Nhanh lên kẻo chúng ta lỡ tàu!' },
        ],
      },
      {
        title: { vi: 'Họ từ: người làm gì', en: 'Word family: people' },
        body: {
          vi: 'Thêm **-er / -or** vào động từ để chỉ người:\n**drive** (lái xe) → **driver** (tài xế)\n**travel** (du lịch, đi lại) → **traveller** (khách du lịch; Anh-Anh viết 2 chữ "l")\n**visit** → **visitor** (khách tham quan)\nNgười đi trên xe nhưng không lái = **passenger** (hành khách).',
          en: 'Add **-er / -or** to make a person:\ndrive → **driver**, travel → **traveller**, visit → **visitor**\nA person on a bus who is not the driver = **passenger**.',
        },
        examples: [
          { en: 'The bus driver was very friendly.', vi: 'Bác tài xế xe buýt rất thân thiện.' },
          { en: 'There were forty passengers on the bus.', vi: 'Có bốn mươi hành khách trên xe buýt.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-catch',
        word: 'catch',
        ipa: '/kætʃ/',
        partOfSpeech: 'verb',
        meaningVi: 'bắt kịp, đón (xe, tàu); bắt (bóng)',
        definitionEn: 'To get on a bus, train or plane before it leaves.',
        examples: [
          { en: 'I catch the bus at 6:30 every morning.', vi: 'Tôi đón xe buýt lúc 6 giờ 30 mỗi sáng.' },
          { en: 'We caught the last train home.', vi: 'Chúng tôi đã kịp chuyến tàu cuối về nhà.' },
        ],
        usageNote: {
          vi: 'Bất quy tắc: catch → **caught** /kɔːt/.',
          en: 'Irregular: catch → caught.',
        },
      },
      {
        id: 'l2-w-miss',
        word: 'miss',
        ipa: '/mɪs/',
        partOfSpeech: 'verb',
        meaningVi: 'lỡ, nhỡ (chuyến xe); nhớ (ai đó)',
        definitionEn: 'To be too late for a bus, train or plane.',
        examples: [
          { en: 'I missed the bus, so I was late for school.', vi: 'Tôi bị lỡ xe buýt nên đi học muộn.' },
          { en: 'Don’t miss your flight!', vi: 'Đừng để lỡ chuyến bay nhé!' },
        ],
        usageNote: {
          vi: '"miss" còn có nghĩa "nhớ": "I miss my family." = Tôi nhớ gia đình.',
          en: '"Miss" can also mean feel sad because someone is not with you.',
        },
      },
      {
        id: 'l2-w-ticket',
        word: 'ticket',
        ipa: '/ˈtɪk.ɪt/',
        partOfSpeech: 'noun',
        meaningVi: 'vé',
        definitionEn: 'A small piece of paper or an online code that shows you have paid to travel.',
        examples: [
          { en: 'I bought a train ticket to Da Nang.', vi: 'Tôi đã mua vé tàu đi Đà Nẵng.' },
          { en: 'A return ticket is cheaper than two single tickets.', vi: 'Vé khứ hồi rẻ hơn hai vé một chiều.' },
        ],
        usageNote: {
          vi: '**single ticket** = vé một chiều, **return ticket** = vé khứ hồi (Anh-Anh).',
          en: 'British English: **single** (one way) and **return** (there and back).',
        },
      },
      {
        id: 'l2-w-station',
        word: 'station',
        ipa: '/ˈsteɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'nhà ga, bến',
        definitionEn: 'A place where trains or buses stop so people can get on and off.',
        examples: [
          { en: 'The train station is opposite the post office.', vi: 'Ga tàu ở đối diện bưu điện.' },
          { en: 'Meet me at the bus station at nine.', vi: 'Gặp tôi ở bến xe buýt lúc chín giờ nhé.' },
        ],
      },
      {
        id: 'l2-w-journey',
        word: 'journey',
        ipa: '/ˈdʒɜː.ni/',
        partOfSpeech: 'noun',
        meaningVi: 'chuyến đi, hành trình',
        definitionEn: 'Travelling from one place to another.',
        examples: [
          { en: 'The journey from Hanoi to Hue takes about 13 hours by train.', vi: 'Hành trình từ Hà Nội vào Huế mất khoảng 13 tiếng bằng tàu.' },
          { en: 'Have a good journey!', vi: 'Chúc thượng lộ bình an!' },
        ],
        usageNote: {
          vi: '"journey" là việc di chuyển (quãng đường). "trip" là cả chuyến đi (đi rồi về, gồm cả thời gian ở đó).',
          en: 'A journey is the travelling; a trip includes going, staying and coming back.',
        },
      },
      {
        id: 'l2-w-passenger',
        word: 'passenger',
        ipa: '/ˈpæs.ɪn.dʒər/',
        partOfSpeech: 'noun',
        meaningVi: 'hành khách',
        definitionEn: 'A person travelling in a car, bus, train or plane who is not the driver.',
        examples: [
          { en: 'The plane had 180 passengers.', vi: 'Máy bay chở 180 hành khách.' },
          { en: 'Passengers must wear seat belts.', vi: 'Hành khách phải thắt dây an toàn.' },
        ],
      },
      {
        id: 'l2-w-traffic',
        word: 'traffic',
        ipa: '/ˈtræf.ɪk/',
        partOfSpeech: 'noun',
        meaningVi: 'giao thông, xe cộ (trên đường)',
        definitionEn: 'The cars, motorbikes and other vehicles on a road.',
        examples: [
          { en: 'There is a lot of traffic in the city centre.', vi: 'Có rất nhiều xe cộ ở trung tâm thành phố.' },
          { en: 'We were in a traffic jam for an hour.', vi: 'Chúng tôi bị kẹt xe một tiếng đồng hồ.' },
        ],
        usageNote: {
          vi: 'Không đếm được: "a lot of traffic", "heavy traffic", KHÔNG nói "many traffics". **traffic jam** = kẹt xe, **traffic lights** = đèn giao thông.',
          en: 'Uncountable: "a lot of traffic", "heavy traffic". Also: traffic jam, traffic lights.',
        },
      },
      {
        id: 'l2-w-airport',
        word: 'airport',
        ipa: '/ˈeə.pɔːt/',
        partOfSpeech: 'noun',
        meaningVi: 'sân bay',
        definitionEn: 'A place where planes take off and land.',
        examples: [
          { en: 'We arrived at the airport two hours early.', vi: 'Chúng tôi đến sân bay sớm hai tiếng.' },
          { en: 'Tan Son Nhat is the biggest airport in Ho Chi Minh City.', vi: 'Tân Sơn Nhất là sân bay lớn nhất ở TP. Hồ Chí Minh.' },
        ],
        usageNote: {
          vi: 'Dùng **at the airport** (ở sân bay), **arrive at** the airport.',
          en: 'Say "at the airport" and "arrive at the airport".',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-03-ex01',
        type: 'multiple-choice',
        question: 'I got up late and ___ the bus.',
        options: ['caught', 'took', 'drove', 'missed'],
        correctIndex: 3,
        explanation: {
          vi: 'Dậy muộn → lỡ xe buýt: "missed the bus".',
          en: 'If you are late, you miss the bus.',
        },
      },
      {
        id: 'l2-vocab-03-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'ticket', right: 'vé' },
          { left: 'station', right: 'nhà ga' },
          { left: 'airport', right: 'sân bay' },
          { left: 'passenger', right: 'hành khách' },
          { left: 'journey', right: 'hành trình' },
        ],
      },
      {
        id: 'l2-vocab-03-ex03',
        type: 'fill-blank',
        sentence: 'My house is near my school, so I go there on ___.',
        acceptedAnswers: ['foot'],
        hint: '(đi bộ)',
        explanation: {
          vi: 'Đi bộ = "on foot" (không nói "by foot").',
          en: 'Walking is "on foot".',
        },
      },
      {
        id: 'l2-vocab-03-ex04',
        type: 'arrange-words',
        translationVi: 'Chúng tôi đã bắt chuyến tàu cuối cùng về nhà.',
        correctSentence: 'We caught the last train home.',
        extraWords: ['catched', 'at'],
        explanation: {
          vi: 'catch là động từ bất quy tắc → caught (không phải "catched").',
          en: 'Irregular verb: catch → caught.',
        },
      },
      {
        id: 'l2-vocab-03-ex05',
        type: 'listen-choose',
        audioText: 'I usually go to work by motorbike, but today I took a taxi because it was raining.',
        question: 'How did the speaker go to work today?',
        options: ['By motorbike', 'By taxi', 'On foot', 'By bus'],
        correctIndex: 1,
        explanation: {
          vi: '"usually ... by motorbike" là thói quen; "today I took a taxi" là hôm nay.',
          en: 'Today the speaker took a taxi.',
        },
      },
      {
        id: 'l2-vocab-03-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'There are many traffics in Hanoi.',
          'There is a lot of traffic in Hanoi.',
          'There is many traffic in Hanoi.',
          'There are a traffic in Hanoi.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"traffic" không đếm được → "a lot of traffic", động từ "is".',
          en: '"Traffic" is uncountable: "a lot of traffic".',
        },
      },
      {
        id: 'l2-vocab-03-ex07',
        type: 'listen-type',
        audioText: 'Get off at the next station.',
        acceptedAnswers: ['Get off at the next station.'],
        explanation: {
          vi: '"get off" = xuống (xe buýt, tàu).',
          en: '"Get off" means leave a bus or train.',
        },
      },
      {
        id: 'l2-vocab-03-ex08',
        type: 'fill-blank',
        sentence: 'My uncle drives a taxi. He is a taxi ___.',
        acceptedAnswers: ['driver'],
        hint: '(drive → ?)',
        explanation: {
          vi: 'drive + -r → driver (tài xế).',
          en: 'A person who drives is a driver.',
        },
      },
      {
        id: 'l2-vocab-03-ex09',
        type: 'speak-sentence',
        sentence: 'I go to school by bus every day.',
        translationVi: 'Tôi đi học bằng xe buýt mỗi ngày.',
        explanation: {
          vi: '"by bus" — không có "a" hay "the".',
          en: 'No article after "by": by bus.',
        },
      },
      {
        id: 'l2-vocab-03-ex10',
        type: 'true-false',
        statement: 'A passenger is the person who drives the bus.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sai. Người lái là "driver". "passenger" là hành khách.',
          en: 'False. The driver drives; passengers travel.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-03-test01',
        type: 'multiple-choice',
        question: 'Planes take off and land at the ___.',
        options: ['station', 'bus stop', 'airport', 'traffic lights'],
        correctIndex: 2,
        explanation: {
          vi: 'Máy bay cất/hạ cánh ở sân bay (airport).',
          en: 'Planes use an airport.',
        },
      },
      {
        id: 'l2-vocab-03-test02',
        type: 'fill-blank',
        sentence: 'We were late because we were in a traffic ___.',
        acceptedAnswers: ['jam'],
        hint: '(kẹt xe)',
        explanation: {
          vi: '"traffic jam" = tắc đường, kẹt xe.',
          en: 'A traffic jam is when cars cannot move.',
        },
      },
      {
        id: 'l2-vocab-03-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối để tạo cụm từ đúng', en: 'Match to make correct phrases' },
        pairs: [
          { left: 'catch', right: 'a bus' },
          { left: 'on', right: 'foot' },
          { left: 'get out of', right: 'a taxi' },
          { left: 'a return', right: 'ticket' },
        ],
      },
      {
        id: 'l2-vocab-03-test04',
        type: 'arrange-words',
        translationVi: 'Chuyến đi bằng tàu mất mười tiếng.',
        correctSentence: 'The journey by train takes ten hours.',
        extraWords: ['on', 'travels'],
        explanation: {
          vi: '"journey" = hành trình; "takes ten hours" = mất mười tiếng.',
          en: 'We use "take" for time: it takes ten hours.',
        },
      },
      {
        id: 'l2-vocab-03-test05',
        type: 'listen-choose',
        audioText: 'Man: Excuse me, where is the train station? Woman: Go straight on. It is next to the big hotel.',
        question: 'Where is the train station?',
        options: ['Next to the hotel', 'Opposite the hotel', 'Behind the airport', 'Near the bus stop'],
        correctIndex: 0,
        explanation: {
          vi: '"next to the big hotel" = bên cạnh khách sạn lớn.',
          en: 'It is next to the hotel.',
        },
      },
      {
        id: 'l2-vocab-03-test06',
        type: 'multiple-choice',
        question: 'A person who travels a lot is a ___.',
        options: ['travel', 'travelling', 'travelled', 'traveller'],
        correctIndex: 3,
        explanation: {
          vi: 'travel + -ler → traveller (khách du lịch, người đi nhiều nơi).',
          en: 'The person is a traveller.',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 4 — THỜI TIẾT & CÁC MÙA
   * Họ từ: danh từ + y = tính từ (sun → sunny, cloud → cloudy...).
   * Collocation: heavy rain, strong wind, the weather forecast.
   * ======================================================================== */
  {
    id: 'l2-vocab-04',
    skill: 'vocabulary',
    title: { vi: 'Thời tiết & các mùa', en: 'Weather & seasons' },
    description: {
      vi: 'Học cách miêu tả thời tiết, các mùa và cụm như "heavy rain", "strong wind".',
      en: 'Learn to describe the weather and seasons, with phrases like "heavy rain" and "strong wind".',
    },
    teachingCards: [
      {
        title: { vi: 'Danh từ + y = tính từ', en: 'Noun + y = adjective' },
        body: {
          vi: 'Nhiều từ thời tiết đổi danh từ thành tính từ bằng cách thêm **-y**:\n**sun → sunny** (nắng; nhân đôi chữ n)\n**cloud → cloudy** (nhiều mây)\n**rain → rainy** (mưa)\n**wind → windy** (nhiều gió)\n**fog → foggy** (có sương mù)\nHỏi: **What’s the weather like?** → **It’s sunny / It’s cloudy.**',
          en: 'Add **-y** to many weather nouns:\nsun → **sunny**, cloud → **cloudy**, rain → **rainy**, wind → **windy**, fog → **foggy**\nAsk: **What’s the weather like?** Answer: **It’s sunny.**',
        },
        examples: [
          { en: 'What’s the weather like today? — It’s windy and cloudy.', vi: 'Hôm nay thời tiết thế nào? — Trời nhiều gió và mây.' },
          { en: 'It was foggy this morning.', vi: 'Sáng nay trời có sương mù.' },
        ],
      },
      {
        title: { vi: 'Collocation thời tiết', en: 'Weather collocations' },
        body: {
          vi: 'Mưa to = **heavy rain** (KHÔNG nói "big rain")\nGió mạnh = **strong wind**\nNắng gắt = **strong sun / hot sun**\n**the weather forecast** = dự báo thời tiết\nNóng ẩm = **hot and humid**\nCác mùa: **spring, summer, autumn, winter**; miền Nam có **the rainy season** và **the dry season**. Dùng **in**: in summer, in the rainy season.',
          en: '**heavy rain** (not "big rain"), **strong wind**\n**the weather forecast**\n**hot and humid**\nSeasons: spring, summer, autumn, winter; the rainy season, the dry season. Use **in**: in summer.',
        },
        examples: [
          { en: 'There was heavy rain last night.', vi: 'Tối qua có mưa to.' },
          { en: 'In Ho Chi Minh City, the rainy season is from May to November.', vi: 'Ở TP. Hồ Chí Minh, mùa mưa kéo dài từ tháng Năm đến tháng Mười Một.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-season',
        word: 'season',
        ipa: '/ˈsiː.zən/',
        partOfSpeech: 'noun',
        meaningVi: 'mùa',
        definitionEn: 'One of the four parts of the year: spring, summer, autumn or winter.',
        examples: [
          { en: 'Autumn is the best season in Hanoi.', vi: 'Mùa thu là mùa đẹp nhất ở Hà Nội.' },
          { en: 'The south of Vietnam has two seasons.', vi: 'Miền Nam Việt Nam có hai mùa.' },
        ],
      },
      {
        id: 'l2-w-sunny',
        word: 'sunny',
        ipa: '/ˈsʌn.i/',
        partOfSpeech: 'adjective',
        meaningVi: 'có nắng, nắng',
        definitionEn: 'With a lot of light from the sun.',
        examples: [
          { en: 'It is sunny today, so let’s go to the beach.', vi: 'Hôm nay trời nắng, mình đi biển nhé.' },
          { en: 'Tomorrow will be sunnier than today.', vi: 'Ngày mai sẽ nắng hơn hôm nay.' },
        ],
        usageNote: {
          vi: 'Viết 2 chữ n: sun → su**nn**y. So sánh hơn: sunn**ier**.',
          en: 'Double "n": sunny. Comparative: sunnier.',
        },
      },
      {
        id: 'l2-w-cloudy',
        word: 'cloudy',
        ipa: '/ˈklaʊ.di/',
        partOfSpeech: 'adjective',
        meaningVi: 'nhiều mây, âm u',
        definitionEn: 'With a lot of clouds in the sky.',
        examples: [
          { en: 'It was cloudy all day yesterday.', vi: 'Hôm qua trời nhiều mây cả ngày.' },
          { en: 'When it is cloudy, I feel sleepy.', vi: 'Khi trời âm u, tôi thấy buồn ngủ.' },
        ],
      },
      {
        id: 'l2-w-windy',
        word: 'windy',
        ipa: '/ˈwɪn.di/',
        partOfSpeech: 'adjective',
        meaningVi: 'nhiều gió, có gió',
        definitionEn: 'With a lot of wind.',
        examples: [
          { en: 'It is too windy to ride a bike today.', vi: 'Hôm nay gió quá, không đạp xe được.' },
          { en: 'Da Lat is often cool and windy.', vi: 'Đà Lạt thường mát và nhiều gió.' },
        ],
      },
      {
        id: 'l2-w-storm',
        word: 'storm',
        ipa: '/stɔːm/',
        partOfSpeech: 'noun',
        meaningVi: 'cơn bão, giông bão',
        definitionEn: 'Very bad weather with strong wind and heavy rain.',
        examples: [
          { en: 'A big storm hit the coast last week.', vi: 'Tuần trước một cơn bão lớn đổ bộ vào bờ biển.' },
          { en: 'There’s going to be a storm tonight.', vi: 'Tối nay sắp có bão.' },
        ],
        usageNote: {
          vi: 'Tính từ: **stormy** (có bão). Bão nhiệt đới lớn ở châu Á gọi là **typhoon**.',
          en: 'Adjective: stormy. A big tropical storm in Asia is a typhoon.',
        },
      },
      {
        id: 'l2-w-temperature',
        word: 'temperature',
        ipa: '/ˈtem.prə.tʃər/',
        partOfSpeech: 'noun',
        meaningVi: 'nhiệt độ',
        definitionEn: 'How hot or cold something is.',
        examples: [
          { en: 'The temperature today is 35 degrees.', vi: 'Nhiệt độ hôm nay là 35 độ.' },
          { en: 'In winter, the temperature in Sa Pa can go below zero.', vi: 'Vào mùa đông, nhiệt độ ở Sa Pa có thể xuống dưới 0 độ.' },
        ],
        usageNote: {
          vi: 'Nhiệt độ thì "high/low" (cao/thấp), không nói "the temperature is hot".',
          en: 'A temperature is high or low, not hot or cold.',
        },
      },
      {
        id: 'l2-w-forecast',
        word: 'forecast',
        ipa: '/ˈfɔː.kɑːst/',
        partOfSpeech: 'noun',
        meaningVi: 'dự báo (thời tiết)',
        definitionEn: 'A report that says what the weather will be like.',
        examples: [
          { en: 'The weather forecast says it will rain tomorrow.', vi: 'Dự báo thời tiết nói ngày mai sẽ mưa.' },
          { en: 'I always check the forecast before a trip.', vi: 'Tôi luôn xem dự báo trước mỗi chuyến đi.' },
        ],
      },
      {
        id: 'l2-w-humid',
        word: 'humid',
        ipa: '/ˈhjuː.mɪd/',
        partOfSpeech: 'adjective',
        meaningVi: 'ẩm, ẩm ướt (không khí)',
        definitionEn: 'With a lot of water in the air, so you feel hot and wet.',
        examples: [
          { en: 'Summer in Vietnam is hot and humid.', vi: 'Mùa hè ở Việt Nam nóng và ẩm.' },
          { en: 'It is very humid today, so my clothes don’t dry.', vi: 'Hôm nay trời rất ẩm nên quần áo không khô.' },
        ],
        usageNote: {
          vi: 'Danh từ: **humidity** (độ ẩm). Cụm hay gặp: **hot and humid**.',
          en: 'Noun: humidity. Common phrase: hot and humid.',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-04-ex01',
        type: 'multiple-choice',
        question: 'There are a lot of clouds in the sky. It is ___.',
        options: ['sunny', 'windy', 'humid', 'cloudy'],
        correctIndex: 3,
        explanation: {
          vi: 'cloud (mây) + y → cloudy (nhiều mây).',
          en: 'Lots of clouds = cloudy.',
        },
      },
      {
        id: 'l2-vocab-04-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối danh từ với tính từ', en: 'Match the nouns with the adjectives' },
        pairs: [
          { left: 'sun', right: 'sunny' },
          { left: 'rain', right: 'rainy' },
          { left: 'wind', right: 'windy' },
          { left: 'fog', right: 'foggy' },
          { left: 'storm', right: 'stormy' },
        ],
      },
      {
        id: 'l2-vocab-04-ex03',
        type: 'fill-blank',
        sentence: 'We stayed at home because there was ___ rain.',
        acceptedAnswers: ['heavy'],
        hint: '(mưa to)',
        explanation: {
          vi: 'Mưa to = "heavy rain", không nói "big rain".',
          en: 'We say "heavy rain".',
        },
      },
      {
        id: 'l2-vocab-04-ex04',
        type: 'arrange-words',
        translationVi: 'Dự báo thời tiết nói ngày mai sẽ có nắng.',
        correctSentence: 'The weather forecast says it will be sunny tomorrow.',
        extraWords: ['sun', 'tell'],
        explanation: {
          vi: 'Sau "be" dùng tính từ "sunny", không dùng danh từ "sun".',
          en: 'After "be" we need the adjective: sunny.',
        },
      },
      {
        id: 'l2-vocab-04-ex05',
        type: 'listen-choose',
        audioText: 'Good morning. Today will be hot and humid, with a temperature of thirty-six degrees.',
        question: 'What will the temperature be?',
        options: ['26 degrees', '36 degrees', '30 degrees', '16 degrees'],
        correctIndex: 1,
        explanation: {
          vi: '"thirty-six degrees" = 36 độ.',
          en: 'The forecast says thirty-six degrees.',
        },
      },
      {
        id: 'l2-vocab-04-ex06',
        type: 'multiple-choice',
        question: 'Which phrase is correct?',
        options: ['a big wind', 'a heavy wind', 'a strong wind', 'a hard wind'],
        correctIndex: 2,
        explanation: {
          vi: 'Gió mạnh = "strong wind". Mưa to mới dùng "heavy".',
          en: 'We say "strong wind" and "heavy rain".',
        },
      },
      {
        id: 'l2-vocab-04-ex07',
        type: 'listen-type',
        audioText: 'It is very windy today.',
        acceptedAnswers: ['It is very windy today.', "It's very windy today."],
        explanation: {
          vi: '"windy" = nhiều gió.',
          en: '"Windy" means there is a lot of wind.',
        },
      },
      {
        id: 'l2-vocab-04-ex08',
        type: 'fill-blank',
        sentence: 'I love Hanoi ___ autumn because it is cool.',
        acceptedAnswers: ['in'],
        explanation: {
          vi: 'Trước mùa dùng giới từ "in": in autumn, in summer.',
          en: 'We use "in" with seasons.',
        },
      },
      {
        id: 'l2-vocab-04-ex09',
        type: 'speak-sentence',
        sentence: 'Summer in Vietnam is hot and humid.',
        translationVi: 'Mùa hè ở Việt Nam nóng và ẩm.',
        explanation: {
          vi: '"humid" đọc là /ˈhjuː.mɪd/ ("hiu-mịt").',
          en: '"Humid" starts with the sound /hjuː/.',
        },
      },
      {
        id: 'l2-vocab-04-ex10',
        type: 'true-false',
        statement: 'We can say "The temperature is high today."',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đúng. Nhiệt độ dùng "high/low".',
          en: 'True. A temperature is high or low.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-04-test01',
        type: 'multiple-choice',
        question: '"Dự báo thời tiết" in English is...',
        options: ['the weather forecast', 'the weather season', 'the weather news report', 'the weather temperature'],
        correctIndex: 0,
        explanation: {
          vi: '"the weather forecast" = dự báo thời tiết.',
          en: 'A forecast tells you about future weather.',
        },
      },
      {
        id: 'l2-vocab-04-test02',
        type: 'fill-blank',
        sentence: 'Yesterday was cloudy, but today is ___. I can see the sun!',
        acceptedAnswers: ['sunny'],
        explanation: {
          vi: 'Nhìn thấy mặt trời → trời nắng: sunny (2 chữ n).',
          en: 'You can see the sun, so it is sunny.',
        },
      },
      {
        id: 'l2-vocab-04-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'season', right: 'mùa' },
          { left: 'storm', right: 'cơn bão' },
          { left: 'temperature', right: 'nhiệt độ' },
          { left: 'humid', right: 'ẩm ướt' },
        ],
      },
      {
        id: 'l2-vocab-04-test04',
        type: 'arrange-words',
        translationVi: 'Tối nay sắp có bão.',
        correctSentence: 'There is going to be a storm tonight.',
        extraWords: ['stormy', 'are'],
        explanation: {
          vi: '"There is going to be ..." = sắp có ... (dự đoán dựa trên dấu hiệu).',
          en: '"Be going to" is used for predictions.',
        },
      },
      {
        id: 'l2-vocab-04-test05',
        type: 'listen-choose',
        audioText: 'In my city there are two seasons: the rainy season and the dry season. I like the dry season better because I can play football outside.',
        question: 'Which season does the speaker prefer?',
        options: ['Winter', 'The rainy season', 'Summer', 'The dry season'],
        correctIndex: 3,
        explanation: {
          vi: '"I like the dry season better" = tôi thích mùa khô hơn.',
          en: 'The speaker likes the dry season better.',
        },
      },
      {
        id: 'l2-vocab-04-test06',
        type: 'multiple-choice',
        question: 'There is fog this morning. It is ___.',
        options: ['foggy', 'fogy', 'fogging', 'fogged'],
        correctIndex: 0,
        explanation: {
          vi: 'fog → foggy (nhân đôi chữ g rồi thêm y).',
          en: 'Double the "g": foggy.',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 5 — SỨC KHỎE & CƠ THỂ
   * Nói về bệnh nhẹ: "have a headache", "take medicine", "see a doctor";
   * lời khuyên với "should"; họ từ health → healthy → unhealthy.
   * ======================================================================== */
  {
    id: 'l2-vocab-05',
    skill: 'vocabulary',
    title: { vi: 'Sức khỏe & cơ thể', en: 'Health & the body' },
    description: {
      vi: 'Học cách nói mình bị ốm, cho lời khuyên và các cụm như "have a headache", "take medicine".',
      en: 'Learn to say what is wrong, give advice, and use phrases like "have a headache" and "take medicine".',
    },
    teachingCards: [
      {
        title: { vi: 'Nói mình bị đau/ốm', en: 'Saying what is wrong' },
        body: {
          vi: 'Dùng **have (got) a** + bệnh:\n**have a headache** = đau đầu\n**have a stomach ache** = đau bụng\n**have a fever / a temperature** = bị sốt\n**have a cough** = bị ho; **have a cold** = bị cảm\nHoặc: **My** + bộ phận + **hurts**: "My back hurts." (Lưng tôi đau.)\nHỏi: **What’s the matter?** = Bạn bị sao vậy?',
          en: 'Use **have (got) a** + illness: **a headache, a stomach ache, a fever, a cough, a cold**.\nOr: **My** + body part + **hurts**: "My back hurts."\nAsk: **What’s the matter?**',
        },
        examples: [
          { en: 'What’s the matter? — I have a terrible headache.', vi: 'Bạn bị sao vậy? — Tôi đau đầu kinh khủng.' },
          { en: 'My leg hurts after the football match.', vi: 'Chân tôi đau sau trận bóng.' },
        ],
      },
      {
        title: { vi: 'Lời khuyên & collocation', en: 'Advice and collocations' },
        body: {
          vi: 'Cho lời khuyên: **You should** + động từ / **You shouldn’t** + động từ.\n**take medicine** = uống thuốc (KHÔNG nói "drink medicine")\n**see a doctor** / **go to the doctor’s** = đi khám bác sĩ\n**get some rest** = nghỉ ngơi\n**do exercise** / **take exercise** = tập thể dục',
          en: 'Advice: **You should / shouldn’t** + verb.\n**take medicine** (not "drink medicine")\n**see a doctor**, **get some rest**, **do exercise**',
        },
        examples: [
          { en: 'You should take this medicine twice a day.', vi: 'Bạn nên uống thuốc này hai lần một ngày.' },
          { en: 'You shouldn’t go to school today. You should see a doctor.', vi: 'Hôm nay con không nên đi học. Con nên đi khám bác sĩ.' },
        ],
      },
      {
        title: { vi: 'Họ từ: health', en: 'Word family: health' },
        body: {
          vi: '**health** (danh từ) = sức khỏe\n**healthy** (tính từ) = khỏe mạnh; tốt cho sức khỏe\n**unhealthy** (tính từ) = không lành mạnh, có hại cho sức khỏe\nTiền tố **un-** làm nghĩa ngược lại: happy → unhappy, healthy → unhealthy.',
          en: '**health** (noun), **healthy** (adjective), **unhealthy** (opposite).\nThe prefix **un-** makes the opposite: unhappy, unhealthy.',
        },
        examples: [
          { en: 'Smoking is bad for your health.', vi: 'Hút thuốc có hại cho sức khỏe.' },
          { en: 'Fast food is unhealthy.', vi: 'Đồ ăn nhanh không tốt cho sức khỏe.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-headache',
        word: 'headache',
        ipa: '/ˈhed.eɪk/',
        partOfSpeech: 'noun',
        meaningVi: 'chứng đau đầu',
        definitionEn: 'A pain in your head.',
        examples: [
          { en: 'I have a headache because I didn’t sleep well.', vi: 'Tôi bị đau đầu vì ngủ không ngon.' },
          { en: 'Loud music gives me a headache.', vi: 'Nhạc to làm tôi đau đầu.' },
        ],
        usageNote: {
          vi: 'Luôn có "a": **have a headache**. "ache" đọc là /eɪk/ ("ây-k"). Tương tự: toothache, stomach ache.',
          en: 'Say "have a headache". "Ache" sounds like /eɪk/.',
        },
      },
      {
        id: 'l2-w-fever',
        word: 'fever',
        ipa: '/ˈfiː.vər/',
        partOfSpeech: 'noun',
        meaningVi: 'cơn sốt',
        definitionEn: 'When your body is hotter than normal because you are ill.',
        examples: [
          { en: 'My little brother had a high fever last night.', vi: 'Tối qua em trai tôi bị sốt cao.' },
          { en: 'If you have a fever, you should stay in bed.', vi: 'Nếu bị sốt, bạn nên nằm nghỉ.' },
        ],
        usageNote: {
          vi: 'Anh-Anh cũng hay nói **have a temperature** = bị sốt.',
          en: 'In British English, "have a temperature" also means have a fever.',
        },
      },
      {
        id: 'l2-w-cough',
        word: 'cough',
        ipa: '/kɒf/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'cơn ho; ho',
        definitionEn: 'To push air out of your throat with a loud noise, often when you are ill.',
        examples: [
          { en: 'She has a bad cough.', vi: 'Cô ấy bị ho nặng.' },
          { en: 'He coughed all night.', vi: 'Anh ấy ho suốt đêm.' },
        ],
        usageNote: {
          vi: 'Chữ "gh" ở đây đọc là /f/: cough = "cóp-f". Không đọc "cao".',
          en: 'The "gh" sounds like /f/.',
        },
      },
      {
        id: 'l2-w-medicine',
        word: 'medicine',
        ipa: '/ˈmed.ɪ.sən/',
        partOfSpeech: 'noun',
        meaningVi: 'thuốc (chữa bệnh); y học',
        definitionEn: 'Something you take to make you better when you are ill.',
        examples: [
          { en: 'Take this medicine after meals.', vi: 'Uống thuốc này sau bữa ăn.' },
          { en: 'Did you take your medicine this morning?', vi: 'Sáng nay bạn đã uống thuốc chưa?' },
        ],
        usageNote: {
          vi: 'Dùng **take medicine**, KHÔNG nói "drink medicine" (lỗi dịch từ "uống thuốc").',
          en: 'Say "take medicine", not "drink medicine".',
        },
      },
      {
        id: 'l2-w-healthy',
        word: 'healthy',
        ipa: '/ˈhel.θi/',
        partOfSpeech: 'adjective',
        meaningVi: 'khỏe mạnh; tốt cho sức khỏe',
        definitionEn: 'Strong and well; or good for your body.',
        examples: [
          { en: 'My grandparents are old but very healthy.', vi: 'Ông bà tôi đã già nhưng rất khỏe mạnh.' },
          { en: 'Fruit is healthier than sweets.', vi: 'Trái cây tốt cho sức khỏe hơn kẹo.' },
        ],
        usageNote: {
          vi: 'Danh từ là **health**: "good for your health" (KHÔNG nói "good for your healthy").',
          en: 'Noun: health. "Good for your health", not "good for your healthy".',
        },
      },
      {
        id: 'l2-w-stomach',
        word: 'stomach',
        ipa: '/ˈstʌm.ək/',
        partOfSpeech: 'noun',
        meaningVi: 'dạ dày, bụng',
        definitionEn: 'The part inside your body where food goes after you eat it.',
        examples: [
          { en: 'I ate too much and now I have a stomach ache.', vi: 'Tôi ăn quá nhiều nên giờ bị đau bụng.' },
          { en: 'Don’t swim on a full stomach.', vi: 'Đừng bơi khi vừa ăn no.' },
        ],
        usageNote: {
          vi: '"ch" ở đây đọc là /k/: /ˈstʌm.ək/ ("xtăm-mợc").',
          en: 'The "ch" sounds like /k/.',
        },
      },
      {
        id: 'l2-w-exercise',
        word: 'exercise',
        ipa: '/ˈek.sə.saɪz/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'sự tập thể dục; bài tập',
        definitionEn: 'Moving your body to stay strong and healthy.',
        examples: [
          { en: 'I do exercise for thirty minutes every morning.', vi: 'Tôi tập thể dục ba mươi phút mỗi sáng.' },
          { en: 'Doctors say we should exercise more.', vi: 'Bác sĩ nói chúng ta nên tập thể dục nhiều hơn.' },
        ],
        usageNote: {
          vi: 'Collocation: **do exercise**, **take exercise**, **get exercise**. Nghĩa "bài tập" (exercises) là danh từ đếm được.',
          en: 'Collocations: do / take / get exercise.',
        },
      },
      {
        id: 'l2-w-rest',
        word: 'rest',
        ipa: '/rest/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'sự nghỉ ngơi; nghỉ ngơi',
        definitionEn: 'Time when you relax or sleep so you feel better.',
        examples: [
          { en: 'You look tired. You should get some rest.', vi: 'Trông bạn mệt lắm. Bạn nên nghỉ ngơi một chút.' },
          { en: 'The doctor told me to rest for three days.', vi: 'Bác sĩ bảo tôi nghỉ ngơi ba ngày.' },
        ],
        usageNote: {
          vi: 'Collocation: **get some rest**, **have a rest**, **take a rest**.',
          en: 'Collocations: get some rest, have a rest.',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-05-ex01',
        type: 'multiple-choice',
        question: 'I have a pain in my head. I have a ___.',
        options: ['stomach ache', 'cough', 'headache', 'fever'],
        correctIndex: 2,
        explanation: {
          vi: 'Đau ở đầu = headache.',
          en: 'A pain in your head is a headache.',
        },
      },
      {
        id: 'l2-vocab-05-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'fever', right: 'cơn sốt' },
          { left: 'cough', right: 'ho' },
          { left: 'medicine', right: 'thuốc' },
          { left: 'stomach', right: 'dạ dày' },
          { left: 'rest', right: 'nghỉ ngơi' },
        ],
      },
      {
        id: 'l2-vocab-05-ex03',
        type: 'fill-blank',
        sentence: 'You have a fever. You should ___ this medicine.',
        acceptedAnswers: ['take'],
        hint: '(uống thuốc)',
        explanation: {
          vi: '"uống thuốc" = take medicine (không dùng "drink").',
          en: 'We take medicine.',
        },
      },
      {
        id: 'l2-vocab-05-ex04',
        type: 'arrange-words',
        translationVi: 'Bạn nên đi khám bác sĩ.',
        correctSentence: 'You should see a doctor.',
        extraWords: ['to', 'doctors'],
        explanation: {
          vi: '"should" + động từ nguyên mẫu (không "to"). "see a doctor" = đi khám bác sĩ.',
          en: '"Should" + base verb. "See a doctor" is the collocation.',
        },
      },
      {
        id: 'l2-vocab-05-ex05',
        type: 'listen-choose',
        audioText: 'Doctor: What is the matter? Lan: I ate some old fish yesterday and now my stomach hurts.',
        question: 'What is Lan’s problem?',
        options: ['A headache', 'A cough', 'A fever', 'A stomach ache'],
        correctIndex: 3,
        explanation: {
          vi: '"my stomach hurts" = bụng tôi đau → stomach ache.',
          en: 'Her stomach hurts.',
        },
      },
      {
        id: 'l2-vocab-05-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Vegetables are good for your health.',
          'Vegetables are good for your healthy.',
          'Vegetables are health food for you.',
          'Vegetables are unhealthy for you.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Sau "your" cần danh từ "health". Rau củ thì tốt chứ không "unhealthy".',
          en: 'After "your" we need the noun "health".',
        },
      },
      {
        id: 'l2-vocab-05-ex07',
        type: 'listen-type',
        audioText: 'I have a bad cough.',
        acceptedAnswers: ['I have a bad cough.', "I've got a bad cough.", 'I have got a bad cough.'],
        explanation: {
          vi: '"cough" đọc là /kɒf/ — "gh" phát âm như /f/.',
          en: '"Cough" ends with an /f/ sound.',
        },
      },
      {
        id: 'l2-vocab-05-ex08',
        type: 'fill-blank',
        sentence: 'Eating too many sweets is ___. It is bad for your teeth.',
        acceptedAnswers: ['unhealthy'],
        hint: '(healthy → nghĩa ngược lại)',
        explanation: {
          vi: 'un- + healthy = unhealthy (không tốt cho sức khỏe).',
          en: 'The opposite of healthy is unhealthy.',
        },
      },
      {
        id: 'l2-vocab-05-ex09',
        type: 'speak-sentence',
        sentence: 'You look tired. You should get some rest.',
        translationVi: 'Trông bạn mệt lắm. Bạn nên nghỉ ngơi một chút.',
        explanation: {
          vi: 'Câu khuyên nhủ: You should + động từ.',
          en: 'Giving advice with "should".',
        },
      },
      {
        id: 'l2-vocab-05-ex10',
        type: 'multiple-choice',
        question: 'Which word has the /f/ sound at the end?',
        options: ['stomach', 'cough', 'headache', 'medicine'],
        correctIndex: 1,
        explanation: {
          vi: 'cough /kɒf/ — "gh" đọc là /f/.',
          en: 'In "cough", "gh" is pronounced /f/.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-05-test01',
        type: 'multiple-choice',
        question: 'Your body is very hot and you feel ill. You have a ___.',
        options: ['rest', 'stomach', 'cough', 'fever'],
        correctIndex: 3,
        explanation: {
          vi: 'Người nóng, mệt → sốt (fever).',
          en: 'A high body temperature is a fever.',
        },
      },
      {
        id: 'l2-vocab-05-test02',
        type: 'fill-blank',
        sentence: 'I go running every morning because I want to stay ___.',
        acceptedAnswers: ['healthy', 'fit'],
        hint: '(khỏe mạnh)',
        explanation: {
          vi: '"stay healthy" = giữ sức khỏe.',
          en: '"Stay healthy" means keep well.',
        },
      },
      {
        id: 'l2-vocab-05-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối để tạo cụm từ đúng', en: 'Match to make correct phrases' },
        pairs: [
          { left: 'take', right: 'medicine' },
          { left: 'see', right: 'a doctor' },
          { left: 'get some', right: 'rest' },
          { left: 'do', right: 'exercise' },
        ],
      },
      {
        id: 'l2-vocab-05-test04',
        type: 'arrange-words',
        translationVi: 'Tối qua tôi bị đau đầu kinh khủng.',
        correctSentence: 'I had a terrible headache last night.',
        extraWords: ['have', 'hurt'],
        explanation: {
          vi: '"last night" → quá khứ: have → had.',
          en: '"Last night" needs the past simple: had.',
        },
      },
      {
        id: 'l2-vocab-05-test05',
        type: 'listen-choose',
        audioText: 'Mum: You have a cold. You should drink a lot of warm water and go to bed early. You shouldn’t eat ice cream.',
        question: 'What should the child NOT do?',
        options: ['Drink warm water', 'Eat ice cream', 'Go to bed early', 'Take a rest'],
        correctIndex: 1,
        explanation: {
          vi: '"You shouldn’t eat ice cream" = không nên ăn kem.',
          en: 'Mum says he shouldn’t eat ice cream.',
        },
      },
      {
        id: 'l2-vocab-05-test06',
        type: 'multiple-choice',
        question: '"Uống thuốc" in natural English is...',
        options: ['drink medicine', 'eat medicine', 'take medicine', 'have a medicine drink'],
        correctIndex: 2,
        explanation: {
          vi: 'Người bản xứ nói "take medicine".',
          en: 'The natural phrase is "take medicine".',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 6 — SỞ THÍCH & THỜI GIAN RẢNH
   * Phân biệt play / go / do: play chess, go swimming, do yoga.
   * Tính từ -ing / -ed: relaxing (thư giãn) ≠ relaxed (cảm thấy thư thái).
   * ======================================================================== */
  {
    id: 'l2-vocab-06',
    skill: 'vocabulary',
    title: { vi: 'Sở thích & thời gian rảnh', en: 'Hobbies & free time' },
    description: {
      vi: 'Học cách nói về sở thích và phân biệt "play / go / do" với các hoạt động.',
      en: 'Learn to talk about hobbies and choose "play", "go" or "do" for activities.',
    },
    teachingCards: [
      {
        title: { vi: 'play, go hay do?', en: 'Play, go or do?' },
        body: {
          vi: '**play** + trò chơi/môn bóng: play chess, play football, play badminton, play video games\n**play the** + nhạc cụ: play **the** guitar, play **the** piano\n**go** + hoạt động đuôi **-ing**: go swimming, go fishing, go camping, go shopping\n**do** + môn không dùng bóng/võ/yoga: do yoga, do karate, do exercise',
          en: '**play** + games and ball sports: play chess, play football\n**play the** + instrument: play the guitar\n**go** + -ing activities: go swimming, go camping\n**do** + other activities: do yoga, do karate',
        },
        examples: [
          { en: 'I play badminton with my dad on Sundays.', vi: 'Tôi chơi cầu lông với bố vào Chủ nhật.' },
          { en: 'We went camping last summer.', vi: 'Hè năm ngoái chúng tôi đi cắm trại.' },
          { en: 'My mum does yoga three times a week.', vi: 'Mẹ tôi tập yoga ba lần một tuần.' },
        ],
      },
      {
        title: { vi: 'Nói về thời gian rảnh', en: 'Talking about free time' },
        body: {
          vi: '**in my free time** = vào thời gian rảnh của tôi\n**be interested in** + V-ing/danh từ = quan tâm, thích\n**be good at** + V-ing/danh từ = giỏi về\nTrạng từ tần suất đứng trước động từ thường: I **often** read comics. I **sometimes** go to the cinema.\nHọ từ: **relax** (động từ) → **relaxing** (làm thư giãn — chỉ hoạt động) → **relaxed** (cảm thấy thư thái — chỉ người).',
          en: '**in my free time**, **be interested in**, **be good at** + -ing\nFrequency adverbs go before the main verb: I **often** read comics.\nWord family: **relax** → **relaxing** (the activity) → **relaxed** (how you feel).',
        },
        examples: [
          { en: 'In my free time, I usually listen to music.', vi: 'Lúc rảnh, tôi thường nghe nhạc.' },
          { en: 'Reading is relaxing. After reading, I feel relaxed.', vi: 'Đọc sách thật thư giãn. Đọc xong, tôi thấy thư thái.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-hobby',
        word: 'hobby',
        ipa: '/ˈhɒb.i/',
        partOfSpeech: 'noun',
        meaningVi: 'sở thích',
        definitionEn: 'Something you enjoy doing in your free time.',
        examples: [
          { en: 'My hobby is taking photos.', vi: 'Sở thích của tôi là chụp ảnh.' },
          { en: 'Do you have any hobbies?', vi: 'Bạn có sở thích nào không?' },
        ],
        usageNote: {
          vi: 'Số nhiều: hobb**ies**. Sau "My hobby is" dùng V-ing: "My hobby is drawing."',
          en: 'Plural: hobbies. "My hobby is + -ing".',
        },
      },
      {
        id: 'l2-w-free-time',
        word: 'free time',
        ipa: '/ˌfriː ˈtaɪm/',
        partOfSpeech: 'noun',
        meaningVi: 'thời gian rảnh',
        definitionEn: 'Time when you are not working or studying.',
        examples: [
          { en: 'What do you do in your free time?', vi: 'Bạn làm gì vào thời gian rảnh?' },
          { en: 'I don’t have much free time during the exam weeks.', vi: 'Tôi không có nhiều thời gian rảnh trong những tuần thi.' },
        ],
        usageNote: {
          vi: 'Không đếm được: "much free time" (không nói "many free times"). Dùng giới từ **in**: in my free time.',
          en: 'Uncountable: "much free time". Use "in": in my free time.',
        },
      },
      {
        id: 'l2-w-collect',
        word: 'collect',
        ipa: '/kəˈlekt/',
        partOfSpeech: 'verb',
        meaningVi: 'sưu tầm, thu thập',
        definitionEn: 'To get and keep things of the same kind because you like them.',
        examples: [
          { en: 'My brother collects stamps from different countries.', vi: 'Anh tôi sưu tầm tem của nhiều nước.' },
          { en: 'She has collected over 100 comic books.', vi: 'Cô ấy đã sưu tầm hơn 100 cuốn truyện tranh.' },
        ],
        usageNote: {
          vi: 'Họ từ: collect → **collection** (bộ sưu tập) → **collector** (người sưu tầm).',
          en: 'Word family: collect, collection, collector.',
        },
      },
      {
        id: 'l2-w-relax',
        word: 'relax',
        ipa: '/rɪˈlæks/',
        partOfSpeech: 'verb',
        meaningVi: 'thư giãn, nghỉ ngơi',
        definitionEn: 'To rest and feel calm, not worried.',
        examples: [
          { en: 'I like to relax by listening to music.', vi: 'Tôi thích thư giãn bằng cách nghe nhạc.' },
          { en: 'At the weekend, my parents relax at home.', vi: 'Cuối tuần, bố mẹ tôi nghỉ ngơi ở nhà.' },
        ],
        usageNote: {
          vi: '**relaxing** = khiến người ta thư giãn (a relaxing holiday); **relaxed** = cảm thấy thư thái (I feel relaxed).',
          en: '"Relaxing" describes the thing; "relaxed" describes how you feel.',
        },
      },
      {
        id: 'l2-w-instrument',
        word: 'instrument',
        ipa: '/ˈɪn.strə.mənt/',
        partOfSpeech: 'noun',
        meaningVi: 'nhạc cụ; dụng cụ',
        definitionEn: 'Something you play to make music, e.g. a piano or a guitar.',
        examples: [
          { en: 'Can you play a musical instrument?', vi: 'Bạn có chơi được nhạc cụ nào không?' },
          { en: 'The guitar is the easiest instrument for me.', vi: 'Với tôi, ghi-ta là nhạc cụ dễ nhất.' },
        ],
        usageNote: {
          vi: 'Chơi nhạc cụ có "the": play **the** piano, play **the** violin.',
          en: 'Use "the": play the piano.',
        },
      },
      {
        id: 'l2-w-chess',
        word: 'chess',
        ipa: '/tʃes/',
        partOfSpeech: 'noun',
        meaningVi: 'cờ vua',
        definitionEn: 'A game for two people with black and white pieces on a board.',
        examples: [
          { en: 'My grandfather taught me to play chess.', vi: 'Ông tôi đã dạy tôi chơi cờ vua.' },
          { en: 'Chess is more difficult than cards.', vi: 'Cờ vua khó hơn bài.' },
        ],
        usageNote: {
          vi: 'Không có "the" trước trò chơi/môn thể thao: play chess, play football (khác nhạc cụ).',
          en: 'No "the" with games and sports: play chess.',
        },
      },
      {
        id: 'l2-w-cinema',
        word: 'cinema',
        ipa: '/ˈsɪn.ə.mə/',
        partOfSpeech: 'noun',
        meaningVi: 'rạp chiếu phim',
        definitionEn: 'A building where you go to watch films.',
        examples: [
          { en: 'Let’s go to the cinema on Saturday.', vi: 'Thứ Bảy mình đi xem phim ở rạp nhé.' },
          { en: 'The new cinema in our town is very big.', vi: 'Rạp chiếu phim mới ở thị trấn mình rất lớn.' },
        ],
        usageNote: {
          vi: 'Anh-Anh: **go to the cinema**; Anh-Mỹ: go to the movies. "film" (Anh-Anh) = "movie" (Anh-Mỹ).',
          en: 'British: go to the cinema, watch a film.',
        },
      },
      {
        id: 'l2-w-gym',
        word: 'gym',
        ipa: '/dʒɪm/',
        partOfSpeech: 'noun',
        meaningVi: 'phòng tập thể hình',
        definitionEn: 'A room or building with machines for doing exercise.',
        examples: [
          { en: 'He goes to the gym after work.', vi: 'Anh ấy đi tập gym sau giờ làm.' },
          { en: 'There is a small gym in our building.', vi: 'Tòa nhà chúng tôi có một phòng gym nhỏ.' },
        ],
        usageNote: {
          vi: 'Đọc /dʒɪm/ ("dzim"), không đọc "gim". Collocation: **go to the gym**, **work out at the gym**.',
          en: 'Pronounced /dʒɪm/. Say "go to the gym".',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-06-ex01',
        type: 'multiple-choice',
        question: 'Choose the correct verb: "I ___ swimming every Saturday."',
        options: ['play', 'do', 'make', 'go'],
        correctIndex: 3,
        explanation: {
          vi: 'Hoạt động đuôi -ing đi với "go": go swimming.',
          en: '-ing activities use "go": go swimming.',
        },
      },
      {
        id: 'l2-vocab-06-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với hoạt động phù hợp', en: 'Match the verbs with the activities' },
        pairs: [
          { left: 'play', right: 'chess' },
          { left: 'play the', right: 'guitar' },
          { left: 'go', right: 'fishing' },
          { left: 'do', right: 'yoga' },
          { left: 'go to the', right: 'gym' },
        ],
      },
      {
        id: 'l2-vocab-06-ex03',
        type: 'fill-blank',
        sentence: 'What do you do ___ your free time?',
        acceptedAnswers: ['in'],
        explanation: {
          vi: 'Cụm cố định: "in your free time".',
          en: 'We say "in your free time".',
        },
      },
      {
        id: 'l2-vocab-06-ex04',
        type: 'arrange-words',
        translationVi: 'Anh trai tôi sưu tầm tem.',
        correctSentence: 'My brother collects stamps.',
        extraWords: ['collect', 'the'],
        explanation: {
          vi: 'Chủ ngữ ngôi thứ ba số ít (my brother) → động từ thêm -s: collects.',
          en: 'He/she → verb + s: collects.',
        },
      },
      {
        id: 'l2-vocab-06-ex05',
        type: 'listen-choose',
        audioText: 'Minh: What do you do in your free time, Hoa? Hoa: I often play the piano, and sometimes I go to the gym with my sister.',
        question: 'Which instrument does Hoa play?',
        options: ['The guitar', 'The piano', 'The violin', 'The drums'],
        correctIndex: 1,
        explanation: {
          vi: 'Hoa nói "I often play the piano".',
          en: 'Hoa plays the piano.',
        },
      },
      {
        id: 'l2-vocab-06-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'I feel very relaxing after yoga.',
          'Yoga is very relaxed.',
          'I feel very relaxed after yoga.',
          'I am relax after yoga.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Cảm giác của người dùng -ed: "I feel relaxed". Hoạt động dùng -ing: "Yoga is relaxing".',
          en: 'People feel relaxed; activities are relaxing.',
        },
      },
      {
        id: 'l2-vocab-06-ex07',
        type: 'listen-type',
        audioText: 'My hobby is taking photos.',
        acceptedAnswers: ['My hobby is taking photos.', "My hobby's taking photos."],
        explanation: {
          vi: '"My hobby is" + V-ing.',
          en: 'After "My hobby is" we often use -ing.',
        },
      },
      {
        id: 'l2-vocab-06-ex08',
        type: 'fill-blank',
        sentence: 'He has a big stamp ___. He has 500 stamps!',
        acceptedAnswers: ['collection'],
        hint: '(collect → danh từ)',
        explanation: {
          vi: 'collect (động từ) → collection (bộ sưu tập).',
          en: 'The noun of "collect" is "collection".',
        },
      },
      {
        id: 'l2-vocab-06-ex09',
        type: 'speak-sentence',
        sentence: 'I sometimes go to the cinema with my friends.',
        translationVi: 'Thỉnh thoảng tôi đi xem phim ở rạp với bạn bè.',
        explanation: {
          vi: 'Trạng từ tần suất "sometimes" đứng trước động từ "go".',
          en: 'The frequency adverb comes before the main verb.',
        },
      },
      {
        id: 'l2-vocab-06-ex10',
        type: 'true-false',
        statement: 'We say "play the chess" because chess is a game.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sai. Trò chơi/môn thể thao không có "the": play chess. Chỉ nhạc cụ mới có "the".',
          en: 'False. No "the" with games: play chess.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-06-test01',
        type: 'multiple-choice',
        question: 'A guitar, a piano and a violin are musical ___.',
        options: ['instruments', 'hobbies', 'games', 'tools'],
        correctIndex: 0,
        explanation: {
          vi: 'Nhạc cụ = musical instruments.',
          en: 'They are musical instruments.',
        },
      },
      {
        id: 'l2-vocab-06-test02',
        type: 'fill-blank',
        sentence: 'My dad ___ karate twice a week.',
        acceptedAnswers: ['does'],
        hint: '(play / go / do?)',
        explanation: {
          vi: 'Võ thuật đi với "do": do karate. Chủ ngữ "my dad" → does.',
          en: 'Martial arts use "do": he does karate.',
        },
      },
      {
        id: 'l2-vocab-06-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'hobby', right: 'sở thích' },
          { left: 'cinema', right: 'rạp chiếu phim' },
          { left: 'chess', right: 'cờ vua' },
          { left: 'relax', right: 'thư giãn' },
          { left: 'collect', right: 'sưu tầm' },
        ],
      },
      {
        id: 'l2-vocab-06-test04',
        type: 'arrange-words',
        translationVi: 'Bạn có chơi được nhạc cụ nào không?',
        correctSentence: 'Can you play a musical instrument?',
        extraWords: ['playing', 'music'],
        explanation: {
          vi: '"play a musical instrument" = chơi nhạc cụ.',
          en: 'Can + you + play...?',
        },
      },
      {
        id: 'l2-vocab-06-test05',
        type: 'listen-choose',
        audioText: 'I am not very good at sports, but I am interested in art. In my free time I draw pictures and collect old postcards.',
        question: 'What is the speaker interested in?',
        options: ['Sports', 'Music', 'Films', 'Art'],
        correctIndex: 3,
        explanation: {
          vi: '"I am interested in art" = tôi thích nghệ thuật.',
          en: 'The speaker is interested in art.',
        },
      },
      {
        id: 'l2-vocab-06-test06',
        type: 'multiple-choice',
        question: 'Which phrase is WRONG?',
        options: ['go camping', 'play football', 'go yoga', 'do exercise'],
        correctIndex: 2,
        explanation: {
          vi: 'Phải nói "do yoga", không phải "go yoga".',
          en: 'It should be "do yoga".',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 7 — NHÀ CỬA & ĐỒ NỘI THẤT
   * "furniture" là danh từ KHÔNG đếm được; việc nhà: make the bed,
   * do the washing-up, tidy your room; giới từ chỉ vị trí.
   * ======================================================================== */
  {
    id: 'l2-vocab-07',
    skill: 'vocabulary',
    title: { vi: 'Nhà cửa & đồ nội thất', en: 'Home & furniture' },
    description: {
      vi: 'Học tên đồ nội thất, cách nói vị trí đồ vật và các cụm việc nhà như "make the bed".',
      en: 'Learn furniture words, how to say where things are, and housework phrases like "make the bed".',
    },
    teachingCards: [
      {
        title: { vi: '"furniture" không đếm được', en: '"Furniture" is uncountable' },
        body: {
          vi: '**furniture** = đồ nội thất — danh từ KHÔNG đếm được:\n✔ some furniture, a lot of furniture, much furniture\n✘ a furniture, furnitures, many furnitures\nMuốn đếm: **a piece of furniture** (một món đồ nội thất).\nCác món cụ thể thì đếm được: a sofa, two shelves, three chairs.',
          en: '**furniture** is uncountable: some furniture, not "furnitures".\nTo count it: **a piece of furniture**.\nSpecific items are countable: a sofa, two shelves.',
        },
        examples: [
          { en: 'We bought some new furniture for the living room.', vi: 'Chúng tôi mua ít đồ nội thất mới cho phòng khách.' },
          { en: 'There isn’t much furniture in my bedroom.', vi: 'Phòng ngủ của tôi không có nhiều đồ đạc.' },
        ],
      },
      {
        title: { vi: 'Đồ vật ở đâu?', en: 'Where is it?' },
        body: {
          vi: '**in** (trong), **on** (trên, chạm mặt), **under** (dưới)\n**next to** (bên cạnh), **between** A **and** B (giữa A và B)\n**opposite** (đối diện), **behind** (phía sau), **in front of** (phía trước)\nDùng **There is / There are** (hiện tại) và **There was / There were** (quá khứ).',
          en: '**in, on, under, next to, between ... and ..., opposite, behind, in front of**\nUse **There is / There are** and **There was / There were**.',
        },
        examples: [
          { en: 'The mirror is on the wall, opposite the window.', vi: 'Cái gương ở trên tường, đối diện cửa sổ.' },
          { en: 'There was a big carpet in front of the sofa.', vi: 'Trước đây có một tấm thảm lớn ở trước ghế sofa.' },
        ],
      },
      {
        title: { vi: 'Collocation việc nhà', en: 'Housework collocations' },
        body: {
          vi: '**do the housework** = làm việc nhà\n**make the bed** = dọn giường (KHÔNG phải "làm giường")\n**do the washing-up** = rửa bát\n**do the laundry / do the washing** = giặt quần áo\n**tidy your room** = dọn dẹp phòng\nChú ý: phần lớn việc nhà dùng **do**, nhưng giường thì **make**.',
          en: '**do the housework**, **make the bed**, **do the washing-up**, **do the laundry**, **tidy your room**\nMost housework uses **do**, but we **make** the bed.',
        },
        examples: [
          { en: 'I make my bed every morning.', vi: 'Tôi dọn giường mỗi sáng.' },
          { en: 'My brother does the washing-up after dinner.', vi: 'Anh tôi rửa bát sau bữa tối.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-furniture',
        word: 'furniture',
        ipa: '/ˈfɜː.nɪ.tʃər/',
        partOfSpeech: 'noun',
        meaningVi: 'đồ nội thất, đồ đạc',
        definitionEn: 'Things such as chairs, tables and beds in a room.',
        examples: [
          { en: 'This room has very little furniture.', vi: 'Căn phòng này có rất ít đồ đạc.' },
          { en: 'A bed is a piece of furniture.', vi: 'Giường là một món đồ nội thất.' },
        ],
        usageNote: {
          vi: 'Không đếm được: KHÔNG nói "a furniture" hay "furnitures".',
          en: 'Uncountable: not "a furniture" or "furnitures".',
        },
      },
      {
        id: 'l2-w-sofa',
        word: 'sofa',
        ipa: '/ˈsəʊ.fə/',
        partOfSpeech: 'noun',
        meaningVi: 'ghế sofa, ghế dài',
        definitionEn: 'A long soft seat for two or more people.',
        examples: [
          { en: 'Dad is sleeping on the sofa.', vi: 'Bố đang ngủ trên ghế sofa.' },
          { en: 'Our new sofa is more comfortable than the old one.', vi: 'Ghế sofa mới thoải mái hơn cái cũ.' },
        ],
      },
      {
        id: 'l2-w-wardrobe',
        word: 'wardrobe',
        ipa: '/ˈwɔː.drəʊb/',
        partOfSpeech: 'noun',
        meaningVi: 'tủ quần áo',
        definitionEn: 'A tall cupboard where you hang your clothes.',
        examples: [
          { en: 'Put your clothes in the wardrobe, please.', vi: 'Con cất quần áo vào tủ nhé.' },
          { en: 'There is a mirror on the wardrobe door.', vi: 'Có một cái gương trên cửa tủ quần áo.' },
        ],
      },
      {
        id: 'l2-w-shelf',
        word: 'shelf',
        ipa: '/ʃelf/',
        partOfSpeech: 'noun',
        meaningVi: 'cái kệ, giá (sách)',
        definitionEn: 'A flat board on a wall or in a cupboard where you put things.',
        examples: [
          { en: 'My books are on the top shelf.', vi: 'Sách của tôi ở trên kệ trên cùng.' },
          { en: 'There are three shelves above my desk.', vi: 'Có ba cái kệ phía trên bàn học của tôi.' },
        ],
        usageNote: {
          vi: 'Số nhiều bất quy tắc: shelf → **shelves** (giống knife → knives).',
          en: 'Irregular plural: shelves.',
        },
      },
      {
        id: 'l2-w-cupboard',
        word: 'cupboard',
        ipa: '/ˈkʌb.əd/',
        partOfSpeech: 'noun',
        meaningVi: 'tủ (bếp, tủ chén)',
        definitionEn: 'A piece of furniture with doors, used for keeping cups, food, etc.',
        examples: [
          { en: 'The cups are in the kitchen cupboard.', vi: 'Cốc ở trong tủ bếp.' },
          { en: 'Is there any rice in the cupboard?', vi: 'Trong tủ còn gạo không?' },
        ],
        usageNote: {
          vi: 'Phát âm đặc biệt: /ˈkʌb.əd/ ("cắp-bợt") — chữ "p" câm.',
          en: 'The "p" is silent: /ˈkʌb.əd/.',
        },
      },
      {
        id: 'l2-w-mirror',
        word: 'mirror',
        ipa: '/ˈmɪr.ər/',
        partOfSpeech: 'noun',
        meaningVi: 'cái gương',
        definitionEn: 'A piece of glass where you can see yourself.',
        examples: [
          { en: 'She looked in the mirror and smiled.', vi: 'Cô ấy nhìn vào gương và mỉm cười.' },
          { en: 'There is a big mirror in the bathroom.', vi: 'Trong phòng tắm có một cái gương lớn.' },
        ],
        usageNote: {
          vi: 'Dùng **look in the mirror** (soi gương).',
          en: 'We say "look in the mirror".',
        },
      },
      {
        id: 'l2-w-curtain',
        word: 'curtain',
        ipa: '/ˈkɜː.tən/',
        partOfSpeech: 'noun',
        meaningVi: 'rèm cửa',
        definitionEn: 'A piece of cloth that covers a window.',
        examples: [
          { en: 'Can you close the curtains? The sun is too bright.', vi: 'Bạn kéo rèm lại được không? Nắng chói quá.' },
          { en: 'I like the blue curtains in your room.', vi: 'Tôi thích rèm màu xanh trong phòng bạn.' },
        ],
        usageNote: {
          vi: 'Thường dùng số nhiều: **open / close / draw the curtains**.',
          en: 'Usually plural: open/close the curtains.',
        },
      },
      {
        id: 'l2-w-carpet',
        word: 'carpet',
        ipa: '/ˈkɑː.pɪt/',
        partOfSpeech: 'noun',
        meaningVi: 'tấm thảm',
        definitionEn: 'A thick cloth that covers a floor.',
        examples: [
          { en: 'The cat is sleeping on the carpet.', vi: 'Con mèo đang ngủ trên tấm thảm.' },
          { en: 'There was a red carpet in the hall.', vi: 'Trước đây có một tấm thảm đỏ ở sảnh.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-07-ex01',
        type: 'multiple-choice',
        question: 'Where do you hang your clothes?',
        options: ['in the cupboard', 'on the shelf', 'in the wardrobe', 'under the carpet'],
        correctIndex: 2,
        explanation: {
          vi: 'Quần áo treo trong tủ quần áo (wardrobe). "cupboard" thường là tủ bếp.',
          en: 'We hang clothes in a wardrobe.',
        },
      },
      {
        id: 'l2-vocab-07-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'mirror', right: 'cái gương' },
          { left: 'curtain', right: 'rèm cửa' },
          { left: 'carpet', right: 'tấm thảm' },
          { left: 'shelf', right: 'cái kệ' },
          { left: 'sofa', right: 'ghế sofa' },
        ],
      },
      {
        id: 'l2-vocab-07-ex03',
        type: 'fill-blank',
        sentence: 'Please ___ your bed before you go to school.',
        acceptedAnswers: ['make'],
        hint: '(dọn giường)',
        explanation: {
          vi: 'Dọn giường = "make the bed".',
          en: 'We "make the bed".',
        },
      },
      {
        id: 'l2-vocab-07-ex04',
        type: 'arrange-words',
        translationVi: 'Chúng tôi đã mua một ít đồ nội thất mới.',
        correctSentence: 'We bought some new furniture.',
        extraWords: ['furnitures', 'many'],
        explanation: {
          vi: '"furniture" không đếm được → "some furniture", không thêm -s.',
          en: '"Furniture" is uncountable: no -s.',
        },
      },
      {
        id: 'l2-vocab-07-ex05',
        type: 'listen-choose',
        audioText: 'In my bedroom, my desk is between the window and the wardrobe.',
        question: 'Where is the desk?',
        options: ['Under the window', 'Opposite the wardrobe', 'Behind the bed', 'Between the window and the wardrobe'],
        correctIndex: 3,
        explanation: {
          vi: '"between A and B" = ở giữa A và B.',
          en: 'The desk is between the window and the wardrobe.',
        },
      },
      {
        id: 'l2-vocab-07-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'There is a lot of furniture in the living room.',
          'There are many furnitures in the living room.',
          'There is a furniture in the living room.',
          'There are a lot of furniture in the living room.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'furniture không đếm được → "There is a lot of furniture".',
          en: 'Uncountable noun → "There is a lot of furniture".',
        },
      },
      {
        id: 'l2-vocab-07-ex07',
        type: 'listen-type',
        audioText: 'The cups are in the cupboard.',
        acceptedAnswers: ['The cups are in the cupboard.'],
        explanation: {
          vi: '"cupboard" đọc /ˈkʌb.əd/, chữ "p" câm.',
          en: 'In "cupboard", the "p" is silent.',
        },
      },
      {
        id: 'l2-vocab-07-ex08',
        type: 'fill-blank',
        sentence: 'There are three ___ on the wall for my books.',
        acceptedAnswers: ['shelves'],
        hint: '(shelf — số nhiều)',
        explanation: {
          vi: 'shelf → shelves (đổi f thành v rồi thêm -es).',
          en: 'The plural of shelf is shelves.',
        },
      },
      {
        id: 'l2-vocab-07-ex09',
        type: 'speak-sentence',
        sentence: 'My brother does the washing-up after dinner.',
        translationVi: 'Anh tôi rửa bát sau bữa tối.',
        explanation: {
          vi: '"do the washing-up" = rửa bát.',
          en: '"Do the washing-up" means wash the dishes.',
        },
      },
      {
        id: 'l2-vocab-07-ex10',
        type: 'true-false',
        statement: 'We say "do the bed" when we tidy our bed in the morning.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sai. Phải nói "make the bed".',
          en: 'False. We say "make the bed".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-07-test01',
        type: 'multiple-choice',
        question: 'You look in it to see your face. It is a ___.',
        options: ['curtain', 'mirror', 'carpet', 'shelf'],
        correctIndex: 1,
        explanation: {
          vi: 'Soi gương = look in the mirror.',
          en: 'You see yourself in a mirror.',
        },
      },
      {
        id: 'l2-vocab-07-test02',
        type: 'fill-blank',
        sentence: 'When I was young, there ___ a big carpet in our living room.',
        acceptedAnswers: ['was'],
        explanation: {
          vi: 'Quá khứ, danh từ số ít → there was.',
          en: 'Past + singular noun → there was.',
        },
      },
      {
        id: 'l2-vocab-07-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối để tạo cụm việc nhà đúng', en: 'Match to make housework phrases' },
        pairs: [
          { left: 'make', right: 'the bed' },
          { left: 'do the', right: 'washing-up' },
          { left: 'tidy', right: 'your room' },
          { left: 'close', right: 'the curtains' },
        ],
      },
      {
        id: 'l2-vocab-07-test04',
        type: 'arrange-words',
        translationVi: 'Cái gương ở đối diện cửa sổ.',
        correctSentence: 'The mirror is opposite the window.',
        extraWords: ['of', 'at'],
        explanation: {
          vi: '"opposite" không cần thêm "of" hay "at".',
          en: '"Opposite" needs no other preposition.',
        },
      },
      {
        id: 'l2-vocab-07-test05',
        type: 'listen-choose',
        audioText: 'Mum: Where is my phone? Nam: It is on the sofa, under the newspaper.',
        question: 'Where is the phone?',
        options: ['On the sofa', 'On the shelf', 'In the cupboard', 'Under the carpet'],
        correctIndex: 0,
        explanation: {
          vi: '"on the sofa, under the newspaper" = trên ghế sofa, dưới tờ báo.',
          en: 'The phone is on the sofa.',
        },
      },
      {
        id: 'l2-vocab-07-test06',
        type: 'multiple-choice',
        question: 'How do we count "furniture"?',
        options: ['two furnitures', 'two furniture', 'two pieces of furniture', 'two furniture pieces of'],
        correctIndex: 2,
        explanation: {
          vi: 'Đếm danh từ không đếm được bằng "a piece of / two pieces of".',
          en: 'Use "pieces of furniture".',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 8 — NGHỀ NGHIỆP & NƠI LÀM VIỆC
   * Họ từ chỉ người: -er / -or / -ist / -ee; collocation: earn money,
   * work part-time, have a job interview, work as / work for.
   * ======================================================================== */
  {
    id: 'l2-vocab-08',
    skill: 'vocabulary',
    title: { vi: 'Nghề nghiệp & nơi làm việc', en: 'Jobs & the workplace' },
    description: {
      vi: 'Học từ về công việc, đồng nghiệp, lương và cụm như "earn money", "work part-time".',
      en: 'Learn words about work, colleagues and pay, with phrases like "earn money" and "work part-time".',
    },
    teachingCards: [
      {
        title: { vi: 'Đuôi chỉ người làm nghề', en: 'Job word endings' },
        body: {
          vi: '**-er**: teach → **teacher**, farm → **farmer**, manage → **manager**\n**-or**: act → **actor**, visit → **visitor**\n**-ist**: art → **artist**, science → **scientist**, dentist\n**employ** (thuê người làm) → **employer** (chủ, người thuê) ≠ **employee** (nhân viên, người được thuê)',
          en: '**-er**: teacher, farmer, manager\n**-or**: actor\n**-ist**: artist, scientist\n**employer** = the boss/company; **employee** = the worker',
        },
        examples: [
          { en: 'My aunt is a scientist. She works in a lab.', vi: 'Dì tôi là nhà khoa học. Dì làm việc trong phòng thí nghiệm.' },
          { en: 'The company has 200 employees.', vi: 'Công ty có 200 nhân viên.' },
        ],
      },
      {
        title: { vi: 'Collocation về công việc', en: 'Work collocations' },
        body: {
          vi: '**work as** + nghề: I work **as** a nurse. (làm nghề y tá)\n**work for** + công ty: She works **for** a bank. (làm cho ngân hàng)\n**earn money / earn a salary** = kiếm tiền / nhận lương\n**work part-time / full-time** = làm bán thời gian / toàn thời gian\n**have a job interview** = có buổi phỏng vấn xin việc\n**go to work / be at work** = đi làm / đang ở chỗ làm (không có "the")',
          en: '**work as** + job; **work for** + company\n**earn money**, **earn a salary**\n**work part-time / full-time**\n**have a job interview**\n**go to work**, **be at work** (no "the")',
        },
        examples: [
          { en: 'My father works as an engineer for a Japanese company.', vi: 'Bố tôi làm kỹ sư cho một công ty Nhật.' },
          { en: 'I’m going to have a job interview on Monday.', vi: 'Thứ Hai tôi sẽ đi phỏng vấn xin việc.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-office',
        word: 'office',
        ipa: '/ˈɒf.ɪs/',
        partOfSpeech: 'noun',
        meaningVi: 'văn phòng',
        definitionEn: 'A room or building where people work at desks.',
        examples: [
          { en: 'My mum works in an office in the city centre.', vi: 'Mẹ tôi làm việc ở một văn phòng trong trung tâm thành phố.' },
          { en: 'The office opens at 8 a.m.', vi: 'Văn phòng mở cửa lúc 8 giờ sáng.' },
        ],
      },
      {
        id: 'l2-w-colleague',
        word: 'colleague',
        ipa: '/ˈkɒl.iːɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'đồng nghiệp',
        definitionEn: 'A person you work with.',
        examples: [
          { en: 'I have lunch with my colleagues every day.', vi: 'Tôi ăn trưa với đồng nghiệp mỗi ngày.' },
          { en: 'My colleagues are friendly and helpful.', vi: 'Đồng nghiệp của tôi thân thiện và hay giúp đỡ.' },
        ],
        usageNote: {
          vi: 'Đọc 2 âm tiết: /ˈkɒl.iːɡ/ ("có-li-g"), chữ "ue" cuối câm.',
          en: 'Two syllables: COL-league. The "ue" is silent.',
        },
      },
      {
        id: 'l2-w-manager',
        word: 'manager',
        ipa: '/ˈmæn.ɪ.dʒər/',
        partOfSpeech: 'noun',
        meaningVi: 'quản lý, giám đốc (bộ phận)',
        definitionEn: 'A person who controls a team, a shop or part of a company.',
        examples: [
          { en: 'The manager of this restaurant is very young.', vi: 'Quản lý nhà hàng này rất trẻ.' },
          { en: 'I need to talk to my manager about my holiday.', vi: 'Tôi cần nói với quản lý về kỳ nghỉ của mình.' },
        ],
        usageNote: {
          vi: 'Họ từ: **manage** (quản lý — động từ) → **manager** (người quản lý) → **management** (sự quản lý).',
          en: 'Word family: manage, manager, management.',
        },
      },
      {
        id: 'l2-w-salary',
        word: 'salary',
        ipa: '/ˈsæl.ər.i/',
        partOfSpeech: 'noun',
        meaningVi: 'lương (tháng/năm)',
        definitionEn: 'The money you get every month for your job.',
        examples: [
          { en: 'Doctors usually have a high salary.', vi: 'Bác sĩ thường có lương cao.' },
          { en: 'She gets her salary at the end of the month.', vi: 'Cô ấy nhận lương vào cuối tháng.' },
        ],
        usageNote: {
          vi: 'Lương thì "high/low" (cao/thấp), giống "price". Collocation: **earn a salary**, **a good salary**.',
          en: 'A salary is high or low. Collocation: earn a good salary.',
        },
      },
      {
        id: 'l2-w-earn',
        word: 'earn',
        ipa: '/ɜːn/',
        partOfSpeech: 'verb',
        meaningVi: 'kiếm (tiền)',
        definitionEn: 'To get money because you work.',
        examples: [
          { en: 'He earns about ten million dong a month.', vi: 'Anh ấy kiếm khoảng mười triệu đồng một tháng.' },
          { en: 'I earned some money in the summer holiday.', vi: 'Tôi đã kiếm được ít tiền vào kỳ nghỉ hè.' },
        ],
        usageNote: {
          vi: 'Kiếm tiền = **earn money** hoặc **make money**. Đừng dịch "find money".',
          en: 'Say "earn money" or "make money", not "find money".',
        },
      },
      {
        id: 'l2-w-interview',
        word: 'interview',
        ipa: '/ˈɪn.tə.vjuː/',
        partOfSpeech: 'noun',
        meaningVi: 'buổi phỏng vấn',
        definitionEn: 'A meeting where someone asks you questions to see if you are right for a job.',
        examples: [
          { en: 'I have a job interview tomorrow morning.', vi: 'Sáng mai tôi có buổi phỏng vấn xin việc.' },
          { en: 'The interview went very well.', vi: 'Buổi phỏng vấn diễn ra rất tốt.' },
        ],
        usageNote: {
          vi: 'Họ từ: **interviewer** (người phỏng vấn) ≠ **interviewee** (người được phỏng vấn).',
          en: 'interviewer (asks questions) vs interviewee (answers).',
        },
      },
      {
        id: 'l2-w-part-time',
        word: 'part-time',
        ipa: '/ˌpɑːtˈtaɪm/',
        partOfSpeech: 'adjective, adverb',
        meaningVi: 'bán thời gian',
        definitionEn: 'Working only some hours of the day or some days of the week.',
        examples: [
          { en: 'Many students have part-time jobs.', vi: 'Nhiều sinh viên làm việc bán thời gian.' },
          { en: 'She works part-time in a coffee shop.', vi: 'Cô ấy làm bán thời gian ở một quán cà phê.' },
        ],
        usageNote: {
          vi: 'Ngược lại: **full-time** (toàn thời gian).',
          en: 'Opposite: full-time.',
        },
      },
      {
        id: 'l2-w-uniform',
        word: 'uniform',
        ipa: '/ˈjuː.nɪ.fɔːm/',
        partOfSpeech: 'noun',
        meaningVi: 'đồng phục',
        definitionEn: 'Special clothes that people wear at work or at school.',
        examples: [
          { en: 'Nurses wear a white uniform.', vi: 'Y tá mặc đồng phục màu trắng.' },
          { en: 'Do you have to wear a uniform at work?', vi: 'Bạn có phải mặc đồng phục ở chỗ làm không?' },
        ],
        usageNote: {
          vi: 'Bắt đầu bằng âm /j/ ("iu") nên dùng **a** uniform, KHÔNG phải "an uniform".',
          en: 'It starts with a /j/ sound, so we say "a uniform".',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-08-ex01',
        type: 'multiple-choice',
        question: 'A person you work with is your ___.',
        options: ['customer', 'colleague', 'employer', 'interviewer'],
        correctIndex: 1,
        explanation: {
          vi: '"colleague" = đồng nghiệp.',
          en: 'A colleague is someone you work with.',
        },
      },
      {
        id: 'l2-vocab-08-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'office', right: 'văn phòng' },
          { left: 'salary', right: 'lương' },
          { left: 'manager', right: 'quản lý' },
          { left: 'uniform', right: 'đồng phục' },
          { left: 'interview', right: 'buổi phỏng vấn' },
        ],
      },
      {
        id: 'l2-vocab-08-ex03',
        type: 'fill-blank',
        sentence: 'My sister works ___ a nurse in a big hospital.',
        acceptedAnswers: ['as'],
        explanation: {
          vi: '"work as" + nghề nghiệp: work as a nurse.',
          en: 'Use "work as" + a job.',
        },
      },
      {
        id: 'l2-vocab-08-ex04',
        type: 'arrange-words',
        translationVi: 'Anh ấy kiếm được nhiều tiền.',
        correctSentence: 'He earns a lot of money.',
        extraWords: ['finds', 'many'],
        explanation: {
          vi: '"earn money" = kiếm tiền; "money" không đếm được nên dùng "a lot of", không dùng "many".',
          en: '"Earn money"; "money" is uncountable.',
        },
      },
      {
        id: 'l2-vocab-08-ex05',
        type: 'listen-choose',
        audioText: 'I am a student, but I also work part-time in a bookshop on Saturdays and Sundays.',
        question: 'When does the speaker work?',
        options: ['Every day', 'At the weekend', 'In the evenings', 'On Mondays'],
        correctIndex: 1,
        explanation: {
          vi: '"on Saturdays and Sundays" = vào cuối tuần.',
          en: 'Saturdays and Sundays are the weekend.',
        },
      },
      {
        id: 'l2-vocab-08-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Police officers wear an uniform.',
          'Police officers wears a uniform.',
          'Police officer wear a uniform.',
          'Police officers wear a uniform.',
        ],
        correctIndex: 3,
        explanation: {
          vi: '"uniform" bắt đầu bằng âm /j/ nên dùng "a uniform". Chủ ngữ số nhiều "officers" → "wear" (không thêm -s).',
          en: '"Uniform" begins with a /j/ sound: a uniform.',
        },
      },
      {
        id: 'l2-vocab-08-ex07',
        type: 'listen-type',
        audioText: 'I have a job interview tomorrow.',
        acceptedAnswers: ['I have a job interview tomorrow.', "I've got a job interview tomorrow."],
        explanation: {
          vi: '"job interview" = phỏng vấn xin việc.',
          en: 'A job interview is a meeting for a new job.',
        },
      },
      {
        id: 'l2-vocab-08-ex08',
        type: 'fill-blank',
        sentence: 'She paints beautiful pictures. She is an ___.',
        acceptedAnswers: ['artist'],
        hint: '(art → ?)',
        explanation: {
          vi: 'art + -ist → artist (họa sĩ, nghệ sĩ).',
          en: 'A person who makes art is an artist.',
        },
      },
      {
        id: 'l2-vocab-08-ex09',
        type: 'speak-sentence',
        sentence: 'My colleagues are friendly and helpful.',
        translationVi: 'Đồng nghiệp của tôi thân thiện và hay giúp đỡ.',
        explanation: {
          vi: '"colleagues" đọc /ˈkɒl.iːɡz/ — chỉ 2 âm tiết.',
          en: '"Colleagues" has two syllables.',
        },
      },
      {
        id: 'l2-vocab-08-ex10',
        type: 'true-false',
        statement: 'An "employee" is the person or company that gives people jobs.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sai. Người thuê là "employer"; "employee" là nhân viên.',
          en: 'False. The employer gives jobs; the employee works.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-08-test01',
        type: 'multiple-choice',
        question: 'The money you get every month for your job is your ___.',
        options: ['salary', 'price', 'change', 'cash'],
        correctIndex: 0,
        explanation: {
          vi: '"salary" = lương hằng tháng.',
          en: 'Your monthly pay is your salary.',
        },
      },
      {
        id: 'l2-vocab-08-test02',
        type: 'fill-blank',
        sentence: 'He doesn’t work full-time. He works ___.',
        acceptedAnswers: ['part-time', 'part time'],
        explanation: {
          vi: 'Ngược với full-time là part-time (bán thời gian).',
          en: 'The opposite of full-time is part-time.',
        },
      },
      {
        id: 'l2-vocab-08-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với người làm nghề', en: 'Match the verbs with the people' },
        pairs: [
          { left: 'teach', right: 'teacher' },
          { left: 'act', right: 'actor' },
          { left: 'manage', right: 'manager' },
          { left: 'employ', right: 'employer' },
          { left: 'science', right: 'scientist' },
        ],
      },
      {
        id: 'l2-vocab-08-test04',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi làm việc cho một ngân hàng lớn.',
        correctSentence: 'My mother works for a big bank.',
        extraWords: ['as', 'to'],
        explanation: {
          vi: '"work for" + công ty/tổ chức.',
          en: 'Use "work for" + a company.',
        },
      },
      {
        id: 'l2-vocab-08-test05',
        type: 'listen-choose',
        audioText: 'Anna: How was your first day at work? Ben: Great! My manager is kind and my colleagues took me out for lunch.',
        question: 'Who took Ben out for lunch?',
        options: ['His manager', 'His family', 'His colleagues', 'His customers'],
        correctIndex: 2,
        explanation: {
          vi: '"my colleagues took me out for lunch" = đồng nghiệp đưa tôi đi ăn trưa.',
          en: 'His colleagues took him for lunch.',
        },
      },
      {
        id: 'l2-vocab-08-test06',
        type: 'multiple-choice',
        question: '"Kiếm tiền" in English is...',
        options: ['find money', 'win money', 'look money', 'earn money'],
        correctIndex: 3,
        explanation: {
          vi: 'Kiếm tiền (bằng công việc) = earn money.',
          en: 'You earn money by working.',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 9 — TRƯỜNG HỌC & HỌC TẬP
   * Collocation: do homework (không "make"), take / pass / fail an exam.
   * Họ từ: educate → education; bẫy library (thư viện) ≠ bookshop.
   * ======================================================================== */
  {
    id: 'l2-vocab-09',
    skill: 'vocabulary',
    title: { vi: 'Trường học & học tập', en: 'School & education' },
    description: {
      vi: 'Học từ về môn học, bài tập, thi cử và cụm như "do homework", "pass an exam".',
      en: 'Learn words about subjects, homework and exams, with phrases like "do homework" and "pass an exam".',
    },
    teachingCards: [
      {
        title: { vi: 'Collocation thi cử & bài tập', en: 'Exam and homework collocations' },
        body: {
          vi: '**do homework** = làm bài tập về nhà (KHÔNG nói "make homework")\n**take an exam** = đi thi, dự thi\n**pass an exam** = thi đỗ; **fail an exam** = thi trượt\n**revise for an exam** = ôn thi\n**get good marks** = được điểm cao\n**homework** không đếm được: "a lot of homework", không nói "homeworks".',
          en: '**do homework** (not "make")\n**take / pass / fail an exam**\n**revise for an exam**\n**get good marks**\n**homework** is uncountable: no "homeworks".',
        },
        examples: [
          { en: 'I am going to take my English exam next week.', vi: 'Tuần sau tôi sẽ thi tiếng Anh.' },
          { en: 'She revised hard and passed all her exams.', vi: 'Cô ấy ôn thi chăm chỉ và đã đỗ tất cả các kỳ thi.' },
        ],
      },
      {
        title: { vi: 'Môn học & họ từ', en: 'Subjects and word families' },
        body: {
          vi: 'Môn học (viết hoa chữ đầu): **Maths, Literature, History, Geography, Physics, Chemistry, Biology, PE** (thể dục), **IT** (tin học)\nHọ từ:\n**educate** (giáo dục) → **education** (nền giáo dục)\n**science** (khoa học) → **scientific** → **scientist**\n**history** (lịch sử) → **historical**\nChú ý: "Maths" có -s nhưng là số ít: "Maths **is** my favourite subject."',
          en: 'School subjects: Maths, Literature, History, Geography, Physics, Chemistry, Biology, PE, IT.\nWord families: educate → education; science → scientist.\n"Maths" ends in -s but is singular: "Maths is ..."',
        },
        examples: [
          { en: 'Maths is my favourite subject.', vi: 'Toán là môn học yêu thích của tôi.' },
          { en: 'Education is very important for children.', vi: 'Giáo dục rất quan trọng đối với trẻ em.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-subject',
        word: 'subject',
        ipa: '/ˈsʌb.dʒɪkt/',
        partOfSpeech: 'noun',
        meaningVi: 'môn học',
        definitionEn: 'Something you study at school, e.g. Maths or History.',
        examples: [
          { en: 'What is your favourite subject?', vi: 'Môn học yêu thích của bạn là gì?' },
          { en: 'We study twelve subjects this year.', vi: 'Năm nay chúng tôi học mười hai môn.' },
        ],
      },
      {
        id: 'l2-w-homework',
        word: 'homework',
        ipa: '/ˈhəʊm.wɜːk/',
        partOfSpeech: 'noun',
        meaningVi: 'bài tập về nhà',
        definitionEn: 'Work that your teacher gives you to do at home.',
        examples: [
          { en: 'I do my homework after dinner.', vi: 'Tôi làm bài tập về nhà sau bữa tối.' },
          { en: 'Our teacher gave us a lot of homework today.', vi: 'Hôm nay cô giáo giao cho chúng tôi rất nhiều bài tập.' },
        ],
        usageNote: {
          vi: 'Dùng **do** homework. Không đếm được: "much homework", không nói "homeworks" hay "a homework".',
          en: 'Do homework. Uncountable: no "homeworks".',
        },
      },
      {
        id: 'l2-w-exam',
        word: 'exam',
        ipa: '/ɪɡˈzæm/',
        partOfSpeech: 'noun',
        meaningVi: 'kỳ thi, bài thi',
        definitionEn: 'An important test of what you know.',
        examples: [
          { en: 'The final exams start in June.', vi: 'Các kỳ thi cuối kỳ bắt đầu vào tháng Sáu.' },
          { en: 'Did you pass your exam?', vi: 'Bạn thi đỗ chưa?' },
        ],
        usageNote: {
          vi: 'Collocation: **take / pass / fail an exam**, **revise for an exam**.',
          en: 'Take, pass, fail an exam; revise for an exam.',
        },
      },
      {
        id: 'l2-w-timetable',
        word: 'timetable',
        ipa: '/ˈtaɪmˌteɪ.bəl/',
        partOfSpeech: 'noun',
        meaningVi: 'thời khóa biểu; lịch chạy (tàu, xe)',
        definitionEn: 'A list of times when lessons happen, or when buses and trains leave.',
        examples: [
          { en: 'According to my timetable, we have English on Tuesday.', vi: 'Theo thời khóa biểu, chúng tôi học tiếng Anh vào thứ Ba.' },
          { en: 'Check the bus timetable before you leave.', vi: 'Hãy xem lịch xe buýt trước khi đi.' },
        ],
      },
      {
        id: 'l2-w-classmate',
        word: 'classmate',
        ipa: '/ˈklɑːs.meɪt/',
        partOfSpeech: 'noun',
        meaningVi: 'bạn cùng lớp',
        definitionEn: 'A person who is in the same class as you.',
        examples: [
          { en: 'I often study with my classmates after school.', vi: 'Tôi thường học cùng các bạn cùng lớp sau giờ học.' },
          { en: 'Linh is my classmate and my best friend.', vi: 'Linh là bạn cùng lớp và là bạn thân nhất của tôi.' },
        ],
      },
      {
        id: 'l2-w-library',
        word: 'library',
        ipa: '/ˈlaɪ.brər.i/',
        partOfSpeech: 'noun',
        meaningVi: 'thư viện',
        definitionEn: 'A place where you can read or borrow books for free.',
        examples: [
          { en: 'I borrowed two books from the school library.', vi: 'Tôi đã mượn hai cuốn sách ở thư viện trường.' },
          { en: 'The library is quieter than the classroom.', vi: 'Thư viện yên tĩnh hơn lớp học.' },
        ],
        usageNote: {
          vi: 'Thư viện là nơi **mượn** (borrow) sách. Nơi **mua** sách là **bookshop**. Số nhiều: librar**ies**.',
          en: 'You borrow books from a library; you buy books in a bookshop.',
        },
      },
      {
        id: 'l2-w-revise',
        word: 'revise',
        ipa: '/rɪˈvaɪz/',
        partOfSpeech: 'verb',
        meaningVi: 'ôn tập, ôn thi',
        definitionEn: 'To study again what you learned before an exam.',
        examples: [
          { en: 'I need to revise for my Maths test.', vi: 'Tôi cần ôn bài kiểm tra Toán.' },
          { en: 'We revised together at the library.', vi: 'Chúng tôi đã ôn bài cùng nhau ở thư viện.' },
        ],
        usageNote: {
          vi: 'Anh-Anh dùng **revise for** an exam (ôn thi). Danh từ: **revision**.',
          en: 'British English: revise for an exam. Noun: revision.',
        },
      },
      {
        id: 'l2-w-pass',
        word: 'pass',
        ipa: '/pɑːs/',
        partOfSpeech: 'verb',
        meaningVi: 'thi đỗ, vượt qua (kỳ thi)',
        definitionEn: 'To be successful in an exam or test.',
        examples: [
          { en: 'I hope I pass my driving test.', vi: 'Tôi hy vọng mình thi đỗ bằng lái xe.' },
          { en: 'All my classmates passed the exam.', vi: 'Tất cả các bạn cùng lớp tôi đều thi đỗ.' },
        ],
        usageNote: {
          vi: '"take an exam" = đi thi (chưa biết kết quả); "pass" = đỗ; ngược lại là **fail** (trượt).',
          en: '"Take" = do the exam; "pass" = succeed; "fail" = not succeed.',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-09-ex01',
        type: 'multiple-choice',
        question: 'You can borrow books for free at the ___.',
        options: ['library', 'bookshop', 'timetable', 'canteen'],
        correctIndex: 0,
        explanation: {
          vi: 'Mượn sách miễn phí ở thư viện (library). Bookshop là nơi mua sách.',
          en: 'You borrow books from a library.',
        },
      },
      {
        id: 'l2-vocab-09-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'subject', right: 'môn học' },
          { left: 'timetable', right: 'thời khóa biểu' },
          { left: 'classmate', right: 'bạn cùng lớp' },
          { left: 'revise', right: 'ôn tập' },
          { left: 'homework', right: 'bài tập về nhà' },
        ],
      },
      {
        id: 'l2-vocab-09-ex03',
        type: 'fill-blank',
        sentence: 'I always ___ my homework before I watch TV.',
        acceptedAnswers: ['do', 'finish'],
        hint: '(làm)',
        explanation: {
          vi: '"do homework" = làm bài tập về nhà (không dùng "make").',
          en: 'We do homework.',
        },
      },
      {
        id: 'l2-vocab-09-ex04',
        type: 'arrange-words',
        translationVi: 'Cô ấy ôn thi chăm chỉ và đã thi đỗ.',
        correctSentence: 'She revised hard and passed the exam.',
        extraWords: ['made', 'failed'],
        explanation: {
          vi: 'revise → revised, pass → passed (quá khứ có quy tắc).',
          en: 'Regular past simple: revised, passed.',
        },
      },
      {
        id: 'l2-vocab-09-ex05',
        type: 'listen-choose',
        audioText: 'My favourite subject is History because the stories are interesting. I don’t like Physics. It is the most difficult subject for me.',
        question: 'Which subject is the most difficult for the speaker?',
        options: ['History', 'Maths', 'Physics', 'English'],
        correctIndex: 2,
        explanation: {
          vi: '"Physics ... is the most difficult subject for me".',
          en: 'Physics is the most difficult subject for the speaker.',
        },
      },
      {
        id: 'l2-vocab-09-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Our teacher gave us many homeworks.',
          'Our teacher gave us a lot of homework.',
          'Our teacher gave us a homework.',
          'Our teacher made us many homework.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"homework" không đếm được → "a lot of homework".',
          en: '"Homework" is uncountable.',
        },
      },
      {
        id: 'l2-vocab-09-ex07',
        type: 'listen-type',
        audioText: 'Maths is my favourite subject.',
        acceptedAnswers: ['Maths is my favourite subject.', 'Math is my favorite subject.', 'Maths is my favorite subject.'],
        explanation: {
          vi: '"Maths" có -s nhưng là số ít → "is".',
          en: '"Maths" is singular.',
        },
      },
      {
        id: 'l2-vocab-09-ex08',
        type: 'fill-blank',
        sentence: 'Good ___ helps people get better jobs.',
        acceptedAnswers: ['education'],
        hint: '(educate → danh từ)',
        explanation: {
          vi: 'educate (động từ) → education (danh từ): nền giáo dục.',
          en: 'The noun of "educate" is "education".',
        },
      },
      {
        id: 'l2-vocab-09-ex09',
        type: 'speak-sentence',
        sentence: 'I borrowed two books from the school library.',
        translationVi: 'Tôi đã mượn hai cuốn sách ở thư viện trường.',
        explanation: {
          vi: '"library" đọc /ˈlaɪ.brər.i/ — chú ý âm "r" thứ hai.',
          en: 'Say "LI-brar-y", not "li-bry".',
        },
      },
      {
        id: 'l2-vocab-09-ex10',
        type: 'true-false',
        statement: 'If you fail an exam, you get a good result.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sai. "fail" = thi trượt, kết quả không tốt.',
          en: 'False. "Fail" means you are not successful.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-09-test01',
        type: 'multiple-choice',
        question: 'Before an exam, you should ___ your lessons.',
        options: ['pass', 'fail', 'borrow', 'revise'],
        correctIndex: 3,
        explanation: {
          vi: 'Trước khi thi nên ôn bài: revise.',
          en: 'You revise before an exam.',
        },
      },
      {
        id: 'l2-vocab-09-test02',
        type: 'fill-blank',
        sentence: 'Nam didn’t study, so he ___ the test.',
        acceptedAnswers: ['failed'],
        hint: '(trượt — quá khứ)',
        explanation: {
          vi: 'Không học → thi trượt: fail → failed.',
          en: 'He did not study, so he failed.',
        },
      },
      {
        id: 'l2-vocab-09-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối để tạo cụm từ đúng', en: 'Match to make correct phrases' },
        pairs: [
          { left: 'do', right: 'homework' },
          { left: 'take', right: 'an exam' },
          { left: 'get good', right: 'marks' },
          { left: 'revise for', right: 'a test' },
        ],
      },
      {
        id: 'l2-vocab-09-test04',
        type: 'arrange-words',
        translationVi: 'Thư viện yên tĩnh hơn lớp học.',
        correctSentence: 'The library is quieter than the classroom.',
        extraWords: ['more', 'quiet'],
        explanation: {
          vi: 'Tính từ ngắn "quiet" → quieter than.',
          en: 'Short adjective: quieter than.',
        },
      },
      {
        id: 'l2-vocab-09-test05',
        type: 'listen-choose',
        audioText: 'Teacher: Look at your timetable. This term, we have PE on Monday and Thursday afternoons.',
        question: 'When do they have PE?',
        options: ['Monday and Thursday afternoons', 'Every morning', 'Tuesday and Friday', 'Only on Monday'],
        correctIndex: 0,
        explanation: {
          vi: '"PE on Monday and Thursday afternoons" = thể dục vào chiều thứ Hai và thứ Năm.',
          en: 'PE is on Monday and Thursday afternoons.',
        },
      },
      {
        id: 'l2-vocab-09-test06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['Maths are difficult.', 'I make my homework.', 'Maths is difficult.', 'I bought a book at the library.'],
        correctIndex: 2,
        explanation: {
          vi: '"Maths" là số ít → "is". Phải là "do homework"; sách mua ở bookshop.',
          en: '"Maths" takes "is".',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 10 — KỲ NGHỈ & LỄ HỘI
   * Lễ hội Việt Nam bằng tiếng Anh: Tet, Mid-Autumn Festival; collocation:
   * go on holiday, visit relatives, watch fireworks; họ từ
   * celebrate → celebration, decorate → decoration, tradition → traditional.
   * ======================================================================== */
  {
    id: 'l2-vocab-10',
    skill: 'vocabulary',
    title: { vi: 'Kỳ nghỉ & lễ hội', en: 'Holidays & festivals' },
    description: {
      vi: 'Học cách kể về Tết, Trung thu, kỳ nghỉ và các cụm như "go on holiday", "visit relatives".',
      en: 'Learn to talk about Tet, the Mid-Autumn Festival and holidays, with phrases like "go on holiday".',
    },
    teachingCards: [
      {
        title: { vi: 'Họ từ: động từ → danh từ → tính từ', en: 'Word family: festivals' },
        body: {
          vi: '**celebrate** (ăn mừng, tổ chức) → **celebration** (lễ kỷ niệm)\n**decorate** (trang trí) → **decoration** (đồ trang trí)\n**tradition** (truyền thống — danh từ) → **traditional** (thuộc về truyền thống — tính từ)\nMẹo: đuôi **-ation / -tion** thường là danh từ; đuôi **-al** thường là tính từ.',
          en: '**celebrate** → **celebration**\n**decorate** → **decoration**\n**tradition** (noun) → **traditional** (adjective)\nTip: **-tion** often makes nouns; **-al** often makes adjectives.',
        },
        examples: [
          { en: 'We celebrate Tet in January or February.', vi: 'Chúng tôi đón Tết vào tháng Một hoặc tháng Hai.' },
          { en: 'Banh chung is a traditional Tet food.', vi: 'Bánh chưng là món ăn truyền thống ngày Tết.' },
        ],
      },
      {
        title: { vi: 'Collocation kỳ nghỉ & lễ hội', en: 'Holiday and festival collocations' },
        body: {
          vi: '**go on holiday** = đi nghỉ (KHÔNG nói "go to holiday")\n**be on holiday** = đang đi nghỉ\n**visit relatives** = thăm họ hàng\n**watch fireworks** = xem pháo hoa\n**give lucky money** = lì xì\n**decorate the house** = trang trí nhà cửa\nGiới từ: **at** Tet / **at** Christmas (dịp lễ), **on** New Year’s Day (một ngày cụ thể).',
          en: '**go on holiday**, **be on holiday**, **visit relatives**, **watch fireworks**, **give lucky money**, **decorate the house**\nPrepositions: **at** Tet / **at** Christmas; **on** New Year’s Day.',
        },
        examples: [
          { en: 'We are going to go on holiday to Phu Quoc next month.', vi: 'Tháng sau chúng tôi sẽ đi nghỉ ở Phú Quốc.' },
          { en: 'At Tet, children get lucky money from adults.', vi: 'Dịp Tết, trẻ em được người lớn lì xì.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2-w-festival',
        word: 'festival',
        ipa: '/ˈfes.tɪ.vəl/',
        partOfSpeech: 'noun',
        meaningVi: 'lễ hội',
        definitionEn: 'A special day or time when people celebrate something.',
        examples: [
          { en: 'The Mid-Autumn Festival is my favourite festival.', vi: 'Tết Trung thu là lễ hội tôi thích nhất.' },
          { en: 'There is a flower festival in Da Lat every two years.', vi: 'Cứ hai năm Đà Lạt lại có một lễ hội hoa.' },
        ],
      },
      {
        id: 'l2-w-celebrate',
        word: 'celebrate',
        ipa: '/ˈsel.ə.breɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'ăn mừng, tổ chức (lễ)',
        definitionEn: 'To do something special and enjoyable for an important day.',
        examples: [
          { en: 'How do you celebrate your birthday?', vi: 'Bạn tổ chức sinh nhật như thế nào?' },
          { en: 'We celebrated New Year with a big dinner.', vi: 'Chúng tôi đón năm mới bằng một bữa tối thịnh soạn.' },
        ],
        usageNote: {
          vi: 'Danh từ: **celebration** (lễ kỷ niệm, buổi ăn mừng).',
          en: 'Noun: celebration.',
        },
      },
      {
        id: 'l2-w-decorate',
        word: 'decorate',
        ipa: '/ˈdek.ə.reɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'trang trí',
        definitionEn: 'To make something look more beautiful by adding things to it.',
        examples: [
          { en: 'We decorate our house with peach flowers at Tet.', vi: 'Chúng tôi trang trí nhà bằng hoa đào dịp Tết.' },
          { en: 'The children decorated the classroom for Christmas.', vi: 'Bọn trẻ đã trang trí lớp học cho Giáng sinh.' },
        ],
        usageNote: {
          vi: 'Danh từ: **decoration** (đồ trang trí). Cấu trúc: decorate something **with** something.',
          en: 'Noun: decoration. Decorate something with something.',
        },
      },
      {
        id: 'l2-w-fireworks',
        word: 'fireworks',
        ipa: '/ˈfaɪə.wɜːks/',
        partOfSpeech: 'noun',
        meaningVi: 'pháo hoa',
        definitionEn: 'Things that explode in the sky with bright colours and loud noises.',
        examples: [
          { en: 'We watched the fireworks at midnight.', vi: 'Chúng tôi đã xem pháo hoa lúc nửa đêm.' },
          { en: 'The fireworks were more beautiful than last year.', vi: 'Pháo hoa năm nay đẹp hơn năm ngoái.' },
        ],
        usageNote: {
          vi: 'Thường dùng số nhiều: **watch the fireworks**, **a fireworks display** (màn bắn pháo hoa).',
          en: 'Usually plural: watch the fireworks.',
        },
      },
      {
        id: 'l2-w-traditional',
        word: 'traditional',
        ipa: '/trəˈdɪʃ.ən.əl/',
        partOfSpeech: 'adjective',
        meaningVi: 'truyền thống',
        definitionEn: 'Done or used in the same way for a very long time.',
        examples: [
          { en: 'The ao dai is the traditional dress of Vietnam.', vi: 'Áo dài là trang phục truyền thống của Việt Nam.' },
          { en: 'My grandmother cooks traditional food at Tet.', vi: 'Bà tôi nấu món truyền thống dịp Tết.' },
        ],
        usageNote: {
          vi: 'Danh từ: **tradition** (truyền thống). "It is a tradition" nhưng "a traditional dish".',
          en: 'Noun: tradition. "A tradition" vs "a traditional dish".',
        },
      },
      {
        id: 'l2-w-relative',
        word: 'relative',
        ipa: '/ˈrel.ə.tɪv/',
        partOfSpeech: 'noun',
        meaningVi: 'họ hàng, người thân',
        definitionEn: 'A person in your family, e.g. an uncle or a cousin.',
        examples: [
          { en: 'At Tet, we visit our relatives in the countryside.', vi: 'Dịp Tết, chúng tôi về quê thăm họ hàng.' },
          { en: 'I have a lot of relatives in Hue.', vi: 'Tôi có nhiều họ hàng ở Huế.' },
        ],
      },
      {
        id: 'l2-w-lantern',
        word: 'lantern',
        ipa: '/ˈlæn.tən/',
        partOfSpeech: 'noun',
        meaningVi: 'đèn lồng',
        definitionEn: 'A light inside a cover of paper, glass or metal.',
        examples: [
          { en: 'Children carry star lanterns at the Mid-Autumn Festival.', vi: 'Trẻ em rước đèn ông sao vào dịp Trung thu.' },
          { en: 'Hoi An is famous for its colourful lanterns.', vi: 'Hội An nổi tiếng với những chiếc đèn lồng đầy màu sắc.' },
        ],
      },
      {
        id: 'l2-w-holiday',
        word: 'holiday',
        ipa: '/ˈhɒl.ə.deɪ/',
        partOfSpeech: 'noun',
        meaningVi: 'kỳ nghỉ; ngày lễ',
        definitionEn: 'A time when you do not go to work or school, or when you travel for fun.',
        examples: [
          { en: 'Where did you go on holiday last summer?', vi: 'Hè năm ngoái bạn đi nghỉ ở đâu?' },
          { en: 'The summer holiday is the longest holiday of the year.', vi: 'Kỳ nghỉ hè là kỳ nghỉ dài nhất năm.' },
        ],
        usageNote: {
          vi: 'Anh-Anh: **go on holiday** (Anh-Mỹ: go on vacation). KHÔNG nói "go to holiday".',
          en: 'British English: go on holiday. Not "go to holiday".',
        },
      },
    ],
    exercises: [
      {
        id: 'l2-vocab-10-ex01',
        type: 'multiple-choice',
        question: 'Your uncles, aunts and cousins are your ___.',
        options: ['colleagues', 'classmates', 'neighbours', 'relatives'],
        correctIndex: 3,
        explanation: {
          vi: 'Cô, chú, anh chị em họ = họ hàng (relatives).',
          en: 'Family members like uncles and cousins are relatives.',
        },
      },
      {
        id: 'l2-vocab-10-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'festival', right: 'lễ hội' },
          { left: 'lantern', right: 'đèn lồng' },
          { left: 'fireworks', right: 'pháo hoa' },
          { left: 'decorate', right: 'trang trí' },
          { left: 'traditional', right: 'truyền thống' },
        ],
      },
      {
        id: 'l2-vocab-10-ex03',
        type: 'fill-blank',
        sentence: 'Next summer my family is going to go ___ holiday to Nha Trang.',
        acceptedAnswers: ['on'],
        explanation: {
          vi: 'Cụm cố định: "go on holiday" = đi nghỉ.',
          en: 'We say "go on holiday".',
        },
      },
      {
        id: 'l2-vocab-10-ex04',
        type: 'arrange-words',
        translationVi: 'Chúng tôi trang trí nhà bằng hoa đào.',
        correctSentence: 'We decorate our house with peach flowers.',
        extraWords: ['decoration', 'by'],
        explanation: {
          vi: 'decorate something **with** something. "decoration" là danh từ, không dùng làm động từ.',
          en: 'Decorate something with something.',
        },
      },
      {
        id: 'l2-vocab-10-ex05',
        type: 'listen-choose',
        audioText: 'Last Tet, I visited my grandparents in Nam Dinh. I got a lot of lucky money and we watched the fireworks at midnight.',
        question: 'Where did the speaker go last Tet?',
        options: ['To Nam Dinh', 'To Hanoi', 'To the beach', 'Abroad'],
        correctIndex: 0,
        explanation: {
          vi: '"I visited my grandparents in Nam Dinh" = về Nam Định thăm ông bà.',
          en: 'The speaker went to Nam Dinh.',
        },
      },
      {
        id: 'l2-vocab-10-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Ao dai is a tradition dress.',
          'Ao dai is a traditional dress.',
          'Ao dai is a traditionally dress.',
          'Ao dai is a traditions dress.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Trước danh từ "dress" cần tính từ: traditional.',
          en: 'We need an adjective before a noun: traditional.',
        },
      },
      {
        id: 'l2-vocab-10-ex07',
        type: 'listen-type',
        audioText: 'We watched the fireworks at midnight.',
        acceptedAnswers: ['We watched the fireworks at midnight.'],
        explanation: {
          vi: '"watch the fireworks" = xem pháo hoa; quá khứ: watched.',
          en: 'Past simple: watched.',
        },
      },
      {
        id: 'l2-vocab-10-ex08',
        type: 'fill-blank',
        sentence: 'There was a big ___ for my grandfather’s 80th birthday.',
        acceptedAnswers: ['celebration', 'party'],
        hint: '(celebrate → danh từ)',
        explanation: {
          vi: 'Sau "a big" cần danh từ: celebrate → celebration.',
          en: 'The noun of "celebrate" is "celebration".',
        },
      },
      {
        id: 'l2-vocab-10-ex09',
        type: 'speak-sentence',
        sentence: 'Children carry lanterns at the Mid-Autumn Festival.',
        translationVi: 'Trẻ em rước đèn lồng vào dịp Tết Trung thu.',
        explanation: {
          vi: '"Mid-Autumn Festival" = Tết Trung thu.',
          en: 'The Mid-Autumn Festival is a festival for children in Vietnam.',
        },
      },
      {
        id: 'l2-vocab-10-ex10',
        type: 'true-false',
        statement: 'In British English, "go on holiday" is correct, but "go to holiday" is not.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đúng. Cụm cố định là "go on holiday".',
          en: 'True. The fixed phrase is "go on holiday".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-vocab-10-test01',
        type: 'multiple-choice',
        question: '"Lì xì" in English is...',
        options: ['lucky money', 'happy money', 'red cash', 'gift change'],
        correctIndex: 0,
        explanation: {
          vi: 'Tiền lì xì = lucky money.',
          en: 'We call it "lucky money".',
        },
      },
      {
        id: 'l2-vocab-10-test02',
        type: 'fill-blank',
        sentence: 'Many people visit their ___ at Tet.',
        acceptedAnswers: ['relatives', 'families', 'grandparents'],
        hint: '(họ hàng)',
        explanation: {
          vi: '"visit relatives" = thăm họ hàng.',
          en: '"Visit relatives" is a common Tet activity.',
        },
      },
      {
        id: 'l2-vocab-10-test03',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với danh từ cùng họ', en: 'Match the words with their nouns' },
        pairs: [
          { left: 'celebrate', right: 'celebration' },
          { left: 'decorate', right: 'decoration' },
          { left: 'traditional', right: 'tradition' },
          { left: 'educate', right: 'education' },
        ],
      },
      {
        id: 'l2-vocab-10-test04',
        type: 'arrange-words',
        translationVi: 'Bạn đã đi nghỉ ở đâu vào hè năm ngoái?',
        correctSentence: 'Where did you go on holiday last summer?',
        extraWords: ['went', 'to'],
        explanation: {
          vi: 'Câu hỏi quá khứ: did + động từ nguyên mẫu (go, không phải went).',
          en: 'Past question: did + base verb (go).',
        },
      },
      {
        id: 'l2-vocab-10-test05',
        type: 'listen-choose',
        audioText: 'Mai: Are you going to watch the fireworks on New Year’s Eve? Tom: No, I am going to stay at home with my family and have a big dinner.',
        question: 'What is Tom going to do?',
        options: ['Watch the fireworks', 'Go on holiday', 'Have dinner at home', 'Visit his relatives'],
        correctIndex: 2,
        explanation: {
          vi: 'Tom nói sẽ ở nhà với gia đình và ăn bữa tối lớn.',
          en: 'Tom is going to stay home and have a big dinner.',
        },
      },
      {
        id: 'l2-vocab-10-test06',
        type: 'multiple-choice',
        question: 'Which preposition is correct? "We eat banh chung ___ Tet."',
        options: ['in', 'on', 'to', 'at'],
        correctIndex: 3,
        explanation: {
          vi: 'Dịp lễ dùng "at": at Tet, at Christmas.',
          en: 'We use "at" with festival periods: at Tet.',
        },
      },
    ],
  },
]
