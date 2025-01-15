import React from "react";
import { SideBar } from "../SideBar";
import { TopBar } from "../TopBar";

export const ContentLayout = ({ children }) => {
  return (
    <div className="w-full flex h-screen">
      {/* Sidebar yang bisa di-scroll jika konten lebih besar dari layar */}
      <SideBar className="fixed top-0 left-0 h-full overflow-y-auto" />

      <div className="flex flex-col w-full">
        {/* TopBar yang tidak bisa di-scroll */}
        <TopBar className="fixed top-0 left-0 w-full z-10 bg-white" />

        {/* Area konten yang bisa digulirkan */}
        <div className="xl:w-[1080px] 2xl:w-[1116px] h-full overflow-y-auto p-8">
          <div className="w-full h-auto rounded-lg bg-white">{children}</div>
          {/* <div className="w-full h-[150px] bg-red-500 sticky z-50 bottom-0 right-0 -pb-10"></div> */}
        </div>
      </div>
    </div>
  );
};
