import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createProducts } from "../../../api/api";
import { Link, replace, useNavigate } from "react-router-dom";

const generateItemCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const length = 10;
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
  const [priceEcer, setPriceEcer] = useState("");
  // const [price, setPrice] = useState("");
  const [priceGrosir, setPriceGrosir] = useState("");
  const [status, setStatus] = useState("");
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
    // if (!price) {
    //   alert("Biaya Harus di input!");
    // }

    const productData = {
      productCode: productCode,
      name: name,
      price_ecer: priceEcer,
      price_grosir: priceGrosir,
      status: status,
      isDeleted: false,
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
        <div className="pb-4">
          <div className="p-6 w-fit">
            <ButtonIcon
              icon={
                <ChevronLeftIcon className="h-6 text-orange-500 max-md:h-4" />
              }
              title="Kembali"
              titleColor="text-orange-600 font-semibold text-base max-md:text-xs"
              showArrow={false}
              linkTo="/barang"
            />
          </div>
          <hr className="mx-3" />
          {/* Form */}
          <div className="w-full text-center mt-4">
            <h1 className="text-2xl max-md:text-lg font-bold">Tambah Barang</h1>
          </div>
          <div className="px-4 mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 max-md:flex-col">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="Nama Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Ensure value is updated
                    className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
                    placeholder="Masukkan Nama Barang"
                    required
                  />
                </div>

                {/* <div className="w-full flex flex-col">
                  <label
                    htmlFor="Kategori Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Tipe Barang
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)} // Ensure value is updated
                    className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
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
                </div> */}
              </div>

              <div className="flex gap-4 mt-6 max-md:flex-col">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="Deskripsi Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Kode Barang
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)} // Ensure value is updated
                    disabled
                  />
                </div>

                <div className="w-full flex flex-col">
                  <label
                    htmlFor="Status Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Status Barang
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} // Use setStatus to update the status
                    className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
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

              <div className="flex gap-4 mt-6 max-md:flex-col">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="Harga Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Harga Barang Grosir
                  </label>
                  <div className="flex gap-4">
                    <div className="w-14 flex items-center justify-center bg-slate-100 font-bold text-sm rounded max-md:text-xs">
                      Rp
                    </div>
                    <input
                      type="number"
                      value={priceGrosir}
                      onChange={(e) => setPriceGrosir(e.target.value)} // Ensure value is updated
                      className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
                      placeholder="Masukkan Harga Barang"
                      required
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="Harga Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Harga Barang Ecer
                  </label>
                  <div className="flex gap-4">
                    <div className="w-14 flex items-center justify-center bg-slate-100 font-bold text-sm rounded max-md:text-xs">
                      Rp
                    </div>
                    <input
                      type="number"
                      value={priceEcer}
                      onChange={(e) => setPriceEcer(e.target.value)} // Ensure value is updated
                      className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
                      placeholder="Masukkan Harga Barang"
                      required
                    />
                  </div>
                </div>

                {/* <div className="w-full flex flex-col">
                  <label
                    htmlFor="Stok Barang"
                    className="text-base max-md:text-xs font-bold text-slate-700"
                  >
                    Stok Barang
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)} // Ensure value is updated
                    className="w-full px-4 py-2 border rounded max-md:text-xs max-md:px-2"
                    placeholder="Masukkan Jumlah Stok"
                    required
                  />
                </div> */}
              </div>

              <div className="w-full mt-6">
                <button
                  type="submit"
                  className="w-full max-md:text-xs px-4 py-2 text-center bg-orange-500 hover:bg-orange-600 rounded-full text-white font-semibold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
