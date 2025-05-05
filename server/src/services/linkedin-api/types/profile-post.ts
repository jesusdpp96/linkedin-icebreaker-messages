/**
 * TypeScript definitions for LinkedIn Posts data
 */

// LinkedIn API Response Type
export interface ProfilePostsResponse {
  success: boolean
  message: string
  data: ProfilePost[]
  paginationToken: string
}

// LinkedIn Post Type
export interface ProfilePost {
  isBrandPartnership: boolean
  text: string
  totalReactionCount: number
  likeCount: number
  appreciationCount: number
  empathyCount: number
  InterestCount: number
  praiseCount: number
  funnyCount?: number
  commentsCount: number
  repostsCount: number
  postUrl: string
  shareUrl: string
  postedAt: string
  postedDate: string
  postedDateTimestamp: number
  urn: string
  author: Author
  company: Record<string, unknown>
  document: Record<string, unknown>
  celebration: Record<string, unknown>
  poll: Record<string, unknown>
  article: Article
  entity: Record<string, unknown>
  mentions?: Mention[]
  companyMentions?: CompanyMention[]
}

// LinkedIn Author Type
export interface Author {
  id: number
  firstName: string
  lastName: string
  headline: string
  username: string
  url: string
  profilePictures: ProfilePicture[]
  urn: string
}

// LinkedIn Profile Picture Type
export interface ProfilePicture {
  width: number
  height: number
  url: string
}

// LinkedIn Article Type
export interface Article {
  title?: string
  subtitle?: string
  link?: string
  newsletter: Record<string, unknown>
}

// LinkedIn Mention Type
export interface Mention {
  firstName: string
  lastName: string
  urn: string
  publicIdentifier: string
}

// LinkedIn Company Mention Type
export interface CompanyMention {
  id: number
  name: string
  publicIdentifier: string
  url: string
}
