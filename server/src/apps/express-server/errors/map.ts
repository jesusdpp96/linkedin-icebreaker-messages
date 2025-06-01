import { AppError } from './enum'

/**
 * AppErrorDetails interface
 * Represents the details of an application error
 */
export interface AppErrorDetails {
  status: number
  name: string
  message: string
}

/**
 * MAP object
 * Maps AppError enum values to their corresponding AppErrorDetails
 */
export const MAP: {
  [key in AppError]: AppErrorDetails
} = {
  /**
   * icebreaker-messages route
   */
  [AppError.MISSING_LINKEDIN_API_KEY]: {
    status: 400,
    name: 'missing_app_configuration',
    message: '[ES App] Missing LinkedIn API key in app configuration',
  },
  [AppError.REQUEST_LIMIT_REACHED]: {
    status: 429,
    name: 'request_limit_reached',
    message: '[ES App] Request limit reached',
  },
  /**
   * development-only middleware
   */
  [AppError.MISSING_ENVIRONMENT_DEFINITION]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Missing environment definition in app configuration',
  },
  [AppError.ROUTE_NOT_AVAILABLE]: {
    status: 400,
    name: 'route_not_available',
    message: '[ES App] Route not available',
  },
  [AppError.INVALID_ENVIRONMENT]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Invalid environment',
  },
  /**
   * icebreaker-messages middleware
   */
  [AppError.MISSING_FEATURE_FLAG]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Missing feature flag in app configuration',
  },
  [AppError.INVALID_FEATURE_FLAG]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Invalid feature flag in app configuration',
  },
  /**
   * fake error controller
   */
  [AppError.FAKE_ERROR]: {
    status: 500,
    name: 'fake_error',
    message: '[ES App] Fake error occurred',
  },
  /**
   * openai-api route
   */
  [AppError.MISSING_OPENAI_API_KEY]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Missing OpenAI API key in app configuration',
  },
  [AppError.MISSING_OPENAI_MODEL]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Missing OpenAI model in app configuration',
  },
  [AppError.MISSING_REQUIRED_QUERY_PARAM]: {
    status: 400,
    name: 'missing_required_query_param',
    message: '[ES App] Missing required query param',
  },
  [AppError.OPEN_AI_UNEXPECTED_ERROR]: {
    status: 500,
    name: 'openai_unexpected_error',
    message:
      '[ES App] An unexpected error occurred while processing the prompt with OpenAI API',
  },
  /**
   * generic error
   */
  [AppError.UNEXPECTED_ERROR]: {
    status: 500,
    name: 'unexpected_error',
    message: '[ES App] An unexpected error occurred',
  },
  /**
   * features
   */
  [AppError.MISSING_FEATURE_ICEBREAKER_MESSAGES_STRATEGY]: {
    status: 500,
    name: 'missing_app_configuration',
    message: '[ES App] Missing feature icebreaker messages strategy in app configuration',
  },
}
