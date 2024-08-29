import React from 'react';
import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar';
import './AdminPanel.css';
import Dashboard from './Dashboard/Dashboard';
import Notification from '../../components/AdminPanel/Header/Notification/Notification';
import Avatar from '../../components/AdminPanel/Header/Avatar/Avatar';

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
                <Dashboard />
            </div>
        </div>
    </div>
  );
}

export default AdminPanel;
