import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { BiSolidEditAlt } from 'react-icons/bi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import IconTextButton from '../../Button/IconTextButton';
import { FaFigma } from "react-icons/fa6";
import { IoMdLink } from "react-icons/io";


const ProjectTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleEdit = (index, event) => {
    event.stopPropagation(); // Prevents row toggle
    console.log(`Edit project at index ${index}`);
  };

  const handleDelete = (index, event) => {
    event.stopPropagation(); // Prevents row toggle
    console.log(`Delete project at index ${index}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(projects.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const projects = [
    {
      title: 'Manhattan Project',
      status: 'On Going',
      platform: 'Mobile apps, Website, Wo..',
      talent: 1,
      lastUpdate: '3 Juni 2024',
      deadline: '3 Juni 2024',
    },
    {
      title: 'Manhattan Project',
      status: 'In Review',
      platform: 'Mobile apps, Website',
      talent: 2,
      lastUpdate: '3 Juni 2024',
      deadline: '3 Juni 2024',
    },
    {
      title: 'Manhattan Project',
      status: 'In Review',
      platform: 'Mobile apps, Website',
      talent: 3,
      lastUpdate: '3 Juni 2024',
      deadline: '3 Juni 2024',
    },
    {
      title: 'Manhattan Project',
      status: 'Done',
      platform: 'Mobile apps, Website',
      talent: 1,
      lastUpdate: '3 Juni 2024',
      deadline: '3 Juni 2024',
    },
  ];

  const statusStyles = {
    'On Going': 'bg-blue-100 text-blue-600',
    'In Review': 'bg-yellow-100 text-yellow-600',
    Done: 'bg-green-100 text-green-600',
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="px-4 py-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          <th className="px-4 py-2">Project Title</th>
          <th className="px-4 py-2 text-center"></th> {/* Kolom panah */}
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Platform</th>
          <th className="px-4 py-2">Talent</th>
          <th className="px-4 py-2">Last Update</th>
          <th className="px-4 py-2">Deadline</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <React.Fragment key={index}>
            <tr
              onClick={() => toggleRow(index)}
              className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b`}
            >
              <td className="px-4 py-2 flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleSelectRow(index)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-4 py-2">{project.title}</td>
              <td className="mt-3 px-4 py-2 flex justify-center items-center">
                {expandedRow === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </td>
              <td className="px-4 py-2 ">
                <span
                  className={`px-2 py-1 rounded ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
              </td>
              <td className="px-4 py-2">{project.platform}</td>
              <td className="px-4 py-2">
                <div className="flex -space-x-2 overflow-hidden">
                  {Array(project.talent)
                    .fill('')
                    .map((_, i) => (
                      <img
                        key={i}
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80`} // Ganti dengan URL gambar yang sesuai
                        alt={`Talent ${i + 1}`}
                      />
                    ))}
                </div>
              </td>
              <td className="px-4 py-2">{project.lastUpdate}</td>
              <td className="px-4 py-2">{project.deadline}</td>
              <td className="px-4 py-2 flex justify-center items-center">
                <div className="flex gap-2">
                  <button
                    onClick={(event) => handleEdit(index, event)}
                    className="text-gray-500 hover:text-black"
                    title="Edit"
                  >
                    <BiSolidEditAlt className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(event) => handleDelete(index, event)}
                    className="text-gray-500 hover:text-black"
                    title="Delete"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            {expandedRow === index && (
              <tr>
                <td colSpan="9" className="px-4 py-2">
                  <div className="bg-gray-100 border border-gray-300 p-4 mt-1 rounded-2xl flex items-start">
                    <div className='image flex-shrink-0'>
                      <img
                        src="https://tse3.mm.bing.net/th?id=OIP._Ze04-RwnIlNEZ4iXprYtAHaEk&pid=Api&P=0&h=180"
                        alt=""
                        className="h-50 w-50 object-cover rounded-md"
                      />
                    </div>
                    <div className="border-l flex items-start ml-6 pl-2">
                      {/* Dashed vertical line */}
                      <div className="absolute inset-y-0 left-0 w-px border-l border-dashed border-gray-500"></div>
                      <div className="pl-4">
                        <h3 className="mb-3">Checkpoint 2</h3>
                        <p className="mb-3 font-bold">Kickoff meeting</p>
                        <p className='mb-4'>
                          We successfully held kickoff meeting, setting clear goals and expectations to hhhhhhhhhhhhhhhhhhhhhhhhhstart the project offffffffffffffffffffffffffffffffffffffffffffffffffffffffn the right track.
                        </p>
                        <div className="mt-2 flex gap-3">
                          <IconTextButton
                            icon={FaFigma}
                            text=" Manhattan project (figma)"
                            link="https://www.example.com"
                            className="text-black hover:border-gray-300"
                          />
                          <IconTextButton
                            icon={IoMdLink}
                            text=" Meeting video"
                            link="https://www.example.com"
                            className=" text-black hover:border-gray-300"
                          />
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="px-4 py-2 text-black rounded-full text-l font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition">
                            Project details
                          </button>
                          <button className="ml-4 px-4 py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition">
                            Add New Checkpoint
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
