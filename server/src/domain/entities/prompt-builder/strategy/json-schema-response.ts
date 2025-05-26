import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { conditions as IMARConditions } from '../../icebreaker-message-ai-response/conditions'

export function getJsonSchemaResponse() {
  const schema = z.array(IMARConditions)

  const jsonSchema = zodToJsonSchema(schema, `responseSchema`)

  return jsonSchema
}
