import React from "react";
import Leads from "./Leads.jsx";
import {
   FolderOpenIcon
} from "@heroicons/react/24/outline";

const LeadManagementContentPage = ({ selectedDocument }) => {
  const renderContent = () => {
    if (!selectedDocument) {
      return (
        <div className="text-gray-600 text-center mt-44">
               <FolderOpenIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-300">NO DATA AVAILABLE</p>
        </div>
      );
    }

    switch (selectedDocument.name) {
      case "Leads":
        return <Leads />;
      case "Leads2":
        return <SoftwareAssetContentPage />;
      default:
        return <div className="text-gray-600 text-center mt-10">
            <FolderOpenIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg">No preview available for this document.</p>
        </div>;
    }
  };

  return (
    <div className="p-6 bg-dashboard-bgc min-h-screen">
      {renderContent()}
    </div>
  );
};

export default LeadManagementContentPage;
