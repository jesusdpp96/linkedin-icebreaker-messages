import axios, { AxiosInstance, AxiosError } from 'axios';
import { LinkedInApiConfig, ApiError } from './types';

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(config: LinkedInApiConfig) {
    const hostUrl = config.hostUrl || 'https://linkedin-data-api.p.rapidapi.com';

    this.axiosInstance = axios.create({
      baseURL: hostUrl,
      headers: {
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        'x-rapidapi-key': config.apiKey
      }
    });
  }

  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      const apiError: ApiError = {
        status: axiosError.response?.status || 500,
        message: axiosError.message,
        originalError: error
      };

      throw apiError;
    }
  }
}