import React, { useEffect, useState, useRef } from 'react';
import { Button, KIND, SHAPE } from "baseui/button";
import { ProgressSteps, Step } from "baseui/progress-steps";
import { Figma, Link1 } from 'iconsax-react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { Trash } from 'iconsax-react';
import { Input } from "baseui/input";
import { FiPlus } from "react-icons/fi";
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import { MdOutlineBackup } from 'react-icons/md';
import { Folder2, CloseCircle, DocumentText, Gallery, Figma1, VideoSquare } from 'iconsax-react';
import { ListItem, ListItemLabel } from 'baseui/list';

const CheckpointProject = ({ triggerCheckpoint, setTriggerCheckpoint }) => {
    const [dataCheckpoint, setDataCheckpoint] = useState([
        { id: 4, title: "Kickoff meeting", description: "we successfully held kick off meeting, setting clear goals and expectations to start the project on the right track", figma: "https", meet: "https" },
        { id: 2, title: "Kickoff meeting", description: "we successfully held kick off meeting, setting clear goals and expectations to start the project on the right track", figma: "", meet: "https" },
        { id: 1, title: "Kickoff meeting", description: "we successfully held kick off meeting, setting clear goals and expectations to start the project on the right track", figma: "https", meet: "" },
    ]);

    const handleDelete = (id) => {
        setDataCheckpoint(dataCheckpoint.filter(checkpoint => checkpoint.id !== id));
    };

    const latestCheckpointNumber = dataCheckpoint.length ? dataCheckpoint.length + 1 : 1;

    const [showSteps, setShowSteps] = useState(false);
    const handleAddCheckpoint = () => {
        setShowSteps(true);
    };

    const handleCancel = () => {
        setShowSteps(false);
    };

    useEffect(() => {
        if (triggerCheckpoint) {
            handleAddCheckpoint(); 
        }
    }, [triggerCheckpoint, setTriggerCheckpoint]);


    const [isOpenFile, setIsOpenFile] = useState(false);

    const openModalfile = () => {
        setIsOpenFile(true);
    };

    const closeModalfile = () => {
        setIsOpenFile(false);
    };

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
             {!showSteps && (
                <Button
                    kind={KIND.secondary}
                    shape={SHAPE.pill}
                    onClick={handleAddCheckpoint}
                >
                    Add Checkpoint
                </Button>
            )}
            {showSteps && (
                <div >
                    <ProgressSteps
                        alwaysShowDescription
                        overrides={{
                            Root: {
                                style: {
                                    padding: '0',
                                    marginTop: '26px',
                                    width: '100%',
                                },
                            },
                            Title: {
                                style: {
                                    fontWeight: '500',
                                    paddingTop: '0',
                                    paddingBottom: '14px',
                                },
                            },
                            IconContainer: {
                                style: {
                                    padding: '0',
                                    marginTop: '0',
                                    backgroundColor: 'transparent',
                                },
                            },
                            Tail: {
                                style: {
                                    marginTop: 'calc(3px + (20px + 20px) / 2)',
                                    backgroundColor: 'transparent',
                                    height: 'calc(100% + 12px)',
                                    width: '2px',
                                    borderLeft: '3px dashed #000000',
                                }
                            },
                        }}
                    >

                        <Step
                            title={"Checkpoint " + latestCheckpointNumber}
                            isActive={true}
                        >
                            <h3 style={{ marginBottom: '10px' }}>Title</h3>
                            <Input
                                placeholder="Title"
                                clearOnEscape
                            />
                            <h3 style={{ marginBottom: '10px', marginTop: '26px' }}>Description</h3>
                            <Input
                                placeholder="Description"
                                clearOnEscape
                            />
                            <div>
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
                                     <Button 
                                onClick={() => { 
                                    // handleComplete(); 
                                    openModalfile(); 
                                }}
                                startEnhancer={() => <FiPlus size={24} />} 
                                kind={KIND.tertiary} 
                                overrides={{
                                    Root: {
                                        style: {
                                            height: '36px',
                                                gap: '5px',
                                            ':hover': {
                                                backgroundColor: 'none',
                                            },
                                            ':active':{
                                                backgroundColor: 'none',
                                            }
                                        },
                                    },
                                }}
                                >
                                    Add File Attachment
                                </Button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                                <Button
                                    onClick={handleCancel}
                                    kind={KIND.secondary}
                                    shape={SHAPE.pill}
                                    overrides={{
                                        Root: {
                                            style: {
                                                padding: '10px 35px 10px 35px',
                                            },
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleCancel}
                                    shape={SHAPE.pill}
                                    overrides={{
                                        Root: {
                                            style: {
                                                padding: '10px 35px 10px 35px',
                                            },
                                        },
                                    }}
                                >Save</Button>
                            </div>
                        </Step>


                    </ProgressSteps>

                </div>
            )}
            <div
                style={{
                    height: '362px',
                    overflow: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#888 #f1f1f1',
                    marginTop: '10px'
                }}>
                <ProgressSteps
                    alwaysShowDescription
                    overrides={{
                        Root: {
                            style: {
                                padding: '0',
                                marginTop: '26px'
                            },
                        },
                        Title: {
                            style: {
                                fontWeight: '500',
                                paddingTop: '0',
                                paddingBottom: '14px',
                            },
                        },
                        IconContainer: {
                            style: {
                                padding: '0',
                                marginTop: '0',
                                backgroundColor: 'transparent',
                            },
                        },
                        Tail: {
                            style: {
                                marginTop: 'calc(3px + (20px + 20px) / 2)',
                                backgroundColor: 'transparent',
                                height: 'calc(100% + 12px)',
                                width: '2px',
                                borderLeft: '3px dashed #000000',
                            }
                        },
                    }}
                >
                    {dataCheckpoint.map((checkpoint, index) => (
                        <Step
                            key={checkpoint.id}
                            isActive={true}
                            title={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#101010' }}>Checkpoint {dataCheckpoint.length - index}</span>
                                    <StatefulPopover
                                        focusLock
                                        placement={PLACEMENT.bottomRight}
                                        content={({ close }) => (
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '12px', backgroundColor: '#FFFFFF' }}>
                                                <Button
                                                    kind={KIND.secondary}
                                                    overrides={{
                                                        Root: {
                                                            style: {
                                                                padding: '10px 35px 10px 35px',
                                                            },
                                                        },
                                                    }}
                                                >Edit</Button>
                                                <Button

                                                    kind={KIND.secondary}
                                                    overrides={{
                                                        Root: {
                                                            style: {
                                                                height: '40px',
                                                                gap: '5px',
                                                                color: '#CC4100',
                                                                background: '#FFEEEB',
                                                                ':hover': {
                                                                    backgroundColor: '#CC4100',
                                                                    color: '#FFFFFF',
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        handleDelete(checkpoint.id);
                                                        close();
                                                    }}
                                                >
                                                    <Trash size="16" />
                                                    Delete
                                                </Button>
                                            </div>
                                        )}

                                        overrides={{
                                            Body: {
                                                style: {
                                                    backgroundColor: '#FFFFFF',
                                                    padding: '16px',
                                                    borderRadius: '8px',

                                                },
                                            },
                                            content: {
                                                style: {
                                                    backgroundColor: '#FFFFFF',
                                                }
                                            },
                                        }}

                                    >
                                        <Button
                                            kind={KIND.tertiary}
                                            size="compact"
                                            overrides={{
                                                Root: {
                                                    style: {
                                                        fontSize: '12px',
                                                        height: '28px',
                                                        backgroundColor: 'transparent',
                                                        ':hover': { backgroundColor: 'transparent' },
                                                        ':active': { backgroundColor: 'transparent' },
                                                    },
                                                },
                                            }}
                                        >
                                            <BsThreeDotsVertical size={16} />
                                        </Button>
                                    </StatefulPopover>

                                </div>
                            }
                        >
                            <h3>{checkpoint.title}</h3>
                            <p style={{ marginTop: '14px', fontSize: '16px' }}>
                                {checkpoint.description}
                            </p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                {checkpoint.figma && (
                                    <Button
                                        kind={KIND.secondary}
                                        startEnhancer={<Figma size={16} />}
                                        overrides={{
                                            Root: {
                                                style: {
                                                    height: '32px',
                                                    fontSize: '12px',
                                                    color: 'black',
                                                    ':hover': {
                                                        backgroundColor: '#EEEEEE',
                                                        color: 'black',
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        Manhattan project (figma)
                                    </Button>
                                )}
                                {checkpoint.meet && (
                                    <Button
                                        kind={KIND.secondary}
                                        startEnhancer={<Link1 size={16} />}
                                        overrides={{
                                            Root: {
                                                style: {
                                                    height: '32px',
                                                    fontSize: '12px',
                                                    color: 'black',
                                                    ':hover': {
                                                        backgroundColor: '#EEEEEE',
                                                        color: 'black',
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        Meeting video
                                    </Button>
                                )}
                            </div>
                        </Step>
                    ))}

                </ProgressSteps>

            </div>











{/* upload file */}


            <Modal
                onClose={closeModalfile}
                isOpen={isOpenFile}
                overrides={{
                    Dialog: { style: { height: 'auto', padding: '0', width: '550px' } },
                    Close: { style: { display: 'none' } }, 
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


                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                                <Button
                                    onClick={closeModalfile}
                                    kind={KIND.secondary}
                                    shape={SHAPE.pill}
                                    overrides={{
                                        Root: {
                                            style: {
                                                padding: '10px 35px 10px 35px',
                                            },
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={closeModalfile}
                                    shape={SHAPE.pill}
                                    overrides={{
                                        Root: {
                                            style: {
                                                padding: '10px 35px 10px 35px',
                                            },
                                        },
                                    }}
                                >Save</Button>
                            </div>

                </ModalBody>
            </Modal>



        </div>
    );
}

export default CheckpointProject;
