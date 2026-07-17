import React from 'react';
import { format, isAfter, isBefore, addDays, parseISO } from 'date-fns';

const PRIORITY_ICONS = { High: '🔴', Medium: '🟡', Low: '🟢' };
const STATUS_ICONS = { Pending: '⏳', 'In Progress': '🔄', Completed: '✅' };

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = addDays(today, 3);

  const isOverdue = isBefore(dueDate, today) && task.status !== 'Completed';
  const isDueSoon =
    !isOverdue && isBefore(dueDate, tomorrow) && task.status !== 'Completed';

  const statusKey = task.status === 'In Progress' ? 'InProgress' : task.status;

  const handleStatusChange = (e) => {
    onStatusChange(task._id, e.target.value);
  };

  const handleCheckboxClick = () => {
    const newStatus =
      task.status === 'Completed' ? 'Pending' : 'Completed';
    onStatusChange(task._id, newStatus);
  };

  return (
    <div
      className={`task-card priority-${task.priority}`}
      role="article"
      aria-label={`Task: ${task.title}`}
    >
      {/* Checkbox */}
      <button
        className={`task-checkbox ${task.status === 'Completed' ? 'checked' : ''}`}
        onClick={handleCheckboxClick}
        aria-label={
          task.status === 'Completed'
            ? 'Mark task as pending'
            : 'Mark task as completed'
        }
        title={task.status === 'Completed' ? 'Unmark completed' : 'Mark completed'}
      />

      <div className="task-content">
        {/* Header */}
        <div className="task-header">
          <h3 className={`task-title ${task.status === 'Completed' ? 'completed-text' : ''}`}>
            {task.title}
          </h3>
          <div className="task-badges">
            <span className={`badge badge-priority-${task.priority}`}>
              {PRIORITY_ICONS[task.priority]} {task.priority}
            </span>
            <span className={`badge badge-status-${statusKey}`}>
              {STATUS_ICONS[task.status]} {task.status}
            </span>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {/* Footer */}
        <div className="task-footer">
          <div
            className={`task-due-date ${isOverdue ? 'overdue' : isDueSoon ? 'due-soon' : ''}`}
            aria-label={`Due date: ${format(dueDate, 'MMM d, yyyy')}${isOverdue ? ' - Overdue!' : isDueSoon ? ' - Due soon' : ''}`}
          >
            <span aria-hidden="true">
              {isOverdue ? '🚨' : isDueSoon ? '⚠️' : '📅'}
            </span>
            <span>
              {isOverdue ? 'Overdue · ' : isDueSoon ? 'Due soon · ' : ''}
              {format(dueDate, 'MMM d, yyyy')}
            </span>
          </div>

          <div className="task-actions">
            {/* Quick Status Change */}
            <select
              className="status-select-mini"
              value={task.status}
              onChange={handleStatusChange}
              aria-label="Update task status"
              id={`status-${task._id}`}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Edit Button */}
            <button
              className="btn-icon edit"
              onClick={() => onEdit(task)}
              aria-label={`Edit task: ${task.title}`}
              title="Edit task"
              id={`edit-${task._id}`}
            >
              ✏️
            </button>

            {/* Delete Button */}
            <button
              className="btn-icon delete"
              onClick={() => onDelete(task._id)}
              aria-label={`Delete task: ${task.title}`}
              title="Delete task"
              id={`delete-${task._id}`}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
