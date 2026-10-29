/**
 * Skeleton.tsx — "KHUNG XƯƠNG" CHỜ TẢI (khối xám lấp lánh đúng hình nội dung sắp hiện)
 * ----------------------------------------------------------------------------
 *   <Skeleton variant="text" lines={3} />
 *   <Skeleton variant="rect" height={120} />
 *   <Skeleton variant="circle" width={48} />
 * Giúp trang không "nhảy" khi dữ liệu về, và người dùng biết đang tải.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { useDsText } from '../design-system-text'
import './Skeleton.css'

export interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle'
  /** số dòng (variant text) */
  lines?: number
  width?: number | string
  height?: number | string
  className?: string
}

export function Skeleton({ variant = 'text', lines = 1, width, height, className }: SkeletonProps) {
  const dsText = useDsText()
  const size = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : value)

  if (variant === 'text') {
    return (
      <span className={['ds-skeleton-lines', className].filter(Boolean).join(' ')} role="status" aria-label={dsText('loading')} style={{ width: size(width) }}>
        {Array.from({ length: lines }, (_, index) => (
          // dòng cuối ngắn hơn cho giống đoạn văn thật
          <span key={index} className="ds-skeleton ds-skeleton--text" style={{ width: lines > 1 && index === lines - 1 ? '62%' : '100%' }} />
        ))}
      </span>
    )
  }
  const style: CSSProperties = {
    width: size(width) ?? (variant === 'circle' ? '48px' : '100%'),
    height: size(height) ?? (variant === 'circle' ? size(width) ?? '48px' : '96px'),
  }
  return <span className={['ds-skeleton', `ds-skeleton--${variant}`, className].filter(Boolean).join(' ')} style={style} role="status" aria-label={dsText('loading')} />
}
