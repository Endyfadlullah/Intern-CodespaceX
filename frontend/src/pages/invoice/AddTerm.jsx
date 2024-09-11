import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from "baseui/modal";
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

const AddTerm = ({ isOpen, onClose }) => {
    const [paymentType, setPaymentType] = useState([]);
    const [numberOfTerms, setNumberOfTerms] = useState(0);

    const increment = () => {
        setNumberOfTerms(numberOfTerms + 1);
    };

    const decrement = () => {
        if (numberOfTerms > 0) {
            setNumberOfTerms(numberOfTerms - 1);
        }
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalHeader>Choose Payment Term</ModalHeader>
            <ModalBody>
                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Payment Type</p>
                <Select
                    backspaceRemoves={false}
                    clearable={false}
                    closeOnSelect={false}
                    deleteRemoves={false}
                    escapeClearsValue={false}
                    options={[
                        {
                            label: "Single Payment",
                            id: "#F0F8FF"
                        },
                        {
                            label: "Termin Payment",
                            id: "#FAEBD7"
                        },
                    ]}
                    value={paymentType}
                    searchable={false}
                    placeholder="Choose payment terms"
                    onChange={params => setPaymentType(params.value)}
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <div>
                        <p>Total Termin</p>
                        <Button
                            onClick={decrement}
                            shape="circle"
                            size="compact"
                            disabled={numberOfTerms === 0}
                        >
                           -
                        </Button>

                        {/* Input to display the value */}
                        <Input
                            value={String(numberOfTerms)}
                            onChange={() => { }}
                            overrides={{
                                Root: {
                                    style: {
                                        width: "80px",
                                        textAlign: "center",
                                    },
                                },
                            }}
                        />

                        {/* Button to increase the value */}
                        <Button onClick={increment} shape="circle" size="compact">
                            +
                        </Button>
                    </div>
                    <div>
                        <p>Termin Number</p>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton onClick={onClose}>Save Item</ModalButton>
            </ModalFooter>
        </Modal>
    );
};

export default AddTerm;
