/**
 * skill-task-loader.ts — TỰ NẠP CÁC FILE ĐĂNG KÝ TRÌNH KỸ NĂNG CỦA NHÓM KHÁC
 * ----------------------------------------------------------------------------
 * Vite có `import.meta.glob`: lúc build, nó tìm mọi file khớp mẫu và import giúp ta.
 * Mẫu dưới đây = mọi thư mục trong src/features/ có file `register-skill-tasks.ts(x)`.
 * Mỗi file đó gọi registerSkillTask(...) -> player xuất hiện trong bảng đăng ký.
 *
 * Vì sao tách khỏi skill-task-registry.ts? File của nhóm khác import registry;
 * nếu registry lại import ngược các file đó thì thành "vòng tròn import" (chạy lỗi
 * vì bảng Map chưa kịp tạo). Trang trình học import file loader NÀY, còn registry
 * thì không phụ thuộc ai.
 *
 * `eager: true` = import ngay (file đăng ký rất nhỏ: chỉ gọi registerSkillTask với
 * lazy(() => import(...)), phần code nặng của player vẫn tải khi cần).
 * ----------------------------------------------------------------------------
 */
const registrationModules = import.meta.glob('../*/register-skill-tasks.{ts,tsx}', { eager: true })

/** Danh sách file đăng ký đã nạp (để trang dev hiển thị / debug). */
export const loadedSkillTaskRegistrations: string[] = Object.keys(registrationModules)
