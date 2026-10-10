import React, { useState } from 'react';
import { UserPlus, Sparkles, X } from 'lucide-react';

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('CS Student');
  const [avatarColor, setAvatarColor] = useState('#6366f1');
  const [avatarEmoji, setAvatarEmoji] = useState('🎓');

  if (!isOpen) return null;

  const colorOptions = [
    { color: '#6366f1', label: 'Indigo' },
    { color: '#8b5cf6', label: 'Purple' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#f43f5e', label: 'Rose' },
    { color: '#06b6d4', label: 'Cyan' }
  ];

  const emojiOptions = ['🎓', '🚀', '🔬', '🎨', '💼', '⚡', '📚', '🧠'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddUser({
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim() || 'Student',
      avatarColor,
      avatarEmoji
    });

    setName('');
    setRole('CS Student');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-card animate-fade-in">
        <div className="modal-header">
          <div className="modal-title-group">
            <UserPlus size={22} className="text-indigo" />
            <h2 className="modal-title">Create New User Profile</h2>
          </div>
          <button onClick={onClose} className="btn-icon" title="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Full Name / Preferred Name</label>
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
            <label>Major / Role</label>
            <input 
              type="text" 
              placeholder="e.g. CS Student, Data Science Major, Pre-Med" 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            />
          </div>

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
            <label>Choose Profile Theme Color</label>
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

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} /> Create & Switch Profile
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 460px;
          padding: 2rem;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .modal-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin: 0;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .text-indigo {
          color: var(--accent-primary);
        }

        .emoji-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 0.4rem;
          margin-top: 0.35rem;
        }

        .emoji-btn {
          font-size: 1.25rem;
          padding: 0.4rem;
          border-radius: var(--radius-md);
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .emoji-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .emoji-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: var(--accent-primary);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }

        .color-picker-flex {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.35rem;
        }

        .color-dot {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .color-dot:hover {
          transform: scale(1.15);
        }

        .color-dot.active {
          border-color: white;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
          transform: scale(1.1);
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }
      `}</style>
    </div>
  );
}
