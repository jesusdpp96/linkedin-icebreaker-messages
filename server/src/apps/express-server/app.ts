import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware'
import healthRouter from './routes/health.route'
import linkedinRouter from './routes/linkedin-api.route'

const app = express()

// Middlewares
app.use(corsMiddleware)
app.use(express.json())

// Routes
app.use('/api', healthRouter)
app.use('/api', linkedinRouter)

export default app
