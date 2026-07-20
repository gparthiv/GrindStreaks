const fs = require('fs');
let code = fs.readFileSync('src/hooks/useTaskEngine.ts', 'utf8');

const target = `  // Morning Let's Start the Day Flow
  const startDay = useCallback((firstTaskName: string, firstTaskTag: string, targetCount?: number, dailyGoalsText?: string) => {
    const now = Date.now();
    const newId = \`task-\${now}\`;
    
    const firstTask: Task = {
      id: newId,
      name: firstTaskName.trim() || "First Task",
      category: firstTaskTag.trim() || "Study",
      type: 'Custom',
      status: 'running',
      duration: 0,
      lastStarted: now,
      createdAt: now,
      updatedAt: now,
    };

    saveTag(firstTaskTag);

    const updatedTasks = [firstTask];
    const record = { 
      ...todayRecord, 
      tasks: updatedTasks, 
      isDayStarted: true,
      isDayEnded: false,
      targetCount: targetCount || 4,
      dailyGoalsText: dailyGoalsText || ""
    };
    
    const savedRecord = storage.saveTodayRecord(record);
    setTodayRecord(savedRecord);
    setActiveTaskId(newId);
    
    // Refresh history
    setHistory(storage.loadHistory());
  }, [todayRecord, saveTag]);`;

const replacement = `  // Morning Let's Start the Day Flow
  const startDay = useCallback((firstTaskName: string, firstTaskTag: string, targetCount?: number, dailyGoalsText?: string) => {
    const now = Date.now();
    
    // Always create the first task (idle, not running)
    const firstTask: Task = {
      id: \`task-\${now}-0\`,
      name: firstTaskName.trim() || "First Task",
      category: firstTaskTag.trim() || "Study",
      type: 'Custom',
      status: 'idle',
      duration: 0,
      lastStarted: null,
      createdAt: now,
      updatedAt: now,
    };

    saveTag(firstTaskTag);
    const updatedTasks: Task[] = [firstTask];

    // Automate scheduling: Auto-create tasks from daily goals text if it exists
    if (dailyGoalsText) {
      // Split by newline or comma, ignoring empty or small items
      const rawGoals = dailyGoalsText.split(/[\\n,]+/).map(g => g.trim().replace(/^[-*•]\\s*/, '')).filter(g => g.length > 2);
      
      rawGoals.forEach((goal, idx) => {
        // Only add if it's not exactly the first task name
        if (goal.toLowerCase() !== firstTaskName.trim().toLowerCase()) {
          updatedTasks.push({
            id: \`task-\${now}-\${idx + 1}\`,
            name: goal.substring(0, 50), // Cap length
            category: firstTaskTag.trim() || "Study", // Inherit tag by default or guess later
            type: 'Custom',
            status: 'idle',
            duration: 0,
            lastStarted: null,
            createdAt: now,
            updatedAt: now,
          });
        }
      });
    }

    const record = { 
      ...todayRecord, 
      tasks: updatedTasks, 
      isDayStarted: true,
      isDayEnded: false,
      targetCount: targetCount || Math.max(updatedTasks.length, 4), // Auto-set target count
      dailyGoalsText: dailyGoalsText || ""
    };
    
    const savedRecord = storage.saveTodayRecord(record);
    setTodayRecord(savedRecord);
    // Don't set activeTaskId so the timer doesn't start automatically
    setActiveTaskId(null);
    
    // Refresh history
    setHistory(storage.loadHistory());
  }, [todayRecord, saveTag]);`;

if (code.includes(target)) {
  fs.writeFileSync('src/hooks/useTaskEngine.ts', code.replace(target, replacement));
  console.log("Patched successfully");
} else {
  console.log("Target not found!");
}
