import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const ProductCard = ({ product }) => {
  // State untuk jumlah yang dipilih
  const [quantity, setQuantity] = useState(0);

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

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={product.gambar}
          alt={product.namaBarang}
        />
        {/* Menambahkan label "Tersedia" jika stok > 0, atau "Habis" jika stok = 0 */}
        <span
          className={`absolute top-2 left-2 px-3 py-1 text-xs font-bold rounded-full ${
            product.stock > 0
              ? "bg-green-500 text-white" // Tersedia
              : "bg-red-500 text-white" // Habis
          }`}
        >
          {product.stock > 0 ? "Tersedia" : "Habis"}
        </span>
      </div>

      <div className="p-4 w-full flex flex-col text-nowrap gap-2">
        <h5 className="text-base font-bold text-gray-800">
          {product.namaBarang}
        </h5>
        <p className="text-base font-semibold text-gray-900">
          Rp {product.harga.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">Stok: {product.stock}</p>

        {/* Tampilan tombol berdasarkan jumlah */}
        <div className="flex w-full items-center justify-center gap-2">
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className={`w-full text-white text-center text-sm font-bold py-2 px-3 rounded-full ${
                product.stock === 0
                  ? "bg-slate-300 text-white cursor-not-allowed" // Menampilkan tombol tambah dengan background orange-100 jika stok habis
                  : "bg-orange-600"
              }`}
              disabled={product.stock === 0} // Disable tombol jika stok habis
            >
              Tambah
            </button>
          ) : (
            <>
              <button
                onClick={handleSubtract}
                className="flex items-center justify-center w-[37px] h-[37px] text-orange-500 border border-orange-500 rounded-full"
                disabled={quantity === 0} // Disable tombol "-" jika quantity 0
              >
                <MinusIcon className="size-3" />
              </button>
              <span className="text-lg font-bold text-gray-900">{quantity}</span>
              <button
                onClick={handleAdd}
                className="flex w-[37px] h-[37px] text-white items-center justify-center bg-orange-600 rounded-full"
                disabled={quantity === product.stock} // Disable tombol "+" jika quantity sudah mencapai stok
              >
                <PlusIcon className="size-3" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
