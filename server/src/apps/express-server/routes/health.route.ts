/**
 * GET /health
 *
 * This route was created as an endpoint to test that the server is responding.
 * It responds with an HTTP 200 status and a JSON indicating the status is "ok".
 * Includes an intentional 2-second delay before sending the response.
 *
 * @param req - Express HTTP request object.
 * @param res - Express HTTP response object.
 */
import type { Request, Response } from 'express'
import { Router } from 'express'

const router = Router()

router.get('/health', (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json({ status: 'ok' })
  }, 2000)
})

export default router
