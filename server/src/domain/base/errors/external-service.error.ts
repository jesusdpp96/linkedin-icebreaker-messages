import { BaseError } from './base.error'

interface Metadata {
  function: string
  params: string
  message?: string
}

export class ExternalServiceError extends BaseError<Metadata> {
  /**
   *
   * @param artifactName Name of entity or value-object
   * @param metadata
   */
  constructor(
    serviceName: string,
    code: string,
    metadata: Metadata,
    statusCode = 400,
    cause?: Error,
  ) {
    super(`Error in service ${serviceName}`, code, statusCode, metadata, cause)
  }
}
