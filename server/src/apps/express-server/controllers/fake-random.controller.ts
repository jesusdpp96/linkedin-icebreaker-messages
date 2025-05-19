import type { Request, Response } from 'express'
import { fakeSuccessHandler } from './fake-success.controller'
import { fakeErrorHandler } from './fake-error.controller'

/**
 * Handler for fake random response
 * Randomly returns either a success or error response
 */
export const fakeRandomHandler = (req: Request, res: Response) => {
  // Generate a random boolean (true or false)
  // If true, return success response, if false, return error response
  const isSuccess = Math.random() >= 0.5

  if (isSuccess) {
    // Delegate to success handler
    return fakeSuccessHandler(req, res)
  } else {
    // Delegate to error handler
    return fakeErrorHandler(req, res)
  }
}
