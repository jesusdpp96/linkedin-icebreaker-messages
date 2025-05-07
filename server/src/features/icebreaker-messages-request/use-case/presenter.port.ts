import type { IcebreakerMessage } from 'domain/entities/icebreaker-message'

export interface PresenterPort {
  // on error
  showRequestError(error: Error): void
  showSenderProfileError(error: Error): void
  showReceiverProfileError(error: Error): void
  showSenderPostsError(error: Error): void
  showReceiverPostsError(error: Error): void
  showSenderCommentsError(error: Error): void
  showReceiverReactionsError(error: Error): void
  showMessagesTemplateError(error: Error): void
  showAIError(error: Error): void
  showUnexpectedError(error: Error): void

  // on success
  showIcebreakerMessages(messages: IcebreakerMessage[]): void
}
