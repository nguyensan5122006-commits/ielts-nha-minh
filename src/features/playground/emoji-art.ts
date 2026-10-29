/**
 * emoji-art.ts — ĐỔI EMOJI THÀNH ẢNH 3D (Fluent Emoji) CHO SÂN CHƠI
 * ----------------------------------------------------------------------------
 * Dữ liệu cũ (cửa hàng, huy hiệu, boss, chủ đề Học vui) lưu biểu tượng dạng emoji (VD '🐝').
 * Trên giao diện v3 ta muốn hiện ẢNH 3D cùng hình (public/word-images/<slug>.webp).
 * Bảng dưới được SINH TỰ ĐỘNG từ public/word-images/catalog.json cho đúng những emoji
 * mà sân chơi đang dùng (để không phải tải catalog 220KB lúc chạy).
 *
 *   emojiArtSlug('🐝')  -> 'honeybee'
 *   emojiArtSlug('🙃')  -> undefined  (không có trong bảng -> component tự hiện emoji)
 *
 * Thêm emoji mới: thêm 1 dòng [emoji, slug] (slug tra trong catalog.json, mục "images").
 * ----------------------------------------------------------------------------
 */

const EMOJI_TO_SLUG: Record<string, string> = {
  '🥇': '1st-place-medal',
  '🥈': '2nd-place-medal',
  '🥉': '3rd-place-medal',
  '👽': 'alien',
  '🎨': 'artist-palette',
  '🚗': 'automobile',
  '🍌': 'banana',
  '📘': 'blue-book',
  '🔵': 'blue-circle',
  '📚': 'books',
  '🧠': 'brain',
  '🎯': 'bullseye',
  '🥕': 'carrot',
  '🐱': 'cat-face',
  '🏁': 'chequered-flag',
  '🛋️': 'couch-and-lamp',
  '⚔️': 'crossed-swords',
  '👑': 'crown',
  '🐶': 'dog-face',
  '🐉': 'dragon',
  '🐲': 'dragon-face',
  '🐘': 'elephant',
  '🔥': 'fire',
  '🧯': 'fire-extinguisher',
  '🎆': 'fireworks',
  '🍀': 'four-leaf-clover',
  '🦊': 'fox',
  '🐸': 'frog',
  '🎲': 'game-die',
  '👻': 'ghost',
  '🌍': 'globe-showing-europe-africa',
  '🟢': 'green-circle',
  '🎸': 'guitar',
  '⚡': 'high-voltage',
  '🐝': 'honeybee',
  '⏳': 'hourglass-not-done',
  '🧊': 'ice',
  '🔤': 'input-latin-letters',
  '🕹️': 'joystick',
  '2️⃣': 'keycap-2',
  '🍃': 'leaf-fluttering-in-wind',
  '🦵': 'leg',
  '🔗': 'link',
  '🦁': 'lion',
  '📝': 'memo',
  '🎖️': 'military-medal',
  '🐵': 'monkey-face',
  '👹': 'ogre',
  '📖': 'open-book',
  '🦉': 'owl',
  '🐼': 'panda',
  '🎉': 'party-popper',
  '🥳': 'partying-face',
  '🐧': 'penguin',
  '🟣': 'purple-circle',
  '🧩': 'puzzle-piece',
  '🌈': 'rainbow',
  '🔴': 'red-circle',
  '❓': 'red-question-mark',
  '🔁': 'repeat-button',
  '🤖': 'robot',
  '🏫': 'school',
  '✂️': 'scissors',
  '🛡️': 'shield',
  '🛒': 'shopping-cart',
  '🙂': 'slightly-smiling-face',
  '😊': 'smiling-face-with-smiling-eyes',
  '😎': 'smiling-face-with-sunglasses',
  '❄️': 'snowflake',
  '⚽': 'soccer-ball',
  '💖': 'sparkling-heart',
  '💬': 'speech-balloon',
  '🏅': 'sports-medal',
  '🦑': 'squid',
  '⭐': 'star',
  '🍜': 'steaming-bowl',
  '⛅': 'sun-behind-cloud',
  '🦖': 't-rex',
  '👕': 't-shirt',
  '🐯': 'tiger-face',
  '🏆': 'trophy',
  '💕': 'two-hearts',
  '🦄': 'unicorn',
  '🎮': 'video-game',
  '🌋': 'volcano',
  '👩‍⚕️': 'woman-health-worker',
  '🎁': 'wrapped-gift',
  '🟡': 'yellow-circle',
  '🧟': 'zombie',
}

/** Bỏ ký tự "biến thể" U+FE0F (emoji có/không có nó vẫn là 1 hình). */
function normalise(emoji: string): string {
  return emoji.replace(/\uFE0F/g, '')
}

const NORMALISED = new Map(Object.entries(EMOJI_TO_SLUG).map(([emoji, slug]) => [normalise(emoji), slug]))

/** Emoji -> tên ảnh 3D (hoặc undefined nếu chưa có ảnh). */
export function emojiArtSlug(emoji: string | undefined | null): string | undefined {
  if (!emoji) return undefined
  return NORMALISED.get(normalise(emoji.trim()))
}
