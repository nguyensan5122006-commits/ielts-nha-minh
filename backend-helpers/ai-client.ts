/**
 * ai-client.ts
 * ----------------------------------------------------------------------------
 * CỬA CHUNG ĐỂ GỌI AI. Các API (chấm viết, chấm nói, "tại sao sai?") gọi hàm ở đây
 * thay vì gọi thẳng Gemini.
 *
 *   1. Thử Gemini trước (miễn phí, nghe được audio).
 *   2. Gemini lỗi (quá tải, hết lượt, sai khoá...) -> chuyển sang Claude, nếu:
 *        - đã đặt ANTHROPIC_API_KEY, và
 *        - nội dung chỉ có chữ (Claude không nghe được ghi âm).
 *   3. Claude cũng lỗi -> báo lỗi gốc của Gemini cho người học.
 * ----------------------------------------------------------------------------
 */
import { askClaudeForJson, isClaudeConfigured } from './claude-client'
import { AiError, askGeminiForJson, type GeminiPart } from './gemini-client'
import type { ServerEnvironment } from './server-environment'

export async function askAiForJson<T>(env: ServerEnvironment, systemInstruction: string, parts: GeminiPart[]): Promise<T> {
  try {
    return await askGeminiForJson<T>(env, systemInstruction, parts)
  } catch (geminiError) {
    if (!(geminiError instanceof AiError)) throw geminiError

    const hasAudio = parts.some((part) => 'inline_data' in part)
    if (hasAudio || !isClaudeConfigured(env)) throw geminiError

    const userText = parts.map((part) => ('text' in part ? part.text : '')).join('\n\n')
    try {
      return await askClaudeForJson<T>(env, systemInstruction, userText)
    } catch (claudeError) {
      // ghi log để chủ nhà xem trên Cloudflare (Workers & Pages -> Logs), người học chỉ thấy lỗi Gemini
      console.error('Claude fallback failed:', claudeError instanceof Error ? claudeError.message : claudeError)
      throw geminiError
    }
  }
}
