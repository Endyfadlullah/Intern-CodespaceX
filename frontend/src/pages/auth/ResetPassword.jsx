import React, { useState } from 'react';
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toaster, ToasterContainer } from "baseui/toast";
import { InfoCircle } from 'iconsax-react';

const ResetPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isPasswordReset, setIsPasswordReset] = useState(false); // State to handle success message

    const validateInputs = () => {
        let isValid = true;

        // Validasi password
        if (!password || password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            showToast("Invalid Password", "Password must be at least 8 characters long.");
            isValid = false;
        } else {
            setPasswordError('');
        }

        // Validasi konfirmasi password
        if (!confirmPassword) {
            setConfirmPasswordError('Confirm Password is required.');
            showToast("Invalid Confirmation", "Please confirm your password.");
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            showToast("Password Mismatch", "Passwords do not match.");
            isValid = false;
        } else {
            setConfirmPasswordError('');
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

    const handleResetClick = () => {
        if (validateInputs()) {
            // Set success state to true
            setIsPasswordReset(true);
        }
    };

    const handleItemClick = (path) => {
        navigate(path);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            {!isPasswordReset ? (
                <div style={{ border: '1px solid #EEEEEE', borderRadius: '8px', padding: '32px' }}>
                    <h1 style={{ fontSize: '30px' }}>Set new password</h1>
                    <p style={{marginTop:'12px'}}>Must be at least 8 characters</p>
                    <div style={{ width: '476px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</p>
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                            />
                            {passwordError && <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>}
                        </div>
                        <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Confirm Password</p>
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!confirmPasswordError}
                            />
                            {confirmPasswordError && <p style={{ color: 'red', fontSize: '12px' }}>{confirmPasswordError}</p>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                            <Button kind={KIND.secondary} onClick={() => handleItemClick("/otp")}><IoIosArrowRoundBack size={30} /></Button>
                            <Button endEnhancer={<IoIosArrowRoundForward size={30} />} onClick={handleResetClick}>Reset Password</Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', border: '1px solid #EEEEEE', borderRadius: '8px', padding: '32px', width:'540px' }}>
                    <h1 style={{ fontSize: '30px', marginBottom:'12px' }}>All Done!</h1>
                    <p style={{marginBottom:'40px', fontSize:'16px', color:'#000000B2'}}>Your password has been reset</p>
                    <Button 
                    endEnhancer={<IoIosArrowRoundForward size={30} />} 
                    onClick={() => navigate("/admin")}
                    overrides={{
                        BaseButton: {
                          style: ({ $theme }) => ({
                           width:'100%'
                          })
                        }
                      }}
                    >
                        Go to homepage
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ResetPassword;
