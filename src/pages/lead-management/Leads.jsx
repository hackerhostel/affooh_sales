import React, { useState } from "react";
import FormTextArea from "../../components/FormTextArea.jsx";
import FormInput from "../../components/FormInput.jsx";
import FormSelect from "../../components/FormSelect.jsx";
import CreateNewLead from "./CreateNewLead.jsx";
import {
    PencilIcon,
    EllipsisVerticalIcon,
    CheckBadgeIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    TrashIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { getSelectOptions } from "../../utils/commonUtils.js";

const Leads = () => {
    // Select Options
    const ownerOptions = getSelectOptions([
        { id: "Alice Johnson", name: "Alice Johnson" },
        { id: "Bob Smith", name: "Bob Smith" },
        { id: "Carol Lee", name: "Carol Lee" },
        { id: "David Brown", name: "David Brown" },
    ]);

    const typeOptions = getSelectOptions([
        { id: "Cold", name: "Cold" },
        { id: "Warm", name: "Warm" },
        { id: "Hot", name: "Hot" },
    ]);

    const stageOptions = getSelectOptions([
        { id: "New", name: "New" },
        { id: "Contacted", name: "Contacted" },
        { id: "Qualified", name: "Qualified" },
        { id: "Proposal", name: "Proposal" },
        { id: "Won", name: "Won" },
        { id: "Lost", name: "Lost" },
    ]);

    const sourceOptions = getSelectOptions([
        { id: "Website", name: "Website" },
        { id: "Facebook", name: "Facebook" },
        { id: "LinkedIn", name: "LinkedIn" },
        { id: "Referral", name: "Referral" },
    ]);

    // Table Data
    const [leadRows, setLeadRows] = useState([
        {
            id: 1,
            leadName: "John Trading Co.",
            owner: "Alice Johnson",
            type: "Warm",
            company: "John Trading",
            source: "Website",
            stage: "Contacted",
        },
        {
            id: 2,
            leadName: "Tech Matrix",
            owner: "Bob Smith",
            type: "Hot",
            company: "Tech Matrix Pvt Ltd",
            source: "LinkedIn",
            stage: "Qualified",
        },
    ]);

    const [editingRowId, setEditingRowId] = useState(null);
    const [openActionRowId, setOpenActionRowId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 5;
    const totalPages = Math.ceil(leadRows.length / rowsPerPage);

    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const pagedRows = leadRows.slice(indexOfFirst, indexOfLast);

    const [openCreatePopup, setOpenCreatePopup] = useState(false);


    // Edit Handlers
    const handleStartEdit = (id) => {
        setEditingRowId(id);
        setOpenActionRowId(null);
    };

    const handleEditChange = (id, { target: { name, value } }) => {
        setLeadRows((prev) =>
            prev.map((r) => (r.id === id ? { ...r, [name]: value } : r))
        );
    };

    const handleDoneEdit = () => {
        setEditingRowId(null);
    };

    const handleCloseEdit = () => {
        setEditingRowId(null);
    };

    const handleDeleteRow = (id) => {
        setLeadRows((prev) => prev.filter((r) => r.id !== id));
    };

    const toggleActionMenu = (id) => {
        setOpenActionRowId((prev) => (prev === id ? null : id));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((p) => p + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((p) => p - 1);
    };

    return (
        <div className="mt-6">
            {/* Header */}
            <div className="flex items-center gap-5">
                <span className="text-lg font-semibold">Lead Management</span>
                <div className="flex items-center gap-1">
                    <PlusCircleIcon onClick={() => setOpenCreatePopup(true)} className="w-6 h-6 text-pink-500 cursor-pointer" />
                    <button onClick={() => setOpenCreatePopup(true)} className="text-text-color">Add New</button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded p-3 mt-2">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="text-left text-secondary-grey border-b border-gray-200">
                            <th className="py-3 px-2 w-10">#</th>
                            <th className="py-3 px-2 text-center">Lead Name</th>
                            <th className="py-3 px-2 text-center">Owner</th>
                            <th className="py-3 px-2 text-center">Type</th>
                            <th className="py-3 px-2 text-center">Company</th>
                            <th className="py-3 px-2 text-center">Source</th>
                            <th className="py-3 px-2 text-center">Stage</th>
                            <th className="py-3 px-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pagedRows.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-3 text-center text-gray-500">
                                    No leads found
                                </td>
                            </tr>
                        )}

                        {pagedRows.map((row, index) => {
                            const isEditing = editingRowId === row.id;

                            return (
                                <tr key={row.id} className="border-b border-gray-200">
                                    <td className="py-3 px-2">{indexOfFirst + index + 1}</td>

                                    {/* Normal Row */}
                                    {!isEditing ? (
                                        <>
                                            <td className="py-3 px-2">{row.leadName}</td>
                                            <td className="py-3 px-2">{row.owner}</td>
                                            <td className="py-3 px-2">{row.type}</td>
                                            <td className="py-3 px-2">{row.company}</td>
                                            <td className="py-3 px-2">{row.source}</td>
                                            <td className="py-3 px-2">{row.stage}</td>

                                            <td className="py-3 px-2">
                                                {openActionRowId !== row.id ? (
                                                    <div
                                                        className="cursor-pointer inline-flex"
                                                        onClick={() => toggleActionMenu(row.id)}
                                                    >
                                                        <EllipsisVerticalIcon className="w-5 h-5 text-secondary-grey" />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-3">
                                                        <PencilIcon
                                                            className="w-5 h-5 cursor-pointer"
                                                            onClick={() => handleStartEdit(row.id)}
                                                        />
                                                        <TrashIcon
                                                            className="w-5 h-5 cursor-pointer"
                                                            onClick={() => handleDeleteRow(row.id)}
                                                        />
                                                        <XMarkIcon
                                                            className="w-5 h-5 cursor-pointer"
                                                            onClick={() => setOpenActionRowId(null)}
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            {/* Edit Row */}
                                            <td className="py-3 px-2">
                                                <FormInput
                                                    name="leadName"
                                                    formValues={{ leadName: row.leadName }}
                                                    onChange={(e) => handleEditChange(row.id, e)}
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <FormSelect
                                                    name="owner"
                                                    formValues={{ owner: row.owner }}
                                                    options={ownerOptions}
                                                    onChange={(e) => handleEditChange(row.id, e)}
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <FormSelect
                                                    name="type"
                                                    formValues={{ type: row.type }}
                                                    options={typeOptions}
                                                    onChange={(e) => handleEditChange(row.id, e)}
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <FormInput
                                                    name="company"
                                                    formValues={{ company: row.company }}
                                                    onChange={(e) => handleEditChange(row.id, e)}
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <FormSelect
                                                    name="source"
                                                    formValues={{ source: row.source }}
                                                    options={sourceOptions}
                                                    onChange={(e) => handleEditChange(row.id, e)}
                                                />
                                            </td>
                                            <td className="py-3 px-2">
                                                <FormSelect
                                                    name="stage"
                                                    formValues={{ stage: row.stage }}
                                                    options={stageOptions}
                                                    onChange={(e) => handleEditChange(row.id, e)}
                                                />
                                            </td>

                                            <td className="py-3 px-2">
                                                <div className="flex gap-3 items-center">
                                                    <CheckBadgeIcon
                                                        className="w-5 h-5 cursor-pointer"
                                                        onClick={handleDoneEdit}
                                                    />
                                                    <XMarkIcon
                                                        className="w-5 h-5 cursor-pointer"
                                                        onClick={handleCloseEdit}
                                                    />
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Pagination */}
                {leadRows.length > 0 && (
                    <div className="w-full flex gap-5 items-center justify-end mt-4">
                        <button
                            onClick={handlePreviousPage}
                            className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
                            disabled={currentPage === 1}
                        >
                            <ChevronLeftIcon className="w-4 h-4" />
                        </button>

                        <span className="text-gray-500">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={handleNextPage}
                            className="p-2 rounded-full bg-gray-200 disabled:opacity-50"
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
            <CreateNewLead
    isOpen={openCreatePopup}
    onClose={() => setOpenCreatePopup(false)}
/>


        </div>
    );


};

export default Leads;
