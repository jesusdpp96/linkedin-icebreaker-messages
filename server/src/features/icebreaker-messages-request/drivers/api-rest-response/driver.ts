import type { Response } from 'express'
import type { IcebreakerMessagePayload } from '@domain'
import type { PresenterDriverPort } from '../../adapters/presenter'

export class Driver implements PresenterDriverPort {
  public error!: Error | undefined
  public isError!: boolean
  public source!: string | undefined
  public name!: string | undefined
  public code!: number
  public data!: IcebreakerMessagePayload[] | undefined

  constructor() {
    // empty
  }

  public badRequestError(name: string, error: Error): void {
    this.error = error
    this.isError = true
    this.source = 'BadRequest'
    this.code = 400
    this.name = name
    this.data = undefined
  }

  public linkedinApiError(name: string, error: Error): void {
    this.error = error
    this.isError = true
    this.source = 'LinkedInApi'
    this.code = 500
    this.name = name
    this.data = undefined
  }
  unknownError(name: string, error: Error): void {
    this.error = error
    this.source = 'Unknown'
    this.isError = true
    this.code = 500
    this.name = name
    this.data = undefined
  }
  aiError(name: string, error: Error): void {
    this.error = error
    this.source = 'AI'
    this.isError = true
    this.code = 500
    this.name = name
    this.data = undefined
  }

  public show(messages: IcebreakerMessagePayload[]): void {
    this.error = undefined
    this.isError = false
    this.code = 200
    this.data = messages
  }

  public sendResponse(res: Response): void {
    if (this.isError) {
      res.status(this.code).send({
        status: 'error',
        message: `${this.source} - ${this.error?.message}`,
      })
    } else {
      res.status(this.code).send({
        status: 'success',
        data: this.data,
      })
    }
  }
}
