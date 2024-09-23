import React, { useState } from 'react';
import { Button } from "baseui/button";
import { FiPlus } from "react-icons/fi";
import {
    Modal,
    ModalHeader,
    ModalBody,
} from "baseui/modal";
import { ListItemLabel } from "baseui/list";
import { Input } from "baseui/input";
import { SearchNormal1 } from 'iconsax-react';
import { ChevronDown } from "baseui/icon";
import { FileUploader } from "baseui/file-uploader";
import { useStyletron } from 'baseui';
import { MdOutlineBackup } from 'react-icons/md';

const AttachmentAnnouncement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState(''); 
    const [inputValue, setInputValue] = useState("");
    const [fileRows, setFileRows] = useState([]);
    const [, theme] = useStyletron();


    const handleFileUpload = (newFileRows) => {
        setFileRows(newFileRows);
    };
    
    function close() {
        setIsOpen(false);
        setModalType(''); 
        setInputValue(""); // Reset input value
    }

    const openModal = (type) => {
        setModalType(type);
        setIsOpen(true);
    };

   
    return (
        <div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button
                    onClick={() => openModal('link')}
                    startEnhancer={() => <FiPlus size={20} />}
                    overrides={{
                        BaseButton: {
                            style: {
                                height: '40px',
                            },
                        },
                    }}
                >
                    Add Link
                </Button>
                <Button
                    onClick={() => openModal('image')}
                    startEnhancer={() => <FiPlus size={20} />}
                    overrides={{
                        BaseButton: {
                            style: {
                                height: '40px',
                            },
                        },
                    }}
                >
                    Add Image
                </Button>
            </div>

            {/* Modal Component */}
            <Modal onClose={close} isOpen={isOpen}>
                {modalType === 'link' && (
                    <>
                        <ModalHeader>
                            <h4>Add Link</h4>
                            <p style={{ fontSize: '14px', fontWeight: '400', color: '#6D6D6D' }}>
                                Upload the link that you will send to the client here
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <ListItemLabel>Add from URL</ListItemLabel>
                            <Input
                                placeholder="Enter external link"
                                clearOnEscape
                            />
                            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginTop: '20px' }}>
                                <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                                <span style={{ padding: '0 10px', color: '#6b6b6b', fontSize: '14px' }}>OR</span>
                                <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                            </div>
                            <ListItemLabel>Add from App</ListItemLabel>
                            <Input
                                placeholder="Project link"
                                clearOnEscape
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                startEnhancer={inputValue ? <SearchNormal1 size="16" /> : null}
                                endEnhancer={!inputValue ? <ChevronDown style={{ height: '30px', width: '30px' }} /> : null}
                            />
                            <Button
                                overrides={{
                                    Root: {
                                        style: {
                                            marginTop: '24px',
                                            height: '40px',
                                            width: '100%',
                                        },
                                    },
                                }}
                            >
                                Upload
                            </Button>
                        </ModalBody>
                    </>
                )}

                {modalType === 'image' && (
                    <>
                        <ModalHeader>
                            <h4>Media Upload</h4>
                            <p style={{ fontSize: '14px', fontWeight: '400', color: '#6D6D6D' }}>
                                Add your documents here, and you can upload up to 5 files max
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <FileUploader
                                fileRows={fileRows}
                                itemPreview
                                onFileAdd={handleFileUpload}
                                onFileRemove={(removedFileId) => {
                                    setFileRows((prev) => prev.filter((fileRow) => fileRow.id !== removedFileId));
                                }}
                                overrides={{
                                    ButtonComponent: {
                                        props: {
                                            children: 'Click or Drag',
                                            overrides: {
                                                BaseButton: {
                                                    style: {
                                                        display: 'none',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    ContentMessage: {
                                        component: () => (
                                            <div style={{ color: theme.colors.black, textAlign: 'center' }}>
                                                <div><MdOutlineBackup size={36} /></div>
                                                <span>
                                                    Drag your file(s) or <b>browse</b>
                                                </span>
                                                <p style={{ fontSize: '14px', color: '#6b6b6b', marginTop: '10px' }}>
                                                    Max 10 MB files are allowed
                                                </p>
                                            </div>
                                        ),
                                    },
                                    FileDragAndDrop: {
                                        style: {
                                            borderColor: '#101010',
                                            borderStyle: 'dashed',
                                            borderWidth: theme.sizing.scale0,
                                        },
                                    },
                                }}
                            />
                        </ModalBody>
                    </>
                )}
                
            </Modal>
        </div>
    );
};

export default AttachmentAnnouncement;
