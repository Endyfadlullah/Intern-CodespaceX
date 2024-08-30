import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar';
import './AdminPanel.css';
import Dashboard from './Dashboard/Dashboard';
import Notification from '../../components/AdminPanel/Header/Notification/Notification';
import Avatar from '../../components/AdminPanel/Header/Avatar/Avatar';
import Project from '../AdminPanel/Project/Project'

const AdminPanel = () => {
  return (
    <div className='body'>
        <div className='sidebar'>
            <Sidebar />
        </div>
        <div className='main'>
            <div className='header'>
                <Notification/>
                <Avatar/>
            </div>
            <div className='submain'>
                <Routes>
                    <Route path="*" element={<Dashboard />}/>
                    <Route path="dashboard" element={<Dashboard />}/>
                    <Route path="project" element={<Project />}/>
                </Routes>
            </div>
        </div>
    </div>
  );
}

export default AdminPanel;
