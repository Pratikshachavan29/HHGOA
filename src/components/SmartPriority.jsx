import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Zap, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Filter, 
  ArrowUpRight,
  Brain,
  HelpCircle,
  Edit2,
  Check,
  TrendingUp,
  Layers
} from 'lucide-react';

export function calculateSmartPriority(task) {
  let score = 0;
  let reasons = [];

  // 1. Priority Impact Weight (Max 40)
  if (task.priority === 'High') {
    score += 40;
    reasons.push('High Impact Task');
  } else if (task.priority === 'Medium') {
    score += 25;
    reasons.push('Moderate Impact');
  } else {
    score += 10;
    reasons.push('Low Impact');
  }

  // 2. Deadline Urgency Weight (Max 45)
  const deadlineLower = (task.deadline || '').toLowerCase();
  if (deadlineLower.includes('asap') || deadlineLower.includes('today') || deadlineLower.includes('urgent') || deadlineLower.includes('tonight')) {
    score += 45;
    reasons.push('Urgent Deadline (Today/ASAP)');
  } else if (deadlineLower.includes('tomorrow')) {
    score += 35;
    reasons.push('Due Tomorrow');
  } else if (deadlineLower.includes('friday') || deadlineLower.includes('week')) {
    score += 20;
    reasons.push('Due This Week');
  } else {
    score += 10;
    reasons.push('Flexible Deadline');
  }

  // 3. Estimated Effort Efficiency (Max 15 - Quick Wins)
  const estLower = (task.estimate || '').toLowerCase();
  if (estLower.includes('15') || estLower.includes('20') || estLower.includes('25') || estLower.includes('mins')) {
    score += 15;
    reasons.push('Quick Win (<30m)');
  } else {
    score += 5;
    reasons.push('Deep Focus Session (1h+)');
  }

  // Recommendation Text
  let recommendation = '';
  let badgeColor = 'emerald';
  if (score >= 80) {
    recommendation = `🔥 Critical Priority! Tackle "${task.title}" first in your next 25-minute Pomodoro sprint. High impact with near-term deadline.`;
    badgeColor = 'rose';
  } else if (score >= 55) {
    recommendation = `⚡ High-Yield Momentum Task. Excellent to tackle right after critical items. Estimated effort: ${task.estimate}.`;
    badgeColor = 'amber';
  } else {
    recommendation = `🌱 Secondary Task. Perfect to schedule for evening downtime or when energy levels are lower.`;
    badgeColor = 'emerald';
  }

  return {
    score: Math.min(100, score),
    reasons,
    recommendation,
    badgeColor
  };
}

export default function SmartPriority({ 
  cards = [], 
  updateCard, 
  deleteCard, 
  toggleProcessed, 
  addHabit,
  setActiveTab 
}) {
  const [selectedFilter, setSelectedFilter] = useState('Active');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Calculate smart priority metrics and sort descending
  const sortedCards = cards
    .map((task) => {
      const meta = calculateSmartPriority(task);
      return { ...task, meta };
    })
    .sort((a, b) => b.meta.score - a.meta.score);

  const activeCards = sortedCards.filter(c => !c.processed);
  const completedCards = sortedCards.filter(c => c.processed);
  
  const displayCards = selectedFilter === 'Active' 
    ? activeCards 
    : selectedFilter === 'Completed' 
    ? completedCards 
    : sortedCards;

  const topFocusTask = activeCards.length > 0 ? activeCards[0] : null;

  const startEdit = (card) => {
    setEditingId(card.id);
    setEditTitle(card.title);
  };

  const saveEdit = (id) => {
    if (editTitle.trim()) {
      updateCard(id, { title: editTitle.trim() });
    }
    setEditingId(null);
  };

  return (
    <div className="smart-priority-container animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Smart Priority Matrix</h1>
          <p className="page-subtitle">
            Algorithmic task ranking evaluating deadline urgency, priority impact, and effort efficiency.
          </p>
        </div>
      </div>

      {/* Top Focus Highlight Banner */}
      {topFocusTask && (
        <div className="glass-card hero-focus-card">
          <div className="hero-focus-header">
            <span className="badge badge-rose">
              <Flame size={14} /> #1 Recommended Focus Right Now
            </span>
            <span className="score-pill">Smart Score: {topFocusTask.meta.score}/100</span>
          </div>

          <h2 className="hero-focus-title">{topFocusTask.title}</h2>

          <div className="hero-reasons-flex">
            {topFocusTask.meta.reasons.map((r, i) => (
              <span key={i} className="reason-tag">
                <CheckCircle2 size={12} /> {r}
              </span>
            ))}
          </div>

          <p className="hero-recommendation">{topFocusTask.meta.recommendation}</p>

          <div className="hero-actions">
            <button onClick={() => toggleProcessed(topFocusTask.id)} className="btn btn-primary">
              <CheckCircle2 size={18} /> Mark as Complete
            </button>
            <button onClick={() => setActiveTab('focus')} className="btn btn-secondary">
              <Zap size={18} /> Start 25m Focus Sprint
            </button>
          </div>
        </div>
      )}

      {/* Main Task Matrix */}
      <div className="glass-card matrix-main-card">
        <div className="matrix-header-bar">
          <div className="matrix-title-group">
            <Layers className="text-purple" size={22} />
            <h2 className="card-title">Prioritized Action Queue</h2>
          </div>

          <div className="filter-pill-group">
            {['Active', 'Completed', 'All'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`filter-btn ${selectedFilter === f ? 'active' : ''}`}
              >
                {f} ({f === 'Active' ? activeCards.length : f === 'Completed' ? completedCards.length : sortedCards.length})
              </button>
            ))}
          </div>
        </div>

        {/* Task Cards List */}
        <div className="ranked-task-list">
          {displayCards.length === 0 ? (
            <div className="empty-priority-box">
              <Brain size={40} className="text-purple" />
              <h3>No Tasks Found in Queue</h3>
              <p>Add messy thoughts in the Brain Dump page to automatically populate this matrix.</p>
            </div>
          ) : (
            displayCards.map((card, idx) => (
              <div
                key={card.id}
                className={`ranked-task-card ${card.processed ? 'processed' : ''}`}
              >
                {/* Rank Badge */}
                <div className="rank-badge-col">
                  <span className="rank-number">#{idx + 1}</span>
                  <div className="score-circle" style={{ borderColor: card.meta.score >= 80 ? '#f43f5e' : card.meta.score >= 55 ? '#d97706' : '#059669' }}>
                    <span className="score-val">{card.meta.score}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="ranked-content-col">
                  <div className="card-top-info">
                    {/* Priority Selector (Synchronized) */}
                    <select
                      value={card.priority}
                      onChange={(e) => updateCard(card.id, { priority: e.target.value })}
                      className={`priority-select priority-${card.priority.toLowerCase()}`}
                    >
                      <option value="High">🔴 High Impact</option>
                      <option value="Medium">🟡 Medium Impact</option>
                      <option value="Low">🟢 Low Impact</option>
                    </select>

                    <span className="time-stamp">Est: {card.estimate} • Due: {card.deadline}</span>
                  </div>

                  {/* Inline Editable Title (Synchronized) */}
                  <div className="title-row">
                    {editingId === card.id ? (
                      <div className="inline-edit-box">
                        <input 
                          type="text" 
                          value={editTitle} 
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input-field inline-input"
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(card.id)}
                        />
                        <button onClick={() => saveEdit(card.id)} className="btn-icon text-emerald">
                          <Check size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="title-display">
                        <h3 className={`task-title-text ${card.processed ? 'line-through' : ''}`}>
                          {card.title}
                        </h3>
                        <button onClick={() => startEdit(card)} className="btn-icon edit-btn" title="Edit Task Title">
                          <Edit2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Transparent Explanation Box */}
                  <div className="explanation-box">
                    <div className="explanation-header">
                      <HelpCircle size={14} className="text-purple" />
                      <span className="explanation-title">Why Ranked #{idx + 1}?</span>
                    </div>

                    <div className="reasons-pills-row">
                      {card.meta.reasons.map((reason, i) => (
                        <span key={i} className="reason-pill">
                          {reason}
                        </span>
                      ))}
                    </div>

                    <p className="recommendation-text">{card.meta.recommendation}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="ranked-actions-col">
                  <button
                    onClick={() => toggleProcessed(card.id)}
                    className={`btn-icon action-check ${card.processed ? 'text-emerald' : ''}`}
                    title={card.processed ? 'Mark Active' : 'Mark Complete'}
                  >
                    <CheckCircle2 size={22} />
                  </button>

                  <button
                    onClick={() => deleteCard(card.id)}
                    className="btn-icon delete-btn"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .smart-priority-container {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .hero-focus-card {
          background: linear-gradient(135deg, #fff1f2 0%, #f3e8ff 100%);
          border-color: #fecdd3;
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-focus-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .score-pill {
          font-size: 0.85rem;
          font-weight: 800;
          color: #e11d48;
          background: #ffe4e6;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          border: 1px solid #fecdd3;
        }

        .hero-focus-title {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.25;
          color: #18181b;
        }

        .hero-reasons-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .reason-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: var(--radius-md);
          color: #18181b;
        }

        .hero-recommendation {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .hero-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .matrix-main-card {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 1.75rem;
          background: #ffffff;
        }

        .matrix-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .matrix-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #18181b;
        }

        .filter-pill-group {
          display: flex;
          gap: 0.4rem;
        }

        .filter-btn {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn.active {
          background: var(--gradient-btn-primary);
          color: white;
          border-color: transparent;
        }

        .ranked-task-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .ranked-task-card {
          display: flex;
          gap: 1.25rem;
          padding: 1.25rem;
          background: #faf8fc;
          border: 1px solid #e9d5ff;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .ranked-task-card.processed {
          opacity: 0.55;
        }

        .rank-badge-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
        }

        .rank-number {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--text-muted);
        }

        .score-circle {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          border: 2px solid var(--accent-purple);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .score-val {
          font-size: 0.95rem;
          font-weight: 800;
          color: #18181b;
        }

        .ranked-content-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .card-top-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .priority-select {
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          outline: none;
          background: #ffffff;
          border: 1px solid var(--border-color);
        }

        .priority-high { color: #e11d48; border-color: #fecdd3; background: #fff1f2; }
        .priority-medium { color: #d97706; border-color: #fde68a; background: #fffbeb; }
        .priority-low { color: #059669; border-color: #a7f3d0; background: #ecfdf5; }

        .time-stamp {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .title-row {
          display: flex;
          align-items: center;
        }

        .title-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .task-title-text {
          font-size: 1.12rem;
          font-weight: 700;
          color: #18181b;
          flex: 1;
        }

        .task-title-text.line-through {
          text-decoration: line-through;
        }

        .edit-btn {
          opacity: 0.4;
          transition: opacity 0.2s;
        }

        .title-display:hover .edit-btn {
          opacity: 1;
        }

        .inline-edit-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .inline-input {
          padding: 0.4rem 0.6rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .explanation-box {
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.25rem;
        }

        .explanation-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .explanation-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #7c3aed;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .reasons-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .reason-pill {
          font-size: 0.72rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: #f3e8ff;
          color: #7c3aed;
          font-weight: 600;
        }

        .recommendation-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .ranked-actions-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .empty-priority-box {
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
