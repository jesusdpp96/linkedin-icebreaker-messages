/**
 * Parameters for sending a prompt to the OpenAI API.
 */
export interface ChatRequestOptions {
  /** The main prompt as a string. */
  prompt: string
  /**
   * Optional array of JSON inputs, already stringified.
   * These will be appended to the prompt contextually.
   */
  jsonInputs?: string[]
  /**
   * TODO: describe
   */
  structuredResponseSchema?: string
}
