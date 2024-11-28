
import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { TbMessage2Cancel } from "react-icons/tb";
import { AiFillSecurityScan } from "react-icons/ai";
import { SiSpringsecurity } from "react-icons/si";
import { GrAnnounce } from "react-icons/gr";
import { Collapse } from 'react-bootstrap';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaShield } from 'react-icons/fa6';

const Sidebar = ({ toggleSidebar }) => {
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  const toggleFinancialDropdown = () => {
    setIsFinancialOpen(!isFinancialOpen);
  };

  const toggleSecurityDropdown = () => {
    setIsSecurityOpen(!isSecurityOpen);
  }

  const toggleComplaintDropdown = () => {
    setIsComplaintOpen(!isComplaintOpen);
  }

  return (
    <>
      <div className="row">
        {/* Close button for screens up to 767px */}
        <div className="col-12  d-lg-none text-end mt-2">
          <button className="btn close-btn" onClick={toggleSidebar}>
            <IoMdClose />
          </button>
        </div>

        <div className="col-md-12 mt-2 d-flex align-items-center justify-content-center flex-column">
          <img src='/Images/logo.png' height={70} className='pt-2' alt="Logo" />
        </div>
        <hr />

  

      
        <div className="col-md-11 mt-2 mb-2 sidebar_link mx-auto financial_management_main">
          <div onClick={toggleSecurityDropdown} style={{ cursor: 'pointer' }}>
            <p><FaShield className='me-2 fs-4 font_color' /> Security </p>
          </div>
          {/* Dropdown for security Management */}
          <Collapse in={isSecurityOpen} className='dropdown-main'>
            <div className="ps-4">
              <NavLink to="/VisitorTracking" onClick={toggleSidebar}>
                <p className="sub-link">Visitor Tracking</p>
              </NavLink>
              <NavLink to="/EmergencyManagement" onClick={toggleSidebar}>
                <p className="sub-link">Emergency Management</p>
              </NavLink>
            </div>
          </Collapse>
        </div>

       
      </div>
    </>
  );
};

export default Sidebar;
