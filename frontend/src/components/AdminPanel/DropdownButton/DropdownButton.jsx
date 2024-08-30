import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowDown } from "react-icons/io";

const DropdownButton = ({ buttonText, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(buttonText); // Initialize with the default buttonText

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item.text); // Update the selected item text
    setIsOpen(false); // Close the dropdown
    if (item.onClick) item.onClick(); // Execute the item's onClick if it exists
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedItem} {/* Display the selected item */}
          <IoIosArrowDown className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {menuItems.map((item, index) => (
              item.onClick ? (
                <button
                  key={index}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => handleItemClick(item)}
                >
                  {item.text}
                </button>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex="-1"
                  onClick={() => handleItemClick(item)}
                >
                  {item.text}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

DropdownButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
};

export default DropdownButton;
