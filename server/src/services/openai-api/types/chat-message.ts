/**
 * Structure of messages used in the chat history.
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}
