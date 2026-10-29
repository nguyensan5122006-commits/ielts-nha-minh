/**
 * use-image-fallback.ts — THỬ LẦN LƯỢT NHIỀU ẢNH, LỖI THÌ LÙI VỀ ẢNH SAU
 * ----------------------------------------------------------------------------
 * Ảnh 3D (mascot, icon kỹ năng, ảnh từ vựng) do nhóm Blender/tài sản làm dần,
 * nên lúc chưa có file thì component phải tự hiện ảnh tạm.
 *
 *   const { src, onError, exhausted } = useImageFallback(['/a.webp', '/b.png'])
 *   return exhausted ? <OTam /> : <img src={src} onError={onError} />
 *
 * Nhớ các đường dẫn đã lỗi trong bộ nhớ (cả trang dùng chung) -> lần sau bỏ qua
 * luôn, không phải thử lại và không bị "nháy".
 * ----------------------------------------------------------------------------
 */
import { useCallback, useState } from 'react'

const failedImageSources = new Set<string>()

/** Ghi nhận 1 ảnh lỗi (dùng khi tự xử lý onError). */
export function markImageFailed(src: string): void {
  failedImageSources.add(src)
}

export function hasImageFailed(src: string): boolean {
  return failedImageSources.has(src)
}

export function useImageFallback(sources: string[]): { src: string | undefined; onError: () => void; exhausted: boolean } {
  const key = sources.join('|')
  // chỉ số ảnh đang thử; tính lại khi danh sách ảnh đổi (VD đổi từ "cat" sang "dog")
  const firstUsable = () => sources.findIndex((src) => !failedImageSources.has(src))
  const [state, setState] = useState(() => ({ key, index: firstUsable() }))
  let index = state.index
  if (state.key !== key) {
    index = firstUsable()
    setState({ key, index })
  }

  const onError = useCallback(() => {
    const failed = sources[index]
    if (failed) failedImageSources.add(failed)
    const next = sources.findIndex((src, i) => i > index && !failedImageSources.has(src))
    setState({ key, index: next })
  }, [key, index]) // `sources` đã nằm trong `key`

  return { src: index >= 0 ? sources[index] : undefined, onError, exhausted: index < 0 }
}
