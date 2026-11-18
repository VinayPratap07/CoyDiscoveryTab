import { FiCompass, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router";

function HomePage({}) {
  const discoveryPath = "/discover";
  return (
    <div className="h-full w-full bg-white text-[#141118] flex items-center justify-center overflow-y-auto select-none">
      <div className="w-full max-w-md md:max-w-[780px] mx-auto px-4 sm:px-6 py-6">
        <section className="rounded-[24px] md:rounded-[28px] bg-[#FFFDF7] border-2 border-[#141118] shadow-[6px_6px_0px_#141118] px-6 py-12 sm:px-10 sm:py-16 flex flex-col items-center text-center">
          {/* Status Pill */}
          <span className="px-3.5 py-1 rounded-full bg-[#FFE259] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] text-xs font-extrabold tracking-tight">
            coy<span className="text-[#FF3B7F]">.</span> home
          </span>

          {/* Icon */}
          <div className="mt-6 w-16 h-16 rounded-full bg-[#FFE8F0] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] flex items-center justify-center text-[#FF3B7F]">
            <FiCompass className="w-7 h-7 stroke-[2.5]" />
          </div>

          {/* Heading & Subtitle */}
          <h1 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-[#141118]">
            Nothing new here yet.
          </h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-zinc-600 max-w-sm">
            You&apos;re all caught up on your home feed. Jump into Discovery to
            check out new profiles.
          </p>

          {/* CTA Link to /discovery */}
          <Link
            to={discoveryPath}
            className="mt-7 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[4px_4px_0px_#141118] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#141118] text-sm sm:text-base font-extrabold tracking-tight transition"
          >
            <span>Go to Discovery</span>
            <FiArrowRight className="w-4 h-4 stroke-[2.75]" />
          </Link>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
