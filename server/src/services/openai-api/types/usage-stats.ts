export type UsageStats = {
  requestCount: number
  totalPromptTokens: number
  totalCompletionTokens: number
  get averagePromptTokens(): number
  get averageCompletionTokens(): number
}
