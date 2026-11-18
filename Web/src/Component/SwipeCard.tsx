import React from "react";
import { FiMapPin, FiBookOpen } from "react-icons/fi";
import type { Profile } from "../Types/FeedType";

interface SwipeCardProps {
  profile: Profile;
  dragOffset: { x: number; y: number };
  isDragging: boolean;
  rotation: number;
  acceptProgress: number;
  rejectProgress: number;
  pointerHandlers: {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
    onPointerUp: () => void;
    onPointerCancel: () => void;
  };
}

function SwipeCard({
  profile,
  dragOffset,
  isDragging,
  rotation,
  acceptProgress,
  rejectProgress,
  pointerHandlers,
}: SwipeCardProps) {
  return (
    <div
      {...pointerHandlers}
      style={{
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotation}deg)`,
        transition: isDragging
          ? "none"
          : "transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)",
        touchAction: "none",
      }}
      className="relative w-full h-full rounded-[24px] md:rounded-[28px] overflow-hidden bg-white border-2 border-[#141118] shadow-[6px_6px_0px_#141118] flex flex-col cursor-grab active:cursor-grabbing"
    >
      {/* Photo Area */}
      <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-zinc-100">
        <img
          src={profile.photoUrl}
          alt={profile.name}
          draggable={false}
          className="w-full h-full object-cover object-center pointer-events-none"
        />
        <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#141118]/95 via-[#141118]/35 to-transparent pointer-events-none" />
      </div>

      {/* PC Bottom Details Section */}
      <div className="hidden md:flex flex-col gap-2 px-6 py-4 bg-white border-t-2 border-[#141118] pointer-events-none shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#141118] leading-tight">
              {profile.name}
            </h2>
            <p className="text-xs font-semibold text-zinc-500 mt-0.5">
              {profile.college} · {profile.city}
            </p>
          </div>
        </div>

        <p className="text-sm font-medium text-[#141118]/85 leading-snug">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-3 py-1 text-xs font-bold rounded-full bg-[#FFE8F0] text-[#141118] border border-[#141118]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile Overlaid Details Section */}
      <div className="md:hidden absolute bottom-0 inset-x-0 p-5 flex flex-col gap-2 text-white pointer-events-none">
        <div>
          <h2 className="text-2xl font-black tracking-tight leading-tight">
            {profile.name}
          </h2>
          <div className="mt-1 flex flex-col gap-1 text-xs font-medium text-zinc-200">
            <span className="flex items-center gap-1.5">
              <FiBookOpen className="w-3.5 h-3.5 text-[#FFE259] shrink-0" />
              {profile.college}
            </span>
            <span className="flex items-center gap-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-[#FF3B7F] shrink-0" />
              {profile.city}
            </span>
          </div>
        </div>

        <p className="text-sm text-zinc-100 leading-snug">{profile.bio}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-white text-[#141118] border-2 border-[#141118] shadow-[2px_2px_0px_#141118]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT SWIPE GREEN GRADIENT OVERLAY */}
      <div
        style={{ opacity: acceptProgress * 0.85 }}
        className="absolute inset-0 bg-gradient-to-tr from-[#0a3d20]/90 via-[#24D16F]/55 to-[#7ef5b0]/35 pointer-events-none transition-opacity duration-75"
      />

      {/* LEFT SWIPE RED / HOT PINK GRADIENT OVERLAY */}
      <div
        style={{ opacity: rejectProgress * 0.85 }}
        className="absolute inset-0 bg-gradient-to-tl from-[#4a081e]/90 via-[#FF3B7F]/55 to-[#ff85af]/35 pointer-events-none transition-opacity duration-75"
      />
    </div>
  );
}

export default SwipeCard;
