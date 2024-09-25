import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import './AdminPanel.css'
import { Routes, Route } from 'react-router-dom';
import Invoice from './invoice/Invoice';
import AddInvoice from './invoice/AddInvoice';
import User from './user/User';
import Project from './project/Project';
import Dashboard from './dashboard/Dashboard';
import Announcement from './announcement/Announcement';
import Notifications from './dashboard/Notifications';
import Inquiry from './Inquiry/Inquiry';
import Avatar from './dashboard/Profil';






const AdminPanel = () => {

   
    
    return (
        <div className='body'>
            <Sidebar />
            <div className='main'>
                <div className='header'>
                    <Notifications/>
                    <Avatar/>
                </div>
                <div className='submain'>
                    <Routes>
                        <Route path="*" element={<Dashboard />}/>
                        <Route path="dashboard" element={<Dashboard />}/>
                        <Route path="inquiry" element={<Inquiry />}/>
                        <Route path="project" element={<Project />}/>
                        <Route path="invoice" element={<Invoice />}/>
                        <Route path="addInvoice" element={<AddInvoice />}/>
                        <Route path="user" element={<User />}/>
                        <Route path="announcement" element={<Announcement />}/>
                        
                    </Routes>
                </div>
            </div>
           
        </div>
    )
}

export default AdminPanel
