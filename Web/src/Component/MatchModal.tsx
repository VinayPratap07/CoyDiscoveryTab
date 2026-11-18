import React, { useEffect } from "react";
import { FiHeart, FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

export interface MatchedUser {
  user_id: string;
  name: string;
  photoUrl: string;
}

interface MatchModalProps {
  isOpen: boolean;
  matchedUser: MatchedUser | null;
  currentUserPhotoUrl?: string;
  onClose: () => void;
  onViewMatches?: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  matchedUser,
  currentUserPhotoUrl = "https://i.pravatar.cc/400?img=12",
  onClose,
  onViewMatches,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !matchedUser) return null;

  const handleViewMatches = () => {
    onClose();
    if (onViewMatches) {
      onViewMatches();
    } else {
      navigate("/matches");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#141118]/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 select-none"
    >
      {/* Neo-Brutalist Match Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md md:max-w-[680px] rounded-[28px] bg-white text-[#141118] border-2 border-[#141118] shadow-[8px_8px_0px_#141118] px-6 py-9 sm:px-10 sm:py-12 flex flex-col items-center text-center"
      >
        {/* Top-Right Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close match popup"
          className="absolute top-4 right-4 p-2 rounded-full bg-white border-2 border-[#141118] shadow-[2px_2px_0px_#141118] text-[#141118] hover:bg-[#FFE259] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition"
        >
          <FiX className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Heart Icon */}
        <div className="w-12 h-12 rounded-full bg-[#FFE8F0] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] flex items-center justify-center text-[#FF3B7F]">
          <FiHeart className="w-6 h-6 stroke-[2.5] fill-[#FF3B7F]" />
        </div>

        {/* Title & Subtitle */}
        <h2
          id="match-modal-title"
          className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-[#FF3B7F]"
        >
          It&apos;s a Match!
        </h2>
        <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#141118]">
          You and <span className="font-black">{matchedUser.name}</span> liked
          each other.
        </p>

        {/* Side-by-Side Rounded-Square Photos */}
        <div className="my-7 flex items-center justify-center gap-4 sm:gap-5">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#141118] shadow-[4px_4px_0px_#141118] bg-zinc-100 -rotate-2">
            <img
              src={currentUserPhotoUrl}
              alt="You"
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#141118] shadow-[4px_4px_0px_#141118] bg-zinc-100 rotate-2">
            <img
              src={matchedUser.photoUrl}
              alt={matchedUser.name}
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Primary CTA: View Matches */}
        <button
          type="button"
          onClick={handleViewMatches}
          className="w-full max-w-[240px] py-3.5 px-6 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[4px_4px_0px_#141118] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#141118] text-sm sm:text-base font-extrabold tracking-tight transition"
        >
          View Matches
        </button>

        {/* Secondary Action: Keep Discovering */}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-xs sm:text-sm font-bold text-zinc-600 hover:text-[#141118] underline-offset-4 hover:underline transition"
        >
          Keep Discovering
        </button>
      </div>
    </div>
  );
};

export default MatchModal;
