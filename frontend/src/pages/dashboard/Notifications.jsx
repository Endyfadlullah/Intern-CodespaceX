import React, { useState } from 'react';
import { Notification, MessageText } from 'iconsax-react';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button, SHAPE, KIND } from 'baseui/button';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { IoClose } from "react-icons/io5";
import InquiryRequest from './InquiryRequest';

const Notifications = () => {
    const notif = [
        { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
        { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
        { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
      
    ];

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <StatefulPopover
                focusLock
                placement={PLACEMENT.bottomRight}
                content={({ close }) => (
                    <div style={{ width: "500px", background: 'white', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', padding: '20px', justifyContent: 'space-between' }}>
                            <h1>Notifications</h1>
                            <IoClose size={20} onClick={() => { close(); }} style={{ cursor: 'pointer' }} />
                        </div>
                        {notif.map((notif) => (
                            <ListItem
                                key={notif.id}
                                onClick={() => {
                                    openModal();
                                    close();  
                                }}
                                overrides={{
                                    Content: {
                                        style: {
                                            marginLeft: '0',
                                            paddingLeft: '10px',
                                            cursor: 'pointer',
                                            paddingRight: '20px',
                                            ':hover': {
                                                backgroundColor: '#F3F9FE'
                                            },
                                            ':active': {
                                                backgroundColor: '#FFFFFF'
                                            },
                                        },
                                    },
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <MessageText size="20" style={{ margin: '10px' }} />
                                    <ListItemLabel>
                                        <p style={{ fontSize: '16px', fontWeight: '500' }}>{notif.title}</p>
                                        <p style={{ color: '#979899', fontSize: '14px', marginTop: '8px' }}>{notif.desc}</p>
                                    </ListItemLabel>
                                </div>
                                <ListItemLabel>
                                    <p style={{ fontSize: '13px' }}>{notif.time}</p>
                                </ListItemLabel>
                            </ListItem>
                        ))}
                    </div>
                )}
            >
                <Button
                    kind={KIND.secondary}
                    style={{ width: '40px', height: '40px' }}
                    shape={SHAPE.circle}
                >
                    <Notification variant="Outline" />
                </Button>
            </StatefulPopover>
            <InquiryRequest isOpen={isOpen} onClose={closeModal} /> {/* Menghubungkan onClose */}
        </div>
    );
};

export default Notifications;
