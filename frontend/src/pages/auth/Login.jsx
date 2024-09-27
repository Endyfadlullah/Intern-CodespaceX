import React, { useState } from 'react';
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { toaster, ToasterContainer } from "baseui/toast";
import { InfoCircle } from 'iconsax-react';
import axios from "axios";
import { API_URL } from "../../helper/network";

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
            showToast("Masukkan email dan password Anda.", "Jika anda belum memiliki akun silakan Registrasi");
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (validateInputs()) {
          try {
            const response = await axios.post(`${API_URL}/api/login`, {
              email: email,
              password: password,
            });
            localStorage.setItem("token", response.data.data.token);
            // console.log(response.data.data.role)
            const userRole = response.data.data.role;
            // navigate("/admin/dashboard");
            if (userRole === "admin") {
                navigate("/admin");
              } else {
                showToast("Login failed", "Maaf akun yang anda gunakan adalah customer");
              }
          } catch (error) {
            console.error("Login failed:", error);
            let errorMessage = "An error occurred";
      
            // Check if it's an AxiosError and if response exists
            if (axios.isAxiosError(error) && error.response) {
              errorMessage = error.response.data?.message || "Login failed"; // Use API message or fallback
            } else {
              errorMessage = error.message; // General error message if AxiosError does not contain response
            }
      
            // Show toast with the detailed error message
            showToast("Login failed", errorMessage);
          }
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

            <div style={{ marginBottom: '20px', marginTop: '36px' }}>
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
                    onClick={handleSubmit}
                    overrides={{
                        Root: {
                            style: {
                                height: '46px',
                                width: '100%',
                                marginTop: '36px'
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
