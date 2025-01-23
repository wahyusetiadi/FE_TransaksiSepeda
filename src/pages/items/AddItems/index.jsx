import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createProducts } from "../../../api/api";
import { Link, replace, useNavigate } from "react-router-dom";

const generateItemCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const length = 10; // Panjang kode acak
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const AddItems = () => {
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [productCode, setProductCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState(""); // Tambahkan state untuk status
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const productTypes = ["SPAREPART", "SEPEDA"];
  const productStatus = ["Tersedia", "Tidak Tersedia"];

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
    if (!name) {
      alert("Nama Barang Harus di input!");
      return;
    }
    if (!price) {
      alert("Biaya Harus di input!");
    }

    const productData = {
      productCode: productCode,
      name: name,
      type: type,
      price: price,
      stock: parseInt(stock),
      status: status,
      // isDeleted: false,
    };

    try {
      const result = await createProducts(productData);
      console.log(`Produk Berhasil dibuat: ${result.data.name}`);
      navigate("/barang", { replace: true });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    setProductCode(generateItemCode());
  }, []);

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
          <form onSubmit={handleSubmit}>
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
                  required
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
                  required
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
                  className="w-full px-4 py-2 border rounded"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)} // Ensure value is updated
                  disabled
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
                  required
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
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} // Ensure value is updated
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Masukkan Harga Barang"
                    required
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
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)} // Ensure value is updated
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Masukkan Jumlah Stok"
                  required
                />
              </div>
            </div>

            <div className="w-full mt-6">
              <button type="submit" className="w-full px-4 py-2 text-center bg-orange-500 hover:bg-orange-600 rounded-full text-white font-semibold">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </ContentLayout>
    </div>
  );
};
