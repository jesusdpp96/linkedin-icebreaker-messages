import express from 'express'
import { corsMiddleware } from './middlewares/cors.middleware'
import healthRouter from './routes/health.route'

const app = express()

// Middlewares
app.use(corsMiddleware)
app.use(express.json())

// Routes
app.use('/api', healthRouter)

export default app
