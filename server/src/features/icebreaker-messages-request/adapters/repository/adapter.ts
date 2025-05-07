import { Ok, type Result } from 'ts-results'
import { MessageTemplate } from '@domain'
import type { DriverPort } from './driver.port'
import type { RepositoryPort } from '../../use-case/repository.port'

export class Adapter implements RepositoryPort {
  constructor(public driver: DriverPort) {
    // Empty
  }
  /**
   * Get all messages template
   */
  public async getMessagesTemplate(): Promise<Result<MessageTemplate[], Error>> {
    const messagesTemplateResult = await this.driver.getMessagesTemplate()
    if (messagesTemplateResult.err) {
      return messagesTemplateResult
    }
    const messagesTemplateData = messagesTemplateResult.val
    const messagesTemplate: MessageTemplate[] = []
    for (const messageTemplateData of messagesTemplateData) {
      const messageTemplateResult = MessageTemplate.of(messageTemplateData)
      if (messageTemplateResult.err) {
        return messageTemplateResult
      }
      messagesTemplate.push(messageTemplateResult.val)
    }
    return Ok(messagesTemplate)
  }
}
