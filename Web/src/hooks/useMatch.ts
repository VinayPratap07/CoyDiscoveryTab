import { useQuery } from "@tanstack/react-query";
import { getMatches } from "../Service/api";
import type { MatchesApiResponse } from "../Types/MatchType";

export function useGetMatches() {
  const { isLoading, error, data, refetch } = useQuery<MatchesApiResponse>({
    queryKey: ["CurrMatches"],
    queryFn: getMatches,
    refetchOnWindowFocus: false,
  });

  const matches = data?.matches ?? [];

  return { isLoading, error, matches, refetch };
}
