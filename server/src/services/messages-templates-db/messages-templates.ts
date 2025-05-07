import { TEMPLATES } from './data/templates'

export class MessagesTemplatesDbService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getMessagesTemplates = async (): Promise<any[]> => {
    return TEMPLATES.slice(0)
  }
}
