import type { ErrorsCollection, IcebreakerMessage } from '@domain'
import type { PresenterDriverPort } from './driver.port'

export class PresenterAdapter {
  constructor(public driver: PresenterDriverPort) {
    // Empty
  }

  public reportError(error: ErrorsCollection): void {
    this.driver.reportError(error)
  }

  // on success
  public reportSuccess(messages: IcebreakerMessage[]): void {
    const messagesPayload = messages.map(message => message.toJSON())
    this.driver.reportSuccess(messagesPayload)
  }
}
