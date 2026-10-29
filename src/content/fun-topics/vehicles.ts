// Chủ đề Học vui: Phương tiện giao thông — xe cộ trên đường, tàu, thuyền, máy bay.
import type { FunTopic } from '../content-types'

export const vehiclesTopic: FunTopic = {
  id: 'vehicles',
  title: { vi: 'Phương tiện giao thông', en: 'Vehicles' },
  icon: '🚗',
  group: { vi: 'Đời sống', en: 'Daily life' },
  cards: [
    {
      id: 'fun-vehicles-car', word: 'car', ipa: '/kɑːr/', partOfSpeech: 'noun', meaningVi: 'ô tô, xe hơi',
      image: { kind: 'emoji', value: '🚗' },
      examples: [
        { en: 'My dad drives a blue car.', vi: 'Bố tôi lái một chiếc ô tô màu xanh.' },
        { en: 'We go to the beach by car.', vi: 'Chúng tôi đi biển bằng ô tô.' },
      ],
      extraInfo: { vi: 'Đi bằng xe: by car; lái xe: drive a car.', en: 'Collocations: go by car, drive a car.' },
    },
    {
      id: 'fun-vehicles-bus', word: 'bus', ipa: '/bʌs/', partOfSpeech: 'noun', meaningVi: 'xe buýt',
      image: { kind: 'emoji', value: '🚌' },
      examples: [
        { en: 'I take the bus to school.', vi: 'Tôi đi xe buýt đến trường.' },
        { en: 'The bus is late today.', vi: 'Hôm nay xe buýt đến muộn.' },
      ],
      extraInfo: { vi: 'Số nhiều: buses. Lên/xuống xe: get on/get off the bus.', en: 'Plural: buses. Get on / get off the bus.' },
    },
    {
      id: 'fun-vehicles-taxi', word: 'taxi', ipa: '/ˈtæk.si/', partOfSpeech: 'noun', meaningVi: 'xe taxi',
      image: { kind: 'emoji', value: '🚕' },
      examples: [
        { en: "Let's take a taxi to the airport.", vi: 'Mình đi taxi ra sân bay nhé.' },
        { en: 'The taxi is waiting outside.', vi: 'Taxi đang đợi bên ngoài.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ còn gọi là "cab".', en: 'US English also says "cab".' },
    },
    {
      id: 'fun-vehicles-motorbike', word: 'motorbike', ipa: '/ˈməʊ.tə.baɪk/', partOfSpeech: 'noun', meaningVi: 'xe máy, mô tô',
      image: { kind: 'emoji', value: '🏍️' },
      examples: [
        { en: 'There are many motorbikes in Hanoi.', vi: 'Ở Hà Nội có rất nhiều xe máy.' },
        { en: 'My uncle rides a motorbike to work.', vi: 'Chú tôi đi xe máy đi làm.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ hay nói "motorcycle". Đi xe máy: ride a motorbike.', en: 'US often says "motorcycle". Collocation: ride a motorbike.' },
    },
    {
      id: 'fun-vehicles-scooter', word: 'scooter', ipa: '/ˈskuː.tər/', partOfSpeech: 'noun', meaningVi: 'xe tay ga',
      image: { kind: 'emoji', value: '🛵' },
      examples: [
        { en: 'My mum rides a red scooter.', vi: 'Mẹ tôi đi một chiếc xe tay ga màu đỏ.' },
        { en: 'A scooter is easy to park.', vi: 'Xe tay ga rất dễ đỗ.' },
      ],
      extraInfo: { vi: '"Scooter" cũng có thể là xe trượt đẩy chân của trẻ em.', en: '"Scooter" can also mean a child\'s kick scooter.' },
    },
    {
      id: 'fun-vehicles-bicycle', word: 'bicycle', ipa: '/ˈbaɪ.sɪ.kəl/', partOfSpeech: 'noun', meaningVi: 'xe đạp',
      image: { kind: 'emoji', value: '🚲' },
      examples: [
        { en: 'I ride my bicycle in the park.', vi: 'Tôi đạp xe trong công viên.' },
        { en: 'Can you ride a bicycle?', vi: 'Bạn có biết đi xe đạp không?' },
      ],
      extraInfo: { vi: 'Thường nói ngắn: bike.', en: 'Often shortened to "bike".' },
    },
    {
      id: 'fun-vehicles-lorry', word: 'lorry', ipa: '/ˈlɒr.i/', partOfSpeech: 'noun', meaningVi: 'xe tải',
      image: { kind: 'emoji', value: '🚚' },
      examples: [
        { en: 'The lorry is carrying boxes.', vi: 'Chiếc xe tải đang chở những cái thùng.' },
        { en: 'A big lorry is on the road.', vi: 'Có một chiếc xe tải lớn trên đường.' },
      ],
      extraInfo: { vi: 'Anh-Anh: lorry; Anh-Mỹ: truck.', en: 'UK: lorry; US: truck.' },
    },
    {
      id: 'fun-vehicles-van', word: 'van', ipa: '/væn/', partOfSpeech: 'noun', meaningVi: 'xe tải nhỏ, xe van',
      image: { kind: 'emoji', value: '🚐' },
      examples: [
        { en: 'The van brings our new sofa.', vi: 'Chiếc xe van chở ghế sofa mới cho chúng tôi.' },
        { en: 'Ten people can sit in this van.', vi: 'Chiếc xe này chở được mười người.' },
      ],
    },
    {
      id: 'fun-vehicles-ambulance', word: 'ambulance', ipa: '/ˈæm.bjə.ləns/', partOfSpeech: 'noun', meaningVi: 'xe cứu thương',
      image: { kind: 'emoji', value: '🚑' },
      examples: [
        { en: 'Call an ambulance, please!', vi: 'Làm ơn gọi xe cứu thương!' },
        { en: 'The ambulance goes to the hospital.', vi: 'Xe cứu thương đi đến bệnh viện.' },
      ],
    },
    {
      id: 'fun-vehicles-fire-engine', word: 'fire engine', ipa: '/ˈfaɪər ˌen.dʒɪn/', partOfSpeech: 'noun', meaningVi: 'xe cứu hỏa',
      image: { kind: 'emoji', value: '🚒' },
      examples: [
        { en: 'The fire engine is red.', vi: 'Xe cứu hỏa có màu đỏ.' },
        { en: 'A fire engine went past our house.', vi: 'Một chiếc xe cứu hỏa chạy qua nhà chúng tôi.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ: fire truck.', en: 'US: fire truck.' },
    },
    {
      id: 'fun-vehicles-police-car', word: 'police car', ipa: '/pəˈliːs ˌkɑːr/', partOfSpeech: 'noun', meaningVi: 'xe cảnh sát',
      image: { kind: 'emoji', value: '🚓' },
      examples: [
        { en: 'A police car stopped in front of the bank.', vi: 'Một chiếc xe cảnh sát dừng trước ngân hàng.' },
        { en: 'The police car has a loud siren.', vi: 'Xe cảnh sát có còi hú rất to.' },
      ],
    },
    {
      id: 'fun-vehicles-racing-car', word: 'racing car', ipa: '/ˈreɪ.sɪŋ ˌkɑːr/', partOfSpeech: 'noun', meaningVi: 'xe đua',
      image: { kind: 'emoji', value: '🏎️' },
      examples: [
        { en: 'Racing cars are very fast.', vi: 'Xe đua chạy rất nhanh.' },
        { en: 'My son has a toy racing car.', vi: 'Con trai tôi có một chiếc xe đua đồ chơi.' },
      ],
      extraInfo: { vi: 'Anh-Mỹ: race car.', en: 'US: race car.' },
    },
    {
      id: 'fun-vehicles-tractor', word: 'tractor', ipa: '/ˈtræk.tər/', partOfSpeech: 'noun', meaningVi: 'máy kéo',
      image: { kind: 'emoji', value: '🚜' },
      examples: [
        { en: 'The farmer drives a tractor.', vi: 'Người nông dân lái máy kéo.' },
        { en: 'The tractor is working in the field.', vi: 'Máy kéo đang làm việc ngoài đồng.' },
      ],
    },
    {
      id: 'fun-vehicles-train', word: 'train', ipa: '/treɪn/', partOfSpeech: 'noun', meaningVi: 'tàu hỏa',
      image: { kind: 'emoji', value: '🚆' },
      examples: [
        { en: 'We went to Hue by train.', vi: 'Chúng tôi đi Huế bằng tàu hỏa.' },
        { en: 'The train leaves at eight o\'clock.', vi: 'Tàu khởi hành lúc tám giờ.' },
      ],
      extraInfo: { vi: 'Bắt tàu: catch a train; lỡ tàu: miss a train.', en: 'Collocations: catch a train, miss a train.' },
    },
    {
      id: 'fun-vehicles-high-speed-train', word: 'high-speed train', ipa: '/ˌhaɪ.spiːd ˈtreɪn/', partOfSpeech: 'noun', meaningVi: 'tàu cao tốc',
      image: { kind: 'emoji', value: '🚄' },
      examples: [
        { en: 'The high-speed train is very quick.', vi: 'Tàu cao tốc đi rất nhanh.' },
        { en: 'Japan has many high-speed trains.', vi: 'Nhật Bản có nhiều tàu cao tốc.' },
      ],
    },
    {
      id: 'fun-vehicles-tram', word: 'tram', ipa: '/træm/', partOfSpeech: 'noun', meaningVi: 'tàu điện (chạy trên đường phố)',
      image: { kind: 'emoji', value: '🚊' },
      examples: [
        { en: 'You can take a tram into the city.', vi: 'Bạn có thể đi tàu điện vào thành phố.' },
        { en: 'The tram stops here.', vi: 'Tàu điện dừng ở đây.' },
      ],
    },
    {
      id: 'fun-vehicles-metro', word: 'metro', ipa: '/ˈmet.rəʊ/', partOfSpeech: 'noun', meaningVi: 'tàu điện ngầm, metro',
      image: { kind: 'emoji', value: '🚇' },
      examples: [
        { en: 'I go to work by metro.', vi: 'Tôi đi làm bằng tàu metro.' },
        { en: 'The metro is fast and cheap.', vi: 'Tàu metro nhanh và rẻ.' },
      ],
      extraInfo: { vi: 'Ở London gọi là "the Underground" hoặc "the Tube"; ở Mỹ: subway.', en: 'In London: "the Underground" or "the Tube"; in the US: subway.' },
    },
    {
      id: 'fun-vehicles-plane', word: 'plane', ipa: '/pleɪn/', partOfSpeech: 'noun', meaningVi: 'máy bay',
      image: { kind: 'emoji', value: '✈️' },
      examples: [
        { en: 'We flew to Da Nang by plane.', vi: 'Chúng tôi bay đến Đà Nẵng bằng máy bay.' },
        { en: 'The plane is landing now.', vi: 'Máy bay đang hạ cánh.' },
      ],
      extraInfo: { vi: 'Anh-Anh đầy đủ: aeroplane; Anh-Mỹ: airplane.', en: 'Full form UK: aeroplane; US: airplane.' },
    },
    {
      id: 'fun-vehicles-helicopter', word: 'helicopter', ipa: '/ˈhel.ɪˌkɒp.tər/', partOfSpeech: 'noun', meaningVi: 'trực thăng',
      image: { kind: 'emoji', value: '🚁' },
      examples: [
        { en: 'A helicopter is flying over the city.', vi: 'Một chiếc trực thăng đang bay trên thành phố.' },
        { en: 'The helicopter is very noisy.', vi: 'Trực thăng rất ồn.' },
      ],
    },
    {
      id: 'fun-vehicles-rocket', word: 'rocket', ipa: '/ˈrɒk.ɪt/', partOfSpeech: 'noun', meaningVi: 'tên lửa',
      image: { kind: 'emoji', value: '🚀' },
      examples: [
        { en: 'The rocket is going to the moon.', vi: 'Tên lửa đang bay lên mặt trăng.' },
        { en: 'I want to fly in a rocket one day.', vi: 'Một ngày nào đó tôi muốn bay trên tên lửa.' },
      ],
    },
    {
      id: 'fun-vehicles-boat', word: 'boat', ipa: '/bəʊt/', partOfSpeech: 'noun', meaningVi: 'thuyền',
      image: { kind: 'emoji', value: '⛵' },
      examples: [
        { en: 'We took a boat in Ha Long Bay.', vi: 'Chúng tôi đi thuyền ở vịnh Hạ Long.' },
        { en: 'The boat is on the lake.', vi: 'Chiếc thuyền ở trên hồ.' },
      ],
      extraInfo: { vi: 'Thuyền buồm: sailing boat (Mỹ: sailboat).', en: 'This one is a sailing boat (US: sailboat).' },
    },
    {
      id: 'fun-vehicles-speedboat', word: 'speedboat', ipa: '/ˈspiːd.bəʊt/', partOfSpeech: 'noun', meaningVi: 'ca nô, xuồng máy',
      image: { kind: 'emoji', value: '🚤' },
      examples: [
        { en: 'The speedboat goes very fast.', vi: 'Chiếc ca nô chạy rất nhanh.' },
        { en: 'We went to the island by speedboat.', vi: 'Chúng tôi ra đảo bằng ca nô.' },
      ],
    },
    {
      id: 'fun-vehicles-ship', word: 'ship', ipa: '/ʃɪp/', partOfSpeech: 'noun', meaningVi: 'tàu thủy',
      image: { kind: 'emoji', value: '🚢' },
      examples: [
        { en: 'A big ship is in the port.', vi: 'Một con tàu lớn đang ở cảng.' },
        { en: 'The ship carries many people.', vi: 'Con tàu chở rất nhiều người.' },
      ],
      extraInfo: { vi: '"Ship" lớn hơn "boat".', en: 'A ship is bigger than a boat.' },
    },
    {
      id: 'fun-vehicles-canoe', word: 'canoe', ipa: '/kəˈnuː/', partOfSpeech: 'noun', meaningVi: 'xuồng, ca nô chèo tay',
      image: { kind: 'emoji', value: '🛶' },
      examples: [
        { en: 'We paddled a canoe on the river.', vi: 'Chúng tôi chèo xuồng trên sông.' },
        { en: 'Two people can sit in this canoe.', vi: 'Chiếc xuồng này ngồi được hai người.' },
      ],
    },
    {
      id: 'fun-vehicles-cable-car', word: 'cable car', ipa: '/ˈkeɪ.bəl ˌkɑːr/', partOfSpeech: 'noun', meaningVi: 'cáp treo',
      image: { kind: 'emoji', value: '🚡' },
      examples: [
        { en: 'We took the cable car up the mountain.', vi: 'Chúng tôi đi cáp treo lên núi.' },
        { en: 'The view from the cable car is beautiful.', vi: 'Cảnh nhìn từ cáp treo rất đẹp.' },
      ],
    },
    {
      id: 'fun-vehicles-skateboard', word: 'skateboard', ipa: '/ˈskeɪt.bɔːd/', partOfSpeech: 'noun', meaningVi: 'ván trượt',
      image: { kind: 'emoji', value: '🛹' },
      examples: [
        { en: 'He rides his skateboard in the park.', vi: 'Cậu ấy trượt ván trong công viên.' },
        { en: 'I want a new skateboard.', vi: 'Tôi muốn một chiếc ván trượt mới.' },
      ],
    },
  ],
}
