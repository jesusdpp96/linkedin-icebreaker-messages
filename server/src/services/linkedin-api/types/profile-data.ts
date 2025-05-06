/**
 * TypeScript definitions for LinkedIn Profile data
 */

// Base image object for various profile images
export interface ImageObject {
  url: string
  width: number
  height: number
}

// Date structure used throughout the profile
export interface DateInfo {
  year: number
  month: number
  day: number
}

// Geographic location information
export interface GeoLocation {
  country: string
  city: string
  full: string
  countryCode: string
}

// Education entry structure
export interface Education {
  start: DateInfo
  end: DateInfo
  fieldOfStudy: string
  degree: string
  grade: string
  schoolName: string
  description: string
  activities: string
  url: string
  schoolId: string
  logo: ImageObject[]
}

// Company information within a position
export interface Company {
  companyId: number
  companyName: string
  companyUsername: string
  companyURL: string
  companyLogo: string
  companyIndustry: string
  companyStaffCountRange: string
}

// MultiLocale text fields
export interface MultiLocaleText {
  [locale: string]: string
}

// Work position/experience entry
export interface Position extends Company {
  title: string
  multiLocaleTitle: MultiLocaleText
  multiLocaleCompanyName: MultiLocaleText
  location: string
  description: string
  employmentType: string
  start: DateInfo
  end: DateInfo
}

// Skill entry
export interface Skill {
  name: string
  passedSkillAssessment: boolean
  endorsementsCount: number
}

// Supported locale
export interface SupportedLocale {
  country: string
  language: string
}

export interface PartialDate {
  year: number
  month: number
  day: number
}

// Represents a company's profile
export interface CertificationCompany {
  name: string
  universalName: string
  logo: string
  staffCountRange: Record<string, unknown>
  headquarter: Record<string, unknown>
}

// Represents a certification with relevant metadata
export interface Certification {
  name: string
  start: PartialDate
  end: PartialDate
  authority: string
  company: CertificationCompany
  timePeriod: {
    start: PartialDate
    end: PartialDate
  }
}

// Main LinkedIn Profile type
export interface ProfileData {
  id: number
  urn: string
  username: string
  firstName: string
  lastName: string
  isTopVoice: boolean
  isCreator: boolean
  isPremium: boolean
  profilePicture: string
  backgroundImage: ImageObject[]
  summary: string
  headline: string
  geo: GeoLocation
  educations: Education[]
  position: Position[]
  fullPositions: Position[]
  skills: Skill[]
  projects: Record<string, unknown>
  supportedLocales: SupportedLocale[]
  multiLocaleFirstName: MultiLocaleText
  multiLocaleLastName: MultiLocaleText
  multiLocaleHeadline: MultiLocaleText
  certifications: Certification[]
}

export type ProfileDataResponse = ProfileData | { success: false; message: string; data: null }
