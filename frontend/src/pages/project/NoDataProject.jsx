import React, {useState} from 'react'
import { PiFileDuotone } from "react-icons/pi";
import { Button, KIND, SHAPE } from "baseui/button";
import AddProject from './AddProject';

const NoDataProject = () => {
   
    const [isOpenitem, setIsOpenitem] = useState(false);
  
    function openModalitem() {
      setIsOpenitem(true);
    }
  
    function closeModalitem() {
      setIsOpenitem(false);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: '105px', }}>
            <div style={{ textAlign: 'center' }}>
                <PiFileDuotone size={80} />
                <h1 style={{ marginTop: '20px', }}>No Project Files</h1>
                <p style={{ marginBottom: '20px' }}>Create a new project file from your project</p>
                <Button
                    onClick={() => openModalitem()}
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
                    Create New Project
                </Button>
                <AddProject isOpen={isOpenitem} onClose={closeModalitem} />
            </div>
        </div>

    )
}

export default NoDataProject
