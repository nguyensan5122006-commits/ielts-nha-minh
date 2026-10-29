# _legacy-v2 — các trang học của bản v2 (CHỈ ĐỂ THAM KHẢO)

Các trang này đã được thay bằng giao diện v3 (nhóm learning-path, lesson-player, vocabulary-review,
mistakes-notebook...). Thư mục nằm trong `exclude` của `tsconfig.json` nên **không được build** và
**không còn khớp** với kho tiến độ v2 (`src/learning-progress/`). Đọc để xem cách làm cũ, không import.

| File | Thay bằng |
|---|---|
| HomePage.tsx, RoadmapPage.tsx, LevelPage.tsx | `/learn` (features/learning-path) |
| LessonPage.tsx, MiniTestPage.tsx | `/lesson/:lessonId` (features/lesson-player) |
| ReviewPage.tsx | `/review` (features/vocabulary-review) |
| MistakesPage.tsx | `/mistakes` (features/mistakes-notebook) |
