import { FeatureError } from './enum'

/**
 * FeatureErrorDetails
 */
export interface FeatureErrorDetails {
  status: number
  name: string
  message: string
}

/**
 * MAP
 * Map of FeatureError to FeatureErrorDetails
 */
export const MAP: {
  [key in FeatureError]: FeatureErrorDetails
} = {
  [FeatureError.BAD_REQUEST]: {
    status: 400,
    name: 'bad_request',
    message: '[IMR Feature] Bad request',
  },
  [FeatureError.SENDER_PROFILE]: {
    status: 504,
    name: 'sender_profile',
    message: '[IMR Feature] Failed to fetch sender profile',
  },
  [FeatureError.RECEIVER_PROFILE]: {
    status: 504,
    name: 'receiver_profile',
    message: '[IMR Feature] Failed to fetch receiver profile',
  },
  [FeatureError.SENDER_POSTS]: {
    status: 504,
    name: 'sender_posts',
    message: '[IMR Feature] Failed to fetch sender posts',
  },
  [FeatureError.RECEIVER_POSTS]: {
    status: 504,
    name: 'receiver_posts',
    message: '[IMR Feature] Failed to fetch receiver posts',
  },
  [FeatureError.SENDER_COMMENTS]: {
    status: 504,
    name: 'sender_comments',
    message: '[IMR Feature] Failed to fetch sender comments',
  },
  [FeatureError.RECEIVER_REACTIONS]: {
    status: 504,
    name: 'receiver_reactions',
    message: '[IMR Feature] Failed to fetch receiver reactions',
  },
  [FeatureError.MESSAGES_TEMPLATE]: {
    status: 500,
    name: 'messages_template',
    message: '[IMR Feature] Failed to generate messages template',
  },
  [FeatureError.AI_RESPONSE]: {
    status: 504,
    name: 'ai_response',
    message: '[IMR Feature] Failed to generate AI response',
  },
  [FeatureError.LINKEDIN_API_RATE_LIMIT]: {
    status: 429,
    name: 'linkedin_api_rate_limit',
    message: '[IMR Feature] LinkedIn API rate limit exceeded',
  },
  [FeatureError.UNEXPECTED_ERROR]: {
    status: 500,
    name: 'unexpected_error',
    message: '[IMR Feature] An unexpected error occurred',
  },
}
