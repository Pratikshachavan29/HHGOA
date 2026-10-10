import React, { useState } from 'react';
import { 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Sparkles, 
  Sliders, 
  ArrowRight, 
  Calendar, 
  RefreshCw, 
  Lightbulb, 
  ShieldAlert,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function RealityCheck({ tasks = [], habits = [], setActiveTab }) {
  // Inputs: Available hours today & Energy level (1-10)
  const [availableHours, setAvailableHours] = useState(6);
  const [energyLevel, setEnergyLevel] = useState(7);

  // Simulator State (Sandbox mode - doesn't alter saved tasks)
  const [simAvailableHours, setSimAvailableHours] = useState(6);
  const [simEnergyLevel, setSimEnergyLevel] = useState(7);
  const [deferredTaskIds, setDeferredTaskIds] = useState([]);

  // Combine active tasks from brain dump and habits
  const activeDumpTasks = tasks.filter(t => !t.processed);
  const activeHabitTasks = habits.filter(h => !h.completedToday).map(h => ({
    id: `habit-${h.id}`,
    title: h.name,
    priority: h.category === 'Academics' || h.category === 'Prep & Work' ? 'High' : 'Medium',
    estimate: '30 mins',
    deadline: 'Today',
    isHabit: true
  }));

  const combinedActiveTasks = [...activeDumpTasks, ...activeHabitTasks];

  // Helper to parse estimate string to numeric hours
  const parseEstimateToHours = (est) => {
    if (!est) return 0.5;
    const str = String(est).toLowerCase();
    const hMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)/);
    if (hMatch) return parseFloat(hMatch[1]);
    const mMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:m|min|mins|minutes)/);
    if (mMatch) return parseFloat(mMatch[1]) / 60;
    return 0.5;
  };

  // 1. Energy Efficiency Coefficient (1.0 for peak, 0.8 for moderate, 0.6 for fatigue)
  const getEnergyFactor = (lvl) => {
    if (lvl >= 8) return 1.0;
    if (lvl >= 5) return 0.8;
    return 0.6;
  };

  // --- Real-time Evaluation Calculations ---
  const currentFactor = getEnergyFactor(energyLevel);
  const rawRequiredHours = combinedActiveTasks.reduce((acc, t) => acc + parseEstimateToHours(t.estimate), 0);
  const effectiveRequiredHours = rawRequiredHours / currentFactor;
  const isOverloaded = effectiveRequiredHours > availableHours;
  const isCaution = !isOverloaded && effectiveRequiredHours > (availableHours * 0.85);
  const capacityPercent = Math.round((effectiveRequiredHours / availableHours) * 100);
  const overloadHours = Math.max(0, effectiveRequiredHours - availableHours);

  // --- Simulator Calculations (Sandbox Mode) ---
  const simFactor = getEnergyFactor(simEnergyLevel);
  const simTasks = combinedActiveTasks.filter(t => !deferredTaskIds.includes(t.id));
  const simRawHours = simTasks.reduce((acc, t) => acc + parseEstimateToHours(t.estimate), 0);
  const simEffectiveHours = simRawHours / simFactor;
  const simIsOverloaded = simEffectiveHours > simAvailableHours;
  const simCapacityPercent = Math.round((simEffectiveHours / simAvailableHours) * 100);

  // Residual Suggestion Constraint: Generate list of tasks recommended for deferral
  const suggestDeferrals = () => {
    let currentEffective = effectiveRequiredHours;
    const suggestions = [];

    // Sort active tasks ascending by priority (Low -> Medium -> High)
    const candidates = [...combinedActiveTasks].sort((a, b) => {
      const pMap = { Low: 1, Medium: 2, High: 3 };
      return (pMap[a.priority] || 2) - (pMap[b.priority] || 2);
    });

    for (let task of candidates) {
      if (currentEffective <= availableHours) break;
      const taskHours = parseEstimateToHours(task.estimate) / currentFactor;
      suggestions.push({
        task,
        savedHours: taskHours.toFixed(1)
      });
      currentEffective -= taskHours;
    }

    return suggestions;
  };

  const deferralSuggestions = suggestDeferrals();

  const toggleSimDefer = (id) => {
    if (deferredTaskIds.includes(id)) {
      setDeferredTaskIds(deferredTaskIds.filter(i => i !== id));
    } else {
      setDeferredTaskIds([...deferredTaskIds, id]);
    }
  };

  // Work Tips tailored to current state
  const getWorkTips = () => {
    const tips = [];
    if (isOverloaded) {
      tips.push({
        title: "⚠️ High Overload Alert",
        desc: `You need ~${effectiveRequiredHours.toFixed(1)}h of effective focus, but only have ${availableHours}h available. Defer non-critical tasks to tomorrow to avoid burnout.`
      });
    }
    if (energyLevel <= 4) {
      tips.push({
        title: "🔋 Low Energy Protocol",
        desc: "Your energy level is low. Tasks will take ~65% longer. Take 10-minute breaks between study sprints and drink water."
      });
    }
    tips.push({
      title: "🎯 80/20 Focus Principle",
      desc: "Identify the top 2 high-impact items and ignore the rest until tomorrow."
    });
    tips.push({
      title: "⏱️ Use 25m Focus Blocks",
      desc: "Lock in with distraction-free Pomodoro sprints rather than marathon study sessions."
    });
    return tips;
  };

  return (
    <div className="reality-check-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Workload Reality Check</h1>
          <p className="page-subtitle">
            Compare your actual available study hours & energy levels against your task timeline to prevent overload and burnout.
          </p>
        </div>
      </div>

      {/* Input Control Wallet Cards */}
      <div className="grid-2 input-cards-grid">
        <div className="glass-card input-card">
          <div className="input-card-title-row">
            <Clock className="text-purple" size={20} />
            <h2 className="card-title">Available Focus Hours Today</h2>
          </div>
          <div className="slider-value-display">
            <span className="big-val">{availableHours} Hours</span>
            <span className="sub-val">Time left for study & tasks today</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="16" 
            step="0.5"
            value={availableHours}
            onChange={(e) => {
              const val = Number(e.target.value);
              setAvailableHours(val);
              setSimAvailableHours(val);
            }}
            className="input-slider"
          />
          <div className="slider-minmax">
            <span>1 Hour</span>
            <span>8 Hours</span>
            <span>16 Hours</span>
          </div>
        </div>

        <div className="glass-card input-card">
          <div className="input-card-title-row">
            <Zap className="text-pink" size={20} />
            <h2 className="card-title">Current Energy Level</h2>
          </div>
          <div className="slider-value-display">
            <span className="big-val">{energyLevel}/10</span>
            <span className="sub-val">
              {energyLevel >= 8 ? '⚡ Peak Brain Power (100% Efficiency)' : energyLevel >= 5 ? '🌤️ Moderate Energy (80% Efficiency)' : '🔋 Low Energy / Fatigue (60% Efficiency)'}
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={energyLevel}
            onChange={(e) => {
              const val = Number(e.target.value);
              setEnergyLevel(val);
              setSimEnergyLevel(val);
            }}
            className="input-slider slider-energy"
          />
          <div className="slider-minmax">
            <span>Exhausted</span>
            <span>Moderate</span>
            <span>Peak Focus</span>
          </div>
        </div>
      </div>

      {/* Overload Detection Rule Banner */}
      <div className={`glass-card status-banner ${isOverloaded ? 'banner-overloaded' : isCaution ? 'banner-caution' : 'banner-optimal'}`}>
        <div className="banner-icon-wrapper">
          {isOverloaded ? <ShieldAlert size={36} className="text-rose" /> : isCaution ? <AlertTriangle size={36} className="text-amber" /> : <CheckCircle2 size={36} className="text-emerald" />}
        </div>
        <div className="banner-text">
          <span className="banner-status-badge">
            {isOverloaded ? '⚠️ Schedule Overloaded' : isCaution ? '🟡 Tight Schedule Warning' : '🟢 Optimal Balanced Workload'}
          </span>
          <h2 className="banner-heading">
            {isOverloaded 
              ? `You are over capacity by ~${overloadHours.toFixed(1)} hours today!`
              : isCaution 
              ? `Your schedule is tight (${capacityPercent}% capacity). Very little buffer for breaks.`
              : `Great balance! Your required work fits comfortably into your available time.`}
          </h2>
          <p className="banner-desc">
            Overload Detection Rule: {effectiveRequiredHours.toFixed(1)}h effective required work vs {availableHours}h available capacity ({capacityPercent}% workload ratio).
          </p>
        </div>
      </div>

      {/* Workload Summary Visual */}
      <div className="glass-card visual-summary-card">
        <div className="summary-header">
          <div className="summary-title-group">
            <Layers className="text-purple" size={20} />
            <h2 className="card-title">Workload Capacity Meter</h2>
          </div>
          <span className="summary-percent-pill">{capacityPercent}% Capacity</span>
        </div>

        {/* Dual Tier Meter Bar */}
        <div className="workload-meter-container">
          <div className="meter-label-row">
            <span>Effective Task Demand: <strong>{effectiveRequiredHours.toFixed(1)} Hours</strong></span>
            <span>Available Capacity: <strong>{availableHours} Hours</strong></span>
          </div>

          <div className="meter-bg">
            <div 
              className={`meter-fill ${isOverloaded ? 'fill-rose' : isCaution ? 'fill-amber' : 'fill-emerald'}`}
              style={{ width: `${Math.min(100, capacityPercent)}%` }}
            />
          </div>
        </div>

        {/* Work Breakdown Stats */}
        <div className="grid-3 summary-stats-grid">
          <div className="stat-box">
            <span className="stat-label">Active Tasks Today</span>
            <span className="stat-number">{combinedActiveTasks.length} Tasks</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Raw Task Estimate</span>
            <span className="stat-number">{rawRequiredHours.toFixed(1)} Hours</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Energy Adjusted Work</span>
            <span className="stat-number">{effectiveRequiredHours.toFixed(1)} Hours</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Suggestions & Work Tips */}
      <div className="grid-2 main-details-grid">
        {/* Residual Suggestion Constraint */}
        <div className="glass-card suggestions-card">
          <div className="card-header-row">
            <Lightbulb size={20} className="text-amber" />
            <h2 className="card-title">Rescheduling Suggestions</h2>
          </div>

          <p className="card-subtext">
            Residual Suggestion Constraint: Defer non-critical tasks below to bring required work within your {availableHours}h limit.
          </p>

          <div className="suggestions-list">
            {deferralSuggestions.length === 0 ? (
              <div className="empty-suggestion-box">
                <CheckCircle2 size={24} className="text-emerald" />
                <span>No tasks need deferral! Your current schedule is safe.</span>
              </div>
            ) : (
              deferralSuggestions.map(({ task, savedHours }) => (
                <div key={task.id} className="suggestion-item">
                  <div className="suggestion-info">
                    <span className="sugg-badge">Defer to Tomorrow</span>
                    <h3 className="sugg-task-title">{task.title}</h3>
                    <span className="sugg-meta">Saves ~{savedHours}h effective time</span>
                  </div>

                  <button 
                    onClick={() => toggleSimDefer(task.id)} 
                    className={`btn btn-secondary btn-sm ${deferredTaskIds.includes(task.id) ? 'active-defer' : ''}`}
                  >
                    {deferredTaskIds.includes(task.id) ? 'Deferred in Simulator' : 'Test Deferring'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Practical Work Tips */}
        <div className="glass-card tips-card">
          <div className="card-header-row">
            <Sparkles size={20} className="text-purple" />
            <h2 className="card-title">Work Tips for Today</h2>
          </div>

          <div className="tips-list">
            {getWorkTips().map((tip, idx) => (
              <div key={idx} className="tip-item">
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Sandbox Simulator */}
      <div className="glass-card simulator-card">
        <div className="card-header-row">
          <Sliders size={20} className="text-purple" />
          <h2 className="card-title">Interactive Schedule Simulator (Sandbox Mode)</h2>
          <span className="badge badge-indigo">Does Not Alter Saved Data</span>
        </div>

        <p className="simulator-sub">
          Test changes to available hours, energy levels, or task deferrals in real time to see how to eliminate overload before committing!
        </p>

        <div className="grid-2 sim-controls-grid">
          <div className="sim-control-box">
            <label>Simulate Available Hours: <strong>{simAvailableHours}h</strong></label>
            <input 
              type="range" 
              min="1" 
              max="16" 
              value={simAvailableHours}
              onChange={(e) => setSimAvailableHours(Number(e.target.value))}
              className="input-slider"
            />
          </div>

          <div className="sim-control-box">
            <label>Simulate Energy Level: <strong>{simEnergyLevel}/10</strong></label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={simEnergyLevel}
              onChange={(e) => setSimEnergyLevel(Number(e.target.value))}
              className="input-slider slider-energy"
            />
          </div>
        </div>

        <div className="sim-results-box">
          <div className="sim-result-header">
            <span>Simulated Workload Result:</span>
            <span className={`badge ${simIsOverloaded ? 'badge-rose' : 'badge-emerald'}`}>
              {simIsOverloaded ? `Overloaded (${simCapacityPercent}%)` : `Safe (${simCapacityPercent}%)`}
            </span>
          </div>
          <p className="sim-result-desc">
            {simIsOverloaded 
              ? `Still ${simEffectiveHours.toFixed(1)}h required vs ${simAvailableHours}h available. Try deferring another task or increasing energy rest!` 
              : `Success! Schedule balanced with ${simEffectiveHours.toFixed(1)}h required vs ${simAvailableHours}h available.`}
          </p>

          <div className="sim-active-tasks-list">
            <span className="sim-tasks-heading">Tasks Included in Simulation ({simTasks.length}):</span>
            {simTasks.map((t) => (
              <div key={t.id} className="sim-task-chip">
                <span>{t.title} ({t.estimate})</span>
                <button onClick={() => toggleSimDefer(t.id)} className="btn-icon text-rose" title="Simulate deferring">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .reality-check-container {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .input-cards-grid {
          gap: 1.5rem;
        }

        .input-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #ffffff;
        }

        .input-card-title-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #18181b;
        }

        .slider-value-display {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .big-val {
          font-size: 1.8rem;
          font-weight: 800;
          color: #18181b;
        }

        .sub-val {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .input-slider {
          width: 100%;
          accent-color: #7c3aed;
          height: 6px;
          border-radius: var(--radius-full);
          cursor: pointer;
        }

        .slider-energy {
          accent-color: #ec4899;
        }

        .slider-minmax {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .status-banner {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          padding: 1.75rem 2rem;
        }

        .banner-overloaded {
          background: #fff1f2;
          border-color: #fecdd3;
        }

        .banner-caution {
          background: #fffbeb;
          border-color: #fde68a;
        }

        .banner-optimal {
          background: #ecfdf5;
          border-color: #a7f3d0;
        }

        .banner-icon-wrapper {
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .banner-text {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .banner-status-badge {
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #18181b;
        }

        .banner-heading {
          font-size: 1.4rem;
          font-weight: 800;
          color: #18181b;
        }

        .banner-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .visual-summary-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #ffffff;
        }

        .summary-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-title-group {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .summary-percent-pill {
          font-size: 0.85rem;
          font-weight: 800;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          background: #f3e8ff;
          color: #7c3aed;
        }

        .workload-meter-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .meter-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #18181b;
        }

        .meter-bg {
          width: 100%;
          height: 14px;
          background: #f4f4f5;
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid #e4e4e7;
        }

        .meter-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }

        .fill-rose { background: linear-gradient(90deg, #f43f5e, #e11d48); }
        .fill-amber { background: linear-gradient(90deg, #f59e0b, #d97706); }
        .fill-emerald { background: linear-gradient(90deg, #10b981, #059669); }

        .summary-stats-grid {
          gap: 1rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.25rem;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          background: #faf8fc;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid #e9d5ff;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .stat-number {
          font-size: 1.15rem;
          font-weight: 800;
          color: #18181b;
        }

        .main-details-grid {
          gap: 1.5rem;
        }

        .suggestions-card, .tips-card, .simulator-card {
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .card-subtext {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .suggestion-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1rem;
          background: #faf8fc;
          border: 1px solid #e9d5ff;
          border-radius: var(--radius-md);
        }

        .suggestion-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .sugg-badge {
          font-size: 0.68rem;
          font-weight: 700;
          color: #d97706;
          text-transform: uppercase;
        }

        .sugg-task-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #18181b;
        }

        .sugg-meta {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .active-defer {
          background: #fce7f3;
          color: #ec4899;
          border-color: #fbcfe8;
        }

        .empty-suggestion-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 1.25rem;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          color: #059669;
        }

        .tips-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .tip-item {
          padding: 0.85rem 1rem;
          background: #faf8fc;
          border: 1px solid #e9d5ff;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .tip-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #7c3aed;
        }

        .tip-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .simulator-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .sim-controls-grid {
          gap: 1rem;
        }

        .sim-control-box {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: #faf8fc;
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid #e4e4e7;
          font-size: 0.85rem;
        }

        .sim-results-box {
          background: #faf8fc;
          border: 1px solid #e9d5ff;
          border-radius: var(--radius-md);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sim-result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          color: #18181b;
        }

        .sim-result-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .sim-active-tasks-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          border-top: 1px solid #e4e4e7;
          padding-top: 0.75rem;
        }

        .sim-tasks-heading {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .sim-task-chip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          padding: 0.35rem 0.65rem;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: var(--radius-sm);
        }
      `}</style>
    </div>
  );
}
