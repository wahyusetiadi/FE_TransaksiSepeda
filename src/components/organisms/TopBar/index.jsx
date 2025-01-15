import React from "react";
import { SeacrhField } from "../../molecules/SearchField";
import { BellIcon } from "@heroicons/react/24/outline";

export const TopBar = () => {
  return (
    <div className="max-h-[80px] w-auto flex bg-white px-4 py-2">
      <div className="flex justify-start">
        <SeacrhField />
      </div>
      <div className="w-full flex justify-end items-center">
        <div className="px-6">
          <BellIcon className="size-6 text-slate-400" />
        </div>
        <div className="border-l-2 border-slate-400 flex gap-2 px-2 items-center">
          <div className="w-[40px] h-[40px] bg-slate-400 rounded-full"></div>
          <div className="flex flex-col items-start justify-end gap-0">
            <h1 className="font-bold">Front Office</h1>
            <p className="text-slate-400">frontoffice@bicyle.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
