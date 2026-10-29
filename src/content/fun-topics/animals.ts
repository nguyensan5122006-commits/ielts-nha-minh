// Chủ đề Học vui: Động vật — thú cưng, vật nuôi, thú hoang, động vật biển, chim và côn trùng.
import type { FunTopic } from '../content-types'

export const animalsTopic: FunTopic = {
  id: 'animals',
  title: { vi: 'Động vật', en: 'Animals' },
  icon: '🐘',
  group: { vi: 'Thiên nhiên', en: 'Nature' },
  cards: [
    {
      id: 'fun-animals-dog', word: 'dog', ipa: '/dɒɡ/', partOfSpeech: 'noun', meaningVi: 'con chó',
      image: { kind: 'emoji', value: '🐕' },
      examples: [
        { en: 'My dog likes to play in the garden.', vi: 'Con chó của tôi thích chơi trong vườn.' },
        { en: 'We walk the dog every morning.', vi: 'Chúng tôi dắt chó đi dạo mỗi sáng.' },
      ],
      extraInfo: { vi: 'Chó con gọi là "puppy".', en: 'A baby dog is called a "puppy".' },
    },
    {
      id: 'fun-animals-cat', word: 'cat', ipa: '/kæt/', partOfSpeech: 'noun', meaningVi: 'con mèo',
      image: { kind: 'emoji', value: '🐈' },
      examples: [
        { en: 'The cat is sleeping on the sofa.', vi: 'Con mèo đang ngủ trên ghế sofa.' },
        { en: 'Our cat catches mice.', vi: 'Con mèo nhà chúng tôi bắt chuột.' },
      ],
      extraInfo: { vi: 'Mèo con gọi là "kitten".', en: 'A baby cat is called a "kitten".' },
    },
    {
      id: 'fun-animals-rabbit', word: 'rabbit', ipa: '/ˈræb.ɪt/', partOfSpeech: 'noun', meaningVi: 'con thỏ',
      image: { kind: 'emoji', value: '🐇' },
      examples: [
        { en: 'The rabbit is eating a carrot.', vi: 'Con thỏ đang ăn cà rốt.' },
        { en: 'Rabbits have long ears.', vi: 'Thỏ có đôi tai dài.' },
      ],
    },
    {
      id: 'fun-animals-hamster', word: 'hamster', ipa: '/ˈhæm.stər/', partOfSpeech: 'noun', meaningVi: 'chuột hamster',
      image: { kind: 'emoji', value: '🐹' },
      examples: [
        { en: 'My sister has a small hamster.', vi: 'Em gái tôi có một con chuột hamster nhỏ.' },
        { en: 'The hamster runs on its wheel at night.', vi: 'Con hamster chạy trên bánh xe vào ban đêm.' },
      ],
    },
    {
      id: 'fun-animals-mouse', word: 'mouse', ipa: '/maʊs/', partOfSpeech: 'noun', meaningVi: 'con chuột',
      image: { kind: 'emoji', value: '🐭' },
      examples: [
        { en: 'A mouse is hiding under the table.', vi: 'Một con chuột đang trốn dưới bàn.' },
        { en: 'The mouse is very small and grey.', vi: 'Con chuột rất nhỏ và màu xám.' },
      ],
      extraInfo: { vi: 'Số nhiều bất quy tắc: mouse → mice.', en: 'Irregular plural: mouse → mice.' },
    },
    {
      id: 'fun-animals-horse', word: 'horse', ipa: '/hɔːs/', partOfSpeech: 'noun', meaningVi: 'con ngựa',
      image: { kind: 'emoji', value: '🐎' },
      examples: [
        { en: 'She can ride a horse.', vi: 'Cô ấy biết cưỡi ngựa.' },
        { en: 'The horse runs very fast.', vi: 'Con ngựa chạy rất nhanh.' },
      ],
      extraInfo: { vi: 'Cụm từ: ride a horse (cưỡi ngựa).', en: 'Collocation: ride a horse.' },
    },
    {
      id: 'fun-animals-cow', word: 'cow', ipa: '/kaʊ/', partOfSpeech: 'noun', meaningVi: 'con bò (cái)',
      image: { kind: 'emoji', value: '🐄' },
      examples: [
        { en: 'The cow gives us milk.', vi: 'Con bò cho chúng ta sữa.' },
        { en: 'There are five cows on the farm.', vi: 'Có năm con bò ở trang trại.' },
      ],
      extraInfo: { vi: 'Thịt bò là "beef", không phải "cow".', en: 'The meat from a cow is called "beef".' },
    },
    {
      id: 'fun-animals-pig', word: 'pig', ipa: '/pɪɡ/', partOfSpeech: 'noun', meaningVi: 'con lợn',
      image: { kind: 'emoji', value: '🐖' },
      examples: [
        { en: 'The pig is playing in the mud.', vi: 'Con lợn đang nghịch bùn.' },
        { en: 'My grandparents keep pigs.', vi: 'Ông bà tôi nuôi lợn.' },
      ],
      extraInfo: { vi: 'Thịt lợn là "pork".', en: 'The meat from a pig is called "pork".' },
    },
    {
      id: 'fun-animals-sheep', word: 'sheep', ipa: '/ʃiːp/', partOfSpeech: 'noun', meaningVi: 'con cừu',
      image: { kind: 'emoji', value: '🐑' },
      examples: [
        { en: 'The sheep are eating grass.', vi: 'Những con cừu đang ăn cỏ.' },
        { en: 'We get wool from sheep.', vi: 'Chúng ta lấy len từ cừu.' },
      ],
      extraInfo: { vi: 'Số nhiều không đổi: one sheep, two sheep.', en: 'The plural is the same: one sheep, two sheep.' },
    },
    {
      id: 'fun-animals-goat', word: 'goat', ipa: '/ɡəʊt/', partOfSpeech: 'noun', meaningVi: 'con dê',
      image: { kind: 'emoji', value: '🐐' },
      examples: [
        { en: 'The goat is climbing the hill.', vi: 'Con dê đang leo lên đồi.' },
        { en: 'Goats can eat almost anything.', vi: 'Dê có thể ăn gần như mọi thứ.' },
      ],
    },
    {
      id: 'fun-animals-chicken', word: 'chicken', ipa: '/ˈtʃɪk.ɪn/', partOfSpeech: 'noun', meaningVi: 'con gà; thịt gà',
      image: { kind: 'emoji', value: '🐔' },
      examples: [
        { en: 'The chickens are in the yard.', vi: 'Những con gà đang ở ngoài sân.' },
        { en: 'Our chicken lays an egg every day.', vi: 'Con gà nhà mình đẻ một quả trứng mỗi ngày.' },
      ],
      extraInfo: { vi: 'Gà trống: rooster (Anh: cock); gà con: chick.', en: 'Male: rooster (UK also cock); baby: chick.' },
    },
    {
      id: 'fun-animals-duck', word: 'duck', ipa: '/dʌk/', partOfSpeech: 'noun', meaningVi: 'con vịt',
      image: { kind: 'emoji', value: '🦆' },
      examples: [
        { en: 'The ducks are swimming in the pond.', vi: 'Những con vịt đang bơi trong ao.' },
        { en: 'A duck says "quack".', vi: 'Con vịt kêu "quạc quạc".' },
      ],
    },
    {
      id: 'fun-animals-elephant', word: 'elephant', ipa: '/ˈel.ɪ.fənt/', partOfSpeech: 'noun', meaningVi: 'con voi',
      image: { kind: 'emoji', value: '🐘' },
      examples: [
        { en: 'An elephant has a long trunk.', vi: 'Con voi có cái vòi dài.' },
        { en: 'Elephants are very big and strong.', vi: 'Voi rất to và khỏe.' },
      ],
      extraInfo: { vi: 'Dùng "an" vì bắt đầu bằng nguyên âm: an elephant.', en: 'Use "an" before a vowel sound: an elephant.' },
    },
    {
      id: 'fun-animals-lion', word: 'lion', ipa: '/ˈlaɪ.ən/', partOfSpeech: 'noun', meaningVi: 'con sư tử',
      image: { kind: 'emoji', value: '🦁' },
      examples: [
        { en: 'The lion is the king of the jungle.', vi: 'Sư tử là chúa sơn lâm.' },
        { en: 'I saw a lion at the zoo.', vi: 'Tôi đã thấy một con sư tử ở sở thú.' },
      ],
    },
    {
      id: 'fun-animals-tiger', word: 'tiger', ipa: '/ˈtaɪ.ɡər/', partOfSpeech: 'noun', meaningVi: 'con hổ',
      image: { kind: 'emoji', value: '🐅' },
      examples: [
        { en: 'A tiger has orange and black stripes.', vi: 'Con hổ có sọc cam và đen.' },
        { en: 'Tigers live in the forest.', vi: 'Hổ sống trong rừng.' },
      ],
    },
    {
      id: 'fun-animals-monkey', word: 'monkey', ipa: '/ˈmʌŋ.ki/', partOfSpeech: 'noun', meaningVi: 'con khỉ',
      image: { kind: 'emoji', value: '🐒' },
      examples: [
        { en: 'The monkey is eating a banana.', vi: 'Con khỉ đang ăn chuối.' },
        { en: 'Monkeys like to climb trees.', vi: 'Khỉ thích trèo cây.' },
      ],
    },
    {
      id: 'fun-animals-bear', word: 'bear', ipa: '/beər/', partOfSpeech: 'noun', meaningVi: 'con gấu',
      image: { kind: 'emoji', value: '🐻' },
      examples: [
        { en: 'The bear is looking for honey.', vi: 'Con gấu đang tìm mật ong.' },
        { en: 'Bears sleep in winter.', vi: 'Gấu ngủ đông vào mùa đông.' },
      ],
    },
    {
      id: 'fun-animals-giraffe', word: 'giraffe', ipa: '/dʒɪˈrɑːf/', partOfSpeech: 'noun', meaningVi: 'con hươu cao cổ',
      image: { kind: 'emoji', value: '🦒' },
      examples: [
        { en: 'A giraffe has a very long neck.', vi: 'Hươu cao cổ có cái cổ rất dài.' },
        { en: 'The giraffe eats leaves from tall trees.', vi: 'Hươu cao cổ ăn lá trên cây cao.' },
      ],
    },
    {
      id: 'fun-animals-zebra', word: 'zebra', ipa: '/ˈzeb.rə/', partOfSpeech: 'noun', meaningVi: 'con ngựa vằn',
      image: { kind: 'emoji', value: '🦓' },
      examples: [
        { en: 'A zebra has black and white stripes.', vi: 'Ngựa vằn có sọc đen và trắng.' },
        { en: 'Zebras live in Africa.', vi: 'Ngựa vằn sống ở châu Phi.' },
      ],
      extraInfo: { vi: 'Anh-Anh đọc /ˈzeb.rə/, Anh-Mỹ đọc /ˈziː.brə/.', en: 'UK: /ˈzeb.rə/, US: /ˈziː.brə/.' },
    },
    {
      id: 'fun-animals-kangaroo', word: 'kangaroo', ipa: '/ˌkæŋ.ɡərˈuː/', partOfSpeech: 'noun', meaningVi: 'con chuột túi',
      image: { kind: 'emoji', value: '🦘' },
      examples: [
        { en: 'Kangaroos come from Australia.', vi: 'Chuột túi đến từ nước Úc.' },
        { en: 'A kangaroo can jump very high.', vi: 'Chuột túi có thể nhảy rất cao.' },
      ],
    },
    {
      id: 'fun-animals-panda', word: 'panda', ipa: '/ˈpæn.də/', partOfSpeech: 'noun', meaningVi: 'con gấu trúc',
      image: { kind: 'emoji', value: '🐼' },
      examples: [
        { en: 'Pandas eat bamboo.', vi: 'Gấu trúc ăn tre.' },
        { en: 'The baby panda is so cute.', vi: 'Gấu trúc con thật dễ thương.' },
      ],
    },
    {
      id: 'fun-animals-snake', word: 'snake', ipa: '/sneɪk/', partOfSpeech: 'noun', meaningVi: 'con rắn',
      image: { kind: 'emoji', value: '🐍' },
      examples: [
        { en: 'I am afraid of snakes.', vi: 'Tôi sợ rắn.' },
        { en: 'The snake has no legs.', vi: 'Con rắn không có chân.' },
      ],
    },
    {
      id: 'fun-animals-crocodile', word: 'crocodile', ipa: '/ˈkrɒk.ə.daɪl/', partOfSpeech: 'noun', meaningVi: 'con cá sấu',
      image: { kind: 'emoji', value: '🐊' },
      examples: [
        { en: 'The crocodile is lying in the river.', vi: 'Con cá sấu đang nằm dưới sông.' },
        { en: 'Crocodiles have big teeth.', vi: 'Cá sấu có hàm răng to.' },
      ],
    },
    {
      id: 'fun-animals-fox', word: 'fox', ipa: '/fɒks/', partOfSpeech: 'noun', meaningVi: 'con cáo',
      image: { kind: 'emoji', value: '🦊' },
      examples: [
        { en: 'The fox has a long red tail.', vi: 'Con cáo có cái đuôi dài màu đỏ.' },
        { en: 'Foxes are clever animals.', vi: 'Cáo là loài vật thông minh.' },
      ],
      extraInfo: { vi: 'Số nhiều: fox → foxes.', en: 'Plural: fox → foxes.' },
    },
    {
      id: 'fun-animals-wolf', word: 'wolf', ipa: '/wʊlf/', partOfSpeech: 'noun', meaningVi: 'con sói',
      image: { kind: 'emoji', value: '🐺' },
      examples: [
        { en: 'The wolf howls at night.', vi: 'Con sói tru vào ban đêm.' },
        { en: 'Wolves live in groups.', vi: 'Sói sống theo bầy.' },
      ],
      extraInfo: { vi: 'Số nhiều bất quy tắc: wolf → wolves.', en: 'Irregular plural: wolf → wolves.' },
    },
    {
      id: 'fun-animals-deer', word: 'deer', ipa: '/dɪər/', partOfSpeech: 'noun', meaningVi: 'con hươu, con nai',
      image: { kind: 'emoji', value: '🦌' },
      examples: [
        { en: 'We saw a deer in the forest.', vi: 'Chúng tôi thấy một con nai trong rừng.' },
        { en: 'The deer runs away quickly.', vi: 'Con nai chạy đi thật nhanh.' },
      ],
      extraInfo: { vi: 'Số nhiều không đổi: one deer, three deer.', en: 'The plural is the same: one deer, three deer.' },
    },
    {
      id: 'fun-animals-camel', word: 'camel', ipa: '/ˈkæm.əl/', partOfSpeech: 'noun', meaningVi: 'con lạc đà',
      image: { kind: 'emoji', value: '🐫' },
      examples: [
        { en: 'Camels live in the desert.', vi: 'Lạc đà sống ở sa mạc.' },
        { en: 'A camel can walk for days without water.', vi: 'Lạc đà có thể đi nhiều ngày không cần nước.' },
      ],
    },
    {
      id: 'fun-animals-fish', word: 'fish', ipa: '/fɪʃ/', partOfSpeech: 'noun', meaningVi: 'con cá',
      image: { kind: 'emoji', value: '🐟' },
      examples: [
        { en: 'There are many fish in the lake.', vi: 'Có nhiều cá trong hồ.' },
        { en: 'My brother has a pet fish.', vi: 'Anh trai tôi nuôi một con cá cảnh.' },
      ],
      extraInfo: { vi: 'Số nhiều thường giữ nguyên: one fish, two fish.', en: 'The plural is usually the same: one fish, two fish.' },
    },
    {
      id: 'fun-animals-shark', word: 'shark', ipa: '/ʃɑːk/', partOfSpeech: 'noun', meaningVi: 'cá mập',
      image: { kind: 'emoji', value: '🦈' },
      examples: [
        { en: 'A shark has sharp teeth.', vi: 'Cá mập có hàm răng sắc nhọn.' },
        { en: 'Sharks swim in the ocean.', vi: 'Cá mập bơi ở đại dương.' },
      ],
    },
    {
      id: 'fun-animals-whale', word: 'whale', ipa: '/weɪl/', partOfSpeech: 'noun', meaningVi: 'cá voi',
      image: { kind: 'emoji', value: '🐋' },
      examples: [
        { en: 'The whale is the biggest animal in the sea.', vi: 'Cá voi là động vật lớn nhất dưới biển.' },
        { en: 'We watched whales from the boat.', vi: 'Chúng tôi ngắm cá voi từ trên thuyền.' },
      ],
    },
    {
      id: 'fun-animals-dolphin', word: 'dolphin', ipa: '/ˈdɒl.fɪn/', partOfSpeech: 'noun', meaningVi: 'cá heo',
      image: { kind: 'emoji', value: '🐬' },
      examples: [
        { en: 'Dolphins are very smart.', vi: 'Cá heo rất thông minh.' },
        { en: 'The dolphin jumps out of the water.', vi: 'Con cá heo nhảy lên khỏi mặt nước.' },
      ],
    },
    {
      id: 'fun-animals-octopus', word: 'octopus', ipa: '/ˈɒk.tə.pəs/', partOfSpeech: 'noun', meaningVi: 'con bạch tuộc',
      image: { kind: 'emoji', value: '🐙' },
      examples: [
        { en: 'An octopus has eight arms.', vi: 'Bạch tuộc có tám xúc tu.' },
        { en: 'The octopus is hiding in a rock.', vi: 'Con bạch tuộc đang trốn trong hốc đá.' },
      ],
    },
    {
      id: 'fun-animals-crab', word: 'crab', ipa: '/kræb/', partOfSpeech: 'noun', meaningVi: 'con cua',
      image: { kind: 'emoji', value: '🦀' },
      examples: [
        { en: 'A crab walks sideways.', vi: 'Con cua bò ngang.' },
        { en: 'We found a small crab on the beach.', vi: 'Chúng tôi tìm thấy một con cua nhỏ trên bãi biển.' },
      ],
    },
    {
      id: 'fun-animals-turtle', word: 'turtle', ipa: '/ˈtɜː.təl/', partOfSpeech: 'noun', meaningVi: 'con rùa',
      image: { kind: 'emoji', value: '🐢' },
      examples: [
        { en: 'The turtle moves very slowly.', vi: 'Con rùa di chuyển rất chậm.' },
        { en: 'Sea turtles lay eggs on the beach.', vi: 'Rùa biển đẻ trứng trên bãi cát.' },
      ],
      extraInfo: { vi: 'Rùa sống trên cạn thường gọi là "tortoise".', en: 'A turtle that lives on land is often called a "tortoise".' },
    },
    {
      id: 'fun-animals-penguin', word: 'penguin', ipa: '/ˈpeŋ.ɡwɪn/', partOfSpeech: 'noun', meaningVi: 'chim cánh cụt',
      image: { kind: 'emoji', value: '🐧' },
      examples: [
        { en: 'Penguins cannot fly.', vi: 'Chim cánh cụt không biết bay.' },
        { en: 'Penguins live in cold places.', vi: 'Chim cánh cụt sống ở nơi lạnh giá.' },
      ],
    },
    {
      id: 'fun-animals-owl', word: 'owl', ipa: '/aʊl/', partOfSpeech: 'noun', meaningVi: 'con cú',
      image: { kind: 'emoji', value: '🦉' },
      examples: [
        { en: 'The owl is awake at night.', vi: 'Con cú thức vào ban đêm.' },
        { en: 'An owl has big round eyes.', vi: 'Con cú có đôi mắt to tròn.' },
      ],
      extraInfo: { vi: '"Night owl" = người hay thức khuya.', en: '"Night owl" = a person who likes to stay up late.' },
    },
    {
      id: 'fun-animals-parrot', word: 'parrot', ipa: '/ˈpær.ət/', partOfSpeech: 'noun', meaningVi: 'con vẹt',
      image: { kind: 'emoji', value: '🦜' },
      examples: [
        { en: 'Our parrot can say "hello".', vi: 'Con vẹt nhà tôi biết nói "xin chào".' },
        { en: 'The parrot has green and red feathers.', vi: 'Con vẹt có lông màu xanh và đỏ.' },
      ],
    },
    {
      id: 'fun-animals-eagle', word: 'eagle', ipa: '/ˈiː.ɡəl/', partOfSpeech: 'noun', meaningVi: 'đại bàng',
      image: { kind: 'emoji', value: '🦅' },
      examples: [
        { en: 'The eagle flies high in the sky.', vi: 'Đại bàng bay cao trên bầu trời.' },
        { en: 'An eagle has very good eyes.', vi: 'Đại bàng có đôi mắt rất tinh.' },
      ],
    },
    {
      id: 'fun-animals-frog', word: 'frog', ipa: '/frɒɡ/', partOfSpeech: 'noun', meaningVi: 'con ếch',
      image: { kind: 'emoji', value: '🐸' },
      examples: [
        { en: 'The frog is jumping into the pond.', vi: 'Con ếch đang nhảy xuống ao.' },
        { en: 'Frogs are green.', vi: 'Ếch có màu xanh lá.' },
      ],
    },
    {
      id: 'fun-animals-bee', word: 'bee', ipa: '/biː/', partOfSpeech: 'noun', meaningVi: 'con ong',
      image: { kind: 'emoji', value: '🐝' },
      examples: [
        { en: 'Bees make honey.', vi: 'Ong làm ra mật.' },
        { en: 'A bee is flying around the flowers.', vi: 'Một con ong đang bay quanh những bông hoa.' },
      ],
      extraInfo: { vi: '"As busy as a bee" = rất bận rộn.', en: '"As busy as a bee" = very busy.' },
    },
    {
      id: 'fun-animals-butterfly', word: 'butterfly', ipa: '/ˈbʌt.ə.flaɪ/', partOfSpeech: 'noun', meaningVi: 'con bướm',
      image: { kind: 'emoji', value: '🦋' },
      examples: [
        { en: 'The butterfly has beautiful wings.', vi: 'Con bướm có đôi cánh đẹp.' },
        { en: 'There are many butterflies in the garden.', vi: 'Có nhiều bướm trong vườn.' },
      ],
      extraInfo: { vi: 'Số nhiều: butterfly → butterflies.', en: 'Plural: butterfly → butterflies.' },
    },
    {
      id: 'fun-animals-ant', word: 'ant', ipa: '/ænt/', partOfSpeech: 'noun', meaningVi: 'con kiến',
      image: { kind: 'emoji', value: '🐜' },
      examples: [
        { en: 'Ants are very small but strong.', vi: 'Kiến rất nhỏ nhưng khỏe.' },
        { en: 'There are ants on the cake.', vi: 'Có kiến trên cái bánh.' },
      ],
    },
    {
      id: 'fun-animals-mosquito', word: 'mosquito', ipa: '/məˈskiː.təʊ/', partOfSpeech: 'noun', meaningVi: 'con muỗi',
      image: { kind: 'emoji', value: '🦟' },
      examples: [
        { en: 'A mosquito bit my arm.', vi: 'Một con muỗi đã đốt tay tôi.' },
        { en: 'There are many mosquitoes in summer.', vi: 'Mùa hè có rất nhiều muỗi.' },
      ],
      extraInfo: { vi: 'Số nhiều: mosquitoes; "mosquito net" = cái màn.', en: 'Plural: mosquitoes; a "mosquito net" protects you while you sleep.' },
    },
    {
      id: 'fun-animals-spider', word: 'spider', ipa: '/ˈspaɪ.dər/', partOfSpeech: 'noun', meaningVi: 'con nhện',
      image: { kind: 'emoji', value: '🕷️' },
      examples: [
        { en: 'A spider has eight legs.', vi: 'Con nhện có tám chân.' },
        { en: 'The spider is making a web.', vi: 'Con nhện đang giăng tơ.' },
      ],
    },
  ],
}
