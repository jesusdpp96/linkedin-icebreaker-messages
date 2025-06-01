import type { MessageTemplatePayload } from '@domain'

export interface RepositoryDriverPort {
  getMessagesTemplate(): Promise<MessageTemplatePayload[]>
}
