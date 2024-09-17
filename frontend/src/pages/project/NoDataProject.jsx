import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PiFileDuotone } from "react-icons/pi";
import { Button, KIND, SHAPE } from "baseui/button";

const NoDataProject = () => {
    const navigate = useNavigate();
    const handleItemClick = (path, mode = 'create') => {
        navigate(path, { state: { mode } });
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: '105px', }}>
            <div style={{ textAlign: 'center' }}>
                <PiFileDuotone size={80} />
                <h1 style={{ marginTop: '20px', }}>No Project Files</h1>
                <p style={{ marginBottom: '20px' }}>Create a new project file from your project</p>
                <Button
                    onClick={() => handleItemClick('/admin/addInvoice', 'Create')}
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

            </div>
        </div>

    )
}

export default NoDataProject
