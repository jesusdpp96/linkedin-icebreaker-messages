import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { ChatMessage, ChatRequestOptions, OpenAIConfig } from './types'

/**
 * A service class for interacting with the OpenAI chat API.
 * Allows configurable prompts, chat history management,
 * and error recovery when expecting JSON responses.
 */
export class OpenAIChatService {
  private axiosInstance: AxiosInstance
  private config: Required<OpenAIConfig>
  private messageHistory: ChatMessage[] = []

  /**
   * Creates an instance of OpenAIChatService.
   * @param config Configuration options including API key, model, and optional overrides.
   */
  constructor(config: OpenAIConfig) {
    this.config = {
      baseURL: config.baseURL || 'https://api.openai.com/v1',
      model: config.model || 'gpt-4',
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1000,
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

    return {
      role: 'user',
      content,
    }
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

      this.messageHistory.push({
        role: 'assistant',
        content: assistantMessage,
      })

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
}
