/**
 * level-2-test.ts
 * ----------------------------------------------------------------------------
 * BÀI KIỂM TRA CUỐI LEVEL 2 "Foundation" (band 2.0 – 3.0, CEFR A1+/A2), khoảng 45 phút.
 * Đạt từ 70% trở lên (passPercent) thì qua level.
 *
 * Cấu trúc (số câu đánh lại từ 1 ở mỗi phần):
 *   1. Vocabulary (8 phút)  — 15 câu: Part 1 ngữ pháp (hiện tại đơn/tiếp diễn, quá khứ đơn,
 *                              so sánh hơn/nhất, some/any/much/many, should, there was/were),
 *                              Part 2 từ vựng chủ đề + giới từ + be going to
 *   2. Listening (9 phút)   — 12 câu: Part 1 điền form đặt phòng khách sạn (đánh vần, số, ngày, giá),
 *                              Part 2 độc thoại của hướng dẫn viên, chọn đáp án
 *   3. Reading (10 phút)    — 12 câu: 2 bài đọc ~200–230 từ (blog sở thích nấu ăn, bài giới thiệu du lịch),
 *                              có TRUE/FALSE/NOT GIVEN, điền ONE WORD và trắc nghiệm
 *   4. Writing (15 phút)    — 1 email 60–90 từ kể về kế hoạch kỳ nghỉ (AI chấm)
 *   5. Speaking (4 phút)    — Part 1: 4 câu hỏi (30 giây/câu); Part 2: cue card "Describe..." (AI chấm)
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'

export const level2Test: Exam = {
  id: 'level-2-test',
  kind: 'level-test',
  levelId: 'level-2',
  passPercent: 70,
  title: {
    vi: 'Kiểm tra cuối Level 2',
    en: 'Level 2 Test',
  },
  description: {
    vi: 'Khoảng 45 phút, kiểm tra đủ 5 kỹ năng của Level 2 (Foundation): từ vựng & ngữ pháp, nghe, đọc, viết và nói. Cần đạt 70% để qua level.',
    en: 'About 45 minutes, testing all five Level 2 (Foundation) skills: vocabulary & grammar, listening, reading, writing and speaking. You need 70% to pass.',
  },
  sections: [
    /* ======================================================================
     * PHẦN 1: TỪ VỰNG & NGỮ PHÁP — 15 câu
     * ==================================================================== */
    {
      skill: 'vocabulary',
      title: 'Vocabulary',
      durationMinutes: 8,
      parts: [
        // Part 1: ngữ pháp trọng tâm Level 2
        {
          title: 'Part 1',
          instructions: 'Questions 1–9. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'l2t-voc-q1',
              number: 1,
              prompt: 'Be quiet, please! The baby ___ in the bedroom.',
              options: ['sleeps', 'is sleeping', 'sleep', 'slept'],
              correctIndex: 1,
              explanation: {
                vi: '"Be quiet!" cho thấy hành động đang xảy ra ngay lúc nói → dùng hiện tại tiếp diễn "is sleeping". "Sleeps" là hiện tại đơn, dùng cho thói quen.',
                en: '"Be quiet!" shows the action is happening now, so we use the present continuous: "is sleeping". "Sleeps" is for habits.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q2',
              number: 2,
              prompt: 'My father usually ___ to work by bus.',
              options: ['goes', 'is going', 'go', 'going'],
              correctIndex: 0,
              explanation: {
                vi: '"Usually" (thường) chỉ thói quen → hiện tại đơn. Chủ ngữ "my father" là ngôi thứ ba số ít nên "go" thêm "-es" → "goes".',
                en: '"Usually" shows a habit, so we use the present simple. With "my father" (he), "go" becomes "goes".',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-voc-q3',
              number: 3,
              prompt: 'Last summer we ___ (go) to Da Lat for our holiday.',
              acceptedAnswers: ['went'],
              explanation: {
                vi: '"Last summer" (mùa hè năm ngoái) là thời gian trong quá khứ → quá khứ đơn. "Go" là động từ bất quy tắc: go → went.',
                en: '"Last summer" is in the past, so we use the past simple. "Go" is irregular: go → went.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q4',
              number: 4,
              prompt: 'An elephant is ___ than a horse.',
              options: ['more big', 'biggest', 'big', 'bigger'],
              correctIndex: 3,
              explanation: {
                vi: 'Có "than" → so sánh hơn. Tính từ ngắn "big" kết thúc bằng phụ âm–nguyên âm–phụ âm nên gấp đôi "g": big → bigger. Không nói "more big".',
                en: '"Than" means we need a comparative. "Big" is short, so we double the "g" and add "-er": bigger. We never say "more big".',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q5',
              number: 5,
              prompt: 'Is there ___ milk in the fridge? I want to make a cake.',
              options: ['many', 'a', 'any', 'a few'],
              correctIndex: 2,
              explanation: {
                vi: '"Milk" là danh từ không đếm được, trong câu hỏi dùng "any". "Many" và "a few" đi với danh từ đếm được số nhiều; "a" đi với danh từ đếm được số ít.',
                en: '"Milk" is uncountable, and in questions we use "any". "Many" and "a few" go with plural countable nouns; "a" goes with one countable thing.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q6',
              number: 6,
              prompt: 'How ___ apples do you need for the fruit salad?',
              options: ['much', 'any', 'lot', 'many'],
              correctIndex: 3,
              explanation: {
                vi: '"Apples" là danh từ đếm được số nhiều → hỏi số lượng bằng "How many". "How much" dùng cho danh từ không đếm được (How much water?) hoặc hỏi giá.',
                en: '"Apples" is a plural countable noun, so we ask "How many". "How much" is for uncountable nouns (How much water?) or prices.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-voc-q7',
              number: 7,
              prompt: 'This is the ___ (good) restaurant in our town. The food is wonderful!',
              acceptedAnswers: ['best'],
              explanation: {
                vi: '"The ___ ... in our town" → so sánh nhất. "Good" là tính từ bất quy tắc: good → better → best.',
                en: '"The ... in our town" needs a superlative. "Good" is irregular: good → better → best.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q8',
              number: 8,
              prompt: 'You look very tired. You ___ go to bed early tonight.',
              options: ["mustn't", "can't", "don't", 'should'],
              correctIndex: 3,
              explanation: {
                vi: '"Should" dùng để khuyên ai đó nên làm gì: "Bạn trông mệt, bạn nên đi ngủ sớm." "Mustn\'t" = không được phép, "can\'t" = không thể — không hợp nghĩa.',
                en: 'We use "should" to give advice. "Mustn\'t" (not allowed) and "can\'t" (not able) do not make sense here.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q9',
              number: 9,
              prompt: 'There ___ a lot of people at the party yesterday.',
              options: ['was', 'is', 'were', 'are'],
              correctIndex: 2,
              explanation: {
                vi: '"Yesterday" → quá khứ; "a lot of people" là số nhiều → "There were". "There was" dùng với danh từ số ít hoặc không đếm được.',
                en: '"Yesterday" means past, and "a lot of people" is plural, so we say "There were". "There was" is for singular or uncountable nouns.',
              },
            },
          ],
        },
        // Part 2: từ vựng theo chủ đề (sức khỏe, thời tiết, nghề nghiệp, sở thích), giới từ, be going to
        {
          title: 'Part 2',
          instructions: 'Questions 10–15. Choose the correct answer, or write ONE word in the gap.',
          questions: [
            {
              kind: 'choice',
              id: 'l2t-voc-q10',
              number: 10,
              prompt: "I've got a headache and a high temperature. I think I should see a ___.",
              options: ['dentist', 'doctor', 'waiter', 'pilot'],
              correctIndex: 1,
              explanation: {
                vi: 'Đau đầu (headache) và sốt cao (high temperature) thì nên đi khám bác sĩ → "doctor". "Dentist" là nha sĩ (chữa răng), "waiter" là bồi bàn.',
                en: 'With a headache and a high temperature, you should see a "doctor". A dentist looks after your teeth.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-voc-q11',
              number: 11,
              prompt: "It's cold and ___ today, so don't forget your umbrella!",
              acceptedAnswers: ['rainy', 'wet'],
              explanation: {
                vi: 'Nhắc mang ô (umbrella) → trời mưa → "rainy" (hoặc "wet" = ẩm ướt, có mưa). Chú ý: danh từ "rain" → tính từ "rainy".',
                en: 'You need an umbrella when it is "rainy" (or "wet"). The noun is "rain"; the adjective is "rainy".',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q12',
              number: 12,
              prompt: 'The bus station is ___ the bank and the post office.',
              options: ['between', 'among', 'under', 'on'],
              correctIndex: 0,
              explanation: {
                vi: '"Between A and B" = ở giữa hai vật/hai nơi. "Among" dùng khi ở giữa nhiều thứ (từ ba trở lên), không đi với "and" giữa hai nơi.',
                en: '"Between A and B" means in the middle of two places. "Among" is for a group of three or more.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q13',
              number: 13,
              prompt: 'A person whose job is to fly planes is a ___.',
              options: ['pilot', 'driver', 'chef', 'farmer'],
              correctIndex: 0,
              explanation: {
                vi: 'Người lái máy bay là phi công → "pilot". "Driver" lái xe ô tô/xe buýt, "chef" là đầu bếp, "farmer" là nông dân.',
                en: 'A "pilot" flies planes. A driver drives cars or buses, a chef cooks, and a farmer works on a farm.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-voc-q14',
              number: 14,
              prompt: 'My sister loves taking photos. Her favourite ___ is photography.',
              acceptedAnswers: ['hobby', 'pastime'],
              explanation: {
                vi: 'Việc mình thích làm lúc rảnh rỗi gọi là "hobby" (sở thích). Chụp ảnh (photography) là sở thích của chị ấy.',
                en: 'Something you love doing in your free time is a "hobby". Photography is her hobby.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-voc-q15',
              number: 15,
              prompt: 'Look at those big black clouds! It ___ rain.',
              options: ['goes to', 'is go to', 'is going to', 'going'],
              correctIndex: 2,
              explanation: {
                vi: 'Dự đoán dựa trên dấu hiệu nhìn thấy (mây đen) → dùng "be going to + động từ nguyên mẫu": "It is going to rain."',
                en: 'We use "be going to" for a prediction based on what we can see (black clouds): "It is going to rain."',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 2: NGHE — 12 câu, 2 part
     * Mỗi dòng audioScript dạng "Tên: lời thoại" để app đọc bằng nhiều giọng.
     * ==================================================================== */
    {
      skill: 'listening',
      title: 'Listening',
      durationMinutes: 9,
      parts: [
        // Part 1: điền form đặt phòng khách sạn qua điện thoại (đánh vần tên, ngày, số đêm, giá tiền)
        {
          title: 'Part 1',
          instructions:
            'Questions 1–6. Listen to a woman booking a hotel room. Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.',
          audioScript:
            'Receptionist: Good morning, Seaview Hotel. How can I help you?\n' +
            "Linda: Hello. I'd like to book a room, please.\n" +
            'Receptionist: Of course. Can I have your name, please?\n' +
            "Linda: Yes, it's Linda Woodley.\n" +
            'Receptionist: How do you spell your family name?\n' +
            'Linda: W-O-O-D-L-E-Y.\n' +
            'Receptionist: Thank you. And when are you arriving?\n' +
            "Linda: On the fourteenth of July. We're staying for three nights.\n" +
            'Receptionist: So you are leaving on the seventeenth?\n' +
            "Linda: That's right.\n" +
            'Receptionist: What kind of room would you like? A single or a double?\n' +
            "Linda: Actually, I need a family room. I'm coming with my husband and our two children.\n" +
            'Receptionist: No problem. A double room is seventy-five pounds a night, and a family room is eighty-five pounds.\n' +
            "Linda: Eighty-five pounds. That's fine. Is there a car park at the hotel?\n" +
            "Receptionist: Yes, there is, and it's free.\n" +
            "Linda: Oh, we don't need it. We haven't got a car. We're coming by train.\n" +
            "Receptionist: That's easy. The station is only five minutes from the hotel. Breakfast is from seven to ten.\n" +
            'Linda: Great. Thank you very much.',
          questions: [
            {
              kind: 'gap-fill',
              id: 'l2t-lis-q1',
              number: 1,
              prompt: 'Family name: Linda ___',
              acceptedAnswers: ['Woodley'],
              explanation: {
                vi: 'Linda đánh vần họ: "W-O-O-D-L-E-Y" → Woodley. Chú ý hai chữ O liên tiếp ("double O").',
                en: 'Linda spells her family name: "W-O-O-D-L-E-Y". Note the two O\'s.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-lis-q2',
              number: 2,
              prompt: 'Arrival date: ___ July',
              acceptedAnswers: ['14', '14th', 'fourteenth', 'the fourteenth', '14 th'],
              explanation: {
                vi: 'Linda nói "On the fourteenth of July" → đến ngày 14/7. "Seventeenth" (17) là ngày rời đi — đó là bẫy.',
                en: 'Linda says "On the fourteenth of July". The seventeenth is the day she leaves.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-lis-q3',
              number: 3,
              prompt: 'Number of nights: ___',
              acceptedAnswers: ['3', 'three'],
              explanation: {
                vi: '"We\'re staying for three nights." → ở 3 đêm (từ ngày 14 đến ngày 17).',
                en: '"We\'re staying for three nights" — from the 14th to the 17th.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-lis-q4',
              number: 4,
              prompt: 'Type of room: ___ room',
              acceptedAnswers: ['family'],
              explanation: {
                vi: 'Nhân viên hỏi "single or double?" nhưng Linda nói "Actually, I need a family room" → phòng gia đình. "Actually" thường báo hiệu thông tin đúng sắp được nói.',
                en: 'The receptionist offers a single or a double, but Linda says "Actually, I need a family room."',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-lis-q5',
              number: 5,
              prompt: 'Price per night: £___',
              acceptedAnswers: ['85', 'eighty-five', 'eighty five'],
              explanation: {
                vi: 'Phòng đôi (double) giá £75, còn phòng gia đình (family room) giá £85. Linda đặt phòng gia đình → 85.',
                en: 'A double room is £75, but a family room is £85. Linda wants a family room, so the answer is 85.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-lis-q6',
              number: 6,
              prompt: 'Travelling to the hotel by: ___',
              acceptedAnswers: ['train'],
              explanation: {
                vi: 'Khách sạn có bãi đỗ xe nhưng Linda nói "We haven\'t got a car. We\'re coming by train." → đi bằng tàu hỏa.',
                en: 'There is a car park, but Linda says "We haven\'t got a car. We\'re coming by train."',
              },
            },
          ],
        },
        // Part 2: độc thoại — hướng dẫn viên giới thiệu chuyến tham quan thành phố
        {
          title: 'Part 2',
          instructions:
            'Questions 7–12. Listen to a tour guide talking to a group of tourists. Choose the correct answer for each question.',
          audioScript:
            "Guide: Good morning, everyone, and welcome to the City Day Tour. My name is Jack, and I'm your guide today.\n" +
            "Guide: First, some information about our day. The tour usually starts at nine o'clock, but today we're starting at half past nine because the traffic is very heavy.\n" +
            "Guide: Our first stop is the old market. It's the biggest market in the city, and you can buy fruit, clothes and souvenirs there. Please be careful with your bags and money, because it's always very crowded.\n" +
            "Guide: After the market, we're going to visit the History Museum. Usually it's closed on Mondays, but this week it's open every day.\n" +
            "Guide: Lunch is at a small restaurant next to the river. The food there is cheaper than in the city centre, and the fish is really delicious. Lunch is included in your ticket, but drinks aren't, so you need to pay for those.\n" +
            'Guide: In the afternoon, there is some free time in the park. You can walk, take photos or hire a bike. Bikes cost five dollars an hour.\n' +
            "Guide: The weather today is sunny and very hot, so you should drink a lot of water and wear a hat.\n" +
            "Guide: The bus goes back to the hotel at five o'clock. Please don't be late!",
          questions: [
            {
              kind: 'choice',
              id: 'l2t-lis-q7',
              number: 7,
              prompt: 'What time does the tour start today?',
              options: ['9:00', '9:30', '10:00', '5:00'],
              correctIndex: 1,
              explanation: {
                vi: 'Tour thường bắt đầu lúc 9 giờ, nhưng "today we\'re starting at half past nine" → hôm nay 9:30. "Half past nine" = 9 giờ 30.',
                en: 'It usually starts at nine, but "today we\'re starting at half past nine" (9:30) because of the traffic.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-lis-q8',
              number: 8,
              prompt: 'What does the guide say about the old market?',
              options: ['It is quiet in the morning.', 'It only sells fruit.', 'It is always very crowded.', 'It is closed on Mondays.'],
              correctIndex: 2,
              explanation: {
                vi: 'Hướng dẫn viên nói "it\'s always very crowded" (luôn rất đông) nên phải cẩn thận túi xách. Chợ bán cả trái cây, quần áo, quà lưu niệm; "closed on Mondays" là nói về bảo tàng.',
                en: 'The guide says "it\'s always very crowded". It sells fruit, clothes and souvenirs, and "closed on Mondays" is about the museum.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-lis-q9',
              number: 9,
              prompt: 'What is different about the History Museum this week?',
              options: ['It is free.', 'It closes early.', 'It has a new room.', 'It is open every day.'],
              correctIndex: 3,
              explanation: {
                vi: '"Usually it\'s closed on Mondays, but this week it\'s open every day." → tuần này bảo tàng mở cửa tất cả các ngày.',
                en: '"Usually it\'s closed on Mondays, but this week it\'s open every day."',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-lis-q10',
              number: 10,
              prompt: 'What do the tourists have to pay for at lunch?',
              options: ['drinks', 'fish', 'bread', 'nothing'],
              correctIndex: 0,
              explanation: {
                vi: '"Lunch is included in your ticket, but drinks aren\'t, so you need to pay for those." → bữa trưa đã gồm trong vé, chỉ phải trả tiền đồ uống.',
                en: 'Lunch is included in the ticket, "but drinks aren\'t, so you need to pay for those."',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-lis-q11',
              number: 11,
              prompt: 'How much does it cost to hire a bike for one hour?',
              options: ['$3', '$15', '$50', '$5'],
              correctIndex: 3,
              explanation: {
                vi: '"Bikes cost five dollars an hour." → 5 đô-la một giờ. Chú ý "five" (5) khác "fifteen" (15) và "fifty" (50).',
                en: '"Bikes cost five dollars an hour." Don\'t confuse five (5) with fifteen (15) or fifty (50).',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-lis-q12',
              number: 12,
              prompt: 'What does the guide tell people to do because of the weather?',
              options: ['take an umbrella', 'wear a coat', 'drink a lot of water', 'stay on the bus'],
              correctIndex: 2,
              explanation: {
                vi: 'Trời nắng và rất nóng nên "you should drink a lot of water and wear a hat" → uống nhiều nước và đội mũ. Ô và áo khoác dùng khi trời mưa/lạnh.',
                en: 'It is sunny and very hot, so "you should drink a lot of water and wear a hat". Umbrellas and coats are for rain or cold.',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 3: ĐỌC — 12 câu, 2 bài đọc (~200–230 từ mỗi bài)
     * ==================================================================== */
    {
      skill: 'reading',
      title: 'Reading',
      durationMinutes: 10,
      parts: [
        // Passage 1: bài blog của một bạn học sinh về sở thích nấu ăn
        {
          title: 'Passage 1',
          instructions:
            'Questions 1–6. Read the blog post. Choose the correct answer, write ONE WORD, or choose TRUE, FALSE or NOT GIVEN.',
          passage: {
            title: 'My New Hobby',
            text:
              "Hi, I'm Khanh and I'm fifteen. A year ago, I didn't know how to cook. When my parents were at work, I only ate instant noodles. Then, in September, my school started a cooking club, and I joined it.\n\n" +
              'The club meets every Wednesday after school in the school kitchen. There are twelve students in the club, and our teacher is Mr Long. He was a chef in a big hotel before he became a teacher. Every week we cook a different dish. In the first month, we made spring rolls, chicken soup and a chocolate cake. The cake was the most difficult dish because you must weigh everything very carefully.\n\n' +
              "Now I cook dinner for my family twice a week, on Mondays and Fridays. My little sister always asks for fried rice because it is her favourite food. My mum says my fried rice is better than hers! Cooking at home is cheaper and healthier than buying fast food, and it's a lot of fun.\n\n" +
              "Next month, our club is going to have a competition. Each student must cook one dish for the teachers. I'm going to make fish with tomato sauce. I'm practising it at home this week. Wish me luck!",
          },
          questions: [
            {
              kind: 'choice',
              id: 'l2t-rea-q1',
              number: 1,
              prompt: 'Why did Khanh eat instant noodles a year ago?',
              options: ['He loved the taste.', "He didn't know how to cook.", 'They were very cheap.', 'His sister made them for him.'],
              correctIndex: 1,
              explanation: {
                vi: 'Bài viết: "A year ago, I didn\'t know how to cook... I only ate instant noodles." → vì Khanh chưa biết nấu ăn. Bài không nói về mùi vị hay giá mì.',
                en: '"A year ago, I didn\'t know how to cook... I only ate instant noodles." The text says nothing about the taste or price.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-rea-q2',
              number: 2,
              prompt: 'The cooking club meets every ___ after school.',
              acceptedAnswers: ['Wednesday', 'Wednesdays'],
              explanation: {
                vi: '"The club meets every Wednesday after school" → câu lạc bộ họp vào thứ Tư. Thứ Hai và thứ Sáu là ngày Khanh nấu cơm ở nhà.',
                en: '"The club meets every Wednesday after school." Monday and Friday are the days Khanh cooks at home.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l2t-rea-q3',
              number: 3,
              prompt: 'Mr Long worked in a hotel before he was a teacher.',
              answer: 'TRUE',
              explanation: {
                vi: '"He was a chef in a big hotel before he became a teacher." → thầy Long từng làm đầu bếp khách sạn trước khi đi dạy → TRUE.',
                en: '"He was a chef in a big hotel before he became a teacher." → TRUE.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l2t-rea-q4',
              number: 4,
              prompt: 'There are twenty students in the cooking club.',
              answer: 'FALSE',
              explanation: {
                vi: 'Bài viết ghi "There are twelve students" (12 học sinh), không phải 20 → FALSE. Chú ý twelve (12) khác twenty (20).',
                en: 'The text says "There are twelve students", not twenty → FALSE.',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-rea-q5',
              number: 5,
              prompt: 'Which dish was the most difficult for Khanh?',
              options: ['spring rolls', 'chicken soup', 'fried rice', 'chocolate cake'],
              correctIndex: 3,
              explanation: {
                vi: '"The cake was the most difficult dish because you must weigh everything very carefully." → bánh sô-cô-la khó nhất vì phải cân mọi thứ cẩn thận.',
                en: '"The cake was the most difficult dish" because you must weigh everything carefully.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l2t-rea-q6',
              number: 6,
              prompt: "Khanh's little sister can cook fried rice.",
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài chỉ nói em gái luôn đòi ăn cơm chiên vì đó là món yêu thích, không nói em ấy có biết nấu hay không → NOT GIVEN.',
                en: 'The text says his sister always asks for fried rice, but not whether she can cook it → NOT GIVEN.',
              },
            },
          ],
        },
        // Passage 2: bài giới thiệu du lịch một hòn đảo (đi lại, chỗ ở, thời tiết)
        {
          title: 'Passage 2',
          instructions:
            'Questions 7–12. Read the travel article. Choose the correct answer, write ONE WORD, or choose TRUE, FALSE or NOT GIVEN.',
          passage: {
            title: 'A Weekend on Green Island',
            text:
              'Green Island is a small island about 40 kilometres from the coast. It is a popular place for a weekend holiday, especially in summer.\n\n' +
              'How to get there\n' +
              'There is no airport on the island, so most visitors go by boat. The fast boat leaves the harbour three times a day, at 7 a.m., 11 a.m. and 3 p.m. The trip takes one hour and a ticket costs 200,000 dong. There is also a slow boat. It is cheaper (only 120,000 dong), but the trip takes almost three hours.\n\n' +
              'Getting around\n' +
              'There are no cars on Green Island. Most people walk or hire a bicycle. You can also take the electric bus. It goes around the whole island and stops at all the main beaches.\n\n' +
              'Where to stay\n' +
              'There are two hotels and a lot of small guesthouses. Guesthouses are cheaper than hotels, and the owners often cook local food for their guests. In July and August, there are a lot of tourists, so you should book your room early.\n\n' +
              'When to go\n' +
              'The best time to visit is from March to May, when it is warm and dry. From September to November there are often storms, and sometimes the boats cannot sail.',
          },
          questions: [
            {
              kind: 'choice',
              id: 'l2t-rea-q7',
              number: 7,
              prompt: 'How do most visitors travel to Green Island?',
              options: ['by boat', 'by plane', 'by car', 'by electric bus'],
              correctIndex: 0,
              explanation: {
                vi: '"There is no airport on the island, so most visitors go by boat." → đi bằng thuyền/tàu. Xe buýt điện chỉ chạy trên đảo.',
                en: '"There is no airport on the island, so most visitors go by boat." The electric bus only goes around the island.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-rea-q8',
              number: 8,
              prompt: 'The slow boat is cheaper, but the trip takes almost three ___.',
              acceptedAnswers: ['hours'],
              explanation: {
                vi: '"It is cheaper..., but the trip takes almost three hours." → gần 3 tiếng. Tàu nhanh chỉ mất 1 tiếng.',
                en: '"It is cheaper..., but the trip takes almost three hours." The fast boat takes one hour.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l2t-rea-q9',
              number: 9,
              prompt: 'Visitors can hire a car on the island.',
              answer: 'FALSE',
              explanation: {
                vi: 'Bài viết ghi "There are no cars on Green Island" (trên đảo không có ô tô) → không thể thuê ô tô → FALSE. Du khách thuê xe đạp.',
                en: '"There are no cars on Green Island", so you cannot hire one → FALSE. Visitors hire bicycles.',
              },
            },
            {
              kind: 'true-false-not-given',
              id: 'l2t-rea-q10',
              number: 10,
              prompt: 'The electric bus is free for visitors.',
              answer: 'NOT GIVEN',
              explanation: {
                vi: 'Bài chỉ nói xe buýt điện chạy quanh đảo và dừng ở các bãi biển chính, không nói giá vé → NOT GIVEN.',
                en: 'The article says where the electric bus goes, but not how much it costs → NOT GIVEN.',
              },
            },
            {
              kind: 'gap-fill',
              id: 'l2t-rea-q11',
              number: 11,
              prompt: 'Guesthouse owners often cook ___ food for their guests.',
              acceptedAnswers: ['local'],
              explanation: {
                vi: '"the owners often cook local food for their guests" → chủ nhà nghỉ hay nấu món ăn địa phương (local food).',
                en: '"The owners often cook local food for their guests."',
              },
            },
            {
              kind: 'choice',
              id: 'l2t-rea-q12',
              number: 12,
              prompt: 'When is the best time to visit Green Island?',
              options: ['July and August', 'September to November', 'March to May', 'December to February'],
              correctIndex: 2,
              explanation: {
                vi: '"The best time to visit is from March to May, when it is warm and dry." Tháng 7–8 rất đông khách, tháng 9–11 hay có bão.',
                en: '"The best time to visit is from March to May." July and August are busy, and September to November is stormy.',
              },
            },
          ],
        },
      ],
    },

    /* ======================================================================
     * PHẦN 4: VIẾT — 1 email 60–90 từ, AI chấm
     * ==================================================================== */
    {
      skill: 'writing',
      title: 'Writing',
      durationMinutes: 15,
      writingTasks: [
        {
          id: 'l2t-wri-task1',
          taskNumber: 1,
          prompt:
            'You are going on holiday next month. Write an email to your English friend, Sam (60–90 words). Tell Sam:\n' +
            '- where you are going and who you are going with\n' +
            '- how you are going to travel there\n' +
            '- what you are going to do there\n' +
            '- ask Sam about his holiday plans',
          minWords: 60,
          suggestedMinutes: 15,
          sampleAnswer:
            'Hi Sam,\n\n' +
            'How are you? Next month I am going to visit Nha Trang with my parents and my brother. We are going to travel by train because it is cheaper than flying. The trip takes about eight hours. In Nha Trang, we are going to swim in the sea every day and eat a lot of seafood. I also want to visit an island by boat. What about you? Where are you going this summer?\n\n' +
            'Write soon!\n' +
            'Minh',
        },
      ],
    },

    /* ======================================================================
     * PHẦN 5: NÓI — Part 1 (4 câu hỏi) + Part 2 (cue card), AI chấm
     * ==================================================================== */
    {
      skill: 'speaking',
      title: 'Speaking',
      durationMinutes: 4,
      speakingParts: [
        // Part 1: câu hỏi ngắn về đời sống hằng ngày (đồ ăn, thời tiết, đi lại, sở thích)
        {
          partNumber: 1,
          questions: [
            'What is your favourite food, and how often do you eat it?',
            'What is the weather like in your city today?',
            'How do you usually get to school or work?',
            'What did you do last weekend?',
          ],
          prepSeconds: 0,
          answerSeconds: 30,
        },
        // Part 2: cue card — có 1 phút chuẩn bị, nói tối đa 90 giây
        {
          partNumber: 2,
          questions: ['Describe a place you visited on holiday.'],
          cueCardPoints: [
            'where the place was',
            'when you went there and who you went with',
            'what you did there',
            'and explain why you liked or did not like it',
          ],
          prepSeconds: 60,
          answerSeconds: 90,
        },
      ],
    },
  ],
}
