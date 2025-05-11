export interface FormData {
  senderUrl: string
  problemDescription: string
  solutionDescription: string
  receiverUrl: string
}

export interface Message {
  message: string
  templateTitle: string
  templateCategory: string
  instruction: string
  sourcePosts: string[]
  receiverName: string
  receiverProfilePicture: string
  receiverHeadline: string
  senderName: string
  senderProfilePicture: string
  senderHeadline: string
}

export interface MessageResponse {
  status: string
  data: Message[]
}
