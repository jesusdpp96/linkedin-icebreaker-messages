import { ExternalServiceError } from '../external-service.error'
import { CatchedInAdapter } from './context'
import type { ErrorStrategy } from './contract'

export class DefaultStrategy implements ErrorStrategy {
  constructor(
    private error: Error,
    private serviceName: string,
    private functionName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private parameters: Record<string, any> = {},
  ) {
    // empty constructor
  }
  adjust(): ExternalServiceError {
    const serviceError = new ExternalServiceError(
      this.serviceName,
      CatchedInAdapter.CATCHED_IN_ADAPTER,
      { function: this.functionName, params: JSON.stringify(this.parameters) },
      500,
      this.error as Error,
    )

    return serviceError
  }
}
