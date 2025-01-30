import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SeacrhField = ({ serachQuery, onSearchChange }) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex gap-4 items-center border rounded-lg focus-within:ring-2 focus-within:ring-blue-500">
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 ml-3" />
        <input
          type="text"
          placeholder="Cari..."
          value={serachQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 pl-0 pr-4 focus:outline-none text-sm"
        />
      </div>
    </div>
  );
};
