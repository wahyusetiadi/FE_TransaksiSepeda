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
} from "@heroicons/react/24/outline";
import { ModalEdit } from "../ModalEdit";
import { getUser } from "../../../api/api";
import { ModalStockEdit } from "../../molecules/ModalStockEdit";
import { Modal } from "../../molecules/Modal";
import Pagination from "../../molecules/Pagination";
import {
  formatCurrency,
  formatTanggal,
  toTitleCase,
  toTitleCaseWithSpace,
} from "../../../utils";
import { ModalCustomerEdit } from "../ModalCustomerEdit";

export const TableData = ({
  data,
  itemsPerPage = 10,
  showPagination = true,
  showId = false,
  showDateTime = false,
  showAksi = false,
  showDeskripsi = false,
  showEditBtn = false,
  showEditCustomerBtn = false,
  showDeleteCustomerBtn = false,
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
  const [isEditCustomerOpen, setIsEditCustomerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleteCustomerOpen, setIsDeleteCustomerOpen] = useState(false);
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
  const [selcetedCustomer, setSelectedCustomer] = useState({
    id: "",
    name: "",
    telp: "",
    type: "",
  });

  // const handleAddClick = (item) => {
  //   if (!itemQuantities[item.id]) {
  //     setItemQuantities((prev) => ({
  //       ...prev,
  //       [item.id]: 1,
  //     }));
  //     onAdd({ ...item, quantity: 1 });
  //   }
  // };

  const handleAddClick = (item) => {
    setItemQuantities((prev) => {
      const newQuantity = prev[item.id] ? prev[item.id] + 1 : 0; // Jika item sudah ada, tambahkan 1, jika belum, mulai dari 1
      return {
        ...prev,
        [item.id]: newQuantity,
      };
    });
    onAdd({
      ...item,
      quantity: itemQuantities[item.id] ? itemQuantities[item.id] + 1 : 1,
    });
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

  const openDeleteCustomerModal = (item) => {
    setSelectedCustomer(item);
    setIsDeleteCustomerOpen(true);
  };

  const closeDeleteCustomerModal = () => {
    setIsDeleteCustomerOpen(false);
    setSelectedCustomer(null);
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

  const handleFilterChange = (filterType, value) => {
    if (filterType === "status") {
      setSelectedStatus(value);
    } else if (filterType === "kategori") {
      setSelectedKategori(value);
    }
  };

  const handleSortChange = (order) => {
    const sorted = [...filteredData].sort((a, b) => {
      const keyA = a.name || a.date;
      const keyB = b.name || b.date;
      if (keyA instanceof Date && keyB instanceof Date) {
        const comparison = keyA - keyB;
        return order === "asc" ? comparison : -comparison;
      }
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
    let filtered = Array.isArray(data) ? [...data] : [];
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
    setFilteredData(filtered);
  }, [selectedStatus, selectedKategori, searchQuery, data]);

  const isAdminBesar = user?.role === "owner";
  const isAdminCabang = user?.role === "admin";

  const columns =
    Array.isArray(data) && data.length > 0
      ? Object.keys(data[0] || {}).filter((key) => {
          if (key === "id" && !showId) return false;
          if ((key === "tanggal" || key === "waktu") && !showDateTime)
            return false;
          if (key === "address") return false;
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

  const handleEditCustomerClick = (item) => {
    setSelectedCustomer({
      id: item.id,
      name: item.name,
      telp: item.telp,
      type: item.type,
    });
    openEditCustomerModal();
  };

  const openEditCustomerModal = () => {
    setIsEditCustomerOpen(true);
  };

  const closeEditCustomerModal = () => {
    setIsEditCustomerOpen(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();

    const filtered = data.filter((item) => {
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

  const deleteCustomer = () => {
    if (selcetedCustomer) {
      onDelete(selcetedCustomer.id);
      closeDeleteCustomerModal();
    }
  };

  const recoveryItem = () => {
    if (selectedItem) {
      onRecovery(selectedItem.id);
      closeRecoveryModal();
    }
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
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Address"
                    ? "Alamat"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Type"
                    ? "Tipe"
                    : toTitleCase(toTitleCaseWithSpace(col)) === "Created At"
                    ? "Dibuat"
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
                    if (col === "lunas") {
                      return (
                        <td key={col} className="">
                          <div className="font-semibold">
                            {item.lunas === 1 ? (
                              <span className="text-white px-2 py-1 bg-green-600 rounded-full">
                                Lunas
                              </span>
                            ) : (
                              <span className="text-white px-2 py-1 bg-red-600 rounded-full">
                                Belum
                              </span>
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
                                  <span className="hidden md:block">Edit</span>{" "}
                                  <PencilSquareIcon className="size-3 md:hidden" />{" "}
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

                            {showEditCustomerBtn && (
                              <>
                                <button
                                  onClick={() => {
                                    console.log(
                                      `Edit button Clicked for Customer: ${item.id}`
                                    );
                                    handleEditCustomerClick(item);
                                  }}
                                  className="w-full max-md:w-fit px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-600 rounded flex gap-2 items-center justify-center"
                                >
                                  <PencilSquareIcon className="size-3 hidden md:block" />{" "}
                                  <span className="hidden md:block">Edit</span>{" "}
                                  <PencilSquareIcon className="size-3 md:hidden" />{" "}
                                </button>
                                {isEditCustomerOpen && isAdminBesar && (
                                  <div className="w-full fixed inset-0 flex items-center justify-center">
                                    <div className="w-full h-dvh bg-black absolute opacity-10"></div>
                                    <ModalCustomerEdit
                                      id={selcetedCustomer.id}
                                      name={selcetedCustomer.name}
                                      telp={selcetedCustomer.telp}
                                      type={selcetedCustomer.type}
                                      onClick={closeEditCustomerModal}
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
                            {showDeleteCustomerBtn && (
                              <button
                                onClick={() => {
                                  console.log(
                                    `Deleted for Customer: ${item.id}`
                                  );
                                  openDeleteCustomerModal(item);
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
                                  );
                                  onDetail(item.id);
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
                                {/* {!itemQuantities[item.id] ? (
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
                                )} */}
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
                        {col === "price"
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

      {isDeleteCustomerOpen && (
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
            onClickCancel={closeEditCustomerModal}
            onClickTrue={deleteCustomer}
          />
        </div>
      )}

      {isRecoveryOpen && (
        <div className="w-full fixed inset-0 flex items-center justify-center">
          <div className="w-full h-screen bg-black absolute opacity-50"></div>
          <Modal
            titleModal="Recovery Data?"
            subtitleModal="Apakah Anda ingin mengembalikan data ini?"
            IconModal={
              <ArrowPathIcon className="text-green-600 size-7 max-md:size-5" />
            }
            iconModalBg1="bg-green-50"
            iconModalBg2="bg-green-100"
            bgBtnTrue="bg-green-600"
            titleOnClickTrueBtn="Recovery"
            onClickCancel={closeRecoveryModal}
            onClickTrue={recoveryItem}
          />
        </div>
      )}

      {showPagination && (
        <>
          <Pagination
            currentPage={currentPage}
            paginate={paginate}
            totalPage={totalPage}
          />
        </>
      )}
    </div>
  );
};
