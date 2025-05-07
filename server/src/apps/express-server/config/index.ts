import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 3001,
  LINKEDIN_API_KEY: process.env.LINKEDIN_API_KEY || 'api-key',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || 'api-key',
  OPENAI_MODEL: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
}
