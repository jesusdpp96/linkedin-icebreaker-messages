import type { Request, Response } from 'express'
import { LinkedInService, MessagesTemplatesDbService, OpenAIResponsesService } from '@services'
import {
  RestResponseDriver,
  ApisDriver,
  IcebreakerMessagesController,
  InMemoryDriver,
} from '@features/icebreaker-messages-request'
import { config } from '../config'
import { errorMapper } from '../errors'
import { RequestCounter } from '../utils'

const requestCounter = RequestCounter.getInstance('/api/icebreaker-messages')

/**
 * Handler for fake successful response
 * Returns a predefined successful response
 */
export const icebreakerMessagesHandler = async (req: Request, res: Response) => {
  const { senderUrl, problemDescription, solutionDescription, receiverUrl } = req.body

  try {
    /**
     * Configuriing Services
     */
    const linkedinApiKey = config.LINKEDIN_API_KEY
    const openaiApiKey = config.OPENAI_API_KEY
    const model = config.OPENAI_MODEL
    const linkedinService = new LinkedInService({ apiKey: linkedinApiKey })
    const openaiService = new OpenAIResponsesService({ apiKey: openaiApiKey, model: model })
    const messagesTemplatesDbService = new MessagesTemplatesDbService()
    /**
     * Configuring Drivers
     */
    const serviceDriver = new ApisDriver({
      linkedinService: linkedinService,
      openaiService: openaiService,
    })
    const presenterDriver = new RestResponseDriver()
    const repositoryDriver = new InMemoryDriver({
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
    if (!presenterDriver.isError) {
      // Counting request for rate limiting
      requestCounter.handleRequest()
    }
    presenterDriver.sendResponse(res)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const errorDetails = errorMapper(err.message)
    res.status(errorDetails.status).send({
      status: 'error',
      name: errorDetails.name,
      message: `${errorDetails.message} - ${err.message}`,
    })
  }
}
