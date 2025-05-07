import type { MessageTemplatePayload } from '@domain'
import type { Result } from 'ts-results'

export interface DriverPort {
  getMessagesTemplate(): Promise<Result<MessageTemplatePayload[], Error>>
}
