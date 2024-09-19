import React, { useState } from 'react';
import { TickCircle } from 'iconsax-react';

const SelectableButton = ({ label }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isSelected ? 'black' : '#f0f0f0',
        color: isSelected ? 'white' : 'black',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '8px'
      }}
    >
      {label}
      {isSelected && <TickCircle size="18" style={{ marginLeft: '8px' }} />}
    </button>
  );
};

const PlatformSelector = () => {
  const platforms = [
    'Mobile App',
    'Website Development',
    'UI/UX Design',
    'Wordpress'
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {platforms.map((platform, index) => (
        <SelectableButton key={index} label={platform} />
      ))}
    </div>
  );
};

export default PlatformSelector;
