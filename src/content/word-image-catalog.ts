/**
 * word-image-catalog.ts — DANH MỤC ẢNH MINH HOẠ TỪ VỰNG (Fluent Emoji 3D)
 * ----------------------------------------------------------------------------
 * Ảnh nằm ở: public/word-images/<slug>.webp  (160×160, nền trong suốt, ~5KB/ảnh)
 * Trên web : `/word-images/<slug>.webp`  → dùng hàm wordImageUrl(slug).
 *
 * "slug" = tên tiếng Anh chính thức (CLDR) của emoji, viết thường, dấu cách và
 * gạch dưới → gạch nối, bỏ dấu câu. VD "red apple" → red-apple, "cat face" → cat-face,
 * "man’s shoe" → mans-shoe, "keycap: 1" → keycap-1, "piñata" → pinata.
 *
 * File này gồm:
 *   - WORD_IMAGE_SLUGS : danh sách TẤT CẢ slug có ảnh (đã sắp xếp) — sinh tự động.
 *   - SYNONYMS         : bảng từ đồng nghĩa viết tay (VD apple → red-apple, lorry → delivery-truck).
 *   - findWordImage()  : từ / slug bất kỳ → slug có ảnh (khớp đúng, số ít/số nhiều, đồng nghĩa).
 *   - suggestWordImages(): gợi ý vài slug gần đúng (dùng chỉ mục từ khoá) — cho công cụ kiểm tra.
 *
 * Chỉ mục từ khoá (keyword → các slug), tên gốc và emoji của từng ảnh nằm trong
 * public/word-images/catalog.json (≈220KB) để file này nhỏ, không làm nặng bundle JS.
 * Trình duyệt tải catalog.json khi cần bằng loadWordImageCatalog().
 *
 * Kiểm tra nội dung dùng slug sai: xem scripts/check-word-images.ts.
 *
 * BẢN QUYỀN: ảnh là "Fluent Emoji" của Microsoft (github.com/microsoft/fluentui-emoji),
 * giấy phép MIT — Copyright (c) Microsoft Corporation. Được dùng, sửa, phát hành lại
 * miễn là giữ thông báo bản quyền + giấy phép: xem public/word-images/ATTRIBUTION.md.
 * Bản tải về: commit 1ffb34c (24/08/2026), chỉ lấy kiểu "3D", màu da "Default".
 */

/** Kích thước (px) của mỗi ảnh .webp trong public/word-images. */
export const WORD_IMAGE_SIZE = 160

/** Đường dẫn web của 1 ảnh. VD wordImageUrl('red-apple') → '/word-images/red-apple.webp' */
export function wordImageUrl(slug: string): string {
  return `/word-images/${slug}.webp`
}

/* ============================================================================
 * 1. DANH SÁCH SLUG CÓ ẢNH (sinh tự động từ metadata của kho Fluent Emoji — đừng sửa tay)
 *    29/10/2026: đã bỏ 63 ảnh chỉ khu trẻ em / trò chơi cũ dùng (file ảnh, từ đồng nghĩa và
 *    public/word-images/catalog.json đã xoá theo) — danh sách phải luôn khớp file có thật.
 * ========================================================================== */

// prettier-ignore
export const WORD_IMAGE_SLUGS = [
  '1st-place-medal', '2nd-place-medal', '3rd-place-medal', 'a-button-blood-type', 'ab-button-blood-type',
  'abacus', 'accordion', 'adhesive-bandage', 'admission-tickets', 'aerial-tramway', 'airplane',
  'airplane-arrival', 'airplane-departure', 'alarm-clock', 'alembic', 'ambulance', 'american-football',
  'amphora', 'anatomical-heart', 'anchor', 'anger-symbol', 'angry-face', 'angry-face-with-horns',
  'anguished-face', 'ant', 'antenna-bars', 'anxious-face-with-sweat', 'aquarius', 'aries',
  'articulated-lorry', 'artist', 'artist-palette', 'astonished-face', 'astronaut', 'atm-sign', 'atom-symbol',
  'auto-rickshaw', 'automobile', 'avocado', 'axe', 'b-button-blood-type', 'baby', 'baby-angel', 'baby-bottle',
  'baby-chick', 'baby-symbol', 'back-arrow', 'backhand-index-pointing-left', 'backhand-index-pointing-right',
  'backhand-index-pointing-up', 'backpack', 'bacon', 'badger', 'badminton', 'bagel', 'baggage-claim',
  'baguette-bread', 'balance-scale', 'ballet-shoes', 'balloon', 'ballot-box-with-ballot', 'banana', 'banjo',
  'bank', 'bar-chart', 'barber-pole', 'baseball', 'basket', 'basketball', 'bat', 'bathtub', 'battery',
  'beach-with-umbrella', 'beaming-face-with-smiling-eyes', 'beans', 'bear', 'beating-heart', 'beaver', 'bed',
  'beer-mug', 'beetle', 'bell', 'bell-pepper', 'bell-with-slash', 'bellhop-bell', 'bento-box', 'beverage-box',
  'bicycle', 'bikini', 'billed-cap', 'biohazard', 'bird', 'birthday-cake', 'bison', 'biting-lip',
  'black-bird', 'black-cat', 'black-circle', 'black-flag', 'black-large-square', 'black-medium-small-square',
  'black-medium-square', 'black-nib', 'black-small-square', 'black-square-button', 'blossom', 'blowfish',
  'blue-book', 'blue-circle', 'blue-square', 'blueberries', 'boar', 'bomb', 'bone', 'bookmark',
  'bookmark-tabs', 'books', 'boomerang', 'bottle-with-popping-cork', 'bouquet', 'bow-and-arrow', 'bowling',
  'boxing-glove', 'boy', 'brain', 'bread', 'breast-feeding', 'brick', 'bridge-at-night', 'briefcase',
  'briefs', 'bright-button', 'broccoli', 'broken-chain', 'broken-heart', 'broom', 'brown-circle',
  'brown-mushroom', 'brown-square', 'bubble-tea', 'bubbles', 'bucket', 'bug', 'building-construction',
  'bullet-train', 'bullseye', 'burrito', 'bus', 'bus-stop', 'bust-in-silhouette', 'busts-in-silhouette',
  'butter', 'butterfly', 'cactus', 'calendar', 'call-me-hand', 'camel', 'camera', 'camera-with-flash',
  'camping', 'cancer', 'candle', 'candy', 'canned-food', 'canoe', 'capricorn', 'card-file-box', 'card-index',
  'carousel-horse', 'carp-streamer', 'carpentry-saw', 'carrot', 'castle', 'cat', 'cat-face',
  'cat-with-tears-of-joy', 'cat-with-wry-smile', 'chains', 'chair', 'chart-decreasing', 'chart-increasing',
  'chart-increasing-with-yen', 'check-box-with-check', 'check-mark', 'check-mark-button', 'cheese-wedge',
  'chequered-flag', 'cherries', 'cherry-blossom', 'chess-pawn', 'chestnut', 'chicken', 'child',
  'children-crossing', 'chipmunk', 'chocolate-bar', 'chopsticks', 'christmas-tree', 'church', 'cigarette',
  'cinema', 'circled-m', 'circus-tent', 'cityscape', 'cityscape-at-dusk', 'cl-button', 'clamp',
  'clapper-board', 'classical-building', 'clinking-beer-mugs', 'clinking-glasses', 'clipboard',
  'clockwise-vertical-arrows', 'closed-book', 'closed-mailbox-with-lowered-flag',
  'closed-mailbox-with-raised-flag', 'closed-umbrella', 'cloud', 'cloud-with-lightning',
  'cloud-with-lightning-and-rain', 'cloud-with-rain', 'cloud-with-snow', 'clown-face', 'club-suit',
  'clutch-bag', 'coat', 'cockroach', 'cocktail-glass', 'coconut', 'coffin', 'coin', 'cold-face', 'collision',
  'comet', 'compass', 'computer-disk', 'computer-mouse', 'confetti-ball', 'confounded-face', 'confused-face',
  'construction', 'construction-worker', 'control-knobs', 'convenience-store', 'cook', 'cooked-rice',
  'cookie', 'cooking', 'cool-button', 'copyright', 'coral', 'couch-and-lamp',
  'counterclockwise-arrows-button', 'cow', 'cow-face', 'cowboy-hat-face', 'crab', 'credit-card',
  'crescent-moon', 'cricket', 'cricket-game', 'crocodile', 'croissant', 'cross-mark', 'cross-mark-button',
  'crossed-fingers', 'crossed-flags', 'crossed-swords', 'crown', 'crutch', 'crying-cat', 'crying-face',
  'crystal-ball', 'cucumber', 'cup-with-straw', 'cupcake', 'curling-stone', 'curly-loop', 'currency-exchange',
  'curry-rice', 'custard', 'customs', 'cut-of-meat', 'cyclone', 'dagger', 'dango', 'deaf-man', 'deaf-person',
  'deaf-woman', 'deciduous-tree', 'deer', 'delivery-truck', 'department-store', 'derelict-house', 'desert',
  'desert-island', 'desktop-computer', 'detective', 'diamond-suit', 'diamond-with-a-dot', 'dim-button',
  'disappointed-face', 'disguised-face', 'divide', 'diving-mask', 'diya-lamp', 'dizzy', 'dna', 'dodo', 'dog',
  'dog-face', 'dollar-banknote', 'dolphin', 'donkey', 'door', 'dotted-line-face', 'dotted-six-pointed-star',
  'double-curly-loop', 'double-exclamation-mark', 'doughnut', 'dove', 'down-arrow', 'down-left-arrow',
  'down-right-arrow', 'downcast-face-with-sweat', 'downwards-button', 'dragon', 'dress', 'drooling-face',
  'drop-of-blood', 'droplet', 'drum', 'duck', 'dumpling', 'dvd', 'e-mail', 'eagle', 'ear', 'ear-of-corn',
  'ear-with-hearing-aid', 'egg', 'eggplant', 'eight-oclock', 'eight-pointed-star', 'eight-spoked-asterisk',
  'eight-thirty', 'eject-button', 'electric-plug', 'elephant', 'elevator', 'eleven-oclock', 'eleven-thirty',
  'elf', 'empty-nest', 'end-arrow', 'envelope', 'envelope-with-arrow', 'euro-banknote', 'evergreen-tree',
  'ewe', 'exclamation-question-mark', 'exploding-head', 'expressionless-face', 'eye', 'eye-in-speech-bubble',
  'eyes', 'face-blowing-a-kiss', 'face-exhaling', 'face-holding-back-tears', 'face-in-clouds',
  'face-savoring-food', 'face-screaming-in-fear', 'face-vomiting', 'face-with-diagonal-mouth',
  'face-with-hand-over-mouth', 'face-with-head-bandage', 'face-with-medical-mask', 'face-with-monocle',
  'face-with-open-eyes-and-hand-over-mouth', 'face-with-open-mouth', 'face-with-peeking-eye',
  'face-with-raised-eyebrow', 'face-with-rolling-eyes', 'face-with-spiral-eyes', 'face-with-steam-from-nose',
  'face-with-symbols-on-mouth', 'face-with-tears-of-joy', 'face-with-thermometer', 'face-with-tongue',
  'face-without-mouth', 'factory', 'factory-worker', 'fairy', 'falafel', 'fallen-leaf', 'farmer',
  'fast-down-button', 'fast-forward-button', 'fast-reverse-button', 'fast-up-button', 'fax-machine',
  'fearful-face', 'feather', 'female-sign', 'ferry', 'file-cabinet', 'file-folder', 'film-frames',
  'film-projector', 'fire', 'fire-engine', 'firecracker', 'firefighter', 'fireworks', 'first-quarter-moon',
  'first-quarter-moon-face', 'fish', 'fish-cake-with-swirl', 'fishing-pole', 'five-oclock', 'five-thirty',
  'flag-in-hole', 'flamingo', 'flashlight', 'flat-shoe', 'flatbread', 'fleur-de-lis', 'flexed-biceps',
  'floppy-disk', 'flushed-face', 'flute', 'fly', 'flying-disc', 'flying-saucer', 'fog', 'foggy',
  'folded-hands', 'folding-hand-fan', 'fondue', 'foot', 'footprints', 'fork-and-knife-with-plate',
  'fortune-cookie', 'fountain', 'fountain-pen', 'four-leaf-clover', 'four-oclock', 'four-thirty', 'fox',
  'framed-picture', 'free-button', 'french-fries', 'fried-shrimp', 'frog', 'front-facing-baby-chick',
  'frowning-face', 'frowning-face-with-open-mouth', 'fuel-pump', 'full-moon', 'full-moon-face', 'funeral-urn',
  'game-die', 'garlic', 'gear', 'gemini', 'genie', 'ghost', 'ginger-root', 'giraffe', 'girl', 'glass-of-milk',
  'glasses', 'globe-showing-americas', 'globe-showing-asia-australia', 'globe-showing-europe-africa',
  'globe-with-meridians', 'gloves', 'glowing-star', 'goal-net', 'goat', 'goblin', 'goggles', 'goose',
  'gorilla', 'graduation-cap', 'grapes', 'green-apple', 'green-book', 'green-circle', 'green-salad',
  'grey-heart', 'grimacing-face', 'grinning-cat', 'grinning-face', 'grinning-face-with-big-eyes',
  'grinning-face-with-smiling-eyes', 'grinning-face-with-sweat', 'grinning-squinting-face', 'growing-heart',
  'guard', 'guide-dog', 'guitar', 'hair-pick', 'hamburger', 'hammer', 'hammer-and-pick', 'hammer-and-wrench',
  'hamsa', 'hamster', 'hand-with-fingers-splayed', 'hand-with-index-finger-and-thumb-crossed', 'handbag',
  'handshake', 'hatching-chick', 'head-shaking-horizontally', 'head-shaking-vertically', 'headphone',
  'headstone', 'health-worker', 'hear-no-evil-monkey', 'heart-decoration', 'heart-exclamation', 'heart-hands',
  'heart-on-fire', 'heart-suit', 'heart-with-arrow', 'heart-with-ribbon', 'heavy-dollar-sign',
  'heavy-equals-sign', 'hedgehog', 'helicopter', 'herb', 'hibiscus', 'high-heeled-shoe', 'high-speed-train',
  'high-voltage', 'hiking-boot', 'hindu-temple', 'hole', 'hollow-red-circle', 'honey-pot', 'honeybee', 'hook',
  'horizontal-traffic-light', 'horse', 'horse-face', 'horse-racing', 'hospital', 'hot-beverage', 'hot-dog',
  'hot-face', 'hot-pepper', 'hot-springs', 'hotel', 'hourglass-done', 'hourglass-not-done', 'house',
  'house-with-garden', 'houses', 'hugging-face', 'hundred-points', 'hushed-face', 'hut', 'hyacinth', 'ice',
  'ice-cream', 'ice-hockey', 'ice-skate', 'id-button', 'identification-card', 'inbox-tray',
  'incoming-envelope', 'index-pointing-at-the-viewer', 'index-pointing-up', 'infinity', 'information',
  'input-latin-letters', 'input-latin-uppercase', 'input-symbols', 'jack-o-lantern',
  'japanese-acceptable-button', 'japanese-application-button', 'japanese-bargain-button', 'japanese-castle',
  'japanese-congratulations-button', 'japanese-discount-button', 'japanese-dolls',
  'japanese-free-of-charge-button', 'japanese-here-button', 'japanese-monthly-amount-button',
  'japanese-no-vacancy-button', 'japanese-not-free-of-charge-button', 'japanese-open-for-business-button',
  'japanese-passing-grade-button', 'japanese-post-office', 'japanese-prohibited-button',
  'japanese-reserved-button', 'japanese-secret-button', 'japanese-service-charge-button',
  'japanese-symbol-for-beginner', 'japanese-vacancy-button', 'jar', 'jeans', 'jellyfish', 'joystick', 'judge',
  'kaaba', 'kangaroo', 'key', 'keyboard', 'keycap-0', 'keycap-1', 'keycap-10', 'keycap-2', 'keycap-3',
  'keycap-4', 'keycap-5', 'keycap-6', 'keycap-7', 'keycap-8', 'keycap-9', 'keycap-asterisk', 'keycap-hash',
  'khanda', 'kick-scooter', 'kimono', 'kiss-mark', 'kissing-cat', 'kissing-face',
  'kissing-face-with-closed-eyes', 'kissing-face-with-smiling-eyes', 'kitchen-knife', 'kite', 'kiwi-fruit',
  'knocked-out-face', 'koala', 'lab-coat', 'label', 'lacrosse', 'ladder', 'lady-beetle', 'laptop',
  'large-blue-diamond', 'large-orange-diamond', 'last-quarter-moon', 'last-quarter-moon-face',
  'last-track-button', 'latin-cross', 'leaf-fluttering-in-wind', 'leafy-green', 'ledger', 'left-arrow',
  'left-arrow-curving-right', 'left-facing-fist', 'left-luggage', 'left-right-arrow', 'left-speech-bubble',
  'leftwards-hand', 'leftwards-pushing-hand', 'leg', 'lemon', 'leo', 'leopard', 'level-slider', 'libra',
  'light-blue-heart', 'light-bulb', 'light-rail', 'lime', 'link', 'linked-paperclips', 'lion', 'lipstick',
  'litter-in-bin-sign', 'lizard', 'llama', 'lobster', 'locked', 'locked-with-key', 'locked-with-pen',
  'lollipop', 'long-drum', 'lotion-bottle', 'lotus', 'loudly-crying-face', 'loudspeaker', 'love-hotel',
  'love-letter', 'love-you-gesture', 'low-battery', 'luggage', 'lungs', 'lying-face', 'mage', 'magic-wand',
  'magnet', 'magnifying-glass-tilted-left', 'magnifying-glass-tilted-right', 'mahjong-red-dragon',
  'male-sign', 'mammoth', 'man', 'man-astronaut', 'man-bald', 'man-beard', 'man-biking', 'man-blond-hair',
  'man-bouncing-ball', 'man-bowing', 'man-cartwheeling', 'man-climbing', 'man-construction-worker',
  'man-curly-hair', 'man-dancing', 'man-detective', 'man-elf', 'man-facepalming', 'man-factory-worker',
  'man-fairy', 'man-farmer', 'man-feeding-baby', 'man-firefighter', 'man-frowning', 'man-genie',
  'man-gesturing-no', 'man-gesturing-ok', 'man-getting-haircut', 'man-getting-massage', 'man-golfing',
  'man-guard', 'man-health-worker', 'man-in-lotus-position', 'man-in-manual-wheelchair',
  'man-in-manual-wheelchair-facing-right', 'man-in-motorized-wheelchair',
  'man-in-motorized-wheelchair-facing-right', 'man-in-steamy-room', 'man-in-tuxedo', 'man-judge',
  'man-juggling', 'man-kneeling', 'man-kneeling-facing-right', 'man-lifting-weights', 'man-mage',
  'man-mechanic', 'man-mountain-biking', 'man-office-worker', 'man-pilot', 'man-playing-handball',
  'man-playing-water-polo', 'man-police-officer', 'man-pouting', 'man-raising-hand', 'man-red-hair',
  'man-rowing-boat', 'man-running', 'man-running-facing-right', 'man-scientist', 'man-shrugging',
  'man-singer', 'man-standing', 'man-student', 'man-superhero', 'man-supervillain', 'man-surfing',
  'man-swimming', 'man-teacher', 'man-technologist', 'man-tipping-hand', 'man-vampire', 'man-walking',
  'man-walking-facing-right', 'man-wearing-turban', 'man-white-hair', 'man-with-veil', 'man-with-white-cane',
  'man-with-white-cane-facing-right', 'man-zombie', 'mango', 'mans-shoe', 'mantelpiece-clock',
  'manual-wheelchair', 'map-of-japan', 'maple-leaf', 'maracas', 'martial-arts-uniform', 'mate',
  'meat-on-bone', 'mechanic', 'mechanical-arm', 'mechanical-leg', 'medical-symbol', 'megaphone', 'melon',
  'melting-face', 'memo', 'men-with-bunny-ears', 'men-wrestling', 'mending-heart', 'menorah', 'mens-room',
  'mermaid', 'merman', 'merperson', 'metro', 'microbe', 'microphone', 'microscope', 'middle-finger',
  'military-helmet', 'military-medal', 'milky-way', 'minibus', 'minus', 'mirror', 'mirror-ball', 'moai',
  'mobile-phone', 'mobile-phone-off', 'mobile-phone-with-arrow', 'money-bag', 'money-mouth-face',
  'money-with-wings', 'monkey', 'monorail', 'moon-cake', 'moon-viewing-ceremony', 'moose', 'mosque',
  'mosquito', 'motor-boat', 'motor-scooter', 'motorcycle', 'motorized-wheelchair', 'motorway', 'mount-fuji',
  'mountain', 'mountain-cableway', 'mountain-railway', 'mouse', 'mouse-face', 'mouse-trap', 'mouth',
  'movie-camera', 'mrs-claus', 'mushroom', 'musical-keyboard', 'musical-note', 'musical-notes',
  'musical-score', 'muted-speaker', 'mx-claus', 'nail-polish', 'name-badge', 'national-park',
  'nauseated-face', 'nazar-amulet', 'necktie', 'nerd-face', 'nest-with-eggs', 'neutral-face', 'new-button',
  'new-moon', 'new-moon-face', 'newspaper', 'next-track-button', 'ng-button', 'night-with-stars',
  'nine-oclock', 'nine-thirty', 'ninja', 'no-bicycles', 'no-entry', 'no-littering', 'no-mobile-phones',
  'no-one-under-eighteen', 'no-pedestrians', 'no-smoking', 'non-potable-water', 'nose', 'notebook',
  'notebook-with-decorative-cover', 'nut-and-bolt', 'o-button-blood-type', 'octopus', 'oden',
  'office-building', 'office-worker', 'oil-drum', 'ok-button', 'ok-hand', 'old-man', 'old-woman',
  'older-person', 'olive', 'om', 'on-arrow', 'oncoming-automobile', 'oncoming-bus', 'oncoming-fist',
  'oncoming-police-car', 'oncoming-taxi', 'one-oclock', 'one-piece-swimsuit', 'one-thirty', 'onion',
  'open-book', 'open-file-folder', 'open-hands', 'open-mailbox-with-lowered-flag',
  'open-mailbox-with-raised-flag', 'ophiuchus', 'optical-disk', 'orange-book', 'orange-circle',
  'orange-square', 'orangutan', 'orthodox-cross', 'otter', 'outbox-tray', 'owl', 'ox', 'oyster', 'p-button',
  'package', 'page-facing-up', 'page-with-curl', 'pager', 'paintbrush', 'palm-down-hand', 'palm-tree',
  'palm-up-hand', 'palms-up-together', 'pancakes', 'panda', 'paperclip', 'parachute', 'parrot',
  'part-alternation-mark', 'party-popper', 'passport-control', 'pause-button', 'pea-pod', 'peace-symbol',
  'peach', 'peacock', 'peanuts', 'pear', 'pen', 'pencil', 'penguin', 'pensive-face', 'people-hugging',
  'people-with-bunny-ears', 'people-wrestling', 'performing-arts', 'persevering-face', 'person',
  'person-bald', 'person-beard', 'person-biking', 'person-blond-hair', 'person-bouncing-ball',
  'person-bowing', 'person-cartwheeling', 'person-climbing', 'person-curly-hair', 'person-facepalming',
  'person-feeding-baby', 'person-fencing', 'person-frowning', 'person-gesturing-no', 'person-gesturing-ok',
  'person-getting-haircut', 'person-getting-massage', 'person-golfing', 'person-in-bed',
  'person-in-lotus-position', 'person-in-manual-wheelchair', 'person-in-manual-wheelchair-facing-right',
  'person-in-motorized-wheelchair', 'person-in-motorized-wheelchair-facing-right', 'person-in-steamy-room',
  'person-in-suit-levitating', 'person-in-tuxedo', 'person-juggling', 'person-kneeling',
  'person-kneeling-facing-right', 'person-lifting-weights', 'person-mountain-biking',
  'person-playing-handball', 'person-playing-water-polo', 'person-pouting', 'person-raising-hand',
  'person-red-hair', 'person-rowing-boat', 'person-running', 'person-running-facing-right',
  'person-shrugging', 'person-standing', 'person-surfing', 'person-swimming', 'person-taking-bath',
  'person-tipping-hand', 'person-walking', 'person-walking-facing-right', 'person-wearing-turban',
  'person-white-hair', 'person-with-crown', 'person-with-skullcap', 'person-with-veil',
  'person-with-white-cane', 'person-with-white-cane-facing-right', 'petri-dish', 'phoenix', 'pick',
  'pickup-truck', 'pie', 'pig', 'pig-face', 'pig-nose', 'pile-of-poo', 'pill', 'pilot', 'pinata',
  'pinched-fingers', 'pinching-hand', 'pine-decoration', 'pineapple', 'ping-pong', 'pink-heart',
  'pirate-flag', 'pisces', 'pizza', 'placard', 'place-of-worship', 'play-button', 'play-or-pause-button',
  'playground-slide', 'pleading-face', 'plunger', 'plus', 'polar-bear', 'police-car', 'police-officer',
  'poodle', 'pool-8-ball', 'popcorn', 'post-office', 'postal-horn', 'postbox', 'pot-of-food', 'potable-water',
  'potato', 'potted-plant', 'poultry-leg', 'pound-banknote', 'pouring-liquid', 'pouting-cat', 'pouting-face',
  'prayer-beads', 'pregnant-man', 'pregnant-person', 'pregnant-woman', 'pretzel', 'prince', 'princess',
  'printer', 'prohibited', 'purple-circle', 'purple-square', 'purse', 'pushpin', 'puzzle-piece', 'rabbit',
  'rabbit-face', 'raccoon', 'racing-car', 'radio', 'radio-button', 'radioactive', 'railway-car',
  'railway-track', 'rainbow', 'rainbow-flag', 'raised-back-of-hand', 'raised-fist', 'raised-hand',
  'raising-hands', 'ram', 'rat', 'razor', 'receipt', 'record-button', 'recycling-symbol', 'red-apple',
  'red-circle', 'red-envelope', 'red-exclamation-mark', 'red-heart', 'red-paper-lantern', 'red-question-mark',
  'red-square', 'red-triangle-pointed-down', 'red-triangle-pointed-up', 'registered', 'relieved-face',
  'reminder-ribbon', 'repeat-button', 'repeat-single-button', 'rescue-workers-helmet', 'restroom',
  'reverse-button', 'revolving-hearts', 'rhinoceros', 'rice-ball', 'rice-cracker', 'right-anger-bubble',
  'right-arrow', 'right-arrow-curving-down', 'right-arrow-curving-left', 'right-arrow-curving-up',
  'right-facing-fist', 'rightwards-hand', 'rightwards-pushing-hand', 'ring', 'ring-buoy', 'ringed-planet',
  'roasted-sweet-potato', 'robot', 'rock', 'rocket', 'roll-of-paper', 'rolled-up-newspaper', 'roller-coaster',
  'rolling-on-the-floor-laughing', 'rooster', 'rose', 'rosette', 'round-pushpin', 'rugby-football',
  'running-shirt', 'running-shoe', 'sad-but-relieved-face', 'safety-pin', 'safety-vest', 'sagittarius',
  'sailboat', 'sake', 'salt', 'saluting-face', 'sandwich', 'santa-claus', 'sari', 'satellite',
  'satellite-antenna', 'sauropod', 'saxophone', 'scarf', 'school', 'scientist', 'scissors', 'scorpio',
  'scorpion', 'screwdriver', 'scroll', 'seal', 'seat', 'see-no-evil-monkey', 'seedling', 'selfie',
  'service-dog', 'seven-oclock', 'seven-thirty', 'sewing-needle', 'shaking-face', 'shallow-pan-of-food',
  'shamrock', 'shark', 'shaved-ice', 'sheaf-of-rice', 'shield', 'shinto-shrine', 'ship', 'shooting-star',
  'shopping-bags', 'shopping-cart', 'shortcake', 'shorts', 'shower', 'shrimp', 'shuffle-tracks-button',
  'shushing-face', 'sign-of-the-horns', 'singer', 'six-oclock', 'six-thirty', 'skateboard', 'skier', 'skis',
  'skull', 'skull-and-crossbones', 'skunk', 'sled', 'sleeping-face', 'sleepy-face', 'slightly-smiling-face',
  'slot-machine', 'sloth', 'small-airplane', 'small-blue-diamond', 'small-orange-diamond',
  'smiling-cat-with-heart-eyes', 'smiling-face', 'smiling-face-with-halo', 'smiling-face-with-heart-eyes',
  'smiling-face-with-hearts', 'smiling-face-with-horns', 'smiling-face-with-smiling-eyes',
  'smiling-face-with-sunglasses', 'smiling-face-with-tear', 'smirking-face', 'snail', 'snake',
  'sneezing-face', 'snow-capped-mountain', 'snowboarder', 'snowflake', 'snowman', 'snowman-without-snow',
  'soap', 'soccer-ball', 'socks', 'soon-arrow', 'sos-button', 'spade-suit', 'spaghetti', 'sparkle',
  'sparkler', 'sparkles', 'speak-no-evil-monkey', 'speaker-high-volume', 'speaker-low-volume',
  'speaker-medium-volume', 'speaking-head', 'speech-balloon', 'speedboat', 'spider', 'spider-web',
  'spiral-calendar', 'spiral-notepad', 'spiral-shell', 'sponge', 'spoon', 'sport-utility-vehicle',
  'sports-medal', 'spouting-whale', 'squid', 'squinting-face-with-tongue', 'stadium', 'star',
  'star-and-crescent', 'star-of-david', 'star-struck', 'station', 'statue-of-liberty', 'steaming-bowl',
  'stethoscope', 'stop-button', 'stop-sign', 'stopwatch', 'strawberry', 'student', 'studio-microphone',
  'stuffed-flatbread', 'sun', 'sun-behind-cloud', 'sun-behind-large-cloud', 'sun-behind-small-cloud',
  'sun-with-face', 'sunflower', 'sunglasses', 'sunrise', 'sunrise-over-mountains', 'sunset', 'superhero',
  'supervillain', 'sushi', 'suspension-railway', 'swan', 'sweat-droplets', 'synagogue', 'syringe', 't-shirt',
  'taco', 'takeout-box', 'tamale', 'tanabata-tree', 'tangerine', 'taurus', 'taxi', 'teacher',
  'teacup-without-handle', 'teapot', 'tear-off-calendar', 'technologist', 'teddy-bear', 'telephone',
  'telephone-receiver', 'telescope', 'television', 'ten-oclock', 'ten-thirty', 'tennis', 'tent', 'test-tube',
  'thermometer', 'thinking-face', 'thong-sandal', 'thought-balloon', 'thread', 'three-oclock', 'three-thirty',
  'thumbs-down', 'thumbs-up', 'ticket', 'tiger', 'timer-clock', 'tired-face', 'toilet', 'tokyo-tower',
  'tomato', 'tongue', 'toolbox', 'tooth', 'toothbrush', 'top-arrow', 'tornado', 'trackball', 'tractor',
  'trade-mark', 'train', 'tram', 'tram-car', 'transgender-flag', 'transgender-symbol', 'triangular-flag',
  'triangular-ruler', 'trident-emblem', 'troll', 'trolleybus', 'trophy', 'tropical-drink', 'tropical-fish',
  'trumpet', 'tulip', 'tumbler-glass', 'turkey', 'turtle', 'twelve-thirty', 'two-hump-camel', 'two-oclock',
  'two-thirty', 'umbrella', 'umbrella-on-ground', 'unamused-face', 'unlocked', 'up-arrow', 'up-button',
  'up-down-arrow', 'up-left-arrow', 'up-right-arrow', 'upside-down-face', 'upwards-button', 'vampire',
  'vertical-traffic-light', 'vibration-mode', 'victory-hand', 'video-camera', 'video-game', 'videocassette',
  'violin', 'virgo', 'volcano', 'volleyball', 'vs-button', 'vulcan-salute', 'waffle', 'waning-crescent-moon',
  'waning-gibbous-moon', 'warning', 'wastebasket', 'watch', 'water-buffalo', 'water-closet', 'water-pistol',
  'water-wave', 'watermelon', 'waving-hand', 'wavy-dash', 'waxing-crescent-moon', 'waxing-gibbous-moon',
  'weary-cat', 'weary-face', 'wedding', 'whale', 'wheel', 'wheel-of-dharma', 'wheelchair-symbol',
  'white-cane', 'white-circle', 'white-exclamation-mark', 'white-flag', 'white-flower', 'white-large-square',
  'white-medium-small-square', 'white-medium-square', 'white-question-mark', 'white-small-square',
  'white-square-button', 'wilted-flower', 'wind-chime', 'wind-face', 'window', 'wine-glass', 'wing',
  'winking-face', 'winking-face-with-tongue', 'wireless', 'wolf', 'woman', 'woman-artist', 'woman-astronaut',
  'woman-bald', 'woman-beard', 'woman-biking', 'woman-blond-hair', 'woman-bouncing-ball', 'woman-bowing',
  'woman-cartwheeling', 'woman-climbing', 'woman-construction-worker', 'woman-cook', 'woman-curly-hair',
  'woman-dancing', 'woman-detective', 'woman-elf', 'woman-facepalming', 'woman-factory-worker', 'woman-fairy',
  'woman-feeding-baby', 'woman-firefighter', 'woman-frowning', 'woman-genie', 'woman-gesturing-no',
  'woman-gesturing-ok', 'woman-getting-haircut', 'woman-getting-massage', 'woman-golfing', 'woman-guard',
  'woman-health-worker', 'woman-in-lotus-position', 'woman-in-manual-wheelchair',
  'woman-in-manual-wheelchair-facing-right', 'woman-in-motorized-wheelchair',
  'woman-in-motorized-wheelchair-facing-right', 'woman-in-steamy-room', 'woman-in-tuxedo', 'woman-judge',
  'woman-juggling', 'woman-kneeling', 'woman-kneeling-facing-right', 'woman-lifting-weights', 'woman-mage',
  'woman-mountain-biking', 'woman-office-worker', 'woman-playing-handball', 'woman-playing-water-polo',
  'woman-police-officer', 'woman-pouting', 'woman-raising-hand', 'woman-red-hair', 'woman-rowing-boat',
  'woman-running', 'woman-running-facing-right', 'woman-scientist', 'woman-shrugging', 'woman-standing',
  'woman-student', 'woman-superhero', 'woman-supervillain', 'woman-surfing', 'woman-swimming',
  'woman-technologist', 'woman-tipping-hand', 'woman-vampire', 'woman-walking', 'woman-walking-facing-right',
  'woman-wearing-turban', 'woman-white-hair', 'woman-with-headscarf', 'woman-with-veil',
  'woman-with-white-cane', 'woman-with-white-cane-facing-right', 'woman-zombie', 'womans-boot',
  'womans-clothes', 'womans-hat', 'womans-sandal', 'women-with-bunny-ears', 'women-wrestling', 'womens-room',
  'wood', 'woozy-face', 'world-map', 'worm', 'worried-face', 'wrapped-gift', 'wrench', 'writing-hand',
  'x-ray', 'yarn', 'yawning-face', 'yellow-circle', 'yellow-square', 'yen-banknote', 'yin-yang', 'yo-yo',
  'zany-face', 'zebra', 'zipper-mouth-face', 'zzz',
] as const

/** Kiểu "slug có thật" — dùng được cho kiểu dữ liệu nội dung nếu muốn TypeScript tự bắt lỗi. */
export type WordImageSlug = (typeof WORD_IMAGE_SLUGS)[number]

/** Set để tra nhanh "slug này có ảnh không" (O(1)). */
const SLUG_SET: ReadonlySet<string> = new Set<string>(WORD_IMAGE_SLUGS)

/** true nếu đúng slug này có file ảnh. */
export function hasWordImage(slug: string): slug is WordImageSlug {
  return SLUG_SET.has(slug)
}

/* ============================================================================
 * 2. TỪ ĐỒNG NGHĨA (viết tay) — từ người học hay gặp → slug ảnh phù hợp nhất.
 *    Khoá viết dạng slug (chữ thường, gạch nối). Chỉ cần ghi khi từ đó KHÔNG
 *    phải là slug có sẵn (VD "cat" có sẵn ảnh cat → không cần ghi).
 *    Số nhiều tự xử lý (apples → apple → red-apple), không cần ghi.
 * ========================================================================== */

const SYNONYMS: Readonly<Record<string, string>> = {
  // --- gia đình, con người ---
  family: 'people-hugging', friend: 'people-hugging', parent: 'people-hugging',
  mother: 'woman-feeding-baby', mum: 'woman-feeding-baby', mom: 'woman-feeding-baby', mummy: 'woman-feeding-baby',
  father: 'man-feeding-baby', dad: 'man-feeding-baby', daddy: 'man-feeding-baby',
  grandmother: 'old-woman', grandma: 'old-woman', granny: 'old-woman',
  grandfather: 'old-man', grandpa: 'old-man', grandparent: 'older-person',
  son: 'boy', brother: 'boy', daughter: 'girl', sister: 'girl', kid: 'child',
  doctor: 'health-worker', nurse: 'health-worker', dentist: 'tooth',
  police: 'police-officer', policeman: 'police-officer', policewoman: 'police-officer',
  fireman: 'firefighter', chef: 'cook', pupil: 'student', builder: 'construction-worker',
  engineer: 'technologist', programmer: 'technologist', businessman: 'office-worker', businesswoman: 'office-worker',
  king: 'person-with-crown', queen: 'person-with-crown', clown: 'clown-face',
  dinosaur: 'sauropod',
  // --- con vật ---
  sheep: 'ewe', lamb: 'ewe', rhino: 'rhinoceros', bee: 'honeybee',
  ladybird: 'lady-beetle', ladybug: 'lady-beetle', tortoise: 'turtle', puppy: 'dog', kitten: 'cat',
  bunny: 'rabbit', bull: 'ox', cattle: 'cow', pony: 'horse', hen: 'chicken', chick: 'baby-chick',
  insect: 'bug', blackbird: 'black-bird',
  // --- đồ ăn, thức uống ---
  food: 'fork-and-knife-with-plate', meal: 'fork-and-knife-with-plate', restaurant: 'fork-and-knife-with-plate',
  fruit: 'red-apple', apple: 'red-apple', orange: 'tangerine', kiwi: 'kiwi-fruit',
  vegetable: 'carrot', corn: 'ear-of-corn', pepper: 'bell-pepper', chilli: 'hot-pepper', chili: 'hot-pepper',
  pea: 'pea-pod', lettuce: 'leafy-green', cabbage: 'leafy-green',
  rice: 'cooked-rice', meat: 'cut-of-meat', beef: 'cut-of-meat', pork: 'cut-of-meat',
  burger: 'hamburger', chips: 'french-fries', fries: 'french-fries', cake: 'shortcake',
  chocolate: 'chocolate-bar', sweet: 'candy', sweets: 'candy', biscuit: 'cookie',
  milk: 'glass-of-milk', juice: 'beverage-box', water: 'droplet', tea: 'teacup-without-handle',
  coffee: 'hot-beverage', cafe: 'hot-beverage', soup: 'pot-of-food', noodle: 'steaming-bowl', pho: 'steaming-bowl',
  pasta: 'spaghetti', salad: 'green-salad', cheese: 'cheese-wedge', honey: 'honey-pot',
  picnic: 'basket', drink: 'cup-with-straw', glass: 'tumbler-glass', wine: 'wine-glass', beer: 'beer-mug',
  knife: 'kitchen-knife', lunch: 'bento-box', 'mid-autumn': 'moon-cake', mooncake: 'moon-cake',
  // --- trường học, đồ vật ---
  book: 'closed-book', bag: 'backpack', schoolbag: 'backpack',
  computer: 'laptop', phone: 'mobile-phone', mobile: 'mobile-phone', smartphone: 'mobile-phone',
  tv: 'television', picture: 'framed-picture', painting: 'framed-picture', photo: 'camera-with-flash',
  paper: 'page-facing-up', homework: 'memo', note: 'memo', test: 'memo', exam: 'memo',
  question: 'red-question-mark', idea: 'light-bulb', music: 'musical-notes', song: 'musical-note',
  science: 'microscope', maths: 'abacus', math: 'abacus', art: 'artist-palette', history: 'scroll',
  geography: 'world-map', library: 'books', study: 'books', university: 'graduation-cap',
  college: 'graduation-cap', education: 'graduation-cap', graduation: 'graduation-cap',
  clock: 'mantelpiece-clock', time: 'alarm-clock', sofa: 'couch-and-lamp', couch: 'couch-and-lamp',
  bath: 'bathtub', box: 'package', gift: 'wrapped-gift', present: 'wrapped-gift', toy: 'teddy-bear',
  teddy: 'teddy-bear', ball: 'soccer-ball', game: 'video-game',
  'board-game': 'game-die', puzzle: 'puzzle-piece', chess: 'chess-pawn',
  money: 'money-bag', cash: 'dollar-banknote', letter: 'envelope', email: 'e-mail', mail: 'envelope',
  post: 'postbox', news: 'newspaper', message: 'speech-balloon', chat: 'speech-balloon',
  conversation: 'speech-balloon', internet: 'globe-with-meridians', wifi: 'wireless', 'wi-fi': 'wireless',
  technology: 'laptop', video: 'video-camera', film: 'clapper-board', movie: 'clapper-board',
  theatre: 'performing-arts', theater: 'performing-arts', culture: 'performing-arts',
  chart: 'bar-chart', graph: 'bar-chart', statistics: 'bar-chart', increase: 'chart-increasing',
  decrease: 'chart-decreasing', job: 'briefcase', work: 'briefcase', business: 'briefcase',
  medicine: 'pill', injection: 'syringe', vaccine: 'syringe', health: 'stethoscope',
  lantern: 'red-paper-lantern', festival: 'red-paper-lantern', tet: 'red-envelope',
  // --- quần áo ---
  clothes: 'womans-clothes', shirt: 't-shirt', tshirt: 't-shirt', trousers: 'jeans', pants: 'jeans',
  shoe: 'running-shoe', trainers: 'running-shoe', sneakers: 'running-shoe', boot: 'hiking-boot',
  hat: 'womans-hat', cap: 'billed-cap', jacket: 'coat', sock: 'socks', glove: 'gloves',
  swimsuit: 'one-piece-swimsuit', helmet: 'rescue-workers-helmet',
  // --- nơi chốn ---
  home: 'house', park: 'national-park', garden: 'house-with-garden', museum: 'classical-building',
  city: 'cityscape', town: 'cityscape', village: 'houses', farm: 'tractor', office: 'office-building',
  airport: 'airplane-departure', beach: 'beach-with-umbrella', sea: 'water-wave', ocean: 'water-wave',
  island: 'desert-island', forest: 'evergreen-tree', world: 'globe-showing-asia-australia',
  earth: 'globe-showing-asia-australia', globe: 'globe-showing-asia-australia', planet: 'ringed-planet',
  shop: 'convenience-store', store: 'convenience-store', supermarket: 'shopping-cart', mall: 'department-store',
  shopping: 'shopping-bags', playground: 'playground-slide', circus: 'circus-tent',
  bridge: 'bridge-at-night', road: 'motorway', street: 'motorway',
  map: 'world-map', housing: 'house',
  // --- giao thông, du lịch ---
  car: 'automobile', bike: 'bicycle', motorbike: 'motor-scooter', scooter: 'motor-scooter',
  plane: 'airplane', aeroplane: 'airplane', aircraft: 'airplane', boat: 'sailboat',
  lorry: 'delivery-truck', truck: 'delivery-truck', underground: 'metro', subway: 'metro',
  traffic: 'vertical-traffic-light', 'traffic-light': 'vertical-traffic-light', transport: 'bus',
  travel: 'luggage', trip: 'luggage', journey: 'luggage', suitcase: 'luggage', tourism: 'luggage',
  holiday: 'beach-with-umbrella', vacation: 'beach-with-umbrella', passport: 'passport-control',
  // --- thời tiết, thiên nhiên, thời gian ---
  weather: 'sun-behind-cloud', rain: 'cloud-with-rain', rainy: 'cloud-with-rain', sunny: 'sun',
  cloudy: 'cloud', snow: 'snowflake', snowy: 'snowflake', wind: 'wind-face', windy: 'wind-face',
  storm: 'cloud-with-lightning-and-rain', stormy: 'cloud-with-lightning-and-rain',
  thunder: 'cloud-with-lightning', lightning: 'cloud-with-lightning', temperature: 'thermometer',
  hot: 'hot-face', cold: 'cold-face', tree: 'deciduous-tree', flower: 'tulip', plant: 'potted-plant',
  leaf: 'leaf-fluttering-in-wind', moon: 'crescent-moon', shell: 'spiral-shell',
  nature: 'deciduous-tree', environment: 'recycling-symbol', energy: 'high-voltage', pollution: 'factory',
  morning: 'sunrise', evening: 'sunset', night: 'night-with-stars', day: 'sun',
  spring: 'cherry-blossom', summer: 'beach-with-umbrella', autumn: 'fallen-leaf', fall: 'fallen-leaf',
  winter: 'snowman', birthday: 'birthday-cake', party: 'party-popper', christmas: 'christmas-tree',
  // --- cơ thể, cảm xúc ---
  arm: 'flexed-biceps', hand: 'raised-hand', finger: 'index-pointing-up', hair: 'person-curly-hair',
  heart: 'red-heart', love: 'red-heart', happy: 'grinning-face', sad: 'frowning-face',
  angry: 'angry-face', tired: 'tired-face', sleepy: 'sleepy-face', hungry: 'face-savoring-food',
  scared: 'fearful-face', afraid: 'fearful-face', frightened: 'fearful-face', surprised: 'astonished-face',
  bored: 'unamused-face', worried: 'worried-face', excited: 'star-struck', ill: 'face-with-thermometer',
  sick: 'face-with-thermometer', confused: 'confused-face', nervous: 'anxious-face-with-sweat',
  shy: 'flushed-face', calm: 'relieved-face', relaxed: 'relieved-face', cool: 'smiling-face-with-sunglasses',
  headache: 'face-with-head-bandage',
  // --- hành động ---
  run: 'person-running', running: 'person-running', walk: 'person-walking', swim: 'person-swimming',
  swimming: 'person-swimming', climb: 'person-climbing', ride: 'person-biking', cycle: 'person-biking',
  cycling: 'person-biking', dance: 'woman-dancing', sing: 'microphone', read: 'open-book',
  write: 'writing-hand', paint: 'paintbrush', draw: 'pencil', eat: 'fork-and-knife-with-plate',
  sleep: 'sleeping-face', cry: 'loudly-crying-face', laugh: 'face-with-tears-of-joy',
  smile: 'slightly-smiling-face', buy: 'shopping-bags', call: 'telephone-receiver',
  build: 'building-construction', fix: 'hammer-and-wrench', repair: 'hammer-and-wrench',
  wait: 'hourglass-not-done', wave: 'waving-hand', listen: 'headphone',
  look: 'eyes', see: 'eyes', speak: 'speaking-head', talk: 'speaking-head', speaking: 'speaking-head',
  think: 'thinking-face', hello: 'waving-hand', hi: 'waving-hand', goodbye: 'waving-hand',
  bye: 'waving-hand', thanks: 'folded-hands', thank: 'folded-hands', yes: 'thumbs-up', ok: 'thumbs-up',
  correct: 'check-mark', wrong: 'cross-mark', exercise: 'person-lifting-weights', gym: 'person-lifting-weights',
  yoga: 'person-in-lotus-position',
  // --- thể thao, âm nhạc ---
  sport: 'sports-medal', football: 'soccer-ball', soccer: 'soccer-ball', 'table-tennis': 'ping-pong',
  fishing: 'fishing-pole', golf: 'flag-in-hole', ski: 'skier', skiing: 'skier',
  skating: 'ice-skate', 'ice-skating': 'ice-skate', goal: 'goal-net',
  prize: 'trophy', winner: '1st-place-medal', medal: 'sports-medal', karate: 'martial-arts-uniform',
  judo: 'martial-arts-uniform', boxing: 'boxing-glove', piano: 'musical-keyboard',
  // --- số, màu, hình ---
  zero: 'keycap-0', one: 'keycap-1', two: 'keycap-2', three: 'keycap-3', four: 'keycap-4',
  five: 'keycap-5', six: 'keycap-6', seven: 'keycap-7', eight: 'keycap-8', nine: 'keycap-9',
  ten: 'keycap-10', hundred: 'hundred-points',
  colour: 'artist-palette', color: 'artist-palette', red: 'red-circle', blue: 'blue-circle',
  green: 'green-circle', yellow: 'yellow-circle', purple: 'purple-circle', brown: 'brown-circle',
  black: 'black-circle', white: 'white-circle', pink: 'pink-heart', grey: 'grey-heart', gray: 'grey-heart',
  circle: 'red-circle', square: 'red-square', triangle: 'red-triangle-pointed-up', diamond: 'large-blue-diamond',
}

/* ============================================================================
 * 3. SỐ ÍT ↔ SỐ NHIỀU (tiếng Anh)
 * ========================================================================== */

/** Số nhiều bất quy tắc → số ít. */
const IRREGULAR_PLURALS: Readonly<Record<string, string>> = {
  children: 'child', people: 'person', men: 'man', women: 'woman', mice: 'mouse',
  teeth: 'tooth', feet: 'foot', geese: 'goose', knives: 'knife', leaves: 'leaf', wolves: 'wolf',
}
const IRREGULAR_SINGULARS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(IRREGULAR_PLURALS).map(([plural, singular]) => [singular, plural]),
)

/**
 * Các dạng số ít / số nhiều có thể có của 1 slug (chỉ đổi TỪ CUỐI, vì tiếng Anh
 * chia số nhiều ở danh từ chính: "red-apples" → "red-apple").
 */
function numberVariants(slug: string): string[] {
  const parts = slug.split('-')
  const last = parts.pop() ?? ''
  const head = parts.length ? `${parts.join('-')}-` : ''
  const forms = new Set<string>()
  if (IRREGULAR_PLURALS[last]) forms.add(IRREGULAR_PLURALS[last])
  if (IRREGULAR_SINGULARS[last]) forms.add(IRREGULAR_SINGULARS[last])
  // số nhiều → số ít
  if (/[^aeiou]ies$/.test(last)) forms.add(`${last.slice(0, -3)}y`) // cherries → cherry
  if (last.endsWith('ves')) forms.add(`${last.slice(0, -3)}f`).add(`${last.slice(0, -3)}fe`) // leaves → leaf
  if (/(s|x|z|ch|sh|o)es$/.test(last)) forms.add(last.slice(0, -2)) // boxes → box, tomatoes → tomato
  if (last.length > 2 && last.endsWith('s') && !last.endsWith('ss')) forms.add(last.slice(0, -1)) // cats → cat
  // số ít → số nhiều
  if (/[^aeiou]y$/.test(last)) forms.add(`${last.slice(0, -1)}ies`) // cherry → cherries
  else if (/(s|x|z|ch|sh)$/.test(last)) forms.add(`${last}es`) // glass → glasses
  else forms.add(`${last}s`) // grape → grapes
  forms.delete(last)
  return [...forms].map((form) => head + form)
}

/* ============================================================================
 * 4. TRA CỨU
 * ========================================================================== */

/**
 * Chuẩn hoá chữ bất kỳ thành dạng slug. Phải giống hệt quy tắc đặt tên file ảnh.
 * VD "Red apple" → "red-apple", "Man’s shoe" → "mans-shoe", "Piñata" → "pinata".
 */
export function toWordImageSlug(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // bỏ dấu (ñ → n)
    .toLowerCase()
    .replace(/['’‘`"“”]/g, '') // bỏ nháy: o’clock → oclock
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '') // bỏ dấu câu còn lại
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Nội dung của public/word-images/catalog.json (tải bằng loadWordImageCatalog). */
export interface WordImageCatalog {
  about: string
  source: string
  commit: string
  size: number
  count: number
  /** Tên khác → slug chuẩn. VD "phoenix-bird" → "phoenix" */
  aliases: Record<string, string>
  /** Chỉ mục từ khoá (từ metadata của Microsoft): "fruit" → ["banana", "cherries", …] */
  keywords: Record<string, string[]>
  /** Thông tin từng ảnh: tên gốc (CLDR), ký tự emoji, nhóm */
  images: Record<string, { name: string; emoji: string; group: string }>
}

let catalogPromise: Promise<WordImageCatalog> | undefined

/** Tải catalog.json 1 lần (các lần sau dùng lại kết quả). Chỉ dùng trong trình duyệt. */
export function loadWordImageCatalog(): Promise<WordImageCatalog> {
  catalogPromise ??= fetch('/word-images/catalog.json').then((response) => {
    if (!response.ok) throw new Error(`Không tải được catalog ảnh (${response.status})`)
    return response.json() as Promise<WordImageCatalog>
  })
  return catalogPromise
}

/** Bỏ ký tự biến thể (FE0F/FE0E) và màu da để so emoji: "🛋️" và "🛋" coi là một. */
const normalizeEmoji = (text: string) => text.replace(/[︎️]|\uD83C[\uDFFB-\uDFFF]/g, '')

const emojiIndexCache = new WeakMap<WordImageCatalog, Map<string, string>>()
function emojiIndex(catalog: WordImageCatalog): Map<string, string> {
  let index = emojiIndexCache.get(catalog)
  if (!index) {
    index = new Map(Object.entries(catalog.images).map(([slug, info]) => [normalizeEmoji(info.emoji), slug]))
    emojiIndexCache.set(catalog, index)
  }
  return index
}

/**
 * Tìm ảnh cho 1 từ hoặc slug. Trả về slug có ảnh, hoặc undefined nếu không chắc chắn.
 * Thứ tự thử: khớp đúng → từ đồng nghĩa → tên khác (alias, cần catalog) → số ít/số nhiều.
 * Bỏ "a/an/the/to" ở đầu ("the cats" → cat, "to swim" → person-swimming).
 * Có truyền catalog thì còn nhận được ký tự emoji: findWordImage('🐘', catalog) → 'elephant'.
 * KHÔNG đoán theo từ khoá (dễ ra ảnh sai nghĩa) — muốn gợi ý thì dùng suggestWordImages().
 *
 * VD: findWordImage('apples') → 'red-apple', findWordImage('Cherry') → 'cherries',
 *     findWordImage('lorry') → 'delivery-truck', findWordImage('cat-face') → 'cat-face'
 */
export function findWordImage(wordOrSlug: string, catalog?: WordImageCatalog): WordImageSlug | undefined {
  const text = wordOrSlug.trim()
  if (catalog && text && !/[a-z0-9]/i.test(text)) {
    const fromEmoji = emojiIndex(catalog).get(normalizeEmoji(text))
    if (fromEmoji && hasWordImage(fromEmoji)) return fromEmoji
  }
  const slug = toWordImageSlug(text).replace(/^(a|an|the|to)-(?=.)/, '')
  if (!slug) return undefined
  for (const form of [slug, ...numberVariants(slug)]) {
    if (hasWordImage(form)) return form
    const viaSynonym = SYNONYMS[form]
    if (viaSynonym && hasWordImage(viaSynonym)) return viaSynonym
    const viaAlias = catalog?.aliases[form]
    if (viaAlias && hasWordImage(viaAlias)) return viaAlias
  }
  return undefined
}

/** Khoảng cách sửa chữ (Levenshtein) — để bắt lỗi gõ như "aeroplain" ~ "airplane". */
function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const current = [i]
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
    previous = current
  }
  return previous[b.length]
}

/**
 * Gợi ý tối đa `limit` slug cho 1 từ chưa có ảnh (dùng trong công cụ kiểm tra / soạn nội dung).
 * Điểm cao trước: kết quả findWordImage > từ chính ở cuối slug ("apple" → green-apple)
 * > chỉ mục từ khoá của Microsoft > chứa từ ở giữa > gõ sai 1–2 chữ.
 */
export function suggestWordImages(wordOrSlug: string, catalog: WordImageCatalog, limit = 5): string[] {
  const scores = new Map<string, number>()
  const add = (slug: string, score: number) => {
    if (!hasWordImage(slug)) return
    const penalty = /^(man|woman|men|women)-/.test(slug) ? 5 : 0 // ưu tiên bản trung tính "person-…"
    scores.set(slug, Math.max(scores.get(slug) ?? 0, score - penalty))
  }
  const resolved = findWordImage(wordOrSlug, catalog)
  if (resolved) add(resolved, 100)
  const slug = toWordImageSlug(wordOrSlug)
  if (!slug) return [...scores.keys()]
  const forms = [slug, ...numberVariants(slug)]
  for (const form of forms) {
    for (const hit of catalog.keywords[form] ?? []) add(hit, hit.split('-').includes(form) ? 55 : 50)
    for (const word of form.split('-')) {
      if (word.length < 3 || word === form) continue
      const wordImage = findWordImage(word) // cụm nhiều từ: thử từng từ ("teacher-desk" → teacher)
      if (wordImage) add(wordImage, 35)
      for (const hit of catalog.keywords[word] ?? []) add(hit, 30)
    }
  }
  for (const candidate of WORD_IMAGE_SLUGS) {
    const tokens = candidate.split('-')
    for (const form of forms) {
      if (tokens[tokens.length - 1] === form) add(candidate, 60)
      else if (tokens.includes(form)) add(candidate, 40)
    }
    if (Math.abs(candidate.length - slug.length) <= 2) {
      const distance = editDistance(candidate, slug)
      if (distance <= (slug.length < 5 ? 1 : 2)) add(candidate, 45 - 10 * distance)
    }
  }
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].split('-').length - b[0].split('-').length || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([candidate]) => candidate)
}
