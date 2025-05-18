/**
 * @route GET /openai-api
 * @description Endpoint to interact with the OpenAI API. This endpoint was created solely for direct testing of the OpenAIChatService. It processes a given prompt and optionally additional JSON inputs, and returns the response from the OpenAI API.
 *
 * @queryparam {string} prompt - The prompt to be sent to the OpenAI API. This parameter is required.
 * @queryparam {string} [json] - Optional JSON input to provide additional context or data for the OpenAI API.
 *
 * @response {200} Success - Returns the response from the OpenAI API.
 * @response {400} Bad Request - Missing required query parameter `prompt`.
 * @response {500} Internal Server Error - Missing OpenAI API key in the configuration or an error occurred while processing the prompt.
 *
 * @example
 * // Request
 * GET /openai-api?prompt=Hello%20world
 *
 * // Successful Response
 * {
 *   "status": "success",
 *   "data": { ...OpenAIResponse }
 * }
 *
 * @example
 * // Error Response (Missing prompt)
 * {
 *   "status": "error",
 *   "message": "Missing required query param: prompt"
 * }
 *
 * @example
 * // Error Response (Server error)
 * {
 *   "status": "error",
 *   "message": "Failed to process prompt with OpenAI API",
 *   "details": "Error details here"
 * }
 *
 * @note This route is not intended for production use and serves only as a testing utility.
 * @note developmentOnly is used to prevent direct requests to this route in production.
 */
import type { Request, Response } from 'express'
import { Router } from 'express'
import { OpenAIChatService } from '@services'
import { config } from '../config'

const router = Router()

router.get('/openai-api', async (req: Request, res: Response) => {
  const apiKey = config.OPENAI_API_KEY
  const model = config.OPENAI_MODEL

  if (!apiKey) {
    res.status(500).json({ status: 'error', message: 'Missing OpenAI API key in config.' })
    return
  }

  if (!model) {
    res.status(500).json({ status: 'error', message: 'Missing OpenAI model in config.' })
    return
  }

  const prompt = req.query.prompt as string
  const json = req.query.json as string | undefined

  if (!prompt) {
    res.status(400).json({ status: 'error', message: 'Missing required query param: prompt' })
    return
  }

  const openaiService = new OpenAIChatService({ apiKey, model })

  try {
    const jsonInputs = json ? [json] : undefined

    const response = await openaiService.sendMessage({
      prompt,
      jsonInputs,
    })

    res.status(200).json({ status: 'success', data: response })
    return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('[OpenAI API error]:', error.message)
    res.status(500).json({
      status: 'error',
      message: 'Failed to process prompt with OpenAI API',
      details: error.message,
    })
    return
  }
})

export default router
