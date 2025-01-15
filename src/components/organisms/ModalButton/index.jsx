import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const ModalButton = ({
  onClick,
  gambarBarang,
  namaBarang,
  kategoriBarang,
  captionBarang,
  hargaBarang,
  stcokBarang,
  idBarang,
}) => {
  const [isOn, setIson] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleToggle = () => {
    setIson(!isOn);
  };

  // Fungsi untuk menambah jumlah
  const handleAdd = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  // Fungsi untuk mengurangi jumlah
  const handleSubtract = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  // Format hargaBarang dengan format mata uang Indonesia
  const formatHarga = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Menghilangkan angka di belakang koma
    maximumFractionDigits: 0, // Menghilangkan angka di belakang koma
  }).format(hargaBarang);

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
        <div className="w-[180px] h-auto relative">
          <p className="py-1 px-3 bg-orange-100 rounded-full absolute top-1 left-1 z-10 text-xs">
            {kategoriBarang}
          </p>
          <img src={gambarBarang} alt={namaBarang} className="rounded-lg" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-xl font-bold">{namaBarang}</h1>
          <p className="text-sm text-slate-700 text-wrap">{captionBarang}</p>
          <p className="text-base font-bold">{formatHarga}</p>
          <Link to={`/barang/edit-barang/${idBarang}`}>
            <button className="w-1/2 flex px-2 py-[5px] gap-2 border border-orange-500 text-orange-500 bg-orange-50 items-center justify-center rounded-full text-nowrap">
              <PencilIcon className="size-3" />
              <p>Edit Detail Barang</p>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex mt-4">
        <p className="text-base font-bold text-[#1E293B] text-nowrap">
          Menu Tersedia
        </p>
        <div
          className={`w-full justify-end relative inline-flex items-center cursor-pointer ${
            isOn ? "justify-end" : "justify-start"
          }`}
          onClick={handleToggle}
        >
          <span
            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 
            ${isOn ? "bg-orange-600" : "bg-gray-300"}`}
          >
            <span
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 
              ${isOn ? "translate-x-4" : "translate-x-0"}`}
            />
          </span>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex">
        <p className="text-base font-bold text-[#1E293B] text-nowrap">
          Jumlah Stock
        </p>
        <div className="w-full justify-end flex gap-5">
          <button
            onClick={handleSubtract}
            className="flex items-center justify-center w-8 h-8 text-orange-500 border border-orange-500 rounded-full"
            disabled={quantity === 0} // Disable tombol "-" jika quantity 0
          >
            <MinusIcon className="size-3" />
          </button>
          <span className="text-lg font-bold text-gray-900">{stcokBarang}</span>
          <button
            onClick={handleAdd}
            className="flex w-8 h-8 text-white items-center justify-center bg-orange-600 rounded-full"
            // disabled={quantity === product.stock} // Disable tombol "+" jika quantity sudah mencapai stok
          >
            <PlusIcon className="size-3" />
          </button>
        </div>
      </div>
      <button className="w-full py-4 bg-orange-600 text-base text-white font-semibold text-center rounded-full mt-8">
        Simpan
      </button>
    </div>
  );
};
