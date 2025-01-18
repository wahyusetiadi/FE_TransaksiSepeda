import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ArrowUpTrayIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { getProductData, updateProductData } from "../../../api/api";

export const EditItems = ({ showButtonChange = false }) => {
  const { idBarang } = useParams();
  const [barang, setBarang] = useState(null); // Menyimpan data barang
  const [fileName, setFileName] = useState(""); // Menyimpan nama file gambar
  const [isDragOver, setIsDragOver] = useState(false); // Menyimpan status drag & drop
  const [message, setMessage] = useState(""); // Pesan status
  const [isVisible, setIsVisible] = useState(true);

  const productTypes = ["SPAREPART", "SEPEDA"];
  const productStatus = ["Tersedia", "Tidak Tersedia"];

  // Mengambil data barang dari API berdasarkan idBarang
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
    const fetchData = async () => {
      try {
        const data = await getProductData(idBarang); // Ambil data barang berdasarkan idBarang
        console.log("Data barang:", data);  // Log data barang
        if (!data) {
          throw new Error("Data barang tidak ditemukan.");
        }
        setBarang(data);  // Set data barang ke state
      } catch (error) {
        setMessage({
          type: "error",
          text: `Error fetching data: ${error.message}`,
        });
      }
    };
    fetchData();
  }, [message, idBarang]);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Pastikan barang tidak null dan memiliki properti yang valid
    if (!barang || !barang.name || !barang.type || !barang.price || !barang.status) {
      setMessage({
        type: "error",
        text: "Semua field harus diisi dengan benar sebelum disubmit.",
      });
      return;
    }
  
    const productData = {
      C
    };
  
    try {
      const result = await updateProductData(idBarang, productData);
      setMessage({
        type: "success",
        text: `Produk berhasil diupdate: ${idBarang} ${productData.name}`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `Error: ${error.message}`,
      });
    }
  };
  

  // Menampilkan loading jika data belum tersedia
  if (!barang) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ContentLayout>
        <div className="p-6">
          <ButtonIcon
            icon={<ChevronLeftIcon className="size-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-500 font-semibold text-base"
            showArrow={false}
            linkTo="/barang"
          />
        </div>
        <hr className="mx-3" />

        {/* Menampilkan Pesan Status */}
        {isVisible && message && (
          <div
            className={`w-full mt-4 p-4 text-center rounded ${
              message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="w-full text-center mt-4">
          <h1>Edit Barang</h1>
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
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Masukkan Nama Barang"
                  value={barang?.name || ""}
                  onChange={(e) =>
                    setBarang({ ...barang, name: e.target.value })
                  }
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
                  className="w-full px-4 py-2 border rounded"
                  value={barang?.type || ""}
                  onChange={(e) =>
                    setBarang({ ...barang, type: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Pilih Tipe
                  </option>
                  {productTypes
                    .filter((option) => option !== barang?.type) // Menyaring tipe yang sudah dipilih
                    .map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  {barang?.type && (
                    <option value={barang.type} selected>
                      {barang.type}
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="Status Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Status Barang
                </label>
                <select
                  name=""
                  id=""
                  value={barang?.status || ""}
                  onChange={(e) =>
                    setBarang({ ...barang, status: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Pilih Status
                  </option>
                  {productStatus
                    .filter((option) => option !== barang?.status)
                    .map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  {barang?.status && (
                    <option value={barang.status} selected>
                      {barang.status}
                    </option>
                  )}
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
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Masukkan Harga Barang"
                    value={barang?.price || ""}
                    onChange={(e) =>
                      setBarang({ ...barang, price: e.target.value })
                    }
                  />
                </div>
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
