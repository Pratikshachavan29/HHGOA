import React, { useState, useEffect } from 'react';
import { Settings, X, Check, User, Sparkles, Sliders, Layers } from 'lucide-react';

export default function UserSettingsModal({ isOpen, onClose, activeUser, onSaveUser }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatarColor, setAvatarColor] = useState('#ec4899');
  const [avatarEmoji, setAvatarEmoji] = useState('🎓');
  const [focusAreas, setFocusAreas] = useState([]);
  const [targetHours, setTargetHours] = useState(6);
  const [energyBaseline, setEnergyBaseline] = useState(7);

  useEffect(() => {
    if (activeUser) {
      setName(activeUser.name || '');
      setRole(activeUser.role || '');
      setAvatarColor(activeUser.avatarColor || '#ec4899');
      setAvatarEmoji(activeUser.avatarEmoji || '🎓');
      setFocusAreas(activeUser.focusAreas || []);
      setTargetHours(activeUser.targetHours || 6);
      setEnergyBaseline(activeUser.energyBaseline || 7);
    }
  }, [activeUser, isOpen]);

  if (!isOpen || !activeUser) return null;

  const roleSuggestions = ['Student', 'Researcher', 'Developer', 'Creative', 'Freelancer', 'Professional', 'General Productivity'];

  const availableFocusAreas = [
    { id: 'Academics', label: 'Academics & Study', icon: '📚' },
    { id: 'Tech', label: 'Coding & Tech Prep', icon: '💻' },
    { id: 'Projects', label: 'Project Milestones', icon: '🚀' },
    { id: 'Career', label: 'Career & Applications', icon: '💼' },
    { id: 'Wellness', label: 'Health & Wellness', icon: '🌱' },
    { id: 'SelfCare', label: 'Self Care & Routines', icon: '⚡' }
  ];

  const colorOptions = [
    { color: '#ec4899', label: 'Soft Pink' },
    { color: '#8b5cf6', label: 'Muted Purple' },
    { color: '#3b82f6', label: 'Soft Blue' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#f43f5e', label: 'Powder Rose' }
  ];

  const emojiOptions = ['🎓', '🔬', '💻', '🚀', '🎨', '💼', '⚡', '📚', '🧠', '🌟'];

  const toggleFocusArea = (areaId) => {
    if (focusAreas.includes(areaId)) {
      setFocusAreas(focusAreas.filter(a => a !== areaId));
    } else {
      setFocusAreas([...focusAreas, areaId]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveUser({
      ...activeUser,
      name: name.trim(),
      role: role.trim() || 'Productivity HQ',
      avatarColor,
      avatarEmoji,
      focusAreas,
      targetHours,
      energyBaseline
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-card animate-fade-in">
        <div className="modal-header">
          <div className="modal-title-group">
            <Settings size={22} className="text-purple" />
            <div>
              <h2 className="modal-title">Profile & Preferences Settings</h2>
              <span className="modal-sub">Customized preferences for {activeUser.name}</span>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon" title="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-form">
          {/* Section 1: User Identity */}
          <div className="form-section">
            <h3 className="section-label"><User size={15} /> User Identity</h3>
            <div className="form-group">
              <label>Full Name / Preferred Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label>Role / Focus Area (Optional - Choose or Type)</label>
              <input 
                type="text" 
                placeholder="e.g. Student, Researcher, Designer, Developer"
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
          </div>

          {/* Section 2: Visual Profile Customization */}
          <div className="form-section">
            <h3 className="section-label"><Sparkles size={15} /> Avatar & Theme Accent</h3>
            <div className="form-group">
              <label>Choose Avatar Icon</label>
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
            </div>

            <div className="form-group">
              <label>Profile Accent Color</label>
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
          </div>

          {/* Section 3: Optional Focus Area Preferences (Multi-Select) */}
          <div className="form-section">
            <h3 className="section-label"><Layers size={15} /> Optional Focus Areas (Select Multiple)</h3>
            <p className="section-desc">Toggle the areas relevant to your routine. You can skip any options.</p>
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

          {/* Section 4: Target Hours & Energy Baseline */}
          <div className="form-section">
            <h3 className="section-label"><Sliders size={15} /> Optional Baseline Capacity Settings</h3>
            <div className="grid-2 capacity-grid">
              <div className="form-group">
                <label>Daily Focus Hours Target: <strong>{targetHours}h</strong></label>
                <input 
                  type="range" 
                  min="1" 
                  max="14" 
                  value={targetHours}
                  onChange={(e) => setTargetHours(Number(e.target.value))}
                  className="input-slider"
                />
              </div>

              <div className="form-group">
                <label>Typical Energy Baseline: <strong>{energyBaseline}/10</strong></label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={energyBaseline}
                  onChange={(e) => setEnergyBaseline(Number(e.target.value))}
                  className="input-slider slider-energy"
                />
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} /> Save Preferences
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
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 2rem;
          background: #ffffff;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .modal-title-group {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #18181b;
          margin: 0;
        }

        .modal-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: #faf8fc;
          padding: 1.1rem;
          border-radius: var(--radius-md);
          border: 1px solid #e9d5ff;
        }

        .section-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #7c3aed;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .section-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .chip-flex {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.35rem;
        }

        .chip-btn {
          font-size: 0.75rem;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-full);
          background: #ffffff;
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
          grid-template-columns: repeat(10, 1fr);
          gap: 0.35rem;
          margin-top: 0.35rem;
        }

        .emoji-btn {
          font-size: 1.15rem;
          padding: 0.35rem;
          border-radius: var(--radius-md);
          background: #ffffff;
          border: 1px solid #e4e4e7;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .emoji-btn.active {
          background: #f3e8ff;
          border-color: #e9d5ff;
          box-shadow: 0 0 6px rgba(124, 58, 237, 0.2);
        }

        .color-picker-flex {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.35rem;
        }

        .color-dot {
          width: 30px;
          height: 30px;
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
          gap: 0.6rem;
        }

        .focus-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.85rem;
          border-radius: var(--radius-md);
          background: #ffffff;
          border: 1px solid #e4e4e7;
          color: #18181b;
          font-size: 0.82rem;
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

        .capacity-grid {
          gap: 1rem;
        }

        .input-slider {
          width: 100%;
          accent-color: #7c3aed;
        }

        .slider-energy {
          accent-color: #ec4899;
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
