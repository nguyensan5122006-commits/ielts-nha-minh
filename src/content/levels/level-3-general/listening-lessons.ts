/**
 * listening-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * BÀI NGHE (mode 'listening') — bài THỨ HAI của mỗi chặng
 * ----------------------------------------------------------------------------
 * Nghe tiếng Anh đời thật: cuộc họp, sân bay – khách sạn, bản tin radio, bạn bè
 * nói chuyện về phim, chương trình tư vấn. Giọng trộn Anh (gb), Mỹ (us), Úc (au).
 *
 * Danh sách bài:
 *   l3-g-u1-listen  Nghe một cuộc họp nhóm (lịch, ngân sách, ai đồng ý / phản đối)
 *   l3-g-u2-listen  Sự cố khi đi du lịch (thất lạc hành lý, phàn nàn khách sạn, đặt tour)
 *   l3-g-u3-listen  Bản tin địa phương (ý chính, số liệu, ai nói gì)
 *   l3-g-u4-listen  Nghe tiếng Anh tự nhiên: bạn bè nói về phim, podcast review phim
 *   l3-g-u5-listen  Lời khuyên và câu chuyện đời thường (radio tư vấn, giấc ngủ, kể chuyện)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2–3 thẻ chiến thuật nghe (song ngữ)
 *   - exercises     : 10 bài khởi động (nghe chọn, nghe chép, trắc nghiệm, 1 câu nói)
 *   - listeningTask : 3 đoạn nghe (segments), mỗi đoạn nghe lại riêng được;
 *                     8 câu hỏi kiểu đề thật, mỗi câu gắn segmentId của đoạn chứa đáp án
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Lưu ý cho người viết audio: số viết bằng chữ như người nói ("eight hundred"),
 * không dùng ký hiệu lạ (£, %, &) để máy đọc (TTS) không đọc sai.
 * Quy ước id: bài "l3-g-u<chặng>-listen", bài tập "...-ex<số>", đoạn "...-s<số>", câu hỏi "...-q<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level3GeneralListeningLessons: Lesson[] = [
  /* ==========================================================================
   * CHẶNG 1 — NGHE MỘT CUỘC HỌP NHÓM
   * Bối cảnh: nhóm của một tiệm bánh họp chuẩn bị khai trương cửa hàng mới.
   * Kỹ năng: nghe "biển chỉ đường" (moving on, to sum up), nghe ý thật sau "but",
   *          bắt thông tin bị người nói tự sửa lại.
   * Giọng: Helen (gb-female), Tom (au-male), Priya (us-female)
   * ======================================================================== */
  {
    id: 'l3-g-u1-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Nghe một cuộc họp nhóm', en: 'Following a team meeting' },
    description: {
      vi: 'Nghe cuộc họp chuẩn bị khai trương cửa hàng: nắm ngày, ngân sách, việc cần làm và ai đồng ý, ai phản đối.',
      en: 'Listen to a meeting about opening a new shop: catch dates, money, tasks, and who agrees or disagrees.',
    },
    teachingCards: [
      {
        title: { vi: 'Nghe "biển chỉ đường" trong cuộc họp', en: 'Listen for signposts in meetings' },
        body: {
          vi: 'Người chủ trì thường báo trước sắp nói gì:\n**First of all… / Moving on to… / The next thing is…** = chuyển sang ý mới\n**So, to sum up… / Let\'s agree that…** = kết luận, **đáp án hay nằm ở đây!**\nNghe được các cụm này, bạn biết câu hỏi tiếp theo sắp đến.',
          en: 'The chairperson usually tells you what is coming:\n**First of all… / Moving on to… / The next thing is…** = a new topic\n**So, to sum up… / Let\'s agree that…** = the decision, **answers often come here!**\nWhen you hear these phrases, you know the next question is coming.',
        },
        examples: [
          { en: "Right, moving on to the budget.", vi: 'Rồi, chuyển sang phần ngân sách.' },
          { en: 'So, to sum up, we open on Saturday.', vi: 'Vậy, tóm lại, chúng ta khai trương vào thứ Bảy.' },
        ],
      },
      {
        title: { vi: 'Ý thật nằm sau "but"', en: 'The real opinion comes after "but"' },
        body: {
          vi: 'Người bản xứ phản đối rất nhẹ nhàng: **"That\'s a good idea, but…"**, **"I see your point, but…"**. Đừng chọn đáp án chỉ vì nghe "good idea". **Hãy nghe phần sau "but"**. Tương tự, **"Actually…"** thường mở đầu một thông tin sửa lại.',
          en: 'People often disagree very gently: **"That\'s a good idea, but…"**, **"I see your point, but…"**. Don\'t choose an answer just because you heard "good idea". **Listen to what comes after "but"**. Similarly, **"Actually…"** often introduces a correction.',
        },
        examples: [
          { en: "It's a nice idea, but it's too expensive.", vi: 'Ý tưởng hay đấy, nhưng đắt quá. (= không đồng ý)' },
        ],
      },
      {
        title: { vi: 'Đáp án hay bị "sửa lại"', en: 'Watch out for corrections' },
        body: {
          vi: 'Trong hội thoại thật, người nói hay đổi ý: "The tenth… **oh no, sorry, the twelfth**." Đáp án là thông tin **cuối cùng**. Chú ý cặp số dễ nhầm: **thirTEEN** (nhấn sau) và **THIRty** (nhấn trước), fifTEEN / FIFty.',
          en: 'In real conversations, people change their minds: "The tenth… **oh no, sorry, the twelfth**." The answer is the **final** information. Watch number pairs: **thirTEEN** (stress at the end) and **THIRty** (stress at the start), fifTEEN / FIFty.',
        },
        examples: [
          { en: "It's on the thirteenth. No, sorry, the fifteenth.", vi: 'Vào ngày 13. À không, xin lỗi, ngày 15.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u1-listen-ex01',
        type: 'listen-choose',
        audioText: 'Right, moving on to the next point on the agenda: the opening party.',
        question: 'What is the speaker doing?',
        options: ['Ending the meeting', 'Starting a new topic', 'Asking for an opinion', 'Making a complaint'],
        correctIndex: 1,
        explanation: {
          vi: '"Moving on to…" báo hiệu chuyển sang chủ đề mới.',
          en: '"Moving on to…" signals a new topic.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex02',
        type: 'listen-choose',
        audioText: "It's a nice idea in theory, but I don't think the customers would actually use it.",
        question: 'Does the speaker support the idea?',
        options: ['Yes, completely', 'No, not really', "The speaker hasn't decided", 'The speaker wants more information'],
        correctIndex: 1,
        explanation: {
          vi: 'Ý thật nằm sau "but": khách sẽ không dùng, nên người nói không ủng hộ.',
          en: 'The real view comes after "but": customers won\'t use it, so no support.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex03',
        type: 'listen-choose',
        audioText: 'The deadline is the thirteenth. No, sorry, the fifteenth of May.',
        question: 'When is the deadline?',
        options: ['13 May', '15 May', '30 May', '5 May'],
        correctIndex: 1,
        explanation: {
          vi: 'Người nói sửa lại ("No, sorry…"). Đáp án là thông tin cuối: ngày 15.',
          en: 'The speaker corrects himself ("No, sorry…"). The final information wins: the 15th.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex04',
        type: 'listen-choose',
        audioText: "We've got about thirty people coming, not thirteen, so we'll need a bigger room.",
        question: 'How many people are coming?',
        options: ['13', '30', '33', '3'],
        correctIndex: 1,
        explanation: {
          vi: '"thirty" nhấn âm đầu: THIR-ty. "not thirteen" là thông tin bị loại.',
          en: '"thirty" is stressed at the start: THIR-ty. "not thirteen" is rejected.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex05',
        type: 'listen-type',
        audioText: 'So, to sum up, Mai will send the email by Thursday.',
        acceptedAnswers: ['So, to sum up, Mai will send the email by Thursday', 'So to sum up Mai will send the email by Thursday'],
        explanation: {
          vi: '"To sum up" mở đầu phần kết luận: ai làm gì, hạn khi nào.',
          en: '"To sum up" opens the conclusion: who does what, and by when.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex06',
        type: 'multiple-choice',
        question: 'Which phrase usually tells you the meeting is reaching a decision?',
        options: ['First of all…', 'By the way…', 'So, to sum up…', "Sorry I'm late."],
        correctIndex: 2,
        explanation: {
          vi: '"So, to sum up…" tóm tắt quyết định. Đáp án thường nằm ngay sau cụm này.',
          en: '"So, to sum up…" summarises the decision. Answers often follow it.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex07',
        type: 'multiple-choice',
        question: 'You hear: "That\'s true, but it\'s quite expensive." What will the speaker probably say next?',
        options: [
          'A reason to buy it immediately',
          'A cheaper idea',
          'A joke about the weather',
          'The time of the next meeting',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Người nói lo về chi phí, nên khả năng cao sẽ đề xuất phương án rẻ hơn.',
          en: 'The speaker is worried about cost, so a cheaper idea is likely next.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex08',
        type: 'listen-choose',
        audioText: "Actually, I've just checked, and the room's free on Wednesday afternoon instead.",
        question: 'When is the room free?',
        options: ['Wednesday morning', 'Wednesday afternoon', 'Thursday afternoon', "It isn't free"],
        correctIndex: 1,
        explanation: {
          vi: '"Actually…" mở đầu thông tin sửa lại: phòng trống chiều thứ Tư.',
          en: '"Actually…" introduces a correction: the room is free on Wednesday afternoon.',
        },
      },
      {
        id: 'l3-g-u1-listen-ex09',
        type: 'fill-blank',
        sentence: "Moving ___ to the next item, let's talk about the budget.",
        acceptedAnswers: ['on'],
        explanation: {
          vi: 'Cụm chuyển ý trong cuộc họp: "Moving on to…".',
          en: 'The meeting signpost is "Moving on to…".',
        },
      },
      {
        id: 'l3-g-u1-listen-ex10',
        type: 'speak-sentence',
        sentence: "Moving on to the next point, let's talk about the budget.",
        translationVi: 'Chuyển sang ý tiếp theo, chúng ta bàn về ngân sách nhé.',
        explanation: {
          vi: 'Nối âm "moving_on_to". Đọc rõ /t/ cuối "point", "budget".',
          en: 'Link "moving_on_to". Say the final /t/ in "point" and "budget".',
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–8. Listen to a small bakery team planning the opening of a new shop. Choose the correct answer, or write ONE WORD AND/OR A NUMBER for each gap.',
      strategyTip: {
        vi: 'Đọc câu hỏi trước và gạch chân từ khoá (date, why, budget). Ở đoạn 2, nhớ rằng ý thật nằm sau "but".',
        en: 'Read the questions first and underline key words (date, why, budget). In part 2, remember: the real opinion comes after "but".',
      },
      segments: [
        {
          id: 'l3-g-u1-listen-s1',
          lines: [
            {
              speaker: 'Helen',
              voice: 'gb-female',
              text: "Okay, everyone, thanks for coming. Let's get started, because I know you're all busy. First of all, the opening date for the new shop on River Street. As you know, we planned to open on the third of June.",
            },
            { speaker: 'Tom', voice: 'au-male', text: 'Is that still happening?' },
            {
              speaker: 'Helen',
              voice: 'gb-female',
              text: "I'm afraid not. The electrician can't finish the kitchen until the end of May, so we've moved the opening to the tenth of June. It's a Saturday, which is actually better for families.",
            },
            { speaker: 'Tom', voice: 'au-male', text: 'Makes sense. Saturdays are always our busiest day anyway.' },
            {
              speaker: 'Helen',
              voice: 'gb-female',
              text: "Exactly. Now, the second thing is money. We've got a budget of eight hundred pounds for advertising, and that has to cover everything, including the opening party.",
            },
          ],
        },
        {
          id: 'l3-g-u1-listen-s2',
          lines: [
            { speaker: 'Helen', voice: 'gb-female', text: 'So, how should we spend it? Any ideas?' },
            {
              speaker: 'Priya',
              voice: 'us-female',
              text: 'Well, I think we should put most of it into social media. We could pay for some short videos showing the bread being made. People love that kind of thing.',
            },
            {
              speaker: 'Tom',
              voice: 'au-male',
              text: "I see your point, Priya, but a lot of our regular customers are older. They don't really use social media. I'd rather print leaflets and put them in letterboxes around River Street.",
            },
            { speaker: 'Priya', voice: 'us-female', text: "That's fair. But leaflets often go straight in the bin, don't they?" },
            {
              speaker: 'Helen',
              voice: 'gb-female',
              text: "Why don't we do both? Let's spend five hundred on online videos and three hundred on leaflets. Does that sound reasonable?",
            },
            { speaker: 'Tom', voice: 'au-male', text: 'Yeah, I can live with that.' },
            { speaker: 'Priya', voice: 'us-female', text: 'Sounds good to me.' },
          ],
        },
        {
          id: 'l3-g-u1-listen-s3',
          lines: [
            { speaker: 'Tom', voice: 'au-male', text: 'Good meeting. Shorter than usual, too!' },
            { speaker: 'Priya', voice: 'us-female', text: 'Ha, I know. So, any plans for the weekend?' },
            {
              speaker: 'Tom',
              voice: 'au-male',
              text: "Not much. My brother's visiting from Perth, so I'll probably show him around the city. You?",
            },
            {
              speaker: 'Priya',
              voice: 'us-female',
              text: "I'm finally going to that cooking class I told you about. Oh, before I forget, who's contacting the video company?",
            },
            {
              speaker: 'Tom',
              voice: 'au-male',
              text: "Helen asked you, didn't she? She wants the details by Thursday, so she can sign everything on Friday.",
            },
            { speaker: 'Priya', voice: 'us-female', text: "Right, Thursday. I'll email them this afternoon, then." },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-g-u1-listen-q1',
          segmentId: 'l3-g-u1-listen-s1',
          number: 1,
          prompt: 'New opening date: the ___ of June',
          acceptedAnswers: ['10th', 'tenth', '10'],
          explanation: {
            vi: 'Kế hoạch cũ là ngày 3, nhưng đã dời sang ngày 10 tháng Sáu.',
            en: 'The old plan was the 3rd, but it moved to the 10th of June.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-listen-q2',
          segmentId: 'l3-g-u1-listen-s1',
          number: 2,
          prompt: 'Why has the opening date changed?',
          options: ['The shop is too small.', 'The kitchen work is not finished.', 'Saturday is too busy.', 'The manager will be away.'],
          correctIndex: 1,
          explanation: {
            vi: 'Thợ điện chưa làm xong bếp đến cuối tháng Năm.',
            en: "The electrician can't finish the kitchen until the end of May.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u1-listen-q3',
          segmentId: 'l3-g-u1-listen-s1',
          number: 3,
          prompt: 'Total advertising budget: ___ pounds',
          acceptedAnswers: ['800', 'eight hundred'],
          explanation: {
            vi: '"a budget of eight hundred pounds", bao gồm cả tiệc khai trương.',
            en: '"a budget of eight hundred pounds", including the opening party.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-listen-q4',
          segmentId: 'l3-g-u1-listen-s2',
          number: 4,
          prompt: 'What does Priya want to spend most of the money on?',
          options: ['Leaflets', 'A party', 'Online videos', 'A new sign'],
          correctIndex: 2,
          explanation: {
            vi: 'Priya muốn chi phần lớn cho mạng xã hội: video ngắn quay cảnh làm bánh.',
            en: 'Priya wants most of it on social media: short videos of bread being made.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-listen-q5',
          segmentId: 'l3-g-u1-listen-s2',
          number: 5,
          prompt: 'Why does Tom prefer leaflets?',
          options: [
            'They are cheaper than videos.',
            'Many regular customers are older.',
            'Priya asked him to print them.',
            'Social media is too slow.',
          ],
          correctIndex: 1,
          explanation: {
            vi: 'Ý thật sau "but": khách quen phần lớn lớn tuổi, ít dùng mạng xã hội.',
            en: 'After "but": many regular customers are older and don\'t use social media.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u1-listen-q6',
          segmentId: 'l3-g-u1-listen-s2',
          number: 6,
          prompt: 'Money for leaflets: ___ pounds',
          acceptedAnswers: ['300', 'three hundred'],
          explanation: {
            vi: 'Helen chia: năm trăm cho video, ba trăm cho tờ rơi.',
            en: 'Helen splits it: five hundred for videos, three hundred for leaflets.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u1-listen-q7',
          segmentId: 'l3-g-u1-listen-s3',
          number: 7,
          prompt: 'Priya must send the video company details to Helen by ___.',
          acceptedAnswers: ['Thursday'],
          explanation: {
            vi: 'Helen cần thông tin trước thứ Năm để ký hợp đồng vào thứ Sáu.',
            en: 'Helen needs the details by Thursday so she can sign on Friday.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-listen-q8',
          segmentId: 'l3-g-u1-listen-s3',
          number: 8,
          prompt: 'What is Tom doing at the weekend?',
          options: ['Going to a cooking class', 'Showing his brother around', 'Working at the new shop', 'Flying to Perth'],
          correctIndex: 1,
          explanation: {
            vi: 'Anh trai Tom từ Perth đến chơi; lớp nấu ăn là kế hoạch của Priya.',
            en: "Tom's brother is visiting from Perth; the cooking class is Priya's plan.",
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 2 — SỰ CỐ KHI ĐI DU LỊCH
   * Bối cảnh: Lan (người Việt) đi du lịch biển ở nước ngoài.
   *   Đoạn 1: quầy hành lý thất lạc ở sân bay   (nhân viên us-male, Lan gb-female)
   *   Đoạn 2: phàn nàn ở quầy lễ tân khách sạn  (lễ tân au-female)
   *   Đoạn 3: gọi điện đặt tour tham quan       (nhân viên au-male)
   * Kỹ năng: điền biểu mẫu, đoán trước loại thông tin, nghe số, nhận ra paraphrase.
   * ======================================================================== */
  {
    id: 'l3-g-u2-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Sự cố khi đi du lịch', en: 'Travel problems: airport and hotel' },
    description: {
      vi: 'Nghe khai báo hành lý thất lạc, phàn nàn ở khách sạn và đặt tour: điền thông tin và chọn đáp án đúng.',
      en: 'Listen to a lost-luggage report, a hotel complaint and a tour booking, and complete the notes.',
    },
    teachingCards: [
      {
        title: { vi: 'Điền biểu mẫu: đoán loại từ trước', en: 'Form completion: predict the answer type' },
        body: {
          vi: 'Trước khi nghe, nhìn chỗ trống và đoán: **số? tên? ngày? màu? tầng?** VD "Flight number: ___" → chờ nghe **số**; "Colour of bag: ___" → chờ nghe **màu**. Đoán trước giúp bạn **không bị lỡ** khi người nói nói nhanh.',
          en: 'Before you listen, look at each gap and predict: **a number? a name? a date? a colour? a floor?** "Flight number: ___" → wait for a **number**; "Colour of bag: ___" → wait for a **colour**. Predicting helps you **not miss it** when people speak fast.',
        },
        examples: [
          { en: 'Your room is four oh nine.', vi: 'Phòng của bạn là phòng 409. (Số phòng: ___ → chờ nghe một con số)' },
        ],
      },
      {
        title: { vi: 'Nghe số và giá tiền', en: 'Numbers and prices' },
        body: {
          vi: 'Số phòng, số chuyến bay thường đọc **từng chữ số**: 274 = "two seven four"; số 0 hay đọc là **"oh"**. Giá tiền: "forty-five dollars **fifty**" = 45.50. Giờ: "a **quarter to** eight" = 7:45, "a **quarter past** eight" = 8:15.',
          en: 'Room and flight numbers are often read **digit by digit**: 274 = "two seven four"; zero is often **"oh"**. Prices: "forty-five dollars **fifty**" = 45.50. Times: "a **quarter to** eight" = 7:45, "a **quarter past** eight" = 8:15.',
        },
        examples: [
          { en: "It's flight two seven four.", vi: 'Chuyến bay số 274.' },
          { en: 'We pick you up at a quarter to eight.', vi: 'Chúng tôi đón bạn lúc 7 giờ 45.' },
        ],
      },
      {
        title: { vi: 'Người nói ít khi lặp lại từ trong đề', en: 'Speakers rarely repeat the exact words' },
        body: {
          vi: 'Đề viết "**Problem with room**", người nói lại nói "**the air conditioning isn\'t working**". Đề viết "**free meal**", người nói nói "**breakfast is on us**". Hãy nghe **ý nghĩa**, không chỉ chờ đúng từ trong đề (gọi là **paraphrase**).',
          en: 'The question says "**problem with room**", but the speaker says "**the air conditioning isn\'t working**". The question says "**free meal**", the speaker says "**breakfast is on us**". Listen for **meaning**, not just the same words (**paraphrase**).',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u2-listen-ex01',
        type: 'listen-choose',
        audioText: "It's flight two seven four from Ho Chi Minh City.",
        question: 'What is the flight number?',
        options: ['247', '274', '724', '472'],
        correctIndex: 1,
        explanation: {
          vi: 'Số chuyến bay đọc từng chữ số: two – seven – four = 274.',
          en: 'Flight numbers are read digit by digit: two – seven – four = 274.',
        },
      },
      {
        id: 'l3-g-u2-listen-ex02',
        type: 'listen-choose',
        audioText: 'Your room is four oh nine, on the fourth floor.',
        question: 'What is the room number?',
        options: ['49', '409', '490', '4009'],
        correctIndex: 1,
        explanation: {
          vi: '"oh" ở đây là số 0: four – oh – nine = 409.',
          en: '"oh" here means zero: four – oh – nine = 409.',
        },
      },
      {
        id: 'l3-g-u2-listen-ex03',
        type: 'listen-choose',
        audioText: 'The tour costs forty-five dollars fifty per person.',
        question: 'How much is the tour?',
        options: ['$45.15', '$45.50', '$54.50', '$40.55'],
        correctIndex: 1,
        explanation: {
          vi: '"forty-five dollars fifty" = 45 đô 50 xu = 45.50.',
          en: '"forty-five dollars fifty" = 45 dollars and 50 cents = 45.50.',
        },
      },
      {
        id: 'l3-g-u2-listen-ex04',
        type: 'listen-choose',
        audioText: "We'll pick you up from the hotel at a quarter to eight.",
        question: 'What time is the pick-up?',
        options: ['7:15', '7:45', '8:15', '8:45'],
        correctIndex: 1,
        explanation: {
          vi: '"a quarter to eight" = kém 15 phút đến 8 giờ = 7:45.',
          en: '"a quarter to eight" = fifteen minutes before eight = 7:45.',
        },
      },
      {
        id: 'l3-g-u2-listen-ex05',
        type: 'listen-type',
        audioText: 'My suitcase is dark green with a broken wheel.',
        acceptedAnswers: ['My suitcase is dark green with a broken wheel'],
        explanation: {
          vi: 'Mô tả hành lý: màu + đặc điểm. Chú ý /n/ cuối "broken" và /l/ cuối "wheel".',
          en: 'Describe luggage by colour + detail. Notice final /n/ in "broken", /l/ in "wheel".',
        },
      },
      {
        id: 'l3-g-u2-listen-ex06',
        type: 'listen-choose',
        audioText: "I'm afraid the air conditioning in my room isn't working, and it's really hot.",
        question: 'What is the problem?',
        options: ['The room is too noisy.', 'The room is too cold.', 'The air conditioner is broken.', 'The room is dirty.'],
        correctIndex: 2,
        explanation: {
          vi: '"isn\'t working" được diễn đạt lại thành "is broken" (paraphrase).',
          en: '"isn\'t working" is paraphrased as "is broken".',
        },
      },
      {
        id: 'l3-g-u2-listen-ex07',
        type: 'multiple-choice',
        question: 'On a form you see "Date of arrival: ___". What kind of answer do you expect?',
        options: ['A colour', 'A day and month', "A person's name", 'A price'],
        correctIndex: 1,
        explanation: {
          vi: '"Date" = ngày tháng. Đoán trước loại thông tin giúp nghe trúng hơn.',
          en: '"Date" means a day and month. Predicting helps you catch it.',
        },
      },
      {
        id: 'l3-g-u2-listen-ex08',
        type: 'listen-choose',
        audioText: "The hotel's on Beach Road, number twenty-six, opposite the post office.",
        question: 'Where is the hotel?',
        options: ['26 Beach Road', '62 Beach Road', '26 Bridge Road', '16 Beach Road'],
        correctIndex: 0,
        explanation: {
          vi: '"twenty-six" = 26, tên đường là "Beach Road".',
          en: '"twenty-six" = 26, and the street is "Beach Road".',
        },
      },
      {
        id: 'l3-g-u2-listen-ex09',
        type: 'fill-blank',
        sentence: 'In British English, the number 0 in a phone or room number is often said as "___".',
        acceptedAnswers: ['oh', 'o'],
        explanation: {
          vi: 'Người Anh đọc 0 là "oh" (như chữ O) trong số phòng, số điện thoại.',
          en: 'British speakers say zero as "oh" in room and phone numbers.',
        },
      },
      {
        id: 'l3-g-u2-listen-ex10',
        type: 'speak-sentence',
        sentence: "My suitcase hasn't arrived. It's dark green with a broken wheel.",
        translationVi: 'Vali của tôi chưa ra. Nó màu xanh lá đậm, có một bánh xe bị hỏng.',
        explanation: {
          vi: 'Đọc rõ /t/ trong "hasn\'t", /d/ cuối "arrived", /k/ trong "dark".',
          en: 'Say the /t/ in "hasn\'t", the final /d/ in "arrived" and the /k/ in "dark".',
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–8. Listen to Lan solving problems on her holiday. Complete the notes with ONE WORD AND/OR A NUMBER, or choose the correct answer.',
      strategyTip: {
        vi: 'Trước mỗi đoạn, đoán loại thông tin cho từng chỗ trống (số, màu, tầng). Người nói thường diễn đạt khác đề, hãy nghe ý nghĩa.',
        en: 'Before each part, predict the type of answer for each gap (number, colour, floor). Speakers often paraphrase, so listen for meaning.',
      },
      segments: [
        {
          id: 'l3-g-u2-listen-s1',
          lines: [
            { speaker: 'Agent', voice: 'us-male', text: 'Hi there, how can I help?' },
            {
              speaker: 'Lan',
              voice: 'gb-female',
              text: "Hello. I've just arrived from Ho Chi Minh City, and my suitcase hasn't come out. I waited at the belt for almost an hour.",
            },
            {
              speaker: 'Agent',
              voice: 'us-male',
              text: "I'm sorry to hear that. Let me take some details. What was your flight number?",
            },
            { speaker: 'Lan', voice: 'gb-female', text: 'It was flight two seven four.' },
            { speaker: 'Agent', voice: 'us-male', text: 'Two seven four, okay. And can you describe the bag?' },
            {
              speaker: 'Lan',
              voice: 'gb-female',
              text: "It's a large suitcase, dark green, with a black handle. Oh, and one of the wheels is broken.",
            },
            { speaker: 'Agent', voice: 'us-male', text: 'Dark green, broken wheel. Got it. Is there anything valuable inside?' },
            { speaker: 'Lan', voice: 'gb-female', text: 'Not really. Mostly clothes, and some presents for my friends.' },
            {
              speaker: 'Agent',
              voice: 'us-male',
              text: 'Okay. Most bags turn up within forty-eight hours. Where should we deliver it?',
            },
            { speaker: 'Lan', voice: 'gb-female', text: "To the Seaview Hotel, on Beach Road. It's number twenty-six." },
          ],
        },
        {
          id: 'l3-g-u2-listen-s2',
          lines: [
            {
              speaker: 'Lan',
              voice: 'gb-female',
              text: "Good evening. I'm sorry to bother you, but I'm afraid there's a problem with my room. It's room four oh nine.",
            },
            { speaker: 'Receptionist', voice: 'au-female', text: 'Oh no. What seems to be the problem?' },
            {
              speaker: 'Lan',
              voice: 'gb-female',
              text: "Well, the air conditioning isn't working, and the room is really hot. Also, there's a lot of noise from the street. I couldn't sleep at all last night.",
            },
            {
              speaker: 'Receptionist',
              voice: 'au-female',
              text: "I'm so sorry about that. The street noise is a problem on that side of the building. Let me see. I can move you to a room at the back, on the sixth floor. It's much quieter, and the air conditioning was checked this morning.",
            },
            { speaker: 'Lan', voice: 'gb-female', text: 'That would be great, thank you.' },
            {
              speaker: 'Receptionist',
              voice: 'au-female',
              text: "And to apologise, breakfast is on us for the rest of your stay. Just give your room number in the restaurant.",
            },
          ],
        },
        {
          id: 'l3-g-u2-listen-s3',
          lines: [
            { speaker: 'Agent', voice: 'au-male', text: 'Good morning, Coastline Tours. How can I help you?' },
            {
              speaker: 'Lan',
              voice: 'gb-female',
              text: "Hi. I'd like to book a place on the day trip to the national park, please. Is there anything available on Friday?",
            },
            {
              speaker: 'Agent',
              voice: 'au-male',
              text: "Let me check. Yes, we've got a few seats left on Friday. The price is forty-five dollars fifty, and that includes lunch.",
            },
            { speaker: 'Lan', voice: 'gb-female', text: 'Great. And what time do you pick people up?' },
            {
              speaker: 'Agent',
              voice: 'au-male',
              text: 'We collect guests from their hotels at a quarter to eight. Please be in the lobby ten minutes early.',
            },
            { speaker: 'Lan', voice: 'gb-female', text: 'A quarter to eight. Fine. Should I bring anything?' },
            {
              speaker: 'Agent',
              voice: 'au-male',
              text: 'Just comfortable shoes and plenty of water. And sun cream. It gets very hot by the afternoon.',
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-listen-q1',
          segmentId: 'l3-g-u2-listen-s1',
          number: 1,
          prompt: 'Flight number: ___',
          acceptedAnswers: ['274'],
          explanation: {
            vi: 'Lan nói "flight two seven four", nhân viên nhắc lại để xác nhận.',
            en: 'Lan says "flight two seven four", and the agent repeats it.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-listen-q2',
          segmentId: 'l3-g-u2-listen-s1',
          number: 2,
          prompt: 'Colour of suitcase: dark ___',
          acceptedAnswers: ['green'],
          explanation: {
            vi: 'Vali màu xanh lá đậm (dark green); tay cầm màu đen là chi tiết gây nhiễu.',
            en: 'The suitcase is dark green; the black handle is a distractor.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-listen-q3',
          segmentId: 'l3-g-u2-listen-s1',
          number: 3,
          prompt: 'Deliver to: Seaview Hotel, ___ Beach Road',
          acceptedAnswers: ['26', 'twenty-six', 'twenty six'],
          explanation: {
            vi: '"It\'s number twenty-six" = số 26.',
            en: '"It\'s number twenty-six" = 26.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u2-listen-q4',
          segmentId: 'l3-g-u2-listen-s2',
          number: 4,
          prompt: 'What problems does Lan have with her room?',
          options: ['It is too hot and too noisy.', 'It is too small and too dark.', 'It is dirty and noisy.', 'It is cold and smells bad.'],
          correctIndex: 0,
          explanation: {
            vi: 'Điều hoà hỏng nên rất nóng, và tiếng ồn từ đường phố.',
            en: 'The air conditioning is broken, so it is hot, and there is street noise.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-listen-q5',
          segmentId: 'l3-g-u2-listen-s2',
          number: 5,
          prompt: 'New room: at the back, on the ___ floor',
          acceptedAnswers: ['sixth', '6th', '6'],
          explanation: {
            vi: 'Lễ tân chuyển Lan sang phòng phía sau, tầng sáu.',
            en: 'The receptionist moves Lan to a room at the back, on the sixth floor.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u2-listen-q6',
          segmentId: 'l3-g-u2-listen-s2',
          number: 6,
          prompt: 'What does the hotel offer to say sorry?',
          options: ['A full refund', 'Free breakfast', 'A free dinner', 'A late check-out'],
          correctIndex: 1,
          explanation: {
            vi: '"breakfast is on us" = khách sạn trả tiền bữa sáng, tức miễn phí.',
            en: '"breakfast is on us" means the hotel pays: free breakfast.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-listen-q7',
          segmentId: 'l3-g-u2-listen-s3',
          number: 7,
          prompt: 'Price of the day trip (including lunch): $___',
          acceptedAnswers: ['45.50', '45.5'],
          explanation: {
            vi: '"forty-five dollars fifty" = 45.50, đã gồm bữa trưa.',
            en: '"forty-five dollars fifty" = 45.50, lunch included.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u2-listen-q8',
          segmentId: 'l3-g-u2-listen-s3',
          number: 8,
          prompt: 'What does the agent tell Lan to bring?',
          options: ['A packed lunch', 'A warm jacket', 'Comfortable shoes and water', 'Her passport'],
          correctIndex: 2,
          explanation: {
            vi: 'Mang giày thoải mái, nhiều nước và kem chống nắng; bữa trưa đã có sẵn.',
            en: 'Comfortable shoes, water and sun cream; lunch is already included.',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 3 — BẢN TIN ĐỊA PHƯƠNG (không có tin chính trị)
   *   Đoạn 1: tuyến xe buýt đêm mới            (James, phát thanh viên gb-male)
   *   Đoạn 2: khảo sát giấc ngủ của học sinh   (phóng viên Kate, au-female)
   *   Đoạn 3: hội sách cuối tuần + thời tiết   (Daniel, us-male)
   * Kỹ năng: nắm ý chính ở câu đầu mỗi tin, nghe số liệu và xu hướng, ai nói gì.
   * ======================================================================== */
  {
    id: 'l3-g-u3-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Bản tin địa phương', en: 'A local news bulletin' },
    description: {
      vi: 'Nghe bản tin radio ngắn: nắm ý chính từng tin, số liệu và ai nói gì.',
      en: 'Listen to a short radio bulletin: get the main point of each story, the numbers and who said what.',
    },
    teachingCards: [
      {
        title: { vi: 'Câu đầu tiên = ý chính', en: 'The first sentence is the main point' },
        body: {
          vi: 'Bản tin thường nói **ý quan trọng nhất ngay câu đầu**: ai, cái gì, ở đâu, khi nào. Các câu sau thêm **chi tiết, số liệu, lời phỏng vấn**. Nếu chỉ nghe được một câu, hãy tập trung vào **câu mở đầu** của mỗi tin.',
          en: 'News stories usually give **the most important point in the first sentence**: who, what, where, when. Later sentences add **details, numbers and quotes**. If you only catch one sentence, make it **the first one** of each story.',
        },
        examples: [
          { en: 'A new night bus service will start next Monday.', vi: 'Một tuyến xe buýt đêm mới sẽ bắt đầu chạy từ thứ Hai tới.' },
        ],
      },
      {
        title: { vi: 'Nghe số liệu và xu hướng', en: 'Numbers and trends' },
        body: {
          vi: 'Tăng: **rise, go up, increase, double** (gấp đôi). Giảm: **fall, drop, go down, halve** (giảm một nửa). Mức độ: **slightly** (nhẹ), **sharply** (mạnh). **Nearly half** = gần một nửa (chưa tới 50%); **just over a third** = hơn một phần ba một chút.',
          en: 'Up: **rise, go up, increase, double**. Down: **fall, drop, go down, halve**. How much: **slightly** (a little), **sharply** (a lot). **Nearly half** = a bit less than 50%; **just over a third** = a bit more than one third.',
        },
        examples: [
          { en: 'Visitor numbers have doubled since last year.', vi: 'Số khách đã tăng gấp đôi so với năm ngoái.' },
          { en: 'Nearly half of the students sleep less than seven hours.', vi: 'Gần một nửa số học sinh ngủ ít hơn bảy tiếng.' },
        ],
      },
      {
        title: { vi: 'Ai nói gì?', en: 'Who said what?' },
        body: {
          vi: 'Tin thường trích lời: "**Speaking to us this morning, Doctor Lin said…**", "**according to the organisers**". Câu hỏi hay hỏi **ý kiến của một người cụ thể**. Hãy chú ý **tên và chức danh** ngay trước lời trích.',
          en: 'News often quotes people: "**Speaking to us this morning, Doctor Lin said…**", "**according to the organisers**". Questions often ask about **one person\'s view**, so listen for the **name and job** just before the quote.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u3-listen-ex01',
        type: 'listen-choose',
        audioText: 'The number of visitors to the museum has doubled since last year.',
        question: 'What happened?',
        options: ['Visitors went down by half.', 'There are twice as many visitors.', 'Visitor numbers stayed the same.', 'The museum closed.'],
        correctIndex: 1,
        explanation: {
          vi: '"doubled" = tăng gấp đôi.',
          en: '"doubled" = became twice as many.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex02',
        type: 'listen-choose',
        audioText: 'Nearly half of the students said they sleep less than seven hours a night.',
        question: 'How many students sleep less than seven hours?',
        options: ['Exactly 50%', 'A bit less than 50%', 'More than 50%', 'All of them'],
        correctIndex: 1,
        explanation: {
          vi: '"Nearly half" = gần một nửa, tức là chưa tới 50%.',
          en: '"Nearly half" = almost half, so a bit less than 50%.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex03',
        type: 'listen-choose',
        audioText: 'Ticket prices will rise slightly from next month.',
        question: 'What will happen to ticket prices?',
        options: ['They will go up a lot.', 'They will go up a little.', 'They will fall a little.', 'They will not change.'],
        correctIndex: 1,
        explanation: {
          vi: '"rise" = tăng, "slightly" = một chút.',
          en: '"rise" = go up, "slightly" = a little.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex04',
        type: 'listen-type',
        audioText: 'According to the organisers, the event was a great success.',
        acceptedAnswers: [
          'According to the organisers, the event was a great success',
          'According to the organizers, the event was a great success',
        ],
        explanation: {
          vi: '"According to the organisers" cho biết đây là ý của ban tổ chức.',
          en: '"According to the organisers" shows whose view this is.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex05',
        type: 'multiple-choice',
        question: 'Which word means "become half as big"?',
        options: ['double', 'halve', 'rise', 'increase'],
        correctIndex: 1,
        explanation: {
          vi: '"halve" (đọc /hɑːv/) = giảm còn một nửa. "double" = gấp đôi.',
          en: '"halve" (/hɑːv/) = become half. "double" = become twice as big.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex06',
        type: 'listen-choose',
        audioText: 'Speaking to us this morning, the head teacher, Mrs Hoa, said she was delighted with the results.',
        question: 'How does Mrs Hoa feel about the results?',
        options: ['Worried', 'Very pleased', 'Surprised and angry', 'Not sure'],
        correctIndex: 1,
        explanation: {
          vi: '"delighted" = rất vui, rất hài lòng.',
          en: '"delighted" = very pleased.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex07',
        type: 'fill-blank',
        sentence: 'Bus fares will go ___ by ten percent, so passengers will pay more.',
        acceptedAnswers: ['up'],
        explanation: {
          vi: '"pay more" cho biết giá tăng: go up.',
          en: '"pay more" tells us prices increase: go up.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex08',
        type: 'listen-choose',
        audioText:
          'Good evening. A new night bus service will start running between the city centre and the airport next Monday.',
        question: 'What is the main point of this news story?',
        options: ['The airport is closing at night.', 'A night bus service is starting.', 'Bus tickets are getting cheaper.', 'A new airport is opening.'],
        correctIndex: 1,
        explanation: {
          vi: 'Ý chính nằm ngay câu đầu: tuyến xe buýt đêm mới sắp chạy.',
          en: 'The main point is in the first sentence: a new night bus is starting.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex09',
        type: 'multiple-choice',
        question: 'In a news story, where is the most important information usually found?',
        options: ['In the first sentence', 'In the last sentence', 'In the weather report', 'Only in the interview'],
        correctIndex: 0,
        explanation: {
          vi: 'Tin tức đặt ý quan trọng nhất lên đầu, chi tiết theo sau.',
          en: 'News puts the key point first and details after.',
        },
      },
      {
        id: 'l3-g-u3-listen-ex10',
        type: 'speak-sentence',
        sentence: 'The number of cyclists has risen sharply this year.',
        translationVi: 'Số người đi xe đạp đã tăng mạnh trong năm nay.',
        explanation: {
          vi: 'Cụm âm cuối khó /sts/ trong "cyclists". "risen" đọc /ˈrɪz.ən/.',
          en: 'Say the hard final cluster /sts/ in "cyclists". "risen" is /ˈrɪz.ən/.',
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–8. Listen to a local radio news bulletin. Choose the correct answer, or write ONE WORD AND/OR A NUMBER for each gap.',
      strategyTip: {
        vi: 'Mỗi tin có ý chính ở câu đầu. Khi nghe số, ghi ngay bằng chữ số (30, 2000) để không quên.',
        en: 'Each story gives its main point first. When you hear a number, write it down as digits (30, 2000) straight away.',
      },
      segments: [
        {
          id: 'l3-g-u3-listen-s1',
          lines: [
            {
              speaker: 'James',
              voice: 'gb-male',
              text: "Good evening, and welcome to the six o'clock news. Our top story: a new night bus service will start running between the city centre and the airport next Monday. The buses will leave every thirty minutes, from eleven at night until five in the morning. A single ticket will cost three pounds, which is around half the price of a taxi. The bus company says the service is mainly for airport staff and travellers on late flights, but anyone can use it.",
            },
          ],
        },
        {
          id: 'l3-g-u3-listen-s2',
          lines: [
            {
              speaker: 'James',
              voice: 'gb-male',
              text: "Now, a new survey suggests that many teenagers in the region aren't getting enough sleep. Our reporter Kate Morgan has the details.",
            },
            {
              speaker: 'Kate',
              voice: 'au-female',
              text: 'Thanks, James. The survey asked around two thousand students aged fourteen to eighteen about their sleep habits. Nearly half said they sleep less than seven hours on school nights. Most of them blamed their phones. Around sixty percent admitted they check messages or watch videos after midnight at least once a week. Speaking to us this morning, Doctor Sarah Lin, a sleep specialist, said the results were not surprising, but she believes small changes can make a big difference. Her advice? Keep phones out of the bedroom, and try to go to bed at the same time every night, even at weekends.',
            },
          ],
        },
        {
          id: 'l3-g-u3-listen-s3',
          lines: [
            {
              speaker: 'Daniel',
              voice: 'us-male',
              text: "And finally, the Riverside Book Fair returns this weekend after a two-year break. More than a hundred stalls will sell new and second-hand books, and there will be free reading activities for children every morning. Entry is free, but the organisers are asking visitors to bring a book they no longer need, to donate to the town's school libraries. As for the weather, Saturday looks dry and sunny, but heavy rain is expected on Sunday afternoon. So if you're planning to go, Saturday is your best bet.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u3-listen-q1',
          segmentId: 'l3-g-u3-listen-s1',
          number: 1,
          prompt: 'The new night bus will run between',
          options: ['the city centre and the university', 'the city centre and the airport', 'the station and the beach', 'two hospitals'],
          correctIndex: 1,
          explanation: {
            vi: 'Câu đầu: "between the city centre and the airport".',
            en: 'First sentence: "between the city centre and the airport".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u3-listen-q2',
          segmentId: 'l3-g-u3-listen-s1',
          number: 2,
          prompt: 'The buses leave every ___ minutes.',
          acceptedAnswers: ['30', 'thirty'],
          explanation: {
            vi: '"every thirty minutes" = cứ 30 phút một chuyến.',
            en: '"every thirty minutes" = one bus each half hour.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u3-listen-q3',
          segmentId: 'l3-g-u3-listen-s1',
          number: 3,
          prompt: 'A single ticket costs ___ pounds.',
          acceptedAnswers: ['3', 'three'],
          explanation: {
            vi: 'Vé một chiều ba bảng, khoảng một nửa giá taxi.',
            en: 'A single ticket is three pounds, about half a taxi fare.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u3-listen-q4',
          segmentId: 'l3-g-u3-listen-s2',
          number: 4,
          prompt: 'Number of students in the survey: about ___',
          acceptedAnswers: ['2000', '2,000', 'two thousand'],
          explanation: {
            vi: '"around two thousand students" = khoảng 2000 học sinh.',
            en: '"around two thousand students".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u3-listen-q5',
          segmentId: 'l3-g-u3-listen-s2',
          number: 5,
          prompt: 'What did most students blame for their lack of sleep?',
          options: ['Homework', 'Their phones', 'Noise at home', 'Early classes'],
          correctIndex: 1,
          explanation: {
            vi: '"Most of them blamed their phones."',
            en: '"Most of them blamed their phones."',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u3-listen-q6',
          segmentId: 'l3-g-u3-listen-s2',
          number: 6,
          prompt: 'What is Doctor Lin\'s view of the results?',
          options: [
            'She is shocked by them.',
            'She thinks they are wrong.',
            'She is not surprised and thinks small changes can help.',
            'She thinks teenagers need less sleep.',
          ],
          correctIndex: 2,
          explanation: {
            vi: '"not surprising, but she believes small changes can make a big difference".',
            en: '"not surprising, but she believes small changes can make a big difference".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u3-listen-q7',
          segmentId: 'l3-g-u3-listen-s3',
          number: 7,
          prompt: 'What are visitors to the book fair asked to bring?',
          options: ['Money for the schools', 'A book to give away', 'Their own chair', 'Food for the children'],
          correctIndex: 1,
          explanation: {
            vi: 'Mang một cuốn sách không cần nữa để tặng thư viện trường.',
            en: 'Bring a book you no longer need, to donate to school libraries.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u3-listen-q8',
          segmentId: 'l3-g-u3-listen-s3',
          number: 8,
          prompt: 'Because of the weather, the best day to visit the fair is ___.',
          acceptedAnswers: ['Saturday'],
          explanation: {
            vi: 'Chiều Chủ nhật mưa to; "Saturday is your best bet" = thứ Bảy là lựa chọn tốt nhất.',
            en: 'Sunday afternoon will be rainy; "Saturday is your best bet".',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 4 — NGHE TIẾNG ANH TỰ NHIÊN: PHIM VÀ PODCAST
   *   Đoạn 1: hai bạn nói về series "Harbour Lights" (Jess us-female, Sam au-male)
   *   Đoạn 2: podcast "Screen Time" review phim "The Paper Kite" (host gb-female)
   *   Đoạn 3: chọn phim xem tối nay (Ben gb-male, Jess us-female)
   * (Tên phim, series, podcast đều là tên tự đặt, không phải tác phẩm thật.)
   * Kỹ năng: nối âm, dạng rút gọn khi nói (gonna, wanna, kinda), bỏ qua từ đệm.
   * ======================================================================== */
  {
    id: 'l3-g-u4-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Nghe tiếng Anh tự nhiên: phim và podcast', en: 'Natural speech: chatting about films and podcasts' },
    description: {
      vi: 'Làm quen với tốc độ nói tự nhiên: nối âm, từ đọc lướt, từ đệm, và cách người bản xứ nói về phim.',
      en: 'Get used to natural speed: linking, weak forms, fillers and how people really talk about films.',
    },
    teachingCards: [
      {
        title: { vi: 'Nối âm và từ đọc lướt', en: 'Linking and weak forms' },
        body: {
          vi: 'Khi nói nhanh, các từ **dính vào nhau**: "turn_it_off" nghe như /tɜːnɪtɒf/, "a lot_of" như /əlɒtəv/. Từ nhỏ đọc **rất nhẹ**: to → /tə/, and → /ən/, of → /əv/. Đừng cố nghe rõ từng từ, hãy **bắt các từ khoá được nhấn**.',
          en: 'In fast speech, words **join together**: "turn_it_off" sounds like /tɜːnɪtɒf/, "a lot_of" like /əlɒtəv/. Small words become **very light**: to → /tə/, and → /ən/, of → /əv/. Don\'t try to hear every word; **catch the stressed key words**.',
        },
        examples: [
          { en: 'Turn it off and let\'s watch something else.', vi: 'Tắt đi rồi mình xem cái khác nhé.' },
        ],
      },
      {
        title: { vi: 'Dạng rút gọn khi nói', en: 'Spoken short forms' },
        body: {
          vi: '**gonna** = going to\n**wanna** = want to\n**gotta** = have got to (phải)\n**kinda** = kind of (hơi, kiểu như)\nBạn **không cần nói** như vậy, nhưng **cần nghe hiểu**, vì phim, series và podcast dùng rất nhiều.',
          en: '**gonna** = going to\n**wanna** = want to\n**gotta** = have got to (must)\n**kinda** = kind of (a bit, sort of)\nYou **don\'t need to say** these, but you **do need to understand** them, because films, series and podcasts use them all the time.',
        },
        examples: [
          { en: "I'm gonna watch it tonight.", vi: 'Tối nay tôi sẽ xem nó. (gonna = going to)' },
          { en: 'The first episode was kinda slow.', vi: 'Tập đầu hơi chậm. (kinda = kind of)' },
        ],
      },
      {
        title: { vi: 'Từ đệm không mang nghĩa', en: 'Fillers carry no meaning' },
        body: {
          vi: '**you know, I mean, like, sort of, well, honestly** thường chỉ để "câu giờ" khi suy nghĩ. Hãy **bỏ qua** chúng và tìm **ý chính**: "It was, like, you know, really good" = It was really good.',
          en: '**you know, I mean, like, sort of, well, honestly** are often just "thinking time". **Ignore** them and look for the **main idea**: "It was, like, you know, really good" = It was really good.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u4-listen-ex01',
        type: 'listen-choose',
        audioText: "I'm gonna watch the last episode tonight.",
        question: 'What does the speaker mean?',
        options: ['I watched it last night.', 'I am going to watch it tonight.', "I want to watch it, but I can't.", 'I have to watch it now.'],
        correctIndex: 1,
        explanation: {
          vi: '"gonna" = going to, nói về kế hoạch tương lai.',
          en: '"gonna" = going to, for a future plan.',
        },
      },
      {
        id: 'l3-g-u4-listen-ex02',
        type: 'listen-choose',
        audioText: 'Do you wanna come round and watch a film later?',
        question: 'What is the speaker doing?',
        options: ['Inviting a friend', 'Complaining about a film', 'Asking for money', 'Saying goodbye'],
        correctIndex: 0,
        explanation: {
          vi: '"Do you wanna come round…?" = Bạn có muốn qua nhà mình không? Đây là lời mời.',
          en: '"Do you wanna come round…?" = Do you want to come to my place? An invitation.',
        },
      },
      {
        id: 'l3-g-u4-listen-ex03',
        type: 'listen-type',
        audioText: 'It was kind of slow at the start, but the ending was great.',
        acceptedAnswers: [
          'It was kind of slow at the start, but the ending was great',
          'It was kinda slow at the start, but the ending was great',
        ],
        explanation: {
          vi: '"kind of" đọc lướt gần như "kinda" = hơi, khá.',
          en: '"kind of" is often reduced to "kinda" = a bit, quite.',
        },
      },
      {
        id: 'l3-g-u4-listen-ex04',
        type: 'multiple-choice',
        question: '"I gotta go, my bus is coming." What does "gotta" mean?',
        options: ['have got to / have to', 'going to', 'want to', 'got a'],
        correctIndex: 0,
        explanation: {
          vi: '"gotta" = (have) got to = phải.',
          en: '"gotta" = (have) got to = must.',
        },
      },
      {
        id: 'l3-g-u4-listen-ex05',
        type: 'listen-choose',
        audioText: "Honestly, it was, like, you know, the best show I've seen all year.",
        question: 'What is the main message?',
        options: ["The speaker didn't like the show.", 'It was the best show this year.', "The speaker isn't sure.", 'The show is a year old.'],
        correctIndex: 1,
        explanation: {
          vi: 'Bỏ từ đệm (honestly, like, you know) còn: "the best show I\'ve seen all year".',
          en: 'Remove the fillers and you get: "the best show I\'ve seen all year".',
        },
      },
      {
        id: 'l3-g-u4-listen-ex06',
        type: 'listen-choose',
        audioText: 'I mean, the acting was brilliant, but the story was sort of all over the place.',
        question: 'What did the speaker think of the story?',
        options: ['It was clear and simple.', 'It was confusing and messy.', 'It was too short.', 'It was brilliant.'],
        correctIndex: 1,
        explanation: {
          vi: '"all over the place" = lộn xộn, rời rạc. "brilliant" là lời khen diễn xuất.',
          en: '"all over the place" = messy, disorganised. "brilliant" was about the acting.',
        },
      },
      {
        id: 'l3-g-u4-listen-ex07',
        type: 'multiple-choice',
        question: 'In fast speech, how does "a lot of people" usually sound?',
        options: [
          'a – lot – of – peo – ple (every word clear)',
          'a-lotta-people (joined, "of" very light)',
          'lot people (no "a" or "of")',
          'a-lot-OFF-people (strong "of")',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Từ nối với nhau và "of" đọc rất nhẹ /əv/ hoặc /ə/.',
          en: 'The words join and "of" becomes very light: /əv/ or /ə/.',
        },
      },
      {
        id: 'l3-g-u4-listen-ex08',
        type: 'fill-blank',
        sentence: 'In "I wanna see it again", "wanna" means "want ___".',
        acceptedAnswers: ['to'],
        explanation: {
          vi: '"wanna" = want to. Viết trang trọng phải dùng "want to".',
          en: '"wanna" = want to. In formal writing, always write "want to".',
        },
      },
      {
        id: 'l3-g-u4-listen-ex09',
        type: 'listen-type',
        audioText: 'We should give it a go this weekend.',
        acceptedAnswers: ['We should give it a go this weekend'],
        explanation: {
          vi: '"give it a go" = thử xem. Nghe nối âm "give_it_a".',
          en: '"give it a go" = try it. Notice the linking in "give_it_a".',
        },
      },
      {
        id: 'l3-g-u4-listen-ex10',
        type: 'speak-sentence',
        sentence: "Turn it off and let's watch something else.",
        translationVi: 'Tắt đi rồi mình xem cái khác nhé.',
        explanation: {
          vi: 'Nối âm "turn_it_off". Đọc lướt "and" thành /ən/.',
          en: 'Link "turn_it_off". Say "and" lightly as /ən/.',
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–8. Listen to friends and a podcast host talking about films and series. Choose the correct answer, or write ONE WORD AND/OR A NUMBER for each gap.',
      strategyTip: {
        vi: 'Bỏ qua từ đệm (like, I mean, you know). Nghe lần đầu ở tốc độ 1× để nắm ý, lần hai ở 0.75× để bắt chi tiết.',
        en: 'Ignore fillers (like, I mean, you know). Listen once at 1× for the main idea, then at 0.75× for details.',
      },
      segments: [
        {
          id: 'l3-g-u4-listen-s1',
          lines: [
            {
              speaker: 'Jess',
              voice: 'us-female',
              text: "So, have you started Harbour Lights yet? Everyone at work's talking about it.",
            },
            {
              speaker: 'Sam',
              voice: 'au-male',
              text: "Yeah, I'm on episode four. I wasn't sure at first, to be honest. The first episode was kinda slow.",
            },
            { speaker: 'Jess', voice: 'us-female', text: 'Right? I almost gave up. But it gets so much better.' },
            {
              speaker: 'Sam',
              voice: 'au-male',
              text: 'Totally. I mean, the end of episode three, I did not see that coming. I was on the edge of my seat.',
            },
            {
              speaker: 'Jess',
              voice: 'us-female',
              text: "Wait, don't say anything else! I'm only on episode two. No spoilers!",
            },
            {
              speaker: 'Sam',
              voice: 'au-male',
              text: "Okay, okay, my lips are sealed. But you've gotta keep watching. Seriously.",
            },
          ],
        },
        {
          id: 'l3-g-u4-listen-s2',
          lines: [
            {
              speaker: 'Host',
              voice: 'gb-female',
              text: "Hello and welcome back to Screen Time, the podcast where we talk about what's worth watching, and what isn't. This week, I finally saw The Paper Kite, the new family drama everyone's been recommending. And, well, I've got mixed feelings.",
            },
            {
              speaker: 'Host',
              voice: 'gb-female',
              text: "The good news first. The two young actors are absolutely brilliant, and the soundtrack is gorgeous. I've been listening to it all week. But the plot? Honestly, it's pretty predictable. About halfway through, I knew exactly how it was going to end. It's also about twenty minutes too long.",
            },
            {
              speaker: 'Host',
              voice: 'gb-female',
              text: "So, would I recommend it? For a relaxing Sunday afternoon with the kids, yes. But if you're looking for something gripping, it's probably not your cup of tea.",
            },
          ],
        },
        {
          id: 'l3-g-u4-listen-s3',
          lines: [
            { speaker: 'Ben', voice: 'gb-male', text: 'Right, what do you fancy watching tonight?' },
            {
              speaker: 'Jess',
              voice: 'us-female',
              text: "Hmm, I'm not really in the mood for anything heavy. Something funny, maybe?",
            },
            { speaker: 'Ben', voice: 'gb-male', text: "There's that new comedy about the two chefs. It's had great reviews." },
            {
              speaker: 'Jess',
              voice: 'us-female',
              text: "Oh, I've seen the trailer. It looks kinda silly, but in a good way. Let's give it a go.",
            },
            { speaker: 'Ben', voice: 'gb-male', text: "Brilliant. I'll make some popcorn. Can you grab the blanket?" },
            {
              speaker: 'Jess',
              voice: 'us-female',
              text: 'Sure. And no phones during the film, okay? You always end up scrolling.',
            },
            { speaker: 'Ben', voice: 'gb-male', text: 'Fair enough. Phones off.' },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u4-listen-q1',
          segmentId: 'l3-g-u4-listen-s1',
          number: 1,
          prompt: 'What did Sam think of the first episode?',
          options: ['It was too short.', 'It was a bit slow.', 'It was confusing.', 'It was the best one.'],
          correctIndex: 1,
          explanation: {
            vi: '"The first episode was kinda slow" = tập đầu hơi chậm.',
            en: '"The first episode was kinda slow" = a bit slow.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u4-listen-q2',
          segmentId: 'l3-g-u4-listen-s1',
          number: 2,
          prompt: 'Jess has only watched up to episode ___.',
          acceptedAnswers: ['2', 'two'],
          explanation: {
            vi: 'Jess nói "I\'m only on episode two". Sam đang xem tập bốn.',
            en: 'Jess says "I\'m only on episode two". Sam is on episode four.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-listen-q3',
          segmentId: 'l3-g-u4-listen-s1',
          number: 3,
          prompt: 'Why does Jess stop Sam from talking?',
          options: ["She doesn't like the series.", "She doesn't want to hear spoilers.", 'She has to go to work.', 'She is watching it now.'],
          correctIndex: 1,
          explanation: {
            vi: '"No spoilers!" vì Jess chưa xem đến đoạn Sam đang kể.',
            en: '"No spoilers!" because Jess hasn\'t reached that part yet.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-listen-q4',
          segmentId: 'l3-g-u4-listen-s2',
          number: 4,
          prompt: "What is the host's overall opinion of The Paper Kite?",
          options: ['She loved everything about it.', 'She has mixed feelings.', 'She hated it.', "She hasn't seen it yet."],
          correctIndex: 1,
          explanation: {
            vi: '"I\'ve got mixed feelings" = vừa thích vừa không thích.',
            en: '"I\'ve got mixed feelings" = she liked some parts but not others.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-listen-q5',
          segmentId: 'l3-g-u4-listen-s2',
          number: 5,
          prompt: 'Which two things does the host praise?',
          options: ['the acting and the music', 'the plot and the ending', 'the music and the length', 'the plot and the acting'],
          correctIndex: 0,
          explanation: {
            vi: 'Khen diễn viên nhí ("brilliant") và nhạc phim ("gorgeous"); chê cốt truyện và độ dài.',
            en: 'She praises the actors ("brilliant") and soundtrack ("gorgeous"); not the plot or length.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u4-listen-q6',
          segmentId: 'l3-g-u4-listen-s2',
          number: 6,
          prompt: 'The film is about twenty minutes too ___.',
          acceptedAnswers: ['long'],
          explanation: {
            vi: '"about twenty minutes too long" = dài hơn cần thiết khoảng 20 phút.',
            en: '"about twenty minutes too long".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-listen-q7',
          segmentId: 'l3-g-u4-listen-s3',
          number: 7,
          prompt: 'What kind of film does Jess want to watch tonight?',
          options: ['A serious drama', 'A comedy', 'A horror film', 'A documentary'],
          correctIndex: 1,
          explanation: {
            vi: '"not in the mood for anything heavy. Something funny" → phim hài.',
            en: '"not in the mood for anything heavy. Something funny" → a comedy.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u4-listen-q8',
          segmentId: 'l3-g-u4-listen-s3',
          number: 8,
          prompt: 'They agree to keep their ___ off during the film.',
          acceptedAnswers: ['phones', 'phone'],
          explanation: {
            vi: '"No phones during the film" … "Phones off."',
            en: '"No phones during the film" … "Phones off."',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 5 — LỜI KHUYÊN VÀ CÂU CHUYỆN ĐỜI THƯỜNG
   *   Đoạn 1: chương trình radio tư vấn tiền bạc (host Rachel gb-female, Kevin us-male)
   *   Đoạn 2: hai bạn nói về giấc ngủ và điện thoại (Mia au-female, Duc gb-male)
   *   Đoạn 3: ông kể chuyện đêm mất điện năm xưa (Grandad au-male)
   * Kỹ năng: nhận ra lời khuyên dù không có "should", theo dõi trình tự câu chuyện,
   *          quá khứ hoàn thành (had + V3) báo việc xảy ra trước.
   * ======================================================================== */
  {
    id: 'l3-g-u5-listen',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: 'Lời khuyên và câu chuyện đời thường', en: 'Everyday advice and stories' },
    description: {
      vi: 'Nghe chương trình tư vấn trên radio, bạn bè nói về giấc ngủ và một câu chuyện kể lại ở quá khứ.',
      en: 'Listen to a radio advice show, friends talking about sleep, and a story told in the past.',
    },
    teachingCards: [
      {
        title: { vi: 'Nhận ra lời khuyên', en: 'Recognising advice' },
        body: {
          vi: 'Lời khuyên không phải lúc nào cũng có "should". Hãy nghe:\n**Have you tried + V-ing…?**\n**Why don\'t you…?**\n**If I were you, I\'d…**\n**It might be worth + V-ing…**\n**What helped me was…**\nTất cả đều là **lời khuyên**.',
          en: 'Advice doesn\'t always contain "should". Listen for:\n**Have you tried + -ing…?**\n**Why don\'t you…?**\n**If I were you, I\'d…**\n**It might be worth + -ing…**\n**What helped me was…**\nThey are all **advice**.',
        },
        examples: [
          { en: 'Have you tried writing down everything you spend?', vi: 'Bạn đã thử ghi lại mọi khoản chi chưa?' },
        ],
      },
      {
        title: { vi: 'Theo dõi câu chuyện', en: 'Following a story' },
        body: {
          vi: 'Câu chuyện có **mốc thời gian**: **At first… / Then… / Suddenly… / In the end…** Quá khứ hoàn thành (**had + V3**) báo việc xảy ra **trước** đó: "When we got home, someone **had** already **fixed** it." Câu hỏi về thứ tự sự việc hay "bẫy" ở chỗ này.',
          en: 'Stories have **time markers**: **At first… / Then… / Suddenly… / In the end…** The past perfect (**had + past participle**) shows something happened **earlier**: "When we got home, someone **had** already **fixed** it." Questions about order often test this.',
        },
        examples: [
          { en: 'When I got to the cinema, the film had already started.', vi: 'Khi tôi đến rạp thì phim đã bắt đầu rồi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u5-listen-ex01',
        type: 'listen-choose',
        audioText: 'Have you tried writing down everything you spend for a month?',
        question: 'What is the speaker doing?',
        options: ['Giving advice', 'Telling a story', 'Complaining', 'Asking for money'],
        correctIndex: 0,
        explanation: {
          vi: '"Have you tried + V-ing…?" là một cách khuyên nhẹ nhàng.',
          en: '"Have you tried + -ing…?" is a gentle way to give advice.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex02',
        type: 'listen-choose',
        audioText: "If I were you, I'd talk to him before it gets worse.",
        question: 'What does the speaker suggest?',
        options: ['Waiting longer', 'Talking to him soon', 'Forgetting about it', 'Writing him a letter'],
        correctIndex: 1,
        explanation: {
          vi: '"If I were you, I\'d talk to him" = khuyên nói chuyện với anh ấy sớm.',
          en: '"If I were you, I\'d talk to him" = advice to talk to him soon.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex03',
        type: 'listen-choose',
        audioText: 'When I got to the cinema, the film had already started.',
        question: 'Which happened first?',
        options: ['The speaker arrived.', 'The film started.', 'Both at the same time.', 'The film ended.'],
        correctIndex: 1,
        explanation: {
          vi: '"had already started" (quá khứ hoàn thành) xảy ra trước "got to".',
          en: '"had already started" (past perfect) happened before "got to".',
        },
      },
      {
        id: 'l3-g-u5-listen-ex04',
        type: 'listen-choose',
        audioText: 'It might be worth turning your phone off an hour before bed.',
        question: 'The speaker thinks you should…',
        options: ['buy a new phone', 'stop using your phone before sleeping', 'go to bed an hour later', 'sleep with your phone'],
        correctIndex: 1,
        explanation: {
          vi: '"It might be worth + V-ing" = có lẽ nên làm gì: tắt điện thoại trước giờ ngủ.',
          en: '"It might be worth + -ing" = advice: turn the phone off before bed.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex05',
        type: 'listen-type',
        audioText: 'In the end, we had a great time.',
        acceptedAnswers: ['In the end, we had a great time', 'In the end we had a great time'],
        explanation: {
          vi: '"In the end" = cuối cùng, sau tất cả mọi chuyện.',
          en: '"In the end" = finally, after everything happened.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex06',
        type: 'multiple-choice',
        question: 'Which of these is NOT advice?',
        options: [
          "Why don't you take a break?",
          'Have you tried drinking more water?',
          'I took a break yesterday.',
          'It might be worth seeing a doctor.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"I took a break yesterday" chỉ kể lại việc đã làm, không khuyên ai.',
          en: '"I took a break yesterday" just reports a past action; it isn\'t advice.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex07',
        type: 'fill-blank',
        sentence: 'Have you tried ___ for a walk after dinner?',
        acceptedAnswers: ['going'],
        hint: '(go)',
        explanation: {
          vi: 'Sau "Have you tried" dùng V-ing.',
          en: '"Have you tried" is followed by -ing.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex08',
        type: 'listen-choose',
        audioText: 'We were having dinner when suddenly all the lights went out.',
        question: 'What happened during dinner?',
        options: ['They finished dinner.', 'The power went off.', 'Someone arrived.', 'They turned on the lights.'],
        correctIndex: 1,
        explanation: {
          vi: '"the lights went out" = đèn tắt, tức là mất điện.',
          en: '"the lights went out" = the power went off.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex09',
        type: 'multiple-choice',
        question: '"At first, I hated running. ___, I started to enjoy it." Choose the best word.',
        options: ['Suddenly', 'Eventually', 'Before', 'Then again'],
        correctIndex: 1,
        explanation: {
          vi: '"Eventually" = sau một thời gian dài, cuối cùng thì…',
          en: '"Eventually" = after a long time, finally.',
        },
      },
      {
        id: 'l3-g-u5-listen-ex10',
        type: 'speak-sentence',
        sentence: 'Have you tried turning your phone off before bed?',
        translationVi: 'Bạn đã thử tắt điện thoại trước khi đi ngủ chưa?',
        explanation: {
          vi: 'Câu hỏi Yes/No: lên giọng ở cuối. Đọc rõ /d/ cuối "tried".',
          en: 'Yes/No question: rise at the end. Say the final /d/ in "tried".',
        },
      },
    ],
    listeningTask: {
      instructions:
        'Questions 1–8. Listen to a radio advice show, two friends, and a short story. Choose the correct answer, or write ONE WORD AND/OR A NUMBER for each gap.',
      strategyTip: {
        vi: 'Ở đoạn 1 và 2, đánh dấu mỗi lần nghe một lời khuyên (Have you tried…, What helped me…). Ở đoạn 3, ghi các mốc At first / Then / In the end.',
        en: 'In parts 1 and 2, note each piece of advice you hear (Have you tried…, What helped me…). In part 3, note the time markers At first / Then / In the end.',
      },
      segments: [
        {
          id: 'l3-g-u5-listen-s1',
          lines: [
            {
              speaker: 'Rachel',
              voice: 'gb-female',
              text: "You're listening to Money Matters. Our next caller is Kevin. Hi, Kevin, what's your question?",
            },
            {
              speaker: 'Kevin',
              voice: 'us-male',
              text: "Hi, Rachel. So, I started my first full-time job about a year ago, and I earn a decent salary, but somehow I never have any money left at the end of the month. I want to save up for a trip to Japan next year, but it just isn't happening.",
            },
            {
              speaker: 'Rachel',
              voice: 'gb-female',
              text: "That's really common, Kevin, don't worry. Can I ask, do you have a budget?",
            },
            { speaker: 'Kevin', voice: 'us-male', text: 'Not really. I kind of just spend.' },
            {
              speaker: 'Rachel',
              voice: 'gb-female',
              text: 'Okay, well, that is the first step. Have you tried writing down everything you spend for one month? Most people are shocked. Small things, like coffee and food deliveries, add up fast.',
            },
            { speaker: 'Kevin', voice: 'us-male', text: 'Yeah, I do order a lot of food.' },
            {
              speaker: 'Rachel',
              voice: 'gb-female',
              text: "Then here's my second piece of advice. On payday, move ten percent of your salary into a separate savings account straight away, before you spend anything. If you can't see it, you won't spend it.",
            },
          ],
        },
        {
          id: 'l3-g-u5-listen-s2',
          lines: [
            { speaker: 'Mia', voice: 'au-female', text: 'You look exhausted, Duc. Are you okay?' },
            {
              speaker: 'Duc',
              voice: 'gb-male',
              text: "Yeah, just tired. I've been going to bed really late, like two in the morning, and then I've got to be up at seven.",
            },
            { speaker: 'Mia', voice: 'au-female', text: 'Two in the morning? What are you doing until then?' },
            {
              speaker: 'Duc',
              voice: 'gb-male',
              text: 'Nothing important, honestly. I just watch videos on my phone in bed and lose track of time.',
            },
            {
              speaker: 'Mia',
              voice: 'au-female',
              text: "I used to do exactly the same. What helped me was charging my phone in the kitchen instead of the bedroom. I bought a cheap alarm clock, so I didn't need my phone to wake up.",
            },
            { speaker: 'Duc', voice: 'gb-male', text: "Hmm. That's actually a good idea. Did it work straight away?" },
            {
              speaker: 'Mia',
              voice: 'au-female',
              text: 'Not really. The first week was hard, but after about a month, I was falling asleep before midnight.',
            },
          ],
        },
        {
          id: 'l3-g-u5-listen-s3',
          lines: [
            {
              speaker: 'Grandad',
              voice: 'au-male',
              text: 'Let me tell you about the night of the big storm. It was about thirty years ago. Your grandmother and I were having dinner when suddenly all the lights went out. The whole street was completely dark. At first, we were a bit scared, to be honest.',
            },
            {
              speaker: 'Grandad',
              voice: 'au-male',
              text: "Then someone knocked on the door. It was our neighbour, Mrs Hanh, holding a candle. She had already checked on the old man next door, and she wanted to know if we were all right. In the end, half the street came to our house. We cooked rice on a little gas stove, someone brought a guitar, and we sang until the morning.",
            },
            {
              speaker: 'Grandad',
              voice: 'au-male',
              text: "When the power came back the next day, I was almost disappointed. That's the night I realised how much good neighbours matter.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u5-listen-q1',
          segmentId: 'l3-g-u5-listen-s1',
          number: 1,
          prompt: "What is Kevin's problem?",
          options: ['He has lost his job.', "He can't save any money.", 'His salary is too low.', 'He spent too much in Japan.'],
          correctIndex: 1,
          explanation: {
            vi: 'Lương khá ("a decent salary") nhưng cuối tháng không còn tiền để dành.',
            en: 'He earns "a decent salary" but has nothing left to save.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-listen-q2',
          segmentId: 'l3-g-u5-listen-s1',
          number: 2,
          prompt: 'What is the first thing Rachel suggests?',
          options: [
            'Getting a second job',
            'Writing down all his spending for a month',
            'Stopping all food deliveries',
            'Asking his parents for help',
          ],
          correctIndex: 1,
          explanation: {
            vi: '"Have you tried writing down everything you spend for one month?"',
            en: '"Have you tried writing down everything you spend for one month?"',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u5-listen-q3',
          segmentId: 'l3-g-u5-listen-s1',
          number: 3,
          prompt: 'On payday, move ___ percent of your salary into savings.',
          acceptedAnswers: ['10', 'ten'],
          explanation: {
            vi: '"move ten percent of your salary into a separate savings account".',
            en: '"move ten percent of your salary into a separate savings account".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u5-listen-q4',
          segmentId: 'l3-g-u5-listen-s2',
          number: 4,
          prompt: 'Duc has been going to bed at about ___ in the morning.',
          acceptedAnswers: ['2', 'two'],
          explanation: {
            vi: '"like two in the morning" = khoảng 2 giờ sáng. 7 giờ là giờ Duc phải dậy.',
            en: '"like two in the morning". Seven is when he has to get up.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-listen-q5',
          segmentId: 'l3-g-u5-listen-s2',
          number: 5,
          prompt: 'Where does Mia charge her phone now?',
          options: ['In the bedroom', 'In the kitchen', 'At work', 'In the car'],
          correctIndex: 1,
          explanation: {
            vi: '"charging my phone in the kitchen instead of the bedroom".',
            en: '"charging my phone in the kitchen instead of the bedroom".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-listen-q6',
          segmentId: 'l3-g-u5-listen-s2',
          number: 6,
          prompt: "How long did it take before Mia's new habit really worked?",
          options: ['One night', 'One week', 'About a month', 'A year'],
          correctIndex: 2,
          explanation: {
            vi: 'Tuần đầu rất khó; "after about a month" mới ngủ được trước nửa đêm.',
            en: 'The first week was hard; it worked "after about a month".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-listen-q7',
          segmentId: 'l3-g-u5-listen-s3',
          number: 7,
          prompt: "Before Mrs Hanh came to the speaker's house, she had…",
          options: ['cooked rice for everyone', 'checked on an old neighbour', 'fixed the electricity', 'brought a guitar'],
          correctIndex: 1,
          explanation: {
            vi: '"She had already checked on the old man next door": quá khứ hoàn thành = xảy ra trước.',
            en: '"She had already checked on the old man next door": past perfect = earlier.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-listen-q8',
          segmentId: 'l3-g-u5-listen-s3',
          number: 8,
          prompt: 'How did the speaker feel when the power came back?',
          options: ['Very relieved', 'Almost disappointed', 'Angry', 'Frightened'],
          correctIndex: 1,
          explanation: {
            vi: '"I was almost disappointed": ông gần như tiếc vì đêm đó rất vui.',
            en: '"I was almost disappointed", because the night had been so special.',
          },
        },
      ],
    },
    miniTest: [],
  },
]
