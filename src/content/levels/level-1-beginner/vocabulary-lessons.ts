/**
 * vocabulary-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 1 (band 0 – 2.0, người mới bắt đầu) — NHÁNH TỪ VỰNG (VOCABULARY)
 *
 * File này chứa 5 bài học từ vựng đầu tiên, học theo kiểu Duolingo:
 *   1. l1-vocab-01: Chào hỏi & giới thiệu bản thân
 *   2. l1-vocab-02: Thành viên trong gia đình
 *   3. l1-vocab-03: Số đếm, các ngày trong tuần & giờ giấc cơ bản
 *   4. l1-vocab-04: Hoạt động hằng ngày (động từ chỉ thói quen)
 *   5. l1-vocab-05: Nhà cửa, trường học & đồ vật quen thuộc
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2-3 thẻ lý thuyết ngắn (song ngữ Việt/Anh) đọc trước
 *   - words         : 8 từ vựng (phiên âm IPA giọng Anh-Anh, nghĩa, ví dụ, lưu ý)
 *   - exercises     : 10 bài luyện nhiều dạng (chọn đáp án, nối cặp, điền từ,
 *                     xếp câu, nghe-chọn, nghe-gõ, đọc to)
 *   - miniTest      : 6 câu kiểm tra cuối bài (có tính tim ❤)
 *
 * Lưu ý: KHÔNG dùng dạng 'speak-answer' / 'write-answer' ở level này vì
 * 2 dạng đó cần AI chấm (tốn lượt gọi API).
 * Kiểu dữ liệu được định nghĩa trong src/content/content-types.ts.
 * ----------------------------------------------------------------------------
 */

import type { Lesson } from '../../content-types'

export const level1VocabularyLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — CHÀO HỎI & GIỚI THIỆU
   * Học cách nói "xin chào", hỏi tên, giới thiệu tên mình và chào tạm biệt.
   * Đây là những câu đầu tiên ai học tiếng Anh cũng cần.
   * ======================================================================== */
  {
    id: 'l1-vocab-01',
    skill: 'vocabulary',
    title: { vi: 'Chào hỏi & giới thiệu', en: 'Greetings & introductions' },
    description: {
      vi: 'Học cách chào hỏi, nói tên mình và chào tạm biệt bằng tiếng Anh.',
      en: 'Learn how to say hello, tell people your name and say goodbye.',
    },
    teachingCards: [
      {
        title: { vi: 'Lời chào', en: 'Saying hello' },
        body: {
          vi: '**Hello** = Xin chào (dùng được ở mọi nơi).\n**Hi** = Chào (thân mật, với bạn bè).\nTheo thời gian trong ngày:\n**Good morning** = Chào buổi sáng\n**Good afternoon** = Chào buổi chiều\n**Good evening** = Chào buổi tối',
          en: '**Hello** works everywhere.\n**Hi** is friendly and informal.\nBy time of day:\n**Good morning**, **Good afternoon**, **Good evening**',
        },
        examples: [
          { en: 'Hello! How are you?', vi: 'Xin chào! Bạn khỏe không?' },
          { en: 'Good morning, teacher.', vi: 'Em chào cô/thầy buổi sáng ạ.' },
          { en: 'I am fine, thank you.', vi: 'Tôi khỏe, cảm ơn bạn.' },
        ],
      },
      {
        title: { vi: 'Giới thiệu tên', en: 'Introducing yourself' },
        body: {
          vi: 'Hỏi tên: **What is your name?** (Bạn tên là gì?)\nTrả lời: **My name is ...** hoặc **I am ...** (Tôi tên là ...)\nKhi gặp ai lần đầu, nói: **Nice to meet you.** (Rất vui được gặp bạn.)\nNgười kia đáp: **Nice to meet you, too.**',
          en: 'Ask: **What is your name?**\nAnswer: **My name is ...** or **I am ...**\nWhen you meet someone for the first time: **Nice to meet you.**\nReply: **Nice to meet you, too.**',
        },
        examples: [
          { en: 'What is your name?', vi: 'Bạn tên là gì?' },
          { en: 'My name is Lan.', vi: 'Tôi tên là Lan.' },
          { en: 'Nice to meet you, Tom.', vi: 'Rất vui được gặp bạn, Tom.' },
        ],
      },
      {
        title: { vi: 'Chào tạm biệt', en: 'Saying goodbye' },
        body: {
          vi: '**Goodbye** = Tạm biệt\n**Bye** = Tạm biệt (thân mật)\n**See you later** = Hẹn gặp lại sau\n**Good night** = Chúc ngủ ngon (chỉ dùng khi chia tay buổi tối hoặc đi ngủ, KHÔNG dùng để chào khi gặp).',
          en: '**Goodbye**, **Bye**, **See you later**.\n**Good night** is only for leaving at night or going to bed — not for saying hello.',
        },
        examples: [
          { en: 'Goodbye, Mai. See you later!', vi: 'Tạm biệt Mai. Hẹn gặp lại nhé!' },
          { en: 'Good night, Mum.', vi: 'Chúc mẹ ngủ ngon.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-hello',
        word: 'hello',
        ipa: '/həˈləʊ/',
        partOfSpeech: 'exclamation',
        meaningVi: 'xin chào',
        definitionEn: 'A word you say when you meet someone.',
        examples: [
          { en: 'Hello, my name is Nam.', vi: 'Xin chào, tôi tên là Nam.' },
          { en: 'Say hello to your mum for me.', vi: 'Cho tôi gửi lời chào mẹ bạn nhé.' },
        ],
      },
      {
        id: 'l1-w-goodbye',
        word: 'goodbye',
        ipa: '/ˌɡʊdˈbaɪ/',
        partOfSpeech: 'exclamation',
        meaningVi: 'tạm biệt',
        definitionEn: 'A word you say when you leave someone.',
        examples: [
          { en: 'Goodbye, see you tomorrow.', vi: 'Tạm biệt, hẹn gặp lại ngày mai.' },
          { en: 'She said goodbye to her friends.', vi: 'Cô ấy chào tạm biệt các bạn.' },
        ],
      },
      {
        id: 'l1-w-name',
        word: 'name',
        ipa: '/neɪm/',
        partOfSpeech: 'noun',
        meaningVi: 'tên',
        definitionEn: 'The word people call you.',
        examples: [
          { en: 'What is your name?', vi: 'Bạn tên là gì?' },
          { en: 'My name is Hoa.', vi: 'Tôi tên là Hoa.' },
          { en: 'His name is David.', vi: 'Anh ấy tên là David.' },
        ],
        usageNote: {
          vi: 'Nói "My name is Hoa" hoặc "I am Hoa". Đừng nói "I name is Hoa" hay "I am name Hoa".',
          en: 'Say "My name is Hoa" or "I am Hoa". Not "I name is Hoa".',
        },
      },
      {
        id: 'l1-w-meet',
        word: 'meet',
        ipa: '/miːt/',
        partOfSpeech: 'verb',
        meaningVi: 'gặp (gặp mặt, làm quen)',
        definitionEn: 'To see and talk to someone, often for the first time.',
        examples: [
          { en: 'Nice to meet you.', vi: 'Rất vui được gặp bạn.' },
          { en: 'I meet my friends at school.', vi: 'Tôi gặp bạn bè ở trường.' },
        ],
        usageNote: {
          vi: '"Nice to meet you" chỉ dùng khi gặp ai đó LẦN ĐẦU. Lần sau gặp lại thì nói "Nice to see you".',
          en: 'Use "Nice to meet you" the first time you meet someone. Later, say "Nice to see you".',
        },
      },
      {
        id: 'l1-w-nice',
        word: 'nice',
        ipa: '/naɪs/',
        partOfSpeech: 'adjective',
        meaningVi: 'tốt, dễ chịu, vui',
        definitionEn: 'Good, pleasant or kind.',
        examples: [
          { en: 'Nice to meet you, too.', vi: 'Tôi cũng rất vui được gặp bạn.' },
          { en: 'She is a nice girl.', vi: 'Cô ấy là một cô gái dễ thương.' },
        ],
      },
      {
        id: 'l1-w-thank-you',
        word: 'thank you',
        ipa: '/ˈθæŋk juː/',
        partOfSpeech: 'exclamation',
        meaningVi: 'cảm ơn',
        definitionEn: 'Words you say when someone helps you or gives you something.',
        examples: [
          { en: 'Thank you very much!', vi: 'Cảm ơn bạn rất nhiều!' },
          { en: 'I am fine, thank you.', vi: 'Tôi khỏe, cảm ơn.' },
        ],
        usageNote: {
          vi: 'Âm "th" (/θ/): đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi. Đừng đọc thành "tanh kiu".',
          en: 'For "th" /θ/, put your tongue between your teeth and blow air.',
        },
      },
      {
        id: 'l1-w-morning',
        word: 'morning',
        ipa: '/ˈmɔː.nɪŋ/',
        partOfSpeech: 'noun',
        meaningVi: 'buổi sáng',
        definitionEn: 'The early part of the day, before 12 o’clock.',
        examples: [
          { en: 'Good morning, everyone!', vi: 'Chào buổi sáng mọi người!' },
          { en: 'I drink milk in the morning.', vi: 'Tôi uống sữa vào buổi sáng.' },
        ],
        usageNote: {
          vi: 'Nói "in the morning" (vào buổi sáng), không nói "on the morning" hay "at morning".',
          en: 'Say "in the morning", not "at morning".',
        },
      },
      {
        id: 'l1-w-friend',
        word: 'friend',
        ipa: '/frend/',
        partOfSpeech: 'noun',
        meaningVi: 'bạn, người bạn',
        definitionEn: 'A person you know well and like.',
        examples: [
          { en: 'This is my friend, Linh.', vi: 'Đây là bạn tôi, Linh.' },
          { en: 'I have many friends.', vi: 'Tôi có nhiều bạn.' },
        ],
        usageNote: {
          vi: 'Chữ "friend" đọc là /frend/ — chữ "i" không được đọc.',
          en: 'The "i" in "friend" is silent: /frend/.',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-01-ex01',
        type: 'multiple-choice',
        question: '"Xin chào" in English is...',
        options: ['Goodbye', 'Hello', 'Thank you', 'Good night'],
        correctIndex: 1,
        explanation: {
          vi: '"Hello" = xin chào. "Goodbye" = tạm biệt, "Thank you" = cảm ơn, "Good night" = chúc ngủ ngon.',
          en: '"Hello" is what you say when you meet someone.',
        },
      },
      {
        id: 'l1-vocab-01-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ tiếng Anh với nghĩa tiếng Việt', en: 'Match the English words with their meanings' },
        pairs: [
          { left: 'hello', right: 'xin chào' },
          { left: 'goodbye', right: 'tạm biệt' },
          { left: 'name', right: 'tên' },
          { left: 'friend', right: 'bạn' },
          { left: 'thank you', right: 'cảm ơn' },
        ],
      },
      {
        id: 'l1-vocab-01-ex03',
        type: 'fill-blank',
        sentence: 'My ___ is Lan.',
        acceptedAnswers: ['name'],
        hint: '(tên)',
        explanation: {
          vi: '"My name is Lan." = Tôi tên là Lan.',
          en: '"My name is ..." is how you say your name.',
        },
      },
      {
        id: 'l1-vocab-01-ex04',
        type: 'arrange-words',
        translationVi: 'Rất vui được gặp bạn.',
        correctSentence: 'Nice to meet you.',
        extraWords: ['name', 'my'],
        explanation: {
          vi: 'Câu cố định khi gặp ai lần đầu: "Nice to meet you."',
          en: 'A fixed phrase for meeting someone for the first time.',
        },
      },
      {
        id: 'l1-vocab-01-ex05',
        type: 'listen-choose',
        audioText: 'Good morning!',
        question: 'What do you hear?',
        options: ['Good night!', 'Good morning!', 'Goodbye!', 'Good evening!'],
        correctIndex: 1,
        explanation: {
          vi: 'Bạn nghe thấy "Good morning!" = Chào buổi sáng!',
          en: 'You heard "Good morning!"',
        },
      },
      {
        id: 'l1-vocab-01-ex06',
        type: 'multiple-choice',
        question: 'Someone says "Nice to meet you." You answer:',
        options: ['Goodbye.', 'My name is.', 'Nice to meet you, too.', 'Good night.'],
        correctIndex: 2,
        explanation: {
          vi: 'Khi ai đó nói "Nice to meet you", ta đáp "Nice to meet you, too" (Tôi cũng rất vui được gặp bạn).',
          en: 'The polite reply is "Nice to meet you, too."',
        },
      },
      {
        id: 'l1-vocab-01-ex07',
        type: 'listen-type',
        audioText: 'What is your name?',
        acceptedAnswers: ['What is your name?', "What's your name?"],
        explanation: {
          vi: '"What is your name?" = Bạn tên là gì?',
          en: 'This question asks for someone’s name.',
        },
      },
      {
        id: 'l1-vocab-01-ex08',
        type: 'fill-blank',
        sentence: 'I am fine, thank ___.',
        acceptedAnswers: ['you'],
        explanation: {
          vi: '"Thank you" = cảm ơn bạn. "I am fine, thank you." = Tôi khỏe, cảm ơn.',
          en: '"Thank you" is always two words: thank + you.',
        },
      },
      {
        id: 'l1-vocab-01-ex09',
        type: 'speak-sentence',
        sentence: 'Hello, my name is Minh.',
        translationVi: 'Xin chào, tôi tên là Minh.',
      },
      {
        id: 'l1-vocab-01-ex10',
        type: 'arrange-words',
        translationVi: 'Đây là bạn tôi.',
        correctSentence: 'This is my friend.',
        extraWords: ['name', 'meet'],
        explanation: {
          vi: '"This is ..." = Đây là ... — dùng để giới thiệu người khác.',
          en: 'Use "This is ..." to introduce another person.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-01-test01',
        type: 'multiple-choice',
        question: 'Which word means "tạm biệt"?',
        options: ['Hello', 'Hi', 'Goodbye', 'Nice'],
        correctIndex: 2,
        explanation: { vi: '"Goodbye" = tạm biệt.', en: '"Goodbye" is what you say when you leave.' },
      },
      {
        id: 'l1-vocab-01-test02',
        type: 'fill-blank',
        sentence: 'Nice to ___ you.',
        acceptedAnswers: ['meet'],
        explanation: {
          vi: '"Nice to meet you" = Rất vui được gặp bạn.',
          en: 'The phrase is "Nice to meet you".',
        },
      },
      {
        id: 'l1-vocab-01-test03',
        type: 'listen-choose',
        audioText: 'This is my friend.',
        question: 'What does the speaker say?',
        options: ['This is my name.', 'This is my friend.', 'This is my mother.', 'This is my teacher.'],
        correctIndex: 1,
        explanation: { vi: 'Người nói: "This is my friend." = Đây là bạn tôi.', en: 'The speaker says "This is my friend."' },
      },
      {
        id: 'l1-vocab-01-test04',
        type: 'arrange-words',
        translationVi: 'Tôi tên là Hoa.',
        correctSentence: 'My name is Hoa.',
        extraWords: ['his', 'are'],
        explanation: { vi: 'Cấu trúc: My name is + tên.', en: 'Pattern: My name is + name.' },
      },
      {
        id: 'l1-vocab-01-test05',
        type: 'multiple-choice',
        question: 'It is 8 a.m. You see your teacher. You say:',
        options: ['Good night!', 'Good evening!', 'Good morning!', 'Goodbye!'],
        correctIndex: 2,
        explanation: {
          vi: '8 giờ sáng là buổi sáng → "Good morning!". "Good night" chỉ dùng khi chia tay buổi tối/đi ngủ.',
          en: '8 a.m. is in the morning, so say "Good morning!".',
        },
      },
      {
        id: 'l1-vocab-01-test06',
        type: 'listen-type',
        audioText: 'Thank you very much.',
        acceptedAnswers: ['Thank you very much.'],
        explanation: { vi: '"Thank you very much." = Cảm ơn rất nhiều.', en: 'A polite way to say thanks.' },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 2 — GIA ĐÌNH
   * Từ chỉ thành viên trong gia đình + cách nói "của tôi / của anh ấy..."
   * (my, his, her) để giới thiệu gia đình mình.
   * ======================================================================== */
  {
    id: 'l1-vocab-02',
    skill: 'vocabulary',
    title: { vi: 'Thành viên gia đình', en: 'Family members' },
    description: {
      vi: 'Học tên gọi các thành viên trong gia đình và cách giới thiệu gia đình mình.',
      en: 'Learn the words for family members and how to talk about your family.',
    },
    teachingCards: [
      {
        title: { vi: 'Gia đình của tôi', en: 'My family' },
        body: {
          vi: '**mother** (mẹ) — thân mật: **mum** (Anh) / **mom** (Mỹ)\n**father** (bố) — thân mật: **dad**\n**parents** = bố mẹ\n**brother** = anh trai / em trai\n**sister** = chị gái / em gái\nTiếng Anh không phân biệt anh/em. Muốn rõ thì nói **older brother** (anh trai), **younger sister** (em gái).',
          en: '**mother** (mum/mom), **father** (dad), **parents**, **brother**, **sister**.\nTo be clear about age, say **older brother** or **younger sister**.',
        },
        examples: [
          { en: 'This is my mother.', vi: 'Đây là mẹ tôi.' },
          { en: 'I have one older brother.', vi: 'Tôi có một anh trai.' },
          { en: 'My younger sister is ten.', vi: 'Em gái tôi mười tuổi.' },
        ],
      },
      {
        title: { vi: 'My, his, her', en: 'My, his, her' },
        body: {
          vi: 'Trong tiếng Anh, từ chỉ "của ai" đứng TRƯỚC danh từ (ngược với tiếng Việt):\n**my** mother = mẹ **của tôi**\n**his** father = bố **của anh ấy**\n**her** sister = chị **của cô ấy**\n**your** brother = anh **của bạn**',
          en: 'Possessive words come BEFORE the noun:\n**my** mother, **his** father, **her** sister, **your** brother.',
        },
        examples: [
          { en: 'His sister is a doctor.', vi: 'Chị gái của anh ấy là bác sĩ.' },
          { en: 'Her father is tall.', vi: 'Bố của cô ấy cao.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-mother',
        word: 'mother',
        ipa: '/ˈmʌð.ə/',
        partOfSpeech: 'noun',
        meaningVi: 'mẹ',
        definitionEn: 'A woman who has a child.',
        examples: [
          { en: 'My mother is a teacher.', vi: 'Mẹ tôi là giáo viên.' },
          { en: 'I love my mother.', vi: 'Tôi yêu mẹ tôi.' },
        ],
        usageNote: {
          vi: 'Khi nói chuyện thân mật, người Anh gọi mẹ là "mum", người Mỹ gọi là "mom".',
          en: 'Informal: "mum" (British) or "mom" (American).',
        },
      },
      {
        id: 'l1-w-father',
        word: 'father',
        ipa: '/ˈfɑː.ðə/',
        partOfSpeech: 'noun',
        meaningVi: 'bố, cha',
        definitionEn: 'A man who has a child.',
        examples: [
          { en: 'My father works in a bank.', vi: 'Bố tôi làm việc ở ngân hàng.' },
          { en: 'His father is 45 years old.', vi: 'Bố của anh ấy 45 tuổi.' },
        ],
        usageNote: {
          vi: 'Thân mật gọi là "dad". Âm "th" ở đây là /ð/ (rung cổ họng), không đọc thành "d".',
          en: 'Informal: "dad". The "th" is voiced /ð/.',
        },
      },
      {
        id: 'l1-w-brother',
        word: 'brother',
        ipa: '/ˈbrʌð.ə/',
        partOfSpeech: 'noun',
        meaningVi: 'anh trai, em trai',
        definitionEn: 'A boy or man who has the same parents as you.',
        examples: [
          { en: 'I have two brothers.', vi: 'Tôi có hai anh/em trai.' },
          { en: 'My younger brother is eight.', vi: 'Em trai tôi tám tuổi.' },
        ],
        usageNote: {
          vi: 'Số nhiều thêm "s": one brother → two brothers. Đừng quên "s"!',
          en: 'Plural: brothers.',
        },
      },
      {
        id: 'l1-w-sister',
        word: 'sister',
        ipa: '/ˈsɪs.tə/',
        partOfSpeech: 'noun',
        meaningVi: 'chị gái, em gái',
        definitionEn: 'A girl or woman who has the same parents as you.',
        examples: [
          { en: 'My sister is a student.', vi: 'Chị/em gái tôi là học sinh.' },
          { en: 'Her older sister lives in Hanoi.', vi: 'Chị gái của cô ấy sống ở Hà Nội.' },
        ],
      },
      {
        id: 'l1-w-son',
        word: 'son',
        ipa: '/sʌn/',
        partOfSpeech: 'noun',
        meaningVi: 'con trai',
        definitionEn: 'Your male child.',
        examples: [
          { en: 'They have one son.', vi: 'Họ có một con trai.' },
          { en: 'Her son is five years old.', vi: 'Con trai của cô ấy năm tuổi.' },
        ],
        usageNote: {
          vi: '"son" đọc giống hệt "sun" (mặt trời): /sʌn/.',
          en: '"son" sounds the same as "sun".',
        },
      },
      {
        id: 'l1-w-daughter',
        word: 'daughter',
        ipa: '/ˈdɔː.tə/',
        partOfSpeech: 'noun',
        meaningVi: 'con gái',
        definitionEn: 'Your female child.',
        examples: [
          { en: 'My daughter likes music.', vi: 'Con gái tôi thích âm nhạc.' },
          { en: 'He has two daughters.', vi: 'Anh ấy có hai con gái.' },
        ],
        usageNote: {
          vi: 'Chữ "gh" trong "daughter" không đọc: /ˈdɔː.tə/.',
          en: 'The "gh" is silent.',
        },
      },
      {
        id: 'l1-w-grandparents',
        word: 'grandparents',
        ipa: '/ˈɡræn.peə.rənts/',
        partOfSpeech: 'noun',
        meaningVi: 'ông bà',
        definitionEn: 'The parents of your mother or father.',
        examples: [
          { en: 'My grandparents live in the countryside.', vi: 'Ông bà tôi sống ở quê.' },
          { en: 'I visit my grandparents on Sunday.', vi: 'Tôi thăm ông bà vào Chủ nhật.' },
        ],
        usageNote: {
          vi: 'Ông = grandfather (grandpa), bà = grandmother (grandma).',
          en: 'grandfather (grandpa) + grandmother (grandma) = grandparents.',
        },
      },
      {
        id: 'l1-w-family',
        word: 'family',
        ipa: '/ˈfæm.əl.i/',
        partOfSpeech: 'noun',
        meaningVi: 'gia đình',
        definitionEn: 'A group of people who are related, like parents and children.',
        examples: [
          { en: 'There are four people in my family.', vi: 'Gia đình tôi có bốn người.' },
          { en: 'I love my family.', vi: 'Tôi yêu gia đình mình.' },
        ],
        usageNote: {
          vi: 'Nói "There are four people in my family", không nói "My family have four people".',
          en: 'Say "There are four people in my family".',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-02-ex01',
        type: 'multiple-choice',
        question: '"Mẹ" in English is...',
        options: ['father', 'sister', 'mother', 'daughter'],
        correctIndex: 2,
        explanation: { vi: '"mother" = mẹ; "father" = bố.', en: '"mother" is a woman who has a child.' },
      },
      {
        id: 'l1-vocab-02-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa đúng', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'father', right: 'bố' },
          { left: 'brother', right: 'anh/em trai' },
          { left: 'sister', right: 'chị/em gái' },
          { left: 'son', right: 'con trai' },
          { left: 'daughter', right: 'con gái' },
          { left: 'grandparents', right: 'ông bà' },
        ],
      },
      {
        id: 'l1-vocab-02-ex03',
        type: 'fill-blank',
        sentence: 'My father and my mother are my ___.',
        acceptedAnswers: ['parents'],
        hint: '(bố mẹ)',
        explanation: { vi: 'Bố + mẹ = "parents" (bố mẹ).', en: 'Your father and mother are your parents.' },
      },
      {
        id: 'l1-vocab-02-ex04',
        type: 'arrange-words',
        translationVi: 'Đây là mẹ tôi.',
        correctSentence: 'This is my mother.',
        extraWords: ['his', 'father'],
        explanation: { vi: '"This is my + người" để giới thiệu ai đó.', en: 'Use "This is my ..." to introduce family.' },
      },
      {
        id: 'l1-vocab-02-ex05',
        type: 'listen-choose',
        audioText: 'I have one sister.',
        question: 'How many sisters does the speaker have?',
        options: ['One', 'Two', 'Three', 'None'],
        correctIndex: 0,
        explanation: { vi: 'Người nói: "I have one sister." = Tôi có một chị/em gái.', en: 'The speaker has one sister.' },
      },
      {
        id: 'l1-vocab-02-ex06',
        type: 'multiple-choice',
        question: 'Tom is a boy. He has a sister. Tom is her...',
        options: ['sister', 'brother', 'daughter', 'mother'],
        correctIndex: 1,
        explanation: {
          vi: 'Tom là con trai nên Tom là "brother" (anh/em trai) của cô ấy.',
          en: 'Tom is a boy, so he is her brother.',
        },
      },
      {
        id: 'l1-vocab-02-ex07',
        type: 'fill-blank',
        sentence: 'Anna is a girl. ___ brother is Tom.',
        acceptedAnswers: ['Her'],
        hint: '(của cô ấy)',
        explanation: {
          vi: 'Anna là nữ → dùng "her" (của cô ấy). "His" dùng cho nam.',
          en: 'Anna is a girl, so use "her". Use "his" for a boy.',
        },
      },
      {
        id: 'l1-vocab-02-ex08',
        type: 'listen-type',
        audioText: 'I love my family.',
        acceptedAnswers: ['I love my family.'],
        explanation: { vi: '"I love my family." = Tôi yêu gia đình mình.', en: 'A simple sentence about your family.' },
      },
      {
        id: 'l1-vocab-02-ex09',
        type: 'speak-sentence',
        sentence: 'There are four people in my family.',
        translationVi: 'Gia đình tôi có bốn người.',
      },
      {
        id: 'l1-vocab-02-ex10',
        type: 'arrange-words',
        translationVi: 'Ông bà tôi sống ở quê.',
        correctSentence: 'My grandparents live in the countryside.',
        extraWords: ['lives', 'at'],
        explanation: {
          vi: '"grandparents" là số nhiều nên động từ là "live" (không thêm s).',
          en: '"grandparents" is plural, so we use "live", not "lives".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-02-test01',
        type: 'multiple-choice',
        question: 'Which word means "con gái"?',
        options: ['son', 'daughter', 'sister', 'mother'],
        correctIndex: 1,
        explanation: { vi: '"daughter" = con gái; "son" = con trai.', en: '"daughter" is your female child.' },
      },
      {
        id: 'l1-vocab-02-test02',
        type: 'fill-blank',
        sentence: 'My mother’s mother is my ___.',
        acceptedAnswers: ['grandmother', 'grandma'],
        hint: '(bà)',
        explanation: { vi: 'Mẹ của mẹ là bà: "grandmother".', en: 'Your mother’s mother is your grandmother.' },
      },
      {
        id: 'l1-vocab-02-test03',
        type: 'listen-choose',
        audioText: 'This is my father.',
        question: 'Who is the speaker talking about?',
        options: ['His brother', 'His father', 'His mother', 'His son'],
        correctIndex: 1,
        explanation: { vi: '"This is my father." = Đây là bố tôi.', en: 'The speaker is talking about his father.' },
      },
      {
        id: 'l1-vocab-02-test04',
        type: 'arrange-words',
        translationVi: 'Chị gái của cô ấy là học sinh.',
        correctSentence: 'Her sister is a student.',
        extraWords: ['his', 'an'],
        explanation: { vi: '"Her sister" = chị gái của cô ấy.', en: '"Her" comes before the noun.' },
      },
      {
        id: 'l1-vocab-02-test05',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I have two brother.', 'I have two brothers.', 'I has two brothers.', 'I two brothers have.'],
        correctIndex: 1,
        explanation: {
          vi: 'Chủ ngữ "I" đi với "have"; số nhiều "two" thì danh từ thêm "s": brothers.',
          en: '"I have" + plural noun "brothers".',
        },
      },
      {
        id: 'l1-vocab-02-test06',
        type: 'speak-sentence',
        sentence: 'I have one brother and one sister.',
        translationVi: 'Tôi có một anh/em trai và một chị/em gái.',
      },
    ],
  },

  /* ==========================================================================
   * BÀI 3 — SỐ ĐẾM, NGÀY TRONG TUẦN & GIỜ GIẤC
   * Học số 1-20 và các số tròn chục, 7 ngày trong tuần, cách nói giờ đơn giản
   * (o'clock) và các từ "today / tomorrow".
   * ======================================================================== */
  {
    id: 'l1-vocab-03',
    skill: 'vocabulary',
    title: { vi: 'Số đếm, ngày & giờ', en: 'Numbers, days & time' },
    description: {
      vi: 'Học đếm số, gọi tên các ngày trong tuần và nói giờ đơn giản.',
      en: 'Learn to count, name the days of the week and tell the time simply.',
    },
    teachingCards: [
      {
        title: { vi: 'Số đếm', en: 'Numbers' },
        body: {
          vi: '1 one, 2 two, 3 three, 4 four, 5 five, 6 six, 7 seven, 8 eight, 9 nine, 10 ten\n11 eleven, 12 twelve, 13 thirteen, 14 fourteen, 15 fifteen ... 20 twenty\nSố tròn chục: 30 thirty, 40 forty, 50 fifty, 100 one hundred\n**Chú ý**: thirteen (13) nhấn âm cuối: thir-**TEEN**; thirty (30) nhấn âm đầu: **THIR**-ty.',
          en: 'one, two, three ... ten, eleven, twelve, thirteen ... twenty.\nthirty, forty, fifty, one hundred.\n**Careful**: thir**TEEN** (13) vs **THIR**ty (30).',
        },
        examples: [
          { en: 'I am fifteen years old.', vi: 'Tôi mười lăm tuổi.' },
          { en: 'There are thirty students in my class.', vi: 'Lớp tôi có ba mươi học sinh.' },
        ],
      },
      {
        title: { vi: 'Các ngày trong tuần', en: 'Days of the week' },
        body: {
          vi: '**Monday** (Thứ Hai), **Tuesday** (Thứ Ba), **Wednesday** (Thứ Tư), **Thursday** (Thứ Năm), **Friday** (Thứ Sáu), **Saturday** (Thứ Bảy), **Sunday** (Chủ nhật).\nLuôn **viết hoa** chữ cái đầu.\nDùng **on** trước ngày: **on Monday** (vào thứ Hai).\n**today** = hôm nay, **tomorrow** = ngày mai, **yesterday** = hôm qua.',
          en: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.\nAlways use a **capital letter**. Use **on**: **on Monday**.\n**today**, **tomorrow**, **yesterday**.',
        },
        examples: [
          { en: 'Today is Monday.', vi: 'Hôm nay là thứ Hai.' },
          { en: 'I play football on Sunday.', vi: 'Tôi chơi bóng đá vào Chủ nhật.' },
        ],
      },
      {
        title: { vi: 'Nói giờ', en: 'Telling the time' },
        body: {
          vi: 'Hỏi giờ: **What time is it?** (Mấy giờ rồi?)\nGiờ chẵn: **It is seven o’clock.** (Bây giờ là 7 giờ.)\nDùng **at** trước giờ: **at 7 o’clock** (lúc 7 giờ).\n**a.m.** = buổi sáng (trước 12 giờ trưa), **p.m.** = buổi chiều/tối.',
          en: 'Ask: **What time is it?**\nAnswer: **It is seven o’clock.**\nUse **at** with times: **at 7 o’clock**.\n**a.m.** = before noon, **p.m.** = after noon.',
        },
        examples: [
          { en: 'It is nine o’clock.', vi: 'Bây giờ là chín giờ.' },
          { en: 'School starts at seven a.m.', vi: 'Trường bắt đầu học lúc bảy giờ sáng.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-number',
        word: 'number',
        ipa: '/ˈnʌm.bə/',
        partOfSpeech: 'noun',
        meaningVi: 'số, con số',
        definitionEn: 'A word or sign like 1, 2 or 3 that you use to count.',
        examples: [
          { en: 'What is your phone number?', vi: 'Số điện thoại của bạn là gì?' },
          { en: 'Seven is my lucky number.', vi: 'Bảy là con số may mắn của tôi.' },
        ],
      },
      {
        id: 'l1-w-today',
        word: 'today',
        ipa: '/təˈdeɪ/',
        partOfSpeech: 'adverb',
        meaningVi: 'hôm nay',
        definitionEn: 'This day.',
        examples: [
          { en: 'Today is Friday.', vi: 'Hôm nay là thứ Sáu.' },
          { en: 'I am very busy today.', vi: 'Hôm nay tôi rất bận.' },
        ],
        usageNote: {
          vi: 'Không dùng "on" trước "today": nói "I study today", không nói "on today".',
          en: 'No "on" before "today".',
        },
      },
      {
        id: 'l1-w-tomorrow',
        word: 'tomorrow',
        ipa: '/təˈmɒr.əʊ/',
        partOfSpeech: 'adverb',
        meaningVi: 'ngày mai',
        definitionEn: 'The day after today.',
        examples: [
          { en: 'See you tomorrow!', vi: 'Hẹn gặp lại ngày mai!' },
          { en: 'Tomorrow is Saturday.', vi: 'Ngày mai là thứ Bảy.' },
        ],
        usageNote: {
          vi: 'Chính tả: một chữ "m", hai chữ "r" — to-m-o-rr-ow.',
          en: 'Spelling: one "m", two "r"s.',
        },
      },
      {
        id: 'l1-w-monday',
        word: 'Monday',
        ipa: '/ˈmʌn.deɪ/',
        partOfSpeech: 'noun',
        meaningVi: 'thứ Hai',
        definitionEn: 'The day after Sunday and before Tuesday.',
        examples: [
          { en: 'I go to school on Monday.', vi: 'Tôi đi học vào thứ Hai.' },
          { en: 'Monday is the first day of the school week.', vi: 'Thứ Hai là ngày đầu tiên của tuần học.' },
        ],
        usageNote: {
          vi: 'Luôn viết hoa: Monday (không viết "monday"). Đi với "on": on Monday.',
          en: 'Always capital M. Use "on Monday".',
        },
      },
      {
        id: 'l1-w-sunday',
        word: 'Sunday',
        ipa: '/ˈsʌn.deɪ/',
        partOfSpeech: 'noun',
        meaningVi: 'Chủ nhật',
        definitionEn: 'The day after Saturday and before Monday.',
        examples: [
          { en: 'We do not go to school on Sunday.', vi: 'Chúng tôi không đi học vào Chủ nhật.' },
          { en: 'My family has lunch together on Sunday.', vi: 'Gia đình tôi ăn trưa cùng nhau vào Chủ nhật.' },
        ],
      },
      {
        id: 'l1-w-week',
        word: 'week',
        ipa: '/wiːk/',
        partOfSpeech: 'noun',
        meaningVi: 'tuần, tuần lễ',
        definitionEn: 'A period of seven days.',
        examples: [
          { en: 'There are seven days in a week.', vi: 'Một tuần có bảy ngày.' },
          { en: 'I study English three times a week.', vi: 'Tôi học tiếng Anh ba lần một tuần.' },
        ],
        usageNote: {
          vi: '"week" (/wiːk/, tuần) khác "weak" (yếu) về nghĩa nhưng đọc giống nhau.',
          en: '"week" and "weak" sound the same but mean different things.',
        },
      },
      {
        id: 'l1-w-hour',
        word: 'hour',
        ipa: '/ˈaʊ.ə/',
        partOfSpeech: 'noun',
        meaningVi: 'giờ, tiếng đồng hồ',
        definitionEn: 'A period of 60 minutes.',
        examples: [
          { en: 'I sleep eight hours a night.', vi: 'Tôi ngủ tám tiếng mỗi đêm.' },
          { en: 'The class is one hour long.', vi: 'Buổi học dài một tiếng.' },
        ],
        usageNote: {
          vi: 'Chữ "h" không đọc: /ˈaʊ.ə/. Vì vậy nói "an hour" (không phải "a hour").',
          en: 'The "h" is silent, so we say "an hour".',
        },
      },
      {
        id: 'l1-w-oclock',
        word: 'o’clock',
        ipa: '/əˈklɒk/',
        partOfSpeech: 'adverb',
        meaningVi: 'giờ (đúng, chẵn)',
        definitionEn: 'Used after a number to say an exact hour, like "six o’clock".',
        examples: [
          { en: 'It is six o’clock.', vi: 'Bây giờ là sáu giờ.' },
          { en: 'I get up at seven o’clock.', vi: 'Tôi thức dậy lúc bảy giờ.' },
        ],
        usageNote: {
          vi: 'Chỉ dùng "o’clock" với giờ chẵn: "seven o’clock" đúng; "seven thirty o’clock" là SAI.',
          en: 'Use "o’clock" only for exact hours.',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-03-ex01',
        type: 'multiple-choice',
        question: 'Which number is "fifteen"?',
        options: ['5', '50', '15', '13'],
        correctIndex: 2,
        explanation: { vi: '"fifteen" = 15; "fifty" = 50; "thirteen" = 13.', en: 'fifteen = 15.' },
      },
      {
        id: 'l1-vocab-03-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối ngày tiếng Anh với tiếng Việt', en: 'Match the days with their Vietnamese names' },
        pairs: [
          { left: 'Monday', right: 'Thứ Hai' },
          { left: 'Wednesday', right: 'Thứ Tư' },
          { left: 'Friday', right: 'Thứ Sáu' },
          { left: 'Saturday', right: 'Thứ Bảy' },
          { left: 'Sunday', right: 'Chủ nhật' },
        ],
      },
      {
        id: 'l1-vocab-03-ex03',
        type: 'listen-choose',
        audioText: 'I am thirteen years old.',
        question: 'How old is the speaker?',
        options: ['3', '13', '30', '33'],
        correctIndex: 1,
        explanation: {
          vi: '"thirTEEN" (nhấn cuối) = 13. "THIRty" (nhấn đầu) = 30.',
          en: '"thirTEEN" = 13, "THIRty" = 30.',
        },
      },
      {
        id: 'l1-vocab-03-ex04',
        type: 'fill-blank',
        sentence: 'Today is Monday. Tomorrow is ___.',
        acceptedAnswers: ['Tuesday'],
        hint: '(thứ Ba)',
        explanation: { vi: 'Sau thứ Hai là thứ Ba: "Tuesday".', en: 'The day after Monday is Tuesday.' },
      },
      {
        id: 'l1-vocab-03-ex05',
        type: 'arrange-words',
        translationVi: 'Bây giờ là bảy giờ.',
        correctSentence: 'It is seven o’clock.',
        extraWords: ['at', 'on'],
        explanation: { vi: 'Nói giờ: "It is + số + o’clock".', en: 'Pattern: It is + number + o’clock.' },
      },
      {
        id: 'l1-vocab-03-ex06',
        type: 'multiple-choice',
        question: 'I play football ___ Sunday.',
        options: ['in', 'at', 'on', 'to'],
        correctIndex: 2,
        explanation: {
          vi: 'Dùng "on" trước ngày trong tuần: on Sunday. Dùng "at" trước giờ: at 7 o’clock.',
          en: 'Use "on" with days and "at" with times.',
        },
      },
      {
        id: 'l1-vocab-03-ex07',
        type: 'listen-type',
        audioText: 'See you tomorrow.',
        acceptedAnswers: ['See you tomorrow.'],
        explanation: { vi: '"See you tomorrow." = Hẹn gặp lại ngày mai.', en: 'A way to say goodbye until the next day.' },
      },
      {
        id: 'l1-vocab-03-ex08',
        type: 'fill-blank',
        sentence: 'There are seven days in a ___.',
        acceptedAnswers: ['week'],
        hint: '(tuần)',
        explanation: { vi: 'Một tuần có bảy ngày.', en: 'A week has seven days.' },
      },
      {
        id: 'l1-vocab-03-ex09',
        type: 'speak-sentence',
        sentence: 'What time is it?',
        translationVi: 'Mấy giờ rồi?',
      },
      {
        id: 'l1-vocab-03-ex10',
        type: 'multiple-choice',
        question: 'Choose the correct phrase.',
        options: ['a hour', 'an hour', 'one hours', 'a hours'],
        correctIndex: 1,
        explanation: {
          vi: 'Chữ "h" trong "hour" không đọc, từ bắt đầu bằng nguyên âm nên dùng "an": an hour.',
          en: 'The "h" is silent, so we use "an": an hour.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-03-test01',
        type: 'multiple-choice',
        question: 'What is 20 in English?',
        options: ['twelve', 'twenty', 'two', 'twenty-two'],
        correctIndex: 1,
        explanation: { vi: '20 = twenty; 12 = twelve.', en: '20 = twenty.' },
      },
      {
        id: 'l1-vocab-03-test02',
        type: 'listen-choose',
        audioText: 'Today is Thursday.',
        question: 'What day is it today?',
        options: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
        correctIndex: 1,
        explanation: { vi: '"Thursday" = thứ Năm. Đừng nhầm với "Tuesday" (thứ Ba).', en: 'The speaker says Thursday.' },
      },
      {
        id: 'l1-vocab-03-test03',
        type: 'fill-blank',
        sentence: 'I get up ___ six o’clock.',
        acceptedAnswers: ['at'],
        explanation: { vi: 'Dùng "at" trước giờ: at six o’clock.', en: 'Use "at" with clock times.' },
      },
      {
        id: 'l1-vocab-03-test04',
        type: 'arrange-words',
        translationVi: 'Hôm nay là thứ Sáu.',
        correctSentence: 'Today is Friday.',
        extraWords: ['on', 'tomorrow'],
        explanation: { vi: '"Today is + ngày".', en: 'Pattern: Today is + day.' },
      },
      {
        id: 'l1-vocab-03-test05',
        type: 'listen-type',
        audioText: 'It is nine o’clock.',
        acceptedAnswers: ['It is nine o’clock.', "It is nine o'clock.", "It's nine o'clock.", 'It is 9 o’clock.', "It is 9 o'clock."],
        explanation: { vi: '"It is nine o’clock." = Bây giờ là chín giờ.', en: 'This tells the time: 9:00.' },
      },
      {
        id: 'l1-vocab-03-test06',
        type: 'multiple-choice',
        question: 'Which day comes after Saturday?',
        options: ['Friday', 'Monday', 'Sunday', 'Wednesday'],
        correctIndex: 2,
        explanation: { vi: 'Sau thứ Bảy là Chủ nhật (Sunday).', en: 'Sunday comes after Saturday.' },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 4 — HOẠT ĐỘNG HẰNG NGÀY
   * Các động từ chỉ việc làm mỗi ngày: get up, eat, drink, go, work, study,
   * watch, sleep. Lưu ý quy tắc thêm -s/-es khi chủ ngữ là he/she/it.
   * ======================================================================== */
  {
    id: 'l1-vocab-04',
    skill: 'vocabulary',
    title: { vi: 'Hoạt động hằng ngày', en: 'Daily activities' },
    description: {
      vi: 'Học các động từ chỉ việc bạn làm mỗi ngày, từ lúc thức dậy đến khi đi ngủ.',
      en: 'Learn verbs for the things you do every day, from getting up to going to bed.',
    },
    teachingCards: [
      {
        title: { vi: 'Một ngày của tôi', en: 'My day' },
        body: {
          vi: '**get up** = thức dậy, ra khỏi giường\n**eat breakfast** = ăn sáng\n**go to school / go to work** = đi học / đi làm\n**study** = học\n**watch TV** = xem TV\n**go to bed** = đi ngủ\nĐể nói việc làm hằng ngày, ta dùng thì hiện tại đơn: **I get up at six.**',
          en: '**get up**, **eat breakfast**, **go to school / go to work**, **study**, **watch TV**, **go to bed**.\nFor daily routines we use the present simple: **I get up at six.**',
        },
        examples: [
          { en: 'I get up at six o’clock.', vi: 'Tôi thức dậy lúc sáu giờ.' },
          { en: 'I go to school by bike.', vi: 'Tôi đi học bằng xe đạp.' },
          { en: 'I go to bed at ten.', vi: 'Tôi đi ngủ lúc mười giờ.' },
        ],
      },
      {
        title: { vi: 'He / She thêm -s', en: 'He / She + -s' },
        body: {
          vi: 'Khi chủ ngữ là **he / she / it** (hoặc 1 người), động từ thêm **-s** hoặc **-es**:\nI eat → she **eats**\nI work → he **works**\nI go → she **goes**\nI watch → he **watches**\nI study → she **studies** (y → ies)\nĐây là lỗi người Việt hay quên nhất!',
          en: 'With **he / she / it**, add **-s** or **-es**:\neat → eats, work → works, go → goes, watch → watches, study → studies.',
        },
        examples: [
          { en: 'She goes to work at eight.', vi: 'Cô ấy đi làm lúc tám giờ.' },
          { en: 'My brother watches TV every evening.', vi: 'Anh trai tôi xem TV mỗi tối.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-get-up',
        word: 'get up',
        ipa: '/ɡet ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'thức dậy, ra khỏi giường',
        definitionEn: 'To get out of bed in the morning.',
        examples: [
          { en: 'I get up at six every day.', vi: 'Ngày nào tôi cũng dậy lúc sáu giờ.' },
          { en: 'She gets up early.', vi: 'Cô ấy dậy sớm.' },
        ],
        usageNote: {
          vi: '"wake up" = tỉnh giấc (mở mắt); "get up" = ra khỏi giường. Hai từ hay đi cùng nhau.',
          en: '"wake up" = open your eyes; "get up" = leave your bed.',
        },
      },
      {
        id: 'l1-w-eat',
        word: 'eat',
        ipa: '/iːt/',
        partOfSpeech: 'verb',
        meaningVi: 'ăn',
        definitionEn: 'To put food in your mouth and swallow it.',
        examples: [
          { en: 'I eat breakfast at home.', vi: 'Tôi ăn sáng ở nhà.' },
          { en: 'He eats rice for lunch.', vi: 'Anh ấy ăn cơm vào bữa trưa.' },
        ],
        usageNote: {
          vi: 'Nói "have breakfast" hoặc "eat breakfast" đều đúng; "have breakfast" phổ biến hơn.',
          en: '"have breakfast" is more common than "eat breakfast".',
        },
      },
      {
        id: 'l1-w-drink',
        word: 'drink',
        ipa: '/drɪŋk/',
        partOfSpeech: 'verb',
        meaningVi: 'uống',
        definitionEn: 'To take water, milk, tea, etc. into your mouth and swallow it.',
        examples: [
          { en: 'I drink water every day.', vi: 'Tôi uống nước mỗi ngày.' },
          { en: 'My father drinks coffee in the morning.', vi: 'Bố tôi uống cà phê vào buổi sáng.' },
        ],
        usageNote: {
          vi: 'Người Việt hay nói "eat water" — SAI. Chất lỏng thì luôn dùng "drink".',
          en: 'Use "drink" for liquids, not "eat".',
        },
      },
      {
        id: 'l1-w-go',
        word: 'go',
        ipa: '/ɡəʊ/',
        partOfSpeech: 'verb',
        meaningVi: 'đi',
        definitionEn: 'To move from one place to another.',
        examples: [
          { en: 'I go to school at seven.', vi: 'Tôi đi học lúc bảy giờ.' },
          { en: 'She goes to bed at ten.', vi: 'Cô ấy đi ngủ lúc mười giờ.' },
        ],
        usageNote: {
          vi: 'Nói "go home" (về nhà) — KHÔNG có "to": không nói "go to home".',
          en: 'Say "go home", not "go to home".',
        },
      },
      {
        id: 'l1-w-work',
        word: 'work',
        ipa: '/wɜːk/',
        partOfSpeech: 'verb',
        meaningVi: 'làm việc',
        definitionEn: 'To do a job, usually to get money.',
        examples: [
          { en: 'My mother works in a hospital.', vi: 'Mẹ tôi làm việc ở bệnh viện.' },
          { en: 'I work from Monday to Friday.', vi: 'Tôi làm việc từ thứ Hai đến thứ Sáu.' },
        ],
      },
      {
        id: 'l1-w-study',
        word: 'study',
        ipa: '/ˈstʌd.i/',
        partOfSpeech: 'verb',
        meaningVi: 'học, học tập',
        definitionEn: 'To spend time learning something.',
        examples: [
          { en: 'I study English every evening.', vi: 'Tôi học tiếng Anh mỗi tối.' },
          { en: 'She studies at a big school.', vi: 'Cô ấy học ở một ngôi trường lớn.' },
        ],
        usageNote: {
          vi: 'Với he/she: study → studies (đổi y thành ies).',
          en: 'he/she studies (y → ies).',
        },
      },
      {
        id: 'l1-w-watch',
        word: 'watch',
        ipa: '/wɒtʃ/',
        partOfSpeech: 'verb',
        meaningVi: 'xem (TV, phim...)',
        definitionEn: 'To look at something for some time, like TV or a film.',
        examples: [
          { en: 'We watch TV after dinner.', vi: 'Chúng tôi xem TV sau bữa tối.' },
          { en: 'He watches football on Sunday.', vi: 'Anh ấy xem bóng đá vào Chủ nhật.' },
        ],
        usageNote: {
          vi: '"watch TV" (xem TV), không nói "see TV". "watch" cũng là danh từ: đồng hồ đeo tay.',
          en: 'Say "watch TV", not "see TV". "a watch" is also a clock on your wrist.',
        },
      },
      {
        id: 'l1-w-sleep',
        word: 'sleep',
        ipa: '/sliːp/',
        partOfSpeech: 'verb',
        meaningVi: 'ngủ',
        definitionEn: 'To rest with your eyes closed, usually at night.',
        examples: [
          { en: 'I sleep eight hours every night.', vi: 'Tôi ngủ tám tiếng mỗi đêm.' },
          { en: 'The baby is sleeping.', vi: 'Em bé đang ngủ.' },
        ],
        usageNote: {
          vi: '"go to bed" = lên giường đi ngủ (hành động); "sleep" = ngủ (trạng thái).',
          en: '"go to bed" is the action; "sleep" is the state.',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-04-ex01',
        type: 'multiple-choice',
        question: '"Uống" in English is...',
        options: ['eat', 'drink', 'sleep', 'watch'],
        correctIndex: 1,
        explanation: { vi: '"drink" = uống; "eat" = ăn.', en: '"drink" is for water, milk, tea...' },
      },
      {
        id: 'l1-vocab-04-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với nghĩa', en: 'Match the verbs with their meanings' },
        pairs: [
          { left: 'get up', right: 'thức dậy' },
          { left: 'eat', right: 'ăn' },
          { left: 'work', right: 'làm việc' },
          { left: 'study', right: 'học' },
          { left: 'sleep', right: 'ngủ' },
        ],
      },
      {
        id: 'l1-vocab-04-ex03',
        type: 'fill-blank',
        sentence: 'I ___ TV in the evening.',
        acceptedAnswers: ['watch'],
        hint: '(xem)',
        explanation: { vi: '"watch TV" = xem TV.', en: 'We say "watch TV".' },
      },
      {
        id: 'l1-vocab-04-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi thức dậy lúc sáu giờ.',
        correctSentence: 'I get up at six.',
        extraWords: ['on', 'gets'],
        explanation: { vi: 'Chủ ngữ "I" → "get up" (không thêm s). Giờ đi với "at".', en: 'I + get up; use "at" with times.' },
      },
      {
        id: 'l1-vocab-04-ex05',
        type: 'listen-choose',
        audioText: 'She drinks milk every morning.',
        question: 'What does she drink?',
        options: ['Water', 'Coffee', 'Milk', 'Tea'],
        correctIndex: 2,
        explanation: { vi: '"She drinks milk every morning." = Cô ấy uống sữa mỗi sáng.', en: 'She drinks milk.' },
      },
      {
        id: 'l1-vocab-04-ex06',
        type: 'multiple-choice',
        question: 'My father ___ in a bank.',
        options: ['work', 'works', 'working', 'to work'],
        correctIndex: 1,
        explanation: {
          vi: '"My father" = he → động từ thêm -s: works.',
          en: '"My father" = he, so add -s: works.',
        },
      },
      {
        id: 'l1-vocab-04-ex07',
        type: 'fill-blank',
        sentence: 'She ___ to school at seven.',
        acceptedAnswers: ['goes'],
        hint: '(go)',
        explanation: { vi: 'She + go → goes (thêm -es).', en: 'With "she", go becomes goes.' },
      },
      {
        id: 'l1-vocab-04-ex08',
        type: 'listen-type',
        audioText: 'I study English every day.',
        acceptedAnswers: ['I study English every day.'],
        explanation: { vi: '"I study English every day." = Tôi học tiếng Anh mỗi ngày.', en: 'A sentence about your routine.' },
      },
      {
        id: 'l1-vocab-04-ex09',
        type: 'speak-sentence',
        sentence: 'I go to bed at ten o’clock.',
        translationVi: 'Tôi đi ngủ lúc mười giờ.',
      },
      {
        id: 'l1-vocab-04-ex10',
        type: 'arrange-words',
        translationVi: 'Anh trai tôi xem bóng đá vào Chủ nhật.',
        correctSentence: 'My brother watches football on Sunday.',
        extraWords: ['watch', 'at'],
        explanation: {
          vi: '"My brother" = he → watches. Ngày trong tuần đi với "on".',
          en: '"My brother" = he → watches; use "on" with days.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-04-test01',
        type: 'multiple-choice',
        question: 'Which word means "ngủ"?',
        options: ['study', 'sleep', 'go', 'eat'],
        correctIndex: 1,
        explanation: { vi: '"sleep" = ngủ.', en: '"sleep" means to rest with your eyes closed.' },
      },
      {
        id: 'l1-vocab-04-test02',
        type: 'fill-blank',
        sentence: 'He ___ English every evening.',
        acceptedAnswers: ['studies'],
        hint: '(study)',
        explanation: { vi: 'He + study → studies (y → ies).', en: 'With "he", study becomes studies.' },
      },
      {
        id: 'l1-vocab-04-test03',
        type: 'listen-choose',
        audioText: 'I get up at six and go to work at seven.',
        question: 'When does the speaker go to work?',
        options: ['At six', 'At seven', 'At eight', 'At ten'],
        correctIndex: 1,
        explanation: {
          vi: 'Người nói dậy lúc 6 giờ và đi làm lúc 7 giờ.',
          en: 'The speaker gets up at six and goes to work at seven.',
        },
      },
      {
        id: 'l1-vocab-04-test04',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi làm việc ở bệnh viện.',
        correctSentence: 'My mother works in a hospital.',
        extraWords: ['work', 'on'],
        explanation: { vi: '"My mother" = she → works.', en: '"My mother" = she → works.' },
      },
      {
        id: 'l1-vocab-04-test05',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I eat water.', 'I drink water.', 'I drinks water.', 'I watch water.'],
        correctIndex: 1,
        explanation: {
          vi: 'Nước là chất lỏng → "drink". Chủ ngữ "I" → không thêm s.',
          en: 'Use "drink" for liquids; "I" takes no -s.',
        },
      },
      {
        id: 'l1-vocab-04-test06',
        type: 'speak-sentence',
        sentence: 'She gets up at six every morning.',
        translationVi: 'Cô ấy thức dậy lúc sáu giờ mỗi sáng.',
      },
    ],
  },

  /* ==========================================================================
   * BÀI 5 — NHÀ CỬA, TRƯỜNG HỌC & ĐỒ VẬT
   * Danh từ chỉ nơi chốn và đồ vật quen thuộc + cách dùng "a / an" và
   * "This is / That is" để chỉ đồ vật.
   * ======================================================================== */
  {
    id: 'l1-vocab-05',
    skill: 'vocabulary',
    title: { vi: 'Nhà, trường & đồ vật', en: 'House, school & objects' },
    description: {
      vi: 'Học tên các đồ vật quen thuộc ở nhà và ở trường, cách dùng a/an và this/that.',
      en: 'Learn the names of common things at home and at school, and how to use a/an and this/that.',
    },
    teachingCards: [
      {
        title: { vi: 'A hay An?', en: 'A or an?' },
        body: {
          vi: 'Dùng **a / an** trước danh từ số ít (1 cái):\n**a** + từ bắt đầu bằng phụ âm: **a** book, **a** pen, **a** chair\n**an** + từ bắt đầu bằng nguyên âm (a, e, i, o, u): **an** apple, **an** eraser, **an** umbrella\nNgười Việt hay quên **a/an**: nói "I have pen" là SAI → "I have **a** pen".',
          en: 'Use **a / an** before one thing:\n**a** + consonant sound: a book, a pen\n**an** + vowel sound: an apple, an eraser\nDon’t forget it: "I have **a** pen", not "I have pen".',
        },
        examples: [
          { en: 'I have a book and an eraser.', vi: 'Tôi có một quyển sách và một cục tẩy.' },
          { en: 'This is a chair.', vi: 'Đây là một cái ghế.' },
        ],
      },
      {
        title: { vi: 'This và That', en: 'This and that' },
        body: {
          vi: '**This** = cái này (ở gần) — **This is my bag.**\n**That** = cái kia (ở xa) — **That is my school.**\nHỏi đồ vật: **What is this?** (Đây là cái gì?) → **It is a pen.** (Nó là cái bút.)',
          en: '**This** = near you. **That** = far from you.\nAsk: **What is this?** → **It is a pen.**',
        },
        examples: [
          { en: 'What is this? It is a phone.', vi: 'Đây là cái gì? Nó là cái điện thoại.' },
          { en: 'That is my house.', vi: 'Kia là nhà tôi.' },
        ],
      },
      {
        title: { vi: 'Ở đâu? In và On', en: 'Where? In and on' },
        body: {
          vi: '**in** = ở trong: The book is **in** the bag. (Quyển sách ở trong cặp.)\n**on** = ở trên (chạm bề mặt): The phone is **on** the table. (Điện thoại ở trên bàn.)\nHỏi vị trí: **Where is ...?** (... ở đâu?)',
          en: '**in** = inside; **on** = on top of.\nAsk: **Where is ...?**',
        },
        examples: [
          { en: 'Where is my pen? It is on the table.', vi: 'Bút của tôi đâu? Nó ở trên bàn.' },
          { en: 'My mother is in the kitchen.', vi: 'Mẹ tôi đang ở trong bếp.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-house',
        word: 'house',
        ipa: '/haʊs/',
        partOfSpeech: 'noun',
        meaningVi: 'ngôi nhà',
        definitionEn: 'A building where people live.',
        examples: [
          { en: 'My house is small but nice.', vi: 'Nhà tôi nhỏ nhưng đẹp.' },
          { en: 'There are three rooms in my house.', vi: 'Nhà tôi có ba phòng.' },
        ],
        usageNote: {
          vi: '"house" = ngôi nhà (tòa nhà); "home" = nhà, tổ ấm (nơi mình sống). "I am at home." = Tôi đang ở nhà.',
          en: '"house" is the building; "home" is the place where you live.',
        },
      },
      {
        id: 'l1-w-room',
        word: 'room',
        ipa: '/ruːm/',
        partOfSpeech: 'noun',
        meaningVi: 'căn phòng',
        definitionEn: 'A part of a building with walls, a floor and a door.',
        examples: [
          { en: 'This is my room.', vi: 'Đây là phòng của tôi.' },
          { en: 'The living room is big.', vi: 'Phòng khách rộng.' },
        ],
        usageNote: {
          vi: 'Một số phòng: bedroom (phòng ngủ), living room (phòng khách), kitchen (bếp), bathroom (phòng tắm).',
          en: 'bedroom, living room, kitchen, bathroom.',
        },
      },
      {
        id: 'l1-w-table',
        word: 'table',
        ipa: '/ˈteɪ.bəl/',
        partOfSpeech: 'noun',
        meaningVi: 'cái bàn',
        definitionEn: 'A piece of furniture with legs and a flat top.',
        examples: [
          { en: 'The phone is on the table.', vi: 'Điện thoại ở trên bàn.' },
          { en: 'We eat dinner at the table.', vi: 'Chúng tôi ăn tối ở bàn.' },
        ],
        usageNote: {
          vi: 'Bàn học/bàn làm việc thường gọi là "desk".',
          en: 'A table for studying or working is often called a "desk".',
        },
      },
      {
        id: 'l1-w-chair',
        word: 'chair',
        ipa: '/tʃeə/',
        partOfSpeech: 'noun',
        meaningVi: 'cái ghế',
        definitionEn: 'A seat for one person, with a back.',
        examples: [
          { en: 'Please sit on the chair.', vi: 'Mời bạn ngồi lên ghế.' },
          { en: 'There are four chairs in the kitchen.', vi: 'Trong bếp có bốn cái ghế.' },
        ],
      },
      {
        id: 'l1-w-school',
        word: 'school',
        ipa: '/skuːl/',
        partOfSpeech: 'noun',
        meaningVi: 'trường học',
        definitionEn: 'A place where children go to learn.',
        examples: [
          { en: 'I go to school by bus.', vi: 'Tôi đi học bằng xe buýt.' },
          { en: 'My school is near my house.', vi: 'Trường tôi ở gần nhà tôi.' },
        ],
        usageNote: {
          vi: 'Nói "go to school" (đi học) — không cần "the". Chữ "ch" đọc là /k/: /skuːl/.',
          en: 'Say "go to school" (no "the"). "ch" sounds like /k/.',
        },
      },
      {
        id: 'l1-w-book',
        word: 'book',
        ipa: '/bʊk/',
        partOfSpeech: 'noun',
        meaningVi: 'quyển sách',
        definitionEn: 'A set of pages with words that you read.',
        examples: [
          { en: 'I have a new book.', vi: 'Tôi có một quyển sách mới.' },
          { en: 'Open your books, please.', vi: 'Các em mở sách ra nào.' },
        ],
      },
      {
        id: 'l1-w-pen',
        word: 'pen',
        ipa: '/pen/',
        partOfSpeech: 'noun',
        meaningVi: 'cái bút (bút mực/bút bi)',
        definitionEn: 'A thing you use to write with ink.',
        examples: [
          { en: 'Can I borrow your pen?', vi: 'Tôi mượn bút của bạn được không?' },
          { en: 'My pen is in my bag.', vi: 'Bút của tôi ở trong cặp.' },
        ],
        usageNote: {
          vi: 'Bút chì là "pencil" /ˈpen.səl/.',
          en: 'A pen uses ink; a pencil does not.',
        },
      },
      {
        id: 'l1-w-phone',
        word: 'phone',
        ipa: '/fəʊn/',
        partOfSpeech: 'noun',
        meaningVi: 'điện thoại',
        definitionEn: 'A thing you use to call and talk to people.',
        examples: [
          { en: 'Where is my phone?', vi: 'Điện thoại của tôi đâu rồi?' },
          { en: 'She has a new phone.', vi: 'Cô ấy có một chiếc điện thoại mới.' },
        ],
        usageNote: {
          vi: '"ph" đọc là /f/: phone /fəʊn/. Điện thoại di động: "mobile phone" (Anh) hoặc "cell phone" (Mỹ).',
          en: '"ph" sounds like /f/. Also: mobile phone (UK), cell phone (US).',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-05-ex01',
        type: 'multiple-choice',
        question: '"Cái ghế" in English is...',
        options: ['table', 'chair', 'room', 'door'],
        correctIndex: 1,
        explanation: { vi: '"chair" = cái ghế; "table" = cái bàn.', en: 'A chair is a seat for one person.' },
      },
      {
        id: 'l1-vocab-05-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'house', right: 'ngôi nhà' },
          { left: 'room', right: 'căn phòng' },
          { left: 'school', right: 'trường học' },
          { left: 'book', right: 'quyển sách' },
          { left: 'pen', right: 'cái bút' },
          { left: 'phone', right: 'điện thoại' },
        ],
      },
      {
        id: 'l1-vocab-05-ex03',
        type: 'multiple-choice',
        question: 'I have ___ eraser.',
        options: ['a', 'an', 'two', 'the two'],
        correctIndex: 1,
        explanation: {
          vi: '"eraser" bắt đầu bằng nguyên âm "e" → dùng "an".',
          en: '"eraser" starts with a vowel sound, so use "an".',
        },
      },
      {
        id: 'l1-vocab-05-ex04',
        type: 'fill-blank',
        sentence: 'The phone is ___ the table.',
        acceptedAnswers: ['on'],
        hint: '(ở trên)',
        explanation: { vi: '"on the table" = ở trên bàn.', en: '"on" = on top of.' },
      },
      {
        id: 'l1-vocab-05-ex05',
        type: 'arrange-words',
        translationVi: 'Đây là phòng của tôi.',
        correctSentence: 'This is my room.',
        extraWords: ['that', 'an'],
        explanation: { vi: '"This is my ..." = Đây là ... của tôi.', en: 'Use "This is" for something near you.' },
      },
      {
        id: 'l1-vocab-05-ex06',
        type: 'listen-choose',
        audioText: 'My book is in my bag.',
        question: 'Where is the book?',
        options: ['On the table', 'In the bag', 'On the chair', 'In the room'],
        correctIndex: 1,
        explanation: { vi: '"in my bag" = ở trong cặp của tôi.', en: 'The book is in the bag.' },
      },
      {
        id: 'l1-vocab-05-ex07',
        type: 'fill-blank',
        sentence: 'What is this? It is a ___. I write with it.',
        acceptedAnswers: ['pen', 'pencil'],
        hint: '(cái bút)',
        explanation: { vi: 'Thứ dùng để viết: "pen" (bút) hoặc "pencil" (bút chì).', en: 'You write with a pen or a pencil.' },
      },
      {
        id: 'l1-vocab-05-ex08',
        type: 'listen-type',
        audioText: 'Where is my phone?',
        acceptedAnswers: ['Where is my phone?', "Where's my phone?"],
        explanation: { vi: '"Where is my phone?" = Điện thoại của tôi đâu?', en: 'Use "Where is ...?" to ask about place.' },
      },
      {
        id: 'l1-vocab-05-ex09',
        type: 'speak-sentence',
        sentence: 'My school is near my house.',
        translationVi: 'Trường tôi ở gần nhà tôi.',
      },
      {
        id: 'l1-vocab-05-ex10',
        type: 'arrange-words',
        translationVi: 'Tôi đi học bằng xe buýt.',
        correctSentence: 'I go to school by bus.',
        extraWords: ['the', 'goes'],
        explanation: {
          vi: '"go to school" không cần "the"; "by bus" = bằng xe buýt.',
          en: 'Say "go to school" (no "the") and "by bus".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-05-test01',
        type: 'multiple-choice',
        question: 'Which word means "quyển sách"?',
        options: ['book', 'bag', 'pen', 'phone'],
        correctIndex: 0,
        explanation: { vi: '"book" = quyển sách; "bag" = cái cặp/túi.', en: 'You read a book.' },
      },
      {
        id: 'l1-vocab-05-test02',
        type: 'fill-blank',
        sentence: 'I have ___ apple.',
        acceptedAnswers: ['an'],
        explanation: { vi: '"apple" bắt đầu bằng nguyên âm "a" → "an apple".', en: '"apple" starts with a vowel sound → "an".' },
      },
      {
        id: 'l1-vocab-05-test03',
        type: 'listen-choose',
        audioText: 'There are four chairs in the kitchen.',
        question: 'How many chairs are there?',
        options: ['Two', 'Three', 'Four', 'Five'],
        correctIndex: 2,
        explanation: { vi: '"four chairs" = bốn cái ghế.', en: 'There are four chairs.' },
      },
      {
        id: 'l1-vocab-05-test04',
        type: 'arrange-words',
        translationVi: 'Kia là nhà tôi.',
        correctSentence: 'That is my house.',
        extraWords: ['this', 'in'],
        explanation: { vi: '"That" = kia (ở xa).', en: '"That" is for something far away.' },
      },
      {
        id: 'l1-vocab-05-test05',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I have pen.', 'I have a pen.', 'I have an pen.', 'I has a pen.'],
        correctIndex: 1,
        explanation: {
          vi: 'Danh từ số ít cần "a/an"; "pen" bắt đầu bằng phụ âm → "a pen".',
          en: 'A single noun needs "a/an": "a pen".',
        },
      },
      {
        id: 'l1-vocab-05-test06',
        type: 'listen-type',
        audioText: 'The book is on the table.',
        acceptedAnswers: ['The book is on the table.'],
        explanation: { vi: '"The book is on the table." = Quyển sách ở trên bàn.', en: 'The book is on top of the table.' },
      },
    ],
  },
]
