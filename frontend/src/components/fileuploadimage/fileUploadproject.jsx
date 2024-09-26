import React, { useState, useRef } from 'react';
import { Button, KIND } from 'baseui/button';
import { FiPlus, } from "react-icons/fi";

const FileUploadproject = () => {
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
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

  const removeImage = () => {
    setImage(null);
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
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
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
          Upload Image Cover
        </Button>
      ) : (
        <>
          <img 
            src={image} 
            alt="Uploaded" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              borderRadius: '8px',
              cursor: 'pointer',
            }} 
            onClick={triggerFileInput} 
          />
          {hovered && (
            <div style={{ 
              position: 'absolute', 
              bottom: '17px', 
              left: '34px', 
              display: 'flex', 
              width:'280px',
              
            }}>
              <Button 
                onClick={triggerFileInput}
                kind={KIND.secondary}
                overrides={{
                  Root: {
                    style: {
                     
                    
                 
                      height:'40px',
                      width:'145',
                      borderRadius:'8px 0 0 8px',
                      padding:'20px',
                      borderRight:'1px solid #979899'
                    }
                  }
                }}
              >
                <p style={{fontSize:'14px', fontWeight:'600'}}>Change Cover</p>
              </Button>
              <Button 
                
                onClick={removeImage}
                kind={KIND.secondary}
                overrides={{
                  Root: {
                    style: {
                   
                      height:'40px',
                      width:'145',
                      borderRadius:'0 8px 8px 0',
                      padding:'20px'
                    }
                  }
                }}
              >
                <p style={{fontSize:'14px', fontWeight:'600'}}>Delete cover</p>
              </Button>
            </div>
          )}
        </>
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
