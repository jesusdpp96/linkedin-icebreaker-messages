/**
 * Route handler for generating icebreaker messages.
 *
 * @route POST /icebreaker-messages
 *
 * @description
 * This route processes a request to generate an icebreaker message using LinkedIn and OpenAI services.
 * It takes input data such as sender and receiver LinkedIn URLs, a problem description, and a solution description.
 * The route orchestrates the services and drivers to execute the use case and returns the generated message or an error response.
 *
 * @param {Request} req - The HTTP request object containing the following body parameters:
 *   @param {string} req.body.senderUrl - The LinkedIn URL of the sender.
 *   @param {string} req.body.problemDescription - A description of the problem to address.
 *   @param {string} req.body.solutionDescription - A description of the proposed solution.
 *   @param {string} req.body.receiverUrl - The LinkedIn URL of the receiver.
 *
 * @param {Response} res - The HTTP response object used to send the result back to the client.
 *
 *
 * @returns {void}
 * - On success: Responds with a 200 status and a JSON object containing the generated message.
 * - On error: Responds with a 500 status and a JSON object describing the error.
 *
 * @example
 * // Request body
 * {
 *   "senderUrl": "https://www.linkedin.com/in/sender-profile",
 *   "problemDescription": "We need to improve team collaboration.",
 *   "solutionDescription": "Implementing a new project management tool.",
 *   "receiverUrl": "https://www.linkedin.com/in/receiver-profile"
 * }
 *
 * // Success response
 * {
 *   "status": "success",
 *   "data": [
 *     {
 *       "message": "Hi [Receiver's Name], we share a passion for building people-centered and data-driven cultures. At [Your Company Name], we help optimize [Specialization Area] processes with [Brief Solution Description]. Would you be interested in exploring how we can enhance your strategies?",
 *       "templateTitle": "Reference to a mutual connection",
 *       "templateCategory": "Connection",
 *       "instruction": "Before sending, like their recent post about [Relevant Topic] to show interest.",
 *       "sourcePosts": [
 *         "https://www.linkedin.com/feed/update/urn:li:activity:[Post_ID]/"
 *       ],
 *       "receiverName": "[Receiver's Name]",
 *       "receiverProfilePicture": "[Receiver's Profile Picture URL]",
 *       "receiverHeadline": "[Receiver's Professional Headline]",
 *       "senderName": "[Your Name]",
 *       "senderProfilePicture": "[Your Profile Picture URL]",
 *       "senderHeadline": "[Your Professional Headline]"
 *     },
 *     {...},
 *     {...}
 *   ]
 * }
 *
 * // Error response (unexpected error)
 * {
 *   "status": "error",
 *   "name": "unexpected_error",
 *   "message": "Sorry, something unexpected went wrong"
 * }
 */
import { Router } from 'express'
import { icebreakerMessagesHandler } from '../controllers'

const router = Router()

router.post('/icebreaker-messages', icebreakerMessagesHandler)

export default router
