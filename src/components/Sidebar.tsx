import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-inner">
          <div className="sidebar-logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19V13.5C9 11.567 10.567 10 12.5 10H21M21 10L17.5 6.5M21 10L17.5 13.5M3 5H7.5C9.157 5 10.5 6.343 10.5 8V8C10.5 9.657 9.157 11 7.5 11H3V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="sidebar-logo">SIMRS NUHA</h1>
            <p className="sidebar-sub">Module Mutu v1.0</p>
          </div>
        </div>
      </div>

      <p className="menu-section-title">Navigasi</p>

      <div className="sidebar-menu">
        <div className="menu-group">
          <div className="menu-item active">
            <div className="menu-item-left">
              <svg className="menu-item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
              </svg>
              <span>Manajemen Resiko & Mutu</span>
            </div>
            <span className="menu-chevron">▾</span>
          </div>
          <div className="menu-sub-list">
            <div className="menu-sub-item active">Dashboard Mutu</div>
            <div className="menu-sub-item">Daftar Indikator</div>
            <div className="menu-sub-item">Laporan Mutu</div>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-user">
          <div className="sidebar-avatar">DT</div>
          <div className="sidebar-footer-info">
            <p className="sidebar-footer-name">Dr. Tegar</p>
            <p className="sidebar-footer-role">Ketua Komite Mutu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
