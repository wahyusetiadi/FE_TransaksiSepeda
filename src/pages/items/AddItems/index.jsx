import React, { useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ArrowUpTrayIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createProducts } from "../../../api/api";

export const AddItems = () => {
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [productCode, setProductCOde] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("");  // Tambahkan state untuk status
  const [message, setMessage] = useState("");

  const productTypes = ["SPAREPART", "ELECTRONICS", "FURNITURE", "CLOTHING"];
  const productStatus = ['Tersedia', 'Stock Habis', 'Discontinued'];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Pastikan semua field sudah terisi dengan data yang benar
    const productData = {
      product_code: productCode,
      name: name,  // Pastikan 'name' sudah ada dan terisi
      type: type,
      price: parseFloat(price),
      stock: parseInt(stock),
      status: status,  // Status sudah diperbarui dengan benar
      isDeleted: false,
    };
  
    try {
      const result = await createProducts(productData);
      setMessage(`Produk Berhasil dibuat: ${result.data.name}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  

  return (
    <div>
      <ContentLayout>
        <div className="p-6">
          <ButtonIcon
            icon={<ChevronLeftIcon className="h-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-600 font-semibold text-base"
            showArrow={false}
            linkTo="/barang"
          />
        </div>
        <hr className="mx-3" />
        {/* Form */}
        <div className="w-full text-center mt-4">
          <h1 className="text-2xl font-bold">Tambah Barang</h1>
        </div>
        <div className="px-4 mt-8">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="Nama Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Nama Barang
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Ensure value is updated
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Masukkan Nama Barang"
                />
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="Kategori Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Tipe Barang
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)} // Ensure value is updated
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="" disabled>
                    Pilih Tipe
                  </option>
                  {productTypes.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="Deskripsi Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Kode Barang
                </label>
                <input
                  type="text"
                  value={productCode}
                  onChange={(e) => setProductCOde(e.target.value)} // Ensure value is updated
                  className="w-full px-4 py-2 border rounded"
                  placeholder="contoh: 1231418"
                />
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="Status Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Status Barang
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} // Use setStatus to update the status
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  {productStatus.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="w-full flex flex-col">
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
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} // Ensure value is updated
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Masukkan Harga Barang"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="Stok Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Stok Barang
                </label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)} // Ensure value is updated
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Masukkan Jumlah Stok"
                />
              </div>
            </div>

            <div className="w-full mt-6">
              <button className="w-full px-4 py-2 text-center bg-orange-500 hover:bg-orange-600 rounded-full text-white font-semibold">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </ContentLayout>
    </div>
  );
};
