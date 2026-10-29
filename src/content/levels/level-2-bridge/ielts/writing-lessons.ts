/**
 * writing-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "BRIDGE" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK IELTS
 * CHẶNG: "LÀM QUEN IELTS WRITING"
 *
 * Ở level-2-foundation (bài l2-write-10) người học mới tập so sánh vài con số.
 * Chặng này giới thiệu ĐÚNG ĐỊNH DẠNG ĐỀ THẬT của cả 2 task:
 *   01 l2b-i-wri-01  Task 1 biểu đồ cột: mở bài paraphrase + overview  (mode 'writing')
 *   02 l2b-i-wri-02  Task 1 dạng bảng: chọn đặc điểm chính, số gần đúng  (mode 'writing')
 *   03 l2b-i-wri-03  Task 2: đọc đề, bố cục 4 đoạn, mở bài + kết bài    (mode 'practice')
 *   04 l2b-i-wri-04  Task 2: viết MỘT đoạn thân bài theo PEEL           (mode 'writing')
 *   05 l2b-i-wri-05  Task 2: viết trọn bài luận nêu quan điểm             (mode 'writing')
 *
 * Cấu trúc 1 bài mode 'writing':
 *   teachingCards (chiến thuật) → exercises khởi động → writingTask (WritingTaskV3)
 *   writingTask gồm: đề (prompt), chartData (Task 1), bài mẫu tốt (sampleAnswer),
 *   3 bài mẫu theo band 3.5 / 4.5 / 5.5 (bandSamples — bài band thấp CÓ LỖI THẬT, để người học
 *   tự so), checklist tự chấm 4 tiêu chí (TA/TR, CC, LR, GRA) và gợi ý lập dàn ý (planningHintsVi).
 *
 * Quy ước id: bài "l2b-i-wri-NN", bài tập "l2b-i-wri-NN-exMM", task "l2b-i-wri-NN-task".
 * Số liệu biểu đồ là tự đặt, tên trường / thị trấn là hư cấu.
 * Kiểu dữ liệu: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeIeltsWritingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Task 1 — biểu đồ cột: mở bài paraphrase + câu overview
  //        Đề: hoạt động sau giờ học yêu thích của 100 nam, 100 nữ (2025)
  // ==========================================================================
  {
    id: "l2b-i-wri-01",
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: { vi: "Writing Task 1: mở bài và overview", en: "Writing Task 1: introduction and overview" },
    description: {
      vi: "Biết cấu trúc đề Writing, viết mở bài paraphrase và câu overview cho một biểu đồ cột.",
      en: "Learn the Writing test format and write a paraphrased introduction and an overview for a bar chart.",
    },
    teachingCards: [
      {
        title: { vi: "Bài thi IELTS Writing", en: "The IELTS Writing test" },
        body: {
          vi: "**60 phút, 2 bài:**\n- **Task 1**: mô tả biểu đồ / bảng số liệu, **ít nhất 150 từ**, nên dành **20 phút**.\n- **Task 2**: bài luận nêu quan điểm, **ít nhất 250 từ**, khoảng **40 phút**. Task 2 được tính **gấp đôi** Task 1.\nGiám khảo chấm 4 tiêu chí: **hoàn thành yêu cầu đề (TA/TR)**, **mạch lạc (CC)**, **từ vựng (LR)**, **ngữ pháp (GRA)**.",
          en: "**60 minutes, 2 tasks:**\n- **Task 1**: describe a chart or table, **at least 150 words**, about **20 minutes**.\n- **Task 2**: an opinion essay, **at least 250 words**, about **40 minutes**. Task 2 counts **twice as much** as Task 1.\nExaminers use 4 criteria: **task achievement/response (TA/TR)**, **coherence and cohesion (CC)**, **vocabulary (LR)** and **grammar (GRA)**.",
        },
        examples: [{ en: "Task 1: 20 minutes. Task 2: 40 minutes.", vi: "Task 1: 20 phút. Task 2: 40 phút." }],
      },
      {
        title: { vi: "3 phần của bài Task 1", en: "The three parts of a Task 1 answer" },
        body: {
          vi: "1. **Mở bài (1 câu)**: viết lại đề bằng từ khác — **paraphrase**.\n2. **Overview (1–2 câu)**: điều **nổi bật nhất** của biểu đồ, bắt đầu bằng **Overall,...** — không cần số.\n3. **Thân bài (2 đoạn)**: số liệu cụ thể + **so sánh**, gom các ý giống nhau.\nKhông nêu ý kiến cá nhân, không đoán lý do.",
          en: "1. **Introduction (1 sentence)**: say what the chart shows in **your own words** — **paraphrase**.\n2. **Overview (1–2 sentences)**: the **most important features**, starting with **Overall,...** — no numbers needed.\n3. **Details (2 paragraphs)**: numbers + **comparisons**, grouping similar points.\nNo personal opinions and no guessing reasons.",
        },
        examples: [{ en: "The chart shows → The bar chart illustrates", vi: "shows → illustrates (paraphrase)" }],
      },
      {
        title: { vi: "Viết câu overview", en: "Writing the overview" },
        body: {
          vi: "Overview trả lời câu hỏi: **'Nhìn 5 giây, thấy gì rõ nhất?'**\n- Cái nào **cao nhất / thấp nhất**?\n- Có **khác biệt lớn** nào (nam ↔ nữ)?\nBài **không có overview** rất khó vượt band 5 ở tiêu chí TA.\nVD: **Overall, sport was the most popular activity, and boys and girls had quite different favourites.**",
          en: "The overview answers: **'What can I see in five seconds?'**\n- What is the **highest / lowest**?\n- Is there a **big difference** (boys ↔ girls)?\nAn answer **without an overview** rarely gets above band 5 for TA.\nE.g. **Overall, sport was the most popular activity, and boys and girls had quite different favourites.**",
        },
        examples: [{ en: "Overall, sport was the most popular activity.", vi: "Nhìn chung, thể thao là hoạt động được yêu thích nhất." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-wri-01-ex01",
        type: 'multiple-choice',
        question: "How long should you spend on Writing Task 1?",
        options: ["About 10 minutes", "About 20 minutes", "About 40 minutes", "About 60 minutes"],
        correctIndex: 1,
        explanation: {
          vi: "Task 1 khoảng 20 phút; 40 phút còn lại cho Task 2.",
          en: "About 20 minutes; the other 40 minutes are for Task 2.",
        },
      },
      {
        id: "l2b-i-wri-01-ex02",
        type: 'multiple-choice',
        question: "Which task is worth MORE marks?",
        options: ["Task 1", "Task 2", "They are equal", "It depends on the chart"],
        correctIndex: 1,
        explanation: {
          vi: "Task 2 được tính gấp đôi Task 1.",
          en: "Task 2 counts twice as much as Task 1.",
        },
      },
      {
        id: "l2b-i-wri-01-ex03",
        type: 'multiple-choice',
        question: "Which is the best paraphrase of 'The bar chart shows the favourite activities of students'?",
        options: [
          "The bar chart shows the favourite activities of students.",
          "The bar chart illustrates which activities students liked best.",
          "Students like activities.",
          "I think the chart is about students.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Đổi từ (shows → illustrates, favourite → liked best) nhưng giữ nguyên nghĩa.",
          en: "It changes the words (shows → illustrates, favourite → liked best) but keeps the meaning.",
        },
      },
      {
        id: "l2b-i-wri-01-ex04",
        type: 'multiple-choice',
        question: "Which sentence is an OVERVIEW?",
        options: [
          "38 boys chose sport.",
          "Overall, sport was the most popular activity, and boys and girls had different favourites.",
          "12 girls chose video games.",
          "I like drawing best.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Overview nêu đặc điểm lớn nhất, bắt đầu bằng Overall, không cần số.",
          en: "An overview gives the biggest features, starts with 'Overall' and needs no numbers.",
        },
      },
      {
        id: "l2b-i-wri-01-ex05",
        type: 'true-false',
        statement: "An overview should include lots of exact numbers.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Số cụ thể để ở thân bài; overview chỉ nêu bức tranh chung.",
          en: "False. Numbers go in the body; the overview gives the general picture.",
        },
      },
      {
        id: "l2b-i-wri-01-ex06",
        type: 'match-pairs',
        instruction: { vi: "Nối từ với từ đồng nghĩa để paraphrase.", en: "Match words with synonyms for paraphrasing." },
        pairs: [
          { left: "shows", right: "illustrates" },
          { left: "the number of", right: "how many" },
          { left: "students", right: "pupils" },
          { left: "like best", right: "prefer" },
          { left: "about", right: "approximately" },
        ],
        explanation: {
          vi: "Dùng từ đồng nghĩa giúp mở bài không chép lại đề.",
          en: "Synonyms help you avoid copying the question.",
        },
      },
      {
        id: "l2b-i-wri-01-ex07",
        type: 'speak-sentence',
        sentence: "Overall, sport was the most popular activity.",
        translationVi: "Nhìn chung, thể thao là hoạt động được yêu thích nhất.",
        explanation: {
          vi: "Nhấn overALL, POPular, acTIVity. Đọc rõ /st/ trong most.",
          en: "Stress overALL, POPular and acTIVity. Say the /st/ in 'most'.",
        },
      },
    ],
    writingTask: {
      id: "l2b-i-wri-01-task",
      taskNumber: 1,
      prompt:
        "The bar chart below shows the favourite after-school activities of 100 boys and 100 girls at a secondary school in 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 120 words.",
      chartData: {
        chartType: 'bar',
        title: "Favourite after-school activities of 100 boys and 100 girls at Riverside Secondary School, 2025",
        unit: "students",
        labels: ["Sport", "Video games", "Reading", "Music", "Drawing"],
        series: [
          { name: "Boys", values: [38, 30, 10, 12, 10] },
          { name: "Girls", values: [22, 12, 26, 20, 20] },
        ],
      },
      minWords: 120,
      suggestedMinutes: 20,
      sampleAnswer:
        "The bar chart illustrates which after-school activities 100 boys and 100 girls at a secondary school liked best in 2025.\n\nOverall, sport was the most popular activity, and boys and girls had quite different favourites. Boys preferred sport and games, while girls' choices were spread more evenly across the five activities.\n\nSport was chosen by 38 boys, which was the highest figure in the chart. Video games came second among boys, with 30 votes, compared with only 12 girls. By contrast, very few boys chose reading, music or drawing, with only 10 to 12 boys in each case.\n\nFor girls, reading was the top choice, with 26 students, more than twice the number of boys. Sport came second for girls (22), while music and drawing were each chosen by 20 girls. Video games were the least popular activity among girls. In total, sport was chosen by 60 students, twice as many as drawing, which was the least popular activity overall (30).",
      bandSamples: [
        {
          band: "3.5",
          text: "The chart show about activity of student in school. Boys like sport 38 and girls 22. Video games boys is 30 and girls 12. Reading boys 10 and girls 26. Music boys 12 and girls is 20. Drawing boys 10 and girls 20. I think boys like sport because boys is more strong and they like play outside. Girls like reading is good.",
          notesVi:
            "TA: Không có overview, chỉ liệt kê số, lại thêm ý kiến cá nhân (I think...) và quá ngắn (khoảng 65 từ). CC: Không chia đoạn, các câu lặp cùng một khuôn. LR/GRA: Lỗi cơ bản dày đặc (the chart show, boys is, more strong) và nhiều câu thiếu động từ khiến người đọc khó hiểu.",
        },
        {
          band: "4.5",
          text: "The bar chart shows the favourite after-school activities of 100 boys and 100 girls at a secondary school in 2025.\n\nSport is the most popular activity for boys, 38 boys choose it. Girls choose sport 22. Video games is the second for boys with 30 and girls only 12. For reading, girls is 26 and boys is 10, so girls like reading more than boys. Music have 12 boys and 20 girls. Drawing have 10 boys and 20 girls.\n\nIn conclusion, boys like sport and video games more than girls but girls like reading, music and drawing more than boys. Sport is the most popular.",
          notesVi:
            "TA: Mở bài chép gần nguyên đề; có ý tổng quát nhưng để ở cuối và chưa rõ; số liệu kể lần lượt từng cột; thi thật sẽ bị trừ vì dưới 150 từ. CC: Có chia đoạn và vài từ nối (so, but) nhưng lặp 'boys... girls' liên tục. LR/GRA: Sai thì (is, choose cho năm 2025) và hoà hợp chủ–vị (girls is, music have).",
        },
        {
          band: "5.5",
          text: "The bar chart illustrates the favourite after-school activities of 200 students, 100 boys and 100 girls, at a secondary school in 2025.\n\nOverall, sport was the most popular activity, and there were clear differences between boys and girls.\n\nSport was chosen by 38 boys, which was the highest number in the chart, and video games was the second favourite of boys with 30. In contrast, only 12 girls choose video games. Boys were not very interested in quieter activities such as reading, music and drawing, with around 10 boys for each of them.\n\nOn the other hand, reading was the most popular activity for girls, with 26 students. This is more than twice the number of boys. Music and drawing had the same number of girls, 20 each, while 22 girls liked sport. In total, sport was chosen by 60 students, so it was clearly the favourite activity in the school.",
          notesVi:
            "TA: Có mở bài paraphrase và overview rõ ràng; chọn được số liệu chính để so sánh, tuy gom ý chưa thật gọn. CC: Chia đoạn hợp lý, từ nối đa dạng (In contrast, On the other hand, while). LR/GRA: Có cấu trúc tốt 'more than twice the number of'; còn vài lỗi thì và hoà hợp (only 12 girls choose, video games was).",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            "Câu mở bài có viết lại đề bằng từ của bạn (không chép nguyên văn) không?",
            "Có câu 'Overall,...' nói điều nổi bật nhất không?",
            "Có nêu số cao nhất, thấp nhất và so sánh nam – nữ không?",
            "Bài có tránh nêu ý kiến cá nhân (I think...) không?",
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            "Bài có chia 3–4 đoạn (mở bài, overview, 2 đoạn chi tiết) không?",
            "Có dùng từ nối so sánh (while, in contrast, compared with) không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có tránh lặp 'like' bằng prefer, chose, the most popular không?",
            "Tên các hoạt động có viết đúng chính tả không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Số liệu năm 2025 có dùng thì quá khứ (was, chose) không?",
            "Chủ ngữ số nhiều có đi với động từ số nhiều (boys were) không?",
            "Có ít nhất 1 câu so sánh đúng (more than, the most) không?",
          ],
        },
      ],
      planningHintsVi: [
        "Nhìn biểu đồ 1–2 phút: cột nào cao nhất, thấp nhất? Nam và nữ khác nhau ở đâu?",
        "Mở bài: The bar chart illustrates... + đổi từ (favourite → liked best).",
        "Overview: Overall, ... + 2 đặc điểm lớn nhất, không ghi số.",
        "Đoạn 3: nói về nam (sport, video games). Đoạn 4: nói về nữ (reading, music, drawing).",
        "Năm 2025 đã qua → dùng quá khứ: was, chose, preferred.",
        "Thi thật cần ít nhất 150 từ; bài làm quen này tập với 120 từ.",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2: Task 1 — dạng bảng: chọn đặc điểm chính, số gần đúng, while/whereas
  //        Đề: số người lớn và trẻ em đến 4 điểm tham quan ở Greenford (2024)
  // ==========================================================================
  {
    id: "l2b-i-wri-02",
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 35,
    title: { vi: "Task 1 dạng bảng: chọn đặc điểm chính", en: "Task 1 tables: choosing key features" },
    description: {
      vi: "Chọn số liệu quan trọng trong bảng, gom ý và so sánh bằng while, just under, four times as many.",
      en: "Select the important numbers in a table, group them and compare with 'while', 'just under' and 'four times as many'.",
    },
    teachingCards: [
      {
        title: { vi: "Đừng tả mọi con số", en: "Don't describe every number" },
        body: {
          vi: "Bảng có nhiều số, nhưng bạn chỉ chọn **đặc điểm chính**:\n- Số **cao nhất / thấp nhất**\n- **Khác biệt lớn** (người lớn ↔ trẻ em)\n- Những thứ **bằng nhau** (2 tổng giống nhau)\n- **Ngoại lệ** (nơi duy nhất trẻ em đông hơn người lớn)\nRồi **gom** các ý giống nhau vào cùng một đoạn.",
          en: "A table has many numbers, but choose only the **key features**:\n- the **highest / lowest** figures\n- **big differences** (adults ↔ children)\n- things that are **the same** (two equal totals)\n- an **exception** (the only place with more children than adults)\nThen **group** similar points in the same paragraph.",
        },
        examples: [
          { en: "The Science Centre was the only attraction with more children than adults.", vi: "Trung tâm Khoa học là nơi duy nhất có trẻ em đông hơn người lớn." },
        ],
      },
      {
        title: { vi: "Nói số gần đúng", en: "Approximate numbers" },
        body: {
          vi: "Không phải lúc nào cũng cần số chính xác:\n- **just over** (hơn một chút): 205 → just over 200\n- **just under** (dưới một chút): 49% → just under half\n- **around / about**: 98 → around 100\n- **half, a third, a quarter**: ½, ⅓, ¼\n- **twice / four times as many as**: gấp 2 / gấp 4 lần",
          en: "You don't always need exact numbers:\n- **just over**: 205 → just over 200\n- **just under**: 49% → just under half\n- **around / about**: 98 → around 100\n- **half, a third, a quarter**: ½, ⅓, ¼\n- **twice / four times as many as**",
        },
        examples: [{ en: "Just over half of the visitors were children.", vi: "Hơn một nửa số khách một chút là trẻ em." }],
      },
      {
        title: { vi: "So sánh trong 1 câu: while / whereas", en: "Comparing in one sentence: while / whereas" },
        body: {
          vi: "Nối hai số đối lập bằng **while** hoặc **whereas** (trong khi):\n**Adults preferred the Old Castle, while children preferred the Science Centre.**\nNhớ chọn **thì**: số liệu của năm đã qua (2024) → **quá khứ đơn** (visited, was, were).",
          en: "Join two contrasting numbers with **while** or **whereas**:\n**Adults preferred the Old Castle, while children preferred the Science Centre.**\nRemember the **tense**: data from a past year (2024) → **past simple** (visited, was, were).",
        },
        examples: [
          { en: "180,000 adults visited the castle, whereas only 20,000 children did.", vi: "180.000 người lớn đến lâu đài, trong khi chỉ có 20.000 trẻ em." },
        ],
      },
    ],
    exercises: [
      {
        id: "l2b-i-wri-02-ex01",
        type: 'multiple-choice',
        question: "Data (thousands) — City Museum: 120 adults + 30 children; Flower Park: 250 + 150; Science Centre: 90 + 110; Old Castle: 180 + 20. Which attraction had the most visitors in total?",
        options: ["City Museum", "Flower Park", "Science Centre", "Old Castle"],
        correctIndex: 1,
        explanation: {
          vi: "Flower Park: 250 + 150 = 400 nghìn, cao nhất.",
          en: "Flower Park: 250 + 150 = 400 thousand, the highest.",
        },
      },
      {
        id: "l2b-i-wri-02-ex02",
        type: 'multiple-choice',
        question: "Data — Science Centre: 110,000 children and 90,000 adults (200,000 in total). Which phrase describes the children best?",
        options: ["just under half of the visitors", "just over half of the visitors", "about a quarter of the visitors", "twice as many as the adults"],
        correctIndex: 1,
        explanation: {
          vi: "110/200 = 55% → hơn một nửa một chút: just over half.",
          en: "110 out of 200 = 55% → just over half.",
        },
      },
      {
        id: "l2b-i-wri-02-ex03",
        type: 'multiple-choice',
        question: "How can you describe 49%?",
        options: ["just under half", "just over half", "about a quarter", "exactly a third"],
        correctIndex: 0,
        explanation: {
          vi: "49% thấp hơn 50% một chút → just under half.",
          en: "49% is a little below 50% → just under half.",
        },
      },
      {
        id: "l2b-i-wri-02-ex04",
        type: 'arrange-words',
        translationVi: "Người lớn thích lâu đài cổ, trong khi trẻ em thích trung tâm khoa học.",
        correctSentence: "Adults preferred the Old Castle, while children preferred the Science Centre.",
        extraWords: ["because"],
        explanation: {
          vi: "'while' nối hai ý đối lập trong một câu.",
          en: "'While' joins two contrasting ideas in one sentence.",
        },
      },
      {
        id: "l2b-i-wri-02-ex05",
        type: 'true-false',
        statement: "In Task 1, you should describe every number in the table.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Chọn đặc điểm chính và gom ý, không kể hết mọi số.",
          en: "False. Select key features and group them; don't list every number.",
        },
      },
      {
        id: "l2b-i-wri-02-ex06",
        type: 'multiple-choice',
        question: "The table shows data from 2024. Which verb form should you use?",
        options: ["visit", "visited", "will visit", "are visiting"],
        correctIndex: 1,
        explanation: {
          vi: "Năm đã qua → quá khứ đơn: visited.",
          en: "A past year → past simple: visited.",
        },
      },
      {
        id: "l2b-i-wri-02-ex07",
        type: 'fill-blank',
        sentence: "The museum had 120,000 adults and 30,000 children, so there were four times as ___ adults as children.",
        acceptedAnswers: ["many"],
        explanation: {
          vi: "four times as many as = gấp 4 lần (dùng với danh từ đếm được).",
          en: "'Four times as many as' is used with countable nouns.",
        },
      },
      {
        id: "l2b-i-wri-02-ex08",
        type: 'speak-sentence',
        sentence: "Just over half of the visitors were children.",
        translationVi: "Hơn một nửa số khách một chút là trẻ em.",
        explanation: {
          vi: "'half' đọc /hɑːf/, chữ l câm. Đọc rõ /st/ trong just.",
          en: "'Half' is /hɑːf/ — the l is silent. Say the /st/ in 'just'.",
        },
      },
    ],
    writingTask: {
      id: "l2b-i-wri-02-task",
      taskNumber: 1,
      prompt:
        "The table below shows the number of adults and children who visited four attractions in the town of Greenford in 2024.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
      chartData: {
        chartType: 'table',
        title: "Visitors to four attractions in Greenford, 2024 (thousands)",
        unit: "thousand visitors",
        labels: ["City Museum", "Flower Park", "Science Centre", "Old Castle"],
        series: [
          { name: "Adults", values: [120, 250, 90, 180] },
          { name: "Children", values: [30, 150, 110, 20] },
        ],
      },
      minWords: 150,
      suggestedMinutes: 20,
      sampleAnswer:
        "The table illustrates how many adults and children visited four tourist attractions in the town of Greenford in 2024.\n\nOverall, the Flower Park was by far the most popular attraction for both groups. Adults outnumbered children at every attraction except the Science Centre, which was the only place that children preferred.\n\nThe Flower Park received 400,000 visitors in total, including 250,000 adults and 150,000 children. The Old Castle and the City Museum were also much more popular with adults. The castle attracted 180,000 adults but only 20,000 children, the lowest figure in the table, while the museum had 120,000 adults, four times as many as children (30,000). With 150,000 visitors altogether, the museum was the least visited attraction.\n\nThe Science Centre was the exception. Children made up just over half of its 200,000 visitors (110,000), compared with 90,000 adults. Interestingly, the Science Centre and the Old Castle had exactly the same total number of visitors, but they appealed to very different age groups.",
      bandSamples: [
        {
          band: "3.5",
          text: "The table is about visitor in Greenford. City Museum have 120 adults and 30 children. Flower Park have 250 adults and 150 children. Science Centre have 90 adults and 110 children. Old Castle have 180 adults and 20 children. Flower Park is very beautiful so many people go. Old Castle is not for children because it is boring for them.",
          notesVi:
            "TA: Chép lại từng số, thiếu đơn vị 'nghìn', không có overview, lại tự đoán lý do (beautiful, boring) — Task 1 không yêu cầu điều này. CC: Chỉ một đoạn, các câu cùng một khuôn 'X have...'. LR/GRA: Lỗi hoà hợp chủ–vị (Museum have), dùng hiện tại cho năm 2024, thiếu mạo từ 'the'.",
        },
        {
          band: "4.5",
          text: "The table shows the number of adults and children who visited four attractions in Greenford in 2024.\n\nThe Flower Park is the most popular place. There were 250 thousand adults and 150 thousand children visit it. The Old Castle had 180 thousand adults but only 20 thousand children, so children don't like the castle very much. The City Museum had 120 thousand adults and 30 thousand children.\n\nThe Science Centre is different because it have more children than adult. There are 110 thousand children and 90 thousand adults.\n\nOverall, adults visit more than children in most attractions and the Flower Park is the most popular.",
          notesVi:
            "TA: Có nêu điểm chính (Flower Park đông nhất, Science Centre khác biệt) nhưng overview để cuối, mở bài chép nguyên đề, và chưa đủ 150 từ. CC: Chia đoạn được, ý khá rõ nhưng từ nối đơn giản (but, so). LR/GRA: Trộn hiện tại và quá khứ, sai cấu trúc 'There were... adults visit it', thiếu -s (than adult).",
        },
        {
          band: "5.5",
          text: "The table illustrates how many adults and children visited four attractions in Greenford in 2024.\n\nOverall, the Flower Park was the most popular attraction, and adults were the larger group at almost every place. The only exception was the Science Centre.\n\nThe Flower Park attracted 250,000 adults and 150,000 children, which made a total of 400,000 visitors. The Old Castle was also popular with adults, with 180,000, whereas only 20,000 children visited it. Similarly, the City Museum had 120,000 adult visitors, four times as many as children. With only 150,000 visitors in total, the museum was the least popular attraction.\n\nIn contrast, the Science Centre had more children than adults, 110,000 compared with 90,000. This mean that children made up just over half of the visitors there. It is interesting that the Science Centre and the Old Castle has the same total number of visitors, 200,000 each, but their visitors were very different in age.",
          notesVi:
            "TA: Mở bài paraphrase, overview rõ ở đầu, chọn đúng đặc điểm chính (Flower Park, ngoại lệ Science Centre, 2 tổng bằng nhau). CC: Gom ý hợp lý, từ nối tốt (whereas, Similarly, In contrast). LR/GRA: Dùng được 'four times as many as', 'just over half'; còn lỗi hoà hợp (This mean, has the same).",
        },
      ],
      checklist: [
        {
          criterion: 'TA',
          questionsVi: [
            "Có câu overview nêu nơi đông khách nhất và ngoại lệ (Science Centre) không?",
            "Có ghi đúng đơn vị (250 trong bảng = 250,000 người) không?",
            "Bài có chọn đặc điểm chính thay vì kể lần lượt mọi con số không?",
            "Bài có đủ 150 từ không?",
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            "Các ý giống nhau (nơi người lớn đông hơn) có được gom vào một đoạn không?",
            "Có dùng while / whereas / in contrast để so sánh không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có dùng cách nói gần đúng (just over half, around) không?",
            "Có tránh lặp 'visit' bằng attract, receive, be popular with không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Năm 2024 có dùng quá khứ đơn từ đầu đến cuối không?",
            "Động từ có hợp với chủ ngữ (the museum had, children were) không?",
            "Có câu so sánh 'twice / four times as many as' đúng không?",
          ],
        },
      ],
      planningHintsVi: [
        "Cộng tổng mỗi nơi trước: 150, 400, 200, 200 — bạn thấy điều gì?",
        "Tìm ngoại lệ: nơi duy nhất trẻ em nhiều hơn người lớn.",
        "Đoạn chi tiết 1: 3 nơi người lớn đông hơn. Đoạn 2: Science Centre + 2 tổng bằng nhau.",
        "Nhớ đơn vị: 250 trong bảng = 250,000 người.",
        "Năm 2024 → quá khứ đơn: visited, attracted, had.",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3 (luyện tập): Task 2 — đọc đề, bố cục 4 đoạn, mở bài và kết bài
  //        Đề mẫu: học nấu ăn ở trường; bài tự viết: làm tình nguyện
  // ==========================================================================
  {
    id: "l2b-i-wri-03",
    skill: 'writing',
    mode: 'practice',
    estimatedMinutes: 15,
    title: { vi: "Task 2: hiểu đề, mở bài và kết bài", en: "Task 2: the question, the introduction and the conclusion" },
    description: {
      vi: "Đọc đề bài luận nêu quan điểm, lập bố cục 4 đoạn và viết mở bài nêu rõ ý kiến.",
      en: "Read an opinion question, plan four paragraphs and write an introduction with a clear opinion.",
    },
    teachingCards: [
      {
        title: { vi: "Đọc đề Task 2: chủ đề + yêu cầu", en: "Reading a Task 2 question: topic + task" },
        body: {
          vi: "Mỗi đề có 2 phần:\n- **Chủ đề** (topic): VD 'trẻ em học nấu ăn ở trường'.\n- **Yêu cầu** (task): **To what extent do you agree or disagree?** → bạn phải nêu **rõ quan điểm** và **giữ nguyên** nó đến hết bài.\nGạch chân cả hai. Viết lệch chủ đề = điểm TR rất thấp.",
          en: "Every question has two parts:\n- **The topic**: e.g. 'children learning to cook at school'.\n- **The task**: **To what extent do you agree or disagree?** → give a **clear opinion** and **keep it** until the end.\nUnderline both. Writing off-topic = a very low TR score.",
        },
        examples: [
          {
            en: "Some people think that all children should learn to cook at school. To what extent do you agree or disagree?",
            vi: "Một số người cho rằng mọi trẻ em nên học nấu ăn ở trường. Bạn đồng ý hay không đồng ý đến mức nào?",
          },
        ],
      },
      {
        title: { vi: "Bố cục 4 đoạn", en: "A four-paragraph plan" },
        body: {
          vi: "1. **Mở bài**: paraphrase đề + nêu ý kiến.\n2. **Thân bài 1**: lý do 1 + giải thích + ví dụ.\n3. **Thân bài 2**: lý do 2 + giải thích + ví dụ.\n4. **Kết bài**: nhắc lại ý kiến bằng từ khác + tóm tắt 2 lý do.\nBố cục đơn giản này giúp điểm **CC** (mạch lạc) ổn định.",
          en: "1. **Introduction**: paraphrase the question + give your opinion.\n2. **Body 1**: reason 1 + explanation + example.\n3. **Body 2**: reason 2 + explanation + example.\n4. **Conclusion**: repeat your opinion in new words + sum up both reasons.\nThis simple plan keeps your **CC** (coherence) score steady.",
        },
        examples: [{ en: "Introduction → Reason 1 → Reason 2 → Conclusion", vi: "Mở bài → Lý do 1 → Lý do 2 → Kết bài" }],
      },
      {
        title: { vi: "Mở bài và kết bài", en: "Introductions and conclusions" },
        body: {
          vi: "**Mở bài (2 câu)**: Some people believe that... + **I completely agree / disagree with this view because...**\n**Kết bài (1–2 câu)**: **In conclusion, I believe that...** + nhắc lại 2 lý do.\n**Không** đưa ý mới vào kết bài. **Không** chép nguyên văn đề.",
          en: "**Introduction (2 sentences)**: Some people believe that... + **I completely agree / disagree with this view because...**\n**Conclusion (1–2 sentences)**: **In conclusion, I believe that...** + both reasons again.\n**No** new ideas in the conclusion. **Don't** copy the question word for word.",
        },
        examples: [
          {
            en: "In conclusion, I believe cooking lessons are useful because they teach a life skill and improve children's health.",
            vi: "Tóm lại, tôi tin các lớp nấu ăn hữu ích vì chúng dạy kỹ năng sống và giúp trẻ khoẻ hơn.",
          },
        ],
      },
    ],
    exercises: [
      {
        id: "l2b-i-wri-03-ex01",
        type: 'multiple-choice',
        question: "Question: 'Some people believe that children should learn to cook at school. To what extent do you agree or disagree?' What is the TOPIC?",
        options: ["Cooking in restaurants", "Children learning to cook at school", "Healthy food for adults", "School uniforms"],
        correctIndex: 1,
        explanation: {
          vi: "Chủ đề: trẻ em học nấu ăn ở trường — không phải nhà hàng hay người lớn.",
          en: "The topic is children learning to cook at school.",
        },
      },
      {
        id: "l2b-i-wri-03-ex02",
        type: 'multiple-choice',
        question: "What does 'To what extent do you agree or disagree?' ask you to do?",
        options: ["Describe a chart", "Give and support your own opinion", "Write a letter to a friend", "List only the advantages"],
        correctIndex: 1,
        explanation: {
          vi: "Đề yêu cầu nêu rõ quan điểm của bạn và giải thích.",
          en: "It asks for your clear opinion, with support.",
        },
      },
      {
        id: "l2b-i-wri-03-ex03",
        type: 'multiple-choice',
        question: "What is the minimum length for a Task 2 essay?",
        options: ["150 words", "200 words", "250 words", "350 words"],
        correctIndex: 2,
        explanation: {
          vi: "Task 2 cần ít nhất 250 từ.",
          en: "Task 2 needs at least 250 words.",
        },
      },
      {
        id: "l2b-i-wri-03-ex04",
        type: 'match-pairs',
        instruction: { vi: "Nối mỗi đoạn với nhiệm vụ của nó.", en: "Match each paragraph with its job." },
        pairs: [
          { left: "Introduction", right: "paraphrase the question + give your opinion" },
          { left: "Body paragraph 1", right: "first reason + example" },
          { left: "Body paragraph 2", right: "second reason + example" },
          { left: "Conclusion", right: "repeat your opinion + sum up the reasons" },
        ],
        explanation: {
          vi: "Mỗi đoạn có một nhiệm vụ riêng — đó là bố cục 4 đoạn.",
          en: "Each paragraph has its own job — that is the four-paragraph plan.",
        },
      },
      {
        id: "l2b-i-wri-03-ex05",
        type: 'multiple-choice',
        question: "Which is the best paraphrase of 'children should learn to cook at school'?",
        options: [
          "children should learn to cook at school",
          "cooking lessons should be part of the school timetable",
          "children cook food",
          "schools are important",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Đổi từ nhưng giữ nghĩa: learn to cook → cooking lessons.",
          en: "New words, same meaning: learn to cook → cooking lessons.",
        },
      },
      {
        id: "l2b-i-wri-03-ex06",
        type: 'multiple-choice',
        question: "Which introduction gives a CLEAR opinion?",
        options: [
          "Cooking is an interesting topic, and there are many opinions about it.",
          "Some people think that cooking lessons should be part of the school timetable. I completely agree with this view because cooking is a useful life skill and it helps children eat more healthily.",
          "In this essay, I will write about cooking.",
          "Cooking is good and bad for children.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Câu này paraphrase đề, nói rõ 'I completely agree' và có 2 lý do.",
          en: "It paraphrases the question, says 'I completely agree' and gives two reasons.",
        },
      },
      {
        id: "l2b-i-wri-03-ex07",
        type: 'fill-blank',
        sentence: "___ conclusion, I strongly believe that cooking should be taught at school.",
        acceptedAnswers: ["In"],
        hint: "(Tóm lại)",
        explanation: {
          vi: "'In conclusion' mở đầu đoạn kết.",
          en: "'In conclusion' starts the final paragraph.",
        },
      },
      {
        id: "l2b-i-wri-03-ex08",
        type: 'multiple-choice',
        question: "Which is the best conclusion?",
        options: [
          "In conclusion, I believe cooking lessons are useful because they teach a life skill and improve children's health.",
          "In conclusion, cooking is also expensive, and many schools do not have kitchens.",
          "Finally, I like pizza very much.",
          "In conclusion, there are many opinions about this topic.",
        ],
        correctIndex: 0,
        explanation: {
          vi: "Kết bài tốt nhắc lại ý kiến và 2 lý do, không thêm ý mới.",
          en: "A good conclusion repeats the opinion and reasons, with no new ideas.",
        },
      },
      {
        id: "l2b-i-wri-03-ex09",
        type: 'true-false',
        statement: "It is a good idea to add a new reason in the conclusion.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Ý mới phải nằm ở thân bài; kết bài chỉ tóm tắt.",
          en: "False. New ideas belong in the body; the conclusion only sums up.",
        },
      },
      {
        id: "l2b-i-wri-03-ex10",
        type: 'speak-sentence',
        sentence: "I completely agree with this view.",
        translationVi: "Tôi hoàn toàn đồng ý với quan điểm này.",
        explanation: {
          vi: "Nhấn comPLETEly, aGREE, VIEW. Đặt lưỡi giữa hai răng khi đọc 'th' trong with this.",
          en: "Stress comPLETEly, aGREE and VIEW. Put your tongue between your teeth for 'th'.",
        },
      },
      {
        id: "l2b-i-wri-03-ex11",
        type: 'write-answer',
        prompt:
          "Write an introduction (2 sentences) for this Task 2 question:\n\n'Some people think that every teenager should do volunteer work in their free time. To what extent do you agree or disagree?'",
        tipsVi:
          "Câu 1: paraphrase đề (teenager → young people; volunteer work → help the community without pay). Câu 2: nêu rõ ý kiến + 2 lý do ngắn: I agree with this view because... and...",
        minWords: 30,
        sampleAnswer:
          "Some people believe that all young people should spend part of their free time helping their community without pay. I agree with this view because volunteering teaches teenagers useful skills and makes them more responsible.",
        explanation: {
          vi: "Kiểm tra: câu 1 không chép nguyên đề; câu 2 có ý kiến rõ và 2 lý do.",
          en: "Check: sentence 1 doesn't copy the question; sentence 2 has a clear opinion and two reasons.",
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4: Task 2 — viết MỘT đoạn thân bài theo PEEL
  //        Đề: Some people think that all children should learn to cook at school.
  // ==========================================================================
  {
    id: "l2b-i-wri-04",
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 30,
    title: { vi: "Task 2: viết một đoạn thân bài", en: "Task 2: writing one body paragraph" },
    description: {
      vi: "Viết đoạn thân bài theo PEEL: ý chính, giải thích, ví dụ, câu quay lại ý kiến.",
      en: "Write a body paragraph with PEEL: point, explanation, example, link.",
    },
    teachingCards: [
      {
        title: { vi: "Đoạn thân bài PEEL", en: "The PEEL body paragraph" },
        body: {
          vi: "- **P – Point**: câu chủ đề nêu 1 lý do: 'Firstly, cooking lessons teach an important life skill.'\n- **E – Explain**: giải thích vì sao: 'This is because...'\n- **E – Example**: ví dụ cụ thể: 'For example, my cousin...'\n- **L – Link**: quay lại ý kiến: 'Therefore, ...'\nMỗi đoạn chỉ có **1 ý chính**.",
          en: "- **P – Point**: a topic sentence with one reason: 'Firstly, cooking lessons teach an important life skill.'\n- **E – Explain**: say why: 'This is because...'\n- **E – Example**: a specific example: 'For example, my cousin...'\n- **L – Link**: back to your opinion: 'Therefore, ...'\nEach paragraph has **one main idea**.",
        },
        examples: [
          { en: "Firstly, cooking lessons teach children an important life skill.", vi: "Thứ nhất, lớp nấu ăn dạy trẻ một kỹ năng sống quan trọng." },
        ],
      },
      {
        title: { vi: "Từ nối trong đoạn", en: "Linking words inside a paragraph" },
        body: {
          vi: "- Mở lý do: **Firstly, / The main reason is that...**\n- Giải thích: **This is because... / This means that...**\n- Ví dụ: **For example, / For instance,**\n- Kết quả, quay lại ý kiến: **As a result, / Therefore,**\nĐừng viết **'Because...'** thành một câu đứng riêng — đó là câu thiếu (fragment).",
          en: "- Starting a reason: **Firstly, / The main reason is that...**\n- Explaining: **This is because... / This means that...**\n- Examples: **For example, / For instance,**\n- Results and the link: **As a result, / Therefore,**\nDon't write **'Because...'** as a sentence on its own — it is a fragment.",
        },
        examples: [{ en: "✗ Because it is useful.  ✓ This is because it is useful.", vi: "Câu bắt đầu bằng Because đứng một mình là câu thiếu" }],
      },
      {
        title: { vi: "Lỗi người Việt hay mắc", en: "Common mistakes for Vietnamese learners" },
        body: {
          vi: "- Quên **-s số nhiều**: many student ✗ → many **students** ✓\n- Quên **-s ngôi thứ ba**: it help ✗ → it **helps** ✓\n- **people is** ✗ → people **are** ✓\n- **I agree that with** ✗ → I agree **with this view** ✓\n- Nối 2 câu bằng dấu phẩy: Students are busy, they eat fast food ✗ → ..., **so** they eat fast food ✓",
          en: "- Missing **plural -s**: many student ✗ → many **students** ✓\n- Missing **third-person -s**: it help ✗ → it **helps** ✓\n- **people is** ✗ → people **are** ✓\n- **I agree that with** ✗ → I agree **with this view** ✓\n- Joining sentences with a comma: Students are busy, they eat fast food ✗ → ..., **so** they eat fast food ✓",
        },
        examples: [{ en: "Cooking helps students save money.", vi: "Nấu ăn giúp học sinh tiết kiệm tiền." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-wri-04-ex01",
        type: 'match-pairs',
        instruction: { vi: "Nối mỗi phần PEEL với ví dụ của nó.", en: "Match each part of PEEL with an example." },
        pairs: [
          { left: "Point", right: "Firstly, cooking is an important life skill." },
          { left: "Explain", right: "This is because everyone needs to eat every day." },
          { left: "Example", right: "For example, my cousin cooks for herself at university." },
          { left: "Link", right: "Therefore, schools should teach cooking." },
        ],
        explanation: {
          vi: "Mỗi phần có từ báo hiệu riêng: Firstly, This is because, For example, Therefore.",
          en: "Each part has its own signal: Firstly, This is because, For example, Therefore.",
        },
      },
      {
        id: "l2b-i-wri-04-ex02",
        type: 'multiple-choice',
        question: "Which is the best topic sentence (Point) for a body paragraph?",
        options: [
          "Cooking.",
          "Firstly, cooking lessons teach children an important life skill.",
          "My mother cooks very well.",
          "There are many kinds of food in Vietnam.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Câu chủ đề tốt nêu 1 lý do rõ ràng, gắn với đề bài.",
          en: "A good topic sentence gives one clear reason linked to the question.",
        },
      },
      {
        id: "l2b-i-wri-04-ex03",
        type: 'multiple-choice',
        question: "Which sentence is an EXAMPLE?",
        options: [
          "Therefore, cooking should be taught at school.",
          "For instance, my cousin learned to cook at school, so she can now make meals at university.",
          "Firstly, cooking is a life skill.",
          "This is because adults need to eat every day.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Ví dụ có 'For instance' và một trường hợp cụ thể.",
          en: "An example uses 'For instance' and a specific case.",
        },
      },
      {
        id: "l2b-i-wri-04-ex04",
        type: 'fill-blank',
        sentence: "This lesson ___ children to plan healthy meals.",
        acceptedAnswers: ["helps"],
        hint: "(help)",
        explanation: {
          vi: "Chủ ngữ số ít 'This lesson' → động từ thêm -s: helps.",
          en: "Singular subject 'This lesson' → add -s: helps.",
        },
      },
      {
        id: "l2b-i-wri-04-ex05",
        type: 'multiple-choice',
        question: "Which sentence has NO mistakes?",
        options: ["Many student cannot cook.", "Many students cannot cook.", "Many students cannot cooks.", "Many of student cannot cook."],
        correctIndex: 1,
        explanation: {
          vi: "'many' + danh từ số nhiều (students); sau 'cannot' là động từ nguyên mẫu.",
          en: "'Many' + plural noun (students); after 'cannot' use the base verb.",
        },
      },
      {
        id: "l2b-i-wri-04-ex06",
        type: 'fill-blank',
        sentence: "Children learn to cook at school. ___, they can make healthy meals when they live alone.",
        acceptedAnswers: ["As a result", "Therefore", "So"],
        hint: "(Kết quả là)",
        explanation: {
          vi: "'As a result / Therefore' nối nguyên nhân với kết quả.",
          en: "'As a result' or 'Therefore' links a cause to its result.",
        },
      },
      {
        id: "l2b-i-wri-04-ex07",
        type: 'speak-sentence',
        sentence: "For example, my cousin learned to cook at school.",
        translationVi: "Ví dụ, chị họ tôi đã học nấu ăn ở trường.",
        explanation: {
          vi: "learned đọc /lɜːnd/ — 1 âm tiết, đuôi /d/. Giữ /k/ cuối trong cook.",
          en: "'Learned' is /lɜːnd/, one syllable ending in /d/. Keep the /k/ in 'cook'.",
        },
      },
    ],
    writingTask: {
      id: "l2b-i-wri-04-task",
      taskNumber: 2,
      prompt:
        "Some people think that all children should learn to cook at school.\n\nTo what extent do you agree or disagree?\n\nIn this lesson, write ONE body paragraph (at least 80 words) that gives one reason for your opinion. Use PEEL: Point – Explanation – Example – Link.",
      minWords: 80,
      suggestedMinutes: 15,
      sampleAnswer:
        "Firstly, cooking lessons teach children an important life skill. Nowadays, many young people rely on fast food or instant noodles because they have never learned how to prepare a simple meal. If schools teach basic cooking, students will be able to look after themselves when they leave home for university or work. For example, my cousin took cooking classes at her secondary school, and now she cooks cheap, healthy meals for herself every day instead of buying takeaway food. Therefore, I believe that cooking should be part of every school timetable.",
      bandSamples: [
        {
          band: "3.5",
          text: "Firstly cooking is good. Because children can cook. My mother cook for me every day and i like it very much. If children cook they not need buy food outside, it is cheap. So cooking is good for children and school must teach.",
          notesVi:
            "(Ước lượng cho một đoạn.) TR: Ý chính chung chung ('cooking is good'), giải thích rất ít, ví dụ về mẹ không chứng minh cho lý do, quá ngắn so với 80 từ. CC: 'Because children can cook.' đứng riêng là câu thiếu; câu cuối lặp câu đầu. LR/GRA: Lặp 'good', thiếu -s (my mother cook), thiếu động từ (they not need buy).",
        },
        {
          band: "4.5",
          text: "Firstly, cooking lessons are useful because it is a life skill. Many student today do not know how to cook, they always eat fast food and it is not healthy. If they learn cooking at school, they can cook healthy food for theirself. For example, my brother learn cooking in his school and now he cook dinner for family on weekend. So I think cooking lessons is very good for children.",
          notesVi:
            "(Ước lượng cho một đoạn.) TR: Có lý do rõ và ví dụ phù hợp nhưng giải thích còn mỏng, chưa đủ 80 từ. CC: Theo đúng thứ tự PEEL, có từ nối cơ bản (Firstly, For example, So) nhưng nối câu bằng dấu phẩy. LR/GRA: Lỗi -s (many student, my brother learn, lessons is), sai 'theirself' → themselves.",
        },
        {
          band: "5.5",
          text: "Firstly, cooking lessons teach children an important life skill. Nowadays, many young people depend on fast food because they never learned how to prepare a simple meal. If schools teach basic cooking, students will be able to look after themselves when they leave home. For example, my cousin took cooking classes at her secondary school, and now she cooks healthy meals at university instead of buy instant noodles. As a result, she is healthier and spends less money. Therefore, I believe cooking should be part of the school timetable.",
          notesVi:
            "(Ước lượng cho một đoạn.) TR: Lý do rõ, được giải thích và có ví dụ cá nhân thuyết phục; câu cuối quay lại ý kiến. CC: Đủ 4 phần PEEL, từ nối tự nhiên (Nowadays, As a result, Therefore). LR/GRA: Từ hợp chủ đề (life skill, look after themselves); còn lỗi 'instead of buy' (→ buying) và 'never learned' (→ have never learned).",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            "Câu đầu đoạn có nêu rõ 1 lý do ủng hộ ý kiến của bạn không?",
            "Có giải thích vì sao lý do đó đúng không?",
            "Có ví dụ cụ thể (một người, một tình huống thật) không?",
            "Đoạn văn có đủ 80 từ và bám đúng đề (học nấu ăn ở trường) không?",
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            "Đoạn có đủ 4 phần P – E – E – L theo đúng thứ tự không?",
            "Có từ nối (Firstly, This is because, For example, Therefore) không?",
            "Câu cuối có quay lại ý kiến chính không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Có tránh lặp một từ (good, cook) quá nhiều lần không?",
            "Có dùng vài cụm hợp chủ đề (life skill, healthy meals, fast food) không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Danh từ số nhiều có -s (many students) không?",
            "Động từ sau he / she / it có -s (it helps, she cooks) không?",
            "Có câu nào chỉ bắt đầu bằng 'Because...' và đứng riêng không? (nếu có, hãy nối lại)",
          ],
        },
      ],
      planningHintsVi: [
        "Chọn ý kiến: đồng ý hay không đồng ý? Đoạn này chỉ viết 1 lý do.",
        "P: Firstly, cooking lessons... (1 câu)",
        "E: This is because... / If schools..., students will... (1–2 câu)",
        "E: For example, + một người bạn biết (1–2 câu)",
        "L: Therefore, I believe... (1 câu)",
        "Đọc lại: kiểm tra -s, động từ và các câu nối bằng dấu phẩy.",
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 5: Task 2 — viết trọn một bài luận nêu quan điểm (4 đoạn)
  //        Đề: Mobile phones should not be allowed in schools.
  // ==========================================================================
  {
    id: "l2b-i-wri-05",
    skill: 'writing',
    mode: 'writing',
    estimatedMinutes: 50,
    title: { vi: "Task 2: viết trọn một bài luận", en: "Task 2: writing a full opinion essay" },
    description: {
      vi: "Lập dàn ý 5 phút và viết bài luận 4 đoạn hoàn chỉnh về điện thoại trong trường học.",
      en: "Plan for 5 minutes and write a complete four-paragraph essay about phones in schools.",
    },
    teachingCards: [
      {
        title: { vi: "Lập dàn ý trong 5 phút", en: "Planning in 5 minutes" },
        body: {
          vi: "1. Gạch chân **chủ đề + yêu cầu**.\n2. Chọn **1 quan điểm** (đồng ý / không đồng ý) — chọn bên **dễ tìm ví dụ hơn**, không cần là ý thật của bạn.\n3. Ghi **2 lý do**, mỗi lý do **1 ví dụ**, bằng vài từ khoá.\n5 phút lập dàn ý giúp bạn viết nhanh hơn và không lạc đề.",
          en: "1. Underline the **topic + task**.\n2. Choose **one opinion** (agree / disagree) — pick the side with **easier examples**; it doesn't have to be your real view.\n3. Note **2 reasons** and **1 example** for each, in a few key words.\nFive minutes of planning makes you faster and keeps you on topic.",
        },
        examples: [
          {
            en: "Agree: 1) distraction – friend's marks fell  2) less talking – break time on phones",
            vi: "Đồng ý: 1) mất tập trung – điểm của bạn tôi giảm  2) ít trò chuyện – giờ ra chơi chỉ nhìn điện thoại",
          },
        ],
      },
      {
        title: { vi: "Chia thời gian và số từ", en: "Timing and word count" },
        body: {
          vi: "Mục tiêu **ít nhất 250 từ trong 40 phút**:\n- Dàn ý: **5 phút**\n- Mở bài ~**40 từ** (5 phút)\n- Thân bài 1 ~**90 từ** (12 phút)\n- Thân bài 2 ~**90 từ** (12 phút)\n- Kết bài ~**30 từ** (3 phút)\n- Đọc lại: **3 phút**\nDưới 250 từ sẽ bị trừ điểm TR.",
          en: "Aim for **at least 250 words in 40 minutes**:\n- Plan: **5 min**\n- Introduction ~**40 words** (5 min)\n- Body 1 ~**90 words** (12 min)\n- Body 2 ~**90 words** (12 min)\n- Conclusion ~**30 words** (3 min)\n- Check: **3 min**\nUnder 250 words loses marks for TR.",
        },
        examples: [{ en: "40 + 90 + 90 + 30 = 250 words", vi: "Cộng lại vừa đủ 250 từ" }],
      },
      {
        title: { vi: "3 phút kiểm tra cuối", en: "The 3-minute final check" },
        body: {
          vi: "Đọc lại và săn 4 lỗi hay gặp:\n- **-s** số nhiều và ngôi thứ ba (students, it helps)\n- **Thì** của động từ (last year → went)\n- Câu **'Because...'** đứng một mình\n- **Mạo từ** a / an / the (a phone, the internet)\nSửa 4 lỗi này là cách nhanh nhất để tăng điểm GRA.",
          en: "Read again and hunt for 4 common errors:\n- plural and third-person **-s** (students, it helps)\n- verb **tenses** (last year → went)\n- **'Because...'** sentences on their own\n- **articles** a / an / the (a phone, the internet)\nFixing these is the quickest way to raise your GRA score.",
        },
        examples: [{ en: "✗ Phone make student lazy.  ✓ Phones make students lazy.", vi: "Danh từ số nhiều thêm -s; động từ đi với chủ ngữ số nhiều không thêm -s" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-wri-05-ex01",
        type: 'multiple-choice',
        question: "You have 40 minutes for Task 2. How long should you spend planning?",
        options: ["No time", "About 5 minutes", "About 20 minutes", "All 40 minutes"],
        correctIndex: 1,
        explanation: {
          vi: "Khoảng 5 phút dàn ý giúp bài rõ ràng mà vẫn đủ giờ viết.",
          en: "About 5 minutes of planning keeps the essay clear and leaves time to write.",
        },
      },
      {
        id: "l2b-i-wri-05-ex02",
        type: 'multiple-choice',
        question: "Question: 'Mobile phones should not be allowed in schools.' Which reason SUPPORTS this view?",
        options: [
          "Phones help students find information quickly.",
          "Phones distract students during lessons.",
          "Parents can call their children.",
          "Phones are cheaper now.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "'Gây mất tập trung' ủng hộ việc cấm; các ý còn lại ủng hộ dùng điện thoại.",
          en: "Distraction supports a ban; the other ideas support using phones.",
        },
      },
      {
        id: "l2b-i-wri-05-ex03",
        type: 'fill-blank',
        sentence: "'Phones should not be allowed in schools' means phones should be ___ in schools.",
        acceptedAnswers: ["banned", "forbidden", "prohibited"],
        hint: "(cấm)",
        explanation: {
          vi: "not allowed = banned: một cách paraphrase rất hay dùng.",
          en: "'Not allowed' = 'banned', a useful paraphrase.",
        },
      },
      {
        id: "l2b-i-wri-05-ex04",
        type: 'multiple-choice',
        question: "Which is a complete, correct sentence?",
        options: [
          "Because phones distract students.",
          "Phones distract students, so many teachers do not like them.",
          "Phones distract. Students. In class.",
          "Because of phones distract students.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "'Because...' đứng riêng là câu thiếu; câu 2 có đủ hai mệnh đề.",
          en: "'Because...' alone is a fragment; sentence 2 has two full clauses.",
        },
      },
      {
        id: "l2b-i-wri-05-ex05",
        type: 'true-false',
        statement: "If your Task 2 essay has fewer than 250 words, you can lose marks.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "Đúng. Bài dưới 250 từ bị trừ điểm ở tiêu chí TR.",
          en: "True. Essays under 250 words lose marks for TR.",
        },
      },
      {
        id: "l2b-i-wri-05-ex06",
        type: 'speak-sentence',
        sentence: "Phones distract students during lessons.",
        translationVi: "Điện thoại làm học sinh mất tập trung trong giờ học.",
        explanation: {
          vi: "Đọc rõ cụm âm cuối: phones /nz/, distract /kt/, students /ts/, lessons /nz/.",
          en: "Say the final clusters: phones /nz/, distract /kt/, students /ts/, lessons /nz/.",
        },
      },
    ],
    writingTask: {
      id: "l2b-i-wri-05-task",
      taskNumber: 2,
      prompt:
        "Some people think that mobile phones should not be allowed in schools.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
      minWords: 250,
      suggestedMinutes: 40,
      sampleAnswer:
        "Mobile phones are now part of almost every teenager's life, and some people believe that students should not be allowed to bring them to school. I agree with this view because phones distract students in class and reduce real communication between classmates.\n\nFirstly, phones make it much harder for students to concentrate. Even when a phone is on silent, messages and notifications keep appearing on the screen, and many students cannot stop themselves from checking them. As a result, they miss important parts of the lesson, and teachers waste time asking them to put their phones away. For example, a friend of mine used to play games under his desk during maths lessons, and his marks fell sharply in one term. When his school banned phones the following year, his grades slowly improved.\n\nSecondly, schools without phones encourage students to talk to each other. Break time is an important chance for young people to make friends and develop social skills. However, in many schools today, students sit together but stare at their own screens instead of chatting or playing games. For instance, since my cousin's school banned phones two years ago, students there have started playing football and board games at break time again. If phones are not allowed, students have no choice but to communicate face to face, which helps them build stronger friendships and feel part of a real community.\n\nIn conclusion, I believe that mobile phones should not be allowed in schools, because they reduce concentration in lessons and prevent students from communicating properly with one another.",
      bandSamples: [
        {
          band: "3.5",
          text: "Nowaday, phone is very important for everybody. Student also use phone every day. I think phone should not allowed in school.\n\nFirstly, phone make student not focus. They play game and chat in class, teacher talk but they not listen. My friend play game in class and he get bad mark.\n\nSecondly, phone is bad for eyes. Student look phone too much and eyes is tired, and they need glasses.\n\nBut phone is also good, student can search information. So I think phone is good and bad.\n\nIn conclusion, school should not allow phone because it make student not focus.",
          notesVi:
            "TR: Bài chỉ khoảng 100 từ (thiếu rất nhiều so với 250) và quan điểm không nhất quán ('good and bad' rồi lại đồng ý cấm). CC: Có chia đoạn và Firstly/Secondly nhưng ý trong đoạn rời rạc, không giải thích. LR/GRA: Vốn từ rất hạn chế (good, bad lặp lại), lỗi -s dày đặc, thiếu 'be' trong câu bị động (should not allowed), thiếu trợ động từ (they not listen).",
        },
        {
          band: "4.5",
          text: "Nowadays, mobile phone is very popular and many students bring phone to school. Some people think phones should not be allowed in schools. I agree with this opinion because of two reasons.\n\nFirst, phones make students cannot concentrate in the class. When they have a phone, they always want to check message or play game. For example, in my class last year, many students used phone when teacher was teaching, so they did not understand the lesson and their marks is low. Teachers also feel angry and they must stop the lesson many times.\n\nSecond, students do not talk with each other when they have phone. In break time, everybody look at their phone and nobody talk or play together. This is not good for children because they need to make friends. If school ban phone, students will talk more and they will have more friends.\n\nHowever, phones also have some advantages, for example students can call parents when they need. But I think this is not very important because school have telephone.\n\nIn conclusion, I agree that mobile phones should not be allowed in school because it make students cannot concentrate and they do not talk with friends.",
          notesVi:
            "TR: Quan điểm rõ, có 2 lý do và ví dụ, nhưng chưa đủ 250 từ và phần giải thích còn đơn giản. CC: Bố cục rõ, từ nối cơ bản (First, Second, However, In conclusion); đôi chỗ lặp ý. LR/GRA: Lặp 'phone', 'students'; lỗi lặp lại (make students cannot concentrate, their marks is, everybody look, school have) nhưng người đọc vẫn hiểu.",
        },
        {
          band: "5.5",
          text: "Nowadays, most students own a smartphone, and some people believe that these devices should be banned in schools. I mostly agree with this view, because phones distract students during lessons and reduce face-to-face communication.\n\nFirstly, phones make it difficult for students to concentrate. Even if the phone is in their bag, many students keep thinking about new messages and want to check them. As a result, they miss important information in class. For example, last year my classmate often played games during maths lessons and his marks dropped from 8 to 5 in only one semester. After his parents took his phone away, his results improved quickly.\n\nSecondly, without phones, students would communicate with each other more. In the past, break time was a chance to play sports or chat with friends. However, today many students sit next to each other but only looking at their own screens. For example, in my school last year, the playground was almost empty at break time because everyone stayed in the classroom with their phones. This is a pity because school is the best place to develop social skills. If phones are not allowed, students will have to talk and play together, and it helps them to build real friendships.\n\nSome people say that students need phones to contact their parents in an emergency. However, this problem can be solved easily, since parents can call the school office.\n\nIn conclusion, I believe that mobile phones should not be allowed in schools because they reduce concentration and limit real communication between students.",
          notesVi:
            "TR: Quan điểm rõ và nhất quán, 2 lý do được phát triển bằng ví dụ cụ thể, có thêm một đoạn phản biện ngắn; đủ 250 từ. CC: Đoạn văn mạch lạc, từ nối đa dạng (As a result, However, since). LR/GRA: Có cụm tốt (face-to-face communication, social skills); còn lỗi như 'but only looking' (→ only look) nhưng không gây khó hiểu.",
        },
      ],
      checklist: [
        {
          criterion: 'TR',
          questionsVi: [
            "Mở bài có nêu rõ bạn đồng ý hay không đồng ý không?",
            "Mỗi đoạn thân bài có 1 lý do + giải thích + ví dụ không?",
            "Kết bài có nhắc lại đúng quan điểm ở mở bài (không đổi ý giữa chừng) không?",
            "Bài có đủ 250 từ không?",
          ],
        },
        {
          criterion: 'CC',
          questionsVi: [
            "Bài có ít nhất 4 đoạn tách rõ (mở bài – 2 thân bài – kết bài) không?",
            "Có dùng từ nối (Firstly, Secondly, For example, In conclusion) đúng chỗ không?",
            "Mỗi đoạn chỉ nói 1 ý chính không?",
          ],
        },
        {
          criterion: 'LR',
          questionsVi: [
            "Mở bài có paraphrase đề thay vì chép nguyên văn không?",
            "Có tránh lặp 'phone' bằng device, smartphone, mobile không?",
            "Có dùng vài từ hợp chủ đề (concentrate, distract, social skills) không?",
          ],
        },
        {
          criterion: 'GRA',
          questionsVi: [
            "Danh từ số nhiều và động từ ngôi thứ ba có -s đúng chỗ không?",
            "Có câu nào chỉ có 'Because...' đứng riêng không? (nếu có, hãy nối lại)",
            "Có thử 2–3 câu phức (because, if, when) không?",
          ],
        },
      ],
      planningHintsVi: [
        "Gạch chân chủ đề (mobile phones in schools) và yêu cầu (agree or disagree).",
        "Chọn bên dễ viết hơn — VD đồng ý cấm điện thoại.",
        "Lý do 1: mất tập trung → ví dụ một người bạn. Lý do 2: ít nói chuyện trực tiếp → ví dụ giờ ra chơi.",
        "Mở bài 2 câu, mỗi thân bài 4–5 câu theo PEEL, kết bài 1–2 câu.",
        "Lần đầu viết được 200 từ đã là tiến bộ; thi thật cần ít nhất 250 từ.",
        "Chừa 3 phút cuối: kiểm tra -s, thì, câu 'Because...' đứng riêng, mạo từ.",
      ],
    },
    miniTest: [],
  },
]
