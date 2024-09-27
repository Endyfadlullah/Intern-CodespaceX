import React from 'react';
import profil from '../../image/Filled.jpg';
import { Avatar } from "baseui/avatar";
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { Button, } from 'baseui/button';
import { ListItemLabel } from 'baseui/list';
import { Setting, Logout } from 'iconsax-react';
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <StatefulPopover
        focusLock
        placement={PLACEMENT.bottomRight}
        content={({ close }) => (
          <div
            style={{
              width: "310px", // Gunakan ukuran yang lebih kecil untuk pengujian awal
              background: 'white',
               // Tambahkan padding agar konten lebih jelas
              borderRadius: '8px',
              zIndex: 1000 // Tambahkan z-index yang lebih tinggi untuk memastikan popover muncul di atas elemen lain
            }}
          >
            <div style={{ display: 'flex', gap: '12px' , padding:'10px 0 10px 25px', borderBottom:'1px solid #EEEEEE'}}>
              <ListItemLabel>
                <Avatar
                  name="Jane Doe"
                  style={{ width: '36px', height: '36px', cursor: 'pointer' }}
                  src={profil}
                />
              </ListItemLabel>
              <ListItemLabel description="mamat@gmail.com">
                <strong>Pak Mamat</strong>
              </ListItemLabel>
            </div>
            <Button
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                 width:'100%',
                 height:'64px',
                 backgroundColor: 'transparent', 
                 justifyContent:'0',
                 color:'#000000',
                 padding:'12px 16px 12px 16px',
                ':hover': {
                  backgroundColor: '#EEEEEE', 
                  borderRadius:'0'
                },
                ':active': {
                  backgroundColor: 'transparent', 
                },
                gap:'12px'
                })
              }
            }}
            >
            <Setting size="20" variant="Bold" />
              <p
                style={{
                  fontSize:'16px',
                  fontWeight:'600'
                }}>
                Settings
              </p>
            </Button>
            <Button
             onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/");
            }}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                 width:'100%',
                 height:'64px',
                 backgroundColor: 'transparent', 
                 justifyContent:'0',
                 color:'#000000',
                 padding:'12px 16px 12px 16px',
                ':hover': {
                  backgroundColor: '#EEEEEE', 
                  borderRadius:'0' 
                },
                ':active': {
                  backgroundColor: 'transparent', 
                },
                gap:'12px'
                })
              }
            }}
            >
           <Logout size="20"  variant="Bold"/>
              <p
                style={{
                  fontSize:'16px',
                  fontWeight:'600'
                }}>
                Log out
              </p>
            </Button>
          </div>
        )}
      >
        <Button
          overrides={{
            BaseButton: {
              style: ({ $theme }) => ({
                padding: '0',
                backgroundColor: 'transparant',
                ':hover': {
                  backgroundColor: 'transparent', // Nonaktifkan efek hover dengan tetap mempertahankan transparansi
                },
                ':active': {
                  backgroundColor: 'transparent', // Nonaktifkan efek active dengan tetap mempertahankan transparansi
                }
              })
            }
          }}
        >
          <Avatar
            name="Jane Doe"
            style={{ width: '36px', height: '36px', cursor: 'pointer' }}
            src={profil}
          />
        </Button>
      </StatefulPopover>
    </div>
  );
};

export default Profil;
