import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Select } from "baseui/select";
import { DatePicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import AddTerm from './AddTerm';
import { Checkbox } from "baseui/checkbox";
import { Edit2, Trash } from 'iconsax-react';
import { FiPlus } from "react-icons/fi";
import AddItem from './AddItem';
import { Textarea } from "baseui/textarea";
import PreviewInvoice from './PreviewInvoice';

const AddInvoice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mode = location.state?.mode || 'Create';

    const handleItemClick = (path) => {
        navigate(path);
    };

    const [value, setValue] = useState([
        {
            label: "|",
            id: "#F0F8FF"
        }
    ]);
    const [valueproject, setValueproject] = useState([
        {
            label: "|",
            id: "#F0F8FF"
        }
    ]);
    const [valuedate, setValuedate] = useState([new Date("2024-10-31T17:00:00.000Z")]);
    const [valuetermin, setValuetermin] = useState("");
    const [isTermModalOpen, setIsTermModalOpen] = useState(false);
    const [isTermSelected, setIsTermSelected] = useState(false);

    const openTermModal = () => {
        setIsTermModalOpen(true);
    };

    const closeTermModal = () => {
        setIsTermModalOpen(false);
    };

    const handleTermSelect = (selectedTerm) => {
        setValuetermin(selectedTerm);
        setIsTermSelected(true);
        setIsTermModalOpen(false);
    };


    const [checked, setChecked] = React.useState(false);


    const [isOpenitem, setIsOpenitem] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    function openModalitem(isEdit = false) {
        setIsEditMode(isEdit);
        setIsOpenitem(true);
    }

    function closeModalitem() {
        setIsOpenitem(false);
    }

    const [showPreview, setShowPreview] = useState(false);

    const [StatusType, setStatusType] = useState([]);

    return (
        <div style={{ display: 'flex', }}>
            <div style={{ width: '42%', height: '100%', marginTop: '30px', marginLeft: '30px', paddingRight: '30px' }}>
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
                    <h1 style={{ fontSize: '28px', marginLeft: '10px' }}>{mode === 'Edit' ? 'Edit Invoice' : 'Create Invoice'}</h1>
                </div>






                <div style={{ padding: '10px' }}>
                    <h2 style={{ paddingBottom: '16px' }}>Status</h2>
                    <Select
                        backspaceRemoves={false}
                        clearable={false}
                        closeOnSelect={true}
                        deleteRemoves={false}
                        escapeClearsValue={false}
                        options={[
                            {
                                label: "Draft",
                                id: "#F0F8FF",
                            },
                            {
                                label: "Sent",
                                id: "#F0F8FF",
                            },
                            {
                                label: "Paid",
                                id: "#FAEBD7",
                            },
                            {
                                label: "On hold",
                                id: "#FAEBD7",
                            },
                        ]}
                        value={StatusType}
                        searchable={false}
                        placeholder="status"
                        onChange={(params) => setStatusType(params.value)}
                    />
                </div>
                <div style={{ padding: '10px' }}>
                    <h2 style={{ paddingBottom: '16px' }}>Invoice Details</h2>
                    <div style={{ paddingBottom: '16px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>ID Invoice</p>
                        <Select
                            backspaceRemoves={false}
                            clearable={false}
                            closeOnSelect={true}
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
                    <div style={{ paddingBottom: '16px', marginBottom: '32px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Payment Terms</p>

                        {isTermSelected && (
                            <Input
                                value={valuetermin}
                                onChange={(e) => setValuetermin(e.target.value)}
                                readOnly
                                clearOnEscape
                                overrides={{
                                    Root: {
                                        style: {
                                            marginBottom: "10px",
                                        },
                                    },
                                }}
                            />
                        )}
                        <Button
                            onClick={openTermModal}
                            overrides={{
                                Root: {
                                    style: {
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        height: '40px'
                                    },
                                },
                            }}
                        >
                            Choose Payment Term
                        </Button>
                        <AddTerm
                            isOpen={isTermModalOpen}
                            onClose={closeTermModal}
                            onSaveTerm={handleTermSelect}
                        />
                    </div>
                    <h2 style={{ paddingBottom: '16px' }}>Project</h2>
                    <div style={{ paddingBottom: '16px', marginBottom: '32px' }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Project Name</p>
                        <Select
                            backspaceRemoves={false}
                            clearable={false}
                            closeOnSelect={true}
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
                            value={valueproject}
                            onBlurResetsInput={false}
                            onCloseResetsInput={false}
                            onSelectResetsInput={false}
                            openOnClick={false}
                            placeholder="Select color"
                            onChange={params => setValueproject(params.value)}
                        />
                    </div>






                    <h2 style={{ paddingBottom: '16px' }}>Item List</h2>
                    <div style={{ paddingBottom: '16px' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex' }}>
                                <Checkbox
                                    checked={checked}
                                    onChange={e => setChecked(e.target.checked)}
                                    overrides={{
                                        Root: {
                                            style: {
                                                borderRadius: '4px',
                                                borderWidth: '1px',
                                                borderColor: '#D1D5DB',
                                                backgroundColor: checked ? '#E0E0E0' : 'transparent',  // Background color when checked
                                            },
                                        },
                                        Checkmark: {
                                            style: {
                                                borderRadius: '4px',
                                                borderWidth: '1px',
                                                borderColor: checked ? '#4CAF50' : '#D1D5DB',  // Border color when checked
                                                backgroundColor: checked ? '#4CAF50' : 'transparent', // Background color when checked
                                            },
                                        },
                                        Toggle: {
                                            style: {
                                                borderRadius: '4px',
                                                borderWidth: '1px',
                                                borderColor: checked ? '#4CAF50' : '#D1D5DB', // Border color when checked
                                                backgroundColor: checked ? '#4CAF50' : 'transparent', // Background color when checked
                                            },
                                        },
                                    }}
                                />
                                <h2 style={{ paddingLeft: '15px' }}>Development</h2>
                                <Button
                                    onClick={() => openModalitem(true)}
                                    kind={KIND.tertiary}
                                    size={SIZE.mini}
                                    overrides={{
                                        Root: {
                                            style: {
                                                padding: '0',
                                                marginLeft: '15px'
                                            },
                                        },
                                    }}
                                >
                                    <Edit2 variant="Bold" color='#979899' />
                                </Button>
                            </div>
                            <div style={{ display: 'flex', paddingLeft: '40px', paddingTop: '12px' }}>
                                <div style={{ marginRight: '8px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Description</p>
                                    <Input
                                        value={"Hosting"}
                                        onChange={(e) => setValuetermin(e.target.value)}
                                        readOnly
                                        clearOnEscape
                                        overrides={{
                                            Root: {
                                                style: {
                                                    width: '216px'
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div style={{ marginRight: '8px' }}>
                                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Quantity</p>
                                    <Input
                                        value={"1"}
                                        onChange={(e) => setValuetermin(e.target.value)}
                                        readOnly
                                        clearOnEscape
                                        overrides={{
                                            Root: {
                                                style: {
                                                    width: '68px'
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div>
                                    <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Price</p>
                                    <Input
                                        value={"Rp. 1000000.00"}
                                        onChange={(e) => setValuetermin(e.target.value)}
                                        readOnly
                                        clearOnEscape
                                        overrides={{
                                            Root: {
                                                style: {
                                                    heigth: '40px'
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            {checked && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                    <Button
                                        kind={KIND.secondary}
                                        overrides={{
                                            Root: {
                                                style: {
                                                    height: '40px',
                                                },
                                            },
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        kind={KIND.secondary}
                                        overrides={{
                                            Root: {
                                                style: {
                                                    height: '40px',
                                                    gap: '5px',
                                                    color: '#CC4100',
                                                    background: '#FFEEEB',
                                                    ':hover': {
                                                        backgroundColor: '#CC4100',
                                                        color: '#FFFFFF',
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        <Trash size="16" />
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Button
                            onClick={() => openModalitem(false)}
                            overrides={{
                                Root: {
                                    style: {
                                        height: '40px',
                                        gap: '5px'
                                    },
                                },
                            }}
                        >
                            <FiPlus />
                            Add Item
                        </Button>
                        <AddItem isOpen={isOpenitem} onClose={closeModalitem} isEditMode={isEditMode} />
                    </div>
                </div>





                <div style={{ padding: '10px' }}>
                    <h2 style={{ paddingBottom: '16px' }}>Notes</h2>
                    <Textarea
                        placeholder="Notes"
                        clearOnEscape
                        overrides={{
                            Root: {
                                style: {
                                    height: '170px',
                                },
                            },
                        }}
                    />
                </div>

                <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>

                    <Button
                        onClick={() => setShowPreview(true)}
                        kind={KIND.secondary}
                        shape={SHAPE.pill}
                        overrides={{
                            Root: {
                                style: {
                                    height: '40px',
                                    gap: '5px',
                                    color: '#FFFFFF',
                                    background: '#979899',
                                    ':hover': {
                                        backgroundColor: '#EEEEEE',
                                        color: 'black',
                                    },
                                },
                            },
                        }}
                    >
                        Send Invoice
                    </Button>
                    <Button
                        onClick={() => setShowPreview(false)}
                        kind={KIND.secondary}
                        shape={SHAPE.pill}
                        overrides={{
                            Root: {
                                style: {
                                    height: '40px',
                                },
                            },
                        }}
                    >
                        Save as Draft
                    </Button>
                </div>
            </div>












            <div style={{ width: '58%', height: 'auto', background: '#EEEEEE', padding: '65px' }}>
                {/* <Skeleton width="600px" height="800px" animation /> */}
                <div style={{ margin: '30px', background: '#FFFFFF', height: '100vh', width: '552px', borderRadius: '8px', padding: '20px' }}>
                    {showPreview && <PreviewInvoice />}
                </div>
            </div>
        </div>
    );
};

export default AddInvoice;
