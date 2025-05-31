import type { BaseErrorAsJSON, ErrorsCollection, IcebreakerMessagePayload } from '@domain'
import type { PresenterDriverPort } from '../../use-case/adapters/presenter'

export class Driver implements PresenterDriverPort {
  public error!: BaseErrorAsJSON | undefined

  public data!: IcebreakerMessagePayload[] | undefined

  constructor() {
    // empty
  }

  public get isError() {
    return this.error !== undefined
  }

  public reportError(error: ErrorsCollection): void {
    this.error = error.toJSON()
    this.data = undefined
  }

  public reportSuccess(messages: IcebreakerMessagePayload[]): void {
    this.error = undefined
    this.data = messages
  }
}
