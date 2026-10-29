// Chủ đề Học vui: Nghề nghiệp — tên các công việc quen thuộc và người làm nghề đó.
import type { FunTopic } from '../content-types'

export const jobsTopic: FunTopic = {
  id: 'jobs',
  title: { vi: 'Nghề nghiệp', en: 'Jobs' },
  icon: '👩‍⚕️',
  group: { vi: 'Con người', en: 'People' },
  cards: [
    {
      id: 'fun-jobs-doctor', word: 'doctor', ipa: '/ˈdɒk.tər/', partOfSpeech: 'noun', meaningVi: 'bác sĩ',
      image: { kind: 'emoji', value: '🧑‍⚕️' },
      examples: [
        { en: 'The doctor works at the hospital.', vi: 'Bác sĩ làm việc ở bệnh viện.' },
        { en: 'I am ill, so I need to see a doctor.', vi: 'Tôi bị ốm nên cần đi khám bác sĩ.' },
      ],
      extraInfo: { vi: 'Đi khám bác sĩ: see a doctor / go to the doctor\'s.', en: 'Collocation: see a doctor / go to the doctor\'s.' },
    },
    {
      id: 'fun-jobs-nurse', word: 'nurse', ipa: '/nɜːs/', partOfSpeech: 'noun', meaningVi: 'y tá',
      image: { kind: 'emoji', value: '👩‍⚕️' },
      examples: [
        { en: 'The nurse is very kind.', vi: 'Cô y tá rất tốt bụng.' },
        { en: 'My aunt is a nurse.', vi: 'Dì tôi là y tá.' },
      ],
    },
    {
      id: 'fun-jobs-teacher', word: 'teacher', ipa: '/ˈtiː.tʃər/', partOfSpeech: 'noun', meaningVi: 'giáo viên',
      image: { kind: 'emoji', value: '🧑‍🏫' },
      examples: [
        { en: 'My English teacher is very funny.', vi: 'Cô giáo tiếng Anh của tôi rất vui tính.' },
        { en: 'The teacher writes on the board.', vi: 'Giáo viên viết lên bảng.' },
      ],
      extraInfo: { vi: 'Đuôi "-er" thường chỉ người làm việc: teach → teacher.', en: '"-er" often means a person who does something: teach → teacher.' },
    },
    {
      id: 'fun-jobs-farmer', word: 'farmer', ipa: '/ˈfɑː.mər/', partOfSpeech: 'noun', meaningVi: 'nông dân',
      image: { kind: 'emoji', value: '🧑‍🌾' },
      examples: [
        { en: 'The farmer grows rice.', vi: 'Người nông dân trồng lúa.' },
        { en: 'Farmers get up very early.', vi: 'Nông dân dậy rất sớm.' },
      ],
    },
    {
      id: 'fun-jobs-chef', word: 'chef', ipa: '/ʃef/', partOfSpeech: 'noun', meaningVi: 'đầu bếp',
      image: { kind: 'emoji', value: '🧑‍🍳' },
      examples: [
        { en: 'The chef cooks delicious food.', vi: 'Đầu bếp nấu những món ăn ngon.' },
        { en: 'I want to be a chef.', vi: 'Tôi muốn trở thành đầu bếp.' },
      ],
      extraInfo: { vi: 'Đọc /ʃef/ (âm "sh"). "Cook" cũng là người nấu ăn.', en: 'Pronounced with "sh". "Cook" also means a person who cooks.' },
    },
    {
      id: 'fun-jobs-police-officer', word: 'police officer', ipa: '/pəˈliːs ˌɒf.ɪ.sər/', partOfSpeech: 'noun', meaningVi: 'cảnh sát',
      image: { kind: 'emoji', value: '👮' },
      examples: [
        { en: 'The police officer helps people.', vi: 'Người cảnh sát giúp đỡ mọi người.' },
        { en: 'Ask a police officer for directions.', vi: 'Hãy hỏi đường một chú cảnh sát.' },
      ],
      extraInfo: { vi: 'Từ trung tính cho cả nam và nữ (thay cho policeman/policewoman).', en: 'A neutral word for both men and women.' },
    },
    {
      id: 'fun-jobs-firefighter', word: 'firefighter', ipa: '/ˈfaɪəˌfaɪ.tər/', partOfSpeech: 'noun', meaningVi: 'lính cứu hỏa',
      image: { kind: 'emoji', value: '🧑‍🚒' },
      examples: [
        { en: 'The firefighters put out the fire.', vi: 'Lính cứu hỏa dập tắt đám cháy.' },
        { en: 'Firefighters are very brave.', vi: 'Lính cứu hỏa rất dũng cảm.' },
      ],
      extraInfo: { vi: 'Dập lửa: put out a fire.', en: 'Collocation: put out a fire.' },
    },
    {
      id: 'fun-jobs-pilot', word: 'pilot', ipa: '/ˈpaɪ.lət/', partOfSpeech: 'noun', meaningVi: 'phi công',
      image: { kind: 'emoji', value: '🧑‍✈️' },
      examples: [
        { en: 'The pilot flies the plane.', vi: 'Phi công lái máy bay.' },
        { en: 'My cousin wants to be a pilot.', vi: 'Em họ tôi muốn làm phi công.' },
      ],
    },
    {
      id: 'fun-jobs-astronaut', word: 'astronaut', ipa: '/ˈæs.trə.nɔːt/', partOfSpeech: 'noun', meaningVi: 'phi hành gia',
      image: { kind: 'emoji', value: '🧑‍🚀' },
      examples: [
        { en: 'Astronauts travel into space.', vi: 'Phi hành gia bay vào vũ trụ.' },
        { en: 'The astronaut is walking on the moon.', vi: 'Phi hành gia đang đi bộ trên mặt trăng.' },
      ],
    },
    {
      id: 'fun-jobs-scientist', word: 'scientist', ipa: '/ˈsaɪən.tɪst/', partOfSpeech: 'noun', meaningVi: 'nhà khoa học',
      image: { kind: 'emoji', value: '🧑‍🔬' },
      examples: [
        { en: 'The scientist works in a lab.', vi: 'Nhà khoa học làm việc trong phòng thí nghiệm.' },
        { en: 'Scientists study the world around us.', vi: 'Các nhà khoa học nghiên cứu thế giới quanh ta.' },
      ],
      extraInfo: { vi: 'Từ gốc: science (khoa học).', en: 'Root word: science.' },
    },
    {
      id: 'fun-jobs-mechanic', word: 'mechanic', ipa: '/məˈkæn.ɪk/', partOfSpeech: 'noun', meaningVi: 'thợ máy, thợ sửa xe',
      image: { kind: 'emoji', value: '🧑‍🔧' },
      examples: [
        { en: 'The mechanic is fixing our car.', vi: 'Thợ máy đang sửa xe của chúng tôi.' },
        { en: 'My uncle is a good mechanic.', vi: 'Chú tôi là một thợ sửa xe giỏi.' },
      ],
    },
    {
      id: 'fun-jobs-factory-worker', word: 'factory worker', ipa: '/ˈfæk.tər.i ˌwɜː.kər/', partOfSpeech: 'noun', meaningVi: 'công nhân nhà máy',
      image: { kind: 'emoji', value: '🧑‍🏭' },
      examples: [
        { en: 'My mother is a factory worker.', vi: 'Mẹ tôi là công nhân nhà máy.' },
        { en: 'The factory workers make shoes.', vi: 'Công nhân nhà máy làm giày.' },
      ],
    },
    {
      id: 'fun-jobs-office-worker', word: 'office worker', ipa: '/ˈɒf.ɪs ˌwɜː.kər/', partOfSpeech: 'noun', meaningVi: 'nhân viên văn phòng',
      image: { kind: 'emoji', value: '🧑‍💼' },
      examples: [
        { en: 'Office workers often use computers.', vi: 'Nhân viên văn phòng thường dùng máy tính.' },
        { en: 'My dad is an office worker.', vi: 'Bố tôi là nhân viên văn phòng.' },
      ],
    },
    {
      id: 'fun-jobs-programmer', word: 'programmer', ipa: '/ˈprəʊ.ɡræm.ər/', partOfSpeech: 'noun', meaningVi: 'lập trình viên',
      image: { kind: 'emoji', value: '🧑‍💻' },
      examples: [
        { en: 'The programmer writes code for apps.', vi: 'Lập trình viên viết mã cho ứng dụng.' },
        { en: 'My brother is a programmer.', vi: 'Anh trai tôi là lập trình viên.' },
      ],
      extraInfo: { vi: 'Còn gọi: software developer.', en: 'Also called a "software developer".' },
    },
    {
      id: 'fun-jobs-singer', word: 'singer', ipa: '/ˈsɪŋ.ər/', partOfSpeech: 'noun', meaningVi: 'ca sĩ',
      image: { kind: 'emoji', value: '🧑‍🎤' },
      examples: [
        { en: 'She is a famous singer.', vi: 'Cô ấy là một ca sĩ nổi tiếng.' },
        { en: 'The singer has a beautiful voice.', vi: 'Ca sĩ có giọng hát hay.' },
      ],
      extraInfo: { vi: 'Không đọc âm /ɡ/: /ˈsɪŋ.ər/.', en: 'No /ɡ/ sound: /ˈsɪŋ.ər/.' },
    },
    {
      id: 'fun-jobs-musician', word: 'musician', ipa: '/mjuːˈzɪʃ.ən/', partOfSpeech: 'noun', meaningVi: 'nhạc sĩ, nhạc công',
      image: { kind: 'emoji', value: '🎸' },
      examples: [
        { en: 'The musician plays the guitar.', vi: 'Nhạc công chơi đàn ghi-ta.' },
        { en: 'He wants to be a musician.', vi: 'Cậu ấy muốn trở thành nhạc sĩ.' },
      ],
    },
    {
      id: 'fun-jobs-artist', word: 'artist', ipa: '/ˈɑː.tɪst/', partOfSpeech: 'noun', meaningVi: 'họa sĩ, nghệ sĩ',
      image: { kind: 'emoji', value: '🧑‍🎨' },
      examples: [
        { en: 'The artist paints pictures of the sea.', vi: 'Họa sĩ vẽ tranh về biển.' },
        { en: 'My daughter wants to be an artist.', vi: 'Con gái tôi muốn trở thành họa sĩ.' },
      ],
    },
    {
      id: 'fun-jobs-judge', word: 'judge', ipa: '/dʒʌdʒ/', partOfSpeech: 'noun', meaningVi: 'thẩm phán',
      image: { kind: 'emoji', value: '🧑‍⚖️' },
      examples: [
        { en: 'The judge works in a court.', vi: 'Thẩm phán làm việc ở tòa án.' },
        { en: 'The judge listens carefully.', vi: 'Thẩm phán lắng nghe cẩn thận.' },
      ],
      extraInfo: { vi: '"Judge" còn là giám khảo cuộc thi, hoặc động từ "đánh giá".', en: '"Judge" can also mean a competition judge, or the verb "to judge".' },
    },
    {
      id: 'fun-jobs-builder', word: 'builder', ipa: '/ˈbɪl.dər/', partOfSpeech: 'noun', meaningVi: 'thợ xây',
      image: { kind: 'emoji', value: '👷' },
      examples: [
        { en: 'The builders are making a new house.', vi: 'Những người thợ xây đang xây một ngôi nhà mới.' },
        { en: 'A builder wears a hard hat.', vi: 'Thợ xây đội mũ bảo hộ.' },
      ],
      extraInfo: { vi: 'Còn gọi: construction worker.', en: 'Also called a "construction worker".' },
    },
    {
      id: 'fun-jobs-guard', word: 'guard', ipa: '/ɡɑːd/', partOfSpeech: 'noun', meaningVi: 'lính gác, bảo vệ',
      image: { kind: 'emoji', value: '💂' },
      examples: [
        { en: 'The guard stands at the gate.', vi: 'Người lính gác đứng ở cổng.' },
        { en: 'There is a security guard at the bank.', vi: 'Có một nhân viên bảo vệ ở ngân hàng.' },
      ],
      extraInfo: { vi: 'Chữ "u" câm. Bảo vệ tòa nhà: security guard.', en: 'The "u" is silent. A building guard is a "security guard".' },
    },
    {
      id: 'fun-jobs-detective', word: 'detective', ipa: '/dɪˈtek.tɪv/', partOfSpeech: 'noun', meaningVi: 'thám tử',
      image: { kind: 'emoji', value: '🕵️' },
      examples: [
        { en: 'The detective is looking for clues.', vi: 'Thám tử đang tìm manh mối.' },
        { en: 'I love detective stories.', vi: 'Tôi thích truyện trinh thám.' },
      ],
    },
    {
      id: 'fun-jobs-dancer', word: 'dancer', ipa: '/ˈdɑːn.sər/', partOfSpeech: 'noun', meaningVi: 'vũ công',
      image: { kind: 'emoji', value: '💃' },
      examples: [
        { en: 'The dancer moves beautifully.', vi: 'Vũ công múa rất đẹp.' },
        { en: 'She is a ballet dancer.', vi: 'Cô ấy là vũ công ba lê.' },
      ],
    },
    {
      id: 'fun-jobs-hairdresser', word: 'hairdresser', ipa: '/ˈheəˌdres.ər/', partOfSpeech: 'noun', meaningVi: 'thợ làm tóc',
      image: { kind: 'emoji', value: '💇' },
      examples: [
        { en: 'The hairdresser cuts my hair.', vi: 'Thợ làm tóc cắt tóc cho tôi.' },
        { en: 'I go to the hairdresser every month.', vi: 'Tháng nào tôi cũng đi làm tóc.' },
      ],
      extraInfo: { vi: 'Thợ cắt tóc nam thường gọi là "barber".', en: 'A men\'s hairdresser is often called a "barber".' },
    },
    {
      id: 'fun-jobs-footballer', word: 'footballer', ipa: '/ˈfʊt.bɔː.lər/', partOfSpeech: 'noun', meaningVi: 'cầu thủ bóng đá',
      image: { kind: 'emoji', value: '⚽' },
      examples: [
        { en: 'He is a famous footballer.', vi: 'Anh ấy là một cầu thủ bóng đá nổi tiếng.' },
        { en: 'My son wants to be a footballer.', vi: 'Con trai tôi muốn làm cầu thủ bóng đá.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ thường nói "soccer player".', en: 'US English: "soccer player".' },
    },
    {
      id: 'fun-jobs-photographer', word: 'photographer', ipa: '/fəˈtɒɡ.rə.fər/', partOfSpeech: 'noun', meaningVi: 'thợ chụp ảnh, nhiếp ảnh gia',
      image: { kind: 'emoji', value: '📷' },
      examples: [
        { en: 'The photographer takes photos at the wedding.', vi: 'Thợ ảnh chụp ảnh ở đám cưới.' },
        { en: 'She is a good photographer.', vi: 'Cô ấy là một nhiếp ảnh gia giỏi.' },
      ],
      extraInfo: { vi: 'Chú ý trọng âm: PHOto nhưng phoTOgrapher.', en: 'Stress changes: PHOto but phoTOgrapher.' },
    },
    {
      id: 'fun-jobs-writer', word: 'writer', ipa: '/ˈraɪ.tər/', partOfSpeech: 'noun', meaningVi: 'nhà văn',
      image: { kind: 'emoji', value: '✍️' },
      examples: [
        { en: 'The writer is writing a new book.', vi: 'Nhà văn đang viết một cuốn sách mới.' },
        { en: 'I want to be a writer.', vi: 'Tôi muốn trở thành nhà văn.' },
      ],
      extraInfo: { vi: 'Chữ "w" câm.', en: 'The "w" is silent.' },
    },
    {
      id: 'fun-jobs-baker', word: 'baker', ipa: '/ˈbeɪ.kər/', partOfSpeech: 'noun', meaningVi: 'thợ làm bánh',
      image: { kind: 'emoji', value: '🥐' },
      examples: [
        { en: 'The baker makes fresh bread every morning.', vi: 'Thợ làm bánh làm bánh mì tươi mỗi sáng.' },
        { en: 'We buy cakes from the baker.', vi: 'Chúng tôi mua bánh ngọt ở tiệm bánh.' },
      ],
      extraInfo: { vi: 'Tiệm bánh: bakery hoặc the baker\'s.', en: 'The shop: a bakery or the baker\'s.' },
    },
    {
      id: 'fun-jobs-fisherman', word: 'fisherman', ipa: '/ˈfɪʃ.ə.mən/', partOfSpeech: 'noun', meaningVi: 'ngư dân',
      image: { kind: 'emoji', value: '🎣' },
      examples: [
        { en: 'The fisherman goes out to sea every day.', vi: 'Người ngư dân ra khơi mỗi ngày.' },
        { en: 'The fisherman caught a big fish.', vi: 'Ngư dân bắt được một con cá to.' },
      ],
      extraInfo: { vi: 'Số nhiều: fishermen.', en: 'Plural: fishermen.' },
    },
    {
      id: 'fun-jobs-taxi-driver', word: 'taxi driver', ipa: '/ˈtæk.si ˌdraɪ.vər/', partOfSpeech: 'noun', meaningVi: 'tài xế taxi',
      image: { kind: 'emoji', value: '🚖' },
      examples: [
        { en: 'The taxi driver knows every street.', vi: 'Tài xế taxi biết mọi con phố.' },
        { en: 'My uncle is a taxi driver.', vi: 'Chú tôi là tài xế taxi.' },
      ],
    },
    {
      id: 'fun-jobs-magician', word: 'magician', ipa: '/məˈdʒɪʃ.ən/', partOfSpeech: 'noun', meaningVi: 'ảo thuật gia',
      image: { kind: 'emoji', value: '🎩' },
      examples: [
        { en: 'The magician pulled a rabbit out of his hat.', vi: 'Ảo thuật gia lôi một con thỏ ra khỏi mũ.' },
        { en: 'The children love the magician.', vi: 'Bọn trẻ rất thích ảo thuật gia.' },
      ],
    },
    {
      id: 'fun-jobs-clown', word: 'clown', ipa: '/klaʊn/', partOfSpeech: 'noun', meaningVi: 'chú hề',
      image: { kind: 'emoji', value: '🤡' },
      examples: [
        { en: 'The clown has a red nose.', vi: 'Chú hề có cái mũi đỏ.' },
        { en: 'We saw a funny clown at the circus.', vi: 'Chúng tôi thấy một chú hề vui nhộn ở rạp xiếc.' },
      ],
    },
  ],
}
