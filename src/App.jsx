import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HabitTracker from './components/HabitTracker';
import MoodJournal from './components/MoodJournal';
import GoalsTracker from './components/GoalsTracker';
import FocusTimer from './components/FocusTimer';
import Analytics from './components/Analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');

  // Initial Habits Data
  const initialHabits = [
    { id: 1, name: 'Morning Meditation (10m)', category: 'Mind', streak: 12, completedToday: true, weekly: [true, true, true, true, false, false, false] },
    { id: 2, name: 'Drink 2.5L Water', category: 'Health', streak: 8, completedToday: true, weekly: [true, true, false, true, true, false, false] },
    { id: 3, name: 'Read 20 Pages', category: 'Personal', streak: 5, completedToday: false, weekly: [true, false, true, false, false, false, false] },
    { id: 4, name: '30 Min Fitness / Workout', category: 'Fitness', streak: 14, completedToday: false, weekly: [true, true, true, false, false, false, false] },
  ];

  // Initial Mood Logs
  const initialMoodLogs = [
    { id: 1, rating: 'Joyful', emoji: '😊', score: 5, energy: 8, tags: ['Health', 'Exercise'], note: 'Completed morning run and felt energized!', date: 'Oct 5, 2026', time: '09:30 AM' },
    { id: 2, rating: 'Productive', emoji: '⚡', score: 4, energy: 9, tags: ['Work'], note: 'Finished main React architecture tasks.', date: 'Oct 4, 2026', time: '05:15 PM' },
  ];

  // Initial Goals Data
  const initialGoals = [
    { id: 1, title: 'Master React & Web Architecture', category: 'Career', targetDate: 'Nov 30, 2026', progress: 75 },
    { id: 2, title: 'Run a 10K Marathon', category: 'Health', targetDate: 'Dec 15, 2026', progress: 50 },
    { id: 3, title: 'Build $5,000 Emergency Fund', category: 'Finance', targetDate: 'Jan 31, 2027', progress: 30 },
  ];

  // State with LocalStorage fallbacks
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('lifelens_habits');
    return saved ? JSON.parse(saved) : initialHabits;
  });

  const [moodLogs, setMoodLogs] = useState(() => {
    const saved = localStorage.getItem('lifelens_moods');
    return saved ? JSON.parse(saved) : initialMoodLogs;
  });

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('lifelens_goals');
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const [focusTime, setFocusTime] = useState(() => {
    const saved = localStorage.getItem('lifelens_focustime');
    return saved ? JSON.parse(saved) : 4500; // 75 mins in seconds default
  });

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('lifelens_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('lifelens_moods', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    localStorage.setItem('lifelens_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('lifelens_focustime', JSON.stringify(focusTime));
  }, [focusTime]);

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Habit Operations
  const toggleHabit = (id) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.completedToday;
        return {
          ...h,
          completedToday: nextCompleted,
          streak: nextCompleted ? h.streak + 1 : Math.max(1, h.streak - 1)
        };
      }
      return h;
    }));
  };

  const addHabit = (newHabit) => {
    const item = { ...newHabit, id: Date.now() };
    setHabits([item, ...habits]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  // Mood Operations
  const addMoodLog = (log) => {
    const item = { ...log, id: Date.now() };
    setMoodLogs([item, ...moodLogs]);
  };

  // Goals Operations
  const addGoal = (newGoal) => {
    const item = { ...newGoal, id: Date.now() };
    setGoals([item, ...goals]);
  };

  const updateGoalProgress = (id, progress) => {
    setGoals(goals.map(g => g.id === id ? { ...g, progress } : g));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  // Focus Timer Operations
  const addFocusMinutes = (minutes) => {
    setFocusTime(prev => prev + minutes * 60);
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            habits={habits} 
            toggleHabit={toggleHabit} 
            moodLogs={moodLogs} 
            goals={goals} 
            focusTime={focusTime}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'habits' && (
          <HabitTracker 
            habits={habits} 
            toggleHabit={toggleHabit} 
            addHabit={addHabit} 
            deleteHabit={deleteHabit} 
          />
        )}

        {activeTab === 'mood' && (
          <MoodJournal 
            moodLogs={moodLogs} 
            addMoodLog={addMoodLog} 
          />
        )}

        {activeTab === 'goals' && (
          <GoalsTracker 
            goals={goals} 
            addGoal={addGoal} 
            updateGoalProgress={updateGoalProgress} 
            deleteGoal={deleteGoal} 
          />
        )}

        {activeTab === 'focus' && (
          <FocusTimer 
            addFocusMinutes={addFocusMinutes} 
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics 
            habits={habits} 
            moodLogs={moodLogs} 
            focusTime={focusTime} 
          />
        )}
      </main>
    </div>
  );
}
