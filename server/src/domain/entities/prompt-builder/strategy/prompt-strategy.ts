export interface PromptShot {
  prompt: string
  attachments: string[]
  responseJsonSchema: string
}

export interface PromptStrategy {
  /**
   * Generate one or more prompts based on the provided strategy to generate X messages.
   * @param numberOfMessages - The number of messages you want to generate
   */
  generatePrompts(numberOfMessages: number): PromptShot[]
}
