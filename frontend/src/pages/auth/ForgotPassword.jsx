import React from 'react'
import { ListItemLabel } from "baseui/list";
import { Input } from "baseui/input";
import { Button , KIND} from "baseui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const handleItemClick = ( path) => {
        navigate(path);
      };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <div style={{ border: '1px solid #EEEEEE', borderRadius: '8px', padding: '32px' }}>
                <h1 style={{fontSize:'30px'}}>Forgot password?</h1>
                <p>Enter your email for instructions</p>
                <div style={{ width: '476px', margin: '0 auto' }}>
                <ListItemLabel>Email Address</ListItemLabel>
                    <Input
                        placeholder="Enter email"
                        clearOnEscape
                    />
                <div style={{display:'flex', justifyContent:'space-between', marginTop:'24px'}}>
                    <Button kind={KIND.secondary} onClick={() => handleItemClick("/")}><IoIosArrowRoundBack size={30}/></Button>
                    <Button endEnhancer={<IoIosArrowRoundForward size={30}/>}>Send  code</Button>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default ForgotPassword;
