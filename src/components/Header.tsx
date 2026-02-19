import React from 'react';
import Filter from './Filter';
import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="dashboard-header">
      <div className="header-titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <Filter />

      <div className="header-actions">
        <div className="notification-container">
          <button className="notification-btn">
            <Bell size={20} className="text-slate-400" />
            <span className="notification-badge">5</span>
          </button>
        </div>

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Dr. Tegar</span>
            <span className="user-role">Ketua Komite</span>
          </div>
          <div className="user-avatar-chip">DT</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
