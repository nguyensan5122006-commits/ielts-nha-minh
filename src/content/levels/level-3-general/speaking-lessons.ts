/**
 * speaking-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * BÀI NÓI (mode 'speaking') — bài THỨ TƯ của mỗi chặng
 * ----------------------------------------------------------------------------
 * Nói tiếng Anh trong đời thật: giới thiệu bản thân khi đi làm, kể chuyện du lịch,
 * bàn về tin tức, nói về phim – nhạc, khuyên bạn bè. Câu hỏi theo kiểu IELTS
 * Speaking Part 1 (câu ngắn, đời thường) và Part 3 (bàn luận, nêu quan điểm),
 * nhưng mục tiêu là giao tiếp thật chứ không phải luyện thi.
 *
 * Danh sách bài:
 *   l3-g-u1-speak  Nói về công việc và giới thiệu bản thân   (Part 1)
 *   l3-g-u2-speak  Kể về chuyến đi và sự cố                  (Part 1)
 *   l3-g-u3-speak  Bàn về tin tức và thông tin               (Part 3)
 *   l3-g-u4-speak  Nói về phim, nhạc và sở thích             (Part 1)
 *   l3-g-u5-speak  Đời sống: lời khuyên và câu chuyện        (Part 3)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2–3 thẻ (cách trả lời dài hơn + ngữ pháp + phát âm)
 *   - exercises     : 10 bài khởi động, có 2 câu đọc to (speak-sentence)
 *                     và đúng 1 câu nói tự do (speak-answer, AI chấm)
 *   - speakingTask  : 5 câu hỏi + 3 bài mẫu theo mức "4.5" (cơ bản) / "5.5" (khá) / "6.5" (tốt)
 *                     có nhận xét theo 4 tiêu chí FC – LR – GRA – P,
 *                     checklist tự chấm, cụm từ hữu ích, âm cần luyện
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Bài mẫu mức 4.5 CỐ Ý có lỗi điển hình của người Việt (thiếu -s, sai thì, thiếu mạo từ,
 * câu cụt, "um/uh") để người học nhận ra và tránh.
 * Quy ước id: bài "l3-g-u<chặng>-speak", bài tập "...-ex<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level3GeneralSpeakingLessons: Lesson[] = [
  /* ==========================================================================
   * CHẶNG 1 — NÓI VỀ CÔNG VIỆC VÀ GIỚI THIỆU BẢN THÂN
   * Trọng tâm: câu trả lời 4 bước (Answer – Reason – Example – Contrast),
   *            I've been working… for/since…, trọng âm từ chỉ công việc.
   * ======================================================================== */
  {
    id: 'l3-g-u1-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: 'Nói về công việc và giới thiệu bản thân', en: 'Talking about work and presenting yourself' },
    description: {
      vi: 'Trả lời câu hỏi về công việc hoặc việc học như khi phỏng vấn: kinh nghiệm, điểm mạnh và quan điểm về cách làm việc.',
      en: 'Answer questions about your job or studies as in an interview: experience, strengths and views on working life.',
    },
    teachingCards: [
      {
        title: { vi: 'Giới thiệu bản thân như người đi làm', en: 'Presenting yourself professionally' },
        body: {
          vi: 'Công việc: **I\'m currently working as** + nghề / **I work for** + công ty / **I\'m in charge of** + việc.\nKinh nghiệm (vẫn đang làm): **I\'ve been working there for** three years / **since** 2022.\nĐiểm mạnh + bằng chứng: **One of my strengths is… For example, last year I…**',
          en: 'Your job: **I\'m currently working as** + job / **I work for** + company / **I\'m in charge of** + task.\nExperience (still true now): **I\'ve been working there for** three years / **since** 2022.\nStrength + proof: **One of my strengths is… For example, last year I…**',
        },
        examples: [
          { en: "I've been working as a receptionist for two years.", vi: 'Tôi làm lễ tân được hai năm rồi.' },
          { en: "I'm in charge of training new staff.", vi: 'Tôi phụ trách đào tạo nhân viên mới.' },
        ],
      },
      {
        title: { vi: 'Câu trả lời 4 bước', en: 'A four-step answer' },
        body: {
          vi: 'Mở rộng công thức A + R + E đã học: **Answer** (trả lời) → **Reason** (lý do) → **Example** (chuyện thật, ngắn) → **Contrast** (một ý "mặt khác").\nVD: "I prefer teamwork **because**… **For instance**, … **That said**, I do need quiet time to…"\nBước Contrast làm câu trả lời nghe **chín chắn** hơn.',
          en: 'Extend the A + R + E formula: **Answer** → **Reason** → **Example** (a short, real story) → **Contrast** (the other side).\nE.g. "I prefer teamwork **because**… **For instance**, … **That said**, I do need quiet time to…"\nThe Contrast step makes you sound more **thoughtful**.',
        },
      },
      {
        title: { vi: 'Trọng âm từ chỉ công việc', en: 'Word stress in work words' },
        body: {
          vi: 'Nhấn sai trọng âm làm người nghe khó hiểu hơn cả sai ngữ pháp:\n**COL**-league, ex-**PE**-ri-ence, **MAN**-a-ger, de-**VEL**-op, re-**SPON**-si-ble, pre-sen-**TA**-tion.\nÂm không nhấn đọc **nhẹ và ngắn**, thường thành /ə/.',
          en: 'Wrong word stress confuses listeners more than grammar mistakes:\n**COL**-league, ex-**PE**-ri-ence, **MAN**-a-ger, de-**VEL**-op, re-**SPON**-si-ble, pre-sen-**TA**-tion.\nUnstressed syllables are **short and light**, often /ə/.',
        },
        examples: [
          { en: 'I have five years of experience as a manager.', vi: 'Tôi có năm năm kinh nghiệm làm quản lý.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u1-speak-ex01',
        type: 'multiple-choice',
        question: 'Which answer to "What do you do?" sounds the most natural?',
        options: [
          'I am a worker.',
          "I'm currently working as a sales assistant in an electronics shop.",
          'I do work.',
          'My work is a sales assistant.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"I\'m currently working as + nghề + ở đâu" rõ ràng và tự nhiên.',
          en: '"I\'m currently working as + job + place" is clear and natural.',
        },
      },
      {
        id: 'l3-g-u1-speak-ex02',
        type: 'fill-blank',
        sentence: "I've been working at this company ___ 2021.",
        acceptedAnswers: ['since'],
        explanation: {
          vi: '"since" + mốc thời gian (2021, last May).',
          en: '"since" + a point in time (2021, last May).',
        },
      },
      {
        id: 'l3-g-u1-speak-ex03',
        type: 'fill-blank',
        sentence: "I've been working there ___ about three years.",
        acceptedAnswers: ['for'],
        explanation: {
          vi: '"for" + khoảng thời gian (three years, a long time).',
          en: '"for" + a length of time (three years, a long time).',
        },
      },
      {
        id: 'l3-g-u1-speak-ex04',
        type: 'multiple-choice',
        question: 'Which word is stressed on the SECOND syllable?',
        options: ['colleague', 'manager', 'experience', 'office'],
        correctIndex: 2,
        explanation: {
          vi: 'ex-PE-ri-ence nhấn âm 2; COL-league, MAN-a-ger, OF-fice nhấn âm 1.',
          en: 'ex-PE-ri-ence; the others are stressed first: COL-league, MAN-a-ger, OF-fice.',
        },
      },
      {
        id: 'l3-g-u1-speak-ex05',
        type: 'arrange-words',
        translationVi: 'Tôi phụ trách đào tạo nhân viên mới.',
        correctSentence: "I'm in charge of training new staff.",
        extraWords: ['for', 'train'],
        explanation: {
          vi: '"be in charge of + V-ing" = phụ trách việc gì.',
          en: '"be in charge of + -ing" = be responsible for a task.',
        },
      },
      {
        id: 'l3-g-u1-speak-ex06',
        type: 'multiple-choice',
        question: '"Do you prefer working alone or in a team?" Which answer includes a good CONTRAST step?',
        options: [
          'In a team. I like people.',
          'In a team, because I learn from others. That said, I need some quiet time to write reports.',
          'Alone. Teams are bad.',
          'Both are good, I think, yes.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Có trả lời, lý do và "That said…" nêu mặt khác: câu trả lời chín chắn.',
          en: 'It answers, gives a reason, then "That said…" adds the other side.',
        },
      },
      {
        id: 'l3-g-u1-speak-ex07',
        type: 'multiple-choice',
        question: 'Which phrase introduces an EXAMPLE?',
        options: ['For instance,', 'That said,', 'On the other hand,', 'To be honest,'],
        correctIndex: 0,
        explanation: {
          vi: '"For instance" = "For example". "That said", "On the other hand" nêu mặt khác.',
          en: '"For instance" = "For example". The others introduce a contrast or opinion.',
        },
      },
      {
        id: 'l3-g-u1-speak-ex08',
        type: 'speak-sentence',
        sentence: "I've been working as a receptionist for two years.",
        translationVi: 'Tôi làm lễ tân được hai năm rồi.',
        explanation: {
          vi: 'Nhấn re-CEP-tion-ist. Đọc rõ /v/ trong "I\'ve" và /z/ cuối "years".',
          en: 'Stress re-CEP-tion-ist. Say the /v/ in "I\'ve" and the /z/ in "years".',
        },
      },
      {
        id: 'l3-g-u1-speak-ex09',
        type: 'speak-sentence',
        sentence: 'One of my strengths is that I stay calm with difficult customers.',
        translationVi: 'Một trong những điểm mạnh của tôi là giữ bình tĩnh với khách hàng khó tính.',
        explanation: {
          vi: 'Cụm âm /ŋθs/ trong "strengths"; đọc rõ /z/ cuối "customers".',
          en: 'Say the /ŋθs/ cluster in "strengths" and the final /z/ in "customers".',
        },
      },
      {
        id: 'l3-g-u1-speak-ex10',
        type: 'speak-answer',
        question: 'Tell me a little about your job or your studies. What do you like most about it?',
        tipsVi:
          'Nói theo 4 bước: bạn làm/học gì (I\'m currently…) → điều bạn thích nhất + lý do → 1 ví dụ thật → 1 ý "That said…". Nhấn đúng trọng âm các từ công việc. Nói 30–60 giây.',
        sampleAnswer:
          "I'm currently working as an accountant for a small furniture company in Da Nang. What I like most is that every day is a bit different, because I deal with suppliers, customers and our own team. For instance, last week I helped my manager plan the budget for a new showroom, which was really interesting. That said, the end of the month can be quite stressful, because everything has to be finished on time.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt có đủ: trả lời + lý do + ví dụ thật + một ý trái chiều.',
          en: 'A good answer has an answer, a reason, a real example and a contrast.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'What do you do? Do you work or are you a student?',
        'What do you like most about your job or your studies?',
        'Would you rather work in a team or on your own? Why?',
        'What makes someone a good colleague, in your opinion?',
        'Do you think more people will work from home in the future? Why or why not?',
      ],
      bandSamples: [
        {
          band: '4.5',
          text:
            "Q: What do you like most about your job?\nA: Um... I like my job because it is interesting. I work in office, uh, in a bank. My colleague is very friendly and help me a lot. I like it very much.\n\nQ: Would you rather work in a team or on your own?\nA: Team. Because, um... team is more fun. When I work alone I feel boring. So I like team more than alone.\n\nQ: Will more people work from home in the future?\nA: Yes, I think yes. Because the internet is good now. And, um... people don't like traffic. So they work at home more.",
          notesVi:
            'Mức cơ bản (khoảng 4.5). FC: trả lời được nhưng rất ngắn, ngập ngừng nhiều ("um", "uh") và lặp ý. LR: từ đơn giản (interesting, fun) và dùng sai "I feel boring" (phải là bored). GRA: lỗi cơ bản như thiếu mạo từ "in office", thiếu -s "help", "I think yes". P: cần đọc rõ âm cuối và nhấn đúng COL-league.',
        },
        {
          band: '5.5',
          text:
            "Q: What do you like most about your job?\nA: Well, I work as a receptionist in a hotel, and what I like most is meeting people from many countries. Every day I talk with guests, so my English is improving. But sometimes it's tiring because I have to work at night.\n\nQ: Would you rather work in a team or on your own?\nA: I prefer to work in a team, because we can share ideas and help each other. For example, when our hotel was very busy in Tet holiday, my team divided the work and we finished everything on time. But working alone is also good when you need to concentrate.\n\nQ: Will more people work from home in the future?\nA: I think yes, more people will work from home, because technology is more and more developed. It saves time for travelling. However, some jobs like doctor or waiter cannot do at home, so not everyone can work from home.",
          notesVi:
            'Mức khá (khoảng 5.5). FC: câu trả lời đủ dài, có lý do, ví dụ và từ nối (because, for example, however), nhưng từ nối hơi "sách vở". LR: đủ dùng (share ideas, concentrate) nhưng có cách nói chưa tự nhiên: "technology is more and more developed". GRA: còn lỗi "in Tet holiday" (during Tet), "jobs… cannot do at home" (cannot be done).',
        },
        {
          band: '6.5',
          text:
            "Q: What do you like most about your job?\nA: I'd say it's the variety. I work in customer service for an online furniture shop, so one minute I'm sorting out a delivery problem and the next I'm helping someone choose a sofa. It keeps me on my toes. The only downside is that some customers can be quite demanding, but I've learned not to take it personally.\n\nQ: Would you rather work in a team or on your own?\nA: On the whole, I'd go for a team. I find I come up with better ideas when I can bounce them off other people, and it's more motivating. That said, I do need a bit of quiet time on my own, especially when I'm writing reports, because constant interruptions really slow me down.\n\nQ: Will more people work from home in the future?\nA: Probably, yes, at least for part of the week. Most people I know would happily skip the commute, and companies can save money on office space. But I don't think offices will disappear completely, because a lot of learning happens informally, just by sitting next to more experienced colleagues.",
          notesVi:
            'Mức tốt (khoảng 6.5). FC: nói trôi chảy, mỗi ý có lý do và mặt trái (That said, But I don\'t think…). LR: cụm tự nhiên như keeps me on my toes, bounce ideas off, skip the commute. GRA: câu phức đa dạng, gần như không lỗi. Muốn cao hơn: thêm ví dụ cá nhân cụ thể cho câu cuối.',
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi câu trả lời có ít nhất 2–3 câu (không chỉ "Yes" hay "No") không?',
            'Bạn có dùng từ nối như because, for instance, that said không?',
            'Bạn có nói liền mạch, không dừng quá lâu giữa các câu không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng ít nhất 2 cụm từ công việc của chặng (meet a deadline, be in charge of…) không?',
            'Bạn có tránh lặp một từ (good, interesting) quá nhiều lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Bạn có dùng đúng "I\'ve been working… for / since…" không?',
            'Động từ sau he / she / it / my colleague có thêm -s không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Bạn có nhấn đúng COL-league, ex-PE-ri-ence, MAN-a-ger không?',
            'Âm cuối (-s, -t, -k) có được đọc rõ, không bị nuốt mất không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'm currently working as…",
        "I've been working there for… / since…",
        "I'm in charge of…",
        'What I like most about it is…',
        "On the whole, I'd rather…",
        'For instance, …',
        'That said, …',
        "I'd say…",
      ],
      targetSounds: [
        'word stress: COL-league, ex-PE-ri-ence, MAN-a-ger',
        'final -s: works, colleagues, customers',
        'final cluster /ŋθs/ in "strengths"',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 2 — KỂ VỀ CHUYẾN ĐI VÀ SỰ CỐ
   * Trọng tâm: kể chuyện quá khứ (quá khứ tiếp diễn làm bối cảnh + quá khứ đơn),
   *            từ nối thời gian, phát âm đuôi -ed (/t/ /d/ /ɪd/).
   * ======================================================================== */
  {
    id: 'l3-g-u2-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: 'Kể về chuyến đi và sự cố', en: 'Talking about trips and travel problems' },
    description: {
      vi: 'Kể lại trải nghiệm du lịch ở quá khứ, nói về cách bạn lên kế hoạch và xử lý sự cố.',
      en: 'Describe past travel experiences, how you plan trips and how you deal with problems.',
    },
    teachingCards: [
      {
        title: { vi: 'Kể chuyện du lịch cho sinh động', en: 'Telling a travel story' },
        body: {
          vi: 'Dựng bối cảnh bằng **quá khứ tiếp diễn**: "We **were waiting** for the bus…"\nSự việc chính bằng **quá khứ đơn**: "…when it suddenly **started** to rain."\nNối các bước: **At first… / Then… / Luckily… / In the end…**\nKết bằng **cảm nghĩ**: "**Looking back**, it was actually quite funny."',
          en: 'Set the scene with the **past continuous**: "We **were waiting** for the bus…"\nTell the main event in the **past simple**: "…when it suddenly **started** to rain."\nLink the steps: **At first… / Then… / Luckily… / In the end…**\nFinish with a **feeling**: "**Looking back**, it was actually quite funny."',
        },
        examples: [
          { en: 'We were riding back to the hotel when the bike broke down.', vi: 'Chúng tôi đang chạy xe về khách sạn thì xe hỏng.' },
          { en: 'Looking back, it was the best part of the trip.', vi: 'Nhìn lại, đó là phần hay nhất của chuyến đi.' },
        ],
      },
      {
        title: { vi: 'Phát âm đuôi -ed', en: 'Pronouncing -ed endings' },
        body: {
          vi: '**/t/** sau âm vô thanh p, k, s, sh, ch, f: booked, missed, stopped.\n**/d/** sau âm hữu thanh: arrived, delayed, travelled.\n**/ɪd/** chỉ sau t và d: waited, decided, landed.\nNgười Việt hay **bỏ hẳn** âm cuối, nên "I missed the bus" nghe thành "I miss the bus" (hiện tại)!',
          en: '**/t/** after voiceless sounds p, k, s, sh, ch, f: booked, missed, stopped.\n**/d/** after voiced sounds: arrived, delayed, travelled.\n**/ɪd/** only after t and d: waited, decided, landed.\nIf you drop the ending, "I missed the bus" sounds like "I miss the bus" (present)!',
        },
        examples: [
          { en: 'We booked a hotel, arrived late and waited for an hour.', vi: 'Chúng tôi đặt khách sạn, đến muộn và chờ một tiếng. (/t/ – /d/ – /ɪd/)' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u2-speak-ex01',
        type: 'multiple-choice',
        question: 'How do you pronounce the -ed in "booked"?',
        options: ['/t/', '/d/', '/ɪd/', 'It is silent.'],
        correctIndex: 0,
        explanation: {
          vi: '"book" tận cùng bằng /k/ (vô thanh) nên -ed đọc /t/: /bʊkt/.',
          en: '"book" ends in voiceless /k/, so -ed sounds like /t/: /bʊkt/.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex02',
        type: 'multiple-choice',
        question: 'How do you pronounce the -ed in "waited"?',
        options: ['/t/', '/d/', '/ɪd/'],
        correctIndex: 2,
        explanation: {
          vi: 'Sau âm /t/ hoặc /d/, đuôi -ed đọc thành âm tiết riêng /ɪd/.',
          en: 'After /t/ or /d/, -ed is an extra syllable: /ɪd/.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex03',
        type: 'fill-blank',
        sentence: 'We ___ for the ferry when it started to rain.',
        acceptedAnswers: ['were waiting'],
        hint: '(wait)',
        explanation: {
          vi: 'Bối cảnh đang diễn ra thì bị chen ngang → quá khứ tiếp diễn.',
          en: 'A background action that was interrupted → past continuous.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex04',
        type: 'multiple-choice',
        question: 'Which is the best way to END a travel story?',
        options: ['And then.', 'Looking back, it was actually a great adventure.', 'The bus was blue.', 'I travel every year.'],
        correctIndex: 1,
        explanation: {
          vi: 'Kết chuyện bằng cảm nghĩ khi nhìn lại ("Looking back…").',
          en: 'End a story with how you feel about it now ("Looking back…").',
        },
      },
      {
        id: 'l3-g-u2-speak-ex05',
        type: 'arrange-words',
        translationVi: 'Lúc đầu chúng tôi lo lắng, nhưng cuối cùng mọi thứ đều ổn.',
        correctSentence: 'At first we were worried, but in the end everything was fine.',
        extraWords: ['finally', 'worry'],
        explanation: {
          vi: '"At first… in the end…" cho thấy sự thay đổi từ đầu đến cuối câu chuyện.',
          en: '"At first… in the end…" shows how things changed during the story.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex06',
        type: 'fill-blank',
        sentence: 'Luckily, a kind woman ___ us find the hotel.',
        acceptedAnswers: ['helped'],
        hint: '(help)',
        explanation: {
          vi: 'Quá khứ đơn: helped, đuôi -ed đọc /t/ vì "help" tận cùng /p/.',
          en: 'Past simple: helped, with -ed as /t/ because "help" ends in /p/.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex07',
        type: 'multiple-choice',
        question: '"Do you like to plan everything before a trip?" Which answer is the most developed?',
        options: [
          'Yes.',
          'Yes, I plan.',
          "It depends. For long trips I book hotels in advance because it's cheaper, but on short trips I like to be spontaneous.",
          "I don't know, maybe.",
        ],
        correctIndex: 2,
        explanation: {
          vi: '"It depends" + hai trường hợp + lý do: câu trả lời phát triển tốt.',
          en: '"It depends" + two situations + a reason: a well-developed answer.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex08',
        type: 'speak-sentence',
        sentence: 'We missed the last bus, so we walked back to the hotel.',
        translationVi: 'Chúng tôi lỡ chuyến xe buýt cuối nên đi bộ về khách sạn.',
        explanation: {
          vi: '"missed" /mɪst/ và "walked" /wɔːkt/: đọc rõ /t/ cuối.',
          en: '"missed" /mɪst/ and "walked" /wɔːkt/: say the final /t/.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex09',
        type: 'speak-sentence',
        sentence: 'Our flight was delayed, and we waited at the airport for hours.',
        translationVi: 'Chuyến bay bị trễ và chúng tôi chờ ở sân bay hàng giờ.',
        explanation: {
          vi: '"delayed" đuôi /d/, "waited" đuôi /ɪd/. Chữ h trong "hours" câm.',
          en: '"delayed" ends in /d/, "waited" in /ɪd/. The h in "hours" is silent.',
        },
      },
      {
        id: 'l3-g-u2-speak-ex10',
        type: 'speak-answer',
        question: 'Tell me about a problem you had on a trip. What happened?',
        tipsVi:
          'Bối cảnh (khi nào, ở đâu, đang làm gì: quá khứ tiếp diễn) → chuyện xảy ra (quá khứ đơn) → bạn xử lý thế nào → cảm nghĩ bây giờ (Looking back…). Đọc rõ đuôi -ed. Nói 45–60 giây.',
        sampleAnswer:
          'A couple of years ago, I was travelling around Da Lat with two friends. We were riding our motorbikes back to the hotel when one of them suddenly broke down in the middle of nowhere. At first we panicked a bit, because it was getting dark and none of us knew how to fix it. Luckily, a farmer stopped and called his cousin, who had a small repair shop nearby. Looking back, it was actually the best part of the trip, because we ended up having dinner with his family.',
        recordSeconds: 60,
        explanation: {
          vi: 'Câu chuyện tốt có bối cảnh, sự cố, cách giải quyết và cảm nghĩ cuối.',
          en: 'A good story has a setting, a problem, a solution and a final feeling.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'Do you prefer travelling alone or with other people? Why?',
        'How do you usually plan a trip?',
        'Tell me about a problem you had while travelling. What happened?',
        'Is it better to book everything in advance or to be spontaneous?',
        'What would you do if a hotel lost your booking?',
      ],
      bandSamples: [
        {
          band: '4.5',
          text:
            "Q: Tell me about a problem you had while travelling.\nA: Last year I go to Nha Trang with my family. Uh... the problem is the hotel. They don't have our booking. We very angry. We wait two hour, then they give us other room. It is small and not clean. I don't like.\n\nQ: Is it better to book everything in advance?\nA: Yes, book before is better. Because it is cheap and, um, you don't worry. If you don't book, maybe no room.",
          notesVi:
            'Mức cơ bản (khoảng 4.5). FC: kể được nhưng câu cụt, ngắt quãng. LR: từ rất cơ bản, "book before" là cách dịch từ tiếng Việt (đúng: book in advance). GRA: dùng hiện tại thay quá khứ ("I go", "we wait"), thiếu "be" ("We very angry"), thiếu -s ("two hour"). P: bỏ đuôi -ed nên người nghe khó biết đây là chuyện đã qua.',
        },
        {
          band: '5.5',
          text:
            "Q: Tell me about a problem you had while travelling.\nA: Last summer I travelled to Bangkok with my sister. When we arrived to the airport, my sister's suitcase didn't come out. We waited for one hour and then we went to the lost luggage office. The staff was very helpful, they wrote down our hotel address and they sent the suitcase the next day. So in the end it was okay, but we were very worried that night.\n\nQ: Is it better to book everything in advance?\nA: I think it depends. Booking in advance is safer, especially in the holiday season, because hotels are often full. But if you book everything, you cannot change your plan. For me, I usually book the hotel and the flight, but not the tours.",
          notesVi:
            'Mức khá (khoảng 5.5). FC: chuyện rõ ràng, đúng trình tự, có từ nối (when, then, so, in the end). LR: đủ dùng (lost luggage office, holiday season) nhưng chưa có nhiều cụm tự nhiên; "For me, I…" là cách nói thừa. GRA: quá khứ đơn khá tốt, còn lỗi "arrived to the airport" (arrived at). P: cần giữ rõ đuôi -ed ở "travelled", "waited".',
        },
        {
          band: '6.5',
          text:
            "Q: Tell me about a problem you had while travelling.\nA: The one that comes to mind is when I went to Singapore for a conference. I'd booked a hotel near the venue, but when I turned up, the receptionist told me there had been a problem with their system and my room had been given to someone else. I was exhausted, so I wasn't exactly thrilled, but I tried to stay calm. In the end, they upgraded me to a much nicer hotel down the road and paid for the taxi, so it actually worked out rather well.\n\nQ: Is it better to book everything in advance?\nA: I'd say it's best to find a balance. I always sort out the essentials, like flights and the first night's accommodation, because that's when you're most tired and least able to deal with surprises. But beyond that, I like to leave a bit of room for spontaneity. Some of my best travel memories come from things I didn't plan at all.",
          notesVi:
            'Mức tốt (khoảng 6.5). FC: kể chuyện mạch lạc, có cảm xúc và kết quả rõ. LR: tự nhiên và chính xác (turned up, wasn\'t exactly thrilled, worked out, the essentials). GRA: dùng linh hoạt quá khứ hoàn thành (I\'d booked) và bị động (had been given) gần như không lỗi. Muốn cao hơn: thêm ví dụ cụ thể cho ý "things I didn\'t plan".',
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Câu chuyện của bạn có đủ bối cảnh → sự cố → cách giải quyết → cảm nghĩ không?',
            'Bạn có dùng từ nối thời gian (At first, Then, Luckily, In the end) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ du lịch của chặng (delayed, refund, sort out, upgrade…) không?',
            'Bạn có dùng ít nhất một cụm tự nhiên như "Looking back" hoặc "It turned out that" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Khi kể chuyện đã qua, bạn có dùng thì quá khứ (không dùng "I go", "we wait") không?',
            'Bạn có thử dùng quá khứ tiếp diễn để tả bối cảnh (We were waiting…) không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Đuôi -ed có được đọc rõ (/t/ booked, /d/ arrived, /ɪd/ waited) không?',
            'Các âm cuối như "lost", "missed", "left" có rõ không?',
          ],
        },
      ],
      usefulPhrases: [
        'The one that comes to mind is…',
        'We were … when suddenly …',
        'At first… / Luckily… / In the end…',
        'It turned out that…',
        'Looking back, …',
        'It depends. For…, but for…',
        "I'd rather… than…",
      ],
      targetSounds: [
        '-ed endings: /t/ booked, /d/ arrived, /ɪd/ waited',
        'final consonants: missed, lost, left',
        'silent h in "hour"',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 3 — BÀN VỀ TIN TỨC VÀ THÔNG TIN (Part 3)
   * Trọng tâm: tóm tắt một tin bằng lời (What – Why – What I think),
   *            nêu quan điểm có chừng mực, trọng âm đổi theo từ loại (REcord / reCORD).
   * ======================================================================== */
  {
    id: 'l3-g-u3-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: 'Bàn về tin tức và thông tin', en: 'Discussing news and information' },
    description: {
      vi: 'Nói về cách bạn theo dõi tin tức, tóm tắt một tin ngắn và nêu quan điểm về tin tức trên mạng xã hội.',
      en: 'Talk about how you follow the news, summarise a short story and give your view on news on social media.',
    },
    teachingCards: [
      {
        title: { vi: 'Tóm tắt một tin bằng lời', en: 'Summarising a news story aloud' },
        body: {
          vi: '3 bước:\n**What happened?** I read that… / **Apparently**, …\n**Why does it matter?** This is important because…\n**What do you think?** Personally, I think…\nDùng **"Apparently"** hoặc **"According to…"** khi bạn chưa chắc thông tin đúng 100%.',
          en: 'Three steps:\n**What happened?** I read that… / **Apparently**, …\n**Why does it matter?** This is important because…\n**What do you think?** Personally, I think…\nUse **"Apparently"** or **"According to…"** when you are not 100% sure the information is true.',
        },
        examples: [
          { en: 'Apparently, some cafés now give discounts if you bring your own cup.', vi: 'Nghe nói một số quán cà phê giảm giá nếu bạn mang cốc riêng.' },
        ],
      },
      {
        title: { vi: 'Nêu quan điểm có chừng mực', en: 'Giving balanced opinions' },
        body: {
          vi: 'Câu hỏi Part 3 không có đúng/sai. Tránh nói tuyệt đối (**always, never, everyone**). Dùng: **I tend to think…** / **To some extent…** / **It depends on…** / **On the one hand… on the other hand…**\nMột ý + lý do + ví dụ là đủ.',
          en: 'Part 3 questions have no right answer. Avoid extreme words (**always, never, everyone**). Use: **I tend to think…** / **To some extent…** / **It depends on…** / **On the one hand… on the other hand…**\nOne idea + a reason + an example is enough.',
        },
      },
      {
        title: { vi: 'Trọng âm đổi theo từ loại', en: 'Stress changes with word type' },
        body: {
          vi: 'Nhiều từ 2 âm tiết: **danh từ nhấn âm đầu**, **động từ nhấn âm sau**:\na **RE**cord / to re**CORD**\nan **IN**crease / to in**CREASE**\na **SUR**vey / to sur**VEY**\nNhấn đúng giúp người nghe biết bạn đang dùng danh từ hay động từ.',
          en: 'Many two-syllable words: **nouns stress the first syllable**, **verbs stress the second**:\na **RE**cord / to re**CORD**\nan **IN**crease / to in**CREASE**\na **SUR**vey / to sur**VEY**\nCorrect stress tells the listener which word type you mean.',
        },
        examples: [
          { en: 'There was an increase in prices, and they will increase again.', vi: 'Giá đã tăng, và sẽ còn tăng nữa. (IN-crease / in-CREASE)' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u3-speak-ex01',
        type: 'multiple-choice',
        question: "You read a story but you're not 100% sure it's true. How do you begin?",
        options: ['It is true that…', 'Apparently, …', 'Everyone knows that…', 'I am sure that…'],
        correctIndex: 1,
        explanation: {
          vi: '"Apparently" = nghe nói, có vẻ như (chưa chắc chắn).',
          en: '"Apparently" = it seems, from what I have heard.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex02',
        type: 'multiple-choice',
        question: 'Which answer is the most BALANCED?',
        options: [
          'Social media news is always fake.',
          'Everyone should stop reading news online.',
          'To some extent, social media is useful, but I tend to check important stories on a news website.',
          'Newspapers are the best, always.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"To some extent… but I tend to…" cân bằng, không tuyệt đối.',
          en: '"To some extent… but I tend to…" is balanced, not extreme.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex03',
        type: 'multiple-choice',
        question: 'Where is the stress in the VERB "to increase"?',
        options: ['IN-crease', 'in-CREASE'],
        correctIndex: 1,
        explanation: {
          vi: 'Động từ nhấn âm sau: in-CREASE. Danh từ: IN-crease.',
          en: 'The verb is stressed second: in-CREASE. The noun: IN-crease.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex04',
        type: 'fill-blank',
        sentence: 'On the one hand, news apps are fast. On the other ___, they can be stressful.',
        acceptedAnswers: ['hand'],
        explanation: {
          vi: 'Cặp cố định: "On the one hand… On the other hand…".',
          en: 'Fixed pair: "On the one hand… On the other hand…".',
        },
      },
      {
        id: 'l3-g-u3-speak-ex05',
        type: 'fill-blank',
        sentence: 'I ___ to think that young people read more news than we believe.',
        acceptedAnswers: ['tend'],
        explanation: {
          vi: '"I tend to think…" = tôi có xu hướng nghĩ…, nêu ý nhẹ nhàng.',
          en: '"I tend to think…" gives an opinion softly.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi đọc được rằng các trường học sẽ vào học muộn hơn vào mùa đông.',
        correctSentence: 'I read that schools will start later in winter.',
        extraWords: ['reads', 'started'],
        explanation: {
          vi: '"I read that…" mở đầu khi thuật lại một tin. Ở đây "read" là quá khứ /red/.',
          en: '"I read that…" introduces a news story. Here "read" is past: /red/.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex07',
        type: 'multiple-choice',
        question: 'Which is NOT a good way to summarise a story aloud?',
        options: ['Say what happened', 'Say why it matters', 'Read out every number from the article', 'Give your own view at the end'],
        correctIndex: 2,
        explanation: {
          vi: 'Tóm tắt chỉ giữ ý chính; đọc hết số liệu làm người nghe rối.',
          en: 'A summary keeps the main points; too many numbers confuse listeners.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex08',
        type: 'speak-sentence',
        sentence: 'Apparently, the number of people cycling to work has increased.',
        translationVi: 'Nghe nói số người đạp xe đi làm đã tăng lên.',
        explanation: {
          vi: 'in-CREASED (động từ nhấn sau), đuôi -ed đọc /t/.',
          en: 'in-CREASED (verb, stressed second), with -ed as /t/.',
        },
      },
      {
        id: 'l3-g-u3-speak-ex09',
        type: 'speak-sentence',
        sentence: "On the one hand, it's fast. On the other hand, it isn't always reliable.",
        translationVi: 'Một mặt, nó nhanh. Mặt khác, nó không phải lúc nào cũng đáng tin.',
        explanation: {
          vi: 'Nhấn re-LI-a-ble. Hơi ngừng sau mỗi "hand".',
          en: 'Stress re-LI-a-ble. Pause briefly after each "hand".',
        },
      },
      {
        id: 'l3-g-u3-speak-ex10',
        type: 'speak-answer',
        question: 'Tell me about a news story you heard or read recently.',
        tipsVi:
          '3 bước: Chuyện gì (I read that… / Apparently…) → Vì sao quan trọng → Bạn nghĩ gì. Chọn tin đời thường (thời tiết, công nghệ, sức khoẻ, môi trường), không chọn tin chính trị. Nói 45–60 giây.',
        sampleAnswer:
          "I recently read that a few cafés in my city have started giving discounts to customers who bring their own cups. Apparently, they want to cut down on plastic waste, and one café said it now uses about a thousand fewer cups a month. I think it matters because plastic is a huge problem in Vietnam, especially in rivers. Personally, I think it's a great idea, although the discount is quite small, so I'm not sure how many people will actually change their habits.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt nêu tin, vì sao quan trọng và quan điểm cá nhân có chừng mực.',
          en: 'A good answer gives the story, why it matters and a balanced opinion.',
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        'How do you usually get the news? Has this changed in recent years?',
        'What kinds of news stories interest you most?',
        'Do you trust the news you see on social media? Why or why not?',
        'Is it important for young people to follow the news?',
        'Some people say there is too much bad news. Do you agree?',
      ],
      bandSamples: [
        {
          band: '4.5',
          text:
            "Q: How do you usually get the news?\nA: I read news in my phone, on social media. Before, my father read newspaper but now nobody read newspaper. Phone is more fast.\n\nQ: Do you trust the news on social media?\nA: Not really. Because, um, have many fake news. Some news is not true. So I don't trust. Sometime I trust if many people share.",
          notesVi:
            'Mức cơ bản (khoảng 4.5). FC: trả lời đúng ý nhưng rất ngắn, ý cuối ("trust if many people share") mâu thuẫn mà không giải thích. LR: lặp "news", "trust". GRA: lỗi điển hình "have many fake news" (đúng: there is a lot of fake news), "nobody read", "more fast" (faster), "in my phone" (on my phone). "Sometime" thiếu -s (sometimes) cũng cho thấy thói quen nuốt âm cuối khi nói.',
        },
        {
          band: '5.5',
          text:
            "Q: How do you usually get the news?\nA: Mostly I get the news from my phone, from news apps and social media. In the past I watched the news on TV with my parents every evening, but now I don't have time, so I read it on the bus to work. It's more convenient, but sometimes I only read the headlines and not the full article.\n\nQ: Do you trust the news you see on social media?\nA: Not completely. There is a lot of information on social media and some of it is not correct. For example, last year many people shared a story about a storm, but it was an old video. So when I see important news, I usually check it in a newspaper website. I think young people should learn how to check information.",
          notesVi:
            'Mức khá (khoảng 5.5). FC: trả lời đủ, có so sánh quá khứ – hiện tại và ví dụ cụ thể (video cũ về bão). LR: phù hợp (convenient, headlines) nhưng còn đơn giản. GRA: khá chính xác với câu đơn và câu ghép; còn lỗi giới từ "in a newspaper website" (on). Câu cuối hơi lạc khỏi câu hỏi.',
        },
        {
          band: '6.5',
          text:
            "Q: How do you usually get the news?\nA: These days it's almost entirely on my phone. I've got a couple of news apps that send me a short summary in the morning, which I skim over breakfast. That's quite a big change from when I was a kid, when my whole family would sit down and watch the evening news together. To be honest, I sometimes miss that, because it gave us something to talk about.\n\nQ: Do you trust the news you see on social media?\nA: I'd say I'm fairly careful with it. The problem isn't that everything on social media is false; a lot of it is perfectly accurate. It's that false stories tend to spread faster, because they're more shocking. So if something seems surprising, I'll check whether a reliable news website is reporting the same thing before I believe it, let alone share it.",
          notesVi:
            'Mức tốt (khoảng 6.5). FC: ý phát triển tự nhiên, lập luận rõ (vấn đề là tin giả lan nhanh hơn). LR: chính xác (skim, fairly careful, accurate, spread, let alone). GRA: đa dạng: "would" cho thói quen quá khứ, mệnh đề quan hệ, câu điều kiện, gần như không lỗi. Muốn cao hơn: thêm một ví dụ thật.',
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi câu trả lời có quan điểm + lý do + ví dụ không?',
            'Bạn có dùng cụm như "To some extent", "It depends on" để nói có chừng mực không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ tin tức của chặng (according to, survey, issue, claim…) không?',
            'Bạn có tránh lặp lại "news" và "social media" quá nhiều không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Bạn có dùng "news" như danh từ không đếm được (news is, not "news are") không?',
            'Bạn có dùng "there is / there are" thay vì "have" khi nói "có" không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Bạn có nhấn đúng in-for-MA-tion, re-LI-a-ble không?',
            'Bạn có phân biệt trọng âm danh từ / động từ (an IN-crease / to in-CREASE) không?',
          ],
        },
      ],
      usefulPhrases: [
        'Apparently, …',
        'I read / heard that…',
        'According to…',
        'I tend to think…',
        'To some extent, …',
        'On the one hand… On the other hand…',
        'It depends on…',
        "That's why I…",
      ],
      targetSounds: [
        'stress shift: a RE-cord / to re-CORD, an IN-crease / to in-CREASE',
        'final clusters: -st in "latest", "most"; -cts in "facts"',
        'word stress: in-for-MA-tion, re-LI-a-ble',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 4 — NÓI VỀ PHIM, NHẠC VÀ SỞ THÍCH
   * Trọng tâm: nói về gu tự nhiên (be into, tend to, would rather… than…),
   *            nối âm phụ âm + nguyên âm (fan_of, watch_it).
   * ======================================================================== */
  {
    id: 'l3-g-u4-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: 'Nói về phim, nhạc và sở thích', en: 'Talking about films, music and your tastes' },
    description: {
      vi: 'Nói về gu phim ảnh, âm nhạc, podcast một cách tự nhiên, dùng thành ngữ đơn giản và nối âm.',
      en: 'Talk naturally about your taste in films, music and podcasts, using simple idioms and linking.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói về sở thích tự nhiên hơn', en: 'Talking about tastes more naturally' },
        body: {
          vi: 'Thay "I like… very much" bằng:\n**I\'m really into…** / **I\'m a big fan of…**\n**I tend to go for…** (thường chọn)\n**…isn\'t really my thing** (không hợp gu)\nSo sánh: **I\'d rather watch** a comedy **than** a horror film. Sau **would rather** dùng **V nguyên mẫu**, không có "to".',
          en: 'Instead of "I like… very much", try:\n**I\'m really into…** / **I\'m a big fan of…**\n**I tend to go for…** (usually choose)\n**…isn\'t really my thing**\nCompare: **I\'d rather watch** a comedy **than** a horror film. After **would rather**, use the **base verb**, no "to".',
        },
        examples: [
          { en: "I tend to go for comedies after a long day.", vi: 'Sau một ngày dài tôi thường chọn phim hài.' },
          { en: "I'd rather stay in than go to the cinema.", vi: 'Tôi thích ở nhà hơn là ra rạp.' },
        ],
      },
      {
        title: { vi: 'Nối âm khi nói', en: 'Linking when you speak' },
        body: {
          vi: 'Phụ âm cuối + nguyên âm đầu → **đọc dính**:\n"kind_of" /kaɪndəv/, "fan_of" /fænəv/, "watch_it" /wɒtʃɪt/, "a lot_of" /əlɒtəv/.\nNgười Việt hay tách từng từ ra nên nghe "giật". Nối âm vừa **trôi chảy** hơn, vừa giúp bạn **đọc rõ âm cuối** hơn.',
          en: 'Final consonant + first vowel → **join them**:\n"kind_of" /kaɪndəv/, "fan_of" /fænəv/, "watch_it" /wɒtʃɪt/, "a lot_of" /əlɒtəv/.\nSeparating every word sounds choppy. Linking makes you **more fluent** and helps you **pronounce final sounds**.',
        },
        examples: [
          { en: "I'm a big fan of it.", vi: 'Tôi rất thích nó. (fan_of_it)' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u4-speak-ex01',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          "I'd rather to watch a comedy.",
          "I'd rather watch a comedy than a horror film.",
          "I'd rather watching a comedy.",
          'I rather watch comedy than horror.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"would rather + V nguyên mẫu + than…" (không có "to", không V-ing).',
          en: '"would rather + base verb + than…" (no "to", no -ing).',
        },
      },
      {
        id: 'l3-g-u4-speak-ex02',
        type: 'fill-blank',
        sentence: "I'm a big fan ___ old Vietnamese songs.",
        acceptedAnswers: ['of'],
        explanation: {
          vi: '"a fan of + danh từ" = người hâm mộ, rất thích cái gì.',
          en: '"a fan of + noun".',
        },
      },
      {
        id: 'l3-g-u4-speak-ex03',
        type: 'multiple-choice',
        question: "Your friend loves jazz. You don't. What is a polite, natural reply?",
        options: [
          'Jazz is terrible.',
          "Jazz isn't really my thing, but I can see why people love it.",
          'I hate jazz music very much.',
          'Jazz is not my cup.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"isn\'t really my thing" chê nhẹ nhàng; vế sau tôn trọng sở thích của bạn.',
          en: '"isn\'t really my thing" is gentle, and the second part respects your friend.',
        },
      },
      {
        id: 'l3-g-u4-speak-ex04',
        type: 'fill-blank',
        sentence: 'When I choose a film, I ___ to go for comedies.',
        acceptedAnswers: ['tend'],
        explanation: {
          vi: '"tend to + V" = thường, có xu hướng.',
          en: '"tend to + verb" = usually do something.',
        },
      },
      {
        id: 'l3-g-u4-speak-ex05',
        type: 'multiple-choice',
        question: 'Which pair of words should be LINKED when you speak?',
        options: ['"big" + "city"', '"fan" + "of"', '"good" + "music"', '"red" + "car"'],
        correctIndex: 1,
        explanation: {
          vi: 'Phụ âm /n/ + nguyên âm /ə/ → nối: fan_of /fænəv/.',
          en: 'Consonant /n/ + vowel /ə/ → link: fan_of /fænəv/.',
        },
      },
      {
        id: 'l3-g-u4-speak-ex06',
        type: 'arrange-words',
        translationVi: 'Dạo này tôi rất mê các podcast về lịch sử.',
        correctSentence: "I'm really into history podcasts at the moment.",
        extraWords: ['in', 'about'],
        explanation: {
          vi: '"be into + danh từ" = rất thích; "at the moment" = dạo này.',
          en: '"be into + noun" = like a lot; "at the moment" = these days.',
        },
      },
      {
        id: 'l3-g-u4-speak-ex07',
        type: 'multiple-choice',
        question: 'You watched every episode of a series in two days. You…',
        options: ['binge-watched it', 'spoiled it', 'predicted it', 'soundtracked it'],
        correctIndex: 0,
        explanation: {
          vi: '"binge-watch" = xem liền một mạch nhiều tập (từ bài từ vựng).',
          en: '"binge-watch" = watch many episodes in a row (from the vocabulary lesson).',
        },
      },
      {
        id: 'l3-g-u4-speak-ex08',
        type: 'speak-sentence',
        sentence: "I'm a big fan of action films, but horror isn't really my thing.",
        translationVi: 'Tôi rất thích phim hành động, nhưng phim kinh dị không hợp gu tôi.',
        explanation: {
          vi: 'Nối "fan_of_action", "isn\'t_really". Đọc rõ /z/ cuối "films".',
          en: 'Link "fan_of_action" and "isn\'t_really". Say the /z/ in "films".',
        },
      },
      {
        id: 'l3-g-u4-speak-ex09',
        type: 'speak-sentence',
        sentence: "I'd rather watch it at home than go to the cinema.",
        translationVi: 'Tôi thích xem ở nhà hơn là ra rạp.',
        explanation: {
          vi: 'Nối "watch_it_at_home". Âm /ð/ trong "rather", "than", "the".',
          en: 'Link "watch_it_at_home". Say /ð/ in "rather", "than", "the".',
        },
      },
      {
        id: 'l3-g-u4-speak-ex10',
        type: 'speak-answer',
        question: 'What kind of films or series do you enjoy? Why?',
        tipsVi:
          'Dùng 2–3 cụm của bài (I\'m really into…, I tend to…, …isn\'t really my thing). Nêu 1 phim/series cụ thể (không cần tên thật) và vì sao thích. Nhớ nối âm. Nói 30–45 giây.',
        sampleAnswer:
          "I'm really into crime series, especially the ones where you have to work out who did it. I tend to watch one or two episodes after dinner to relax. The last one I watched was set in a small fishing village, and the plot was so gripping that I binge-watched the whole season in a weekend. Romantic comedies, on the other hand, aren't really my thing, because they're usually quite predictable.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu trả lời tốt nêu thể loại, lý do, ví dụ cụ thể và một điều không thích.',
          en: 'A good answer gives a type, a reason, an example and something you dislike.',
        },
      },
    ],
    speakingTask: {
      part: 1,
      questions: [
        'What kind of films or series do you enjoy?',
        'Do you prefer watching films at home or at the cinema? Why?',
        'Is there a song or a kind of music that is special to you?',
        'Do you listen to podcasts? What about?',
        'Why do you think some people watch the same series again and again?',
      ],
      bandSamples: [
        {
          band: '4.5',
          text:
            "Q: Do you prefer watching films at home or at the cinema?\nA: At home. Because at home is comfortable and, uh, free. Cinema is expensive. And at home I can stop film when I want. But cinema have big screen, it is also good.\n\nQ: Is there a song that is special to you?\nA: Yes. Um... a song of my mother. She sing it when I am small. I don't remember the name. I like it because it make me remember my mother.",
          notesVi:
            'Mức cơ bản (khoảng 4.5). FC: ý đơn giản, hiểu được nhưng câu cụt và ngập ngừng. LR: hạn chế (comfortable, good, expensive). GRA: thiếu -s ("cinema have", "it make"), sai thì quá khứ ("She sing… when I am small"), thiếu mạo từ ("stop film", "big screen"). P: chưa nối âm, các từ bị tách rời.',
        },
        {
          band: '5.5',
          text:
            "Q: Do you prefer watching films at home or at the cinema?\nA: I prefer watching at home, because I can choose what I want and I don't need to go out. Also, the tickets at the cinema are quite expensive now. However, for big action films I like going to the cinema, because the sound and the screen is much better and it's more exciting.\n\nQ: Is there a song that is special to you?\nA: Yes, there is a song my grandmother used to sing when I was a child. It's a traditional song about the countryside. When I hear it now, I feel very peaceful and I remember the summer holidays at her house. So it is very meaningful for me.",
          notesVi:
            'Mức khá (khoảng 5.5). FC: rõ ràng, có lý do và so sánh (However…). LR: đủ dùng (traditional, peaceful, meaningful) nhưng chưa có cụm tự nhiên. GRA: "used to" dùng đúng; còn lỗi hoà hợp "the sound and the screen is" (are). P: nên nối âm ở "used_to", "sound_and".',
        },
        {
          band: '6.5',
          text:
            "Q: Do you prefer watching films at home or at the cinema?\nA: It really depends on the film. For most things, I'd rather stay in, because I can pause it, grab a snack and watch in my pyjamas. But if it's something with amazing visuals, like a big fantasy film, then I think it's worth paying for the cinema. There's something about the huge screen and everyone gasping at the same moment that you just can't get on a laptop.\n\nQ: Is there a song that is special to you?\nA: Yes, there's an old folk song my grandmother used to sing while she was cooking. I've never actually known the title, but the moment I hear the first few notes, I'm right back in her kitchen as a kid. It's funny, because I'm not really into folk music in general, but that one song gets me every time.",
          notesVi:
            'Mức tốt (khoảng 6.5). FC: linh hoạt (It really depends…), lý do rõ, chi tiết sống động. LR: tự nhiên (stay in, grab a snack, worth paying for, gets me every time). GRA: đa dạng (would rather, used to, mệnh đề quan hệ) và chính xác. Muốn cao hơn: giữ nhịp đều và ngữ điệu tự nhiên trong câu dài.',
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Bạn có nói được 3–4 câu cho mỗi câu hỏi mà không dừng lâu không?',
            'Bạn có dùng "It depends…" hoặc "On the other hand…" để thêm mặt khác không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng ít nhất 2 cụm của chặng (be into, not my thing, worth watching, gripping…) không?',
            'Bạn có thay "very good" bằng tính từ cụ thể hơn không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Sau "would rather" bạn có dùng động từ nguyên mẫu (không "to") không?',
            'Khi kể chuyện cũ, bạn có dùng "used to" hoặc quá khứ đơn đúng không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Bạn có nối âm ở các cụm như fan_of, kind_of, watch_it không?',
            'Âm /ð/ (the, than, rather) có được đặt lưỡi giữa hai răng không?',
          ],
        },
      ],
      usefulPhrases: [
        "I'm really into…",
        "I'm a big fan of…",
        'I tend to go for…',
        "…isn't really my thing",
        "I'd rather… than…",
        "It's well worth watching",
        'It really depends on…',
        'It gets me every time',
      ],
      targetSounds: [
        'linking: fan_of, kind_of, watch_it',
        '/ð/ in "rather", "than", "the"',
        'final /z/: films, songs, series',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 5 — ĐỜI SỐNG: LỜI KHUYÊN VÀ CÂU CHUYỆN (Part 3)
   * Trọng tâm: khuyên nhẹ nhàng (Have you thought about…, It might be worth…),
   *            kể lại lời khuyên (told me to / advised me not to),
   *            phân biệt advice /s/ và advise /z/.
   * ======================================================================== */
  {
    id: 'l3-g-u5-speak',
    skill: 'speaking',
    mode: 'speaking',
    estimatedMinutes: 15,
    title: { vi: 'Đời sống: lời khuyên và câu chuyện', en: 'Everyday life: advice and personal stories' },
    description: {
      vi: 'Nói về sức khoẻ, tiền bạc, công nghệ trong nhà; đưa lời khuyên và kể lại một lời khuyên bạn từng nhận.',
      en: 'Talk about health, money and technology at home; give advice and tell a story about advice you once got.',
    },
    teachingCards: [
      {
        title: { vi: 'Khuyên ai đó khi nói chuyện', en: 'Giving advice in conversation' },
        body: {
          vi: 'Khuyên **nhẹ nhàng** nghe tự nhiên hơn "You must":\n**Have you thought about** + V-ing?\n**It might be worth** + V-ing…\n**If I were you, I\'d**…\n**What works for me is**…\nLuôn thêm **lý do**: "…because it helps you…".',
          en: '**Gentle** advice sounds more natural than "You must":\n**Have you thought about** + -ing?\n**It might be worth** + -ing…\n**If I were you, I\'d**…\n**What works for me is**…\nAlways add a **reason**: "…because it helps you…".',
        },
        examples: [
          { en: 'Have you thought about cooking at home more often?', vi: 'Bạn đã nghĩ đến việc nấu ăn ở nhà thường hơn chưa?' },
        ],
      },
      {
        title: { vi: 'Kể lại lời khuyên đã nhận', en: 'Reporting advice you received' },
        body: {
          vi: '**told me to** + V\n**advised me (not) to** + V\n**said (that) I should**…\nVD: "My grandmother **told me to** save a little every month."\n"My teacher **advised me not to** study all night."\nChú ý vị trí **not**: advised me **not to** (KHÔNG nói "to not").',
          en: '**told me to** + verb\n**advised me (not) to** + verb\n**said (that) I should**…\nE.g. "My grandmother **told me to** save a little every month."\n"My teacher **advised me not to** study all night."\nNote where **not** goes: advised me **not to** (not "to not").',
        },
      },
      {
        title: { vi: 'advice /s/ hay advise /z/?', en: 'advice /s/ or advise /z/?' },
        body: {
          vi: '**advice** (danh từ) /ədˈvaɪs/, âm cuối **/s/**: some good advice.\n**advise** (động từ) /ədˈvaɪz/, âm cuối **/z/**: My doctor advised me to rest.\nTương tự: a **use** /juːs/ (danh từ), to **use** /juːz/ (động từ). Đọc đúng âm cuối giúp người nghe hiểu bạn dùng từ loại nào.',
          en: '**advice** (noun) /ədˈvaɪs/, ending in **/s/**: some good advice.\n**advise** (verb) /ədˈvaɪz/, ending in **/z/**: My doctor advised me to rest.\nSimilarly: a **use** /juːs/ (noun), to **use** /juːz/ (verb). The final sound tells listeners which word you mean.',
        },
        examples: [
          { en: "That's good advice. I'll advise my brother to try it.", vi: 'Lời khuyên hay đấy. Tôi sẽ khuyên em trai thử.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u5-speak-ex01',
        type: 'multiple-choice',
        question: 'Which word ends with a /z/ sound?',
        options: ['advice (noun)', 'advise (verb)'],
        correctIndex: 1,
        explanation: {
          vi: 'advise (động từ) /ədˈvaɪz/; advice (danh từ) /ədˈvaɪs/.',
          en: 'advise (verb) /ədˈvaɪz/; advice (noun) /ədˈvaɪs/.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex02',
        type: 'fill-blank',
        sentence: 'My doctor ___ me to drink more water.',
        acceptedAnswers: ['advised', 'told'],
        explanation: {
          vi: '"advised / told + người + to V" để kể lại lời khuyên.',
          en: '"advised / told + person + to verb" reports advice.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex03',
        type: 'fill-blank',
        sentence: 'It might be worth ___ off notifications in the evening.',
        acceptedAnswers: ['turning'],
        hint: '(turn)',
        explanation: {
          vi: '"It might be worth + V-ing" = có lẽ nên làm gì.',
          en: '"It might be worth + -ing" = it could be a good idea to.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex04',
        type: 'multiple-choice',
        question: 'Which piece of advice sounds the friendliest?',
        options: [
          'You must stop buying coffee.',
          'Have you thought about making coffee at home? It saves a lot.',
          'Stop it. Coffee is expensive.',
          'You are wrong to buy coffee.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"Have you thought about + V-ing?" + lý do: nhẹ nhàng và thuyết phục.',
          en: '"Have you thought about + -ing?" plus a reason is gentle and convincing.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex05',
        type: 'multiple-choice',
        question: "My father advised me ___ money on things I don't need.",
        options: ['to not waste', 'not to waste', "don't waste", 'not wasting'],
        correctIndex: 1,
        explanation: {
          vi: 'Phủ định: advise + người + not to + V.',
          en: 'Negative: advise + person + not to + verb.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex06',
        type: 'arrange-words',
        translationVi: 'Nếu tôi là bạn, tôi sẽ đi ngủ sớm hơn.',
        correctSentence: 'If I were you, I would go to bed earlier.',
        extraWords: ['am', 'will'],
        explanation: {
          vi: '"If I were you, I would + V": câu điều kiện loại 2 dùng để khuyên.',
          en: '"If I were you, I would + verb": a second conditional for advice.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex07',
        type: 'multiple-choice',
        question: '"Is it easy for young people to save money nowadays?" Which answer is the most developed?',
        options: [
          'No.',
          "No, it isn't easy.",
          'Not really. Rent and food are expensive in big cities, and online shopping makes spending very easy. That said, people who use a simple budget can still save a little.',
          'Money is important.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Có trả lời, hai lý do và một ý trái chiều ("That said…").',
          en: 'It answers, gives two reasons and adds a contrast ("That said…").',
        },
      },
      {
        id: 'l3-g-u5-speak-ex08',
        type: 'speak-sentence',
        sentence: 'My grandmother told me to save a little money every month.',
        translationVi: 'Bà tôi bảo tôi mỗi tháng để dành một ít tiền.',
        explanation: {
          vi: 'Đọc rõ /d/ cuối "told" và /θ/ cuối "month".',
          en: 'Say the final /d/ in "told" and /θ/ in "month".',
        },
      },
      {
        id: 'l3-g-u5-speak-ex09',
        type: 'speak-sentence',
        sentence: "That's good advice. I'll advise my brother to try it.",
        translationVi: 'Lời khuyên hay đấy. Tôi sẽ khuyên em trai thử.',
        explanation: {
          vi: 'advice kết thúc /s/, advise kết thúc /z/: hai âm cuối khác nhau.',
          en: 'advice ends in /s/, advise ends in /z/: different final sounds.',
        },
      },
      {
        id: 'l3-g-u5-speak-ex10',
        type: 'speak-answer',
        question: 'What advice would you give to someone who wants to sleep better?',
        tipsVi:
          'Đưa 2 lời khuyên bằng 2 cấu trúc khác nhau (It might be worth…, If I were you…) và nêu lý do. Có thể kể điều đã hiệu quả với bạn (What works for me is…). Nói 45–60 giây.',
        sampleAnswer:
          "First, I'd say it might be worth keeping your phone out of the bedroom, because it's so easy to start scrolling and lose track of time. What works for me is charging it in the kitchen and using a cheap alarm clock instead. Also, if I were you, I'd try to go to bed at the same time every night, even at weekends, because your body gets used to a routine.",
        recordSeconds: 60,
        explanation: {
          vi: 'Lời khuyên tốt có nhiều cấu trúc khác nhau, mỗi ý có lý do.',
          en: 'Good advice uses different structures, each with a reason.',
        },
      },
    ],
    speakingTask: {
      part: 3,
      questions: [
        'What do you do to stay healthy?',
        'Is it easy for young people to save money nowadays?',
        'What piece of technology at home could you not live without? Why?',
        'Tell me about a time someone gave you good advice.',
        'Do you think people ask their families for advice less than in the past?',
      ],
      bandSamples: [
        {
          band: '4.5',
          text:
            "Q: Is it easy for young people to save money nowadays?\nA: No, not easy. Because everything is expensive, house, food... And young people like buy many thing online. My friend buy clothes every week. So they cannot save.\n\nQ: Tell me about a time someone gave you good advice.\nA: Um, my father. When I am student, he say me, 'You should learn English.' I listen him and now I learn English. It is good advice because English is important for job.",
          notesVi:
            'Mức cơ bản (khoảng 4.5). FC: có ý và lý do nhưng câu cụt, liệt kê. LR: lặp "good", "important"; chưa có từ của chặng (budget, afford). GRA: lỗi điển hình "like buy", "many thing", "my friend buy", "he say me", "listen him", và dùng hiện tại khi kể chuyện quá khứ. P: cần đọc rõ đuôi -ed khi kể chuyện.',
        },
        {
          band: '5.5',
          text:
            "Q: Is it easy for young people to save money nowadays?\nA: I don't think it's easy. In big cities like Ho Chi Minh City, rent is very high and many young people spend a lot on eating out and online shopping. For example, my cousin earns a good salary but she always says she has no money at the end of the month. But I think if they make a budget, they can save a little.\n\nQ: Tell me about a time someone gave you good advice.\nA: When I was in grade twelve, I was very stressed about the university exam. My teacher advised me to study a little every day instead of studying all night. At first I didn't believe her, but I tried it and I felt better and my results were improved. So I think it was the best advice I ever received.",
          notesVi:
            'Mức khá (khoảng 5.5). FC: đủ ý, ví dụ người thật, kể chuyện đúng trình tự. LR: đủ dùng (rent, budget, stressed) nhưng từ nối chủ yếu là but/so. GRA: "advised me to" đúng; còn lỗi "my results were improved" (my results improved) và "the best advice I ever received" (I\'ve ever received). P: chú ý "advised" kết thúc /zd/.',
        },
        {
          band: '6.5',
          text:
            "Q: Is it easy for young people to save money nowadays?\nA: Honestly, it's harder than it used to be. Rents in the big cities have gone up much faster than salaries, and on top of that, shopping apps make it incredibly easy to spend without really noticing. That said, I don't think it's impossible. A few of my friends have started setting aside a fixed amount on payday, before they can spend it, and they've managed to save up for some pretty big things.\n\nQ: Tell me about a time someone gave you good advice.\nA: The best advice I've ever had came from my grandmother, actually. When I got my first job, I complained to her that I could never save anything. She told me to put away just a tiny amount every single day, like the price of a coffee, and not to touch it. It sounded almost too simple, but after a year I had enough for a short trip to Thailand, and more importantly, I'd got into the habit of saving.",
          notesVi:
            'Mức tốt (khoảng 6.5). FC: ý phát triển tự nhiên, có lập luận hai chiều (That said…). LR: đa dạng (on top of that, setting aside, save up, got into the habit). GRA: linh hoạt: hiện tại hoàn thành, câu tường thuật (told me to… not to…), quá khứ hoàn thành, gần như không lỗi. Muốn cao hơn: thêm vài cụm diễn đạt ít phổ biến hơn.',
        },
      ],
      checklist: [
        {
          criterion: 'FC',
          questionsVi: [
            'Mỗi câu trả lời có lý do và ví dụ (người thật, chuyện thật) không?',
            'Khi kể chuyện, bạn có theo trình tự rõ ràng (When…, At first…, In the end…) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ của chặng (afford, budget, cut down on, save up, habit…) không?',
            'Bạn có dùng ít nhất 2 cách khuyên khác nhau không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Bạn có kể lại lời khuyên đúng mẫu "told / advised me (not) to + V" không?',
            'Câu "If I were you, I\'d…" có đúng "were" không?',
          ],
        },
        {
          criterion: 'P',
          questionsVi: [
            'Bạn có phân biệt âm cuối advice /s/ và advise /z/ không?',
            'Âm /θ/ trong "month", "health", "think" có đặt lưỡi giữa hai răng không?',
          ],
        },
      ],
      usefulPhrases: [
        'Have you thought about + V-ing…?',
        'It might be worth + V-ing…',
        "If I were you, I'd…",
        'What works for me is…',
        'He / She told me to… / advised me not to…',
        'On top of that, …',
        'That said, …',
        "The best advice I've ever had…",
      ],
      targetSounds: [
        'advice /s/ vs advise /z/',
        '-ed endings in stories: asked /t/, complained /d/, started /ɪd/',
        '/θ/ in "month", "health", "think"',
      ],
    },
    miniTest: [],
  },
]
