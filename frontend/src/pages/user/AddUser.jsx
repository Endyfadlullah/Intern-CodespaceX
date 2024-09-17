import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import FileUploadimg from '../../components/fileuploadimage/FileUpload';
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES, StyledFlag } from "baseui/phone-input";
import { Button, KIND } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";

function CustomFlag(props) {
  const { children, ...rest } = props;
  return <StyledFlag iso={props.$iso} {...rest} />;
}

const AddUser = ({ isOpen, onClose , isEditMode}) => {
  const ITEMSRoles = [
    { label: "UI/UX Designer" },
    { label: "Frontend" },
    { label: "Backend" },
  ];
  
  const status = [
    { label: "Active" },
    { label: "Inactive" },
  ];

  const [country, setCountry] = useState(COUNTRIES.ID);
  const [text, setText] = useState("");

  return (
    <Modal onClose={onClose} isOpen={isOpen} overrides={{ Dialog: { style: { width: '532px', height: 'auto' } } }}>
      <ModalHeader>{isEditMode ? 'Edit User' : 'Create user'}</ModalHeader>
      <ModalBody>
        <div>
          <FileUploadimg />
        </div>
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Full Name</p>
          <Input
            placeholder="Input name"
            clearOnEscape
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Email</p>
          <Input
            placeholder="Email@gmail.com"
            clearOnEscape
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Mobile Number</p>
          <PhoneInput
            text={text}
            country={country}
            onTextChange={(event) => {
              setText(event.currentTarget.value);
            }}
            onCountryChange={(event) => {
              setCountry(event.option);
            }}
            overrides={{
              FlagContainer: {
                component: CustomFlag,
              },
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '40px', marginTop: '24px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Roles</p>
            <StatefulPopover
              focusLock
              placement={PLACEMENT.bottomLeft}
              content={({ close }) => (
                <StatefulMenu
                  items={ITEMSRoles}
                  onItemSelect={() => close()}
                  overrides={{
                    List: {
                      style: {
                        height: "150px",
                        width: "138px",
                        overflow: "hidden",
                      },
                    },
                  }}
                />
              )}
            >
              <Button
                endEnhancer={() => <ChevronDown size={24} title="" />}
                style={{ width: "220px", fontSize: "14px", height: '48px' }}
                kind={KIND.secondary}
              >
                UI/UX Designer
              </Button>
            </StatefulPopover>
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Status</p>
            <StatefulPopover
              focusLock
              placement={PLACEMENT.bottomLeft}
              content={({ close }) => (
                <StatefulMenu
                  items={status}
                  onItemSelect={() => close()}
                  overrides={{
                    List: {
                      style: {
                        height: "150px",
                        width: "138px",
                        overflow: "hidden",
                      },
                    },
                  }}
                />
              )}
            >
              <Button
                endEnhancer={() => <ChevronDown size={24} title="" />}
                style={{ width: "220px", fontSize: "14px", height: '48px' }}
                kind={KIND.secondary}
              >
                Active
              </Button>
            </StatefulPopover>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose}>Save User</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default AddUser;
