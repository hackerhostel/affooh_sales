import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import FormInput from "../../components/FormInput.jsx";
import FormSelect from "../../components/FormSelect.jsx";
import UserSelect from "../../components/UserSelect.jsx";
import { useToasts } from "react-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import { clickedUser } from "../../state/slice/projectUsersSlice.js";
import { getSelectOptions } from "../../utils/commonUtils.js";


const EmployeeContent = () => {
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const selectedUser = useSelector(clickedUser);

    const [formValues, setFormValues] = useState({
        documentID: "DOC-001",
        version: "1.0",
        effectiveDate: "2025-10-07",
        classification: "",
        preparedBy: "",
        approvedBy: "",
        owner: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    // Dummy options and users
    const roles = ["Internal", "Confidential", "Public"];
    const dummyUsers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Alice Johnson" },
    ];

    const types = [
        { value: "TODO", label: "TODO" },
        { value: "IN PROGRESS", label: "IN PROGRESS" },
        { value: "DONE", label: "DONE" },
    ];

    // Handlers
    const toggleEditable = () => setIsEditable((prev) => !prev);

    const handleFormChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        setIsValidationErrorsShown(false);
    };

    return (
        <div className=" bg-dashboard-bgc min-h-screen">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Sidebar */}
                <div className=" w-1/4 bg-white rounded-lg p-4 h-[500px]">
                    <div className="flex justify-end">
                        <PencilIcon
                            onClick={toggleEditable}
                            className="w-4 text-secondary-grey cursor-pointer"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        {selectedUser?.avatar ? (
                            <img
                                src={selectedUser.avatar}
                                alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-pink flex items-center justify-center text-white text-sm font-semibold">
                                {selectedUser?.firstName?.[0] || "Q"}
                                {selectedUser?.lastName?.[0] || "M"}
                            </div>
                        )}
                        <span className="text-lg font-semibold text-center mt-5 text-secondary-grey mb-1">
                            Scope of the Quality Management System
                        </span>

                        <hr className="w-full mt-6 border-t border-gray-200" />

                        <div className="w-full space-y-4 mt-6">
                            <FormInput
                                name="email"
                                label="Email"
                                formValues={formValues}
                                placeholder="Email"
                                onChange={(e) =>
                                    setFormValues({ ...formValues, documentID: e.target.value })
                                }
                                className={`w-full p-2 border rounded-md ${isEditable
                                    ? "bg-white text-secondary-grey border-border-color"
                                    : "bg-user-detail-box text-secondary-grey border-border-color cursor-not-allowed"
                                    }`}
                                disabled={!isEditable}
                                formErrors={formErrors}
                                showErrors
                                showLabel
                            />

                            <FormInput
                                name="contactNo"
                                label="Contact Number"
                                formValues={formValues}
                                placeholder="Contact Number"
                                onChange={(e) =>
                                    setFormValues({ ...formValues, version: e.target.value })
                                }
                                className={`w-full p-2 border rounded-md ${isEditable
                                    ? "bg-white text-secondary-grey border-border-color"
                                    : "bg-user-detail-box text-secondary-grey border-border-color cursor-not-allowed"
                                    }`}
                                disabled={!isEditable}
                                formErrors={formErrors}
                                showErrors
                                showLabel
                            />

                            <FormSelect
                                name="role"
                                label="Role"
                                formValues={formValues}
                                options={getSelectOptions(roles)}
                                placeholder="Role"
                                onChange={(e) =>
                                    setFormValues({ ...formValues, role: e.target.value })
                                }
                                className={`w-full p-2 border rounded-md ${isEditable
                                    ? "bg-white text-secondary-grey border-border-color"
                                    : "bg-user-detail-box text-secondary-grey border-border-color cursor-not-allowed"
                                    }`}
                                disabled={!isEditable}
                                formErrors={formErrors}
                                showErrors
                                showLabel
                            />
                        </div>
                    </div>
                </div>


                {/* right side */}

                <div className="bg-white w-3/4 ">
                    <div className="flex-col p-6 mt-4">
                        <div className="flex-col w-1/2">
                            <p className={"text-secondary-grey text-left"}>Type</p>
                            <FormSelect
                                name="type"
                                label="Type"
                                formValues={formValues}
                                options={types}
                                onChange={getSelectOptions}
                            />
                        </div>

                        <div className=" flex w-1/2 gap-4 mt-4">

                            <div className="flex-col w-1/3">
                                <p className={"text-secondary-grey text-left"}>Unit</p>
                                <FormSelect
                                    name="unit"
                                    label="Unit"
                                    formValues={formValues}
                                    options={types}
                                    onChange={getSelectOptions}
                                />
                            </div>

                            <div className={"flex-col w-2/3"}>
                                <p className={"text-secondary-grey text-left"}>Amount</p>
                                <FormInput
                                    type="amount"
                                    name="amount"
                                    formValues={formValues}
                                    onChange={({ target: { name, value } }) =>
                                        handleFormChange(name, value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6  mt-10">
                        <div>
                            <p className="text-left">Weekly working hours</p>
                        </div>
                         <div>
                            
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeContent;
