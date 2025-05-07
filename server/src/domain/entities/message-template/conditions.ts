import { z } from 'zod'

export const conditions = z.object({
  id: z.number().int().min(1),
  title: z.string(),
  category: z.string(),
  instruction: z.string(),
  example: z.string(),
})
