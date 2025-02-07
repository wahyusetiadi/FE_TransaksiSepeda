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
  const [status, setStatus] = useState(false);
  const [kategori, setKategori] = useState(false);
  const [sortFilter, setSortFilter] = useState(false);
  const [isAscending, setIsAscending] = useState(true);

  const statusRef = useRef(null);
  const kategoriRef = useRef(null);
  const sortRef = useRef(null);

  const handleChangeStatus = (status) => {
    setStatus(!status);
    onFilterChange("status", status);
  };

  const handleChangeKategori = (kategori) => {
    setKategori(!kategori);
    onFilterChange("kategori", kategori);
  };

  const handleChangeSortFilter = (sortFilter) => {
    setSortFilter(!sortFilter);
    onSortChange("urutkan", sortFilter);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleSortChange = () => {
    setIsAscending(!isAscending);
    onSortChange(isAscending ? "asc" : "desc");
  };

  const handleClose = (e) => {
    if (
      statusRef.current &&
      !statusRef.current.contains(e.target) &&
      kategoriRef.current &&
      !kategoriRef.current.contains(e.target) &&
      sortRef.current &&
      !sortRef.current.contains(e.target)
    ) {
      setStatus(false);
      setKategori(false);
      setSortFilter(false);
    }
  };

  const toggleStatus = () => {
    setStatus(!status);
    if (kategori) {
      setKategori(false);
      setSortFilter(false);
    }
  };

  const toggleKategori = () => {
    setKategori(!kategori);
    if (status) {
      setStatus(false);
      setSortFilter(false);
    }
  };

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
    if (sortFilter) {
      setStatus(false);
      setKategori(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setStatus(false);
    setKategori(false);
    setSortFilter(false);

    document.addEventListener("click", handleClose);

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
            classNameBtn="border rounded px-2 py-1 hover:bg-slate-100"
            onClick={toggleMenu} // Function to toggle burger menu
          />
        </div>

        {/* Menu Items - Only visible on md and larger */}
        <div className="hidden md:flex gap-2">
          {filterStatus && (
            <div className="w-fit flex flex-col" ref={statusRef}>
              <ButtonIcon
                title="Status"
                classNameBtn="border rounded px-2 py-1 hover:bg-slate-100"
                onClick={toggleStatus}
              />
              {status && (
                <div className="absolute mt-8 bg-orange-50 shadow text-sm">
                  <ul>
                    <li className="hover:bg-orange-100 w-full text-left">
                      <button
                        className="px-2 py-1"
                        onClick={() => handleChangeStatus("Tersedia")}
                      >
                        Tersedia
                      </button>
                    </li>
                    <li className="hover:bg-orange-100 w-full text-left">
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
                classNameBtn="border rounded px-2 py-1 hover:bg-slate-100"
                onClick={toggleKategori} // Toggle kategori dropdown
              />
              {kategori && (
                <div className="absolute mt-8 bg-orange-50 shadow text-sm">
                  <ul>
                    <li className="hover:bg-orange-100 w-full text-left">
                      <button
                        className="px-2 py-1"
                        onClick={() => handleChangeKategori("SEPEDA")}
                      >
                        Sepeda
                      </button>
                    </li>
                    <li className="hover:bg-orange-100 w-full text-left">
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
            <div className="w-fit flex flex-col" ref={sortRef}>
              <ButtonIcon
                title="Urutkan"
                classNameBtn="border rounded px-2 py-1 hover:bg-slate-100"
                icon={<AdjustmentsHorizontalIcon className="size-5" />}
                showArrow={false}
                onClick={handleSortChange}
                // onClick={toggleSortFilter}
              />
              {sortFilter && (
                <div className="absolute mt-8 bg-orange-50 shadow text-sm">
                  <ul>
                    <li>
                      <button
                        className="px-2 py-1"
                        onClick={() => handleChangeSortFilter("A-Z")}
                      >
                        A-Z
                      </button>
                    </li>
                    <li>
                      <button
                        className="px-2 py-1"
                        onClick={() => handleChangeSortFilter("Z-A")}
                      >
                        Z-A
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
                  // onClick={handleSortChange} // Toggle urutan
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
