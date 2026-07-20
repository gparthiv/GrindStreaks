import * as React from "react";
import { useTaskEngine } from "./hooks/useTaskEngine";
import { Header } from "./components/layout/Header";
import { HeroCard } from "./components/dashboard/HeroCard";
import { Heatmap } from "./components/dashboard/Heatmap";
import { TimetableList } from "./components/dashboard/TimetableList";
import { CustomTaskList } from "./components/dashboard/CustomTaskList";
import { AnalyticsPage } from "./components/analytics/AnalyticsPage";
import { SettingsModal } from "./components/settings/SettingsModal";
import { ConfettiEffect } from "./components/shared/ConfettiEffect";
import { LandingPage } from "./components/dashboard/LandingPage";
import { fetchMorningQuote } from "./services/ai";
import { Sun, Sparkles, Coffee, Target, ArrowRight, BookOpen, Moon } from "lucide-react";
import { Card } from "./components/ui/card";

export default function App() {
  const {
    todayRecord,
    settings,
    history,
    activeTaskId,
    startTask,
    pauseTask,
    completeTask,
    resetTask,
    addCustomTask,
    renameCustomTask,
    deleteCustomTask,
    toggleDarkMode,
    handleResetToday,
    handleImportJSON,
    getLiveDuration,
    reloadTodayRecord,
    savedTags,
    startDay,
    wrapUpDay,
    reopenDay,
    addDynamicTask,
  } = useTaskEngine();

  const [currentView, setView] = React.useState<"dashboard" | "analytics">("dashboard");
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [confettiTrigger, setConfettiTrigger] = React.useState(false);

  // Custom User Profile Name State
  const [userName, setUserName] = React.useState<string>(() => {
    return localStorage.getItem("grindstreaks_user_name_v1") || "";
  });

  // Onboarding wizard states
  const [morningStep, setMorningStep] = React.useState<"welcome" | "goals" | "task" | "none">("none");
  const [morningQuote, setMorningQuote] = React.useState("Your limitation - it's only your imagination. Make today count.");
  const [quoteLoading, setQuoteLoading] = React.useState(false);
  const [firstTaskName, setFirstTaskName] = React.useState("");
  const [firstTaskTag, setFirstTaskTag] = React.useState("DSA");
  const [isCustomFirstTag, setIsCustomFirstTag] = React.useState(false);
  const [customFirstTagVal, setCustomFirstTagVal] = React.useState("");
  const [dailyTargetCount, setDailyTargetCount] = React.useState(4);
  const [dailyGoalsText, setDailyGoalsText] = React.useState("");

  // Sync dark mode class on initial mount
  React.useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

  // Load quote on mount or when day reset occurs
  React.useEffect(() => {
    if (todayRecord && !todayRecord.isDayStarted) {
      setMorningStep("welcome");
      fetchMorningQuote(userName || "Champion").then((q) => {
        if (q) setMorningQuote(q);
      });
    } else {
      setMorningStep("none");
    }
  }, [todayRecord?.isDayStarted, userName]);

  const handleQuoteClick = async () => {
    if (quoteLoading) return;
    setQuoteLoading(true);
    try {
      const q = await fetchMorningQuote(userName || "Champion");
      if (q) setMorningQuote(q);
    } catch (e) {
      console.error(e);
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleStartDaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTag = isCustomFirstTag ? customFirstTagVal.trim() : firstTaskTag;
    if (!firstTaskName.trim() || !finalTag) return;

    startDay(firstTaskName.trim(), finalTag, dailyTargetCount, dailyGoalsText);
    setMorningStep("none");
    
    // Fire celebratory confetti!
    setConfettiTrigger(true);
    setTimeout(() => setConfettiTrigger(false), 4000);
  };

  // Trigger celebration on completing any task
  const lastCompletedCountRef = React.useRef(todayRecord.completedCount);
  React.useEffect(() => {
    if (todayRecord.completedCount > lastCompletedCountRef.current) {
      setConfettiTrigger(true);
      const timer = setTimeout(() => setConfettiTrigger(false), 4000);
      lastCompletedCountRef.current = todayRecord.completedCount;
      return () => clearTimeout(timer);
    }
    lastCompletedCountRef.current = todayRecord.completedCount;
  }, [todayRecord.completedCount]);

  // Global Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return; // Skip shortcuts when typing
      }

      if (e.code === "Space") {
        e.preventDefault();
        if (activeTaskId) {
          pauseTask(activeTaskId);
        } else if (todayRecord.tasks.length > 0) {
          const firstIncomplete = todayRecord.tasks.find((t) => t.status !== "completed");
          if (firstIncomplete) {
            startTask(firstIncomplete.id);
          }
        }
      } else if (e.key === "Enter") {
        if (activeTaskId) {
          e.preventDefault();
          completeTask(activeTaskId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTaskId, todayRecord.tasks, startTask, pauseTask, completeTask]);

  // Listener for custom view switching (e.g. from chatbot button clicks)
  React.useEffect(() => {
    const handleSwitchView = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "dashboard" || detail === "analytics") {
        setView(detail);
      }
    };
    window.addEventListener("switch-view", handleSwitchView);
    return () => window.removeEventListener("switch-view", handleSwitchView);
  }, []);

  if (!userName) {
    return (
      <>
        <ConfettiEffect trigger={confettiTrigger} />
        <LandingPage
          onComplete={(enteredName) => {
            localStorage.setItem("grindstreaks_user_name_v1", enteredName);
            setUserName(enteredName);
            setConfettiTrigger(true);
            setTimeout(() => setConfettiTrigger(false), 4000);
          }}
          darkMode={settings.darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-gray-800 dark:bg-zinc-950 dark:text-zinc-200 transition-colors duration-200 selection:bg-[#4285F4]/20 selection:text-[#4285F4] relative">
      {/* Dynamic Celebration */}
      <ConfettiEffect trigger={confettiTrigger} />

      {/* Top Header Navigation Panel */}
      <Header
        id="app-header"
        currentView={currentView}
        setView={setView}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Content */}
      <main className="px-4 md:px-8 py-6">
        {/* Morning Setup Overlay / Popup */}
        {morningStep !== "none" && !todayRecord.isDayStarted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in">
            <Card className="w-full max-w-lg p-8 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-850 rounded-3xl shadow-2xl text-center space-y-6 transform animate-scale-up">
              <div className="mx-auto w-14 h-14 bg-amber-50 dark:bg-amber-950/30 text-amber-500 rounded-full flex items-center justify-center shadow-inner">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Good Morning, {userName}!
                </h2>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                  Your focus is your greatest asset. Click the quote below to cycle daily inspiration:
                </p>
              </div>

              <div 
                onClick={handleQuoteClick}
                className={`p-6 bg-zinc-50 hover:bg-zinc-100/70 active:scale-[0.99] dark:bg-zinc-950/40 dark:hover:bg-zinc-900/50 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 relative cursor-pointer group transition-all duration-300 shadow-sm hover:shadow ${quoteLoading ? 'opacity-50' : ''}`}
                title="Click to refresh quote"
              >
                <span className="absolute top-2 left-3 text-4xl font-serif text-gray-200 dark:text-zinc-800 pointer-events-none select-none">“</span>
                <span className="absolute bottom-2 right-4 text-4xl font-serif text-gray-200 dark:text-zinc-800 pointer-events-none select-none">”</span>
                
                <p className="text-sm font-medium italic text-gray-700 dark:text-zinc-300 leading-relaxed font-sans px-4">
                  {morningQuote}
                </p>
                
                <div className="mt-3 text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
                  <span>Click to change quote</span>
                </div>
              </div>

              <button
                onClick={() => {
                  startDay("Initial Focus Sprint", "DSA", 4, "Awaiting goals from AI Coach conversation");
                  setMorningStep("none");
                  setConfettiTrigger(true);
                  setTimeout(() => setConfettiTrigger(false), 4000);
                }}
                className="w-full py-3.5 bg-black hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100 text-white rounded-2xl text-sm font-bold transition-all shadow-md border-none cursor-pointer flex items-center justify-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                LET'S START THE DAY
                <ArrowRight className="w-4 h-4" />
              </button>
            </Card>
          </div>
        )}

        {/* Regular views content */}
        {currentView === "dashboard" ? (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Row 1: Hero stats block */}
            <HeroCard
              id="hero-stats"
              streak={settings.streak}
              maxStreak={settings.maxStreak}
              completionRate={todayRecord.completionRate}
              completedCount={todayRecord.completedCount}
              totalCount={todayRecord.totalCount}
              studyTimeMs={todayRecord.studyTime}
            />

            {/* Row 2: Consistency heatmap */}
            <Heatmap
              id="consistency-heatmap"
              history={history}
              todayRecord={todayRecord}
            />

            {/* Row 3: Timetable & Custom Task Cards Layout - stacked vertically for all screens */}
            <div className="space-y-6">
              {/* Daily timetable list */}
              <div>
                <TimetableList
                  id="timetable-section"
                  tasks={todayRecord.tasks}
                  activeTaskId={activeTaskId}
                  startTask={startTask}
                  pauseTask={pauseTask}
                  completeTask={completeTask}
                  resetTask={resetTask}
                  getLiveDuration={getLiveDuration}
                  addDynamicTask={addDynamicTask}
                  deleteCustomTask={deleteCustomTask}
                  savedTags={savedTags}
                />
              </div>

              {/* Custom habits/study items */}
              <div>
                <CustomTaskList
                  id="custom-tasks-section"
                  todayRecord={todayRecord}
                  addDynamicTask={addDynamicTask}
                  wrapUpDay={wrapUpDay}
                  reopenDay={reopenDay}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Multi-dimensional analytics dashboard */
          <AnalyticsPage
            id="analytics-section"
            history={history}
            todayRecord={todayRecord}
            settings={settings}
          />
        )}
      </main>

      {/* Preferences & Backup Manager Modal */}
      <SettingsModal
        id="settings-overlay-panel"
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        toggleDarkMode={toggleDarkMode}
        handleResetToday={handleResetToday}
        handleImportJSON={handleImportJSON}
        reloadTodayRecord={reloadTodayRecord}
        userName={userName}
        setUserName={setUserName}
      />
    </div>
  );
}
