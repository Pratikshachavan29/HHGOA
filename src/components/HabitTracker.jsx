import React, { useState } from 'react';
import { 
  Plus, 
  Check, 
  Trash2, 
  Flame, 
  Calendar, 
  Tag, 
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export default function HabitTracker({ habits, toggleHabit, addHabit, deleteHabit }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Academics');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Academics', 'Prep & Work', 'Projects', 'Self Care', 'Personal'];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    addHabit({
      name: newHabitName.trim(),
      category: newHabitCategory,
      streak: 1,
      completedToday: false,
      weekly: [true, false, true, true, false, false, false]
    });
    setNewHabitName('');
    setShowAddModal(false);
  };

  const filteredHabits = habits.filter(h => {
    const matchesCategory = selectedCategory === 'All' || h.category === selectedCategory;
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="habit-tracker-container animate-fade-in">
      {/* Header & Actions */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Daily Student Routines & Tasks</h1>
          <p className="page-subtitle">Stay on top of assignments, interview prep, and self-care without burning out</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus size={18} /> Add Task / Routine
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card filter-card">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search assignments or habits..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field search-input"
          />
        </div>
      </div>

      {/* Habits Grid / Matrix */}
      <div className="habits-list">
        {filteredHabits.length === 0 ? (
          <div className="glass-card empty-state-card">
            <BookOpen size={40} className="empty-icon" />
            <h3>No Tasks Found</h3>
            <p>Add your first study goal, LeetCode problem, or lab report routine.</p>
          </div>
        ) : (
          filteredHabits.map((habit) => (
            <div key={habit.id} className="glass-card habit-card">
              <div className="habit-header-row">
                <div className="habit-info">
                  <span className={`badge badge-category badge-${habit.category.toLowerCase().replace(/[^a-z0-9]/g, '')}`}>
                    {habit.category}
                  </span>
                  <h3 className="habit-title">{habit.name}</h3>
                </div>

                <div className="habit-actions">
                  <div className="streak-indicator">
                    <Flame size={16} className="flame-icon" />
                    <span>{habit.streak} day streak</span>
                  </div>
                  <button 
                    onClick={() => deleteHabit(habit.id)} 
                    className="btn-icon delete-btn" 
                    title="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Weekly Tracker Bubbles */}
              <div className="weekly-matrix">
                <span className="matrix-label">This Week's Progress:</span>
                <div className="days-row">
                  {daysOfWeek.map((day, idx) => {
                    const isToday = idx === 3; // Example today is Thursday
                    const isCompleted = isToday ? habit.completedToday : habit.weekly[idx];

                    return (
                      <div key={day} className="day-col">
                        <span className="day-name">{day}</span>
                        <button
                          onClick={() => isToday && toggleHabit(habit.id)}
                          disabled={!isToday}
                          className={`day-bubble ${isCompleted ? 'checked' : ''} ${isToday ? 'today' : ''}`}
                        >
                          {isCompleted && <Check size={14} />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for adding habit */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-card animate-fade-in">
            <h2 className="modal-title">Add Student Task / Habit</h2>
            <form onSubmit={handleCreate} className="modal-form">
              <div className="form-group">
                <label>Task / Habit Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Solve 1 LeetCode problem, Submit Lab Report, 20m Workout" 
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="input-field"
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select 
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value)}
                  className="select-field"
                >
                  <option value="Academics">Academics</option>
                  <option value="Prep & Work">Prep & Work</option>
                  <option value="Projects">Projects</option>
                  <option value="Self Care">Self Care</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Routine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .habit-tracker-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #18181b;
        }

        .page-subtitle {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .filter-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          flex-wrap: wrap;
          background: #ffffff;
        }

        .category-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .pill-btn {
          padding: 0.45rem 0.9rem;
          border-radius: var(--radius-full);
          background: #ffffff;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pill-btn:hover {
          color: var(--text-main);
          border-color: #fbcfe8;
          background: #fdf2f8;
        }

        .pill-btn.active {
          background: var(--gradient-btn-primary);
          color: white;
          border-color: transparent;
        }

        .search-box {
          position: relative;
          width: 260px;
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          padding-left: 2.25rem;
          font-size: 0.85rem;
          background: #ffffff;
        }

        .habits-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .habit-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #ffffff;
        }

        .habit-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .habit-info {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .habit-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #18181b;
        }

        .badge-category {
          width: max-content;
        }

        .badge-academics { background: #f3e8ff; color: #7c3aed; border: 1px solid #e9d5ff; }
        .badge-prepwork { background: #fffbeb; color: #d97706; border: 1px solid #fde68a; }
        .badge-projects { background: #fce7f3; color: #ec4899; border: 1px solid #fbcfe8; }
        .badge-selfcare { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
        .badge-personal { background: #fff1f2; color: #e11d48; border: 1px solid #fecdd3; }

        .habit-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .streak-indicator {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: var(--radius-full);
          color: #d97706;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .flame-icon {
          animation: pulse 1.5s infinite;
        }

        .delete-btn:hover {
          color: #e11d48;
        }

        .weekly-matrix {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .matrix-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .days-row {
          display: flex;
          gap: 0.75rem;
        }

        .day-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .day-name {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .day-bubble {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .day-bubble.today {
          border-color: #8b5cf6;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
        }

        .day-bubble.checked {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: transparent;
        }

        .empty-state-card {
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

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(24, 24, 27, 0.5);
          backdrop-filter: blur(6px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 440px;
          padding: 2rem;
          background: #ffffff;
        }

        .modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
          color: #18181b;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
