import { FeatureError } from './enum'

export interface FeatureErrorDetails {
  status: number
  name: string
  message: string
}

export const MAP: {
  [key in FeatureError]: FeatureErrorDetails
} = {
  [FeatureError.BAD_REQUEST]: {
    status: 400,
    name: 'bad_request',
    message: 'Bad request',
  },
  [FeatureError.SENDER_PROFILE]: {
    status: 504,
    name: 'sender_profile',
    message: 'Failed to fetch sender profile',
  },
  [FeatureError.RECEIVER_PROFILE]: {
    status: 504,
    name: 'receiver_profile',
    message: 'Failed to fetch receiver profile',
  },
  [FeatureError.SENDER_POSTS]: {
    status: 504,
    name: 'sender_posts',
    message: 'Failed to fetch sender posts',
  },
  [FeatureError.RECEIVER_POSTS]: {
    status: 504,
    name: 'receiver_posts',
    message: 'Failed to fetch receiver posts',
  },
  [FeatureError.SENDER_COMMENTS]: {
    status: 504,
    name: 'sender_comments',
    message: 'Failed to fetch sender comments',
  },
  [FeatureError.RECEIVER_REACTIONS]: {
    status: 504,
    name: 'receiver_reactions',
    message: 'Failed to fetch receiver reactions',
  },
  [FeatureError.MESSAGES_TEMPLATE]: {
    status: 500,
    name: 'messages_template',
    message: 'Failed to generate messages template',
  },
  [FeatureError.AI_RESPONSE]: {
    status: 504,
    name: 'ai_response',
    message: 'Failed to generate AI response',
  },
  [FeatureError.LINKEDIN_API_RATE_LIMIT]: {
    status: 429,
    name: 'linkedin_api_rate_limit',
    message: 'LinkedIn API rate limit exceeded',
  },
  [FeatureError.UNEXPECTED_ERROR]: {
    status: 500,
    name: 'unexpected_error',
    message: 'An unexpected error occurred',
  },
}
