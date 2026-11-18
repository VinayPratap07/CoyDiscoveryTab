import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import type { MatchItem } from "../Types/MatchType";

interface MatchCardProps {
  match: MatchItem;
  onSelect?: (match: MatchItem) => void;
}

function MatchCard({ match, onSelect }: MatchCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onSelect && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onSelect(match);
    }
  };

  return (
    <div
      onClick={() => onSelect?.(match)}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={handleKeyDown}
      className={`py-4 first:pt-2 flex items-center justify-between gap-4 group ${
        onSelect ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Rounded-Square Avatar */}
        <img
          src={match.photoUrl}
          alt={match.name}
          draggable={false}
          className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl object-cover border-2 border-[#141118] shadow-[3px_3px_0px_#141118] shrink-0 group-hover:scale-[1.02] transition-transform"
        />

        {/* Name, Matched Timestamp & Pill */}
        <div className="flex flex-col items-start min-w-0">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-[#141118] truncate">
            {match.name}
          </h2>

          <span className="mt-1.5 inline-flex items-center px-3 py-0.5 rounded-full bg-[#24D16F] text-[#141118] border border-[#141118] text-[11px] font-extrabold tracking-tight">
            Matched
          </span>
        </div>
      </div>

      {/* Say Hi Action */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(match);
        }}
        aria-label={`Say hi to ${match.name}`}
        className="px-3.5 py-2 rounded-full bg-[#FFE8F0] hover:bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-xs font-extrabold flex items-center gap-1.5 shrink-0 transition"
      >
        <FiMessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
        <span className="hidden sm:inline">Say hi</span>
      </button>
    </div>
  );
}

export default MatchCard;
