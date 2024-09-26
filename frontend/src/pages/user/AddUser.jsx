import React, { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import FileUploadimg from '../../components/fileuploadimage/FileUpload';
import { Input } from "baseui/input";
import { PhoneInput, COUNTRIES, StyledFlag } from "baseui/phone-input";
import { ChevronDown } from "baseui/icon";
import { Select } from "baseui/select";

function CustomFlag(props) {
  const { children, ...rest } = props;
  return <StyledFlag iso={props.$iso} {...rest} />;
}

const AddUser = ({ isOpen, onClose, isEditMode }) => {
  const [country, setCountry] = useState(COUNTRIES.ID);
  const [text, setText] = useState("");
  const [valuerole, setValuerole] = useState([]);
  const [valuestatus, setValuestatus] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // State for the button's disabled status
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Memoized validateForm to avoid dependency issues
  const validateForm = useCallback(() => {
    const isCommonFieldsFilled = fullname && email && text && valuerole.length > 0 && valuestatus.length > 0;

    // If role is "Customer", also validate Address, Company, and Job Title
    if (valuerole.length > 0 && valuerole[0].id === "customer") {
      return isCommonFieldsFilled && address && company && jobTitle;
    }

    return isCommonFieldsFilled;
  }, [fullname, email, text, valuerole, valuestatus, address, company, jobTitle]);

  // useEffect to check form validation whenever any input changes
  useEffect(() => {
    setIsButtonDisabled(!validateForm());
  }, [validateForm]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} overrides={{ Dialog: { style: { width: '532px', height: 'auto' } } }}>
      <ModalHeader>{isEditMode ? 'Edit User' : 'Create user'}</ModalHeader>
      <ModalBody>
        <div>
          <FileUploadimg />
        </div>
        <div style={{ display: 'flex', gap: '40px', marginTop: '24px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Roles</p>
            <Select
              clearable={false}
              options={[
                { label: "Admin", id: "admin" },
                { label: "Customer", id: "customer" }
              ]}
              value={valuerole}
              searchable={false}
              placeholder="Choose role"
              onChange={params => setValuerole(params.value)}
              overrides={{
                ControlContainer: {
                  style: ({ $theme }) => ({
                    height: "48px",
                    width: "218px",
                  })
                },
                IconsContainer: {
                  component: () => <div style={{ margin: '12px 10px 12px 10px' }}><ChevronDown size={24} /></div>
                }
              }}
            />
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Status</p>
            <Select
              clearable={false}
              options={[
                { label: "Active", id: "#F0FFFF" },
                { label: "Inactive", id: "#F5F5DC" }
              ]}
              value={valuestatus}
              searchable={false}
              placeholder="Choose status"
              onChange={params => setValuestatus(params.value)}
              overrides={{
                ControlContainer: {
                  style: ({ $theme }) => ({
                    height: "48px",
                    width: "218px",
                  })
                },
                IconsContainer: {
                  component: () => <div style={{ margin: '12px 10px 12px 10px' }}><ChevronDown size={24} /></div>
                }
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Full Name</p>
          <Input
            placeholder="Input name"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
            clearOnEscape
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Email</p>
          <Input
            placeholder="Email@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            clearOnEscape
          />
        </div>
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Mobile Number</p>
          <PhoneInput
            text={text}
            country={country}
            onTextChange={(event) => setText(event.currentTarget.value)}
            onCountryChange={(event) => setCountry(event.option)}
            overrides={{
              FlagContainer: {
                component: CustomFlag,
              },
            }}
          />
        </div>
        {valuerole.length > 0 && valuerole[0].id === "customer" && (
          <div>
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Address</p>
              <Input
                placeholder="Enter your full address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                clearOnEscape
              />
            </div>
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Company</p>
              <Input
                placeholder="Company name"
                value={company}
                onChange={e => setCompany(e.target.value)}
                clearOnEscape
              />
            </div>
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Job Title</p>
              <Input
                placeholder="Title name"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                clearOnEscape
              />
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={onClose} disabled={isButtonDisabled}>
          Save User
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default AddUser;
