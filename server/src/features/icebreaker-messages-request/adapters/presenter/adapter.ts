import type { IcebreakerMessage } from '@domain'
import type { DriverPort } from './driver.port'
import type { PresenterPort } from '../../use-case/presenter.port'

export class Adapter implements PresenterPort {
  constructor(public driver: DriverPort) {
    // Empty
  }

  // on error
  showRequestError(error: Error): void {
    const name = 'bad_request'
    this.driver.badRequestError(name, error)
  }
  showSenderProfileError(error: Error): void {
    const name = 'sender_profile'
    this.driver.linkedinApiError(name, error)
  }
  showReceiverProfileError(error: Error): void {
    const name = 'receiver_profile'
    this.driver.linkedinApiError(name, error)
  }
  showSenderPostsError(error: Error): void {
    const name = 'sender_posts'
    this.driver.linkedinApiError(name, error)
  }
  showReceiverPostsError(error: Error): void {
    const name = 'receiver_posts'
    this.driver.linkedinApiError(name, error)
  }
  showSenderCommentsError(error: Error): void {
    const name = 'sender_comments'
    this.driver.linkedinApiError(name, error)
  }
  showReceiverReactionsError(error: Error): void {
    const name = 'receiver_reactions'
    this.driver.linkedinApiError(name, error)
  }
  showMessagesTemplateError(error: Error): void {
    const name = 'messages_template'
    this.driver.linkedinApiError(name, error)
  }
  showAIError(error: Error): void {
    const name = 'ai_response'
    this.driver.aiError(name, error)
  }
  showUnexpectedError(error: Error): void {
    if (error.message === 'linkedin-api-rate-limit') {
      const name = 'linkedin_api_rate_limit'
      this.driver.linkedinApiError(name, error)
      return
    }
    const name = 'unexpected_error'
    this.driver.unknownError(name, error)
  }

  // on success
  showIcebreakerMessages(messages: IcebreakerMessage[]): void {
    const messagesPayload = messages.map(message => message.toPrimitive())
    this.driver.show(messagesPayload)
  }
}
