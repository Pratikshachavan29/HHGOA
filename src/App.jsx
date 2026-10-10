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

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');

  // Default initial users
  const defaultUsers = [
    { id: '1', name: 'Priya', role: 'CS Student', avatarColor: '#ec4899', avatarEmoji: '🎓' },
    { id: '2', name: 'Alex', role: 'Pre-Med Major', avatarColor: '#10b981', avatarEmoji: '🔬' }
  ];

  // Load or initialize users state
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lifelens_users');
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  // Current active user ID
  const [currentUserId, setCurrentUserId] = useState(() => {
    const saved = localStorage.getItem('lifelens_active_user_id');
    return saved && users.some(u => u.id === saved) ? saved : users[0].id;
  });

  const activeUser = users.find(u => u.id === currentUserId) || users[0];

  // Default sample data generator for new users
  const getInitialHabitsForUser = (userName) => [
    { id: 1, name: 'Solve 1 LeetCode / Tech Prep Problem', category: 'Prep & Work', streak: 12, completedToday: true, weekly: [true, true, true, true, false, false, false] },
    { id: 2, name: `Review Notes for ${userName}'s Exams`, category: 'Academics', streak: 8, completedToday: true, weekly: [true, true, false, true, true, false, false] },
    { id: 3, name: 'Work on Capstone Group Project Draft', category: 'Projects', streak: 5, completedToday: false, weekly: [true, false, true, false, false, false, false] },
    { id: 4, name: 'Hydrate & 15m Campus Walk', category: 'Self Care', streak: 14, completedToday: false, weekly: [true, true, true, false, false, false, false] },
  ];

  const getInitialMoodLogsForUser = () => [
    { id: 1, rating: 'Productive', emoji: '⚡', score: 4, energy: 8, tags: ['Projects', 'Coffee ☕'], note: 'Nailed the assignment draft & finished study sprints!', date: 'Oct 5, 2026', time: '02:30 PM' },
    { id: 2, rating: 'Calm', emoji: '😌', score: 4, energy: 7, tags: ['Friends', 'Sleep'], note: 'Great study session at the library with the team.', date: 'Oct 4, 2026', time: '08:15 PM' },
  ];

  const getInitialGoalsForUser = () => [
    { id: 1, title: 'Land Summer Software Engineering Internship', category: 'Career & Jobs', targetDate: 'Dec 15, 2026', progress: 70 },
    { id: 2, title: 'Submit Capstone Project Phase 1', category: 'Projects', targetDate: 'Nov 20, 2026', progress: 85 },
    { id: 3, title: 'Maintain 3.8+ GPA this Semester', category: 'Academics', targetDate: 'Dec 30, 2026', progress: 60 },
  ];

  const getInitialBrainDumpForUser = () => [
    {
      id: 'bd-1',
      title: 'Submit OS Group Project Draft',
      priority: 'High',
      estimate: '1 hour',
      deadline: 'Tomorrow 5:00 PM',
      processed: false,
      createdAt: '10:30 AM'
    },
    {
      id: 'bd-2',
      title: 'Review System Design Chapter 4',
      priority: 'Medium',
      estimate: '45 mins',
      deadline: 'This Friday',
      processed: false,
      createdAt: '10:32 AM'
    },
    {
      id: 'bd-3',
      title: 'Schedule Mock Technical Interview',
      priority: 'High',
      estimate: '20 mins',
      deadline: 'ASAP',
      processed: false,
      createdAt: '10:35 AM'
    }
  ];

  // Per-user habits state
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem(`lifelens_habits_user_${currentUserId}`);
    return saved ? JSON.parse(saved) : getInitialHabitsForUser(activeUser.name);
  });

  // Per-user mood logs state
  const [moodLogs, setMoodLogs] = useState(() => {
    const saved = localStorage.getItem(`lifelens_moods_user_${currentUserId}`);
    return saved ? JSON.parse(saved) : getInitialMoodLogsForUser();
  });

  // Per-user goals state
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem(`lifelens_goals_user_${currentUserId}`);
    return saved ? JSON.parse(saved) : getInitialGoalsForUser();
  });

  // Per-user focus time state
  const [focusTime, setFocusTime] = useState(() => {
    const saved = localStorage.getItem(`lifelens_focustime_user_${currentUserId}`);
    return saved ? JSON.parse(saved) : 5400; // 90 mins default
  });

  // Per-user Brain Dump cards state
  const [brainDumpCards, setBrainDumpCards] = useState(() => {
    const saved = localStorage.getItem(`lifelens_braindump_user_${currentUserId}`);
    return saved ? JSON.parse(saved) : getInitialBrainDumpForUser();
  });

  // Save users list to localStorage
  useEffect(() => {
    localStorage.setItem('lifelens_users', JSON.stringify(users));
  }, [users]);

  // Save active user ID to localStorage
  useEffect(() => {
    localStorage.setItem('lifelens_active_user_id', currentUserId);
  }, [currentUserId]);

  // Reload user-specific data when active user changes
  useEffect(() => {
    const savedHabits = localStorage.getItem(`lifelens_habits_user_${currentUserId}`);
    setHabits(savedHabits ? JSON.parse(savedHabits) : getInitialHabitsForUser(activeUser.name));

    const savedMoods = localStorage.getItem(`lifelens_moods_user_${currentUserId}`);
    setMoodLogs(savedMoods ? JSON.parse(savedMoods) : getInitialMoodLogsForUser());

    const savedGoals = localStorage.getItem(`lifelens_goals_user_${currentUserId}`);
    setGoals(savedGoals ? JSON.parse(savedGoals) : getInitialGoalsForUser());

    const savedFocus = localStorage.getItem(`lifelens_focustime_user_${currentUserId}`);
    setFocusTime(savedFocus ? JSON.parse(savedFocus) : 5400);

    const savedDump = localStorage.getItem(`lifelens_braindump_user_${currentUserId}`);
    setBrainDumpCards(savedDump ? JSON.parse(savedDump) : getInitialBrainDumpForUser());
  }, [currentUserId]);

  // Save data per user
  useEffect(() => {
    localStorage.setItem(`lifelens_habits_user_${currentUserId}`, JSON.stringify(habits));
  }, [habits, currentUserId]);

  useEffect(() => {
    localStorage.setItem(`lifelens_moods_user_${currentUserId}`, JSON.stringify(moodLogs));
  }, [moodLogs, currentUserId]);

  useEffect(() => {
    localStorage.setItem(`lifelens_goals_user_${currentUserId}`, JSON.stringify(goals));
  }, [goals, currentUserId]);

  useEffect(() => {
    localStorage.setItem(`lifelens_focustime_user_${currentUserId}`, JSON.stringify(focusTime));
  }, [focusTime, currentUserId]);

  useEffect(() => {
    localStorage.setItem(`lifelens_braindump_user_${currentUserId}`, JSON.stringify(brainDumpCards));
  }, [brainDumpCards, currentUserId]);

  // Add new user profile
  const handleAddUser = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUserId(newUser.id);
  };

  // Switch active user
  const handleSwitchUser = (userId) => {
    setCurrentUserId(userId);
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
            userName={activeUser.name}
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
