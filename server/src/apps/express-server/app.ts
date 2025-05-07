import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware'
import healthRouter from './routes/health.route'
import linkedinApiRouter from './routes/linkedin-api.route'
import openaiApiRouter from './routes/openai-api.route'
import icebreakerMessagesRouter from './routes/icebreaker-messages.route'

const app = express()

// Middlewares
app.use(corsMiddleware)
app.use(express.json())

// Routes
app.use('/api', healthRouter)
app.use('/api', linkedinApiRouter)
app.use('/api', openaiApiRouter)
app.use('/api', icebreakerMessagesRouter)

export default app
