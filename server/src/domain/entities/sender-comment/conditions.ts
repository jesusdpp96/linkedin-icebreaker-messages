import { z } from 'zod'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

export const conditions = z.object({
  id: z.number().int().min(1),
  commentedContent: z.string().max(1500),
  commentedInPublicationUrl: z.string().regex(urlRegex, 'post-invalid-url'),
  commentDate: z.date(),
  authorUsername: z.string().min(1).max(255),
})
