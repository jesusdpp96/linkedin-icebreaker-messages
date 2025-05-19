import type { AppError } from './enum'
import type { AppErrorDetails } from './map'
import { MAP } from './map'

export function errorMapper(name: AppError): AppErrorDetails {
  return (
    MAP[name] || {
      status: 500,
      name: 'unknown_error',
      message: 'An unknown error occurred',
    }
  )
}
