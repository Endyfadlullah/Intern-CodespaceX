import React from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from "baseui/modal";
import { Button, SHAPE, KIND } from "baseui/button";
import { Whatsapp } from 'iconsax-react';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { Textarea } from "baseui/textarea";


const InquiryRequest = ({ isOpen, onClose }) => {
    const [value] = React.useState("Project ini adalah sebuah project aplikasi mobile yang diintregasikan dengan chat gpt supanya mendapatkan hasil yang maksimal");

    return (
        <div>
            <Modal onClose={onClose} isOpen={isOpen}
                overrides={{
                    Dialog: { style: { width: '795px', height: 'auto', padding: '0', } },
                }}
            >
                <ModalHeader>New Inquiry Request!</ModalHeader>
                <ModalBody>
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

                    <h2 style={{ color: 'black', marginTop: '24px', marginBottom: '12px' }}>Project details</h2>

                    <div style={{ display: 'flex', gap: '40px', fontSize: '16px', fontWeight: '500' }}>
                        <div style={{ color: '#979899' }}>
                            <p>Project Name</p>
                            <p style={{ marginTop: '12px', marginBottom: '12px' }}>Platform</p>
                            <p>Deadline</p>
                        </div>
                        <div>
                            <p>Manhattan Project</p>
                            <p style={{ marginTop: '12px', marginBottom: '12px' }}>Mobile apps, Website Development</p>
                            <p>22 Desember 2024</p>
                        </div>
                    </div>

                    <h2 style={{ color: 'black', marginTop: '24px', marginBottom: '12px' }}>Notes</h2>

                    <Textarea
                        value={value}
                        readOnly
                        placeholder="Controlled Input"
                        clearOnEscape
                        overrides={{
                            Root: {
                                style: {
                                    height: '165px',
                                    'active':{
                                        border:'none'
                                    }
                                },
                            },
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <ModalButton kind="secondary" shape="pill" onClick={onClose}>
                        Reject
                    </ModalButton>
                    <ModalButton onClick={onClose} shape="pill" >Accept</ModalButton>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default InquiryRequest
