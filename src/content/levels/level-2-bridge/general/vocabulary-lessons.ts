/**
 * vocabulary-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "CẦU NỐI" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK TỔNG QUÁT (general)
 * NHÁNH TỪ VỰNG + NGỮ PHÁP (mode 'practice', kiểu Duolingo: thẻ dạy → bài tập)
 *
 * Track "Tiếng Anh tổng quát" = học để DÙNG được tiếng Anh, không áp lực thi cử.
 * Mỗi chặng (unit) mở đầu bằng 1 bài từ vựng này, sau đó là nghe – đọc – nói – viết.
 *
 * File này chứa 4 bài (mỗi chặng 1 bài):
 *   1. l2b-g-01-vocab : Du lịch — sân bay, khách sạn, hỏi đường; câu nhờ vả lịch sự (Could you / I'd like)
 *   2. l2b-g-02-vocab : Công việc — phòng ban, lịch làm việc, hạn chót; giới từ at / on / by; sắp xếp lịch họp
 *   3. l2b-g-03-vocab : Trường học — môn học, bài tập, dự án; hiện tại hoàn thành với already / yet / just
 *   4. l2b-g-04-vocab : Phim, nhạc, tin tức — thể loại phim, tính từ -ed / -ing, cách giới thiệu (recommend)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ dạy ngắn (song ngữ), có ví dụ
 *   - words         : 7 từ mới (giới hạn của level 2 là ≤ 7 từ/bài)
 *   - exercises     : 12 bài tập, gần như toàn bộ là dạng "tự nhớ / tự chọn" (retrieval),
 *                     luôn có ít nhất 1 bài nói (speak-sentence)
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l2b-g-<chặng>-vocab", bài tập "...-ex<số>", từ "l2b-g-w-<từ>".
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralVocabularyLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — DU LỊCH: SÂN BAY, KHÁCH SẠN, HỎI ĐƯỜNG
   * Từ mới: check in, boarding pass, luggage, gate, delayed, reception, opposite
   * Ngữ pháp: câu nhờ vả lịch sự (Could you...? / Could I have...? / I'd like...)
   *           và câu chỉ đường (go straight on, turn left...)
   * ======================================================================== */
  {
    id: 'l2b-g-01-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 10,
    title: { vi: 'Du lịch: sân bay, khách sạn và hỏi đường', en: 'Travel: airports, hotels and directions' },
    description: {
      vi: 'Học từ cần dùng ở sân bay, khách sạn và cách nhờ giúp đỡ, hỏi đường thật lịch sự.',
      en: 'Learn words for airports and hotels, and how to ask for help and directions politely.',
    },
    teachingCards: [
      {
        title: { vi: 'Ở sân bay và khách sạn', en: 'At the airport and the hotel' },
        body: {
          vi: "Thứ tự quen thuộc khi đi máy bay:\n**check in** (làm thủ tục) → nhận **boarding pass** (thẻ lên máy bay) → đến **gate** (cổng ra máy bay).\nMáy bay trễ giờ = **delayed**.\nĐến khách sạn: ra **reception** (quầy lễ tân) để **check in**.\nLưu ý: **luggage** (hành lý) **không thêm -s**: nói 'two bags', không nói 'two luggages'.",
          en: "The usual order at the airport:\n**check in** → get your **boarding pass** → go to the **gate**.\nIf the plane is late, it is **delayed**.\nAt a hotel, go to **reception** to **check in**.\nNote: **luggage** has **no -s**. Say 'two bags', not 'two luggages'.",
        },
        examples: [
          { en: 'Where can I check in for my flight?', vi: 'Tôi làm thủ tục cho chuyến bay ở đâu ạ?' },
          { en: 'Our flight is delayed by one hour.', vi: 'Chuyến bay của chúng tôi bị trễ một tiếng.' },
        ],
      },
      {
        title: { vi: 'Nhờ giúp đỡ thật lịch sự', en: 'Asking politely' },
        body: {
          vi: "Muốn xin một thứ: **I'd like** + danh từ / **Could I have** ...?\nMuốn nhờ ai làm gì: **Could you** + động từ ... **please**?\nMở lời: **Excuse me, ...** (xin lỗi, cho hỏi...).\nTránh nói 'I want...' hay 'Give me...' với người lạ — nghe khá cộc.",
          en: "To ask for something: **I'd like** + noun / **Could I have** ...?\nTo ask someone to do something: **Could you** + verb ... **please**?\nStart with **Excuse me, ...**\nAvoid 'I want...' or 'Give me...' with strangers — it can sound rude.",
        },
        examples: [
          { en: "I'd like a window seat, please.", vi: 'Tôi muốn ghế cạnh cửa sổ ạ.' },
          { en: 'Could you call a taxi for me, please?', vi: 'Bạn gọi giúp tôi một chiếc taxi được không?' },
        ],
      },
      {
        title: { vi: 'Hỏi đường và chỉ đường', en: 'Asking for and giving directions' },
        body: {
          vi: "Hỏi: **Could you tell me the way to** the station? / **How do I get to** ...?\nChỉ đường (dùng động từ nguyên mẫu): **go straight on** (đi thẳng), **turn left / right** (rẽ trái / phải), **take the second street on the left**.\nVị trí: **opposite** (đối diện), **next to** (bên cạnh), **between** (ở giữa).",
          en: "Ask: **Could you tell me the way to** the station? / **How do I get to** ...?\nGive directions with the base verb: **go straight on**, **turn left / right**, **take the second street on the left**.\nPlaces: **opposite**, **next to**, **between**.",
        },
        examples: [
          { en: 'Go straight on and turn right at the bank.', vi: 'Đi thẳng rồi rẽ phải ở chỗ ngân hàng.' },
          { en: 'The pharmacy is opposite the park.', vi: 'Hiệu thuốc ở đối diện công viên.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w-check-in',
        word: 'check in',
        ipa: '/tʃek ˈɪn/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'làm thủ tục (sân bay); nhận phòng (khách sạn)',
        definitionEn: 'To show your ticket or booking when you arrive at an airport or a hotel.',
        examples: [
          { en: 'We checked in two hours before the flight.', vi: 'Chúng tôi làm thủ tục hai tiếng trước chuyến bay.' },
          { en: 'You can check in at the hotel after 2 pm.', vi: 'Bạn có thể nhận phòng khách sạn sau 2 giờ chiều.' },
        ],
        usageNote: {
          vi: "Động từ viết rời: **check in**. Danh từ có gạch nối: **check-in**, VD 'the check-in desk' (quầy làm thủ tục).",
          en: "Verb: **check in** (two words). Noun: **check-in**, e.g. 'the check-in desk'.",
        },
      },
      {
        id: 'l2b-g-w-boarding-pass',
        word: 'boarding pass',
        ipa: '/ˈbɔː.dɪŋ ˌpɑːs/',
        partOfSpeech: 'noun',
        meaningVi: 'thẻ lên máy bay',
        definitionEn: 'A card that you must show before you get on a plane.',
        examples: [
          { en: 'Please have your boarding pass ready.', vi: 'Vui lòng chuẩn bị sẵn thẻ lên máy bay.' },
          { en: "Oh no, I can't find my boarding pass!", vi: 'Ôi không, tôi không tìm thấy thẻ lên máy bay!' },
        ],
      },
      {
        id: 'l2b-g-w-luggage',
        word: 'luggage',
        ipa: '/ˈlʌɡ.ɪdʒ/',
        partOfSpeech: 'noun (uncountable)',
        meaningVi: 'hành lý',
        definitionEn: 'The bags and suitcases that you take on a trip.',
        examples: [
          { en: 'How much luggage do you have?', vi: 'Bạn có bao nhiêu hành lý?' },
          { en: "My luggage didn't arrive in Bangkok.", vi: 'Hành lý của tôi không đến Bangkok.' },
        ],
        usageNote: {
          vi: "Danh từ không đếm được: KHÔNG nói 'luggages' hay 'a luggage'. Nói **two bags** hoặc **a piece of luggage**.",
          en: "Uncountable: no 'luggages' and no 'a luggage'. Say **two bags** or **a piece of luggage**.",
        },
      },
      {
        id: 'l2b-g-w-gate',
        word: 'gate',
        ipa: '/ɡeɪt/',
        partOfSpeech: 'noun',
        meaningVi: 'cổng (ra máy bay)',
        definitionEn: 'The place in an airport where you get on your plane.',
        examples: [
          { en: 'Our flight leaves from gate 12.', vi: 'Chuyến bay của chúng ta khởi hành ở cổng 12.' },
          { en: 'Please go to the gate now.', vi: 'Xin mời quý khách đến cổng ra máy bay ngay.' },
        ],
      },
      {
        id: 'l2b-g-w-delayed',
        word: 'delayed',
        ipa: '/dɪˈleɪd/',
        partOfSpeech: 'adjective',
        meaningVi: 'bị trễ, bị hoãn',
        definitionEn: 'Later than planned.',
        examples: [
          { en: 'The train was delayed because of the heavy rain.', vi: 'Chuyến tàu bị trễ vì mưa to.' },
          { en: 'Sorry, your flight is delayed by forty minutes.', vi: 'Xin lỗi, chuyến bay của bạn bị trễ bốn mươi phút.' },
        ],
        usageNote: {
          vi: '**delayed** = trễ nhưng vẫn đi. **cancelled** = bị huỷ, không đi nữa.',
          en: '**delayed** = late, but it will still go. **cancelled** = it will not go at all.',
        },
      },
      {
        id: 'l2b-g-w-reception',
        word: 'reception',
        ipa: '/rɪˈsep.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'quầy lễ tân',
        definitionEn: 'The desk near the entrance of a hotel or office where people help visitors.',
        examples: [
          { en: 'Please leave your key at reception.', vi: 'Vui lòng để lại chìa khoá ở quầy lễ tân.' },
          { en: 'I asked at reception for a city map.', vi: 'Tôi đã xin bản đồ thành phố ở quầy lễ tân.' },
        ],
        usageNote: {
          vi: 'Người làm ở quầy lễ tân = **receptionist**. Thường nói **at reception** (không cần "the").',
          en: 'The person is a **receptionist**. We usually say **at reception**.',
        },
      },
      {
        id: 'l2b-g-w-opposite',
        word: 'opposite',
        ipa: '/ˈɒp.ə.zɪt/',
        partOfSpeech: 'preposition',
        meaningVi: 'đối diện',
        definitionEn: 'On the other side of a street or room, facing something.',
        examples: [
          { en: 'The bus stop is opposite the hotel.', vi: 'Trạm xe buýt ở đối diện khách sạn.' },
          { en: 'She sat opposite me on the train.', vi: 'Cô ấy ngồi đối diện tôi trên tàu.' },
        ],
        usageNote: {
          vi: "Thường nói thẳng **opposite the bank**, không cần thêm 'to'.",
          en: "We usually say **opposite the bank**, without 'to'.",
        },
      },
    ],
    exercises: [
      {
        id: 'l2b-g-01-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ tiếng Anh với nghĩa tiếng Việt.', en: 'Match the English words with their Vietnamese meanings.' },
        pairs: [
          { left: 'check in', right: 'làm thủ tục' },
          { left: 'boarding pass', right: 'thẻ lên máy bay' },
          { left: 'luggage', right: 'hành lý' },
          { left: 'gate', right: 'cổng ra máy bay' },
          { left: 'reception', right: 'quầy lễ tân' },
          { left: 'opposite', right: 'đối diện' },
        ],
        explanation: {
          vi: 'Ôn lại 6 từ chính của bài trước khi luyện câu.',
          en: 'Review the six key words before you practise sentences.',
        },
      },
      {
        id: 'l2b-g-01-vocab-ex02',
        type: 'multiple-choice',
        question: 'Your plane will leave two hours late. Your flight is ___.',
        options: ['cancelled', 'delayed', 'boarding', 'early'],
        correctIndex: 1,
        explanation: {
          vi: 'Trễ nhưng vẫn bay = delayed. Cancelled = bị huỷ, không bay nữa.',
          en: "Late but still going = delayed. Cancelled = it won't fly at all.",
        },
      },
      {
        id: 'l2b-g-01-vocab-ex03',
        type: 'fill-blank',
        sentence: 'Please show your passport and ___ pass at the gate.',
        acceptedAnswers: ['boarding'],
        hint: 'the card you need to get on the plane',
        explanation: {
          vi: 'boarding pass = thẻ lên máy bay, đưa cho nhân viên ở cổng.',
          en: 'You show your boarding pass at the gate.',
        },
      },
      {
        id: 'l2b-g-01-vocab-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I have three luggages.', 'I have three bags.', 'I have a luggages.', 'I have three luggage.'],
        correctIndex: 1,
        explanation: {
          vi: "luggage không đếm được, không thêm -s. Muốn đếm thì dùng 'bags'.",
          en: "Luggage is uncountable. Use 'bags' when you count.",
        },
      },
      {
        id: 'l2b-g-01-vocab-ex05',
        type: 'listen-choose',
        audioText: 'Flight two-five-one to Bangkok is now boarding at gate twelve.',
        question: 'Which gate does the flight leave from?',
        options: ['Gate 2', 'Gate 12', 'Gate 20', 'Gate 251'],
        correctIndex: 1,
        explanation: {
          vi: "'Gate twelve' = cổng 12. Còn 251 là số hiệu chuyến bay.",
          en: "'Gate twelve' = gate 12. 251 is the flight number.",
        },
      },
      {
        id: 'l2b-g-01-vocab-ex06',
        type: 'fill-blank',
        sentence: "I'd ___ a room with a sea view, please.",
        acceptedAnswers: ['like'],
        hint: "I'd ... = I would ...",
        explanation: {
          vi: "I'd like + danh từ = tôi muốn... (cách xin lịch sự).",
          en: "I'd like + noun is a polite way to ask for something.",
        },
      },
      {
        id: 'l2b-g-01-vocab-ex07',
        type: 'multiple-choice',
        question: 'You are at a hotel. Which is the most polite?',
        options: ['Give me the key.', 'I want my key now.', 'Could I have my key, please?', 'Key, please, quick.'],
        correctIndex: 2,
        explanation: {
          vi: "'Could I have ..., please?' là cách lịch sự nhất với người lạ.",
          en: "'Could I have ..., please?' is the most polite choice.",
        },
      },
      {
        id: 'l2b-g-01-vocab-ex08',
        type: 'arrange-words',
        translationVi: 'Bạn có thể chỉ cho tôi đường đến nhà ga được không?',
        correctSentence: 'Could you tell me the way to the station?',
        extraWords: ['say', 'at'],
        explanation: {
          vi: "Mẫu câu hỏi đường: Could you tell me the way to + nơi chốn?",
          en: 'Pattern: Could you tell me the way to + place?',
        },
      },
      {
        id: 'l2b-g-01-vocab-ex09',
        type: 'listen-type',
        audioText: 'Go straight on and turn left at the bank.',
        acceptedAnswers: ['Go straight on and turn left at the bank.'],
        explanation: {
          vi: 'go straight on = đi thẳng; turn left = rẽ trái.',
          en: 'Go straight on = continue forward; turn left = go to the left.',
        },
      },
      {
        id: 'l2b-g-01-vocab-ex10',
        type: 'multiple-choice',
        question: 'The café is on one side of the street. The hotel is on the other side, facing it. The café is ___ the hotel.',
        options: ['between', 'opposite', 'behind', 'under'],
        correctIndex: 1,
        explanation: {
          vi: 'Ở hai bên đường, nhìn sang nhau = opposite (đối diện).',
          en: 'On the other side of the street, facing it = opposite.',
        },
      },
      {
        id: 'l2b-g-01-vocab-ex11',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi vấn đề với câu nhờ giúp phù hợp.', en: 'Match each problem with a polite request.' },
        pairs: [
          { left: 'My room is too noisy.', right: 'Could I change rooms, please?' },
          { left: "I can't find gate eight.", right: 'Excuse me, where is gate eight?' },
          { left: 'My bag is very heavy.', right: 'Could you help me with my bag?' },
          { left: "I'm lost in the city.", right: 'How do I get to the hotel?' },
          { left: "The Wi-Fi isn't working.", right: 'Could you check the Wi-Fi, please?' },
        ],
        explanation: {
          vi: 'Mỗi vấn đề cần một câu nhờ giúp đúng ý và lịch sự.',
          en: 'Each problem needs a matching, polite request.',
        },
      },
      {
        id: 'l2b-g-01-vocab-ex12',
        type: 'speak-sentence',
        sentence: 'Excuse me, could you tell me the way to the station?',
        translationVi: 'Xin lỗi, bạn có thể chỉ cho tôi đường đến nhà ga không?',
        explanation: {
          vi: "Nối âm 'could you' thật mượt và nhấn mạnh từ 'STA-tion'.",
          en: "Link 'could you' smoothly and stress 'STA-tion'.",
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — CÔNG VIỆC: PHÒNG BAN, LỊCH LÀM VIỆC, HẠN CHÓT
   * Từ mới: introduce, department, schedule, deadline, available, attach, call back
   * Ngữ pháp: work in / for / as; giới từ thời gian at / on / by / from...to;
   *           câu sắp xếp lịch hẹn (Are you available...? How about...?)
   * ======================================================================== */
  {
    id: 'l2b-g-02-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 10,
    title: { vi: 'Công việc: đồng nghiệp, lịch làm việc, cuộc họp', en: 'At work: colleagues, schedules and meetings' },
    description: {
      vi: 'Học từ về nơi làm việc, cách nói giờ giấc, hạn chót và cách sắp xếp một cuộc họp.',
      en: 'Learn workplace words, how to talk about times and deadlines, and how to arrange a meeting.',
    },
    teachingCards: [
      {
        title: { vi: 'Giới thiệu bản thân ở chỗ làm', en: 'Introducing yourself at work' },
        body: {
          vi: "**Let me introduce myself.** I'm Lan. (Cho phép tôi tự giới thiệu.)\nI work **in** the marketing **department**. (làm ở phòng...)\nI work **for** a bank. (làm cho công ty...)\nI work **as** an accountant. (làm nghề...)\nGiới thiệu người khác: **This is** Nam. **He's our new designer.**",
          en: "**Let me introduce myself.** I'm Lan.\nI work **in** the marketing **department**.\nI work **for** a bank.\nI work **as** an accountant.\nIntroducing someone else: **This is** Nam. **He's our new designer.**",
        },
        examples: [
          { en: "Let me introduce myself. I'm Huy, and I work in the IT department.", vi: 'Cho phép tôi tự giới thiệu. Tôi là Huy, tôi làm ở phòng IT.' },
          { en: "This is Mai. She's our new colleague from Da Nang.", vi: 'Đây là Mai. Cô ấy là đồng nghiệp mới của chúng ta, đến từ Đà Nẵng.' },
        ],
      },
      {
        title: { vi: 'Giờ giấc và hạn chót: at, on, by', en: 'Times and deadlines: at, on, by' },
        body: {
          vi: "**at** + giờ: at 9.30\n**on** + thứ / ngày: on Monday, on 5th May\n**from ... to ...**: from 2 to 3 pm\n**by** + thời điểm = **không muộn hơn** lúc đó: Send it **by Friday**. (thứ Sáu hoặc trước đó)\n**deadline** = hạn chót: The deadline is Friday.",
          en: "**at** + time: at 9.30\n**on** + day / date: on Monday, on 5th May\n**from ... to ...**: from 2 to 3 pm\n**by** + time = **not later than**: Send it **by Friday**.\n**deadline** = the last time to finish something.",
        },
        examples: [
          { en: "The meeting is on Tuesday at ten o'clock.", vi: 'Cuộc họp vào thứ Ba lúc mười giờ.' },
          { en: 'Please finish the report by Thursday.', vi: 'Vui lòng hoàn thành báo cáo chậm nhất vào thứ Năm.' },
        ],
      },
      {
        title: { vi: 'Sắp xếp một cuộc họp', en: 'Arranging a meeting' },
        body: {
          vi: "Hỏi lịch: **Are you available on** Monday? (Bạn có rảnh thứ Hai không?)\nĐề nghị: **How about** 3 pm? / **Shall we** meet at 10?\nĐồng ý: **That works for me.** / **Sounds good.**\nTừ chối lịch sự: **I'm afraid I'm busy then.**\nĐổi lịch: **Can we move the meeting to** Thursday?",
          en: "Ask: **Are you available on** Monday?\nSuggest: **How about** 3 pm? / **Shall we** meet at 10?\nAgree: **That works for me.** / **Sounds good.**\nSay no politely: **I'm afraid I'm busy then.**\nChange: **Can we move the meeting to** Thursday?",
        },
        examples: [
          { en: 'Are you available on Wednesday afternoon?', vi: 'Chiều thứ Tư bạn có rảnh không?' },
          { en: "I'm afraid I'm busy then. How about Thursday?", vi: 'Tiếc là lúc đó tôi bận. Thứ Năm thì sao?' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w-introduce',
        word: 'introduce',
        ipa: '/ˌɪn.trəˈdʒuːs/',
        partOfSpeech: 'verb',
        meaningVi: 'giới thiệu',
        definitionEn: "To tell people your name, or someone else's name, when they meet for the first time.",
        examples: [
          { en: 'Let me introduce my colleague, Mr Hai.', vi: 'Để tôi giới thiệu đồng nghiệp của tôi, anh Hải.' },
          { en: 'She introduced herself to the team.', vi: 'Cô ấy đã tự giới thiệu với cả nhóm.' },
        ],
        usageNote: {
          vi: "Mẫu: **introduce A to B** (giới thiệu A với B): 'I introduced Lan to my boss.'",
          en: "Pattern: **introduce A to B**: 'I introduced Lan to my boss.'",
        },
      },
      {
        id: 'l2b-g-w-department',
        word: 'department',
        ipa: '/dɪˈpɑːt.mənt/',
        partOfSpeech: 'noun',
        meaningVi: 'phòng, ban (trong công ty)',
        definitionEn: 'One part of a company or organisation that does a special kind of work.',
        examples: [
          { en: 'He works in the sales department.', vi: 'Anh ấy làm ở phòng kinh doanh.' },
          { en: 'Our department has twelve people.', vi: 'Phòng của chúng tôi có mười hai người.' },
        ],
        usageNote: {
          vi: 'Dùng giới từ **in**: work **in** the ... department.',
          en: 'Use **in**: work **in** the ... department.',
        },
      },
      {
        id: 'l2b-g-w-schedule',
        word: 'schedule',
        ipa: '/ˈʃedʒ.uːl/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'lịch trình, lịch làm việc; lên lịch',
        definitionEn: 'A plan that shows what you will do and when.',
        examples: [
          { en: 'My schedule is very busy this week.', vi: 'Lịch của tôi tuần này rất kín.' },
          { en: 'The meeting is scheduled for Monday.', vi: 'Cuộc họp được lên lịch vào thứ Hai.' },
        ],
        usageNote: {
          vi: "Anh-Anh đọc /ˈʃedʒ.uːl/ ('sé-giu'), Anh-Mỹ đọc /ˈskedʒ.uːl/ ('ské-giu'). Cả hai đều đúng.",
          en: 'British: /ˈʃedʒ.uːl/. American: /ˈskedʒ.uːl/. Both are correct.',
        },
      },
      {
        id: 'l2b-g-w-deadline',
        word: 'deadline',
        ipa: '/ˈded.laɪn/',
        partOfSpeech: 'noun',
        meaningVi: 'hạn chót',
        definitionEn: 'The time or day when you must finish something.',
        examples: [
          { en: 'The deadline for the report is Friday.', vi: 'Hạn chót nộp báo cáo là thứ Sáu.' },
          { en: 'We finished the project before the deadline.', vi: 'Chúng tôi đã làm xong dự án trước hạn chót.' },
        ],
        usageNote: {
          vi: 'Cụm hay dùng: **meet a deadline** (kịp hạn), **miss a deadline** (trễ hạn).',
          en: 'Collocations: **meet** a deadline (finish in time), **miss** a deadline (finish late).',
        },
      },
      {
        id: 'l2b-g-w-available',
        word: 'available',
        ipa: '/əˈveɪ.lə.bəl/',
        partOfSpeech: 'adjective',
        meaningVi: 'rảnh, có thể gặp / nghe máy; có sẵn',
        definitionEn: 'Free to meet or talk; ready to use or buy.',
        examples: [
          { en: 'Are you available for a meeting tomorrow?', vi: 'Ngày mai bạn có rảnh để họp không?' },
          { en: "Sorry, Ms Lan isn't available right now.", vi: 'Xin lỗi, chị Lan hiện không nghe máy được.' },
        ],
        usageNote: {
          vi: 'Trọng âm ở âm thứ hai: a-VAI-la-ble.',
          en: 'Stress the second syllable: a-VAI-la-ble.',
        },
      },
      {
        id: 'l2b-g-w-attach',
        word: 'attach',
        ipa: '/əˈtætʃ/',
        partOfSpeech: 'verb',
        meaningVi: 'đính kèm (tệp trong email)',
        definitionEn: 'To add a file to an email.',
        examples: [
          { en: 'I have attached the report to this email.', vi: 'Tôi đã đính kèm bản báo cáo vào email này.' },
          { en: 'Please attach a photo to your form.', vi: 'Vui lòng đính kèm một tấm ảnh vào đơn.' },
        ],
        usageNote: {
          vi: "Câu email rất hay dùng: **I've attached** ... / **Please find attached** ...",
          en: "Common email phrases: **I've attached** ... / **Please find attached** ...",
        },
      },
      {
        id: 'l2b-g-w-call-back',
        word: 'call back',
        ipa: '/kɔːl ˈbæk/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'gọi lại (điện thoại)',
        definitionEn: 'To phone someone again, or to phone someone who phoned you.',
        examples: [
          { en: 'Can you call me back after lunch?', vi: 'Bạn gọi lại cho tôi sau bữa trưa được không?' },
          { en: "I'll call you back in ten minutes.", vi: 'Mười phút nữa tôi sẽ gọi lại cho bạn.' },
        ],
        usageNote: {
          vi: "Đại từ đứng giữa: call **me** back, call **her** back (KHÔNG nói 'call back me').",
          en: "Put the pronoun in the middle: call **me** back, not 'call back me'.",
        },
      },
    ],
    exercises: [
      {
        id: 'l2b-g-02-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ tiếng Anh với nghĩa tiếng Việt.', en: 'Match the English words with their Vietnamese meanings.' },
        pairs: [
          { left: 'introduce', right: 'giới thiệu' },
          { left: 'department', right: 'phòng, ban' },
          { left: 'schedule', right: 'lịch làm việc' },
          { left: 'deadline', right: 'hạn chót' },
          { left: 'available', right: 'rảnh, có thể gặp' },
          { left: 'attach', right: 'đính kèm' },
        ],
        explanation: {
          vi: 'Ôn lại 6 từ chính của bài trước khi luyện câu.',
          en: 'Review the six key words before you practise sentences.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex02',
        type: 'fill-blank',
        sentence: 'I work ___ the sales department.',
        acceptedAnswers: ['in'],
        hint: 'a preposition',
        explanation: {
          vi: "Nói 'work in the ... department' (làm ở phòng...).",
          en: "We say 'work in the ... department'.",
        },
      },
      {
        id: 'l2b-g-02-vocab-ex03',
        type: 'multiple-choice',
        question: 'I work ___ a big bank in Hanoi. (The bank is my company.)',
        options: ['as', 'for', 'on', 'by'],
        correctIndex: 1,
        explanation: {
          vi: 'work for + công ty (làm cho công ty nào); work as + nghề.',
          en: 'work for + company; work as + job.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex04',
        type: 'multiple-choice',
        question: "Your manager says: 'Send me the report by Friday.' When can you send it?",
        options: ['Only on Friday', 'On Friday or before Friday', 'After Friday', 'Every Friday'],
        correctIndex: 1,
        explanation: {
          vi: 'by Friday = không muộn hơn thứ Sáu → thứ Sáu hoặc trước đó.',
          en: "'By Friday' means not later than Friday.",
        },
      },
      {
        id: 'l2b-g-02-vocab-ex05',
        type: 'fill-blank',
        sentence: 'The meeting is ___ Tuesday at 10 am.',
        acceptedAnswers: ['on'],
        hint: 'a preposition',
        explanation: {
          vi: 'on + thứ trong tuần; at + giờ.',
          en: "Use 'on' with days and 'at' with times.",
        },
      },
      {
        id: 'l2b-g-02-vocab-ex06',
        type: 'listen-choose',
        audioText: "Sorry, Mr Long isn't available right now. He's in a meeting until three.",
        question: 'When can you speak to Mr Long?',
        options: ['Now', 'Before three', 'After three', 'Tomorrow morning'],
        correctIndex: 2,
        explanation: {
          vi: "Anh ấy họp 'until three' (đến 3 giờ) → sau 3 giờ mới rảnh.",
          en: "He's in a meeting until three, so he is free after three.",
        },
      },
      {
        id: 'l2b-g-02-vocab-ex07',
        type: 'arrange-words',
        translationVi: 'Tôi đã đính kèm lịch làm việc vào email.',
        correctSentence: 'I have attached the schedule to the email.',
        extraWords: ['on', 'attach'],
        explanation: {
          vi: 'attach something to an email = đính kèm cái gì vào email.',
          en: 'We attach something to an email.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex08',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Can you call back me later?',
          'Can you call me back later?',
          'Can you back call me later?',
          'Can you call later back me?',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Đại từ (me, him, her) đứng giữa: call me back.',
          en: 'The pronoun goes in the middle: call me back.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex09',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu nói với câu đáp phù hợp.', en: 'Match each sentence with the best reply.' },
        pairs: [
          { left: 'Let me introduce myself.', right: "Nice to meet you. I'm Hoa." },
          { left: 'When is the deadline?', right: 'Next Monday.' },
          { left: 'Which department do you work in?', right: 'Marketing.' },
          { left: 'Shall we meet at ten?', right: 'Sounds good. See you then.' },
          { left: 'Could you call me back?', right: "Sure, I'll call you in five minutes." },
        ],
        explanation: {
          vi: 'Câu đáp phải trả lời đúng điều được hỏi hoặc đề nghị.',
          en: 'Each reply must answer the question or the suggestion.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex10',
        type: 'listen-type',
        audioText: 'Are you available on Thursday afternoon?',
        acceptedAnswers: ['Are you available on Thursday afternoon?'],
        explanation: {
          vi: 'Are you available...? = Bạn có rảnh...? Nhớ: on + thứ.',
          en: 'Are you available...? asks if someone is free.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex11',
        type: 'fill-blank',
        sentence: 'Please finish the report before the ___ on Friday.',
        acceptedAnswers: ['deadline'],
        hint: 'the last day to finish something',
        explanation: {
          vi: 'deadline = hạn chót, ngày cuối cùng phải xong việc.',
          en: 'A deadline is the last day to finish something.',
        },
      },
      {
        id: 'l2b-g-02-vocab-ex12',
        type: 'speak-sentence',
        sentence: 'Let me introduce myself. I work in the marketing department.',
        translationVi: 'Cho phép tôi tự giới thiệu. Tôi làm ở phòng marketing.',
        explanation: {
          vi: 'Nhấn đúng trọng âm: in-tro-DUCE, de-PART-ment.',
          en: 'Stress: in-tro-DUCE, de-PART-ment.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — TRƯỜNG HỌC: MÔN HỌC, BÀI TẬP, DỰ ÁN
   * Từ mới: literature, geography, project, presentation, hand in, mark, break
   * Ngữ pháp (theo chương trình phổ thông): hiện tại hoàn thành với already / yet / just;
   *           cụm từ do homework, give a presentation, get a good mark
   * ======================================================================== */
  {
    id: 'l2b-g-03-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 10,
    title: { vi: 'Trường học: môn học, bài tập và dự án', en: 'School life: subjects, homework and projects' },
    description: {
      vi: 'Học tên các môn học, từ về bài tập và dự án, và thì hiện tại hoàn thành với already, yet, just.',
      en: 'Learn school subjects, words for homework and projects, and the present perfect with already, yet and just.',
    },
    teachingCards: [
      {
        title: { vi: 'Các môn học', en: 'School subjects' },
        body: {
          vi: "**maths** (toán), **literature** (ngữ văn), **English**, **physics** (vật lý), **chemistry** (hoá), **biology** (sinh), **history** (sử), **geography** (địa), **IT** (tin học), **PE** (thể dục).\nTên môn học **không có 'the'**: I like **history**.\n**Maths**, **physics** có -s nhưng là **số ít**: Maths **is** my favourite subject.",
          en: "**maths**, **literature**, **English**, **physics**, **chemistry**, **biology**, **history**, **geography**, **IT**, **PE**.\nNo 'the' before subjects: I like **history**.\n**Maths** and **physics** end in -s, but they are **singular**: Maths **is** my favourite subject.",
        },
        examples: [
          { en: 'Physics is difficult, but I like it.', vi: 'Môn vật lý khó nhưng mình thích.' },
          { en: 'We have geography on Monday and Thursday.', vi: 'Bọn mình học địa vào thứ Hai và thứ Năm.' },
        ],
      },
      {
        title: { vi: 'Hiện tại hoàn thành: already, yet, just', en: 'Present perfect: already, yet, just' },
        body: {
          vi: "Công thức: **have / has + V3** (quá khứ phân từ).\n**already** (đã... rồi) — câu khẳng định: I've **already** finished my homework.\n**yet** (chưa) — cuối câu phủ định và câu hỏi: I haven't started **yet**. Have you finished **yet**?\n**just** (vừa mới): She has **just** handed in her project.",
          en: "Form: **have / has + past participle**.\n**already** — in positive sentences: I've **already** finished my homework.\n**yet** — at the end of negatives and questions: I haven't started **yet**. Have you finished **yet**?\n**just** = a very short time ago: She has **just** handed in her project.",
        },
        examples: [
          { en: 'Have you done the maths homework yet?', vi: 'Bạn làm bài tập toán chưa?' },
          { en: "I've already written two pages.", vi: 'Mình đã viết được hai trang rồi.' },
        ],
      },
      {
        title: { vi: 'Bài tập, điểm số, dự án', en: 'Homework, marks and projects' },
        body: {
          vi: "**do homework** (KHÔNG nói 'make homework')\n**hand in** = nộp bài: hand in your homework **by** Friday\n**get a good / bad mark** = được điểm tốt / kém\n**do a project** = làm dự án; **give a presentation** = thuyết trình\n**break** = giờ ra chơi: at break",
          en: "**do homework** (not 'make homework')\n**hand in** = give your work to the teacher\n**get a good / bad mark**\n**do a project**; **give a presentation**\n**break** = the short rest time between lessons",
        },
        examples: [
          { en: 'I got a good mark in my literature test.', vi: 'Mình được điểm tốt bài kiểm tra văn.' },
          { en: 'Our group is going to give a presentation next week.', vi: 'Nhóm mình sẽ thuyết trình vào tuần sau.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w-literature',
        word: 'literature',
        ipa: '/ˈlɪt.rə.tʃər/',
        partOfSpeech: 'noun',
        meaningVi: 'văn học; môn ngữ văn',
        definitionEn: 'The subject where you read and write about stories, poems and books.',
        examples: [
          { en: 'We read a poem in our literature class today.', vi: 'Hôm nay bọn mình đọc một bài thơ trong giờ văn.' },
          { en: 'My sister is really good at literature.', vi: 'Chị mình học văn rất giỏi.' },
        ],
        usageNote: {
          vi: 'Nhấn âm đầu: LIT-ra-ture. Không có "the": I love literature.',
          en: "Stress the first syllable: LIT-ra-ture. No 'the': I love literature.",
        },
      },
      {
        id: 'l2b-g-w-geography',
        word: 'geography',
        ipa: '/dʒiˈɒɡ.rə.fi/',
        partOfSpeech: 'noun',
        meaningVi: 'địa lý',
        definitionEn: 'The subject where you learn about countries, rivers, mountains and weather.',
        examples: [
          { en: 'In geography, we learned about the Mekong River.', vi: 'Trong giờ địa, bọn mình đã học về sông Mê Kông.' },
          { en: 'Geography is easier than history for me.', vi: 'Với mình, môn địa dễ hơn môn sử.' },
        ],
        usageNote: {
          vi: 'Nhấn âm thứ hai: ge-O-gra-phy.',
          en: 'Stress the second syllable: ge-O-gra-phy.',
        },
      },
      {
        id: 'l2b-g-w-project',
        word: 'project',
        ipa: '/ˈprɒdʒ.ekt/',
        partOfSpeech: 'noun',
        meaningVi: 'dự án, đề tài',
        definitionEn: 'A piece of work where you find information about a topic, often in a group.',
        examples: [
          { en: 'We are doing a science project about plastic.', vi: 'Bọn mình đang làm dự án khoa học về nhựa.' },
          { en: 'Our project was the best in the class.', vi: 'Dự án của nhóm mình hay nhất lớp.' },
        ],
        usageNote: {
          vi: 'Cụm hay dùng: **do / work on** a project (làm dự án).',
          en: 'Collocations: **do** a project, **work on** a project.',
        },
      },
      {
        id: 'l2b-g-w-presentation',
        word: 'presentation',
        ipa: '/ˌprez.ənˈteɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'bài thuyết trình',
        definitionEn: 'A talk to a group of people to show and explain something.',
        examples: [
          { en: 'I was nervous before my presentation.', vi: 'Mình đã hồi hộp trước bài thuyết trình.' },
          { en: 'Each group will give a five-minute presentation.', vi: 'Mỗi nhóm sẽ thuyết trình năm phút.' },
        ],
        usageNote: {
          vi: 'Cụm hay dùng: **give a presentation** (thuyết trình).',
          en: 'Collocation: **give a presentation**.',
        },
      },
      {
        id: 'l2b-g-w-hand-in',
        word: 'hand in',
        ipa: '/hænd ˈɪn/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'nộp (bài)',
        definitionEn: 'To give your work to a teacher.',
        examples: [
          { en: 'Please hand in your essays on Monday.', vi: 'Các em nộp bài luận vào thứ Hai nhé.' },
          { en: 'I forgot to hand in my homework!', vi: 'Mình quên nộp bài tập về nhà rồi!' },
        ],
        usageNote: {
          vi: 'hand in your homework / hand **it** in (đại từ đứng giữa). Khác với **hand out** = phát (bài) cho mọi người.',
          en: 'hand in your homework / hand **it** in. Different from **hand out** = give to everyone.',
        },
      },
      {
        id: 'l2b-g-w-mark',
        word: 'mark',
        ipa: '/mɑːk/',
        partOfSpeech: 'noun',
        meaningVi: 'điểm (bài kiểm tra)',
        definitionEn: 'A number or letter that shows how good your work is.',
        examples: [
          { en: 'I got nine out of ten. That is a good mark!', vi: 'Mình được chín trên mười. Điểm tốt đấy!' },
          { en: 'What mark did you get in the test?', vi: 'Bạn được mấy điểm bài kiểm tra?' },
        ],
        usageNote: {
          vi: 'Anh-Anh hay dùng **mark**, Anh-Mỹ hay dùng **grade**. Nói **get** a mark.',
          en: 'British: **mark**. American: **grade**. We **get** a mark.',
        },
      },
      {
        id: 'l2b-g-w-break',
        word: 'break',
        ipa: '/breɪk/',
        partOfSpeech: 'noun',
        meaningVi: 'giờ ra chơi; giờ nghỉ',
        definitionEn: 'A short time when you stop studying or working to rest.',
        examples: [
          { en: 'We play football at break.', vi: 'Bọn mình đá bóng vào giờ ra chơi.' },
          { en: "Let's take a ten-minute break.", vi: 'Mình nghỉ mười phút nhé.' },
        ],
        usageNote: {
          vi: '**at break** = vào giờ ra chơi. **take a break** = nghỉ giải lao.',
          en: '**at break** = during break time. **take a break** = stop and rest.',
        },
      },
    ],
    exercises: [
      {
        id: 'l2b-g-03-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối tên môn học với nghĩa tiếng Việt.', en: 'Match the subjects with their Vietnamese names.' },
        pairs: [
          { left: 'maths', right: 'toán' },
          { left: 'literature', right: 'ngữ văn' },
          { left: 'geography', right: 'địa lý' },
          { left: 'chemistry', right: 'hoá học' },
          { left: 'biology', right: 'sinh học' },
          { left: 'physics', right: 'vật lý' },
        ],
        explanation: {
          vi: 'Tên môn học dùng hằng ngày ở trường — cần nhớ chắc.',
          en: 'You use these subject names every day at school.',
        },
      },
      {
        id: 'l2b-g-03-vocab-ex02',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Maths are my favourite subject.',
          'Maths is my favourite subject.',
          'The maths is my favourite subject.',
          'Maths my favourite subject.',
        ],
        correctIndex: 1,
        explanation: {
          vi: "Maths có -s nhưng là số ít → dùng 'is', không có 'the'.",
          en: "'Maths' is singular, so use 'is' and no 'the'.",
        },
      },
      {
        id: 'l2b-g-03-vocab-ex03',
        type: 'fill-blank',
        sentence: 'Have you finished your homework ___?',
        acceptedAnswers: ['yet'],
        hint: 'already / yet / just',
        explanation: {
          vi: "'yet' đứng cuối câu hỏi, nghĩa là '... chưa?'.",
          en: "'Yet' goes at the end of questions.",
        },
      },
      {
        id: 'l2b-g-03-vocab-ex04',
        type: 'fill-blank',
        sentence: "The bell has ___ rung. Let's go out. It's break time!",
        acceptedAnswers: ['just'],
        hint: '= a moment ago',
        explanation: {
          vi: "'just' = vừa mới, đứng giữa has và V3.",
          en: "'Just' means a moment ago; it goes between 'has' and the verb.",
        },
      },
      {
        id: 'l2b-g-03-vocab-ex05',
        type: 'multiple-choice',
        question: 'You give your homework to the teacher. Which sentence is correct?',
        options: [
          'I handed in my homework.',
          'I handed my homework on.',
          'I gave in hand my homework.',
          'I handed out my homework.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'hand in = nộp bài; hand out = phát cho mọi người.',
          en: 'hand in = give to the teacher; hand out = give to everyone.',
        },
      },
      {
        id: 'l2b-g-03-vocab-ex06',
        type: 'listen-choose',
        audioText: 'Remember, you must hand in your geography project by next Friday.',
        question: 'What must the students do?',
        options: [
          'Give a presentation on Friday',
          'Hand in their geography project',
          'Read a book about geography',
          'Do a test next Friday',
        ],
        correctIndex: 1,
        explanation: {
          vi: "Câu nói: 'hand in your geography project' = nộp dự án địa lý.",
          en: "The teacher says 'hand in your geography project'.",
        },
      },
      {
        id: 'l2b-g-03-vocab-ex07',
        type: 'arrange-words',
        translationVi: 'Mình đã làm bài tập về nhà rồi.',
        correctSentence: 'I have already done my homework.',
        extraWords: ['yet', 'did'],
        explanation: {
          vi: "'already' đứng giữa have và V3: have already done.",
          en: "'Already' goes between 'have' and the past participle.",
        },
      },
      {
        id: 'l2b-g-03-vocab-ex08',
        type: 'multiple-choice',
        question: 'I ___ my homework after dinner every evening.',
        options: ['make', 'do', 'give', 'take'],
        correctIndex: 1,
        explanation: {
          vi: "Luôn nói 'do homework', không nói 'make homework'.",
          en: "We always say 'do homework', not 'make homework'.",
        },
      },
      {
        id: 'l2b-g-03-vocab-ex09',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với cụm từ đi cùng.', en: 'Match the verbs with the words that go with them.' },
        pairs: [
          { left: 'take', right: 'notes in class' },
          { left: 'give', right: 'a presentation' },
          { left: 'get', right: 'a good mark' },
          { left: 'hand in', right: 'your essay' },
          { left: 'ask', right: 'the teacher a question' },
        ],
        explanation: {
          vi: 'Học cả cụm (collocation) giúp bạn nói tự nhiên hơn.',
          en: 'Learning word partners helps you sound natural.',
        },
      },
      {
        id: 'l2b-g-03-vocab-ex10',
        type: 'listen-type',
        audioText: 'Have you finished your science project yet?',
        acceptedAnswers: ['Have you finished your science project yet?'],
        explanation: {
          vi: "Câu hỏi hiện tại hoàn thành: Have you + V3 ... yet?",
          en: 'Present perfect question: Have you + past participle ... yet?',
        },
      },
      {
        id: 'l2b-g-03-vocab-ex11',
        type: 'fill-blank',
        sentence: 'I studied hard, so I got a good ___ in the test.',
        acceptedAnswers: ['mark', 'grade'],
        hint: 'a number that shows how good your work is',
        explanation: {
          vi: 'get a good mark = được điểm tốt.',
          en: 'get a good mark = do well in a test.',
        },
      },
      {
        id: 'l2b-g-03-vocab-ex12',
        type: 'speak-sentence',
        sentence: "I've already handed in my geography project.",
        translationVi: 'Mình đã nộp dự án địa lý rồi.',
        explanation: {
          vi: "Đọc 'handed' với đuôi /ɪd/ và nhấn ge-O-gra-phy.",
          en: "Say 'handed' with /ɪd/ and stress ge-O-gra-phy.",
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — PHIM, NHẠC VÀ TIN TỨC
   * Từ mới: comedy, documentary, episode, soundtrack, recommend, review, headline
   * Ngữ pháp: tính từ -ed / -ing (bored / boring); recommend + V-ing / danh từ
   * ======================================================================== */
  {
    id: 'l2b-g-04-vocab',
    skill: 'vocabulary',
    mode: 'practice',
    estimatedMinutes: 10,
    title: { vi: 'Phim, nhạc và tin tức', en: 'Films, music and news' },
    description: {
      vi: 'Học từ về phim, nhạc, tin tức; tính từ -ed / -ing và cách giới thiệu một bộ phim cho người khác.',
      en: 'Learn words for films, music and news, -ed / -ing adjectives, and how to recommend a film.',
    },
    teachingCards: [
      {
        title: { vi: 'Các loại phim và chương trình', en: 'Kinds of films and shows' },
        body: {
          vi: "**comedy** (phim hài), **action film** (phim hành động), **horror film** (phim kinh dị), **animated film** (phim hoạt hình), **documentary** (phim tài liệu), **series** (phim bộ) — mỗi tập là một **episode**.\nNhạc: **soundtrack** (nhạc phim), **pop**, **rock**, **a band** (ban nhạc).\nTin tức: **headline** (tiêu đề tin), **article** (bài báo).",
          en: "**comedy**, **action film**, **horror film**, **animated film**, **documentary**, **series** — each part is an **episode**.\nMusic: **soundtrack**, **pop**, **rock**, **a band**.\nNews: **headline**, **article**.",
        },
        examples: [
          { en: 'I watched three episodes last night.', vi: 'Tối qua mình xem liền ba tập.' },
          { en: 'This documentary is about sea turtles.', vi: 'Phim tài liệu này nói về rùa biển.' },
        ],
      },
      {
        title: { vi: 'Tính từ -ed và -ing', en: '-ed and -ing adjectives' },
        body: {
          vi: "**-ing** tả **sự việc / bộ phim** gây ra cảm xúc: The film was **boring**.\n**-ed** tả **cảm xúc của người**: I was **bored**.\nTương tự: interest**ing** / interest**ed**, excit**ing** / excit**ed**, surpris**ing** / surpris**ed**.\nLỗi hay gặp: 'I am boring' nghĩa là 'Tôi là người nhàm chán'!",
          en: "**-ing** describes **the thing** that causes a feeling: The film was **boring**.\n**-ed** describes **how a person feels**: I was **bored**.\nAlso: interest**ing** / interest**ed**, excit**ing** / excit**ed**, surpris**ing** / surpris**ed**.\nCommon mistake: 'I am boring' means people find you boring!",
        },
        examples: [
          { en: 'The ending was really surprising.', vi: 'Đoạn kết thật bất ngờ.' },
          { en: "I'm very interested in old music.", vi: 'Mình rất hứng thú với nhạc xưa.' },
        ],
      },
      {
        title: { vi: 'Giới thiệu và nêu ý kiến', en: 'Recommending and giving opinions' },
        body: {
          vi: "Giới thiệu: **I'd recommend** + tên phim / **You should watch** ... / **It's worth watching.** (đáng xem)\nLý do: It's **really funny** / **the music is great**.\nÝ kiến: **In my opinion**, ... / **I didn't like it much because** ...\nLưu ý: **recommend** + danh từ hoặc V-ing, KHÔNG nói 'recommend you to watch'.",
          en: "Recommend: **I'd recommend** + name / **You should watch** ... / **It's worth watching.**\nReasons: It's **really funny** / **the music is great**.\nOpinions: **In my opinion**, ... / **I didn't like it much because** ...\nNote: **recommend** + noun or -ing, not 'recommend you to watch'.",
        },
        examples: [
          { en: "I'd recommend this film. The story is really exciting.", vi: 'Mình giới thiệu phim này. Cốt truyện rất hấp dẫn.' },
          { en: 'In my opinion, the book is better than the film.', vi: 'Theo mình, sách hay hơn phim.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w-comedy',
        word: 'comedy',
        ipa: '/ˈkɒm.ə.di/',
        partOfSpeech: 'noun',
        meaningVi: 'phim hài, hài kịch',
        definitionEn: 'A film, play or show that makes people laugh.',
        examples: [
          { en: "Let's watch a comedy tonight. I need a laugh!", vi: 'Tối nay xem phim hài đi. Mình cần cười một trận!' },
          { en: 'The comedy was funnier than I expected.', vi: 'Bộ phim hài vui hơn mình nghĩ.' },
        ],
        usageNote: {
          vi: 'Số nhiều: comed**ies**. Nhấn âm đầu: COM-e-dy.',
          en: 'Plural: comed**ies**. Stress: COM-e-dy.',
        },
      },
      {
        id: 'l2b-g-w-documentary',
        word: 'documentary',
        ipa: '/ˌdɒk.jəˈmen.tər.i/',
        partOfSpeech: 'noun',
        meaningVi: 'phim tài liệu',
        definitionEn: 'A film or TV programme that gives facts about real life.',
        examples: [
          { en: 'We watched a documentary about the ocean.', vi: 'Bọn mình đã xem một phim tài liệu về đại dương.' },
          { en: 'Documentaries help me learn new things.', vi: 'Phim tài liệu giúp mình học được điều mới.' },
        ],
        usageNote: {
          vi: 'Nhấn âm thứ ba: doc-u-MEN-ta-ry.',
          en: 'Stress the third syllable: doc-u-MEN-ta-ry.',
        },
      },
      {
        id: 'l2b-g-w-episode',
        word: 'episode',
        ipa: '/ˈep.ɪ.səʊd/',
        partOfSpeech: 'noun',
        meaningVi: 'tập (phim bộ, chương trình)',
        definitionEn: 'One part of a TV series or a podcast.',
        examples: [
          { en: 'A new episode comes out every Friday.', vi: 'Mỗi thứ Sáu lại có một tập mới.' },
          { en: 'I watched five episodes in one night!', vi: 'Mình xem năm tập trong một đêm!' },
        ],
      },
      {
        id: 'l2b-g-w-soundtrack',
        word: 'soundtrack',
        ipa: '/ˈsaʊnd.træk/',
        partOfSpeech: 'noun',
        meaningVi: 'nhạc phim',
        definitionEn: 'The music that is played in a film.',
        examples: [
          { en: 'The soundtrack of this film is beautiful.', vi: 'Nhạc phim này rất hay.' },
          { en: 'I listen to film soundtracks when I study.', vi: 'Mình nghe nhạc phim khi học bài.' },
        ],
      },
      {
        id: 'l2b-g-w-recommend',
        word: 'recommend',
        ipa: '/ˌrek.əˈmend/',
        partOfSpeech: 'verb',
        meaningVi: 'giới thiệu, gợi ý (nên xem / dùng)',
        definitionEn: 'To tell someone that something is good and that they should try it.',
        examples: [
          { en: 'Can you recommend a good song for running?', vi: 'Bạn gợi ý một bài hát hay để chạy bộ được không?' },
          { en: "I'd recommend watching it with friends.", vi: 'Mình khuyên nên xem cùng bạn bè.' },
        ],
        usageNote: {
          vi: 'Chính tả: 1 chữ **c**, 2 chữ **m** (re**c**o**mm**end). Sau recommend dùng danh từ hoặc V-ing.',
          en: 'Spelling: one **c**, two **m**s. Use a noun or -ing after it.',
        },
      },
      {
        id: 'l2b-g-w-review',
        word: 'review',
        ipa: '/rɪˈvjuː/',
        partOfSpeech: 'noun',
        meaningVi: 'bài đánh giá, bài nhận xét',
        definitionEn: 'A short article that says if a film, book or product is good or bad.',
        examples: [
          { en: 'The film got very good reviews.', vi: 'Bộ phim được đánh giá rất tốt.' },
          { en: 'I always read reviews before I buy a book.', vi: 'Mình luôn đọc đánh giá trước khi mua sách.' },
        ],
      },
      {
        id: 'l2b-g-w-headline',
        word: 'headline',
        ipa: '/ˈhed.laɪn/',
        partOfSpeech: 'noun',
        meaningVi: 'tiêu đề (bài báo, bản tin)',
        definitionEn: 'The title of a news story, printed in big letters.',
        examples: [
          { en: "The headline says 'Local Students Win Science Prize'.", vi: "Tiêu đề viết: 'Học sinh địa phương giành giải khoa học'." },
          { en: 'I usually just read the headlines on my phone.', vi: 'Mình thường chỉ đọc các tiêu đề trên điện thoại.' },
        ],
        usageNote: {
          vi: "Tiêu đề tin hay bỏ 'a / the' và dùng hiện tại đơn cho việc đã xảy ra: 'Girl Finds Lost Dog'.",
          en: "Headlines often drop 'a / the' and use the present simple: 'Girl Finds Lost Dog'.",
        },
      },
    ],
    exercises: [
      {
        id: 'l2b-g-04-vocab-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ tiếng Anh với nghĩa tiếng Việt.', en: 'Match the English words with their Vietnamese meanings.' },
        pairs: [
          { left: 'comedy', right: 'phim hài' },
          { left: 'documentary', right: 'phim tài liệu' },
          { left: 'episode', right: 'một tập phim' },
          { left: 'soundtrack', right: 'nhạc phim' },
          { left: 'review', right: 'bài đánh giá' },
          { left: 'headline', right: 'tiêu đề bản tin' },
        ],
        explanation: {
          vi: 'Ôn lại 6 từ chính của bài trước khi luyện câu.',
          en: 'Review the six key words before you practise sentences.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex02',
        type: 'multiple-choice',
        question: 'The film was so long and slow. I was ___.',
        options: ['boring', 'bored', 'bore', 'boredom'],
        correctIndex: 1,
        explanation: {
          vi: 'Tả cảm xúc của người → dùng -ed: I was bored.',
          en: 'For how a person feels, use -ed: bored.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex03',
        type: 'multiple-choice',
        question: 'The ending was really ___. Nobody expected it!',
        options: ['surprised', 'surprising', 'surprise', 'surprisingly'],
        correctIndex: 1,
        explanation: {
          vi: 'Tả sự việc (đoạn kết) gây cảm xúc → dùng -ing: surprising.',
          en: 'For the thing that causes the feeling, use -ing: surprising.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex04',
        type: 'fill-blank',
        sentence: 'Each ___ of the series is about forty minutes long.',
        acceptedAnswers: ['episode'],
        hint: 'one part of a series',
        explanation: {
          vi: 'episode = một tập của phim bộ.',
          en: 'An episode is one part of a series.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex05',
        type: 'fill-blank',
        sentence: "I'd ___ this film to anyone who loves animals.",
        acceptedAnswers: ['recommend'],
        hint: 'say it is good and others should see it',
        explanation: {
          vi: "I'd recommend + phim + to + ai đó = giới thiệu phim cho ai.",
          en: "I'd recommend + film + to + person.",
        },
      },
      {
        id: 'l2b-g-04-vocab-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I recommend you to watch it.',
          'I recommend watching it.',
          'I recommend to watch it.',
          'I recommend you watching it.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'recommend + V-ing: I recommend watching it.',
          en: 'Use recommend + -ing: I recommend watching it.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex07',
        type: 'listen-choose',
        audioText: "It isn't a comedy. It's a documentary about life in a small fishing village.",
        question: 'What kind of programme is it?',
        options: ['A comedy', 'A cartoon', 'A documentary', 'An action film'],
        correctIndex: 2,
        explanation: {
          vi: "Nghe đến hết câu: 'It isn't a comedy. It's a documentary'.",
          en: "Listen to the end: 'It isn't a comedy. It's a documentary.'",
        },
      },
      {
        id: 'l2b-g-04-vocab-ex08',
        type: 'arrange-words',
        translationVi: 'Theo mình, phim tài liệu này đáng xem.',
        correctSentence: 'In my opinion, this documentary is worth watching.',
        extraWords: ['watch', 'to'],
        explanation: {
          vi: 'worth + V-ing = đáng để làm gì: worth watching.',
          en: 'Use worth + -ing: worth watching.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex09',
        type: 'match-pairs',
        instruction: { vi: 'Nối tình huống với cảm xúc phù hợp.', en: 'Match each situation with the feeling.' },
        pairs: [
          { left: 'The film was so slow.', right: 'I felt bored.' },
          { left: 'The story was full of action.', right: 'I felt excited.' },
          { left: 'Nobody expected the ending.', right: 'I felt surprised.' },
          { left: 'I want to learn more about it.', right: 'I felt interested.' },
        ],
        explanation: {
          vi: 'Tả cảm xúc của người → dùng tính từ đuôi -ed.',
          en: "People's feelings use -ed adjectives.",
        },
      },
      {
        id: 'l2b-g-04-vocab-ex10',
        type: 'fill-blank',
        sentence: "I didn't read the whole article. I only read the ___.",
        acceptedAnswers: ['headline', 'headlines'],
        hint: 'the title of a news story',
        explanation: {
          vi: 'headline = tiêu đề in to ở đầu bản tin.',
          en: 'The headline is the big title of a news story.',
        },
      },
      {
        id: 'l2b-g-04-vocab-ex11',
        type: 'listen-type',
        audioText: 'You should watch it. The soundtrack is amazing.',
        acceptedAnswers: ['You should watch it. The soundtrack is amazing.'],
        explanation: {
          vi: "Nghe rõ 'soundtrack' (nhạc phim) và 'amazing' (tuyệt vời).",
          en: "Listen for 'soundtrack' and 'amazing'.",
        },
      },
      {
        id: 'l2b-g-04-vocab-ex12',
        type: 'speak-sentence',
        sentence: "I'd recommend this comedy. It's really funny.",
        translationVi: 'Mình giới thiệu phim hài này. Nó rất vui.',
        explanation: {
          vi: 'Nhấn đúng trọng âm: re-com-MEND, COM-e-dy, FUN-ny.',
          en: 'Stress: re-com-MEND, COM-e-dy, FUN-ny.',
        },
      },
    ],
    miniTest: [],
  },
]
