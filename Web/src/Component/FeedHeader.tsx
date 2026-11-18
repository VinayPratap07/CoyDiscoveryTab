function FeedHeader() {
  return (
    <header className="flex items-center justify-between md:justify-center py-1 z-20">
      <div className="flex items-center gap-2.5 md:hidden">
        <span className="text-2xl font-black tracking-tight text-[#141118]">
          coy<span className="text-[#FF3B7F]">.</span>
        </span>
      </div>

      <div className="hidden md:flex flex-col items-center text-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight text-[#141118]">
            Discover
          </h1>
        </div>

        <p className="text-xs font-medium text-zinc-500 mt-0.5">
          Find someone interesting.
        </p>
      </div>
    </header>
  );
}

export default FeedHeader;
