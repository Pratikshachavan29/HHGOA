import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Smile, 
  Target, 
  Timer, 
  BarChart3, 
  Sun, 
  Moon, 
  Sparkles,
  ChevronUp,
  UserPlus,
  Check,
  Brain,
  Flame
} from 'lucide-react';
import AddUserModal from './AddUserModal';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  theme, 
  toggleTheme,
  users,
  currentUserId,
  switchUser,
  addUser
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const activeUser = users.find(u => u.id === currentUserId) || users[0] || {
    name: 'Priya',
    role: 'CS Student',
    avatarColor: '#ec4899',
    avatarEmoji: '🎓'
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'brainDump', label: 'Brain Dump', icon: Brain, badge: 'Quick' },
    { id: 'smartPriority', label: 'Smart Priority', icon: Flame, badge: 'Focus' },
    { id: 'habits', label: 'Daily Routines', icon: CheckSquare, badge: 'Study' },
    { id: 'mood', label: 'Vibe & Energy', icon: Smile, badge: null },
    { id: 'goals', label: 'Projects & Deadlines', icon: Target, badge: null },
    { id: 'focus', label: 'Focus Sprints', icon: Timer, badge: '25m' },
    { id: 'analytics', label: 'My Progress', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-icon-wrapper">
          <Sparkles className="brand-icon" size={22} />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">LifeLens</h1>
          <span className="brand-subtitle">Productivity & Life HQ</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={19} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Switcher & Theme Footer */}
      <div className="sidebar-footer">
        {/* User Profile Selector Card */}
        <div className="user-profile-wrapper">
          <button 
            onClick={() => setShowUserDropdown(!showUserDropdown)} 
            className="user-profile-card interactive"
            title="Click to switch or add profile"
          >
            <div className="avatar" style={{ background: activeUser.avatarColor || '#ec4899' }}>
              <span>{activeUser.avatarEmoji || '🎓'}</span>
            </div>
            <div className="user-info">
              <span className="user-name">{activeUser.name}</span>
              <span className="user-tier">{activeUser.role}</span>
            </div>
            <ChevronUp size={16} className={`chevron-icon ${showUserDropdown ? 'open' : ''}`} />
          </button>

          {/* Switch User Dropdown */}
          {showUserDropdown && (
            <div className="user-dropdown-popover glass-card animate-fade-in">
              <div className="dropdown-header">
                <span>Switch Student Profile</span>
              </div>

              <div className="user-list">
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserDropdown(false);
                    }}
                    className={`user-option ${u.id === currentUserId ? 'active' : ''}`}
                  >
                    <div className="avatar-sm" style={{ background: u.avatarColor || '#ec4899' }}>
                      {u.avatarEmoji || '🎓'}
                    </div>
                    <div className="user-option-info">
                      <span className="u-name">{u.name}</span>
                      <span className="u-role">{u.role}</span>
                    </div>
                    {u.id === currentUserId && <Check size={14} className="check-icon" />}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => {
                  setShowUserDropdown(false);
                  setShowAddUserModal(true);
                }} 
                className="add-user-btn"
              >
                <UserPlus size={16} />
                <span>Add New Profile</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Light Theme' : 'Soft Theme'}</span>
        </button>
      </div>

      {/* Add User Modal */}
      <AddUserModal 
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddUser={addUser}
      />

      <style>{`
        .sidebar-container {
          width: 250px;
          background: #ffffff;
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.02);
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.25rem 0.5rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }

        .brand-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.25);
        }

        .brand-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #18181b;
        }

        .brand-subtitle {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          display: block;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 0.9rem;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-muted);
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all var(--transition-fast);
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          color: var(--text-main);
          background: #fdf2f8;
          border-color: #fbcfe8;
        }

        .nav-item.active {
          color: var(--accent-purple);
          background: #f3e8ff;
          border-color: #e9d5ff;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.08);
        }

        .nav-item.active .nav-icon {
          color: var(--accent-purple);
        }

        .nav-badge {
          margin-left: auto;
          font-size: 0.65rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: #fce7f3;
          color: #db2777;
          font-weight: 700;
        }

        .sidebar-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .user-profile-wrapper {
          position: relative;
        }

        .user-profile-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: #f8fafc;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          width: 100%;
          text-align: left;
          color: inherit;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .user-profile-card:hover {
          background: #f3e8ff;
          border-color: #e9d5ff;
        }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
          color: white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-tier {
          font-size: 0.7rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chevron-icon {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .chevron-icon.open {
          transform: rotate(180deg);
        }

        /* User Dropdown Popover */
        .user-dropdown-popover {
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          margin-bottom: 0.5rem;
          padding: 0.75rem;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          box-shadow: var(--shadow-lg);
          border-color: #e9d5ff;
          background: #ffffff;
        }

        .dropdown-header {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.4rem;
        }

        .user-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          max-height: 180px;
          overflow-y: auto;
        }

        .user-option {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 0.6rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-fast);
          width: 100%;
          text-align: left;
        }

        .user-option:hover {
          background: #fdf2f8;
        }

        .user-option.active {
          background: #f3e8ff;
          border-color: #e9d5ff;
        }

        .avatar-sm {
          width: 26px;
          height: 26px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          flex-shrink: 0;
          color: white;
        }

        .user-option-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .u-name {
          font-size: 0.82rem;
          font-weight: 700;
        }

        .u-role {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .check-icon {
          color: var(--accent-purple);
        }

        .add-user-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.55rem;
          border-radius: var(--radius-md);
          background: var(--gradient-btn-primary);
          color: white;
          border: none;
          font-weight: 600;
          font-size: 0.82rem;
          cursor: pointer;
          transition: opacity var(--transition-fast);
          margin-top: 0.25rem;
        }

        .add-user-btn:hover {
          opacity: 0.95;
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.6rem;
          background: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          background: #f3e8ff;
          border-color: #e9d5ff;
          color: var(--accent-purple);
        }

        @media (max-width: 768px) {
          .sidebar-container {
            width: 100%;
            height: auto;
            position: relative;
            padding: 1rem;
          }
          .nav-menu {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .nav-item {
            padding: 0.5rem 0.85rem;
            white-space: nowrap;
          }
          .nav-badge, .sidebar-footer {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
