


import React from 'react';
import './Header.css';
import { RxHamburgerMenu } from "react-icons/rx";


const Header = ({ toggleSidebar }) => {
  return (
    <>
      <div className="row d-flex justify-content-between align-items-center pt-3 pb-3 mb-3  header_background_color">
        {/* Hamburger icon for small screens */}
        <div className="col-auto d-lg-none">
          <button className="btn" onClick={toggleSidebar}>
            <RxHamburgerMenu />       {/* Bootstrap icon for hamburger menu */}
          </button>
        </div>

        {/* Search bar and user profile (Visible across all screen sizes) */}
        <div className="col  pt-1">
          <h3>Header</h3>
        </div>
        <div className="col-auto">
          <i className="bi bi-person-circle"></i> {/* User icon */}
        </div>
      </div>

    </>
  );
};

export default Header;
