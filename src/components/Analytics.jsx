import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  Smile, 
  Clock, 
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';

export default function Analytics({ habits, moodLogs, focusTime }) {
  // Weekly habit completion data simulation
  const weeklyHabitsData = [
    { day: 'Mon', completion: 85 },
    { day: 'Tue', completion: 100 },
    { day: 'Wed', completion: 70 },
    { day: 'Thu', completion: 90 },
    { day: 'Fri', completion: 60 },
    { day: 'Sat', completion: 80 },
    { day: 'Sun', completion: 95 }
  ];

  // Mood distribution counts
  const moodCounts = {
    Joyful: moodLogs.filter(m => m.rating === 'Joyful').length || 3,
    Calm: moodLogs.filter(m => m.rating === 'Calm').length || 4,
    Productive: moodLogs.filter(m => m.rating === 'Productive').length || 5,
    Tired: moodLogs.filter(m => m.rating === 'Tired').length || 2,
    Stressed: moodLogs.filter(m => m.rating === 'Stressed').length || 1,
  };

  const totalMoods = Object.values(moodCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="analytics-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Insights & Trends</h1>
          <p className="page-subtitle">See how your study habits, energy levels, and focus hours align over time</p>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid-3 highlights-grid">
        <div className="glass-card highlight-card">
          <Award size={28} className="highlight-icon text-indigo" />
          <div className="highlight-info">
            <span className="highlight-title">Weekly Study Consistency</span>
            <span className="highlight-value">84%</span>
            <span className="highlight-sub">+12% from last week</span>
          </div>
        </div>

        <div className="glass-card highlight-card">
          <Smile size={28} className="highlight-icon text-emerald" />
          <div className="highlight-info">
            <span className="highlight-title">Top Study Vibe</span>
            <span className="highlight-value">Productive ⚡</span>
            <span className="highlight-sub">72% positive energy</span>
          </div>
        </div>

        <div className="glass-card highlight-card">
          <Clock size={28} className="highlight-icon text-amber" />
          <div className="highlight-info">
            <span className="highlight-title">Total Study Hours</span>
            <span className="highlight-value">{Math.round(focusTime / 60)} Hours</span>
            <span className="highlight-sub">14 study sprints</span>
          </div>
        </div>
      </div>

      <div className="grid-2 analytics-charts-grid">
        {/* Habit Completion Chart */}
        <div className="glass-card chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Weekly Task & Routine Completion</h2>
            <span className="badge badge-emerald">Past 7 Days</span>
          </div>

          <div className="bar-chart-container">
            {weeklyHabitsData.map((item) => (
              <div key={item.day} className="bar-column">
                <div className="bar-wrapper">
                  <div 
                    className="bar-fill" 
                    style={{ height: `${item.completion}%` }}
                    title={`${item.completion}% completion`}
                  ></div>
                </div>
                <span className="bar-label">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="glass-card chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Energy & Vibe Breakdown</h2>
            <span className="badge badge-indigo">Distribution</span>
          </div>

          <div className="mood-breakdown-list">
            {Object.entries(moodCounts).map(([mood, count]) => {
              const percent = Math.round((count / totalMoods) * 100);
              return (
                <div key={mood} className="mood-bar-item">
                  <div className="mood-bar-header">
                    <span className="mood-name">{mood}</span>
                    <span className="mood-percent">{percent}% ({count})</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${percent}%`,
                        background: mood === 'Joyful' ? 'var(--gradient-teal)' : 
                                    mood === 'Productive' ? 'var(--gradient-primary)' : 'var(--gradient-amber)' 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .analytics-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .highlight-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
        }

        .highlight-icon {
          flex-shrink: 0;
        }

        .text-indigo { color: #818cf8; }
        .text-emerald { color: #34d399; }
        .text-amber { color: #fbbf24; }

        .highlight-info {
          display: flex;
          flex-direction: column;
        }

        .highlight-title {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .highlight-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .highlight-sub {
          font-size: 0.75rem;
          color: var(--accent-emerald);
          font-weight: 600;
        }

        .chart-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chart-title {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .bar-chart-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 200px;
          padding-top: 1rem;
        }

        .bar-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          height: 100%;
        }

        .bar-wrapper {
          width: 28px;
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .bar-fill {
          width: 100%;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bar-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .mood-breakdown-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .mood-bar-item {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .mood-bar-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .mood-percent {
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
