import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer as TimerIcon, 
  Coffee, 
  Zap, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function FocusTimer({ addFocusMinutes }) {
  const modes = [
    { label: 'Deep Focus', minutes: 25, type: 'focus', icon: Zap },
    { label: 'Short Break', minutes: 5, type: 'break', icon: Coffee },
    { label: 'Long Break', minutes: 15, type: 'longBreak', icon: Coffee }
  ];

  const [currentMode, setCurrentMode] = useState(modes[0]);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusTask, setFocusTask] = useState('');
  const [completedSessions, setCompletedSessions] = useState(3);

  useEffect(() => {
    setTimeLeft(currentMode.minutes * 60);
    setIsRunning(false);
  }, [currentMode]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (currentMode.type === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        addFocusMinutes(currentMode.minutes);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentMode, addFocusMinutes]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(currentMode.minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((currentMode.minutes * 60 - timeLeft) / (currentMode.minutes * 60)) * 100;

  return (
    <div className="focus-timer-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Pomodoro Focus Timer</h1>
          <p className="page-subtitle">Boost productivity with time-boxed focus sprints and structured breaks</p>
        </div>
      </div>

      <div className="glass-card timer-main-card">
        {/* Mode Selector */}
        <div className="timer-modes">
          {modes.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.label}
                onClick={() => setCurrentMode(m)}
                className={`mode-btn ${currentMode.label === m.label ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{m.label} ({m.minutes}m)</span>
              </button>
            );
          })}
        </div>

        {/* Task Binder Input */}
        <div className="task-input-wrapper">
          <input 
            type="text" 
            placeholder="Target focus task (e.g. Finish LifeLens UI components)..." 
            value={focusTask}
            onChange={(e) => setFocusTask(e.target.value)}
            className="input-field task-input"
          />
        </div>

        {/* Countdown Display */}
        <div className="timer-display-ring">
          <svg className="timer-svg" viewBox="0 0 100 100">
            <circle className="timer-circle-bg" cx="50" cy="50" r="44" />
            <circle 
              className="timer-circle-progress" 
              cx="50" 
              cy="50" 
              r="44" 
              style={{ strokeDashoffset: 276 - (276 * progressPercentage) / 100 }}
            />
          </svg>
          <div className="timer-clock">
            <span className="clock-digits">{formatTime(timeLeft)}</span>
            <span className="clock-mode-label">{currentMode.label}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="timer-controls">
          <button onClick={toggleTimer} className={`btn btn-lg ${isRunning ? 'btn-pause' : 'btn-primary'}`}>
            {isRunning ? <Pause size={22} /> : <Play size={22} />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button onClick={resetTimer} className="btn btn-secondary btn-icon-lg" title="Reset Timer">
            <RotateCcw size={20} />
          </button>
        </div>

        {/* Session Stats */}
        <div className="timer-stats-footer">
          <div className="stat-pill">
            <CheckCircle size={16} className="stat-icon" />
            <span>Completed Today: <strong>{completedSessions} sessions</strong></span>
          </div>
          <div className="stat-pill">
            <Zap size={16} className="stat-icon" />
            <span>Total Focus: <strong>{completedSessions * 25} mins</strong></span>
          </div>
        </div>
      </div>

      <style>{`
        .focus-timer-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 760px;
          margin: 0 auto;
          width: 100%;
        }

        .timer-main-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 3rem 2rem;
          text-align: center;
        }

        .timer-modes {
          display: flex;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          padding: 0.4rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          flex-wrap: wrap;
          justify-content: center;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mode-btn.active {
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .task-input-wrapper {
          width: 100%;
          max-width: 440px;
        }

        .task-input {
          text-align: center;
          font-size: 0.95rem;
        }

        .timer-display-ring {
          position: relative;
          width: 240px;
          height: 240px;
        }

        .timer-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.06);
          stroke-width: 6;
        }

        .timer-circle-progress {
          fill: none;
          stroke: var(--accent-primary);
          stroke-width: 6;
          stroke-linecap: round;
          stroke-dasharray: 276;
          transition: stroke-dashoffset 1s linear;
        }

        .timer-clock {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .clock-digits {
          font-size: 3.2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          font-family: monospace;
          color: var(--text-main);
        }

        .clock-mode-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
        }

        .timer-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-lg {
          padding: 0.85rem 2rem;
          font-size: 1.05rem;
          border-radius: var(--radius-full);
        }

        .btn-pause {
          background: var(--gradient-amber);
          color: white;
        }

        .btn-icon-lg {
          padding: 0.85rem;
          border-radius: var(--radius-full);
        }

        .timer-stats-footer {
          display: flex;
          gap: 1.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          width: 100%;
          justify-content: center;
          flex-wrap: wrap;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .stat-icon {
          color: var(--accent-emerald);
        }
      `}</style>
    </div>
  );
}
