import type { ErrorStrategy } from './contract'
import type { ErrorsCollection } from '../collection'
import { RuleValidationError } from '../rule-validation.error'
import { RuleValidationErrorStrategy } from './rule-validation-error.strategy'
import { ExternalServiceError } from '../external-service.error'
import { ExternalServiceErrorStrategy } from './external-service-error.strategy'
import { DefaultStrategy } from './default.strategy'

export class CatchedInAdapter {
  private strategy: ErrorStrategy

  constructor(
    error: Error,
    serviceName: string,
    functionName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: Record<string, any> = {},
  ) {
    if (error instanceof RuleValidationError) {
      this.strategy = new RuleValidationErrorStrategy(error, serviceName, functionName)
    } else if (error instanceof ExternalServiceError) {
      this.strategy = new ExternalServiceErrorStrategy(error, serviceName, functionName)
    } else {
      this.strategy = new DefaultStrategy(error, serviceName, functionName, parameters)
    }
  }

  setStrategy(strategy: ErrorStrategy): void {
    this.strategy = strategy
  }

  adjust(): ErrorsCollection {
    return this.strategy.adjust()
  }
}
