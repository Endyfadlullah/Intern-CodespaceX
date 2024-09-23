import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'baseui/modal';
import FileUploadproject from '../../components/fileuploadimage/fileUploadproject';
import { Button, SHAPE, KIND } from "baseui/button";
import { Whatsapp } from 'iconsax-react';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { Accordion, Panel } from 'baseui/accordion';
import TalentProject from './TalentProject';
import CheckpointProject from './CheckpointProject';
import PlatformSelector from '../../components/Button/SelectableButton';
import { Calendar1 } from 'iconsax-react';
import { DatePicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';



const EditProject = ({ isOpenedit, onCloseedit }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date('2024-08-22T00:00:00'));
    const [tempValue, setTempValue] = useState([{ label: 'On Going', id: '#F0F8FF', color:"#1774AC" }]);
    const [newValue, setNewValue] = useState([{ label: 'On Going', id: '#F0F8FF', color:"#1774AC" }]);
    const initialSelectedText = "Mobile App, UI/UX Design";
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [displayText, setDisplayText] = useState(initialSelectedText);
    const [displayDate, setDisplayDate] = useState('22 Desember 2024');


    const handleSave = () => {
        setDisplayDate(selectedDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }));
        setTempValue(newValue);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        const platforms = initialSelectedText.split(',').map(platform => platform.trim());
        setSelectedPlatforms(platforms);
        setDisplayText(initialSelectedText);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    return (
        <Modal onClose={onCloseedit} isOpen={isOpenedit}
            overrides={{
                Dialog: { style: { width: '795px', height: 'auto', padding: '0', } },
            }}>

            <ModalHeader style={{ padding: '0', margin: '0', height: '234px', borderTopRightRadius: '16px', borderTopLeftRadius: '16px', }}>
                <FileUploadproject />
            </ModalHeader>
            <ModalBody style={{ padding: '10px', color: 'black' }}>
                <h1>Manhattan Project</h1>
                <ListItem
                    onClick={() => console.log("click")}
                    artworkSize={ARTWORK_SIZES.MEDIUM}
                    endEnhancer={() => <Button kind={KIND.secondary} shape={SHAPE.circle} ><Whatsapp size="32" variant="Bold" /></Button>}
                    overrides={{
                        Root: {
                            style: {
                                border: '1px solid #EEEEEE',
                                borderRadius: '8px',
                                marginTop: '24px',
                            },
                        },
                    }}
                >
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <ListItemLabel>
                            <Avatar
                                name="Jane Doe"
                                style={{ width: '36px', height: '36px' }}
                                src={require('../../image/Filled.jpg')}
                            />
                        </ListItemLabel>
                        <ListItemLabel description="Jaya Abadi Group">Pak Mamat</ListItemLabel>
                    </div>
                </ListItem>

                <Accordion>
                    <Panel
                        title="Project details"
                        overrides={{
                            Header: {
                                style: {
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                },
                            },
                            Content: {
                                style: {
                                    paddingTop: '0',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    paddingBottom: '10px'
                                },
                            },
                        }}
                    >
                        {!isEditing ? (
                            <>
                                <div style={{ display: 'flex', gap: '55px', fontSize: '15px', fontWeight: '500' }}>
                                    <div style={{ color: '#979899' }}>
                                        <p>Platform</p>
                                        <p>Deadline</p>
                                        <p>Status</p>
                                    </div>
                                    <div>
                                        <p>{displayText}</p>
                                        <p>{displayDate}</p>
                                        <p style={{ color: tempValue[0].color }}>{tempValue[0].label}</p>
                                    </div>
                                </div>

                                <Button
                                    kind={KIND.secondary}
                                    overrides={{
                                        Root: {
                                            style: {
                                                padding: '10px 35px',
                                                marginTop: '20px',
                                            },
                                        },
                                    }}
                                    onClick={handleEditClick}
                                >
                                    Edit details
                                </Button>
                            </>
                        ) : (
                            <>
                                <ListItemLabel>Platform</ListItemLabel>
                                <PlatformSelector
                                    selectedPlatforms={selectedPlatforms}
                                    setSelectedText={(platform) => setDisplayText(platform)}
                                />

                                <ListItemLabel>Deadline</ListItemLabel>
                                <DatePicker
                                    value={selectedDate}
                                    onChange={({ date }) => setSelectedDate(Array.isArray(date) ? date[0] : date)}
                                    timeSelectEnd
                                    displayValueAtRangeIndex={0}
                                    overrides={{
                                        Input: {
                                            component: Input,
                                            props: {
                                                endEnhancer: () => <Calendar1 size="32" variant="Outline" />,
                                            },
                                        },
                                    }}
                                />

                                <ListItemLabel><h3>Status</h3></ListItemLabel>
                                <Select
                                    clearable={false}
                                    closeOnSelect={false}
                                    deleteRemoves={false}
                                    options={[
                                        { label: "On Going", id: "#F0F8FF" , color:"#1774AC"},
                                        { label: "In Review", id: "#FAEBD7",color:"#F39C12" },
                                        { label: "Done", id: "#00FFFF", color:"#16A34A" },
                                    ]}
                                    value={newValue} 
                                    onChange={params => setNewValue(params.value)}
                                    overrides={{
                                        IconsContainer: {
                                            component: ({ $isOpen }) => (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 25px' }}>
                                                    {$isOpen ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
                                                </div>
                                            ),
                                        },
                                    }}
                                />

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '28px' }}>
                                    <Button
                                        kind={KIND.secondary}
                                        shape={SHAPE.pill}
                                        overrides={{
                                            Root: {
                                                style: {
                                                    padding: '10px 35px',
                                                },
                                            },
                                        }}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        shape={SHAPE.pill}
                                        overrides={{
                                            Root: {
                                                style: {
                                                    padding: '10px 35px',
                                                },
                                            },
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </>
                        )}




                    </Panel>
                </Accordion>

                <Accordion>
                    <Panel
                        title="Talent in Charge"
                        overrides={{
                            Header: {
                                style: {
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    paddingBottom: '0'
                                },
                            },
                            Content: {
                                style: {
                                    paddingTop: '0',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    paddingBottom: '10px'
                                },
                            },
                        }}
                    >
                        <TalentProject />
                    </Panel>
                </Accordion>

                <Accordion>
                    <Panel
                        title="Checkpoint"
                        overrides={{
                            Header: {
                                style: {
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                },
                            },
                            Content: {
                                style: {
                                    paddingTop: '0',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    paddingBottom: '10px'
                                },
                            },
                        }}
                    >
                        <CheckpointProject onCloseedit={onCloseedit} />
                    </Panel>
                </Accordion>

                <Accordion>
                    <Panel
                        title="Invoice"
                        overrides={{
                            Header: {
                                style: {
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                },
                            },
                            Content: {
                                style: {
                                    paddingTop: '0',
                                    paddingLeft: '0',
                                    paddingRight: '0',
                                    paddingBottom: '10px'
                                },
                            },
                        }}
                    >
                        isi
                    </Panel>
                </Accordion>

            </ModalBody>
        </Modal>
    )
}

export default EditProject
