/**
 * speaking-lessons.ts — LEVEL 2 "FOUNDATION" (Band 2.0 – 3.0, CEFR A1+/A2) — KỸ NĂNG NÓI
 * ----------------------------------------------------------------------------
 * File này chứa 10 bài học Nói theo phong cách IELTS Speaking Part 1
 * (quê hương, nhà ở, đồ ăn, thời gian rảnh, phương tiện, thời tiết, học tập/công việc,
 * mua sắm, kỳ nghỉ) và 1 bài làm quen với Part 2 (thẻ đề bài — cue card).
 *
 * Trọng tâm của level này:
 *   - Trả lời DÀI HƠN theo công thức: Answer (trả lời) + Reason (lý do) + Example (ví dụ)
 *   - Từ nối: because, so, but, also
 *   - Quá khứ đơn để kể trải nghiệm, "be going to" cho kế hoạch, so sánh hơn để nêu ý kiến
 *   - Phát âm cho người Việt: đuôi -ed (/t/ /d/ /ɪd/), đuôi -s, nối âm, trọng âm câu
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ lý thuyết (cách trả lời + ngữ pháp + mẹo phát âm)
 *   - exercises     : 10 bài luyện (speak-sentence, trắc nghiệm, điền từ, sắp xếp từ)
 *                     và đúng 1 bài "speak-answer" (nói tự do, AI chấm điểm)
 *   - miniTest      : 6 câu kiểm tra cuối bài (có 1 câu speak-answer)
 *
 * Quy ước id: "l2-speak-<số bài>-ex<số>" và "l2-speak-<số bài>-test<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level2SpeakingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Quê hương — học công thức trả lời dài (Answer + Reason + Example)
  //        Phát âm: trọng âm câu (nhấn từ quan trọng)
  // ==========================================================================
  {
    id: 'l2-speak-01',
    skill: 'speaking',
    title: { vi: 'Quê hương của bạn', en: 'Your hometown' },
    description: {
      vi: 'Nói về quê hương với câu trả lời dài hơn: trả lời + lý do + ví dụ.',
      en: 'Talk about your hometown with longer answers: answer + reason + example.',
    },
    teachingCards: [
      {
        title: { vi: 'Công thức A + R + E', en: 'The A + R + E formula' },
        body: {
          vi: 'Trong IELTS Speaking Part 1, đừng chỉ trả lời "Yes" hay "No". Hãy nói 2–3 câu:\n**A – Answer:** trả lời thẳng câu hỏi.\n**R – Reason:** đưa ra lý do (dùng **because**).\n**E – Example:** thêm một ví dụ (dùng **For example, ...**).\nCâu trả lời dài hơn giúp giám khảo nghe được nhiều từ vựng và ngữ pháp của bạn hơn.',
          en: 'In IELTS Speaking Part 1, don\'t just say "Yes" or "No". Say 2–3 sentences:\n**A – Answer:** answer the question directly.\n**R – Reason:** give a reason (use **because**).\n**E – Example:** add an example (use **For example, ...**).\nLonger answers let the examiner hear more of your vocabulary and grammar.',
        },
        examples: [
          { en: 'Do you like your hometown? Yes, I do.', vi: 'Bạn có thích quê mình không? Có, tôi thích.' },
          { en: "I like it because it's quiet and friendly.", vi: 'Tôi thích nó vì nơi đó yên tĩnh và thân thiện.' },
          { en: 'For example, my neighbours often help each other.', vi: 'Ví dụ, hàng xóm của tôi thường giúp đỡ nhau.' },
        ],
      },
      {
        title: { vi: 'Từ nối: because, so, but, also', en: 'Linking words: because, so, but, also' },
        body: {
          vi: '**because** = vì (nêu lý do)\n**so** = nên, vì vậy (nêu kết quả)\n**but** = nhưng (ý trái ngược)\n**also** = cũng (thêm ý) — đứng trước động từ thường, sau "is/are".\nDùng từ nối giúp câu trả lời trôi chảy, không bị rời rạc.',
          en: '**because** gives a reason.\n**so** gives a result.\n**but** shows a contrast.\n**also** adds an idea — it goes before a main verb and after "is/are".\nLinking words make your answer smooth, not broken.',
        },
        examples: [
          { en: 'My town is small, but it is very beautiful.', vi: 'Thị trấn của tôi nhỏ nhưng rất đẹp.' },
          { en: "It's quiet, so I can sleep well.", vi: 'Ở đó yên tĩnh nên tôi ngủ ngon.' },
          { en: 'It is also famous for its seafood.', vi: 'Nơi đó cũng nổi tiếng về hải sản.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: trọng âm câu', en: 'Pronunciation tip: sentence stress' },
        body: {
          vi: 'Tiếng Việt đọc mỗi chữ mạnh như nhau, nhưng tiếng Anh thì **nhấn mạnh từ mang nghĩa** (danh từ, động từ, tính từ) và **đọc nhẹ, nhanh các từ nhỏ** (a, the, is, and, to).\nVí dụ: I **LIKE** my **HOME**town be**CAUSE** it\'s **QUI**et.\nCâu nói sẽ có nhịp lên – xuống tự nhiên hơn.',
          en: 'Vietnamese gives every word equal weight, but English **stresses content words** (nouns, verbs, adjectives) and says **small words quickly and lightly** (a, the, is, and, to).\nExample: I **LIKE** my **HOME**town be**CAUSE** it\'s **QUI**et.\nYour speech will have a more natural rhythm.',
        },
        examples: [
          { en: 'I LIVE in a BIG CITY.', vi: 'Tôi sống ở một thành phố lớn.' },
          { en: 'The PEOPLE are very FRIENDLY.', vi: 'Người dân rất thân thiện.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-01-ex01',
        type: 'speak-sentence',
        sentence: 'I come from Hai Phong, a big city in the north.',
        translationVi: 'Tôi đến từ Hải Phòng, một thành phố lớn ở miền Bắc.',
        explanation: {
          vi: 'Nhấn các từ COME, HAI PHONG, BIG, CITY, NORTH; đọc nhẹ "a", "in", "the".',
          en: 'Stress COME, HAI PHONG, BIG, CITY, NORTH; say "a", "in", "the" lightly.',
        },
      },
      {
        id: 'l2-speak-01-ex02',
        type: 'multiple-choice',
        question: 'Examiner: "Where is your hometown?" Which answer is the BEST?',
        options: [
          'Hue.',
          "My hometown is Hue, a city in central Vietnam. It's famous for its old buildings.",
          "I don't know.",
          'Yes, I do.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu trả lời tốt nhất vừa trả lời thẳng, vừa thêm thông tin chi tiết.',
          en: 'The best answer answers directly and adds extra details.',
        },
      },
      {
        id: 'l2-speak-01-ex03',
        type: 'speak-sentence',
        sentence: 'I like my hometown because the people are very friendly.',
        translationVi: 'Tôi thích quê mình vì người dân rất thân thiện.',
        explanation: {
          vi: '"because" đọc /bɪˈkɒz/, nhấn âm thứ hai: be-CAUSE.',
          en: '"because" is /bɪˈkɒz/, stressed on the second syllable: be-CAUSE.',
        },
      },
      {
        id: 'l2-speak-01-ex04',
        type: 'fill-blank',
        sentence: 'My hometown is small, ___ it is very beautiful.',
        acceptedAnswers: ['but', 'yet'],
        hint: '(nhưng)',
        explanation: {
          vi: '"small" và "beautiful" là hai ý tương phản nên dùng "but".',
          en: '"small" and "beautiful" are contrasting ideas, so we use "but".',
        },
      },
      {
        id: 'l2-speak-01-ex05',
        type: 'speak-sentence',
        sentence: "It's quiet, so I can sleep well at night.",
        translationVi: 'Ở đó yên tĩnh nên tôi có thể ngủ ngon vào ban đêm.',
        explanation: {
          vi: '"so" nêu kết quả. Nhấn QUIET, SLEEP, WELL, NIGHT.',
          en: '"so" gives a result. Stress QUIET, SLEEP, WELL, NIGHT.',
        },
      },
      {
        id: 'l2-speak-01-ex06',
        type: 'arrange-words',
        translationVi: 'Quê tôi nổi tiếng với món phở.',
        correctSentence: 'My hometown is famous for pho.',
        extraWords: ['of', 'are'],
        explanation: {
          vi: 'Cụm cố định: "be famous for" (nổi tiếng về). Không dùng "famous of".',
          en: 'Fixed phrase: "be famous for". We don\'t say "famous of".',
        },
      },
      {
        id: 'l2-speak-01-ex07',
        type: 'speak-sentence',
        sentence: 'There are many parks and a lovely lake in my town.',
        translationVi: 'Có nhiều công viên và một hồ nước xinh đẹp ở thị trấn của tôi.',
        explanation: {
          vi: 'Đọc rõ đuôi -s trong "parks" /pɑːks/. Nhấn PARKS, LOVELY, LAKE, TOWN.',
          en: 'Pronounce the -s in "parks" /pɑːks/. Stress PARKS, LOVELY, LAKE, TOWN.',
        },
      },
      {
        id: 'l2-speak-01-ex08',
        type: 'multiple-choice',
        question: 'Which words do we usually stress in an English sentence?',
        options: [
          'Small words like "a", "the", "is"',
          'Every word equally',
          'Only the last word',
          'Content words like nouns, verbs and adjectives',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Từ mang nghĩa (danh từ, động từ, tính từ) được nhấn; từ nhỏ đọc nhẹ.',
          en: 'Content words (nouns, verbs, adjectives) are stressed; small words are said lightly.',
        },
      },
      {
        id: 'l2-speak-01-ex09',
        type: 'speak-sentence',
        sentence: 'For example, you can eat fresh seafood every day.',
        translationVi: 'Ví dụ, bạn có thể ăn hải sản tươi mỗi ngày.',
        explanation: {
          vi: '"For example" mở đầu phần ví dụ (E). "example" đọc /ɪɡˈzɑːmpl/.',
          en: '"For example" starts the Example part (E). "example" is /ɪɡˈzɑːmpl/.',
        },
      },
      {
        id: 'l2-speak-01-ex10',
        type: 'speak-answer',
        question: 'Where is your hometown? Do you like it?',
        tipsVi:
          'Dùng công thức A + R + E: nói quê bạn ở đâu (My hometown is... in the north/south of Vietnam), bạn có thích không, vì sao (because...), và cho 1 ví dụ (For example, ...). Thử dùng thêm "but" hoặc "also".',
        sampleAnswer:
          "My hometown is Quy Nhon, a small city in central Vietnam. I really like it because it's peaceful and the beaches are beautiful. For example, every morning many people go swimming before work. It's not very modern, but life there is very relaxing.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt có đủ: trả lời + lý do + ví dụ, và có từ nối because/but.',
          en: 'A good answer has an answer + reason + example, and uses linking words like because/but.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-01-test01',
        type: 'multiple-choice',
        question: 'Choose the best linking word: "It rains a lot in my hometown, ___ people always carry an umbrella."',
        options: ['so', 'because', 'but', 'also'],
        correctIndex: 0,
        explanation: {
          vi: 'Trời mưa nhiều → kết quả là người ta mang ô, nên dùng "so".',
          en: 'It rains a lot → the result is people carry umbrellas, so we use "so".',
        },
      },
      {
        id: 'l2-speak-01-test02',
        type: 'fill-blank',
        sentence: 'There ___ a big market in the centre of my town.',
        acceptedAnswers: ['is', "'s"],
        hint: '(be)',
        explanation: {
          vi: '"a big market" là số ít nên dùng "There is".',
          en: '"a big market" is singular, so we use "There is".',
        },
      },
      {
        id: 'l2-speak-01-test03',
        type: 'speak-sentence',
        sentence: 'My hometown is also famous for its beaches.',
        translationVi: 'Quê tôi cũng nổi tiếng với những bãi biển.',
        explanation: {
          vi: '"also" đứng sau "is". "beaches" có đuôi /ɪz/: /ˈbiːtʃɪz/.',
          en: '"also" comes after "is". "beaches" ends in /ɪz/: /ˈbiːtʃɪz/.',
        },
      },
      {
        id: 'l2-speak-01-test04',
        type: 'arrange-words',
        translationVi: 'Tôi thích quê mình vì nó yên bình.',
        correctSentence: 'I like my hometown because it is peaceful.',
        extraWords: ['are', 'for'],
        explanation: {
          vi: '"because" + mệnh đề (chủ ngữ + động từ): because it is peaceful.',
          en: '"because" + clause (subject + verb): because it is peaceful.',
        },
      },
      {
        id: 'l2-speak-01-test05',
        type: 'multiple-choice',
        question: 'Which answer follows the Answer + Reason + Example pattern?',
        options: [
          'Yes.',
          'Yes, because it is clean.',
          "Yes, I do, because it's clean. For example, there is no rubbish on the streets.",
          'It is clean. It is clean.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Chỉ đáp án này có đủ 3 phần: trả lời (Yes, I do), lý do (because...), ví dụ (For example...).',
          en: 'Only this answer has all three parts: answer (Yes, I do), reason (because...), example (For example...).',
        },
      },
      {
        id: 'l2-speak-01-test06',
        type: 'speak-answer',
        question: 'What is the best thing about your hometown?',
        tipsVi:
          'Chọn 1 điều nổi bật (đồ ăn, con người, cảnh đẹp...). Nói: The best thing about my hometown is... because... For example, ... Nhớ nhấn trọng âm vào từ quan trọng.',
        sampleAnswer:
          "I think the best thing about my hometown is the food. It's cheap and really delicious, because people use fresh ingredients. For example, you can have a big bowl of noodles for only thirty thousand dong. I also love the street food at night.",
        recordSeconds: 40,
        explanation: {
          vi: 'Hãy nêu 1 điều cụ thể, giải thích lý do và thêm ví dụ thực tế.',
          en: 'Name one specific thing, explain why, and add a real example.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Nhà ở — There is/are, so sánh hơn
  //        Phát âm: đuôi -s (/s/, /z/, /ɪz/)
  // ==========================================================================
  {
    id: 'l2-speak-02',
    skill: 'speaking',
    title: { vi: 'Ngôi nhà của bạn', en: 'Your home' },
    description: {
      vi: 'Miêu tả nhà ở, căn phòng yêu thích và so sánh bằng so sánh hơn.',
      en: 'Describe your home and favourite room, and compare using comparatives.',
    },
    teachingCards: [
      {
        title: { vi: 'Miêu tả nhà của bạn', en: 'Describing your home' },
        body: {
          vi: 'Câu hỏi Part 1 thường gặp: **Do you live in a house or a flat?** / **What is your favourite room?**\nCâu mẫu:\n- I live in a **house / flat / apartment** with ...\n- **There is** a ... / **There are** two ...\n- My favourite room is ... **because** ...\nLưu ý: "flat" (Anh-Anh) = "apartment" (Anh-Mỹ) = căn hộ.',
          en: 'Common Part 1 questions: **Do you live in a house or a flat?** / **What is your favourite room?**\nUseful sentences:\n- I live in a **house / flat / apartment** with ...\n- **There is** a ... / **There are** two ...\n- My favourite room is ... **because** ...\nNote: "flat" (British) = "apartment" (American).',
        },
        examples: [
          { en: 'I live in a flat on the fifth floor.', vi: 'Tôi sống trong một căn hộ ở tầng năm.' },
          { en: 'There are three bedrooms in my house.', vi: 'Nhà tôi có ba phòng ngủ.' },
        ],
      },
      {
        title: { vi: 'So sánh hơn: bigger than / more ... than', en: 'Comparatives: bigger than / more ... than' },
        body: {
          vi: '**Tính từ ngắn** (1 âm tiết): thêm **-er** + than: small → smaller, big → bigger, quiet → quieter.\n**Tính từ dài** (2–3 âm tiết trở lên): **more** + tính từ + than: more comfortable, more modern.\n**Đặc biệt:** good → better, bad → worse.\nKhông nói "more bigger" hay "comfortabler".',
          en: '**Short adjectives** (1 syllable): add **-er** + than: small → smaller, big → bigger, quiet → quieter.\n**Long adjectives** (2–3+ syllables): **more** + adjective + than: more comfortable, more modern.\n**Irregular:** good → better, bad → worse.\nDon\'t say "more bigger" or "comfortabler".',
        },
        examples: [
          { en: 'My new flat is bigger than my old one.', vi: 'Căn hộ mới của tôi lớn hơn căn cũ.' },
          { en: 'A house is more comfortable than a flat.', vi: 'Nhà riêng thoải mái hơn căn hộ.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đuôi -s có 3 cách đọc', en: 'Pronunciation tip: three ways to say -s' },
        body: {
          vi: 'Người Việt hay bỏ đuôi -s. Hãy đọc rõ theo 3 cách:\n**/s/** sau âm /p/ /t/ /k/ /f/: flat**s**, book**s**, cup**s**\n**/z/** sau âm hữu thanh (b, d, g, m, n, l, nguyên âm...): room**s**, bed**s**, window**s**\n**/ɪz/** sau /s/ /z/ /ʃ/ /tʃ/ /dʒ/: hous**es**, garag**es**, box**es** (thêm 1 âm tiết!)',
          en: 'Vietnamese speakers often drop the -s. Say it clearly in 3 ways:\n**/s/** after /p/ /t/ /k/ /f/: flat**s**, book**s**, cup**s**\n**/z/** after voiced sounds (b, d, g, m, n, l, vowels...): room**s**, bed**s**, window**s**\n**/ɪz/** after /s/ /z/ /ʃ/ /tʃ/ /dʒ/: hous**es**, garag**es**, box**es** (one extra syllable!)',
        },
        examples: [
          { en: 'There are two rooms and three windows.', vi: 'Có hai phòng và ba cửa sổ.' },
          { en: 'Most houses in my street have small gardens.', vi: 'Hầu hết các ngôi nhà trên phố tôi có vườn nhỏ.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-02-ex01',
        type: 'speak-sentence',
        sentence: 'I live in a small flat with my parents.',
        translationVi: 'Tôi sống trong một căn hộ nhỏ cùng bố mẹ.',
        explanation: {
          vi: 'Nối "live in a" thành /lɪvɪnə/. "parents" kết thúc bằng /ts/.',
          en: 'Link "live in a" as /lɪvɪnə/. "parents" ends with /ts/.',
        },
      },
      {
        id: 'l2-speak-02-ex02',
        type: 'multiple-choice',
        question: 'How do we pronounce the -s in "houses"?',
        options: ['/s/', '/z/', '/ɪz/', 'It is silent.'],
        correctIndex: 2,
        explanation: {
          vi: '"house" kết thúc bằng âm /s/ nên thêm -s đọc là /ɪz/: /ˈhaʊzɪz/.',
          en: '"house" ends in /s/, so the -s is /ɪz/: /ˈhaʊzɪz/.',
        },
      },
      {
        id: 'l2-speak-02-ex03',
        type: 'speak-sentence',
        sentence: 'There are two bedrooms and a tiny kitchen.',
        translationVi: 'Có hai phòng ngủ và một căn bếp nhỏ xíu.',
        explanation: {
          vi: '"bedrooms" đọc đuôi /z/: /ˈbedruːmz/.',
          en: '"bedrooms" ends in /z/: /ˈbedruːmz/.',
        },
      },
      {
        id: 'l2-speak-02-ex04',
        type: 'fill-blank',
        sentence: 'My new house is ___ than my old one.',
        acceptedAnswers: ['bigger'],
        hint: '(big)',
        explanation: {
          vi: '"big" ngắn, kết thúc phụ âm–nguyên âm–phụ âm nên gấp đôi "g": bigger.',
          en: '"big" is short and ends consonant-vowel-consonant, so double the "g": bigger.',
        },
      },
      {
        id: 'l2-speak-02-ex05',
        type: 'speak-sentence',
        sentence: "My favourite room is my bedroom because it's quiet.",
        translationVi: 'Phòng tôi thích nhất là phòng ngủ vì nó yên tĩnh.',
        explanation: {
          vi: '"favourite" đọc /ˈfeɪvərɪt/, chỉ 3 âm tiết. "quiet" là /ˈkwaɪət/.',
          en: '"favourite" is /ˈfeɪvərɪt/, only 3 syllables. "quiet" is /ˈkwaɪət/.',
        },
      },
      {
        id: 'l2-speak-02-ex06',
        type: 'arrange-words',
        translationVi: 'Phòng khách sáng hơn phòng ngủ.',
        correctSentence: 'The living room is brighter than the bedroom.',
        extraWords: ['more', 'then'],
        explanation: {
          vi: '"bright" là tính từ ngắn → brighter (không dùng "more"). So sánh dùng "than", không phải "then".',
          en: '"bright" is short → brighter (no "more"). Comparisons use "than", not "then".',
        },
      },
      {
        id: 'l2-speak-02-ex07',
        type: 'speak-sentence',
        sentence: 'I also like the balcony, so I often read books there.',
        translationVi: 'Tôi cũng thích ban công nên tôi hay đọc sách ở đó.',
        explanation: {
          vi: '"books" đọc đuôi /s/: /bʊks/. "balcony" nhấn âm đầu: BAL-co-ny.',
          en: '"books" ends in /s/: /bʊks/. "balcony" is stressed on the first syllable: BAL-co-ny.',
        },
      },
      {
        id: 'l2-speak-02-ex08',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'My flat is more comfortable than my old house.',
          'My flat is comfortabler than my old house.',
          'My flat is more comfortable that my old house.',
          'My flat is most comfortable than my old house.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"comfortable" là tính từ dài → more comfortable than.',
          en: '"comfortable" is a long adjective → more comfortable than.',
        },
      },
      {
        id: 'l2-speak-02-ex09',
        type: 'speak-sentence',
        sentence: 'The rooms are clean, but the walls are a bit old.',
        translationVi: 'Các phòng sạch sẽ, nhưng tường hơi cũ.',
        explanation: {
          vi: '"rooms" và "walls" đều đọc đuôi /z/. "but" nêu ý trái ngược.',
          en: '"rooms" and "walls" both end in /z/. "but" shows a contrast.',
        },
      },
      {
        id: 'l2-speak-02-ex10',
        type: 'speak-answer',
        question: 'Do you live in a house or a flat? Can you describe it?',
        tipsVi:
          'Nói bạn sống ở nhà hay căn hộ, có mấy phòng (There are...), phòng bạn thích nhất và vì sao. Thử thêm 1 câu so sánh (It is bigger/smaller than...). Đọc rõ đuôi -s.',
        sampleAnswer:
          "I live in a flat in the city centre with my family. There are two bedrooms, a living room and a small kitchen. My favourite room is the living room because it's bright and we watch TV there together. It's smaller than my grandparents' house, but it's very comfortable.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt có miêu tả cụ thể, lý do, và một câu so sánh hơn.',
          en: 'A good answer has specific details, a reason and a comparative sentence.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-02-test01',
        type: 'multiple-choice',
        question: 'Which word ends with the /z/ sound?',
        options: ['books', 'cups', 'flats', 'rooms'],
        correctIndex: 3,
        explanation: {
          vi: '"room" kết thúc bằng /m/ (hữu thanh) nên -s đọc /z/. Ba từ kia đọc /s/.',
          en: '"room" ends in voiced /m/, so the -s is /z/. The other three end in /s/.',
        },
      },
      {
        id: 'l2-speak-02-test02',
        type: 'fill-blank',
        sentence: 'There ___ three rooms in my flat.',
        acceptedAnswers: ['are'],
        hint: '(be)',
        explanation: {
          vi: '"three rooms" là số nhiều nên dùng "There are".',
          en: '"three rooms" is plural, so we use "There are".',
        },
      },
      {
        id: 'l2-speak-02-test03',
        type: 'speak-sentence',
        sentence: "My house is quieter than my friend's flat.",
        translationVi: 'Nhà tôi yên tĩnh hơn căn hộ của bạn tôi.',
        explanation: {
          vi: '"quieter" /ˈkwaɪətə/. "than" đọc nhẹ /ðən/.',
          en: '"quieter" is /ˈkwaɪətə/. Say "than" weakly as /ðən/.',
        },
      },
      {
        id: 'l2-speak-02-test04',
        type: 'arrange-words',
        translationVi: 'Tôi muốn sống trong một ngôi nhà có vườn.',
        correctSentence: 'I want to live in a house with a garden.',
        extraWords: ['at', 'has'],
        explanation: {
          vi: '"with a garden" = có vườn. Cấu trúc: want to + động từ nguyên mẫu.',
          en: '"with a garden" = that has a garden. Structure: want to + base verb.',
        },
      },
      {
        id: 'l2-speak-02-test05',
        type: 'multiple-choice',
        question: 'Examiner: "What is your favourite room?" Which answer is the most complete?',
        options: [
          'Kitchen.',
          'My favourite room is the kitchen because I love cooking. For example, I make breakfast for my family every Sunday.',
          'I like it.',
          'The kitchen is a room.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Đáp án này có đủ trả lời + lý do (because) + ví dụ (For example).',
          en: 'This answer has an answer + reason (because) + example (For example).',
        },
      },
      {
        id: 'l2-speak-02-test06',
        type: 'speak-answer',
        question: 'Do you prefer living in a house or a flat? Why?',
        tipsVi:
          'Nói bạn thích loại nào (I prefer...), rồi so sánh: A house is bigger/more private than..., A flat is safer/more convenient than... Thêm 1 ví dụ từ cuộc sống của bạn.',
        sampleAnswer:
          "I prefer living in a house because it's bigger and more private than a flat. For example, in a house you can have a garden and grow some vegetables. But flats are more convenient in the city, so many young people choose them.",
        recordSeconds: 40,
        explanation: {
          vi: 'Dùng so sánh hơn để nêu ý kiến, kèm lý do và ví dụ.',
          en: 'Use comparatives to give your opinion, with a reason and an example.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Đồ ăn — trạng từ tần suất (always, usually, often...)
  //        Phát âm: nối âm (phụ âm + nguyên âm)
  // ==========================================================================
  {
    id: 'l2-speak-03',
    skill: 'speaking',
    title: { vi: 'Đồ ăn và thói quen ăn uống', en: 'Food and eating habits' },
    description: {
      vi: 'Nói về món ăn yêu thích và mức độ thường xuyên bằng trạng từ tần suất.',
      en: 'Talk about your favourite food and how often you eat it, using adverbs of frequency.',
    },
    teachingCards: [
      {
        title: { vi: 'Trạng từ tần suất', en: 'Adverbs of frequency' },
        body: {
          vi: '**always** (luôn luôn, 100%) → **usually** (thường xuyên) → **often** (hay) → **sometimes** (thỉnh thoảng) → **rarely** (hiếm khi) → **never** (không bao giờ, 0%).\n**Vị trí:**\n- Đứng **trước động từ thường**: I **usually** eat rice.\n- Đứng **sau động từ "to be"**: I am **never** late for dinner.',
          en: '**always** (100%) → **usually** → **often** → **sometimes** → **rarely** → **never** (0%).\n**Position:**\n- **Before a main verb**: I **usually** eat rice.\n- **After the verb "to be"**: I am **never** late for dinner.',
        },
        examples: [
          { en: 'I always have breakfast at home.', vi: 'Tôi luôn ăn sáng ở nhà.' },
          { en: 'We sometimes order pizza.', vi: 'Thỉnh thoảng chúng tôi gọi pizza.' },
          { en: 'My dad is never hungry in the morning.', vi: 'Bố tôi không bao giờ đói vào buổi sáng.' },
        ],
      },
      {
        title: { vi: 'Câu mẫu về đồ ăn', en: 'Useful sentences about food' },
        body: {
          vi: '- My favourite dish is ... (Món tôi thích nhất là ...)\n- I\'m a big fan of ... (Tôi rất mê ...)\n- I eat it ... times a week. (Tôi ăn ... lần mỗi tuần.)\n- It\'s healthy / spicy / sweet / delicious.\n- I eat out (ăn ngoài) / I cook at home (nấu ở nhà).\nNhớ áp dụng A + R + E: món gì → vì sao → ví dụ.',
          en: '- My favourite dish is ...\n- I\'m a big fan of ...\n- I eat it ... times a week.\n- It\'s healthy / spicy / sweet / delicious.\n- I eat out / I cook at home.\nRemember A + R + E: what dish → why → example.',
        },
        examples: [
          { en: "I'm a big fan of spicy food.", vi: 'Tôi rất mê đồ ăn cay.' },
          { en: 'I eat out about twice a week.', vi: 'Tôi ăn ngoài khoảng hai lần một tuần.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: nối âm', en: 'Pronunciation tip: linking sounds' },
        body: {
          vi: 'Khi một từ **kết thúc bằng phụ âm** và từ sau **bắt đầu bằng nguyên âm**, hãy đọc **nối liền** như một từ:\n- eat_a lot_of → /iːtəlɒtəv/\n- like_it → /laɪkɪt/\n- an_egg → /ənɛɡ/\nNgười Việt hay ngắt từng từ, nên câu nghe bị "cứng". Nối âm giúp bạn nói trôi chảy và tự nhiên hơn.',
          en: 'When a word **ends in a consonant** and the next word **starts with a vowel**, **link them** like one word:\n- eat_a lot_of → /iːtəlɒtəv/\n- like_it → /laɪkɪt/\n- an_egg → /ənɛɡ/\nVietnamese speakers often separate every word, which sounds "choppy". Linking makes you sound smoother and more natural.',
        },
        examples: [
          { en: 'I eat a lot of fruit.', vi: 'Tôi ăn nhiều trái cây.' },
          { en: 'I like it a lot.', vi: 'Tôi rất thích nó.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-03-ex01',
        type: 'speak-sentence',
        sentence: 'I usually have pho for breakfast.',
        translationVi: 'Tôi thường ăn phở vào bữa sáng.',
        explanation: {
          vi: '"usually" đứng trước động từ "have". Đọc /ˈjuːʒuəli/.',
          en: '"usually" goes before the verb "have". Say /ˈjuːʒuəli/.',
        },
      },
      {
        id: 'l2-speak-03-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'I eat often rice.',
          'I always eat rice often.',
          'I am never eat fast food.',
          'I often eat rice with fish.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Trạng từ tần suất đứng trước động từ thường: I often eat... Không dùng "am" với động từ thường.',
          en: 'Adverbs of frequency go before a main verb: I often eat... Don\'t use "am" with a main verb.',
        },
      },
      {
        id: 'l2-speak-03-ex03',
        type: 'speak-sentence',
        sentence: 'My favourite dish is fried rice with eggs.',
        translationVi: 'Món tôi thích nhất là cơm chiên trứng.',
        explanation: {
          vi: 'Nối âm: "dish_is", "with_eggs". "eggs" đọc đuôi /z/.',
          en: 'Link: "dish_is", "with_eggs". "eggs" ends in /z/.',
        },
      },
      {
        id: 'l2-speak-03-ex04',
        type: 'fill-blank',
        sentence: "I ___ eat fast food because it isn't healthy.",
        acceptedAnswers: ['rarely', 'seldom', 'hardly ever'],
        hint: '(hiếm khi)',
        explanation: {
          vi: '"rarely" = hiếm khi, đứng trước động từ "eat".',
          en: '"rarely" means not often; it goes before the verb "eat".',
        },
      },
      {
        id: 'l2-speak-03-ex05',
        type: 'speak-sentence',
        sentence: 'I eat a lot of vegetables, so I feel healthy.',
        translationVi: 'Tôi ăn nhiều rau nên tôi thấy khỏe mạnh.',
        explanation: {
          vi: 'Nối âm: "eat_a lot_of" → /iːtəlɒtəv/.',
          en: 'Link: "eat_a lot_of" → /iːtəlɒtəv/.',
        },
      },
      {
        id: 'l2-speak-03-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi thường nấu ăn vào cuối tuần.',
        correctSentence: 'I usually cook at the weekend.',
        extraWords: ['am', 'cooks'],
        explanation: {
          vi: '"usually" đứng trước "cook". Chủ ngữ "I" dùng "cook" (không thêm -s).',
          en: '"usually" goes before "cook". With "I", use "cook" (no -s).',
        },
      },
      {
        id: 'l2-speak-03-ex07',
        type: 'speak-sentence',
        sentence: 'I sometimes eat out with my friends on Saturday.',
        translationVi: 'Thỉnh thoảng tôi đi ăn ngoài với bạn vào thứ Bảy.',
        explanation: {
          vi: 'Nối âm "eat_out" → /iːtaʊt/. "friends" kết thúc bằng /dz/.',
          en: 'Link "eat_out" → /iːtaʊt/. "friends" ends with /dz/.',
        },
      },
      {
        id: 'l2-speak-03-ex08',
        type: 'multiple-choice',
        question: 'Where do the words link? "I eat an apple every day."',
        options: [
          'Between "I" and "eat" only',
          '"eat_an_apple"',
          'Between "every" and "day" only',
          'No words link in this sentence.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"eat" kết thúc bằng /t/, "an" bắt đầu bằng nguyên âm; "an" kết thúc /n/, "apple" bắt đầu nguyên âm → nối thành /iːtənæpl/.',
          en: '"eat" ends in /t/ and "an" starts with a vowel; "an" ends in /n/ and "apple" starts with a vowel → /iːtənæpl/.',
        },
      },
      {
        id: 'l2-speak-03-ex09',
        type: 'speak-sentence',
        sentence: 'Vietnamese food is healthy because it has lots of herbs.',
        translationVi: 'Đồ ăn Việt Nam tốt cho sức khỏe vì có nhiều rau thơm.',
        explanation: {
          vi: 'Nối "lots_of" → /lɒtsəv/. "herbs" đọc /hɜːbz/ (Anh-Anh có âm /h/).',
          en: 'Link "lots_of" → /lɒtsəv/. "herbs" is /hɜːbz/ (British English says the /h/).',
        },
      },
      {
        id: 'l2-speak-03-ex10',
        type: 'speak-answer',
        question: 'What kind of food do you like? How often do you eat it?',
        tipsVi:
          'Nói món bạn thích (My favourite food is...), vì sao (because...), và bao lâu ăn 1 lần (I usually / often / ... times a week). Dùng ít nhất 2 trạng từ tần suất và nhớ nối âm.',
        sampleAnswer:
          "I really like Vietnamese noodle soup, especially bun bo Hue. I like it because it's a bit spicy and full of flavour. I usually eat it once or twice a week, often on Sunday mornings with my dad. I rarely eat fast food because it isn't very healthy.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt dùng trạng từ tần suất đúng vị trí và có lý do rõ ràng.',
          en: 'A good answer uses adverbs of frequency in the right place and gives clear reasons.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-03-test01',
        type: 'multiple-choice',
        question: 'Put "never" in the right place: "She ___ late for dinner."',
        options: ['is never', 'never is', 'never be', 'is nevers'],
        correctIndex: 0,
        explanation: {
          vi: 'Với động từ "to be", trạng từ tần suất đứng sau: She is never late.',
          en: 'With the verb "to be", the adverb goes after it: She is never late.',
        },
      },
      {
        id: 'l2-speak-03-test02',
        type: 'fill-blank',
        sentence: 'I ___ drink coffee in the morning. I drink it every day.',
        acceptedAnswers: ['always'],
        hint: '(100%)',
        explanation: {
          vi: 'Uống mỗi ngày = 100% → "always".',
          en: 'Every day = 100% → "always".',
        },
      },
      {
        id: 'l2-speak-03-test03',
        type: 'speak-sentence',
        sentence: 'I often eat noodles at a small shop near my house.',
        translationVi: 'Tôi hay ăn mì ở một quán nhỏ gần nhà.',
        explanation: {
          vi: 'Chỉ nối khi từ sau bắt đầu bằng nguyên âm: "at_a" → /ætə/. "noodles" đọc đuôi /z/.',
          en: 'Link only before a vowel: "at_a" → /ætə/. "noodles" ends in /z/.',
        },
      },
      {
        id: 'l2-speak-03-test04',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi luôn nấu những món ăn ngon.',
        correctSentence: 'My mother always cooks delicious food.',
        extraWords: ['cook', 'is'],
        explanation: {
          vi: 'Chủ ngữ số ít "My mother" → "cooks". "always" đứng trước động từ.',
          en: 'Singular subject "My mother" → "cooks". "always" goes before the verb.',
        },
      },
      {
        id: 'l2-speak-03-test05',
        type: 'multiple-choice',
        question: 'Examiner: "Do you like cooking?" Which answer uses linking words well?',
        options: [
          'Yes. I cook.',
          'Yes, cooking.',
          "Yes, I do, but I only cook on Sundays because I'm busy on weekdays.",
          'Cooking is cook.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Đáp án này dùng "but" và "because" để nối ý thành câu trả lời dài, tự nhiên.',
          en: 'This answer uses "but" and "because" to make a longer, natural answer.',
        },
      },
      {
        id: 'l2-speak-03-test06',
        type: 'speak-answer',
        question: 'Do you prefer eating at home or eating out? Why?',
        tipsVi:
          'Chọn 1 (I prefer eating at home / eating out), nêu lý do (because it\'s cheaper / healthier / more fun...), thêm ví dụ và câu "But..." để nói mặt còn lại.',
        sampleAnswer:
          "I prefer eating at home because my mum is a great cook and home food is healthier. For example, she often makes fish soup with lots of vegetables. But I sometimes eat out with my friends at the weekend because it's fun.",
        recordSeconds: 40,
        explanation: {
          vi: 'Nêu rõ lựa chọn, lý do, ví dụ, và dùng "but" để cân bằng ý.',
          en: 'State your choice, give a reason and example, and use "but" to balance your idea.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Thời gian rảnh — hiện tại đơn (thói quen) + quá khứ đơn (trải nghiệm)
  //        Phát âm: đuôi -ed (/t/, /d/, /ɪd/)
  // ==========================================================================
  {
    id: 'l2-speak-04',
    skill: 'speaking',
    title: { vi: 'Thời gian rảnh', en: 'Free time' },
    description: {
      vi: 'Nói về sở thích hiện tại và kể lại cuối tuần vừa qua bằng thì quá khứ đơn.',
      en: 'Talk about your hobbies and describe last weekend using the past simple.',
    },
    teachingCards: [
      {
        title: { vi: 'Thói quen + một trải nghiệm', en: 'A habit + one experience' },
        body: {
          vi: 'Mẹo hay: dùng **hiện tại đơn** để nói thói quen, rồi dùng **quá khứ đơn** để kể 1 ví dụ cụ thể.\n- In my free time, I **often play** badminton. (thói quen)\n- **Last Sunday**, I **played** with my dad for two hours. (ví dụ trong quá khứ)\nĐang làm gì dạo này: dùng **hiện tại tiếp diễn**: I**\'m learning** the guitar now.',
          en: 'Great tip: use the **present simple** for habits, then the **past simple** for one specific example.\n- In my free time, I **often play** badminton. (habit)\n- **Last Sunday**, I **played** with my dad for two hours. (past example)\nFor something happening around now, use the **present continuous**: I**\'m learning** the guitar now.',
        },
        examples: [
          { en: 'I usually read comics in my free time.', vi: 'Tôi thường đọc truyện tranh lúc rảnh.' },
          { en: 'Last night, I watched a football match.', vi: 'Tối qua tôi xem một trận bóng đá.' },
        ],
      },
      {
        title: { vi: 'Quá khứ đơn: có quy tắc và bất quy tắc', en: 'Past simple: regular and irregular' },
        body: {
          vi: '**Có quy tắc:** thêm -ed: play → played, watch → watched, visit → visited.\n**Bất quy tắc** (phải học thuộc): go → **went**, have → **had**, see → **saw**, eat → **ate**, make → **made**.\n**Phủ định / câu hỏi:** dùng **did / didn\'t** + động từ nguyên mẫu: I **didn\'t go** out. **Did** you **enjoy** it?',
          en: '**Regular:** add -ed: play → played, watch → watched, visit → visited.\n**Irregular** (learn by heart): go → **went**, have → **had**, see → **saw**, eat → **ate**, make → **made**.\n**Negatives / questions:** use **did / didn\'t** + base verb: I **didn\'t go** out. **Did** you **enjoy** it?',
        },
        examples: [
          { en: 'We went to the park and had a picnic.', vi: 'Chúng tôi đi công viên và đi dã ngoại.' },
          { en: "I didn't go out last weekend.", vi: 'Cuối tuần trước tôi không ra ngoài.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đuôi -ed có 3 cách đọc', en: 'Pronunciation tip: three ways to say -ed' },
        body: {
          vi: '**/t/** sau âm vô thanh /p/ /k/ /s/ /ʃ/ /tʃ/ /f/: watch**ed** /wɒtʃt/, cook**ed** /kʊkt/, walk**ed** /wɔːkt/\n**/d/** sau âm hữu thanh: play**ed** /pleɪd/, listen**ed** /ˈlɪsnd/\n**/ɪd/** sau /t/ và /d/: visit**ed** /ˈvɪzɪtɪd/, want**ed**, need**ed** (thêm 1 âm tiết)\n**Lỗi hay gặp:** đọc "watched" thành "watch-ed" 2 âm tiết, hoặc bỏ hẳn đuôi -ed.',
          en: '**/t/** after voiceless /p/ /k/ /s/ /ʃ/ /tʃ/ /f/: watch**ed** /wɒtʃt/, cook**ed** /kʊkt/, walk**ed** /wɔːkt/\n**/d/** after voiced sounds: play**ed** /pleɪd/, listen**ed** /ˈlɪsnd/\n**/ɪd/** after /t/ and /d/: visit**ed** /ˈvɪzɪtɪd/, want**ed**, need**ed** (one extra syllable)\n**Common mistake:** saying "watched" as two syllables "watch-ed", or dropping the -ed completely.',
        },
        examples: [
          { en: 'I watched TV and played games.', vi: 'Tôi xem TV và chơi game.' },
          { en: 'We visited a museum.', vi: 'Chúng tôi đã tham quan một bảo tàng.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-04-ex01',
        type: 'speak-sentence',
        sentence: 'In my free time, I usually listen to music.',
        translationVi: 'Lúc rảnh, tôi thường nghe nhạc.',
        explanation: {
          vi: '"listen" đọc /ˈlɪsn/ — chữ "t" câm. "music" nhấn âm đầu: MU-sic.',
          en: '"listen" is /ˈlɪsn/ — the "t" is silent. "music" is stressed on MU-sic.',
        },
      },
      {
        id: 'l2-speak-04-ex02',
        type: 'multiple-choice',
        question: 'How do we pronounce the -ed in "watched"?',
        options: ['/t/', '/d/', '/ɪd/'],
        correctIndex: 0,
        explanation: {
          vi: '"watch" kết thúc bằng /tʃ/ (vô thanh) nên -ed đọc /t/: /wɒtʃt/ — chỉ 1 âm tiết.',
          en: '"watch" ends in voiceless /tʃ/, so -ed is /t/: /wɒtʃt/ — just one syllable.',
        },
      },
      {
        id: 'l2-speak-04-ex03',
        type: 'speak-sentence',
        sentence: 'Last weekend, I watched a funny film with my sister.',
        translationVi: 'Cuối tuần trước, tôi xem một bộ phim hài với chị gái.',
        explanation: {
          vi: '"watched" /wɒtʃt/ và nối với "a": /wɒtʃtə/.',
          en: '"watched" /wɒtʃt/ links to "a": /wɒtʃtə/.',
        },
      },
      {
        id: 'l2-speak-04-ex04',
        type: 'fill-blank',
        sentence: 'Yesterday I ___ football with my classmates.',
        acceptedAnswers: ['played'],
        hint: '(play)',
        explanation: {
          vi: '"Yesterday" → quá khứ đơn: played (đọc /pleɪd/).',
          en: '"Yesterday" → past simple: played (said /pleɪd/).',
        },
      },
      {
        id: 'l2-speak-04-ex05',
        type: 'speak-sentence',
        sentence: 'I visited my grandparents and we cooked dinner together.',
        translationVi: 'Tôi đến thăm ông bà và chúng tôi cùng nấu bữa tối.',
        explanation: {
          vi: '"visited" đọc /ɪd/ (3 âm tiết), "cooked" đọc /t/ (1 âm tiết).',
          en: '"visited" ends in /ɪd/ (3 syllables); "cooked" ends in /t/ (1 syllable).',
        },
      },
      {
        id: 'l2-speak-04-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi đã đi xem phim với bạn bè.',
        correctSentence: 'I went to the cinema with my friends.',
        extraWords: ['go', 'goed'],
        explanation: {
          vi: 'Quá khứ của "go" là "went" (bất quy tắc). Không có từ "goed".',
          en: 'The past of "go" is "went" (irregular). "goed" is not a word.',
        },
      },
      {
        id: 'l2-speak-04-ex07',
        type: 'speak-sentence',
        sentence: 'I enjoyed the match because my team played very well.',
        translationVi: 'Tôi thích trận đấu vì đội của tôi chơi rất hay.',
        explanation: {
          vi: '"enjoyed" và "played" đều đọc đuôi /d/.',
          en: '"enjoyed" and "played" both end in /d/.',
        },
      },
      {
        id: 'l2-speak-04-ex08',
        type: 'multiple-choice',
        question: 'Which word ends with the /ɪd/ sound?',
        options: ['played', 'cooked', 'wanted', 'listened'],
        correctIndex: 2,
        explanation: {
          vi: '"want" kết thúc bằng /t/ nên -ed đọc /ɪd/: /ˈwɒntɪd/.',
          en: '"want" ends in /t/, so -ed is /ɪd/: /ˈwɒntɪd/.',
        },
      },
      {
        id: 'l2-speak-04-ex09',
        type: 'speak-sentence',
        sentence: "I'm learning the guitar now, but it's quite difficult.",
        translationVi: 'Dạo này tôi đang học đàn guitar, nhưng khá khó.',
        explanation: {
          vi: 'Hiện tại tiếp diễn cho việc đang làm dạo này. "guitar" nhấn âm 2: gui-TAR.',
          en: 'Present continuous for something happening now. "guitar" is stressed gui-TAR.',
        },
      },
      {
        id: 'l2-speak-04-ex10',
        type: 'speak-answer',
        question: 'What do you usually do in your free time? What did you do last weekend?',
        tipsVi:
          'Phần 1: dùng hiện tại đơn + trạng từ tần suất (I usually / often...). Phần 2: dùng quá khứ đơn kể cuối tuần trước (Last weekend, I went / played / watched...). Đọc rõ đuôi -ed!',
        sampleAnswer:
          "In my free time, I usually play badminton or watch videos online. I like badminton because it helps me relax after school. Last weekend, I played with my cousin in the park for two hours, and then we watched a funny film at home. It was a really nice day.",
        recordSeconds: 50,
        explanation: {
          vi: 'Câu trả lời tốt chuyển đúng từ hiện tại đơn (thói quen) sang quá khứ đơn (cuối tuần trước).',
          en: 'A good answer moves correctly from present simple (habits) to past simple (last weekend).',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-04-test01',
        type: 'multiple-choice',
        question: 'Choose the correct past form: "Last Saturday I ___ swimming."',
        options: ['go', 'went', 'goed', 'going'],
        correctIndex: 1,
        explanation: {
          vi: '"go" là động từ bất quy tắc: go → went.',
          en: '"go" is irregular: go → went.',
        },
      },
      {
        id: 'l2-speak-04-test02',
        type: 'fill-blank',
        sentence: 'We ___ a great time at the park yesterday.',
        acceptedAnswers: ['had'],
        hint: '(have)',
        explanation: {
          vi: '"have" là bất quy tắc: have → had. "have a great time" = vui vẻ.',
          en: '"have" is irregular: have → had. "have a great time" = enjoy yourself.',
        },
      },
      {
        id: 'l2-speak-04-test03',
        type: 'speak-sentence',
        sentence: 'I walked to the park and played badminton.',
        translationVi: 'Tôi đi bộ đến công viên và chơi cầu lông.',
        explanation: {
          vi: '"walked" đọc /wɔːkt/ (đuôi /t/), "played" đọc /pleɪd/ (đuôi /d/).',
          en: '"walked" is /wɔːkt/ (/t/ ending); "played" is /pleɪd/ (/d/ ending).',
        },
      },
      {
        id: 'l2-speak-04-test04',
        type: 'arrange-words',
        translationVi: 'Tôi đã nghe nhạc cả buổi chiều.',
        correctSentence: 'I listened to music all afternoon.',
        extraWords: ['listening', 'on'],
        explanation: {
          vi: 'Quá khứ đơn: listened (đọc /ˈlɪsnd/). Cụm "listen to music".',
          en: 'Past simple: listened (said /ˈlɪsnd/). The phrase is "listen to music".',
        },
      },
      {
        id: 'l2-speak-04-test05',
        type: 'multiple-choice',
        question: 'Examiner: "Do you have a lot of free time?" Which answer is the best?',
        options: [
          'Yes.',
          'No, free time.',
          'I free time.',
          'Not really, because I have a lot of homework. But on Sundays I usually relax and read comics.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Đáp án này có trả lời + lý do (because) + thêm thông tin (But...).',
          en: 'This answer gives an answer + reason (because) + more information (But...).',
        },
      },
      {
        id: 'l2-speak-04-test06',
        type: 'speak-answer',
        question: 'Did you have a hobby when you were a child? Tell me about it.',
        tipsVi:
          'Dùng quá khứ đơn: When I was a child, I liked / played / collected... Nói bạn làm với ai, bao lâu một lần (I often...), vì sao bạn thích. Có thể kết thúc bằng: Now I still... / Now I don\'t... anymore.',
        sampleAnswer:
          "Yes, when I was a child, I loved flying kites. My grandfather made the kites for me, and we often played in the field near our house. I enjoyed it because it was free and very exciting. Now I'm too busy, so I don't fly kites anymore.",
        recordSeconds: 45,
        explanation: {
          vi: 'Dùng quá khứ đơn nhất quán và đọc rõ đuôi -ed (loved, played, enjoyed).',
          en: 'Use the past simple consistently and pronounce the -ed endings clearly (loved, played, enjoyed).',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 5: Phương tiện đi lại — so sánh hơn và so sánh nhất để nêu ý kiến
  //        Phát âm: "than" đọc yếu /ðən/
  // ==========================================================================
  {
    id: 'l2-speak-05',
    skill: 'speaking',
    title: { vi: 'Phương tiện đi lại', en: 'Transport' },
    description: {
      vi: 'Nói cách bạn đi lại và so sánh các phương tiện bằng so sánh hơn / nhất.',
      en: 'Say how you travel and compare types of transport with comparatives and superlatives.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói về cách đi lại', en: 'Talking about how you travel' },
        body: {
          vi: '- go **by** bus / motorbike / car / bike / train (đi bằng ...)\n- go **on foot** = walk (đi bộ) — KHÔNG nói "by foot" trong văn nói chuẩn\n- It **takes** (me) about 20 minutes. (Mất khoảng 20 phút.)\n- traffic jam (kẹt xe), rush hour (giờ cao điểm), public transport (giao thông công cộng)',
          en: '- go **by** bus / motorbike / car / bike / train\n- go **on foot** = walk\n- It **takes** (me) about 20 minutes.\n- traffic jam, rush hour, public transport',
        },
        examples: [
          { en: 'I go to school by bike.', vi: 'Tôi đi học bằng xe đạp.' },
          { en: 'It takes me half an hour to get to work.', vi: 'Tôi mất nửa tiếng để đi làm.' },
        ],
      },
      {
        title: { vi: 'So sánh hơn và so sánh nhất', en: 'Comparatives and superlatives' },
        body: {
          vi: '**Tính từ ngắn:** fast → fast**er** than → **the** fast**est**; cheap → cheaper → the cheapest\n**Tính từ dài:** convenient → **more** convenient than → **the most** convenient\n**Bất quy tắc:** good → better → the best; bad → worse → the worst\nDùng để nêu ý kiến: **In my opinion**, the bus is **cheaper than** a taxi.',
          en: '**Short adjectives:** fast → fast**er** than → **the** fast**est**; cheap → cheaper → the cheapest\n**Long adjectives:** convenient → **more** convenient than → **the most** convenient\n**Irregular:** good → better → the best; bad → worse → the worst\nUse them to give opinions: **In my opinion**, the bus is **cheaper than** a taxi.',
        },
        examples: [
          { en: 'A motorbike is faster than a bicycle.', vi: 'Xe máy nhanh hơn xe đạp.' },
          { en: 'The train is the most comfortable way to travel.', vi: 'Tàu hỏa là cách đi lại thoải mái nhất.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: "than" đọc nhẹ', en: 'Pronunciation tip: weak "than"' },
        body: {
          vi: 'Trong câu so sánh, **"than" đọc yếu là /ðən/** — nhanh, nhẹ, gần như "đần" lướt qua. Từ được nhấn là **tính từ** và **hai thứ được so sánh**.\nVí dụ: A **BUS** is **CHEAP**er /ðən/ a **TAX**i.\nĐừng đọc "than" to và rõ như /ðæn/ — câu sẽ nghe không tự nhiên.\nNhớ: âm /ð/ đặt đầu lưỡi giữa hai hàm răng.',
          en: 'In comparisons, **"than" is weak: /ðən/** — quick and light. The stressed words are the **adjective** and **the two things you compare**.\nExample: A **BUS** is **CHEAP**er /ðən/ a **TAX**i.\nDon\'t say "than" loudly as /ðæn/ — it sounds unnatural.\nRemember: for /ð/, put your tongue between your teeth.',
        },
        examples: [
          { en: 'Walking is slower than cycling.', vi: 'Đi bộ chậm hơn đạp xe.' },
          { en: 'Taxis are more expensive than buses.', vi: 'Taxi đắt hơn xe buýt.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-05-ex01',
        type: 'speak-sentence',
        sentence: 'I usually go to school by motorbike.',
        translationVi: 'Tôi thường đi học bằng xe máy.',
        explanation: {
          vi: '"by + phương tiện" không có "a/the". "motorbike" nhấn âm đầu: MO-tor-bike.',
          en: '"by + transport" has no "a/the". "motorbike" is stressed MO-tor-bike.',
        },
      },
      {
        id: 'l2-speak-05-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'The bus is more cheap than a taxi.',
          'The bus is cheaper than a taxi.',
          'The bus is cheapest than a taxi.',
          'The bus is cheaper that a taxi.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"cheap" là tính từ ngắn → cheaper than.',
          en: '"cheap" is a short adjective → cheaper than.',
        },
      },
      {
        id: 'l2-speak-05-ex03',
        type: 'speak-sentence',
        sentence: 'It takes about fifteen minutes to get there.',
        translationVi: 'Mất khoảng mười lăm phút để đến đó.',
        explanation: {
          vi: '"takes" đọc đuôi /s/. Nối "takes_about" → /teɪksəbaʊt/.',
          en: '"takes" ends in /s/. Link "takes_about" → /teɪksəbaʊt/.',
        },
      },
      {
        id: 'l2-speak-05-ex04',
        type: 'fill-blank',
        sentence: 'The motorbike is the ___ way to travel in my city.',
        acceptedAnswers: ['fastest'],
        hint: '(fast)',
        explanation: {
          vi: 'Có "the" và so với tất cả cách đi lại → so sánh nhất: the fastest.',
          en: '"the" + comparing with all ways of travelling → superlative: the fastest.',
        },
      },
      {
        id: 'l2-speak-05-ex05',
        type: 'speak-sentence',
        sentence: "Cycling is better than driving because it's good for your health.",
        translationVi: 'Đạp xe tốt hơn lái xe vì nó tốt cho sức khỏe.',
        explanation: {
          vi: 'Đọc "than" nhẹ /ðən/. "health" kết thúc bằng /θ/ — đặt lưỡi giữa răng.',
          en: 'Say "than" weakly /ðən/. "health" ends in /θ/ — tongue between your teeth.',
        },
      },
      {
        id: 'l2-speak-05-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi nghĩ xe buýt là lựa chọn an toàn nhất.',
        correctSentence: 'I think the bus is the safest option.',
        extraWords: ['safer', 'most'],
        explanation: {
          vi: '"safe" là tính từ ngắn → the safest (không dùng "most safest").',
          en: '"safe" is short → the safest (not "most safest").',
        },
      },
      {
        id: 'l2-speak-05-ex07',
        type: 'speak-sentence',
        sentence: 'The traffic is terrible, so I often leave home early.',
        translationVi: 'Giao thông rất tệ nên tôi thường ra khỏi nhà sớm.',
        explanation: {
          vi: '"traffic" nhấn TRAF-fic. "so" nêu kết quả.',
          en: '"traffic" is stressed TRAF-fic. "so" gives a result.',
        },
      },
      {
        id: 'l2-speak-05-ex08',
        type: 'multiple-choice',
        question: 'In "A taxi is faster than a bus", how is "than" usually said?',
        options: [
          '/θæn/, strong and long',
          '/ðæn/, with strong stress',
          'It is silent.',
          '/ðən/, weak and quick',
        ],
        correctIndex: 3,
        explanation: {
          vi: '"than" là từ chức năng nên thường đọc yếu /ðən/.',
          en: '"than" is a function word, so it is usually weak: /ðən/.',
        },
      },
      {
        id: 'l2-speak-05-ex09',
        type: 'speak-sentence',
        sentence: 'The metro is the most modern way to travel in Hanoi.',
        translationVi: 'Tàu điện ngầm/đường sắt đô thị là cách đi lại hiện đại nhất ở Hà Nội.',
        explanation: {
          vi: '"modern" là tính từ 2 âm tiết → the most modern. Nhấn MO-dern.',
          en: '"modern" has 2 syllables → the most modern. Stress MO-dern.',
        },
      },
      {
        id: 'l2-speak-05-ex10',
        type: 'speak-answer',
        question: 'How do you usually travel to school or work? Why?',
        tipsVi:
          'Nói phương tiện (I usually go by...), mất bao lâu (It takes...), vì sao chọn nó — dùng 1–2 câu so sánh (It is faster / cheaper / more convenient than...). Đọc "than" nhẹ.',
        sampleAnswer:
          "I usually go to school by bike. It takes about fifteen minutes. I prefer cycling because it's cheaper than taking a motorbike taxi and it's good for my health. But when it rains heavily, my dad takes me by motorbike, because it's faster and drier.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt dùng so sánh hơn để giải thích lựa chọn của bạn.',
          en: 'A good answer uses comparatives to explain your choice.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-05-test01',
        type: 'multiple-choice',
        question: 'Complete: "Walking is ___ than driving." (healthy)',
        options: ['healthyer', 'most healthy', 'healthier', 'the healthiest'],
        correctIndex: 2,
        explanation: {
          vi: 'Tính từ tận cùng -y → đổi y thành i + er: healthier.',
          en: 'Adjectives ending in -y → change y to i + er: healthier.',
        },
      },
      {
        id: 'l2-speak-05-test02',
        type: 'fill-blank',
        sentence: 'Bicycles are ___ for the environment than cars.',
        acceptedAnswers: ['better'],
        hint: '(good)',
        explanation: {
          vi: '"good" là bất quy tắc: good → better → the best.',
          en: '"good" is irregular: good → better → the best.',
        },
      },
      {
        id: 'l2-speak-05-test03',
        type: 'speak-sentence',
        sentence: "My bike is older than my brother's, but it still works.",
        translationVi: 'Xe đạp của tôi cũ hơn của anh tôi, nhưng nó vẫn chạy tốt.',
        explanation: {
          vi: 'Nối "bike_is", đọc "than" nhẹ /ðən/, "works" đuôi /s/.',
          en: 'Link "bike_is", say "than" weakly /ðən/, "works" ends in /s/.',
        },
      },
      {
        id: 'l2-speak-05-test04',
        type: 'arrange-words',
        translationVi: 'Tôi mất mười phút để đi bộ đến trường.',
        correctSentence: 'It takes me ten minutes to walk to school.',
        extraWords: ['take', 'for'],
        explanation: {
          vi: 'Cấu trúc: It takes + người + thời gian + to + động từ. Chủ ngữ "It" → "takes".',
          en: 'Structure: It takes + person + time + to + verb. Subject "It" → "takes".',
        },
      },
      {
        id: 'l2-speak-05-test05',
        type: 'multiple-choice',
        question: 'Examiner: "Is public transport good in your city?" Which answer is the best?',
        options: [
          'Not really, because buses are often late. So most people prefer motorbikes.',
          'Bus.',
          'Yes, transport.',
          'I go.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Đáp án này có ý kiến + lý do (because) + kết quả (So...).',
          en: 'This answer has an opinion + reason (because) + result (So...).',
        },
      },
      {
        id: 'l2-speak-05-test06',
        type: 'speak-answer',
        question: 'Which is better in your city: buses or motorbikes? Why?',
        tipsVi:
          'Chọn 1 và so sánh ít nhất 2 điểm (cheaper, faster, safer, more convenient, better for the environment). Dùng "but" để nói điểm yếu. Kết thúc bằng: So in my opinion, ... is better.',
        sampleAnswer:
          "In my opinion, motorbikes are better in my city. They're faster than buses and more convenient, because you can go anywhere you want. But buses are cheaper and safer, and they are better for the environment. So for long trips, I sometimes take the bus.",
        recordSeconds: 45,
        explanation: {
          vi: 'So sánh nhiều mặt bằng so sánh hơn và kết luận rõ ý kiến của bạn.',
          en: 'Compare several points with comparatives and state your opinion clearly.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Thời tiết — hiện tại đơn (thường xuyên) vs hiện tại tiếp diễn (bây giờ), should
  //        Phát âm: đuôi -s ở ngôi thứ ba (rains, gets, changes)
  // ==========================================================================
  {
    id: 'l2-speak-06',
    skill: 'speaking',
    title: { vi: 'Thời tiết và các mùa', en: 'Weather and seasons' },
    description: {
      vi: 'Nói về thời tiết quê bạn, mùa yêu thích, phân biệt hiện tại đơn và hiện tại tiếp diễn.',
      en: 'Talk about the weather in your area and your favourite season; use present simple vs continuous.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ vựng thời tiết', en: 'Weather words' },
        body: {
          vi: '**sunny** (nắng), **rainy** (mưa), **cloudy** (nhiều mây), **windy** (có gió), **hot** (nóng), **humid** (ẩm), **cool** (mát), **cold** (lạnh)\nMùa ở Việt Nam: **the rainy season** (mùa mưa), **the dry season** (mùa khô); miền Bắc có **spring, summer, autumn, winter**.\nCâu hỏi: **What\'s the weather like in your hometown?** (Thời tiết quê bạn thế nào?)',
          en: '**sunny**, **rainy**, **cloudy**, **windy**, **hot**, **humid**, **cool**, **cold**\nSeasons in Vietnam: **the rainy season**, **the dry season**; the north has **spring, summer, autumn, winter**.\nQuestion: **What\'s the weather like in your hometown?**',
        },
        examples: [
          { en: "It's hot and humid in Ho Chi Minh City.", vi: 'Ở TP.HCM trời nóng và ẩm.' },
          { en: 'The rainy season starts in May.', vi: 'Mùa mưa bắt đầu vào tháng Năm.' },
        ],
      },
      {
        title: { vi: 'Hiện tại đơn hay hiện tại tiếp diễn?', en: 'Present simple or present continuous?' },
        body: {
          vi: '**Hiện tại đơn** — điều thường xảy ra, sự thật chung: It **rains** a lot in summer. It **gets** cold in December.\n**Hiện tại tiếp diễn** — đang xảy ra ngay lúc nói: Look! It**\'s raining** now.\nDấu hiệu: usually, often, every year → hiện tại đơn; now, right now, today, look! → tiếp diễn.\nĐưa lời khuyên: **should / shouldn\'t** + động từ nguyên mẫu: You **should** bring a raincoat.',
          en: '**Present simple** — things that happen regularly, general facts: It **rains** a lot in summer. It **gets** cold in December.\n**Present continuous** — happening right now: Look! It**\'s raining** now.\nSignals: usually, often, every year → present simple; now, right now, today, look! → continuous.\nFor advice: **should / shouldn\'t** + base verb: You **should** bring a raincoat.',
        },
        examples: [
          { en: 'It often rains in the afternoon.', vi: 'Trời hay mưa vào buổi chiều.' },
          { en: "It's raining, so we're staying at home.", vi: 'Trời đang mưa nên chúng tôi ở nhà.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đuôi -s ở ngôi thứ ba', en: 'Pronunciation tip: third-person -s' },
        body: {
          vi: 'Chủ ngữ "It / He / She" + động từ hiện tại đơn phải có **-s**, và phải **đọc ra**:\n- rain**s** /reɪnz/ → /z/\n- get**s** /ɡets/ → /s/\n- chang**es** /ˈtʃeɪndʒɪz/ → /ɪz/\nNgười Việt hay nói "It rain a lot" — giám khảo sẽ nghe như lỗi ngữ pháp. Hãy kéo dài âm cuối một chút cho rõ.',
          en: 'With "It / He / She", present simple verbs need **-s**, and you must **pronounce it**:\n- rain**s** /reɪnz/ → /z/\n- get**s** /ɡets/ → /s/\n- chang**es** /ˈtʃeɪndʒɪz/ → /ɪz/\nVietnamese speakers often say "It rain a lot" — the examiner hears a grammar mistake. Hold the final sound a little longer.',
        },
        examples: [
          { en: 'It rains every afternoon.', vi: 'Chiều nào trời cũng mưa.' },
          { en: 'The weather changes very quickly.', vi: 'Thời tiết thay đổi rất nhanh.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-06-ex01',
        type: 'speak-sentence',
        sentence: "It's usually hot and humid in the summer.",
        translationVi: 'Mùa hè trời thường nóng và ẩm.',
        explanation: {
          vi: '"humid" đọc /ˈhjuːmɪd/, nhấn HU-mid. Nối "hot_and".',
          en: '"humid" is /ˈhjuːmɪd/, stressed HU-mid. Link "hot_and".',
        },
      },
      {
        id: 'l2-speak-06-ex02',
        type: 'multiple-choice',
        question: 'Look outside! It ___ now.',
        options: ['rains', 'rain', 'is raining', 'rained'],
        correctIndex: 2,
        explanation: {
          vi: '"Look outside!" và "now" → đang xảy ra → hiện tại tiếp diễn: is raining.',
          en: '"Look outside!" and "now" → happening now → present continuous: is raining.',
        },
      },
      {
        id: 'l2-speak-06-ex03',
        type: 'speak-sentence',
        sentence: 'It rains a lot from May to October.',
        translationVi: 'Trời mưa nhiều từ tháng Năm đến tháng Mười.',
        explanation: {
          vi: '"rains" đọc /reɪnz/ và nối với "a lot": /reɪnzəlɒt/.',
          en: '"rains" is /reɪnz/ and links to "a lot": /reɪnzəlɒt/.',
        },
      },
      {
        id: 'l2-speak-06-ex04',
        type: 'fill-blank',
        sentence: 'In my city, it ___ very cold in January.',
        acceptedAnswers: ['gets'],
        hint: '(get)',
        explanation: {
          vi: 'Sự thật lặp lại hằng năm + chủ ngữ "it" → gets (đọc /ɡets/).',
          en: 'A fact every year + subject "it" → gets (said /ɡets/).',
        },
      },
      {
        id: 'l2-speak-06-ex05',
        type: 'speak-sentence',
        sentence: "My favourite season is autumn because it's cool and dry.",
        translationVi: 'Mùa tôi thích nhất là mùa thu vì trời mát và khô.',
        explanation: {
          vi: '"autumn" đọc /ˈɔːtəm/ — chữ "n" cuối câm.',
          en: '"autumn" is /ˈɔːtəm/ — the final "n" is silent.',
        },
      },
      {
        id: 'l2-speak-06-ex06',
        type: 'arrange-words',
        translationVi: 'Bạn nên mang ô vào mùa mưa.',
        correctSentence: 'You should bring an umbrella in the rainy season.',
        extraWords: ['to', 'a'],
        explanation: {
          vi: '"should" + động từ nguyên mẫu (không có "to"). "umbrella" bắt đầu bằng nguyên âm → "an".',
          en: '"should" + base verb (no "to"). "umbrella" starts with a vowel sound → "an".',
        },
      },
      {
        id: 'l2-speak-06-ex07',
        type: 'speak-sentence',
        sentence: 'The weather changes quickly, so I always check the forecast.',
        translationVi: 'Thời tiết thay đổi nhanh nên tôi luôn xem dự báo.',
        explanation: {
          vi: '"changes" có đuôi /ɪz/ — thêm 1 âm tiết: CHAN-ges.',
          en: '"changes" ends in /ɪz/ — one extra syllable: CHAN-ges.',
        },
      },
      {
        id: 'l2-speak-06-ex08',
        type: 'multiple-choice',
        question: 'Which sentence is correct for something that happens regularly?',
        options: [
          'It often rains in Hue in November.',
          'It is often raining in Hue in November.',
          'It often rain in Hue in November.',
          'It raining often in Hue in November.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Việc lặp lại thường xuyên → hiện tại đơn; chủ ngữ "It" → rains.',
          en: 'A regular event → present simple; subject "It" → rains.',
        },
      },
      {
        id: 'l2-speak-06-ex09',
        type: 'speak-sentence',
        sentence: "I don't like hot weather because I can't sleep well.",
        translationVi: 'Tôi không thích thời tiết nóng vì tôi không ngủ ngon được.',
        explanation: {
          vi: 'Đọc rõ "can\'t" /kɑːnt/ có âm /t/ cuối. "weather" có âm /ð/.',
          en: 'Say "can\'t" /kɑːnt/ with a final /t/. "weather" has the /ð/ sound.',
        },
      },
      {
        id: 'l2-speak-06-ex10',
        type: 'speak-answer',
        question: "What's the weather like in your hometown? Which season do you like best?",
        tipsVi:
          'Phần 1: miêu tả thời tiết bằng hiện tại đơn (It is usually... / It rains...). Phần 2: mùa bạn thích + lý do + ví dụ việc bạn làm vào mùa đó. Nhớ đọc rõ đuôi -s.',
        sampleAnswer:
          "In my hometown, Hanoi, the weather changes a lot. It's hot and humid in summer, but it gets quite cold in winter. My favourite season is autumn because it's cool and the sky is very blue. For example, I often go for a walk around the lake with my friends in October.",
        recordSeconds: 50,
        explanation: {
          vi: 'Câu trả lời tốt dùng hiện tại đơn đúng (changes, gets) và có lý do + ví dụ.',
          en: 'A good answer uses the present simple correctly (changes, gets) with a reason and an example.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-06-test01',
        type: 'multiple-choice',
        question: 'Which word ends with the /ɪz/ sound?',
        options: ['rains', 'gets', 'feels', 'changes'],
        correctIndex: 3,
        explanation: {
          vi: '"change" kết thúc bằng /dʒ/ nên -s đọc /ɪz/.',
          en: '"change" ends in /dʒ/, so the -s is /ɪz/.',
        },
      },
      {
        id: 'l2-speak-06-test02',
        type: 'fill-blank',
        sentence: 'Right now, the sun ___ shining.',
        acceptedAnswers: ['is'],
        hint: '(be)',
        explanation: {
          vi: '"Right now" → hiện tại tiếp diễn: is + V-ing.',
          en: '"Right now" → present continuous: is + -ing.',
        },
      },
      {
        id: 'l2-speak-06-test03',
        type: 'speak-sentence',
        sentence: "When it's hot, I usually stay inside and drink cold water.",
        translationVi: 'Khi trời nóng, tôi thường ở trong nhà và uống nước lạnh.',
        explanation: {
          vi: 'Nối "stay_inside" và "inside_and". "cold" đọc rõ âm /d/ cuối.',
          en: 'Link "stay_inside" and "inside_and". Pronounce the final /d/ in "cold".',
        },
      },
      {
        id: 'l2-speak-06-test04',
        type: 'arrange-words',
        translationVi: 'Gió đang thổi rất mạnh.',
        correctSentence: 'The wind is blowing very hard.',
        extraWords: ['blow', 'are'],
        explanation: {
          vi: 'Đang xảy ra → is + V-ing: is blowing. "The wind" số ít → is.',
          en: 'Happening now → is + -ing: is blowing. "The wind" is singular → is.',
        },
      },
      {
        id: 'l2-speak-06-test05',
        type: 'multiple-choice',
        question: 'Give advice for a very hot day: "You ___ drink a lot of water."',
        options: ["shouldn't", 'should', 'should to', 'shoulds'],
        correctIndex: 1,
        explanation: {
          vi: 'Lời khuyên: should + động từ nguyên mẫu. Uống nhiều nước là điều nên làm.',
          en: 'Advice: should + base verb. Drinking lots of water is a good idea.',
        },
      },
      {
        id: 'l2-speak-06-test06',
        type: 'speak-answer',
        question: 'Do you prefer hot weather or cold weather? Why?',
        tipsVi:
          'Chọn 1 (I prefer...), giải thích bằng because, so sánh (Cold weather is more comfortable than...), kể 1 việc bạn thường làm trong thời tiết đó.',
        sampleAnswer:
          "I prefer cold weather because it's more comfortable than hot weather. When it's cold, I can wear a jacket and drink hot chocolate. In hot weather I always feel tired, so I don't want to go out. But I know many people love the sun because they can go to the beach.",
        recordSeconds: 40,
        explanation: {
          vi: 'Nêu lựa chọn, lý do, so sánh hơn và nhắc tới ý ngược lại bằng "but".',
          en: 'Give your choice, a reason, a comparison, and the other side with "but".',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Học tập và công việc — can / can't, must / have to, should
  //        Phát âm: "can" đọc yếu /kən/, "can't" đọc mạnh /kɑːnt/
  // ==========================================================================
  {
    id: 'l2-speak-07',
    skill: 'speaking',
    title: { vi: 'Học tập và công việc', en: 'Studies and work' },
    description: {
      vi: 'Trả lời "Do you work or study?", nói về môn học/công việc với can, must, should.',
      en: 'Answer "Do you work or study?" and talk about your subjects or job with can, must and should.',
    },
    teachingCards: [
      {
        title: { vi: 'Bạn đi học hay đi làm?', en: 'Do you work or are you a student?' },
        body: {
          vi: 'Đây là câu hỏi đầu tiên của IELTS Speaking Part 1. Câu mẫu:\n- I\'m a student. I\'m in **grade 10** at ... High School. (học sinh)\n- I\'m a **university student**. I\'m studying **economics**. (sinh viên)\n- I work **as a** nurse / an accountant **at** ... (đi làm)\nSau đó nói thêm: bạn thích gì, vì sao (A + R + E).',
          en: 'This is the first question in IELTS Speaking Part 1. Useful sentences:\n- I\'m a student. I\'m in **grade 10** at ... High School.\n- I\'m a **university student**. I\'m studying **economics**.\n- I work **as a** nurse / an accountant **at** ...\nThen add more: what you like and why (A + R + E).',
        },
        examples: [
          { en: "I'm in grade 11 at a high school in Can Tho.", vi: 'Tôi học lớp 11 ở một trường cấp 3 tại Cần Thơ.' },
          { en: 'I work as an accountant at a small company.', vi: 'Tôi làm kế toán ở một công ty nhỏ.' },
        ],
      },
      {
        title: { vi: 'Can, must / have to, should', en: 'Can, must / have to, should' },
        body: {
          vi: '**can / can\'t** — khả năng hoặc được phép: I **can** use a computer well. We **can\'t** use phones in class.\n**must / have to** — bắt buộc, quy định: Students **must** wear a uniform. I **have to** get up at 6.\n**should / shouldn\'t** — lời khuyên: You **should** review your notes every day.\nTất cả đều theo sau bởi **động từ nguyên mẫu** (không "to", trừ "have to").',
          en: '**can / can\'t** — ability or permission: I **can** use a computer well. We **can\'t** use phones in class.\n**must / have to** — rules, things that are necessary: Students **must** wear a uniform. I **have to** get up at 6.\n**should / shouldn\'t** — advice: You **should** review your notes every day.\nAll are followed by the **base verb** (no "to", except "have to").',
        },
        examples: [
          { en: 'I have to work on Saturdays.', vi: 'Tôi phải làm việc vào thứ Bảy.' },
          { en: 'You should ask your teacher for help.', vi: 'Bạn nên nhờ thầy cô giúp đỡ.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: can và can\'t', en: 'Pronunciation tip: can and can\'t' },
        body: {
          vi: 'Người nghe phân biệt "can" và "can\'t" chủ yếu nhờ **trọng âm**, không chỉ nhờ âm /t/:\n- **can** (khẳng định) đọc **yếu, ngắn**: /kən/ — I /kən/ **SWIM**.\n- **can\'t** (phủ định) đọc **mạnh, dài**: /kɑːnt/ — I **CAN\'T** swim.\nNgười Việt hay bỏ /t/ cuối của "can\'t" → nghe thành "can", gây hiểu ngược nghĩa! Hãy nhấn mạnh và bật nhẹ /t/.',
          en: 'Listeners tell "can" and "can\'t" apart mainly by **stress**, not just the /t/:\n- **can** (positive) is **weak and short**: /kən/ — I /kən/ **SWIM**.\n- **can\'t** (negative) is **strong and long**: /kɑːnt/ — I **CAN\'T** swim.\nVietnamese speakers often drop the final /t/ of "can\'t", so it sounds like "can" — the opposite meaning! Stress it and release the /t/.',
        },
        examples: [
          { en: 'I can speak a little English.', vi: 'Tôi có thể nói một chút tiếng Anh.' },
          { en: "I can't draw very well.", vi: 'Tôi vẽ không giỏi lắm.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-07-ex01',
        type: 'speak-sentence',
        sentence: "I'm in grade 10 at a high school in Da Nang.",
        translationVi: 'Tôi học lớp 10 ở một trường cấp 3 tại Đà Nẵng.',
        explanation: {
          vi: 'Nối "grade_10" và "at_a": /ætə/. Nhấn TEN, HIGH SCHOOL, DA NANG.',
          en: 'Link "at_a": /ætə/. Stress TEN, HIGH SCHOOL, DA NANG.',
        },
      },
      {
        id: 'l2-speak-07-ex02',
        type: 'multiple-choice',
        question: 'In "I can speak English", how is "can" usually pronounced?',
        options: ['/kɑːnt/', '/kæn/, with strong stress', '/kɑːn/, long', '/kən/, weak and short'],
        correctIndex: 3,
        explanation: {
          vi: '"can" khẳng định thường đọc yếu /kən/; từ được nhấn là động từ chính "SPEAK".',
          en: 'Positive "can" is usually weak /kən/; the main verb "SPEAK" is stressed.',
        },
      },
      {
        id: 'l2-speak-07-ex03',
        type: 'speak-sentence',
        sentence: 'My favourite subject is maths because I like numbers.',
        translationVi: 'Môn tôi thích nhất là toán vì tôi thích các con số.',
        explanation: {
          vi: '"maths" kết thúc bằng /θs/ — đặt lưỡi giữa răng rồi bật /s/. "numbers" đuôi /z/.',
          en: '"maths" ends in /θs/ — tongue between teeth, then /s/. "numbers" ends in /z/.',
        },
      },
      {
        id: 'l2-speak-07-ex04',
        type: 'fill-blank',
        sentence: "Students ___ wear a uniform at my school. It's a rule.",
        acceptedAnswers: ['must', 'have to'],
        hint: '(bắt buộc)',
        explanation: {
          vi: 'Quy định của trường → must / have to.',
          en: 'A school rule → must / have to.',
        },
      },
      {
        id: 'l2-speak-07-ex05',
        type: 'speak-sentence',
        sentence: 'I work as a nurse, so I often work at night.',
        translationVi: 'Tôi làm y tá nên tôi thường làm việc ban đêm.',
        explanation: {
          vi: '"work as a" nối liền: /wɜːkəzə/. "nurse" /nɜːs/ — âm dài.',
          en: 'Link "work as a": /wɜːkəzə/. "nurse" is /nɜːs/ — a long vowel.',
        },
      },
      {
        id: 'l2-speak-07-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi không được dùng điện thoại trong lớp.',
        correctSentence: "I can't use my phone in class.",
        extraWords: ['to', 'uses'],
        explanation: {
          vi: '"can\'t" + động từ nguyên mẫu (không "to", không thêm -s).',
          en: '"can\'t" + base verb (no "to", no -s).',
        },
      },
      {
        id: 'l2-speak-07-ex07',
        type: 'speak-sentence',
        sentence: "I can't speak English very well, but I'm improving.",
        translationVi: 'Tôi chưa nói tiếng Anh giỏi lắm, nhưng tôi đang tiến bộ.',
        explanation: {
          vi: 'Nhấn mạnh "CAN\'T" và bật âm /t/. "improving" nhấn im-PRO-ving.',
          en: 'Stress "CAN\'T" and release the /t/. "improving" is stressed im-PRO-ving.',
        },
      },
      {
        id: 'l2-speak-07-ex08',
        type: 'multiple-choice',
        question: 'Which sentence gives advice?',
        options: [
          'You must wear a helmet.',
          'You should study a little every day.',
          'You can swim.',
          'You have to pay at the door.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"should" dùng để khuyên. "must / have to" là bắt buộc; "can" là khả năng.',
          en: '"should" gives advice. "must / have to" are rules; "can" is ability.',
        },
      },
      {
        id: 'l2-speak-07-ex09',
        type: 'speak-sentence',
        sentence: "I'm learning English because I want to study abroad.",
        translationVi: 'Tôi đang học tiếng Anh vì tôi muốn đi du học.',
        explanation: {
          vi: '"abroad" đọc /əˈbrɔːd/, nhấn âm 2: a-BROAD. Nối "study_abroad".',
          en: '"abroad" is /əˈbrɔːd/, stressed a-BROAD. Link "study_abroad".',
        },
      },
      {
        id: 'l2-speak-07-ex10',
        type: 'speak-answer',
        question: 'Do you work or are you a student? Do you enjoy it?',
        tipsVi:
          'Câu 1: nói bạn đi học hay đi làm (I\'m a student at... / I work as...). Câu 2–3: bạn thích gì/không thích gì, vì sao. Thử dùng "have to" hoặc "can". Ví dụ: I have to get up early, but I enjoy it because...',
        sampleAnswer:
          "I'm a student. I'm in grade 11 at a high school in Can Tho. Yes, I enjoy it, because my teachers are kind and I can learn many new things. But I have to study a lot, so I don't have much free time. My favourite subject is English because I want to travel in the future.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt giới thiệu rõ, có lý do, và dùng can / have to chính xác.',
          en: 'A good answer introduces clearly, gives reasons, and uses can / have to correctly.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-07-test01',
        type: 'multiple-choice',
        question: 'Which word is said strongly, with a clear final /t/?',
        options: [
          '"can\'t" in "I can\'t swim."',
          '"can" in "I can swim."',
          '"a" in "I\'m a student."',
          '"the" in "I go to the library."',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"can\'t" luôn được nhấn mạnh /kɑːnt/; các từ còn lại đọc yếu.',
          en: '"can\'t" is always stressed /kɑːnt/; the other words are weak.',
        },
      },
      {
        id: 'l2-speak-07-test02',
        type: 'fill-blank',
        sentence: 'I ___ finish my homework before I go out. My mum says so.',
        acceptedAnswers: ['have to', 'must'],
        hint: '(bắt buộc)',
        explanation: {
          vi: 'Việc bắt buộc (mẹ yêu cầu) → have to / must.',
          en: 'Something necessary (Mum says so) → have to / must.',
        },
      },
      {
        id: 'l2-speak-07-test03',
        type: 'speak-sentence',
        sentence: "I can cook simple dishes, but I can't bake cakes.",
        translationVi: 'Tôi nấu được món đơn giản, nhưng tôi không biết nướng bánh.',
        explanation: {
          vi: '"can" đọc yếu /kən/, "can\'t" đọc mạnh /kɑːnt/ — nghe khác hẳn nhau.',
          en: '"can" is weak /kən/; "can\'t" is strong /kɑːnt/ — they sound very different.',
        },
      },
      {
        id: 'l2-speak-07-test04',
        type: 'arrange-words',
        translationVi: 'Tôi muốn trở thành giáo viên.',
        correctSentence: 'I want to become a teacher.',
        extraWords: ['an', 'becomes'],
        explanation: {
          vi: 'want to + động từ nguyên mẫu: want to become. "teacher" bắt đầu bằng phụ âm → "a".',
          en: 'want to + base verb: want to become. "teacher" starts with a consonant → "a".',
        },
      },
      {
        id: 'l2-speak-07-test05',
        type: 'multiple-choice',
        question: 'Examiner: "What do you like about your studies?" Which answer is the best?',
        options: [
          'Teacher.',
          'I like.',
          "I like my classmates because they are friendly. For example, they help me when I don't understand the lesson.",
          'Study is good.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Đáp án này có đủ trả lời + lý do + ví dụ.',
          en: 'This answer has an answer + reason + example.',
        },
      },
      {
        id: 'l2-speak-07-test06',
        type: 'speak-answer',
        question: 'What do you want to learn or do in the future? Why?',
        tipsVi:
          'Nói điều bạn muốn học / nghề bạn muốn làm (I want to learn... / I want to become...), vì sao (because...), và bạn phải làm gì để đạt được (I have to... / I should...).',
        sampleAnswer:
          "I want to become a doctor in the future, because I want to help sick people. My aunt is a doctor, and she is my role model. To do this, I have to study biology and chemistry very hard. I should also improve my English, so I can read medical books.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt có mục tiêu rõ, lý do, và dùng have to / should để nói kế hoạch.',
          en: 'A good answer has a clear goal, a reason, and uses have to / should for the plan.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Mua sắm — quá khứ đơn (bất quy tắc) để kể lần mua sắm gần đây
  //        Phát âm: ôn đuôi -ed, đặc biệt /ɪd/ và lỗi đọc thừa âm tiết
  // ==========================================================================
  {
    id: 'l2-speak-08',
    skill: 'speaking',
    title: { vi: 'Mua sắm', en: 'Shopping' },
    description: {
      vi: 'Nói về thói quen mua sắm và kể lại lần mua gần đây bằng quá khứ đơn.',
      en: 'Talk about your shopping habits and describe a recent purchase with the past simple.',
    },
    teachingCards: [
      {
        title: { vi: 'Câu hỏi về mua sắm', en: 'Shopping questions' },
        body: {
          vi: 'Câu hỏi thường gặp: **Do you like shopping?** / **Where do you usually shop?** / **Do you prefer shopping online or in shops?**\nTừ hữu ích: **shopping centre / mall** (trung tâm thương mại), **market** (chợ), **online** (trên mạng), **on sale** (giảm giá), **expensive / cheap**, **try on** (mặc thử).\nNhớ dùng **prefer ... because ...** và một câu so sánh hơn.',
          en: 'Common questions: **Do you like shopping?** / **Where do you usually shop?** / **Do you prefer shopping online or in shops?**\nUseful words: **shopping centre / mall**, **market**, **online**, **on sale**, **expensive / cheap**, **try on**.\nRemember to use **prefer ... because ...** and a comparative sentence.',
        },
        examples: [
          { en: 'I prefer markets because they are cheaper.', vi: 'Tôi thích chợ hơn vì rẻ hơn.' },
          { en: 'I like to try on clothes before I buy them.', vi: 'Tôi thích mặc thử quần áo trước khi mua.' },
        ],
      },
      {
        title: { vi: 'Quá khứ đơn bất quy tắc khi mua sắm', en: 'Irregular past verbs for shopping' },
        body: {
          vi: 'Các động từ hay dùng khi kể chuyện mua sắm:\n**buy → bought** (mua), **spend → spent** (tiêu), **pay → paid** (trả tiền), **find → found** (tìm thấy), **go → went**, **choose → chose** (chọn), **sell → sold** (bán)\nPhủ định / câu hỏi: **didn\'t + nguyên mẫu**: I **didn\'t buy** anything. **Did** you **buy** it online?',
          en: 'Common verbs for shopping stories:\n**buy → bought**, **spend → spent**, **pay → paid**, **find → found**, **go → went**, **choose → chose**, **sell → sold**\nNegatives / questions: **didn\'t + base verb**: I **didn\'t buy** anything. **Did** you **buy** it online?',
        },
        examples: [
          { en: 'I bought a T-shirt and paid by card.', vi: 'Tôi mua một chiếc áo phông và trả bằng thẻ.' },
          { en: 'I spent too much money last month.', vi: 'Tháng trước tôi tiêu quá nhiều tiền.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đừng thêm âm tiết thừa với -ed', en: 'Pronunciation tip: no extra syllable with -ed' },
        body: {
          vi: 'Chỉ khi động từ kết thúc bằng âm **/t/ hoặc /d/** thì -ed mới thành âm tiết riêng /ɪd/:\n- want**ed** /ˈwɒntɪd/, need**ed** /ˈniːdɪd/, decid**ed** /dɪˈsaɪdɪd/ → 1 âm tiết thêm\nCòn lại -ed **KHÔNG** thêm âm tiết:\n- shopp**ed** /ʃɒpt/ (1 âm tiết, không phải "shop-péd")\n- look**ed** /lʊkt/, carri**ed** /ˈkærid/\nMẹo: đọc chậm động từ gốc, rồi chỉ thêm âm /t/ hoặc /d/ thật nhẹ.',
          en: 'Only when a verb ends in **/t/ or /d/** does -ed become an extra syllable /ɪd/:\n- want**ed** /ˈwɒntɪd/, need**ed** /ˈniːdɪd/, decid**ed** /dɪˈsaɪdɪd/ → one extra syllable\nOtherwise -ed does **NOT** add a syllable:\n- shopp**ed** /ʃɒpt/ (one syllable, not "shop-ped")\n- look**ed** /lʊkt/, carri**ed** /ˈkærid/\nTip: say the base verb slowly, then add a light /t/ or /d/.',
        },
        examples: [
          { en: 'I needed new shoes, so I shopped online.', vi: 'Tôi cần giày mới nên tôi mua trên mạng.' },
          { en: 'We looked around and decided to buy it.', vi: 'Chúng tôi xem quanh rồi quyết định mua nó.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-08-ex01',
        type: 'speak-sentence',
        sentence: "I usually shop online because it's quick and easy.",
        translationVi: 'Tôi thường mua sắm trên mạng vì nhanh và dễ.',
        explanation: {
          vi: 'Nối "shop_online" → /ʃɒpɒnlaɪn/. "online" nhấn on-LINE.',
          en: 'Link "shop_online" → /ʃɒpɒnlaɪn/. "online" is stressed on-LINE.',
        },
      },
      {
        id: 'l2-speak-08-ex02',
        type: 'multiple-choice',
        question: 'How many syllables does "shopped" have?',
        options: ['One: /ʃɒpt/', 'Two: /ˈʃɒp.ɪd/', 'Three', 'It has no vowel sound.'],
        correctIndex: 0,
        explanation: {
          vi: '"shop" kết thúc bằng /p/ nên -ed đọc /t/, không thêm âm tiết: /ʃɒpt/.',
          en: '"shop" ends in /p/, so -ed is /t/ with no extra syllable: /ʃɒpt/.',
        },
      },
      {
        id: 'l2-speak-08-ex03',
        type: 'speak-sentence',
        sentence: 'Last month, I bought a new pair of shoes.',
        translationVi: 'Tháng trước tôi mua một đôi giày mới.',
        explanation: {
          vi: '"bought" đọc /bɔːt/ — chữ "gh" câm. Nối "bought_a" và "pair_of".',
          en: '"bought" is /bɔːt/ — the "gh" is silent. Link "bought_a" and "pair_of".',
        },
      },
      {
        id: 'l2-speak-08-ex04',
        type: 'fill-blank',
        sentence: 'I ___ too much money at the shopping centre yesterday.',
        acceptedAnswers: ['spent'],
        hint: '(spend)',
        explanation: {
          vi: '"spend" là bất quy tắc: spend → spent.',
          en: '"spend" is irregular: spend → spent.',
        },
      },
      {
        id: 'l2-speak-08-ex05',
        type: 'speak-sentence',
        sentence: 'I wanted a blue shirt, but the shop only had white ones.',
        translationVi: 'Tôi muốn một chiếc áo sơ mi xanh, nhưng cửa hàng chỉ có áo trắng.',
        explanation: {
          vi: '"wanted" có đuôi /ɪd/: WAN-ted. "ones" đọc /wʌnz/.',
          en: '"wanted" ends in /ɪd/: WAN-ted. "ones" is /wʌnz/.',
        },
      },
      {
        id: 'l2-speak-08-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi đã không mua gì cả.',
        correctSentence: "I didn't buy anything.",
        extraWords: ['bought', 'nothing'],
        explanation: {
          vi: 'Sau "didn\'t" dùng động từ nguyên mẫu "buy". Câu phủ định dùng "anything".',
          en: 'After "didn\'t" use the base verb "buy". Negative sentences use "anything".',
        },
      },
      {
        id: 'l2-speak-08-ex07',
        type: 'speak-sentence',
        sentence: 'Markets are cheaper than shopping malls, so I often go there.',
        translationVi: 'Chợ rẻ hơn trung tâm thương mại nên tôi hay đến đó.',
        explanation: {
          vi: '"than" đọc nhẹ /ðən/. "malls" đuôi /z/: /mɔːlz/.',
          en: 'Say "than" weakly /ðən/. "malls" ends in /z/: /mɔːlz/.',
        },
      },
      {
        id: 'l2-speak-08-ex08',
        type: 'multiple-choice',
        question: 'Which word ends with the /ɪd/ sound?',
        options: ['bought', 'paid', 'needed', 'shopped'],
        correctIndex: 2,
        explanation: {
          vi: '"need" kết thúc bằng /d/ nên -ed đọc /ɪd/: /ˈniːdɪd/.',
          en: '"need" ends in /d/, so -ed is /ɪd/: /ˈniːdɪd/.',
        },
      },
      {
        id: 'l2-speak-08-ex09',
        type: 'speak-sentence',
        sentence: 'I decided to buy it because it was on sale.',
        translationVi: 'Tôi quyết định mua nó vì nó đang giảm giá.',
        explanation: {
          vi: '"decided" có đuôi /ɪd/: de-CI-ded. Nối "on_sale" nhẹ nhàng.',
          en: '"decided" ends in /ɪd/: de-CI-ded. "on sale" = cheaper than usual.',
        },
      },
      {
        id: 'l2-speak-08-ex10',
        type: 'speak-answer',
        question: 'Do you like shopping? What did you buy recently?',
        tipsVi:
          'Phần 1: thích hay không + lý do (hiện tại đơn). Phần 2: kể lần mua gần đây bằng quá khứ đơn: I bought..., I went to..., I paid..., It was... Đọc đúng đuôi -ed, không thêm âm tiết thừa.',
        sampleAnswer:
          "Yes, I quite like shopping, but I don't go very often because I'm busy. Last week, I needed a new bag for school, so I went to a shopping centre near my house. I looked at many bags and finally bought a black one. It was on sale, so I only paid two hundred thousand dong.",
        recordSeconds: 50,
        explanation: {
          vi: 'Câu trả lời tốt dùng hiện tại đơn cho thói quen và quá khứ đơn (needed, went, looked, bought) cho câu chuyện.',
          en: 'A good answer uses the present simple for habits and the past simple (needed, went, looked, bought) for the story.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-08-test01',
        type: 'multiple-choice',
        question: 'Your friend has a lovely new bag. You ask: "Where ___ you buy that bag?"',
        options: ['do', 'did', 'does', 'are'],
        correctIndex: 1,
        explanation: {
          vi: 'Việc mua đã xảy ra trong quá khứ → câu hỏi dùng "did".',
          en: 'The buying happened in the past → the question uses "did".',
        },
      },
      {
        id: 'l2-speak-08-test02',
        type: 'fill-blank',
        sentence: 'I ___ a nice jacket in a small shop last week.',
        acceptedAnswers: ['found'],
        hint: '(find)',
        explanation: {
          vi: '"find" là bất quy tắc: find → found.',
          en: '"find" is irregular: find → found.',
        },
      },
      {
        id: 'l2-speak-08-test03',
        type: 'speak-sentence',
        sentence: 'We paid by card and carried the bags home.',
        translationVi: 'Chúng tôi trả bằng thẻ và xách túi đồ về nhà.',
        explanation: {
          vi: '"paid" /peɪd/, "carried" /ˈkærid/ — chỉ 2 âm tiết, không đọc "carri-ed". "bags" đuôi /z/.',
          en: '"paid" /peɪd/, "carried" /ˈkærid/ — only 2 syllables. "bags" ends in /z/.',
        },
      },
      {
        id: 'l2-speak-08-test04',
        type: 'arrange-words',
        translationVi: 'Bạn có thích mua sắm trực tuyến không?',
        correctSentence: 'Do you like shopping online?',
        extraWords: ['Does', 'shop'],
        explanation: {
          vi: '"you" đi với "Do". Sau "like" dùng V-ing: like shopping.',
          en: '"you" goes with "Do". After "like" use -ing: like shopping.',
        },
      },
      {
        id: 'l2-speak-08-test05',
        type: 'multiple-choice',
        question: 'Examiner: "Do you prefer shopping online or in shops?" Which answer is the best?',
        options: [
          'Online.',
          'Shops shops.',
          'I online.',
          "I prefer shopping in shops because I can try clothes on. But I also buy books online because it's cheaper.",
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Đáp án này có lựa chọn + lý do + ý bổ sung (But I also...).',
          en: 'This answer gives a choice + reason + extra idea (But I also...).',
        },
      },
      {
        id: 'l2-speak-08-test06',
        type: 'speak-answer',
        question: 'Tell me about the last time you went shopping. What did you buy?',
        tipsVi:
          'Kể theo thứ tự: khi nào (Last Saturday...), đi đâu, với ai, mua gì, giá bao nhiêu, bạn cảm thấy thế nào (I was happy because...). Dùng First, Then, Finally.',
        sampleAnswer:
          "The last time I went shopping was last Saturday. I went to Ben Thanh Market with my mum. First, we looked for some fruit, and then I chose a new T-shirt. It was quite cheap, only one hundred thousand dong. I was really happy because I wanted that colour for a long time.",
        recordSeconds: 50,
        explanation: {
          vi: 'Câu chuyện tốt dùng quá khứ đơn nhất quán và có từ nối thứ tự (First, then).',
          en: 'A good story uses the past simple consistently with sequence words (First, then).',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Kỳ nghỉ — quá khứ đơn (kỳ nghỉ đã qua) + be going to (kế hoạch)
  //        Phát âm: "going to" đọc nhanh /ˈɡəʊɪŋ tə/
  // ==========================================================================
  {
    id: 'l2-speak-09',
    skill: 'speaking',
    title: { vi: 'Kỳ nghỉ và du lịch', en: 'Holidays and travel' },
    description: {
      vi: 'Kể về kỳ nghỉ đã qua bằng quá khứ đơn và nói kế hoạch bằng "be going to".',
      en: 'Describe a past holiday with the past simple and talk about plans with "be going to".',
    },
    teachingCards: [
      {
        title: { vi: 'Kể về kỳ nghỉ đã qua', en: 'Talking about a past holiday' },
        body: {
          vi: 'Dùng **quá khứ đơn** và trả lời các ý: đi đâu, khi nào, với ai, làm gì, cảm thấy thế nào.\n- Last summer, I **went** to ... with ...\n- We **stayed** in a hotel / at my uncle\'s house.\n- We **visited** ..., **ate** ..., **took** lots of photos.\n- It **was** amazing / relaxing / tiring.',
          en: 'Use the **past simple** and cover: where, when, who with, what you did, how you felt.\n- Last summer, I **went** to ... with ...\n- We **stayed** in a hotel / at my uncle\'s house.\n- We **visited** ..., **ate** ..., **took** lots of photos.\n- It **was** amazing / relaxing / tiring.',
        },
        examples: [
          { en: 'Last Tet, we went to Da Lat by coach.', vi: 'Tết vừa rồi chúng tôi đi Đà Lạt bằng xe khách.' },
          { en: 'It was cold, but the flowers were beautiful.', vi: 'Trời lạnh nhưng hoa rất đẹp.' },
        ],
      },
      {
        title: { vi: 'Be going to — nói về kế hoạch', en: 'Be going to — talking about plans' },
        body: {
          vi: 'Dùng **am / is / are + going to + động từ nguyên mẫu** cho kế hoạch đã định sẵn:\n- I**\'m going to** visit my grandparents.\n- We **aren\'t going to** travel this year.\n- **Are** you **going to** go abroad?\nDấu hiệu: next week, next summer, this weekend, in July...',
          en: 'Use **am / is / are + going to + base verb** for plans you have already decided:\n- I**\'m going to** visit my grandparents.\n- We **aren\'t going to** travel this year.\n- **Are** you **going to** go abroad?\nSignals: next week, next summer, this weekend, in July...',
        },
        examples: [
          { en: "I'm going to learn to swim this summer.", vi: 'Hè này tôi định học bơi.' },
          { en: 'My parents are going to take us to Phu Quoc.', vi: 'Bố mẹ sẽ đưa chúng tôi đi Phú Quốc.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: "going to" đọc nhanh', en: 'Pronunciation tip: fast "going to"' },
        body: {
          vi: 'Trong văn nói, **"to" trong "going to" đọc yếu là /tə/**: /ˈɡəʊɪŋ tə/.\nTừ được **nhấn** là **động từ chính** và **địa điểm**: I\'m going to **VI**sit **HOI AN**.\nĐừng đọc từng chữ rời rạc "go-ing… to…". Hãy nói liền một hơi.\n(Người bản xứ còn nói "gonna" trong giao tiếp thân mật, nhưng trong IELTS nên dùng "going to" rõ ràng.)',
          en: 'In speech, **"to" in "going to" is weak: /tə/** → /ˈɡəʊɪŋ tə/.\nThe **stressed** words are the **main verb** and the **place**: I\'m going to **VI**sit **HOI AN**.\nDon\'t separate each word "go-ing… to…". Say it in one breath.\n(Native speakers say "gonna" informally, but in IELTS say "going to" clearly.)',
        },
        examples: [
          { en: "We're going to stay by the sea.", vi: 'Chúng tôi sẽ ở gần biển.' },
          { en: "She's going to fly to Singapore.", vi: 'Cô ấy sẽ bay sang Singapore.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-09-ex01',
        type: 'speak-sentence',
        sentence: 'Last summer, my family went to Nha Trang for four days.',
        translationVi: 'Hè năm ngoái, gia đình tôi đi Nha Trang bốn ngày.',
        explanation: {
          vi: '"went" là quá khứ của "go". Đọc rõ âm /t/ cuối của "went" và "Last".',
          en: '"went" is the past of "go". Pronounce the final /t/ in "went" and "Last".',
        },
      },
      {
        id: 'l2-speak-09-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct plan: "Next week, I ___ visit my aunt in Can Tho."',
        options: ['going to', 'am going to', 'am go to', 'will going to'],
        correctIndex: 1,
        explanation: {
          vi: 'Cấu trúc đủ: am/is/are + going to + động từ nguyên mẫu.',
          en: 'Full structure: am/is/are + going to + base verb.',
        },
      },
      {
        id: 'l2-speak-09-ex03',
        type: 'speak-sentence',
        sentence: 'We stayed in a small hotel near the beach.',
        translationVi: 'Chúng tôi ở một khách sạn nhỏ gần bãi biển.',
        explanation: {
          vi: '"stayed" đuôi /d/ và nối với "in_a": /steɪdɪnə/. "hotel" nhấn ho-TEL.',
          en: '"stayed" ends in /d/ and links to "in_a": /steɪdɪnə/. "hotel" is stressed ho-TEL.',
        },
      },
      {
        id: 'l2-speak-09-ex04',
        type: 'fill-blank',
        sentence: 'We ___ going to travel to Da Lat next month.',
        acceptedAnswers: ['are'],
        hint: '(be)',
        explanation: {
          vi: '"We" đi với "are": We are going to...',
          en: '"We" goes with "are": We are going to...',
        },
      },
      {
        id: 'l2-speak-09-ex05',
        type: 'speak-sentence',
        sentence: "I'm going to visit Ha Long Bay this summer.",
        translationVi: 'Hè này tôi sẽ đi thăm vịnh Hạ Long.',
        explanation: {
          vi: 'Đọc "going to" nhanh /ˈɡəʊɪŋ tə/. Nhấn VISIT và HA LONG BAY.',
          en: 'Say "going to" quickly /ˈɡəʊɪŋ tə/. Stress VISIT and HA LONG BAY.',
        },
      },
      {
        id: 'l2-speak-09-ex06',
        type: 'arrange-words',
        translationVi: 'Họ sẽ không đi du lịch nước ngoài.',
        correctSentence: 'They are not going to travel abroad.',
        extraWords: ['goes', 'will'],
        explanation: {
          vi: 'Phủ định: are + not + going to + động từ nguyên mẫu.',
          en: 'Negative: are + not + going to + base verb.',
        },
      },
      {
        id: 'l2-speak-09-ex07',
        type: 'speak-sentence',
        sentence: 'It was the best holiday of my life because everything was new.',
        translationVi: 'Đó là kỳ nghỉ tuyệt nhất đời tôi vì mọi thứ đều mới mẻ.',
        explanation: {
          vi: '"the best" là so sánh nhất của "good". Nối "holiday_of" liền mạch.',
          en: '"the best" is the superlative of "good". Link "holiday_of" smoothly.',
        },
      },
      {
        id: 'l2-speak-09-ex08',
        type: 'multiple-choice',
        question: 'How is "to" in "I\'m going to swim" usually pronounced?',
        options: ['/tuː/, strong and long', '/tu/, with stress', 'It is silent.', '/tə/, weak and quick'],
        correctIndex: 3,
        explanation: {
          vi: '"to" là từ chức năng nên đọc yếu /tə/.',
          en: '"to" is a function word, so it is weak: /tə/.',
        },
      },
      {
        id: 'l2-speak-09-ex09',
        type: 'speak-sentence',
        sentence: 'Are you going to travel during the summer holiday?',
        translationVi: 'Bạn có định đi du lịch trong kỳ nghỉ hè không?',
        explanation: {
          vi: 'Câu hỏi Yes/No lên giọng ở cuối. "travel" nhấn TRA-vel.',
          en: 'Yes/No questions rise at the end. "travel" is stressed TRA-vel.',
        },
      },
      {
        id: 'l2-speak-09-ex10',
        type: 'speak-answer',
        question: 'Where did you go on your last holiday? What did you do there?',
        tipsVi:
          'Dùng quá khứ đơn: Last summer / Last Tet, I went to... with... We stayed..., We visited..., We ate... Kết thúc bằng cảm nhận (It was... because...). Có thể thêm 1 câu kế hoạch: Next year, I\'m going to...',
        sampleAnswer:
          "On my last holiday, I went to Hoi An with my family. We stayed in a small hotel near the old town. We walked around the old streets, ate cao lau and took lots of photos of the lanterns at night. It was very relaxing. Next year, I'm going to visit Hue because it's very close to Hoi An.",
        recordSeconds: 55,
        explanation: {
          vi: 'Câu trả lời tốt kể bằng quá khứ đơn và kết thúc với kế hoạch dùng "going to".',
          en: 'A good answer tells the story in the past simple and ends with a plan using "going to".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-09-test01',
        type: 'multiple-choice',
        question: 'Which sentence talks about a plan for the future?',
        options: [
          "I'm going to stay with my grandparents in July.",
          'I stayed with my grandparents in July.',
          'I often stay with my grandparents.',
          'I was with my grandparents.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"be going to" diễn tả kế hoạch tương lai. Các câu còn lại là quá khứ hoặc thói quen.',
          en: '"be going to" shows a future plan. The others are past or habits.',
        },
      },
      {
        id: 'l2-speak-09-test02',
        type: 'fill-blank',
        sentence: 'Last year we ___ a lot of photos in Hoi An.',
        acceptedAnswers: ['took'],
        hint: '(take)',
        explanation: {
          vi: '"take" là bất quy tắc: take → took. "take photos" = chụp ảnh.',
          en: '"take" is irregular: take → took. "take photos" = make pictures with a camera.',
        },
      },
      {
        id: 'l2-speak-09-test03',
        type: 'speak-sentence',
        sentence: "Next Tet, we're going to visit our relatives in the countryside.",
        translationVi: 'Tết tới, chúng tôi sẽ về thăm họ hàng ở quê.',
        explanation: {
          vi: '"relatives" nhấn RE-la-tives, đuôi /z/. "countryside" nhấn COUN-try-side.',
          en: '"relatives" is stressed RE-la-tives and ends in /z/. "countryside" is stressed COUN-try-side.',
        },
      },
      {
        id: 'l2-speak-09-test04',
        type: 'arrange-words',
        translationVi: 'Bạn định đi nghỉ ở đâu?',
        correctSentence: 'Where are you going to go on holiday?',
        extraWords: ['is', 'went'],
        explanation: {
          vi: 'Câu hỏi: Wh- + are + you + going to + động từ nguyên mẫu. "go on holiday" = đi nghỉ.',
          en: 'Question: Wh- + are + you + going to + base verb. "go on holiday" = take a holiday.',
        },
      },
      {
        id: 'l2-speak-09-test05',
        type: 'multiple-choice',
        question: 'Examiner: "Do you like travelling?" Which answer is the best?',
        options: [
          'Travel.',
          'Yes.',
          'Yes, I really do, because I can see new places. For example, last year I went to Sa Pa and saw beautiful rice terraces.',
          'I travelling.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Đáp án này có trả lời + lý do + ví dụ dùng quá khứ đơn (went, saw).',
          en: 'This answer has an answer + reason + example in the past simple (went, saw).',
        },
      },
      {
        id: 'l2-speak-09-test06',
        type: 'speak-answer',
        question: 'What are you going to do on your next holiday?',
        tipsVi:
          'Dùng "be going to": I\'m going to go to... with... We are going to stay... / visit... / try... Nói vì sao bạn chọn nơi đó (because...). Đọc "going to" nhanh và nhẹ.',
        sampleAnswer:
          "On my next holiday, I'm going to visit Phu Quoc Island with my parents. We're going to stay there for five days. I'm going to swim in the sea every morning and try the famous seafood. I chose Phu Quoc because the beaches are clean and the water is very blue.",
        recordSeconds: 45,
        explanation: {
          vi: 'Dùng "going to" cho mọi kế hoạch và thêm lý do cho lựa chọn của bạn.',
          en: 'Use "going to" for all the plans and give a reason for your choice.',
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Làm quen IELTS Speaking Part 2 — thẻ đề bài (cue card)
  //         Miêu tả 1 người / 1 nơi trong 1 phút theo cấu trúc đơn giản
  // ==========================================================================
  {
    id: 'l2-speak-10',
    skill: 'speaking',
    title: { vi: 'Làm quen Part 2: miêu tả người và nơi chốn', en: 'Intro to Part 2: describe a person or a place' },
    description: {
      vi: 'Hiểu thẻ đề bài Part 2 và nói 1 phút về một người hoặc một nơi theo cấu trúc đơn giản.',
      en: 'Understand the Part 2 cue card and speak for 1 minute about a person or place using a simple structure.',
    },
    teachingCards: [
      {
        title: { vi: 'IELTS Speaking Part 2 là gì?', en: 'What is IELTS Speaking Part 2?' },
        body: {
          vi: 'Giám khảo đưa bạn một **thẻ đề bài (cue card)** với 1 chủ đề và 3–4 gợi ý (You should say: ...).\nBạn có **1 phút chuẩn bị** — được ghi chú vài **từ khóa** (không viết cả câu).\nSau đó bạn nói **1–2 phút** liên tục. Ở band 2.0–3.0, mục tiêu là nói được **khoảng 1 phút** không dừng lại lâu.\nHãy trả lời **lần lượt từng gợi ý** trên thẻ — đó chính là dàn ý của bạn!',
          en: 'The examiner gives you a **cue card** with a topic and 3–4 prompts (You should say: ...).\nYou have **1 minute to prepare** — you can write a few **keywords** (not full sentences).\nThen you speak for **1–2 minutes** without stopping. At band 2.0–3.0, aim to speak for **about 1 minute** without long pauses.\nAnswer **each prompt on the card in order** — it is your plan!',
        },
        examples: [
          { en: 'Describe a person you admire.', vi: 'Miêu tả một người bạn ngưỡng mộ.' },
          { en: 'You should say: who this person is, how you know him or her...', vi: 'Bạn nên nói: người đó là ai, bạn quen họ thế nào...' },
        ],
      },
      {
        title: { vi: 'Cấu trúc 4 bước đơn giản', en: 'A simple 4-step structure' },
        body: {
          vi: '**1. Mở đầu:** I\'d like to talk about ... (Tôi muốn nói về ...)\n**2. Ai / Cái gì / Ở đâu:** He/She is ... / It is in ...\n**3. Chi tiết (2–3 ý):** dùng **First, ... Also, ... Another thing is ...**\n**4. Cảm nhận + lý do:** I admire him **because** ... / I love this place **because** ... → **That\'s why** ...\nNếu kể chuyện đã qua (I met her when...) → dùng **quá khứ đơn**.',
          en: '**1. Opening:** I\'d like to talk about ...\n**2. Who / What / Where:** He/She is ... / It is in ...\n**3. Details (2–3 points):** use **First, ... Also, ... Another thing is ...**\n**4. Feelings + reason:** I admire him **because** ... / I love this place **because** ... → **That\'s why** ...\nFor past events (I met her when...) → use the **past simple**.',
        },
        examples: [
          { en: "I'd like to talk about my English teacher, Ms Hoa.", vi: 'Tôi muốn nói về cô giáo tiếng Anh của tôi, cô Hoa.' },
          { en: "Another thing is that she's very patient.", vi: 'Một điều nữa là cô ấy rất kiên nhẫn.' },
          { en: "That's why I admire her so much.", vi: 'Đó là lý do tôi rất ngưỡng mộ cô.' },
        ],
      },
      {
        title: { vi: 'Mẹo nói trôi chảy: ngắt nghỉ và từ đệm', en: 'Fluency tip: pausing and fillers' },
        body: {
          vi: '- **Ngắt nghỉ ở dấu phẩy và cuối câu**, không ngắt giữa cụm từ (my / best friend ✗).\n- **Nhấn từ khóa** quan trọng: I **ADMIRE** her because she\'s very **KIND**.\n- Khi quên ý, dùng **từ đệm** thay vì im lặng: **Well, ...** / **Let me think...** / **Oh yes, ...**\n- Đừng sợ sai — giám khảo chấm sự trôi chảy, nên hãy **tiếp tục nói**.',
          en: '- **Pause at commas and at the end of sentences**, not inside a phrase (my / best friend ✗).\n- **Stress key words**: I **ADMIRE** her because she\'s very **KIND**.\n- If you forget an idea, use **fillers** instead of silence: **Well, ...** / **Let me think...** / **Oh yes, ...**\n- Don\'t be afraid of mistakes — the examiner scores fluency, so **keep talking**.',
        },
        examples: [
          { en: 'Well, let me think... Oh yes, she also loves cooking.', vi: 'À, để tôi nghĩ xem... À đúng rồi, cô ấy cũng thích nấu ăn.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-speak-10-ex01',
        type: 'speak-sentence',
        sentence: "I'd like to talk about my best friend, Nam.",
        translationVi: 'Tôi muốn nói về bạn thân nhất của tôi, Nam.',
        explanation: {
          vi: '"I\'d like" đọc /aɪd laɪk/ — có âm /d/ nhẹ. Nhấn TALK và BEST FRIEND.',
          en: '"I\'d like" is /aɪd laɪk/ — with a light /d/. Stress TALK and BEST FRIEND.',
        },
      },
      {
        id: 'l2-speak-10-ex02',
        type: 'multiple-choice',
        question: 'In IELTS Speaking Part 2, how long do you have to prepare?',
        options: ['10 seconds', '5 minutes', '1 minute', 'No time at all'],
        correctIndex: 2,
        explanation: {
          vi: 'Bạn có 1 phút chuẩn bị và được ghi chú từ khóa.',
          en: 'You have 1 minute to prepare and can write keywords.',
        },
      },
      {
        id: 'l2-speak-10-ex03',
        type: 'speak-sentence',
        sentence: 'He is tall and friendly, and he always makes me laugh.',
        translationVi: 'Cậu ấy cao, thân thiện và luôn làm tôi cười.',
        explanation: {
          vi: '"laugh" đọc /lɑːf/ — "gh" đọc như /f/. "makes" đuôi /s/.',
          en: '"laugh" is /lɑːf/ — "gh" sounds like /f/. "makes" ends in /s/.',
        },
      },
      {
        id: 'l2-speak-10-ex04',
        type: 'fill-blank',
        sentence: '___ like to talk about a beautiful park in my city.',
        acceptedAnswers: ["I'd", 'I would'],
        hint: '(Tôi muốn — viết tắt)',
        explanation: {
          vi: 'Câu mở đầu Part 2: I\'d like to talk about... (I\'d = I would).',
          en: 'Part 2 opening: I\'d like to talk about... (I\'d = I would).',
        },
      },
      {
        id: 'l2-speak-10-ex05',
        type: 'speak-sentence',
        sentence: 'First, the park is very green and peaceful.',
        translationVi: 'Đầu tiên, công viên rất xanh và yên bình.',
        explanation: {
          vi: '"First" mở ý chi tiết đầu tiên. Ngắt nhẹ sau dấu phẩy.',
          en: '"First" starts your first detail. Pause briefly after the comma.',
        },
      },
      {
        id: 'l2-speak-10-ex06',
        type: 'arrange-words',
        translationVi: 'Đó là lý do tôi rất thích nơi này.',
        correctSentence: "That's why I love this place so much.",
        extraWords: ['because', 'these'],
        explanation: {
          vi: '"That\'s why..." = Đó là lý do... — câu kết rất hữu ích cho Part 2.',
          en: '"That\'s why..." is a very useful closing sentence for Part 2.',
        },
      },
      {
        id: 'l2-speak-10-ex07',
        type: 'speak-sentence',
        sentence: 'Another thing I like is the delicious street food there.',
        translationVi: 'Một điều khác tôi thích là đồ ăn đường phố ngon ở đó.',
        explanation: {
          vi: '"Another thing..." để thêm ý mới. Nối "thing_I" và "like_is".',
          en: '"Another thing..." adds a new point. Link "thing_I" and "like_is".',
        },
      },
      {
        id: 'l2-speak-10-ex08',
        type: 'multiple-choice',
        question: 'What is the best order for a simple Part 2 talk?',
        options: [
          'Introduce the topic → give details → say how you feel and why',
          'Say why you like it → stop',
          'Give details → say goodbye → introduce the topic',
          'Read your notes word by word',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Mở đầu → chi tiết → cảm nhận + lý do là cấu trúc rõ ràng, dễ nói đủ 1 phút.',
          en: 'Opening → details → feelings + reason is clear and helps you speak for a full minute.',
        },
      },
      {
        id: 'l2-speak-10-ex09',
        type: 'speak-sentence',
        sentence: 'Let me think... Oh yes, I met her when I was ten.',
        translationVi: 'Để tôi nghĩ xem... À đúng rồi, tôi gặp cô ấy khi tôi mười tuổi.',
        explanation: {
          vi: 'Dùng từ đệm "Let me think..." thay vì im lặng. "met" là quá khứ của "meet".',
          en: 'Use the filler "Let me think..." instead of silence. "met" is the past of "meet".',
        },
      },
      {
        id: 'l2-speak-10-ex10',
        type: 'speak-answer',
        question:
          'Describe a person you admire. You should say: who this person is; how you know him or her; what he or she is like; and explain why you admire this person.',
        tipsVi:
          'Nói khoảng 1 phút theo 4 bước: (1) I\'d like to talk about... (2) Bạn quen họ thế nào — dùng quá khứ đơn: I met... / He is my... (3) Họ là người thế nào: First... Also... (4) Vì sao ngưỡng mộ: I admire him/her because... That\'s why...',
        sampleAnswer:
          "I'd like to talk about my grandmother. She is seventy years old and she lives with my family in Hanoi. I know her very well because she looked after me when I was a child. First, she is very kind and patient. She always listens to my problems. Also, she is a great cook, and she makes the best spring rolls in the world. Another thing is that she worked very hard all her life to raise six children. I admire her because she never complains and she is always happy. That's why she is my role model.",
        recordSeconds: 60,
        explanation: {
          vi: 'Bài nói tốt trả lời đủ các gợi ý trên thẻ, có từ nối (First, Also, Another thing) và câu kết rõ ràng.',
          en: 'A good talk covers every prompt on the card, uses linking words (First, Also, Another thing) and has a clear ending.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-speak-10-test01',
        type: 'multiple-choice',
        question: 'Which is a good opening sentence for "Describe a place you like"?',
        options: [
          'Place.',
          "I'd like to talk about Hoan Kiem Lake in Hanoi.",
          "I don't know any places.",
          'Yes, I like it.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu mở đầu nên giới thiệu rõ chủ đề: I\'d like to talk about...',
          en: 'A good opening introduces the topic clearly: I\'d like to talk about...',
        },
      },
      {
        id: 'l2-speak-10-test02',
        type: 'fill-blank',
        sentence: 'I admire my mum ___ she works hard and never gives up.',
        acceptedAnswers: ['because'],
        hint: '(vì)',
        explanation: {
          vi: 'Nêu lý do ngưỡng mộ → "because".',
          en: 'Giving the reason you admire her → "because".',
        },
      },
      {
        id: 'l2-speak-10-test03',
        type: 'speak-sentence',
        sentence: 'Finally, I feel happy and relaxed every time I go there.',
        translationVi: 'Cuối cùng, tôi thấy vui và thư giãn mỗi lần đến đó.',
        explanation: {
          vi: '"relaxed" đọc đuôi /t/: /rɪˈlækst/. "Finally" báo hiệu ý cuối cùng.',
          en: '"relaxed" ends in /t/: /rɪˈlækst/. "Finally" signals your last point.',
        },
      },
      {
        id: 'l2-speak-10-test04',
        type: 'arrange-words',
        translationVi: 'Tôi gặp anh ấy ở câu lạc bộ tiếng Anh.',
        correctSentence: 'I met him at my English club.',
        extraWords: ['meet', 'on'],
        explanation: {
          vi: 'Kể chuyện đã qua → quá khứ đơn: met (bất quy tắc của "meet").',
          en: 'A past event → past simple: met (irregular past of "meet").',
        },
      },
      {
        id: 'l2-speak-10-test05',
        type: 'multiple-choice',
        question: 'Which words help you add a new point in Part 2?',
        options: ['"yes" and "no"', '"but" and "because"', '"the" and "a"', '"also" and "another thing is"'],
        correctIndex: 3,
        explanation: {
          vi: '"Also" và "Another thing is" dùng để thêm ý mới; "but" là tương phản, "because" là lý do.',
          en: '"Also" and "Another thing is" add new points; "but" shows contrast, "because" gives a reason.',
        },
      },
      {
        id: 'l2-speak-10-test06',
        type: 'speak-answer',
        question:
          'Describe a place you like to visit. You should say: where it is; when you go there; what you do there; and explain why you like it.',
        tipsVi:
          'Dùng 1 phút chuẩn bị để ghi 4–6 từ khóa. Nói theo thứ tự các gợi ý: I\'d like to talk about... It is in... I usually go there... First... Also... I like it because... That\'s why... Cố gắng nói đủ khoảng 1 phút, dùng "Well..." nếu cần nghĩ.',
        sampleAnswer:
          "I'd like to talk about a small coffee shop near my house. It's on a quiet street, about five minutes from my home. I usually go there on Sunday mornings with my best friend. First, we order iced milk coffee and chat about our week. Also, I sometimes bring a book and read for an hour, because it's very quiet. Another thing I like is the owner. She is very friendly and she always remembers our names. I love this place because it helps me relax after a busy week. That's why I go there almost every weekend.",
        recordSeconds: 60,
        explanation: {
          vi: 'Bài nói tốt theo đúng thứ tự gợi ý, có chi tiết, từ nối và lý do rõ ràng.',
          en: 'A good talk follows the prompts in order, with details, linking words and a clear reason.',
        },
      },
    ],
  },
]
