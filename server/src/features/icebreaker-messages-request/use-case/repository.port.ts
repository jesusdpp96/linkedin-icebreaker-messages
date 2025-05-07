import type { Result } from 'ts-results'
import type { MessageTemplate } from '@domain'

export interface RepositoryPort {
  getMessagesTemplate(): Promise<Result<MessageTemplate[], Error>>
}
