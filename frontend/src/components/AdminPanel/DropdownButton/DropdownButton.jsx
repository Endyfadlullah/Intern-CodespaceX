import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from "react-icons/io";
import './DropdownButton.css'; 

const DropdownButton = ({ buttonText, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdown-container">
      <button className="dropdown-trigger" onClick={toggleDropdown}>
        <span className="trigger-text">{buttonText}</span>
        <IoIosArrowDown className="trigger-arrow" />
      </button>
      {isOpen && (
        <div className="dropdown-list">
          {menuItems.map((item, index) => (
            <button key={index} className="list-item" onClick={item.onClick}>
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

DropdownButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonIcon: PropTypes.element,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.element,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

export default DropdownButton;
