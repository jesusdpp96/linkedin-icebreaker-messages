import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { ChatMessage, ChatRequestOptions, OpenAIConfig } from './types'
import type { UsageStats } from './types/usage-stats'

/**
 * A service class for interacting with the OpenAI chat API.
 * Allows configurable prompts, chat history management,
 * and error recovery when expecting JSON responses.
 *
 * Tracks token usage, cost estimation, and logs stats per request.
 */
export class OpenAIChatService {
  private axiosInstance: AxiosInstance
  private config: Required<OpenAIConfig>
  private messageHistory: ChatMessage[] = []
  private usageStats: UsageStats = {
    requestCount: 0,
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    get averagePromptTokens() {
      return this.requestCount ? this.totalPromptTokens / this.requestCount : 0
    },
    get averageCompletionTokens() {
      return this.requestCount ? this.totalCompletionTokens / this.requestCount : 0
    },
  }
  /**
   * Creates an instance of OpenAIChatService.
   * @param config Configuration options including API key, model, and optional overrides.
   */
  constructor(config: OpenAIConfig) {
    this.config = {
      baseURL: config.baseURL || 'https://api.openai.com/v1',
      model: config.model || 'gpt-4',
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1500,
      apiKey: config.apiKey,
    }

    this.axiosInstance = axios.create({
      baseURL: this.config.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
      },
    })

    this.messageHistory = [
      {
        role: 'system',
        content: 'You are a helpful assistant that communicates in JSON when asked.',
      },
    ]
  }

  /**
   * Formats the user message, including optional JSON inputs,
   * to be appended to the prompt.
   * @param prompt The user prompt.
   * @param jsonInputs Optional array of stringified JSON inputs.
   * @returns A ChatMessage formatted for the OpenAI API.
   */
  private formatUserMessage(prompt: string, jsonInputs?: string[]): ChatMessage {
    let content = prompt

    if (jsonInputs?.length) {
      content += `\n\nHere are the relevant JSON inputs:\n`
      jsonInputs.forEach((json, idx) => {
        content += `\n[JSON ${idx + 1}]:\n${json}`
      })
    }
    return { role: 'user', content }
  }

  /**
   * Sends a message to the OpenAI API using the current message history.
   * @param options Prompt and optional JSON inputs.
   * @returns The assistant's response as a raw string.
   * @throws Error if the API call fails.
   */
  public async sendMessage(options: ChatRequestOptions): Promise<string> {
    const userMessage = this.formatUserMessage(options.prompt, options.jsonInputs)
    this.messageHistory.push(userMessage)

    try {
      const response = await this.axiosInstance.post('/chat/completions', {
        model: this.config.model,
        temperature: this.config.temperature,
        max_tokens: this.config.maxTokens,
        messages: this.messageHistory,
      })

      const assistantMessage = response.data.choices[0].message.content as string
      const usage = response.data.usage

      if (usage) {
        this.usageStats.requestCount++
        this.usageStats.totalPromptTokens += usage.prompt_tokens
        this.usageStats.totalCompletionTokens += usage.completion_tokens
      }

      this.messageHistory.push({
        role: 'assistant',
        content: assistantMessage,
      })

      this.logUsage(usage)

      return assistantMessage
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.message || 'Unknown error'
      const errMsg = `Failed to get a valid response from OpenAI: ${message}`
      console.error(errMsg)
      throw new Error(errMsg)
    }
  }

  /**
   * Retries the last user prompt with an instruction
   * to return a valid JSON response.
   * Useful when the previous response was malformed.
   * @returns The corrected response from the assistant.
   * @throws Error if no previous prompt exists.
   */
  public async retryLastPrompt(): Promise<string> {
    const lastUserMessage = this.messageHistory.reverse().find(msg => msg.role === 'user')
    if (!lastUserMessage) {
      throw new Error('No previous user message to retry.')
    }

    this.messageHistory.push({
      role: 'user',
      content: 'The previous answer was malformed. Please respond again with valid JSON.',
    })

    return this.sendMessage({ prompt: lastUserMessage.content })
  }

  /**
   * Resets the internal message history to the default system message.
   * Useful when starting a new conversation context.
   */
  public resetHistory() {
    this.messageHistory = [
      {
        role: 'system',
        content: 'You are a helpful assistant that communicates in JSON when asked.',
      },
    ]
  }

  private getPromptCostPer1K(): number {
    switch (this.config.model) {
      case 'gpt-4.1':
        return 0.0105 // Per Millon: $2.00 + $0.50 + $8.00 = $10.50 (see documentation https://platform.openai.com/docs/pricing)
      case 'gpt-4.1-mini':
        return 0.0021 // Per Millon: $0.40 + $0.10 + $1.60 = $2.10
      case 'gpt-4':
        return 0.03
      case 'gpt-4-32k':
        return 0.06
      case 'gpt-3.5-turbo':
        return 0.0015
      default:
        return 0.03
    }
  }

  private getCompletionCostPer1K(): number {
    switch (this.config.model) {
      case 'gpt-4':
        return 0.06
      case 'gpt-4-32k':
        return 0.12
      case 'gpt-3.5-turbo':
        return 0.002
      default:
        return 0.06
    }
  }

  private getAveragePromptTokens(): number {
    return this.usageStats.requestCount
      ? this.usageStats.totalPromptTokens / this.usageStats.requestCount
      : 0
  }

  private getAverageCompletionTokens(): number {
    return this.usageStats.requestCount
      ? this.usageStats.totalCompletionTokens / this.usageStats.requestCount
      : 0
  }

  private getTotalCostUSD(): number {
    return (
      (this.usageStats.totalPromptTokens / 1000) * this.getPromptCostPer1K() +
      (this.usageStats.totalCompletionTokens / 1000) * this.getCompletionCostPer1K()
    )
  }

  public exportUsageAsJSON(): Record<string, unknown> {
    return {
      model: this.config.model,
      requestCount: this.usageStats.requestCount,
      totalPromptTokens: this.usageStats.totalPromptTokens,
      totalCompletionTokens: this.usageStats.totalCompletionTokens,
      averagePromptTokens: parseFloat(this.getAveragePromptTokens().toFixed(2)),
      averageCompletionTokens: parseFloat(this.getAverageCompletionTokens().toFixed(2)),
      totalCostUSD: parseFloat(this.getTotalCostUSD().toFixed(6)),
    }
  }

  private logUsage(usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }) {
    if (!usage) {
      console.warn('No usage data received from OpenAI.')
      return
    }

    const cost =
      (usage.prompt_tokens / 1000) * this.getPromptCostPer1K() +
      (usage.completion_tokens / 1000) * this.getCompletionCostPer1K()

    console.log('\n\n\n--- OpenAI API Usage ---')
    console.log(`Request #: ${this.usageStats.requestCount}`)
    console.log(`Prompt tokens: ${usage.prompt_tokens}`)
    console.log(`Completion tokens: ${usage.completion_tokens}`)
    console.log(`Total tokens: ${usage.total_tokens}`)
    console.log(`Estimated cost for this request: $${cost.toFixed(6)}`)
    console.log(`Average prompt tokens: ${this.getAveragePromptTokens().toFixed(2)}`)
    console.log(`Average completion tokens: ${this.getAverageCompletionTokens().toFixed(2)}`)
    console.log(`Cumulative estimated cost: $${this.getTotalCostUSD().toFixed(6)}`)
    console.log('-------------------------')
    console.log('Stats to export:', this.exportUsageAsJSON())
    console.log('-------------------------')
  }
}
