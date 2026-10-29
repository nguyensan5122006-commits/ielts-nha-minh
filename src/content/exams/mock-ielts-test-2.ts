/**
 * mock-ielts-test-2.ts
 * ----------------------------------------------------------------------------
 * ĐỀ THI THỬ IELTS ACADEMIC SỐ 2 (nội dung tự biên soạn 100%, không sao chép đề Cambridge/BC/IDP).
 * Mức độ: tương đương đề thật, cho người học mục tiêu band 5.0 – 6.5.
 * Cấu trúc GIỐNG HỆT mock-ielts-test-1.ts nên phòng thi hiện tại chạy được ngay.
 *
 *   1) LISTENING – 30 phút – 4 part × 10 câu = 40 câu (đánh số 1–40)
 *        Part 1: gọi điện đặt tour xe đạp cho gia đình (điền form) — giọng nữ Anh + nam Anh
 *        Part 2: hướng dẫn viên giới thiệu nông trại cộng đồng (trắc nghiệm A/B/C + nối khu vực ↔ hoạt động)
 *        Part 3: giảng viên + 2 sinh viên bàn dự án về nhãn dinh dưỡng (trắc nghiệm + nối phần báo cáo ↔ việc cần sửa)
 *                — người nói thứ 3 (Chloe) được script TTS gán giọng Úc (en-AU)
 *        Part 4: bài giảng về rừng ngập mặn (điền ghi chú, ONE WORD ONLY)
 *   2) READING – 60 phút – 3 bài đọc (650–850 từ), 13 + 13 + 14 = 40 câu (đánh số 1–40)
 *        Passage 1: xây nhà bằng tre (TRUE/FALSE/NOT GIVEN + điền ghi chú)
 *        Passage 2: khoa học công dân — người dân đếm chim, chụp côn trùng
 *                   (đoạn nào chứa thông tin + nối ý kiến ↔ nhà nghiên cứu + điền tóm tắt)
 *        Passage 3: ngôn ngữ có định hình cách ta suy nghĩ? (matching headings + TFNG + trắc nghiệm + điền câu)
 *   3) WRITING – 60 phút – Task 1 (biểu đồ cột, ≥150 từ) + Task 2 (advantages outweigh disadvantages, ≥250 từ)
 *   4) SPEAKING – khoảng 14 phút – Part 1 (thói quen hằng ngày, âm nhạc), Part 2 (nơi muốn quay lại), Part 3 (du lịch)
 *
 * Quy ước như đề 1: kịch bản nghe "Tên: lời thoại" (không dùng dấu hai chấm ở chỗ khác trong lời thoại,
 * số đọc như người nói, VD số điện thoại viết "oh seven seven…"); câu gap-fill có đúng 1 "___";
 * trắc nghiệm IELTS ghi sẵn chữ cái "A. …" nên giao diện giữ nguyên thứ tự.
 * Mỗi câu có giải thích song ngữ ≤ 20 từ mỗi ngôn ngữ, chỉ ra đáp án nằm ở đâu.
 * Các nhân vật, địa danh nhỏ (Lakeside, Millbrook…) và nhà nghiên cứu trong bài đọc đều là hư cấu.
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'

/* Đáp án dùng chung cho câu nối (matching) — chữ cái đứng đầu nên giao diện không xáo */
const FARM_ACTIVITIES = [
  'A. watch a demonstration',
  'B. pick fruit to take home',
  'C. look for small animals',
  'D. enter a competition',
  'E. plant seeds',
  'F. listen to a talk',
  'G. buy young plants',
]

const REPORT_ACTIONS = [
  'A. use more graphs',
  'B. leave it as it is',
  'C. make it shorter',
  'D. add more recent sources',
  'E. move some of it to an appendix',
  'F. change the way it is organised',
  'G. combine it with another section',
]

/* "Which paragraph contains…" (Reading Passage 2) */
const PARAGRAPHS_A_TO_G = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

/* Nối ý kiến với nhà nghiên cứu (Reading Passage 2) */
const RESEARCHERS = ['A. Ines Moreau', 'B. Tomas Halvorsen', 'C. Priya Raman']

/* Matching Headings (Reading Passage 3) */
const HEADINGS_P3 = [
  'i. A popular story that does not survive examination',
  'ii. Words as tools for exact thinking',
  'iii. Strong and weak versions of an old idea',
  'iv. Failed repetitions and a more modest conclusion',
  'v. Colour categories and the speed of perception',
  'vi. Different ways of describing where things are',
  'vii. The link between vocabulary size and intelligence',
  'viii. How children learn their first words',
]

export const mockIeltsTest2: Exam = {
  id: 'mock-ielts-2',
  kind: 'mock-ielts',
  title: {
    vi: 'Đề thi thử IELTS Academic số 2',
    en: 'IELTS Academic Mock Test 2',
  },
  description: {
    vi: 'Đề thi thử thứ hai, đủ 4 kỹ năng theo đúng cấu trúc và thời gian thi thật: Listening 40 câu, Reading 40 câu, Writing 2 bài, Speaking 3 phần.',
    en: 'A second full four-skill mock test following the real exam format and timing: 40 Listening questions, 40 Reading questions, 2 Writing tasks and 3 Speaking parts.',
  },
  sections: [
    /* ========================================================================
     * PHẦN 1: LISTENING (30 phút, 40 câu)
     * ====================================================================== */
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 30,
      parts: [
        /* ---- Listening Part 1: Đặt tour xe đạp có hướng dẫn cho gia đình (điền form) ---- */
        {
          title: 'Part 1',
          instructions: 'Questions 1–10. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript: `Agent: Good morning, Lakeside Cycle Tours. Rachel speaking. How can I help?
Daniel: Hello. I'd like to book a guided bike tour for my family, please.
Agent: Certainly. Could I start with your name?
Daniel: Yes, it's Daniel Whitford.
Agent: Could you spell your surname for me?
Daniel: Sure. W-H-I-T-F-O-R-D.
Agent: Thank you. And which tour are you interested in? We have three tours, the Forest Trail, the River Route and the Castle Loop.
Daniel: My wife liked the sound of the Castle Loop, but that's quite long, isn't it?
Agent: Yes, it's thirty-two kilometres, so it takes most of the day.
Daniel: That's too much for our kids. What about the River Route?
Agent: That one's eighteen kilometres and almost completely flat. It's our most popular tour with families.
Daniel: Perfect. We'll go for the River Route, then.
Agent: Lovely. And how many people will be cycling?
Daniel: My wife and me, our three children, and possibly my brother. Actually, no, he's working that weekend. So just the five of us.
Agent: Five, then. How old are the children? Any child under seven has to ride in a child seat on an adult's bike.
Daniel: Our youngest is six, so she'll need one of those. The others are nine and twelve.
Agent: Fine. I'll add one child seat to the booking. Now, which date would you like?
Daniel: We were hoping for Saturday the fifteenth of August.
Agent: Let me check. I'm sorry, the fifteenth is fully booked. But there's space on Sunday the sixteenth.
Daniel: Sunday's fine.
Agent: Great. The tour meets outside the visitor centre in Lakeside village. Please don't wait at the railway station, because the guide won't go there.
Daniel: The visitor centre. Got it. And what time does it start?
Agent: The guide arrives at a quarter past nine to check the bikes, and the tour sets off at half past nine.
Daniel: And how much is it?
Agent: It's thirty-eight pounds for adults and twenty pounds for children. There's no charge for the child seat.
Daniel: That's fine. Is there anything we should bring?
Agent: We provide the bikes and helmets, of course, and lunch is included at a café by the river. But everyone should bring a waterproof jacket, because the weather can change very quickly by the lake.
Daniel: Good to know.
Agent: And finally, could I have a contact number?
Daniel: Yes, my mobile is oh seven seven two three, four one eight, oh nine six.
Agent: Oh seven seven two three, four one eight, oh nine six. Thank you, Mr Whitford. You'll receive a confirmation email later today.`,
          questions: [
            {
              kind: 'gap-fill',
              id: 'mock2-l-q01',
              number: 1,
              prompt: 'Name: Daniel ___',
              acceptedAnswers: ['Whitford'],
              explanation: {
                vi: 'Daniel đánh vần họ: W-H-I-T-F-O-R-D.',
                en: 'Daniel spells his surname: W-H-I-T-F-O-R-D.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q02',
              number: 2,
              prompt: 'Tour: the ___ Route',
              acceptedAnswers: ['River'],
              explanation: {
                vi: 'Castle Loop quá dài (bẫy); Daniel chốt "We\'ll go for the River Route".',
                en: 'The Castle Loop is too long; Daniel says, "We\'ll go for the River Route."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q03',
              number: 3,
              prompt: 'Number of people: ___',
              acceptedAnswers: ['5', 'five'],
              explanation: {
                vi: 'Em trai bận nên không đi (bẫy số 6): "just the five of us".',
                en: 'His brother is working, so it is "just the five of us".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q04',
              number: 4,
              prompt: 'Extra equipment: one child ___',
              acceptedAnswers: ['seat'],
              explanation: {
                vi: 'Bé út 6 tuổi (dưới 7) cần ghế trẻ em: "I\'ll add one child seat".',
                en: 'The youngest is six, so the agent says, "I\'ll add one child seat."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q05',
              number: 5,
              prompt: 'Date: Sunday ___ August',
              acceptedAnswers: ['16th', '16', 'sixteenth', 'the sixteenth', '16th of'],
              explanation: {
                vi: 'Ngày 15 đã kín chỗ (bẫy); còn chỗ "Sunday the sixteenth" = ngày 16.',
                en: 'The fifteenth is fully booked, but there is space on "Sunday the sixteenth".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q06',
              number: 6,
              prompt: 'Meeting point: outside the ___ centre',
              acceptedAnswers: ['visitor', "visitors'", 'visitors'],
              explanation: {
                vi: 'Gặp ở "outside the visitor centre"; không đợi ở ga tàu (bẫy).',
                en: 'The tour meets "outside the visitor centre", not at the railway station.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q07',
              number: 7,
              prompt: 'Tour starts at: ___ a.m.',
              acceptedAnswers: ['9.30', '9:30', '930', 'half past nine', 'nine thirty'],
              explanation: {
                vi: '9 giờ 15 là lúc hướng dẫn viên đến (bẫy); tour "sets off at half past nine".',
                en: 'The guide arrives at 9.15, but the tour "sets off at half past nine".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q08',
              number: 8,
              prompt: 'Price per adult: £___',
              acceptedAnswers: ['38', 'thirty-eight', 'thirty eight'],
              explanation: {
                vi: '"Thirty-eight pounds for adults"; £20 là giá trẻ em (bẫy).',
                en: '"Thirty-eight pounds for adults". Twenty pounds is the price for children.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q09',
              number: 9,
              prompt: 'Each person should bring a ___ jacket.',
              acceptedAnswers: ['waterproof'],
              explanation: {
                vi: 'Xe, mũ bảo hiểm, bữa trưa đã có; cần mang "a waterproof jacket".',
                en: 'Bikes, helmets and lunch are provided; everyone should bring "a waterproof jacket".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q10',
              number: 10,
              prompt: 'Mobile number: ___',
              acceptedAnswers: ['07723 418 096', '07723418096', '07723 418096'],
              explanation: {
                vi: '"Oh" đọc thay số 0: oh seven seven two three, four one eight, oh nine six.',
                en: '"Oh" means zero: 07723 418 096. The agent repeats the number.',
              },
            },
          ],
        },

        /* ---- Listening Part 2: Giới thiệu nông trại cộng đồng (trắc nghiệm + nối khu vực ↔ hoạt động) ---- */
        {
          title: 'Part 2',
          instructions:
            'Questions 11–15: Choose the correct letter, A, B or C. Questions 16–20: What can visitors do in each area of the farm today? Choose FIVE answers from the list, A–G.',
          audioScript: `Guide: Good morning, everyone, and welcome to Millbrook Community Farm. My name's Jenny, and I'm one of the volunteer coordinators here. Before you go off and explore, I'd like to tell you a little about the farm and what's happening today.
Guide: The farm was set up twelve years ago on land that used to be a car park for the old paper factory. People often assume it was started by the local council, or by the primary school next door, but in fact it was a group of parents who wanted their children to see where food comes from. The council did help later, by giving us a long lease on the land at a very low rent.
Guide: Today the farm is run almost entirely by volunteers. We have about sixty regular helpers and just two paid members of staff, both part-time. Most of our income comes from the farm shop and from school visits, rather than from donations, although we're always grateful for those too.
Guide: One question we're often asked is whether the farm is organic. We don't use any chemical pesticides, but we haven't applied for official organic status, because the certification process is very expensive for a small farm like ours.
Guide: For most visitors, the highlight is the animals, and our goats are especially popular. Please don't give them any food yourself, though. It isn't that they bite. It's that some foods that seem harmless, like bread, can actually make them quite ill. You can buy a bag of proper goat food at the entrance for fifty pence.
Guide: There's one important change since last year. We used to close completely in January and February, but from this winter we'll be open every weekend throughout the year. The shop is still in the same place by the main gate, and entry is still free, although we do suggest a small donation.
Guide: Now, let me tell you what's going on around the farm today. In the orchard, the apple trees are full of fruit at the moment, but I'm afraid the apples aren't ready to pick yet. Instead, one of our volunteers, who's an expert on fruit trees, will be giving a short talk there at eleven about how to look after them.
Guide: Down at the pond, the children's nature club will be helping visitors to look for frogs, water insects and other small creatures. Nets and magnifying glasses are provided, so you don't need to bring anything.
Guide: In the barn, there'll be a sheep-shearing demonstration at twelve and again at two. Please stay behind the fence while it's going on, as the sheep can get nervous.
Guide: The vegetable garden is where you can get your hands dirty. Our gardeners will show you how to plant seeds, and you can take your own little pot home to look after. We'd planned to sell young tomato plants there too, but unfortunately they've all gone already.
Guide: And finally, in the kitchen, there's a cake competition this afternoon. Anyone can enter, as long as you bring your cake before one o'clock. The winner gets a year's supply of eggs from our hens.
Guide: Right, I hope you all have a lovely day.`,
          questions: [
            {
              kind: 'choice',
              id: 'mock2-l-q11',
              number: 11,
              prompt: 'Who originally started the farm?',
              options: ['A. the local council', 'B. a group of parents', 'C. a nearby primary school'],
              correctIndex: 1,
              explanation: {
                vi: 'Nhiều người tưởng là hội đồng hay trường học, nhưng "it was a group of parents".',
                en: 'People assume the council or school, but "in fact it was a group of parents".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q12',
              number: 12,
              prompt: "Where does most of the farm's income come from?",
              options: ['A. donations from visitors', 'B. a grant from the council', 'C. the shop and school visits'],
              correctIndex: 2,
              explanation: {
                vi: '"Most of our income comes from the farm shop and from school visits, rather than from donations".',
                en: '"Most of our income comes from the farm shop and from school visits".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q13',
              number: 13,
              prompt: 'Why is the farm not officially organic?',
              options: ['A. It uses some chemical pesticides.', 'B. Getting certified would cost too much.', 'C. The land was once used as a car park.'],
              correctIndex: 1,
              explanation: {
                vi: 'Không dùng thuốc trừ sâu hoá học (A sai); chứng nhận "very expensive".',
                en: 'They use no chemical pesticides; "the certification process is very expensive".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q14',
              number: 14,
              prompt: 'Why should visitors not feed the goats bread?',
              options: ['A. The goats might bite.', 'B. The goats have already been fed.', 'C. It could make the goats ill.'],
              correctIndex: 2,
              explanation: {
                vi: '"It isn\'t that they bite" (A sai); bánh mì "can actually make them quite ill".',
                en: '"It isn\'t that they bite"; foods like bread "can actually make them quite ill".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q15',
              number: 15,
              prompt: 'What change has been made since last year?',
              options: ['A. The farm will open at weekends in winter.', 'B. The farm shop has moved.', 'C. Visitors now have to pay to enter.'],
              correctIndex: 0,
              explanation: {
                vi: 'Trước đóng cửa tháng 1–2, nay "open every weekend throughout the year". Cửa hàng, vé vẫn như cũ.',
                en: 'It used to close in winter; now it is "open every weekend throughout the year".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q16',
              number: 16,
              prompt: 'The orchard',
              options: FARM_ACTIVITIES,
              correctIndex: 5,
              explanation: {
                vi: 'Táo chưa hái được (B sai); có "a short talk there at eleven".',
                en: 'The apples are not ready to pick; an expert gives "a short talk there".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q17',
              number: 17,
              prompt: 'The pond',
              options: FARM_ACTIVITIES,
              correctIndex: 2,
              explanation: {
                vi: 'Ở ao, khách tìm "frogs, water insects and other small creatures".',
                en: 'At the pond, visitors look for "frogs, water insects and other small creatures".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q18',
              number: 18,
              prompt: 'The barn',
              options: FARM_ACTIVITIES,
              correctIndex: 0,
              explanation: {
                vi: 'Trong chuồng có "a sheep-shearing demonstration" (trình diễn xén lông cừu).',
                en: 'In the barn there is "a sheep-shearing demonstration".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q19',
              number: 19,
              prompt: 'The vegetable garden',
              options: FARM_ACTIVITIES,
              correctIndex: 4,
              explanation: {
                vi: 'Được hướng dẫn "how to plant seeds"; cây cà chua đã bán hết (G sai).',
                en: 'Gardeners show visitors "how to plant seeds"; the tomato plants have all gone.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q20',
              number: 20,
              prompt: 'The kitchen',
              options: FARM_ACTIVITIES,
              correctIndex: 3,
              explanation: {
                vi: 'Trong bếp có "a cake competition"; ai cũng tham gia được.',
                en: 'In the kitchen there is "a cake competition" that anyone can enter.',
              },
            },
          ],
        },

        /* ---- Listening Part 3: Giảng viên + Ben + Chloe bàn dự án về nhãn dinh dưỡng (Chloe = giọng Úc) ---- */
        {
          title: 'Part 3',
          instructions:
            'Questions 21–25: Choose the correct letter, A, B or C. Questions 26–30: What do the students decide to do with each section of their report? Choose FIVE answers from the list, A–G.',
          audioScript: `Tutor: Come in, both of you. So, you're here to talk about your project on food labels. How are things going?
Ben: Pretty well, I think. We've finished collecting the data, and we've started writing it up.
Tutor: Good. Remind me what your main question was.
Chloe: We wanted to find out whether shoppers actually read the nutrition labels on food packets, and if they do, which information they look at first.
Tutor: And how did you go about it?
Ben: Well, we'd planned to stand in a supermarket and observe people while they were shopping, but the manager wouldn't give us permission.
Chloe: So in the end we set up a sort of pretend shop in the student union, with real food packets on the shelves, and we used a small camera to record where people's eyes went while they chose products.
Tutor: That's quite ambitious. Did it work?
Chloe: Mostly. The main problem was that everyone knew they were being watched, so I think they probably read the labels much more carefully than they would in a real shop.
Tutor: Yes, that's an important limitation. Make sure you discuss it in your report.
Ben: We will.
Tutor: So what did you find?
Ben: The thing that stood out for me was sugar. Almost everyone looked at the sugar content first, before calories or fat.
Chloe: Which surprised me, actually. I'd assumed people would check calories first, because that's what most diet adverts focus on.
Tutor: And were there differences between groups?
Ben: Not as many as we expected. We thought older shoppers would read labels more carefully, but age made very little difference. The biggest difference was between people who cook regularly and people who don't. The regular cooks spent nearly twice as long reading the labels.
Tutor: Interesting. Have you thought about who might want to hear about your findings?
Chloe: Ben thinks we should send them to the student union, but I'd rather write a short article for the university magazine, because more people would read it.
Tutor: Both good ideas, but I'd suggest contacting the university's food services department first. They're about to design new labels for the canteen, so your results could actually make a difference.
Ben: Oh, we didn't know that. We'll get in touch with them.
Tutor: Now, I've read your draft, and overall it's on the right track. Let's go through it section by section. Your introduction is clear, but it's much too long. It should be about half its current length.
Chloe: OK. We were worried about that.
Tutor: The literature review covers the right studies, but at the moment it reads like a list. You need to compare the studies and show where they agree and disagree.
Ben: So we keep the same sources, but organise it differently?
Tutor: Exactly. The methods section has all the right information, but the detailed description of the camera equipment would be better in an appendix at the end.
Chloe: That makes sense. And the results?
Tutor: For the results, you've only used tables. Several of those would be much clearer as graphs.
Ben: What about the discussion? We weren't sure about that part.
Tutor: Actually, that's the strongest section of the report. I wouldn't change anything there.
Chloe: That's a relief.`,
          questions: [
            {
              kind: 'choice',
              id: 'mock2-l-q21',
              number: 21,
              prompt: 'Why did the students not collect their data in a supermarket?',
              options: ['A. They could not get permission.', 'B. It would have taken too long.', 'C. Shoppers were unwilling to take part.'],
              correctIndex: 0,
              explanation: {
                vi: 'Ben: "the manager wouldn\'t give us permission" (quản lý không cho phép).',
                en: 'Ben says, "the manager wouldn\'t give us permission".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q22',
              number: 22,
              prompt: 'What does Chloe see as the main weakness of their method?',
              options: ['A. The camera did not always work.', 'B. Participants knew they were being observed.', 'C. The food packets were not real.'],
              correctIndex: 1,
              explanation: {
                vi: 'Chloe: "everyone knew they were being watched". Bao bì là thật nên C sai.',
                en: 'Chloe says "everyone knew they were being watched". The packets were real.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q23',
              number: 23,
              prompt: 'What information did most participants look at first?',
              options: ['A. calories', 'B. fat', 'C. sugar'],
              correctIndex: 2,
              explanation: {
                vi: '"Almost everyone looked at the sugar content first". Calo là điều Chloe đã đoán (bẫy).',
                en: '"Almost everyone looked at the sugar content first". Calories were Chloe\'s wrong guess.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q24',
              number: 24,
              prompt: 'Which factor made the biggest difference to how long people spent reading labels?',
              options: ['A. their age', 'B. how often they cook', 'C. whether they were on a diet'],
              correctIndex: 1,
              explanation: {
                vi: 'Tuổi "made very little difference"; khác biệt lớn nhất là người hay nấu ăn.',
                en: 'Age "made very little difference"; the biggest difference was cooking regularly.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q25',
              number: 25,
              prompt: 'Who does the tutor suggest the students contact first?',
              options: ['A. the student union', 'B. the university magazine', "C. the university's food services department"],
              correctIndex: 2,
              explanation: {
                vi: 'A là ý Ben, B là ý Chloe; giảng viên gợi ý "food services department first".',
                en: 'A is Ben\'s idea, B is Chloe\'s; the tutor says "food services department first".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q26',
              number: 26,
              prompt: 'Introduction',
              options: REPORT_ACTIONS,
              correctIndex: 2,
              explanation: {
                vi: 'Phần mở đầu "much too long", nên rút còn khoảng một nửa.',
                en: 'The introduction is "much too long" and should be half its length.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q27',
              number: 27,
              prompt: 'Literature review',
              options: REPORT_ACTIONS,
              correctIndex: 5,
              explanation: {
                vi: 'Giữ nguồn cũ nhưng "organise it differently" (so sánh thay vì liệt kê).',
                en: 'They keep the same sources but "organise it differently".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q28',
              number: 28,
              prompt: 'Methods',
              options: REPORT_ACTIONS,
              correctIndex: 4,
              explanation: {
                vi: 'Phần mô tả thiết bị camera "would be better in an appendix".',
                en: 'The camera description "would be better in an appendix".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q29',
              number: 29,
              prompt: 'Results',
              options: REPORT_ACTIONS,
              correctIndex: 0,
              explanation: {
                vi: 'Chỉ có bảng; nhiều bảng "much clearer as graphs" (nên vẽ biểu đồ).',
                en: 'They only used tables; several "would be much clearer as graphs".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-l-q30',
              number: 30,
              prompt: 'Discussion',
              options: REPORT_ACTIONS,
              correctIndex: 1,
              explanation: {
                vi: 'Phần mạnh nhất: "I wouldn\'t change anything there" (giữ nguyên).',
                en: 'It is the strongest section: "I wouldn\'t change anything there."',
              },
            },
          ],
        },

        /* ---- Listening Part 4: Bài giảng về rừng ngập mặn (điền ghi chú) ---- */
        {
          title: 'Part 4',
          instructions: 'Questions 31–40. Complete the notes below. Write ONE WORD ONLY for each answer.',
          audioScript: `Lecturer: Good afternoon. In today's lecture, I'm going to look at mangrove forests, which grow along tropical and subtropical coastlines in more than one hundred countries, including large areas of southern Viet Nam.
Lecturer: Mangroves are trees and shrubs that have adapted to a very unusual environment. They grow in shallow coastal water that is salty, conditions which would kill most other plants. Some species filter out much of the salt through their roots, while others get rid of it through their leaves.
Lecturer: Another challenge is that the mud they grow in is often covered by water and contains very little oxygen. Mangroves deal with this through special roots. Some of these grow upwards out of the mud, a bit like small pencils, and allow the tree to take in oxygen directly from the air.
Lecturer: So why do mangroves matter? First of all, they protect the coast. The dense network of roots slows down waves, and this greatly reduces erosion, in other words, the gradual loss of land to the sea. After major storms, researchers have found that villages behind healthy mangrove forests generally suffered far less damage than villages without them.
Lecturer: The roots also trap mud and other sediment carried in by rivers and tides. Over time, this material builds up, so the land can actually rise slowly, which may help some coastlines keep pace with rising sea levels.
Lecturer: Mangroves are also important in the fight against climate change, because they store huge amounts of carbon, mostly in the soil beneath them. In fact, a hectare of mangrove forest can hold up to four times as much carbon as a hectare of many tropical rainforests.
Lecturer: And they matter for food. The calm, sheltered water among the roots acts as a nursery for young fish, crabs and prawns, which later move out to the open sea. So many fishing communities depend on mangroves, even if they never fish in the forest itself.
Lecturer: Unfortunately, a large proportion of the world's mangroves has been lost over the past fifty years. Some forests have been cleared for hotels and ports, but in Southeast Asia the main cause has been the creation of shrimp farms. These ponds are often abandoned after a few years because of disease and pollution, leaving land that is very difficult to restore.
Lecturer: That brings me to restoration. Many early projects simply planted huge numbers of young mangrove trees, and a lot of them failed. Often this was because the trees were planted in the wrong locations, for example on mudflats that were too low and stayed underwater for too long each day.
Lecturer: Researchers now agree that the most important step is to restore the natural movement of water. If channels are reopened so that the tide can flow in and out again, mangroves will often return by themselves, as seeds are carried in by the water.
Lecturer: Finally, the most successful projects are those that involve local communities from the very start. When the people who live nearby help to plan and manage a project, and benefit from it, for example through sustainable fishing or tourism, the forests are far more likely to be protected in the long term.`,
          questions: [
            {
              kind: 'gap-fill',
              id: 'mock2-l-q31',
              number: 31,
              prompt: 'Mangroves grow in shallow, ___ water along tropical coasts.',
              acceptedAnswers: ['salty', 'salt'],
              explanation: {
                vi: '"Shallow coastal water that is salty" — nước mặn, cây khác không sống nổi.',
                en: 'They grow in "shallow coastal water that is salty".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q32',
              number: 32,
              prompt: 'Some roots grow upwards so the tree can take in ___ from the air.',
              acceptedAnswers: ['oxygen'],
              explanation: {
                vi: 'Rễ mọc ngược lên giúp cây "take in oxygen directly from the air".',
                en: 'Upward roots "allow the tree to take in oxygen directly from the air".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q33',
              number: 33,
              prompt: 'Roots slow down waves and reduce ___ of the coastline.',
              acceptedAnswers: ['erosion'],
              explanation: {
                vi: 'Rễ làm sóng chậm lại và "greatly reduces erosion" (xói mòn).',
                en: 'Slowing waves "greatly reduces erosion", the gradual loss of land to the sea.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q34',
              number: 34,
              prompt: 'Roots trap mud and other ___, so the land can slowly rise.',
              acceptedAnswers: ['sediment', 'sediments'],
              explanation: {
                vi: '"The roots also trap mud and other sediment" nên đất cao dần.',
                en: '"The roots also trap mud and other sediment", so the land can rise.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q35',
              number: 35,
              prompt: 'A hectare of mangrove forest can store up to four times as much ___ as many rainforests.',
              acceptedAnswers: ['carbon'],
              explanation: {
                vi: '"Up to four times as much carbon as a hectare of many tropical rainforests".',
                en: '"Up to four times as much carbon as a hectare of many tropical rainforests".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q36',
              number: 36,
              prompt: 'Sheltered water among the roots acts as a ___ for young fish, crabs and prawns.',
              acceptedAnswers: ['nursery'],
              explanation: {
                vi: 'Nước lặng giữa rễ "acts as a nursery" (nơi ương nuôi) cho cá con.',
                en: 'The sheltered water "acts as a nursery for young fish, crabs and prawns".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q37',
              number: 37,
              prompt: 'In Southeast Asia, many mangroves were cleared to create ___ farms.',
              acceptedAnswers: ['shrimp', 'shrimps'],
              explanation: {
                vi: 'Khách sạn, cảng là bẫy; ở Đông Nam Á nguyên nhân chính là "shrimp farms".',
                en: 'Hotels and ports are distractors; in Southeast Asia the main cause was "shrimp farms".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q38',
              number: 38,
              prompt: 'Many early projects failed because trees were planted in the wrong ___.',
              acceptedAnswers: ['locations', 'location'],
              explanation: {
                vi: 'Thất bại vì "planted in the wrong locations", VD bãi bùn quá thấp.',
                en: 'Trees "were planted in the wrong locations", such as mudflats that were too low.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q39',
              number: 39,
              prompt: 'The most important step is to restore the natural movement of ___.',
              acceptedAnswers: ['water'],
              explanation: {
                vi: '"The most important step is to restore the natural movement of water".',
                en: '"The most important step is to restore the natural movement of water".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-l-q40',
              number: 40,
              prompt: 'Projects are most successful when local ___ are involved from the start.',
              acceptedAnswers: ['communities'],
              explanation: {
                vi: 'Dự án thành công nhất "involve local communities from the very start".',
                en: 'The best projects "involve local communities from the very start".',
              },
            },
          ],
        },
      ],
    },

    /* ========================================================================
     * PHẦN 2: READING (60 phút, 40 câu, 3 bài đọc độ khó tăng dần)
     * ====================================================================== */
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 60,
      parts: [
        /* ---- Passage 1: Xây nhà bằng tre – TFNG + điền ghi chú ---- */
        {
          title: 'Passage 1',
          instructions:
            'Questions 1–13. Questions 1–6: Do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN. Questions 7–13: Complete the notes. Write ONE WORD ONLY from the passage for each answer.',
          passage: {
            title: 'Building with Bamboo',
            text: `For thousands of years, people across Asia, Africa and Latin America have built homes, bridges and tools from bamboo. Yet in much of the modern world the plant has been regarded as a cheap, temporary material, suitable for fences and garden furniture but not for serious construction. That view is now changing. Architects and engineers are taking a fresh look at bamboo, and some believe it could become one of the most important building materials of the twenty-first century.

Although it is often mistaken for a tree, bamboo is actually a type of grass. There are more than 1,400 species, ranging from small plants less than a metre tall to giants that reach thirty metres or more. What makes bamboo remarkable is its speed of growth. Some species can grow almost a metre in a single day under ideal conditions, and a new stem reaches its full height within a few months. Unlike a tree, however, a bamboo stem does not get any thicker as it ages. Instead, over the following three to five years, its walls gradually become harder and stronger, and only then is it ready to be harvested for building.

Because bamboo grows back from its roots after cutting, a single plantation can be harvested year after year without being replanted. This is one reason why it appeals to people who are concerned about the environment. A well-managed bamboo forest also absorbs carbon dioxide as it grows, and its dense network of roots helps to hold soil together on steep hillsides, reducing the risk of landslides. By comparison, the trees used for timber may take thirty years or more to reach a size at which they can be cut down.

The material itself has impressive properties. Weight for weight, bamboo fibres are extremely strong when they are pulled, which is why bamboo has sometimes been described as 'vegetable steel'. Its hollow, tube-like shape also makes it light and flexible, so bamboo buildings tend to bend rather than break during earthquakes. In some regions where earthquakes are common, traditional bamboo houses have remained standing when concrete buildings nearby collapsed.

Bamboo does, however, have serious weaknesses. Untreated stems are attractive to insects, especially beetles, which feed on the sugars stored inside, and they can rot quickly if they are left in contact with wet ground. In the past, these problems meant that a bamboo house might need major repairs within a few years. Today, stems are usually soaked in a solution containing borax, a natural mineral salt that protects them against insects without harming people. Designers have also learned to keep bamboo dry by raising buildings on stone or concrete bases and adding wide roofs that shelter the walls from rain.

Another difficulty is that no two bamboo stems are exactly alike. Their diameter, wall thickness and strength vary from plant to plant, which makes it hard for engineers to calculate exactly how much weight a structure can carry. Connecting stems securely is also a challenge, since nails and screws tend to split the hollow tubes. Traditional builders solved this problem by tying joints together with rope, while modern designers often fill the end of each stem with concrete and then use steel bolts.

To deal with the problem of natural variation, some manufacturers now produce what is known as engineered bamboo. The stems are cut into thin strips, which are dried, pressed together with glue and formed into boards or beams of a standard size. These products look rather like timber and can be used in much the same way, although the glue and the energy used in factories reduce some of bamboo's environmental advantages.

Perhaps the biggest obstacle, though, is not technical but cultural. In many countries where bamboo grows naturally, it is still seen as 'the poor man's timber', and families who can afford it often choose concrete instead as a sign of success. Building regulations in most countries were also written with steel, concrete and wood in mind, and few include standards for bamboo, which can make it difficult for architects to get their designs approved. Supporters hope that a growing number of striking modern bamboo buildings, from schools to concert halls, will help to change public attitudes.`,
          },
          questions: [
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q01',
              number: 1,
              prompt: 'Bamboo is a kind of grass rather than a tree.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn 2: "bamboo is actually a type of grass".',
                en: 'Paragraph 2: "bamboo is actually a type of grass".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q02',
              number: 2,
              prompt: 'A bamboo stem becomes wider every year until it is harvested.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn 2: thân tre "does not get any thicker as it ages"; chỉ cứng hơn.',
                en: 'Paragraph 2: a stem "does not get any thicker as it ages"; it only hardens.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q03',
              number: 3,
              prompt: 'Bamboo plants have to be replaced after each harvest.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn 3: thu hoạch "year after year without being replanted".',
                en: 'Paragraph 3: it can be harvested "year after year without being replanted".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q04',
              number: 4,
              prompt: 'Bamboo forests absorb more carbon dioxide than any other type of forest.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài chỉ nói rừng tre hấp thụ CO2, không so sánh với các loại rừng khác.',
                en: 'Bamboo absorbs carbon dioxide, but no comparison with other forests is made.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q05',
              number: 5,
              prompt: 'In an earthquake, bamboo buildings are more likely to bend than to break.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn 4: nhà tre "tend to bend rather than break during earthquakes".',
                en: 'Paragraph 4: bamboo buildings "tend to bend rather than break during earthquakes".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q06',
              number: 6,
              prompt: 'Engineered bamboo is cheaper to produce than ordinary timber.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Đoạn 7 nói về keo và năng lượng nhà máy, không nhắc giá thành.',
                en: 'Paragraph 7 mentions glue and factory energy, but never cost.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q07',
              number: 7,
              prompt: 'Insects such as ___ are attracted by sugars inside untreated stems.',
              acceptedAnswers: ['beetles'],
              explanation: {
                vi: 'Đoạn 5: "insects, especially beetles, which feed on the sugars".',
                en: 'Paragraph 5: "insects, especially beetles, which feed on the sugars".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q08',
              number: 8,
              prompt: 'Stems may rot if they touch wet ___.',
              acceptedAnswers: ['ground'],
              explanation: {
                vi: 'Đoạn 5: tre mục "if they are left in contact with wet ground".',
                en: 'Paragraph 5: they rot "if they are left in contact with wet ground".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q09',
              number: 9,
              prompt: 'Stems are soaked in a solution containing ___ to protect them from insects.',
              acceptedAnswers: ['borax'],
              explanation: {
                vi: 'Đoạn 5: "soaked in a solution containing borax", một loại muối khoáng.',
                en: 'Paragraph 5: stems are "soaked in a solution containing borax".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q10',
              number: 10,
              prompt: 'Buildings are raised on bases and given wide ___ to keep the walls dry.',
              acceptedAnswers: ['roofs'],
              explanation: {
                vi: 'Đoạn 5: "adding wide roofs that shelter the walls from rain".',
                en: 'Paragraph 5: "adding wide roofs that shelter the walls from rain".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q11',
              number: 11,
              prompt: 'Nails and screws can ___ the hollow stems.',
              acceptedAnswers: ['split'],
              explanation: {
                vi: 'Đoạn 6: "nails and screws tend to split the hollow tubes".',
                en: 'Paragraph 6: "nails and screws tend to split the hollow tubes".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q12',
              number: 12,
              prompt: 'Traditional builders tied joints together with ___.',
              acceptedAnswers: ['rope'],
              explanation: {
                vi: 'Đoạn 6: "tying joints together with rope".',
                en: 'Paragraph 6: "tying joints together with rope".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q13',
              number: 13,
              prompt: 'Engineered bamboo is made from thin strips pressed together with ___.',
              acceptedAnswers: ['glue'],
              explanation: {
                vi: 'Đoạn 7: các nan tre được "pressed together with glue".',
                en: 'Paragraph 7: the strips are "pressed together with glue".',
              },
            },
          ],
        },

        /* ---- Passage 2: Khoa học công dân – đoạn nào chứa thông tin + nối nhà nghiên cứu + điền tóm tắt ---- */
        {
          title: 'Passage 2',
          instructions:
            'Questions 14–26. Questions 14–18: Which paragraph, A–G, contains the following information? You may use any letter more than once. Questions 19–22: Match each statement with the correct person, A, B or C. You may use any letter more than once. Questions 23–26: Complete the summary. Write NO MORE THAN TWO WORDS from the passage for each answer.',
          passage: {
            title: 'Citizen Science: Counting the Natural World',
            text: `A  Every year, on a weekend in late January, hundreds of thousands of people in one European country spend an hour looking out of their windows or sitting in a local park, counting birds. They record the highest number of each species that they see at any one time and send their results to a national wildlife organisation. The exercise, which began in the 1970s as an activity for children, has grown into one of the largest wildlife surveys in the world. It is also one of the best-known examples of 'citizen science': research in which members of the public, rather than professional scientists, collect much of the data.

B  The idea is not new. Long before science became a profession, amateurs made important contributions to knowledge. Farmers recorded the dates on which the first flowers opened each spring, and enthusiastic collectors described thousands of species of insects and plants. Some of these old records are now extremely valuable, because they allow researchers to see how the timing of natural events has shifted as the climate has warmed.

C  What has changed in recent decades is the scale. Smartphones, with their cameras and GPS, have made it far easier for ordinary people to record what they see and exactly where they saw it. Online platforms now allow volunteers to upload photographs of plants, insects or birds, which are then identified by other users or, increasingly, by automatic image-recognition software. Some platforms have collected tens of millions of observations, far more than any team of professional scientists could gather. A few even turn recording into a game, awarding points or badges to their most active contributors.

D  For researchers, the attraction is obvious. 'We simply could not afford to pay people to watch every garden, field and riverbank,' says ecologist Dr Ines Moreau. 'Volunteers give us eyes everywhere, and they keep coming back year after year, which is exactly what you need to detect long-term changes.' Data from such projects have been used to track the spread of invasive species, to show which birds are declining in towns and cities, and to measure the effect of warmer winters on the timing of insect activity.

E  However, citizen science has its critics. The most common concern is the quality of the data. Volunteers may misidentify species, particularly ones that look alike, and they tend to record what is easy to see rather than what is actually there. Large, colourful butterflies are reported far more often than small brown moths, for example, and more observations come from areas near towns and roads than from remote countryside. Animals that are active mainly at night are also under-recorded, simply because few volunteers are out looking for them. 'If you are not careful, you end up mapping where people go rather than where animals live,' warns statistician Professor Tomas Halvorsen.

F  Scientists have developed several ways to deal with these problems. Many projects now ask volunteers to follow simple, fixed methods, such as counting for exactly fifteen minutes or walking the same route each time, which makes results easier to compare. Records of unusual species are usually checked by experts before they are accepted. Statistical techniques can also correct for some kinds of bias, for instance by taking into account how much effort was spent searching in each area. Professor Halvorsen believes that, with these safeguards, volunteer data can be 'every bit as reliable as professional data for many questions', though not for all.

G  There is also growing evidence that citizen science benefits the volunteers themselves. Studies suggest that participants learn to identify more species and often become more interested in protecting the environment. Dr Priya Raman, who studies public engagement with science, points out that the effect is strongest when volunteers receive feedback. 'People want to know that their records have been used,' she says. 'When a project shows them what their data revealed, they are far more likely to stay involved and to tell their friends.' Some researchers now argue that this educational role is just as important as the data itself.`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'mock2-r-q14',
              number: 14,
              paragraphLabel: 'B',
              prompt: 'an example of how records made by amateurs long ago are useful today',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn B: ghi chép xưa giúp thấy thời điểm các hiện tượng tự nhiên đã thay đổi.',
                en: 'Paragraph B: old records show how natural timing "has shifted as the climate has warmed".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q15',
              number: 15,
              paragraphLabel: 'E',
              prompt: 'a reason why reports may not show where animals really live',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 4,
              explanation: {
                vi: 'Đoạn E: dữ liệu dồn về gần đường, thị trấn — "where people go rather than where animals live".',
                en: 'Paragraph E: records cluster near towns and roads, showing "where people go".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q16',
              number: 16,
              paragraphLabel: 'C',
              prompt: 'a description of how technology has increased the amount of data collected',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 2,
              explanation: {
                vi: 'Đoạn C: điện thoại thông minh, nền tảng trực tuyến → "tens of millions of observations".',
                en: 'Paragraph C: smartphones and online platforms gather "tens of millions of observations".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q17',
              number: 17,
              paragraphLabel: 'F',
              prompt: 'a reference to standard procedures that make results easier to compare',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 5,
              explanation: {
                vi: 'Đoạn F: "follow simple, fixed methods", VD đếm đúng 15 phút.',
                en: 'Paragraph F: volunteers "follow simple, fixed methods", such as counting for fifteen minutes.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q18',
              number: 18,
              paragraphLabel: 'A',
              prompt: 'how a large yearly survey first began',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 0,
              explanation: {
                vi: 'Đoạn A: cuộc đếm chim "began in the 1970s as an activity for children".',
                en: 'Paragraph A: the bird count "began in the 1970s as an activity for children".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q19',
              number: 19,
              paragraphLabel: 'G',
              prompt: 'Volunteers are more likely to continue if they learn how their records were used.',
              options: RESEARCHERS,
              correctIndex: 2,
              explanation: {
                vi: 'Raman: khi được xem kết quả, họ "far more likely to stay involved".',
                en: 'Raman: when shown what their data revealed, volunteers are "far more likely to stay involved".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q20',
              number: 20,
              paragraphLabel: 'D',
              prompt: 'Volunteers are valuable partly because they take part repeatedly over many years.',
              options: RESEARCHERS,
              correctIndex: 0,
              explanation: {
                vi: 'Moreau: tình nguyện viên "keep coming back year after year".',
                en: 'Moreau: volunteers "keep coming back year after year".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q21',
              number: 21,
              paragraphLabel: 'F',
              prompt: 'Volunteer data can be trusted for many research questions, but not all of them.',
              options: RESEARCHERS,
              correctIndex: 1,
              explanation: {
                vi: 'Halvorsen: đáng tin "for many questions", though not for all.',
                en: 'Halvorsen: "every bit as reliable ... for many questions", though not for all.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q22',
              number: 22,
              paragraphLabel: 'E',
              prompt: 'Results may reflect human movement rather than the distribution of animals.',
              options: RESEARCHERS,
              correctIndex: 1,
              explanation: {
                vi: 'Halvorsen: "mapping where people go rather than where animals live".',
                en: 'Halvorsen warns of "mapping where people go rather than where animals live".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q23',
              number: 23,
              paragraphLabel: 'C',
              prompt: 'Smartphones make recording easier because they have cameras and ___.',
              acceptedAnswers: ['GPS'],
              explanation: {
                vi: 'Đoạn C: "Smartphones, with their cameras and GPS".',
                en: 'Paragraph C: "Smartphones, with their cameras and GPS".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q24',
              number: 24,
              paragraphLabel: 'C',
              prompt: 'Uploaded photographs may be identified by other users or by ___ software.',
              acceptedAnswers: ['image-recognition', 'image recognition', 'automatic image-recognition', 'automatic image recognition'],
              explanation: {
                vi: 'Đoạn C: "by automatic image-recognition software" (phần mềm nhận diện ảnh).',
                en: 'Paragraph C: "by automatic image-recognition software".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q25',
              number: 25,
              paragraphLabel: 'F',
              prompt: 'To make results comparable, volunteers may walk the same ___ each time.',
              acceptedAnswers: ['route'],
              explanation: {
                vi: 'Đoạn F: "walking the same route each time".',
                en: 'Paragraph F: "walking the same route each time".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q26',
              number: 26,
              paragraphLabel: 'F',
              prompt: 'Records of ___ species are usually checked by experts.',
              acceptedAnswers: ['unusual'],
              explanation: {
                vi: 'Đoạn F: "Records of unusual species are usually checked by experts".',
                en: 'Paragraph F: "Records of unusual species are usually checked by experts".',
              },
            },
          ],
        },

        /* ---- Passage 3: Ngôn ngữ và tư duy – matching headings + TFNG + trắc nghiệm + điền câu ---- */
        {
          title: 'Passage 3',
          instructions:
            'Questions 27–40. Questions 27–31: Choose the correct heading for paragraphs B–F from the list of headings (i–viii). Example: Paragraph A — iii. Questions 32–36: Choose TRUE, FALSE or NOT GIVEN. Questions 37–38: Choose the correct letter, A, B, C or D. Questions 39–40: Complete the sentences. Write ONE WORD ONLY from the passage for each answer.',
          passage: {
            title: 'Does Language Shape the Way We Think?',
            text: `A  Few ideas in the study of language have been as attractive, or as controversial, as the claim that the language we speak shapes the way we see the world. In its strongest form, the idea suggests that speakers of different languages live in different mental worlds: if a language lacks a word for something, its speakers may be unable to think about it at all. This strong version, which became popular in the middle of the twentieth century, is now rejected by almost all researchers. People clearly can think about things for which they have no word, as anyone who has struggled to describe a new taste or feeling will know. A far more interesting question is whether a weaker version is true: whether language influences, rather than determines, thought.

B  One example has been used for decades to support the stronger claim, and it turns out to be largely mistaken. It is often said that the languages of the Arctic have dozens, or even hundreds, of words for snow, and that this allows their speakers to notice differences that others cannot see. In reality, the number depends heavily on how one counts. These languages build long words from smaller parts, so a single 'word' may express what English says in a whole phrase, such as 'snow that is drifting'. English itself has a respectable number of snow-related terms, including slush, sleet and blizzard. Linguists now treat the story as a warning about how easily appealing ideas spread without being checked.

C  More careful research, however, has produced some genuinely intriguing results. Russian, for instance, has two basic words for blue: one for lighter shades and one for darker shades, which speakers treat as different colours rather than as varieties of the same one. In laboratory experiments, Russian speakers were slightly faster than English speakers at telling two shades of blue apart when the shades fell on opposite sides of this boundary. Interestingly, the advantage disappeared when participants were asked to repeat a string of numbers at the same time, a task that keeps the language system busy. This suggests that language was playing a role at the moment of perception, rather than permanently changing what people could see.

D  Even more striking findings come from the way languages describe space. English speakers usually describe locations relative to their own bodies, saying that something is on their left or in front of them. Some languages, including one spoken by an Aboriginal community in northern Australia, rarely do this. Instead, speakers use fixed compass directions such as north and south, even for small objects close by: they might mention that a cup is to the north of a plate, or ask someone to move a little to the east. Speakers of such languages are remarkably good at keeping track of direction, even inside unfamiliar buildings. When they are asked to arrange objects again after being turned around to face the other way, they tend to preserve the original compass directions, whereas English speakers preserve left and right.

E  Language may also affect how people handle numbers. A small number of communities, including some in the Amazon rainforest, speak languages that lack words for exact quantities, having only terms that mean something like 'a small amount', 'a few' or 'many'. When researchers asked speakers to match a row of objects with the same number of items, they performed well with very small numbers but became increasingly inaccurate as the quantities grew larger. This does not mean that they cannot understand quantity. Rather, it suggests that number words act as a kind of tool that makes it possible to track exact amounts reliably, in much the same way as writing makes it possible to remember long lists.

F  Not all reported effects have stood up to examination. One widely reported study claimed that the grammatical gender of nouns influenced how people described objects. German speakers, for whom the word for 'bridge' is feminine, supposedly described bridges as elegant or beautiful, while Spanish speakers, for whom it is masculine, preferred words such as strong or solid. When other researchers later repeated the experiment with larger groups of participants, they found no such difference. Results like this have made many psychologists more cautious. Today, most researchers in the field would accept that language can nudge thinking in particular directions, especially in tasks where people rely on words, but few would claim that it builds walls between the minds of speakers of different languages.`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'mock2-r-q27',
              number: 27,
              paragraphLabel: 'B',
              prompt: 'Choose the correct heading for Paragraph B.',
              options: HEADINGS_P3,
              correctIndex: 0,
              explanation: {
                vi: 'Đoạn B: chuyện "hàng trăm từ chỉ tuyết" phổ biến nhưng "largely mistaken" → i.',
                en: 'Paragraph B: the popular snow-words story "turns out to be largely mistaken" → i.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q28',
              number: 28,
              paragraphLabel: 'C',
              prompt: 'Choose the correct heading for Paragraph C.',
              options: HEADINGS_P3,
              correctIndex: 4,
              explanation: {
                vi: 'Đoạn C: hai từ chỉ màu xanh giúp người Nga phân biệt nhanh hơn → v.',
                en: 'Paragraph C: two Russian blue words and faster colour discrimination → v.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q29',
              number: 29,
              paragraphLabel: 'D',
              prompt: 'Choose the correct heading for Paragraph D.',
              options: HEADINGS_P3,
              correctIndex: 5,
              explanation: {
                vi: 'Đoạn D: trái/phải so với hướng la bàn để tả vị trí → vi.',
                en: 'Paragraph D: left and right versus compass directions for locations → vi.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q30',
              number: 30,
              paragraphLabel: 'E',
              prompt: 'Choose the correct heading for Paragraph E.',
              options: HEADINGS_P3,
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn E: từ chỉ số "act as a kind of tool" để đếm chính xác → ii.',
                en: 'Paragraph E: number words "act as a kind of tool" for exact amounts → ii.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q31',
              number: 31,
              paragraphLabel: 'F',
              prompt: 'Choose the correct heading for Paragraph F.',
              options: HEADINGS_P3,
              correctIndex: 3,
              explanation: {
                vi: 'Đoạn F: làm lại thí nghiệm "found no such difference"; kết luận thận trọng hơn → iv.',
                en: 'Paragraph F: a repeated study "found no such difference"; researchers became cautious → iv.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q32',
              number: 32,
              paragraphLabel: 'A',
              prompt: 'Most researchers still accept the strong version of the theory.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn A: bản mạnh "is now rejected by almost all researchers".',
                en: 'Paragraph A: the strong version "is now rejected by almost all researchers".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q33',
              number: 33,
              paragraphLabel: 'B',
              prompt: 'Arctic languages can express in a single word what English expresses in a phrase.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn B: "a single \'word\' may express what English says in a whole phrase".',
                en: 'Paragraph B: "a single \'word\' may express what English says in a whole phrase".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q34',
              number: 34,
              paragraphLabel: 'C',
              prompt: "The Russian speakers' advantage remained when they were also repeating numbers.",
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn C: lợi thế "disappeared" khi họ phải lặp lại dãy số.',
                en: 'Paragraph C: "the advantage disappeared" while they repeated numbers.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q35',
              number: 35,
              paragraphLabel: 'D',
              prompt: 'When turned to face the other way, speakers of compass-based languages tended to rearrange objects by compass direction.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn D: họ "preserve the original compass directions" sau khi quay người.',
                en: 'Paragraph D: they "tend to preserve the original compass directions".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock2-r-q36',
              number: 36,
              paragraphLabel: 'E',
              prompt: 'The Amazon communities described in the passage find it hard to learn to read.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Đoạn E chỉ so sánh từ chỉ số với chữ viết; không nói về việc học đọc.',
                en: 'Paragraph E only compares number words to writing; learning to read is not mentioned.',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q37',
              number: 37,
              paragraphLabel: 'B',
              prompt: "What does the writer suggest about the 'words for snow' example?",
              options: [
                'A. It proves that Arctic peoples see snow differently.',
                'B. It shows how easily attractive ideas spread without evidence.',
                'C. It was first invented by English-speaking linguists.',
                'D. It applies to only one Arctic language.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn B: câu chuyện là lời cảnh báo "how easily appealing ideas spread without being checked".',
                en: 'Paragraph B: a warning about "how easily appealing ideas spread without being checked".',
              },
            },
            {
              kind: 'choice',
              id: 'mock2-r-q38',
              number: 38,
              paragraphLabel: 'E',
              prompt: 'In paragraph E, number words are compared to writing because both',
              options: [
                'A. were invented at about the same time.',
                'B. are missing from some Amazon languages.',
                'C. are learned early in childhood.',
                'D. help people handle exact information reliably.',
              ],
              correctIndex: 3,
              explanation: {
                vi: 'Từ chỉ số giúp theo dõi số lượng chính xác, giống chữ viết giúp nhớ danh sách dài.',
                en: 'Number words track exact amounts reliably, as writing helps remember long lists.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q39',
              number: 39,
              paragraphLabel: 'F',
              prompt: 'In the gender study, German and Spanish speakers supposedly described a ___ in different ways.',
              acceptedAnswers: ['bridge'],
              explanation: {
                vi: 'Đoạn F: từ "bridge" giống cái trong tiếng Đức, giống đực trong tiếng Tây Ban Nha.',
                en: 'Paragraph F: the word for "bridge" is feminine in German, masculine in Spanish.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock2-r-q40',
              number: 40,
              paragraphLabel: 'F',
              prompt: 'Most researchers now accept that language can ___ thinking in particular directions.',
              acceptedAnswers: ['nudge'],
              explanation: {
                vi: 'Đoạn F: "language can nudge thinking in particular directions".',
                en: 'Paragraph F: "language can nudge thinking in particular directions".',
              },
            },
          ],
        },
      ],
    },

    /* ========================================================================
     * PHẦN 3: WRITING (60 phút: Task 1 ~20 phút, Task 2 ~40 phút)
     * ====================================================================== */
    {
      skill: 'writing',
      title: 'Writing',
      durationMinutes: 60,
      writingTasks: [
        /* ---- Task 1: Biểu đồ cột – phương tiện chính đi làm/đi học theo nhóm tuổi ---- */
        {
          id: 'mock2-w-task1',
          taskNumber: 1,
          prompt:
            'The bar chart below shows the main way that people in four age groups travelled to work or study in one city in 2023.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.',
          chartData: {
            chartType: 'bar',
            title: 'Main way of travelling to work or study, by age group, one city, 2023',
            unit: '% of each age group',
            labels: ['18–24', '25–39', '40–59', '60+'],
            series: [
              { name: 'Car', values: [18, 41, 54, 46] },
              { name: 'Public transport', values: [52, 34, 27, 38] },
              { name: 'Cycling or walking', values: [30, 25, 19, 16] },
            ],
          },
          minWords: 150,
          suggestedMinutes: 20,
          sampleAnswer: `The bar chart compares how people in four age groups in one city mainly travelled to work or study in 2023, looking at three options: the car, public transport, and cycling or walking.

Overall, the youngest group relied most heavily on public transport, whereas the car was the most common choice for everyone aged 25 and over. Cycling and walking became steadily less popular with age.

Among 18 to 24-year-olds, just over half (52%) used public transport and almost a third (30%) cycled or walked, leaving only 18% who travelled by car. In the 25–39 group, however, the car became the leading option at 41%, while the share using public transport fell to 34%.

Car use peaked among people aged 40 to 59, at 54%, the highest figure in the chart, and only 27% of this group took public transport. For those aged 60 and over, the car remained the most popular choice (46%), but public transport recovered to 38%. Meanwhile, the proportion who cycled or walked fell in every successive age group, from 30% among the youngest to just 16% among the oldest.`,
        },
        /* ---- Task 2: Advantages outweigh disadvantages – làm việc tại nhà ---- */
        {
          id: 'mock2-w-task2',
          taskNumber: 2,
          prompt:
            'In many countries, a growing number of people now work from home for at least part of the week.\n\nDo the advantages of this development outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          suggestedMinutes: 40,
          sampleAnswer: `Over the past few years, working from home has changed from a rare privilege into a normal arrangement for many office workers. Although this trend has some real drawbacks, I believe that, on balance, its advantages are greater.

The most obvious benefit is the time and money saved on commuting. In large cities such as Ho Chi Minh City, the journey to an office can take more than an hour each way in heavy traffic. Working from home even two days a week gives employees this time back for rest, exercise or their families. It also reduces congestion and air pollution, which benefits the whole community. In addition, many people find that they can concentrate better at home, away from the constant interruptions of a busy open-plan office, and are therefore more productive.

There are, however, genuine disadvantages. Some employees feel isolated when they rarely see their colleagues, and younger staff in particular may miss the chance to learn by watching more experienced co-workers. Communication can also become slower, since a question that would take seconds to answer in person may turn into a long chain of messages. Finally, for people who live in small, crowded homes, finding a quiet place to work can be extremely difficult.

In my view, most of these problems can be reduced through sensible planning. A hybrid system, in which staff spend some days in the office and others at home, allows teams to meet regularly while still enjoying the flexibility of remote work. Employers can also help by providing proper equipment and setting clear rules about when people should be available.

In conclusion, although working from home can lead to loneliness and communication problems, I believe its benefits for individuals, companies and cities outweigh these drawbacks, especially when it is combined with regular time in the office.`,
        },
      ],
    },

    /* ========================================================================
     * PHẦN 4: SPEAKING (~14 phút)
     *   Part 1: câu hỏi ngắn về thói quen hằng ngày + âm nhạc (4–5 phút)
     *   Part 2: cue card – 1 phút chuẩn bị, nói tối đa 2 phút
     *   Part 3: thảo luận sâu hơn về du lịch
     * ====================================================================== */
    {
      skill: 'speaking',
      title: 'Speaking',
      durationMinutes: 14,
      speakingParts: [
        /* ---- Speaking Part 1: Thói quen hằng ngày, âm nhạc ---- */
        {
          partNumber: 1,
          questions: [
            "Let's talk about your daily routine. What time do you usually get up on weekdays?",
            'Which part of the day do you like best? Why?',
            'Do you prefer to plan your day carefully or to be more flexible?',
            "Now let's talk about music. What kind of music do you enjoy?",
            'Did you learn to play a musical instrument when you were a child?',
          ],
          prepSeconds: 0,
          answerSeconds: 30,
        },
        /* ---- Speaking Part 2: Cue card – nơi đã đến và muốn quay lại ---- */
        {
          partNumber: 2,
          questions: ['Describe a place you have visited that you would like to visit again.'],
          cueCardPoints: [
            'where the place is',
            'when you went there and who you went with',
            'what you did there',
            'and explain why you would like to visit it again',
          ],
          prepSeconds: 60,
          answerSeconds: 120,
        },
        /* ---- Speaking Part 3: Thảo luận về du lịch ---- */
        {
          partNumber: 3,
          questions: [
            'Why do some people prefer to return to the same holiday place again and again?',
            'How has tourism changed in your country over the last twenty years?',
            'Do you think tourism does more good than harm to local communities?',
            'Should popular tourist sites limit the number of visitors? Why or why not?',
          ],
          prepSeconds: 0,
          answerSeconds: 60,
        },
      ],
    },
  ],
}
