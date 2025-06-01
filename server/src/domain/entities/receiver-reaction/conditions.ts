import { z } from 'zod'
import { cropString } from '../../zod-utils'

/**
 * Specifies the validation rules for each property of the ReceiverReaction.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  id: z.number().int().min(1),
  reactedToContent: z.string().max(1500),
  reaction: z.string().max(255),
  reactionByUsername: z.string().min(1).max(255),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 */
export class AdjustToConditions {
  public static overReactedToContent = (value: string): string => {
    return cropString(conditions.shape.reactedToContent, value)
  }
  public static overReaction = (value: string): string => {
    return cropString(conditions.shape.reaction, value)
  }
  public static overReactionByUsername = (value: string): string => {
    return cropString(conditions.shape.reactionByUsername, value)
  }
  public static apply(payload: z.input<typeof conditions>): z.input<typeof conditions> {
    return {
      ...payload,
      reactedToContent: AdjustToConditions.overReactedToContent(payload.reactedToContent),
      reaction: AdjustToConditions.overReaction(payload.reaction),
      reactionByUsername: AdjustToConditions.overReactionByUsername(payload.reactionByUsername),
    }
  }
}
