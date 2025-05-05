/**
 * TypeScript definitions for LinkedIn Profile Comments data
 */

// Reaction counts for comments
export interface ReactionCount {
  text: string
  totalReactionCount: number
  likeCount: number
  empathyCount: number
  praiseCount?: number
}

// Company information within a post
export interface Company {
  name: string
  url: string
  urn: string
}

// Mentioned users in the post
export interface Author {
  firstName?: string
  lastName?: string
  username?: string
  url?: string
}

// Image object within a post
export interface Image {
  url: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Article {
  // Properties for article data if needed
}

// LinkedIn Post
export interface ProfileComment {
  highlightedComments: string[]
  highlightedCommentsActivityCounts: ReactionCount[]
  text: string
  commentUrl: string
  totalReactionCount: number
  likeCount: number
  appreciationCount: number
  empathyCount: number
  InterestCount: number
  praiseCount: number
  funnyCount: number
  commentsCount: number
  repostsCount: number
  postUrl: string
  postedAt: string
  postedDate: string
  commentedDate: string
  urn: string
  author: Author
  image: Image[]
  company: Company
  article: Article
}

export interface ProfileCommentsResponse {
  success: boolean
  message: string
  data: ProfileComment[]
}
