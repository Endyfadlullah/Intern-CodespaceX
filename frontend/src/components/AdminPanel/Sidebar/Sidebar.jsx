
import React from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaProjectDiagram, FaUsers, FaBullhorn, FaFileInvoice } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">CodespaceX</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item active">
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </li>
        <li className="sidebar-item">
          <FaProjectDiagram className="sidebar-icon" />
          <span>Project</span>
        </li>
        <li className="sidebar-item">
          <FaUsers className="sidebar-icon" />
          <span>User</span>
        </li>
        <li className="sidebar-item">
          <FaBullhorn className="sidebar-icon" />
          <span>Announcement</span>
        </li>
        <li className="sidebar-item">
          <FaFileInvoice className="sidebar-icon" />
          <span>Invoice</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
