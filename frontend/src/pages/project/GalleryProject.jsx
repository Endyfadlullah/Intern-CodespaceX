import React, {useState} from 'react';
import { Search } from "baseui/icon";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { ChevronDown } from "baseui/icon";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { StatefulMenu } from "baseui/menu";
import { FiPlus } from "react-icons/fi";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Avatar } from "baseui/avatar";
import { Tag, SIZE } from "baseui/tag";
import '../../components/Card/cardProject.css';
import NoDataProject from './NoDataProject';
import AddProject from './AddProject';

const GalleryProject = () => {


  const ITEMS = [
    { label: "Admin" },
    { label: "Customer" },
    { label: "Talent" },
  ];

  const data = [
    // ["Manhattan Project", "On Going", "Mobile apps, Website, Wo..", "Filled.jpg,Filled.jpg,Filled.jpg,Filled.jpg", "3 Juni 2024", "project.jpg"],
    // ["Manhattan Project", "In Review", "Mobile apps, Website", "Filled.jpg", "3 Juni 2024", "project.jpg"],
    // ["Manhattan Project", "Done", "Mobile apps, Website", "Filled.jpg,Filled.jpg", "3 Juni 2024", "project.jpg"],
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

        <Button startEnhancer={() => <FiPlus size={24} />}  onClick={() => openModalitem()}>
          Create new project
        </Button>
        <AddProject isOpen={isOpenitem} onClose={closeModalitem} />
      </div>

      {data.length === 0 ? (
                <NoDataProject />
            ) : (
      <div style={{ display: 'flex', gap:'40px' , flexWrap: 'wrap', marginTop:'24px'}}>
      {data.map((row, rowIndex) => (
        <Card
          key={rowIndex}
           className="cardProject"
          overrides={{
            Root: { style: { margin: '0', marginBottom: '16px' } },
            Contents: { style: { margin: '0' } }
          }}
        >
          <img
            src={require(`../../image/${row[5]}`)}
            alt=""
            height={155}
            style={{ width: '100%' }}
          />
          <StyledBody style={{ display: 'flex', justifyContent: 'space-between', margin: '32px 24px 32px 24px' }}>
            <div>
              <h2>{row[0]}</h2>
              <p style={{ fontSize: '14px' }}><span style={{ color: 'GrayText' }}>Due Time : </span>{row[4]}</p>
            </div>
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
          </StyledBody>
          <StyledAction style={{ margin: '0 24px 32px 24px', display: 'flex', justifyContent: 'space-between' }}>
            <p>{row[2]}</p>
            {getStatusTag(row[1])}
          </StyledAction>
        </Card>
      ))}

      </div>
      )}
    </div>
  )
}

export default GalleryProject
