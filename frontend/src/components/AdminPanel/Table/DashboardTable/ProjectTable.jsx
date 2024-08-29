// /src/components/ProjectTable.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import { BiSolidEditAlt } from 'react-icons/bi';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  background-color: white;
  &:nth-child(odd) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ status }) => 
    status === 'On Going' ? '#e0f0ff' :
    status === 'In Review' ? '#fff4e0' :
    '#e0ffe0'};
  color: ${({ status }) => 
    status === 'On Going' ? '#007bff' :
    status === 'In Review' ? '#ff9800' :
    '#4caf50'};
`;

const DropdownContainer = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 16px;
  margin-top: -1px;
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #666;

  &:hover {
    color: #000;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProjectTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleEdit = (index, event) => {
    event.stopPropagation();  // Prevents row toggle
    console.log(`Edit project at index ${index}`);
  };

  const handleDelete = (index, event) => {
    event.stopPropagation();  // Prevents row toggle
    console.log(`Delete project at index ${index}`);
  };

  const projects = [
    { title: 'Manhattan Project', status: 'On Going', platform: 'Mobile apps, Website, Wo..', talent: 1, lastUpdate: '3 Juni 2024', deadline: '3 Juni 2024' },
    { title: 'Manhattan Project', status: 'In Review', platform: 'Mobile apps, Website', talent: 2, lastUpdate: '3 Juni 2024', deadline: '3 Juni 2024' },
    { title: 'Manhattan Project', status: 'In Review', platform: 'Mobile apps, Website', talent: 3, lastUpdate: '3 Juni 2024', deadline: '3 Juni 2024' },
    { title: 'Manhattan Project', status: 'Done', platform: 'Mobile apps, Website', talent: 1, lastUpdate: '3 Juni 2024', deadline: '3 Juni 2024' },
  ];

  return (
    <Table>
      <thead>
        <TableRow>
          <TableCell>Select</TableCell>
          <TableCell>Project Title</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Platform</TableCell>
          <TableCell>Talent</TableCell>
          <TableCell>Last Update</TableCell>
          <TableCell>Deadline</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <TableRow onClick={() => toggleRow(index)}>
              <TableCell><input type="checkbox" /></TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell><StatusBadge status={project.status}>{project.status}</StatusBadge></TableCell>
              <TableCell>{project.platform}</TableCell>
              <TableCell>{Array(project.talent).fill('👤').join(' ')}</TableCell>
              <TableCell>{project.lastUpdate}</TableCell>
              <TableCell>{project.deadline}</TableCell>
              <TableCell>
                <ActionIcons>
                  <IconButton onClick={(event) => handleEdit(index, event)} title="Edit">
                    <BiSolidEditAlt />
                  </IconButton>
                  <IconButton onClick={(event) => handleDelete(index, event)} title="Delete">
                    <FaTrash />
                  </IconButton>
                </ActionIcons>
              </TableCell>
            </TableRow>
            {expandedRow === index && (
              <TableRow>
                <TableCell colSpan="8">
                  <DropdownContainer>
                    <h3>Checkpoint 2</h3>
                    <p><strong>Kickoff meeting</strong></p>
                    <p>We successfully held kickoff meeting, setting clear goals and expectations to start the project on the right track.</p>
                    <div>
                      <button>Manhattan project (figma)</button>
                      <button>Meeting video</button>
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Project details</span>
                      <button>Add New Checkpoint</button>
                    </div>
                  </DropdownContainer>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectTable;
