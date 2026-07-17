import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const INITIAL_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
};

const TaskForm = ({ isOpen, onClose, onSubmit, editingTask, isLoading }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || '',
        description: editingTask.description || '',
        priority: editingTask.priority || 'Medium',
        status: editingTask.status || 'Pending',
        dueDate: editingTask.dueDate
          ? format(new Date(editingTask.dueDate), 'yyyy-MM-dd')
          : '',
      });
    } else {
      setForm(INITIAL_FORM);
    }
    setErrors({});
  }, [editingTask, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (form.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (form.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (form.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    if (!form.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    if (!form.priority) {
      newErrors.priority = 'Priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const isEditing = !!editingTask;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isEditing ? '✏️ Edit Task' : '✦ New Task'}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close form"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="form" onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-title">
              Title <span className="required-star">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              name="title"
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter task title..."
              value={form.title}
              onChange={handleChange}
              maxLength={100}
              autoFocus
              aria-required="true"
              aria-describedby={errors.title ? 'title-error' : undefined}
            />
            {errors.title && (
              <span className="error-message" id="title-error" role="alert">
                ⚠ {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Add a description (optional)..."
              value={form.description}
              onChange={handleChange}
              maxLength={500}
              aria-describedby={errors.description ? 'desc-error' : undefined}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {errors.description ? (
                <span className="error-message" id="desc-error" role="alert">
                  ⚠ {errors.description}
                </span>
              ) : <span />}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {form.description.length}/500
              </span>
            </div>
          </div>

          {/* Priority & Due Date */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="task-priority">
                Priority <span className="required-star">*</span>
              </label>
              <select
                id="task-priority"
                name="priority"
                className={`form-select ${errors.priority ? 'error' : ''}`}
                value={form.priority}
                onChange={handleChange}
                aria-required="true"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
              {errors.priority && (
                <span className="error-message" role="alert">
                  ⚠ {errors.priority}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="task-dueDate">
                Due Date <span className="required-star">*</span>
              </label>
              <input
                id="task-dueDate"
                type="date"
                name="dueDate"
                className={`form-input ${errors.dueDate ? 'error' : ''}`}
                value={form.dueDate}
                onChange={handleChange}
                aria-required="true"
                aria-describedby={errors.dueDate ? 'due-error' : undefined}
              />
              {errors.dueDate && (
                <span className="error-message" id="due-error" role="alert">
                  ⚠ {errors.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-status">
              Status
            </label>
            <select
              id="task-status"
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="In Progress">🔄 In Progress</option>
              <option value="Completed">✅ Completed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isLoading}
              id="submit-task-btn"
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Saving...
                </>
              ) : (
                <>{isEditing ? '💾 Save Changes' : '✦ Create Task'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
