import React, { useState } from "react";
import { Input } from "baseui/input";
import { ListItem, ListItemLabel } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { SearchNormal1 } from 'iconsax-react';

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



const SelectableUserComponent = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectUser = (user) => {
        setSelectedUser(`${user.name} - ${user.role}`);
        setSearchTerm("");  // Clear search input after selection
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Clear selected user if the input is not empty and does not match the selected user
        if (value && selectedUser && !value.includes(selectedUser)) {
            setSelectedUser(null);
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Display selected user name and role in the input field */}
            <div style={{ position: 'relative' }}>
                <Input
                    value={selectedUser || searchTerm} // Display selected user or search term
                    onChange={handleInputChange}
                    placeholder="Search name..."
                    startEnhancer={
                        !selectedUser && 
                        <span role="img" aria-label="Search"><SearchNormal1 size="16" /></span>
                    }
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
                            borderRadius: '16px'
                        }}
                    >
                        {filteredUsers.map((user) => (
                            <ListItem
                                key={user.id}
                                onClick={() => handleSelectUser(user)}
                                overrides={{
                                    Content: {
                                        style: {
                                            justifyContent: 'flex-start',
                                            gap: '8px',
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

export default SelectableUserComponent;
