import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Edit2, CloseSquare } from 'iconsax-react';
import ViewInvoice from './ViewInvoice';
import NoDataInvoice from './NoDataInvoice';
import axios from 'axios';
import { API_URL } from '../../helper/network';


const Invoice = () => {
  const navigate = useNavigate();

  const ITEMS = [
    { label: "Draft" },
    { label: "Paid" },
    { label: "Sent" },
    { label: "On Hold" },
  ];

  const [checkedItems, setCheckedItems] = useState([false, false]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row); // Simpan data dari baris yang diklik
    setIsModalOpen(true); // Buka modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Reset setelah modal ditutup
  };

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

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.get(`${API_URL}/api/admin/invoice?status=All`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log(response.data);
      if (response.data) {
        // Format data API ke dalam bentuk yang sesuai dengan tabel
        const formattedData = response.data.map(invoice => [
          invoice.ID_Invoice,
          invoice.Status,
          invoice.Username,
          `Rp ${invoice.Amount.toLocaleString()}`,
          new Date(invoice.Created_at).toLocaleDateString(),
          new Date(invoice.Payment_Due).toLocaleDateString()
        ]);
        setData(formattedData);
        console.log(formattedData);
        setCheckedItems(new Array(formattedData.length).fill(false));
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const data = [
  //   ["INV-23923", "Darft", "Supratman", "Rp 300.00", "3 Juni 2024", "3 Juni 2024"],
  //   ["INV-23923", "Paid", "Supratman", "Rp 300.00", "3 Juni 2024", "3 Juni 2024"],
  //   ["INV-23923", "Sent", "Supratman", "Rp 300.00", "3 Juni 2024", "3 Juni 2024"],
  //   ["INV-23923", "On Hold", "Supratman", "Rp 300.00", "3 Juni 2024", "3 Juni 2024"],
  // ];

  const getStatusTag = (status) => {
    switch (status) {
      case "Draft":
        return <Tag closeable={false} kind="neutral" size={SIZE.medium}
          overrides={{
            Root: {
              style: {
                paddingLeft: '22px !important',
                paddingRight: '22px !important',
              },
            },
          }}>
          <b>Draft</b>
        </Tag>;
      case "Paid":
        return <Tag closeable={false} kind="positive" size={SIZE.medium}
          overrides={{
            Root: {
              style: {
                paddingLeft: '25px !important',
                paddingRight: '25px !important',
              },
            },
          }}>
          <b>Paid</b>
        </Tag>;
      case "Sent":
        return <Tag closeable={false} kind="warning" size={SIZE.medium}
          overrides={{
            Root: {
              style: {
                paddingLeft: '25px !important',
                paddingRight: '25px !important',
              },
            },
          }}>
          <b>Sent</b>
        </Tag>;
      case "OnHold":
        return <Tag closeable={false} kind="negative" size={SIZE.medium}><b>On Hold</b></Tag>;
      default:
        return null;
    }
  };

  const handleItemClick = (path, mode = 'create') => {
    navigate(path, { state: { mode } }); 
  };
  

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '28px' }}>Invoice</h1>
      <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', height: '40px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            startEnhancer={<Search size="25px" title="" />}
            placeholder="Search Invoice"
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
                      height: "150px",
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
              All View
            </Button>
          </StatefulPopover>
        </div>

        <Button startEnhancer={() => <FiPlus size={24} title="" />} onClick={() => handleItemClick('/admin/addInvoice', 'Create')}>
          Add New
        </Button>

      </div>



      {data.length === 0 ? (
        <NoDataInvoice />
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
        <TableBuilderColumn header="Invoice Number"
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
              // onClick: ({ row }) => handleRowClick(row)
            },
          }}
        >
          {(row) => (
            <div onClick={() => handleRowClick(row)}>
              {row[0]}
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
          {(row) => getStatusTag(row[1])}
        </TableBuilderColumn>
        <TableBuilderColumn header="Client Name"
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
            <div onClick={() => handleRowClick(row)}>
              {row[2]}
            </div>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Amount"
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
            <div onClick={() => handleRowClick(row)}>
              {row[3]}
            </div>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Invoice Date"
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
            <div onClick={() => handleRowClick(row)}>
              {row[4]}
            </div>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Invoice Deadline"
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
            <div onClick={() => handleRowClick(row)}>
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
                onClick={() => handleItemClick('/admin/addInvoice', 'Edit')}
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

      {isModalOpen && (
        <ViewInvoice
          isOpen={isModalOpen}
          closeModal={closeModal}
          invoiceData={selectedRow} // Kirim data baris yang diklik ke modal
        />
      )}
    </div>
  );
};

export default Invoice;
