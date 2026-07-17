import React from 'react';

const FilterBar = ({ filters, onFilterChange, onClearFilters }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.search || filters.priority !== 'All' || filters.status !== 'All';

  return (
    <div className="filter-bar" role="search" aria-label="Filter tasks">
      {/* Search */}
      <div className="search-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="task-search"
          type="text"
          className="search-input"
          placeholder="Search tasks by title or description..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      {/* Priority Filter */}
      <div className="filter-group">
        <label className="filter-label" htmlFor="filter-priority">
          Priority
        </label>
        <select
          id="filter-priority"
          className="filter-select"
          value={filters.priority}
          onChange={(e) => handleChange('priority', e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="All">All</option>
          <option value="High">🔴 High</option>
          <option value="Medium">🟡 Medium</option>
          <option value="Low">🟢 Low</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="filter-group">
        <label className="filter-label" htmlFor="filter-status">
          Status
        </label>
        <select
          id="filter-status"
          className="filter-select"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All</option>
          <option value="Pending">⏳ Pending</option>
          <option value="In Progress">🔄 In Progress</option>
          <option value="Completed">✅ Completed</option>
        </select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          className="btn-clear-filters"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
};

export default FilterBar;
