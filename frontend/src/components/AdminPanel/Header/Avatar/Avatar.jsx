import React, { useState, useEffect, useRef } from 'react';
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import User from "../../../assets/202185e5be34c68b9887dd8ff73feb4f.jpeg"
import './Avatar.css'

const Avatar = () => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className='menu-container' ref={menuRef}>
      <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
        <img src={User} size={30} />
      </div>

      <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
        <h3>Nona Salisa<br /><span>Website Designer</span></h3>
        <ul>
          <DropdownItem icon={<CgProfile />} text={"My Profile"} />
          <DropdownItem icon={<MdOutlineSettings />} text={"Settings"} />
          <DropdownItem icon={<FiLogOut />} text={"Logout"} />
        </ul>
      </div>
    </div>
  );
}

function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      {props.icon}
      <a> {props.text} </a>
    </li>
  );
}

export default Avatar;
