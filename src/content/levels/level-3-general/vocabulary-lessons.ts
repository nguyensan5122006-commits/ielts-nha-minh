/**
 * vocabulary-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * BÀI TỪ VỰNG + NGỮ PHÁP (mode 'practice') — bài ĐẦU TIÊN của mỗi chặng
 * ----------------------------------------------------------------------------
 * Mỗi chặng mở đầu bằng 1 bài "practice" kiểu Duolingo: dạy 8 từ/cụm từ mới
 * (giới hạn của level 3: ≤ 8 từ mới/bài) + 1 điểm ngữ pháp dùng ngay trong đời thật.
 * Các bài nghe/đọc/nói/viết phía sau trong cùng chặng sẽ dùng lại những từ này.
 *
 * Danh sách bài:
 *   l3-g-u1-vocab  Ngôn ngữ nơi công sở: họp, email, phỏng vấn + đề nghị/phản đối lịch sự
 *   l3-g-u2-vocab  Du lịch & xử lý sự cố + phàn nàn lịch sự + hiện tại hoàn thành
 *   l3-g-u3-vocab  Ngôn ngữ tin tức: tiêu đề báo, thuật lại lời nói, sự thật vs ý kiến
 *   l3-g-u4-vocab  Nói về phim, series, âm nhạc + tính từ -ed/-ing + thành ngữ
 *   l3-g-u5-vocab  Đời sống: sức khoẻ, tiền bạc, quan hệ + cách khuyên + kể chuyện quá khứ
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ (từ vựng theo cụm, ngữ pháp, mẹo dùng)
 *   - words         : 8 từ/cụm từ (có IPA, nghĩa, 2 câu ví dụ, ghi chú lỗi hay gặp)
 *   - exercises     : 13 bài theo thang "chọn → ghép → gõ/nói"; ≥ 70% là bài tự nhớ
 *                     (2 bài speak-sentence để luyện phát âm, còn lại là retrieval)
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l3-g-u<chặng>-vocab", bài tập "...-ex<số>", từ "l3-g-w-<từ>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level3GeneralVocabularyLessons: Lesson[] = [
  /* ==========================================================================
   * CHẶNG 1 — NGÔN NGỮ NƠI CÔNG SỞ
   * Từ: deadline, colleague, agenda, postpone, candidate, strength, responsible, follow up
   * Ngữ pháp: đề nghị lịch sự (Could you / Would it be possible / I was wondering if)
   *           + đồng ý / phản đối khéo léo trong cuộc họp
   * ======================================================================== */
  {
    id: 'l3-g-u1-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 12,
    title: { vi: 'Ngôn ngữ nơi công sở', en: 'Language for the workplace' },
    description: {
      vi: 'Từ vựng về họp, email, phỏng vấn và cách đề nghị, đồng ý, phản đối thật lịch sự.',
      en: 'Words for meetings, emails and interviews, plus polite ways to ask, agree and disagree.',
    },
    teachingCards: [
      {
        title: { vi: 'Học từ theo cụm', en: 'Learn words in chunks' },
        body: {
          vi: 'Người bản xứ nói theo **cụm từ cố định**, học cả cụm sẽ nói tự nhiên hơn:\n**meet / miss a deadline** = kịp / trễ hạn chót\n**postpone a meeting** = hoãn cuộc họp\n**be responsible for** + danh từ / V-ing = chịu trách nhiệm\n**follow up on** something = liên hệ lại, theo dõi tiếp một việc',
          en: 'Native speakers use **fixed chunks**, so learn the whole phrase:\n**meet / miss a deadline** = finish on time / late\n**postpone a meeting** = move it to a later time\n**be responsible for** + noun / -ing\n**follow up on** something = check or contact someone again about it',
        },
        examples: [
          { en: 'We worked late on Friday to meet the deadline.', vi: 'Chúng tôi làm muộn hôm thứ Sáu để kịp hạn chót.' },
          { en: "I'm responsible for training new staff.", vi: 'Tôi chịu trách nhiệm đào tạo nhân viên mới.' },
        ],
      },
      {
        title: { vi: 'Đề nghị lịch sự: câu càng dài càng mềm', en: 'Polite requests: longer is softer' },
        body: {
          vi: 'Ở chỗ làm, câu ra lệnh ngắn ("Send me the report.") nghe **thiếu lịch sự**. Hãy làm mềm dần:\n**Could you…?** → **Would it be possible to…?** → **I was wondering if you could…**\n"I was wondering if" dùng dạng **quá khứ** (was, could) nhưng vẫn nói về **bây giờ**. Quá khứ ở đây chỉ để **lịch sự hơn**.',
          en: 'At work, a short command ("Send me the report.") can sound **rude**. Soften it step by step:\n**Could you…?** → **Would it be possible to…?** → **I was wondering if you could…**\n"I was wondering if" uses **past forms** (was, could) but talks about **now**. The past simply makes it **more polite**.',
        },
        examples: [
          { en: 'Could you send me the report by Friday?', vi: 'Anh/chị gửi tôi bản báo cáo trước thứ Sáu được không?' },
          { en: 'I was wondering if you could help me with the slides.', vi: 'Không biết anh/chị có thể giúp tôi làm phần trình chiếu không.' },
        ],
      },
      {
        title: { vi: 'Đồng ý và phản đối khéo léo', en: 'Agreeing and disagreeing politely' },
        body: {
          vi: '**Đồng ý:** I completely agree. / That\'s a good point.\n**Phản đối nhẹ:** I see your point, but… / I\'m not sure I agree. / That\'s true, but have we thought about…?\nTrong cuộc họp, người ta hiếm khi nói thẳng "You\'re wrong". Họ **công nhận ý người kia trước**, rồi mới nói **but**.',
          en: '**Agree:** I completely agree. / That\'s a good point.\n**Disagree softly:** I see your point, but… / I\'m not sure I agree. / That\'s true, but have we thought about…?\nIn meetings, people rarely say "You\'re wrong". They **accept the other idea first**, then say **but**.',
        },
        examples: [
          { en: "I see your point, but I think we need more time.", vi: 'Tôi hiểu ý anh/chị, nhưng tôi nghĩ chúng ta cần thêm thời gian.' },
          { en: "That's true, but have we thought about the cost?", vi: 'Đúng vậy, nhưng chúng ta đã tính đến chi phí chưa?' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w-deadline',
        word: 'deadline',
        ipa: '/ˈded.laɪn/',
        partOfSpeech: 'noun',
        meaningVi: 'hạn chót',
        definitionEn: 'The time or date by which something must be finished.',
        examples: [
          { en: 'The deadline for the sales report is next Monday.', vi: 'Hạn chót nộp báo cáo doanh số là thứ Hai tới.' },
          { en: 'Can we move the deadline? We need two more days.', vi: 'Mình dời hạn chót được không? Chúng tôi cần thêm hai ngày.' },
        ],
        usageNote: {
          vi: 'Cụm hay dùng: **meet** a deadline (kịp), **miss** a deadline (trễ), **extend** a deadline (gia hạn).',
          en: 'Common collocations: **meet**, **miss** or **extend** a deadline.',
        },
      },
      {
        id: 'l3-g-w-colleague',
        word: 'colleague',
        ipa: '/ˈkɒl.iːɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'đồng nghiệp',
        definitionEn: 'A person you work with.',
        examples: [
          { en: 'My colleagues helped me a lot in my first week.', vi: 'Đồng nghiệp đã giúp tôi rất nhiều trong tuần đầu tiên.' },
          { en: "She's having lunch with a colleague from the design team.", vi: 'Cô ấy đang ăn trưa với một đồng nghiệp bên nhóm thiết kế.' },
        ],
        usageNote: {
          vi: 'Nhấn âm **đầu**: **COL**-league. Âm cuối là /ɡ/, đừng nuốt mất.',
          en: 'Stress the **first** syllable: **COL**-league. Say the final /ɡ/ clearly.',
        },
      },
      {
        id: 'l3-g-w-agenda',
        word: 'agenda',
        ipa: '/əˈdʒen.də/',
        partOfSpeech: 'noun',
        meaningVi: 'chương trình họp (danh sách việc cần bàn)',
        definitionEn: 'A list of things to discuss at a meeting.',
        examples: [
          { en: 'The first item on the agenda is the budget.', vi: 'Mục đầu tiên trong chương trình họp là ngân sách.' },
          { en: 'Could you send the agenda before the meeting?', vi: 'Anh/chị gửi chương trình họp trước buổi họp được không?' },
        ],
      },
      {
        id: 'l3-g-w-postpone',
        word: 'postpone',
        ipa: '/pəˈspəʊn/',
        partOfSpeech: 'verb',
        meaningVi: 'hoãn lại',
        definitionEn: 'To move an event to a later time or date.',
        examples: [
          { en: "We've postponed the meeting until Thursday.", vi: 'Chúng tôi đã hoãn cuộc họp đến thứ Năm.' },
          { en: 'The trip was postponed because of the storm.', vi: 'Chuyến đi bị hoãn vì cơn bão.' },
        ],
        usageNote: {
          vi: '**postpone** = dời sang lúc khác; **cancel** = huỷ hẳn. Văn nói thân mật hay dùng **put off**.',
          en: '**postpone** = move to later; **cancel** = stop completely. Informally, people say **put off**.',
        },
      },
      {
        id: 'l3-g-w-candidate',
        word: 'candidate',
        ipa: '/ˈkæn.dɪ.dət/',
        partOfSpeech: 'noun',
        meaningVi: 'ứng viên',
        definitionEn: 'A person who is applying for a job.',
        examples: [
          { en: 'We interviewed five candidates for the job.', vi: 'Chúng tôi đã phỏng vấn năm ứng viên cho vị trí này.' },
          { en: 'The best candidate had strong communication skills.', vi: 'Ứng viên tốt nhất có kỹ năng giao tiếp rất tốt.' },
        ],
      },
      {
        id: 'l3-g-w-strength',
        word: 'strength',
        ipa: '/streŋθ/',
        partOfSpeech: 'noun',
        meaningVi: 'điểm mạnh',
        definitionEn: 'A good quality or ability that someone has.',
        examples: [
          { en: 'One of my strengths is staying calm under pressure.', vi: 'Một trong những điểm mạnh của tôi là giữ bình tĩnh khi chịu áp lực.' },
          { en: 'Think about your strengths and weaknesses before the interview.', vi: 'Hãy nghĩ về điểm mạnh và điểm yếu của bạn trước buổi phỏng vấn.' },
        ],
        usageNote: {
          vi: 'Trái nghĩa: **weakness**. Số nhiều "strengths" có cụm âm cuối khó /ŋθs/, hãy đọc chậm cho rõ.',
          en: 'Opposite: **weakness**. The plural "strengths" ends in the hard cluster /ŋθs/, so say it slowly.',
        },
      },
      {
        id: 'l3-g-w-responsible',
        word: 'responsible',
        ipa: '/rɪˈspɒn.sə.bl̩/',
        partOfSpeech: 'adjective',
        meaningVi: 'chịu trách nhiệm',
        definitionEn: 'Having the job of looking after someone or something.',
        examples: [
          { en: "I'm responsible for customer service.", vi: 'Tôi chịu trách nhiệm mảng chăm sóc khách hàng.' },
          { en: 'Who is responsible for booking the meeting room?', vi: 'Ai chịu trách nhiệm đặt phòng họp?' },
        ],
        usageNote: {
          vi: 'Luôn là responsible **for** (KHÔNG nói "responsible of"). Sau "for" là danh từ hoặc V-ing.',
          en: 'Always responsible **for** (not "responsible of"), followed by a noun or -ing.',
        },
      },
      {
        id: 'l3-g-w-follow-up',
        word: 'follow up',
        ipa: '/ˌfɒl.əʊ ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'liên hệ lại, theo dõi tiếp',
        definitionEn: 'To contact someone again or take more action about something.',
        examples: [
          { en: "I'll follow up with the client tomorrow.", vi: 'Ngày mai tôi sẽ liên hệ lại với khách hàng.' },
          { en: "I'll follow up on the budget question by email.", vi: 'Tôi sẽ trả lời tiếp câu hỏi về ngân sách qua email.' },
        ],
        usageNote: {
          vi: 'follow up **with** + người; follow up **on** + việc. Danh từ: **a follow-up email**.',
          en: 'follow up **with** a person; follow up **on** a matter. Noun: **a follow-up email**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u1-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa đúng', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'deadline', right: 'the date work must be finished' },
          { left: 'colleague', right: 'a person you work with' },
          { left: 'agenda', right: 'a list of topics for a meeting' },
          { left: 'candidate', right: 'a person applying for a job' },
          { left: 'postpone', right: 'move to a later time' },
        ],
        explanation: {
          vi: 'Năm từ cốt lõi của bài. Hãy nhớ theo cụm: meet a deadline, postpone a meeting.',
          en: 'Five key words. Remember them in chunks: meet a deadline, postpone a meeting.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex02',
        type: 'multiple-choice',
        question: 'We stayed late on Friday to ___ the deadline.',
        options: ['meet', 'do', 'take', 'win'],
        correctIndex: 0,
        explanation: {
          vi: 'Cụm cố định là "meet a deadline" (kịp hạn). Trái nghĩa: "miss a deadline".',
          en: 'The fixed phrase is "meet a deadline". The opposite is "miss a deadline".',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex03',
        type: 'fill-blank',
        sentence: 'The manager is ill, so we have to ___ the meeting until next week.',
        acceptedAnswers: ['postpone', 'put off'],
        hint: '(move to a later time)',
        explanation: {
          vi: '"until next week" cho biết cuộc họp được dời sang sau, nên dùng postpone.',
          en: '"until next week" shows the meeting moves to later, so we use postpone.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex04',
        type: 'multiple-choice',
        question: 'Which request is the MOST polite to send to your manager?',
        options: [
          'Give me Friday off.',
          'I want Friday off.',
          'I was wondering if I could take Friday off.',
          'Can I have Friday off or not?',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"I was wondering if I could…" là cách đề nghị mềm và lịch sự nhất.',
          en: '"I was wondering if I could…" is the softest, most polite request.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex05',
        type: 'fill-blank',
        sentence: 'I was wondering if you ___ help me with the presentation.',
        acceptedAnswers: ['could'],
        hint: '(can)',
        explanation: {
          vi: 'Sau "I was wondering if" dùng dạng quá khứ: can → could, để lịch sự hơn.',
          en: 'After "I was wondering if", use the past form: can → could, for politeness.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex06',
        type: 'arrange-words',
        translationVi: 'Liệu có thể dời cuộc họp sang thứ Sáu được không?',
        correctSentence: 'Would it be possible to move the meeting to Friday?',
        extraWords: ['moving', 'on'],
        explanation: {
          vi: '"Would it be possible to + V nguyên mẫu?" Dời sang ngày nào dùng "to Friday".',
          en: '"Would it be possible to + base verb?" Move something "to" a new day.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex07',
        type: 'multiple-choice',
        question: 'A colleague says: "We should cancel the training day." You partly disagree. What do you say?',
        options: [
          "No. That's wrong.",
          'I see your point, but the new staff really need it.',
          'You are not right about this.',
          'Whatever you want.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Công nhận ý người kia ("I see your point") rồi mới phản đối nhẹ bằng "but".',
          en: 'Accept the other idea first ("I see your point"), then disagree softly with "but".',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex08',
        type: 'listen-choose',
        audioText: "That's a fair point, but I'm not sure we have enough time to do it properly.",
        question: 'What is the speaker doing?',
        options: ['Agreeing completely', 'Disagreeing politely', 'Asking for help', 'Changing the topic'],
        correctIndex: 1,
        explanation: {
          vi: '"That\'s a fair point, but…" công nhận ý người khác rồi phản đối nhẹ nhàng.',
          en: '"That\'s a fair point, but…" accepts the idea, then disagrees gently.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex09',
        type: 'fill-blank',
        sentence: "In my new job, I'm responsible ___ answering customer emails.",
        acceptedAnswers: ['for'],
        explanation: {
          vi: 'Luôn là "responsible for" + V-ing/danh từ, không dùng "responsible of".',
          en: 'Always "responsible for" + -ing or noun, never "responsible of".',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex10',
        type: 'multiple-choice',
        question: 'Interviewer: "What are your main ___?" Candidate: "I\'m organised and I learn quickly."',
        options: ['strengths', 'strongs', 'strongly', 'powers'],
        correctIndex: 0,
        explanation: {
          vi: '"strengths" là danh từ (điểm mạnh). "strong" là tính từ, không thêm -s.',
          en: '"strengths" is the noun. "strong" is an adjective and never takes -s.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex11',
        type: 'listen-type',
        audioText: "I'll follow up with the client tomorrow morning.",
        acceptedAnswers: [
          "I'll follow up with the client tomorrow morning",
          'I will follow up with the client tomorrow morning',
        ],
        explanation: {
          vi: '"follow up with" + người = liên hệ lại với ai. Chú ý âm /l/ nhẹ trong "I\'ll".',
          en: '"follow up with" + person = contact them again. Notice the light /l/ in "I\'ll".',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex12',
        type: 'speak-sentence',
        sentence: 'One of my strengths is working well under pressure.',
        translationVi: 'Một trong những điểm mạnh của tôi là làm việc tốt khi chịu áp lực.',
        explanation: {
          vi: 'Đọc rõ cụm âm cuối /ŋθs/ trong "strengths". Nhấn STRENGTHS, WORKING, PRESSURE.',
          en: 'Say the final cluster /ŋθs/ in "strengths". Stress STRENGTHS, WORKING, PRESSURE.',
        },
      },
      {
        id: 'l3-g-u1-vocab-ex13',
        type: 'speak-sentence',
        sentence: 'I see your point, but I think we need more time.',
        translationVi: 'Tôi hiểu ý anh/chị, nhưng tôi nghĩ chúng ta cần thêm thời gian.',
        explanation: {
          vi: 'Đọc rõ /t/ cuối "point". Hơi ngừng sau "point" rồi mới nói "but…".',
          en: 'Say the final /t/ in "point". Pause briefly after "point" before "but…".',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 2 — DU LỊCH & XỬ LÝ SỰ CỐ
   * Từ: reservation, available, refund, complaint, delayed, luggage, upgrade, sort out
   * Ngữ pháp: phàn nàn lịch sự (I'm afraid… / Would you mind + V-ing)
   *           + hiện tại hoàn thành cho sự cố còn ảnh hưởng bây giờ
   * ======================================================================== */
  {
    id: 'l3-g-u2-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 12,
    title: { vi: 'Du lịch & xử lý sự cố', en: 'Travel and sorting out problems' },
    description: {
      vi: 'Từ vựng đặt chỗ, hoàn tiền, chậm chuyến và cách phàn nàn lịch sự mà vẫn rõ ràng.',
      en: 'Words for bookings, refunds and delays, plus how to complain politely but clearly.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ khi đi du lịch', en: 'Travel collocations' },
        body: {
          vi: '**make / cancel a reservation** = đặt / huỷ chỗ\n**ask for / get a refund** = đòi / được hoàn tiền\n**the flight is delayed** (by two hours) = chuyến bay bị trễ\n**sort out** a problem = giải quyết sự cố\nLưu ý: **luggage** KHÔNG đếm được. Nói "two pieces of luggage", không nói "two luggages".',
          en: '**make / cancel a reservation**\n**ask for / get a refund**\n**the flight is delayed** (by two hours)\n**sort out** a problem = solve it\nNote: **luggage** is uncountable. Say "two pieces of luggage", never "two luggages".',
        },
        examples: [
          { en: "I'd like to make a reservation for two nights.", vi: 'Tôi muốn đặt phòng hai đêm.' },
          { en: 'Our flight was delayed by three hours.', vi: 'Chuyến bay của chúng tôi bị trễ ba tiếng.' },
        ],
      },
      {
        title: { vi: 'Phàn nàn lịch sự', en: 'Complaining politely' },
        body: {
          vi: 'Mở lời: **I\'m afraid there\'s a problem with…** / **I\'d like to complain about…**\nNhờ giải quyết: **Would you mind + V-ing…?** / **Could you possibly…?**\nGiữ giọng **bình tĩnh** và nói rõ 2 điều: **vấn đề là gì** + **bạn muốn gì**. Nổi nóng thường làm việc chậm hơn.',
          en: 'Start: **I\'m afraid there\'s a problem with…** / **I\'d like to complain about…**\nAsk for action: **Would you mind + -ing…?** / **Could you possibly…?**\nStay **calm** and say two things clearly: **what the problem is** + **what you want**. Getting angry usually slows things down.',
        },
        examples: [
          { en: "I'm afraid there's a problem with my room.", vi: 'Tôi e là phòng của tôi có vấn đề.' },
          { en: 'Would you mind checking my booking again?', vi: 'Phiền bạn kiểm tra lại đặt chỗ của tôi được không?' },
        ],
      },
      {
        title: { vi: 'Hiện tại hoàn thành cho sự cố', en: 'Present perfect for problems' },
        body: {
          vi: 'Dùng **have/has + V3** khi sự cố đã xảy ra và **vẫn còn ảnh hưởng bây giờ**:\nMy suitcase **hasn\'t arrived**. / Someone **has taken** my seat.\nDùng **quá khứ đơn** khi có **thời gian cụ thể** trong quá khứ:\nThe air conditioner **stopped** working **last night**.',
          en: 'Use **have/has + past participle** when a problem happened and **still matters now**:\nMy suitcase **hasn\'t arrived**. / Someone **has taken** my seat.\nUse the **past simple** with a **finished time**:\nThe air conditioner **stopped** working **last night**.',
        },
        examples: [
          { en: "Excuse me, my suitcase hasn't arrived yet.", vi: 'Xin lỗi, vali của tôi vẫn chưa ra.' },
          { en: 'The shower stopped working this morning.', vi: 'Vòi sen bị hỏng từ sáng nay.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w-reservation',
        word: 'reservation',
        ipa: '/ˌrez.əˈveɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'sự đặt chỗ (phòng, bàn, vé)',
        definitionEn: 'An arrangement to keep a room, table or seat for you.',
        examples: [
          { en: "I'd like to make a reservation for two nights.", vi: 'Tôi muốn đặt phòng hai đêm.' },
          { en: "I'm sorry, we have no reservation under that name.", vi: 'Xin lỗi, chúng tôi không có đặt chỗ nào dưới tên đó.' },
        ],
        usageNote: {
          vi: 'Người Anh cũng hay nói **booking**. Nhấn âm thứ ba: re-ser-**VA**-tion.',
          en: 'British speakers also say **booking**. Stress: re-ser-**VA**-tion.',
        },
      },
      {
        id: 'l3-g-w-available',
        word: 'available',
        ipa: '/əˈveɪ.lə.bl̩/',
        partOfSpeech: 'adjective',
        meaningVi: 'còn trống, có sẵn; rảnh',
        definitionEn: 'Free to be used, booked or bought; free to talk.',
        examples: [
          { en: 'Are there any rooms available this weekend?', vi: 'Cuối tuần này còn phòng trống không?' },
          { en: "The manager isn't available right now.", vi: 'Quản lý hiện không rảnh.' },
        ],
      },
      {
        id: 'l3-g-w-refund',
        word: 'refund',
        ipa: '/ˈriː.fʌnd/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'tiền hoàn lại; hoàn tiền',
        definitionEn: 'Money that is given back to you, for example when a service was not good enough.',
        examples: [
          { en: 'I asked for a full refund.', vi: 'Tôi đã yêu cầu hoàn lại toàn bộ tiền.' },
          { en: 'They refunded the cost of the tour.', vi: 'Họ đã hoàn lại tiền tour.' },
        ],
        usageNote: {
          vi: 'Danh từ nhấn đầu: **RE**fund. Động từ nhấn sau: re**FUND**. "a partial refund" = hoàn một phần.',
          en: 'Noun: **RE**fund. Verb: re**FUND**. "A partial refund" = some of the money back.',
        },
      },
      {
        id: 'l3-g-w-complaint',
        word: 'complaint',
        ipa: '/kəmˈpleɪnt/',
        partOfSpeech: 'noun',
        meaningVi: 'lời phàn nàn, khiếu nại',
        definitionEn: 'A statement that something is wrong or not good enough.',
        examples: [
          { en: "I'd like to make a complaint about my room.", vi: 'Tôi muốn khiếu nại về phòng của mình.' },
          { en: 'The hotel received many complaints about the noise.', vi: 'Khách sạn nhận nhiều lời phàn nàn về tiếng ồn.' },
        ],
        usageNote: {
          vi: 'Danh từ **complaint** (có t). Động từ **complain about** sth / **to** sb.',
          en: 'Noun: **complaint** (with t). Verb: **complain about** something / **to** someone.',
        },
      },
      {
        id: 'l3-g-w-delayed',
        word: 'delayed',
        ipa: '/dɪˈleɪd/',
        partOfSpeech: 'adjective',
        meaningVi: 'bị trễ, bị chậm',
        definitionEn: 'Late; happening later than planned.',
        examples: [
          { en: 'Our flight was delayed by three hours.', vi: 'Chuyến bay của chúng tôi bị trễ ba tiếng.' },
          { en: 'Delayed passengers can get a free meal.', vi: 'Hành khách bị trễ chuyến được nhận một bữa ăn miễn phí.' },
        ],
        usageNote: {
          vi: '**delayed** = trễ nhưng vẫn đi; **cancelled** = bị huỷ. Đuôi -ed đọc là /d/.',
          en: '**delayed** = late but still happening; **cancelled** = not happening. The -ed sounds like /d/.',
        },
      },
      {
        id: 'l3-g-w-luggage',
        word: 'luggage',
        ipa: '/ˈlʌɡ.ɪdʒ/',
        partOfSpeech: 'noun (uncountable)',
        meaningVi: 'hành lý',
        definitionEn: 'The bags and suitcases you take when you travel.',
        examples: [
          { en: "My luggage didn't arrive in Sydney.", vi: 'Hành lý của tôi không tới Sydney.' },
          { en: 'You can take one piece of luggage on the bus.', vi: 'Bạn được mang một kiện hành lý lên xe buýt.' },
        ],
        usageNote: {
          vi: 'Không đếm được: **a piece of luggage**, **much luggage**. Người Mỹ hay nói **baggage**.',
          en: 'Uncountable: **a piece of luggage**, **much luggage**. Americans often say **baggage**.',
        },
      },
      {
        id: 'l3-g-w-upgrade',
        word: 'upgrade',
        ipa: '/ˈʌp.ɡreɪd/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'sự nâng hạng (phòng, ghế); nâng hạng',
        definitionEn: 'A better seat, room or service than the one you paid for.',
        examples: [
          { en: 'The hotel gave us a free upgrade to a sea-view room.', vi: 'Khách sạn nâng hạng miễn phí cho chúng tôi lên phòng nhìn ra biển.' },
          { en: 'Can I upgrade my ticket?', vi: 'Tôi có thể nâng hạng vé không?' },
        ],
        usageNote: {
          vi: 'Danh từ nhấn đầu: **UP**grade. Động từ thường nhấn sau: up**GRADE**.',
          en: 'Noun: **UP**grade. Verb: usually up**GRADE**.',
        },
      },
      {
        id: 'l3-g-w-sort-out',
        word: 'sort out',
        ipa: '/ˌsɔːt ˈaʊt/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'giải quyết, thu xếp',
        definitionEn: 'To deal with a problem successfully.',
        examples: [
          { en: "Don't worry, we'll sort it out right away.", vi: 'Đừng lo, chúng tôi sẽ giải quyết ngay.' },
          { en: 'It took an hour to sort out the problem with my ticket.', vi: 'Mất một tiếng để giải quyết vấn đề với vé của tôi.' },
        ],
        usageNote: {
          vi: 'Đại từ đứng **giữa**: sort **it** out (KHÔNG nói "sort out it").',
          en: 'A pronoun goes **in the middle**: sort **it** out (not "sort out it").',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u2-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa đúng', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'reservation', right: 'a booking for a room or table' },
          { left: 'refund', right: 'money given back to you' },
          { left: 'delayed', right: 'later than planned' },
          { left: 'upgrade', right: 'a better room or seat' },
          { left: 'available', right: 'free to use or book' },
        ],
        explanation: {
          vi: 'Năm từ cốt lõi khi đi du lịch. Nhớ cụm: make a reservation, ask for a refund.',
          en: 'Five key travel words. Remember: make a reservation, ask for a refund.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex02',
        type: 'multiple-choice',
        question: 'I have three ___: two suitcases and a backpack.',
        options: ['luggages', 'pieces of luggage', 'luggage', 'baggages'],
        correctIndex: 1,
        explanation: {
          vi: '"luggage" không đếm được. Muốn đếm phải dùng "pieces of luggage".',
          en: '"luggage" is uncountable. To count it, say "pieces of luggage".',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex03',
        type: 'fill-blank',
        sentence: 'The train was ___ by forty minutes because of the heavy rain.',
        acceptedAnswers: ['delayed'],
        hint: '(late)',
        explanation: {
          vi: '"be delayed by + thời gian" = bị trễ bao lâu.',
          en: '"be delayed by + time" tells us how late something is.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex04',
        type: 'multiple-choice',
        question: 'Which is the best way to start a complaint at a hotel reception desk?',
        options: [
          'This hotel is terrible!',
          "I'm afraid there's a problem with my room.",
          'You must give me a new room now.',
          'Why is everything broken here?',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"I\'m afraid there\'s a problem with…" lịch sự, bình tĩnh mà vẫn rõ ràng.',
          en: '"I\'m afraid there\'s a problem with…" is calm, polite and clear.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex05',
        type: 'fill-blank',
        sentence: 'Would you mind ___ my booking again, please?',
        acceptedAnswers: ['checking'],
        hint: '(check)',
        explanation: {
          vi: 'Sau "Would you mind" luôn dùng V-ing, không dùng "to check".',
          en: '"Would you mind" is always followed by -ing, not "to check".',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex06',
        type: 'fill-blank',
        sentence: 'Excuse me, my suitcase ___ yet.',
        acceptedAnswers: ["hasn't arrived", 'has not arrived'],
        hint: '(not arrive)',
        explanation: {
          vi: '"yet" + sự cố vẫn còn bây giờ → hiện tại hoàn thành: hasn\'t arrived.',
          en: '"yet" and a problem that still matters → present perfect: hasn\'t arrived.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex07',
        type: 'multiple-choice',
        question: 'The air conditioner ___ working last night.',
        options: ['has stopped', 'stopped', 'has stop', 'stops'],
        correctIndex: 1,
        explanation: {
          vi: '"last night" là thời gian cụ thể đã qua → dùng quá khứ đơn: stopped.',
          en: '"last night" is a finished time → past simple: stopped.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex08',
        type: 'arrange-words',
        translationVi: 'Tôi muốn được hoàn lại toàn bộ tiền.',
        correctSentence: 'I would like a full refund, please.',
        extraWords: ['refunds', 'to'],
        explanation: {
          vi: '"I would like + danh từ" (không có "to"). "a full refund" = hoàn toàn bộ tiền.',
          en: '"I would like + noun" (no "to"). "A full refund" = all your money back.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex09',
        type: 'listen-choose',
        audioText:
          "I'm sorry, we don't have any double rooms available tonight, but I can offer you a twin room with a free breakfast.",
        question: 'What does the receptionist offer?',
        options: ['A double room', 'A twin room and breakfast', 'A full refund', 'A room for tomorrow night'],
        correctIndex: 1,
        explanation: {
          vi: 'Không còn phòng đôi; lễ tân đề nghị phòng hai giường đơn + bữa sáng miễn phí.',
          en: 'No double rooms are free; the receptionist offers a twin room and free breakfast.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex10',
        type: 'fill-blank',
        sentence: "Don't worry about your ticket. I'll sort it ___ for you.",
        acceptedAnswers: ['out'],
        explanation: {
          vi: '"sort something out" = giải quyết. Đại từ "it" đứng giữa: sort it out.',
          en: '"sort something out" = solve it. The pronoun goes in the middle: sort it out.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex11',
        type: 'listen-type',
        audioText: "I'd like to make a complaint about the noise.",
        acceptedAnswers: [
          "I'd like to make a complaint about the noise",
          'I would like to make a complaint about the noise',
        ],
        explanation: {
          vi: '"make a complaint about" = khiếu nại về điều gì. Chú ý âm /t/ cuối "complaint".',
          en: '"make a complaint about" something. Listen for the final /t/ in "complaint".',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex12',
        type: 'speak-sentence',
        sentence: 'Our flight was delayed, so we missed the last bus.',
        translationVi: 'Chuyến bay của chúng tôi bị trễ nên chúng tôi lỡ chuyến xe buýt cuối.',
        explanation: {
          vi: '"delayed" đuôi -ed đọc /d/; "missed" đọc /t/. Đừng bỏ âm cuối.',
          en: '"delayed" ends in /d/; "missed" ends in /t/. Don\'t drop the endings.',
        },
      },
      {
        id: 'l3-g-u2-vocab-ex13',
        type: 'speak-sentence',
        sentence: 'Would you mind checking my reservation again?',
        translationVi: 'Phiền bạn kiểm tra lại đặt chỗ của tôi được không?',
        explanation: {
          vi: 'Nhấn MIND, CHECKING và re-ser-VA-tion. Giọng nhẹ nhàng, hơi lên cuối câu.',
          en: 'Stress MIND, CHECKING and re-ser-VA-tion. Keep your voice gentle, rising at the end.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 3 — NGÔN NGỮ TIN TỨC
   * Từ: according to, survey, resident, rise, affect, claim, issue, reduce
   * Ngữ pháp: tiêu đề báo (hiện tại đơn = vừa xảy ra; to + V = tương lai),
   *           thuật lại lời nói (according to, claim, be expected to),
   *           dấu hiệu phân biệt sự thật và ý kiến
   * ======================================================================== */
  {
    id: 'l3-g-u3-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 12,
    title: { vi: 'Ngôn ngữ tin tức', en: 'The language of the news' },
    description: {
      vi: 'Từ vựng tin tức đời thường, cách tin tức thuật lại lời người khác và dấu hiệu phân biệt sự thật với ý kiến.',
      en: 'Everyday news words, how the news reports what people say, and signs of fact versus opinion.',
    },
    teachingCards: [
      {
        title: { vi: 'Đọc hiểu tiêu đề báo', en: 'Understanding headlines' },
        body: {
          vi: 'Tiêu đề **bỏ bớt từ nhỏ** (a, the, is) và có quy ước riêng:\n**Hiện tại đơn** = việc **vừa xảy ra**: "Town **opens** new library" = A town **has opened** a new library.\n**to + V** = việc **sắp xảy ra**: "Night buses **to start** in May" = Night buses **will start** in May.',
          en: 'Headlines **drop small words** (a, the, is) and follow special rules:\n**Present simple** = something that **just happened**: "Town **opens** new library" = A town **has opened** a new library.\n**to + verb** = something **in the future**: "Night buses **to start** in May" = they **will start** in May.',
        },
        examples: [
          { en: 'Local café wins national prize.', vi: 'Một quán cà phê địa phương vừa đoạt giải quốc gia.' },
          { en: 'New bridge to open in June.', vi: 'Cây cầu mới sẽ thông xe vào tháng Sáu.' },
        ],
      },
      {
        title: { vi: 'Tin tức thuật lại lời nói thế nào?', en: 'How the news reports what people say' },
        body: {
          vi: '**according to** + nguồn: According to a new survey, …\n**say / claim / suggest that…**: **claim** = khẳng định nhưng **chưa chắc đúng**.\nBị động hay gặp: Prices **are expected to rise**. (người ta dự đoán giá sẽ tăng)\nLưu ý: không nói "according to me", hãy dùng **In my opinion**.',
          en: '**according to** + source: According to a new survey, …\n**say / claim / suggest that…**: **claim** = say something is true when it **may not be**.\nCommon passive: Prices **are expected to rise**.\nNote: don\'t say "according to me"; say **In my opinion**.',
        },
        examples: [
          { en: 'According to the forecast, it will rain all weekend.', vi: 'Theo dự báo, trời sẽ mưa suốt cuối tuần.' },
          { en: 'The company claims its battery lasts three days.', vi: 'Công ty khẳng định pin của họ dùng được ba ngày.' },
        ],
      },
      {
        title: { vi: 'Sự thật hay ý kiến?', en: 'Fact or opinion?' },
        body: {
          vi: '**Sự thật (fact)** kiểm chứng được: số liệu, ngày tháng, ai làm gì.\n**Ý kiến (opinion)** là cách nghĩ của người viết. Dấu hiệu: **I believe, should, clearly, surprisingly**, hoặc tính từ đánh giá như **terrible, wonderful, the best**.\n"The park opened in 2020." = fact. "It\'s the best park in town." = opinion.',
          en: 'A **fact** can be checked: numbers, dates, who did what.\nAn **opinion** is what the writer thinks. Signs: **I believe, should, clearly, surprisingly**, or judging adjectives like **terrible, wonderful, the best**.\n"The park opened in 2020." = fact. "It\'s the best park in town." = opinion.',
        },
        examples: [
          { en: 'More than two thousand people visited the fair.', vi: 'Hơn hai nghìn người đã đến hội chợ. (sự thật)' },
          { en: 'The fair was clearly a wonderful idea.', vi: 'Hội chợ rõ ràng là một ý tưởng tuyệt vời. (ý kiến)' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w-according-to',
        word: 'according to',
        ipa: '/əˈkɔː.dɪŋ tə/',
        partOfSpeech: 'preposition',
        meaningVi: 'theo (nguồn nào đó)',
        definitionEn: 'As said or reported by someone or something.',
        examples: [
          { en: 'According to the weather forecast, it will rain all weekend.', vi: 'Theo dự báo thời tiết, trời sẽ mưa suốt cuối tuần.' },
          { en: 'According to the survey, most students sleep less than seven hours.', vi: 'Theo khảo sát, phần lớn học sinh ngủ ít hơn bảy tiếng.' },
        ],
        usageNote: {
          vi: 'KHÔNG nói "according to me". Nêu ý mình: **In my opinion**, **I think**.',
          en: 'Don\'t say "according to me". For your own view, say **In my opinion** or **I think**.',
        },
      },
      {
        id: 'l3-g-w-survey',
        word: 'survey',
        ipa: '/ˈsɜː.veɪ/',
        partOfSpeech: 'noun',
        meaningVi: 'cuộc khảo sát',
        definitionEn: 'A set of questions asked to many people to find out what they think or do.',
        examples: [
          { en: 'A survey of five hundred parents found that most children have a phone.', vi: 'Một khảo sát 500 phụ huynh cho thấy phần lớn trẻ em có điện thoại.' },
          { en: 'We did a survey of our customers last month.', vi: 'Tháng trước chúng tôi đã khảo sát khách hàng.' },
        ],
        usageNote: {
          vi: 'Danh từ nhấn đầu: **SUR**vey. Động từ nhấn sau: sur**VEY**.',
          en: 'Noun: **SUR**vey. Verb: sur**VEY**.',
        },
      },
      {
        id: 'l3-g-w-resident',
        word: 'resident',
        ipa: '/ˈrez.ɪ.dənt/',
        partOfSpeech: 'noun',
        meaningVi: 'cư dân',
        definitionEn: 'A person who lives in a particular place.',
        examples: [
          { en: 'Local residents are happy with the new park.', vi: 'Cư dân địa phương hài lòng với công viên mới.' },
          { en: 'The street is closed to everyone except residents.', vi: 'Con phố cấm mọi người trừ cư dân sống ở đó.' },
        ],
      },
      {
        id: 'l3-g-w-rise',
        word: 'rise',
        ipa: '/raɪz/',
        partOfSpeech: 'verb, noun',
        meaningVi: 'tăng; sự tăng',
        definitionEn: 'To go up; an increase in number or amount.',
        examples: [
          { en: 'Food prices rose by five percent last year.', vi: 'Giá thực phẩm đã tăng năm phần trăm vào năm ngoái.' },
          { en: 'There has been a rise in the number of cyclists.', vi: 'Số người đi xe đạp đã tăng lên.' },
        ],
        usageNote: {
          vi: 'rise – **rose** – **risen**, KHÔNG có tân ngữ (prices rise). **raise** thì cần tân ngữ (raise prices).',
          en: 'rise – **rose** – **risen**, with no object (prices rise). **raise** needs an object (raise prices).',
        },
      },
      {
        id: 'l3-g-w-affect',
        word: 'affect',
        ipa: '/əˈfekt/',
        partOfSpeech: 'verb',
        meaningVi: 'ảnh hưởng đến',
        definitionEn: 'To change or influence something.',
        examples: [
          { en: 'The heavy rain affected traffic all morning.', vi: 'Mưa lớn ảnh hưởng giao thông suốt buổi sáng.' },
          { en: 'Lack of sleep can affect your mood.', vi: 'Thiếu ngủ có thể ảnh hưởng đến tâm trạng.' },
        ],
        usageNote: {
          vi: '**affect** là động từ. **effect** là danh từ: have an **effect on** something.',
          en: '**affect** is a verb. **effect** is a noun: have an **effect on** something.',
        },
      },
      {
        id: 'l3-g-w-claim',
        word: 'claim',
        ipa: '/kleɪm/',
        partOfSpeech: 'verb, noun',
        meaningVi: 'khẳng định, cho rằng (chưa chắc đúng)',
        definitionEn: 'To say that something is true, although it may not be.',
        examples: [
          { en: 'The company claims its new phone battery lasts three days.', vi: 'Công ty khẳng định pin điện thoại mới dùng được ba ngày.' },
          { en: 'Some websites claim that coffee is bad for you.', vi: 'Một số trang web cho rằng cà phê có hại.' },
        ],
      },
      {
        id: 'l3-g-w-issue',
        word: 'issue',
        ipa: '/ˈɪʃ.uː/',
        partOfSpeech: 'noun',
        meaningVi: 'vấn đề (cần bàn đến)',
        definitionEn: 'An important subject or problem that people discuss.',
        examples: [
          { en: 'Traffic is a big issue in our city.', vi: 'Giao thông là một vấn đề lớn ở thành phố chúng tôi.' },
          { en: 'The article looks at the issue of food waste.', vi: 'Bài báo bàn về vấn đề lãng phí thực phẩm.' },
        ],
      },
      {
        id: 'l3-g-w-reduce',
        word: 'reduce',
        ipa: '/rɪˈdjuːs/',
        partOfSpeech: 'verb',
        meaningVi: 'giảm, làm giảm',
        definitionEn: 'To make something smaller or less.',
        examples: [
          { en: 'The school wants to reduce plastic waste.', vi: 'Nhà trường muốn giảm rác thải nhựa.' },
          { en: 'Walking to work has reduced my stress.', vi: 'Đi bộ đi làm đã giúp tôi giảm căng thẳng.' },
        ],
        usageNote: {
          vi: '**reduce** cần tân ngữ (reduce waste). Tự giảm thì dùng **fall / drop** (prices fell).',
          en: '**reduce** needs an object (reduce waste). For things going down by themselves, use **fall / drop**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u3-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa đúng', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'survey', right: 'questions asked to many people' },
          { left: 'resident', right: 'a person who lives in a place' },
          { left: 'issue', right: 'an important problem people discuss' },
          { left: 'claim', right: 'say something is true' },
          { left: 'reduce', right: 'make smaller or less' },
        ],
        explanation: {
          vi: 'Năm từ rất hay gặp trong tin tức địa phương và bài khảo sát.',
          en: 'Five words you often see in local news and survey reports.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex02',
        type: 'multiple-choice',
        question: 'Headline: "Local Café Wins National Prize". What does it mean?',
        options: [
          'A local café will win a prize.',
          'A local café has won a national prize.',
          'A local café always wins prizes.',
          'A local café wants to win a prize.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Tiêu đề dùng hiện tại đơn cho việc vừa xảy ra: wins = has won.',
          en: 'Headlines use the present simple for recent events: wins = has won.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex03',
        type: 'multiple-choice',
        question: 'Headline: "New Bridge to Open in June". What does it mean?',
        options: [
          'The bridge opened last June.',
          'The bridge will open in June.',
          'The bridge is open now.',
          'The bridge might never open.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Trong tiêu đề, "to + V" nói về tương lai: to open = will open.',
          en: 'In headlines, "to + verb" means the future: to open = will open.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex04',
        type: 'fill-blank',
        sentence: '___ to a new survey, most teenagers read the news on their phones.',
        acceptedAnswers: ['According'],
        hint: '(theo)',
        explanation: {
          vi: '"According to + nguồn" dùng để nói thông tin lấy từ đâu.',
          en: '"According to + source" shows where the information comes from.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex05',
        type: 'multiple-choice',
        question: 'Prices have ___ by ten percent this year.',
        options: ['raised', 'risen', 'rose', 'rising'],
        correctIndex: 1,
        explanation: {
          vi: '"rise" không cần tân ngữ; sau "have" dùng V3: risen. "raise" phải có tân ngữ.',
          en: '"rise" has no object; after "have" use the participle: risen. "raise" needs an object.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex06',
        type: 'fill-blank',
        sentence: 'Lack of sleep can ___ how well you study.',
        acceptedAnswers: ['affect'],
        hint: '(influence)',
        explanation: {
          vi: 'Cần động từ sau "can" nên dùng affect. "effect" là danh từ.',
          en: 'We need a verb after "can", so affect. "effect" is a noun.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is an OPINION?',
        options: [
          'The library opened in May.',
          'Over two thousand people visited it in the first week.',
          'It is clearly the best building in town.',
          'It is open until nine in the evening.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"clearly" và "the best" là dấu hiệu ý kiến; ba câu kia kiểm chứng được.',
          en: '"clearly" and "the best" signal an opinion; the others can be checked.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex08',
        type: 'true-false',
        statement: 'An advert claims that a drink "cures headaches". This means the drink definitely cures headaches.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"claim" = khẳng định nhưng chưa được chứng minh, có thể không đúng.',
          en: '"claim" = say something is true without proof; it may be false.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex09',
        type: 'arrange-words',
        translationVi: 'Giá thực phẩm được dự đoán sẽ tăng vào năm tới.',
        correctSentence: 'Food prices are expected to rise next year.',
        extraWords: ['raise', 'will'],
        explanation: {
          vi: 'Cấu trúc bị động "be expected to + V". Giá tự tăng nên dùng "rise".',
          en: 'Passive pattern "be expected to + verb". Prices go up by themselves: "rise".',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex10',
        type: 'listen-choose',
        audioText:
          'According to the report, the number of people cycling to work has risen sharply since the new cycle lanes were built.',
        question: 'What has happened?',
        options: [
          'Fewer people cycle to work.',
          'Many more people cycle to work.',
          'The cycle lanes have been closed.',
          'The report was wrong.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"has risen sharply" = đã tăng mạnh, nên nhiều người đạp xe đi làm hơn.',
          en: '"has risen sharply" = gone up a lot, so many more people cycle.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex11',
        type: 'fill-blank',
        sentence: 'The school wants to ___ the amount of plastic used in the canteen.',
        acceptedAnswers: ['reduce', 'cut'],
        hint: '(make less)',
        explanation: {
          vi: '"reduce + tân ngữ" = làm giảm cái gì đó.',
          en: '"reduce + object" = make something less.',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex12',
        type: 'speak-sentence',
        sentence: 'According to a recent survey, most people check the news every day.',
        translationVi: 'Theo một khảo sát gần đây, phần lớn mọi người xem tin tức mỗi ngày.',
        explanation: {
          vi: 'Nhấn SUR-vey (danh từ). Đọc rõ /st/ cuối "most" và /k/ cuối "check".',
          en: 'Stress SUR-vey (noun). Say the /st/ at the end of "most" and the /k/ in "check".',
        },
      },
      {
        id: 'l3-g-u3-vocab-ex13',
        type: 'speak-sentence',
        sentence: 'In my opinion, the article was interesting but a bit one-sided.',
        translationVi: 'Theo tôi, bài báo thú vị nhưng hơi phiến diện.',
        explanation: {
          vi: 'Nhấn o-PI-nion, IN-ter-est-ing. "one-sided" = chỉ nhìn một phía.',
          en: 'Stress o-PI-nion and IN-ter-est-ing. "one-sided" = showing only one view.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 4 — PHIM, SERIES, ÂM NHẠC
   * Từ: plot, gripping, predictable, spoiler, soundtrack, binge-watch,
   *     be into, not my cup of tea
   * Ngữ pháp: tính từ -ed (cảm xúc của người) vs -ing (tính chất của phim/sự việc),
   *           worth + V-ing, thành ngữ hay gặp trên phim ảnh/podcast
   * ======================================================================== */
  {
    id: 'l3-g-u4-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 12,
    title: { vi: 'Nói về phim, series và âm nhạc', en: 'Talking about films, series and music' },
    description: {
      vi: 'Từ vựng để kể nội dung phim, khen chê, và vài thành ngữ hay gặp trên phim ảnh, podcast.',
      en: 'Words to describe a story, praise or criticise it, and idioms you often hear in films and podcasts.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ để kể và đánh giá phim', en: 'Describing and judging a film' },
        body: {
          vi: '**plot** = cốt truyện\n**gripping** = cuốn hút, gay cấn\n**predictable** = dễ đoán (chê)\n**soundtrack** = nhạc phim\n**spoiler** = thông tin "tiết lộ" kết thúc\n**binge-watch** = xem liền một mạch nhiều tập\nKhen: "The plot is **gripping**." Chê: "The ending is a bit **predictable**."',
          en: '**plot** = the story\n**gripping** = very exciting\n**predictable** = easy to guess (negative)\n**soundtrack** = the music\n**spoiler** = information that gives away the ending\n**binge-watch** = watch many episodes in a row\nPraise: "The plot is **gripping**." Criticise: "The ending is a bit **predictable**."',
        },
        examples: [
          { en: 'The plot is simple, but the acting is excellent.', vi: 'Cốt truyện đơn giản nhưng diễn xuất rất xuất sắc.' },
          { en: 'We binge-watched the whole season in two days.', vi: 'Chúng tôi xem liền cả mùa phim trong hai ngày.' },
        ],
      },
      {
        title: { vi: 'Tính từ -ed hay -ing?', en: '-ed or -ing adjectives?' },
        body: {
          vi: '**-ing** tả **phim / sự việc** gây ra cảm xúc: The ending was **boring / surprising / confusing**.\n**-ed** tả **cảm xúc của người**: I was **bored / surprised / confused**.\nNgười Việt hay nói nhầm "I am boring" — câu này nghĩa là "tôi là người nhàm chán"!',
          en: '**-ing** describes the **film or thing** that causes a feeling: The ending was **boring / surprising / confusing**.\n**-ed** describes **how a person feels**: I was **bored / surprised / confused**.\nA common mistake is "I am boring", which means "I am a dull person"!',
        },
        examples: [
          { en: 'The film was boring, so I was bored.', vi: 'Bộ phim nhàm chán nên tôi thấy chán.' },
          { en: 'I was confused because the story was confusing.', vi: 'Tôi bị rối vì câu chuyện khó hiểu.' },
        ],
      },
      {
        title: { vi: 'Thành ngữ hay gặp', en: 'Common media idioms' },
        body: {
          vi: '**be into** sth = rất thích, mê (thân mật)\n**not my cup of tea** = không hợp gu tôi (cách chê lịch sự)\n**on the edge of my seat** = hồi hộp theo dõi\n**give it a go** = thử xem\n**it\'s worth watching** = đáng xem. Chú ý: **worth + V-ing**.',
          en: '**be into** something = like it a lot (informal)\n**not my cup of tea** = not something I like (a polite way to say it)\n**on the edge of my seat** = excited and nervous\n**give it a go** = try it\n**it\'s worth watching** = good enough to watch. Note: **worth + -ing**.',
        },
        examples: [
          { en: "Horror films aren't really my cup of tea.", vi: 'Phim kinh dị không hợp gu tôi lắm.' },
          { en: "It's long, but it's worth watching.", vi: 'Phim dài nhưng đáng xem.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w-plot',
        word: 'plot',
        ipa: '/plɒt/',
        partOfSpeech: 'noun',
        meaningVi: 'cốt truyện',
        definitionEn: 'The story of a film, book or series.',
        examples: [
          { en: 'The plot is simple, but the acting is excellent.', vi: 'Cốt truyện đơn giản nhưng diễn xuất rất xuất sắc.' },
          { en: 'Can you tell me the plot without any spoilers?', vi: 'Bạn kể cốt truyện mà không tiết lộ kết thúc được không?' },
        ],
      },
      {
        id: 'l3-g-w-gripping',
        word: 'gripping',
        ipa: '/ˈɡrɪp.ɪŋ/',
        partOfSpeech: 'adjective',
        meaningVi: 'cuốn hút, gay cấn',
        definitionEn: 'So exciting that you want to keep watching or reading.',
        examples: [
          { en: "It's a gripping crime series. I watched it all in two days.", vi: 'Đó là một series trinh thám rất cuốn. Tôi xem hết trong hai ngày.' },
          { en: 'The last episode was really gripping.', vi: 'Tập cuối thật sự gay cấn.' },
        ],
      },
      {
        id: 'l3-g-w-predictable',
        word: 'predictable',
        ipa: '/prɪˈdɪk.tə.bl̩/',
        partOfSpeech: 'adjective',
        meaningVi: 'dễ đoán',
        definitionEn: 'Happening in the way you expected, so not very interesting.',
        examples: [
          { en: 'The ending was quite predictable.', vi: 'Kết thúc khá dễ đoán.' },
          { en: 'I guessed the plot after ten minutes. So predictable!', vi: 'Tôi đoán ra cốt truyện sau mười phút. Dễ đoán quá!' },
        ],
      },
      {
        id: 'l3-g-w-spoiler',
        word: 'spoiler',
        ipa: '/ˈspɔɪ.lə/',
        partOfSpeech: 'noun',
        meaningVi: 'thông tin tiết lộ nội dung (đặc biệt là kết thúc)',
        definitionEn: 'Information that tells you what happens in a story before you see it.',
        examples: [
          { en: "No spoilers, please! I haven't seen the last episode.", vi: 'Đừng tiết lộ nhé! Tôi chưa xem tập cuối.' },
          { en: 'Warning: this review contains spoilers.', vi: 'Cảnh báo: bài review này có tiết lộ nội dung.' },
        ],
      },
      {
        id: 'l3-g-w-soundtrack',
        word: 'soundtrack',
        ipa: '/ˈsaʊnd.træk/',
        partOfSpeech: 'noun',
        meaningVi: 'nhạc phim',
        definitionEn: 'The music used in a film or series.',
        examples: [
          { en: 'I love the soundtrack. I listen to it at work.', vi: 'Tôi rất thích nhạc phim. Tôi nghe nó lúc làm việc.' },
          { en: 'The soundtrack was written by a young composer.', vi: 'Nhạc phim do một nhà soạn nhạc trẻ viết.' },
        ],
      },
      {
        id: 'l3-g-w-binge-watch',
        word: 'binge-watch',
        ipa: '/ˈbɪndʒ wɒtʃ/',
        partOfSpeech: 'verb',
        meaningVi: 'xem liền một mạch nhiều tập',
        definitionEn: 'To watch many episodes of a series one after another.',
        examples: [
          { en: 'We binge-watched the whole season at the weekend.', vi: 'Chúng tôi xem liền cả mùa phim vào cuối tuần.' },
          { en: 'I try not to binge-watch on work nights.', vi: 'Tôi cố không cày phim vào những tối phải đi làm hôm sau.' },
        ],
      },
      {
        id: 'l3-g-w-be-into',
        word: 'be into',
        ipa: '/bi ˈɪn.tuː/',
        partOfSpeech: 'phrase (informal)',
        meaningVi: 'rất thích, mê (cái gì)',
        definitionEn: 'To be very interested in something or to enjoy it a lot.',
        examples: [
          { en: "I'm really into Korean dramas at the moment.", vi: 'Dạo này tôi rất mê phim Hàn.' },
          { en: "My dad isn't into podcasts.", vi: 'Bố tôi không thích nghe podcast.' },
        ],
        usageNote: {
          vi: 'Sau "into" là danh từ hoặc V-ing: I\'m into **cooking**. Dùng trong văn nói, không dùng trong email trang trọng.',
          en: 'Follow it with a noun or -ing: I\'m into **cooking**. Use it in speech, not in formal emails.',
        },
      },
      {
        id: 'l3-g-w-cup-of-tea',
        word: 'not my cup of tea',
        ipa: '/nɒt maɪ ˌkʌp əv ˈtiː/',
        partOfSpeech: 'idiom',
        meaningVi: 'không hợp gu tôi',
        definitionEn: 'Something you do not really like (a polite way to say it).',
        examples: [
          { en: "Horror films aren't really my cup of tea.", vi: 'Phim kinh dị không hợp gu tôi lắm.' },
          { en: 'Jazz is not my cup of tea, but my sister loves it.', vi: 'Nhạc jazz không hợp gu tôi, nhưng chị tôi thì rất thích.' },
        ],
        usageNote: {
          vi: 'Thường dùng ở dạng phủ định. Lịch sự hơn nhiều so với "I hate it".',
          en: 'Usually used in the negative. Much more polite than "I hate it".',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u4-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa đúng', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'plot', right: 'the story of a film' },
          { left: 'soundtrack', right: 'the music in a film' },
          { left: 'spoiler', right: 'tells you the ending too early' },
          { left: 'binge-watch', right: 'watch many episodes in a row' },
          { left: 'predictable', right: 'easy to guess' },
        ],
        explanation: {
          vi: 'Năm từ cơ bản để nói về phim và series.',
          en: 'Five basic words for talking about films and series.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex02',
        type: 'multiple-choice',
        question: 'The film was so ___ that I watched it twice in one week.',
        options: ['predictable', 'gripping', 'bored', 'spoiler'],
        correctIndex: 1,
        explanation: {
          vi: 'Xem hai lần nghĩa là rất cuốn: gripping. "predictable" là lời chê.',
          en: 'Watching twice means it was exciting: gripping. "predictable" is negative.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex03',
        type: 'multiple-choice',
        question: 'I fell asleep in the cinema. The film was really ___.',
        options: ['bored', 'boring', 'bore', 'boredom'],
        correctIndex: 1,
        explanation: {
          vi: 'Tả bộ phim (gây ra cảm xúc) nên dùng đuôi -ing: boring.',
          en: 'We describe the film (the cause of the feeling), so use -ing: boring.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex04',
        type: 'fill-blank',
        sentence: "I didn't understand the ending. I was totally ___.",
        acceptedAnswers: ['confused'],
        hint: '(confuse)',
        explanation: {
          vi: 'Tả cảm xúc của người ("I was…") nên dùng đuôi -ed: confused.',
          en: 'We describe the person\'s feeling ("I was…"), so use -ed: confused.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex05',
        type: 'multiple-choice',
        question: 'Your friend asks, "Do you like horror films?" You don\'t. What is a natural, polite answer?',
        options: [
          "Horror films aren't really my cup of tea.",
          'Horror films are not my tea cup.',
          'I am not into horror films cup.',
          'Horror films is my cup of tea not.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Thành ngữ cố định "not my cup of tea", không đổi trật tự từ.',
          en: 'The idiom is fixed: "not my cup of tea". Don\'t change the word order.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex06',
        type: 'fill-blank',
        sentence: "I'm really ___ podcasts about science at the moment.",
        acceptedAnswers: ['into'],
        explanation: {
          vi: '"be into + danh từ" = rất thích (thân mật).',
          en: '"be into + noun" = like something a lot (informal).',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex07',
        type: 'fill-blank',
        sentence: "The series is long, but it's worth ___.",
        acceptedAnswers: ['watching'],
        hint: '(watch)',
        explanation: {
          vi: 'Sau "worth" luôn dùng V-ing: worth watching, worth reading.',
          en: '"worth" is always followed by -ing: worth watching, worth reading.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex08',
        type: 'arrange-words',
        translationVi: 'Chúng tôi đã xem liền cả mùa phim vào cuối tuần.',
        correctSentence: 'We binge-watched the whole season at the weekend.',
        extraWords: ['watching', 'in'],
        explanation: {
          vi: 'Quá khứ của binge-watch là binge-watched. Người Anh nói "at the weekend".',
          en: 'The past of binge-watch is binge-watched. British English says "at the weekend".',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex09',
        type: 'listen-choose',
        audioText: 'Honestly, I thought it was a bit predictable. I knew how it would end after twenty minutes.',
        question: 'What did the speaker think of the film?',
        options: ['It was easy to guess.', 'It was too long.', 'The music was bad.', 'It was frightening.'],
        correctIndex: 0,
        explanation: {
          vi: '"predictable" và "knew how it would end" đều có nghĩa là dễ đoán.',
          en: '"predictable" and "knew how it would end" both mean easy to guess.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex10',
        type: 'listen-choose',
        audioText: "I'm not gonna lie, I was on the edge of my seat for the whole last episode.",
        question: 'How did the speaker feel during the last episode?',
        options: ['Bored', 'Excited and nervous', 'Tired', 'Confused'],
        correctIndex: 1,
        explanation: {
          vi: '"on the edge of my seat" = hồi hộp vì phim hay. "gonna" = going to.',
          en: '"on the edge of my seat" = excited and tense. "gonna" = going to.',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex11',
        type: 'listen-type',
        audioText: 'The soundtrack is amazing, but the plot is a bit slow.',
        acceptedAnswers: ['The soundtrack is amazing, but the plot is a bit slow'],
        explanation: {
          vi: 'Một lời khen (soundtrack) và một lời chê nhẹ (plot) nối bằng "but".',
          en: 'One piece of praise (soundtrack) and one mild criticism (plot), joined by "but".',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex12',
        type: 'speak-sentence',
        sentence: "I'm really into this series because the plot is so gripping.",
        translationVi: 'Tôi rất mê series này vì cốt truyện cực kỳ cuốn hút.',
        explanation: {
          vi: 'Nối âm "into_this", "plot_is". Đọc rõ âm /ŋ/ cuối "gripping".',
          en: 'Link "into_this" and "plot_is". Say the final /ŋ/ in "gripping".',
        },
      },
      {
        id: 'l3-g-u4-vocab-ex13',
        type: 'speak-sentence',
        sentence: "It's worth watching, but it's not my cup of tea.",
        translationVi: 'Phim đáng xem, nhưng không hợp gu tôi.',
        explanation: {
          vi: 'Đọc rõ /θ/ cuối "worth" (đặt lưỡi giữa hai răng). "cup of" nối thành /kʌpəv/.',
          en: 'Say /θ/ at the end of "worth" (tongue between teeth). Link "cup of" as /kʌpəv/.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 5 — ĐỜI SỐNG: SỨC KHOẺ, TIỀN BẠC, CÁC MỐI QUAN HỆ
   * Từ: afford, budget, cut down on, save up, get on with, fall out, habit, update
   * Ngữ pháp: cách khuyên (should / If I were you / Why don't you / It might be a good idea)
   *           + kể chuyện quá khứ (quá khứ tiếp diễn, quá khứ đơn, quá khứ hoàn thành)
   * ======================================================================== */
  {
    id: 'l3-g-u5-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 12,
    title: { vi: 'Đời sống: sức khoẻ, tiền bạc, các mối quan hệ', en: 'Daily life: health, money and relationships' },
    description: {
      vi: 'Cụm động từ về chi tiêu, sức khoẻ, quan hệ và các cách khuyên ai đó một cách tự nhiên.',
      en: 'Phrasal verbs for money, health and relationships, and natural ways to give advice.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm động từ đời sống', en: 'Everyday phrasal verbs' },
        body: {
          vi: '**cut down on** = cắt giảm (cut down on sugar)\n**save up (for)** = để dành tiền\n**get on (well) with** = hợp, quan hệ tốt với ai\n**fall out (with)** = cãi nhau, giận nhau\nCụm 3 từ như **cut down on**, **get on with** KHÔNG tách ra: I get on well **with** my boss.',
          en: '**cut down on** = use or do less of\n**save up (for)** = keep money for something\n**get on (well) with** = have a good relationship with\n**fall out (with)** = argue and stop being friendly\nThree-word verbs like **cut down on** and **get on with** stay together: I get on well **with** my boss.',
        },
        examples: [
          { en: "I'm trying to cut down on sugar.", vi: 'Tôi đang cố ăn ít đường hơn.' },
          { en: "She's saving up for a trip to Japan.", vi: 'Cô ấy đang để dành tiền cho chuyến đi Nhật.' },
        ],
      },
      {
        title: { vi: 'Cách khuyên ai đó', en: 'Giving advice' },
        body: {
          vi: 'Từ mạnh đến nhẹ:\n**You should / ought to** + V\n**If I were you, I\'d** + V (luôn dùng **were**)\n**Why don\'t you** + V?\n**It might be a good idea to** + V\nLưu ý: **advice** là danh từ không đếm được (some advice, a piece of advice). **advise** là động từ.',
          en: 'From strong to soft:\n**You should / ought to** + verb\n**If I were you, I\'d** + verb (always **were**)\n**Why don\'t you** + verb?\n**It might be a good idea to** + verb\nNote: **advice** is an uncountable noun (some advice, a piece of advice). **advise** is the verb.',
        },
        examples: [
          { en: "If I were you, I'd talk to her first.", vi: 'Nếu tôi là bạn, tôi sẽ nói chuyện với cô ấy trước.' },
          { en: "Why don't you go to bed a bit earlier?", vi: 'Sao bạn không đi ngủ sớm hơn một chút?' },
        ],
      },
      {
        title: { vi: 'Kể chuyện ở quá khứ', en: 'Telling stories in the past' },
        body: {
          vi: '**Quá khứ tiếp diễn** = bối cảnh đang diễn ra: I **was cooking** dinner…\n**Quá khứ đơn** = sự việc chen ngang: …when the power **went** out.\n**Quá khứ hoàn thành** = việc xảy ra **trước** một mốc quá khứ: I realised I **had left** my phone at work.',
          en: '**Past continuous** = the background: I **was cooking** dinner…\n**Past simple** = the event that interrupts: …when the power **went** out.\n**Past perfect** = something that happened **earlier**: I realised I **had left** my phone at work.',
        },
        examples: [
          { en: 'I was cooking dinner when the power went out.', vi: 'Tôi đang nấu bữa tối thì mất điện.' },
          { en: 'When I got to the bus stop, the bus had already left.', vi: 'Khi tôi đến trạm thì xe buýt đã đi rồi.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w-afford',
        word: 'afford',
        ipa: '/əˈfɔːd/',
        partOfSpeech: 'verb',
        meaningVi: 'đủ tiền (để mua / làm gì)',
        definitionEn: 'To have enough money to pay for something.',
        examples: [
          { en: "We can't afford a new car this year.", vi: 'Năm nay chúng tôi không đủ tiền mua xe mới.' },
          { en: 'Can you afford to eat out every day?', vi: 'Bạn có đủ tiền ăn ngoài mỗi ngày không?' },
        ],
        usageNote: {
          vi: 'Thường đi với **can / can\'t**: can\'t afford + danh từ / to + V.',
          en: 'Usually with **can / can\'t**: can\'t afford + noun / to + verb.',
        },
      },
      {
        id: 'l3-g-w-budget',
        word: 'budget',
        ipa: '/ˈbʌdʒ.ɪt/',
        partOfSpeech: 'noun',
        meaningVi: 'ngân sách, khoản chi dự tính',
        definitionEn: 'A plan of how much money you can spend.',
        examples: [
          { en: 'My monthly budget for food is three million dong.', vi: 'Ngân sách ăn uống mỗi tháng của tôi là ba triệu đồng.' },
          { en: "We're on a tight budget, so we cook at home.", vi: 'Chúng tôi đang eo hẹp nên nấu ăn ở nhà.' },
        ],
        usageNote: {
          vi: '**on a tight budget** = chi tiêu eo hẹp. Âm cuối /t/ cần đọc rõ.',
          en: '**on a tight budget** = with little money to spend. Say the final /t/.',
        },
      },
      {
        id: 'l3-g-w-cut-down-on',
        word: 'cut down on',
        ipa: '/kʌt ˈdaʊn ɒn/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'cắt giảm',
        definitionEn: 'To use, eat or do less of something.',
        examples: [
          { en: "I'm trying to cut down on sugar.", vi: 'Tôi đang cố ăn ít đường hơn.' },
          { en: 'My doctor told me to cut down on coffee.', vi: 'Bác sĩ bảo tôi uống ít cà phê lại.' },
        ],
      },
      {
        id: 'l3-g-w-save-up',
        word: 'save up',
        ipa: '/seɪv ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'để dành tiền',
        definitionEn: 'To keep money over a period of time so you can buy something.',
        examples: [
          { en: "She's saving up for a trip to Japan.", vi: 'Cô ấy đang để dành tiền cho chuyến đi Nhật.' },
          { en: 'It took me a year to save up for this laptop.', vi: 'Tôi mất một năm để dành tiền mua chiếc laptop này.' },
        ],
      },
      {
        id: 'l3-g-w-get-on-with',
        word: 'get on with',
        ipa: '/ɡet ˈɒn wɪð/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'hợp với, có quan hệ tốt với (ai)',
        definitionEn: 'To have a friendly relationship with someone.',
        examples: [
          { en: 'I get on well with my sister.', vi: 'Tôi rất hợp với chị gái.' },
          { en: 'Do you get on with your neighbours?', vi: 'Bạn có hoà thuận với hàng xóm không?' },
        ],
        usageNote: {
          vi: 'Tiếng Anh-Anh. Người Mỹ hay nói **get along with**.',
          en: 'British English. Americans often say **get along with**.',
        },
      },
      {
        id: 'l3-g-w-fall-out',
        word: 'fall out',
        ipa: '/fɔːl ˈaʊt/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'cãi nhau, giận nhau',
        definitionEn: 'To argue with someone and stop being friendly.',
        examples: [
          { en: 'They fell out over money.', vi: 'Họ giận nhau vì chuyện tiền bạc.' },
          { en: "I fell out with my best friend last year, but we're fine now.", vi: 'Năm ngoái tôi giận bạn thân, nhưng giờ chúng tôi ổn rồi.' },
        ],
        usageNote: {
          vi: 'fall – **fell** – fallen. fall out **with** + người, **over** + chuyện gì.',
          en: 'fall – **fell** – fallen. fall out **with** a person, **over** something.',
        },
      },
      {
        id: 'l3-g-w-habit',
        word: 'habit',
        ipa: '/ˈhæb.ɪt/',
        partOfSpeech: 'noun',
        meaningVi: 'thói quen',
        definitionEn: 'Something you do often, usually without thinking about it.',
        examples: [
          { en: 'Checking my phone in bed is a bad habit.', vi: 'Xem điện thoại trên giường là một thói quen xấu.' },
          { en: 'Walking after dinner is a healthy habit.', vi: 'Đi bộ sau bữa tối là một thói quen lành mạnh.' },
        ],
        usageNote: {
          vi: '**get into** a habit = bắt đầu có thói quen; **break** a habit = bỏ thói quen.',
          en: '**get into** a habit = start it; **break** a habit = stop it.',
        },
      },
      {
        id: 'l3-g-w-update',
        word: 'update',
        ipa: '/ʌpˈdeɪt/',
        partOfSpeech: 'verb, noun',
        meaningVi: 'cập nhật; bản cập nhật',
        definitionEn: 'To add new information or install a newer version, for example of an app.',
        examples: [
          { en: 'You should update the app to fix the problem.', vi: 'Bạn nên cập nhật ứng dụng để sửa lỗi.' },
          { en: 'My laptop needs an update.', vi: 'Laptop của tôi cần cập nhật.' },
        ],
        usageNote: {
          vi: 'Động từ nhấn sau: up**DATE**. Danh từ nhấn đầu: **UP**date.',
          en: 'Verb: up**DATE**. Noun: **UP**date.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u5-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa đúng', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'afford', right: 'have enough money for' },
          { left: 'budget', right: 'a plan for spending money' },
          { left: 'habit', right: 'something you do often' },
          { left: 'fall out', right: 'argue and stop being friendly' },
          { left: 'save up', right: 'keep money to buy something later' },
        ],
        explanation: {
          vi: 'Năm từ đời sống hằng ngày về tiền bạc, thói quen và quan hệ.',
          en: 'Five everyday words about money, habits and relationships.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex02',
        type: 'multiple-choice',
        question: "I'd love a new phone, but I can't ___ it right now.",
        options: ['afford', 'budget', 'save', 'spend'],
        correctIndex: 0,
        explanation: {
          vi: '"can\'t afford" = không đủ tiền mua.',
          en: '"can\'t afford" = not have enough money for it.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex03',
        type: 'fill-blank',
        sentence: 'My doctor says I need to cut down ___ salt.',
        acceptedAnswers: ['on'],
        explanation: {
          vi: 'Cụm 3 từ "cut down on" + thứ cần giảm.',
          en: 'The three-word verb is "cut down on" + the thing you reduce.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Can you give me an advice?',
          'Can you give me some advice?',
          'Can you give me some advices?',
          'Can you advice me some?',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"advice" không đếm được: không có "an advice" hay "advices".',
          en: '"advice" is uncountable: no "an advice" and no "advices".',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex05',
        type: 'fill-blank',
        sentence: "If I ___ you, I'd talk to her before the party.",
        acceptedAnswers: ['were'],
        explanation: {
          vi: 'Cấu trúc khuyên cố định: "If I were you" (dùng were cho mọi ngôi).',
          en: 'The fixed advice pattern is "If I were you" (were for every person).',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex06',
        type: 'multiple-choice',
        question: 'Your friend is always tired. Which advice sounds the most natural and friendly?',
        options: [
          "Why don't you go to bed a bit earlier?",
          'You must sleep. Go.',
          "Why you don't sleep earlier?",
          'If I am you, I sleep more.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Why don\'t you + V?" là lời khuyên nhẹ nhàng, đúng trật tự câu hỏi.',
          en: '"Why don\'t you + verb?" is gentle advice with correct question order.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex07',
        type: 'fill-blank',
        sentence: 'I was cooking dinner when the power suddenly ___ out.',
        acceptedAnswers: ['went'],
        hint: '(go)',
        explanation: {
          vi: 'Sự việc chen ngang dùng quá khứ đơn: go → went.',
          en: 'The interrupting event uses the past simple: go → went.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex08',
        type: 'multiple-choice',
        question: 'When I got to the station, I realised I ___ my wallet at home.',
        options: ['left', 'had left', 'was leaving', 'have left'],
        correctIndex: 1,
        explanation: {
          vi: 'Để quên ví xảy ra TRƯỚC lúc đến ga → quá khứ hoàn thành: had left.',
          en: 'Leaving the wallet happened BEFORE arriving → past perfect: had left.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex09',
        type: 'arrange-words',
        translationVi: 'Tôi rất hợp với các đồng nghiệp mới.',
        correctSentence: 'I get on well with my new colleagues.',
        extraWords: ['by', 'to'],
        explanation: {
          vi: 'Cụm "get on well with + người" = hợp, quan hệ tốt.',
          en: 'The phrase is "get on well with + person".',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex10',
        type: 'listen-choose',
        audioText:
          "My sister and I had a big argument about money last month, and we didn't speak for weeks. We're fine now, though.",
        question: 'What happened between the speaker and her sister?',
        options: ['They saved up together.', 'They fell out.', 'They made a budget.', 'They moved house.'],
        correctIndex: 1,
        explanation: {
          vi: 'Cãi nhau rồi không nói chuyện nhiều tuần = fall out.',
          en: 'Arguing and not speaking for weeks = falling out.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex11',
        type: 'listen-type',
        audioText: 'You should update the app to fix the problem.',
        acceptedAnswers: ['You should update the app to fix the problem'],
        explanation: {
          vi: '"should + V" là lời khuyên. "update" động từ nhấn sau: up-DATE.',
          en: '"should + verb" gives advice. The verb "update" is stressed up-DATE.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex12',
        type: 'speak-sentence',
        sentence: "If I were you, I'd cut down on coffee in the evening.",
        translationVi: 'Nếu tôi là bạn, tôi sẽ uống ít cà phê vào buổi tối.',
        explanation: {
          vi: 'Nối âm "cut_down_on". Đọc rõ /d/ trong "I\'d".',
          en: 'Link "cut_down_on". Say the /d/ in "I\'d" clearly.',
        },
      },
      {
        id: 'l3-g-u5-vocab-ex13',
        type: 'speak-sentence',
        sentence: "She's saving up for a trip, so she's on a tight budget.",
        translationVi: 'Cô ấy đang để dành tiền cho một chuyến đi nên đang chi tiêu eo hẹp.',
        explanation: {
          vi: 'Đọc rõ /p/ cuối "up", "trip" và /t/ cuối "tight", "budget".',
          en: 'Say the final /p/ in "up", "trip" and /t/ in "tight", "budget".',
        },
      },
    ],
    miniTest: [],
  },
]
