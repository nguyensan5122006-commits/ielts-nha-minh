/**
 * writing-lessons.ts — LEVEL 3 (band 4.0 – 6.5) · TRACK IELTS · KỸ NĂNG VIẾT
 * ----------------------------------------------------------------------------
 * File này chứa 10 bài Writing theo dạng đề IELTS Academic, chia 2 chặng:
 *
 *   Chặng 14 — Writing Task 1 (mô tả biểu đồ / quy trình, ≥ 150 từ, 20 phút)
 *     1. l3-i-wri-01  Biểu đồ đường: overview + ngôn ngữ xu hướng   (nấc 1: bài mẫu có chú thích)
 *     2. l3-i-wri-02  Biểu đồ cột: nhóm số liệu + so sánh            (nấc 2: điền khuyết ĐOẠN CUỐI bài mẫu)
 *     3. l3-i-wri-03  Hai biểu đồ tròn: tỉ lệ + thay đổi             (nấc 2: điền khuyết HAI ĐOẠN CUỐI)
 *     4. l3-i-wri-04  Bảng số liệu: chọn lọc số chính                (nấc 3: tự viết, gợi ý ít)
 *     5. l3-i-wri-05  Quy trình: bị động + từ trình tự               (nấc 3: tự viết, bấm giờ 20 phút)
 *
 *   Chặng 15 — Writing Task 2 (bài luận, ≥ 250 từ, 40 phút)
 *     6. l3-i-wri-06  Opinion (agree/disagree): thesis + PEEL        (nấc 1: đoạn mẫu có chú thích)
 *     7. l3-i-wri-07  Discuss both views + opinion                   (nấc 2: điền khuyết ĐOẠN KẾT)
 *     8. l3-i-wri-08  Advantages / disadvantages ("outweigh")        (nấc 2: điền khuyết HAI ĐOẠN CUỐI)
 *     9. l3-i-wri-09  Causes / solutions                             (nấc 3: tự viết)
 *    10. l3-i-wri-10  Two-part question (Why? Positive/negative?)    (nấc 3: tự viết, bấm giờ 40 phút)
 *
 * "Nấc" = thang FADING của psych-adult A6/D9: xem bài mẫu có chú thích → điền khuyết
 * từ cuối lên → tự viết toàn bộ. Bài mẫu chú thích nằm trong teachingCards (mỗi câu mẫu
 * là 1 example, phần "vi" ghi câu đó làm nhiệm vụ gì). Bài mẫu khuyết nằm trong
 * readingPassages, các câu fill-blank trỏ tới nó bằng passageId.
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2–3 thẻ chiến thuật (VI + EN)
 *   - exercises     : 7–8 bài khởi động (đa số là tự nhớ / tự chọn + 1 câu nói ngắn)
 *   - writingTask   : đề thật + 3 bài mẫu band 4.0 / 5.5 / 6.5 (bài band thấp có lỗi THẬT
 *                     của band đó) + checklist tự chấm 4 tiêu chí + gợi ý lập dàn ý
 *   - sampleAnswer  : bản 6.5 đã sửa các lỗi nhỏ (khoảng band 7) để tham khảo
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l3-i-wri-NN", bài tập "l3-i-wri-NN-exMM", đề "l3-i-wri-NN-task",
 * bài mẫu khuyết "l3-i-wri-NN-model".
 * Tất cả đề, số liệu và bài mẫu do nhóm tự soạn (không chép từ sách IELTS có bản quyền).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

/* Câu lệnh chuẩn của đề thật — dùng chung cho mọi đề để không gõ lại (và không gõ sai). */
const TASK1_INSTRUCTION =
  'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.'
const TASK2_INSTRUCTION =
  'Give reasons for your answer and include any relevant examples from your own knowledge or experience.'

export const level3IeltsWritingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1 — TASK 1: BIỂU ĐỒ ĐƯỜNG (nấc 1: bài mẫu có chú thích)
  // Đề mẫu trong thẻ: hộ gia đình sở hữu máy tính bàn / laptop / máy tính bảng.
  // Đề tự viết: lượng gạo, thịt, trái cây mỗi người ăn mỗi năm (1995–2025).
  // ==========================================================================
  {
    id: 'l3-i-wri-01',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: {
      vi: 'Task 1 – Biểu đồ đường: overview và ngôn ngữ xu hướng',
      en: 'Task 1 – Line graphs: overview and trend language',
    },
    description: {
      vi: 'Nấc 1: học từ bài mẫu có chú thích từng câu, rồi tự viết bài cho một biểu đồ đường mới.',
      en: 'Step 1: study a model annotated sentence by sentence, then write your own report on a new line graph.',
    },
    teachingCards: [
      {
        title: { vi: 'Bố cục 4 đoạn của Task 1', en: 'The four-paragraph Task 1 layout' },
        body: {
          vi: 'Bài Task 1 (≥ 150 từ, 20 phút) nên có **4 đoạn**:\n1. **Mở bài**: viết lại đề bằng từ khác (1 câu).\n2. **Overview**: 2 đặc điểm lớn nhất, **không ghi số**.\n3–4. **Hai thân bài**: số liệu chi tiết, chia theo nhóm hợp lý.\n**Không** viết ý kiến cá nhân, **không** đoán nguyên nhân.',
          en: 'A Task 1 report (150+ words, 20 minutes) needs **four paragraphs**:\n1. **Introduction**: paraphrase the question (one sentence).\n2. **Overview**: the two biggest features, **no numbers**.\n3–4. **Two body paragraphs**: detailed figures, grouped logically.\n**No** personal opinions and **no** guessing at reasons.',
        },
        examples: [
          { en: 'The graph shows… → The line graph compares…', vi: 'Mở bài: đổi động từ của đề (shows → compares / illustrates).' },
          { en: 'Overall, car use rose steadily, while cycling became less common.', vi: 'Overview: xu hướng chung của các đường, không có số.' },
        ],
      },
      {
        title: { vi: 'Ngôn ngữ xu hướng: động từ + trạng từ', en: 'Trend language: verbs + adverbs' },
        body: {
          vi: 'Hai cách viết cùng một ý:\n• **Động từ + trạng từ**: *rose sharply, fell gradually, remained stable*.\n• **Tính từ + danh từ**: *a sharp rise, a gradual fall*.\nGiới từ: **from 20% to 35%** (từ… đến), **by 15 points** (mức chênh), **peaked at 40%** (đạt đỉnh).\nCác năm đã qua → **quá khứ đơn**; viết và đọc rõ đuôi **-ed**.',
          en: 'Two ways to say the same idea:\n• **Verb + adverb**: *rose sharply, fell gradually, remained stable*.\n• **Adjective + noun**: *a sharp rise, a gradual fall*.\nPrepositions: **from 20% to 35%**, **by 15 points** (the difference), **peaked at 40%**.\nPast years → **past simple**; write and say the **-ed** ending clearly.',
        },
        examples: [
          { en: 'Bus use fell gradually from 40% to 25%.', vi: 'Lượng người đi xe buýt giảm dần từ 40% xuống 25%.' },
          { en: 'There was a sharp rise in cycling after 2015.', vi: 'Sau năm 2015, việc đi xe đạp tăng mạnh.' },
        ],
      },
      {
        title: { vi: 'Bài mẫu có chú thích (đọc kỹ trước khi viết)', en: 'Annotated model (study it before you write)' },
        body: {
          vi: 'Đề mẫu: tỉ lệ hộ gia đình ở một nước có **máy tính bàn, laptop và máy tính bảng**, 2008–2023. Đọc từng câu bên dưới: phần tiếng Việt cho biết **câu đó làm nhiệm vụ gì** trong bài. Bài đầy đủ khoảng 170 từ; đây là bộ khung để bạn bắt chước.',
          en: 'Model task: the percentage of households in one country owning a **desktop, a laptop and a tablet**, 2008–2023. Read each sentence below; the Vietnamese note says **what job the sentence does**. A full answer is about 170 words; this is the skeleton to copy.',
        },
        examples: [
          {
            en: 'The line graph compares the proportion of households in one country that owned a desktop computer, a laptop and a tablet between 2008 and 2023.',
            vi: 'MỞ BÀI – viết lại đề: shows → compares, percentage → proportion.',
          },
          {
            en: 'Overall, desktop ownership declined steadily, while both portable devices became more common, and laptops were the most widely owned device by the end of the period.',
            vi: 'OVERVIEW – 2 ý lớn (xu hướng chung + thiết bị phổ biến nhất cuối kỳ), không có số.',
          },
          {
            en: 'In 2008, 62% of households had a desktop computer, compared with 28% for laptops and almost none for tablets.',
            vi: 'THÂN BÀI 1 – điểm xuất phát; "compared with" để đặt các số cạnh nhau.',
          },
          {
            en: 'Desktop ownership then fell gradually, reaching just 30% in 2023.',
            vi: 'THÂN BÀI 1 – xu hướng + điểm cuối của đường giảm.',
          },
          {
            en: 'By contrast, the figure for laptops rose sharply to 70%, overtaking desktops in 2013.',
            vi: 'THÂN BÀI 2 – nhóm các đường tăng; nêu mốc hai đường cắt nhau.',
          },
          {
            en: 'Tablet ownership also grew rapidly after 2011, before levelling off at around 45% in the final five years.',
            vi: 'THÂN BÀI 2 – "levelling off" = chững lại; "around" khi số không tròn.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-01-ex01',
        type: 'multiple-choice',
        question: 'Which sentence is the best OVERVIEW for the model graph (desktops, laptops and tablets, 2008–2023)?',
        options: [
          'In 2008, 62% of households owned a desktop, but by 2023 this had dropped to 30%.',
          'Overall, desktops became less common, while laptops and tablets grew in popularity, with laptops ending the period as the most owned device.',
          'In conclusion, people prefer laptops because they are lighter and cheaper.',
          'The graph shows how many households had three kinds of computer from 2008 to 2023.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Overview nêu xu hướng chung và đặc điểm nổi bật, không có số, không giải thích lý do.',
          en: 'An overview gives the general trends and the main feature, with no figures and no reasons.',
        },
      },
      {
        id: 'l3-i-wri-01-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối mỗi động từ tả đường biểu đồ với nghĩa của nó.',
          en: 'Match each line-graph verb with its meaning.',
        },
        pairs: [
          { left: 'levelled off', right: 'stopped rising or falling' },
          { left: 'peaked at', right: 'reached its highest point' },
          { left: 'plummeted', right: 'fell very quickly' },
          { left: 'overtook', right: 'became higher than another line' },
          { left: 'fluctuated', right: 'went up and down' },
        ],
        explanation: {
          vi: 'Năm động từ này tả đường biểu đồ chính xác hơn "increase/decrease".',
          en: 'These five verbs describe lines more precisely than "increase/decrease".',
        },
      },
      {
        id: 'l3-i-wri-01-ex03',
        type: 'fill-blank',
        sentence: 'Laptop ownership rose ___ 42 percentage points between 2008 and 2023.',
        acceptedAnswers: ['by'],
        hint: '(giới từ chỉ mức chênh lệch)',
        explanation: {
          vi: '"rise by" = tăng thêm bao nhiêu; "rise to" = tăng đến mức nào.',
          en: '"Rise by" gives the size of the change; "rise to" gives the final figure.',
        },
      },
      {
        id: 'l3-i-wri-01-ex04',
        type: 'multiple-choice',
        question: 'Choose the best paraphrase of: "The graph shows the number of people who visited a library each month."',
        options: [
          'The graph shows the number of people who visited a library each month.',
          'The line graph illustrates how many people went to a library on a monthly basis.',
          'The graph is about library.',
          'The line graph illustrates the library numbers people monthly.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Đổi từ nhưng giữ đủ thông tin: shows → illustrates, the number of → how many.',
          en: 'Change the words but keep all the information: shows → illustrates, the number of → how many.',
        },
      },
      {
        id: 'l3-i-wri-01-ex05',
        type: 'arrange-words',
        translationVi: 'Nhìn chung, số hộ có laptop tăng đáng kể trong suốt giai đoạn.',
        correctSentence: 'Overall, laptop ownership increased significantly over the period.',
        extraWords: ['in', 'significant'],
        explanation: {
          vi: 'Overview mở bằng "Overall," rồi nêu xu hướng của cả giai đoạn.',
          en: 'Start the overview with "Overall," then give the trend for the whole period.',
        },
      },
      {
        id: 'l3-i-wri-01-ex06',
        type: 'fill-blank',
        sentence: 'Tablet ownership grew rapidly, then ___ off at around 45%.',
        acceptedAnswers: ['levelled', 'leveled'],
        hint: '(level, quá khứ)',
        explanation: {
          vi: '"level off" = chững lại; quá khứ: levelled (Anh) hoặc leveled (Mỹ).',
          en: '"Level off" means stop changing; past form: levelled (UK) or leveled (US).',
        },
      },
      {
        id: 'l3-i-wri-01-ex07',
        type: 'multiple-choice',
        question: 'The graph covers 2008 to 2023. Which tense should most of your report use?',
        options: ['Present simple', 'Past simple', 'Present continuous', 'Future simple'],
        correctIndex: 1,
        explanation: {
          vi: 'Số liệu thuộc các năm đã qua nên dùng quá khứ đơn.',
          en: 'The data is about finished years, so use the past simple.',
        },
      },
      {
        id: 'l3-i-wri-01-ex08',
        type: 'speak-sentence',
        sentence: 'Desktop ownership dropped sharply and then levelled off.',
        translationVi: 'Số hộ có máy tính bàn giảm mạnh rồi chững lại.',
        explanation: {
          vi: '"dropped" kết thúc bằng /t/, "levelled" kết thúc bằng /d/; đừng nuốt âm cuối.',
          en: '"Dropped" ends in /t/ and "levelled" ends in /d/; do not drop them.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-01-task',
      taskNumber: 1,
      prompt: `The line graph below shows the average amount of rice, meat and fruit eaten per person each year in one country between 1995 and 2025.\n\n${TASK1_INSTRUCTION}\n\nWrite at least 150 words.`,
      chartData: {
        chartType: 'line',
        title: 'Average yearly consumption of rice, meat and fruit per person in one country, 1995–2025',
        unit: 'kg per person per year',
        labels: ['1995', '2000', '2005', '2010', '2015', '2020', '2025'],
        series: [
          { name: 'Rice', values: [160, 154, 146, 137, 128, 119, 110] },
          { name: 'Meat', values: [18, 24, 31, 38, 46, 52, 55] },
          { name: 'Fruit', values: [40, 41, 40, 43, 44, 46, 48] },
        ],
      },
      minWords: 150,
      suggestedMinutes: 20,
      sampleAnswer: `The line graph illustrates how much rice, meat and fruit an average person in one country ate each year between 1995 and 2025.

Overall, rice was by far the most consumed food throughout the period, although its consumption fell steadily. In contrast, meat consumption increased significantly and overtook fruit, while the amount of fruit eaten rose only slightly.

In 1995, each person ate 160 kg of rice per year, which was four times the figure for fruit (40 kg) and almost nine times that for meat (18 kg). Over the next thirty years, rice consumption declined gradually, reaching 110 kg in 2025, a fall of nearly one third.

Meat showed the most dramatic change. It rose continuously from 18 kg to 38 kg in 2010 and overtook fruit between 2010 and 2015, before ending the period at 55 kg, roughly three times the 1995 figure. Fruit consumption, on the other hand, remained stable at about 40 kg until 2005 and then increased slowly to 48 kg in 2025.`,
      bandSamples: [
        {
          band: '4.0',
          text: `The graph show about rice, meat and fruit in one country. People in this country eat rice very much, 160 kg in 1995 and 110kg in 2025, rice is decrease. Meat is increase, in 1995 is 18 kg and 2025 is 55 kg. Fruit is the same, 40 kg. I think people eat more meat because they have more money, and rice is not good for health so they eat less rice. In my country people also eat rice every day with family. Fruit is good for health and people should eat more fruit. Meat and fruit is increase but rice is decrease.`,
          notesVi:
            "TA: Chỉ khoảng 105 từ (thiếu so với 150), không có overview, số liệu sai ('Fruit is the same') và thêm ý kiến, lời khuyên mà đề không hỏi.\nCC: Cả bài là một khối không chia đoạn; ý nhảy qua lại giữa số liệu và ý kiến, chỉ nối bằng 'and/but/so'.\nLR: Từ rất cơ bản và lặp ('increase/decrease', 'eat'), chép lại từ của đề.\nGRA: Lỗi cấu trúc dày đặc ('rice is decrease', 'in 1995 is 18 kg', 'The graph show'), nhiều câu nối với nhau chỉ bằng dấu phẩy.",
        },
        {
          band: '5.5',
          text: `The line graph show the consumption of rice, meat and fruit per person in one country from 1995 to 2025.

Firstly, rice. In 1995 people eat 160 kg of rice per year. After that it decrease to 146 kg in 2005 and 128 kg in 2015. In 2025 it was only 110 kg. Rice is the highest food in the graph.

Secondly, meat. The meat consumption was 18 kg in 1995. It increased to 24 kg in 2000, 31 kg in 2005, 38 kg in 2010 and 46 kg in 2015. Moreover, it increased to 55 kg in 2025. Meat became higher than fruit in 2015.

Thirdly, fruit. Fruit was 40 kg in 1995 and it was still 40 kg in 2005. Moreover, it increased a little bit to 48 kg in 2025.

In conclusion, rice decreased but meat and fruit increased. Rice is still the most popular food in this country.`,
          notesVi:
            "TA: Số liệu đúng nhưng kể lần lượt từng năm một cách máy móc; overview chỉ xuất hiện ở câu kết và rất chung chung ('rice decreased but meat and fruit increased').\nCC: Có chia đoạn nhưng theo từng loại thực phẩm; 'Firstly/Secondly/Thirdly' và 'Moreover' dùng sai chức năng (Moreover không dùng để nối số liệu tiếp theo).\nLR: Vốn từ hạn chế, lặp 'increased' nhiều lần; 'the highest food' là cách dùng từ chưa chính xác.\nGRA: Phần lớn là câu đơn; sai thì và chia động từ ('The line graph show', 'people eat' cho năm 1995, 'it decrease').",
        },
        {
          band: '6.5',
          text: `The line graph illustrates how much rice, meat and fruit an average person in one country ate each year between 1995 and 2025.

Overall, rice was by far the most consumed food throughout the period, although its consumption fell steadily. In contrast, meat consumption increased significantly and overtook fruit, while the amount of fruit eaten rose only slightly.

In 1995, each person ate 160 kg of rice per year, which was four times higher than the figure for fruit (40 kg) and almost nine times the figure for meat (18 kg). Over the next thirty years, rice consumption declined gradually and reached 110 kg in 2025, a fall of nearly one third.

Meat showed the most dramatic change. It rose continuously from 18 kg to 38 kg in 2010 and overtook fruit between 2010 and 2015, before ending the period at 55 kg, which is three times more than in 1995. Fruit consumption, on the other hand, stayed quite stable at about 40 kg until 2005, and then it increased slowly to 48 kg in 2025.`,
          notesVi:
            "TA: Overview rõ (gạo cao nhất nhưng giảm, thịt vượt trái cây), số liệu chọn lọc và chính xác; một vài so sánh còn hơi máy móc.\nCC: 4 đoạn rõ ràng, nhóm dữ liệu hợp lý (gạo riêng; thịt và trái cây chung), từ nối đa dạng nhưng có chỗ nối dài bằng 'and then'.\nLR: Đủ từ chỉ xu hướng (declined gradually, overtook, the most dramatic change); 'four times higher than', 'three times more than' chưa thật chuẩn.\nGRA: Có câu phức (which…, before…, although…); lỗi nhỏ như lệch thì 'which is three times' (đúng: which was) không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Có đoạn overview (không có số) nêu 2 xu hướng chính không?',
            'Có nêu số đầu, số cuối và chỗ hai đường cắt nhau (thịt vượt trái cây) không?',
            'Số liệu có đúng biểu đồ và có đơn vị (kg) không?',
            'Bài có tránh ý kiến cá nhân và việc đoán nguyên nhân không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Bài có 4 đoạn: mở bài, overview, 2 thân bài không?',
            'Mỗi thân bài có gom các đường có xu hướng giống nhau (hoặc tách riêng đường nổi bật nhất) không?',
            'Câu có tránh bắt đầu liên tục bằng "Firstly / Moreover / Then" không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Câu mở bài có viết lại đề bằng từ của bạn không?',
            'Có dùng ít nhất 4 cách khác nhau để tả tăng / giảm / ổn định không?',
            'Có dùng "the figure for…" hoặc "consumption" để tránh lặp tên thực phẩm không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Các năm đã qua có dùng thì quá khứ đơn không?',
            'Có ít nhất 2 câu phức (while…, which…, before…) không?',
            'Giới từ với số liệu có đúng không (from… to, by, at)?',
          ],
        },
      ],
      planningHintsVi: [
        'Phút 0–3: tìm 3 điểm lớn — đường nào cao nhất, đường nào thay đổi nhiều nhất, có chỗ nào hai đường cắt nhau không.',
        'Mở bài: làm theo câu MỞ BÀI của bài mẫu — đổi "shows" thành "illustrates", đổi "the average amount of… eaten" thành "how much… an average person ate".',
        'Overview: bắt đầu bằng "Overall," + 2 ý lớn, không ghi số (xem câu OVERVIEW của bài mẫu).',
        'Thân bài 1: gạo (số 1995 → xu hướng → số 2025). Thân bài 2: thịt và trái cây — nhớ nêu thịt vượt trái cây giữa 2010 và 2015.',
        '3 phút cuối: đếm từ (≥ 150), soát thì quá khứ và đuôi -ed, đối chiếu lại từng con số.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2 — TASK 1: BIỂU ĐỒ CỘT (nấc 2: điền khuyết đoạn cuối của bài mẫu)
  // Bài mẫu khuyết: nam/nữ tập 5 môn thể thao. Đề tự viết: 3 dịch vụ online theo nhóm tuổi.
  // ==========================================================================
  {
    id: 'l3-i-wri-02',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: {
      vi: 'Task 1 – Biểu đồ cột: nhóm số liệu và so sánh',
      en: 'Task 1 – Bar charts: grouping data and making comparisons',
    },
    description: {
      vi: 'Nấc 2: tự hoàn thành đoạn cuối của bài mẫu, rồi viết bài cho một biểu đồ cột mới.',
      en: 'Step 2: complete the last paragraph of a model yourself, then write a report on a new bar chart.',
    },
    teachingCards: [
      {
        title: { vi: 'Nhóm số liệu, đừng tả từng cột', en: "Group the data – don't describe every bar" },
        body: {
          vi: 'Biểu đồ cột có nhiều cột → **chọn và nhóm**: cao nhất / thấp nhất, các cột giống nhau, ngoại lệ. Mỗi thân bài là **một nhóm**, không phải một cột.\nVD 5 môn thể thao × nam/nữ: thân bài 1 = môn nữ tập nhiều hơn hẳn, thân bài 2 = môn nam tập nhiều hơn và các môn gần bằng nhau.',
          en: 'Bar charts have many bars, so **select and group**: highest / lowest, similar bars, exceptions. Each body paragraph is **one group**, not one bar.\nE.g. 5 sports × men/women: Body 1 = sports women clearly preferred, Body 2 = sports men preferred and sports that were roughly equal.',
        },
        examples: [
          { en: 'Walking was the most popular activity for both sexes.', vi: 'Nhóm "cao nhất" — nói chung cho cả nam và nữ.' },
          {
            en: 'Participation in the other three activities was broadly similar for men and women.',
            vi: 'Gom 3 môn giống nhau vào 1 câu thay vì viết 3 câu.',
          },
        ],
      },
      {
        title: { vi: 'So sánh chính xác', en: 'Accurate comparisons' },
        body: {
          vi: '**Gấp mấy lần**: *twice as many as, three times as likely as*.\n**Chênh ít / nhiều**: *slightly higher than, far lower than*.\n**Đặt hai số cạnh nhau**: *while, whereas, compared with*.\n**Số gần đúng**: *just under half (48%), roughly a quarter (26%)*.\nSai hay gặp: "two times more higher", "the men is more than".',
          en: '**How many times**: *twice as many as, three times as likely as*.\n**Small / big gaps**: *slightly higher than, far lower than*.\n**Two figures side by side**: *while, whereas, compared with*.\n**Approximate figures**: *just under half (48%), roughly a quarter (26%)*.\nCommon errors: "two times more higher", "the men is more than".',
        },
        examples: [
          { en: 'Men were almost three times as likely as women to play team sports.', vi: 'Nam chơi thể thao đồng đội nhiều gần gấp ba nữ.' },
          { en: 'Almost three fifths of women walked regularly, whereas only a fifth swam.', vi: 'Gần 3/5 phụ nữ đi bộ đều đặn, trong khi chỉ 1/5 đi bơi.' },
        ],
      },
      {
        title: { vi: 'Bài mẫu khuyết đoạn cuối', en: 'Model with the last paragraph missing' },
        body: {
          vi: 'Đề mẫu: tỉ lệ nam và nữ ở một thành phố tập 5 môn thể thao ít nhất 1 lần/tuần (2024). Số liệu ở bên dưới. Đọc bài mẫu (phần "Model answer"), để ý cách **nhóm** số liệu, rồi tự điền 4 chỗ trống ở **đoạn cuối**.',
          en: 'Model task: the percentage of men and women in one city doing five types of exercise at least once a week (2024). The data is below. Read the model answer, notice how the figures are **grouped**, then fill the 4 gaps in **the last paragraph**.',
        },
        examples: [
          { en: 'Walking: women 58%, men 42%.', vi: 'Đi bộ' },
          { en: 'Cycling: men 30%, women 26%.', vi: 'Đạp xe' },
          { en: 'Swimming: women 20%, men 18%.', vi: 'Bơi' },
          { en: 'Gym: men 25%, women 24%.', vi: 'Tập gym' },
          { en: 'Team sports: men 35%, women 12%.', vi: 'Thể thao đồng đội' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-wri-02-model',
        title: 'Model answer – exercise habits of men and women (last paragraph has 4 gaps)',
        text: `The bar chart compares the proportion of men and women in one city who took part in five types of exercise at least once a week in 2024.

Overall, walking was the most popular activity for both sexes, while the largest gender gap was in team sports. Participation in the other three activities was broadly similar for men and women.

Walking was done by 58% of women, compared with 42% of men, making it the only activity in which women clearly outnumbered men. Swimming attracted only around a fifth of both groups (20% of women and 18% of men), which made it the least popular activity among men.

Men, (1) ___ the other hand, were almost three times as likely as women to play team sports (35% and 12% (2) ___). The figures for cycling and the gym were close: 30% of men cycled, (3) ___ was slightly higher than the figure for women (26%), and roughly a (4) ___ of each group used a gym.`,
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-02-ex01',
        type: 'multiple-choice',
        question: 'A bar chart shows the number of visitors to six museums. What is the best way to organise the two body paragraphs?',
        options: [
          'One short paragraph for each museum, in the order shown on the chart',
          'Body 1: the three most visited museums; Body 2: the three least visited',
          'Body 1: museums you like; Body 2: museums you do not like',
          'Describe only the most visited museum in detail',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Nhóm theo đặc điểm số liệu (cao / thấp) giúp bài mạch lạc và dễ so sánh.',
          en: 'Grouping by data features (high / low) makes the report logical and easy to compare.',
        },
      },
      {
        id: 'l3-i-wri-02-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối mỗi con số với cách nói gần đúng phù hợp nhất.',
          en: 'Match each figure with the best approximate expression.',
        },
        pairs: [
          { left: '48%', right: 'just under half' },
          { left: '26%', right: 'just over a quarter' },
          { left: '33%', right: 'one third' },
          { left: '74%', right: 'nearly three quarters' },
          { left: '21%', right: 'roughly a fifth' },
        ],
        explanation: {
          vi: 'just under = hơi dưới, just over = hơi trên, nearly / roughly = gần bằng.',
          en: '"Just under" is slightly below, "just over" slightly above, "nearly/roughly" means close to.',
        },
      },
      {
        id: 'l3-i-wri-02-ex03',
        type: 'fill-blank',
        passageId: 'l3-i-wri-02-model',
        sentence: 'Gap 1: Men, ___ the other hand, were almost three times as likely as women to play team sports.',
        acceptedAnswers: ['on'],
        explanation: {
          vi: '"On the other hand" chuyển sang nhóm đối lập: nữ trội đi bộ, nam trội thể thao đồng đội.',
          en: '"On the other hand" moves to the contrasting group: women led walking, men led team sports.',
        },
      },
      {
        id: 'l3-i-wri-02-ex04',
        type: 'fill-blank',
        passageId: 'l3-i-wri-02-model',
        sentence: 'Gap 2: …likely as women to play team sports (35% and 12% ___).',
        acceptedAnswers: ['respectively'],
        hint: '(lần lượt)',
        explanation: {
          vi: '"respectively" = lần lượt; ghép 2 con số với 2 nhóm theo đúng thứ tự.',
          en: '"Respectively" matches two figures to two groups in the same order.',
        },
      },
      {
        id: 'l3-i-wri-02-ex05',
        type: 'fill-blank',
        passageId: 'l3-i-wri-02-model',
        sentence: 'Gap 3: 30% of men cycled, ___ was slightly higher than the figure for women (26%).',
        acceptedAnswers: ['which'],
        explanation: {
          vi: '"which" thay cho cả ý trước (30% nam đạp xe), tránh lặp lại con số.',
          en: '"Which" refers back to the whole previous idea and avoids repetition.',
        },
      },
      {
        id: 'l3-i-wri-02-ex06',
        type: 'fill-blank',
        passageId: 'l3-i-wri-02-model',
        sentence: 'Gap 4: …and roughly a ___ of each group used a gym.',
        acceptedAnswers: ['quarter'],
        explanation: {
          vi: '25% và 24% đều gần bằng 1/4 → "roughly a quarter".',
          en: '25% and 24% are both close to one quarter.',
        },
      },
      {
        id: 'l3-i-wri-02-ex07',
        type: 'multiple-choice',
        question: 'Cars: 60% of trips. Buses: 30% of trips. Which sentence is correct?',
        options: [
          'Cars were used for twice as many trips as buses.',
          'Cars were two times more higher than buses.',
          'Buses were double less than cars.',
          'Cars were as twice popular as buses.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Cấu trúc đúng: twice / three times + as many / as much + as.',
          en: 'The correct pattern is twice / three times + as many / as much + as.',
        },
      },
      {
        id: 'l3-i-wri-02-ex08',
        type: 'speak-sentence',
        sentence: 'Thirty-five percent of men played team sports, compared with twelve percent of women.',
        translationVi: '35% nam giới chơi thể thao đồng đội, so với 12% nữ giới.',
        explanation: {
          vi: 'Đặt lưỡi giữa hai răng cho /θ/ ở "thirty"; đọc rõ /d/ ở "played, compared" và /s/ ở "sports".',
          en: 'Put your tongue between your teeth for "thirty"; say the endings of "played", "compared", "sports".',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-02-task',
      taskNumber: 1,
      prompt: `The bar chart below shows the percentage of adults in four age groups in one country who used three online services at least once a month in 2025.\n\n${TASK1_INSTRUCTION}\n\nWrite at least 150 words.`,
      chartData: {
        chartType: 'bar',
        title: 'Adults using online services at least once a month, by age group (2025)',
        unit: '% of each age group',
        labels: ['18–29', '30–44', '45–59', '60 and over'],
        series: [
          { name: 'Online banking', values: [78, 85, 64, 31] },
          { name: 'Food delivery apps', values: [72, 55, 30, 9] },
          { name: 'Video calls', values: [80, 74, 69, 62] },
        ],
      },
      minWords: 150,
      suggestedMinutes: 20,
      sampleAnswer: `The bar chart compares the proportion of adults in four age groups who used online banking, food delivery apps and video calls at least once a month in 2025.

Overall, younger adults were more likely to use all three services than older people. Video calls were the most evenly used service across the age groups, whereas the use of food delivery apps fell most dramatically with age.

Online banking was most popular among people aged 30 to 44, at 85%, slightly higher than the figure for the 18–29 group (78%). After that, the figure dropped to 64% for those aged 45 to 59 and to just under a third for the over-60s. Video calls followed a similar downward pattern, but the decline was much smaller, from 80% of the youngest group to 62% of the oldest, which made them the most common service for people over 60.

Food delivery apps, in contrast, showed the biggest difference between generations. While 72% of 18- to 29-year-olds ordered food online every month, only 9% of those aged 60 and above did so, roughly an eighth of the figure for the youngest group.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Online is very popular now. The chart is about online banking, food delivery apps and video calls in 2025. Young people they use a lot, old people use not much. 18-29 is 78%, 72%, 80%. 30-44 is 85%, 55% and 74%. 45-59 is 64% 30% 69%. 60+ is 31% 9% 62%. The online banking is highest is 85%. Old people not like food delivery because they like cooking at home and they don't know how to use the apps. In conclusion online services is good and young people use more than old people, I think it will increase in the future.`,
          notesVi:
            "TA: Khoảng 100 từ; chép một loạt con số mà không nói số đó của dịch vụ nào, không có overview rõ ràng, lại tự đoán lý do và dự đoán tương lai.\nCC: Không chia đoạn, các câu rời rạc, gần như không có từ nối ngoài 'and'.\nLR: Từ quá đơn giản ('use a lot', 'not much'), không biết cách gọi tên nhóm tuổi ('18-29 is…').\nGRA: Lỗi cơ bản ở hầu hết các câu ('Young people they use', 'Old people not like', 'The online banking is highest is 85%').",
        },
        {
          band: '5.5',
          text: `The bar chart show the percentage of adults who use three online services in 2025, it is divided by four age group.

For the 18-29 age group, 78% use online banking, 72% use food delivery apps and 80% use video calls. For the 30-44 age group, online banking is 85%, food delivery is 55% and video calls is 74%. So online banking is the highest in this group.

For the 45-59 group, the numbers are lower. Online banking is 64% and video calls is 69%, but food delivery is only 30%. For people over 60, online banking is 31%, food delivery is 9% and video calls is 62%, so video calls is the most popular for old people.

In general, young people use online services more than old people. Food delivery apps have the biggest decrease, from 72% to only 9%. However, video calls is popular in all age groups.`,
          notesVi:
            "TA: Có nêu xu hướng chung nhưng chỉ ở đoạn cuối; thân bài liệt kê gần như mọi con số theo từng nhóm tuổi mà ít so sánh.\nCC: Chia đoạn theo nhóm tuổi nên người đọc khó thấy xu hướng của từng dịch vụ; 'However' ở câu cuối chưa đúng logic đối lập.\nLR: Lặp 'use' và khuôn 'X is …%' nhiều lần; vốn từ so sánh hẹp.\nGRA: Dùng hiện tại cho số liệu năm 2025 (nên dùng quá khứ), lỗi hoà hợp chủ ngữ – động từ ('The bar chart show', 'video calls is') và một câu nối bằng dấu phẩy.",
        },
        {
          band: '6.5',
          text: `The bar chart compares the proportion of adults in four age groups who used online banking, food delivery apps and video calls at least once a month in 2025.

Overall, younger adults were more likely to use all three services than older people. Video calls were the most evenly used service across the age groups, whereas the use of food delivery apps fell most dramatically with age.

Online banking was most popular among people aged 30 to 44, at 85%, which was slightly higher than the 18–29 group (78%). After that, the figure dropped to 64% for those aged 45 to 59 and to just under a third for the over-60s. Video calls followed a similar pattern, but the decline was much smaller, from 80% of the youngest group to 62% of the oldest, so it was the most common service for people over 60.

Food delivery apps, in contrast, showed the biggest difference between generations. While 72% of 18- to 29-year-olds ordered food online every month, only 9% of those aged 60 and above did so, which is eight times less.`,
          notesVi:
            "TA: Overview rõ, chọn đúng đặc điểm chính (dịch vụ đều nhất, dịch vụ giảm mạnh nhất) và có số làm bằng chứng; đôi chỗ so sánh chưa thật chính xác.\nCC: Nhóm dữ liệu theo dịch vụ hợp lý, mạch bài rõ; từ nối đúng chỗ (After that, in contrast, While).\nLR: Gọi tên nhóm tuổi tự nhiên (the over-60s, those aged 45 to 59); 'eight times less' là cách nói chưa chuẩn.\nGRA: Câu phức đa dạng và phần lớn đúng; lỗi so sánh 'higher than the 18–29 group' (đúng: than the figure for…) không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Overview có nêu dịch vụ dùng đều nhất và dịch vụ giảm mạnh nhất theo tuổi không?',
            'Có so sánh giữa các nhóm tuổi (không chỉ liệt kê) không?',
            'Có bỏ bớt số không quan trọng thay vì chép hết 12 con số không?',
            'Các con số bạn trích có đúng biểu đồ không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Thân bài có chia theo dịch vụ có xu hướng giống nhau không?',
            'Có dùng "respectively", "which", "the figure for" để nối số liệu gọn gàng không?',
            'Từ nối có đúng logic (However chỉ dùng khi thật sự đối lập) không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có gọi tên nhóm tuổi tự nhiên ("those aged 45 to 59", "the over-60s") không?',
            'Có dùng cách nói gần đúng (just under a third, nearly half) không?',
            'Có tránh lặp động từ "use" quá 3 lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có dùng thì quá khứ cho năm 2025 một cách nhất quán không?',
            'Cấu trúc so sánh (twice as… as, higher than the figure for) có đúng không?',
            'Chủ ngữ số nhiều có đi với động từ số nhiều (video calls were) không?',
          ],
        },
      ],
      planningHintsVi: [
        'Tìm 2 ý cho overview: dịch vụ nào ít thay đổi nhất giữa các nhóm tuổi, dịch vụ nào giảm mạnh nhất.',
        'Mở bài: "The bar chart compares the proportion of adults in four age groups who…"',
        'Thân bài 1: online banking và video calls (đỉnh 85% ở nhóm 30–44; video calls giảm ít nhất). Thân bài 2: food delivery apps — chênh lệch lớn nhất.',
        'Chỉ chọn khoảng 8–10 con số quan trọng; dùng "respectively" để gộp số.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3 — TASK 1: HAI BIỂU ĐỒ TRÒN (nấc 2 khó hơn: điền khuyết HAI đoạn cuối)
  // Bài mẫu khuyết: nguồn điện 2000/2020. Đề tự viết: chi tiêu hộ gia đình 2005/2025.
  // ==========================================================================
  {
    id: 'l3-i-wri-03',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: {
      vi: 'Task 1 – Biểu đồ tròn: tỉ lệ và so sánh hai năm',
      en: 'Task 1 – Pie charts: proportions and comparing two years',
    },
    description: {
      vi: 'Nấc 2 (khó hơn): tự hoàn thành hai đoạn thân bài của bài mẫu, rồi viết trọn bài cho hai biểu đồ tròn mới.',
      en: 'Step 2 (harder): complete both body paragraphs of a model, then write a full report on two new pie charts.',
    },
    teachingCards: [
      {
        title: { vi: 'Ngôn ngữ tỉ lệ', en: 'Language for proportions' },
        body: {
          vi: 'Biểu đồ tròn = các phần của **một tổng 100%**. Dùng **account for, make up, represent** + %; **the largest / smallest share**; **a quarter, a fifth, one in ten**.\nCó 2 năm → so sánh **thay đổi**: *the share of X rose from 20% to 30%*. Chỉ 1 năm → **không** dùng "increase", chỉ so sánh lớn / nhỏ.',
          en: 'A pie chart shows the parts of **one 100% total**. Use **account for, make up, represent** + %; **the largest / smallest share**; **a quarter, a fifth, one in ten**.\nTwo years → compare **changes**: *the share of X rose from 20% to 30%*. One year only → **no** "increase"; just compare sizes.',
        },
        examples: [
          { en: 'Coal accounted for 40% of all electricity in 2020.', vi: 'Than chiếm 40% tổng lượng điện năm 2020.' },
          { en: 'Solar and wind made up just over a tenth of the mix.', vi: 'Điện mặt trời và gió chiếm hơn một phần mười một chút.' },
        ],
      },
      {
        title: { vi: 'Overview và cách nhóm cho 2 biểu đồ tròn', en: 'Overview and grouping for two pie charts' },
        body: {
          vi: 'Overview trả lời 2 câu: **phần nào lớn nhất** (có đổi ngôi không?) và **thay đổi nào lớn nhất**.\nThân bài: nhóm **phần tăng** và **phần giảm**, hoặc **phần lớn** và **phần nhỏ**.\nSo với mốc sau trong quá khứ → **quá khứ hoàn thành**: *By 2020, coal **had risen** to 40%.*',
          en: 'The overview answers two questions: **which part was largest** (did that change?) and **what changed most**.\nBody: group **parts that grew** and **parts that shrank**, or **large** and **small** parts.\nWith a later past point → **past perfect**: *By 2020, coal **had risen** to 40%.*',
        },
        examples: [
          { en: 'Overall, coal replaced hydropower as the main source of electricity.', vi: 'Overview: phần lớn nhất đổi ngôi.' },
          { en: 'By 2020, the share of gas had fallen to 15%.', vi: 'Đến năm 2020, tỉ trọng khí đốt đã giảm xuống 15%.' },
        ],
      },
      {
        title: { vi: 'Bài mẫu khuyết hai đoạn cuối', en: 'Model with the last two paragraphs gapped' },
        body: {
          vi: 'Đề mẫu: nguồn sản xuất điện của một nước năm 2000 và 2020 (số liệu bên dưới). Mở bài và overview đã hoàn chỉnh; bạn điền 4 chỗ trống trong **hai đoạn thân bài** của "Model answer".',
          en: 'Model task: sources of electricity in one country in 2000 and 2020 (data below). The introduction and overview are complete; you fill the 4 gaps in **the two body paragraphs** of the model answer.',
        },
        examples: [
          { en: 'Hydropower: 45% in 2000, 28% in 2020.', vi: 'Thuỷ điện' },
          { en: 'Coal: 30% in 2000, 40% in 2020.', vi: 'Nhiệt điện than' },
          { en: 'Gas: 20% in 2000, 15% in 2020.', vi: 'Khí đốt' },
          { en: 'Solar and wind: 0% in 2000, 12% in 2020.', vi: 'Điện mặt trời và gió' },
          { en: 'Other sources: 5% in both years.', vi: 'Nguồn khác' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-wri-03-model',
        title: 'Model answer – sources of electricity, 2000 and 2020 (both body paragraphs have gaps)',
        text: `The pie charts compare the sources used to generate electricity in one country in 2000 and 2020.

Overall, the country relied less on hydropower and more on coal over the twenty years, and coal replaced hydropower as the main source. Solar and wind power, which did not exist in 2000, had become a noticeable part of the mix by 2020.

In 2000, hydropower (1) ___ for 45% of all electricity, while coal made up 30% and gas a fifth. By 2020, however, the share of hydropower had fallen to 28%, and coal had risen to 40%.

Gas also became less important, (2) ___ from 20% to 15%. The most striking change was in solar and wind power, which grew from nothing to 12%, a figure close to that (3) ___ gas. Other sources remained (4) ___ at 5% in both years.`,
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-03-ex01',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối để tạo cụm từ (collocation) hay dùng cho biểu đồ tròn.',
          en: 'Match the halves to make common pie chart collocations.',
        },
        pairs: [
          { left: 'account', right: 'for 45% of the total' },
          { left: 'make', right: 'up almost a third' },
          { left: 'one in', right: 'ten households' },
          { left: 'remained', right: 'unchanged at 5%' },
          { left: 'the largest', right: 'share of spending' },
        ],
        explanation: {
          vi: 'account for, make up = chiếm; remain unchanged = giữ nguyên; one in ten = 10%.',
          en: '"Account for" and "make up" mean "form"; "remain unchanged" means stay the same.',
        },
      },
      {
        id: 'l3-i-wri-03-ex02',
        type: 'multiple-choice',
        question: 'Which is the best overview for the model (electricity sources, 2000 and 2020)?',
        options: [
          'Overall, hydropower was 45% and coal was 30% in 2000.',
          'Overall, coal overtook hydropower as the main source, and solar and wind became a noticeable part of the mix.',
          'Overall, electricity is very important for the country.',
          'Overall, all sources increased between 2000 and 2020.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Overview nêu phần lớn nhất đổi ngôi và thay đổi nổi bật, không có số.',
          en: 'It states the change in the largest part and the most striking change, without figures.',
        },
      },
      {
        id: 'l3-i-wri-03-ex03',
        type: 'fill-blank',
        passageId: 'l3-i-wri-03-model',
        sentence: 'Gap 1: In 2000, hydropower ___ for 45% of all electricity.',
        acceptedAnswers: ['accounted'],
        hint: '(account, quá khứ)',
        explanation: {
          vi: '"account for" + % = chiếm; năm 2000 đã qua nên dùng "accounted".',
          en: '"Account for" + percentage; 2000 is in the past, so use "accounted".',
        },
      },
      {
        id: 'l3-i-wri-03-ex04',
        type: 'fill-blank',
        passageId: 'l3-i-wri-03-model',
        sentence: 'Gap 2: Gas also became less important, ___ from 20% to 15%.',
        acceptedAnswers: ['falling', 'dropping', 'declining', 'decreasing'],
        hint: '(V-ing: giảm)',
        explanation: {
          vi: 'Mệnh đề V-ing bổ sung kết quả cho vế trước: became less important, falling…',
          en: 'An -ing clause adds the result: "became less important, falling from 20% to 15%".',
        },
      },
      {
        id: 'l3-i-wri-03-ex05',
        type: 'fill-blank',
        passageId: 'l3-i-wri-03-model',
        sentence: 'Gap 3: …which grew from nothing to 12%, a figure close to that ___ gas.',
        acceptedAnswers: ['for', 'of'],
        explanation: {
          vi: '"that for gas" = "the figure for gas"; "that" thay cho "figure" để tránh lặp.',
          en: '"That for gas" means "the figure for gas"; "that" avoids repeating "figure".',
        },
      },
      {
        id: 'l3-i-wri-03-ex06',
        type: 'fill-blank',
        passageId: 'l3-i-wri-03-model',
        sentence: 'Gap 4: Other sources remained ___ at 5% in both years.',
        acceptedAnswers: ['unchanged', 'stable', 'constant', 'the same'],
        explanation: {
          vi: 'Số giữ nguyên ở cả hai năm → "remained unchanged / stable at 5%".',
          en: 'The figure did not change, so "remained unchanged / stable at 5%".',
        },
      },
      {
        id: 'l3-i-wri-03-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'By 2020, the share of coal has risen to 40%.',
          'By 2020, the share of coal had risen to 40%.',
          'By 2020, the share of coal had rose to 40%.',
          'By 2020, the share of coal rising to 40%.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"By + mốc quá khứ" đi với quá khứ hoàn thành: had + V3 (risen).',
          en: '"By + a past time" takes the past perfect: had + past participle (risen).',
        },
      },
      {
        id: 'l3-i-wri-03-ex08',
        type: 'speak-sentence',
        sentence: 'Hydropower accounted for forty-five percent of the total.',
        translationVi: 'Thuỷ điện chiếm 45% tổng lượng điện.',
        explanation: {
          vi: '"accounted" kết thúc bằng /ɪd/ (thêm 1 âm tiết); "forty" nhấn âm đầu: FOR-ty.',
          en: '"Accounted" ends in /ɪd/, an extra syllable; stress "forty" on the first syllable.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-03-task',
      taskNumber: 1,
      prompt: `The pie charts below show how the average household in one city divided its monthly spending between six categories in 2005 and 2025.\n\n${TASK1_INSTRUCTION}\n\nWrite at least 150 words.`,
      chartData: {
        chartType: 'pie',
        title: 'Average monthly household spending in one city, 2005 and 2025',
        unit: '% of total spending',
        labels: ['Food', 'Housing', 'Transport', 'Education', 'Entertainment', 'Other'],
        series: [
          { name: '2005', values: [40, 20, 10, 12, 5, 13] },
          { name: '2025', values: [28, 30, 12, 16, 9, 5] },
        ],
      },
      minWords: 150,
      suggestedMinutes: 20,
      sampleAnswer: `The two pie charts illustrate how the average household in one city divided its monthly spending between six categories in 2005 and 2025.

Overall, food and housing were the two biggest expenses in both years, but housing replaced food as the largest one. Spending on education and entertainment became more significant, while the "other" category shrank considerably.

In 2005, food accounted for 40% of the household budget, which was twice the share spent on housing (20%). Twenty years later, the situation had reversed, with housing rising to 30% and food dropping to 28%, although the gap between the two was now only two percentage points.

Regarding the smaller categories, education rose from 12% to 16%, and entertainment almost doubled, from 5% to 9%. Transport remained relatively stable, at around a tenth of the budget in both years. The most significant fall was seen in other expenses, which decreased from 13% to only 5%. As a result, education became the third largest expense in 2025, overtaking the "other" category.`,
      bandSamples: [
        {
          band: '4.0',
          text: `The chart is about money of family. Food is 40% and 28%, it is decrease. Housing is 20 and 30, it is increase very much because the house is very expensive now. Transport 10% and 12%. Education is important for children so parent spend more for education, 12% to 16%. Entertainment is 5% and 9%. Other is 13% and 5%. I think in 2025 family spend more money for house and school than 2005. In Vietnam also same. We need to save money for the future.`,
          notesVi:
            "TA: Chưa tới 100 từ, đọc lần lượt từng cặp số mà không có overview; tự thêm lý do và lời khuyên ('We need to save money').\nCC: Không chia đoạn; câu này nối câu kia không theo trật tự nào.\nLR: Vốn từ rất hạn chế ('money of family', 'also same'); không dùng được từ chỉ tỉ lệ như 'share', 'proportion'.\nGRA: Phần lớn câu sai cấu trúc ('it is decrease', 'Transport 10% and 12%'), thiếu động từ và đuôi -s.",
        },
        {
          band: '5.5',
          text: `The pie charts shows the spending of household in one city in 2005 and 2025.

In 2005, food is the biggest part with 40%. Housing is 20%, education is 12%, other is 13%, transport is 10% and entertainment is the smallest with only 5%. Food and housing together is 60% of the spending.

In 2025, there are many big changes compared to 2005. Housing increase to 30% and become the biggest part. Food decrease to 28%, so it is now the second. Education increase to 16% and entertainment increase to 9%, it is almost double. Transport increase a little to 12%. However, other decrease a lot to 5%, it is the smallest part now.

Overall, people spend more money for housing, education and entertainment and less money for food and other. This is because the life in the city is more expensive and the house price is very high now.`,
          notesVi:
            "TA: Số liệu đúng và có overview, nhưng overview đặt ở cuối và kèm lời giải thích nguyên nhân mà đề không yêu cầu.\nCC: Chia đoạn theo năm (2005 rồi 2025) nên người đọc phải tự so sánh; các câu ngắn nối nhau đơn điệu, có câu nối bằng dấu phẩy.\nLR: Lặp 'increase / decrease' liên tục và khuôn 'is …%'; 'spend money for' là lỗi kết hợp từ (đúng: spend money on).\nGRA: Sai thì liên tục (hiện tại cho cả 2005 và 2025), thiếu hoặc thừa -s ('The pie charts shows', 'Housing increase').",
        },
        {
          band: '6.5',
          text: `The two pie charts illustrate how the average household in one city divided its monthly spending between six categories in 2005 and 2025.

Overall, food and housing were the two biggest expenses in both years, but housing replaced food as the largest one. Spending on education and entertainment became more significant, while the "other" category shrank considerably.

In 2005, food accounted for 40% of the household budget, which was twice the share spent on housing (20%). Twenty years later, the situation had reversed: the proportion for housing rose to 30%, whereas food dropped to 28%, although the gap between them was only two percentage points.

Regarding the smaller categories, education rose from 12% to 16% and entertainment almost doubled, from 5% to 9%. Transport stayed relatively stable, at around a tenth of the budget in both year. The most significant fall was seen in other expenses, which decreased from 13% to only 5%. As a result, education became the third largest expense in 2025, overtaking the "other" category.`,
          notesVi:
            "TA: Overview rõ (housing vượt food; education, entertainment tăng; 'other' giảm mạnh), so sánh hai năm đầy đủ và chính xác.\nCC: Nhóm hợp lý (hai phần lớn / các phần nhỏ), dùng whereas, Regarding… để dẫn dắt; tuy vậy cách chuyển đoạn còn khá đơn giản.\nLR: Dùng đúng từ tỉ lệ (accounted for, the share, the proportion, a tenth), có vài cụm hơi lặp (rose, rose).\nGRA: Câu phức và quá khứ hoàn thành dùng được; lỗi nhỏ 'in both year' và việc trộn 'had reversed' với 'rose' không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Overview có nói phần lớn nhất đã đổi ngôi (food → housing) không?',
            'Có nêu thay đổi lớn nhất (other giảm mạnh, entertainment gần gấp đôi) không?',
            'Có so sánh 2005 với 2025 thay vì tả từng biểu đồ riêng lẻ không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Thân bài có nhóm phần lớn (food, housing) và các phần nhỏ, hoặc phần tăng và phần giảm không?',
            'Có dùng "while / whereas" để đặt 2 con số cạnh nhau không?',
            'Câu đầu mỗi đoạn có cho biết đoạn đó nói về nhóm nào không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng account for / make up / the share of thay vì chỉ "is …%" không?',
            'Có viết "spend money on" (không phải "for") không?',
            'Có dùng phân số (a quarter, a tenth) ít nhất 1 lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có dùng quá khứ cho 2005 và 2025 một cách nhất quán không?',
            'Có ít nhất 1 câu dùng quá khứ hoàn thành hoặc mệnh đề V-ing không?',
            'Danh từ và động từ có đủ đuôi -s / -ed không?',
          ],
        },
      ],
      planningHintsVi: [
        'Đánh dấu 3 thay đổi lớn: housing vượt food; education và entertainment tăng; other giảm mạnh.',
        'Mở bài: "The pie charts illustrate how the average household… divided its monthly spending…"',
        'Overview: phần lớn nhất đổi ngôi + nhóm tăng / nhóm giảm (không có số).',
        'Thân bài 1: food và housing. Thân bài 2: các phần nhỏ — education, entertainment, transport, other.',
        'Kiểm tra: mọi con số bạn viết có đúng biểu đồ không.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4 — TASK 1: BẢNG SỐ LIỆU (nấc 3: tự viết, không còn bài mẫu)
  // Đề: số khách đến 5 điểm tham quan ở một thành phố biển, 2005 / 2015 / 2025.
  // ==========================================================================
  {
    id: 'l3-i-wri-04',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: {
      vi: 'Task 1 – Bảng số liệu: chọn lọc và so sánh',
      en: 'Task 1 – Tables: selecting and comparing key data',
    },
    description: {
      vi: 'Nấc 3: không còn bài mẫu — tự chọn số liệu quan trọng trong bảng và viết trọn bài.',
      en: 'Step 3: no model this time — select the key figures from a table and write the whole report yourself.',
    },
    teachingCards: [
      {
        title: { vi: 'Bảng nhiều số: chỉ chọn 8–10 số', en: 'Busy tables: choose only 8–10 figures' },
        body: {
          vi: 'Bảng có 15 số trở lên → **không chép hết**. Tìm: **cao nhất / thấp nhất**, **thay đổi lớn nhất**, **ngoại lệ** (cái duy nhất giảm), **thứ hạng thay đổi**. Mỗi thân bài dùng 3–4 số làm bằng chứng.\nViết số lớn gọn: *850,000*, *1.65 million*.',
          en: 'A table with 15+ figures → **do not copy them all**. Look for the **highest / lowest**, the **biggest change**, any **exception** (the only one that fell) and **changes in ranking**. Use 3–4 figures as evidence in each body paragraph.\nWrite big numbers neatly: *850,000*, *1.65 million*.',
        },
        examples: [
          { en: 'The north was the only region where sales fell.', vi: 'Ngoại lệ — vùng duy nhất doanh số giảm.' },
          { en: 'Online sales rose more than fivefold over the decade.', vi: 'Thay đổi lớn nhất — tăng hơn 5 lần.' },
        ],
      },
      {
        title: { vi: 'So sánh mà không lặp từ', en: 'Comparing without repeating words' },
        body: {
          vi: 'Dùng **that / those** thay cho danh từ: *prices in 2025 were higher than **those** in 2015*.\nXếp hạng: **followed by**, **the second most…**, **respectively**.\nĐổi chủ ngữ để tránh lặp: *the aquarium → this attraction → it → the figure for the aquarium*.',
          en: 'Use **that / those** to replace nouns: *prices in 2025 were higher than **those** in 2015*.\nRanking: **followed by**, **the second most…**, **respectively**.\nVary the subject to avoid repetition: *the aquarium → this attraction → it → the figure for the aquarium*.',
        },
        examples: [
          { en: 'City A had the most rainy days, followed by City C.', vi: 'Thành phố A có nhiều ngày mưa nhất, tiếp theo là thành phố C.' },
          { en: 'Sales in 2025 were double those in 2015.', vi: 'Doanh số năm 2025 gấp đôi doanh số năm 2015.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-04-ex01',
        type: 'multiple-choice',
        question: 'A table shows the populations of five towns in 2000, 2010 and 2020 (15 figures). Which plan is best?',
        options: [
          'Report all 15 figures so that nothing is missed.',
          'Choose the highest, the lowest, the biggest change and any town that went against the trend.',
          'Report only the figures for 2020.',
          'Explain why each town grew or shrank.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Giám khảo chấm việc chọn đặc điểm chính, không chấm việc chép đủ số.',
          en: 'Examiners reward selecting key features, not copying every number.',
        },
      },
      {
        id: 'l3-i-wri-04-ex02',
        type: 'fill-blank',
        sentence: 'Tuesday had the most customers, ___ by Friday.',
        acceptedAnswers: ['followed'],
        explanation: {
          vi: '"followed by" = tiếp theo là; dùng để xếp hạng.',
          en: '"Followed by" shows the next item in a ranking.',
        },
      },
      {
        id: 'l3-i-wri-04-ex03',
        type: 'arrange-words',
        translationVi: 'Con số của thành phố B cao hơn đáng kể so với con số của thành phố C.',
        correctSentence: 'The figure for City B was considerably higher than that for City C.',
        extraWords: ['those'],
        explanation: {
          vi: '"that for City C" thay cho "the figure for City C", tránh lặp "figure".',
          en: '"That for City C" replaces "the figure for City C" to avoid repetition.',
        },
      },
      {
        id: 'l3-i-wri-04-ex04',
        type: 'multiple-choice',
        question: 'Ticket prices in 2025 were much higher than ___ in 2015.',
        options: ['that', 'those', 'it', 'them'],
        correctIndex: 1,
        explanation: {
          vi: '"prices" là số nhiều → dùng "those".',
          en: '"Prices" is plural, so use "those".',
        },
      },
      {
        id: 'l3-i-wri-04-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm từ trong đề với cách viết lại (paraphrase) cho câu mở bài.',
          en: 'Match each phrase from a task with its paraphrase for the introduction.',
        },
        pairs: [
          { left: 'the number of visitors', right: 'how many people visited' },
          { left: 'per year', right: 'annually' },
          { left: 'the percentage of students', right: 'the proportion of learners' },
          { left: 'in three countries', right: 'across three nations' },
          { left: 'average spending', right: 'how much was spent on average' },
        ],
        explanation: {
          vi: 'Mở bài viết lại đề bằng từ đồng nghĩa hoặc đổi cấu trúc câu.',
          en: 'Paraphrase the task with synonyms or a different structure.',
        },
      },
      {
        id: 'l3-i-wri-04-ex06',
        type: 'fill-blank',
        sentence: 'The zoo and the museum attracted 2.1 million and 1.4 million visitors ___.',
        acceptedAnswers: ['respectively'],
        explanation: {
          vi: '"respectively" ghép số với địa điểm theo đúng thứ tự.',
          en: '"Respectively" matches the figures to the places in order.',
        },
      },
      {
        id: 'l3-i-wri-04-ex07',
        type: 'speak-sentence',
        sentence: 'The figures for both months were much higher than those for March.',
        translationVi: 'Số liệu của cả hai tháng đều cao hơn nhiều so với tháng Ba.',
        explanation: {
          vi: '"months" có cụm cuối /nθs/: đọc chậm rồi nhanh dần; "both" kết thúc bằng /θ/, không phải /t/.',
          en: '"Months" ends in /nθs/; "both" ends in /θ/, not /t/. Say them slowly first.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-04-task',
      taskNumber: 1,
      prompt: `The table below shows the number of visitors to five tourist attractions in a coastal city in 2005, 2015 and 2025. (The cable car opened in 2012.)\n\n${TASK1_INSTRUCTION}\n\nWrite at least 150 words.`,
      chartData: {
        chartType: 'table',
        title: 'Visitors to five attractions in a coastal city, 2005–2025',
        unit: 'thousand visitors',
        labels: ['Beach park', 'Aquarium', 'Night market', 'History museum', 'Cable car (opened 2012)'],
        series: [
          { name: '2005', values: [850, 300, 150, 260, 0] },
          { name: '2015', values: [1200, 520, 480, 240, 350] },
          { name: '2025', values: [1650, 610, 920, 210, 780] },
        ],
      },
      minWords: 150,
      suggestedMinutes: 20,
      sampleAnswer: `The table shows how many people visited five attractions in a coastal city in 2005, 2015 and 2025.

Overall, the beach park was the most popular attraction in all three years, and visitor numbers rose at every attraction except the history museum. The night market and the cable car saw the most rapid growth.

The beach park attracted 850,000 visitors in 2005, and this figure nearly doubled to 1.65 million by 2025. The aquarium also became more popular, although its growth was slower, from 300,000 to 610,000. In contrast, the history museum was the only place that lost visitors, falling gradually from 260,000 to 210,000.

The night market showed the most remarkable increase. It had only 150,000 visitors in 2005 but over six times as many in 2025 (920,000), making it the second most visited attraction. Similarly, the cable car, which opened in 2012, welcomed 350,000 people in 2015 and more than twice as many, 780,000, ten years later.`,
      bandSamples: [
        {
          band: '4.0',
          text: `This table is show visitors of five place in city. Beach park is very popular and many people go there because the beach is beautiful and cheap. Night market is also popular, young people like to go night market to eat street food. Museum is not popular, it is boring for young people, 260 and 210. Cable car is new so 0 in 2005. Aquarium is 300, 520, 610. All place is increase except museum. I think the city should make more attraction for tourist.`,
          notesVi:
            "TA: Khoảng 90 từ, gần như không so sánh số liệu mà tự đoán lý do (đẹp, rẻ, chán) và kết thúc bằng lời khuyên.\nCC: Không chia đoạn; mỗi câu nói một điểm rời rạc, không theo trật tự.\nLR: Từ đơn giản, lặp 'popular', 'people'; dùng sai từ ('This table is show').\nGRA: Lỗi cơ bản nhiều ('All place is increase', 'go night market', thiếu -s số nhiều), nhiều câu chỉ là cụm số.",
        },
        {
          band: '5.5',
          text: `The table give information about the number of visitors to five places in a coastal city in 2005, 2015 and 2025.

The beach park had the highest number of visitors. In 2005 it had 850,000 visitors, in 2015 it had 1,200,000 visitors and in 2025 it had 1,650,000 visitors. The aquarium had 300,000 visitors in 2005, 520,000 visitors in 2015 and 610,000 visitors in 2025, so it increased about 300,000 visitors in twenty years. The night market had 150,000, 480,000 and 920,000 visitors, so it increased very fast.

The history museum is different. It decreased from 260,000 to 240,000 and 210,000. It is the only place that decreased. The cable car didn't have visitors in 2005 because it opened in 2012. Then it increased to 350,000 and 780,000 visitors.

In conclusion, most of the places increased the visitors except the museum, and the beach park was always the most popular place.`,
          notesVi:
            "TA: Chép gần như toàn bộ 15 con số thay vì chọn đặc điểm chính; overview cuối bài còn sơ sài.\nCC: Chia đoạn hợp lý (tăng / khác biệt) nhưng câu lặp một khuôn 'In 2005 it had…'; ít từ nối và từ thay thế.\nLR: Lặp 'visitors' hơn 10 lần; 'increased the visitors' là cách dùng từ sai (đúng: visitor numbers increased).\nGRA: Câu đơn chiếm đa số và khá đúng, nhưng có lỗi chia động từ ('The table give') và lẫn thì hiện tại ('The history museum is different').",
        },
        {
          band: '6.5',
          text: `The table shows how many people visited five attractions in a coastal city in 2005, 2015 and 2025.

Overall, the beach park was the most popular attraction in all three years, and visitor numbers rose at every attraction except the history museum. The night market and the cable car saw the most rapid growth.

The beach park attracted 850,000 visitors in 2005, and this figure nearly doubled to 1.65 million by 2025. The aquarium also became more popular, although it's growth was slower, from 300,000 to 610,000. In contrast, the history museum was the only place which lost visitors, falling gradually from 260,000 to 210,000.

The night market showed the most remarkable increase. It had only 150,000 visitors in 2005 but over six times as many in 2025 (920,000), making it the second most visited attraction. Similarly, the cable car, which opened in 2012, welcomed 350,000 people in 2015 and 780,000 ten years later, it was more than double.`,
          notesVi:
            "TA: Overview đúng trọng tâm (đông nhất, ngoại lệ giảm, hai nơi tăng nhanh nhất), chọn số làm bằng chứng tốt và có nhắc năm mở cáp treo.\nCC: Nhóm theo xu hướng hợp lý, có từ nối và từ thay thế (this figure, It, Similarly); đôi chỗ chuyển ý còn hơi đơn điệu.\nLR: Từ so sánh chính xác (nearly doubled, six times as many, the second most visited); lỗi chính tả 'it's growth' (đúng: its).\nGRA: Câu phức đa dạng (although…, which…, making…), còn lỗi nối câu bằng dấu phẩy ở câu cuối nhưng không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Có overview nêu điểm tham quan đông nhất và ngoại lệ (bảo tàng giảm) không?',
            'Có nêu 2 nơi tăng nhanh nhất (chợ đêm, cáp treo) kèm số làm bằng chứng không?',
            'Có nhắc cáp treo mở năm 2012 (nên năm 2005 không có khách) không?',
            'Có chọn lọc khoảng 8–10 số thay vì chép cả 15 số không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Thân bài có nhóm các nơi theo xu hướng (tăng đều / tăng mạnh / giảm) không?',
            'Có dùng "this figure", "it", "the latter" để tránh lặp tên địa điểm không?',
            'Từ chuyển ý (In contrast, Similarly) có đặt đúng chỗ không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có viết số lớn gọn gàng (1.65 million, 850,000) không?',
            'Có dùng ít nhất 2 cách nói "gấp bao nhiêu lần" (nearly doubled, six times as many) không?',
            'Có tránh lặp từ "visitors" quá nhiều lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có dùng thì quá khứ cho các năm 2005–2025 không?',
            'Có câu phức với which / making / although không?',
            'Có tránh nối hai câu hoàn chỉnh chỉ bằng dấu phẩy không?',
          ],
        },
      ],
      planningHintsVi: [
        'Đọc theo hàng: mỗi nơi tăng hay giảm, gấp mấy lần? Đọc theo cột: năm 2025 xếp hạng thế nào?',
        'Overview: nơi đông nhất cả 3 năm + gần như tất cả đều tăng, trừ một nơi.',
        'Tự quyết định cách nhóm 5 địa điểm cho 2 thân bài (gợi ý: tăng ổn định / tăng vọt / giảm).',
        'Không viết lý do vì sao khách thích hay không thích một nơi.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 5 — TASK 1: QUY TRÌNH (nấc 3: tự viết trong 20 phút)
  // Đề: quy trình làm bánh tráng (rice paper). Không có chartData — các bước ghi trong đề.
  // ==========================================================================
  {
    id: 'l3-i-wri-05',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: {
      vi: 'Task 1 – Quy trình: câu bị động và từ chỉ trình tự',
      en: 'Task 1 – Processes: the passive and sequencing',
    },
    description: {
      vi: 'Nấc 3: tự viết trọn bài mô tả một quy trình trong 20 phút, chỉ dựa vào dàn ý của bạn.',
      en: 'Step 3: write a full process description in 20 minutes from your own plan.',
    },
    teachingCards: [
      {
        title: { vi: 'Câu bị động cho quy trình', en: 'The passive for processes' },
        body: {
          vi: 'Quy trình nhân tạo tập trung vào **việc được làm**, không phải ai làm → dùng **bị động hiện tại**: **is / are + V3**.\n*The rice **is soaked** for six hours.*\nRút gọn: *After **being dried**, the sheets are cut.* / *Once **cooked**, the sheet is lifted off.*\nSai hay gặp: "The rice soaked", "is soak".',
          en: 'Man-made processes focus on **what is done**, not who does it → use the **present passive**: **is / are + past participle**.\n*The rice **is soaked** for six hours.*\nShort forms: *After **being dried**, the sheets are cut.* / *Once **cooked**, the sheet is lifted off.*\nCommon errors: "The rice soaked", "is soak".',
        },
        examples: [
          { en: 'The beans are washed and then dried in the sun.', vi: 'Hạt được rửa sạch rồi phơi nắng.' },
          { en: 'Once roasted, the beans are ground into powder.', vi: 'Sau khi rang, hạt được xay thành bột.' },
        ],
      },
      {
        title: { vi: 'Overview và từ trình tự', en: 'Overview and sequencing' },
        body: {
          vi: 'Overview của quy trình: **có bao nhiêu bước**, **bắt đầu và kết thúc** bằng gì (có phải chu trình lặp lại không).\nĐổi từ trình tự: **First, Next, After that, Once…, Following this, Finally** — đừng mở mọi câu bằng "Then".\nChia thân bài: **nửa đầu / nửa sau** của quy trình.',
          en: 'A process overview says **how many stages** there are and **how it begins and ends** (and whether it is a cycle).\nVary your sequencers: **First, Next, After that, Once…, Following this, Finally** — do not start every sentence with "Then".\nSplit the body into the **first half / second half** of the process.',
        },
        examples: [
          {
            en: 'Overall, there are eight stages, beginning with harvesting the beans and ending with packaging.',
            vi: 'Overview: số bước + điểm đầu + điểm cuối.',
          },
          { en: 'Once the beans have been cleaned, they are spread out to dry.', vi: '"Once" + bị động hoàn thành: sau khi đã được làm sạch.' },
        ],
      },
      {
        title: { vi: 'Viết trong 20 phút', en: 'Writing in 20 minutes' },
        body: {
          vi: '**3 phút**: đọc đề, đánh số các bước, chia 2 nhóm.\n**14 phút**: viết 4 đoạn (khoảng 160–180 từ).\n**3 phút**: soát is/are + V3, đuôi -s số nhiều, từ trình tự không lặp.\nĐồng hồ chỉ là trợ lý: thu nhỏ được, chỉ nhắc khi **còn 5 phút**.',
          en: '**3 minutes**: read the task, number the stages, split them into two groups.\n**14 minutes**: write four paragraphs (about 160–180 words).\n**3 minutes**: check is/are + past participle, plural -s and varied sequencers.\nThe timer is only a helper: minimise it; it reminds you at **5 minutes left**.',
        },
        examples: [
          { en: 'Stages 1 to 4: growing and picking. Stages 5 to 8: processing and packing.', vi: 'Ví dụ chia 8 bước thành 2 nhóm cho 2 thân bài.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-05-ex01',
        type: 'multiple-choice',
        question: 'Which sentence describes a stage of a man-made process correctly?',
        options: [
          'The leaves pick by hand.',
          'The leaves are picked by hand.',
          'The leaves are pick by hand.',
          'People are picking the leaves by hand.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Bị động hiện tại: are + V3 (picked). Thiếu "are" hoặc thiếu -ed đều sai.',
          en: 'Present passive: are + past participle. Missing "are" or "-ed" is wrong.',
        },
      },
      {
        id: 'l3-i-wri-05-ex02',
        type: 'fill-blank',
        sentence: 'After ___ dried, the sheets are cut into circles.',
        acceptedAnswers: ['being'],
        explanation: {
          vi: '"After being + V3" = sau khi được…; mệnh đề bị động rút gọn.',
          en: '"After being + past participle" is a short passive clause.',
        },
      },
      {
        id: 'l3-i-wri-05-ex03',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối động từ với dạng V3 (quá khứ phân từ) để viết câu bị động.',
          en: 'Match each verb with its past participle for passive sentences.',
        },
        pairs: [
          { left: 'grind', right: 'ground' },
          { left: 'leave', right: 'left' },
          { left: 'send', right: 'sent' },
          { left: 'lay', right: 'laid' },
          { left: 'take', right: 'taken' },
        ],
        explanation: {
          vi: 'Động từ bất quy tắc hay gặp trong đề quy trình; sai V3 là mất điểm ngữ pháp.',
          en: 'These irregular verbs are common in process tasks; wrong forms lose grammar marks.',
        },
      },
      {
        id: 'l3-i-wri-05-ex04',
        type: 'multiple-choice',
        question: 'Which paragraph uses sequencing language best?',
        options: [
          'Then the rice is washed. Then it is soaked. Then it is ground. Then it is cooked.',
          'First, the rice is washed and soaked. Next, it is ground into a liquid, which is then cooked.',
          'Firstly, the rice washed. Secondly, soaked. Thirdly, ground.',
          'The rice is washed, it is soaked, it is ground, it is cooked.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Đổi từ trình tự và dùng "which" để nối hai bước, tránh lặp "Then".',
          en: 'Varied sequencers and "which" join stages smoothly without repeating "Then".',
        },
      },
      {
        id: 'l3-i-wri-05-ex05',
        type: 'arrange-words',
        translationVi: 'Nhìn chung, quy trình có tám bước, bắt đầu bằng việc hái hạt cà phê.',
        correctSentence: 'Overall, there are eight stages in the process, beginning with picking the beans.',
        extraWords: ['begin'],
        explanation: {
          vi: 'Overview của quy trình: số bước + bước đầu tiên (và bước cuối).',
          en: 'A process overview gives the number of stages and how it starts (and ends).',
        },
      },
      {
        id: 'l3-i-wri-05-ex06',
        type: 'fill-blank',
        sentence: 'Once the beans ___ been cleaned, they are spread out to dry.',
        acceptedAnswers: ['have'],
        explanation: {
          vi: '"Once + have been + V3" nhấn mạnh bước trước phải xong mới đến bước sau.',
          en: '"Once they have been cleaned" shows one stage must finish before the next.',
        },
      },
      {
        id: 'l3-i-wri-05-ex07',
        type: 'speak-sentence',
        sentence: 'The sheets are steamed, dried and finally packed in bags.',
        translationVi: 'Những tấm bánh được hấp, phơi khô và cuối cùng đóng vào túi.',
        explanation: {
          vi: 'Đuôi -ed: steamed /d/, dried /d/, packed /t/; "bags" kết thúc bằng /gz/.',
          en: 'The -ed endings: steamed /d/, dried /d/, packed /t/; "bags" ends in /gz/.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-05-task',
      taskNumber: 1,
      prompt: `The diagram below shows the stages in the production of rice paper, a thin sheet that is used to wrap food.

Stages shown in the diagram:
1. Soak rice grains in water (6 hours)
2. Grind the soaked rice with water to make a smooth batter
3. Add salt and tapioca flour; mix
4. Spread a thin layer of batter on a cloth stretched over a pot of boiling water
5. Steam (about 30 seconds)
6. Lift the sheet off with a bamboo stick and place it on a bamboo rack
7. Dry the racks in the sun (3 to 4 hours)
8. Remove the dry sheets, check them and cut them into circles
9. Pack in bags of 50 and deliver to shops

${TASK1_INSTRUCTION}

Write at least 150 words.`,
      minWords: 150,
      suggestedMinutes: 20,
      sampleAnswer: `The diagram illustrates the process of making rice paper, a thin sheet which is used to wrap food.

Overall, there are nine stages in the process, which begins with soaking rice grains and ends with the finished sheets being packed and delivered to shops. The process relies on steam for cooking and natural sunlight for drying.

First, rice grains are soaked in water for around six hours before they are ground together with water to produce a smooth batter. Next, salt and tapioca flour are added and the mixture is stirred well. After that, a thin layer of this batter is spread on a cloth, which is stretched over a pot of boiling water, and it is steamed for about 30 seconds.

Once the sheet is cooked, it is lifted off with a bamboo stick and placed on a bamboo rack. The racks are then left in the sun for three to four hours to dry. Finally, the dry sheets are removed, checked and cut into circles before being packed in bags of fifty and sent to shops.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Rice paper is very popular food in Vietnam. Many people eat rice paper with spring roll and grilled meat. To make rice paper, firstly rice is soak. Secondly is grind with water. Thirdly add salt and flour. Then spread on cloth and steam. Then dry in the sun. My grandmother also make rice paper in my hometown, it is very hard work and she wake up very early. Finally pack and sell to the shop. Rice paper is cheap and delicious, everybody should try it.`,
          notesVi:
            "TA: Chưa tới 100 từ, bỏ sót nhiều bước (nhấc bánh lên giàn, cắt tròn, đóng 50 tấm/túi), thêm chuyện cá nhân và lời khuyên không liên quan.\nCC: Một đoạn duy nhất; 'Firstly / Secondly / Thirdly / Then' dùng máy móc và chen ý cá nhân vào giữa các bước.\nLR: Rất ít từ của quy trình; nhiều câu chỉ là ghi chú ('Then dry in the sun').\nGRA: Nhiều câu thiếu chủ ngữ hoặc động từ ('Secondly is grind'), bị động sai ('rice is soak'), thiếu -s ('my grandmother also make').",
        },
        {
          band: '5.5',
          text: `The diagram shows how to make rice paper. There are many steps in this process and it is quite complicated.

First, the rice is soak in water for about 6 hours. Then, people grind the rice with water to make a liquid. Then, they add salt and tapioca flour and mix it. Then, they spread the liquid on a cloth over a pot of boiling water and steam it for 30 seconds, so the sheet is cooked.

After that, they use a bamboo stick to lift the sheet and put it on a bamboo rack. Then they put the racks in the sun about 3-4 hours. Then the sheets are dry and they take it out and check it and cut into circle. Finally they pack 50 sheets in a bag and send to shops to sell.

In conclusion, making rice paper have nine steps and it takes a long time.`,
          notesVi:
            "TA: Tả đủ 9 bước và đúng thứ tự, nhưng overview ('many steps') quá chung và chỉ được nói rõ hơn ở kết bài.\nCC: Lạm dụng 'Then' (5 lần) và chuỗi 'and… and…'; chia đoạn hợp lý nhưng câu nối đơn điệu.\nLR: Đủ từ để hiểu nhưng lặp 'put', 'it'; thiếu từ chuyên cho quy trình (batter, layer, mixture).\nGRA: Chủ yếu dùng chủ động với 'people / they' thay vì bị động; câu bị động duy nhất lại sai ('rice is soak'); lỗi số ít / số nhiều ('cut into circle', 'making rice paper have').",
        },
        {
          band: '6.5',
          text: `The diagram illustrates the process of making rice paper, a thin sheet which is used to wrap food.

Overall, there are nine stages in the process, which begins with soaking rice grains and ends with the finished sheets being packed and delivered to shops. The process relies on steam for cooking and natural sunlight for drying.

First, rice grains are soaked in water for around six hours before they are ground together with water to produce a smooth batter. Next, salt and tapioca flour are added and the mixture is stirred well. After that, a thin layer of this batter is spread on a cloth, which is stretched over a pot of boiling water, and it is steamed for about 30 seconds.

Once the sheet is cooked, it is lifted off with a bamboo stick and place on a bamboo rack. The racks are then left in the sun for three to four hours to dry. Finally, the dry sheets are taken off, checked and cut into circles, and they are packed in bags of fifty and sent to shops.`,
          notesVi:
            "TA: Overview rõ (9 bước, điểm đầu – điểm cuối, dùng hơi nước và nắng), mọi bước đều có mặt kèm chi tiết thời gian.\nCC: Chia đôi quy trình hợp lý, từ trình tự đa dạng (First, Next, After that, Once…, Finally); câu cuối nối bằng 'and' hơi dài.\nLR: Dùng đúng từ của quy trình (soaked, ground, batter, layer, rack), vốn từ đủ nhưng chưa thật đa dạng.\nGRA: Bị động dùng nhất quán và phần lớn đúng; lỗi nhỏ 'lifted off… and place' (đúng: placed) không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            'Overview có nói số bước, bước đầu và bước cuối không?',
            'Có nhắc đủ 9 bước, không bỏ bước nào không?',
            'Có giữ các chi tiết quan trọng (6 tiếng, 30 giây, 3–4 tiếng, 50 tấm/túi) không?',
            'Bài có tránh kể chuyện cá nhân và lời khuyên không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Hai thân bài có chia quy trình thành 2 nửa hợp lý không?',
            'Có dùng ít nhất 4 từ trình tự khác nhau (First, Next, Once, Finally…) không?',
            'Có nối 2 bước trong 1 câu (before…, which…) ít nhất 2 lần không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng đúng từ của quy trình (soak, grind, batter, steam, rack) không?',
            'Có tránh lặp "put / do / make" không?',
            'Mở bài có viết lại đề chứ không chép nguyên văn không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Mọi bước có dùng bị động is / are + V3 đúng không?',
            'V3 bất quy tắc (ground, spread, left, cut, sent) có đúng không?',
            'Có ít nhất 1 cấu trúc rút gọn (Once cooked, After being dried) không?',
          ],
        },
      ],
      planningHintsVi: [
        'Đánh số 9 bước và tự chia thành 2 nhóm cho 2 thân bài.',
        'Overview: "Overall, there are nine stages…, beginning with… and ending with…"',
        'Đổi nhãn ngắn trong đề thành câu bị động đầy đủ: "Soak rice grains" → "Rice grains are soaked…".',
        'Bấm giờ 20 phút: 3 phút lập dàn ý, 14 phút viết, 3 phút soát is / are + V3.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 6 — TASK 2: OPINION (agree/disagree) (nấc 1: đoạn mẫu PEEL có chú thích)
  // Đề mẫu trong thẻ: học nấu ăn ở trường. Đề tự viết: trường tiểu học bỏ bài tập về nhà.
  // ==========================================================================
  {
    id: 'l3-i-wri-06',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 60,
    title: {
      vi: 'Task 2 – Bài nêu quan điểm: luận điểm rõ và đoạn PEEL',
      en: 'Task 2 – Opinion essays: a clear thesis and PEEL paragraphs',
    },
    description: {
      vi: 'Nấc 1: học từ đoạn văn mẫu có chú thích từng câu, rồi tự viết bài đồng ý / không đồng ý.',
      en: 'Step 1: study a model paragraph annotated sentence by sentence, then write your own agree/disagree essay.',
    },
    teachingCards: [
      {
        title: { vi: 'Luận điểm (thesis): trả lời thẳng câu hỏi', en: 'The thesis: answer the question directly' },
        body: {
          vi: '"To what extent do you agree or disagree?" → nói rõ **mức độ**: *completely agree / partly agree / strongly disagree*.\nThesis nằm **cuối mở bài** và **giữ nguyên** đến kết bài. Không có thesis rõ → TR khó vượt band 5.\nTránh: *"This essay will discuss both sides"* — câu này không phải quan điểm.',
          en: '"To what extent do you agree or disagree?" → state your **extent**: *completely agree / partly agree / strongly disagree*.\nThe thesis goes **at the end of the introduction** and **stays the same** until the conclusion. No clear thesis → TR rarely goes above 5.\nAvoid: *"This essay will discuss both sides"* — that is not a position.',
        },
        examples: [
          { en: 'I completely agree that cooking should be a compulsory school subject.', vi: 'Thesis rõ mức độ: hoàn toàn đồng ý.' },
          {
            en: 'Although cooking lessons are useful, I disagree that they should replace science classes.',
            vi: 'Thesis có nhượng bộ (Although…) nhưng vẫn rõ là không đồng ý.',
          },
        ],
      },
      {
        title: { vi: 'Đoạn thân bài PEEL', en: 'PEEL body paragraphs' },
        body: {
          vi: '**P – Point**: câu chủ đề, 1 ý chính.\n**E – Explain**: giải thích vì sao / như thế nào.\n**E – Example**: ví dụ cụ thể (con số, tình huống thật).\n**L – Link**: nối lại với thesis.\n**Một ý được phát triển kỹ** tốt hơn ba ý liệt kê. Liệt kê nhiều ý ngắn là dấu hiệu của band 5.',
          en: '**P – Point**: the topic sentence, one main idea.\n**E – Explain**: say why or how.\n**E – Example**: a specific example (a figure, a real situation).\n**L – Link**: connect back to the thesis.\n**One well-developed idea** beats three listed ideas. Listing many short ideas is a band 5 sign.',
        },
        examples: [
          {
            en: "The main reason is that cooking lessons improve teenagers' health.",
            vi: 'Câu Point: nêu đúng 1 ý chính cho cả đoạn.',
          },
        ],
      },
      {
        title: { vi: 'Đoạn mẫu có chú thích', en: 'Annotated model paragraph' },
        body: {
          vi: 'Đề mẫu: *"All secondary students should learn to cook at school. To what extent do you agree or disagree?"* Đọc câu thesis và thân bài 1 bên dưới; phần tiếng Việt chỉ ra **vai trò của từng câu** trong PEEL. Hãy viết các đoạn thân bài của bạn theo đúng khuôn này.',
          en: 'Model task: *"All secondary students should learn to cook at school. To what extent do you agree or disagree?"* Read the thesis and Body 1 below; the Vietnamese notes show **the job of each sentence** in PEEL. Build your own body paragraphs on the same frame.',
        },
        examples: [
          {
            en: 'I completely agree with this idea, because cooking lessons teach young people both healthy habits and independence.',
            vi: 'THESIS (cuối mở bài): mức độ đồng ý + 2 lý do sẽ phát triển ở 2 thân bài.',
          },
          {
            en: 'The main reason why cooking lessons are valuable is that they help teenagers eat more healthily.',
            vi: 'P – câu chủ đề: 1 ý chính của đoạn.',
          },
          {
            en: 'Students who can prepare simple meals are less likely to rely on fast food or instant noodles, which are often high in salt and fat.',
            vi: 'E – giải thích: vì sao biết nấu ăn thì ăn lành mạnh hơn.',
          },
          {
            en: 'For example, a teenager who can cook rice, vegetables and an omelette can make a balanced dinner in fifteen minutes for less than the price of a takeaway.',
            vi: 'E – ví dụ cụ thể: món ăn, thời gian, chi phí.',
          },
          {
            en: "Therefore, learning to cook at school can protect young people's health for the rest of their lives.",
            vi: 'L – câu nối: quay lại thesis (healthy habits).',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-06-ex01',
        type: 'multiple-choice',
        question:
          'Task: "Children should not be allowed to use smartphones until they are 14. To what extent do you agree or disagree?" Which sentence is the clearest thesis?',
        options: [
          'This essay will discuss both sides of this question.',
          'Smartphones have advantages and disadvantages for children.',
          'I partly agree: children under 14 can use a phone for calls, but they should not have unlimited internet access.',
          'In my opinion, I think that I agree with this opinion about smartphones.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Thesis tốt nêu rõ mức độ đồng ý và giới hạn của quan điểm.',
          en: 'A good thesis states the extent of agreement and its limits clearly.',
        },
      },
      {
        id: 'l3-i-wri-06-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối mỗi phần của PEEL với câu tương ứng trong một đoạn văn về việc đi bộ đến trường.',
          en: 'Match each part of PEEL with the right sentence from a paragraph about walking to school.',
        },
        pairs: [
          { left: 'Point', right: "Walking to school is good for children's health." },
          { left: 'Explain', right: 'It gives them daily exercise without needing extra time or money.' },
          { left: 'Example', right: 'A twenty-minute walk each way adds up to over three hours of activity a week.' },
          { left: 'Link', right: 'For this reason, schools should encourage families to walk.' },
        ],
        explanation: {
          vi: 'Point nêu ý, Explain giải thích, Example đưa bằng chứng, Link quay về luận điểm.',
          en: 'Point states, Explain gives the reason, Example gives evidence, Link returns to the thesis.',
        },
      },
      {
        id: 'l3-i-wri-06-ex03',
        type: 'multiple-choice',
        question: 'Which version links the ideas most naturally?',
        options: [
          'Firstly, homework is useful. Moreover, it builds habits. Furthermore, parents can help. In addition, it is cheap.',
          'Homework helps children review lessons. This regular review also builds good study habits, which they will need at secondary school.',
          'Homework is useful and it builds habits and parents can help and it is cheap.',
          'Homework is useful. Homework builds habits. Homework involves parents.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Dùng từ thay thế ("This regular review") và "which" thay vì chồng nhiều từ nối.',
          en: 'Reference words ("This regular review") and "which" link ideas better than stacked linkers.',
        },
      },
      {
        id: 'l3-i-wri-06-ex04',
        type: 'fill-blank',
        sentence: 'Many children spend three hours a day on homework. ___ heavy workload leaves little time for play.',
        acceptedAnswers: ['This', 'Such a'],
        hint: '(từ thay thế, 1–2 từ)',
        explanation: {
          vi: '"This / Such a + danh từ" nhắc lại ý câu trước mà không lặp nguyên câu.',
          en: '"This / Such a + noun" refers back to the previous sentence without repeating it.',
        },
      },
      {
        id: 'l3-i-wri-06-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ vựng chủ đề giáo dục với nghĩa của nó.',
          en: 'Match the education words with their meanings.',
        },
        pairs: [
          { left: 'workload', right: 'the amount of work you have to do' },
          { left: 'compulsory', right: 'required by the rules' },
          { left: 'self-discipline', right: 'the ability to make yourself work' },
          { left: 'revise', right: 'study again before a test' },
          { left: 'well-being', right: 'health and happiness' },
        ],
        explanation: {
          vi: 'Các từ này tả áp lực học tập chính xác hơn "tired" hay "a lot of work".',
          en: 'These words describe study pressure more precisely than "tired" or "a lot of work".',
        },
      },
      {
        id: 'l3-i-wri-06-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi hoàn toàn không đồng ý rằng nên cấm hẳn bài tập về nhà.',
        correctSentence: 'I strongly disagree that homework should be banned completely.',
        extraWords: ['agree', 'banning'],
        explanation: {
          vi: 'Thesis = mức độ (strongly disagree) + nội dung đề viết lại (be banned completely).',
          en: 'A thesis gives the extent (strongly disagree) plus a paraphrase of the task.',
        },
      },
      {
        id: 'l3-i-wri-06-ex07',
        type: 'write-answer',
        prompt:
          "Write the introduction for this lesson's essay task (2 sentences): one sentence paraphrasing the task and one thesis sentence. Task: primary schools should stop giving homework so children can play and rest.",
        tipsVi:
          'Câu 1: viết lại đề (stop giving homework → set no homework; children → pupils). Câu 2: thesis có mức độ rõ (completely agree / partly agree / disagree) + lý do ngắn.',
        minWords: 30,
        sampleAnswer:
          'In some countries, people are debating whether primary schools should set no homework at all so that pupils have more time to play and rest. I partly agree with this view, because young children need free time, but short and simple tasks still help them learn.',
        explanation: {
          vi: 'Mở bài tốt = viết lại đề + thesis rõ mức độ; không cần câu chung chung dài dòng.',
          en: 'A good introduction is a paraphrase plus a clear thesis; no long general statements.',
        },
      },
      {
        id: 'l3-i-wri-06-ex08',
        type: 'speak-sentence',
        sentence: 'I partly agree that young children need more time to rest and play.',
        translationVi: 'Tôi đồng ý một phần rằng trẻ nhỏ cần thêm thời gian để nghỉ ngơi và vui chơi.',
        explanation: {
          vi: 'Giữ âm cuối: partly /tl/, need /d/, rest /st/; nhấn PART-ly, CHIL-dren.',
          en: 'Keep the final sounds in "partly", "need" and "rest"; stress PART-ly and CHIL-dren.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-06-task',
      taskNumber: 2,
      prompt: `Some people think that primary schools should stop giving homework to children so that they have more time to play and rest.\n\nTo what extent do you agree or disagree?\n\n${TASK2_INSTRUCTION}\n\nWrite at least 250 words.`,
      minWords: 250,
      suggestedMinutes: 40,
      sampleAnswer: `In many countries, young children spend several hours a day doing homework after school. Some people argue that primary schools should stop setting homework so that pupils can play and rest. I partly agree with this view: homework for young children should be reduced and changed, but it should not be removed completely.

On the one hand, too much homework can harm children's health and happiness. Children aged six to ten need time to play outside, sleep and spend time with their families, and these activities are important for their physical and social development. When a child has to finish pages of exercises every evening, he or she may feel exhausted and lose interest in learning. In Vietnam, for instance, it is common for primary pupils to study until late at night, which leads to stress at a very young age.

On the other hand, a small amount of homework has clear benefits. Short tasks, such as reading a story for fifteen minutes or practising multiplication tables, help children to remember what they learnt in class. Moreover, homework teaches self-discipline, because children learn to organise their time and finish a task without a teacher next to them. These habits will be very useful when they move to secondary school, where the workload is much heavier.

In conclusion, I believe that primary schools should not ban homework but should limit it to short and meaningful activities. In this way, children can still develop good study habits while having enough time to rest and play.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Homework is very important for student. I am not agree that primary school stop giving homework. Because homework help student remember the lesson. If no homework, student will play game all day and forget everything. In Vietnam student study very hard so they are good at maths. My parents always tell me do homework first and play later. Homework is good for student, teacher and parent.

But too much homework is not good. Student is tired and cannot sleep. Some student go to extra class in the evening and come home very late. They don't have time for play and talk with family. My little brother is in grade 3 and he cry because the homework is very difficult.

In conclusion homework is good and bad. I think school should give homework because it is important for student.`,
          notesVi:
            "TR: Chỉ khoảng 140 từ (thiếu nhiều so với 250); mở bài phản đối nhưng kết bài lại nói 'good and bad' nên quan điểm mâu thuẫn, ý không được phát triển.\nCC: Đoạn văn không có câu chủ đề rõ; ý nhảy từ bài tập sang môn toán, học thêm; chỉ dùng 'because, but, so'.\nLR: Vốn từ rất cơ bản, lặp 'student', 'homework', 'good'.\nGRA: Lỗi cơ bản dày đặc ('I am not agree', 'homework help', 'he cry'), câu cụt 'Because homework help…', thiếu -s số nhiều.",
        },
        {
          band: '5.5',
          text: `Nowadays, homework is a hot topic in many families. Some people think primary schools should stop giving homework to children so they can play and rest more. Other people think homework is necessary. In this essay I will discuss about this problem.

Firstly, homework make children very tired. After school, children have to do homework until 10 or 11 pm, so they don't have enough time to play and sleep. Children need to play to be healthy and happy. For example, my cousin is 8 years old and she always do homework every night and she looks very tired in the morning.

Secondly, homework is useful because children can review the lessons. If they don't do homework, they will forget the lessons very quickly. For example, when I was in primary school, I did maths exercises every evening and I always got good marks in the tests. Moreover, homework help children to be more responsible. Moreover, parents can know what their children learn at school, so they can help them at home.

Thirdly, some teachers give too much homework and the homework is very difficult, so parents have to help their children every night. It is not fair for children who parents are busy or don't know how to teach. These children will get bad marks and feel sad.

In conclusion, homework has advantages and disadvantages. I think schools should give homework to children but not too much homework, because children also need time to play and rest with their family.`,
          notesVi:
            "TR: Bàn cả hai phía nhưng mở bài không nêu quan điểm ('I will discuss…'); quan điểm chỉ xuất hiện ở kết bài nên người đọc không biết bài đi về đâu.\nCC: Ý được liệt kê bằng Firstly / Secondly / Thirdly, 'Moreover' lặp 2 lần liền; đoạn 'Thirdly' quay lại ý của đoạn 1 làm mạch bài rối.\nLR: Lặp 'homework' rất nhiều; lỗi dùng từ 'discuss about', 'who parents' (đúng: whose parents).\nGRA: Có câu phức (If…, so…) nhưng lỗi hoà hợp chủ ngữ – động từ khá thường xuyên ('homework make', 'she always do', 'homework help').",
        },
        {
          band: '6.5',
          text: `In many countries, young children spend several hours a day doing homework after school. Some people argue that primary schools should stop setting homework so that pupils can play and rest. I partly agree with this view: homework for young children should be reduced and changed, but it should not be removed completely.

On the one hand, too much homework can harm children's health and happiness. Children aged six to ten need time to play outside, sleep and spending time with their families, and these activities are important for their physical and social development. When a child has to finish pages of exercises every evening, he or she may feel exhausted and lose interest in learning. In Vietnam, for instance, it is common for primary pupils to study until late at night, which leads to stress at a very young age.

On the other hand, a small amount of homework have clear benefits. Short tasks, such as reading a story for fifteen minutes or practising multiplication tables, help children to remember what they learnt in class. Moreover, homework teaches self-discipline, because children learn to organise their time and finish a task without a teacher next to them. These habits will be very useful when they move to secondary school, where the workload is much heavier.

In conclusion, I believe that primary schools should not ban homework but should limit it to short and meaningful activities. In this way, children can still develop good study habits while having enough time to rest and play.`,
          notesVi:
            "TR: Trả lời đúng câu hỏi 'to what extent' với quan điểm 'đồng ý một phần' rõ từ mở bài đến kết bài; ý được giải thích và có ví dụ, đôi chỗ còn khái quát ('it is common… until late at night').\nCC: Bố cục 4 đoạn rõ, mỗi đoạn một ý chính; từ nối đúng nhưng hơi máy móc (On the one hand / On the other hand / Moreover).\nLR: Từ vựng đủ rộng và đúng chủ đề (self-discipline, workload, meaningful activities), ít lỗi kết hợp từ.\nGRA: Nhiều câu phức chính xác (which…, where…, when…); còn vài lỗi như 'sleep and spending time', 'a small amount of homework have' nhưng không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Mở bài có câu thesis nói rõ mức độ đồng ý không?',
            'Quan điểm ở kết bài có giống quan điểm ở mở bài không?',
            'Mỗi thân bài có ít nhất 1 ví dụ cụ thể (tình huống, con số) không?',
            'Bài có từ 250 từ trở lên không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi thân bài có câu chủ đề (Point) ở đầu đoạn không?',
            'Mỗi đoạn chỉ phát triển 1 ý chính (không liệt kê 3–4 ý ngắn) không?',
            'Có dùng từ thay thế (this, these, such) thay vì chồng Moreover / Furthermore không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 từ chủ đề (workload, self-discipline, well-being…) đúng nghĩa không?',
            'Có tránh lặp "homework" ở mọi câu (thay bằng tasks, assignments, it) không?',
            'Có tránh lỗi "discuss about", "agree with that" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Chủ ngữ số ít có đi với động từ thêm -s (homework helps) không?',
            'Có ít nhất 3 câu phức (because, which, when, if) đúng không?',
            'Bài có câu cụt kiểu "Because…" đứng một mình không? (nên không có)',
          ],
        },
      ],
      planningHintsVi: [
        'Chọn quan điểm trước khi viết: hoàn toàn đồng ý / đồng ý một phần / không đồng ý — và giữ nó đến cuối bài.',
        'Mở bài (2 câu): viết lại đề + thesis (bắt chước câu THESIS trong thẻ đoạn mẫu).',
        'Mỗi thân bài viết theo PEEL như đoạn mẫu: Point → Explain → Example → Link.',
        'Kết bài (1–2 câu): nhắc lại quan điểm bằng từ khác, không thêm ý mới.',
        'Phân bổ 40 phút: 5 phút dàn ý, 30 phút viết, 5 phút soát lỗi -s và thì.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 7 — TASK 2: DISCUSS BOTH VIEWS + OPINION (nấc 2: điền khuyết ĐOẠN KẾT)
  // Bài mẫu khuyết: du học vs học trong nước. Đề tự viết: con lớn ở với bố mẹ hay ra ở riêng.
  // ==========================================================================
  {
    id: 'l3-i-wri-07',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 60,
    title: {
      vi: 'Task 2 – Thảo luận hai quan điểm: cân bằng và nêu ý kiến',
      en: 'Task 2 – Discussion essays: balancing both views and giving your opinion',
    },
    description: {
      vi: 'Nấc 2: tự hoàn thành đoạn kết của bài mẫu, rồi viết trọn bài "Discuss both views and give your opinion".',
      en: 'Step 2: complete the conclusion of a model yourself, then write a full "discuss both views and give your opinion" essay.',
    },
    teachingCards: [
      {
        title: { vi: 'Dạng "Discuss both views and give your opinion"', en: 'The "discuss both views and give your opinion" task' },
        body: {
          vi: 'Phải làm **3 việc**: trình bày quan điểm A, quan điểm B **và** ý kiến của bạn. Thiếu ý kiến → mất điểm TR.\nBố cục gọn: **Mở bài** (2 quan điểm + ý kiến bạn) → **Thân 1**: quan điểm bạn không chọn → **Thân 2**: quan điểm bạn chọn + lý do → **Kết bài**.',
          en: 'You must do **three things**: present view A, view B **and** your own opinion. No opinion → a lower TR score.\nA simple layout: **Introduction** (both views + your opinion) → **Body 1**: the view you do not choose → **Body 2**: the view you choose + reasons → **Conclusion**.',
        },
        examples: [
          { en: 'While some argue that…, others believe that… In my view, …', vi: 'Khung mở bài: nêu 2 phía rồi đến ý kiến của bạn.' },
          { en: 'Those who favour studying abroad argue that it builds independence.', vi: 'Câu chủ đề thân bài 1: giới thiệu quan điểm A.' },
        ],
      },
      {
        title: { vi: 'Liên kết mà không lạm dụng từ nối', en: 'Cohesion without overusing linkers' },
        body: {
          vi: 'Giám khảo trừ điểm CC khi **câu nào cũng mở bằng** Firstly, Moreover, Furthermore. Thay bằng:\n• **Từ thay thế**: this, these, such + danh từ.\n• **Câu chủ đề** báo trước ý của đoạn.\n• **Mệnh đề quan hệ**: which, who.\nMỗi đoạn 1–2 từ nối là đủ.',
          en: 'Examiners lower CC when **every sentence starts with** Firstly, Moreover or Furthermore. Instead use:\n• **Reference**: this, these, such + noun.\n• **Topic sentences** that signal the idea.\n• **Relative clauses**: which, who.\nOne or two linkers per paragraph are enough.',
        },
        examples: [
          {
            en: 'Tuition fees abroad can be ten times higher. This cost places a heavy burden on families.',
            vi: '"This cost" nối với câu trước, không cần "Moreover".',
          },
        ],
      },
      {
        title: { vi: 'Bài mẫu khuyết đoạn kết', en: 'Model with the conclusion gapped' },
        body: {
          vi: 'Đề mẫu: *"Some people think it is better to study at a university in their own country, while others believe studying abroad is more valuable. Discuss both views and give your opinion."* Đọc "Model answer", chú ý ý kiến xuất hiện ở đâu, rồi điền 4 chỗ trống ở **đoạn kết**.',
          en: 'Model task: *"Some people think it is better to study at a university in their own country, while others believe studying abroad is more valuable. Discuss both views and give your opinion."* Read the model answer, notice where the opinion appears, then fill the 4 gaps in **the conclusion**.',
        },
        examples: [{ en: 'In conclusion, although…, I believe that…', vi: 'Khung kết bài: nhượng bộ + nhắc lại ý kiến.' }],
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-wri-07-model',
        title: 'Model answer – studying at home or abroad (the conclusion has 4 gaps)',
        text: `Many young people dream of earning a degree overseas, while others prefer to stay at a university in their own country. Both choices have their supporters, but in my view, studying at home is the wiser option for most students at undergraduate level.

Those who favour studying abroad argue that it offers more than academic knowledge. Living in a foreign country forces students to cook, manage money and solve problems on their own, so they often return more independent and confident. In addition, a degree from a well-known overseas university may impress employers, especially international companies.

On the other hand, people who prefer local universities point out that the cost of studying abroad is extremely high. Tuition fees and living expenses in many Western countries can be ten times higher than at home, which places a heavy burden on ordinary families. Students who stay at home also study in their first language and can focus fully on their subject rather than struggling with language and culture shock. I agree with this second view, because the quality of many local universities has improved considerably in recent years.

In (1) ___, although studying overseas can help young people grow in independence, I believe that its (2) ___ often outweigh these benefits. Most students would gain more by completing a first degree at home and (3) ___ studying abroad for a master's degree, (4) ___ they are older and more focused.`,
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-07-ex01',
        type: 'multiple-choice',
        question:
          'Task: "Some people think young people should choose a job they enjoy; others think a high salary is more important. Discuss both views and give your opinion." Which introduction covers all parts?',
        options: [
          'Choosing a job is very important for young people nowadays.',
          'Some believe young people should follow their interests when choosing a career, while others think salary matters more. In my view, enjoyment should come first, as long as the job pays enough to live on.',
          'Some believe young people should follow their interests, while others think salary matters more. This essay will look at both views.',
          'I think salary is the most important thing because everything is expensive.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Mở bài đúng nêu cả 2 quan điểm và ý kiến riêng; phương án C thiếu ý kiến.',
          en: 'It mentions both views and your opinion; option C has no opinion.',
        },
      },
      {
        id: 'l3-i-wri-07-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm từ với chức năng của nó trong bài thảo luận.',
          en: 'Match each phrase with its job in a discussion essay.',
        },
        pairs: [
          { left: 'Those who support this view argue that…', right: 'introducing the first view' },
          { left: 'On the other side of the argument, …', right: 'introducing the second view' },
          { left: 'Personally, I side with…', right: 'giving your own opinion' },
          { left: 'Admittedly, …', right: 'accepting a point from the other side' },
          { left: 'For this reason, …', right: 'linking back to the main point' },
        ],
        explanation: {
          vi: 'Mỗi cụm báo cho người đọc biết bạn đang ở phần nào của lập luận.',
          en: 'Each phrase tells the reader which part of the argument you are in.',
        },
      },
      {
        id: 'l3-i-wri-07-ex03',
        type: 'fill-blank',
        passageId: 'l3-i-wri-07-model',
        sentence: 'Gap 1: In ___, although studying overseas can help young people grow in independence, …',
        acceptedAnswers: ['conclusion'],
        explanation: {
          vi: '"In conclusion" mở đoạn kết; chỉ dùng một lần ở đoạn cuối.',
          en: '"In conclusion" opens the final paragraph only.',
        },
      },
      {
        id: 'l3-i-wri-07-ex04',
        type: 'fill-blank',
        passageId: 'l3-i-wri-07-model',
        sentence: 'Gap 2: …I believe that its ___ often outweigh these benefits.',
        acceptedAnswers: ['costs', 'drawbacks', 'disadvantages'],
        explanation: {
          vi: 'Kết bài nhắc lại ý chính của thân bài 2: chi phí / nhược điểm lớn hơn lợi ích.',
          en: "The conclusion repeats Body 2's main idea: the costs outweigh the benefits.",
        },
      },
      {
        id: 'l3-i-wri-07-ex05',
        type: 'fill-blank',
        passageId: 'l3-i-wri-07-model',
        sentence: "Gap 3: …by completing a first degree at home and ___ studying abroad for a master's degree…",
        acceptedAnswers: ['then', 'later'],
        explanation: {
          vi: '"then / later" cho thấy trình tự: học trong nước trước, du học sau.',
          en: '"Then / later" shows the order: study at home first, abroad afterwards.',
        },
      },
      {
        id: 'l3-i-wri-07-ex06',
        type: 'fill-blank',
        passageId: 'l3-i-wri-07-model',
        sentence: "Gap 4: …for a master's degree, ___ they are older and more focused.",
        acceptedAnswers: ['when', 'once'],
        explanation: {
          vi: '"when / once" + mệnh đề chỉ thời điểm: khi đã lớn và tập trung hơn.',
          en: '"When / once" introduces the time: when they are older and more focused.',
        },
      },
      {
        id: 'l3-i-wri-07-ex07',
        type: 'multiple-choice',
        question:
          'Which sentence best continues this one without repeating it? "Young adults who live alone learn to cook."',
        options: [
          'They also learn to manage money.',
          'Moreover, young adults who live alone also learn to manage money.',
          'Furthermore, it learns to manage money.',
          'Also they learns to manage money.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Đại từ "They" thay cho cụm danh từ dài, gọn hơn thêm từ nối.',
          en: 'The pronoun "They" replaces the long noun phrase; no extra linker is needed.',
        },
      },
      {
        id: 'l3-i-wri-07-ex08',
        type: 'speak-sentence',
        sentence: 'Those who support this view argue that it builds independence.',
        translationVi: 'Những người ủng hộ quan điểm này cho rằng nó giúp rèn tính tự lập.',
        explanation: {
          vi: '/ð/ ở "those, this, that": đặt lưỡi giữa răng và rung; "builds" kết thúc bằng /ldz/.',
          en: 'For /ð/ in "those, this, that", put your tongue between your teeth; "builds" ends /ldz/.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-07-task',
      taskNumber: 2,
      prompt: `Some people believe that young adults should continue living with their parents until they get married, while others think they should move out and live independently as soon as they start working.\n\nDiscuss both views and give your own opinion.\n\n${TASK2_INSTRUCTION}\n\nWrite at least 250 words.`,
      minWords: 250,
      suggestedMinutes: 40,
      sampleAnswer: `In Vietnam and many other Asian countries, it is normal for young people to live with their parents until they get married. However, some people now believe that young adults should move out as soon as they have a job. In my opinion, while living independently has some advantages, staying with parents is a more sensible choice for most young workers.

People who support moving out argue that it helps young adults to become mature. When they live alone or with friends, they have to pay bills, cook meals and deal with problems by themselves, which builds responsibility. Having their own space also gives them more freedom to make decisions about their lifestyle, for example what time to come home or how to spend their weekends, without arguments with their parents.

On the other hand, there are strong reasons for young people to stay in the family home. The most obvious one is financial. Rent in big cities like Hanoi or Ho Chi Minh City takes a large part of a young person's first salary, so living with parents allows them to save money for a home or further study. Living together also strengthens family relationships. Young adults can help to take care of their ageing parents, and in return, parents can give advice and emotional support during the difficult first years of work.

In conclusion, both views have some merit. However, I believe that young adults should stay with their parents for the first few years of their career, as long as they take responsibility for household tasks and contribute to the family.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Today, young people like freedom. They want to live alone. But in Vietnam, family is very important, children must live with parents. I think live with parents is good.

Live with parents is save money. Rent house is very expensive in city, young people salary is low. And parents can cook, wash clothes for them. If live alone they eat fast food and not healthy, and they don't know how to save money.

Some people think live alone is good because they are free and independent. But I think it is not good because they will be lonely and they spend a lot of money for party and shopping. My cousin live alone in Ho Chi Minh City and she always call her mother because she is sad.

In conclusion, young people should live with their parents until they get married, it is the best way for everybody.`,
          notesVi:
            "TR: Khoảng 150 từ; quan điểm 'sống riêng' chỉ được nhắc một câu rồi bác bỏ ngay, nên chưa thật sự 'discuss both views'.\nCC: Có chia đoạn nhưng câu trong đoạn rời rạc, không có câu chủ đề; từ nối chỉ có 'And', 'But'.\nLR: Vốn từ cơ bản, dùng sai dạng từ ('Live with parents is save money', 'Rent house').\nGRA: Lỗi cấu trúc ở hầu hết các câu (thiếu chủ ngữ, động từ nguyên mẫu làm chủ ngữ, thiếu -s), nhiều câu nối bằng dấu phẩy.",
        },
        {
          band: '5.5',
          text: `Nowadays, many young people have job but still live with their parents. This is a common situation in Vietnam. Some people think they should live with parents until they get married, but other people think they should move out when they start working. This essay will discuss both views.

On the one hand, living with parents have many benefits. Firstly, they can save money because they don't need to pay rent. Secondly, they can eat with family and parents can cook for them. Thirdly, when they are sick, parents can take care them. For example, my brother is 25 years old and he still live with my family and he is very happy because he can save money to buy a motorbike.

On the other hand, moving out also have many benefits. Firstly, young people can be independent. They can learn how to cook and how to pay bills by themselves. For example, my cousin moved to Ho Chi Minh City for work and now she can cook and manage her money very well. Secondly, they can have more freedom. They can go out with friends and come back home late and nobody complain. Also, they can make new friends with their roommates. However, living alone is very expensive and sometimes they feel lonely, especially when they live far from their hometown.

In conclusion, both views have advantages and disadvantages, and it depends on each person and each family. In my opinion, I think young people should live with parents because it is cheaper and safer.`,
          notesVi:
            "TR: Trình bày đủ 2 quan điểm nhưng mở bài chỉ hứa 'discuss both views' mà không có ý kiến; kết bài còn nói 'it depends' rồi mới đưa ý kiến ở câu cuối với lý do rất ngắn.\nCC: Ý liệt kê bằng Firstly / Secondly / Thirdly ở cả hai đoạn; câu 'However…' cuối đoạn 3 lại quay sang nhược điểm, làm đoạn mất tập trung.\nLR: Đủ từ dùng nhưng lặp ('benefits', 'live with parents'); lỗi kết hợp từ 'take care them', 'have job'.\nGRA: Phần lớn là câu đơn hoặc câu ghép; lỗi hoà hợp chủ ngữ – động từ lặp lại ('living with parents have', 'he still live', 'nobody complain').",
        },
        {
          band: '6.5',
          text: `In Vietnam and many other Asian countries, it is normal for young people to live with their parents until they get married. However, some people now believe that young adults should move out as soon as they have a job. In my opinion, while living independently has some advantages, staying with parents is a more sensible choice for most young workers.

People who support moving out argue that it helps young adults to become mature. When they live alone or with friends, they have to pay bills, cook meals and deal with problems by themselves, which builds responsibility. Furthermore, having their own space gives them more freedom to make decisions about their lifestyle, for example, what time to come home or how to spend their weekends, without arguments with their parents.

On the other hand, there are strong reasons for young people to stay in the family home. The most obvious one is financial. Rent in big cities like Hanoi or Ho Chi Minh City takes a large part of a young person's first salary, so living with parents allows them to save money for a home or further study. In addition, living together strengthens family relationship. Young adults can help to take care of their ageing parents, and in return, parents can give advice and emotional support during the difficult first years of work.

In conclusion, both views has some merits. However, I believe that young adults should stay with their parents for the first few years of their career, as long as they still take responsibility for household tasks and contribute to the family.`,
          notesVi:
            "TR: Bàn cả hai quan điểm và nêu ý kiến rõ ngay từ mở bài; kết bài thu hẹp ý kiến ('first few years') nhưng vẫn nhất quán, ý có giải thích và ví dụ thực tế (tiền thuê nhà ở Hà Nội, TP.HCM).\nCC: Mỗi đoạn có câu chủ đề rõ, lập luận dễ theo; từ nối đúng nhưng còn hơi nhiều (Furthermore, On the other hand, In addition).\nLR: Từ vựng đủ rộng và khá chính xác (mature, responsibility, emotional support, ageing parents); lỗi nhỏ 'strengthens family relationship'.\nGRA: Câu phức đa dạng (When…, which…, so…, as long as…); vài lỗi như 'both views has' nhưng không cản trở ý.",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Bài có trình bày quan điểm "ở với bố mẹ" và quan điểm "dọn ra ở riêng" — mỗi bên ít nhất 1 đoạn không?',
            'Ý kiến của bạn có xuất hiện ở mở bài và kết bài không?',
            'Mỗi quan điểm có lý do + ví dụ, không chỉ liệt kê không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi thân bài có câu chủ đề cho biết đoạn đó nói về quan điểm nào không?',
            'Mỗi đoạn dùng tối đa 2 từ nối kiểu Moreover / Furthermore không?',
            'Có dùng từ thay thế (this, they, such) để nối câu không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng cụm giới thiệu quan điểm (Those who support…, Others argue…) không?',
            'Có ít nhất 3 cụm chủ đề (financial independence, household tasks, emotional support…) không?',
            'Có tránh lặp nguyên cụm "live with their parents" quá 3 lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có ít nhất 3 câu phức đúng (when, which, as long as) không?',
            'Động từ có hoà hợp với chủ ngữ (living alone costs, both views have) không?',
            'Có tránh nối hai câu hoàn chỉnh chỉ bằng dấu phẩy không?',
          ],
        },
      ],
      planningHintsVi: [
        'Quyết định trước: bạn nghiêng về phía nào? Phía đó viết ở thân bài 2.',
        'Mở bài: "While some believe…, others argue… In my view, …"',
        'Thân bài 1 (quan điểm bạn không chọn): 2 lý do, 1 ví dụ — viết công bằng, không chê bai.',
        'Thân bài 2 (quan điểm bạn chọn): 2 lý do mạnh + ví dụ + câu nối về ý kiến của bạn.',
        'Kết bài: theo khung của bài mẫu "In conclusion, although…, I believe…".',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 8 — TASK 2: ADVANTAGES / DISADVANTAGES (nấc 2 khó hơn: điền khuyết HAI đoạn cuối)
  // Bài mẫu khuyết: làm việc tại nhà. Đề tự viết: mua sắm trực tuyến — ưu có lớn hơn nhược?
  // ==========================================================================
  {
    id: 'l3-i-wri-08',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 60,
    title: {
      vi: 'Task 2 – Ưu và nhược điểm: cân nhắc và kết luận',
      en: 'Task 2 – Advantages and disadvantages: weighing up and concluding',
    },
    description: {
      vi: 'Nấc 2 (khó hơn): tự hoàn thành hai đoạn cuối của bài mẫu, rồi viết trọn bài "Do the advantages outweigh the disadvantages?".',
      en: 'Step 2 (harder): complete the last two paragraphs of a model, then write a full "Do the advantages outweigh the disadvantages?" essay.',
    },
    teachingCards: [
      {
        title: { vi: 'Hai kiểu đề ưu / nhược', en: 'Two kinds of advantage/disadvantage question' },
        body: {
          vi: '• **"Discuss the advantages and disadvantages"** → trình bày cả hai; ý kiến riêng không bắt buộc.\n• **"Do the advantages outweigh the disadvantages?"** → phải **cân** và **kết luận bên nào lớn hơn**, nói rõ từ mở bài.\nBố cục: thân bài 1 = bên **yếu hơn**, thân bài 2 = bên **mạnh hơn** (bên bạn chọn).',
          en: '• **"Discuss the advantages and disadvantages"** → present both; your own opinion is optional.\n• **"Do the advantages outweigh the disadvantages?"** → you must **weigh** them and **say which side is greater**, from the introduction.\nLayout: Body 1 = the **weaker** side, Body 2 = the **stronger** side (your side).',
        },
        examples: [
          {
            en: 'Although this trend has some drawbacks, I believe its benefits are more significant.',
            vi: 'Thesis cho đề "outweigh": nhượng bộ + kết luận bên nặng hơn.',
          },
        ],
      },
      {
        title: { vi: 'Từ vựng chủ đề: mua sắm trực tuyến', en: 'Topic vocabulary: online shopping' },
        body: {
          vi: 'Các cụm từ tự nhiên nên dùng:\n**compare prices** (so sánh giá), **home delivery** (giao tận nhà), **impulse buying** (mua bốc đồng), **packaging waste** (rác bao bì), **fake products** (hàng giả), **customer reviews** (đánh giá của người mua), **local businesses** (cửa hàng địa phương).',
          en: 'Useful natural collocations:\n**compare prices**, **home delivery**, **impulse buying** (buying without planning), **packaging waste**, **fake products**, **customer reviews**, **local businesses** (small shops in your area).',
        },
        examples: [
          { en: 'Customer reviews help shoppers avoid fake products.', vi: 'Đánh giá của người mua giúp tránh hàng giả.' },
          { en: 'Flash sales encourage impulse buying.', vi: 'Các đợt giảm giá chớp nhoáng khuyến khích mua bốc đồng.' },
        ],
      },
      {
        title: { vi: 'Bài mẫu khuyết hai đoạn cuối', en: 'Model with the last two paragraphs gapped' },
        body: {
          vi: 'Đề mẫu: *"More and more people are working from home. Do the advantages outweigh the disadvantages?"* Mở bài và thân bài 1 đã có; **thân bài 2 và kết bài** có 4 chỗ trống. Đọc "Model answer" rồi tự điền.',
          en: 'Model task: *"More and more people are working from home. Do the advantages outweigh the disadvantages?"* The introduction and Body 1 are complete; **Body 2 and the conclusion** have 4 gaps. Read the model answer and fill them.',
        },
        examples: [{ en: 'However, these problems are outweighed by the benefits.', vi: 'Câu chuyển sang bên mạnh hơn (thân bài 2).' }],
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-wri-08-model',
        title: 'Model answer – working from home (Body 2 and the conclusion have 4 gaps)',
        text: `In recent years, a growing number of employees have started working from home for at least part of the week. Although this arrangement has some drawbacks, I believe its advantages are more significant.

Admittedly, working from home can cause problems. Some employees feel isolated because they rarely meet their colleagues, and teamwork may suffer when every discussion has to take place online. It can also be hard to separate work from family life, especially in small homes where children and grandparents share the same space.

However, these problems are (1) ___ by the benefits. The most important (2) ___ is time. Employees who do not have to travel to an office can save one or two hours every day, which they can spend with their families or on exercise. Remote work also gives companies (3) ___ to talented people who live far from big cities, so they can hire the best person for the job rather than the nearest one.

In conclusion, despite the risk of loneliness and the blurred line between work and home, I believe the advantages of working from home (4) ___ the disadvantages, especially when employees can still meet their teams once or twice a week.`,
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-08-ex01',
        type: 'multiple-choice',
        question: 'Which task REQUIRES you to say whether the advantages or the disadvantages are greater?',
        options: [
          'Discuss the advantages and disadvantages of living in a big city.',
          'Do the advantages of living in a big city outweigh the disadvantages?',
          'Why do people move to big cities?',
          'Describe life in a big city.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"Outweigh" = nặng hơn; đề yêu cầu bạn cân và kết luận bên nào lớn hơn.',
          en: '"Outweigh" means "be greater than", so you must judge which side wins.',
        },
      },
      {
        id: 'l3-i-wri-08-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối để tạo cụm từ (collocation) về mua sắm trực tuyến.',
          en: 'Match the halves to make online shopping collocations.',
        },
        pairs: [
          { left: 'compare', right: 'prices' },
          { left: 'impulse', right: 'buying' },
          { left: 'home', right: 'delivery' },
          { left: 'packaging', right: 'waste' },
          { left: 'customer', right: 'reviews' },
        ],
        explanation: {
          vi: 'Collocation tự nhiên giúp tăng điểm LR hơn là từ "khó" nhưng dùng sai.',
          en: 'Natural collocations raise LR more than rare words used wrongly.',
        },
      },
      {
        id: 'l3-i-wri-08-ex03',
        type: 'fill-blank',
        passageId: 'l3-i-wri-08-model',
        sentence: 'Gap 1: However, these problems are ___ by the benefits.',
        acceptedAnswers: ['outweighed'],
        hint: '(outweigh, bị động)',
        explanation: {
          vi: 'Bị động "be outweighed by" = bị lợi ích lấn át; nối thân bài 1 sang thân bài 2.',
          en: '"Be outweighed by" (passive) moves from Body 1 to the stronger Body 2.',
        },
      },
      {
        id: 'l3-i-wri-08-ex04',
        type: 'fill-blank',
        passageId: 'l3-i-wri-08-model',
        sentence: 'Gap 2: The most important ___ is time.',
        acceptedAnswers: ['advantage', 'benefit'],
        explanation: {
          vi: 'Câu chủ đề thân bài 2 nêu lợi ích lớn nhất trước.',
          en: "Body 2's topic sentence names the biggest benefit first.",
        },
      },
      {
        id: 'l3-i-wri-08-ex05',
        type: 'fill-blank',
        passageId: 'l3-i-wri-08-model',
        sentence: 'Gap 3: Remote work also gives companies ___ to talented people who live far from big cities.',
        acceptedAnswers: ['access'],
        explanation: {
          vi: 'Collocation "give someone access to" = cho ai tiếp cận với.',
          en: 'The collocation is "give someone access to".',
        },
      },
      {
        id: 'l3-i-wri-08-ex06',
        type: 'fill-blank',
        passageId: 'l3-i-wri-08-model',
        sentence: 'Gap 4: …I believe the advantages of working from home ___ the disadvantages.',
        acceptedAnswers: ['outweigh'],
        explanation: {
          vi: 'Kết bài trả lời thẳng câu hỏi của đề bằng chính động từ "outweigh".',
          en: 'The conclusion answers the question directly with "outweigh".',
        },
      },
      {
        id: 'l3-i-wri-08-ex07',
        type: 'multiple-choice',
        question: 'Task: "Do the advantages of owning a car outweigh the disadvantages?" Which thesis answers the question?',
        options: [
          'Owning a car has both advantages and disadvantages.',
          'This essay will talk about cars.',
          'Although cars cause pollution and traffic jams, I believe the freedom they give families makes the advantages greater.',
          'Many families in my city have a car.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Thesis phải nói bên nào lớn hơn; phương án A chỉ nhắc lại đề.',
          en: 'The thesis must say which side is greater; option A only repeats the task.',
        },
      },
      {
        id: 'l3-i-wri-08-ex08',
        type: 'speak-sentence',
        sentence: 'Online shopping saves time, but it also creates a lot of packaging waste.',
        translationVi: 'Mua sắm trực tuyến tiết kiệm thời gian, nhưng cũng tạo ra nhiều rác bao bì.',
        explanation: {
          vi: '"saves" kết thúc /vz/, "creates" /ts/, "waste" /st/; nhấn PACK-ag-ing.',
          en: '"Saves" ends /vz/, "creates" /ts/, "waste" /st/; stress PACK-ag-ing.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-08-task',
      taskNumber: 2,
      prompt: `Nowadays, more and more people buy food, clothes and other goods online instead of going to shops and markets.\n\nDo the advantages of this trend outweigh the disadvantages?\n\n${TASK2_INSTRUCTION}\n\nWrite at least 250 words.`,
      minWords: 250,
      suggestedMinutes: 40,
      sampleAnswer: `Over the past decade, online shopping has become part of daily life for millions of people. Instead of going to markets or shopping centres, customers can now order almost anything with a few taps on their phone. In my view, although this trend brings some disadvantages, its advantages are greater.

There are some clear drawbacks to buying goods online. Customers cannot see or touch products before paying, so they sometimes receive fake or low-quality items which look very different from the pictures. Online shopping also creates a huge amount of packaging waste, because even small items are wrapped in plastic bags and boxes. Finally, small local shops and traditional markets may lose customers, and some of them are forced to close.

However, I believe these problems are outweighed by the benefits. The most important benefit is convenience. People who work long hours can order groceries or clothes at any time and have them delivered to their door, which saves them time and energy. Moreover, online platforms make it easy to compare prices between many sellers, so customers can often find cheaper deals than in shops. Many websites also show reviews from other buyers, which help people to avoid poor products. As a result, the quality problem can be reduced if shoppers are careful.

In conclusion, online shopping has some negative effects, especially on the environment and small businesses. Nevertheless, I think its convenience and lower prices make it a positive development overall, as long as customers choose reliable sellers and avoid buying more than they need.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Online shopping is very good. Now everybody use phone to buy thing. I like online shopping because it is fast, cheap and many choice. I can buy clothes, shoes, food, everything. Shipper bring to my house. I don't need go out in the hot weather.

But sometime the product is not good, I buy a shirt but it is small and the color is different. I can not return it. It is waste money.

Market and shop is also good because you can see the thing and try it. My grandmother only go to the market, she don't know online shopping. She say the market is more fresh and she can talk with the seller.

In conclusion, online shopping have advantage and disadvantage. Everybody should use online shopping because it is the future.`,
          notesVi:
            "TR: Khoảng 130 từ, chủ yếu kể trải nghiệm cá nhân; không cân ưu – nhược mà kết luận 'everybody should use' không trả lời câu hỏi 'outweigh'.\nCC: Có chia đoạn nhưng đoạn 3 (chợ, bà) lạc khỏi mạch; gần như không có từ nối.\nLR: Từ đơn giản, lặp 'good', 'buy'; sai từ 'sometime', 'many choice', 'thing'.\nGRA: Lỗi cơ bản ở hầu hết các câu ('everybody use', 'Shipper bring', 'I don't need go out', 'she don't know').",
        },
        {
          band: '5.5',
          text: `Nowadays, online shopping is very popular, especially with young people. Many people buy things online every day, from food to clothes and electronics. There are many advantages and disadvantages of online shopping and I will discuss them in this essay.

The first advantage is convenient. People can buy everything at home, they don't need to go out. Especially when it is raining or the traffic is bad, online shopping is very useful. The second advantage is cheap. Online shops often have discount and free ship, so people can save money. For example, my mother buy clothes on online apps every month because it is cheaper than the market. The third advantage is there are many choices. People can find many products from different shops and compare them easily.

However, online shopping also has disadvantages. Firstly, sometimes the products are fake or the quality is bad. When the customers receive it, it is different with the picture and it is difficult to return. For example, last year I bought a pair of shoes online but they were too small and the colour was different. Secondly, people buy too much things because it is too easy, so they waste money on things they don't need. Thirdly, it makes a lot of plastic rubbish, because every product is wrapped in many bags and boxes.

In conclusion, online shopping has both advantages and disadvantages. I think the advantages are more than the disadvantages because it is convenient and cheap, but people should be careful when they buy things online.`,
          notesVi:
            "TR: Liệt kê được cả ưu và nhược điểm nhưng không thật sự 'cân' hai bên; câu trả lời cho đề chỉ có ở câu cuối với lý do ngắn.\nCC: Chia đoạn rõ nhưng ý xếp theo kiểu danh sách (The first / second / third advantage…, Firstly, Secondly, Thirdly), ít liên kết giữa các ý.\nLR: Sai dạng từ 'The first advantage is convenient / cheap' (cần danh từ: convenience, low prices); 'free ship', 'different with', 'too much things'.\nGRA: Có câu ghép và câu phức đơn giản, nhưng lỗi chia động từ và số nhiều khá thường xuyên ('my mother buy', 'have discount').",
        },
        {
          band: '6.5',
          text: `Over the past decade, online shopping has become part of daily life for millions of people. Instead of going to markets or shopping centres, customers can now order almost anything with a few taps on their phone. In my view, although this trend brings some disadvantages, its advantages are greater.

There are some clear drawbacks of buying goods online. Firstly, customers cannot see or touch the products before paying, so they sometimes receive fake or low-quality items which look very different from the pictures. Secondly, online shopping creates a huge amount of packaging waste, because even small items are wrapped in plastic bags and boxes. Finally, small local shops and traditional markets may lose customers and some of them are forced to close.

However, I believe these problems are outweighed by the benefits. The most important benefit is convenience. People who work long hours can order groceries or clothes at any time and have them delivered to their door, which save them time and energy. Moreover, online platforms make it easy to compare prices between many sellers, so customers can often find cheaper deals than in shops. Many websites also show reviews from other buyers, which help people to avoid poor products. As a result, the quality problem can be reduced if shoppers are careful.

In conclusion, online shopping has some negative effects, especially on the environment and small businesses. Nevertheless, I think its convenience and lower prices make it a positive development overall, as long as customers choose reliable sellers and avoid buying more than they need.`,
          notesVi:
            "TR: Trả lời đúng câu hỏi 'outweigh' với kết luận rõ (ưu điểm lớn hơn) ngay từ mở bài; ý được giải thích nhưng ví dụ còn chung, chưa có tình huống cụ thể.\nCC: Bố cục hợp lý (nhược trước, ưu sau), câu 'these problems are outweighed by the benefits' nối hai đoạn tốt; Firstly / Secondly / Finally hơi máy móc.\nLR: Collocation chủ đề tự nhiên (compare prices, packaging waste, reliable sellers); 'drawbacks of' (đúng hơn: drawbacks to) và đôi chỗ lặp 'products'.\nGRA: Nhiều câu phức đúng (which…, so…, as long as…); lỗi nhỏ 'which save them' (đúng: saves) không ảnh hưởng ý.",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Mở bài có nói rõ ưu điểm hay nhược điểm lớn hơn không?',
            'Có ít nhất 2 nhược điểm và 2 ưu điểm được giải thích (không chỉ liệt kê) không?',
            'Kết bài có trả lời lại đúng câu hỏi "outweigh" không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Thân bài 1 nói bên yếu hơn, thân bài 2 nói bên bạn chọn không?',
            'Có câu chuyển đoạn kiểu "these problems are outweighed by…" không?',
            'Có tránh xếp ý thành danh sách Firstly / Secondly / Thirdly ở mọi đoạn không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 collocation chủ đề (compare prices, packaging waste…) đúng không?',
            'Có dùng danh từ đúng chỗ (convenience, không phải "convenient") không?',
            'Có tránh lỗi "free ship", "different with", "too much things" không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Động từ có hoà hợp với chủ ngữ (my mother buys) không?',
            'Có ít nhất 1 câu bị động hoặc câu điều kiện đúng không?',
            'Danh từ đếm được số nhiều có -s (discounts, products) không?',
          ],
        },
      ],
      planningHintsVi: [
        'Liệt kê nhanh 3 ưu, 3 nhược trong 3 phút; chọn 2 ý mạnh nhất mỗi bên.',
        'Quyết định bên nào nặng hơn và viết ngay vào thesis.',
        'Thân bài 1 mở bằng "Admittedly, …" (bên yếu hơn); thân bài 2 mở bằng câu chuyển "However, these drawbacks are outweighed by…".',
        'Kết bài dùng lại động từ "outweigh" để trả lời thẳng đề.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 9 — TASK 2: CAUSES / SOLUTIONS (nấc 3: tự viết, không có bài mẫu trước)
  // Đề: rác thải nhựa từ hộ gia đình ở các thành phố — nguyên nhân và giải pháp.
  // ==========================================================================
  {
    id: 'l3-i-wri-09',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 60,
    title: {
      vi: 'Task 2 – Nguyên nhân và giải pháp',
      en: 'Task 2 – Causes and solutions',
    },
    description: {
      vi: 'Nấc 3: không có bài mẫu trước — tự lập dàn ý và viết trọn bài nguyên nhân – giải pháp.',
      en: 'Step 3: no model first — plan and write a full causes-and-solutions essay yourself.',
    },
    teachingCards: [
      {
        title: { vi: 'Trả lời đủ 2 câu hỏi, giải pháp khớp nguyên nhân', en: 'Answer both questions; match solutions to causes' },
        body: {
          vi: 'Đề có **2 câu hỏi** (causes? solutions?) → **mỗi câu một thân bài**. Bỏ sót một câu → TR chỉ khoảng 5.\nGiải pháp tốt **trả lời đúng nguyên nhân** đã nêu và **cụ thể**: *ai* làm *gì*, *như thế nào*.\nYếu: "The government should do something." Tốt: "The city could open bus lanes on its busiest roads."',
          en: 'The task has **two questions** (causes? solutions?) → **one body paragraph each**. Missing one → TR around 5 at most.\nGood solutions **match the causes** you gave and are **specific**: *who* does *what*, *how*.\nWeak: "The government should do something." Better: "The city could open bus lanes on its busiest roads."',
        },
        examples: [
          {
            en: 'Cause: more people own motorbikes. Solution: make buses faster with their own lanes.',
            vi: 'Giải pháp nhắm đúng vào nguyên nhân.',
          },
        ],
      },
      {
        title: { vi: 'Ngôn ngữ nguyên nhân – kết quả – giải pháp', en: 'Language for causes, effects and solutions' },
        body: {
          vi: 'Nguyên nhân: **is largely due to**, **stems from**, **one reason is that**.\nKết quả: **lead to**, **result in**, **as a result**.\nGiải pháp: **One practical solution would be to + V**, **could / should + V**, **tackle / address the problem**.\nĐộng từ khuyết thiếu (**could, should, would**) nghe học thuật hơn "must".',
          en: 'Causes: **is largely due to**, **stems from**, **one reason is that**.\nEffects: **lead to**, **result in**, **as a result**.\nSolutions: **One practical solution would be to + verb**, **could / should + verb**, **tackle / address the problem**.\nModals (**could, should, would**) sound more academic than "must".',
        },
        examples: [
          { en: 'Traffic jams are largely due to the rapid rise in private vehicles.', vi: 'Kẹt xe phần lớn là do lượng xe cá nhân tăng nhanh.' },
          {
            en: 'One practical solution would be to build more park-and-ride stations.',
            vi: 'Một giải pháp thiết thực là xây thêm bãi gửi xe để đi tiếp bằng xe buýt.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-09-ex01',
        type: 'multiple-choice',
        question:
          'Cause: "Many office workers buy a takeaway drink in a plastic cup every day." Which solution matches this cause best?',
        options: [
          'Plant more trees in the city.',
          'Give a discount to customers who bring their own cup.',
          'Build more factories that produce plastic.',
          'Teach children about recycling in maths lessons.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Giải pháp tốt nhắm thẳng vào nguyên nhân (cốc nhựa dùng một lần).',
          en: 'A good solution targets the cause directly: single-use cups.',
        },
      },
      {
        id: 'l3-i-wri-09-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối mỗi từ / cụm từ với từ đồng nghĩa để tránh lặp.',
          en: 'Match each word or phrase with a synonym to avoid repetition.',
        },
        pairs: [
          { left: 'lead to', right: 'result in' },
          { left: 'because of', right: 'due to' },
          { left: 'deal with', right: 'tackle' },
          { left: 'cut down on', right: 'reduce' },
          { left: 'rubbish', right: 'waste' },
        ],
        explanation: {
          vi: 'Đổi từ đồng nghĩa giúp tăng LR và tránh lặp "problem", "reduce".',
          en: 'Synonyms raise LR and stop you repeating "problem" and "reduce".',
        },
      },
      {
        id: 'l3-i-wri-09-ex03',
        type: 'fill-blank',
        sentence: 'One practical solution ___ be to charge customers for every plastic bag.',
        acceptedAnswers: ['would', 'could'],
        explanation: {
          vi: '"would / could be to + V" là cách đề xuất giải pháp lịch sự, học thuật.',
          en: '"Would / could be to + verb" is a polite, academic way to propose a solution.',
        },
      },
      {
        id: 'l3-i-wri-09-ex04',
        type: 'arrange-words',
        translationVi: 'Nguyên nhân chính của vấn đề này là sự phổ biến của đồ ăn mang đi.',
        correctSentence: 'The main cause of this problem is the popularity of takeaway food.',
        extraWords: ['popular'],
        explanation: {
          vi: 'Câu chủ đề cho đoạn nguyên nhân: The main cause of… is + danh từ.',
          en: 'A topic sentence for the causes paragraph: "The main cause of… is" + noun.',
        },
      },
      {
        id: 'l3-i-wri-09-ex05',
        type: 'fill-blank',
        sentence: 'This problem is largely ___ to the convenience of single-use products.',
        acceptedAnswers: ['due'],
        explanation: {
          vi: '"be due to + danh từ" = do, bởi vì.',
          en: '"Be due to + noun" gives the cause.',
        },
      },
      {
        id: 'l3-i-wri-09-ex06',
        type: 'multiple-choice',
        question: 'Which topic sentence is best for the SOLUTIONS paragraph?',
        options: [
          'Plastic is very bad.',
          'There are several measures that governments and individuals could take to tackle this problem.',
          'In conclusion, plastic waste is a problem.',
          'Firstly, plastic bags.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu chủ đề báo trước nội dung đoạn: giải pháp và ai sẽ thực hiện.',
          en: "It signals the paragraph's content: solutions and who will carry them out.",
        },
      },
      {
        id: 'l3-i-wri-09-ex07',
        type: 'speak-sentence',
        sentence: 'Single-use plastic products are cheap, light and convenient.',
        translationVi: 'Đồ nhựa dùng một lần rẻ, nhẹ và tiện lợi.',
        explanation: {
          vi: '"products" có cụm cuối /kts/; giữ /t/ ở "light"; nhấn con-VEN-ient.',
          en: '"Products" ends in /kts/; keep the /t/ in "light"; stress con-VEN-ient.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-09-task',
      taskNumber: 2,
      prompt: `In many cities, households are throwing away more and more plastic waste.\n\nWhat are the causes of this problem? What measures can be taken to solve it?\n\n${TASK2_INSTRUCTION}\n\nWrite at least 250 words.`,
      minWords: 250,
      suggestedMinutes: 40,
      sampleAnswer: `In many cities around the world, the amount of plastic rubbish thrown away by families is rising quickly. This essay will explain the main reasons for this problem and suggest some measures that governments and individuals can take.

The main cause of the increase in plastic waste is the change in people's lifestyles. As people become busier, they rely more on takeaway food, bottled drinks and online deliveries, and almost all of these products come in single-use plastic. For instance, a family that orders lunch three times a week may throw away dozens of boxes, cups and bags every month. Another reason is that plastic is extremely cheap, so shops and producers have little reason to choose other materials such as paper or glass.

There are several ways to tackle this problem. Firstly, governments should introduce a fee for plastic bags and gradually ban the most common single-use items, such as straws and foam boxes, since a small charge quickly changes shoppers' habits. Secondly, local authorities could make recycling easier by providing separate bins in every residential area and collecting plastic regularly. Finally, individuals can also make a difference by bringing their own bags, bottles and food containers when they go shopping or buy takeaway food, and by separating plastic from other household rubbish so that it can be recycled.

In conclusion, the growing amount of household plastic waste is mainly caused by busy modern lifestyles and the low price of plastic. However, if governments take strong action and people change their daily habits, this problem can be reduced significantly.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Plastic is very bad for environment. Today in the city there are many plastic, in the street, in the river, in the sea. Fish eat plastic and die. It is very dangerous for animal and for people.

The cause is people. People use plastic bag every day, they don't care. Also the factory make many plastic because it is cheap.

The solution is people should not use plastic. Government must punish people who use plastic. We should plant more tree and clean the beach. I and my friends sometimes clean the beach on Sunday, it is very fun and we collect many bottle.

In conclusion, plastic is very bad and we must stop plastic now for save the earth.`,
          notesVi:
            "TR: Khoảng 120 từ; nguyên nhân chỉ một câu ('The cause is people'), giải pháp lạc đề (trồng cây, dọn bãi biển) và không nói đến rác của hộ gia đình.\nCC: Đoạn ngắn, câu rời rạc, không có câu chủ đề.\nLR: Từ rất cơ bản, lặp 'plastic' gần như mọi câu.\nGRA: Nhiều lỗi cơ bản ('there are many plastic', 'the factory make', 'for save the earth').",
        },
        {
          band: '5.5',
          text: `Nowadays, plastic waste is a big problem in many cities, especially in big cities like Hanoi. There are many causes and solutions for this problem, and I will talk about them in this essay.

There are many causes of plastic waste. Firstly, people use plastic bags every day when they go to the market or supermarket. Secondly, people buy a lot of takeaway food and drinks, for example milk tea, coffee and fast food, and they throw the plastic cups and straws after one time. Many young people buy milk tea every day, so they use many plastic cups every week. Thirdly, people are lazy to recycle, they put all rubbish in one bag. In my neighbourhood, there are no recycling bins, so it is difficult to separate the rubbish.

To solve this problem, the government should make laws to stop people using plastic bags. Moreover, schools should teach students about environment so they know plastic is harmful. Moreover, people should use paper bag and glass bottle instead of plastic. For example, in my city some coffee shops use paper straws, it is very good for the environment and customers like it. The government should also fine people who throw rubbish in the street.

In conclusion, plastic waste is a serious problem and it have many causes. If we do not act now, our cities will be full of plastic. Government, schools and people need to work together to protect the environment, because the environment is very important for our future and for our children.`,
          notesVi:
            "TR: Có cả nguyên nhân và giải pháp nhưng ý chỉ được liệt kê, ít giải thích; giải pháp 'schools should teach…', 'fine people who throw rubbish in the street' không khớp với nguyên nhân đã nêu (thiếu thùng phân loại rác lại không có giải pháp).\nCC: Chia đoạn đúng chức năng nhưng 'Moreover' lặp 2 lần liền và 'Firstly / Secondly / Thirdly' xếp ý theo danh sách.\nLR: Lặp 'environment', 'plastic'; lỗi dùng từ 'lazy to recycle', 'throw the plastic cups' (thiếu 'away').\nGRA: Chủ yếu câu ghép đơn giản; lỗi 'it have', thiếu mạo từ ('about environment', 'paper bag').",
        },
        {
          band: '6.5',
          text: `In many cities around the world, the amount of plastic rubbish thrown away by families is rising quickly. This essay will explain the main reasons for this problem and suggest some measures that governments and individuals can take.

The main cause of the increase in plastic waste is the change in people's lifestyles. As people become busier, they rely more on takeaway food, bottled drinks and online deliveries, and almost all of these products come in single-use plastic. For instance, a family that orders lunch three times a week may throw away dozens of boxes, cups and bags every month. Another reason is that plastic is extremely cheap, so shops and producers have little reason to choose other materials such as paper or glass.

There are several ways to tackle this problem. Firstly, governments should introduce a fee for plastic bags and gradually ban the most common single-use items, such as straws and foam boxes. This policy has already been successful in some countries, where the use of plastic bags fell sharply after customers had to pay for them. Secondly, local authorities could make recycling easier by providing separate bins for every residential area and collecting plastic regularly. Finally, individuals can also make a difference by bringing their own bags, bottles and food containers when they go shopping.

In conclusion, the growing amount of household plastic waste is mainly caused by busy modern lifestyle and the low price of plastic. However, if governments take strong action and people change their daily habits, this problem can be reduce significantly.`,
          notesVi:
            "TR: Trả lời đủ cả nguyên nhân và giải pháp, giải pháp khớp với nguyên nhân (đồ mang đi → phí túi nilon, mang hộp riêng); câu 'This policy has already been successful in some countries' còn chung chung, thiếu dẫn chứng.\nCC: Mỗi đoạn một chức năng rõ ràng; Firstly / Secondly / Finally ở đoạn giải pháp hợp lý nhưng hơi máy móc.\nLR: Từ vựng chủ đề tốt (single-use, residential area, tackle, take strong action); lỗi nhỏ 'busy modern lifestyle' (thiếu -s / mạo từ).\nGRA: Đa dạng cấu trúc (bị động, mệnh đề quan hệ, câu điều kiện); lỗi 'can be reduce' ít và không cản trở ý.",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Bài có một đoạn riêng cho nguyên nhân và một đoạn riêng cho giải pháp không?',
            'Mỗi giải pháp có khớp với một nguyên nhân bạn đã nêu không?',
            'Giải pháp có cụ thể (ai làm, làm gì) thay vì "should do something" không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi thân bài có mở bằng câu chủ đề báo trước nội dung không?',
            'Có dùng từ chỉ nguyên nhân – kết quả (due to, as a result, which leads to) đúng chỗ không?',
            'Có tránh lặp cùng một từ nối 2 lần liền không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 2 cặp từ đồng nghĩa (waste / rubbish, reduce / cut down on) không?',
            'Có dùng "single-use" hoặc "takeaway" đúng nghĩa không?',
            'Có tránh lặp "environment" quá 2 lần không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Có dùng could / should / would để đề xuất giải pháp không?',
            'Câu bị động (can be reduced) có đủ đuôi -ed không?',
            'Có ít nhất 1 câu điều kiện (If…) đúng không?',
          ],
        },
      ],
      planningHintsVi: [
        'Gạch chân 2 câu hỏi của đề: causes? measures?',
        'Ghi 2 nguyên nhân, rồi viết một giải pháp đối ứng cho từng nguyên nhân.',
        'Mở bài: viết lại đề + câu báo trước bài sẽ nói nguyên nhân và giải pháp.',
        'Kết bài: tóm tắt nguyên nhân chính + giải pháp chính trong 1–2 câu.',
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 10 — TASK 2: TWO-PART QUESTION (nấc 3: tự viết trong 40 phút như thi thật)
  // Đề: giới trẻ muốn làm "content creator" — vì sao? tích cực hay tiêu cực?
  // ==========================================================================
  {
    id: 'l3-i-wri-10',
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 60,
    title: {
      vi: 'Task 2 – Đề hai câu hỏi: trả lời đủ, viết trong 40 phút',
      en: 'Task 2 – Two-part questions: answer both in 40 minutes',
    },
    description: {
      vi: 'Nấc 3: viết trọn bài đề hai câu hỏi trong 40 phút như thi thật, rồi tự chấm theo 4 tiêu chí.',
      en: 'Step 3: write a full two-part essay in 40 minutes under exam conditions, then assess it on four criteria.',
    },
    teachingCards: [
      {
        title: { vi: 'Đề 2 câu hỏi: mỗi câu một thân bài', en: 'Two questions: one body paragraph each' },
        body: {
          vi: 'VD: *"Why is this happening? Is it a positive or negative development?"*\n• Thân bài 1 trả lời **câu 1** (2 lý do).\n• Thân bài 2 trả lời **câu 2** với **ý kiến rõ**: positive, negative, hay "mostly…".\nMở bài báo trước **cả 2 câu trả lời**. Chỉ tập trung một câu → TR khoảng 5.',
          en: 'E.g. *"Why is this happening? Is it a positive or negative development?"*\n• Body 1 answers **question 1** (two reasons).\n• Body 2 answers **question 2** with a **clear view**: positive, negative or "mostly…".\nThe introduction previews **both answers**. Focusing on only one question → TR around 5.',
        },
        examples: [
          {
            en: 'This is mainly because of rising house prices, and I believe it is a largely positive development.',
            vi: 'Câu mở bài trả lời ngắn cả 2 câu hỏi (lý do + đánh giá).',
          },
        ],
      },
      {
        title: { vi: '40 phút và 5 lỗi cần soát', en: '40 minutes and five errors to check' },
        body: {
          vi: '**5 phút**: gạch chân 2 câu hỏi, ghi 2 lý do + quan điểm.\n**30 phút**: viết 4 đoạn (260–290 từ).\n**5 phút**: soát **5 lỗi người Việt hay mắc**: thiếu -s (*it look*), thiếu mạo từ (*the / a*), câu cụt *Because…*, *discuss about*, dùng dấu phẩy nối hai câu.',
          en: '**5 minutes**: underline both questions; note two reasons + your view.\n**30 minutes**: write four paragraphs (260–290 words).\n**5 minutes**: check the **five common errors**: missing -s (*it look*), missing articles (*the / a*), fragments (*Because…*), *discuss about*, comma splices.',
        },
        examples: [
          { en: 'It looks glamorous. (not: It look glamorous.)', vi: 'Chủ ngữ số ít → động từ thêm -s.' },
          {
            en: 'Many people fail because the market is crowded. (not: Many people fail. Because the market is crowded.)',
            vi: '"Because…" không đứng riêng thành một câu.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-i-wri-10-ex01',
        type: 'multiple-choice',
        question:
          'Task: "More people are choosing to work for themselves. Why is this? Is this a positive or negative development?" Which introduction answers BOTH questions?',
        options: [
          'Nowadays, many people work for themselves. There are many reasons for this.',
          'More people are now self-employed, mainly because technology makes it easy to find customers online. In my view, this is a positive development overall.',
          'Working for yourself is a positive development because you can be free.',
          'Self-employment has advantages and disadvantages, which this essay will discuss.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'B trả lời ngắn cả "vì sao" và "tích cực hay tiêu cực"; các câu khác thiếu một phần.',
          en: 'B briefly answers both "why" and "positive or negative"; the others miss a part.',
        },
      },
      {
        id: 'l3-i-wri-10-ex02',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ vựng chủ đề nghề nghiệp / mạng xã hội với nghĩa của nó.',
          en: 'Match the careers and social media words with their meanings.',
        },
        pairs: [
          { left: 'content creator', right: 'someone who makes videos or posts online' },
          { left: 'stable income', right: 'money that arrives regularly' },
          { left: 'job security', right: 'a low risk of losing your work' },
          { left: 'followers', right: 'people who subscribe to your channel' },
          { left: 'qualifications', right: 'degrees and certificates' },
        ],
        explanation: {
          vi: 'Các từ này giúp bàn về nghề sáng tạo nội dung chính xác hơn "famous", "money".',
          en: 'These words discuss content creation more precisely than "famous" or "money".',
        },
      },
      {
        id: 'l3-i-wri-10-ex03',
        type: 'fill-blank',
        sentence: 'Many young people are attracted ___ the idea of working for themselves.',
        acceptedAnswers: ['to'],
        explanation: {
          vi: '"be attracted to" = bị thu hút bởi; giới từ là "to".',
          en: 'The pattern is "be attracted to something".',
        },
      },
      {
        id: 'l3-i-wri-10-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Social media has made it possible for anyone to become famous.',
          'Social media has made possible for anyone becoming famous.',
          'Social media has made it possible anyone to become famous.',
          'Social media making it possible for anyone become famous.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Cấu trúc đúng: make it possible for + người + to V.',
          en: 'The correct pattern is make it possible for + person + to + verb.',
        },
      },
      {
        id: 'l3-i-wri-10-ex05',
        type: 'fill-blank',
        sentence: 'This trend can be positive, ___ long as young people continue their education.',
        acceptedAnswers: ['as'],
        explanation: {
          vi: '"as long as" = miễn là; dùng để thêm điều kiện cho quan điểm.',
          en: '"As long as" means "only if" and adds a condition to your view.',
        },
      },
      {
        id: 'l3-i-wri-10-ex06',
        type: 'arrange-words',
        translationVi: 'Có hai lý do chính khiến xu hướng này đang diễn ra.',
        correctSentence: 'There are two main reasons why this trend is happening.',
        extraWords: ['because'],
        explanation: {
          vi: 'Câu chủ đề cho thân bài 1, trả lời câu hỏi "Why?".',
          en: 'A topic sentence for Body 1, answering "Why?".',
        },
      },
      {
        id: 'l3-i-wri-10-ex07',
        type: 'speak-sentence',
        sentence: 'I think this is both a positive and a negative development.',
        translationVi: 'Tôi nghĩ đây vừa là xu hướng tích cực vừa là xu hướng tiêu cực.',
        explanation: {
          vi: '/θ/ ở "think, both": lưỡi giữa răng, không đọc thành "tin", "bốt"; nhấn de-VEL-op-ment.',
          en: 'For /θ/ in "think" and "both", put your tongue between your teeth; stress de-VEL-op-ment.',
        },
      },
    ],
    writingTask: {
      id: 'l3-i-wri-10-task',
      taskNumber: 2,
      prompt: `Nowadays, many young people dream of becoming online content creators rather than choosing traditional careers such as teaching or engineering.\n\nWhy is this happening? Is this a positive or negative development?\n\n${TASK2_INSTRUCTION}\n\nWrite at least 250 words.`,
      minWords: 250,
      suggestedMinutes: 40,
      sampleAnswer: `These days, many teenagers say that they want to make videos online for a living instead of becoming teachers, doctors or engineers. This essay will explain why this trend is happening and argue that, despite some positive sides, it is mostly a negative development.

There are two main reasons why online content creation attracts so many young people. The first is that successful creators seem to enjoy an exciting and glamorous lifestyle. Young people see them travelling, trying new products and earning money from their hobbies, so this career looks much more enjoyable than sitting in an office. The second reason is that it appears easy to start. Anyone with a smartphone can upload a video, and stories of ordinary people who became famous overnight make teenagers believe that they can do the same.

Admittedly, this trend has encouraged some young people to develop useful skills such as editing, design and public speaking, which are valuable in many jobs. However, I believe it is more negative than positive. The main problem is that only a very small number of creators earn a stable income, while most of them earn little or nothing. If young people give up their studies to follow this dream, they may have no qualifications to fall back on when it fails. Moreover, chasing views and likes can damage mental health, as creators constantly compare themselves with others.

In conclusion, young people are attracted to content creation because it looks glamorous and easy to begin. However, I believe this is generally a negative development unless they treat it as a hobby or a side job and continue their education at the same time.`,
      bandSamples: [
        {
          band: '4.0',
          text: `Now social media is very popular. Young people like to watch video on phone every day. They want to be famous like the people in the video. Being content creator is easy, only need a phone and make video. They can earn many money and buy car, house.

Teacher and engineer is very hard job, must study many years and the salary is low. So young people don't like. My father is engineer and he work very hard every day.

I think it is negative because young people don't study, they only play phone. Parents must control their children. School should teach student about social media and the danger of internet.

In conclusion, social media is good and bad, we should use it carefully.`,
          notesVi:
            "TR: Khoảng 125 từ; câu hỏi 'positive or negative' chỉ được trả lời một câu, phần còn lại chuyển sang khuyên bố mẹ, nhà trường; kết bài lạc sang 'social media'.\nCC: Đoạn ngắn, không có câu chủ đề; ý nhảy giữa mạng xã hội, lương giáo viên, phụ huynh.\nLR: Từ rất cơ bản ('many money', 'play phone'), lặp 'young people'.\nGRA: Lỗi cơ bản dày đặc (thiếu chủ ngữ 'only need a phone', 'Teacher and engineer is very hard job', 'he work').",
        },
        {
          band: '5.5',
          text: `In today's world, technology is developing very fast and social media is very popular. Many young people want to become content creator instead of teacher or engineer. This is a new trend in many countries. In this essay I will explain the reasons and give my opinion.

There are many reasons why young people want to become content creator. Firstly, they can earn a lot of money. Some famous creators earn millions dollars every year. Secondly, they can be famous and have many followers. Thirdly, they can work at home and they don't need a boss. Fourthly, they can travel to many places and make videos about their trips, so their life is very interesting. For example, my friend make videos about cooking and he has 10,000 followers, so he is very proud.

I think this is a positive development. Because young people can be creative and show their talents. They can learn many skills like editing videos and talking in front of the camera. For example, many young people learn how to use editing apps and they become more confident. However, it is not a stable job. Many people try but they fail and they don't have money. Also they spend too much time on the phone and it is not good for their eyes and their health.

In conclusion, there are many reasons why young people want to be content creators and I think it is positive development, but they should be careful and they should still study hard at school.`,
          notesVi:
            "TR: Trả lời cả 2 câu hỏi nhưng quan điểm mâu thuẫn: nói 'positive' rồi liệt kê nhiều điểm tiêu cực mà không kết luận rõ.\nCC: Liệt kê lý do bằng Firstly / Secondly / Thirdly / Fourthly; câu cụt 'Because young people can be creative…' làm đứt mạch.\nLR: Đủ từ để diễn đạt nhưng lặp 'content creator', 'many'; lỗi 'millions dollars', thiếu mạo từ ('it is positive development').\nGRA: Chủ yếu câu đơn; lỗi chia động từ ('my friend make') và câu cụt bắt đầu bằng 'Because'.",
        },
        {
          band: '6.5',
          text: `These days, many teenagers say that they want to make videos online for a living instead of becoming teachers, doctors or engineers. This essay will explain why this trend is happening and argue that it is a mostly negative development, although it has some positive sides.

There are two main reasons why online content creation attracts so many young people. The first is that successful creators seem to enjoy an exciting and glamorous lifestyle. Young people see them travelling, trying new products and earning money from their hobbies, so this career looks much more enjoyable than sitting in an office. The second reason is that it appears easy to start. Anyone with a smartphone can upload a video, and stories of ordinary people who became famous overnight make teenagers believe that they can do the same.

In my opinion, this trend is more negative than positive. The main problem is that only a very small number of creators earn a stable income, while most of them earn little or nothing. If young people give up their studies to follow this dream, they may have no qualifications to fall back on when it fails. Moreover, chasing views and likes can damage mental health, as creators constantly compare themselves with others. Admittedly, this trend has encouraged some young people to develop useful skills such as editing, design and public speaking, which are valuable in many jobs.

In conclusion, young people are attracted to content creation because it look glamorous and easy to begin. However, I believe this is generally a negative development unless they treat it as a hobby or a side job and continue their education at the same time.`,
          notesVi:
            "TR: Trả lời đủ 2 câu hỏi (2 lý do + quan điểm 'mostly negative') và giữ quan điểm nhất quán; ý được phát triển, đôi chỗ còn khái quát ('famous overnight').\nCC: Mạch bài rõ, câu chủ đề tốt; tuy vậy câu nhượng bộ 'Admittedly…' đặt ở cuối đoạn 3 làm đoạn văn kết thúc lệch hướng.\nLR: Từ vựng khá rộng và chính xác (glamorous, stable income, fall back on, chasing views), ít lỗi.\nGRA: Nhiều cấu trúc phức (If…, while…, unless…, which…); lỗi nhỏ 'it look glamorous' không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            'Thân bài 1 có trả lời "Why?" bằng ít nhất 2 lý do được giải thích không?',
            'Thân bài 2 có nói rõ positive / negative (hoặc "mostly…") không?',
            'Mở bài có báo trước cả 2 câu trả lời không?',
            'Bài có từ 250 từ trở lên và viết xong trong 40 phút không?',
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            'Mỗi thân bài có trả lời đúng một câu hỏi của đề không?',
            'Câu nhượng bộ (Admittedly, Although) có đặt ở chỗ hợp lý (đầu đoạn) không?',
            'Có tránh câu cụt bắt đầu bằng "Because" không?',
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            'Có dùng ít nhất 3 từ chủ đề (stable income, job security, followers…) đúng không?',
            'Có dùng từ chung thay vì tên thương hiệu, tên ứng dụng cụ thể không?',
            'Có tránh lặp "content creator" bằng từ thay thế (this career, such work) không?',
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            'Đã soát 5 lỗi hay gặp (thiếu -s, mạo từ, câu cụt, discuss about, dấu phẩy nối câu) chưa?',
            'Có ít nhất 1 câu điều kiện hoặc câu với "unless / as long as" không?',
            'Cấu trúc "make it possible for… to…" (nếu dùng) có đúng không?',
          ],
        },
      ],
      planningHintsVi: [
        '5 phút đầu: gạch chân "Why…?" và "positive or negative?"; ghi 2 lý do + quan điểm của bạn.',
        'Mở bài 2 câu: viết lại đề + câu báo trước cả 2 câu trả lời.',
        'Thân bài 1: 2 lý do có giải thích. Thân bài 2: quan điểm + 2 lập luận + 1 câu nhượng bộ đặt ở đầu đoạn.',
        '5 phút cuối: soát 5 lỗi trong thẻ "40 phút và 5 lỗi cần soát".',
      ],
    },
    miniTest: [],
  },
]
