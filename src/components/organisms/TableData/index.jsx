import React, { useEffect, useState } from "react";
import { SearchSet } from "../SearchSet";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  MinusIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ModalEdit } from "../ModalEdit";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { getUser } from "../../../api/api";
import { ModalStockEdit } from "../../molecules/ModalStockEdit";
import { Modal } from "../../molecules/Modal";

function toTitleCaseWithSpace(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const TableData = ({
  data,
  itemsPerPage = 10,
  showPagination = true,
  showId = false,
  showDateTime = false,
  showAksi = false,
  showDeskripsi = false,
  showEditBtn = false,
  showDeleteBtn = false,
  showDetailBtn = false,
  showRecoveryBtn = false,
  showDeleteBtnPerm = false,
  showAddBtn = false,
  onEdit = () => {},
  onDelete = () => {},
  onDetail = () => {},
  onAdd = () => {},
  onRecovery = () => {},
  onSubmitEdit,
  onUpdate,
  showSearchSet = false,
  kategoriFilter = false,
  statusFilter = false,
  sortedData = false,
}) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(
    Array.isArray(data) ? data : []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [itemQuantities, setItemQuantities] = useState({});
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    name: "",
    price_ecer: "",
    price_grosir: "",
    stock: "",
    type: "",
    status: "",
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleAddClick = (item) => {
    if (!itemQuantities[item.id]) {
      setItemQuantities((prev) => ({
        ...prev,
        [item.id]: 1,
      }));
      onAdd({ ...item, quantity: 1 });
    }
  };

  const handleQuantityChange = (item, change) => {
    const currentQty = itemQuantities[item.id] || 0;
    const newQty = Math.max(0, currentQty + change);

    setItemQuantities((prev) => ({
      ...prev,
      [item.id]: newQty,
    }));

    if (newQty === 0) {
      setItemQuantities((prev) => {
        const newState = { ...prev };
        delete newState[item.id];
        return newState;
      });
    }
    onAdd({ ...item, quantity: newQty });
  };

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

  // useEffect(() => {
  //   if (Array.isArray(data)) {
  //     setFilteredData(data);
  //   } else {
  //     setFilteredData([]);
  //   }
  // }, [data]);
  const handleFilterChange = (filterType, value) => {
    if (filterType === "status") {
      setSelectedStatus(value);
    } else if (filterType === "kategori") {
      setSelectedKategori(value);
    }
  };

  const handleSortChange = (order) => {
    const sorted = [...filteredData].sort((a, b) => {
      // Pertama, cek apakah `name` ada, jika tidak, pakai `tanggal`
      const keyA = a.name || a.date; // jika `name` tidak ada, gunakan `tanggal`
      const keyB = b.name || b.date; // jika `name` tidak ada, gunakan `tanggal`

      // Cek jika `keyA` dan `keyB` adalah tanggal, maka sort berdasarkan tanggal
      if (keyA instanceof Date && keyB instanceof Date) {
        const comparison = keyA - keyB;
        return order === "asc" ? comparison : -comparison;
      }

      // Jika bukan tanggal, lakukan pengurutan berdasarkan string (localeCompare)
      const comparison = String(keyA).localeCompare(String(keyB));
      return order === "asc" ? comparison : -comparison;
    });
    setFilteredData(sorted);
  };

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error("Error GET USER DATA:", error);
      throw error;
    }
  };

  useEffect(() => {
    let filtered = Array.isArray(data) ? [...data] : []; // Ensure data is an array

    // Apply filters and search logic
    if (selectedStatus) {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    if (selectedKategori) {
      filtered = filtered.filter((item) => item.type === selectedKategori);
    }

    if (searchQuery) {
      filtered = filtered.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : "";
        const type = item.type ? item.type.toLowerCase() : "";
        const customer = item.customer ? item.customer.toLowerCase() : "";

        return (
          name.includes(searchQuery.toLowerCase()) ||
          type.includes(searchQuery.toLowerCase()) ||
          customer.includes(searchQuery.toLowerCase())
        );
      });
    }

    fetchUser();
    setFilteredData(filtered); // Always set as an array
  }, [selectedStatus, selectedKategori, searchQuery, data]); // Reapply filters when they change

  const isAdminBesar = user?.role === "owner";
  const isAdminCabang = user?.role === "admin";

  const columns =
    Array.isArray(data) && data.length > 0
      ? Object.keys(data[0] || {}).filter((key) => {
          if (key === "id" && !showId) return false;
          if ((key === "tanggal" || key === "waktu") && !showDateTime)
            return false;
          if (key === "isDeleted" || key === "updatedAt") return false;
          if (key === "bukti" || key === "items" || key === "productId")
            return false;
          if (key === "deskripsi" && !showDeskripsi) return false;
          if (key === "aksi") return false;
          return key !== "id";
        })
      : [];

  if (showAksi) {
    columns.push("aksi");
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPage = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    if (Array.isArray(filteredData)) {
      const updateData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(updateData);
    }
  }, [filteredData, currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (item) => {
    setSelectedItem({
      id: item.id,
      name: item.name,
      price_ecer: item.price_ecer,
      price_grosir: item.price_grosir,
      stock: item.stock,
      type: item.type,
      status: item.status,
    });
    openEditModal();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();

    const filtered = data.filter((item) => {
      // Check for undefined or null values before calling .toLowerCase()
      const name = item.name ? item.name.toLowerCase() : "";
      const type = item.type ? item.type.toLowerCase() : "";
      const customer = item.customer ? item.customer.toLowerCase() : "";

      return (
        name.includes(lowercasedQuery) ||
        type.includes(lowercasedQuery) ||
        customer.includes(lowercasedQuery)
      );
    });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the state with the new value
    }));
  };

  return (
    <div className="text-nowrap max-md:text-wrap">
      {showSearchSet && (
        <div className="flex flex-col w-full">
          <SearchSet
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            filterStatus={statusFilter}
            filterKategori={kategoriFilter}
            sortedData={sortedData}
            onSortChange={handleSortChange}
          />
        </div>
      )}
      <div className="mt-4 rounded-lg overflow-x-auto">
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <thead className="bg-orange-50 text-black text-sm max-md:text-xs font-bold rounded">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-6 py-4 text-left">
                  {/* Ganti nama kolom "price" menjadi "Harga" */}
                  {toTitleCase(toTitleCaseWithSpace(col)) === "Price_ecer"
                    ? "Harga Ecer"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Price_grosir"
                    ? "Harga Grosir"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Product_code"
                    ? "Kode Produk"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Name"
                    ? "Nama"
                    : toTitleCase(toTitleCaseWithSpace(col)) ===
                      "Transaction_code"
                    ? "Kode Transaksi"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Customer"
                    ? "Pelanggan"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Description"
                    ? "Pembayaran"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Date"
                    ? "Tanggal"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Price"
                    ? "Harga"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Amount"
                    ? "Jumlah"
                    : toTitleCase(toTitleCaseWithSpace(col))}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-black text-xs max-md:text-[10px]" key={""}>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item.id || index} className="border-b">
                  {showId && (
                    <td className="py-2 px-6 text-left border">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                  )}
                  {columns.map((col) => {
                    if (col === "date") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {col === "date"
                            ? formatTanggal(item[col])
                            : item[col]}
                        </td>
                      );
                    }

                    if (col == "createdAt") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {col === "createdAt"
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

                    if (col === "lunas") {
                      return (
                        <td key={col} className="">
                          <div className="font-semibold">
                            {item.lunas === 1 ? (
                              <span className="text-green-600 px-2 py-1 bg-green-100 rounded-full">
                                Lunas
                              </span> // If lunas is 1, show "Lunas"
                            ) : (
                              <span className="text-red-600 px-2 py-1 bg-red-100 rounded-full">
                                Belum
                              </span> // If lunas is 0, show "Belum"
                            )}
                          </div>
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
                            {showEditBtn && (
                              <>
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Edit button clicked for item: ${item.id}`
                                    );
                                    handleEditClick(item);
                                  }}
                                  className="w-full max-md:w-fit px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-600 rounded flex gap-2 items-center justify-center"
                                >
                                  <PencilSquareIcon className="size-3 hidden md:block" />{" "}
                                  {/* Ini akan sembunyi pada layar kecil */}
                                  <span className="hidden md:block">
                                    Edit
                                  </span>{" "}
                                  {/* Ini akan sembunyi pada layar kecil */}
                                  <PencilSquareIcon className="size-3 md:hidden" />{" "}
                                  {/* Ini akan tampil pada layar kecil */}
                                </button>

                                {isEditOpen && isAdminBesar && (
                                  <div className="w-full fixed inset-0 flex items-center justify-center">
                                    <div className="w-full h-dvh bg-black absolute opacity-10"></div>
                                    <ModalEdit
                                      onClick={closeEditModal}
                                      idBarang={selectedItem.id}
                                      namaBarang={selectedItem.name}
                                      hargaBarangEcer={selectedItem.price_ecer}
                                      hargaBarangGrosir={
                                        selectedItem.price_grosir
                                      }
                                      stcokBarang={selectedItem.stock}
                                      statusBarang={selectedItem.status}
                                      typeBarang={selectedItem.type}
                                      handleSubmit={onSubmitEdit}
                                      onUpdate={onUpdate}
                                    />
                                  </div>
                                )}

                                {isEditOpen && isAdminCabang && (
                                  <div className="w-full fixed inset-0 flex items-center justify-center">
                                    <div className="w-full h-dvh bg-black absolute opacity-10"></div>
                                    <ModalStockEdit
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
                            {showDeleteBtn &&
                              item.isDeleted === 0 &&
                              isAdminBesar && (
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Delete button clicked for item: ${item.id}`
                                    );
                                    openDeleteModal(item);
                                  }}
                                  className="w-full max-md:w-fit px-2 py-1 font-semibold text-xs bg-red-100 text-red-600 rounded flex gap-2 items-center justify-center"
                                >
                                  <TrashIcon className="size-3 hidden md:block" />
                                  <span className="hidden md:block">Hapus</span>{" "}
                                  <TrashIcon className="size-3 md:hidden" />
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
                                className="w-full max-md:w-fit px-2 py-1 font-semibold text-xs bg-green-100 text-green-600 rounded flex gap-2 items-center justify-center"
                              >
                                <ArrowPathIcon className="size-3 hidden md:block" />
                                <span className="hidden md:block">
                                  Recovery
                                </span>{" "}
                                <ArrowPathIcon className="size-3 md:hidden" />
                              </button>
                            )}
                            {showDetailBtn && (
                              <button
                                onClick={() => {
                                  console.log(
                                    `Detail button clicked for item: ${item.id}`
                                  ); // Debug log for the ID
                                  onDetail(item.id); // Pass only the `id` to the onDetail function
                                }}
                                className="w-full px-2 py-1 font-semibold text-xs bg-blue-100 text-blue-600 rounded flex gap-2 items-center justify-center"
                              >
                                <EyeIcon className="size-3 hidden md:block" />
                                <span className="hidden md:block">
                                  Detail
                                </span>{" "}
                                <EyeIcon className="size-3 md:hidden" />
                              </button>
                            )}
                            {showDeleteBtnPerm && isAdminBesar && (
                              <button
                                onClick={() => {
                                  console.log(
                                    `Permanent Delete for item : ${item.id}`
                                  );
                                  openDeleteModal(item);
                                }}
                                className="w-full max-md:w-fit px-2 py-1 font-semibold text-xs bg-red-100 text-red-600 rounded flex gap-2 items-center justify-center"
                              >
                                <TrashIcon className="size-3 hidden md:block" />
                                <span className="hidden md:block">
                                  Hapus
                                </span>{" "}
                                <TrashIcon className="size-3 md:hidden" />
                              </button>
                            )}

                            {showAddBtn && (
                              <>
                                {/* <button
                                  onClick={() => handleAddClick(item)}
                                  className={`w-fit px-5 py-2 font-semibold text-white text-xs rounded-full flex gap-2 items-center justify-center ${
                                    item.isDeleted === 1 ||
                                    item.status === "Tidak Tersedia"
                                      ? "bg-slate-400 cursor-not-allowed"
                                      : "bg-orange-600"
                                  }`}
                                  disabled={
                                    item.isDeleted === 1 ||
                                    item.status === "Tidak Tersedia"
                                  }
                                >
                                  <PlusIcon className="size-3" />
                                  Tambah
                                </button> */}
                                {!itemQuantities[item.id] ? (
                                  <button
                                    onClick={() => handleAddClick(item)}
                                    className={`w-fit px-5 py-2 font-semibold text-white text-xs rounded-full flex gap-2 items-center justify-center ${
                                      item.isDeleted === 1 ||
                                      item.status === "Tidak Tersedia"
                                        ? "bg-slate-400 cursor-not-allowed"
                                        : "bg-orange-600"
                                    }`}
                                    disabled={
                                      item.isDeleted === 1 ||
                                      item.status === "Tidak Tersedia"
                                    }
                                  >
                                    <PlusIcon className="size-3" />
                                    Tambah
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(item, -1)
                                      }
                                      className="w-fit p-2 font-semibold text-white text-xs rounded-full bg-red-600"
                                    >
                                      <MinusIcon className="size-3" />
                                    </button>

                                    <span>{itemQuantities[item.id]}</span>

                                    <button
                                      onClick={() =>
                                        handleQuantityChange(item, 1)
                                      }
                                      className="w-fit p-2 font-semibold text-white text-xs rounded-full bg-orange-600"
                                    >
                                      <PlusIcon className="size-3" />
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      );
                    }

                    if (col === "price_ecer") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {formatCurrency(item[col])}
                        </td>
                      );
                    }
                    if (col === "price_grosir") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {formatCurrency(item[col])}
                        </td>
                      );
                    }
                    if (col === "total") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {formatCurrency(item[col])}
                        </td>
                      );
                    }
                    if (col === "hutang") {
                      return (
                        <td key={col} className="py-2 px-6 text-left">
                          {formatCurrency(item[col])}
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
                          className="text-center text-white font-semibold rounded-full max-sm:text-nowrap"
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
                          ? formatCurrency(item[col])
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
          <Modal
            titleModal={"Apakah kamu yakin?"}
            subtitleModal={"Anda tidak dapat mengembalikan penghapusan ini!"}
            IconModal={
              <ExclamationTriangleIcon className="text-red-600 size-7 max-md:size-5" />
            }
            iconModalBg1={"bg-red-50"}
            iconModalBg2={"bg-red-100"}
            bgBtnTrue={"bg-red-600"}
            titleOnClickTrueBtn={"Hapus"}
            onClickCancel={closeDeleteModal}
            onClickTrue={deleteItem}
          />
        </div>
      )}

      {isRecoveryOpen && (
        <div className="w-full fixed inset-0 flex items-center justify-center">
          <div className="w-full h-screen bg-black absolute opacity-50"></div>
          <Modal
            titleModal="Recovery Data?"
            subtitleModal="Apakah Anda ingin mengembalikan data ini?"
            IconModal={<ExclamationTriangleIcon className="text-yellow-600 size-7 max-md:size-5" />}
            iconModalBg1='bg-'
          />
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-[480px] max-md:w-[300px] flex items-center justify-center flex-col gap-8">
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <div className="w-20 h-20 max-md:w-14 max-md:h-14 bg-red-50 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 max-md:h-11 max-md:w-11 bg-red-100 rounded-full flex items-center justify-center">
                  <ExclamationTriangleIcon className="text-yellow-600 size-7 max-md:size-5" />
                </div>
              </div>
              <div className="w-full flex flex-col text-center items-center justify-center ">
                <h3 className="text-xl max-md:text-base font-semibold">
                  Recovery Data?
                </h3>
                <p className="text-base max-md:text-xs text-[#64748B]">
                  Apakah Anda ingin mengembalikan data ini?
                </p>
              </div>
            </div>
            <div className="w-full flex gap-4 items-center justify-between">
              <button
                onClick={closeRecoveryModal}
                className="w-full px-10 py-3 max-md:text-xs max-md:px-7 border text-slate-600 text-base font-semibold border-slate-600 rounded-full"
              >
                Batal
              </button>
              <button
                onClick={recoveryItem}
                className="w-full px-10 py-3 max-md:text-xs max-md:px-7 text-white text-base font-semibold bg-green-600 rounded-full"
              >
                Recovery
              </button>
            </div>
          </div>
        </div>
      )}

      {showPagination && (
        <div className="flex justify-center mt-4 px-4 py-2 max-md:text-xs max-md:px-0 max-md:py-0">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 max-md:px-1 rounded ${
              currentPage === 1
                ? "bg-orange-100 text-orange-300 cursor-not-allowed"
                : "bg-orange-100 text-orange-700 hover:bg-orange-300"
            }`}
          >
            &lt;&lt;
          </button>

          {/* Tombol Prev */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
              currentPage === 1
                ? "bg-orange-100 text-orange-300 cursor-not-allowed"
                : "bg-orange-100 text-orange-700 hover:bg-orange-300"
            }`}
          >
            &lt;
          </button>

          {/* Tombol halaman */}
          {Array.from({ length: totalPage }, (_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber >= currentPage - 1 &&
              pageNumber <= currentPage + 1
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
                    currentPage === pageNumber
                      ? "bg-orange-600 text-white"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-300"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

          {/* Tombol Next */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPage}
            className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
              currentPage === totalPage
                ? "bg-orange-100 text-orange-300 cursor-not-allowed"
                : "bg-orange-100 text-orange-700 hover:bg-orange-300"
            }`}
          >
            &gt;
          </button>

          {/* Tombol Last */}
          <button
            onClick={() => paginate(totalPage)}
            disabled={currentPage === totalPage}
            className={`px-3 py-1 mx-1 max-md:px-2 rounded ${
              currentPage === totalPage
                ? "bg-orange-100 text-orange-300 cursor-not-allowed"
                : "bg-orange-100 text-orange-700 hover:bg-orange-300"
            }`}
          >
            &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
};
