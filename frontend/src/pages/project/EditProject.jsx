import React from 'react';
import { Modal, ModalHeader, ModalBody} from 'baseui/modal';
import FileUploadproject from '../../components/fileuploadimage/fileUploadproject';
import { Button, SHAPE, KIND } from "baseui/button";
import { Whatsapp } from 'iconsax-react';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { Accordion, Panel } from 'baseui/accordion';



const EditProject = ({ isOpenedit, onCloseedit }) => {

    return (
        <Modal onClose={onCloseedit} isOpen={isOpenedit}
            overrides={{
                Dialog: { style: { width: '795px', height: 'auto', padding: '0', } },
            }}>

            <ModalHeader style={{ padding: '0', margin: '0' }}>
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
                                    padding: '0',
                                },
                            },
                        }}
                    >
                        <div style={{ display: 'flex', gap: '55px', fontSize: '15px', fontWeight: '500' }}>
                            <div style={{ color: '#979899' }}>
                                <p>Platform</p>
                                <p>Deadline</p>
                                <p>Status</p>
                            </div>
                            <div>
                                <p>Mobile apps, Website Development</p>
                                <p>22 Desember 2024</p>
                                <p style={{ color: '#2980B9' }}>On Going</p>
                            </div>
                        </div>
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
                                },
                            },
                            Content: {
                                style: {
                                    padding: '0',
                                },
                            },
                        }}
                    >
                        isi
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
                                    padding: '0',
                                },
                            },
                        }}
                    >
                        isi
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
                                    padding: '0',
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
