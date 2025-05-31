import type { RuleValidationError } from '../rule-validation.error'
import type { ErrorStrategy } from './contract'

export class RuleValidationErrorStrategy implements ErrorStrategy {
  constructor(
    private error: RuleValidationError,
    private serviceName: string,
    private functionName: string,
  ) {
    // empty constructor
  }
  adjust(): RuleValidationError {
    this.error.addContext(this.serviceName, this.functionName)
    return this.error
  }
}
