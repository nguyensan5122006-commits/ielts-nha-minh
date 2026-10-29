/**
 * level-3-grammar-lessons-part2.ts — KHU "NGỮ PHÁP" · LEVEL 3 (B1 – B2, band 5.0 – 6.5) · PHẦN 2
 * ----------------------------------------------------------------------------
 * Bài ngữ pháp viết riêng cho trang /grammar (không nằm trong chặng nào của lộ trình).
 * Mỗi bài: category 'grammar', track 'general' (tính XP cho track tổng quát).
 *
 * Danh sách bài:
 *   gr-l3-relative-clauses   Mệnh đề quan hệ: who, which, that, whose, where, when
 *   gr-l3-reported-speech    Câu tường thuật: say/tell, lùi thì, câu hỏi tường thuật, reporting verbs
 *   gr-l3-modals-deduction   Suy đoán: must, might, could, can't (+ have V3) và nói về tương lai
 *   gr-l3-nominalisation     Cụm danh từ & danh từ hoá cho IELTS Writing
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ (cấu trúc, lỗi hay gặp, cách dùng trong IELTS)
 *   - exercises     : 12 bài (chọn, điền, ghép, sắp xếp, nghe, nói 2 bài, viết 1 bài AI chấm)
 *   - miniTest      : [] (không có mini-test)
 *
 * Quy ước id: bài "gr-l3-<chủ đề>", bài tập "gr-l3-<chủ đề>-ex<số>".
 * Toàn bộ nội dung tự soạn, không chép sách.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level3GrammarLessonsPart2: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — MỆNH ĐỀ QUAN HỆ
   * ======================================================================== */
  {
    id: 'gr-l3-relative-clauses',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 13,
    title: { vi: 'Mệnh đề quan hệ: who, which, that, whose, where', en: 'Relative clauses: who, which, that, whose, where' },
    description: {
      vi: 'Gộp hai câu ngắn thành một câu dài, rõ nghĩa — kỹ năng giúp tăng điểm ngữ pháp IELTS.',
      en: 'Combine two short sentences into one clear, longer sentence — a skill that lifts your IELTS grammar score.',
    },
    teachingCards: [
      {
        title: { vi: 'Chọn đúng đại từ quan hệ', en: 'Choosing the relative pronoun' },
        body: {
          vi: '**who** = người · **which** = vật, sự việc · **that** = người hoặc vật (chỉ trong mệnh đề xác định)\n**whose** = của ai/của cái gì · **where** = nơi chốn · **when** = thời gian\nĐặt mệnh đề **ngay sau danh từ** nó bổ nghĩa.',
          en: '**who** = people · **which** = things, ideas · **that** = people or things (defining clauses only)\n**whose** = possession · **where** = places · **when** = times\nPut the clause **right after the noun** it describes.',
        },
        examples: [
          { en: 'Students who sleep well usually concentrate better.', vi: 'Học sinh ngủ đủ giấc thường tập trung tốt hơn.' },
          { en: 'This is the village where my grandmother grew up.', vi: 'Đây là ngôi làng nơi bà tôi lớn lên.' },
          { en: 'I have a friend whose father is a pilot.', vi: 'Tôi có một người bạn có bố là phi công.' },
        ],
      },
      {
        title: { vi: 'Xác định hay không xác định?', en: 'Defining or non-defining?' },
        body: {
          vi: '**Xác định**: cần để biết đang nói về ai/cái gì → **không dấu phẩy**, dùng được **that**.\n**Không xác định**: chỉ thêm thông tin → **có dấu phẩy**, **không dùng that**.\nSai: "Hanoi, that is my hometown, is busy."\nĐúng: "Hanoi, **which** is my hometown, is busy."',
          en: '**Defining**: tells us which person/thing → **no commas**, **that** is fine.\n**Non-defining**: extra information → **commas**, **never that**.\nWrong: "Hanoi, that is my hometown, is busy."\nRight: "Hanoi, **which** is my hometown, is busy."',
        },
        examples: [
          { en: 'The bus that goes to the airport leaves every hour.', vi: 'Chuyến xe buýt đi sân bay chạy mỗi giờ một chuyến.' },
          { en: 'My uncle, who is a doctor, works night shifts.', vi: 'Chú tôi, một bác sĩ, làm ca đêm.' },
        ],
      },
      {
        title: { vi: 'Lược bỏ đại từ & gộp câu khi viết', en: 'Dropping the pronoun & combining sentences' },
        body: {
          vi: 'Khi đại từ là **tân ngữ** của mệnh đề, có thể **bỏ** nó (chỉ với mệnh đề xác định):\n"The book **(that)** I bought is useful."\nTrong IELTS Writing, gộp 2 câu ngắn bằng mệnh đề quan hệ giúp câu **phức tạp hơn** mà vẫn rõ ràng.',
          en: 'When the pronoun is the **object** of the clause, you can **leave it out** (defining clauses only):\n"The book **(that)** I bought is useful."\nIn IELTS Writing, joining two short sentences with a relative clause makes your writing **more complex** but still clear.',
        },
        examples: [
          { en: 'The course I took last year was free.', vi: 'Khoá học tôi tham gia năm ngoái miễn phí.' },
          { en: 'Cities which invest in public transport have less traffic.', vi: 'Những thành phố đầu tư vào giao thông công cộng ít tắc đường hơn.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-relative-clauses-ex01',
        type: 'multiple-choice',
        question: 'Doctors ___ work night shifts often feel tired.',
        options: ['which', 'who', 'whose', 'where'],
        correctIndex: 1,
        explanation: { vi: '"Doctors" là người → dùng who.', en: '"Doctors" are people → use who.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex02',
        type: 'fill-blank',
        sentence: 'This is the café ___ we first met.',
        acceptedAnswers: ['where'],
        hint: '(nơi chốn)',
        explanation: { vi: '"the café" là nơi chốn, sau đó là mệnh đề đầy đủ → where.', en: '"the café" is a place followed by a full clause → where.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex03',
        type: 'multiple-choice',
        question: 'I met a woman ___ son studies in my class.',
        options: ['who', 'whose', 'which', 'that'],
        correctIndex: 1,
        explanation: { vi: '"con trai của người phụ nữ đó" → sở hữu → whose.', en: '"the woman\'s son" shows possession → whose.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Da Lat, that is in the mountains, is cool all year.',
          'Da Lat which is in the mountains is cool all year.',
          'Da Lat, which is in the mountains, is cool all year.',
          'Da Lat, who is in the mountains, is cool all year.',
        ],
        correctIndex: 2,
        explanation: { vi: 'Thông tin thêm về một nơi duy nhất → có dấu phẩy, dùng which, không dùng that.', en: 'Extra information about a unique place → commas and which, never that.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex05',
        type: 'true-false',
        statement: 'In "The laptop I bought last month is already broken", a relative pronoun has been left out.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: { vi: '"that/which" đã bị lược vì là tân ngữ của "bought".', en: '"that/which" is omitted because it is the object of "bought".' },
      },
      {
        id: 'gr-l3-relative-clauses-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối phần đầu với phần cuối thích hợp.', en: 'Match each beginning with the best ending.' },
        pairs: [
          { left: 'A pharmacist is a person', right: 'who prepares and sells medicine.' },
          { left: 'A library is a place', right: 'where you can borrow books.' },
          { left: 'Tet is the time', right: 'when families get together.' },
          { left: 'A smartphone is a device', right: 'which can connect to the internet.' },
          { left: 'An orphan is a child', right: 'whose parents have died.' },
        ],
        explanation: { vi: 'who: người · where: nơi · when: thời gian · which: vật · whose: sở hữu.', en: 'who: people · where: places · when: times · which: things · whose: possession.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex07',
        type: 'arrange-words',
        translationVi: 'Những công ty cho phép làm việc tại nhà thường giữ chân nhân viên lâu hơn.',
        correctSentence: 'Companies which allow remote work often keep their staff longer.',
        extraWords: ['who', 'where'],
        explanation: { vi: '"Companies" là tổ chức (vật) → which, đặt ngay sau danh từ.', en: '"Companies" are things/organisations → which, right after the noun.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex08',
        type: 'fill-blank',
        sentence: 'My grandfather, ___ is eighty, still goes swimming every morning.',
        acceptedAnswers: ['who'],
        explanation: { vi: 'Mệnh đề có dấu phẩy về một người → who (không dùng that).', en: 'Non-defining clause about a person → who (not that).' },
      },
      {
        id: 'gr-l3-relative-clauses-ex09',
        type: 'listen-choose',
        audioText: 'The students who finished the project early received extra marks.',
        question: 'Who received extra marks?',
        options: ['All of the students', 'Only the students who finished early', 'The teacher', 'Students who started late'],
        correctIndex: 1,
        explanation: { vi: 'Mệnh đề xác định "who finished early" giới hạn nhóm học sinh.', en: 'The defining clause "who finished early" limits which students.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex10',
        type: 'speak-sentence',
        sentence: 'People who exercise regularly tend to sleep better.',
        translationVi: 'Những người tập thể dục đều đặn thường ngủ ngon hơn.',
        explanation: { vi: 'Đọc liền "people who" và nhấn vào "regularly", "better".', en: 'Link "people who" and stress "regularly" and "better".' },
      },
      {
        id: 'gr-l3-relative-clauses-ex11',
        type: 'speak-answer',
        question: 'Describe a person who has influenced you. What kind of person is he or she?',
        tipsVi: 'Dùng ít nhất 2 mệnh đề quan hệ: "someone who…", "a teacher whose…", "the town where…". Nói 3–4 câu.',
        sampleAnswer:
          'The person who has influenced me most is my aunt, who is a primary school teacher. She is someone whose patience I really admire. She lives in the small town where I spent my summers, and she taught me to read before I started school.',
        recordSeconds: 50,
        explanation: { vi: 'Mệnh đề quan hệ giúp câu trả lời dài và phức tạp hơn một cách tự nhiên.', en: 'Relative clauses make your answer longer and more complex naturally.' },
      },
      {
        id: 'gr-l3-relative-clauses-ex12',
        type: 'write-answer',
        prompt:
          'Combine each pair into ONE sentence using a relative clause, then add one sentence of your own.\n1. Many young people move to big cities. They want better jobs.\n2. Ho Chi Minh City is the largest city in Vietnam. It has serious traffic problems.\n3. Some parents work long hours. Their children often spend time alone.',
        tipsVi: 'Câu 1: who (xác định, không phẩy). Câu 2: which (có phẩy). Câu 3: whose. Cuối cùng viết 1 câu tự do có where hoặc when.',
        minWords: 40,
        sampleAnswer:
          'Many young people who want better jobs move to big cities. Ho Chi Minh City, which is the largest city in Vietnam, has serious traffic problems. Parents whose jobs involve long hours often leave their children alone. I prefer small towns where life is quieter and cheaper.',
        explanation: { vi: 'Kiểm tra: đúng đại từ, dấu phẩy ở câu 2, không dùng that sau dấu phẩy.', en: 'Check: correct pronoun, commas in sentence 2, no "that" after a comma.' },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — CÂU TƯỜNG THUẬT
   * ======================================================================== */
  {
    id: 'gr-l3-reported-speech',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 13,
    title: { vi: 'Câu tường thuật', en: 'Reported speech' },
    description: {
      vi: 'Thuật lại lời người khác cho đúng: say/tell, lùi thì, câu hỏi tường thuật và các động từ tường thuật.',
      en: 'Report what people said correctly: say/tell, tense shifts, reported questions and reporting verbs.',
    },
    teachingCards: [
      {
        title: { vi: 'Say hay tell? Lùi thì thế nào?', en: 'Say or tell? How do tenses shift?' },
        body: {
          vi: '**say (that)** + mệnh đề · **tell + người + (that)**. Sai: "She said me…"\nĐộng từ tường thuật ở quá khứ → thường **lùi một thì**:\nam/is → **was** · will → **would** · can → **could** · past/present perfect → **had + V3**\nĐổi đại từ và thời gian: today → **that day**, tomorrow → **the next day**.',
          en: '**say (that)** + clause · **tell + person + (that)**. Wrong: "She said me…"\nWith a past reporting verb, tenses usually **move back**:\nam/is → **was** · will → **would** · can → **could** · past/present perfect → **had + past participle**\nChange pronouns and time words: today → **that day**, tomorrow → **the next day**.',
        },
        examples: [
          { en: '"I\'m tired." → She said (that) she was tired.', vi: '"Tôi mệt." → Cô ấy nói rằng cô ấy mệt.' },
          { en: '"I will call you tomorrow." → He told me he would call me the next day.', vi: '"Mai anh sẽ gọi em." → Anh ấy bảo sẽ gọi cho tôi vào hôm sau.' },
        ],
      },
      {
        title: { vi: 'Câu hỏi tường thuật', en: 'Reported questions' },
        body: {
          vi: 'Câu hỏi Yes/No → **ask if / whether** · câu hỏi Wh- → **ask + wh-**.\nTrật tự như **câu khẳng định** (chủ ngữ + động từ), **không** dùng do/did, **không** dấu hỏi.\nSai: "She asked where did I live?"\nĐúng: "She asked where **I lived**."\n**Không bắt buộc lùi thì** khi điều đó vẫn đúng: "He said the museum **opens** at nine."',
          en: 'Yes/No questions → **ask if / whether** · Wh- questions → **ask + wh-word**.\nUse **statement order** (subject + verb), **no** do/did, **no** question mark.\nWrong: "She asked where did I live?"\nRight: "She asked where **I lived**."\nBackshift is **optional** if it is still true: "He said the museum **opens** at nine."',
        },
        examples: [
          { en: '"Do you like your job?" → He asked if I liked my job.', vi: '"Bạn có thích công việc không?" → Anh ấy hỏi tôi có thích công việc không.' },
          { en: '"When does the class start?" → I asked when the class started.', vi: '"Lớp bắt đầu khi nào?" → Tôi hỏi lớp bắt đầu khi nào.' },
        ],
      },
      {
        title: { vi: 'Động từ tường thuật: hay hơn "said"', en: 'Reporting verbs: better than "said"' },
        body: {
          vi: '**advise / warn / remind + người + to V**: The doctor advised me **to rest**.\n**promise / agree / refuse + to V**: He promised **to help**.\n**suggest + V-ing** hoặc **suggest that + S + V**: She suggested **taking** a taxi.\n**explain (that)** / **explain + wh-** (không "explain me").',
          en: '**advise / warn / remind + person + to-infinitive**: The doctor advised me **to rest**.\n**promise / agree / refuse + to-infinitive**: He promised **to help**.\n**suggest + -ing** or **suggest that + subject + verb**: She suggested **taking** a taxi.\n**explain (that)** / **explain + wh-** (not "explain me").',
        },
        examples: [
          { en: 'My teacher warned us not to leave the essay until the last minute.', vi: 'Thầy giáo dặn chúng tôi đừng để bài luận đến phút cuối.' },
          { en: 'My friend suggested studying together on Saturdays.', vi: 'Bạn tôi gợi ý học cùng nhau vào thứ Bảy.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-reported-speech-ex01',
        type: 'multiple-choice',
        question: 'My manager ___ me that the meeting was cancelled.',
        options: ['said', 'told', 'spoke', 'asked'],
        correctIndex: 1,
        explanation: { vi: 'Có người nghe ngay sau (me) → told.', en: 'A listener (me) follows the verb → told.' },
      },
      {
        id: 'gr-l3-reported-speech-ex02',
        type: 'fill-blank',
        sentence: '"I am learning Korean." → Linh said that she ___ learning Korean.',
        acceptedAnswers: ['was'],
        explanation: { vi: 'Lùi thì: am → was.', en: 'Backshift: am → was.' },
      },
      {
        id: 'gr-l3-reported-speech-ex03',
        type: 'fill-blank',
        sentence: '"We will finish the report." → They said they ___ finish the report.',
        acceptedAnswers: ['would'],
        explanation: { vi: 'Lùi thì: will → would.', en: 'Backshift: will → would.' },
      },
      {
        id: 'gr-l3-reported-speech-ex04',
        type: 'multiple-choice',
        question: '"Where do you work?" → The interviewer asked me ___.',
        options: ['where do I work', 'where did I work', 'where I worked', 'where I worked?'],
        correctIndex: 2,
        explanation: { vi: 'Câu hỏi tường thuật: trật tự khẳng định, không do/did, không dấu hỏi.', en: 'Reported question: statement order, no do/did, no question mark.' },
      },
      {
        id: 'gr-l3-reported-speech-ex05',
        type: 'arrange-words',
        translationVi: 'Cô ấy hỏi tôi đã từng đến Đà Nẵng chưa.',
        correctSentence: 'She asked me if I had ever been to Da Nang.',
        extraWords: ['did', 'have'],
        explanation: { vi: 'Yes/No → if; hiện tại hoàn thành lùi thành had been.', en: 'Yes/No → if; present perfect moves back to had been.' },
      },
      {
        id: 'gr-l3-reported-speech-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ tường thuật với cấu trúc đúng.', en: 'Match each reporting verb with the correct pattern.' },
        pairs: [
          { left: 'The doctor advised', right: 'me to drink more water.' },
          { left: 'My brother promised', right: 'to pay me back on Friday.' },
          { left: 'Our guide suggested', right: 'visiting the market early.' },
          { left: 'The teacher explained', right: 'that the test was optional.' },
          { left: 'The sign warned', right: 'drivers not to stop on the bridge.' },
        ],
        explanation: { vi: 'advise/warn + người + to V · promise + to V · suggest + V-ing · explain that.', en: 'advise/warn + person + to V · promise + to V · suggest + -ing · explain that.' },
      },
      {
        id: 'gr-l3-reported-speech-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She suggested to go by train.',
          'She suggested going by train.',
          'She suggested me to go by train.',
          'She suggested go by train.',
        ],
        correctIndex: 1,
        explanation: { vi: 'suggest + V-ing (hoặc suggest that…), không dùng "suggest to V".', en: 'suggest + -ing (or suggest that…), not "suggest to V".' },
      },
      {
        id: 'gr-l3-reported-speech-ex08',
        type: 'true-false',
        statement: '"The teacher said the Earth goes around the Sun." is a correct sentence even without backshift.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: { vi: 'Sự thật luôn đúng → không bắt buộc lùi thì.', en: 'A general truth → backshift is optional.' },
      },
      {
        id: 'gr-l3-reported-speech-ex09',
        type: 'fill-blank',
        sentence: '"I can\'t come today." → He said he couldn\'t come ___ day.',
        acceptedAnswers: ['that'],
        explanation: { vi: 'today → that day khi tường thuật vào ngày khác.', en: 'today → that day when reported later.' },
      },
      {
        id: 'gr-l3-reported-speech-ex10',
        type: 'listen-type',
        audioText: 'She told me she had already booked the tickets.',
        acceptedAnswers: ['She told me she had already booked the tickets.', 'She told me that she had already booked the tickets.'],
        explanation: { vi: 'told + người; quá khứ đơn/hoàn thành lùi thành had booked.', en: 'told + person; the verb moves back to had booked.' },
      },
      {
        id: 'gr-l3-reported-speech-ex11',
        type: 'speak-sentence',
        sentence: 'My doctor advised me to get more sleep.',
        translationVi: 'Bác sĩ khuyên tôi ngủ nhiều hơn.',
        explanation: { vi: 'Phát âm rõ /z/ trong "advised" và âm /p/ cuối "sleep".', en: 'Say the /zd/ in "advised" and the final /p/ in "sleep".' },
      },
      {
        id: 'gr-l3-reported-speech-ex12',
        type: 'speak-answer',
        question: 'What is the best piece of advice someone has given you? Who gave it to you?',
        tipsVi: 'Dùng told me that…, advised me to…, said that… Kể ai nói, nói gì, và bạn làm theo thế nào.',
        sampleAnswer:
          'The best advice I have received came from my grandmother. She told me that I should save a little money every month. She also advised me not to buy things just because my friends had them. I followed her advice, and now I have enough savings for a short course.',
        recordSeconds: 50,
        explanation: { vi: 'Dùng nhiều động từ tường thuật giúp câu trả lời đa dạng ngữ pháp.', en: 'Using different reporting verbs shows grammatical range.' },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — SUY ĐOÁN: MUST, MIGHT, COULD, CAN'T
   * ======================================================================== */
  {
    id: 'gr-l3-modals-deduction',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Suy đoán: must, might, could, can\'t', en: 'Deduction: must, might, could, can\'t' },
    description: {
      vi: 'Nói mức độ chắc chắn về hiện tại, quá khứ và tương lai — rất có ích cho IELTS Speaking Part 3.',
      en: 'Show how certain you are about the present, past and future — very useful for IELTS Speaking Part 3.',
    },
    teachingCards: [
      {
        title: { vi: 'Thang chắc chắn ở hiện tại', en: 'A certainty scale for the present' },
        body: {
          vi: '**must + V** = gần như chắc chắn **đúng** (có bằng chứng)\n**might / may / could + V** = **có thể** (khoảng 50%)\n**can\'t + V** = gần như chắc chắn **không đúng**\nLưu ý: phủ định của "must" khi suy đoán là **can\'t**, không phải "mustn\'t".',
          en: '**must + verb** = almost certainly **true** (you have evidence)\n**might / may / could + verb** = **possibly** (about 50%)\n**can\'t + verb** = almost certainly **not true**\nNote: the opposite of deduction "must" is **can\'t**, not "mustn\'t".',
        },
        examples: [
          { en: 'The lights are off. They must be asleep.', vi: 'Đèn tắt rồi. Chắc hẳn họ đã ngủ.' },
          { en: 'He might be stuck in traffic.', vi: 'Có thể anh ấy đang kẹt xe.' },
          { en: 'She can\'t be hungry — she\'s just had lunch.', vi: 'Cô ấy không thể đói được — vừa ăn trưa xong mà.' },
        ],
      },
      {
        title: { vi: 'Suy đoán về quá khứ: + have V3', en: 'Past deduction: + have + past participle' },
        body: {
          vi: '**must have + V3** = chắc chắn đã…\n**might / could have + V3** = có lẽ đã…\n**can\'t / couldn\'t have + V3** = chắc chắn đã không…\nKhi nói nhanh: "must\'ve", "might\'ve" — nghe như /ˈmʌs.təv/.',
          en: '**must have + past participle** = surely did…\n**might / could have + past participle** = perhaps did…\n**can\'t / couldn\'t have + past participle** = surely didn\'t…\nIn fast speech: "must\'ve", "might\'ve" — sounds like /ˈmʌs.təv/.',
        },
        examples: [
          { en: 'The road is wet. It must have rained last night.', vi: 'Đường ướt. Chắc hẳn đêm qua trời mưa.' },
          { en: 'I can\'t find my keys. I might have left them at work.', vi: 'Tôi không tìm thấy chìa khoá. Có lẽ tôi để quên ở chỗ làm.' },
        ],
      },
      {
        title: { vi: 'Nói về tương lai trong Part 3', en: 'Speculating about the future in Part 3' },
        body: {
          vi: 'Giám khảo hay hỏi "Do you think… in the future?". Đừng chỉ dùng "will":\n**will probably / definitely** · **is likely to / is unlikely to + V**\n**might well + V** = khá có khả năng\n**could** = có thể xảy ra',
          en: 'Examiners often ask "Do you think… in the future?". Don\'t just use "will":\n**will probably / definitely** · **is likely to / is unlikely to + verb**\n**might well + verb** = quite possibly\n**could** = it is possible',
        },
        examples: [
          { en: 'More people are likely to work from home in the future.', vi: 'Trong tương lai, nhiều người có khả năng làm việc tại nhà hơn.' },
          { en: 'Paper books might well become less popular, but they won\'t disappear.', vi: 'Sách giấy có lẽ sẽ kém phổ biến hơn, nhưng sẽ không biến mất.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-modals-deduction-ex01',
        type: 'multiple-choice',
        question: 'She has worked here for twenty years. She ___ know everyone in the company.',
        options: ['must', "can't", 'mustn\'t', 'should'],
        correctIndex: 0,
        explanation: { vi: 'Bằng chứng mạnh (20 năm) → gần như chắc chắn → must.', en: 'Strong evidence (twenty years) → almost certain → must.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex02',
        type: 'multiple-choice',
        question: 'That ___ be Minh at the door. He is on holiday in Japan.',
        options: ['must', 'might', "can't", 'could'],
        correctIndex: 2,
        explanation: { vi: 'Anh ấy đang ở Nhật → chắc chắn không phải → can\'t.', en: 'He is in Japan → certainly not him → can\'t.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex03',
        type: 'fill-blank',
        sentence: 'I\'m not sure where Lan is. She ___ be at the library.',
        acceptedAnswers: ['might', 'may', 'could'],
        explanation: { vi: 'Không chắc chắn → might / may / could.', en: 'Not sure → might / may / could.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex04',
        type: 'fill-blank',
        sentence: 'The grass is wet. It must ___ rained during the night.',
        acceptedAnswers: ['have'],
        explanation: { vi: 'Suy đoán về quá khứ: must have + V3.', en: 'Past deduction: must have + past participle.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex05',
        type: 'multiple-choice',
        question: 'He failed the test, but he studied every day. The test ___ very difficult.',
        options: ['must be', 'must have been', "can't have been", 'might be'],
        correctIndex: 1,
        explanation: { vi: 'Bài thi đã diễn ra (quá khứ) và có lý do rõ → must have been.', en: 'The test is in the past and the reason is clear → must have been.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex06',
        type: 'true-false',
        statement: 'In deduction, the opposite of "must be" is "mustn\'t be".',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: { vi: 'Phủ định khi suy đoán là "can\'t be"; "mustn\'t" nghĩa là cấm.', en: 'The deduction opposite is "can\'t be"; "mustn\'t" means not allowed.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex07',
        type: 'match-pairs',
        instruction: { vi: 'Nối tình huống với câu suy đoán hợp lý.', en: 'Match each situation with a logical deduction.' },
        pairs: [
          { left: 'Her eyes are red and she keeps yawning.', right: 'She must be exhausted.' },
          { left: 'He hasn\'t replied, but he often checks messages late.', right: 'He might reply tonight.' },
          { left: 'The shop is dark and the door is locked.', right: 'It can\'t be open now.' },
          { left: 'My wallet isn\'t in my bag.', right: 'I might have dropped it on the bus.' },
        ],
        explanation: { vi: 'Chọn must/might/can\'t theo mức bằng chứng; quá khứ dùng have V3.', en: 'Choose must/might/can\'t by the evidence; use have + V3 for the past.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex08',
        type: 'arrange-words',
        translationVi: 'Robot có khả năng sẽ làm nhiều công việc nhà hơn trong tương lai.',
        correctSentence: 'Robots are likely to do more housework in the future.',
        extraWords: ['must', 'doing'],
        explanation: { vi: 'be likely to + V nguyên mẫu để dự đoán tương lai.', en: 'be likely to + base verb for future predictions.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex09',
        type: 'listen-choose',
        audioText: 'Woman: Where is Nam? The meeting started ten minutes ago.\nMan: He can\'t have forgotten. I reminded him this morning. He must be stuck in traffic.',
        question: 'What does the man think?',
        options: ['Nam forgot the meeting.', 'Nam is probably in traffic.', 'Nam is ill.', 'The meeting was cancelled.'],
        correctIndex: 1,
        explanation: { vi: '"can\'t have forgotten" = chắc chắn không quên; "must be stuck in traffic".', en: '"can\'t have forgotten" = surely didn\'t forget; "must be stuck in traffic".' },
      },
      {
        id: 'gr-l3-modals-deduction-ex10',
        type: 'speak-sentence',
        sentence: 'They must have left early to avoid the traffic.',
        translationVi: 'Chắc hẳn họ đã đi sớm để tránh kẹt xe.',
        explanation: { vi: 'Nói "must have" nối thành /ˈmʌs.təv/, nhấn "early".', en: 'Link "must have" as /ˈmʌs.təv/ and stress "early".' },
      },
      {
        id: 'gr-l3-modals-deduction-ex11',
        type: 'speak-answer',
        question: 'Do you think people will still go to shops in twenty years\' time? Why or why not?',
        tipsVi: 'Trả lời kiểu Part 3: ý kiến + lý do + ví dụ. Dùng is likely to, might well, could, probably, unlikely. Tránh chỉ dùng "will".',
        sampleAnswer:
          'I think people are likely to buy most everyday items online, because it saves time. However, shops probably won\'t disappear completely. People might well keep visiting shops for things they want to touch or try on, such as clothes. Small local markets could also survive because they are part of community life.',
        recordSeconds: 60,
        explanation: { vi: 'Thang chắc chắn đa dạng giúp câu trả lời Part 3 thuyết phục và tự nhiên.', en: 'A range of certainty language makes Part 3 answers natural and convincing.' },
      },
      {
        id: 'gr-l3-modals-deduction-ex12',
        type: 'write-answer',
        prompt:
          'IELTS Writing Task 2 practice: "In the future, most children will study at home with computers rather than at school." Write 3–4 sentences giving your prediction, using at least three different ways to show certainty (e.g. is likely to, might, will probably, is unlikely to).',
        tipsVi: 'Không nói tuyệt đối "will" cho mọi câu. Mỗi câu một mức chắc chắn khác nhau, kèm lý do ngắn.',
        minWords: 50,
        sampleAnswer:
          'Online learning is likely to play a bigger role in education. However, schools are unlikely to disappear, because children need to develop social skills with their classmates. Some families might choose home learning for older teenagers. In my view, most children will probably combine both, studying online for some subjects and attending school for others.',
        explanation: { vi: 'Bài tốt dùng nhiều mức chắc chắn, tránh khẳng định quá mạnh.', en: 'A good answer varies certainty and avoids overgeneralising.' },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — CỤM DANH TỪ & DANH TỪ HOÁ
   * ======================================================================== */
  {
    id: 'gr-l3-nominalisation',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 13,
    title: { vi: 'Cụm danh từ & danh từ hoá', en: 'Noun phrases & nominalisation' },
    description: {
      vi: 'Biến động từ và tính từ thành danh từ để câu văn học thuật hơn trong IELTS Writing — mà không rườm rà.',
      en: 'Turn verbs and adjectives into nouns for a more academic IELTS Writing style — without overdoing it.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ động từ / tính từ sang danh từ', en: 'From verbs and adjectives to nouns' },
        body: {
          vi: 'Một số cặp hay gặp trong IELTS:\nincrease → **an increase** · decline → **a decline** · grow → **growth**\nreduce → **a reduction** · improve → **an improvement**\nimportant → **importance** · able → **ability** · popular → **popularity**\nNhiều từ giữ nguyên hình thức (increase, rise, fall) — chỉ thêm **a / the** và đổi vị trí.',
          en: 'Common pairs in IELTS:\nincrease → **an increase** · decline → **a decline** · grow → **growth**\nreduce → **a reduction** · improve → **an improvement**\nimportant → **importance** · able → **ability** · popular → **popularity**\nMany words keep the same form (increase, rise, fall) — just add **a / the** and move them.',
        },
        examples: [
          { en: 'Online shopping grew quickly. → There was rapid growth in online shopping.', vi: 'Mua sắm trực tuyến tăng nhanh. → Có sự tăng trưởng nhanh trong mua sắm trực tuyến.' },
          { en: 'Exercise is important. → The importance of exercise is clear.', vi: 'Tập thể dục quan trọng. → Tầm quan trọng của việc tập thể dục là rõ ràng.' },
        ],
      },
      {
        title: { vi: 'Xây cụm danh từ', en: 'Building noun phrases' },
        body: {
          vi: 'Trạng từ → **tính từ** đứng trước danh từ: rose **sharply** → a **sharp** rise.\nThêm giới từ phía sau:\n**a rise / fall / increase in** + thứ thay đổi\n**the growth / importance / cost of** + danh từ\nMẫu Task 1: "**There was a sharp rise in** the number of tourists."',
          en: 'Adverb → **adjective** before the noun: rose **sharply** → a **sharp** rise.\nAdd a preposition after it:\n**a rise / fall / increase in** + the thing that changed\n**the growth / importance / cost of** + noun\nTask 1 pattern: "**There was a sharp rise in** the number of tourists."',
        },
        examples: [
          { en: 'Car use fell slightly. → There was a slight fall in car use.', vi: 'Việc sử dụng ô tô giảm nhẹ. → Có sự giảm nhẹ trong việc sử dụng ô tô.' },
          { en: 'The cost of housing is a major concern for young people.', vi: 'Chi phí nhà ở là mối lo lớn của người trẻ.' },
        ],
      },
      {
        title: { vi: 'Dùng vừa đủ', en: 'Don\'t overdo it' },
        body: {
          vi: 'Danh từ hoá giúp câu **gọn và trang trọng**, rất hợp Task 1 (số liệu) và mở bài Task 2.\nNhưng đừng biến **mọi** câu thành chuỗi danh từ dài — người đọc sẽ khó hiểu.\nTrộn **câu động từ** rõ ràng với **cụm danh từ**. Speaking thì nói tự nhiên, ít danh từ hoá hơn.',
          en: 'Nominalisation makes sentences **concise and formal** — great for Task 1 data and Task 2 introductions.\nBut don\'t turn **every** sentence into a long chain of nouns — it becomes hard to read.\nMix clear **verb sentences** with **noun phrases**. When speaking, use less of it.',
        },
        examples: [
          { en: 'The reduction in plastic use has helped local beaches.', vi: 'Việc giảm sử dụng nhựa đã giúp các bãi biển địa phương.' },
          { en: 'Many people worry about the rising cost of living.', vi: 'Nhiều người lo lắng về chi phí sinh hoạt ngày càng tăng.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-nominalisation-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với dạng danh từ của nó.', en: 'Match each word with its noun form.' },
        pairs: [
          { left: 'grow', right: 'growth' },
          { left: 'reduce', right: 'reduction' },
          { left: 'important', right: 'importance' },
          { left: 'able', right: 'ability' },
          { left: 'improve', right: 'improvement' },
        ],
        explanation: { vi: 'Các đuôi danh từ hay gặp: -th, -tion, -ance, -ity, -ment.', en: 'Common noun endings: -th, -tion, -ance, -ity, -ment.' },
      },
      {
        id: 'gr-l3-nominalisation-ex02',
        type: 'fill-blank',
        sentence: 'There was a sharp ___ in the price of rice in 2023.',
        acceptedAnswers: ['rise', 'increase'],
        explanation: { vi: 'Sau "a sharp" cần danh từ chỉ sự tăng: rise / increase.', en: '"a sharp" needs a noun of change: rise / increase.' },
      },
      {
        id: 'gr-l3-nominalisation-ex03',
        type: 'multiple-choice',
        question: 'The number of visitors fell slightly. → There was a ___ fall in the number of visitors.',
        options: ['slightly', 'slight', 'slighter', 'slightness'],
        correctIndex: 1,
        explanation: { vi: 'Trước danh từ "fall" cần tính từ: slight.', en: 'Before the noun "fall" we need an adjective: slight.' },
      },
      {
        id: 'gr-l3-nominalisation-ex04',
        type: 'multiple-choice',
        question: 'Choose the correct preposition: "a significant increase ___ the number of electric cars"',
        options: ['of', 'in', 'on', 'at'],
        correctIndex: 1,
        explanation: { vi: 'an increase / rise / fall + in + thứ thay đổi.', en: 'an increase / rise / fall + in + the thing that changes.' },
      },
      {
        id: 'gr-l3-nominalisation-ex05',
        type: 'fill-blank',
        sentence: 'Many parents do not realise the ___ of sleep for teenagers.',
        acceptedAnswers: ['importance'],
        hint: '(important)',
        explanation: { vi: 'Sau "the" và trước "of" cần danh từ: importance.', en: 'After "the" and before "of" we need a noun: importance.' },
      },
      {
        id: 'gr-l3-nominalisation-ex06',
        type: 'arrange-words',
        translationVi: 'Có sự tăng trưởng nhanh trong học trực tuyến.',
        correctSentence: 'There has been rapid growth in online learning.',
        extraWords: ['rapidly', 'grow'],
        explanation: { vi: 'Tính từ "rapid" + danh từ "growth" + in.', en: 'Adjective "rapid" + noun "growth" + in.' },
      },
      {
        id: 'gr-l3-nominalisation-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is the best academic version of "Pollution has decreased a lot because the city planted more trees"?',
        options: [
          'The planting of more trees has led to a considerable reduction in pollution.',
          'Pollution decreased very much, trees planted by city.',
          'The reduction of the decreasing of pollution happened by trees.',
          'Pollution is decrease a lot because of tree.',
        ],
        correctIndex: 0,
        explanation: { vi: 'Câu A gọn, đúng ngữ pháp, dùng cụm danh từ hợp lý và rõ nghĩa.', en: 'A is concise, correct and uses clear noun phrases.' },
      },
      {
        id: 'gr-l3-nominalisation-ex08',
        type: 'true-false',
        statement: 'In IELTS Writing, every sentence should be made of long noun phrases to get a high score.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: { vi: 'Lạm dụng danh từ hoá làm câu khó hiểu; nên trộn với câu động từ.', en: 'Too much nominalisation hurts clarity; mix it with verb sentences.' },
      },
      {
        id: 'gr-l3-nominalisation-ex09',
        type: 'listen-choose',
        audioText: 'Between 2010 and 2020, there was a steady decline in the number of people who smoked.',
        question: 'What happened to the number of smokers?',
        options: ['It rose quickly.', 'It went down gradually.', 'It stayed the same.', 'It fell suddenly.'],
        correctIndex: 1,
        explanation: { vi: '"a steady decline" = giảm đều, từ từ.', en: '"a steady decline" = a gradual fall.' },
      },
      {
        id: 'gr-l3-nominalisation-ex10',
        type: 'fill-blank',
        sentence: 'The government\'s plan led to an ___ in air quality.',
        acceptedAnswers: ['improvement'],
        hint: '(improve)',
        explanation: { vi: 'Sau "an" cần danh từ bắt đầu bằng nguyên âm: improvement.', en: '"an" needs a noun starting with a vowel sound: improvement.' },
      },
      {
        id: 'gr-l3-nominalisation-ex11',
        type: 'speak-sentence',
        sentence: 'There was a dramatic increase in the number of tourists.',
        translationVi: 'Có sự gia tăng mạnh mẽ về số lượng khách du lịch.',
        explanation: { vi: 'Danh từ "INcrease" nhấn âm đầu (động từ thì nhấn sau).', en: 'The noun "INcrease" is stressed on the first syllable.' },
      },
      {
        id: 'gr-l3-nominalisation-ex12',
        type: 'write-answer',
        prompt:
          'IELTS Writing Task 1 practice. Rewrite these notes as 3 sentences using noun phrases (e.g. "There was a … in …"):\n- The number of cyclists rose sharply from 2015 to 2020.\n- Bus use fell slightly.\n- Car use stayed stable, then grew gradually.',
        tipsVi: 'Đổi trạng từ thành tính từ (sharply → sharp) và động từ thành danh từ (rose → a rise). Nhớ giới từ "in".',
        minWords: 40,
        sampleAnswer:
          'Between 2015 and 2020, there was a sharp rise in the number of cyclists. At the same time, there was a slight fall in bus use. Car use remained stable at first, but then there was a gradual increase in the number of drivers.',
        explanation: { vi: 'Kiểm tra: tính từ + danh từ + in, và vẫn có câu động từ cho tự nhiên.', en: 'Check: adjective + noun + in, with some verb sentences for balance.' },
      },
    ],
    miniTest: [],
  },
]
