// ForgotPassword.js
import React, { useState } from 'react';
import { ListItemLabel } from "baseui/list";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toaster, ToasterContainer } from "baseui/toast";
import { InfoCircle } from 'iconsax-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const validateInputs = () => {
        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            showToast("Invalid Email", "Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
        }

        return isValid;
    };

    const showToast = (title, description) => {
        toaster.info(
            <div style={{ display: 'flex', gap: '8px' }}>
                <InfoCircle size={30} variant="Bold" />
                <div>
                    <strong>{title}</strong>
                    <div>{description}</div>
                </div>
            </div>,
            {
                autoHideDuration: 5000,
            }
        );
    };

    const handlesendcodeClick = () => {
        if (validateInputs()) {
            // Navigate to OTP page and pass email via state
            navigate("/otp", { state: { email } });
        }
    };

    const handleItemClick = (path) => {
        navigate(path);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <ToasterContainer
                overrides={{
                    ToastBody: {
                        style: ({ $theme }) => ({
                            outline: `${$theme.colors.negative} solid`,
                            backgroundColor: $theme.colors.negative,
                            width: '600px'
                        })
                    },
                    ToastCloseIcon: {
                        style: {
                            width: '24px',
                            height: '24px',
                        }
                    }
                }}
            />
            <div style={{ border: '1px solid #EEEEEE', borderRadius: '8px', padding: '32px' }}>
                <h1 style={{ fontSize: '30px' }}>Forgot password?</h1>
                <p style={{marginTop:'12px', marginBottom:'16px'}}>Enter your email for instructions</p>
                <div style={{ width: '476px', margin: '0 auto' }}>
                    <ListItemLabel>Email Address</ListItemLabel>
                    <Input
                        placeholder="Enter email"
                        clearOnEscape
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px' }}>
                        <Button kind={KIND.secondary} onClick={() => handleItemClick("/")}><IoIosArrowRoundBack size={30} /></Button>
                        <Button endEnhancer={<IoIosArrowRoundForward size={30} />} onClick={handlesendcodeClick}>Send code</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
