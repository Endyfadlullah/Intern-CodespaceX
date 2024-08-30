import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Sidebar.css';
import { FaTachometerAlt, FaProjectDiagram, FaUsers, FaBullhorn, FaFileInvoice } from 'react-icons/fa';

function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">CodespaceX</h2>
      <ul className="sidebar-menu">
        <li className={`sidebar-item ${activeItem === "Dashboard" ? "active" : ""}`} onClick={() => handleItemClick("Dashboard", "/admin/Dashboard")}>
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </li>
        <li className={`sidebar-item ${activeItem === "Project" ? "active" : ""}`} onClick={() => handleItemClick("Project", "/admin/Project")}>
          <FaProjectDiagram className="sidebar-icon" />
          <span>Project</span>
        </li>
        <li className={`sidebar-item ${activeItem === "User" ? "active" : ""}`} onClick={() => handleItemClick("User", "/admin/User")}>
          <FaUsers className="sidebar-icon" />
          <span>User</span>
        </li>
        <li className={`sidebar-item ${activeItem === "Announcement" ? "active" : ""}`} onClick={() => handleItemClick("Announcement", "/admin/Announcement")}>
          <FaBullhorn className="sidebar-icon" />
          <span>Announcement</span>
        </li>
        <li className={`sidebar-item ${activeItem === "Invoice" ? "active" : ""}`} onClick={() => handleItemClick("Invoice", "/admin/Invoice")}>
          <FaFileInvoice className="sidebar-icon" />
          <span>Invoice</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
