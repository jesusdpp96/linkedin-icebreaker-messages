import type { IcebreakerMessagePayload } from '@domain'
import type { PresenterDriverPort } from '../../adapters/presenter'
import type { FeatureError } from '../../errors'
import { errorMapper } from '../../errors'
import type { FeatureErrorDetails } from '../../errors'

export class Driver implements PresenterDriverPort {
  public error!:
    | {
        instance: Error
        details: FeatureErrorDetails
      }
    | undefined

  public data!: IcebreakerMessagePayload[] | undefined

  constructor() {
    // empty
  }

  public get isError() {
    return this.error !== undefined
  }

  public reportError(name: FeatureError, error: Error): void {
    const err = errorMapper(name)
    this.error = {
      instance: error,
      details: err,
    }
    this.data = undefined
  }

  public reportSuccess(messages: IcebreakerMessagePayload[]): void {
    this.error = undefined
    this.data = messages
  }
}
