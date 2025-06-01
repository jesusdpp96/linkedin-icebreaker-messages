import type { MessageTemplatePayload } from '@domain'
import type { RepositoryDriverPort } from '../../use-case/adapters/repository'
import type { ServicePort } from './service.port'

export class Driver implements RepositoryDriverPort {
  constructor(private servicePort: ServicePort) {
    // empty
  }
  /**
   * Get a listing by its id from the database
   */
  public async getMessagesTemplate(): Promise<MessageTemplatePayload[]> {
    const data = await this.servicePort.messagesTemplatesDbService.getMessagesTemplates()
    const messages: MessageTemplatePayload[] = data.map((message, index) => ({
      id: message?.id || index + 1,
      title: message?.title || ``,
      category: message?.category || ``,
      instruction: message?.instruction || ``,
      example: message?.example || ``,
    }))
    return messages
  }
}
