/**
 * index.ts — ĐIỂM VÀO CỦA WORKER REALTIME "ielts-realtime"
 * Worker này chỉ chứa Durable Object FamilyHub. Trang web (Cloudflare Pages)
 * gọi tới FamilyHub qua "binding" FAMILY_HUB trong wrangler.toml của Pages.
 * Worker không mở đường dẫn công khai (workers_dev = false), nên ai gõ địa chỉ
 * trực tiếp cũng không vào được.
 */
export { FamilyHub } from './family-hub'

export default {
  async fetch(): Promise<Response> {
    return new Response('Not found', { status: 404 })
  },
}
