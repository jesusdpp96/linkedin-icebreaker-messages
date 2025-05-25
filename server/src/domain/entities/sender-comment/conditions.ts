import { z } from 'zod'
import { cropString } from '../../zod-utils'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

/**
 * Specifies the validation rules for each property of the SenderComment.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  id: z.number().int().min(1),
  commentedContent: z.string().max(1500),
  commentedInPublicationUrl: z.string().regex(urlRegex),
  commentDate: z.string(),
  authorUsername: z.string().min(1).max(255),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 */
export class AdjustToConditions {
  public static overCommentedContent = (value: string): string => {
    return cropString(conditions.shape.commentedContent, value)
  }

  public static overCommentedInPublicationUrl = (value: string): string => {
    return cropString(conditions.shape.commentedInPublicationUrl, value)
  }

  public static overAuthorUsername = (value: string): string => {
    return cropString(conditions.shape.authorUsername, value)
  }

  public static apply(payload: z.input<typeof conditions>): z.input<typeof conditions> {
    return {
      ...payload,
      commentedContent: AdjustToConditions.overCommentedContent(payload.commentedContent),
      commentedInPublicationUrl: AdjustToConditions.overCommentedInPublicationUrl(
        payload.commentedInPublicationUrl,
      ),
      authorUsername: AdjustToConditions.overAuthorUsername(payload.authorUsername),
    }
  }
}
