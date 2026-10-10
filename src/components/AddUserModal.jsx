import React, { useState } from 'react';
import { UserPlus, Sparkles, X, Check, Layers, CheckSquare, Target, HelpCircle } from 'lucide-react';

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState(''); // No pre-selected default! User chooses or types
  const [avatarColor, setAvatarColor] = useState('#ec4899');
  const [avatarEmoji, setAvatarEmoji] = useState('🎓');
  const [focusAreas, setFocusAreas] = useState([]);
  
  // Optional routine & goal enrollments - NONE pre-selected by default!
  const [enrolledRoutines, setEnrolledRoutines] = useState([]);
  const [enrolledGoals, setEnrolledGoals] = useState([]);

  if (!isOpen) return null;

  const roleSuggestions = ['Student', 'Researcher', 'Developer', 'Creative', 'Freelancer', 'Professional', 'Productivity HQ'];

  const availableFocusAreas = [
    { id: 'Academics', label: 'Academics & Study', icon: '📚' },
    { id: 'Tech', label: 'Coding & Tech Prep', icon: '💻' },
    { id: 'Projects', label: 'Project Milestones', icon: '🚀' },
    { id: 'Career', label: 'Career & Applications', icon: '💼' },
    { id: 'Wellness', label: 'Health & Wellness', icon: '🌱' },
    { id: 'SelfCare', label: 'Self Care & Routines', icon: '⚡' }
  ];

  const optionalRoutineTemplates = [
    { id: 'r1', name: 'Solve 1 Prep / Tech Problem', category: 'Prep & Work' },
    { id: 'r2', name: 'Review Daily Notes & Core Material', category: 'Academics' },
    { id: 'r3', name: 'Work on Project Milestone Draft', category: 'Projects' },
    { id: 'r4', name: 'Hydrate & 15m Refreshing Walk', category: 'Self Care' },
    { id: 'r5', name: 'Read 20 Minutes of Focused Material', category: 'Mindset' },
  ];

  const optionalGoalTemplates = [
    { id: 'g1', title: 'Land Target Role or Summer Internship', category: 'Career & Jobs' },
    { id: 'g2', title: 'Complete Major Project Milestone Phase 1', category: 'Projects' },
    { id: 'g3', title: 'Maintain Top GPA & Consistency Rating', category: 'Academics' },
  ];

  const colorOptions = [
    { color: '#ec4899', label: 'Soft Pink' },
    { color: '#8b5cf6', label: 'Muted Purple' },
    { color: '#3b82f6', label: 'Soft Blue' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#f43f5e', label: 'Powder Rose' }
  ];

  const emojiOptions = ['🎓', '🚀', '🔬', '🎨', '💼', '⚡', '📚', '🧠', '🌟'];

  const toggleFocusArea = (areaId) => {
    if (focusAreas.includes(areaId)) {
      setFocusAreas(focusAreas.filter(a => a !== areaId));
    } else {
      setFocusAreas([...focusAreas, areaId]);
    }
  };

  const toggleRoutineEnrollment = (rId) => {
    if (enrolledRoutines.includes(rId)) {
      setEnrolledRoutines(enrolledRoutines.filter(id => id !== rId));
    } else {
      setEnrolledRoutines([...enrolledRoutines, rId]);
    }
  };

  const toggleGoalEnrollment = (gId) => {
    if (enrolledGoals.includes(gId)) {
      setEnrolledGoals(enrolledGoals.filter(id => id !== gId));
    } else {
      setEnrolledGoals([...enrolledGoals, gId]);
    }
  };

  const handleSubmit = (e, skipOptional = false) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;

    // Filter enrolled routines & goals
    const initialHabits = skipOptional ? [] : optionalRoutineTemplates
      .filter(r => enrolledRoutines.includes(r.id))
      .map((r, idx) => ({
        id: Date.now() + idx,
        name: r.name,
        category: r.category,
        streak: 1,
        completedToday: false,
        weekly: [false, false, false, false, false, false, false]
      }));

    const initialGoals = skipOptional ? [] : optionalGoalTemplates
      .filter(g => enrolledGoals.includes(g.id))
      .map((g, idx) => ({
        id: Date.now() + idx + 10,
        title: g.title,
        category: g.category,
        targetDate: 'Next Month',
        progress: 10
      }));

    onAddUser({
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim() || 'Productivity HQ',
      avatarColor,
      avatarEmoji,
      focusAreas: skipOptional ? [] : focusAreas,
      targetHours: 6,
      energyBaseline: 7,
      initialHabits,
      initialGoals
    });

    setName('');
    setRole('');
    setFocusAreas([]);
    setEnrolledRoutines([]);
    setEnrolledGoals([]);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-card animate-fade-in">
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={22} className="text-purple" />
            <div>
              <h2 className="modal-title">Create Profile & Onboarding</h2>
              <span className="modal-sub">Custom options — skip any optional selections</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon" title="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="modal-form">
          <div className="form-group">
            <label>Full Name / Preferred Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Alex Chen, Jordan Taylor" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label>Choose Your Role / Focus (Optional — Unselected by default)</label>
            <input 
              type="text" 
              placeholder="Select option below or type custom role..." 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            />
            <div className="chip-flex">
              {roleSuggestions.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`chip-btn ${role === r ? 'active' : ''}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Avatar Icon & Color Accent</label>
            <div className="emoji-grid">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatarEmoji(emoji)}
                  className={`emoji-btn ${avatarEmoji === emoji ? 'active' : ''}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <div className="color-picker-flex">
              {colorOptions.map((opt) => (
                <button
                  key={opt.color}
                  type="button"
                  onClick={() => setAvatarColor(opt.color)}
                  className={`color-dot ${avatarColor === opt.color ? 'active' : ''}`}
                  style={{ background: opt.color }}
                  title={opt.label}
                />
              ))}
            </div>
          </div>

          {/* Multi-Select Optional Focus Areas */}
          <div className="form-group">
            <label>Optional Focus Areas (Multi-Select)</label>
            <p className="sub-label-text">Select options or leave unselected to skip</p>
            <div className="focus-grid">
              {availableFocusAreas.map((item) => {
                const isSelected = focusAreas.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleFocusArea(item.id)}
                    className={`focus-chip ${isSelected ? 'selected' : ''}`}
                  >
                    <span className="focus-icon">{item.icon}</span>
                    <span className="focus-text">{item.label}</span>
                    {isSelected && <Check size={14} className="focus-check" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Multi-Select Optional Routine Enrollment */}
          <div className="form-group">
            <label><CheckSquare size={14} className="inline-icon" /> Optional Routine Enrollment (Multi-Select)</label>
            <p className="sub-label-text">Select routines to enroll in immediately (Unselected by default)</p>
            <div className="routine-enroll-list">
              {optionalRoutineTemplates.map((r) => {
                const isEnrolled = enrolledRoutines.includes(r.id);
                return (
                  <div 
                    key={r.id} 
                    onClick={() => toggleRoutineEnrollment(r.id)} 
                    className={`enroll-item ${isEnrolled ? 'enrolled' : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isEnrolled} 
                      onChange={() => {}} 
                    />
                    <span className="r-title">{r.name}</span>
                    <span className="r-tag">{r.category}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Multi-Select Optional Goal Enrollment */}
          <div className="form-group">
            <label><Target size={14} className="inline-icon" /> Optional Goal Enrollment (Multi-Select)</label>
            <div className="routine-enroll-list">
              {optionalGoalTemplates.map((g) => {
                const isEnrolled = enrolledGoals.includes(g.id);
                return (
                  <div 
                    key={g.id} 
                    onClick={() => toggleGoalEnrollment(g.id)} 
                    className={`enroll-item ${isEnrolled ? 'enrolled' : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={isEnrolled} 
                      onChange={() => {}} 
                    />
                    <span className="r-title">{g.title}</span>
                    <span className="r-tag">{g.category}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-buttons">
            <button 
              type="button" 
              onClick={(e) => handleSubmit(e, true)} 
              className="btn btn-secondary btn-sm"
              disabled={!name.trim()}
              title="Skip all optional selections (start with a clean profile)"
            >
              Skip Optional Selections
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} /> Create Profile
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(24, 24, 27, 0.45);
          backdrop-filter: blur(6px);
          z-index: 250;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          background: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.85rem;
        }

        .modal-title-group {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #18181b;
          margin: 0;
        }

        .modal-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .text-purple {
          color: #7c3aed;
        }

        .sub-label-text {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }

        .inline-icon {
          vertical-align: middle;
          margin-right: 0.3rem;
          color: #7c3aed;
        }

        .chip-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.4rem;
        }

        .chip-btn {
          font-size: 0.75rem;
          padding: 0.28rem 0.6rem;
          border-radius: var(--radius-full);
          background: #faf8fc;
          border: 1px solid #e4e4e7;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chip-btn:hover {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .chip-btn.active {
          background: #7c3aed;
          color: white;
          border-color: #7c3aed;
        }

        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 0.35rem;
          margin-top: 0.35rem;
          margin-bottom: 0.5rem;
        }

        .emoji-btn {
          font-size: 1.15rem;
          padding: 0.35rem;
          border-radius: var(--radius-md);
          background: #faf8fc;
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .emoji-btn:hover {
          background: #f3e8ff;
        }

        .emoji-btn.active {
          background: #f3e8ff;
          border-color: #e9d5ff;
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.2);
        }

        .color-picker-flex {
          display: flex;
          gap: 0.75rem;
        }

        .color-dot {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-full);
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .color-dot.active {
          border-color: #18181b;
          transform: scale(1.1);
        }

        .focus-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .focus-chip {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          background: #faf8fc;
          border: 1px solid #e4e4e7;
          color: #18181b;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .focus-chip:hover {
          background: #fdf2f8;
          border-color: #fbcfe8;
        }

        .focus-chip.selected {
          background: #f3e8ff;
          border-color: #e9d5ff;
          color: #7c3aed;
        }

        .focus-check {
          margin-left: auto;
          color: #7c3aed;
        }

        .routine-enroll-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .enroll-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.75rem;
          border-radius: var(--radius-md);
          background: #faf8fc;
          border: 1px solid #e4e4e7;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.2s ease;
        }

        .enroll-item:hover {
          background: #f3e8ff;
        }

        .enroll-item.enrolled {
          background: #f3e8ff;
          border-color: #e9d5ff;
        }

        .r-title {
          font-weight: 600;
          color: #18181b;
          flex: 1;
        }

        .r-tag {
          font-size: 0.68rem;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
          background: #ffffff;
          color: var(--text-muted);
          border: 1px solid #e4e4e7;
        }

        .modal-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.75rem;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
