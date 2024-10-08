import React ,{useState}from 'react'
import { PiFileDuotone } from "react-icons/pi";
import { Button, KIND, SHAPE } from "baseui/button";
import AddAnnouncement from './AddAnnouncement';

const NoDataUser = () => {
    const [isOpen, setIsOpen] = useState(false);

    function close() {
      setIsOpen(false);
    }
   
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: '120px', }}>
            <div style={{ textAlign: 'center' }}>
                <PiFileDuotone size={80} />
                <h1 style={{ marginTop: '20px', }}>No Announcement Files</h1>
                <p style={{ marginBottom: '20px' }}>Create a new Announcement file from your project</p>
                <Button
                    onClick={() => setIsOpen(true)}
                    kind={KIND.secondary}
                    shape={SHAPE.pill}
                    overrides={{
                        Root: {
                            style: {
                                height: '40px',
                                marginTop: '16px',
                                padding: '0 70px',
                            },
                        },
                    }}
                >
                    Create New Announcement
                </Button>
            </div>
            <AddAnnouncement onClose={close} isOpen={isOpen} />
        </div>

    )
}

export default NoDataUser
