import * as React from "react";
import { Card } from "../ui/card";
import { Goal, RoadmapMilestone, ChatMessage, DayRecord } from "../../types";
import { 
  Sparkles, 
  MessageSquare, 
  Map, 
  Target, 
  Send, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  PlusCircle, 
  MinusCircle, 
  Code2, 
  BookOpen, 
  Layers, 
  Github, 
  Youtube, 
  GraduationCap, 
  Compass,
  AlertCircle,
  TrendingUp,
  Award,
  Cpu,
  Play
} from "lucide-react";
import { AutomatedTrackersHub } from "./AutomatedTrackersHub";

// Helpers for Streako mascot expressions and fallback SVGs
const getMascotExpressionForText = (text: string): { name: string; url: string; label: string } => {
  const lowercase = text.toLowerCase();
  
  if (lowercase.includes("congrat") || lowercase.includes("trophy") || lowercase.includes("win") || lowercase.includes("achieve") || lowercase.includes("awesome") || lowercase.includes("star")) {
    return { name: "trophy", url: "/streako_trophy.png", label: "Streako Winner" };
  }
  if (lowercase.includes("celebrat") || lowercase.includes("excited") || lowercase.includes("hooray") || lowercase.includes("woohoo") || lowercase.includes("success") || lowercase.includes("sprint")) {
    return { name: "celebrate", url: "/streako_celebrate.png", label: "Streako Celebrating" };
  }
  if (lowercase.includes("focus") || lowercase.includes("plan") || lowercase.includes("task") || lowercase.includes("milestone") || lowercase.includes("roadmap") || lowercase.includes("todo") || lowercase.includes("sprint")) {
    return { name: "focus", url: "/streako_focus.png", label: "Streako Focused" };
  }
  if (lowercase.includes("code") || lowercase.includes("type") || lowercase.includes("programming") || lowercase.includes("leetcode") || lowercase.includes("github") || lowercase.includes("commit") || lowercase.includes("gfg") || lowercase.includes("tuf")) {
    return { name: "typing", url: "/streako_typing.png", label: "Streako Coding" };
  }
  if (lowercase.includes("think") || lowercase.includes("question") || lowercase.includes("what") || lowercase.includes("how") || lowercase.includes("curious") || lowercase.includes("idea") || lowercase.includes("ask")) {
    return { name: "thinking", url: "/streako_thinking.png", label: "Streako Thinking" };
  }
  if (lowercase.includes("love") || lowercase.includes("heart") || lowercase.includes("care") || lowercase.includes("support") || lowercase.includes("welcome")) {
    return { name: "heart", url: "/streako_heart.png", label: "Streako Love" };
  }
  if (lowercase.includes("phew") || lowercase.includes("relieved") || lowercase.includes("sweat") || lowercase.includes("chill") || lowercase.includes("rest") || lowercase.includes("breath")) {
    return { name: "relieved", url: "/streako_relieved.png", label: "Streako Relieved" };
  }
  if (lowercase.includes("great") || lowercase.includes("good") || lowercase.includes("yes") || lowercase.includes("perfect") || lowercase.includes("thumb") || lowercase.includes("correct") || lowercase.includes("nice")) {
    return { name: "thumbsup", url: "/streako_thumbsup.png", label: "Streako Thumbs Up" };
  }
  if (lowercase.includes("haha") || lowercase.includes("joy") || lowercase.includes("lol") || lowercase.includes("laugh") || lowercase.includes("happy") || lowercase.includes("cheerful")) {
    return { name: "joy", url: "/streako_joy.png", label: "Streako Joy" };
  }
  
  // Default list of expressions to pick deterministically
  const expressions = [
    { name: "joy", url: "/streako_joy.png", label: "Streako Joy" },
    { name: "trophy", url: "/streako_trophy.png", label: "Streako Winner" },
    { name: "typing", url: "/streako_typing.png", label: "Streako Coding" },
    { name: "focus", url: "/streako_focus.png", label: "Streako Focused" },
    { name: "thinking", url: "/streako_thinking.png", label: "Streako Thinking" },
    { name: "heart", url: "/streako_heart.png", label: "Streako Love" },
    { name: "relieved", url: "/streako_relieved.png", label: "Streako Relieved" },
    { name: "celebrate", url: "/streako_celebrate.png", label: "Streako Celebrating" },
    { name: "thumbsup", url: "/streako_thumbsup.png", label: "Streako Thumbs Up" }
  ];
  
  const index = Math.abs(text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % expressions.length;
  return expressions[index];
};

const renderMascotFallbackSVG = (name: string) => {
  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm select-none">
      <defs>
        <radialGradient id="jellyGrad" cx="50%" cy="30%" r="60%" fx="40%" fy="20%">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <linearGradient id="glossGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      <ellipse cx="38" cy="88" rx="8" ry="4" fill="#047857" />
      <ellipse cx="62" cy="88" rx="8" ry="4" fill="#047857" />
      
      <path d="M 36 78 C 36 88, 40 88, 40 88" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 64 78 C 64 88, 60 88, 60 88" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />

      <path 
        d="M 50 15 
           C 25 15, 12 30, 12 55 
           C 12 75, 28 80, 50 80 
           C 72 80, 88 75, 88 55 
           C 88 30, 75 15, 50 15 Z" 
        fill="url(#jellyGrad)" 
      />

      <path 
        d="M 50 20 
           C 32 20, 20 28, 20 45 
           C 22 32, 35 25, 50 25 
           C 65 25, 78 32, 80 45 
           C 80 28, 68 20, 50 20 Z" 
        fill="url(#glossGrad)" 
      />

      {name === "joy" && (
        <>
          <path d="M 28 45 Q 35 38 42 45" stroke="#064E3B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 58 45 Q 65 38 72 45" stroke="#064E3B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 18 52 C 14 52, 12 56, 12 60 C 12 64, 18 64, 18 64 Z" fill="#60A5FA" opacity="0.9" transform="rotate(-15 18 58)" />
          <path d="M 82 52 C 86 52, 88 56, 88 60 C 88 64, 82 64, 82 64 Z" fill="#60A5FA" opacity="0.9" transform="rotate(15 82 58)" />
          <path d="M 38 58 Q 50 72 62 58 Z" fill="#E11D48" stroke="#064E3B" strokeWidth="3" />
        </>
      )}

      {name === "trophy" && (
        <>
          <circle cx="35" cy="45" r="5" fill="#064E3B" />
          <circle cx="65" cy="45" r="5" fill="#064E3B" />
          <circle cx="34" cy="43" r="1.5" fill="white" />
          <circle cx="64" cy="43" r="1.5" fill="white" />
          <path d="M 44 58 Q 50 63 56 58" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 78 30 H 90 V 42 C 90 48, 78 48, 78 42 Z" fill="url(#goldGrad)" />
          <path d="M 84 42 V 52" stroke="url(#goldGrad)" strokeWidth="3" />
          <path d="M 80 52 H 88" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 78 32 Q 72 36 78 40" stroke="url(#goldGrad)" strokeWidth="2" fill="none" />
          <path d="M 90 32 Q 96 36 90 40" stroke="url(#goldGrad)" strokeWidth="2" fill="none" />
        </>
      )}

      {name === "typing" && (
        <>
          <ellipse cx="35" cy="45" rx="5" ry="3" fill="#064E3B" />
          <ellipse cx="65" cy="45" rx="5" ry="3" fill="#064E3B" />
          <path d="M 20 70 H 80 L 75 82 H 25 Z" fill="#60A5FA" opacity="0.8" stroke="#3B82F6" strokeWidth="2" />
          <line x1="30" y1="76" x2="70" y2="76" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3,3" />
          <circle cx="30" cy="68" r="3" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <circle cx="70" cy="68" r="3" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
        </>
      )}

      {name === "focus" && (
        <>
          <path d="M 13 32 Q 50 25 87 32" stroke="#F97316" strokeWidth="6" strokeLinecap="round" fill="none" />
          <text x="50" y="34" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FOCUS</text>
          <path d="M 28 39 L 40 43" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
          <path d="M 72 39 L 60 43" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" />
          <circle cx="35" cy="48" r="4.5" fill="#064E3B" />
          <circle cx="65" cy="48" r="4.5" fill="#064E3B" />
          <path d="M 46 59 Q 50 56 54 59" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === "thinking" && (
        <>
          <ellipse cx="35" cy="44" rx="4" ry="5" fill="#064E3B" />
          <ellipse cx="65" cy="44" rx="4" ry="5" fill="#064E3B" />
          <circle cx="35" cy="41" r="1.5" fill="white" />
          <circle cx="65" cy="41" r="1.5" fill="white" />
          <path d="M 45 58 Q 50 54 55 58" stroke="#064E3B" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="8" r="5" fill="#FBBF24" />
          <path d="M 48 13 H 52 M 49 15 H 51" stroke="#D97706" strokeWidth="1.5" />
          <line x1="50" y1="1" x2="50" y2="2" stroke="#FBBF24" strokeWidth="1.5" />
          <line x1="43" y1="4" x2="45" y2="5" stroke="#FBBF24" strokeWidth="1.5" />
          <line x1="57" y1="4" x2="55" y2="5" stroke="#FBBF24" strokeWidth="1.5" />
        </>
      )}

      {name === "heart" && (
        <>
          <path d="M 30 46 A 3 3 0 0 1 36 46" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 64 46 A 3 3 0 0 1 70 46" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 50 63 C 50 63, 44 57, 44 54 C 44 51, 47 49, 50 52 C 53 49, 56 51, 56 54 C 56 57, 50 63, 50 63 Z" fill="#EC4899" />
          <path d="M 40 56 Q 50 65 60 56" stroke="#047857" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}

      {name === "relieved" && (
        <>
          <path d="M 28 46 Q 35 50 42 46" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 58 46 Q 65 50 72 46" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 45 58 Q 50 63 55 58" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 22 36 C 22 36, 18 42, 20 44 C 22 46, 24 44, 24 44 Z" fill="#3B82F6" />
        </>
      )}

      {name === "celebrate" && (
        <>
          <path d="M 28 42 Q 35 37 42 42" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 58 42 Q 65 37 72 42" stroke="#064E3B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 15 50 Q 5 35 5 25" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 85 50 Q 95 35 95 25" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="58" r="6" fill="#E11D48" stroke="#064E3B" strokeWidth="2.5" />
        </>
      )}

      {name === "thumbsup" && (
        <>
          <circle cx="35" cy="45" r="4.5" fill="#064E3B" />
          <circle cx="65" cy="45" r="4.5" fill="#064E3B" />
          <circle cx="34" cy="43" r="1.5" fill="white" />
          <circle cx="64" cy="43" r="1.5" fill="white" />
          <path d="M 45 56 Q 50 61 55 56" stroke="#064E3B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 80 50 Q 90 40 92 50 C 94 60, 80 60, 80 50" stroke="#047857" strokeWidth="3" fill="#10B981" />
          <line x1="86" y1="42" x2="86" y2="48" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
};

const cleanText = (text: string) => {
  return text.replace(/\*\*?/g, "");
};

const findSuggestedTasks = (text: string) => {
  const lines = text.split("\n");
  const suggestions: { name: string; tag: string; duration?: number }[] = [];
  
  for (const line of lines) {
    // Look for duration matches like (45 mins) or [30 mins] or (15 minutes) or (2x speed, 45 mins)
    const durationMatch = line.match(/[\(\[]\s*(?:[^)]*?)\s*(\d+)\s*(?:min|minute|mins|minutes)\s*[\)\]]/i);
    if (durationMatch) {
      const duration = parseInt(durationMatch[1], 10);
      // Clean up the name of the task
      let name = line.replace(/[\(\[]\s*(?:[^)]*?)\s*\d+\s*(?:min|minute|mins|minutes)\s*[\)\]]/i, "").trim();
      // Remove prefixes like "Session 1:", "Video 1:", "Day 1:", or bullet markers like "- ", "* ", "1. "
      name = name.replace(/^[-*\s\d\.\:]+/, "").trim();
      // Clean up any remaining leading "Session" or "Day" or "Video" phrases to make the task name very clean
      name = name.replace(/^(?:Session|Video|Day)\s*\d+[\s\-\:]*/i, "").trim();

      // Determine a smart generalized tag from name
      let tag = "Other";
      const lowerName = name.toLowerCase();
      if (lowerName.includes("leetcode") || lowerName.includes("dsa") || lowerName.includes("problem") || lowerName.includes("array") || lowerName.includes("string") || lowerName.includes("algorithm")) {
        tag = "DSA";
      } else if (lowerName.includes("github") || lowerName.includes("commit") || lowerName.includes("project") || lowerName.includes("web") || lowerName.includes("css") || lowerName.includes("html") || lowerName.includes("react")) {
        tag = "Web";
      } else if (lowerName.includes("video") || lowerName.includes("playlist") || lowerName.includes("youtube") || lowerName.includes("tutorial") || lowerName.includes("kunal") || lowerName.includes("oop") || lowerName.includes("watch")) {
        tag = "YouTube";
      } else if (lowerName.includes("cat") || lowerName.includes("quant") || lowerName.includes("dilr") || lowerName.includes("verbal")) {
        tag = "CAT";
      }

      if (name.length > 3 && name.length < 80) {
        suggestions.push({ name, tag, duration });
      }
    }
  }
  // Remove duplicates
  return suggestions.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
};

interface AICoachChatboxProps {
  todayRecord: DayRecord;
  addDynamicTask: (name: string, tag: string, startImmediately?: boolean) => void;
}

const STORAGE_KEYS = {
  GOALS: "grindstreaks_goals_v1",
  ROADMAP: "grindstreaks_roadmap_v1",
  CHAT: "grindstreaks_chat_history_v1",
};

export const AICoachChatbox: React.FC<AICoachChatboxProps> = ({ todayRecord, addDynamicTask }) => {
  const [activeTab, setActiveTab] = React.useState<"chat" | "roadmap" | "goals" | "trackers">("chat");
  
  // States loaded from localStorage
  const [goals, setGoals] = React.useState<Goal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    return saved ? JSON.parse(saved) : [];
  });

  const [roadmap, setRoadmap] = React.useState<RoadmapMilestone[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP);
    return saved ? JSON.parse(saved) : [];
  });

  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHAT);
    const newWelcomeText = "Hello! I am Streako, your strict, data-driven AI mascot and career coach. Since this is your first time here, let's set up your custom learning goals and deadlines together! What are you studying or preparing for? Tell me about your target platforms (like LeetCode, GitHub, or YouTube) and any target deadlines, and I'll extract your goals and generate a personalized interactive roadmap for you.";
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatMessage[];
        // Migrate old welcome message if found
        const updated = parsed.map((msg) => {
          if (msg.id === "welcome-msg") {
            return { ...msg, text: newWelcomeText };
          }
          return msg;
        });
        return updated;
      } catch (e) {
        console.error("Failed to parse saved chat, resetting", e);
      }
    }
    return [
      {
        id: "welcome-msg",
        sender: "coach",
        text: newWelcomeText,
        timestamp: Date.now()
      }
    ];
  });

  // UI States
  const [inputText, setInputText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAddGoalForm, setShowAddGoalForm] = React.useState(false);
  
  // New Goal Form States
  const [newGoalTitle, setNewGoalTitle] = React.useState("");
  const [newGoalPlatform, setNewGoalPlatform] = React.useState<Goal["platform"]>("LeetCode");
  const [newGoalTarget, setNewGoalTarget] = React.useState(10);
  const [newGoalUnit, setNewGoalUnit] = React.useState("problems");

  // Scroll ref for chat
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isLoading]);

  // Sync state to localStorage
  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
  };

  const saveRoadmap = (updatedRoadmap: RoadmapMilestone[]) => {
    setRoadmap(updatedRoadmap);
    localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(updatedRoadmap));
  };

  const saveChatHistory = (updatedChat: ChatMessage[]) => {
    setChatHistory(updatedChat);
    localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(updatedChat));
  };

  // Helper to map platform names to icons
  const getPlatformIcon = (platform: Goal["platform"]) => {
    switch (platform) {
      case "LeetCode":
        return <Code2 className="w-4 h-4 text-amber-500" />;
      case "GFG":
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case "TUF A2Z Sheet":
        return <Layers className="w-4 h-4 text-indigo-500" />;
      case "GitHub":
        return <Github className="w-4 h-4 text-zinc-800 dark:text-zinc-200" />;
      case "YouTube":
        return <Youtube className="w-4 h-4 text-red-500" />;
      case "Udemy":
      case "Coursera":
        return <GraduationCap className="w-4 h-4 text-purple-500" />;
      default:
        return <Target className="w-4 h-4 text-[#4285F4]" />;
    }
  };

  // Helper for platform colors
  const getPlatformBadgeStyles = (platform: Goal["platform"]) => {
    switch (platform) {
      case "LeetCode":
        return "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-200/50";
      case "GFG":
        return "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50";
      case "TUF A2Z Sheet":
        return "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300 border-indigo-200/50";
      case "GitHub":
        return "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200";
      case "YouTube":
        return "bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border-red-200/50";
      case "Udemy":
      case "Coursera":
        return "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200/50";
      default:
        return "bg-sky-50 dark:bg-sky-950/20 text-sky-700 dark:text-sky-300 border-sky-200/50";
    }
  };

  // Add a manual goal
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const newGoal: Goal = {
      id: "g_" + Date.now(),
      title: newGoalTitle,
      platform: newGoalPlatform,
      targetValue: newGoalTarget,
      currentValue: 0,
      metricUnit: newGoalUnit,
      status: "active",
      createdAt: Date.now()
    };

    const updated = [newGoal, ...goals];
    saveGoals(updated);

    // Add milestone automatically to roadmap as well if none
    const newMilestone: RoadmapMilestone = {
      id: "rm_" + Date.now(),
      title: `Kickstart: ${newGoalPlatform}`,
      description: `Complete initial setup and first milestone for: ${newGoalTitle}`,
      status: "pending",
      associatedPlatform: newGoalPlatform,
      order: roadmap.length + 1
    };
    saveRoadmap([...roadmap, newMilestone]);

    // Reset Form
    setNewGoalTitle("");
    setNewGoalTarget(10);
    setShowAddGoalForm(false);
  };

  // Delete a goal
  const handleDeleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    saveGoals(updated);
  };

  // Quick increment/decrement of progress
  const handleUpdateProgress = (id: string, amount: number) => {
    const updated = goals.map(g => {
      if (g.id === id) {
        const newValue = Math.max(0, (g.currentValue || 0) + amount);
        const status = g.targetValue && newValue >= g.targetValue ? "completed" as const : "active" as const;
        return {
          ...g,
          currentValue: newValue,
          status
        };
      }
      return g;
    });
    saveGoals(updated);
  };

  // Toggle milestone completion
  const handleToggleMilestone = (id: string) => {
    const updated = roadmap.map(rm => {
      if (rm.id === id) {
        return {
          ...rm,
          status: rm.status === "completed" ? "pending" as const : "completed" as const
        };
      }
      return rm;
    });
    saveRoadmap(updated);
  };

  // Chat message submission to backend API
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsgText = inputText.trim();
    setInputText("");

    const userMessage: ChatMessage = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: userMsgText,
      timestamp: Date.now()
    };

    const updatedHistory = [...chatHistory, userMessage];
    saveChatHistory(updatedHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: userMsgText,
          goals,
          roadmap,
          todayRecord
        })
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI Coach");
      }

      const data = await response.json();

      const coachMessage: ChatMessage = {
        id: "msg_" + Date.now() + "_coach",
        sender: "coach",
        text: data.reply || "I've analyzed your goal. Let's work towards achieving it systematically!",
        timestamp: Date.now()
      };

      saveChatHistory([...updatedHistory, coachMessage]);

      if (data.extractedGoals) {
        saveGoals(data.extractedGoals);
      }
      if (data.updatedRoadmap) {
        saveRoadmap(data.updatedRoadmap);
      }
    } catch (error) {
      console.error("AI Coach connection error:", error);
      const errMsg: ChatMessage = {
        id: "msg_err_" + Date.now(),
        sender: "coach",
        text: "I encountered an error connecting to my server. Please check your internet connection or ensure your GEMINI_API_KEY is configured. I can still help you log your goals in the 'Platform Goals' tab!",
        timestamp: Date.now()
      };
      saveChatHistory([...updatedHistory, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEYS.CHAT);
    setChatHistory([
      {
        id: "welcome-msg",
        sender: "coach",
        text: "Hello! I am Streako, your friendly mascot coach. Let's design your software engineering success. Tell me what your goals are—for example, 'I want to solve 50 LeetCode problems, watch 10 YouTube System Design tutorials, and commit daily to GitHub.' I will automatically extract your goals and generate a step-by-step roadmap!",
        timestamp: Date.now()
      }
    ]);
  };

  // Reset entire goal/roadmap state
  const handleResetCoach = () => {
    if (window.confirm("Are you sure you want to delete all goals, roadmap, and chat history?")) {
      saveGoals([]);
      saveRoadmap([]);
      localStorage.removeItem(STORAGE_KEYS.CHAT);
      setChatHistory([
        {
          id: "welcome-msg",
          sender: "coach",
          text: "Hello! I'm Streako, your AI coach. Tell me your goals (e.g. 'Solve 50 LeetCode, watch 10 YT system design tutorials, and commit daily'). I will extract them and generate a custom roadmap!",
          timestamp: Date.now()
        }
      ]);
    }
  };

  // Set unit based on selected platform
  React.useEffect(() => {
    if (newGoalPlatform === "LeetCode" || newGoalPlatform === "GFG") {
      setNewGoalUnit("problems");
    } else if (newGoalPlatform === "GitHub") {
      setNewGoalUnit("commits");
    } else if (newGoalPlatform === "YouTube" || newGoalPlatform === "Udemy" || newGoalPlatform === "Coursera") {
      setNewGoalUnit("videos");
    } else if (newGoalPlatform === "TUF A2Z Sheet") {
      setNewGoalUnit("percent");
    } else {
      setNewGoalUnit("units");
    }
  }, [newGoalPlatform]);

  return (
    <Card className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden flex flex-col h-[550px]">
      {/* 1. Header with custom tabs */}
      <div className="p-5 bg-zinc-50 dark:bg-zinc-950/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-gray-800 dark:text-zinc-100 text-sm md:text-base">
              Smart Streako
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-zinc-400 leading-tight">
              Your AI Coach, and Roadmap tracker
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "chat"
                ? "bg-white dark:bg-zinc-700 text-[#3C4043] dark:text-zinc-100 shadow-sm"
                : "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Streako</span>
          </button>
          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "roadmap"
                ? "bg-white dark:bg-zinc-700 text-[#3C4043] dark:text-zinc-100 shadow-sm"
                : "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Roadmap</span>
            {roadmap.length > 0 && (
              <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {roadmap.filter(r => r.status === "completed").length}/{roadmap.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("goals")}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "goals"
                ? "bg-white dark:bg-zinc-700 text-[#3C4043] dark:text-zinc-100 shadow-sm"
                : "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Goals</span>
            {goals.length > 0 && (
              <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {goals.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("trackers")}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "trackers"
                ? "bg-white dark:bg-zinc-700 text-[#3C4043] dark:text-zinc-100 shadow-sm"
                : "text-gray-500 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>Auto Tracker</span>
          </button>
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0 bg-white dark:bg-zinc-900">
        
        {/* --- CHAT TAB --- */}
        {activeTab === "chat" && (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender !== "user" && (
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/15 flex items-center justify-center p-0.5 relative overflow-hidden group">
                      <img
                        src={getMascotExpressionForText(msg.text).url}
                        alt={getMascotExpressionForText(msg.text).label}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="hidden absolute inset-0 items-center justify-center bg-emerald-500/5">
                        {renderMascotFallbackSVG(getMascotExpressionForText(msg.text).name)}
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#4285F4] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200"
                    }`}
                  >
                    <div className="font-extrabold text-[10px] uppercase opacity-75 mb-1 tracking-wider">
                      {msg.sender === "user" ? "You" : "Streako"}
                    </div>
                    <div className="whitespace-pre-line font-sans max-w-none text-xs">
                      {cleanText(msg.text)}
                    </div>
                    {msg.sender !== "user" && findSuggestedTasks(msg.text).length > 0 && (
                      <div className="mt-3 p-3 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/15 rounded-xl space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                          <Sparkles className="w-3 h-3 text-emerald-600 animate-pulse" />
                          <span>Streako's Session Tracker</span>
                        </div>
                        <p className="text-[9px] text-gray-500 dark:text-zinc-400">
                          Would you like to start this focused study block now? Click below to launch the live timer:
                        </p>
                        <div className="space-y-1.5">
                          {findSuggestedTasks(msg.text).map((s, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-200/40 dark:border-zinc-800/60 shadow-sm gap-2">
                              <div className="text-left">
                                <div className="text-[10px] font-bold text-gray-800 dark:text-zinc-200 leading-tight">
                                  {s.name}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[8px] font-black px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 rounded uppercase">
                                    {s.tag}
                                  </span>
                                  {s.duration && (
                                    <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400">
                                      ⏱️ {s.duration} mins
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  addDynamicTask(s.name, s.tag, true);
                                  window.dispatchEvent(new CustomEvent("switch-view", { detail: "dashboard" }));
                                }}
                                className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[10px] font-black rounded-md transition-all border-none cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>YES, START TIMER</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-[9px] opacity-60 text-right mt-1.5">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 items-start justify-start">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center p-0.5 relative overflow-hidden">
                    <img
                      src="/streako_thinking.png"
                      alt="Streako Thinking"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-contain animate-pulse"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    <div className="hidden absolute inset-0 items-center justify-center bg-emerald-500/5">
                      {renderMascotFallbackSVG("thinking")}
                    </div>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-4 text-xs flex items-center gap-3">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                    <span className="text-gray-500 dark:text-zinc-400 font-medium">Streako is calculating roadmap updates...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 pt-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask coach to set a roadmap, add/update goals, or track progress..."
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 dark:disabled:bg-zinc-800 text-white rounded-xl transition-all border-none cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* --- ROADMAP TAB --- */}
        {activeTab === "roadmap" && (
          <div className="space-y-4">
            {roadmap.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 space-y-3">
                <Compass className="w-10 h-10 text-gray-400 dark:text-zinc-600 animate-pulse" />
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-gray-700 dark:text-zinc-300">Your Study Roadmap is Empty</h5>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400 max-w-xs">
                    Talk to Streako in the first tab to state your learning targets. Streako will design a personalized curriculum for you!
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("chat")}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[11px] font-bold border-none transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat to Generate Roadmap
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-emerald-500/5 p-4 rounded-2xl mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                      Overall Roadmap Completion:
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 font-mono">
                    {Math.round((roadmap.filter(r => r.status === "completed").length / roadmap.length) * 100)}%
                  </span>
                </div>

                <div className="relative border-l-2 border-gray-100 dark:border-zinc-800 pl-4 ml-3 space-y-5">
                  {roadmap.sort((a, b) => a.order - b.order).map((milestone) => (
                    <div key={milestone.id} className="relative group">
                      {/* Interactive completion node icon */}
                      <button
                        onClick={() => handleToggleMilestone(milestone.id)}
                        className="absolute -left-[25px] top-0.5 bg-white dark:bg-zinc-900 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 p-0 border-none"
                      >
                        {milestone.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300 dark:text-zinc-600 hover:text-emerald-500" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className={`text-xs font-bold leading-normal transition-all ${
                            milestone.status === "completed"
                              ? "text-gray-400 line-through"
                              : "text-gray-800 dark:text-zinc-200"
                          }`}>
                            Step {milestone.order}: {milestone.title}
                          </h5>
                          {milestone.associatedPlatform && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-gray-100 dark:bg-zinc-800 rounded text-gray-600 dark:text-zinc-400">
                              {milestone.associatedPlatform}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] leading-relaxed ${
                          milestone.status === "completed"
                            ? "text-gray-300 dark:text-zinc-600"
                            : "text-gray-500 dark:text-zinc-400"
                        }`}>
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- GOALS TAB --- */}
        {activeTab === "goals" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                Current Targets ({goals.length})
              </span>
              <button
                onClick={() => setShowAddGoalForm(!showAddGoalForm)}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-[#3C4043] dark:text-zinc-200 rounded-lg text-[11px] font-bold transition-all border-none cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddGoalForm ? "Close Form" : "Add Goal"}</span>
              </button>
            </div>

            {/* Quick Add Goal Form */}
            {showAddGoalForm && (
              <form onSubmit={handleAddGoal} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 space-y-3">
                <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-200">
                  Setup New Platform Target
                </h5>
                
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase">Goal/Target Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Solve Tree Interview Questions"
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-900 text-xs text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase">Platform</label>
                      <select
                        value={newGoalPlatform}
                        onChange={(e) => setNewGoalPlatform(e.target.value as Goal["platform"])}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-900 text-xs text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border-none"
                      >
                        <option value="LeetCode">LeetCode</option>
                        <option value="GFG">GeeksforGeeks</option>
                        <option value="TUF A2Z Sheet">TUF A2Z Sheet</option>
                        <option value="GitHub">GitHub</option>
                        <option value="YouTube">YouTube Watch</option>
                        <option value="Udemy">Udemy</option>
                        <option value="Coursera">Coursera</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase">Target Amount</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={newGoalTarget}
                        onChange={(e) => setNewGoalTarget(parseInt(e.target.value) || 1)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-zinc-900 text-xs text-gray-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 border-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddGoalForm(false)}
                    className="px-3 py-1 bg-transparent hover:bg-black/5 rounded-lg text-[11px] font-bold text-gray-500 border-none cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-all border-none cursor-pointer"
                  >
                    Save Goal
                  </button>
                </div>
              </form>
            )}

            {goals.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950/40 space-y-3">
                <Target className="w-10 h-10 text-gray-400 dark:text-zinc-600 animate-pulse" />
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-gray-700 dark:text-zinc-300">No Active Goals</h5>
                  <p className="text-[11px] text-gray-500 dark:text-zinc-400 max-w-xs">
                    You haven't added any goals or connected platforms yet. Set targets manually or ask Streako to initialize your stats!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5">
                {goals.map((goal) => {
                  const pct = Math.min(100, Math.round(((goal.currentValue || 0) / (goal.targetValue || 1)) * 100));
                  return (
                    <div 
                      key={goal.id} 
                      className={`p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                        goal.status === "completed" 
                          ? "bg-emerald-500/[0.03] dark:bg-emerald-950/10" 
                          : "bg-zinc-50 dark:bg-zinc-950/30"
                      }`}
                    >
                      {/* Left vertical status highlight */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        goal.status === "completed" ? "bg-emerald-500" : "bg-amber-400"
                      }`} />

                      <div className="space-y-3">
                        <div className="flex justify-between items-start pl-1">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              {getPlatformIcon(goal.platform)}
                              <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md border ${getPlatformBadgeStyles(goal.platform)}`}>
                                {goal.platform}
                              </span>
                              {goal.status === "completed" && (
                                <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                                  Completed!
                                </span>
                              )}
                            </div>
                            <h5 className={`text-xs font-bold leading-normal mt-1.5 ${
                              goal.status === "completed" ? "text-gray-400 line-through" : "text-gray-800 dark:text-zinc-100"
                            }`}>
                              {goal.title}
                            </h5>
                          </div>

                          <button
                            onClick={() => handleDeleteGoal(goal.id)}
                            className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                            title="Delete goal"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Progress Bar & Numeric Indicator */}
                        <div className="space-y-1.5 pl-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-500 dark:text-zinc-400 font-medium">
                              Logged: <span className="font-extrabold text-gray-700 dark:text-zinc-200 font-mono">{goal.currentValue || 0}</span> / {goal.targetValue} {goal.metricUnit}
                            </span>
                            <span className="font-extrabold text-gray-800 dark:text-zinc-200 font-mono">{pct}%</span>
                          </div>
                          
                          <div className="w-full bg-gray-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                goal.status === "completed" ? "bg-emerald-500" : "bg-amber-500"
                              }`} 
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>

                        {/* Interactive Incrementors */}
                        <div className="flex gap-2 justify-between items-center pt-0.5">
                          {/* Quick Start Focus Timer for Goal */}
                          <button
                            onClick={() => addDynamicTask(goal.title, goal.platform, true)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1"
                            title="Start live focus timer for this goal"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Start Timer</span>
                          </button>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleUpdateProgress(goal.id, -1)}
                              disabled={!goal.currentValue}
                              className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-gray-500 dark:text-zinc-300 border-none transition-all cursor-pointer"
                              title="Decrement progress"
                            >
                              <MinusCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateProgress(goal.id, 1)}
                              disabled={goal.status === "completed"}
                              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-zinc-800/40 text-white rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-1"
                              title="Increment progress"
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>Log Progress</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* --- AUTOMATED TRACKERS TAB --- */}
        {activeTab === "trackers" && (
          <div className="h-full flex flex-col">
            <AutomatedTrackersHub 
              addDynamicTask={addDynamicTask}
              onSyncCompleted={(msg) => {
                // Add a coach message about the synchronization result!
                const coachMsg: ChatMessage = {
                  id: "msg_sync_" + Date.now(),
                  sender: "coach",
                  text: `📡 **Zero-Input Sync Completed!**\n\n${msg}\n\nI've integrated these efforts directly into your active dashboard. Streako says: stellar work keeping up with your daily discipline!`,
                  timestamp: Date.now()
                };
                saveChatHistory([...chatHistory, coachMsg]);
              }}
            />
          </div>
        )}

      </div>

      {/* 3. Footer Control panel */}
      <div className="p-3 border-t border-[#E0E3E7] dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 flex justify-between items-center text-[10px] text-gray-400">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Keep your learning grind alive!</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearHistory}
            className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/5 rounded text-[10px] font-medium transition-colors border-none bg-transparent cursor-pointer text-gray-500 hover:text-gray-700"
          >
            Clear Chat
          </button>
          <button
            onClick={handleResetCoach}
            className="px-2 py-1 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-gray-400 hover:text-rose-600 rounded text-[10px] font-medium transition-colors border-none bg-transparent cursor-pointer"
          >
            Reset All
          </button>
        </div>
      </div>
    </Card>
  );
};
