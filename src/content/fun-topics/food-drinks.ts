// Chủ đề Học vui: Đồ ăn và đồ uống — món ăn quen thuộc (có cả món Việt) và các loại thức uống.
import type { FunTopic } from '../content-types'

export const foodDrinksTopic: FunTopic = {
  id: 'food-drinks',
  title: { vi: 'Đồ ăn và đồ uống', en: 'Food and drinks' },
  icon: '🍜',
  group: { vi: 'Ăn uống', en: 'Food' },
  cards: [
    {
      id: 'fun-food-drinks-pho', word: 'pho', ipa: '/fɜː/', partOfSpeech: 'noun', meaningVi: 'phở',
      image: { kind: 'emoji', value: '🍜' },
      examples: [
        { en: 'We eat pho for breakfast on Sunday.', vi: 'Chúng tôi ăn phở vào bữa sáng Chủ nhật.' },
        { en: 'Pho is a famous Vietnamese noodle soup.', vi: 'Phở là một món bún nước nổi tiếng của Việt Nam.' },
      ],
      extraInfo: { vi: 'Người nước ngoài thường đọc gần giống "phơ". Bát mì nói chung: a bowl of noodles.', en: 'English speakers often say it like "fur". In general: a bowl of noodles.' },
    },
    {
      id: 'fun-food-drinks-rice', word: 'rice', ipa: '/raɪs/', partOfSpeech: 'noun', meaningVi: 'cơm, gạo',
      image: { kind: 'emoji', value: '🍚' },
      examples: [
        { en: 'We have rice for dinner every day.', vi: 'Ngày nào chúng tôi cũng ăn cơm tối.' },
        { en: 'Would you like a bowl of rice?', vi: 'Bạn có muốn một bát cơm không?' },
      ],
      extraInfo: { vi: 'Không đếm được: a bowl of rice, không nói "a rice".', en: 'Uncountable: say "a bowl of rice", not "a rice".' },
    },
    {
      id: 'fun-food-drinks-baguette', word: 'baguette', ipa: '/bæɡˈet/', partOfSpeech: 'noun', meaningVi: 'bánh mì (ổ dài)',
      image: { kind: 'emoji', value: '🥖' },
      examples: [
        { en: 'I buy a baguette with pork and pate.', vi: 'Tôi mua một ổ bánh mì pa-tê thịt.' },
        { en: 'This baguette is warm and crispy.', vi: 'Ổ bánh mì này nóng và giòn.' },
      ],
      extraInfo: { vi: 'Bánh mì Việt Nam ở nước ngoài thường gọi luôn là "banh mi". Bánh mì nói chung: bread.', en: 'The Vietnamese sandwich is often just called "banh mi". General word: bread.' },
    },
    {
      id: 'fun-food-drinks-spaghetti', word: 'spaghetti', ipa: '/spəˈɡet.i/', partOfSpeech: 'noun', meaningVi: 'mì Ý',
      image: { kind: 'emoji', value: '🍝' },
      examples: [
        { en: 'The children love spaghetti.', vi: 'Bọn trẻ rất thích mì Ý.' },
        { en: 'Mum cooks spaghetti with tomato sauce.', vi: 'Mẹ nấu mì Ý sốt cà chua.' },
      ],
    },
    {
      id: 'fun-food-drinks-curry', word: 'curry', ipa: '/ˈkʌr.i/', partOfSpeech: 'noun', meaningVi: 'món cà ri',
      image: { kind: 'emoji', value: '🍛' },
      examples: [
        { en: 'We had chicken curry with rice.', vi: 'Chúng tôi ăn cà ri gà với cơm.' },
        { en: 'This curry is a bit spicy.', vi: 'Món cà ri này hơi cay.' },
      ],
    },
    {
      id: 'fun-food-drinks-sushi', word: 'sushi', ipa: '/ˈsuː.ʃi/', partOfSpeech: 'noun', meaningVi: 'món sushi',
      image: { kind: 'emoji', value: '🍣' },
      examples: [
        { en: 'Sushi comes from Japan.', vi: 'Sushi có nguồn gốc từ Nhật Bản.' },
        { en: 'My sister eats sushi with chopsticks.', vi: 'Chị tôi ăn sushi bằng đũa.' },
      ],
    },
    {
      id: 'fun-food-drinks-dumpling', word: 'dumpling', ipa: '/ˈdʌm.plɪŋ/', partOfSpeech: 'noun', meaningVi: 'bánh bao, sủi cảo',
      image: { kind: 'emoji', value: '🥟' },
      examples: [
        { en: 'These dumplings have meat inside.', vi: 'Những cái sủi cảo này có nhân thịt.' },
        { en: 'We made dumplings together.', vi: 'Chúng tôi cùng nhau gói sủi cảo.' },
      ],
    },
    {
      id: 'fun-food-drinks-hotpot', word: 'hotpot', ipa: '/ˈhɒt.pɒt/', partOfSpeech: 'noun', meaningVi: 'lẩu',
      image: { kind: 'emoji', value: '🍲' },
      examples: [
        { en: 'My family eats hotpot on cold days.', vi: 'Gia đình tôi ăn lẩu vào những ngày lạnh.' },
        { en: 'Put the vegetables in the hotpot.', vi: 'Cho rau vào nồi lẩu đi.' },
      ],
    },
    {
      id: 'fun-food-drinks-egg', word: 'egg', ipa: '/eɡ/', partOfSpeech: 'noun', meaningVi: 'quả trứng',
      image: { kind: 'emoji', value: '🥚' },
      examples: [
        { en: 'I have two eggs for breakfast.', vi: 'Tôi ăn hai quả trứng vào bữa sáng.' },
        { en: 'Can you boil an egg?', vi: 'Bạn có biết luộc trứng không?' },
      ],
      extraInfo: { vi: 'Trứng ốp la: fried egg; trứng luộc: boiled egg.', en: 'Fried egg, boiled egg, scrambled eggs.' },
    },
    {
      id: 'fun-food-drinks-cheese', word: 'cheese', ipa: '/tʃiːz/', partOfSpeech: 'noun', meaningVi: 'phô mai',
      image: { kind: 'emoji', value: '🧀' },
      examples: [
        { en: 'I like cheese on my pizza.', vi: 'Tôi thích phô mai trên pizza.' },
        { en: 'Say "cheese" for the photo!', vi: 'Nói "cheese" để chụp ảnh nào!' },
      ],
    },
    {
      id: 'fun-food-drinks-meat', word: 'meat', ipa: '/miːt/', partOfSpeech: 'noun', meaningVi: 'thịt',
      image: { kind: 'emoji', value: '🍖' },
      examples: [
        { en: 'My brother does not eat meat.', vi: 'Anh trai tôi không ăn thịt.' },
        { en: 'We grill meat in the garden.', vi: 'Chúng tôi nướng thịt ngoài vườn.' },
      ],
      extraInfo: { vi: 'Phát âm giống "meet" (gặp).', en: 'Sounds the same as "meet".' },
    },
    {
      id: 'fun-food-drinks-bacon', word: 'bacon', ipa: '/ˈbeɪ.kən/', partOfSpeech: 'noun', meaningVi: 'thịt xông khói',
      image: { kind: 'emoji', value: '🥓' },
      examples: [
        { en: 'Dad likes bacon and eggs.', vi: 'Bố thích thịt xông khói với trứng.' },
        { en: 'The bacon smells good.', vi: 'Thịt xông khói thơm quá.' },
      ],
    },
    {
      id: 'fun-food-drinks-steak', word: 'steak', ipa: '/steɪk/', partOfSpeech: 'noun', meaningVi: 'bít tết',
      image: { kind: 'emoji', value: '🥩' },
      examples: [
        { en: 'He ordered a steak at the restaurant.', vi: 'Anh ấy gọi một suất bít tết ở nhà hàng.' },
        { en: 'This steak is very tender.', vi: 'Miếng bít tết này rất mềm.' },
      ],
      extraInfo: { vi: 'Đọc /steɪk/ giống "stake", không đọc "stiːk".', en: 'Pronounced like "stake", not "steek".' },
    },
    {
      id: 'fun-food-drinks-hamburger', word: 'hamburger', ipa: '/ˈhæmˌbɜː.ɡər/', partOfSpeech: 'noun', meaningVi: 'bánh hamburger',
      image: { kind: 'emoji', value: '🍔' },
      examples: [
        { en: 'I want a hamburger and a drink.', vi: 'Tôi muốn một cái hamburger và một cốc nước.' },
        { en: 'Hamburgers are fast food.', vi: 'Hamburger là đồ ăn nhanh.' },
      ],
      extraInfo: { vi: 'Thường nói ngắn: burger.', en: 'Often shortened to "burger".' },
    },
    {
      id: 'fun-food-drinks-chips', word: 'chips', ipa: '/tʃɪps/', partOfSpeech: 'noun', meaningVi: 'khoai tây chiên',
      image: { kind: 'emoji', value: '🍟' },
      examples: [
        { en: 'Can I have some chips, please?', vi: 'Cho tôi một ít khoai tây chiên nhé.' },
        { en: 'Fish and chips is a British dish.', vi: 'Cá và khoai tây chiên là một món ăn của Anh.' },
      ],
      extraInfo: { vi: 'Anh-Anh: chips; Anh-Mỹ: (French) fries. Ở Mỹ "chips" là khoai tây lát giòn (Anh gọi crisps).', en: 'UK: chips; US: (French) fries. In the US "chips" are what the UK calls "crisps".' },
    },
    {
      id: 'fun-food-drinks-pizza', word: 'pizza', ipa: '/ˈpiːt.sə/', partOfSpeech: 'noun', meaningVi: 'bánh pizza',
      image: { kind: 'emoji', value: '🍕' },
      examples: [
        { en: "Let's order a pizza tonight.", vi: 'Tối nay mình gọi pizza nhé.' },
        { en: 'I ate two slices of pizza.', vi: 'Tôi đã ăn hai miếng pizza.' },
      ],
      extraInfo: { vi: 'Một miếng pizza: a slice of pizza.', en: 'One piece: a slice of pizza.' },
    },
    {
      id: 'fun-food-drinks-hot-dog', word: 'hot dog', ipa: '/ˈhɒt ˌdɒɡ/', partOfSpeech: 'noun', meaningVi: 'bánh mì xúc xích',
      image: { kind: 'emoji', value: '🌭' },
      examples: [
        { en: 'He bought a hot dog at the park.', vi: 'Anh ấy mua một cái bánh mì xúc xích ở công viên.' },
        { en: 'I like hot dogs with ketchup.', vi: 'Tôi thích bánh mì xúc xích với tương cà.' },
      ],
    },
    {
      id: 'fun-food-drinks-sandwich', word: 'sandwich', ipa: '/ˈsæn.wɪdʒ/', partOfSpeech: 'noun', meaningVi: 'bánh mì kẹp',
      image: { kind: 'emoji', value: '🥪' },
      examples: [
        { en: 'I take a sandwich to school.', vi: 'Tôi mang bánh mì kẹp đến trường.' },
        { en: 'This is a cheese sandwich.', vi: 'Đây là bánh mì kẹp phô mai.' },
      ],
    },
    {
      id: 'fun-food-drinks-salad', word: 'salad', ipa: '/ˈsæl.əd/', partOfSpeech: 'noun', meaningVi: 'món rau trộn, salad',
      image: { kind: 'emoji', value: '🥗' },
      examples: [
        { en: 'I make a salad with tomatoes and cucumbers.', vi: 'Tôi làm salad với cà chua và dưa chuột.' },
        { en: 'Salad is healthy food.', vi: 'Salad là món ăn tốt cho sức khỏe.' },
      ],
    },
    {
      id: 'fun-food-drinks-prawn', word: 'prawn', ipa: '/prɔːn/', partOfSpeech: 'noun', meaningVi: 'con tôm',
      image: { kind: 'emoji', value: '🦐' },
      examples: [
        { en: 'We had grilled prawns at the beach.', vi: 'Chúng tôi ăn tôm nướng ở biển.' },
        { en: 'Prawns turn pink when you cook them.', vi: 'Tôm chuyển màu hồng khi nấu chín.' },
      ],
      extraInfo: { vi: 'Anh-Anh: prawn; Anh-Mỹ thường nói: shrimp.', en: 'UK: prawn; US usually: shrimp.' },
    },
    {
      id: 'fun-food-drinks-cake', word: 'cake', ipa: '/keɪk/', partOfSpeech: 'noun', meaningVi: 'bánh ngọt',
      image: { kind: 'emoji', value: '🍰' },
      examples: [
        { en: 'Mum made a chocolate cake.', vi: 'Mẹ làm một chiếc bánh sô-cô-la.' },
        { en: 'Would you like a piece of cake?', vi: 'Bạn có muốn một miếng bánh không?' },
      ],
      extraInfo: { vi: '"A piece of cake" còn có nghĩa là "rất dễ".', en: '"A piece of cake" also means "very easy".' },
    },
    {
      id: 'fun-food-drinks-mooncake', word: 'mooncake', ipa: '/ˈmuːn.keɪk/', partOfSpeech: 'noun', meaningVi: 'bánh trung thu',
      image: { kind: 'emoji', value: '🥮' },
      examples: [
        { en: 'We eat mooncakes at the Mid-Autumn Festival.', vi: 'Chúng tôi ăn bánh trung thu vào Tết Trung thu.' },
        { en: 'This mooncake has an egg inside.', vi: 'Chiếc bánh trung thu này có trứng muối bên trong.' },
      ],
    },
    {
      id: 'fun-food-drinks-ice-cream', word: 'ice cream', ipa: '/ˌaɪs ˈkriːm/', partOfSpeech: 'noun', meaningVi: 'kem',
      image: { kind: 'emoji', value: '🍨' },
      examples: [
        { en: 'Children love ice cream in summer.', vi: 'Trẻ con thích ăn kem vào mùa hè.' },
        { en: 'I want two scoops of ice cream.', vi: 'Con muốn hai viên kem.' },
      ],
    },
    {
      id: 'fun-food-drinks-biscuit', word: 'biscuit', ipa: '/ˈbɪs.kɪt/', partOfSpeech: 'noun', meaningVi: 'bánh quy',
      image: { kind: 'emoji', value: '🍪' },
      examples: [
        { en: 'Grandma gives me biscuits with tea.', vi: 'Bà cho tôi bánh quy ăn cùng trà.' },
        { en: 'Can I have another biscuit?', vi: 'Con ăn thêm một cái bánh quy được không?' },
      ],
      extraInfo: { vi: 'Anh-Anh: biscuit; Anh-Mỹ: cookie.', en: 'UK: biscuit; US: cookie.' },
    },
    {
      id: 'fun-food-drinks-chocolate', word: 'chocolate', ipa: '/ˈtʃɒk.lət/', partOfSpeech: 'noun', meaningVi: 'sô-cô-la',
      image: { kind: 'emoji', value: '🍫' },
      examples: [
        { en: 'I got a bar of chocolate for my birthday.', vi: 'Tôi được tặng một thanh sô-cô-la vào sinh nhật.' },
        { en: 'Do not eat too much chocolate.', vi: 'Đừng ăn quá nhiều sô-cô-la.' },
      ],
      extraInfo: { vi: 'Chỉ đọc 2 âm tiết: /ˈtʃɒk.lət/.', en: 'Only two syllables: /ˈtʃɒk.lət/.' },
    },
    {
      id: 'fun-food-drinks-sweets', word: 'sweets', ipa: '/swiːts/', partOfSpeech: 'noun', meaningVi: 'kẹo',
      image: { kind: 'emoji', value: '🍬' },
      examples: [
        { en: 'Too many sweets are bad for your teeth.', vi: 'Ăn quá nhiều kẹo không tốt cho răng.' },
        { en: 'The children share their sweets.', vi: 'Bọn trẻ chia kẹo cho nhau.' },
      ],
      extraInfo: { vi: 'Anh-Anh: sweets; Anh-Mỹ: candy.', en: 'UK: sweets; US: candy.' },
    },
    {
      id: 'fun-food-drinks-honey', word: 'honey', ipa: '/ˈhʌn.i/', partOfSpeech: 'noun', meaningVi: 'mật ong',
      image: { kind: 'emoji', value: '🍯' },
      examples: [
        { en: 'I put honey in my tea.', vi: 'Tôi cho mật ong vào trà.' },
        { en: 'Honey is sweet and sticky.', vi: 'Mật ong ngọt và dính.' },
      ],
    },
    {
      id: 'fun-food-drinks-popcorn', word: 'popcorn', ipa: '/ˈpɒp.kɔːn/', partOfSpeech: 'noun', meaningVi: 'bỏng ngô',
      image: { kind: 'emoji', value: '🍿' },
      examples: [
        { en: 'We eat popcorn at the cinema.', vi: 'Chúng tôi ăn bỏng ngô ở rạp chiếu phim.' },
        { en: 'This popcorn is salty.', vi: 'Bỏng ngô này mặn.' },
      ],
    },
    {
      id: 'fun-food-drinks-doughnut', word: 'doughnut', ipa: '/ˈdəʊ.nʌt/', partOfSpeech: 'noun', meaningVi: 'bánh vòng, bánh donut',
      image: { kind: 'emoji', value: '🍩' },
      examples: [
        { en: 'This doughnut has pink icing.', vi: 'Chiếc bánh donut này phủ đường màu hồng.' },
        { en: 'He bought six doughnuts.', vi: 'Anh ấy mua sáu cái bánh donut.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ thường viết: donut.', en: 'US often spells it "donut".' },
    },
    {
      id: 'fun-food-drinks-pancake', word: 'pancake', ipa: '/ˈpæn.keɪk/', partOfSpeech: 'noun', meaningVi: 'bánh kếp',
      image: { kind: 'emoji', value: '🥞' },
      examples: [
        { en: 'We have pancakes on Sunday morning.', vi: 'Sáng Chủ nhật chúng tôi ăn bánh kếp.' },
        { en: 'I put honey on my pancakes.', vi: 'Tôi rưới mật ong lên bánh kếp.' },
      ],
    },
    {
      id: 'fun-food-drinks-butter', word: 'butter', ipa: '/ˈbʌt.ər/', partOfSpeech: 'noun', meaningVi: 'bơ (làm từ sữa)',
      image: { kind: 'emoji', value: '🧈' },
      examples: [
        { en: 'I spread butter on my toast.', vi: 'Tôi phết bơ lên bánh mì nướng.' },
        { en: 'Put the butter in the fridge.', vi: 'Cất bơ vào tủ lạnh nhé.' },
      ],
    },
    {
      id: 'fun-food-drinks-salt', word: 'salt', ipa: '/sɔːlt/', partOfSpeech: 'noun', meaningVi: 'muối',
      image: { kind: 'emoji', value: '🧂' },
      examples: [
        { en: 'Can you pass me the salt?', vi: 'Bạn đưa giúp tôi lọ muối được không?' },
        { en: 'This soup needs more salt.', vi: 'Món canh này cần thêm muối.' },
      ],
      extraInfo: { vi: 'Tính từ: salty (mặn).', en: 'Adjective: salty.' },
    },
    {
      id: 'fun-food-drinks-water', word: 'water', ipa: '/ˈwɔː.tər/', partOfSpeech: 'noun', meaningVi: 'nước',
      image: { kind: 'emoji', value: '💧' },
      examples: [
        { en: 'Drink a lot of water every day.', vi: 'Hãy uống nhiều nước mỗi ngày.' },
        { en: 'Can I have a glass of water?', vi: 'Cho tôi một cốc nước được không?' },
      ],
      extraInfo: { vi: 'Không đếm được: a glass of water, a bottle of water.', en: 'Uncountable: a glass of water, a bottle of water.' },
    },
    {
      id: 'fun-food-drinks-milk', word: 'milk', ipa: '/mɪlk/', partOfSpeech: 'noun', meaningVi: 'sữa',
      image: { kind: 'emoji', value: '🥛' },
      examples: [
        { en: 'I drink a glass of milk before bed.', vi: 'Tôi uống một cốc sữa trước khi ngủ.' },
        { en: 'We need to buy some milk.', vi: 'Chúng ta cần mua sữa.' },
      ],
    },
    {
      id: 'fun-food-drinks-tea', word: 'tea', ipa: '/tiː/', partOfSpeech: 'noun', meaningVi: 'trà',
      image: { kind: 'emoji', value: '🍵' },
      examples: [
        { en: 'My grandpa drinks green tea every morning.', vi: 'Ông tôi uống trà xanh mỗi sáng.' },
        { en: 'Would you like a cup of tea?', vi: 'Bạn có muốn uống một tách trà không?' },
      ],
      extraInfo: { vi: 'Cụm từ: a cup of tea; trà đá: iced tea.', en: 'Collocation: a cup of tea; iced tea.' },
    },
    {
      id: 'fun-food-drinks-coffee', word: 'coffee', ipa: '/ˈkɒf.i/', partOfSpeech: 'noun', meaningVi: 'cà phê',
      image: { kind: 'emoji', value: '☕' },
      examples: [
        { en: 'My parents drink coffee with milk.', vi: 'Bố mẹ tôi uống cà phê sữa.' },
        { en: 'Vietnamese coffee is very strong.', vi: 'Cà phê Việt Nam rất đậm.' },
      ],
    },
    {
      id: 'fun-food-drinks-juice', word: 'juice', ipa: '/dʒuːs/', partOfSpeech: 'noun', meaningVi: 'nước ép, nước hoa quả',
      image: { kind: 'emoji', value: '🧃' },
      examples: [
        { en: 'I would like apple juice, please.', vi: 'Cho tôi nước ép táo nhé.' },
        { en: 'This juice is very fresh.', vi: 'Nước ép này rất tươi.' },
      ],
    },
    {
      id: 'fun-food-drinks-bubble-tea', word: 'bubble tea', ipa: '/ˈbʌb.əl ˌtiː/', partOfSpeech: 'noun', meaningVi: 'trà sữa trân châu',
      image: { kind: 'emoji', value: '🧋' },
      examples: [
        { en: 'Teenagers love bubble tea.', vi: 'Tuổi teen rất thích trà sữa trân châu.' },
        { en: "Let's get bubble tea after school.", vi: 'Tan học mình đi uống trà sữa nhé.' },
      ],
      extraInfo: { vi: 'Còn gọi là "milk tea" hoặc "boba".', en: 'Also called "milk tea" or "boba".' },
    },
  ],
}
