import React, { useState } from "react";
import { ButtonIcon } from "../../molecules/ButtonIcon";
import { SeacrhField } from "../../molecules/SearchField";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export const SearchSet = ({ onSearchChange, statusFilter, kategoriFilter }) => {
  const [serachQuery, setSearchQuery] = useState('');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className="w-full flex items-center mt-4">
      <div className="w-full flex justify-start">
        <SeacrhField serachQuery={serachQuery} onSearchChange={handleSearchChange}/>
      </div>
      <div className="w-full flex justify-end gap-2">
        <ButtonIcon title="Status" classNameBtn="border rounded px-2 py-1" onClick={statusFilter} />
        <ButtonIcon title="Kategori" classNameBtn="border rounded px-2 py-1" onClick={kategoriFilter} />
        <ButtonIcon
          title="Urutkan"
          classNameBtn="border rounded px-2 py-1"
          icon={<AdjustmentsHorizontalIcon className="size-5" />}
          showArrow={false}
        />
      </div>
    </div>
  );
};
