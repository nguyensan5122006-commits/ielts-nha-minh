/**
 * image-compression.ts — THU NHỎ ẢNH TRƯỚC KHI GỬI CHAT
 * Ảnh chụp điện thoại thường 3-5MB. Ta vẽ lại lên canvas với cạnh dài tối đa 800px,
 * lưu JPEG chất lượng 70% -> còn khoảng 60-150KB, đủ nét để xem trên máy tính
 * và đủ nhẹ để lưu thẳng trong database.
 */
const MAX_SIDE = 800
const QUALITY = 0.7

export async function compressImage(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  const context = canvas.getContext('2d')!
  context.fillStyle = '#fff' // ảnh PNG trong suốt -> nền trắng
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  return canvas.toDataURL('image/jpeg', QUALITY) // "data:image/jpeg;base64,...."
}
