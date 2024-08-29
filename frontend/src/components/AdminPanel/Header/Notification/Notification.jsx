import React, { useState, useRef, useEffect } from 'react';
import { FiBell } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import './Notification.css'
import NotificationPopup from '../../Popup/NotificationPopup/NotificationPopup';

const Notification = () => {
    const [open, setOpen] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false); // State to control the popup
    const [selectedNotification, setSelectedNotification] = useState(null); // State for the selected notification
    const [notifications, setNotifications] = useState([
      { id: 1, title: "New project inquiry request", details: "Notification details goes here", time: "22.00", read: false },
      { id: 2, title: "New project inquiry request", details: "Notification details goes here", time: "22.00", read: false },
      { id: 3, title: "New project inquiry request", details: "Notification details goes here", time: "22.00", read: true },
    ]);
  
    const unreadCount = notifications.filter(notification => !notification.read).length;
  
    let menuRef = useRef();
  
    useEffect(() => {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handler);
  
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    });
  
    const handleNotificationClick = (notification) => {
      setSelectedNotification(notification);
      setPopupOpen(true); // Open the popup
      setOpen(false); // Close the dropdown
      setNotifications(notifications.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      ));
    };
  
    return (
      <div className="notification-container" ref={menuRef}>
        <div className='notification-background'>
          <div className="notification-trigger" onClick={() => setOpen(!open)}>
            <FiBell size={25} />
            {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
          </div>
        </div>
  
        <div className={`dropdown-notification ${open ? 'active' : 'inactive'}`}>
          <div className="dropdown-header">
            <h3>Notifications</h3>
            <button onClick={() => setOpen(false)}>&times;</button>
          </div>
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className='notification-icon'>
                  <BiMessageSquareDetail size={20} />
                </div>
                <div className="notification-info">
                  <p className="notification-title">{notification.title}</p>
                  <p className="notification-details">{notification.details}</p>
                </div>
                <div className="notification-time">
                  <span>{notification.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Render NotificationPopup */}
        {selectedNotification && (
          <NotificationPopup
            isOpen={popupOpen}
            onClose={() => setPopupOpen(false)}
            notification={selectedNotification} // Pass the selected notification as prop
          />
        )}
      </div>
    );
  };
  
  export default Notification;