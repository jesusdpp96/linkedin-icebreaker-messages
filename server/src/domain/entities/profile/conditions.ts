import { z } from 'zod'
import { cropString } from '../../zod-utils'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

/**
 * Specifies the validation rules for each property of the Profile.
 * These rules define the expected structure, constraints, and data types
 * for the properties to ensure they meet the required conditions.
 */
export const conditions = z.object({
  id: z.number().int().min(1),
  username: z.string().min(1),
  firstName: z.string().max(255),
  lastName: z.string().max(255),
  profilePicture: z.string().regex(urlRegex),
  headline: z.string().max(255),
  summary: z.string().max(1500),
  certifications: z.array(
    z.object({
      year: z.number().int().min(1900).max(new Date().getFullYear()),
      name: z.string().min(1).max(100),
      institution: z.string().min(1).max(100),
    }),
  ),
  lastPosition: z
    .object({
      title: z.string().max(100),
      companyName: z.string().max(100),
      startYear: z.number().int().min(1900).max(new Date().getFullYear()),
      startMonth: z.number().int().min(0).max(12), // I dont sure if starts from 0 or 1
    })
    .nullable(),
})

/**
 * Defines how values are adjusted to the conditions
 * when parsing an object. Only for properties where
 * it makes sense to adjust.
 */
export class AdjustToConditions {
  public static overFirstName = (value: string): string => {
    return cropString(conditions.shape.firstName, value)
  }
  public static overLastName = (value: string): string => {
    return cropString(conditions.shape.lastName, value)
  }
  public static overProfilePicture = (value: string): string => {
    return value.trim().slice(0, 255)
  }
  public static overHeadline = (value: string): string => {
    return cropString(conditions.shape.headline, value)
  }
  public static overSummary = (value: string): string => {
    return cropString(conditions.shape.summary, value)
  }
  public static overCertifications = (
    value: z.input<typeof conditions.shape.certifications>,
  ): z.input<typeof conditions.shape.certifications> => {
    return value.map(certification => ({
      year: certification.year,
      name: cropString(conditions.shape.certifications.element.shape.name, certification.name),
      institution: cropString(
        conditions.shape.certifications.element.shape.institution,
        certification.institution,
      ),
    }))
  }
  public static overLastPosition = (
    value: z.input<typeof conditions.shape.lastPosition>,
  ): z.input<typeof conditions.shape.lastPosition> => {
    if (!value) {
      return null
    }
    const lastPosition = conditions.shape.lastPosition.unwrap()
    return {
      title: cropString(lastPosition.shape.title, value.title),
      companyName: cropString(lastPosition.shape.companyName, value.companyName),
      startYear: value.startYear,
      startMonth: value.startMonth,
    }
  }
  public static apply(value: z.input<typeof conditions>): z.input<typeof conditions> {
    return {
      ...value,
      firstName: AdjustToConditions.overFirstName(value.firstName),
      lastName: AdjustToConditions.overLastName(value.lastName),
      profilePicture: AdjustToConditions.overProfilePicture(value.profilePicture),
      headline: AdjustToConditions.overHeadline(value.headline),
      summary: AdjustToConditions.overSummary(value.summary),
      certifications: AdjustToConditions.overCertifications(value.certifications),
      lastPosition: AdjustToConditions.overLastPosition(value.lastPosition),
    }
  }
}
