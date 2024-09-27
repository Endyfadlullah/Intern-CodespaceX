import React, { useState } from 'react';
import { Edit2, } from 'iconsax-react';

const TitleProject = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Project Title');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          style={{
            width:'180px',
            fontSize: '24px',
            fontWeight: 'bold',
            marginRight: '8px',
            border: '0.5px #EEEEEE', 
            borderStyle: 'dashed', 
            borderRadius: '8px',      
            padding: '4px 8px'        
          }}
        />
      ) : (
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginRight: '8px' }}>
          {title}
        </h1>
      )}
      <Edit2 
        onClick={handleEditClick} 
        variant="Bold"
        size={28}
        style={{ cursor: 'pointer'}} 
      />
    </div>
  );
};

export default TitleProject;
