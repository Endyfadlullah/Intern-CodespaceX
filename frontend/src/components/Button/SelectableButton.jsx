import React, { useState } from 'react';
import { TickCircle } from 'iconsax-react';

const SelectableButton = ({ label, isSelected, onSelect }) => {
  const [selected, setSelected] = useState(isSelected);

  const handleClick = () => {
    setSelected(!selected);
    onSelect(label, !selected); // Kirim label dan status terpilih ke parent
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? 'black' : '#f0f0f0',
        color: selected ? 'white' : 'black',
        border: 'none',
        borderRadius: '20px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '8px'
      }}
    >
      {label}
      {selected && <TickCircle size="18" style={{ marginLeft: '8px' }} />}
    </button>
  );
};

const PlatformSelector = ({ selectedPlatforms, setSelectedText }) => {
  const platforms = [
    'Mobile App',
    'Website Development',
    'UI/UX Design',
    'Wordpress'
  ];

  const handlePlatformSelect = (label, isSelected) => {
    if (isSelected) {
      // Tambah platform yang dipilih
      setSelectedText(prev => prev ? `${prev}, ${label}` : label);
    } else {
      // Hapus platform yang tidak dipilih
      setSelectedText(prev => {
        const newText = prev.split(', ').filter(platform => platform !== label).join(', ');
        return newText;
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {platforms.map((platform, index) => (
        <SelectableButton
          key={index}
          label={platform}
          isSelected={selectedPlatforms.includes(platform)}
          onSelect={handlePlatformSelect} // Kirim fungsi ke SelectableButton
        />
      ))}
    </div>
  );
};

export default PlatformSelector;