/**
 * word-chain-dictionary.ts — TỪ ĐIỂN TIẾNG ANH CHO TRÒ NỐI TỪ
 * Danh sách ~125.000 từ (3-10 chữ cái) lấy từ ENABLE word list (public domain),
 * lưu ở public/dictionary/english-words.txt (trang web cũng dùng file này khi chơi 1 mình).
 * Nạp 1 lần vào bộ nhớ dạng Set để tra cực nhanh.
 */
import wordListText from '../../public/dictionary/english-words.txt'

let dictionary: Set<string> | null = null

export function isDictionaryWord(word: string): boolean {
  if (!dictionary) dictionary = new Set(wordListText.split('\n').map((w) => w.trim()).filter(Boolean))
  return dictionary.has(word.toLowerCase())
}
