import * as React from "react";
import { Settings as SettingsIcon, BarChart3, LayoutDashboard, Clock, Calendar, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
// @ts-ignore
import logoPng from "../../assets/logo.png";

interface HeaderProps {
  currentView: "dashboard" | "analytics";
  setView: (view: "dashboard" | "analytics") => void;
  onOpenSettings: () => void;
  id: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  onOpenSettings,
  id,
}) => {
  const [time, setTime] = React.useState(() => new Date());
  const [scrolled, setScrolled] = React.useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  // Update clock every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format time: e.g. "02:03:41 PM"
  const formatLiveTime = (date: Date): string => {
    let hrs = date.getHours();
    const mins = String(date.getMinutes()).padStart(2, "0");
    const secs = String(date.getSeconds()).padStart(2, "0");
    const ampm = hrs >= 12 ? "PM" : "AM";
    
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // the hour '0' should be '12'
    const hrStr = String(hrs).padStart(2, "0");
    
    return `${hrStr}:${mins}:${secs} ${ampm}`;
  };

  // Format date: e.g. "Wednesday, July 8, 2026"
  const formatLiveDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <header
      id={id}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex items-center justify-between rounded-full border border-zinc-200/50 dark:border-zinc-800/40 shadow-lg print:hidden transition-all duration-300 ${
        scrolled
          ? "w-[300px] md:w-[380px] px-3.5 py-1.5"
          : "w-[calc(100%-2rem)] max-w-7xl px-4 md:px-6 py-2.5"
      }`}
    >
      {/* Brand Logo and Title */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        <div className="flex items-center justify-center shrink-0" style={{ height: scrolled ? "28px" : "40px" }}>
          <img
            src={logoPng}
            referrerPolicy="no-referrer"
            alt="GrindStreaks Logo"
            className={`${scrolled ? "h-6 w-6" : "h-7 sm:h-9 md:h-10 w-auto"} object-contain rounded-full transition-all duration-300`}
          />
        </div>
        <div className="space-y-0.5 text-left">
          <h1 className="text-xs sm:text-sm md:text-base font-bold text-[#3C4043] dark:text-zinc-100 tracking-tight font-sans leading-none">
            GrindStreaks
          </h1>
          {!scrolled && (
            <span className="hidden sm:block text-[10px] md:text-[11px] text-[#5F6368] dark:text-zinc-400 font-medium tracking-wide mt-0.5">
              Aesthetic habit & study systems
            </span>
          )}
        </div>
      </div>

      {/* Date & Dynamic Clock Panel (Shown only when up) */}
      {!scrolled && (
        <div className="hidden md:flex items-center justify-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-[#5F6368] dark:text-zinc-400 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 font-sans">
            <Calendar className="w-3.5 h-3.5 text-[#34A853]" />
            <span className="font-sans font-semibold">{formatLiveDate(time)}</span>
          </div>
          
          <div className="flex items-center gap-1.5 text-[#3C4043] dark:text-zinc-300 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 font-semibold font-sans">
            <Clock className="w-3.5 h-3.5 text-[#4285F4]" />
            <span>{formatLiveTime(time)}</span>
          </div>
        </div>
      )}

      {/* Navigation & Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {/* View Indicator / Switcher */}
        {currentView === "dashboard" ? (
          <button
            onClick={() => setView("analytics")}
            className={`flex items-center justify-center gap-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-300 rounded-xl font-bold shadow-sm transition-all cursor-pointer border-none ${
              scrolled ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs"
            }`}
            title="Switch to Deep Analytics page"
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#FBBC05]" />
            <span className="hidden sm:inline">{!scrolled ? "Analytics" : "Stat"}</span>
          </button>
        ) : (
          <button
            onClick={() => setView("dashboard")}
            className={`flex items-center justify-center gap-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-300 rounded-xl font-bold shadow-sm transition-all cursor-pointer border-none ${
              scrolled ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs"
            }`}
            title="Return to Study Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#4285F4]" />
            <span className="hidden sm:inline">{!scrolled ? "Dashboard" : "Dash"}</span>
          </button>
        )}

        {/* Auth Button */}
        {user ? (
          <button
            onClick={logout}
            className={`bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-xl shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1 font-bold ${
              scrolled ? "p-1.5" : "px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs"
            }`}
            title="Log out"
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="User" className={`${scrolled ? "w-4 h-4" : "w-4 h-4 sm:w-5 sm:h-5"} rounded-full`} referrerPolicy="no-referrer" />
            ) : (
              <User className={`${scrolled ? "w-3.5 h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`} />
            )}
            {!scrolled && <span className="hidden sm:inline">{user.displayName?.split(' ')[0] || 'Logged In'}</span>}
          </button>
        ) : (
          <button
            onClick={signInWithGoogle}
            className={`bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-300 rounded-xl shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1 font-bold ${
              scrolled ? "p-1.5" : "px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs"
            }`}
            title="Log in to Sync"
          >
            <LogIn className={`${scrolled ? "w-3.5 h-3.5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`} />
            {!scrolled && <span className="hidden sm:inline">Sign In</span>}
          </button>
        )}

        {/* Preferences modal trigger */}
        <button
          onClick={onOpenSettings}
          className={`bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-300 rounded-xl shadow-sm transition-all cursor-pointer border-none flex items-center justify-center ${
            scrolled ? "p-1.5" : "p-1.5 sm:p-2"
          }`}
          title="Settings & Tools"
        >
          <SettingsIcon className={`${scrolled ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-4.5 sm:h-4.5"}`} />
        </button>
      </div>
    </header>
  );
};
