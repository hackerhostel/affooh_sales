import React, { useState } from "react";
import MainPageLayout from "../../layouts/MainPageLayout.jsx";
import LeadManagementListPage from "./LeadManagementListPage.jsx";
import LeadManagementContentPage from "./LeadManagementContentPage.jsx";

const LeadManagementLayout = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const onAddNew = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
  };

  return (
    <MainPageLayout
      title="Lead Management"
      leftColumn={
        <LeadManagementListPage
          selectedFolderId={selectedFolderId}
          onSelect={setSelectedFolderId}
          onDocumentSelect={handleDocumentSelect}
        />
      }
      rightColumn={<LeadManagementContentPage selectedDocument={selectedDocument} />}
      onAction={onAddNew}
    />
  );
};

export default LeadManagementLayout;
