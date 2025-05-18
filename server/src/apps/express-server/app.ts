import express from 'express'
import { corsMiddleware, developmentOnly, icebreakerMessagesMiddleware } from './middlewares'
import healthRouter from './routes/health.route'
import linkedinApiRouter from './routes/linkedin-api.route'
import openaiApiRouter from './routes/openai-api.route'
import icebreakerMessagesRouter from './routes/icebreaker-messages.route'
import icebreakerFakeResponsesRouter from './routes/icebreaker-fake-responses.route'

const app = express()

// Middlewares
app.use(corsMiddleware)
app.use(developmentOnly)
app.use(icebreakerMessagesMiddleware)
app.use(express.json())

// Routes
app.use('/api', healthRouter)
app.use('/api', linkedinApiRouter)
app.use('/api', openaiApiRouter)
app.use('/api', icebreakerMessagesRouter)
app.use('/api', icebreakerFakeResponsesRouter)

export default app
