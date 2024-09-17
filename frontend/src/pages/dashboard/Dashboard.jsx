import React, { useState } from 'react';
import { Accordion, Panel } from 'baseui/accordion';
import ListProject from '../project/ListProject';
import InfoCard from '../../components/InfoCard/InfoCard';

const Dashboard = () => {
  // Initialize state with the index of the panel you want to be open by default (e.g., 0 for the first panel)
  const [expanded, setExpanded] = useState([0]); // Use an array here

  const handleChange = ({ expanded }) => {
    // Update state with the index of the expanded panel, or set to an empty array if no panel is expanded
    setExpanded(expanded.length ? [expanded[0]] : []);
  };

  return (
    <div style={{ padding: '30px' }}>
      <Accordion
        onChange={handleChange}
        expanded={expanded} // Ensure this receives an array of indices
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
