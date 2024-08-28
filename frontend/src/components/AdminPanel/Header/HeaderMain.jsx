import * as React from "react";
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { IoNotificationsOutline } from "react-icons/io5";



function HeaderMain() {
  return (
    <div style={{ display: 'flex', alignItems: '' }}>
      <Button 
        onClick={() => alert("click")}
        kind={KIND.secondary}
        size={SIZE.large}
        shape={SHAPE.circle}
        style={{ 
          width: '40px', 
          height: '40px', 
          border: 'none', 
          borderRadius: '50%' 
        }} 
      >
        <IoNotificationsOutline size={24} color="black" /> 
      </Button>
     
    </div>
  );
}

export default HeaderMain;
