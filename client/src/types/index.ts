// Common types used across the application

export interface LinkedinMessage {
  receiverName: string;
  receiverProfilePicture: string;
  receiverHeadline: string;
  senderName: string;
  senderProfilePicture: string;
  senderHeadline: string;
  message: string;
}

export interface CardData {
  cardColor: string;
  messageCategory: string;
  titleCategory: string;
  linkedinSimulationMessage: LinkedinMessage;
}

export interface FormData {
  senderProfileUrl: string;
  problemDescription: string;
  solutionDescription: string;
  receiverProfileUrl: string;
}

export interface GeneratedMessage {
  message: string;
  templateTitle: string;
  templateCategory: string;
  instruction: string;
  sourcePosts: string[];
  receiverName: string;
  receiverProfilePicture: string;
  receiverHeadline: string;
  senderName: string;
  senderProfilePicture: string;
  senderHeadline: string;
}

export interface ApiResponse {
  messages: GeneratedMessage[];
}

export enum AppState {
  INITIAL = "initial",
  LOADING = "loading",
  RESPONSE = "response",
}
