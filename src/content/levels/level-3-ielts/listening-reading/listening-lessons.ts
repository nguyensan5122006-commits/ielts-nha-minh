/**
 * listening-lessons.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI LUYỆN NGHE IELTS — LEVEL 3 (band 4.0 – 6.5, CEFR B1–B2), TRACK "ielts".
 *
 * File này CHỈ chứa dữ liệu (nội dung), không có giao diện.
 * Mỗi bài (mode 'listening') đi theo đúng 3 bước:
 *   1. teachingCards : 2 thẻ chiến thuật làm bài (song ngữ Việt/Anh)
 *   2. exercises     : 5–6 câu khởi động (câu cuối luôn là speak-sentence để luyện phát âm)
 *   3. listeningTask : 1 bài nghe dạng đề thật, 3–4 đoạn (segment), 10 câu hỏi.
 *                      Mỗi câu có segmentId -> nút "Nghe lại đoạn này".
 *
 * CHẶNG 10 — Listening Section 1–2 (tình huống đời sống):
 *   l3-i-lis-10-01 : Điền form (form completion)        — gọi điện báo mất đồ trên tàu
 *   l3-i-lis-10-02 : Điền bảng (table completion)       — so sánh 3 nhà hàng tổ chức tiệc
 *   l3-i-lis-10-03 : Trắc nghiệm có bẫy (MCQ)           — buổi giới thiệu cho tình nguyện viên nông trại
 *   l3-i-lis-10-04 : Ghi chú bản đồ (map labelling)     — hướng dẫn tham quan công viên
 *   l3-i-lis-10-05 : Nối thông tin (matching)           — tuần lễ nghệ thuật của thị trấn
 *
 * CHẶNG 11 — Listening Section 3–4 (học thuật):
 *   l3-i-lis-11-01 : Section 3 — ý kiến & đồng ý/phản đối  — thảo luận bài thuyết trình về nông trại thẳng đứng
 *   l3-i-lis-11-02 : Section 3 — flow chart + trắc nghiệm   — 2 sinh viên lên kế hoạch khảo sát đi lại
 *   l3-i-lis-11-03 : Section 4 — signposting + ghi chú      — bài giảng về rừng ngập mặn
 *   l3-i-lis-11-04 : Section 4 — đoán đáp án + tóm tắt      — bài giảng về tiếng chim hót ở thành phố
 *   l3-i-lis-11-05 : Section 4 làm như thi thật            — bài giảng về tơ lụa
 *
 * Giọng đọc: trộn Anh-Anh (gb), Úc (au), Mỹ (us). Số viết như người nói để máy đọc đúng.
 * Mọi kịch bản do nhóm nội dung tự soạn, không chép từ sách luyện thi nào.
 * Kiểu dữ liệu xem ở: src/content/content-types.ts (mục 7 — ListeningTask)
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

/* Bản đồ công viên (bài 10-04): danh sách vị trí có chữ cái + hướng, dùng làm đáp án chung */
const PARK_MAP_OPTIONS = [
  'A. just inside the South Entrance, on the left (west) of the main path',
  'B. just inside the South Entrance, on the right (east) of the main path',
  'C. at the far western end of the east–west path',
  'D. on the right (east) of the main path, just before the crossroads',
  'E. in the north-west corner of the crossroads',
  'F. at the far eastern end of the east–west path',
  'G. beside the lake, on the left (west) of the main path',
  'H. beside the lake, on the right (east) of the main path',
]
const PARK_MAP_REMINDER = '(Map: South Entrance at the bottom, lake at the top, crossroads in the centre.)'

/* Danh sách đặc điểm workshop + địa điểm buổi tối (bài 10-05, dạng matching) */
const WORKSHOP_FEATURES = [
  'A. requires some previous experience',
  'B. takes place outdoors',
  'C. participants can take home what they make',
  'D. has an extra charge for materials',
  'E. is taught by a former student of the college',
  'F. must be booked online in advance',
  'G. has moved to a different day',
]
const EVENING_PLACES = ['A. the town hall', 'B. the market square', 'C. the old cinema', 'D. the park bandstand', 'E. the college theatre']

/* Nhận xét của giảng viên cho từng phần bài thuyết trình (bài 11-01, dạng matching) */
const TUTOR_FEEDBACK_OPTIONS = [
  'A. It should be shorter.',
  'B. It needs more recent figures.',
  'C. It should be presented visually.',
  'D. It is the strongest part.',
  'E. It should be moved earlier.',
  'F. It should be removed.',
]

export const level3IeltsListeningLessons: Lesson[] = [
  // ==========================================================================
  // CHẶNG 10 — BÀI 1: Section 1, điền form — gọi điện báo mất đồ trên tàu
  // ==========================================================================
  {
    id: 'l3-i-lis-10-01',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 20,
    title: { vi: 'Section 1: Điền form — báo mất đồ', en: 'Section 1: Form completion — reporting lost property' },
    description: {
      vi: 'Nghe cuộc gọi báo mất đồ và điền form: tên được đánh vần, số điện thoại, ngày tháng và thông tin bị sửa lại.',
      en: 'Listen to a call about lost property and complete a form: spelled names, phone numbers, dates and corrected details.',
    },
    teachingCards: [
      {
        title: { vi: 'Đoán loại đáp án trước khi nghe', en: 'Predict the answer type' },
        body: {
          vi: 'Trước khi nghe bạn có khoảng **30 giây**. Đọc từng chỗ trống và **đoán loại đáp án**: tên riêng, con số, ngày tháng hay danh từ? Nhìn từ đứng **trước và sau** chỗ trống. VD "Colour: dark ___" → cần một **từ chỉ màu**. Đoán đúng loại giúp bạn **nghe đúng chỗ** và bỏ qua chi tiết thừa.',
          en: 'You get about **30 seconds** before the recording. Read each gap and **predict the answer type**: a name, a number, a date or a noun? Look at the words **before and after** the gap. E.g. "Colour: dark ___" → you need a **colour word**. Knowing the type helps you **listen for the right thing**.',
        },
        examples: [
          { en: 'My postcode is B S seven, four T Q.', vi: 'Postcode → nghe cả chữ cái lẫn con số.' },
          { en: 'I lost it on the twelfth of May.', vi: 'Date of loss → nghe một ngày tháng.' },
        ],
      },
      {
        title: { vi: 'Bẫy sửa lời và đánh vần', en: 'Corrections and spelling traps' },
        body: {
          vi: 'Section 1 rất hay có **bẫy sửa lời**: người nói đưa một thông tin rồi đổi lại ("It\'s the ninth... no, the tenth"). Luôn ghi **thông tin cuối cùng**. Khi đánh vần: **"double L" = LL**, **"oh" = số 0**. Sai **một chữ cái** là mất điểm, nên kiểm tra chính tả kỹ.',
          en: 'Section 1 often has **corrections**: a speaker gives one detail, then changes it ("It\'s the ninth... no, the tenth"). Always write the **final information**. In spelling, **"double L" = LL** and **"oh" = zero**. **One wrong letter** loses the mark, so check your spelling.',
        },
        examples: [{ en: "It's on the fourteenth. No, sorry, the fifteenth.", vi: 'Đáp án là ngày 15 — thông tin sau cùng.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-10-01-ex01',
        type: 'listen-type',
        audioText: 'H, A, double L, O, R, A, N.',
        acceptedAnswers: ['Halloran'],
        explanation: {
          vi: '"Double L" là hai chữ L viết liền: H-A-L-L-O-R-A-N.',
          en: '"Double L" means two Ls together: H-A-L-L-O-R-A-N.',
        },
      },
      {
        id: 'l3-i-lis-10-01-ex02',
        type: 'listen-choose',
        audioText: 'My mobile number is oh seven seven, double nine, four oh three, six one five.',
        question: 'Which number did you hear?',
        options: ['07799 403 615', '07799 430 615', '07709 403 615', '07799 403 651'],
        correctIndex: 0,
        explanation: {
          vi: '"Oh" = số 0, "double nine" = 99 → 07799 403 615.',
          en: '"Oh" is zero and "double nine" is 99 → 07799 403 615.',
        },
      },
      {
        id: 'l3-i-lis-10-01-ex03',
        type: 'multiple-choice',
        question: 'Form: "Colour of bag: dark ___". What should you listen for?',
        options: ['a colour word, e.g. blue or brown', 'a number', "a person's name", 'a verb, e.g. carry'],
        correctIndex: 0,
        explanation: {
          vi: 'Chữ "Colour" và "dark" cho biết cần một từ chỉ màu sắc.',
          en: '"Colour" and "dark" tell you the answer is a colour word.',
        },
      },
      {
        id: 'l3-i-lis-10-01-ex04',
        type: 'listen-choose',
        audioText:
          "Clerk: So you lost it on Tuesday the fourteenth?\nCaller: Hmm, no. I think it was the Monday. Yes, Monday the thirteenth, because I'd been to the dentist that morning.",
        question: 'When did the caller lose the item?',
        options: ['Monday the 13th', 'Tuesday the 14th', 'Monday the 14th', 'Tuesday the 13th'],
        correctIndex: 0,
        explanation: {
          vi: 'Người gọi sửa lại: "Monday the thirteenth". Luôn chọn thông tin cuối cùng.',
          en: 'The caller corrects the clerk: "Monday the thirteenth". Take the final information.',
        },
      },
      {
        id: 'l3-i-lis-10-01-ex05',
        type: 'fill-blank',
        sentence: 'You hear: "It has a brown leather strap." Form: Strap made of ___',
        acceptedAnswers: ['leather'],
        explanation: {
          vi: '"Leather strap" = quai làm bằng da. Form diễn đạt lại bằng "made of".',
          en: '"Leather strap" = a strap made of leather. The form rephrases it.',
        },
      },
      {
        id: 'l3-i-lis-10-01-ex06',
        type: 'speak-sentence',
        sentence: 'I left my rucksack on the six fifteen train.',
        translationVi: 'Tôi để quên ba lô trên chuyến tàu 6 giờ 15.',
        explanation: {
          vi: 'Đọc rõ âm cuối /ft/ trong "left", /k/ trong "rucksack"; nhấn "fif-TEEN".',
          en: 'Pronounce final /ft/ in "left" and /k/ in "rucksack"; stress fif-TEEN.',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–10. Complete the form below (Westbury Station — Lost Property Report). Write ONE WORD AND/OR A NUMBER for each answer.',
      strategyTip: {
        vi: 'Đọc cả form trong 30 giây, gạch chân từ khoá. Nghe "actually", "sorry", "hang on" là dấu hiệu người nói sửa lời.',
        en: 'Read the whole form in 30 seconds. "Actually", "sorry" and "hang on" signal that the speaker is correcting something.',
      },
      segments: [
        {
          id: 'l3-i-lis-10-01-s1',
          lines: [
            { speaker: 'Clerk', voice: 'gb-female', text: 'Good afternoon, Lost Property Office, Westbury Station. How can I help?' },
            { speaker: 'Daniel', voice: 'au-male', text: "Hi. I think I left a bag on one of your trains last week, and I'm hoping someone's handed it in." },
            { speaker: 'Clerk', voice: 'gb-female', text: "Right, I'll take some details and fill in a report for you. Could I have your name, please?" },
            { speaker: 'Daniel', voice: 'au-male', text: "Yes, it's Daniel Hartigan." },
            { speaker: 'Clerk', voice: 'gb-female', text: 'Could you spell your surname for me?' },
            { speaker: 'Daniel', voice: 'au-male', text: 'Sure. H, A, R, T, I, G, A, N.' },
            { speaker: 'Clerk', voice: 'gb-female', text: 'H, A, R, T, I, G, A, N. Thank you. And is there a phone number we can reach you on?' },
            { speaker: 'Daniel', voice: 'au-male', text: "My mobile's best. It's oh seven eight eight four, two one five, nine three oh." },
            { speaker: 'Clerk', voice: 'gb-female', text: 'Let me read that back. Oh seven eight eight four, two one five, nine three oh.' },
            { speaker: 'Daniel', voice: 'au-male', text: "That's right." },
            { speaker: 'Clerk', voice: 'gb-female', text: 'And when did you lose the bag?' },
            {
              speaker: 'Daniel',
              voice: 'au-male',
              text: "It was last Thursday, so that would be the ninth of March. Actually, hang on. I had a meeting in Cardiff that day, and the meeting was definitely on the Friday. So it must have been Friday the tenth.",
            },
            { speaker: 'Clerk', voice: 'gb-female', text: 'Friday the tenth of March. OK.' },
          ],
        },
        {
          id: 'l3-i-lis-10-01-s2',
          lines: [
            { speaker: 'Clerk', voice: 'gb-female', text: 'And which train were you on?' },
            { speaker: 'Daniel', voice: 'au-male', text: "The six o'clock from Cardiff back to Westbury." },
            { speaker: 'Clerk', voice: 'gb-female', text: 'Do you remember which carriage you were sitting in?' },
            {
              speaker: 'Daniel',
              voice: 'au-male',
              text: "I got on at the front, in carriage five, but it was really crowded, so I moved back to the quiet carriage. That was number seven, I'm fairly sure. Yes, seven.",
            },
            { speaker: 'Clerk', voice: 'gb-female', text: 'Carriage seven. And can you describe the bag for me?' },
            { speaker: 'Daniel', voice: 'au-male', text: "It's not a suitcase or anything big. It's a laptop bag, the kind you carry over your shoulder." },
            { speaker: 'Clerk', voice: 'gb-female', text: 'What colour is it?' },
            { speaker: 'Daniel', voice: 'au-male', text: "Most people think it's black when they see it, but it's actually dark green." },
            { speaker: 'Clerk', voice: 'gb-female', text: 'Dark green. Is there anything that would help us identify it? A lot of laptop bags look the same.' },
            {
              speaker: 'Daniel',
              voice: 'au-male',
              text: "Yes, there's a small badge on the front pocket. It's from a walking club I belong to, and it's got a picture of a mountain on it.",
            },
            { speaker: 'Clerk', voice: 'gb-female', text: "That's very helpful. A badge on the front pocket." },
          ],
        },
        {
          id: 'l3-i-lis-10-01-s3',
          lines: [
            { speaker: 'Clerk', voice: 'gb-female', text: 'And what was inside it?' },
            {
              speaker: 'Daniel',
              voice: 'au-male',
              text: "Well, my laptop, obviously, and the charger. My wallet was in my jacket, thank goodness, but I'm afraid my house keys were in the side pocket of the bag.",
            },
            {
              speaker: 'Clerk',
              voice: 'gb-female',
              text: 'Laptop, charger and keys. Right. Now, let me explain what happens if we find it. You can either collect the bag from this office, or we can send it to you by courier.',
            },
            { speaker: 'Daniel', voice: 'au-male', text: 'How much does the courier cost?' },
            {
              speaker: 'Clerk',
              voice: 'gb-female',
              text: "The courier service is fifteen pounds, and that includes insurance. If you collect it yourself, there's just a small handling fee of three pounds.",
            },
            { speaker: 'Daniel', voice: 'au-male', text: "Oh, I'll definitely collect it, then. The office isn't far from where I work." },
            {
              speaker: 'Clerk',
              voice: 'gb-female',
              text: "Fine. I'll give you a reference number for your report, so please keep it safe. It's L P four four seven one.",
            },
            { speaker: 'Daniel', voice: 'au-male', text: 'L P four four seven one. Got it.' },
            {
              speaker: 'Clerk',
              voice: 'gb-female',
              text: "When you come in, please bring some photo ID, like a driving licence, and the reference number. We'll call you as soon as anything matching your description is handed in.",
            },
            { speaker: 'Daniel', voice: 'au-male', text: 'Brilliant. Thanks very much for your help.' },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q01',
          segmentId: 'l3-i-lis-10-01-s1',
          number: 1,
          prompt: 'Name: Daniel ___',
          acceptedAnswers: ['Hartigan'],
          explanation: {
            vi: 'Anh ấy đánh vần: H, A, R, T, I, G, A, N → Hartigan.',
            en: 'He spells it: H, A, R, T, I, G, A, N → Hartigan.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q02',
          segmentId: 'l3-i-lis-10-01-s1',
          number: 2,
          prompt: 'Mobile number: ___',
          acceptedAnswers: ['07884 215 930', '07884215930', '07884 215930', '07884-215-930', '0788 4215 930'],
          explanation: {
            vi: '"Oh seven eight eight four, two one five, nine three oh" — "oh" là số 0.',
            en: '"Oh seven eight eight four, two one five, nine three oh" — "oh" means zero.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q03',
          segmentId: 'l3-i-lis-10-01-s1',
          number: 3,
          prompt: 'Date of loss: Friday ___ March',
          acceptedAnswers: ['10', '10th', 'tenth', 'the 10th', 'the tenth'],
          explanation: {
            vi: 'Ngày 9 là bẫy; anh ấy sửa lại: "it must have been Friday the tenth".',
            en: 'The ninth is a trap; he corrects it: "it must have been Friday the tenth".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q04',
          segmentId: 'l3-i-lis-10-01-s2',
          number: 4,
          prompt: 'Carriage number: ___',
          acceptedAnswers: ['7', 'seven'],
          explanation: {
            vi: 'Toa 5 đông nên anh chuyển sang toa yên tĩnh, "number seven".',
            en: 'Carriage five was crowded; he moved to the quiet carriage, "number seven".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q05',
          segmentId: 'l3-i-lis-10-01-s2',
          number: 5,
          prompt: 'Item lost: a ___ bag',
          acceptedAnswers: ['laptop'],
          explanation: {
            vi: '"It\'s not a suitcase... It\'s a laptop bag" → laptop.',
            en: '"It\'s not a suitcase... It\'s a laptop bag" → laptop.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q06',
          segmentId: 'l3-i-lis-10-01-s2',
          number: 6,
          prompt: 'Colour: dark ___',
          acceptedAnswers: ['green'],
          explanation: {
            vi: '"Black" là bẫy: "but it\'s actually dark green" → green.',
            en: '"Black" is a trap: "but it\'s actually dark green" → green.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q07',
          segmentId: 'l3-i-lis-10-01-s2',
          number: 7,
          prompt: 'Identifying feature: a ___ on the front pocket',
          acceptedAnswers: ['badge'],
          explanation: {
            vi: '"There\'s a small badge on the front pocket" → badge (huy hiệu).',
            en: '"There\'s a small badge on the front pocket" → badge.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q08',
          segmentId: 'l3-i-lis-10-01-s3',
          number: 8,
          prompt: 'Contents: laptop, charger and ___',
          acceptedAnswers: ['keys'],
          explanation: {
            vi: 'Ví ở trong áo khoác (bẫy); "my house keys were in the side pocket".',
            en: 'The wallet was in his jacket (trap); "my house keys were in the side pocket".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q09',
          segmentId: 'l3-i-lis-10-01-s3',
          number: 9,
          prompt: 'Fee to collect in person: £___',
          acceptedAnswers: ['3', 'three', '3.00'],
          explanation: {
            vi: '15 bảng là phí chuyển phát; tự đến lấy: "a small handling fee of three pounds".',
            en: 'Fifteen pounds is the courier; collecting costs "a small handling fee of three pounds".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-01-q10',
          segmentId: 'l3-i-lis-10-01-s3',
          number: 10,
          prompt: 'Reference number: LP ___',
          acceptedAnswers: ['4471'],
          explanation: {
            vi: '"L P four four seven one" → 4471.',
            en: '"L P four four seven one" → 4471.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 10 — BÀI 2: Section 1, điền bảng — so sánh 3 địa điểm tổ chức tiệc
  // ==========================================================================
  {
    id: 'l3-i-lis-10-02',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 20,
    title: { vi: 'Section 1: Điền bảng — chọn nơi tổ chức tiệc', en: 'Section 1: Table completion — choosing a party venue' },
    description: {
      vi: 'Nghe cuộc gọi so sánh 3 địa điểm tổ chức tiệc và điền bảng: vị trí, giá, ghi chú.',
      en: 'Listen to a call comparing three party venues and complete a table: location, price and notes.',
    },
    teachingCards: [
      {
        title: { vi: 'Đọc bảng theo hàng và cột', en: 'Read the table by rows and columns' },
        body: {
          vi: 'Bảng cho bạn biết **thứ tự thông tin**: người nói thường đi **từng hàng**, từ trái sang phải. Trước khi nghe, đọc **tiêu đề cột** (Location, Price, Notes) để biết mỗi ô cần loại từ gì. Lỡ một ô thì **bỏ qua, theo ô tiếp theo** — đừng đứng lại tiếc nuối.',
          en: 'A table shows you **the order of information**: speakers usually go **row by row**, left to right. Before listening, read the **column headings** (Location, Price, Notes) so you know what each gap needs. If you miss a gap, **move on to the next one** — don\'t stop.',
        },
        examples: [{ en: 'The Boathouse is right beside the lake.', vi: 'Hàng "The Boathouse", cột Location → lake.' }],
      },
      {
        title: { vi: 'Bẫy nhiều con số', en: 'Traps with several numbers' },
        body: {
          vi: 'Khi so sánh các lựa chọn, người nói hay đưa **2–3 con số cho cùng một ô** (giá thường, giá cuối tuần, giá giảm). Đọc kỹ chữ trong đề: "Saturday price", "per person". Từ báo hiệu: **but, goes up to, instead, only on**.',
          en: 'When options are compared, speakers often give **two or three numbers for one gap** (standard, weekend, discount). Read the words in the table carefully: "Saturday price", "per person". Signal words: **but, goes up to, instead, only on**.',
        },
        examples: [
          { en: "It's thirty pounds on weekdays, but it goes up to thirty-six at weekends.", vi: 'Ô "weekend price" → 36, không phải 30.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-10-02-ex01',
        type: 'listen-choose',
        audioText: 'The room can hold up to sixty guests standing, but only forty if everyone is seated at tables.',
        question: 'How many guests can sit down for dinner?',
        options: ['40', '60', '14', '16'],
        correctIndex: 0,
        explanation: {
          vi: '60 là khách đứng; ngồi bàn chỉ "only forty".',
          en: 'Sixty is for standing guests; seated, it is "only forty".',
        },
      },
      {
        id: 'l3-i-lis-10-02-ex02',
        type: 'listen-type',
        audioText: 'We can seat up to fifteen people in the private room.',
        acceptedAnswers: ['We can seat up to fifteen people in the private room', 'We can seat up to 15 people in the private room'],
        explanation: {
          vi: '"fif-TEEN" nhấn âm sau, có /n/ cuối; "FIF-ty" nhấn âm đầu.',
          en: '"fif-TEEN" is stressed at the end with a final /n/; "FIF-ty" at the start.',
        },
      },
      {
        id: 'l3-i-lis-10-02-ex03',
        type: 'multiple-choice',
        question:
          'Table column: "Price per person (Saturday)". You hear: "Normally it\'s twenty-eight a head, but on Saturdays it\'s thirty-five." What do you write?',
        options: ['35', '28', '63', '28–35'],
        correctIndex: 0,
        explanation: {
          vi: 'Cột hỏi giá thứ Bảy → "on Saturdays it\'s thirty-five" → 35.',
          en: 'The column asks for Saturday → "on Saturdays it\'s thirty-five" → 35.',
        },
      },
      {
        id: 'l3-i-lis-10-02-ex04',
        type: 'fill-blank',
        sentence: 'You hear: "There\'s no charge for parking." Table: ___ parking',
        acceptedAnswers: ['free'],
        explanation: {
          vi: '"No charge" (không mất phí) = free.',
          en: '"No charge" means free.',
        },
      },
      {
        id: 'l3-i-lis-10-02-ex05',
        type: 'multiple-choice',
        question: 'You miss the answer for one gap in the table. What should you do?',
        options: [
          'Move on and listen for the next gap',
          'Stop and try to remember what you heard',
          'Wait for the speaker to repeat it',
          'Skip the rest of that row',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Bài nghe chỉ phát 1 lần; dừng lại sẽ mất luôn các ô sau.',
          en: 'You hear it once; stopping makes you miss the next gaps too.',
        },
      },
      {
        id: 'l3-i-lis-10-02-ex06',
        type: 'speak-sentence',
        sentence: 'The hotel is opposite the cathedral, and the parking is free.',
        translationVi: 'Khách sạn ở đối diện nhà thờ lớn, và bãi đỗ xe miễn phí.',
        explanation: {
          vi: 'Âm /θ/ trong "cathedral": đặt lưỡi giữa hai răng; nhấn ca-THE-dral.',
          en: 'Say /θ/ in "cathedral" with your tongue between your teeth; stress ca-THE-dral.',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–10. Complete the table below. Write ONE WORD AND/OR A NUMBER for each answer. (Table columns: Venue | Location | Price per person | Notes)',
      strategyTip: {
        vi: 'Mỗi hàng là một địa điểm. Khi nghe tên địa điểm mới, chuyển mắt xuống hàng tiếp theo.',
        en: 'Each row is one venue. When you hear a new venue name, move your eyes to the next row.',
      },
      segments: [
        {
          id: 'l3-i-lis-10-02-s1',
          lines: [
            { speaker: 'Tom', voice: 'gb-male', text: 'Good morning, Oakfield Venue Finders, Tom speaking.' },
            {
              speaker: 'Megan',
              voice: 'us-female',
              text: "Hi, Tom. My name's Megan Ross. I filled in your online form last week. I'm organising a dinner for my parents' thirtieth wedding anniversary, and you sent me a shortlist of three venues. I'd like to go through them with you before I decide.",
            },
            { speaker: 'Tom', voice: 'gb-male', text: 'Of course. How many guests are you expecting now?' },
            { speaker: 'Megan', voice: 'us-female', text: "About fifty-five. It was going to be seventy, but some relatives can't fly over from the States." },
            { speaker: 'Tom', voice: 'gb-male', text: "Fifty-five. Then all three places are big enough. Let's start with The Boathouse." },
            { speaker: 'Megan', voice: 'us-female', text: 'Is that the one by the canal?' },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: 'No, people often mix it up with the Canal House restaurant. The Boathouse is right beside the lake in Elmwood Park. The dining room has glass walls, so you get a lovely view of the water.',
            },
            { speaker: 'Megan', voice: 'us-female', text: 'That sounds beautiful. What does it cost?' },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: 'Their standard menu is thirty-four pounds per person. But on a Saturday evening, which is when you want it, the price goes up to thirty-eight.',
            },
            { speaker: 'Megan', voice: 'us-female', text: 'Thirty-eight. OK. Is there anything else I should know?' },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "Just one thing. They don't have a sound system, so if you'd like music, you'd have to bring your own speakers. Quite a few families do that.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-02-s2',
          lines: [
            { speaker: 'Megan', voice: 'us-female', text: 'Fine. What about the second one, Hilltop Barn?' },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "Hilltop Barn is about ten kilometres outside town, on a working farm. It's very popular for family parties because there's so much space. The main hall can take up to a hundred and twenty people, so you'd have plenty of room for dancing.",
            },
            { speaker: 'Megan', voice: 'us-female', text: "That's far more than we need. How much is it?" },
            { speaker: 'Tom', voice: 'gb-male', text: "Thirty-two pounds a head, and that's the same on any day of the week." },
            { speaker: 'Megan', voice: 'us-female', text: "That's cheaper. Is it easy to get to? Some of my relatives are quite elderly." },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "It's a bit difficult without a car. There's no bus service out there. But there's free parking right outside the hall for up to forty cars.",
            },
            { speaker: 'Megan', voice: 'us-female', text: 'And inside? My grandmother uses a wheelchair.' },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "The hall itself is on the ground floor, so that's fine. But I should mention that the toilets are upstairs, and there's no lift. They're hoping to put one in next year.",
            },
            { speaker: 'Megan', voice: 'us-female', text: 'Ah. That could be a problem.' },
          ],
        },
        {
          id: 'l3-i-lis-10-02-s3',
          lines: [
            { speaker: 'Megan', voice: 'us-female', text: "And the last one was a hotel, wasn't it?" },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "Yes, the Old Mill Hotel. It's in the town centre, opposite the cathedral, so it's easy for everyone to get to by bus or taxi.",
            },
            { speaker: 'Megan', voice: 'us-female', text: "I think I've walked past it. It looks expensive." },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "It is the most expensive of the three. It's forty-five pounds per person. But that includes quite a lot. You get a private dining room, a three-course meal, and they decorate the tables with fresh flowers at no extra cost.",
            },
            { speaker: 'Megan', voice: 'us-female', text: "Oh, that's nice. My mum loves flowers. Is there any way to bring the price down?" },
            {
              speaker: 'Tom',
              voice: 'gb-male',
              text: "Well, if you held the dinner on a Friday instead of a Saturday, they'd take five pounds off per person. On Sundays they give every guest a free glass of sparkling juice, but the price stays the same.",
            },
            {
              speaker: 'Megan',
              voice: 'us-female',
              text: 'Friday could actually work. Most of the family finish work early on Fridays. Could I go and see the hotel this week?',
            },
            { speaker: 'Tom', voice: 'gb-male', text: "Of course. I'll ask the manager to give you a call." },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q01',
          segmentId: 'l3-i-lis-10-02-s1',
          number: 1,
          prompt: 'The Boathouse | Location: beside the ___ in Elmwood Park',
          acceptedAnswers: ['lake'],
          explanation: {
            vi: '"Canal" là bẫy; The Boathouse "is right beside the lake".',
            en: '"Canal" is a trap; The Boathouse "is right beside the lake".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q02',
          segmentId: 'l3-i-lis-10-02-s1',
          number: 2,
          prompt: 'The Boathouse | Price per person (Saturday evening): £___',
          acceptedAnswers: ['38', 'thirty-eight', 'thirty eight'],
          explanation: {
            vi: '34 là giá thường; tối thứ Bảy "the price goes up to thirty-eight".',
            en: 'Thirty-four is standard; on Saturday evening "the price goes up to thirty-eight".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q03',
          segmentId: 'l3-i-lis-10-02-s1',
          number: 3,
          prompt: 'The Boathouse | Notes: for music, bring your own ___',
          acceptedAnswers: ['speakers'],
          explanation: {
            vi: 'Không có hệ thống âm thanh: "bring your own speakers".',
            en: 'No sound system, so "you\'d have to bring your own speakers".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q04',
          segmentId: 'l3-i-lis-10-02-s2',
          number: 4,
          prompt: 'Hilltop Barn | Location: 10 km outside town, on a ___',
          acceptedAnswers: ['farm'],
          explanation: {
            vi: '"Ten kilometres outside town, on a working farm" → farm.',
            en: '"Ten kilometres outside town, on a working farm" → farm.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q05',
          segmentId: 'l3-i-lis-10-02-s2',
          number: 5,
          prompt: 'Hilltop Barn | Notes: free ___ for up to 40 cars',
          acceptedAnswers: ['parking'],
          explanation: {
            vi: '"Free parking right outside the hall for up to forty cars".',
            en: '"Free parking right outside the hall for up to forty cars".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q06',
          segmentId: 'l3-i-lis-10-02-s2',
          number: 6,
          prompt: 'Hilltop Barn | Notes: toilets upstairs, no ___',
          acceptedAnswers: ['lift'],
          explanation: {
            vi: '"The toilets are upstairs, and there\'s no lift" → lift (thang máy).',
            en: '"The toilets are upstairs, and there\'s no lift" → lift.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q07',
          segmentId: 'l3-i-lis-10-02-s3',
          number: 7,
          prompt: 'Old Mill Hotel | Location: town centre, opposite the ___',
          acceptedAnswers: ['cathedral'],
          explanation: {
            vi: '"Opposite the cathedral" — chú ý chính tả c-a-t-h-e-d-r-a-l.',
            en: '"Opposite the cathedral" — check the spelling: c-a-t-h-e-d-r-a-l.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q08',
          segmentId: 'l3-i-lis-10-02-s3',
          number: 8,
          prompt: 'Old Mill Hotel | Price per person: £___',
          acceptedAnswers: ['45', 'forty-five', 'forty five'],
          explanation: {
            vi: '"It\'s forty-five pounds per person" — đắt nhất trong ba nơi.',
            en: '"It\'s forty-five pounds per person" — the most expensive of the three.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q09',
          segmentId: 'l3-i-lis-10-02-s3',
          number: 9,
          prompt: 'Old Mill Hotel | Notes: tables decorated with fresh ___',
          acceptedAnswers: ['flowers'],
          explanation: {
            vi: '"They decorate the tables with fresh flowers at no extra cost".',
            en: '"They decorate the tables with fresh flowers at no extra cost".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-02-q10',
          segmentId: 'l3-i-lis-10-02-s3',
          number: 10,
          prompt: 'Old Mill Hotel | Notes: £5 off per person on a ___',
          acceptedAnswers: ['Friday', 'Fridays'],
          explanation: {
            vi: 'Thứ Sáu giảm 5 bảng; Chủ nhật chỉ tặng đồ uống (bẫy).',
            en: 'Friday gets five pounds off; Sunday only gives a free drink (trap).',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 10 — BÀI 3: Section 2, trắc nghiệm có bẫy — giới thiệu cho tình nguyện viên
  // ==========================================================================
  {
    id: 'l3-i-lis-10-03',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 22,
    title: { vi: 'Section 2: Trắc nghiệm và đáp án gây nhiễu', en: 'Section 2: Multiple choice with distractors' },
    description: {
      vi: 'Nghe bài nói giới thiệu cho tình nguyện viên nông trại thành phố và nhận ra bẫy trong câu trắc nghiệm.',
      en: 'Listen to a welcome talk for city farm volunteers and learn to spot the traps in multiple-choice questions.',
    },
    teachingCards: [
      {
        title: { vi: 'Bẫy trong câu trắc nghiệm', en: 'How MCQ distractors work' },
        body: {
          vi: 'Trong Section 2, **cả 3 đáp án thường đều được nhắc đến**. Hai đáp án sai bị **phủ định**, **đã thay đổi** hoặc nói về **chuyện khác**. Nghe kỹ các từ báo hiệu: **but, actually, used to, not any more, instead, in fact**. Đáp án đúng thường đến **sau** những từ này.',
          en: 'In Section 2, **all three options are often mentioned**. The wrong ones are **rejected**, **have changed**, or refer to **something else**. Listen for signal words: **but, actually, used to, not any more, instead, in fact**. The right answer often comes **after** them.',
        },
        examples: [
          { en: 'We used to give volunteers a handbook, but now they work with a buddy.', vi: '"Handbook" là bẫy (used to); đáp án là "buddy".' },
        ],
      },
      {
        title: { vi: 'Đọc câu hỏi, gạch ý chính', en: 'Underline the key idea in the question' },
        body: {
          vi: 'Đáp án được **diễn đạt lại (paraphrase)**, hiếm khi trùng từ. Gạch chân ý chính của câu hỏi: **most, main, first, from next month, still**. VD câu hỏi "Most of the money comes from…" → nghe "**the bulk of** our income" hoặc "**mainly** from".',
          en: 'Options are **paraphrased** and rarely use the same words. Underline the key idea in the question: **most, main, first, from next month, still**. E.g. "Most of the money comes from…" → listen for "**the bulk of** our income" or "**mainly** from".',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-10-03-ex01',
        type: 'listen-choose',
        audioText: "We were going to hold the meeting in the hall, but it's being painted, so we'll meet in the garden instead.",
        question: 'Where will the meeting be?',
        options: ['in the garden', 'in the hall', 'in the café'],
        correctIndex: 0,
        explanation: {
          vi: '"Were going to... but... instead" → kế hoạch đổi sang khu vườn.',
          en: '"Were going to... but... instead" → the plan changed to the garden.',
        },
      },
      {
        id: 'l3-i-lis-10-03-ex02',
        type: 'listen-choose',
        audioText: "A lot of people think the museum is free, but actually there's a small entry charge of four pounds.",
        question: 'What is true about the museum?',
        options: ['Visitors have to pay to enter.', 'It is free for everyone.', 'It is free on weekdays.'],
        correctIndex: 0,
        explanation: {
          vi: '"But actually" bác bỏ ý "free" → phải trả 4 bảng.',
          en: '"But actually" rejects "free" → there is a four-pound charge.',
        },
      },
      {
        id: 'l3-i-lis-10-03-ex03',
        type: 'multiple-choice',
        question: 'Option: "Most of the money comes from the council." Which sentence from a recording means the same?',
        options: [
          '"The council provides the bulk of our income."',
          '"We often work closely with the council."',
          '"The council gave us a small grant last year."',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"The bulk of our income" = phần lớn tiền → khớp "most of the money".',
          en: '"The bulk of our income" = most of the money.',
        },
      },
      {
        id: 'l3-i-lis-10-03-ex04',
        type: 'fill-blank',
        sentence: 'We ___ to give volunteers a handbook, but now they work with a buddy. (a past habit that has stopped)',
        acceptedAnswers: ['used'],
        explanation: {
          vi: '"Used to" = trước đây thường làm, nay không còn — dấu hiệu bẫy.',
          en: '"Used to" = a past habit that has stopped — a common distractor signal.',
        },
      },
      {
        id: 'l3-i-lis-10-03-ex05',
        type: 'speak-sentence',
        sentence: 'Strong boots are essential, especially in winter when the paths get muddy.',
        translationVi: 'Ủng chắc chắn là rất cần thiết, nhất là vào mùa đông khi đường lầy lội.',
        explanation: {
          vi: 'Đọc rõ /ts/ trong "boots" và /θs/ trong "paths"; đừng nuốt âm cuối.',
          en: 'Say the final /ts/ in "boots" and /θs/ in "paths" clearly.',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions: 'Questions 1–10. Choose the correct letter, A, B or C.',
      strategyTip: {
        vi: 'Trước mỗi phần, đọc nhanh 3 đáp án. Khi nghe cả 3 được nhắc, hỏi: cái nào bị phủ định, cái nào đã thay đổi?',
        en: 'Skim the three options first. When all three are mentioned, ask: which one is rejected, and which has changed?',
      },
      segments: [
        {
          id: 'l3-i-lis-10-03-s1',
          lines: [
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "Good morning, everyone, and welcome to Greenhill City Farm. My name's Jess, and I coordinate the volunteer programme here. Thank you all for giving up your Saturday morning. Before we start the tour, I'd like to tell you a little about the farm and how things work.",
            },
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: 'The farm opened twenty-two years ago, on land that used to be the car park of a large factory. When the factory closed down, a group of local parents wanted somewhere for children to learn where food comes from, and they persuaded the council to let them use the site.',
            },
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "People often assume that the council runs the farm, but in fact we're an independent charity. Most of our money comes from donations and from the café, although we do get a small grant from the council each year to pay for school visits.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-03-s2',
          lines: [
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "Now, about your role. We have around sixty volunteers at the moment, and they do all sorts of jobs. When people sign up, they usually imagine they'll be spending all day with the animals, and of course there's some of that. But actually, the job that takes up most volunteer time is looking after the vegetable gardens: weeding, watering and harvesting. The animals are fed mainly by our two paid staff, because they need a very regular routine.",
            },
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "For your first month, you'll work alongside an experienced volunteer. We call them buddies. Your buddy will show you where the tools are kept and how to use them safely. We used to give new volunteers a thick handbook to read instead, but we found people learned much more by working with someone beside them. You'll still get a short safety leaflet, but your buddy is the main way you'll learn.",
            },
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "As for clothing, please don't wear anything you care about, because you will get dirty. We provide waterproof jackets and gloves, but we don't have enough boots for everyone, so please bring your own. Strong boots are essential, especially in winter, when the paths get very muddy.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-03-s3',
          lines: [
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "Let me tell you about a couple of changes this year. The first is our opening hours. Until now, we've been open to the public every day except Monday. From next month, we'll also be closed on Tuesdays, because visitor numbers are very low then, and it gives the staff time to do repairs. Volunteers are still welcome to come in on Tuesdays and help with that work.",
            },
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "The other big change is a new project with the hospital down the road. Some patients who are recovering from long illnesses will come here once a week to do some light gardening. The doctors believe that being outdoors and doing gentle exercise helps people get better more quickly. We're not asking you to give any kind of medical help, of course. Your job is simply to make the patients feel welcome and show them what to do.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-03-s4',
          lines: [
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "Finally, a few practical things. Lunch. The café is run by our staff, and volunteers get a discount on anything they buy there, about a fifth off the normal price. It isn't free, I'm afraid. Lots of volunteers bring a packed lunch, which is absolutely fine, but please eat it in the meeting room and not near the animals.",
            },
            {
              speaker: 'Jess',
              voice: 'au-female',
              text: "And the last thing. Our open day is in June. It's the biggest event of the year, and we need volunteers to run the children's activities, things like face painting and egg-and-spoon races. If you're interested, put your name on the list by the door. We've already got more than enough people to help with car parking, and the ticket desk is always run by staff, so it's really only the children's activities that we still need help with.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q01',
          segmentId: 'l3-i-lis-10-03-s1',
          number: 1,
          prompt: 'Before the farm opened, the land was used as',
          options: ['A. a car park.', 'B. a factory.', 'C. a school playing field.'],
          correctIndex: 0,
          explanation: {
            vi: '"Land that used to be the car park of a large factory" → bãi đỗ xe, không phải nhà máy.',
            en: '"Land that used to be the car park of a large factory" → a car park.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q02',
          segmentId: 'l3-i-lis-10-03-s1',
          number: 2,
          prompt: 'Who started the farm?',
          options: ['A. the city council', 'B. a group of local parents', 'C. the owners of a factory'],
          correctIndex: 1,
          explanation: {
            vi: '"A group of local parents" lập ra; hội đồng chỉ cho mượn đất.',
            en: '"A group of local parents" started it; the council only allowed them to use the site.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q03',
          segmentId: 'l3-i-lis-10-03-s1',
          number: 3,
          prompt: "Most of the farm's money comes from",
          options: ['A. a council grant.', 'B. school visits.', 'C. donations and café sales.'],
          correctIndex: 2,
          explanation: {
            vi: '"Most of our money comes from donations and from the café"; trợ cấp chỉ "small".',
            en: '"Most of our money comes from donations and from the café"; the grant is "small".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q04',
          segmentId: 'l3-i-lis-10-03-s2',
          number: 4,
          prompt: 'Volunteers spend most of their time',
          options: ['A. working in the vegetable gardens.', 'B. feeding the animals.', 'C. helping in the café.'],
          correctIndex: 0,
          explanation: {
            vi: '"But actually, the job that takes up most volunteer time is looking after the vegetable gardens".',
            en: '"But actually, the job that takes up most volunteer time is looking after the vegetable gardens".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q05',
          segmentId: 'l3-i-lis-10-03-s2',
          number: 5,
          prompt: 'New volunteers will mainly learn their jobs by',
          options: ['A. reading a handbook.', 'B. attending a safety course.', 'C. working with an experienced volunteer.'],
          correctIndex: 2,
          explanation: {
            vi: 'Sổ tay là "used to" (bẫy); "your buddy is the main way you\'ll learn".',
            en: 'The handbook is "used to" (trap); "your buddy is the main way you\'ll learn".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q06',
          segmentId: 'l3-i-lis-10-03-s2',
          number: 6,
          prompt: 'Volunteers need to bring their own',
          options: ['A. gloves.', 'B. waterproof jackets.', 'C. boots.'],
          correctIndex: 2,
          explanation: {
            vi: 'Áo và găng tay được phát; "not enough boots... please bring your own".',
            en: 'Jackets and gloves are provided; "not enough boots... please bring your own".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q07',
          segmentId: 'l3-i-lis-10-03-s3',
          number: 7,
          prompt: 'From next month, the farm will be closed to the public on',
          options: ['A. Mondays and Tuesdays.', 'B. Tuesdays only.', 'C. Mondays only.'],
          correctIndex: 0,
          explanation: {
            vi: 'Đã đóng thứ Hai; "we\'ll also be closed on Tuesdays" → cả hai ngày.',
            en: 'Already closed on Mondays; "we\'ll also be closed on Tuesdays" → both days.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q08',
          segmentId: 'l3-i-lis-10-03-s3',
          number: 8,
          prompt: 'In the hospital project, volunteers will',
          options: ['A. visit patients in hospital.', 'B. help patients feel welcome.', 'C. give patients basic medical care.'],
          correctIndex: 1,
          explanation: {
            vi: '"Not asking you to give any kind of medical help... make the patients feel welcome".',
            en: '"Not asking you to give any kind of medical help... make the patients feel welcome".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q09',
          segmentId: 'l3-i-lis-10-03-s4',
          number: 9,
          prompt: 'What does Jess say about lunch?',
          options: [
            'A. Volunteers can eat free in the café.',
            'B. Volunteers must not bring their own food.',
            'C. Volunteers pay less for food in the café.',
          ],
          correctIndex: 2,
          explanation: {
            vi: '"A discount... about a fifth off" = trả ít hơn; "It isn\'t free".',
            en: '"A discount... about a fifth off" = they pay less; "It isn\'t free".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-03-q10',
          segmentId: 'l3-i-lis-10-03-s4',
          number: 10,
          prompt: 'For the open day, the farm still needs help with',
          options: ["A. children's activities.", 'B. car parking.', 'C. the ticket desk.'],
          correctIndex: 0,
          explanation: {
            vi: 'Bãi xe đã đủ người, quầy vé do nhân viên lo → chỉ còn hoạt động trẻ em.',
            en: 'Parking is full and staff run tickets → "only the children\'s activities".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 10 — BÀI 4: Section 2, ghi chú bản đồ — hướng dẫn tham quan công viên
  // (Không có hình: bản đồ được mô tả bằng chữ trong instructions + danh sách vị trí A–H)
  // ==========================================================================
  {
    id: 'l3-i-lis-10-04',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 22,
    title: { vi: 'Section 2: Ghi chú bản đồ', en: 'Section 2: Map labelling' },
    description: {
      vi: 'Nghe kiểm lâm hướng dẫn đường đi trong công viên, xác định vị trí các địa điểm trên bản đồ và ghi chú.',
      en: 'Follow a park ranger\'s directions, find places on a map and complete some notes.',
    },
    teachingCards: [
      {
        title: { vi: 'Định hướng bản đồ trước khi nghe', en: 'Orient yourself before listening' },
        body: {
          vi: 'Trước khi nghe, tìm **điểm bắt đầu** (lối vào, "You are here") và **hướng** (bắc ở trên). Nghe kỹ từ chỉ vị trí: **on your left/right, opposite, just before, at the end of, in the corner, carry straight on**. Người nói đi theo **một lộ trình**, nên đáp án thường đến **theo thứ tự**.',
          en: 'Before listening, find the **starting point** (entrance, "You are here") and the **direction** (north at the top). Listen for position words: **on your left/right, opposite, just before, at the end of, in the corner, carry straight on**. The speaker follows **a route**, so answers usually come **in order**.',
        },
        examples: [{ en: "Just before the crossroads, on your right, you'll see the playground.", vi: '"Just before" = ngay trước khi tới ngã tư.' }],
      },
      {
        title: { vi: 'Trái/phải đổi theo hướng đi', en: 'Left and right depend on direction' },
        body: {
          vi: '"On your left" phụ thuộc vào **hướng bạn đang đi**. Đi lên phía bắc thì trái = tây; đi xuống phía nam thì trái = **đông**. Hãy **dùng ngón tay đi theo** lộ trình. Cẩn thận chỗ **đã đổi chức năng** ("used to be a shop, now toilets") — đó là bẫy.',
          en: '"On your left" depends on **which way you are walking**. Walking north, left = west; walking south, left = **east**. **Trace the route** with your finger. Watch for places that **have changed** ("used to be a shop, now toilets") — that\'s a trap.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-10-04-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm chỉ vị trí với nghĩa tiếng Việt.', en: 'Match each direction phrase with its meaning.' },
        pairs: [
          { left: 'opposite', right: 'đối diện' },
          { left: 'just before', right: 'ngay trước khi tới' },
          { left: 'at the end of the path', right: 'ở cuối con đường' },
          { left: 'in the north-west corner', right: 'ở góc tây bắc' },
          { left: 'carry straight on', right: 'đi thẳng tiếp' },
        ],
        explanation: {
          vi: 'Đây là các cụm xuất hiện nhiều nhất trong dạng bài bản đồ.',
          en: 'These phrases appear in almost every map task.',
        },
      },
      {
        id: 'l3-i-lis-10-04-ex02',
        type: 'listen-choose',
        audioText: 'Walk along the main path and turn left at the fountain. The gift shop is the second building on your right.',
        question: 'Where is the gift shop?',
        options: [
          'after turning left at the fountain, the second building on the right',
          'before the fountain, on the left',
          'after turning right at the fountain, the second building on the left',
          'directly opposite the fountain',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Turn left at the fountain... the second building on your right".',
          en: '"Turn left at the fountain... the second building on your right".',
        },
      },
      {
        id: 'l3-i-lis-10-04-ex03',
        type: 'multiple-choice',
        question: 'You are walking NORTH up a path. The speaker says "the pond is on your right". Which side of the map is the pond on?',
        options: ['east', 'west', 'north', 'south'],
        correctIndex: 0,
        explanation: {
          vi: 'Quay mặt về bắc thì tay phải là phía đông.',
          en: 'When you face north, your right is east.',
        },
      },
      {
        id: 'l3-i-lis-10-04-ex04',
        type: 'multiple-choice',
        question: 'You are walking SOUTH (down the map). The speaker says "on your left". Which side of the map is that?',
        options: ['east', 'west'],
        correctIndex: 0,
        explanation: {
          vi: 'Quay mặt về nam thì tay trái là phía đông — ngược với khi đi lên.',
          en: 'Facing south, your left is east — the opposite of walking north.',
        },
      },
      {
        id: 'l3-i-lis-10-04-ex05',
        type: 'listen-choose',
        audioText: 'The old ticket office next to the gate is now a small museum. Tickets are sold at the kiosk opposite.',
        question: 'Where can visitors buy tickets?',
        options: ['at the kiosk opposite the old ticket office', 'at the old ticket office', 'in the small museum'],
        correctIndex: 0,
        explanation: {
          vi: 'Phòng vé cũ nay là bảo tàng (bẫy); vé bán ở "the kiosk opposite".',
          en: 'The old ticket office is now a museum (trap); tickets are sold at "the kiosk opposite".',
        },
      },
      {
        id: 'l3-i-lis-10-04-ex06',
        type: 'speak-sentence',
        sentence: 'Walk straight over the crossroads, and the bird hide is on your left.',
        translationVi: 'Đi thẳng qua ngã tư, chòi ngắm chim nằm bên trái bạn.',
        explanation: {
          vi: 'Đọc rõ /dz/ cuối "crossroads" và /d/ cuối "hide"; "straight" có /t/ cuối.',
          en: 'Pronounce final /dz/ in "crossroads", /d/ in "hide" and /t/ in "straight".',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–7. Label the map of Larchwood Country Park. Choose the correct letter, A–H. MAP: The Visitor Centre is at the South Entrance, at the bottom of the map. A main path runs north from the entrance to a lake at the top. Halfway along, a second path crosses it from west to east, making a crossroads in the centre of the park. Questions 8–10. Complete the notes. Write ONE WORD AND/OR A NUMBER for each answer.',
      strategyTip: {
        vi: 'Đặt ngón tay ở Visitor Centre và di chuyển theo lời người nói. Nhớ: đi lên phía bắc thì "left" là phía tây.',
        en: 'Put your finger on the Visitor Centre and move it as the speaker talks. Walking north, "left" means west.',
      },
      segments: [
        {
          id: 'l3-i-lis-10-04-s1',
          lines: [
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "Good morning, everyone, and welcome to Larchwood Country Park. I'm Mark, one of the rangers here. Before you set off, I'm going to give you a quick guide to the park using the big map on the wall, so you know where everything is.",
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "We're standing in the Visitor Centre, which is at the South Entrance, at the bottom of the map. As you can see, one main path goes straight up the middle of the park, from here all the way to the lake at the top. About halfway along, it crosses another path that runs from west to east, so there's a crossroads right in the centre of the park.",
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "Let's start close to where we are now. As soon as you walk out of the Visitor Centre, the first building on your left is the café. It's got a big terrace, so if the weather's nice you can sit outside. On the other side of the main path, directly opposite the café, there used to be a gift shop. We've turned that building into new toilets, which are much bigger and cleaner than the old ones that used to be down by the lake.",
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "Now, if you've got children with you, they'll want to find the adventure playground. Walk up the main path towards the crossroads, and just before you reach it, you'll see the playground on your right. It has a high fence all the way round, so it's safe for young children.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-04-s2',
          lines: [
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "When you get to the crossroads, you have a choice. If you turn left and follow the path all the way to the end, you'll come to the picnic area. There are plenty of tables, and it's shaded by some huge old oak trees. Please don't light fires or barbecues there, or anywhere else in the park.",
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "If you turn right at the crossroads instead and go to the very end of that path, you'll reach the cycle hire centre. You can hire bikes for adults and children, by the hour or for the whole day.",
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "Right in the corner of the crossroads, on the north-west side, is our wildflower meadow. It's at its best in early summer, when it's full of butterflies. Please keep to the paths there so you don't damage the plants.",
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "Then, if you carry straight on over the crossroads, the main path takes you up to the lake. When you reach the water, look to your left and you'll see the bird hide. It's a small wooden hut where you can watch the birds without disturbing them. We've seen herons there several times this week. On the right-hand side of the lake there's the old boathouse, but I'm afraid that's closed for repairs, so there are no boats for hire at the moment.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-04-s3',
          lines: [
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: 'Now, a few rules. Dogs are welcome everywhere in the park, and they can run off the lead on most of the paths. But near the lake, please keep them on a lead, because there are a lot of ducks and swans along the water\'s edge, and dogs tend to chase them.',
            },
            {
              speaker: 'Mark',
              voice: 'gb-male',
              text: "Finally, this Sunday we're running a guided walk with one of our experts. We'd planned a walk about the ancient trees in the park, but unfortunately the expert we'd booked is ill, so instead the walk will be about mushrooms. Autumn is the perfect season to find them, and you'll learn which ones are safe to touch. The walk lasts about two hours. It costs four pounds for adults, and children under sixteen go free. You can book here at the desk in the Visitor Centre. Enjoy your day!",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q01',
          segmentId: 'l3-i-lis-10-04-s1',
          number: 1,
          prompt: `Café ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 0,
          explanation: {
            vi: 'Ra khỏi Visitor Centre, "the first building on your left" → A (phía tây).',
            en: 'Leaving the Visitor Centre, "the first building on your left" → A (west side).',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q02',
          segmentId: 'l3-i-lis-10-04-s1',
          number: 2,
          prompt: `Toilets ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 1,
          explanation: {
            vi: '"Directly opposite the café", cửa hàng cũ nay là nhà vệ sinh → B.',
            en: '"Directly opposite the café", the old gift shop is now toilets → B.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q03',
          segmentId: 'l3-i-lis-10-04-s1',
          number: 3,
          prompt: `Adventure playground ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 3,
          explanation: {
            vi: '"Just before you reach [the crossroads]... on your right" → D.',
            en: '"Just before you reach [the crossroads]... on your right" → D.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q04',
          segmentId: 'l3-i-lis-10-04-s2',
          number: 4,
          prompt: `Picnic area ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 2,
          explanation: {
            vi: 'Ở ngã tư "turn left" (về phía tây), đi "all the way to the end" → C.',
            en: 'At the crossroads "turn left" (west) and go "all the way to the end" → C.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q05',
          segmentId: 'l3-i-lis-10-04-s2',
          number: 5,
          prompt: `Cycle hire ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 5,
          explanation: {
            vi: '"Turn right at the crossroads... the very end of that path" → F (phía đông).',
            en: '"Turn right at the crossroads... the very end of that path" → F (east).',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q06',
          segmentId: 'l3-i-lis-10-04-s2',
          number: 6,
          prompt: `Wildflower meadow ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 4,
          explanation: {
            vi: '"In the corner of the crossroads, on the north-west side" → E.',
            en: '"In the corner of the crossroads, on the north-west side" → E.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-04-q07',
          segmentId: 'l3-i-lis-10-04-s2',
          number: 7,
          prompt: `Bird hide ${PARK_MAP_REMINDER}`,
          options: PARK_MAP_OPTIONS,
          correctIndex: 6,
          explanation: {
            vi: 'Tới hồ, "look to your left" → G. Nhà thuyền bên phải (H) đang đóng cửa.',
            en: 'At the lake, "look to your left" → G. The boathouse on the right (H) is closed.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-04-q08',
          segmentId: 'l3-i-lis-10-04-s3',
          number: 8,
          prompt: 'Dogs: near the lake, they must be kept on a ___',
          acceptedAnswers: ['lead'],
          explanation: {
            vi: '"Near the lake, please keep them on a lead" → lead (dây dắt chó).',
            en: '"Near the lake, please keep them on a lead" → lead.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-04-q09',
          segmentId: 'l3-i-lis-10-04-s3',
          number: 9,
          prompt: "Topic of Sunday's guided walk: ___",
          acceptedAnswers: ['mushrooms', 'mushroom'],
          explanation: {
            vi: '"Trees" là kế hoạch cũ; "instead the walk will be about mushrooms".',
            en: '"Trees" was the old plan; "instead the walk will be about mushrooms".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-10-04-q10',
          segmentId: 'l3-i-lis-10-04-s3',
          number: 10,
          prompt: 'Price of the walk for adults: £___',
          acceptedAnswers: ['4', 'four', '4.00'],
          explanation: {
            vi: '"It costs four pounds for adults"; trẻ dưới 16 tuổi miễn phí.',
            en: '"It costs four pounds for adults"; children under sixteen go free.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 10 — BÀI 5: Section 2, nối thông tin (matching) — tuần lễ nghệ thuật
  // ==========================================================================
  {
    id: 'l3-i-lis-10-05',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 22,
    title: { vi: 'Section 2: Nối thông tin (matching)', en: 'Section 2: Matching' },
    description: {
      vi: 'Nghe phỏng vấn trên radio về tuần lễ nghệ thuật, nối mỗi workshop và sự kiện với thông tin đúng.',
      en: 'Listen to a radio interview about an arts week and match each workshop and event to the correct information.',
    },
    teachingCards: [
      {
        title: { vi: 'Matching: đọc danh sách lựa chọn trước', en: 'Matching: study the options list first' },
        body: {
          vi: 'Dạng matching có **danh sách lựa chọn (A–G) dài hơn số câu hỏi**. Trước khi nghe, đọc danh sách và **gạch chân từ khoá** (outdoors, extra charge, booked). Câu hỏi đi **theo thứ tự** bài nghe; danh sách lựa chọn thì **không**. Mỗi lựa chọn thường chỉ dùng **1 lần**.',
          en: 'In matching, the **options list (A–G) is longer than the number of questions**. Before listening, read the list and **underline key words** (outdoors, extra charge, booked). Questions follow the **order** of the recording; the options **don\'t**. Each option is usually used **only once**.',
        },
      },
      {
        title: { vi: 'Nghe ý, không nghe từ y hệt', en: 'Listen for paraphrase' },
        body: {
          vi: 'Lựa chọn viết "has an extra charge for materials", người nói có thể nói "we ask you to **pay three pounds to cover the paint**". Cẩn thận lựa chọn **được nhắc rồi bị phủ định**: "People ask if they can keep their work. **Unfortunately not.**"',
          en: 'The option says "has an extra charge for materials"; the speaker may say "we ask you to **pay three pounds to cover the paint**". Beware of options that are **mentioned and then rejected**: "People ask if they can keep their work. **Unfortunately not.**"',
        },
        examples: [{ en: 'The whole workshop happens outside.', vi: '= takes place outdoors' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-10-05-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối lựa chọn trong đề với câu người nói có thể dùng.', en: 'Match each option with what a speaker might say.' },
        pairs: [
          { left: 'takes place outdoors', right: 'it all happens outside' },
          { left: 'must be booked in advance', right: 'reserve a place beforehand' },
          { left: 'has an extra charge', right: 'we ask you to pay a bit more' },
          { left: 'requires previous experience', right: "it isn't for complete beginners" },
          { left: 'free of charge', right: "it won't cost you anything" },
        ],
        explanation: {
          vi: 'Đề và bài nghe gần như luôn dùng cách nói khác nhau cho cùng một ý.',
          en: 'The question and the recording almost always express the same idea differently.',
        },
      },
      {
        id: 'l3-i-lis-10-05-ex02',
        type: 'listen-choose',
        audioText: 'You might think the cookery class is just for adults, but actually children over ten are very welcome.',
        question: 'What does the speaker say about the cookery class?',
        options: ['Older children can join it.', 'It is only for adults.', 'It is only for children.'],
        correctIndex: 0,
        explanation: {
          vi: '"But actually children over ten are very welcome" → trẻ trên 10 tuổi tham gia được.',
          en: '"But actually children over ten are very welcome" → older children can join.',
        },
      },
      {
        id: 'l3-i-lis-10-05-ex03',
        type: 'listen-choose',
        audioText: "We had planned to hold the quiz in the café, but there isn't enough room, so it'll be in the sports hall.",
        question: 'Where will the quiz be held?',
        options: ['in the sports hall', 'in the café', 'in the library'],
        correctIndex: 0,
        explanation: {
          vi: '"Had planned... café" là kế hoạch cũ; đổi sang "the sports hall".',
          en: '"Had planned... café" is the old plan; it moved to "the sports hall".',
        },
      },
      {
        id: 'l3-i-lis-10-05-ex04',
        type: 'multiple-choice',
        question: 'A matching task has options A–G and only five questions. Which statement is TRUE?',
        options: [
          'Some options will not be used.',
          'Every option is used once.',
          'The options are listed in the order you hear them.',
          'Each question can have two answers.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '7 lựa chọn cho 5 câu → chắc chắn có 2 lựa chọn thừa.',
          en: 'Seven options for five questions → two options are not used.',
        },
      },
      {
        id: 'l3-i-lis-10-05-ex05',
        type: 'speak-sentence',
        sentence: 'The calligraphy and photography workshops must be booked in advance.',
        translationVi: 'Các lớp thư pháp và nhiếp ảnh phải đặt chỗ trước.',
        explanation: {
          vi: 'Nhấn âm 2: ca-LLI-gra-phy, pho-TO-gra-phy; "booked" kết thúc bằng /t/.',
          en: 'Stress the second syllable: ca-LLI-gra-phy, pho-TO-gra-phy; "booked" ends in /t/.',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–6. What does the speaker say about each workshop? Choose SIX answers from the list, A–G. Questions 7–10. Where will each evening event take place? Choose FOUR answers from the list, A–E.',
      strategyTip: {
        vi: 'Gạch chân 1 từ khoá cho mỗi lựa chọn A–G. Khi nghe tên workshop mới, chờ tới khi người nói xác nhận rồi mới chọn.',
        en: 'Underline one key word in each option A–G. When a new workshop is named, wait until the speaker confirms before choosing.',
      },
      segments: [
        {
          id: 'l3-i-lis-10-05-s1',
          lines: [
            {
              speaker: 'Presenter',
              voice: 'us-male',
              text: "Good morning, and welcome back to Weekend Live. With me in the studio is Fiona Grant, who's organising this year's Kingsford Arts Week. Fiona, welcome.",
            },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Thanks for having me. Arts Week starts on the twelfth of July and runs for seven days, and this year we've got more workshops than ever. They're all held at Kingsford Art College, and for most of them you can just turn up on the day.",
            },
            { speaker: 'Presenter', voice: 'us-male', text: "Let's hear about some of them." },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Well, first there's pottery, which is always popular. People often ask whether they can keep the bowls and cups they make. Unfortunately not, because the pieces have to be fired in the kiln for several days, and we've nowhere to store them. The good news is that the tutor, Sam Reed, studied at the college himself before he opened his own pottery studio in town, so he knows the building and the equipment really well.",
            },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Next is street photography. You'll spend the morning walking around the old town taking pictures, so the whole workshop happens outside, and you'll need comfortable shoes. Some people asked if we could move it to the weekend, but it's staying on the Wednesday, as printed in the programme.",
            },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Then there's mural painting. That's in the main hall, where we've put up huge boards for people to paint on together. We supply the brushes, but because good paint is expensive, we ask everyone to pay an extra three pounds to cover it.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-05-s2',
          lines: [
            { speaker: 'Presenter', voice: 'us-male', text: 'And is there anything for families?' },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Yes, the paper lantern workshop is perfect for families. You'll make a lantern from bamboo and coloured paper, and at the end of the day you take it home with you.",
            },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "For music lovers, there's a songwriting workshop. I should say that it isn't for complete beginners. You'll need to be able to play an instrument, such as the guitar or keyboard, at least at a basic level, because you'll be writing songs in small groups.",
            },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "And finally, there's calligraphy, the art of beautiful handwriting with brushes and ink. This one is different from the others, because there are only twelve places. So you can't just turn up. You have to reserve a place on our website beforehand.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-05-s3',
          lines: [
            { speaker: 'Presenter', voice: 'us-male', text: 'That all sounds great. And what about the evenings?' },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Well, the opening concert is on the first Saturday, and it'll be in the market square. We did think about holding it in the town hall in case it rained, but we really wanted it to be free and open to everyone, so we've hired a big covered stage instead.",
            },
            { speaker: 'Presenter', voice: 'us-male', text: "And I hear there's a film night?" },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "Yes, on the Tuesday. Now, you might expect that to be at the old cinema on Bridge Street, and in the past it always was. But the cinema is closed for renovation this summer, so we'll be showing the films in the college theatre, which has just had a new screen put in.",
            },
          ],
        },
        {
          id: 'l3-i-lis-10-05-s4',
          lines: [
            { speaker: 'Presenter', voice: 'us-male', text: 'What else is happening?' },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: "On the Thursday there's a poetry evening, which is always very relaxed. That'll be in the town hall, in the small room on the first floor. Anyone can sign up on the night to read a poem, either one they've written themselves or an old favourite.",
            },
            { speaker: 'Presenter', voice: 'us-male', text: 'And to finish the week?' },
            {
              speaker: 'Fiona',
              voice: 'au-female',
              text: 'The closing party on the last night will be around the bandstand in the park, with live music and food stalls. And if you made a lantern earlier in the week, bring it along. They look wonderful when it gets dark!',
            },
            { speaker: 'Presenter', voice: 'us-male', text: 'Fiona Grant, thank you very much.' },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q01',
          segmentId: 'l3-i-lis-10-05-s1',
          number: 1,
          prompt: 'Pottery',
          options: WORKSHOP_FEATURES,
          correctIndex: 4,
          explanation: {
            vi: 'Không được mang đồ về (bẫy C); thầy "studied at the college himself" → E.',
            en: 'No taking pieces home (C is a trap); the tutor "studied at the college himself" → E.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q02',
          segmentId: 'l3-i-lis-10-05-s1',
          number: 2,
          prompt: 'Street photography',
          options: WORKSHOP_FEATURES,
          correctIndex: 1,
          explanation: {
            vi: '"The whole workshop happens outside" → B. Ngày học không đổi (bẫy G).',
            en: '"The whole workshop happens outside" → B. The day is not changing (G is a trap).',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q03',
          segmentId: 'l3-i-lis-10-05-s1',
          number: 3,
          prompt: 'Mural painting',
          options: WORKSHOP_FEATURES,
          correctIndex: 3,
          explanation: {
            vi: '"Pay an extra three pounds to cover [the paint]" = phụ phí vật liệu → D.',
            en: '"Pay an extra three pounds to cover [the paint]" = a materials charge → D.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q04',
          segmentId: 'l3-i-lis-10-05-s2',
          number: 4,
          prompt: 'Paper lanterns',
          options: WORKSHOP_FEATURES,
          correctIndex: 2,
          explanation: {
            vi: '"At the end of the day you take it home with you" → C.',
            en: '"At the end of the day you take it home with you" → C.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q05',
          segmentId: 'l3-i-lis-10-05-s2',
          number: 5,
          prompt: 'Songwriting',
          options: WORKSHOP_FEATURES,
          correctIndex: 0,
          explanation: {
            vi: '"It isn\'t for complete beginners... need to be able to play an instrument" → A.',
            en: '"It isn\'t for complete beginners... need to be able to play an instrument" → A.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q06',
          segmentId: 'l3-i-lis-10-05-s2',
          number: 6,
          prompt: 'Calligraphy',
          options: WORKSHOP_FEATURES,
          correctIndex: 5,
          explanation: {
            vi: '"Reserve a place on our website beforehand" = đặt trước qua mạng → F.',
            en: '"Reserve a place on our website beforehand" = booked online in advance → F.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q07',
          segmentId: 'l3-i-lis-10-05-s3',
          number: 7,
          prompt: 'Opening concert',
          options: EVENING_PLACES,
          correctIndex: 1,
          explanation: {
            vi: 'Từng tính tới town hall (bẫy) nhưng chốt "in the market square" → B.',
            en: 'The town hall was considered (trap), but it is "in the market square" → B.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q08',
          segmentId: 'l3-i-lis-10-05-s3',
          number: 8,
          prompt: 'Film night',
          options: EVENING_PLACES,
          correctIndex: 4,
          explanation: {
            vi: 'Rạp cũ đang sửa (bẫy C); chiếu "in the college theatre" → E.',
            en: 'The old cinema is closed (trap C); films are "in the college theatre" → E.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q09',
          segmentId: 'l3-i-lis-10-05-s4',
          number: 9,
          prompt: 'Poetry evening',
          options: EVENING_PLACES,
          correctIndex: 0,
          explanation: {
            vi: '"That\'ll be in the town hall, in the small room on the first floor" → A.',
            en: '"That\'ll be in the town hall, in the small room on the first floor" → A.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-10-05-q10',
          segmentId: 'l3-i-lis-10-05-s4',
          number: 10,
          prompt: 'Closing party',
          options: EVENING_PLACES,
          correctIndex: 3,
          explanation: {
            vi: '"Around the bandstand in the park" → D.',
            en: '"Around the bandstand in the park" → D.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 11 — BÀI 1: Section 3, ý kiến và quyết định — thuyết trình về nông trại thẳng đứng
  // ==========================================================================
  {
    id: 'l3-i-lis-11-01',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 25,
    title: { vi: 'Section 3: Ai nghĩ gì? Đồng ý và phản đối', en: 'Section 3: Opinions, agreement and disagreement' },
    description: {
      vi: 'Nghe 2 sinh viên và giảng viên bàn về bài thuyết trình, chọn quyết định cuối cùng và nối nhận xét với từng phần.',
      en: 'Listen to two students and their tutor discussing a presentation; identify final decisions and match feedback to each section.',
    },
    teachingCards: [
      {
        title: { vi: 'Section 3: ai nói gì, ai chốt?', en: 'Section 3: who says what, who decides?' },
        body: {
          vi: 'Section 3 là **thảo luận học thuật của 2–3 người**. Câu hỏi hay hỏi **ý kiến** và **quyết định cuối cùng**, không chỉ thông tin. Một người đề xuất, người khác có thể **phản đối** — đáp án là điều **cả nhóm chốt lại**. Nhớ **giọng** từng người ngay từ đầu.',
          en: 'Section 3 is an **academic discussion between 2–3 people**. Questions often ask about **opinions** and **final decisions**, not just facts. One person suggests something, another may **disagree** — the answer is what they **finally agree on**. Learn each speaker\'s **voice** at the start.',
        },
      },
      {
        title: { vi: 'Ngôn ngữ đồng ý / phản đối', en: 'Language of agreement and disagreement' },
        body: {
          vi: 'Đồng ý: **That\'s a good point / I agree / Exactly**. Phản đối nhẹ: **I\'m not so sure / I see what you mean, but… / Wouldn\'t it be better to…?** Chốt: **So in the end we… / Let\'s do that then**. Cẩn thận: "**Yes, but…**" thường là **phản đối**!',
          en: 'Agree: **That\'s a good point / I agree / Exactly**. Polite disagreement: **I\'m not so sure / I see what you mean, but… / Wouldn\'t it be better to…?** Decision: **So in the end we… / Let\'s do that then**. Careful: "**Yes, but…**" usually means **disagree**!',
        },
        examples: [{ en: "I see what you mean, but wouldn't it be better to start with a surprising fact?", vi: 'Phản đối lịch sự + đề xuất khác.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-11-01-ex01',
        type: 'listen-choose',
        audioText:
          "Josh: I think we should start with the history of the topic.\nLinh: I see what you mean, but the audience might get bored. Wouldn't it be better to start with a surprising fact?\nJosh: Hmm, fair enough. Let's do that.",
        question: 'How will they start the presentation?',
        options: ['with a surprising fact', 'with the history of the topic', 'with a question to the audience'],
        correctIndex: 0,
        explanation: {
          vi: 'Josh đồng ý ("fair enough. Let\'s do that") với ý của Linh → surprising fact.',
          en: 'Josh accepts Linh\'s idea: "fair enough. Let\'s do that" → a surprising fact.',
        },
      },
      {
        id: 'l3-i-lis-11-01-ex02',
        type: 'multiple-choice',
        question: '"I\'m not so sure that\'s a good idea." What is the speaker doing?',
        options: ['politely disagreeing', 'strongly agreeing', 'asking for information', 'making a final decision'],
        correctIndex: 0,
        explanation: {
          vi: '"I\'m not so sure" là cách phản đối nhẹ nhàng, lịch sự.',
          en: '"I\'m not so sure" is a soft, polite way to disagree.',
        },
      },
      {
        id: 'l3-i-lis-11-01-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu nói với chức năng của nó.', en: 'Match each phrase with its function.' },
        pairs: [
          { left: "That's a fair point.", right: 'agreeing' },
          { left: "Wouldn't it be better to…?", right: 'suggesting an alternative' },
          { left: 'So in the end we decided…', right: 'reporting a decision' },
          { left: 'I see what you mean, but…', right: 'disagreeing politely' },
        ],
        explanation: {
          vi: 'Nhận ra chức năng câu nói giúp bạn biết ý nào là quyết định cuối.',
          en: 'Knowing each phrase\'s function shows you which idea is the final decision.',
        },
      },
      {
        id: 'l3-i-lis-11-01-ex04',
        type: 'listen-choose',
        audioText: 'Tutor: Your data on water use is impressive. The section on costs, though, needs much more detail.',
        question: 'What does the tutor think needs improving?',
        options: ['the section on costs', 'the data on water use', 'the introduction'],
        correctIndex: 0,
        explanation: {
          vi: '"Though" báo hiệu chuyển ý: phần chi phí "needs much more detail".',
          en: '"Though" signals a contrast: the costs section "needs much more detail".',
        },
      },
      {
        id: 'l3-i-lis-11-01-ex05',
        type: 'speak-sentence',
        sentence: 'Vertical farms use far less water than traditional farms.',
        translationVi: 'Nông trại thẳng đứng dùng ít nước hơn nhiều so với nông trại truyền thống.',
        explanation: {
          vi: 'Đọc rõ /mz/ cuối "farms"; nhấn VER-ti-cal và tra-DI-tion-al.',
          en: 'Say the final /mz/ in "farms"; stress VER-ti-cal and tra-DI-tion-al.',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–6. Choose the correct letter, A, B or C. Questions 7–10. What does the tutor say about each section of the presentation? Choose FOUR answers from the list, A–F.',
      strategyTip: {
        vi: 'Với mỗi câu hỏi, chờ tới khi các người nói thống nhất. Ý kiến đầu tiên thường bị bác bỏ.',
        en: 'For each question, wait until the speakers agree. The first idea mentioned is often rejected.',
      },
      segments: [
        {
          id: 'l3-i-lis-11-01-s1',
          lines: [
            { speaker: 'Dr Harper', voice: 'gb-female', text: "Come in, both of you, and have a seat. So, how's the presentation on vertical farming coming along?" },
            {
              speaker: 'Linh',
              voice: 'us-female',
              text: "Pretty well, I think. We've done most of the research, but we wanted to check a few things with you before we start on the slides.",
            },
            { speaker: 'Dr Harper', voice: 'gb-female', text: 'Good. Remind me why you chose this topic. Was it from the reading list?' },
            {
              speaker: 'Josh',
              voice: 'au-male',
              text: "It wasn't, actually. We were going to do something on solar energy, but then Linh visited a vertical farm when she went home to Vietnam last summer.",
            },
            {
              speaker: 'Linh',
              voice: 'us-female',
              text: 'Yes, it was just outside Ho Chi Minh City. They grow lettuce and herbs on shelves, ten layers high, inside a building that used to be a warehouse. I was so impressed that I suggested we change our topic.',
            },
            { speaker: 'Dr Harper', voice: 'gb-female', text: 'A personal experience like that can make a presentation much more engaging, so do use it. Now, how are you dividing the work between you?' },
            {
              speaker: 'Josh',
              voice: 'au-male',
              text: "Well, my first idea was to split it in half. I'd do the technology, and Linh would do the economics. But Linh thought that would make it sound like two separate talks.",
            },
            {
              speaker: 'Linh',
              voice: 'us-female',
              text: "So in the end, we decided to research everything together, and then we'll take turns presenting the sections. That way it should flow better.",
            },
            { speaker: 'Dr Harper', voice: 'gb-female', text: "That sounds sensible, as long as you practise the changeovers. And what's your main argument? You need one clear message." },
            { speaker: 'Josh', voice: 'au-male', text: 'I originally wanted to argue that vertical farms could replace traditional farming for big cities.' },
            {
              speaker: 'Linh',
              voice: 'us-female',
              text: "But the more we read, the clearer it became that that just isn't realistic. They're very good for certain crops, like salad leaves and herbs, but not for rice or wheat. So our message is that vertical farms can add to the food supply of a city, rather than replace farmland.",
            },
            { speaker: 'Dr Harper', voice: 'gb-female', text: "I agree. That's a much easier position to defend." },
          ],
        },
        {
          id: 'l3-i-lis-11-01-s2',
          lines: [
            { speaker: 'Dr Harper', voice: 'gb-female', text: "Let's talk about the benefits. What are you focusing on?" },
            {
              speaker: 'Linh',
              voice: 'us-female',
              text: 'Water, mainly. The plants grow in water with added nutrients instead of soil, and the water is recycled, so some farms use up to ninety-five per cent less water than a field.',
            },
            {
              speaker: 'Josh',
              voice: 'au-male',
              text: "They don't need many pesticides either, but that's also true of a lot of modern greenhouses, so we're only mentioning it briefly. And we were going to talk about transport, because the food is grown close to where people live. But it turns out that transport is a fairly small part of the environmental impact of most food, so we decided not to make a big point of it.",
            },
            { speaker: 'Dr Harper', voice: 'gb-female', text: "Good. That's exactly the kind of critical thinking I want to see. And the drawbacks?" },
            {
              speaker: 'Josh',
              voice: 'au-male',
              text: "The big one is energy. The lights and the air conditioning use a huge amount of electricity, and several companies have actually gone out of business because of rising energy prices. Some people also say the vegetables have less flavour, but we couldn't find any good evidence for that.",
            },
            {
              speaker: 'Linh',
              voice: 'us-female',
              text: 'The farm I visited is trying to deal with the energy problem by putting solar panels on the roof. But the manager told me they only provide about a third of the electricity the farm needs.',
            },
            { speaker: 'Dr Harper', voice: 'gb-female', text: 'Do include that figure. It shows the scale of the problem very clearly.' },
          ],
        },
        {
          id: 'l3-i-lis-11-01-s3',
          lines: [
            {
              speaker: 'Dr Harper',
              voice: 'gb-female',
              text: "Right, you sent me your outline, so let me give you some feedback section by section. The introduction is fine in terms of content, but at the moment it's nearly four minutes long, in a fifteen-minute presentation. That's far too much. Cut it to about two minutes.",
            },
            { speaker: 'Josh', voice: 'au-male', text: 'OK, that makes sense.' },
            {
              speaker: 'Dr Harper',
              voice: 'gb-female',
              text: "Next, the case study of the farm Linh visited. Some students like to put their case study at the very beginning, but I think yours works well where it is. In fact, it's the strongest part of the whole outline. It's original, and the detail is excellent.",
            },
            { speaker: 'Linh', voice: 'us-female', text: "Oh, that's good to hear. We weren't sure it was academic enough." },
            {
              speaker: 'Dr Harper',
              voice: 'gb-female',
              text: "The section on costs is a problem, though. Most of your figures come from a report that was published twelve years ago. Energy prices have changed enormously since then, so you'll need to find more recent data.",
            },
            { speaker: 'Linh', voice: 'us-female', text: "We did wonder about that. We'll look for something from the last two or three years." },
            {
              speaker: 'Dr Harper',
              voice: 'gb-female',
              text: "And finally, the comparison between vertical and traditional farms. At the moment it's a long list of numbers that you read aloud, and the audience will find that hard to follow. Put the key figures into a simple chart on one slide and talk the audience through it. But don't cut it, because it's an important part of your argument.",
            },
            { speaker: 'Josh', voice: 'au-male', text: "Good idea. I'll make the chart this week." },
          ],
        },
      ],
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q01',
          segmentId: 'l3-i-lis-11-01-s1',
          number: 1,
          prompt: 'Why did the students choose vertical farming as their topic?',
          options: ['A. It was on the module reading list.', 'B. One of them had visited a vertical farm.', 'C. Their tutor suggested it.'],
          correctIndex: 1,
          explanation: {
            vi: '"It wasn\'t [from the reading list]... Linh visited a vertical farm" → B.',
            en: '"It wasn\'t [from the reading list]... Linh visited a vertical farm" → B.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q02',
          segmentId: 'l3-i-lis-11-01-s1',
          number: 2,
          prompt: 'How have the students decided to share the work?',
          options: [
            'A. Josh will do the research and Linh will present it.',
            'B. Each student will research and present one half.',
            'C. They will research together and take turns presenting.',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Chia đôi là ý đầu (bị bác); "in the end... research everything together... take turns".',
            en: 'Splitting in half was rejected; "in the end... research everything together... take turns".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q03',
          segmentId: 'l3-i-lis-11-01-s1',
          number: 3,
          prompt: 'What is the main argument of their presentation?',
          options: [
            "A. Vertical farms can usefully add to a city's food supply.",
            'B. Vertical farms will soon replace traditional farms near cities.',
            'C. Vertical farms are too expensive to be worthwhile.',
          ],
          correctIndex: 0,
          explanation: {
            vi: '"Replace" là ý ban đầu của Josh (bị bác); chốt: "add to the food supply".',
            en: 'Josh\'s "replace" idea was rejected; the message is they "add to the food supply".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q04',
          segmentId: 'l3-i-lis-11-01-s2',
          number: 4,
          prompt: 'Which benefit of vertical farming will the students focus on?',
          options: ['A. lower water use', 'B. shorter transport distances', 'C. less use of pesticides'],
          correctIndex: 0,
          explanation: {
            vi: '"Water, mainly"; thuốc trừ sâu chỉ nhắc qua, vận chuyển thì bỏ.',
            en: '"Water, mainly"; pesticides only "briefly", transport dropped.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q05',
          segmentId: 'l3-i-lis-11-01-s2',
          number: 5,
          prompt: 'What do the students say is the main drawback of vertical farms?',
          options: [
            'A. Their vegetables have less flavour.',
            'B. They use large amounts of electricity.',
            'C. They can only be built outside cities.',
          ],
          correctIndex: 1,
          explanation: {
            vi: '"The big one is energy"; chuyện mùi vị thì "couldn\'t find any good evidence".',
            en: '"The big one is energy"; for flavour they "couldn\'t find any good evidence".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q06',
          segmentId: 'l3-i-lis-11-01-s2',
          number: 6,
          prompt: 'What did the farm manager tell Linh about the solar panels?',
          options: [
            'A. They were too expensive to install.',
            'B. They will be replaced next year.',
            'C. They supply about one third of the electricity needed.',
          ],
          correctIndex: 2,
          explanation: {
            vi: '"They only provide about a third of the electricity the farm needs" → C.',
            en: '"They only provide about a third of the electricity the farm needs" → C.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q07',
          segmentId: 'l3-i-lis-11-01-s3',
          number: 7,
          prompt: 'The introduction',
          options: TUTOR_FEEDBACK_OPTIONS,
          correctIndex: 0,
          explanation: {
            vi: '"Nearly four minutes... far too much. Cut it to about two minutes" → A.',
            en: '"Nearly four minutes... far too much. Cut it to about two minutes" → A.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q08',
          segmentId: 'l3-i-lis-11-01-s3',
          number: 8,
          prompt: 'The case study',
          options: TUTOR_FEEDBACK_OPTIONS,
          correctIndex: 3,
          explanation: {
            vi: 'Không cần dời lên (bẫy E); "it\'s the strongest part of the whole outline" → D.',
            en: 'No need to move it (E is a trap); "it\'s the strongest part" → D.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q09',
          segmentId: 'l3-i-lis-11-01-s3',
          number: 9,
          prompt: 'The section on costs',
          options: TUTOR_FEEDBACK_OPTIONS,
          correctIndex: 1,
          explanation: {
            vi: 'Số liệu từ "twelve years ago" → "find more recent data" → B.',
            en: 'Figures from "twelve years ago" → "find more recent data" → B.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-01-q10',
          segmentId: 'l3-i-lis-11-01-s3',
          number: 10,
          prompt: 'The comparison with traditional farms',
          options: TUTOR_FEEDBACK_OPTIONS,
          correctIndex: 2,
          explanation: {
            vi: '"Put the key figures into a simple chart"; "don\'t cut it" loại F → C.',
            en: '"Put the key figures into a simple chart"; "don\'t cut it" rules out F → C.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 11 — BÀI 2: Section 3, flow chart + trắc nghiệm — lên kế hoạch khảo sát
  // ==========================================================================
  {
    id: 'l3-i-lis-11-02',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 25,
    title: { vi: 'Section 3: Flow chart và kế hoạch nghiên cứu', en: 'Section 3: Flow charts and research plans' },
    description: {
      vi: 'Nghe 2 sinh viên lên kế hoạch khảo sát cách đi học, hoàn thành sơ đồ các bước và chọn quyết định cuối cùng.',
      en: 'Listen to two students planning a survey on how students travel, complete a flow chart and identify their final decisions.',
    },
    teachingCards: [
      {
        title: { vi: 'Flow chart đi theo các bước', en: 'Flow charts follow the steps' },
        body: {
          vi: 'Flow chart mô tả **các bước theo thứ tự**. Trước khi nghe, đọc theo mũi tên để biết **bước nào trước, bước nào sau**. Từ báo bước mới: **first, next, then, once we\'ve…, after that, finally**. Tôn trọng giới hạn từ: với "**NO MORE THAN TWO WORDS**", viết 3 từ là **sai**.',
          en: 'A flow chart shows **steps in order**. Before listening, follow the arrows to see **what comes first and what comes next**. Signals of a new step: **first, next, then, once we\'ve…, after that, finally**. Respect the word limit: with "**NO MORE THAN TWO WORDS**", three words is **wrong**.',
        },
      },
      {
        title: { vi: 'Hai người bàn: ý nào được chốt?', en: 'Two speakers: which idea wins?' },
        body: {
          vi: 'Hai sinh viên thường **bàn qua lại** trước khi chốt. Đáp án là **phương án cuối cùng** cả hai đồng ý, không phải ý đầu tiên. Dấu hiệu chốt: **"OK, let\'s…", "…it is", "Fair enough", "You\'re right"**. Nghe con số đầu tiên rồi **chờ** xem có bị đổi không.',
          en: 'Two students usually **discuss back and forth** before deciding. The answer is the **final plan** they both accept, not the first idea. Decision signals: **"OK, let\'s…", "…it is", "Fair enough", "You\'re right"**. Hear the first number, then **wait** to see if it changes.',
        },
        examples: [{ en: "Fifty is too many. Let's say twelve, then.", vi: 'Đáp án là 12, không phải 50.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-11-02-ex01',
        type: 'listen-choose',
        audioText:
          "Ravi: Should we interview fifty people?\nHannah: That's too many for the time we have. Thirty would be plenty.\nRavi: OK, thirty it is.",
        question: 'How many people will they interview?',
        options: ['30', '50', '13'],
        correctIndex: 0,
        explanation: {
          vi: '50 bị bác ("too many"); chốt "thirty it is" → 30.',
          en: 'Fifty is rejected ("too many"); the decision is "thirty it is".',
        },
      },
      {
        id: 'l3-i-lis-11-02-ex02',
        type: 'multiple-choice',
        question:
          'Note: "Survey students outside the ___" (NO MORE THAN TWO WORDS). You hear: "outside the sports centre on the main campus". Which answer is correct?',
        options: ['sports centre', 'sports centre main campus', 'the sports centre on campus', 'main campus'],
        correctIndex: 0,
        explanation: {
          vi: '"Sports centre" đúng ý và đủ 2 từ; các đáp án dài hơn vượt giới hạn.',
          en: '"Sports centre" fits and has two words; the longer answers break the limit.',
        },
      },
      {
        id: 'l3-i-lis-11-02-ex03',
        type: 'fill-blank',
        sentence: "First, we'll test the questionnaire. ___ that, we'll send it to everyone.",
        acceptedAnswers: ['After'],
        explanation: {
          vi: '"After that" = sau đó — từ báo hiệu bước tiếp theo trong flow chart.',
          en: '"After that" signals the next step in a process.',
        },
      },
      {
        id: 'l3-i-lis-11-02-ex04',
        type: 'listen-choose',
        audioText:
          'Hannah: We could ask everyone for their exact age.\nRavi: Some people might not like that. What about an age group, like eighteen to twenty?\nHannah: Good point. Age groups, then.',
        question: 'What information about age will they collect?',
        options: ['an age group', 'the exact age', 'the date of birth'],
        correctIndex: 0,
        explanation: {
          vi: 'Hannah đồng ý ý của Ravi: "Age groups, then" → nhóm tuổi.',
          en: 'Hannah accepts Ravi\'s idea: "Age groups, then".',
        },
      },
      {
        id: 'l3-i-lis-11-02-ex05',
        type: 'speak-sentence',
        sentence: 'We asked twelve students to test the questionnaire first.',
        translationVi: 'Chúng tôi nhờ 12 sinh viên làm thử bảng câu hỏi trước.',
        explanation: {
          vi: '"Asked" đọc /ɑːskt/, đủ 3 âm cuối; "questionnaire" nhấn âm cuối: ques-tion-NAIRE.',
          en: '"Asked" ends in /skt/; "questionnaire" is stressed at the end: ques-tion-NAIRE.',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–6. Complete the notes and flow chart (Student transport survey: method). Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer. Questions 7–10. Choose the correct letter, A, B or C.',
      strategyTip: {
        vi: 'Đánh số các bước trong flow chart trước khi nghe. Mỗi khi nghe "next", "then", "once we\'ve", chuyển sang ô tiếp theo.',
        en: 'Number the steps before listening. Each time you hear "next", "then" or "once we\'ve", move to the next box.',
      },
      segments: [
        {
          id: 'l3-i-lis-11-02-s1',
          lines: [
            { speaker: 'Hannah', voice: 'gb-female', text: 'Right, Ravi, we need to plan the method for our transport survey before we meet Professor Lane on Friday.' },
            { speaker: 'Ravi', voice: 'au-male', text: 'Yes. So our research question is how students travel to campus, and why they choose that way of travelling.' },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "Exactly. Let's start with the questionnaire itself. Obviously we need to ask how people travel and how long the journey takes.",
            },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: "And how far they live from campus. But I don't think we should ask for anyone's exact address. A lot of people won't want to give it.",
            },
            { speaker: 'Hannah', voice: 'gb-female', text: 'True. We could ask for their postcode instead.' },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: 'Even that might put some people off. What about just the name of the area they live in? We can work out the approximate distance from that.',
            },
            { speaker: 'Hannah', voice: 'gb-female', text: "Good idea. It's much less personal. The name of the area, then." },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: "Then the second part is about why they choose their way of travelling. I'd like to list cost, safety and comfort, and ask people to rank them in order of importance.",
            },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "Hmm, ranking questions are hard to analyse, though. In my last project, half the people ranked the items wrongly. Why don't we ask them to give each factor a score on a scale from one to five instead?",
            },
            { speaker: 'Ravi', voice: 'au-male', text: "OK, that's simpler. A rating scale it is." },
          ],
        },
        {
          id: 'l3-i-lis-11-02-s2',
          lines: [
            { speaker: 'Hannah', voice: 'gb-female', text: 'Next, the pilot study. We should test the questionnaire on a small group before we send it to everyone.' },
            { speaker: 'Ravi', voice: 'au-male', text: 'Agreed. How many people should we try it on? I was thinking about fifty.' },
            { speaker: 'Hannah', voice: 'gb-female', text: "That's a lot for a pilot. Ten or twelve would be enough to find any confusing questions." },
            { speaker: 'Ravi', voice: 'au-male', text: "Fair enough. Let's say twelve, then. We could ask people from our seminar group." },
            { speaker: 'Hannah', voice: 'gb-female', text: 'Then, how do we send out the main survey? On paper, or online?' },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: "Online is obviously easier to analyse, but the response rate for online surveys can be really low. Last year's group only got about eight per cent.",
            },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: 'So what if we did both? We send it online, but we also stand at the main bus stop in the mornings with a tablet and ask people directly.',
            },
            { speaker: 'Ravi', voice: 'au-male', text: "Great. That way we'll reach people who'd just ignore an email." },
            { speaker: 'Hannah', voice: 'gb-female', text: 'We should offer something to encourage people to take part, too. A prize draw, maybe?' },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: "The students' union said they'd give us vouchers for the campus café. Ten of them, worth five pounds each.",
            },
            { speaker: 'Hannah', voice: 'gb-female', text: "Perfect. And it won't cost us anything." },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: "Once we've collected everything, I think we should compare our results with the national travel figures on the government website, to see if our students are typical.",
            },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "Hmm, the national figures cover all adults, not just students. Wouldn't it be better to compare them with another university? Hartley University published a very similar survey last year.",
            },
            { speaker: 'Ravi', voice: 'au-male', text: "You're right. That would be a much fairer comparison." },
          ],
        },
        {
          id: 'l3-i-lis-11-02-s3',
          lines: [
            { speaker: 'Hannah', voice: 'gb-female', text: 'So what do you expect to find?' },
            { speaker: 'Ravi', voice: 'au-male', text: "My guess is that most students come by bus, because it's free with a student card." },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "Maybe. But have you noticed that the bike racks are always full these days? I wouldn't be surprised if cycling has overtaken the bus.",
            },
            { speaker: 'Ravi', voice: 'au-male', text: "Well, that's exactly why we're doing the survey." },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "One thing that worries me is the timing. If we do the survey in December, the weather will affect the results. Far fewer people cycle when it's cold and wet.",
            },
            { speaker: 'Ravi', voice: 'au-male', text: "We can't change the deadline, though." },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "No, but we could add a question asking how people travel in the summer as well. Then we'd have a comparison.",
            },
            { speaker: 'Ravi', voice: 'au-male', text: 'Nice. That actually makes the project more interesting.' },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "Something else I'd like to ask Professor Lane about on Friday is ethics approval. Do we need permission to survey other students?",
            },
            {
              speaker: 'Ravi',
              voice: 'au-male',
              text: "I think we do if we're collecting personal information. But as we're not asking for names or addresses, it might just be a short form.",
            },
            {
              speaker: 'Hannah',
              voice: 'gb-female',
              text: "Let's check with her anyway. And the deadlines. The report is due on the twentieth of January, but the presentation is a week before that.",
            },
            { speaker: 'Ravi', voice: 'au-male', text: 'So we need the results by the end of December at the very latest.' },
            { speaker: 'Hannah', voice: 'gb-female', text: "I'd rather not leave it that late. Let's aim to have them by the fifteenth of December." },
            { speaker: 'Ravi', voice: 'au-male', text: 'OK, the fifteenth it is.' },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-02-q01',
          segmentId: 'l3-i-lis-11-02-s1',
          number: 1,
          prompt: 'Questionnaire, part 1: travel method, journey time and the name of the ___ they live in',
          acceptedAnswers: ['area'],
          explanation: {
            vi: 'Địa chỉ và postcode bị bác; chốt "The name of the area, then".',
            en: 'Address and postcode are rejected; they choose "the name of the area".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-02-q02',
          segmentId: 'l3-i-lis-11-02-s1',
          number: 2,
          prompt: 'Questionnaire, part 2: score cost, safety and comfort on a ___ from 1 to 5',
          acceptedAnswers: ['scale', 'rating scale'],
          explanation: {
            vi: 'Xếp hạng (rank) bị bác; "A rating scale it is" → scale.',
            en: 'Ranking is rejected; "A rating scale it is" → (rating) scale.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-02-q03',
          segmentId: 'l3-i-lis-11-02-s2',
          number: 3,
          prompt: 'Step 1 — Pilot study: test the questionnaire on ___ students from the seminar group',
          acceptedAnswers: ['12', 'twelve'],
          explanation: {
            vi: '50 là ý ban đầu; "Let\'s say twelve, then" → 12.',
            en: 'Fifty was the first idea; "Let\'s say twelve, then" → 12.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-02-q04',
          segmentId: 'l3-i-lis-11-02-s2',
          number: 4,
          prompt: 'Step 2 — Main survey: send it online and also ask students in person at the main ___',
          acceptedAnswers: ['bus stop'],
          explanation: {
            vi: '"Stand at the main bus stop in the mornings with a tablet" → bus stop.',
            en: '"Stand at the main bus stop in the mornings with a tablet" → bus stop.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-02-q05',
          segmentId: 'l3-i-lis-11-02-s2',
          number: 5,
          prompt: 'Step 3 — To encourage replies: a prize draw for café ___',
          acceptedAnswers: ['vouchers'],
          explanation: {
            vi: '"Vouchers for the campus café" — phiếu mua hàng, nhớ viết số nhiều.',
            en: '"Vouchers for the campus café" — remember the plural -s.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-02-q06',
          segmentId: 'l3-i-lis-11-02-s2',
          number: 6,
          prompt: 'Step 4 — Analysis: compare the results with a survey from another ___',
          acceptedAnswers: ['university'],
          explanation: {
            vi: 'Số liệu quốc gia bị bác; "compare them with another university".',
            en: 'National figures are rejected; "compare them with another university".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-02-q07',
          segmentId: 'l3-i-lis-11-02-s3',
          number: 7,
          prompt: 'What does Hannah think the survey might show?',
          options: ['A. Most students travel by bus.', 'B. More students now cycle than take the bus.', 'C. Many students walk to campus.'],
          correctIndex: 1,
          explanation: {
            vi: 'A là ý của Ravi; Hannah: "cycling has overtaken the bus" → B.',
            en: 'A is Ravi\'s guess; Hannah thinks "cycling has overtaken the bus" → B.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-02-q08',
          segmentId: 'l3-i-lis-11-02-s3',
          number: 8,
          prompt: 'How will the students deal with the effect of the weather?',
          options: [
            'A. by asking how students travel in another season',
            'B. by changing the date of the survey',
            'C. by leaving out questions about cycling',
          ],
          correctIndex: 0,
          explanation: {
            vi: 'Không đổi được hạn; thêm câu hỏi "how people travel in the summer" → A.',
            en: 'The deadline can\'t change; they add "how people travel in the summer" → A.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-02-q09',
          segmentId: 'l3-i-lis-11-02-s3',
          number: 9,
          prompt: 'What will Hannah ask the professor about?',
          options: ['A. how long the report should be', 'B. whether they need permission for the survey', 'C. which software to use for statistics'],
          correctIndex: 1,
          explanation: {
            vi: '"Ethics approval... Do we need permission to survey other students?" → B.',
            en: '"Ethics approval... Do we need permission to survey other students?" → B.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-02-q10',
          segmentId: 'l3-i-lis-11-02-s3',
          number: 10,
          prompt: 'By when do they plan to have their results?',
          options: ['A. the end of December', 'B. the thirteenth of January', 'C. the fifteenth of December'],
          correctIndex: 2,
          explanation: {
            vi: '"End of December" là hạn chót muộn nhất; họ chốt "the fifteenth of December".',
            en: '"End of December" is the latest; they aim for "the fifteenth of December".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 11 — BÀI 3: Section 4, signposting + ghi chú — bài giảng rừng ngập mặn
  // ==========================================================================
  {
    id: 'l3-i-lis-11-03',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 25,
    title: { vi: 'Section 4: Signposting và ghi chú bài giảng', en: 'Section 4: Signposting and lecture notes' },
    description: {
      vi: 'Nghe bài giảng về rừng ngập mặn, dùng các cụm chuyển ý (signposting) để theo dõi và điền ghi chú.',
      en: 'Listen to a lecture on mangrove forests and use signposting language to follow it and complete notes.',
    },
    teachingCards: [
      {
        title: { vi: 'Signposting — biển chỉ đường của bài giảng', en: 'Signposting: the road signs of a lecture' },
        body: {
          vi: 'Section 4 là **bài giảng một người nói**, không nghỉ giữa chừng. Giảng viên dùng **signposting** để báo chuyển ý: **"First of all…", "Let\'s move on to…", "Turning now to…", "Another key benefit is…", "To sum up…"**. Nghe thấy các cụm này, nhìn sang **tiêu đề tiếp theo** trong phần ghi chú.',
          en: 'Section 4 is a **lecture by one speaker**, with no break. Lecturers use **signposting** to show a change of topic: **"First of all…", "Let\'s move on to…", "Turning now to…", "Another key benefit is…", "To sum up…"**. When you hear these, look at the **next heading** in the notes.',
        },
        examples: [{ en: "Let's move on to the benefits that mangroves provide.", vi: 'Chuyển sang phần "Benefits" trong ghi chú.' }],
      },
      {
        title: { vi: 'Ghi chú: đáp án thường là danh từ', en: 'Notes: answers are usually nouns' },
        body: {
          vi: 'Phần ghi chú đã **rút gọn** lời giảng. Đáp án thường là **danh từ**, chép **đúng từ nghe được** và đúng chính tả. Cụm "**not so much X as Y**" nghĩa là **Y mới là ý chính** — bẫy rất hay gặp trong Section 4.',
          en: 'The notes **summarise** the lecture. Answers are usually **nouns** — write the **exact word you hear**, spelled correctly. "**Not so much X as Y**" means **Y is the main point** — a very common Section 4 trap.',
        },
        examples: [{ en: 'The problem is not so much the heat as the lack of rain.', vi: 'Vấn đề chính là thiếu mưa, không phải cái nóng.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-11-03-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm signposting với chức năng.', en: 'Match each signpost with its function.' },
        pairs: [
          { left: 'First of all…', right: 'starting the first point' },
          { left: "Let's move on to…", right: 'changing to a new topic' },
          { left: 'For instance…', right: 'giving an example' },
          { left: 'To sum up…', right: 'concluding' },
          { left: 'In contrast…', right: 'showing a difference' },
        ],
        explanation: {
          vi: 'Biết chức năng của signpost giúp bạn đoán phần tiếp theo của bài giảng.',
          en: 'Knowing what each signpost does helps you predict what comes next.',
        },
      },
      {
        id: 'l3-i-lis-11-03-ex02',
        type: 'listen-choose',
        audioText: "So that's the history of the bridge. Turning now to its design, the engineers faced two main problems.",
        question: 'What will the speaker talk about next?',
        options: ['the design of the bridge', 'the history of the bridge', 'the cost of the bridge'],
        correctIndex: 0,
        explanation: {
          vi: '"Turning now to its design" → phần tiếp theo nói về thiết kế.',
          en: '"Turning now to its design" → the next part is about the design.',
        },
      },
      {
        id: 'l3-i-lis-11-03-ex03',
        type: 'multiple-choice',
        question: 'Notes: "Main cause of damage: ___". What type of word do you need?',
        options: ['a noun', 'a past-tense verb', 'an adverb', 'a preposition'],
        correctIndex: 0,
        explanation: {
          vi: 'Sau dấu hai chấm "cause of damage:" cần một danh từ (VD storms).',
          en: 'After "cause of damage:" you need a noun, e.g. storms.',
        },
      },
      {
        id: 'l3-i-lis-11-03-ex04',
        type: 'listen-choose',
        audioText: 'The problem is not so much the heat itself as the lack of rain that comes with it.',
        question: 'What is the main problem, according to the speaker?',
        options: ['the lack of rain', 'the heat', 'the wind'],
        correctIndex: 0,
        explanation: {
          vi: '"Not so much X as Y" → Y (the lack of rain) mới là ý chính.',
          en: '"Not so much X as Y" → Y, the lack of rain, is the main point.',
        },
      },
      {
        id: 'l3-i-lis-11-03-ex05',
        type: 'speak-sentence',
        sentence: 'Mangrove roots slow down the waves and protect coastal villages.',
        translationVi: 'Rễ cây ngập mặn làm chậm sóng và bảo vệ các làng ven biển.',
        explanation: {
          vi: 'Đọc rõ /ts/ trong "roots", /vz/ trong "waves", /ɪz/ trong "villages".',
          en: 'Say /ts/ in "roots", /vz/ in "waves" and /ɪz/ in "villages".',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–10. Complete the notes below (Lecture: Mangrove forests — what they are, benefits, threats and restoration). Write ONE WORD ONLY for each answer.',
      strategyTip: {
        vi: 'Ghi chú có 3 tiêu đề lớn. Mỗi khi nghe "Let\'s move on to" hoặc "Turning now to", chuyển sang tiêu đề mới.',
        en: 'The notes have three main headings. When you hear "Let\'s move on to" or "Turning now to", move to the next heading.',
      },
      segments: [
        {
          id: 'l3-i-lis-11-03-s1',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: "Good morning, everyone. Today's lecture is about mangrove forests, one of the most valuable but least appreciated ecosystems on the planet. I'll start by explaining what mangroves are, then move on to the benefits they provide, and finally I'll look at the threats they face and what's being done to restore them.",
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: 'So, first of all, what exactly is a mangrove? The word refers to a group of trees and shrubs that grow along tropical and subtropical coastlines, in the zone between the land and the sea. What makes them remarkable is that they can survive in salty water, which would kill most other trees. Some species do this by filtering the salt out at their roots, while others get rid of it through their leaves.',
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: "Another unusual feature is their roots. Many mangroves have roots that stand above the mud like stilts, and some species have roots that grow upwards, out of the mud, like small fingers pointing at the sky. These roots allow the tree to take in oxygen, because the mud it grows in contains very little.",
            },
          ],
        },
        {
          id: 'l3-i-lis-11-03-s2',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: "Let's move on to the benefits that mangroves provide. The first, and perhaps the most important for people living on the coast, is protection. The dense network of roots slows down waves and reduces the force of storms. Studies carried out after major storms in South and Southeast Asia have found that villages behind healthy mangrove forests generally suffered less damage than those without them.",
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: "Another key benefit is that mangroves act as a nursery. Many species of fish and shellfish lay their eggs among the roots, and the young ones stay there until they're big enough to survive in the open sea. This means that mangroves support local fishing industries, even ones that operate some distance away.",
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: 'The third benefit, which has attracted a lot of attention recently, is carbon storage. Mangroves take carbon dioxide out of the atmosphere and store it, not so much in the trees themselves as in the thick mud beneath them. Per hectare, they can store several times more carbon than most forests on land.',
            },
          ],
        },
        {
          id: 'l3-i-lis-11-03-s3',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: 'Turning now to the threats. Over the last fifty years or so, a large proportion of the world\'s mangroves has been lost. In many countries, the single biggest cause has been the conversion of coastal land into ponds for shrimp farming. Other causes include the growth of cities and ports, and pollution.',
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: "So, what's being done? Many countries are now replanting mangroves, but early projects had a surprisingly high failure rate. Young trees were often planted on mudflats that stayed underwater for too long each day, and most of them died. Researchers now argue that the most important factor is not the number of trees planted, but choosing sites where the natural flow of water is right.",
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: 'Another lesson is the importance of involving local communities. In the Mekong Delta in Vietnam, for instance, some projects pay local families to look after newly planted areas, and allow them to harvest a limited amount of shellfish there. When people benefit directly, they have a reason to protect the forest.',
            },
            {
              speaker: 'Lecturer',
              voice: 'gb-male',
              text: "To sum up, then, mangroves protect coastlines, support fisheries and store carbon, but they are under serious threat, and successful restoration depends on both science and people. In our next session, we'll look at seagrass meadows, another coastal ecosystem that stores large amounts of carbon.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q01',
          segmentId: 'l3-i-lis-11-03-s1',
          number: 1,
          prompt: 'What they are: trees and shrubs that can survive in ___ water',
          acceptedAnswers: ['salty', 'salt'],
          explanation: {
            vi: '"They can survive in salty water, which would kill most other trees".',
            en: '"They can survive in salty water, which would kill most other trees".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q02',
          segmentId: 'l3-i-lis-11-03-s1',
          number: 2,
          prompt: 'Salt is filtered out at the ___ or removed through the leaves',
          acceptedAnswers: ['roots'],
          explanation: {
            vi: '"Filtering the salt out at their roots" — lá đã có trong ghi chú.',
            en: '"Filtering the salt out at their roots" — leaves are already in the notes.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q03',
          segmentId: 'l3-i-lis-11-03-s1',
          number: 3,
          prompt: 'Some roots grow upwards out of the mud so the tree can take in ___',
          acceptedAnswers: ['oxygen'],
          explanation: {
            vi: '"These roots allow the tree to take in oxygen" vì bùn có rất ít.',
            en: '"These roots allow the tree to take in oxygen"; the mud has very little.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q04',
          segmentId: 'l3-i-lis-11-03-s2',
          number: 4,
          prompt: 'Benefit 1 — protection: roots slow down waves and reduce the force of ___',
          acceptedAnswers: ['storms'],
          explanation: {
            vi: '"Slows down waves and reduces the force of storms" — nhớ -s số nhiều.',
            en: '"Slows down waves and reduces the force of storms" — note the plural.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q05',
          segmentId: 'l3-i-lis-11-03-s2',
          number: 5,
          prompt: 'Benefit 2 — act as a ___ for young fish and shellfish',
          acceptedAnswers: ['nursery'],
          explanation: {
            vi: 'Signpost "Another key benefit" → "mangroves act as a nursery".',
            en: 'Signpost "Another key benefit" → "mangroves act as a nursery".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q06',
          segmentId: 'l3-i-lis-11-03-s2',
          number: 6,
          prompt: 'Benefit 3 — carbon storage: most carbon is kept in the ___ beneath the trees',
          acceptedAnswers: ['mud'],
          explanation: {
            vi: '"Not so much in the trees themselves as in the thick mud" → mud.',
            en: '"Not so much in the trees themselves as in the thick mud" → mud.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q07',
          segmentId: 'l3-i-lis-11-03-s3',
          number: 7,
          prompt: 'Threats — biggest cause of loss: coastal land turned into ponds for ___ farming',
          acceptedAnswers: ['shrimp'],
          explanation: {
            vi: '"The single biggest cause... ponds for shrimp farming"; đô thị, ô nhiễm chỉ là nguyên nhân phụ.',
            en: '"The single biggest cause... ponds for shrimp farming"; cities and pollution are "other causes".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q08',
          segmentId: 'l3-i-lis-11-03-s3',
          number: 8,
          prompt: 'Restoration — key factor: choosing sites with the right natural flow of ___',
          acceptedAnswers: ['water'],
          explanation: {
            vi: 'Không phải số cây, mà là "sites where the natural flow of water is right".',
            en: 'Not the number of trees, but "sites where the natural flow of water is right".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q09',
          segmentId: 'l3-i-lis-11-03-s3',
          number: 9,
          prompt: 'Mekong Delta: some projects pay local ___ to look after newly planted areas',
          acceptedAnswers: ['families'],
          explanation: {
            vi: '"Some projects pay local families to look after newly planted areas".',
            en: '"Some projects pay local families to look after newly planted areas".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-03-q10',
          segmentId: 'l3-i-lis-11-03-s3',
          number: 10,
          prompt: 'Next lecture: ___ meadows',
          acceptedAnswers: ['seagrass'],
          explanation: {
            vi: '"In our next session, we\'ll look at seagrass meadows" (cỏ biển).',
            en: '"In our next session, we\'ll look at seagrass meadows".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 11 — BÀI 4: Section 4, đoán đáp án + tóm tắt — tiếng chim hót ở thành phố
  // ==========================================================================
  {
    id: 'l3-i-lis-11-04',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 25,
    title: { vi: 'Section 4: Đoán đáp án và hoàn thành tóm tắt', en: 'Section 4: Predicting answers in a summary' },
    description: {
      vi: 'Nghe bài giảng về cách chim thích nghi với tiếng ồn thành phố; đoán loại từ trước khi nghe để điền bản tóm tắt.',
      en: 'Listen to a lecture on how birds adapt to city noise; predict each answer before listening to complete a summary.',
    },
    teachingCards: [
      {
        title: { vi: 'Đoán đáp án trước khi nghe', en: 'Predict before you listen' },
        body: {
          vi: 'Đọc **cả câu** quanh chỗ trống và tự hỏi: **loại từ** gì (danh từ số ít/nhiều, tính từ)? **Nghĩa** gì (nơi chốn, thời gian, âm thanh)? VD "City birds sing at a higher ___" → danh từ về âm thanh → **pitch? volume?** Đoán vài khả năng rồi nghe để **xác nhận**.',
          en: 'Read the **whole sentence** around each gap and ask: what **type of word** (singular/plural noun, adjective)? What **meaning** (a place, a time, a sound)? E.g. "City birds sing at a higher ___" → a noun about sound → **pitch? volume?** Predict a few options, then listen to **confirm**.',
        },
      },
      {
        title: { vi: 'Bản tóm tắt dùng từ đồng nghĩa', en: 'Summaries use synonyms' },
        body: {
          vi: 'Bản tóm tắt **không lặp y lời** giảng viên: "sing louder" có thể thành "**raise the volume**", "a better predictor" thành "**explains it better**". Nghe theo **ý**, nhưng **chép đúng từ** nghe được vào chỗ trống. Kiểm tra ngữ pháp: sau "a" cần **danh từ số ít**.',
          en: 'A summary **doesn\'t repeat** the lecturer\'s words: "sing louder" may become "**raise the volume**", "a better predictor" may become "**explains it better**". Follow the **idea**, but **write the exact word** you hear. Check grammar: after "a" you need a **singular noun**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-11-04-ex01',
        type: 'multiple-choice',
        question: 'Summary: "The researchers recorded birds in ten different ___." What type of word fits?',
        options: ['a plural noun', 'a singular noun', 'a verb', 'an adjective'],
        correctIndex: 0,
        explanation: {
          vi: 'Sau "ten different" cần danh từ số nhiều (VD cities).',
          en: 'After "ten different" you need a plural noun, e.g. cities.',
        },
      },
      {
        id: 'l3-i-lis-11-04-ex02',
        type: 'multiple-choice',
        question: 'Summary: "Birds in towns sing at a higher ___." Which word is grammatically possible?',
        options: ['pitch', 'loudly', 'higher', 'sing'],
        correctIndex: 0,
        explanation: {
          vi: 'Sau "a higher" cần danh từ số ít → pitch (cao độ).',
          en: 'After "a higher" you need a singular noun → pitch.',
        },
      },
      {
        id: 'l3-i-lis-11-04-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối lời giảng với cách diễn đạt trong bản tóm tắt.', en: 'Match the lecture words with the summary paraphrase.' },
        pairs: [
          { left: 'sing louder', right: 'increase the volume' },
          { left: 'at night', right: 'after dark' },
          { left: 'a better predictor', right: 'explains it better' },
          { left: 'reduce noise at its source', right: 'stop noise where it is made' },
          { left: 'twice the distance', right: 'double the range' },
        ],
        explanation: {
          vi: 'Nhận ra paraphrase giúp bạn biết giảng viên đang nói tới chỗ trống nào.',
          en: 'Spotting paraphrase tells you which gap the lecturer has reached.',
        },
      },
      {
        id: 'l3-i-lis-11-04-ex04',
        type: 'listen-choose',
        audioText:
          'Many visitors assume the museum is quiet on Mondays because of the weather. In fact, the main reason is that most schools visit later in the week.',
        question: 'Why is the museum quiet on Mondays?',
        options: ['Schools usually visit later in the week.', 'The weather is often bad on Mondays.', 'The museum opens late on Mondays.'],
        correctIndex: 0,
        explanation: {
          vi: '"Assume... In fact, the main reason is..." → lý do thật là trường học.',
          en: '"Assume... In fact, the main reason is..." → the real reason is school visits.',
        },
      },
      {
        id: 'l3-i-lis-11-04-ex05',
        type: 'speak-sentence',
        sentence: 'City birds sing at a higher pitch to be heard above the traffic.',
        translationVi: 'Chim ở thành phố hót cao giọng hơn để át tiếng xe cộ.',
        explanation: {
          vi: 'Đọc rõ /dz/ cuối "birds", /tʃ/ trong "pitch", /d/ cuối "heard".',
          en: 'Pronounce /dz/ in "birds", /tʃ/ in "pitch" and /d/ in "heard".',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–10. Complete the summary below (How birds cope with city noise). Write ONE WORD ONLY for each answer.',
      strategyTip: {
        vi: 'Trong 30 giây đầu, ghi nhanh loại từ cần cho mỗi chỗ trống (n., adj., số nhiều...). Rồi nghe để xác nhận.',
        en: 'In the first 30 seconds, note the word type each gap needs (noun, adjective, plural...). Then listen to confirm.',
      },
      segments: [
        {
          id: 'l3-i-lis-11-04-s1',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: "Good afternoon. In today's lecture on urban ecology, I want to look at how wild birds have adapted to one particular feature of city life, and that is noise. Birds rely on song for two main purposes: to defend their territory, and to attract a mate. So if their song can't be heard, they're at a real disadvantage.",
            },
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: "Let's start with the nature of city noise. Most of the noise in cities comes from traffic, and traffic noise is mainly low-frequency. Think of the deep rumble of a truck engine. This matters, because many birds also sing at low frequencies, so the traffic effectively hides the lower parts of their songs.",
            },
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: 'The first adaptation researchers noticed was pitch. In a well-known study in the Netherlands, scientists recorded a common songbird, the great tit, in ten cities and in nearby forests. In every case, the city birds sang at a higher pitch than the forest birds. By shifting their songs upwards, they move out of the range of the traffic noise.',
            },
          ],
        },
        {
          id: 'l3-i-lis-11-04-s2',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: 'A second adaptation is volume. Like people in a noisy restaurant, many birds simply sing louder when there is more background noise. This is known as the Lombard effect, after the French doctor who first described it in humans. The trouble is that singing loudly uses more energy, so it may come at a cost to the bird.',
            },
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: 'The third adaptation concerns timing. In some cities, birds have started singing at different times of day. In Britain, for example, robins in urban areas have been recorded singing at night. People used to assume this was because of street lights. However, a study in one English city found that the noise level during the day was a better predictor. In other words, the robins seem to be choosing the quieter night-time hours, when their songs travel further.',
            },
          ],
        },
        {
          id: 'l3-i-lis-11-04-s3',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: 'Now, are these adaptations a success story? Partly, but there are costs. Some research suggests that female great tits respond more strongly to lower songs, which may mean that city males with higher songs are less attractive as partners. So the birds are making a trade-off between being heard and being attractive.',
            },
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: 'An unusual opportunity to study this came during the lockdowns of 2020, when traffic in many cities almost disappeared. Researchers in San Francisco had recorded a small songbird, the white-crowned sparrow, before the lockdown, and they went back to record the same areas while the streets were quiet. They found that the birds sang more softly, yet their songs could be heard at about twice the distance, because there was so little competing noise.',
            },
            {
              speaker: 'Lecturer',
              voice: 'us-male',
              text: "So what can cities do? The most effective measures are the ones that reduce noise at its source. Low-noise road surfaces, for example, can make traffic noticeably quieter, and lower speed limits also help. Noise barriers along highways can work well too, although they are expensive to build and many people find them ugly. Planting trees is popular, and it certainly has other benefits for wildlife, but on its own, a narrow strip of trees reduces noise much less than most people imagine. The lesson for city planners is that quieter cities are better not only for people, but for the birds that share them with us. Next week, we'll look at artificial light and its effect on insects.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q01',
          segmentId: 'l3-i-lis-11-04-s1',
          number: 1,
          prompt: 'Birds sing to defend their territory and to attract a ___.',
          acceptedAnswers: ['mate'],
          explanation: {
            vi: '"To defend their territory, and to attract a mate" (bạn đời).',
            en: '"To defend their territory, and to attract a mate".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q02',
          segmentId: 'l3-i-lis-11-04-s1',
          number: 2,
          prompt: 'Traffic noise is mostly low in ___, so it hides the lower parts of birdsong.',
          acceptedAnswers: ['frequency'],
          explanation: {
            vi: '"Traffic noise is mainly low-frequency" = low in frequency.',
            en: '"Traffic noise is mainly low-frequency" = low in frequency.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q03',
          segmentId: 'l3-i-lis-11-04-s1',
          number: 3,
          prompt: 'A Dutch study found that great tits in cities sang at a higher ___ than those in forests.',
          acceptedAnswers: ['pitch'],
          explanation: {
            vi: '"Dutch" = in the Netherlands; "the city birds sang at a higher pitch".',
            en: '"Dutch" = in the Netherlands; "the city birds sang at a higher pitch".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q04',
          segmentId: 'l3-i-lis-11-04-s2',
          number: 4,
          prompt: 'Many birds also raise the ___ of their song when there is background noise.',
          acceptedAnswers: ['volume'],
          explanation: {
            vi: '"A second adaptation is volume... sing louder" → raise the volume.',
            en: '"A second adaptation is volume... sing louder" → raise the volume.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q05',
          segmentId: 'l3-i-lis-11-04-s2',
          number: 5,
          prompt: 'In Britain, robins in towns and cities have been heard singing at ___.',
          acceptedAnswers: ['night'],
          explanation: {
            vi: '"Robins in urban areas have been recorded singing at night".',
            en: '"Robins in urban areas have been recorded singing at night".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q06',
          segmentId: 'l3-i-lis-11-04-s2',
          number: 6,
          prompt: 'This seems to be explained better by daytime ___ than by street lights.',
          acceptedAnswers: ['noise'],
          explanation: {
            vi: 'Đèn đường là giả định cũ; "the noise level during the day was a better predictor".',
            en: 'Street lights were assumed; "the noise level during the day was a better predictor".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q07',
          segmentId: 'l3-i-lis-11-04-s3',
          number: 7,
          prompt: 'However, higher songs may make males less ___ to females.',
          acceptedAnswers: ['attractive'],
          explanation: {
            vi: '"City males with higher songs are less attractive as partners".',
            en: '"City males with higher songs are less attractive as partners".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q08',
          segmentId: 'l3-i-lis-11-04-s3',
          number: 8,
          prompt: 'During the 2020 lockdowns, sparrows sang more quietly, but they could be heard at twice the ___.',
          acceptedAnswers: ['distance'],
          explanation: {
            vi: '"Sang more softly" = more quietly; "heard at about twice the distance".',
            en: '"Sang more softly" = more quietly; "heard at about twice the distance".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q09',
          segmentId: 'l3-i-lis-11-04-s3',
          number: 9,
          prompt: 'The most effective solutions reduce noise at its ___.',
          acceptedAnswers: ['source'],
          explanation: {
            vi: '"The most effective measures are the ones that reduce noise at its source".',
            en: '"The most effective measures are the ones that reduce noise at its source".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-04-q10',
          segmentId: 'l3-i-lis-11-04-s3',
          number: 10,
          prompt: 'Examples include special road surfaces and lower speed ___.',
          acceptedAnswers: ['limits'],
          explanation: {
            vi: '"Low-noise road surfaces... and lower speed limits also help".',
            en: '"Low-noise road surfaces... and lower speed limits also help".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 11 — BÀI 5: Section 4 làm như thi thật — bài giảng về tơ lụa
  // ==========================================================================
  {
    id: 'l3-i-lis-11-05',
    skill: 'listening',
    mode: 'listening',
    estimatedMinutes: 25,
    title: { vi: 'Section 4: Luyện như thi thật', en: 'Section 4: Exam-style practice' },
    description: {
      vi: 'Làm trọn một bài giảng Section 4 về tơ lụa với ghi chú và trắc nghiệm, nghe một mạch như khi thi.',
      en: 'Complete a full Section 4 lecture about silk, with notes and multiple choice, listening straight through as in the exam.',
    },
    teachingCards: [
      {
        title: { vi: 'Làm Section 4 như thi thật', en: 'Section 4 under exam conditions' },
        body: {
          vi: 'Khi thi, bài giảng **chỉ nghe 1 lần** và **không nghỉ giữa chừng**. Dùng 30–45 giây đầu đọc **toàn bộ** câu hỏi, gạch chân tiêu đề. Nếu bị lạc, **đừng hoảng**: chờ **signpost** tiếp theo rồi nhảy sang tiêu đề mới. Cuối bài, kiểm tra **chính tả** và **số từ**.',
          en: 'In the exam, you hear the lecture **once** with **no break**. Use the first 30–45 seconds to read **all** the questions and underline headings. If you get lost, **don\'t panic**: wait for the next **signpost** and jump to the new heading. At the end, check **spelling** and **word count**.',
        },
      },
      {
        title: { vi: 'Trắc nghiệm trong bài giảng', en: 'Multiple choice in a lecture' },
        body: {
          vi: 'Giảng viên hay **nêu một ý rồi bác bỏ**: "The problem **isn\'t** the amount… The **real** difficulty is…". Đáp án đúng đi sau **real, actually, in fact, instead**. Đọc trước câu hỏi để biết cần nghe **lý do**, **cách làm** hay **kết quả**.',
          en: 'Lecturers often **raise an idea and reject it**: "The problem **isn\'t** the amount… The **real** difficulty is…". The answer follows **real, actually, in fact, instead**. Read the question first to know if you need a **reason**, a **method** or a **result**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-lis-11-05-ex01',
        type: 'listen-type',
        audioText: 'Silkworms feed on mulberry leaves.',
        acceptedAnswers: ['Silkworms feed on mulberry leaves'],
        explanation: {
          vi: '"Mulberry" (cây dâu tằm) viết m-u-l-b-e-r-r-y, hai chữ R.',
          en: '"Mulberry" is spelled m-u-l-b-e-r-r-y, with a double R.',
        },
      },
      {
        id: 'l3-i-lis-11-05-ex02',
        type: 'listen-choose',
        audioText: "The problem isn't the cost of the machines. It's finding workers with the right skills.",
        question: 'What is the main problem?',
        options: ['finding skilled workers', 'the cost of the machines', 'the size of the factory'],
        correctIndex: 0,
        explanation: {
          vi: '"The problem isn\'t X. It\'s Y" → vấn đề thật là tìm người có kỹ năng.',
          en: '"The problem isn\'t X. It\'s Y" → the real problem is finding skilled workers.',
        },
      },
      {
        id: 'l3-i-lis-11-05-ex03',
        type: 'multiple-choice',
        question: 'You get lost during a lecture and miss two answers. What is the best thing to do?',
        options: [
          'Listen for the next signpost and move to the next heading',
          'Keep looking at the gaps you missed',
          'Stop writing until the lecture ends',
          'Guess all the remaining answers now',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Signpost giúp bạn "bắt lại" bài giảng; nhìn mãi câu đã lỡ sẽ mất thêm câu.',
          en: 'Signposts help you rejoin the lecture; staring at missed gaps loses more answers.',
        },
      },
      {
        id: 'l3-i-lis-11-05-ex04',
        type: 'fill-blank',
        sentence: 'You hear: "Production started about two hundred years ago." Notes: started roughly ___ years ago',
        acceptedAnswers: ['200', 'two hundred'],
        explanation: {
          vi: '"About" = roughly; viết số 200 hoặc chữ đều được.',
          en: '"About" = roughly; write 200 or two hundred.',
        },
      },
      {
        id: 'l3-i-lis-11-05-ex05',
        type: 'speak-sentence',
        sentence: 'Silk was traded along the Silk Road for centuries.',
        translationVi: 'Tơ lụa được buôn bán dọc Con đường Tơ lụa suốt nhiều thế kỷ.',
        explanation: {
          vi: 'Đọc rõ /lk/ cuối "silk", /ɪd/ trong "traded", /iz/ cuối "centuries".',
          en: 'Say /lk/ in "silk", /ɪd/ in "traded" and /iz/ in "centuries".',
        },
      },
    ],
    miniTest: [],
    listeningTask: {
      instructions:
        'Questions 1–6. Complete the notes below (Lecture: Silk — production and history). Write ONE WORD AND/OR A NUMBER for each answer. Questions 7–10. Choose the correct letter, A, B or C.',
      strategyTip: {
        vi: 'Thử nghe một mạch không dừng, không nghe lại từng đoạn. Sau khi nộp mới dùng nút "Nghe lại đoạn này" để soát lỗi.',
        en: 'Try listening straight through without replaying. After submitting, use "Replay this segment" to check your mistakes.',
      },
      segments: [
        {
          id: 'l3-i-lis-11-05-s1',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "Good morning. Today we're continuing our series on materials that changed history, and this time our subject is silk. I'm going to cover three areas: how silk is produced, how it spread around the world, and finally, some surprising modern uses.",
            },
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "Let's begin with production. Silk is made by the silkworm, which isn't really a worm at all, but the caterpillar of a moth. Silkworms are very fussy eaters. They feed almost entirely on the leaves of the mulberry tree, so silk farming has always depended on growing large numbers of these trees.",
            },
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "When the caterpillar is ready to change into an adult, it spins a cocoon around itself. What's remarkable is that each cocoon is made from one single thread, which can be well over five hundred metres long. To collect the thread, farmers put the cocoons into hot water, which softens the natural glue holding the thread together, and then they carefully unwind it. Several of these threads are then twisted together to make yarn that is strong enough for weaving.",
            },
          ],
        },
        {
          id: 'l3-i-lis-11-05-s2',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: 'Moving on to history. The oldest evidence of silk comes from China, where archaeologists have found pieces of silk fabric that are more than five thousand years old. For centuries, the process was kept secret, and anyone caught taking silkworms out of the country could be severely punished.',
            },
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: 'Silk became one of the most valuable goods traded between China and the West, along the network of routes we now call the Silk Road. Interestingly, that name was only invented in the nineteenth century, by a German geographer. The traders themselves never used it.',
            },
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "Eventually, the secret got out. According to one account, in the sixth century, two monks smuggled silkworm eggs to Constantinople by hiding them inside hollow walking sticks made of bamboo. Silk production also spread east and south, to Korea, Japan and Vietnam. Van Phuc, a village near Hanoi, has been weaving silk for over a thousand years, and today it's very popular with tourists, who come to watch the weavers and buy scarves and clothing.",
            },
          ],
        },
        {
          id: 'l3-i-lis-11-05-s3',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "Now let's turn to the future of silk. Silkworm silk is strong, but spider silk is even tougher and more elastic, and people have dreamed for centuries of producing it in large quantities. The obvious idea is to farm spiders in the same way as silkworms. The problem isn't the amount each spider produces. That could be managed by keeping enough of them. The real difficulty is that spiders are territorial, and if you keep them close together, they attack and eat each other.",
            },
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "So scientists have taken a different approach. They've inserted spider genes into other organisms, such as bacteria and yeast, so that these produce the silk proteins, which can then be spun into fibres. Some teams have even created silkworms that spin a silk containing spider proteins.",
            },
          ],
        },
        {
          id: 'l3-i-lis-11-05-s4',
          lines: [
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: 'Finally, medicine, which is perhaps the most exciting area of all. Silk has been used to stitch wounds for centuries, and the human body generally tolerates it well. Researchers have now found ways to turn silk into a liquid and then into films, gels and even tiny implants. One particularly promising discovery is that silk can protect vaccines from heat. Many vaccines normally have to be kept in a fridge, which is a serious problem in hot countries where the electricity supply is unreliable. When they are stored in silk, some vaccines remain effective for weeks at room temperature, or even higher.',
            },
            {
              speaker: 'Lecturer',
              voice: 'au-female',
              text: "That's all for today. Next week, our topic is cotton. Before then, please read the chapter on cotton in your course book. There's also an exhibition about textiles at the city museum at the moment, which is worth a visit if you have time, but that's optional. And you don't need to bring anything to class.",
            },
          ],
        },
      ],
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-05-q01',
          segmentId: 'l3-i-lis-11-05-s1',
          number: 1,
          prompt: 'A silkworm is really the caterpillar of a ___.',
          acceptedAnswers: ['moth'],
          explanation: {
            vi: '"Isn\'t really a worm at all, but the caterpillar of a moth" (bướm đêm).',
            en: '"Isn\'t really a worm at all, but the caterpillar of a moth".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-05-q02',
          segmentId: 'l3-i-lis-11-05-s1',
          number: 2,
          prompt: 'Silkworms feed almost only on the leaves of the ___ tree.',
          acceptedAnswers: ['mulberry'],
          explanation: {
            vi: '"Almost entirely on the leaves of the mulberry tree" — chú ý hai chữ R.',
            en: '"Almost entirely on the leaves of the mulberry tree" — note the double R.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-05-q03',
          segmentId: 'l3-i-lis-11-05-s1',
          number: 3,
          prompt: 'Hot water softens the natural ___ that holds the thread together.',
          acceptedAnswers: ['glue'],
          explanation: {
            vi: '"Hot water, which softens the natural glue holding the thread together".',
            en: '"Hot water, which softens the natural glue holding the thread together".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-05-q04',
          segmentId: 'l3-i-lis-11-05-s2',
          number: 4,
          prompt: 'The name "Silk Road" was invented in the ___ century.',
          acceptedAnswers: ['nineteenth', '19th'],
          explanation: {
            vi: '"That name was only invented in the nineteenth century" (thế kỷ 19).',
            en: '"That name was only invented in the nineteenth century".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-05-q05',
          segmentId: 'l3-i-lis-11-05-s2',
          number: 5,
          prompt: 'Two monks hid silkworm eggs inside walking sticks made of ___.',
          acceptedAnswers: ['bamboo'],
          explanation: {
            vi: '"Hiding them inside hollow walking sticks made of bamboo".',
            en: '"Hiding them inside hollow walking sticks made of bamboo".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-lis-11-05-q06',
          segmentId: 'l3-i-lis-11-05-s2',
          number: 6,
          prompt: 'Van Phuc village, near Hanoi, is now very popular with ___.',
          acceptedAnswers: ['tourists'],
          explanation: {
            vi: '"Today it\'s very popular with tourists" — nhớ -s số nhiều.',
            en: '"Today it\'s very popular with tourists" — remember the plural -s.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-05-q07',
          segmentId: 'l3-i-lis-11-05-s3',
          number: 7,
          prompt: 'Why can spider silk not be farmed like silkworm silk?',
          options: ['A. Each spider produces too little silk.', 'B. Spiders attack each other when kept together.', 'C. Spider silk is too weak when wet.'],
          correctIndex: 1,
          explanation: {
            vi: 'Số lượng "isn\'t" vấn đề; "the real difficulty... they attack and eat each other".',
            en: 'Quantity "isn\'t" the problem; "the real difficulty... they attack and eat each other".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-05-q08',
          segmentId: 'l3-i-lis-11-05-s3',
          number: 8,
          prompt: 'How are scientists trying to produce spider silk?',
          options: [
            'A. by giving spider genes to other living things',
            'B. by keeping spiders in separate boxes',
            'C. by mixing silkworm silk with plastic',
          ],
          correctIndex: 0,
          explanation: {
            vi: '"Inserted spider genes into other organisms, such as bacteria and yeast" → A.',
            en: '"Inserted spider genes into other organisms, such as bacteria and yeast" → A.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-05-q09',
          segmentId: 'l3-i-lis-11-05-s4',
          number: 9,
          prompt: 'What is a key advantage of storing vaccines in silk?',
          options: ['A. The vaccines can be made more cheaply.', 'B. The vaccines can be kept without a fridge.', 'C. The vaccines work more quickly.'],
          correctIndex: 1,
          explanation: {
            vi: '"Remain effective for weeks at room temperature" = không cần tủ lạnh.',
            en: '"Remain effective for weeks at room temperature" = no fridge needed.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-lis-11-05-q10',
          segmentId: 'l3-i-lis-11-05-s4',
          number: 10,
          prompt: 'What must students do before the next lecture?',
          options: ['A. read a chapter of the course book', 'B. visit an exhibition at the city museum', 'C. bring a sample of fabric to class'],
          correctIndex: 0,
          explanation: {
            vi: '"Please read the chapter"; triển lãm là "optional"; không cần mang gì.',
            en: '"Please read the chapter"; the exhibition is "optional"; bring nothing.',
          },
        },
      ],
    },
  },
]
