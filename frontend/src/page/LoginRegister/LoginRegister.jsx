import React, { useState } from 'react';
import './LoginRegister.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helpers/helpers";

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [inputUsername, setInputUsername] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/login`, {
                email: inputUsername,
                password: inputPassword,
            });
            localStorage.setItem("token", response.data.token);
            alert("Login successful!"); // Alert sukses
            navigate("/admin");
        } catch (error) {
            console.error("Login failed:", error);

            // Ambil pesan kesalahan dari response
            const errorMessage = error.response?.data?.errors || "Login failed! Please try again.";
            alert(`Login failed: ${errorMessage}`); // Menampilkan alert dengan pesan kesalahan
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/register`, {
                username: inputUsername,
                email: inputEmail,
                password: inputPassword,
            });
            console.log("Registration successful:", response.data);
            alert("Registration successful!"); // Alert sukses
            navigate("/"); 
        } catch (error) {
            console.error("Registration failed:", error);

            // Ambil pesan kesalahan dari response
            const errorMessage = error.response?.data?.errors || "Registration failed! Please try again.";
            alert(`Registration failed: ${errorMessage}`); // Menampilkan alert dengan pesan kesalahan
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="body_login">
            <div className="container">
                <div className="form-container">
                    <h2>Welcome to Codespace X</h2>
                    <p className='description'>Please Log in to an existing account, or create a new account</p>
                    <div className="toggle-buttons">
                        <button 
                            className={isLogin ? 'active' : ''} 
                            onClick={() => setIsLogin(true)}
                        >
                            Log in
                        </button>
                        <button 
                            className={!isLogin ? 'active' : ''} 
                            onClick={() => setIsLogin(false)}
                        >
                            Register
                        </button>
                    </div>
                    {isLogin ? (
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="Your email"
                                    value={inputUsername}
                                    onChange={(e) => setInputUsername(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Your password"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </div>
                            <div className="forgot-password">
                                <a href="/">Forgot password?</a>
                            </div>
                            <button type="submit" className="submit-btn">
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your full name"
                                    value={inputUsername}
                                    onChange={(e) => setInputUsername(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    value={inputEmail}
                                    onChange={(e) => setInputEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Create Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Input new password (min 8 char)"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Confirm Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Repeat password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
