export interface Profile {
  user_id: string;
  name: string;
  photoUrl: string;
  bio: string;
  city: string;
  college: string;
  interests: string[];
}

export interface FeedApiResponse {
  success: boolean;
  profiles: Profile[];
  hasMore: boolean;
}

export type SwipeAction = "LIKE" | "PASS";

export interface SwipePayload {
  swipedId: string;
  action: SwipeAction;
}

export interface SwipeApiResponse {
  success: boolean;
  isMatch?: boolean;
}

export interface SwipeRecord {
  userId: string;
  action: SwipeAction;
}
