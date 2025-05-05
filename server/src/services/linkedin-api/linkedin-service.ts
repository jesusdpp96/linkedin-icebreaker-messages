import { ApiClient } from './api-client'
import type {
  LinkedInApiConfig,
  ProfileData,
  ProfilePostsResponse,
  ProfileReactionsResponse,
  ProfileCommentsResponse,
} from './types'

export class LinkedInService {
  private client: ApiClient

  constructor(config: LinkedInApiConfig) {
    this.client = new ApiClient(config)
  }

  /**
   * Retrieves LinkedIn profile data through the URL
   * @param url LinkedIn profile URL (must be encoded)
   * @returns Profile data
   * @example
   * const profileData = await linkedInService.getProfileDataByUrl('https%3A%2F%2Fwww.linkedin.com%2Fin%2Fadamselipsky%2F');
   */
  async getProfileDataByUrl(url: string): Promise<ProfileData> {
    if (!url) {
      throw new Error('URL is required')
    }

    return this.client.get<ProfileData>('/get-profile-data-by-url', { url })
  }

  /**
   * Retrieves posts from a LinkedIn profile
   * @param username Profile username
   * @param options Additional options such as start, paginationToken, and postedAt
   * @returns Profile posts
   * @example
   * const posts = await linkedInService.getProfilePosts('adamselipsky');
   * // With pagination
   * const morePosts = await linkedInService.getProfilePosts('adamselipsky', {
   *   start: '50',
   *   paginationToken: 'token-from-previous-call'
   * });
   */
  async getProfilePosts(
    username: string,
    options?: {
      start?: string
      paginationToken?: string
      postedAt?: string
    },
  ): Promise<ProfilePostsResponse> {
    if (!username) {
      throw new Error('Username is required')
    }

    const params = { username, ...options }
    return this.client.get<ProfilePostsResponse>('/get-profile-posts', params)
  }

  /**
   * Retrieves reactions from a LinkedIn profile
   * @param username Profile username
   * @param options Additional options such as start and paginationToken
   * @returns Profile reactions
   * @example
   * const reactions = await linkedInService.getProfileReactions('adamselipsky');
   */
  async getProfileReactions(
    username: string,
    options?: {
      start?: string
      paginationToken?: string
    },
  ): Promise<ProfileReactionsResponse> {
    if (!username) {
      throw new Error('Username is required')
    }

    const params = { username, ...options }
    return this.client.get<ProfileReactionsResponse>('/get-profile-likes', params)
  }

  /**
   * Retrieves comments from a LinkedIn profile
   * @param username Profile username
   * @returns Profile comments
   * @example
   * const comments = await linkedInService.getProfileComments('williamhgates');
   */
  async getProfileComments(username: string): Promise<ProfileCommentsResponse> {
    if (!username) {
      throw new Error('Username is required')
    }

    return this.client.get<ProfileCommentsResponse>('/get-profile-comments', { username })
  }
}
