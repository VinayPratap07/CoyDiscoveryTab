export interface MatchItem {
  match_id: string;
  matchedAt: string;
  user_id: string;
  name: string;
  photoUrl: string;
}

export interface MatchesApiResponse {
  success?: boolean;
  matches: MatchItem[];
}
