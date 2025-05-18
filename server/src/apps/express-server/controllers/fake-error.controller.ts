import type { Request, Response } from 'express'

/**
 * Handler for fake error response
 * Returns a predefined error response
 */
export const fakeErrorHandler = (req: Request, res: Response) => {
  // Get the original request data for reference
  const { senderUrl, problemDescription, solutionDescription, receiverUrl } = req.body

  // Return a error response
  res.status(500).json({
    status: 'error',
    name: 'unexpected_error',
    message: 'Lo sentimos, algo inesperado salio mal',
  })
}
