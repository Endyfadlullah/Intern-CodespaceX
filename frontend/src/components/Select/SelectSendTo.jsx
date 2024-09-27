import React, { useState } from "react";
import { Input } from "baseui/input";
import { KIND, SIZE } from "baseui/button";
import { ListItem, ListItemLabel } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { Tag } from "baseui/tag";
import styled from "styled-components";
import { SearchNormal1, DeviceMessage } from 'iconsax-react';
import { CloseCircle } from 'iconsax-react';

// Styled container for selected tags
const SelectedTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const users = [
  { id: 1, name: "Daffa Fairuz", role: "PT.titik", image: "Filled.jpg" },
  { id: 2, name: "Daffa Abdullah", role: "PT.titik", image: "Filled.jpg" },
  { id: 3, name: "Daffa Abdullah", role: "PT.titik", image: "Filled.jpg" },
  { id: 4, name: "Daffa Abdullah", role: "PT.titik", image: "Filled.jpg" },
  { id: 5, name: "Rahmat", role: "PT.titik", image: "Filled.jpg" },
];

const SelectSendTo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSelectUser = (user) => {
    if (!selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchTerm(""); // Kosongkan input setelah user dipilih
    setIsDropdownVisible(false); // Tutup dropdown setelah user dipilih
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  const handleSelectGlobalAnnouncement = () => {
    setSearchTerm("Global Announcement"); // Set nilai input menjadi "Global Announcement"
    setIsDropdownVisible(false); // Tutup dropdown
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SelectedTagsContainer>
        {selectedUsers.map((user) => (
          <Tag
            key={user.id}
            onActionClick={() => handleRemoveUser(user)}
            kind={KIND.black}
            size={SIZE.large}
            closeable
            overrides={{
              Root: {
                style: {
                  borderRadius: "50px",
                  height: "40px",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "black",
                  color: "white",
                },
              },
              Text: {
                style: {
                  fontSize: "14px",
                },
              },
              Action: {
                component: (props) => (
                  <div
                    {...props}
                    style={{ marginTop: "8px", marginLeft: "8px", cursor: "pointer" }}
                  >
                    <CloseCircle size="25" color="white" />
                  </div>
                ),
              },
            }}
          >
            {user.name}
          </Tag>
        ))}
      </SelectedTagsContainer>

      <div style={{ position: "relative" }}>
        <Input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownVisible(true); 
          }}
          placeholder="who is it for"
          clearOnEscape
          startEnhancer={searchTerm !== "Global Announcement" ? (
            <span role="img" aria-label="Search"><SearchNormal1 size="16" /></span>
          ) : null}
        />

        {isDropdownVisible && searchTerm && (
          <div
            style={{
              width: "336px",
              position: "absolute",
              bottom: "100%",
              left: 0,
              zIndex: 1000,
              backgroundColor: "white",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              marginTop: "8px",
              height: "200px",
              overflowY: "auto",
              scrollbarWidth: "none",
              borderRadius: "16px",
            }}
          >
            <ListItem
              overrides={{
                Content: {
                  style: {
                    justifyContent: "none",
                    gap: "8px",
                    cursor: "pointer",
                  },
                },
              }}
              onClick={handleSelectGlobalAnnouncement} // Event handler untuk klik
            >
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  padding: "8px",
                  background: "#EEEEEE",
                  borderRadius: "50%",
                }}
              >
                <DeviceMessage size="25" variant="Bulk" />
              </div>
              <ListItemLabel><strong>Global Announcement</strong></ListItemLabel>
            </ListItem>
            <p style={{ paddingLeft: "16px", color: "black" }}>or choose client</p>
            {filteredUsers.map((user) => (
              <ListItem
                key={user.id}
                onClick={() => handleSelectUser(user)}
                overrides={{
                  Content: {
                    style: {
                      justifyContent: "none",
                      gap: "8px",
                    },
                  },
                }}
              >
                <Avatar name={user.name} src={require(`../../image/${user.image}`)} />
                <ListItemLabel>
                  <strong>{user.name}</strong>
                  <div>{user.role}</div>
                </ListItemLabel>
              </ListItem>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSendTo;
