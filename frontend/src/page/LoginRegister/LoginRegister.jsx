import React, { useState } from 'react';
import './LoginRegister.css'

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);

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
            <form>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Your email" />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Your name" />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Your name" />
              </div>
              <div className="forgot-password">
                <a href="/">Forgot password?</a>
              </div>
              <button type="submit" className="submit-btn">Log in</button>
            </form>
          ) : (
            <form>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your full name" />
              </div>
              <div className="input-group">
                <label>Create Password</label>
                <input type="password" placeholder="Input new password (min 8 char)" />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Repeat password" />
              </div>
              <button type="submit" className="submit-btn">Register</button>
            </form>
          )}
        </div>
      </div>
      </div>
    );
}

export default LoginRegister
