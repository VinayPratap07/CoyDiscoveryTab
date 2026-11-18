import { FiHeart, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

function NoMatchesState({ discoverPath = "/discover" }) {
  return (
    <div className="my-8 py-8 px-4 rounded-2xl bg-[#FFFDF7] border-2 border-dashed border-[#141118] flex flex-col items-center justify-center text-center gap-3">
      <div className="w-12 h-12 rounded-full bg-[#FFE8F0] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] flex items-center justify-center text-[#FF3B7F]">
        <FiHeart className="w-5 h-5 stroke-[2.5]" />
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-black text-[#141118]">
          No mutual matches yet
        </h3>
        <p className="text-xs sm:text-sm font-medium text-zinc-500 mt-1 max-w-xs mx-auto">
          Keep swiping on Discover—when someone likes you back, they’ll show up
          right here.
        </p>
      </div>

      <Link
        to={discoverPath}
        className="mt-1 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] hover:brightness-105 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-xs sm:text-sm font-extrabold transition"
      >
        <span>Go to Discover</span>
        <FiArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </Link>
    </div>
  );
}

export default NoMatchesState;
