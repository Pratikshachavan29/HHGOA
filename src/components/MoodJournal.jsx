import React, { useState } from 'react';
import { 
  Smile, 
  Zap, 
  BookOpen, 
  Plus, 
  Calendar, 
  Tag, 
  Clock,
  Sparkles
} from 'lucide-react';

export default function MoodJournal({ moodLogs, addMoodLog }) {
  const moodOptions = [
    { label: 'Joyful', emoji: '😊', score: 5, color: '#059669' },
    { label: 'Calm', emoji: '😌', score: 4, color: '#3b82f6' },
    { label: 'Productive', emoji: '⚡', score: 4, color: '#7c3aed' },
    { label: 'Tired', emoji: '😴', score: 2, color: '#d97706' },
    { label: 'Stressed', emoji: '🤯', score: 1, color: '#e11d48' }
  ];

  const tagOptions = ['Exams', 'Projects', 'Interviews', 'Coffee ☕', 'Sleep', 'Friends', 'Exercise'];

  const [selectedMood, setSelectedMood] = useState(moodOptions[2]);
  const [energyLevel, setEnergyLevel] = useState(8);
  const [selectedTags, setSelectedTags] = useState(['Projects', 'Coffee ☕']);
  const [note, setNote] = useState('');

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    addMoodLog({
      rating: selectedMood.label,
      emoji: selectedMood.emoji,
      score: selectedMood.score,
      energy: energyLevel,
      tags: selectedTags,
      note: note.trim(),
      date: formattedDate,
      time: formattedTime
    });

    setNote('');
  };

  return (
    <div className="mood-journal-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Vibe & Energy Journal</h1>
          <p className="page-subtitle">Track how study load, exams, and rest impact your daily mental clarity</p>
        </div>
      </div>

      <div className="grid-2 mood-layout">
        {/* Mood Logger Form */}
        <div className="glass-card mood-form-card">
          <div className="card-title-row">
            <BookOpen className="icon-title" size={20} />
            <h2 className="card-title">How's your day going?</h2>
          </div>

          <form onSubmit={handleSubmit} className="mood-form">
            {/* Mood selector */}
            <div className="form-group">
              <label>How are you feeling right now?</label>
              <div className="mood-selector-grid">
                {moodOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedMood(opt)}
                    className={`mood-option-btn ${selectedMood.label === opt.label ? 'active' : ''}`}
                  >
                    <span className="mood-emoji">{opt.emoji}</span>
                    <span className="mood-label">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Slider */}
            <div className="form-group">
              <div className="slider-header">
                <label>Study Energy Level: <strong>{energyLevel}/10</strong></label>
                <Zap size={18} className="energy-icon" />
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={energyLevel} 
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="energy-slider"
              />
              <div className="slider-labels">
                <span>Burnout Risk</span>
                <span>Moderate Focus</span>
                <span>Peak Brain Power</span>
              </div>
            </div>

            {/* Tags selection */}
            <div className="form-group">
              <label>What influenced your energy today?</label>
              <div className="tags-flex">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Reflection notes */}
            <div className="form-group">
              <label>Daily Reflection Note</label>
              <textarea 
                rows="3" 
                placeholder="How did lectures, study sessions, or team meetings go today? Any wins or thoughts?" 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="textarea-field"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              <Plus size={18} /> Save Journal Entry
            </button>
          </form>
        </div>

        {/* History Timeline */}
        <div className="glass-card timeline-card">
          <div className="card-title-row">
            <Clock className="icon-title" size={20} />
            <h2 className="card-title">Recent Vibe Log</h2>
          </div>

          <div className="timeline-list">
            {moodLogs.length === 0 ? (
              <p className="empty-text">No entries logged yet.</p>
            ) : (
              moodLogs.map((log) => (
                <div key={log.id} className="timeline-item">
                  <div className="timeline-badge">
                    <span className="log-emoji">{log.emoji}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="log-header">
                      <span className="log-rating">{log.rating}</span>
                      <span className="log-time">{log.date} • {log.time}</span>
                    </div>

                    <div className="log-stats">
                      <span className="energy-badge">⚡ Energy: {log.energy}/10</span>
                      {log.tags && log.tags.map(t => (
                        <span key={t} className="tag-badge">#{t}</span>
                      ))}
                    </div>

                    {log.note && <p className="log-note">"{log.note}"</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .mood-journal-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .icon-title {
          color: #7c3aed;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #18181b;
        }

        .mood-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mood-selector-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.5rem;
          margin-top: 0.4rem;
        }

        .mood-option-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0.75rem 0.5rem;
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mood-option-btn:hover {
          background: #fdf2f8;
          border-color: #fbcfe8;
        }

        .mood-option-btn.active {
          background: #f3e8ff;
          border-color: #e9d5ff;
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.15);
        }

        .mood-emoji {
          font-size: 1.5rem;
        }

        .mood-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #18181b;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .energy-icon {
          color: #d97706;
        }

        .energy-slider {
          width: 100%;
          accent-color: #7c3aed;
          height: 6px;
          border-radius: var(--radius-full);
          cursor: pointer;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .tags-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.4rem;
        }

        .tag-btn {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .tag-btn.active {
          background: #fce7f3;
          border-color: #fbcfe8;
          color: #db2777;
        }

        .submit-btn {
          width: 100%;
          margin-top: 0.5rem;
        }

        .timeline-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-height: 520px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .timeline-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: #faf8fc;
          border: 1px solid #e9d5ff;
        }

        .timeline-badge {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0,0,0,0.03);
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }

        .log-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .log-rating {
          font-weight: 700;
          font-size: 1rem;
          color: #18181b;
        }

        .log-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .log-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          align-items: center;
        }

        .energy-badge {
          font-size: 0.75rem;
          color: #d97706;
          font-weight: 600;
        }

        .tag-badge {
          font-size: 0.75rem;
          color: #7c3aed;
        }

        .log-note {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-style: italic;
          margin-top: 0.25rem;
        }

        @media (max-width: 900px) {
          .mood-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
