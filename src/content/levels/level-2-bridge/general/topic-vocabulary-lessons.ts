/**
 * topic-vocabulary-lessons.ts — LEVEL 2 (phần 3.0 – 4.0) · TRACK GENERAL — TỪ VỰNG THEO CHỦ ĐỀ CÒN THIẾU
 * ----------------------------------------------------------------------------
 * 3 bài từ vựng (mode 'practice') cho các chủ đề IELTS quen thuộc mà lộ trình cũ chưa dạy
 * ở trình độ A2 – B1 (xem docs/redesign-v3/11-CONTENT-GAPS.md):
 *
 *   l2b-g-05-city    Cuộc sống thành phố & khu phố (neighbourhood, crowded, traffic jam…)
 *   l2b-g-05-nature  Thiên nhiên & động vật (wildlife, endangered, habitat…)
 *   l2b-g-05-family  Gia đình & các mối quan hệ (relative, get on well with, look after…)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ (cụm từ đi kèm, 1 điểm ngữ pháp/cách dùng nhỏ, mẹo nói)
 *   - words         : 7 từ/cụm từ (IPA Anh-Anh, nghĩa, 2 câu ví dụ, ghi chú)
 *   - exercises     : 11 bài (chọn, điền, ghép, sắp xếp, nghe, 1–2 bài đọc to, 1 bài trả lời nói kiểu Part 1)
 *   - miniTest      : [] (kiểm tra ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l2b-g-05-<chủ đề>", bài tập "...-ex<số>", từ "l2b-g-w2-<từ>".
 * Toàn bộ nội dung tự soạn, không chép sách.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralTopicVocabularyLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — CUỘC SỐNG THÀNH PHỐ & KHU PHỐ
   * Từ: neighbourhood, crowded, traffic jam, public transport, facilities, convenient, peaceful
   * ======================================================================== */
  {
    id: 'l2b-g-05-city',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 11,
    title: { vi: 'Cuộc sống thành phố & khu phố', en: 'City life & neighbourhoods' },
    description: {
      vi: 'Tả khu bạn sống: đông đúc hay yên tĩnh, tiện lợi ra sao, đi lại thế nào.',
      en: 'Describe where you live: busy or quiet, how convenient it is and how you get around.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về thành phố', en: 'City chunks' },
        body: {
          vi: '**get stuck in a traffic jam** = bị kẹt xe\n**take / use public transport** = đi phương tiện công cộng\n**local facilities** = tiện ích quanh khu (chợ, trường, công viên)\n**within walking distance** = đi bộ tới được\nHọc cả cụm, đừng học từng chữ rời.',
          en: '**get stuck in a traffic jam** = be unable to move in traffic\n**take / use public transport** = travel by bus, train, metro\n**local facilities** = places near you (markets, schools, parks)\n**within walking distance** = close enough to walk\nLearn the whole chunk, not single words.',
        },
        examples: [
          { en: 'I got stuck in a traffic jam for an hour yesterday.', vi: 'Hôm qua tôi bị kẹt xe một tiếng.' },
          { en: 'The market is within walking distance of my house.', vi: 'Chợ ở gần nhà tôi, đi bộ tới được.' },
        ],
      },
      {
        title: { vi: 'Too, very và enough', en: 'Too, very and enough' },
        body: {
          vi: '**very** + tính từ = rất (trung tính): very crowded.\n**too** + tính từ = quá mức, **gây vấn đề**: too noisy to sleep.\n**tính từ + enough** = đủ: big enough. **not + tính từ + enough** = chưa đủ.\nSai: "enough big" → Đúng: "**big enough**".',
          en: '**very** + adjective = neutral: very crowded.\n**too** + adjective = more than you want, **a problem**: too noisy to sleep.\n**adjective + enough** = sufficient: big enough. **not + adjective + enough** = not sufficient.\nWrong: "enough big" → Right: "**big enough**".',
        },
        examples: [
          { en: 'My street is too noisy at night.', vi: 'Đường nhà tôi ban đêm quá ồn.' },
          { en: 'The park isn\'t big enough for all the children.', vi: 'Công viên không đủ rộng cho tất cả trẻ em.' },
        ],
      },
      {
        title: { vi: 'Mẹo nói: khen + chê', en: 'Speaking tip: one good point, one bad point' },
        body: {
          vi: 'Khi được hỏi về khu bạn sống, đừng chỉ nói "It\'s good." Hãy nói **1 điểm tốt + 1 điểm chưa tốt**:\n"It\'s very **convenient** because…, but it can be quite **crowded** at…"\nTừ **but** và **quite** giúp câu trả lời tự nhiên, cân bằng.',
          en: 'When asked about your area, don\'t just say "It\'s good." Give **one good point + one bad point**:\n"It\'s very **convenient** because…, but it can be quite **crowded** at…"\n**but** and **quite** make your answer natural and balanced.',
        },
        examples: [
          { en: 'My neighbourhood is very convenient, but it can be quite noisy at weekends.', vi: 'Khu tôi ở rất tiện lợi, nhưng cuối tuần có thể khá ồn.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w2-neighbourhood',
        word: 'neighbourhood',
        ipa: '/ˈneɪ.bə.hʊd/',
        partOfSpeech: 'noun',
        meaningVi: 'khu phố, khu dân cư',
        definitionEn: 'The area around your home and the people who live there.',
        examples: [
          { en: 'I have lived in this neighbourhood since I was born.', vi: 'Tôi sống ở khu phố này từ khi mới sinh.' },
          { en: 'Our neighbourhood has a small lake and a night market.', vi: 'Khu phố chúng tôi có một hồ nhỏ và một chợ đêm.' },
        ],
        usageNote: {
          vi: 'Kiểu Mỹ viết **neighborhood** (không có u). Chữ "gh" câm.',
          en: 'American spelling is **neighborhood**. The "gh" is silent.',
        },
      },
      {
        id: 'l2b-g-w2-crowded',
        word: 'crowded',
        ipa: '/ˈkraʊ.dɪd/',
        partOfSpeech: 'adjective',
        meaningVi: 'đông đúc, chật người',
        definitionEn: 'Full of people.',
        examples: [
          { en: 'The buses are very crowded in the morning.', vi: 'Xe buýt buổi sáng rất đông.' },
          { en: 'The beach was too crowded, so we went home.', vi: 'Bãi biển quá đông nên chúng tôi về nhà.' },
        ],
        usageNote: {
          vi: 'Đuôi -ed ở đây đọc /ɪd/: crowd-**id**.',
          en: 'The -ed ending is pronounced /ɪd/: crowd-**id**.',
        },
      },
      {
        id: 'l2b-g-w2-traffic-jam',
        word: 'traffic jam',
        ipa: '/ˈtræf.ɪk dʒæm/',
        partOfSpeech: 'noun',
        meaningVi: 'tắc đường, kẹt xe',
        definitionEn: 'A long line of cars and motorbikes that cannot move.',
        examples: [
          { en: 'There is always a traffic jam near my school at five o\'clock.', vi: 'Gần trường tôi lúc 5 giờ lúc nào cũng tắc đường.' },
          { en: 'We were late because of a traffic jam on the bridge.', vi: 'Chúng tôi bị muộn vì kẹt xe trên cầu.' },
        ],
      },
      {
        id: 'l2b-g-w2-public-transport',
        word: 'public transport',
        ipa: '/ˌpʌb.lɪk ˈtræn.spɔːt/',
        partOfSpeech: 'noun',
        meaningVi: 'phương tiện giao thông công cộng',
        definitionEn: 'Buses, trains and metros that everyone can use.',
        examples: [
          { en: 'More people should use public transport to reduce traffic.', vi: 'Nên có nhiều người đi phương tiện công cộng hơn để giảm kẹt xe.' },
          { en: 'Public transport in my city is cheap but slow.', vi: 'Phương tiện công cộng ở thành phố tôi rẻ nhưng chậm.' },
        ],
        usageNote: {
          vi: 'Danh từ **không đếm được**: không nói "a public transport".',
          en: '**Uncountable**: don\'t say "a public transport".',
        },
      },
      {
        id: 'l2b-g-w2-facilities',
        word: 'facilities',
        ipa: '/fəˈsɪl.ə.tiz/',
        partOfSpeech: 'noun (plural)',
        meaningVi: 'tiện ích, cơ sở vật chất',
        definitionEn: 'Buildings and services for people to use, such as parks, gyms and hospitals.',
        examples: [
          { en: 'My area has good facilities, like a hospital and a sports centre.', vi: 'Khu tôi có tiện ích tốt, như bệnh viện và trung tâm thể thao.' },
          { en: 'The new school has modern facilities.', vi: 'Trường mới có cơ sở vật chất hiện đại.' },
        ],
        usageNote: {
          vi: 'Thường dùng **số nhiều**: facilities. Nhấn âm thứ 2: fa-**CIL**-i-ties.',
          en: 'Usually **plural**: facilities. Stress the second syllable: fa-**CIL**-i-ties.',
        },
      },
      {
        id: 'l2b-g-w2-convenient',
        word: 'convenient',
        ipa: '/kənˈviː.ni.ənt/',
        partOfSpeech: 'adjective',
        meaningVi: 'tiện lợi, thuận tiện',
        definitionEn: 'Easy to use or reach; it saves you time.',
        examples: [
          { en: 'Living near the metro is very convenient.', vi: 'Sống gần ga tàu điện rất tiện.' },
          { en: 'Is Saturday morning convenient for you?', vi: 'Sáng thứ Bảy có tiện cho bạn không?' },
        ],
      },
      {
        id: 'l2b-g-w2-peaceful',
        word: 'peaceful',
        ipa: '/ˈpiːs.fəl/',
        partOfSpeech: 'adjective',
        meaningVi: 'yên bình, yên tĩnh',
        definitionEn: 'Quiet and calm, with no noise or trouble.',
        examples: [
          { en: 'My grandparents\' village is very peaceful.', vi: 'Làng của ông bà tôi rất yên bình.' },
          { en: 'The park is peaceful early in the morning.', vi: 'Công viên yên tĩnh vào sáng sớm.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-05-city-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa tiếng Việt.', en: 'Match each word with its Vietnamese meaning.' },
        pairs: [
          { left: 'crowded', right: 'đông đúc' },
          { left: 'peaceful', right: 'yên bình' },
          { left: 'convenient', right: 'tiện lợi' },
          { left: 'facilities', right: 'tiện ích' },
          { left: 'neighbourhood', right: 'khu phố' },
        ],
        explanation: { vi: 'Đây là 5 từ chính để tả nơi bạn sống.', en: 'These are five key words to describe where you live.' },
      },
      {
        id: 'l2b-g-05-city-ex02',
        type: 'multiple-choice',
        question: 'I was late for work because I got stuck in a ___.',
        options: ['traffic jam', 'public transport', 'facility', 'neighbourhood'],
        correctIndex: 0,
        explanation: { vi: 'get stuck in a traffic jam = bị kẹt xe.', en: 'get stuck in a traffic jam = unable to move in traffic.' },
      },
      {
        id: 'l2b-g-05-city-ex03',
        type: 'fill-blank',
        sentence: 'The supermarket is within walking ___ of my flat.',
        acceptedAnswers: ['distance'],
        explanation: { vi: 'within walking distance = đi bộ tới được.', en: 'within walking distance = close enough to walk.' },
      },
      {
        id: 'l2b-g-05-city-ex04',
        type: 'multiple-choice',
        question: 'My room is ___ noisy. I can\'t sleep at night.',
        options: ['enough', 'too', 'very enough', 'so much'],
        correctIndex: 1,
        explanation: { vi: '"too" = quá mức, gây vấn đề (không ngủ được).', en: '"too" = more than you want; it causes a problem.' },
      },
      {
        id: 'l2b-g-05-city-ex05',
        type: 'arrange-words',
        translationVi: 'Căn hộ của chúng tôi không đủ rộng cho cả gia đình.',
        correctSentence: "Our flat isn't big enough for the whole family.",
        extraWords: ['too'],
        explanation: { vi: 'Tính từ đứng TRƯỚC enough: big enough.', en: 'The adjective comes BEFORE enough: big enough.' },
      },
      {
        id: 'l2b-g-05-city-ex06',
        type: 'fill-blank',
        sentence: 'Buses and the metro are the main types of public ___ in my city.',
        acceptedAnswers: ['transport'],
        explanation: { vi: 'public transport = phương tiện công cộng.', en: 'public transport = buses, trains and metros.' },
      },
      {
        id: 'l2b-g-05-city-ex07',
        type: 'true-false',
        statement: '"There is a public transport near my house." is a correct sentence.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: { vi: '"public transport" không đếm được → không dùng "a".', en: '"public transport" is uncountable → no "a".' },
      },
      {
        id: 'l2b-g-05-city-ex08',
        type: 'listen-choose',
        audioText: 'I love my neighbourhood because everything is close. The only problem is that the streets are very crowded in the evening.',
        question: 'What does the speaker NOT like?',
        options: ['The distance to shops', 'The crowded streets', 'The lack of facilities', 'The quiet evenings'],
        correctIndex: 1,
        explanation: { vi: '"The only problem is… very crowded" = điểm không thích.', en: '"The only problem is… very crowded" is the negative point.' },
      },
      {
        id: 'l2b-g-05-city-ex09',
        type: 'speak-sentence',
        sentence: 'My neighbourhood is very convenient, but it can be quite crowded.',
        translationVi: 'Khu tôi ở rất tiện lợi, nhưng có thể khá đông đúc.',
        explanation: { vi: 'Nhấn "con-VEN-ient" và đọc rõ /ɪd/ cuối "crowded".', en: 'Stress "con-VEN-ient" and say the /ɪd/ in "crowded".' },
      },
      {
        id: 'l2b-g-05-city-ex10',
        type: 'speak-sentence',
        sentence: 'There are good facilities within walking distance.',
        translationVi: 'Có nhiều tiện ích tốt trong phạm vi đi bộ.',
        explanation: { vi: 'Nhấn "fa-CIL-i-ties", nối "within walking".', en: 'Stress "fa-CIL-i-ties" and link "within walking".' },
      },
      {
        id: 'l2b-g-05-city-ex11',
        type: 'speak-answer',
        question: 'Do you like the area where you live? Why or why not?',
        tipsVi: 'Trả lời 2–3 câu: ý chính + 1 điểm tốt + 1 điểm chưa tốt. Dùng convenient, crowded, facilities, but.',
        sampleAnswer:
          'Yes, I mostly like it. My neighbourhood is very convenient because there is a market and a school within walking distance. However, the main road gets crowded in the evening, and there is often a traffic jam.',
        recordSeconds: 40,
        explanation: { vi: 'Câu trả lời tốt có ý kiến, lý do và một điểm đối lập với "but/however".', en: 'A good answer has an opinion, a reason and a contrast with "but/however".' },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — THIÊN NHIÊN & ĐỘNG VẬT
   * Từ: wildlife, endangered, habitat, protect, countryside, pet, species
   * ======================================================================== */
  {
    id: 'l2b-g-05-nature',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 11,
    title: { vi: 'Thiên nhiên & động vật', en: 'Nature & animals' },
    description: {
      vi: 'Nói về động vật hoang dã, thú cưng, vùng quê và việc bảo vệ thiên nhiên.',
      en: 'Talk about wild animals, pets, the countryside and protecting nature.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm từ về thiên nhiên', en: 'Nature chunks' },
        body: {
          vi: '**an endangered species** = loài có nguy cơ tuyệt chủng\n**lose their habitat** = mất môi trường sống\n**protect the environment / wildlife** = bảo vệ môi trường / động vật hoang dã\n**keep a pet** = nuôi thú cưng\n**in the countryside** = ở vùng quê (luôn có **the**).',
          en: '**an endangered species** = a type of animal that may disappear\n**lose their habitat** = lose the place where they live\n**protect the environment / wildlife**\n**keep a pet** = have an animal at home\n**in the countryside** = outside towns (always with **the**).',
        },
        examples: [
          { en: 'Many birds are losing their habitat because of new roads.', vi: 'Nhiều loài chim đang mất môi trường sống vì đường mới.' },
          { en: 'My family keeps two cats as pets.', vi: 'Nhà tôi nuôi hai con mèo làm thú cưng.' },
        ],
      },
      {
        title: { vi: 'Species và wildlife: đếm thế nào?', en: 'Species and wildlife: how do we count them?' },
        body: {
          vi: '**species** giống nhau ở **số ít và số nhiều**: one species, ten species.\n**wildlife** là danh từ **không đếm được**: much wildlife, không nói "wildlifes".\n**animal** thì đếm được bình thường: an animal, many animals.',
          en: '**species** is the **same in singular and plural**: one species, ten species.\n**wildlife** is **uncountable**: a lot of wildlife, never "wildlifes".\n**animal** is a normal countable noun: an animal, many animals.',
        },
        examples: [
          { en: 'This forest is home to over two hundred species of birds.', vi: 'Khu rừng này là nhà của hơn 200 loài chim.' },
          { en: 'There is a lot of wildlife in the national park.', vi: 'Vườn quốc gia có rất nhiều động vật hoang dã.' },
        ],
      },
      {
        title: { vi: 'Mẹo nói: kể ví dụ thật', en: 'Speaking tip: give a real example' },
        body: {
          vi: 'Khi nói về thiên nhiên, hãy thêm **một ví dụ cụ thể** từ Việt Nam hoặc trải nghiệm của bạn:\n"For example, in Cuc Phuong National Park you can see…"\nVí dụ cụ thể làm câu trả lời **dài hơn và đáng tin hơn**.',
          en: 'When you talk about nature, add **one specific example** from Vietnam or your own life:\n"For example, in Cuc Phuong National Park you can see…"\nA real example makes your answer **longer and more convincing**.',
        },
        examples: [
          { en: 'For example, my village has a river where children catch small fish.', vi: 'Ví dụ, làng tôi có một con sông nơi trẻ con bắt cá nhỏ.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w2-wildlife',
        word: 'wildlife',
        ipa: '/ˈwaɪld.laɪf/',
        partOfSpeech: 'noun',
        meaningVi: 'động vật hoang dã, đời sống hoang dã',
        definitionEn: 'Animals, birds and plants that live in nature, not with people.',
        examples: [
          { en: 'The national park has a lot of wildlife.', vi: 'Vườn quốc gia có rất nhiều động vật hoang dã.' },
          { en: 'Plastic in the sea is dangerous for wildlife.', vi: 'Rác nhựa ở biển gây nguy hiểm cho động vật hoang dã.' },
        ],
        usageNote: { vi: 'Không đếm được: không có "a wildlife" hay "wildlifes".', en: 'Uncountable: no "a wildlife" or "wildlifes".' },
      },
      {
        id: 'l2b-g-w2-endangered',
        word: 'endangered',
        ipa: '/ɪnˈdeɪn.dʒəd/',
        partOfSpeech: 'adjective',
        meaningVi: 'có nguy cơ tuyệt chủng',
        definitionEn: 'In danger of disappearing from the world.',
        examples: [
          { en: 'Some turtles in Vietnam are endangered.', vi: 'Một số loài rùa ở Việt Nam có nguy cơ tuyệt chủng.' },
          { en: 'We must protect endangered animals.', vi: 'Chúng ta phải bảo vệ các loài động vật có nguy cơ tuyệt chủng.' },
        ],
      },
      {
        id: 'l2b-g-w2-habitat',
        word: 'habitat',
        ipa: '/ˈhæb.ɪ.tæt/',
        partOfSpeech: 'noun',
        meaningVi: 'môi trường sống (của động vật, cây)',
        definitionEn: 'The natural place where an animal or plant lives.',
        examples: [
          { en: 'The forest is the natural habitat of many monkeys.', vi: 'Rừng là môi trường sống tự nhiên của nhiều loài khỉ.' },
          { en: 'Animals lose their habitat when people cut down trees.', vi: 'Động vật mất môi trường sống khi con người chặt cây.' },
        ],
      },
      {
        id: 'l2b-g-w2-protect',
        word: 'protect',
        ipa: '/prəˈtekt/',
        partOfSpeech: 'verb',
        meaningVi: 'bảo vệ',
        definitionEn: 'To keep someone or something safe from harm.',
        examples: [
          { en: 'Volunteers clean the beach to protect sea turtles.', vi: 'Tình nguyện viên dọn bãi biển để bảo vệ rùa biển.' },
          { en: 'Trees protect the village from strong winds.', vi: 'Cây cối bảo vệ làng khỏi gió mạnh.' },
        ],
        usageNote: { vi: 'Cấu trúc: protect **something from** something.', en: 'Pattern: protect **something from** something.' },
      },
      {
        id: 'l2b-g-w2-countryside',
        word: 'countryside',
        ipa: '/ˈkʌn.tri.saɪd/',
        partOfSpeech: 'noun',
        meaningVi: 'vùng nông thôn, miền quê',
        definitionEn: 'Land with fields, farms and villages, away from towns.',
        examples: [
          { en: 'My grandparents live in the countryside.', vi: 'Ông bà tôi sống ở miền quê.' },
          { en: 'The air in the countryside is much cleaner.', vi: 'Không khí ở miền quê trong lành hơn nhiều.' },
        ],
        usageNote: { vi: 'Luôn nói **the countryside**.', en: 'Always say **the countryside**.' },
      },
      {
        id: 'l2b-g-w2-pet',
        word: 'pet',
        ipa: '/pet/',
        partOfSpeech: 'noun',
        meaningVi: 'thú cưng',
        definitionEn: 'An animal that you keep at home and look after.',
        examples: [
          { en: 'Dogs are the most popular pets in my street.', vi: 'Chó là thú cưng phổ biến nhất trong phố tôi.' },
          { en: 'Having a pet teaches children to be responsible.', vi: 'Nuôi thú cưng dạy trẻ biết có trách nhiệm.' },
        ],
      },
      {
        id: 'l2b-g-w2-species',
        word: 'species',
        ipa: '/ˈspiː.ʃiːz/',
        partOfSpeech: 'noun',
        meaningVi: 'loài (động vật, thực vật)',
        definitionEn: 'A group of animals or plants of the same type.',
        examples: [
          { en: 'Scientists found a new species of frog in the mountains.', vi: 'Các nhà khoa học tìm thấy một loài ếch mới trên núi.' },
          { en: 'Many species of fish live in this river.', vi: 'Nhiều loài cá sống ở con sông này.' },
        ],
        usageNote: { vi: 'Số ít và số nhiều đều là **species**.', en: 'Singular and plural are both **species**.' },
      },
    ],
    exercises: [
      {
        id: 'l2b-g-05-nature-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa.', en: 'Match each word with its meaning.' },
        pairs: [
          { left: 'habitat', right: 'the natural home of an animal' },
          { left: 'endangered', right: 'in danger of disappearing' },
          { left: 'pet', right: 'an animal you keep at home' },
          { left: 'countryside', right: 'land with farms and villages' },
          { left: 'protect', right: 'keep safe from harm' },
        ],
        explanation: { vi: 'Năm từ quan trọng nhất của chủ đề thiên nhiên.', en: 'Five key words for the topic of nature.' },
      },
      {
        id: 'l2b-g-05-nature-ex02',
        type: 'multiple-choice',
        question: 'The saola is an ___ species. There are very few left.',
        options: ['endangered', 'crowded', 'convenient', 'peaceful'],
        correctIndex: 0,
        explanation: { vi: '"very few left" = còn rất ít → có nguy cơ tuyệt chủng.', en: '"very few left" → in danger of disappearing → endangered.' },
      },
      {
        id: 'l2b-g-05-nature-ex03',
        type: 'fill-blank',
        sentence: 'Many animals lose their ___ when forests are cut down.',
        acceptedAnswers: ['habitat', 'habitats'],
        explanation: { vi: 'lose their habitat = mất môi trường sống.', en: 'lose their habitat = lose the place where they live.' },
      },
      {
        id: 'l2b-g-05-nature-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'We saw many wildlifes in the park.',
          'We saw a lot of wildlife in the park.',
          'We saw a wildlife in the park.',
          'We saw much wildlifes in the park.',
        ],
        correctIndex: 1,
        explanation: { vi: '"wildlife" không đếm được → a lot of wildlife.', en: '"wildlife" is uncountable → a lot of wildlife.' },
      },
      {
        id: 'l2b-g-05-nature-ex05',
        type: 'fill-blank',
        sentence: 'My aunt lives in the ___, far from the noisy city.',
        acceptedAnswers: ['countryside'],
        explanation: { vi: 'in the countryside = ở vùng quê.', en: 'in the countryside = away from towns.' },
      },
      {
        id: 'l2b-g-05-nature-ex06',
        type: 'true-false',
        statement: 'The plural of "species" is "specieses".',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: { vi: 'Số nhiều vẫn là "species".', en: 'The plural is still "species".' },
      },
      {
        id: 'l2b-g-05-nature-ex07',
        type: 'arrange-words',
        translationVi: 'Chúng ta nên bảo vệ rừng khỏi cháy.',
        correctSentence: 'We should protect the forest from fire.',
        extraWords: ['for'],
        explanation: { vi: 'protect something from something.', en: 'protect something from something.' },
      },
      {
        id: 'l2b-g-05-nature-ex08',
        type: 'listen-type',
        audioText: 'Many people in the city keep a cat or a dog as a pet.',
        acceptedAnswers: ['Many people in the city keep a cat or a dog as a pet.'],
        explanation: { vi: 'keep ... as a pet = nuôi ... làm thú cưng.', en: 'keep ... as a pet = have it at home.' },
      },
      {
        id: 'l2b-g-05-nature-ex09',
        type: 'multiple-choice',
        question: 'Volunteers clean the beach to ___ sea turtles.',
        options: ['protect', 'lose', 'keep up', 'endanger'],
        correctIndex: 0,
        explanation: { vi: 'Dọn bãi biển giúp rùa an toàn → protect.', en: 'Cleaning the beach keeps turtles safe → protect.' },
      },
      {
        id: 'l2b-g-05-nature-ex10',
        type: 'speak-sentence',
        sentence: 'We need to protect endangered species and their habitats.',
        translationVi: 'Chúng ta cần bảo vệ các loài có nguy cơ tuyệt chủng và môi trường sống của chúng.',
        explanation: { vi: 'Nói rõ /kt/ cuối "protect" và /s/ cuối "habitats".', en: 'Say the final /kt/ in "protect" and /s/ in "habitats".' },
      },
      {
        id: 'l2b-g-05-nature-ex11',
        type: 'speak-answer',
        question: 'Do you prefer spending time in the city or in the countryside? Why?',
        tipsVi: 'Chọn 1 nơi + lý do + 1 ví dụ thật. Dùng countryside, peaceful, wildlife, crowded.',
        sampleAnswer:
          'I prefer the countryside, especially at weekends. It is peaceful and the air is clean. For example, at my grandparents\' farm I can walk by the river and see lots of birds. The city is convenient, but it is too crowded for me.',
        recordSeconds: 40,
        explanation: { vi: 'Câu trả lời có lựa chọn rõ, lý do và ví dụ cụ thể.', en: 'The answer gives a clear choice, a reason and a real example.' },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — GIA ĐÌNH & CÁC MỐI QUAN HỆ
   * Từ: relative, close, get on well with, look after, grow up, bring up, generation
   * ======================================================================== */
  {
    id: 'l2b-g-05-family',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 11,
    title: { vi: 'Gia đình & các mối quan hệ', en: 'Family & relationships' },
    description: {
      vi: 'Nói về họ hàng, ai thân với ai, ai chăm sóc ai và gia đình nhiều thế hệ.',
      en: 'Talk about relatives, who you are close to, who looks after whom and families with several generations.',
    },
    teachingCards: [
      {
        title: { vi: 'Cụm động từ về gia đình', en: 'Family phrasal verbs' },
        body: {
          vi: '**get on well with** sb = hợp, quý mến ai\n**look after** sb = chăm sóc ai\n**grow up** = lớn lên (không có tân ngữ)\n**bring up** sb = nuôi dạy ai (bố mẹ bring up con cái)\nSo sánh: I **grew up** in Hue. My grandmother **brought me up**.',
          en: '**get on well with** someone = have a friendly relationship\n**look after** someone = take care of them\n**grow up** = become an adult (no object)\n**bring up** someone = raise a child\nCompare: I **grew up** in Hue. My grandmother **brought me up**.',
        },
        examples: [
          { en: 'I get on well with my older brother.', vi: 'Tôi rất hợp với anh trai.' },
          { en: 'My mother looks after my baby sister during the day.', vi: 'Mẹ tôi trông em gái tôi vào ban ngày.' },
        ],
      },
      {
        title: { vi: 'Close: tính từ "thân"', en: 'Close: the adjective for "near" in feelings' },
        body: {
          vi: '**be close to** sb = thân với ai. Đọc /kləʊs/ (âm **s**), khác động từ "close the door" /kləʊz/.\n**a close family** = gia đình gắn bó\n**a close friend** = bạn thân\nNói mức độ: **very close**, **quite close**, **not very close**.',
          en: '**be close to** someone = have a strong, warm relationship. Say /kləʊs/ (with **s**), not the verb "close the door" /kləʊz/.\n**a close family** · **a close friend**\nShow the degree: **very close**, **quite close**, **not very close**.',
        },
        examples: [
          { en: 'I am very close to my grandfather.', vi: 'Tôi rất thân với ông nội.' },
          { en: 'We are a close family, so we eat dinner together every night.', vi: 'Nhà tôi gắn bó nên tối nào cũng ăn cơm cùng nhau.' },
        ],
      },
      {
        title: { vi: 'Mẹo nói: so sánh các thế hệ', en: 'Speaking tip: compare generations' },
        body: {
          vi: 'Câu hỏi về gia đình thường mở ra so sánh **thế hệ**:\n"In my **parents\' generation**, people usually…, but nowadays…"\nCâu này giúp bạn nói dài hơn và dùng được nhiều thì (quá khứ + hiện tại).',
          en: 'Family questions often lead to comparing **generations**:\n"In my **parents\' generation**, people usually…, but nowadays…"\nThis helps you speak for longer and use different tenses (past + present).',
        },
        examples: [
          { en: 'In my grandparents\' generation, families had five or six children, but now most have two.', vi: 'Thời ông bà tôi, mỗi nhà có 5–6 con, nhưng giờ phần lớn chỉ có hai.' },
        ],
      },
    ],
    words: [
      {
        id: 'l2b-g-w2-relative',
        word: 'relative',
        ipa: '/ˈrel.ə.tɪv/',
        partOfSpeech: 'noun',
        meaningVi: 'họ hàng, người thân',
        definitionEn: 'A person in your family, such as an aunt, uncle or cousin.',
        examples: [
          { en: 'We visit our relatives in the countryside during Tet.', vi: 'Chúng tôi về thăm họ hàng ở quê vào dịp Tết.' },
          { en: 'Most of my relatives live in Nghe An.', vi: 'Phần lớn họ hàng tôi sống ở Nghệ An.' },
        ],
      },
      {
        id: 'l2b-g-w2-close',
        word: 'close',
        ipa: '/kləʊs/',
        partOfSpeech: 'adjective',
        meaningVi: 'thân thiết, gắn bó',
        definitionEn: 'Having a strong, loving relationship with someone.',
        examples: [
          { en: 'My sister and I are very close.', vi: 'Chị tôi và tôi rất thân nhau.' },
          { en: 'She has a few close friends from primary school.', vi: 'Cô ấy có vài người bạn thân từ hồi tiểu học.' },
        ],
        usageNote: { vi: 'Tính từ đọc /kləʊs/; động từ "đóng" đọc /kləʊz/.', en: 'The adjective is /kləʊs/; the verb "shut" is /kləʊz/.' },
      },
      {
        id: 'l2b-g-w2-get-on-well-with',
        word: 'get on well with',
        ipa: '/ɡet ɒn ˈwel wɪð/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'hợp với, hoà thuận với',
        definitionEn: 'To like someone and have a friendly relationship with them.',
        examples: [
          { en: 'I get on well with my cousins.', vi: 'Tôi rất hợp với các anh chị em họ.' },
          { en: 'Do you get on well with your neighbours?', vi: 'Bạn có hoà thuận với hàng xóm không?' },
        ],
      },
      {
        id: 'l2b-g-w2-look-after',
        word: 'look after',
        ipa: '/lʊk ˈɑːf.tə/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'chăm sóc, trông nom',
        definitionEn: 'To take care of someone or something.',
        examples: [
          { en: 'My grandmother looks after me when my parents are at work.', vi: 'Bà trông tôi khi bố mẹ đi làm.' },
          { en: 'Who will look after your dog while you are away?', vi: 'Ai sẽ trông con chó khi bạn đi vắng?' },
        ],
      },
      {
        id: 'l2b-g-w2-grow-up',
        word: 'grow up',
        ipa: '/ɡrəʊ ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'lớn lên, trưởng thành',
        definitionEn: 'To change from a child into an adult.',
        examples: [
          { en: 'I grew up in a small fishing village.', vi: 'Tôi lớn lên ở một làng chài nhỏ.' },
          { en: 'What do you want to be when you grow up?', vi: 'Lớn lên con muốn làm gì?' },
        ],
        usageNote: { vi: 'Quá khứ: **grew up**. Không có tân ngữ: không nói "grow up my son".', en: 'Past: **grew up**. No object: not "grow up my son".' },
      },
      {
        id: 'l2b-g-w2-bring-up',
        word: 'bring up',
        ipa: '/brɪŋ ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'nuôi dạy (con cái)',
        definitionEn: 'To look after a child and teach them how to behave until they are an adult.',
        examples: [
          { en: 'My parents brought me up to respect older people.', vi: 'Bố mẹ dạy tôi phải kính trọng người lớn tuổi.' },
          { en: 'She was brought up by her aunt.', vi: 'Cô ấy được dì nuôi lớn.' },
        ],
        usageNote: { vi: 'Quá khứ: **brought up**.', en: 'Past: **brought up**.' },
      },
      {
        id: 'l2b-g-w2-generation',
        word: 'generation',
        ipa: '/ˌdʒen.əˈreɪ.ʃən/',
        partOfSpeech: 'noun',
        meaningVi: 'thế hệ',
        definitionEn: 'All the people in a family or society of about the same age.',
        examples: [
          { en: 'Three generations live together in my house.', vi: 'Ba thế hệ sống chung trong nhà tôi.' },
          { en: 'The younger generation uses smartphones every day.', vi: 'Thế hệ trẻ dùng điện thoại thông minh mỗi ngày.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-05-family-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm từ với nghĩa tiếng Việt.', en: 'Match each phrase with its Vietnamese meaning.' },
        pairs: [
          { left: 'look after', right: 'chăm sóc' },
          { left: 'grow up', right: 'lớn lên' },
          { left: 'bring up', right: 'nuôi dạy' },
          { left: 'get on well with', right: 'hợp với' },
          { left: 'relative', right: 'họ hàng' },
        ],
        explanation: { vi: 'Các cụm động từ hay gặp khi nói về gia đình.', en: 'Common phrasal verbs for talking about family.' },
      },
      {
        id: 'l2b-g-05-family-ex02',
        type: 'multiple-choice',
        question: 'I ___ in Hai Phong, but now I live in Hanoi.',
        options: ['grew up', 'brought up', 'looked after', 'got on'],
        correctIndex: 0,
        explanation: { vi: 'grow up (không tân ngữ) = lớn lên ở đâu đó; quá khứ grew up.', en: 'grow up (no object) = spend your childhood; past: grew up.' },
      },
      {
        id: 'l2b-g-05-family-ex03',
        type: 'fill-blank',
        sentence: 'My grandparents ___ me up because my parents worked abroad.',
        acceptedAnswers: ['brought'],
        hint: '(bring)',
        explanation: { vi: 'bring sb up = nuôi dạy; quá khứ brought.', en: 'bring someone up = raise them; past: brought.' },
      },
      {
        id: 'l2b-g-05-family-ex04',
        type: 'fill-blank',
        sentence: 'I get on well ___ my younger sister. We rarely argue.',
        acceptedAnswers: ['with'],
        explanation: { vi: 'get on well with + người.', en: 'get on well with + person.' },
      },
      {
        id: 'l2b-g-05-family-ex05',
        type: 'multiple-choice',
        question: 'Who ___ your children when you are at work?',
        options: ['looks after', 'grows up', 'brings', 'gets on'],
        correctIndex: 0,
        explanation: { vi: 'look after = trông, chăm sóc trẻ.', en: 'look after = take care of children.' },
      },
      {
        id: 'l2b-g-05-family-ex06',
        type: 'arrange-words',
        translationVi: 'Ba thế hệ sống chung trong nhà chúng tôi.',
        correctSentence: 'Three generations live together in our house.',
        extraWords: ['relatives'],
        explanation: { vi: 'generation = thế hệ (ông bà, bố mẹ, con cái).', en: 'generation = grandparents, parents, children.' },
      },
      {
        id: 'l2b-g-05-family-ex07',
        type: 'true-false',
        statement: 'In "I am very close to my mother", "close" sounds the same as in "Please close the door".',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: { vi: 'Tính từ /kləʊs/, động từ /kləʊz/.', en: 'The adjective is /kləʊs/; the verb is /kləʊz/.' },
      },
      {
        id: 'l2b-g-05-family-ex08',
        type: 'listen-choose',
        audioText: 'I\'m not very close to my cousins because they live far away, but I get on really well with my aunt.',
        question: 'Who does the speaker have a good relationship with?',
        options: ['Her cousins', 'Her aunt', 'Her neighbours', 'Nobody'],
        correctIndex: 1,
        explanation: { vi: '"get on really well with my aunt" = rất hợp với dì.', en: '"get on really well with my aunt".' },
      },
      {
        id: 'l2b-g-05-family-ex09',
        type: 'fill-blank',
        sentence: 'During Tet, we visit all our ___ in the countryside.',
        acceptedAnswers: ['relatives'],
        explanation: { vi: 'relatives = họ hàng (số nhiều vì "all our").', en: 'relatives = family members (plural after "all our").' },
      },
      {
        id: 'l2b-g-05-family-ex10',
        type: 'speak-sentence',
        sentence: 'I grew up in a close family and I get on well with my relatives.',
        translationVi: 'Tôi lớn lên trong một gia đình gắn bó và tôi rất hợp với họ hàng.',
        explanation: { vi: 'Đọc "close" là /kləʊs/, nối "get on" thành /ɡe.tɒn/.', en: 'Say "close" as /kləʊs/ and link "get on".' },
      },
      {
        id: 'l2b-g-05-family-ex11',
        type: 'speak-answer',
        question: 'Who are you closest to in your family? Why?',
        tipsVi: 'Nêu người đó + lý do + 1 ví dụ việc hai người làm cùng nhau. Dùng close to, get on well with, look after.',
        sampleAnswer:
          'I am closest to my grandmother. She looked after me when I was small because my parents worked long hours. We still get on really well. Every Sunday we cook together and she tells me stories about her childhood.',
        recordSeconds: 40,
        explanation: { vi: 'Câu trả lời có người, lý do và ví dụ cụ thể, dùng đúng cụm từ.', en: 'The answer names the person, gives a reason and a real example.' },
      },
    ],
    miniTest: [],
  },
]
