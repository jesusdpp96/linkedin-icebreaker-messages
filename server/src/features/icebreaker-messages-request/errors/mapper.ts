import type { FeatureError } from './enum'
import type { FeatureErrorDetails } from './map'
import { MAP } from './map'

export function errorMapper(name: FeatureError): FeatureErrorDetails {
  return (
    MAP[name] || {
      status: 500,
      name: 'unknown_error',
      message: 'An unknown error occurred',
    }
  )
}
