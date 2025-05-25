import { z } from 'zod'
import { cropString } from '../../zod-utils'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

/**
 * Specifies the validation rules for each property of the post.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  id: z.number().int().min(1),
  postedContent: z.string().max(1500),
  publicationUrl: z.string().regex(urlRegex),
  postedDate: z.string(),
  authorUsername: z.string().min(1).max(255),
  hasMediaContent: z.boolean(),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 */
export class AdjustToConditions {
  public static overPostedContent = (value: string): string => {
    return cropString(conditions.shape.postedContent, value)
  }
  public static overAuthorUsername = (value: string): string => {
    return cropString(conditions.shape.authorUsername, value)
  }
  /**
   * Applies the adjustments to the payload based on the defined conditions.
   *
   */
  public static apply(payload: z.infer<typeof conditions>): z.infer<typeof conditions> {
    return {
      ...payload,
      postedContent: AdjustToConditions.overPostedContent(payload.postedContent),
      authorUsername: AdjustToConditions.overAuthorUsername(payload.authorUsername),
    }
  }
}
