/**
 * Configuration options for initializing OpenAIChatService.
 */
export interface OpenAIConfig {
  /** OpenAI API key */
  apiKey: string

  /** Model to use, e.g., "gpt-4", "gpt-3.5-turbo" */
  model?: string

  /** Sampling temperature. Higher = more creative. */
  temperature?: number

  /** Maximum number of tokens in the response. */
  maxTokens?: number
}
