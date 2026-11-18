import { FiX, FiHeart } from "react-icons/fi";
import type { SwipeAction } from "../Types/FeedType";

interface FeedControlsProps {
  disabled: boolean;
  onSwipe: (action: SwipeAction) => void;
}

function FeedControls({ disabled, onSwipe }: FeedControlsProps) {
  return (
    <footer className="py-1.5 md:py-2 flex flex-col items-center justify-center gap-2 z-20 shrink-0">
      <div className="flex items-center justify-center gap-6 md:gap-5">
        <button
          type="button"
          onClick={() => onSwipe("PASS")}
          disabled={disabled}
          aria-label="Pass profile"
          className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-[#141118] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] hover:bg-[#FF3B7F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141118] disabled:opacity-35 disabled:pointer-events-none transition"
        >
          <FiX className="w-6 h-6 md:w-5 md:h-5 stroke-[2.75]" />
        </button>

        <button
          type="button"
          onClick={() => onSwipe("LIKE")}
          disabled={disabled}
          aria-label="Like profile"
          className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] hover:bg-[#24D16F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141118] disabled:opacity-35 disabled:pointer-events-none transition"
        >
          <FiHeart className="w-6 h-6 md:w-5 md:h-5 stroke-[2.5] fill-[#141118]" />
        </button>
      </div>

      <span className="hidden md:block text-[11px] font-semibold text-zinc-500">
        Pass · Like
      </span>
    </footer>
  );
}

export default FeedControls;
