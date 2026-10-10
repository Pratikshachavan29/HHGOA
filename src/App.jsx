import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BrainDump from './components/BrainDump';
import SmartPriority from './components/SmartPriority';
import RealityCheck from './components/RealityCheck';
import HabitTracker from './components/HabitTracker';
import MoodJournal from './components/MoodJournal';
import GoalsTracker from './components/GoalsTracker';
import FocusTimer from './components/FocusTimer';
import Analytics from './components/Analytics';
import AuthScreen from './components/AuthScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');

  // Authentication State with Page Refresh Persistence
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('lifelens_is_authenticated') === 'true';
  });

  const [isDemoMode, setIsDemoMode] = useState(() => {
    return localStorage.getItem('lifelens_is_demo_mode') === 'true';
  });

  // Load or initialize registered user profiles
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lifelens_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Current active user ID
  const [currentUserId, setCurrentUserId] = useState(() => {
    return localStorage.getItem('lifelens_active_user_id') || '';
  });

  const activeUser = users.find(u => u.id === currentUserId) || users[0] || {
    id: 'guest',
    name: 'User',
    role: 'Productivity HQ',
    avatarColor: '#ec4899',
    avatarEmoji: '🎓'
  };

  // Demo Sample Data Generator for Demo Mode
  const getDemoHabits = () => [
    { id: 101, name: '[DEMO] Solve 1 Tech Prep Problem', category: 'Prep & Work', streak: 5, completedToday: true, weekly: [true, true, true, false, false, false, false] },
    { id: 102, name: '[DEMO] Review Project Notes & Core Material', category: 'Academics', streak: 3, completedToday: false, weekly: [true, false, true, false, false, false, false] },
    { id: 103, name: '[DEMO] Hydrate & 15m Refreshing Walk', category: 'Self Care', streak: 8, completedToday: true, weekly: [true, true, true, true, false, false, false] }
  ];

  const getDemoGoals = () => [
    { id: 201, title: '[DEMO] Complete Major Capstone Phase 1', category: 'Projects', targetDate: 'Dec 15, 2026', progress: 75 },
    { id: 202, title: '[DEMO] Maintain Top Performance Consistency', category: 'Academics', targetDate: 'Dec 30, 2026', progress: 60 }
  ];

  const getDemoBrainDump = () => [
    { id: 'demo-bd-1', title: '[DEMO] Draft Project Architecture Deck', priority: 'High', estimate: '1 hour', deadline: 'Tomorrow 5 PM', processed: false, createdAt: '10:00 AM' },
    { id: 'demo-bd-2', title: '[DEMO] Review Chapter 4 Core Concepts', priority: 'Medium', estimate: '45 mins', deadline: 'This Friday', processed: false, createdAt: '10:15 AM' }
  ];

  // User-specific states
  const [habits, setHabits] = useState([]);
  const [moodLogs, setMoodLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [focusTime, setFocusTime] = useState(5400);
  const [brainDumpCards, setBrainDumpCards] = useState([]);

  // Login Success Handler (For real registered user)
  const handleLoginSuccess = (account, isDemo = false) => {
    setIsAuthenticated(true);
    setIsDemoMode(isDemo);
    localStorage.setItem('lifelens_is_authenticated', 'true');
    localStorage.setItem('lifelens_is_demo_mode', String(isDemo));
    localStorage.setItem('lifelens_active_account', JSON.stringify(account));

    // Ensure account is in users list
    const exists = users.some(u => u.id === account.id);
    const updatedUsers = exists ? users.map(u => u.id === account.id ? { ...u, ...account } : u) : [...users, account];
    setUsers(updatedUsers);
    localStorage.setItem('lifelens_users', JSON.stringify(updatedUsers));

    setCurrentUserId(account.id);
    localStorage.setItem('lifelens_active_user_id', account.id);
  };

  // Demo Mode Exploration Handler
  const handleExploreDemo = () => {
    const demoAccount = {
      id: 'demo-user-profile',
      name: 'Demo Explorer',
      role: 'Demo Mode (Sample Data)',
      avatarColor: '#ec4899',
      avatarEmoji: '🚀',
      focusAreas: ['Academics', 'Projects'],
      targetHours: 6,
      energyBaseline: 7
    };

    // Save demo data if not already existing
    localStorage.setItem('lifelens_habits_user_demo-user-profile', JSON.stringify(getDemoHabits()));
    localStorage.setItem('lifelens_goals_user_demo-user-profile', JSON.stringify(getDemoGoals()));
    localStorage.setItem('lifelens_braindump_user_demo-user-profile', JSON.stringify(getDemoBrainDump()));

    handleLoginSuccess(demoAccount, true);
  };

  // Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsDemoMode(false);
    localStorage.removeItem('lifelens_is_authenticated');
    localStorage.removeItem('lifelens_is_demo_mode');
    localStorage.removeItem('lifelens_active_account');
    localStorage.removeItem('lifelens_active_user_id');
  };

  // Reload user-specific data when active user changes or auth state changes
  useEffect(() => {
    if (!currentUserId) return;

    const savedHabits = localStorage.getItem(`lifelens_habits_user_${currentUserId}`);
    setHabits(savedHabits ? JSON.parse(savedHabits) : []);

    const savedMoods = localStorage.getItem(`lifelens_moods_user_${currentUserId}`);
    setMoodLogs(savedMoods ? JSON.parse(savedMoods) : []);

    const savedGoals = localStorage.getItem(`lifelens_goals_user_${currentUserId}`);
    setGoals(savedGoals ? JSON.parse(savedGoals) : []);

    const savedFocus = localStorage.getItem(`lifelens_focustime_user_${currentUserId}`);
    setFocusTime(savedFocus ? JSON.parse(savedFocus) : 5400);

    const savedDump = localStorage.getItem(`lifelens_braindump_user_${currentUserId}`);
    setBrainDumpCards(savedDump ? JSON.parse(savedDump) : []);
  }, [currentUserId, isAuthenticated]);

  // Save data per user
  useEffect(() => {
    if (currentUserId && isAuthenticated) {
      localStorage.setItem(`lifelens_habits_user_${currentUserId}`, JSON.stringify(habits));
    }
  }, [habits, currentUserId, isAuthenticated]);

  useEffect(() => {
    if (currentUserId && isAuthenticated) {
      localStorage.setItem(`lifelens_moods_user_${currentUserId}`, JSON.stringify(moodLogs));
    }
  }, [moodLogs, currentUserId, isAuthenticated]);

  useEffect(() => {
    if (currentUserId && isAuthenticated) {
      localStorage.setItem(`lifelens_goals_user_${currentUserId}`, JSON.stringify(goals));
    }
  }, [goals, currentUserId, isAuthenticated]);

  useEffect(() => {
    if (currentUserId && isAuthenticated) {
      localStorage.setItem(`lifelens_focustime_user_${currentUserId}`, JSON.stringify(focusTime));
    }
  }, [focusTime, currentUserId, isAuthenticated]);

  useEffect(() => {
    if (currentUserId && isAuthenticated) {
      localStorage.setItem(`lifelens_braindump_user_${currentUserId}`, JSON.stringify(brainDumpCards));
    }
  }, [brainDumpCards, currentUserId, isAuthenticated]);

  // Save users list
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('lifelens_users', JSON.stringify(users));
    }
  }, [users]);

  // Handle Add User (Switch or Create Profile inside session)
  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    const newHabits = newUser.initialHabits || [];
    const newGoals = newUser.initialGoals || [];
    const newBrainDump = [];

    localStorage.setItem(`lifelens_habits_user_${newUser.id}`, JSON.stringify(newHabits));
    localStorage.setItem(`lifelens_goals_user_${newUser.id}`, JSON.stringify(newGoals));
    localStorage.setItem(`lifelens_braindump_user_${newUser.id}`, JSON.stringify(newBrainDump));
    localStorage.setItem(`lifelens_preferences_user_${newUser.id}`, JSON.stringify(newUser));

    setCurrentUserId(newUser.id);
    localStorage.setItem('lifelens_active_user_id', newUser.id);
    setHabits(newHabits);
    setGoals(newGoals);
    setBrainDumpCards(newBrainDump);
  };

  // Update existing user profile and preferences
  const handleUpdateUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    localStorage.setItem(`lifelens_preferences_user_${updatedUser.id}`, JSON.stringify(updatedUser));
  };

  // Switch active user
  const handleSwitchUser = (userId) => {
    setCurrentUserId(userId);
    localStorage.setItem('lifelens_active_user_id', userId);
  };

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Unified Smart Priority Task Handlers
  const updateSharedTask = (id, fields) => {
    if (typeof id === 'string' && id.startsWith('habit-')) {
      const habitId = Number(id.replace('habit-', ''));
      if (fields.title) {
        setHabits(prev => prev.map(h => h.id === habitId ? { ...h, name: fields.title } : h));
      }
    } else {
      setBrainDumpCards(prev => prev.map(c => c.id === id ? { ...c, ...fields } : c));
    }
  };

  const deleteSharedTask = (id) => {
    if (typeof id === 'string' && id.startsWith('habit-')) {
      const habitId = Number(id.replace('habit-', ''));
      deleteHabit(habitId);
    } else {
      deleteBrainDumpCard(id);
    }
  };

  const toggleSharedTaskProcessed = (id) => {
    if (typeof id === 'string' && id.startsWith('habit-')) {
      const habitId = Number(id.replace('habit-', ''));
      toggleHabit(habitId);
    } else {
      toggleBrainDumpProcessed(id);
    }
  };

  // Brain Dump Operations
  const addBrainDumpCards = (newCards) => {
    setBrainDumpCards(prev => [...newCards, ...prev]);
  };

  const deleteBrainDumpCard = (id) => {
    setBrainDumpCards(prev => prev.filter(c => c.id !== id));
  };

  const toggleBrainDumpProcessed = (id) => {
    setBrainDumpCards(prev => prev.map(c => c.id === id ? { ...c, processed: !c.processed } : c));
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

  // Combined Shared Tasks for SmartPriority
  const combinedSharedTasks = [
    ...brainDumpCards,
    ...habits.map(h => ({
      id: `habit-${h.id}`,
      title: h.name,
      priority: h.category === 'Academics' || h.category === 'Prep & Work' ? 'High' : 'Medium',
      estimate: '25 mins',
      deadline: 'Today',
      processed: h.completedToday,
      createdAt: 'Daily Routine',
      isHabit: true,
      originalHabitId: h.id
    }))
  ];

  // If user is logged out, render Welcome / Login / Signup Screen
  if (!isAuthenticated) {
    return (
      <AuthScreen 
        onLoginSuccess={handleLoginSuccess}
        onExploreDemo={handleExploreDemo}
      />
    );
  }

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme} 
        toggleTheme={toggleTheme}
        users={users}
        currentUserId={currentUserId}
        switchUser={handleSwitchUser}
        addUser={handleAddUser}
        updateUser={handleUpdateUser}
        onLogout={handleLogout}
        isDemoMode={isDemoMode}
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
            activeUser={activeUser}
            isDemoMode={isDemoMode}
          />
        )}

        {activeTab === 'brainDump' && (
          <BrainDump 
            cards={brainDumpCards}
            addCards={addBrainDumpCards}
            updateCard={updateSharedTask}
            deleteCard={deleteSharedTask}
            toggleProcessed={toggleSharedTaskProcessed}
            addHabit={addHabit}
          />
        )}

        {activeTab === 'smartPriority' && (
          <SmartPriority 
            cards={combinedSharedTasks}
            updateCard={updateSharedTask}
            deleteCard={deleteSharedTask}
            toggleProcessed={toggleSharedTaskProcessed}
            addHabit={addHabit}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'realityCheck' && (
          <RealityCheck 
            tasks={brainDumpCards}
            habits={habits}
            setActiveTab={setActiveTab}
            activeUser={activeUser}
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
