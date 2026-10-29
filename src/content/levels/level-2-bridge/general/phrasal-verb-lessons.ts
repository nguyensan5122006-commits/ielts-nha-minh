/**
 * phrasal-verb-lessons.ts — LEVEL 2 (phần 3.0 – 4.0) · TRACK GENERAL — CỤM ĐỘNG TỪ HẰNG NGÀY
 * ----------------------------------------------------------------------------
 * 1 bài "practice" kiểu Duolingo dạy 7 cụm động từ (phrasal verb) dùng nhiều nhất
 * trong sinh hoạt ở nhà và việc hằng ngày.
 *
 * Danh sách bài:
 *   l2b-g-05-phrasal  Cụm động từ hằng ngày: wake up, turn off, look for, put on,
 *                     pick up, give up, find out
 *
 * Bài gồm:
 *   - teachingCards : 3 thẻ (cụm động từ là gì · tách được / không tách được · mẹo nói)
 *   - words         : 7 cụm động từ (IPA Anh-Anh, nghĩa, 2 câu ví dụ, ghi chú)
 *   - exercises     : 12 bài (chọn, điền, nối, sắp xếp, đúng/sai, nghe, nói)
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l2b-g-05-phrasal", bài tập "l2b-g-05-phrasal-ex<số>",
 * từ "l2b-g-w2-<cụm từ>" (w2 = nhóm từ bổ sung, tránh trùng id cũ "l2b-g-w-…").
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralPhrasalVerbLessons: Lesson[] = [
  {
    id: 'l2b-g-05-phrasal',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 11,
    title: { vi: 'Cụm động từ hằng ngày', en: 'Everyday phrasal verbs' },
    description: {
      vi: 'Học 7 cụm động từ người bản xứ dùng mỗi ngày ở nhà và biết đặt "it / them" vào đúng chỗ.',
      en: 'Learn 7 phrasal verbs people use every day at home, and where to put "it / them".',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm động từ là gì?', en: 'What is a phrasal verb?' },
        body: {
          vi: 'Cụm động từ = **động từ + một từ nhỏ** (up, off, on, for, out…).\nTừ nhỏ này **đổi nghĩa** của động từ:\n**give** = đưa → **give up** = bỏ, từ bỏ\n**find** = tìm thấy → **find out** = phát hiện ra, biết được\nVì vậy hãy học **cả cụm**, đừng dịch từng chữ.',
          en: 'A phrasal verb = **verb + a small word** (up, off, on, for, out…).\nThe small word **changes the meaning**:\n**give** → **give up** = stop trying or stop doing\n**find** → **find out** = discover a fact\nSo learn **the whole phrase**, not word by word.',
        },
        examples: [
          { en: 'My dad gave up smoking last year.', vi: 'Bố tôi đã bỏ thuốc lá năm ngoái.' },
          { en: 'I found out the test is on Friday.', vi: 'Tôi mới biết bài kiểm tra vào thứ Sáu.' },
        ],
      },
      {
        title: { vi: '"Turn it off" — không phải "turn off it"', en: '"Turn it off" — not "turn off it"' },
        body: {
          vi: 'Nhiều cụm **tách được**: turn off, put on, pick up.\nVới danh từ, đặt ở đâu cũng được: turn off **the TV** = turn **the TV** off.\nNhưng với **it / them / him / her**, phải đặt **ở giữa**: turn **it** off ✓ — turn off it ✗.\nMột số cụm **không tách**: look for, wake up (một mình): look for **it** ✓.',
          en: 'Many phrasal verbs are **separable**: turn off, put on, pick up.\nWith a noun, both orders work: turn off **the TV** = turn **the TV** off.\nWith **it / them / him / her**, the pronoun goes **in the middle**: turn **it** off ✓ — turn off it ✗.\nSome are **not separable**: look for **it** ✓.',
        },
        examples: [
          { en: "It's cold. Put your jacket on. — OK, I'll put it on.", vi: 'Lạnh đấy. Mặc áo khoác vào. — Vâng, con mặc ngay.' },
          { en: "I'm looking for my keys. Have you seen them?", vi: 'Mẹ đang tìm chìa khoá. Con có thấy không?' },
        ],
      },
      {
        title: { vi: 'Mẹo nói: nhấn vào từ nhỏ', en: 'Speaking tip: stress the small word' },
        body: {
          vi: 'Khi nói, người bản xứ thường **nhấn mạnh từ nhỏ** ở cuối: wake **UP**, turn **OFF**, give **UP**.\nNối âm cho trôi: "turn it off" đọc gần như **"tur-ni-toff"**, "pick it up" → **"pi-ki-tup"**.\nĐừng quên phụ âm cuối /k/, /t/, /p/ — người Việt hay nuốt mất.',
          en: 'In speech, people usually **stress the small word** at the end: wake **UP**, turn **OFF**, give **UP**.\nLink the sounds: "turn it off" sounds like **"tur-ni-toff"**, "pick it up" → **"pi-ki-tup"**.\nSay final /k/, /t/, /p/ clearly.',
        },
        examples: [
          { en: 'Can you pick it up for me?', vi: 'Bạn nhặt nó lên giúp mình được không?' },
          { en: 'Please turn it off before you go to bed.', vi: 'Nhớ tắt nó đi trước khi đi ngủ nhé.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w2-wake-up',
        word: 'wake up',
        ipa: '/weɪk ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'thức dậy; đánh thức (ai đó)',
        definitionEn: 'To stop sleeping, or to make someone stop sleeping.',
        examples: [
          { en: 'I usually wake up at six, but I get up at half past.', vi: 'Tôi thường tỉnh giấc lúc 6 giờ nhưng 6 rưỡi mới ra khỏi giường.' },
          { en: 'Please wake me up when we arrive.', vi: 'Tới nơi thì đánh thức mình dậy nhé.' },
        ],
        usageNote: {
          vi: '**wake up** = mở mắt, tỉnh giấc; **get up** = ra khỏi giường. Đánh thức ai: wake **me** up.',
          en: '**wake up** = open your eyes; **get up** = leave your bed. Wake **someone** up.',
        },
      },
      {
        id: 'l2b-g-w2-turn-off',
        word: 'turn off',
        ipa: '/tɜːn ˈɒf/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'tắt (đèn, máy, vòi nước…)',
        definitionEn: 'To stop a machine, light or tap from working.',
        examples: [
          { en: 'Turn off the lights when you leave the room.', vi: 'Tắt đèn khi ra khỏi phòng nhé.' },
          { en: 'The fan is noisy. Can I turn it off?', vi: 'Quạt ồn quá. Mình tắt nó đi được không?' },
        ],
        usageNote: {
          vi: 'Ngược nghĩa: **turn on** = bật. Với "it": turn **it** off, không nói "turn off it".',
          en: 'Opposite: **turn on**. With "it": turn **it** off, not "turn off it".',
        },
      },
      {
        id: 'l2b-g-w2-look-for',
        word: 'look for',
        ipa: '/ˈlʊk fɔː(r)/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'tìm (thứ đang bị mất / cần có)',
        definitionEn: 'To try to find something or someone.',
        examples: [
          { en: "I'm looking for my phone. Is it in the kitchen?", vi: 'Tôi đang tìm điện thoại. Nó có ở trong bếp không?' },
          { en: 'My cousin is looking for a part-time job.', vi: 'Em họ tôi đang tìm việc bán thời gian.' },
        ],
        usageNote: {
          vi: '**look for** = đang tìm; **find** = tìm thấy. Không tách: look for **it**.',
          en: '**look for** = try to find; **find** = succeed. Not separable: look for **it**.',
        },
      },
      {
        id: 'l2b-g-w2-put-on',
        word: 'put on',
        ipa: '/pʊt ˈɒn/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'mặc vào, đội vào, mang vào',
        definitionEn: 'To start wearing clothes, shoes, a hat or glasses.',
        examples: [
          { en: 'Put on your helmet before you ride the motorbike.', vi: 'Đội mũ bảo hiểm vào trước khi đi xe máy.' },
          { en: "Where are my glasses? I need to put them on.", vi: 'Kính của tôi đâu rồi? Tôi cần đeo vào.' },
        ],
        usageNote: {
          vi: '**put on** = hành động mặc vào; **wear** = đang mặc. Ngược nghĩa: **take off** = cởi ra.',
          en: '**put on** = the action; **wear** = the state. Opposite: **take off**.',
        },
      },
      {
        id: 'l2b-g-w2-pick-up',
        word: 'pick up',
        ipa: '/pɪk ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'nhặt lên; đón (ai đó)',
        definitionEn: 'To lift something up, or to collect someone in a car or on a motorbike.',
        examples: [
          { en: 'Can you pick up the toys on the floor?', vi: 'Con nhặt đồ chơi dưới sàn lên được không?' },
          { en: 'My mum picks me up from school at five.', vi: 'Mẹ đón tôi ở trường lúc 5 giờ.' },
        ],
      },
      {
        id: 'l2b-g-w2-give-up',
        word: 'give up',
        ipa: '/ɡɪv ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'từ bỏ; bỏ (thói quen)',
        definitionEn: 'To stop trying, or to stop doing a habit.',
        examples: [
          { en: "Don't give up! You're nearly there.", vi: 'Đừng bỏ cuộc! Bạn sắp làm được rồi.' },
          { en: 'She gave up sugar in her coffee.', vi: 'Cô ấy đã bỏ đường trong cà phê.' },
        ],
        usageNote: {
          vi: 'Sau give up dùng danh từ hoặc **V-ing**: give up **smoking**, không nói "give up to smoke".',
          en: 'Use a noun or **-ing** after it: give up **smoking**, not "give up to smoke".',
        },
      },
      {
        id: 'l2b-g-w2-find-out',
        word: 'find out',
        ipa: '/faɪnd ˈaʊt/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'tìm hiểu, phát hiện ra, biết được (thông tin)',
        definitionEn: 'To get information or learn a fact.',
        examples: [
          { en: "I'll call the clinic and find out the opening times.", vi: 'Tôi sẽ gọi phòng khám để hỏi giờ mở cửa.' },
          { en: 'We found out that the shop was closed on Sundays.', vi: 'Chúng tôi phát hiện ra cửa hàng đóng cửa vào Chủ nhật.' },
        ],
        usageNote: {
          vi: '**find** + đồ vật (find my keys); **find out** + thông tin (find out the price).',
          en: '**find** + an object (find my keys); **find out** + information (find out the price).',
        },
      },
    ],
    exercises: [
      {
        id: 'l2b-g-05-phrasal-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm động từ với nghĩa tiếng Việt.', en: 'Match each phrasal verb with its meaning.' },
        pairs: [
          { left: 'turn off', right: 'tắt' },
          { left: 'put on', right: 'mặc vào' },
          { left: 'look for', right: 'tìm' },
          { left: 'give up', right: 'từ bỏ' },
          { left: 'find out', right: 'biết được, phát hiện ra' },
        ],
        explanation: {
          vi: 'Học cả cụm: từ nhỏ (off, on, for, up, out) làm đổi nghĩa động từ.',
          en: 'Learn the whole phrase: the small word changes the meaning.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex02',
        type: 'multiple-choice',
        question: "It's raining. ___ your raincoat before you go out.",
        options: ['Put on', 'Pick up', 'Give up', 'Find out'],
        correctIndex: 0,
        explanation: {
          vi: 'Mặc áo mưa vào → put on.',
          en: 'Start wearing a raincoat → put on.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex03',
        type: 'fill-blank',
        sentence: "I can't sleep with the light on. Can you turn it ___?",
        acceptedAnswers: ['off'],
        hint: '(tắt)',
        explanation: {
          vi: 'Tắt đèn = turn off; với "it" đặt ở giữa: turn it off.',
          en: 'Stop the light = turn off; "it" goes in the middle: turn it off.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['Please pick up it.', 'Please pick it up.', 'Please up pick it.', 'Please pick it.'],
        correctIndex: 1,
        explanation: {
          vi: 'Đại từ "it" phải nằm giữa động từ và từ nhỏ: pick it up.',
          en: 'The pronoun "it" goes between the verb and the particle: pick it up.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex05',
        type: 'fill-blank',
        sentence: "My grandfather wants to give ___ smoking because it's bad for his heart.",
        acceptedAnswers: ['up'],
        explanation: {
          vi: 'Bỏ một thói quen = give up + V-ing.',
          en: 'Stop a habit = give up + -ing.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex06',
        type: 'multiple-choice',
        question: "I'm ___ my glasses. Have you seen them anywhere?",
        options: ['finding out', 'looking for', 'waking up', 'turning off'],
        correctIndex: 1,
        explanation: {
          vi: 'Đang cố tìm thứ bị mất → looking for.',
          en: 'Trying to find something lost → looking for.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex07',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi đón tôi ở trường mỗi ngày.',
        correctSentence: 'My mother picks me up from school every day.',
        extraWords: ['for'],
        explanation: {
          vi: 'Đón ai = pick + người + up; "me" nằm giữa.',
          en: 'Collect someone = pick + person + up; "me" goes in the middle.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex08',
        type: 'true-false',
        statement: '"Look for it" and "find it" mean exactly the same thing.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'look for = đang tìm; find = đã tìm thấy.',
          en: 'look for = try to find; find = succeed in finding.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex09',
        type: 'listen-choose',
        audioText:
          "Woman: Did you call the restaurant?\nMan: Yes. I wanted to find out if they're open on Monday. They are, from eleven.",
        question: 'Why did the man call the restaurant?',
        options: ['To book a table for eleven people', 'To get information about opening days', 'To complain about the food'],
        correctIndex: 1,
        explanation: {
          vi: '"find out if they\'re open" = hỏi để biết thông tin giờ/ngày mở cửa.',
          en: '"find out if they\'re open" = get information about opening days.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex10',
        type: 'fill-blank',
        sentence: 'I set two alarms because I never ___ up on time.',
        acceptedAnswers: ['wake'],
        explanation: {
          vi: 'Tỉnh giấc = wake up. Sau "never" với "I" dùng nguyên mẫu: wake.',
          en: 'Stop sleeping = wake up. After "I never", use the base form: wake.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex11',
        type: 'speak-sentence',
        sentence: 'Please turn it off and pick it up.',
        translationVi: 'Làm ơn tắt nó đi và nhặt nó lên.',
        explanation: {
          vi: 'Nối âm: "tur-ni-toff", "pi-ki-tup"; nhấn vào off và up.',
          en: 'Link sounds: "tur-ni-toff", "pi-ki-tup"; stress off and up.',
        },
      },
      {
        id: 'l2b-g-05-phrasal-ex12',
        type: 'speak-answer',
        question: 'What do you usually do in the first hour after you wake up?',
        tipsVi:
          'Kể 3–4 việc theo thứ tự (First, Then, After that). Dùng ít nhất 2 cụm động từ: wake up, turn off, put on, look for…',
        sampleAnswer:
          'I usually wake up at six when my alarm goes off. First, I turn it off and open the window. Then I put on my sports clothes and go for a short walk. After that, I have breakfast with my family, and I often spend a few minutes looking for my keys!',
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt kể việc theo thứ tự và dùng cụm động từ tự nhiên.',
          en: 'A good answer gives steps in order and uses phrasal verbs naturally.',
        },
      },
    ],
    miniTest: [],
  },
]
