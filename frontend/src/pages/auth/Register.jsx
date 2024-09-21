import React, { useState } from 'react'
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { TickCircle } from "iconsax-react";

const Register = () => {
    const [email, setEmail] = useState("");
    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Full Name</p>
                <Input
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
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Create Password</p>
                <Input
                    placeholder="Input new password (min 8 char)"
                    type="password"
                />
            </div>
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Confirm Password</p>
                <Input
                    placeholder="repeat password"
                    type="password"
                />
            </div>
            <div>
                <Button
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
