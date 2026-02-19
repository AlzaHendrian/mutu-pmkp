import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">SIMRS NUHA</h1>
        <p className="sidebar-sub">Module Mutu v1.0</p>
      </div>

      <div className="sidebar-menu">
        <div className="menu-group">
          <div className="menu-item active">
            <span>Manajemen Resiko & Mutu</span>
            <span>⌵</span>
          </div>
          <div className="menu-sub-list">
            <div className="menu-sub-item active">Dashboard Mutu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
