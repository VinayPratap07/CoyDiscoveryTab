import React from "react";
import { FiHome, FiCompass, FiHeart } from "react-icons/fi";
import { NavLink, Link } from "react-router";

export type NavTab = "home" | "discover" | "matches";

interface NavItem {
  id: NavTab;
  label: string;
  to: string;
  end?: boolean;
  icon: (isActive: boolean) => React.ReactNode;
  badgeCount?: number;
}

function Navbar() {
  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      to: "/",
      end: true,
      icon: (isActive) => (
        <FiHome
          className={`w-6 h-6 md:w-4 md:h-4 transition-transform ${
            isActive ? "stroke-[2.75] scale-105 md:scale-100" : "stroke-[2.25]"
          }`}
        />
      ),
    },
    {
      id: "discover",
      label: "Discover",
      to: "/discover",
      icon: (isActive) => (
        <FiCompass
          className={`w-6 h-6 md:w-4 md:h-4 transition-transform ${
            isActive ? "stroke-[2.75] scale-105 md:scale-100" : "stroke-[2.25]"
          }`}
        />
      ),
    },
    {
      id: "matches",
      label: "Matches",
      to: "/matches",
      icon: (isActive) => (
        <FiHeart
          className={`w-6 h-6 md:w-4 md:h-4 transition-transform ${
            isActive
              ? "stroke-[2.5] fill-[#FF3B7F] md:fill-[#141118] scale-105 md:scale-100"
              : "stroke-[2.25]"
          }`}
        />
      ),
    },
  ];

  return (
    <header className="w-full bg-white text-[#141118] border-t-2 md:border-t-0 md:border-b-2 border-[#141118] pb-[env(safe-area-inset-bottom)] md:pb-0 z-50 select-none shrink-0">
      <nav
        aria-label="Primary Navigation"
        className="max-w-6xl mx-auto md:px-6 h-16"
      >
        {/* MOBILE: Side-by-side bottom icon bar */}
        <div className="grid grid-cols-3 h-full md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              aria-label={item.label}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive
                    ? "text-[#FF3B7F]"
                    : "text-zinc-400 hover:text-[#141118]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Top Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute top-0 w-14 h-[3px] bg-[#FF3B7F] rounded-b-full" />
                  )}

                  <div className="relative flex items-center justify-center">
                    {item.icon(isActive)}

                    {/* Notification Dot / Badge on Matches */}
                    {item.badgeCount !== undefined && item.badgeCount > 0 && (
                      <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 flex items-center justify-center text-[10px] font-black leading-none rounded-full bg-[#FF3B7F] text-[#141118] border border-[#141118]">
                        {item.badgeCount > 9 ? "9+" : item.badgeCount}
                      </span>
                    )}
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* PC: Standard Top Bar with Logo + Pill Links */}
        <div className="hidden md:flex items-center justify-between h-full">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-[#141118] flex items-center"
          >
            coy<span className="text-[#FF3B7F]">.</span>
          </Link>

          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-extrabold border-2 transition ${
                    isActive
                      ? "bg-[#FF3B7F] text-[#141118] border-[#141118] shadow-[3px_3px_0px_#141118]"
                      : "bg-white text-[#141118] border-transparent hover:border-[#141118] hover:bg-[#FFE259] hover:shadow-[3px_3px_0px_#141118]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.icon(isActive)}
                    <span>{item.label}</span>
                    {item.badgeCount !== undefined && item.badgeCount > 0 && (
                      <span className="ml-0.5 px-2 py-0.5 text-[11px] font-black leading-none rounded-full bg-[#FFE259] text-[#141118] border border-[#141118]">
                        {item.badgeCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
