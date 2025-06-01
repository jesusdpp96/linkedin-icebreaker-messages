import type { LinkedInService, OpenAIResponsesService } from '@services'

export interface ServicePort {
  linkedinService: LinkedInService
  openaiService: OpenAIResponsesService
}
