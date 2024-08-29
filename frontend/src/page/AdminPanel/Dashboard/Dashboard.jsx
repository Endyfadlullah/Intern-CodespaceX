import React, { useState } from 'react';
import { Accordion, Panel } from 'baseui/accordion';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import './dashboard.css';
import CardComponent from '../../../components/AdminPanel/Card/CardComponent';
import InputWithIcon from '../../../components/AdminPanel/Input/InputWithIcon';
import DropdownButton from '../../../components/AdminPanel/DropdownButton/DropdownButton';
import { FaPlus } from 'react-icons/fa';
import ProjectTable from '../../../components/AdminPanel/Table/DashboardTable/ProjectTable';

const engine = new Styletron();

const Dashboard = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const menuItems = [
        { text: 'All Items', onClick: () => alert('All Items Clicked') },
        { text: 'In Progress', onClick: () => alert('In Progress Clicked') },
        { text: 'Reviewing', onClick: () => alert('Reviewing Clicked') },
        { text: 'Completed', onClick: () => alert('Completed Clicked') },
    ];



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
                <div className='wraper_button'>
                    <div className='wraper_button2'>
                        <InputWithIcon
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Search project"
                        />
                        <DropdownButton
                            buttonText="Options"
                            menuItems={menuItems}
                        />
                    </div>
                    <button className="button-custom">
                        <FaPlus className="button-icon" />
                        <span className="button-text">Create new project</span>
                    </button>
                </div>
            </div>
            <ProjectTable/>
        </div>
    );
};

export default Dashboard;
