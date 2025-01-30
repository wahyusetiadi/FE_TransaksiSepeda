import React, { useState, useEffect, useRef } from "react";
import { ButtonIcon } from "../../molecules/ButtonIcon";
import { SeacrhField } from "../../molecules/SearchField";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export const SearchSet = ({
  onSearchChange,
  filterStatus,
  filterKategori,
  sortedData,
  onFilterChange,
  onSortChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [serachQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState(false); // Default: status dropdown tertutup
  const [kategori, setKategori] = useState(false); // Default: kategori dropdown tertutup
  const [isAscending, setIsAscending] = useState(true); // Default urutan ascending

  const statusRef = useRef(null);
  const kategoriRef = useRef(null);

  const handleChangeStatus = (status) => {
    setStatus(!status);
    onFilterChange("status", status);
  };

  const handleChangeKategori = (kategori) => {
    setKategori(!kategori);
    onFilterChange("kategori", kategori);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  // Handle sort change
  const handleSortChange = () => {
    setIsAscending(!isAscending);
    onSortChange(isAscending ? "asc" : "desc");
  };

  // Handle close dropdown when clicked outside
  const handleClose = (e) => {
    if (
      statusRef.current &&
      !statusRef.current.contains(e.target) &&
      kategoriRef.current &&
      !kategoriRef.current.contains(e.target)
    ) {
      setStatus(false); // Menutup dropdown status jika klik di luar
      setKategori(false); // Menutup dropdown kategori jika klik di luar
    }
  };

  const toggleStatus = () => {
    setStatus(!status);
    if (kategori) setKategori(false); // Close kategori dropdown if it's open
  };

  const toggleKategori = () => {
    setKategori(!kategori);
    if (status) setStatus(false); // Close status dropdown if it's open
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle antara true dan false
  };

  // Reset dropdowns to initial state when component mounts
  useEffect(() => {
    setStatus(false); // Set status dropdown ke false (tertutup) saat pertama kali render
    setKategori(false); // Set kategori dropdown ke false (tertutup) saat pertama kali render

    // Menambahkan event listener untuk klik di luar
    document.addEventListener("click", handleClose);

    // Cleanup event listener saat komponen unmount
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);

  return (
    <div className="w-full flex max-md:flex-col max-md:gap-2 items-center mt-4">
      <div className="w-full flex justify-start">
        <SeacrhField
          serachQuery={serachQuery}
          onSearchChange={handleSearchChange}
        />
      </div>
      <div className="w-full flex max-md:flex-col max-md:w-fit justify-end gap-2">
        {/* Button for burger menu */}
        <div className="md:hidden">
          <ButtonIcon
            title="Menu"
            classNameBtn="border rounded px-2 py-1"
            onClick={toggleMenu} // Function to toggle burger menu
          />
        </div>

        {/* Menu Items - Only visible on md and larger */}
        <div className="hidden md:flex gap-2">
          {filterStatus && (
            <div className="w-fit flex flex-col" ref={statusRef}>
              <ButtonIcon
                title="Status"
                classNameBtn="border rounded px-2 py-1"
                onClick={toggleStatus}
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
            <div className="w-fit flex flex-col" ref={kategoriRef}>
              <ButtonIcon
                title="Kategori"
                classNameBtn="border rounded px-2 py-1"
                onClick={toggleKategori} // Toggle kategori dropdown
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
            <div>
              <ButtonIcon
                title="Urutkan"
                classNameBtn="border rounded px-2 py-1"
                icon={<AdjustmentsHorizontalIcon className="size-5" />}
                showArrow={false}
                onClick={handleSortChange} // Toggle urutan
              />
            </div>
          )}
        </div>

        {/* Dropdown for burger menu - Show on md and smaller screens */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col gap-2">
            {filterStatus && (
              <div className="w-fit flex flex-col" ref={statusRef}>
                <ButtonIcon
                  title="Status"
                  classNameBtn="border rounded px-2 py-1"
                  onClick={toggleStatus}
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
              <div className="w-fit flex flex-col" ref={kategoriRef}>
                <ButtonIcon
                  title="Kategori"
                  classNameBtn="border rounded px-2 py-1"
                  onClick={toggleKategori} // Toggle kategori dropdown
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
              <div>
                <ButtonIcon
                  title="Urutkan"
                  classNameBtn="border rounded px-2 py-1"
                  icon={<AdjustmentsHorizontalIcon className="size-5" />}
                  showArrow={false}
                  onClick={handleSortChange} // Toggle urutan
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
