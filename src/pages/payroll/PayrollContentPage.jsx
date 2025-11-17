import React from "react";
import EmployeeContent from './EmployeeContent'
import PayrollContent from './PayrollContent'


const PayrollContentPage = ({ selectedDocument }) => {
  const renderContent = () => {
    if (!selectedDocument) {
      return (
        <div className="text-gray-600 text-center mt-10">
          <EmployeeContent />
        </div>
      );
    }

    switch (selectedDocument.name) {
      case "Employee":
        return <EmployeeContent />;
      case "Payroll":
        return <PayrollContent />;
      default:
        return (
          <div className="text-gray-600 text-center mt-10">
            <EmployeeContent />
          </div>
        );
    }
  };

  return <div className="p-6 bg-dashboard-bgc min-h-screen">{renderContent()}</div>;
};

export default PayrollContentPage;
