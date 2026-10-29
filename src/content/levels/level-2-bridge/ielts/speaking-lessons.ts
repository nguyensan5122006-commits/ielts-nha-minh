/**
 * speaking-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "BRIDGE" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK IELTS
 * CHẶNG: "LÀM QUEN IELTS SPEAKING"
 *
 * Ở level-2-foundation người học đã có công thức A + R + E (Answer + Reason + Example),
 * đuôi -s/-ed cơ bản và một bài làm quen thẻ đề Part 2. Chặng này đi qua CẢ 3 PHẦN thi thật:
 *   01 l2b-i-spk-01  Cấu trúc đề Speaking + Part 1 (buổi sáng, điện thoại) — phụ âm cuối
 *   02 l2b-i-spk-02  Part 1: mở rộng bằng quá khứ / tương lai (sinh nhật, cuối tuần) — -s, -ed
 *   03 l2b-i-spk-03  Part 2: ghi chú 1 phút + nói 1 phút (một đồ vật hữu ích) — trọng âm từ
 *   04 l2b-i-spk-04  Part 2: kể trải nghiệm đã qua (một dịp sum họp gia đình) — -ed khi kể chuyện
 *   05 l2b-i-spk-05  Nếm thử Part 3: nêu và bảo vệ ý kiến (gia đình, lễ tết) — trọng âm từ dài
 *
 * Cấu trúc 1 bài mode 'speaking':
 *   teachingCards (chiến thuật + phát âm) → exercises khởi động (có speak-sentence)
 *   → speakingTask: câu hỏi, (Part 2) cueCard, 3 bài mẫu band 3.5 / 4.5 / 5.5 có lỗi thật,
 *     usefulPhrases, targetSounds (âm người Việt hay sai), checklist tự chấm FC / LR / GRA / P.
 * Ở chặng này Part 2 chỉ yêu cầu nói KHOẢNG 1 PHÚT (thi thật: tối đa 2 phút).
 *
 * Quy ước id: bài "l2b-i-spk-NN", bài tập "l2b-i-spk-NN-exMM".
 * Bài mẫu viết dạng "Examiner: ... / Candidate: ..." để máy đọc đổi giọng theo người nói.
 * Kiểu dữ liệu: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeIeltsSpeakingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Cấu trúc đề IELTS Speaking + Part 1 (chủ đề: buổi sáng, điện thoại)
  //        Phát âm: phụ âm cuối /k/, /t/, /n/
  // ==========================================================================
  {
    id: "l2b-i-spk-01",
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: "Đề IELTS Speaking và Part 1", en: "The IELTS Speaking test and Part 1" },
    description: {
      vi: "Biết 3 phần của bài thi Nói và trả lời Part 1 dài 2–3 câu, đọc rõ phụ âm cuối.",
      en: "Learn the three parts of the Speaking test and give 2–3 sentence Part 1 answers with clear final consonants.",
    },
    teachingCards: [
      {
        title: { vi: "Bài thi IELTS Speaking", en: "The IELTS Speaking test" },
        body: {
          vi: "**11–14 phút**, nói trực tiếp với giám khảo, có ghi âm.\n- **Part 1** (4–5 phút): câu hỏi về bạn và đời sống quen thuộc.\n- **Part 2** (3–4 phút): **1 phút chuẩn bị**, rồi nói một mình **tối đa 2 phút** theo thẻ đề.\n- **Part 3** (4–5 phút): thảo luận ý tưởng chung, khó hơn.\n4 tiêu chí: **trôi chảy (FC), từ vựng (LR), ngữ pháp (GRA), phát âm (P)**.",
          en: "**11–14 minutes**, face to face with an examiner, recorded.\n- **Part 1** (4–5 min): questions about you and everyday topics.\n- **Part 2** (3–4 min): **1 minute to prepare**, then talk alone for **up to 2 minutes** from a cue card.\n- **Part 3** (4–5 min): a discussion of general ideas, harder.\n4 criteria: **fluency (FC), vocabulary (LR), grammar (GRA), pronunciation (P)**.",
        },
        examples: [{ en: "Let's talk about your mornings. Do you like mornings?", vi: "Hãy nói về buổi sáng của bạn. Bạn có thích buổi sáng không?" }],
      },
      {
        title: { vi: "Part 1: trả lời 2–3 câu", en: "Part 1: answer in 2–3 sentences" },
        body: {
          vi: "Nhắc lại công thức **A + R + E**: **Answer** (trả lời) + **Reason** (lý do) + **Example / Extra** (ví dụ, chi tiết).\n- Quá ngắn: 'Yes.' ✗\n- Quá dài: nói 1 phút như Part 2 ✗\n- Vừa đủ: **2–3 câu, khoảng 15–20 giây** ✓\nĐừng học thuộc câu mẫu — giám khảo nhận ra rất dễ.",
          en: "Remember **A + R + E**: **Answer** + **Reason** + **Example / Extra**.\n- Too short: 'Yes.' ✗\n- Too long: a 1-minute speech like Part 2 ✗\n- Just right: **2–3 sentences, about 15–20 seconds** ✓\nDon't memorise answers — examiners can easily tell.",
        },
        examples: [
          {
            en: "Yes, I do. I like the quiet time before work, so I usually get up early and have a cup of tea.",
            vi: "Có. Tôi thích khoảng yên tĩnh trước giờ làm, nên thường dậy sớm và uống một tách trà.",
          },
        ],
      },
      {
        title: { vi: "Phát âm: phụ âm cuối", en: "Pronunciation: final consonants" },
        body: {
          vi: "Người Việt hay **nuốt âm cuối**: like → 'lai', work → 'wơ', phone → 'phô'. Giám khảo có thể **không hiểu** bạn nói gì.\nLuyện giữ âm cuối **ngắn nhưng rõ**: li**ke** /k/, wor**k** /k/, ge**t** /t/, pho**ne** /n/.\nNối âm cuối với nguyên âm phía sau: **get_up**, **check_it**.",
          en: "Vietnamese speakers often **drop final sounds**: like → 'lai', work → 'wer', phone → 'pho'. The examiner may **not understand** you.\nKeep final sounds **short but clear**: li**ke** /k/, wor**k** /k/, ge**t** /t/, pho**ne** /n/.\nLink a final consonant to the next vowel: **get_up**, **check_it**.",
        },
        examples: [{ en: "I get up at six and check my phone.", vi: "Tôi dậy lúc 6 giờ và xem điện thoại." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-spk-01-ex01",
        type: 'multiple-choice',
        question: "How long is the IELTS Speaking test?",
        options: ["3–4 minutes", "11–14 minutes", "30 minutes", "1 hour"],
        correctIndex: 1,
        explanation: {
          vi: "Cả 3 phần mất khoảng 11–14 phút.",
          en: "All three parts take about 11–14 minutes.",
        },
      },
      {
        id: "l2b-i-spk-01-ex02",
        type: 'match-pairs',
        instruction: { vi: "Nối mỗi phần thi với mô tả.", en: "Match each part with its description." },
        pairs: [
          { left: "Part 1", right: "questions about you and everyday life" },
          { left: "Part 2", right: "talk alone using a cue card" },
          { left: "Part 3", right: "discuss general ideas" },
          { left: "1 minute", right: "preparation time in Part 2" },
        ],
        explanation: {
          vi: "Nắm cấu trúc giúp bạn bớt bất ngờ khi thi.",
          en: "Knowing the format means fewer surprises on test day.",
        },
      },
      {
        id: "l2b-i-spk-01-ex03",
        type: 'multiple-choice',
        question: "Examiner: 'Do you like mornings?' Which answer is best for Part 1?",
        options: [
          "Yes.",
          "Yes, I do. I like the quiet time before work, so I usually get up early and have a cup of tea.",
          "Yes, I like mornings. Mornings are good. I like mornings very much.",
          "I want to tell you about my whole day, from six in the morning until midnight...",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Trả lời + lý do + chi tiết, dài 2–3 câu là vừa.",
          en: "Answer + reason + detail in 2–3 sentences is just right.",
        },
      },
      {
        id: "l2b-i-spk-01-ex04",
        type: 'arrange-words',
        translationVi: "Thật lòng mà nói, tôi không hẳn là người thích buổi sáng.",
        correctSentence: "To be honest, I'm not really a morning person.",
        extraWords: ["very"],
        explanation: {
          vi: "'a morning person' = người thích dậy sớm; 'not really' làm câu nhẹ nhàng hơn.",
          en: "'A morning person' likes getting up early; 'not really' softens the answer.",
        },
      },
      {
        id: "l2b-i-spk-01-ex05",
        type: 'speak-sentence',
        sentence: "I usually check my phone when I wake up.",
        translationVi: "Tôi thường xem điện thoại khi thức dậy.",
        explanation: {
          vi: "Giữ /k/ cuối trong check, wake; nối wake_up.",
          en: "Keep the final /k/ in 'check' and 'wake'; link wake_up.",
        },
      },
      {
        id: "l2b-i-spk-01-ex06",
        type: 'speak-sentence',
        sentence: "I like mornings because I can work in peace.",
        translationVi: "Tôi thích buổi sáng vì có thể làm việc yên tĩnh.",
        explanation: {
          vi: "Đọc rõ /k/ trong like, work và /z/ cuối trong mornings.",
          en: "Say the /k/ in 'like' and 'work', and the final /z/ in 'mornings'.",
        },
      },
      {
        id: "l2b-i-spk-01-ex07",
        type: 'multiple-choice',
        question: "What is the best way to make a Part 1 answer longer?",
        options: ["Repeat the question", "Add a reason and an example", "Change to a different topic", "Speak very slowly"],
        correctIndex: 1,
        explanation: {
          vi: "Thêm lý do + ví dụ (A + R + E) là cách tự nhiên nhất.",
          en: "Adding a reason and an example (A + R + E) is the most natural way.",
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        "Do you like mornings? Why or why not?",
        "What do you usually do in the morning?",
        "How often do you use your phone in a day?",
        "What do you mostly use your phone for?",
        "Would you like to spend less time on your phone? Why?",
      ],
      bandSamples: [
        {
          band: "3.5",
          text: "Examiner: Do you like mornings?\nCandidate: Yes. I like. Morning is... uh... good. Very fresh.\nExaminer: What do you mostly use your phone for?\nCandidate: Uh... I use phone for... chat. Chat with friend. And watch video. Every day I use... many hour.",
          notesVi:
            "FC: Câu trả lời rất ngắn, ngập ngừng nhiều (uh...), gần như không có lý do. LR: Từ rất cơ bản và lặp lại (good, chat). GRA: Câu thiếu chủ ngữ/động từ (Very fresh), thiếu -s (friend, hour). P: Dễ nuốt âm cuối ở like, chat, phone khiến người nghe khó hiểu.",
        },
        {
          band: "4.5",
          text: "Examiner: Do you like mornings?\nCandidate: Yes, I like morning because it is quiet and I can study good. Every day I wake up at six o'clock and I drink coffee.\nExaminer: What do you mostly use your phone for?\nCandidate: I use my phone for many thing. For example I chat with my friend and I watch video online. Sometime I use it for study English too.",
          notesVi:
            "FC: Trả lời đủ 2–3 câu, có 'because', 'for example' nhưng nhịp nói còn đều đều, ý đơn giản. LR: Đủ để nói chủ đề quen thuộc. GRA: Lỗi -s (many thing, video, sometime) và 'study good' (→ well). P: Âm cuối lúc có lúc mất (like, chat), nhìn chung vẫn hiểu được.",
        },
        {
          band: "5.5",
          text: "Examiner: Do you like mornings?\nCandidate: Yes, I'd say I'm a morning person. I usually get up at around six, and I really enjoy that quiet time before everyone else wakes up. I often make a cup of tea and read the news for few minutes.\nExaminer: What do you mostly use your phone for?\nCandidate: Mostly to keep in touch with my family. We have a family group chat, so we send each other photos and messages almost every day. Actually, I also use it to practise English with some apps.",
          notesVi:
            "FC: Trả lời tự nhiên, có lý do và chi tiết, ít ngập ngừng. LR: Có cụm tốt (a morning person, keep in touch). GRA: Phần lớn câu đúng, dùng được câu ghép; còn lỗi nhỏ 'for few minutes' (→ for a few minutes). P: Âm cuối khá rõ, ngữ điệu đôi chỗ còn phẳng.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            "Mỗi câu trả lời có 2–3 câu, không chỉ 'Yes / No' không?",
            "Khi cần nghĩ, bạn có dùng 'Well...' thay vì im lặng lâu không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có dùng vài cụm của chủ đề (a morning person, keep in touch) không?",
            "Có thay 'good' bằng từ khác (quiet, relaxing, useful) không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Có dùng hiện tại đơn cho thói quen (I usually get up...) không?",
            "Danh từ số nhiều có -s (friends, messages) không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Có đọc rõ âm cuối /k/, /t/, /n/ (like, chat, phone) không?",
            "Có nối âm khi từ sau bắt đầu bằng nguyên âm (get_up, check_it) không?",
          ],
        },
      ],
      usefulPhrases: [
        "I'd say I'm a morning person / a night owl.",
        "To be honest, ...",
        "The main reason is that ...",
        "For example, ...",
        "It depends. On weekdays ..., but at weekends ...",
        "I mostly use it to keep in touch with ...",
      ],
      targetSounds: ["final /k/ (like, work, check)", "final /t/ (get, eat, chat)", "final /n/ (phone, ten)", "linking (get_up, check_it)"],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2: Part 1 — mở rộng câu trả lời bằng quá khứ / tương lai
  //        Chủ đề: sinh nhật, cuối tuần. Phát âm: -s và -ed khi nói nhanh
  // ==========================================================================
  {
    id: "l2b-i-spk-02",
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: "Part 1: mở rộng bằng quá khứ và tương lai", en: "Part 1: extending with the past and the future" },
    description: {
      vi: "Trả lời Part 1 về sinh nhật và cuối tuần, thêm một câu quá khứ hoặc tương lai, đọc rõ đuôi -s và -ed.",
      en: "Answer Part 1 questions about birthdays and weekends, add a past or future sentence, and say -s and -ed clearly.",
    },
    teachingCards: [
      {
        title: { vi: "Thêm 1 câu quá khứ hoặc tương lai", en: "Add one past or future sentence" },
        body: {
          vi: "Sau khi trả lời + nêu lý do, thêm **1 câu về lần trước** (quá khứ đơn) hoặc **lần tới** (be going to). Câu trả lời sẽ dài hơn **và** giám khảo nghe được bạn dùng **nhiều thì** (điểm GRA).\nVD: I love birthdays because my family gets together. **Last year, my sister made me a cake.**",
          en: "After your answer and reason, add **one sentence about last time** (past simple) or **next time** (be going to). Your answer gets longer **and** the examiner hears **different tenses** (GRA).\nE.g. I love birthdays because my family gets together. **Last year, my sister made me a cake.**",
        },
        examples: [{ en: "Next weekend, I'm going to visit my grandparents.", vi: "Cuối tuần tới, tôi sẽ đi thăm ông bà." }],
      },
      {
        title: { vi: "Đuôi -s và -ed khi nói nhanh", en: "-s and -ed in fast speech" },
        body: {
          vi: "Nếu **nuốt -ed**, 'I watched a film' nghe thành 'I watch a film' → **sai thì**. Nếu nuốt **-s**, 'two cakes' thành 'two cake'.\nMẹo: **nối đuôi** với nguyên âm phía sau, đuôi sẽ rõ hơn:\n- play**ed_a** game /pleɪdə/\n- watch**ed_a** film /wɒtʃtə/\n- cake**s_and** candles /keɪksən/",
          en: "If you **drop -ed**, 'I watched a film' sounds like 'I watch a film' → **wrong tense**. Drop **-s** and 'two cakes' becomes 'two cake'.\nTip: **link the ending** to the next vowel so it is easier to hear:\n- play**ed_a** game /pleɪdə/\n- watch**ed_a** film /wɒtʃtə/\n- cake**s_and** candles /keɪksən/",
        },
        examples: [{ en: "We played a lot of games.", vi: "Chúng tôi chơi rất nhiều trò chơi." }],
      },
      {
        title: { vi: "Từ vựng sinh nhật và cuối tuần", en: "Birthday and weekend words" },
        body: {
          vi: "- **celebrate** (my birthday): tổ chức, ăn mừng\n- **get together**: tụ họp\n- **blow out the candles**: thổi nến\n- **have a lie-in**: ngủ nướng\n- **catch up with friends**: gặp bạn bè, hàn huyên\n- **relaxing**: thư giãn",
          en: "- **celebrate** (my birthday)\n- **get together**: meet as a group\n- **blow out the candles**\n- **have a lie-in**: stay in bed late\n- **catch up with friends**: meet and talk\n- **relaxing**: makes you calm",
        },
        examples: [{ en: "On Sundays I have a lie-in and then catch up with friends.", vi: "Chủ nhật tôi ngủ nướng rồi đi gặp bạn bè." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-spk-02-ex01",
        type: 'multiple-choice',
        question: "Examiner: 'What did you do on your last birthday?' Which tense should you mainly use?",
        options: ["Present simple", "Past simple", "Future with 'will'", "Present continuous"],
        correctIndex: 1,
        explanation: {
          vi: "'did' và 'last birthday' → quá khứ đơn.",
          en: "'Did' and 'last birthday' → past simple.",
        },
      },
      {
        id: "l2b-i-spk-02-ex02",
        type: 'fill-blank',
        sentence: "Last year, my friends ___ me with a big cake.",
        acceptedAnswers: ["surprised"],
        hint: "(surprise)",
        explanation: {
          vi: "'Last year' → quá khứ: surprise → surprised.",
          en: "'Last year' → past simple: surprised.",
        },
      },
      {
        id: "l2b-i-spk-02-ex03",
        type: 'listen-choose',
        audioText: "I watched a film with my family.",
        question: "Which sentence do you hear?",
        options: ["I watch a film with my family.", "I watched a film with my family.", "I'm watching a film with my family."],
        correctIndex: 1,
        explanation: {
          vi: "Âm /t/ nhẹ sau 'watch' cho biết đây là quá khứ: watched.",
          en: "The light /t/ after 'watch' shows the past: watched.",
        },
      },
      {
        id: "l2b-i-spk-02-ex04",
        type: 'multiple-choice',
        question: "How do you say the -ed in 'visited'?",
        options: ["/t/", "/d/", "/ɪd/", "It is silent"],
        correctIndex: 2,
        explanation: {
          vi: "Sau âm /t/ hoặc /d/, đuôi -ed đọc /ɪd/: visit-ed.",
          en: "After /t/ or /d/, -ed is /ɪd/: visit-ed.",
        },
      },
      {
        id: "l2b-i-spk-02-ex05",
        type: 'speak-sentence',
        sentence: "We played a lot of games and laughed all night.",
        translationVi: "Chúng tôi chơi rất nhiều trò và cười cả đêm.",
        explanation: {
          vi: "Nối played_a /pleɪdə/; laughed đọc /lɑːft/, đuôi /t/.",
          en: "Link played_a /pleɪdə/. 'Laughed' is /lɑːft/, ending in /t/.",
        },
      },
      {
        id: "l2b-i-spk-02-ex06",
        type: 'arrange-words',
        translationVi: "Cuối tuần tới, tôi sẽ đi thăm ông bà.",
        correctSentence: "Next weekend, I'm going to visit my grandparents.",
        extraWords: ["will"],
        explanation: {
          vi: "Kế hoạch đã định → be going to + động từ nguyên mẫu.",
          en: "A fixed plan → be going to + base verb.",
        },
      },
      {
        id: "l2b-i-spk-02-ex07",
        type: 'speak-sentence',
        sentence: "My sister bought me two cakes.",
        translationVi: "Chị tôi mua cho tôi hai cái bánh.",
        explanation: {
          vi: "bought /bɔːt/ giữ /t/; cakes giữ /ks/ — đừng nói thành 'cake'.",
          en: "'Bought' /bɔːt/ keeps the /t/. 'Cakes' keeps the /ks/.",
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        "How do you usually celebrate your birthday?",
        "What did you do on your last birthday?",
        "Do you prefer to celebrate with your family or your friends? Why?",
        "What do you usually do at weekends?",
        "What are you going to do next weekend?",
      ],
      bandSamples: [
        {
          band: "3.5",
          text: "Examiner: What did you do on your last birthday?\nCandidate: Last birthday I... go to restaurant. With family. We eat... uh... hotpot. It very fun.\nExaminer: What do you usually do at weekends?\nCandidate: Weekend I stay home. Watch TV. Sleep. Uh... that's all.",
          notesVi:
            "FC: Câu rất ngắn, ngắt quãng, không có lý do. LR: Chỉ vài từ đơn giản (fun, sleep). GRA: Dùng hiện tại cho quá khứ (go, eat), thiếu động từ 'was' (It very fun), thiếu mạo từ. P: Không có đuôi -ed vì không dùng quá khứ; dễ nuốt âm cuối.",
        },
        {
          band: "4.5",
          text: "Examiner: What did you do on your last birthday?\nCandidate: On my last birthday, I go to a restaurant with my family and we eat hotpot. My sister buyed a cake for me, it was very delicious.\nExaminer: What do you usually do at weekends?\nCandidate: At weekend I usually play badminton with my friend, and sometimes I visit my grandparents. I like weekend because I can relax.",
          notesVi:
            "FC: Trả lời đủ ý, có nối câu bằng 'and', 'because' nhưng còn đơn điệu. LR: Đủ dùng cho chủ đề quen thuộc. GRA: Lẫn thì (I go... we eat cho chuyện đã qua), sai 'buyed' (→ bought), thiếu -s (my friend, weekend). P: Hay nuốt -s, -ed nên khó biết đang nói quá khứ.",
        },
        {
          band: "5.5",
          text: "Examiner: What did you do on your last birthday?\nCandidate: It was quite simple, actually. My family took me out for hotpot, and my younger sister bought me a small cake with my name on it, which was really sweet of her. We stayed up late and played card games.\nExaminer: What do you usually do at weekends?\nCandidate: Well, on Saturday mornings I usually play badminton with some friend from my office, and on Sundays I visit my grandparents. Next weekend, though, I'm going to stay at home because I have an important exam on Monday.",
          notesVi:
            "FC: Nói trôi chảy, có chi tiết và thêm câu tương lai tự nhiên. LR: Cụm tốt (took me out, stayed up late, sweet of her). GRA: Dùng đúng quá khứ, hiện tại và be going to; còn lỗi nhỏ 'some friend' (→ friends). P: Đuôi -ed (stayed, played) khá rõ.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            "Câu trả lời có thêm 1 câu về lần trước hoặc lần tới không?",
            "Bạn có nói liền mạch, ít im lặng lâu không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có dùng ít nhất 2 cụm mới (celebrate, get together, have a lie-in) không?",
            "Có dùng từ chỉ thời gian (last year, usually, next weekend) đúng chỗ không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Câu hỏi 'What did you do...?' có được trả lời bằng quá khứ đơn không?",
            "Có dùng 'be going to' cho kế hoạch sắp tới không?",
            "Động từ bất quy tắc có đúng (bought, took, went) không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Có nghe rõ đuôi -ed (played, watched, visited) không?",
            "Có nghe rõ -s số nhiều (cakes, friends) không?",
          ],
        },
      ],
      usefulPhrases: [
        "Last year, I ...",
        "My family took me out for ...",
        "We stayed up late and ...",
        "Next weekend, I'm going to ...",
        "It depends on ...",
        "Usually ..., but sometimes ...",
      ],
      targetSounds: [
        "-ed endings: /t/ watched, /d/ played, /ɪd/ visited",
        "plural -s: cakes, friends, grandparents",
        "linking: played_a, cakes_and",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3: Part 2 — ghi chú trong 1 phút, nói khoảng 1 phút
  //        Thẻ đề: Describe a useful object that you own. Phát âm: trọng âm từ
  // ==========================================================================
  {
    id: "l2b-i-spk-03",
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: "Part 2: ghi chú 1 phút, nói 1 phút", en: "Part 2: one-minute notes, one-minute talk" },
    description: {
      vi: "Ghi từ khoá hiệu quả trong 1 phút chuẩn bị, rồi nói khoảng 1 phút về một đồ vật hữu ích, nhấn đúng trọng âm từ.",
      en: "Make useful notes in your minute of preparation, then talk for about a minute about a useful object, with correct word stress.",
    },
    teachingCards: [
      {
        title: { vi: "Ghi chú trong 1 phút", en: "Notes in one minute" },
        body: {
          vi: "Mỗi gạch đầu dòng trên thẻ → **1 dòng ghi chú, 2–4 từ khoá**. Không viết câu hoàn chỉnh.\nDành nhiều từ khoá nhất cho dòng **'explain why'** — đó là phần dài nhất.\nVD (nồi cơm điện):\n- gift – mum – 2023\n- every day – rice, soup\n- why: fast, safe, cheap → independent",
          en: "Each bullet on the card → **one line of notes, 2–4 key words**. No full sentences.\nGive the most key words to the **'explain why'** line — it is the longest part.\nE.g. (rice cooker):\n- gift – mum – 2023\n- every day – rice, soup\n- why: fast, safe, cheap → independent",
        },
        examples: [{ en: "why: fast, safe, cheap", vi: "vì sao: nhanh, an toàn, tiết kiệm" }],
      },
      {
        title: { vi: "Nói đủ 1 phút", en: "Keeping going for one minute" },
        body: {
          vi: "Thi thật bạn nói **tối đa 2 phút**; ở chặng này mục tiêu là **khoảng 1 phút**.\n- Mỗi ý trên thẻ: **2–3 câu**.\n- Dùng câu chuyển ý: **As for..., The reason it's useful is that...**\n- Hết ý? Kể thêm **1 kỷ niệm nhỏ** hoặc **cảm xúc** của bạn.\n- Cần nghĩ: **Let me think... / What else?**",
          en: "In the real test you speak for **up to 2 minutes**; in this unit, aim for **about 1 minute**.\n- Each point on the card: **2–3 sentences**.\n- Use signposts: **As for..., The reason it's useful is that...**\n- Out of ideas? Add **a small story** or **how you feel**.\n- Need time? **Let me think... / What else?**",
        },
        examples: [{ en: "As for how often I use it, I use it almost every day.", vi: "Còn về tần suất, tôi dùng nó gần như mỗi ngày." }],
      },
      {
        title: { vi: "Trọng âm từ", en: "Word stress" },
        body: {
          vi: "Tiếng Việt mỗi âm tiết nặng như nhau; tiếng Anh **nhấn mạnh 1 âm tiết** trong từ nhiều âm tiết. Nhấn sai, người nghe khó nhận ra từ.\n- **USE**ful, **PRES**ent (món quà)\n- com**PU**ter, e**LEC**tric\n- con**VE**nient, es**PE**cially\nÂm tiết được nhấn: **to hơn, dài hơn, cao hơn**.",
          en: "In Vietnamese every syllable has equal weight; in English **one syllable is stressed** in longer words. Wrong stress makes words hard to recognise.\n- **USE**ful, **PRES**ent (a gift)\n- com**PU**ter, e**LEC**tric\n- con**VE**nient, es**PE**cially\nA stressed syllable is **louder, longer and higher**.",
        },
        examples: [{ en: "It's really useful and very convenient.", vi: "Nó rất hữu ích và rất tiện lợi." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-spk-03-ex01",
        type: 'multiple-choice',
        question: "In Part 2, what should you write during the 1-minute preparation?",
        options: ["Full sentences for the whole talk", "A few key words for each point", "Nothing — just wait", "A list of difficult grammar"],
        correctIndex: 1,
        explanation: {
          vi: "Chỉ ghi vài từ khoá cho mỗi ý; viết cả câu sẽ không kịp.",
          en: "Write a few key words per point; full sentences take too long.",
        },
      },
      {
        id: "l2b-i-spk-03-ex02",
        type: 'multiple-choice',
        question: "Which notes are best for the point 'where you got it'?",
        options: [
          "gift – mum – 2023",
          "My mother gave me this rice cooker as a birthday gift in 2023.",
          "rice",
          "I don't remember",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Ghi chú tốt: ngắn, chỉ từ khoá, nhìn là nhớ ý.",
          en: "Good notes are short key words that remind you of the idea.",
        },
      },
      {
        id: "l2b-i-spk-03-ex03",
        type: 'multiple-choice',
        question: "Where is the stress in 'convenient'?",
        options: ["CON-ve-ni-ent", "con-VE-ni-ent", "con-ve-NI-ent"],
        correctIndex: 1,
        explanation: {
          vi: "con-VE-ni-ent: nhấn âm tiết thứ hai.",
          en: "con-VE-ni-ent: stress on the second syllable.",
        },
      },
      {
        id: "l2b-i-spk-03-ex04",
        type: 'multiple-choice',
        question: "Where is the stress in 'computer'?",
        options: ["COM-pu-ter", "com-PU-ter", "com-pu-TER"],
        correctIndex: 1,
        explanation: {
          vi: "com-PU-ter: nhấn âm tiết thứ hai.",
          en: "com-PU-ter: stress on the second syllable.",
        },
      },
      {
        id: "l2b-i-spk-03-ex05",
        type: 'speak-sentence',
        sentence: "It's really useful and very convenient.",
        translationVi: "Nó rất hữu ích và rất tiện lợi.",
        explanation: {
          vi: "Nhấn USEful, conVEnient. Đọc rõ /ts/ trong It's.",
          en: "Stress USEful and conVEnient. Say the /ts/ in 'It's'.",
        },
      },
      {
        id: "l2b-i-spk-03-ex06",
        type: 'speak-sentence',
        sentence: "I got it from my mum two years ago.",
        translationVi: "Mẹ tặng tôi nó cách đây hai năm.",
        explanation: {
          vi: "Nối got_it /gɒtɪt/; years đọc đuôi /z/.",
          en: "Link got_it /gɒtɪt/. 'Years' ends in /z/.",
        },
      },
      {
        id: "l2b-i-spk-03-ex07",
        type: 'fill-blank',
        sentence: "___ it, I would spend much more time cooking.",
        acceptedAnswers: ["Without"],
        hint: "(Nếu không có nó)",
        explanation: {
          vi: "'Without it, I would...' = Nếu không có nó, tôi sẽ... → cho thấy đồ vật quan trọng thế nào.",
          en: "'Without it, I would...' shows why the object matters.",
        },
      },
    ],
    speakingTask: {
      part: 2,
      questions: ["Describe a useful object that you own.", "Do other people in your family use it too?"],
      cueCard: {
        topic: "Describe a useful object that you own.",
        points: ["what it is", "where you got it", "how often you use it", "and explain why it is useful to you"],
      },
      bandSamples: [
        {
          band: "3.5",
          text: "I want talk about my laptop. I buy it... uh... two year ago. I use every day. For study, for... uh... watch film. It is useful because... uh... I can study. It is very good. Uh... that's all.",
          notesVi:
            "FC: Nói chưa tới 30 giây, ngập ngừng nhiều, dừng hẳn khi hết ý. LR: Lặp 'study', 'good'. GRA: Sai thì (I buy... ago), thiếu 'to' và tân ngữ (I want talk, I use every day). P: Trọng âm và âm cuối chưa rõ (laptop, useful).",
        },
        {
          band: "4.5",
          text: "I'd like to talk about my laptop. My father buyed it for me two years ago when I start university. I use it every day, maybe five or six hour. I use it for study, for do my homework, and in the evening I watch film or listen music. It is very useful because I can study everywhere, for example in the library or in the coffee shop. Without it I cannot do anything. So I think it is the most useful thing I have.",
          notesVi:
            "FC: Nói được khoảng 45 giây, theo đúng các ý trên thẻ nhưng hơi đều đều. LR: Đủ để diễn đạt, chưa có từ nổi bật. GRA: Lỗi động từ (buyed, start), thiếu -s (hour, film), sai 'for do', 'listen music'. P: Hiểu được, nhưng trọng âm 'useful', 'university' đôi khi sai.",
        },
        {
          band: "5.5",
          text: "I'd like to talk about my laptop, which is probably the most useful thing I own. My parents gave it to me as a present when I started university, so I've had it for about two years now. I use it almost every day, usually for four or five hours. Most of the time I use it for studying. I write my assignments, join online class and look up informations for my projects. In the evening, I sometimes watch films on it to relax. The reason it's so useful is that I can work anywhere, for example in a café or at the library. Honestly, I don't know how I would study without it.",
          notesVi:
            "FC: Nói liền mạch khoảng 1 phút, chuyển ý mượt (The reason it's so useful is that...). LR: Từ phù hợp (assignments, look up). GRA: Dùng được hiện tại hoàn thành (I've had it) và câu giả định; còn lỗi 'online class', 'informations'. P: Trọng âm rõ ở USEful, asSIGNments.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            "Bạn có nói được khoảng 1 phút mà không dừng hẳn không?",
            "Có đi qua đủ 4 ý trên thẻ theo thứ tự không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có dùng vài từ riêng cho đồ vật đó (charge, screen, battery) không?",
            "Có thay 'good' bằng từ cụ thể hơn (useful, convenient, reliable) không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Ý 'where you got it' có dùng quá khứ (got, bought, gave) không?",
            "Có thử 1 câu 'Without it, I would...' không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Có nhấn đúng trọng âm USEful, conVEnient không?",
            "Có đọc rõ /t/ cuối trong got, bought không?",
          ],
        },
      ],
      usefulPhrases: [
        "I'd like to talk about ...",
        "I got it from ... / I bought it ... ago.",
        "I use it almost every day / a few times a week.",
        "As for ..., ...",
        "The reason it's so useful is that ...",
        "Without it, I would ...",
      ],
      targetSounds: ["word stress: USEful, comPUter, conVEnient, eLECtric", "final /t/: got, bought, laptop", "final -s: hours, films, assignments"],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4: Part 2 — kể một trải nghiệm đã qua
  //        Thẻ đề: Describe a family celebration that you enjoyed. Phát âm: -ed
  // ==========================================================================
  {
    id: "l2b-i-spk-04",
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: "Part 2: kể một trải nghiệm đã qua", en: "Part 2: describing a past experience" },
    description: {
      vi: "Kể về một dịp sum họp gia đình theo trình tự thời gian, dùng đúng quá khứ đơn và đọc rõ đuôi -ed.",
      en: "Describe a family celebration in time order, using the past simple and clear -ed endings.",
    },
    teachingCards: [
      {
        title: { vi: "Kể theo dòng thời gian", en: "Tell it in time order" },
        body: {
          vi: "Câu chuyện dễ theo dõi khi có **mốc thời gian**:\n- Mở đầu: **It happened about two years ago, at...**\n- Diễn biến: **First, ... Then, ... After that, ...**\n- Kết: **In the end, ... / The best part was when...**\nÝ cuối trên thẻ (**explain why**) nên dài nhất: nói cảm xúc + lý do.",
          en: "A story is easy to follow with **time markers**:\n- Start: **It happened about two years ago, at...**\n- Middle: **First, ... Then, ... After that, ...**\n- End: **In the end, ... / The best part was when...**\nThe last point (**explain why**) should be the longest: your feelings + reasons.",
        },
        examples: [
          { en: "The best part was when we all wrapped banh chung together.", vi: "Phần tuyệt nhất là khi cả nhà cùng gói bánh chưng." },
        ],
      },
      {
        title: { vi: "Quá khứ đơn: động từ hay dùng", en: "Past simple: useful verbs" },
        body: {
          vi: "Kể chuyện đã qua → **quá khứ đơn** từ đầu đến cuối.\nĐộng từ bất quy tắc hay dùng: go → **went**, have → **had**, eat → **ate**, give → **gave**, make → **made**, see → **saw**, wear → **wore**.\nCảm xúc: **I felt happy / relaxed**, **It was the most memorable day.**",
          en: "A past story → **past simple** from start to finish.\nCommon irregular verbs: go → **went**, have → **had**, eat → **ate**, give → **gave**, make → **made**, see → **saw**, wear → **wore**.\nFeelings: **I felt happy / relaxed**, **It was the most memorable day.**",
        },
        examples: [
          { en: "Everyone wore new clothes, and the children got lucky money.", vi: "Ai cũng mặc quần áo mới, và trẻ con được lì xì." },
        ],
      },
      {
        title: { vi: "Phát âm: -ed trong câu chuyện", en: "Pronunciation: -ed in a story" },
        body: {
          vi: "Cả câu chuyện ở quá khứ, nên đuôi **-ed** xuất hiện liên tục. Nuốt -ed = giám khảo nghe thành **hiện tại**.\n- /t/: wrapp**ed**, cook**ed**, laugh**ed**\n- /d/: stay**ed**, play**ed**, enjoy**ed**\n- /ɪd/ (chỉ sau t, d): visit**ed**, decid**ed**\nĐừng thêm /ɪd/ vào mọi từ: cooked ≠ 'cook-ed'.",
          en: "The whole story is in the past, so **-ed** comes again and again. Drop it and the examiner hears the **present**.\n- /t/: wrapp**ed**, cook**ed**, laugh**ed**\n- /d/: stay**ed**, play**ed**, enjoy**ed**\n- /ɪd/ (only after t, d): visit**ed**, decid**ed**\nDon't add /ɪd/ everywhere: cooked ≠ 'cook-ed'.",
        },
        examples: [{ en: "We stayed up late and cooked all night.", vi: "Chúng tôi thức khuya và nấu cả đêm." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-spk-04-ex01",
        type: 'match-pairs',
        instruction: { vi: "Nối động từ với dạng quá khứ.", en: "Match each verb with its past form." },
        pairs: [
          { left: "go", right: "went" },
          { left: "eat", right: "ate" },
          { left: "give", right: "gave" },
          { left: "wear", right: "wore" },
          { left: "see", right: "saw" },
          { left: "make", right: "made" },
        ],
        explanation: {
          vi: "Đây là các động từ bất quy tắc hay dùng khi kể chuyện.",
          en: "These irregular verbs are common in stories.",
        },
      },
      {
        id: "l2b-i-spk-04-ex02",
        type: 'fill-blank',
        sentence: "Last Tet, we ___ to my grandparents' house in the countryside.",
        acceptedAnswers: ["went"],
        hint: "(go)",
        explanation: {
          vi: "'Last Tet' → quá khứ: go → went.",
          en: "'Last Tet' → past simple: go → went.",
        },
      },
      {
        id: "l2b-i-spk-04-ex03",
        type: 'multiple-choice',
        question: "Which sentence is correct?",
        options: [
          "Yesterday we cook dinner together.",
          "Yesterday we cooked dinner together.",
          "Yesterday we cooking dinner together.",
          "Yesterday we was cook dinner together.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "'Yesterday' → quá khứ đơn: cooked.",
          en: "'Yesterday' → past simple: cooked.",
        },
      },
      {
        id: "l2b-i-spk-04-ex04",
        type: 'multiple-choice',
        question: "How do you say the -ed in 'wrapped'?",
        options: ["/t/", "/d/", "/ɪd/"],
        correctIndex: 0,
        explanation: {
          vi: "Sau âm /p/, đuôi -ed đọc /t/: /ræpt/.",
          en: "After /p/, -ed is /t/: /ræpt/.",
        },
      },
      {
        id: "l2b-i-spk-04-ex05",
        type: 'speak-sentence',
        sentence: "We stayed up late and talked all night.",
        translationVi: "Chúng tôi thức khuya và nói chuyện cả đêm.",
        explanation: {
          vi: "Nối stayed_up; talked đọc /tɔːkt/, đuôi /t/.",
          en: "Link stayed_up. 'Talked' is /tɔːkt/, ending in /t/.",
        },
      },
      {
        id: "l2b-i-spk-04-ex06",
        type: 'multiple-choice',
        question: "Which phrase is best to start the last point, 'explain why you enjoyed it'?",
        options: ["First of all,", "The main reason I enjoyed it was that", "Then,", "It happened in"],
        correctIndex: 1,
        explanation: {
          vi: "Ý cuối cần lý do: 'The main reason I enjoyed it was that...'",
          en: "The last point needs a reason: 'The main reason I enjoyed it was that...'",
        },
      },
      {
        id: "l2b-i-spk-04-ex07",
        type: 'speak-sentence',
        sentence: "The best part was when my grandfather gave us lucky money.",
        translationVi: "Phần vui nhất là khi ông lì xì cho chúng tôi.",
        explanation: {
          vi: "Giữ /t/ trong best, part; /v/ cuối trong gave. Nhấn BEST, LUCky.",
          en: "Keep /t/ in 'best' and 'part', and /v/ in 'gave'. Stress BEST and LUCky.",
        },
      },
    ],
    speakingTask: {
      part: 2,
      questions: ["Describe a family celebration that you enjoyed.", "Do you often have family celebrations like this?"],
      cueCard: {
        topic: "Describe a family celebration that you enjoyed.",
        points: ["what the celebration was", "when and where it happened", "what you did there", "and explain why you enjoyed it"],
      },
      bandSamples: [
        {
          band: "3.5",
          text: "I want talk about Tet. Last year, my family... uh... go to my grandmother house. We eat banh chung and... many food. I happy. Very fun. Because I see my cousin. Uh... that's it.",
          notesVi:
            "FC: Rất ngắn, ngập ngừng, chưa trả lời đủ các ý trên thẻ. LR: Từ rất cơ bản (fun, many food). GRA: Dùng hiện tại thay quá khứ (go, eat, see), thiếu động từ (I happy). P: Không có đuôi -ed vì không dùng quá khứ.",
        },
        {
          band: "4.5",
          text: "I'd like to talk about Tet holiday last year. My family went to my grandparents' house in Nam Dinh. We stay there three days. On the first day, we cook banh chung together and we eat a big meal. My grandfather give lucky money for all children. I enjoy it very much because I can meet all my cousins, we play games and talk until late. It is the happiest time in the year for me.",
          notesVi:
            "FC: Đi qua đủ các ý, khoảng 45 giây, nhưng ít chi tiết sinh động. LR: Có từ của chủ đề (lucky money, cousins). GRA: Lẫn thì (went rồi lại stay, cook, give, enjoy), sai 'give... for all children' (→ gave all the children). P: Hay nuốt -ed nên nghe như hiện tại.",
        },
        {
          band: "5.5",
          text: "I'd like to describe the Tet celebration my family had last year at my grandparents' house in the countryside. All of my relative came back, so there were about twenty people in a small house. On the day before Tet, we wrapped banh chung together and cooked it over a fire all night, which was really fun. On the first morning, everyone wore new clothes and the children received lucky money. I enjoyed it so much because I rarely see my cousins, and it was the first time in years that the whole family was together. I still remember how noisy and happy the house was.",
          notesVi:
            "FC: Kể liền mạch theo thời gian, có chi tiết và cảm xúc. LR: Cụm tốt (wrapped banh chung, the whole family). GRA: Quá khứ đơn dùng nhất quán, có mệnh đề quan hệ; còn lỗi 'All of my relative' (→ relatives). P: Đuôi -ed rõ (wrapped, cooked, enjoyed).",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            "Có kể theo thứ tự thời gian (First, Then, After that) không?",
            "Có nói khoảng 1 phút và đủ 4 ý trên thẻ không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có dùng từ riêng của dịp đó (relatives, lucky money, wrap) không?",
            "Có dùng tính từ cảm xúc (memorable, exciting, relaxed) không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Có giữ quá khứ đơn từ đầu đến cuối câu chuyện không?",
            "Động từ bất quy tắc có đúng (went, ate, gave, wore) không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Có đọc rõ đuôi -ed (wrapped /t/, stayed /d/) không?",
            "Có tránh thêm âm thừa vào cuối từ (cook-ed ✗) không?",
          ],
        },
      ],
      usefulPhrases: [
        "I'd like to describe ...",
        "It happened about ... ago, at ...",
        "First, ... Then, ... After that, ...",
        "The best part was when ...",
        "I enjoyed it because ...",
        "I'll never forget ...",
      ],
      targetSounds: [
        "-ed /t/: wrapped, cooked, laughed",
        "-ed /d/: stayed, played, enjoyed",
        "-ed /ɪd/: visited, decided",
        "linking: stayed_up, went_out",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 5: Nếm thử Part 3 — nêu và bảo vệ ý kiến (O – R – E)
  //        Chủ đề: gia đình, lễ tết, công nghệ. Phát âm: trọng âm từ dài
  // ==========================================================================
  {
    id: "l2b-i-spk-05",
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: "Nếm thử Part 3: nêu và bảo vệ ý kiến", en: "A taste of Part 3: giving and supporting opinions" },
    description: {
      vi: "Trả lời câu hỏi Part 3 về gia đình và lễ tết bằng công thức Ý kiến – Lý do – Ví dụ, nhấn đúng trọng âm từ dài.",
      en: "Answer Part 3 questions about families and celebrations with Opinion – Reason – Example, stressing longer words correctly.",
    },
    teachingCards: [
      {
        title: { vi: "Part 3 khác Part 1 thế nào?", en: "How is Part 3 different?" },
        body: {
          vi: "**Part 1** hỏi về **bạn**: Do **you** like...? → I usually...\n**Part 3** hỏi về **mọi người, xã hội**: Why do **people**...? Do you think...? → **People in my country tend to...**\nCâu trả lời dài hơn: **3–4 câu**. Giám khảo có thể hỏi thêm **'Why?'** — cứ bình tĩnh đưa thêm lý do.",
          en: "**Part 1** asks about **you**: Do **you** like...? → I usually...\n**Part 3** asks about **people and society**: Why do **people**...? Do you think...? → **People in my country tend to...**\nAnswers are longer: **3–4 sentences**. The examiner may ask **'Why?'** again — just calmly give another reason.",
        },
        examples: [
          { en: "People in my country tend to celebrate Tet with their whole family.", vi: "Người ở nước tôi thường đón Tết cùng cả đại gia đình." },
        ],
      },
      {
        title: { vi: "Công thức O – R – E", en: "The O – R – E formula" },
        body: {
          vi: "- **O – Opinion**: In my opinion, ... / I think ...\n- **R – Reason**: This is mainly because ...\n- **E – Example**: For example, in my family / in Vietnam ...\n- (Thêm) **Mặt khác**: On the other hand, some people ...\nKhông có ý kiến đúng/sai — giám khảo chấm **cách bạn diễn đạt**.",
          en: "- **O – Opinion**: In my opinion, ... / I think ...\n- **R – Reason**: This is mainly because ...\n- **E – Example**: For example, in my family / in Vietnam ...\n- (Extra) **Other side**: On the other hand, some people ...\nThere is no right or wrong opinion — the examiner scores **how you express it**.",
        },
        examples: [
          { en: "I think family celebrations are still important. This is mainly because...", vi: "Tôi nghĩ các dịp sum họp vẫn quan trọng. Chủ yếu là vì..." },
        ],
      },
      {
        title: { vi: "Trọng âm từ dài", en: "Stress in longer words" },
        body: {
          vi: "Part 3 dùng nhiều từ dài — nhấn sai rất dễ bị hiểu nhầm.\nQuy tắc nhanh:\n- Đuôi **-tion**: nhấn âm **ngay trước**: tra**DI**tion, cele**BRA**tion, gene**RA**tion\n- Đuôi **-ogy**: tech**NOL**ogy\n- Từ hay gặp: im**POR**tant, **FAM**ily, **CEL**ebrate",
          en: "Part 3 uses many long words — wrong stress causes misunderstandings.\nQuick rules:\n- **-tion** endings: stress the syllable **just before**: tra**DI**tion, cele**BRA**tion, gene**RA**tion\n- **-ogy** endings: tech**NOL**ogy\n- Common words: im**POR**tant, **FAM**ily, **CEL**ebrate",
        },
        examples: [{ en: "Technology has changed many traditions.", vi: "Công nghệ đã thay đổi nhiều truyền thống." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-spk-05-ex01",
        type: 'multiple-choice',
        question: "Which question is a Part 3 question?",
        options: [
          "Where do you live?",
          "Do you like birthdays?",
          "Why do some young people prefer to celebrate with friends?",
          "What's your full name?",
        ],
        correctIndex: 2,
        explanation: {
          vi: "Part 3 hỏi về mọi người nói chung và lý do (Why do young people...?).",
          en: "Part 3 asks about people in general and reasons.",
        },
      },
      {
        id: "l2b-i-spk-05-ex02",
        type: 'multiple-choice',
        question: "In Part 3, which start is usually better?",
        options: ["I usually...", "People in my country tend to...", "My name is...", "Yesterday I..."],
        correctIndex: 1,
        explanation: {
          vi: "Part 3 bàn chuyện chung, nên nói về 'people', không chỉ bản thân.",
          en: "Part 3 is about society, so talk about people, not only yourself.",
        },
      },
      {
        id: "l2b-i-spk-05-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối cụm từ với phần O – R – E.", en: "Match each phrase with its part of O – R – E." },
        pairs: [
          { left: "In my opinion, ...", right: "Opinion" },
          { left: "This is mainly because ...", right: "Reason" },
          { left: "For instance, in my family ...", right: "Example" },
          { left: "On the other hand, ...", right: "The other side" },
        ],
        explanation: {
          vi: "Các cụm này giúp câu trả lời Part 3 có cấu trúc rõ.",
          en: "These phrases give your Part 3 answers a clear structure.",
        },
      },
      {
        id: "l2b-i-spk-05-ex04",
        type: 'multiple-choice',
        question: "Where is the stress in 'technology'?",
        options: ["TECH-no-lo-gy", "tech-NO-lo-gy", "tech-no-LO-gy"],
        correctIndex: 1,
        explanation: {
          vi: "Đuôi -ogy: nhấn âm tiết thứ 3 tính từ cuối: tech-NO-lo-gy.",
          en: "With -ogy, stress the third syllable from the end: tech-NO-lo-gy.",
        },
      },
      {
        id: "l2b-i-spk-05-ex05",
        type: 'multiple-choice',
        question: "Where is the stress in 'celebration'?",
        options: ["CEL-e-bra-tion", "ce-LE-bra-tion", "cel-e-BRA-tion"],
        correctIndex: 2,
        explanation: {
          vi: "Đuôi -tion: nhấn âm ngay trước nó: cel-e-BRA-tion.",
          en: "With -tion, stress the syllable just before it: cel-e-BRA-tion.",
        },
      },
      {
        id: "l2b-i-spk-05-ex06",
        type: 'speak-sentence',
        sentence: "In my opinion, traditions are still important.",
        translationVi: "Theo tôi, các truyền thống vẫn còn quan trọng.",
        explanation: {
          vi: "Nhấn oPINion, traDItions, imPORtant. Đọc rõ /nz/ cuối trong traditions.",
          en: "Stress oPINion, traDItions and imPORtant. Say the final /nz/ in 'traditions'.",
        },
      },
      {
        id: "l2b-i-spk-05-ex07",
        type: 'speak-sentence',
        sentence: "Technology has changed the way people celebrate.",
        translationVi: "Công nghệ đã thay đổi cách mọi người ăn mừng.",
        explanation: {
          vi: "Nhấn techNOLogy, CELebrate. changed đọc /tʃeɪndʒd/, đuôi /d/.",
          en: "Stress techNOLogy and CELebrate. 'Changed' ends in /d/.",
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        "Do you think family celebrations are less important now than in the past?",
        "Why do some young people prefer to celebrate with friends instead of family?",
        "Is it better to celebrate at home or in a restaurant? Why?",
        "How has technology changed the way people celebrate?",
      ],
      bandSamples: [
        {
          band: "3.5",
          text: "Examiner: Do you think family celebrations are less important now than in the past?\nCandidate: Yes. Now people busy. They work... uh... a lot. So celebrate is less. I think so.",
          notesVi:
            "FC: Chỉ vài câu rất ngắn, không phát triển ý. LR: Từ quá đơn giản, dùng sai từ loại (celebrate → celebration). GRA: Thiếu động từ 'are' (people busy). P: Âm cuối và trọng âm chưa rõ (celebrate).",
        },
        {
          band: "4.5",
          text: "Examiner: Do you think family celebrations are less important now than in the past?\nCandidate: Yes, I think family celebration is less important now. Because people is very busy with work and study. In the past, everybody come home for Tet and stay one week, but now many people only stay two or three day. Also young people like go out with friends more.",
          notesVi:
            "FC: Có ý kiến, lý do và so sánh xưa – nay, nhưng ý nối chưa mượt. LR: Đủ dùng nhưng lặp 'people'. GRA: Lỗi hoà hợp (people is), sai thì (come, stay cho quá khứ), thiếu -s (day), 'like go' (→ like to go). P: Hiểu được, nhưng trọng âm 'celebration' chưa chuẩn.",
        },
        {
          band: "5.5",
          text: "Examiner: Do you think family celebrations are less important now than in the past?\nCandidate: I think they're still important, but maybe in a different way. In the past, families spent much more time together during celebrations, whereas nowadays people are busier, so they often celebrate for a shorter time. For example, some of my cousins work in other cities and can only come home for two day at Tet. However, I don't think people care less about family. They just have less time. And technology helps a bit, because relatives who can't come can still join by video call.",
          notesVi:
            "FC: Trả lời dài, ý kiến có cân nhắc, có ví dụ và mặt khác. LR: Từ nối đa dạng (whereas, However), cụm tốt (care less about). GRA: Phần lớn chính xác; còn lỗi 'two day' (→ two days). P: Trọng âm rõ ở celeBRAtions, techNOLogy.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            "Mỗi câu trả lời có 3–4 câu (ý kiến + lý do + ví dụ) không?",
            "Khi được hỏi 'Why?', bạn có đưa thêm lý do mới thay vì lặp lại không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có nói về mọi người, xã hội (people, families, young people) chứ không chỉ 'I' không?",
            "Có dùng cụm so sánh xưa – nay (in the past, nowadays, compared with) không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Có dùng cả quá khứ và hiện tại khi so sánh xưa – nay không?",
            "Có câu dùng whereas / but để so sánh không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Có nhấn đúng techNOLogy, traDItion, celeBRAtion không?",
            "Có nối âm tự nhiên (think_it, because_of) thay vì ngắt từng từ không?",
          ],
        },
      ],
      usefulPhrases: [
        "In my opinion, ...",
        "I think it depends on ...",
        "This is mainly because ...",
        "For example, in my country ...",
        "Compared with the past, ...",
        "On the other hand, ...",
      ],
      targetSounds: [
        "word stress: techNOLogy, imPORtant, traDItion, celeBRAtion",
        "linking: think_it, because_of",
        "final /z/: families, celebrations",
      ],
    },
    miniTest: [],
  },
]
