import * as React from "react";
import { Card } from "../ui/card";
import { 
  Github, 
  Code2, 
  Youtube, 
  BookOpen, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Play, 
  Sparkles,
  Link,
  Info,
  Clock,
  Hourglass
} from "lucide-react";

interface AutomatedTrackersHubProps {
  addDynamicTask: (name: string, tag: string, startImmediately?: boolean) => void;
  onSyncCompleted?: (message: string) => void;
}

export interface TrackerConfig {
  githubUsername: string;
  leetcodeUsername: string;
  youtubePlaylistUrl: string;
  gfgUsername: string;
  wakatimeUsername: string;
  togglApiKey: string;
}

export const AutomatedTrackersHub: React.FC<AutomatedTrackersHubProps> = ({
  addDynamicTask,
  onSyncCompleted
}) => {
  // Load configuration from local storage
  const [config, setConfig] = React.useState<TrackerConfig>(() => {
    const saved = localStorage.getItem("grindstreaks_trackers_config_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        githubUsername: parsed.githubUsername || "",
        leetcodeUsername: parsed.leetcodeUsername || "",
        youtubePlaylistUrl: parsed.youtubePlaylistUrl || "",
        gfgUsername: parsed.gfgUsername || "",
        wakatimeUsername: parsed.wakatimeUsername || "",
        togglApiKey: parsed.togglApiKey || ""
      };
    }
    return {
      githubUsername: "",
      leetcodeUsername: "",
      youtubePlaylistUrl: "",
      gfgUsername: "",
      wakatimeUsername: "",
      togglApiKey: ""
    };
  });

  const [isSyncing, setIsSyncing] = React.useState(false);
  const [isEditingConfig, setIsEditingConfig] = React.useState(false);
  const [syncLogs, setSyncLogs] = React.useState<string[]>([]);
  const [activeSyncStep, setActiveSyncStep] = React.useState<string>("");
  const [lastSyncResult, setLastSyncResult] = React.useState<any>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // Sync to local storage
  const saveConfig = (newConfig: TrackerConfig) => {
    setConfig(newConfig);
    localStorage.setItem("grindstreaks_trackers_config_v1", JSON.stringify(newConfig));
  };

  const handleInputChange = (field: keyof TrackerConfig, value: string) => {
    const updated = { ...config, [field]: value };
    saveConfig(updated);
  };

  // Run the automated sync
  const handleSync = async () => {
    if (!config.githubUsername && !config.leetcodeUsername && !config.youtubePlaylistUrl && !config.gfgUsername && !config.wakatimeUsername && !config.togglApiKey) {
      setErrorMsg("Please configure at least one tracking profile username, link, or API token first.");
      setIsEditingConfig(true);
      return;
    }

    setErrorMsg(null);
    setIsSyncing(true);
    setSyncLogs([]);
    setLastSyncResult(null);

    const steps = [
      "Establishing connection to backend API sync gateway...",
      "Resolving proxy requests for third-party endpoints...",
      "Splicing public activity events & commit history...",
      "Pulling WakaTime statistics & editor sessions...",
      "Fetching Toggl / RescueTime active workspace timer status...",
      "Analyzing user progression logs...",
      "Updating today's schedule with automated logs..."
    ];

    // Show beautiful animated logs step by step
    for (let i = 0; i < steps.length - 1; i++) {
      setActiveSyncStep(steps[i]);
      setSyncLogs(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 700));
    }

    try {
      // Call the express backend sync endpoint
      const response = await fetch("/api/tracker/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        throw new Error("Tracker sync gateway responded with error status");
      }

      const data = await response.json();
      setLastSyncResult(data.results);

      // Final step: inject today's accomplishments as real completed tasks!
      setActiveSyncStep(steps[steps.length - 1]);
      setSyncLogs(prev => [...prev, steps[steps.length - 1]]);
      await new Promise(resolve => setTimeout(resolve, 600));

      let syncSummaryText = "Auto-Track complete: ";
      const syncedItems: string[] = [];

      // 1. GitHub Task Sync
      if (data.results.github && data.results.github.status === "success" && data.results.github.count > 0) {
        const count = data.results.github.count;
        addDynamicTask(`GitHub: Pushed ${count} public commit(s) [Automated Track]`, "Web", false);
        syncedItems.push("GitHub Commits");
      }

      // 2. LeetCode Task Sync
      if (data.results.leetcode && data.results.leetcode.status === "success" && data.results.leetcode.count > 0) {
        const count = data.results.leetcode.count;
        addDynamicTask(`LeetCode: Solved ${count} DSA problem(s) [Automated Track]`, "DSA", false);
        syncedItems.push("LeetCode Progress");
      }

      // 3. YouTube Playlist Sync
      if (data.results.youtube && data.results.youtube.status === "success") {
        addDynamicTask(`YouTube Playlist: Logged watchtime & lessons [Automated Track]`, "YouTube", false);
        syncedItems.push("YouTube Watchtime");
      }

      // 4. GeeksforGeeks Sync
      if (data.results.gfg && data.results.gfg.status === "success" && data.results.gfg.count > 0) {
        const count = data.results.gfg.count;
        addDynamicTask(`GeeksforGeeks: Solved ${count} problem(s) [Automated Track]`, "DSA", false);
        syncedItems.push("GeeksforGeeks Challenges");
      }

      // 5. WakaTime Sync
      if (data.results.wakatime && data.results.wakatime.status === "success" && data.results.wakatime.codingMinutes > 0) {
        const mins = data.results.wakatime.codingMinutes;
        addDynamicTask(`WakaTime: Logged ${mins} minutes of active coding/refactoring [Automated Track]`, "Web", false);
        syncedItems.push("WakaTime IDE Logs");
      }

      // 6. Toggl / RescueTime Sync
      if (data.results.toggl && data.results.toggl.status === "success" && data.results.toggl.focusedMinutes > 0) {
        const mins = data.results.toggl.focusedMinutes;
        const hrStr = (mins / 60).toFixed(1);
        addDynamicTask(`Toggl/RescueTime: Tracked ${hrStr} hours of high focus work [Automated Track]`, "Other", false);
        syncedItems.push("Toggl Screen Time");
      }

      if (syncedItems.length > 0) {
        syncSummaryText += `Synced ${syncedItems.join(", ")} successfully into today's timetable list!`;
      } else {
        syncSummaryText += "Profiles checked, no new activity found today.";
      }

      if (onSyncCompleted) {
        onSyncCompleted(syncSummaryText);
      }

    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to synchronize. Please check server availability or internet access.");
    } finally {
      setIsSyncing(false);
      setActiveSyncStep("");
    }
  };

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-950/40 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">
            Zero-Input Daily Tracking
          </span>
        </div>
        <button
          onClick={() => setIsEditingConfig(!isEditingConfig)}
          className="p-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-300 border border-zinc-250 dark:border-zinc-750 rounded-lg text-[11px] font-bold cursor-pointer flex items-center gap-1"
        >
          <Settings className="w-3.5 h-3.5" />
          {isEditingConfig ? "Close Setup" : "Setup Links"}
        </button>
      </div>

      {isEditingConfig ? (
        <div className="space-y-4 bg-zinc-50/40 dark:bg-zinc-950/20 p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 overflow-y-auto max-h-[300px]">
          <div className="flex gap-2 items-start text-xs text-gray-500 dark:text-zinc-400">
            <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Paste your profile links, usernames, or API tokens below. Our background proxy automatically synchronizes daily commits, coding sessions, problem counts, and screen focus time directly into your schedule!
            </p>
          </div>

          <div className="space-y-3.5">
            {/* GitHub Setup */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-zinc-800 dark:text-white" />
                GitHub Username or Profile Link
              </label>
              <input
                type="text"
                placeholder="e.g. git_coder or github.com/your_username"
                value={config.githubUsername}
                onChange={(e) => handleInputChange("githubUsername", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#4285F4] dark:text-white"
              />
            </div>

            {/* LeetCode Setup */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                LeetCode Username or Profile Link
              </label>
              <input
                type="text"
                placeholder="e.g. leet_dev or leetcode.com/your_username"
                value={config.leetcodeUsername}
                onChange={(e) => handleInputChange("leetcodeUsername", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#4285F4] dark:text-white"
              />
            </div>

            {/* WakaTime Setup */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                WakaTime Username / Embed Link
              </label>
              <input
                type="text"
                placeholder="e.g. waka_coder or wakatime.com/@your_username"
                value={config.wakatimeUsername || ""}
                onChange={(e) => handleInputChange("wakatimeUsername", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#4285F4] dark:text-white"
              />
            </div>

            {/* Toggl / RescueTime Setup */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <Hourglass className="w-3.5 h-3.5 text-indigo-500" />
                Toggl Api Key or RescueTime Profile Link
              </label>
              <input
                type="password"
                placeholder="Paste API Token / Account Link"
                value={config.togglApiKey || ""}
                onChange={(e) => handleInputChange("togglApiKey", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#4285F4] dark:text-white"
              />
            </div>

            {/* YouTube Playlist Setup */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                YouTube Playlist Link / Course URL
              </label>
              <input
                type="text"
                placeholder="e.g. youtube.com/playlist?list=PL_..."
                value={config.youtubePlaylistUrl}
                onChange={(e) => handleInputChange("youtubePlaylistUrl", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#4285F4] dark:text-white"
              />
            </div>

            {/* GeeksforGeeks Setup */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                GeeksforGeeks (GFG) Username or Link
              </label>
              <input
                type="text"
                placeholder="e.g. gfg_coder or auth.geeksforgeeks.org/user/your_username"
                value={config.gfgUsername}
                onChange={(e) => handleInputChange("gfgUsername", e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-[#4285F4] dark:text-white"
              />
            </div>
          </div>

          <button
            onClick={() => setIsEditingConfig(false)}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl border-none cursor-pointer mt-2"
          >
            Save Tracking Profiles
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-between min-h-0 space-y-4">
          {/* Main Panel */}
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {errorMsg && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-xl text-xs flex gap-2 items-center">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Platform Status Quickgrid */}
            <div className="grid grid-cols-2 gap-2">
              {/* GitHub Card */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                config.githubUsername 
                  ? "bg-zinc-50/55 dark:bg-zinc-950/30 border-zinc-250 dark:border-zinc-850" 
                  : "bg-zinc-50/20 dark:bg-zinc-950/10 border-dashed border-zinc-200 dark:border-zinc-900 opacity-60"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">GitHub</span>
                  <Github className="w-4 h-4 text-zinc-800 dark:text-white" />
                </div>
                <div className="text-[11px] truncate font-medium text-gray-700 dark:text-zinc-300">
                  {config.githubUsername ? config.githubUsername.replace(/^https?:\/\/github\.com\//, "") : "Not Linked"}
                </div>
              </div>

              {/* LeetCode Card */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                config.leetcodeUsername 
                  ? "bg-amber-500/[0.04] border-amber-500/20" 
                  : "bg-zinc-50/20 dark:bg-zinc-950/10 border-dashed border-zinc-200 dark:border-zinc-900 opacity-60"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-450 uppercase tracking-wider">LeetCode</span>
                  <Code2 className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-[11px] truncate font-medium text-gray-700 dark:text-zinc-300">
                  {config.leetcodeUsername ? config.leetcodeUsername.replace(/^https?:\/\/leetcode\.com\//, "") : "Not Linked"}
                </div>
              </div>

              {/* WakaTime Card */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                config.wakatimeUsername 
                  ? "bg-blue-500/[0.04] border-blue-500/20" 
                  : "bg-zinc-50/20 dark:bg-zinc-950/10 border-dashed border-zinc-200 dark:border-zinc-900 opacity-60"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">WakaTime</span>
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-[11px] truncate font-medium text-gray-700 dark:text-zinc-300">
                  {config.wakatimeUsername ? config.wakatimeUsername.replace(/^https?:\/\/wakatime\.com\/@/, "") : "Not Linked"}
                </div>
              </div>

              {/* Toggl / RescueTime Card */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                config.togglApiKey 
                  ? "bg-indigo-500/[0.04] border-indigo-500/20" 
                  : "bg-zinc-50/20 dark:bg-zinc-950/10 border-dashed border-zinc-200 dark:border-zinc-900 opacity-60"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Toggl / Rescue</span>
                  <Hourglass className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-[11px] truncate font-medium text-gray-700 dark:text-zinc-300">
                  {config.togglApiKey ? "Linked Securely" : "Not Linked"}
                </div>
              </div>

              {/* YouTube Card */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                config.youtubePlaylistUrl 
                  ? "bg-red-500/[0.04] border-red-500/20" 
                  : "bg-zinc-50/20 dark:bg-zinc-950/10 border-dashed border-zinc-200 dark:border-zinc-900 opacity-60"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">YouTube</span>
                  <Youtube className="w-4 h-4 text-red-500" />
                </div>
                <div className="text-[11px] truncate font-medium text-gray-700 dark:text-zinc-300">
                  {config.youtubePlaylistUrl ? "Playlist Linked" : "Not Linked"}
                </div>
              </div>

              {/* GFG Card */}
              <div className={`p-3 rounded-xl border flex flex-col justify-between h-20 transition-all ${
                config.gfgUsername 
                  ? "bg-emerald-500/[0.04] border-emerald-500/20" 
                  : "bg-zinc-50/20 dark:bg-zinc-950/10 border-dashed border-zinc-200 dark:border-zinc-900 opacity-60"
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">GFG</span>
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-[11px] truncate font-medium text-gray-700 dark:text-zinc-300">
                  {config.gfgUsername ? config.gfgUsername.replace(/^https?:\/\/auth\.geeksforgeeks\.org\/user\//, "") : "Not Linked"}
                </div>
              </div>
            </div>

            {/* Live Sync Status Display */}
            {isSyncing ? (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/30 rounded-2xl border border-zinc-200/50 dark:border-zinc-850 space-y-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-emerald-500 animate-spin" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                    Synchronizing progress...
                  </span>
                </div>
                <div className="space-y-1.5 pl-6 border-l border-zinc-200 dark:border-zinc-800">
                  {syncLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`text-[10px] leading-relaxed transition-all duration-300 ${
                        log === activeSyncStep 
                          ? "text-emerald-600 dark:text-emerald-400 font-bold" 
                          : "text-gray-450 dark:text-zinc-500"
                      }`}
                    >
                      • {log}
                    </div>
                  ))}
                </div>
              </div>
            ) : lastSyncResult ? (
              <div className="p-4 bg-emerald-50/45 dark:bg-emerald-950/10 rounded-2xl border border-emerald-500/15 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />
                  <span>Sync Successful!</span>
                </div>
                <div className="text-[11px] space-y-1.5 pl-6 text-gray-650 dark:text-zinc-400 font-medium">
                  {lastSyncResult.github?.status === "success" && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 dark:text-zinc-200">GitHub:</span>
                      <span>{lastSyncResult.github.message}</span>
                    </div>
                  )}
                  {lastSyncResult.leetcode?.status === "success" && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 dark:text-zinc-200">LeetCode:</span>
                      <span>{lastSyncResult.leetcode.message}</span>
                    </div>
                  )}
                  {lastSyncResult.wakatime?.status === "success" && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 dark:text-zinc-200">WakaTime:</span>
                      <span>{lastSyncResult.wakatime.message}</span>
                    </div>
                  )}
                  {lastSyncResult.toggl?.status === "success" && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 dark:text-zinc-200">Toggl/Rescue:</span>
                      <span>{lastSyncResult.toggl.message}</span>
                    </div>
                  )}
                  {lastSyncResult.youtube?.status === "success" && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 dark:text-zinc-200">YouTube:</span>
                      <span>{lastSyncResult.youtube.message}</span>
                    </div>
                  )}
                  {lastSyncResult.gfg?.status === "success" && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-800 dark:text-zinc-200">GFG:</span>
                      <span>{lastSyncResult.gfg.message}</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-gray-450 italic pl-6 mt-1.5">
                  Tasks automatically injected & finalized inside today's timetable!
                </p>
              </div>
            ) : (
              <div className="p-4 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-2xl border border-zinc-250/50 dark:border-zinc-850/60 text-center py-6 space-y-2">
                <RefreshCw className="w-8 h-8 mx-auto text-gray-300 dark:text-zinc-700" />
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-gray-700 dark:text-zinc-300">No sync run yet today</h5>
                  <p className="text-[10px] text-gray-400 max-w-xs mx-auto">
                    Click "Run Auto Tracker Sync" to parse linked platforms and automatically log today's study activities!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sync Trigger Action */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer border-none shadow-sm transition-all active:scale-[0.99]"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
            RUN AUTO TRACKER SYNC NOW
          </button>
        </div>
      )}
    </div>
  );
};
