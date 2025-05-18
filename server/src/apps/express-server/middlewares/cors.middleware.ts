import cors from 'cors'

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    const originStr = origin || ''
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(originStr)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
})
