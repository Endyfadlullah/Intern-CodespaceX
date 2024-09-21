import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';



const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState('login'); // Default tab is 'login'

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <div style={{ border: '1px solid #EEEEEE', borderRadius: '8px', padding: '32px' }}>
                <h1 style={{fontSize:'30px'}}>Welcome to Codespace X</h1>
                <p>Please Log in on existing account, or create new account</p>
                <div style={{ width: '476px', margin: '0 auto' }}>
                    {/* Tab buttons */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '20px', background: '#EEEEEE', height: '46px', borderRadius: '10px' }}>
                        <button
                            onClick={() => handleTabClick('login')}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: activeTab === 'login' ? '#fff' : '#EEEEEE',
                                borderRadius: '10px',
                                border: activeTab === 'login' ? '3px solid #EEEEEE' : '3px solid #EEEEEE',
                                fontWeight: activeTab === 'login' ? 'bold' : 'normal',
                                width: '50%',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => handleTabClick('register')}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: activeTab === 'register' ? '#fff' : '#EEEEEE',
                                borderRadius: '10px',
                                border: activeTab === 'login' ? '3px solid #EEEEEE' : '3px solid #EEEEEE',
                                fontWeight: activeTab === 'register' ? 'bold' : 'normal',
                                width: '50%',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Register
                        </button>
                    </div>

                   
                    {activeTab === 'login' && (
                        <Login/>
                    )}

                    {activeTab === 'register' && (
                        <Register/>
                    )}
                </div>
                
            </div>
        </div>
    )
}

export default LoginRegister
