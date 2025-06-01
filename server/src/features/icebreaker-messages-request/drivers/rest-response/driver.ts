import {
  ExternalServiceError,
  IcebreakerMessagesRequest,
  RuleValidationError,
  type BaseErrorAsJSON,
  type ErrorsCollection,
  type IcebreakerMessagePayload,
} from '@domain'
import type { Response } from 'express'
import type { PresenterDriverPort } from '../../use-case/adapters/presenter'

export interface ErrorDetails {
  status: 'error'
  name: string
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any
}

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

  public sendResponse(res: Response): void {
    if (this.isError) {
      this.sendErrorResponse(res)
      return
    }
    this.sendSuccessResponse(res)
  }

  private sendSuccessResponse(res: Response): void {
    res.status(200).send({
      status: 'success',
      data: this.data as IcebreakerMessagePayload[],
    })
  }

  private sendErrorResponse(res: Response): void {
    const error = this.error as BaseErrorAsJSON
    if (
      error.name === RuleValidationError.name &&
      error.code === IcebreakerMessagesRequest.name
    ) {
      const details: ErrorDetails = {
        status: 'error',
        name: 'bad_request',
        message: error.message,
        details: error.metadata.issues,
      }
      res.status(error.statusCode).send(details)
    } else if (error.name === RuleValidationError.name) {
      const details: ErrorDetails = {
        status: 'error',
        name: 'domain',
        message: error.message,
        details: error.metadata.issues,
      }
      res.status(error.statusCode).send(details)
    } else if (
      error.name === ExternalServiceError.name &&
      error.code.toLocaleLowerCase().includes('linkedin')
    ) {
      const details: ErrorDetails = {
        status: 'error',
        name: 'linkedin_issue',
        message: error.message,
        details: error.metadata,
      }
      res.status(error.statusCode).send(details)
    } else if (
      error.name === ExternalServiceError.name &&
      error.code.toLocaleLowerCase().includes('openai')
    ) {
      const details: ErrorDetails = {
        status: 'error',
        name: 'ai_response',
        message: error.message,
        details: error.metadata,
      }
      res.status(error.statusCode).send(details)
    } else {
      const details: ErrorDetails = {
        status: 'error',
        name: 'unexpected_error',
        message: error.message,
        details: error.metadata,
      }
      res.status(error.statusCode).send(details)
    }
  }
}
