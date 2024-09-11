import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, KIND } from "baseui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Select } from "baseui/select";
import { DatePicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import AddTerm from './AddTerm';


const AddInvoice = () => {

    
    const navigate = useNavigate();
    const handleItemClick = (path) => {
        navigate(path);
    };
    const [value, setValue] = React.useState([
        {
            label: "|",
            id: "#F0F8FF"
        }
    ]);

    const [valuedate, setValuedate] = React.useState([
        new Date("2024-10-31T17:00:00.000Z")
    ]);

    const [valuetermin, setValuetermin] = React.useState("");


    const [isTermModalOpen, setIsTermModalOpen] = useState(false);

    const openTermModal = () => {
        setIsTermModalOpen(true);
    };

    const closeTermModal = () => {
        setIsTermModalOpen(false);
    };
    return (
        <div style={{ display: 'flex', padding: '30px' }}>
            <div style={{ width: '41%', height: '100%' }}>
                <div style={{ display: 'flex', marginBottom: '32px' }}>
                    <Button
                        onClick={() => handleItemClick("/admin/invoice")}
                        kind={KIND.tertiary}
                        overrides={{
                            Root: {
                                style: {
                                    padding: '0',
                                    marginLeft: '5px'
                                },
                            },
                        }}
                    >
                        <IoIosArrowRoundBack size={35} />
                    </Button>
                    <h1 style={{ fontSize: '28px', marginLeft: '10px' }}>Create Invoice</h1>
                </div>
                <div style={{ padding: '10px' }}>
                    <h2 style={{ paddingBottom: '16px' }}>Invoice Details</h2>
                    <div style={{ paddingBottom: '16px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>ID Invoice</p>
                        <Select
                            backspaceRemoves={false}
                            clearable={false}
                            closeOnSelect={false}
                            deleteRemoves={false}
                            escapeClearsValue={false}
                            options={[
                                {
                                    label: "",
                                    id: "#F0F8FF"
                                },
                                {
                                    label: "AliceBlue",
                                    id: "#F0F8FF"
                                },
                                {
                                    label: "AntiqueWhite",
                                    id: "#FAEBD7"
                                },
                            ]}
                            value={value}
                            onBlurResetsInput={false}
                            onCloseResetsInput={false}
                            onSelectResetsInput={false}
                            openOnClick={false}
                            placeholder="Select color"
                            onChange={params => setValue(params.value)}
                        />
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Payment Due</p>
                        <DatePicker
                            value={valuedate}
                            onChange={({ date }) =>
                                setValuedate(Array.isArray(date) ? date : [date])
                            }
                            timeSelectEnd
                            displayValueAtRangeIndex={0}
                        />
                    </div>
                    <div style={{ paddingBottom: '16px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Payment Terms</p>
                        <Input
                            value={valuetermin}
                            onChange={e => setValuetermin(e.target.value)}
                            readOnly
                            clearOnEscape
                            overrides={{
                                Root: {
                                  style: {
                                    marginBottom: '10px'
                                  },
                                },
                              }}
                        />
                        <Button onClick={openTermModal}
                        overrides={{
                            Root: {
                              style: {
                                fontSize:'14px',
                                fontWeight:'600'
                              },
                            },
                          }}
                        >Choose Payment Term</Button>
                        <AddTerm isOpen={isTermModalOpen} onClose={closeTermModal} />
                    </div>
                </div>
            </div>
            <div style={{ width: '59%', height: '100%', background: '#EEEEEE' }}>
                <h1>jhsafh</h1>
            </div>
        </div>
    )
}

export default AddInvoice
