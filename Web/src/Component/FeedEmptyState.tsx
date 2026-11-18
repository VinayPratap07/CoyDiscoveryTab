import { FiSliders } from "react-icons/fi";

interface FeedEmptyStateProps {
  isLoading: boolean;
  onReload: () => void;
}

function FeedEmptyState({ isLoading, onReload }: FeedEmptyStateProps) {
  if (isLoading) {
    return (
      <div className="w-full h-full rounded-[28px] bg-white border-2 border-[#141118] shadow-[6px_6px_0px_#141118] overflow-hidden flex flex-col animate-pulse">
        <div className="flex-1 bg-zinc-200" />
        <div className="hidden md:flex flex-col gap-2.5 p-6 border-t-2 border-[#141118]">
          <div className="h-6 w-40 bg-zinc-200 rounded" />
          <div className="h-3.5 w-56 bg-zinc-200 rounded" />
          <div className="h-4 w-72 bg-zinc-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-[28px] bg-[#FFFDF7] border-2 border-[#141118] shadow-[6px_6px_0px_#141118] p-6 flex flex-col items-center justify-center text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-[#FFE259] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] flex items-center justify-center text-[#141118]">
        <FiSliders className="w-6 h-6 stroke-[2.5]" />
      </div>
      <div>
        <h3 className="text-xl font-black tracking-tight text-[#141118]">
          No more profiles
        </h3>
        <p className="text-sm font-medium text-zinc-600 mt-1">
          <span className="font-bold text-[#141118]">
            No more profiles left
          </span>{" "}
        </p>
      </div>
      <button
        type="button"
        onClick={onReload}
        className="px-6 py-3 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[4px_4px_0px_#141118] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#141118] text-sm font-extrabold transition"
      >
        Reload Profiles
      </button>
    </div>
  );
}

export default FeedEmptyState;
