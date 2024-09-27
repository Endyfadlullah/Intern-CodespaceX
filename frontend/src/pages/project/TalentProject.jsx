import React, { useState } from 'react';
import { ListItem, ListItemLabel, ARTWORK_SIZES } from "baseui/list";
import { CloseCircle } from 'iconsax-react';
import { Avatar } from "baseui/avatar";
import { Button, SHAPE, KIND } from "baseui/button";
import { BsPlusLg } from "react-icons/bs";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { toaster, ToasterContainer } from "baseui/toast";
import { InfoCircle } from 'iconsax-react';



const dataTalentProject = [
    { id: 1, name: "Daffa Fairuz", role: "UI Designer", image: "Filled.jpg" },
    { id: 2, name: "Daffa Abdullah", role: "UI Designer", image: "Filled.jpg" },
];

const users = [
    { id: 1, name: "Daffa Fairuz", role: "UI Designer", image: "Filled.jpg" },
    { id: 2, name: "Daffa Abdullah", role: "UI Designer", image: "Filled.jpg" },
    { id: 3, name: "Rahmat", role: "Frontend Developer", image: "Filled.jpg" },
    { id: 4, name: "Aulia", role: "Backend Developer", image: "Filled.jpg" },
    { id: 5, name: "Budi", role: "Fullstack Developer", image: "Filled.jpg" },
];

const TalentProject = () => {

    const showToast = (title, description,) => {
        toaster.info(
            <div style={{ display: 'flex' , gap:'8px'}}>
                <InfoCircle size={30} variant="Bold"/>
                <div>
                    <strong>{title}</strong>
                    <div>{description}</div>
                </div>
            </div>,
            {
                autoHideDuration: 5000, 
            }
        );
    };



    const [dataTalentProjectdelete, setDataTalentProject] = useState(dataTalentProject);

    const handleSelectUser = (user) => {
        const newUser = {
            id: user.id,
            name: user.name,
            role: user.role,
            image: user.image,
        };


        const userExists = dataTalentProjectdelete.some(talent => talent.id === newUser.id);

        if (!userExists) {
            setDataTalentProject(prevData => [...prevData, newUser]);
        } else {
            showToast(
                `${user.name} sudah ada dalam daftar.`,
                "Silakan pilih talent lain.",

            );
        }
    };

    const handleDelete = (id) => {
        const updatedData = dataTalentProjectdelete.filter(talent => talent.id !== id);
        setDataTalentProject(updatedData);
    };



    return (
        <React.Fragment>
            <ToasterContainer
                overrides={{
                    ToastBody: {
                        style: ({ $theme }) => ({
                            outline: `${$theme.colors.negative} solid`,
                            backgroundColor: $theme.colors.negative,
                            width: '600px'
                        })
                    },
                    ToastCloseIcon: {
                        style: {
                            width: '24px', 
                            height: '24px', 
                        }
                      }
                }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {dataTalentProjectdelete.map((talent) => (
                    <div key={talent.id}>
                        <ListItem
                            artworkSize={ARTWORK_SIZES.MEDIUM}
                            endEnhancer={() => (
                                <Button
                                    kind={KIND.tertiary}
                                    shape={SHAPE.circle}
                                    onClick={() => handleDelete(talent.id)}
                                    overrides={{
                                        Root: {
                                            style: {
                                                ':hover': { backgroundColor: 'transparent' },
                                                ':active': { backgroundColor: 'transparent' },
                                            },
                                        },
                                    }}
                                >
                                    <CloseCircle size="32" variant="Bold" color='#979899' />
                                </Button>
                            )}
                            overrides={{
                                Root: {
                                    style: {
                                        border: '1px solid #EEEEEE',
                                        borderRadius: '8px',
                                        marginTop: '24px',
                                        width: '100%',
                                        height: '64px',
                                    },
                                },
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <ListItemLabel>
                                    <Avatar
                                        name={talent.name}
                                        style={{ width: '36px', height: '36px' }}
                                        src={require(`../../image/${talent.image}`)}
                                    />
                                </ListItemLabel>
                                <ListItemLabel description={talent.role}>{talent.name}</ListItemLabel>
                            </div>
                        </ListItem>
                    </div>
                ))}

                <StatefulPopover
                    focusLock
                    placement={PLACEMENT.bottomLeft}
                    content={({ close }) => (
                        <div style={{ width: "350px" }}>
                            {users.map((user) => (
                                <ListItem
                                    key={user.id}
                                    onClick={() => {
                                        handleSelectUser({
                                            id: user.id,
                                            name: user.name,
                                            role: user.role,
                                            image: user.image
                                        });
                                        close();
                                    }}
                                    overrides={{
                                        Content: {
                                            style: {
                                                justifyContent: 'none',
                                                gap: '8px'
                                            },
                                        },
                                    }}
                                >
                                    <Avatar
                                        name={user.name}
                                        src={require(`../../image/${user.image}`)}
                                    />
                                    <ListItemLabel>
                                        <strong>{user.name}</strong>
                                        <div>{user.role}</div>
                                    </ListItemLabel>
                                </ListItem>
                            ))}
                        </div>
                    )}
                >
                    <ListItem
                        artworkSize={ARTWORK_SIZES.MEDIUM}
                        overrides={{
                            Root: {
                                style: {
                                    border: '1px solid #EEEEEE',
                                    borderRadius: '8px',
                                    marginTop: '24px',
                                    width: '20%',
                                    backgroundColor: '#ECF0F1',
                                    height: '64px',
                                },
                            },
                            Content: {
                                style: {
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    height: '64px',
                                },
                            },
                        }}
                    >
                        <Button
                            kind={KIND.tertiary}
                            shape={SHAPE.circle}
                            overrides={{
                                Root: {
                                    style: {
                                        color: 'black',
                                        background: 'white',
                                        width: '32px',
                                        height: '32px',
                                        ':hover': {
                                            backgroundColor: 'white',
                                            color: 'black',
                                        },
                                    },
                                },
                            }}
                        >
                            <BsPlusLg size="20" />
                        </Button>
                    </ListItem>
                </StatefulPopover>
            </div>
        </React.Fragment>
    );
};

export default TalentProject;
