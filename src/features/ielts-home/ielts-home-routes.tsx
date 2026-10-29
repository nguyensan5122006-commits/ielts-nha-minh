/**
 * ielts-home-routes.tsx — ĐƯỜNG DẪN CỦA KHU "LUYỆN THI IELTS"
 * ----------------------------------------------------------------------------
 *   /ielts   kế hoạch luyện thi IELTS (tự chuyển track sang 'ielts' + giao diện xanh phòng thi)
 * (Khu Tiếng Anh tổng quát là /english — khai báo ở learning-path-routes.tsx.)
 * App.tsx đặt {ieltsHomeRoutes()} trong khối route có thanh menu.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { TrackEntry } from './TrackEntry'

const IeltsHomePage = lazy(() => import('./IeltsHomePage').then((module) => ({ default: module.IeltsHomePage })))

export const ieltsHomeRoutes = () => (
  <Route
    path="/ielts"
    element={
      <TrackEntry track="ielts">
        <IeltsHomePage />
      </TrackEntry>
    }
  />
)
