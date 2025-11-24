import Header from '@/features/Dashboard/dashboard_feature/Header';
import SideBar from '@/features/Dashboard/dashboard_feature/SideBar';
import React from 'react';
import { useLocation } from 'react-router-dom';

type DashboardProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardProps) => {
  const location = useLocation();
  const active = location.pathname.includes('dashboard') ? 'Dashboard' : 'My Properties';
  return (
    <div className="flex  ">
      <SideBar />
      <div className="flex flex-col w-full bg-[#ECF1F4]">
        <Header />
        <main
          className="flex-1   
          px-6
            py-2.5
            flex
          flex-col
            items-start
            w-full
            h-full
            custom-scrollbar
            overflow-y-scroll
        "
        >
          <h4 className="text-[#151B38] text-[24px] font-bold">{active}</h4>
          <p className="text-[#404059] text-left">
            Easily manage and track all your properties in one place.
          </p>
          <div
            h-full
            className="w-full flex-1
                overflow-y-auto overflow-x-auto
               custom-scrollbar
           "
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
