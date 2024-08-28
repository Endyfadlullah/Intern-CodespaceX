import React from 'react';
import Sidebar from '../../components/AdminPanel/Sidebar/Sidebar';
import './AdminPanel.css';
import Dashboard from './Dashboard/Dashboard';
import Header from '../../components/AdminPanel/Header/HeaderMain';

const AdminPanel = () => {
  return (
    <div className='body'>
        <div className='sidebar'>
            <Sidebar />
        </div>
        <div className='main'>
            <div className='header'>
                <Header />
            </div>
            <div className='submain'>
                <Dashboard />
            </div>
        </div>
    </div>
  );
}

export default AdminPanel;
