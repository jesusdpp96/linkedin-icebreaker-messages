import { Router } from 'express'
import { fakeErrorHandler, fakeRandomHandler, fakeSuccessHandler } from '../controllers'

const router = Router()

/**
 * Route for fake successful response
 * @route POST /api/icebreaker-messages/fake-success
 */
router.post('/icebreaker-messages/fake-success', fakeSuccessHandler)

/**
 * Route for fake error response
 * @route POST /api/icebreaker-messages/fake-error
 */
router.post('/icebreaker-messages/fake-error', fakeErrorHandler)

/**
 * Route for fake random response (success or error)
 * @route POST /api/icebreaker-messages/fake-random
 */
router.post('/icebreaker-messages/fake-random', fakeRandomHandler)

export default router
