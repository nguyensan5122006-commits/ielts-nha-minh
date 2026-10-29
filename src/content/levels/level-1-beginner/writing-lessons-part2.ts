/**
 * writing-lessons-part2.ts — LEVEL 1 (Band 0 – 2.0) — KỸ NĂNG VIẾT (WRITING), PHẦN 2
 * ----------------------------------------------------------------------------
 * File này chứa 6 bài Viết tiếp theo (bài 5 → bài 10) cho người mới bắt đầu.
 * Lộ trình phần 2:
 *   5. Thì hiện tại đơn với he / she / it (thêm -s / -es khi viết)
 *   6. There is / There are — tả căn phòng
 *   7. Trật tự tính từ (a big red car) & tả người
 *   8. Giới từ chỉ thời gian và nơi chốn: in / on / at
 *   9. Viết email / tin nhắn thân mật cho bạn (chào, nội dung, kết thư)
 *  10. Viết đoạn văn về thói quen hằng ngày với từ chỉ trình tự
 *      (First, Then, After that, Finally)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2-3 thẻ lý thuyết song ngữ
 *   - exercises     : 10 bài luyện, trong đó đúng 1 bài "write-answer" (AI chấm)
 *   - miniTest      : 6 câu kiểm tra cuối bài, có 1 câu "write-answer"
 *
 * Quy ước id: "l1-write-<số bài>-ex<số>" và "l1-write-<số bài>-test<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1WritingLessonsPart2: Lesson[] = [
  // ==========================================================================
  // BÀI 5: Hiện tại đơn với he / she / it — nhớ thêm -s / -es khi viết
  // ==========================================================================
  {
    id: 'l1-write-05',
    skill: 'writing',
    title: { vi: 'Hiện tại đơn: he / she / it + động từ thêm -s', en: 'Present simple: he / she / it + verb -s' },
    description: {
      vi: 'Viết đúng động từ ở thì hiện tại đơn khi chủ ngữ là he, she, it hoặc một người/vật số ít.',
      en: 'Write the correct present simple verb when the subject is he, she, it or one person/thing.',
    },
    teachingCards: [
      {
        title: { vi: 'Khi nào thêm -s?', en: 'When do we add -s?' },
        body: {
          vi: 'Thì hiện tại đơn dùng để nói về **thói quen** và **sự thật**.\nVới **he / she / it** (hoặc My mother, Nam, the dog...) động từ phải **thêm -s**:\n- I **work** → She **works**.\n- They **play** → He **plays**.\nĐây là lỗi người Việt hay mắc nhất khi viết, vì tiếng Việt không đổi động từ. Hãy **kiểm tra chủ ngữ** trước khi viết động từ!',
          en: 'The present simple is for **habits** and **facts**.\nWith **he / she / it** (or My mother, Nam, the dog...) the verb **adds -s**:\n- I **work** → She **works**.\n- They **play** → He **plays**.\nThis is the most common writing mistake for Vietnamese learners, because Vietnamese verbs never change. Always **check the subject** before you write the verb!',
        },
        examples: [
          { en: 'My mother works in a hospital.', vi: 'Mẹ tôi làm việc ở bệnh viện.' },
          { en: 'The dog sleeps in the garden.', vi: 'Con chó ngủ ngoài vườn.' },
        ],
      },
      {
        title: { vi: 'Quy tắc chính tả: -s, -es, -ies, has', en: 'Spelling rules: -s, -es, -ies, has' },
        body: {
          vi: '- Hầu hết động từ: thêm **-s** → reads, eats, plays.\n- Tận cùng **-o, -sh, -ch, -x, -ss**: thêm **-es** → goes, does, washes, watches, fixes, misses.\n- Phụ âm + **y**: đổi y → **-ies** → study → studies, fly → flies. (Nhưng nguyên âm + y giữ nguyên: play → plays.)\n- Đặc biệt: **have → has**.',
          en: '- Most verbs: add **-s** → reads, eats, plays.\n- Ending in **-o, -sh, -ch, -x, -ss**: add **-es** → goes, does, washes, watches, fixes, misses.\n- Consonant + **y**: change y → **-ies** → study → studies, fly → flies. (But vowel + y stays: play → plays.)\n- Special: **have → has**.',
        },
        examples: [
          { en: 'Lan studies English every evening.', vi: 'Lan học tiếng Anh mỗi tối.' },
          { en: 'My father watches the news at 7 p.m.', vi: 'Bố tôi xem thời sự lúc 7 giờ tối.' },
          { en: 'Our teacher has a black bag.', vi: 'Cô giáo chúng tôi có một chiếc túi màu đen.' },
        ],
      },
      {
        title: { vi: 'Câu phủ định và câu hỏi', en: 'Negatives and questions' },
        body: {
          vi: 'Khi có **does / doesn\'t**, động từ chính **trở về nguyên mẫu** (không thêm -s nữa):\n- She **doesn\'t like** fish. (KHÔNG viết: doesn\'t likes)\n- **Does** he **play** tennis?',
          en: 'With **does / doesn\'t**, the main verb **goes back to the base form** (no more -s):\n- She **doesn\'t like** fish. (NOT: doesn\'t likes)\n- **Does** he **play** tennis?',
        },
        examples: [
          { en: 'My brother doesn\'t drink coffee.', vi: 'Anh trai tôi không uống cà phê.' },
          { en: 'Does your sister live in Hanoi?', vi: 'Chị gái bạn có sống ở Hà Nội không?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-05-ex01',
        type: 'multiple-choice',
        question: 'Choose the correct verb: "My sister ___ in a bank."',
        options: ['work', 'working', 'works', 'is work'],
        correctIndex: 2,
        explanation: {
          vi: '"My sister" = she → động từ thêm -s: works.',
          en: '"My sister" = she → the verb adds -s: works.',
        },
      },
      {
        id: 'l1-write-05-ex02',
        type: 'fill-blank',
        sentence: 'My father ___ the dishes after dinner.',
        acceptedAnswers: ['washes'],
        hint: '(wash)',
        explanation: {
          vi: '"wash" tận cùng bằng -sh nên thêm -es: washes.',
          en: '"wash" ends in -sh, so add -es: washes.',
        },
      },
      {
        id: 'l1-write-05-ex03',
        type: 'multiple-choice',
        question: 'Which is the correct he/she form of "study"?',
        options: ['studies', 'studys', 'studyes', 'study'],
        correctIndex: 0,
        explanation: {
          vi: 'Phụ âm + y → đổi y thành -ies: studies.',
          en: 'Consonant + y → change y to -ies: studies.',
        },
      },
      {
        id: 'l1-write-05-ex04',
        type: 'arrange-words',
        translationVi: 'Bà tôi uống trà xanh mỗi sáng.',
        correctSentence: 'My grandmother drinks green tea every morning.',
        extraWords: ['drink'],
        explanation: {
          vi: '"My grandmother" = she → drinks (thêm -s).',
          en: '"My grandmother" = she → drinks (add -s).',
        },
      },
      {
        id: 'l1-write-05-ex05',
        type: 'fill-blank',
        sentence: 'Our cat ___ on the sofa all day.',
        acceptedAnswers: ['sleeps'],
        hint: '(sleep)',
        explanation: {
          vi: '"Our cat" = it → sleeps.',
          en: '"Our cat" = it → sleeps.',
        },
      },
      {
        id: 'l1-write-05-ex06',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối động từ nguyên mẫu với dạng dùng cho he / she / it.',
          en: 'Match the base verb with its he / she / it form.',
        },
        pairs: [
          { left: 'go', right: 'goes' },
          { left: 'have', right: 'has' },
          { left: 'watch', right: 'watches' },
          { left: 'fly', right: 'flies' },
          { left: 'play', right: 'plays' },
        ],
        explanation: {
          vi: 'go/watch → -es; fly → -ies; play giữ y vì trước y là nguyên âm; have → has.',
          en: 'go/watch → -es; fly → -ies; play keeps the y (vowel + y); have → has.',
        },
      },
      {
        id: 'l1-write-05-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ["He don't like fish.", "He doesn't likes fish.", 'He not like fish.', "He doesn't like fish."],
        correctIndex: 3,
        explanation: {
          vi: 'He + doesn\'t + động từ nguyên mẫu (like, không thêm -s).',
          en: 'He + doesn\'t + base verb (like, no -s).',
        },
      },
      {
        id: 'l1-write-05-ex08',
        type: 'fill-blank',
        sentence: 'Minh ___ his homework at 8 p.m.',
        acceptedAnswers: ['does'],
        hint: '(do)',
        explanation: {
          vi: '"do" tận cùng bằng -o nên thêm -es: does.',
          en: '"do" ends in -o, so add -es: does.',
        },
      },
      {
        id: 'l1-write-05-ex09',
        type: 'arrange-words',
        translationVi: 'Cô ấy không ăn thịt.',
        correctSentence: "She doesn't eat meat.",
        extraWords: ['eats'],
        explanation: {
          vi: 'Sau doesn\'t dùng động từ nguyên mẫu: eat (không phải eats).',
          en: 'After doesn\'t, use the base verb: eat (not eats).',
        },
      },
      {
        id: 'l1-write-05-ex10',
        type: 'write-answer',
        prompt:
          'Write 4–5 sentences about your best friend. What does he or she do every day? What does he or she like and not like?',
        tipsVi:
          'Bắt đầu: My best friend is ... Dùng he/she + động từ thêm -s (gets up, goes, likes, plays). Thêm 1 câu phủ định với doesn\'t + động từ nguyên mẫu.',
        minWords: 30,
        sampleAnswer:
          'My best friend is Quan. He lives near my house. He gets up early and goes to school by bike. He likes football and he plays it every afternoon. He doesn\'t like vegetables, but he eats a lot of fruit.',
        explanation: {
          vi: 'Kiểm tra: mọi động từ sau he/she đều có -s, trừ sau doesn\'t.',
          en: 'Check: every verb after he/she has -s, except after doesn\'t.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-05-test01',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['Lan haves a dog.', 'Lan has a dog.', 'Lan have a dog.', 'Lan having a dog.'],
        correctIndex: 1,
        explanation: {
          vi: 'have là động từ đặc biệt: he/she → has.',
          en: 'have is special: he/she → has.',
        },
      },
      {
        id: 'l1-write-05-test02',
        type: 'fill-blank',
        sentence: 'The shop ___ at 9 a.m. every day.',
        acceptedAnswers: ['opens'],
        hint: '(open)',
        explanation: {
          vi: '"The shop" = it → opens.',
          en: '"The shop" = it → opens.',
        },
      },
      {
        id: 'l1-write-05-test03',
        type: 'arrange-words',
        translationVi: 'Anh trai tôi xem bóng đá vào cuối tuần.',
        correctSentence: 'My brother watches football at the weekend.',
        extraWords: ['watch'],
      },
      {
        id: 'l1-write-05-test04',
        type: 'multiple-choice',
        question: 'Which verb is spelled wrongly? "She gets up at six, brushs her teeth and goes to school."',
        options: ['brushs', 'gets', 'goes', 'school'],
        correctIndex: 0,
        explanation: {
          vi: '"brush" tận cùng -sh nên phải viết brushes.',
          en: '"brush" ends in -sh, so it must be brushes.',
        },
      },
      {
        id: 'l1-write-05-test05',
        type: 'fill-blank',
        sentence: '___ your father work at the weekend?',
        acceptedAnswers: ['Does'],
        hint: '(do / does)',
        explanation: {
          vi: '"your father" = he → câu hỏi dùng Does.',
          en: '"your father" = he → the question uses Does.',
        },
      },
      {
        id: 'l1-write-05-test06',
        type: 'write-answer',
        prompt:
          'Write 4–5 sentences about a pet or an animal you like. What does it eat? Where does it sleep? What does it do every day?',
        tipsVi:
          'Dùng "it" + động từ thêm -s: it eats, it sleeps, it runs. Có thể thêm 1 câu với doesn\'t.',
        minWords: 25,
        sampleAnswer:
          'I have a small dog. Its name is Mochi. It eats rice and meat. It sleeps in a box next to my bed. Every afternoon it runs in the garden with me. It doesn\'t like cats.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: There is / There are — tả một căn phòng
  // ==========================================================================
  {
    id: 'l1-write-06',
    skill: 'writing',
    title: { vi: 'There is / There are: tả căn phòng', en: 'There is / There are: describing a room' },
    description: {
      vi: 'Dùng there is / there are để viết vài câu tả phòng ngủ, lớp học hoặc căn nhà của bạn.',
      en: 'Use there is / there are to write a few sentences describing your bedroom, classroom or home.',
    },
    teachingCards: [
      {
        title: { vi: 'There is hay there are?', en: 'There is or there are?' },
        body: {
          vi: '"There is / There are" nghĩa là **"có"** (cái gì đó ở đâu đó).\n- **There is** + a/an + danh từ số ít: There **is a** bed.\n- **There is** + danh từ không đếm được: There **is some** water.\n- **There are** + danh từ số nhiều: There **are two** chairs.\nViết tắt: there is → **there\'s**.\nLưu ý: KHÔNG viết "It has a bed in my room" để nói "có" — hãy dùng **There is**.',
          en: '"There is / There are" means something **exists** somewhere.\n- **There is** + a/an + singular noun: There **is a** bed.\n- **There is** + uncountable noun: There **is some** water.\n- **There are** + plural noun: There **are two** chairs.\nShort form: there is → **there\'s**.\nNote: do NOT write "It has a bed in my room" — use **There is**.',
        },
        examples: [
          { en: 'There is a desk next to the window.', vi: 'Có một cái bàn học cạnh cửa sổ.' },
          { en: 'There are three pictures on the wall.', vi: 'Có ba bức tranh trên tường.' },
        ],
      },
      {
        title: { vi: 'Phủ định và câu hỏi', en: 'Negatives and questions' },
        body: {
          vi: '- Phủ định: There **isn\'t a** TV. / There **aren\'t any** posters.\n- Câu hỏi: **Is there** a lamp? – Yes, there is. / No, there isn\'t.\n**Are there any** books? – Yes, there are. / No, there aren\'t.\nDùng **any** trong câu phủ định và câu hỏi với danh từ số nhiều.',
          en: '- Negative: There **isn\'t a** TV. / There **aren\'t any** posters.\n- Question: **Is there** a lamp? – Yes, there is. / No, there isn\'t.\n**Are there any** books? – Yes, there are. / No, there aren\'t.\nUse **any** in negatives and questions with plural nouns.',
        },
        examples: [
          { en: "There aren't any plants in my room.", vi: 'Trong phòng tôi không có cái cây nào.' },
          { en: 'Is there a mirror in the bathroom?', vi: 'Trong phòng tắm có gương không?' },
        ],
      },
      {
        title: { vi: 'Cách viết đoạn tả phòng', en: 'How to write a room description' },
        body: {
          vi: '1. Câu mở đầu: **My bedroom is small but nice.**\n2. Liệt kê đồ vật với there is / there are + **vị trí**: in, on, under, next to.\n3. Câu kết: **I love my room because it is quiet.**',
          en: '1. Opening sentence: **My bedroom is small but nice.**\n2. List the things with there is / there are + **position**: in, on, under, next to.\n3. Closing sentence: **I love my room because it is quiet.**',
        },
        examples: [
          { en: 'There is a small lamp on my desk.', vi: 'Có một cái đèn nhỏ trên bàn học của tôi.' },
          { en: 'There are some shoes under the bed.', vi: 'Có vài đôi giày dưới gầm giường.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-06-ex01',
        type: 'multiple-choice',
        question: 'Complete: "___ a big window in my room."',
        options: ['There is', 'There are', 'They are', 'It have'],
        correctIndex: 0,
        explanation: {
          vi: '"a big window" là số ít → There is.',
          en: '"a big window" is singular → There is.',
        },
      },
      {
        id: 'l1-write-06-ex02',
        type: 'fill-blank',
        sentence: 'There ___ two beds in my room.',
        acceptedAnswers: ['are'],
        hint: '(is / are)',
        explanation: {
          vi: '"two beds" là số nhiều → There are.',
          en: '"two beds" is plural → There are.',
        },
      },
      {
        id: 'l1-write-06-ex03',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'There is three chairs in the kitchen.',
          'There are a sofa in the living room.',
          'There are some books on the shelf.',
          'There is many pictures on the wall.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"some books" là số nhiều nên dùng There are.',
          en: '"some books" is plural, so we use There are.',
        },
      },
      {
        id: 'l1-write-06-ex04',
        type: 'arrange-words',
        translationVi: 'Có một cái đèn trên bàn học.',
        correctSentence: 'There is a lamp on the desk.',
        extraWords: ['are'],
        explanation: {
          vi: '"a lamp" số ít → There is.',
          en: '"a lamp" is singular → There is.',
        },
      },
      {
        id: 'l1-write-06-ex05',
        type: 'fill-blank',
        sentence: 'There ___ any posters on the wall.',
        acceptedAnswers: ["aren't", 'are not'],
        hint: '(phủ định của "are")',
        explanation: {
          vi: 'Phủ định số nhiều: There aren\'t any + danh từ số nhiều.',
          en: 'Plural negative: There aren\'t any + plural noun.',
        },
      },
      {
        id: 'l1-write-06-ex06',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối từ tiếng Anh với nghĩa tiếng Việt.',
          en: 'Match the English words with their Vietnamese meanings.',
        },
        pairs: [
          { left: 'wardrobe', right: 'tủ quần áo' },
          { left: 'bookshelf', right: 'giá sách' },
          { left: 'pillow', right: 'cái gối' },
          { left: 'curtains', right: 'rèm cửa' },
          { left: 'mirror', right: 'gương' },
        ],
      },
      {
        id: 'l1-write-06-ex07',
        type: 'multiple-choice',
        question: 'Complete: "___ a TV in your bedroom?" – "No, there isn\'t."',
        options: ['Are there', 'There is', 'Is it', 'Is there'],
        correctIndex: 3,
        explanation: {
          vi: 'Câu hỏi số ít: Is there + a/an ...?',
          en: 'Singular question: Is there + a/an ...?',
        },
      },
      {
        id: 'l1-write-06-ex08',
        type: 'fill-blank',
        sentence: 'There ___ some water in the bottle.',
        acceptedAnswers: ['is', "'s"],
        hint: '(is / are)',
        explanation: {
          vi: '"water" là danh từ không đếm được → There is.',
          en: '"water" is uncountable → There is.',
        },
      },
      {
        id: 'l1-write-06-ex09',
        type: 'arrange-words',
        translationVi: 'Trong phòng tôi không có ghế sofa.',
        correctSentence: "There isn't a sofa in my room.",
        extraWords: ["aren't"],
        explanation: {
          vi: '"a sofa" số ít → There isn\'t a ...',
          en: '"a sofa" is singular → There isn\'t a ...',
        },
      },
      {
        id: 'l1-write-06-ex10',
        type: 'write-answer',
        prompt:
          'Describe your bedroom (or your favourite room) in 5–6 sentences. Use there is / there are and words like in, on, under, next to.',
        tipsVi:
          'Câu 1: My bedroom is ... (small/big). Sau đó liệt kê đồ vật: There is a ... / There are two ... + vị trí. Câu cuối: I like my room because ...',
        minWords: 35,
        sampleAnswer:
          'My bedroom is small but nice. There is a bed next to the window. There is a desk and a chair in the corner. There are a lot of books on the shelf. There aren\'t any pictures on the wall. I love my room because it is quiet.',
        explanation: {
          vi: 'Kiểm tra: số ít → there is, số nhiều → there are, phủ định số nhiều dùng any.',
          en: 'Check: singular → there is, plural → there are, plural negative uses any.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-06-test01',
        type: 'multiple-choice',
        question: 'Choose the correct word: "There ___ a cat under the table."',
        options: ['are', 'is', 'be', 'am'],
        correctIndex: 1,
      },
      {
        id: 'l1-write-06-test02',
        type: 'fill-blank',
        sentence: 'There ___ four people in my family.',
        acceptedAnswers: ['are'],
        hint: '(is / are)',
      },
      {
        id: 'l1-write-06-test03',
        type: 'arrange-words',
        translationVi: 'Có hai cái gối trên giường.',
        correctSentence: 'There are two pillows on the bed.',
        extraWords: ['is'],
      },
      {
        id: 'l1-write-06-test04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          "There aren't any milk in the fridge.",
          "There isn't some milk in the fridge.",
          'There not milk in the fridge.',
          "There isn't any milk in the fridge.",
        ],
        correctIndex: 3,
        explanation: {
          vi: '"milk" không đếm được → isn\'t; phủ định dùng any.',
          en: '"milk" is uncountable → isn\'t; negatives use any.',
        },
      },
      {
        id: 'l1-write-06-test05',
        type: 'fill-blank',
        sentence: '___ there any chairs in the room?',
        acceptedAnswers: ['Are'],
        hint: '(Is / Are)',
      },
      {
        id: 'l1-write-06-test06',
        type: 'write-answer',
        prompt: 'Describe your classroom (or your office) in 5–6 sentences. Use there is / there are.',
        tipsVi:
          'Mở đầu: My classroom is ... Kể số bàn ghế, bảng, cửa sổ, quạt... Dùng there is / there are + vị trí. Kết thúc bằng cảm nghĩ của bạn.',
        minWords: 30,
        sampleAnswer:
          'My classroom is big and bright. There are forty desks and forty chairs. There is a whiteboard on the front wall. There are four fans on the ceiling. There isn\'t an air conditioner, so it is hot in summer. I like my classroom very much.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Trật tự tính từ (a big red car) & tả người
  // ==========================================================================
  {
    id: 'l1-write-07',
    skill: 'writing',
    title: { vi: 'Tính từ: trật tự & tả người', en: 'Adjectives: word order & describing people' },
    description: {
      vi: 'Đặt tính từ đúng chỗ (a big red car) và viết vài câu tả ngoại hình, tính cách của một người.',
      en: 'Put adjectives in the right place (a big red car) and write sentences describing how a person looks and what they are like.',
    },
    teachingCards: [
      {
        title: { vi: 'Tính từ đứng ở đâu?', en: 'Where do adjectives go?' },
        body: {
          vi: 'Tiếng Việt: "chiếc xe **đỏ**" (tính từ sau danh từ). Tiếng Anh: tính từ **đứng TRƯỚC danh từ**: a **red** car.\nHoặc tính từ đứng **sau be**: The car **is red**.\nTính từ **không bao giờ thêm -s**: two **big** cars (KHÔNG viết: bigs cars).',
          en: 'In Vietnamese the adjective comes after the noun. In English the adjective goes **BEFORE the noun**: a **red** car.\nOr the adjective comes **after be**: The car **is red**.\nAdjectives **never take -s**: two **big** cars (NOT: bigs cars).',
        },
        examples: [
          { en: 'She has a new phone.', vi: 'Cô ấy có một chiếc điện thoại mới.' },
          { en: 'These apples are sweet.', vi: 'Những quả táo này ngọt.' },
        ],
      },
      {
        title: { vi: 'Trật tự nhiều tính từ', en: 'Order of several adjectives' },
        body: {
          vi: 'Khi có 2–3 tính từ, viết theo thứ tự:\n**Ý kiến → Kích cỡ → Tuổi/độ mới → Màu sắc → DANH TỪ**\n- a **beautiful red** dress (ý kiến + màu)\n- a **big red** car (kích cỡ + màu)\n- a **small old** house (kích cỡ + tuổi)\nMẹo nhớ: **màu sắc luôn đứng gần danh từ nhất**.',
          en: 'With 2–3 adjectives, use this order:\n**Opinion → Size → Age → Colour → NOUN**\n- a **beautiful red** dress (opinion + colour)\n- a **big red** car (size + colour)\n- a **small old** house (size + age)\nTip: **colour always goes closest to the noun**.',
        },
        examples: [
          { en: 'He drives a big black car.', vi: 'Anh ấy lái một chiếc ô tô to màu đen.' },
          { en: 'We live in a nice little flat.', vi: 'Chúng tôi sống trong một căn hộ nhỏ xinh.' },
        ],
      },
      {
        title: { vi: 'Tả người: ngoại hình và tính cách', en: 'Describing people: looks and personality' },
        body: {
          vi: '**Ngoại hình** (appearance):\n- He/She **is** tall / short / slim / young.\n- He/She **has** long black hair / short curly hair / big brown eyes.\n**Tính cách** (personality):\n- She **is** kind / funny / friendly / shy / hard-working.\nLưu ý: tóc dùng **has**, KHÔNG dùng "is": She **has** long hair (KHÔNG viết: She is long hair).',
          en: '**Appearance**:\n- He/She **is** tall / short / slim / young.\n- He/She **has** long black hair / short curly hair / big brown eyes.\n**Personality**:\n- She **is** kind / funny / friendly / shy / hard-working.\nNote: for hair use **has**, not "is": She **has** long hair (NOT: She is long hair).',
        },
        examples: [
          { en: 'My aunt is tall and slim. She has short curly hair.', vi: 'Dì tôi cao và mảnh khảnh. Dì có mái tóc xoăn ngắn.' },
          { en: 'He is very funny and friendly.', vi: 'Anh ấy rất vui tính và thân thiện.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-07-ex01',
        type: 'multiple-choice',
        question: 'Which is correct?',
        options: ['a car red big', 'a red big car', 'a big red car', 'a big car red'],
        correctIndex: 2,
        explanation: {
          vi: 'Kích cỡ (big) → màu sắc (red) → danh từ (car).',
          en: 'Size (big) → colour (red) → noun (car).',
        },
      },
      {
        id: 'l1-write-07-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['She has black long hair.', 'She has long black hair.', 'She has hair long black.', 'She is long black hair.'],
        correctIndex: 1,
        explanation: {
          vi: 'Kích cỡ/độ dài (long) đứng trước màu (black); tóc dùng "has".',
          en: 'Length (long) comes before colour (black); use "has" for hair.',
        },
      },
      {
        id: 'l1-write-07-ex03',
        type: 'fill-blank',
        sentence: 'I have two ___ cats.',
        acceptedAnswers: ['white'],
        hint: '(white)',
        explanation: {
          vi: 'Tính từ không thêm -s, kể cả khi danh từ số nhiều: two white cats.',
          en: 'Adjectives never add -s, even with plural nouns: two white cats.',
        },
      },
      {
        id: 'l1-write-07-ex04',
        type: 'arrange-words',
        translationVi: 'Anh trai tôi có đôi mắt to màu nâu.',
        correctSentence: 'My brother has big brown eyes.',
        extraWords: ['browns'],
        explanation: {
          vi: 'Kích cỡ (big) trước màu (brown); tính từ không có -s.',
          en: 'Size (big) before colour (brown); adjectives have no -s.',
        },
      },
      {
        id: 'l1-write-07-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối tính từ tả người với nghĩa tiếng Việt.',
          en: 'Match the adjectives for people with their Vietnamese meanings.',
        },
        pairs: [
          { left: 'kind', right: 'tốt bụng' },
          { left: 'funny', right: 'vui tính, hài hước' },
          { left: 'curly', right: 'xoăn' },
          { left: 'slim', right: 'mảnh khảnh' },
          { left: 'shy', right: 'nhút nhát' },
          { left: 'friendly', right: 'thân thiện' },
        ],
      },
      {
        id: 'l1-write-07-ex06',
        type: 'multiple-choice',
        question: 'Which word describes personality (tính cách), not appearance?',
        options: ['kind', 'tall', 'curly', 'slim'],
        correctIndex: 0,
        explanation: {
          vi: '"kind" (tốt bụng) là tính cách; tall, curly, slim là ngoại hình.',
          en: '"kind" is personality; tall, curly and slim describe appearance.',
        },
      },
      {
        id: 'l1-write-07-ex07',
        type: 'arrange-words',
        translationVi: 'Cô ấy mặc một chiếc váy đỏ rất đẹp.',
        correctSentence: 'She wears a beautiful red dress.',
        extraWords: ['reds'],
        explanation: {
          vi: 'Ý kiến (beautiful) → màu sắc (red) → danh từ (dress).',
          en: 'Opinion (beautiful) → colour (red) → noun (dress).',
        },
      },
      {
        id: 'l1-write-07-ex08',
        type: 'fill-blank',
        sentence: 'Nam is a very ___ boy. He always helps other people.',
        acceptedAnswers: ['kind', 'helpful', 'nice', 'good'],
        hint: '(tốt bụng)',
        explanation: {
          vi: 'Người luôn giúp đỡ người khác là người tốt bụng: kind.',
          en: 'Someone who always helps others is kind.',
        },
      },
      {
        id: 'l1-write-07-ex09',
        type: 'multiple-choice',
        question: 'Find the mistake: "My sister is a pretty girl with longs hair."',
        options: ['pretty', 'girl', 'with', 'longs'],
        correctIndex: 3,
        explanation: {
          vi: 'Tính từ không thêm -s: long hair.',
          en: 'Adjectives never add -s: long hair.',
        },
      },
      {
        id: 'l1-write-07-ex10',
        type: 'write-answer',
        prompt:
          'Describe your best friend in 4–6 sentences. Write about his or her appearance (height, hair, eyes) and personality.',
        tipsVi:
          'Dùng "is" cho chiều cao/tính cách (He is tall. She is funny.) và "has" cho tóc, mắt (She has long black hair). Nhớ trật tự: kích cỡ → màu → danh từ.',
        minWords: 35,
        sampleAnswer:
          'My best friend is Vy. She is fourteen years old. She is short and slim. She has long straight hair and big black eyes. She is very funny and friendly, so everyone in my class likes her. She is also kind because she often helps me with maths.',
        explanation: {
          vi: 'Bài tốt có cả ngoại hình (is/has + tính từ) và tính cách.',
          en: 'A good answer includes appearance (is/has + adjectives) and personality.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-07-test01',
        type: 'multiple-choice',
        question: 'Which is correct?',
        options: ['an old small house', 'a small old house', 'a house small old', 'an small old house'],
        correctIndex: 1,
        explanation: {
          vi: 'Kích cỡ (small) đứng trước tuổi (old).',
          en: 'Size (small) comes before age (old).',
        },
      },
      {
        id: 'l1-write-07-test02',
        type: 'arrange-words',
        translationVi: 'Bố tôi cao và gầy.',
        correctSentence: 'My father is tall and thin.',
        extraWords: ['has'],
      },
      {
        id: 'l1-write-07-test03',
        type: 'fill-blank',
        sentence: 'She has two ___ bags.',
        acceptedAnswers: ['blue'],
        hint: '(blue)',
        explanation: {
          vi: 'Tính từ không thêm -s: two blue bags.',
          en: 'Adjectives have no -s: two blue bags.',
        },
      },
      {
        id: 'l1-write-07-test04',
        type: 'multiple-choice',
        question: 'Which sentence describes appearance (ngoại hình)?',
        options: ['He is very funny.', 'He is shy at school.', 'He has short curly hair.', 'He is friendly to everyone.'],
        correctIndex: 2,
      },
      {
        id: 'l1-write-07-test05',
        type: 'arrange-words',
        translationVi: 'Đó là một con mèo trắng nhỏ.',
        correctSentence: 'It is a small white cat.',
        extraWords: ['whites'],
      },
      {
        id: 'l1-write-07-test06',
        type: 'write-answer',
        prompt: 'Describe your favourite teacher in 4–6 sentences. What does he or she look like? What is he or she like?',
        tipsVi:
          'Câu mở đầu: My favourite teacher is ... Tả ngoại hình (is tall, has short hair...) rồi tính cách (is kind, patient...). Kết thúc bằng lý do bạn thích thầy/cô.',
        minWords: 30,
        sampleAnswer:
          'My favourite teacher is Mr Hung. He teaches English at my school. He is tall and he has short black hair. He wears big round glasses. He is patient and very funny. I like him because his lessons are interesting.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Giới từ chỉ thời gian và nơi chốn: in / on / at
  // ==========================================================================
  {
    id: 'l1-write-08',
    skill: 'writing',
    title: { vi: 'Giới từ in / on / at (thời gian & nơi chốn)', en: 'Prepositions in / on / at (time & place)' },
    description: {
      vi: 'Dùng đúng in, on, at khi viết về thời gian (giờ, ngày, tháng) và nơi chốn.',
      en: 'Use in, on and at correctly when you write about time (hours, days, months) and places.',
    },
    teachingCards: [
      {
        title: { vi: 'In / on / at chỉ thời gian', en: 'In / on / at for time' },
        body: {
          vi: '- **at** + giờ & thời điểm: at 7 o\'clock, at noon, **at night**, at the weekend.\n- **on** + ngày, thứ, ngày tháng: on Monday, on 2 September, on my birthday, on Sunday morning.\n- **in** + tháng, năm, mùa, buổi: in May, in 2025, in summer, **in the morning / afternoon / evening**.\nMẹo: khoảng thời gian càng dài → in; một ngày → on; một điểm → at.',
          en: '- **at** + clock times & points: at 7 o\'clock, at noon, **at night**, at the weekend.\n- **on** + days and dates: on Monday, on 2 September, on my birthday, on Sunday morning.\n- **in** + months, years, seasons, parts of the day: in May, in 2025, in summer, **in the morning / afternoon / evening**.\nTip: long periods → in; one day → on; one point → at.',
        },
        examples: [
          { en: 'I have English on Wednesday at 9 a.m.', vi: 'Tôi học tiếng Anh vào thứ Tư lúc 9 giờ sáng.' },
          { en: 'It is very hot in July.', vi: 'Tháng Bảy trời rất nóng.' },
        ],
      },
      {
        title: { vi: 'In / on / at chỉ nơi chốn', en: 'In / on / at for place' },
        body: {
          vi: '- **in** + bên trong / thành phố / quốc gia: in the kitchen, in my bag, in Hanoi, in Vietnam.\n- **on** + trên bề mặt / tên đường / tầng: on the table, on the wall, on Le Loi Street, on the second floor.\n- **at** + một địa điểm cụ thể / địa chỉ có số nhà: **at home**, at school, at work, at the bus stop, at 25 Tran Phu Street.',
          en: '- **in** + inside / cities / countries: in the kitchen, in my bag, in Hanoi, in Vietnam.\n- **on** + surfaces / street names / floors: on the table, on the wall, on Le Loi Street, on the second floor.\n- **at** + a specific point / full address: **at home**, at school, at work, at the bus stop, at 25 Tran Phu Street.',
        },
        examples: [
          { en: 'My aunt lives in Can Tho.', vi: 'Dì tôi sống ở Cần Thơ.' },
          { en: 'I wait for my friend at the bus stop.', vi: 'Tôi đợi bạn ở trạm xe buýt.' },
          { en: 'Our flat is on the fifth floor.', vi: 'Căn hộ của chúng tôi ở tầng năm.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-08-ex01',
        type: 'multiple-choice',
        question: 'Complete: "I get up ___ 6 o\'clock."',
        options: ['at', 'in', 'on', 'by'],
        correctIndex: 0,
        explanation: {
          vi: 'Giờ cụ thể dùng at.',
          en: 'Clock times use at.',
        },
      },
      {
        id: 'l1-write-08-ex02',
        type: 'fill-blank',
        sentence: 'My birthday is ___ October.',
        acceptedAnswers: ['in'],
        hint: '(in / on / at)',
        explanation: {
          vi: 'Tháng dùng in: in October.',
          en: 'Months use in: in October.',
        },
      },
      {
        id: 'l1-write-08-ex03',
        type: 'fill-blank',
        sentence: 'We have a maths test ___ Tuesday.',
        acceptedAnswers: ['on'],
        hint: '(in / on / at)',
        explanation: {
          vi: 'Thứ trong tuần dùng on.',
          en: 'Days of the week use on.',
        },
      },
      {
        id: 'l1-write-08-ex04',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm tiếng Việt với cụm tiếng Anh đúng.',
          en: 'Match the Vietnamese phrases with the correct English phrases.',
        },
        pairs: [
          { left: 'vào buổi sáng', right: 'in the morning' },
          { left: 'vào thứ Hai', right: 'on Monday' },
          { left: 'lúc 8 giờ', right: "at 8 o'clock" },
          { left: 'vào ban đêm', right: 'at night' },
          { left: 'vào mùa hè', right: 'in summer' },
          { left: 'ở nhà', right: 'at home' },
        ],
      },
      {
        id: 'l1-write-08-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['My phone is at my bag.', 'My phone is on my bag in.', 'My phone is in my bag.', 'My phone in is my bag.'],
        correctIndex: 2,
        explanation: {
          vi: 'Bên trong một vật → in: in my bag.',
          en: 'Inside something → in: in my bag.',
        },
      },
      {
        id: 'l1-write-08-ex06',
        type: 'arrange-words',
        translationVi: 'Cô ấy làm việc ở một bệnh viện tại Huế.',
        correctSentence: 'She works at a hospital in Hue.',
        extraWords: ['on'],
        explanation: {
          vi: 'Địa điểm làm việc cụ thể → at a hospital; thành phố → in Hue.',
          en: 'A specific workplace → at a hospital; a city → in Hue.',
        },
      },
      {
        id: 'l1-write-08-ex07',
        type: 'fill-blank',
        sentence: 'There is a clock ___ the wall.',
        acceptedAnswers: ['on'],
        hint: '(in / on / at)',
        explanation: {
          vi: 'Trên bề mặt (tường) → on the wall.',
          en: 'On a surface (the wall) → on the wall.',
        },
      },
      {
        id: 'l1-write-08-ex08',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I go to bed in 10 p.m.', 'I go to bed at 10 p.m.', 'I go to bed on 10 p.m.'],
        correctIndex: 1,
        explanation: {
          vi: 'Giờ cụ thể → at 10 p.m.',
          en: 'Clock time → at 10 p.m.',
        },
      },
      {
        id: 'l1-write-08-ex09',
        type: 'arrange-words',
        translationVi: 'Chúng tôi đi biển vào mùa hè.',
        correctSentence: 'We go to the beach in summer.',
        extraWords: ['on'],
        explanation: {
          vi: 'Mùa dùng in: in summer.',
          en: 'Seasons use in: in summer.',
        },
      },
      {
        id: 'l1-write-08-ex10',
        type: 'write-answer',
        prompt:
          'Write 4–6 sentences about your school or your workplace. Where is it? What time do you start and finish? What do you do on different days?',
        tipsVi:
          'Nơi chốn: in + thành phố, on + tên đường, at school/at work. Thời gian: at + giờ, on + thứ, in the morning/afternoon. Mỗi câu nên có ít nhất 1 giới từ.',
        minWords: 35,
        sampleAnswer:
          'My school is on Nguyen Trai Street in Ha Dong. I go to school at 6:45 in the morning. Lessons start at 7 o\'clock and finish at 11:30. On Monday and Wednesday, I have English. On Friday afternoon, I play basketball at school. I stay at home on Sunday.',
        explanation: {
          vi: 'Kiểm tra: at + giờ, on + thứ/tên đường, in + thành phố/buổi.',
          en: 'Check: at + time, on + day/street, in + city/part of the day.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-08-test01',
        type: 'multiple-choice',
        question: 'Complete: "My grandparents live ___ a small village."',
        options: ['on', 'at', 'in'],
        correctIndex: 2,
        explanation: {
          vi: 'Làng, thành phố, quốc gia → in.',
          en: 'Villages, cities, countries → in.',
        },
      },
      {
        id: 'l1-write-08-test02',
        type: 'fill-blank',
        sentence: 'I was born ___ 2010.',
        acceptedAnswers: ['in'],
        hint: '(in / on / at)',
      },
      {
        id: 'l1-write-08-test03',
        type: 'fill-blank',
        sentence: 'The film starts ___ 8:30.',
        acceptedAnswers: ['at'],
        hint: '(in / on / at)',
      },
      {
        id: 'l1-write-08-test04',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi tập yoga vào thứ Bảy.',
        correctSentence: 'My mother does yoga on Saturday.',
        extraWords: ['in'],
      },
      {
        id: 'l1-write-08-test05',
        type: 'multiple-choice',
        question: 'Which is correct?',
        options: ['on the morning', 'in the night', 'on Monday morning', 'in Monday'],
        correctIndex: 2,
        explanation: {
          vi: 'Buổi của một ngày cụ thể dùng on: on Monday morning. (in the morning, at night, on Monday)',
          en: 'A part of a specific day uses on: on Monday morning. (in the morning, at night, on Monday)',
        },
      },
      {
        id: 'l1-write-08-test06',
        type: 'write-answer',
        prompt:
          'Write 4–5 sentences about a festival or holiday you like (for example, Tet). When is it? Where are you? What do you do?',
        tipsVi:
          'Thời gian: in January/February, on the first day, in the evening. Nơi chốn: at my grandparents\' house, in Nam Dinh. Dùng thì hiện tại đơn.',
        minWords: 30,
        sampleAnswer:
          'My favourite holiday is Tet. It is usually in January or February. On the first day, we visit my grandparents in Nam Dinh. We eat banh chung at their house. In the evening, we watch fireworks in the city centre.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Viết email / tin nhắn thân mật cho bạn
  // ==========================================================================
  {
    id: 'l1-write-09',
    skill: 'writing',
    title: { vi: 'Viết email ngắn cho bạn', en: 'Writing a short email to a friend' },
    description: {
      vi: 'Viết email hoặc tin nhắn thân mật có đủ 3 phần: lời chào, nội dung và lời kết.',
      en: 'Write an informal email or message with three parts: greeting, body and closing.',
    },
    teachingCards: [
      {
        title: { vi: 'Cấu trúc một email thân mật', en: 'The structure of an informal email' },
        body: {
          vi: '1. **Lời chào**: Hi Lan, / Hello Tom, / Dear Mai, (có **dấu phẩy** sau tên)\n2. **Câu mở đầu**: How are you? / Thanks for your email.\n3. **Nội dung chính**: lý do viết, tin tức, lời mời... (I\'m writing to tell you...)\n4. **Câu kết**: Write back soon! / See you soon!\n5. **Ký tên**: Love, / Best wishes, / Bye for now, + **tên bạn** ở dòng dưới.',
          en: '1. **Greeting**: Hi Lan, / Hello Tom, / Dear Mai, (with a **comma** after the name)\n2. **Opening line**: How are you? / Thanks for your email.\n3. **Body**: your reason, news, an invitation... (I\'m writing to tell you...)\n4. **Closing line**: Write back soon! / See you soon!\n5. **Sign-off**: Love, / Best wishes, / Bye for now, + **your name** on the next line.',
        },
        examples: [
          { en: 'Hi Lan,\nHow are you? I have great news!', vi: 'Chào Lan,\nBạn khỏe không? Mình có tin vui nè!' },
          { en: 'Write back soon!\nLove,\nHoa', vi: 'Nhớ trả lời mình sớm nhé!\nThương,\nHoa' },
        ],
      },
      {
        title: { vi: 'Văn phong thân mật', en: 'Informal style' },
        body: {
          vi: 'Viết cho bạn bè thì **thân mật, tự nhiên**:\n- Dùng dạng viết tắt: **I\'m, it\'s, can\'t, don\'t**.\n- Có thể dùng dấu chấm than **(!)**.\n- Câu mời / đề nghị: **Would you like to...? / Let\'s... / Can you...?**\nKHÔNG dùng lời trang trọng như "Dear Sir or Madam" hay "Yours faithfully" — đó là cho thư công việc.',
          en: 'When you write to friends, be **friendly and natural**:\n- Use short forms: **I\'m, it\'s, can\'t, don\'t**.\n- You can use exclamation marks **(!)**.\n- Invitations / suggestions: **Would you like to...? / Let\'s... / Can you...?**\nDo NOT use formal phrases like "Dear Sir or Madam" or "Yours faithfully" — they are for formal letters.',
        },
        examples: [
          { en: "Would you like to come to my house on Saturday?", vi: 'Bạn có muốn đến nhà mình vào thứ Bảy không?' },
          { en: "Sorry, I can't come tomorrow.", vi: 'Xin lỗi, mai mình không đến được.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-09-ex01',
        type: 'multiple-choice',
        question: 'Which is a good greeting for an email to a friend?',
        options: ['Dear Sir or Madam,', 'To whom it may concern,', 'Hi Mai,', 'Yours faithfully,'],
        correctIndex: 2,
        explanation: {
          vi: 'Viết cho bạn dùng lời chào thân mật: Hi + tên + dấu phẩy.',
          en: 'For a friend, use an informal greeting: Hi + name + comma.',
        },
      },
      {
        id: 'l1-write-09-ex02',
        type: 'multiple-choice',
        question: 'Which is a good closing line?',
        options: ['Write back soon!', 'Dear Tom,', 'Hi Tom,', 'My name is Tom.'],
        correctIndex: 0,
        explanation: {
          vi: '"Write back soon!" là câu kết thân mật phổ biến.',
          en: '"Write back soon!" is a common friendly closing line.',
        },
      },
      {
        id: 'l1-write-09-ex03',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối mỗi phần của email với ví dụ phù hợp.',
          en: 'Match each part of the email with an example.',
        },
        pairs: [
          { left: 'Greeting', right: 'Hi Nam,' },
          { left: 'Opening line', right: 'How are you?' },
          { left: 'Body', right: "I'm writing to invite you to my party." },
          { left: 'Closing line', right: 'See you soon!' },
          { left: 'Sign-off', right: 'Best wishes,' },
        ],
      },
      {
        id: 'l1-write-09-ex04',
        type: 'arrange-words',
        translationVi: 'Cảm ơn bạn đã gửi email.',
        correctSentence: 'Thanks for your email.',
        extraWords: ['to'],
        explanation: {
          vi: 'Thanks for + danh từ: Thanks for your email.',
          en: 'Thanks for + noun: Thanks for your email.',
        },
      },
      {
        id: 'l1-write-09-ex05',
        type: 'fill-blank',
        sentence: 'Hi Linh, how ___ you? I hope you are well.',
        acceptedAnswers: ['are'],
        explanation: {
          vi: 'Câu hỏi thăm: How are you?',
          en: 'The greeting question: How are you?',
        },
      },
      {
        id: 'l1-write-09-ex06',
        type: 'arrange-words',
        translationVi: 'Bạn có muốn đến nhà mình vào thứ Bảy không?',
        correctSentence: 'Would you like to come to my house on Saturday?',
        extraWords: ['at'],
        explanation: {
          vi: 'Lời mời: Would you like to + động từ...? Thứ dùng on.',
          en: 'Invitation: Would you like to + verb...? Days use on.',
        },
      },
      {
        id: 'l1-write-09-ex07',
        type: 'multiple-choice',
        question:
          'Put the parts in the correct order: (A) Love, Hoa  (B) Hi Linh,  (C) Write back soon!  (D) I have a new puppy.',
        options: ['A – B – C – D', 'B – C – D – A', 'D – B – A – C', 'B – D – C – A'],
        correctIndex: 3,
        explanation: {
          vi: 'Lời chào → nội dung → câu kết → ký tên.',
          en: 'Greeting → body → closing line → sign-off.',
        },
      },
      {
        id: 'l1-write-09-ex08',
        type: 'fill-blank',
        sentence: 'I miss you a lot. See you ___!',
        acceptedAnswers: ['soon'],
        hint: '(sớm)',
        explanation: {
          vi: '"See you soon!" = Hẹn sớm gặp lại.',
          en: '"See you soon!" is a friendly way to close.',
        },
      },
      {
        id: 'l1-write-09-ex09',
        type: 'multiple-choice',
        question: 'Which sentence is TOO FORMAL for an email to a friend?',
        options: [
          "Sorry, I can't come!",
          'I am writing to inform you that I will not attend the event.',
          'Guess what? I have a new bike!',
          "Let's meet at the park.",
        ],
        correctIndex: 1,
        explanation: {
          vi: '"I am writing to inform you..." là văn phong trang trọng, dùng cho thư công việc.',
          en: '"I am writing to inform you..." is formal — it is for work letters.',
        },
      },
      {
        id: 'l1-write-09-ex10',
        type: 'write-answer',
        prompt:
          'Write a short email (40–60 words) to your friend Tom. Invite him to your birthday party. Say when and where it is and what you can do there.',
        tipsVi:
          'Theo 5 phần: Hi Tom, → How are you? → lời mời + thời gian (on Saturday, at 6 p.m.) + địa điểm (at my house) + hoạt động → Write back soon! → Best wishes, + tên bạn.',
        minWords: 40,
        sampleAnswer:
          "Hi Tom,\nHow are you? I'm having a birthday party on Saturday and I want to invite you. It starts at 6 p.m. at my house on Hoa Binh Street. We can eat pizza, play games and sing karaoke. Can you come?\nWrite back soon!\nBest wishes,\nMinh",
        explanation: {
          vi: 'Email tốt có đủ lời chào, nội dung rõ ràng (khi nào, ở đâu, làm gì), câu kết và ký tên.',
          en: 'A good email has a greeting, a clear body (when, where, what), a closing line and a sign-off.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-09-test01',
        type: 'multiple-choice',
        question: 'Which is the best sign-off for an email to a friend?',
        options: ['Yours faithfully,', 'Best wishes,', 'Dear friend,', 'Hello,'],
        correctIndex: 1,
      },
      {
        id: 'l1-write-09-test02',
        type: 'arrange-words',
        translationVi: 'Mình viết thư để kể cho bạn nghe về chuyến đi của mình.',
        correctSentence: "I'm writing to tell you about my trip.",
        extraWords: ['for'],
      },
      {
        id: 'l1-write-09-test03',
        type: 'fill-blank',
        sentence: 'Thanks ___ your message!',
        acceptedAnswers: ['for'],
      },
      {
        id: 'l1-write-09-test04',
        type: 'multiple-choice',
        question: 'Which greeting is written correctly?',
        options: ['Hi ben.', 'hi ben', 'hi Ben,', 'Hi Ben,'],
        correctIndex: 3,
        explanation: {
          vi: 'Viết hoa "Hi" và tên người, có dấu phẩy sau tên.',
          en: 'Capitalise "Hi" and the name, and put a comma after the name.',
        },
      },
      {
        id: 'l1-write-09-test05',
        type: 'arrange-words',
        translationVi: 'Bạn có thể đến bữa tiệc của mình vào Chủ nhật không?',
        correctSentence: 'Can you come to my party on Sunday?',
        extraWords: ['in'],
      },
      {
        id: 'l1-write-09-test06',
        type: 'write-answer',
        prompt:
          "Write a short message (35–50 words) to your friend Lan. You can't meet her tomorrow. Say sorry, give a reason and suggest another day.",
        tipsVi:
          'Hi Lan, → Sorry, I can\'t ... tomorrow because ... → Can we meet on ...? / Let\'s meet on ... → See you soon! → tên bạn.',
        minWords: 35,
        sampleAnswer:
          "Hi Lan,\nI'm really sorry, but I can't go to the cinema with you tomorrow. My grandmother is ill and I need to visit her. Can we meet on Sunday afternoon instead? Let's watch the film at 3 p.m.\nSee you soon!\nHa",
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Đoạn văn về thói quen hằng ngày với từ chỉ trình tự
  // ==========================================================================
  {
    id: 'l1-write-10',
    skill: 'writing',
    title: { vi: 'Viết về một ngày của bạn: First, Then, Finally', en: 'Your daily routine: First, Then, Finally' },
    description: {
      vi: 'Viết đoạn văn ngắn về thói quen hằng ngày, dùng từ chỉ trình tự để nối các hoạt động.',
      en: 'Write a short paragraph about your daily routine, using sequencing words to link the activities.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ chỉ trình tự', en: 'Sequencing words' },
        body: {
          vi: 'Dùng các từ này để kể việc theo **thứ tự thời gian**:\n- **First,** (đầu tiên)\n- **Then** / **Next,** (sau đó, tiếp theo)\n- **After that,** (sau đó)\n- **Finally,** (cuối cùng)\nĐặt chúng **ở đầu câu**. Thường có **dấu phẩy** sau First, Next, After that, Finally. Sau "Then" thường không cần dấu phẩy.',
          en: 'Use these words to tell things **in time order**:\n- **First,**\n- **Then** / **Next,**\n- **After that,**\n- **Finally,**\nPut them **at the start of the sentence**. We usually put a **comma** after First, Next, After that and Finally. "Then" usually has no comma.',
        },
        examples: [
          { en: 'First, I wake up at 6 a.m.', vi: 'Đầu tiên, tôi thức dậy lúc 6 giờ sáng.' },
          { en: 'Then I have breakfast with my family.', vi: 'Sau đó tôi ăn sáng cùng gia đình.' },
          { en: 'Finally, I go to bed at 10 p.m.', vi: 'Cuối cùng, tôi đi ngủ lúc 10 giờ tối.' },
        ],
      },
      {
        title: { vi: 'Trạng từ tần suất', en: 'Adverbs of frequency' },
        body: {
          vi: '**always** (luôn luôn) > **usually** (thường) > **often** (hay) > **sometimes** (thỉnh thoảng) > **never** (không bao giờ).\nVị trí: **trước động từ thường**, nhưng **sau "be"**:\n- I **usually have** breakfast at home.\n- She **is always** late.',
          en: '**always** > **usually** > **often** > **sometimes** > **never**.\nPosition: **before a normal verb**, but **after "be"**:\n- I **usually have** breakfast at home.\n- She **is always** late.',
        },
        examples: [
          { en: 'I often walk to school.', vi: 'Tôi hay đi bộ đến trường.' },
          { en: 'My father is never late for work.', vi: 'Bố tôi không bao giờ đi làm muộn.' },
        ],
      },
      {
        title: { vi: 'Dàn ý đoạn văn', en: 'Paragraph plan' },
        body: {
          vi: '1. **Câu mở đầu**: My weekdays are very busy.\n2. **Các hoạt động** theo thứ tự: First, ... Then ... After that, ... (kèm giờ: at 6:30, in the afternoon)\n3. **Finally, ...** + **câu kết**: I like my routine because ...\nNhớ: dùng **thì hiện tại đơn**, và **he/she thì thêm -s**.',
          en: '1. **Opening sentence**: My weekdays are very busy.\n2. **Activities** in order: First, ... Then ... After that, ... (with times: at 6:30, in the afternoon)\n3. **Finally, ...** + **closing sentence**: I like my routine because ...\nRemember: use the **present simple**, and **add -s for he/she**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-write-10-ex01',
        type: 'multiple-choice',
        question: 'Which word usually comes LAST in a sequence?',
        options: ['First', 'Then', 'After that', 'Finally'],
        correctIndex: 3,
        explanation: {
          vi: '"Finally" = cuối cùng, dùng cho việc cuối.',
          en: '"Finally" introduces the last thing.',
        },
      },
      {
        id: 'l1-write-10-ex02',
        type: 'fill-blank',
        sentence: '___, I wake up at 6 a.m. Then I wash my face.',
        acceptedAnswers: ['First', 'First of all', 'Firstly'],
        hint: '(đầu tiên)',
        explanation: {
          vi: 'Việc đầu tiên dùng First.',
          en: 'The first action uses First.',
        },
      },
      {
        id: 'l1-write-10-ex03',
        type: 'arrange-words',
        translationVi: 'Sau đó, tôi đi học bằng xe đạp.',
        correctSentence: 'After that, I go to school by bike.',
        extraWords: ['on'],
        explanation: {
          vi: '"After that," đứng đầu câu, có dấu phẩy. Phương tiện: by bike.',
          en: '"After that," goes at the start with a comma. Transport: by bike.',
        },
      },
      {
        id: 'l1-write-10-ex04',
        type: 'multiple-choice',
        question: 'Where does "usually" go?',
        options: [
          'I have usually breakfast at seven.',
          'I usually have breakfast at seven.',
          'I have breakfast usually at seven.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Trạng từ tần suất đứng trước động từ thường: usually have.',
          en: 'Frequency adverbs go before a normal verb: usually have.',
        },
      },
      {
        id: 'l1-write-10-ex05',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối hoạt động tiếng Việt với cụm tiếng Anh.',
          en: 'Match the Vietnamese activities with the English phrases.',
        },
        pairs: [
          { left: 'thức dậy', right: 'wake up' },
          { left: 'đánh răng', right: 'brush my teeth' },
          { left: 'ăn sáng', right: 'have breakfast' },
          { left: 'làm bài tập về nhà', right: 'do my homework' },
          { left: 'đi ngủ', right: 'go to bed' },
        ],
      },
      {
        id: 'l1-write-10-ex06',
        type: 'fill-blank',
        sentence: 'I get home at 5 p.m. ___ that, I help my mother cook dinner.',
        acceptedAnswers: ['After'],
        explanation: {
          vi: '"After that" = sau đó.',
          en: '"After that" means next / later.',
        },
      },
      {
        id: 'l1-write-10-ex07',
        type: 'multiple-choice',
        question:
          'Choose the best order: (A) Then I have breakfast.  (B) Finally, I leave home at 7.  (C) First, I get up at 6.',
        options: ['C – A – B', 'A – B – C', 'B – C – A', 'C – B – A'],
        correctIndex: 0,
        explanation: {
          vi: 'First → Then → Finally.',
          en: 'First → Then → Finally.',
        },
      },
      {
        id: 'l1-write-10-ex08',
        type: 'arrange-words',
        translationVi: 'Cuối cùng, tôi đi ngủ lúc mười giờ.',
        correctSentence: "Finally, I go to bed at ten o'clock.",
        extraWords: ['in'],
        explanation: {
          vi: '"Finally," + câu; giờ cụ thể dùng at.',
          en: '"Finally," + sentence; clock times use at.',
        },
      },
      {
        id: 'l1-write-10-ex09',
        type: 'multiple-choice',
        question: 'Which sentence has the correct punctuation?',
        options: ['After that I, watch TV.', 'After, that I watch TV.', 'After that, I watch TV.', 'After that I watch, TV.'],
        correctIndex: 2,
        explanation: {
          vi: 'Dấu phẩy đặt ngay sau cụm "After that".',
          en: 'The comma goes right after "After that".',
        },
      },
      {
        id: 'l1-write-10-ex10',
        type: 'write-answer',
        prompt:
          'Write a paragraph (50–60 words) about your daily routine on a school day or a work day. Use First, Then, After that and Finally.',
        tipsVi:
          'Câu mở đầu → First, ... (giờ thức dậy) → Then ... → After that, ... → Finally, ... (giờ đi ngủ) → câu kết. Dùng at + giờ, in the afternoon/evening và thì hiện tại đơn.',
        minWords: 50,
        sampleAnswer:
          'My school days are always busy. First, I get up at 5:45 and brush my teeth. Then I have breakfast with my parents. After that, I ride my bike to school at 6:30. I study there until 4:30 in the afternoon. In the evening, I do my homework. Finally, I go to bed at 10 p.m.',
        explanation: {
          vi: 'Đoạn văn tốt có câu mở đầu, các hoạt động theo thứ tự với từ chỉ trình tự, và giờ giấc rõ ràng.',
          en: 'A good paragraph has an opening sentence, activities in order with sequencing words, and clear times.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-10-test01',
        type: 'multiple-choice',
        question: 'Which word means "cuối cùng"?',
        options: ['Finally', 'Then', 'First', 'Next'],
        correctIndex: 0,
      },
      {
        id: 'l1-write-10-test02',
        type: 'fill-blank',
        sentence: 'She always ___ her teeth before bed.',
        acceptedAnswers: ['brushes'],
        hint: '(brush)',
        explanation: {
          vi: '"She" → brush thêm -es: brushes.',
          en: '"She" → brush adds -es: brushes.',
        },
      },
      {
        id: 'l1-write-10-test03',
        type: 'arrange-words',
        translationVi: 'Đầu tiên, tôi tắm.',
        correctSentence: 'First, I take a shower.',
        extraWords: ['takes'],
      },
      {
        id: 'l1-write-10-test04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['Then I has lunch at 12.', 'Then I have lunch at 12.', 'Then I having lunch at 12.', 'Then I lunch at 12.'],
        correctIndex: 1,
      },
      {
        id: 'l1-write-10-test05',
        type: 'fill-blank',
        sentence: 'My brother gets up late ___ Sunday.',
        acceptedAnswers: ['on'],
        hint: '(in / on / at)',
      },
      {
        id: 'l1-write-10-test06',
        type: 'write-answer',
        prompt:
          'Write a paragraph (45–60 words) about your Sunday or your day off. What do you do from morning to night? Use First, Then, After that and Finally.',
        tipsVi:
          'Mở đầu: On Sunday, I ... Kể 4–5 hoạt động theo thứ tự với First / Then / After that / Finally. Thêm trạng từ tần suất (usually, sometimes) và câu kết.',
        minWords: 45,
        sampleAnswer:
          'Sunday is my favourite day. First, I get up late, at about 8 o\'clock. Then I have pho with my family. After that, I usually clean my room and help my mother. In the afternoon, I sometimes play badminton with my friends. Finally, I watch a film in the evening. I love Sundays because I can relax.',
      },
    ],
  },
]
