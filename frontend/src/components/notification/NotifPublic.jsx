import React, { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

const AlertNotification = ({ title, description }) => {
    const [showAlert, setShowAlert] = useState(true);

    const handleClose = () => {
        setShowAlert(false);
    };

    return (
        showAlert && (
            <div style={styles.overlay}>
                <div style={styles.alertBox}>
                    <div style={styles.alertContent}>
                        <MdErrorOutline size={24} style={styles.icon} />
                        <div>
                            <h4 style={styles.alertTitle}>{title}</h4> {/* Teks dinamis untuk judul */}
                            <p style={styles.alertDescription}>{description}</p> {/* Teks dinamis untuk deskripsi */}
                        </div>
                    </div>
                    <button style={styles.closeButton} onClick={handleClose}>X</button>
                </div>
            </div>
        )
    );
};

// Styles for the alert box
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999, // Ensure it's on top
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    alertBox: {
        marginTop: '20px',
        backgroundColor: '#e53935',
        color: '#fff',
        padding: '16px 24px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        maxWidth: '600px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    alertContent: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '16px',
    },
    alertTitle: {
        margin: 0,
        fontSize: '18px',
    },
    alertDescription: {
        margin: '4px 0 0',
        fontSize: '14px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
    },
};

export default AlertNotification;
