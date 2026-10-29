/**
 * listening-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "BRIDGE" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK IELTS
 * CHẶNG: "LÀM QUEN IELTS LISTENING"
 *
 * Ở level-2-foundation người học đã làm quen điền form, đánh vần, số và bẫy tự sửa
 * ở mức cơ bản. Chặng này đưa họ vào ĐÚNG ĐỊNH DẠNG ĐỀ THẬT của IELTS Listening Part 1:
 *   01 l2b-i-lis-01  Cấu trúc đề Listening + điền form (phòng giữ đồ thất lạc ở nhà ga)
 *   02 l2b-i-lis-02  (bài luyện) Nghe đánh vần chữ cái và con số
 *   03 l2b-i-lis-03  Bẫy gây nhiễu "No, sorry, it's..." (đặt bánh sinh nhật)
 *   04 l2b-i-lis-04  Điền ghi chú: địa chỉ + từ thông dụng không ai đánh vần (thuê phòng)
 *   05 l2b-i-lis-05  Trắc nghiệm A/B/C + một Part 1 trộn 2 dạng câu hỏi (trại hè thể thao)
 *
 * Cấu trúc 1 bài mode 'listening':
 *   teachingCards (chiến thuật) → exercises khởi động → listeningTask (đề nghe kiểu thật)
 *   - listeningTask.segments: mỗi đoạn nghe lại riêng được.
 *   - Mỗi câu hỏi gắn segmentId để có nút "Nghe lại đoạn này".
 * Bài 02 là mode 'practice' (chỉ có thẻ dạy + bài tập, không có task).
 *
 * Quy ước id: bài "l2b-i-lis-NN", bài tập "l2b-i-lis-NN-exMM", câu hỏi task "l2b-i-lis-NN-qM".
 * LƯU Ý cho người soạn: trong audioText, máy đọc coi mọi cụm "Chữ: " là TÊN NGƯỜI NÓI
 * (xem services/text-to-speech.ts), nên không viết dấu hai chấm sau chữ ở chỗ khác.
 * Số trong lời thoại viết bằng chữ như người nói ("three pounds fifty").
 * Kiểu dữ liệu: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeIeltsListeningLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Cấu trúc đề IELTS Listening + điền form Part 1
  //        Bối cảnh: gọi điện báo mất ba lô trên tàu
  // ==========================================================================
  {
    id: "l2b-i-lis-01",
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: "Đề IELTS Listening và dạng điền form", en: "The IELTS Listening test and form completion" },
    description: {
      vi: "Biết bài thi Listening gồm những gì và làm một bài điền form Part 1 theo đúng định dạng thật.",
      en: "Learn what is in the Listening test and complete a real-format Part 1 form.",
    },
    teachingCards: [
      {
        title: { vi: "Bài thi IELTS Listening có gì?", en: "What is in the IELTS Listening test?" },
        body: {
          vi: "**4 phần (Part 1–4), 40 câu, khoảng 30 phút.** Mỗi đoạn chỉ được nghe **1 lần**.\n- **Part 1**: hội thoại đời thường (đặt chỗ, đăng ký, hỏi thông tin).\n- **Part 2**: một người nói về một địa điểm, sự kiện.\n- **Part 3–4**: chủ đề học tập, khó hơn.\nĐáp án đi **theo thứ tự** câu hỏi. Câu sai **không bị trừ điểm** → đừng bỏ trống.",
          en: "**4 parts, 40 questions, about 30 minutes.** You hear each recording **only once**.\n- **Part 1**: an everyday conversation (booking, registering, asking for information).\n- **Part 2**: one person talks about a place or an event.\n- **Parts 3–4**: study topics, harder.\nAnswers come **in order**. Wrong answers **lose no marks**, so never leave a gap empty.",
        },
        examples: [
          { en: "Part 1: a phone call to a lost property office", vi: "Part 1: cuộc gọi tới phòng giữ đồ thất lạc" },
          { en: "Not sure? Write your best guess.", vi: "Không chắc? Hãy viết câu đoán tốt nhất." },
        ],
      },
      {
        title: { vi: "Trước khi nghe: đọc form và đoán", en: "Before you listen: read and predict" },
        body: {
          vi: "Trước mỗi phần có thời gian đọc câu hỏi. Dùng nó để **đoán loại đáp án**:\n- **Surname / Name** → tên riêng, thường được **đánh vần**.\n- **Phone / Date / Time / Price** → **con số**.\n- **a / an** + ___ → danh từ **số ít**; **some** + ___ → thường **số nhiều**.\nGạch chân **từ khoá** quanh chỗ trống để biết đáp án sắp đến.",
          en: "Before each part you get time to read the questions. Use it to **predict the answer type**:\n- **Surname / Name** → a name, often **spelled out**.\n- **Phone / Date / Time / Price** → a **number**.\n- **a / an** + ___ → a **singular** noun; **some** + ___ → often **plural**.\nUnderline **key words** near the gap so you know when the answer is coming.",
        },
        examples: [
          { en: "Surname: ___ → listen for letters", vi: "Họ: ___ → chờ nghe đánh vần" },
          { en: "Inside: a laptop and some ___ → a plural noun", vi: "Bên trong: laptop và vài ___ → danh từ số nhiều" },
        ],
      },
      {
        title: { vi: "Viết đáp án sao cho đúng", en: "Writing your answer correctly" },
        body: {
          vi: "- **Sai chính tả = sai**, kể cả khi bạn nghe đúng.\n- Số có thể viết bằng **chữ số**: 3.50, 8.15, 11.\n- **Không chép lại** từ đã in sẵn trên form. Form ghi 'Colour: ___' → chỉ viết **grey**, không viết 'colour grey'.\n- Chú ý **số ít / số nhiều**: book ≠ books.",
          en: "- **Wrong spelling = wrong answer**, even if you heard it.\n- You can write numbers as **digits**: 3.50, 8.15, 11.\n- **Don't repeat** words already on the form. 'Colour: ___' → write only **grey**, not 'colour grey'.\n- Check **singular / plural**: book ≠ books.",
        },
        examples: [{ en: "Colour: grey ✓   Colour: grey colour ✗", vi: "Chỉ viết phần còn thiếu" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-lis-01-ex01",
        type: 'multiple-choice',
        question: "In the real IELTS Listening test, how many times do you hear each recording? (Nghe mấy lần?)",
        options: ["Once", "Twice", "Three times", "As many times as you like"],
        correctIndex: 0,
        explanation: {
          vi: "Thi thật chỉ nghe 1 lần, nên phải đọc câu hỏi trước.",
          en: "In the real test you hear it once, so read the questions first.",
        },
      },
      {
        id: "l2b-i-lis-01-ex02",
        type: 'true-false',
        statement: "IELTS Listening Part 1 is usually an everyday conversation, for example a phone call.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "Đúng. Part 1 là hội thoại đời thường: đặt chỗ, đăng ký, hỏi thông tin.",
          en: "True. Part 1 is an everyday conversation: booking, registering or asking for information.",
        },
      },
      {
        id: "l2b-i-lis-01-ex03",
        type: 'multiple-choice',
        question: "Form: 'Phone number: ___'. What kind of answer do you expect?",
        options: ["A name", "A number", "A colour", "A place"],
        correctIndex: 1,
        explanation: {
          vi: "Phone number → chờ nghe một dãy số.",
          en: "Phone number → listen for a series of numbers.",
        },
      },
      {
        id: "l2b-i-lis-01-ex04",
        type: 'multiple-choice',
        question: "Form: 'Inside the bag: a laptop and some ___'. What kind of word is missing?",
        options: ["A plural noun, e.g. keys", "A singular noun, e.g. key", "A number", "A verb, e.g. carry"],
        correctIndex: 0,
        explanation: {
          vi: "'some' + danh từ đếm được → thường là số nhiều (keys, books).",
          en: "'Some' + a countable noun → usually plural (keys, books).",
        },
      },
      {
        id: "l2b-i-lis-01-ex05",
        type: 'listen-choose',
        audioText: "Officer: What colour is your bag? Woman: It's grey. It's quite a small bag.",
        question: "Form: 'Colour: ___'. What should you write?",
        options: ["grey", "colour grey", "a grey bag", "small grey"],
        correctIndex: 0,
        explanation: {
          vi: "Chỉ viết phần còn thiếu. Chữ 'Colour' đã có sẵn trên form.",
          en: "Write only the missing part. 'Colour' is already on the form.",
        },
      },
      {
        id: "l2b-i-lis-01-ex06",
        type: 'match-pairs',
        instruction: { vi: "Nối từ với nghĩa tiếng Việt.", en: "Match the words with their Vietnamese meanings." },
        pairs: [
          { left: "lost property office", right: "phòng giữ đồ thất lạc" },
          { left: "leave (left) something", right: "để quên đồ" },
          { left: "backpack", right: "ba lô" },
          { left: "zip", right: "khoá kéo" },
          { left: "collect", right: "đến nhận, lấy về" },
          { left: "photo ID", right: "giấy tờ có ảnh" },
        ],
        explanation: {
          vi: "Các từ này sẽ xuất hiện trong bài nghe chính.",
          en: "You will hear these words in the main recording.",
        },
      },
      {
        id: "l2b-i-lis-01-ex07",
        type: 'speak-sentence',
        sentence: "Could you spell your surname, please?",
        translationVi: "Bạn đánh vần họ của bạn được không?",
        explanation: {
          vi: "Nhấn SPELL và SURname. Giữ âm /l/ cuối của 'spell'.",
          en: "Stress SPELL and SURname. Keep the final /l/ in 'spell'.",
        },
      },
    ],
    listeningTask: {
      instructions: "Questions 1–7. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.",
      strategyTip: {
        vi: "Thi thật chỉ nghe 1 lần. Hãy nghe trọn 1 lượt trước, rồi mới nghe lại đoạn còn sai.",
        en: "In the real test you hear it once. Listen to everything first, then replay only the parts you missed.",
      },
      segments: [
        {
          id: "seg-1",
          lines: [
            { speaker: "Officer", voice: 'gb-male', text: "Good afternoon, Northgate Station lost property office. How can I help?" },
            { speaker: "Helen", voice: 'gb-female', text: "Hello. I left my bag on one of your trains yesterday, and I'm hoping someone has found it." },
            { speaker: "Officer", voice: 'gb-male', text: "Let's see. I'll just take a few details first. What's your name, please?" },
            { speaker: "Helen", voice: 'gb-female', text: "Helen Garside." },
            { speaker: "Officer", voice: 'gb-male', text: "Could you spell your surname for me?" },
            { speaker: "Helen", voice: 'gb-female', text: "Of course. It's G, A, R, S, I, D, E." },
            { speaker: "Officer", voice: 'gb-male', text: "Thank you. And what's the best phone number to contact you?" },
            { speaker: "Helen", voice: 'gb-female', text: "My mobile. It's oh seven seven one two, four six eight, nine three oh." },
            { speaker: "Officer", voice: 'gb-male', text: "Oh seven seven one two, four six eight, nine three oh. Lovely." },
          ],
        },
        {
          id: "seg-2",
          lines: [
            { speaker: "Officer", voice: 'gb-male', text: "Now, can you describe the bag?" },
            { speaker: "Helen", voice: 'gb-female', text: "Yes. It's a small backpack. It's grey, with a red zip on the front." },
            { speaker: "Officer", voice: 'gb-male', text: "Grey with a red zip. And what was inside it?" },
            { speaker: "Helen", voice: 'gb-female', text: "My laptop, which is the most important thing, and some books for my evening course. Oh, and my umbrella was in the side pocket." },
          ],
        },
        {
          id: "seg-3",
          lines: [
            { speaker: "Officer", voice: 'gb-male', text: "Which day did you lose it?" },
            { speaker: "Helen", voice: 'gb-female', text: "Yesterday morning. So that was Tuesday, the eleventh of March." },
            { speaker: "Officer", voice: 'gb-male', text: "And do you remember the time of the train?" },
            { speaker: "Helen", voice: 'gb-female', text: "Yes, it was the eight fifteen from Riverside. I usually catch the seven forty-five, but I was late yesterday." },
            { speaker: "Officer", voice: 'gb-male', text: "OK. If someone hands it in, we'll send you a text message. When you come to collect it, please bring some photo ID." },
            { speaker: "Helen", voice: 'gb-female', text: "Is there a charge?" },
            { speaker: "Officer", voice: 'gb-male', text: "Yes, I'm afraid there's a small fee of three pounds fifty." },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q1",
          segmentId: "seg-1",
          number: 1,
          prompt: "Name: Helen ___",
          acceptedAnswers: ["Garside"],
          explanation: {
            vi: "Helen đánh vần: G, A, R, S, I, D, E → Garside.",
            en: "Helen spells it: G, A, R, S, I, D, E → Garside.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q2",
          segmentId: "seg-1",
          number: 2,
          prompt: "Phone number: ___",
          acceptedAnswers: ["07712 468 930", "07712468930", "07712 468930", "0771 246 8930"],
          explanation: {
            vi: "Nghe theo nhóm: 07712 | 468 | 930. 'oh' nghĩa là số 0.",
            en: "Listen in groups: 07712 | 468 | 930. 'Oh' means zero.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q3",
          segmentId: "seg-2",
          number: 3,
          prompt: "Description: small backpack, colour ___, red zip",
          acceptedAnswers: ["grey", "gray"],
          explanation: {
            vi: "Ba lô màu xám (grey); màu đỏ chỉ là khoá kéo.",
            en: "The bag is grey; red is only the colour of the zip.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q4",
          segmentId: "seg-2",
          number: 4,
          prompt: "Inside: a laptop and some ___",
          acceptedAnswers: ["books"],
          explanation: {
            vi: "'some books for my evening course' → books (số nhiều).",
            en: "'Some books for my evening course' → books (plural).",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q5",
          segmentId: "seg-3",
          number: 5,
          prompt: "Date lost: Tuesday ___ March",
          acceptedAnswers: ["11", "11th", "eleventh", "the 11th", "the eleventh"],
          explanation: {
            vi: "'Tuesday, the eleventh of March' → 11. Viết 11 hay 11th đều được.",
            en: "'Tuesday, the eleventh of March' → 11. Both 11 and 11th are fine.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q6",
          segmentId: "seg-3",
          number: 6,
          prompt: "Time of train: ___ a.m. (from Riverside)",
          acceptedAnswers: ["8.15", "8:15", "8.15 am", "8:15 am", "8.15am", "8:15am", "8.15 a.m.", "eight fifteen"],
          explanation: {
            vi: "Cô ấy đi chuyến 8.15; chuyến 7.45 là chuyến hay đi — đó là bẫy.",
            en: "She took the 8.15. The 7.45 is her usual train — a distractor.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-01-q7",
          segmentId: "seg-3",
          number: 7,
          prompt: "Collection fee: £___",
          acceptedAnswers: ["3.50", "£3.50", "3.5", "3.50 pounds"],
          explanation: {
            vi: "'three pounds fifty' = 3 bảng 50 xu = £3.50.",
            en: "'Three pounds fifty' = £3.50.",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2 (luyện tập): Nghe đánh vần chữ cái và con số
  //        Điểm dễ mất nhất ở Part 1: A/E/I, G/J, double, oh, -teen/-ty, ngày tháng
  // ==========================================================================
  {
    id: "l2b-i-lis-02",
    skill: 'listening',
    mode: 'practice',
    estimatedMinutes: 10,
    title: { vi: "Nghe đánh vần và con số", en: "Listening for spelling and numbers" },
    description: {
      vi: "Luyện tai bắt chữ cái dễ nhầm, số điện thoại, ngày tháng và giá tiền — chỗ dễ mất điểm nhất ở Part 1.",
      en: "Train your ears for confusing letters, phone numbers, dates and prices — the easiest marks to lose in Part 1.",
    },
    teachingCards: [
      {
        title: { vi: "Chữ cái người Việt hay nhầm", en: "Letters that are easy to confuse" },
        body: {
          vi: "Khi nghe đánh vần, các cặp sau rất dễ nhầm:\n- **A** /eɪ/ – **E** /iː/ – **I** /aɪ/\n- **G** /dʒiː/ – **J** /dʒeɪ/\n- **B** – **V**, **M** – **N**, **S** – **X**\n- **double L** = **LL**, **double R** = **RR**\nMẹo: nghe đến đâu **viết từng chữ** đến đó, đừng cố nhớ cả từ rồi mới viết.",
          en: "When names are spelled, these letters are easy to confuse:\n- **A** /eɪ/ – **E** /iː/ – **I** /aɪ/\n- **G** /dʒiː/ – **J** /dʒeɪ/\n- **B** – **V**, **M** – **N**, **S** – **X**\n- **double L** = **LL**, **double R** = **RR**\nTip: **write each letter as you hear it** — don't try to remember the whole word first.",
        },
        examples: [
          { en: "H, A, double R, I, S, O, N → Harrison", vi: "double R = hai chữ R" },
          { en: "J, A, Y, N, E → Jayne", vi: "J đọc /dʒeɪ/, còn G đọc /dʒiː/" },
        ],
      },
      {
        title: { vi: "Số điện thoại và giá tiền", en: "Phone numbers and prices" },
        body: {
          vi: "- **oh** = số 0; **double six** = 66.\n- Số điện thoại được đọc theo **nhóm**, có ngắt nghỉ: oh one six two four | nine three three.\n- **-teen** nhấn âm sau (fif**TEEN** = 15), **-ty** nhấn âm đầu (**FIF**ty = 50).\n- Giá: **four pounds fifty** = £4.50; **ninety-nine p** = £0.99.",
          en: "- **oh** = 0; **double six** = 66.\n- Phone numbers are said in **groups**, with short pauses: oh one six two four | nine three three.\n- **-teen** is stressed at the end (fif**TEEN** = 15); **-ty** at the start (**FIF**ty = 50).\n- Prices: **four pounds fifty** = £4.50; **ninety-nine p** = £0.99.",
        },
        examples: [{ en: "It's oh one six two four, nine double three.", vi: "Số đó là 01624 933." }],
      },
      {
        title: { vi: "Ngày tháng", en: "Dates" },
        body: {
          vi: "Người Anh nói ngày theo 2 kiểu: **the third of May** hoặc **May the third**.\nKhi viết: **3 May**, **3rd May** hay **May 3** đều được.\nSố thứ tự dễ nghe nhầm: **third** (3) – **thirtieth** (30), **twelfth** (12) – **twentieth** (20).\nCẩn thận tháng: **June** /dʒuːn/ – **July** /dʒuˈlaɪ/.",
          en: "British speakers say dates in two ways: **the third of May** or **May the third**.\nWrite **3 May**, **3rd May** or **May 3** — all are fine.\nOrdinals that sound similar: **third** (3) – **thirtieth** (30), **twelfth** (12) – **twentieth** (20).\nBe careful with **June** /dʒuːn/ and **July** /dʒuˈlaɪ/.",
        },
        examples: [{ en: "We're leaving on the twelfth of July.", vi: "Chúng tôi đi vào ngày 12 tháng 7." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-lis-02-ex01",
        type: 'listen-choose',
        audioText: "J, A, Y, N, E.",
        question: "Which name do you hear?",
        options: ["Gayne", "Jayne", "Jane", "Jeyne"],
        correctIndex: 1,
        explanation: {
          vi: "J /dʒeɪ/, A, Y, N, E → Jayne. Chữ G đọc /dʒiː/, khác J.",
          en: "J /dʒeɪ/, A, Y, N, E → Jayne. G is /dʒiː/, not J.",
        },
      },
      {
        id: "l2b-i-lis-02-ex02",
        type: 'listen-type',
        audioText: "F, A, I, R, L, E, Y.",
        acceptedAnswers: ["Fairley", "F A I R L E Y"],
        explanation: {
          vi: "F-A-I-R-L-E-Y → Fairley. Chú ý A /eɪ/ và I /aɪ/.",
          en: "F-A-I-R-L-E-Y → Fairley. Note A /eɪ/ and I /aɪ/.",
        },
      },
      {
        id: "l2b-i-lis-02-ex03",
        type: 'listen-type',
        audioText: "H, A, double R, I, S, O, N.",
        acceptedAnswers: ["Harrison", "H A R R I S O N", "H A double R I S O N"],
        explanation: {
          vi: "double R = RR → Harrison.",
          en: "Double R = RR → Harrison.",
        },
      },
      {
        id: "l2b-i-lis-02-ex04",
        type: 'listen-choose',
        audioText: "The postcode is G, V, four, eight, N, J.",
        question: "Which postcode do you hear?",
        options: ["JV4 8NG", "GB4 8NJ", "GV4 8NJ", "GV4 8MJ"],
        correctIndex: 2,
        explanation: {
          vi: "G-V-4-8-N-J. Phân biệt G/J, V/B và N/M.",
          en: "G-V-4-8-N-J. Separate G/J, V/B and N/M.",
        },
      },
      {
        id: "l2b-i-lis-02-ex05",
        type: 'listen-choose',
        audioText: "The course costs fifty pounds.",
        question: "How much is the course?",
        options: ["£15", "£50", "£55", "£5"],
        correctIndex: 1,
        explanation: {
          vi: "FIFty nhấn âm đầu → 50. fifTEEN mới là 15.",
          en: "FIFty is stressed at the start → 50. FifTEEN would be 15.",
        },
      },
      {
        id: "l2b-i-lis-02-ex06",
        type: 'listen-choose',
        audioText: "I live at number seventeen, Station Road.",
        question: "What is the house number?",
        options: ["70", "7", "17", "71"],
        correctIndex: 2,
        explanation: {
          vi: "sevenTEEN nhấn âm cuối, có âm /n/ → 17.",
          en: "SevenTEEN is stressed at the end, with a final /n/ → 17.",
        },
      },
      {
        id: "l2b-i-lis-02-ex07",
        type: 'listen-type',
        audioText: "Oh one six two four, nine double three, seven oh five.",
        acceptedAnswers: ["01624 933 705", "01624933705", "01624 933705"],
        explanation: {
          vi: "oh = 0, double three = 33 → 01624 933 705.",
          en: "Oh = 0 and double three = 33 → 01624 933 705.",
        },
      },
      {
        id: "l2b-i-lis-02-ex08",
        type: 'listen-choose',
        audioText: "We're leaving on the twelfth of July.",
        question: "What is the date?",
        options: ["12 June", "20 July", "12 July", "2 July"],
        correctIndex: 2,
        explanation: {
          vi: "twelfth = 12, July = tháng 7. twentieth mới là 20.",
          en: "Twelfth = 12th, and July, not June. Twentieth would be 20.",
        },
      },
      {
        id: "l2b-i-lis-02-ex09",
        type: 'listen-choose',
        audioText: "A ticket is four pounds fifty.",
        question: "How much is a ticket?",
        options: ["£4.15", "£4.50", "£40.50", "£14.50"],
        correctIndex: 1,
        explanation: {
          vi: "'four pounds fifty' = 4 bảng 50 xu = £4.50.",
          en: "'Four pounds fifty' = £4.50.",
        },
      },
      {
        id: "l2b-i-lis-02-ex10",
        type: 'fill-blank',
        sentence: "In a phone number, 'double eight' means ___.",
        acceptedAnswers: ["88"],
        hint: "(viết bằng chữ số)",
        explanation: {
          vi: "double + một số = số đó lặp 2 lần → 88.",
          en: "Double + a number = that number twice → 88.",
        },
      },
      {
        id: "l2b-i-lis-02-ex11",
        type: 'match-pairs',
        instruction: { vi: "Nối cách nói với cách viết.", en: "Match what you hear with how you write it." },
        pairs: [
          { left: "oh", right: "0" },
          { left: "double seven", right: "77" },
          { left: "the third of May", right: "3 May" },
          { left: "thirteen", right: "13" },
          { left: "thirty", right: "30" },
          { left: "a quarter past six", right: "6.15" },
        ],
        explanation: {
          vi: "Đây là các dạng số hay gặp nhất trong Part 1.",
          en: "These are the most common number forms in Part 1.",
        },
      },
      {
        id: "l2b-i-lis-02-ex12",
        type: 'speak-sentence',
        sentence: "Thirteen, not thirty.",
        translationVi: "Mười ba, không phải ba mươi.",
        explanation: {
          vi: "Nhấn thirTEEN ở âm sau, THIRty ở âm đầu. Đọc rõ /n/ cuối.",
          en: "Stress thirTEEN at the end and THIRty at the start. Say the final /n/.",
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3: Bẫy gây nhiễu (distractors) — "No, sorry, it's..."
  //        Bối cảnh: gọi điện đặt bánh sinh nhật (đổi ngày, đổi vị, giá cũ/mới)
  // ==========================================================================
  {
    id: "l2b-i-lis-03",
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: "Bẫy gây nhiễu: 'No, sorry, it's...'", en: "Distractors: 'No, sorry, it's...'" },
    description: {
      vi: "Nhận ra khi người nói đổi ý hoặc sửa lại, để không ghi nhầm thông tin nghe được đầu tiên.",
      en: "Notice when speakers change or correct information, so you don't write the first thing you hear.",
    },
    teachingCards: [
      {
        title: { vi: "Bẫy gây nhiễu là gì?", en: "What is a distractor?" },
        body: {
          vi: "Trong Part 1, một chỗ trống thường có **2 thông tin**: thông tin đầu là **bẫy**, thông tin sau mới là **đáp án**.\nCâu báo hiệu hay gặp:\n- **No, sorry, it's...**\n- **Actually, ...**\n- **Oh, wait. I mean...**\n- **That's the old price. Now it's...**\n→ Đừng viết vội. **Nghe hết câu** rồi mới chốt.",
          en: "In Part 1, a gap often has **two pieces of information**: the first is a **distractor**, the second is the **answer**.\nCommon signals:\n- **No, sorry, it's...**\n- **Actually, ...**\n- **Oh, wait. I mean...**\n- **That's the old price. Now it's...**\n→ Don't write too fast. **Hear the whole sentence** first.",
        },
        examples: [{ en: "It's on the fifteenth... no, sorry, the sixteenth.", vi: "Ngày 15... à không, ngày 16 → viết 16." }],
      },
      {
        title: { vi: "4 kiểu bẫy hay gặp", en: "Four common types" },
        body: {
          vi: "1. **Tự sửa**: Six people... no, seven.\n2. **Người kia hiểu sai**: 'So, Tuesday?' – 'No, Thursday.'\n3. **Đổi kế hoạch**: I wanted chocolate, but it's not possible, so strawberry.\n4. **Cũ – mới**: It used to be £20, but now it's £25.\nĐáp án là thông tin **cuối cùng, được chốt lại**.",
          en: "1. **Self-correction**: Six people... no, seven.\n2. **The other speaker gets it wrong**: 'So, Tuesday?' – 'No, Thursday.'\n3. **A change of plan**: I wanted chocolate, but it's not possible, so strawberry.\n4. **Old vs new**: It used to be £20, but now it's £25.\nThe answer is the **final, confirmed** information.",
        },
        examples: [
          { en: "The class used to start at seven, but now it starts at half past.", vi: "Trước kia bắt đầu lúc 7 giờ, giờ là 7 rưỡi → 7.30." },
        ],
      },
      {
        title: { vi: "Mẹo: ghi cả hai, gạch cái sai", en: "Tip: note both, cross one out" },
        body: {
          vi: "Khi nghe 2 con số cho 1 chỗ trống, hãy **ghi nhanh cả hai** cạnh câu hỏi (VD: 28 / 32).\nNghe tiếp: thông tin nào bị **'no' / 'old' / 'not possible'** thì **gạch đi**.\nCách này giúp bạn không bị cuốn theo con số nghe được đầu tiên.",
          en: "When you hear two numbers for one gap, **quickly note both** next to the question (e.g. 28 / 32).\nKeep listening and **cross out** the one that is **'no' / 'old' / 'not possible'**.\nThis stops you from following the first number you hear.",
        },
        examples: [{ en: "28 / 32 → 'that's the old price' → 32", vi: "28 là giá cũ → gạch đi, chọn 32" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-lis-03-ex01",
        type: 'listen-choose',
        audioText: "Man: The party is on the fifteenth... no, sorry, the sixteenth of May.",
        question: "When is the party?",
        options: ["15 May", "16 May", "5 May", "6 May"],
        correctIndex: 1,
        explanation: {
          vi: "'no, sorry' báo hiệu sửa lại → ngày 16.",
          en: "'No, sorry' signals a correction → the sixteenth.",
        },
      },
      {
        id: "l2b-i-lis-03-ex02",
        type: 'listen-choose',
        audioText: "Woman: So that's a table for ten people? Man: No, twelve. Two more friends are coming.",
        question: "How many people are coming?",
        options: ["10", "12", "2", "20"],
        correctIndex: 1,
        explanation: {
          vi: "Người phụ nữ nói 10, người đàn ông sửa: 'No, twelve.'",
          en: "The woman says ten, but the man corrects her: 'No, twelve.'",
        },
      },
      {
        id: "l2b-i-lis-03-ex03",
        type: 'listen-choose',
        audioText: "Man: The class used to start at seven, but this term it starts at half past seven.",
        question: "What time does the class start this term?",
        options: ["7.00", "7.30", "6.30", "7.15"],
        correctIndex: 1,
        explanation: {
          vi: "'used to' = trước đây. Kỳ này: half past seven = 7.30.",
          en: "'Used to' is the past. This term: half past seven = 7.30.",
        },
      },
      {
        id: "l2b-i-lis-03-ex04",
        type: 'listen-choose',
        audioText: "Woman: I wanted to come on Saturday, but you're closed then, so I'll come on Sunday.",
        question: "Which day will the woman come?",
        options: ["Saturday", "Sunday", "Friday", "Monday"],
        correctIndex: 1,
        explanation: {
          vi: "Thứ Bảy đóng cửa → cô ấy đổi sang Chủ nhật.",
          en: "They are closed on Saturday, so she changes to Sunday.",
        },
      },
      {
        id: "l2b-i-lis-03-ex05",
        type: 'true-false',
        statement: "In Part 1, the first number you hear for a gap is always the answer.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Thông tin đầu thường là bẫy; đáp án là thông tin cuối được chốt.",
          en: "False. The first information is often a distractor; the final confirmed one is the answer.",
        },
      },
      {
        id: "l2b-i-lis-03-ex06",
        type: 'match-pairs',
        instruction: { vi: "Nối câu báo hiệu với ý nghĩa.", en: "Match each signal with its meaning." },
        pairs: [
          { left: "No, sorry, it's...", right: "tự sửa lại" },
          { left: "It used to be...", right: "thông tin cũ" },
          { left: "It's fully booked.", right: "hết chỗ, phải đổi" },
          { left: "Actually, ...", right: "thực ra (thông tin mới)" },
          { left: "That's right.", right: "xác nhận là đúng" },
        ],
        explanation: {
          vi: "Các câu này cho biết thông tin nào bị bỏ, thông tin nào được chốt.",
          en: "These signals show which information is dropped and which is confirmed.",
        },
      },
      {
        id: "l2b-i-lis-03-ex07",
        type: 'speak-sentence',
        sentence: "No, sorry, it's the sixteenth, not the fifteenth.",
        translationVi: "Không, xin lỗi, là ngày 16, không phải ngày 15.",
        explanation: {
          vi: "Nhấn SIX và FIF để làm rõ khác biệt. Đọc rõ âm /θ/ cuối.",
          en: "Stress SIX and FIF to show the difference. Say the final /θ/ clearly.",
        },
      },
    ],
    listeningTask: {
      instructions: "Questions 1–7. Complete the order form below. Write ONE WORD AND/OR A NUMBER for each answer.",
      strategyTip: {
        vi: "Ghi nhanh cả 2 thông tin khi nghe (VD 28 / 32), rồi gạch cái bị sửa hoặc bị huỷ.",
        en: "Note both pieces of information (e.g. 28 / 32), then cross out the one that changes.",
      },
      segments: [
        {
          id: "seg-1",
          lines: [
            { speaker: "Assistant", voice: 'gb-female', text: "Good morning, Sweet Corner Bakery. How can I help you?" },
            { speaker: "Tom", voice: 'gb-male', text: "Hi. I'd like to order a birthday cake for my daughter, please." },
            { speaker: "Assistant", voice: 'gb-female', text: "Lovely. Can I take your name first?" },
            { speaker: "Tom", voice: 'gb-male', text: "Yes, it's Tom Whitlock. That's W, H, I, T, L, O, C, K." },
            { speaker: "Assistant", voice: 'gb-female', text: "Thank you, Mr Whitlock. And when is the party?" },
            { speaker: "Tom", voice: 'gb-male', text: "It's on Saturday the ninth of August. Oh, no, wait. We moved it because of my wife's work. It's on Sunday the tenth now." },
          ],
        },
        {
          id: "seg-2",
          lines: [
            { speaker: "Assistant", voice: 'gb-female', text: "And what kind of cake would you like?" },
            { speaker: "Tom", voice: 'gb-male', text: "She loves chocolate, so chocolate, please." },
            { speaker: "Assistant", voice: 'gb-female', text: "I'm sorry, but our chocolate cakes take three days, and we're fully booked this week. We could do lemon or strawberry." },
            { speaker: "Tom", voice: 'gb-male', text: "Hmm. She doesn't really like lemon. Strawberry, then." },
            { speaker: "Assistant", voice: 'gb-female', text: "Strawberry. And how many people is it for?" },
            { speaker: "Tom", voice: 'gb-male', text: "About twenty children. Well, twenty-four, actually, if her cousins come. Yes, let's say twenty-four." },
          ],
        },
        {
          id: "seg-3",
          lines: [
            { speaker: "Assistant", voice: 'gb-female', text: "What would you like us to write on the cake?" },
            { speaker: "Tom", voice: 'gb-male', text: "Happy Birthday, Mia. That's M, I, A." },
            { speaker: "Assistant", voice: 'gb-female', text: "Lovely. So, a strawberry cake for twenty-four people is thirty-two pounds." },
            { speaker: "Tom", voice: 'gb-male', text: "Thirty-two? Your website says twenty-eight." },
            { speaker: "Assistant", voice: 'gb-female', text: "Sorry, that's the old price. It's thirty-two pounds now." },
            { speaker: "Tom", voice: 'gb-male', text: "OK, no problem." },
            { speaker: "Assistant", voice: 'gb-female', text: "You can collect it on the morning of the party, from nine o'clock." },
            { speaker: "Tom", voice: 'gb-male', text: "Could I pick it up the day before? I'm busy on Sunday morning." },
            { speaker: "Assistant", voice: 'gb-female', text: "Of course. Then come on Saturday afternoon, any time after two." },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q1",
          segmentId: "seg-1",
          number: 1,
          prompt: "Customer's surname: ___",
          acceptedAnswers: ["Whitlock"],
          explanation: {
            vi: "Tom đánh vần: W, H, I, T, L, O, C, K → Whitlock.",
            en: "Tom spells it: W, H, I, T, L, O, C, K → Whitlock.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q2",
          segmentId: "seg-1",
          number: 2,
          prompt: "Date of party: ___ August",
          acceptedAnswers: ["10", "10th", "tenth", "the 10th", "the tenth"],
          explanation: {
            vi: "Ngày 9 là bẫy: 'Oh, no, wait... Sunday the tenth now.' → 10.",
            en: "The ninth is a distractor: 'Oh, no, wait... Sunday the tenth now.' → 10.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q3",
          segmentId: "seg-2",
          number: 3,
          prompt: "Flavour: ___",
          acceptedAnswers: ["strawberry"],
          explanation: {
            vi: "Sô-cô-la không làm kịp, bé không thích chanh → strawberry.",
            en: "Chocolate isn't possible and she dislikes lemon → strawberry.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q4",
          segmentId: "seg-2",
          number: 4,
          prompt: "Number of people: ___",
          acceptedAnswers: ["24", "twenty-four", "twenty four"],
          explanation: {
            vi: "'About twenty... twenty-four, actually... let's say twenty-four.' → 24.",
            en: "'About twenty... twenty-four, actually... let's say twenty-four.' → 24.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q5",
          segmentId: "seg-3",
          number: 5,
          prompt: "Words on cake: Happy Birthday, ___",
          acceptedAnswers: ["Mia"],
          explanation: {
            vi: "Tên được đánh vần: M, I, A → Mia.",
            en: "The name is spelled: M, I, A → Mia.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q6",
          segmentId: "seg-3",
          number: 6,
          prompt: "Price: £___",
          acceptedAnswers: ["32", "£32", "32 pounds"],
          explanation: {
            vi: "£28 là giá cũ trên website; giá bây giờ là £32.",
            en: "£28 is the old website price; the price now is £32.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-03-q7",
          segmentId: "seg-3",
          number: 7,
          prompt: "Collection: Saturday, any time after ___ p.m.",
          acceptedAnswers: ["2", "two", "2.00", "2 pm", "2pm"],
          explanation: {
            vi: "9 giờ sáng Chủ nhật là bẫy; anh ấy lấy bánh chiều thứ Bảy, sau 2 giờ.",
            en: "Nine on Sunday morning is the distractor; he collects on Saturday after two.",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4: Điền ghi chú (note completion) — địa chỉ và từ thông dụng
  //        Bối cảnh: sinh viên gọi hỏi thuê phòng
  // ==========================================================================
  {
    id: "l2b-i-lis-04",
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: "Điền ghi chú: địa chỉ và từ thông dụng", en: "Note completion: addresses and common words" },
    description: {
      vi: "Làm dạng điền ghi chú của Part 1, nghe địa chỉ và tự viết đúng các từ không ai đánh vần cho bạn.",
      en: "Do Part 1 note completion, catch addresses and spell the common words nobody spells for you.",
    },
    teachingCards: [
      {
        title: { vi: "Form và Notes khác nhau thế nào?", en: "Forms and notes: what's the difference?" },
        body: {
          vi: "**Form**: các dòng có nhãn (Name: ___, Phone: ___).\n**Notes**: các **tiêu đề nhỏ** + **gạch đầu dòng** ngắn, như ghi chép nhanh.\nCách làm giống nhau: đọc trước, đoán loại từ. Riêng notes, hãy nhìn **tiêu đề** (Rent, Transport, Viewing) để biết người nói **đang ở phần nào**.",
          en: "**A form** has labelled lines (Name: ___, Phone: ___).\n**Notes** have **small headings** and short **bullet points**, like quick notes.\nThe method is the same: read first and predict. With notes, follow the **headings** (Rent, Transport, Viewing) to know **where the speakers are**.",
        },
        examples: [
          { en: "Rent: £___ per month; includes water and ___", vi: "Tiêu đề 'Rent' → sắp nghe về tiền thuê" },
        ],
      },
      {
        title: { vi: "Nghe địa chỉ", en: "Listening to addresses" },
        body: {
          vi: "Địa chỉ kiểu Anh: **số nhà + tên đường + Road / Street / Avenue / Lane**.\n- **Tên đường lạ** → thường được **đánh vần**.\n- **Road, Street, Avenue** → **không ai đánh vần**, bạn phải tự viết đúng.\nCâu hay nghe: **Is that with one L or two?** / **double L** / **K for kitchen**.",
          en: "British addresses: **number + street name + Road / Street / Avenue / Lane**.\n- **Unusual street names** → usually **spelled out**.\n- **Road, Street, Avenue** → **nobody spells them**, so you must know the spelling.\nUseful phrases: **Is that with one L or two?** / **double L** / **K for kitchen**.",
        },
        examples: [{ en: "It's forty-two Hollis Avenue. H, O, double L, I, S.", vi: "Số 42 đại lộ Hollis" }],
      },
      {
        title: { vi: "Từ thông dụng: tự viết cho đúng", en: "Common words: spell them yourself" },
        body: {
          vi: "Người nói chỉ đánh vần **tên riêng**. Từ thông dụng thì **không**, nên rất hay sai chính tả:\n**Wednesday, February, library, garden, kitchen, internet, second, restaurant.**\nMẹo: tách chữ để nhớ, VD **Wed-nes-day**, **Feb-ru-ar-y**.\nSai 1 chữ cái = mất điểm.",
          en: "Speakers only spell **names**. Common words are **not** spelled, and they are easy to get wrong:\n**Wednesday, February, library, garden, kitchen, internet, second, restaurant.**\nTip: split the word to remember it, e.g. **Wed-nes-day**, **Feb-ru-ar-y**.\nOne wrong letter = no mark.",
        },
        examples: [{ en: "Wednesday = Wed + nes + day", vi: "Tách chữ để nhớ chính tả" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-lis-04-ex01",
        type: 'multiple-choice',
        question: "Which spelling is correct?",
        options: ["Wensday", "Wednesday", "Wendsday", "Wednsday"],
        correctIndex: 1,
        explanation: {
          vi: "Wed-nes-day: chữ d đứng trước n, dù gần như không đọc ra.",
          en: "Wed-nes-day: the d comes before the n, though you can hardly hear it.",
        },
      },
      {
        id: "l2b-i-lis-04-ex02",
        type: 'listen-choose',
        audioText: "Woman: My address is forty-two Hollis Avenue. That's H, O, double L, I, S.",
        question: "Address: 42 ___ Avenue",
        options: ["Holis", "Hollis", "Hallis", "Hollys"],
        correctIndex: 1,
        explanation: {
          vi: "H, O, double L (LL), I, S → Hollis.",
          en: "H, O, double L, I, S → Hollis.",
        },
      },
      {
        id: "l2b-i-lis-04-ex03",
        type: 'listen-type',
        audioText: "You share the kitchen and the garden.",
        acceptedAnswers: ["You share the kitchen and the garden"],
        explanation: {
          vi: "kitchen có chữ t; kitchen, garden không ai đánh vần, bạn phải tự viết đúng.",
          en: "'Kitchen' has a t. Nobody spells these common words for you.",
        },
      },
      {
        id: "l2b-i-lis-04-ex04",
        type: 'multiple-choice',
        question: "Notes: 'Rent includes: water and ___'. You hear: 'It includes water and gas, but not electricity.' What do you write?",
        options: ["electricity", "gas", "water", "bills"],
        correctIndex: 1,
        explanation: {
          vi: "'but not electricity' = không gồm điện. Đáp án: gas.",
          en: "'But not electricity' means it isn't included. The answer is gas.",
        },
      },
      {
        id: "l2b-i-lis-04-ex05",
        type: 'match-pairs',
        instruction: { vi: "Nối từ với nghĩa tiếng Việt.", en: "Match the words with their Vietnamese meanings." },
        pairs: [
          { left: "rent", right: "tiền thuê nhà" },
          { left: "bills", right: "hoá đơn điện, nước..." },
          { left: "share", right: "dùng chung" },
          { left: "landlady", right: "bà chủ nhà cho thuê" },
          { left: "viewing", right: "buổi đến xem nhà" },
          { left: "floor", right: "tầng" },
        ],
        explanation: {
          vi: "Từ vựng thuê nhà rất hay gặp trong Part 1.",
          en: "Renting words are very common in Part 1.",
        },
      },
      {
        id: "l2b-i-lis-04-ex06",
        type: 'true-false',
        statement: "In Part 1, speakers usually spell common words like 'garden' or 'Wednesday'.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Họ chỉ đánh vần tên riêng; từ thông dụng bạn phải tự viết đúng.",
          en: "False. They spell names only; you must spell common words yourself.",
        },
      },
      {
        id: "l2b-i-lis-04-ex07",
        type: 'speak-sentence',
        sentence: "I live at twenty-six Kelsey Road.",
        translationVi: "Tôi sống ở số 26 đường Kelsey.",
        explanation: {
          vi: "Đọc rõ âm cuối: live /v/, six /ks/, Road /d/. Nhấn KELsey.",
          en: "Say the final sounds: live /v/, six /ks/, Road /d/. Stress KELsey.",
        },
      },
    ],
    listeningTask: {
      instructions: "Questions 1–7. Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
      strategyTip: {
        vi: "Nhìn các tiêu đề trong ghi chú (Address, Rent, Transport, Viewing) để biết người nói đang ở đâu.",
        en: "Follow the headings in the notes (Address, Rent, Transport, Viewing) to keep your place.",
      },
      segments: [
        {
          id: "seg-1",
          lines: [
            { speaker: "Daniel", voice: 'gb-male', text: "Hello. I'm calling about the room to rent. I saw your advert on the college website." },
            { speaker: "Mrs Price", voice: 'gb-female', text: "Oh, yes. Hello. The room is still available." },
            { speaker: "Daniel", voice: 'gb-male', text: "Great. Could you tell me the address, please?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "Of course. It's twenty-six Kelsey Road. That's K, E, L, S, E, Y." },
            { speaker: "Daniel", voice: 'gb-male', text: "Twenty-six Kelsey Road. And which floor is the room on?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "It's on the second floor, at the back of the house, so it's nice and quiet. I live on the first floor." },
          ],
        },
        {
          id: "seg-2",
          lines: [
            { speaker: "Daniel", voice: 'gb-male', text: "How much is the rent?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "It's four hundred and fifty pounds a month." },
            { speaker: "Daniel", voice: 'gb-male', text: "And does that include bills?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "It includes water and the internet. Electricity is extra, so you pay for that yourself." },
            { speaker: "Daniel", voice: 'gb-male', text: "OK. Who else lives in the house?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "Two other students. You'll share the kitchen and the garden with them, but every room has its own bathroom." },
          ],
        },
        {
          id: "seg-3",
          lines: [
            { speaker: "Daniel", voice: 'gb-male', text: "Is it far from the college?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "About twenty minutes by bus. You can take the number fourteen. The bus stop is just opposite the house." },
            { speaker: "Daniel", voice: 'gb-male', text: "Sorry, was that fourteen or forty?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "Fourteen. One, four." },
            { speaker: "Daniel", voice: 'gb-male', text: "Great. Could I come and see the room?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "Of course. How about Tuesday evening?" },
            { speaker: "Daniel", voice: 'gb-male', text: "I've got classes until eight on Tuesday. Is Wednesday possible?" },
            { speaker: "Mrs Price", voice: 'gb-female', text: "Wednesday's fine. Come at half past six." },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q1",
          segmentId: "seg-1",
          number: 1,
          prompt: "Address: 26 ___ Road",
          acceptedAnswers: ["Kelsey"],
          explanation: {
            vi: "Tên đường được đánh vần: K, E, L, S, E, Y → Kelsey.",
            en: "The street name is spelled: K, E, L, S, E, Y → Kelsey.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q2",
          segmentId: "seg-1",
          number: 2,
          prompt: "Room: on the ___ floor, at the back",
          acceptedAnswers: ["second", "2nd"],
          explanation: {
            vi: "Phòng ở second floor; first floor là chỗ bà chủ ở (bẫy).",
            en: "The room is on the second floor; the landlady lives on the first (distractor).",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q3",
          segmentId: "seg-2",
          number: 3,
          prompt: "Rent: £___ per month",
          acceptedAnswers: ["450", "£450"],
          explanation: {
            vi: "'four hundred and fifty pounds a month' → 450.",
            en: "'Four hundred and fifty pounds a month' → 450.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q4",
          segmentId: "seg-2",
          number: 4,
          prompt: "Rent includes: water and ___",
          acceptedAnswers: ["internet"],
          explanation: {
            vi: "Gồm nước và internet; điện là 'extra' (trả thêm) → internet.",
            en: "Water and the internet are included; electricity is extra → internet.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q5",
          segmentId: "seg-2",
          number: 5,
          prompt: "Shared with two students: kitchen and ___",
          acceptedAnswers: ["garden"],
          explanation: {
            vi: "Dùng chung bếp và vườn; phòng tắm là riêng → garden.",
            en: "They share the kitchen and garden; bathrooms are private → garden.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q6",
          segmentId: "seg-3",
          number: 6,
          prompt: "Transport: bus number ___ to the college",
          acceptedAnswers: ["14", "fourteen"],
          explanation: {
            vi: "Daniel hỏi lại và được xác nhận: 'Fourteen. One, four.' → 14, không phải 40.",
            en: "Daniel checks: 'Fourteen. One, four.' → 14, not 40.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-04-q7",
          segmentId: "seg-3",
          number: 7,
          prompt: "Viewing: ___ at 6.30 p.m.",
          acceptedAnswers: ["Wednesday"],
          explanation: {
            vi: "Thứ Ba Daniel bận học → hẹn thứ Tư. Nhớ viết đúng Wednesday.",
            en: "Daniel has classes on Tuesday, so Wednesday. Spell it carefully.",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 5: Trắc nghiệm A/B/C + một Part 1 hoàn chỉnh trộn 2 dạng câu hỏi
  //        Bối cảnh: mẹ gọi đăng ký trại hè thể thao cho con trai
  // ==========================================================================
  {
    id: "l2b-i-lis-05",
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 15,
    title: { vi: "Trắc nghiệm A/B/C và một Part 1 hoàn chỉnh", en: "Multiple choice and a full Part 1" },
    description: {
      vi: "Làm câu trắc nghiệm khi cả 3 phương án đều được nhắc đến, rồi làm một Part 1 trộn 2 dạng câu hỏi.",
      en: "Answer multiple choice when all three options are mentioned, then do a Part 1 with two question types.",
    },
    teachingCards: [
      {
        title: { vi: "Trắc nghiệm: cả 3 phương án đều được nhắc", en: "Multiple choice: you'll hear all three" },
        body: {
          vi: "**Trước khi nghe**: đọc câu hỏi, gạch chân **từ khoá**, rồi tìm **điểm khác nhau** giữa A, B, C.\n**Khi nghe**: thường **cả 3 phương án đều được nhắc**, nhưng chỉ 1 cái **trả lời đúng câu hỏi**.\nĐáp án đúng thường được **nói bằng từ khác** (paraphrase): most popular = most children choose.",
          en: "**Before you listen**: read the question, underline **key words**, and find **what is different** about A, B and C.\n**While you listen**: you usually hear **all three options**, but only one **answers the question**.\nThe right answer is often **paraphrased**: most popular = most children choose.",
        },
        examples: [
          { en: "What must children bring? A lunch  B a towel  C a water bottle", vi: "Cả 3 đều được nhắc — nghe xem cái nào 'phải mang'" },
        ],
      },
      {
        title: { vi: "Loại phương án sai", en: "Ruling out wrong options" },
        body: {
          vi: "Nghe những cụm cho biết một phương án **bị loại**:\n- **There's no need to... / You don't need to...** (không cần)\n- **We provide... / We give you...** (có sẵn)\n- **We don't ... any more** (không còn nữa)\n- **That's fully booked** (hết chỗ)\nLoại 2 phương án sai → phương án còn lại thường là đáp án.",
          en: "Listen for phrases that **rule out** an option:\n- **There's no need to... / You don't need to...**\n- **We provide... / We give you...**\n- **We don't ... any more**\n- **That's fully booked**\nRule out the two wrong options → the one left is usually the answer.",
        },
        examples: [{ en: "There's no need to bring lunch — we provide a hot meal.", vi: "Không cần mang bữa trưa → loại 'lunch'" }],
      },
      {
        title: { vi: "Part 1 thật: 10 câu, 2 dạng", en: "A real Part 1: 10 questions, two types" },
        body: {
          vi: "Part 1 có **10 câu**, thường chia **2 nhóm** với 2 dạng khác nhau, VD:\n- Câu 1–6: điền form (**ONE WORD AND/OR A NUMBER**)\n- Câu 7–10: trắc nghiệm (**Choose A, B or C**)\nĐọc **lời hướng dẫn** của từng nhóm. Khi chuyển nhóm, đọc nhanh các câu tiếp theo.",
          en: "Part 1 has **10 questions**, often in **two groups** with different types, e.g.:\n- Questions 1–6: form completion (**ONE WORD AND/OR A NUMBER**)\n- Questions 7–10: multiple choice (**Choose A, B or C**)\nRead the **instructions** for each group. When the group changes, quickly read the next questions.",
        },
        examples: [{ en: "Questions 5–8. Choose the correct letter, A, B or C.", vi: "Câu 5–8. Chọn chữ cái đúng A, B hoặc C." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-lis-05-ex01",
        type: 'listen-choose',
        audioText: "Man: We have rooms with a sea view, but they're all booked this week. There's one with a garden view, or a cheaper one at the front, facing the street. Woman: I'll take the garden one, please.",
        question: "Which room does the woman book?",
        options: ["A room with a sea view", "A room with a garden view", "A room facing the street"],
        correctIndex: 1,
        explanation: {
          vi: "Phòng nhìn biển đã hết chỗ; cô ấy chọn 'the garden one'.",
          en: "The sea-view rooms are booked; she chooses 'the garden one'.",
        },
      },
      {
        id: "l2b-i-lis-05-ex02",
        type: 'multiple-choice',
        question: "You hear all three options in a multiple-choice question. What should you do?",
        options: [
          "Choose the first one you hear",
          "Choose the one that answers the question",
          "Choose the last one you hear",
          "Leave it empty",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Cả 3 đều được nhắc; chọn cái trả lời đúng câu hỏi.",
          en: "All three are mentioned; choose the one that answers the question.",
        },
      },
      {
        id: "l2b-i-lis-05-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối 2 cách nói cùng một ý (paraphrase).", en: "Match the phrases with the same meaning." },
        pairs: [
          { left: "most children choose it", right: "the most popular" },
          { left: "pick up", right: "collect" },
          { left: "there's no need to", right: "you don't have to" },
          { left: "costs less", right: "is cheaper" },
          { left: "every day", right: "daily" },
        ],
        explanation: {
          vi: "Câu hỏi trắc nghiệm hay dùng từ khác với bài nghe.",
          en: "Multiple-choice questions often use different words from the recording.",
        },
      },
      {
        id: "l2b-i-lis-05-ex04",
        type: 'listen-choose',
        audioText: "Woman: You don't need to bring a towel. We provide them. But please bring a swimming cap.",
        question: "What must the swimmers bring?",
        options: ["A towel", "A swimming cap", "Nothing"],
        correctIndex: 1,
        explanation: {
          vi: "Khăn tắm có sẵn ('We provide them'); phải mang mũ bơi.",
          en: "Towels are provided ('We provide them'); swimmers must bring a cap.",
        },
      },
      {
        id: "l2b-i-lis-05-ex05",
        type: 'fill-blank',
        sentence: "There's no ___ to bring lunch. We provide a hot meal.",
        acceptedAnswers: ["need"],
        hint: "(cần)",
        explanation: {
          vi: "There's no need to... = không cần → loại phương án đó.",
          en: "'There's no need to...' means it isn't necessary → rule that option out.",
        },
      },
      {
        id: "l2b-i-lis-05-ex06",
        type: 'true-false',
        statement: "In Part 1, all ten questions always use the same task type.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Part 1 thường có 2 dạng, VD điền form rồi trắc nghiệm.",
          en: "False. Part 1 often has two types, e.g. a form and then multiple choice.",
        },
      },
      {
        id: "l2b-i-lis-05-ex07",
        type: 'speak-sentence',
        sentence: "Could I pick him up at four o'clock?",
        translationVi: "Tôi có thể đón cháu lúc 4 giờ không?",
        explanation: {
          vi: "Nối pick_him_up. Giữ /k/ trong pick và /p/ cuối trong up.",
          en: "Link pick_him_up. Keep the /k/ in 'pick' and the final /p/ in 'up'.",
        },
      },
    ],
    listeningTask: {
      instructions:
        "Questions 1–4. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.\nQuestions 5–8. Choose the correct letter, A, B or C.",
      strategyTip: {
        vi: "Trước câu 5–8, gạch chân điểm khác nhau giữa A, B, C. Nghe cả 3, rồi chọn cái trả lời đúng câu hỏi.",
        en: "Before Questions 5–8, underline what is different about A, B and C. Hear all three, then choose.",
      },
      segments: [
        {
          id: "seg-1",
          lines: [
            { speaker: "Receptionist", voice: 'gb-male', text: "Good morning, Parkside Sports Centre. How can I help?" },
            { speaker: "Linh", voice: 'gb-female', text: "Hello. I'm calling about your summer camp for children. I'd like to book a place for my son." },
            { speaker: "Receptionist", voice: 'gb-male', text: "Of course. What's his name?" },
            { speaker: "Linh", voice: 'gb-female', text: "Bao Tran. His surname is T, R, A, N." },
            { speaker: "Receptionist", voice: 'gb-male', text: "Thank you. And how old is Bao?" },
            { speaker: "Linh", voice: 'gb-female', text: "He's nine. He'll be ten in September, but he's nine now." },
            { speaker: "Receptionist", voice: 'gb-male', text: "Great. The camp runs for two weeks in August. Which week would you like?" },
            { speaker: "Linh", voice: 'gb-female', text: "The first week, please. The one starting on the fourth." },
            { speaker: "Receptionist", voice: 'gb-male', text: "I'm sorry, the first week is completely full. There are still places in the second week, starting on the eleventh." },
            { speaker: "Linh", voice: 'gb-female', text: "OK, the eleventh, then." },
            { speaker: "Receptionist", voice: 'gb-male', text: "Does Bao have any allergies?" },
            { speaker: "Linh", voice: 'gb-female', text: "Yes, he's allergic to nuts. All kinds of nuts, not just peanuts." },
          ],
        },
        {
          id: "seg-2",
          lines: [
            { speaker: "Receptionist", voice: 'gb-male', text: "Let me tell you a bit about the camp. The children do a different sport every morning. Lots of them enjoy tennis, and football is popular with the older boys and girls. But the activity that almost every child asks for is swimming. We always have a long waiting list for the pool sessions." },
            { speaker: "Linh", voice: 'gb-female', text: "Bao will love that. What does he need to bring?" },
            { speaker: "Receptionist", voice: 'gb-male', text: "There's no need to bring lunch, because we provide a hot meal. We also have towels for the pool. But please give him a water bottle with his name on it. It gets very hot in August." },
          ],
        },
        {
          id: "seg-3",
          lines: [
            { speaker: "Linh", voice: 'gb-female', text: "And what time does the day finish?" },
            { speaker: "Receptionist", voice: 'gb-male', text: "Activities finish at half past three, and then the children have a snack. You can pick him up from four o'clock. Please try not to come later than half past four." },
            { speaker: "Linh", voice: 'gb-female', text: "That's fine. How do I pay? Can I pay in cash on the first day?" },
            { speaker: "Receptionist", voice: 'gb-male', text: "I'm afraid we don't take cash any more. You can pay by card now, on the phone, but it's actually cheaper online. You get five per cent off." },
            { speaker: "Linh", voice: 'gb-female', text: "Oh, then I'll do it online tonight." },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-05-q1",
          segmentId: "seg-1",
          number: 1,
          prompt: "Child's name: Bao ___",
          acceptedAnswers: ["Tran"],
          explanation: {
            vi: "Họ được đánh vần: T, R, A, N → Tran.",
            en: "The surname is spelled: T, R, A, N → Tran.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-05-q2",
          segmentId: "seg-1",
          number: 2,
          prompt: "Age: ___",
          acceptedAnswers: ["9", "nine"],
          explanation: {
            vi: "Bé 9 tuổi; 10 tuổi là vào tháng 9 tới (bẫy).",
            en: "He is nine now; ten is next September (distractor).",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-05-q3",
          segmentId: "seg-1",
          number: 3,
          prompt: "Week starting: ___ August",
          acceptedAnswers: ["11", "11th", "eleventh", "the 11th", "the eleventh"],
          explanation: {
            vi: "Tuần bắt đầu ngày 4 đã kín chỗ → tuần bắt đầu ngày 11.",
            en: "The week starting on the fourth is full → the eleventh.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-lis-05-q4",
          segmentId: "seg-1",
          number: 4,
          prompt: "Allergic to: ___",
          acceptedAnswers: ["nuts"],
          explanation: {
            vi: "'allergic to nuts' → nuts (số nhiều), không chỉ peanuts.",
            en: "'Allergic to nuts' → nuts (plural), not only peanuts.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-lis-05-q5",
          segmentId: "seg-2",
          number: 5,
          prompt: "What is the most popular activity at the camp?",
          options: ["A. tennis", "B. football", "C. swimming"],
          correctIndex: 2,
          explanation: {
            vi: "'almost every child asks for' swimming = phổ biến nhất. Tennis, football là bẫy.",
            en: "'Almost every child asks for' swimming = most popular. Tennis and football are distractors.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-lis-05-q6",
          segmentId: "seg-2",
          number: 6,
          prompt: "What does Bao need to bring every day?",
          options: ["A. a packed lunch", "B. a towel", "C. a water bottle"],
          correctIndex: 2,
          explanation: {
            vi: "Bữa trưa và khăn tắm có sẵn; bé phải mang chai nước.",
            en: "Lunch and towels are provided; he must bring a water bottle.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-lis-05-q7",
          segmentId: "seg-3",
          number: 7,
          prompt: "Parents can collect their children from",
          options: ["A. 3.30 p.m.", "B. 4.00 p.m.", "C. 4.30 p.m."],
          correctIndex: 1,
          explanation: {
            vi: "'You can pick him up from four o'clock.' 3.30 là giờ hết hoạt động.",
            en: "'You can pick him up from four o'clock.' 3.30 is when activities end.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-lis-05-q8",
          segmentId: "seg-3",
          number: 8,
          prompt: "How will Linh pay?",
          options: ["A. in cash", "B. by card on the phone", "C. online"],
          correctIndex: 2,
          explanation: {
            vi: "Không nhận tiền mặt; trả online rẻ hơn 5% → cô ấy chọn online.",
            en: "No cash, and online is 5% cheaper, so she'll pay online.",
          },
        },
      ],
    },
    miniTest: [],
  },
]
