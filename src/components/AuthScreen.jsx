import React, { useState } from 'react';
import { 
  Sparkles, 
  LogIn, 
  UserPlus, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Check, 
  ShieldCheck, 
  Zap, 
  Brain, 
  Scale, 
  Target, 
  Play
} from 'lucide-react';

export default function AuthScreen({ onLoginSuccess, onExploreDemo }) {
  const [mode, setMode] = useState('welcome'); // 'welcome', 'login', 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('🎓');
  const [avatarColor, setAvatarColor] = useState('#ec4899');
  const [errorMessage, setErrorMessage] = useState('');

  const emojiOptions = ['🎓', '🚀', '🔬', '🎨', '💼', '⚡', '📚', '🧠', '🌟'];
  const colorOptions = [
    { color: '#ec4899', label: 'Soft Pink' },
    { color: '#8b5cf6', label: 'Muted Purple' },
    { color: '#3b82f6', label: 'Soft Blue' },
    { color: '#10b981', label: 'Emerald' },
    { color: '#f59e0b', label: 'Amber' },
    { color: '#f43f5e', label: 'Powder Rose' }
  ];

  // Helper to load accounts from localStorage
  const getRegisteredAccounts = () => {
    const saved = localStorage.getItem('lifelens_registered_accounts');
    return saved ? JSON.parse(saved) : [];
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email/username and password.');
      return;
    }

    const accounts = getRegisteredAccounts();
    const found = accounts.find(
      acc => (acc.email.toLowerCase() === email.trim().toLowerCase() || acc.name.toLowerCase() === email.trim().toLowerCase()) && acc.password === password
    );

    if (found) {
      onLoginSuccess(found, false);
    } else {
      setErrorMessage('Invalid credentials. Please check your username/email and password, or create a new account.');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full or preferred name.');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter an email/username and password.');
      return;
    }

    const accounts = getRegisteredAccounts();
    const existing = accounts.find(acc => acc.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      setErrorMessage('An account with this email/username already exists. Please sign in instead.');
      return;
    }

    const newAccount = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      password,
      role: role.trim() || 'Productivity HQ',
      avatarEmoji,
      avatarColor,
      focusAreas: [],
      targetHours: 6,
      energyBaseline: 7,
      createdAt: new Date().toISOString()
    };

    const updatedAccounts = [...accounts, newAccount];
    localStorage.setItem('lifelens_registered_accounts', JSON.stringify(updatedAccounts));

    onLoginSuccess(newAccount, false);
  };

  return (
    <div className="auth-container animate-fade-in">
      {/* Background Decor Spheres */}
      <div className="auth-glow glow-pink" />
      <div className="auth-glow glow-purple" />

      <div className="auth-wrapper">
        {/* Header Branding */}
        <div className="auth-brand-row">
          <div className="auth-logo-icon">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="auth-brand-name">LifeLens</h1>
            <span className="auth-brand-tagline">Personal Productivity & Workload HQ</span>
          </div>
        </div>

        {/* Welcome View */}
        {mode === 'welcome' && (
          <div className="glass-card auth-card animate-fade-in">
            <h2 className="auth-heading">Welcome to LifeLens</h2>
            <p className="auth-subheading">
              Organize messy thoughts, balance your workload, prevent burnout, and track daily habits in an aesthetic pastel workspace tailored to you.
            </p>

            {/* Feature Highlights Cards */}
            <div className="feature-grid">
              <div className="feature-box">
                <Brain size={18} className="text-purple" />
                <div>
                  <h4>Brain Dump & Priority</h4>
                  <p>Turn raw thoughts into prioritized tasks automatically.</p>
                </div>
              </div>

              <div className="feature-box">
                <Scale size={18} className="text-pink" />
                <div>
                  <h4>Workload Reality Check</h4>
                  <p>Detect schedule overloads based on energy levels.</p>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="auth-actions-column">
              <button 
                onClick={() => setMode('signup')} 
                className="btn btn-primary btn-lg full-width"
              >
                <UserPlus size={18} /> Create Registered Account
              </button>

              <button 
                onClick={() => setMode('login')} 
                className="btn btn-secondary btn-lg full-width"
              >
                <LogIn size={18} /> Sign In to Existing Account
              </button>

              <div className="divider-row">
                <span>OR</span>
              </div>

              <button 
                onClick={onExploreDemo} 
                className="btn btn-outline btn-lg full-width demo-btn"
              >
                <Play size={16} className="text-pink" /> Explore Demo Mode (Sample Data)
              </button>
            </div>
          </div>
        )}

        {/* Sign In View */}
        {mode === 'login' && (
          <div className="glass-card auth-card animate-fade-in">
            <div className="card-top-nav">
              <button onClick={() => setMode('welcome')} className="back-link">
                ← Back
              </button>
              <span className="badge badge-purple">Sign In</span>
            </div>

            <h2 className="auth-heading">Sign In to LifeLens</h2>
            <p className="auth-subheading">Enter your credentials to access your personal dashboard.</p>

            {errorMessage && (
              <div className="auth-error-banner animate-fade-in">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Email or Username</label>
                <input 
                  type="text" 
                  placeholder="Enter email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="eye-toggle"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg full-width margin-top-sm">
                <LogIn size={18} /> Sign In
              </button>
            </form>

            <div className="auth-switch-text">
              Don't have an account yet?{' '}
              <button onClick={() => setMode('signup')} className="text-link">
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Sign Up View */}
        {mode === 'signup' && (
          <div className="glass-card auth-card animate-fade-in">
            <div className="card-top-nav">
              <button onClick={() => setMode('welcome')} className="back-link">
                ← Back
              </button>
              <span className="badge badge-emerald">New Registration</span>
            </div>

            <h2 className="auth-heading">Create Your LifeLens Account</h2>
            <p className="auth-subheading">Setup your account — your name will be used throughout LifeLens.</p>

            {errorMessage && (
              <div className="auth-error-banner animate-fade-in">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="auth-form">
              <div className="form-group">
                <label>Full Name / Preferred Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Pratiksha Chavan, Jordan Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  autoFocus
                  required
                />
              </div>

              <div className="form-group">
                <label>Email or Username *</label>
                <input 
                  type="text" 
                  placeholder="e.g. pratiksha@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password *</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="eye-toggle"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Role / Major / Focus (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Software Engineer, Student, Researcher"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Choose Avatar & Accent Color</label>
                <div className="emoji-grid-sm">
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

              <button type="submit" className="btn btn-primary btn-lg full-width margin-top-sm">
                <UserPlus size={18} /> Register & Launch LifeLens
              </button>
            </form>

            <div className="auth-switch-text">
              Already registered?{' '}
              <button onClick={() => setMode('login')} className="text-link">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .auth-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf8fc;
          position: relative;
          overflow: hidden;
          padding: 1.5rem;
        }

        .auth-glow {
          position: absolute;
          width: 450px;
          height: 450px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.35;
          pointer-events: none;
        }

        .glow-pink {
          top: -100px;
          left: -100px;
          background: #f472b6;
        }

        .glow-purple {
          bottom: -100px;
          right: -100px;
          background: #c084fc;
        }

        .auth-wrapper {
          width: 100%;
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 10;
        }

        .auth-brand-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          justify-content: center;
          text-align: left;
        }

        .auth-logo-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(236, 72, 153, 0.3);
        }

        .auth-brand-name {
          font-size: 1.6rem;
          font-weight: 800;
          color: #18181b;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .auth-brand-tagline {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .auth-card {
          padding: 2.25rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.08);
          border: 1px solid #e9d5ff;
        }

        .flex-center {
          display: flex;
          align-items: center;
        }

        .gap-1 { gap: 0.4rem; }

        .auth-heading {
          font-size: 1.5rem;
          font-weight: 800;
          color: #18181b;
          margin: 0;
        }

        .auth-subheading {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .feature-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .feature-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          background: #faf8fc;
          border-radius: var(--radius-md);
          border: 1px solid #e9d5ff;
        }

        .feature-box h4 {
          font-size: 0.88rem;
          font-weight: 700;
          color: #18181b;
          margin: 0 0 0.15rem;
        }

        .feature-box p {
          font-size: 0.76rem;
          color: var(--text-muted);
          margin: 0;
        }

        .auth-actions-column {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .full-width {
          width: 100%;
        }

        .btn-lg {
          padding: 0.85rem 1.25rem;
          font-size: 0.95rem;
          border-radius: var(--radius-md);
        }

        .btn-outline {
          background: #ffffff;
          border: 1px solid #e4e4e7;
          color: #18181b;
        }

        .btn-outline:hover {
          background: #fdf2f8;
          border-color: #fbcfe8;
        }

        .divider-row {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin: 0.25rem 0;
        }

        .divider-row::before, .divider-row::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e4e4e7;
        }

        .divider-row span {
          padding: 0 0.75rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .card-top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-link {
          background: none;
          border: none;
          color: #7c3aed;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .eye-toggle {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .auth-error-banner {
          padding: 0.75rem 1rem;
          background: #fff1f2;
          border: 1px solid #fecdd3;
          border-radius: var(--radius-md);
          color: #e11d48;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .emoji-grid-sm {
          display: grid;
          grid-template-columns: repeat(9, 1fr);
          gap: 0.3rem;
          margin: 0.35rem 0 0.5rem;
        }

        .margin-top-sm {
          margin-top: 0.5rem;
        }

        .auth-switch-text {
          text-align: center;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .text-link {
          background: none;
          border: none;
          color: #7c3aed;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
