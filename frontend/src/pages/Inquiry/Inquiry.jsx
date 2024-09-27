import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { Checkbox } from "baseui/checkbox";
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { Button, KIND, } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { Tag, SIZE } from 'baseui/tag';
import {  CloseSquare } from 'iconsax-react';
import InquiryRequest from '../dashboard/InquiryRequest';
import NoDataInquiry from './NoDataInquiry';



const Inquiry = () => {
  // const navigate = useNavigate();

  const ITEMS = [
    { label: "Pending" },
    { label: "Rejected" },
    { label: "Accepted" },
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
    ["Lionel Ronaldo", "PT. Sosro", "Pending", "Mobile apps, Websit..", "Lebih dari 6 bulan", "3 Juni 2024"],
    ["Messi", "Indolakto", "Rejected", "Mobile apps", "3 Bulan", "3 Juni 2024"],
    ["El Garnacho", "PT.Otsuka", "Accepted", "Mobile apps", "3 Bulan", "3 Juni 2024"],
  ];

  const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedRowData, setSelectedRowData] = useState(null);

    const handleRowClick = (row) => {
        setSelectedRowData(row); // Simpan data baris yang di-klik
        setIsOpenModal(true); // Buka modal
    };

    const closeModal = () => {
        setIsOpenModal(false); // Tutup modal
        setSelectedRowData(null); // Reset data yang dipilih
    };

  const getStatusTag = (status) => {
    switch (status) {
      case "Accepted":
        return <Tag closeable={false} kind="positive" size={SIZE.medium}
          overrides={{
            Root: {
              style: {
                paddingLeft: '18px !important',
                paddingRight: '18px !important',
              },
            },
          }}>
          <b>Accepted</b>
        </Tag>;
      case "Pending":
        return <Tag closeable={false} kind="warning" size={SIZE.medium}
          overrides={{
            Root: {
              style: {
                paddingLeft: '18px !important',
                paddingRight: '18px !important',
              },
            },
          }}>
          <b>Pending</b>
        </Tag>;
      case "Rejected":
        return <Tag closeable={false} kind="negative" size={SIZE.medium}
        ><b>Rejected</b></Tag>;
      default:
        return null;
    }
  };
 



  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '28px' }}>Inquiry</h1>
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
              style={{ width: "77px", fontSize: "14px" }}
              kind={KIND.secondary}
            >
              All
            </Button>
          </StatefulPopover>
        </div>

       

      </div>



      {data.length === 0 ? (
        <NoDataInquiry />
      ) : (

      <TableBuilder data={data} >
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
        <TableBuilderColumn header="Client Name"
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
             <div onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
             {row[0]}
         </div>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Company Name"
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
             <div onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
             {row[1]}
         </div>
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
          {(row) => getStatusTag(row[2])}
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
          {(row) => (
             <div onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
             {row[3]}
         </div>
          )}
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
          {(row) => (
             <div onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
             {row[4]}
         </div>
          )}
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
          {(row) => (
             <div onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }}>
             {row[5]}
         </div>
          )}
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
       <InquiryRequest
                isOpen={isOpenModal}
                onClose={closeModal}
                data={selectedRowData} // Kirim data yang dipilih ke modal
            />
    </div>
  );
};

export default Inquiry;
