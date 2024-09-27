// src/components/Tabs.js
import React, { useState } from 'react';
import './Tabs.css';
import ListProject from '../../pages/project/ListProject';
import GalleryProject from '../../pages/project/GalleryProject';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="tabs">
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          List
        </button>
        <button
          className={`tab-button ${activeTab === 'gallery' ? 'active' : ''}`}
          onClick={() => setActiveTab('gallery')}
        >
          Gallery
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'list' && (
          <div className="content">
            <ListProject/>
          </div>
        )}
        {activeTab === 'gallery' && (
          <div className="content">
           <GalleryProject/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
