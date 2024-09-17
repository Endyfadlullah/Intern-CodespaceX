import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, KIND, SIZE, SHAPE } from "baseui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Select } from "baseui/select";
import { DatePicker } from "baseui/datepicker";
import { Input } from "baseui/input";
import AddTerm from './AddTerm';
import { Checkbox } from "baseui/checkbox";
import { Edit2, Trash, Calendar1 } from 'iconsax-react';
import { FiPlus } from "react-icons/fi";
import AddItem from './AddItem';
import { Textarea } from "baseui/textarea";
import PreviewInvoice from './PreviewInvoice';
import { StyledLink } from "baseui/link";


const AddInvoice = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mode = location.state?.mode || 'Create';

    const handleItemClick = (path, mode = 'create') => {
        navigate(path, { state: { mode } }); // Pass mode as 'create' or 'edit'
    };

    const [valueproject, setValueproject] = useState([
        {
            label: "|",
            id: "#F0F8FF"
        }
    ]);
    const [valuedate, setValuedate] = useState([new Date()]);
    const [valuetermin, setValuetermin] = useState("");
    const [terminNumber, setTerminNumber] = useState(0);
    const [totalTermin, setTotalTermin] = useState(0);
    const [isTermModalOpen, setIsTermModalOpen] = useState(false);
    const [isTermSelected, setIsTermSelected] = useState(false);
    const [paymentType, setPaymentType] = useState("");

    const openTermModal = () => {
        setIsTermModalOpen(true);
    };

    const closeTermModal = () => {
        setIsTermModalOpen(false);
    };

    const handleTermSelect = (selectedTerm, selectedTerminNumber, selectedTotalTermin) => {
        setPaymentType(selectedTerm);
        setValuetermin(selectedTerm === "Termin Payment" ? `Termin Payment` : "Single Payment");
        setTerminNumber(selectedTerminNumber);
        setTotalTermin(selectedTotalTermin);
        setIsTermSelected(true); // Ensure term is selected
        setIsTermModalOpen(false);
    };


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


    const [items, setItems] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    // Function to handle saving item from modal
    const saveItemData = (newTitle, newDescriptions) => {
        // Add new item to the list of items
        setItems([...items, { title: newTitle, descriptions: newDescriptions }]);
    };


    const handleDelete = () => {
        setItems(items.filter((_, index) => !checkedItems.includes(index)));
        setCheckedItems([]); // Clear checked items after delete
    };

    const handleCheckboxChange = (itemIndex, isChecked) => {
        if (isChecked) {
            setCheckedItems([...checkedItems, itemIndex]); // Tambahkan index item
        } else {
            setCheckedItems(checkedItems.filter(index => index !== itemIndex)); // Hapus index item
        }
    };



    const [id, setId] = useState('');
    const [isManual, setIsManual] = useState(false);
    const [linkText, setLinkText] = useState('Set Manual ID');

    // Function to generate auto-increment ID
    const generateAutoID = () => {
        // Example: Starting with INV-000000, you can implement more logic as needed
        const currentID = 1; // Example starting point, you may want to retrieve or calculate the next ID
        const formattedID = `INV-${String(currentID).padStart(6, '0')}`;
        return formattedID;
    };

    // Set the initial auto-generated ID when the component mounts
    useEffect(() => {
        if (!isManual) {
            const autoID = generateAutoID();
            setId(autoID);
        }
    }, [isManual]);

    // Toggle between manual and auto ID mode
    const handleToggleManual = () => {
        if (isManual) {
            setId(generateAutoID()); // Switch back to auto ID
            setLinkText('Set Manual ID');
        } else {
            setLinkText('Set Auto ID'); // Allow manual input
        }
        setIsManual(!isManual);
    };

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





                {mode === 'Edit' && (
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
                )}

                <div style={{ padding: '10px' }}>
                    <h2 style={{ paddingBottom: '16px' }}>Invoice Details</h2>
                    <div style={{ paddingBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>ID Invoice</p>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <StyledLink
                                    onClick={handleToggleManual}
                                    style={{ cursor: 'pointer', fontSize: '14px' }}
                                >
                                    {linkText}
                                </StyledLink>
                            </div>
                        </div>
                        <Input value={id}
                            onChange={(e) => setId(e.target.value)}
                            clearOnEscape
                            disabled={!isManual}
                            placeholder="ID will appear here" />
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
                            overrides={{
                                Input: {
                                    component: Input,
                                    props: {
                                        endEnhancer: () => <Calendar1 size="32" variant="Outline" />,
                                    },
                                },
                            }}
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
                                            display: paymentType === "Single Payment" || paymentType === "Termin Payment" ? 'block' : 'none',
                                        },
                                    },
                                }}
                            />
                        )}

                        {isTermSelected && paymentType === "Termin Payment" && (
                            <p style={{ marginBottom: '16px' }}>
                                Termin {terminNumber} dari total termin {totalTermin}
                            </p>
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
                            onSaveTerm={(term, number, total) => handleTermSelect(term, number, total)}
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
                            {items.map((itemData, itemIndex) => (
                                <div key={itemIndex} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <Checkbox
                                            checked={checkedItems.includes(itemIndex)}
                                            onChange={e => handleCheckboxChange(itemIndex, e.target.checked)}
                                            overrides={{
                                                Root: {
                                                    style: {
                                                        borderRadius: '4px',
                                                        borderWidth: '1px',
                                                        borderColor: checkedItems.includes(itemIndex) ? '#4CAF50' : '#D1D5DB', // Border color when checked
                                                        backgroundColor: checkedItems.includes(itemIndex) ? '#E0E0E0' : 'transparent', // Background color when checked
                                                    },
                                                },
                                                Checkmark: {
                                                    style: {
                                                        borderRadius: '4px',
                                                        borderWidth: '1px',
                                                        borderColor: checkedItems.includes(itemIndex) ? '#4CAF50' : '#D1D5DB',  // Border color when checked
                                                        backgroundColor: checkedItems.includes(itemIndex) ? '#4CAF50' : 'transparent', // Background color when checked
                                                    },
                                                },
                                                Toggle: {
                                                    style: {
                                                        borderRadius: '4px',
                                                        borderWidth: '1px',
                                                        borderColor: checkedItems.includes(itemIndex) ? '#4CAF50' : '#D1D5DB', // Border color when checked
                                                        backgroundColor: checkedItems.includes(itemIndex) ? '#4CAF50' : 'transparent', // Background color when checked
                                                    },
                                                },
                                            }}
                                        />
                                        <h2 style={{ paddingLeft: '15px' }}>{itemData.title}</h2>
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
                                    {itemData.descriptions.map((desc, index) => (
                                        <div key={index} style={{ display: 'flex', paddingLeft: '40px', paddingTop: '12px' }}>
                                            <div style={{ marginRight: '8px' }}>
                                                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Description</p>
                                                <Input
                                                    value={desc.description}
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
                                                    value={desc.quantity}
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
                                                    value={`Rp ${desc.price}`}
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
                                    ))}
                                </div>
                            ))}



                            {checkedItems.length > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                    <Button
                                        onClick={() => setCheckedItems([])}
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
                                        onClick={handleDelete}
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
                        <AddItem isOpen={isOpenitem} onClose={closeModalitem} isEditMode={isEditMode} onSave={saveItemData} />
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
                {showPreview &&
                    <div style={{ margin: '30px', background: '#FFFFFF', height: 'auto', width: '552px', borderRadius: '8px', padding: '20px' }}>
                        <PreviewInvoice />
                    </div>
                }
            </div>
        </div>
    );
};

export default AddInvoice;
