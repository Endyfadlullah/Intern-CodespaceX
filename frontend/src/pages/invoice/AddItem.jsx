import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';
import { Input } from "baseui/input";
import Counter from "./Counter/Counter";
import { Button, KIND } from "baseui/button";
import { FiPlus } from "react-icons/fi";

const AddItem = ({ isOpen, onClose, isEditMode }) => {


  return (
    <div>
      {/* Modal */}
      <Modal
        onClose={onClose} isOpen={isOpen}
        overrides={{
          Dialog: {
            style: {
              width: '795px', // Sesuaikan lebar modal
              height: 'auto', // Sesuaikan tinggi modal, bisa juga fixed jika diperlukan
            },
          },
        }}
      >
        <ModalHeader>{isEditMode ? 'Edit Item' : 'Add New Item'}</ModalHeader>
        <ModalBody>
          <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "black", marginTop: "24px" }}>
            Item Tittle
          </p>
          <Input
            value={"Development"}

            placeholder="Item Tittle"
            clearOnEscape
          />
          <div style={{ display: 'flex', paddingTop: '12px' }}>
            <div style={{ marginRight: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Description</p>
              <Input
                value={"Hosting"}

                readOnly
                clearOnEscape
                overrides={{
                  Root: {
                    style: {
                      width: '451px'
                    },
                  },
                }}
              />
            </div>
            <div style={{ marginRight: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Quantity</p>
              <Counter />
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Price</p>
              <Input
                value={"Rp. 1000000.00"}
                readOnly
                clearOnEscape
                overrides={{
                  Root: {
                    style: {
                      heigth: '40px'
                    },
                  },
                }}
              />
            </div>
          </div>
          <Button
            kind={KIND.tertiary}
            overrides={{
              Root: {
                style: {
                  height: '40px',
                  gap: '5px',
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: 'transparent',
                  },
                  ':active': {
                    backgroundColor: 'transparent',
                  },
                },
              },
            }}
          >
            <FiPlus />
            Add Another Description
          </Button>
        </ModalBody>
        <ModalFooter>
          <ModalButton onClick={onClose}>Save Item</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddItem;
