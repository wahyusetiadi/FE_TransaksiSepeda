import React, { useState } from "react";
import { ButtonIcon } from "../../molecules/ButtonIcon";
import { SeacrhField } from "../../molecules/SearchField";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export const SearchSet = ({
  onSearchChange,
  filterStatus,
  filterKategori,
  sortedData,
  onFilterChange,
  onSortChange, // Tambahkan callback untuk menangani perubahan urutan
}) => {
  const [serachQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(false);
  const [kategori, setKategori] = useState(false);
  const [isAscending, setIsAscending] = useState(true); // State untuk menyimpan urutan A-Z atau Z-A

  const handleChangeStatus = (status) => {
    setStatus(!status);
    setKategori(false);
    onFilterChange("status", status);
  };

  const handleChangeKategori = (kategori) => {
    setKategori(!kategori);
    setStatus(false);
    onFilterChange("kategori", kategori);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleSortChange = () => {
    setIsAscending(!isAscending); // Toggle urutan setiap kali tombol diklik
    onSortChange(isAscending ? "asc" : "desc"); // Panggil callback untuk mengubah urutan di luar komponen
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
                    <button
                      className="px-2 py-1"
                      onClick={() => handleChangeStatus("Tersedia")}
                    >
                      Tersedia
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-2 py-1"
                      onClick={() => handleChangeStatus("Tidak Tersedia")}
                    >
                      Tidak Tersedia
                    </button>
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
                    <button
                      className="px-2 py-1"
                      onClick={() => handleChangeKategori("SEPEDA")}
                    >
                      Sepeda
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-2 py-1"
                      onClick={() => handleChangeKategori("SPAREPART")}
                    >
                      Sparepart
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        {sortedData && (
          <div className="">
            <ButtonIcon
              title="Urutkan"
              classNameBtn="border rounded px-2 py-1"
              icon={<AdjustmentsHorizontalIcon className="size-5" />}
              showArrow={false}
              onClick={handleSortChange} // Menangani klik untuk toggle urutan
            />
          </div>
        )}
      </div>
    </div>
  );
};
