import { ExternalServiceError } from './external-service.error'
import { RuleValidationError } from './rule-validation.error'

export const isErrorsCollection = (error: unknown): boolean => {
  return error instanceof RuleValidationError || error instanceof ExternalServiceError
}
