
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid  main-background">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarOpen ? 'd-block col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-2' : 'd-none d-lg-block col-lg-3 col-xl-3 col-xxl-2'
            } border sidebar_height`}
        >
          <Sidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content */}
        <div
          className={`main-content ${isSidebarOpen ? 'col-12 col-sm-12 col-md-12 col-xl-9 col-xxl-10' : 'col-12  col-lg-9 col-xl-9 col-xxl-10'
            } sidebar_height`}
        >
          <Header toggleSidebar={toggleSidebar} />

          <div >
            <Outlet />
          </div>

        </div>
      </div>

      {/* Overlay for small screens and medium screens when sidebar is open */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Layout;
