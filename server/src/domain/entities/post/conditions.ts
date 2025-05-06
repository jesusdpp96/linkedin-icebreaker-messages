import { z } from 'zod'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

export const conditions = z.object({
  id: z.number().int().min(1),
  postedContent: z.string().max(1500),
  publicationUrl: z.string().regex(urlRegex, 'post-invalid-url'),
  postedDate: z.date(),
  authorUsername: z.string().min(1).max(255),
  hasMediaContent: z.boolean(),
})
