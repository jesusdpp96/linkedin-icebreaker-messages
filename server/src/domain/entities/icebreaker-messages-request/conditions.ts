import { z } from 'zod'

const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9-]+\.)?linkedin\.com(\/[^\s]*)?$/i

export const conditions = z.object({
  senderLinkedinUrl: z.string().regex(urlRegex, 'sender-invalid-url'),
  problemDescription: z.string().min(1).max(1500),
  solutionDescription: z.string().min(1).max(1500),
  receiverLinkedinUrl: z.string().regex(urlRegex, 'receiver-invalid-url'),
})
