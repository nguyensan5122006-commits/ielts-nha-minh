/**
 * writing-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * BÀI VIẾT (mode 'writing') — bài CUỐI CÙNG của mỗi chặng
 * ----------------------------------------------------------------------------
 * Viết những thứ người đi làm / người lớn thật sự cần viết: email công việc,
 * email phàn nàn, bài đăng nêu quan điểm, review phim, trả lời bài đăng trên diễn đàn.
 *
 * Danh sách bài:
 *   l3-g-u1-write  Email công việc lịch sự (báo vắng họp)          taskNumber 1 · tiêu chí TA
 *   l3-g-u2-write  Email phàn nàn khách sạn                         taskNumber 1 · tiêu chí TA
 *   l3-g-u3-write  Bài đăng nêu quan điểm về tin tức trên mạng      taskNumber 2 · tiêu chí TR
 *   l3-g-u4-write  Review phim hoặc series                          taskNumber 1 · tiêu chí TA
 *   l3-g-u5-write  Trả lời bài đăng diễn đàn: công nghệ trong gia đình  taskNumber 2 · tiêu chí TR
 *
 * (taskNumber 1 = bài có các ý gạch đầu dòng phải làm đủ → chấm "TA – hoàn thành yêu cầu";
 *  taskNumber 2 = bài nêu quan điểm → chấm "TR – trả lời đúng câu hỏi, quan điểm rõ".)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2–3 thẻ (bố cục, giọng văn, ngữ pháp/từ nối cần dùng)
 *   - exercises     : 10 bài khởi động (chọn câu mở/kết, điền từ, sắp xếp câu, 1 câu đọc to)
 *   - writingTask   : đề + bài mẫu + 3 bài theo mức "4.5" (cơ bản) / "5.5" (khá) / "6.5" (tốt)
 *                     có nhận xét 4 tiêu chí; checklist tự chấm; gợi ý lập dàn ý
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Bài mức 4.5 CỐ Ý có lỗi điển hình của người Việt (sai thì, thiếu -s, thiếu mạo từ,
 * câu "Because…" cụt, dịch từng chữ, viết quá ngắn) để người học so sánh.
 * Quy ước id: bài "l3-g-u<chặng>-write", bài tập "...-ex<số>", đề "...-task".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level3GeneralWritingLessons: Lesson[] = [
  /* ==========================================================================
   * CHẶNG 1 — EMAIL CÔNG VIỆC LỊCH SỰ
   * Đề: báo quản lý rằng mình vắng buổi họp nhóm, đưa cách cập nhật và đề nghị giúp đỡ.
   * ======================================================================== */
  {
    id: 'l3-g-u1-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 25,
    title: { vi: 'Viết email công việc lịch sự', en: 'Writing a polite work email' },
    description: {
      vi: 'Viết email cho quản lý: báo vắng mặt, đưa giải pháp và giữ giọng văn lịch sự, rõ ràng.',
      en: 'Write an email to your manager: explain an absence, offer solutions and keep a polite, clear tone.',
    },
    teachingCards: [
      {
        title: { vi: 'Bố cục email công việc', en: 'The structure of a work email' },
        body: {
          vi: '**Subject** rõ ràng: Absence from Tuesday\'s meeting\n**Mở**: Dear Ms Carter, / Hi Tom, (đồng nghiệp thân)\n**Lý do viết**: I\'m writing to let you know that…\n**Chi tiết + giải pháp**: mỗi ý một đoạn ngắn\n**Việc tiếp theo**: Please let me know if…\n**Kết**: Best regards, / Kind regards, + tên',
          en: 'A clear **subject**: Absence from Tuesday\'s meeting\n**Greeting**: Dear Ms Carter, / Hi Tom, (a close colleague)\n**Reason for writing**: I\'m writing to let you know that…\n**Details + solutions**: one short paragraph each\n**Next step**: Please let me know if…\n**Closing**: Best regards, / Kind regards, + name',
        },
      },
      {
        title: { vi: 'Giọng văn: lịch sự nhưng không cứng', en: 'Tone: polite but not stiff' },
        body: {
          vi: 'Tránh **quá suồng sã**: "Hey boss", "thx", "u", "!!!".\nTránh **quá cứng**: "I hereby inform you".\nDùng câu mềm: **I\'m afraid I won\'t be able to…** / **Would it be possible to…?** / **I\'d be happy to…**\nEmail công việc tốt thường **ngắn gọn**: khoảng 120–180 từ.',
          en: 'Avoid being **too casual**: "Hey boss", "thx", "u", "!!!".\nAvoid being **too stiff**: "I hereby inform you".\nUse soft phrases: **I\'m afraid I won\'t be able to…** / **Would it be possible to…?** / **I\'d be happy to…**\nGood work emails are **short**: about 120–180 words.',
        },
        examples: [
          { en: "I'm afraid I won't be able to attend the meeting on Tuesday.", vi: 'Tôi e là tôi không thể dự cuộc họp hôm thứ Ba.' },
        ],
      },
      {
        title: { vi: 'Lỗi hay gặp của người Việt', en: 'Common mistakes' },
        body: {
          vi: '"I want to inform you that…" (nghe cứng, như dịch) → **I\'m writing to let you know that…**\n"Waiting for your reply." (câu cụt) → **I look forward to hearing from you.**\n"Please reply me." → **Please let me know.** / **Please reply to me.**\n"I will absent." → **I will be absent.** / **I won\'t be in.**',
          en: '"I want to inform you that…" (stiff, translated) → **I\'m writing to let you know that…**\n"Waiting for your reply." (incomplete) → **I look forward to hearing from you.**\n"Please reply me." → **Please let me know.** / **Please reply to me.**\n"I will absent." → **I will be absent.** / **I won\'t be in.**',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u1-write-ex01',
        type: 'multiple-choice',
        question: 'Which subject line is the best?',
        options: ['Hello', 'Important!!!', "Absence from Tuesday's team meeting", 'About something'],
        correctIndex: 2,
        explanation: {
          vi: 'Tiêu đề tốt cho người đọc biết ngay email nói về việc gì.',
          en: 'A good subject tells the reader immediately what the email is about.',
        },
      },
      {
        id: 'l3-g-u1-write-ex02',
        type: 'multiple-choice',
        question: 'Which greeting is best for an email to your manager?',
        options: ['Hey boss,', 'Dear Ms Carter,', 'To who it may concern,', 'Yo Sarah,'],
        correctIndex: 1,
        explanation: {
          vi: '"Dear + Mr/Ms + họ" lịch sự, phù hợp gửi quản lý.',
          en: '"Dear + Mr/Ms + surname" is polite and right for a manager.',
        },
      },
      {
        id: 'l3-g-u1-write-ex03',
        type: 'fill-blank',
        sentence: "I'm writing ___ let you know that I can't attend the meeting.",
        acceptedAnswers: ['to'],
        explanation: {
          vi: '"I\'m writing to + V" nêu lý do viết email.',
          en: '"I\'m writing to + verb" gives the reason for the email.',
        },
      },
      {
        id: 'l3-g-u1-write-ex04',
        type: 'multiple-choice',
        question: 'Which is the most natural way to say "I want to inform you that I will be absent"?',
        options: [
          "I'm writing to let you know that I won't be in the office on Tuesday.",
          'I inform you I am absent.',
          'I hereby inform you of my absence.',
          'Absent Tuesday, sorry!!',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Câu A lịch sự, tự nhiên; B sai ngữ pháp, C quá cứng, D quá suồng sã.',
          en: 'A is polite and natural; B is ungrammatical, C too stiff, D too casual.',
        },
      },
      {
        id: 'l3-g-u1-write-ex05',
        type: 'fill-blank',
        sentence: 'I look forward to ___ from you.',
        acceptedAnswers: ['hearing'],
        hint: '(hear)',
        explanation: {
          vi: '"look forward to + V-ing": "to" ở đây là giới từ, nên dùng V-ing.',
          en: '"look forward to + -ing": "to" is a preposition here.',
        },
      },
      {
        id: 'l3-g-u1-write-ex06',
        type: 'multiple-choice',
        question: 'Which closing is correct for a work email?',
        options: ['Best regards, Minh', 'Love, Minh', 'Bye bye, Minh', 'Waiting for your reply, Minh'],
        correctIndex: 0,
        explanation: {
          vi: '"Best regards" / "Kind regards" là cách kết chuẩn trong công việc.',
          en: '"Best regards" or "Kind regards" are standard work closings.',
        },
      },
      {
        id: 'l3-g-u1-write-ex07',
        type: 'arrange-words',
        translationVi: 'Tôi rất sẵn lòng gửi cho chị các ghi chú của tôi trước cuộc họp.',
        correctSentence: "I'd be happy to send you my notes before the meeting.",
        extraWords: ['sending', 'for'],
        explanation: {
          vi: '"I\'d be happy to + V" = đề nghị giúp đỡ lịch sự.',
          en: '"I\'d be happy to + verb" politely offers help.',
        },
      },
      {
        id: 'l3-g-u1-write-ex08',
        type: 'multiple-choice',
        question: 'Which sentence is TOO informal for an email to a manager?',
        options: [
          'Could we discuss this on Monday?',
          'Thx, c u tmr!',
          "I'm afraid I won't be able to attend.",
          'Please let me know if that works for you.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Viết tắt kiểu tin nhắn (thx, c u, tmr) không dùng trong email công việc.',
          en: 'Text-message shortcuts (thx, c u, tmr) don\'t belong in work emails.',
        },
      },
      {
        id: 'l3-g-u1-write-ex09',
        type: 'fill-blank',
        sentence: 'Please let me know ___ you have any questions.',
        acceptedAnswers: ['if'],
        explanation: {
          vi: 'Câu kết quen thuộc: "Please let me know if…".',
          en: 'A common closing line: "Please let me know if…".',
        },
      },
      {
        id: 'l3-g-u1-write-ex10',
        type: 'speak-sentence',
        sentence: "I'm afraid I won't be able to attend the meeting on Tuesday.",
        translationVi: 'Tôi e là tôi không thể dự cuộc họp hôm thứ Ba.',
        explanation: {
          vi: 'Đọc rõ /t/ trong "won\'t" và /d/ cuối "attend". Nhấn a-FRAID, a-TTEND.',
          en: 'Say the /t/ in "won\'t" and the /d/ in "attend". Stress a-FRAID, a-TTEND.',
        },
      },
    ],
    writingTask: {
      id: 'l3-g-u1-write-task',
      taskNumber: 1,
      prompt:
        'You have to miss an important team meeting next Tuesday.\n\nWrite an email to your manager, Ms Carter. In your email:\n- explain why you cannot attend the meeting\n- say how you will find out what you missed\n- offer to do something to help before the meeting\n\nWrite at least 120 words. You do NOT need to write any addresses.',
      minWords: 120,
      suggestedMinutes: 20,
      sampleAnswer:
        "Subject: Absence from Tuesday's team meeting\n\nDear Ms Carter,\n\nI'm writing to let you know that, unfortunately, I won't be able to attend the team meeting next Tuesday. My sister is getting married in Hue that weekend, and the earliest flight back to Hanoi lands on Tuesday afternoon.\n\nI'm sorry to miss it, especially as we'll be discussing the new delivery schedule. Would it be possible for someone to share the notes with me afterwards? I'll read them on Wednesday morning and follow up with Tom if I have any questions.\n\nIn the meantime, I'd be happy to help prepare for the meeting. I could update the customer feedback report and send it to everyone by Friday, so that the team has the latest figures to discuss.\n\nPlease let me know if that works for you.\n\nBest regards,\nMinh",
      bandSamples: [
        {
          band: '4.5',
          text:
            "Hi Ms Carter,\n\nI want to inform you that I can not go to the meeting on next Tuesday. Because my sister get married in Hue and I must to go there. The flight come back in Tuesday afternoon so I cannot come.\n\nI am very sorry about this. Maybe I ask someone about the meeting later.\n\nI can help you before meeting. I can do the report about customer and send to everyone. Please tell me what I need to do.\n\nWaiting for your reply.\nMinh",
          notesVi:
            'Khoảng 4.5. TA: có nhắc 3 ý nhưng ý 2 rất mơ hồ ("Maybe I ask someone"), bài dưới 120 từ, giọng văn lẫn lộn (Hi + "I want to inform you"). CC: có chia đoạn nhưng "Because…" đứng riêng thành câu cụt. LR: cụm dịch từng chữ ("I must to go", "Waiting for your reply"). GRA: nhiều lỗi cơ bản: "get married", "on next Tuesday", "can not", thiếu mạo từ "before meeting".',
        },
        {
          band: '5.5',
          text:
            "Dear Ms Carter,\n\nI am writing to tell you that I cannot attend the team meeting next Tuesday. The reason is my sister's wedding in Hue on the weekend, and my flight will arrive to Hanoi on Tuesday afternoon, so I will not be in time for the meeting.\n\nI am sorry for this inconvenience. After the meeting, I will ask Tom to explain me the main points, and I will also read the meeting notes on Wednesday morning.\n\nBefore the meeting, I can help to prepare. For example, I can update the customer feedback report and send it to all the team on Friday. I hope this will be useful for the discussion.\n\nPlease let me know if you need anything else.\n\nBest regards,\nMinh",
          notesVi:
            'Khoảng 5.5. TA: đủ cả 3 ý, giọng văn phù hợp, đủ độ dài. CC: bố cục rõ, mỗi đoạn một ý, nhưng từ nối còn đơn giản (so, for example). LR: đủ dùng nhưng lặp "I will", "I can"; ít cụm tự nhiên. GRA: phần lớn đúng; còn lỗi "arrive to Hanoi" (arrive in) và "explain me" (explain to me).',
        },
        {
          band: '6.5',
          text:
            "Subject: Absence from Tuesday's meeting\n\nDear Ms Carter,\n\nI'm afraid I won't be able to attend next Tuesday's team meeting. My sister is getting married in Hue over the weekend, and the earliest flight back lands at three o'clock on Tuesday afternoon, which is after the meeting finishes.\n\nI'm sorry to miss it, particularly as we'll be discussing the new delivery schedule. I've already asked Tom if he could take notes for me, and I'll go through them first thing on Wednesday. If anything is unclear, I'll follow up with him or with you directly.\n\nIn the meantime, I'd be happy to help with the preparation. I could update the customer feedback report so that everyone has the latest figures, and send it round by Friday afternoon. Alternatively, if there is anything else you need, just let me know.\n\nThank you for understanding.\n\nBest regards,\nMinh",
          notesVi:
            'Khoảng 6.5. TA: trả lời đầy đủ, chi tiết cụ thể, giọng văn lịch sự và tự nhiên. CC: các đoạn nối mạch lạc (In the meantime, Alternatively, If anything is unclear). LR: cụm tự nhiên (first thing on Wednesday, send it round, go through). GRA: đa dạng (mệnh đề quan hệ, câu điều kiện, hiện tại hoàn thành) và hầu như không lỗi.',
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn đã trả lời đủ cả 3 ý gạch đầu dòng trong đề chưa?',
            'Bài có từ 120 từ trở lên không?',
            'Giọng văn có lịch sự, hợp để gửi quản lý (không "Hey", không viết tắt kiểu chat) không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi ý có nằm trong một đoạn riêng không?',
            'Có câu mở nói rõ lý do viết và câu kết lịch sự không?',
            'Bạn có dùng từ nối giữa các ý (so, because, In the meantime…) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng ít nhất 2 cụm lịch sự (I\'m afraid…, Would it be possible…, I\'d be happy to…) không?',
            'Bạn có tránh lặp một cụm (I can, I will) quá nhiều lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Các động từ có đúng thì (won\'t be able to, will, could) không?',
            'Bạn đã kiểm tra mạo từ (a / the) và giới từ (arrive in, on Tuesday) chưa?',
            'Có câu nào bắt đầu bằng "Because…" mà bị cụt không?',
          ],
        },
      ],
      planningHintsVi: [
        'Gạch chân 3 ý trong đề: mỗi ý = 1 đoạn.',
        'Đoạn 1: lý do vắng mặt, nói cụ thể (ở đâu, vì sao).',
        'Đoạn 2: cách bạn cập nhật nội dung họp (hỏi ai, đọc gì, khi nào).',
        'Đoạn 3: việc bạn đề nghị làm trước cuộc họp + thời hạn.',
        'Đọc lại: giọng văn, số từ, mạo từ, giới từ.',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 2 — EMAIL PHÀN NÀN
   * Đề: ở khách sạn 3 đêm gặp nhiều sự cố → viết cho quản lý: sự cố, ảnh hưởng, yêu cầu.
   * ======================================================================== */
  {
    id: 'l3-g-u2-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 25,
    title: { vi: 'Viết email phàn nàn', en: 'Writing a complaint email' },
    description: {
      vi: 'Viết email phàn nàn về khách sạn: nêu sự cố rõ ràng, giữ bình tĩnh và đề nghị cách giải quyết hợp lý.',
      en: 'Write a complaint email about a hotel: describe the problems clearly, stay calm and ask for a fair solution.',
    },
    teachingCards: [
      {
        title: { vi: 'Công thức email phàn nàn', en: 'The complaint email formula' },
        body: {
          vi: '1) **Lý do viết**: I am writing to complain about…\n2) **Sự cố**, cụ thể ngày, số phòng: Firstly, … In addition, …\n3) **Ảnh hưởng**: As a result, … / This meant that…\n4) **Yêu cầu**: I would appreciate it if you could…\n5) **Kết**: I look forward to hearing from you. Yours faithfully,',
          en: '1) **Reason**: I am writing to complain about…\n2) **Problems**, with dates and room numbers: Firstly, … In addition, …\n3) **Effect**: As a result, … / This meant that…\n4) **Request**: I would appreciate it if you could…\n5) **Close**: I look forward to hearing from you. Yours faithfully,',
        },
      },
      {
        title: { vi: 'Bình tĩnh mà vẫn chắc chắn', en: 'Calm but firm' },
        body: {
          vi: 'Giận dữ ("This is the worst hotel ever!!!") làm người đọc phòng thủ.\nChắc chắn = **sự kiện + yêu cầu rõ**: "**Despite two requests**, the air conditioning **was not repaired**."\nCâu **bị động** giúp không chỉ trích cá nhân: "the room **had not been cleaned**" thay vì "your staff didn\'t clean it".',
          en: 'Anger ("This is the worst hotel ever!!!") makes readers defensive.\nFirm = **facts + a clear request**: "**Despite two requests**, the air conditioning **was not repaired**."\nThe **passive** avoids blaming a person: "the room **had not been cleaned**" instead of "your staff didn\'t clean it".',
        },
        examples: [
          { en: 'Despite two requests, the air conditioning was not repaired.', vi: 'Dù đã yêu cầu hai lần, điều hoà vẫn không được sửa.' },
        ],
      },
      {
        title: { vi: 'Từ nối nguyên nhân – kết quả – tương phản', en: 'Cause, effect and contrast linkers' },
        body: {
          vi: '**because of** + danh từ: because of the noise\n**As a result, / This meant that** + câu\n**Despite** + danh từ / V-ing: Despite **complaining** twice, …\n**Although** + câu: **Although I complained** twice, …\nLỗi hay gặp: "Despite **I complained**" (sai) → dùng **Although**.',
          en: '**because of** + noun: because of the noise\n**As a result, / This meant that** + clause\n**Despite** + noun / -ing: Despite **complaining** twice, …\n**Although** + clause: **Although I complained** twice, …\nCommon mistake: "Despite **I complained**" (wrong) → use **Although**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u2-write-ex01',
        type: 'multiple-choice',
        question: 'Which is the best first sentence of a complaint email?',
        options: [
          'Your hotel is terrible!',
          'I am writing to complain about my recent stay at your hotel.',
          'Hello, how are you?',
          'I want my money back now.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu mở nêu rõ lý do viết, lịch sự và trang trọng.',
          en: 'It states the reason for writing, politely and formally.',
        },
      },
      {
        id: 'l3-g-u2-write-ex02',
        type: 'fill-blank',
        sentence: 'We could not sleep because ___ the noise from the street.',
        acceptedAnswers: ['of'],
        explanation: {
          vi: '"because of + danh từ" (the noise). "because + câu".',
          en: '"because of + noun" (the noise); "because + clause".',
        },
      },
      {
        id: 'l3-g-u2-write-ex03',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Despite I complained twice, nothing happened.',
          'Despite complaining twice, I received no reply.',
          'Although complaining twice, nothing happened.',
          'Despite of my complaint, nothing happened.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"Despite + V-ing", chủ ngữ hai vế giống nhau (I). Không có "despite of".',
          en: '"Despite + -ing" with the same subject (I). There is no "despite of".',
        },
      },
      {
        id: 'l3-g-u2-write-ex04',
        type: 'fill-blank',
        sentence: 'When we arrived, the room had not ___ cleaned.',
        acceptedAnswers: ['been'],
        explanation: {
          vi: 'Bị động quá khứ hoàn thành: had (not) been + V3.',
          en: 'Past perfect passive: had (not) been + past participle.',
        },
      },
      {
        id: 'l3-g-u2-write-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is calm but firm?',
        options: [
          'Your staff are lazy and rude!!!',
          'Despite two requests, the air conditioning was not repaired during our stay.',
          'I hate your hotel.',
          'Maybe you can do something, if you want, no problem.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Nêu sự kiện cụ thể, không xúc phạm, không quá nhún nhường.',
          en: 'It gives facts, without insults and without being too weak.',
        },
      },
      {
        id: 'l3-g-u2-write-ex06',
        type: 'fill-blank',
        sentence: 'I would appreciate it ___ you could offer a partial refund.',
        acceptedAnswers: ['if'],
        explanation: {
          vi: 'Mẫu yêu cầu lịch sự: "I would appreciate it if you could…".',
          en: 'Polite request pattern: "I would appreciate it if you could…".',
        },
      },
      {
        id: 'l3-g-u2-write-ex07',
        type: 'arrange-words',
        translationVi: 'Kết quả là chúng tôi phải chuyển sang một khách sạn khác.',
        correctSentence: 'As a result, we had to move to another hotel.',
        extraWords: ['must', 'other'],
        explanation: {
          vi: '"As a result," nêu hậu quả. Quá khứ của "must" (bắt buộc) là "had to".',
          en: '"As a result," shows the effect. The past of "must" is "had to".',
        },
      },
      {
        id: 'l3-g-u2-write-ex08',
        type: 'multiple-choice',
        question: 'What does "a partial refund" mean?',
        options: ['all of your money back', 'some of your money back', 'a free room', 'a new booking'],
        correctIndex: 1,
        explanation: {
          vi: '"partial" = một phần. "a full refund" = hoàn toàn bộ.',
          en: '"partial" = part of it. "A full refund" = all of it.',
        },
      },
      {
        id: 'l3-g-u2-write-ex09',
        type: 'match-pairs',
        instruction: { vi: 'Nối phần đầu với phần cuối câu', en: 'Match the sentence beginnings and endings' },
        pairs: [
          { left: 'I am writing to complain', right: 'about my stay from 3 to 6 May.' },
          { left: 'As a result,', right: 'we hardly slept at all.' },
          { left: 'I would appreciate it', right: 'if you could look into this.' },
          { left: 'Despite two requests,', right: 'nothing was repaired.' },
          { left: 'I look forward', right: 'to hearing from you.' },
        ],
        explanation: {
          vi: 'Năm câu khung của một email phàn nàn hoàn chỉnh.',
          en: 'Five frame sentences for a complete complaint email.',
        },
      },
      {
        id: 'l3-g-u2-write-ex10',
        type: 'speak-sentence',
        sentence: 'I would appreciate it if you could look into this matter.',
        translationVi: 'Tôi sẽ rất cảm kích nếu quý vị có thể xem xét vấn đề này.',
        explanation: {
          vi: 'Nhấn ap-PRE-ci-ate. Nối "appreciate_it_if", "look_into".',
          en: 'Stress ap-PRE-ci-ate. Link "appreciate_it_if" and "look_into".',
        },
      },
    ],
    writingTask: {
      id: 'l3-g-u2-write-task',
      taskNumber: 1,
      prompt:
        'You recently stayed for three nights at a hotel by the sea, but there were several problems during your stay.\n\nWrite an email to the hotel manager. In your email:\n- describe the problems you had\n- explain how they affected your stay\n- say what you would like the hotel to do\n\nWrite at least 140 words. You do NOT need to write any addresses.',
      minWords: 140,
      suggestedMinutes: 20,
      sampleAnswer:
        "Subject: Complaint about my stay, 3 to 6 May\n\nDear Sir or Madam,\n\nI am writing to complain about my recent stay at your hotel from 3 to 6 May (booking number 40271).\n\nUnfortunately, there were several problems with our room, 512. Firstly, the air conditioning did not work properly, and the room was extremely hot at night. Although I reported this to reception on our first evening, it was not repaired until our last day. Secondly, the sea-view room we had booked actually faced a busy road, so it was very noisy until late.\n\nAs a result, my children and I hardly slept, and we were too tired to enjoy the activities we had planned. This was particularly disappointing as the holiday was a birthday present for my mother.\n\nI would appreciate it if you could refund the difference between a sea-view room and a standard room, and offer some compensation for the inconvenience.\n\nI look forward to hearing from you.\n\nYours faithfully,\nNguyen Thu Ha",
      bandSamples: [
        {
          band: '4.5',
          text:
            "Dear manager,\n\nI write this email to complain your hotel. I stay in your hotel 3 night last week and have many problem.\n\nFirst, the air conditioner is broken and very hot. I tell the reception but nobody come to fix. Second the room is not sea view like in website, it is near the road and very noisy. We can not sleep.\n\nThis is very bad holiday for my family. I am very angry and dissapointed.\n\nYou must give me money back. If not I will write bad review on internet.\n\nThank you\nHa",
          notesVi:
            'Khoảng 4.5. TA: có nêu sự cố và yêu cầu, nhưng ảnh hưởng chỉ một câu, bài dưới 140 từ, và giọng đe doạ ("You must…", "If not I will…") không phù hợp. CC: có First/Second nhưng câu rời rạc. LR: lặp "very", sai chính tả "dissapointed". GRA: dùng hiện tại cho chuyện đã qua ("I stay", "is broken"), thiếu -s ("3 night", "many problem"), "complain your hotel" thiếu "about".',
        },
        {
          band: '5.5',
          text:
            "Dear Sir or Madam,\n\nI am writing to complain about my stay in your hotel from 3 to 6 May. There were some problems that made our holiday not good.\n\nFirstly, the air conditioning in our room did not work, so the room was very hot at night. I told the reception on the first day but they did not repair it until the last day. Secondly, we booked a sea-view room, but our room was facing to a busy road and it was very noisy.\n\nBecause of these problems, my family could not sleep well and we were very tired during the day. We could not enjoy the trip as we expected.\n\nI would like the hotel to give me a refund for the difference in price. I hope you will solve this problem soon.\n\nYours faithfully,\nNguyen Thu Ha",
          notesVi:
            'Khoảng 5.5. TA: đủ 3 ý, giọng lịch sự, đủ độ dài; yêu cầu còn hơi chung. CC: bố cục rõ, dùng Firstly / Secondly / Because of đúng. LR: đủ dùng nhưng lặp "very", cách nói vụng "made our holiday not good". GRA: phần lớn đúng; còn lỗi "facing to a busy road" (facing a busy road).',
        },
        {
          band: '6.5',
          text:
            "Dear Sir or Madam,\n\nI am writing regarding my family's stay at your hotel from 3 to 6 May, which was unfortunately spoilt by two problems.\n\nFirst of all, the air conditioning in Room 512 was not working when we arrived. Despite reporting this to reception on two separate occasions, it was only repaired on our final morning. In addition, although we had paid extra for a sea-view room, ours overlooked the main road, and the traffic noise continued well after midnight.\n\nAs a result, none of us managed to get a proper night's sleep, and we spent much of our holiday feeling exhausted. This was especially disappointing because the trip was a birthday present for my mother, and we had been looking forward to it for months.\n\nI would therefore appreciate it if you could refund the extra amount we paid for the sea view and consider some form of compensation for the inconvenience.\n\nI look forward to your reply.\n\nYours faithfully,\nNguyen Thu Ha",
          notesVi:
            'Khoảng 6.5. TA: 3 ý được phát triển đầy đủ với chi tiết cụ thể; yêu cầu rõ và hợp lý. CC: mạch lạc, từ nối đa dạng (First of all, In addition, As a result, therefore). LR: chính xác và tự nhiên (spoilt by, overlooked, a proper night\'s sleep, compensation). GRA: câu phức đa dạng (Despite + V-ing, although, quá khứ hoàn thành), gần như không lỗi.',
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn đã mô tả sự cố cụ thể (ngày, số phòng, chuyện gì xảy ra) chưa?',
            'Bạn đã nói rõ sự cố ảnh hưởng đến bạn thế nào chưa?',
            'Yêu cầu của bạn có rõ ràng, hợp lý và không đe doạ không?',
            'Bài có từ 140 từ trở lên không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi ý trong đề có một đoạn riêng không?',
            'Bạn có dùng từ nối nguyên nhân – kết quả (because of, As a result…) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng các cụm của email phàn nàn (I am writing to complain about…, I would appreciate it if…) không?',
            'Bạn có tránh lặp "very" nhiều lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Bạn có dùng thì quá khứ cho những việc đã xảy ra không?',
            'Sau "Despite" bạn có dùng danh từ hoặc V-ing (không dùng cả câu) không?',
            'Danh từ số nhiều có -s (three nights, two problems) không?',
          ],
        },
      ],
      planningHintsVi: [
        'Liệt kê 2 sự cố chính, mỗi sự cố kèm 1 chi tiết cụ thể.',
        'Đoạn 1: lý do viết + thời gian ở.',
        'Đoạn 2: các sự cố (Firstly…, In addition…).',
        'Đoạn 3: ảnh hưởng (As a result…).',
        'Đoạn 4: yêu cầu cụ thể (I would appreciate it if…).',
        'Mở bằng "Dear Sir or Madam" thì kết bằng "Yours faithfully".',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 3 — BÀI ĐĂNG NÊU QUAN ĐIỂM
   * Đề: trang cộng đồng hỏi "Đọc tin qua mạng xã hội thay vì báo/TV là tốt hay xấu?"
   * ======================================================================== */
  {
    id: 'l3-g-u3-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 25,
    title: { vi: 'Viết bài đăng nêu quan điểm', en: 'Writing a short opinion post' },
    description: {
      vi: 'Viết bài đăng trên trang cộng đồng nêu quan điểm về cách đọc tin tức, có lý do, ví dụ và ý trái chiều.',
      en: 'Write a community website post giving your opinion about how people get the news, with reasons, examples and the other side.',
    },
    teachingCards: [
      {
        title: { vi: 'Bố cục bài nêu quan điểm', en: 'The structure of an opinion post' },
        body: {
          vi: '**Mở**: viết lại đề bằng từ của bạn + nêu rõ quan điểm (In my view, … / I strongly believe…).\n**Thân 1**: lý do chính + ví dụ.\n**Thân 2**: ý **trái chiều** + cách bạn đáp lại (Some people argue… However, …).\n**Kết**: nhắc lại quan điểm bằng từ khác. Khoảng 150–200 từ là đủ.',
          en: '**Opening**: rephrase the question + state your view (In my view, … / I strongly believe…).\n**Body 1**: main reason + example.\n**Body 2**: the **other side** + your reply (Some people argue… However, …).\n**Ending**: repeat your view in new words. About 150–200 words is enough.',
        },
      },
      {
        title: { vi: 'Ví dụ làm ý thuyết phục hơn', en: 'Examples make ideas convincing' },
        body: {
          vi: 'Lý do chung chung ("Social media is not reliable") **yếu**. Thêm **ví dụ cụ thể**, tốt nhất từ đời bạn:\n"**For instance,** last year an old flood video was shared as if it were new."\nCụm hay dùng: **For example / For instance / A good example of this is… / This is especially true for…**',
          en: 'A general reason ("Social media is not reliable") is **weak**. Add a **specific example**, ideally from your life:\n"**For instance,** last year an old flood video was shared as if it were new."\nUseful phrases: **For example / For instance / A good example of this is… / This is especially true for…**',
        },
      },
      {
        title: { vi: 'Đừng chép đề', en: "Don't copy the question" },
        body: {
          vi: 'Viết lại đề bằng **từ của bạn** (paraphrase):\n"get news from social media" → "**rely on social networks for news**"\n"newspapers, TV or news websites" → "**traditional news sources**"\nChép nguyên câu trong đề không giúp bạn được tính điểm từ vựng.',
          en: 'Rephrase the question in **your own words**:\n"get news from social media" → "**rely on social networks for news**"\n"newspapers, TV or news websites" → "**traditional news sources**"\nCopying the question word for word doesn\'t show your vocabulary.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u3-write-ex01',
        type: 'multiple-choice',
        question: 'Which sentence states a clear opinion?',
        options: [
          'There are many opinions about this topic.',
          'In my view, people should check news on reliable websites rather than on social media.',
          'News is a thing that people read.',
          'Some say yes and some say no.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"In my view, people should…" nói rõ người viết nghĩ gì.',
          en: '"In my view, people should…" clearly shows what the writer thinks.',
        },
      },
      {
        id: 'l3-g-u3-write-ex02',
        type: 'multiple-choice',
        question: 'Which is the best paraphrase of "get news from social media"?',
        options: ['get news from social media', 'rely on social networks for information', 'social media news get', 'have social'],
        correctIndex: 1,
        explanation: {
          vi: 'Cùng nghĩa nhưng dùng từ khác: rely on (dựa vào), social networks.',
          en: 'Same meaning, different words: rely on, social networks.',
        },
      },
      {
        id: 'l3-g-u3-write-ex03',
        type: 'fill-blank',
        sentence: 'Some people ___ that newspapers are old-fashioned. However, I disagree.',
        acceptedAnswers: ['argue', 'believe', 'think', 'claim', 'say', 'feel'],
        explanation: {
          vi: '"Some people argue that…" giới thiệu ý trái chiều trước khi đáp lại.',
          en: '"Some people argue that…" introduces the other side before you reply.',
        },
      },
      {
        id: 'l3-g-u3-write-ex04',
        type: 'multiple-choice',
        question: 'Which sentence gives a SPECIFIC example?',
        options: [
          'Fake news is a problem.',
          'For instance, last year an old flood video was shared as if it were new.',
          'Many things happen online.',
          'It is very bad.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Có thời gian, sự việc cụ thể: ví dụ thuyết phục.',
          en: 'It has a time and a specific event: a convincing example.',
        },
      },
      {
        id: 'l3-g-u3-write-ex05',
        type: 'fill-blank',
        sentence: 'Social media is fast. ___, it is not always accurate.',
        acceptedAnswers: ['However', 'Nevertheless', 'On the other hand', 'But'],
        explanation: {
          vi: 'Hai ý trái ngược: dùng "However," ở đầu câu thứ hai.',
          en: 'Two contrasting ideas: start the second sentence with "However,".',
        },
      },
      {
        id: 'l3-g-u3-write-ex06',
        type: 'arrange-words',
        translationVi: 'Tóm lại, tôi tin rằng chúng ta nên dùng cả hai nguồn một cách cẩn thận.',
        correctSentence: 'In conclusion, I believe we should use both sources carefully.',
        extraWords: ['careful', 'conclude'],
        explanation: {
          vi: 'Bổ nghĩa cho động từ "use" dùng trạng từ: carefully.',
          en: 'Use the adverb "carefully" to describe the verb "use".',
        },
      },
      {
        id: 'l3-g-u3-write-ex07',
        type: 'multiple-choice',
        question: 'Where should your opinion appear FIRST in an opinion post?',
        options: ['Only in the last sentence', 'In the first paragraph', 'In the middle', 'Nowhere: just give facts'],
        correctIndex: 1,
        explanation: {
          vi: 'Nêu quan điểm ngay đoạn đầu để người đọc biết bài đi theo hướng nào.',
          en: 'State your view in the first paragraph so readers know your direction.',
        },
      },
      {
        id: 'l3-g-u3-write-ex08',
        type: 'multiple-choice',
        question: '"This is especially true for older people." This sentence…',
        options: ['starts a new topic', 'makes the point more specific', 'disagrees with the writer', 'ends the post'],
        correctIndex: 1,
        explanation: {
          vi: '"especially true for…" thu hẹp ý, làm lập luận cụ thể hơn.',
          en: '"especially true for…" narrows the point and makes it more specific.',
        },
      },
      {
        id: 'l3-g-u3-write-ex09',
        type: 'fill-blank',
        sentence: 'A good example ___ this is my grandfather, who only reads printed newspapers.',
        acceptedAnswers: ['of'],
        explanation: {
          vi: 'Cụm cố định: "A good example of this is…".',
          en: 'Fixed phrase: "A good example of this is…".',
        },
      },
      {
        id: 'l3-g-u3-write-ex10',
        type: 'speak-sentence',
        sentence: 'In my view, the best approach is to use both, but carefully.',
        translationVi: 'Theo tôi, cách tốt nhất là dùng cả hai, nhưng phải cẩn thận.',
        explanation: {
          vi: 'Nhấn ap-PROACH, BOTH, CAREfully. Đọc rõ /st/ cuối "best".',
          en: 'Stress ap-PROACH, BOTH, CARE-fully. Say the /st/ in "best".',
        },
      },
    ],
    writingTask: {
      id: 'l3-g-u3-write-task',
      taskNumber: 2,
      prompt:
        'A local community website has asked its readers this question:\n\n"These days, many people get their news from social media instead of newspapers, TV or news websites. Is this a positive or a negative development?"\n\nWrite a short post giving your opinion. Give reasons and include examples from your own experience.\n\nWrite at least 150 words.',
      minWords: 150,
      suggestedMinutes: 25,
      sampleAnswer:
        "In my view, getting news from social media is a mixed blessing, but on balance I think it is more negative than positive.\n\nThere is no doubt that social media is fast and convenient. When there was a big storm in my area last year, I learned about road closures in a neighbourhood group long before they appeared on TV. For practical, local information like this, social networks can be extremely useful.\n\nHowever, speed comes at a price. Stories on social media are rarely checked before they are shared, and shocking posts spread much faster than accurate ones. For instance, my aunt once forwarded a 'health warning' to our whole family that turned out to be completely false. Many people, especially older users, find it hard to tell the difference.\n\nFor these reasons, I believe we should treat social media as a starting point rather than a final source. If a story seems important or surprising, it is worth checking it on a reliable news website before believing it, let alone sharing it.",
      bandSamples: [
        {
          band: '4.5',
          text:
            "Now many people read news on social media. I think it is negative development.\n\nBecause social media have many fake news. People share news but they don't check. My aunt send a news to my family, it say eating garlic can stop flu, but it is not true.\n\nAlso social media make people waste time. When I read news on social media, I see many video and I watch for one hour. It is not good.\n\nBut social media is fast. We know news very quickly.\n\nIn conclusion, social media is negative. People should read newspaper.",
          notesVi:
            'Khoảng 4.5. TR: có quan điểm nhưng bài ngắn (dưới 150 từ), ý "waste time" lạc khỏi chủ đề tin tức, ý trái chiều chỉ một câu không phát triển. CC: có chia đoạn nhưng đoạn 2 mở bằng "Because…" cụt. LR: lặp "social media", "news"; "a news" sai vì news không đếm được. GRA: lỗi hoà hợp "social media have", "My aunt send", "it say"; thiếu -s "many video".',
        },
        {
          band: '5.5',
          text:
            "Nowadays, a lot of people use social media to read news instead of newspapers or TV. In my opinion, this development has both advantages and disadvantages, but it is more negative.\n\nOn the one hand, social media is very fast and convenient. People can know what is happening in a few minutes. For example, when there was a storm in my city, I saw information about flooded roads on social media before the TV news.\n\nOn the other hand, there is a lot of fake news on social media. Many people share information without checking it. For example, my aunt sent a message to my family about a health tip, but it was not true. Older people often cannot recognise fake news, so they believe it easily.\n\nIn conclusion, I think social media news is more negative than positive. People should check information from reliable websites before they believe it.",
          notesVi:
            'Khoảng 5.5. TR: quan điểm rõ, có hai mặt và ví dụ thật, đủ độ dài; ý còn khá chung. CC: bố cục rõ nhưng từ nối máy móc (On the one hand / On the other hand, "For example" lặp hai lần). LR: đủ dùng (convenient, reliable, recognise) nhưng lặp "social media", "people". GRA: phần lớn đúng; "People can know what is happening" hơi vụng.',
        },
        {
          band: '6.5',
          text:
            "These days, many people, including me, check social media for news long before they open a newspaper or turn on the TV. While this has some clear benefits, I believe the overall effect is more negative than positive.\n\nThe main advantage is speed. During a storm in my neighbourhood last year, residents posted photos of flooded streets within minutes, which helped others avoid dangerous roads. Traditional news sources simply cannot react that quickly to such local events.\n\nHowever, this speed is also the problem. Posts are rarely checked before they are shared, and shocking stories tend to spread faster than accurate ones. My aunt, for instance, once forwarded a 'miracle' health tip to our entire family, and several relatives believed it until a doctor told them otherwise.\n\nOn balance, therefore, I think social media works best as an early warning system rather than a reliable source. Before we believe or share an important story, we should take a moment to confirm it on a trusted news website.",
          notesVi:
            'Khoảng 6.5. TR: quan điểm rõ từ đầu và nhất quán; mỗi đoạn có ý chính + ví dụ cụ thể. CC: các đoạn nối mượt (The main advantage…, However, this speed…, On balance, therefore). LR: chính xác, ít lặp (residents, traditional news sources, forwarded, an early warning system). GRA: câu phức đa dạng (While…, mệnh đề quan hệ, until…), gần như không lỗi.',
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Quan điểm của bạn có rõ ngay ở đoạn đầu không?',
            'Mỗi lý do có kèm ví dụ cụ thể (tốt nhất từ trải nghiệm thật) không?',
            'Bạn có nhắc đến ý trái chiều và đáp lại không?',
            'Bài có từ 150 từ trở lên và không lạc đề không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi đoạn thân bài có 1 ý chính rõ ràng ở câu đầu không?',
            'Bạn có dùng từ nối đa dạng (However, For instance, On balance) mà không lặp lại không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có viết lại đề bằng từ của mình thay vì chép nguyên câu không?',
            'Bạn có tránh lặp một từ (social media, people) quá nhiều không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            '"news" có được dùng như danh từ không đếm được (không viết "a news", "news are") không?',
            'Chủ ngữ số ít có động từ thêm -s không (my aunt sends)?',
            'Bạn có thử ít nhất 1–2 câu phức (While…, which…, Although…) không?',
          ],
        },
      ],
      planningHintsVi: [
        'Quyết định quan điểm trước: tích cực, tiêu cực, hay "cả hai nhưng nghiêng về…".',
        'Tìm 1 ví dụ thật cho mặt tốt và 1 ví dụ thật cho mặt xấu.',
        'Đoạn mở: viết lại đề bằng từ của bạn + quan điểm.',
        'Mỗi đoạn thân bài: câu chủ đề → giải thích → ví dụ.',
        'Kết: nhắc lại quan điểm + 1 lời khuyên thực tế.',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 4 — REVIEW PHIM HOẶC SERIES
   * Đề: trang web học tiếng Anh nhận review: nội dung (không spoil), thích/không thích, gợi ý người xem.
   * Bài mẫu viết về series tự đặt tên "Lantern Street".
   * ======================================================================== */
  {
    id: 'l3-g-u4-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 25,
    title: { vi: 'Viết review phim hoặc series', en: 'Writing a film or series review' },
    description: {
      vi: 'Viết review cho trang web học tiếng Anh: giới thiệu nội dung không spoil, khen – chê và gợi ý người nên xem.',
      en: 'Write a review for an English learning website: describe the story without spoilers, praise, criticise and recommend.',
    },
    teachingCards: [
      {
        title: { vi: 'Bố cục bài review', en: 'Review structure' },
        body: {
          vi: '**Tiêu đề** hấp dẫn.\n**Đoạn 1**: tên, thể loại + một câu "móc câu".\n**Đoạn 2**: nội dung chính, **không tiết lộ kết thúc**.\n**Đoạn 3**: điểm mạnh + điểm yếu.\n**Đoạn 4**: kết luận: **I would recommend it to anyone who…**',
          en: 'A catchy **title**.\n**Paragraph 1**: name, type + a "hook" sentence.\n**Paragraph 2**: the main story, **no spoilers**.\n**Paragraph 3**: strengths + weaknesses.\n**Paragraph 4**: verdict: **I would recommend it to anyone who…**',
        },
      },
      {
        title: { vi: 'Kể nội dung bằng hiện tại đơn', en: 'Tell the story in the present simple' },
        body: {
          vi: 'Review dùng **hiện tại đơn** để kể nội dung phim:\n"The series **follows** two sisters who **open** a café…"\nDùng **quá khứ đơn** cho trải nghiệm của bạn:\n"I **watched** it last weekend and **loved** it."\nTrộn lẫn hai thì này lung tung làm bài khó theo dõi.',
          en: 'Reviews use the **present simple** for the story:\n"The series **follows** two sisters who **open** a café…"\nUse the **past simple** for your own experience:\n"I **watched** it last weekend and **loved** it."\nMixing them randomly makes the review hard to follow.',
        },
        examples: [
          { en: 'The film follows a young chef who moves to Da Lat.', vi: 'Bộ phim kể về một đầu bếp trẻ chuyển đến Đà Lạt.' },
        ],
      },
      {
        title: { vi: 'Tính từ "đắt giá"', en: 'Strong adjectives' },
        body: {
          vi: 'Thay "good / bad" bằng tính từ cụ thể:\n**Khen**: gripping, moving, hilarious (rất buồn cười), beautifully shot, convincing\n**Chê**: predictable, slow-paced, confusing, disappointing\nThêm mức độ: **a little / rather / incredibly** + tính từ.',
          en: 'Replace "good / bad" with precise adjectives:\n**Praise**: gripping, moving, hilarious (very funny), beautifully shot, convincing\n**Criticism**: predictable, slow-paced, confusing, disappointing\nAdd degree: **a little / rather / incredibly** + adjective.',
        },
        examples: [
          { en: 'The ending is rather predictable, but the acting is incredibly convincing.', vi: 'Kết thúc khá dễ đoán, nhưng diễn xuất cực kỳ thuyết phục.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u4-write-ex01',
        type: 'multiple-choice',
        question: 'Which tense do reviews usually use to describe the story?',
        options: ['Present simple', 'Past perfect', 'Future continuous', 'Present perfect continuous'],
        correctIndex: 0,
        explanation: {
          vi: 'Kể nội dung phim trong review dùng hiện tại đơn: The film follows…',
          en: 'Reviews tell the story in the present simple: The film follows…',
        },
      },
      {
        id: 'l3-g-u4-write-ex02',
        type: 'fill-blank',
        sentence: 'The series ___ two sisters who open a small café in Hoi An.',
        acceptedAnswers: ['follows'],
        hint: '(follow)',
        explanation: {
          vi: 'Hiện tại đơn, chủ ngữ số ít "The series" → follows.',
          en: 'Present simple with a singular subject "The series" → follows.',
        },
      },
      {
        id: 'l3-g-u4-write-ex03',
        type: 'multiple-choice',
        question: 'Which adjective means "very funny"?',
        options: ['hilarious', 'predictable', 'gripping', 'slow-paced'],
        correctIndex: 0,
        explanation: {
          vi: '"hilarious" /hɪˈleə.ri.əs/ = cực kỳ buồn cười.',
          en: '"hilarious" /hɪˈleə.ri.əs/ = extremely funny.',
        },
      },
      {
        id: 'l3-g-u4-write-ex04',
        type: 'multiple-choice',
        question: 'Which sentence contains a SPOILER?',
        options: [
          'The film is set in a small fishing village.',
          'The acting is excellent.',
          'In the last scene, we discover that the quiet neighbour was the thief all along.',
          'The soundtrack is beautiful.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu C tiết lộ bí mật của cảnh cuối: đó là spoiler.',
          en: 'C reveals the secret of the final scene: that is a spoiler.',
        },
      },
      {
        id: 'l3-g-u4-write-ex05',
        type: 'fill-blank',
        sentence: 'I would recommend it to anyone ___ enjoys slow, emotional dramas.',
        acceptedAnswers: ['who', 'that'],
        explanation: {
          vi: 'Mệnh đề quan hệ chỉ người: anyone who…',
          en: 'A relative clause for people: anyone who…',
        },
      },
      {
        id: 'l3-g-u4-write-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với nghĩa đúng', en: 'Match the adjectives with their meanings' },
        pairs: [
          { left: 'gripping', right: 'very exciting' },
          { left: 'moving', right: 'making you feel emotional' },
          { left: 'slow-paced', right: 'happening too slowly' },
          { left: 'disappointing', right: 'not as good as you hoped' },
          { left: 'convincing', right: 'seeming real and believable' },
        ],
        explanation: {
          vi: 'Năm tính từ cụ thể thay cho "good / bad" trong bài review.',
          en: 'Five precise adjectives to replace "good / bad" in a review.',
        },
      },
      {
        id: 'l3-g-u4-write-ex07',
        type: 'arrange-words',
        translationVi: 'Tôi xem phim này tuần trước và cực kỳ thích nó.',
        correctSentence: 'I watched it last week and absolutely loved it.',
        extraWords: ['watch', 'love'],
        explanation: {
          vi: 'Trải nghiệm của bạn đã qua → quá khứ đơn: watched, loved.',
          en: 'Your own past experience → past simple: watched, loved.',
        },
      },
      {
        id: 'l3-g-u4-write-ex08',
        type: 'multiple-choice',
        question: 'Which is the best opening "hook" for a review?',
        options: [
          'This is a review.',
          'I watched a film.',
          'If you only watch one series this year, make it this one.',
          'The film has actors.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu "móc câu" khiến người đọc tò mò, muốn đọc tiếp.',
          en: 'A hook makes the reader curious to read on.',
        },
      },
      {
        id: 'l3-g-u4-write-ex09',
        type: 'fill-blank',
        sentence: 'The plot is ___ predictable, but the acting makes up for it.',
        acceptedAnswers: ['a little', 'rather', 'a bit', 'quite', 'slightly'],
        explanation: {
          vi: 'Từ chỉ mức độ làm lời chê nhẹ nhàng hơn: a little / rather predictable.',
          en: 'A degree word softens the criticism: a little / rather predictable.',
        },
      },
      {
        id: 'l3-g-u4-write-ex10',
        type: 'speak-sentence',
        sentence: 'I would recommend it to anyone who enjoys a good mystery.',
        translationVi: 'Tôi sẽ giới thiệu nó cho bất kỳ ai thích truyện bí ẩn.',
        explanation: {
          vi: 'Nhấn re-com-MEND, en-JOYS, MYS-te-ry. Đọc rõ /z/ cuối "enjoys".',
          en: 'Stress re-com-MEND, en-JOYS, MYS-te-ry. Say the /z/ in "enjoys".',
        },
      },
    ],
    writingTask: {
      id: 'l3-g-u4-write-task',
      taskNumber: 1,
      prompt:
        'An English learning website is collecting reviews from its readers.\n\nWrite a review of a film or series you have watched recently. In your review:\n- briefly describe what it is about (without spoilers)\n- say what you liked and what you did not like\n- say who you would recommend it to, and why\n\nWrite at least 150 words. You can write about a real or an imaginary film or series.',
      minWords: 150,
      suggestedMinutes: 25,
      sampleAnswer:
        "Lantern Street: a small café with a big heart\n\nIf you are looking for something warm and funny to watch after a long day, Lantern Street is a perfect choice.\n\nThe series follows two sisters who leave their office jobs in Ho Chi Minh City to open a tiny café in Hoi An. Neither of them knows anything about running a business, and the first few weeks are a disaster. Over eight short episodes, they slowly win over their neighbours, their customers and, eventually, each other.\n\nWhat I loved most was the humour. The scenes with the sisters' grumpy landlord are hilarious, and the two lead actors are completely convincing as siblings who argue constantly but would do anything for each other. The series is also beautifully shot, with lots of lovely street scenes.\n\nOn the downside, the last two episodes are rather predictable, and one storyline about a rival café is never properly finished.\n\nOverall, I would recommend Lantern Street to anyone who enjoys light comedies, and especially to anyone who has ever dreamed of quitting their job to do something different.",
      bandSamples: [
        {
          band: '4.5',
          text:
            "Review Lantern Street\n\nLantern Street is very good series. I watch it last month with my sister. It is about two sister, they quit job and open cafe in Hoi An. They have many problem but in the end they success and the cafe is very famous.\n\nI like this series because it is funny and the actor is very good. The place in Hoi An is very beautiful. I don't like the end because it is boring.\n\nI think everybody should watch it. It is very good for relax.",
          notesVi:
            'Khoảng 4.5. TA: có đủ 3 phần nhưng quá ngắn, lại tiết lộ kết thúc ("in the end they success") dù đề cấm spoil; gợi ý "everybody" quá chung. CC: chia đoạn nhưng ý chỉ liệt kê. LR: lặp "very good", "beautiful"; "for relax" sai (to relax). GRA: "I watch it last month", "two sister", "they success" (they succeed), thiếu mạo từ "a very good series".',
        },
        {
          band: '5.5',
          text:
            "Lantern Street – a lovely series\n\nLast month I watched Lantern Street, a comedy series with eight episodes. It is about two sisters who leave their office jobs in Ho Chi Minh City and open a small café in Hoi An. At first they have a lot of problems because they don't know how to run a business.\n\nThere are many things I liked about this series. Firstly, it is very funny, especially the scenes with their landlord. Secondly, the actors are very natural and the street scenes in Hoi An are beautiful. I also enjoyed the soundtrack, which uses a lot of traditional music. However, I didn't like the last two episodes because they were quite predictable and a little bit slow.\n\nIn conclusion, I recommend this series for people who like comedy and want to relax after work. It is not too long, so you can finish it in one weekend.",
          notesVi:
            'Khoảng 5.5. TA: đủ 3 ý, không spoil, gợi ý người xem khá cụ thể; phần khen – chê còn ngắn. CC: bố cục rõ, nhưng Firstly / Secondly / In conclusion khá máy móc với một bài review. LR: có từ đúng chủ đề (episodes, predictable, landlord) nhưng lặp "very". GRA: phần lớn đúng; lỗi "recommend this series for people" (recommend… to people).',
        },
        {
          band: '6.5',
          text:
            "Lantern Street: small café, big heart\n\nIf you need something light and cheerful after a long week, Lantern Street is well worth your time.\n\nThe series follows two sisters who quit their office jobs in Ho Chi Minh City to open a café in Hoi An, despite knowing absolutely nothing about running a business. Over eight half-hour episodes, they deal with broken coffee machines, a grumpy landlord and very few customers, while slowly learning to work together.\n\nThe writing is genuinely funny, and the two lead actresses have such natural chemistry that you completely believe they grew up together. Hoi An itself looks stunning, especially in the night-time scenes. My only real criticism is that the final two episodes feel rushed, and a storyline about a rival café is dropped without explanation.\n\nI would recommend it to anyone who enjoys gentle comedies, and particularly to viewers who have ever wondered what it would be like to leave their job and start again.",
          notesVi:
            'Khoảng 6.5. TA: phát triển tốt cả 3 ý, mở bài hấp dẫn, gợi ý người xem cụ thể và có lý do. CC: đoạn văn chuyển ý tự nhiên, không cần Firstly / Secondly. LR: giàu và đúng ngữ cảnh (light and cheerful, natural chemistry, stunning, rushed, dropped). GRA: câu phức đa dạng (despite + V-ing, while, such… that, mệnh đề quan hệ) và chính xác.',
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Bạn đã giới thiệu phim/series (tên, thể loại, nội dung chính) mà không tiết lộ kết thúc chưa?',
            'Bạn có nêu cả điều thích VÀ điều chưa thích không?',
            'Bạn có nói rõ nên giới thiệu cho ai và vì sao không?',
            'Bài có từ 150 từ trở lên không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Bài có tiêu đề và câu mở thu hút không?',
            'Mỗi đoạn có một nhiệm vụ riêng (nội dung / khen – chê / gợi ý) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có thay "good / bad" bằng tính từ cụ thể (gripping, moving, predictable…) không?',
            'Bạn có dùng ít nhất 2 từ về phim (plot, episode, soundtrack, cast…) không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Phần kể nội dung có dùng hiện tại đơn (The series follows…) không?',
            'Trải nghiệm của bạn có dùng quá khứ đơn (I watched…) không?',
            'Bạn có dùng đúng "recommend it to + người" không?',
          ],
        },
      ],
      planningHintsVi: [
        'Chọn 1 phim/series bạn nhớ rõ (có thể tự nghĩ ra).',
        'Viết 1 câu "móc câu" cho đoạn mở.',
        'Tóm tắt nội dung trong 2–3 câu, dừng lại trước đoạn cao trào.',
        'Ghi 2 điểm mạnh + 1 điểm yếu, mỗi điểm có 1 chi tiết.',
        'Câu kết: I would recommend it to anyone who…',
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 5 — TRẢ LỜI BÀI ĐĂNG DIỄN ĐÀN: CÔNG NGHỆ TRONG GIA ĐÌNH
   * Đề: Bao (17 tuổi) than bố mẹ muốn cấm điện thoại sau 9 giờ tối → nêu quan điểm + lời khuyên.
   * ======================================================================== */
  {
    id: 'l3-g-u5-write',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 25,
    title: { vi: 'Trả lời bài đăng: công nghệ trong gia đình', en: 'Forum reply: technology and family life' },
    description: {
      vi: 'Trả lời một bài đăng trên diễn đàn: nêu quan điểm về công nghệ trong gia đình và đưa lời khuyên thực tế.',
      en: 'Reply to a forum post: give your view on technology in family life and offer practical advice.',
    },
    teachingCards: [
      {
        title: { vi: 'Trả lời bài đăng: thân thiện nhưng có lập luận', en: 'Replying to a post: friendly but reasoned' },
        body: {
          vi: 'Mở bằng **phản hồi người viết**: "I can really understand how you feel." / "You\'re definitely not alone."\nRồi **nêu quan điểm** + lý do + ví dụ.\nKết bằng **lời khuyên cụ thể**.\nGiọng **bán trang trọng**: viết tắt như I\'m, don\'t được, nhưng không dùng tiếng lóng hay "u", "r", "lol".',
          en: 'Start by **responding to the writer**: "I can really understand how you feel." / "You\'re definitely not alone."\nThen give **your view** + reason + example.\nFinish with **practical advice**.\n**Semi-formal** tone: contractions like I\'m and don\'t are fine, but no slang or "u", "r", "lol".',
        },
      },
      {
        title: { vi: 'Lời khuyên trong văn viết', en: 'Advice in writing' },
        body: {
          vi: 'Dùng nhiều cấu trúc khác nhau:\n**It might be a good idea to** + V\n**One thing that worked for us was** + V-ing\n**You could try** + V-ing\n**If I were you, I would** + V\nThêm lý do hoặc mục đích: "…, **so that** everyone can relax."',
          en: 'Use a range of structures:\n**It might be a good idea to** + verb\n**One thing that worked for us was** + -ing\n**You could try** + -ing\n**If I were you, I would** + verb\nAdd a reason or purpose: "…, **so that** everyone can relax."',
        },
        examples: [
          { en: 'One thing that worked for us was having a phone-free dinner.', vi: 'Một điều hiệu quả với nhà tôi là bữa tối không điện thoại.' },
        ],
      },
      {
        title: { vi: 'Câu điều kiện loại 1 và loại 2', en: 'First and second conditionals' },
        body: {
          vi: '**Loại 1** (có thể xảy ra): If you **agree** on a rule together, everyone **will** follow it more easily.\n**Loại 2** (giả định, hay dùng để khuyên): If I **were** you, I **would** talk to them.\nLỗi hay gặp: "If you **will** agree…" (sai): sau **if** không dùng **will**.',
          en: '**First** (possible): If you **agree** on a rule together, everyone **will** follow it more easily.\n**Second** (imagined, often for advice): If I **were** you, I **would** talk to them.\nCommon mistake: "If you **will** agree…" (wrong): no **will** after **if**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u5-write-ex01',
        type: 'multiple-choice',
        question: "Which is the best first line for a reply to someone's worried forum post?",
        options: ['You are wrong.', 'I can really understand how you feel.', 'Technology.', 'Read my answer below now.'],
        correctIndex: 1,
        explanation: {
          vi: 'Phản hồi cảm xúc người viết trước khi nêu ý kiến giúp bài thân thiện.',
          en: "Responding to the writer's feelings first makes the reply friendly.",
        },
      },
      {
        id: 'l3-g-u5-write-ex02',
        type: 'fill-blank',
        sentence: 'One thing that worked for us ___ having a phone-free dinner every evening.',
        acceptedAnswers: ['was'],
        explanation: {
          vi: 'Chủ ngữ "One thing" số ít, chuyện đã qua → was.',
          en: '"One thing" is singular and in the past → was.',
        },
      },
      {
        id: 'l3-g-u5-write-ex03',
        type: 'fill-blank',
        sentence: 'You could try ___ all the phones in a basket during meals.',
        acceptedAnswers: ['putting'],
        hint: '(put)',
        explanation: {
          vi: '"try + V-ing" = thử làm gì xem có hiệu quả không.',
          en: '"try + -ing" = do something to see if it works.',
        },
      },
      {
        id: 'l3-g-u5-write-ex04',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'If you will talk to them, they will listen.',
          'If you talk to them, they will listen.',
          'If you talked to them, they will listen.',
          'If you talk to them, they would listen.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Loại 1: If + hiện tại đơn, … will + V. Không dùng "will" sau "if".',
          en: 'First conditional: If + present simple, … will + verb. No "will" after "if".',
        },
      },
      {
        id: 'l3-g-u5-write-ex05',
        type: 'fill-blank',
        sentence: 'If I ___ you, I would explain why the rule matters to you.',
        acceptedAnswers: ['were'],
        explanation: {
          vi: 'Mẫu khuyên cố định: "If I were you, I would…".',
          en: 'The fixed advice pattern: "If I were you, I would…".',
        },
      },
      {
        id: 'l3-g-u5-write-ex06',
        type: 'multiple-choice',
        question: '"We charge our phones in the kitchen, so that nobody uses them in bed." "So that" shows…',
        options: ['a purpose', 'a contrast', 'a time', 'an example'],
        correctIndex: 0,
        explanation: {
          vi: '"so that" = để mà, nêu mục đích.',
          en: '"so that" shows a purpose.',
        },
      },
      {
        id: 'l3-g-u5-write-ex07',
        type: 'arrange-words',
        translationVi: 'Có lẽ nên cùng nhau đặt ra các quy tắc.',
        correctSentence: 'It might be a good idea to make the rules together.',
        extraWords: ['making', 'must'],
        explanation: {
          vi: '"It might be a good idea to + V" là lời khuyên nhẹ nhàng.',
          en: '"It might be a good idea to + verb" is gentle advice.',
        },
      },
      {
        id: 'l3-g-u5-write-ex08',
        type: 'multiple-choice',
        question: 'Which sentence is too informal for a forum reply?',
        options: [
          "I'm not sure that's fair on your parents.",
          'tbh ur parents r 2 strict lol',
          "You're definitely not alone.",
          "Here's what worked for my family.",
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Viết tắt kiểu chat (tbh, ur, r, 2, lol) khó đọc và thiếu tôn trọng.',
          en: 'Chat shortcuts (tbh, ur, r, 2, lol) are hard to read and disrespectful.',
        },
      },
      {
        id: 'l3-g-u5-write-ex09',
        type: 'match-pairs',
        instruction: { vi: 'Nối phần đầu với phần cuối câu', en: 'Match the sentence beginnings and endings' },
        pairs: [
          { left: 'It might be a good idea', right: 'to agree on screen-free times.' },
          { left: 'You could try', right: 'turning off notifications after nine.' },
          { left: 'If I were you,', right: 'I would talk to them calmly.' },
          { left: 'One thing that worked for us', right: 'was a weekly family game night.' },
          { left: 'We charge our phones in the kitchen', right: 'so that nobody uses them in bed.' },
        ],
        explanation: {
          vi: 'Năm cấu trúc khuyên dùng được ngay trong bài viết.',
          en: 'Five advice structures you can use in your reply.',
        },
      },
      {
        id: 'l3-g-u5-write-ex10',
        type: 'speak-sentence',
        sentence: 'One thing that worked for us was having a phone-free dinner.',
        translationVi: 'Một điều hiệu quả với nhà tôi là bữa tối không điện thoại.',
        explanation: {
          vi: 'Đọc rõ /kt/ cuối "worked" và /z/ cuối "was". Nhấn PHONE-free DIN-ner.',
          en: 'Say /kt/ at the end of "worked" and /z/ in "was". Stress PHONE-free DIN-ner.',
        },
      },
    ],
    writingTask: {
      id: 'l3-g-u5-write-task',
      taskNumber: 2,
      prompt:
        'You read this post on an online forum:\n\n"My parents say I spend too much time on my phone at home, and now they want a \'no phones after nine o\'clock\' rule for the whole family. I think it\'s unfair. Is technology really making family life worse?" (Bao, 17)\n\nWrite a reply to Bao. Give your opinion on whether technology is making family life worse, and offer some practical advice.\n\nWrite at least 150 words.',
      minWords: 150,
      suggestedMinutes: 25,
      sampleAnswer:
        "Hi Bao,\n\nYou're definitely not alone. A lot of families argue about this! In my opinion, technology itself doesn't make family life worse, but the way we use it often does.\n\nOn the one hand, phones help families stay close. My cousins live in Australia, and we video call every Sunday, so my grandparents can watch the kids grow up. On the other hand, it's very easy to be in the same room as your family without really being together. In my house, we used to eat dinner in complete silence because everyone was looking at a screen.\n\nSo, if I were you, I wouldn't reject your parents' idea completely. Instead, you could suggest a compromise. For example, maybe the rule could start at ten instead of nine, and it should apply to your parents too, which would make it feel fairer. One thing that worked for us was a phone-free dinner, and honestly, we talk much more now.\n\nGood luck!\nLinh",
      bandSamples: [
        {
          band: '4.5',
          text:
            "Hi Bao,\n\nI think technology is not make family worse. Technology is very useful, we can learn and talk with friend. My parents also use phone very much, so they cannot say me.\n\nBut sometime phone is bad, because we don't talk with family. My family eat dinner and everybody watch phone. It is not good.\n\nI think you should talk with your parent. Maybe you use phone until 10pm. And your parent also don't use phone.\n\nGood luck",
          notesVi:
            'Khoảng 4.5. TR: có quan điểm và lời khuyên nhưng bài quá ngắn; ý mâu thuẫn (đầu nói công nghệ không xấu, sau lại "phone is bad") mà không giải thích. CC: đoạn ngắn, ít từ nối, "they cannot say me" khó hiểu. LR: lặp "phone", "use"; "watch phone" dịch từ tiếng Việt. GRA: "is not make", "everybody watch", "your parent also don\'t", thiếu -s và mạo từ.',
        },
        {
          band: '5.5',
          text:
            "Hi Bao,\n\nI understand your feeling because my parents had the same rule last year. In my opinion, technology has good and bad sides for family life.\n\nTechnology helps us to keep in touch with family members who live far away. For example, my uncle works in Japan and we often video call him. However, technology also makes people talk less. In my family, before, everyone used their phone during dinner and nobody talked, so my mother was very upset. After that, she made a rule and now we talk more.\n\nI think your parents' rule is not unfair, but maybe it is too strict. You should talk to them and suggest a different time, for example ten o'clock. You can also ask them to follow the rule too, so it will be fair for everyone. In my family we tried a phone-free dinner and it worked very well.\n\nI hope this helps!\nLinh",
          notesVi:
            'Khoảng 5.5. TR: đủ quan điểm, hai mặt có ví dụ, lời khuyên cụ thể; nhưng quan điểm chung ("good and bad sides") chưa thật rõ. CC: bố cục hợp lý, dùng For example / However / so đúng nhưng còn đơn giản. LR: đủ (keep in touch, strict, phone-free) nhưng lặp "family", "rule". GRA: khá đúng; "I understand your feeling" hơi vụng (how you feel), "before" đặt sai chỗ.',
        },
        {
          band: '6.5',
          text:
            "Hi Bao,\n\nI know exactly how you feel. My parents introduced a very similar rule a couple of years ago, and I was furious at first. Looking back, though, I think they had a point.\n\nTechnology isn't the enemy. It allows my family to stay in touch with my aunt in Canada, and my dad and I share music recommendations all the time. The problem is that screens are designed to hold our attention, so without some limits, we end up sitting in the same room while living in separate worlds. That was certainly true in our house.\n\nRather than rejecting the rule, why not negotiate it? You could suggest moving the time to ten o'clock at weekends, for instance. More importantly, ask your parents to follow it as well. If everyone puts their phone away, it stops feeling like a punishment and starts feeling like family time.\n\nHope that helps!\nLinh",
          notesVi:
            'Khoảng 6.5. TR: quan điểm cân bằng nhưng rõ (công nghệ không xấu, thiếu giới hạn mới là vấn đề), có ví dụ thật, lời khuyên khéo léo. CC: các đoạn nối tự nhiên (Looking back, though / The problem is / Rather than…). LR: cụm tự nhiên (had a point, hold our attention, living in separate worlds, negotiate). GRA: đa dạng (câu điều kiện, Rather than + V-ing, stops / starts + V-ing) và chính xác.',
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Bạn có trả lời rõ câu hỏi "công nghệ có làm đời sống gia đình tệ hơn không?" không?',
            'Bạn có đưa ít nhất 1 lời khuyên thực tế cho Bao không?',
            'Mỗi ý có lý do hoặc ví dụ đi kèm không?',
            'Bài có từ 150 từ trở lên không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Câu mở có phản hồi cảm xúc của Bao trước khi nêu quan điểm không?',
            'Các đoạn có theo thứ tự hợp lý (quan điểm → lý do → lời khuyên) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Bạn có dùng ít nhất 2 cách khuyên khác nhau (You could try…, If I were you…) không?',
            'Giọng văn có thân thiện mà không dùng tiếng lóng hay viết tắt kiểu chat không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Sau "if" (câu điều kiện loại 1), bạn có tránh dùng "will" không?',
            'Bạn có dùng đúng "If I were you, I would…" không?',
            'Động từ sau everyone / everybody có chia số ít (everyone uses) không?',
          ],
        },
      ],
      planningHintsVi: [
        'Quyết định câu trả lời: công nghệ làm gia đình tệ hơn, tốt hơn, hay "tuỳ cách dùng"?',
        'Mở: 1 câu đồng cảm với Bao + quan điểm của bạn.',
        'Thân: 1 mặt tốt + 1 mặt xấu, mỗi mặt có ví dụ từ gia đình bạn.',
        'Lời khuyên: 1–2 gợi ý cụ thể (thương lượng giờ, cả nhà cùng làm…).',
        'Kết thân thiện: Good luck! / Hope that helps!',
      ],
    },
    miniTest: [],
  },
]
