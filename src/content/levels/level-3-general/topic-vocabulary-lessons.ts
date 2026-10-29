/**
 * topic-vocabulary-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * BÀI TỪ VỰNG THEO CHỦ ĐỀ IELTS CÒN THIẾU (mode 'practice')
 * ----------------------------------------------------------------------------
 * Khoá học đã có từ vựng về công việc, du lịch, tin tức, phim ảnh, đời sống.
 * File này bổ sung 6 chủ đề hay gặp trong IELTS Speaking Part 3 / Writing Task 2
 * mà lộ trình còn thiếu (xem docs/redesign-v3/11-CONTENT-GAPS.md):
 *
 *   l3-g-u3-crime        Tội phạm & pháp luật (trộm cắp, phá hoại, phạt tiền, lao động công ích)
 *   l3-g-u4-culture      Văn hoá & nghệ thuật (di sản, triển lãm, đồ thủ công, bảo tồn)
 *   l3-g-u5-tech         Công nghệ trong đời sống (thiết bị, thời gian dùng màn hình, AI, quyền riêng tư)
 *   l3-g-u6-environment  Môi trường, khí hậu & năng lượng (ô nhiễm, năng lượng tái tạo, rác thải)
 *   l3-g-u6-science      Khoa học & nghiên cứu (thí nghiệm, bằng chứng, đột phá, kết luận)
 *   l3-g-u6-global       Vấn đề toàn cầu (dân số, già hoá, nghèo đói, thất nghiệp, bất bình đẳng)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ (cụm từ đi kèm, 1 điểm cấu tạo từ / ngữ pháp, cách dùng trong IELTS)
 *   - words         : 8 từ/cụm từ (IPA Anh-Anh, nghĩa, 2 câu ví dụ, ghi chú lỗi hay gặp)
 *   - exercises     : 12 bài (chọn → ghép → điền → nghe → nói), 2 bài đọc to + 1 bài nói tự do
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *   - track 'general' (bài thuộc track tổng quát)
 *
 * Quy ước id: bài "l3-g-u<chặng>-<chủ đề>", bài tập "...-ex<số>", từ "l3-g-w2-<từ>"
 * (tiền tố w2 để không trùng với từ của vocabulary-lessons.ts).
 * Nội dung tự soạn 100%, không chép sách.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level3GeneralTopicVocabularyLessons: Lesson[] = [
  /* ==========================================================================
   * 1. TỘI PHẠM & PHÁP LUẬT
   * Từ: theft, vandalism, offender, commit, fine, community service, deter, law-abiding
   * ======================================================================== */
  {
    id: 'l3-g-u3-crime',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Tội phạm và pháp luật', en: 'Crime and the law' },
    description: {
      vi: 'Từ vựng về trộm cắp, phá hoại, hình phạt và cách bàn về giảm tội phạm trong IELTS.',
      en: 'Words for theft, vandalism and punishment, and how to discuss reducing crime in IELTS.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ đi với "crime"', en: 'Chunks with "crime"' },
        body: {
          vi: '**commit a crime** = phạm tội (KHÔNG nói "do a crime")\n**reduce / prevent crime** = giảm / ngăn chặn tội phạm\n**the crime rate** = tỉ lệ tội phạm\n**get a fine** = bị phạt tiền\n**be sentenced to** community service = bị tuyên phạt lao động công ích',
          en: '**commit a crime** (NOT "do a crime")\n**reduce / prevent crime**\n**the crime rate**\n**get a fine** = have to pay money as a punishment\n**be sentenced to** community service',
        },
        examples: [
          { en: 'Most young people who commit a crime only do it once.', vi: 'Phần lớn người trẻ phạm tội chỉ làm một lần.' },
          { en: 'The crime rate in our district has fallen.', vi: 'Tỉ lệ tội phạm ở quận chúng tôi đã giảm.' },
        ],
      },
      {
        title: { vi: 'Họ từ: tội và người phạm tội', en: 'Word families: the crime and the person' },
        body: {
          vi: 'Học theo cặp **việc làm → người làm**:\n**theft** (vụ trộm) → **thief** (kẻ trộm)\n**vandalism** (phá hoại của công) → **vandal**\n**offence** (hành vi phạm luật) → **offender** (người phạm luật)\n**crime** → **criminal**\nĐộng từ "trộm": **steal** something (from somebody).',
          en: 'Learn them in pairs, **the act → the person**:\n**theft** → **thief**\n**vandalism** → **vandal**\n**offence** → **offender**\n**crime** → **criminal**\nThe verb is **steal** something (from somebody).',
        },
        examples: [
          { en: 'A thief stole my bike from outside the market.', vi: 'Một tên trộm đã lấy cắp xe đạp của tôi ở ngoài chợ.' },
          { en: 'Young offenders often need help, not just punishment.', vi: 'Người phạm luật trẻ tuổi thường cần được giúp đỡ, không chỉ trừng phạt.' },
        ],
      },
      {
        title: { vi: 'Dùng trong IELTS: nêu giải pháp', en: 'In IELTS: suggesting solutions' },
        body: {
          vi: 'Câu hỏi Part 3 / Task 2 hay hỏi "Làm sao giảm tội phạm?". Hãy nêu **giải pháp + kết quả**:\n"**Heavier fines** could **deter** people **from** damaging public property."\n"**Community service** gives offenders a chance to **pay back** society."\nNhớ: **deter somebody from + V-ing**.',
          en: 'Part 3 / Task 2 often asks "How can we reduce crime?". Give a **solution + result**:\n"**Heavier fines** could **deter** people **from** damaging public property."\n"**Community service** gives offenders a chance to **pay back** society."\nRemember: **deter somebody from + -ing**.',
        },
        examples: [
          { en: 'Cameras on the street may deter people from stealing.', vi: 'Camera trên đường có thể khiến người ta không dám trộm cắp.' },
          { en: 'Community service can teach young offenders responsibility.', vi: 'Lao động công ích có thể dạy người phạm luật trẻ tuổi tinh thần trách nhiệm.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-theft',
        word: 'theft',
        ipa: '/θeft/',
        partOfSpeech: 'noun',
        meaningVi: 'vụ trộm, hành vi trộm cắp',
        definitionEn: 'The crime of taking something that belongs to someone else.',
        examples: [
          { en: 'Phone theft is common in crowded places.', vi: 'Trộm điện thoại hay xảy ra ở nơi đông người.' },
          { en: 'She reported the theft of her wallet to the police.', vi: 'Cô ấy báo với công an về vụ mất trộm ví.' },
        ],
        usageNote: {
          vi: 'Âm đầu là /θ/ (đặt lưỡi giữa hai răng), âm cuối /ft/ phải rõ. Người làm: **thief**.',
          en: 'Start with /θ/ (tongue between teeth) and say the final /ft/. The person is a **thief**.',
        },
      },
      {
        id: 'l3-g-w2-vandalism',
        word: 'vandalism',
        ipa: '/ˈvæn.dəl.ɪ.zəm/',
        partOfSpeech: 'noun',
        meaningVi: 'hành vi phá hoại tài sản (thường là của công)',
        definitionEn: 'The crime of deliberately damaging things, especially public property.',
        examples: [
          { en: 'Writing on the walls of the park is vandalism.', vi: 'Viết bậy lên tường công viên là hành vi phá hoại.' },
          { en: 'The new bus stop was closed because of vandalism.', vi: 'Trạm xe buýt mới bị đóng cửa vì bị phá hoại.' },
        ],
      },
      {
        id: 'l3-g-w2-offender',
        word: 'offender',
        ipa: '/əˈfen.dər/',
        partOfSpeech: 'noun',
        meaningVi: 'người phạm luật, người phạm tội',
        definitionEn: 'A person who has broken the law.',
        examples: [
          { en: 'First-time offenders usually get a lighter punishment.', vi: 'Người phạm tội lần đầu thường bị phạt nhẹ hơn.' },
          { en: 'The programme helps young offenders find jobs.', vi: 'Chương trình giúp người phạm luật trẻ tuổi tìm việc làm.' },
        ],
        usageNote: {
          vi: 'Nhấn âm thứ hai: of-**FEN**-der. Cụm hay gặp: **young offenders**, **first-time offenders**.',
          en: 'Stress the second syllable: of-**FEN**-der. Common: **young offenders**, **first-time offenders**.',
        },
      },
      {
        id: 'l3-g-w2-commit',
        word: 'commit',
        ipa: '/kəˈmɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'phạm (tội), gây ra (lỗi nghiêm trọng)',
        definitionEn: 'To do something illegal or wrong.',
        examples: [
          { en: 'Poverty can push some people to commit crimes.', vi: 'Nghèo đói có thể đẩy một số người đến chỗ phạm tội.' },
          { en: 'He committed the offence when he was only sixteen.', vi: 'Cậu ấy phạm tội khi mới 16 tuổi.' },
        ],
        usageNote: {
          vi: 'Nói **commit a crime**, không nói "do a crime" hay "make a crime". Quá khứ: **committed** (gấp đôi t).',
          en: 'Say **commit a crime**, not "do/make a crime". Past form: **committed** (double t).',
        },
      },
      {
        id: 'l3-g-w2-fine',
        word: 'fine',
        ipa: '/faɪn/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'tiền phạt; phạt tiền',
        definitionEn: 'Money that you must pay because you broke a rule or law; to make someone pay this.',
        examples: [
          { en: 'He got a fine for parking on the pavement.', vi: 'Anh ấy bị phạt tiền vì đỗ xe trên vỉa hè.' },
          { en: 'Drivers are fined if they run a red light.', vi: 'Tài xế bị phạt tiền nếu vượt đèn đỏ.' },
        ],
        usageNote: {
          vi: 'Cùng chữ với "fine" (khoẻ, tốt) nhưng nghĩa khác. Cụm: **get / pay a fine**, **a heavy fine**.',
          en: 'Same spelling as "fine" (OK, good) but a different meaning. Chunks: **get / pay a fine**, **a heavy fine**.',
        },
      },
      {
        id: 'l3-g-w2-community-service',
        word: 'community service',
        ipa: '/kəˈmjuː.nə.ti ˈsɜː.vɪs/',
        partOfSpeech: 'noun',
        meaningVi: 'lao động công ích (hình phạt làm việc không lương cho cộng đồng)',
        definitionEn: 'Unpaid work that helps the local area, given as a punishment instead of prison.',
        examples: [
          { en: 'The teenagers were given fifty hours of community service.', vi: 'Các thiếu niên bị phạt 50 giờ lao động công ích.' },
          { en: 'Cleaning the beach was part of his community service.', vi: 'Dọn bãi biển là một phần công việc công ích của cậu ấy.' },
        ],
      },
      {
        id: 'l3-g-w2-deter',
        word: 'deter',
        ipa: '/dɪˈtɜːr/',
        partOfSpeech: 'verb',
        meaningVi: 'ngăn cản, làm (ai) chùn bước không dám làm',
        definitionEn: 'To make someone decide not to do something, usually because of the result.',
        examples: [
          { en: 'Bright street lights can deter thieves.', vi: 'Đèn đường sáng có thể khiến kẻ trộm chùn tay.' },
          { en: 'High fines deter people from dropping litter.', vi: 'Mức phạt cao khiến người ta không dám xả rác.' },
        ],
        usageNote: {
          vi: 'Cấu trúc: **deter somebody from + V-ing**. Nhấn âm sau: de-**TER**.',
          en: 'Pattern: **deter somebody from + -ing**. Stress the second syllable: de-**TER**.',
        },
      },
      {
        id: 'l3-g-w2-law-abiding',
        word: 'law-abiding',
        ipa: '/ˈlɔː.əˌbaɪ.dɪŋ/',
        partOfSpeech: 'adjective',
        meaningVi: 'tuân thủ pháp luật, sống đúng luật',
        definitionEn: 'Always obeying the law.',
        examples: [
          { en: 'Most people in my neighbourhood are law-abiding citizens.', vi: 'Hầu hết người dân khu tôi là công dân tuân thủ pháp luật.' },
          { en: 'Parents should teach children to be law-abiding.', vi: 'Cha mẹ nên dạy con biết sống đúng luật.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u3-crime-ex01',
        type: 'multiple-choice',
        question: 'Someone writes on the walls of a new school. What is this crime?',
        options: ['theft', 'vandalism', 'a fine', 'community service'],
        correctIndex: 1,
        explanation: {
          vi: 'Cố ý làm hỏng tài sản (của công) là vandalism.',
          en: 'Deliberately damaging (public) property is vandalism.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối hành vi với người thực hiện.', en: 'Match the act with the person.' },
        pairs: [
          { left: 'theft', right: 'thief' },
          { left: 'vandalism', right: 'vandal' },
          { left: 'offence', right: 'offender' },
          { left: 'crime', right: 'criminal' },
        ],
        explanation: {
          vi: 'Học theo cặp việc làm → người làm để dùng từ linh hoạt hơn.',
          en: 'Learning act → person pairs makes your vocabulary more flexible.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex03',
        type: 'fill-blank',
        sentence: 'Very few teenagers ___ serious crimes.',
        acceptedAnswers: ['commit'],
        hint: '(c…)',
        explanation: {
          vi: 'Cụm cố định: commit a crime (phạm tội).',
          en: 'Fixed chunk: commit a crime.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex04',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'High fines deter people to drop litter.',
          'High fines deter people from dropping litter.',
          'High fines deter people dropping litter.',
          'High fines deter from people dropping litter.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Cấu trúc đúng: deter somebody from + V-ing.',
          en: 'The pattern is deter somebody from + -ing.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex05',
        type: 'fill-blank',
        sentence: 'He had to pay a ___ because he parked in the wrong place.',
        acceptedAnswers: ['fine'],
        explanation: {
          vi: 'Tiền phạt vì vi phạm quy định là a fine.',
          en: 'Money you pay for breaking a rule is a fine.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex06',
        type: 'arrange-words',
        translationVi: 'Lao động công ích có thể dạy người phạm luật trẻ tuổi tinh thần trách nhiệm.',
        correctSentence: 'Community service can teach young offenders responsibility.',
        extraWords: ['offences'],
        explanation: {
          vi: 'Người phạm luật là offenders; offences là hành vi phạm luật.',
          en: 'The people are offenders; offences are the acts.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex07',
        type: 'true-false',
        statement: 'A "law-abiding" person often breaks the law.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Law-abiding nghĩa là luôn tuân thủ pháp luật.',
          en: 'Law-abiding means always obeying the law.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex08',
        type: 'listen-choose',
        audioText: 'Instead of sending him to prison, the court gave him one hundred hours of community service.',
        question: 'What punishment did he get?',
        options: ['Prison', 'A large fine', 'Unpaid work for the community', 'No punishment'],
        correctIndex: 2,
        explanation: {
          vi: 'Community service = làm việc không lương cho cộng đồng, thay vì đi tù.',
          en: 'Community service = unpaid work for the community instead of prison.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex09',
        type: 'speak-sentence',
        sentence: 'Phone theft is common in crowded places.',
        translationVi: 'Trộm điện thoại hay xảy ra ở nơi đông người.',
        explanation: {
          vi: 'Chú ý /θ/ trong theft, âm cuối /ft/ và /d/ trong crowded.',
          en: 'Watch /θ/ in theft and the endings /ft/ and /d/ in crowded.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex10',
        type: 'multiple-choice',
        question: 'Which word completes the sentence? "Young ___ often need support to change their behaviour."',
        options: ['offences', 'offenders', 'offend', 'offensive'],
        correctIndex: 1,
        explanation: {
          vi: 'Cần danh từ chỉ người, số nhiều: offenders.',
          en: 'We need a plural noun for people: offenders.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex11',
        type: 'speak-sentence',
        sentence: 'Bright street lights can deter thieves.',
        translationVi: 'Đèn đường sáng có thể khiến kẻ trộm chùn tay.',
        explanation: {
          vi: 'Nhấn de-TER; đọc rõ -s cuối trong lights và thieves.',
          en: 'Stress de-TER; say the final -s in lights and thieves.',
        },
      },
      {
        id: 'l3-g-u3-crime-ex12',
        type: 'speak-answer',
        question: 'Do you think heavy fines are the best way to reduce crime?',
        tipsVi:
          'Nêu ý kiến → lý do → ví dụ. Dùng: fine, deter … from, offender, community service. Có thể so sánh 2 giải pháp: "Fines may work for…, but for young offenders…".',
        sampleAnswer:
          "I think fines work well for small offences, like parking in the wrong place, because losing money can deter people from doing it again. However, for young offenders, I'm not sure fines are the best answer. Community service might be more effective, because it teaches them responsibility and lets them pay back society.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt có ý kiến rõ, lý do và một giải pháp thay thế.',
          en: 'A strong answer has a clear opinion, a reason and an alternative.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * 2. VĂN HOÁ & NGHỆ THUẬT
   * Từ: heritage, exhibition, performance, handicraft, preserve, audience, funding, appreciate
   * ======================================================================== */
  {
    id: 'l3-g-u4-culture',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Văn hoá và nghệ thuật', en: 'Culture and the arts' },
    description: {
      vi: 'Từ vựng về di sản, triển lãm, biểu diễn, đồ thủ công và cách bàn về bảo tồn văn hoá.',
      en: 'Words for heritage, exhibitions, performances and crafts, and how to discuss protecting culture.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về văn hoá', en: 'Culture chunks' },
        body: {
          vi: '**cultural heritage** = di sản văn hoá\n**hold / visit an exhibition** = tổ chức / đi xem triển lãm\n**a live performance** = buổi biểu diễn trực tiếp\n**traditional handicrafts** = đồ thủ công truyền thống\n**preserve traditions** = gìn giữ truyền thống\n**government funding for the arts** = kinh phí nhà nước cho nghệ thuật',
          en: '**cultural heritage**\n**hold / visit an exhibition**\n**a live performance**\n**traditional handicrafts**\n**preserve traditions**\n**government funding for the arts**',
        },
        examples: [
          { en: 'The museum is holding an exhibition of old maps.', vi: 'Bảo tàng đang tổ chức triển lãm bản đồ cổ.' },
          { en: 'Water puppetry is part of our cultural heritage.', vi: 'Múa rối nước là một phần di sản văn hoá của chúng ta.' },
        ],
      },
      {
        title: { vi: 'Họ từ: culture, art, tradition', en: 'Word families: culture, art, tradition' },
        body: {
          vi: 'Đổi danh từ → tính từ để câu linh hoạt hơn:\n**culture** → **cultural** (cultural events)\n**art** → **artistic** (artistic talent); người làm: **artist**\n**tradition** → **traditional** (traditional music)\n**perform** → **performance**, **performer**\nSai hay gặp: "a culture festival" → nên nói "a **cultural** festival".',
          en: 'Change nouns into adjectives for flexible sentences:\n**culture** → **cultural** (cultural events)\n**art** → **artistic** (artistic talent); the person: **artist**\n**tradition** → **traditional** (traditional music)\n**perform** → **performance**, **performer**\nCommon error: "a culture festival" → "a **cultural** festival".',
        },
        examples: [
          { en: 'My town has many cultural events in spring.', vi: 'Thị trấn tôi có nhiều sự kiện văn hoá vào mùa xuân.' },
          { en: 'She showed artistic talent from a young age.', vi: 'Cô ấy bộc lộ năng khiếu nghệ thuật từ nhỏ.' },
        ],
      },
      {
        title: { vi: 'Dùng trong IELTS: vì sao văn hoá quan trọng', en: 'In IELTS: why culture matters' },
        body: {
          vi: 'Câu hỏi hay gặp: "Nhà nước có nên chi tiền cho nghệ thuật không?" Hãy nêu **lợi ích cụ thể**:\n"Funding helps **preserve** skills that might **die out**."\n"Festivals help young people **appreciate** their **heritage**."\n"**Appreciate**" ở đây = trân trọng, hiểu được giá trị.',
          en: 'A common question: "Should governments spend money on the arts?" Give **specific benefits**:\n"Funding helps **preserve** skills that might **die out**."\n"Festivals help young people **appreciate** their **heritage**."\n"**Appreciate**" here = understand the value of something.',
        },
        examples: [
          { en: 'Without funding, some traditional crafts could die out.', vi: 'Không có kinh phí, một số nghề thủ công truyền thống có thể bị mai một.' },
          { en: 'School trips help children appreciate local history.', vi: 'Các chuyến đi của trường giúp trẻ trân trọng lịch sử địa phương.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-heritage',
        word: 'heritage',
        ipa: '/ˈher.ɪ.tɪdʒ/',
        partOfSpeech: 'noun',
        meaningVi: 'di sản (văn hoá, lịch sử được truyền lại)',
        definitionEn: 'The traditions, buildings and culture that a country has had for a long time.',
        examples: [
          { en: 'Hoi An is famous for its cultural heritage.', vi: 'Hội An nổi tiếng với di sản văn hoá.' },
          { en: 'We should protect our heritage for future generations.', vi: 'Chúng ta nên bảo vệ di sản cho các thế hệ sau.' },
        ],
        usageNote: {
          vi: 'Nhấn âm đầu: **HER**-i-tage. Âm cuối /dʒ/, không đọc "tây".',
          en: 'Stress the first syllable: **HER**-i-tage. It ends in /dʒ/.',
        },
      },
      {
        id: 'l3-g-w2-exhibition',
        word: 'exhibition',
        ipa: '/ˌek.sɪˈbɪʃ.ən/',
        partOfSpeech: 'noun',
        meaningVi: 'cuộc triển lãm',
        definitionEn: 'A public show of paintings, photos or other objects.',
        examples: [
          { en: 'There is a free photo exhibition at the city library.', vi: 'Có một triển lãm ảnh miễn phí ở thư viện thành phố.' },
          { en: 'The gallery holds a new exhibition every month.', vi: 'Phòng tranh tổ chức triển lãm mới mỗi tháng.' },
        ],
        usageNote: {
          vi: 'Chữ "h" câm: ex-i-**BI**-tion. Cụm: **hold / visit / go to an exhibition**.',
          en: 'The "h" is silent: ex-i-**BI**-tion. Chunks: **hold / visit / go to an exhibition**.',
        },
      },
      {
        id: 'l3-g-w2-performance',
        word: 'performance',
        ipa: '/pəˈfɔː.məns/',
        partOfSpeech: 'noun',
        meaningVi: 'buổi biểu diễn, màn trình diễn',
        definitionEn: 'An occasion when someone sings, dances, acts or plays music for an audience.',
        examples: [
          { en: 'We watched a live performance of traditional music.', vi: 'Chúng tôi xem một buổi biểu diễn nhạc truyền thống trực tiếp.' },
          { en: 'The children gave a short performance at the festival.', vi: 'Các em nhỏ có một tiết mục ngắn tại lễ hội.' },
        ],
      },
      {
        id: 'l3-g-w2-handicraft',
        word: 'handicraft',
        ipa: '/ˈhæn.di.krɑːft/',
        partOfSpeech: 'noun',
        meaningVi: 'đồ thủ công, nghề thủ công',
        definitionEn: 'An object made skilfully by hand, or the skill of making such objects.',
        examples: [
          { en: 'My grandmother sells bamboo handicrafts at the market.', vi: 'Bà tôi bán đồ thủ công bằng tre ở chợ.' },
          { en: 'Many villages near Hanoi are known for their handicrafts.', vi: 'Nhiều làng quanh Hà Nội nổi tiếng với nghề thủ công.' },
        ],
      },
      {
        id: 'l3-g-w2-preserve',
        word: 'preserve',
        ipa: '/prɪˈzɜːv/',
        partOfSpeech: 'verb',
        meaningVi: 'bảo tồn, gìn giữ',
        definitionEn: 'To keep something in its original state and stop it from being lost or damaged.',
        examples: [
          { en: 'The village is trying to preserve its old houses.', vi: 'Ngôi làng đang cố gắng bảo tồn những ngôi nhà cổ.' },
          { en: 'Festivals help preserve local traditions.', vi: 'Lễ hội giúp gìn giữ truyền thống địa phương.' },
        ],
        usageNote: {
          vi: 'Nhấn âm sau: pre-**SERVE**, chữ "s" đọc /z/. Danh từ: **preservation**.',
          en: 'Stress pre-**SERVE**; the "s" sounds like /z/. Noun: **preservation**.',
        },
      },
      {
        id: 'l3-g-w2-audience',
        word: 'audience',
        ipa: '/ˈɔː.di.əns/',
        partOfSpeech: 'noun',
        meaningVi: 'khán giả, người xem, người nghe',
        definitionEn: 'The group of people who watch or listen to a performance, film or talk.',
        examples: [
          { en: 'The audience clapped for five minutes.', vi: 'Khán giả vỗ tay suốt năm phút.' },
          { en: 'Traditional theatre is trying to attract a younger audience.', vi: 'Sân khấu truyền thống đang cố thu hút khán giả trẻ hơn.' },
        ],
        usageNote: {
          vi: 'Dùng **audience** cho buổi diễn/phim; trận đấu thể thao dùng **spectators** hoặc **crowd**.',
          en: 'Use **audience** for shows and films; for sports matches, say **spectators** or **crowd**.',
        },
      },
      {
        id: 'l3-g-w2-funding',
        word: 'funding',
        ipa: '/ˈfʌn.dɪŋ/',
        partOfSpeech: 'noun',
        meaningVi: 'kinh phí, nguồn tài trợ',
        definitionEn: 'Money given by a government or organisation for a particular purpose.',
        examples: [
          { en: 'The theatre closed because it lost its funding.', vi: 'Nhà hát đóng cửa vì mất nguồn kinh phí.' },
          { en: 'Should the government provide more funding for the arts?', vi: 'Nhà nước có nên cấp thêm kinh phí cho nghệ thuật không?' },
        ],
        usageNote: {
          vi: '**funding** không đếm được: nói "more funding", không nói "a funding" hay "fundings". Cụm: **funding for** something.',
          en: '**funding** is uncountable: "more funding", not "a funding". Chunk: **funding for** something.',
        },
      },
      {
        id: 'l3-g-w2-appreciate',
        word: 'appreciate',
        ipa: '/əˈpriː.ʃi.eɪt/',
        partOfSpeech: 'verb',
        meaningVi: 'trân trọng, hiểu được giá trị của',
        definitionEn: 'To understand how good or important something is.',
        examples: [
          { en: 'I only appreciated folk music when I got older.', vi: 'Lớn lên tôi mới biết trân trọng nhạc dân gian.' },
          { en: 'Visiting museums helps students appreciate history.', vi: 'Đi bảo tàng giúp học sinh hiểu giá trị của lịch sử.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u4-culture-ex01',
        type: 'multiple-choice',
        question: 'A public show of paintings in a gallery is called…',
        options: ['a performance', 'an exhibition', 'an audience', 'a heritage'],
        correctIndex: 1,
        explanation: {
          vi: 'Trưng bày tranh, ảnh cho công chúng xem là exhibition.',
          en: 'A public show of paintings or photos is an exhibition.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối danh từ với tính từ cùng họ.', en: 'Match each noun with its adjective.' },
        pairs: [
          { left: 'culture', right: 'cultural' },
          { left: 'art', right: 'artistic' },
          { left: 'tradition', right: 'traditional' },
          { left: 'history', right: 'historical' },
        ],
        explanation: {
          vi: 'Dùng tính từ trước danh từ: a cultural festival, traditional music.',
          en: 'Use the adjective before a noun: a cultural festival, traditional music.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex03',
        type: 'fill-blank',
        sentence: 'Old festivals help us ___ our traditions.',
        acceptedAnswers: ['preserve', 'protect', 'keep'],
        hint: '(p… = gìn giữ)',
        explanation: {
          vi: 'preserve traditions = gìn giữ truyền thống.',
          en: 'preserve traditions = keep them alive.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'The theatre needs more fundings.',
          'The theatre needs a funding.',
          'The theatre needs more funding.',
          'The theatre needs many funding.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'funding không đếm được → more funding.',
          en: 'funding is uncountable → more funding.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex05',
        type: 'fill-blank',
        sentence: 'The ___ stood up and clapped at the end of the show.',
        acceptedAnswers: ['audience'],
        explanation: {
          vi: 'Người xem buổi biểu diễn là audience.',
          en: 'The people watching a show are the audience.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex06',
        type: 'arrange-words',
        translationVi: 'Múa rối nước là một phần di sản văn hoá của chúng ta.',
        correctSentence: 'Water puppetry is part of our cultural heritage.',
        extraWords: ['culture'],
        explanation: {
          vi: 'Trước danh từ heritage cần tính từ cultural.',
          en: 'Before the noun heritage we need the adjective cultural.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex07',
        type: 'true-false',
        statement: 'The "h" in "exhibition" is silent.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đọc là /ˌek.sɪˈbɪʃ.ən/ — không có âm h.',
          en: 'It is pronounced /ˌek.sɪˈbɪʃ.ən/ — no h sound.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex08',
        type: 'listen-choose',
        audioText: 'Our village is famous for silk weaving, but very few young people want to learn it, so the skill may die out.',
        question: 'What is the speaker worried about?',
        options: [
          'Silk is too expensive.',
          'A traditional handicraft may disappear.',
          'Tourists do not visit the village.',
          'The village has no young people.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"the skill may die out" = nghề thủ công có thể bị mai một.',
          en: '"the skill may die out" = the handicraft may disappear.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex09',
        type: 'speak-sentence',
        sentence: 'Hoi An is famous for its cultural heritage.',
        translationVi: 'Hội An nổi tiếng với di sản văn hoá.',
        explanation: {
          vi: 'Nhấn CUL-tural và HER-itage; đọc rõ /dʒ/ cuối.',
          en: 'Stress CUL-tural and HER-itage; finish with a clear /dʒ/.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex10',
        type: 'multiple-choice',
        question: '"I didn\'t like classical music as a child, but now I really ___ it."',
        options: ['appreciate', 'preserve', 'perform', 'exhibit'],
        correctIndex: 0,
        explanation: {
          vi: 'appreciate = hiểu và trân trọng giá trị của điều gì.',
          en: 'appreciate = understand and value something.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex11',
        type: 'speak-sentence',
        sentence: 'The museum is holding an exhibition of old maps.',
        translationVi: 'Bảo tàng đang tổ chức triển lãm bản đồ cổ.',
        explanation: {
          vi: 'Nối âm "holding an exhibition"; nhớ âm cuối -s trong maps.',
          en: 'Link "holding an exhibition"; say the final -s in maps.',
        },
      },
      {
        id: 'l3-g-u4-culture-ex12',
        type: 'speak-answer',
        question: 'Should the government spend money on preserving traditional arts?',
        tipsVi:
          'Nêu ý kiến rồi đưa 2 lý do cụ thể. Dùng: funding, preserve, heritage, handicraft, appreciate. Có thể nhắc một làng nghề hoặc lễ hội ở quê bạn.',
        sampleAnswer:
          "Yes, I think some government funding is necessary. Many traditional handicrafts, like silk weaving or pottery, could die out because young people prefer office jobs. If the government supports these villages, they can preserve their skills and attract tourists. It also helps the next generation appreciate their cultural heritage.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt có ý kiến rõ, lý do và ví dụ thật.',
          en: 'A strong answer gives a clear view, reasons and a real example.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * 3. CÔNG NGHỆ TRONG ĐỜI SỐNG
   * Từ: device, screen time, rely on, artificial intelligence, privacy, digital skills,
   *     addictive, cutting-edge
   * ======================================================================== */
  {
    id: 'l3-g-u5-tech',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Công nghệ trong đời sống', en: 'Technology in everyday life' },
    description: {
      vi: 'Từ vựng về thiết bị, thời gian dùng màn hình, trí tuệ nhân tạo, quyền riêng tư và kỹ năng số.',
      en: 'Words for devices, screen time, AI, privacy and digital skills.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về công nghệ', en: 'Technology chunks' },
        body: {
          vi: '**electronic devices** = thiết bị điện tử\n**limit screen time** = giới hạn thời gian dùng màn hình\n**rely on** technology = phụ thuộc vào công nghệ\n**protect your privacy** = bảo vệ quyền riêng tư\n**basic digital skills** = kỹ năng số cơ bản\n**cutting-edge technology** = công nghệ tiên tiến nhất',
          en: '**electronic devices**\n**limit screen time**\n**rely on** technology\n**protect your privacy**\n**basic digital skills**\n**cutting-edge technology**',
        },
        examples: [
          { en: 'We limit our children\'s screen time to one hour a day.', vi: 'Chúng tôi giới hạn thời gian dùng màn hình của con ở mức một giờ mỗi ngày.' },
          { en: 'Older people often need help with basic digital skills.', vi: 'Người lớn tuổi thường cần được giúp về kỹ năng số cơ bản.' },
        ],
      },
      {
        title: { vi: 'Động từ + giới từ', en: 'Verbs + prepositions' },
        body: {
          vi: 'Nhiều động từ về công nghệ đi kèm giới từ cố định:\n**rely on / depend on** = phụ thuộc vào\n**be addicted to** + danh từ / V-ing = nghiện\n**spend time on** + danh từ / V-ing\nSai hay gặp: "rely in", "addicted with".\nTính từ: **addictive** (gây nghiện) — game addictive; người: **addicted** (bị nghiện).',
          en: 'Many technology verbs take a fixed preposition:\n**rely on / depend on**\n**be addicted to** + noun / -ing\n**spend time on** + noun / -ing\nCommon errors: "rely in", "addicted with".\nAdjectives: **addictive** (the game) vs **addicted** (the person).',
        },
        examples: [
          { en: 'Many teenagers are addicted to social media.', vi: 'Nhiều thiếu niên nghiện mạng xã hội.' },
          { en: 'Online games can be very addictive.', vi: 'Trò chơi trực tuyến có thể rất gây nghiện.' },
        ],
      },
      {
        title: { vi: 'Dùng trong IELTS: nhìn 2 mặt', en: 'In IELTS: looking at both sides' },
        body: {
          vi: 'Đề về công nghệ thường muốn bạn nêu **lợi ích** và **mặt trái**. Dùng cặp câu:\n"On the one hand, **artificial intelligence** saves time. On the other hand, people may **rely on** it too much."\nNhớ viết đầy đủ "artificial intelligence" lần đầu, sau đó mới dùng "AI".',
          en: 'Technology questions usually want **benefits** and **drawbacks**. Use a pair:\n"On the one hand, **artificial intelligence** saves time. On the other hand, people may **rely on** it too much."\nWrite "artificial intelligence" in full the first time, then "AI".',
        },
        examples: [
          { en: 'On the one hand, AI tools save time. On the other hand, they can make mistakes.', vi: 'Một mặt, công cụ AI tiết kiệm thời gian. Mặt khác, chúng có thể mắc lỗi.' },
          { en: 'Students should not rely on AI to write their essays.', vi: 'Học sinh không nên phụ thuộc vào AI để viết bài luận.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-device',
        word: 'device',
        ipa: '/dɪˈvaɪs/',
        partOfSpeech: 'noun',
        meaningVi: 'thiết bị (điện thoại, máy tính bảng…)',
        definitionEn: 'A machine or tool made for a particular purpose, such as a phone or tablet.',
        examples: [
          { en: 'Our family has more devices than people.', vi: 'Nhà tôi có nhiều thiết bị hơn số người.' },
          { en: 'Please turn off all devices during the exam.', vi: 'Vui lòng tắt mọi thiết bị trong giờ thi.' },
        ],
        usageNote: {
          vi: 'Danh từ **device** /s/ — khác động từ **devise** /z/ (nghĩ ra). Nhấn âm sau: de-**VICE**.',
          en: 'The noun **device** ends in /s/; the verb **devise** ends in /z/. Stress de-**VICE**.',
        },
      },
      {
        id: 'l3-g-w2-screen-time',
        word: 'screen time',
        ipa: '/ˈskriːn ˌtaɪm/',
        partOfSpeech: 'noun',
        meaningVi: 'thời gian dùng màn hình (điện thoại, TV, máy tính)',
        definitionEn: 'The amount of time a person spends looking at a phone, computer or TV.',
        examples: [
          { en: 'Too much screen time can affect children\'s sleep.', vi: 'Dùng màn hình quá nhiều có thể ảnh hưởng giấc ngủ của trẻ.' },
          { en: 'My phone shows my daily screen time.', vi: 'Điện thoại của tôi hiển thị thời gian dùng màn hình mỗi ngày.' },
        ],
      },
      {
        id: 'l3-g-w2-rely-on',
        word: 'rely on',
        ipa: '/rɪˈlaɪ ɒn/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'phụ thuộc vào, dựa vào',
        definitionEn: 'To need someone or something in order to do something.',
        examples: [
          { en: 'Many drivers rely on maps on their phones.', vi: 'Nhiều tài xế phụ thuộc vào bản đồ trên điện thoại.' },
          { en: 'We rely too much on technology these days.', vi: 'Ngày nay chúng ta phụ thuộc quá nhiều vào công nghệ.' },
        ],
        usageNote: {
          vi: 'Luôn đi với **on**. Tính từ: **reliable** (đáng tin cậy), danh từ: **reliance on**.',
          en: 'Always use **on**. Adjective: **reliable**; noun: **reliance on**.',
        },
      },
      {
        id: 'l3-g-w2-artificial-intelligence',
        word: 'artificial intelligence',
        ipa: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/',
        partOfSpeech: 'noun',
        meaningVi: 'trí tuệ nhân tạo (AI)',
        definitionEn: 'Computer systems that can do tasks that usually need human thinking.',
        examples: [
          { en: 'Artificial intelligence can translate a text in seconds.', vi: 'Trí tuệ nhân tạo có thể dịch một văn bản trong vài giây.' },
          { en: 'Some jobs may change because of artificial intelligence.', vi: 'Một số công việc có thể thay đổi vì trí tuệ nhân tạo.' },
        ],
        usageNote: {
          vi: 'Nhấn: arti-**FI**-cial in-**TEL**-ligence. Không dùng "the" khi nói chung: "AI is changing…".',
          en: 'Stress arti-**FI**-cial in-**TEL**-ligence. No "the" when speaking generally: "AI is changing…".',
        },
      },
      {
        id: 'l3-g-w2-privacy',
        word: 'privacy',
        ipa: '/ˈprɪv.ə.si/',
        partOfSpeech: 'noun',
        meaningVi: 'sự riêng tư, quyền riêng tư',
        definitionEn: 'The right to keep your personal information and life to yourself.',
        examples: [
          { en: 'Don\'t share your address online — protect your privacy.', vi: 'Đừng chia sẻ địa chỉ trên mạng — hãy bảo vệ quyền riêng tư.' },
          { en: 'Many people worry about online privacy.', vi: 'Nhiều người lo lắng về quyền riêng tư trên mạng.' },
        ],
        usageNote: {
          vi: 'Giọng Anh-Anh đọc **PRIV**-a-cy (/ɪ/ ngắn). Tính từ: **private**.',
          en: 'British English: **PRIV**-a-cy with a short /ɪ/. Adjective: **private**.',
        },
      },
      {
        id: 'l3-g-w2-digital-skills',
        word: 'digital skills',
        ipa: '/ˈdɪdʒ.ɪ.təl skɪlz/',
        partOfSpeech: 'noun',
        meaningVi: 'kỹ năng số (dùng máy tính, internet, ứng dụng)',
        definitionEn: 'The ability to use computers, the internet and apps well.',
        examples: [
          { en: 'Almost every job now needs basic digital skills.', vi: 'Gần như mọi công việc bây giờ đều cần kỹ năng số cơ bản.' },
          { en: 'The library offers free digital skills classes for older people.', vi: 'Thư viện mở lớp kỹ năng số miễn phí cho người lớn tuổi.' },
        ],
      },
      {
        id: 'l3-g-w2-addictive',
        word: 'addictive',
        ipa: '/əˈdɪk.tɪv/',
        partOfSpeech: 'adjective',
        meaningVi: 'gây nghiện',
        definitionEn: 'Making you want to do or use something again and again.',
        examples: [
          { en: 'Short video apps are designed to be addictive.', vi: 'Các ứng dụng video ngắn được thiết kế để gây nghiện.' },
          { en: 'This puzzle game is surprisingly addictive.', vi: 'Trò xếp hình này gây nghiện bất ngờ.' },
        ],
        usageNote: {
          vi: 'Vật gây nghiện: **addictive**; người bị nghiện: **addicted to** + danh từ.',
          en: 'The thing is **addictive**; the person is **addicted to** + noun.',
        },
      },
      {
        id: 'l3-g-w2-cutting-edge',
        word: 'cutting-edge',
        ipa: '/ˌkʌt.ɪŋˈedʒ/',
        partOfSpeech: 'adjective',
        meaningVi: 'tiên tiến nhất, hiện đại nhất',
        definitionEn: 'The newest and most advanced.',
        examples: [
          { en: 'The new hospital uses cutting-edge equipment.', vi: 'Bệnh viện mới dùng thiết bị tiên tiến nhất.' },
          { en: 'Our university has a cutting-edge science lab.', vi: 'Trường đại học của chúng tôi có phòng thí nghiệm khoa học hiện đại nhất.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u5-tech-ex01',
        type: 'multiple-choice',
        question: 'Phones, tablets and laptops are all…',
        options: ['devices', 'privacies', 'screen times', 'digital skills'],
        correctIndex: 0,
        explanation: {
          vi: 'Điện thoại, máy tính bảng, laptop đều là thiết bị: devices.',
          en: 'Phones, tablets and laptops are all devices.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa tiếng Việt.', en: 'Match the words with their Vietnamese meanings.' },
        pairs: [
          { left: 'privacy', right: 'quyền riêng tư' },
          { left: 'screen time', right: 'thời gian dùng màn hình' },
          { left: 'cutting-edge', right: 'tiên tiến nhất' },
          { left: 'addictive', right: 'gây nghiện' },
          { left: 'rely on', right: 'phụ thuộc vào' },
        ],
        explanation: {
          vi: 'Ôn nghĩa trước khi dùng từ trong câu.',
          en: 'Review the meanings before using the words in sentences.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex03',
        type: 'fill-blank',
        sentence: 'Many students rely ___ their phones to check the timetable.',
        acceptedAnswers: ['on'],
        explanation: {
          vi: 'Cụm cố định: rely on (phụ thuộc vào).',
          en: 'Fixed phrase: rely on.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex04',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'My brother is addictive to online games.',
          'My brother is addicted to online games.',
          'My brother is addicted with online games.',
          'My brother addicts online games.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Người bị nghiện: be addicted to + danh từ.',
          en: 'For a person: be addicted to + noun.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex05',
        type: 'fill-blank',
        sentence: 'Parents should limit their children\'s screen ___.',
        acceptedAnswers: ['time'],
        explanation: {
          vi: 'screen time = thời gian dùng màn hình.',
          en: 'screen time = time spent looking at screens.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex06',
        type: 'arrange-words',
        translationVi: 'Gần như mọi công việc bây giờ đều cần kỹ năng số cơ bản.',
        correctSentence: 'Almost every job now needs basic digital skills.',
        extraWords: ['digitally'],
        explanation: {
          vi: 'Trước danh từ skills dùng tính từ digital.',
          en: 'Before the noun skills we use the adjective digital.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex07',
        type: 'true-false',
        statement: '"Cutting-edge technology" means old and simple technology.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Cutting-edge = tiên tiến, hiện đại nhất.',
          en: 'Cutting-edge = the newest and most advanced.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex08',
        type: 'listen-choose',
        audioText: 'I never post photos of my house or my children online. I think it is important to protect my family\'s privacy.',
        question: 'Why doesn\'t the speaker post family photos?',
        options: [
          'Her phone is broken.',
          'She wants to keep personal information private.',
          'She doesn\'t like photos.',
          'Her children don\'t allow it.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"protect my family\'s privacy" = giữ thông tin gia đình riêng tư.',
          en: '"protect my family\'s privacy" = keep personal information private.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex09',
        type: 'speak-sentence',
        sentence: 'Artificial intelligence can translate a text in seconds.',
        translationVi: 'Trí tuệ nhân tạo có thể dịch một văn bản trong vài giây.',
        explanation: {
          vi: 'Nhấn arti-FI-cial in-TEL-ligence; đọc rõ /kst/ trong text.',
          en: 'Stress arti-FI-cial in-TEL-ligence; say /kst/ clearly in text.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex10',
        type: 'multiple-choice',
        question: '"Short video apps are designed to be ___, so people keep scrolling for hours."',
        options: ['reliable', 'addictive', 'private', 'digital'],
        correctIndex: 1,
        explanation: {
          vi: 'Khiến người ta xem mãi không dừng → addictive (gây nghiện).',
          en: 'Making people keep scrolling → addictive.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex11',
        type: 'speak-sentence',
        sentence: 'Our family has more devices than people.',
        translationVi: 'Nhà tôi có nhiều thiết bị hơn số người.',
        explanation: {
          vi: 'Nhấn de-VI-ces, đọc -ces là /ɪz/; "than" đọc nhẹ /ðən/.',
          en: 'Stress de-VI-ces, ending /ɪz/; say a weak "than" /ðən/.',
        },
      },
      {
        id: 'l3-g-u5-tech-ex12',
        type: 'speak-answer',
        question: 'Do you think people today rely too much on technology?',
        tipsVi:
          'Nhìn 2 mặt: On the one hand… On the other hand… Dùng: rely on, device, screen time, artificial intelligence, digital skills. Kết bằng ý kiến của bạn.',
        sampleAnswer:
          "To some extent, yes. On the one hand, our devices make life much easier — we pay bills, study and talk to relatives without leaving home. On the other hand, many people rely on their phones for everything, even simple maths. I think the key is balance: we should limit our screen time and still keep some skills without technology.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt nêu cả lợi ích, mặt trái và kết luận cá nhân.',
          en: 'A strong answer covers benefits, drawbacks and a personal conclusion.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * 4. MÔI TRƯỜNG, KHÍ HẬU & NĂNG LƯỢNG
   * Từ: pollution, renewable energy, carbon emissions, global warming, recycle, waste,
   *     fossil fuels, sustainable
   * ======================================================================== */
  {
    id: 'l3-g-u6-environment',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Môi trường, khí hậu và năng lượng', en: 'Environment, climate and energy' },
    description: {
      vi: 'Từ vựng về ô nhiễm, rác thải, năng lượng tái tạo và cách nêu giải pháp bảo vệ môi trường.',
      en: 'Words for pollution, waste and renewable energy, and how to suggest ways to protect the environment.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về môi trường', en: 'Environment chunks' },
        body: {
          vi: '**air / water / plastic pollution** = ô nhiễm không khí / nước / nhựa\n**reduce carbon emissions** = giảm khí thải carbon\n**switch to renewable energy** = chuyển sang năng lượng tái tạo\n**burn fossil fuels** = đốt nhiên liệu hoá thạch\n**reduce, reuse, recycle** = giảm, tái sử dụng, tái chế\n**a sustainable lifestyle** = lối sống bền vững',
          en: '**air / water / plastic pollution**\n**reduce carbon emissions**\n**switch to renewable energy**\n**burn fossil fuels**\n**reduce, reuse, recycle**\n**a sustainable lifestyle**',
        },
        examples: [
          { en: 'Air pollution in big cities is worst in winter.', vi: 'Ô nhiễm không khí ở thành phố lớn tệ nhất vào mùa đông.' },
          { en: 'Many countries are switching to renewable energy.', vi: 'Nhiều nước đang chuyển sang năng lượng tái tạo.' },
        ],
      },
      {
        title: { vi: 'Đếm được hay không đếm được?', en: 'Countable or uncountable?' },
        body: {
          vi: 'Nhiều từ môi trường **không đếm được**: **pollution, energy, waste, rubbish, electricity** → không thêm -s, không dùng "a".\nDùng **much / less / a lot of**: "We should produce **less waste**."\nNgược lại **emissions** thường ở số nhiều: "carbon **emissions are** rising."',
          en: 'Many environment words are **uncountable**: **pollution, energy, waste, rubbish, electricity** → no -s, no "a".\nUse **much / less / a lot of**: "We should produce **less waste**."\nBut **emissions** is usually plural: "carbon **emissions are** rising."',
        },
        examples: [
          { en: 'Our family produces less waste now that we recycle.', vi: 'Nhà tôi thải ít rác hơn từ khi phân loại tái chế.' },
          { en: 'Carbon emissions from traffic are rising every year.', vi: 'Khí thải carbon từ giao thông tăng mỗi năm.' },
        ],
      },
      {
        title: { vi: 'Dùng trong IELTS: vấn đề → giải pháp', en: 'In IELTS: problem → solution' },
        body: {
          vi: 'Đề môi trường thường hỏi **ai** nên làm gì. Chia 2 phía:\n**Cá nhân:** "Individuals can **recycle** and use public transport."\n**Nhà nước:** "Governments should invest in **renewable energy** and reduce our dependence on **fossil fuels**."\nNêu kết quả: "…which would slow down **global warming**."',
          en: 'Environment questions often ask **who** should act. Cover two sides:\n**Individuals:** "Individuals can **recycle** and use public transport."\n**Governments:** "Governments should invest in **renewable energy** and reduce our dependence on **fossil fuels**."\nAdd the result: "…which would slow down **global warming**."',
        },
        examples: [
          { en: 'Governments should invest more in solar and wind power.', vi: 'Nhà nước nên đầu tư nhiều hơn vào điện mặt trời và điện gió.' },
          { en: 'Using less plastic would reduce pollution in our rivers.', vi: 'Dùng ít nhựa hơn sẽ giảm ô nhiễm ở sông ngòi.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-pollution',
        word: 'pollution',
        ipa: '/pəˈluː.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'sự ô nhiễm',
        definitionEn: 'Damage to air, water or land caused by harmful substances.',
        examples: [
          { en: 'On bad days, air pollution makes my eyes sore.', vi: 'Những hôm tệ, ô nhiễm không khí làm tôi cay mắt.' },
          { en: 'Plastic pollution is killing fish in the sea.', vi: 'Ô nhiễm nhựa đang giết cá ngoài biển.' },
        ],
        usageNote: {
          vi: 'Không đếm được: "a lot of pollution", không nói "pollutions". Động từ: **pollute**; tính từ: **polluted**.',
          en: 'Uncountable: "a lot of pollution", not "pollutions". Verb: **pollute**; adjective: **polluted**.',
        },
      },
      {
        id: 'l3-g-w2-renewable-energy',
        word: 'renewable energy',
        ipa: '/rɪˈnjuː.ə.bəl ˈen.ə.dʒi/',
        partOfSpeech: 'noun',
        meaningVi: 'năng lượng tái tạo (mặt trời, gió, nước)',
        definitionEn: 'Energy from sources that do not run out, like the sun, wind and water.',
        examples: [
          { en: 'Solar panels are a popular form of renewable energy.', vi: 'Tấm pin mặt trời là một dạng năng lượng tái tạo phổ biến.' },
          { en: 'Vietnam has good conditions for renewable energy.', vi: 'Việt Nam có điều kiện tốt cho năng lượng tái tạo.' },
        ],
      },
      {
        id: 'l3-g-w2-carbon-emissions',
        word: 'carbon emissions',
        ipa: '/ˈkɑː.bən iˈmɪʃ.ənz/',
        partOfSpeech: 'noun',
        meaningVi: 'khí thải carbon',
        definitionEn: 'Carbon dioxide gas released into the air, for example by cars and factories.',
        examples: [
          { en: 'Cycling to work helps reduce carbon emissions.', vi: 'Đạp xe đi làm giúp giảm khí thải carbon.' },
          { en: 'Carbon emissions from factories have increased.', vi: 'Khí thải carbon từ các nhà máy đã tăng.' },
        ],
        usageNote: {
          vi: 'Thường ở số nhiều → động từ số nhiều: "emissions **are** rising". Cụm: **reduce / cut** emissions.',
          en: 'Usually plural → plural verb: "emissions **are** rising". Chunks: **reduce / cut** emissions.',
        },
      },
      {
        id: 'l3-g-w2-global-warming',
        word: 'global warming',
        ipa: '/ˌɡləʊ.bəl ˈwɔː.mɪŋ/',
        partOfSpeech: 'noun',
        meaningVi: 'sự nóng lên toàn cầu',
        definitionEn: 'The slow rise in the temperature of the Earth.',
        examples: [
          { en: 'Global warming is causing more extreme weather.', vi: 'Sự nóng lên toàn cầu đang gây ra thời tiết khắc nghiệt hơn.' },
          { en: 'Sea levels are rising because of global warming.', vi: 'Mực nước biển đang dâng vì trái đất nóng lên.' },
        ],
      },
      {
        id: 'l3-g-w2-recycle',
        word: 'recycle',
        ipa: '/ˌriːˈsaɪ.kəl/',
        partOfSpeech: 'verb',
        meaningVi: 'tái chế',
        definitionEn: 'To treat used things like paper or plastic so they can be used again.',
        examples: [
          { en: 'We recycle bottles and old newspapers every week.', vi: 'Mỗi tuần nhà tôi đem chai lọ và báo cũ đi tái chế.' },
          { en: 'Only a small part of plastic is recycled.', vi: 'Chỉ một phần nhỏ nhựa được tái chế.' },
        ],
        usageNote: {
          vi: 'Nhấn âm giữa: re-**CY**-cle. Danh từ: **recycling** (không đếm được).',
          en: 'Stress re-**CY**-cle. Noun: **recycling** (uncountable).',
        },
      },
      {
        id: 'l3-g-w2-waste',
        word: 'waste',
        ipa: '/weɪst/',
        partOfSpeech: 'noun / verb',
        meaningVi: 'rác thải; lãng phí',
        definitionEn: 'Things that are thrown away because they are not needed; to use something badly or carelessly.',
        examples: [
          { en: 'Restaurants throw away a lot of food waste.', vi: 'Nhà hàng vứt bỏ rất nhiều rác thải thực phẩm.' },
          { en: 'Don\'t waste water when you brush your teeth.', vi: 'Đừng lãng phí nước khi đánh răng.' },
        ],
        usageNote: {
          vi: 'Đọc rõ âm cuối /st/. Khi là "rác thải" thì không đếm được: "less waste".',
          en: 'Say the final /st/ clearly. As "rubbish", it is uncountable: "less waste".',
        },
      },
      {
        id: 'l3-g-w2-fossil-fuels',
        word: 'fossil fuels',
        ipa: '/ˈfɒs.əl ˌfjuː.əlz/',
        partOfSpeech: 'noun',
        meaningVi: 'nhiên liệu hoá thạch (than, dầu, khí đốt)',
        definitionEn: 'Fuels such as coal, oil and gas, formed from plants and animals millions of years ago.',
        examples: [
          { en: 'Burning fossil fuels produces carbon emissions.', vi: 'Đốt nhiên liệu hoá thạch tạo ra khí thải carbon.' },
          { en: 'We still depend on fossil fuels for most of our electricity.', vi: 'Chúng ta vẫn phụ thuộc vào nhiên liệu hoá thạch cho phần lớn điện năng.' },
        ],
      },
      {
        id: 'l3-g-w2-sustainable',
        word: 'sustainable',
        ipa: '/səˈsteɪ.nə.bəl/',
        partOfSpeech: 'adjective',
        meaningVi: 'bền vững (không gây hại lâu dài cho môi trường)',
        definitionEn: 'Able to continue for a long time without harming the environment.',
        examples: [
          { en: 'Bamboo is a sustainable building material.', vi: 'Tre là vật liệu xây dựng bền vững.' },
          { en: 'We are trying to live a more sustainable lifestyle.', vi: 'Chúng tôi đang cố sống theo lối sống bền vững hơn.' },
        ],
        usageNote: {
          vi: 'Nhấn âm thứ hai: sus-**TAIN**-able.',
          en: 'Stress the second syllable: sus-**TAIN**-able.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u6-environment-ex01',
        type: 'multiple-choice',
        question: 'Which of these is renewable energy?',
        options: ['coal', 'oil', 'wind power', 'gas'],
        correctIndex: 2,
        explanation: {
          vi: 'Gió không bao giờ cạn → năng lượng tái tạo. Than, dầu, khí là nhiên liệu hoá thạch.',
          en: 'Wind never runs out → renewable. Coal, oil and gas are fossil fuels.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối để tạo cụm từ đúng.', en: 'Match to make correct chunks.' },
        pairs: [
          { left: 'reduce carbon', right: 'emissions' },
          { left: 'burn fossil', right: 'fuels' },
          { left: 'a sustainable', right: 'lifestyle' },
          { left: 'switch to renewable', right: 'energy' },
          { left: 'plastic', right: 'waste' },
        ],
        explanation: {
          vi: 'Học cả cụm giúp bạn viết tự nhiên và nhanh hơn.',
          en: 'Learning whole chunks helps you write naturally and quickly.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex03',
        type: 'fill-blank',
        sentence: 'We put paper and bottles in a special bin so they can be ___.',
        acceptedAnswers: ['recycled'],
        hint: '(recycle)',
        explanation: {
          vi: 'Bị động: can be + V3 → recycled.',
          en: 'Passive: can be + past participle → recycled.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex04',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Our city has many pollutions.',
          'Our city has a pollution.',
          'Our city has a lot of pollution.',
          'Our city has a lot of pollutions.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'pollution không đếm được → a lot of pollution.',
          en: 'pollution is uncountable → a lot of pollution.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex05',
        type: 'fill-blank',
        sentence: 'Burning coal and oil is a major cause of global ___.',
        acceptedAnswers: ['warming'],
        explanation: {
          vi: 'global warming = sự nóng lên toàn cầu.',
          en: 'global warming = the rise in the Earth\'s temperature.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex06',
        type: 'arrange-words',
        translationVi: 'Nhà nước nên giảm sự phụ thuộc vào nhiên liệu hoá thạch.',
        correctSentence: 'Governments should reduce our dependence on fossil fuels.',
        extraWords: ['in'],
        explanation: {
          vi: 'dependence đi với on: dependence on something.',
          en: 'dependence takes on: dependence on something.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex07',
        type: 'true-false',
        statement: 'In "Carbon emissions are rising", the verb "are" is correct because "emissions" is plural.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'emissions là số nhiều → dùng are.',
          en: 'emissions is plural → are.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex08',
        type: 'listen-choose',
        audioText: 'Last year we put solar panels on our roof. Now our electricity bill is much lower, and we use less power from coal.',
        question: 'What did the family do?',
        options: [
          'They bought an electric car.',
          'They started using renewable energy at home.',
          'They stopped using electricity.',
          'They moved to the countryside.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Tấm pin mặt trời = năng lượng tái tạo.',
          en: 'Solar panels = renewable energy.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex09',
        type: 'speak-sentence',
        sentence: 'Cycling to work helps reduce carbon emissions.',
        translationVi: 'Đạp xe đi làm giúp giảm khí thải carbon.',
        explanation: {
          vi: 'Đọc rõ -s trong helps và -ns /nz/ trong emissions.',
          en: 'Say the -s in helps and /nz/ at the end of emissions.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex10',
        type: 'multiple-choice',
        question: '"Bamboo grows quickly and doesn\'t harm the land, so it is a very ___ material."',
        options: ['polluted', 'sustainable', 'wasteful', 'fossil'],
        correctIndex: 1,
        explanation: {
          vi: 'Không gây hại lâu dài cho môi trường → sustainable (bền vững).',
          en: 'Not harming the environment long-term → sustainable.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex11',
        type: 'speak-sentence',
        sentence: 'Restaurants throw away a lot of food waste.',
        translationVi: 'Nhà hàng vứt bỏ rất nhiều rác thải thực phẩm.',
        explanation: {
          vi: 'Đọc rõ âm cuối /st/ trong waste và /ts/ trong restaurants.',
          en: 'Say the final /st/ in waste and /ts/ in restaurants.',
        },
      },
      {
        id: 'l3-g-u6-environment-ex12',
        type: 'speak-answer',
        question: 'Who should be more responsible for protecting the environment: individuals or governments?',
        tipsVi:
          'Nói cả 2 phía rồi chọn bên của bạn. Dùng: recycle, waste, renewable energy, fossil fuels, carbon emissions. Cho 1 ví dụ ở Việt Nam hoặc gia đình bạn.',
        sampleAnswer:
          "I think both have a role, but governments can make a bigger difference. Individuals can recycle, produce less waste and take the bus instead of driving. However, only governments can build solar and wind farms and reduce our dependence on fossil fuels. For example, if electricity came mainly from renewable energy, carbon emissions would fall much faster.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt so sánh 2 phía và có ví dụ cụ thể.',
          en: 'A strong answer compares both sides with a specific example.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * 5. KHOA HỌC & NGHIÊN CỨU
   * Từ: experiment, researcher, discovery, evidence, breakthrough, carry out, conclusion, prove
   * ======================================================================== */
  {
    id: 'l3-g-u6-science',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Khoa học và nghiên cứu', en: 'Science and research' },
    description: {
      vi: 'Từ vựng về thí nghiệm, bằng chứng, phát hiện và cách kể lại một nghiên cứu.',
      en: 'Words for experiments, evidence and discoveries, and how to report a study.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về nghiên cứu', en: 'Research chunks' },
        body: {
          vi: '**carry out / conduct an experiment** = tiến hành thí nghiệm (KHÔNG nói "make an experiment")\n**do research into / on** something = nghiên cứu về\n**make a discovery** = có phát hiện\n**find evidence of / for** = tìm bằng chứng\n**reach a conclusion** = đi đến kết luận\n**a medical breakthrough** = đột phá y học',
          en: '**carry out / conduct an experiment** (NOT "make an experiment")\n**do research into / on** something\n**make a discovery**\n**find evidence of / for**\n**reach a conclusion**\n**a medical breakthrough**',
        },
        examples: [
          { en: 'The students carried out an experiment with plants and light.', vi: 'Học sinh tiến hành thí nghiệm về cây và ánh sáng.' },
          { en: 'Scientists are doing research into new rice varieties.', vi: 'Các nhà khoa học đang nghiên cứu giống lúa mới.' },
        ],
      },
      {
        title: { vi: '"research" và "evidence" không đếm được', en: '"research" and "evidence" are uncountable' },
        body: {
          vi: 'Lỗi rất hay gặp: "researches", "an evidence".\nĐúng: **some research**, **a lot of evidence**, **a piece of evidence**.\nMuốn đếm: **a study** / **two studies** (một / hai nghiên cứu).\n"Recent **studies show** that…" — chủ ngữ số nhiều.\nNgười làm: **researcher**, **scientist**.',
          en: 'A very common error: "researches", "an evidence".\nCorrect: **some research**, **a lot of evidence**, **a piece of evidence**.\nTo count, use **a study** / **two studies**.\n"Recent **studies show** that…" — plural subject.\nThe person: **researcher**, **scientist**.',
        },
        examples: [
          { en: 'There is a lot of evidence that exercise improves memory.', vi: 'Có nhiều bằng chứng cho thấy tập thể dục cải thiện trí nhớ.' },
          { en: 'Recent studies show that teenagers need more sleep.', vi: 'Các nghiên cứu gần đây cho thấy thiếu niên cần ngủ nhiều hơn.' },
        ],
      },
      {
        title: { vi: 'Dùng trong IELTS: dẫn chứng thận trọng', en: 'In IELTS: careful claims' },
        body: {
          vi: 'Khi đưa dẫn chứng, đừng nói quá chắc chắn. Dùng:\n"Research **suggests** that…" (gợi ý rằng)\n"There is **evidence** that…"\n"Scientists have not yet **proved** that…"\n**prove** = chứng minh chắc chắn — chỉ dùng khi thật sự chắc.',
          en: 'When giving evidence, don\'t sound too certain. Use:\n"Research **suggests** that…"\n"There is **evidence** that…"\n"Scientists have not yet **proved** that…"\n**prove** = show something is definitely true — use it only when you are sure.',
        },
        examples: [
          { en: 'Research suggests that reading before bed helps children relax.', vi: 'Nghiên cứu gợi ý rằng đọc sách trước khi ngủ giúp trẻ thư giãn.' },
          { en: 'Nobody has proved that this diet works.', vi: 'Chưa ai chứng minh được chế độ ăn này có hiệu quả.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-experiment',
        word: 'experiment',
        ipa: '/ɪkˈsper.ɪ.mənt/',
        partOfSpeech: 'noun',
        meaningVi: 'thí nghiệm',
        definitionEn: 'A careful test done to find out something or to check an idea.',
        examples: [
          { en: 'In the experiment, one group of plants got no light.', vi: 'Trong thí nghiệm, một nhóm cây không được chiếu sáng.' },
          { en: 'We did a simple experiment with salt and water in class.', vi: 'Chúng tôi làm một thí nghiệm đơn giản với muối và nước trên lớp.' },
        ],
        usageNote: {
          vi: 'Nhấn âm thứ hai: ex-**PER**-i-ment. Cụm: **carry out / conduct / do an experiment**.',
          en: 'Stress ex-**PER**-i-ment. Chunks: **carry out / conduct / do an experiment**.',
        },
      },
      {
        id: 'l3-g-w2-researcher',
        word: 'researcher',
        ipa: '/rɪˈsɜː.tʃər/',
        partOfSpeech: 'noun',
        meaningVi: 'nhà nghiên cứu',
        definitionEn: 'A person whose job is to study a subject carefully to discover new facts.',
        examples: [
          { en: 'My aunt is a researcher at a medical university.', vi: 'Dì tôi là nhà nghiên cứu ở một trường đại học y.' },
          { en: 'Researchers asked 2,000 families about their diet.', vi: 'Các nhà nghiên cứu đã hỏi 2.000 gia đình về chế độ ăn.' },
        ],
      },
      {
        id: 'l3-g-w2-discovery',
        word: 'discovery',
        ipa: '/dɪˈskʌv.ər.i/',
        partOfSpeech: 'noun',
        meaningVi: 'sự phát hiện, khám phá',
        definitionEn: 'The act of finding something new, or the thing that is found.',
        examples: [
          { en: 'The discovery of a new cave attracted many tourists.', vi: 'Việc phát hiện một hang động mới đã thu hút nhiều du khách.' },
          { en: 'Scientists made an important discovery about sleep.', vi: 'Các nhà khoa học đã có một phát hiện quan trọng về giấc ngủ.' },
        ],
        usageNote: {
          vi: 'Cụm: **make a discovery** (không nói "do a discovery"). Động từ: **discover**.',
          en: 'Chunk: **make a discovery** (not "do"). Verb: **discover**.',
        },
      },
      {
        id: 'l3-g-w2-evidence',
        word: 'evidence',
        ipa: '/ˈev.ɪ.dəns/',
        partOfSpeech: 'noun',
        meaningVi: 'bằng chứng',
        definitionEn: 'Facts or information that show something is true.',
        examples: [
          { en: 'There is strong evidence that smoking harms the lungs.', vi: 'Có bằng chứng rõ ràng rằng hút thuốc gây hại cho phổi.' },
          { en: 'The researchers found no evidence of side effects.', vi: 'Các nhà nghiên cứu không tìm thấy bằng chứng về tác dụng phụ.' },
        ],
        usageNote: {
          vi: 'Không đếm được: không nói "an evidence / evidences". Dùng **a piece of evidence**.',
          en: 'Uncountable: not "an evidence / evidences". Use **a piece of evidence**.',
        },
      },
      {
        id: 'l3-g-w2-breakthrough',
        word: 'breakthrough',
        ipa: '/ˈbreɪk.θruː/',
        partOfSpeech: 'noun',
        meaningVi: 'bước đột phá',
        definitionEn: 'An important new discovery or development that solves a problem.',
        examples: [
          { en: 'The new vaccine was a major breakthrough.', vi: 'Loại vắc-xin mới là một bước đột phá lớn.' },
          { en: 'Engineers made a breakthrough in battery design.', vi: 'Các kỹ sư đã tạo ra đột phá trong thiết kế pin.' },
        ],
      },
      {
        id: 'l3-g-w2-carry-out',
        word: 'carry out',
        ipa: '/ˌkær.i ˈaʊt/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'tiến hành, thực hiện',
        definitionEn: 'To do a planned task such as a test, a survey or research.',
        examples: [
          { en: 'The team carried out a survey of 500 students.', vi: 'Nhóm đã tiến hành khảo sát 500 sinh viên.' },
          { en: 'The tests were carried out over six months.', vi: 'Các thử nghiệm được tiến hành trong sáu tháng.' },
        ],
      },
      {
        id: 'l3-g-w2-conclusion',
        word: 'conclusion',
        ipa: '/kənˈkluː.ʒən/',
        partOfSpeech: 'noun',
        meaningVi: 'kết luận',
        definitionEn: 'What you decide is true after looking at all the information.',
        examples: [
          { en: 'The study reached the conclusion that breakfast improves concentration.', vi: 'Nghiên cứu đi đến kết luận rằng bữa sáng giúp tập trung tốt hơn.' },
          { en: 'Don\'t jump to conclusions before you see all the data.', vi: 'Đừng vội kết luận trước khi xem hết số liệu.' },
        ],
        usageNote: {
          vi: 'Cụm: **reach / come to a conclusion**; thành ngữ **jump to conclusions** = vội kết luận.',
          en: 'Chunks: **reach / come to a conclusion**; idiom **jump to conclusions** = decide too quickly.',
        },
      },
      {
        id: 'l3-g-w2-prove',
        word: 'prove',
        ipa: '/pruːv/',
        partOfSpeech: 'verb',
        meaningVi: 'chứng minh',
        definitionEn: 'To show that something is definitely true by using facts.',
        examples: [
          { en: 'The experiment proved that the idea was wrong.', vi: 'Thí nghiệm đã chứng minh ý tưởng đó sai.' },
          { en: 'It is hard to prove that one food prevents illness.', vi: 'Rất khó chứng minh rằng một loại thực phẩm phòng được bệnh.' },
        ],
        usageNote: {
          vi: 'Âm cuối /v/ — rung môi, đừng đọc thành "pruf". Danh từ: **proof**.',
          en: 'It ends in /v/ — not "pruf". Noun: **proof**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u6-science-ex01',
        type: 'multiple-choice',
        question: 'Choose the correct chunk: "The students ___ an experiment on plants."',
        options: ['made', 'carried out', 'did out', 'reached'],
        correctIndex: 1,
        explanation: {
          vi: 'Cụm đúng: carry out an experiment (không dùng make).',
          en: 'The chunk is carry out an experiment (not make).',
        },
      },
      {
        id: 'l3-g-u6-science-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với danh từ đi kèm.', en: 'Match each verb with the noun it goes with.' },
        pairs: [
          { left: 'make a', right: 'discovery' },
          { left: 'reach a', right: 'conclusion' },
          { left: 'find', right: 'evidence' },
          { left: 'do', right: 'research' },
        ],
        explanation: {
          vi: 'make a discovery, reach a conclusion, find evidence, do research.',
          en: 'make a discovery, reach a conclusion, find evidence, do research.',
        },
      },
      {
        id: 'l3-g-u6-science-ex03',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'There are many evidences that exercise helps memory.',
          'There is an evidence that exercise helps memory.',
          'There is a lot of evidence that exercise helps memory.',
          'There are a lot of evidence that exercise helps memory.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'evidence không đếm được → There is a lot of evidence.',
          en: 'evidence is uncountable → There is a lot of evidence.',
        },
      },
      {
        id: 'l3-g-u6-science-ex04',
        type: 'fill-blank',
        sentence: 'The new medicine was a major ___ in treating the disease.',
        acceptedAnswers: ['breakthrough'],
        hint: '(b… = đột phá)',
        explanation: {
          vi: 'Phát hiện quan trọng giải quyết vấn đề = breakthrough.',
          en: 'An important discovery that solves a problem = breakthrough.',
        },
      },
      {
        id: 'l3-g-u6-science-ex05',
        type: 'fill-blank',
        sentence: 'Recent ___ show that teenagers need more sleep.',
        acceptedAnswers: ['studies'],
        hint: '(study)',
        explanation: {
          vi: 'Muốn dùng số nhiều thì dùng studies (research không có số nhiều).',
          en: 'For a plural, use studies (research has no plural).',
        },
      },
      {
        id: 'l3-g-u6-science-ex06',
        type: 'arrange-words',
        translationVi: 'Nghiên cứu gợi ý rằng đọc sách giúp trẻ thư giãn.',
        correctSentence: 'Research suggests that reading helps children relax.',
        extraWords: ['researches'],
        explanation: {
          vi: 'research không đếm được, không có dạng researches.',
          en: 'research is uncountable; there is no "researches".',
        },
      },
      {
        id: 'l3-g-u6-science-ex07',
        type: 'true-false',
        statement: '"Research suggests that…" sounds more careful than "Research proves that…".',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'suggest = gợi ý; prove = chứng minh chắc chắn.',
          en: 'suggest = indicates; prove = shows it is definitely true.',
        },
      },
      {
        id: 'l3-g-u6-science-ex08',
        type: 'listen-type',
        audioText: 'The researchers reached a clear conclusion.',
        acceptedAnswers: ['The researchers reached a clear conclusion.'],
        explanation: {
          vi: 'Chú ý -s trong researchers và -ed /t/ trong reached.',
          en: 'Notice the -s in researchers and the -ed /t/ in reached.',
        },
      },
      {
        id: 'l3-g-u6-science-ex09',
        type: 'speak-sentence',
        sentence: 'In the experiment, one group of plants got no light.',
        translationVi: 'Trong thí nghiệm, một nhóm cây không được chiếu sáng.',
        explanation: {
          vi: 'Nhấn ex-PER-iment; đọc rõ -ts trong plants.',
          en: 'Stress ex-PER-iment; say -ts clearly in plants.',
        },
      },
      {
        id: 'l3-g-u6-science-ex10',
        type: 'multiple-choice',
        question: '"Don\'t ___ to conclusions — we only asked ten people."',
        options: ['run', 'jump', 'reach', 'make'],
        correctIndex: 1,
        explanation: {
          vi: 'Thành ngữ jump to conclusions = vội kết luận.',
          en: 'The idiom is jump to conclusions = decide too quickly.',
        },
      },
      {
        id: 'l3-g-u6-science-ex11',
        type: 'speak-sentence',
        sentence: 'The experiment proved that the idea was wrong.',
        translationVi: 'Thí nghiệm đã chứng minh ý tưởng đó sai.',
        explanation: {
          vi: 'proved kết thúc bằng /vd/ — rung môi ở /v/.',
          en: 'proved ends in /vd/ — keep the /v/ voiced.',
        },
      },
      {
        id: 'l3-g-u6-science-ex12',
        type: 'speak-answer',
        question: 'Should governments spend more money on scientific research?',
        tipsVi:
          'Ý kiến + lý do + ví dụ. Dùng: research, breakthrough, discovery, researcher, evidence. Nhớ: research không đếm được, muốn đếm dùng study/studies.',
        sampleAnswer:
          "I believe they should, especially in medicine and agriculture. Many breakthroughs, like new vaccines or rice that grows in salty water, came from long-term research. Without government funding, talented researchers might move abroad. However, the money should go to projects with clear benefits, and the results should be shared with the public.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt có ví dụ cụ thể và một ý cân nhắc.',
          en: 'A strong answer has specific examples and a balancing point.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * 6. VẤN ĐỀ TOÀN CẦU
   * Từ: population growth, ageing population, poverty, unemployment, developing countries,
   *     access to, inequality, tackle
   * ======================================================================== */
  {
    id: 'l3-g-u6-global',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Các vấn đề toàn cầu', en: 'Global issues' },
    description: {
      vi: 'Từ vựng về dân số, già hoá, nghèo đói, thất nghiệp, bất bình đẳng và cách bàn giải pháp.',
      en: 'Words for population, ageing, poverty, unemployment and inequality, and how to discuss solutions.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về vấn đề xã hội', en: 'Chunks for social issues' },
        body: {
          vi: '**rapid population growth** = dân số tăng nhanh\n**an ageing population** = dân số già hoá\n**live in poverty** = sống trong nghèo đói\n**high unemployment** = tỉ lệ thất nghiệp cao\n**have access to** clean water / education = được tiếp cận nước sạch / giáo dục\n**tackle a problem** = giải quyết một vấn đề',
          en: '**rapid population growth**\n**an ageing population**\n**live in poverty**\n**high unemployment**\n**have access to** clean water / education\n**tackle a problem**',
        },
        examples: [
          { en: 'Many families in remote areas still live in poverty.', vi: 'Nhiều gia đình ở vùng sâu vùng xa vẫn sống trong nghèo đói.' },
          { en: 'Every child should have access to education.', vi: 'Mọi trẻ em đều nên được tiếp cận giáo dục.' },
        ],
      },
      {
        title: { vi: '"access" là danh từ: access to', en: '"access" as a noun: access to' },
        body: {
          vi: 'Trong IELTS, **access** thường là danh từ + **to**:\n**have / get / lack access to** + danh từ\nSai hay gặp: "access clean water" khi muốn nói "được tiếp cận" → nên nói "have **access to** clean water".\nTính từ **-ing** tả quá trình: **ageing** population, **developing** countries (đang phát triển); **developed** countries (đã phát triển).',
          en: 'In IELTS, **access** is often a noun + **to**:\n**have / get / lack access to** + noun\nCommon error: "access clean water" → "have **access to** clean water".\n**-ing** adjectives describe a process: **ageing** population, **developing** countries; **developed** countries are already rich.',
        },
        examples: [
          { en: 'Millions of people lack access to clean water.', vi: 'Hàng triệu người không được tiếp cận nước sạch.' },
          { en: 'Developing countries often have young populations.', vi: 'Các nước đang phát triển thường có dân số trẻ.' },
        ],
      },
      {
        title: { vi: 'Dùng trong IELTS: nguyên nhân → hậu quả → giải pháp', en: 'In IELTS: cause → effect → solution' },
        body: {
          vi: 'Đề Task 2 hay hỏi về một vấn đề xã hội. Viết theo chuỗi:\n**Nguyên nhân:** "**Unemployment** is often caused by a lack of skills."\n**Hậu quả:** "This can push families into **poverty**."\n**Giải pháp:** "Governments could **tackle** this by offering free training."',
          en: 'Task 2 often asks about a social problem. Write a chain:\n**Cause:** "**Unemployment** is often caused by a lack of skills."\n**Effect:** "This can push families into **poverty**."\n**Solution:** "Governments could **tackle** this by offering free training."',
        },
        examples: [
          { en: 'An ageing population puts pressure on hospitals.', vi: 'Dân số già hoá tạo áp lực lên bệnh viện.' },
          { en: 'Free job training could help tackle unemployment.', vi: 'Đào tạo nghề miễn phí có thể giúp giải quyết thất nghiệp.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-population-growth',
        word: 'population growth',
        ipa: '/ˌpɒp.jəˈleɪ.ʃən ɡrəʊθ/',
        partOfSpeech: 'noun',
        meaningVi: 'sự gia tăng dân số',
        definitionEn: 'An increase in the number of people living in a place.',
        examples: [
          { en: 'Rapid population growth makes cities very crowded.', vi: 'Dân số tăng nhanh khiến thành phố rất đông đúc.' },
          { en: 'Population growth in rural areas has slowed down.', vi: 'Sự gia tăng dân số ở nông thôn đã chậm lại.' },
        ],
        usageNote: {
          vi: 'Âm cuối của growth là /θ/ — đặt lưỡi giữa hai răng, đừng đọc thành "grốt".',
          en: 'growth ends in /θ/ — put your tongue between your teeth.',
        },
      },
      {
        id: 'l3-g-w2-ageing-population',
        word: 'ageing population',
        ipa: '/ˈeɪ.dʒɪŋ ˌpɒp.jəˈleɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'dân số già hoá',
        definitionEn: 'A population in which the number of older people is growing compared to younger people.',
        examples: [
          { en: 'Many countries have an ageing population.', vi: 'Nhiều nước có dân số đang già hoá.' },
          { en: 'An ageing population needs more doctors and carers.', vi: 'Dân số già hoá cần nhiều bác sĩ và người chăm sóc hơn.' },
        ],
        usageNote: {
          vi: 'Anh-Anh viết **ageing**, Anh-Mỹ viết **aging** — cả hai đúng.',
          en: 'British spelling **ageing**, American **aging** — both are correct.',
        },
      },
      {
        id: 'l3-g-w2-poverty',
        word: 'poverty',
        ipa: '/ˈpɒv.ə.ti/',
        partOfSpeech: 'noun',
        meaningVi: 'sự nghèo đói',
        definitionEn: 'The state of being very poor.',
        examples: [
          { en: 'Education is one of the best ways out of poverty.', vi: 'Giáo dục là một trong những con đường tốt nhất để thoát nghèo.' },
          { en: 'The number of people living in poverty has fallen.', vi: 'Số người sống trong nghèo đói đã giảm.' },
        ],
        usageNote: {
          vi: 'Không đếm được. Cụm: **live in poverty**, **reduce poverty**. Tính từ: **poor**.',
          en: 'Uncountable. Chunks: **live in poverty**, **reduce poverty**. Adjective: **poor**.',
        },
      },
      {
        id: 'l3-g-w2-unemployment',
        word: 'unemployment',
        ipa: '/ˌʌn.ɪmˈplɔɪ.mənt/',
        partOfSpeech: 'noun',
        meaningVi: 'tình trạng thất nghiệp',
        definitionEn: 'The situation of not having a job, or the number of people without jobs.',
        examples: [
          { en: 'Unemployment among young graduates is a big concern.', vi: 'Thất nghiệp ở cử nhân trẻ là một mối lo lớn.' },
          { en: 'The factory closed and unemployment in the town rose.', vi: 'Nhà máy đóng cửa và thất nghiệp trong thị trấn tăng lên.' },
        ],
        usageNote: {
          vi: 'Người thất nghiệp: **unemployed** (tính từ). Nhấn: un-em-**PLOY**-ment.',
          en: 'The person is **unemployed** (adjective). Stress un-em-**PLOY**-ment.',
        },
      },
      {
        id: 'l3-g-w2-developing-countries',
        word: 'developing countries',
        ipa: '/dɪˈvel.ə.pɪŋ ˈkʌn.triz/',
        partOfSpeech: 'noun',
        meaningVi: 'các nước đang phát triển',
        definitionEn: 'Countries that are poorer and are still building their economy and services.',
        examples: [
          { en: 'Many developing countries are investing in education.', vi: 'Nhiều nước đang phát triển đang đầu tư vào giáo dục.' },
          { en: 'Mobile banking has helped people in developing countries.', vi: 'Ngân hàng di động đã giúp người dân ở các nước đang phát triển.' },
        ],
        usageNote: {
          vi: 'Phân biệt: **developing** (đang phát triển) vs **developed** (đã phát triển).',
          en: 'Compare: **developing** (still growing) vs **developed** (already rich).',
        },
      },
      {
        id: 'l3-g-w2-access-to',
        word: 'access to',
        ipa: '/ˈæk.ses tə/',
        partOfSpeech: 'noun + preposition',
        meaningVi: 'sự tiếp cận, quyền được dùng (cái gì)',
        definitionEn: 'The chance or right to use or get something.',
        examples: [
          { en: 'Children in the mountains have limited access to the internet.', vi: 'Trẻ em vùng núi ít được tiếp cận internet.' },
          { en: 'Everyone should have access to basic healthcare.', vi: 'Mọi người đều nên được tiếp cận dịch vụ y tế cơ bản.' },
        ],
        usageNote: {
          vi: 'Cụm: **have / get / lack access to** + danh từ. Nhấn âm đầu: **AC**-cess.',
          en: 'Chunks: **have / get / lack access to** + noun. Stress **AC**-cess.',
        },
      },
      {
        id: 'l3-g-w2-inequality',
        word: 'inequality',
        ipa: '/ˌɪn.ɪˈkwɒl.ə.ti/',
        partOfSpeech: 'noun',
        meaningVi: 'sự bất bình đẳng',
        definitionEn: 'An unfair situation where some people have more money, chances or rights than others.',
        examples: [
          { en: 'The gap between rich and poor shows growing inequality.', vi: 'Khoảng cách giàu nghèo cho thấy bất bình đẳng ngày càng tăng.' },
          { en: 'Free schooling can reduce inequality.', vi: 'Giáo dục miễn phí có thể giảm bất bình đẳng.' },
        ],
      },
      {
        id: 'l3-g-w2-tackle',
        word: 'tackle',
        ipa: '/ˈtæk.əl/',
        partOfSpeech: 'verb',
        meaningVi: 'giải quyết, xử lý (vấn đề khó)',
        definitionEn: 'To make a serious effort to deal with a difficult problem.',
        examples: [
          { en: 'The city is building new homes to tackle overcrowding.', vi: 'Thành phố đang xây nhà mới để giải quyết tình trạng quá tải.' },
          { en: 'We need to tackle poverty in rural areas.', vi: 'Chúng ta cần giải quyết nghèo đói ở nông thôn.' },
        ],
        usageNote: {
          vi: 'Từ trang trọng hơn "solve" và hợp với IELTS Writing: **tackle a problem / an issue**.',
          en: 'More formal than "solve" and good for IELTS Writing: **tackle a problem / an issue**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u6-global-ex01',
        type: 'multiple-choice',
        question: 'A country where the number of old people is growing has…',
        options: ['population growth', 'an ageing population', 'high unemployment', 'inequality'],
        correctIndex: 1,
        explanation: {
          vi: 'Người già tăng so với người trẻ = an ageing population.',
          en: 'More older people compared to young = an ageing population.',
        },
      },
      {
        id: 'l3-g-u6-global-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa tiếng Việt.', en: 'Match the words with their Vietnamese meanings.' },
        pairs: [
          { left: 'poverty', right: 'nghèo đói' },
          { left: 'unemployment', right: 'thất nghiệp' },
          { left: 'inequality', right: 'bất bình đẳng' },
          { left: 'tackle', right: 'giải quyết' },
          { left: 'developing countries', right: 'các nước đang phát triển' },
        ],
        explanation: {
          vi: 'Nắm nghĩa trước rồi mới dùng trong câu.',
          en: 'Know the meanings before using them in sentences.',
        },
      },
      {
        id: 'l3-g-u6-global-ex03',
        type: 'fill-blank',
        sentence: 'Many villages in the mountains still lack access ___ clean water.',
        acceptedAnswers: ['to'],
        explanation: {
          vi: 'Cụm cố định: access to + danh từ.',
          en: 'Fixed phrase: access to + noun.',
        },
      },
      {
        id: 'l3-g-u6-global-ex04',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: [
          'Many families live in poverty.',
          'Many families live in a poverty.',
          'Many families live in poverties.',
          'Many families live on poverty.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'poverty không đếm được; cụm đúng là live in poverty.',
          en: 'poverty is uncountable; the chunk is live in poverty.',
        },
      },
      {
        id: 'l3-g-u6-global-ex05',
        type: 'fill-blank',
        sentence: 'Free job training could help the government ___ unemployment.',
        acceptedAnswers: ['tackle', 'reduce'],
        hint: '(t… = giải quyết)',
        explanation: {
          vi: 'tackle a problem = nỗ lực giải quyết vấn đề.',
          en: 'tackle a problem = try hard to deal with it.',
        },
      },
      {
        id: 'l3-g-u6-global-ex06',
        type: 'arrange-words',
        translationVi: 'Dân số già hoá tạo áp lực lên bệnh viện.',
        correctSentence: 'An ageing population puts pressure on hospitals.',
        extraWords: ['aged'],
        explanation: {
          vi: 'ageing (đang già đi) tả quá trình; cụm put pressure on.',
          en: 'ageing describes a process; the chunk is put pressure on.',
        },
      },
      {
        id: 'l3-g-u6-global-ex07',
        type: 'true-false',
        statement: '"Developed countries" and "developing countries" mean the same thing.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'developed = đã phát triển; developing = đang phát triển.',
          en: 'developed = already rich; developing = still growing.',
        },
      },
      {
        id: 'l3-g-u6-global-ex08',
        type: 'listen-choose',
        audioText: 'After the factory closed, almost half of the young people in my hometown could not find work.',
        question: 'What problem does the speaker describe?',
        options: ['poverty in big cities', 'high unemployment', 'an ageing population', 'population growth'],
        correctIndex: 1,
        explanation: {
          vi: '"could not find work" = thất nghiệp.',
          en: '"could not find work" = unemployment.',
        },
      },
      {
        id: 'l3-g-u6-global-ex09',
        type: 'speak-sentence',
        sentence: 'Rapid population growth makes cities very crowded.',
        translationVi: 'Dân số tăng nhanh khiến thành phố rất đông đúc.',
        explanation: {
          vi: 'Đọc rõ /θ/ cuối growth và -s trong makes, cities.',
          en: 'Say the /θ/ in growth and the -s in makes and cities.',
        },
      },
      {
        id: 'l3-g-u6-global-ex10',
        type: 'multiple-choice',
        question: '"When some people earn a hundred times more than others, there is a lot of ___."',
        options: ['inequality', 'access', 'growth', 'tackle'],
        correctIndex: 0,
        explanation: {
          vi: 'Chênh lệch giàu nghèo lớn = inequality (bất bình đẳng).',
          en: 'A big gap between rich and poor = inequality.',
        },
      },
      {
        id: 'l3-g-u6-global-ex11',
        type: 'speak-sentence',
        sentence: 'Everyone should have access to basic healthcare.',
        translationVi: 'Mọi người đều nên được tiếp cận dịch vụ y tế cơ bản.',
        explanation: {
          vi: 'Nhấn AC-cess; "to" đọc nhẹ /tə/.',
          en: 'Stress AC-cess; say a weak "to" /tə/.',
        },
      },
      {
        id: 'l3-g-u6-global-ex12',
        type: 'speak-answer',
        question: 'What problems can an ageing population cause, and how can countries deal with them?',
        tipsVi:
          'Đi theo chuỗi: hậu quả → giải pháp. Dùng: ageing population, tackle, access to, unemployment hoặc pressure on. Có thể nhắc ông bà trong gia đình bạn.',
        sampleAnswer:
          "An ageing population can put a lot of pressure on hospitals and pension systems, because fewer young people are working to support more retired people. To tackle this, countries could encourage older people to stay active and work part-time if they want. They should also make sure the elderly have access to affordable healthcare and community centres, so families like mine get some support.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu trả lời tốt nêu hậu quả rõ ràng và giải pháp cụ thể.',
          en: 'A strong answer gives clear effects and specific solutions.',
        },
      },
    ],
    miniTest: [],
  },
]
