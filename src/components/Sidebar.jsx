import React from 'react';
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
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, theme, toggleTheme }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'habits', label: 'Habits Tracker', icon: CheckSquare, badge: 'Daily' },
    { id: 'mood', label: 'Mood & Energy', icon: Smile, badge: null },
    { id: 'goals', label: 'Life Goals', icon: Target, badge: null },
    { id: 'focus', label: 'Focus Timer', icon: Timer, badge: 'Pomo' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="brand-icon-wrapper">
          <Sparkles className="brand-icon" size={24} />
        </div>
        <div className="brand-text">
          <h1 className="brand-title">LifeLens</h1>
          <span className="brand-subtitle">Personal HQ</span>
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
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer / Theme Toggle */}
      <div className="sidebar-footer">
        <div className="user-profile-card">
          <div className="avatar">
            <Zap size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Alex Rivera</span>
            <span className="user-tier">Pro Life Plan</span>
          </div>
        </div>

        <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>

      <style>{`
        .sidebar-container {
          width: 260px;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          height: 100vh;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.5rem 0.75rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.25rem;
        }

        .brand-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
          display: block;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-md);
          background: transparent;
          color: var(--text-muted);
          border: 1px solid transparent;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          transition: all var(--transition-fast);
          text-align: left;
          width: 100%;
        }

        .nav-item:hover {
          color: var(--text-main);
          background: var(--bg-glass);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          color: #ffffff;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%);
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.15);
        }

        .nav-item.active .nav-icon {
          color: #818cf8;
        }

        .nav-badge {
          margin-left: auto;
          font-size: 0.65rem;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background: rgba(99, 102, 241, 0.2);
          color: #a5b4fc;
          font-weight: 700;
        }

        .sidebar-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .user-profile-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 0.75rem;
          background: rgba(0, 0, 0, 0.15);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          background: var(--gradient-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .user-tier {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.65rem;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-main);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-primary);
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
