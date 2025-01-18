import React, { useEffect, useState } from "react";
import { SearchSet } from "../SearchSet"; 
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ModalEdit } from "../ModalEdit";
import { PhotoIcon } from "@heroicons/react/24/solid";

function toTitleCaseWithSpace(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const TableData = ({
  itemsPerPage = 10,
  data,
  showId = false,
  showDateTime = false,
  showAksi = false,
  showDeskripsi = false,
  showEditBtn = false,
  showDeleteBtn = false,
  showDetailBtn = false,
  showRecoveryBtn = false,
  showAddBtn = false,
  onEdit = () => {},
  onDelete = () => {},
  onDetail = () => {},
  onAdd = () => {},
  onRecovery = () => {},
  onSubmitEdit,
  showSearchSet = false,
  showPagination = true,
  onUpdate,
}) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    name: "",
    price: "",
    stock: "",
    type: "",
    status: "",
  });

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = (item) => {
    setIsDeleteOpen(false);
    setSelectedItem(null);
  };

  const openRecoveryModal = (item) => {
    setSelectedItem(item);
    setIsRecoveryOpen(true);
  };

  const closeRecoveryModal = () => {
    setIsRecoveryOpen(false);
    setSelectedItem(null);
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const columns = Object.keys(data[0] || {}).filter((key) => {
    if (key === "id" && !showId) return false;
    if ((key === "tanggal" || key === "waktu") && !showDateTime) return false;
    if (key === "createdAt" || key === "updatedAt") return false;
    if (key === "deskripsi" && !showDeskripsi) return false;
    return key !== "id";
  });

  if (showAksi) {
    columns.push("aksi");
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    const updateData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(updateData);
  }, [filteredData, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    // Set the selected item data when the edit button is clicked
    setSelectedItem({
      id: item.id,
      name: item.name,
      price: item.price,
      stock: item.stock,
      type: item.type,
      status: item.status,
    });
    openEditModal();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = data.filter(
      (item) => item.name.toLowerCase().includes(lowercasedQuery)
      // item.deskripsi.toLowerCase().includes(lowercasedQuery) ||
      // item.kategori.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
  };

  const deleteItem = () => {
    if (selectedItem) {
      onDelete(selectedItem.id);
      closeDeleteModal();
    }
  };

  const recoveryItem = () => {
    if (selectedItem) {
      onRecovery(selectedItem.id);
      closeRecoveryModal();
    }
  };

  return (
    <div className="text-nowrap">
      {showSearchSet && (
        <div className="flex flex-col w-full">
          <SearchSet onSearchChange={handleSearchChange} />
        </div>
      )}
      <div className="mt-4 rounded-lg overflow-x-auto">
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <thead className="bg-orange-50 text-black text-sm font-bold rounded">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 text-left">
                  {toTitleCase(toTitleCaseWithSpace(col)) === "Namabarang"
                    ? "Nama Barang"
                    : toTitleCase(toTitleCaseWithSpace(col))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black text-xs">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.id} className="border-b">
                  {showId && (
                    <td className="py-2 px-6 text-left">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                  )}
                  {columns.map((col) => {
                    if (col === "tanggal") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {col === "tanggal"
                            ? formatTanggal(item[col])
                            : item[col]}
                        </td>
                      );
                    }
                    if (col === "bukti") {
                      return (
                        <td className="py-2 px-6 text-left">
                          {item.bukti ? (
                            <div className="w-full flex gap-2 text-orange-600 items-center justify-center">
                              <PhotoIcon className="size-4" />
                              <a
                                href={item.bukti}
                                download={item.bukti.split("/").pop()}
                                className="text-xs font-semibold hover:underline"
                              >
                                Bukti
                              </a>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                      );
                    }
                    if (col === "aksi") {
                      return (
                        <td
                          key={col}
                          className="py-2 px-6 font-semibold flex justify-center items-center"
                        >
                          <div className="flex flex-col justify-center gap-2 items-center">
                            {showEditBtn && item.isDeleted === 0 && (
                              <>
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Edit button clicked for item: ${item.id}`
                                    );
                                    handleEditClick(item);
                                  }}
                                  className="w-full px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-600 rounded flex gap-2 items-center justify-center"
                                >
                                  <PencilSquareIcon className="size-3" />
                                  Edit
                                </button>

                                {isEditOpen && (
                                  <div className="w-full fixed inset-0 flex items-center justify-center">
                                    <div className="w-full h-dvh bg-black absolute opacity-10"></div>
                                    <ModalEdit
                                      onClick={closeEditModal}
                                      idBarang={selectedItem.id}
                                      namaBarang={selectedItem.name}
                                      hargaBarang={selectedItem.price}
                                      stcokBarang={selectedItem.stock}
                                      statusBarang={selectedItem.status}
                                      typeBarang={selectedItem.type}
                                      handleSubmit={onSubmitEdit}
                                      onUpdate={onUpdate}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                            {showDeleteBtn && item.isDeleted === 0 && (
                              <button
                                onClick={() => {
                                  console.log(
                                    `Delete button clicked for item: ${item.id}`
                                  );
                                  openDeleteModal(item);
                                }}
                                className="w-full px-2 py-1 font-semibold text-xs bg-red-100 text-red-600 rounded flex gap-2 items-center justify-center"
                              >
                                <TrashIcon className="size-3" />
                                Hapus
                              </button>
                            )}
                            {showRecoveryBtn && item.isDeleted === 1 && (
                              <button
                                onClick={() => {
                                  console.log(
                                    `Recovery button clicked for item: ${item.id}`
                                  );
                                  openRecoveryModal(item);
                                }}
                                className="w-full px-2 py-1 font-semibold text-xs bg-green-100 text-green-600 rounded flex gap-2 items-center justify-center"
                              >
                                <ArrowPathIcon className="size-3" />
                                Recovery
                              </button>
                            )}
                            {showDetailBtn && (
                              <button
                                onClick={() => {
                                  console.log(
                                    `Detail button clicked for item: ${item.id}`
                                  );
                                  onDetail(item.id);
                                }}
                                className="w-full px-2 py-1 font-semibold text-xs bg-blue-100 text-blue-600 rounded flex gap-2 items-center justify-center"
                              >
                                <EyeIcon className="size-3" />
                                Detail
                              </button>
                            )}
                            {showAddBtn && (
                              <>
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Add button clicked for item: ${item.id}`
                                    );
                                    onAdd(item.id); // Ketika tombol "Tambah" diklik, toggle tombol +/-
                                  }}
                                  className={`w-fit px-5 py-2 font-semibold  text-white text-xs rounded-full flex gap-2 items-center justify-center ${
                                    item.isDeleted === 1
                                      ? "bg-slate-400  cursor-not-allowed"
                                      : "bg-orange-600"
                                  }`}
                                  disabled={item.isDeleted === 1}
                                >
                                  <PlusIcon className="size-3" />
                                  Tambah
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      );
                    }
                    if (col === "price") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {item[col].toLocaleString("id-ID")}
                        </td>
                      );
                    }
                    if (col === "gambar") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          <img
                            src={item[col]}
                            alt={item.namaBarang}
                            className="rounded-lg"
                            width="40"
                          />
                        </td>
                      );
                    }
                    if (col === "status") {
                      return (
                        <td
                          key={col}
                          className="text-center text-white font-semibold rounded-full"
                        >
                          <span
                            className={`${
                              item.stock === 0
                                ? "bg-red-600"
                                : item[col] === "Selesai" ||
                                  item[col] === "Sukses" ||
                                  item[col] === "Tersedia" ||
                                  item[col] === "Available"
                                ? "bg-green-600"
                                : item[col] === "Non-Active" ||
                                  item[col] === "Tidak Tersedia"
                                ? "bg-orange-500"
                                : item[col] === "Gagal"
                                ? "bg-red-600"
                                : ""
                            } py-1 px-2 rounded-full`}
                          >
                            {item.stock === 0 ? "Stock Habis" : item[col]}
                          </span>
                        </td>
                      );
                    }
                    return (
                      <td key={col} className="py-2 px-6 text-left">
                        {col === "Harga"
                          ? item[col].toLocaleString()
                          : item[col]}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  Tidak ada Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isDeleteOpen && (
        <div className="w-full fixed inset-0 flex items-center justify-center">
          <div className="w-full h-screen bg-black absolute opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-[480px] flex items-center justify-center flex-col gap-8">
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="text-red-600 size-7" />
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold">Apakah kamu yakin?</h3>
                <p className="text-base text-[#64748B]">
                  Anda tidak dapat mengembalikan penghapusan ini?
                </p>
              </div>
            </div>
            <div className="w-full flex gap-4 items-center justify-between">
              <button
                onClick={closeDeleteModal}
                className="w-full px-10 py-3 border text-slate-600 text-base font-semibold border-slate-600 rounded-full"
              >
                Batal
              </button>
              <button
                onClick={deleteItem}
                className="w-full px-10 py-3 text-white text-base font-semibold bg-red-600 rounded-full"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {isRecoveryOpen && (
        <div className="w-full fixed inset-0 flex items-center justify-center">
          <div className="w-full h-screen bg-black absolute opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-[480px] flex items-center justify-center flex-col gap-8">
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="text-yellow-600 size-7" />
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold">Recovery Data?</h3>
                <p className="text-base text-[#64748B]">
                  Apakah Anda ingin mengembalikan data ini?
                </p>
              </div>
            </div>
            <div className="w-full flex gap-4 items-center justify-between">
              <button
                onClick={closeRecoveryModal}
                className="w-full px-10 py-3 border text-slate-600 text-base font-semibold border-slate-600 rounded-full"
              >
                Batal
              </button>
              <button
                onClick={recoveryItem}
                className="w-full px-10 py-3 text-white text-base font-semibold bg-green-600 rounded-full"
              >
                Recovery
              </button>
            </div>
          </div>
        </div>
      )}

      {showPagination && (
        <div className="flex justify-center mt-4 px-4 py-2">
        </div>
      )}
    </div>
  );
};
