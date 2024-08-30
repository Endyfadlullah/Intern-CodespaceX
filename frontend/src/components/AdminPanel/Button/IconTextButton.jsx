import React from 'react';

const IconTextButton = ({ icon: Icon, text, link, className }) => {
  return (
    <a
      href={link}
      className={`flex items-center px-4 py-2 border rounded-md text-gray-900 bg-white shadow-md hover:bg-gray-50 transition-all ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="mr-2 w-5 h-5 text-gray-600" />
      <span className="text-sm font-medium">{text}</span>
    </a>
  );
};

export default IconTextButton;
