/**
 * main.tsx — ĐIỂM KHỞI ĐỘNG
 * Trình duyệt mở index.html -> chạy file này -> gắn ứng dụng React vào thẻ <div id="root">.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import './styles/global.css'
import './styles/gamification.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
