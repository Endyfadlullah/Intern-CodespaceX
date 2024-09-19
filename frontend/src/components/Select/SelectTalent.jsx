import React, { useState } from "react";
import { Input } from "baseui/input";
import { KIND, SIZE } from "baseui/button";
import { ListItem, ListItemLabel } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { Tag } from "baseui/tag";
import styled from "styled-components";
import { SearchNormal1 } from 'iconsax-react';
import { CloseCircle } from 'iconsax-react';



const users = [
    {
        id: 1,
        name: "Daffa Fairuz",
        role: "UI Designer",
        image: "Filled.jpg",
    },
    {
        id: 2,
        name: "Daffa Abdullah",
        role: "UI Designer",
        image: "Filled.jpg",
    },
    {
        id: 3,
        name: "Daffa Abdullah",
        role: "UI Designer",
        image: "Filled.jpg",
    },
    {
        id: 4,
        name: "Daffa Abdullah",
        role: "UI Designer",
        image: "Filled.jpg",
    },
    {
        id: 5,
        name: "Rahmat",
        role: "Frontend Developer",
        image: "Filled.jpg",
    },
];

// Styled container for selected tags
const SelectedTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

// Main Component
const SelectalentComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleSelectUser = (user) => {
        if (!selectedUsers.find((u) => u.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
        setSearchTerm("");
    };

    const handleRemoveUser = (user) => {
        setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
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
                                borderRadius: '50px', // Capsule shape
                                height: '40px', // Fixed height
                                padding: '0 12px', // Horizontal padding
                                display: 'flex', // Flex to center content
                                alignItems: 'center', // Center content vertically
                                backgroundColor:'black',
                                color:'white'
                              },
                            },
                            Text: {
                              style: {
                                fontSize: '14px', // Adjust font size if needed
                              },
                            },
                            Action: {
                                component: (props) => (
                                  <div {...props} style={{ marginTop: '8px', marginLeft: '8px', cursor:'pointer'}}>
                                    <CloseCircle size="25" color="white" /> {/* Custom icon */}
                                  </div>
                                ),
                              },
                          }}
                        
                    >
                        {user.name}
                    </Tag>
                ))}
            </SelectedTagsContainer>

            <div style={{ position: 'relative' }}>
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name..."
                    clearOnEscape
                    startEnhancer={<span role="img" aria-label="Search"><SearchNormal1 size="16" /></span>}
                />

                {searchTerm && (
                    <div
                        style={{
                            width: '336px',
                            position: 'absolute',
                            bottom: '100%',
                            left: 0,
                            zIndex: 1000,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            marginTop: '8px',
                            height: '200px',
                            overflowY: 'auto',
                            scrollbarWidth: 'none',
                            borderRadius:'16px'
                            
                        }}
                    >
                        {filteredUsers.map((user) => (
                            <ListItem key={user.id} onClick={() => handleSelectUser(user)}
                            overrides={{
                                Content: {
                                  style: {
                                    justifyContent:'none',
                                    gap:'8px'
                                  },
                                },}}
                             >
                                <Avatar name={user.name} src={require(`../../image/${user.image}`)}/>
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

export default SelectalentComponent;
