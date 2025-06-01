import OpenAI from 'openai'
import type { Response, ResponseCreateParams } from 'openai/resources/responses/responses'
import { ExternalServiceError } from '@domain'
import type { ChatRequestOptions, OpenAIConfig } from './types'

/**
 * A simplified service class using the OpenAI Responses API.
 * The Responses API is stateful, so it handles conversation history automatically.
 */
export class OpenAIResponsesService {
  private client: OpenAI
  private config: Required<Omit<OpenAIConfig, 'apiKey'>>

  constructor(config: OpenAIConfig) {
    this.config = {
      model: config.model || 'gpt-4o',
      temperature: config.temperature ?? 0.7,
      maxTokens: config.maxTokens ?? 1500,
    }

    this.client = new OpenAI({
      apiKey: config.apiKey,
    })
  }
  public static NOT_STRUCTURATED_RESPONSE = 'openai_not_structured_response'
  public static OPENAI_API_ERROR = 'openai_api_error'
  /**
   * Generates a structured response from the OpenAI Responses API.
   * The API manages conversation state automatically.
   * @param options Prompt, optional JSON inputs, and optional previous response ID for continuation
   * @returns The response object from OpenAI
   */
  public async getStructuredResponse(
    options: Omit<ChatRequestOptions, 'structuredResponseSchema'> & {
      structuredResponseSchema: string
    },
  ): Promise<string> {
    const userMessage = this.formatUserMessage(options.prompt, options.jsonInputs)

    const params: ResponseCreateParams = {
      model: this.config.model,
      text: {
        format: { type: 'text' },
      },
      temperature: this.config.temperature,
      max_output_tokens: this.config.maxTokens,
      input: [
        {
          role: 'system',
          content: 'You are a helpful assistant that communicates in JSON when asked.',
        },
        { role: 'user', content: userMessage },
      ],
      tool_choice: 'auto',
      tools: [
        {
          type: 'function',
          name: 'structured_response',
          description: 'Generate a structured response using the given schema',
          parameters: JSON.parse(options.structuredResponseSchema),
          strict: false,
        },
      ],
    }

    const response: Response = await this.client.responses.create(params)
    const firstCall = response.output[0]

    if (firstCall?.type === 'function_call') {
      return firstCall.arguments
    }

    throw new ExternalServiceError(
      OpenAIResponsesService.name,
      OpenAIResponsesService.NOT_STRUCTURATED_RESPONSE,
      {
        function: 'getStructuredResponse',
        params: '<private>',
        message: 'Response did not contain a structured response',
      },
    )
  }

  public async getResponse(options: ChatRequestOptions): Promise<string> {
    try {
      const userMessage = this.formatUserMessage(options.prompt, options.jsonInputs)
      const params: ResponseCreateParams = {
        model: this.config.model,
        text: {
          format: { type: 'text' },
        },
        temperature: this.config.temperature,
        max_output_tokens: this.config.maxTokens,
        input: [{ role: 'user', content: userMessage }],
      }
      const response: Response = await this.client.responses.create(params)
      return response.output_text
    } catch (err) {
      throw new ExternalServiceError(
        OpenAIResponsesService.name,
        OpenAIResponsesService.OPENAI_API_ERROR,
        {
          function: 'getResponse',
          params: `<private>`,
          message: err instanceof Error ? err.message : 'Unknown error occurred',
        },
        500,
        err instanceof Error ? err : undefined,
      )
    }
  }

  private formatUserMessage(prompt: string, jsonInputs?: string[]): string {
    let content = prompt

    if (jsonInputs?.length) {
      content += `\n\nHere are the relevant JSON inputs:\n`
      jsonInputs.forEach((json, idx) => {
        content += `\n[JSON ${idx + 1}]:\n${json}`
      })
    }

    return content
  }
}
