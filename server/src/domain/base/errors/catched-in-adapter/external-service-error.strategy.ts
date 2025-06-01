import type { ExternalServiceError } from '../external-service.error'
import type { ErrorStrategy } from './contract'

export class ExternalServiceErrorStrategy implements ErrorStrategy {
  constructor(
    private error: ExternalServiceError,
    private serviceName: string,
    private functionName: string,
  ) {
    // empty constructor
  }
  adjust(): ExternalServiceError {
    this.error.addContext(this.serviceName, this.functionName)
    return this.error
  }
}
