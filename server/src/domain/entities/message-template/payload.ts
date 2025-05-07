import type { z } from 'zod'
import type { conditions } from './conditions'

export type Payload = z.input<typeof conditions>
