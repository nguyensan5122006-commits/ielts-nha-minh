// Chủ đề Học vui: Trái cây và rau củ — tên các loại quả, rau, củ quen thuộc.
import type { FunTopic } from '../content-types'

export const fruitsVegetablesTopic: FunTopic = {
  id: 'fruits-vegetables',
  title: { vi: 'Trái cây và rau củ', en: 'Fruits and vegetables' },
  icon: '🥕',
  group: { vi: 'Ăn uống', en: 'Food' },
  cards: [
    {
      id: 'fun-fruits-vegetables-apple', word: 'apple', ipa: '/ˈæp.əl/', partOfSpeech: 'noun', meaningVi: 'quả táo',
      image: { kind: 'emoji', value: '🍎' },
      examples: [
        { en: 'I eat an apple every day.', vi: 'Tôi ăn một quả táo mỗi ngày.' },
        { en: 'This apple is red and sweet.', vi: 'Quả táo này đỏ và ngọt.' },
      ],
      extraInfo: { vi: 'Dùng "an": an apple.', en: 'Use "an": an apple.' },
    },
    {
      id: 'fun-fruits-vegetables-banana', word: 'banana', ipa: '/bəˈnɑː.nə/', partOfSpeech: 'noun', meaningVi: 'quả chuối',
      image: { kind: 'emoji', value: '🍌' },
      examples: [
        { en: 'Bananas are yellow.', vi: 'Chuối có màu vàng.' },
        { en: 'Can I have a banana, please?', vi: 'Cho con một quả chuối được không ạ?' },
      ],
      extraInfo: { vi: 'Một nải chuối: a bunch of bananas.', en: 'A group of bananas: a bunch of bananas.' },
    },
    {
      id: 'fun-fruits-vegetables-orange', word: 'orange', ipa: '/ˈɒr.ɪndʒ/', partOfSpeech: 'noun', meaningVi: 'quả cam',
      image: { kind: 'emoji', value: '🍊' },
      examples: [
        { en: 'I drink orange juice for breakfast.', vi: 'Tôi uống nước cam vào bữa sáng.' },
        { en: 'This orange is very juicy.', vi: 'Quả cam này rất mọng nước.' },
      ],
      extraInfo: { vi: '"Orange" cũng là màu cam.', en: '"Orange" is also a colour.' },
    },
    {
      id: 'fun-fruits-vegetables-lemon', word: 'lemon', ipa: '/ˈlem.ən/', partOfSpeech: 'noun', meaningVi: 'quả chanh (vàng)',
      image: { kind: 'emoji', value: '🍋' },
      examples: [
        { en: 'Lemons taste sour.', vi: 'Chanh có vị chua.' },
        { en: 'I put lemon in my tea.', vi: 'Tôi cho chanh vào trà.' },
      ],
      extraInfo: { vi: 'Chanh xanh của Việt Nam thường gọi là "lime".', en: 'The small green lemon common in Vietnam is a "lime".' },
    },
    {
      id: 'fun-fruits-vegetables-grapes', word: 'grapes', ipa: '/ɡreɪps/', partOfSpeech: 'noun', meaningVi: 'quả nho',
      image: { kind: 'emoji', value: '🍇' },
      examples: [
        { en: 'I like green grapes.', vi: 'Tôi thích nho xanh.' },
        { en: 'She bought a bunch of grapes.', vi: 'Cô ấy mua một chùm nho.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-watermelon', word: 'watermelon', ipa: '/ˈwɔː.təˌmel.ən/', partOfSpeech: 'noun', meaningVi: 'quả dưa hấu',
      image: { kind: 'emoji', value: '🍉' },
      examples: [
        { en: 'Watermelon is red inside.', vi: 'Dưa hấu bên trong màu đỏ.' },
        { en: 'We eat watermelon at Tet.', vi: 'Chúng tôi ăn dưa hấu vào dịp Tết.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-strawberry', word: 'strawberry', ipa: '/ˈstrɔː.bər.i/', partOfSpeech: 'noun', meaningVi: 'quả dâu tây',
      image: { kind: 'emoji', value: '🍓' },
      examples: [
        { en: 'Strawberries are small and red.', vi: 'Dâu tây nhỏ và có màu đỏ.' },
        { en: 'I love strawberry ice cream.', vi: 'Tôi thích kem dâu.' },
      ],
      extraInfo: { vi: 'Số nhiều: strawberries.', en: 'Plural: strawberries.' },
    },
    {
      id: 'fun-fruits-vegetables-pineapple', word: 'pineapple', ipa: '/ˈpaɪnˌæp.əl/', partOfSpeech: 'noun', meaningVi: 'quả dứa',
      image: { kind: 'emoji', value: '🍍' },
      examples: [
        { en: 'The pineapple is sweet and a little sour.', vi: 'Quả dứa ngọt và hơi chua.' },
        { en: 'My mum cuts the pineapple.', vi: 'Mẹ tôi gọt quả dứa.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-mango', word: 'mango', ipa: '/ˈmæŋ.ɡəʊ/', partOfSpeech: 'noun', meaningVi: 'quả xoài',
      image: { kind: 'emoji', value: '🥭' },
      examples: [
        { en: 'Mangoes are my favourite fruit.', vi: 'Xoài là loại quả tôi thích nhất.' },
        { en: 'This mango is very ripe.', vi: 'Quả xoài này rất chín.' },
      ],
      extraInfo: { vi: 'Số nhiều: mangoes (hoặc mangos).', en: 'Plural: mangoes (or mangos).' },
    },
    {
      id: 'fun-fruits-vegetables-peach', word: 'peach', ipa: '/piːtʃ/', partOfSpeech: 'noun', meaningVi: 'quả đào',
      image: { kind: 'emoji', value: '🍑' },
      examples: [
        { en: 'A peach is soft and sweet.', vi: 'Quả đào mềm và ngọt.' },
        { en: 'We picked peaches in the garden.', vi: 'Chúng tôi hái đào trong vườn.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-pear', word: 'pear', ipa: '/peər/', partOfSpeech: 'noun', meaningVi: 'quả lê',
      image: { kind: 'emoji', value: '🍐' },
      examples: [
        { en: 'The pear is green.', vi: 'Quả lê có màu xanh.' },
        { en: 'Would you like a pear?', vi: 'Bạn có muốn ăn lê không?' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-cherry', word: 'cherry', ipa: '/ˈtʃer.i/', partOfSpeech: 'noun', meaningVi: 'quả anh đào',
      image: { kind: 'emoji', value: '🍒' },
      examples: [
        { en: 'There is a cherry on the cake.', vi: 'Có một quả anh đào trên cái bánh.' },
        { en: 'Cherries are small and red.', vi: 'Quả anh đào nhỏ và đỏ.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-coconut', word: 'coconut', ipa: '/ˈkəʊ.kə.nʌt/', partOfSpeech: 'noun', meaningVi: 'quả dừa',
      image: { kind: 'emoji', value: '🥥' },
      examples: [
        { en: 'I drink coconut water on hot days.', vi: 'Tôi uống nước dừa vào những ngày nóng.' },
        { en: 'Coconuts grow on tall trees.', vi: 'Dừa mọc trên những cây cao.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-kiwi', word: 'kiwi', ipa: '/ˈkiː.wiː/', partOfSpeech: 'noun', meaningVi: 'quả kiwi',
      image: { kind: 'emoji', value: '🥝' },
      examples: [
        { en: 'A kiwi is green inside.', vi: 'Quả kiwi bên trong màu xanh.' },
        { en: 'I cut the kiwi in half.', vi: 'Tôi cắt đôi quả kiwi.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-melon', word: 'melon', ipa: '/ˈmel.ən/', partOfSpeech: 'noun', meaningVi: 'quả dưa lưới',
      image: { kind: 'emoji', value: '🍈' },
      examples: [
        { en: 'This melon smells very nice.', vi: 'Quả dưa lưới này thơm quá.' },
        { en: 'We had melon after dinner.', vi: 'Chúng tôi ăn dưa sau bữa tối.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-blueberry', word: 'blueberry', ipa: '/ˈbluː.bər.i/', partOfSpeech: 'noun', meaningVi: 'quả việt quất',
      image: { kind: 'emoji', value: '🫐' },
      examples: [
        { en: 'Blueberries are small and blue.', vi: 'Việt quất nhỏ và có màu xanh lam.' },
        { en: 'I put blueberries on my pancakes.', vi: 'Tôi rắc việt quất lên bánh kếp.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-avocado', word: 'avocado', ipa: '/ˌæv.əˈkɑː.dəʊ/', partOfSpeech: 'noun', meaningVi: 'quả bơ',
      image: { kind: 'emoji', value: '🥑' },
      examples: [
        { en: 'I like avocado smoothies.', vi: 'Tôi thích sinh tố bơ.' },
        { en: 'The avocado is soft and green.', vi: 'Quả bơ mềm và có màu xanh.' },
      ],
      extraInfo: { vi: 'Đừng nhầm với "butter" (bơ làm từ sữa).', en: 'Do not confuse it with "butter" (made from milk).' },
    },
    {
      id: 'fun-fruits-vegetables-olive', word: 'olive', ipa: '/ˈɒl.ɪv/', partOfSpeech: 'noun', meaningVi: 'quả ô liu',
      image: { kind: 'emoji', value: '🫒' },
      examples: [
        { en: 'There are olives on the pizza.', vi: 'Có quả ô liu trên bánh pizza.' },
        { en: 'We cook with olive oil.', vi: 'Chúng tôi nấu ăn bằng dầu ô liu.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-tomato', word: 'tomato', ipa: '/təˈmɑː.təʊ/', partOfSpeech: 'noun', meaningVi: 'quả cà chua',
      image: { kind: 'emoji', value: '🍅' },
      examples: [
        { en: 'Tomatoes are red and round.', vi: 'Cà chua đỏ và tròn.' },
        { en: 'My mum makes tomato soup.', vi: 'Mẹ tôi nấu canh cà chua.' },
      ],
      extraInfo: { vi: 'Số nhiều: tomatoes. Anh-Anh /təˈmɑː.təʊ/, Anh-Mỹ /təˈmeɪ.t̬oʊ/.', en: 'Plural: tomatoes. UK /təˈmɑː.təʊ/, US /təˈmeɪ.t̬oʊ/.' },
    },
    {
      id: 'fun-fruits-vegetables-carrot', word: 'carrot', ipa: '/ˈkær.ət/', partOfSpeech: 'noun', meaningVi: 'củ cà rốt',
      image: { kind: 'emoji', value: '🥕' },
      examples: [
        { en: 'Carrots are orange.', vi: 'Cà rốt có màu cam.' },
        { en: 'Eating carrots is good for your eyes.', vi: 'Ăn cà rốt tốt cho mắt.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-potato', word: 'potato', ipa: '/pəˈteɪ.təʊ/', partOfSpeech: 'noun', meaningVi: 'củ khoai tây',
      image: { kind: 'emoji', value: '🥔' },
      examples: [
        { en: 'We need three potatoes for the soup.', vi: 'Chúng ta cần ba củ khoai tây để nấu canh.' },
        { en: 'I like mashed potato.', vi: 'Tôi thích khoai tây nghiền.' },
      ],
      extraInfo: { vi: 'Số nhiều: potatoes.', en: 'Plural: potatoes.' },
    },
    {
      id: 'fun-fruits-vegetables-sweet-potato', word: 'sweet potato', ipa: '/ˌswiːt pəˈteɪ.təʊ/', partOfSpeech: 'noun', meaningVi: 'củ khoai lang',
      image: { kind: 'emoji', value: '🍠' },
      examples: [
        { en: 'Grandma roasts sweet potatoes in winter.', vi: 'Bà nướng khoai lang vào mùa đông.' },
        { en: 'Sweet potatoes are good for you.', vi: 'Khoai lang tốt cho sức khỏe.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-corn', word: 'corn', ipa: '/kɔːn/', partOfSpeech: 'noun', meaningVi: 'ngô, bắp',
      image: { kind: 'emoji', value: '🌽' },
      examples: [
        { en: 'We ate grilled corn at the market.', vi: 'Chúng tôi ăn ngô nướng ở chợ.' },
        { en: 'Corn is yellow.', vi: 'Ngô có màu vàng.' },
      ],
      extraInfo: { vi: 'Anh-Anh còn nói "sweetcorn"; Mỹ thường nói "corn".', en: 'UK also says "sweetcorn"; US usually says "corn".' },
    },
    {
      id: 'fun-fruits-vegetables-chilli', word: 'chilli', ipa: '/ˈtʃɪl.i/', partOfSpeech: 'noun', meaningVi: 'quả ớt',
      image: { kind: 'emoji', value: '🌶️' },
      examples: [
        { en: 'This chilli is very hot.', vi: 'Quả ớt này rất cay.' },
        { en: 'Dad puts chilli in his noodles.', vi: 'Bố cho ớt vào bát mì.' },
      ],
      extraInfo: { vi: 'Anh-Anh: chilli; Anh-Mỹ: chili. "Hot" = cay.', en: 'UK: chilli; US: chili. "Hot" also means spicy.' },
    },
    {
      id: 'fun-fruits-vegetables-pepper', word: 'pepper', ipa: '/ˈpep.ər/', partOfSpeech: 'noun', meaningVi: 'ớt chuông',
      image: { kind: 'emoji', value: '🫑' },
      examples: [
        { en: 'I put a green pepper in the salad.', vi: 'Tôi cho một quả ớt chuông xanh vào món salad.' },
        { en: 'Peppers can be red, yellow or green.', vi: 'Ớt chuông có thể màu đỏ, vàng hoặc xanh.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ hay nói "bell pepper". "Pepper" cũng là hạt tiêu.', en: 'US often says "bell pepper". "Pepper" is also the black spice.' },
    },
    {
      id: 'fun-fruits-vegetables-cucumber', word: 'cucumber', ipa: '/ˈkjuː.kʌm.bər/', partOfSpeech: 'noun', meaningVi: 'quả dưa chuột',
      image: { kind: 'emoji', value: '🥒' },
      examples: [
        { en: 'Cucumbers are long and green.', vi: 'Dưa chuột dài và có màu xanh.' },
        { en: 'I eat cucumber with rice.', vi: 'Tôi ăn dưa chuột với cơm.' },
      ],
      extraInfo: { vi: '"As cool as a cucumber" = rất bình tĩnh.', en: '"As cool as a cucumber" = very calm.' },
    },
    {
      id: 'fun-fruits-vegetables-broccoli', word: 'broccoli', ipa: '/ˈbrɒk.əl.i/', partOfSpeech: 'noun', meaningVi: 'súp lơ xanh, bông cải xanh',
      image: { kind: 'emoji', value: '🥦' },
      examples: [
        { en: 'Broccoli looks like a small tree.', vi: 'Súp lơ xanh trông như một cái cây nhỏ.' },
        { en: 'Please eat your broccoli.', vi: 'Con ăn súp lơ đi nhé.' },
      ],
      extraInfo: { vi: 'Danh từ không đếm được: some broccoli.', en: 'Uncountable noun: some broccoli.' },
    },
    {
      id: 'fun-fruits-vegetables-lettuce', word: 'lettuce', ipa: '/ˈlet.ɪs/', partOfSpeech: 'noun', meaningVi: 'rau xà lách',
      image: { kind: 'emoji', value: '🥬' },
      examples: [
        { en: 'We wash the lettuce before we eat it.', vi: 'Chúng tôi rửa rau xà lách trước khi ăn.' },
        { en: 'There is lettuce in my sandwich.', vi: 'Có xà lách trong bánh kẹp của tôi.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-garlic', word: 'garlic', ipa: '/ˈɡɑː.lɪk/', partOfSpeech: 'noun', meaningVi: 'tỏi',
      image: { kind: 'emoji', value: '🧄' },
      examples: [
        { en: 'Mum fries garlic with the vegetables.', vi: 'Mẹ phi tỏi rồi xào rau.' },
        { en: 'Garlic has a strong smell.', vi: 'Tỏi có mùi rất nồng.' },
      ],
      extraInfo: { vi: 'Một tép tỏi: a clove of garlic.', en: 'One small piece: a clove of garlic.' },
    },
    {
      id: 'fun-fruits-vegetables-onion', word: 'onion', ipa: '/ˈʌn.jən/', partOfSpeech: 'noun', meaningVi: 'củ hành tây',
      image: { kind: 'emoji', value: '🧅' },
      examples: [
        { en: 'Cutting onions makes me cry.', vi: 'Cắt hành tây làm tôi chảy nước mắt.' },
        { en: 'Add an onion to the soup.', vi: 'Cho một củ hành tây vào nồi canh.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-ginger', word: 'ginger', ipa: '/ˈdʒɪn.dʒər/', partOfSpeech: 'noun', meaningVi: 'gừng',
      image: { kind: 'emoji', value: '🫚' },
      examples: [
        { en: 'Ginger tea is good when you have a cold.', vi: 'Trà gừng rất tốt khi bị cảm.' },
        { en: 'Ginger tastes hot.', vi: 'Gừng có vị cay.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-mushroom', word: 'mushroom', ipa: '/ˈmʌʃ.ruːm/', partOfSpeech: 'noun', meaningVi: 'cây nấm',
      image: { kind: 'emoji', value: '🍄' },
      examples: [
        { en: 'I like mushroom soup.', vi: 'Tôi thích súp nấm.' },
        { en: 'Some mushrooms are not safe to eat.', vi: 'Có một số loại nấm không ăn được.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-aubergine', word: 'aubergine', ipa: '/ˈəʊ.bə.ʒiːn/', partOfSpeech: 'noun', meaningVi: 'quả cà tím',
      image: { kind: 'emoji', value: '🍆' },
      examples: [
        { en: 'An aubergine is purple.', vi: 'Quả cà tím có màu tím.' },
        { en: 'My grandma cooks aubergine with tofu.', vi: 'Bà tôi nấu cà tím với đậu phụ.' },
      ],
      extraInfo: { vi: 'Anh-Anh: aubergine; Anh-Mỹ: eggplant.', en: 'UK: aubergine; US: eggplant.' },
    },
    {
      id: 'fun-fruits-vegetables-peas', word: 'peas', ipa: '/piːz/', partOfSpeech: 'noun', meaningVi: 'đậu Hà Lan',
      image: { kind: 'emoji', value: '🫛' },
      examples: [
        { en: 'Peas are small and green.', vi: 'Đậu Hà Lan nhỏ và có màu xanh.' },
        { en: 'I have peas with my rice.', vi: 'Tôi ăn đậu Hà Lan với cơm.' },
      ],
      extraInfo: { vi: 'Số ít: a pea. "Like two peas in a pod" = giống nhau như đúc.', en: 'Singular: a pea. "Like two peas in a pod" = very similar.' },
    },
    {
      id: 'fun-fruits-vegetables-beans', word: 'beans', ipa: '/biːnz/', partOfSpeech: 'noun', meaningVi: 'hạt đậu',
      image: { kind: 'emoji', value: '🫘' },
      examples: [
        { en: 'We cook red beans for a sweet soup.', vi: 'Chúng tôi nấu đậu đỏ để làm chè.' },
        { en: 'Beans are good for your health.', vi: 'Các loại đậu tốt cho sức khỏe.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-peanut', word: 'peanut', ipa: '/ˈpiː.nʌt/', partOfSpeech: 'noun', meaningVi: 'hạt lạc, đậu phộng',
      image: { kind: 'emoji', value: '🥜' },
      examples: [
        { en: 'I like peanut butter on bread.', vi: 'Tôi thích phết bơ lạc lên bánh mì.' },
        { en: 'Some people cannot eat peanuts.', vi: 'Một số người bị dị ứng lạc.' },
      ],
    },
    {
      id: 'fun-fruits-vegetables-chestnut', word: 'chestnut', ipa: '/ˈtʃes.nʌt/', partOfSpeech: 'noun', meaningVi: 'hạt dẻ',
      image: { kind: 'emoji', value: '🌰' },
      examples: [
        { en: 'We buy hot chestnuts in autumn.', vi: 'Chúng tôi mua hạt dẻ nóng vào mùa thu.' },
        { en: 'Chestnuts are brown.', vi: 'Hạt dẻ có màu nâu.' },
      ],
    },
  ],
}
