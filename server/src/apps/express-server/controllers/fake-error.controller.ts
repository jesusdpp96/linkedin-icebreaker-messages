import type { Request, Response } from 'express'
import { AppError, errorMapper } from '../errors'

/**
 * Handler for fake error response
 * Returns a predefined error response
 */
export const fakeErrorHandler = (req: Request, res: Response) => {
  // Get the original request data for reference
  const { senderUrl, problemDescription, solutionDescription, receiverUrl } = req.body

  const errorDetails = errorMapper(AppError.FAKE_ERROR)

  // Return a error response
  res.status(errorDetails.status).json({
    status: 'error',
    name: errorDetails.name,
    message: errorDetails.message,
  })
}
