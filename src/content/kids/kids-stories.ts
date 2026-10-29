/**
 * kids-stories.ts
 * ----------------------------------------------------------------------------
 * TRUYỆN "TUẦN TRA CÙNG {mascot}" cho trò Phiêu lưu (patrol-adventure).
 *
 * 6 chương × 5 cảnh. Mỗi cảnh: lời kể ngắn (≤ 25 từ mỗi ngôn ngữ) + 1 câu hỏi.
 * Trả lời đúng thì đi tiếp (sai thì dùng thang gợi ý 3 bậc như mọi trò khác).
 * `question.wordId` trỏ về 1 từ trong kids-topics.ts → trả lời cũng là 1 lần ôn từ (SRS).
 *
 * Giọng truyện: nhẹ nhàng, vui, mascot là "đồng đội" giúp mọi người trong thị trấn.
 * Không có gì đáng sợ, không bạo lực, không kẻ xấu.
 * `image` = ảnh Fluent Emoji gợi ý cho cảnh (sau này hoạ sĩ có thể thay bằng tranh riêng).
 * {mascot} = tên mascot (chưa chốt) — giao diện thay tên thật trước khi hiện / đọc.
 * Đáp án đúng nằm ở vị trí khác nhau; giao diện vẫn nên xáo trộn options khi hiển thị.
 *
 * Danh sách chương:
 *   01 Mèo con đi lạc · 02 Chiếc ba lô bị bỏ quên · 03 Ngày mưa trên phố
 *   04 Ngày hội thể thao · 05 Buổi dã ngoại trong công viên · 06 Sinh nhật bất ngờ
 * ----------------------------------------------------------------------------
 */
import type { BilingualText, KidsStoryChapter } from '../content-types'

/** Tên cả bộ truyện (hiện trên sảnh trò Phiêu lưu). */
export const KIDS_STORY_SERIES_TITLE: BilingualText = {
  vi: 'Tuần tra cùng {mascot}',
  en: 'Patrol adventures with {mascot}',
}

export const KIDS_STORIES: KidsStoryChapter[] = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'kids-story-01-lost-kitten',
    title: { vi: 'Mèo con đi lạc', en: 'The lost kitten' },
    scenes: [
      {
        narrationEn: 'Kim is sad. Her white kitten is lost. {mascot} says, "Let\'s find her!"',
        narrationVi: 'Kim đang buồn. Mèo con màu trắng của Kim bị lạc. {mascot} nói: "Mình cùng đi tìm nhé!"',
        image: 'cat-face',
        question: { promptEn: 'What is lost?', promptVi: 'Con gì bị lạc?',
          options: ['a rabbit', 'a kitten', 'a parrot'], correctIndex: 1, wordId: 'kids-animals-kitten' },
      },
      {
        narrationEn: 'First, they look under a car. There is a ball, but there is no kitten.',
        narrationVi: 'Đầu tiên, hai bạn tìm dưới gầm ô tô. Ở đó có một quả bóng, nhưng không có mèo con.',
        image: 'automobile',
        question: { promptEn: 'What is under the car?', promptVi: 'Dưới gầm ô tô có gì?',
          options: ['a ball', 'a box', 'a kitten'], correctIndex: 0, wordId: 'kids-toys-ball' },
      },
      {
        narrationEn: 'Next, they look in the garden. Something is moving in the flowers. Is it the kitten? No, it is a frog!',
        narrationVi: 'Tiếp theo, hai bạn tìm trong vườn. Có gì đó động đậy trong đám hoa. Mèo con à? Không, là một con ếch!',
        image: 'frog',
        question: { promptEn: 'What is in the flowers?', promptVi: 'Trong đám hoa có con gì?',
          options: ['a fish', 'a bird', 'a frog'], correctIndex: 2, wordId: 'kids-animals-frog' },
      },
      {
        narrationEn: '{mascot} listens carefully. "Meow!" The kitten is up in a tall tree!',
        narrationVi: '{mascot} vểnh tai lắng nghe. "Meo meo!" Mèo con đang ở trên một cái cây cao!',
        image: 'deciduous-tree',
        question: { promptEn: 'Where is the kitten?', promptVi: 'Mèo con đang ở đâu?',
          options: ['under the bed', 'in the tree', 'in the box'], correctIndex: 1, wordId: 'kids-weather-tree' },
      },
      {
        narrationEn: '{mascot} and Kim hold a blanket. The kitten jumps down onto it. Kim smiles. "Thank you, {mascot}!"',
        narrationVi: '{mascot} và Kim căng một tấm chăn. Mèo con nhảy xuống chăn. Kim mỉm cười: "Cảm ơn {mascot}!"',
        image: 'grinning-cat-with-smiling-eyes',
        question: { promptEn: 'How does Kim feel now?', promptVi: 'Bây giờ Kim thấy thế nào?',
          options: ['happy', 'sad', 'angry'], correctIndex: 0, wordId: 'kids-body-happy' },
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'kids-story-02-lost-backpack',
    title: { vi: 'Chiếc ba lô bị bỏ quên', en: 'The lost backpack' },
    scenes: [
      {
        narrationEn: 'On patrol, {mascot} sees a blue backpack at the bus stop. Whose backpack is it?',
        narrationVi: 'Đang tuần tra, {mascot} thấy một chiếc ba lô xanh dương ở trạm xe buýt. Ba lô của ai nhỉ?',
        image: 'backpack',
        question: { promptEn: 'Where is the backpack?', promptVi: 'Chiếc ba lô ở đâu?',
          options: ['at the zoo', 'at the beach', 'at the bus stop'], correctIndex: 2, wordId: 'kids-places-bus-stop' },
      },
      {
        narrationEn: '{mascot} looks inside. There is a ruler, a pencil and a book. On the book, there is a name: Nam.',
        narrationVi: '{mascot} nhìn vào trong. Có một cái thước, một cây bút chì và một quyển sách. Trên sách có tên: Nam.',
        image: 'straight-ruler',
        question: { promptEn: 'What is in the backpack?', promptVi: 'Trong ba lô có gì?',
          options: ['a ruler', 'a guitar', 'a pizza'], correctIndex: 0, wordId: 'kids-school-ruler' },
      },
      {
        narrationEn: 'Nam is a student at Green Park School. {mascot} walks through the park to the school.',
        narrationVi: 'Nam là học sinh trường Green Park. {mascot} đi bộ qua công viên để đến trường.',
        image: 'school',
        question: { promptEn: 'Where does {mascot} go now?', promptVi: 'Bây giờ {mascot} đi đâu?',
          options: ['to the cinema', 'to the school', 'to the zoo'], correctIndex: 1, wordId: 'kids-school-school' },
      },
      {
        narrationEn: 'The teacher smiles. "Nam is in the library. He is reading a book about dinosaurs."',
        narrationVi: 'Cô giáo mỉm cười: "Nam đang ở thư viện. Bạn ấy đang đọc sách về khủng long."',
        image: 'books',
        question: { promptEn: 'Where is Nam?', promptVi: 'Nam đang ở đâu?',
          options: ['in the kitchen', 'at the funfair', 'in the library'], correctIndex: 2, wordId: 'kids-places-library' },
      },
      {
        narrationEn: 'Nam is very happy. "My homework is in my backpack! Thank you, {mascot}!" {mascot} waves goodbye.',
        narrationVi: 'Nam vui lắm: "Bài tập về nhà của mình ở trong ba lô! Cảm ơn {mascot}!" {mascot} vẫy tay chào.',
        image: 'memo',
        question: { promptEn: "What is in Nam's backpack?", promptVi: 'Trong ba lô của Nam có gì?',
          options: ['his homework', 'his sandwich', 'his kite'], correctIndex: 0, wordId: 'kids-school-homework' },
      },
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'kids-story-03-rainy-day',
    title: { vi: 'Ngày mưa trên phố', en: 'A rainy day in town' },
    scenes: [
      {
        narrationEn: 'It is raining in town. There are lots of cars, bikes and motorbikes on the road.',
        narrationVi: 'Trời đang mưa trên phố. Trên đường có rất nhiều ô tô, xe đạp và xe máy.',
        image: 'cloud-with-rain',
        question: { promptEn: "What's the weather like?", promptVi: 'Thời tiết thế nào?',
          options: ["It's sunny.", "It's raining.", "It's snowing."], correctIndex: 1, wordId: 'kids-weather-rain' },
      },
      {
        narrationEn: 'Today {mascot} helps people on the street. {mascot} has got a yellow raincoat and a big umbrella.',
        narrationVi: 'Hôm nay {mascot} giúp mọi người trên phố. {mascot} mặc áo mưa vàng và cầm một chiếc ô to.',
        image: 'umbrella-with-rain-drops',
        question: { promptEn: 'What has {mascot} got?', promptVi: '{mascot} cầm theo cái gì?',
          options: ['a kite', 'a guitar', 'an umbrella'], correctIndex: 2, wordId: 'kids-weather-umbrella' },
      },
      {
        narrationEn: 'A girl is sitting on her mum\'s motorbike. "Where is your helmet?" asks {mascot}. She puts it on.',
        narrationVi: 'Một bạn gái ngồi sau xe máy của mẹ. {mascot} hỏi: "Mũ bảo hiểm của bạn đâu?" Bạn ấy đội mũ vào ngay.',
        image: 'motor-scooter',
        question: { promptEn: 'What must you wear on a motorbike?', promptVi: 'Đi xe máy thì phải đội gì?',
          options: ['a helmet', 'a crown', 'a scarf'], correctIndex: 0, wordId: 'kids-transport-helmet' },
      },
      {
        narrationEn: 'The traffic light is red. All the cars stop. {mascot} helps an old man cross the road.',
        narrationVi: 'Đèn giao thông chuyển đỏ. Ô tô dừng lại hết. {mascot} giúp một ông cụ qua đường.',
        image: 'vertical-traffic-light',
        question: { promptEn: 'What colour is the traffic light?', promptVi: 'Đèn giao thông màu gì?',
          options: ['blue', 'red', 'purple'], correctIndex: 1, wordId: 'kids-colours-red' },
      },
      {
        narrationEn: 'Then the rain stops. Look! There is a rainbow in the sky. Everyone waves to {mascot}.',
        narrationVi: 'Rồi trời tạnh mưa. Nhìn kìa! Trên trời có cầu vồng. Mọi người vẫy tay chào {mascot}.',
        image: 'rainbow',
        question: { promptEn: 'What is in the sky?', promptVi: 'Trên trời có gì?',
          options: ['a train', 'a tractor', 'a rainbow'], correctIndex: 2, wordId: 'kids-weather-rainbow' },
      },
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'kids-story-04-sports-day',
    title: { vi: 'Ngày hội thể thao', en: 'School sports day' },
    scenes: [
      {
        narrationEn: 'Today is sports day at Green Park School. The children are wearing red and blue T-shirts.',
        narrationVi: 'Hôm nay là ngày hội thể thao ở trường Green Park. Các bạn nhỏ mặc áo phông đỏ và xanh dương.',
        image: 't-shirt',
        question: { promptEn: 'What are the children wearing?', promptVi: 'Các bạn nhỏ đang mặc gì?',
          options: ['T-shirts', 'coats', 'swimsuits'], correctIndex: 0, wordId: 'kids-clothes-t-shirt' },
      },
      {
        narrationEn: 'First, the children run a race. Nam is running very fast! {mascot} claps.',
        narrationVi: 'Đầu tiên là chạy thi. Nam đang chạy rất nhanh! {mascot} vỗ tay cổ vũ.',
        image: 'person-running',
        question: { promptEn: 'What is Nam doing?', promptVi: 'Nam đang làm gì?',
          options: ['swimming', 'running', 'sleeping'], correctIndex: 1, wordId: 'kids-actions-run' },
      },
      {
        narrationEn: 'Next is football. Kim kicks the ball into the goal. Goal! Her team is very happy.',
        narrationVi: 'Tiếp theo là bóng đá. Kim sút bóng vào khung thành. Vào rồi! Đội của Kim vui lắm.',
        image: 'soccer-ball',
        question: { promptEn: 'Which sport are they playing?', promptVi: 'Các bạn đang chơi môn gì?',
          options: ['tennis', 'chess', 'football'], correctIndex: 2, wordId: 'kids-sports-football' },
      },
      {
        narrationEn: "Oh! Where is the ball? It is under the teacher's chair. {mascot} brings it back with a big smile.",
        narrationVi: 'Ơ! Quả bóng đâu rồi? Nó nằm dưới ghế của cô giáo. {mascot} tha bóng về, cười thật tươi.',
        image: 'chair',
        question: { promptEn: 'Where is the ball?', promptVi: 'Quả bóng ở đâu?',
          options: ['under the chair', 'on the bed', 'in the sea'], correctIndex: 0, wordId: 'kids-home-chair' },
      },
      {
        narrationEn: 'At the end, every child gets a small prize. "Thank you for helping, {mascot}!" says the teacher.',
        narrationVi: 'Cuối buổi, bạn nào cũng nhận một giải thưởng nhỏ. Cô giáo nói: "Cảm ơn {mascot} đã giúp đỡ!"',
        image: 'trophy',
        question: { promptEn: 'What does every child get?', promptVi: 'Bạn nhỏ nào cũng nhận được gì?',
          options: ['a pizza', 'a prize', 'a ticket'], correctIndex: 1, wordId: 'kids-sports-prize' },
      },
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: 'kids-story-05-picnic',
    title: { vi: 'Buổi dã ngoại trong công viên', en: 'A picnic in the park' },
    scenes: [
      {
        narrationEn: "It is a sunny Sunday. Kim's family is having a picnic in the park. {mascot} is there too.",
        narrationVi: 'Chủ nhật trời nắng đẹp. Gia đình Kim đi dã ngoại ở công viên. {mascot} cũng đi cùng.',
        image: 'basket',
        question: { promptEn: 'Where is the picnic?', promptVi: 'Buổi dã ngoại ở đâu?',
          options: ['at the station', 'in the park', 'in the bathroom'], correctIndex: 1, wordId: 'kids-places-park' },
      },
      {
        narrationEn: 'On the blanket, there are sandwiches, bananas and orange juice. Yum!',
        narrationVi: 'Trên tấm khăn trải có bánh mì kẹp, chuối và nước cam. Ngon quá!',
        image: 'sandwich',
        question: { promptEn: 'Which fruit is on the blanket?', promptVi: 'Trên khăn trải có loại quả nào?',
          options: ['apples', 'grapes', 'bananas'], correctIndex: 2, wordId: 'kids-food-banana' },
      },
      {
        narrationEn: '"Quack!" A duck walks out of the lake. It looks at the picnic with big, hungry eyes.',
        narrationVi: '"Cạp cạp!" Một con vịt đi lên từ hồ. Nó nhìn đồ ăn với đôi mắt thèm thuồng.',
        image: 'duck',
        question: { promptEn: 'Which animal comes to the picnic?', promptVi: 'Con vật nào đến chỗ dã ngoại?',
          options: ['a duck', 'a tiger', 'a whale'], correctIndex: 0, wordId: 'kids-animals-duck' },
      },
      {
        narrationEn: "Oh no! The duck takes Grandpa's hat and runs away. {mascot} runs after it.",
        narrationVi: 'Ôi không! Con vịt ngậm mũ của ông rồi chạy mất. {mascot} đuổi theo.',
        image: 'top-hat',
        question: { promptEn: 'What does the duck take?', promptVi: 'Con vịt lấy mất cái gì?',
          options: ['a cake', 'a hat', 'a phone'], correctIndex: 1, wordId: 'kids-clothes-hat' },
      },
      {
        narrationEn: 'The duck drops the hat in the flowers. {mascot} brings it back. Everyone laughs and eats ice cream.',
        narrationVi: 'Con vịt đánh rơi mũ trong bụi hoa. {mascot} mang mũ về. Cả nhà cười vang rồi cùng ăn kem.',
        image: 'soft-ice-cream',
        question: { promptEn: 'What do they eat at the end?', promptVi: 'Cuối cùng cả nhà ăn gì?',
          options: ['soup', 'noodles', 'ice cream'], correctIndex: 2, wordId: 'kids-food-ice-cream' },
      },
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: 'kids-story-06-birthday-surprise',
    title: { vi: 'Sinh nhật bất ngờ', en: 'A birthday surprise' },
    scenes: [
      {
        narrationEn: "Tomorrow is Grandma's birthday. Nam and {mascot} want to make a big surprise for her.",
        narrationVi: 'Ngày mai là sinh nhật bà. Nam và {mascot} muốn làm một bất ngờ thật lớn tặng bà.',
        image: 'birthday-cake',
        question: { promptEn: "Whose birthday is it?", promptVi: 'Đó là sinh nhật của ai?',
          options: ["Grandma's", "Dad's", "the teacher's"], correctIndex: 0, wordId: 'kids-family-grandmother' },
      },
      {
        narrationEn: 'First, they go to the shop and buy balloons: pink, yellow and purple ones.',
        narrationVi: 'Đầu tiên, hai bạn ra cửa hàng mua bóng bay màu hồng, vàng và tím.',
        image: 'balloon',
        question: { promptEn: 'What do they buy?', promptVi: 'Hai bạn mua gì?',
          options: ['kites', 'balloons', 'robots'], correctIndex: 1, wordId: 'kids-toys-balloon' },
      },
      {
        narrationEn: 'Then Nam makes a card. He draws a big red flower on it. {mascot} adds a paw print!',
        narrationVi: 'Sau đó Nam làm một tấm thiệp. Nam vẽ một bông hoa đỏ thật to. {mascot} in thêm dấu chân!',
        image: 'paw-prints',
        question: { promptEn: 'What does Nam draw?', promptVi: 'Nam vẽ gì?',
          options: ['a car', 'a fish', 'a flower'], correctIndex: 2, wordId: 'kids-weather-flower' },
      },
      {
        narrationEn: "Dad is making a chocolate cake. {mascot} wants to help. Oops! Now there is chocolate on {mascot}'s nose!",
        narrationVi: 'Bố đang làm bánh sô-cô-la. {mascot} muốn giúp. Ối! Giờ mũi {mascot} dính đầy sô-cô-la!',
        image: 'chocolate-bar',
        question: { promptEn: 'Where is the chocolate?', promptVi: 'Sô-cô-la dính ở đâu?',
          options: ['on the nose', 'on the tail', 'on the ear'], correctIndex: 0, wordId: 'kids-body-nose' },
      },
      {
        narrationEn: 'Grandma opens the door. "Surprise! Happy birthday!" Grandma laughs. "What a funny card!"',
        narrationVi: 'Bà mở cửa. "Bất ngờ chưa! Chúc mừng sinh nhật bà!" Bà bật cười: "Tấm thiệp vui quá!"',
        image: 'party-popper',
        question: { promptEn: 'What does Grandma open?', promptVi: 'Bà mở cái gì?',
          options: ['the window', 'the door', 'the box'], correctIndex: 1, wordId: 'kids-home-door' },
      },
    ],
  },
]
