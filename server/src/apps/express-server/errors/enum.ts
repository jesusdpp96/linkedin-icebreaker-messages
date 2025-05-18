/**
 * Enum for application errors.
 * This enum is used to define the different types of errors that can occur in the application.
 */
export enum AppError {
  // icebreaker-messages route
  MISSING_LINKEDIN_API_KEY = 'missing-linkedin-api-key',
  // development-only middleware
  MISSING_ENVIRONMENT_DEFINITION = 'missing-environment-definition',
  ROUTE_NOT_AVAILABLE = 'route-not-available',
  INVALID_ENVIRONMENT = 'invalid-environment',
  // icebreaker-messages middleware
  MISSING_FEATURE_FLAG = 'missing-feature-flag',
  INVALID_FEATURE_FLAG = 'invalid-feature-flag',
  // fake error controller
  FAKE_ERROR = 'fake-error',
  // openai-api route
  MISSING_OPENAI_API_KEY = 'missing-openai-api-key',
  MISSING_OPENAI_MODEL = 'missing-openai-model',
  MISSING_REQUIRED_QUERY_PARAM = 'missing-required-query-param',
  OPEN_AI_UNEXPECTED_ERROR = 'openai-unexpected-error',
  // generic error
  UNEXPECTED_ERROR = 'unexpected-error',
}
