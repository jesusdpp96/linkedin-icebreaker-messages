import type { IcebreakerMessage } from '@domain'
import type { DriverPort } from './driver.port'
import type { PresenterPort } from '../../use-case/presenter.port'
import { FeatureError } from '../../errors'

export class Adapter implements PresenterPort {
  constructor(public driver: DriverPort) {
    // Empty
  }

  // on error
  showRequestError(error: Error): void {
    this.driver.reportError(FeatureError.BAD_REQUEST, error)
  }
  showSenderProfileError(error: Error): void {
    this.driver.reportError(FeatureError.SENDER_PROFILE, error)
  }
  showReceiverProfileError(error: Error): void {
    this.driver.reportError(FeatureError.RECEIVER_PROFILE, error)
  }
  showSenderPostsError(error: Error): void {
    this.driver.reportError(FeatureError.SENDER_POSTS, error)
  }
  showReceiverPostsError(error: Error): void {
    this.driver.reportError(FeatureError.RECEIVER_POSTS, error)
  }
  showSenderCommentsError(error: Error): void {
    this.driver.reportError(FeatureError.SENDER_COMMENTS, error)
  }
  showReceiverReactionsError(error: Error): void {
    this.driver.reportError(FeatureError.RECEIVER_REACTIONS, error)
  }
  showMessagesTemplateError(error: Error): void {
    this.driver.reportError(FeatureError.MESSAGES_TEMPLATE, error)
  }
  showAIError(error: Error): void {
    this.driver.reportError(FeatureError.AI_RESPONSE, error)
  }
  showUnexpectedError(error: Error): void {
    if (error.message === 'linkedin-api-rate-limit') {
      this.driver.reportError(FeatureError.LINKEDIN_API_RATE_LIMIT, error)
      return
    }
    this.driver.reportError(FeatureError.UNEXPECTED_ERROR, error)
  }

  // on success
  showIcebreakerMessages(messages: IcebreakerMessage[]): void {
    const messagesPayload = messages.map(message => message.toPrimitive())
    this.driver.reportSuccess(messagesPayload)
  }
}
