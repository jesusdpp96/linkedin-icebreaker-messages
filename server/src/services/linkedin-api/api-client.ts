import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { LinkedInApiConfig } from './types'

export class ApiClient {
  private axiosInstance: AxiosInstance

  constructor(config: LinkedInApiConfig) {
    const hostUrl = config.hostUrl || 'https://linkedin-data-api.p.rapidapi.com'

    this.axiosInstance = axios.create({
      baseURL: hostUrl,
      headers: {
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        'x-rapidapi-key': config.apiKey,
      },
    })
  }

  /**
   * Makes a GET request to the LinkedIn API.
   * @param endpoint The API endpoint to call.
   * @param params Query parameters to include in the request.
   * @returns The response data from the API.
   * @throws AxiosError if the request fails.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const response = await this.axiosInstance.get<T>(endpoint, { params })
    return response.data
  }
}
