import * as React from "react";
import { Settings as SettingsIcon, BarChart3, LayoutDashboard, Clock, Calendar } from "lucide-react";

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

  // Update clock every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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
      className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md border-b border-[#E0E3E7] dark:border-zinc-900 px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden shadow-sm"
    >
      {/* Brand Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center bg-emerald-500/10 dark:bg-emerald-500/20 p-1.5 rounded-xl transition-all duration-300" style={{ height: "40px", width: "40px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 130" className="h-full w-auto text-emerald-600 dark:text-emerald-400 fill-current animate-pulse">
            <path d="M50,115 C58,115 69,110 75,100 C86,83 91,63 85,44 C83,37 79,31 74,26 C73,25 71,26 71,27 C75,36 75,46 71,54 C69,58 66,62 62,65 C61,66 59,65 59,64 C59,58 57,51 54,46 C51,40 47,35 44,29 C37,18 39,6 44,-5 C44,-6 43,-7 42,-7 C33,6 27,21 27,37 C27,50 30,62 36,73 C37,75 35,77 33,76 C28,72 25,67 23,61 C22,58 20,60 20,60 C18,69 19,79 24,87 C30,98 38,107 48,112 C49,113 50,114 50,115 Z" />
          </svg>
        </div>
        <div className="space-y-0.5">
          <h1 className="text-base font-bold text-[#3C4043] dark:text-zinc-100 tracking-tight font-sans">
            GrindStreaks
          </h1>
          <span className="text-[11px] text-[#5F6368] dark:text-zinc-400 font-medium tracking-wide">
            Aesthetic habit & study systems
          </span>
        </div>
      </div>

      {/* Date & Dynamic Clock Panel */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-[#5F6368] dark:text-zinc-400 border border-[#E0E3E7] dark:border-zinc-800/80 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950/50 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-[#34A853]" />
          <span className="font-sans font-semibold">{formatLiveDate(time)}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-[#3C4043] dark:text-zinc-300 border border-[#E0E3E7] dark:border-zinc-800 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-950 font-semibold font-sans shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#4285F4]" />
          <span>{formatLiveTime(time)}</span>
        </div>
      </div>

      {/* Navigation & Action Buttons */}
      <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
        {currentView === "dashboard" ? (
          <button
            onClick={() => setView("analytics")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer border-none"
            title="Open Deep Analytics page"
          >
            <BarChart3 className="w-4 h-4 text-[#FBBC05]" />
            Analytics
          </button>
        ) : (
          <button
            onClick={() => setView("dashboard")}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs text-white rounded-xl font-bold shadow-sm transition-all cursor-pointer border-none"
            title="Return to Study Dashboard"
          >
            <LayoutDashboard className="w-4 h-4 text-[#4285F4]" />
            Dashboard
          </button>
        )}

        {/* Preferences modal trigger */}
        <button
          onClick={onOpenSettings}
          className="p-2 bg-black hover:bg-zinc-900 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white rounded-xl shadow-sm transition-all cursor-pointer border-none"
          title="Settings & Tools"
        >
          <SettingsIcon className="w-4.5 h-4.5" />
        </button>
      </div>
    </header>
  );
};
