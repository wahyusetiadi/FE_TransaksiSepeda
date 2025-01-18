import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { updateProductData } from "../../../api/api";

export const ModalEdit = ({
  onClick,
  idBarang,
  namaBarang,
  statusBarang,
  hargaBarang,
  stcokBarang,
  typeBarang,
  onUpdate,
}) => {
  const [quantity, setQuantity] = useState(0);

  const [formData, setFormData] = useState({
    namaBarang,
    statusBarang,
    hargaBarang,
    stcokBarang,
    typeBarang,
  });

  const productTypes = ["SPAREPART", "SEPEDA"];
  const productStatus = ["Tersedia", "Tidak Tersedia"];

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Format hargaBarang dengan format mata uang Indonesia
  const formatHarga = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Menghilangkan angka di belakang koma
    maximumFractionDigits: 0, // Menghilangkan angka di belakang koma
  }).format(formData.hargaBarang);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      name: formData.namaBarang,
      status: formData.statusBarang,
      price: formData.hargaBarang,
      stock: formData.stcokBarang,
      type: formData.typeBarang,
    };

    try {
      const response = await updateProductData(idBarang, updateData);
      console.log("Produk berhasil di update", response);
      onClick();
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="w-[560px] p-8 h-auto rounded-lg bg-white z-50">
      <div className="w-full flex">
        <div className="w-full flex items-center justify-start">
          <h1 className="text-2xl font-bold">Detail Barang</h1>
        </div>
        <div className="w-full flex items-center justify-end">
          <button onClick={onClick}>
            <XMarkIcon className="text-black size-6" />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="w-full flex gap-4">
        <div className="w-full flex flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <label
                htmlFor="Nama Barang"
                className="text-base font-bold text-slate-700"
              >
                Nama Barang
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="Masukkan Nama Barang"
                value={formData.namaBarang}
                onChange={handleInputChange}
                name="namaBarang"
              />
            </div>

            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="Tipe Barang"
                className="text-base font-bold text-slate-700"
              >
                Tipe Barang
              </label>
              <select
                className="w-full px-4 py-2 border rounded"
                value={formData.typeBarang}
                onChange={handleInputChange}
                name="typeBarang"
              >
                <option value="" disabled>
                  Pilih Tipe
                </option>
                {productTypes
                  .filter((option) => option !== formData.typeBarang) // Menyaring tipe yang sudah dipilih
                  .map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                {formData.typeBarang && (
                  <option value={formData.typeBarang} selected>
                    {formData.typeBarang}
                  </option>
                )}
              </select>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="Status Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Status Barang
                </label>
                <select
                  className="w-full px-4 py-2 border rounded"
                  value={formData.statusBarang}
                  onChange={handleInputChange}
                  name="statusBarang"
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  {productStatus
                    .filter((option) => option !== formData.statusBarang)
                    .map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  {formData.statusBarang && (
                    <option value={formData.statusBarang} selected>
                      {formData.statusBarang}
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="Harga Barang"
                className="text-base font-bold text-slate-700"
              >
                Harga Barang
              </label>
              <div className="flex gap-4">
                <div className="w-14 flex items-center justify-center bg-slate-100 font-bold text-sm rounded">
                  Rp
                </div>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Masukkan Harga Barang"
                  value={formData.hargaBarang}
                  onChange={handleInputChange}
                  name="hargaBarang"
                />
              </div>
            </div>

            <div className="flex my-4">
              <p className="text-base font-bold text-[#1E293B] text-nowrap">
                Jumlah Stock
              </p>
              <div className="w-full justify-end flex gap-5">
                <input
                  className="w-10 h-10 p-2 border-2 rounded-lg text-center text-lg font-bold text-gray-900"
                  value={formData.stcokBarang}
                  onChange={handleInputChange}
                  name="stcokBarang"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-orange-600 text-base text-white font-semibold text-center rounded-full mt-4"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
