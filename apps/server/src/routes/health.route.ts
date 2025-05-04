import type { Request, Response } from 'express'
import { Router } from 'express'

const router = Router()

router.get('/health', (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json({ status: 'ok' })
  }, 2000)
})

export default router
