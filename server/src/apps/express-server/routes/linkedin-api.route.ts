/**
 * @route GET /linkedin-api
 * @description This route is created solely for testing the functionality of the LinkedInService
 *              by providing a direct endpoint. It allows fetching LinkedIn profile data, reactions,
 *              posts, and comments based on the specified query parameters.
 *
 * @queryparam {string} url - The LinkedIn profile URL (required for 'profile' type).
 * @queryparam {string} type - The type of data to fetch. Possible values are:
 *                             'profile', 'reactions', 'posts', 'comments'. Defaults to 'profile'.
 * @queryparam {string} [username] - The LinkedIn username (required for 'reactions', 'posts', and 'comments' types).
 * @queryparam {string} [start] - The starting point for pagination (optional, used for 'posts' type).
 * @queryparam {string} [paginationToken] - The token for pagination (optional, used for 'posts' type).
 * @queryparam {string} [postedAt] - The timestamp to filter posts (optional, used for 'posts' type).
 *
 * @response {200} Success - Returns the requested data from LinkedIn.
 * @response {400} Error - Returns an error message if the type is invalid or required parameters are missing.
 *
 * @note This route is not intended for production use and serves only as a testing utility.
 */
import type { Request, Response } from 'express'
import { Router } from 'express'
import { LinkedInService } from '@services'
import { config } from '../config'

const router = Router()

router.get('/linkedin-api', async (req: Request, res: Response) => {
  const apiKey = config.LINKEDIN_API_KEY
  const linkedinService = new LinkedInService({ apiKey })

  const url = req.query.url as string
  const type = (req.query.type as string) || 'profile'

  switch (type) {
    case 'profile': {
      const response = await linkedinService.getProfileDataByUrl(url)
      res.status(200).json({ status: 'success', data: response })
      return
    }
    case 'reactions': {
      const username = req.query.username as string
      const reactionsResponse = await linkedinService.getProfileReactions(username)
      res.status(200).json({ status: 'success', data: reactionsResponse })
      return
    }
    case 'posts': {
      const username = req.query.username as string
      const start = req.query.start as string
      const paginationToken = req.query.paginationToken as string
      const postedAt = req.query.postedAt as string

      const postsResponse = await linkedinService.getProfilePosts(username, {
        start,
        paginationToken,
        postedAt,
      })
      res.status(200).json({ status: 'success', data: postsResponse })
      return
    }
    case 'comments': {
      const username = req.query.username as string
      const commentsResponse = await linkedinService.getProfileComments(username)
      res.status(200).json({ status: 'success', data: commentsResponse })
      return
    }
    default:
      res.status(400).json({ status: 'error', message: 'Invalid type' })
  }
})

export default router
