// Chủ đề Học vui: Cơ thể người — các bộ phận bên ngoài và bên trong cơ thể.
import type { FunTopic } from '../content-types'

export const bodyTopic: FunTopic = {
  id: 'body',
  title: { vi: 'Cơ thể', en: 'The body' },
  icon: '🦵',
  group: { vi: 'Con người', en: 'People' },
  cards: [
    {
      id: 'fun-body-face', word: 'face', ipa: '/feɪs/', partOfSpeech: 'noun', meaningVi: 'khuôn mặt',
      image: { kind: 'emoji', value: '🙂' },
      examples: [
        { en: 'Wash your face in the morning.', vi: 'Rửa mặt vào buổi sáng.' },
        { en: 'She has a happy face.', vi: 'Cô ấy có khuôn mặt vui vẻ.' },
      ],
    },
    {
      id: 'fun-body-eye', word: 'eye', ipa: '/aɪ/', partOfSpeech: 'noun', meaningVi: 'con mắt',
      image: { kind: 'emoji', value: '👁️' },
      examples: [
        { en: 'Close your eyes and go to sleep.', vi: 'Nhắm mắt lại và ngủ đi.' },
        { en: 'My sister has brown eyes.', vi: 'Em gái tôi có đôi mắt nâu.' },
      ],
      extraInfo: { vi: 'Phát âm giống chữ "I" (tôi).', en: 'Sounds the same as "I".' },
    },
    {
      id: 'fun-body-ear', word: 'ear', ipa: '/ɪər/', partOfSpeech: 'noun', meaningVi: 'cái tai',
      image: { kind: 'emoji', value: '👂' },
      examples: [
        { en: 'We hear with our ears.', vi: 'Chúng ta nghe bằng tai.' },
        { en: 'My ear hurts.', vi: 'Tôi bị đau tai.' },
      ],
    },
    {
      id: 'fun-body-nose', word: 'nose', ipa: '/nəʊz/', partOfSpeech: 'noun', meaningVi: 'cái mũi',
      image: { kind: 'emoji', value: '👃' },
      examples: [
        { en: 'We smell with our nose.', vi: 'Chúng ta ngửi bằng mũi.' },
        { en: 'I have a runny nose.', vi: 'Tôi bị sổ mũi.' },
      ],
      extraInfo: { vi: 'Sổ mũi: a runny nose.', en: 'Collocation: a runny nose.' },
    },
    {
      id: 'fun-body-mouth', word: 'mouth', ipa: '/maʊθ/', partOfSpeech: 'noun', meaningVi: 'cái miệng',
      image: { kind: 'emoji', value: '👄' },
      examples: [
        { en: 'Open your mouth, please.', vi: 'Há miệng ra nào.' },
        { en: 'Do not talk with your mouth full.', vi: 'Đừng vừa nhai vừa nói.' },
      ],
    },
    {
      id: 'fun-body-lips', word: 'lips', ipa: '/lɪps/', partOfSpeech: 'noun', meaningVi: 'đôi môi',
      image: { kind: 'emoji', value: '💋' },
      examples: [
        { en: 'My lips are dry in winter.', vi: 'Môi tôi bị khô vào mùa đông.' },
        { en: 'She has red lips.', vi: 'Cô ấy có đôi môi đỏ.' },
      ],
      extraInfo: { vi: 'Số ít: lip.', en: 'Singular: lip.' },
    },
    {
      id: 'fun-body-tongue', word: 'tongue', ipa: '/tʌŋ/', partOfSpeech: 'noun', meaningVi: 'cái lưỡi',
      image: { kind: 'emoji', value: '👅' },
      examples: [
        { en: 'The doctor looked at my tongue.', vi: 'Bác sĩ xem lưỡi của tôi.' },
        { en: 'Do not stick your tongue out!', vi: 'Đừng lè lưỡi ra thế!' },
      ],
      extraInfo: { vi: '"Mother tongue" = tiếng mẹ đẻ.', en: '"Mother tongue" = your first language.' },
    },
    {
      id: 'fun-body-tooth', word: 'tooth', ipa: '/tuːθ/', partOfSpeech: 'noun', meaningVi: 'cái răng',
      image: { kind: 'emoji', value: '🦷' },
      examples: [
        { en: 'My little brother lost a tooth.', vi: 'Em trai tôi bị rụng một cái răng.' },
        { en: 'Brush your teeth twice a day.', vi: 'Đánh răng hai lần mỗi ngày.' },
      ],
      extraInfo: { vi: 'Số nhiều bất quy tắc: tooth → teeth.', en: 'Irregular plural: tooth → teeth.' },
    },
    {
      id: 'fun-body-hair', word: 'hair', ipa: '/heər/', partOfSpeech: 'noun', meaningVi: 'tóc',
      image: { kind: 'emoji', value: '👩‍🦱' },
      examples: [
        { en: 'She has long black hair.', vi: 'Cô ấy có mái tóc dài màu đen.' },
        { en: 'I wash my hair every day.', vi: 'Tôi gội đầu mỗi ngày.' },
      ],
      extraInfo: { vi: 'Không đếm được khi nói cả mái tóc: her hair is long (không nói "hairs").', en: 'Uncountable for all the hair on your head: "her hair is long".' },
    },
    {
      id: 'fun-body-beard', word: 'beard', ipa: '/bɪəd/', partOfSpeech: 'noun', meaningVi: 'râu (cằm)',
      image: { kind: 'emoji', value: '🧔' },
      examples: [
        { en: 'My grandfather has a white beard.', vi: 'Ông tôi có bộ râu trắng.' },
        { en: 'He shaved off his beard.', vi: 'Anh ấy đã cạo râu.' },
      ],
      extraInfo: { vi: 'Ria mép: moustache (Mỹ: mustache).', en: 'Hair above the lip: moustache (US: mustache).' },
    },
    {
      id: 'fun-body-hand', word: 'hand', ipa: '/hænd/', partOfSpeech: 'noun', meaningVi: 'bàn tay',
      image: { kind: 'emoji', value: '✋' },
      examples: [
        { en: 'Raise your hand if you know the answer.', vi: 'Giơ tay lên nếu em biết câu trả lời.' },
        { en: 'Wash your hands before eating.', vi: 'Rửa tay trước khi ăn.' },
      ],
      extraInfo: { vi: 'Giơ tay: raise your hand; bắt tay: shake hands.', en: 'Raise your hand; shake hands.' },
    },
    {
      id: 'fun-body-palm', word: 'palm', ipa: '/pɑːm/', partOfSpeech: 'noun', meaningVi: 'lòng bàn tay',
      image: { kind: 'emoji', value: '🫴' },
      examples: [
        { en: 'Put the coin in your palm.', vi: 'Đặt đồng xu vào lòng bàn tay.' },
        { en: 'My palms are sweaty.', vi: 'Lòng bàn tay tôi đổ mồ hôi.' },
      ],
      extraInfo: { vi: 'Chữ "l" câm. "Palm" cũng là cây cọ.', en: 'The "l" is silent. A "palm" is also a tree.' },
    },
    {
      id: 'fun-body-finger', word: 'finger', ipa: '/ˈfɪŋ.ɡər/', partOfSpeech: 'noun', meaningVi: 'ngón tay',
      image: { kind: 'emoji', value: '👆' },
      examples: [
        { en: 'We have ten fingers.', vi: 'Chúng ta có mười ngón tay.' },
        { en: 'I cut my finger.', vi: 'Tôi bị đứt tay.' },
      ],
      extraInfo: { vi: 'Ngón chân là "toe", không phải "finger".', en: 'On your foot they are "toes", not fingers.' },
    },
    {
      id: 'fun-body-thumb', word: 'thumb', ipa: '/θʌm/', partOfSpeech: 'noun', meaningVi: 'ngón tay cái',
      image: { kind: 'emoji', value: '👍' },
      examples: [
        { en: 'He gave me a thumbs up.', vi: 'Anh ấy giơ ngón cái khen tôi.' },
        { en: 'The baby sucks her thumb.', vi: 'Em bé mút ngón tay cái.' },
      ],
      extraInfo: { vi: 'Chữ "b" câm: /θʌm/.', en: 'The "b" is silent: /θʌm/.' },
    },
    {
      id: 'fun-body-fist', word: 'fist', ipa: '/fɪst/', partOfSpeech: 'noun', meaningVi: 'nắm tay',
      image: { kind: 'emoji', value: '✊' },
      examples: [
        { en: 'Make a fist with your hand.', vi: 'Nắm bàn tay lại.' },
        { en: 'He hit the table with his fist.', vi: 'Anh ấy đấm tay xuống bàn.' },
      ],
    },
    {
      id: 'fun-body-nail', word: 'nail', ipa: '/neɪl/', partOfSpeech: 'noun', meaningVi: 'móng tay',
      image: { kind: 'emoji', value: '💅' },
      examples: [
        { en: 'She paints her nails pink.', vi: 'Cô ấy sơn móng tay màu hồng.' },
        { en: 'Cut your nails, please.', vi: 'Con cắt móng tay đi.' },
      ],
      extraInfo: { vi: '"Nail" còn là cái đinh.', en: '"Nail" is also the small metal thing you hit with a hammer.' },
    },
    {
      id: 'fun-body-muscle', word: 'muscle', ipa: '/ˈmʌs.əl/', partOfSpeech: 'noun', meaningVi: 'cơ bắp',
      image: { kind: 'emoji', value: '💪' },
      examples: [
        { en: 'Exercise makes your muscles strong.', vi: 'Tập thể dục làm cơ bắp khỏe mạnh.' },
        { en: 'He has big arm muscles.', vi: 'Anh ấy có cơ tay to.' },
      ],
      extraInfo: { vi: 'Chữ "c" câm: /ˈmʌs.əl/.', en: 'The "c" is silent: /ˈmʌs.əl/.' },
    },
    {
      id: 'fun-body-leg', word: 'leg', ipa: '/leɡ/', partOfSpeech: 'noun', meaningVi: 'cái chân (cẳng chân)',
      image: { kind: 'emoji', value: '🦵' },
      examples: [
        { en: 'I broke my leg playing football.', vi: 'Tôi bị gãy chân khi đá bóng.' },
        { en: 'A table has four legs.', vi: 'Cái bàn có bốn chân.' },
      ],
    },
    {
      id: 'fun-body-foot', word: 'foot', ipa: '/fʊt/', partOfSpeech: 'noun', meaningVi: 'bàn chân',
      image: { kind: 'emoji', value: '🦶' },
      examples: [
        { en: 'I go to school on foot.', vi: 'Tôi đi bộ đến trường.' },
        { en: 'My feet are cold.', vi: 'Chân tôi bị lạnh.' },
      ],
      extraInfo: { vi: 'Số nhiều bất quy tắc: foot → feet. Đi bộ: on foot.', en: 'Irregular plural: foot → feet. Go on foot = walk.' },
    },
    {
      id: 'fun-body-brain', word: 'brain', ipa: '/breɪn/', partOfSpeech: 'noun', meaningVi: 'bộ não',
      image: { kind: 'emoji', value: '🧠' },
      examples: [
        { en: 'We think with our brain.', vi: 'Chúng ta suy nghĩ bằng bộ não.' },
        { en: 'Reading is good for your brain.', vi: 'Đọc sách tốt cho não bộ.' },
      ],
    },
    {
      id: 'fun-body-heart', word: 'heart', ipa: '/hɑːt/', partOfSpeech: 'noun', meaningVi: 'trái tim',
      image: { kind: 'emoji', value: '🫀' },
      examples: [
        { en: 'My heart beats fast when I run.', vi: 'Tim tôi đập nhanh khi tôi chạy.' },
        { en: 'The heart pumps blood around the body.', vi: 'Tim bơm máu đi khắp cơ thể.' },
      ],
      extraInfo: { vi: 'Học thuộc lòng: learn by heart.', en: 'Learn something by heart = memorise it.' },
    },
    {
      id: 'fun-body-lungs', word: 'lungs', ipa: '/lʌŋz/', partOfSpeech: 'noun', meaningVi: 'phổi',
      image: { kind: 'emoji', value: '🫁' },
      examples: [
        { en: 'We breathe with our lungs.', vi: 'Chúng ta thở bằng phổi.' },
        { en: 'Smoking is bad for your lungs.', vi: 'Hút thuốc có hại cho phổi.' },
      ],
      extraInfo: { vi: 'Số ít: lung.', en: 'Singular: lung.' },
    },
    {
      id: 'fun-body-bone', word: 'bone', ipa: '/bəʊn/', partOfSpeech: 'noun', meaningVi: 'xương',
      image: { kind: 'emoji', value: '🦴' },
      examples: [
        { en: 'Milk is good for your bones.', vi: 'Sữa tốt cho xương.' },
        { en: 'The dog is eating a bone.', vi: 'Con chó đang gặm khúc xương.' },
      ],
    },
    {
      id: 'fun-body-skull', word: 'skull', ipa: '/skʌl/', partOfSpeech: 'noun', meaningVi: 'hộp sọ',
      image: { kind: 'emoji', value: '💀' },
      examples: [
        { en: 'The skull protects the brain.', vi: 'Hộp sọ bảo vệ bộ não.' },
        { en: 'We saw a dinosaur skull at the museum.', vi: 'Chúng tôi thấy một hộp sọ khủng long ở bảo tàng.' },
      ],
    },
    {
      id: 'fun-body-blood', word: 'blood', ipa: '/blʌd/', partOfSpeech: 'noun', meaningVi: 'máu',
      image: { kind: 'emoji', value: '🩸' },
      examples: [
        { en: 'Blood is red.', vi: 'Máu có màu đỏ.' },
        { en: 'My dad gives blood every year.', vi: 'Bố tôi hiến máu mỗi năm.' },
      ],
      extraInfo: { vi: 'Đọc /blʌd/ (âm "ơ" ngắn), không đọc "bluːd".', en: 'Pronounced /blʌd/, rhyming with "mud", not with "food".' },
    },
  ],
}
