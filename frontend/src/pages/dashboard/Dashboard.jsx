import React, { useState } from 'react';
import { Accordion, Panel } from 'baseui/accordion';
import ListProject from '../project/ListProject';
import InfoCard from '../../components/InfoCard/InfoCard';
import Notification from '../../components/notification/Notification';

const Dashboard = () => {
  
  const [expanded, setExpanded] = useState([0]); 

  const handleChange = ({ expanded }) => {
    
    setExpanded(expanded.length ? [expanded[0]] : []);
  };

  const notif = [
    // { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
    // { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
    // { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
];

  return (
    <div style={{ padding: '30px' }}>
       {notif.length > 0 && <Notification />}
      <Accordion
        onChange={handleChange}
        expanded={expanded} 
      >
        <Panel
          title="Project Overview"
          overrides={{
            Header: {
              style: {
                fontSize: '28px',
                fontWeight: '600',
                paddingLeft: '0',
                paddingRight: '0',
              },
            },
            Content: {
              style: {
                padding: '20px',
              },
            },
          }}
        >
          <div style={{ display: 'flex', gap: '20px' }}>
            <InfoCard title="Project On Going" number="1500" />
            <InfoCard title="Project In Progress" number="30" />
            <InfoCard title="Project In Rejected" number="7" />
            <InfoCard title="Project Done" number="7" />
          </div>
        </Panel>
      </Accordion>
      <div>
        <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '600' }}>Latest Project</h1>
        <ListProject />
      </div>
    </div>
  );
};

export default Dashboard;
