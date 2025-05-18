import type { Request, Response, NextFunction } from 'express'
import { config } from '../config'

const ROUTES_DEVELOPMENT_ONLY = ['/api/linkedin-api', '/api/openai-api']

/**
 * Middleware to handle development-only routes
 * Redirects requests based on NODE_ENV value
 * - In production, it returns an error for development-only routes
 * - In development, it allows access to these routes
 * - If NODE_ENV is not set, it returns an error
 */
export const developmentOnly = (req: Request, res: Response, next: NextFunction) => {
  const nodeEnv = config.NODE_ENV

  if (!nodeEnv) {
    res.status(500).json({
      status: 'error',
      name: 'missing-environment-definition',
      message: 'missing-environment-definition',
    })
    return
  }

  // Only apply redirection logic to the specific endpoints
  if (ROUTES_DEVELOPMENT_ONLY.includes(req.path)) {
    switch (nodeEnv) {
      case 'production':
        res.status(500).json({
          status: 'error',
          name: 'route-not-available',
          message: 'This route is not available in production mode',
        })
        return
      case 'development':
        // Normal flow, continue to the original handler
        next()
        return
      default:
        // If environment value is not recognized, return an error
        res.status(500).json({
          status: 'error',
          name: 'invalid-environment',
          message: `Invalid environment value: ${nodeEnv}`,
        })
        return
    }
  }

  // For all other routes, continue normally
  next()
}
