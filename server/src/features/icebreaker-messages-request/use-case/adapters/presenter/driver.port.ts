import type { ErrorsCollection, IcebreakerMessagePayload } from '@domain'

export interface PresenterDriverPort {
  // errors
  reportError(error: ErrorsCollection): void
  // success
  reportSuccess(messages: IcebreakerMessagePayload[]): void
}
