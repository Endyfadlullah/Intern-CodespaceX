import React from 'react';
import { StatelessAccordion, Panel } from "baseui/accordion";
import ListProject from '../project/ListProject';
import InfoCard from '../../components/InfoCard/InfoCard';
import Notification from '../../components/notification/Notification';

const Dashboard = () => {
  

  const notif = [
    { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
    { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
    { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
];

const [expanded, setExpanded] = React.useState(["P1"]);



  return (
    <div style={{ padding: '30px' }}>
       {notif.length > 0 && <Notification />}
      <StatelessAccordion 
      expanded={expanded}
      onChange={({ key, expanded }) => {
        console.log(key);
        setExpanded(expanded);
      }}
      >
        <Panel
        key="P1"
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
      </StatelessAccordion>
      <div>
        <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '600' }}>Latest Project</h1>
        <ListProject />
      </div>
    </div>
  );
};

export default Dashboard;
