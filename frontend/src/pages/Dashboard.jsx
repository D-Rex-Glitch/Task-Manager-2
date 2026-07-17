import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';
import StatsPanel from '../components/StatsPanel';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const DEFAULT_FILTERS = { search: '', priority: 'All', status: 'All' };

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all tasks (for stats) and filtered tasks separately
  const fetchTasks = useCallback(async (currentFilters) => {
    try {
      // Fetch filtered tasks for display
      const [filteredRes, allRes] = await Promise.all([
        getTasks(currentFilters),
        getTasks({}),
      ]);
      setTasks(filteredRes.data.data);
      setAllTasks(allRes.data.data);
    } catch (err) {
      toast.error(`Failed to load tasks: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleOpenForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        toast.success('Task updated successfully! 🎉');
      } else {
        await createTask(formData);
        toast.success('Task created successfully! ✦');
      }
      handleCloseForm();
      fetchTasks(filters);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(taskId);
      toast.success('Task deleted');
      fetchTasks(filters);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
      fetchTasks(filters);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" role="status" aria-label="Loading tasks" />
        <p className="loading-text">Connecting to database...</p>
      </div>
    );
  }

  return (
    <main className="app-container">
      {/* Stats */}
      <StatsPanel tasks={allTasks} />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Task List Section */}
      <div className="section-header">
        <div className="section-title">
          <span>📋</span>
          <span>Tasks</span>
          <span className="task-count-badge">{tasks.length}</span>
        </div>
        <button
          className="btn-add-task"
          onClick={handleOpenForm}
          id="add-task-btn"
          aria-label="Add new task"
        >
          <span aria-hidden="true">+</span>
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="task-list" role="list" aria-label="Task list">
        {tasks.length === 0 ? (
          <div className="task-empty" role="status">
            <div className="task-empty-icon" aria-hidden="true">
              {filters.search || filters.priority !== 'All' || filters.status !== 'All'
                ? '🔍'
                : '📭'}
            </div>
            <h3>
              {filters.search || filters.priority !== 'All' || filters.status !== 'All'
                ? 'No tasks match your filters'
                : 'No tasks yet'}
            </h3>
            <p>
              {filters.search || filters.priority !== 'All' || filters.status !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Click "Add Task" to create your first task!'}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div role="listitem" key={task._id}>
              <TaskCard
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))
        )}
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editingTask={editingTask}
        isLoading={isSubmitting}
      />
    </main>
  );
};

export default Dashboard;
