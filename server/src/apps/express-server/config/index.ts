import dotenv from 'dotenv'
import { AppError } from '../errors'

dotenv.config()

/**
 * Configuriing Services
 */
const linkedinApiKey = process.env.LINKEDIN_API_KEY
const openaiApiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_MODEL
const feature_strategy = process.env.FEATURE_ICEBREAKER_MESSAGES_STRATEGY

if (!linkedinApiKey) {
  throw new Error(AppError.MISSING_LINKEDIN_API_KEY)
}
if (!openaiApiKey) {
  throw new Error(AppError.MISSING_OPENAI_API_KEY)
}
if (!model) {
  throw new Error(AppError.MISSING_OPENAI_MODEL)
}
if (!feature_strategy) {
  throw new Error(AppError.MISSING_FEATURE_ICEBREAKER_MESSAGES_STRATEGY)
}

export const config = {
  NODE_ENV: process.env.NODE_ENV || '',
  port: process.env.PORT || 3001,
  LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY || 'api-key',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'api-key',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '',
  FEATURE_ICEBREAKER_MESSAGES_STRATEGY: process.env.FEATURE_ICEBREAKER_MESSAGES_STRATEGY || '',
}
