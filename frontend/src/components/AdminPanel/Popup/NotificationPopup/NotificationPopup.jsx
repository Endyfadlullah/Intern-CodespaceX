import React from 'react';
import './NotificationPopup.css';
import user from '../../../assets/202185e5be34c68b9887dd8ff73feb4f.jpeg'
import { IoLogoWhatsapp } from "react-icons/io";

const NotificationPopup = ({ isOpen, onClose, notification }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>New Inquiry Request!</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="popup-body">
          <div className="user-info">
            <div className='user-profile'>
              <img src={user} alt="User Avatar" className="user-avatar" />
              <div>
                <p>
                  <b>Pak Mamat</b>
                  <br />
                  PT Perkasa Group
                </p>
              </div>
            </div>
            <div className='user-contact'>
              <a href="https://wa.me/6285157444235">
                <IoLogoWhatsapp size={25} />
              </a>
            </div>
          </div>
          <div className="project-details">
            <h3>Project details</h3>
            <div className="detail">
              <div className='detail-title'>
                <p>Project Name</p>
                <p>Platform</p>
                <p>Deadline</p>
              </div>
              <div className='detail-fill'>
                <p>Manhattan Project</p>
                <p>Mobile apps, Website Development</p>
                <p>Lebih dari 6 bulan</p>
              </div>
            </div>
          </div>
          <h3>Notes</h3>
          <textarea className="notes" rows="5">
            test
          </textarea>
        </div>
        <div className="popup-footer">
          <button className="reject-button">Reject</button>
          <button className="accept-button">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
