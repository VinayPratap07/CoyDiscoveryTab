import React from "react";
import { FiHeart, FiMessageCircle, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

export interface MatchProfile {
  user_id: string;
  name: string;
  age: number;
  city: string;
  photoUrl: string;
  matchedAt?: string;
}

interface MatchesPageProps {
  matches?: MatchProfile[];
  onSelectMatch?: (match: MatchProfile) => void;
}

const MOCK_MATCHES: MatchProfile[] = [
  {
    user_id: "m-101",
    name: "Rahul",
    age: 23,
    city: "New Delhi",
    photoUrl: "https://i.pravatar.cc/300?img=11",
    matchedAt: "2h ago",
  },
  {
    user_id: "m-102",
    name: "Priya",
    age: 22,
    city: "Gurugram",
    photoUrl: "https://i.pravatar.cc/300?img=47",
    matchedAt: "1d ago",
  },
];

export const MatchesPage: React.FC<MatchesPageProps> = ({
  matches = MOCK_MATCHES,
  onSelectMatch,
}) => {
  return (
    <div className="h-full w-full bg-white text-[#141118] overflow-y-auto select-none">
      <div className="w-full max-w-md md:max-w-[780px] mx-auto px-4 sm:px-6 py-4 md:py-8">
        {/* Main Neo-Brutalist Container */}
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

          {/* Matches List */}
          {matches.length > 0 ? (
            <div className="mt-5 divide-y-2 divide-zinc-200">
              {matches.map((match) => (
                <div
                  key={match.user_id}
                  onClick={() => onSelectMatch?.(match)}
                  role={onSelectMatch ? "button" : undefined}
                  tabIndex={onSelectMatch ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSelectMatch?.(match);
                    }
                  }}
                  className={`py-4 first:pt-2 flex items-center justify-between gap-4 group ${
                    onSelectMatch ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Rounded-Square Avatar */}
                    <img
                      src={match.photoUrl}
                      alt={`${match.name}, ${match.age}`}
                      draggable={false}
                      className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover border-2 border-[#141118] shadow-[3px_3px_0px_#141118] shrink-0 group-hover:scale-[1.02] transition-transform"
                    />

                    {/* Name, Age, City & Matched Pill */}
                    <div className="flex flex-col items-start min-w-0">
                      <h2 className="text-base sm:text-lg font-black tracking-tight text-[#141118] truncate">
                        {match.name}, {match.age}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-zinc-500 mt-0.5 truncate">
                        {match.city}
                      </p>
                      <span className="mt-1.5 inline-flex items-center px-3 py-0.5 rounded-full bg-[#24D16F] text-[#141118] border border-[#141118] text-[11px] font-extrabold tracking-tight">
                        Matched
                      </span>
                    </div>
                  </div>

                  {/* Subtle Say Hi Action */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMatch?.(match);
                    }}
                    aria-label={`Say hi to ${match.name}`}
                    className="px-3.5 py-2 rounded-full bg-[#FFE8F0] hover:bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition"
                  >
                    <FiMessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span className="hidden sm:inline">Say hi</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="my-8 py-8 px-4 rounded-2xl bg-[#FFFDF7] border-2 border-dashed border-[#141118] flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FFE8F0] border-2 border-[#141118] flex items-center justify-center text-[#FF3B7F]">
                <FiHeart className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#141118]">
                  No mutual matches yet
                </h3>
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Keep swiping on Discover—when someone likes you back, they’ll
                  show up right here.
                </p>
              </div>
              <Link
                to="/discover"
                className="mt-1 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] hover:brightness-105 text-xs font-extrabold transition"
              >
                <span>Go to Discover</span>
                <FiArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </Link>
            </div>
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
