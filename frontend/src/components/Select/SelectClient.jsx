import React, { useState, useEffect } from "react";
import { Input } from "baseui/input";
import { ListItem, ListItemLabel } from "baseui/list";
import { Avatar } from "baseui/avatar";
import { SearchNormal1 } from 'iconsax-react';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';

// Simpan daftar pengguna di luar komponen agar bisa digunakan di berbagai komponen
const users = [
    {
        id: 3,
        name: "Daffa Abdullah",
        role: "PT.Harpan",
        image: "Filled.jpg",
    },
    {
        id: 4,
        name: "Pak Mamat",
        role: "Jaya Abadi Group",
        image: "Filled.jpg",
    },
    {
        id: 5,
        name: "Rahmat",
        role: "CV. Kuda Bersinar",
        image: "Filled.jpg",
    },
];

const SelectableUserComponent = ({ selectedUserId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    // Mengisi input otomatis dengan user yang sesuai berdasarkan selectedUserId
    useEffect(() => {
        if (selectedUserId) {
            const user = users.find((user) => user.id === selectedUserId);
            if (user) {
                setSelectedUser(`${user.name} - ${user.role}`);
            }
        }
    }, [selectedUserId]);

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
            <StatefulPopover
                content={() => (
                    <div
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            height: '200px',
                            overflowY: 'auto',
                            borderRadius: '16px',
                            padding: '8px',
                            scrollbarWidth: 'none',  
                            msOverflowStyle: 'none',
                        }}
                    >
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
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
                            ))
                        ) : (
                            <div style={{ padding: '8px' }}>No users found</div>
                        )}
                    </div>
                )}
                placement={PLACEMENT.bottomLeft}
                isOpen={Boolean(searchTerm)} // Popover visible only when searchTerm exists
                onClickOutside={() => setSearchTerm('')} // Close popover if clicked outside
            >
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
                </div>
            </StatefulPopover>
        </div>
    );
};

export default SelectableUserComponent;
