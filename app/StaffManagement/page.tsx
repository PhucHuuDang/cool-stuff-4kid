import React from 'react';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import Footer from '@/components/Footer';

const StaffManagement: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Side Bar */}
      <SideBar />
      {/* Header */}
      <div className="flex flex-col flex-grow">
        <Header title="Staff Management" />
        {/* Main Content */}
        <main className="flex-grow p-6 bg-gray-100">
          <h2>This is the StaffManagement Page</h2>
          {/* Your main content goes here */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default StaffManagement;
