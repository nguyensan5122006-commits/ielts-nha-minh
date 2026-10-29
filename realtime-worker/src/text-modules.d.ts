// Cho TypeScript biết: import file .txt sẽ nhận được 1 chuỗi (wrangler xử lý qua [[rules]] type = "Text")
declare module '*.txt' {
  const content: string
  export default content
}
