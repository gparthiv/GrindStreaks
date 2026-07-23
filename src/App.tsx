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
import { AICoachChatbox } from "./components/dashboard/AICoachChatbox";
import { fetchMorningQuote } from "./services/ai";
import { Sun, Sparkles, Coffee, Target, ArrowRight, BookOpen, Moon } from "lucide-react";
import { Card } from "./components/ui/card";
// @ts-ignore
import popupPng from "./assets/popup.png";

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
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [showTutorial, setShowTutorial] = React.useState(() => {
    return !!localStorage.getItem("grindstreaks_user_name_v1") && !localStorage.getItem("grindstreaks_tutorial_completed_v1");
  });

  // Custom User Profile Name State
  const [userName, setUserName] = React.useState<string>(() => {
    return localStorage.getItem("grindstreaks_user_name_v1") || "";
  });

  // Sync dark mode class on initial mount
  React.useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkMode]);

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
      <LandingPage
        onComplete={(enteredName) => {
          localStorage.setItem("grindstreaks_user_name_v1", enteredName);
          setUserName(enteredName);
          setShowTutorial(true);
        }}
        darkMode={settings.darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-gray-800 dark:bg-zinc-950 dark:text-zinc-200 transition-colors duration-200 selection:bg-[#4285F4]/20 selection:text-[#4285F4] relative">
      {/* Top Header Navigation Panel */}
      <Header
        id="app-header"
        currentView={currentView}
        setView={setView}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main View Content */}
      <main className="px-4 md:px-8 pt-28 pb-6">
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

      {/* Floating Chat Button */}
      <button
        onClick={() => {
          setIsChatOpen(!isChatOpen);
          if (showTutorial) {
            setShowTutorial(false);
            localStorage.setItem("grindstreaks_tutorial_completed_v1", "true");
          }
        }}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-xl bg-white dark:bg-zinc-800 flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 border border-gray-200 dark:border-zinc-700 ${
          showTutorial 
            ? "z-[110] animate-pulse ring-4 ring-emerald-500 ring-offset-2 dark:ring-offset-zinc-950" 
            : "z-50"
        }`}
      >
        <img src={popupPng} alt="Chat with Streako" className="w-10 h-10 object-contain" />
      </button>

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
          {/* Invisible backdrop to capture clicks without closing */}
          <div className="absolute inset-0" />
          
          <div className="relative z-[101] bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center transform translate-y-[-10vh]">
             <img src={popupPng} alt="Streako" className="w-20 h-20 object-contain mb-4" />
             <h3 className="text-xl font-bold text-gray-800 dark:text-zinc-100 mb-2">Meet Streako!</h3>
             <p className="text-gray-600 dark:text-zinc-400 mb-6 text-sm">
               Your personal AI coach. Click the shining button in the bottom right corner anytime to chat, track your roadmap, and stay focused on your goals!
             </p>
             <button 
               onClick={() => {
                 setShowTutorial(false);
                 localStorage.setItem("grindstreaks_tutorial_completed_v1", "true");
               }}
               className="text-sm font-semibold text-gray-500 hover:text-gray-800 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
             >
               Skip
             </button>
          </div>
          
          {/* Pointing arrow indicator */}
          <div className="absolute bottom-[110px] right-[40px] animate-bounce text-emerald-500 z-[101]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
          </div>
        </div>
      )}

      {/* Chatbox Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsChatOpen(false)}
          />
          {/* Modal Content */}
          <div className="relative w-full h-full md:w-2/3 md:max-w-5xl md:h-[85vh] flex flex-col bg-white dark:bg-zinc-900 shadow-2xl md:rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex-1 overflow-hidden">
              <AICoachChatbox todayRecord={todayRecord} addDynamicTask={addDynamicTask} onClose={() => setIsChatOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
