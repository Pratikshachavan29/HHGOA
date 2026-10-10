import React, { useState } from 'react';
import { UserPlus, Sparkles, X } from 'lucide-react';

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('CS Student');
  const [avatarColor, setAvatarColor] = useState('#ec4899');
  const [avatarEmoji, setAvatarEmoji] = useState('🎓');

  if (!isOpen) return null;

  const colorOptions = [
    { color: '#ec4899', label: 'Soft Pink' },
    { color: '#8b5cf6', label: 'Muted Purple' },
    { color: '#3b82f6', label: 'Soft Blue' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#f43f5e', label: 'Powder Rose' }
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
            <UserPlus size={22} className="text-purple" />
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
          background: rgba(24, 24, 27, 0.4);
          backdrop-filter: blur(6px);
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
          background: #ffffff;
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
          color: #18181b;
          margin: 0;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .text-purple {
          color: #7c3aed;
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
          border-color: #18181b;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
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
