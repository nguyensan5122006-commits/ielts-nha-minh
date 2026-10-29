/**
 * vite.config.ts — CẤU HÌNH CÔNG CỤ BUILD (Vite)
 * Khi chạy "npm run dev" (cổng 5173), mọi lời gọi /api được chuyển tiếp sang
 * máy chủ Cloudflare chạy local bằng "npm run api" (cổng 8788).
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              // MỖI FILE BÀI HỌC (src/content/levels/**/xxx-lessons*.ts) = 1 FILE JS RIÊNG.
              // Trang đầu chỉ tải "mục lục nhẹ" (src/content/lesson-index.ts); mở bài nào thì
              // loadLesson(id) (src/content/lesson-loader.ts) mới tải đúng file chứa bài đó.
              // Không có nhóm này, trình build gộp mọi bài vào 1 file ~2 MB (vì lesson-registry.ts
              // import tất cả) -> mở 1 bài cũng phải tải hết.
              debugName: 'lesson-files',
              test: /src[\\/]content[\\/]levels[\\/].*-lessons[^\\/]*\.ts$/,
              name: (moduleId: string) => {
                const match = moduleId.match(/src[\\/]content[\\/]levels[\\/](.+)\.ts$/)
                return match ? `lessons-${match[1].replace(/[\\/]/g, '-')}` : null
              },
            },
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      // ws: true -> chuyển cả kết nối WebSocket (/api/realtime: chat, online, đấu trường) sang API local
      '/api': { target: 'http://127.0.0.1:8788', ws: true },
    },
    // Không theo dõi các thư mục làm việc phụ (ảnh research, hồ sơ Chrome, file Blender, bản build):
    // chúng thay đổi liên tục và làm dev server rất chậm.
    watch: {
      ignored: ['**/_research/**', '**/art-blender/**', '**/dist/**', '**/.wrangler/**', '**/public/audio/**'],
    },
  },
})
