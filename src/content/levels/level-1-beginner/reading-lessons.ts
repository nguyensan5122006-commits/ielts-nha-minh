/**
 * reading-lessons.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI HỌC KỸ NĂNG ĐỌC (READING) — LEVEL 1 (band 0 – 2.0, người mới bắt đầu).
 *
 * File này CHỈ chứa dữ liệu (nội dung), không có giao diện.
 * Mỗi bài học (Lesson) gồm:
 *   - teachingCards   : thẻ lý thuyết + mẹo đọc (song ngữ Việt/Anh)
 *   - readingPassages : các đoạn văn để đọc (biển báo, email, thời gian biểu, câu chuyện)
 *   - exercises       : 10 bài luyện nhỏ
 *   - miniTest        : 6 câu kiểm tra cuối bài (có tính tim)
 *
 * Bài tập nào dựa trên đoạn văn thì ghi passageId = id của đoạn văn đó,
 * để giao diện hiển thị đoạn văn bên cạnh câu hỏi.
 *
 * Dạng True/False: 3 bài đầu chỉ có TRUE/FALSE (allowNotGiven: false).
 * Bài 4 mới giới thiệu NOT GIVEN (allowNotGiven: true) — đúng như IELTS thật.
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1ReadingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Đọc biển báo và thông báo ngắn
  // ==========================================================================
  {
    id: "l1-read-01",
    skill: 'reading',
    title: { vi: "Đọc biển báo và thông báo", en: "Reading signs and notices" },
    description: {
      vi: "Hiểu các biển báo, thông báo ngắn thường gặp ở trường học, cửa hàng, nơi công cộng.",
      en: "Understand short signs and notices at school, in shops and in public places.",
    },
    teachingCards: [
      {
        title: { vi: "Biển báo thường rất ngắn", en: "Signs are very short" },
        body: {
          vi: "Biển báo thường **không phải câu đầy đủ**, chỉ có vài từ khóa.\nMột số biển hay gặp:\n**EXIT** – lối ra · **ENTRANCE** – lối vào\n**PUSH** – đẩy · **PULL** – kéo\n**OPEN / CLOSED** – mở cửa / đóng cửa\n**STAFF ONLY** – chỉ dành cho nhân viên\n**OUT OF ORDER** – bị hỏng",
          en: "Signs are usually **not full sentences**, just a few key words.\nCommon signs:\n**EXIT** – the way out · **ENTRANCE** – the way in\n**PUSH** · **PULL**\n**OPEN / CLOSED**\n**STAFF ONLY** – only workers can go in\n**OUT OF ORDER** – it doesn't work",
        },
        examples: [
          { en: "STAFF ONLY", vi: "Chỉ dành cho nhân viên" },
          { en: "OUT OF ORDER", vi: "Hỏng / Không hoạt động" },
        ],
      },
      {
        title: { vi: "Cấm, yêu cầu và cảnh báo", en: "Rules, requests and warnings" },
        body: {
          vi: "Ba mẫu rất hay gặp:\n**NO + V-ing / danh từ** = cấm: NO SMOKING (cấm hút thuốc), NO PARKING (cấm đỗ xe)\n**DO NOT + động từ** = không được: DO NOT TOUCH (không chạm vào)\n**PLEASE + động từ** = yêu cầu lịch sự: PLEASE BE QUIET (xin giữ trật tự)\nMẹo: tự hỏi **Ở đâu? Được hay không được làm gì?**",
          en: "Three very common patterns:\n**NO + -ing / noun** = not allowed: NO SMOKING, NO PARKING\n**DO NOT + verb** = don't: DO NOT TOUCH\n**PLEASE + verb** = a polite request: PLEASE BE QUIET\nTip: ask yourself **Where is it? What can or can't I do?**",
        },
        examples: [
          { en: "NO PARKING", vi: "Cấm đỗ xe" },
          { en: "DO NOT FEED THE ANIMALS", vi: "Không cho động vật ăn" },
          { en: "PLEASE KEEP OFF THE GRASS", vi: "Xin đừng giẫm lên cỏ" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l1-read-01-p1",
        title: "Notices at Sunny School",
        text: "LIBRARY\nOpen: Monday – Friday, 8 am – 6 pm\nSaturday: 9 am – 12 pm\nClosed on Sundays\n\nSWIMMING POOL\nStudents must wear a swimming cap.\nNo food or drinks.\n\nLOST AND FOUND\nLost something? Please go to Room 12.\nOpen every day, 7:30 am – 4:30 pm",
      },
    ],
    exercises: [
      {
        id: "l1-read-01-ex01",
        type: 'multiple-choice',
        question: "Sign: NO SMOKING. What does it mean? (Biển này nghĩa là gì?)",
        options: ["You can smoke here.", "You must not smoke here.", "You can buy cigarettes here.", "This is a smoking room."],
        correctIndex: 1,
        explanation: {
          vi: "NO + V-ing = cấm làm việc đó. NO SMOKING = cấm hút thuốc.",
          en: "NO + -ing means it is not allowed. NO SMOKING = you must not smoke.",
        },
      },
      {
        id: "l1-read-01-ex02",
        type: 'multiple-choice',
        question: "Sign on a door: PUSH. What should you do?",
        options: ["Pull the door towards you.", "Push the door away from you.", "Wait – the door is locked.", "Don't touch the door."],
        correctIndex: 1,
        explanation: {
          vi: "PUSH = đẩy (cửa ra phía trước). PULL = kéo (về phía mình).",
          en: "PUSH = move the door away from you. PULL = move it towards you.",
        },
      },
      {
        id: "l1-read-01-ex03",
        type: 'multiple-choice',
        question: "Sign on a shop: CLOSED ON SUNDAYS. What does it mean?",
        options: ["The shop is open every day.", "You cannot shop there on Sunday.", "The shop opens only on Sunday.", "The shop is new."],
        correctIndex: 1,
        explanation: {
          vi: "CLOSED ON SUNDAYS = đóng cửa vào các ngày Chủ nhật.",
          en: "CLOSED ON SUNDAYS = the shop does not open on Sundays.",
        },
      },
      {
        id: "l1-read-01-ex04",
        type: 'match-pairs',
        instruction: {
          vi: "Nối biển báo với ý nghĩa của nó.",
          en: "Match each sign with its meaning.",
        },
        pairs: [
          { left: "EXIT", right: "the way out" },
          { left: "ENTRANCE", right: "the way in" },
          { left: "STAFF ONLY", right: "only workers can go in" },
          { left: "OUT OF ORDER", right: "it doesn't work" },
          { left: "KEEP OFF THE GRASS", right: "don't walk on the grass" },
        ],
        explanation: {
          vi: "Đây là các biển báo rất phổ biến ở trường học, siêu thị, công viên.",
          en: "These signs are very common in schools, supermarkets and parks.",
        },
      },
      {
        id: "l1-read-01-ex05",
        type: 'multiple-choice',
        question: "Sign: SILENCE, PLEASE – EXAM IN PROGRESS. What does it mean?",
        options: ["Please be quiet.", "Please speak loudly.", "The exam has finished.", "Music is playing."],
        correctIndex: 0,
        explanation: {
          vi: "SILENCE = sự im lặng; EXAM IN PROGRESS = đang thi. Vì vậy phải giữ trật tự.",
          en: "SILENCE = no noise; EXAM IN PROGRESS = an exam is happening now. So be quiet.",
        },
      },
      {
        id: "l1-read-01-ex06",
        type: 'true-false',
        passageId: "l1-read-01-p1",
        statement: "The library is open on Saturday morning.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "Thông báo ghi 'Saturday: 9 am – 12 pm' → thư viện mở buổi sáng thứ Bảy.",
          en: "The notice says 'Saturday: 9 am – 12 pm', so it is open on Saturday morning.",
        },
      },
      {
        id: "l1-read-01-ex07",
        type: 'true-false',
        passageId: "l1-read-01-p1",
        statement: "You can eat at the swimming pool.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Thông báo hồ bơi ghi 'No food or drinks' → không được ăn uống.",
          en: "The pool notice says 'No food or drinks', so you can't eat there.",
        },
      },
      {
        id: "l1-read-01-ex08",
        type: 'multiple-choice',
        passageId: "l1-read-01-p1",
        question: "You lost your bag. Where should you go?",
        options: ["The library", "Room 12", "The swimming pool", "The school gate"],
        correctIndex: 1,
        explanation: {
          vi: "LOST AND FOUND (đồ thất lạc): 'Please go to Room 12.'",
          en: "LOST AND FOUND: 'Please go to Room 12.'",
        },
      },
      {
        id: "l1-read-01-ex09",
        type: 'fill-blank',
        passageId: "l1-read-01-p1",
        sentence: "At the pool, students must wear a swimming ___.",
        acceptedAnswers: ["cap"],
        hint: "(mũ bơi)",
        explanation: {
          vi: "'Students must wear a swimming cap.' – học sinh phải đội mũ bơi.",
          en: "'Students must wear a swimming cap.'",
        },
      },
      {
        id: "l1-read-01-ex10",
        type: 'multiple-choice',
        question: "Sign in a car park: NO PARKING 8 AM – 6 PM. When CAN you park here?",
        options: ["At 10 am", "At 3 pm", "At 7 pm", "At 12 pm"],
        correctIndex: 2,
        explanation: {
          vi: "Cấm đỗ từ 8 giờ sáng đến 6 giờ chiều. 7 giờ tối (7 pm) nằm ngoài khoảng đó → được đỗ.",
          en: "No parking from 8 am to 6 pm. 7 pm is outside those hours, so you can park.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-read-01-test01",
        type: 'multiple-choice',
        question: "Sign on a door: PULL. What should you do?",
        options: ["Push the door.", "Pull the door towards you.", "Wait – the door is broken.", "Ring the bell."],
        correctIndex: 1,
        explanation: {
          vi: "PULL = kéo cửa về phía mình.",
          en: "PULL = move the door towards you.",
        },
      },
      {
        id: "l1-read-01-test02",
        type: 'multiple-choice',
        question: "Sign: CAUTION – WET FLOOR. What does it mean?",
        options: ["Be careful – you may fall.", "Please wash the floor.", "The floor is new.", "You can swim here."],
        correctIndex: 0,
        explanation: {
          vi: "CAUTION = cẩn thận; WET FLOOR = sàn ướt → có thể bị trượt ngã.",
          en: "CAUTION = be careful; WET FLOOR = the floor is wet, so you may slip.",
        },
      },
      {
        id: "l1-read-01-test03",
        type: 'multiple-choice',
        question: "Sign at a zoo: DO NOT FEED THE ANIMALS. What does it mean?",
        options: ["Give food to the animals.", "Don't give food to the animals.", "The animals are hungry.", "Buy animal food here."],
        correctIndex: 1,
        explanation: {
          vi: "DO NOT + động từ = không được làm. FEED = cho ăn.",
          en: "DO NOT + verb = you must not. FEED = give food to.",
        },
      },
      {
        id: "l1-read-01-test04",
        type: 'match-pairs',
        instruction: {
          vi: "Nối biển báo với ý nghĩa.",
          en: "Match each sign with its meaning.",
        },
        pairs: [
          { left: "OPEN", right: "you can go in now" },
          { left: "SALE", right: "things are cheaper" },
          { left: "FREE ENTRY", right: "you don't pay to go in" },
          { left: "NO PHOTOS", right: "don't take pictures" },
        ],
        explanation: {
          vi: "SALE = giảm giá; FREE ENTRY = vào cửa miễn phí; NO PHOTOS = cấm chụp ảnh.",
          en: "SALE = lower prices; FREE ENTRY = no ticket needed; NO PHOTOS = no pictures.",
        },
      },
      {
        id: "l1-read-01-test05",
        type: 'true-false',
        passageId: "l1-read-01-p1",
        statement: "The Lost and Found room is open only from Monday to Friday.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Thông báo ghi 'Open every day' → mở cửa mọi ngày, không chỉ thứ Hai đến thứ Sáu.",
          en: "The notice says 'Open every day', not only Monday to Friday.",
        },
      },
      {
        id: "l1-read-01-test06",
        type: 'true-false',
        passageId: "l1-read-01-p1",
        statement: "The library closes at 6 pm from Monday to Friday.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "'Monday – Friday, 8 am – 6 pm' → đóng cửa lúc 6 giờ chiều.",
          en: "'Monday – Friday, 8 am – 6 pm' → it closes at 6 pm.",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Đọc hồ sơ cá nhân và email ngắn (60–90 từ)
  // ==========================================================================
  {
    id: "l1-read-02",
    skill: 'reading',
    title: { vi: "Đọc email và hồ sơ cá nhân", en: "A short email and a personal profile" },
    description: {
      vi: "Đọc hiểu email giới thiệu bản thân và trang hồ sơ cá nhân ngắn.",
      en: "Read a short email and a profile where people introduce themselves.",
    },
    teachingCards: [
      {
        title: { vi: "Bố cục một email thân mật", en: "The parts of an informal email" },
        body: {
          vi: "Một email thân mật thường có 3 phần:\n1. **Lời chào:** Hi Lucy, / Dear Lucy,\n2. **Nội dung:** giới thiệu bản thân, kể chuyện, hỏi thăm.\n3. **Lời kết:** Best wishes, / Love, / See you soon, + tên người viết.\nMẹo: tên sau 'Hi/Dear' là **người nhận**, tên ở cuối là **người viết**.",
          en: "An informal email usually has 3 parts:\n1. **Greeting:** Hi Lucy, / Dear Lucy,\n2. **Body:** introduce yourself, give news, ask questions.\n3. **Closing:** Best wishes, / Love, / See you soon, + the writer's name.\nTip: the name after 'Hi/Dear' is the **reader**; the name at the end is the **writer**.",
        },
        examples: [
          { en: "Dear Lucy,", vi: "Lucy thân mến," },
          { en: "Best wishes, Minh", vi: "Thân ái, Minh" },
        ],
      },
      {
        title: { vi: "Mẹo đọc: tìm nhanh thông tin (scanning)", en: "Reading tip: scanning" },
        body: {
          vi: "Bạn **không cần hiểu từng chữ**.\n1. Đọc câu hỏi trước, gạch chân từ khóa (How old? Where? What... like?).\n2. Lướt bài để tìm **con số, tên riêng, địa điểm** (thường viết hoa).\n3. Đọc kỹ câu chứa thông tin đó rồi mới trả lời.",
          en: "You **don't need to understand every word**.\n1. Read the question first and underline key words (How old? Where? What... like?).\n2. Scan the text for **numbers, names and places** (they often have capital letters).\n3. Read that sentence carefully, then answer.",
        },
        examples: [
          { en: "I am fourteen years old.", vi: "Câu hỏi 'How old?' → tìm con số." },
          { en: "My favourite subject is English.", vi: "Câu hỏi 'favourite subject?' → tìm từ 'favourite'." },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l1-read-02-p1",
        title: "An email from a new pen friend",
        text: "Hi Lucy,\n\nMy name is Minh and I am your new pen friend. I am fourteen years old and I live in Hanoi, Vietnam, with my parents and my little sister, Lan. She is eight.\n\nI am a student at Thang Long Secondary School. My favourite subject is English. After school, I play football with my friends. At the weekend, I often watch films with my family.\n\nPlease write back and tell me about you!\n\nBest wishes,\nMinh",
      },
      {
        id: "l1-read-02-p2",
        title: "Profile: Sarah Jones",
        text: "Name: Sarah Jones\nAge: 32\nJob: nurse\nCity: Manchester, England\n\nHi! I'm Sarah. I work at a big hospital in Manchester. I am married and I have two sons, Jack and Harry. In my free time, I like cooking and walking in the park with my dog, Max. I don't like watching TV. I want to visit Vietnam next year!",
      },
    ],
    exercises: [
      {
        id: "l1-read-02-ex01",
        type: 'multiple-choice',
        passageId: "l1-read-02-p1",
        question: "Who is the email to? (Email gửi cho ai?)",
        options: ["Minh", "Lucy", "Lan", "Minh's mother"],
        correctIndex: 1,
        explanation: {
          vi: "Email bắt đầu bằng 'Hi Lucy' → người nhận là Lucy. Minh là người viết.",
          en: "The email starts 'Hi Lucy', so Lucy is the reader. Minh is the writer.",
        },
      },
      {
        id: "l1-read-02-ex02",
        type: 'multiple-choice',
        passageId: "l1-read-02-p1",
        question: "How old is Minh?",
        options: ["8", "14", "40", "18"],
        correctIndex: 1,
        explanation: {
          vi: "'I am fourteen years old' → 14 tuổi. Số 8 là tuổi của em gái Lan.",
          en: "'I am fourteen years old' → 14. Eight is his sister's age.",
        },
      },
      {
        id: "l1-read-02-ex03",
        type: 'true-false',
        passageId: "l1-read-02-p1",
        statement: "Minh lives in Ho Chi Minh City.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Minh viết 'I live in Hanoi' → sống ở Hà Nội, không phải TP.HCM.",
          en: "Minh writes 'I live in Hanoi', not Ho Chi Minh City.",
        },
      },
      {
        id: "l1-read-02-ex04",
        type: 'true-false',
        passageId: "l1-read-02-p1",
        statement: "Minh has a little sister.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "'... with my parents and my little sister, Lan.' → Minh có em gái tên Lan.",
          en: "'... with my parents and my little sister, Lan.'",
        },
      },
      {
        id: "l1-read-02-ex05",
        type: 'fill-blank',
        passageId: "l1-read-02-p1",
        sentence: "Minh's favourite subject is ___.",
        acceptedAnswers: ["English"],
        hint: "(môn học)",
        explanation: {
          vi: "'My favourite subject is English.' – môn học yêu thích là tiếng Anh.",
          en: "'My favourite subject is English.'",
        },
      },
      {
        id: "l1-read-02-ex06",
        type: 'multiple-choice',
        passageId: "l1-read-02-p1",
        question: "What does Minh do after school?",
        options: ["He watches films.", "He plays football.", "He reads books.", "He goes swimming."],
        correctIndex: 1,
        explanation: {
          vi: "'After school, I play football with my friends.' Xem phim là việc làm vào cuối tuần.",
          en: "'After school, I play football with my friends.' He watches films at the weekend.",
        },
      },
      {
        id: "l1-read-02-ex07",
        type: 'fill-blank',
        passageId: "l1-read-02-p1",
        sentence: "Lan is ___ years old.",
        acceptedAnswers: ["eight", "8"],
        explanation: {
          vi: "'... my little sister, Lan. She is eight.' → Lan 8 tuổi.",
          en: "'... my little sister, Lan. She is eight.'",
        },
      },
      {
        id: "l1-read-02-ex08",
        type: 'multiple-choice',
        passageId: "l1-read-02-p1",
        question: "Why does Minh write this email?",
        options: ["to say sorry", "to introduce himself", "to ask for money", "to invite Lucy to a party"],
        correctIndex: 1,
        explanation: {
          vi: "Minh là bạn qua thư mới (new pen friend) và kể về bản thân → để giới thiệu mình.",
          en: "Minh is a new pen friend and tells Lucy about himself → to introduce himself.",
        },
      },
      {
        id: "l1-read-02-ex09",
        type: 'match-pairs',
        passageId: "l1-read-02-p1",
        instruction: {
          vi: "Nối câu trong email với chức năng của nó.",
          en: "Match each part of the email with its job.",
        },
        pairs: [
          { left: "Hi Lucy,", right: "greeting" },
          { left: "My name is Minh", right: "introduction" },
          { left: "Please write back", right: "request" },
          { left: "Best wishes,", right: "closing" },
        ],
        explanation: {
          vi: "greeting = lời chào; introduction = giới thiệu; request = lời đề nghị; closing = lời kết.",
          en: "Every email has a greeting, a body (introduction, request...) and a closing.",
        },
      },
      {
        id: "l1-read-02-ex10",
        type: 'true-false',
        passageId: "l1-read-02-p1",
        statement: "Minh often watches films with his family at the weekend.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "'At the weekend, I often watch films with my family.' → đúng.",
          en: "'At the weekend, I often watch films with my family.'",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-read-02-test01",
        type: 'multiple-choice',
        passageId: "l1-read-02-p2",
        question: "What is Sarah's job?",
        options: ["teacher", "nurse", "doctor", "cook"],
        correctIndex: 1,
        explanation: {
          vi: "Hồ sơ ghi 'Job: nurse' → y tá. Cô ấy làm ở bệnh viện nhưng không phải bác sĩ.",
          en: "The profile says 'Job: nurse'. She works in a hospital, but she isn't a doctor.",
        },
      },
      {
        id: "l1-read-02-test02",
        type: 'true-false',
        passageId: "l1-read-02-p2",
        statement: "Sarah has two daughters.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "'I have two sons, Jack and Harry.' → hai con trai, không phải con gái.",
          en: "'I have two sons, Jack and Harry.' – sons, not daughters.",
        },
      },
      {
        id: "l1-read-02-test03",
        type: 'fill-blank',
        passageId: "l1-read-02-p2",
        sentence: "Sarah's dog is called ___.",
        acceptedAnswers: ["Max"],
        explanation: {
          vi: "'... walking in the park with my dog, Max.' → con chó tên Max.",
          en: "'... walking in the park with my dog, Max.'",
        },
      },
      {
        id: "l1-read-02-test04",
        type: 'multiple-choice',
        passageId: "l1-read-02-p2",
        question: "What does Sarah NOT like?",
        options: ["cooking", "walking in the park", "watching TV", "her dog"],
        correctIndex: 2,
        explanation: {
          vi: "'I don't like watching TV.' Chú ý chữ NOT trong câu hỏi!",
          en: "'I don't like watching TV.' Notice the word NOT in the question!",
        },
      },
      {
        id: "l1-read-02-test05",
        type: 'true-false',
        passageId: "l1-read-02-p2",
        statement: "Sarah lives in England.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "'City: Manchester, England' → cô ấy sống ở Anh.",
          en: "'City: Manchester, England' → she lives in England.",
        },
      },
      {
        id: "l1-read-02-test06",
        type: 'multiple-choice',
        passageId: "l1-read-02-p2",
        question: "Where does Sarah want to go next year?",
        options: ["England", "Vietnam", "Manchester", "the hospital"],
        correctIndex: 1,
        explanation: {
          vi: "'I want to visit Vietnam next year!' → Việt Nam.",
          en: "'I want to visit Vietnam next year!'",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Đọc thời gian biểu và quảng cáo đơn giản
  // ==========================================================================
  {
    id: "l1-read-03",
    skill: 'reading',
    title: { vi: "Đọc thời gian biểu và quảng cáo", en: "Timetables and adverts" },
    description: {
      vi: "Tìm nhanh giờ, giá, địa điểm trong lịch xe buýt, quảng cáo và lịch chiếu phim.",
      en: "Find times, prices and places quickly in a bus timetable, an advert and a cinema guide.",
    },
    teachingCards: [
      {
        title: { vi: "Không đọc hết — hãy tìm thông tin", en: "Don't read everything — find the information" },
        body: {
          vi: "Thời gian biểu và quảng cáo được viết theo **dạng danh sách**, không phải đoạn văn.\nCách làm:\n1. Đọc câu hỏi: hỏi **giờ? giá? ở đâu? ai?**\n2. Nhìn các **tiêu đề nhỏ** (When, Where, Price, Ticket...) để biết thông tin nằm ở đâu.\n3. Chú ý **ngày trong tuần**: giờ thứ Hai có thể khác giờ Chủ nhật!",
          en: "Timetables and adverts are written as **lists**, not paragraphs.\nHow to do it:\n1. Read the question: is it asking about **time? price? place? who?**\n2. Look at the **small headings** (When, Where, Price, Ticket...) to find the information.\n3. Check the **day of the week**: Monday times can be different from Sunday times!",
        },
        examples: [
          { en: "When: every Tuesday and Thursday", vi: "Khi nào: mỗi thứ Ba và thứ Năm" },
          { en: "Price: $40 for the whole summer", vi: "Giá: 40 đô cho cả mùa hè" },
        ],
      },
      {
        title: { vi: "Từ vựng hay gặp", en: "Useful words" },
        body: {
          vi: "**every 20 minutes** – cứ 20 phút một chuyến\n**journey time** – thời gian di chuyển\n**adult / student / child** – người lớn / học sinh-sinh viên / trẻ em\n**free** – miễn phí\n**aged 12–18** – từ 12 đến 18 tuổi\n**from 1 July to 31 August** – từ 1/7 đến 31/8",
          en: "**every 20 minutes** – one bus each 20 minutes\n**journey time** – how long the trip takes\n**adult / student / child**\n**free** – you don't pay\n**aged 12–18** – between 12 and 18 years old\n**from 1 July to 31 August**",
        },
        examples: [
          { en: "Children under 6 travel free.", vi: "Trẻ em dưới 6 tuổi đi miễn phí." },
          { en: "The bus comes every 30 minutes.", vi: "Cứ 30 phút có một chuyến xe buýt." },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l1-read-03-p1",
        title: "Green Line Bus – Route 25",
        text: "GREEN LINE BUS – ROUTE 25\nCity Centre → Airport\n\nMonday – Friday: every 20 minutes, 6:00 am – 10:00 pm\nSaturday and Sunday: every 30 minutes, 7:00 am – 9:00 pm\n\nJourney time: about 45 minutes\nTickets: adult $3, student $1.50, children under 6 free\nBuy tickets from the driver or online.",
      },
      {
        id: "l1-read-03-p2",
        title: "Summer English Club",
        text: "SUMMER ENGLISH CLUB\n\nDo you want to speak English better? Join our club this summer!\n\nWho: students aged 12–18\nWhen: every Tuesday and Thursday, 4:00 pm – 5:30 pm, from 1 July to 31 August\nWhere: Room 5, City Library\nPrice: $40 for the whole summer\n\nActivities: games, songs, films and speaking practice with native teachers.\nTo join, call Ms Hanh on 0903 456 789.",
      },
      {
        id: "l1-read-03-p3",
        title: "Star Cinema – This Week",
        text: "STAR CINEMA – THIS WEEK\n\nThe Lost Island (cartoon) – 10:00 am, 2:30 pm\nSpace Hero (action) – 4:15 pm, 8:00 pm\nMy Best Friend (comedy) – 6:30 pm\n\nTickets: adults $8, students $5\nTuesday: all tickets $4!\nPopcorn: small $2, large $3.50",
      },
    ],
    exercises: [
      {
        id: "l1-read-03-ex01",
        type: 'multiple-choice',
        passageId: "l1-read-03-p1",
        question: "Where does the bus go?",
        options: ["From the airport to the city centre", "From the city centre to the airport", "Around the city centre", "To the train station"],
        correctIndex: 1,
        explanation: {
          vi: "'City Centre → Airport': mũi tên chỉ hướng từ trung tâm thành phố đến sân bay.",
          en: "'City Centre → Airport': the arrow shows it goes from the city centre to the airport.",
        },
      },
      {
        id: "l1-read-03-ex02",
        type: 'multiple-choice',
        passageId: "l1-read-03-p1",
        question: "On Monday, how often does the bus come?",
        options: ["every 20 minutes", "every 30 minutes", "every 45 minutes", "every hour"],
        correctIndex: 0,
        explanation: {
          vi: "'Monday – Friday: every 20 minutes'. 30 phút là cuối tuần; 45 phút là thời gian đi.",
          en: "'Monday – Friday: every 20 minutes'. 30 minutes is at the weekend; 45 minutes is the journey time.",
        },
      },
      {
        id: "l1-read-03-ex03",
        type: 'fill-blank',
        passageId: "l1-read-03-p1",
        sentence: "A student ticket costs $___.",
        acceptedAnswers: ["1.50", "1.5"],
        hint: "(số)",
        explanation: {
          vi: "'Tickets: adult $3, student $1.50' → vé học sinh 1,50 đô.",
          en: "'Tickets: adult $3, student $1.50'.",
        },
      },
      {
        id: "l1-read-03-ex04",
        type: 'true-false',
        passageId: "l1-read-03-p1",
        statement: "On Sunday, you can take the bus at 10 pm.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Chủ nhật xe chỉ chạy đến 9 giờ tối (9:00 pm). 10 pm chỉ áp dụng cho thứ Hai – thứ Sáu.",
          en: "On Sunday the bus runs until 9:00 pm. 10 pm is only for Monday to Friday.",
        },
      },
      {
        id: "l1-read-03-ex05",
        type: 'multiple-choice',
        passageId: "l1-read-03-p1",
        question: "How long is the bus journey?",
        options: ["20 minutes", "30 minutes", "about 45 minutes", "about 1 hour"],
        correctIndex: 2,
        explanation: {
          vi: "'Journey time: about 45 minutes' → khoảng 45 phút.",
          en: "'Journey time: about 45 minutes'.",
        },
      },
      {
        id: "l1-read-03-ex06",
        type: 'true-false',
        passageId: "l1-read-03-p1",
        statement: "Children under 6 do not pay.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "'children under 6 free' → trẻ dưới 6 tuổi miễn phí, tức là không phải trả tiền.",
          en: "'children under 6 free' means they don't pay.",
        },
      },
      {
        id: "l1-read-03-ex07",
        type: 'multiple-choice',
        passageId: "l1-read-03-p2",
        question: "Who can join the club?",
        options: ["children under 12", "students aged 12–18", "adults only", "teachers"],
        correctIndex: 1,
        explanation: {
          vi: "'Who: students aged 12–18' → học sinh từ 12 đến 18 tuổi.",
          en: "'Who: students aged 12–18'.",
        },
      },
      {
        id: "l1-read-03-ex08",
        type: 'match-pairs',
        passageId: "l1-read-03-p2",
        instruction: {
          vi: "Nối câu hỏi với thông tin trong quảng cáo.",
          en: "Match each question with the information in the advert.",
        },
        pairs: [
          { left: "Which days?", right: "Tuesday and Thursday" },
          { left: "Where?", right: "Room 5, City Library" },
          { left: "How much?", right: "$40" },
          { left: "What time?", right: "4:00 pm – 5:30 pm" },
          { left: "Who to call?", right: "Ms Hanh" },
        ],
        explanation: {
          vi: "Nhìn các tiêu đề nhỏ (When, Where, Price) giúp tìm thông tin rất nhanh.",
          en: "The small headings (When, Where, Price) help you find information quickly.",
        },
      },
      {
        id: "l1-read-03-ex09",
        type: 'fill-blank',
        passageId: "l1-read-03-p2",
        sentence: "The club finishes on 31 ___.",
        acceptedAnswers: ["August"],
        hint: "(tháng)",
        explanation: {
          vi: "'from 1 July to 31 August' → kết thúc ngày 31 tháng 8.",
          en: "'from 1 July to 31 August' → it ends on 31 August.",
        },
      },
      {
        id: "l1-read-03-ex10",
        type: 'true-false',
        passageId: "l1-read-03-p2",
        statement: "The club meets three times a week.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Câu lạc bộ họp vào thứ Ba và thứ Năm → 2 lần một tuần, không phải 3.",
          en: "It meets on Tuesday and Thursday → twice a week, not three times.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-read-03-test01",
        type: 'multiple-choice',
        passageId: "l1-read-03-p3",
        question: "What time is the comedy?",
        options: ["10:00 am", "4:15 pm", "6:30 pm", "8:00 pm"],
        correctIndex: 2,
        explanation: {
          vi: "Phim hài (comedy) là 'My Best Friend' – chiếu lúc 6:30 pm.",
          en: "The comedy is 'My Best Friend' at 6:30 pm.",
        },
      },
      {
        id: "l1-read-03-test02",
        type: 'multiple-choice',
        passageId: "l1-read-03-p3",
        question: "How much is a student ticket on Monday?",
        options: ["$8", "$5", "$4", "$2"],
        correctIndex: 1,
        explanation: {
          vi: "Vé học sinh là $5. Giá $4 chỉ áp dụng vào thứ Ba (Tuesday).",
          en: "A student ticket is $5. The $4 price is only on Tuesday.",
        },
      },
      {
        id: "l1-read-03-test03",
        type: 'true-false',
        passageId: "l1-read-03-p3",
        statement: "All tickets are cheaper on Tuesday.",
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: "'Tuesday: all tickets $4!' – rẻ hơn giá thường ($8 và $5).",
          en: "'Tuesday: all tickets $4!' – cheaper than $8 and $5.",
        },
      },
      {
        id: "l1-read-03-test04",
        type: 'fill-blank',
        passageId: "l1-read-03-p3",
        sentence: "A large popcorn costs $___.",
        acceptedAnswers: ["3.50", "3.5"],
        explanation: {
          vi: "'Popcorn: small $2, large $3.50' → bỏng ngô cỡ lớn 3,50 đô.",
          en: "'Popcorn: small $2, large $3.50'.",
        },
      },
      {
        id: "l1-read-03-test05",
        type: 'true-false',
        passageId: "l1-read-03-p3",
        statement: "Space Hero is on three times a day.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Space Hero chiếu lúc 4:15 pm và 8:00 pm → 2 suất, không phải 3.",
          en: "Space Hero is at 4:15 pm and 8:00 pm → two times, not three.",
        },
      },
      {
        id: "l1-read-03-test06",
        type: 'multiple-choice',
        passageId: "l1-read-03-p3",
        question: "Which film can you watch in the morning?",
        options: ["The Lost Island", "Space Hero", "My Best Friend", "None of them"],
        correctIndex: 0,
        explanation: {
          vi: "'The Lost Island' chiếu lúc 10:00 am (am = buổi sáng).",
          en: "'The Lost Island' is on at 10:00 am (am = morning).",
        },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Đọc truyện ngắn / bài miêu tả (100–120 từ)
  // Lần đầu làm dạng TRUE / FALSE / NOT GIVEN của IELTS Reading.
  // ==========================================================================
  {
    id: "l1-read-04",
    skill: 'reading',
    title: { vi: "Truyện ngắn và True/False/Not Given", en: "A short story and True/False/Not Given" },
    description: {
      vi: "Đọc một câu chuyện ngắn và làm quen dạng bài TRUE / FALSE / NOT GIVEN.",
      en: "Read a short story and try the TRUE / FALSE / NOT GIVEN task for the first time.",
    },
    teachingCards: [
      {
        title: { vi: "TRUE, FALSE hay NOT GIVEN?", en: "TRUE, FALSE or NOT GIVEN?" },
        body: {
          vi: "Đây là dạng bài rất quan trọng trong IELTS Reading:\n**TRUE** – bài đọc nói **giống** câu cho sẵn.\n**FALSE** – bài đọc nói **ngược lại** câu cho sẵn.\n**NOT GIVEN** – bài đọc **không nhắc đến** thông tin này, không biết đúng hay sai.",
          en: "This is a very important IELTS Reading task:\n**TRUE** – the text **says the same** as the statement.\n**FALSE** – the text **says the opposite**.\n**NOT GIVEN** – the text **doesn't say** anything about it, so we can't know.",
        },
        examples: [
          { en: "Text: Tom has a dog. → 'Tom has a pet.' = TRUE", vi: "Bài: Tom có một con chó → 'Tom có thú cưng' = ĐÚNG" },
          { en: "Text: Tom has a dog. → 'Tom has no pets.' = FALSE", vi: "→ 'Tom không có thú cưng' = SAI" },
          { en: "Text: Tom has a dog. → 'Tom's dog is black.' = NOT GIVEN", vi: "→ 'Con chó màu đen' = KHÔNG CÓ THÔNG TIN" },
        ],
      },
      {
        title: { vi: "Mẹo làm True/False/Not Given", en: "Tips for True/False/Not Given" },
        body: {
          vi: "1. **Chỉ dựa vào bài đọc**, không dùng hiểu biết riêng của bạn.\n2. Bài đọc hay dùng **từ đồng nghĩa**: big = large, start = begin.\n3. Chú ý các từ nhỏ làm đổi nghĩa: **only, always, never, not, all**.\n4. Câu hỏi đi **theo thứ tự** của bài đọc.",
          en: "1. **Use only the text**, not your own knowledge.\n2. The text often uses **synonyms**: big = large, start = begin.\n3. Watch the small words that change meaning: **only, always, never, not, all**.\n4. The questions follow **the order** of the text.",
        },
        examples: [
          { en: "Text: The house is big. → 'The house is large.' = TRUE", vi: "big và large đồng nghĩa → ĐÚNG" },
          { en: "Text: She sometimes cooks. → 'She always cooks.' = FALSE", vi: "sometimes ≠ always → SAI" },
        ],
      },
    ],
    readingPassages: [
      {
        id: "l1-read-04-p1",
        title: "A Day at the Beach",
        text: "Last Sunday, Nam and his family went to Vung Tau beach. They left home at six o'clock in the morning because the road is often busy. The trip took two hours by car.\n\nThe weather was sunny and hot. Nam and his younger brother swam in the sea for a long time. Their mother sat under a big umbrella and read a book. Their father took a lot of photos.\n\nAt lunchtime, they ate fresh seafood at a small restaurant near the beach. Nam loved the grilled fish, but his brother did not like it. In the afternoon, it started to rain, so they drove home early. Everyone was tired but happy.",
      },
      {
        id: "l1-read-04-p2",
        title: "My Grandmother",
        text: "My grandmother is called Mrs Lan. She is seventy-five years old and she lives in a small house in the countryside with her cat. She has short white hair and a warm smile.\n\nEvery morning, she gets up at five o'clock and works in her garden. She grows vegetables and beautiful flowers. In the afternoon, she likes listening to the radio.\n\nMy grandmother is very kind. When I visit her in the summer, she always cooks my favourite dish, chicken soup. She also tells me stories about her childhood. I love her very much.",
      },
    ],
    exercises: [
      {
        id: "l1-read-04-ex01",
        type: 'multiple-choice',
        passageId: "l1-read-04-p1",
        question: "Where did Nam's family go?",
        options: ["to the mountains", "to Vung Tau beach", "to a zoo", "to Hanoi"],
        correctIndex: 1,
        explanation: {
          vi: "Câu đầu tiên: '... went to Vung Tau beach.'",
          en: "The first sentence: '... went to Vung Tau beach.'",
        },
      },
      {
        id: "l1-read-04-ex02",
        type: 'multiple-choice',
        passageId: "l1-read-04-p1",
        question: "How did they travel?",
        options: ["by bus", "by train", "by car", "by motorbike"],
        correctIndex: 2,
        explanation: {
          vi: "'The trip took two hours by car.' → đi bằng ô tô.",
          en: "'The trip took two hours by car.'",
        },
      },
      {
        id: "l1-read-04-ex03",
        type: 'true-false',
        passageId: "l1-read-04-p1",
        statement: "They left home early in the morning.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'They left home at six o'clock in the morning' → 6 giờ sáng là sớm → TRUE.",
          en: "'They left home at six o'clock in the morning' → that is early → TRUE.",
        },
      },
      {
        id: "l1-read-04-ex04",
        type: 'true-false',
        passageId: "l1-read-04-p1",
        statement: "The trip took three hours.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Bài đọc nói 'two hours' (2 tiếng) → ngược với 3 tiếng → FALSE.",
          en: "The text says 'two hours', which is different from three → FALSE.",
        },
      },
      {
        id: "l1-read-04-ex05",
        type: 'true-false',
        passageId: "l1-read-04-p1",
        statement: "The weather was cold and cloudy.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'The weather was sunny and hot.' – nắng và nóng, ngược với lạnh và nhiều mây → FALSE.",
          en: "'The weather was sunny and hot.' – the opposite of cold and cloudy → FALSE.",
        },
      },
      {
        id: "l1-read-04-ex06",
        type: 'true-false',
        passageId: "l1-read-04-p1",
        statement: "Nam's mother read a book under a large umbrella.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'Their mother sat under a big umbrella and read a book.' big = large (đồng nghĩa) → TRUE.",
          en: "'Their mother sat under a big umbrella and read a book.' big = large → TRUE.",
        },
      },
      {
        id: "l1-read-04-ex07",
        type: 'true-false',
        passageId: "l1-read-04-p1",
        statement: "Nam's father bought a new camera.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài chỉ nói bố 'took a lot of photos' (chụp nhiều ảnh), không nhắc đến việc mua máy ảnh → NOT GIVEN.",
          en: "The text only says he 'took a lot of photos'. Buying a camera is not mentioned → NOT GIVEN.",
        },
      },
      {
        id: "l1-read-04-ex08",
        type: 'fill-blank',
        passageId: "l1-read-04-p1",
        sentence: "At lunchtime, they ate fresh ___ at a small restaurant.",
        acceptedAnswers: ["seafood"],
        hint: "(hải sản)",
        explanation: {
          vi: "'At lunchtime, they ate fresh seafood at a small restaurant near the beach.'",
          en: "'At lunchtime, they ate fresh seafood at a small restaurant near the beach.'",
        },
      },
      {
        id: "l1-read-04-ex09",
        type: 'true-false',
        passageId: "l1-read-04-p1",
        statement: "The restaurant was expensive.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài nói nhà hàng 'small' và 'near the beach', nhưng không nói đắt hay rẻ → NOT GIVEN.",
          en: "The restaurant was 'small' and 'near the beach', but the price is not mentioned → NOT GIVEN.",
        },
      },
      {
        id: "l1-read-04-ex10",
        type: 'match-pairs',
        instruction: {
          vi: "Nối các từ đồng nghĩa (rất hữu ích cho True/False/Not Given).",
          en: "Match the words with the same meaning (very useful for True/False/Not Given).",
        },
        pairs: [
          { left: "big", right: "large" },
          { left: "start", right: "begin" },
          { left: "fast", right: "quick" },
          { left: "happy", right: "glad" },
          { left: "near", right: "close to" },
        ],
        explanation: {
          vi: "Câu hỏi IELTS thường dùng từ đồng nghĩa thay vì lặp lại đúng từ trong bài.",
          en: "IELTS questions often use synonyms instead of the exact words in the text.",
        },
      },
    ],
    miniTest: [
      {
        id: "l1-read-04-test01",
        type: 'true-false',
        passageId: "l1-read-04-p2",
        statement: "Mrs Lan lives in the city.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "Bà sống 'in the countryside' (ở nông thôn), ngược với thành phố → FALSE.",
          en: "She lives 'in the countryside', the opposite of the city → FALSE.",
        },
      },
      {
        id: "l1-read-04-test02",
        type: 'true-false',
        passageId: "l1-read-04-p2",
        statement: "Mrs Lan has a cat.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'... she lives in a small house in the countryside with her cat.' → TRUE.",
          en: "'... she lives in a small house in the countryside with her cat.' → TRUE.",
        },
      },
      {
        id: "l1-read-04-test03",
        type: 'true-false',
        passageId: "l1-read-04-p2",
        statement: "Mrs Lan grows fruit in her garden.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài chỉ nói bà trồng rau và hoa (vegetables and flowers), không nhắc đến trái cây → NOT GIVEN.",
          en: "The text only mentions vegetables and flowers. Fruit is not mentioned → NOT GIVEN.",
        },
      },
      {
        id: "l1-read-04-test04",
        type: 'true-false',
        passageId: "l1-read-04-p2",
        statement: "Mrs Lan gets up early every morning.",
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: "'Every morning, she gets up at five o'clock' → 5 giờ sáng là dậy sớm → TRUE.",
          en: "'Every morning, she gets up at five o'clock' → that is early → TRUE.",
        },
      },
      {
        id: "l1-read-04-test05",
        type: 'true-false',
        passageId: "l1-read-04-p2",
        statement: "Mrs Lan has two sisters.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài không nói gì về chị em của bà → NOT GIVEN.",
          en: "The text says nothing about her sisters → NOT GIVEN.",
        },
      },
      {
        id: "l1-read-04-test06",
        type: 'fill-blank',
        passageId: "l1-read-04-p2",
        sentence: "The writer's favourite dish is chicken ___.",
        acceptedAnswers: ["soup"],
        hint: "(món canh/súp)",
        explanation: {
          vi: "'... she always cooks my favourite dish, chicken soup.' → súp gà.",
          en: "'... she always cooks my favourite dish, chicken soup.'",
        },
      },
    ],
  },
]
