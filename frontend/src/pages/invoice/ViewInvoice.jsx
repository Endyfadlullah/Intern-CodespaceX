import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import PreviewInvoice from './PreviewInvoice';


const ViewInvoice = ({ isOpen, closeModal, invoiceData }) => {
  return (
    <div>
      <Modal 
      onClose={closeModal} isOpen={isOpen}
      overrides={{
        Dialog: {
          style: {
            width: '552px',
          },
        },
      }}
      >
        <ModalHeader>Invoice Details</ModalHeader>
        <ModalBody>
          <PreviewInvoice/>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewInvoice;
