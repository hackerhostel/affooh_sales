import React, { useState } from "react";
import MainPageLayout from "../../layouts/MainPageLayout.jsx";
import PayrollListPage from "./PayrollListPage.jsx";
import PayrollContentPage from "./PayrollContentPage.jsx";

const PayrollLayout = () => {
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
      title="Payroll"
      leftColumn={
        <PayrollListPage
          selectedFolderId={selectedFolderId}
          onSelect={setSelectedFolderId}
          onDocumentSelect={handleDocumentSelect}
        />
      }
      rightColumn={<PayrollContentPage selectedDocument={selectedDocument} />}
      onAction={onAddNew}
    />
  );
};

export default PayrollLayout;
