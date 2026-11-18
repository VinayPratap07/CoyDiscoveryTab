import React, { useState, useRef } from "react";
import {
  FiX,
  FiHeart,
  FiMapPin,
  FiBookOpen,
  FiRotateCcw,
  FiSliders,
} from "react-icons/fi";

interface Profile {
  user_id: string;
  name: string;
  photoUrl: string;
  bio: string;
  city: string;
  college: string;
  interests: string[];
}

interface ApiResponse {
  success: boolean;
  profiles: Profile[];
  hasMore: boolean;
}

const MOCK_API_RESPONSE: ApiResponse = {
  success: true,
  profiles: [
    {
      user_id: "3a5e09fb-e344-11f1-a957-4a7be110ae05",
      name: "Tanya Bansal",
      photoUrl: "https://i.pravatar.cc/800?img=51",
      bio: "Fashion enthusiast and coffee addict.",
      city: "Delhi",
      college: "Lady Shri Ram College",
      interests: ["Fashion", "Photography", "Shopping", "Travel"],
    },
    {
      user_id: "3a5e0e98-e344-11f1-a957-4a7be110ae05",
      name: "Sara Thomas",
      photoUrl: "https://i.pravatar.cc/800?img=58",
      bio: "Yoga, books and discovering hidden cafes.",
      city: "Bangalore",
      college: "Mount Carmel College",
      interests: ["Yoga", "Reading", "Food", "Travel"],
    },
    {
      user_id: "3a5e0e75-e344-11f1-a957-4a7be110ae05",
      name: "Ayaan Khan",
      photoUrl: "https://i.pravatar.cc/800?img=25",
      bio: "Anime, gaming and late-night conversations.",
      city: "Noida",
      college: "JIIT Noida",
      interests: ["Anime", "Gaming", "Technology", "Movies"],
    },
    {
      user_id: "3a5e0e4e-e344-11f1-a957-4a7be110ae05",
      name: "Myra Fernandes",
      photoUrl: "https://i.pravatar.cc/800?img=57",
      bio: "Beach person who loves everything creative.",
      city: "Goa",
      college: "Goa University",
      interests: ["Travel", "Swimming", "Art", "Music"],
    },
    {
      user_id: "3a5e0e28-e344-11f1-a957-4a7be110ae05",
      name: "Siddharth Bose",
      photoUrl: "https://i.pravatar.cc/800?img=24",
      bio: "History nerd and aspiring filmmaker.",
      city: "Kolkata",
      college: "St. Xavier University",
      interests: ["Movies", "History", "Photography", "Reading"],
    },
  ],
  hasMore: true,
};

type SwipeDirection = "left" | "right";

interface SwipeRecord {
  userId: string;
  direction: SwipeDirection;
}

const SWIPE_THRESHOLD = 100;

export const ProfileSwiper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [history, setHistory] = useState<SwipeRecord[]>([]);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [exitDirection, setExitDirection] = useState<SwipeDirection | null>(
    null,
  );

  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const profiles = MOCK_API_RESPONSE.profiles;
  const activeProfile = profiles[currentIndex];

  const triggerSwipe = (direction: SwipeDirection) => {
    if (!activeProfile || exitDirection) return;

    setExitDirection(direction);
    setDragOffset({
      x: direction === "right" ? 550 : -550,
      y: 25,
    });

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        { userId: activeProfile.user_id, direction },
      ]);
      setCurrentIndex((prev) => prev + 1);
      setExitDirection(null);
      setDragOffset({ x: 0, y: 0 });
    }, 260);
  };

  const handleUndo = () => {
    if (currentIndex === 0 || exitDirection) return;
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex((prev) => prev - 1);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
    setDragOffset({ x: 0, y: 0 });
    setExitDirection(null);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (exitDirection) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || exitDirection) return;
    setDragOffset({
      x: e.clientX - startPosRef.current.x,
      y: (e.clientY - startPosRef.current.y) * 0.2,
    });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset.x > SWIPE_THRESHOLD) {
      triggerSwipe("right");
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      triggerSwipe("left");
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const rotation = dragOffset.x * 0.03;
  const acceptProgress = Math.min(
    Math.max(dragOffset.x / SWIPE_THRESHOLD, 0),
    1,
  );
  const rejectProgress = Math.min(
    Math.max(-dragOffset.x / SWIPE_THRESHOLD, 0),
    1,
  );

  return (
    // Change this line in ProfileComponent.tsx:
    <div className="h-full w-full bg-white text-[#141118] flex flex-col justify-between overflow-hidden select-none">
      <div className="w-full max-w-md md:max-w-[780px] mx-auto h-full flex flex-col justify-between px-4 sm:px-6 py-3 md:py-5">
        {/* Top Header */}
        <header className="relative flex items-center justify-between md:justify-center py-1 z-20">
          {/* Mobile Brand Mark */}
          <div className="flex items-center gap-2.5 md:hidden">
            <span className="text-2xl font-black tracking-tight text-[#141118]">
              coy<span className="text-[#FF3B7F]">.</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFE259] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] text-xs font-extrabold">
              {activeProfile
                ? `${currentIndex + 1}/${profiles.length}`
                : "Done"}
            </span>
          </div>

          {/* Centered Title Block (PC Layout) */}
          <div className="hidden md:flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#141118]">
                Discover
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFE259] border-2 border-[#141118] shadow-[2px_2px_0px_#141118] text-[11px] font-extrabold">
                {activeProfile
                  ? `${currentIndex + 1} of ${profiles.length}`
                  : "All caught up"}
              </span>
            </div>
            <p className="text-xs font-medium text-zinc-500 mt-0.5">
              Find someone interesting.
            </p>
          </div>

          {/* Rewind Button */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={currentIndex === 0}
            aria-label="Rewind previous swipe"
            title="Rewind previous swipe"
            className="md:absolute md:right-0 p-2.5 rounded-full bg-white border-2 border-[#141118] shadow-[3px_3px_0px_#141118] text-[#141118] hover:bg-[#FFE259] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141118] disabled:opacity-35 disabled:pointer-events-none transition"
          >
            <FiRotateCcw className="w-4 h-4 stroke-[2.5]" />
          </button>
        </header>

        {/* Main Card Stage */}
        <main className="relative flex-1 min-h-0 my-2 md:my-3 flex items-center justify-center">
          {activeProfile ? (
            <div
              key={activeProfile.user_id}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotation}deg)`,
                transition: isDragging
                  ? "none"
                  : "transform 0.26s cubic-bezier(0.22, 1, 0.36, 1)",
                touchAction: "none",
              }}
              className="relative w-full h-full rounded-[24px] md:rounded-[28px] overflow-hidden bg-white border-2 border-[#141118] shadow-[6px_6px_0px_#141118] flex flex-col cursor-grab active:cursor-grabbing"
            >
              {/* Photo Area (Full height on mobile, top split section on PC) */}
              <div className="relative flex-1 min-h-0 w-full overflow-hidden bg-zinc-100">
                <img
                  src={activeProfile.photoUrl}
                  alt={activeProfile.name}
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />

                {/* Mobile-only Bottom Gradient for overlaid text */}
                <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#141118]/95 via-[#141118]/35 to-transparent pointer-events-none" />
              </div>

              {/* PC Bottom Details Section (Matches Reference Image Layout) */}
              <div className="hidden md:flex flex-col gap-2 px-6 py-4 bg-white border-t-2 border-[#141118] pointer-events-none shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-[#141118] leading-tight">
                      {activeProfile.name}
                    </h2>
                    <p className="text-xs font-semibold text-zinc-500 mt-0.5">
                      {activeProfile.college} · {activeProfile.city}
                    </p>
                  </div>

                  {/* Subtle Coy Brand Dot */}
                  <span className="text-sm font-black tracking-tight text-[#141118]">
                    coy<span className="text-[#FF3B7F]">.</span>
                  </span>
                </div>

                <p className="text-sm font-medium text-[#141118]/85 leading-snug">
                  {activeProfile.bio}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {activeProfile.interests.map((interest) => (
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
                    {activeProfile.name}
                  </h2>
                  <div className="mt-1 flex flex-col gap-1 text-xs font-medium text-zinc-200">
                    <span className="flex items-center gap-1.5">
                      <FiBookOpen className="w-3.5 h-3.5 text-[#FFE259] shrink-0" />
                      {activeProfile.college}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="w-3.5 h-3.5 text-[#FF3B7F] shrink-0" />
                      {activeProfile.city}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-100 leading-snug">
                  {activeProfile.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProfile.interests.map((interest) => (
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
          ) : (
            /* Empty State */
            <div className="w-full h-full rounded-[28px] bg-[#FFFDF7] border-2 border-[#141118] shadow-[6px_6px_0px_#141118] p-6 flex flex-col items-center justify-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#FFE259] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] flex items-center justify-center text-[#141118]">
                <FiSliders className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-[#141118]">
                  No more profiles
                </h3>
                <p className="text-sm font-medium text-zinc-600 mt-1">
                  Liked:{" "}
                  <span className="font-bold text-[#141118]">
                    {history.filter((h) => h.direction === "right").length}
                  </span>{" "}
                  · Passed:{" "}
                  <span className="font-bold text-[#141118]">
                    {history.filter((h) => h.direction === "left").length}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-full bg-[#FF3B7F] text-[#141118] border-2 border-[#141118] shadow-[4px_4px_0px_#141118] hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#141118] text-sm font-extrabold transition"
              >
                Reload Profiles
              </button>
            </div>
          )}
        </main>

        {/* Bottom Controls */}
        <footer className="py-1.5 md:py-2 flex flex-col items-center justify-center gap-2 z-20 shrink-0">
          <div className="flex items-center justify-center gap-6 md:gap-5">
            <button
              type="button"
              onClick={() => triggerSwipe("left")}
              disabled={!activeProfile || Boolean(exitDirection)}
              aria-label="Pass profile"
              className="w-14 h-14 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-[#141118] border-2 border-[#141118] shadow-[3px_3px_0px_#141118] hover:bg-[#FF3B7F] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#141118] disabled:opacity-35 disabled:pointer-events-none transition"
            >
              <FiX className="w-6 h-6 md:w-5 md:h-5 stroke-[2.75]" />
            </button>

            <button
              type="button"
              onClick={() => triggerSwipe("right")}
              disabled={!activeProfile || Boolean(exitDirection)}
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
      </div>
    </div>
  );
};

export default ProfileSwiper;
