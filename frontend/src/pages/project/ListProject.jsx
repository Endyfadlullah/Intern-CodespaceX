import React, { useState } from 'react'
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { Checkbox } from "baseui/checkbox";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { Button, KIND, } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { FiPlus } from "react-icons/fi";
import { Tag, SIZE } from 'baseui/tag';
import { Edit2, CloseSquare, } from 'iconsax-react';
import NoDataProject from './NoDataProject';
import { MdKeyboardArrowDown } from "react-icons/md";
import { Avatar } from "baseui/avatar";



const ListProject = () => {
    const ITEMS = [
        { label: "Admin" },
        { label: "Customer" },
        { label: "Talent" },
    ];

    const [checkedItems, setCheckedItems] = useState([false, false]);
    const [selectAll, setSelectAll] = useState(false);




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

    const data = [
        ["Manhattan Project", "On Going", "Mobile apps, Website, Wo..", "Filled.jpg,Filled.jpg,Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "In Review", "Mobile apps, Website", "Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
        ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "3 Juni 2024"],
    ];


    const getStatusTag = (status) => {
        switch (status) {
            case "On Going":
                return <Tag closeable={false} kind="accent" size={SIZE.medium}
                   >
                    <b>On Going</b>
                </Tag>;
            case "In Review":
                return <Tag closeable={false} kind="warning" size={SIZE.medium}
                ><b>In Review</b></Tag>;
            case "Done":
                return <Tag closeable={false} kind="positive" size={SIZE.medium}
                overrides={{
                    Root: {
                        style: {
                            paddingLeft: '28px !important',
                            paddingRight: '28px !important',
                        },
                    },
                }}
                ><b>Done</b></Tag>;
            default:
                return null;
        }
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

                <Button startEnhancer={() => <FiPlus size={24} />}  >
                Create new project
                </Button>
            </div>



            {data.length === 0 ? (
                <NoDataProject />
            ) : (

                <TableBuilder data={data}>
                    <TableBuilderColumn header={
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
                    }

                        overrides={{
                            TableBodyCell: {
                                style: {
                                    verticalAlign: 'middle'
                                },
                            },
                        }}

                    >
                        {(row, rowIndex) => (
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
                        )}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Project Title"
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '800',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                        }}
                    >
                        {(row) => (row[0])}
                    </TableBuilderColumn>
                    <TableBuilderColumn header=""
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '800',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                        }}
                    >
                        {(row) => (
                            <MdKeyboardArrowDown size="32" variant="Outline" />
                        )}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Status"
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: 'bold',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                },
                            },
                        }}
                    >
                        {(row) => getStatusTag(row[1])}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Platform"
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: 'bold',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                        }}
                    >
                        {(row) => (row[2])}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Talent"
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: 'bold',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                        }}
                    >
                        {(row) => (
                               <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
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
                                         zIndex: index, 
                                       },
                                     },
                                   }}
                                   src={require(`../../image/${image.trim()}`)}  
                                 />
                               ))}
                             </div>
                        )}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Last Update"
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: 'bold',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                        }}
                    >
                        {(row) => (row[4])}
                    </TableBuilderColumn>
                    <TableBuilderColumn header="Deadline"
                        overrides={{
                            TableHeadCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: 'bold',
                                },
                            },
                            TableBodyCell: {
                                style: {
                                    fontSize: '16px',
                                    fontFamily: 'Plus Jakarta Sans',
                                    fontWeight: '600',
                                    verticalAlign: 'middle',
                                    cursor: 'pointer',
                                },
                            },
                        }}
                    >
                        {(row) => (row[5])}
                    </TableBuilderColumn>
                    <TableBuilderColumn header=""
                        overrides={{
                            TableBodyCell: {
                                style: {
                                    verticalAlign: 'middle',
                                },
                            },
                        }}
                    >
                        {(row) => (
                            <>
                                <Button
                                    //    onClick={() => openModalitem(true)}
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
                        )}
                    </TableBuilderColumn>
                </TableBuilder>
            )}
        </div>
    )
}

export default ListProject
