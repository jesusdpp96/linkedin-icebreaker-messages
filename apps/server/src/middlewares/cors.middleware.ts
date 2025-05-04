import cors from 'cors'

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    console.log('Origin:', origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
})
