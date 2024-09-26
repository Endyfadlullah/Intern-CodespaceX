// CodeOTP.js
import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { PinCode } from "baseui/pin-code";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";

const CodeOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve the email from the state
    const email = location.state?.email || "your email";

    const handleItemClick = (path) => {
        navigate(path);
    };

    const [values, setValues] = React.useState(["", "", "", ""]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <div style={{ border: '1px solid #EEEEEE', borderRadius: '8px', padding: '32px', width: '540px' }}>
                <h1 style={{ fontSize: '30px' }}>Enter the 4-digit code we sent to you at {email}</h1>
                <div style={{ width: '476px', marginTop: '40px' }}>
                    <PinCode
                        values={values}
                        onChange={({ values }) => setValues(values)}
                    />
                    <Button
                        kind={KIND.secondary}
                        size={SIZE.compact}
                        shape={SHAPE.pill}
                        overrides={{
                            Root: {
                                style: {
                                    height: '40px',
                                    marginTop: '32px',
                                    padding: '0 30px',
                                },
                            },
                        }}
                    >
                        Resend code
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <Button kind={KIND.secondary} onClick={() => handleItemClick("/forgot")}><IoIosArrowRoundBack size={30} /></Button>
                        <Button endEnhancer={<IoIosArrowRoundForward size={30} />} onClick={() => handleItemClick("/reset")}>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeOTP;
