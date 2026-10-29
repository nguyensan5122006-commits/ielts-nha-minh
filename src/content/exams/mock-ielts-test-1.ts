/**
 * mock-ielts-test-1.ts
 * ----------------------------------------------------------------------------
 * ĐỀ THI THỬ IELTS ACADEMIC SỐ 1 (nội dung tự biên soạn, không sao chép đề Cambridge).
 * Mức độ: tương đương đề thật, phù hợp người học mục tiêu band 5.0 – 6.5.
 *
 * Cấu trúc (đúng thứ tự thi thật):
 *   1) LISTENING – 30 phút – 4 part × 10 câu = 40 câu (đánh số 1–40)
 *        Part 1: hội thoại đời sống, điền form (gap-fill)
 *        Part 2: độc thoại giới thiệu thư viện cộng đồng (trắc nghiệm + điền từ)
 *        Part 3: 2 sinh viên + giảng viên bàn về bài tập (trắc nghiệm)
 *        Part 4: bài giảng học thuật về "đảo nhiệt đô thị" (điền ghi chú)
 *   2) READING – 60 phút – 3 bài đọc, 13 + 13 + 14 = 40 câu (đánh số 1–40)
 *        Passage 1: lịch sử cây bút chì (dễ nhất)
 *        Passage 2: phục hồi rạn san hô
 *        Passage 3: "mệt mỏi khi ra quyết định" (khó nhất)
 *   3) WRITING – 60 phút – Task 1 (biểu đồ đường, ≥150 từ) + Task 2 (bài luận, ≥250 từ)
 *   4) SPEAKING – khoảng 14 phút – Part 1, Part 2 (cue card), Part 3
 *
 * Mỗi câu Listening/Reading có giải thích song ngữ (vi/en) chỉ ra đáp án nằm ở đâu
 * trong bài nghe / bài đọc. Câu gap-fill có đúng 1 chỗ trống "___".
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'

/* Danh sách chữ cái đoạn văn dùng cho dạng "Which paragraph contains..." (Reading Passage 2) */
const PARAGRAPHS_A_TO_G = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

/* Danh sách tiêu đề (headings) cho dạng Matching Headings (Reading Passage 3) */
const HEADINGS_P3 = [
  'i. A famous study and its unsettling implications',
  'ii. Why the original theory has been challenged',
  'iii. Practical ways to protect the quality of our choices',
  'iv. The hidden cost of everyday choices',
  'v. How the body supplies energy to the brain',
  'vi. A belief that changes the outcome',
  'vii. Why shops are designed to confuse customers',
  'viii. A limited resource: the theory explained',
]

export const mockIeltsTest1: Exam = {
  id: 'mock-ielts-1',
  kind: 'mock-ielts',
  title: {
    vi: 'Đề thi thử IELTS Academic số 1',
    en: 'IELTS Academic Mock Test 1',
  },
  description: {
    vi: 'Đề thi thử đầy đủ 4 kỹ năng theo đúng cấu trúc và thời gian thi thật: Listening 40 câu, Reading 40 câu, Writing 2 bài, Speaking 3 phần.',
    en: 'A full four-skill mock test following the real exam format and timing: 40 Listening questions, 40 Reading questions, 2 Writing tasks and 3 Speaking parts.',
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
        /* ---- Listening Part 1: Gọi điện đăng ký hội viên trung tâm thể thao (điền form) ---- */
        {
          title: 'Part 1',
          instructions:
            'Questions 1–10. Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript: `Receptionist: Good morning, Riverside Leisure Centre. How can I help you?
Sarah: Hi. I'd like to join the centre, and I was wondering if I could do the registration over the phone.
Receptionist: Yes, of course. I'll just fill in the form for you. Can I start with your name?
Sarah: It's Sarah Kemble.
Receptionist: Could you spell your surname for me?
Sarah: Sure. It's K-E-M-B-L-E.
Receptionist: Thank you. And what's your address, Sarah?
Sarah: It's 42 Mill Road.
Receptionist: Is that Milton Road, near the station?
Sarah: No, just Mill. M-I-L-L. It's the road that goes past the old bakery.
Receptionist: Ah, I know it. And the postcode?
Sarah: BH7 4QT.
Receptionist: BH7 4QT. Lovely. And a contact phone number?
Sarah: My mobile is best. It's 07946 381 552.
Receptionist: 07946 381 552. Great. Now, we have two main types of membership. There's standard membership, which lets you use the centre at any time, and there's off-peak, which is weekdays between nine and four, plus weekends.
Sarah: I work from home most days, so off-peak would suit me better, I think. How much is that?
Receptionist: Standard is forty-five pounds a month. Off-peak used to be twenty-nine pounds, but I'm afraid it went up at the beginning of this month, so it's now thirty-two pounds.
Sarah: That's still fine. Off-peak, then.
Receptionist: Okay. And what are you mainly interested in doing here? It helps us plan your induction.
Sarah: Well, I was originally thinking about swimming, but I've had a problem with my shoulder, so my doctor suggested something gentler. A friend recommended your Pilates classes.
Receptionist: Pilates is very popular. So I'll put Pilates as your main interest. That's P-I-L-A-T-E-S.
Sarah: Yes, that's right.
Receptionist: Now, all new members have a free induction session with one of our instructors. We run them on Tuesdays and Thursdays.
Sarah: Tuesday would be ideal.
Receptionist: Let me check. Oh, I'm sorry, Tuesday is completely full for the next two weeks. Would Thursday work?
Sarah: Yes, Thursday's fine. I can move a meeting.
Receptionist: Lovely. And can I ask how you heard about us? Was it our website, or perhaps the local newspaper?
Sarah: I did look at the website afterwards, but actually it was my neighbour who told me about the centre. She's been a member for years.
Receptionist: That's great to hear. I'll put neighbour. Last thing: when you come for your induction, you'll need to bring a photograph for your membership card.
Sarah: Do I need to bring any ID as well, like my passport?
Receptionist: No, there's no need for that, because you're paying by bank card, so we already have your details. Just the photo.
Sarah: Great. Thanks so much for your help.
Receptionist: You're welcome. See you on Thursday.`,
          questions: [
            {
              kind: 'gap-fill',
              id: 'mock1-l-q01',
              number: 1,
              prompt: 'Name: Sarah ___',
              acceptedAnswers: ['Kemble'],
              explanation: {
                vi: 'Sarah đánh vần họ của mình: "K-E-M-B-L-E" → Kemble. Phần đánh vần tên trong Part 1 rất hay xuất hiện, cần nghe kỹ từng chữ cái.',
                en: 'Sarah spells her surname: "K-E-M-B-L-E" → Kemble. Spelling names is very common in Part 1.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q02',
              number: 2,
              prompt: 'Address: 42 ___ Road',
              acceptedAnswers: ['Mill'],
              explanation: {
                vi: 'Lễ tân hỏi "Milton Road?" (bẫy), Sarah sửa lại: "No, just Mill. M-I-L-L." → Mill.',
                en: 'The receptionist suggests "Milton Road" (distractor), but Sarah corrects her: "No, just Mill. M-I-L-L."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q03',
              number: 3,
              prompt: 'Postcode: ___',
              acceptedAnswers: ['BH7 4QT', 'BH74QT', 'BH7-4QT'],
              explanation: {
                vi: 'Sarah đọc mã bưu điện "BH7 4QT" và lễ tân nhắc lại để xác nhận.',
                en: 'Sarah gives the postcode "BH7 4QT" and the receptionist repeats it.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q04',
              number: 4,
              prompt: 'Mobile number: ___',
              acceptedAnswers: ['07946 381 552', '07946381552', '07946 381552', '07946-381-552'],
              explanation: {
                vi: 'Sarah nói: "My mobile is best. It\'s 07946 381 552." – lễ tân nhắc lại đúng dãy số này.',
                en: 'Sarah says: "My mobile is best. It\'s 07946 381 552." The receptionist repeats the number.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q05',
              number: 5,
              prompt: 'Type of membership: ___',
              acceptedAnswers: ['off-peak', 'off peak', 'offpeak'],
              explanation: {
                vi: 'Có hai loại: standard và off-peak. Sarah làm việc ở nhà nên chọn: "Off-peak, then."',
                en: 'There are two types: standard and off-peak. Sarah works from home and chooses: "Off-peak, then."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q06',
              number: 6,
              prompt: 'Monthly cost: £___',
              acceptedAnswers: ['32', 'thirty-two', 'thirty two'],
              explanation: {
                vi: 'Bẫy: gói standard £45, off-peak "used to be" £29 nhưng đã tăng – "it\'s now thirty-two pounds" → 32.',
                en: 'Distractors: standard is £45, and off-peak "used to be" £29 – but "it\'s now thirty-two pounds".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q07',
              number: 7,
              prompt: 'Main interest: ___ classes',
              acceptedAnswers: ['Pilates'],
              explanation: {
                vi: 'Sarah lúc đầu định bơi (swimming – bẫy) nhưng bị đau vai, nên chọn lớp Pilates; lễ tân đánh vần "P-I-L-A-T-E-S".',
                en: 'Sarah first thought of swimming (distractor) but has a shoulder problem, so she chooses Pilates, spelled "P-I-L-A-T-E-S".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q08',
              number: 8,
              prompt: 'Day of induction session: ___',
              acceptedAnswers: ['Thursday', 'Thurs', 'Thu'],
              explanation: {
                vi: 'Sarah muốn thứ Ba nhưng "Tuesday is completely full", nên chốt "Thursday\'s fine" → Thursday.',
                en: 'Sarah wants Tuesday, but "Tuesday is completely full", so she agrees: "Thursday\'s fine".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q09',
              number: 9,
              prompt: 'Heard about the centre from: a ___',
              acceptedAnswers: ['neighbour', 'neighbor'],
              explanation: {
                vi: 'Website và báo địa phương là bẫy. Sarah nói: "actually it was my neighbour who told me" → neighbour.',
                en: 'The website and newspaper are distractors. Sarah says: "actually it was my neighbour who told me".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q10',
              number: 10,
              prompt: 'Bring to first visit: a ___',
              acceptedAnswers: ['photograph', 'photo'],
              explanation: {
                vi: '"you\'ll need to bring a photograph for your membership card". Không cần mang hộ chiếu/ID (bẫy) vì trả bằng thẻ ngân hàng.',
                en: '"you\'ll need to bring a photograph for your membership card". ID is not needed (distractor) because she pays by bank card.',
              },
            },
          ],
        },

        /* ---- Listening Part 2: Quản lý giới thiệu thư viện cộng đồng mở cửa lại (trắc nghiệm + điền từ) ---- */
        {
          title: 'Part 2',
          instructions:
            'Questions 11–15: Choose the correct letter, A, B or C. Questions 16–20: Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript: `Manager: Good evening, everyone, and thank you for coming to this information session about the reopening of Greenfield Community Library. My name is Helen Carter, and I'm the library manager. As you know, the library has been closed for eight months, and I'd like to tell you about some of the changes we've made.
Manager: First of all, I know there have been a lot of rumours about why we closed. Many people assumed it was because of the storm last winter, but in fact the roof came through that storm with very little damage. The real reason was that the building was using far too much energy. We've installed solar panels, replaced all the windows and added insulation to the walls, so the building is now much cheaper to heat. While the builders were here, we also took the opportunity to enlarge the children's area, but that was really an extra.
Manager: Now, opening hours. On weekdays we're open from nine until seven, as before. The big change is Sundays. In the past we were closed on Sundays, and we had a lot of requests to open. At first we planned to open from ten until four, but after a survey of users we decided on twelve until five, which is when most people said they'd come in.
Manager: You may have read in the local paper that our new café is run by volunteers. Actually, that's not the case. It's run by a small local company. But we have an agreement with them that any profit the café makes goes straight back to the library and is spent on new books. So every coffee you buy helps the collection grow.
Manager: There's also good news about borrowing. Until now, members could take out eight items at a time. That has now increased to twelve. Teachers who use the library for their classes can borrow up to fifteen, but they need a special card for that.
Manager: We now have twenty laptops available for public use. I'm afraid these can't be taken out of the building, and because demand is very high, you need to reserve one online at least twenty-four hours in advance. They're available to anyone over sixteen.
Manager: Let me now give you a quick tour of the building using the plan on your handout. When you come in through the main entrance, the newspapers and magazines are straight ahead. The quiet study room used to be on the first floor, but it was too close to the meeting rooms, so we've moved it up to the second floor, where it's much more peaceful.
Manager: Our local history collection has also been reorganised. We used to have a large collection of old photographs, but those have now been moved to the town museum, where they can be stored properly. What we still have, and what many visitors love, are our old maps of the town, some going back over two hundred years.
Manager: For those of you who'd like to improve your digital skills, we're running free computer classes every Wednesday morning. You don't need to book. Just turn up at ten o'clock.
Manager: For families, children's story time is on Saturdays. It used to start at eleven, but parents told us that clashed with swimming lessons, so it now starts at ten thirty.
Manager: And finally, parking. The library itself has no car park, and please don't use the one at the railway station, as it's very expensive. Instead, there's free parking for library users in the car park behind the supermarket, just two minutes' walk away.
Manager: Right, does anyone have any questions?`,
          questions: [
            {
              kind: 'choice',
              id: 'mock1-l-q11',
              number: 11,
              prompt: 'Why was the library closed?',
              options: [
                'A. The roof was damaged in a storm.',
                'B. The building needed to use less energy.',
                'C. The children\'s area needed to be bigger.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Người nói bác bỏ lý do cơn bão ("the roof came through that storm with very little damage") và nói "The real reason was that the building was using far too much energy". Mở rộng khu trẻ em chỉ là "an extra".',
                en: 'The storm is rejected ("the roof came through that storm with very little damage"); "The real reason was that the building was using far too much energy". The children\'s area was "an extra".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q12',
              number: 12,
              prompt: 'What are the new Sunday opening hours?',
              options: ['A. 10 am – 4 pm', 'B. 12 pm – 5 pm', 'C. 9 am – 7 pm'],
              correctIndex: 1,
              explanation: {
                vi: 'Ban đầu định mở 10–4 (bẫy), nhưng sau khảo sát "we decided on twelve until five". 9–7 là giờ ngày thường.',
                en: 'They first planned 10–4 (distractor), but "we decided on twelve until five". 9–7 is the weekday timetable.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q13',
              number: 13,
              prompt: 'What does the speaker say about the new café?',
              options: [
                'A. It is run by local volunteers.',
                'B. Its profits are used to buy books.',
                'C. It is managed by library staff.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Báo nói quán do tình nguyện viên điều hành nhưng "that\'s not the case". Lợi nhuận "is spent on new books" → B.',
                en: 'The newspaper said volunteers run it, but "that\'s not the case". Any profit "is spent on new books".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q14',
              number: 14,
              prompt: 'How many items can ordinary members now borrow at one time?',
              options: ['A. 8', 'B. 12', 'C. 15'],
              correctIndex: 1,
              explanation: {
                vi: 'Trước đây là 8, "That has now increased to twelve". Con số 15 chỉ dành cho giáo viên có thẻ đặc biệt.',
                en: 'It used to be eight; "That has now increased to twelve". Fifteen is only for teachers with a special card.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q15',
              number: 15,
              prompt: 'What is true about the laptops?',
              options: [
                'A. They can be taken home for a week.',
                'B. They must be booked in advance.',
                'C. They are available to children under 12.',
              ],
              correctIndex: 1,
              explanation: {
                vi: '"you need to reserve one online at least twenty-four hours in advance". Không được mang ra ngoài, và chỉ dành cho người trên 16 tuổi.',
                en: '"you need to reserve one online at least twenty-four hours in advance". They can\'t leave the building and are for people over sixteen.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q16',
              number: 16,
              prompt: 'The quiet study room is now on the ___ floor.',
              acceptedAnswers: ['second', '2nd'],
              explanation: {
                vi: 'Trước đây ở tầng một (first floor – bẫy), giờ "we\'ve moved it up to the second floor".',
                en: 'It used to be on the first floor (distractor); now "we\'ve moved it up to the second floor".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q17',
              number: 17,
              prompt: 'The local history collection includes old ___ of the town.',
              acceptedAnswers: ['maps'],
              explanation: {
                vi: 'Ảnh cũ (photographs) đã chuyển sang bảo tàng (bẫy). Thư viện vẫn còn "our old maps of the town".',
                en: 'The old photographs moved to the museum (distractor). The library still has "our old maps of the town".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q18',
              number: 18,
              prompt: 'Free ___ classes are held every Wednesday morning.',
              acceptedAnswers: ['computer'],
              explanation: {
                vi: '"we\'re running free computer classes every Wednesday morning".',
                en: '"we\'re running free computer classes every Wednesday morning".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q19',
              number: 19,
              prompt: 'Children\'s story time on Saturdays now starts at ___.',
              acceptedAnswers: ['10.30', '10:30', '10.30 am', '10:30 am', '10.30am', '10:30am', 'ten thirty'],
              explanation: {
                vi: 'Trước bắt đầu lúc 11 giờ (bẫy), giờ "it now starts at ten thirty" → 10.30.',
                en: 'It used to start at eleven (distractor); "it now starts at ten thirty".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q20',
              number: 20,
              prompt: 'Free parking is available in the car park behind the ___.',
              acceptedAnswers: ['supermarket'],
              explanation: {
                vi: 'Không dùng bãi xe ở ga tàu (bẫy) vì đắt; "free parking ... in the car park behind the supermarket".',
                en: 'Not the station car park (distractor); "free parking ... in the car park behind the supermarket".',
              },
            },
          ],
        },

        /* ---- Listening Part 3: Hai sinh viên và giảng viên thảo luận dự án về lãng phí thức ăn (trắc nghiệm) ---- */
        {
          title: 'Part 3',
          instructions: 'Questions 21–30. Choose the correct letter, A, B or C.',
          audioScript: `Tutor: Come in, Maya, Tom. So, you wanted to talk about your project on food waste in the university canteen. How's it going?
Maya: Pretty well, I think. We've collected most of our data now.
Tutor: Good. Remind me, why did you choose this topic? I remember I gave you a list of suggestions, but this wasn't on it.
Tom: No, it came from me really. I've been working part-time in the canteen since September, and I was shocked by how much food gets thrown away at the end of every day. So I suggested it to Maya.
Maya: And when we looked, there wasn't much research on universities specifically, so it seemed worth doing.
Tutor: Good. And you used a questionnaire?
Maya: Yes. We were worried at first that it was too long, because it had twenty questions, but in fact almost everyone completed it. The real problem was that some questions weren't clear enough. For example, we asked how often students regularly left food, and people understood the word regularly in completely different ways.
Tutor: That's a common issue. You'll need to mention that as a limitation. How many responses did you get?
Tom: We handed out a hundred and fifty, and a hundred and twenty came back.
Maya: But thirty-five of those had missing answers, so we could only use eighty-five.
Tutor: Eighty-five is still reasonable for a project this size. Now, when you present the data, I'd suggest showing the results as percentages rather than raw numbers. That makes it much easier for the reader to compare groups. You don't need a chart for every question, just the important ones.
Tom: Okay, that makes sense.
Tutor: Were there any results that surprised you?
Maya: Yes. I'd assumed that students would waste more food when meals were cheaper, because they don't value them as much. But price seemed to make almost no difference at all. That really surprised me.
Tom: For me the surprise was that more food was wasted at lunch than at dinner, but Maya thought that was quite predictable, because people are in a hurry at lunchtime.
Tutor: Interesting. Now, I've read your draft literature review. The length is fine, and it's good that you've included studies from several countries. But most of your sources are from the 1990s. You really need to find more recent research. There's been a lot published in the last ten years.
Maya: Right, we'll work on that.
Tutor: What are your next steps?
Tom: I'm going to interview the canteen manager next week, to find out how they decide how much food to prepare.
Maya: And I'll go through the photos we took of the waste bins. We need to sort and analyse them.
Tutor: Good. And the presentation? Have you thought about it?
Tom: We thought about making a short video in the canteen, but we'd need permission and that could take weeks.
Maya: So we've agreed to include some of the photographs of wasted food instead. They're quite powerful.
Tutor: I agree. Images like that will stay in people's minds. Now, about deadlines. The written report was originally due on the fourteenth of May, but the department has given everyone an extra week, so it's now the twenty-first.
Tom: That's a relief.
Tutor: Overall, I think this is a promising project. The topic is relevant and you've collected useful data. My main concern is that you're trying to cover too much: waste, prices, menus, packaging. I'd like you to narrow your focus before you write the final report.
Maya: That's fair. Thank you.`,
          questions: [
            {
              kind: 'choice',
              id: 'mock1-l-q21',
              number: 21,
              prompt: 'Why did the students choose this topic?',
              options: [
                'A. It was on the tutor\'s list of suggestions.',
                'B. Tom had seen the problem at his job.',
                'C. There was a lot of published research on it.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Giảng viên nói chủ đề "wasn\'t on" danh sách gợi ý. Tom làm thêm ở căng tin và "was shocked by how much food gets thrown away". Maya nói có rất ít nghiên cứu → C sai.',
                en: 'The topic "wasn\'t on" the tutor\'s list. Tom works in the canteen and "was shocked by how much food gets thrown away". Maya says there wasn\'t much research, so C is wrong.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q22',
              number: 22,
              prompt: 'What was the main problem with the questionnaire?',
              options: [
                'A. It contained too many questions.',
                'B. Few students returned it.',
                'C. Some questions were not clear.',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Họ lo bảng hỏi quá dài nhưng "almost everyone completed it" (bẫy A). "The real problem was that some questions weren\'t clear enough" → C.',
                en: 'They worried it was too long, but "almost everyone completed it". "The real problem was that some questions weren\'t clear enough".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q23',
              number: 23,
              prompt: 'How many questionnaires could the students actually use?',
              options: ['A. 85', 'B. 120', 'C. 150'],
              correctIndex: 0,
              explanation: {
                vi: 'Phát 150, thu về 120, nhưng 35 phiếu thiếu câu trả lời nên "we could only use eighty-five" → 85.',
                en: 'They handed out 150 and got 120 back, but 35 were incomplete, so "we could only use eighty-five".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q24',
              number: 24,
              prompt: 'What does the tutor advise about presenting the data?',
              options: [
                'A. Include a chart for every question.',
                'B. Show the results as percentages.',
                'C. Compare the results with another university.',
              ],
              correctIndex: 1,
              explanation: {
                vi: '"I\'d suggest showing the results as percentages rather than raw numbers". Giảng viên nói rõ không cần biểu đồ cho mọi câu.',
                en: '"I\'d suggest showing the results as percentages rather than raw numbers". She says a chart for every question is not needed.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q25',
              number: 25,
              prompt: 'Which finding surprised Maya most?',
              options: [
                'A. More food was wasted at lunch than at dinner.',
                'B. Vegetarian meals were wasted most often.',
                'C. The price of meals had little effect on waste.',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Maya: "price seemed to make almost no difference at all. That really surprised me." Chuyện bữa trưa là điều làm Tom ngạc nhiên, còn Maya thấy "quite predictable".',
                en: 'Maya: "price seemed to make almost no difference at all. That really surprised me." The lunch finding surprised Tom; Maya found it "quite predictable".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q26',
              number: 26,
              prompt: 'What does the tutor say about the literature review?',
              options: [
                'A. It is too long.',
                'B. It needs more recent sources.',
                'C. It should focus on one country.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Độ dài ổn ("The length is fine") và việc dùng nghiên cứu nhiều nước được khen. Vấn đề: "most of your sources are from the 1990s. You really need to find more recent research."',
                en: '"The length is fine" and using several countries is praised. The problem: "most of your sources are from the 1990s. You really need to find more recent research."',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q27',
              number: 27,
              prompt: 'What will Tom do next?',
              options: [
                'A. interview the canteen manager',
                'B. analyse the photographs',
                'C. rewrite the questionnaire',
              ],
              correctIndex: 0,
              explanation: {
                vi: 'Tom: "I\'m going to interview the canteen manager next week". Việc phân tích ảnh là của Maya (bẫy B).',
                en: 'Tom: "I\'m going to interview the canteen manager next week". Analysing the photos is Maya\'s job.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q28',
              number: 28,
              prompt: 'What have the students decided to include in their presentation?',
              options: [
                'A. a short video of the canteen',
                'B. photographs of wasted food',
                'C. an interview with the manager',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Làm video cần xin phép mất nhiều tuần, nên "we\'ve agreed to include some of the photographs of wasted food instead".',
                en: 'A video would need permission and take weeks, so "we\'ve agreed to include some of the photographs of wasted food instead".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q29',
              number: 29,
              prompt: 'When is the written report now due?',
              options: ['A. 14 May', 'B. 21 May', 'C. 28 May'],
              correctIndex: 1,
              explanation: {
                vi: 'Hạn ban đầu là 14/5 (bẫy) nhưng được gia hạn thêm một tuần: "so it\'s now the twenty-first" → 21/5.',
                en: 'It was originally 14 May (distractor), but with an extra week "it\'s now the twenty-first".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-l-q30',
              number: 30,
              prompt: 'What is the tutor\'s overall opinion of the project?',
              options: [
                'A. It is well planned and almost finished.',
                'B. It is promising but needs a narrower focus.',
                'C. It has an interesting topic but weak data.',
              ],
              correctIndex: 1,
              explanation: {
                vi: '"I think this is a promising project" ... "you\'re trying to cover too much ... I\'d like you to narrow your focus". Bà khen dữ liệu hữu ích nên C sai.',
                en: '"I think this is a promising project" ... "you\'re trying to cover too much ... narrow your focus". She says the data is useful, so C is wrong.',
              },
            },
          ],
        },

        /* ---- Listening Part 4: Bài giảng về hiệu ứng "đảo nhiệt đô thị" (điền ghi chú) ---- */
        {
          title: 'Part 4',
          instructions:
            'Questions 31–40. Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript: `Lecturer: Good morning. Today I'm going to talk about a phenomenon that affects millions of people living in cities around the world: the urban heat island effect.
Lecturer: Put simply, an urban heat island is a city area that is significantly warmer than the countryside around it. You may hear claims that the difference can be ten degrees or more, but most reliable measurements show a maximum of about seven degrees Celsius, usually at night.
Lecturer: So what causes it? The main factor is the materials cities are built from. Dark surfaces, especially the asphalt used on roads and car parks, absorb large amounts of heat from the sun during the day. Concrete and brick do the same. Then, at night, these materials slowly release that heat, which keeps the air warm.
Lecturer: A second factor is heat produced directly by human activity. Vehicles, air-conditioning units and factories all release heat into the air. In very dense cities, this can add a significant amount of warmth, particularly in winter.
Lecturer: Let's turn to the effects. One obvious consequence is that people use more electricity in summer, mainly for air conditioning. Ironically, this creates even more waste heat, which makes the problem worse.
Lecturer: There are also serious effects on health. During heatwaves, hospital admissions rise sharply. Older people are particularly vulnerable, not so much to sunburn, but to heatstroke, which can be fatal if it isn't treated quickly.
Lecturer: So what can be done? Researchers have tested a number of solutions. One of the most promising is the green roof, that is, a roof covered with plants. Green roofs can reduce the surface temperature of a building dramatically, and they also help to manage rainwater.
Lecturer: A cheaper option is simply to paint roofs and pavements white or another light colour. Light surfaces can reflect up to eighty per cent of sunlight, compared with just five to ten per cent for dark asphalt.
Lecturer: Trees, of course, are extremely effective. They provide shade, but they also cool the air through a process called evaporation. Water from the leaves turns into vapour, and this takes heat from the surrounding air.
Lecturer: Parks have a similar cooling effect. In one study of a large Asian city, researchers found that a single park cooled the streets around it for a distance of up to five hundred metres. Some earlier studies had suggested a figure of only two hundred metres, so this was encouraging.
Lecturer: However, there are challenges. Many city councils are interested in these ideas, but the biggest obstacle is not the initial installation. It's the cost of maintenance over many years. Trees need watering, green roofs need care, and white paint gets dirty and loses its effect.
Lecturer: In the next lecture, we'll look at some cities that have managed to overcome these problems.`,
          questions: [
            {
              kind: 'gap-fill',
              id: 'mock1-l-q31',
              number: 31,
              prompt: 'Cities can be up to ___ degrees Celsius warmer than the surrounding countryside.',
              acceptedAnswers: ['7', 'seven'],
              explanation: {
                vi: 'Có người nói 10 độ trở lên (bẫy), nhưng "most reliable measurements show a maximum of about seven degrees Celsius".',
                en: 'Some claim ten degrees or more (distractor), but "most reliable measurements show a maximum of about seven degrees Celsius".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q32',
              number: 32,
              prompt: 'Dark surfaces, especially ___, absorb heat during the day.',
              acceptedAnswers: ['asphalt'],
              explanation: {
                vi: '"Dark surfaces, especially the asphalt used on roads and car parks, absorb large amounts of heat".',
                en: '"Dark surfaces, especially the asphalt used on roads and car parks, absorb large amounts of heat".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q33',
              number: 33,
              prompt: 'Heat is also released by vehicles, air-conditioning units and ___.',
              acceptedAnswers: ['factories'],
              explanation: {
                vi: '"Vehicles, air-conditioning units and factories all release heat into the air."',
                en: '"Vehicles, air-conditioning units and factories all release heat into the air."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q34',
              number: 34,
              prompt: 'People use more ___ in summer, mainly for air conditioning.',
              acceptedAnswers: ['electricity'],
              explanation: {
                vi: '"people use more electricity in summer, mainly for air conditioning".',
                en: '"people use more electricity in summer, mainly for air conditioning".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q35',
              number: 35,
              prompt: 'Older people are particularly at risk of ___ during heatwaves.',
              acceptedAnswers: ['heatstroke', 'heat stroke', 'heat-stroke'],
              explanation: {
                vi: '"not so much to sunburn, but to heatstroke" – sunburn là bẫy, đáp án là heatstroke (sốc nhiệt).',
                en: '"not so much to sunburn, but to heatstroke" – sunburn is the distractor.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q36',
              number: 36,
              prompt: 'Green ___ can greatly reduce the surface temperature of a building.',
              acceptedAnswers: ['roofs'],
              explanation: {
                vi: '"Green roofs can reduce the surface temperature of a building dramatically".',
                en: '"Green roofs can reduce the surface temperature of a building dramatically".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q37',
              number: 37,
              prompt: 'Light-coloured surfaces can reflect up to ___ per cent of sunlight.',
              acceptedAnswers: ['80', 'eighty'],
              explanation: {
                vi: '"Light surfaces can reflect up to eighty per cent of sunlight" – 5 đến 10% là của nhựa đường tối màu (bẫy).',
                en: '"Light surfaces can reflect up to eighty per cent of sunlight" – five to ten per cent refers to dark asphalt.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q38',
              number: 38,
              prompt: 'Trees provide shade and cool the air through ___.',
              acceptedAnswers: ['evaporation'],
              explanation: {
                vi: '"they also cool the air through a process called evaporation" (sự bay hơi).',
                en: '"they also cool the air through a process called evaporation".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q39',
              number: 39,
              prompt: 'In one study, a single park cooled streets up to ___ metres away.',
              acceptedAnswers: ['500', 'five hundred'],
              explanation: {
                vi: '"cooled the streets around it for a distance of up to five hundred metres". 200 mét là con số của các nghiên cứu trước (bẫy).',
                en: '"for a distance of up to five hundred metres". Two hundred metres was from earlier studies (distractor).',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-l-q40',
              number: 40,
              prompt: 'The biggest obstacle for city councils is the cost of ___.',
              acceptedAnswers: ['maintenance'],
              explanation: {
                vi: '"the biggest obstacle is not the initial installation. It\'s the cost of maintenance over many years."',
                en: '"the biggest obstacle is not the initial installation. It\'s the cost of maintenance over many years."',
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
        /* ---- Passage 1: Lịch sử cây bút chì – TFNG, trắc nghiệm, hoàn thành tóm tắt ---- */
        {
          title: 'Passage 1',
          instructions:
            'Questions 1–13. Questions 1–5: Do the statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN. Questions 6–9: Choose the correct letter, A, B, C or D. Questions 10–13: Complete the summary. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.',
          passage: {
            title: 'The Remarkable History of the Pencil',
            text: `Few everyday objects are as familiar, or as overlooked, as the pencil. It is cheap, light and reliable, and it works in conditions where a pen would fail, from freezing mountain tops to the pages of a damp notebook. Yet the story of how this simple tool came into being involves shepherds, smugglers, wars and a surprising amount of chemistry. It also begins with a misunderstanding that survives in our language today: although we still speak of pencil 'lead', the core of a pencil has never contained any lead at all. It is made of graphite, a form of carbon, usually mixed with clay.

The story starts in the sixteenth century in Borrowdale, a valley in the north-west of England. According to local tradition, a violent storm uprooted some trees and exposed a deposit of a strange black material beneath them. Local shepherds soon discovered that it left a dark mark that was ideal for marking their sheep, so that each farmer could identify his own animals. Because the substance looked similar to lead ore and left a similar grey mark, people called it 'black lead' or 'plumbago', and the confusion has lasted ever since.

The Borrowdale deposit was unusual. Graphite found elsewhere in the world was usually powdery and full of impurities, but the Borrowdale material was so pure and solid that it could simply be sawn into thin sticks and used directly. Users soon found, however, that graphite is soft and dirties the hands, so the sticks were wrapped in string or sheepskin. As demand grew among artists, merchants and craftsmen across Europe, the graphite became extremely valuable. Guards were placed at the mine entrance, and in 1752 the British Parliament passed a law making the theft of graphite a serious crime, punishable by imprisonment or transportation to a distant colony. Even so, smuggling remained common.

The wooden case that we recognise today seems to have been an Italian invention. Around 1560, an Italian couple is said to have produced a carpentry pencil by hollowing out a stick of juniper wood and inserting a piece of graphite. Later, manufacturers developed a more efficient technique: two half-cylinders of wood were each cut with a groove, the graphite stick was laid inside, and the two halves were glued together. Remarkably, this is still essentially how pencils are made.

For two centuries, England's near monopoly on high-quality graphite gave it control of the pencil market. This became a problem for France at the end of the eighteenth century, when war with Britain cut off its supply. In 1795, the French government turned to Nicolas-Jacques Conté, a scientist and army officer, and asked him to find a solution. Conté discovered that powdered graphite of poorer quality could be mixed with clay, shaped into rods and heated in a kiln. The result was a strong, smooth writing core. More importantly, by changing the proportion of clay to graphite, he could control how hard or soft the core was. More clay produced a harder, lighter line; more graphite produced a softer, darker one.

Conté's method is the basis of the grading system still used today. In most countries, pencils are marked with H for 'hard' and B for 'black'. A 4H pencil gives a very fine, pale line suitable for technical drawing, while a 6B is soft and dark, and is popular with artists. The familiar HB sits in the middle. In the United States, a numbering system is more common, and the standard 'No. 2' pencil used in schools is roughly equivalent to an HB.

The colour of the pencil also has a story. In the 1890s, the Austro-Hungarian company Koh-i-Noor launched a high-quality pencil painted bright yellow. At that time, some of the finest graphite came from China, and in China yellow was traditionally associated with royalty and respect. The colour was therefore intended to suggest luxury and quality. The design was so successful that competitors, especially in America, began painting their own pencils yellow, and today an estimated three-quarters of pencils sold in the United States are this colour.

Another feature that varies from country to country is the eraser. In 1858, an American named Hymen Lipman received a patent for attaching a small rubber eraser to the end of a pencil. The idea became standard in North America, but in much of Europe pencils are still commonly sold without one, as many users prefer a separate eraser.

Despite the arrival of computers, tablets and digital pens, the pencil has not disappeared. Billions are still made every year. It is often claimed that a single pencil can draw a line around 56 kilometres long, or write about 45,000 words. Whether or not these figures are exact, the pencil remains one of the most efficient and dependable tools ever invented, a reminder that good design does not always need to be complicated.`,
          },
          questions: [
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q01',
              number: 1,
              prompt: 'Pencil cores originally contained a small amount of lead.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn 1: "the core of a pencil has never contained any lead at all" – ruột bút chì chưa bao giờ chứa chì → mâu thuẫn với câu hỏi.',
                en: 'Paragraph 1: "the core of a pencil has never contained any lead at all", which contradicts the statement.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q02',
              number: 2,
              prompt: 'Shepherds were among the first people to make use of the Borrowdale graphite.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn 2: sau khi cơn bão làm lộ mỏ graphite, "Local shepherds soon discovered that it ... was ideal for marking their sheep".',
                en: 'Paragraph 2: after the deposit was exposed, "Local shepherds soon discovered that it ... was ideal for marking their sheep".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q03',
              number: 3,
              prompt: 'Graphite from Borrowdale had to be mixed with other materials before it could be used.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn 3: graphite Borrowdale "so pure and solid that it could simply be sawn into thin sticks and used directly" – dùng trực tiếp, không cần trộn.',
                en: 'Paragraph 3: it was "so pure and solid that it could simply be sawn into thin sticks and used directly".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q04',
              number: 4,
              prompt: 'The Italian wooden pencil quickly became more popular than graphite wrapped in string.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Đoạn 4 chỉ mô tả phát minh vỏ gỗ của người Ý, không so sánh mức độ phổ biến với cách quấn dây → không có thông tin.',
                en: 'Paragraph 4 describes the Italian wooden case but never compares its popularity with the string method.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q05',
              number: 5,
              prompt: 'Conté was asked by the French government to solve a supply problem.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn 5: chiến tranh cắt nguồn cung graphite; "the French government turned to Nicolas-Jacques Conté ... and asked him to find a solution".',
                en: 'Paragraph 5: war cut off supply, and "the French government turned to Nicolas-Jacques Conté ... and asked him to find a solution".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q06',
              number: 6,
              prompt: 'According to the passage, an HB pencil',
              options: [
                'A. produces the hardest and palest line.',
                'B. is roughly the same as an American No. 2 pencil.',
                'C. was first produced in the United States.',
                'D. is the most popular pencil among artists.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn 6: "the standard \'No. 2\' pencil ... is roughly equivalent to an HB". Nét cứng nhạt nhất là 4H; họa sĩ thích 6B.',
                en: 'Paragraph 6: "the standard \'No. 2\' pencil ... is roughly equivalent to an HB". 4H is hard and pale; artists like 6B.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q07',
              number: 7,
              prompt: 'Why did Koh-i-Noor paint its pencils yellow?',
              options: [
                'A. to make them easier to find on a desk',
                'B. because yellow paint was cheaper',
                'C. to suggest that they were of high quality',
                'D. because customers in America requested it',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Đoạn 7: màu vàng gắn với hoàng gia ở Trung Quốc; "The colour was therefore intended to suggest luxury and quality".',
                en: 'Paragraph 7: yellow was linked with royalty in China; "The colour was therefore intended to suggest luxury and quality".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q08',
              number: 8,
              prompt: 'What does the writer say about erasers on pencils?',
              options: [
                'A. They were first attached to pencils in Europe.',
                'B. Conté was the first person to add them.',
                'C. Many European pencils are still sold without them.',
                'D. They were patented in the eighteenth century.',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Đoạn 8: "in much of Europe pencils are still commonly sold without one". Bằng sáng chế là của người Mỹ năm 1858 (thế kỷ 19).',
                en: 'Paragraph 8: "in much of Europe pencils are still commonly sold without one". The patent was American, from 1858.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q09',
              number: 9,
              prompt: 'What is the main purpose of the final paragraph?',
              options: [
                'A. to argue that digital tools will soon replace the pencil',
                'B. to show that the pencil is still a useful and well-designed tool',
                'C. to prove that a pencil can write exactly 45,000 words',
                'D. to compare pencils with digital pens',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn cuối: "the pencil has not disappeared" và "remains one of the most efficient and dependable tools ever invented". Tác giả nói các con số "whether or not ... exact" nên C sai.',
                en: 'The last paragraph says "the pencil has not disappeared" and "remains one of the most efficient and dependable tools". The figures may not be exact, so C is wrong.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q10',
              number: 10,
              prompt: 'To keep their hands clean, early users wrapped graphite sticks in string or ___.',
              acceptedAnswers: ['sheepskin'],
              explanation: {
                vi: 'Đoạn 3: "graphite is soft and dirties the hands, so the sticks were wrapped in string or sheepskin".',
                en: 'Paragraph 3: "graphite is soft and dirties the hands, so the sticks were wrapped in string or sheepskin".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q11',
              number: 11,
              prompt: 'An Italian couple put a piece of graphite inside a hollowed stick of ___.',
              acceptedAnswers: ['juniper wood', 'juniper'],
              explanation: {
                vi: 'Đoạn 4: "by hollowing out a stick of juniper wood and inserting a piece of graphite".',
                en: 'Paragraph 4: "by hollowing out a stick of juniper wood and inserting a piece of graphite".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q12',
              number: 12,
              prompt: 'Conté mixed powdered graphite with ___ and heated it in a kiln.',
              acceptedAnswers: ['clay'],
              explanation: {
                vi: 'Đoạn 5: "powdered graphite of poorer quality could be mixed with clay, shaped into rods and heated in a kiln".',
                en: 'Paragraph 5: "powdered graphite ... could be mixed with clay, shaped into rods and heated in a kiln".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q13',
              number: 13,
              prompt: 'A single pencil is said to be able to draw a line of around ___.',
              acceptedAnswers: ['56 kilometres', '56 kilometers', '56 km', '56km'],
              explanation: {
                vi: 'Đoạn cuối: "a single pencil can draw a line around 56 kilometres long".',
                en: 'Final paragraph: "a single pencil can draw a line around 56 kilometres long".',
              },
            },
          ],
        },

        /* ---- Passage 2: Phục hồi rạn san hô – nối thông tin với đoạn, trắc nghiệm, hoàn thành câu ---- */
        {
          title: 'Passage 2',
          instructions:
            'Questions 14–26. Questions 14–18: The passage has seven paragraphs, A–G. Which paragraph contains the following information? Questions 19–22: Choose the correct letter, A, B, C or D. Questions 23–26: Complete the sentences. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.',
          passage: {
            title: 'Gardening the Reef',
            text: `A  Coral reefs cover less than one per cent of the ocean floor, yet they support roughly a quarter of all known marine species. They protect coastlines from storms, provide food for hundreds of millions of people and attract tourists worth billions of dollars every year. A reef is built by tiny animals called coral polyps, which live in partnership with microscopic algae. The algae live inside the coral's tissue, where they produce food through photosynthesis and give the coral its bright colour. In return, the coral provides shelter. When the water becomes too warm, however, this partnership breaks down. Stressed corals expel their algae and turn white, a process known as bleaching. If temperatures return to normal quickly, the coral may recover, but prolonged heat often kills it.

B  Bleaching is not new, but its frequency has changed dramatically. Before the 1980s, severe bleaching events affecting whole regions were rare; scientists estimate that a particular reef might experience one only every twenty-five to thirty years, which gave it time to recover. Today, in many parts of the tropics, the average gap between severe events has fallen to around six years. As a result, many reefs no longer have enough time to recover between events, and the total area covered by living coral has declined sharply in several regions.

C  In response, scientists and conservation groups have developed a range of techniques to help reefs recover. The most widely used is known as coral gardening. Divers collect small fragments from healthy coral colonies and grow them in underwater nurseries. A typical nursery consists of tree-like frames, often made from PVC pipe, which are anchored to the seabed and float in the water column. The fragments hang from the branches, where they receive plenty of light and water movement and are kept away from sediment and predators on the seabed. After six to twelve months, the fragments are large enough to be transplanted onto damaged reefs, where divers attach them to rock with cement or cable ties.

D  One of the most important advances in the field came about by accident. A researcher in Florida working with slow-growing brain corals accidentally broke a specimen into several tiny pieces. Instead of dying, the fragments not only survived but grew far faster than expected. Further experiments showed that when corals are cut into very small pieces of just one or two centimetres, they grow rapidly in an attempt to repair the damage. In some species, growth rates were up to twenty-five times faster than normal. This technique, called microfragmentation, means that corals which would naturally take decades to reach a useful size can now be produced in a year or two.

E  Despite such successes, restoration has many critics. The most common objection concerns scale. Most projects restore an area of a few hectares at most, while the world's reefs cover hundreds of thousands of square kilometres. Restoration is also expensive: estimates of the cost per hectare vary from tens of thousands of dollars to more than a million, depending on the location and method. A further concern is genetic. Because fragments are cut from a small number of parent colonies, many restored reefs consist largely of clones, that is, genetically identical corals. If a disease or heatwave strikes, all of them may be equally vulnerable.

F  To address these problems, some researchers are turning to different methods. One approach, sometimes called assisted evolution, involves identifying corals that survived recent heatwaves and breeding them so that their offspring may be more heat-tolerant. Another focuses on coral reproduction. Many corals reproduce during a few nights each year in an event known as mass spawning, when they release huge numbers of eggs and sperm into the water. Scientists collect this spawn, raise the resulting larvae in tanks or floating enclosures, and then release them onto damaged reefs. Because the larvae come from many different parents, this method helps to preserve genetic diversity, and it has the potential to cover far larger areas than transplanting fragments by hand.

G  Restoration projects can also bring social and economic benefits. In several countries, tourists pay to join volunteer diving programmes that help maintain nurseries, and former fishers have been employed and trained as restoration workers, giving them a new source of income. Nevertheless, almost all scientists in the field agree on one point: restoration alone cannot save the world's reefs. Unless greenhouse gas emissions are reduced and ocean warming is slowed, even the most successful projects will eventually be overwhelmed. As one researcher put it, restoration is a way of buying time, not a cure.`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'mock1-r-q14',
              number: 14,
              prompt: 'Which paragraph contains: a description of an unexpected discovery',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 3,
              explanation: {
                vi: 'Đoạn D: "came about by accident ... accidentally broke a specimen" – phát hiện tình cờ về kỹ thuật microfragmentation.',
                en: 'Paragraph D: "came about by accident ... accidentally broke a specimen" – the accidental discovery of microfragmentation.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q15',
              number: 15,
              prompt: 'Which paragraph contains: a comparison between how often an event happened in the past and how often it happens now',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn B: trước thập niên 1980 "every twenty-five to thirty years", ngày nay "around six years" – so sánh tần suất tẩy trắng san hô.',
                en: 'Paragraph B: before the 1980s "every twenty-five to thirty years"; today "around six years".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q16',
              number: 16,
              prompt: 'Which paragraph contains: a reference to the financial cost of restoration',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 4,
              explanation: {
                vi: 'Đoạn E: "Restoration is also expensive: estimates of the cost per hectare vary from tens of thousands of dollars to more than a million".',
                en: 'Paragraph E: "Restoration is also expensive: estimates of the cost per hectare vary from tens of thousands of dollars to more than a million".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q17',
              number: 17,
              prompt: 'Which paragraph contains: an explanation of why corals lose their colour',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 0,
              explanation: {
                vi: 'Đoạn A: tảo tạo màu cho san hô; khi nước quá nóng "Stressed corals expel their algae and turn white".',
                en: 'Paragraph A: algae give corals colour; when water is too warm "Stressed corals expel their algae and turn white".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q18',
              number: 18,
              prompt: 'Which paragraph contains: examples of how local people can benefit from restoration',
              options: PARAGRAPHS_A_TO_G,
              correctIndex: 6,
              explanation: {
                vi: 'Đoạn G: ngư dân cũ được tuyển dụng làm nhân viên phục hồi, "giving them a new source of income".',
                en: 'Paragraph G: former fishers are employed as restoration workers, "giving them a new source of income".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q19',
              number: 19,
              prompt: 'In coral nurseries, fragments are usually grown',
              options: [
                'A. directly on the seabed.',
                'B. on frames that float in the water.',
                'C. in tanks in a laboratory.',
                'D. on natural rock near the shore.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn C: khung hình cây "anchored to the seabed and float in the water column", giúp mảnh san hô tránh xa trầm tích ở đáy biển.',
                en: 'Paragraph C: tree-like frames are "anchored to the seabed and float in the water column", keeping fragments away from the seabed.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q20',
              number: 20,
              prompt: 'Why are some critics worried about reefs restored from fragments?',
              options: [
                'A. The corals grow too slowly to be useful.',
                'B. The corals may harm local fish populations.',
                'C. The fragments are difficult to transport.',
                'D. The corals lack genetic variety.',
              ],
              correctIndex: 3,
              explanation: {
                vi: 'Đoạn E: nhiều rạn phục hồi gồm toàn "clones ... genetically identical corals", nên dễ bị tổn thương như nhau khi có dịch bệnh.',
                en: 'Paragraph E: many restored reefs are "clones ... genetically identical corals", so all may be equally vulnerable.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q21',
              number: 21,
              prompt: 'What is one advantage of releasing coral larvae onto reefs?',
              options: [
                'A. It helps to keep genetic diversity.',
                'B. It can be done at any time of year.',
                'C. It does not require any equipment.',
                'D. It produces corals that grow faster.',
              ],
              correctIndex: 0,
              explanation: {
                vi: 'Đoạn F: "Because the larvae come from many different parents, this method helps to preserve genetic diversity". Sinh sản chỉ diễn ra vài đêm mỗi năm nên B sai.',
                en: 'Paragraph F: "this method helps to preserve genetic diversity". Spawning happens only a few nights a year, so B is wrong.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q22',
              number: 22,
              prompt: 'What is the writer\'s main conclusion about reef restoration?',
              options: [
                'A. It is a complete solution to the coral crisis.',
                'B. It is mainly useful for attracting tourists.',
                'C. It can delay damage but cannot replace cutting emissions.',
                'D. It is too expensive to be worth continuing.',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Đoạn G: "restoration alone cannot save the world\'s reefs" nếu không giảm khí thải; nó là "a way of buying time, not a cure".',
                en: 'Paragraph G: "restoration alone cannot save the world\'s reefs" without cutting emissions; it is "a way of buying time, not a cure".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q23',
              number: 23,
              prompt: 'The algae living in coral produce food and give the coral its ___.',
              acceptedAnswers: ['bright colour', 'bright color', 'colour', 'color'],
              explanation: {
                vi: 'Đoạn A: tảo "produce food through photosynthesis and give the coral its bright colour".',
                en: 'Paragraph A: the algae "produce food through photosynthesis and give the coral its bright colour".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q24',
              number: 24,
              prompt: 'The frames used in coral nurseries are often made from ___.',
              acceptedAnswers: ['PVC pipe', 'PVC pipes', 'PVC'],
              explanation: {
                vi: 'Đoạn C: "tree-like frames, often made from PVC pipe".',
                en: 'Paragraph C: "tree-like frames, often made from PVC pipe".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q25',
              number: 25,
              prompt: 'With microfragmentation, some species grow up to ___ times faster than normal.',
              acceptedAnswers: ['25', 'twenty-five', 'twenty five'],
              explanation: {
                vi: 'Đoạn D: "In some species, growth rates were up to twenty-five times faster than normal".',
                en: 'Paragraph D: "growth rates were up to twenty-five times faster than normal".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q26',
              number: 26,
              prompt: 'Scientists collect eggs and sperm released during an event called ___.',
              acceptedAnswers: ['mass spawning'],
              explanation: {
                vi: 'Đoạn F: "an event known as mass spawning, when they release huge numbers of eggs and sperm".',
                en: 'Paragraph F: "an event known as mass spawning, when they release huge numbers of eggs and sperm".',
              },
            },
          ],
        },

        /* ---- Passage 3: Mệt mỏi khi ra quyết định – nối tiêu đề, TFNG, trắc nghiệm, hoàn thành câu (khó nhất) ---- */
        {
          title: 'Passage 3',
          instructions:
            'Questions 27–40. Questions 27–31: Choose the correct heading for paragraphs A–E from the list of headings (i–viii). Questions 32–36: Choose TRUE, FALSE or NOT GIVEN. Questions 37–38: Choose the correct letter, A, B, C or D. Questions 39–40: Complete the sentences. Write ONE WORD ONLY from the passage for each answer.',
          passage: {
            title: 'Running on Empty? The Science of Decision Fatigue',
            text: `A  Every day, each of us makes a remarkable number of decisions. Some are significant, such as whether to accept a job offer, but the vast majority are small: what to wear, what to eat for breakfast, which email to answer first, whether to take the stairs or the lift. Because these choices seem trivial, we rarely think of them as requiring effort. Yet a growing body of research has suggested that decisions, even minor ones, may come at a cost, and that the quality of our choices may decline as the day goes on. This idea, popularly known as 'decision fatigue', has become one of the most widely discussed concepts in modern psychology.

B  The theory has its roots in the work of the social psychologist Roy Baumeister and his colleagues in the late 1990s. In one well-known experiment, hungry participants were placed in a room with a plate of freshly baked chocolate cookies and a bowl of radishes. Some were allowed to eat the cookies; others were told to eat only the radishes. Afterwards, all participants were given an impossible puzzle to solve. Those who had resisted the cookies gave up much sooner than those who had not. Baumeister proposed that self-control draws on a limited supply of mental energy, which he compared to a muscle that becomes tired with use. He called this state 'ego depletion' and later argued that making decisions draws on the same limited resource.

C  The idea gained enormous public attention after a 2011 study of judges in Israel who were deciding whether prisoners should be released on parole. The researchers found that at the start of each session, the judges granted parole in about 65 per cent of cases. As the session went on, this figure fell steadily, almost to zero, before jumping back up to around 65 per cent after the judges took a food break. The implication was disturbing: a prisoner's chance of freedom seemed to depend not only on the facts of the case but also on whether the judge was tired or hungry. The study was widely reported and is still often quoted in books on productivity and management.

D  In recent years, however, the theory has come under serious attack. Psychology has been going through what is known as a 'replication crisis', in which many famous findings have failed to appear when experiments are repeated. In 2016, a large project involving more than 2,000 participants in 23 laboratories attempted to reproduce the ego depletion effect using a standard procedure. The effect they found was so small that it was close to zero. The parole study has also been questioned. Critics pointed out that the order in which cases were heard was not random: prisoners without a lawyer tended to be scheduled at the end of each session, and such cases were less likely to succeed regardless of the judges' state of mind. Baumeister's original explanation, that self-control uses up glucose in the brain, has been challenged too. Measurements suggest that the brain's total consumption of glucose changes very little during difficult mental tasks, and the amount involved is far too small to explain why people give up.

E  Interestingly, some of the most revealing research suggests that what people believe about willpower may matter more than willpower itself. In a series of studies, psychologists at Stanford University first asked participants whether they agreed with statements such as 'After a strenuous mental activity, your energy is depleted'. They found that only participants who believed willpower was a limited resource showed signs of depletion after a demanding task. Those who believed that mental effort could be energising performed just as well on the second task as on the first. In other words, people's expectations may partly create the tiredness that they experience. This does not mean that mental fatigue is imaginary, but it does suggest that it is more complicated than a simple fuel tank running dry.

F  So where does this leave the ordinary person trying to make good decisions? Even if the scientific explanation remains uncertain, many experts believe that some practical advice is still sensible. The first is to reduce the number of unimportant decisions. Several well-known business leaders have explained that they wear the same outfit every day so that they do not waste time and attention on choosing clothes. A second strategy is to plan important decisions carefully: rather than leaving a major choice until the end of a long day, it may be wise to schedule it for the morning or immediately after a break. Finally, creating routines and simple rules, such as always going to the gym on the same days, can turn repeated choices into habits that require little thought. Whether or not decision fatigue is as powerful as once believed, these habits appear to help people focus their energy on the choices that really matter.`,
          },
          questions: [
            {
              kind: 'choice',
              id: 'mock1-r-q27',
              number: 27,
              prompt: 'Choose the correct heading for Paragraph A.',
              options: HEADINGS_P3,
              correctIndex: 3,
              explanation: {
                vi: 'Đoạn A nói những lựa chọn nhỏ hằng ngày tưởng như không tốn sức nhưng "may come at a cost" → iv. The hidden cost of everyday choices.',
                en: 'Paragraph A says small daily choices seem effortless but "may come at a cost" → iv.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q28',
              number: 28,
              prompt: 'Choose the correct heading for Paragraph B.',
              options: HEADINGS_P3,
              correctIndex: 7,
              explanation: {
                vi: 'Đoạn B giải thích lý thuyết của Baumeister: tự chủ dựa vào "a limited supply of mental energy" → viii. A limited resource: the theory explained.',
                en: 'Paragraph B explains Baumeister\'s theory that self-control uses "a limited supply of mental energy" → viii.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q29',
              number: 29,
              prompt: 'Choose the correct heading for Paragraph C.',
              options: HEADINGS_P3,
              correctIndex: 0,
              explanation: {
                vi: 'Đoạn C kể nghiên cứu nổi tiếng về thẩm phán, với hàm ý "disturbing" (đáng lo ngại) → i. A famous study and its unsettling implications.',
                en: 'Paragraph C describes the famous parole study whose "implication was disturbing" → i.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q30',
              number: 30,
              prompt: 'Choose the correct heading for Paragraph D.',
              options: HEADINGS_P3,
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn D: "the theory has come under serious attack" – thí nghiệm lặp lại thất bại, nghiên cứu thẩm phán và giải thích glucose bị chất vấn → ii. Lưu ý: tiêu đề v (glucose) là bẫy vì đoạn này phản bác chứ không giải thích cơ chế cung cấp năng lượng.',
                en: 'Paragraph D: "the theory has come under serious attack" → ii. Heading v (glucose) is a trap: the paragraph challenges, not explains, the energy mechanism.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q31',
              number: 31,
              prompt: 'Choose the correct heading for Paragraph E.',
              options: HEADINGS_P3,
              correctIndex: 5,
              explanation: {
                vi: 'Đoạn E: "what people believe about willpower may matter more than willpower itself" – niềm tin làm thay đổi kết quả → vi.',
                en: 'Paragraph E: "what people believe about willpower may matter more than willpower itself" → vi.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q32',
              number: 32,
              prompt: 'In one of Baumeister\'s experiments, some participants had to resist tempting food.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn B: một số người chỉ được ăn củ cải, không được ăn bánh quy – "Those who had resisted the cookies...".',
                en: 'Paragraph B: some participants could only eat radishes – "Those who had resisted the cookies...".',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q33',
              number: 33,
              prompt: 'In the parole study, judges were more likely to grant parole towards the end of a session.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn C: đầu phiên khoảng 65%, rồi "fell steadily, almost to zero" về cuối phiên – ngược với câu hỏi.',
                en: 'Paragraph C: about 65% at the start, then it "fell steadily, almost to zero" – the opposite of the statement.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q34',
              number: 34,
              prompt: 'The judges in the parole study knew that their decisions were changing during each session.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài không hề nói thẩm phán có nhận thức được sự thay đổi trong quyết định của mình hay không.',
                en: 'The passage never says whether the judges were aware of the change in their decisions.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q35',
              number: 35,
              prompt: 'The 2016 project involving 23 laboratories confirmed Baumeister\'s original findings.',
              answer: 'FALSE',
              explanation: {
                vi: 'Đoạn D: hiệu ứng tìm được "so small that it was close to zero" – tức là không xác nhận kết quả gốc.',
                en: 'Paragraph D: the effect was "so small that it was close to zero", so it did not confirm the original findings.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'mock1-r-q36',
              number: 36,
              prompt: 'In the Stanford studies, people who did not see willpower as limited were less affected by a demanding task.',
              answer: 'TRUE',
              explanation: {
                vi: 'Đoạn E: chỉ người tin ý chí có giới hạn mới bị suy giảm; người tin nỗ lực trí óc giúp nạp năng lượng "performed just as well on the second task".',
                en: 'Paragraph E: only those who believed willpower was limited showed depletion; the others "performed just as well on the second task".',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q37',
              number: 37,
              prompt: 'According to critics, the results of the parole study could be explained by',
              options: [
                'A. the personal opinions of the judges.',
                'B. the small number of judges involved.',
                'C. the order in which cases were heard.',
                'D. the type of crimes the prisoners had committed.',
              ],
              correctIndex: 2,
              explanation: {
                vi: 'Đoạn D: "the order in which cases were heard was not random" – tù nhân không có luật sư thường bị xếp cuối phiên.',
                en: 'Paragraph D: "the order in which cases were heard was not random" – prisoners without lawyers came at the end.',
              },
            },
            {
              kind: 'choice',
              id: 'mock1-r-q38',
              number: 38,
              prompt: 'Why does the writer doubt the glucose explanation?',
              options: [
                'A. Sugary drinks have been shown to reduce performance.',
                'B. The brain uses almost the same amount of glucose during hard thinking.',
                'C. Baumeister later rejected the idea himself.',
                'D. Glucose cannot be measured in the brain.',
              ],
              correctIndex: 1,
              explanation: {
                vi: 'Đoạn D: "the brain\'s total consumption of glucose changes very little during difficult mental tasks".',
                en: 'Paragraph D: "the brain\'s total consumption of glucose changes very little during difficult mental tasks".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q39',
              number: 39,
              prompt: 'Some business leaders avoid unnecessary choices by wearing the same ___ every day.',
              acceptedAnswers: ['outfit'],
              explanation: {
                vi: 'Đoạn F: "they wear the same outfit every day so that they do not waste time and attention on choosing clothes".',
                en: 'Paragraph F: "they wear the same outfit every day so that they do not waste time ... choosing clothes".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'mock1-r-q40',
              number: 40,
              prompt: 'Major decisions are best made in the morning or immediately after a ___.',
              acceptedAnswers: ['break'],
              explanation: {
                vi: 'Đoạn F: "schedule it for the morning or immediately after a break".',
                en: 'Paragraph F: "schedule it for the morning or immediately after a break".',
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
        /* ---- Task 1: Biểu đồ đường – số giờ giải trí mỗi tuần của thanh niên 18–24 tuổi ---- */
        {
          id: 'mock1-w-task1',
          taskNumber: 1,
          prompt:
            'The line graph below shows the average number of hours per week that young adults aged 18–24 in one country spent on four leisure activities between 2000 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.',
          chartData: {
            chartType: 'line',
            title: 'Average weekly hours spent on leisure activities by young adults (18–24), 2000–2020',
            unit: 'hours per week',
            labels: ['2000', '2005', '2010', '2015', '2020'],
            series: [
              { name: 'Watching TV', values: [18, 16, 13, 10, 8] },
              { name: 'Social media', values: [0, 3, 8, 12, 14] },
              { name: 'Online gaming', values: [2, 4, 7, 9, 11] },
              { name: 'Sport and exercise', values: [5, 5, 4, 4, 5] },
            ],
          },
          minWords: 150,
          suggestedMinutes: 20,
          sampleAnswer: `The line graph compares how many hours a week young people aged 18 to 24 in one country devoted to four leisure activities over a twenty-year period from 2000 to 2020.

Overall, the most noticeable trend is a shift from traditional television to online activities. While time spent watching TV fell steadily, both social media and online gaming grew considerably, and by the end of the period social media had become the most popular pastime. Time spent on sport, by contrast, remained relatively stable.

In 2000, watching television was by far the most common activity, at 18 hours a week, compared with 5 hours for sport, 2 hours for online gaming and none at all for social media. Over the next two decades, TV viewing declined consistently, dropping to 13 hours in 2010 and just 8 hours in 2020, less than half its original level.

Social media showed the most dramatic change. Starting from zero, it climbed rapidly to 8 hours in 2010 and had overtaken television by 2015, when it reached 12 hours, before rising further to 14 hours in 2020. Online gaming followed a similar but less steep upward path, increasing from 2 to 11 hours. Meanwhile, the figure for sport and exercise fluctuated only slightly, dipping to 4 hours in 2010 and 2015 before returning to 5 hours at the end of the period.`,
        },
        /* ---- Task 2: Bài luận Discuss both views + opinion – học đại học có nên miễn phí ---- */
        {
          id: 'mock1-w-task2',
          taskNumber: 2,
          prompt:
            'Some people believe that university education should be free for all students, while others argue that students should pay the full cost of their studies.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.',
          minWords: 250,
          suggestedMinutes: 40,
          sampleAnswer: `The question of who should pay for higher education is widely debated. While some people argue that university should be free for everyone, others believe that students themselves should cover the full cost. In my view, although students should make some contribution, a largely free system is fairer and more beneficial for society as a whole.

On the one hand, there are reasonable arguments for making students pay. A university degree usually leads to better-paid jobs, so graduates are the main beneficiaries of their education, and it may seem unfair for taxpayers who never attended university to fund it. In addition, when students pay fees, they may take their studies more seriously and choose courses more carefully, rather than enrolling in a programme with little thought about their future career. Charging fees also allows universities to invest in better facilities and staff without relying entirely on government budgets.

On the other hand, free university education has significant advantages. Most importantly, it ensures that access to higher education depends on ability rather than family income. If students must pay high fees, talented young people from poorer backgrounds may decide not to study at all, or may graduate with heavy debts that limit their choices for years. Furthermore, society as a whole benefits from a well-educated population. Doctors, engineers and teachers trained at public expense contribute to economic growth and public services, and they also pay more tax over their working lives.

In conclusion, while the view that graduates should pay for the advantages they gain has some merit, I believe that the benefits of free or low-cost university education for both individuals and society are far greater. A sensible compromise might be a system in which tuition is free, but graduates with high incomes repay part of the cost later through taxation.`,
        },
      ],
    },

    /* ========================================================================
     * PHẦN 4: SPEAKING (~14 phút)
     *   Part 1: câu hỏi ngắn về bản thân (4–5 phút)
     *   Part 2: cue card – 1 phút chuẩn bị, nói tối đa 2 phút
     *   Part 3: thảo luận sâu, trừu tượng hơn liên quan chủ đề Part 2
     * ====================================================================== */
    {
      skill: 'speaking',
      title: 'Speaking',
      durationMinutes: 14,
      speakingParts: [
        /* ---- Speaking Part 1: Giới thiệu bản thân, chủ đề quen thuộc ---- */
        {
          partNumber: 1,
          questions: [
            'Do you work or are you a student?',
            'What do you like most about the area where you live?',
            'How do you usually spend your weekends?',
            'Do you prefer reading books on paper or on a screen? Why?',
            'Is there a new skill you would like to learn in the future?',
          ],
          prepSeconds: 0,
          answerSeconds: 30,
        },
        /* ---- Speaking Part 2: Cue card – kể về lần giúp đỡ người khác ---- */
        {
          partNumber: 2,
          questions: ['Describe a time when you helped someone.'],
          cueCardPoints: [
            'who you helped',
            'what the situation was',
            'what you did to help',
            'and explain how you felt about helping this person',
          ],
          prepSeconds: 60,
          answerSeconds: 120,
        },
        /* ---- Speaking Part 3: Thảo luận về việc giúp đỡ và tình nguyện trong xã hội ---- */
        {
          partNumber: 3,
          questions: [
            'Why do some people enjoy helping others more than others do?',
            'Do you think people today are less willing to help strangers than in the past? Why or why not?',
            'Should schools require students to do volunteer work? What are the advantages and disadvantages?',
            'What role should governments play in helping people in need, compared with charities and individuals?',
          ],
          prepSeconds: 0,
          answerSeconds: 60,
        },
      ],
    },
  ],
}
