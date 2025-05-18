import type { Request, Response, NextFunction } from 'express'
import { config } from '../config'
import { AppError, errorMapper } from '../errors'

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
    const errorDetails = errorMapper(AppError.MISSING_ENVIRONMENT_DEFINITION)
    res.status(errorDetails.status).json({
      status: 'error',
      name: errorDetails.name,
      message: errorDetails.message,
    })
    return
  }

  // Only apply redirection logic to the specific endpoints
  if (ROUTES_DEVELOPMENT_ONLY.includes(req.path)) {
    switch (nodeEnv) {
      case 'production': {
        const errorDetails = errorMapper(AppError.ROUTE_NOT_AVAILABLE)
        res.status(errorDetails.status).json({
          status: 'error',
          name: errorDetails.name,
          message: errorDetails.message,
        })
        return
      }
      case 'development':
        // Normal flow, continue to the original handler
        next()
        return
      default: {
        // If environment value is not recognized, return an error
        const errorDetails = errorMapper(AppError.INVALID_ENVIRONMENT)
        res.status(errorDetails.status).json({
          status: 'error',
          name: errorDetails.name,
          message: errorDetails.message,
        })
        return
      }
    }
  }

  // For all other routes, continue normally
  next()
}
