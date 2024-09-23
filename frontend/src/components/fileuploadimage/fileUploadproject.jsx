import React, { useState, useRef } from 'react';
import { Button } from 'baseui/button';
import { FiPlus } from "react-icons/fi";


const FileUploadproject = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden', 
      position: 'relative',
      background:'#EEEEEE',
      borderRadius:'16px',
      
    }}>
      {!image ? (
        <Button 
          onClick={triggerFileInput} 
          overrides={{ 
            Root: { 
              style: { 
                color:'#979899',
                gap:'5px',
                fontSize:'14px',
                backgroundColor: 'transparent',
                ':hover': {
                  backgroundColor: 'transparent',
                  color:'#000000'
                },
                ':active': {
                  backgroundColor: 'transparent',
                },
              }
            } 
          }}
        >
            <FiPlus/>
            Upload Image cover
        </Button>
      ) : (
        <img 
          src={image} 
          alt="Uploaded" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            borderRadius: '8px',
            cursor: 'pointer' ,
          }} 
          onClick={triggerFileInput} 
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileUploadproject;
