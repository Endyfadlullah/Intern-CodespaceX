import React from 'react'
import { Notification } from "baseui/notification";
import { InfoCircle } from 'iconsax-react';

const Notif = () => {
  return (
    <div style={{width:'100%',}}>
      <Notification 
      closeable 
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            width:'100%',
            margin:'0',
            borderRadius:'0',
            
          })
        },
        CloseIcon: {
            style: ({ $theme }) => ({
                width:'30px',
                height:'30px'
            })
          }
      }}
      >
        <div style={{display:'flex', gap:'12px'}}>
        <InfoCircle size="20" color="#1774AC" variant="Bold"/>
        <p>You have new inquiry project request, click to see notification</p>
        </div>
    </Notification>
    </div>
  )
}

export default Notif
