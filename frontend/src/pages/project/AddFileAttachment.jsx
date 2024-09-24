import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { FileUploader } from 'baseui/file-uploader';
import { useStyletron } from 'baseui';
import { MdOutlineBackup } from 'react-icons/md';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';

const AddFileAttachment = ({ isOpen, onClose }) => {
    // const [fileRows, setFileRows] = useState([]);
    const [value, setValue] = useState('');
    const [css, theme] = useStyletron();

    // const handleFileUpload = (newFileRows) => {
    //     setFileRows(newFileRows);
    // };

    const [fileRows, setFileRows] = useState([]); // State for storing file info

    // Handle file upload and save temporarily
    const handleFileUpload = (files) => {
        const newFile = files[0]; // Assuming you're handling a single file
        const reader = new FileReader();

        reader.onloadend = () => {
            // Save the file's base64 string for temporary use
            const fileData = {
                id: Date.now(), // Unique ID
                name: newFile.name,
                preview: reader.result // Base64 string to display
            };

            // Save in local state
            setFileRows((prev) => [...prev, fileData]);

            // Save in localStorage
            localStorage.setItem(newFile.name, JSON.stringify(fileData));

            console.log("File uploaded:", fileData.name);
        };

        // Convert file to base64 string
        reader.readAsDataURL(newFile);
    };

    // Remove file and update state and localStorage
    const handleFileRemove = (removedFileId) => {
        setFileRows((prev) => prev.filter((fileRow) => fileRow.id !== removedFileId));
        const removedFile = fileRows.find((file) => file.id === removedFileId);
        if (removedFile) {
            localStorage.removeItem(removedFile.name);
        }
    };

    return (
        <div>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                overrides={{
                    Dialog: { style: { height: 'auto', padding: '0' } },
                }}
            >
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
                onFileRemove={handleFileRemove}
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
                    <p style={{ fontSize: '14px', color: '#6b6b6b', marginTop: '10px' }}>
                        You can upload files in PNG, JPG, or PDF format. Max size is 10 MB.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginTop: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                        <span style={{ padding: '0 10px', color: '#6b6b6b', fontSize: '14px' }}>OR</span>
                        <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                    </div>
                    <h3 style={{ color: 'black' }}>Upload from URL</h3>
                    <div
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            border: `1px solid ${theme.colors.mono400}`,
                            borderRadius: '8px',
                            padding: '16px',
                            backgroundColor: theme.colors.mono200,
                            marginTop: '10px',
                            marginBottom: '10px',
                            gap: '8px',
                        })}
                    >
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Add file URL"
                            clearOnEscape
                            overrides={{
                                Root: {
                                    style: {
                                        border: 'none',
                                        backgroundColor: 'transparent',
                                    },
                                },
                                Input: {
                                    style: {
                                        width: '100%',
                                        height: '40px',
                                    },
                                },
                            }}
                        />
                        <Button
                            overrides={{
                                Root: {
                                    style: {
                                        height: '40px',
                                        gap: '5px',
                                        color: '#6D6D6D',
                                        background: '#FFFFFF',
                                        border: '1px solid #EEEEEE',
                                        fontSize: '12px',
                                        ':hover': {
                                            backgroundColor: '#EEEEEE',
                                            color: '#000000',
                                        },
                                        ':active': {
                                            backgroundColor: '#FFFFFF',
                                            color: '#000000',
                                        },
                                    },
                                },
                            }}
                            onClick={() => console.log('Uploading:', value)}
                        >
                            Upload
                        </Button>
                    </div>

                    <div>
                {fileRows.map((file) => (
                    <div key={file.id}>
                        <img src={file.preview} alt={file.name} width="100" />
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default AddFileAttachment;
