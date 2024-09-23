import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { Checkbox } from "baseui/checkbox";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { Button, KIND, SIZE } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { FiPlus } from "react-icons/fi";
import { Edit2, CloseSquare } from 'iconsax-react';
import AddAnnouncement from './AddAnnouncement';
import NoDataUser from './NoDataAnnouncement';



const Announcement = () => {
  // const navigate = useNavigate();

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
    ["System Maintenance", "Heads up! We'll be performing scheduled main...", "Global", "www. google.com", "3 Juni 2024"],
    ["System Maintenance", "Heads up! We'll be performing scheduled main...", "Fajar, Indra ", "www. google.com", "3 Juni 2024"],
  ];


  const [isOpenitem, setIsOpenitem] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  function openModalitem(isEdit = false) {
    setIsEditMode(isEdit);
    setIsOpenitem(true);
  }

  function closeModalitem() {
    setIsOpenitem(false);
  }

  
  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '28px' }}>Announcement</h1>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', height: '40px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            startEnhancer={<Search size="25px" title="" />}
            placeholder="Search User"
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

        <Button startEnhancer={() => <FiPlus size={24}/>}   onClick={() => openModalitem(false)}>
          Add New
        </Button>
      </div>

      <AddAnnouncement isOpen={isOpenitem} onClose={closeModalitem} isEditMode={isEditMode}/>


      {data.length === 0 ? (
        <NoDataUser />
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
        <TableBuilderColumn header="Title"
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
        <TableBuilderColumn header="Description"
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
          {(row) => (row[1])}
        </TableBuilderColumn>
        <TableBuilderColumn header="Send to"
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
        <TableBuilderColumn header="Linked link"
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
                color:'#00000080'
              },
            },
          }}
        >
          {(row) => (row[3])}
        </TableBuilderColumn>
        <TableBuilderColumn header="Created at"
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
              onClick={() => openModalitem(true)}
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
  );
};

export default Announcement;
