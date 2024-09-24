import React, { useEffect, useState } from 'react';
import { Button, KIND, SHAPE } from "baseui/button";
import { ProgressSteps, Step } from "baseui/progress-steps";
import { Figma, Link1 } from 'iconsax-react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { Trash } from 'iconsax-react';
import { Input } from "baseui/input";
import { FiPlus } from "react-icons/fi";
import AddFileAttachment from './AddFileAttachment';

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


    // const handleComplete = () => {onCloseedit();};


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
                                <AddFileAttachment isOpen={isOpenFile} onClose={closeModalfile}/>
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
        </div>
    );
}

export default CheckpointProject;
