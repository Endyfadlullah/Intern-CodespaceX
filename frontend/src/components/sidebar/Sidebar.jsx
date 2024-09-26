import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "baseui";
import { IoPeopleSharp } from "react-icons/io5";
import { Category, Wallet3, Messages2 ,DirectboxReceive } from 'iconsax-react';
import { AiFillProject } from "react-icons/ai";
import '../../index.css';


const SidebarContainer = styled('div', {
  width: '258px',
  backgroundColor: '#fff',
  color: '#000',
  borderRight: '0.5px solid #e3dddd',
  height: '100vh',
});

const SidebarTitle = styled('h2', {
  fontSize: '24px',
  fontWeight: '600',
  width: '100%',
  height: '64px',
  padding: '16px ',
  color: '#000',
  gap: '10px',
  marginBottom: '30px'
});

const SectionTitle = styled('div', {
    fontSize: '14px',
    fontWeight:'500',
    padding: '24px',
    color: '#979899',
  });

const SidebarMenu = styled('ul', {
  listStyle: 'none',
  padding: '0',
  margin: '0',
});

const SidebarItem = styled('li', ({ $active }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  padding: '24px',
  color: $active ? '#fff' : '#979899',
  backgroundColor: $active ? '#000' : 'transparent',
  cursor: 'pointer',
  transition: 'background 0.3s',
  fontWeight: '600',
  fontSize: '16px',
  ':hover': {
    backgroundColor: '#000',
    color: '#fff',
  },
}));

const IconWrapper = styled('span', {
  marginRight: '15px',
  fontSize: '20px',
  
});

function Sidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (item, path) => {
    setActiveItem(item);
    navigate(path);
  };

  return (
    <SidebarContainer>
      <SidebarTitle>CodespaceX</SidebarTitle>
      <SectionTitle>Management</SectionTitle>
      <SidebarMenu>
        <SidebarItem $active={activeItem === "Dashboard"} onClick={() => handleItemClick("Dashboard", "/admin/dashboard")}>
          <IconWrapper><Category variant="Bold"/></IconWrapper>
          <span>Dashboard</span>
        </SidebarItem>
        <SidebarItem $active={activeItem === "Inquiry"} onClick={() => handleItemClick("Inquiry", "/admin/inquiry")}>
          <IconWrapper><DirectboxReceive variant="Bulk" /></IconWrapper>
          <span>Inquiry</span>
        </SidebarItem>
        <SidebarItem $active={activeItem === "Project"} onClick={() => handleItemClick("Project", "/admin/project")}>
          <IconWrapper><AiFillProject /></IconWrapper>
          <span>Project</span>
        </SidebarItem>
        <SidebarItem $active={activeItem === "Invoice"} onClick={() => handleItemClick("Invoice", "/admin/invoice")}>
          <IconWrapper><Wallet3  variant="Bulk"/></IconWrapper>
          <span>Invoice</span>
        </SidebarItem>
        <SectionTitle>Settings</SectionTitle>
        <SidebarItem $active={activeItem === "User"} onClick={() => handleItemClick("User", "/admin/user")}>
          <IconWrapper><IoPeopleSharp /></IconWrapper>
          <span>User</span>
        </SidebarItem>
        <SidebarItem $active={activeItem === "Announcement"} onClick={() => handleItemClick("Announcement", "/admin/announcement")}>
          <IconWrapper><Messages2 variant="Bulk"/></IconWrapper>
          <span>Announcement</span>
        </SidebarItem>
      </SidebarMenu>
    </SidebarContainer>
  );
}

export default Sidebar;
