/**
 * mascot-name.ts — TÊN CỦA MASCOT (chú Corgi cảnh sát)
 * ----------------------------------------------------------------------------
 * Đổi tên mascot ở ĐÚNG 1 CHỖ này là cả web đổi theo.
 * Trong nội dung/câu chữ, viết token {mascot} thay cho tên, VD:
 *   fillMascotName('{mascot} thấy bạn tiến bộ rồi!')  ->  'Ki thấy bạn tiến bộ rồi!'
 * ----------------------------------------------------------------------------
 */

export const MASCOT_NAME = 'Ki'

/** Chữ viết tắt dùng trong ảnh tạm (hình tròn cam khi chưa có ảnh mascot). */
export const MASCOT_INITIALS = MASCOT_NAME.slice(0, 2)

/** Thay mọi {mascot} trong câu bằng tên mascot. */
export function fillMascotName(text: string): string {
  return text.replaceAll('{mascot}', MASCOT_NAME)
}
