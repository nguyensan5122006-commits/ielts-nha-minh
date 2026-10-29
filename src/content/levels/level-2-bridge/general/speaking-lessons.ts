/**
 * speaking-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "CẦU NỐI" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK TỔNG QUÁT (general)
 * KỸ NĂNG NÓI (mode 'speaking')
 *
 * Cấu trúc 1 bài nói v3:
 *   teachingCards (cách trả lời + ngữ pháp + phát âm) → exercises (khởi động, có nhại câu)
 *   → speakingTask: câu hỏi kiểu IELTS Speaking Part 1 về chủ đề của chặng,
 *     kèm bài mẫu 3 mức, cụm từ hữu ích, âm cần luyện và checklist tự chấm.
 *
 * VỀ BÀI MẪU (bandSamples): track tổng quát KHÔNG hiện band cho người học, nhưng vẫn
 * gắn nhãn "3.5" / "4.5" / "5.5" để giao diện hiểu là 3 mức "cơ bản / khá / rất tốt".
 * Mỗi bài mẫu trả lời câu hỏi 1 và 2 (hai đoạn cách nhau bởi dòng trống).
 * Bài mức thấp CỐ Ý có lỗi điển hình của người Việt (thiếu "be", thiếu -s, sai thì...).
 *
 * File này chứa 4 bài (mỗi chặng 1 bài):
 *   1. l2b-g-01-speak : Du lịch — Have you ever...? + kể chuyện ngắn; âm cuối /st/, /kt/
 *   2. l2b-g-02-speak : Công việc — nói về việc mình làm, prefer / It depends; âm /ʃ/ và /s/
 *   3. l2b-g-03-speak : Trường học — môn học (so sánh nhất), kinh nghiệm & kế hoạch; trọng âm tên môn
 *   4. l2b-g-04-speak : Phim, nhạc, tin tức — nêu ý kiến, giới thiệu phim; trọng âm tính từ -ing
 *
 * Quy ước id: bài "l2b-g-<chặng>-speak", bài tập "...-ex<số>".
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralSpeakingLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — NÓI: CHUYỆN ĐI DU LỊCH
   * Trả lời "Have you ever...?" (hiện tại hoàn thành → quá khứ đơn), kể chuyện 4 bước.
   * Phát âm: cụm phụ âm cuối (lost, first, packed, asked).
   * ======================================================================== */
  {
    id: 'l2b-g-01-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 12,
    title: { vi: 'Nói: chuyện đi du lịch', en: 'Speaking: talking about travel' },
    description: {
      vi: "Trả lời câu hỏi về du lịch và kể một trải nghiệm ngắn với 'Have you ever...?' và thì quá khứ đơn.",
      en: "Answer questions about travel and tell a short story with 'Have you ever...?' and the past simple.",
    },
    teachingCards: [
      {
        title: { vi: "Trả lời 'Have you ever...?'", en: "Answering 'Have you ever...?'" },
        body: {
          vi: "Bước 1 — trả lời bằng **hiện tại hoàn thành**: **Yes, I have.** / **No, I haven't, but...**\nBước 2 — kể chi tiết bằng **quá khứ đơn** (vì có thời gian cụ thể): **Last summer I went to...**\nVD: 'Have you ever been to Hue?' – 'Yes, I have. I **went** there **in 2023** with my class.'",
          en: "Step 1 — answer with the **present perfect**: **Yes, I have.** / **No, I haven't, but...**\nStep 2 — give details in the **past simple** (there's a specific time): **Last summer I went to...**\nE.g. 'Have you ever been to Hue?' – 'Yes, I have. I **went** there **in 2023** with my class.'",
        },
        examples: [{ en: "No, I haven't, but I'd love to go to Japan one day.", vi: 'Chưa, nhưng mình rất muốn đến Nhật một ngày nào đó.' }],
      },
      {
        title: { vi: 'Kể một chuyện nhỏ theo 4 bước', en: 'Tell a mini story in four steps' },
        body: {
          vi: "Muốn câu trả lời dài và hay hơn, kể **một chuyện nhỏ** theo 4 ý:\n**When** (khi nào) → **Where** (ở đâu) → **What happened** (chuyện gì xảy ra) → **How you felt** (bạn cảm thấy thế nào).\nVD: 'Last year in Da Lat, I got lost at night. A kind man helped me. I felt so relieved!'",
          en: "To give a longer, more interesting answer, tell **a mini story** in four parts:\n**When** → **Where** → **What happened** → **How you felt**.\nE.g. 'Last year in Da Lat, I got lost at night. A kind man helped me. I felt so relieved!'",
        },
        examples: [{ en: 'I felt really nervous at first, but it was great in the end.', vi: 'Lúc đầu mình rất hồi hộp, nhưng cuối cùng thì rất tuyệt.' }],
      },
      {
        title: { vi: 'Phát âm: cụm phụ âm cuối', en: 'Pronunciation: final consonant clusters' },
        body: {
          vi: "Người Việt hay bỏ âm cuối khi có **2–3 phụ âm** đứng liền nhau:\nlo**st**, fir**st**, la**st**, pa**cked** /kt/, a**sked** /skt/.\nMẹo: nói **chậm**, đọc **rõ từng âm cuối**, rồi mới tăng tốc.\n'I go**t lost** on my fir**st** day' — nghe rõ /t/ là người nghe hiểu ngay bạn đang kể chuyện đã qua.",
          en: "Vietnamese speakers often drop endings with **2–3 consonants** together:\nlo**st**, fir**st**, la**st**, pa**cked** /kt/, a**sked** /skt/.\nTip: say it **slowly**, make **every final sound**, then speed up.\n'I go**t lost** on my fir**st** day' — a clear /t/ shows you are talking about the past.",
        },
        examples: [{ en: 'I asked a woman for directions.', vi: 'Mình đã hỏi đường một người phụ nữ.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-01-speak-ex01',
        type: 'multiple-choice',
        question: "'Have you ever travelled by plane?' Which is the best answer?",
        options: [
          'Yes, I have. I flew to Phu Quoc last year.',
          'Yes, I fly to Phu Quoc last year.',
          'Yes, I have flew to Phu Quoc.',
          'Yes. Plane.',
        ],
        correctIndex: 0,
        explanation: {
          vi: "'Yes, I have' rồi kể chi tiết bằng quá khứ đơn: flew ... last year.",
          en: "Say 'Yes, I have', then give details in the past simple.",
        },
      },
      {
        id: 'l2b-g-01-speak-ex02',
        type: 'fill-blank',
        sentence: 'Have you ever ___ to Da Nang?',
        acceptedAnswers: ['been'],
        hint: '(be)',
        explanation: {
          vi: 'Have you ever been to + nơi chốn? = Bạn đã từng đến... chưa?',
          en: 'Have you ever been to + place? asks about experience.',
        },
      },
      {
        id: 'l2b-g-01-speak-ex03',
        type: 'fill-blank',
        sentence: 'Yes, I have. I ___ there last summer with my family.',
        acceptedAnswers: ['went'],
        hint: '(go)',
        explanation: {
          vi: "Có 'last summer' (thời gian cụ thể) → dùng quá khứ đơn: went.",
          en: "'Last summer' is a specific time, so use the past simple: went.",
        },
      },
      {
        id: 'l2b-g-01-speak-ex04',
        type: 'arrange-words',
        translationVi: 'Mình chưa bao giờ ra nước ngoài.',
        correctSentence: 'I have never been abroad.',
        extraWords: ['ever', 'went'],
        explanation: {
          vi: "'never' đứng giữa have và V3: have never been.",
          en: "'Never' goes between 'have' and the past participle.",
        },
      },
      {
        id: 'l2b-g-01-speak-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi bước kể chuyện với câu ví dụ.', en: 'Match each story step with an example.' },
        pairs: [
          { left: 'When', right: 'Last December...' },
          { left: 'Where', right: '...at the airport in Hanoi.' },
          { left: 'What happened', right: 'My flight was cancelled.' },
          { left: 'How you felt', right: 'I felt really tired and annoyed.' },
        ],
        explanation: {
          vi: '4 bước giúp câu chuyện có đầu có đuôi, dễ nghe.',
          en: 'The four steps make your story clear and easy to follow.',
        },
      },
      {
        id: 'l2b-g-01-speak-ex06',
        type: 'listen-choose',
        audioText: 'I got lost on my first day in Bangkok.',
        question: 'When did the speaker get lost?',
        options: ['On the last day', 'On the first day', 'Before the trip', 'Every day'],
        correctIndex: 1,
        explanation: {
          vi: "Nghe rõ cụm /st/ trong 'first' — đừng nhầm với 'last'.",
          en: "Listen for /st/ in 'first' — don't confuse it with 'last'.",
        },
      },
      {
        id: 'l2b-g-01-speak-ex07',
        type: 'speak-sentence',
        sentence: 'Yes, I have. I went to Hue last year with my class.',
        translationVi: 'Rồi. Năm ngoái mình đi Huế với lớp.',
        explanation: {
          vi: "Đọc rõ /t/ cuối 'went' và /st/ cuối 'last'.",
          en: "Say the /t/ in 'went' and the /st/ in 'last'.",
        },
      },
      {
        id: 'l2b-g-01-speak-ex08',
        type: 'speak-sentence',
        sentence: 'I asked a woman for directions, and she helped me.',
        translationVi: 'Mình đã hỏi đường một người phụ nữ, và cô ấy đã giúp mình.',
        explanation: {
          vi: "'asked' /ɑːskt/ và 'helped' /helpt/ đều kết thúc bằng âm /t/.",
          en: "'Asked' and 'helped' both end in a /t/ sound.",
        },
      },
      {
        id: 'l2b-g-01-speak-ex09',
        type: 'multiple-choice',
        question: "'Do you like travelling?' Which answer is the best?",
        options: [
          'Yes.',
          'Yes, I do.',
          'Yes, I really do, because I love trying new food. Last month I went to Hoi An and ate cao lau.',
          'Travelling.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu trả lời tốt có ý chính + lý do + ví dụ thật.',
          en: 'A good answer has an answer, a reason and a real example.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'Do you enjoy travelling? Why or why not?',
        'Have you ever travelled by plane?',
        'What do you usually pack when you go on a trip?',
        'Do you prefer travelling with your family or with friends?',
        'Have you ever had a problem on a trip? What happened?',
        'Where would you like to travel in the future?',
      ],
      bandSamples: [
        {
          band: '3.5',
          text: 'Yes, I like travel. Because I can see many beautiful place and eat many food. It very fun.\n\nYes, I have travel by plane. Last year I go to Da Nang with my family. The plane is very fast. I like it.',
          notesVi:
            "Trả lời câu 1–2. FC: câu rất ngắn, ý rời rạc, 'Because...' đứng một mình. LR: từ đơn giản, lặp lại (many, like). GRA: sai thì ('I have travel', 'I go' thay vì 'went'), thiếu 'is' ('It very fun'), thiếu -s ('place'). P: lỗi thiếu -s thường đi kèm thói quen nuốt âm cuối khi nói.",
        },
        {
          band: '4.5',
          text: 'Yes, I enjoy travelling because I can see new places and try different food. For example, last summer I went to Hue and I tried bun bo Hue. It was really delicious.\n\nYes, I have. I have travelled by plane two times. The first time, I went to Phu Quoc with my parents when I was ten. I was a bit scared, but it was exciting.',
          notesVi:
            "Trả lời câu 1–2. FC: trả lời đủ ý, có lý do và ví dụ, nhưng chủ yếu nối bằng 'and', 'but'. LR: từ vựng đủ dùng ('delicious', 'scared', 'exciting'); 'two times' nên nói 'twice'. GRA: dùng đúng 'Yes, I have' và quá khứ đơn; câu phức còn ít. P: cần đọc rõ đuôi -ed trong 'travelled', 'tried'.",
        },
        {
          band: '5.5',
          text: "Yes, I really do. Travelling is a great chance to get away from my busy routine, and I love seeing how people live in other places. Trying the local street food is always my favourite part.\n\nYes, a few times. The most memorable flight was to Bangkok last year. It was delayed by nearly two hours, so I sat and read a book at the gate. But when we finally took off, the view of the clouds was amazing, so I soon forgot about the wait.",
          notesVi:
            "Trả lời câu 1–2. FC: nói trôi chảy, mở rộng ý tự nhiên bằng một câu chuyện nhỏ. LR: cụm từ hay ('get away from my busy routine', 'the most memorable', 'took off'). GRA: kết hợp nhiều thì và câu phức (so, when), gần như không lỗi. P: khi nói lại bài này, nhấn rõ 'MEM-o-ra-ble', 'a-MA-zing'.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: ['Mỗi câu trả lời có ít nhất 2–3 câu không?', 'Bạn có thêm lý do (because) hoặc ví dụ (for example) không?'],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng ít nhất 2 từ của chặng (luggage, delayed, check in...) không?',
            "Bạn có tránh lặp một từ (very, like) quá nhiều lần không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Với câu 'Have you ever...?', bạn đã trả lời 'Yes, I have / No, I haven't' chưa?",
            'Khi kể chuyện đã qua, bạn có dùng quá khứ đơn (went, got, felt) không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Nghe lại bản ghi: âm cuối /t/, /st/ (went, lost, first) có rõ không?',
            'Bạn có nói đủ chậm để người khác nghe rõ không?',
          ],
        },
      ],
      usefulPhrases: [
        "Yes, I have. / No, I haven't, but ...",
        "I've been to ... twice / a few times.",
        'The first time I ... was when I was ...',
        'What I like most about travelling is ...',
        'To be honest, I prefer ... because ...',
        "I'd love to go to ... one day.",
      ],
      targetSounds: [
        'final clusters /st/ and /kt/: lost, first, packed',
        '-ed endings: travelled /d/, missed /t/, visited /ɪd/',
        'word stress: ho-TEL, LUG-gage, a-BROAD',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — NÓI: CÔNG VIỆC VÀ MỘT NGÀY LÀM VIỆC
   * Nói về việc mình làm (work as / for / in, responsible for), nêu sở thích (prefer A to B,
   * I'd rather, It depends). Phát âm: phân biệt /ʃ/ và /s/.
   * ======================================================================== */
  {
    id: 'l2b-g-02-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 12,
    title: { vi: 'Nói: công việc và một ngày làm việc', en: 'Speaking: work and your working day' },
    description: {
      vi: "Nói về công việc (hoặc việc học), đồng nghiệp và cách làm việc; dùng 'responsible for', 'prefer' và 'It depends'.",
      en: "Talk about your work (or studies), colleagues and how you like to work, using 'responsible for', 'prefer' and 'It depends'.",
    },
    teachingCards: [
      {
        title: { vi: 'Nói về việc mình làm', en: 'Talking about what you do' },
        body: {
          vi: "**I work as** + nghề / **I work for** + công ty / **I work in** + phòng ban.\nNói trách nhiệm: **I'm responsible for** + V-ing / danh từ, **I look after**..., **My main job is to**...\nNếu còn đi học: **I'm a student at**... / **I'm in Grade 10**.",
          en: "**I work as** + job / **I work for** + company / **I work in** + department.\nResponsibilities: **I'm responsible for** + -ing / noun, **I look after**..., **My main job is to**...\nIf you study: **I'm a student at**... / **I'm in Grade 10**.",
        },
        examples: [
          {
            en: "I work as a nurse, and I'm responsible for looking after patients at night.",
            vi: 'Tôi là y tá, và tôi phụ trách chăm sóc bệnh nhân vào ban đêm.',
          },
        ],
      },
      {
        title: { vi: "Nêu sở thích: prefer, I'd rather, It depends", en: "Preferences: prefer, I'd rather, It depends" },
        body: {
          vi: "**I prefer** working in a team **to** working alone. (thích A hơn B)\n**I'd rather** + V nguyên mẫu: I'd rather talk face to face.\nKhi câu trả lời là 'còn tuỳ', nói **It depends.** + giải thích: 'It depends on the task. For big projects, I prefer...'\nCách này nghe **tự nhiên** và giúp câu trả lời **dài hơn**.",
          en: "**I prefer** working in a team **to** working alone.\n**I'd rather** + base verb: I'd rather talk face to face.\nWhen the answer is 'both', say **It depends.** + explain: 'It depends on the task. For big projects, I prefer...'\nThis sounds **natural** and makes your answer **longer**.",
        },
        examples: [
          { en: "It depends. For big projects, I'd rather work with other people.", vi: 'Còn tuỳ. Với dự án lớn, tôi thích làm cùng người khác hơn.' },
        ],
      },
      {
        title: { vi: 'Phát âm: /ʃ/ và /s/', en: 'Pronunciation: /ʃ/ and /s/' },
        body: {
          vi: "Nhiều người Việt đọc **/ʃ/** (sh) giống **/s/**. Hai âm này khác nhau!\n**/ʃ/**: chu môi ra, lưỡi lùi lại: **sh**e, **sh**are, **sch**edule (giọng Anh).\n**/s/**: môi dẹt, như tiếng 'xì': **s**ee, **s**ales, offi**ce**.\nTập câu: 'She shares an office with Sam.'",
          en: "Many learners say **/ʃ/** (sh) like **/s/**. They are different sounds!\n**/ʃ/**: round your lips, tongue back: **sh**e, **sh**are, **sch**edule (British).\n**/s/**: flat lips, like a snake: **s**ee, **s**ales, offi**ce**.\nPractise: 'She shares an office with Sam.'",
        },
        examples: [{ en: 'She shares an office with Sam.', vi: 'Cô ấy dùng chung văn phòng với Sam.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-02-speak-ex01',
        type: 'fill-blank',
        sentence: 'I work ___ a receptionist at a hotel.',
        acceptedAnswers: ['as'],
        hint: 'a preposition',
        explanation: {
          vi: 'work as + nghề nghiệp (a receptionist, a teacher...).',
          en: 'Use work as + job.',
        },
      },
      {
        id: 'l2b-g-02-speak-ex02',
        type: 'fill-blank',
        sentence: "I'm responsible for ___ new staff.",
        acceptedAnswers: ['training'],
        hint: '(train)',
        explanation: {
          vi: 'responsible for + V-ing: responsible for training.',
          en: 'After responsible for, use -ing: training.',
        },
      },
      {
        id: 'l2b-g-02-speak-ex03',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I prefer work in a team than work alone.',
          'I prefer working in a team to working alone.',
          'I prefer to working in a team.',
          'I more prefer working in a team.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'prefer + V-ing + to + V-ing (thích A hơn B).',
          en: 'Pattern: prefer + -ing + to + -ing.',
        },
      },
      {
        id: 'l2b-g-02-speak-ex04',
        type: 'multiple-choice',
        question: "'Do you prefer emails or phone calls?' Which answer sounds the most natural?",
        options: [
          'Emails.',
          'It depends. For quick questions, I prefer phone calls, but for important things, I write emails.',
          "I don't know.",
          'Yes, I prefer.',
        ],
        correctIndex: 1,
        explanation: {
          vi: "'It depends' + giải thích hai trường hợp → tự nhiên và đầy đủ.",
          en: "'It depends' plus two examples sounds natural and complete.",
        },
      },
      {
        id: 'l2b-g-02-speak-ex05',
        type: 'arrange-words',
        translationVi: 'Tôi thường có một cuộc họp vào các sáng thứ Hai.',
        correctSentence: 'I usually have a meeting on Monday mornings.',
        extraWords: ['in', 'always'],
        explanation: {
          vi: "Trạng từ tần suất đứng trước động từ thường: usually have. Nói 'on Monday mornings'.",
          en: "Frequency words go before the main verb. Say 'on Monday mornings'.",
        },
      },
      {
        id: 'l2b-g-02-speak-ex06',
        type: 'listen-choose',
        audioText: 'She shares an office with Sam.',
        question: 'What did you hear?',
        options: [
          'She sees an office with Sam.',
          'She shares an office with Sam.',
          'She sells an office with Sam.',
          'See shares an office with Sam.',
        ],
        correctIndex: 1,
        explanation: {
          vi: "Hai âm /ʃ/ ở 'She shares', âm /s/ ở 'Sam'.",
          en: "/ʃ/ in 'She shares', /s/ in 'Sam'.",
        },
      },
      {
        id: 'l2b-g-02-speak-ex07',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu hỏi với câu trả lời phù hợp.', en: 'Match each question with an answer.' },
        pairs: [
          { left: 'What do you do?', right: 'I work as a nurse.' },
          { left: 'Who do you work for?', right: 'A small travel company.' },
          { left: 'What are you responsible for?', right: "Answering customers' emails." },
          { left: 'Do you like your colleagues?', right: "Yes, they're really friendly." },
          { left: 'How often do you have meetings?', right: 'About twice a week.' },
        ],
        explanation: {
          vi: 'Mỗi từ để hỏi cần một kiểu trả lời riêng (nghề, công ty, việc, tần suất).',
          en: 'Each question word needs a different kind of answer.',
        },
      },
      {
        id: 'l2b-g-02-speak-ex08',
        type: 'speak-sentence',
        sentence: 'She shares an office with Sam.',
        translationVi: 'Cô ấy dùng chung văn phòng với Sam.',
        explanation: {
          vi: "Chu môi khi đọc /ʃ/ (She, shares); môi dẹt khi đọc /s/ (Sam).",
          en: "Round your lips for /ʃ/ (She, shares); flat lips for /s/ (Sam).",
        },
      },
      {
        id: 'l2b-g-02-speak-ex09',
        type: 'speak-sentence',
        sentence: 'It depends. I prefer working in a team to working alone.',
        translationVi: 'Còn tuỳ. Tôi thích làm việc nhóm hơn là làm một mình.',
        explanation: {
          vi: "Đọc rõ âm cuối /dz/ trong 'depends' và /ŋ/ trong 'working'.",
          en: "Make the /dz/ in 'depends' and the /ŋ/ in 'working' clear.",
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'What do you do, and what are you responsible for at work or at school?',
        'Do you prefer working in a team or working alone? Why?',
        'What time does your working day or school day usually start?',
        'How do you usually talk to your colleagues or classmates: face to face or online?',
        'Do you often have meetings or group work? Do you enjoy them?',
        'What do you usually chat about with people at work or at school?',
      ],
      bandSamples: [
        {
          band: '3.5',
          text: 'I am accountant. I work for company in Hanoi. I responsible for money and check the paper.\n\nI like work alone. Because team is very noisy and talk many. I can work fast.',
          notesVi:
            "Trả lời câu 1–2. FC: câu ngắn, ý rời rạc, 'Because...' đứng một mình. LR: từ quá chung ('the paper', 'talk many'). GRA: thiếu mạo từ ('am accountant', 'for company'), thiếu 'am' ('I responsible'), sai 'like work'. P: người nói ở mức này hay nuốt âm cuối /t/, /s/.",
        },
        {
          band: '4.5',
          text: "I work as an accountant for a small company in Hanoi. I'm responsible for checking bills and paying our staff every month. It's a bit stressful at the end of the month.\n\nI prefer working alone, because I can concentrate better. When I work in a team, people talk a lot and it takes more time. But sometimes team work is useful for big projects.",
          notesVi:
            "Trả lời câu 1–2. FC: trả lời đủ và có lý do, đôi chỗ còn lặp ý. LR: dùng đúng 'work as', 'responsible for', 'concentrate'; 'team work' nên viết liền 'teamwork'. GRA: câu đúng, có câu phức với 'because', 'when'. P: cần nhấn đúng 'ac-COUN-tant' và đọc rõ âm cuối 'bills', 'projects'.",
        },
        {
          band: '5.5',
          text: "I'm an accountant at a small travel company, so I'm mainly responsible for checking bills and making sure our staff get paid on time. It can be quite stressful at the end of the month, but I like the fact that every number has to be exact.\n\nIt really depends on the task. For detailed work like checking accounts, I'd rather work alone because I can focus better. But when we're planning something new, I prefer working in a team, since other people often come up with ideas I'd never think of.",
          notesVi:
            "Trả lời câu 1–2. FC: trả lời dài, mạch lạc, dùng 'It depends' và giải thích hai phía. LR: cụm tự nhiên ('make sure', 'get paid on time', 'come up with ideas'). GRA: nhiều câu phức (so, because, when, since), gần như không lỗi. P: khi nói lại, nhấn đúng 'ac-COUN-tant', 'de-PENDS' và giữ âm cuối rõ.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: ['Mỗi câu trả lời có ít nhất 2–3 câu không?', "Bạn có dùng 'It depends' hoặc 'because' để nói dài hơn không?"],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ của chặng (department, schedule, deadline, colleague...) không?',
            "Bạn có dùng 'responsible for', 'prefer ... to ...' đúng chỗ không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Bạn có nhớ 'a/an' trước nghề nghiệp (an accountant, a nurse) không?",
            "Câu nào cũng có động từ không (VD: 'I'm responsible', không phải 'I responsible')?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            "Nghe lại: bạn có phân biệt /ʃ/ (she, share) và /s/ (see, sales) không?",
            'Âm cuối -s và -ed có rõ không?',
          ],
        },
      ],
      usefulPhrases: [
        "I work as ... / I'm a student at ...",
        "I'm responsible for + -ing ...",
        'My main job is to ...',
        'I prefer ... to ...',
        "I'd rather ... because ...",
        'It depends on ...',
      ],
      targetSounds: [
        '/ʃ/ vs /s/: she – see, share – Sam',
        'final -s /z/: meetings, colleagues, emails',
        'word stress: ac-COUN-tant, de-PART-ment, re-SPON-si-ble',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — NÓI: TRƯỜNG HỌC VÀ CÁC MÔN HỌC
   * Ngữ pháp theo chương trình phổ thông: so sánh nhất (the most difficult, the easiest),
   * hiện tại hoàn thành cho kinh nghiệm, be going to cho kế hoạch.
   * Phát âm: trọng âm tên môn học.
   * ======================================================================== */
  {
    id: 'l2b-g-03-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 12,
    title: { vi: 'Nói: trường học và các môn học', en: 'Speaking: school and subjects' },
    description: {
      vi: 'Nói về môn học yêu thích, bài tập và kế hoạch học tập; dùng so sánh nhất, hiện tại hoàn thành và be going to.',
      en: 'Talk about favourite subjects, homework and study plans, using superlatives, the present perfect and be going to.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói về môn học: so sánh nhất', en: 'Subjects: superlatives' },
        body: {
          vi: "Môn yêu thích: **My favourite subject is** ... **because** ...\nSo sánh nhất: **the most difficult / the easiest / the most useful** subject.\nVD: 'Physics is **the most difficult** subject **for me**, but it's also **the most interesting**.'\nThêm '**for me**' để cho thấy đây là **ý kiến riêng** — nghe tự nhiên hơn.",
          en: "Favourite: **My favourite subject is** ... **because** ...\nSuperlatives: **the most difficult / the easiest / the most useful** subject.\nE.g. 'Physics is **the most difficult** subject **for me**, but it's also **the most interesting**.'\nAdding '**for me**' shows it's **your opinion**.",
        },
        examples: [{ en: 'Maths is the easiest subject for me.', vi: 'Với mình, toán là môn dễ nhất.' }],
      },
      {
        title: { vi: 'Kinh nghiệm và kế hoạch', en: 'Experience and plans' },
        body: {
          vi: "Kinh nghiệm (không nói thời gian): **I've done** two group projects this year. / **I've never** given a presentation in English.\nCó thời gian cụ thể ('last week') → **quá khứ đơn**: I **did** a project last week.\nKế hoạch: **I'm going to** join the English club.",
          en: "Experience (no specific time): **I've done** two group projects this year. / **I've never** given a presentation in English.\nWith a specific time ('last week') → **past simple**: I **did** a project last week.\nPlans: **I'm going to** join the English club.",
        },
        examples: [
          {
            en: "I've never given a presentation in English, but I'm going to try.",
            vi: 'Mình chưa thuyết trình bằng tiếng Anh bao giờ, nhưng mình sẽ thử.',
          },
        ],
      },
      {
        title: { vi: 'Phát âm: trọng âm tên môn học', en: 'Pronunciation: stress in subject names' },
        body: {
          vi: "Nhấn sai trọng âm làm người nghe khó hiểu:\n**MATHS**, **HIS**-to-ry, **LIT**-er-a-ture, **CHEM**-is-try, **PHY**-sics\nge-**O**-gra-phy, bi-**O**-lo-gy\nĐọc **âm nhấn** to hơn, dài hơn; các âm còn lại nhẹ và nhanh.",
          en: "Wrong stress makes words hard to understand:\n**MATHS**, **HIS**-to-ry, **LIT**-er-a-ture, **CHEM**-is-try, **PHY**-sics\nge-**O**-gra-phy, bi-**O**-lo-gy\nSay the **stressed** syllable louder and longer; say the others quickly.",
        },
        examples: [{ en: 'I love geography and biology.', vi: 'Mình rất thích địa và sinh.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-03-speak-ex01',
        type: 'fill-blank',
        sentence: 'Physics is the ___ difficult subject for me.',
        acceptedAnswers: ['most'],
        explanation: {
          vi: 'Tính từ dài (difficult) → the most difficult.',
          en: 'Long adjective: the most difficult.',
        },
      },
      {
        id: 'l2b-g-03-speak-ex02',
        type: 'fill-blank',
        sentence: 'English is the ___ subject for me. I always get good marks.',
        acceptedAnswers: ['easiest'],
        hint: '(easy)',
        explanation: {
          vi: 'easy → the easiest (đổi y thành i rồi thêm -est).',
          en: 'easy → the easiest (y becomes i).',
        },
      },
      {
        id: 'l2b-g-03-speak-ex03',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I have done a project last month.',
          'I did a project last month.',
          'I have did a project last month.',
          'I doing a project last month.',
        ],
        correctIndex: 1,
        explanation: {
          vi: "Có 'last month' (thời gian cụ thể) → quá khứ đơn: did.",
          en: "'Last month' is a specific time, so use the past simple.",
        },
      },
      {
        id: 'l2b-g-03-speak-ex04',
        type: 'multiple-choice',
        question: "Your plan for next year: 'I ___ join the school English club.'",
        options: ['am going to', 'have', 'did', 'was'],
        correctIndex: 0,
        explanation: {
          vi: 'Kế hoạch đã định → be going to + V.',
          en: 'A plan uses be going to + verb.',
        },
      },
      {
        id: 'l2b-g-03-speak-ex05',
        type: 'arrange-words',
        translationVi: 'Mình chưa bao giờ thuyết trình bằng tiếng Anh.',
        correctSentence: "I've never given a presentation in English.",
        extraWords: ['ever', 'gave'],
        explanation: {
          vi: 'have never + V3: never given (không dùng gave).',
          en: "have never + past participle: 'given', not 'gave'.",
        },
      },
      {
        id: 'l2b-g-03-speak-ex06',
        type: 'listen-choose',
        audioText: 'Geography is my favourite subject, but biology is the most difficult.',
        question: 'Which subject is the most difficult for the speaker?',
        options: ['Geography', 'Biology', 'History', 'Physics'],
        correctIndex: 1,
        explanation: {
          vi: "Sau 'but': 'biology is the most difficult'. Địa là môn yêu thích.",
          en: "After 'but': biology is the most difficult.",
        },
      },
      {
        id: 'l2b-g-03-speak-ex07',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu hỏi với câu trả lời phù hợp.', en: 'Match each question with a good answer.' },
        pairs: [
          { left: "What's your favourite subject?", right: "It's definitely literature, because I love stories." },
          { left: 'Which subject is the hardest for you?', right: "For me, it's chemistry. There are so many formulas." },
          { left: 'Have you ever done a group project?', right: 'Yes, I have. We did one about plastic last term.' },
          { left: 'What are you going to study next year?', right: "I'm going to choose more science subjects." },
          { left: 'How much homework do you get?', right: 'About two hours every evening.' },
        ],
        explanation: {
          vi: 'Câu trả lời dùng đúng thì của câu hỏi (have done → did, going to → going to).',
          en: 'Each answer uses the right tense for its question.',
        },
      },
      {
        id: 'l2b-g-03-speak-ex08',
        type: 'speak-sentence',
        sentence: 'Biology is the most interesting subject for me.',
        translationVi: 'Với mình, sinh học là môn thú vị nhất.',
        explanation: {
          vi: 'Nhấn bi-O-lo-gy và IN-tres-ting.',
          en: 'Stress bi-O-lo-gy and IN-tres-ting.',
        },
      },
      {
        id: 'l2b-g-03-speak-ex09',
        type: 'speak-sentence',
        sentence: "I'm going to study harder for my exams this year.",
        translationVi: 'Năm nay mình sẽ học chăm hơn cho các kỳ thi.',
        explanation: {
          vi: "Đọc rõ /z/ cuối 'exams'; 'going to' có thể đọc nhanh và nhẹ.",
          en: "Say the /z/ at the end of 'exams'; 'going to' can be quick and light.",
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        "What's your favourite subject at school? Why?",
        'Which subject do you find the most difficult?',
        'How much homework do you usually get?',
        'What do you usually do at break time?',
        'Have you ever done a group project? How was it?',
        'What are you going to do to improve your English this year?',
      ],
      bandSamples: [
        {
          band: '3.5',
          text: 'My favourite subject is English. Because it is interesting and I like the teacher. She very kind.\n\nThe most difficult subject is maths. Maths is very difficult. I don\'t understand. I get bad mark.',
          notesVi:
            "Trả lời câu 1–2. FC: trả lời ngắn, lặp ý ('Maths is very difficult'), 'Because...' đứng một mình. LR: từ rất cơ bản (interesting, difficult, kind). GRA: thiếu 'is' ('She very kind'), thiếu 'a' và -s ('I get bad mark'). P: cần nhấn đúng trọng âm tên môn học và đọc rõ âm cuối.",
        },
        {
          band: '4.5',
          text: "My favourite subject is English, because I can use it to watch films and talk to people from other countries. Also, my English teacher is very funny, so the lessons are never boring.\n\nI think chemistry is the most difficult subject for me. There are many formulas and I always forget them. I've failed two tests this term, so I'm going to ask my teacher for help.",
          notesVi:
            "Trả lời câu 1–2. FC: trả lời rõ, có lý do và kết quả. LR: có từ tốt ('formulas', 'never boring') nhưng còn lặp 'very'. GRA: dùng đúng hiện tại hoàn thành ('I've failed') và 'going to'; câu chủ yếu nối bằng 'and', 'so'. P: cần đọc rõ cụm âm cuối 'tests' /sts/ và nhấn 'CHEM-is-try'.",
        },
        {
          band: '5.5',
          text: "It's definitely English. I love the fact that it opens so many doors: I can follow online courses, understand song lyrics and even chat with gamers from other countries. Our teacher also makes the lessons really interactive, so time flies.\n\nFor me, the most challenging subject is chemistry. It's not that I don't like it, but there are so many formulas to remember. I've already failed one test this term, so I've started making flashcards and revising a little every evening, and I think it's working.",
          notesVi:
            "Trả lời câu 1–2. FC: nói dài, tự nhiên, có lý do và ví dụ cụ thể. LR: cụm phong phú ('opens so many doors', 'time flies', 'challenging'). GRA: dùng linh hoạt hiện tại hoàn thành và câu phức, gần như không lỗi. P: khi nói lại, nhấn 'DEF-i-nite-ly', 'in-ter-AC-tive' và giữ ngữ điệu tự nhiên.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: ['Mỗi câu trả lời có ít nhất 2–3 câu không?', 'Bạn có nói lý do (because) cho môn mình thích / thấy khó không?'],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ của chặng (project, presentation, mark, hand in...) không?',
            "Bạn có thay 'very difficult' bằng từ khác như 'challenging', 'the hardest' không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Bạn có dùng đúng so sánh nhất (the most ..., the ...-est) không?',
            "Bạn có dùng 'have done' cho kinh nghiệm và 'going to' cho kế hoạch không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Nghe lại: tên môn học có nhấn đúng trọng âm (ge-O-gra-phy, LIT-er-a-ture) không?',
            "Âm cuối -s trong 'subjects', 'tests', 'exams' có rõ không?",
          ],
        },
      ],
      usefulPhrases: [
        'My favourite subject is ... because ...',
        "For me, the most difficult subject is ...",
        "I'm (not) very good at ...",
        "I've already ... / I've never ...",
        "I'm going to ... this year.",
        'At break time, I usually ...',
      ],
      targetSounds: [
        'word stress: ge-O-gra-phy, bi-O-lo-gy, LIT-er-a-ture',
        'final -s: tests /sts/, subjects /kts/, exams /mz/',
        '/θ/ in maths and think (not /t/)',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — NÓI: PHIM, NHẠC VÀ TIN TỨC
   * Nêu ý kiến (I'm really into..., I'm not a big fan of...), giới thiệu phim 3 bước,
   * tính từ -ing để nêu lý do. Phát âm: trọng âm và ngữ điệu của tính từ cảm xúc.
   * ======================================================================== */
  {
    id: 'l2b-g-04-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 12,
    title: { vi: 'Nói: phim, nhạc và tin tức', en: 'Speaking: films, music and news' },
    description: {
      vi: 'Nói về phim và nhạc bạn thích, cách bạn theo dõi tin tức, và giới thiệu một bộ phim cho người khác.',
      en: 'Talk about the films and music you like, how you follow the news, and recommend a film to someone.',
    },
    teachingCards: [
      {
        title: { vi: 'Nêu ý kiến + lý do', en: 'Opinion + reason' },
        body: {
          vi: "Mẫu: **I'm really into** + danh từ / V-ing (mình rất mê...) / **I'm not a big fan of**... (không mê lắm)\nNêu lý do bằng tính từ -ing: '... **because** they're **exciting** / **relaxing** / **moving**.'\nThêm ví dụ: '**For example**, I recently watched...'",
          en: "Use: **I'm really into** + noun / -ing / **I'm not a big fan of**...\nGive a reason with an -ing adjective: '... **because** they're **exciting** / **relaxing** / **moving**.'\nAdd an example: '**For example**, I recently watched...'",
        },
        examples: [
          { en: "I'm really into Korean dramas because the stories are so moving.", vi: 'Mình rất mê phim Hàn vì câu chuyện rất cảm động.' },
        ],
      },
      {
        title: { vi: 'Giới thiệu phim hoặc bài hát', en: 'Recommending a film or a song' },
        body: {
          vi: "3 bước: **Tên + loại**: 'It's a comedy called...' → **Vì sao hay**: 'The actors are brilliant.' → **Hợp với ai**: 'You should watch it if you like...'\nKhông kể hết cốt truyện — **no spoilers!** (đừng tiết lộ kết thúc).",
          en: "Three steps: **Name + type**: 'It's a comedy called...' → **Why it's good**: 'The actors are brilliant.' → **Who it's for**: 'You should watch it if you like...'\nDon't tell the whole story — **no spoilers!**",
        },
        examples: [{ en: 'You should watch it if you like animals.', vi: 'Bạn nên xem nếu bạn thích động vật.' }],
      },
      {
        title: { vi: 'Phát âm: tính từ cảm xúc', en: 'Pronunciation: feeling adjectives' },
        body: {
          vi: "Tính từ cảm xúc phải **nhấn đúng** mới nghe tự nhiên:\n**IN**-tres-ting (3 âm tiết), ex-**CI**-ting, a-**MA**-zing, re-**LAX**-ing, sur-**PRI**-sing\nNói **có cảm xúc**: giọng lên cao ở âm nhấn — 'It was a-**MA**-zing!'",
          en: "Feeling adjectives need the **right stress**:\n**IN**-tres-ting (three syllables), ex-**CI**-ting, a-**MA**-zing, re-**LAX**-ing, sur-**PRI**-sing\nSay them **with feeling**: your voice goes up on the stressed syllable — 'It was a-**MA**-zing!'",
        },
        examples: [{ en: 'The ending was really surprising!', vi: 'Đoạn kết thật bất ngờ!' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-04-speak-ex01',
        type: 'fill-blank',
        sentence: "I'm really ___ action films. I watch one every weekend.",
        acceptedAnswers: ['into'],
        hint: "I'm really ... = I love",
        explanation: {
          vi: "be into something = rất thích, rất mê cái gì.",
          en: "'Be into something' means you really like it.",
        },
      },
      {
        id: 'l2b-g-04-speak-ex02',
        type: 'multiple-choice',
        question: 'The music in that café is very ___. I always feel calm there.',
        options: ['relaxed', 'relaxing', 'relax', 'relaxes'],
        correctIndex: 1,
        explanation: {
          vi: 'Tả âm nhạc (sự vật gây cảm xúc) → -ing: relaxing.',
          en: 'Music causes the feeling, so use -ing: relaxing.',
        },
      },
      {
        id: 'l2b-g-04-speak-ex03',
        type: 'multiple-choice',
        question: 'Which is the best way to recommend a film?',
        options: [
          'Watch it.',
          "It's a comedy called Family Trip. The actors are really funny, and you should watch it if you need a laugh.",
          'The film is a film.',
          'At the end, the boy finds the treasure and goes home.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Có tên + loại phim + lý do + ai nên xem. Câu cuối tiết lộ kết thúc (spoiler).',
          en: 'It gives name, type, reason and who should watch. The last one is a spoiler.',
        },
      },
      {
        id: 'l2b-g-04-speak-ex04',
        type: 'arrange-words',
        translationVi: 'Bạn nên xem nếu bạn thích động vật.',
        correctSentence: 'You should watch it if you like animals.',
        extraWords: ['to', 'liking'],
        explanation: {
          vi: 'should + V nguyên mẫu (không có to): should watch.',
          en: "After 'should', use the base verb without 'to'.",
        },
      },
      {
        id: 'l2b-g-04-speak-ex05',
        type: 'listen-choose',
        audioText: 'I usually read the news on my phone on the way to work.',
        question: 'How does the speaker usually get the news?',
        options: ['On TV', 'In a newspaper', 'On the phone', 'On the radio'],
        correctIndex: 2,
        explanation: {
          vi: "'read the news on my phone' = đọc tin trên điện thoại.",
          en: "The speaker reads the news 'on my phone'.",
        },
      },
      {
        id: 'l2b-g-04-speak-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối loại phim với mô tả.', en: 'Match each kind of film with its description.' },
        pairs: [
          { left: 'comedy', right: 'makes you laugh' },
          { left: 'horror film', right: 'makes you scared' },
          { left: 'documentary', right: 'shows real facts' },
          { left: 'animated film', right: 'uses drawings or computer pictures' },
          { left: 'love story', right: 'is about two people in love' },
        ],
        explanation: {
          vi: 'Biết tên loại phim giúp bạn trả lời câu hỏi về sở thích nhanh hơn.',
          en: 'Knowing film types helps you answer questions faster.',
        },
      },
      {
        id: 'l2b-g-04-speak-ex07',
        type: 'listen-choose',
        audioText: 'The ending was really surprising.',
        question: "Which syllable is stressed in 'surprising'?",
        options: ['SUR-pri-sing', 'sur-PRI-sing', 'sur-pri-SING'],
        correctIndex: 1,
        explanation: {
          vi: "'surprising' nhấn âm thứ hai: sur-PRI-sing.",
          en: "'Surprising' is stressed on the second syllable.",
        },
      },
      {
        id: 'l2b-g-04-speak-ex08',
        type: 'speak-sentence',
        sentence: "I'm really into music from the nineties.",
        translationVi: 'Mình rất mê nhạc thập niên chín mươi.',
        explanation: {
          vi: "Nối âm 'really into' và đọc rõ /z/ cuối 'nineties'.",
          en: "Link 'really into' and say the /z/ at the end of 'nineties'.",
        },
      },
      {
        id: 'l2b-g-04-speak-ex09',
        type: 'speak-sentence',
        sentence: 'It was amazing! You should watch it.',
        translationVi: 'Phim tuyệt lắm! Bạn nên xem đi.',
        explanation: {
          vi: 'Lên giọng ở a-MA-zing để thể hiện cảm xúc.',
          en: 'Your voice goes up on a-MA-zing to show feeling.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'What kinds of films do you enjoy? Why?',
        'Do you prefer watching films at home or at the cinema?',
        'What kind of music do you listen to, and when?',
        'How do you usually find out about the news?',
        'Can you recommend a good film or song to me?',
        'Do you think people read more news on their phones now than in the past?',
      ],
      bandSamples: [
        {
          band: '3.5',
          text: 'I like action film. Because it very exciting and have many fighting. I watch every weekend.\n\nI like watch at home. Cinema is expensive and far. At home I can eat and sleep.',
          notesVi:
            "Trả lời câu 1–2. FC: câu ngắn, ít liên kết, 'Because...' đứng một mình. LR: từ vựng hạn chế ('many fighting'). GRA: thiếu -s ('action film'), thiếu 'is' ('it very exciting'), sai 'have' → 'has', sai 'like watch'. P: cần đọc rõ âm cuối trong 'films', 'weekends'.",
        },
        {
          band: '4.5',
          text: 'I enjoy comedies the most, because they help me relax after a long day. For example, last week I watched a comedy about a family trip, and I laughed a lot.\n\nI prefer watching films at home. It is cheaper and more comfortable, and I can stop the film when I want. But for big action films, the cinema is better because the sound is amazing.',
          notesVi:
            "Trả lời câu 1–2. FC: trả lời rõ ràng, có lý do và ví dụ. LR: dùng được 'comfortable', 'amazing' nhưng còn đơn giản. GRA: so sánh hơn đúng ('cheaper', 'more comfortable'), có câu phức với 'because'. P: nhấn đúng 'COM-e-dies', 'COM-fort-a-ble' để nghe tự nhiên.",
        },
        {
          band: '5.5',
          text: "I'm really into comedies, especially the ones about family life. After a long day, I just want something light that makes me laugh. I recently watched one about three brothers running a noodle shop, and honestly, I couldn't stop laughing.\n\nTo be honest, it depends. For most films, I'd rather stay at home, because it's cheaper and I can pause whenever I want. But if it's a big action film with amazing special effects, it's definitely worth seeing on the big screen.",
          notesVi:
            "Trả lời câu 1–2. FC: nói trôi chảy, mở rộng ý bằng ví dụ thật. LR: cụm tự nhiên ('I'm really into', 'something light', 'worth seeing on the big screen'). GRA: câu phức đa dạng (if, because, whenever), gần như không lỗi. P: khi nói lại, giữ ngữ điệu có cảm xúc ở 'couldn't stop laughing', 'a-MA-zing'.",
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: ['Mỗi câu trả lời có ít nhất 2–3 câu không?', 'Bạn có kể một ví dụ thật (một bộ phim, bài hát cụ thể) không?'],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ của chặng (comedy, documentary, soundtrack, episode...) không?',
            "Bạn có dùng tính từ mạnh (amazing, moving, gripping) thay cho 'good' không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Bạn có dùng đúng -ed / -ing (bored ≠ boring) không?',
            "Sau 'should', 'can' bạn có dùng động từ nguyên mẫu không?",
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Nghe lại: tính từ cảm xúc có nhấn đúng (ex-CI-ting, a-MA-zing) không?',
            'Giọng bạn có lên xuống tự nhiên, có cảm xúc không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'm really into ... / I'm not a big fan of ...",
        'My favourite kind of film is ... because ...',
        'I recently watched / listened to ...',
        "It's worth watching / listening to.",
        'You should watch it if you like ...',
        'To be honest, it depends.',
      ],
      targetSounds: [
        'word stress: IN-tres-ting, ex-CI-ting, sur-PRI-sing',
        'final -s /z/: films, songs, comedies',
        'linking: really into, watch it, find out',
      ],
    },
    miniTest: [],
  },
]
