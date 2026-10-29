/**
 * MascotModel.tsx — MASCOT 3D XOAY ĐƯỢC (chỉ dùng ở hero trang landing)
 * ----------------------------------------------------------------------------
 *   <MascotModel size={360} />
 *
 * Dùng web component <model-viewer> của Google để hiện file /mascot/mascot.glb.
 * Thư viện này khá nặng (~1MB vì chứa three.js) nên CHỈ TẢI KHI CẦN:
 *   import('@google/model-viewer') chạy lúc component xuất hiện -> Vite tách
 *   thành file riêng, các trang khác không phải tải.
 *
 * Trong lúc chờ / khi file .glb chưa có / máy không hỗ trợ WebGL:
 *   hiện ảnh tĩnh <Mascot pose="salute" placement="hero" /> (ảnh poster).
 * Người dùng bật giảm chuyển động -> không tự xoay.
 * ----------------------------------------------------------------------------
 */
import { createElement, useEffect, useRef, useState } from 'react'
import { useDsText } from '../design-system-text'
import { useReducedMotion } from '../use-reduced-motion'
import { Mascot, type MascotPose } from './Mascot'
import './MascotModel.css'

export interface MascotModelProps {
  /** cỡ khung (px, vuông). Mặc định 360 */
  size?: number
  /** đường dẫn file 3D, mặc định /mascot/mascot.glb */
  src?: string
  /** pose ảnh tĩnh hiện trong lúc chờ / khi lỗi */
  posterPose?: MascotPose
  /** tên hoạt cảnh trong file glb (idle, wave, celebrate, blink) */
  animationName?: string
  /** câu bong bóng thoại cạnh mascot */
  speech?: string
}

type LoadState = 'loading' | 'ready' | 'failed'

export function MascotModel({ size = 360, src = '/mascot/mascot.glb', posterPose = 'salute', animationName = 'idle', speech }: MascotModelProps) {
  const dsText = useDsText()
  const reduceMotion = useReducedMotion()
  const [libraryLoaded, setLibraryLoaded] = useState(false)
  const [state, setState] = useState<LoadState>('loading')
  const viewerRef = useRef<HTMLElement | null>(null)

  // 1) Kiểm tra file .glb có tồn tại không (HEAD request nhẹ, không tải cả file)
  //    rồi mới tải thư viện model-viewer -> khi chưa có file 3D thì không tốn ~1MB vô ích.
  useEffect(() => {
    let cancelled = false
    fetch(src, { method: 'HEAD' })
      .then((response) => {
        const type = response.headers.get('content-type') ?? ''
        // máy chủ SPA có thể trả index.html (200) cho file không tồn tại -> kiểm tra loại file
        if (!response.ok || type.includes('text/html')) throw new Error('no model file')
        return import('@google/model-viewer')
      })
      .then(() => !cancelled && setLibraryLoaded(true))
      .catch(() => !cancelled && setState('failed'))
    return () => {
      cancelled = true
    }
  }, [src])

  // 2) Nghe sự kiện của <model-viewer>: tải xong -> hiện 3D; lỗi -> giữ ảnh tĩnh
  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return
    const onLoad = () => setState('ready')
    const onError = () => setState('failed')
    viewer.addEventListener('load', onLoad)
    viewer.addEventListener('error', onError)
    return () => {
      viewer.removeEventListener('load', onLoad)
      viewer.removeEventListener('error', onError)
    }
  }, [libraryLoaded])

  return (
    <div className={`ds-mascot-model is-${state}`} style={{ width: size, height: size }}>
      {/* ảnh tĩnh luôn nằm dưới; 3D tải xong thì mờ dần ảnh này đi */}
      <div className="ds-mascot-model__poster" aria-hidden={state === 'ready'}>
        <Mascot pose={posterPose} placement="hero" size={Math.round(size * 0.86)} speech={speech} label={dsText('mascotAlt')} />
      </div>
      {libraryLoaded &&
        state !== 'failed' &&
        // React 19 hỗ trợ custom element: thuộc tính được gán thẳng vào thẻ <model-viewer>
        createElement('model-viewer', {
          ref: viewerRef,
          className: 'ds-mascot-model__viewer',
          src,
          alt: dsText('mascotAlt'),
          'camera-controls': true,
          'disable-zoom': true,
          'interaction-prompt': 'none',
          'shadow-intensity': '0.8',
          'shadow-softness': '1',
          exposure: '1.05',
          'animation-name': animationName,
          autoplay: reduceMotion ? undefined : true,
          'auto-rotate': reduceMotion ? undefined : true,
          'auto-rotate-delay': '2500',
          'rotation-per-second': '18deg',
        })}
    </div>
  )
}
