import type { ExternalServiceError } from './external-service.error'
import type { RuleValidationError } from './rule-validation.error'

export type ErrorsCollection = RuleValidationError | ExternalServiceError
