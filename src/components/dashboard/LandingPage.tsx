import * as React from "react";
import { ArrowRight, Sparkles, CheckCircle, Award, LayoutGrid, Zap, Sun, Moon, LogIn } from "lucide-react";
// @ts-ignore
import logoPng from "../../assets/logo.png";
// @ts-ignore
import mascotPng from "../../assets/mascot.png";
import { useAuth } from "../../hooks/useAuth";

interface LandingPageProps {
  onComplete: (name: string) => void;
  id?: string;
  darkMode?: boolean;
  toggleDarkMode?: (enabled: boolean) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onComplete,
  id = "landing-page",
  darkMode = true,
  toggleDarkMode
}) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [loadingGoogle, setLoadingGoogle] = React.useState(false);
  const { signInWithGoogle } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      const user = await signInWithGoogle();
      if (user) {
        const displayName = user.displayName?.split(' ')[0] || "Champion";
        onComplete(displayName);
      }
    } catch (e) {
      console.error(e);
      setLoadingGoogle(false);
    }
  };

  return (
    <div
      id={id}
      className="min-h-screen w-full bg-white dark:bg-zinc-950 text-gray-800 dark:text-zinc-100 relative overflow-hidden flex flex-col font-sans transition-colors duration-300"
    >
      {/* Centered radial gradient at the bottom of the viewport */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px] opacity-60 dark:opacity-40 transition-opacity"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(16, 185, 129, 0) 70%)'
        }}
      />

      {/* Decorative top ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Centered Floating Pill Navbar */}
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-300 rounded-full border border-zinc-200/50 dark:border-zinc-800/40 backdrop-blur-md shadow-lg py-2.5 px-5 bg-white/75 dark:bg-zinc-950/75 ${scrolled
            ? "w-[240px] md:w-[260px] justify-center gap-3"
            : "w-[calc(100%-2rem)] max-w-md md:max-w-lg"
          }`}
      >
        <div className="flex items-center gap-2">
          <img
            src={logoPng}
            alt="GrindStreaks Logo"
            className="w-7 h-7 rounded-lg object-contain"
            referrerPolicy="no-referrer"
          />
          {/* Brand name collapses when at top, and expands on scroll past hero title */}
          <span className={`font-sans font-bold tracking-tight text-sm text-gray-900 dark:text-white transition-all duration-300 ${scrolled ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0 pointer-events-none overflow-hidden"
            }`}>
            GrindStreaks
          </span>
        </div>

        {/* Dynamic navigation and action links shown only when at the top */}
        <div className={`flex items-center gap-4 transition-all duration-200 ${scrolled ? "opacity-0 max-w-0 pointer-events-none overflow-hidden" : "opacity-100 max-w-[300px]"
          }`}>
          <button
            onClick={() => document.getElementById('core-capabilities')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-xs font-semibold text-gray-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 bg-transparent border-none cursor-pointer transition-colors"
          >
            Capabilities
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:opacity-80 disabled:opacity-50 bg-transparent border-none cursor-pointer transition-opacity"
          >
            {loadingGoogle ? "Signing In..." : "Start Grind"}
          </button>
        </div>

        {/* Theme Toggle - Always available in floating navbar */}
        <div className="flex items-center">
          {toggleDarkMode && (
            <button
              onClick={() => toggleDarkMode(!darkMode)}
              className="p-1.5 rounded-full bg-zinc-100/60 dark:bg-zinc-900/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-gray-600 dark:text-zinc-300 border-none cursor-pointer transition-all"
              title="Toggle system theme"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
              )}
            </button>
          )}
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-7xl w-full mx-auto px-6 pt-24 pb-12 z-10">

        {/* Main Hero Section */}
        <div className="text-center max-w-3xl space-y-8 py-12 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                GrindStreaks
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Cut the noise.
              <br />
              Grind toward success with Streako and AI automation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="group w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:disabled:bg-emerald-700 text-white dark:text-zinc-950 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200 cursor-pointer border-none flex items-center justify-center gap-2"
            >
              {loadingGoogle ? "Connecting..." : "Continue with Google"}
              {!loadingGoogle && <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </div>

        {/* Feature Grid Section (On scroll / Below hero) */}
        <div id="core-capabilities" className="mt-16 pt-16 w-full">
          <div className="text-center space-y-2 mb-12">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full">
              Core Capabilities
            </span>
            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Pristine Systems to Drive Daily Success
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Column 1: Zero Input Tracking */}
            <div className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  Zero-Input Automation
                </h4>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Connect your profiles and watch commits, LeetCode progress, GeeksforGeeks, and WakaTime sessions flow directly into your daily schedule.
                </p>
              </div>

              {/* Zero-Input Automation Relevant SVG Animation with LeetCode, GitHub, GFG */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl flex items-center justify-center mt-auto relative overflow-hidden h-36">
                <svg viewBox="0 0 160 100" className="w-full h-full text-emerald-500">
                  {/* Subtle Background Grid lines */}
                  <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08">
                    <line x1="0" y1="25" x2="160" y2="25" />
                    <line x1="0" y1="50" x2="160" y2="50" />
                    <line x1="0" y1="75" x2="160" y2="75" />
                    <line x1="40" y1="0" x2="40" y2="100" />
                    <line x1="80" y1="0" x2="80" y2="100" />
                    <line x1="120" y1="0" x2="120" y2="100" />
                  </g>

                  {/* Flow lines with animation dashes */}
                  <path d="M 30 25 Q 70 25 110 50" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3,3" fill="none" className="animate-[pulse_2s_infinite]" />
                  <path d="M 30 50 H 110" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3,3" fill="none" className="animate-[pulse_1.5s_infinite]" />
                  <path d="M 30 75 Q 70 75 110 50" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3,3" fill="none" className="animate-[pulse_2s_infinite]" />

                  {/* Travelling signal particles */}
                  <circle r="2" fill="#34D399">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M 30 25 Q 70 25 110 50" />
                  </circle>
                  <circle r="2" fill="#34D399">
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M 30 50 H 110" />
                  </circle>
                  <circle r="2" fill="#34D399">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 30 75 Q 70 75 110 50" />
                  </circle>

                  {/* Left Side Logo nodes: GitHub, LeetCode, GFG in matching styling */}
                  {/* 1. GitHub Node */}
                  <g transform="translate(10, 13)">
                    <circle cx="12" cy="12" r="11" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1" />
                    <path d="M12 5c-3.87 0-7 3.13-7 7 0 3.09 2 5.72 4.78 6.65.35.06.48-.15.48-.34 0-.17-.01-.62-.01-1.21-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.08.72 1.08.72.63 1.08 1.65.77 2.05.59.06-.46.25-.77.45-.95-1.55-.18-3.19-.78-3.19-3.47 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.94.72A6.67 6.67 0 0112 8.41c.59.01 1.19.08 1.76.24 1.34-.91 1.93-.72 1.93-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.88 0 2.7-1.64 3.28-3.19 3.45.25.22.48.65.48 1.32 0 .95-.01 1.72-.01 1.95 0 .19.13.41.49.34C19.01 17.72 21 15.09 21 12c0-3.87-3.13-7-7-7z" fill="#10B981" />
                  </g>

                  {/* 2. LeetCode Node */}
                  <g transform="translate(10, 38)">
                    <circle cx="12" cy="12" r="11" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1" />
                    {/* LeetCode custom icon geometry */}
                    <path d="M 7 11 L 11 7 L 13 8.5 L 9.5 12 L 13 15.5 L 11 17 Z M 14 8 L 17 11 L 15.5 12.5 L 12.5 9.5 Z M 13.5 12.5 L 16.5 15.5 L 15 17 L 12 14 Z" fill="#10B981" />
                  </g>

                  {/* 3. GeeksforGeeks Node */}
                  <g transform="translate(10, 63)">
                    <circle cx="12" cy="12" r="11" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1" />
                    {/* GeeksforGeeks custom geometry */}
                    <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6h-2c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c1.4 0 2.6.7 3.3 1.8l1.7-1C16.1 7.3 14.2 6 12 6z M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.9 0 1.7-.4 2.2-1.1l-1.3-.8c-.2.3-.5.4-.9.4-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5c.4 0 .7.1.9.4l1.3-.8C13.7 9.4 12.9 9 12 9z" fill="#10B981" />
                  </g>

                  {/* Right Side: Consistency Hub */}
                  <g transform="translate(120, 38)">
                    <circle cx="12" cy="12" r="14" fill="#10B981" fillOpacity="0.15" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#10B981" strokeWidth="1" className="animate-[ping_2.5s_infinite]" />
                    <circle cx="12" cy="12" r="8" fill="#10B981" />
                    <path d="M12 7l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5-2.5-2.5 3.5-.5z" fill="white" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Column 2: Streako Mascot */}
            <div className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4 relative overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  Meet Streako, your AI Coach
                </h4>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Meet Streako, your friendly mascot coach, peeping through to celebrate your milestones, generate custom roadmaps, and keep you on track.
                </p>
              </div>

              {/* Streako Mascot Image */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl flex items-center justify-center mt-auto relative overflow-hidden h-36">
                <img
                  src={mascotPng}
                  alt="Streako Mascot Coach"
                  className="h-full max-h-full object-contain select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Column 3: Insights and analytics */}
            <div className="group p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  Consistency & Insights
                </h4>
                <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-medium">
                  Watch your study heatmaps update dynamically, track active timers, review deep historical completion rates, and never break your momentum streak.
                </p>
              </div>

              {/* Consistency & Insights Relevant SVG Animation (Climbing graph trend) */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl flex items-center justify-center mt-auto h-36 relative overflow-hidden">
                <svg viewBox="0 0 160 100" className="w-full h-full text-emerald-500">
                  {/* Background Grid */}
                  <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.08">
                    <line x1="0" y1="20" x2="160" y2="20" />
                    <line x1="0" y1="40" x2="160" y2="40" />
                    <line x1="0" y1="60" x2="160" y2="60" />
                    <line x1="0" y1="80" x2="160" y2="80" />
                    <line x1="32" y1="0" x2="32" y2="100" />
                    <line x1="64" y1="0" x2="64" y2="100" />
                    <line x1="96" y1="0" x2="96" y2="100" />
                    <line x1="128" y1="0" x2="128" y2="100" />
                  </g>

                  {/* Gradient Bars under the graph */}
                  <rect x="12" y="70" width="12" height="15" rx="2" fill="#10B981" fillOpacity="0.15" />
                  <rect x="36" y="55" width="12" height="30" rx="2" fill="#10B981" fillOpacity="0.25" />
                  <rect x="60" y="45" width="12" height="40" rx="2" fill="#10B981" fillOpacity="0.35" />
                  <rect x="84" y="30" width="12" height="55" rx="2" fill="#10B981" fillOpacity="0.45" />
                  <rect x="108" y="20" width="12" height="65" rx="2" fill="#10B981" fillOpacity="0.6" />
                  <rect x="132" y="10" width="12" height="75" rx="2" fill="#10B981" fillOpacity="0.75" />

                  {/* Glowing Rising line graph */}
                  <path
                    d="M 18 70 L 42 55 L 66 45 L 90 30 L 114 20 L 138 10"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.5)]"
                  />

                  {/* Pulsing focal node at peak */}
                  <circle cx="138" cy="10" r="4" fill="#34D399" />
                  <circle cx="138" cy="10" r="8" fill="none" stroke="#34D399" strokeWidth="1" className="animate-ping" style={{ animationDuration: '2s' }} />

                  {/* Trend Indicator Arrow */}
                  <path d="M 145 15 L 145 5 L 135 5" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[bounce_2s_infinite]" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto py-12 px-6 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-zinc-500 z-10">
        <div>
          <span>© {new Date().getFullYear()} GrindStreaks .</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Made by </span>
          <span className="font-bold text-gray-800 dark:text-zinc-350">thiv</span>
          <span className="mx-2 text-zinc-300 dark:text-zinc-800">|</span>
          <a
            href="https://github.com/gparthiv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-500 dark:hover:text-emerald-400 font-bold transition-colors text-gray-600 dark:text-zinc-400"
          >
            GitHub
          </a>
          <span className="mx-2 text-zinc-300 dark:text-zinc-800">|</span>
          <a
            href="https://www.linkedin.com/in/parthivghosh119"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-500 dark:hover:text-emerald-400 font-bold transition-colors text-gray-600 dark:text-zinc-400"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};
