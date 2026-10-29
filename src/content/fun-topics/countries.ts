/**
 * CHỦ ĐỀ HỌC VUI: QUỐC GIA & LÁ CỜ
 * ---------------------------------------------------------------------------
 * Bộ thẻ gồm tất cả 193 nước thành viên Liên Hợp Quốc, cộng thêm Thành Vatican,
 * Palestine, Đài Loan và Kosovo (tổng 197 thẻ).
 * Thứ tự: Đông Nam Á (Việt Nam đứng đầu) → phần còn lại của châu Á → châu Âu
 * → châu Mỹ → châu Phi → châu Đại Dương.
 *
 * Mỗi thẻ có: tên tiếng Anh + phiên âm IPA (giọng Anh), tên tiếng Việt,
 * lá cờ thật (mã ISO 3166-1 alpha-2 viết thường), thủ đô, quốc tịch (tính từ),
 * 2 câu ví dụ có dịch và một điều thú vị song ngữ.
 * Trường `capital` và `nationality` được dùng để tạo câu hỏi trong phần thi đấu.
 */
import type { FunTopic } from '../content-types'

export const countriesTopic: FunTopic = {
  id: 'countries',
  title: { vi: 'Quốc gia & lá cờ', en: 'Countries & flags' },
  icon: '🌍',
  group: { vi: 'Thế giới', en: 'World' },
  cards: [
    /* ===================== ĐÔNG NAM Á (Việt Nam đứng đầu) ===================== */
    {
      id: 'fun-country-vn', word: 'Vietnam', ipa: '/ˌvjetˈnæm/', partOfSpeech: 'noun', meaningVi: 'Việt Nam',
      image: { kind: 'flag', countryCode: 'vn' }, capital: 'Hanoi', nationality: 'Vietnamese',
      examples: [
        { en: 'I was born in Vietnam.', vi: 'Tôi sinh ra ở Việt Nam.' },
        { en: 'Vietnamese food is famous all over the world.', vi: 'Món ăn Việt Nam nổi tiếng khắp thế giới.' },
      ],
      extraInfo: { vi: 'Thủ đô: Hà Nội. Nổi tiếng với phở và Vịnh Hạ Long.', en: 'Capital: Hanoi. Famous for pho and Ha Long Bay.' },
    },
    {
      id: 'fun-country-la', word: 'Laos', ipa: '/laʊs/', partOfSpeech: 'noun', meaningVi: 'Lào',
      image: { kind: 'flag', countryCode: 'la' }, capital: 'Vientiane', nationality: 'Lao',
      examples: [
        { en: 'Laos is a neighbour of Vietnam.', vi: 'Lào là nước láng giềng của Việt Nam.' },
        { en: 'The capital of Laos is Vientiane.', vi: 'Thủ đô của Lào là Viêng Chăn.' },
      ],
      extraInfo: { vi: 'Thủ đô: Viêng Chăn. Là nước duy nhất ở Đông Nam Á không giáp biển.', en: 'Capital: Vientiane. The only landlocked country in Southeast Asia.' },
    },
    {
      id: 'fun-country-kh', word: 'Cambodia', ipa: '/kæmˈbəʊ.di.ə/', partOfSpeech: 'noun', meaningVi: 'Campuchia',
      image: { kind: 'flag', countryCode: 'kh' }, capital: 'Phnom Penh', nationality: 'Cambodian',
      examples: [
        { en: 'Cambodia is famous for Angkor Wat.', vi: 'Campuchia nổi tiếng với Angkor Wat.' },
        { en: 'My friend is Cambodian.', vi: 'Bạn tôi là người Campuchia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Phnôm Pênh. Đền Angkor Wat xuất hiện trên lá cờ.', en: 'Capital: Phnom Penh. Angkor Wat appears on its flag.' },
    },
    {
      id: 'fun-country-th', word: 'Thailand', ipa: '/ˈtaɪ.lænd/', partOfSpeech: 'noun', meaningVi: 'Thái Lan',
      image: { kind: 'flag', countryCode: 'th' }, capital: 'Bangkok', nationality: 'Thai',
      examples: [
        { en: 'We went to Thailand last summer.', vi: 'Chúng tôi đã đi Thái Lan mùa hè năm ngoái.' },
        { en: 'Thai people often greet with a wai.', vi: 'Người Thái thường chào bằng cách chắp tay (wai).' },
      ],
      extraInfo: { vi: 'Thủ đô: Bangkok. Nước Đông Nam Á duy nhất chưa từng bị phương Tây đô hộ.', en: 'Capital: Bangkok. The only Southeast Asian country never colonised by Europeans.' },
    },
    {
      id: 'fun-country-mm', word: 'Myanmar', ipa: '/ˈmjæn.mɑː/', partOfSpeech: 'noun', meaningVi: 'Myanmar',
      image: { kind: 'flag', countryCode: 'mm' }, capital: 'Naypyidaw', nationality: 'Burmese',
      examples: [
        { en: 'Myanmar is famous for its golden pagodas.', vi: 'Myanmar nổi tiếng với những ngôi chùa vàng.' },
        { en: 'I want to visit Myanmar one day.', vi: 'Tôi muốn đến Myanmar vào một ngày nào đó.' },
      ],
      extraInfo: { vi: 'Thủ đô: Naypyidaw. Trước đây có tên là Miến Điện (Burma).', en: 'Capital: Naypyidaw. It used to be called Burma.' },
    },
    {
      id: 'fun-country-my', word: 'Malaysia', ipa: '/məˈleɪ.zi.ə/', partOfSpeech: 'noun', meaningVi: 'Malaysia',
      image: { kind: 'flag', countryCode: 'my' }, capital: 'Kuala Lumpur', nationality: 'Malaysian',
      examples: [
        { en: 'The capital of Malaysia is Kuala Lumpur.', vi: 'Thủ đô của Malaysia là Kuala Lumpur.' },
        { en: 'She is Malaysian.', vi: 'Cô ấy là người Malaysia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kuala Lumpur. Có tháp đôi Petronas nổi tiếng.', en: 'Capital: Kuala Lumpur. Home of the famous Petronas Twin Towers.' },
    },
    {
      id: 'fun-country-sg', word: 'Singapore', ipa: '/ˌsɪŋ.əˈpɔː/', partOfSpeech: 'noun', meaningVi: 'Singapore',
      image: { kind: 'flag', countryCode: 'sg' }, capital: 'Singapore', nationality: 'Singaporean',
      examples: [
        { en: 'Singapore is very clean and green.', vi: 'Singapore rất sạch và xanh.' },
        { en: 'My uncle works in Singapore.', vi: 'Chú tôi làm việc ở Singapore.' },
      ],
      extraInfo: { vi: 'Thủ đô: Singapore. Là một quốc đảo kiêm thành phố.', en: 'Capital: Singapore. It is an island city-state.' },
    },
    {
      id: 'fun-country-id', word: 'Indonesia', ipa: '/ˌɪn.dəˈniː.ʒə/', partOfSpeech: 'noun', meaningVi: 'Indonesia',
      image: { kind: 'flag', countryCode: 'id' }, capital: 'Jakarta', nationality: 'Indonesian',
      examples: [
        { en: 'Indonesia has thousands of islands.', vi: 'Indonesia có hàng nghìn hòn đảo.' },
        { en: 'I want to visit Bali in Indonesia.', vi: 'Tôi muốn đến Bali ở Indonesia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Jakarta. Có hơn 17.000 hòn đảo.', en: 'Capital: Jakarta. It has more than 17,000 islands.' },
    },
    {
      id: 'fun-country-ph', word: 'Philippines', ipa: '/ˈfɪl.ɪ.piːnz/', partOfSpeech: 'noun', meaningVi: 'Philippines',
      image: { kind: 'flag', countryCode: 'ph' }, capital: 'Manila', nationality: 'Filipino',
      examples: [
        { en: 'Many people in the Philippines speak English.', vi: 'Nhiều người ở Philippines nói tiếng Anh.' },
        { en: 'Our English teacher is Filipino.', vi: 'Giáo viên tiếng Anh của chúng tôi là người Philippines.' },
      ],
      extraInfo: { vi: 'Thủ đô: Manila. Gồm hơn 7.000 hòn đảo.', en: 'Capital: Manila. Made up of more than 7,000 islands.' },
    },
    {
      id: 'fun-country-bn', word: 'Brunei', ipa: '/bruːˈnaɪ/', partOfSpeech: 'noun', meaningVi: 'Brunei',
      image: { kind: 'flag', countryCode: 'bn' }, capital: 'Bandar Seri Begawan', nationality: 'Bruneian',
      examples: [
        { en: 'Brunei is a small but rich country.', vi: 'Brunei là một nước nhỏ nhưng giàu có.' },
        { en: 'Brunei is on the island of Borneo.', vi: 'Brunei nằm trên đảo Borneo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bandar Seri Begawan. Giàu nhờ dầu mỏ và khí đốt.', en: 'Capital: Bandar Seri Begawan. Rich from oil and gas.' },
    },
    {
      id: 'fun-country-tl', word: 'East Timor', ipa: '/ˌiːst ˈtiː.mɔː/', partOfSpeech: 'noun', meaningVi: 'Đông Timor',
      image: { kind: 'flag', countryCode: 'tl' }, capital: 'Dili', nationality: 'Timorese',
      examples: [
        { en: 'East Timor is one of the youngest countries in Asia.', vi: 'Đông Timor là một trong những nước trẻ nhất châu Á.' },
        { en: 'The capital of East Timor is Dili.', vi: 'Thủ đô của Đông Timor là Dili.' },
      ],
      extraInfo: { vi: 'Thủ đô: Dili. Độc lập năm 2002, tên chính thức là Timor-Leste.', en: 'Capital: Dili. Independent since 2002; officially called Timor-Leste.' },
    },

    /* ===================== ĐÔNG Á ===================== */
    {
      id: 'fun-country-cn', word: 'China', ipa: '/ˈtʃaɪ.nə/', partOfSpeech: 'noun', meaningVi: 'Trung Quốc',
      image: { kind: 'flag', countryCode: 'cn' }, capital: 'Beijing', nationality: 'Chinese',
      examples: [
        { en: 'China is famous for the Great Wall.', vi: 'Trung Quốc nổi tiếng với Vạn Lý Trường Thành.' },
        { en: 'She is learning Chinese.', vi: 'Cô ấy đang học tiếng Trung.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bắc Kinh. Quê hương của gấu trúc khổng lồ.', en: 'Capital: Beijing. Home of the giant panda.' },
    },
    {
      id: 'fun-country-jp', word: 'Japan', ipa: '/dʒəˈpæn/', partOfSpeech: 'noun', meaningVi: 'Nhật Bản',
      image: { kind: 'flag', countryCode: 'jp' }, capital: 'Tokyo', nationality: 'Japanese',
      examples: [
        { en: 'I want to visit Japan in spring.', vi: 'Tôi muốn đến Nhật Bản vào mùa xuân.' },
        { en: 'Japanese trains are very fast.', vi: 'Tàu hỏa Nhật Bản rất nhanh.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tokyo. Nổi tiếng với hoa anh đào và núi Phú Sĩ.', en: 'Capital: Tokyo. Famous for cherry blossoms and Mount Fuji.' },
    },
    {
      id: 'fun-country-kr', word: 'South Korea', ipa: '/ˌsaʊθ kəˈriː.ə/', partOfSpeech: 'noun', meaningVi: 'Hàn Quốc',
      image: { kind: 'flag', countryCode: 'kr' }, capital: 'Seoul', nationality: 'South Korean',
      examples: [
        { en: 'My sister loves South Korean music.', vi: 'Chị tôi rất thích nhạc Hàn Quốc.' },
        { en: 'The capital of South Korea is Seoul.', vi: 'Thủ đô của Hàn Quốc là Seoul.' },
      ],
      extraInfo: { vi: 'Thủ đô: Seoul. Nổi tiếng với K-pop và kim chi.', en: 'Capital: Seoul. Famous for K-pop and kimchi.' },
    },
    {
      id: 'fun-country-kp', word: 'North Korea', ipa: '/ˌnɔːθ kəˈriː.ə/', partOfSpeech: 'noun', meaningVi: 'Triều Tiên',
      image: { kind: 'flag', countryCode: 'kp' }, capital: 'Pyongyang', nationality: 'North Korean',
      examples: [
        { en: 'North Korea is next to China.', vi: 'Triều Tiên nằm cạnh Trung Quốc.' },
        { en: 'The capital of North Korea is Pyongyang.', vi: 'Thủ đô của Triều Tiên là Bình Nhưỡng.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bình Nhưỡng. Nằm ở nửa phía bắc bán đảo Triều Tiên.', en: 'Capital: Pyongyang. It covers the northern half of the Korean Peninsula.' },
    },
    {
      id: 'fun-country-mn', word: 'Mongolia', ipa: '/mɒŋˈɡəʊ.li.ə/', partOfSpeech: 'noun', meaningVi: 'Mông Cổ',
      image: { kind: 'flag', countryCode: 'mn' }, capital: 'Ulaanbaatar', nationality: 'Mongolian',
      examples: [
        { en: 'Many Mongolian families live in round tents called gers.', vi: 'Nhiều gia đình Mông Cổ sống trong lều tròn gọi là ger.' },
        { en: 'Mongolia is famous for horses.', vi: 'Mông Cổ nổi tiếng với ngựa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ulaanbaatar. Là quê hương của Thành Cát Tư Hãn.', en: 'Capital: Ulaanbaatar. Homeland of Genghis Khan.' },
    },
    {
      id: 'fun-country-tw', word: 'Taiwan', ipa: '/ˌtaɪˈwɑːn/', partOfSpeech: 'noun', meaningVi: 'Đài Loan',
      image: { kind: 'flag', countryCode: 'tw' }, capital: 'Taipei', nationality: 'Taiwanese',
      examples: [
        { en: 'Taiwan is famous for bubble tea.', vi: 'Đài Loan nổi tiếng với trà sữa trân châu.' },
        { en: 'He studied in Taiwan for two years.', vi: 'Anh ấy đã học ở Đài Loan hai năm.' },
      ],
      extraInfo: { vi: 'Thủ phủ: Đài Bắc. Là nơi ra đời của trà sữa trân châu.', en: 'Capital: Taipei. Bubble tea was invented here.' },
    },

    /* ===================== NAM Á ===================== */
    {
      id: 'fun-country-in', word: 'India', ipa: '/ˈɪn.di.ə/', partOfSpeech: 'noun', meaningVi: 'Ấn Độ',
      image: { kind: 'flag', countryCode: 'in' }, capital: 'New Delhi', nationality: 'Indian',
      examples: [
        { en: 'India is famous for the Taj Mahal.', vi: 'Ấn Độ nổi tiếng với đền Taj Mahal.' },
        { en: 'I love Indian curry.', vi: 'Tôi rất thích món cà ri Ấn Độ.' },
      ],
      extraInfo: { vi: 'Thủ đô: New Delhi. Là quốc gia đông dân nhất thế giới.', en: 'Capital: New Delhi. It has the largest population in the world.' },
    },
    {
      id: 'fun-country-pk', word: 'Pakistan', ipa: '/ˌpæk.ɪˈstɑːn/', partOfSpeech: 'noun', meaningVi: 'Pakistan',
      image: { kind: 'flag', countryCode: 'pk' }, capital: 'Islamabad', nationality: 'Pakistani',
      examples: [
        { en: 'Cricket is very popular in Pakistan.', vi: 'Môn cricket rất phổ biến ở Pakistan.' },
        { en: 'The capital of Pakistan is Islamabad.', vi: 'Thủ đô của Pakistan là Islamabad.' },
      ],
      extraInfo: { vi: 'Thủ đô: Islamabad. Có K2, ngọn núi cao thứ hai thế giới.', en: 'Capital: Islamabad. Home to K2, the second-highest mountain in the world.' },
    },
    {
      id: 'fun-country-bd', word: 'Bangladesh', ipa: '/ˌbæŋ.ɡləˈdeʃ/', partOfSpeech: 'noun', meaningVi: 'Bangladesh',
      image: { kind: 'flag', countryCode: 'bd' }, capital: 'Dhaka', nationality: 'Bangladeshi',
      examples: [
        { en: 'Bangladesh has many big rivers.', vi: 'Bangladesh có nhiều con sông lớn.' },
        { en: 'He is Bangladeshi.', vi: 'Anh ấy là người Bangladesh.' },
      ],
      extraInfo: { vi: 'Thủ đô: Dhaka. Là nơi có loài hổ Bengal sinh sống.', en: 'Capital: Dhaka. Home of the Bengal tiger.' },
    },
    {
      id: 'fun-country-lk', word: 'Sri Lanka', ipa: '/ˌsriː ˈlæŋ.kə/', partOfSpeech: 'noun', meaningVi: 'Sri Lanka',
      image: { kind: 'flag', countryCode: 'lk' }, capital: 'Sri Jayawardenepura Kotte', nationality: 'Sri Lankan',
      examples: [
        { en: 'Sri Lanka is famous for its tea.', vi: 'Sri Lanka nổi tiếng với trà.' },
        { en: 'Sri Lanka is an island near India.', vi: 'Sri Lanka là một hòn đảo gần Ấn Độ.' },
      ],
      extraInfo: { vi: 'Thủ đô: Sri Jayawardenepura Kotte. Một trong những nước sản xuất trà lớn nhất thế giới.', en: 'Capital: Sri Jayawardenepura Kotte. One of the biggest tea producers in the world.' },
    },
    {
      id: 'fun-country-np', word: 'Nepal', ipa: '/nəˈpɔːl/', partOfSpeech: 'noun', meaningVi: 'Nepal',
      image: { kind: 'flag', countryCode: 'np' }, capital: 'Kathmandu', nationality: 'Nepali',
      examples: [
        { en: 'Mount Everest is in Nepal.', vi: 'Đỉnh Everest nằm ở Nepal.' },
        { en: 'I want to go hiking in Nepal.', vi: 'Tôi muốn đi leo núi ở Nepal.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kathmandu. Lá cờ duy nhất trên thế giới không phải hình chữ nhật.', en: 'Capital: Kathmandu. The only national flag that is not a rectangle.' },
    },
    {
      id: 'fun-country-bt', word: 'Bhutan', ipa: '/buːˈtɑːn/', partOfSpeech: 'noun', meaningVi: 'Bhutan',
      image: { kind: 'flag', countryCode: 'bt' }, capital: 'Thimphu', nationality: 'Bhutanese',
      examples: [
        { en: 'Bhutan is a small country in the Himalayas.', vi: 'Bhutan là một nước nhỏ trên dãy Himalaya.' },
        { en: 'Bhutan is famous for measuring happiness.', vi: 'Bhutan nổi tiếng vì đo lường hạnh phúc.' },
      ],
      extraInfo: { vi: 'Thủ đô: Thimphu. Lá cờ có hình một con rồng trắng.', en: 'Capital: Thimphu. Its flag shows a white dragon.' },
    },
    {
      id: 'fun-country-mv', word: 'Maldives', ipa: '/ˈmɔːl.diːvz/', partOfSpeech: 'noun', meaningVi: 'Maldives',
      image: { kind: 'flag', countryCode: 'mv' }, capital: 'Malé', nationality: 'Maldivian',
      examples: [
        { en: 'The Maldives has beautiful beaches.', vi: 'Maldives có những bãi biển tuyệt đẹp.' },
        { en: 'They went to the Maldives for their honeymoon.', vi: 'Họ đi Maldives để hưởng tuần trăng mật.' },
      ],
      extraInfo: { vi: 'Thủ đô: Malé. Là quốc gia thấp nhất thế giới so với mực nước biển.', en: 'Capital: Malé. The lowest-lying country in the world.' },
    },
    {
      id: 'fun-country-af', word: 'Afghanistan', ipa: '/æfˈɡæn.ɪ.stɑːn/', partOfSpeech: 'noun', meaningVi: 'Afghanistan',
      image: { kind: 'flag', countryCode: 'af' }, capital: 'Kabul', nationality: 'Afghan',
      examples: [
        { en: 'Afghanistan has no coastline.', vi: 'Afghanistan không có bờ biển.' },
        { en: 'The capital of Afghanistan is Kabul.', vi: 'Thủ đô của Afghanistan là Kabul.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kabul. Nổi tiếng với thảm dệt tay và lựu.', en: 'Capital: Kabul. Famous for hand-woven carpets and pomegranates.' },
    },

    /* ===================== TRUNG Á ===================== */
    {
      id: 'fun-country-kz', word: 'Kazakhstan', ipa: '/ˌkæz.əkˈstɑːn/', partOfSpeech: 'noun', meaningVi: 'Kazakhstan',
      image: { kind: 'flag', countryCode: 'kz' }, capital: 'Astana', nationality: 'Kazakhstani',
      examples: [
        { en: 'Kazakhstan is a very large country.', vi: 'Kazakhstan là một đất nước rất rộng lớn.' },
        { en: 'The capital of Kazakhstan is Astana.', vi: 'Thủ đô của Kazakhstan là Astana.' },
      ],
      extraInfo: { vi: 'Thủ đô: Astana. Là nước không giáp biển lớn nhất thế giới.', en: 'Capital: Astana. The largest landlocked country in the world.' },
    },
    {
      id: 'fun-country-uz', word: 'Uzbekistan', ipa: '/ʊzˌbek.ɪˈstɑːn/', partOfSpeech: 'noun', meaningVi: 'Uzbekistan',
      image: { kind: 'flag', countryCode: 'uz' }, capital: 'Tashkent', nationality: 'Uzbek',
      examples: [
        { en: 'Uzbekistan is famous for its old Silk Road cities.', vi: 'Uzbekistan nổi tiếng với các thành phố cổ trên Con đường Tơ lụa.' },
        { en: 'I want to visit Samarkand in Uzbekistan.', vi: 'Tôi muốn đến Samarkand ở Uzbekistan.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tashkent. Có thành phố cổ Samarkand rất đẹp.', en: 'Capital: Tashkent. Home of the beautiful ancient city of Samarkand.' },
    },
    {
      id: 'fun-country-tm', word: 'Turkmenistan', ipa: '/tɜːkˌmen.ɪˈstɑːn/', partOfSpeech: 'noun', meaningVi: 'Turkmenistan',
      image: { kind: 'flag', countryCode: 'tm' }, capital: 'Ashgabat', nationality: 'Turkmen',
      examples: [
        { en: 'Most of Turkmenistan is desert.', vi: 'Phần lớn Turkmenistan là sa mạc.' },
        { en: 'The capital of Turkmenistan is Ashgabat.', vi: 'Thủ đô của Turkmenistan là Ashgabat.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ashgabat. Có hố lửa "Cổng địa ngục" cháy liên tục nhiều năm.', en: 'Capital: Ashgabat. Famous for the "Door to Hell", a gas crater that has burned for years.' },
    },
    {
      id: 'fun-country-kg', word: 'Kyrgyzstan', ipa: '/ˌkɪə.ɡɪˈstɑːn/', partOfSpeech: 'noun', meaningVi: 'Kyrgyzstan',
      image: { kind: 'flag', countryCode: 'kg' }, capital: 'Bishkek', nationality: 'Kyrgyz',
      examples: [
        { en: 'Kyrgyzstan has many high mountains.', vi: 'Kyrgyzstan có nhiều núi cao.' },
        { en: 'The capital of Kyrgyzstan is Bishkek.', vi: 'Thủ đô của Kyrgyzstan là Bishkek.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bishkek. Khoảng 90% diện tích là núi.', en: 'Capital: Bishkek. About 90% of the country is mountains.' },
    },
    {
      id: 'fun-country-tj', word: 'Tajikistan', ipa: '/tæˈdʒiː.kɪ.stɑːn/', partOfSpeech: 'noun', meaningVi: 'Tajikistan',
      image: { kind: 'flag', countryCode: 'tj' }, capital: 'Dushanbe', nationality: 'Tajik',
      examples: [
        { en: 'Tajikistan is a mountainous country.', vi: 'Tajikistan là một đất nước nhiều núi.' },
        { en: 'The capital of Tajikistan is Dushanbe.', vi: 'Thủ đô của Tajikistan là Dushanbe.' },
      ],
      extraInfo: { vi: 'Thủ đô: Dushanbe. Có dãy núi Pamir được gọi là "nóc nhà thế giới".', en: 'Capital: Dushanbe. The Pamir Mountains are called the "Roof of the World".' },
    },

    /* ===================== TÂY Á ===================== */
    {
      id: 'fun-country-tr', word: 'Turkey', ipa: '/ˈtɜː.ki/', partOfSpeech: 'noun', meaningVi: 'Thổ Nhĩ Kỳ',
      image: { kind: 'flag', countryCode: 'tr' }, capital: 'Ankara', nationality: 'Turkish',
      examples: [
        { en: 'Turkey is in both Europe and Asia.', vi: 'Thổ Nhĩ Kỳ nằm ở cả châu Âu và châu Á.' },
        { en: 'I want to ride a hot-air balloon in Turkey.', vi: 'Tôi muốn đi khinh khí cầu ở Thổ Nhĩ Kỳ.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ankara (không phải Istanbul). Nổi tiếng với khinh khí cầu ở Cappadocia.', en: 'Capital: Ankara (not Istanbul). Famous for hot-air balloons in Cappadocia.' },
    },
    {
      id: 'fun-country-cy', word: 'Cyprus', ipa: '/ˈsaɪ.prəs/', partOfSpeech: 'noun', meaningVi: 'Síp',
      image: { kind: 'flag', countryCode: 'cy' }, capital: 'Nicosia', nationality: 'Cypriot',
      examples: [
        { en: 'Cyprus is an island in the Mediterranean Sea.', vi: 'Síp là một hòn đảo ở Địa Trung Hải.' },
        { en: 'The capital of Cyprus is Nicosia.', vi: 'Thủ đô của Síp là Nicosia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Nicosia. Lá cờ có hình bản đồ hòn đảo.', en: 'Capital: Nicosia. Its flag shows a map of the island.' },
    },
    {
      id: 'fun-country-ge', word: 'Georgia', ipa: '/ˈdʒɔː.dʒə/', partOfSpeech: 'noun', meaningVi: 'Gruzia',
      image: { kind: 'flag', countryCode: 'ge' }, capital: 'Tbilisi', nationality: 'Georgian',
      examples: [
        { en: 'Georgia is between Europe and Asia.', vi: 'Gruzia nằm giữa châu Âu và châu Á.' },
        { en: 'The capital of Georgia is Tbilisi.', vi: 'Thủ đô của Gruzia là Tbilisi.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tbilisi. Là một trong những nơi làm rượu vang lâu đời nhất thế giới.', en: 'Capital: Tbilisi. One of the oldest wine-making places in the world.' },
    },
    {
      id: 'fun-country-am', word: 'Armenia', ipa: '/ɑːˈmiː.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Armenia',
      image: { kind: 'flag', countryCode: 'am' }, capital: 'Yerevan', nationality: 'Armenian',
      examples: [
        { en: 'Armenia has many old churches.', vi: 'Armenia có nhiều nhà thờ cổ.' },
        { en: 'The capital of Armenia is Yerevan.', vi: 'Thủ đô của Armenia là Yerevan.' },
      ],
      extraInfo: { vi: 'Thủ đô: Yerevan. Là nước đầu tiên chọn Kitô giáo làm quốc đạo.', en: 'Capital: Yerevan. The first country to make Christianity its state religion.' },
    },
    {
      id: 'fun-country-az', word: 'Azerbaijan', ipa: '/ˌæz.ə.baɪˈdʒɑːn/', partOfSpeech: 'noun', meaningVi: 'Azerbaijan',
      image: { kind: 'flag', countryCode: 'az' }, capital: 'Baku', nationality: 'Azerbaijani',
      examples: [
        { en: 'Azerbaijan is next to the Caspian Sea.', vi: 'Azerbaijan nằm cạnh biển Caspi.' },
        { en: 'The capital of Azerbaijan is Baku.', vi: 'Thủ đô của Azerbaijan là Baku.' },
      ],
      extraInfo: { vi: 'Thủ đô: Baku. Được gọi là "vùng đất của lửa".', en: 'Capital: Baku. Known as the "Land of Fire".' },
    },
    {
      id: 'fun-country-ir', word: 'Iran', ipa: '/ɪˈrɑːn/', partOfSpeech: 'noun', meaningVi: 'Iran',
      image: { kind: 'flag', countryCode: 'ir' }, capital: 'Tehran', nationality: 'Iranian',
      examples: [
        { en: 'Iran is famous for its carpets.', vi: 'Iran nổi tiếng với thảm.' },
        { en: 'The capital of Iran is Tehran.', vi: 'Thủ đô của Iran là Tehran.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tehran. Trước đây được gọi là Ba Tư (Persia).', en: 'Capital: Tehran. It used to be called Persia.' },
    },
    {
      id: 'fun-country-iq', word: 'Iraq', ipa: '/ɪˈrɑːk/', partOfSpeech: 'noun', meaningVi: 'Iraq',
      image: { kind: 'flag', countryCode: 'iq' }, capital: 'Baghdad', nationality: 'Iraqi',
      examples: [
        { en: 'Two great rivers flow through Iraq.', vi: 'Hai con sông lớn chảy qua Iraq.' },
        { en: 'The capital of Iraq is Baghdad.', vi: 'Thủ đô của Iraq là Baghdad.' },
      ],
      extraInfo: { vi: 'Thủ đô: Baghdad. Là vùng Lưỡng Hà, một cái nôi của văn minh.', en: 'Capital: Baghdad. Ancient Mesopotamia, a cradle of civilisation.' },
    },
    {
      id: 'fun-country-sy', word: 'Syria', ipa: '/ˈsɪr.i.ə/', partOfSpeech: 'noun', meaningVi: 'Syria',
      image: { kind: 'flag', countryCode: 'sy' }, capital: 'Damascus', nationality: 'Syrian',
      examples: [
        { en: 'Syria has a very long history.', vi: 'Syria có lịch sử rất lâu đời.' },
        { en: 'The capital of Syria is Damascus.', vi: 'Thủ đô của Syria là Damascus.' },
      ],
      extraInfo: { vi: 'Thủ đô: Damascus. Một trong những thành phố có người ở lâu đời nhất thế giới.', en: 'Capital: Damascus. One of the oldest continuously inhabited cities in the world.' },
    },
    {
      id: 'fun-country-lb', word: 'Lebanon', ipa: '/ˈleb.ə.nən/', partOfSpeech: 'noun', meaningVi: 'Liban',
      image: { kind: 'flag', countryCode: 'lb' }, capital: 'Beirut', nationality: 'Lebanese',
      examples: [
        { en: 'Lebanese food is delicious.', vi: 'Món ăn Liban rất ngon.' },
        { en: 'The capital of Lebanon is Beirut.', vi: 'Thủ đô của Liban là Beirut.' },
      ],
      extraInfo: { vi: 'Thủ đô: Beirut. Lá cờ có hình cây tuyết tùng xanh.', en: 'Capital: Beirut. Its flag shows a green cedar tree.' },
    },
    {
      id: 'fun-country-il', word: 'Israel', ipa: '/ˈɪz.reɪl/', partOfSpeech: 'noun', meaningVi: 'Israel',
      image: { kind: 'flag', countryCode: 'il' }, capital: 'Jerusalem', nationality: 'Israeli',
      examples: [
        { en: 'You can float easily in the Dead Sea in Israel.', vi: 'Bạn có thể nổi dễ dàng ở Biển Chết tại Israel.' },
        { en: 'He is Israeli.', vi: 'Anh ấy là người Israel.' },
      ],
      extraInfo: { vi: 'Thủ đô (Israel tuyên bố): Jerusalem. Biển Chết là điểm thấp nhất trên đất liền.', en: 'Capital (as declared by Israel): Jerusalem. The Dead Sea is the lowest point on land.' },
    },
    {
      id: 'fun-country-ps', word: 'Palestine', ipa: '/ˈpæl.ə.staɪn/', partOfSpeech: 'noun', meaningVi: 'Palestine',
      image: { kind: 'flag', countryCode: 'ps' }, capital: 'Ramallah', nationality: 'Palestinian',
      examples: [
        { en: 'Palestine is famous for olive trees.', vi: 'Palestine nổi tiếng với cây ô liu.' },
        { en: 'She is Palestinian.', vi: 'Cô ấy là người Palestine.' },
      ],
      extraInfo: { vi: 'Trung tâm hành chính: Ramallah. Thành phố Bethlehem nằm ở đây.', en: 'Administrative centre: Ramallah. The town of Bethlehem is here.' },
    },
    {
      id: 'fun-country-jo', word: 'Jordan', ipa: '/ˈdʒɔː.dən/', partOfSpeech: 'noun', meaningVi: 'Jordan',
      image: { kind: 'flag', countryCode: 'jo' }, capital: 'Amman', nationality: 'Jordanian',
      examples: [
        { en: 'Jordan is famous for the ancient city of Petra.', vi: 'Jordan nổi tiếng với thành cổ Petra.' },
        { en: 'The capital of Jordan is Amman.', vi: 'Thủ đô của Jordan là Amman.' },
      ],
      extraInfo: { vi: 'Thủ đô: Amman. Thành cổ Petra được tạc vào vách đá hồng.', en: 'Capital: Amman. The ancient city of Petra is carved into pink rock.' },
    },
    {
      id: 'fun-country-sa', word: 'Saudi Arabia', ipa: '/ˌsaʊ.di əˈreɪ.bi.ə/', partOfSpeech: 'noun', meaningVi: 'Ả Rập Xê Út',
      image: { kind: 'flag', countryCode: 'sa' }, capital: 'Riyadh', nationality: 'Saudi',
      examples: [
        { en: 'Saudi Arabia is a very hot country.', vi: 'Ả Rập Xê Út là một đất nước rất nóng.' },
        { en: 'The capital of Saudi Arabia is Riyadh.', vi: 'Thủ đô của Ả Rập Xê Út là Riyadh.' },
      ],
      extraInfo: { vi: 'Thủ đô: Riyadh. Phần lớn lãnh thổ là sa mạc và không có sông thường xuyên.', en: 'Capital: Riyadh. Mostly desert, with no permanent rivers.' },
    },
    {
      id: 'fun-country-ye', word: 'Yemen', ipa: '/ˈjem.ən/', partOfSpeech: 'noun', meaningVi: 'Yemen',
      image: { kind: 'flag', countryCode: 'ye' }, capital: "Sana'a", nationality: 'Yemeni',
      examples: [
        { en: 'Yemen is famous for its coffee.', vi: 'Yemen nổi tiếng với cà phê.' },
        { en: 'Yemen has very old mud skyscrapers.', vi: 'Yemen có những tòa nhà cao tầng bằng bùn rất cổ.' },
      ],
      extraInfo: { vi: "Thủ đô: Sana'a. Cảng Mocha nổi tiếng trong lịch sử buôn bán cà phê.", en: "Capital: Sana'a. The port of Mocha is famous in coffee history." },
    },
    {
      id: 'fun-country-om', word: 'Oman', ipa: '/əʊˈmɑːn/', partOfSpeech: 'noun', meaningVi: 'Oman',
      image: { kind: 'flag', countryCode: 'om' }, capital: 'Muscat', nationality: 'Omani',
      examples: [
        { en: 'Oman has beautiful mountains and beaches.', vi: 'Oman có núi và biển rất đẹp.' },
        { en: 'The capital of Oman is Muscat.', vi: 'Thủ đô của Oman là Muscat.' },
      ],
      extraInfo: { vi: 'Thủ đô: Muscat. Nổi tiếng với nhựa thơm trầm hương (frankincense).', en: 'Capital: Muscat. Famous for frankincense.' },
    },
    {
      id: 'fun-country-ae', word: 'United Arab Emirates', ipa: '/juˌnaɪ.tɪd ˌær.əb ˈem.ɪ.rəts/', partOfSpeech: 'noun', meaningVi: 'Các Tiểu vương quốc Ả Rập Thống nhất',
      image: { kind: 'flag', countryCode: 'ae' }, capital: 'Abu Dhabi', nationality: 'Emirati',
      examples: [
        { en: 'The tallest building in the world is in the United Arab Emirates.', vi: 'Tòa nhà cao nhất thế giới nằm ở UAE.' },
        { en: 'We stopped in Dubai on the way to Europe.', vi: 'Chúng tôi dừng ở Dubai trên đường đi châu Âu.' },
      ],
      extraInfo: { vi: 'Thủ đô: Abu Dhabi. Tháp Burj Khalifa ở Dubai cao nhất thế giới.', en: 'Capital: Abu Dhabi. The Burj Khalifa in Dubai is the tallest building in the world.' },
    },
    {
      id: 'fun-country-qa', word: 'Qatar', ipa: '/ˈkʌt.ɑː/', partOfSpeech: 'noun', meaningVi: 'Qatar',
      image: { kind: 'flag', countryCode: 'qa' }, capital: 'Doha', nationality: 'Qatari',
      examples: [
        { en: 'Qatar hosted the 2022 World Cup.', vi: 'Qatar đã tổ chức World Cup 2022.' },
        { en: 'The capital of Qatar is Doha.', vi: 'Thủ đô của Qatar là Doha.' },
      ],
      extraInfo: { vi: 'Thủ đô: Doha. Nước Ả Rập đầu tiên tổ chức World Cup bóng đá (2022).', en: 'Capital: Doha. The first Arab country to host the football World Cup (2022).' },
    },
    {
      id: 'fun-country-bh', word: 'Bahrain', ipa: '/bɑːˈreɪn/', partOfSpeech: 'noun', meaningVi: 'Bahrain',
      image: { kind: 'flag', countryCode: 'bh' }, capital: 'Manama', nationality: 'Bahraini',
      examples: [
        { en: 'Bahrain is a small island country.', vi: 'Bahrain là một quốc đảo nhỏ.' },
        { en: 'The capital of Bahrain is Manama.', vi: 'Thủ đô của Bahrain là Manama.' },
      ],
      extraInfo: { vi: 'Thủ đô: Manama. Từng nổi tiếng với nghề lặn bắt ngọc trai.', en: 'Capital: Manama. Once famous for pearl diving.' },
    },
    {
      id: 'fun-country-kw', word: 'Kuwait', ipa: '/kuːˈweɪt/', partOfSpeech: 'noun', meaningVi: 'Kuwait',
      image: { kind: 'flag', countryCode: 'kw' }, capital: 'Kuwait City', nationality: 'Kuwaiti',
      examples: [
        { en: 'Kuwait is very hot in summer.', vi: 'Kuwait rất nóng vào mùa hè.' },
        { en: 'The capital of Kuwait is Kuwait City.', vi: 'Thủ đô của Kuwait là Thành phố Kuwait.' },
      ],
      extraInfo: { vi: 'Thủ đô: Thành phố Kuwait. Đồng dinar Kuwait là một trong những đồng tiền có giá trị cao nhất.', en: 'Capital: Kuwait City. The Kuwaiti dinar is one of the most valuable currencies.' },
    },

    /* ===================== CHÂU ÂU ===================== */
    {
      id: 'fun-country-gb', word: 'United Kingdom', ipa: '/juˌnaɪ.tɪd ˈkɪŋ.dəm/', partOfSpeech: 'noun', meaningVi: 'Vương quốc Anh',
      image: { kind: 'flag', countryCode: 'gb' }, capital: 'London', nationality: 'British',
      examples: [
        { en: 'I want to study in the United Kingdom.', vi: 'Tôi muốn đi du học ở Vương quốc Anh.' },
        { en: 'British people love drinking tea.', vi: 'Người Anh rất thích uống trà.' },
      ],
      extraInfo: { vi: 'Thủ đô: Luân Đôn. Gồm 4 xứ: Anh, Scotland, Wales và Bắc Ireland.', en: 'Capital: London. Made up of England, Scotland, Wales and Northern Ireland.' },
    },
    {
      id: 'fun-country-ie', word: 'Ireland', ipa: '/ˈaɪə.lənd/', partOfSpeech: 'noun', meaningVi: 'Ireland',
      image: { kind: 'flag', countryCode: 'ie' }, capital: 'Dublin', nationality: 'Irish',
      examples: [
        { en: 'Ireland is very green.', vi: 'Ireland rất xanh tươi.' },
        { en: 'The capital of Ireland is Dublin.', vi: 'Thủ đô của Ireland là Dublin.' },
      ],
      extraInfo: { vi: 'Thủ đô: Dublin. Được gọi là "Hòn đảo ngọc lục bảo".', en: 'Capital: Dublin. Known as the "Emerald Isle".' },
    },
    {
      id: 'fun-country-fr', word: 'France', ipa: '/frɑːns/', partOfSpeech: 'noun', meaningVi: 'Pháp',
      image: { kind: 'flag', countryCode: 'fr' }, capital: 'Paris', nationality: 'French',
      examples: [
        { en: 'France is famous for the Eiffel Tower.', vi: 'Pháp nổi tiếng với tháp Eiffel.' },
        { en: 'I love French bread.', vi: 'Tôi rất thích bánh mì Pháp.' },
      ],
      extraInfo: { vi: 'Thủ đô: Paris. Là nước được du khách ghé thăm nhiều nhất thế giới.', en: 'Capital: Paris. The most visited country in the world.' },
    },
    {
      id: 'fun-country-de', word: 'Germany', ipa: '/ˈdʒɜː.mə.ni/', partOfSpeech: 'noun', meaningVi: 'Đức',
      image: { kind: 'flag', countryCode: 'de' }, capital: 'Berlin', nationality: 'German',
      examples: [
        { en: 'German cars are very popular.', vi: 'Xe hơi Đức rất được ưa chuộng.' },
        { en: 'The capital of Germany is Berlin.', vi: 'Thủ đô của Đức là Berlin.' },
      ],
      extraInfo: { vi: 'Thủ đô: Berlin. Có hơn 1.000 loại xúc xích khác nhau.', en: 'Capital: Berlin. It has more than 1,000 kinds of sausage.' },
    },
    {
      id: 'fun-country-it', word: 'Italy', ipa: '/ˈɪt.əl.i/', partOfSpeech: 'noun', meaningVi: 'Ý',
      image: { kind: 'flag', countryCode: 'it' }, capital: 'Rome', nationality: 'Italian',
      examples: [
        { en: 'Italy is famous for pizza and pasta.', vi: 'Ý nổi tiếng với pizza và mì ống.' },
        { en: 'My dad loves Italian coffee.', vi: 'Bố tôi rất thích cà phê Ý.' },
      ],
      extraInfo: { vi: 'Thủ đô: Roma. Bản đồ nước Ý trông giống chiếc ủng.', en: 'Capital: Rome. The map of Italy looks like a boot.' },
    },
    {
      id: 'fun-country-es', word: 'Spain', ipa: '/speɪn/', partOfSpeech: 'noun', meaningVi: 'Tây Ban Nha',
      image: { kind: 'flag', countryCode: 'es' }, capital: 'Madrid', nationality: 'Spanish',
      examples: [
        { en: 'Spanish is spoken in many countries.', vi: 'Tiếng Tây Ban Nha được nói ở nhiều nước.' },
        { en: 'I want to visit Spain.', vi: 'Tôi muốn đến Tây Ban Nha.' },
      ],
      extraInfo: { vi: 'Thủ đô: Madrid. Nổi tiếng với điệu flamenco và món paella.', en: 'Capital: Madrid. Famous for flamenco and paella.' },
    },
    {
      id: 'fun-country-pt', word: 'Portugal', ipa: '/ˈpɔː.tʃə.ɡəl/', partOfSpeech: 'noun', meaningVi: 'Bồ Đào Nha',
      image: { kind: 'flag', countryCode: 'pt' }, capital: 'Lisbon', nationality: 'Portuguese',
      examples: [
        { en: 'People in Brazil speak Portuguese.', vi: 'Người Brazil nói tiếng Bồ Đào Nha.' },
        { en: 'The capital of Portugal is Lisbon.', vi: 'Thủ đô của Bồ Đào Nha là Lisboa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Lisboa. Nổi tiếng với bánh tart trứng.', en: 'Capital: Lisbon. Famous for custard egg tarts.' },
    },
    {
      id: 'fun-country-nl', word: 'Netherlands', ipa: '/ˈneð.ə.ləndz/', partOfSpeech: 'noun', meaningVi: 'Hà Lan',
      image: { kind: 'flag', countryCode: 'nl' }, capital: 'Amsterdam', nationality: 'Dutch',
      examples: [
        { en: 'The Netherlands is famous for tulips and windmills.', vi: 'Hà Lan nổi tiếng với hoa tulip và cối xay gió.' },
        { en: 'Dutch people ride bikes everywhere.', vi: 'Người Hà Lan đạp xe đi khắp nơi.' },
      ],
      extraInfo: { vi: 'Thủ đô: Amsterdam. Khoảng một phần tư đất nước nằm thấp hơn mực nước biển.', en: 'Capital: Amsterdam. About a quarter of the country is below sea level.' },
    },
    {
      id: 'fun-country-be', word: 'Belgium', ipa: '/ˈbel.dʒəm/', partOfSpeech: 'noun', meaningVi: 'Bỉ',
      image: { kind: 'flag', countryCode: 'be' }, capital: 'Brussels', nationality: 'Belgian',
      examples: [
        { en: 'Belgium is famous for chocolate.', vi: 'Bỉ nổi tiếng với sô-cô-la.' },
        { en: 'I had a Belgian waffle for breakfast.', vi: 'Tôi đã ăn bánh waffle kiểu Bỉ cho bữa sáng.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bruxelles. Nổi tiếng với sô-cô-la, bánh waffle và khoai tây chiên.', en: 'Capital: Brussels. Famous for chocolate, waffles and chips.' },
    },
    {
      id: 'fun-country-lu', word: 'Luxembourg', ipa: '/ˈlʌk.səm.bɜːɡ/', partOfSpeech: 'noun', meaningVi: 'Luxembourg',
      image: { kind: 'flag', countryCode: 'lu' }, capital: 'Luxembourg', nationality: 'Luxembourgish',
      examples: [
        { en: 'Luxembourg is a very small country.', vi: 'Luxembourg là một nước rất nhỏ.' },
        { en: 'Buses and trains are free in Luxembourg.', vi: 'Xe buýt và tàu hỏa ở Luxembourg được miễn phí.' },
      ],
      extraInfo: { vi: 'Thủ đô: Luxembourg. Nước đầu tiên miễn phí toàn bộ giao thông công cộng.', en: 'Capital: Luxembourg. The first country to make all public transport free.' },
    },
    {
      id: 'fun-country-ch', word: 'Switzerland', ipa: '/ˈswɪt.sə.lənd/', partOfSpeech: 'noun', meaningVi: 'Thụy Sĩ',
      image: { kind: 'flag', countryCode: 'ch' }, capital: 'Bern', nationality: 'Swiss',
      examples: [
        { en: 'Switzerland is famous for watches and chocolate.', vi: 'Thụy Sĩ nổi tiếng với đồng hồ và sô-cô-la.' },
        { en: 'We went skiing in Switzerland.', vi: 'Chúng tôi đã đi trượt tuyết ở Thụy Sĩ.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bern. Lá cờ hình vuông, có 4 ngôn ngữ chính thức.', en: 'Capital: Bern. It has a square flag and four official languages.' },
    },
    {
      id: 'fun-country-at', word: 'Austria', ipa: '/ˈɒs.tri.ə/', partOfSpeech: 'noun', meaningVi: 'Áo',
      image: { kind: 'flag', countryCode: 'at' }, capital: 'Vienna', nationality: 'Austrian',
      examples: [
        { en: 'Mozart was Austrian.', vi: 'Mozart là người Áo.' },
        { en: 'The capital of Austria is Vienna.', vi: 'Thủ đô của Áo là Viên.' },
      ],
      extraInfo: { vi: 'Thủ đô: Viên. Quê hương của nhà soạn nhạc Mozart.', en: 'Capital: Vienna. Birthplace of the composer Mozart.' },
    },
    {
      id: 'fun-country-li', word: 'Liechtenstein', ipa: '/ˈlɪk.tən.staɪn/', partOfSpeech: 'noun', meaningVi: 'Liechtenstein',
      image: { kind: 'flag', countryCode: 'li' }, capital: 'Vaduz', nationality: 'Liechtensteiner',
      examples: [
        { en: 'Liechtenstein is between Switzerland and Austria.', vi: 'Liechtenstein nằm giữa Thụy Sĩ và Áo.' },
        { en: 'The capital of Liechtenstein is Vaduz.', vi: 'Thủ đô của Liechtenstein là Vaduz.' },
      ],
      extraInfo: { vi: 'Thủ đô: Vaduz. Một trong hai nước bị bao quanh bởi các nước không giáp biển.', en: 'Capital: Vaduz. One of only two doubly landlocked countries.' },
    },
    {
      id: 'fun-country-mc', word: 'Monaco', ipa: '/ˈmɒn.ə.kəʊ/', partOfSpeech: 'noun', meaningVi: 'Monaco',
      image: { kind: 'flag', countryCode: 'mc' }, capital: 'Monaco', nationality: 'Monegasque',
      examples: [
        { en: 'Monaco is famous for its car race.', vi: 'Monaco nổi tiếng với cuộc đua xe.' },
        { en: 'Monaco is a tiny country by the sea.', vi: 'Monaco là một nước tí hon bên bờ biển.' },
      ],
      extraInfo: { vi: 'Thủ đô: Monaco. Là quốc gia nhỏ thứ hai thế giới.', en: 'Capital: Monaco. The second-smallest country in the world.' },
    },
    {
      id: 'fun-country-ad', word: 'Andorra', ipa: '/ænˈdɒr.ə/', partOfSpeech: 'noun', meaningVi: 'Andorra',
      image: { kind: 'flag', countryCode: 'ad' }, capital: 'Andorra la Vella', nationality: 'Andorran',
      examples: [
        { en: 'Andorra is between France and Spain.', vi: 'Andorra nằm giữa Pháp và Tây Ban Nha.' },
        { en: 'People go skiing in Andorra.', vi: 'Mọi người đến Andorra để trượt tuyết.' },
      ],
      extraInfo: { vi: 'Thủ đô: Andorra la Vella. Là thủ đô cao nhất châu Âu.', en: 'Capital: Andorra la Vella. The highest capital city in Europe.' },
    },
    {
      id: 'fun-country-va', word: 'Vatican City', ipa: '/ˌvæt.ɪ.kən ˈsɪt.i/', partOfSpeech: 'noun', meaningVi: 'Thành Vatican',
      image: { kind: 'flag', countryCode: 'va' }, capital: 'Vatican City', nationality: 'Vatican',
      examples: [
        { en: 'Vatican City is inside Rome.', vi: 'Thành Vatican nằm bên trong thành phố Roma.' },
        { en: 'The Pope lives in Vatican City.', vi: 'Đức Giáo hoàng sống ở Thành Vatican.' },
      ],
      extraInfo: { vi: 'Thủ đô: Thành Vatican. Là quốc gia nhỏ nhất thế giới.', en: 'Capital: Vatican City. The smallest country in the world.' },
    },
    {
      id: 'fun-country-sm', word: 'San Marino', ipa: '/ˌsæn məˈriː.nəʊ/', partOfSpeech: 'noun', meaningVi: 'San Marino',
      image: { kind: 'flag', countryCode: 'sm' }, capital: 'San Marino', nationality: 'Sammarinese',
      examples: [
        { en: 'San Marino is surrounded by Italy.', vi: 'San Marino được bao quanh bởi nước Ý.' },
        { en: 'San Marino is on a mountain.', vi: 'San Marino nằm trên một ngọn núi.' },
      ],
      extraInfo: { vi: 'Thủ đô: San Marino. Một trong những nước cộng hòa lâu đời nhất thế giới.', en: 'Capital: San Marino. One of the oldest republics in the world.' },
    },
    {
      id: 'fun-country-mt', word: 'Malta', ipa: '/ˈmɔːl.tə/', partOfSpeech: 'noun', meaningVi: 'Malta',
      image: { kind: 'flag', countryCode: 'mt' }, capital: 'Valletta', nationality: 'Maltese',
      examples: [
        { en: 'Many students learn English in Malta.', vi: 'Nhiều học sinh học tiếng Anh ở Malta.' },
        { en: 'The capital of Malta is Valletta.', vi: 'Thủ đô của Malta là Valletta.' },
      ],
      extraInfo: { vi: 'Thủ đô: Valletta. Là quốc đảo nhỏ ở Địa Trung Hải, nói cả tiếng Anh.', en: 'Capital: Valletta. A small island nation in the Mediterranean where English is official.' },
    },
    {
      id: 'fun-country-gr', word: 'Greece', ipa: '/ɡriːs/', partOfSpeech: 'noun', meaningVi: 'Hy Lạp',
      image: { kind: 'flag', countryCode: 'gr' }, capital: 'Athens', nationality: 'Greek',
      examples: [
        { en: 'The Olympic Games started in Greece.', vi: 'Thế vận hội bắt nguồn từ Hy Lạp.' },
        { en: 'I love Greek salad.', vi: 'Tôi rất thích món salad Hy Lạp.' },
      ],
      extraInfo: { vi: 'Thủ đô: Athena. Nơi khai sinh Thế vận hội Olympic.', en: 'Capital: Athens. Birthplace of the Olympic Games.' },
    },
    {
      id: 'fun-country-al', word: 'Albania', ipa: '/ælˈbeɪ.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Albania',
      image: { kind: 'flag', countryCode: 'al' }, capital: 'Tirana', nationality: 'Albanian',
      examples: [
        { en: 'Albania has beautiful beaches.', vi: 'Albania có những bãi biển đẹp.' },
        { en: 'The capital of Albania is Tirana.', vi: 'Thủ đô của Albania là Tirana.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tirana. Lá cờ đỏ có hình đại bàng hai đầu màu đen.', en: 'Capital: Tirana. Its red flag shows a black two-headed eagle.' },
    },
    {
      id: 'fun-country-mk', word: 'North Macedonia', ipa: '/ˌnɔːθ ˌmæs.əˈdəʊ.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Bắc Macedonia',
      image: { kind: 'flag', countryCode: 'mk' }, capital: 'Skopje', nationality: 'Macedonian',
      examples: [
        { en: 'North Macedonia has a beautiful lake called Ohrid.', vi: 'Bắc Macedonia có hồ Ohrid rất đẹp.' },
        { en: 'The capital of North Macedonia is Skopje.', vi: 'Thủ đô của Bắc Macedonia là Skopje.' },
      ],
      extraInfo: { vi: 'Thủ đô: Skopje. Mẹ Teresa sinh ra ở Skopje.', en: 'Capital: Skopje. Mother Teresa was born in Skopje.' },
    },
    {
      id: 'fun-country-bg', word: 'Bulgaria', ipa: '/bʌlˈɡeə.ri.ə/', partOfSpeech: 'noun', meaningVi: 'Bulgaria',
      image: { kind: 'flag', countryCode: 'bg' }, capital: 'Sofia', nationality: 'Bulgarian',
      examples: [
        { en: 'Bulgaria is famous for yoghurt and roses.', vi: 'Bulgaria nổi tiếng với sữa chua và hoa hồng.' },
        { en: 'The capital of Bulgaria is Sofia.', vi: 'Thủ đô của Bulgaria là Sofia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Sofia. Ở Bulgaria, lắc đầu nghĩa là "có", gật đầu nghĩa là "không".', en: 'Capital: Sofia. In Bulgaria, shaking your head means "yes" and nodding means "no".' },
    },
    {
      id: 'fun-country-ro', word: 'Romania', ipa: '/ruˈmeɪ.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Romania',
      image: { kind: 'flag', countryCode: 'ro' }, capital: 'Bucharest', nationality: 'Romanian',
      examples: [
        { en: 'Romania is famous for its castles.', vi: 'Romania nổi tiếng với các lâu đài.' },
        { en: 'She is Romanian.', vi: 'Cô ấy là người Romania.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bucharest. Lâu đài Bran gắn với truyền thuyết Dracula.', en: 'Capital: Bucharest. Bran Castle is linked to the Dracula legend.' },
    },
    {
      id: 'fun-country-md', word: 'Moldova', ipa: '/mɒlˈdəʊ.və/', partOfSpeech: 'noun', meaningVi: 'Moldova',
      image: { kind: 'flag', countryCode: 'md' }, capital: 'Chisinau', nationality: 'Moldovan',
      examples: [
        { en: 'Moldova is between Romania and Ukraine.', vi: 'Moldova nằm giữa Romania và Ukraina.' },
        { en: 'The capital of Moldova is Chisinau.', vi: 'Thủ đô của Moldova là Chisinau.' },
      ],
      extraInfo: { vi: 'Thủ đô: Chisinau. Có hầm rượu vang lớn nhất thế giới (Milestii Mici).', en: 'Capital: Chisinau. Home to the largest wine cellar in the world (Milestii Mici).' },
    },
    {
      id: 'fun-country-rs', word: 'Serbia', ipa: '/ˈsɜː.bi.ə/', partOfSpeech: 'noun', meaningVi: 'Serbia',
      image: { kind: 'flag', countryCode: 'rs' }, capital: 'Belgrade', nationality: 'Serbian',
      examples: [
        { en: 'The tennis player Novak Djokovic is Serbian.', vi: 'Tay vợt Novak Djokovic là người Serbia.' },
        { en: 'The capital of Serbia is Belgrade.', vi: 'Thủ đô của Serbia là Belgrade.' },
      ],
      extraInfo: { vi: 'Thủ đô: Belgrade. Nằm ở nơi hai sông Sava và Danube gặp nhau.', en: 'Capital: Belgrade. It sits where the Sava and Danube rivers meet.' },
    },
    {
      id: 'fun-country-me', word: 'Montenegro', ipa: '/ˌmɒn.tɪˈniː.ɡrəʊ/', partOfSpeech: 'noun', meaningVi: 'Montenegro',
      image: { kind: 'flag', countryCode: 'me' }, capital: 'Podgorica', nationality: 'Montenegrin',
      examples: [
        { en: 'Montenegro means "black mountain".', vi: 'Montenegro có nghĩa là "ngọn núi đen".' },
        { en: 'The capital of Montenegro is Podgorica.', vi: 'Thủ đô của Montenegro là Podgorica.' },
      ],
      extraInfo: { vi: 'Thủ đô: Podgorica. Có vịnh Kotor đẹp như tranh.', en: 'Capital: Podgorica. Home of the beautiful Bay of Kotor.' },
    },
    {
      id: 'fun-country-ba', word: 'Bosnia and Herzegovina', ipa: '/ˌbɒz.ni.ə ən ˌhɜːt.sə.ɡəˈviː.nə/', partOfSpeech: 'noun', meaningVi: 'Bosnia và Herzegovina',
      image: { kind: 'flag', countryCode: 'ba' }, capital: 'Sarajevo', nationality: 'Bosnian',
      examples: [
        { en: 'Bosnia and Herzegovina has an old bridge in Mostar.', vi: 'Bosnia và Herzegovina có cây cầu cổ ở Mostar.' },
        { en: 'The capital of Bosnia and Herzegovina is Sarajevo.', vi: 'Thủ đô của Bosnia và Herzegovina là Sarajevo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Sarajevo. Cây Cầu Cổ ở Mostar là di sản thế giới.', en: 'Capital: Sarajevo. The Old Bridge in Mostar is a World Heritage Site.' },
    },
    {
      id: 'fun-country-hr', word: 'Croatia', ipa: '/krəʊˈeɪ.ʃə/', partOfSpeech: 'noun', meaningVi: 'Croatia',
      image: { kind: 'flag', countryCode: 'hr' }, capital: 'Zagreb', nationality: 'Croatian',
      examples: [
        { en: 'Croatia has more than a thousand islands.', vi: 'Croatia có hơn một nghìn hòn đảo.' },
        { en: 'The capital of Croatia is Zagreb.', vi: 'Thủ đô của Croatia là Zagreb.' },
      ],
      extraInfo: { vi: 'Thủ đô: Zagreb. Chiếc cà vạt có nguồn gốc từ Croatia.', en: 'Capital: Zagreb. The necktie comes from Croatia.' },
    },
    {
      id: 'fun-country-si', word: 'Slovenia', ipa: '/sləʊˈviː.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Slovenia',
      image: { kind: 'flag', countryCode: 'si' }, capital: 'Ljubljana', nationality: 'Slovenian',
      examples: [
        { en: 'Slovenia has a lake with a church on an island.', vi: 'Slovenia có một hồ nước với nhà thờ trên đảo.' },
        { en: 'The capital of Slovenia is Ljubljana.', vi: 'Thủ đô của Slovenia là Ljubljana.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ljubljana. Hơn một nửa đất nước là rừng.', en: 'Capital: Ljubljana. More than half of the country is forest.' },
    },
    {
      id: 'fun-country-xk', word: 'Kosovo', ipa: '/ˈkɒs.ə.vəʊ/', partOfSpeech: 'noun', meaningVi: 'Kosovo',
      image: { kind: 'flag', countryCode: 'xk' }, capital: 'Pristina', nationality: 'Kosovar',
      examples: [
        { en: 'Kosovo is in the Balkans.', vi: 'Kosovo nằm ở vùng Balkan.' },
        { en: 'The capital of Kosovo is Pristina.', vi: 'Thủ đô của Kosovo là Pristina.' },
      ],
      extraInfo: { vi: 'Thủ đô: Pristina. Tuyên bố độc lập năm 2008; lá cờ có hình bản đồ đất nước.', en: 'Capital: Pristina. Declared independence in 2008; its flag shows a map of the country.' },
    },
    {
      id: 'fun-country-hu', word: 'Hungary', ipa: '/ˈhʌŋ.ɡər.i/', partOfSpeech: 'noun', meaningVi: 'Hungary',
      image: { kind: 'flag', countryCode: 'hu' }, capital: 'Budapest', nationality: 'Hungarian',
      examples: [
        { en: 'The Rubik cube was invented in Hungary.', vi: 'Khối Rubik được phát minh ở Hungary.' },
        { en: 'The capital of Hungary is Budapest.', vi: 'Thủ đô của Hungary là Budapest.' },
      ],
      extraInfo: { vi: 'Thủ đô: Budapest. Quê hương của khối Rubik.', en: 'Capital: Budapest. Home of the Rubik cube.' },
    },
    {
      id: 'fun-country-sk', word: 'Slovakia', ipa: '/sləʊˈvæk.i.ə/', partOfSpeech: 'noun', meaningVi: 'Slovakia',
      image: { kind: 'flag', countryCode: 'sk' }, capital: 'Bratislava', nationality: 'Slovak',
      examples: [
        { en: 'Slovakia has many castles.', vi: 'Slovakia có rất nhiều lâu đài.' },
        { en: 'The capital of Slovakia is Bratislava.', vi: 'Thủ đô của Slovakia là Bratislava.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bratislava. Có rất nhiều lâu đài trên mỗi đầu người.', en: 'Capital: Bratislava. It has a huge number of castles for its size.' },
    },
    {
      id: 'fun-country-cz', word: 'Czech Republic', ipa: '/ˌtʃek rɪˈpʌb.lɪk/', partOfSpeech: 'noun', meaningVi: 'Séc',
      image: { kind: 'flag', countryCode: 'cz' }, capital: 'Prague', nationality: 'Czech',
      examples: [
        { en: 'Prague is the capital of the Czech Republic.', vi: 'Praha là thủ đô của Séc.' },
        { en: 'I want to visit the Czech Republic.', vi: 'Tôi muốn đến Séc.' },
      ],
      extraInfo: { vi: 'Thủ đô: Praha. Có lâu đài Praha, một trong những lâu đài lớn nhất thế giới.', en: 'Capital: Prague. Prague Castle is one of the largest castles in the world.' },
    },
    {
      id: 'fun-country-pl', word: 'Poland', ipa: '/ˈpəʊ.lənd/', partOfSpeech: 'noun', meaningVi: 'Ba Lan',
      image: { kind: 'flag', countryCode: 'pl' }, capital: 'Warsaw', nationality: 'Polish',
      examples: [
        { en: 'The scientist Marie Curie was Polish.', vi: 'Nhà khoa học Marie Curie là người Ba Lan.' },
        { en: 'The capital of Poland is Warsaw.', vi: 'Thủ đô của Ba Lan là Warszawa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Warszawa. Quê hương của Marie Curie và nhà soạn nhạc Chopin.', en: 'Capital: Warsaw. Home country of Marie Curie and the composer Chopin.' },
    },
    {
      id: 'fun-country-dk', word: 'Denmark', ipa: '/ˈden.mɑːk/', partOfSpeech: 'noun', meaningVi: 'Đan Mạch',
      image: { kind: 'flag', countryCode: 'dk' }, capital: 'Copenhagen', nationality: 'Danish',
      examples: [
        { en: 'LEGO comes from Denmark.', vi: 'Đồ chơi LEGO đến từ Đan Mạch.' },
        { en: 'The capital of Denmark is Copenhagen.', vi: 'Thủ đô của Đan Mạch là Copenhagen.' },
      ],
      extraInfo: { vi: 'Thủ đô: Copenhagen. Quê hương của LEGO và có lá cờ quốc gia cổ nhất còn dùng.', en: 'Capital: Copenhagen. Home of LEGO and the oldest national flag still in use.' },
    },
    {
      id: 'fun-country-no', word: 'Norway', ipa: '/ˈnɔː.weɪ/', partOfSpeech: 'noun', meaningVi: 'Na Uy',
      image: { kind: 'flag', countryCode: 'no' }, capital: 'Oslo', nationality: 'Norwegian',
      examples: [
        { en: 'You can see the northern lights in Norway.', vi: 'Bạn có thể ngắm cực quang ở Na Uy.' },
        { en: 'Norway is famous for its fjords.', vi: 'Na Uy nổi tiếng với các vịnh hẹp (fjord).' },
      ],
      extraInfo: { vi: 'Thủ đô: Oslo. Có những vùng mùa hè mặt trời không lặn.', en: 'Capital: Oslo. In parts of Norway the sun never sets in summer.' },
    },
    {
      id: 'fun-country-se', word: 'Sweden', ipa: '/ˈswiː.dən/', partOfSpeech: 'noun', meaningVi: 'Thụy Điển',
      image: { kind: 'flag', countryCode: 'se' }, capital: 'Stockholm', nationality: 'Swedish',
      examples: [
        { en: 'IKEA is a Swedish company.', vi: 'IKEA là một công ty Thụy Điển.' },
        { en: 'The capital of Sweden is Stockholm.', vi: 'Thủ đô của Thụy Điển là Stockholm.' },
      ],
      extraInfo: { vi: 'Thủ đô: Stockholm. Giải Nobel được trao ở Stockholm.', en: 'Capital: Stockholm. The Nobel Prizes are given in Stockholm.' },
    },
    {
      id: 'fun-country-fi', word: 'Finland', ipa: '/ˈfɪn.lənd/', partOfSpeech: 'noun', meaningVi: 'Phần Lan',
      image: { kind: 'flag', countryCode: 'fi' }, capital: 'Helsinki', nationality: 'Finnish',
      examples: [
        { en: 'Finland has thousands of lakes.', vi: 'Phần Lan có hàng nghìn hồ nước.' },
        { en: 'Finnish people love the sauna.', vi: 'Người Phần Lan rất thích xông hơi.' },
      ],
      extraInfo: { vi: 'Thủ đô: Helsinki. Được gọi là "xứ sở nghìn hồ" và thường đứng đầu về hạnh phúc.', en: 'Capital: Helsinki. The "land of a thousand lakes", often ranked the happiest country.' },
    },
    {
      id: 'fun-country-is', word: 'Iceland', ipa: '/ˈaɪs.lənd/', partOfSpeech: 'noun', meaningVi: 'Iceland',
      image: { kind: 'flag', countryCode: 'is' }, capital: 'Reykjavik', nationality: 'Icelandic',
      examples: [
        { en: 'Iceland has many volcanoes.', vi: 'Iceland có nhiều núi lửa.' },
        { en: 'I want to see the northern lights in Iceland.', vi: 'Tôi muốn ngắm cực quang ở Iceland.' },
      ],
      extraInfo: { vi: 'Thủ đô: Reykjavik. Vùng đất của băng và lửa, không có muỗi.', en: 'Capital: Reykjavik. The land of ice and fire, with no mosquitoes.' },
    },
    {
      id: 'fun-country-ee', word: 'Estonia', ipa: '/esˈtəʊ.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Estonia',
      image: { kind: 'flag', countryCode: 'ee' }, capital: 'Tallinn', nationality: 'Estonian',
      examples: [
        { en: 'Skype was created in Estonia.', vi: 'Skype được tạo ra ở Estonia.' },
        { en: 'The capital of Estonia is Tallinn.', vi: 'Thủ đô của Estonia là Tallinn.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tallinn. Một trong những nước số hóa nhất thế giới.', en: 'Capital: Tallinn. One of the most digital countries in the world.' },
    },
    {
      id: 'fun-country-lv', word: 'Latvia', ipa: '/ˈlæt.vi.ə/', partOfSpeech: 'noun', meaningVi: 'Latvia',
      image: { kind: 'flag', countryCode: 'lv' }, capital: 'Riga', nationality: 'Latvian',
      examples: [
        { en: 'Latvia is by the Baltic Sea.', vi: 'Latvia nằm bên biển Baltic.' },
        { en: 'The capital of Latvia is Riga.', vi: 'Thủ đô của Latvia là Riga.' },
      ],
      extraInfo: { vi: 'Thủ đô: Riga. Khoảng một nửa đất nước được rừng bao phủ.', en: 'Capital: Riga. About half of the country is covered by forest.' },
    },
    {
      id: 'fun-country-lt', word: 'Lithuania', ipa: '/ˌlɪθ.juˈeɪ.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Litva',
      image: { kind: 'flag', countryCode: 'lt' }, capital: 'Vilnius', nationality: 'Lithuanian',
      examples: [
        { en: 'Basketball is very popular in Lithuania.', vi: 'Bóng rổ rất phổ biến ở Litva.' },
        { en: 'The capital of Lithuania is Vilnius.', vi: 'Thủ đô của Litva là Vilnius.' },
      ],
      extraInfo: { vi: 'Thủ đô: Vilnius. Bóng rổ được coi là "môn thể thao quốc gia".', en: 'Capital: Vilnius. Basketball is like a national religion there.' },
    },
    {
      id: 'fun-country-by', word: 'Belarus', ipa: '/ˌbel.əˈruːs/', partOfSpeech: 'noun', meaningVi: 'Belarus',
      image: { kind: 'flag', countryCode: 'by' }, capital: 'Minsk', nationality: 'Belarusian',
      examples: [
        { en: 'Belarus has large forests.', vi: 'Belarus có những khu rừng rộng lớn.' },
        { en: 'The capital of Belarus is Minsk.', vi: 'Thủ đô của Belarus là Minsk.' },
      ],
      extraInfo: { vi: 'Thủ đô: Minsk. Có rừng Białowieża, nơi bò rừng châu Âu sinh sống.', en: 'Capital: Minsk. Home to Białowieża Forest, where European bison live.' },
    },
    {
      id: 'fun-country-ua', word: 'Ukraine', ipa: '/juːˈkreɪn/', partOfSpeech: 'noun', meaningVi: 'Ukraina',
      image: { kind: 'flag', countryCode: 'ua' }, capital: 'Kyiv', nationality: 'Ukrainian',
      examples: [
        { en: 'Ukraine has huge fields of sunflowers.', vi: 'Ukraina có những cánh đồng hoa hướng dương rộng lớn.' },
        { en: 'The capital of Ukraine is Kyiv.', vi: 'Thủ đô của Ukraina là Kyiv.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kyiv. Lá cờ xanh và vàng tượng trưng cho bầu trời và cánh đồng lúa mì.', en: 'Capital: Kyiv. The blue and yellow flag stands for the sky and wheat fields.' },
    },
    {
      id: 'fun-country-ru', word: 'Russia', ipa: '/ˈrʌʃ.ə/', partOfSpeech: 'noun', meaningVi: 'Nga',
      image: { kind: 'flag', countryCode: 'ru' }, capital: 'Moscow', nationality: 'Russian',
      examples: [
        { en: 'Russia is the biggest country in the world.', vi: 'Nga là đất nước rộng lớn nhất thế giới.' },
        { en: 'It is very cold in Russia in winter.', vi: 'Mùa đông ở Nga rất lạnh.' },
      ],
      extraInfo: { vi: 'Thủ đô: Mát-xcơ-va. Trải dài qua 11 múi giờ.', en: 'Capital: Moscow. It stretches across 11 time zones.' },
    },

    /* ===================== CHÂU MỸ — BẮC MỸ & TRUNG MỸ ===================== */
    {
      id: 'fun-country-us', word: 'United States', ipa: '/juˌnaɪ.tɪd ˈsteɪts/', partOfSpeech: 'noun', meaningVi: 'Hoa Kỳ (Mỹ)',
      image: { kind: 'flag', countryCode: 'us' }, capital: 'Washington, D.C.', nationality: 'American',
      examples: [
        { en: 'The United States has 50 states.', vi: 'Hoa Kỳ có 50 bang.' },
        { en: 'My cousin lives in the United States.', vi: 'Anh họ tôi sống ở Mỹ.' },
      ],
      extraInfo: { vi: 'Thủ đô: Washington, D.C. Lá cờ có 50 ngôi sao cho 50 bang.', en: 'Capital: Washington, D.C. Its flag has 50 stars for 50 states.' },
    },
    {
      id: 'fun-country-ca', word: 'Canada', ipa: '/ˈkæn.ə.də/', partOfSpeech: 'noun', meaningVi: 'Canada',
      image: { kind: 'flag', countryCode: 'ca' }, capital: 'Ottawa', nationality: 'Canadian',
      examples: [
        { en: 'Canada is famous for maple syrup.', vi: 'Canada nổi tiếng với siro lá phong.' },
        { en: 'The capital of Canada is Ottawa.', vi: 'Thủ đô của Canada là Ottawa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ottawa. Có đường bờ biển dài nhất thế giới.', en: 'Capital: Ottawa. It has the longest coastline in the world.' },
    },
    {
      id: 'fun-country-mx', word: 'Mexico', ipa: '/ˈmek.sɪ.kəʊ/', partOfSpeech: 'noun', meaningVi: 'Mexico',
      image: { kind: 'flag', countryCode: 'mx' }, capital: 'Mexico City', nationality: 'Mexican',
      examples: [
        { en: 'Tacos are a famous Mexican food.', vi: 'Tacos là món ăn Mexico nổi tiếng.' },
        { en: 'I want to visit Mexico.', vi: 'Tôi muốn đến Mexico.' },
      ],
      extraInfo: { vi: 'Thủ đô: Thành phố Mexico. Sô-cô-la và ngô có nguồn gốc từ vùng này.', en: 'Capital: Mexico City. Chocolate and corn first came from this region.' },
    },
    {
      id: 'fun-country-gt', word: 'Guatemala', ipa: '/ˌɡwɑː.təˈmɑː.lə/', partOfSpeech: 'noun', meaningVi: 'Guatemala',
      image: { kind: 'flag', countryCode: 'gt' }, capital: 'Guatemala City', nationality: 'Guatemalan',
      examples: [
        { en: 'Guatemala has old Maya temples.', vi: 'Guatemala có những đền thờ cổ của người Maya.' },
        { en: 'The capital of Guatemala is Guatemala City.', vi: 'Thủ đô của Guatemala là Thành phố Guatemala.' },
      ],
      extraInfo: { vi: 'Thủ đô: Thành phố Guatemala. Có tàn tích Maya Tikal nổi tiếng.', en: 'Capital: Guatemala City. Home of the famous Maya ruins of Tikal.' },
    },
    {
      id: 'fun-country-bz', word: 'Belize', ipa: '/bəˈliːz/', partOfSpeech: 'noun', meaningVi: 'Belize',
      image: { kind: 'flag', countryCode: 'bz' }, capital: 'Belmopan', nationality: 'Belizean',
      examples: [
        { en: 'People in Belize speak English.', vi: 'Người dân Belize nói tiếng Anh.' },
        { en: 'The capital of Belize is Belmopan.', vi: 'Thủ đô của Belize là Belmopan.' },
      ],
      extraInfo: { vi: 'Thủ đô: Belmopan. Có "Hố xanh lớn" (Great Blue Hole) dưới biển.', en: 'Capital: Belmopan. Famous for the Great Blue Hole in the sea.' },
    },
    {
      id: 'fun-country-hn', word: 'Honduras', ipa: '/hɒnˈdjʊə.rəs/', partOfSpeech: 'noun', meaningVi: 'Honduras',
      image: { kind: 'flag', countryCode: 'hn' }, capital: 'Tegucigalpa', nationality: 'Honduran',
      examples: [
        { en: 'Honduras grows a lot of bananas and coffee.', vi: 'Honduras trồng nhiều chuối và cà phê.' },
        { en: 'The capital of Honduras is Tegucigalpa.', vi: 'Thủ đô của Honduras là Tegucigalpa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tegucigalpa. Có tàn tích Maya Copán.', en: 'Capital: Tegucigalpa. Home of the Maya ruins of Copán.' },
    },
    {
      id: 'fun-country-sv', word: 'El Salvador', ipa: '/el ˈsæl.və.dɔː/', partOfSpeech: 'noun', meaningVi: 'El Salvador',
      image: { kind: 'flag', countryCode: 'sv' }, capital: 'San Salvador', nationality: 'Salvadoran',
      examples: [
        { en: 'El Salvador is the smallest country in Central America.', vi: 'El Salvador là nước nhỏ nhất Trung Mỹ.' },
        { en: 'The capital of El Salvador is San Salvador.', vi: 'Thủ đô của El Salvador là San Salvador.' },
      ],
      extraInfo: { vi: 'Thủ đô: San Salvador. Được gọi là "vùng đất của núi lửa".', en: 'Capital: San Salvador. Known as the "Land of Volcanoes".' },
    },
    {
      id: 'fun-country-ni', word: 'Nicaragua', ipa: '/ˌnɪk.əˈræɡ.ju.ə/', partOfSpeech: 'noun', meaningVi: 'Nicaragua',
      image: { kind: 'flag', countryCode: 'ni' }, capital: 'Managua', nationality: 'Nicaraguan',
      examples: [
        { en: 'Nicaragua has many lakes and volcanoes.', vi: 'Nicaragua có nhiều hồ và núi lửa.' },
        { en: 'The capital of Nicaragua is Managua.', vi: 'Thủ đô của Nicaragua là Managua.' },
      ],
      extraInfo: { vi: 'Thủ đô: Managua. Là nước lớn nhất Trung Mỹ.', en: 'Capital: Managua. The largest country in Central America.' },
    },
    {
      id: 'fun-country-cr', word: 'Costa Rica', ipa: '/ˌkɒs.tə ˈriː.kə/', partOfSpeech: 'noun', meaningVi: 'Costa Rica',
      image: { kind: 'flag', countryCode: 'cr' }, capital: 'San José', nationality: 'Costa Rican',
      examples: [
        { en: 'Costa Rica is famous for its rainforests.', vi: 'Costa Rica nổi tiếng với rừng mưa nhiệt đới.' },
        { en: 'I saw a sloth in Costa Rica.', vi: 'Tôi đã thấy một con lười ở Costa Rica.' },
      ],
      extraInfo: { vi: 'Thủ đô: San José. Không có quân đội từ năm 1948.', en: 'Capital: San José. It has had no army since 1948.' },
    },
    {
      id: 'fun-country-pa', word: 'Panama', ipa: '/ˈpæn.ə.mɑː/', partOfSpeech: 'noun', meaningVi: 'Panama',
      image: { kind: 'flag', countryCode: 'pa' }, capital: 'Panama City', nationality: 'Panamanian',
      examples: [
        { en: 'Panama is famous for its canal.', vi: 'Panama nổi tiếng với kênh đào.' },
        { en: 'Big ships pass through Panama every day.', vi: 'Tàu lớn đi qua Panama mỗi ngày.' },
      ],
      extraInfo: { vi: 'Thủ đô: Thành phố Panama. Kênh đào Panama nối Đại Tây Dương với Thái Bình Dương.', en: 'Capital: Panama City. The Panama Canal links the Atlantic and Pacific Oceans.' },
    },

    /* ===================== CHÂU MỸ — VÙNG CARIBE ===================== */
    {
      id: 'fun-country-cu', word: 'Cuba', ipa: '/ˈkjuː.bə/', partOfSpeech: 'noun', meaningVi: 'Cuba',
      image: { kind: 'flag', countryCode: 'cu' }, capital: 'Havana', nationality: 'Cuban',
      examples: [
        { en: 'Cuba is famous for old colourful cars.', vi: 'Cuba nổi tiếng với những chiếc xe cổ nhiều màu sắc.' },
        { en: 'The capital of Cuba is Havana.', vi: 'Thủ đô của Cuba là La Habana.' },
      ],
      extraInfo: { vi: 'Thủ đô: La Habana. Là hòn đảo lớn nhất vùng Caribe.', en: 'Capital: Havana. The largest island in the Caribbean.' },
    },
    {
      id: 'fun-country-jm', word: 'Jamaica', ipa: '/dʒəˈmeɪ.kə/', partOfSpeech: 'noun', meaningVi: 'Jamaica',
      image: { kind: 'flag', countryCode: 'jm' }, capital: 'Kingston', nationality: 'Jamaican',
      examples: [
        { en: 'Usain Bolt is Jamaican.', vi: 'Usain Bolt là người Jamaica.' },
        { en: 'Reggae music comes from Jamaica.', vi: 'Nhạc reggae bắt nguồn từ Jamaica.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kingston. Quê hương của nhạc reggae và Usain Bolt.', en: 'Capital: Kingston. Home of reggae music and Usain Bolt.' },
    },
    {
      id: 'fun-country-ht', word: 'Haiti', ipa: '/ˈheɪ.ti/', partOfSpeech: 'noun', meaningVi: 'Haiti',
      image: { kind: 'flag', countryCode: 'ht' }, capital: 'Port-au-Prince', nationality: 'Haitian',
      examples: [
        { en: 'Haiti shares an island with the Dominican Republic.', vi: 'Haiti chung một hòn đảo với Cộng hòa Dominica.' },
        { en: 'The capital of Haiti is Port-au-Prince.', vi: 'Thủ đô của Haiti là Port-au-Prince.' },
      ],
      extraInfo: { vi: 'Thủ đô: Port-au-Prince. Nước cộng hòa da đen độc lập đầu tiên (1804).', en: 'Capital: Port-au-Prince. The first independent Black republic (1804).' },
    },
    {
      id: 'fun-country-do', word: 'Dominican Republic', ipa: '/dəˌmɪn.ɪ.kən rɪˈpʌb.lɪk/', partOfSpeech: 'noun', meaningVi: 'Cộng hòa Dominica',
      image: { kind: 'flag', countryCode: 'do' }, capital: 'Santo Domingo', nationality: 'Dominican',
      examples: [
        { en: 'Baseball is very popular in the Dominican Republic.', vi: 'Bóng chày rất phổ biến ở Cộng hòa Dominica.' },
        { en: 'The capital of the Dominican Republic is Santo Domingo.', vi: 'Thủ đô của Cộng hòa Dominica là Santo Domingo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Santo Domingo. Lá cờ có hình cuốn Kinh Thánh ở giữa.', en: 'Capital: Santo Domingo. Its flag has a Bible in the middle.' },
    },
    {
      id: 'fun-country-bs', word: 'Bahamas', ipa: '/bəˈhɑː.məz/', partOfSpeech: 'noun', meaningVi: 'Bahamas',
      image: { kind: 'flag', countryCode: 'bs' }, capital: 'Nassau', nationality: 'Bahamian',
      examples: [
        { en: 'The Bahamas has beaches with pink sand.', vi: 'Bahamas có những bãi biển cát hồng.' },
        { en: 'The capital of the Bahamas is Nassau.', vi: 'Thủ đô của Bahamas là Nassau.' },
      ],
      extraInfo: { vi: 'Thủ đô: Nassau. Có những chú lợn biết bơi nổi tiếng.', en: 'Capital: Nassau. Famous for its swimming pigs.' },
    },
    {
      id: 'fun-country-bb', word: 'Barbados', ipa: '/bɑːˈbeɪ.dɒs/', partOfSpeech: 'noun', meaningVi: 'Barbados',
      image: { kind: 'flag', countryCode: 'bb' }, capital: 'Bridgetown', nationality: 'Barbadian',
      examples: [
        { en: 'The singer Rihanna is from Barbados.', vi: 'Ca sĩ Rihanna đến từ Barbados.' },
        { en: 'The capital of Barbados is Bridgetown.', vi: 'Thủ đô của Barbados là Bridgetown.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bridgetown. Quê hương của ca sĩ Rihanna.', en: 'Capital: Bridgetown. Home island of the singer Rihanna.' },
    },
    {
      id: 'fun-country-tt', word: 'Trinidad and Tobago', ipa: '/ˌtrɪn.ɪ.dæd ən təˈbeɪ.ɡəʊ/', partOfSpeech: 'noun', meaningVi: 'Trinidad và Tobago',
      image: { kind: 'flag', countryCode: 'tt' }, capital: 'Port of Spain', nationality: 'Trinidadian',
      examples: [
        { en: 'The steelpan drum comes from Trinidad and Tobago.', vi: 'Trống thép (steelpan) bắt nguồn từ Trinidad và Tobago.' },
        { en: 'The capital of Trinidad and Tobago is Port of Spain.', vi: 'Thủ đô của Trinidad và Tobago là Port of Spain.' },
      ],
      extraInfo: { vi: 'Thủ đô: Port of Spain. Nơi ra đời của trống thép.', en: 'Capital: Port of Spain. Birthplace of the steelpan drum.' },
    },
    {
      id: 'fun-country-gd', word: 'Grenada', ipa: '/ɡrəˈneɪ.də/', partOfSpeech: 'noun', meaningVi: 'Grenada',
      image: { kind: 'flag', countryCode: 'gd' }, capital: "St. George's", nationality: 'Grenadian',
      examples: [
        { en: 'Grenada is called the Spice Island.', vi: 'Grenada được gọi là Đảo Gia vị.' },
        { en: 'Grenada grows a lot of nutmeg.', vi: 'Grenada trồng rất nhiều nhục đậu khấu.' },
      ],
      extraInfo: { vi: "Thủ đô: St. George's. Lá cờ có hình quả nhục đậu khấu.", en: "Capital: St. George's. Its flag shows a nutmeg." },
    },
    {
      id: 'fun-country-lc', word: 'Saint Lucia', ipa: '/seɪnt ˈluː.ʃə/', partOfSpeech: 'noun', meaningVi: 'Saint Lucia',
      image: { kind: 'flag', countryCode: 'lc' }, capital: 'Castries', nationality: 'Saint Lucian',
      examples: [
        { en: 'Saint Lucia has two famous mountains called the Pitons.', vi: 'Saint Lucia có hai ngọn núi nổi tiếng tên là Pitons.' },
        { en: 'The capital of Saint Lucia is Castries.', vi: 'Thủ đô của Saint Lucia là Castries.' },
      ],
      extraInfo: { vi: 'Thủ đô: Castries. Hai đỉnh núi Pitons xuất hiện trên lá cờ.', en: 'Capital: Castries. The two Piton peaks appear on its flag.' },
    },
    {
      id: 'fun-country-vc', word: 'Saint Vincent and the Grenadines', ipa: '/seɪnt ˌvɪn.sənt ən ðə ˌɡren.əˈdiːnz/', partOfSpeech: 'noun', meaningVi: 'Saint Vincent và Grenadines',
      image: { kind: 'flag', countryCode: 'vc' }, capital: 'Kingstown', nationality: 'Vincentian',
      examples: [
        { en: 'Saint Vincent and the Grenadines has many small islands.', vi: 'Saint Vincent và Grenadines có nhiều đảo nhỏ.' },
        { en: 'The capital of Saint Vincent and the Grenadines is Kingstown.', vi: 'Thủ đô của Saint Vincent và Grenadines là Kingstown.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kingstown. Bộ phim "Cướp biển vùng Caribe" được quay ở đây.', en: 'Capital: Kingstown. Pirates of the Caribbean was filmed here.' },
    },
    {
      id: 'fun-country-ag', word: 'Antigua and Barbuda', ipa: '/ænˌtiː.ɡə ən bɑːˈbjuː.də/', partOfSpeech: 'noun', meaningVi: 'Antigua và Barbuda',
      image: { kind: 'flag', countryCode: 'ag' }, capital: "St. John's", nationality: 'Antiguan',
      examples: [
        { en: 'Antigua and Barbuda has many beaches.', vi: 'Antigua và Barbuda có rất nhiều bãi biển.' },
        { en: 'I want to swim in Antigua and Barbuda.', vi: 'Tôi muốn bơi ở Antigua và Barbuda.' },
      ],
      extraInfo: { vi: "Thủ đô: St. John's. Người ta nói Antigua có 365 bãi biển, mỗi ngày một bãi.", en: "Capital: St. John's. Antigua is said to have 365 beaches, one for every day." },
    },
    {
      id: 'fun-country-dm', word: 'Dominica', ipa: '/ˌdɒm.ɪˈniː.kə/', partOfSpeech: 'noun', meaningVi: 'Dominica',
      image: { kind: 'flag', countryCode: 'dm' }, capital: 'Roseau', nationality: 'Dominican',
      examples: [
        { en: 'Dominica is called the Nature Island.', vi: 'Dominica được gọi là Đảo Thiên nhiên.' },
        { en: 'The capital of Dominica is Roseau.', vi: 'Thủ đô của Dominica là Roseau.' },
      ],
      extraInfo: { vi: 'Thủ đô: Roseau. Có "Hồ sôi" (Boiling Lake) nước nóng sủi bọt.', en: 'Capital: Roseau. Home of the bubbling Boiling Lake.' },
    },
    {
      id: 'fun-country-kn', word: 'Saint Kitts and Nevis', ipa: '/seɪnt ˌkɪts ən ˈniː.vɪs/', partOfSpeech: 'noun', meaningVi: 'Saint Kitts và Nevis',
      image: { kind: 'flag', countryCode: 'kn' }, capital: 'Basseterre', nationality: 'Kittitian',
      examples: [
        { en: 'Saint Kitts and Nevis is made of two islands.', vi: 'Saint Kitts và Nevis gồm hai hòn đảo.' },
        { en: 'The capital of Saint Kitts and Nevis is Basseterre.', vi: 'Thủ đô của Saint Kitts và Nevis là Basseterre.' },
      ],
      extraInfo: { vi: 'Thủ đô: Basseterre. Là quốc gia nhỏ nhất châu Mỹ.', en: 'Capital: Basseterre. The smallest country in the Americas.' },
    },

    /* ===================== CHÂU MỸ — NAM MỸ ===================== */
    {
      id: 'fun-country-br', word: 'Brazil', ipa: '/brəˈzɪl/', partOfSpeech: 'noun', meaningVi: 'Brazil',
      image: { kind: 'flag', countryCode: 'br' }, capital: 'Brasília', nationality: 'Brazilian',
      examples: [
        { en: 'Brazil has won the World Cup five times.', vi: 'Brazil đã vô địch World Cup năm lần.' },
        { en: 'Brazilian coffee is very popular.', vi: 'Cà phê Brazil rất được ưa chuộng.' },
      ],
      extraInfo: { vi: 'Thủ đô: Brasília. Có phần lớn rừng mưa Amazon.', en: 'Capital: Brasília. It has most of the Amazon rainforest.' },
    },
    {
      id: 'fun-country-ar', word: 'Argentina', ipa: '/ˌɑː.dʒənˈtiː.nə/', partOfSpeech: 'noun', meaningVi: 'Argentina',
      image: { kind: 'flag', countryCode: 'ar' }, capital: 'Buenos Aires', nationality: 'Argentine',
      examples: [
        { en: 'Lionel Messi is from Argentina.', vi: 'Lionel Messi đến từ Argentina.' },
        { en: 'The tango is a famous Argentine dance.', vi: 'Tango là điệu nhảy nổi tiếng của Argentina.' },
      ],
      extraInfo: { vi: 'Thủ đô: Buenos Aires. Quê hương của điệu tango và Messi.', en: 'Capital: Buenos Aires. Home of the tango and Messi.' },
    },
    {
      id: 'fun-country-cl', word: 'Chile', ipa: '/ˈtʃɪl.i/', partOfSpeech: 'noun', meaningVi: 'Chile',
      image: { kind: 'flag', countryCode: 'cl' }, capital: 'Santiago', nationality: 'Chilean',
      examples: [
        { en: 'Chile is a very long and thin country.', vi: 'Chile là một đất nước rất dài và hẹp.' },
        { en: 'The capital of Chile is Santiago.', vi: 'Thủ đô của Chile là Santiago.' },
      ],
      extraInfo: { vi: 'Thủ đô: Santiago. Có sa mạc Atacama, một trong những nơi khô nhất Trái Đất.', en: 'Capital: Santiago. The Atacama Desert is one of the driest places on Earth.' },
    },
    {
      id: 'fun-country-pe', word: 'Peru', ipa: '/pəˈruː/', partOfSpeech: 'noun', meaningVi: 'Peru',
      image: { kind: 'flag', countryCode: 'pe' }, capital: 'Lima', nationality: 'Peruvian',
      examples: [
        { en: 'Peru is famous for Machu Picchu.', vi: 'Peru nổi tiếng với Machu Picchu.' },
        { en: 'I want to visit Peru one day.', vi: 'Tôi muốn đến Peru vào một ngày nào đó.' },
      ],
      extraInfo: { vi: 'Thủ đô: Lima. Quê hương của khoai tây và thành cổ Machu Picchu.', en: 'Capital: Lima. Home of the potato and the ancient city of Machu Picchu.' },
    },
    {
      id: 'fun-country-co', word: 'Colombia', ipa: '/kəˈlʌm.bi.ə/', partOfSpeech: 'noun', meaningVi: 'Colombia',
      image: { kind: 'flag', countryCode: 'co' }, capital: 'Bogotá', nationality: 'Colombian',
      examples: [
        { en: 'Colombian coffee is famous.', vi: 'Cà phê Colombia rất nổi tiếng.' },
        { en: 'The capital of Colombia is Bogotá.', vi: 'Thủ đô của Colombia là Bogotá.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bogotá. Nổi tiếng với cà phê và hoa.', en: 'Capital: Bogotá. Famous for coffee and flowers.' },
    },
    {
      id: 'fun-country-ve', word: 'Venezuela', ipa: '/ˌven.əˈzweɪ.lə/', partOfSpeech: 'noun', meaningVi: 'Venezuela',
      image: { kind: 'flag', countryCode: 've' }, capital: 'Caracas', nationality: 'Venezuelan',
      examples: [
        { en: 'The highest waterfall in the world is in Venezuela.', vi: 'Thác nước cao nhất thế giới nằm ở Venezuela.' },
        { en: 'The capital of Venezuela is Caracas.', vi: 'Thủ đô của Venezuela là Caracas.' },
      ],
      extraInfo: { vi: 'Thủ đô: Caracas. Có thác Angel, thác nước cao nhất thế giới.', en: 'Capital: Caracas. Home of Angel Falls, the highest waterfall in the world.' },
    },
    {
      id: 'fun-country-ec', word: 'Ecuador', ipa: '/ˈek.wə.dɔː/', partOfSpeech: 'noun', meaningVi: 'Ecuador',
      image: { kind: 'flag', countryCode: 'ec' }, capital: 'Quito', nationality: 'Ecuadorian',
      examples: [
        { en: 'The Galápagos Islands belong to Ecuador.', vi: 'Quần đảo Galápagos thuộc về Ecuador.' },
        { en: 'The capital of Ecuador is Quito.', vi: 'Thủ đô của Ecuador là Quito.' },
      ],
      extraInfo: { vi: 'Thủ đô: Quito. Tên nước có nghĩa là "xích đạo".', en: 'Capital: Quito. Its name means "equator".' },
    },
    {
      id: 'fun-country-bo', word: 'Bolivia', ipa: '/bəˈlɪv.i.ə/', partOfSpeech: 'noun', meaningVi: 'Bolivia',
      image: { kind: 'flag', countryCode: 'bo' }, capital: 'Sucre', nationality: 'Bolivian',
      examples: [
        { en: 'Bolivia has a huge salt flat.', vi: 'Bolivia có một cánh đồng muối khổng lồ.' },
        { en: 'The capital of Bolivia is Sucre.', vi: 'Thủ đô của Bolivia là Sucre.' },
      ],
      extraInfo: { vi: 'Thủ đô: Sucre (chính phủ đặt ở La Paz). Có cánh đồng muối Uyuni lớn nhất thế giới.', en: 'Capital: Sucre (the government sits in La Paz). Home of Salar de Uyuni, the largest salt flat on Earth.' },
    },
    {
      id: 'fun-country-py', word: 'Paraguay', ipa: '/ˈpær.ə.ɡwaɪ/', partOfSpeech: 'noun', meaningVi: 'Paraguay',
      image: { kind: 'flag', countryCode: 'py' }, capital: 'Asunción', nationality: 'Paraguayan',
      examples: [
        { en: 'Paraguay has no coastline.', vi: 'Paraguay không có bờ biển.' },
        { en: 'The capital of Paraguay is Asunción.', vi: 'Thủ đô của Paraguay là Asunción.' },
      ],
      extraInfo: { vi: 'Thủ đô: Asunción. Lá cờ có hai mặt khác nhau.', en: 'Capital: Asunción. Its flag is different on the front and back.' },
    },
    {
      id: 'fun-country-uy', word: 'Uruguay', ipa: '/ˈjʊə.rə.ɡwaɪ/', partOfSpeech: 'noun', meaningVi: 'Uruguay',
      image: { kind: 'flag', countryCode: 'uy' }, capital: 'Montevideo', nationality: 'Uruguayan',
      examples: [
        { en: 'Uruguay won the first World Cup in 1930.', vi: 'Uruguay vô địch World Cup đầu tiên năm 1930.' },
        { en: 'The capital of Uruguay is Montevideo.', vi: 'Thủ đô của Uruguay là Montevideo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Montevideo. Tổ chức và vô địch World Cup đầu tiên (1930).', en: 'Capital: Montevideo. Hosted and won the first World Cup (1930).' },
    },
    {
      id: 'fun-country-gy', word: 'Guyana', ipa: '/ɡaɪˈæn.ə/', partOfSpeech: 'noun', meaningVi: 'Guyana',
      image: { kind: 'flag', countryCode: 'gy' }, capital: 'Georgetown', nationality: 'Guyanese',
      examples: [
        { en: 'People in Guyana speak English.', vi: 'Người dân Guyana nói tiếng Anh.' },
        { en: 'The capital of Guyana is Georgetown.', vi: 'Thủ đô của Guyana là Georgetown.' },
      ],
      extraInfo: { vi: 'Thủ đô: Georgetown. Nước duy nhất ở Nam Mỹ dùng tiếng Anh làm ngôn ngữ chính thức.', en: 'Capital: Georgetown. The only South American country with English as its official language.' },
    },
    {
      id: 'fun-country-sr', word: 'Suriname', ipa: '/ˌsʊə.rɪˈnæm/', partOfSpeech: 'noun', meaningVi: 'Suriname',
      image: { kind: 'flag', countryCode: 'sr' }, capital: 'Paramaribo', nationality: 'Surinamese',
      examples: [
        { en: 'People in Suriname speak Dutch.', vi: 'Người dân Suriname nói tiếng Hà Lan.' },
        { en: 'The capital of Suriname is Paramaribo.', vi: 'Thủ đô của Suriname là Paramaribo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Paramaribo. Là nước nhỏ nhất Nam Mỹ, phần lớn là rừng.', en: 'Capital: Paramaribo. The smallest country in South America, mostly covered by forest.' },
    },

    /* ===================== CHÂU PHI — BẮC PHI ===================== */
    {
      id: 'fun-country-eg', word: 'Egypt', ipa: '/ˈiː.dʒɪpt/', partOfSpeech: 'noun', meaningVi: 'Ai Cập',
      image: { kind: 'flag', countryCode: 'eg' }, capital: 'Cairo', nationality: 'Egyptian',
      examples: [
        { en: 'Egypt is famous for the pyramids.', vi: 'Ai Cập nổi tiếng với các kim tự tháp.' },
        { en: 'The River Nile flows through Egypt.', vi: 'Sông Nile chảy qua Ai Cập.' },
      ],
      extraInfo: { vi: 'Thủ đô: Cairo. Kim tự tháp Giza đã hơn 4.500 năm tuổi.', en: 'Capital: Cairo. The Pyramids of Giza are more than 4,500 years old.' },
    },
    {
      id: 'fun-country-ly', word: 'Libya', ipa: '/ˈlɪb.i.ə/', partOfSpeech: 'noun', meaningVi: 'Libya',
      image: { kind: 'flag', countryCode: 'ly' }, capital: 'Tripoli', nationality: 'Libyan',
      examples: [
        { en: 'Most of Libya is in the Sahara Desert.', vi: 'Phần lớn Libya nằm trong sa mạc Sahara.' },
        { en: 'The capital of Libya is Tripoli.', vi: 'Thủ đô của Libya là Tripoli.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tripoli. Hơn 90% lãnh thổ là sa mạc.', en: 'Capital: Tripoli. More than 90% of the country is desert.' },
    },
    {
      id: 'fun-country-tn', word: 'Tunisia', ipa: '/tjuːˈnɪz.i.ə/', partOfSpeech: 'noun', meaningVi: 'Tunisia',
      image: { kind: 'flag', countryCode: 'tn' }, capital: 'Tunis', nationality: 'Tunisian',
      examples: [
        { en: 'Some Star Wars scenes were filmed in Tunisia.', vi: 'Một số cảnh phim Chiến tranh giữa các vì sao được quay ở Tunisia.' },
        { en: 'The capital of Tunisia is Tunis.', vi: 'Thủ đô của Tunisia là Tunis.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tunis. Có tàn tích thành cổ Carthage.', en: 'Capital: Tunis. Home of the ruins of ancient Carthage.' },
    },
    {
      id: 'fun-country-dz', word: 'Algeria', ipa: '/ælˈdʒɪə.ri.ə/', partOfSpeech: 'noun', meaningVi: 'Algérie',
      image: { kind: 'flag', countryCode: 'dz' }, capital: 'Algiers', nationality: 'Algerian',
      examples: [
        { en: 'Algeria is the biggest country in Africa.', vi: 'Algérie là nước lớn nhất châu Phi.' },
        { en: 'The capital of Algeria is Algiers.', vi: 'Thủ đô của Algérie là Algiers.' },
      ],
      extraInfo: { vi: 'Thủ đô: Algiers. Là quốc gia rộng lớn nhất châu Phi.', en: 'Capital: Algiers. The largest country in Africa.' },
    },
    {
      id: 'fun-country-ma', word: 'Morocco', ipa: '/məˈrɒk.əʊ/', partOfSpeech: 'noun', meaningVi: 'Maroc',
      image: { kind: 'flag', countryCode: 'ma' }, capital: 'Rabat', nationality: 'Moroccan',
      examples: [
        { en: 'Morocco is famous for its colourful markets.', vi: 'Maroc nổi tiếng với những khu chợ đầy màu sắc.' },
        { en: 'I drank Moroccan mint tea.', vi: 'Tôi đã uống trà bạc hà kiểu Maroc.' },
      ],
      extraInfo: { vi: 'Thủ đô: Rabat. Có thành phố xanh Chefchaouen nổi tiếng.', en: 'Capital: Rabat. Famous for the blue city of Chefchaouen.' },
    },
    {
      id: 'fun-country-sd', word: 'Sudan', ipa: '/suːˈdɑːn/', partOfSpeech: 'noun', meaningVi: 'Sudan',
      image: { kind: 'flag', countryCode: 'sd' }, capital: 'Khartoum', nationality: 'Sudanese',
      examples: [
        { en: 'Sudan has more pyramids than Egypt.', vi: 'Sudan có nhiều kim tự tháp hơn Ai Cập.' },
        { en: 'The capital of Sudan is Khartoum.', vi: 'Thủ đô của Sudan là Khartoum.' },
      ],
      extraInfo: { vi: 'Thủ đô: Khartoum. Nơi sông Nile Xanh và Nile Trắng gặp nhau.', en: 'Capital: Khartoum. Where the Blue Nile and White Nile meet.' },
    },
    {
      id: 'fun-country-ss', word: 'South Sudan', ipa: '/ˌsaʊθ suːˈdɑːn/', partOfSpeech: 'noun', meaningVi: 'Nam Sudan',
      image: { kind: 'flag', countryCode: 'ss' }, capital: 'Juba', nationality: 'South Sudanese',
      examples: [
        { en: 'South Sudan is the youngest country in the world.', vi: 'Nam Sudan là quốc gia trẻ nhất thế giới.' },
        { en: 'The capital of South Sudan is Juba.', vi: 'Thủ đô của Nam Sudan là Juba.' },
      ],
      extraInfo: { vi: 'Thủ đô: Juba. Độc lập năm 2011, là nước trẻ nhất thế giới.', en: 'Capital: Juba. Independent since 2011, the newest country in the world.' },
    },

    /* ===================== CHÂU PHI — TÂY PHI ===================== */
    {
      id: 'fun-country-ng', word: 'Nigeria', ipa: '/naɪˈdʒɪə.ri.ə/', partOfSpeech: 'noun', meaningVi: 'Nigeria',
      image: { kind: 'flag', countryCode: 'ng' }, capital: 'Abuja', nationality: 'Nigerian',
      examples: [
        { en: 'Nigeria has the most people in Africa.', vi: 'Nigeria là nước đông dân nhất châu Phi.' },
        { en: 'Nigerian films are very popular.', vi: 'Phim Nigeria rất được yêu thích.' },
      ],
      extraInfo: { vi: 'Thủ đô: Abuja. Ngành điện ảnh "Nollywood" làm rất nhiều phim mỗi năm.', en: 'Capital: Abuja. Its "Nollywood" film industry makes a huge number of films.' },
    },
    {
      id: 'fun-country-gh', word: 'Ghana', ipa: '/ˈɡɑː.nə/', partOfSpeech: 'noun', meaningVi: 'Ghana',
      image: { kind: 'flag', countryCode: 'gh' }, capital: 'Accra', nationality: 'Ghanaian',
      examples: [
        { en: 'Ghana grows a lot of cocoa.', vi: 'Ghana trồng rất nhiều ca cao.' },
        { en: 'The capital of Ghana is Accra.', vi: 'Thủ đô của Ghana là Accra.' },
      ],
      extraInfo: { vi: 'Thủ đô: Accra. Một trong những nước trồng ca cao lớn nhất thế giới.', en: 'Capital: Accra. One of the biggest cocoa growers in the world.' },
    },
    {
      id: 'fun-country-ci', word: 'Ivory Coast', ipa: '/ˌaɪ.vər.i ˈkəʊst/', partOfSpeech: 'noun', meaningVi: 'Bờ Biển Ngà',
      image: { kind: 'flag', countryCode: 'ci' }, capital: 'Yamoussoukro', nationality: 'Ivorian',
      examples: [
        { en: 'Ivory Coast grows the most cocoa in the world.', vi: 'Bờ Biển Ngà trồng nhiều ca cao nhất thế giới.' },
        { en: 'The capital of Ivory Coast is Yamoussoukro.', vi: 'Thủ đô của Bờ Biển Ngà là Yamoussoukro.' },
      ],
      extraInfo: { vi: 'Thủ đô: Yamoussoukro. Tên chính thức là Côte d\'Ivoire, nước trồng ca cao số 1 thế giới.', en: 'Capital: Yamoussoukro. Officially Côte d\'Ivoire, the top cocoa grower in the world.' },
    },
    {
      id: 'fun-country-sn', word: 'Senegal', ipa: '/ˌsen.ɪˈɡɔːl/', partOfSpeech: 'noun', meaningVi: 'Sénégal',
      image: { kind: 'flag', countryCode: 'sn' }, capital: 'Dakar', nationality: 'Senegalese',
      examples: [
        { en: 'Senegal has a pink lake.', vi: 'Sénégal có một hồ nước màu hồng.' },
        { en: 'The capital of Senegal is Dakar.', vi: 'Thủ đô của Sénégal là Dakar.' },
      ],
      extraInfo: { vi: 'Thủ đô: Dakar. Có hồ Retba nước màu hồng.', en: 'Capital: Dakar. Home of Lake Retba, a pink lake.' },
    },
    {
      id: 'fun-country-gm', word: 'Gambia', ipa: '/ˈɡæm.bi.ə/', partOfSpeech: 'noun', meaningVi: 'Gambia',
      image: { kind: 'flag', countryCode: 'gm' }, capital: 'Banjul', nationality: 'Gambian',
      examples: [
        { en: 'Gambia is surrounded by Senegal.', vi: 'Gambia được bao quanh bởi Sénégal.' },
        { en: 'People in Gambia speak English.', vi: 'Người dân Gambia nói tiếng Anh.' },
      ],
      extraInfo: { vi: 'Thủ đô: Banjul. Nước nhỏ nhất trên đất liền châu Phi, chạy dọc theo sông Gambia.', en: 'Capital: Banjul. The smallest country on mainland Africa, along the Gambia River.' },
    },
    {
      id: 'fun-country-gw', word: 'Guinea-Bissau', ipa: '/ˌɡɪn.i bɪˈsaʊ/', partOfSpeech: 'noun', meaningVi: 'Guinea-Bissau',
      image: { kind: 'flag', countryCode: 'gw' }, capital: 'Bissau', nationality: 'Bissau-Guinean',
      examples: [
        { en: 'People in Guinea-Bissau speak Portuguese.', vi: 'Người dân Guinea-Bissau nói tiếng Bồ Đào Nha.' },
        { en: 'The capital of Guinea-Bissau is Bissau.', vi: 'Thủ đô của Guinea-Bissau là Bissau.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bissau. Nổi tiếng với hạt điều.', en: 'Capital: Bissau. Famous for growing cashew nuts.' },
    },
    {
      id: 'fun-country-gn', word: 'Guinea', ipa: '/ˈɡɪn.i/', partOfSpeech: 'noun', meaningVi: 'Guinée',
      image: { kind: 'flag', countryCode: 'gn' }, capital: 'Conakry', nationality: 'Guinean',
      examples: [
        { en: 'Many big rivers start in Guinea.', vi: 'Nhiều con sông lớn bắt nguồn từ Guinée.' },
        { en: 'The capital of Guinea is Conakry.', vi: 'Thủ đô của Guinée là Conakry.' },
      ],
      extraInfo: { vi: 'Thủ đô: Conakry. Sông Niger bắt nguồn từ đây.', en: 'Capital: Conakry. The Niger River begins here.' },
    },
    {
      id: 'fun-country-sl', word: 'Sierra Leone', ipa: '/siˌer.ə liˈəʊn/', partOfSpeech: 'noun', meaningVi: 'Sierra Leone',
      image: { kind: 'flag', countryCode: 'sl' }, capital: 'Freetown', nationality: 'Sierra Leonean',
      examples: [
        { en: 'Sierra Leone means "lion mountains".', vi: 'Sierra Leone có nghĩa là "dãy núi sư tử".' },
        { en: 'The capital of Sierra Leone is Freetown.', vi: 'Thủ đô của Sierra Leone là Freetown.' },
      ],
      extraInfo: { vi: 'Thủ đô: Freetown. Nổi tiếng với kim cương.', en: 'Capital: Freetown. Famous for diamonds.' },
    },
    {
      id: 'fun-country-lr', word: 'Liberia', ipa: '/laɪˈbɪə.ri.ə/', partOfSpeech: 'noun', meaningVi: 'Liberia',
      image: { kind: 'flag', countryCode: 'lr' }, capital: 'Monrovia', nationality: 'Liberian',
      examples: [
        { en: 'Liberia is the oldest republic in Africa.', vi: 'Liberia là nước cộng hòa lâu đời nhất châu Phi.' },
        { en: 'The capital of Liberia is Monrovia.', vi: 'Thủ đô của Liberia là Monrovia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Monrovia. Thủ đô được đặt theo tên Tổng thống Mỹ James Monroe.', en: 'Capital: Monrovia. Named after US President James Monroe.' },
    },
    {
      id: 'fun-country-ml', word: 'Mali', ipa: '/ˈmɑː.li/', partOfSpeech: 'noun', meaningVi: 'Mali',
      image: { kind: 'flag', countryCode: 'ml' }, capital: 'Bamako', nationality: 'Malian',
      examples: [
        { en: 'Mali is famous for the old city of Timbuktu.', vi: 'Mali nổi tiếng với thành phố cổ Timbuktu.' },
        { en: 'The capital of Mali is Bamako.', vi: 'Thủ đô của Mali là Bamako.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bamako. Có Đại thánh đường Djenné làm bằng bùn lớn nhất thế giới.', en: 'Capital: Bamako. The Great Mosque of Djenné is the largest mud building in the world.' },
    },
    {
      id: 'fun-country-bf', word: 'Burkina Faso', ipa: '/bɜːˌkiː.nə ˈfæs.əʊ/', partOfSpeech: 'noun', meaningVi: 'Burkina Faso',
      image: { kind: 'flag', countryCode: 'bf' }, capital: 'Ouagadougou', nationality: 'Burkinabe',
      examples: [
        { en: 'Burkina Faso means "land of honest people".', vi: 'Burkina Faso có nghĩa là "vùng đất của những người chính trực".' },
        { en: 'The capital of Burkina Faso is Ouagadougou.', vi: 'Thủ đô của Burkina Faso là Ouagadougou.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ouagadougou. Tổ chức liên hoan phim lớn nhất châu Phi (FESPACO).', en: 'Capital: Ouagadougou. Hosts FESPACO, the biggest film festival in Africa.' },
    },
    {
      id: 'fun-country-ne', word: 'Niger', ipa: '/niːˈʒeə/', partOfSpeech: 'noun', meaningVi: 'Niger',
      image: { kind: 'flag', countryCode: 'ne' }, capital: 'Niamey', nationality: 'Nigerien',
      examples: [
        { en: 'Niger is named after the Niger River.', vi: 'Niger được đặt tên theo sông Niger.' },
        { en: 'The capital of Niger is Niamey.', vi: 'Thủ đô của Niger là Niamey.' },
      ],
      extraInfo: { vi: 'Thủ đô: Niamey. Phần lớn lãnh thổ nằm trong sa mạc Sahara.', en: 'Capital: Niamey. Most of the country is in the Sahara Desert.' },
    },
    {
      id: 'fun-country-mr', word: 'Mauritania', ipa: '/ˌmɒr.ɪˈteɪ.ni.ə/', partOfSpeech: 'noun', meaningVi: 'Mauritania',
      image: { kind: 'flag', countryCode: 'mr' }, capital: 'Nouakchott', nationality: 'Mauritanian',
      examples: [
        { en: 'Mauritania has a giant circle in the desert.', vi: 'Mauritania có một vòng tròn khổng lồ trên sa mạc.' },
        { en: 'The capital of Mauritania is Nouakchott.', vi: 'Thủ đô của Mauritania là Nouakchott.' },
      ],
      extraInfo: { vi: 'Thủ đô: Nouakchott. Có "Con mắt Sahara" nhìn thấy được từ không gian.', en: 'Capital: Nouakchott. The "Eye of the Sahara" can be seen from space.' },
    },
    {
      id: 'fun-country-cv', word: 'Cape Verde', ipa: '/ˌkeɪp ˈvɜːd/', partOfSpeech: 'noun', meaningVi: 'Cabo Verde',
      image: { kind: 'flag', countryCode: 'cv' }, capital: 'Praia', nationality: 'Cape Verdean',
      examples: [
        { en: 'Cape Verde is a group of islands in the Atlantic.', vi: 'Cabo Verde là một quần đảo ở Đại Tây Dương.' },
        { en: 'The capital of Cape Verde is Praia.', vi: 'Thủ đô của Cabo Verde là Praia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Praia. Gồm 10 hòn đảo núi lửa.', en: 'Capital: Praia. Made up of 10 volcanic islands.' },
    },
    {
      id: 'fun-country-tg', word: 'Togo', ipa: '/ˈtəʊ.ɡəʊ/', partOfSpeech: 'noun', meaningVi: 'Togo',
      image: { kind: 'flag', countryCode: 'tg' }, capital: 'Lomé', nationality: 'Togolese',
      examples: [
        { en: 'Togo is a long and narrow country.', vi: 'Togo là một đất nước dài và hẹp.' },
        { en: 'The capital of Togo is Lomé.', vi: 'Thủ đô của Togo là Lomé.' },
      ],
      extraInfo: { vi: 'Thủ đô: Lomé. Có những ngôi nhà tháp bằng bùn của người Batammariba.', en: 'Capital: Lomé. Known for the mud tower-houses of the Batammariba people.' },
    },
    {
      id: 'fun-country-bj', word: 'Benin', ipa: '/beˈniːn/', partOfSpeech: 'noun', meaningVi: 'Bénin',
      image: { kind: 'flag', countryCode: 'bj' }, capital: 'Porto-Novo', nationality: 'Beninese',
      examples: [
        { en: 'Benin has a village built on a lake.', vi: 'Bénin có một ngôi làng xây trên hồ.' },
        { en: 'The capital of Benin is Porto-Novo.', vi: 'Thủ đô của Bénin là Porto-Novo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Porto-Novo. Làng nổi Ganvie được gọi là "Venice của châu Phi".', en: 'Capital: Porto-Novo. The lake village of Ganvie is called the "Venice of Africa".' },
    },

    /* ===================== CHÂU PHI — TRUNG PHI ===================== */
    {
      id: 'fun-country-cm', word: 'Cameroon', ipa: '/ˌkæm.əˈruːn/', partOfSpeech: 'noun', meaningVi: 'Cameroon',
      image: { kind: 'flag', countryCode: 'cm' }, capital: 'Yaoundé', nationality: 'Cameroonian',
      examples: [
        { en: 'Cameroon is called "Africa in miniature".', vi: 'Cameroon được gọi là "châu Phi thu nhỏ".' },
        { en: 'The capital of Cameroon is Yaoundé.', vi: 'Thủ đô của Cameroon là Yaoundé.' },
      ],
      extraInfo: { vi: 'Thủ đô: Yaoundé. Có đủ biển, núi, rừng mưa và thảo nguyên.', en: 'Capital: Yaoundé. It has beaches, mountains, rainforest and savannah.' },
    },
    {
      id: 'fun-country-td', word: 'Chad', ipa: '/tʃæd/', partOfSpeech: 'noun', meaningVi: 'Tchad',
      image: { kind: 'flag', countryCode: 'td' }, capital: "N'Djamena", nationality: 'Chadian',
      examples: [
        { en: 'Chad is named after Lake Chad.', vi: 'Tchad được đặt tên theo hồ Tchad.' },
        { en: 'Chad has no coastline.', vi: 'Tchad không có bờ biển.' },
      ],
      extraInfo: { vi: "Thủ đô: N'Djamena. Lá cờ gần giống hệt cờ Romania.", en: "Capital: N'Djamena. Its flag is almost the same as Romania's." },
    },
    {
      id: 'fun-country-cf', word: 'Central African Republic', ipa: '/ˌsen.trəl ˌæf.rɪ.kən rɪˈpʌb.lɪk/', partOfSpeech: 'noun', meaningVi: 'Cộng hòa Trung Phi',
      image: { kind: 'flag', countryCode: 'cf' }, capital: 'Bangui', nationality: 'Central African',
      examples: [
        { en: 'The Central African Republic is in the middle of Africa.', vi: 'Cộng hòa Trung Phi nằm ở giữa châu Phi.' },
        { en: 'The capital of the Central African Republic is Bangui.', vi: 'Thủ đô của Cộng hòa Trung Phi là Bangui.' },
      ],
      extraInfo: { vi: 'Thủ đô: Bangui. Có nhiều voi rừng và khỉ đột.', en: 'Capital: Bangui. Home to forest elephants and gorillas.' },
    },
    {
      id: 'fun-country-gq', word: 'Equatorial Guinea', ipa: '/ˌek.wəˌtɔː.ri.əl ˈɡɪn.i/', partOfSpeech: 'noun', meaningVi: 'Guinea Xích Đạo',
      image: { kind: 'flag', countryCode: 'gq' }, capital: 'Malabo', nationality: 'Equatorial Guinean',
      examples: [
        { en: 'People in Equatorial Guinea speak Spanish.', vi: 'Người dân Guinea Xích Đạo nói tiếng Tây Ban Nha.' },
        { en: 'The capital of Equatorial Guinea is Malabo.', vi: 'Thủ đô của Guinea Xích Đạo là Malabo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Malabo. Nước duy nhất ở châu Phi dùng tiếng Tây Ban Nha làm ngôn ngữ chính thức.', en: 'Capital: Malabo. The only African country with Spanish as an official language.' },
    },
    {
      id: 'fun-country-ga', word: 'Gabon', ipa: '/ɡæˈbɒn/', partOfSpeech: 'noun', meaningVi: 'Gabon',
      image: { kind: 'flag', countryCode: 'ga' }, capital: 'Libreville', nationality: 'Gabonese',
      examples: [
        { en: 'Most of Gabon is covered by rainforest.', vi: 'Phần lớn Gabon được rừng mưa bao phủ.' },
        { en: 'The capital of Gabon is Libreville.', vi: 'Thủ đô của Gabon là Libreville.' },
      ],
      extraInfo: { vi: 'Thủ đô: Libreville. Khoảng 88% đất nước là rừng.', en: 'Capital: Libreville. About 88% of the country is forest.' },
    },
    {
      id: 'fun-country-cg', word: 'Republic of the Congo', ipa: '/rɪˌpʌb.lɪk əv ðə ˈkɒŋ.ɡəʊ/', partOfSpeech: 'noun', meaningVi: 'Cộng hòa Congo',
      image: { kind: 'flag', countryCode: 'cg' }, capital: 'Brazzaville', nationality: 'Congolese',
      examples: [
        { en: 'The Republic of the Congo has many gorillas.', vi: 'Cộng hòa Congo có rất nhiều khỉ đột.' },
        { en: 'The capital of the Republic of the Congo is Brazzaville.', vi: 'Thủ đô của Cộng hòa Congo là Brazzaville.' },
      ],
      extraInfo: { vi: 'Thủ đô: Brazzaville. Nằm đối diện Kinshasa qua sông Congo.', en: 'Capital: Brazzaville. It faces Kinshasa across the Congo River.' },
    },
    {
      id: 'fun-country-cd', word: 'Democratic Republic of the Congo', ipa: '/ˌdem.əˌkræt.ɪk rɪˌpʌb.lɪk əv ðə ˈkɒŋ.ɡəʊ/', partOfSpeech: 'noun', meaningVi: 'Cộng hòa Dân chủ Congo',
      image: { kind: 'flag', countryCode: 'cd' }, capital: 'Kinshasa', nationality: 'Congolese',
      examples: [
        { en: 'The Democratic Republic of the Congo is a huge country.', vi: 'Cộng hòa Dân chủ Congo là một đất nước rộng lớn.' },
        { en: 'The capital of the Democratic Republic of the Congo is Kinshasa.', vi: 'Thủ đô của Cộng hòa Dân chủ Congo là Kinshasa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kinshasa. Sông Congo là con sông sâu nhất thế giới.', en: 'Capital: Kinshasa. The Congo River is the deepest river in the world.' },
    },
    {
      id: 'fun-country-st', word: 'Sao Tome and Principe', ipa: '/ˌsaʊ təˌmeɪ ən ˈprɪn.sɪ.peɪ/', partOfSpeech: 'noun', meaningVi: 'São Tomé và Príncipe',
      image: { kind: 'flag', countryCode: 'st' }, capital: 'São Tomé', nationality: 'Santomean',
      examples: [
        { en: 'Sao Tome and Principe is made of two main islands.', vi: 'São Tomé và Príncipe gồm hai hòn đảo chính.' },
        { en: 'Sao Tome and Principe is famous for cocoa.', vi: 'São Tomé và Príncipe nổi tiếng với ca cao.' },
      ],
      extraInfo: { vi: 'Thủ đô: São Tomé. Nằm rất gần đường xích đạo.', en: 'Capital: São Tomé. It lies very close to the equator.' },
    },

    /* ===================== CHÂU PHI — ĐÔNG PHI ===================== */
    {
      id: 'fun-country-et', word: 'Ethiopia', ipa: '/ˌiː.θiˈəʊ.pi.ə/', partOfSpeech: 'noun', meaningVi: 'Ethiopia',
      image: { kind: 'flag', countryCode: 'et' }, capital: 'Addis Ababa', nationality: 'Ethiopian',
      examples: [
        { en: 'Coffee was first found in Ethiopia.', vi: 'Cà phê được phát hiện đầu tiên ở Ethiopia.' },
        { en: 'Ethiopian runners are very fast.', vi: 'Các vận động viên chạy Ethiopia rất nhanh.' },
      ],
      extraInfo: { vi: 'Thủ đô: Addis Ababa. Quê hương của cà phê, có lịch riêng 13 tháng.', en: 'Capital: Addis Ababa. The birthplace of coffee, with its own 13-month calendar.' },
    },
    {
      id: 'fun-country-er', word: 'Eritrea', ipa: '/ˌer.ɪˈtreɪ.ə/', partOfSpeech: 'noun', meaningVi: 'Eritrea',
      image: { kind: 'flag', countryCode: 'er' }, capital: 'Asmara', nationality: 'Eritrean',
      examples: [
        { en: 'Eritrea is next to the Red Sea.', vi: 'Eritrea nằm cạnh Biển Đỏ.' },
        { en: 'The capital of Eritrea is Asmara.', vi: 'Thủ đô của Eritrea là Asmara.' },
      ],
      extraInfo: { vi: 'Thủ đô: Asmara. Thành phố có nhiều tòa nhà kiểu Ý thập niên 1930.', en: 'Capital: Asmara. The city has many Italian-style buildings from the 1930s.' },
    },
    {
      id: 'fun-country-dj', word: 'Djibouti', ipa: '/dʒɪˈbuː.ti/', partOfSpeech: 'noun', meaningVi: 'Djibouti',
      image: { kind: 'flag', countryCode: 'dj' }, capital: 'Djibouti', nationality: 'Djiboutian',
      examples: [
        { en: 'Djibouti is a small country in the Horn of Africa.', vi: 'Djibouti là một nước nhỏ ở vùng Sừng châu Phi.' },
        { en: 'The capital of Djibouti is also called Djibouti.', vi: 'Thủ đô của Djibouti cũng tên là Djibouti.' },
      ],
      extraInfo: { vi: 'Thủ đô: Djibouti. Hồ Assal là điểm thấp nhất châu Phi.', en: 'Capital: Djibouti. Lake Assal is the lowest point in Africa.' },
    },
    {
      id: 'fun-country-so', word: 'Somalia', ipa: '/səˈmɑː.li.ə/', partOfSpeech: 'noun', meaningVi: 'Somalia',
      image: { kind: 'flag', countryCode: 'so' }, capital: 'Mogadishu', nationality: 'Somali',
      examples: [
        { en: 'Somalia has a very long coastline.', vi: 'Somalia có đường bờ biển rất dài.' },
        { en: 'The capital of Somalia is Mogadishu.', vi: 'Thủ đô của Somalia là Mogadishu.' },
      ],
      extraInfo: { vi: 'Thủ đô: Mogadishu. Có đường bờ biển dài nhất châu Phi lục địa.', en: 'Capital: Mogadishu. It has the longest coastline on mainland Africa.' },
    },
    {
      id: 'fun-country-ke', word: 'Kenya', ipa: '/ˈken.jə/', partOfSpeech: 'noun', meaningVi: 'Kenya',
      image: { kind: 'flag', countryCode: 'ke' }, capital: 'Nairobi', nationality: 'Kenyan',
      examples: [
        { en: 'I want to go on a safari in Kenya.', vi: 'Tôi muốn đi xem thú hoang dã (safari) ở Kenya.' },
        { en: 'Kenyan runners win many races.', vi: 'Vận động viên chạy Kenya thắng rất nhiều cuộc đua.' },
      ],
      extraInfo: { vi: 'Thủ đô: Nairobi. Nổi tiếng với các chuyến safari xem sư tử, voi.', en: 'Capital: Nairobi. Famous for safaris to see lions and elephants.' },
    },
    {
      id: 'fun-country-ug', word: 'Uganda', ipa: '/juːˈɡæn.də/', partOfSpeech: 'noun', meaningVi: 'Uganda',
      image: { kind: 'flag', countryCode: 'ug' }, capital: 'Kampala', nationality: 'Ugandan',
      examples: [
        { en: 'You can see mountain gorillas in Uganda.', vi: 'Bạn có thể thấy khỉ đột núi ở Uganda.' },
        { en: 'The capital of Uganda is Kampala.', vi: 'Thủ đô của Uganda là Kampala.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kampala. Được gọi là "Hòn ngọc châu Phi".', en: 'Capital: Kampala. Known as the "Pearl of Africa".' },
    },
    {
      id: 'fun-country-rw', word: 'Rwanda', ipa: '/ruˈæn.də/', partOfSpeech: 'noun', meaningVi: 'Rwanda',
      image: { kind: 'flag', countryCode: 'rw' }, capital: 'Kigali', nationality: 'Rwandan',
      examples: [
        { en: 'Rwanda is called the land of a thousand hills.', vi: 'Rwanda được gọi là vùng đất nghìn đồi.' },
        { en: 'Rwanda is very clean.', vi: 'Rwanda rất sạch sẽ.' },
      ],
      extraInfo: { vi: 'Thủ đô: Kigali. Đã cấm túi ni-lông từ năm 2008.', en: 'Capital: Kigali. It banned plastic bags in 2008.' },
    },
    {
      id: 'fun-country-bi', word: 'Burundi', ipa: '/bʊˈrʊn.di/', partOfSpeech: 'noun', meaningVi: 'Burundi',
      image: { kind: 'flag', countryCode: 'bi' }, capital: 'Gitega', nationality: 'Burundian',
      examples: [
        { en: 'Burundi is famous for its drummers.', vi: 'Burundi nổi tiếng với những tay trống.' },
        { en: 'The capital of Burundi is Gitega.', vi: 'Thủ đô của Burundi là Gitega.' },
      ],
      extraInfo: { vi: 'Thủ đô: Gitega. Điệu trống hoàng gia là di sản văn hóa của UNESCO.', en: 'Capital: Gitega. Its royal drum dance is on the UNESCO heritage list.' },
    },
    {
      id: 'fun-country-tz', word: 'Tanzania', ipa: '/ˌtæn.zəˈniː.ə/', partOfSpeech: 'noun', meaningVi: 'Tanzania',
      image: { kind: 'flag', countryCode: 'tz' }, capital: 'Dodoma', nationality: 'Tanzanian',
      examples: [
        { en: 'Mount Kilimanjaro is in Tanzania.', vi: 'Núi Kilimanjaro nằm ở Tanzania.' },
        { en: 'I want to visit Zanzibar in Tanzania.', vi: 'Tôi muốn đến Zanzibar ở Tanzania.' },
      ],
      extraInfo: { vi: 'Thủ đô: Dodoma. Có núi Kilimanjaro, đỉnh cao nhất châu Phi.', en: 'Capital: Dodoma. Home of Mount Kilimanjaro, the highest peak in Africa.' },
    },
    {
      id: 'fun-country-sc', word: 'Seychelles', ipa: '/seɪˈʃelz/', partOfSpeech: 'noun', meaningVi: 'Seychelles',
      image: { kind: 'flag', countryCode: 'sc' }, capital: 'Victoria', nationality: 'Seychellois',
      examples: [
        { en: 'Seychelles has giant tortoises.', vi: 'Seychelles có những con rùa khổng lồ.' },
        { en: 'The capital of Seychelles is Victoria.', vi: 'Thủ đô của Seychelles là Victoria.' },
      ],
      extraInfo: { vi: 'Thủ đô: Victoria. Là nước ít dân nhất châu Phi.', en: 'Capital: Victoria. The African country with the fewest people.' },
    },
    {
      id: 'fun-country-km', word: 'Comoros', ipa: '/ˈkɒm.ə.rəʊz/', partOfSpeech: 'noun', meaningVi: 'Comoros',
      image: { kind: 'flag', countryCode: 'km' }, capital: 'Moroni', nationality: 'Comorian',
      examples: [
        { en: 'Comoros is a group of islands near Madagascar.', vi: 'Comoros là một quần đảo gần Madagascar.' },
        { en: 'The capital of Comoros is Moroni.', vi: 'Thủ đô của Comoros là Moroni.' },
      ],
      extraInfo: { vi: 'Thủ đô: Moroni. Được gọi là "Quần đảo hương hoa" vì trồng hoa ngọc lan tây.', en: 'Capital: Moroni. Called the "Perfume Islands" for its ylang-ylang flowers.' },
    },
    {
      id: 'fun-country-mg', word: 'Madagascar', ipa: '/ˌmæd.əˈɡæs.kə/', partOfSpeech: 'noun', meaningVi: 'Madagascar',
      image: { kind: 'flag', countryCode: 'mg' }, capital: 'Antananarivo', nationality: 'Malagasy',
      examples: [
        { en: 'Lemurs live only in Madagascar.', vi: 'Vượn cáo chỉ sống ở Madagascar.' },
        { en: 'Madagascar is a very big island.', vi: 'Madagascar là một hòn đảo rất lớn.' },
      ],
      extraInfo: { vi: 'Thủ đô: Antananarivo. Quê hương của vượn cáo và nhiều vani nhất thế giới.', en: 'Capital: Antananarivo. Home of lemurs and the top vanilla grower in the world.' },
    },
    {
      id: 'fun-country-mu', word: 'Mauritius', ipa: '/məˈrɪʃ.əs/', partOfSpeech: 'noun', meaningVi: 'Mauritius',
      image: { kind: 'flag', countryCode: 'mu' }, capital: 'Port Louis', nationality: 'Mauritian',
      examples: [
        { en: 'The dodo bird lived in Mauritius.', vi: 'Chim dodo từng sống ở Mauritius.' },
        { en: 'The capital of Mauritius is Port Louis.', vi: 'Thủ đô của Mauritius là Port Louis.' },
      ],
      extraInfo: { vi: 'Thủ đô: Port Louis. Là quê hương của loài chim dodo đã tuyệt chủng.', en: 'Capital: Port Louis. Home of the dodo, a bird that is now extinct.' },
    },

    /* ===================== CHÂU PHI — NAM PHI ===================== */
    {
      id: 'fun-country-za', word: 'South Africa', ipa: '/ˌsaʊθ ˈæf.rɪ.kə/', partOfSpeech: 'noun', meaningVi: 'Nam Phi',
      image: { kind: 'flag', countryCode: 'za' }, capital: 'Pretoria', nationality: 'South African',
      examples: [
        { en: 'South Africa has three capital cities.', vi: 'Nam Phi có ba thủ đô.' },
        { en: 'Nelson Mandela was South African.', vi: 'Nelson Mandela là người Nam Phi.' },
      ],
      extraInfo: { vi: 'Thủ đô: Pretoria (cùng Cape Town và Bloemfontein). Có 12 ngôn ngữ chính thức.', en: 'Capital: Pretoria (with Cape Town and Bloemfontein). It has 12 official languages.' },
    },
    {
      id: 'fun-country-na', word: 'Namibia', ipa: '/nəˈmɪb.i.ə/', partOfSpeech: 'noun', meaningVi: 'Namibia',
      image: { kind: 'flag', countryCode: 'na' }, capital: 'Windhoek', nationality: 'Namibian',
      examples: [
        { en: 'Namibia has huge red sand dunes.', vi: 'Namibia có những đồi cát đỏ khổng lồ.' },
        { en: 'The capital of Namibia is Windhoek.', vi: 'Thủ đô của Namibia là Windhoek.' },
      ],
      extraInfo: { vi: 'Thủ đô: Windhoek. Có sa mạc Namib, một trong những sa mạc cổ nhất thế giới.', en: 'Capital: Windhoek. The Namib is one of the oldest deserts in the world.' },
    },
    {
      id: 'fun-country-bw', word: 'Botswana', ipa: '/bɒtˈswɑː.nə/', partOfSpeech: 'noun', meaningVi: 'Botswana',
      image: { kind: 'flag', countryCode: 'bw' }, capital: 'Gaborone', nationality: 'Botswanan',
      examples: [
        { en: 'Botswana has more elephants than any other country.', vi: 'Botswana có nhiều voi hơn bất kỳ nước nào khác.' },
        { en: 'The capital of Botswana is Gaborone.', vi: 'Thủ đô của Botswana là Gaborone.' },
      ],
      extraInfo: { vi: 'Thủ đô: Gaborone. Có nhiều voi nhất thế giới và đồng bằng Okavango.', en: 'Capital: Gaborone. Home to the most elephants in the world and the Okavango Delta.' },
    },
    {
      id: 'fun-country-zw', word: 'Zimbabwe', ipa: '/zɪmˈbɑːb.weɪ/', partOfSpeech: 'noun', meaningVi: 'Zimbabwe',
      image: { kind: 'flag', countryCode: 'zw' }, capital: 'Harare', nationality: 'Zimbabwean',
      examples: [
        { en: 'Victoria Falls is between Zimbabwe and Zambia.', vi: 'Thác Victoria nằm giữa Zimbabwe và Zambia.' },
        { en: 'The capital of Zimbabwe is Harare.', vi: 'Thủ đô của Zimbabwe là Harare.' },
      ],
      extraInfo: { vi: 'Thủ đô: Harare. Có tàn tích Đại Zimbabwe bằng đá cổ.', en: 'Capital: Harare. Home of the ancient stone ruins of Great Zimbabwe.' },
    },
    {
      id: 'fun-country-zm', word: 'Zambia', ipa: '/ˈzæm.bi.ə/', partOfSpeech: 'noun', meaningVi: 'Zambia',
      image: { kind: 'flag', countryCode: 'zm' }, capital: 'Lusaka', nationality: 'Zambian',
      examples: [
        { en: 'Zambia is famous for Victoria Falls.', vi: 'Zambia nổi tiếng với thác Victoria.' },
        { en: 'The capital of Zambia is Lusaka.', vi: 'Thủ đô của Zambia là Lusaka.' },
      ],
      extraInfo: { vi: 'Thủ đô: Lusaka. Thác Victoria là một trong những thác lớn nhất thế giới.', en: 'Capital: Lusaka. Victoria Falls is one of the largest waterfalls in the world.' },
    },
    {
      id: 'fun-country-mw', word: 'Malawi', ipa: '/məˈlɑː.wi/', partOfSpeech: 'noun', meaningVi: 'Malawi',
      image: { kind: 'flag', countryCode: 'mw' }, capital: 'Lilongwe', nationality: 'Malawian',
      examples: [
        { en: 'Malawi has a very big lake.', vi: 'Malawi có một hồ nước rất lớn.' },
        { en: 'The capital of Malawi is Lilongwe.', vi: 'Thủ đô của Malawi là Lilongwe.' },
      ],
      extraInfo: { vi: 'Thủ đô: Lilongwe. Hồ Malawi có nhiều loài cá hơn bất kỳ hồ nào khác.', en: 'Capital: Lilongwe. Lake Malawi has more fish species than any other lake.' },
    },
    {
      id: 'fun-country-mz', word: 'Mozambique', ipa: '/ˌməʊ.zæmˈbiːk/', partOfSpeech: 'noun', meaningVi: 'Mozambique',
      image: { kind: 'flag', countryCode: 'mz' }, capital: 'Maputo', nationality: 'Mozambican',
      examples: [
        { en: 'People in Mozambique speak Portuguese.', vi: 'Người dân Mozambique nói tiếng Bồ Đào Nha.' },
        { en: 'The capital of Mozambique is Maputo.', vi: 'Thủ đô của Mozambique là Maputo.' },
      ],
      extraInfo: { vi: 'Thủ đô: Maputo. Lá cờ có hình khẩu súng AK-47.', en: 'Capital: Maputo. Its flag shows an AK-47 rifle.' },
    },
    {
      id: 'fun-country-ao', word: 'Angola', ipa: '/æŋˈɡəʊ.lə/', partOfSpeech: 'noun', meaningVi: 'Angola',
      image: { kind: 'flag', countryCode: 'ao' }, capital: 'Luanda', nationality: 'Angolan',
      examples: [
        { en: 'Angola is rich in oil and diamonds.', vi: 'Angola giàu dầu mỏ và kim cương.' },
        { en: 'The capital of Angola is Luanda.', vi: 'Thủ đô của Angola là Luanda.' },
      ],
      extraInfo: { vi: 'Thủ đô: Luanda. Có thác Kalandula, một trong những thác lớn nhất châu Phi.', en: 'Capital: Luanda. Home of Kalandula Falls, one of the largest waterfalls in Africa.' },
    },
    {
      id: 'fun-country-ls', word: 'Lesotho', ipa: '/ləˈsuː.tuː/', partOfSpeech: 'noun', meaningVi: 'Lesotho',
      image: { kind: 'flag', countryCode: 'ls' }, capital: 'Maseru', nationality: 'Basotho',
      examples: [
        { en: 'Lesotho is completely surrounded by South Africa.', vi: 'Lesotho bị Nam Phi bao quanh hoàn toàn.' },
        { en: 'The capital of Lesotho is Maseru.', vi: 'Thủ đô của Lesotho là Maseru.' },
      ],
      extraInfo: { vi: 'Thủ đô: Maseru. Toàn bộ đất nước nằm trên độ cao hơn 1.000 mét.', en: 'Capital: Maseru. The whole country is more than 1,000 metres above sea level.' },
    },
    {
      id: 'fun-country-sz', word: 'Eswatini', ipa: '/ˌes.wɑːˈtiː.ni/', partOfSpeech: 'noun', meaningVi: 'Eswatini',
      image: { kind: 'flag', countryCode: 'sz' }, capital: 'Mbabane', nationality: 'Swazi',
      examples: [
        { en: 'Eswatini used to be called Swaziland.', vi: 'Eswatini trước đây có tên là Swaziland.' },
        { en: 'The capital of Eswatini is Mbabane.', vi: 'Thủ đô của Eswatini là Mbabane.' },
      ],
      extraInfo: { vi: 'Thủ đô: Mbabane. Một trong số ít nước còn chế độ quân chủ tuyệt đối.', en: 'Capital: Mbabane. One of the last absolute monarchies in the world.' },
    },

    /* ===================== CHÂU ĐẠI DƯƠNG ===================== */
    {
      id: 'fun-country-au', word: 'Australia', ipa: '/ɒsˈtreɪ.li.ə/', partOfSpeech: 'noun', meaningVi: 'Úc',
      image: { kind: 'flag', countryCode: 'au' }, capital: 'Canberra', nationality: 'Australian',
      examples: [
        { en: 'Kangaroos live in Australia.', vi: 'Chuột túi sống ở Úc.' },
        { en: 'The capital of Australia is Canberra, not Sydney.', vi: 'Thủ đô của Úc là Canberra, không phải Sydney.' },
      ],
      extraInfo: { vi: 'Thủ đô: Canberra. Vừa là một quốc gia vừa là một châu lục.', en: 'Capital: Canberra. It is both a country and a continent.' },
    },
    {
      id: 'fun-country-nz', word: 'New Zealand', ipa: '/ˌnjuː ˈziː.lənd/', partOfSpeech: 'noun', meaningVi: 'New Zealand',
      image: { kind: 'flag', countryCode: 'nz' }, capital: 'Wellington', nationality: 'New Zealander',
      examples: [
        { en: 'The Lord of the Rings was filmed in New Zealand.', vi: 'Phim Chúa tể những chiếc nhẫn được quay ở New Zealand.' },
        { en: 'There are more sheep than people in New Zealand.', vi: 'Ở New Zealand có nhiều cừu hơn người.' },
      ],
      extraInfo: { vi: 'Thủ đô: Wellington. Chim kiwi là biểu tượng quốc gia.', en: 'Capital: Wellington. The kiwi bird is a national symbol.' },
    },
    {
      id: 'fun-country-pg', word: 'Papua New Guinea', ipa: '/ˌpæp.u.ə ˌnjuː ˈɡɪn.i/', partOfSpeech: 'noun', meaningVi: 'Papua New Guinea',
      image: { kind: 'flag', countryCode: 'pg' }, capital: 'Port Moresby', nationality: 'Papua New Guinean',
      examples: [
        { en: 'People in Papua New Guinea speak over 800 languages.', vi: 'Người dân Papua New Guinea nói hơn 800 ngôn ngữ.' },
        { en: 'The capital of Papua New Guinea is Port Moresby.', vi: 'Thủ đô của Papua New Guinea là Port Moresby.' },
      ],
      extraInfo: { vi: 'Thủ đô: Port Moresby. Là nước có nhiều ngôn ngữ nhất thế giới.', en: 'Capital: Port Moresby. The country with the most languages in the world.' },
    },
    {
      id: 'fun-country-fj', word: 'Fiji', ipa: '/ˈfiː.dʒiː/', partOfSpeech: 'noun', meaningVi: 'Fiji',
      image: { kind: 'flag', countryCode: 'fj' }, capital: 'Suva', nationality: 'Fijian',
      examples: [
        { en: 'Fiji has more than 300 islands.', vi: 'Fiji có hơn 300 hòn đảo.' },
        { en: 'Rugby is very popular in Fiji.', vi: 'Bóng bầu dục rất phổ biến ở Fiji.' },
      ],
      extraInfo: { vi: 'Thủ đô: Suva. Đội bóng bầu dục 7 người từng giành huy chương vàng Olympic.', en: 'Capital: Suva. Its rugby sevens team has won Olympic gold.' },
    },
    {
      id: 'fun-country-sb', word: 'Solomon Islands', ipa: '/ˈsɒl.ə.mən ˌaɪ.ləndz/', partOfSpeech: 'noun', meaningVi: 'Quần đảo Solomon',
      image: { kind: 'flag', countryCode: 'sb' }, capital: 'Honiara', nationality: 'Solomon Islander',
      examples: [
        { en: 'The Solomon Islands are in the Pacific Ocean.', vi: 'Quần đảo Solomon nằm ở Thái Bình Dương.' },
        { en: 'The capital of the Solomon Islands is Honiara.', vi: 'Thủ đô của Quần đảo Solomon là Honiara.' },
      ],
      extraInfo: { vi: 'Thủ đô: Honiara. Gồm gần 1.000 hòn đảo.', en: 'Capital: Honiara. Made up of almost 1,000 islands.' },
    },
    {
      id: 'fun-country-vu', word: 'Vanuatu', ipa: '/ˌvæn.uˈɑː.tuː/', partOfSpeech: 'noun', meaningVi: 'Vanuatu',
      image: { kind: 'flag', countryCode: 'vu' }, capital: 'Port Vila', nationality: 'Ni-Vanuatu',
      examples: [
        { en: 'Vanuatu has an underwater post office.', vi: 'Vanuatu có một bưu điện dưới nước.' },
        { en: 'The capital of Vanuatu is Port Vila.', vi: 'Thủ đô của Vanuatu là Port Vila.' },
      ],
      extraInfo: { vi: 'Thủ đô: Port Vila. Có núi lửa Yasur bạn có thể đứng nhìn sát miệng.', en: 'Capital: Port Vila. You can stand near the crater of Mount Yasur volcano.' },
    },
    {
      id: 'fun-country-ws', word: 'Samoa', ipa: '/səˈməʊ.ə/', partOfSpeech: 'noun', meaningVi: 'Samoa',
      image: { kind: 'flag', countryCode: 'ws' }, capital: 'Apia', nationality: 'Samoan',
      examples: [
        { en: 'Samoa is one of the first countries to see the new day.', vi: 'Samoa là một trong những nước đón ngày mới sớm nhất.' },
        { en: 'The capital of Samoa is Apia.', vi: 'Thủ đô của Samoa là Apia.' },
      ],
      extraInfo: { vi: 'Thủ đô: Apia. Năm 2011 đã bỏ qua nguyên một ngày khi đổi múi giờ.', en: 'Capital: Apia. It skipped a whole day in 2011 when it changed time zones.' },
    },
    {
      id: 'fun-country-to', word: 'Tonga', ipa: '/ˈtɒŋ.ə/', partOfSpeech: 'noun', meaningVi: 'Tonga',
      image: { kind: 'flag', countryCode: 'to' }, capital: "Nuku'alofa", nationality: 'Tongan',
      examples: [
        { en: 'Tonga still has a king.', vi: 'Tonga vẫn còn vua.' },
        { en: 'You can swim with whales in Tonga.', vi: 'Bạn có thể bơi cùng cá voi ở Tonga.' },
      ],
      extraInfo: { vi: "Thủ đô: Nuku'alofa. Là vương quốc duy nhất ở Thái Bình Dương chưa từng bị đô hộ.", en: "Capital: Nuku'alofa. The only Pacific kingdom never colonised." },
    },
    {
      id: 'fun-country-ki', word: 'Kiribati', ipa: '/ˈkɪr.ɪ.bæs/', partOfSpeech: 'noun', meaningVi: 'Kiribati',
      image: { kind: 'flag', countryCode: 'ki' }, capital: 'Tarawa', nationality: 'I-Kiribati',
      examples: [
        { en: 'Kiribati is the first country to see the new year.', vi: 'Kiribati là nước đón năm mới đầu tiên.' },
        { en: 'The capital of Kiribati is Tarawa.', vi: 'Thủ đô của Kiribati là Tarawa.' },
      ],
      extraInfo: { vi: 'Thủ đô: Tarawa. Là nước duy nhất nằm ở cả bốn bán cầu.', en: 'Capital: Tarawa. The only country in all four hemispheres.' },
    },
    {
      id: 'fun-country-fm', word: 'Micronesia', ipa: '/ˌmaɪ.krəˈniː.ʒə/', partOfSpeech: 'noun', meaningVi: 'Micronesia',
      image: { kind: 'flag', countryCode: 'fm' }, capital: 'Palikir', nationality: 'Micronesian',
      examples: [
        { en: 'Micronesia is made of more than 600 islands.', vi: 'Micronesia gồm hơn 600 hòn đảo.' },
        { en: 'The capital of Micronesia is Palikir.', vi: 'Thủ đô của Micronesia là Palikir.' },
      ],
      extraInfo: { vi: 'Thủ đô: Palikir. Đảo Yap nổi tiếng với "tiền đá" khổng lồ.', en: 'Capital: Palikir. The island of Yap is famous for giant stone money.' },
    },
    {
      id: 'fun-country-mh', word: 'Marshall Islands', ipa: '/ˈmɑː.ʃəl ˌaɪ.ləndz/', partOfSpeech: 'noun', meaningVi: 'Quần đảo Marshall',
      image: { kind: 'flag', countryCode: 'mh' }, capital: 'Majuro', nationality: 'Marshallese',
      examples: [
        { en: 'The Marshall Islands are very low and flat.', vi: 'Quần đảo Marshall rất thấp và bằng phẳng.' },
        { en: 'The capital of the Marshall Islands is Majuro.', vi: 'Thủ đô của Quần đảo Marshall là Majuro.' },
      ],
      extraInfo: { vi: 'Thủ đô: Majuro. Gồm 29 đảo san hô vòng.', en: 'Capital: Majuro. Made up of 29 coral atolls.' },
    },
    {
      id: 'fun-country-pw', word: 'Palau', ipa: '/pəˈlaʊ/', partOfSpeech: 'noun', meaningVi: 'Palau',
      image: { kind: 'flag', countryCode: 'pw' }, capital: 'Ngerulmud', nationality: 'Palauan',
      examples: [
        { en: 'Palau has a lake full of jellyfish.', vi: 'Palau có một hồ đầy sứa.' },
        { en: 'The capital of Palau is Ngerulmud.', vi: 'Thủ đô của Palau là Ngerulmud.' },
      ],
      extraInfo: { vi: 'Thủ đô: Ngerulmud. Có Hồ Sứa, nơi sứa gần như không đốt người.', en: 'Capital: Ngerulmud. Its Jellyfish Lake has jellyfish that barely sting.' },
    },
    {
      id: 'fun-country-nr', word: 'Nauru', ipa: '/nɑːˈuː.ruː/', partOfSpeech: 'noun', meaningVi: 'Nauru',
      image: { kind: 'flag', countryCode: 'nr' }, capital: 'Yaren', nationality: 'Nauruan',
      examples: [
        { en: 'Nauru is a very small island country.', vi: 'Nauru là một quốc đảo rất nhỏ.' },
        { en: 'You can walk around Nauru in a few hours.', vi: 'Bạn có thể đi bộ vòng quanh Nauru trong vài giờ.' },
      ],
      extraInfo: { vi: 'Thủ đô: Yaren (không chính thức). Là quốc đảo nhỏ nhất thế giới.', en: 'Capital: Yaren (unofficial). The smallest island country in the world.' },
    },
    {
      id: 'fun-country-tv', word: 'Tuvalu', ipa: '/tuːˈvɑː.luː/', partOfSpeech: 'noun', meaningVi: 'Tuvalu',
      image: { kind: 'flag', countryCode: 'tv' }, capital: 'Funafuti', nationality: 'Tuvaluan',
      examples: [
        { en: 'Tuvalu earns money from its internet name ".tv".', vi: 'Tuvalu kiếm tiền từ tên miền ".tv".' },
        { en: 'The capital of Tuvalu is Funafuti.', vi: 'Thủ đô của Tuvalu là Funafuti.' },
      ],
      extraInfo: { vi: 'Thủ đô: Funafuti. Là một trong những nước ít dân nhất thế giới.', en: 'Capital: Funafuti. One of the least populated countries in the world.' },
    },
  ],
}
