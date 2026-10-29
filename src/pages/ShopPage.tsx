/**
 * ShopPage.tsx — CỬA HÀNG
 * ----------------------------------------------------------------------------
 * Trên cùng: "gương" xem trước avatar + khung + màu tên + danh hiệu đang dùng, số chuối.
 * Các tab: Sức mạnh | Đồ học tập | Avatar | Khung | Màu tên | Danh hiệu | Sticker & hiệu ứng.
 * Món dùng 1 lần: mua theo số lượng (x1, x5). Món trang trí: mua 1 lần rồi bấm "Dùng".
 * (v3) Giao diện làm lại: thẻ món có ảnh 3D, nút giá có quả chuối, báo "Cần thêm N 🍌"
 *      khi chưa đủ chuối. Logic mua / dùng giữ nguyên (máy chủ kiểm tra số dư).
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { accountLevelFromXp } from '../game-economy/account-level'
import { SHOP_ITEMS, type ShopCategory, type ShopItem } from '../game-economy/shop-catalog'
import { PlayerAvatar, PlayerName } from '../components/PlayerIdentity'
import { useToast } from '../components/ToastCenter'
import { Badge, Button, Icon, playSound, Tabs } from '../design-system'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { PLAY_ART } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/shop.css'

// tab 'chat' gom chung sticker + hiệu ứng chat
type ShopTab = Exclude<ShopCategory, 'sticker-pack' | 'chat-effect'> | 'chat'
const TABS: { id: ShopTab; art: string }[] = [
  { id: 'power', art: 'high-voltage' },
  { id: 'study', art: 'books' },
  { id: 'avatar', art: 'slightly-smiling-face' },
  { id: 'frame', art: 'framed-picture' },
  { id: 'name-color', art: 'artist-palette' },
  { id: 'title', art: 'crown' },
  { id: 'chat', art: 'speech-balloon' },
]

export function ShopPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { progress } = useProgress()
  const { economy, bananas, owns, quantityOf, buy, equip } = useWallet()
  const { refreshMembers } = useFamily()
  const { showToast } = useToast()
  const [tab, setTab] = useState<ShopTab>('power')
  const [busyItem, setBusyItem] = useState<string | null>(null)

  const items = SHOP_ITEMS.filter((item) => (tab === 'chat' ? item.category === 'sticker-pack' || item.category === 'chat-effect' : item.category === tab))
  const equipped = economy?.equipped
  const level = accountLevelFromXp(progress.xpTotal)

  async function handleBuy(item: ShopItem, quantity = 1) {
    setBusyItem(item.id)
    try {
      await buy(item.id, quantity)
      playSound('pop')
      showToast({ icon: item.icon, text: t('boughtItem', { name: pick(item.name) }) })
    } catch (error) {
      showToast({ icon: '⚠️', text: (error as Error).message })
    } finally {
      setBusyItem(null)
    }
  }

  async function handleEquip(item: ShopItem | null, slot: string) {
    await equip(slot, item?.id ?? null)
    playSound('tap')
    void refreshMembers() // để mọi nơi hiện avatar mới
  }

  const isEquipped = (item: ShopItem) => !!equipped && (equipped as Record<string, string | null>)[item.category] === item.id

  /** Hình đại diện của 1 món: avatar / khung / màu tên xem trước thật; còn lại là ảnh 3D */
  function itemPicture(item: ShopItem) {
    if (item.category === 'avatar') return <PlayerAvatar avatarItemId={item.id} size={64} />
    if (item.category === 'frame') return <PlayerAvatar avatarItemId={equipped?.avatar} frameItemId={item.id} size={64} />
    if (item.category === 'name-color') return <span className="shop-item__name-preview"><PlayerName name={user?.displayName ?? 'Abc'} nameColorItemId={item.id} /></span>
    if (item.category === 'sticker-pack') return <span className="shop-item__stickers" aria-hidden>{(item.value ?? '').split(' ').slice(0, 4).join(' ')}</span>
    return <GameArt emoji={item.icon} size={60} />
  }

  return (
    <main className="page pg-page shop">
      <PlayPageHeader back art={PLAY_ART.shop} artPlate="gold" title={t('shopTitle')} intro={t('shopIntro')} actions={<BananaPill amount={bananas} size="lg" />} />

      {/* gương xem trước */}
      <section className="shop-mirror" aria-label={playText('shopPreview')}>
        <div className="shop-mirror__me">
          <PlayerAvatar avatarItemId={equipped?.avatar} frameItemId={equipped?.frame} size={88} />
          <div className="shop-mirror__text">
            <span className="ds-eyebrow">{playText('shopPreview')}</span>
            <div className="shop-mirror__name">
              <PlayerName name={user?.displayName ?? ''} nameColorItemId={equipped?.['name-color']} titleItemId={equipped?.title} fallbackTitle={pick(level.title)} showTitle />
            </div>
            <Badge tone="olive" size="sm">
              Lv.{level.level}
            </Badge>
          </div>
        </div>
        <div className="shop-mirror__wallet">
          <span className="shop-mirror__label">{playText('shopBalance')}</span>
          <BananaPill amount={bananas} size="lg" />
          <span className="shop-mirror__hint">{playText('shopEarnHint')}</span>
        </div>
      </section>

      <Tabs<ShopTab>
        label={t('shopTitle')}
        variant="pill"
        idPrefix="shop"
        value={tab}
        onChange={setTab}
        className="shop-tabs"
        items={TABS.map((item) => ({ id: item.id, label: t(`shopTab_${item.id}`), icon: <GameArt slug={item.art} size={20} /> }))}
      />

      {tab === 'power' && (
        <p className="pg-note pg-note--info shop-rule">
          <Icon name="hint" size={18} /> {t('powerRule')}
        </p>
      )}

      <ul className="shop-grid" role="tabpanel" id={`shop-panel-${tab}`} aria-labelledby={`shop-tab-${tab}`}>
        {items.map((item) => {
          const owned = owns(item.id)
          const quantity = quantityOf(item.id)
          const canAfford = bananas >= item.price
          const slot = item.category
          const equipable = ['avatar', 'frame', 'name-color', 'title'].includes(slot)
          const equippedNow = isEquipped(item)
          return (
            <li key={item.id} className={`shop-item ${equippedNow ? 'is-equipped' : ''} ${owned && !item.consumable ? 'is-owned' : ''}`}>
              {equippedNow && (
                <span className="shop-item__flag">
                  <Icon name="check" size={12} strokeWidth={3} /> {t('equipped')}
                </span>
              )}
              <div className="shop-item__picture">{itemPicture(item)}</div>
              <strong className="shop-item__title">{pick(item.name)}</strong>
              <span className="shop-item__desc">{pick(item.description)}</span>
              {item.consumable && (
                <span className="shop-item__qty">
                  {t('youHave', { n: quantity })}
                </span>
              )}

              <div className="shop-item__actions">
                {item.consumable ? (
                  <>
                    <Button size="sm" disabled={!canAfford || busyItem === item.id} loading={busyItem === item.id} onClick={() => handleBuy(item, 1)} iconLeft={<GameArt slug="banana" size={18} />}>
                      {item.price}
                    </Button>
                    <Button size="sm" variant="secondary" disabled={bananas < item.price * 5 || busyItem === item.id} onClick={() => handleBuy(item, 5)}>
                      x5 · {item.price * 5}
                    </Button>
                  </>
                ) : owned ? (
                  equipable ? (
                    equippedNow ? (
                      <Button size="sm" variant="ghost" disabled={item.category === 'avatar'} onClick={() => handleEquip(null, slot)}>
                        {t('equipped')}
                      </Button>
                    ) : (
                      <Button size="sm" variant="navy" onClick={() => handleEquip(item, slot)}>
                        {t('equip')}
                      </Button>
                    )
                  ) : (
                    <Badge tone="success" icon="check">
                      {t('owned')}
                    </Badge>
                  )
                ) : (
                  <Button size="sm" disabled={!canAfford || busyItem === item.id} loading={busyItem === item.id} onClick={() => handleBuy(item)} iconLeft={<GameArt slug="banana" size={18} />}>
                    {item.price}
                  </Button>
                )}
              </div>
              {!owned && !canAfford && <span className="shop-item__need">{playText('shopNotEnough', { n: item.price - bananas })}</span>}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
