import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import './AdminPanel.css'
import { Avatar } from "baseui/avatar";
import { Button, KIND, SHAPE } from "baseui/button";
import { Notification  } from 'iconsax-react';
import { Routes, Route } from 'react-router-dom';
import Invoice from './invoice/Invoice';
import AddInvoice from './invoice/AddInvoice';
import profil from '../image/Filled.jpg'
import User from './user/User';
import Project from './project/Project';


const AdminPanel = () => {
    return (
        <div className='body'>
            <Sidebar />
            <div className='main'>
                <div className='header'>
                    <Button
                        onClick={() => alert("click")}
                        kind={KIND.secondary}
                        style={{ width: '40px', height: '40px' }}
                        shape={SHAPE.circle}
                    >
                        <Notification variant="Outline"/>
                    </Button>
                    <Avatar
                        name="Jane Doe"
                        style={{ width: '36px', height: '36px' }}
                        src={profil}
                    />
                </div>
                <div className='submain'>
                    <Routes>
                        {/* <Route path="*" element={<Invoice />}/> */}
                        <Route path="project" element={<Project />}/>
                        <Route path="invoice" element={<Invoice />}/>
                        <Route path="addInvoice" element={<AddInvoice />}/>
                        <Route path="user" element={<User />}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
