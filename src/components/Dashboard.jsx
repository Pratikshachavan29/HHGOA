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

export default function Dashboard({ habits, toggleHabit, moodLogs, goals, focusTime, setActiveTab, userName = 'Priya' }) {
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
      {/* Top Banner - Hero Wallet Card */}
      <div className="glass-card hero-card">
        <div className="hero-content">
          <span className="badge badge-indigo">
            <Sparkles size={12} /> Student SaaS Dashboard
          </span>
          <h1 className="hero-title">
            Hey <span className="title-gradient">{userName}</span>! Ready to crush today? 🚀
          </h1>
          <p className="hero-subtitle">
            You've completed <strong className="text-highlight">{completedTodayCount} of {habits.length}</strong> tasks today. Keep up your momentum!
          </p>

          {/* Quick Action Shortcut Toolbar */}
          <div className="quick-actions-toolbar">
            <button onClick={() => setActiveTab('brainDump')} className="btn btn-secondary action-pill">
              <Brain size={14} className="text-teal" /> Quick Dump
            </button>
            <button onClick={() => setActiveTab('smartPriority')} className="btn btn-secondary action-pill">
              <Zap size={14} className="text-amber" /> Smart Priority
            </button>
            <button onClick={() => setActiveTab('focus')} className="btn btn-secondary action-pill">
              <Clock size={14} className="text-rose" /> 25m Focus
            </button>
            <button onClick={() => setActiveTab('habits')} className="btn btn-secondary action-pill">
              <Plus size={14} className="text-teal" /> Add Routine
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
          <div className="metric-icon-bg bg-teal">
            <CheckCircle2 size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-value">{completedTodayCount}/{habits.length}</span>
            <span className="metric-title">Tasks Crushed</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-bg bg-amber">
            <Flame size={22} />
          </div>
          <div className="metric-data">
            <span className="metric-value">7 Days</span>
            <span className="metric-title">Study Streak</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-bg bg-indigo">
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
            <Calendar size={18} className="text-teal" />
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
        <Quote className="quote-icon" size={36} />
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
          background: var(--gradient-teal-soft);
          border-color: var(--border-teal-active);
        }

        .hero-title {
          font-size: 2rem;
          font-weight: 800;
          margin: 0.5rem 0 0.25rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .text-highlight {
          color: var(--text-main);
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
          border-color: var(--border-teal);
        }

        .text-teal { color: var(--accent-teal-light); }

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
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 3.8;
        }

        .circle-fill {
          fill: none;
          stroke: var(--accent-teal-light);
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
          color: var(--text-main);
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
        }

        .metric-icon-bg {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .bg-teal { background: rgba(20, 184, 166, 0.18); color: var(--accent-teal-light); border: 1px solid var(--border-teal); }
        .bg-amber { background: rgba(245, 158, 11, 0.18); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
        .bg-indigo { background: rgba(99, 102, 241, 0.18); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3); }
        .bg-rose { background: rgba(244, 63, 94, 0.18); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); }

        .metric-value {
          font-size: 1.3rem;
          font-weight: 800;
          display: block;
          color: var(--text-main);
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
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
        }

        .heatmap-cell.active-high {
          background: var(--accent-teal);
          border-color: var(--accent-teal-light);
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.3);
        }

        .heatmap-cell.active-med {
          background: rgba(20, 184, 166, 0.35);
          border-color: var(--border-teal);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .section-title {
          font-size: 1.15rem;
          font-weight: 700;
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
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-teal);
          transition: all var(--transition-fast);
        }

        .habit-item.completed {
          opacity: 0.65;
          background: rgba(20, 184, 166, 0.08);
          border-color: rgba(20, 184, 166, 0.25);
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
          border: 2px solid var(--text-muted);
          transition: all 0.2s ease;
          display: inline-block;
        }

        .checkbox-container input:checked ~ .checkmark {
          background: var(--accent-teal);
          border-color: var(--accent-teal);
        }

        .habit-name {
          flex: 1;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .habit-streak-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--accent-amber);
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
          font-size: 0.95rem;
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
          background: var(--gradient-teal-soft);
          border-color: var(--border-teal);
        }

        .quote-icon {
          color: var(--accent-teal-light);
          flex-shrink: 0;
          opacity: 0.8;
        }

        .quote-text {
          font-size: 1.05rem;
          font-style: italic;
          color: var(--text-main);
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
