import React, { useState } from "react";
import { ButtonIcon } from "../../molecules/ButtonIcon";
import { SeacrhField } from "../../molecules/SearchField";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export const SearchSet = ({
  onSearchChange,
  filterStatus,
  filterKategori,
}) => {
  const [serachQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(false);
  const [kategori, setKategori] = useState(false);

  const handleChangeStatus = () => {
    setStatus(!status);
    setKategori(false);
  };

  const handleChangeKategori = () => {
    setKategori(!kategori);
    setStatus(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  return (
    <div className="w-full flex items-center mt-4">
      <div className="w-full flex justify-start">
        <SeacrhField
          serachQuery={serachQuery}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="w-full flex justify-end gap-2">
        {filterStatus && (
          <div className="w-fit flex flex-col">
            <ButtonIcon
              title="Status"
              classNameBtn="border rounded px-2 py-1"
              onClick={handleChangeStatus}
            />
            {status && (
              <div className="absolute mt-8 bg-orange-50 px-2 shadow text-sm">
                <ul>
                  <li>
                    <button className="px-2 py-1">Tersedia</button>
                  </li>
                  <li>
                    <button className="px-2 py-1">Tidak Tersedia</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {filterKategori && (
          <div className="w-fit flex flex-col">
            <ButtonIcon
              title="Kategori"
              classNameBtn="border rounded px-2 py-1"
              onClick={handleChangeKategori}
            />
            {kategori && (
              <div className="absolute mt-8 bg-orange-50 px-2 shadow text-sm">
                <ul>
                  <li>
                    <button className="px-2 py-1">Sepeda</button>
                  </li>
                  <li>
                    <button className="px-2 py-1">Sparepart</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

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
