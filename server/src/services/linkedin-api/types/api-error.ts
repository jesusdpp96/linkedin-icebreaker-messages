export interface ApiError {
  status: number
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalError?: any
}
