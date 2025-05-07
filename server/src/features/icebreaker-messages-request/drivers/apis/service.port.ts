import type { LinkedInService, OpenAIChatService } from '@services'

export interface ServicePort {
  linkedinService: LinkedInService
  openaiService: OpenAIChatService
}
