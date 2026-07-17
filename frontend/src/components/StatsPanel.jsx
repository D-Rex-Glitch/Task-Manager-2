import React from 'react';

const StatsPanel = ({ tasks }) => {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  const stats = [
    {
      key: 'total',
      icon: '📋',
      number: total,
      label: 'Total Tasks',
      className: 'total',
      iconClass: 'total',
    },
    {
      key: 'pending',
      icon: '⏳',
      number: pending,
      label: 'Pending',
      className: 'pending',
      iconClass: 'pending',
    },
    {
      key: 'inprogress',
      icon: '🔄',
      number: inProgress,
      label: 'In Progress',
      className: 'inprogress',
      iconClass: 'inprogress',
    },
    {
      key: 'completed',
      icon: '✅',
      number: completed,
      label: 'Completed',
      className: 'completed',
      iconClass: 'completed',
    },
  ];

  return (
    <div className="stats-grid" role="region" aria-label="Task statistics">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.key}>
          <div className={`stat-icon ${stat.iconClass}`} aria-hidden="true">
            {stat.icon}
          </div>
          <div className="stat-info">
            <div className={`stat-number ${stat.className}`} aria-label={`${stat.number} ${stat.label}`}>
              {stat.number}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
