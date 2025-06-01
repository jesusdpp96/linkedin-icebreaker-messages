import { z } from 'zod'
import { cropString } from '../../zod-utils'

/**
 * Specifies the validation rules for each property of the message template.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  id: z.number().int().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  instruction: z.string().min(1),
  /**
   * The example must be an example of generated message by the AI.
   * It is important for person that define the message template
   * to understand that the example must be a maximum of 300 characters.
   * Therefore, the application client must ensure that the user does not write more than 300 characters.
   */
  example: z.string().min(1).max(300),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 *
 * Example: if a property is a string with a maximum of 300 characters,
 * but the message exceeds 300, it is cropped to 300 (this makes sense).
 */
export class AdjustToConditions {
  public static overExample(example: string): string {
    return cropString(conditions.shape.example, example)
  }

  /**
   * Applies the adjustments to the payload based on the defined conditions.
   *
   * Note: For this entity, no adjustments are made,
   * as the conditions are already strict and do not require cropping or modification.
   */
  public static apply(payload: z.infer<typeof conditions>): z.infer<typeof conditions> {
    return {
      ...payload,
    }
  }
}
