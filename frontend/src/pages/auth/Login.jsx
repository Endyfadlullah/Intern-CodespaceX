import React from 'react'
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleItemClick = ( path) => {
        navigate(path);
      };
    return (
        <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</p>
            <Input
                placeholder="Your email"
            />
            <div style={{ marginBottom: '20px', marginTop: '20px' }}>
                <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</p>
                <Input
                    placeholder="Your password"
                    type="password"
                />
            </div>
            <StyledLink style={{ cursor: 'pointer' , }}>Forgot password?</StyledLink>;
            <div>
            <Button
            onClick={() => handleItemClick("/admin/dashboard")}
                overrides={{
                    Root: {
                        style: {
                            height: '46px',
                            width:'100%',
                            marginTop:'20px'
                        },
                    },
                }}
            >
                Log in
            </Button>
            </div>
            
        </div>
    )
}

export default Login
