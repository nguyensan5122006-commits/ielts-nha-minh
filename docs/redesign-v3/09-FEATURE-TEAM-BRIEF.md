# Brief chung cho các nhóm code tính năng (v3)

## Đọc trước (bắt buộc)
1. `docs/redesign-v3/01-ARCHITECTURE.md` — routes, luồng, hợp đồng tài sản.
2. `docs/redesign-v3/04-DESIGN-SYSTEM.md` — ngôn ngữ hình ảnh, chuyển động, copy (đọc cả mục 13 + các dòng bổ sung cuối file).
3. `docs/redesign-v3/03-DATA-LAYER.md` — API của progress store, selectors, migration (DÙNG CÁI NÀY, đừng tự lưu tiến độ).
4. `docs/redesign-v3/05-COMPONENTS.md` (nếu đã có) + `src/design-system/components/*` — DÙNG component có sẵn; thiếu thì làm bản nhỏ trong thư mục mình và ghi vào `REQUESTS.md`.
5. `docs/redesign-v3/02-CONTENT-GUIDE.md` (cuối file có quy ước hiển thị: canDo, matching, YNNG, pre-line, fading…).
6. Ghi chú research liên quan tới phần mình trong `docs/research/notes/` (mục "10 ý tưởng") + mở vài ảnh trong `(ảnh chụp research — đã xoá 29/10)` bằng Read để thấy tận mắt. Chỉ lấy ý tưởng, làm lại theo phong cách của mình — không chép giao diện.
7. `docs/research/notes/psych-adult.md` mục D (luật thiết kế kiểm thử được) — tuân theo.

## Quy tắc
- Chỉ sửa trong thư mục mình sở hữu (`src/features/<tên>/`). Route: tạo `src/features/<tên>/<tên>-routes.tsx`; cuối cùng đọc lại `src/app/App.tsx` và thêm route bằng 1 sửa nhỏ (file này nhiều nhóm cùng sửa — luôn đọc lại ngay trước khi sửa).
- Chữ giao diện song ngữ: file `src/features/<tên>/<tên>-text.ts` dùng hệ `translations` hiện có (`useLanguage`). Không sửa `src/translations/ui-text.ts` trừ khi bắt buộc.
- Mỗi file có comment đầu file tiếng Việt giải thích vai trò; comment chỗ khó. Tên rõ nghĩa (chủ nhà đọc code để học).
- Desktop trước (1440×900 là chính, phải ổn ở 1100×800), không vỡ ở 768px. Phím tắt cho thao tác lặp. Chế độ tối. `prefers-reduced-motion`.
- Mọi màn hình có bước tiếp theo rõ ràng (1 nút chính + 1 nút phụ). Không ngõ cụt. Autosave theo 03-DATA-LAYER.
- Không deploy, không `--remote`, không đụng database thật.
- Cuối việc: `npx tsc --noEmit -p .` sạch cho file của mình; `npm run build` nếu được (nếu lỗi do nhóm khác đang sửa dở thì ghi rõ).

## Chạy thử local
- API dùng chung đã chạy sẵn ở `http://127.0.0.1:8788` (wrangler pages dev, D1 local đã migrate 0003). KHÔNG tự chạy thêm wrangler (2 tiến trình chung SQLite sẽ lỗi SQLITE_BUSY). Nếu 8788 không trả lời, ghi vào REQUESTS.md và báo trong kết quả.
- Mỗi nhóm tự chạy Vite riêng ở cổng riêng: `npx vite --port <cổng của bạn> --strictPort` (proxy /api → 8788 có sẵn trong vite.config.ts).
- Tài khoản test: đăng ký qua giao diện hoặc `curl -s http://127.0.0.1:8788/api/auth/register -H 'content-type: application/json' -d '{"username":"<ten>","displayName":"<Tên>","password":"<mk>","inviteCode":"<INVITE_CODE trong .dev.vars>"}'` (không còn `ageGroup` — mọi tài khoản như nhau). Đặt username có tiền tố nhóm (VD `qa-path-1`).
- Trình duyệt riêng: `node E:/IELTS_ThienThao/(công cụ trình duyệt research — đã xoá 29/10) <tên-nhóm> <cổng-trình-duyệt> desktop` (cách dùng ở đầu file). Script phụ để trong thư mục scratchpad RIÊNG có tên nhóm (đừng dùng tên chung như b.sh — các agent từng ghi đè nhau).
- NHÌN BẰNG MẮT: chụp màn hình từng trạng thái (light + dark, 1440 + 1100), mở bằng Read, sửa tới khi thật sự đẹp, gọn, rõ bước tiếp theo, không tràn chữ, tương phản đủ.

## Bảng cổng
| Nhóm | Vite | Trình duyệt |
|---|---|---|
| onboarding | 5181 | 9331 |
| learning-path | 5182 | 9332 |
| lesson-player | 5183 | 9333 |
| skill-listening-reading | 5184 | 9334 |
| skill-writing-speaking | 5185 | 9335 |
| vocab-mistakes-dashboard | 5186 | 9336 |
| exam-room | 5187 | 9337 |
| playground-restyle | 5188 | 9338 |
| QA 1/2/3 | 5191–5193 | 9341–9343 |
