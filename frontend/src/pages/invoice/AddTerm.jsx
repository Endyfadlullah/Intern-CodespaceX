import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import { Select } from "baseui/select";
import Counter from "../../components/Counter/Counter";
import { KIND } from "baseui/button";

const AddTerm = ({ isOpen, onClose, onSaveTerm }) => {
  const [paymentType, setPaymentType] = useState([]);

  const handleSave = () => {
    if (paymentType.length > 0) {
      onSaveTerm(paymentType[0].label); 
    }
    onClose();
  };

  const [totalTermin, setTotalTermin] = useState(0);
const [terminNumber, setTerminNumber] = useState(0);


  return (
    <Modal 
    onClose={onClose} isOpen={isOpen}
    overrides={{
        Root: {
          style: {
            height: '795px', 
          },
        },
        Dialog: {
          style: {
            maxHeight: '795px', 
          },
        },
      }}
    >
      <ModalHeader>Choose Payment Term</ModalHeader>
      <ModalBody>
        <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "black", marginTop: "24px" }}>
          Payment Type
        </p>
        <Select
          backspaceRemoves={false}
          clearable={false}
          closeOnSelect={true}
          deleteRemoves={false}
          escapeClearsValue={false}
          options={[
            {
              label: "Single Payment",
              id: "#F0F8FF",
            },
            {
              label: "Termin Payment",
              id: "#FAEBD7",
            },
          ]}
          value={paymentType}
          searchable={false}
          placeholder="Choose payment terms"
          onChange={(params) => setPaymentType(params.value)}
        />

        {paymentType.length > 0 && paymentType[0].label === "Termin Payment" && (
          <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Total Termin</p>
              <Counter value={totalTermin} onChange={(newValue) => setTotalTermin(newValue)} />
            </div>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>Termin Number</p>
              <Counter value={terminNumber} onChange={(newValue) => setTerminNumber(newValue)} />
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleSave} kind={KIND.secondary}>Save Item</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default AddTerm;
