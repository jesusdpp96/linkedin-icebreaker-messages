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
      throw new Error('missing-linkedin-api-key')
    }
    if (!openaiApiKey) {
      throw new Error('missing-openai-api-key')
    }
    if (!model) {
      throw new Error('missing-openai-model')
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
      // error response
      res.status(presenterDriver.code).send({
        status: 'error',
        message: `${presenterDriver.source} - ${presenterDriver.error?.message}`,
      })
      return
    }
    // success response
    res.status(200).send({
      status: 'success',
      data: presenterDriver.data,
    })
    return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    switch (err?.message) {
      case 'missing-linkedin-api-key':
      case 'missing-openai-api-key':
      case 'missing-openai-model':
        res.status(500).json({
          status: 'error',
          message: 'Lo sentimos, la app no esta configurada correctamente',
        })
        return

      default:
        res.status(500).json({
          status: 'error',
          message: 'Lo sentimos, algo inesperado salio mal',
        })
        return
    }
  }
})

export default router
