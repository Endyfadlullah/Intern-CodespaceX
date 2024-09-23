import React from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
} from "baseui/modal";
import FileUploadproject from '../../components/fileuploadimage/fileUploadproject';
import { ListItemLabel } from "baseui/list";
import { Input } from "baseui/input";
import { Textarea } from "baseui/textarea";
import SelectSendTo from '../../components/Select/SelectSendTo';
import AttachmentAnnouncement from './AttachmentAnnouncement';


const AddAnnouncement = ({ isOpen, onClose , isEditMode}) => {
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
                     <SelectSendTo/>
                     <ListItemLabel ><h2>Attachment</h2></ListItemLabel>
                     <AttachmentAnnouncement/>
                </ModalBody>
                <ModalFooter>
                    <ModalButton kind="secondary" onClick={onClose}>
                        Publish
                    </ModalButton>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddAnnouncement
