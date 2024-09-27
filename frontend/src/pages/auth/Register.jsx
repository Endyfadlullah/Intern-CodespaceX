import React, { useState } from 'react'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { TickCircle } from "iconsax-react";
import axios from "axios";
import { API_URL } from "../../helper/network";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!email.includes("@gmail.com")) {
            alert("Email must be a Gmail address");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_URL}/api/register`, {
                username,
                email,
                password,
            });
            alert("Registration successful!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '36px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Full Name</p>
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your full name"

                />
            </div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</p>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your email"
                endEnhancer={
                    email.includes("@gmail.com") ? <TickCircle size="20" color="green" /> : null
                }
            />
            <div style={{ marginBottom: '36px', marginTop: '36px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Create Password</p>
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Input new password (min 8 char)"
                    type="password"
                />
            </div>
            <div style={{ marginBottom: '36px', }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Confirm Password</p>
                <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    type="password"
                />
            </div>
            <div>
                <Button
                isLoading={loading}
                onClick={handleRegister}
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
                    Register
                </Button>
            </div>
        </div>
    )
}

export default Register
