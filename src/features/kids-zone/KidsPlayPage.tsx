/**
 * KidsPlayPage.tsx — TRANG 1 LƯỢT CHƠI (/kids/play/:gameId?topic=animals)
 * ----------------------------------------------------------------------------
 * Tìm trò theo :gameId trong game-registry -> bọc vào GameRoundShell (vỏ chung).
 * Trò chưa làm / sai tên -> quay về sảnh (không có ngõ cụt).
 * ----------------------------------------------------------------------------
 */
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { GameRoundShell } from './game-engine/GameRoundShell'
import { findGameDefinition } from './games/game-registry'
import { useKidsData } from './kids-data/kids-data-context'

export function KidsPlayPage() {
  const { gameId } = useParams()
  const [searchParams] = useSearchParams()
  const { basePath } = useKidsData()
  const definition = findGameDefinition(gameId)
  if (!definition) return <Navigate to={basePath} replace />
  const Game = definition.Component
  return (
    <GameRoundShell
      // đổi trò / chủ đề -> vỏ mới hoàn toàn
      key={`${definition.id}:${searchParams.get('topic') ?? ''}`}
      gameId={definition.id}
      topicId={searchParams.get('topic') ?? undefined}
      needsPicture={definition.needsPicture}
      renderGame={(props) => <Game {...props} />}
    />
  )
}
