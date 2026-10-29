/**
 * kids-sentences.ts
 * ----------------------------------------------------------------------------
 * MẪU CÂU CHO TRÒ "GHÉP CÂU" (sentence-builder) — 89 câu, dễ → khó.
 *
 * Cách trò chơi dùng: tách `sentence` theo dấu cách thành các khối chữ, xáo trộn,
 * bé bấm lại theo đúng thứ tự (dấu câu dính vào khối cuối). `meaningVi` hiện làm gợi ý.
 * `wordIds` = các từ trong ngân hàng (kids-topics.ts) có mặt trong câu → để ôn lặp lại (SRS).
 *
 * Tiến trình ngữ pháp (theo danh sách ngữ pháp Cambridge YLE):
 *   STARTERS (33 câu): This is…, There is / There are, have got, can / can't,
 *                      hiện tại tiếp diễn (is eating), giới từ in / on / under / next to /
 *                      behind / between / in front of, like / don't like, Let's…, Where / How many.
 *   MOVERS   (32 câu): so sánh hơn / nhất (bigger, the tallest), like + -ing, want to,
 *                      must / mustn't, was / were (quá khứ của "be"), because, so,
 *                      giới từ opposite / near / above, Which…?, Shall we…?
 *   FLYERS   (24 câu): quá khứ đơn với động từ thường (went, lost, found…), be going to,
 *                      will, might, should, have to, hiện tại hoàn thành (have you ever…, has just…),
 *                      quá khứ tiếp diễn (was sitting).
 *   Ghi chú: Cambridge đưa quá khứ đơn vào từ Movers; ở đây Movers chỉ dùng was/were,
 *   còn câu kể chuyện bằng quá khứ đơn để ở Flyers cho bé 9–11 tuổi đỡ quá tải.
 *
 * Câu ngắn (4–10 khối chữ), bối cảnh gần gũi với bé Việt Nam.
 * ----------------------------------------------------------------------------
 */
import type { KidsSentencePattern } from '../content-types'

export const KIDS_SENTENCES: KidsSentencePattern[] = [
  /* ===================== STARTERS ===================== */
  // This is / There is / There are
  { id: 'kids-sent-s01', level: 'starters', sentence: 'This is my cat.', meaningVi: 'Đây là con mèo của mình.',
    wordIds: ['kids-animals-cat'] },
  { id: 'kids-sent-s02', level: 'starters', sentence: 'There is a bird in the tree.', meaningVi: 'Có một con chim ở trên cây.',
    wordIds: ['kids-animals-bird', 'kids-weather-tree'] },
  { id: 'kids-sent-s03', level: 'starters', sentence: 'There are three ducks on the water.', meaningVi: 'Có ba con vịt trên mặt nước.',
    wordIds: ['kids-numbers-three', 'kids-animals-duck', 'kids-food-water'] },
  { id: 'kids-sent-s04', level: 'starters', sentence: 'There is a robot in front of the TV.', meaningVi: 'Có một con rô-bốt ở trước ti vi.',
    wordIds: ['kids-toys-robot', 'kids-home-tv'] },
  { id: 'kids-sent-s05', level: 'starters', sentence: 'These are my new shoes.', meaningVi: 'Đây là đôi giày mới của mình.',
    wordIds: ['kids-clothes-shoes'] },
  // have got
  { id: 'kids-sent-s06', level: 'starters', sentence: "I've got a red kite.", meaningVi: 'Mình có một con diều màu đỏ.',
    wordIds: ['kids-colours-red', 'kids-toys-kite'] },
  { id: 'kids-sent-s07', level: 'starters', sentence: "She's got long black hair.", meaningVi: 'Bạn ấy có mái tóc dài màu đen.',
    wordIds: ['kids-body-hair', 'kids-colours-black'] },
  { id: 'kids-sent-s08', level: 'starters', sentence: 'The elephant has got big ears.', meaningVi: 'Con voi có đôi tai to.',
    wordIds: ['kids-animals-elephant', 'kids-body-ear'] },
  // can
  { id: 'kids-sent-s09', level: 'starters', sentence: 'I can ride a bike.', meaningVi: 'Mình biết đi xe đạp.',
    wordIds: ['kids-actions-ride', 'kids-transport-bike'] },
  { id: 'kids-sent-s10', level: 'starters', sentence: 'Can you play the guitar?', meaningVi: 'Bạn có biết chơi đàn ghi-ta không?',
    wordIds: ['kids-actions-play', 'kids-sports-guitar'] },
  { id: 'kids-sent-s11', level: 'starters', sentence: 'I can see four frogs.', meaningVi: 'Mình nhìn thấy bốn con ếch.',
    wordIds: ['kids-numbers-four', 'kids-animals-frog'] },
  { id: 'kids-sent-s12', level: 'starters', sentence: 'How many fish can you see?', meaningVi: 'Bạn nhìn thấy bao nhiêu con cá?',
    wordIds: ['kids-animals-fish'] },
  // hiện tại tiếp diễn
  { id: 'kids-sent-s13', level: 'starters', sentence: 'The monkey is eating a banana.', meaningVi: 'Con khỉ đang ăn một quả chuối.',
    wordIds: ['kids-animals-monkey', 'kids-actions-eat', 'kids-food-banana'] },
  { id: 'kids-sent-s14', level: 'starters', sentence: 'The boy is kicking a ball.', meaningVi: 'Cậu bé đang đá một quả bóng.',
    wordIds: ['kids-family-boy', 'kids-actions-kick', 'kids-toys-ball'] },
  { id: 'kids-sent-s15', level: 'starters', sentence: 'My grandmother is reading a book.', meaningVi: 'Bà mình đang đọc sách.',
    wordIds: ['kids-family-grandmother', 'kids-actions-read', 'kids-school-book'] },
  { id: 'kids-sent-s16', level: 'starters', sentence: 'The baby is sleeping in the bedroom.', meaningVi: 'Em bé đang ngủ trong phòng ngủ.',
    wordIds: ['kids-family-baby', 'kids-actions-sleep', 'kids-home-bedroom'] },
  { id: 'kids-sent-s17', level: 'starters', sentence: 'He is wearing a blue T-shirt.', meaningVi: 'Bạn ấy đang mặc áo phông màu xanh dương.',
    wordIds: ['kids-colours-blue', 'kids-clothes-t-shirt'] },
  { id: 'kids-sent-s18', level: 'starters', sentence: 'The cat is drinking milk.', meaningVi: 'Con mèo đang uống sữa.',
    wordIds: ['kids-animals-cat', 'kids-actions-drink', 'kids-food-milk'] },
  // giới từ chỉ vị trí
  { id: 'kids-sent-s19', level: 'starters', sentence: 'The dog is under the table.', meaningVi: 'Con chó ở dưới gầm bàn.',
    wordIds: ['kids-animals-dog', 'kids-home-table'] },
  { id: 'kids-sent-s20', level: 'starters', sentence: 'The teddy bear is on the bed.', meaningVi: 'Con gấu bông ở trên giường.',
    wordIds: ['kids-toys-teddy-bear', 'kids-home-bed'] },
  { id: 'kids-sent-s21', level: 'starters', sentence: 'The ruler is next to the book.', meaningVi: 'Thước kẻ ở bên cạnh quyển sách.',
    wordIds: ['kids-school-ruler', 'kids-school-book'] },
  { id: 'kids-sent-s22', level: 'starters', sentence: 'The ball is between the two chairs.', meaningVi: 'Quả bóng ở giữa hai cái ghế.',
    wordIds: ['kids-toys-ball', 'kids-numbers-two', 'kids-home-chair'] },
  { id: 'kids-sent-s23', level: 'starters', sentence: 'The girl is behind the door.', meaningVi: 'Cô bé ở sau cánh cửa.',
    wordIds: ['kids-family-girl', 'kids-home-door'] },
  { id: 'kids-sent-s24', level: 'starters', sentence: 'My mother is in the kitchen.', meaningVi: 'Mẹ mình đang ở trong bếp.',
    wordIds: ['kids-family-mother', 'kids-home-kitchen'] },
  { id: 'kids-sent-s25', level: 'starters', sentence: 'The spider is on the wall.', meaningVi: 'Con nhện ở trên tường.',
    wordIds: ['kids-animals-spider'] },
  { id: 'kids-sent-s26', level: 'starters', sentence: 'Where is my pencil?', meaningVi: 'Bút chì của mình đâu rồi?',
    wordIds: ['kids-school-pencil'] },
  // like / favourite / Let's / mệnh lệnh
  { id: 'kids-sent-s27', level: 'starters', sentence: 'I like apples and grapes.', meaningVi: 'Mình thích táo và nho.',
    wordIds: ['kids-food-apple', 'kids-food-grape'] },
  { id: 'kids-sent-s28', level: 'starters', sentence: "I don't like tomatoes.", meaningVi: 'Mình không thích cà chua.',
    wordIds: ['kids-food-tomato'] },
  { id: 'kids-sent-s29', level: 'starters', sentence: 'Do you like ice cream?', meaningVi: 'Bạn có thích kem không?',
    wordIds: ['kids-food-ice-cream'] },
  { id: 'kids-sent-s30', level: 'starters', sentence: 'My favourite colour is green.', meaningVi: 'Màu mình thích nhất là màu xanh lá.',
    wordIds: ['kids-colours-colour', 'kids-colours-green'] },
  { id: 'kids-sent-s31', level: 'starters', sentence: "Let's play football in the park.", meaningVi: 'Mình cùng chơi bóng đá ở công viên nhé.',
    wordIds: ['kids-actions-play', 'kids-sports-football', 'kids-places-park'] },
  { id: 'kids-sent-s32', level: 'starters', sentence: 'Look at the big giraffe.', meaningVi: 'Nhìn con hươu cao cổ to kìa.',
    wordIds: ['kids-actions-look', 'kids-animals-giraffe'] },
  { id: 'kids-sent-s33', level: 'starters', sentence: 'Wave to your friends.', meaningVi: 'Vẫy tay chào các bạn đi.',
    wordIds: ['kids-actions-wave', 'kids-family-friend'] },

  /* ===================== MOVERS ===================== */
  // so sánh hơn / so sánh nhất
  { id: 'kids-sent-m01', level: 'movers', sentence: 'A whale is bigger than a dolphin.', meaningVi: 'Cá voi to hơn cá heo.',
    wordIds: ['kids-animals-whale', 'kids-animals-dolphin'] },
  { id: 'kids-sent-m02', level: 'movers', sentence: 'A horse is faster than a cow.', meaningVi: 'Ngựa chạy nhanh hơn bò.',
    wordIds: ['kids-animals-horse', 'kids-animals-cow'] },
  { id: 'kids-sent-m03', level: 'movers', sentence: 'Monkeys can climb trees faster than tigers.', meaningVi: 'Khỉ leo cây nhanh hơn hổ.',
    wordIds: ['kids-animals-monkey', 'kids-actions-climb', 'kids-weather-tree', 'kids-animals-tiger'] },
  { id: 'kids-sent-m04', level: 'movers', sentence: 'The giraffe is the tallest animal in the zoo.', meaningVi: 'Hươu cao cổ là con vật cao nhất trong sở thú.',
    wordIds: ['kids-animals-giraffe', 'kids-places-zoo'] },
  { id: 'kids-sent-m05', level: 'movers', sentence: 'This is the biggest shell on the beach.', meaningVi: 'Đây là vỏ sò to nhất trên bãi biển.',
    wordIds: ['kids-weather-shell', 'kids-weather-beach'] },
  // like + -ing / want to
  { id: 'kids-sent-m06', level: 'movers', sentence: 'My brother likes playing basketball.', meaningVi: 'Anh trai mình thích chơi bóng rổ.',
    wordIds: ['kids-family-brother', 'kids-sports-basketball'] },
  { id: 'kids-sent-m07', level: 'movers', sentence: 'I want to be a doctor.', meaningVi: 'Mình muốn trở thành bác sĩ.',
    wordIds: ['kids-jobs-doctor'] },
  { id: 'kids-sent-m08', level: 'movers', sentence: 'My sister can dance very well.', meaningVi: 'Chị mình nhảy múa rất đẹp.',
    wordIds: ['kids-family-sister', 'kids-actions-dance'] },
  // must / mustn't
  { id: 'kids-sent-m09', level: 'movers', sentence: 'You must wear a helmet on a motorbike.', meaningVi: 'Bạn phải đội mũ bảo hiểm khi đi xe máy.',
    wordIds: ['kids-transport-helmet', 'kids-transport-motorbike'] },
  { id: 'kids-sent-m10', level: 'movers', sentence: "You mustn't swim in the river.", meaningVi: 'Bạn không được bơi ở sông.',
    wordIds: ['kids-actions-swim', 'kids-weather-river'] },
  // was / were
  { id: 'kids-sent-m11', level: 'movers', sentence: 'There was a rainbow in the sky yesterday.', meaningVi: 'Hôm qua có cầu vồng trên bầu trời.',
    wordIds: ['kids-weather-rainbow'] },
  { id: 'kids-sent-m12', level: 'movers', sentence: 'We were at the cinema last night.', meaningVi: 'Tối qua chúng mình ở rạp chiếu phim.',
    wordIds: ['kids-places-cinema'] },
  { id: 'kids-sent-m13', level: 'movers', sentence: 'The film was very funny.', meaningVi: 'Bộ phim rất buồn cười.',
    wordIds: ['kids-sports-film'] },
  // so / because
  { id: 'kids-sent-m14', level: 'movers', sentence: "It's sunny, so let's go to the beach.", meaningVi: 'Trời nắng, mình đi biển thôi.',
    wordIds: ['kids-weather-sunny', 'kids-weather-beach'] },
  { id: 'kids-sent-m15', level: 'movers', sentence: "Put on your scarf because it's cold.", meaningVi: 'Quàng khăn vào đi vì trời lạnh đấy.',
    wordIds: ['kids-clothes-scarf', 'kids-weather-cold'] },
  { id: 'kids-sent-m16', level: 'movers', sentence: 'The baby is crying because she is hungry.', meaningVi: 'Em bé đang khóc vì đói.',
    wordIds: ['kids-family-baby', 'kids-actions-cry', 'kids-body-hungry'] },
  // sức khoẻ
  { id: 'kids-sent-m17', level: 'movers', sentence: "I've got a headache and a temperature.", meaningVi: 'Mình bị đau đầu và bị sốt.',
    wordIds: ['kids-body-headache', 'kids-body-temperature'] },
  // nơi chốn + giới từ Movers (opposite, near, above)
  { id: 'kids-sent-m18', level: 'movers', sentence: 'The supermarket is next to the hospital.', meaningVi: 'Siêu thị ở cạnh bệnh viện.',
    wordIds: ['kids-places-supermarket', 'kids-places-hospital'] },
  { id: 'kids-sent-m19', level: 'movers', sentence: 'The library is opposite the park.', meaningVi: 'Thư viện ở đối diện công viên.',
    wordIds: ['kids-places-library', 'kids-places-park'] },
  { id: 'kids-sent-m20', level: 'movers', sentence: 'The dolphins are jumping near the island.', meaningVi: 'Những chú cá heo đang nhảy gần hòn đảo.',
    wordIds: ['kids-animals-dolphin', 'kids-actions-jump', 'kids-weather-island'] },
  { id: 'kids-sent-m21', level: 'movers', sentence: 'The moon is behind a cloud.', meaningVi: 'Mặt trăng đang nấp sau một đám mây.',
    wordIds: ['kids-weather-moon', 'kids-weather-cloud'] },
  { id: 'kids-sent-m22', level: 'movers', sentence: 'My aunt lives in a small village.', meaningVi: 'Cô mình sống ở một ngôi làng nhỏ.',
    wordIds: ['kids-family-aunt', 'kids-places-village'] },
  // thói quen hằng ngày, giờ, ngày trong tuần
  { id: 'kids-sent-m23', level: 'movers', sentence: "I get up at seven o'clock every morning.", meaningVi: 'Mỗi sáng mình thức dậy lúc bảy giờ.',
    wordIds: ['kids-numbers-seven', 'kids-numbers-morning'] },
  { id: 'kids-sent-m24', level: 'movers', sentence: 'We go to school by bus every day.', meaningVi: 'Ngày nào chúng mình cũng đi học bằng xe buýt.',
    wordIds: ['kids-school-school', 'kids-transport-bus'] },
  { id: 'kids-sent-m25', level: 'movers', sentence: 'On Saturday we go to the market.', meaningVi: 'Thứ Bảy nhà mình đi chợ.',
    wordIds: ['kids-numbers-saturday', 'kids-places-market'] },
  { id: 'kids-sent-m26', level: 'movers', sentence: 'My uncle cooks noodles for us.', meaningVi: 'Chú mình nấu mì cho cả nhà.',
    wordIds: ['kids-family-uncle', 'kids-jobs-cook', 'kids-food-noodles'] },
  { id: 'kids-sent-m27', level: 'movers', sentence: 'The farmer is driving a tractor.', meaningVi: 'Bác nông dân đang lái máy cày.',
    wordIds: ['kids-jobs-farmer', 'kids-transport-tractor'] },
  { id: 'kids-sent-m28', level: 'movers', sentence: 'The penguin is swimming very quickly.', meaningVi: 'Chú chim cánh cụt đang bơi rất nhanh.',
    wordIds: ['kids-animals-penguin', 'kids-actions-swim'] },
  // câu hỏi Which / Why / Shall / Can I have
  { id: 'kids-sent-m29', level: 'movers', sentence: 'Which do you like, pandas or rabbits?', meaningVi: 'Bạn thích con nào hơn, gấu trúc hay thỏ?',
    wordIds: ['kids-animals-panda', 'kids-animals-rabbit'] },
  { id: 'kids-sent-m30', level: 'movers', sentence: 'Why are you laughing?', meaningVi: 'Sao bạn lại cười thế?',
    wordIds: ['kids-actions-laugh'] },
  { id: 'kids-sent-m31', level: 'movers', sentence: 'Shall we fly a kite in the wind?', meaningVi: 'Mình thả diều trong gió nhé?',
    wordIds: ['kids-actions-fly', 'kids-toys-kite', 'kids-weather-wind'] },
  { id: 'kids-sent-m32', level: 'movers', sentence: 'Can I have a cheese sandwich, please?', meaningVi: 'Cho mình xin một cái bánh mì kẹp phô mai nhé?',
    wordIds: ['kids-food-cheese', 'kids-food-sandwich'] },

  /* ===================== FLYERS ===================== */
  // quá khứ đơn (động từ thường, có bất quy tắc)
  { id: 'kids-sent-f01', level: 'flyers', sentence: 'Yesterday we went to the museum.', meaningVi: 'Hôm qua chúng mình đã đi bảo tàng.',
    wordIds: ['kids-places-museum'] },
  { id: 'kids-sent-f02', level: 'flyers', sentence: 'I lost my backpack at the bus stop.', meaningVi: 'Mình làm mất ba lô ở trạm xe buýt.',
    wordIds: ['kids-school-backpack', 'kids-places-bus-stop'] },
  { id: 'kids-sent-f03', level: 'flyers', sentence: 'The firefighter climbed the tree and found the kitten.', meaningVi: 'Chú lính cứu hoả trèo lên cây và tìm thấy mèo con.',
    wordIds: ['kids-jobs-firefighter', 'kids-actions-climb', 'kids-weather-tree', 'kids-animals-kitten'] },
  { id: 'kids-sent-f04', level: 'flyers', sentence: 'The astronaut flew to the moon in a rocket.', meaningVi: 'Nhà du hành vũ trụ đã bay lên mặt trăng bằng tên lửa.',
    wordIds: ['kids-jobs-astronaut', 'kids-weather-moon', 'kids-transport-rocket'] },
  { id: 'kids-sent-f05', level: 'flyers', sentence: 'There was a big storm last night.', meaningVi: 'Tối qua có một cơn bão lớn.',
    wordIds: ['kids-weather-storm'] },
  { id: 'kids-sent-f06', level: 'flyers', sentence: 'We played volleyball on the beach.', meaningVi: 'Chúng mình đã chơi bóng chuyền trên bãi biển.',
    wordIds: ['kids-sports-volleyball', 'kids-weather-beach'] },
  { id: 'kids-sent-f07', level: 'flyers', sentence: 'A police officer helped me cross the road.', meaningVi: 'Một chú cảnh sát đã giúp mình qua đường.',
    wordIds: ['kids-jobs-police-officer', 'kids-transport-road'] },
  { id: 'kids-sent-f08', level: 'flyers', sentence: 'My father made a strawberry cake for my birthday.', meaningVi: 'Bố đã làm một chiếc bánh dâu tây cho sinh nhật mình.',
    wordIds: ['kids-family-father', 'kids-food-strawberry', 'kids-food-cake', 'kids-toys-birthday'] },
  { id: 'kids-sent-f09', level: 'flyers', sentence: 'We took a taxi to the hotel.', meaningVi: 'Chúng mình đã đi taxi đến khách sạn.',
    wordIds: ['kids-transport-taxi', 'kids-places-hotel'] },
  { id: 'kids-sent-f10', level: 'flyers', sentence: 'The octopus hid under a big rock.', meaningVi: 'Con bạch tuộc đã trốn dưới một hòn đá to.',
    wordIds: ['kids-animals-octopus', 'kids-weather-rock'] },
  { id: 'kids-sent-f11', level: 'flyers', sentence: 'The mechanic fixed the wheel of my bike.', meaningVi: 'Cô thợ đã sửa bánh xe đạp cho mình.',
    wordIds: ['kids-jobs-mechanic', 'kids-transport-wheel', 'kids-transport-bike'] },
  { id: 'kids-sent-f12', level: 'flyers', sentence: 'We slept in a tent in the forest.', meaningVi: 'Chúng mình đã ngủ trong lều ở trong rừng.',
    wordIds: ['kids-sports-tent', 'kids-weather-forest', 'kids-actions-sleep'] },
  { id: 'kids-sent-f13', level: 'flyers', sentence: 'We saw a dinosaur at the museum.', meaningVi: 'Chúng mình đã thấy một con khủng long ở bảo tàng.',
    wordIds: ['kids-animals-dinosaur', 'kids-places-museum'] },
  // quá khứ tiếp diễn
  { id: 'kids-sent-f14', level: 'flyers', sentence: 'A butterfly was sitting on the flower.', meaningVi: 'Một con bướm đang đậu trên bông hoa.',
    wordIds: ['kids-animals-butterfly', 'kids-weather-flower'] },
  { id: 'kids-sent-f15', level: 'flyers', sentence: 'The singer was wearing a crown and sunglasses.', meaningVi: 'Cô ca sĩ đội vương miện và đeo kính râm.',
    wordIds: ['kids-jobs-singer', 'kids-clothes-crown', 'kids-clothes-sunglasses'] },
  // tương lai: be going to / will
  { id: 'kids-sent-f16', level: 'flyers', sentence: "We're going to have a picnic tomorrow.", meaningVi: 'Ngày mai chúng mình sẽ đi dã ngoại.',
    wordIds: ['kids-food-picnic'] },
  { id: 'kids-sent-f17', level: 'flyers', sentence: "I'm going to learn to play chess.", meaningVi: 'Mình sẽ học chơi cờ vua.',
    wordIds: ['kids-toys-chess', 'kids-actions-play'] },
  { id: 'kids-sent-f18', level: 'flyers', sentence: "Our plane will arrive at six o'clock.", meaningVi: 'Máy bay của chúng mình sẽ đến lúc sáu giờ.',
    wordIds: ['kids-transport-plane', 'kids-numbers-six'] },
  { id: 'kids-sent-f19', level: 'flyers', sentence: 'The pilot will fly to Ha Noi tomorrow.', meaningVi: 'Ngày mai cô phi công sẽ bay ra Hà Nội.',
    wordIds: ['kids-jobs-pilot', 'kids-actions-fly'] },
  // might / should / have to
  { id: 'kids-sent-f20', level: 'flyers', sentence: 'It might rain, so take an umbrella.', meaningVi: 'Trời có thể mưa, nên mang theo ô nhé.',
    wordIds: ['kids-weather-rain', 'kids-weather-umbrella'] },
  { id: 'kids-sent-f21', level: 'flyers', sentence: 'You should wear gloves when it is cold.', meaningVi: 'Bạn nên đeo găng tay khi trời lạnh.',
    wordIds: ['kids-clothes-gloves', 'kids-weather-cold'] },
  { id: 'kids-sent-f22', level: 'flyers', sentence: 'I have to finish my science homework.', meaningVi: 'Mình phải làm xong bài tập môn khoa học.',
    wordIds: ['kids-school-science', 'kids-school-homework'] },
  // hiện tại hoàn thành
  { id: 'kids-sent-f23', level: 'flyers', sentence: 'Have you ever eaten honey?', meaningVi: 'Bạn đã bao giờ ăn mật ong chưa?',
    wordIds: ['kids-food-honey'] },
  { id: 'kids-sent-f24', level: 'flyers', sentence: 'My cousin has just bought a new violin.', meaningVi: 'Anh họ mình vừa mua một cây đàn vi-ô-lông mới.',
    wordIds: ['kids-family-cousin', 'kids-sports-violin'] },
]
