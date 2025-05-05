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
   * Obtiene datos del perfil de LinkedIn a través de la URL
   * @param url URL del perfil de LinkedIn (debe estar codificada)
   * @returns Datos del perfil
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
   * Obtiene las publicaciones de un perfil de LinkedIn
   * @param username Nombre de usuario del perfil
   * @param options Opciones adicionales como start, paginationToken y postedAt
   * @returns Publicaciones del perfil
   * @example
   * const posts = await linkedInService.getProfilePosts('adamselipsky');
   * // Con paginación
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
   * Obtiene las reacciones de un perfil de LinkedIn
   * @param username Nombre de usuario del perfil
   * @param options Opciones adicionales como start y paginationToken
   * @returns Reacciones del perfil
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
   * Obtiene los comentarios de un perfil de LinkedIn
   * @param username Nombre de usuario del perfil
   * @returns Comentarios del perfil
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
