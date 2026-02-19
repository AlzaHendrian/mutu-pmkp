import React from 'react';
import Filter from './Filter';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <>
    <header className="dashboard-header">
      <div className="header-titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-actions">        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Dr. Tegar</span>
            <span className="user-role">Ketua Komite</span>
          </div>
          {/* <div className="user-avatar">DT</div> */}
        </div>
      </div>

    </header>
    <Filter />
    </>
  );
};

export default Header;
