import React, { useState, useEffect } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter, ModalButton,
} from 'baseui/modal';
import { Input } from "baseui/input";
import { Button, KIND, SHAPE } from "baseui/button";
import { FiPlus } from "react-icons/fi";
import { CloseCircle } from 'iconsax-react';
import Counter from '../../components/Counter/Counter';


const AddItem = ({ isOpen, onClose, isEditMode, onSave }) => {
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState([
    { description: "", quantity: 1, price: "" },
  ]);

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      if (isEditMode) {
        // Load item data if in edit mode (this part would need to be customized for your use case)
        // Example: setTitle(currentItem.title);
        // Example: setDescriptions(currentItem.descriptions);
      } else {
        // Reset for adding a new item
        setTitle("");
        setDescriptions([{ description: "", quantity: 1, price: "" }]);
      }
    }
  }, [isOpen, isEditMode]);

  const addDescription = () => {
    setDescriptions([...descriptions, { description: "", quantity: 1, price: "" }]);
  };

  const removeDescription = (index) => {
    const updatedDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(updatedDescriptions);
  };

  const handleDescriptionChange = (index, key, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index][key] = value;
    setDescriptions(updatedDescriptions);
  };

  const handleSave = () => {
    onSave(title, descriptions); // Save new title and descriptions
    onClose(); // Close modal after saving
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} overrides={{ Dialog: { style: { width: '795px', height: 'auto' } } }}>
      <ModalHeader>{isEditMode ? 'Edit Item' : 'Add New Item'}</ModalHeader>
      <ModalBody>
        <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "black", marginTop: "24px" }}>Item Title</p>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Item Title" clearOnEscape />

        {descriptions.map((desc, index) => (
          <div key={index} style={{ display: 'flex', paddingTop: '12px' }}>
            <div style={{ marginRight: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Description</p>
              <Input
                value={desc.description}
                onChange={e => handleDescriptionChange(index, 'description', e.target.value)}
                placeholder="Description"
                clearOnEscape
                overrides={{ Root: { style: { width: '350px' } } }}
              />
            </div>
            <div style={{ marginRight: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Quantity</p>
              <Counter value={desc.quantity} placeholder="quantity"  onChange={(newQuantity) => handleDescriptionChange(index, 'quantity', newQuantity)}/>
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Price</p>
              <Input
                value={desc.price}
                onChange={e => handleDescriptionChange(index, 'price', e.target.value)}
                placeholder="Price"
                clearOnEscape
              />
            </div>
            <Button kind={KIND.tertiary} shape={SHAPE.round} onClick={() => removeDescription(index)}
             overrides={{
              Root: {
                style: {
                  height: '40px',
                  gap: '5px',
                  marginTop: '30px',
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: 'transparent',
                    color: 'red'
                  },
                  ':active': {
                    backgroundColor: 'transparent',
                  },
                },
              },
            }}
              >
              <CloseCircle size="32" variant="Outline" />
            </Button>
          </div>
        ))}

        <Button kind={KIND.tertiary} onClick={addDescription}
         overrides={{
          Root: {
            style: {
              height: '40px',
              gap: '5px',
              backgroundColor: 'transparent',
              ':hover': {
                backgroundColor: 'transparent',
                color:'#979899'
              },
              ':active': {
                backgroundColor: 'transparent',
              },
            },
          },
        }}
        >
          <FiPlus /> Add Another Description
        </Button>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleSave}>Save Item</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default AddItem;
