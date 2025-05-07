import type { IcebreakerMessagePayload } from '@domain'

export interface DriverPort {
  // errors
  badRequestError(error: Error): void
  linkedinApiError(error: Error): void
  unknownError(error: Error): void
  aiError(error: Error): void

  // success
  show(messages: IcebreakerMessagePayload[]): void
}
