import React, { useState } from 'react';
import { Accordion, Panel } from 'baseui/accordion';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import './dashboard.css';
import CardComponent from '../../../components/AdminPanel/Card/CardComponent';
import InputWithIcon from '../../../components/AdminPanel/Input/InputWithIcon';

const engine = new Styletron();

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <StyletronProvider value={engine}>
        <Accordion>
          <Panel title="Project Overview" key="0">
            <div style={{ display: 'flex', gap: '8px' }}>
              <CardComponent title="Project On Going" number="0" />
              <CardComponent title="Project In Progress" number="0" />
              <CardComponent title="Project In Rejected" number="0" />
              <CardComponent title="Project Done" number="0" />
            </div>
          </Panel>
        </Accordion>
      </StyletronProvider>

      <div className='wraper_dashboard'>
        <p className='title'>Latest Project</p>
        <div>
          <InputWithIcon
            value={inputValue}
            onChange={handleChange}
            placeholder="Search project"
          />
          <button>
            + Create new project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
