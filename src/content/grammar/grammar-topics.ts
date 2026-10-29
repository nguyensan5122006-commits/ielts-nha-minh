/**
 * grammar-topics.ts — DANH MỤC CÁC ĐIỂM NGỮ PHÁP CỦA KHU "NGỮ PHÁP" (/grammar)
 * ----------------------------------------------------------------------------
 * File NHẸ (chỉ chữ + id bài), trang /grammar import thẳng được — không kéo nội dung bài vào.
 *
 * Mỗi điểm ngữ pháp (GrammarTopic) gồm:
 *   - id          : dùng làm đường dẫn /grammar/:topicId
 *   - level       : 1 (≈ A1–A2), 2 (≈ A2–B1), 3 (≈ B1–B2) — trình độ NÊN học điểm này
 *   - title, summary, pattern, example : chữ hiện trên thẻ
 *   - lessonIds   : các bài dạy điểm này, bài nên học TRƯỚC đứng đầu.
 *                   Bài "gr-…" là bài MỚI viết riêng cho khu Ngữ pháp (src/content/grammar/*-lessons.ts);
 *                   các id khác là bài sẵn có trên lộ trình (Level 1–3) có dạy điểm này.
 *
 * Bảng đối chiếu đầy đủ (điểm nào có sẵn, điểm nào thiếu): docs/redesign-v3/11-CONTENT-GAPS.md
 * Thêm điểm mới: thêm 1 mục vào GRAMMAR_TOPICS (id không trùng), bài mới thì soạn trong
 * src/content/grammar/ rồi đăng ký ở lesson-registry.ts + lesson-sources.ts như mọi bài khác.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content-types'

export type GrammarLevel = 1 | 2 | 3

export interface GrammarTopic {
  id: string
  level: GrammarLevel
  title: BilingualText
  /** 1 câu: điểm này giúp bạn làm gì */
  summary: BilingualText
  /** công thức ngắn gọn (tiếng Anh) */
  pattern: string
  /** 1 câu ví dụ tiếng Anh */
  example: string
  /** bài dạy điểm này — bài nên học trước đứng đầu */
  lessonIds: string[]
}

/** Thông tin 3 nhóm trình độ trên trang Ngữ pháp. */
export const GRAMMAR_LEVELS: { level: GrammarLevel; cefr: string; band: string; title: BilingualText }[] = [
  { level: 1, cefr: 'A1 – A2', band: '0 – 3.5', title: { vi: 'Nền móng', en: 'Foundations' } },
  { level: 2, cefr: 'A2 – B1', band: '3.5 – 5.0', title: { vi: 'Vững vàng', en: 'Building up' } },
  { level: 3, cefr: 'B1 – B2', band: '5.0 – 6.5', title: { vi: 'Bứt phá', en: 'Breaking through' } },
]

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  /* ============================ LEVEL 1 (A1 – A2) ============================ */
  {
    id: 'be-verb',
    level: 1,
    title: { vi: 'Động từ "to be": am / is / are', en: 'The verb "be": am / is / are' },
    summary: { vi: 'Giới thiệu bản thân, nói tuổi, nghề, cảm xúc.', en: 'Say who you are, your age, your job and how you feel.' },
    pattern: 'I am · he/she/it is · you/we/they are',
    example: 'My sister is a nurse and we are very close.',
    lessonIds: ['l1-speak-01'],
  },
  {
    id: 'present-simple',
    level: 1,
    title: { vi: 'Thì hiện tại đơn', en: 'Present simple' },
    summary: { vi: 'Nói về thói quen, lịch trình và sự thật.', en: 'Talk about habits, timetables and facts.' },
    pattern: 'I/you/we/they + V · he/she/it + V-s/es',
    example: 'My father reads the news every morning.',
    lessonIds: ['l1-write-05', 'l1-vocab-04', 'l1-speak-04'],
  },
  {
    id: 'present-continuous',
    level: 1,
    title: { vi: 'Hiện tại tiếp diễn & động từ trạng thái', en: 'Present continuous & state verbs' },
    summary: { vi: 'Phân biệt việc đang xảy ra với thói quen; tránh "I am knowing".', en: 'Tell actions in progress from habits, and avoid "I am knowing".' },
    pattern: 'am / is / are + V-ing',
    example: 'I usually cycle, but this week I am taking the bus.',
    lessonIds: ['l2-write-01', 'l2-speak-06'],
  },
  {
    id: 'past-simple',
    level: 1,
    title: { vi: 'Thì quá khứ đơn', en: 'Past simple' },
    summary: { vi: 'Kể lại việc đã xong trong quá khứ, cả động từ bất quy tắc.', en: 'Tell finished past events, including irregular verbs.' },
    pattern: 'V-ed / irregular V2 · did not + V · Did … + V?',
    example: 'We visited Hue last summer and ate a lot of street food.',
    lessonIds: ['l2-write-02', 'l1-speak-09', 'l1-listen-07'],
  },
  {
    id: 'there-is-there-are',
    level: 1,
    title: { vi: 'There is / There are', en: 'There is / There are' },
    summary: { vi: 'Nói cái gì có ở đâu — hôm nay và ngày xưa.', en: 'Say what exists somewhere — now and in the past.' },
    pattern: 'There is + singular · There are + plural · There was / were',
    example: 'There are two parks near my house, but there was only one before.',
    lessonIds: ['l1-write-06', 'l1-speak-05', 'l2-write-07'],
  },
  {
    id: 'articles-plurals',
    level: 1,
    title: { vi: 'A / an / the & danh từ số nhiều', en: 'A / an / the & plural nouns' },
    summary: { vi: 'Chọn a hay an, khi nào dùng the, cách thêm -s/-es.', en: 'Choose a or an, know when to use the, and form plurals.' },
    pattern: 'a + consonant sound · an + vowel sound · the + known thing',
    example: 'I have an uncle and two cousins. The uncle lives in Da Nang.',
    lessonIds: ['l1-write-02'],
  },
  {
    id: 'countable-quantifiers',
    level: 1,
    title: { vi: 'Đếm được / không đếm được & some, any, much, many', en: 'Countable / uncountable & quantifiers' },
    summary: { vi: 'Nói "bao nhiêu" cho đúng: many books nhưng much water.', en: 'Say "how much / how many" correctly: many books but much water.' },
    pattern: 'many / a few + plural · much / a little + uncountable',
    example: 'We need some rice and a few eggs, but we don\'t need much oil.',
    lessonIds: ['gr-l1-quantifiers', 'l2-vocab-07'],
  },
  {
    id: 'pronouns-possessives',
    level: 1,
    title: { vi: 'Đại từ & sở hữu: I, me, my, mine, \'s', en: 'Pronouns & possessives: I, me, my, mine, \'s' },
    summary: { vi: 'Không lẫn he/him/his; dùng \'s và this/they để khỏi lặp từ.', en: 'Stop mixing he/him/his; use \'s and it/they to avoid repeating nouns.' },
    pattern: 'I – me – my – mine · Lan\'s bag · it / they refer back',
    example: 'This is my brother\'s laptop. He lends it to me at weekends.',
    lessonIds: ['gr-l1-pronouns', 'l1-vocab-02', 'l2-read-07'],
  },
  {
    id: 'prepositions-time-place',
    level: 1,
    title: { vi: 'Giới từ in / on / at (thời gian, nơi chốn)', en: 'Prepositions in / on / at (time & place)' },
    summary: { vi: 'in May, on Monday, at 7 o\'clock; in the city, at the station.', en: 'in May, on Monday, at 7 o\'clock; in the city, at the station.' },
    pattern: 'in + month/year · on + day/date · at + clock time',
    example: 'The class starts at eight on Monday, in Room 4.',
    lessonIds: ['l1-write-08', 'l2-listen-08'],
  },
  {
    id: 'adjectives-adverbs',
    level: 1,
    title: { vi: 'Tính từ & trạng từ: careful hay carefully?', en: 'Adjectives & adverbs: careful or carefully?' },
    summary: { vi: 'Tính từ tả danh từ, trạng từ tả cách làm; thêm very, quite, really.', en: 'Adjectives describe nouns, adverbs describe actions; add very, quite, really.' },
    pattern: 'a careful driver · drive carefully · good → well',
    example: 'She is a quick learner — she learns new words very quickly.',
    lessonIds: ['gr-l1-adverbs', 'l1-write-07', 'l1-write-10'],
  },
  {
    id: 'comparatives-superlatives',
    level: 1,
    title: { vi: 'So sánh hơn & so sánh nhất', en: 'Comparatives & superlatives' },
    summary: { vi: 'So sánh 2 thứ hoặc chọn thứ "nhất" trong nhóm.', en: 'Compare two things or pick the "most" in a group.' },
    pattern: 'bigger than · more useful than · the biggest · the most useful',
    example: 'The bus is cheaper than the train, but the train is the fastest.',
    lessonIds: ['l2-write-03', 'l2-speak-05', 'l2-speak-02'],
  },
  {
    id: 'wh-questions',
    level: 1,
    title: { vi: 'Câu hỏi Wh- cơ bản', en: 'Basic Wh- questions' },
    summary: { vi: 'Hỏi what, where, when, who, why, how cho đúng thứ tự.', en: 'Ask what, where, when, who, why and how in the right order.' },
    pattern: 'Wh- + do/does/did + subject + V?',
    example: 'Where do you usually study at the weekend?',
    lessonIds: ['l1-speak-08'],
  },
  {
    id: 'linking-basic',
    level: 1,
    title: { vi: 'Nối câu: and, but, because, so, however', en: 'Linking: and, but, because, so, however' },
    summary: { vi: 'Nối 2 ý thành câu dài hơn và có lý do.', en: 'Join two ideas into a longer sentence with a reason.' },
    pattern: 'idea + because / so / but + idea · Idea. However, idea.',
    example: 'I like my job because it is interesting. However, the pay is low.',
    lessonIds: ['l1-write-03', 'l2-write-09'],
  },

  /* ============================ LEVEL 2 (A2 – B1) ============================ */
  {
    id: 'future-forms',
    level: 2,
    title: { vi: 'Tương lai: will, be going to, hiện tại tiếp diễn', en: 'Future forms: will, going to, present continuous' },
    summary: { vi: 'Chọn đúng cách nói tương lai: quyết định tức thì, kế hoạch hay lịch hẹn.', en: 'Pick the right future: a quick decision, a plan or a fixed arrangement.' },
    pattern: 'will + V · am/is/are going to + V · am/is/are + V-ing (arranged)',
    example: 'I\'m meeting my tutor at five, and I\'m going to ask about the exam.',
    lessonIds: ['gr-l2-future', 'l2-write-04', 'l2-speak-09'],
  },
  {
    id: 'present-perfect',
    level: 2,
    title: { vi: 'Hiện tại hoàn thành vs quá khứ đơn', en: 'Present perfect vs past simple' },
    summary: { vi: 'ever, never, already, yet, for, since — và khi nào phải dùng quá khứ đơn.', en: 'ever, never, already, yet, for, since — and when the past simple is needed.' },
    pattern: 'have / has + V3 · for + period · since + starting point',
    example: 'I have lived in Hanoi since 2019. I moved here for work.',
    lessonIds: ['gr-l2-present-perfect', 'l2b-g-03-vocab', 'l2b-g-01-speak'],
  },
  {
    id: 'past-continuous',
    level: 2,
    title: { vi: 'Quá khứ tiếp diễn: when / while', en: 'Past continuous: when / while' },
    summary: { vi: 'Tả bối cảnh đang diễn ra khi một việc khác xen vào.', en: 'Describe the background action when something else happened.' },
    pattern: 'was / were + V-ing · while + long action · when + short action',
    example: 'I was cooking dinner when the power went off.',
    lessonIds: ['gr-l2-past-continuous'],
  },
  {
    id: 'used-to',
    level: 2,
    title: { vi: 'Used to & would: thói quen ngày xưa', en: 'Used to & would: past habits' },
    summary: { vi: 'Kể về ngày xưa và so sánh với bây giờ — rất hay gặp trong IELTS Speaking.', en: 'Talk about how things used to be and compare with now — common in IELTS Speaking.' },
    pattern: 'used to + V · didn\'t use to + V · would + V (repeated actions)',
    example: 'When I was a child, I used to walk to school with my cousins.',
    lessonIds: ['gr-l2-used-to'],
  },
  {
    id: 'modals-obligation-advice',
    level: 2,
    title: { vi: 'Must, have to, should, can', en: 'Must, have to, should, can' },
    summary: { vi: 'Nói về luật lệ, sự bắt buộc, lời khuyên và khả năng.', en: 'Talk about rules, obligation, advice and ability.' },
    pattern: 'must / have to + V · should + V · can / can\'t + V',
    example: 'Students have to wear a uniform, and they should arrive early.',
    lessonIds: ['l2-write-05', 'l2-speak-07', 'l1-read-08'],
  },
  {
    id: 'gerund-infinitive',
    level: 2,
    title: { vi: 'Động từ + V-ing hay + to V?', en: 'Verb + -ing or to-infinitive?' },
    summary: { vi: 'enjoy doing, decide to do, stop doing/stop to do — nhóm động từ hay gặp.', en: 'enjoy doing, decide to do, stop doing / stop to do — the common groups.' },
    pattern: 'enjoy / avoid / finish + V-ing · want / decide / hope + to V',
    example: 'I decided to join a gym because I enjoy keeping fit.',
    lessonIds: ['gr-l2-gerund-infinitive', 'l1-vocab-10'],
  },
  {
    id: 'conditionals-0-1',
    level: 2,
    title: { vi: 'Câu điều kiện loại 0 & loại 1', en: 'Zero & first conditionals' },
    summary: { vi: 'Nói sự thật luôn đúng và khả năng có thật trong tương lai.', en: 'Talk about general truths and real future possibilities.' },
    pattern: 'If + present, present · If + present, will + V',
    example: 'If it rains tomorrow, we will hold the event indoors.',
    lessonIds: ['gr-l2-conditionals-0-1'],
  },
  {
    id: 'articles-advanced',
    level: 2,
    title: { vi: 'Mạo từ nâng cao: the hay không có mạo từ?', en: 'Articles in depth: the or no article?' },
    summary: { vi: 'Nói chung chung (Children need…) hay cụ thể (The children in my class…).', en: 'Speak in general (Children need…) or about specific things (The children in my class…).' },
    pattern: 'Ø + plural/uncountable (general) · the + specific / unique',
    example: 'Technology changes fast. The technology in our school is quite old.',
    lessonIds: ['gr-l2-articles'],
  },
  {
    id: 'question-forms',
    level: 2,
    title: { vi: 'Câu hỏi chủ ngữ & câu hỏi gián tiếp', en: 'Subject questions & indirect questions' },
    summary: { vi: 'Who called you? vs Who did you call? — và cách hỏi lịch sự: Could you tell me where…', en: 'Who called you? vs Who did you call? — and polite questions: Could you tell me where…' },
    pattern: 'Who + V? · Could you tell me + where + S + V?',
    example: 'Could you tell me where the library is?',
    lessonIds: ['gr-l2-questions', 'l2b-g-01-write'],
  },

  /* ============================ LEVEL 3 (B1 – B2) ============================ */
  {
    id: 'present-perfect-continuous',
    level: 3,
    title: { vi: 'Hiện tại hoàn thành tiếp diễn', en: 'Present perfect continuous' },
    summary: { vi: 'Nhấn mạnh một việc kéo dài đến bây giờ: I\'ve been studying for two hours.', en: 'Stress an activity that has continued until now: I\'ve been studying for two hours.' },
    pattern: 'have / has been + V-ing (+ for / since)',
    example: 'I\'ve been preparing for IELTS since March, so I\'m quite tired.',
    lessonIds: ['gr-l3-present-perfect-continuous'],
  },
  {
    id: 'past-perfect',
    level: 3,
    title: { vi: 'Quá khứ hoàn thành & kể chuyện', en: 'Past perfect & narrative tenses' },
    summary: { vi: 'Sắp xếp các việc trong quá khứ: việc nào xảy ra trước.', en: 'Order past events clearly: which one happened first.' },
    pattern: 'had + V3 · by the time / before / after',
    example: 'By the time we arrived, the film had already started.',
    lessonIds: ['gr-l3-past-perfect', 'l3-g-u5-vocab'],
  },
  {
    id: 'conditionals-2-3',
    level: 3,
    title: { vi: 'Câu điều kiện loại 2 & loại 3', en: 'Second & third conditionals' },
    summary: { vi: 'Tưởng tượng điều không có thật và nói về điều đã có thể khác đi.', en: 'Imagine unreal situations and talk about how the past could have been different.' },
    pattern: 'If + past, would + V · If + had V3, would have + V3',
    example: 'If cities had more green space, people would feel less stressed.',
    lessonIds: ['gr-l3-conditionals-2-3', 'l3-i-spk-08', 'l3-g-u5-write'],
  },
  {
    id: 'passive-voice',
    level: 3,
    title: { vi: 'Câu bị động', en: 'The passive voice' },
    summary: { vi: 'Nhấn vào việc được làm, không phải ai làm — rất cần cho IELTS Writing.', en: 'Focus on the action, not the doer — essential for IELTS Writing.' },
    pattern: 'be + V3 (is made · was built · has been done · will be used)',
    example: 'The new bridge was opened in 2022 and is used by thousands of drivers.',
    lessonIds: ['gr-l3-passive', 'l3-i-wri-05'],
  },
  {
    id: 'relative-clauses',
    level: 3,
    title: { vi: 'Mệnh đề quan hệ: who, which, that, whose, where', en: 'Relative clauses: who, which, that, whose, where' },
    summary: { vi: 'Gộp 2 câu ngắn thành 1 câu dài, rõ nghĩa hơn.', en: 'Combine two short sentences into one longer, clearer one.' },
    pattern: 'noun + who / which / that / whose / where + clause',
    example: 'Teachers who give clear feedback help students improve faster.',
    lessonIds: ['gr-l3-relative-clauses'],
  },
  {
    id: 'reported-speech',
    level: 3,
    title: { vi: 'Câu tường thuật', en: 'Reported speech' },
    summary: { vi: 'Thuật lại lời người khác: lùi thì, đổi đại từ, dùng reporting verbs.', en: 'Report what people said: shift tenses, change pronouns, use reporting verbs.' },
    pattern: 'say (that) · tell sb (that) · ask if / wh- · advise sb to V',
    example: 'My doctor told me that I needed more sleep.',
    lessonIds: ['gr-l3-reported-speech', 'l3-g-u3-vocab', 'l3-g-u5-speak'],
  },
  {
    id: 'modals-deduction',
    level: 3,
    title: { vi: 'Suy đoán: must, might, could, can\'t', en: 'Deduction: must, might, could, can\'t' },
    summary: { vi: 'Nói mức độ chắc chắn — cực hữu ích cho IELTS Speaking Part 3.', en: 'Show how sure you are — very useful for IELTS Speaking Part 3.' },
    pattern: 'must / might / could / can\'t + V · + have V3 (past)',
    example: 'She isn\'t answering. She must be in a meeting.',
    lessonIds: ['gr-l3-modals-deduction', 'l3-i-spk-08'],
  },
  {
    id: 'nominalisation',
    level: 3,
    title: { vi: 'Cụm danh từ & danh từ hoá', en: 'Noun phrases & nominalisation' },
    summary: { vi: 'Biến "prices rose quickly" thành "a rapid rise in prices" — văn viết học thuật hơn.', en: 'Turn "prices rose quickly" into "a rapid rise in prices" for a more academic style.' },
    pattern: 'adjective + noun (+ of / in + noun)',
    example: 'The growth of online learning has changed education.',
    lessonIds: ['gr-l3-nominalisation'],
  },
  {
    id: 'cohesion',
    level: 3,
    title: { vi: 'Liên kết nâng cao: although, whereas, therefore…', en: 'Cohesion: although, whereas, therefore…' },
    summary: { vi: 'Nối ý mạch lạc mà không lạm dụng từ nối — tiêu chí CC của IELTS.', en: 'Link ideas smoothly without overusing linkers — the CC criterion in IELTS.' },
    pattern: 'although + clause · despite + noun · whereas · therefore · this + noun',
    example: 'Although online courses are cheap, some students find them lonely.',
    lessonIds: ['l3-i-wri-07', 'l3-g-u2-write', 'l2b-i-wri-04'],
  },
  {
    id: 'complex-comparisons',
    level: 3,
    title: { vi: 'So sánh nâng cao', en: 'Advanced comparisons' },
    summary: { vi: 'much higher than, twice as many as, slightly fewer — để mô tả số liệu chính xác.', en: 'much higher than, twice as many as, slightly fewer — to describe data precisely.' },
    pattern: 'much / far / slightly + comparative · twice as … as',
    example: 'Twice as many people cycled to work in 2020 as in 2010.',
    lessonIds: ['l3-i-wri-02', 'l3-i-spk-07'],
  },
]

/* ---------------------------- hàm tra cứu ---------------------------- */

/** Tìm 1 điểm ngữ pháp theo id (đường dẫn /grammar/:topicId). */
export function findGrammarTopic(topicId: string | undefined): GrammarTopic | undefined {
  return GRAMMAR_TOPICS.find((topic) => topic.id === topicId)
}

/** Các điểm ngữ pháp của 1 nhóm trình độ (theo đúng thứ tự trong danh sách). */
export function grammarTopicsOfLevel(level: GrammarLevel): GrammarTopic[] {
  return GRAMMAR_TOPICS.filter((topic) => topic.level === level)
}

/** Bài này có phải bài mới viết riêng cho khu Ngữ pháp không (id bắt đầu bằng "gr-"). */
export function isGrammarOnlyLesson(lessonId: string): boolean {
  return lessonId.startsWith('gr-')
}
