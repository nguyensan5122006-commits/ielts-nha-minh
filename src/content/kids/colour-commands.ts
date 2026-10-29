/**
 * colour-commands.ts
 * ----------------------------------------------------------------------------
 * 30 LỆNH CHO TRÒ "NGHE LỆNH TÔ MÀU" (colour-command).
 *
 * Bé nghe lệnh tiếng Anh (VD "Colour the ball under the table blue."), chọn đúng màu,
 * rồi bấm vào đúng đồ vật trong tranh để tô.
 *
 * Mỗi lệnh gồm:
 *   commandEn / commandVi : câu lệnh (máy đọc commandEn; commandVi chỉ hiện khi bé cần gợi ý)
 *   targetWordId          : đồ vật cần tô (từ có nhãn 'colorable' trong kids-topics.ts)
 *   colourWordId          : màu cần tô (từ có nhãn 'color')
 *   sceneWordIds          : những thứ tranh PHẢI có (đồ vật đích + vật làm mốc + vật gây nhiễu)
 *   sceneNoteEn           : ghi chú cho người vẽ tranh / lập trình (cần 2 con giống nhau, khác kích thước…)
 *   grammar               : điểm ngữ pháp luyện trong lệnh (tiếng Anh, ngắn)
 *
 * Tiến trình: 12 lệnh Starters (màu + đồ vật, to/nhỏ, giới từ, sở hữu 's) →
 *             18 lệnh Movers (so sánh, ai/cái nào đang làm gì, both/all, số thứ tự, above/near).
 * Lệnh Movers dùng đúng kiểu đề Cambridge: "Find the girl who is dancing. Colour her dress pink."
 * ----------------------------------------------------------------------------
 */
import type { KidsWordLevel } from '../content-types'

export interface KidsColourCommand {
  id: string
  level: KidsWordLevel
  commandEn: string
  commandVi: string
  targetWordId: string
  colourWordId: string
  sceneWordIds: string[]
  sceneNoteEn?: string
  grammar: string
}

export const KIDS_COLOUR_COMMANDS: KidsColourCommand[] = [
  /* ===================== STARTERS ===================== */
  { id: 'kids-colour-01', level: 'starters', commandEn: 'Colour the cat red.', commandVi: 'Tô màu đỏ cho con mèo.',
    targetWordId: 'kids-animals-cat', colourWordId: 'kids-colours-red',
    sceneWordIds: ['kids-animals-cat', 'kids-animals-dog', 'kids-animals-bird'], grammar: 'imperative + noun + colour' },
  { id: 'kids-colour-02', level: 'starters', commandEn: 'Colour the ball yellow.', commandVi: 'Tô màu vàng cho quả bóng.',
    targetWordId: 'kids-toys-ball', colourWordId: 'kids-colours-yellow',
    sceneWordIds: ['kids-toys-ball', 'kids-toys-kite', 'kids-toys-robot'], grammar: 'imperative + noun + colour' },
  { id: 'kids-colour-03', level: 'starters', commandEn: 'Colour the fish orange.', commandVi: 'Tô màu cam cho con cá.',
    targetWordId: 'kids-animals-fish', colourWordId: 'kids-colours-orange',
    sceneWordIds: ['kids-animals-fish', 'kids-animals-duck', 'kids-animals-frog'], grammar: 'imperative + noun + colour' },
  { id: 'kids-colour-04', level: 'starters', commandEn: 'Colour the kite purple.', commandVi: 'Tô màu tím cho con diều.',
    targetWordId: 'kids-toys-kite', colourWordId: 'kids-colours-purple',
    sceneWordIds: ['kids-toys-kite', 'kids-toys-balloon', 'kids-weather-tree'], grammar: 'imperative + noun + colour' },
  { id: 'kids-colour-05', level: 'starters', commandEn: 'Colour the big apple green.', commandVi: 'Tô màu xanh lá cho quả táo to.',
    targetWordId: 'kids-food-apple', colourWordId: 'kids-colours-green',
    sceneWordIds: ['kids-food-apple', 'kids-food-banana'], sceneNoteEn: 'Two apples: one big, one small.',
    grammar: 'adjective: big / small' },
  { id: 'kids-colour-06', level: 'starters', commandEn: 'Colour the small bird blue.', commandVi: 'Tô màu xanh dương cho con chim nhỏ.',
    targetWordId: 'kids-animals-bird', colourWordId: 'kids-colours-blue',
    sceneWordIds: ['kids-animals-bird', 'kids-weather-tree'], sceneNoteEn: 'Two birds in a tree: one big, one small.',
    grammar: 'adjective: big / small' },
  { id: 'kids-colour-07', level: 'starters', commandEn: 'Colour the ball under the table blue.', commandVi: 'Tô màu xanh dương cho quả bóng ở dưới gầm bàn.',
    targetWordId: 'kids-toys-ball', colourWordId: 'kids-colours-blue',
    sceneWordIds: ['kids-toys-ball', 'kids-home-table', 'kids-home-chair'], sceneNoteEn: 'Two balls: one under the table, one on the chair.',
    grammar: 'preposition: under' },
  { id: 'kids-colour-08', level: 'starters', commandEn: 'Colour the cat on the bed orange.', commandVi: 'Tô màu cam cho con mèo ở trên giường.',
    targetWordId: 'kids-animals-cat', colourWordId: 'kids-colours-orange',
    sceneWordIds: ['kids-animals-cat', 'kids-home-bed', 'kids-home-chair'], sceneNoteEn: 'Two cats: one on the bed, one under the chair.',
    grammar: 'preposition: on' },
  { id: 'kids-colour-09', level: 'starters', commandEn: 'Colour the duck in the box yellow.', commandVi: 'Tô màu vàng cho con vịt ở trong hộp.',
    targetWordId: 'kids-animals-duck', colourWordId: 'kids-colours-yellow',
    sceneWordIds: ['kids-animals-duck', 'kids-home-box'], sceneNoteEn: 'Two ducks: one in the box, one next to the box.',
    grammar: 'preposition: in' },
  { id: 'kids-colour-10', level: 'starters', commandEn: 'Colour the flower behind the tree pink.', commandVi: 'Tô màu hồng cho bông hoa ở sau cái cây.',
    targetWordId: 'kids-weather-flower', colourWordId: 'kids-colours-pink',
    sceneWordIds: ['kids-weather-flower', 'kids-weather-tree'], sceneNoteEn: 'Two flowers: one behind the tree, one in front of it.',
    grammar: 'preposition: behind' },
  { id: 'kids-colour-11', level: 'starters', commandEn: 'Colour the car between the bus and the lorry red.', commandVi: 'Tô màu đỏ cho chiếc ô tô ở giữa xe buýt và xe tải.',
    targetWordId: 'kids-transport-car', colourWordId: 'kids-colours-red',
    sceneWordIds: ['kids-transport-car', 'kids-transport-bus', 'kids-transport-lorry'],
    sceneNoteEn: 'Two cars: one between the bus and the lorry, one at the end of the line.', grammar: 'preposition: between' },
  { id: 'kids-colour-12', level: 'starters', commandEn: "Colour the girl's dress purple.", commandVi: 'Tô màu tím cho chiếc váy của cô bé.',
    targetWordId: 'kids-clothes-dress', colourWordId: 'kids-colours-purple',
    sceneWordIds: ['kids-family-girl', 'kids-clothes-dress', 'kids-family-woman'], sceneNoteEn: 'A girl and a woman, both wearing dresses.',
    grammar: "possessive 's" },

  /* ===================== MOVERS ===================== */
  { id: 'kids-colour-13', level: 'movers', commandEn: 'Colour the bigger balloon orange.', commandVi: 'Tô màu cam cho quả bóng bay to hơn.',
    targetWordId: 'kids-toys-balloon', colourWordId: 'kids-colours-orange',
    sceneWordIds: ['kids-toys-balloon'], sceneNoteEn: 'Two balloons of different sizes.', grammar: 'comparative: bigger' },
  { id: 'kids-colour-14', level: 'movers', commandEn: 'Colour the taller tree green.', commandVi: 'Tô màu xanh lá cho cái cây cao hơn.',
    targetWordId: 'kids-weather-tree', colourWordId: 'kids-colours-green',
    sceneWordIds: ['kids-weather-tree', 'kids-home-house'], sceneNoteEn: 'Two trees next to a house: one tall, one short.',
    grammar: 'comparative: taller' },
  { id: 'kids-colour-15', level: 'movers', commandEn: 'Colour the smallest fish pink.', commandVi: 'Tô màu hồng cho con cá nhỏ nhất.',
    targetWordId: 'kids-animals-fish', colourWordId: 'kids-colours-pink',
    sceneWordIds: ['kids-animals-fish'], sceneNoteEn: 'Three fish: big, middle, small.', grammar: 'superlative: smallest' },
  { id: 'kids-colour-16', level: 'movers', commandEn: 'Colour the longest snake green.', commandVi: 'Tô màu xanh lá cho con rắn dài nhất.',
    targetWordId: 'kids-animals-snake', colourWordId: 'kids-colours-green',
    sceneWordIds: ['kids-animals-snake', 'kids-weather-rock'], sceneNoteEn: 'Three snakes of different lengths near a rock.',
    grammar: 'superlative: longest' },
  { id: 'kids-colour-17', level: 'movers', commandEn: 'Colour both shoes brown.', commandVi: 'Tô màu nâu cho cả hai chiếc giày.',
    targetWordId: 'kids-clothes-shoes', colourWordId: 'kids-colours-brown',
    sceneWordIds: ['kids-clothes-shoes', 'kids-clothes-socks', 'kids-home-bed'], sceneNoteEn: 'A pair of shoes and a pair of socks next to a bed.',
    grammar: 'both' },
  { id: 'kids-colour-18', level: 'movers', commandEn: 'Colour all the stars yellow.', commandVi: 'Tô màu vàng cho tất cả các ngôi sao.',
    targetWordId: 'kids-colours-star', colourWordId: 'kids-colours-yellow',
    sceneWordIds: ['kids-colours-star', 'kids-weather-moon', 'kids-weather-cloud'], sceneNoteEn: 'Night sky: four stars, a moon and a cloud.',
    grammar: 'all + plural' },
  { id: 'kids-colour-19', level: 'movers', commandEn: 'Colour the second car blue.', commandVi: 'Tô màu xanh dương cho chiếc ô tô thứ hai.',
    targetWordId: 'kids-transport-car', colourWordId: 'kids-colours-blue',
    sceneWordIds: ['kids-transport-car', 'kids-transport-road'], sceneNoteEn: 'Four cars in a line on a road, left to right.',
    grammar: 'ordinal number: second' },
  { id: 'kids-colour-20', level: 'movers', commandEn: 'Colour the kite above the tree red.', commandVi: 'Tô màu đỏ cho con diều ở phía trên cái cây.',
    targetWordId: 'kids-toys-kite', colourWordId: 'kids-colours-red',
    sceneWordIds: ['kids-toys-kite', 'kids-weather-tree', 'kids-home-house'], sceneNoteEn: 'Two kites: one above the tree, one above the house.',
    grammar: 'preposition: above' },
  { id: 'kids-colour-21', level: 'movers', commandEn: 'Colour the boat near the island orange.', commandVi: 'Tô màu cam cho con thuyền ở gần hòn đảo.',
    targetWordId: 'kids-transport-boat', colourWordId: 'kids-colours-orange',
    sceneWordIds: ['kids-transport-boat', 'kids-weather-island', 'kids-weather-sea'], sceneNoteEn: 'Two boats on the sea: one near the island, one far away.',
    grammar: 'preposition: near' },
  { id: 'kids-colour-22', level: 'movers', commandEn: 'Colour the dog that is sleeping black.', commandVi: 'Tô màu đen cho chú chó đang ngủ.',
    targetWordId: 'kids-animals-dog', colourWordId: 'kids-colours-black',
    sceneWordIds: ['kids-animals-dog', 'kids-toys-ball'], sceneNoteEn: 'Two dogs: one sleeping, one running after a ball.',
    grammar: 'relative clause: that is + -ing' },
  { id: 'kids-colour-23', level: 'movers', commandEn: 'Find the bird which is flying. Colour it blue.', commandVi: 'Tìm con chim đang bay rồi tô màu xanh dương nhé.',
    targetWordId: 'kids-animals-bird', colourWordId: 'kids-colours-blue',
    sceneWordIds: ['kids-animals-bird', 'kids-weather-tree'], sceneNoteEn: 'Two birds: one flying, one sitting in the tree.',
    grammar: 'relative clause: which is + -ing; pronoun it' },
  { id: 'kids-colour-24', level: 'movers', commandEn: 'Find the girl who is dancing. Colour her dress pink.', commandVi: 'Tìm cô bé đang nhảy múa rồi tô váy của bạn ấy màu hồng.',
    targetWordId: 'kids-clothes-dress', colourWordId: 'kids-colours-pink',
    sceneWordIds: ['kids-family-girl', 'kids-clothes-dress', 'kids-school-book'], sceneNoteEn: 'Two girls in dresses: one dancing, one reading.',
    grammar: 'relative clause: who is + -ing; possessive her' },
  { id: 'kids-colour-25', level: 'movers', commandEn: 'Can you see the boy who is holding a kite? Colour his T-shirt red.',
    commandVi: 'Bạn có thấy cậu bé đang cầm diều không? Tô áo phông của bạn ấy màu đỏ.',
    targetWordId: 'kids-clothes-t-shirt', colourWordId: 'kids-colours-red',
    sceneWordIds: ['kids-family-boy', 'kids-clothes-t-shirt', 'kids-toys-kite'], sceneNoteEn: 'Two boys in T-shirts: one holding a kite, one holding a ball.',
    grammar: 'relative clause: who is + -ing; possessive his' },
  { id: 'kids-colour-26', level: 'movers', commandEn: 'Can you see the man who is reading? Colour his hat green.',
    commandVi: 'Bạn có thấy chú đang đọc sách không? Tô mũ của chú ấy màu xanh lá.',
    targetWordId: 'kids-clothes-hat', colourWordId: 'kids-colours-green',
    sceneWordIds: ['kids-family-man', 'kids-clothes-hat', 'kids-school-book'], sceneNoteEn: 'Two men in hats: one reading a book, one sleeping.',
    grammar: 'relative clause: who is + -ing; possessive his' },
  { id: 'kids-colour-27', level: 'movers', commandEn: 'Colour the cat that is under the table grey.', commandVi: 'Tô màu xám cho con mèo đang ở dưới gầm bàn.',
    targetWordId: 'kids-animals-cat', colourWordId: 'kids-colours-grey',
    sceneWordIds: ['kids-animals-cat', 'kids-home-table', 'kids-home-sofa'], sceneNoteEn: 'Two cats: one under the table, one on the sofa.',
    grammar: 'relative clause: that is + preposition' },
  { id: 'kids-colour-28', level: 'movers', commandEn: 'Colour the rabbit that is eating a carrot grey.', commandVi: 'Tô màu xám cho con thỏ đang ăn cà rốt.',
    targetWordId: 'kids-animals-rabbit', colourWordId: 'kids-colours-grey',
    sceneWordIds: ['kids-animals-rabbit', 'kids-food-carrot'], sceneNoteEn: 'Two rabbits: one eating a carrot, one jumping.',
    grammar: 'relative clause: that is + -ing' },
  { id: 'kids-colour-29', level: 'movers', commandEn: "The baby's ball is under the chair. Colour it red.", commandVi: 'Quả bóng của em bé ở dưới gầm ghế. Tô nó màu đỏ nhé.',
    targetWordId: 'kids-toys-ball', colourWordId: 'kids-colours-red',
    sceneWordIds: ['kids-family-baby', 'kids-toys-ball', 'kids-home-chair'], sceneNoteEn: 'A baby on the floor; one ball under the chair, one ball on the table.',
    grammar: "possessive 's + pronoun it" },
  { id: 'kids-colour-30', level: 'movers', commandEn: 'Find the frog that is on the rock. Colour it brown.', commandVi: 'Tìm con ếch đang ngồi trên hòn đá rồi tô màu nâu nhé.',
    targetWordId: 'kids-animals-frog', colourWordId: 'kids-colours-brown',
    sceneWordIds: ['kids-animals-frog', 'kids-weather-rock'], sceneNoteEn: 'Two frogs: one on a rock, one in the water.',
    grammar: 'relative clause: that is + preposition; pronoun it' },
]
