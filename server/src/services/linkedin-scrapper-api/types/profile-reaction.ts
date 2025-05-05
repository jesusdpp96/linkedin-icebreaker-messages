/**
 * TypeScript definitions for LinkedIn Profile Reactions data
 */

export type ProfileReaction = any;

export interface ProfileReactionsResponse {
  success: boolean;
  message: string;
  data: ProfileReaction[];
}