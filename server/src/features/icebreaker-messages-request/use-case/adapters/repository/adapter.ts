import { CatchedInAdapter } from '@domain'
import { MessageTemplate } from '@domain'
import type { RepositoryDriverPort } from './driver.port'

export class RepositoryAdapter {
  constructor(public driver: RepositoryDriverPort) {
    // Empty
  }
  /**
   * Get all messages template
   */
  public async getMessagesTemplate(): Promise<MessageTemplate[]> {
    const messagesTemplatePayloads = await this.driver.getMessagesTemplate()
    try {
      const messagesTemplate: MessageTemplate[] = []
      for (const messageTemplatePayload of messagesTemplatePayloads) {
        const messageTemplate = MessageTemplate.create(messageTemplatePayload)
        messagesTemplate.push(messageTemplate)
      }
      return messagesTemplate
    } catch (err) {
      const handler = new CatchedInAdapter(
        err as Error,
        RepositoryAdapter.name,
        this.getMessagesTemplate.name,
        {},
      )
      throw handler.adjust()
    }
  }
}
