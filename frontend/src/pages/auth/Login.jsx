import React, { useState } from 'react';
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { toaster, ToasterContainer } from "baseui/toast";
import { InfoCircle } from 'iconsax-react';

const Login = () => {
    const navigate = useNavigate();

    // State untuk input dan error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    // Validasi input
    const validateInputs = () => {
        let isValid = true;

        // Jika kedua input kosong
        if (!email && !password) {
            showToast("Missing Information", "Masukkan email dan password Anda.");
            setEmailError(true);
            setPasswordError(true);
            isValid = false;
            return isValid;
        }

        // Validasi email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            showToast("Invalid Email", "Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
        }

        // Validasi password
        if (!password || password.length < 8) {
            setPasswordError(true);
            showToast("Invalid Password", "Password must be at least 8 characters long.");
            isValid = false;
        } else {
            setPasswordError(false);
        }

        return isValid;
    };

    // Fungsi toast untuk menampilkan pesan kesalahan
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

    // Fungsi untuk handle click login
    const handleLoginClick = () => {
        if (validateInputs()) {
            // Jika validasi berhasil, pindah ke halaman dashboard
            navigate("/admin/dashboard");
        }
    };

    const handleItemClick = (path) => {
        navigate(path);
    };

    return (
        <div>
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

            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</p>
            <Input
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
            />

            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</p>
                <Input
                    placeholder="Your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                />
            </div>

            <StyledLink style={{ cursor: 'pointer' }} onClick={() => handleItemClick("/forgot")}>
                Forgot password?
            </StyledLink>

            <div>
                <Button
                    onClick={handleLoginClick}
                    overrides={{
                        Root: {
                            style: {
                                height: '46px',
                                width: '100%',
                                marginTop: '20px'
                            },
                        },
                    }}
                >
                    Log in
                </Button>
            </div>
        </div>
    );
};

export default Login;
