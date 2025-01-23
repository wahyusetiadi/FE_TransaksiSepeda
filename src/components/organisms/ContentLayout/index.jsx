import React from "react";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";
import { useLocation } from "react-router-dom"; // Untuk mengambil rute saat ini

export const ContentLayout = ({ children }) => {
  const location = useLocation(); // Mengambil lokasi atau rute saat ini

  return (
    <div className="w-full flex h-screen">
      <div className="w-auto">
        <SideBar />
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        {/* <div className="w-full">
          <TopBar />
        </div> */}
        <div className="h-full overflow-y-auto p-8 xl:p-6">
          <div className="w-full h-auto rounded-lg bg-white">
            {/* Menambahkan key berdasarkan path rute saat ini */}
            <div key={location.pathname}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
