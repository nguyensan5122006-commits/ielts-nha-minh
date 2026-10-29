/**
 * MicGate.tsx — THẺ XIN QUYỀN MICRO (trước khi có máy ghi âm)
 * ----------------------------------------------------------------------------
 * Mascot giải thích VÌ SAO cần micro trước khi trình duyệt bật hộp thoại (học Speak & Improve),
 * có hướng dẫn khi bị chặn, và lối thoát "Tiếp tục không ghi âm" khi máy không có micro.
 * Micro sẵn sàng (hoặc người học chọn không ghi âm) -> hiện children.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Button } from '../../design-system/components/Button'
import { Icon } from '../../design-system/components/Icon'
import { Mascot } from '../../design-system/components/Mascot'
import { useSpeakingText } from './skill-speaking-text'
import type { MicrophoneHandle } from './use-microphone'

export function MicGate({ mic, children }: { mic: MicrophoneHandle; children: ReactNode }) {
  const text = useSpeakingText()
  if (mic.state === 'ready' || mic.useWithoutMic) return <>{children}</>

  if (mic.state === 'checking') {
    return (
      <div className="mic-gate mic-gate--quiet" role="status">
        <span className="speaking-recorder__spinner" aria-hidden /> {text.micChecking}
      </div>
    )
  }

  const blocked = mic.state === 'denied'
  const missing = mic.state === 'unsupported'
  return (
    <div className={`mic-gate${blocked || missing ? ' mic-gate--warn' : ''}`} role={blocked || missing ? 'alert' : undefined}>
      <Mascot pose={blocked || missing ? 'comfort' : 'speaking'} size={104} />
      <div className="mic-gate__body">
        <strong className="mic-gate__title">{blocked ? text.micDeniedTitle : missing ? text.micMissingTitle : text.micTitle}</strong>
        <p className="mic-gate__text">
          {blocked ? text.micDenied : missing ? text.micMissing : mic.state === 'requesting' ? text.micRequesting : text.micExplain}
        </p>
        <div className="mic-gate__actions">
          {!missing && (
            <Button variant={blocked ? 'secondary' : 'primary'} iconLeft={blocked ? 'retry' : undefined} loading={mic.state === 'requesting'} onClick={() => void mic.request()}>
              {blocked ? text.micRetry : text.micAllow}
            </Button>
          )}
          {(blocked || missing) && (
            <Button variant="ghost" onClick={mic.continueWithoutMic}>
              {text.micContinueWithout}
            </Button>
          )}
        </div>
        <p className="mic-gate__privacy">
          <Icon name="lock" size={14} /> {text.privacyShort}
        </p>
      </div>
    </div>
  )
}
