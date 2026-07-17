import React from 'react';

const Navbar = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand">
        <div className="navbar-logo" aria-hidden="true">✦</div>
        <div>
          <h1 className="navbar-title">TaskFlow</h1>
          <p className="navbar-subtitle">Smart Task Manager</p>
        </div>
      </div>
      <div className="navbar-actions">
        <div className="navbar-date" aria-label={`Today's date: ${dateStr}`}>
          <span>📅</span>
          <span>{dateStr}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
