import { z } from 'zod'

export const conditions = z.object({
  message: z.string(),
  templateTitle: z.string(),
  templateCategory: z.string(),
  instruction: z.string(),
  sourcePosts: z.array(z.string()),
})
