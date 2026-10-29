// Chủ đề Học vui: Đồ dùng trong nhà — nội thất, đồ dùng phòng tắm, nhà bếp và vật dụng hằng ngày.
import type { FunTopic } from '../content-types'

export const householdTopic: FunTopic = {
  id: 'household',
  title: { vi: 'Đồ dùng trong nhà', en: 'Household items' },
  icon: '🛋️',
  group: { vi: 'Đời sống', en: 'Daily life' },
  cards: [
    {
      id: 'fun-household-sofa', word: 'sofa', ipa: '/ˈsəʊ.fə/', partOfSpeech: 'noun', meaningVi: 'ghế sofa, ghế xô-pha',
      image: { kind: 'emoji', value: '🛋️' },
      examples: [
        { en: 'We watch TV on the sofa.', vi: 'Chúng tôi ngồi xem TV trên ghế sofa.' },
        { en: 'The cat is sleeping on the sofa.', vi: 'Con mèo đang ngủ trên sofa.' },
      ],
      extraInfo: { vi: 'Còn gọi là "couch" (phổ biến ở Mỹ).', en: 'Also called a "couch" (common in the US).' },
    },
    {
      id: 'fun-household-bed', word: 'bed', ipa: '/bed/', partOfSpeech: 'noun', meaningVi: 'cái giường',
      image: { kind: 'emoji', value: '🛏️' },
      examples: [
        { en: 'I go to bed at ten o\'clock.', vi: 'Tôi đi ngủ lúc mười giờ.' },
        { en: 'Please make your bed.', vi: 'Con dọn giường đi nhé.' },
      ],
      extraInfo: { vi: 'Go to bed = đi ngủ; make the bed = dọn giường.', en: 'Go to bed = go to sleep; make the bed = tidy it.' },
    },
    {
      id: 'fun-household-chair', word: 'chair', ipa: '/tʃeər/', partOfSpeech: 'noun', meaningVi: 'cái ghế',
      image: { kind: 'emoji', value: '🪑' },
      examples: [
        { en: 'Sit on the chair, please.', vi: 'Mời bạn ngồi lên ghế.' },
        { en: 'There are four chairs in the kitchen.', vi: 'Trong bếp có bốn cái ghế.' },
      ],
    },
    {
      id: 'fun-household-door', word: 'door', ipa: '/dɔːr/', partOfSpeech: 'noun', meaningVi: 'cửa ra vào',
      image: { kind: 'emoji', value: '🚪' },
      examples: [
        { en: 'Please close the door.', vi: 'Làm ơn đóng cửa lại.' },
        { en: 'Someone is knocking on the door.', vi: 'Có ai đó đang gõ cửa.' },
      ],
      extraInfo: { vi: 'Open/close the door; knock on the door.', en: 'Open/close the door; knock on the door.' },
    },
    {
      id: 'fun-household-window', word: 'window', ipa: '/ˈwɪn.dəʊ/', partOfSpeech: 'noun', meaningVi: 'cửa sổ',
      image: { kind: 'emoji', value: '🪟' },
      examples: [
        { en: 'Can you open the window?', vi: 'Bạn mở cửa sổ được không?' },
        { en: 'I can see the garden from my window.', vi: 'Tôi có thể nhìn thấy khu vườn từ cửa sổ.' },
      ],
    },
    {
      id: 'fun-household-mirror', word: 'mirror', ipa: '/ˈmɪr.ər/', partOfSpeech: 'noun', meaningVi: 'cái gương',
      image: { kind: 'emoji', value: '🪞' },
      examples: [
        { en: 'She looks in the mirror.', vi: 'Cô ấy soi gương.' },
        { en: 'There is a big mirror in the bathroom.', vi: 'Có một chiếc gương lớn trong phòng tắm.' },
      ],
      extraInfo: { vi: 'Soi gương: look in the mirror.', en: 'Collocation: look in the mirror.' },
    },
    {
      id: 'fun-household-light-bulb', word: 'light bulb', ipa: '/ˈlaɪt ˌbʌlb/', partOfSpeech: 'noun', meaningVi: 'bóng đèn',
      image: { kind: 'emoji', value: '💡' },
      examples: [
        { en: 'The light bulb is broken.', vi: 'Bóng đèn bị hỏng rồi.' },
        { en: 'Dad changed the light bulb.', vi: 'Bố đã thay bóng đèn.' },
      ],
      extraInfo: { vi: 'Bật/tắt đèn: turn on/turn off the light.', en: 'Turn on / turn off the light.' },
    },
    {
      id: 'fun-household-alarm-clock', word: 'alarm clock', ipa: '/əˈlɑːm ˌklɒk/', partOfSpeech: 'noun', meaningVi: 'đồng hồ báo thức',
      image: { kind: 'emoji', value: '⏰' },
      examples: [
        { en: 'My alarm clock rings at six.', vi: 'Đồng hồ báo thức của tôi reo lúc sáu giờ.' },
        { en: 'I set my alarm clock every night.', vi: 'Tối nào tôi cũng hẹn giờ đồng hồ báo thức.' },
      ],
      extraInfo: { vi: 'Hẹn giờ báo thức: set the alarm.', en: 'Collocation: set the alarm.' },
    },
    {
      id: 'fun-household-television', word: 'television', ipa: '/ˈtel.ɪ.vɪʒ.ən/', partOfSpeech: 'noun', meaningVi: 'ti vi',
      image: { kind: 'emoji', value: '📺' },
      examples: [
        { en: 'We have a big television in the living room.', vi: 'Chúng tôi có một chiếc ti vi lớn ở phòng khách.' },
        { en: 'I watch television after dinner.', vi: 'Tôi xem ti vi sau bữa tối.' },
      ],
      extraInfo: { vi: 'Thường nói ngắn: TV. Xem ti vi: watch TV (không có "the").', en: 'Short form: TV. Say "watch TV" (no "the").' },
    },
    {
      id: 'fun-household-laptop', word: 'laptop', ipa: '/ˈlæp.tɒp/', partOfSpeech: 'noun', meaningVi: 'máy tính xách tay',
      image: { kind: 'emoji', value: '💻' },
      examples: [
        { en: 'I do my homework on my laptop.', vi: 'Tôi làm bài tập trên máy tính xách tay.' },
        { en: 'Mum is working on her laptop.', vi: 'Mẹ đang làm việc trên laptop.' },
      ],
    },
    {
      id: 'fun-household-mobile-phone', word: 'mobile phone', ipa: '/ˌməʊ.baɪl ˈfəʊn/', partOfSpeech: 'noun', meaningVi: 'điện thoại di động',
      image: { kind: 'emoji', value: '📱' },
      examples: [
        { en: 'Where is my mobile phone?', vi: 'Điện thoại của tôi đâu rồi?' },
        { en: 'Please turn off your mobile phone in class.', vi: 'Vui lòng tắt điện thoại trong giờ học.' },
      ],
      extraInfo: { vi: 'Anh-Anh: mobile (phone); Anh-Mỹ: cellphone.', en: 'UK: mobile (phone); US: cellphone.' },
    },
    {
      id: 'fun-household-toilet', word: 'toilet', ipa: '/ˈtɔɪ.lət/', partOfSpeech: 'noun', meaningVi: 'bồn cầu, nhà vệ sinh',
      image: { kind: 'emoji', value: '🚽' },
      examples: [
        { en: 'Excuse me, where is the toilet?', vi: 'Xin lỗi, nhà vệ sinh ở đâu ạ?' },
        { en: 'Wash your hands after using the toilet.', vi: 'Rửa tay sau khi đi vệ sinh.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ lịch sự hơn: restroom, bathroom.', en: 'US English often says "restroom" or "bathroom".' },
    },
    {
      id: 'fun-household-shower', word: 'shower', ipa: '/ʃaʊər/', partOfSpeech: 'noun', meaningVi: 'vòi hoa sen',
      image: { kind: 'emoji', value: '🚿' },
      examples: [
        { en: 'I have a shower every morning.', vi: 'Sáng nào tôi cũng tắm vòi sen.' },
        { en: 'The shower water is too cold.', vi: 'Nước vòi sen lạnh quá.' },
      ],
      extraInfo: { vi: 'Tắm vòi sen: have/take a shower.', en: 'Collocation: have (UK) / take (US) a shower.' },
    },
    {
      id: 'fun-household-bath', word: 'bath', ipa: '/bɑːθ/', partOfSpeech: 'noun', meaningVi: 'bồn tắm',
      image: { kind: 'emoji', value: '🛁' },
      examples: [
        { en: 'The baby is having a bath.', vi: 'Em bé đang tắm trong bồn.' },
        { en: 'Our bathroom has a big bath.', vi: 'Phòng tắm nhà tôi có bồn tắm lớn.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ gọi bồn tắm là "bathtub".', en: 'US English: "bathtub".' },
    },
    {
      id: 'fun-household-soap', word: 'soap', ipa: '/səʊp/', partOfSpeech: 'noun', meaningVi: 'xà phòng',
      image: { kind: 'emoji', value: '🧼' },
      examples: [
        { en: 'Wash your hands with soap.', vi: 'Rửa tay bằng xà phòng.' },
        { en: 'This soap smells of flowers.', vi: 'Xà phòng này có mùi hoa.' },
      ],
      extraInfo: { vi: 'Một bánh xà phòng: a bar of soap.', en: 'One piece: a bar of soap.' },
    },
    {
      id: 'fun-household-toothbrush', word: 'toothbrush', ipa: '/ˈtuːθ.brʌʃ/', partOfSpeech: 'noun', meaningVi: 'bàn chải đánh răng',
      image: { kind: 'emoji', value: '🪥' },
      examples: [
        { en: 'I need a new toothbrush.', vi: 'Tôi cần một chiếc bàn chải đánh răng mới.' },
        { en: 'My toothbrush is blue.', vi: 'Bàn chải đánh răng của tôi màu xanh.' },
      ],
      extraInfo: { vi: 'Kem đánh răng: toothpaste. Đánh răng: brush your teeth.', en: 'Toothpaste; brush your teeth.' },
    },
    {
      id: 'fun-household-sponge', word: 'sponge', ipa: '/spʌndʒ/', partOfSpeech: 'noun', meaningVi: 'miếng bọt biển',
      image: { kind: 'emoji', value: '🧽' },
      examples: [
        { en: 'I wash the dishes with a sponge.', vi: 'Tôi rửa bát bằng miếng bọt biển.' },
        { en: 'The sponge is wet.', vi: 'Miếng bọt biển bị ướt.' },
      ],
    },
    {
      id: 'fun-household-bucket', word: 'bucket', ipa: '/ˈbʌk.ɪt/', partOfSpeech: 'noun', meaningVi: 'cái xô',
      image: { kind: 'emoji', value: '🪣' },
      examples: [
        { en: 'Fill the bucket with water.', vi: 'Đổ đầy nước vào xô.' },
        { en: 'The children play with a bucket on the beach.', vi: 'Bọn trẻ chơi với cái xô trên bãi biển.' },
      ],
    },
    {
      id: 'fun-household-broom', word: 'broom', ipa: '/bruːm/', partOfSpeech: 'noun', meaningVi: 'cái chổi',
      image: { kind: 'emoji', value: '🧹' },
      examples: [
        { en: 'I sweep the floor with a broom.', vi: 'Tôi quét nhà bằng chổi.' },
        { en: 'The broom is behind the door.', vi: 'Cái chổi ở sau cánh cửa.' },
      ],
      extraInfo: { vi: 'Quét nhà: sweep the floor.', en: 'Collocation: sweep the floor.' },
    },
    {
      id: 'fun-household-basket', word: 'basket', ipa: '/ˈbɑː.skɪt/', partOfSpeech: 'noun', meaningVi: 'cái giỏ, cái rổ',
      image: { kind: 'emoji', value: '🧺' },
      examples: [
        { en: 'Put the dirty clothes in the basket.', vi: 'Bỏ quần áo bẩn vào giỏ.' },
        { en: 'She carries a basket of fruit.', vi: 'Cô ấy xách một giỏ hoa quả.' },
      ],
    },
    {
      id: 'fun-household-key', word: 'key', ipa: '/kiː/', partOfSpeech: 'noun', meaningVi: 'chìa khóa',
      image: { kind: 'emoji', value: '🔑' },
      examples: [
        { en: 'I cannot find my keys.', vi: 'Tôi không tìm thấy chìa khóa.' },
        { en: 'This key opens the front door.', vi: 'Chiếc chìa này mở cửa chính.' },
      ],
    },
    {
      id: 'fun-household-candle', word: 'candle', ipa: '/ˈkæn.dəl/', partOfSpeech: 'noun', meaningVi: 'cây nến',
      image: { kind: 'emoji', value: '🕯️' },
      examples: [
        { en: 'There are ten candles on the birthday cake.', vi: 'Có mười cây nến trên bánh sinh nhật.' },
        { en: 'We light a candle when the power goes off.', vi: 'Chúng tôi thắp nến khi mất điện.' },
      ],
      extraInfo: { vi: 'Thắp nến: light a candle; thổi nến: blow out the candles.', en: 'Light a candle; blow out the candles.' },
    },
    {
      id: 'fun-household-cutlery', word: 'cutlery', ipa: '/ˈkʌt.lər.i/', partOfSpeech: 'noun', meaningVi: 'dao dĩa, bộ đồ ăn',
      image: { kind: 'emoji', value: '🍴' },
      examples: [
        { en: 'Please put the cutlery on the table.', vi: 'Con bày dao dĩa lên bàn nhé.' },
        { en: 'The cutlery is in the drawer.', vi: 'Dao dĩa ở trong ngăn kéo.' },
      ],
      extraInfo: { vi: 'Không đếm được. Anh-Mỹ: silverware. Cái dĩa: fork.', en: 'Uncountable. US: silverware. One piece: a fork.' },
    },
    {
      id: 'fun-household-spoon', word: 'spoon', ipa: '/spuːn/', partOfSpeech: 'noun', meaningVi: 'cái thìa',
      image: { kind: 'emoji', value: '🥄' },
      examples: [
        { en: 'I eat soup with a spoon.', vi: 'Tôi ăn canh bằng thìa.' },
        { en: 'Can I have a spoon, please?', vi: 'Cho tôi xin một cái thìa nhé.' },
      ],
    },
    {
      id: 'fun-household-knife', word: 'knife', ipa: '/naɪf/', partOfSpeech: 'noun', meaningVi: 'con dao',
      image: { kind: 'emoji', value: '🔪' },
      examples: [
        { en: 'Be careful, the knife is sharp.', vi: 'Cẩn thận, con dao sắc lắm.' },
        { en: 'Mum cuts the meat with a knife.', vi: 'Mẹ thái thịt bằng dao.' },
      ],
      extraInfo: { vi: 'Chữ "k" câm. Số nhiều: knives.', en: 'The "k" is silent. Plural: knives.' },
    },
    {
      id: 'fun-household-bowl', word: 'bowl', ipa: '/bəʊl/', partOfSpeech: 'noun', meaningVi: 'cái bát, cái tô',
      image: { kind: 'emoji', value: '🥣' },
      examples: [
        { en: 'I eat a bowl of cereal for breakfast.', vi: 'Bữa sáng tôi ăn một bát ngũ cốc.' },
        { en: 'Put the bowls on the table.', vi: 'Đặt bát lên bàn đi.' },
      ],
    },
    {
      id: 'fun-household-chopsticks', word: 'chopsticks', ipa: '/ˈtʃɒp.stɪks/', partOfSpeech: 'noun', meaningVi: 'đôi đũa',
      image: { kind: 'emoji', value: '🥢' },
      examples: [
        { en: 'Vietnamese people eat with chopsticks.', vi: 'Người Việt Nam ăn bằng đũa.' },
        { en: 'Can you use chopsticks?', vi: 'Bạn có biết dùng đũa không?' },
      ],
      extraInfo: { vi: 'Một đôi đũa: a pair of chopsticks.', en: 'Two together: a pair of chopsticks.' },
    },
    {
      id: 'fun-household-frying-pan', word: 'frying pan', ipa: '/ˈfraɪ.ɪŋ ˌpæn/', partOfSpeech: 'noun', meaningVi: 'cái chảo',
      image: { kind: 'emoji', value: '🍳' },
      examples: [
        { en: 'Dad fries eggs in a frying pan.', vi: 'Bố rán trứng bằng chảo.' },
        { en: 'The frying pan is very hot.', vi: 'Cái chảo rất nóng.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ còn gọi là "skillet".', en: 'US English also says "skillet".' },
    },
    {
      id: 'fun-household-teapot', word: 'teapot', ipa: '/ˈtiː.pɒt/', partOfSpeech: 'noun', meaningVi: 'ấm trà',
      image: { kind: 'emoji', value: '🫖' },
      examples: [
        { en: 'Grandpa makes tea in a small teapot.', vi: 'Ông pha trà trong một chiếc ấm nhỏ.' },
        { en: 'The teapot is full.', vi: 'Ấm trà đầy rồi.' },
      ],
    },
    {
      id: 'fun-household-jar', word: 'jar', ipa: '/dʒɑːr/', partOfSpeech: 'noun', meaningVi: 'cái lọ, cái hũ',
      image: { kind: 'emoji', value: '🫙' },
      examples: [
        { en: 'I cannot open this jar.', vi: 'Tôi không mở được cái lọ này.' },
        { en: 'Mum keeps sugar in a glass jar.', vi: 'Mẹ đựng đường trong một cái lọ thủy tinh.' },
      ],
    },
    {
      id: 'fun-household-scissors', word: 'scissors', ipa: '/ˈsɪz.əz/', partOfSpeech: 'noun', meaningVi: 'cái kéo',
      image: { kind: 'emoji', value: '✂️' },
      examples: [
        { en: 'Can I borrow your scissors?', vi: 'Cho tôi mượn cái kéo được không?' },
        { en: 'These scissors are very sharp.', vi: 'Cái kéo này rất sắc.' },
      ],
      extraInfo: { vi: 'Luôn ở số nhiều: a pair of scissors.', en: 'Always plural: a pair of scissors.' },
    },
    {
      id: 'fun-household-umbrella', word: 'umbrella', ipa: '/ʌmˈbrel.ə/', partOfSpeech: 'noun', meaningVi: 'cái ô, cái dù',
      image: { kind: 'emoji', value: '☂️' },
      examples: [
        { en: 'Take an umbrella. It is raining.', vi: 'Mang ô theo đi. Trời đang mưa.' },
        { en: 'I left my umbrella on the bus.', vi: 'Tôi để quên ô trên xe buýt.' },
      ],
    },
    {
      id: 'fun-household-picture-frame', word: 'picture frame', ipa: '/ˈpɪk.tʃə ˌfreɪm/', partOfSpeech: 'noun', meaningVi: 'khung ảnh',
      image: { kind: 'emoji', value: '🖼️' },
      examples: [
        { en: 'There is a family photo in the picture frame.', vi: 'Có một bức ảnh gia đình trong khung ảnh.' },
        { en: 'I bought a wooden picture frame.', vi: 'Tôi mua một chiếc khung ảnh bằng gỗ.' },
      ],
    },
    {
      id: 'fun-household-houseplant', word: 'houseplant', ipa: '/ˈhaʊs.plɑːnt/', partOfSpeech: 'noun', meaningVi: 'cây cảnh trong nhà',
      image: { kind: 'emoji', value: '🪴' },
      examples: [
        { en: 'We have a houseplant by the window.', vi: 'Chúng tôi có một chậu cây cảnh cạnh cửa sổ.' },
        { en: 'Water the houseplants once a week.', vi: 'Tưới cây cảnh mỗi tuần một lần.' },
      ],
    },
    {
      id: 'fun-household-rubbish-bin', word: 'rubbish bin', ipa: '/ˈrʌb.ɪʃ ˌbɪn/', partOfSpeech: 'noun', meaningVi: 'thùng rác',
      image: { kind: 'emoji', value: '🗑️' },
      examples: [
        { en: 'Put the paper in the rubbish bin.', vi: 'Bỏ giấy vào thùng rác.' },
        { en: 'The rubbish bin is full.', vi: 'Thùng rác đầy rồi.' },
      ],
      extraInfo: { vi: 'Anh-Anh: rubbish bin; Anh-Mỹ: trash can / garbage can.', en: 'UK: rubbish bin; US: trash can / garbage can.' },
    },
    {
      id: 'fun-household-toilet-roll', word: 'toilet roll', ipa: '/ˈtɔɪ.lət ˌrəʊl/', partOfSpeech: 'noun', meaningVi: 'cuộn giấy vệ sinh',
      image: { kind: 'emoji', value: '🧻' },
      examples: [
        { en: 'We need to buy more toilet rolls.', vi: 'Chúng ta cần mua thêm giấy vệ sinh.' },
        { en: 'There is no toilet roll in the bathroom.', vi: 'Trong phòng tắm hết giấy vệ sinh rồi.' },
      ],
      extraInfo: { vi: 'Còn gọi: toilet paper.', en: 'Also called "toilet paper".' },
    },
    {
      id: 'fun-household-ladder', word: 'ladder', ipa: '/ˈlæd.ər/', partOfSpeech: 'noun', meaningVi: 'cái thang',
      image: { kind: 'emoji', value: '🪜' },
      examples: [
        { en: 'Dad climbs the ladder to fix the light.', vi: 'Bố trèo thang để sửa đèn.' },
        { en: 'Hold the ladder for me, please.', vi: 'Giữ thang giúp bố nhé.' },
      ],
    },
    {
      id: 'fun-household-hammer', word: 'hammer', ipa: '/ˈhæm.ər/', partOfSpeech: 'noun', meaningVi: 'cái búa',
      image: { kind: 'emoji', value: '🔨' },
      examples: [
        { en: 'He hits the nail with a hammer.', vi: 'Anh ấy đóng đinh bằng búa.' },
        { en: 'The hammer is in the toolbox.', vi: 'Cái búa ở trong hộp dụng cụ.' },
      ],
    },
    {
      id: 'fun-household-teddy-bear', word: 'teddy bear', ipa: '/ˈted.i ˌbeər/', partOfSpeech: 'noun', meaningVi: 'gấu bông',
      image: { kind: 'emoji', value: '🧸' },
      examples: [
        { en: 'My little sister sleeps with her teddy bear.', vi: 'Em gái tôi ngủ cùng con gấu bông.' },
        { en: 'This teddy bear is very soft.', vi: 'Con gấu bông này rất mềm.' },
      ],
    },
  ],
}
