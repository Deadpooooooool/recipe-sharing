// src/layouts/MainLayout.js
import React from 'react';
import Header from '../components/Header';
import '../styles/MainLayout.css';

const MainLayout = ({ sidebar, children }) => {
  return (
    <>
    {/* <Header /> */}

    <div className="layout">
      {sidebar && <div className="sidebar">{sidebar}</div>}
      <main className={`main-content ${sidebar ? '' : 'full-width'}`}>{children}</main>
    </div>
    </>
  );
};

export default MainLayout;
