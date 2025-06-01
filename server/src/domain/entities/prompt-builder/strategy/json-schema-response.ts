import { zodToJsonSchema } from 'zod-to-json-schema'
import { conditions as IMARConditions } from '../../icebreaker-message-ai-response/conditions'

export function getJsonSchemaResponse() {
  const schema = IMARConditions
  const jsonSchema = zodToJsonSchema(schema, `responseSchema`)
  const responseSchema = jsonSchema?.definitions?.responseSchema || {}
  return responseSchema
}
