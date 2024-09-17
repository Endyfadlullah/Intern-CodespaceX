import React from 'react';
import { Tabs, Tab } from "baseui/tabs";
import ListProject from './ListProject';
import GalleryProject from './GalleryProject';





const Project = () => {
    const [activeKey, setActiveKey] = React.useState("0");

    return (
        <div style={{ padding: '30px' }}>
            <h1 style={{ marginBottom: '40px', fontSize: '28px' }}>All Project</h1>
            <Tabs
                onChange={({ activeKey }) => {
                    setActiveKey(activeKey);
                }}
                activeKey={activeKey}
            >
                <Tab title="List"><ListProject /></Tab>
                <Tab title="Gallery"><GalleryProject/></Tab>
            </Tabs>
        </div>
    );
};

export default Project;
