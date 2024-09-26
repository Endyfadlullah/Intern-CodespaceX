import React, { useState, useRef } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from "baseui/modal";
import FileUploadproject from '../../components/fileuploadimage/fileUploadproject';
import { ListItem, ListItemLabel } from "baseui/list";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import SelectSendTo from '../../components/Select/SelectSendTo';
import { Button, KIND } from "baseui/button";
import { FiPlus } from "react-icons/fi";

import { ChevronDown } from "baseui/icon";
import { MdOutlineBackup } from 'react-icons/md';
import { Folder2, CloseCircle, DocumentText, Gallery, Figma1, VideoSquare, Link1 } from 'iconsax-react';

import { StatefulPopover } from 'baseui/popover';
import { PLACEMENT } from "baseui/popover";



const AddAnnouncement = ({ isOpen, onClose, isEditMode }) => {
    const [isOpenfile, setIsOpenfile] = useState(false);
    const [modalType, setModalType] = useState('');



    function closefile() {
        setIsOpenfile(false);
        setModalType('');
    
    }

    const openModal = (type) => {
        setModalType(type);
        setIsOpenfile(true);
    };

    // fungsi fle upload
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

    const ITEMS = {
        Homepage: [
            {
                children: [
                    { id: "api" },
                    { id: "Manhattan Projdaect" },
                ]
            },
        ],
        Invoice: [
            {
                children: [
                    { id: "Manhattan Prodaject" },
                    { id: "Manadhattan Prodaject" },
                ]
            },
        ],
        Project: [
            {
                children: [
                    { id: "Manewhattan Projecdt" },
                    { id: "Manhattan Projedct" },
                ]
            },
        ],
        Settings: [
            {
                children: [
                    { id: "Manhattan Project" },
                    { id: "Manhattan Project" },
                ]
            },
        ],
    };


    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedUser, setSelectedUser] = React.useState("");
    const [openGroups, setOpenGroups] = React.useState({}); // Menyimpan status grup yang terbuka

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user.id); // Menyimpan ID item yang dipilih
        setSearchTerm(""); // Reset search term
    };

    const toggleGroup = (groupId) => {
        setOpenGroups((prev) => ({
            ...prev,
            [groupId]: !prev[groupId] // Toggle status grup
        }));
    };

    const clearInput = () => {
        setSearchTerm(""); // Menghapus nilai input
        setSelectedUser(""); // Menghapus nilai pengguna yang dipilih
    };

    // Filter items berdasarkan searchTerm
    const filteredItems = Object.entries(ITEMS).flatMap(([group, items]) =>
        items.map(item => ({
            ...item,
            group,
            children: item.children.filter(child => child.id.toLowerCase().includes(searchTerm.toLowerCase()))
        }))
    ).filter(item => item.children.length > 0); // Hanya menampilkan grup dengan sub-item yang sesuai


    

    return (
        <div>
            <Modal onClose={onClose} isOpen={isOpen}
                overrides={{
                    Dialog: { style: { width: '795px', height: 'auto', borderRadius: '8px' } },
                }}
            >
                <ModalHeader>{isEditMode ? 'Edit Announcement' : 'Create Announcement'}</ModalHeader>
                <ModalBody>
                    <div style={{ height: '154px', marginBottom: '24px' }}>
                        <FileUploadproject />
                    </div>
                    <ListItemLabel><h2>Details</h2></ListItemLabel>
                    <ListItemLabel>Title</ListItemLabel>
                    <Input
                        placeholder="Title name"
                        clearOnEscape
                    />
                    <ListItemLabel>Description</ListItemLabel>
                    <Textarea

                        placeholder="Announcement description"
                        clearOnEscape
                        overrides={{
                            Input: {
                                style: {
                                    height: '118px'
                                }
                            }
                        }}
                    />
                    <ListItemLabel><h2>Send to</h2></ListItemLabel>
                    <SelectSendTo />
                    <ListItemLabel ><h2>Attachment</h2></ListItemLabel>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop:'12px' }}>
                                {uploadedFiles.map((file, index) => (
                                    <Button
                                    key={index}
                                    href={""} 
                                    kind={KIND.secondary} 
                                    overrides={{
                                        Root: {
                                            style: {
                                                height: '36px',
                                                gap: '5px',
                                               
                                            },
                                        },
                                    }}
                                    >
                                    {getFileIcon(file)}
                                    <p>{file.name}</p>
                                    <CloseCircle
                                        size="24"
                                        variant="Bold"
                                        style={{ cursor: 'pointer' }}
                                        color='#979899'
                                        onClick={() => handleFileRemove(index)}
                                    />
                                    </Button>
                                     ))}
                                </div>
                    <div style={{ display: 'flex', gap: '10px' , marginTop:'12px'}}>
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
                </ModalBody>
                <ModalFooter>
                    <ModalButton  onClick={onClose}>
                        Publish
                    </ModalButton>
                </ModalFooter>
            </Modal>










            {/* add attachment */}


            {/* Modal Component */}
            <Modal
                onClose={closefile}
                isOpen={isOpenfile}
                overrides={{
                    Dialog: { style: { height: 'auto', padding: '0', width: '550px' } },
                    Close: { style: { display: 'none' } },
                }}
            >
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
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter external link"
                                clearOnEscape
                            />
                            <div style={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginTop: '20px' }}>
                                <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                                <span style={{ padding: '0 10px', color: '#6b6b6b', fontSize: '14px' }}>OR</span>
                                <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                            </div>
                            <ListItemLabel>Add from App</ListItemLabel>
                            <StatefulPopover
                                content={() => (
                                    <div
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                            height: 'auto',
                                            overflowY: 'auto',
                                            borderRadius: '16px',
                                            padding: '8px',
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                        }}
                                    >
                                        {filteredItems.length > 0 ? (
                                            filteredItems.map((item) => (
                                                <div key={item.id} style={{ width: '336px', padding: '16px 12px 16px 12px' }}>
                                                    <p
                                                        style={{ cursor: 'pointer', fontWeight: '700', fontSize: '16px' }}
                                                        onClick={() => toggleGroup(item.group)} // Toggle grup saat diklik
                                                    >
                                                        {item.group}
                                                    </p>
                                                    {openGroups[item.group] && item.children.map(child => ( // Tampilkan children jika grup terbuka
                                                        <ListItem
                                                            key={child.id}
                                                            onClick={() => handleSelectUser(child)}
                                                            overrides={{
                                                                Content: {
                                                                    style: {
                                                                        minHeight: '0',
                                                                        padding: '16px 12px 16px 12px',
                                                                        fontSize: '14px',
                                                                        marginLeft: '0'
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <div>
                                                                <p>{child.id}</p>
                                                            </div>
                                                        </ListItem>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '8px' }}>No items found</div>
                                        )}
                                    </div>
                                )}
                                placement={PLACEMENT.bottomLeft}
                                isOpen={Boolean(searchTerm)} // Popover visible only when searchTerm exists
                                onClickOutside={clearInput} // // Close popover if clicked outside
                            >
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        value={selectedUser || searchTerm} // Display selected user or search term
                                        onChange={handleInputChange}
                                        placeholder="Project link"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Escape') {
                                                clearInput(); // Clear input when Escape key is pressed
                                            }
                                        }}
                                        endEnhancer={ <ChevronDown style={{ height: '30px', width: '30px' }} /> }
                                    />
                                </div>
                            </StatefulPopover>
                            <Button
                            onClick={handleUrlUpload}
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
                           
                        </ModalBody>
                    </>
                )}
                 <div style={{    marginLeft: '24px', marginRight: '24px'}}>
                 <h3 style={{ color: 'black' }}>Upload from URL</h3>
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
                </div>
            </Modal>
        </div>
    )
}

export default AddAnnouncement
