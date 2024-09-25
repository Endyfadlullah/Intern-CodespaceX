import React, { useState, useRef } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { MdOutlineBackup } from 'react-icons/md';
import { Input } from 'baseui/input';
import { Button, KIND } from 'baseui/button';
import { Folder2, CloseCircle, DocumentText, Gallery, Figma1, Link1, VideoSquare } from 'iconsax-react';
import { ListItem, ListItemLabel } from 'baseui/list';

const AddFileAttachment = ({ isOpen, onClose }) => {

    const fileInputRef = useRef(null);
    const [url, setUrl] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (files) => {
        const newFiles = Array.from(files).map(file => ({
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,  // Convert size to MB
            type: file.type,
        }));
        setUploadedFiles([...uploadedFiles, ...newFiles]);
    };

    const handleUrlUpload = () => {
        if (url) {
            const urlFile = {
                name: url.split('/')[2],  // Menampilkan nama domain, misalnya 'www.figma.com'
                size: url, // Memotong URL sesuai format yang diinginkan
                type: 'url',
            };
            setUploadedFiles([...uploadedFiles, urlFile]);
            setUrl('');
        }
    };

    const isFigmaLink = (url) => {
        return url.includes('figma.com');
    };

    const getFileIcon = (file) => {
        if (file.type === 'url') {
            return isFigmaLink(file.size) ? (
                <Figma1 size="24" variant="Bulk" />
            ) : (
                <Link1 size="24" variant="Bulk" />
            );
        } else {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            switch (fileExtension) {
                case 'doc':
                case 'docx':
                    return <DocumentText size="24" variant="Bulk" />;
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'gif':
                case 'heic':
                    return <Gallery size="24" variant="Bulk" />;
                case 'mp4':
                case 'mov':
                    return <VideoSquare size="24" variant="Bulk" />;
                case 'zip':
                case 'rar':
                    return <Folder2 size="24" variant="Bulk" />;
                default:
                    return <Folder2 size="24" variant="Bulk" />; // Default icon for unknown types
            }
        }
    };

    const handleFileRemove = (index) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);
    };


    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            handleFileUpload(files);
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault(); // Mencegah perilaku default
        event.stopPropagation();
    };

    // Fungsi untuk menangani drop
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files; // Mengambil file dari event
        if (files.length > 0) {
            handleFileUpload(files); // Memanggil fungsi handleFileUpload
        }
    };

    return (
        <div>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                overrides={{
                    Dialog: { style: { height: 'auto', padding: '0', width: '550px' } },
                }}
            >
                <ModalHeader>
                    <h4>Media Upload</h4>
                    <p style={{ fontSize: '14px', fontWeight: '400', color: '#6D6D6D' }}>
                        Add your documents here, and you can upload up to 5 files max
                    </p>
                </ModalHeader>
                <ModalBody>
                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{
                            border: '2px dashed #101010',
                            borderRadius: '8px',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginTop: '16px',
                            height: '144px'
                        }}
                    >
                        <div><MdOutlineBackup size={36} /></div>
                        <span>
                            Drag your file(s) or <b>browse</b>
                        </span>
                        <p style={{ fontSize: '14px', color: '#6b6b6b', marginTop: '10px' }}>
                            Max 10 MB files are allowed
                        </p>
                    </div>
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Hide the input
                        onChange={handleChange}
                    />
                    <Button
                        kind={KIND.secondary}
                        overrides={{
                            Root: {
                                style: {
                                    marginTop: '16px',
                                    height: '40px',
                                    width: '100%',
                                },
                            },
                        }}
                        onClick={handleButtonClick} // Trigger file input click
                    >
                        Choose a File
                    </Button>
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
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        padding: '16px',
                        backgroundColor: '#f0f0f0',
                        marginTop: '10px',
                        marginBottom: '10px',
                        gap: '8px',
                    }}>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
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
                            onClick={handleUrlUpload}
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
                        >
                            Upload
                        </Button>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        {uploadedFiles.map((file, index) => (
                            <ListItem
                                key={index}
                                overrides={{
                                    Content: {
                                        style: {
                                            marginLeft: '0',
                                            paddingLeft: '10px',
                                            cursor: 'pointer',
                                            paddingRight: '20px',
                                            border: '1px solid #EEEEEE',
                                            borderRadius: '8px',
                                            height: 'auto',
                                            width: 'auto',
                                            minHeight: '0',
                                            marginBottom: '16px',
                                        },
                                    },
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {/* Select icon based on file type */}
                                    {getFileIcon(file)}
                                    <ListItemLabel
                                        description={
                                            <Input
                                                value={file.size} // Set value to file.size or other related value
                                                style={{ width: '100px', height: '100px' }} // Set size for the input
                                                overrides={{
                                                    Root: {
                                                        style: {
                                                            border: 'none',
                                                            backgroundColor: 'transparent',
                                                        },
                                                    },
                                                    Input: {
                                                        style: {
                                                            backgroundColor: 'transparent',
                                                            width: '100%',
                                                            height: '100%',
                                                            resize: 'none',
                                                            padding: '0',
                                                            color: '#979899'
                                                        },
                                                    },
                                                    InputContainer: {
                                                        style: {
                                                            backgroundColor: 'transparent',
                                                        }
                                                    }
                                                }}
                                            />
                                        }
                                        overrides={{
                                            LabelDescription: {
                                                style: {
                                                    color: '#979899',
                                                    width: '400px',
                                                    overflow: 'hidden'
                                                },
                                            },
                                        }}
                                    >
                                        <p style={{ fontSize: '16px', fontWeight: '700' }}>{file.name}</p>
                                    </ListItemLabel>
                                </div>
                                <ListItemLabel>
                                    <CloseCircle
                                        size="24"
                                        variant="Bold"
                                        onClick={() => handleFileRemove(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </ListItemLabel>
                            </ListItem>
                        ))}
                    </div>


                </ModalBody>
            </Modal>
        </div>
    );
};

export default AddFileAttachment;
