import dotenv from 'dotenv'

dotenv.config()

export const config = {
  NODE_ENV: process.env.NODE_ENV || '',
  port: process.env.PORT || 3001,
  LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY || 'api-key',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'api-key',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || '',
  FEATURE_ICEBREAKER_MESSAGES_STRATEGY: process.env.FEATURE_ICEBREAKER_MESSAGES_STRATEGY || '',
}
