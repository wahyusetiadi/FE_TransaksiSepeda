import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const SeacrhField = ({ serachQuery, onSearchChange}) => {
  return (
    <div className="w-auto flex flex-col justify-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Cari..."
          value={serachQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full p-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
};
