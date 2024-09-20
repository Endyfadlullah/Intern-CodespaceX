import React, { useState } from 'react';
import {
    StyledTable,
    StyledTableHeadRow,
    StyledTableHeadCell,
    StyledTableBodyRow,
    StyledTableBodyCell
} from "baseui/table-semantic";
import { Checkbox } from "baseui/checkbox";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { Button, KIND, SHAPE } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { FiPlus } from "react-icons/fi";
import { Tag, SIZE } from 'baseui/tag';
import { Edit2, CloseSquare, Figma, Link1 } from 'iconsax-react';
import NoDataProject from './NoDataProject';
import { Avatar } from "baseui/avatar";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { StyledThumbnail } from "baseui/card";
import { ProgressSteps, Step} from "baseui/progress-steps";
import AddProject from './AddProject';
import EditProject from './EditProject';

const ListProject = () => {
    const ITEMS = [
        { label: "Admin" },
        { label: "Customer" },
        { label: "Talent" },
    ];

    const [checkedItems, setCheckedItems] = useState([false, false]);
    const [selectAll, setSelectAll] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    const handleCheckboxChange = (rowIndex, checked) => {
        setCheckedItems(prev => {
            const updated = [...prev];
            updated[rowIndex] = checked;
            return updated;
        });
    };

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        setCheckedItems(new Array(checkedItems.length).fill(checked));
    };

    const handleRowClick = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    const data = [
        ["Manhattan Project", "On Going", "Mobile apps, Website, Wo..", "Filled.jpg,Filled.jpg,Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "In Review", "Mobile apps, Website", "Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
    ];



    const getStatusTag = (status) => {
        switch (status) {
            case "On Going":
                return <Tag closeable={false} kind="accent" size={SIZE.medium}>
                    <b>On Going</b>
                </Tag>;
            case "In Review":
                return <Tag closeable={false} kind="warning" size={SIZE.medium}>
                    <b>In Review</b>
                </Tag>;
            case "Done":
                return <Tag closeable={false} kind="positive" size={SIZE.medium}
                    overrides={{
                        Root: {
                            style: {
                                paddingLeft: '28px !important',
                                paddingRight: '28px !important',
                            },
                        },
                    }}>
                    <b>Done</b>
                </Tag>;
            default:
                return null;
        }
    };

    const [isOpenitem, setIsOpenitem] = useState(false);
  
    function openModalitem() {
      setIsOpenitem(true);
    }
  
    function closeModalitem() {
      setIsOpenitem(false);
    }

    const [isOpenedit, setIsOpenedit] = useState(false);

    const openModaledit = () => {
        setIsOpenedit(true);
    };

    const closeModaledit = () => {
        setIsOpenedit(false);
    };

    return (
        <div>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', height: '40px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Input
                        startEnhancer={<Search size="25px" title="" />}
                        placeholder="Search Project"
                    />
                    <StatefulPopover
                        focusLock
                        placement={PLACEMENT.bottomLeft}
                        content={({ close }) => (
                            <StatefulMenu
                                items={ITEMS}
                                onItemSelect={() => close()}
                                overrides={{
                                    List: {
                                        style: {
                                            height: "120px",
                                            width: "138px",
                                            overflow: "hidden", // Menyembunyikan scroll
                                        },
                                    },
                                }}
                            />
                        )}
                    >
                        <Button
                            endEnhancer={() => <ChevronDown size={24} title="" />}
                            style={{ width: "200px", fontSize: "14px" }}
                            kind={KIND.secondary}
                        >
                            All Roles
                        </Button>
                    </StatefulPopover>
                </div>

                <Button startEnhancer={() => <FiPlus size={24} />} onClick={() => openModalitem()}>
                    Create new project
                </Button>
                <AddProject isOpen={isOpenitem} onClose={closeModalitem} />
            </div>

            {data.length === 0 ? (
                <NoDataProject />
            ) : (
                <StyledTable>
                    <thead>
                        <StyledTableHeadRow style={{ position: 'sticky', top: 0, background: 'black', zIndex: 'auto' }}>
                            <StyledTableHeadCell style={{  zIndex: 'auto',}}>
                                <Checkbox
                                    checked={selectAll}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    overrides={{
                                        Root: {
                                            style: {
                                                borderRadius: '4px',
                                                borderWidth: '1px',
                                                borderColor: '#D1D5DB',
                                            },
                                        },
                                        Checkmark: {
                                            style: {
                                                borderRadius: '4px',
                                                borderWidth: '1px',
                                                borderColor: '#D1D5DB',
                                            },
                                        },
                                        Toggle: {
                                            style: {
                                                borderRadius: '4px',
                                                borderWidth: '1px',
                                                borderColor: '#D1D5DB',
                                            },
                                        },
                                    }}
                                />
                            </StyledTableHeadCell>
                            <StyledTableHeadCell style={{ fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: '800',   zIndex: 'auto',}}>Project Title</StyledTableHeadCell>
                            <StyledTableHeadCell style={{  zIndex: 'auto',}}></StyledTableHeadCell>
                            <StyledTableHeadCell style={{ fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: '800',  zIndex: 'auto', }}>Status</StyledTableHeadCell>
                            <StyledTableHeadCell style={{ fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: '800',   zIndex: 'auto',}}>Platform</StyledTableHeadCell>
                            <StyledTableHeadCell style={{ fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: '800',   zIndex: 'auto',}}>Talent</StyledTableHeadCell>
                            <StyledTableHeadCell style={{ fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: '800',   zIndex: 'auto',}}>Last Update</StyledTableHeadCell>
                            <StyledTableHeadCell style={{ fontSize: '16px', fontFamily: 'Plus Jakarta Sans', fontWeight: '800',   zIndex: 'auto',}}>Deadline</StyledTableHeadCell>
                            <StyledTableHeadCell style={{  zIndex: 'auto',}}></StyledTableHeadCell>
                        </StyledTableHeadRow>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <React.Fragment key={rowIndex}>
                                <StyledTableBodyRow  style={{ cursor: 'pointer', backgroundColor: 'transparent'  }} >
                                    <StyledTableBodyCell
                                        style={{ verticalAlign: 'middle', }}
                                    >
                                        <Checkbox
                                            checked={checkedItems[rowIndex]}
                                            onChange={(e) => handleCheckboxChange(rowIndex, e.target.checked)}
                                            overrides={{
                                                Root: {
                                                    style: {
                                                        borderRadius: '4px',
                                                        borderWidth: '1px',
                                                        borderColor: '#D1D5DB',
                                                    },
                                                },
                                                Checkmark: {
                                                    style: {
                                                        borderRadius: '4px',
                                                        borderWidth: '1px',
                                                        borderColor: '#D1D5DB',
                                                    },
                                                },
                                                Toggle: {
                                                    style: {
                                                        borderRadius: '4px',
                                                        borderWidth: '1px',
                                                        borderColor: '#D1D5DB',
                                                    },
                                                },
                                            }}

                                        />
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell
                                    onClick={() => handleRowClick(rowIndex)}
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Plus Jakarta Sans',
                                            fontWeight: '600',
                                            verticalAlign: 'middle',
                                            cursor: 'pointer',
                                            paddingLeft:'0',paddingRight:'0'
                                        }}
                                    >
                                        {row[0]}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell style={{ verticalAlign: 'middle',paddingLeft:'0',paddingRight:'0' }}>
                                        <Button size="compact" kind="tertiary" shape="square" onClick={() => handleRowClick(rowIndex)}>
                                            {expandedRow === rowIndex ? <MdKeyboardArrowUp size="32" /> : <MdKeyboardArrowDown size="32" />}
                                        </Button>
                                        {/* <MdKeyboardArrowDown size="32" variant="Outline" /> */}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell onClick={() => handleRowClick(rowIndex)} style={{paddingLeft:'0',paddingRight:'0'}}>{getStatusTag(row[1])}</StyledTableBodyCell>
                                    <StyledTableBodyCell
                                    onClick={() => handleRowClick(rowIndex)}
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Plus Jakarta Sans',
                                            fontWeight: '600',
                                            verticalAlign: 'middle',
                                            cursor: 'pointer',
                                            paddingLeft:'0',paddingRight:'0'
                                        }}
                                    >{row[2]}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell onClick={() => handleRowClick(rowIndex)} style={{ verticalAlign: 'middle', paddingLeft:'0',paddingRight:'0'}}>
                                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', }}>
                                            {row[3].split(',').map((image, index) => (
                                                <Avatar
                                                    key={index}
                                                    name="Talent"
                                                    overrides={{
                                                        Root: {
                                                            style: {
                                                                width: '36px',
                                                                height: '36px',
                                                                marginLeft: index > 0 ? '-10px' : '0',
                                                                zIndex: -1,
                                                            },
                                                        },
                                                    }}
                                                    src={require(`../../image/${image.trim()}`)}
                                                />
                                            ))}
                                        </div>
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell
                                    onClick={() => handleRowClick(rowIndex)}
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Plus Jakarta Sans',
                                            fontWeight: '600',
                                            verticalAlign: 'middle',
                                            cursor: 'pointer',
                                            paddingLeft:'0',paddingRight:'0'
                                        }}
                                    >{row[4]}</StyledTableBodyCell>
                                    <StyledTableBodyCell
                                    onClick={() => handleRowClick(rowIndex)}
                                        style={{
                                            fontSize: '16px',
                                            fontFamily: 'Plus Jakarta Sans',
                                            fontWeight: '600',
                                            verticalAlign: 'middle',
                                            cursor: 'pointer',
                                            paddingLeft:'0',paddingRight:'0'
                                        }}
                                    >{row[5]}</StyledTableBodyCell>
                                    <StyledTableBodyCell style={{ verticalAlign: 'middle',paddingLeft:'0',paddingRight:'0' }}>
                                        <>
                                            <Button
                                                onClick={openModaledit}
                                                kind={KIND.tertiary}
                                                size={SIZE.mini}
                                                overrides={{
                                                    Root: {
                                                        style: {
                                                            padding: '0',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Edit2 variant="Bold" />
                                            </Button>

                                            

                                            <Button
                                                onClick={() => alert("Clicked another action for row: " + JSON.stringify(row))}
                                                kind={KIND.tertiary}
                                                size={SIZE.mini}
                                                overrides={{
                                                    Root: {
                                                        style: {
                                                            padding: '0',
                                                            marginLeft: '10px'
                                                        },
                                                    },
                                                }}
                                            >
                                                <CloseSquare color="#E11C48" variant="Bold" />
                                            </Button>
                                        </>
                                    </StyledTableBodyCell>
                                </StyledTableBodyRow>

                                {/* Tampilkan baris baru jika baris diklik */}
                                {expandedRow === rowIndex && (
                                    <tr>
                                        <td colSpan={10}  style={{ padding: '10px', background: '#FFFFF' }}>
                                            <div style={{ display: 'flex', backgroundColor: '#f5f5f5', borderRadius: '8px', height: '100%', padding: '20px' }}>
                                                <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', width: '30%', paddingRight: '5px' }}>
                                                    <StyledThumbnail
                                                        style={{ width: '100%', height: '215px', borderRadius: '8px', }}
                                                        src={require("../../image/project.jpg")}
                                                    />
                                                </div>
                                                <div style={{ width: '70%', }}>
                                                    <ProgressSteps
                                                        overrides={{
                                                            Root: {
                                                                style: {
                                                                    padding: '0',

                                                                },
                                                            },
                                                            Title: {
                                                                style: {
                                                                    fontWeight: '500',
                                                                    paddingTop: '0',
                                                                    paddingBottom: '14px',
                                                                },
                                                            },
                                                            IconContainer: {
                                                                style: {
                                                                    padding: '0',
                                                                    marginTop: '0',
                                                                    backgroundColor: 'transparant'
                                                                },
                                                            },
                                                            Tail: {
                                                                style: {
                                                                    marginTop: 'calc(3px + (20px + 20px) / 2)',
                                                                    backgroundColor: 'transparent',
                                                                    height: 'calc(100% + 12px)',
                                                                    width: '2px',
                                                                    borderLeft: '3px dashed #000000',
                                                                }
                                                            },
                                                            Icon: {
                                                                style: {
                                                                    backgroundColor: 'none'
                                                                }
                                                            },
                                                            InnerIcon: {
                                                                style: {
                                                                    height: '16px',
                                                                    width: '18px',
                                                                    backgroundColor: 'none',
                                                                    border: '3px solid #000000',
                                                                    borderRadius: '50%',
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <Step title="Checkpoint 2">
                                                            <h3>Kickoff meeting</h3>
                                                            <p style={{ marginTop: '14px', fontSize:'16px' }}>
                                                                we successfuly held kick off meeting , setting
                                                                clear goals and expectations to start the
                                                                project on the right track kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                                                            </p>
                                                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                                                                <Button
                                                                    kind={KIND.secondary}
                                                                    startEnhancer={<Figma size="16" />}
                                                                    overrides={{
                                                                        Root: {
                                                                            style: {
                                                                                height: '32px',
                                                                                fontSize: '12px',
                                                                                color: 'black',
                                                                                backgroundColor: '#FFFFFF',
                                                                                ':hover': {
                                                                                    backgroundColor: '#EEEEEE',
                                                                                    color: 'black',
                                                                                },
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    Manhattan project (figma)
                                                                </Button>
                                                                <Button
                                                                    kind={KIND.secondary}
                                                                    startEnhancer={<Link1 size="16" />}
                                                                    overrides={{
                                                                        Root: {
                                                                            style: {
                                                                                height: '32px',
                                                                                fontSize: '12px',
                                                                                color: 'black',
                                                                                backgroundColor: '#FFFFFF',
                                                                                ':hover': {
                                                                                    backgroundColor: '#EEEEEE',
                                                                                    color: 'black',
                                                                                },
                                                                            },
                                                                        },
                                                                    }}
                                                                >
                                                                    Meeting video
                                                                </Button>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'flex-end' }}>
                                                                <Button kind={KIND.tertiary} shape={SHAPE.pill}>
                                                                    Project details
                                                                </Button>
                                                                <Button 
                                                                shape={SHAPE.pill}
                                                                overrides={{
                                                                    Root: {
                                                                        style: {
                                                                            height: '40px',
                                                                            fontSize: '12px',  
                                                                        },
                                                                    },
                                                                }}
                                                                >Add New Checpoint</Button>
                                                            </div>
                                                        </Step>
                                                        <Step title=""></Step>
                                                    </ProgressSteps>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </StyledTable>
            )}
           <EditProject isOpenedit={isOpenedit} onCloseedit={closeModaledit} />
        </div>
    );
};

export default ListProject;
