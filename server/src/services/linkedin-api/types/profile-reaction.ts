/**
 * TypeScript definitions for LinkedIn Profile Reactions data
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ProfileReactionsResponse {
  success: boolean
  message: string
  data: {
    items: ProfileReaction[]
  }
}

export interface ProfileReaction {
  action: string
  entityType: 'post' | 'comment' // add other types if needed
  text: string
  totalReactionCount: number
  likeCount: number
  appreciationCount?: number
  empathyCount?: number
  InterestCount?: number
  praiseCount?: number
  commentsCount: number
  repostsCount?: number
  postUrl: string
  postedAt: string
  postedDate: string
  shareUrn: string
  urn: string
  author: LinkedInAuthor
  image: LinkedInImage[]
  company: Record<string, unknown>
  comment: LinkedInComment
  article: Record<string, unknown>
}

export interface LinkedInAuthor {
  firstName: string
  lastName: string
  headline: string
  username: string
  url: string
}

export interface LinkedInImage {
  url: string
  width: number
  height: number
}

export interface LinkedInComment {
  text: string
  author: Partial<LinkedInAuthor>
  company: Record<string, unknown>
}
