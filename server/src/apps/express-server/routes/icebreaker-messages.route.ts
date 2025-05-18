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
 * @throws {Error} missing-linkedin-api-key - Thrown if the LinkedIn API key is not configured.
 * @throws {Error} missing-openai-api-key - Thrown if the OpenAI API key is not configured.
 * @throws {Error} missing-openai-model - Thrown if the OpenAI model is not configured.
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
 * // Error response (missing API key)
 * {
 *   "status": "error",
 *   "name": "missing_app_configuration",
 *   "message": "Sorry, the app is not properly configured"
 * }
 *
 * // Error response (unexpected error)
 * {
 *   "status": "error",
 *   "name": "unexpected_error",
 *   "message": "Sorry, something unexpected went wrong"
 * }
 */
import type { Request, Response } from 'express'
import { Router } from 'express'
import { LinkedInService, MessagesTemplatesDbService, OpenAIChatService } from '@services'
import {
  ApiRestResponseDriver,
  ApisDriver,
  IcebreakerMessagesController,
  InRamDbDriver,
} from '@features/icebreaker-messages-request'
import { config } from '../config'
import { AppError, errorMapper } from '../errors'

const router = Router()

router.post('/icebreaker-messages', async (req: Request, res: Response) => {
  const { senderUrl, problemDescription, solutionDescription, receiverUrl } = req.body

  try {
    /**
     * Configuriing Services
     */
    const linkedinApiKey = config.LINKEDIN_API_KEY
    const openaiApiKey = config.OPENAI_API_KEY
    const model = config.OPENAI_MODEL
    if (!linkedinApiKey) {
      throw new Error(AppError.MISSING_LINKEDIN_API_KEY)
    }
    if (!openaiApiKey) {
      throw new Error(AppError.MISSING_OPENAI_API_KEY)
    }
    if (!model) {
      throw new Error(AppError.MISSING_OPENAI_MODEL)
    }
    const linkedinService = new LinkedInService({ apiKey: linkedinApiKey })
    const openaiService = new OpenAIChatService({ apiKey: openaiApiKey, model: model })
    const messagesTemplatesDbService = new MessagesTemplatesDbService()
    /**
     * Configuring Drivers
     */
    const serviceDriver = new ApisDriver({
      linkedinService: linkedinService,
      openaiService: openaiService,
    })
    const presenterDriver = new ApiRestResponseDriver()
    const repositoryDriver = new InRamDbDriver({
      messagesTemplatesDbService: messagesTemplatesDbService,
    })
    /**
     * Configuring Controller
     */
    const controller = new IcebreakerMessagesController(
      serviceDriver,
      repositoryDriver,
      presenterDriver,
    )
    /**
     * Executing use case
     */
    await controller.executeImpl({
      senderLinkedinUrl: senderUrl,
      problemDescription: problemDescription,
      solutionDescription: solutionDescription,
      receiverLinkedinUrl: receiverUrl,
    })
    /**
     * Presenting response
     */
    if (presenterDriver.isError) {
      // present error response
      res.status(presenterDriver.error?.details.status || 500).send({
        status: 'error',
        name: presenterDriver.error?.details.name,
        message: `${presenterDriver.error?.details.message} - ${presenterDriver.error?.instance.message}`,
      })
      return
    }
    // present success response
    res.status(200).send({
      status: 'success',
      data: presenterDriver.data,
    })
    return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorDetails = errorMapper(err.message)
    res.status(errorDetails.status).send({
      status: 'error',
      name: errorDetails.name,
      message: `${errorDetails.message} - ${err.message}`,
    })
  }
})

export default router
