import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Filter, 
  ArrowRight,
  ListTodo,
  FileText,
  Edit2,
  Check,
  Calendar
} from 'lucide-react';

export default function BrainDump({ 
  cards = [], 
  addCards, 
  updateCard, 
  deleteCard, 
  toggleProcessed, 
  addHabit 
}) {
  const [rawText, setRawText] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [editingCardId, setEditingCardId] = useState(null);
  const [editTitleText, setEditTitleText] = useState('');

  // Parser helper function
  const parseThoughtLine = (line) => {
    const text = line.trim();
    if (!text) return null;

    const lower = text.toLowerCase();

    // Priority detection
    let priority = 'Medium';
    if (lower.includes('urgent') || lower.includes('asap') || lower.includes('high') || lower.includes('critical') || lower.includes('important')) {
      priority = 'High';
    } else if (lower.includes('low') || lower.includes('someday') || lower.includes('whenever') || lower.includes('later')) {
      priority = 'Low';
    }

    // Estimate time detection (e.g. 30m, 1 hour, 45 mins, 2h)
    let estimate = '25 mins';
    const timeMatch = text.match(/(\d+\s*(?:h|hr|hrs|hour|hours|m|min|mins|minutes))\b/i);
    if (timeMatch) {
      estimate = timeMatch[1];
    }

    // Deadline detection (e.g., by Friday, tomorrow, due 5pm, tonight, by Dec 15)
    let deadline = 'Today';
    const deadlineMatch = text.match(/(?:by|due|before|on)\s+([A-Za-z0-9\s:]+?)(?=\s+(?:urgent|high|low|asap|\d+h|\d+m)|$)/i);
    if (deadlineMatch) {
      deadline = deadlineMatch[1].trim();
    } else if (lower.includes('tomorrow')) {
      deadline = 'Tomorrow';
    } else if (lower.includes('tonight')) {
      deadline = 'Tonight';
    } else if (lower.includes('next week')) {
      deadline = 'Next Week';
    } else if (lower.includes('friday')) {
      deadline = 'This Friday';
    }

    // Clean title from common bullet points or tags
    let cleanTitle = text
      .replace(/^[-*•\d+.\s]+/, '')
      .replace(/(?:urgent|asap|high priority|low priority|due\s+\w+|by\s+\w+|\d+\s*(?:h|hr|m|min|mins|hours))/gi, '')
      .trim();

    if (!cleanTitle) cleanTitle = text;

    return {
      id: Date.now().toString() + Math.random().toString().slice(2, 6),
      title: cleanTitle,
      priority,
      estimate,
      deadline,
      processed: false,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleOrganize = () => {
    if (!rawText.trim()) return;

    const lines = rawText.split('\n');
    const newCards = [];

    lines.forEach((line) => {
      const parsed = parseThoughtLine(line);
      if (parsed) newCards.push(parsed);
    });

    if (newCards.length > 0) {
      addCards(newCards);
    }
    setRawText('');
  };

  const startEditTitle = (card) => {
    setEditingCardId(card.id);
    setEditTitleText(card.title);
  };

  const saveEditTitle = (id) => {
    if (editTitleText.trim()) {
      updateCard(id, { title: editTitleText.trim() });
    }
    setEditingCardId(null);
  };

  const convertToHabit = (card) => {
    addHabit({
      name: card.title,
      category: card.priority === 'High' ? 'Prep & Work' : 'Academics',
      streak: 1,
      completedToday: false,
      weekly: [false, false, false, false, false, false, false]
    });
    toggleProcessed(card.id);
  };

  const filteredCards = cards.filter((c) => {
    if (filterPriority === 'All') return true;
    return c.priority === filterPriority;
  });

  return (
    <div className="brain-dump-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Brain Dump & Quick Organizer</h1>
          <p className="page-subtitle">
            Dump raw thoughts, assignments, and ideas line-by-line. Structure them instantly with automatic local storage saving.
          </p>
        </div>
      </div>

      {/* Input Box Section */}
      <div className="glass-card input-dump-card">
        <div className="card-header-row">
          <Brain className="text-purple" size={22} />
          <h2 className="card-title">Dump Messy Thoughts Line-by-Line</h2>
          <span className="badge badge-indigo">Fast AI Parser</span>
        </div>

        <textarea
          rows="5"
          placeholder={`Type or paste your messy thoughts here (1 per line). Examples:\n- Finish OS lab report due tomorrow 45m urgent\n- Review 2 LeetCode problems tonight 30 mins\n- Schedule team sync for Capstone by Friday\n- Buy index cards for exam revision low priority`}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          className="textarea-field dump-textarea"
        />

        <div className="action-row">
          <button onClick={handleOrganize} className="btn btn-primary organize-btn">
            <Sparkles size={18} /> Organize My Thoughts
          </button>
        </div>
      </div>

      {/* Organized Cards Section */}
      <div className="organized-section">
        <div className="section-bar">
          <div className="section-title-group">
            <ListTodo size={20} className="text-purple" />
            <h2 className="section-title">Organized Fast Files ({filteredCards.length})</h2>
          </div>

          <div className="priority-filters">
            <Filter size={14} className="filter-icon" />
            {['All', 'High', 'Medium', 'Low'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`filter-btn ${filterPriority === p ? 'active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-2 cards-grid">
          {filteredCards.length === 0 ? (
            <div className="glass-card empty-dump-card">
              <FileText size={40} className="empty-icon" />
              <h3>No Organized Cards Yet</h3>
              <p>Type messy thoughts above and click "Organize my thoughts" to generate cards.</p>
            </div>
          ) : (
            filteredCards.map((card) => (
              <div
                key={card.id}
                className={`glass-card thought-card ${card.processed ? 'processed' : ''}`}
              >
                <div className="card-top-bar">
                  {/* Interactive Priority Selector */}
                  <select 
                    value={card.priority}
                    onChange={(e) => updateCard(card.id, { priority: e.target.value })}
                    className={`priority-select priority-${card.priority.toLowerCase()}`}
                  >
                    <option value="High">🔴 High Priority</option>
                    <option value="Medium">🟡 Medium Priority</option>
                    <option value="Low">🟢 Low Priority</option>
                  </select>

                  <span className="card-time">{card.createdAt}</span>
                </div>

                {/* Inline Editable Title */}
                <div className="title-edit-container">
                  {editingCardId === card.id ? (
                    <div className="inline-edit-box">
                      <input 
                        type="text" 
                        value={editTitleText}
                        onChange={(e) => setEditTitleText(e.target.value)}
                        className="input-field inline-input"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && saveEditTitle(card.id)}
                      />
                      <button onClick={() => saveEditTitle(card.id)} className="btn-icon text-emerald" title="Save">
                        <Check size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="title-display-row">
                      <h3 className="card-thought-title">{card.title}</h3>
                      <button onClick={() => startEditTitle(card)} className="btn-icon edit-icon-btn" title="Edit title">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Interactive Meta Controls */}
                <div className="card-meta-row">
                  <div className="meta-item">
                    <Clock size={14} className="meta-icon" />
                    <input 
                      type="text" 
                      value={card.estimate}
                      onChange={(e) => updateCard(card.id, { estimate: e.target.value })}
                      className="meta-input"
                      title="Click to edit estimated time"
                    />
                  </div>
                  <div className="meta-item">
                    <Zap size={14} className="meta-icon text-amber" />
                    <input 
                      type="text" 
                      value={card.deadline}
                      onChange={(e) => updateCard(card.id, { deadline: e.target.value })}
                      className="meta-input"
                      title="Click to edit deadline"
                    />
                  </div>
                </div>

                {/* Interactive Card Actions */}
                <div className="card-actions-row">
                  <button
                    onClick={() => convertToHabit(card)}
                    className="btn btn-secondary btn-sm"
                    title="Convert into daily routine habit"
                  >
                    <Plus size={14} /> Add to Routines
                  </button>

                  <button
                    onClick={() => toggleProcessed(card.id)}
                    className={`btn-icon ${card.processed ? 'text-emerald' : ''}`}
                    title={card.processed ? 'Mark active' : 'Mark done'}
                  >
                    <CheckCircle2 size={18} />
                  </button>

                  <button
                    onClick={() => deleteCard(card.id)}
                    className="btn-icon delete-btn"
                    title="Delete card"
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
        .brain-dump-container {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #18181b;
          flex: 1;
        }

        .dump-textarea {
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.6;
          resize: vertical;
          padding: 1rem;
          background: #ffffff;
          border-color: #e4e4e7;
        }

        .action-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        .organize-btn {
          padding: 0.75rem 1.75rem;
          font-size: 0.95rem;
        }

        .organized-section {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .section-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .section-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .section-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #18181b;
        }

        .priority-filters {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .filter-icon {
          color: var(--text-muted);
          margin-right: 0.25rem;
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

        .cards-grid {
          gap: 1.25rem;
        }

        .thought-card {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #ffffff;
        }

        .thought-card.processed {
          opacity: 0.55;
          border-color: #a7f3d0;
        }

        .card-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .priority-select {
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          outline: none;
          background: #ffffff;
          border: 1px solid var(--border-color);
        }

        .priority-high { color: #e11d48; border-color: #fecdd3; background: #fff1f2; }
        .priority-medium { color: #d97706; border-color: #fde68a; background: #fffbeb; }
        .priority-low { color: #059669; border-color: #a7f3d0; background: #ecfdf5; }

        .card-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .title-edit-container {
          min-height: 38px;
          display: flex;
          align-items: center;
        }

        .title-display-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .card-thought-title {
          font-size: 1.08rem;
          font-weight: 700;
          line-height: 1.35;
          color: #18181b;
          flex: 1;
        }

        .edit-icon-btn {
          opacity: 0.4;
          transition: opacity 0.2s;
        }

        .title-display-row:hover .edit-icon-btn {
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

        .card-meta-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          padding: 0.5rem 0;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          flex: 1;
        }

        .meta-input {
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: #18181b;
          font-size: 0.82rem;
          font-weight: 600;
          width: 100%;
          padding: 0.15rem 0.35rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .meta-input:hover, .meta-input:focus {
          border-color: var(--border-color);
          background: #faf8fc;
        }

        .meta-icon {
          color: #7c3aed;
          flex-shrink: 0;
        }

        .text-amber {
          color: #d97706;
        }

        .text-emerald {
          color: #059669;
        }

        .card-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .btn-sm {
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
        }

        .delete-btn:hover {
          color: #e11d48;
        }

        .empty-dump-card {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .empty-icon {
          color: #7c3aed;
        }
      `}</style>
    </div>
  );
}
