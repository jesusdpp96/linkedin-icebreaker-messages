import type { IcebreakerMessage } from '@domain'
import type { DriverPort } from './driver.port'
import type { PresenterPort } from '../../use-case/presenter.port'

export class Adapter implements PresenterPort {
  constructor(public driver: DriverPort) {
    // Empty
  }

  // on error
  showRequestError(error: Error): void {
    this.driver.badRequestError(error)
  }
  showSenderProfileError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showReceiverProfileError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showSenderPostsError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showReceiverPostsError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showSenderCommentsError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showReceiverReactionsError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showMessagesTemplateError(error: Error): void {
    this.driver.linkedinApiError(error)
  }
  showAIError(error: Error): void {
    this.driver.aiError(error)
  }
  showUnexpectedError(error: Error): void {
    this.driver.unknownError(error)
  }

  // on success
  showIcebreakerMessages(messages: IcebreakerMessage[]): void {
    const messagesPayload = messages.map(message => message.toPrimitive())
    this.driver.show(messagesPayload)
  }
}
