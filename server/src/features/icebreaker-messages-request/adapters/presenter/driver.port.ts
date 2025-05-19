import type { IcebreakerMessagePayload } from '@domain'
import type { FeatureError } from '../../errors'

export interface DriverPort {
  // errors
  reportError(name: FeatureError, error: Error): void
  // success
  reportSuccess(messages: IcebreakerMessagePayload[]): void
}
