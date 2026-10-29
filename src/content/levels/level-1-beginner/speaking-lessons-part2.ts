/**
 * speaking-lessons-part2.ts — LEVEL 1 (Band 0 – 2.0) — KỸ NĂNG NÓI, PHẦN 2
 * ----------------------------------------------------------------------------
 * Nối tiếp file speaking-lessons.ts (bài 1-4). File này có 6 bài (bài 5 → 10):
 *   - Bài 5 : Mô tả nhà của bạn (There is / There are)
 *   - Bài 6 : Nói về món ăn yêu thích (like / love + because)
 *   - Bài 7 : Thời tiết và các mùa (It's + tính từ)
 *   - Bài 8 : Đặt câu hỏi đơn giản (Wh- questions)
 *   - Bài 9 : Kể về cuối tuần (quá khứ đơn với động từ thường gặp)
 *   - Bài 10: Luyện IELTS Speaking Part 1 — quê hương & việc học / công việc
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ lý thuyết (ngữ pháp/câu mẫu + 1 thẻ mẹo phát âm cho người Việt)
 *   - exercises     : 10 bài luyện; đúng 1 bài "speak-answer" (AI chấm) ở cuối
 *   - miniTest      : 6 câu kiểm tra; đúng 1 câu "speak-answer" ở cuối
 *
 * Quy ước id: "l1-speak-<số bài>-ex<số>" và "l1-speak-<số bài>-test<số>".
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1SpeakingLessonsPart2: Lesson[] = [
  // ==========================================================================
  // BÀI 5: Mô tả nhà của bạn — There is / There are + tên các phòng
  // ==========================================================================
  {
    id: 'l1-speak-05',
    skill: 'speaking',
    title: { vi: 'Mô tả nhà của bạn', en: 'Describing your home' },
    description: {
      vi: 'Nói nhà bạn là nhà riêng hay căn hộ, có những phòng nào, bạn thích phòng nào.',
      en: 'Say if you live in a house or a flat, what rooms it has and your favourite room.',
    },
    teachingCards: [
      {
        title: { vi: 'There is / There are', en: 'There is / There are' },
        body: {
          vi: '**There is** + 1 vật (số ít): There **is** a kitchen. (Có một phòng bếp.)\n**There are** + nhiều vật (số nhiều): There **are** three bedrooms.\nPhủ định: There **isn\'t** a garden. / There **aren\'t** any balconies.\n**Lỗi hay gặp:** người Việt hay nói "**It has** two bedrooms" — vẫn đúng, nhưng "My house **has** two bedrooms" tự nhiên hơn. Đừng nói "**Have** two bedrooms in my house."',
          en: '**There is** + one thing: There **is** a kitchen.\n**There are** + more than one: There **are** three bedrooms.\nNegative: There **isn\'t** a garden. / There **aren\'t** any balconies.\n**Common mistake:** don\'t say "Have two bedrooms in my house." Say "There are two bedrooms" or "My house **has** two bedrooms."',
        },
        examples: [
          { en: 'There is a big kitchen.', vi: 'Có một phòng bếp lớn.' },
          { en: 'There are two bathrooms.', vi: 'Có hai phòng tắm.' },
          { en: "There isn't a garden.", vi: 'Không có vườn.' },
        ],
      },
      {
        title: { vi: 'Các phòng và từ mô tả', en: 'Rooms and describing words' },
        body: {
          vi: 'Loại nhà: **a house** (nhà riêng), **a flat / an apartment** (căn hộ)\nPhòng: **living room** (phòng khách), **bedroom** (phòng ngủ), **kitchen** (bếp), **bathroom** (phòng tắm), **balcony** (ban công)\nTính từ: **big / small**, **new / old**, **quiet** (yên tĩnh), **bright** (sáng sủa), **comfortable** (thoải mái)\nVị trí: **upstairs** (tầng trên), **downstairs** (tầng dưới), **next to** (bên cạnh)',
          en: 'Types: **a house**, **a flat / an apartment**\nRooms: **living room**, **bedroom**, **kitchen**, **bathroom**, **balcony**\nAdjectives: **big / small**, **new / old**, **quiet**, **bright**, **comfortable**\nPlace: **upstairs**, **downstairs**, **next to**',
        },
        examples: [
          { en: 'I live in a flat on the fifth floor.', vi: 'Tôi sống ở căn hộ tầng năm.' },
          { en: 'My bedroom is small but bright.', vi: 'Phòng ngủ của tôi nhỏ nhưng sáng sủa.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: "house" và "houses"', en: 'Pronunciation tip: "house" and "houses"' },
        body: {
          vi: '**house** đọc /haʊs/ — âm "ao" rồi kết thúc bằng âm **/s/** nhẹ như tiếng xì. Đừng đọc thành "hao".\nSố nhiều **houses** đọc /ˈhaʊzɪz/ — 2 âm tiết, âm /s/ đổi thành **/z/**: "HAO-zìz".\n**room** /ruːm/ — kéo dài "uu" và **ngậm môi** ở cuối (/m/).\n**kitchen** /ˈkɪtʃɪn/ — nhấn âm đầu: KIT-chen.',
          en: '**house** = /haʊs/ — end with a soft hissing **/s/**. Don\'t drop it.\n**houses** = /ˈhaʊzɪz/ — two syllables, and /s/ becomes **/z/**.\n**room** = /ruːm/ — a long "oo" and **close your lips** for /m/.\n**kitchen** = /ˈkɪtʃɪn/ — stress the first syllable: KIT-chen.',
        },
        examples: [
          { en: 'My house is near a park.', vi: 'Nhà tôi ở gần một công viên.' },
          { en: 'The houses on my street are old.', vi: 'Những ngôi nhà trên phố tôi đều cũ.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-05-ex01',
        type: 'speak-sentence',
        sentence: 'I live in a small flat.',
        translationVi: 'Tôi sống trong một căn hộ nhỏ.',
        explanation: {
          vi: 'Đọc rõ âm cuối /t/ trong "flat" – chặn hơi ở đầu lưỡi.',
          en: 'Say the final /t/ in "flat" clearly.',
        },
      },
      {
        id: 'l1-speak-05-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct word: "There ___ two bedrooms in my house."',
        options: ['is', 'am', 'be', 'are'],
        correctIndex: 3,
        explanation: {
          vi: '"two bedrooms" là số nhiều → dùng "There are".',
          en: '"two bedrooms" is plural → "There are".',
        },
      },
      {
        id: 'l1-speak-05-ex03',
        type: 'speak-sentence',
        sentence: 'There are three bedrooms in my house.',
        translationVi: 'Nhà tôi có ba phòng ngủ.',
        explanation: {
          vi: '"bedrooms" kết thúc bằng /mz/: ngậm môi rồi rung "zzz". "three" bắt đầu bằng /θ/ – đặt lưỡi giữa hai răng.',
          en: '"bedrooms" ends in /mz/. "three" starts with /θ/ – tongue between your teeth.',
        },
      },
      {
        id: 'l1-speak-05-ex04',
        type: 'fill-blank',
        sentence: 'There ___ a big kitchen downstairs.',
        acceptedAnswers: ['is', "'s"],
        hint: '(be)',
        explanation: {
          vi: '"a big kitchen" là số ít → "There is".',
          en: '"a big kitchen" is singular → "There is".',
        },
      },
      {
        id: 'l1-speak-05-ex05',
        type: 'speak-sentence',
        sentence: 'My favourite room is my bedroom.',
        translationVi: 'Căn phòng tôi thích nhất là phòng ngủ của tôi.',
        explanation: {
          vi: '"favourite" đọc 2 âm tiết: FAY-vrit. "room" kéo dài "uu" và ngậm môi ở cuối.',
          en: '"favourite" has two syllables: FAY-vrit. Close your lips at the end of "room".',
        },
      },
      {
        id: 'l1-speak-05-ex06',
        type: 'arrange-words',
        translationVi: 'Có một chiếc ghế sofa trong phòng khách.',
        correctSentence: 'There is a sofa in the living room.',
        extraWords: ['are', 'on'],
        explanation: {
          vi: '"a sofa" số ít → "There is". Ở trong phòng dùng "in".',
          en: '"a sofa" is singular → "There is". Use "in" for rooms.',
        },
      },
      {
        id: 'l1-speak-05-ex07',
        type: 'speak-sentence',
        sentence: 'The kitchen is next to the living room.',
        translationVi: 'Phòng bếp ở ngay cạnh phòng khách.',
        explanation: {
          vi: '"next to" đọc nối: "neks-tu". Nhấn âm đầu "KIT-chen", "LIV-ing".',
          en: '"next to" is linked: "neks-tu". Stress KIT-chen and LIV-ing.',
        },
      },
      {
        id: 'l1-speak-05-ex08',
        type: 'multiple-choice',
        question: 'Where do you usually cook dinner?',
        options: ['in the bathroom', 'in the bedroom', 'in the kitchen'],
        correctIndex: 2,
        explanation: {
          vi: 'kitchen = phòng bếp – nơi nấu ăn.',
          en: 'The kitchen is the room for cooking.',
        },
      },
      {
        id: 'l1-speak-05-ex09',
        type: 'speak-sentence',
        sentence: "It's quiet and very comfortable.",
        translationVi: 'Nó yên tĩnh và rất thoải mái.',
        explanation: {
          vi: '"quiet" có 2 âm tiết: KWAI-ət (khác "quite"). "comfortable" chỉ đọc 3 âm tiết: KUMF-tə-bəl.',
          en: '"quiet" has two syllables: KWAI-ət. "comfortable" is usually said with three: KUMF-tə-bəl.',
        },
      },
      {
        id: 'l1-speak-05-ex10',
        type: 'speak-answer',
        question: 'Describe your home. Is it a house or a flat? How many rooms are there? What is your favourite room?',
        tipsVi:
          'Nói 4–5 câu: loại nhà (I live in a house / a flat), có mấy phòng (There are ... / There is ...), phòng bạn thích nhất và lý do (My favourite room is ... because it is ...). Nhớ đọc rõ âm cuối /s/ và /z/.',
        sampleAnswer:
          'I live in a flat in Hanoi with my family. It is not very big. There are two bedrooms, a living room, a kitchen and a bathroom. My favourite room is my bedroom because it is quiet and bright. I like reading there.',
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt dùng đúng There is / There are, có tên phòng và một lý do đơn giản.',
          en: 'A good answer uses There is / There are correctly, names some rooms and gives a simple reason.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-05-test01',
        type: 'speak-sentence',
        sentence: 'My house has a small garden.',
        translationVi: 'Nhà tôi có một khu vườn nhỏ.',
        explanation: {
          vi: '"house" kết thúc /s/, "has" kết thúc /z/ – đọc rõ cả hai.',
          en: '"house" ends in /s/ and "has" ends in /z/.',
        },
      },
      {
        id: 'l1-speak-05-test02',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['There is a TV in my room.', 'There are a TV in my room.', 'There is two TVs in my room.', 'Have a TV in my room.'],
        correctIndex: 0,
        explanation: {
          vi: '"a TV" số ít → "There is". "two TVs" phải dùng "There are".',
          en: '"a TV" is singular → "There is". "two TVs" needs "There are".',
        },
      },
      {
        id: 'l1-speak-05-test03',
        type: 'arrange-words',
        translationVi: 'Tôi sống trong một căn hộ cùng bố mẹ.',
        correctSentence: 'I live in a flat with my parents.',
        extraWords: ['am', 'at'],
        explanation: {
          vi: '"live" đã là động từ, không thêm "am". Sống trong căn hộ: "live in a flat".',
          en: '"live" is the verb, so no "am". We say "live in a flat".',
        },
      },
      {
        id: 'l1-speak-05-test04',
        type: 'speak-sentence',
        sentence: 'The bathroom is upstairs.',
        translationVi: 'Phòng tắm ở tầng trên.',
        explanation: {
          vi: '"bathroom" có âm /θ/ – lưỡi giữa hai răng. "upstairs" nhấn âm sau: up-STAIRS.',
          en: '"bathroom" has /θ/. "upstairs" is stressed on STAIRS.',
        },
      },
      {
        id: 'l1-speak-05-test05',
        type: 'fill-blank',
        sentence: 'My bedroom ___ a big window.',
        acceptedAnswers: ['has'],
        hint: '(have)',
        explanation: {
          vi: 'Chủ ngữ số ít "My bedroom" → "has".',
          en: 'Singular subject "My bedroom" → "has".',
        },
      },
      {
        id: 'l1-speak-05-test06',
        type: 'speak-answer',
        question: 'What is your favourite room at home? Why do you like it?',
        tipsVi:
          'Bắt đầu bằng "My favourite room is ...". Nói phòng đó có gì (There is / There are ...) và vì sao bạn thích (because it is ... / because I can ...).',
        sampleAnswer:
          'My favourite room is the living room. There is a big sofa and a TV. I like it because my family watches films there together in the evening.',
        recordSeconds: 40,
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Nói về món ăn yêu thích — like / love / don't like + because
  // ==========================================================================
  {
    id: 'l1-speak-06',
    skill: 'speaking',
    title: { vi: 'Món ăn bạn thích', en: 'Talking about food you like' },
    description: {
      vi: 'Nói món ăn bạn thích, không thích, ăn thường xuyên và giải thích lý do bằng "because".',
      en: 'Say what food you like and don\'t like, what you often eat, and why.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói về món ăn yêu thích', en: 'Saying what food you like' },
        body: {
          vi: '**My favourite food is ...** – Món tôi thích nhất là ...\n**I love / I really like + món ăn** – Tôi rất thích ...\n**I don\'t like ...** – Tôi không thích ...\nNgôi thứ 3 số ít thêm **-s**: She **likes** / He **doesn\'t like**.\nThêm lý do bằng **because**: I love mangoes **because** they are sweet.',
          en: '**My favourite food is ...**\n**I love / I really like + food**\n**I don\'t like ...**\nHe / She: She **likes** / He **doesn\'t like**.\nGive a reason with **because**: I love mangoes **because** they are sweet.',
        },
        examples: [
          { en: 'My favourite food is pho.', vi: 'Món tôi thích nhất là phở.' },
          { en: "My dad doesn't like spicy food.", vi: 'Bố tôi không thích đồ cay.' },
        ],
      },
      {
        title: { vi: 'Vị của món ăn & mức độ thường xuyên', en: 'Tastes and how often' },
        body: {
          vi: 'Vị: **sweet** (ngọt), **sour** (chua), **salty** (mặn), **spicy** (cay), **bitter** (đắng)\nNhận xét: **delicious** (ngon), **healthy** (tốt cho sức khỏe)\nMức độ: **always** (luôn luôn) > **usually** (thường) > **often** (hay) > **sometimes** (thỉnh thoảng) > **never** (không bao giờ)\nVị trí: đứng **trước động từ thường**: I **often** eat rice.',
          en: 'Tastes: **sweet**, **sour**, **salty**, **spicy**, **bitter**\nOpinions: **delicious**, **healthy**\nHow often: **always** > **usually** > **often** > **sometimes** > **never**\nPut them **before the main verb**: I **often** eat rice.',
        },
        examples: [
          { en: 'I usually have bread and milk for breakfast.', vi: 'Tôi thường ăn bánh mì và uống sữa vào bữa sáng.' },
          { en: 'Lemons are sour.', vi: 'Chanh thì chua.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: /iː/ dài và /ɪ/ ngắn', en: 'Pronunciation tip: long /iː/ and short /ɪ/' },
        body: {
          vi: 'Tiếng Anh có **2 âm "i"**, người Việt hay đọc giống nhau:\n**/iː/ dài** – kéo dài, căng môi như cười: **eat, meat, cheese, beef, tea**\n**/ɪ/ ngắn** – nhanh, thả lỏng: **it, fish, chicken, milk, chips**\nSo sánh: **eat** /iːt/ (ăn) ≠ **it** /ɪt/ (nó); **sheep** (con cừu) ≠ **ship** (con tàu).\nNhớ đọc âm cuối: fis**h**, mil**k**, chip**s**.',
          en: 'English has **two "i" sounds**:\n**Long /iː/** – smile and make it long: **eat, meat, cheese, beef, tea**\n**Short /ɪ/** – quick and relaxed: **it, fish, chicken, milk, chips**\nCompare: **eat** /iːt/ ≠ **it** /ɪt/; **sheep** ≠ **ship**.\nSay the final sounds: fis**h**, mil**k**, chip**s**.',
        },
        examples: [
          { en: 'I eat fish and chicken.', vi: 'Tôi ăn cá và thịt gà.' },
          { en: 'I like cheese and tea.', vi: 'Tôi thích phô mai và trà.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-06-ex01',
        type: 'speak-sentence',
        sentence: 'My favourite food is pho.',
        translationVi: 'Món ăn tôi thích nhất là phở.',
        explanation: {
          vi: '"food" có âm "uu" dài /fuːd/ và âm cuối /d/ – đừng bỏ.',
          en: '"food" has a long /uː/ and a final /d/.',
        },
      },
      {
        id: 'l1-speak-06-ex02',
        type: 'multiple-choice',
        question: 'Choose the best word: "I don\'t like durian ___ it smells very strong."',
        options: ['because', 'and', 'but', 'so'],
        correctIndex: 0,
        explanation: {
          vi: '"because" (vì) dùng để nêu lý do.',
          en: '"because" gives a reason.',
        },
      },
      {
        id: 'l1-speak-06-ex03',
        type: 'speak-sentence',
        sentence: 'I often eat rice and fish for dinner.',
        translationVi: 'Tôi hay ăn cơm và cá vào bữa tối.',
        explanation: {
          vi: '"eat" là /iː/ dài, "fish" là /ɪ/ ngắn và kết thúc bằng /ʃ/ ("sh").',
          en: '"eat" has long /iː/; "fish" has short /ɪ/ and ends with /ʃ/.',
        },
      },
      {
        id: 'l1-speak-06-ex04',
        type: 'fill-blank',
        sentence: 'My sister ___ chicken very much.',
        acceptedAnswers: ['likes', 'loves'],
        hint: '(like)',
        explanation: {
          vi: '"My sister" = she → động từ thêm -s: likes.',
          en: '"My sister" = she → add -s: likes.',
        },
      },
      {
        id: 'l1-speak-06-ex05',
        type: 'speak-sentence',
        sentence: 'I love mangoes because they are sweet.',
        translationVi: 'Tôi rất thích xoài vì chúng ngọt.',
        explanation: {
          vi: '"mangoes" kết thúc bằng /z/; "sweet" là /iː/ dài, có âm cuối /t/.',
          en: '"mangoes" ends in /z/; "sweet" has a long /iː/ and a final /t/.',
        },
      },
      {
        id: 'l1-speak-06-ex06',
        type: 'multiple-choice',
        question: 'Which word describes chilli?',
        options: ['sweet', 'sour', 'spicy', 'salty'],
        correctIndex: 2,
        explanation: {
          vi: 'chilli (ớt) có vị cay = spicy.',
          en: 'Chilli is spicy.',
        },
      },
      {
        id: 'l1-speak-06-ex07',
        type: 'arrange-words',
        translationVi: 'Tôi không hay ăn thịt lắm.',
        correctSentence: "I don't eat meat very often.",
        extraWords: ["doesn't", 'eats'],
        explanation: {
          vi: '"I" đi với "don\'t" + động từ nguyên mẫu "eat".',
          en: '"I" goes with "don\'t" + base verb "eat".',
        },
      },
      {
        id: 'l1-speak-06-ex08',
        type: 'speak-sentence',
        sentence: 'Vegetables are good for you.',
        translationVi: 'Rau củ tốt cho sức khỏe của bạn.',
        explanation: {
          vi: '"vegetables" đọc 3 âm tiết: VEJ-tə-bəlz, nhấn âm đầu.',
          en: '"vegetables" is usually three syllables: VEJ-tə-bəlz.',
        },
      },
      {
        id: 'l1-speak-06-ex09',
        type: 'speak-sentence',
        sentence: 'I usually have bread and milk for breakfast.',
        translationVi: 'Tôi thường ăn bánh mì và uống sữa vào bữa sáng.',
        explanation: {
          vi: '"breakfast" đọc /ˈbrekfəst/ (BREK-fəst), không đọc "brếch-phát". "milk" có âm cuối /k/.',
          en: '"breakfast" = /ˈbrekfəst/. Say the final /k/ in "milk".',
        },
      },
      {
        id: 'l1-speak-06-ex10',
        type: 'speak-answer',
        question: "What food do you like? Is there any food you don't like? Why?",
        tipsVi:
          'Nói 4–5 câu: món thích nhất (My favourite food is ...), vì sao (because it is delicious / sweet ...), bạn ăn thường xuyên không (I often / sometimes eat ...), món không thích (I don\'t like ... because ...).',
        sampleAnswer:
          "My favourite food is bun cha. It is delicious and not very expensive. I often eat it with my friends after school. I don't like durian because it smells too strong.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt có cả "like" và "don\'t like", kèm lý do với "because".',
          en: 'A good answer has both "like" and "don\'t like", with reasons using "because".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-06-test01',
        type: 'speak-sentence',
        sentence: 'I really like Vietnamese food.',
        translationVi: 'Tôi rất thích đồ ăn Việt Nam.',
        explanation: {
          vi: '"really" đọc /ˈrɪəli/; "Vietnamese" nhấn âm cuối: viet-nə-MEEZ.',
          en: '"Vietnamese" is stressed at the end: viet-nə-MEEZ.',
        },
      },
      {
        id: 'l1-speak-06-test02',
        type: 'multiple-choice',
        question: '"What\'s your favourite food?" – Choose the best answer.',
        options: ['Yes, I do.', "I'm hungry.", 'My favourite food is spring rolls.', "It's eight o'clock."],
        correctIndex: 2,
        explanation: {
          vi: 'Câu hỏi "What" cần trả lời bằng thông tin cụ thể: tên món ăn.',
          en: 'A "What" question needs real information: the name of a food.',
        },
      },
      {
        id: 'l1-speak-06-test03',
        type: 'fill-blank',
        sentence: 'Lemons taste very ___.',
        acceptedAnswers: ['sour'],
        hint: '(chua)',
        explanation: {
          vi: 'sour = chua.',
          en: 'Lemons are sour.',
        },
      },
      {
        id: 'l1-speak-06-test04',
        type: 'speak-sentence',
        sentence: 'We eat a lot of rice in Vietnam.',
        translationVi: 'Ở Việt Nam chúng tôi ăn rất nhiều cơm.',
        explanation: {
          vi: 'Đọc nối "a lot of" thành "ə-lo-təv". "rice" có âm cuối /s/.',
          en: 'Link "a lot of" → "ə-lo-təv". "rice" ends in /s/.',
        },
      },
      {
        id: 'l1-speak-06-test05',
        type: 'arrange-words',
        translationVi: 'Em trai tôi không thích rau.',
        correctSentence: "My brother doesn't like vegetables.",
        extraWords: ["don't", 'likes'],
        explanation: {
          vi: '"My brother" = he → "doesn\'t like" (không thêm -s vào like).',
          en: '"My brother" = he → "doesn\'t like" (no -s on like).',
        },
      },
      {
        id: 'l1-speak-06-test06',
        type: 'speak-answer',
        question: 'What do you usually eat for breakfast? Do you like it?',
        tipsVi:
          'Dùng "I usually have / eat ... for breakfast." Nói bạn có thích không và vì sao. Có thể thêm bạn ăn ở đâu (at home / near my school).',
        sampleAnswer:
          'I usually have banh mi and a glass of milk for breakfast. I eat it near my school. I like it because it is quick and delicious.',
        recordSeconds: 40,
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Thời tiết và các mùa — It's + tính từ, in + mùa
  // ==========================================================================
  {
    id: 'l1-speak-07',
    skill: 'speaking',
    title: { vi: 'Thời tiết và các mùa', en: 'The weather and seasons' },
    description: {
      vi: 'Nói về thời tiết hôm nay, thời tiết ở quê bạn và mùa bạn thích.',
      en: 'Talk about today\'s weather, the weather in your hometown and your favourite season.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói về thời tiết: It\'s + tính từ', en: 'Talking about the weather: It\'s + adjective' },
        body: {
          vi: 'Hỏi: **What\'s the weather like?** / **How\'s the weather?** (Thời tiết thế nào?)\nTrả lời bằng **It\'s** + tính từ: It\'s **hot / cold / warm / cool**.\nTính từ từ danh từ + **-y**: sun → **sunny**, cloud → **cloudy**, wind → **windy**, rain → **rainy**.\nĐang mưa ngay lúc này: **It\'s raining.**\n**Lưu ý:** không nói "Today is very hot weather" → nói **"It\'s very hot today."**',
          en: 'Ask: **What\'s the weather like?** / **How\'s the weather?**\nAnswer with **It\'s** + adjective: It\'s **hot / cold / warm / cool**.\nNoun + **-y**: **sunny**, **cloudy**, **windy**, **rainy**.\nRain right now: **It\'s raining.**\n**Note:** say **"It\'s very hot today"**, not "Today is very hot weather".',
        },
        examples: [
          { en: "It's hot and sunny today.", vi: 'Hôm nay trời nóng và nắng.' },
          { en: "It's raining now.", vi: 'Bây giờ trời đang mưa.' },
        ],
      },
      {
        title: { vi: 'Các mùa ở Việt Nam', en: 'Seasons in Vietnam' },
        body: {
          vi: '4 mùa: **spring** (xuân), **summer** (hạ), **autumn** (thu – Anh-Anh; Anh-Mỹ là "fall"), **winter** (đông).\nMiền Nam có 2 mùa: **the rainy season** (mùa mưa) và **the dry season** (mùa khô).\nDùng **in** trước mùa và tháng: **in** summer, **in** July.\nVD: In the north of Vietnam, there are four seasons.',
          en: 'Four seasons: **spring**, **summer**, **autumn** (UK; "fall" in the US), **winter**.\nThe south has two: **the rainy season** and **the dry season**.\nUse **in** before seasons and months: **in** summer, **in** July.',
        },
        examples: [
          { en: 'My favourite season is autumn.', vi: 'Mùa tôi thích nhất là mùa thu.' },
          { en: 'It often rains in the summer.', vi: 'Mùa hè trời hay mưa.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: trọng âm và âm cuối', en: 'Pronunciation tip: stress and final sounds' },
        body: {
          vi: 'Hầu hết từ thời tiết 2 âm tiết **nhấn âm đầu**: **SUN**-ny, **CLOU**-dy, **WIN**-dy, **SUM**-mer, **WIN**-ter, **AU**-tumn.\n**autumn** /ˈɔːtəm/ – chữ "n" cuối **câm**, không đọc.\n**cold** /kəʊld/ – đọc rõ /ld/ ở cuối, đừng nói thành "câu".\n**weather** (thời tiết) và **whether** đọc giống nhau: /ˈweðə/.',
          en: 'Most two-syllable weather words are **stressed on the first syllable**: **SUN**-ny, **CLOU**-dy, **SUM**-mer, **WIN**-ter, **AU**-tumn.\n**autumn** /ˈɔːtəm/ – the final "n" is **silent**.\n**cold** /kəʊld/ – say the /ld/ at the end clearly.\n**weather** = /ˈweðə/.',
        },
        examples: [
          { en: "It's cold in winter.", vi: 'Mùa đông trời lạnh.' },
          { en: "It's cool in autumn.", vi: 'Mùa thu trời mát.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-07-ex01',
        type: 'speak-sentence',
        sentence: "It's hot and sunny today.",
        translationVi: 'Hôm nay trời nóng và nắng.',
        explanation: {
          vi: 'Nhấn "SUN-ny". Đọc rõ /t/ trong "hot" và "It\'s".',
          en: 'Stress SUN-ny. Say the /t/ in "hot" and "It\'s".',
        },
      },
      {
        id: 'l1-speak-07-ex02',
        type: 'multiple-choice',
        question: 'Water is falling from the sky right now. What do you say?',
        options: ["It's sunny.", "It's windy.", "It's snowing.", "It's raining."],
        correctIndex: 3,
        explanation: {
          vi: 'Mưa đang rơi lúc này → "It\'s raining."',
          en: 'Rain is falling now → "It\'s raining."',
        },
      },
      {
        id: 'l1-speak-07-ex03',
        type: 'speak-sentence',
        sentence: 'My favourite season is spring.',
        translationVi: 'Mùa tôi thích nhất là mùa xuân.',
        explanation: {
          vi: '"spring" bắt đầu bằng cụm /spr/ – đừng thêm âm "xờ" vào giữa. "season" có /z/: SEE-zən.',
          en: '"spring" starts with /spr/ – no extra vowel. "season" = SEE-zən.',
        },
      },
      {
        id: 'l1-speak-07-ex04',
        type: 'fill-blank',
        sentence: 'It often rains ___ the summer.',
        acceptedAnswers: ['in'],
        explanation: {
          vi: 'Dùng "in" trước mùa: in (the) summer.',
          en: 'Use "in" before seasons: in (the) summer.',
        },
      },
      {
        id: 'l1-speak-07-ex05',
        type: 'speak-sentence',
        sentence: 'In the south of Vietnam, there are two seasons.',
        translationVi: 'Ở miền Nam Việt Nam có hai mùa.',
        explanation: {
          vi: '"south" kết thúc bằng /θ/ – lưỡi giữa hai răng. "seasons" kết thúc bằng /z/.',
          en: '"south" ends with /θ/; "seasons" ends with /z/.',
        },
      },
      {
        id: 'l1-speak-07-ex06',
        type: 'arrange-words',
        translationVi: 'Mùa đông trời rất lạnh.',
        correctSentence: 'It is very cold in winter.',
        extraWords: ['on', 'are'],
        explanation: {
          vi: 'Nói thời tiết bắt đầu bằng "It is". Trước mùa dùng "in".',
          en: 'Weather sentences start with "It is". Use "in" before seasons.',
        },
      },
      {
        id: 'l1-speak-07-ex07',
        type: 'speak-sentence',
        sentence: "I don't like the rainy season.",
        translationVi: 'Tôi không thích mùa mưa.',
        explanation: {
          vi: '"don\'t like" đọc nối nhẹ, âm /t/ gần như chỉ chặn hơi. Nhấn "RAI-ny".',
          en: 'In "don\'t like" the /t/ is very short. Stress RAI-ny.',
        },
      },
      {
        id: 'l1-speak-07-ex08',
        type: 'multiple-choice',
        question: 'Which season comes after summer?',
        options: ['spring', 'autumn', 'winter'],
        correctIndex: 1,
        explanation: {
          vi: 'Thứ tự: spring → summer → autumn → winter.',
          en: 'Order: spring → summer → autumn → winter.',
        },
      },
      {
        id: 'l1-speak-07-ex09',
        type: 'speak-sentence',
        sentence: "It's cloudy and windy this morning.",
        translationVi: 'Sáng nay trời nhiều mây và có gió.',
        explanation: {
          vi: 'Nhấn âm đầu: CLOU-dy, WIN-dy. "morning" có âm cuối /ŋ/.',
          en: 'Stress CLOU-dy and WIN-dy. "morning" ends in /ŋ/.',
        },
      },
      {
        id: 'l1-speak-07-ex10',
        type: 'speak-answer',
        question: "What's the weather like in your hometown? Which season do you like best? Why?",
        tipsVi:
          'Nói 4–5 câu: quê bạn ở đâu, có mấy mùa (There are ... seasons), thời tiết thế nào (It\'s hot in summer...), mùa bạn thích nhất và lý do (because it is cool / I can ...).',
        sampleAnswer:
          "I'm from Hanoi. There are four seasons there. It's very hot in summer and quite cold in winter. My favourite season is autumn because it is cool and the sky is blue.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt dùng "It\'s + tính từ", "in + mùa" và có lý do với "because".',
          en: 'A good answer uses "It\'s + adjective", "in + season" and a reason with "because".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-07-test01',
        type: 'speak-sentence',
        sentence: 'The weather is nice today.',
        translationVi: 'Hôm nay thời tiết đẹp.',
        explanation: {
          vi: '"weather" có âm /ð/ – lưỡi chạm nhẹ răng trên, rung cổ họng.',
          en: '"weather" has /ð/ – tongue touches your top teeth, with voice.',
        },
      },
      {
        id: 'l1-speak-07-test02',
        type: 'multiple-choice',
        question: '"How\'s the weather today?" – Choose the best answer.',
        options: ["It's cool and cloudy.", "I'm fine, thanks.", "It's Monday.", 'Yes, it is.'],
        correctIndex: 0,
        explanation: {
          vi: '"I\'m fine" trả lời cho "How are you?", không phải câu hỏi thời tiết.',
          en: '"I\'m fine" answers "How are you?", not a weather question.',
        },
      },
      {
        id: 'l1-speak-07-test03',
        type: 'fill-blank',
        sentence: 'I like autumn ___ it is cool.',
        acceptedAnswers: ['because'],
        hint: '(vì)',
        explanation: {
          vi: '"because" dùng để nêu lý do.',
          en: '"because" gives a reason.',
        },
      },
      {
        id: 'l1-speak-07-test04',
        type: 'speak-sentence',
        sentence: 'We often go to the beach in summer.',
        translationVi: 'Chúng tôi hay đi biển vào mùa hè.',
        explanation: {
          vi: '"beach" là /iː/ dài và kết thúc /tʃ/ ("ch"). Giữ nguyên âm dài.',
          en: '"beach" has a long /iː/ and ends in /tʃ/. Keep the vowel long.',
        },
      },
      {
        id: 'l1-speak-07-test05',
        type: 'arrange-words',
        translationVi: 'Hôm nay thời tiết thế nào?',
        correctSentence: "What's the weather like today?",
        extraWords: ['How', 'is'],
        explanation: {
          vi: 'Mẫu câu: "What\'s the weather like?" – có "like" ở cuối.',
          en: 'Pattern: "What\'s the weather like?" – with "like" at the end.',
        },
      },
      {
        id: 'l1-speak-07-test06',
        type: 'speak-answer',
        question: 'Do you like hot weather or cold weather? Why?',
        tipsVi:
          'Chọn 1: "I like hot weather" hoặc "I prefer cold weather". Nêu 1–2 lý do bằng "because" và nói bạn thường làm gì vào thời tiết đó.',
        sampleAnswer:
          "I like cold weather because I don't sweat. In winter, I can wear my favourite jacket and drink hot chocolate with my friends.",
        recordSeconds: 40,
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Đặt câu hỏi đơn giản — Wh- questions
  // ==========================================================================
  {
    id: 'l1-speak-08',
    skill: 'speaking',
    title: { vi: 'Đặt câu hỏi với Wh-', en: 'Asking simple Wh- questions' },
    description: {
      vi: 'Dùng What, Where, When, Who, Why, How để hỏi và làm quen với người khác.',
      en: 'Use What, Where, When, Who, Why and How to ask questions and get to know people.',
    },
    teachingCards: [
      {
        title: { vi: 'Các từ để hỏi', en: 'Question words' },
        body: {
          vi: '**What** – cái gì · **Where** – ở đâu · **When** – khi nào\n**Who** – ai · **Why** – tại sao · **How** – như thế nào\n**How old** – bao nhiêu tuổi · **How many** – bao nhiêu (đếm được)\n**What time** – mấy giờ\nTrả lời "Why" bằng **Because ...**',
          en: '**What** – thing · **Where** – place · **When** – time\n**Who** – person · **Why** – reason · **How** – way / condition\n**How old** – age · **How many** – number\n**What time** – clock time\nAnswer "Why" with **Because ...**',
        },
        examples: [
          { en: 'Where do you live? – In Can Tho.', vi: 'Bạn sống ở đâu? – Ở Cần Thơ.' },
          { en: 'Why do you study English? – Because I want to travel.', vi: 'Sao bạn học tiếng Anh? – Vì mình muốn đi du lịch.' },
        ],
      },
      {
        title: { vi: 'Cấu trúc câu hỏi', en: 'How to build a question' },
        body: {
          vi: 'Với **to be**: Từ hỏi + **am/is/are** + chủ ngữ?\n→ Where **is** your school? / How old **are** you?\nVới **động từ thường**: Từ hỏi + **do/does** + chủ ngữ + động từ nguyên mẫu?\n→ Where **do** you live? / What **does** your mum do?\n**Lỗi hay gặp:** "Where you live?" (thiếu do) ✗ – "What does she likes?" (thừa -s) ✗',
          en: 'With **to be**: Wh- + **am/is/are** + subject?\n→ Where **is** your school? / How old **are** you?\nWith **other verbs**: Wh- + **do/does** + subject + base verb?\n→ Where **do** you live? / What **does** your mum do?\n**Common mistakes:** "Where you live?" ✗ – "What does she likes?" ✗',
        },
        examples: [
          { en: 'What does your father do?', vi: 'Bố bạn làm nghề gì?' },
          { en: 'When is your birthday?', vi: 'Sinh nhật bạn là khi nào?' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: ngữ điệu câu hỏi', en: 'Pronunciation tip: question intonation' },
        body: {
          vi: 'Câu hỏi **Wh-** thường **xuống giọng** ở cuối ↘: Where do you **live**↘?\nCâu hỏi **Yes/No** thường **lên giọng** ở cuối ↗: Do you like **music**↗?\nNgười Việt hay đọc đều đều như đọc thanh ngang — hãy **nhấn từ quan trọng nhất** (thường là từ cuối).\nTừ hỏi **Wh-** bắt đầu bằng âm /w/ – tròn môi: **wh**at, **wh**ere. Riêng **Who** đọc /huː/.',
          en: '**Wh-** questions usually **go down** at the end ↘: Where do you **live**↘?\n**Yes/No** questions usually **go up** ↗: Do you like **music**↗?\nDon\'t speak in a flat voice – **stress the most important word**.\nWh- words start with /w/ (round your lips): **wh**at, **wh**ere. But **Who** = /huː/.',
        },
        examples: [
          { en: 'What is your name? ↘', vi: 'Tên bạn là gì? (xuống giọng)' },
          { en: 'Are you a student? ↗', vi: 'Bạn là học sinh à? (lên giọng)' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-08-ex01',
        type: 'speak-sentence',
        sentence: "What's your name?",
        translationVi: 'Bạn tên là gì?',
        explanation: {
          vi: 'Xuống giọng ở "name"↘. Tròn môi khi đọc /w/ trong "What".',
          en: 'Go down on "name"↘. Round your lips for /w/ in "What".',
        },
      },
      {
        id: 'l1-speak-08-ex02',
        type: 'multiple-choice',
        question: '"___ do you live?" – "In Da Nang."',
        options: ['Where', 'What', 'When', 'Who'],
        correctIndex: 0,
        explanation: {
          vi: 'Trả lời là một nơi chốn → hỏi bằng "Where".',
          en: 'The answer is a place → "Where".',
        },
      },
      {
        id: 'l1-speak-08-ex03',
        type: 'speak-sentence',
        sentence: 'Where do you live?',
        translationVi: 'Bạn sống ở đâu?',
        explanation: {
          vi: 'Nhấn và xuống giọng ở "live"↘. "live" có /ɪ/ ngắn và âm cuối /v/.',
          en: 'Stress "live" and go down↘. "live" has short /ɪ/ and a final /v/.',
        },
      },
      {
        id: 'l1-speak-08-ex04',
        type: 'fill-blank',
        sentence: '"___ is your birthday?" – "It\'s in May."',
        acceptedAnswers: ['When'],
        explanation: {
          vi: 'Trả lời là thời gian (tháng Năm) → "When".',
          en: 'The answer is a time → "When".',
        },
      },
      {
        id: 'l1-speak-08-ex05',
        type: 'speak-sentence',
        sentence: 'What time do you get up?',
        translationVi: 'Bạn thức dậy lúc mấy giờ?',
        explanation: {
          vi: 'Đọc nối "get up" thành "ge-tup". Xuống giọng ở cuối câu.',
          en: 'Link "get up" → "ge-tup". Go down at the end.',
        },
      },
      {
        id: 'l1-speak-08-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ để hỏi với nghĩa tiếng Việt.', en: 'Match the question words with their Vietnamese meanings.' },
        pairs: [
          { left: 'What', right: 'cái gì' },
          { left: 'Where', right: 'ở đâu' },
          { left: 'When', right: 'khi nào' },
          { left: 'Who', right: 'ai' },
          { left: 'Why', right: 'tại sao' },
          { left: 'How', right: 'như thế nào' },
        ],
        explanation: {
          vi: 'Sáu từ để hỏi cơ bản nhất trong tiếng Anh.',
          en: 'The six most basic question words in English.',
        },
      },
      {
        id: 'l1-speak-08-ex07',
        type: 'speak-sentence',
        sentence: 'Who is your best friend?',
        translationVi: 'Bạn thân nhất của bạn là ai?',
        explanation: {
          vi: '"Who" đọc /huː/ (không có âm /w/). "best friend" đọc rõ /st/ và /nd/.',
          en: '"Who" = /huː/. Say the /st/ in "best" and /nd/ in "friend".',
        },
      },
      {
        id: 'l1-speak-08-ex08',
        type: 'arrange-words',
        translationVi: 'Tại sao bạn học tiếng Anh?',
        correctSentence: 'Why do you study English?',
        extraWords: ['does', 'studies'],
        explanation: {
          vi: '"you" đi với "do", sau đó là động từ nguyên mẫu "study".',
          en: '"you" goes with "do", then the base verb "study".',
        },
      },
      {
        id: 'l1-speak-08-ex09',
        type: 'multiple-choice',
        question: '"___ brothers and sisters do you have?" – "Two."',
        options: ['How much', 'How old', 'How many', 'How long'],
        correctIndex: 2,
        explanation: {
          vi: 'Hỏi số lượng người/vật đếm được → "How many".',
          en: 'For a number of countable things → "How many".',
        },
      },
      {
        id: 'l1-speak-08-ex10',
        type: 'speak-answer',
        question: 'You meet a new classmate. Ask him or her three or four questions to get to know them.',
        tipsVi:
          'Dùng nhiều từ hỏi khác nhau: What, Where, How old, Why... Nhớ có "do/does" với động từ thường và xuống giọng ở cuối câu hỏi Wh-.',
        sampleAnswer:
          "Hi! What's your name? How old are you? Where do you live? What do you like doing at the weekend?",
        recordSeconds: 40,
        explanation: {
          vi: 'Câu hỏi tốt có trật tự đúng: từ hỏi + do/is/are + chủ ngữ.',
          en: 'Good questions use the right order: Wh- + do/is/are + subject.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-08-test01',
        type: 'speak-sentence',
        sentence: 'How old are you?',
        translationVi: 'Bạn bao nhiêu tuổi?',
        explanation: {
          vi: '"old" đọc rõ /ld/ ở cuối, nối với "are": "ol-dar".',
          en: 'Say the /ld/ in "old" and link it to "are".',
        },
      },
      {
        id: 'l1-speak-08-test02',
        type: 'multiple-choice',
        question: '"Why do you like football?" – Choose the best answer.',
        options: ['On Sundays.', 'At the park.', "Because it's exciting.", 'With my brother.'],
        correctIndex: 2,
        explanation: {
          vi: 'Câu hỏi "Why" cần lý do → "Because ...".',
          en: 'A "Why" question needs a reason → "Because ...".',
        },
      },
      {
        id: 'l1-speak-08-test03',
        type: 'fill-blank',
        sentence: '"___ does your father do?" – "He\'s a doctor."',
        acceptedAnswers: ['What'],
        explanation: {
          vi: '"What does ... do?" = hỏi nghề nghiệp.',
          en: '"What does ... do?" asks about someone\'s job.',
        },
      },
      {
        id: 'l1-speak-08-test04',
        type: 'speak-sentence',
        sentence: 'When do you go to school?',
        translationVi: 'Bạn đi học lúc nào?',
        explanation: {
          vi: 'Xuống giọng ở "school"↘. "school" có /sk/ ở đầu – không thêm âm "xờ".',
          en: 'Go down on "school"↘. Start with a clean /sk/.',
        },
      },
      {
        id: 'l1-speak-08-test05',
        type: 'arrange-words',
        translationVi: 'Chị gái bạn làm việc ở đâu?',
        correctSentence: 'Where does your sister work?',
        extraWords: ['do', 'works'],
        explanation: {
          vi: '"your sister" = she → "does", rồi động từ nguyên mẫu "work" (không thêm -s).',
          en: '"your sister" = she → "does" + base verb "work".',
        },
      },
      {
        id: 'l1-speak-08-test06',
        type: 'speak-answer',
        question: 'Answer these questions: What is your name? Where do you live? Why do you learn English?',
        tipsVi:
          'Trả lời đủ 3 câu, mỗi câu 1–2 ý. Với "Why" hãy bắt đầu bằng "Because ...".',
        sampleAnswer:
          "My name is Hieu. I live in Bien Hoa, near Ho Chi Minh City. I learn English because I want to study abroad and make friends from other countries.",
        recordSeconds: 40,
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Kể về cuối tuần — quá khứ đơn với động từ thường gặp
  // ==========================================================================
  {
    id: 'l1-speak-09',
    skill: 'speaking',
    title: { vi: 'Kể về cuối tuần của bạn', en: 'Talking about your weekend' },
    description: {
      vi: 'Dùng thì quá khứ đơn với các động từ thường gặp để kể cuối tuần vừa rồi.',
      en: 'Use the past simple with common verbs to talk about last weekend.',
    },
    teachingCards: [
      {
        title: { vi: 'Thì quá khứ đơn (Past simple)', en: 'The past simple' },
        body: {
          vi: 'Dùng để kể việc **đã xảy ra và đã kết thúc**.\nĐộng từ có quy tắc: thêm **-ed**: play → **played**, watch → **watched**, visit → **visited**.\nĐộng từ bất quy tắc phải học thuộc: **go → went**, **have → had**, **see → saw**, **eat → ate**, **do → did**, **buy → bought**.\nPhủ định: **didn\'t** + nguyên mẫu: I **didn\'t go** out.\nCâu hỏi: **What did you do** last weekend?',
          en: 'For actions that **happened and finished** in the past.\nRegular verbs add **-ed**: **played**, **watched**, **visited**.\nIrregular verbs: **go → went**, **have → had**, **see → saw**, **eat → ate**, **do → did**, **buy → bought**.\nNegative: **didn\'t** + base verb: I **didn\'t go** out.\nQuestion: **What did you do** last weekend?',
        },
        examples: [
          { en: 'I visited my grandparents.', vi: 'Tôi đã đến thăm ông bà.' },
          { en: 'We went to the cinema.', vi: 'Chúng tôi đã đi xem phim.' },
          { en: "I didn't go out on Sunday.", vi: 'Chủ nhật tôi không ra ngoài.' },
        ],
      },
      {
        title: { vi: 'Từ chỉ thời gian quá khứ', en: 'Past time words' },
        body: {
          vi: '**last weekend** – cuối tuần trước · **last Saturday** – thứ Bảy tuần trước\n**yesterday** – hôm qua · **on Saturday morning** – sáng thứ Bảy\nNối các việc: **First, ... Then, ... After that, ... In the evening, ...**\nKết thúc bằng cảm nhận: **It was fun / great / relaxing.** (Thật vui / tuyệt / thư giãn.)',
          en: '**last weekend** · **last Saturday** · **yesterday** · **on Saturday morning**\nLink actions: **First, ... Then, ... After that, ... In the evening, ...**\nEnd with a feeling: **It was fun / great / relaxing.**',
        },
        examples: [
          { en: 'First, I cleaned my room. Then I played games.', vi: 'Đầu tiên tôi dọn phòng. Sau đó tôi chơi game.' },
          { en: 'It was a relaxing weekend.', vi: 'Đó là một cuối tuần thư giãn.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đuôi -ed có 3 cách đọc', en: 'Pronunciation tip: three ways to say -ed' },
        body: {
          vi: 'Người Việt hay **bỏ hẳn đuôi -ed** → nghe như thì hiện tại. Hãy đọc rõ:\n**/t/** sau âm vô thanh (k, p, s, sh, ch, f): watch**ed** /wɒtʃt/, cook**ed**, help**ed**\n**/d/** sau âm hữu thanh và nguyên âm: play**ed** /pleɪd/, clean**ed**, stay**ed**\n**/ɪd/** sau **t** hoặc **d** – thêm 1 âm tiết: visit**ed** /ˈvɪzɪtɪd/, need**ed**\nĐừng đọc "watched" thành 2 âm tiết "watch-ed"!',
          en: 'Don\'t drop **-ed** – it shows the past!\n**/t/** after voiceless sounds (k, p, s, sh, ch, f): watch**ed** /wɒtʃt/, cook**ed**, help**ed**\n**/d/** after voiced sounds and vowels: play**ed** /pleɪd/, clean**ed**, stay**ed**\n**/ɪd/** after **t** or **d** – an extra syllable: visit**ed**, need**ed**\n"watched" has only one syllable!',
        },
        examples: [
          { en: 'I watched a film.', vi: 'Tôi đã xem một bộ phim. (/t/)' },
          { en: 'We played badminton.', vi: 'Chúng tôi đã chơi cầu lông. (/d/)' },
          { en: 'They visited a museum.', vi: 'Họ đã thăm một bảo tàng. (/ɪd/)' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-09-ex01',
        type: 'speak-sentence',
        sentence: 'Last weekend, I visited my grandparents.',
        translationVi: 'Cuối tuần trước, tôi đã đến thăm ông bà.',
        explanation: {
          vi: '"visited" đọc 3 âm tiết: VI-zi-tid (đuôi /ɪd/). "Last" đọc rõ /st/.',
          en: '"visited" has three syllables: VI-zi-tid (/ɪd/).',
        },
      },
      {
        id: 'l1-speak-09-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct word: "Yesterday I ___ to the cinema."',
        options: ['go', 'goes', 'went', 'going'],
        correctIndex: 2,
        explanation: {
          vi: '"Yesterday" (hôm qua) → quá khứ: go → went.',
          en: '"Yesterday" → past simple: go → went.',
        },
      },
      {
        id: 'l1-speak-09-ex03',
        type: 'speak-sentence',
        sentence: 'I watched a film with my friends.',
        translationVi: 'Tôi đã xem một bộ phim cùng các bạn.',
        explanation: {
          vi: '"watched" chỉ 1 âm tiết, đuôi /t/: "wotcht". "friends" kết thúc /ndz/.',
          en: '"watched" is one syllable ending in /t/. "friends" ends in /ndz/.',
        },
      },
      {
        id: 'l1-speak-09-ex04',
        type: 'fill-blank',
        sentence: 'On Sunday, we ___ lunch at a restaurant.',
        acceptedAnswers: ['had'],
        hint: '(have)',
        explanation: {
          vi: 'have → had (bất quy tắc).',
          en: 'have → had (irregular).',
        },
      },
      {
        id: 'l1-speak-09-ex05',
        type: 'speak-sentence',
        sentence: 'We played badminton in the park.',
        translationVi: 'Chúng tôi đã chơi cầu lông trong công viên.',
        explanation: {
          vi: '"played" đuôi /d/: "pleid", chỉ 1 âm tiết. Nhấn "BAD-min-tən".',
          en: '"played" ends in /d/ – one syllable. Stress BAD-min-tən.',
        },
      },
      {
        id: 'l1-speak-09-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng quá khứ của nó.', en: 'Match each verb with its past form.' },
        pairs: [
          { left: 'go', right: 'went' },
          { left: 'have', right: 'had' },
          { left: 'see', right: 'saw' },
          { left: 'eat', right: 'ate' },
          { left: 'do', right: 'did' },
          { left: 'buy', right: 'bought' },
        ],
        explanation: {
          vi: 'Đây là 6 động từ bất quy tắc dùng rất nhiều khi kể cuối tuần.',
          en: 'Six irregular verbs you use a lot when talking about your weekend.',
        },
      },
      {
        id: 'l1-speak-09-ex07',
        type: 'speak-sentence',
        sentence: 'I stayed at home and cleaned my room.',
        translationVi: 'Tôi đã ở nhà và dọn phòng của mình.',
        explanation: {
          vi: '"stayed" và "cleaned" đều đuôi /d/. Nối "stayed at" thành "stay-dat".',
          en: '"stayed" and "cleaned" both end in /d/. Link "stayed at" → "stay-dat".',
        },
      },
      {
        id: 'l1-speak-09-ex08',
        type: 'multiple-choice',
        question: 'Which word has an extra syllable /ɪd/ at the end?',
        options: ['visited', 'played', 'watched', 'cleaned'],
        correctIndex: 0,
        explanation: {
          vi: '"visit" kết thúc bằng /t/ → thêm -ed đọc /ɪd/: VI-zi-tid.',
          en: '"visit" ends in /t/, so -ed = /ɪd/: VI-zi-tid.',
        },
      },
      {
        id: 'l1-speak-09-ex09',
        type: 'arrange-words',
        translationVi: 'Cuối tuần trước bạn đã làm gì?',
        correctSentence: 'What did you do last weekend?',
        extraWords: ['does', 'went'],
        explanation: {
          vi: 'Câu hỏi quá khứ: What + did + chủ ngữ + động từ nguyên mẫu (do).',
          en: 'Past question: What + did + subject + base verb (do).',
        },
      },
      {
        id: 'l1-speak-09-ex10',
        type: 'speak-answer',
        question: 'What did you do last weekend?',
        tipsVi:
          'Kể 4–5 câu theo thứ tự: On Saturday morning, I ... Then I ... In the evening, ... On Sunday, ... Kết thúc bằng cảm nhận: It was fun / relaxing. Nhớ dùng động từ quá khứ và đọc rõ đuôi -ed.',
        sampleAnswer:
          'On Saturday morning, I cleaned my room and helped my mum. In the afternoon, I played badminton with my brother. On Sunday, we visited my grandparents and had lunch together. It was a relaxing weekend.',
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt dùng đúng quá khứ đơn và có từ nối thời gian.',
          en: 'A good answer uses the past simple correctly and has time linkers.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-09-test01',
        type: 'speak-sentence',
        sentence: 'I went shopping with my mum.',
        translationVi: 'Tôi đã đi mua sắm cùng mẹ.',
        explanation: {
          vi: '"went" đọc rõ /nt/ ở cuối. "shopping" bắt đầu bằng /ʃ/ ("sh"), không phải /s/.',
          en: 'Say the /nt/ in "went". "shopping" starts with /ʃ/.',
        },
      },
      {
        id: 'l1-speak-09-test02',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I go to the beach last Sunday.', 'I goed to the beach last Sunday.', 'I going to the beach last Sunday.', 'I went to the beach last Sunday.'],
        correctIndex: 3,
        explanation: {
          vi: '"last Sunday" → quá khứ. go là động từ bất quy tắc: went (không phải "goed").',
          en: '"last Sunday" → past. go is irregular: went (not "goed").',
        },
      },
      {
        id: 'l1-speak-09-test03',
        type: 'fill-blank',
        sentence: 'My brother ___ a new bike yesterday.',
        acceptedAnswers: ['bought'],
        hint: '(buy)',
        explanation: {
          vi: 'buy → bought (bất quy tắc).',
          en: 'buy → bought (irregular).',
        },
      },
      {
        id: 'l1-speak-09-test04',
        type: 'speak-sentence',
        sentence: 'We had a great time.',
        translationVi: 'Chúng tôi đã có khoảng thời gian rất vui.',
        explanation: {
          vi: '"had" đọc rõ /d/; nối "had a" thành "ha-də".',
          en: 'Say the /d/ in "had" and link it: "ha-də".',
        },
      },
      {
        id: 'l1-speak-09-test05',
        type: 'arrange-words',
        translationVi: 'Thứ Bảy tôi đã không ra ngoài.',
        correctSentence: "I didn't go out on Saturday.",
        extraWords: ["don't", 'went'],
        explanation: {
          vi: 'Phủ định quá khứ: didn\'t + động từ nguyên mẫu (go, không phải went).',
          en: 'Past negative: didn\'t + base verb (go, not went).',
        },
      },
      {
        id: 'l1-speak-09-test06',
        type: 'speak-answer',
        question: 'Tell me about a fun day last month. Where did you go and who did you go with?',
        tipsVi:
          'Dùng quá khứ đơn: I went to ... with ... We ... (played / ate / saw ...). Kết thúc bằng: It was great / fun because ...',
        sampleAnswer:
          'Last month, I went to Vung Tau with my family. We swam in the sea and ate a lot of seafood. In the evening, we walked on the beach. It was great because the weather was very nice.',
        recordSeconds: 45,
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Luyện IELTS Speaking Part 1 — quê hương & việc học / công việc
  // ==========================================================================
  {
    id: 'l1-speak-10',
    skill: 'speaking',
    title: { vi: 'IELTS Part 1: Quê hương và việc học/làm', en: 'IELTS Part 1: Hometown and work/studies' },
    description: {
      vi: 'Luyện trả lời 2 chủ đề luôn có trong IELTS Speaking Part 1: quê hương và việc học / công việc.',
      en: 'Practise two topics that are always in IELTS Speaking Part 1: your hometown and your work or studies.',
    },
    teachingCards: [
      {
        title: { vi: 'Trả lời Part 1: Câu trả lời + Lý do/Chi tiết', en: 'Part 1 answers: Answer + Reason/Detail' },
        body: {
          vi: 'Part 1 kéo dài 4–5 phút, giám khảo hỏi về **bản thân bạn**.\nĐầu tiên thường là: **Do you work or are you a student?** và **Where is your hometown?**\nCông thức dễ nhớ: **Trả lời trực tiếp + 1 lý do/chi tiết** (2–3 câu).\n✗ "Yes." (quá ngắn)\n✓ "Yes, I do. I like my hometown **because** the people are very friendly."',
          en: 'Part 1 lasts 4–5 minutes and is about **you**.\nIt usually starts with: **Do you work or are you a student?** and **Where is your hometown?**\nEasy formula: **Direct answer + 1 reason/detail** (2–3 sentences).\n✗ "Yes." (too short)\n✓ "Yes, I do. I like my hometown **because** the people are very friendly."',
        },
        examples: [
          { en: 'Do you like your hometown? – Yes, I do. It is quiet and the food is great.', vi: 'Bạn có thích quê mình không? – Có. Ở đó yên tĩnh và đồ ăn rất ngon.' },
        ],
      },
      {
        title: { vi: 'Câu mẫu hữu ích', en: 'Useful sentences' },
        body: {
          vi: 'Quê hương:\n**I come from ... / My hometown is ...** – Tôi đến từ ...\n**It\'s in the north / south / centre of Vietnam.**\n**It\'s famous for ...** – Nổi tiếng về ...\nViệc học / công việc:\n**I\'m a student at ...** / **I\'m in Year 10 / my second year at university.**\n**My major is ...** (chuyên ngành) / **My favourite subject is ...**\n**I work as a ...** (làm nghề) / **I work for ...** (làm cho công ty)',
          en: 'Hometown:\n**I come from ... / My hometown is ...**\n**It\'s in the north / south / centre of Vietnam.**\n**It\'s famous for ...**\nWork / studies:\n**I\'m a student at ...** / **I\'m in Year 10 / my second year at university.**\n**My major is ...** / **My favourite subject is ...**\n**I work as a ...** / **I work for ...**',
        },
        examples: [
          { en: "Hue is famous for its old buildings and food.", vi: 'Huế nổi tiếng với các công trình cổ và ẩm thực.' },
          { en: 'I work as an accountant for a small company.', vi: 'Tôi làm kế toán cho một công ty nhỏ.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: /ʃ/ và /s/', en: 'Pronunciation tip: /ʃ/ and /s/' },
        body: {
          vi: 'Người Việt hay lẫn **/ʃ/** ("sh") và **/s/**:\n**/ʃ/** – tròn và chu môi, đẩy hơi ra: **sh**op, Engli**sh**, fi**sh**, **s**ure, na**ti**on\n**/s/** – môi bè, đầu lưỡi gần răng, tiếng xì: **s**tudent, **c**ity, famou**s**\nCâu luyện: "I **s**tudy Engli**sh** in the **c**ity." – **s**tudy (/s/) ≠ Engli**sh** (/ʃ/).\nĐừng quên âm cuối: famou**s**, Engli**sh**!',
          en: 'Don\'t mix **/ʃ/** ("sh") and **/s/**:\n**/ʃ/** – round your lips and push air: **sh**op, Engli**sh**, fi**sh**, **s**ure\n**/s/** – wide lips, a hissing sound: **s**tudent, **c**ity, famou**s**\nPractise: "I **s**tudy Engli**sh** in the **c**ity."\nAlways say the final sound: famou**s**, Engli**sh**!',
        },
        examples: [
          { en: 'I study English in the city.', vi: 'Tôi học tiếng Anh ở thành phố.' },
          { en: 'It is famous for fresh fish.', vi: 'Nơi đó nổi tiếng về cá tươi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-10-ex01',
        type: 'speak-sentence',
        sentence: 'I come from a small town in the north of Vietnam.',
        translationVi: 'Tôi đến từ một thị trấn nhỏ ở miền Bắc Việt Nam.',
        explanation: {
          vi: '"north" kết thúc bằng /θ/ – lưỡi giữa hai răng. "town" có âm /aʊ/ như "ao".',
          en: '"north" ends in /θ/. "town" has /aʊ/.',
        },
      },
      {
        id: 'l1-speak-10-ex02',
        type: 'multiple-choice',
        question: 'Examiner: "Where is your hometown?" – Which is the best answer?',
        options: ['I like it.', 'Yes, I do.', 'My hometown.', "It's in central Vietnam, near Hue."],
        correctIndex: 3,
        explanation: {
          vi: 'Câu hỏi "Where" cần nói vị trí, kèm 1 chi tiết (near Hue).',
          en: 'A "Where" question needs a place, plus a detail (near Hue).',
        },
      },
      {
        id: 'l1-speak-10-ex03',
        type: 'speak-sentence',
        sentence: 'My hometown is famous for its beautiful beaches.',
        translationVi: 'Quê tôi nổi tiếng với những bãi biển đẹp.',
        explanation: {
          vi: '"famous" kết thúc /s/; "beaches" đọc 2 âm tiết BEE-chiz (/iː/ dài).',
          en: '"famous" ends in /s/; "beaches" = BEE-chiz with a long /iː/.',
        },
      },
      {
        id: 'l1-speak-10-ex04',
        type: 'fill-blank',
        sentence: 'I work ___ a nurse in a big hospital.',
        acceptedAnswers: ['as'],
        explanation: {
          vi: 'Nói nghề nghiệp: "work as a/an + nghề".',
          en: 'For your job: "work as a/an + job".',
        },
      },
      {
        id: 'l1-speak-10-ex05',
        type: 'speak-sentence',
        sentence: "I'm a student at Nguyen Trai High School.",
        translationVi: 'Tôi là học sinh trường THPT Nguyễn Trãi.',
        explanation: {
          vi: '"student" bắt đầu bằng /st/ – không thêm âm "xờ". "school" đọc /skuːl/.',
          en: '"student" starts with /st/ – no extra vowel. "school" = /skuːl/.',
        },
      },
      {
        id: 'l1-speak-10-ex06',
        type: 'arrange-words',
        translationVi: 'Môn học yêu thích của tôi là tiếng Anh.',
        correctSentence: 'My favourite subject is English.',
        extraWords: ['are', 'like'],
        explanation: {
          vi: '"My favourite subject" là số ít → "is".',
          en: '"My favourite subject" is singular → "is".',
        },
      },
      {
        id: 'l1-speak-10-ex07',
        type: 'speak-sentence',
        sentence: 'I study English because I want to travel.',
        translationVi: 'Tôi học tiếng Anh vì tôi muốn đi du lịch.',
        explanation: {
          vi: '"study" (/s/) và "English" (/ʃ/) – phân biệt rõ hai âm. "want to" đọc nối "won-tə".',
          en: 'Contrast /s/ in "study" and /ʃ/ in "English". Link "want to" → "won-tə".',
        },
      },
      {
        id: 'l1-speak-10-ex08',
        type: 'multiple-choice',
        question: 'Examiner: "Do you like your job?" – Which answer is best for IELTS Part 1?',
        options: ['Yes.', 'Job is good.', 'Yes, I do, because my colleagues are very friendly.', 'I like, I like.'],
        correctIndex: 2,
        explanation: {
          vi: 'Câu trả lời tốt: trả lời trực tiếp (Yes, I do) + lý do (because ...).',
          en: 'Best: a direct answer (Yes, I do) + a reason (because ...).',
        },
      },
      {
        id: 'l1-speak-10-ex09',
        type: 'speak-sentence',
        sentence: 'There are many old houses and a big market.',
        translationVi: 'Ở đó có nhiều ngôi nhà cổ và một khu chợ lớn.',
        explanation: {
          vi: '"houses" đọc /ˈhaʊzɪz/ – 2 âm tiết. Nối "old houses" và "and a" cho mượt.',
          en: '"houses" = /ˈhaʊzɪz/ – two syllables. Link the words smoothly.',
        },
      },
      {
        id: 'l1-speak-10-ex10',
        type: 'speak-answer',
        question: "Let's talk about your hometown. Where is your hometown? What do you like about it?",
        tipsVi:
          'Trả lời như thi IELTS Part 1: nói quê ở đâu (It\'s in the ... of Vietnam), nổi tiếng về gì (It\'s famous for ...), bạn thích điều gì và vì sao (I like it because ...). Khoảng 3–4 câu.',
        sampleAnswer:
          "My hometown is Hoi An. It's in central Vietnam, near Da Nang. It's famous for its old houses and colourful lanterns. I like it because it is peaceful and the food is delicious.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt: trả lời đúng câu hỏi + có chi tiết + có lý do.',
          en: 'A good answer: answers the question + gives details + gives a reason.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-10-test01',
        type: 'speak-sentence',
        sentence: 'I live in Hanoi, the capital city.',
        translationVi: 'Tôi sống ở Hà Nội, thủ đô.',
        explanation: {
          vi: '"capital" nhấn âm đầu: CAP-i-təl. "city" bắt đầu bằng /s/.',
          en: '"capital" = CAP-i-təl. "city" starts with /s/.',
        },
      },
      {
        id: 'l1-speak-10-test02',
        type: 'multiple-choice',
        question: 'Examiner: "Do you work or are you a student?" – Which answer is correct?',
        options: ["I'm a student. I'm in Year 11.", "I'm work in a bank.", 'Student is me.', 'Yes, I am.'],
        correctIndex: 0,
        explanation: {
          vi: '"I\'m work" sai (thừa "am"). Câu hỏi lựa chọn "or" không trả lời bằng "Yes".',
          en: '"I\'m work" is wrong. An "or" question can\'t be answered with "Yes".',
        },
      },
      {
        id: 'l1-speak-10-test03',
        type: 'fill-blank',
        sentence: 'My hometown is famous ___ its food.',
        acceptedAnswers: ['for'],
        explanation: {
          vi: 'Cụm cố định: famous for (nổi tiếng về).',
          en: 'Fixed phrase: famous for.',
        },
      },
      {
        id: 'l1-speak-10-test04',
        type: 'speak-sentence',
        sentence: "I'm in my second year at university.",
        translationVi: 'Tôi đang học năm thứ hai đại học.',
        explanation: {
          vi: '"university" nhấn âm thứ ba: u-ni-VER-si-ty. "second" có âm cuối /d/.',
          en: '"university" = u-ni-VER-si-ty. Say the /d/ in "second".',
        },
      },
      {
        id: 'l1-speak-10-test05',
        type: 'arrange-words',
        translationVi: 'Tôi thích công việc của mình vì nó thú vị.',
        correctSentence: 'I like my job because it is interesting.',
        extraWords: ['interested', 'so'],
        explanation: {
          vi: 'Công việc "interesting" (thú vị); người mới "interested" (cảm thấy hứng thú).',
          en: 'A job is "interesting"; a person is "interested".',
        },
      },
      {
        id: 'l1-speak-10-test06',
        type: 'speak-answer',
        question: 'Do you work or are you a student? Tell me about your job or your studies.',
        tipsVi:
          'Câu đầu trả lời trực tiếp: "I\'m a student" hoặc "I work as a ...". Sau đó thêm 2 chi tiết: học trường nào / môn yêu thích, hoặc làm ở đâu / bạn thích gì ở công việc. Có ít nhất 1 lý do với "because".',
        sampleAnswer:
          "I'm a student. I'm in Year 11 at Le Loi High School in Da Nang. My favourite subject is English because I like watching films and talking to foreigners.",
        recordSeconds: 45,
      },
    ],
  },
]
