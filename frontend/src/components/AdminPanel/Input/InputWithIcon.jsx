import React from 'react';
import './InputWithIcon.css'; // Import the CSS file
import { IoIosSearch } from 'react-icons/io'; // Use IoIosSearch for the icon

const InputWithIcon = ({ value, onChange, placeholder }) => {
  return (
    <div className="input-container">
        <button className="share-icon" aria-label="Search">
        <IoIosSearch size={20} /> {/* Adjust the icon size as needed */}
      </button>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );
};

export default InputWithIcon;
