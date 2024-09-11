import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';

const ViewInvoice = ({ isOpen, closeModal, invoiceData }) => {
  return (
    <div>
      <Modal onClose={closeModal} isOpen={isOpen}>
        <ModalHeader>Invoice Details</ModalHeader>
        <ModalBody>
          {invoiceData ? (
            <div>
              <p><strong>Invoice Number:</strong> {invoiceData[0]}</p>
              <p><strong>Status:</strong> {invoiceData[1]}</p>
              <p><strong>Client Name:</strong> {invoiceData[2]}</p>
              <p><strong>Amount:</strong> {invoiceData[3]}</p>
              <p><strong>Invoice Date:</strong> {invoiceData[4]}</p>
              <p><strong>Invoice Deadline:</strong> {invoiceData[5]}</p>
            </div>
          ) : (
            <p>No invoice data available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={closeModal}>
            Cancel
          </ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ViewInvoice;
