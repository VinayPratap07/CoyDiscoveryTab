import React from "react";
import MatchCard from "../Component/MatchCard";
import NoMatchesState from "../Component/NoMatchModal";
import { useGetMatches } from "../hooks/useMatch";
import type { MatchItem } from "../Types/MatchType";

interface MatchesPageProps {
  onSelectMatch?: (match: MatchItem) => void;
}

export const MatchesPage: React.FC<MatchesPageProps> = ({ onSelectMatch }) => {
  const { isLoading, error, matches, refetch } = useGetMatches();

  return (
    <div className="h-full w-full bg-white text-[#141118] overflow-y-auto select-none">
      <div className="w-full max-w-md md:max-w-[780px] mx-auto px-4 sm:px-6 py-4 md:py-8">
        <section className="rounded-[24px] md:rounded-[28px] bg-white border-2 border-[#141118] shadow-[6px_6px_0px_#141118] p-5 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#141118]">
                Your Matches
              </h1>
              <p className="text-xs sm:text-sm font-medium text-zinc-600 mt-1">
                People who liked you back.
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#FFE259] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] text-xs font-extrabold shrink-0">
              {matches.length} {matches.length === 1 ? "Match" : "Matches"}
            </span>
          </div>

          {/* Body: Loading / Error / Match List / Empty State */}
          {isLoading ? (
            <div className="mt-5 divide-y-2 divide-zinc-200">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="py-4 flex items-center gap-4 animate-pulse"
                >
                  <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-zinc-200 border-2 border-[#141118]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-zinc-200 rounded" />
                    <div className="h-3 w-20 bg-zinc-200 rounded" />
                    <div className="h-5 w-16 bg-zinc-200 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="my-8 py-6 px-4 rounded-2xl bg-[#FFE8F0] border-2 border-[#141118] shadow-[4px_4px_0px_#141118] flex flex-col items-center text-center gap-3">
              <p className="text-sm font-extrabold text-[#141118]">
                Failed to load your matches.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-4 py-2 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] text-xs font-extrabold"
              >
                Try Again
              </button>
            </div>
          ) : matches.length > 0 ? (
            <div className="mt-5 divide-y-2 divide-zinc-200">
              {matches.map((match) => (
                <MatchCard
                  key={match.match_id}
                  match={match}
                  onSelect={onSelectMatch}
                />
              ))}
            </div>
          ) : (
            <NoMatchesState />
          )}

          {/* Footer Note */}
          <p className="mt-4 pt-3 border-t border-zinc-200 text-xs font-medium text-zinc-500">
            Only mutual matches appear here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MatchesPage;
