import { z } from 'zod'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

export const conditions = z.object({
  id: z.number().int().min(1),
  username: z.string().min(1).max(255),
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  profilePicture: z.string().regex(urlRegex, 'profile-invalid-url'),
  headline: z.string(),
  summary: z.string(),
  certifications: z.array(
    z.object({
      year: z.number().int().min(1900).max(new Date().getFullYear()),
      name: z.string().min(1),
      institution: z.string().min(1),
    }),
  ),
  lastPosition: z
    .object({
      title: z.string(),
      companyName: z.string(),
      startYear: z.number().int().min(1900).max(new Date().getFullYear()),
      startMonth: z.number().int().min(0).max(12), // I dont sure if starts from 0 or 1
    })
    .nullable(),
})
