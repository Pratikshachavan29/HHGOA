import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  TrendingUp,
  Sparkles,
  GraduationCap
} from 'lucide-react';

export default function GoalsTracker({ goals, addGoal, updateGoalProgress, deleteGoal }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Career & Jobs');
  const [targetDate, setTargetDate] = useState('');
  const [initialProgress, setInitialProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addGoal({
      title: title.trim(),
      category,
      targetDate: targetDate || 'Dec 31, 2026',
      progress: Number(initialProgress)
    });

    setTitle('');
    setInitialProgress(0);
    setShowModal(false);
  };

  return (
    <div className="goals-tracker-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Semester Goals & Major Milestones</h1>
          <p className="page-subtitle">Keep your eye on upcoming project deadlines, career milestones, and life targets</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={18} /> Add Goal / Deadline
        </button>
      </div>

      <div className="grid-2 goals-grid">
        {goals.length === 0 ? (
          <div className="glass-card empty-goals-card">
            <GraduationCap size={44} className="empty-icon" />
            <h3>No Goals Set Yet</h3>
            <p>Add your first academic target, internship deadline, or capstone milestone.</p>
          </div>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="glass-card goal-card">
              <div className="goal-header">
                <div className="goal-title-group">
                  <span className="badge badge-indigo">{goal.category}</span>
                  <h3 className="goal-name">{goal.title}</h3>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="btn-icon delete-btn" title="Delete Goal">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="target-date-row">
                <Calendar size={14} className="cal-icon" />
                <span>Target Deadline: <strong>{goal.targetDate}</strong></span>
              </div>

              {/* Interactive Progress Slider */}
              <div className="progress-section">
                <div className="progress-label-row">
                  <span className="progress-title">Milestone Progress</span>
                  <span className="progress-val">{goal.progress}%</span>
                </div>

                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${goal.progress}%` }}></div>
                </div>

                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={goal.progress}
                  onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                  className="progress-slider"
                />
              </div>

              {goal.progress === 100 && (
                <div className="completed-badge">
                  <CheckCircle2 size={16} /> Target Achieved! 🎉
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="glass-card modal-card animate-fade-in">
            <h2 className="modal-title">Set Semester Goal / Deadline</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Goal Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Land Summer Internship, Finish ML Capstone, Maintain 3.8 GPA" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="select-field"
                >
                  <option value="Career & Jobs">Career & Jobs</option>
                  <option value="Academics">Academics</option>
                  <option value="Projects">Projects</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Date</label>
                <input 
                  type="date" 
                  value={targetDate} 
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="modal-buttons">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .goals-tracker-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .goal-card {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          background: #ffffff;
        }

        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .goal-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .goal-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: #18181b;
        }

        .target-date-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .cal-icon {
          color: #7c3aed;
        }

        .progress-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .progress-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .progress-val {
          color: #7c3aed;
          font-weight: 800;
        }

        .progress-slider {
          margin-top: 0.25rem;
          accent-color: #7c3aed;
          cursor: pointer;
        }

        .completed-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: var(--radius-md);
          color: #059669;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .empty-goals-card {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
}
