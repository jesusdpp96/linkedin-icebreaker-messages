import { z } from 'zod'

export const conditions = z.object({
  id: z.number().int().min(1),
  reactedToContent: z.string().max(1500),
  reaction: z.string().max(255),
  reactionByUsername: z.string().min(1).max(255),
})
