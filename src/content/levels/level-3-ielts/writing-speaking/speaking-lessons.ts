/**
 * speaking-lessons.ts — LEVEL 3 (band 4.0 – 6.5) · TRACK IELTS · KỸ NĂNG NÓI
 * ----------------------------------------------------------------------------
 * File này chứa 10 bài Speaking theo đúng 3 phần của bài thi nói IELTS, chia 2 chặng:
 *
 *   Chặng 16 — Part 1 + Part 2
 *     1. l3-i-spk-01  Part 1: kéo dài câu trả lời bằng A-R-E (chủ đề Ẩm thực)
 *     2. l3-i-spk-02  Part 1: trả lời đúng thì, xử lý đổi chủ đề (Thời tiết, Âm nhạc)
 *     3. l3-i-spk-03  Part 2: dùng 1 phút chuẩn bị + dàn ý câu chuyện (một nơi muốn quay lại)
 *     4. l3-i-spk-04  Part 2: từ đệm tự nhiên vs ngập ngừng, nói đủ 2 phút (lễ kỷ niệm gia đình)
 *     5. l3-i-spk-05  Part 2: luyện trọn vẹn + hiện tại hoàn thành (đồ vật giữ lâu năm)
 *
 *   Chặng 17 — Part 3 + thi thử
 *     6. l3-i-spk-06  Part 3: nêu quan điểm và lý do — khung O-R-E-C (Giáo dục)
 *     7. l3-i-spk-07  Part 3: so sánh xưa – nay, thành thị – nông thôn (Nhà ở, đô thị)
 *     8. l3-i-spk-08  Part 3: dự đoán tương lai, mức độ chắc chắn (Công nghệ, việc làm)
 *     9. l3-i-spk-09  Part 3: xử lý câu hỏi khó, trả lời "It depends" có lập luận (Sức khoẻ)
 *    10. l3-i-spk-10  Thi nói thử trọn bộ Part 1 → Part 2 → Part 3 (Ảnh, Hành trình, Du lịch)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2–3 thẻ chiến thuật (VI + EN), có thẻ về âm người Việt hay sai
 *   - exercises     : 5–7 bài khởi động (collocation, từ nối, paraphrase, nói câu mẫu, trả lời ngắn)
 *   - speakingTask  : câu hỏi đề thật (Part 2 có cueCard) + 3 bài mẫu band 4.0 / 5.5 / 6.5 dạng
 *                     bản ghi lời nói (bài band thấp có ngập ngừng "uh…", lỗi thì, nuốt -s… như
 *                     người Việt thật), notesVi giải thích theo FC, LR, GRA, P
 *                     + usefulPhrases + targetSounds + checklist tự chấm
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Ghi chú bài 10 (thi thử): kiểu SpeakingTask chỉ có 1 trường "part", nên bài này đặt part = 2
 * (vì có cueCard) và mỗi câu trong "questions" bắt đầu bằng nhãn "Part 1: / Part 2: / Part 3:"
 * theo đúng thứ tự thi thật. Trình Speaking đọc nhãn này để chia màn.
 *
 * Quy ước id: bài "l3-i-spk-NN", bài tập "l3-i-spk-NN-exMM".
 * Tất cả câu hỏi và bài mẫu do nhóm tự soạn (không chép từ sách IELTS có bản quyền).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level3IeltsSpeakingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1 — PART 1: KÉO DÀI CÂU TRẢ LỜI (A-R-E) · chủ đề Ẩm thực
  // ==========================================================================
  {
    id: 'l3-i-spk-01',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: {
      vi: 'Part 1 – Kéo dài câu trả lời tự nhiên (chủ đề Ẩm thực)',
      en: 'Part 1 – Extending your answers naturally (Food)',
    },
    description: {
      vi: 'Trả lời Part 1 dài 2–4 câu theo công thức A-R-E: không quá ngắn, không học thuộc.',
      en: 'Give 2–4 sentence Part 1 answers with the A-R-E formula: not too short and not memorised.',
    },
    teachingCards: [
      {
        title: { vi: 'Part 1 là gì?', en: 'What is Part 1?' },
        body: {
          vi: 'Part 1 kéo dài **4–5 phút**; giám khảo hỏi về **chủ đề quen thuộc** (quê, ăn uống, sở thích…). Mỗi câu trả lời khoảng **15–25 giây** (2–4 câu).\nQuá ngắn ("Yes, I do.") → FC thấp. Quá dài hoặc học thuộc → giám khảo sẽ ngắt lời và nghi ngờ.',
          en: 'Part 1 lasts **4–5 minutes**; the examiner asks about **familiar topics** (hometown, food, hobbies…). Each answer is about **15–25 seconds** (2–4 sentences).\nToo short ("Yes, I do.") → low FC. Too long or memorised → the examiner interrupts and becomes suspicious.',
        },
        examples: [{ en: 'Do you like cooking? Yes, I do.', vi: 'Quá ngắn: chỉ có câu trả lời, không có lý do.' }],
      },
      {
        title: { vi: 'Công thức A-R-E', en: 'The A-R-E formula' },
        body: {
          vi: '**A – Answer**: trả lời thẳng (không lặp nguyên câu hỏi).\n**R – Reason**: vì sao.\n**E – Example / Extra**: ví dụ, chi tiết, hoặc so sánh xưa – nay.\nMở đầu tự nhiên: *Yeah, definitely… / Not really, to be honest… / It depends…*',
          en: '**A – Answer**: answer directly (do not repeat the whole question).\n**R – Reason**: say why.\n**E – Example / Extra**: an example, a detail or a past–present comparison.\nNatural openers: *Yeah, definitely… / Not really, to be honest… / It depends…*',
        },
        examples: [
          {
            en: 'Yeah, definitely. Cooking helps me relax after work. Last weekend, for example, I made fish soup for the whole family.',
            vi: 'A (Yeah, definitely) → R (giúp thư giãn) → E (cuối tuần trước nấu canh cá).',
          },
        ],
      },
      {
        title: { vi: 'Âm cuối khi nói về đồ ăn', en: 'Final sounds in food words' },
        body: {
          vi: 'Người Việt hay **nuốt âm cuối**: *cook* → "cu", *soup* → "su", *vegetables* → "vegetable". Giám khảo vẫn hiểu nhưng điểm **P** bị giới hạn.\nMẹo: giữ nguyên âm lâu hơn một chút rồi **bật nhẹ** phụ âm cuối; số nhiều sau phụ âm (*cakes, snacks*) phải có /s/.',
          en: 'Vietnamese speakers often **drop final sounds**: *cook* → "cu", *soup* → "su", *vegetables* → "vegetable". The examiner still understands, but your **P** score is limited.\nTip: hold the vowel slightly longer, then **release** the final consonant; plurals after consonants (*cakes, snacks*) need /s/.',
        },
        examples: [
          { en: 'I usually cook rice and vegetables.', vi: 'Tôi thường nấu cơm và rau.' },
          { en: 'She makes sweet snacks for the kids.', vi: 'Cô ấy làm đồ ăn vặt ngọt cho bọn trẻ.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-01-ex01',
        type: 'multiple-choice',
        question: 'Question: "Do you often eat out?" Which answer has the best length and shape for Part 1?',
        options: [
          'No.',
          'Not that often, actually. Eating out is quite expensive, so I usually cook at home. But at weekends my friends and I sometimes go for hot pot.',
          'Yes, I often eat out.',
          'Eating out is a very common habit in modern society, and there are many reasons for it. First, people are busy. Second, there are many restaurants. Third…',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Phương án B có đủ A-R-E trong khoảng 20 giây; D giống bài luận, quá dài cho Part 1.',
          en: 'B has A-R-E in about 20 seconds; D sounds like an essay and is too long.',
        },
      },
      {
        id: 'l3-i-spk-01-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối để tạo cụm từ tự nhiên về ăn uống.',
          en: 'Match the halves to make natural food collocations.',
        },
        pairs: [
          { left: 'home-cooked', right: 'meals' },
          { left: 'a sweet', right: 'tooth' },
          { left: 'eat', right: 'out' },
          { left: 'a balanced', right: 'diet' },
          { left: 'a fussy', right: 'eater' },
        ],
        explanation: {
          vi: 'Collocation tự nhiên (a sweet tooth, a fussy eater) giúp tăng điểm LR ở Part 1.',
          en: 'Natural collocations like "a sweet tooth" and "a fussy eater" raise your LR score.',
        },
      },
      {
        id: 'l3-i-spk-01-ex03',
        type: 'fill-blank',
        sentence: "I've got a really sweet ___, so I can never say no to desserts.",
        acceptedAnswers: ['tooth'],
        explanation: {
          vi: '"have a sweet tooth" = rất thích đồ ngọt.',
          en: '"Have a sweet tooth" means you love sweet food.',
        },
      },
      {
        id: 'l3-i-spk-01-ex04',
        type: 'multiple-choice',
        question: 'Question: "Do you like cooking?" Which opening avoids repeating the question word for word?',
        options: [
          'Yes, I like cooking.',
          "Yeah, I'm quite into it, actually.",
          'Do I like cooking? Yes, I like cooking.',
          'Cooking, yes, I like cooking very much.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Paraphrase câu hỏi ("be into" = like) cho thấy vốn từ linh hoạt.',
          en: 'Paraphrasing ("be into" = like) shows flexible vocabulary.',
        },
      },
      {
        id: 'l3-i-spk-01-ex05',
        type: 'arrange-words',
        translationVi: 'Thật lòng mà nói, tôi nấu ăn không giỏi lắm.',
        correctSentence: "I'm not much of a cook, to be honest.",
        extraWords: ['very'],
        explanation: {
          vi: '"not much of a + danh từ" = không giỏi lắm về…; tự nhiên hơn "I cannot cook well".',
          en: '"Not much of a cook" sounds more natural than "I cannot cook well".',
        },
      },
      {
        id: 'l3-i-spk-01-ex06',
        type: 'speak-sentence',
        sentence: 'My mum cooks fish soup with vegetables almost every week.',
        translationVi: 'Mẹ tôi nấu canh cá với rau gần như mỗi tuần.',
        explanation: {
          vi: 'Bật rõ âm cuối: cooks /ks/, soup /p/, vegetables /lz/, week /k/.',
          en: 'Release the final sounds: cooks /ks/, soup /p/, vegetables /lz/, week /k/.',
        },
      },
      {
        id: 'l3-i-spk-01-ex07',
        type: 'speak-answer',
        question: 'Do you prefer eating at home or eating out?',
        tipsVi:
          'Dùng A-R-E: trả lời thẳng (I prefer… / It depends…), 1 lý do, 1 ví dụ cụ thể. Khoảng 20 giây, đừng đọc thuộc lòng.',
        sampleAnswer:
          "Mostly at home, to be honest. Home-cooked meals are healthier and much cheaper. But on special occasions, like my dad's birthday, we usually go out for a seafood dinner.",
        recordSeconds: 30,
        explanation: {
          vi: 'Câu trả lời tốt: lựa chọn rõ ràng, có lý do và một ví dụ cụ thể.',
          en: 'A good answer gives a clear choice, a reason and a specific example.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'What kind of food do you like most?',
        'Do you often cook at home?',
        'Is there any food you disliked as a child but enjoy now?',
        'Do people in your country usually eat meals together as a family?',
      ],
      bandSamples: [
        {
          band: '4.0',
          text: `Q: What kind of food do you like most?
A: I like... rice. And noodle. Uh... I like Vietnamese food.
Q: Do you often cook at home?
A: No. My mother cook. I... uh... I not cook.
Q: Is there any food you disliked as a child but enjoy now?
A: Uh... food... as a child... Yes. Vegetable. Before I not like, now I like.
Q: Do people in your country usually eat meals together as a family?
A: Yes. In Vietnam family eat together. Dinner. Every day.`,
          notesVi:
            "FC: Câu trả lời rất ngắn, ngắt quãng nhiều ('uh…'), lặp lại từ trong câu hỏi để có thời gian nghĩ; không mở rộng được ý.\nLR: Chỉ dùng từ quen thuộc nhất (rice, noodle, like), không diễn đạt được lý do.\nGRA: Chủ yếu là cụm từ, lỗi cơ bản ('My mother cook', 'I not cook', 'Before I not like').\nP: Thường nuốt âm cuối và -s ('noodle', 'vegetable', 'cook' nghe như 'cu'), nhấn đều mọi âm tiết nên người nghe phải cố gắng.",
        },
        {
          band: '5.5',
          text: `Q: What kind of food do you like most?
A: I like Vietnamese food, especially pho. Because it is very delicious and, uh, healthy. I eat pho almost every morning.
Q: Do you often cook at home?
A: Not really. I am a student so I am very busy, I don't have time. Sometimes I cook instant noodle or fried egg, very simple.
Q: Is there any food you disliked as a child but enjoy now?
A: Yes, bitter melon. When I was a child I don't like it because it is very bitter. But now I like it, because, uh, my mother say it is good for health, so I eat it.
Q: Do people in your country usually eat meals together as a family?
A: Yes, usually. In Vietnam, family usually eat dinner together, and we talk about our day. But now, um, some young people are busy so they eat outside.`,
          notesVi:
            "FC: Trả lời đủ dài và có lý do, nhưng lặp 'because', 'so' và đôi lúc ngập ngừng giữa câu.\nLR: Đủ từ cho chủ đề quen thuộc (bitter melon, instant noodle, fried egg) nhưng ít cụm tự nhiên, lặp 'very'.\nGRA: Câu đơn khá chính xác, nhưng câu phức hay sai thì ('When I was a child I don't like it') và thiếu -s ('my mother say', 'family usually eat').\nP: Nhìn chung dễ hiểu, nhưng hay mất âm cuối ở 'noodle(s)', 'like(d)' và ngữ điệu còn đều đều.",
        },
        {
          band: '6.5',
          text: `Q: What kind of food do you like most?
A: I'd say I'm a big fan of seafood, especially, um, grilled squid and fish. I grew up near the coast, so I guess I've always had fresh seafood around me, and nothing really beats it.
Q: Do you often cook at home?
A: Not as often as I'd like, actually. On weekdays I usually get home quite late, so I just grab something simple. But on Sundays I try to cook a proper meal for my family, usually a soup and a stir-fry.
Q: Is there any food you disliked as a child but enjoy now?
A: Yes, bitter melon, definitely. When I was little I couldn't stand the taste, so my mum had to hide it in soup. These days I actually order it in restaurants, because I find the bitterness quite refreshing, especially in summer.
Q: Do people in your country usually eat meals together as a family?
A: Generally, yes, especially dinner. It's kind of the time when everyone catch up on their day. Having said that, in big cities it's becoming less common, since parents often work late and kids have extra classes in the evening.`,
          notesVi:
            "FC: Nói trôi chảy, mỗi câu trả lời được mở rộng tự nhiên bằng lý do và ví dụ; dùng được từ nối hội thoại (actually, having said that), thỉnh thoảng có 'um' ngắn khi tìm từ.\nLR: Nhiều cụm tự nhiên (a big fan of, nothing really beats it, couldn't stand, catch up on), diễn đạt linh hoạt nhưng chưa có nhiều từ hiếm.\nGRA: Kết hợp câu đơn và câu phức linh hoạt (When…, since…, so…); còn lỗi nhỏ như 'everyone catch up' nhưng không gây khó hiểu.\nP: Dễ hiểu xuyên suốt, giữ được phần lớn âm cuối; đôi chỗ trọng âm từ chưa chuẩn (re-FRESH-ing) và ngữ điệu chưa thật đa dạng.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi câu trả lời có 2–4 câu (khoảng 15–25 giây) không?',
            'Có mở rộng bằng lý do hoặc ví dụ (A-R-E) không?',
            'Có tránh lặp lại nguyên câu hỏi để kéo thời gian không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 2 cụm tự nhiên (a sweet tooth, a big fan of…) không?',
            'Có paraphrase câu hỏi thay vì lặp lại từ của giám khảo không?',
            'Có tránh lặp "very" và "delicious" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Câu hỏi về quá khứ (as a child) có được trả lời bằng thì quá khứ không?',
            'Chủ ngữ số ít có đi với động từ thêm -s (my mum cooks) không?',
            'Có ít nhất 1 câu dùng when / because / so đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Âm cuối /k/ /t/ /p/ có được bật nhẹ (cook, eat, soup) không?',
            'Danh từ số nhiều có /s/ hoặc /z/ (vegetables, snacks) không?',
            'Nghe lại bản ghi, người khác có hiểu được mọi từ không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'd say I'm a big fan of…",
        "Not as often as I'd like, actually.",
        "When I was little, I couldn't stand…",
        'These days, I actually…',
        'Having said that, …',
        'It depends on…',
      ],
      targetSounds: [
        'final consonants /k/ /t/ /p/ (cook, eat, soup)',
        'plural -s after consonants (snacks, vegetables)',
        'word stress: VEG-ta-bles, de-LI-cious',
        'past -ed /d/ /t/ (grilled, liked)',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2 — PART 1: TRẢ LỜI ĐÚNG THÌ, XỬ LÝ ĐỔI CHỦ ĐỀ · Thời tiết, Âm nhạc
  // ==========================================================================
  {
    id: 'l3-i-spk-02',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: {
      vi: 'Part 1 – Trả lời đúng thì và đúng ý câu hỏi (Thời tiết, Âm nhạc)',
      en: 'Part 1 – Matching your tense to the question (Weather, Music)',
    },
    description: {
      vi: 'Nhận ra câu hỏi về hiện tại, quá khứ hay tương lai để trả lời đúng thì, và xử lý nhanh khi chủ đề thay đổi.',
      en: 'Spot whether a question is about the present, past or future, answer in the right tense, and cope when the topic changes.',
    },
    teachingCards: [
      {
        title: { vi: 'Nghe thì của câu hỏi', en: 'Listen for the tense in the question' },
        body: {
          vi: 'Thì của câu hỏi là **gợi ý thì cho câu trả lời**:\n• *Do you…?* → thói quen, **hiện tại đơn**.\n• *Did you… as a child?* → **quá khứ đơn** (+ *used to*).\n• *Would you like to…?* → **I would love to / I would like to**.\n• *Have you ever…?* → **hiện tại hoàn thành** + chi tiết bằng quá khứ.',
          en: 'The question tense is a **clue for your answer tense**:\n• *Do you…?* → habits, **present simple**.\n• *Did you… as a child?* → **past simple** (+ *used to*).\n• *Would you like to…?* → **I would love to / I would like to**.\n• *Have you ever…?* → **present perfect** + past simple details.',
        },
        examples: [
          {
            en: 'Did you enjoy music lessons at school? Not really. We mostly had to sing old songs, which I found boring.',
            vi: 'Hỏi quá khứ → trả lời quá khứ (had, found).',
          },
          {
            en: "Have you ever been to a live concert? Yes, I've been to two, and the last one was amazing.",
            vi: "Have you ever → I've been + chi tiết ở quá khứ (was).",
          },
        ],
      },
      {
        title: { vi: 'Chủ đề đổi liên tục: đừng hoảng', en: 'Topics change quickly: stay calm' },
        body: {
          vi: 'Part 1 thường có **2–3 chủ đề** khác nhau. Khi chủ đề đổi, dùng câu "mua thời gian" **ngắn** (1–2 giây) thay vì "ờ…" kéo dài:\n*Hmm, that is an interesting one… / Let me think… / Well, to be honest…*\nQuên từ? **Diễn đạt vòng**: *the thing you use to…*',
          en: 'Part 1 usually has **2–3 different topics**. When the topic changes, use a **short** opener (1–2 seconds) instead of a long "uh…":\n*Hmm, that is an interesting one… / Let me think… / Well, to be honest…*\nForgot a word? **Paraphrase**: *the thing you use to…*',
        },
        examples: [{ en: "Hmm, let me think. I'd probably say autumn.", vi: 'Mua 1–2 giây suy nghĩ một cách tự nhiên.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-02-ex01',
        type: 'multiple-choice',
        question: 'Question: "Did you learn to play an instrument as a child?" Which answer uses the right tense?',
        options: [
          'Yes, I learn the piano when I am eight.',
          'Yes, I learned the piano for a couple of years when I was about eight.',
          'Yes, I have learned the piano when I was eight.',
          'Yes, I will learn the piano.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu hỏi quá khứ (Did… as a child) → quá khứ đơn: learned, was.',
          en: 'A past question (Did… as a child) needs the past simple: learned, was.',
        },
      },
      {
        id: 'l3-i-spk-02-ex02',
        type: 'fill-blank',
        sentence: 'When I was younger, I ___ to sing in the school choir every Friday.',
        acceptedAnswers: ['used'],
        explanation: {
          vi: '"used to + V" = thói quen trong quá khứ, nay không còn.',
          en: '"Used to + verb" is a past habit that has stopped.',
        },
      },
      {
        id: 'l3-i-spk-02-ex03',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ tả thời tiết với nghĩa của nó.',
          en: 'Match each weather word with its meaning.',
        },
        pairs: [
          { left: 'boiling hot', right: 'extremely hot' },
          { left: 'humid', right: 'wet and sticky air' },
          { left: 'chilly', right: 'unpleasantly cold' },
          { left: 'a downpour', right: 'a sudden heavy rain' },
          { left: 'mild', right: 'not too hot or too cold' },
        ],
        explanation: {
          vi: 'Từ cụ thể (humid, chilly, mild) giúp tăng điểm LR hơn chỉ "hot / cold".',
          en: 'Precise words (humid, chilly, mild) score higher than just "hot / cold".',
        },
      },
      {
        id: 'l3-i-spk-02-ex04',
        type: 'multiple-choice',
        question: 'Question: "Would you like to learn a musical instrument in the future?" Which is the best answer?',
        options: [
          'Yes, I like it.',
          "Yes, I'd love to learn the guitar, mainly because I'd like to play songs with my friends.",
          'Yes, I learned the guitar.',
          'Yes, I am learning guitar yesterday.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"Would you like…?" → "I\'d love to…" + lý do.',
          en: '"Would you like…?" → "I\'d love to…" plus a reason.',
        },
      },
      {
        id: 'l3-i-spk-02-ex05',
        type: 'arrange-words',
        translationVi: 'Tôi chưa bao giờ thực sự nghĩ về điều đó, nhưng có lẽ là mùa thu.',
        correctSentence: "I've never really thought about it, but probably autumn.",
        extraWords: ['think'],
        explanation: {
          vi: 'Câu "mua thời gian" tự nhiên khi gặp câu hỏi bất ngờ, kèm câu trả lời ngay.',
          en: 'A natural way to buy time on an unexpected question, followed by an answer.',
        },
      },
      {
        id: 'l3-i-spk-02-ex06',
        type: 'speak-sentence',
        sentence: 'The weather is usually mild, but the summers are hot and humid.',
        translationVi: 'Thời tiết thường ôn hoà, nhưng mùa hè thì nóng và ẩm.',
        explanation: {
          vi: '/ð/ ở "the, weather": lưỡi giữa răng; "summers" có /z/ cuối; nhấn HU-mid.',
          en: 'For /ð/ in "the" and "weather", tongue between teeth; "summers" ends /z/; stress HU-mid.',
        },
      },
      {
        id: 'l3-i-spk-02-ex07',
        type: 'speak-sentence',
        sentence: 'I played the guitar and practised every evening.',
        translationVi: 'Tôi đã chơi đàn ghi-ta và luyện tập mỗi tối.',
        explanation: {
          vi: '"played" kết thúc /d/, "practised" kết thúc /t/; đừng bỏ đuôi -ed.',
          en: '"Played" ends in /d/ and "practised" ends in /t/. Do not drop the -ed ending.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        "What's the weather usually like where you live?",
        'Which season do you like best? Why?',
        'Did you enjoy music lessons when you were at school?',
        'Would you like to learn a musical instrument in the future?',
      ],
      bandSamples: [
        {
          band: '4.0',
          text: `Q: What's the weather usually like where you live?
A: Hot. Very hot. And... rain. Rain many.
Q: Which season do you like best? Why?
A: I like... uh... winter. Because cool. Not hot.
Q: Did you enjoy music lessons when you were at school?
A: Music... yes. I like music. I like sing.
Q: Would you like to learn a musical instrument in the future?
A: Yes. Guitar. I like guitar... uh... it is beautiful.`,
          notesVi:
            "FC: Trả lời bằng từ đơn hoặc cụm ngắn, ngập ngừng nhiều, không phát triển được ý.\nLR: Chỉ có từ rất cơ bản (hot, rain, cool), dùng sai 'Rain many'.\nGRA: Hầu như không có câu hoàn chỉnh; không dùng quá khứ cho câu hỏi 'Did you…' và không dùng 'would' cho câu hỏi tương lai.\nP: Nuốt âm cuối ('like' thành 'lai'), /ð/ trong 'weather' thành /d/, ngữ điệu đều như đọc từng từ.",
        },
        {
          band: '5.5',
          text: `Q: What's the weather usually like where you live?
A: In my city the weather is very hot in summer and, uh, it rains a lot. Sometimes it is flooding in the street. In winter it is cold but not very cold.
Q: Which season do you like best? Why?
A: I like autumn best because the weather is cool and, uh, very comfortable. And I can go out with my friends and drink coffee in the street.
Q: Did you enjoy music lessons when you were at school?
A: Yes, I enjoy it. My music teacher is very kind and we sing many songs together. But we don't have many lessons, only one per week.
Q: Would you like to learn a musical instrument in the future?
A: Yes, I want to learn piano because I think piano is very, very beautiful and relaxing. Maybe I will learn when I have time.`,
          notesVi:
            "FC: Trả lời đủ dài và khá liên tục, nhưng ý nối chủ yếu bằng 'and', 'because' và có ngập ngừng.\nLR: Đủ từ cho chủ đề quen thuộc nhưng lặp 'very', 'beautiful'; 'it is flooding in the street' chưa tự nhiên.\nGRA: Câu hỏi quá khứ lại trả lời bằng hiện tại ('I enjoy it', 'My music teacher is'); câu phức đơn giản.\nP: Nhìn chung dễ hiểu; đôi khi mất âm cuối ('rains', 'lessons') và /ð/ trong 'weather' chưa chuẩn.",
        },
        {
          band: '6.5',
          text: `Q: What's the weather usually like where you live?
A: Well, it's tropical, so it's hot and humid for most of the year. We get a rainy season from around May to October, and the downpours can be pretty heavy, sometimes the streets flood for an hour or so.
Q: Which season do you like best? Why?
A: Hmm, I'd probably say the dry season, around December. The air is cooler and less sticky, so it's the perfect time for walking around the city or having a picnic with friends.
Q: Did you enjoy music lessons when you were at school?
A: To be honest, not that much. We mostly had to sing traditional songs from the textbook, and I wasn't very confident singing in front of the class. I think I'd have enjoyed it more if we had learned an instrument.
Q: Would you like to learn a musical instrument in the future?
A: Yeah, I'd love to pick up the guitar at some point. A friend of mine plays really well, and I've always admired how he can just play any song at a party. The problem is finding the time, I guess.`,
          notesVi:
            "FC: Trả lời mở rộng, mạch lạc, dùng câu 'mua thời gian' tự nhiên (Hmm, I'd probably say…); ít ngập ngừng.\nLR: Từ vựng chính xác và đa dạng (humid, downpours, sticky, pick up the guitar), tuy chưa nhiều thành ngữ.\nGRA: Dùng đúng thì theo câu hỏi, có câu điều kiện loại 3 ('I'd have enjoyed it more if…'); vẫn có chỗ ghép hai ý lỏng lẻo ('…pretty heavy, sometimes the streets flood…').\nP: Dễ hiểu xuyên suốt; giữ được đuôi -ed và -s phần lớn thời gian, ngữ điệu có lên xuống nhưng đôi chỗ còn đều.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Có dùng câu mở đầu ngắn (Hmm, let me think…) thay vì "ờ…" kéo dài không?',
            'Mỗi câu trả lời có ít nhất 1 lý do không?',
            'Khi đổi chủ đề, bạn có bắt đầu trả lời trong khoảng 2 giây không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng từ thời tiết cụ thể (humid, mild, downpour) thay vì chỉ "hot / cold" không?',
            'Có tránh lặp "very, very" không?',
            'Khi quên từ, bạn có diễn đạt vòng được không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Câu hỏi "Did you…" có được trả lời bằng quá khứ không?',
            'Câu hỏi "Would you like…" có được trả lời bằng "I\'d love to / I\'d like to" không?',
            'Có ít nhất 1 lần dùng "used to" hoặc hiện tại hoàn thành đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Âm /ð/ trong "the, weather" có đặt lưỡi giữa răng không?',
            'Đuôi -ed (played, practised) có nghe rõ không?',
            'Câu khẳng định có ngữ điệu đi xuống ở cuối câu không?',
          ],
        },
      ],
      usefulPhrases: [
        'Well, it depends on the time of year…',
        "Hmm, I'd probably say…",
        'To be honest, not that much.',
        'When I was younger, I used to…',
        "I'd love to… at some point.",
        'The problem is finding the time, I guess.',
      ],
      targetSounds: [
        '/ð/ (the, weather, though)',
        'past -ed: /d/ played, /t/ practised, /ɪd/ wanted',
        'final -s /z/ (summers, songs)',
        "contractions: I'd, I've, it's",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3 — PART 2: 1 PHÚT CHUẨN BỊ + DÀN Ý CÂU CHUYỆN · một nơi muốn quay lại
  // ==========================================================================
  {
    id: 'l3-i-spk-03',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 2 – Dùng 1 phút chuẩn bị và dàn ý câu chuyện',
      en: 'Part 2 – Using your 1-minute preparation and a story structure',
    },
    description: {
      vi: 'Ghi từ khoá trong 60 giây và kể một câu chuyện 2 phút có bối cảnh, diễn biến và cảm nghĩ.',
      en: 'Make keyword notes in 60 seconds and tell a 2-minute story with a scene, events and reflection.',
    },
    teachingCards: [
      {
        title: { vi: 'Part 2 diễn ra thế nào', en: 'How Part 2 works' },
        body: {
          vi: 'Bạn nhận **thẻ đề (cue card)** với 1 chủ đề + 4 gợi ý. Có **1 phút chuẩn bị** (được ghi chú) và nói **tối đa 2 phút**; giám khảo ngắt khi hết giờ.\nMục tiêu: nói **ít nhất 1 phút 40 giây**. Dừng ở 50 giây → điểm FC bị giới hạn.\nCác gợi ý là **khung**, không bắt buộc theo thứ tự cứng nhắc.',
          en: 'You get a **cue card** with a topic and four prompts. You have **1 minute to prepare** (notes allowed) and speak for **up to 2 minutes**; the examiner stops you when time is up.\nAim to speak for **at least 1 minute 40 seconds**. Stopping at 50 seconds limits FC.\nThe prompts are a **guide**; you need not follow them rigidly.',
        },
        examples: [{ en: "I'd like to talk about a small island I visited two years ago.", vi: 'Câu mở đầu: vào đề ngay, nêu rõ đối tượng.' }],
      },
      {
        title: { vi: 'Ghi chú 60 giây: từ khoá, không viết câu', en: '60-second notes: keywords, not sentences' },
        body: {
          vi: 'Chia giấy thành **4 ô** theo 4 gợi ý. Mỗi ô **2–4 từ khoá** (danh từ, động từ, tính từ cảm xúc). **Không viết câu** — không đủ thời gian và bạn sẽ đọc thay vì nói.\nVD: *island – 2 yrs ago – ferry 3 hrs – turtles – quiet – go back with family*.',
          en: 'Divide your paper into **4 boxes**, one per prompt. Write **2–4 keywords** in each (nouns, verbs, feeling words). **No full sentences**: there is no time, and you would read instead of speak.\nE.g. *island – 2 yrs ago – ferry 3 hrs – turtles – quiet – go back with family*.',
        },
        examples: [
          { en: 'Where: small island, ferry, three hours.', vi: 'Ô 1: ở đâu — chỉ ghi từ khoá.' },
          { en: 'Feelings: peaceful, want to return, with parents.', vi: 'Ô 4: cảm nghĩ — giúp bạn có đoạn kết.' },
        ],
      },
      {
        title: { vi: 'Dàn ý: Bối cảnh → Diễn biến → Cảm nghĩ', en: 'Story structure: Scene → Events → Reflection' },
        body: {
          vi: '**Bối cảnh** (15–20 giây): khi nào, ở đâu, với ai.\n**Diễn biến** (60–70 giây): 2–3 sự việc theo thứ tự, dùng **quá khứ đơn** + *First, After that, The highlight was…*\n**Cảm nghĩ** (20–30 giây): vì sao đáng nhớ, có muốn quay lại không, dùng *would*.\nMỗi phần có từ chuyển ý để giám khảo biết bạn đang ở đâu.',
          en: '**Scene** (15–20 s): when, where, who with.\n**Events** (60–70 s): 2–3 events in order, using the **past simple** + *First, After that, The highlight was…*\n**Reflection** (20–30 s): why it was memorable and whether you would go back, using *would*.\nUse signposts so the examiner knows where you are.',
        },
        examples: [
          {
            en: 'The highlight of the trip was watching baby turtles crawl into the sea at night.',
            vi: 'Câu báo phần đáng nhớ nhất của diễn biến.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-03-ex01',
        type: 'multiple-choice',
        question: 'You have 60 seconds to prepare. What should you write?',
        options: [
          'Full sentences for the whole talk',
          'Keywords for each prompt: places, actions, feelings',
          'Nothing — just think silently',
          'A list of difficult words to impress the examiner',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Từ khoá theo 4 gợi ý giúp bạn nhớ ý mà vẫn nói tự nhiên.',
          en: 'Keywords for each prompt help you remember ideas but still speak naturally.',
        },
      },
      {
        id: 'l3-i-spk-03-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từng phần của câu chuyện với câu phù hợp.',
          en: 'Match each part of the story with the right sentence.',
        },
        pairs: [
          { left: 'Scene', right: 'It was the summer after I finished university, and I went with two close friends.' },
          { left: 'Event', right: 'On the second day, we hired bicycles and rode around the whole island.' },
          { left: 'Highlight', right: 'The best part was swimming in a bay where there was nobody else.' },
          { left: 'Reflection', right: "I'd love to go back one day, maybe with my parents." },
        ],
        explanation: {
          vi: 'Bối cảnh → diễn biến → điểm nhấn → cảm nghĩ giúp bài nói có trình tự rõ.',
          en: 'Scene → event → highlight → reflection gives your talk a clear order.',
        },
      },
      {
        id: 'l3-i-spk-03-ex03',
        type: 'fill-blank',
        sentence: 'The ___ of the trip was watching the sunrise from the top of the hill.',
        acceptedAnswers: ['highlight'],
        explanation: {
          vi: '"The highlight of…" = phần đáng nhớ nhất; báo cho giám khảo điểm nhấn của câu chuyện.',
          en: '"The highlight of…" signals the best moment of your story.',
        },
      },
      {
        id: 'l3-i-spk-03-ex04',
        type: 'multiple-choice',
        question: 'Which sentence about a past trip is correct?',
        options: [
          'We stay in a small guesthouse near the beach last year.',
          'We stayed in a small guesthouse near the beach last year.',
          'We have stayed in a small guesthouse near the beach last year.',
          'We were stay in a small guesthouse near the beach last year.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Chuyện đã qua → quá khứ đơn (stayed); "have stayed" không đi với "last year".',
          en: 'A finished past story uses the past simple; "have stayed" cannot go with "last year".',
        },
      },
      {
        id: 'l3-i-spk-03-ex05',
        type: 'arrange-words',
        translationVi: 'Tôi muốn kể về một hòn đảo nhỏ mà tôi đã đến hai năm trước.',
        correctSentence: "I'd like to talk about a small island I visited two years ago.",
        extraWords: ['visit'],
        explanation: {
          vi: 'Câu mở đầu Part 2: vào thẳng chủ đề, không cần giới thiệu dài dòng.',
          en: 'A Part 2 opening goes straight to the topic, with no long introduction.',
        },
      },
      {
        id: 'l3-i-spk-03-ex06',
        type: 'speak-sentence',
        sentence: 'We walked along the beach and visited a fishing village.',
        translationVi: 'Chúng tôi đi bộ dọc bãi biển và thăm một làng chài.',
        explanation: {
          vi: 'Hai cách đọc -ed: walked /t/, visited /ɪd/ (thêm 1 âm tiết); nhấn FISH-ing.',
          en: 'Two -ed sounds: walked /t/, visited /ɪd/ (an extra syllable); stress FISH-ing.',
        },
      },
      {
        id: 'l3-i-spk-03-ex07',
        type: 'speak-answer',
        question: 'Talk for 45 seconds: describe the SCENE of a trip you remember (when, where, who with, how you travelled).',
        tipsVi:
          'Chỉ luyện phần bối cảnh: thời gian, địa điểm, đi cùng ai, đi bằng gì. Dùng quá khứ đơn, bật rõ đuôi -ed.',
        sampleAnswer:
          "I'd like to talk about a trip to a small island in the south. It was about two years ago, just after my final exams. I went with two close friends from university. We took a night bus to the coast and then a ferry, which took almost three hours, so we were exhausted when we arrived.",
        recordSeconds: 45,
        explanation: {
          vi: 'Phần bối cảnh tốt trả lời: khi nào, ở đâu, với ai, đi thế nào.',
          en: 'A good scene answers when, where, who with and how you travelled.',
        },
      },
    ],
    speakingTask: {
      part: 2,
      questions: ['Describe a place you visited that you would like to visit again.'],
      cueCard: {
        topic: 'Describe a place you visited that you would like to visit again.',
        points: [
          'where it is',
          'when you went there and who you went with',
          'what you did there',
          'and explain why you would like to visit it again',
        ],
      },
      bandSamples: [
        {
          band: '4.0',
          text: `I want to talk about Da Lat. Da Lat is... uh... in Vietnam. In the mountain. I go there... uh... last year. With my family. Da Lat is very beautiful. Have many flower. And the weather is cool, not hot. We go to the lake and... uh... we eat... we eat... strawberry. Very delicious. And we take many photo. Uh... I like Da Lat very much. I want to go again because it is beautiful and cool. Uh... and... that's all.`,
          notesVi:
            "FC: Chỉ nói được khoảng 50 giây rồi dừng ('that's all'), ngập ngừng và lặp từ nhiều; không có trình tự câu chuyện.\nLR: Từ vựng tối thiểu (beautiful, cool, delicious) và lặp lại nhiều lần.\nGRA: Dùng hiện tại cho chuyện quá khứ ('I go there last year', 'We go'), thiếu chủ ngữ ('Have many flower').\nP: Nuốt âm cuối và -s ('flower', 'photo', 'strawberry' đều thiếu -s), các âm tiết nhấn đều nên khó nghe.",
        },
        {
          band: '5.5',
          text: `OK, I want to talk about Da Lat, it is a city in the Central Highlands of Vietnam. I went there last summer with my family, my parents and my younger sister.

We went by bus and it take about seven hours. When we arrived, the weather is very cool and fresh, very different with Ho Chi Minh City. We stayed in a small hotel near the lake.

In Da Lat we do many things. First, we visited a flower garden, there are many beautiful flowers. Then we went to a strawberry farm and we can pick strawberries by ourself. Then in the evening we went to the night market and eat grilled rice paper. It is very delicious.

I want to visit Da Lat again because the weather is cool and the food is very delicious. And, uh, I like the peaceful atmosphere. Next time I want to go with my friends, because, uh, it will be more fun. Yes, that is why I want to go there again.`,
          notesVi:
            "FC: Nói được khoảng 1 phút 30 giây và đi đủ 4 gợi ý, nhưng nối ý chủ yếu bằng 'Then', 'and', 'because' và ngập ngừng ở phần cuối.\nLR: Đủ từ để kể (strawberry farm, night market, peaceful atmosphere) nhưng lặp 'very delicious', 'very cool'; 'different with' sai giới từ.\nGRA: Lẫn quá khứ và hiện tại ('it take', 'the weather is', 'we can pick'); có câu phức nhưng hay sai.\nP: Nhìn chung hiểu được, nhưng thường bỏ đuôi -ed ('visited', 'stayed') và -s, khiến người nghe khó biết đang nói về quá khứ.",
        },
        {
          band: '6.5',
          text: `I'd like to talk about a small island off the south coast of Vietnam, which I visited about two years ago. I went there with two close friends from university, right after we finished our final exams, so it was kind of a celebration trip.

Getting there was a bit of an adventure. We took a night bus to the coast and then a ferry, which took nearly three hours, and to be honest, I felt seasick for most of the journey. But as soon as we arrived, I forgot all about it, because the water was incredibly clear and the beaches were almost empty.

We spent four days there. During the day, we hired, um, we rented motorbikes and rode around the island, stopping at little bays to swim. In the evenings we ate at a seafood stall run by a local family, and they grilled whatever they had caught that morning. The highlight of the trip, though, was a night tour to watch baby turtles crawl into the sea. Our guide explained that only a few of them survives to adulthood, so it was quite an emotional moment.

As for why I'd like to go back, I think it's mainly the peace and quiet. My life in the city is so hectic, and on the island there was no traffic noise at all, just the sound of the waves. Next time I'd love to take my parents, because they've never had a proper holiday by the sea, and I think they would really appreciate it.`,
          notesVi:
            "FC: Nói đủ khoảng 2 phút, câu chuyện có trình tự rõ (bối cảnh → diễn biến → điểm nhấn → lý do) và từ chuyển ý tự nhiên (As for…, The highlight… though); đôi lúc tự sửa từ ('hired, um, rented').\nLR: Từ vựng phong phú, đúng ngữ cảnh (seasick, hectic, a bit of an adventure, crawl into the sea), phần lớn chính xác dù chưa có nhiều từ thật sự hiếm.\nGRA: Kiểm soát tốt quá khứ đơn, có quá khứ hoàn thành ('whatever they had caught') và câu phức với which / as soon as; lỗi nhỏ 'only a few of them survives'.\nP: Rõ ràng, giữ được đuôi -ed; trọng âm và ngữ điệu nhìn chung tốt, đôi chỗ nhấn chưa đúng (a-DULT-hood) nhưng không cản trở việc hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Bạn có nói ít nhất 1 phút 40 giây không?',
            'Câu chuyện có đủ 3 phần: bối cảnh → diễn biến → cảm nghĩ không?',
            'Có dùng từ chuyển ý (After that, The highlight was, As for…) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 tính từ miêu tả cụ thể (peaceful, crowded, hectic…) thay cho "beautiful" không?',
            'Có tránh lặp "very" quá 3 lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Phần diễn biến có dùng quá khứ đơn nhất quán không?',
            'Phần cảm nghĩ có dùng "would / I\'d love to" không?',
            'Có ít nhất 2 câu phức (which, when, as soon as) không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Đuôi -ed (walked, stayed, visited) có nghe rõ đủ 3 cách đọc không?',
            'Nghe lại: từ khoá trong mỗi câu có được nhấn mạnh không?',
            'Có nối âm tự nhiên giữa phụ âm cuối và nguyên âm đầu (took_a, ate_at) không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'd like to talk about…",
        'It was about… years ago, just after…',
        'Getting there was a bit of an adventure.',
        'The highlight of the trip, though, was…',
        "As for why I'd like to go back, …",
        "Next time, I'd love to…",
      ],
      targetSounds: [
        'past -ed: /t/ walked, /d/ stayed, /ɪd/ visited',
        'final clusters: /st/ coast, /ks/ six',
        'sentence stress on key words (the HIGH-light was…)',
        'linking: took_a, ate_at',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4 — PART 2: TỪ ĐỆM TỰ NHIÊN vs NGẬP NGỪNG, NÓI ĐỦ 2 PHÚT · lễ kỷ niệm gia đình
  // ==========================================================================
  {
    id: 'l3-i-spk-04',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 2 – Nói đủ 2 phút: từ đệm tự nhiên và chỗ ngắt hợp lý',
      en: 'Part 2 – Keep talking for 2 minutes: natural fillers and pauses',
    },
    description: {
      vi: 'Phân biệt "ờ… à…" gây mất điểm với cách ngắt nghỉ tự nhiên, và biết cách mở rộng ý khi bí.',
      en: 'Tell the difference between "uh… um…" that costs marks and natural pauses, and expand your ideas when you get stuck.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ đệm: cái nào giúp, cái nào hại', en: 'Fillers: which help and which hurt' },
        body: {
          vi: '**Có hại**: "ờ… ờm…" kéo dài, lặp từ (*the the the*), ngừng giữa cụm từ (*a very… big… house*).\n**Tự nhiên** (dùng vừa phải): *Well…, Let me see…, What I mean is…, How can I put it…*\nNgắt nghỉ **đúng chỗ**: ở dấu phẩy, giữa hai ý — không ngắt giữa tính từ và danh từ.',
          en: '**Harmful**: long "uh… um…", repeated words (*the the the*), stopping inside a phrase (*a very… big… house*).\n**Natural** (in moderation): *Well…, Let me see…, What I mean is…, How can I put it…*\n**Pause in the right place**: at commas, between ideas — not between an adjective and its noun.',
        },
        examples: [
          { en: 'It was, well, the biggest family party we had ever had.', vi: '"well" chen tự nhiên, ngắt ở dấu phẩy.' },
          { en: 'What I mean is, everyone helped in some way.', vi: 'Cụm diễn giải lại ý — mua thời gian một cách có ích.' },
        ],
      },
      {
        title: { vi: 'Bí ý? Dùng 5 câu hỏi mở rộng', en: 'Stuck? Use five expansion questions' },
        body: {
          vi: 'Khi hết ý, tự hỏi: **Who?** (ai ở đó) — **What exactly?** (chi tiết: món ăn, âm thanh, màu sắc) — **How did I feel?** — **What happened next?** — **Compare** (lần này khác lần trước thế nào?).\nMỗi câu hỏi = thêm **15–20 giây** nói. Đừng kết thúc bằng "That\'s all".',
          en: 'When you run out of ideas, ask yourself: **Who?** (who was there) — **What exactly?** (details: food, sounds, colours) — **How did I feel?** — **What happened next?** — **Compare** (how was it different from before?).\nEach question = **15–20 more seconds**. Never finish with "That\'s all".',
        },
        examples: [{ en: 'Compared with previous years, this one felt much more relaxed.', vi: 'Câu so sánh giúp kéo dài phần cảm nghĩ.' }],
      },
      {
        title: { vi: 'Âm khó trong chủ đề lễ hội gia đình', en: 'Tricky sounds for family celebrations' },
        body: {
          vi: '**/θ/**: *thing, think, birthday, thirty* — đặt lưỡi giữa hai hàm răng, thổi hơi; không đọc thành /t/ hay /s/.\n**Cụm phụ âm cuối**: *friends* /ndz/, *guests* /sts/, *gifts* /fts/ — đọc chậm từng âm rồi tăng tốc.\nLỗi hay gặp: bỏ một âm trong cụm, "guests" thành "guest".',
          en: '**/θ/**: *thing, think, birthday, thirty* — tongue between your teeth, push the air out; not /t/ or /s/.\n**Final clusters**: *friends* /ndz/, *guests* /sts/, *gifts* /fts/ — say each sound slowly, then speed up.\nA common error is dropping part of the cluster: "guests" becomes "guest".',
        },
        examples: [
          {
            en: "My grandparents' fiftieth anniversary brought thirty guests together.",
            vi: 'Lễ kỷ niệm 50 năm ngày cưới của ông bà tôi quy tụ 30 vị khách.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-04-ex01',
        type: 'multiple-choice',
        question: 'Which version sounds most natural to an examiner?',
        options: [
          'It was a… a… a very… big… party.',
          'It was, well, a really big party, actually.',
          'Uh… uh… it was… uh… big party.',
          'It was big. Party. Very big.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"well", "actually" đặt đúng chỗ nghe tự nhiên; ngắt giữa cụm từ làm mất điểm FC.',
          en: '"Well" and "actually" in the right places sound natural; breaking phrases lowers FC.',
        },
      },
      {
        id: 'l3-i-spk-04-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm từ đệm với chức năng của nó.',
          en: 'Match each filler phrase with its function.',
        },
        pairs: [
          { left: 'Let me see…', right: 'buying a second to remember' },
          { left: 'What I mean is…', right: 'explaining your idea again' },
          { left: 'How can I put it…', right: 'searching for the right words' },
          { left: 'Anyway, …', right: 'returning to the main story' },
          { left: 'Funnily enough, …', right: 'introducing a surprising detail' },
        ],
        explanation: {
          vi: 'Từ đệm có chức năng rõ giúp bạn nói liền mạch mà không bị coi là ngập ngừng.',
          en: 'Fillers with a clear function keep you fluent without sounding hesitant.',
        },
      },
      {
        id: 'l3-i-spk-04-ex03',
        type: 'multiple-choice',
        question: 'You have talked for 50 seconds and run out of ideas. What is the best next step?',
        options: [
          'Say "That\'s all" and stop.',
          'Describe exactly what food was served and who cooked it.',
          'Repeat your first sentence again.',
          'Start talking about a different celebration.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Thêm chi tiết cụ thể (What exactly? Who?) để kéo dài mà vẫn đúng chủ đề.',
          en: 'Adding specific details (What exactly? Who?) extends your talk and stays on topic.',
        },
      },
      {
        id: 'l3-i-spk-04-ex04',
        type: 'fill-blank',
        sentence: '___ with previous years, this Tet felt much more relaxed.',
        acceptedAnswers: ['Compared'],
        explanation: {
          vi: '"Compared with…" mở câu so sánh để kéo dài phần cảm nghĩ.',
          en: '"Compared with…" starts a comparison that extends your reflection.',
        },
      },
      {
        id: 'l3-i-spk-04-ex05',
        type: 'arrange-words',
        translationVi: 'Điều tôi nhớ nhất là tiếng cười của mọi người.',
        correctSentence: 'What I remember most is the sound of everyone laughing.',
        extraWords: ['remembered'],
        explanation: {
          vi: 'Cấu trúc "What I remember most is…" nhấn mạnh chi tiết đáng nhớ.',
          en: '"What I remember most is…" highlights a memorable detail.',
        },
      },
      {
        id: 'l3-i-spk-04-ex06',
        type: 'speak-sentence',
        sentence: "My grandparents' fiftieth anniversary brought thirty guests together.",
        translationVi: 'Lễ kỷ niệm 50 năm ngày cưới của ông bà tôi quy tụ 30 vị khách.',
        explanation: {
          vi: '/θ/ trong "fiftieth, thirty"; cụm cuối /nts/ ở grandparents, /sts/ ở guests.',
          en: 'Practise /θ/ in "fiftieth" and "thirty", and the endings of "grandparents" and "guests".',
        },
      },
      {
        id: 'l3-i-spk-04-ex07',
        type: 'speak-sentence',
        sentence: 'All my friends and relatives brought gifts and lots of food.',
        translationVi: 'Tất cả bạn bè và họ hàng tôi đều mang quà và rất nhiều đồ ăn.',
        explanation: {
          vi: 'Cụm phụ âm cuối: friends /ndz/, relatives /vz/, gifts /fts/; đừng bỏ âm ở giữa.',
          en: 'Final clusters: friends /ndz/, relatives /vz/, gifts /fts/. Do not drop the middle sound.',
        },
      },
    ],
    speakingTask: {
      part: 2,
      questions: ['Describe a family celebration that you enjoyed.'],
      cueCard: {
        topic: 'Describe a family celebration that you enjoyed.',
        points: [
          'what the celebration was',
          'when and where it took place',
          'who was there and what people did',
          'and explain why you enjoyed it',
        ],
      },
      bandSamples: [
        {
          band: '4.0',
          text: `Uh... I talk about Tet. Tet is... uh... Vietnamese New Year. Every year. Last year... uh... my family go to my grandmother house. In the... in the countryside. Have many people. My uncle, my aunt, my cousin. We eat... uh... banh chung and... uh... many food. Children get lucky money. I very happy. Uh... I like Tet because... because I can see my family and... and I don't go to school. Uh... Tet is very... very fun. Uh... that's all.`,
          notesVi:
            "FC: Dừng sau khoảng 45 giây, 'uh' xuất hiện ở hầu hết các câu, lặp từ ('because… because', 'very… very').\nLR: Chỉ đủ từ để nêu ý cơ bản (family, food, happy), không miêu tả được chi tiết.\nGRA: Dùng hiện tại cho chuyện năm ngoái ('my family go'), thiếu sở hữu cách ('grandmother house') và thiếu động từ ('I very happy').\nP: Bỏ âm cuối và -s ('cousin(s)', 'aunt'), nhịp đều từng chữ nên khó theo dõi.",
        },
        {
          band: '5.5',
          text: `OK, I will talk about my grandparents' wedding anniversary. It was their fiftieth anniversary, and we celebrated it last December at my grandparents' house in Nam Dinh.

There were many people there, about thirty people. My parents, my uncles, my aunts, and all my cousins. Everybody help to prepare the party. The women cook a lot of traditional food, like spring rolls, boiled chicken and sticky rice. The men, uh, they set up the tables and chairs in the yard.

During the party, my uncle make a speech about my grandparents' life. He told a story about how they meet each other, and everybody laughed a lot. Then the children sang a song for my grandparents, uh, and my grandmother cried because she was very happy.

I enjoyed this celebration because, uh, it is very rare that all the family is together. Usually everyone is busy and live in different cities. So, uh, this day was very special for me and I think it is very meaningful. I will remember it forever.`,
          notesVi:
            "FC: Nói được khoảng 1 phút 40 giây, đủ ý, nhưng còn 'uh' ở chỗ chuyển ý và nối câu chủ yếu bằng 'and', 'then', 'because'.\nLR: Có từ chủ đề hợp lý (wedding anniversary, sticky rice, set up the tables) nhưng lặp 'very', 'many people'.\nGRA: Quá khứ chưa nhất quán ('Everybody help', 'The women cook', 'my uncle make', 'how they meet'); câu phức có nhưng đơn giản.\nP: Dễ hiểu phần lớn; /θ/ trong 'thirty', 'fiftieth' còn đọc thành /t/, đuôi -ed lúc có lúc không.",
        },
        {
          band: '6.5',
          text: `I'm going to talk about my grandparents' fiftieth wedding anniversary, which we celebrated last December at their house in the countryside, about two hours from Hanoi.

It was a big occasion, so the whole extended family came, around thirty of us in total, including some relatives I hadn't seen for years. Preparations started the day before. The women in the family took charge of the cooking, and they made all the, the traditional dishes, things like spring rolls, boiled chicken and sticky rice. My cousins and I were in charge of decorating the yard with lights and flowers, which was, well, more chaotic than we expected, because the youngest kids kept pulling the lights down.

The party itself was in the evening. My uncle gave a speech about how my grandparents met, apparently they were neighbours and my grandfather used to cycle past her house every day just to say hello. Everyone burst out laughing, and my grandmother was so embarrassed. Then the grandchildren performed a song we had practised, and by the end of it, my grandmother was in tears, happy tears, of course.

The reason I enjoyed it so much is that it's quite rare for our family to be together these days. Most of us live in different cities and we're all so busy with work and study. So that evening reminded me how important it is to make time for the people who matters. What I remember most is just the sound of everyone laughing in that small yard.`,
          notesVi:
            "FC: Nói liền mạch khoảng 2 phút, câu chuyện có trình tự và chi tiết sinh động; từ đệm tự nhiên ('well', 'apparently') thay cho 'uh', chỉ có một chỗ lặp từ ('all the, the').\nLR: Từ vựng linh hoạt (extended family, took charge of, burst out laughing, in tears), diễn đạt được cảm xúc; chưa có nhiều từ thật sự hiếm.\nGRA: Dùng tốt quá khứ đơn, quá khứ hoàn thành ('I hadn't seen', 'we had practised') và 'used to'; còn lỗi 'the people who matters' và vài câu dài nối lỏng.\nP: Rõ ràng, /θ/ và cụm phụ âm cuối phần lớn đúng; ngữ điệu khi kể có lên xuống nhưng đôi lúc còn hơi đều.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Bạn có nói gần đủ 2 phút mà không dừng bằng "That\'s all" không?',
            'Khi bí ý, bạn có dùng 5 câu hỏi mở rộng (Who? What exactly?…) không?',
            'Số lần "uh / ờ" kéo dài có ít hơn 5 không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có ít nhất 3 cụm miêu tả cảm xúc, không khí (burst out laughing, in tears…) không?',
            'Có gọi đúng tên món ăn, hoạt động thay vì "many food" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Toàn bộ phần kể có dùng quá khứ nhất quán không?',
            'Có ít nhất 1 câu quá khứ hoàn thành hoặc "used to" không?',
            'Sở hữu cách (my grandparents\' house) có đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            '/θ/ trong "thirty, fiftieth" có đặt lưỡi giữa răng không?',
            'Cụm phụ âm cuối (friends, guests, gifts) có đủ âm không?',
            'Bạn có ngắt nghỉ ở chỗ chuyển ý thay vì giữa cụm từ không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'm going to talk about…",
        'It was a big occasion, so…',
        'The party itself was…',
        'Everyone burst out laughing.',
        'What I remember most is…',
        'The reason I enjoyed it so much is that…',
      ],
      targetSounds: [
        '/θ/ (thirty, fiftieth, birthday)',
        'final clusters: /ndz/ friends, /sts/ guests, /fts/ gifts',
        "possessive -s (grandparents' house)",
        'natural pauses at commas, not inside phrases',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 5 — PART 2: LUYỆN TRỌN VẸN + HIỆN TẠI HOÀN THÀNH · đồ vật giữ lâu năm
  // ==========================================================================
  {
    id: 'l3-i-spk-05',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 2 – Luyện trọn vẹn: tả đồ vật, nối quá khứ với hiện tại',
      en: 'Part 2 – Full practice: describing an object and linking past to present',
    },
    description: {
      vi: 'Tự làm một lượt Part 2 hoàn chỉnh (1 phút chuẩn bị + 2 phút nói) và dùng hiện tại hoàn thành để nối quá khứ với hiện tại.',
      en: 'Do a complete Part 2 turn (1 minute to prepare + 2 minutes to talk) and use the present perfect to link past and present.',
    },
    teachingCards: [
      {
        title: { vi: 'Hiện tại hoàn thành cho đồ vật "đã giữ lâu"', en: 'The present perfect for things you have kept' },
        body: {
          vi: 'Đề kiểu *"something you have kept for a long time"* cần **hiện tại hoàn thành**: *I have had it **for** ten years / **since** I was twelve*.\nKể lúc nhận được → **quá khứ đơn**: *My grandfather gave it to me in 2015*.\nSai hay gặp: "I have it for ten years" (thiếu "had").',
          en: 'Tasks like *"something you have kept for a long time"* need the **present perfect**: *I have had it **for** ten years / **since** I was twelve*.\nWhen you got it → **past simple**: *My grandfather gave it to me in 2015*.\nCommon error: "I have it for ten years" (missing "had").',
        },
        examples: [
          { en: "I've had this watch since I was fifteen.", vi: 'Tôi có chiếc đồng hồ này từ năm 15 tuổi.' },
          { en: 'My grandfather gave it to me when I passed my exams.', vi: 'Ông tôi tặng nó cho tôi khi tôi thi đỗ.' },
        ],
      },
      {
        title: { vi: 'Tả đồ vật: hình dáng → câu chuyện → ý nghĩa', en: 'Describing an object: appearance → story → meaning' },
        body: {
          vi: '**Hình dáng** (20 giây): kích thước, màu, chất liệu (*made of, worn out, scratched*).\n**Câu chuyện** (50 giây): ai cho, khi nào, đã cùng bạn trải qua gì.\n**Ý nghĩa** (40 giây): vì sao giữ, gợi nhớ điều gì, bạn sẽ làm gì với nó.\nKết bằng 1 câu **tròn ý** thay vì "That\'s all": *So, for me, it is more than just a…*',
          en: '**Appearance** (20 s): size, colour, material (*made of, worn out, scratched*).\n**Story** (50 s): who gave it to you, when, what you have been through together.\n**Meaning** (40 s): why you keep it, what it reminds you of, what you will do with it.\nFinish with a **rounding-off sentence** instead of "That\'s all": *So, for me, it is more than just a…*',
        },
        examples: [
          {
            en: "So, for me, it's more than just an old bicycle. It's a piece of my childhood.",
            vi: 'Câu kết tròn ý, nhấn mạnh ý nghĩa của đồ vật.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-05-ex01',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I have this bicycle for ten years.',
          "I've had this bicycle for ten years.",
          'I had this bicycle since ten years.',
          "I'm having this bicycle for ten years.",
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Bắt đầu trong quá khứ, còn kéo dài đến nay → hiện tại hoàn thành + for.',
          en: 'Something that started in the past and continues now needs the present perfect + for.',
        },
      },
      {
        id: 'l3-i-spk-05-ex02',
        type: 'fill-blank',
        sentence: "I've kept it ___ I was in primary school.",
        acceptedAnswers: ['since'],
        explanation: {
          vi: '"since" + mốc thời gian (since I was…); "for" + khoảng thời gian (for ten years).',
          en: '"Since" + a starting point; "for" + a length of time.',
        },
      },
      {
        id: 'l3-i-spk-05-ex03',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ miêu tả đồ vật với nghĩa của nó.',
          en: 'Match the words for describing objects with their meanings.',
        },
        pairs: [
          { left: 'worn out', right: 'old and damaged from a lot of use' },
          { left: 'scratched', right: 'with small marks on the surface' },
          { left: 'precious', right: 'very valuable to you' },
          { left: 'second-hand', right: 'owned by someone else before' },
          { left: 'sentimental value', right: 'importance because of memories' },
        ],
        explanation: {
          vi: 'Từ cụ thể về tình trạng và ý nghĩa giúp phần tả đồ vật sinh động hơn.',
          en: 'Precise words for condition and meaning make your description vivid.',
        },
      },
      {
        id: 'l3-i-spk-05-ex04',
        type: 'multiple-choice',
        question: 'Which is the best way to finish your Part 2 talk?',
        options: [
          "That's all. Thank you.",
          "So, for me, it's more than just a radio. It reminds me of my grandfather every day.",
          'I finish now.',
          'And… and… yes.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu kết tròn ý nhắc lại ý nghĩa, cho thấy bạn kiểm soát được bài nói.',
          en: 'A rounding-off sentence restates the meaning and shows control of your talk.',
        },
      },
      {
        id: 'l3-i-spk-05-ex05',
        type: 'speak-sentence',
        sentence: "I've had it for years, and it's still in good condition.",
        translationVi: 'Tôi đã có nó nhiều năm, và nó vẫn còn tốt.',
        explanation: {
          vi: 'Đọc rõ "I\'ve" có /v/ và "it\'s" có /ts/; "years" kết thúc bằng /z/.',
          en: 'Say "I\'ve" with /v/ and "it\'s" with /ts/; "years" ends in /z/.',
        },
      },
      {
        id: 'l3-i-spk-05-ex06',
        type: 'speak-answer',
        question: "Talk for 40 seconds: describe what your object looks like and how long you've had it.",
        tipsVi:
          'Nói hình dáng (màu, kích thước, chất liệu, tình trạng) + "I\'ve had it for / since…". Dùng ít nhất 2 từ trong bài nối từ.',
        sampleAnswer:
          "The thing I want to describe is an old wooden radio. It's about the size of a shoebox, dark brown, and a bit scratched on the top. I've had it since I was ten, so that's almost fifteen years now. It still works, although you sometimes have to tap it gently on the side.",
        recordSeconds: 45,
        explanation: {
          vi: 'Phần tả tốt có chi tiết cụ thể và dùng đúng hiện tại hoàn thành.',
          en: 'A good description has specific details and a correct present perfect.',
        },
      },
    ],
    speakingTask: {
      part: 2,
      questions: ['Describe something you own that you have kept for a long time.'],
      cueCard: {
        topic: 'Describe something you own that you have kept for a long time.',
        points: ['what it is', 'how you got it', 'how long you have had it', 'and explain why you have kept it for so long'],
      },
      bandSamples: [
        {
          band: '4.0',
          text: `I talk about my watch. My watch is... uh... black. Small. My father give me. When I... I... fourteen years old. I have it... uh... ten years. Now it is old but I still use. Uh... I keep it because my father give me and it is... uh... important. I like it very much. It is very good watch. Uh... that's all.`,
          notesVi:
            "FC: Chỉ nói khoảng 40 giây, câu cụt, ngập ngừng liên tục và dừng sớm.\nLR: Từ vựng tối thiểu (black, small, old, important), không miêu tả được cảm xúc hay câu chuyện.\nGRA: Không dùng được hiện tại hoàn thành ('I have it ten years'), quá khứ sai ('My father give me').\nP: Mất âm cuối ('watch' nghe như 'wat', 'old' thành 'o'), thiếu -s, có chỗ khó nghe.",
        },
        {
          band: '5.5',
          text: `I want to talk about my bicycle. It is a blue bicycle, quite old now, and it has a small basket in front. My parents bought it for me when I start secondary school, so I have it for about ten years.

Every day I ride it to school, about three kilometres. Sometimes I ride it with my friends in the weekend to the park or to eat street food. One time it is broken on the way to school and I have to push it, so I was late. But my father fix it for me.

Now I am at university and I don't ride it every day, but I still keep it in my house. I keep it because it has many memories of my school time and my friends. Also my parents bought it, so it is very special for me. I don't want to sell it or give it to other people. I think I will keep it forever, maybe for my children.`,
          notesVi:
            "FC: Nói được khoảng 1 phút 30 giây và đủ ý chính; mạch chuyện dễ theo nhưng câu nối đơn giản (and, so, but).\nLR: Đủ từ để kể (basket, push it, memories) nhưng chưa có cụm miêu tả cụ thể; 'in the weekend' sai giới từ.\nGRA: Sai đúng ở trọng tâm của đề: 'I have it for about ten years' (cần I've had); lẫn thì quá khứ – hiện tại ('when I start', 'it is broken', 'my father fix').\nP: Hiểu được, nhưng âm cuối /t/ /d/ và đuôi -ed thường bị bỏ ('bought', 'started').",
        },
        {
          band: '6.5',
          text: `The thing I'd like to describe is an old wooden radio that used to belong to my grandfather. It's about the size of a shoebox, dark brown, with a couple of big round buttons on the front, and it's quite scratched on the top because it's been moved around so many times.

I got it about twelve years ago. My grandfather was a big fan of, um, football and news programmes, and he listened to this radio every single evening. When he moved in with my aunt, he couldn't take many furnitures with him, so he gave it to me, mainly because I was the only grandchild who used to sit and listen to it with him.

So I've had it for over a decade now, and surprisingly it still works, although the sound is a bit crackly and sometimes you have to tap it on the side to get a signal. I don't really use it to listen to the radio anymore, to be honest, because I've got my phone for that, but I keep it on the shelf right next to my desk.

The main reason I've kept it for so long is the sentimental value. Whenever I look at it, it reminds me of those evenings with my grandfather, the way he'd explain the news to me as if I was an adult. My mum has suggested selling it a few times, since apparently old radios like this are worth quite a bit, but I'd never do that. So, for me, it's more than just an old radio, it's like a little piece of my childhood.`,
          notesVi:
            "FC: Nói trọn khoảng 2 phút, đi qua hình dáng → câu chuyện → ý nghĩa và kết bằng câu tròn ý; chỉ ngập ngừng ngắn ('um') khi tìm ý.\nLR: Dùng từ chính xác, tự nhiên (scratched, crackly, sentimental value, used to belong to), tuy chưa có nhiều thành ngữ hay từ hiếm.\nGRA: Kiểm soát tốt hiện tại hoàn thành ('I've had it for over a decade', 'it's been moved around') và 'used to / would'; lỗi ở danh từ không đếm được ('many furnitures') không gây khó hiểu.\nP: Rõ ràng, các dạng rút gọn (I've, it's, I'd) đọc đúng; vài từ dài nhấn chưa chuẩn (sen-ti-MEN-tal) nhưng không cản trở việc hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Bạn có nói đủ 3 phần: hình dáng → câu chuyện → ý nghĩa không?',
            'Có kết bằng câu tròn ý thay vì "That\'s all" không?',
            'Bạn có nói liên tục ít nhất 1 phút 40 giây không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 2 từ tả tình trạng (scratched, worn out…) không?',
            'Có dùng "sentimental value" hoặc cách nói tương đương về kỷ niệm không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Ý "how long you have had it" có được trả lời bằng hiện tại hoàn thành (I\'ve had it for / since) không?',
            'Ý "how you got it" có dùng quá khứ đơn không?',
            'Có dùng "used to" hoặc "would" để kể thói quen trong quá khứ không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Dạng rút gọn I\'ve, it\'s có nghe rõ /v/, /s/ không?',
            'Âm cuối /t/ /d/ trong "bought, old, used" có được giữ không?',
            'Trọng âm của các từ dài (memories, sentimental) có đúng không?',
          ],
        },
      ],
      usefulPhrases: [
        "The thing I'd like to describe is…",
        'It used to belong to…',
        "I've had it for over… / since…",
        'It still works, although…',
        "The main reason I've kept it is the sentimental value.",
        "So, for me, it's more than just a…",
      ],
      targetSounds: [
        "contractions with /v/ /s/ /d/: I've, it's, I'd",
        'final /t/ /d/: bought, old, used',
        'word stress: sen-ti-MEN-tal, MEM-o-ries',
        'final -s after consonants: buttons, programmes',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 6 — PART 3: NÊU QUAN ĐIỂM VÀ LÝ DO (khung O-R-E-C) · Giáo dục
  // ==========================================================================
  {
    id: 'l3-i-spk-06',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 3 – Nêu quan điểm và giải thích lý do (Giáo dục)',
      en: 'Part 3 – Giving opinions and explaining reasons (Education)',
    },
    description: {
      vi: 'Trả lời câu hỏi trừu tượng bằng khung O-R-E-C: quan điểm, lý do, ví dụ, mặt trái.',
      en: 'Answer abstract questions with the O-R-E-C frame: opinion, reason, example, contrast.',
    },
    teachingCards: [
      {
        title: { vi: 'Part 3 khác Part 1 thế nào', en: 'How Part 3 differs from Part 1' },
        body: {
          vi: 'Part 3 (4–5 phút) hỏi về **xã hội, con người nói chung**, không chỉ về bạn. Mỗi câu trả lời **30–60 giây**.\nDùng chủ ngữ chung: *people, young people, society, many families* thay vì chỉ *I*.\nGiám khảo muốn nghe bạn **lập luận**, không phải kể chuyện.',
          en: 'Part 3 (4–5 minutes) asks about **society and people in general**, not just you. Each answer lasts **30–60 seconds**.\nUse general subjects: *people, young people, society, many families* rather than only *I*.\nThe examiner wants to hear you **reason**, not tell a story.',
        },
        examples: [
          {
            en: 'Part 1: Do you like studying in groups? Part 3: Why do some people learn better in groups?',
            vi: 'Part 1 hỏi về bạn; Part 3 hỏi về con người nói chung.',
          },
        ],
      },
      {
        title: { vi: 'Khung O-R-E-C', en: 'The O-R-E-C frame' },
        body: {
          vi: '**O – Opinion**: *I would say… / I strongly believe…*\n**R – Reason**: *mainly because… / The main reason is that…*\n**E – Example**: *For instance, in Vietnam… / Take my cousin, for example…*\n**C – Contrast**: *That said, … / On the other hand, some people…*\nPhần C cho thấy bạn nhìn nhiều phía — dấu hiệu của band 6 trở lên.',
          en: '**O – Opinion**: *I would say… / I strongly believe…*\n**R – Reason**: *mainly because… / The main reason is that…*\n**E – Example**: *For instance, in Vietnam… / Take my cousin, for example…*\n**C – Contrast**: *That said, … / On the other hand, some people…*\nThe C part shows you see more than one side, a sign of band 6 and above.',
        },
        examples: [
          {
            en: "I'd say practical skills matter more, mainly because most jobs need them. That said, exams still have a role.",
            vi: 'Một câu trả lời O-R-C ngắn; thêm ví dụ (E) là đủ khung.',
          },
        ],
      },
      {
        title: { vi: 'Trọng âm từ học thuật', en: 'Stress in academic words' },
        body: {
          vi: 'Từ dài trong Part 3 hay bị đọc **đều mọi âm tiết**. Nhớ âm được nhấn:\n*e-du-CA-tion, com-MU-ni-cate, a-ca-DEM-ic, PRAC-ti-cal, re-SPON-si-ble*.\nÂm không nhấn thường đọc nhẹ thành /ə/: *practical* /ˈpræktɪkəl/.',
          en: 'Long Part 3 words are often said with **equal stress on every syllable**. Remember the stressed syllable:\n*e-du-CA-tion, com-MU-ni-cate, a-ca-DEM-ic, PRAC-ti-cal, re-SPON-si-ble*.\nUnstressed syllables are often reduced to /ə/: *practical* /ˈpræktɪkəl/.',
        },
        examples: [{ en: 'Practical education helps students communicate better.', vi: 'Giáo dục thực tiễn giúp học sinh giao tiếp tốt hơn.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-06-ex01',
        type: 'multiple-choice',
        question: 'Question: "Why do some people learn better in groups?" Which answer is most suitable for Part 3?',
        options: [
          'I like studying in groups because my friends are funny.',
          'I think it is mainly because explaining ideas to others helps people understand them more deeply. For example, students who teach a classmate often remember the lesson better. That said, some people find groups distracting.',
          'Yes, groups.',
          'Because groups are good and people like groups.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Phương án B có đủ O-R-E-C và nói về con người nói chung, không chỉ bản thân.',
          en: 'B has O-R-E-C and talks about people in general, not only yourself.',
        },
      },
      {
        id: 'l3-i-spk-06-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối mỗi phần của khung O-R-E-C với câu phù hợp.',
          en: 'Match each part of O-R-E-C with the right sentence.',
        },
        pairs: [
          { left: 'Opinion', right: "I'd argue that schools should teach money management." },
          { left: 'Reason', right: 'The main reason is that many young people get into debt early.' },
          { left: 'Example', right: 'Take my cousin, who spent his first salary in a week.' },
          { left: 'Contrast', right: 'That said, parents also have a role to play.' },
        ],
        explanation: {
          vi: "Mỗi phần có cụm mở đầu riêng: I'd argue / The main reason / Take… / That said.",
          en: "Each part has its own opener: I'd argue / The main reason / Take… / That said.",
        },
      },
      {
        id: 'l3-i-spk-06-ex03',
        type: 'fill-blank',
        sentence: 'That ___, exams are still useful for measuring basic knowledge.',
        acceptedAnswers: ['said'],
        explanation: {
          vi: '"That said," = tuy vậy; dùng để thêm mặt trái (phần C).',
          en: '"That said" means "however" and introduces the contrast.',
        },
      },
      {
        id: 'l3-i-spk-06-ex04',
        type: 'multiple-choice',
        question: 'Which subject is best for a Part 3 answer about society?',
        options: ['I', 'My best friend', 'Many young people nowadays', 'My teacher, Mr Nam'],
        correctIndex: 2,
        explanation: {
          vi: 'Part 3 cần chủ ngữ chung (many young people) để bàn về xã hội.',
          en: 'Part 3 needs general subjects such as "many young people" to discuss society.',
        },
      },
      {
        id: 'l3-i-spk-06-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối để tạo cụm từ (collocation) về giáo dục.',
          en: 'Match the halves to make education collocations.',
        },
        pairs: [
          { left: 'rote', right: 'learning' },
          { left: 'critical', right: 'thinking' },
          { left: 'hands-on', right: 'experience' },
          { left: 'academic', right: 'pressure' },
          { left: 'a well-rounded', right: 'education' },
        ],
        explanation: {
          vi: 'Collocation học thuật giúp câu trả lời Part 3 chính xác và tự nhiên hơn.',
          en: 'Academic collocations make Part 3 answers more precise and natural.',
        },
      },
      {
        id: 'l3-i-spk-06-ex06',
        type: 'speak-sentence',
        sentence: 'Practical education helps students communicate and think critically.',
        translationVi: 'Giáo dục thực tiễn giúp học sinh giao tiếp và tư duy phản biện.',
        explanation: {
          vi: 'Nhấn PRAC-ti-cal, e-du-CA-tion, com-MU-ni-cate, CRI-ti-cal-ly; giữ /ps/ trong "helps".',
          en: 'Stress PRAC-ti-cal, e-du-CA-tion, com-MU-ni-cate, CRI-ti-cal-ly; keep /ps/ in "helps".',
        },
      },
      {
        id: 'l3-i-spk-06-ex07',
        type: 'speak-answer',
        question: 'Should schools teach practical life skills, such as managing money?',
        tipsVi:
          'Dùng O-R-E-C trong khoảng 40 giây: quan điểm → lý do → ví dụ → "That said, …". Nói về học sinh nói chung, không chỉ bản thân.',
        sampleAnswer:
          "I'd say yes, definitely. The main reason is that many young people leave school without knowing how to budget or save, so they get into debt quite easily. For instance, a lot of students in my country spend their first salary within a week. That said, schools can't do everything, so parents should also teach these skills at home.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời Part 3 tốt có quan điểm rõ, lý do, ví dụ và một mặt trái.',
          en: 'A strong Part 3 answer has a clear opinion, a reason, an example and a contrast.',
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        'Why do some people learn better in groups, while others prefer to study alone?',
        'Should schools focus more on practical skills than on academic subjects?',
        'Do you think exams are a good way to measure what students have learned?',
      ],
      bandSamples: [
        {
          band: '4.0',
          text: `Q: Why do some people learn better in groups, while others prefer to study alone?
A: Uh... I think group is good. Because... uh... friends can help. But some people like alone because it is quiet.
Q: Should schools focus more on practical skills than on academic subjects?
A: Yes. Practical is... uh... important. Student need... uh... skill for job. Academic also important. Both.
Q: Do you think exams are a good way to measure what students have learned?
A: Uh... exam... I don't like exam. It is... very stress. Uh... but it is necessary. I don't know.`,
          notesVi:
            "FC: Câu trả lời rất ngắn so với Part 3, nhiều quãng dừng, kết thúc bằng 'I don't know' thay vì lập luận.\nLR: Không đủ từ cho chủ đề trừu tượng; nhầm từ loại ('Practical is important', 'very stress').\nGRA: Gần như chỉ có cụm từ hoặc câu đơn sai ('Student need skill').\nP: Từ dài bị nhấn đều mọi âm tiết (ac-a-dem-ic, prac-ti-cal), nuốt -s và âm cuối nên khó theo dõi.",
        },
        {
          band: '5.5',
          text: `Q: Why do some people learn better in groups, while others prefer to study alone?
A: I think it depends on the personality. Some people are extrovert, they like to talk and share ideas, so they learn better in groups. But other people are introvert and they need quiet place to focus. For example, my sister always study alone in her room because she said groups are noisy.
Q: Should schools focus more on practical skills than on academic subjects?
A: In my opinion, yes, schools should teach more practical skills. Because in Vietnam, students study a lot of theory but when they graduate they don't know how to do the job. For example, they don't know how to write an email or, uh, how to work in a team. But academic subjects is also important, so, uh, we need both.
Q: Do you think exams are a good way to measure what students have learned?
A: Not really. Exams only test memory. Many students just learn by heart before the exam and then they forget everything. Also, some students are very good but they feel nervous in the exam, so they get low score. I think teachers should use projects or presentations.`,
          notesVi:
            "FC: Trả lời đủ dài, có lý do và ví dụ, nhưng lặp 'For example', 'so', 'because' và ngập ngừng khi ý phức tạp.\nLR: Có từ chủ đề (personality, theory, learn by heart, presentations) nhưng sai từ loại ('are extrovert') và chưa diễn đạt linh hoạt.\nGRA: Câu phức có nhưng hay sai ('my sister always study', 'academic subjects is', thiếu mạo từ 'quiet place'); có câu 'Because…' tách rời.\nP: Hiểu được, nhưng trọng âm từ dài chưa ổn định (aca-DE-mic) và đuôi -s hay bị mất ('students', 'subjects').",
        },
        {
          band: '6.5',
          text: `Q: Why do some people learn better in groups, while others prefer to study alone?
A: I think it largely comes down to personality and the kind of task. Outgoing people tend to learn by talking things through, so explaining an idea to a classmate actually helps them understand it more deeply. On the other hand, people who are more introverted often find groups, er, distracting, especially when the task needs a lot of concentration, like memorising formulas. So I'd say the ideal is probably a mix of both.
Q: Should schools focus more on practical skills than on academic subjects?
A: I'd argue that they should at least give practical skills more attention than they do now. In Vietnam, students spend a huge amount of time on theory, but many graduates still struggle with basic things like writing a professional email or managing a budget. That said, I wouldn't want academic subjects to be pushed aside completely, because things like maths and science train you to think logically, which is a practical skill in itself.
Q: Do you think exams are a good way to measure what students have learned?
A: Only to some extent. Exams are fair in the sense that everyone answers the same questions under the same conditions. But they mainly reward memory and the ability to perform under pressure. A student who understands the subject well but gets very anxious might do badly, which doesn't really reflect what he know. I think combining exams with projects would give a more accurate picture.`,
          notesVi:
            "FC: Trả lời dài, mạch lạc, lập luận nhiều phía (On the other hand, That said); chỉ ngập ngừng ngắn ('er') khi tìm từ.\nLR: Từ vựng đủ linh hoạt cho chủ đề trừu tượng (comes down to, pushed aside, perform under pressure, an accurate picture).\nGRA: Nhiều cấu trúc phức (which…, especially when…, I wouldn't want… to be…); còn lỗi nhỏ như 'what he know'.\nP: Rõ ràng, trọng âm từ dài phần lớn đúng; ngữ điệu nhấn được ý đối lập nhưng đôi chỗ còn đều.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi câu trả lời có kéo dài 30–60 giây không?',
            'Có dùng khung O-R-E-C (có cả phần "That said…") không?',
            'Có tránh kết thúc bằng "I don\'t know" không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 2 collocation giáo dục (rote learning, critical thinking…) không?',
            'Có dùng chủ ngữ chung (many students, society) thay vì chỉ "I" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có ít nhất 2 câu phức (which…, especially when…) không?',
            'Chủ ngữ số ít có đi với động từ thêm -s (a student knows) không?',
            'Có tránh câu "Because…" đứng riêng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Từ dài (education, academic, practical) có nhấn đúng âm không?',
            'Âm cuối /s/ trong "students, subjects" có nghe rõ không?',
            'Bạn có nhấn mạnh từ thể hiện đối lập (but, however) không?',
          ],
        },
      ],
      usefulPhrases: [
        'I think it largely comes down to…',
        "I'd argue that…",
        'The main reason is that…',
        'Take…, for example.',
        'That said, …',
        'Only to some extent.',
      ],
      targetSounds: [
        'word stress in long words: e-du-CA-tion, a-ca-DEM-ic, PRAC-ti-cal',
        'schwa /ə/ in unstressed syllables',
        'third-person -s: it helps, he knows',
        'final clusters: /kts/ subjects, /nts/ students',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 7 — PART 3: SO SÁNH (xưa – nay, thành thị – nông thôn) · Nhà ở, đô thị
  // ==========================================================================
  {
    id: 'l3-i-spk-07',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 3 – So sánh: xưa và nay, thành thị và nông thôn',
      en: 'Part 3 – Comparing: past and present, city and countryside',
    },
    description: {
      vi: 'Dùng so sánh hơn, "used to", "whereas" và "compared with" để trả lời câu hỏi so sánh về nhà ở và đô thị.',
      en: 'Use comparatives, "used to", "whereas" and "compared with" to answer comparison questions about homes and cities.',
    },
    teachingCards: [
      {
        title: { vi: 'Ngôn ngữ so sánh xưa – nay', en: 'Comparing past and present' },
        body: {
          vi: '• **used to + V**: *People **used to** live with three generations under one roof.*\n• **Hiện tại hoàn thành** cho sự thay đổi: *Homes **have become** smaller.*\n• **These days / Nowadays** + hiện tại đơn.\n• Mức độ: **much / far / a lot + so sánh hơn** (*far more expensive*), *not as… as*.',
          en: '• **used to + verb**: *People **used to** live with three generations under one roof.*\n• **Present perfect** for change: *Homes **have become** smaller.*\n• **These days / Nowadays** + present simple.\n• Degree: **much / far / a lot + comparative** (*far more expensive*), *not as… as*.',
        },
        examples: [
          {
            en: 'Houses used to have big yards, whereas these days most young families live in flats.',
            vi: 'Trước đây nhà có sân rộng, trong khi ngày nay phần lớn gia đình trẻ sống trong căn hộ.',
          },
        ],
      },
      {
        title: { vi: 'So sánh hai nơi / hai nhóm', en: 'Comparing two places or groups' },
        body: {
          vi: 'Khung: **khác biệt chính** → **giải thích** → **ví dụ** → **điểm giống / ngoại lệ**.\nTừ nối: *whereas, while, compared with, in contrast, the main difference is that…*\nTránh nói tuyệt đối ("All young people…"); dùng *tend to, generally, most*.',
          en: 'Frame: **main difference** → **explanation** → **example** → **similarity / exception**.\nLinkers: *whereas, while, compared with, in contrast, the main difference is that…*\nAvoid absolutes ("All young people…"); use *tend to, generally, most*.',
        },
        examples: [
          {
            en: 'City dwellers tend to have more job opportunities, while people in the countryside generally enjoy a slower pace of life.',
            vi: 'Dùng "tend to", "generally" để tránh khái quát quá mức.',
          },
        ],
      },
      {
        title: { vi: 'Âm /ð/ và đuôi -er', en: '/ð/ and the -er ending' },
        body: {
          vi: '**/ð/** xuất hiện liên tục khi so sánh: *than, these, those, other, whether*. Đừng đọc thành /d/ hay /z/.\nĐuôi **-er** của so sánh hơn đọc nhẹ /ə/: *bigger* /ˈbɪɡə/, *cheaper* /ˈtʃiːpə/ — không đọc thành "bích-gơ".\n**used to** đọc /ˈjuːstə/ (âm /s/, không phải /z/).',
          en: '**/ð/** appears constantly in comparisons: *than, these, those, other, whether*. Do not say /d/ or /z/.\nThe comparative **-er** is a weak /ə/: *bigger* /ˈbɪɡə/, *cheaper* /ˈtʃiːpə/.\n**Used to** is /ˈjuːstə/ (with /s/, not /z/).',
        },
        examples: [{ en: 'These flats are cheaper than those in the centre.', vi: 'Những căn hộ này rẻ hơn những căn ở trung tâm.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-07-ex01',
        type: 'multiple-choice',
        question: 'Which sentence compares the past and the present correctly?',
        options: [
          'People are used to live in bigger houses.',
          'People used to live in bigger houses, but now most homes are smaller.',
          'People use to lived in bigger houses.',
          'People were used to living in bigger houses now.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"used to + V nguyên mẫu" tả thói quen hoặc tình trạng trong quá khứ.',
          en: '"Used to + base verb" describes a past state or habit.',
        },
      },
      {
        id: 'l3-i-spk-07-ex02',
        type: 'fill-blank',
        sentence: 'Flats in the city centre are ___ more expensive than houses in the suburbs.',
        acceptedAnswers: ['far', 'much', 'a lot'],
        explanation: {
          vi: '"far / much / a lot + so sánh hơn" để nói chênh lệch lớn; không dùng "very more".',
          en: 'Use "far / much / a lot" before a comparative for a big difference, not "very".',
        },
      },
      {
        id: 'l3-i-spk-07-ex03',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ chủ đề nhà ở – đô thị với nghĩa của nó.',
          en: 'Match the housing and city words with their meanings.',
        },
        pairs: [
          { left: 'extended family', right: 'grandparents, parents and children living together' },
          { left: 'suburbs', right: 'areas on the edge of a city' },
          { left: 'high-rise', right: 'a very tall apartment building' },
          { left: 'commute', right: 'travel to work every day' },
          { left: 'pace of life', right: 'how fast or slowly people live' },
        ],
        explanation: {
          vi: 'Từ chủ đề chính xác giúp so sánh rõ hơn "big city / small place".',
          en: 'Precise topic words make comparisons clearer than "big city / small place".',
        },
      },
      {
        id: 'l3-i-spk-07-ex04',
        type: 'multiple-choice',
        question: 'Which sentence avoids over-generalising?',
        options: [
          'All young people hate living in the countryside.',
          'Young people never want to live with their parents.',
          'Young people tend to prefer cities, mainly because of job opportunities.',
          'Everyone in the city is stressed.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"tend to" + lý do làm câu trả lời hợp lý, tránh khẳng định tuyệt đối.',
          en: '"Tend to" plus a reason sounds reasonable and avoids absolute claims.',
        },
      },
      {
        id: 'l3-i-spk-07-ex05',
        type: 'arrange-words',
        translationVi: 'Điểm khác biệt chính là nhịp sống ở thành phố nhanh hơn nhiều.',
        correctSentence: 'The main difference is that the pace of life in the city is much faster.',
        extraWords: ['more'],
        explanation: {
          vi: 'Mở câu so sánh bằng "The main difference is that…" giúp câu trả lời có trọng tâm.',
          en: '"The main difference is that…" gives your comparison a clear focus.',
        },
      },
      {
        id: 'l3-i-spk-07-ex06',
        type: 'speak-sentence',
        sentence: 'These days, flats in the city are far smaller than they used to be.',
        translationVi: 'Ngày nay, căn hộ ở thành phố nhỏ hơn nhiều so với trước đây.',
        explanation: {
          vi: '/ð/ ở "these, the, than, they"; "smaller" đuôi /ə/ nhẹ; "used to" đọc /ˈjuːstə/.',
          en: '/ð/ in "these, the, than, they"; weak /ə/ in "smaller"; "used to" is /ˈjuːstə/.',
        },
      },
      {
        id: 'l3-i-spk-07-ex07',
        type: 'speak-answer',
        question: 'How are homes today different from homes in the past?',
        tipsVi:
          'Nêu 1 khác biệt chính (used to… / now…), giải thích vì sao, thêm ví dụ, rồi 1 điểm giống hoặc ngoại lệ. Khoảng 40 giây.',
        sampleAnswer:
          "The main difference is size. People used to live in large houses with three generations together, whereas these days many young couples live in small flats in the city. That's mainly because land has become far more expensive. Having said that, in the countryside you can still see big family homes.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời so sánh tốt: khác biệt chính + lý do + ví dụ + ngoại lệ.',
          en: 'A good comparison gives the main difference, a reason, an example and an exception.',
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        "How are homes today different from homes in your grandparents' time?",
        'Why do so many young people move from the countryside to big cities?',
        'Is it better for children to grow up in a city or in the countryside?',
      ],
      bandSamples: [
        {
          band: '4.0',
          text: `Q: How are homes today different from homes in your grandparents' time?
A: Before, house is big. Have garden. Now... uh... house is small. Apartment. Many apartment.
Q: Why do so many young people move from the countryside to big cities?
A: Because city have job. Countryside no job. Uh... and city is... modern.
Q: Is it better for children to grow up in a city or in the countryside?
A: Uh... countryside. Because... uh... fresh air. City is pollution. Many motorbike.`,
          notesVi:
            "FC: Mỗi câu trả lời chỉ vài cụm từ, không có so sánh được mở rộng.\nLR: Chỉ dùng từ quen thuộc (big, small, job, modern); nhầm từ loại ('City is pollution').\nGRA: Không có cấu trúc so sánh hay 'used to'; thiếu động từ và chủ ngữ ('Have garden', 'Countryside no job').\nP: Mất âm cuối và -s ('apartment(s)', 'motorbike(s)'), /ð/ không xuất hiện; nhịp đều từng từ.",
        },
        {
          band: '5.5',
          text: `Q: How are homes today different from homes in your grandparents' time?
A: I think in the past, homes are bigger and they have a garden, and many generations live together, like grandparents, parents and children. But now, people live in apartment, it is more small, and only parents and children live together. Because the land in the city is very expensive.
Q: Why do so many young people move from the countryside to big cities?
A: The main reason is job. In the city there are many companies and the salary is more high than in the countryside. Also, young people want to study at university, and most good universities are in big cities. So they move to the city and they don't come back.
Q: Is it better for children to grow up in a city or in the countryside?
A: It's a difficult question. I think the countryside is better for health, because the air is fresh and children can play outside. But in the city, the education is better, they have more chance to learn English and other skills. So, uh, both have advantages.`,
          notesVi:
            "FC: Trả lời có độ dài phù hợp và có lý do, nhưng nối ý chủ yếu bằng 'and', 'so', 'because' và kết thúc chung chung ('both have advantages').\nLR: Có từ chủ đề (generations, salary, education) nhưng chưa có cụm so sánh tự nhiên; 'more chance' chưa chính xác.\nGRA: Sai cấu trúc so sánh ('more small', 'more high'), dùng hiện tại cho quá khứ ('in the past, homes are bigger'), câu 'Because…' đứng riêng.\nP: Dễ hiểu; nhưng /ð/ trong 'than, they' thường thành /d/, đuôi -s ở 'apartments', 'companies' hay mất.",
        },
        {
          band: '6.5',
          text: `Q: How are homes today different from homes in your grandparents' time?
A: Well, the biggest change is probably size and who lives there. In my grandparents' time, families used to live in fairly large houses with a yard, often with three generations under one roof. These days, especially in big cities, most young couples live in small flats, and it's much more common for them to live separately from their parents. I think that's partly because land prices have, um, risen dramatically, and partly because young people value their privacy more.
Q: Why do so many young people move from the countryside to big cities?
A: Mainly for work and education. Cities offer far more job opportunities and better salaries, whereas in rural areas the options are often limited to farming or small businesses. On top of that, most of the top universities are in the big cities, so once young people move there to study, they tend to stay. That said, I've noticed some of my friends moving back home recently, because remote work makes it possible.
Q: Is it better for children to grow up in a city or in the countryside?
A: I don't think there's one right answer. Children in the countryside generally have more space to play and a closer connection to nature, which is great for their health. Children in the city, on the other hand, have access to better schools and more extra-curricular activities. If I had to choose, I'd probably say a small city is the best of both worlds, because it's not as crowded as a big one but still have good facilities.`,
          notesVi:
            "FC: Câu trả lời mở rộng tự nhiên, so sánh rõ ràng và có điểm nhượng bộ (That said…); ít ngập ngừng, chỉ có 'um' ngắn khi tìm từ.\nLR: Từ vựng linh hoạt (under one roof, value their privacy, rural areas, the best of both worlds), dùng đúng ngữ cảnh.\nGRA: Dùng đúng 'used to', so sánh hơn với 'far / much', câu điều kiện loại 2 ('If I had to choose, I'd…'); lỗi nhỏ 'still have good facilities'.\nP: Dễ hiểu, /ð/ và đuôi -er phần lớn đúng; đôi chỗ nhấn câu chưa tự nhiên nhưng không cản trở việc hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi câu trả lời có nêu 1 khác biệt chính rồi giải thích không?',
            'Có thêm điểm giống / ngoại lệ (That said, Having said that) không?',
            'Có trả lời 30–60 giây mà không ngắt quãng dài không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 từ chủ đề (suburbs, high-rise, pace of life…) không?',
            'Có dùng "tend to / generally" để tránh khái quát tuyệt đối không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'So sánh hơn có đúng (smaller, more expensive — không phải "more small") không?',
            'Có dùng "used to + V" khi nói về quá khứ không?',
            'Có ít nhất 1 câu với "whereas / while" đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            '/ð/ trong "than, these, they" có đặt lưỡi giữa răng không?',
            'Đuôi -er có được đọc nhẹ /ə/ không?',
            'Đuôi -s số nhiều có nghe rõ không?',
          ],
        },
      ],
      usefulPhrases: [
        'The biggest change is probably…',
        'People used to…, whereas these days…',
        "It's much more common for… to…",
        'Mainly for… and…',
        'They tend to…',
        "If I had to choose, I'd probably say…",
      ],
      targetSounds: [
        '/ð/ (than, these, those, other)',
        'weak -er /ə/ (bigger, cheaper, smaller)',
        "'used to' /ˈjuːstə/",
        'plural -s (flats, generations, opportunities)',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 8 — PART 3: DỰ ĐOÁN TƯƠNG LAI · Công nghệ và việc làm
  // ==========================================================================
  {
    id: 'l3-i-spk-08',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 3 – Dự đoán tương lai (Công nghệ và việc làm)',
      en: 'Part 3 – Speculating about the future (Technology and work)',
    },
    description: {
      vi: 'Dùng will / might / could, "I\'d imagine" và các mức độ chắc chắn để bàn về tương lai một cách thận trọng.',
      en: 'Use will / might / could, "I\'d imagine" and degrees of certainty to discuss the future carefully.',
    },
    teachingCards: [
      {
        title: { vi: 'Thang độ chắc chắn', en: 'A scale of certainty' },
        body: {
          vi: 'Rất chắc: **will definitely, I am convinced that…**\nKhá chắc: **will probably, It is likely that…, I would imagine…**\nCó thể: **might, could, There is a chance that…**\nÍt khả năng: **probably will not, It is unlikely that…**\nPart 3 ưu tiên câu **thận trọng**: dự đoán + lý do, không khẳng định tuyệt đối.',
          en: 'Very sure: **will definitely, I am convinced that…**\nFairly sure: **will probably, It is likely that…, I would imagine…**\nPossible: **might, could, There is a chance that…**\nUnlikely: **probably will not, It is unlikely that…**\nPart 3 rewards **careful** answers: a prediction plus a reason, not absolute claims.',
        },
        examples: [
          { en: "I'd imagine that most offices will use AI assistants within ten years.", vi: 'Dự đoán khá chắc, có mốc thời gian.' },
          { en: "It's unlikely that robots will replace nurses, because patients need human care.", vi: 'Dự đoán ít khả năng + lý do.' },
        ],
      },
      {
        title: { vi: 'Câu điều kiện để suy đoán', en: 'Conditionals for speculating' },
        body: {
          vi: '**Loại 1** (có thể xảy ra): *If companies **use** more robots, some factory jobs **will** disappear.*\n**Loại 2** (giả định): *If robots **taught** children, lessons **would** feel less personal.*\nThêm điều kiện cho dự đoán: **as long as, unless, provided that**.',
          en: '**First conditional** (likely): *If companies **use** more robots, some factory jobs **will** disappear.*\n**Second conditional** (imaginary): *If robots **taught** children, lessons **would** feel less personal.*\nAdd conditions to predictions: **as long as, unless, provided that**.',
        },
        examples: [
          {
            en: 'Online learning will keep growing, as long as internet access improves in rural areas.',
            vi: 'Dự đoán kèm điều kiện "as long as".',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-08-ex01',
        type: 'multiple-choice',
        question: 'Which answer sounds most careful and academic?',
        options: [
          'Robots will replace all teachers.',
          "Robots definitely can't do anything in schools.",
          "I'd imagine robots might take over some tasks, like marking tests, but they probably won't replace teachers completely.",
          "Maybe robots, I don't know.",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Câu tốt dùng mức độ chắc chắn (might, probably won't) và tách từng phần việc.",
          en: "It uses degrees of certainty (might, probably won't) and separates the tasks.",
        },
      },
      {
        id: 'l3-i-spk-08-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm dự đoán với mức độ chắc chắn của nó.',
          en: 'Match each phrase with its degree of certainty.',
        },
        pairs: [
          { left: "I'm convinced that…", right: 'very sure' },
          { left: "It's likely that…", right: 'fairly sure' },
          { left: "There's a chance that…", right: 'possible' },
          { left: "It's unlikely that…", right: 'probably not' },
          { left: 'I doubt that…', right: 'I do not really believe it' },
        ],
        explanation: {
          vi: 'Biết mức độ chắc chắn giúp bạn dự đoán chính xác và tự nhiên hơn.',
          en: 'Knowing degrees of certainty makes your predictions accurate and natural.',
        },
      },
      {
        id: 'l3-i-spk-08-ex03',
        type: 'fill-blank',
        sentence: 'If robots ___ children, lessons would feel less personal.',
        acceptedAnswers: ['taught'],
        hint: '(teach)',
        explanation: {
          vi: 'Điều kiện loại 2: If + quá khứ đơn (taught), would + V nguyên mẫu.',
          en: 'Second conditional: If + past simple (taught), would + base verb.',
        },
      },
      {
        id: 'l3-i-spk-08-ex04',
        type: 'fill-blank',
        sentence: "There's a good ___ that more people will work from home in the future.",
        acceptedAnswers: ['chance'],
        explanation: {
          vi: '"There\'s a good chance that…" = khá có khả năng.',
          en: '"There\'s a good chance that…" means it is quite likely.',
        },
      },
      {
        id: 'l3-i-spk-08-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ chủ đề công nghệ – việc làm với nghĩa của nó.',
          en: 'Match the technology and work words with their meanings.',
        },
        pairs: [
          { left: 'automation', right: 'machines doing work instead of people' },
          { left: 'artificial intelligence', right: 'computer systems that can learn and decide' },
          { left: 'retrain', right: 'learn new skills for a different job' },
          { left: 'job market', right: 'all the jobs available and the people looking for them' },
          { left: 'replace', right: 'take the place of' },
        ],
        explanation: {
          vi: 'Từ chủ đề chính xác giúp tránh lặp "robot" và "machine" liên tục.',
          en: 'Precise topic words stop you repeating "robot" and "machine".',
        },
      },
      {
        id: 'l3-i-spk-08-ex06',
        type: 'speak-sentence',
        sentence: "I'd imagine that technology will change the way teachers work.",
        translationVi: 'Tôi đoán công nghệ sẽ thay đổi cách giáo viên làm việc.',
        explanation: {
          vi: '"I\'d" giữ /d/ nhẹ; nhấn tech-NO-lo-gy; bật rõ /tʃ/ trong "change, teachers".',
          en: 'Keep the light /d/ in "I\'d"; stress tech-NO-lo-gy; say /tʃ/ clearly in "change, teachers".',
        },
      },
      {
        id: 'l3-i-spk-08-ex07',
        type: 'speak-answer',
        question: 'Do you think robots will replace teachers in the future?',
        tipsVi:
          "Dùng mức độ chắc chắn (might / probably won't), nêu phần nào máy làm được và phần nào không, thêm 1 câu điều kiện. Khoảng 45 giây.",
        sampleAnswer:
          "I doubt it, at least not completely. I'd imagine robots and AI might take over some tasks, like marking tests or explaining grammar rules. But if robots taught young children all day, I think they would miss the encouragement and care that a real teacher gives. So teachers will probably use technology rather than be replaced by it.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt dùng mức độ chắc chắn, tách từng phần việc và có câu điều kiện.',
          en: 'A strong answer uses certainty language, separates tasks and adds a conditional.',
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        'Do you think robots and artificial intelligence will replace many jobs in the future?',
        'What skills will young people need to find good jobs in twenty years?',
        'Will people work fewer hours in the future? Why or why not?',
      ],
      bandSamples: [
        {
          band: '4.0',
          text: `Q: Do you think robots and artificial intelligence will replace many jobs in the future?
A: Yes. Robot is... uh... very smart. Robot can work, no tired. So many people no job.
Q: What skills will young people need to find good jobs in twenty years?
A: Uh... English. Computer. Uh... English is very important.
Q: Will people work fewer hours in the future? Why or why not?
A: Uh... I think no. People work very much. Because... uh... need money.`,
          notesVi:
            "FC: Trả lời bằng vài cụm ngắn, dừng nhiều, không phát triển được dự đoán.\nLR: Từ vựng chỉ ở mức cơ bản (smart, tired, money), không có từ chủ đề như automation, skills.\nGRA: Không dùng được will / might hay câu điều kiện; câu thiếu động từ ('Robot can work, no tired', 'So many people no job').\nP: Khó nghe ở từ dài ('ar-ti-fi-cial' nhấn đều), mất âm cuối /t/ /k/ ('robot', 'work').",
        },
        {
          band: '5.5',
          text: `Q: Do you think robots and artificial intelligence will replace many jobs in the future?
A: Yes, I think so. Robots and AI is developing very fast. In the future, robots will do many jobs, for example in factories or supermarket. So many workers will lose their job. But some jobs like teachers or doctors, I think robots cannot replace because they need human.
Q: What skills will young people need to find good jobs in twenty years?
A: I think they will need English and computer skills. Because many companies work with foreign companies. Also they need soft skills, like teamwork and communication. If they don't have these skills, it is difficult to find a job.
Q: Will people work fewer hours in the future? Why or why not?
A: Maybe yes. Because robots will help people, so people don't need to work so much. But, uh, in Vietnam people work very hard, so I am not sure. Maybe they will still work eight hours a day.`,
          notesVi:
            "FC: Trả lời đủ ý và có lý do, nhưng hay mở đầu bằng 'Because', 'Maybe' và chưa cân nhắc nhiều phía.\nLR: Có từ chủ đề (soft skills, teamwork, communication) nhưng lặp 'robots', 'jobs'; 'they need human' chưa chính xác.\nGRA: Dùng được will và điều kiện loại 1 đơn giản, nhưng lỗi hoà hợp ('Robots and AI is') và câu cụt bắt đầu bằng 'Because'.\nP: Hiểu được; trọng âm 'artificial', 'technology' chưa đúng, đuôi -s trong 'jobs', 'skills' lúc có lúc không.",
        },
        {
          band: '6.5',
          text: `Q: Do you think robots and artificial intelligence will replace many jobs in the future?
A: I think they'll definitely replace some jobs, especially ones that involves a lot of repetition, like data entry or working on an assembly line. But I'd imagine it's more likely that AI will change jobs rather than wipe them out completely. For instance, accountants might spend less time on, um, calculations and more time advising clients. So people will probably need to retrain rather than lose their careers altogether.
Q: What skills will young people need to find good jobs in twenty years?
A: Well, it's hard to predict exactly, but I'm fairly convinced that the ability to keep learning will matter most, because technology changes so fast that whatever you learn at university might be out of date in five years. Apart from that, I'd say skills that machines aren't good at, like creativity, communication and dealing with people's emotions, will become more valuable.
Q: Will people work fewer hours in the future? Why or why not?
A: There's a chance they will, at least in some industries. If machines take over routine tasks, companies could produce the same amount in less time, and a few countries are already experimenting with a four-day week. Having said that, I doubt it'll happen everywhere, because in many developing economies people still need to work long hours just to earn a decent living.`,
          notesVi:
            "FC: Mỗi câu trả lời có dự đoán, lý do, ví dụ và điểm nhượng bộ (Having said that…); nói mạch lạc, ít ngập ngừng.\nLR: Từ chủ đề tốt (assembly line, retrain, out of date, a decent living); 'fairly convinced' là kết hợp từ chưa chuẩn (convinced đã là chắc chắn).\nGRA: Dùng linh hoạt will / might / could và câu điều kiện; lỗi nhỏ 'ones that involves' không gây khó hiểu.\nP: Dễ hiểu; trọng âm từ dài (ar-ti-FI-cial, tech-NO-lo-gy) phần lớn đúng, đôi chỗ ngữ điệu còn phẳng khi liệt kê.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi dự đoán có kèm lý do không?',
            'Có ít nhất 1 lần nhượng bộ (Having said that, That said) không?',
            'Mỗi câu trả lời có kéo dài 30–60 giây không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 cụm chỉ mức độ chắc chắn khác nhau không?',
            'Có dùng từ chủ đề (automation, retrain, job market…) thay vì lặp "robot" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có dùng đúng will / might / could + V nguyên mẫu không?',
            'Có ít nhất 1 câu điều kiện (If…, … will / would…) đúng không?',
            'Chủ ngữ số nhiều (robots and AI) có đi với động từ số nhiều (are) không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Dạng rút gọn they'll, it'll, won't có nghe rõ không?",
            'Từ dài (technology, artificial) có nhấn đúng âm không?',
            'Âm /tʃ/ trong "change, future" có rõ không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'd imagine it's more likely that…",
        "There's a good chance that…",
        "I doubt it'll happen everywhere, because…",
        '… rather than + verb',
        'If…, … could…',
        "It's hard to predict exactly, but…",
      ],
      targetSounds: [
        "contractions: they'll, it'll, I'd, won't",
        'word stress: tech-NO-lo-gy, ar-ti-FI-cial, au-to-MA-tion',
        '/tʃ/ in change, teachers, future',
        "final /t/ in might, robot, won't",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 9 — PART 3: XỬ LÝ CÂU HỎI KHÓ, TRẢ LỜI CÂN BẰNG · Sức khoẻ
  // ==========================================================================
  {
    id: 'l3-i-spk-09',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 20,
    title: {
      vi: 'Part 3 – Xử lý câu hỏi khó và trả lời cân bằng (Sức khoẻ)',
      en: 'Part 3 – Handling tricky questions and giving balanced answers (Health)',
    },
    description: {
      vi: 'Mua thời gian lịch sự, hỏi lại khi chưa hiểu, và trả lời "It depends" có lập luận.',
      en: 'Buy time politely, ask for clarification when needed, and give reasoned "it depends" answers.',
    },
    teachingCards: [
      {
        title: { vi: 'Khi câu hỏi khó', en: 'When the question is difficult' },
        body: {
          vi: '**Mua thời gian** (1 câu, không lặp mãi): *That is a tricky one… / I have never really thought about that, but…*\n**Hỏi lại** khi chưa hiểu (không bị trừ điểm): *Sorry, do you mean…? / Could you explain what you mean by…?*\nKhông có số liệu? **Lập luận** thay vì im lặng: *I am not an expert, but I would guess…*',
          en: '**Buy time** (one phrase, not again and again): *That is a tricky one… / I have never really thought about that, but…*\n**Ask for clarification** if needed (no penalty): *Sorry, do you mean…? / Could you explain what you mean by…?*\nNo facts? **Reason** instead of going silent: *I am not an expert, but I would guess…*',
        },
        examples: [{ en: "I'm not an expert, but I'd guess it's mainly about cost.", vi: 'Không có số liệu vẫn trả lời được bằng suy luận.' }],
      },
      {
        title: { vi: 'Trả lời "It depends" có cấu trúc', en: 'A structured "it depends" answer' },
        body: {
          vi: '"It depends" **một mình** là câu trả lời yếu. Hãy nói **phụ thuộc vào gì** và **phân tích 2 trường hợp**:\n*It depends on **age**. For **older people**, … whereas for **teenagers**, …*\nKết bằng ý chung: *On the whole, I would say…*',
          en: '"It depends" **on its own** is a weak answer. Say **what it depends on** and **analyse two cases**:\n*It depends on **age**. For **older people**, … whereas for **teenagers**, …*\nFinish with an overall view: *On the whole, I would say…*',
        },
        examples: [
          {
            en: 'It depends on where people live. In cities, gyms are everywhere, whereas in rural areas people walk and farm.',
            vi: 'Nêu rõ "phụ thuộc vào nơi sống" rồi phân tích 2 trường hợp.',
          },
        ],
      },
      {
        title: { vi: 'Ngữ điệu khi cân nhắc', en: 'Intonation when weighing ideas' },
        body: {
          vi: 'Khi nói "It depends…", "On the one hand…", giọng **đi lên** ở cuối vế đầu (ý chưa xong), rồi **đi xuống** ở vế kết luận.\nNgười Việt hay để giọng **phẳng** hoặc **lên xuống theo thanh điệu tiếng Việt**, khiến người nghe khó biết ý nào là ý chính.',
          en: 'With "It depends…" or "On the one hand…", your voice **rises** at the end of the first part (not finished yet), then **falls** on the conclusion.\nVietnamese learners often keep a **flat** pitch or follow **Vietnamese tones**, so listeners cannot tell which idea is the main one.',
        },
        examples: [
          {
            en: 'For older people, it might be hard, whereas for teenagers, it is much easier.',
            vi: 'Giọng lên ở "hard", xuống ở "easier".',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-09-ex01',
        type: 'multiple-choice',
        question: 'You did not understand the word "sedentary" in the question. What should you do?',
        options: [
          'Stay silent and wait.',
          'Say "Sorry, could you explain what you mean by sedentary?"',
          'Answer a different question you prepared.',
          'Say "I don\'t know" and stop.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Hỏi lại nghĩa một từ trong Part 3 là bình thường và không bị trừ điểm.',
          en: 'Asking about a word in Part 3 is normal and does not lose marks.',
        },
      },
      {
        id: 'l3-i-spk-09-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm từ với tình huống nên dùng.',
          en: 'Match each phrase with when to use it.',
        },
        pairs: [
          { left: "That's a tricky one…", right: 'buying time' },
          { left: 'Do you mean…?', right: 'checking the question' },
          { left: "I'm not an expert, but…", right: 'reasoning without facts' },
          { left: 'It depends on…', right: 'showing two different cases' },
          { left: 'On the whole, …', right: 'giving an overall conclusion' },
        ],
        explanation: {
          vi: 'Mỗi cụm giúp bạn tiếp tục nói thay vì im lặng khi gặp câu khó.',
          en: 'Each phrase keeps you talking instead of going silent on a hard question.',
        },
      },
      {
        id: 'l3-i-spk-09-ex03',
        type: 'multiple-choice',
        question: 'Which "it depends" answer is the strongest?',
        options: [
          'It depends.',
          'It depends on many things.',
          "It depends on people's jobs. Office workers who sit all day need to exercise more, whereas people with active jobs may already be fit enough.",
          'It depends, maybe yes, maybe no.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu mạnh nêu rõ phụ thuộc vào gì và phân tích 2 trường hợp.',
          en: 'A strong answer names the factor and analyses two cases.',
        },
      },
      {
        id: 'l3-i-spk-09-ex04',
        type: 'fill-blank',
        sentence: 'On the ___, I would say people today are less active than in the past.',
        acceptedAnswers: ['whole'],
        explanation: {
          vi: '"On the whole" = nhìn chung; dùng để chốt ý sau khi cân nhắc.',
          en: '"On the whole" means "overall" and concludes after weighing ideas.',
        },
      },
      {
        id: 'l3-i-spk-09-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ chủ đề sức khoẻ với nghĩa của nó.',
          en: 'Match the health words with their meanings.',
        },
        pairs: [
          { left: 'sedentary lifestyle', right: 'a life with little physical activity' },
          { left: 'processed food', right: 'food changed in factories, often with added salt' },
          { left: 'work-life balance', right: 'enough time for both your job and personal life' },
          { left: 'mental health', right: 'the health of your mind and feelings' },
          { left: 'regular check-ups', right: 'routine visits to a doctor' },
        ],
        explanation: {
          vi: 'Các cụm này giúp bàn về sức khoẻ cụ thể hơn "healthy / unhealthy".',
          en: 'These phrases discuss health more precisely than "healthy / unhealthy".',
        },
      },
      {
        id: 'l3-i-spk-09-ex06',
        type: 'speak-sentence',
        sentence: 'It depends on the person, but on the whole, people eat more processed food.',
        translationVi: 'Còn tuỳ từng người, nhưng nhìn chung mọi người ăn nhiều thực phẩm chế biến sẵn hơn.',
        explanation: {
          vi: 'Giọng lên nhẹ ở "person", xuống ở "food"; "processed" kết thúc bằng /st/.',
          en: 'Rise slightly on "person" and fall on "food"; "processed" ends in /st/.',
        },
      },
      {
        id: 'l3-i-spk-09-ex07',
        type: 'speak-answer',
        question: 'Should the government put a tax on unhealthy food and sugary drinks?',
        tipsVi:
          'Mua thời gian bằng 1 câu, phân tích 2 phía (On the one hand… On the other hand…), chốt bằng "On the whole…". Khoảng 45 giây.',
        sampleAnswer:
          "That's a tricky one. On the one hand, a tax could make people think twice before buying sugary drinks, and the money could be spent on public health campaigns. On the other hand, it might be unfair to poorer families, who often rely on cheap food. On the whole, I'd support a small tax, as long as healthy food becomes cheaper at the same time.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời cân bằng có cả hai phía và một kết luận rõ ràng.',
          en: 'A balanced answer covers both sides and reaches a clear conclusion.',
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        'Why do many people find it difficult to keep a healthy lifestyle?',
        'Should the government put a tax on unhealthy food and sugary drinks?',
        'Are people today healthier than people were fifty years ago?',
      ],
      bandSamples: [
        {
          band: '4.0',
          text: `Q: Why do many people find it difficult to keep a healthy lifestyle?
A: Because... busy. People very busy. No time for exercise. And fast food is... uh... delicious.
Q: Should the government put a tax on unhealthy food and sugary drinks?
A: Tax? Uh... I don't know. Maybe... yes. Maybe no. I don't know.
Q: Are people today healthier than people were fifty years ago?
A: Uh... today... more healthy. Because hospital is good. Doctor is good.`,
          notesVi:
            "FC: Câu trả lời rất ngắn, 'I don't know' lặp lại, không biết cách mua thời gian hay lập luận khi gặp câu khó.\nLR: Từ cơ bản (busy, delicious, good), không có từ chủ đề sức khoẻ.\nGRA: Câu thiếu động từ ('People very busy'), so sánh sai ('more healthy').\nP: Ngữ điệu phẳng, mất âm cuối ('lifestyle', 'exercise' không rõ), khó nhận ra ý chính.",
        },
        {
          band: '5.5',
          text: `Q: Why do many people find it difficult to keep a healthy lifestyle?
A: I think because people are very busy with work. They work from morning to evening, so they don't have time to exercise or cook healthy food. They usually eat fast food or instant noodle because it is quick and cheap. Also, they are tired, so they prefer watching TV than going to the gym.
Q: Should the government put a tax on unhealthy food and sugary drinks?
A: Hmm, it's a difficult question. I think yes, because if the price is higher, people will buy less. But, uh, some people are poor and they like soft drinks, so it is not fair for them. So I think, uh, it depends.
Q: Are people today healthier than people were fifty years ago?
A: I think yes and no. Yes because now we have better hospitals and medicine, so people live longer. But no because people eat more junk food and they don't exercise, so many people are fat and have disease like diabetes.`,
          notesVi:
            "FC: Trả lời được câu khó ('it's a difficult question'), nhưng kết thúc bằng 'it depends' không phân tích, và nối ý lặp 'so', 'because'.\nLR: Có vài từ chủ đề (junk food, diabetes, soft drinks) nhưng dùng từ thiếu tế nhị ('fat') và chưa chính xác ('prefer watching TV than').\nGRA: Có câu điều kiện loại 1 đúng; lỗi 'have disease', 'instant noodle' và câu 'I think because…' chưa hoàn chỉnh.\nP: Dễ hiểu, nhưng ngữ điệu khá phẳng khi cân nhắc 2 phía và âm cuối /s/ trong 'drinks', 'hospitals' hay mất.",
        },
        {
          band: '6.5',
          text: `Q: Why do many people find it difficult to keep a healthy lifestyle?
A: I think the main problem is time, or at least people feel they don't have time. Many office workers commute for an hour each way and sit at a desk all day, so by the evening they're exhausted and it's just easier to order a takeaway than to cook. On top of that, processed food is everywhere and it's often cheaper than fresh ingredients, so the healthy choice isn't always the convenient one.
Q: Should the government put a tax on unhealthy food and sugary drinks?
A: That's a tricky one. On the one hand, a tax would probably make people think twice before buying a sugary drink, and the money could fund health campaigns or sports facilities. On the other hand, it might hit poorer families harder, because they spend a bigger, a bigger share of their income on food. On the whole, I'd support it, but only if the government also makes fruit and vegetables more affordable.
Q: Are people today healthier than people were fifty years ago?
A: It depends on what you mean by healthy. In terms of life expectancy, definitely, people live much longer now thanks to better medical care and vaccines. But when it comes to lifestyle, I'm not so sure. People fifty years ago were generally more active, they walked or cycled everywhere, whereas these days a lot of people has a sedentary lifestyle, and problems like obesity and stress are much more common.`,
          notesVi:
            "FC: Xử lý câu khó tự nhiên ('That's a tricky one', 'It depends on what you mean by…'); mỗi câu trả lời cân nhắc 2 phía và có kết luận, chỉ một lần lặp từ ('a bigger, a bigger share').\nLR: Từ vựng chính xác và đa dạng (commute, processed food, think twice, life expectancy, sedentary lifestyle).\nGRA: Câu phức linh hoạt (would / might / could, only if…, whereas…); lỗi nhỏ 'a lot of people has'.\nP: Rõ ràng; ngữ điệu lên ở vế đầu và xuống ở kết luận khá tốt, đôi chỗ trọng âm 'af-FORD-a-ble' còn lệch.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Khi gặp câu khó, bạn có dùng 1 câu mua thời gian rồi trả lời ngay không?',
            'Câu "It depends" có nói rõ phụ thuộc vào gì và phân tích 2 trường hợp không?',
            'Mỗi câu trả lời có kết luận (On the whole…) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 từ chủ đề sức khoẻ (sedentary, processed food…) không?',
            'Có dùng từ trung tính, lịch sự (overweight thay cho fat) không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có dùng would / might / could khi nói về chính sách giả định không?',
            'Chủ ngữ "a lot of people" có đi với động từ số nhiều (have) không?',
            'Có ít nhất 1 câu với "whereas" hoặc "only if" đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Giọng có lên ở vế đầu và xuống ở vế kết luận không?',
            'Cụm phụ âm cuối (processed, drinks) có đủ âm không?',
            'Từ yếu (to, for, than) có được đọc nhẹ không?',
          ],
        },
      ],
      usefulPhrases: [
        "That's a tricky one.",
        "I've never really thought about that, but…",
        'Sorry, do you mean…?',
        'It depends on what you mean by…',
        'In terms of…, … But when it comes to…, …',
        "On the whole, I'd say…",
      ],
      targetSounds: [
        'rising tone on the first part, falling tone on the conclusion',
        'final clusters: /st/ processed, /ŋks/ drinks, /lz/ vegetables',
        'word stress: af-FORD-a-ble, ex-PEC-tan-cy, MED-i-cal',
        'weak forms: to /tə/, for /fə/, than /ðən/',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 10 — THI NÓI THỬ TRỌN BỘ: Part 1 → Part 2 → Part 3
  // Part 1: chụp ảnh · Part 2: một hành trình lâu hơn dự tính · Part 3: du lịch, đi lại.
  // part = 2 vì có cueCard; mỗi câu hỏi có nhãn "Part N:" theo đúng thứ tự thi thật.
  // ==========================================================================
  {
    id: 'l3-i-spk-10',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 25,
    title: {
      vi: 'Thi nói thử trọn bộ: Part 1 → Part 2 → Part 3',
      en: 'Full mock speaking test: Part 1 → Part 2 → Part 3',
    },
    description: {
      vi: 'Làm một bài thi nói hoàn chỉnh khoảng 12–14 phút theo đúng trình tự thi thật, rồi tự chấm theo 4 tiêu chí.',
      en: 'Take a complete 12–14 minute speaking test in the real exam order, then assess yourself on four criteria.',
    },
    teachingCards: [
      {
        title: { vi: 'Trình tự bài thi thật', en: 'The real test sequence' },
        body: {
          vi: '**Part 1** (4–5 phút): 2–3 chủ đề quen thuộc, mỗi câu trả lời 2–4 câu.\n**Part 2** (3–4 phút): 1 phút chuẩn bị, nói tối đa 2 phút, có thể có 1–2 câu hỏi ngắn sau đó.\n**Part 3** (4–5 phút): câu hỏi trừu tượng nối từ chủ đề Part 2.\nGhi âm cả bài và **nghe lại** trước khi tự chấm.',
          en: '**Part 1** (4–5 min): 2–3 familiar topics, 2–4 sentence answers.\n**Part 2** (3–4 min): 1 minute to prepare, up to 2 minutes to talk, maybe 1–2 short follow-up questions.\n**Part 3** (4–5 min): abstract questions linked to the Part 2 topic.\nRecord the whole test and **listen back** before assessing yourself.',
        },
        examples: [
          {
            en: "Now, in Part 3, let's talk about travel and transport in general.",
            vi: 'Câu giám khảo chuyển sang Part 3 — chủ đề nối từ Part 2.',
          },
        ],
      },
      {
        title: { vi: 'Chuyển "chế độ" giữa các Part', en: 'Switching modes between parts' },
        body: {
          vi: 'Mỗi Part cần một **"chế độ"** khác:\n• Part 1: **ngắn, cá nhân**, A-R-E.\n• Part 2: **kể chuyện**, thì quá khứ, dàn ý 3 phần.\n• Part 3: **lập luận chung**, O-R-E-C, so sánh, dự đoán.\nLỗi hay gặp: kể chuyện cá nhân dài ở Part 3, hoặc trả lời Part 1 như viết luận.',
          en: 'Each part needs a different **mode**:\n• Part 1: **short and personal**, A-R-E.\n• Part 2: **storytelling**, past tenses, a three-part structure.\n• Part 3: **general reasoning**, O-R-E-C, comparing, predicting.\nCommon mistakes: long personal stories in Part 3, or essay-like answers in Part 1.',
        },
        examples: [
          {
            en: 'Part 3: Why do people get stressed when they travel? Talk about people in general, not only your own trip.',
            vi: 'Part 3 cần nói về con người nói chung.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-spk-10-ex01',
        type: 'multiple-choice',
        question: 'Which answer suits PART 1 best? "Do you like taking photos?"',
        options: [
          'Yes.',
          'Yeah, quite a lot, actually. I mostly take photos of food and street scenes, because I like remembering small everyday moments.',
          'Photography has become a significant part of modern society, and there are several reasons for this trend. Firstly…',
          'I would like to talk about a photo I took last year…',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Part 1 cần ngắn, cá nhân, có lý do; C giống Part 3, D giống Part 2.',
          en: 'Part 1 needs short, personal answers with a reason; C sounds like Part 3, D like Part 2.',
        },
      },
      {
        id: 'l3-i-spk-10-ex02',
        type: 'multiple-choice',
        question: 'Which answer suits PART 3 best? "Why do people get stressed when they travel?"',
        options: [
          'I got stressed last year when my bus was late.',
          "I think it's mainly because travel involves things people can't control, like delays and crowds. For example, a cancelled flight can ruin a whole schedule. That said, experienced travellers usually stay calmer.",
          'Yes, stressed.',
          'Travel is fun.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Part 3 cần lập luận chung (O-R-E-C), không chỉ kể chuyện cá nhân.',
          en: 'Part 3 needs general reasoning (O-R-E-C), not just a personal story.',
        },
      },
      {
        id: 'l3-i-spk-10-ex03',
        type: 'fill-blank',
        sentence: 'It took ___ longer than we expected, almost five hours instead of two.',
        acceptedAnswers: ['much', 'far', 'a lot', 'way'],
        explanation: {
          vi: '"much / far / a lot + longer than" nhấn mạnh chênh lệch lớn.',
          en: '"Much / far / a lot" before "longer than" stresses a big difference.',
        },
      },
      {
        id: 'l3-i-spk-10-ex04',
        type: 'speak-sentence',
        sentence: 'The journey took much longer than we expected because of the traffic.',
        translationVi: 'Chuyến đi mất nhiều thời gian hơn chúng tôi dự tính vì kẹt xe.',
        explanation: {
          vi: '"expected" có đuôi /ɪd/; "than" có /ð/ nhẹ; nhấn TRAF-fic.',
          en: '"Expected" ends in /ɪd/; a light /ð/ in "than"; stress TRAF-fic.',
        },
      },
      {
        id: 'l3-i-spk-10-ex05',
        type: 'speak-sentence',
        sentence: "I'd probably say that people will travel less but stay longer.",
        translationVi: 'Có lẽ tôi sẽ nói rằng mọi người sẽ đi ít chuyến hơn nhưng ở lâu hơn.',
        explanation: {
          vi: '"I\'d" giữ /d/; nhấn TRAV-el; nhấn mạnh "less" và "longer" để thấy ý đối lập.',
          en: 'Keep the /d/ in "I\'d"; stress TRAV-el; stress "less" and "longer" to show contrast.',
        },
      },
    ],
    speakingTask: {
      part: 2,
      questions: [
        'Part 1: Do you like taking photos? Why or why not?',
        'Part 1: What do you usually take photos of?',
        'Part 1: Do you prefer taking photos or being in them?',
        'Part 2: Describe a journey that took longer than you expected. You have one minute to prepare and up to two minutes to talk.',
        'Part 3: Why do people often get stressed when they travel?',
        'Part 3: How might the way people travel change in the next twenty years?',
        'Part 3: Is it better to travel alone or with other people?',
      ],
      cueCard: {
        topic: 'Describe a journey that took longer than you expected.',
        points: [
          'where you were going and why',
          'how you travelled',
          'what caused the delay',
          'and explain how you felt during the journey',
        ],
      },
      bandSamples: [
        {
          band: '4.0',
          text: `PART 1
Q: Do you like taking photos? Why or why not?
A: Yes. I like. Photo is... uh... beautiful.
Q: What do you usually take photos of?
A: Food. And my friend.
Q: Do you prefer taking photos or being in them?
A: Uh... taking. I am not... uh... beautiful. Haha.

PART 2
I talk about... uh... I go to Hai Phong. Last year. By bus. To visit my uncle. Usually two hours but... uh... five hours. Because traffic jam. Very very traffic jam. And the bus... uh... broken. I am very tired and hungry. Uh... I angry. Then I arrive. Uh... that's all.

PART 3
Q: Why do people often get stressed when they travel?
A: Because... traffic jam. And tired.
Q: How might the way people travel change in the next twenty years?
A: Uh... I don't know. Maybe more car. More plane.
Q: Is it better to travel alone or with other people?
A: With other people. Because fun. Alone is boring.`,
          notesVi:
            "FC: Cả 3 phần đều rất ngắn; Part 2 chỉ khoảng 40 giây rồi dừng, nhiều quãng ngừng và 'I don't know'.\nLR: Từ cơ bản, lặp ('traffic jam', 'very very'), không đủ từ cho Part 3.\nGRA: Hầu hết là cụm từ; dùng hiện tại cho chuyện quá khứ ('I go… last year', 'I arrive'), thiếu động từ ('I angry').\nP: Mất âm cuối và -s thường xuyên, ngữ điệu phẳng nên người nghe phải cố gắng.",
        },
        {
          band: '5.5',
          text: `PART 1
Q: Do you like taking photos? Why or why not?
A: Yes, I like taking photos very much, because I want to remember the special moments in my life, like trips or birthdays.
Q: What do you usually take photos of?
A: I usually take photos of food and landscapes when I travel. Sometimes I post them on social media.
Q: Do you prefer taking photos or being in them?
A: I prefer taking photos, because I don't feel confident when I'm in the photo. My friends always ask me to take photos for them.

PART 2
I want to talk about a trip from Hanoi to Ha Long last year. I go with my family to celebrate my mother's birthday. We went by car, my father drove. Normally it takes about three hours. But that day, it took nearly six hours. Because there was an accident on the highway, so all the cars must stop and wait for a long time. And then it rain very heavily, so we drive very slowly. Uh, my little brother was crying because he was hungry and bored. I felt very tired and stressed, and I worried we will be late for the hotel. But finally we arrived at eight pm and we had dinner. Next day the weather was nice, so it was OK. I think it is a memorable trip, because, uh, it was very long.

PART 3
Q: Why do people often get stressed when they travel?
A: I think because many things can go wrong, for example traffic jam or the flight is delay. Also, travel is expensive, so people worry about money.
Q: How might the way people travel change in the next twenty years?
A: Maybe people will use more electric cars and high-speed trains, because they are better for environment. And maybe the travel will be faster.
Q: Is it better to travel alone or with other people?
A: It depends. Travel with friends is more fun and safer. But travel alone, you can be free and do what you want. I prefer travel with friends.`,
          notesVi:
            "FC: Nói được ở cả 3 phần, Part 2 khoảng 1 phút 30 giây; nhưng Part 3 còn ngắn và nối ý lặp 'because', 'so', 'and then'.\nLR: Đủ từ cho chủ đề quen thuộc (landscapes, accident, highway, high-speed trains) nhưng Part 3 thiếu cách diễn đạt trừu tượng.\nGRA: Lẫn thì khi kể chuyện ('I go… last year', 'it rain', 'we drive'); lỗi 'the flight is delay', 'travel alone, you can be free'.\nP: Dễ hiểu nhìn chung; đuôi -ed lúc có lúc không, làm người nghe khó biết đang kể chuyện quá khứ.",
        },
        {
          band: '6.5',
          text: `PART 1
Q: Do you like taking photos? Why or why not?
A: Yeah, quite a lot, actually. I'm not a professional or anything, but I like having a record of small everyday moments, like a nice meal or a funny sign in the street.
Q: What do you usually take photos of?
A: Mostly food and street scenes. I find old buildings and markets really interesting, so whenever I visit a new place, I end up taking hundreds of picture of them.
Q: Do you prefer taking photos or being in them?
A: Definitely taking them. I always feel a bit awkward in front of the camera, so I'm usually the one holding the phone.

PART 2
I'd like to describe a trip from Hanoi to a coastal town in the north last spring. My family and I were going there to celebrate my mum's fiftieth birthday, and we'd booked a small hotel by the sea.

We drove, and normally the journey takes about three hours, so we left after lunch, expecting to arrive well before dinner. Unfortunately, about halfway there, um, there had been an accident on the highway, and the traffic was completely stopped for nearly two hours. Then, just as we started moving again, it began to pour with rain, so my dad had to drive really slowly.

In the end, the whole journey took almost six hours. The worst part was the waiting, because there was nothing we could do. My little brother got bored and kept asking when we'd arrive, and I was honestly quite stressed, as I was worried the hotel would give away our room.

Looking back, though, it wasn't all bad. We played word games in the car and my mum told us stories about her childhood, which I'd never heard before. So although the journey was exhausting, it actually turned into one of the most memorable parts of the trip.

PART 3
Q: Why do people often get stressed when they travel?
A: I think it's mainly because travel involves so many things people can't control, like delays, crowds or bad weather. When you've paid a lot for a holiday, any problem feel bigger. Having said that, people who travel often tend to be much calmer, because they expect things to go wrong.
Q: How might the way people travel change in the next twenty years?
A: I'd imagine high-speed trains will become a lot more common, at least for medium distances, because they're faster than driving and greener than flying. There's also a good chance that people will take fewer but longer trips, partly because of the environmental cost of flying.
Q: Is it better to travel alone or with other people?
A: It depends on what you want from the trip. Travelling alone gives you complete freedom and forces you to talk to locals, whereas travelling with friends or family is safer and you share the memories. Personally, I'd go with others for a relaxing holiday, but alone if I wanted an adventure.`,
          notesVi:
            "FC: Chuyển 'chế độ' tốt giữa 3 phần: Part 1 ngắn gọn, Part 2 kể chuyện đủ 2 phút có trình tự, Part 3 lập luận và nhượng bộ; rất ít ngập ngừng.\nLR: Từ vựng linh hoạt (awkward, pour with rain, give away our room, greener than flying), đủ cho chủ đề trừu tượng.\nGRA: Kiểm soát tốt quá khứ đơn, quá khứ hoàn thành ('we'd booked', 'there had been an accident') và câu điều kiện; vài lỗi như 'hundreds of picture', 'any problem feel'.\nP: Dễ hiểu xuyên suốt, giữ được phần lớn âm cuối và đuôi -ed; thiếu -s ở 'picture(s)' và ngữ điệu đôi chỗ còn phẳng.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Part 1: mỗi câu trả lời có 2–4 câu, không trả lời một từ không?',
            'Part 2: bạn có nói ít nhất 1 phút 40 giây không?',
            'Part 3: mỗi câu có lập luận + ví dụ, khoảng 30–60 giây không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng từ khác nhau cho 3 phần, không lặp "very" và "good" không?',
            'Part 3 có dùng từ trừu tượng (environmental cost, freedom…) không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Part 2 có giữ thì quá khứ suốt câu chuyện không?',
            'Part 3 có dùng will / might / would và câu so sánh đúng không?',
            'Cả bài có ít nhất 3 câu phức đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Nghe lại: đuôi -ed và -s có rõ trong Part 2 không?',
            'Âm /θ/ /ð/ có đặt lưỡi đúng vị trí không?',
            'Người nghe có hiểu bạn mà không phải đoán không?',
          ],
        },
      ],
      usefulPhrases: [
        'Yeah, quite a lot, actually.',
        "I'd like to describe…",
        'Unfortunately, about halfway there, …',
        'Looking back, though, …',
        'Having said that, …',
        'It depends on what you want from…',
      ],
      targetSounds: [
        'past -ed in the Part 2 story (booked /t/, started /ɪd/, arrived /d/)',
        'plural -s (photos, pictures, trains)',
        '/θ/ /ð/ (birthday, fiftieth, than, though)',
        'falling intonation on conclusions in Part 3',
      ],
    },
    miniTest: [],
  },
]
