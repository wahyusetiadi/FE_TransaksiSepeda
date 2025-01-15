import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import React from "react";

export const Card = ({ title, number, info, percentInfo, icon, colorPercent }) => {
  return (
    <button className=" w-[255px] flex flex-col gap-2 justify-center h-[121px] px-6 py-6 bg-slate-100 text-left rounded-2xl focus:bg-[#222222] focus:text-white text-nowrap">
      <div className="w-full flex text-nowrap">
        <p className="text-sm">{title}</p>
        <div className="w-full flex justify-end pr-2">
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white">
            <ArrowUpRightIcon className="text-slate-900 size-4" />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">{number}</h1>
      <div className={`w-full flex gap-2 items-center font-semibold`}>
        {icon}
        <p className={`text-sm ${colorPercent}`}>{percentInfo}%</p>
        <p className="text-sm">{info}</p>
      </div>
    </button>
  );
};
