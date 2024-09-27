import React, { useState, useEffect } from 'react';
import { StatelessAccordion, Panel } from "baseui/accordion";
import ListProject from '../project/ListProject';
import InfoCard from '../../components/InfoCard/InfoCard';
import Notification from '../../components/notification/Notification';
import axios from 'axios';
import { API_URL } from '../../helper/network';


const Dashboard = () => {
  

  const notif = [
    { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
    { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
    { id: 1, title: "New project inquiry request", desc: "Notification details go here", time: "22.00" },
];

const [expanded, setExpanded] = React.useState(["P1"]);





useEffect(() => {
  fetchData();
}, []);

const [statuses, setStatuses] = useState([]);

const fetchData = async () => {
  const token = localStorage.getItem('token'); 
  try {
    const response = await axios.get(`${API_URL}/api/admin/dashboard/statuses`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data);
    if (response.data) {
      setStatuses(response.data);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
};


 // Menemukan count berdasarkan status
 const findStatusCount = (status) => {
  const found = statuses.find(item => item.status === status);
  return found ? found.count : 0;
};



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
            <InfoCard title="Project On Going" number={findStatusCount('On Going')} />
            <InfoCard title="Project In Progress" number={findStatusCount('In Progress')} />
            <InfoCard title="Project In Rejected" number={findStatusCount('Rejected')} />
            <InfoCard title="Project Done" number={findStatusCount('Done')} />
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
