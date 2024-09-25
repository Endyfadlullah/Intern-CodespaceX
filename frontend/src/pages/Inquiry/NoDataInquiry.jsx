import React from 'react'
import { PiFileDuotone } from "react-icons/pi";


const NoDataInquiry = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: '120px', }}>
            <div style={{ textAlign: 'center' }}>
                <PiFileDuotone size={80} />
                <h1 style={{ marginTop: '20px', }}>No Inquiry Files</h1>
                <p style={{ marginBottom: '20px' }}>Create a new project or ask your client to create inquiry</p>

            </div>
        </div>

    )
}

export default NoDataInquiry
