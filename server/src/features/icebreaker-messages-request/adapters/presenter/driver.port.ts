import type { IcebreakerMessagePayload } from '@domain'

export interface DriverPort {
  // errors
  badRequestError(name: string, error: Error): void
  linkedinApiError(name: string, error: Error): void
  unknownError(name: string, error: Error): void
  aiError(name: string, error: Error): void

  // success
  show(messages: IcebreakerMessagePayload[]): void
}
