import type { Request, Response, NextFunction } from 'express'
import { config } from '../config'

/**
 * Middleware to handle feature flag routing
 * Redirects requests based on FEATURE_ICEBREAKER_MESSAGES_STRATEGY value
 */
export const icebreakerMessagesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const featureFlag = config.FEATURE_ICEBREAKER_MESSAGES_STRATEGY

  if (!featureFlag) {
    res.status(500).json({
      status: 'error',
      name: 'missing-feature-flag',
      message: 'missing-feature-flag',
    })
    return
  }

  // Only apply redirection logic to the specific endpoint
  if (req.path === '/api/icebreaker-messages') {
    switch (featureFlag) {
      case 'response':
        // Normal flow, continue to the original handler
        next()
        return
      case 'fake_success':
        // Change the path and forward to fake success handler
        req.url = '/api/icebreaker-messages/fake-success'
        next()
        return
      case 'fake_error':
        // Change the path and forward to fake error handler
        req.url = '/api/icebreaker-messages/fake-error'
        next()
        return
      case 'fake_random':
        // Change the path and forward to fake random handler
        req.url = '/api/icebreaker-messages/fake-random'
        next()
        return
      default:
        // If feature flag value is not recognized, return an error
        res.status(500).json({
          status: 'error',
          name: 'invalid-feature-flag',
          message: `Invalid feature flag value: ${featureFlag}`,
        })
        return
    }
  }

  // For all other routes, continue normally
  next()
}
