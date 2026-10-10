import React from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Smile, 
  Clock, 
  TrendingUp, 
  Quote, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Brain,
  Zap,
  Calendar,
  Plus
} from 'lucide-react';

export default function Dashboard({ habits, toggleHabit, moodLogs, goals, focusTime, setActiveTab, activeUser = {} }) {
  const userName = activeUser.name || 'User';
  const userRole = activeUser.role || 'Productivity HQ';
  const focusAreas = activeUser.focusAreas || [];

  // Calculate completion statistics
  const completedTodayCount = habits.filter(h => h.completedToday).length;
  const habitCompletionRate = habits.length > 0 ? Math.round((completedTodayCount / habits.length) * 100) : 0;
  
  const latestMood = moodLogs.length > 0 ? moodLogs[0] : { rating: 'Productive', emoji: '⚡', score: 4 };
  const totalFocusMinutes = Math.round(focusTime / 60);

  const studentQuotes = [
    { text: "Small daily efforts compound into major exam, interview, and project wins.", author: "Campus Wisdom" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Focus on progress, not perfection. One study sprint at a time.", author: "Student Pro Tip" }
  ];
  const dailyQuote = studentQuotes[0];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="dashboard-wrapper animate-fade-in">
      {/* Top Banner - Hero Card */}
      <div className="glass-card hero-card">
        <div className="hero-content">
          <div className="badge-row-flex">
            <span className="badge badge-indigo">
              <Sparkles size={12} /> {userRole}
            </span>
            {focusAreas.map(fa => (
              <span key={fa} className="badge badge-purple">{fa}</span>
            ))}
          </div>
          <h1 className="hero-title">
            Hey <span className="title-gradient">{userName}</span>! Ready to crush today? 🚀
          </h1>
          <p className="hero-subtitle">
            You've completed <strong className="text-highlight">{completedTodayCount} of {habits.length}</strong> tasks today. Keep up your momentum!
          </p>

          {/* Quick Action Shortcut Toolbar */}
          <div className="quick-actions-toolbar">
            <button onClick={() => setActiveTab('brainDump')} className="btn btn-secondary action-pill">
              <Brain size={14} className="text-purple" /> Quick Dump
            </button>
            <button onClick={() => setActiveTab('smartPriority')} className="btn btn-secondary action-pill">
              <Zap size={14} className="text-pink" /> Smart Priority
            </button>
            <button onClick={() => setActiveTab('focus')} className="btn btn-secondary action-pill">
              <Clock size={14} className="text-blue" /> 25m Focus
            </button>
            <button onClick={() => setActiveTab('habits')} className="btn btn-secondary action-pill">
              <Plus size={14} className="text-purple" /> Add Routine
            </button>
          </div>
        </div>

        {/* Circular Life Score Ring */}
        <div className="score-ring-container">
          <div className="score-ring">
            <svg viewBox="0 0 100 100" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" transform="scale(2.5)" />
              <path 
                className="circle-fill" 
                strokeDasharray={`${habitCompletionRate}, 100`} 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                transform="scale(2.5)" 
              />
            </svg>
            <div className="score-text">
              <span className="score-number">{habitCompletionRate}%</span>
              <span className="score-label">Study Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4 metric-cards-grid">
        <div className="glass-card metric-card">
          <div className="metric-icon-bg bg-purple">
            <CheckCircle2 size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-value">{completedTodayCount}/{habits.length}</span>
            <span className="metric-title">Tasks Crushed</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-bg bg-pink">
            <Flame size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-value">7 Days</span>
            <span className="metric-title">Study Streak</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-bg bg-blue">
            <Smile size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-value">{latestMood.emoji} {latestMood.rating}</span>
            <span className="metric-title">Current Vibe</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-bg bg-rose">
            <Clock size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-value">{totalFocusMinutes} mins</span>
            <span className="metric-title">Focus Logged</span>
          </div>
        </div>
      </div>

      {/* 7-Day Consistency Heatmap Toolbar */}
      <div className="glass-card heatmap-card">
        <div className="heatmap-header">
          <div className="heatmap-title-group">
            <Calendar size={18} className="text-purple" />
            <span className="heatmap-title">7-Day Study Consistency</span>
          </div>
          <span className="badge badge-emerald">84% Activity</span>
        </div>

        <div className="heatmap-grid">
          {daysOfWeek.map((day, idx) => (
            <div key={day} className="heatmap-day-col">
              <span className="heatmap-day-name">{day}</span>
              <div className={`heatmap-cell ${idx <= 3 ? 'active-high' : 'active-med'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid-2 dashboard-sections">
        {/* Today's Habits Quick List */}
        <div className="glass-card section-card">
          <div className="section-header">
            <div>
              <h2 className="section-title">Today's Academic & Personal Checklist</h2>
              <p className="section-sub">Quick check-in for active student routines</p>
            </div>
            <button onClick={() => setActiveTab('habits')} className="btn-icon" title="View all routines">
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="habits-quick-list">
            {habits.length === 0 ? (
              <p className="empty-text">No tasks created yet.</p>
            ) : (
              habits.slice(0, 4).map((habit) => (
                <div key={habit.id} className={`habit-item ${habit.completedToday ? 'completed' : ''}`}>
                  <label className="checkbox-container">
                    <input 
                      type="checkbox" 
                      checked={habit.completedToday} 
                      onChange={() => toggleHabit(habit.id)} 
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className="habit-name">{habit.name}</span>
                  <span className="habit-streak-badge">
                    <Flame size={12} /> {habit.streak}d
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Goals Progress Preview */}
        <div className="glass-card section-card">
          <div className="section-header">
            <div>
              <h2 className="section-title">Projects & Milestones</h2>
              <p className="section-sub">Upcoming assignment & career targets</p>
            </div>
            <button onClick={() => setActiveTab('goals')} className="btn-icon" title="View all goals">
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="goals-preview-list">
            {goals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="goal-preview-item">
                <div className="goal-info">
                  <span className="goal-title">{goal.title}</span>
                  <span className="goal-category badge badge-indigo">{goal.category}</span>
                </div>
                <div className="goal-progress-wrapper">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${goal.progress}%` }}></div>
                  </div>
                  <span className="progress-percent">{goal.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote of the day card */}
      <div className="glass-card quote-card">
        <Quote className="quote-icon" size={32} />
        <div className="quote-body">
          <p className="quote-text">"{dailyQuote.text}"</p>
          <span className="quote-author">— {dailyQuote.author}</span>
        </div>
      </div>

      <style>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .hero-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.25rem;
          background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 60%, #eff6ff 100%);
          border-color: #e9d5ff;
        }

        .badge-row-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 1.9rem;
          font-weight: 800;
          margin: 0.5rem 0 0.25rem;
          line-height: 1.25;
          color: #18181b;
        }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .text-highlight {
          color: #18181b;
        }

        .quick-actions-toolbar {
          display: flex;
          gap: 0.6rem;
          margin-top: 1.25rem;
          flex-wrap: wrap;
        }

        .action-pill {
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
          border-radius: var(--radius-full);
          border-color: #e4e4e7;
          background: #ffffff;
        }

        .text-purple { color: #7c3aed; }
        .text-pink { color: #ec4899; }
        .text-blue { color: #3b82f6; }

        .score-ring-container {
          position: relative;
          width: 110px;
          height: 110px;
          flex-shrink: 0;
        }

        .circular-chart {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .circle-bg {
          fill: none;
          stroke: #e4e4e7;
          stroke-width: 3.8;
        }

        .circle-fill {
          fill: none;
          stroke: #8b5cf6;
          stroke-width: 3.8;
          stroke-linecap: round;
          transition: stroke-dasharray 0.6s ease;
        }

        .score-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          display: flex;
          flex-direction: column;
        }

        .score-number {
          font-size: 1.5rem;
          font-weight: 800;
          color: #18181b;
        }

        .score-label {
          font-size: 0.65rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .metric-cards-grid {
          gap: 1.25rem;
        }

        .metric-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: #ffffff;
        }

        .metric-icon-bg {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-purple { background: #f3e8ff; color: #7c3aed; border: 1px solid #e9d5ff; }
        .bg-pink { background: #fce7f3; color: #ec4899; border: 1px solid #fbcfe8; }
        .bg-blue { background: #eff6ff; color: #3b82f6; border: 1px solid #bfdbfe; }
        .bg-rose { background: #fff1f2; color: #f43f5e; border: 1px solid #fecdd3; }

        .metric-value {
          font-size: 1.25rem;
          font-weight: 800;
          display: block;
          color: #18181b;
        }

        .metric-title {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .heatmap-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #ffffff;
        }

        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .heatmap-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .heatmap-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #18181b;
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.75rem;
        }

        .heatmap-day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .heatmap-day-name {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .heatmap-cell {
          width: 100%;
          height: 12px;
          border-radius: var(--radius-sm);
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
        }

        .heatmap-cell.active-high {
          background: #a855f7;
          border-color: #c084fc;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.2);
        }

        .heatmap-cell.active-med {
          background: #f472b6;
          border-color: #fbcfe8;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #18181b;
        }

        .section-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .habits-quick-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .habit-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          background: #faf8fc;
          border: 1px solid #e9d5ff;
          transition: all var(--transition-fast);
        }

        .habit-item.completed {
          opacity: 0.65;
          background: #ecfdf5;
          border-color: #a7f3d0;
        }

        .habit-item.completed .habit-name {
          text-decoration: line-through;
        }

        .checkbox-container {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .checkbox-container input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid #a1a1aa;
          transition: all 0.2s ease;
          display: inline-block;
          background: #ffffff;
        }

        .checkbox-container input:checked ~ .checkmark {
          background: #10b981;
          border-color: #10b981;
        }

        .habit-name {
          flex: 1;
          font-weight: 600;
          font-size: 0.92rem;
          color: #18181b;
        }

        .habit-streak-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: #d97706;
          font-weight: 700;
        }

        .goals-preview-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .goal-preview-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .goal-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .goal-title {
          font-weight: 600;
          font-size: 0.92rem;
          color: #18181b;
        }

        .goal-progress-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .progress-percent {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          width: 40px;
          text-align: right;
        }

        .quote-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%);
          border-color: #e9d5ff;
        }

        .quote-icon {
          color: #7c3aed;
          flex-shrink: 0;
          opacity: 0.8;
        }

        .quote-text {
          font-size: 1.02rem;
          font-style: italic;
          color: #18181b;
          margin-bottom: 0.35rem;
        }

        .quote-author {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
