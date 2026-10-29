/**
 * writing-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "CẦU NỐI" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK TỔNG QUÁT (general)
 * KỸ NĂNG VIẾT (mode 'writing')
 *
 * Cấu trúc 1 bài viết v3:
 *   teachingCards (bố cục + mẫu câu) → exercises (khởi động: mẫu câu, ngữ pháp, nói)
 *   → writingTask: 1 đề viết đời thực ngắn (email / tin nhắn 60–100 từ),
 *     kèm 3 bài mẫu, checklist tự chấm 4 tiêu chí và gợi ý lên dàn ý.
 *
 * VỀ BÀI MẪU (bandSamples): track tổng quát KHÔNG hiện band cho người học, nhưng vẫn
 * gắn nhãn "3.5" / "4.5" / "5.5" để giao diện hiểu là 3 mức "cơ bản / khá / rất tốt".
 * Bài mức thấp CỐ Ý có lỗi điển hình của người Việt (thiếu "be", sai thì, thiếu -s, quá ngắn...).
 * taskNumber = 2 chỉ để dùng chung khuôn WritingTask (không phải đề IELTS thật).
 *
 * 4 tiêu chí checklist (giải thích đơn giản):
 *   TA  = Làm đúng và đủ yêu cầu của đề
 *   CC  = Bố cục rõ, ý nối với nhau mạch lạc
 *   LR  = Dùng từ đúng, phù hợp, không lặp
 *   GRA = Ngữ pháp đúng
 *
 * File này chứa 4 bài (mỗi chặng 1 bài):
 *   1. l2b-g-01-write : Email gửi khách sạn — hỏi 2 câu + 1 yêu cầu lịch sự (câu hỏi gián tiếp)
 *   2. l2b-g-02-write : Email công việc — báo không dự họp được, đề xuất giờ khác
 *   3. l2b-g-03-write : Tin nhắn cho nhóm làm dự án — đã xong / chưa xong / hẹn gặp
 *                       (hiện tại hoàn thành, should, will)
 *   4. l2b-g-04-write : Tin nhắn giới thiệu một bộ phim cho bạn
 *
 * Quy ước id: bài "l2b-g-<chặng>-write", đề "...-task", bài tập "...-ex<số>".
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralWritingLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — VIẾT: EMAIL GỬI KHÁCH SẠN
   * Bố cục email 4 phần, câu hỏi gián tiếp (Could you tell me what time breakfast is?),
   * cách viết ngày tháng.
   * ======================================================================== */
  {
    id: 'l2b-g-01-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 20,
    title: { vi: 'Viết: email hỏi thông tin khách sạn', en: 'Writing: an email to a hotel' },
    description: {
      vi: 'Viết một email ngắn gửi khách sạn để hỏi thông tin và đưa ra một yêu cầu lịch sự.',
      en: 'Write a short email to a hotel to ask for information and make a polite request.',
    },
    teachingCards: [
      {
        title: { vi: 'Email lịch sự gồm 4 phần', en: 'A polite email in four parts' },
        body: {
          vi: "1. **Chào**: Dear Sir or Madam, (khi không biết tên)\n2. **Lý do viết**: I have a reservation for ... / I am writing to ask about ...\n3. **Câu hỏi + yêu cầu**: Could you tell me ...? / I would like ...\n4. **Kết**: I look forward to hearing from you. / Best regards, + tên",
          en: "1. **Greeting**: Dear Sir or Madam, (if you don't know the name)\n2. **Reason**: I have a reservation for ... / I am writing to ask about ...\n3. **Questions + request**: Could you tell me ...? / I would like ...\n4. **Ending**: I look forward to hearing from you. / Best regards, + name",
        },
        examples: [
          { en: 'I have a reservation for two nights, from 12th to 14th May.', vi: 'Tôi đã đặt phòng hai đêm, từ 12 đến 14 tháng Năm.' },
        ],
      },
      {
        title: { vi: 'Câu hỏi gián tiếp lịch sự', en: 'Polite indirect questions' },
        body: {
          vi: "Câu hỏi trực tiếp: **What time is breakfast?**\nLịch sự hơn: **Could you tell me what time breakfast is?**\nSau 'Could you tell me' → **chủ ngữ trước, động từ sau** (breakfast **is**), KHÔNG đảo ngữ.\nCâu hỏi Có/Không: **Could you tell me if** there is a car park?",
          en: "Direct: **What time is breakfast?**\nMore polite: **Could you tell me what time breakfast is?**\nAfter 'Could you tell me', put the **subject before the verb** (breakfast **is**).\nYes/No questions: **Could you tell me if** there is a car park?",
        },
        examples: [
          {
            en: 'Could you tell me how far the hotel is from the airport?',
            vi: 'Bạn có thể cho tôi biết khách sạn cách sân bay bao xa không?',
          },
        ],
      },
      {
        title: { vi: 'Viết ngày tháng và giờ', en: 'Dates and times' },
        body: {
          vi: "Ngày: **on 12th May** / **on Friday**. Khoảng thời gian: **from 12th to 14th May**.\nGiờ: **at 10 pm**, **at around midnight**.\nĐừng viết kiểu '12/5' — người Mỹ sẽ hiểu là **ngày 5 tháng 12**! Hãy viết tháng bằng chữ.",
          en: "Dates: **on 12th May** / **on Friday**. Periods: **from 12th to 14th May**.\nTimes: **at 10 pm**, **at around midnight**.\nAvoid '12/5' — in the US it means **December 5th**! Write the month as a word.",
        },
        examples: [{ en: 'We will arrive at around 11 pm on Friday.', vi: 'Chúng tôi sẽ đến khoảng 11 giờ tối thứ Sáu.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-01-write-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi phần của email với câu ví dụ.', en: 'Match each part of the email with an example.' },
        pairs: [
          { left: 'Greeting', right: 'Dear Sir or Madam,' },
          { left: 'Reason for writing', right: 'I have a reservation for 3rd June.' },
          { left: 'Question', right: 'Could you tell me if there is a pool?' },
          { left: 'Request', right: 'I would like a quiet room, please.' },
          { left: 'Ending', right: 'I look forward to hearing from you.' },
        ],
        explanation: {
          vi: 'Email rõ ràng đi theo thứ tự: chào → lý do → hỏi / yêu cầu → kết.',
          en: 'A clear email goes: greeting → reason → questions / request → ending.',
        },
      },
      {
        id: 'l2b-g-01-write-ex02',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Could you tell me what time is breakfast?',
          'Could you tell me what time breakfast is?',
          'Could you tell me what time breakfast?',
          'Could you tell me breakfast what time is?',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu hỏi gián tiếp: chủ ngữ trước động từ (breakfast is).',
          en: 'Indirect question: subject before verb (breakfast is).',
        },
      },
      {
        id: 'l2b-g-01-write-ex03',
        type: 'fill-blank',
        sentence: 'Could you tell me ___ there is a car park at the hotel?',
        acceptedAnswers: ['if', 'whether'],
        hint: 'a yes/no question',
        explanation: {
          vi: 'Câu hỏi Có/Không gián tiếp dùng if (hoặc whether).',
          en: 'Indirect yes/no questions use if (or whether).',
        },
      },
      {
        id: 'l2b-g-01-write-ex04',
        type: 'fill-blank',
        sentence: 'I look forward to ___ from you.',
        acceptedAnswers: ['hearing'],
        hint: '(hear)',
        explanation: {
          vi: "look forward to + V-ing: 'to' ở đây là giới từ.",
          en: "look forward to + -ing: here 'to' is a preposition.",
        },
      },
      {
        id: 'l2b-g-01-write-ex05',
        type: 'arrange-words',
        translationVi: 'Tôi muốn hỏi về dịch vụ đưa đón sân bay.',
        correctSentence: 'I would like to ask about airport transfers.',
        extraWords: ['asking', 'for'],
        explanation: {
          vi: 'would like + to + V: would like to ask.',
          en: 'Use would like + to + verb.',
        },
      },
      {
        id: 'l2b-g-01-write-ex06',
        type: 'multiple-choice',
        question: 'You are writing to a hotel. Which ending is the best?',
        options: ['Bye bye!', 'See ya!', 'Best regards, Lan Nguyen', 'Love you, Lan'],
        correctIndex: 2,
        explanation: {
          vi: "Email gửi khách sạn cần lịch sự: 'Best regards,' + họ tên.",
          en: "A hotel email should end politely: 'Best regards,' + full name.",
        },
      },
      {
        id: 'l2b-g-01-write-ex07',
        type: 'fill-blank',
        sentence: 'We will stay ___ 12th to 14th May.',
        acceptedAnswers: ['from'],
        explanation: {
          vi: 'from ... to ... = từ ngày ... đến ngày ...',
          en: 'from ... to ... shows the start and end.',
        },
      },
      {
        id: 'l2b-g-01-write-ex08',
        type: 'listen-type',
        audioText: 'I look forward to hearing from you.',
        acceptedAnswers: ['I look forward to hearing from you.'],
        explanation: {
          vi: 'Câu kết email rất hay dùng — hãy thuộc lòng.',
          en: 'A very common email ending — learn it by heart.',
        },
      },
      {
        id: 'l2b-g-01-write-ex09',
        type: 'speak-sentence',
        sentence: 'Could you tell me if the hotel has a swimming pool?',
        translationVi: 'Bạn có thể cho tôi biết khách sạn có bể bơi không?',
        explanation: {
          vi: "Câu hỏi gián tiếp: 'the hotel has', không dùng 'does'.",
          en: "Indirect question: 'the hotel has', not 'does the hotel have'.",
        },
      },
    ],
    writingTask: {
      id: 'l2b-g-01-write-task',
      taskNumber: 2,
      prompt:
        'You have booked a room at the Green Hill Hotel in Da Lat for next weekend. Write an email to the hotel.\nIn your email:\n• say who you are and when you are staying\n• ask TWO questions (for example, about breakfast, parking or getting from the airport)\n• make ONE polite request\nWrite 60–100 words.',
      minWords: 60,
      suggestedMinutes: 15,
      sampleAnswer:
        'Dear Sir or Madam,\n\nI have a reservation for a double room at your hotel from 14th to 16th June under the name Lan Nguyen.\n\nCould you tell me what time breakfast is served? I would also like to know if there is any parking near the hotel, as we are planning to drive from Ho Chi Minh City.\n\nFinally, I would be grateful if you could give us a room away from the street, because my husband finds it hard to sleep when it is noisy.\n\nI look forward to hearing from you.\n\nBest regards,\nLan Nguyen',
      bandSamples: [
        {
          band: '3.5',
          text: 'Hello hotel,\n\nMy name Lan. I booking room in your hotel next weekend, 2 night. I want ask some question. What time is breakfast start? Your hotel have car park? I go by car with my husband.\n\nI want a room quiet because I can\'t sleep when it noisy. Please answer me fast.\n\nThank you\nLan',
          notesVi:
            "TA: có 2 câu hỏi và 1 yêu cầu nhưng không ghi ngày cụ thể, bài dưới 60 từ; 'Please answer me fast' nghe cộc. CC: có chia đoạn nhưng lời chào chưa đúng kiểu email ('Hello hotel'). LR: từ đơn giản, thiếu cụm lịch sự (Could you..., I would like...). GRA: nhiều lỗi cơ bản: 'My name Lan', 'I booking', '2 night', 'What time is breakfast start?', 'Your hotel have'.",
        },
        {
          band: '4.5',
          text: 'Dear Sir or Madam,\n\nMy name is Lan Nguyen. I have booked a double room at your hotel from 14th to 16th June.\n\nI would like to ask two questions. First, what time does breakfast start? Second, is there a car park at the hotel? We will come by car.\n\nAlso, could I have a quiet room, please? My husband is a light sleeper.\n\nI look forward to hearing from you.\n\nBest regards,\nLan Nguyen',
          notesVi:
            "TA: đủ 3 ý của đề, ngày tháng rõ ràng. CC: bố cục email chuẩn, có 'First', 'Second', 'Also'. LR: từ phù hợp nhưng còn đơn giản; câu hỏi trực tiếp, chưa dùng 'Could you tell me...'. GRA: gần như không lỗi, nhưng câu ngắn và giống nhau.",
        },
        {
          band: '5.5',
          text: 'Dear Sir or Madam,\n\nI have a reservation for a double room at your hotel from 14th to 16th June under the name Lan Nguyen.\n\nCould you tell me what time breakfast is served? I would also like to know if there is any parking near the hotel, as we are planning to drive from Ho Chi Minh City.\n\nFinally, I would be grateful if you could give us a room away from the street, because my husband finds it hard to sleep when it is noisy.\n\nI look forward to hearing from you.\n\nBest regards,\nLan Nguyen',
          notesVi:
            "TA: đủ và rõ cả 3 ý, có lý do cho yêu cầu. CC: các đoạn theo thứ tự hợp lý, nối ý tự nhiên ('also', 'as', 'Finally'). LR: cụm lịch sự đa dạng ('under the name', 'I would be grateful if...'). GRA: dùng tốt câu hỏi gián tiếp và câu phức, không lỗi.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn đã nói tên mình và ngày ở (từ ngày nào đến ngày nào) chưa?',
            'Bạn đã hỏi đủ HAI câu hỏi chưa?',
            'Bạn có đưa ra MỘT yêu cầu lịch sự không?',
            'Bài có từ 60 đến 100 từ không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Có lời chào (Dear ...) và lời kết (Best regards, + tên) không?',
            'Mỗi ý chính có một đoạn riêng không?',
            'Bạn có dùng từ nối như also, first, finally không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ của chặng (reservation, check in, luggage...) không?',
            "Bạn có dùng 'Could you...?', 'I would like...' thay cho 'I want...' không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Câu hỏi có đúng trật tự không (What time does breakfast start? / Could you tell me what time breakfast is?)?',
            'Ngày tháng có giới từ đúng không (on 14th June, from ... to ...)?',
            "Bạn đã kiểm tra -s số nhiều và động từ 'be' chưa (My name is..., 2 nights)?",
          ],
        },
      ],
      planningHintsVi: [
        'Gạch đầu dòng 3 ý của đề trước khi viết.',
        'Đoạn 1: bạn là ai + ngày ở. Đoạn 2: hai câu hỏi. Đoạn 3: một yêu cầu + lý do.',
        "Kết bằng 'I look forward to hearing from you.' và 'Best regards,' + tên.",
        'Đọc lại: đếm từ (60–100) và soát các lỗi hay gặp (thiếu is/am/are, thiếu -s).',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — VIẾT: EMAIL CÔNG VIỆC — BÁO VẮNG HỌP, ĐỀ XUẤT GIỜ KHÁC
   * Xin lỗi – giải thích – đề xuất – đề nghị giúp. Mẫu câu: I'm afraid I won't be able to...,
   * Would ... work for you?, by + thời hạn.
   * ======================================================================== */
  {
    id: 'l2b-g-02-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 20,
    title: { vi: 'Viết: email báo vắng họp và đề xuất giờ khác', en: 'Writing: an email to move a meeting' },
    description: {
      vi: 'Viết email ngắn cho đồng nghiệp: xin lỗi vì không dự họp được, giải thích lý do và đề xuất thời gian khác.',
      en: "Write a short email to a colleague: say sorry you can't come to a meeting, explain why and suggest another time.",
    },
    teachingCards: [
      {
        title: { vi: 'Email công việc: ngắn, rõ, lịch sự', en: 'Work emails: short, clear, polite' },
        body: {
          vi: "Biết tên người nhận → **Hi Nam,** / **Dear Ms Lan,** (trang trọng hơn).\nCâu đầu nói ngay **mục đích**: **I'm writing about** Thursday's meeting.\nMỗi đoạn **1 ý**. Kết: **Thanks,** / **Best regards,** + tên.\nVới đồng nghiệp thân, có thể viết tắt (I'm, can't).",
          en: "If you know the name → **Hi Nam,** / **Dear Ms Lan,** (more formal).\nThe first line gives the **purpose**: **I'm writing about** Thursday's meeting.\n**One idea** per paragraph. End: **Thanks,** / **Best regards,** + name.\nWith colleagues you know well, contractions (I'm, can't) are fine.",
        },
        examples: [{ en: "Hi Nam, I'm writing about Thursday's meeting.", vi: 'Chào Nam, mình viết về cuộc họp thứ Năm.' }],
      },
      {
        title: { vi: 'Xin lỗi – giải thích – đề xuất – giúp đỡ', en: 'Apologise, explain, suggest, help' },
        body: {
          vi: "**Xin lỗi**: I'm sorry, but I can't come to... / I'm afraid I won't be able to...\n**Giải thích**: I have to visit a customer that day.\n**Đề xuất**: Could we move it to...? / Would Friday morning work for you?\n**Giúp đỡ**: I'll send you my notes. / I've attached the report.",
          en: "**Apologise**: I'm sorry, but I can't come to... / I'm afraid I won't be able to...\n**Explain**: I have to visit a customer that day.\n**Suggest**: Could we move it to...? / Would Friday morning work for you?\n**Help**: I'll send you my notes. / I've attached the report.",
        },
        examples: [{ en: 'Would Friday morning work for you?', vi: 'Sáng thứ Sáu có tiện cho bạn không?' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-02-write-ex01',
        type: 'multiple-choice',
        question: 'Which first sentence tells the purpose of the email clearly?',
        options: [
          'Hello, how are you? The weather is nice.',
          "I'm writing about tomorrow's team meeting.",
          'I am a person in your company.',
          'Do you like meetings?',
        ],
        correctIndex: 1,
        explanation: {
          vi: "Câu đầu email công việc nên nói ngay mục đích: 'I'm writing about...'.",
          en: "A work email should start with its purpose: 'I'm writing about...'.",
        },
      },
      {
        id: 'l2b-g-02-write-ex02',
        type: 'fill-blank',
        sentence: "I'm afraid I won't be ___ to come to the meeting.",
        acceptedAnswers: ['able'],
        explanation: {
          vi: "won't be able to + V = sẽ không thể (làm gì).",
          en: "won't be able to + verb = will not be possible for me.",
        },
      },
      {
        id: 'l2b-g-02-write-ex03',
        type: 'fill-blank',
        sentence: 'Would Friday morning ___ for you?',
        acceptedAnswers: ['work', 'do'],
        hint: '= be OK',
        explanation: {
          vi: 'Would ... work for you? = ... có tiện cho bạn không?',
          en: "'Would ... work for you?' asks if a time is OK.",
        },
      },
      {
        id: 'l2b-g-02-write-ex04',
        type: 'arrange-words',
        translationVi: 'Chúng ta có thể dời cuộc họp sang chiều thứ Năm không?',
        correctSentence: 'Could we move the meeting to Thursday afternoon?',
        extraWords: ['on', 'moving'],
        explanation: {
          vi: 'move something to + thời gian mới = dời sang...',
          en: 'move something to + new time.',
        },
      },
      {
        id: 'l2b-g-02-write-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối mục đích với câu phù hợp.', en: 'Match each purpose with a sentence.' },
        pairs: [
          { left: 'Say sorry', right: "I'm sorry, but I can't come." },
          { left: 'Give a reason', right: 'I have to visit a customer that day.' },
          { left: 'Suggest a time', right: 'How about Friday at 10?' },
          { left: 'Offer help', right: "I'll send you my ideas by email." },
          { left: 'End the email', right: 'Best regards, Minh' },
        ],
        explanation: {
          vi: 'Một email báo vắng tốt có đủ 5 phần này.',
          en: 'A good email about missing a meeting has all five parts.',
        },
      },
      {
        id: 'l2b-g-02-write-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I have attach the report.', "I've attached the report.", 'I attaching the report.', "I've attach the report."],
        correctIndex: 1,
        explanation: {
          vi: 'Hiện tại hoàn thành: have + V3 → have attached.',
          en: 'Present perfect: have + past participle (attached).',
        },
      },
      {
        id: 'l2b-g-02-write-ex07',
        type: 'listen-choose',
        audioText: "I'm sorry, but I can't come to the meeting on Thursday because I have to visit a customer.",
        question: "Why can't the speaker come?",
        options: [
          'The speaker is ill.',
          'The speaker has to visit a customer.',
          'The speaker is on holiday.',
          'The meeting is cancelled.',
        ],
        correctIndex: 1,
        explanation: {
          vi: "Lý do đứng sau 'because': 'I have to visit a customer'.",
          en: "The reason comes after 'because': visiting a customer.",
        },
      },
      {
        id: 'l2b-g-02-write-ex08',
        type: 'fill-blank',
        sentence: 'Please send me the report ___ Friday. (= not later than Friday)',
        acceptedAnswers: ['by'],
        explanation: {
          vi: 'by + thời điểm = không muộn hơn lúc đó.',
          en: "'By' + time = not later than that time.",
        },
      },
      {
        id: 'l2b-g-02-write-ex09',
        type: 'speak-sentence',
        sentence: "I'm afraid I won't be able to come to the meeting.",
        translationVi: 'Tôi e là tôi không thể đến dự cuộc họp.',
        explanation: {
          vi: "'won't' /wəʊnt/ khác 'want' /wɒnt/ — đọc tròn môi ở /əʊ/.",
          en: "'Won't' /wəʊnt/ sounds different from 'want' /wɒnt/.",
        },
      },
    ],
    writingTask: {
      id: 'l2b-g-02-write-task',
      taskNumber: 2,
      prompt:
        'You have a meeting with your colleague, Ms Hanh, on Thursday at 2 pm, but you cannot go.\nWrite an email to Ms Hanh. In your email:\n• say sorry and explain why you cannot come\n• suggest another day and time\n• offer to do something to help (for example, send your ideas or a report)\nWrite 60–100 words.',
      minWords: 60,
      suggestedMinutes: 15,
      sampleAnswer:
        "Dear Ms Hanh,\n\nI'm afraid I won't be able to attend our meeting on Thursday at 2 pm. I have to take my mother to a hospital appointment that afternoon, and I'm sorry for the short notice.\n\nWould Friday morning work for you instead? I'm available any time between 9 and 11.30.\n\nIn the meantime, I'll email you my ideas for the summer campaign by Wednesday evening, so you'll have time to look at them before we meet.\n\nBest regards,\nTuan",
      bandSamples: [
        {
          band: '3.5',
          text: "Hi Ms Hanh,\n\nI am sorry. I can't go meeting Thursday. Because I must to go hospital with my mother, she sick.\n\nWe can meeting other day? Friday is ok for me, morning or afternoon all ok.\n\nI send you my idea by email after. You read it before.\n\nThanks you,\nTuan",
          notesVi:
            "TA: có đủ 3 ý nhưng giờ đề xuất mơ hồ và bài hơi ngắn (dưới 60 từ). CC: chia đoạn được nhưng ý cuối khó hiểu ('You read it before'). LR: thiếu cụm email công việc (I'm afraid..., Would ... work for you?). GRA: nhiều lỗi: 'must to go', 'she sick', 'We can meeting', 'Thanks you'.",
        },
        {
          band: '4.5',
          text: "Dear Ms Hanh,\n\nI'm sorry, but I can't come to our meeting on Thursday at 2 pm. I have to take my mother to the hospital that afternoon.\n\nCan we have the meeting on Friday morning? I am free from 9 am to 11 am.\n\nI will send you my ideas for the new project before Thursday, so you can read them first.\n\nBest regards,\nTuan",
          notesVi:
            "TA: đủ 3 ý, thời gian đề xuất rõ ràng. CC: mỗi đoạn một ý, dễ theo dõi. LR: từ đúng nhưng đơn giản, ít cụm lịch sự ('Can we...?' thay vì 'Would ... work for you?'). GRA: đúng; câu chủ yếu đơn giản, có một câu với 'so'.",
        },
        {
          band: '5.5',
          text: "Dear Ms Hanh,\n\nI'm afraid I won't be able to attend our meeting on Thursday at 2 pm. I have to take my mother to a hospital appointment that afternoon, and I'm sorry for the short notice.\n\nWould Friday morning work for you instead? I'm available any time between 9 and 11.30.\n\nIn the meantime, I'll email you my ideas for the summer campaign by Wednesday evening, so you'll have time to look at them before we meet.\n\nBest regards,\nTuan",
          notesVi:
            "TA: đủ 3 ý, rõ ràng, có lời xin lỗi phù hợp. CC: bố cục chặt, từ nối tự nhiên ('instead', 'In the meantime', 'so'). LR: cụm từ công việc chuẩn ('short notice', 'available', 'Would ... work for you?'). GRA: dùng chính xác will / won't và câu phức, không lỗi.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn đã xin lỗi VÀ nói rõ lý do chưa?',
            'Bạn có đề xuất ngày VÀ giờ cụ thể không?',
            'Bạn có đề nghị giúp một việc (gửi ý tưởng, báo cáo...) không?',
            'Bài có từ 60 đến 100 từ không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Câu đầu tiên có cho biết ngay mục đích email không?',
            'Mỗi đoạn có đúng một ý không?',
            'Có lời chào và lời kết phù hợp với đồng nghiệp không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Bạn có dùng cụm lịch sự như 'I'm afraid...', 'Would ... work for you?' không?",
            'Bạn có dùng từ của chặng (available, deadline, attach, schedule...) không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Sau 'must', 'can', 'will' bạn có dùng động từ nguyên mẫu, không có 'to' không?",
            'Giới từ thời gian có đúng không (on Thursday, at 2 pm, by Wednesday)?',
            'Câu nào cũng có đủ chủ ngữ và động từ không?',
          ],
        },
      ],
      planningHintsVi: [
        'Đoạn 1: xin lỗi + lý do (1–2 câu).',
        'Đoạn 2: đề xuất ngày, giờ cụ thể bằng một câu hỏi lịch sự.',
        'Đoạn 3: đề nghị giúp + thời hạn (by Wednesday...).',
        'Kiểm tra lại: tên người nhận, ngày giờ, số từ 60–100.',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — VIẾT: TIN NHẮN CHO NHÓM LÀM DỰ ÁN
   * Ngữ pháp theo chương trình phổ thông: hiện tại hoàn thành (already / yet / just),
   * should (gợi ý), will (nhận việc), Shall we...? (hẹn gặp).
   * ======================================================================== */
  {
    id: 'l2b-g-03-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 20,
    title: { vi: 'Viết: tin nhắn cho nhóm làm dự án', en: 'Writing: a message to your project group' },
    description: {
      vi: 'Viết tin nhắn cho nhóm: kể việc đã xong, phân công việc còn lại và hẹn lịch gặp; luyện hiện tại hoàn thành, should và will.',
      en: "Write a message to your group: say what's done, share out the other tasks and arrange a meeting, using the present perfect, should and will.",
    },
    teachingCards: [
      {
        title: { vi: 'Việc đã xong và chưa xong', en: "What's done and what isn't" },
        body: {
          vi: "Dùng **hiện tại hoàn thành** để cập nhật tiến độ:\n**I've already found** ten photos. (đã xong)\n**We haven't written** the introduction **yet**. (chưa xong)\n**Thao has just sent** the survey results. (vừa xong)\nĐây là cách người bản xứ viết tin nhắn cập nhật công việc.",
          en: "Use the **present perfect** for updates:\n**I've already found** ten photos.\n**We haven't written** the introduction **yet**.\n**Thao has just sent** the survey results.\nThis is how people write progress updates.",
        },
        examples: [{ en: "Good news: I've already finished the poster!", vi: 'Tin vui: mình đã làm xong tấm áp phích rồi!' }],
      },
      {
        title: { vi: 'Phân công việc và hẹn gặp', en: 'Sharing tasks and meeting up' },
        body: {
          vi: "Gợi ý ai làm gì: **Bao should** write the questions. / **Could you** check the spelling?\nNhận việc: **I'll** make the slides.\nHẹn gặp: **Shall we meet** on Saturday at 9.30? / **Let's meet** at the library.\nKết thân thiện: **See you then!** / **Let me know if that's OK.**",
          en: "Suggest who does what: **Bao should** write the questions. / **Could you** check the spelling?\nOffer: **I'll** make the slides.\nMeet: **Shall we meet** on Saturday at 9.30? / **Let's meet** at the library.\nFriendly ending: **See you then!** / **Let me know if that's OK.**",
        },
        examples: [{ en: "I'll bring my laptop. Let me know if that's OK.", vi: 'Mình sẽ mang laptop. Báo mình nếu được nhé.' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-03-write-ex01',
        type: 'fill-blank',
        sentence: "I've ___ finished the poster. Do you want to see it?",
        acceptedAnswers: ['already', 'just'],
        hint: 'already / yet',
        explanation: {
          vi: "Câu khẳng định → 'already' đứng giữa have và V3.",
          en: "In positive sentences, 'already' goes between 'have' and the verb.",
        },
      },
      {
        id: 'l2b-g-03-write-ex02',
        type: 'fill-blank',
        sentence: "We haven't written the introduction ___.",
        acceptedAnswers: ['yet'],
        hint: 'already / yet',
        explanation: {
          vi: "Câu phủ định → 'yet' đứng cuối câu.",
          en: "In negative sentences, 'yet' goes at the end.",
        },
      },
      {
        id: 'l2b-g-03-write-ex03',
        type: 'multiple-choice',
        question: "'Who can make the slides?' – '___ make them!'",
        options: ["I'll", "I'm going", "I've", 'I should to'],
        correctIndex: 0,
        explanation: {
          vi: "Nhận việc ngay lúc nói → 'I'll' (I will).",
          en: "Offering while speaking → 'I'll'.",
        },
      },
      {
        id: 'l2b-g-03-write-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Bao should writes the questions.',
          'Bao should write the questions.',
          'Bao should to write the questions.',
          'Bao shoulds write the questions.',
        ],
        correctIndex: 1,
        explanation: {
          vi: "should + V nguyên mẫu: không thêm -s, không có 'to'.",
          en: "should + base verb: no -s and no 'to'.",
        },
      },
      {
        id: 'l2b-g-03-write-ex05',
        type: 'arrange-words',
        translationVi: 'Có ai làm xong phần của mình chưa?',
        correctSentence: 'Has anyone finished their part yet?',
        extraWords: ['already', 'did'],
        explanation: {
          vi: "Câu hỏi 'đã... chưa?' → Has + chủ ngữ + V3 ... yet?",
          en: 'Has + subject + past participle ... yet?',
        },
      },
      {
        id: 'l2b-g-03-write-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi câu với chức năng của nó.', en: 'Match each sentence with what it does.' },
        pairs: [
          { left: "I've already found the photos.", right: 'Something is finished.' },
          { left: "We haven't started the slides yet.", right: "Something isn't finished." },
          { left: 'Linh should check the spelling.', right: 'A suggestion.' },
          { left: "I'll print the poster.", right: 'An offer.' },
          { left: 'Shall we meet on Sunday?', right: 'Arranging a meeting.' },
        ],
        explanation: {
          vi: 'Tin nhắn nhóm tốt có đủ: đã xong, chưa xong, gợi ý, nhận việc, hẹn gặp.',
          en: 'A good group message has all of these parts.',
        },
      },
      {
        id: 'l2b-g-03-write-ex07',
        type: 'listen-type',
        audioText: "We haven't finished the slides yet.",
        acceptedAnswers: ["We haven't finished the slides yet.", 'We have not finished the slides yet.'],
        explanation: {
          vi: "haven't + V3 + yet = chưa làm xong.",
          en: "haven't + past participle + yet = not finished.",
        },
      },
      {
        id: 'l2b-g-03-write-ex08',
        type: 'fill-blank',
        sentence: 'Thao has ___ sent the survey results. Check your email now!',
        acceptedAnswers: ['just'],
        hint: '= a very short time ago',
        explanation: {
          vi: "'just' = vừa mới, việc vừa xảy ra.",
          en: "'Just' = a very short time ago.",
        },
      },
      {
        id: 'l2b-g-03-write-ex09',
        type: 'speak-sentence',
        sentence: "I've already finished my part. I'll send it tonight.",
        translationVi: 'Mình làm xong phần của mình rồi. Tối nay mình sẽ gửi.',
        explanation: {
          vi: "Đọc rõ /v/ trong 'I've' và /l/ trong 'I'll'.",
          en: "Say the /v/ in 'I've' and the /l/ in 'I'll'.",
        },
      },
    ],
    writingTask: {
      id: 'l2b-g-03-write-task',
      taskNumber: 2,
      prompt:
        'Your group is doing a science project about saving water. Write a message to your group.\nIn your message:\n• say what you have already done\n• say what is not finished yet and who should do each task\n• suggest a time and place to meet\nWrite 60–100 words.',
      minWords: 60,
      suggestedMinutes: 15,
      sampleAnswer:
        "Hi team,\n\nQuick update on our water project! I've just finished the poster, and I've already uploaded ten photos of the river to our group folder.\n\nHowever, we haven't started the survey yet, and the deadline is next Friday. Bao, since you're the best at writing questions, could you do that by Wednesday? Thao should start the slides, and Minh can check everything at the end.\n\nShall we meet at the school library on Saturday at 9.30? I'll bring my laptop so we can practise the presentation together.\n\nLet me know if that works!\nLinh",
      bandSamples: [
        {
          band: '3.5',
          text: 'Hi everyone,\n\nI finish the poster already, it very beautiful. But the survey is not finish and we don\'t have photo. Bao should to write question for survey and Thao do the slide. Minh take photo.\n\nWe meet Saturday? At library 9 o\'clock. I bring my laptop.\n\nBye,\nLinh',
          notesVi:
            "TA: có đủ 3 ý nhưng bài hơi ngắn, thông tin hẹn gặp chưa rõ. CC: ý đúng thứ tự nhưng câu rời rạc, ít từ nối. LR: lặp từ đơn giản, thiếu -s ('photo', 'question'). GRA: sai hiện tại hoàn thành ('I finish ... already'), thiếu 'is' ('it very beautiful'), 'should to write'.",
        },
        {
          band: '4.5',
          text: "Hi everyone,\n\nI've already finished the poster, and I've also found some photos of the river near our school.\n\nWe haven't done the survey yet. Bao, you should write the questions because you are good at that. Thao should make the slides, and Minh can check the spelling.\n\nShall we meet on Saturday at 9.30 at the school library? I'll bring my laptop.\n\nSee you then!\nLinh",
          notesVi:
            "TA: đủ 3 ý, phân công rõ ràng. CC: chia đoạn hợp lý; từ nối còn đơn giản (and, because). LR: từ phù hợp với tin nhắn nhóm. GRA: dùng đúng hiện tại hoàn thành, should, will; câu chưa đa dạng.",
        },
        {
          band: '5.5',
          text: "Hi team,\n\nQuick update on our water project! I've just finished the poster, and I've already uploaded ten photos of the river to our group folder.\n\nHowever, we haven't started the survey yet, and the deadline is next Friday. Bao, since you're the best at writing questions, could you do that by Wednesday? Thao should start the slides, and Minh can check everything at the end.\n\nShall we meet at the school library on Saturday at 9.30? I'll bring my laptop so we can practise the presentation together.\n\nLet me know if that works!\nLinh",
          notesVi:
            "TA: đủ 3 ý, có thêm hạn chót và lý do phân công. CC: mạch lạc, nối ý tốt ('However', 'since', 'so'). LR: cụm tự nhiên ('Quick update', 'group folder', 'Let me know if that works'). GRA: kết hợp chính xác hiện tại hoàn thành, so sánh nhất, should, will.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn đã nói việc mình ĐÃ làm xong chưa?',
            'Bạn có nói việc CHƯA xong và ai nên làm không?',
            'Bạn có đưa ra thời gian VÀ địa điểm gặp không?',
            'Bài có từ 60 đến 100 từ không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Tin nhắn có lời chào và lời kết thân thiện không?',
            'Mỗi đoạn có một ý (đã xong / chưa xong / hẹn gặp) không?',
            'Bạn có dùng từ nối (and, but, however, so) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng từ của chặng (project, presentation, deadline, hand in...) không?',
            'Bạn có tránh lặp một từ quá nhiều lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Bạn có dùng 'have / has + V3' với already, yet, just đúng chỗ không?",
            "Sau 'should' và 'will' có phải động từ nguyên mẫu, không có 'to' không?",
            "Câu nào cũng có động từ không (VD: 'It is very beautiful', không phải 'It very beautiful')?",
          ],
        },
      ],
      planningHintsVi: [
        'Liệt kê 3 nhóm: ĐÃ XONG – CHƯA XONG (ai làm) – HẸN GẶP.',
        "Dùng 'already / just' cho việc đã xong; 'haven't ... yet' cho việc chưa xong.",
        "Dùng 'should' để gợi ý, 'I'll' để nhận việc.",
        'Ghi rõ ngày, giờ, địa điểm gặp.',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — VIẾT: TIN NHẮN GIỚI THIỆU MỘT BỘ PHIM
   * Giới thiệu 3 bước (phim gì – vì sao hay – ai nên xem), không tiết lộ kết thúc,
   * tính từ mạnh thay cho "good" / "bad", ôn -ed / -ing.
   * Tên phim trong bài là tên tự đặt.
   * ======================================================================== */
  {
    id: 'l2b-g-04-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 20,
    title: { vi: 'Viết: tin nhắn giới thiệu một bộ phim', en: 'Writing: recommend a film to a friend' },
    description: {
      vi: 'Viết tin nhắn cho bạn để giới thiệu một bộ phim hoặc phim bộ: phim gì, vì sao hay và ai nên xem.',
      en: "Write a message to a friend recommending a film or series: what it is, why it's good and who should watch it.",
    },
    teachingCards: [
      {
        title: { vi: 'Giới thiệu phim theo 3 bước', en: 'Recommend in three steps' },
        body: {
          vi: "1. **Phim gì**: It's a(n) + loại phim + **called** + tên. It's about + nội dung (1 câu, **không tiết lộ kết thúc**).\n2. **Vì sao hay**: The story is... / The actors are... / The soundtrack is...\n3. **Ai nên xem**: You should watch it if... / I'd recommend it to anyone who...",
          en: "1. **What**: It's a(n) + type + **called** + name. It's about + story (one sentence, **no spoilers**).\n2. **Why it's good**: The story is... / The actors are... / The soundtrack is...\n3. **Who for**: You should watch it if... / I'd recommend it to anyone who...",
        },
        examples: [
          {
            en: "It's an animated film called The Paper Garden. It's about a girl who can talk to plants.",
            vi: 'Đó là phim hoạt hình tên The Paper Garden, kể về một cô bé nói chuyện được với cây cối.',
          },
        ],
      },
      {
        title: { vi: "Từ mạnh hơn 'good' và 'bad'", en: "Better words than 'good' and 'bad'" },
        body: {
          vi: "Thay **good** bằng: **brilliant** (xuất sắc), **amazing**, **moving** (cảm động), **gripping** (cuốn hút), **hilarious** (cực kỳ hài).\nThay **bad** bằng: **boring**, **disappointing** (gây thất vọng), **too long**.\nThêm mức độ: **really / quite / a bit**: 'It's **a bit** long, **but** it's **really** gripping.'",
          en: "Instead of **good**: **brilliant**, **amazing**, **moving**, **gripping**, **hilarious**.\nInstead of **bad**: **boring**, **disappointing**, **too long**.\nAdd degree: **really / quite / a bit**: 'It's **a bit** long, **but** it's **really** gripping.'",
        },
        examples: [{ en: 'The ending was really moving. I cried!', vi: 'Đoạn kết rất cảm động. Mình đã khóc!' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-04-write-ex01',
        type: 'fill-blank',
        sentence: "It's a comedy ___ Family Trip.",
        acceptedAnswers: ['called'],
        hint: '= with the name',
        explanation: {
          vi: 'a film called + tên phim = một bộ phim tên là...',
          en: "Use 'called' + name to say what a film is called.",
        },
      },
      {
        id: 'l2b-g-04-write-ex02',
        type: 'multiple-choice',
        question: "Which word is STRONGER than 'good'?",
        options: ['OK', 'fine', 'brilliant', 'not bad'],
        correctIndex: 2,
        explanation: {
          vi: "brilliant = xuất sắc, mạnh hơn 'good' nhiều.",
          en: "'Brilliant' means very, very good.",
        },
      },
      {
        id: 'l2b-g-04-write-ex03',
        type: 'multiple-choice',
        question: 'Which sentence is a spoiler?',
        options: [
          "It's about a boy who finds a magic map.",
          'The music is fantastic.',
          "In the end, the boy's best friend is the thief!",
          'You should watch it with your family.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu này tiết lộ kết thúc — đừng viết khi giới thiệu phim.',
          en: "It tells the ending — don't write this when you recommend a film.",
        },
      },
      {
        id: 'l2b-g-04-write-ex04',
        type: 'fill-blank',
        sentence: "I'd recommend it to anyone ___ loves animals.",
        acceptedAnswers: ['who', 'that'],
        hint: 'a relative pronoun for people',
        explanation: {
          vi: 'anyone who + động từ = bất kỳ ai (mà)...',
          en: 'anyone who + verb = any person that...',
        },
      },
      {
        id: 'l2b-g-04-write-ex05',
        type: 'arrange-words',
        translationVi: 'Cuối tuần trước mình xem phim đó mà không dừng lại được.',
        correctSentence: "I couldn't stop watching it last weekend.",
        extraWords: ['watch', "can't"],
        explanation: {
          vi: "stop + V-ing = dừng làm gì: couldn't stop watching.",
          en: "stop + -ing: couldn't stop watching.",
        },
      },
      {
        id: 'l2b-g-04-write-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với nghĩa của nó.', en: 'Match each adjective with its meaning.' },
        pairs: [
          { left: 'gripping', right: "so exciting you can't stop watching" },
          { left: 'moving', right: 'makes you feel strong emotions' },
          { left: 'disappointing', right: 'not as good as you hoped' },
          { left: 'hilarious', right: 'extremely funny' },
          { left: 'brilliant', right: 'very, very good' },
        ],
        explanation: {
          vi: "Dùng các tính từ này thay cho 'good' / 'bad' để bài viết sinh động hơn.",
          en: "Use these instead of 'good' and 'bad' to make your writing lively.",
        },
      },
      {
        id: 'l2b-g-04-write-ex07',
        type: 'listen-choose',
        audioText: "It's a bit long, but the acting is brilliant.",
        question: 'What does the speaker think of the acting?',
        options: ["It's boring.", "It's very good.", "It's too long.", "It's disappointing."],
        correctIndex: 1,
        explanation: {
          vi: "Sau 'but': 'the acting is brilliant' = diễn xuất rất tốt.",
          en: "After 'but': the acting is brilliant (very good).",
        },
      },
      {
        id: 'l2b-g-04-write-ex08',
        type: 'fill-blank',
        sentence: "The film was ___. It wasn't as good as I hoped.",
        acceptedAnswers: ['disappointing'],
        hint: '(disappoint)',
        explanation: {
          vi: "Tả bộ phim (sự vật) → -ing: disappointing. 'disappointed' dùng cho người.",
          en: "For the film, use -ing: disappointing. 'Disappointed' is for people.",
        },
      },
      {
        id: 'l2b-g-04-write-ex09',
        type: 'speak-sentence',
        sentence: "It's a bit long, but it's really gripping.",
        translationVi: 'Phim hơi dài, nhưng thật sự rất cuốn.',
        explanation: {
          vi: "Nối âm 'bit long' và nhấn 'GRIP-ping'.",
          en: "Link 'bit long' and stress 'GRIP-ping'.",
        },
      },
    ],
    writingTask: {
      id: 'l2b-g-04-write-task',
      taskNumber: 2,
      prompt:
        'Your English-speaking friend, Sam, wants to watch something good this weekend. Write a message to Sam to recommend a film or a series you like.\nIn your message:\n• say what it is called and what kind of film or series it is\n• say what it is about (no spoilers!) and why you like it\n• say who should watch it\nWrite 60–100 words.',
      minWords: 60,
      suggestedMinutes: 15,
      sampleAnswer:
        "Hi Sam,\n\nIf you're looking for something to watch this weekend, I'd definitely recommend The Last Lighthouse. It's a family drama about a girl who spends a summer with her grandfather on a tiny island.\n\nTo be honest, the first half hour is a bit slow, but stay with it! The second half is really moving, the young actress is brilliant and the soundtrack is beautiful. I won't tell you the ending, but it's a real surprise.\n\nIt's perfect for anyone who enjoys quiet, emotional stories. Just have some tissues ready!\n\nAn",
      bandSamples: [
        {
          band: '3.5',
          text: 'Hi Sam,\n\nYou should watching The Last Lighthouse. It is film about a girl and her grandfather. It very good and very interesting. The girl is very good actor. I am very interesting when I watch.\n\nYou should watch it, it is good film for everybody.\n\nBye,\nAn',
          notesVi:
            "TA: có tên phim và nội dung nhưng lý do mơ hồ ('very good'), chưa nói rõ ai nên xem và bài dưới 60 từ. CC: ý lặp lại, ít từ nối. LR: lặp 'very', 'good'; nhầm 'interesting' với 'interested'. GRA: 'should watching', thiếu 'a' ('It is film'), thiếu 'is' ('It very good').",
        },
        {
          band: '4.5',
          text: "Hi Sam,\n\nI think you should watch The Last Lighthouse. It's a family film about a girl who spends one summer with her grandfather on a small island.\n\nI really liked it because the story is very moving and the girl is a brilliant actor. The first part is a bit slow, but the ending is very surprising.\n\nI think you and your sister will enjoy it. It's good for families.\n\nSee you,\nAn",
          notesVi:
            "TA: đủ 3 ý, có lý do cụ thể. CC: bố cục rõ, dùng 'because', 'but'. LR: có tính từ hay ('moving', 'brilliant', 'surprising') nhưng còn lặp 'I think', 'very'. GRA: đúng, có mệnh đề 'who'; câu khá đơn giản.",
        },
        {
          band: '5.5',
          text: "Hi Sam,\n\nIf you're looking for something to watch this weekend, I'd definitely recommend The Last Lighthouse. It's a family drama about a girl who spends a summer with her grandfather on a tiny island.\n\nTo be honest, the first half hour is a bit slow, but stay with it! The second half is really moving, the young actress is brilliant and the soundtrack is beautiful. I won't tell you the ending, but it's a real surprise.\n\nIt's perfect for anyone who enjoys quiet, emotional stories. Just have some tissues ready!\n\nAn",
          notesVi:
            "TA: đủ 3 ý, lý do rõ, không tiết lộ kết thúc. CC: mạch lạc, có lời khuyên tự nhiên ('stay with it!'). LR: từ vựng phong phú ('definitely recommend', 'moving', 'have some tissues ready'). GRA: câu điều kiện, mệnh đề 'who', 'won't' dùng chính xác.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn có nói tên phim VÀ loại phim không?',
            'Bạn có nói nội dung (không tiết lộ kết thúc) và ít nhất 2 lý do bạn thích không?',
            'Bạn có nói ai nên xem không?',
            'Bài có từ 60 đến 100 từ không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Bài có 3 phần rõ ràng: phim gì – vì sao hay – ai nên xem không?',
            'Bạn có dùng từ nối (because, but, so, also) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Bạn có dùng ít nhất 2 tính từ mạnh (brilliant, moving, gripping...) thay cho 'good' không?",
            'Bạn có dùng đúng -ed / -ing (interesting ≠ interested) không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Sau 'should' có phải động từ nguyên mẫu (should watch) không?",
            "Bạn có viết 'a / an' trước danh từ số ít (a comedy, an animated film) không?",
            "Câu nào cũng có động từ 'be' khi cần (It is very good) không?",
          ],
        },
      ],
      planningHintsVi: [
        'Chọn một phim / phim bộ bạn thật sự thích — viết sẽ dễ hơn.',
        'Viết 1 câu nội dung, KHÔNG kể kết thúc.',
        'Chọn 2 lý do: cốt truyện, diễn viên, nhạc, hình ảnh...',
        "Kết bằng 'You should watch it if...' hoặc 'I'd recommend it to anyone who...'.",
      ],
    },
    miniTest: [],
  },
]
