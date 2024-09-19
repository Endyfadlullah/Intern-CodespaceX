import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'baseui/modal';
import FileUploadproject from '../../components/fileuploadimage/fileUploadproject';
import { DatePicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import { ListItemLabel } from "baseui/list";
import PlatformSelector from '../../components/Button/SelectableButton';
import TitleProject from '../../components/Title/TitleProject';
import { Calendar1 } from 'iconsax-react';
import SelectableUserComponent from '../../components/Select/SelectClient';
import SelectalentComponent from '../../components/Select/SelectTalent';
import { Button, SHAPE } from "baseui/button";


const AddProject = ({ isOpen, onClose }) => {
    const [valuedate, setValuedate] = useState([new Date()]);
    return (
        <Modal onClose={onClose} isOpen={isOpen}
            overrides={{
                Dialog: { style: { width: '795px', height: 'auto', padding: '0' } },
            }}>
            <ModalHeader style={{ padding: '0', margin: '0' }}>
                <FileUploadproject />
            </ModalHeader>
            <ModalBody style={{ padding: '15px', color: 'black' }}>
                <TitleProject />
                <h3 style={{ marginTop: '24px' }}>Project details</h3>
                <ListItemLabel>Platform</ListItemLabel>
                <PlatformSelector />
                <ListItemLabel>Deadline</ListItemLabel>
                <DatePicker

                    value={valuedate}
                    onChange={({ date }) =>
                        setValuedate(Array.isArray(date) ? date : [date])
                    }
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
                <ListItemLabel><h3>Client</h3></ListItemLabel>
                <SelectableUserComponent />
                <ListItemLabel><h3>Talent in Charge</h3></ListItemLabel>
                <SelectalentComponent />
            </ModalBody>
            <ModalFooter style={{ paddingLeft: '16px', paddingRight: '16px', marginBottom: '20px' }}>
                <Button
                    onClick={onClose}
                    shape={SHAPE.pill}
                    overrides={{
                        Root: {
                            style: {
                                height: '40px',
                                marginTop: '16px',
                                padding: '0 40px',
                                backgroundColor:'#979899',
                            },
                        },
                    }}
                >
                    Save Project
                </Button>

            </ModalFooter>
        </Modal>
    )
}

export default AddProject
