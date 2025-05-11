export interface IcebreakerMessage {
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

export interface IcebreakerSuccessResponse {
  status: "success";
  data: IcebreakerMessage[];
}

export interface IcebreakerErrorResponse {
  status: "error";
  name: string;
  message: string;
}

export type IcebreakerResponse =
  | IcebreakerSuccessResponse
  | IcebreakerErrorResponse;
