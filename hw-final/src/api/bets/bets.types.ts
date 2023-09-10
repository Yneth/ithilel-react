export interface BetResponse {
  id: string;
  userId: string;
  userName: string;
  betAmount: number;
  eventId: string;
  eventName: string;
  eventBackgroundUrl?: string;
  createdAt: number;
  isCompleted?: boolean;
  betResult?: string;
}

export type CreateBetRequest = BetResponse;

export type BetListResponse = BetResponse[];

export type CanMakeBetResponse = {
  valid: boolean;
};
