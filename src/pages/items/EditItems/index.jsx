import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ArrowUpTrayIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { getBarangById } from "../../../api/api";

export const EditItems = ({ showButtonChange = false, }) => {
  const { idBarang } = useParams();
  const [barang, setBarang] = useState(null); // Menyimpan data barang
  const [fileName, setFileName] = useState(""); // Menyimpan nama file gambar
  const [isDragOver, setIsDragOver] = useState(false); // Menyimpan status drag & drop
  const [kategoriOption, setKategoriOption] = useState([]);

  // Mengambil data barang dari API berdasarkan idBarang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBarangById(idBarang); // Ganti dengan API yang sesuai
        console.log(data);

        setBarang(data); // Menyimpan data ke dalam state barang
      } catch (error) {
        console.error("Error fetching barang data:", error);
      }
    };
    fetchData();
  }, [idBarang]);

  // Mengubah nama file yang dipilih
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Menyimpan nama file yang dipilih
    } else {
      setFileName(""); // Menghapus nama file jika tidak ada file yang dipilih
    }
  };

  // Menangani event drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // Menangani event drag leave
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Menangani event drop
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name); // Menyimpan nama file yang dipilih saat drag & drop
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
        {/* Form */}
        <div className="w-full text-center mt-4">
          <h1>Edit Barang</h1>
        </div>
        <div className="px-4 mt-8">
          <form action="">
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
                  value={barang?.namaBarang || ""}
                  onChange={(e) =>
                    setBarang({ ...barang, namaBarang: e.target.value })
                  }
                />
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="Kategori Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Kategori Barang
                </label>
                <select
                  className="w-full px-4 py-2 border rounded"
                  value={barang?.kategori || ""}
                  onChange={(e) =>
                    setBarang({ ...barang, kategori: e.target.value })
                  }
                >
                  <option value="">Pilih Kategori</option>
                  {barang?.kategori && (
                    <option value={barang.kategori}>{barang.kategori}</option>
                  )}
                  {/* <option value="Sepeda Gunung">Sepeda Gunung</option>
                  <option value="Sepeda Lipat">Sepeda Lipat</option>
                  <option value="Sepeda Anak">Sepeda Anak</option> */}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="Deskripsi Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Deskripsi Barang
                </label>
                <textarea
                  className="w-full h-[180px] px-4 py-2 border rounded mt-2"
                  placeholder="Masukkan Deskripsi Barang"
                  value={barang?.deskripsi || ""}
                  onChange={(e) =>
                    setBarang({ ...barang, deskripsi: e.target.value })
                  }
                />
              </div>

              <div className="w-full flex flex-col">
                <label
                  htmlFor="Foto Barang"
                  className="text-base font-bold text-slate-700"
                >
                  Foto Barang
                </label>
                <div
                  className={`w-full h-[180px] flex justify-center items-center border ${
                    isDragOver
                      ? "border-blue-500 bg-gray-100"
                      : "border-gray-300"
                  } rounded mt-2`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Kondisi untuk menampilkan gambar yang sudah ada atau form upload */}
                  {barang?.gambar ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={barang.gambar}
                        alt="Foto Barang"
                        className="w-32 h-32 object-cover mb-2 rounded-lg" // Sesuaikan ukuran gambar jika perlu
                      />
                      {showButtonChange && (
                        <button
                          type="button"
                          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full"
                          onClick={() => setFileName("")} // Reset untuk mengganti gambar
                        >
                          Ganti Gambar
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center text-gray-600 cursor-pointer">
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload">
                        <ArrowUpTrayIcon className="h-10 w-10 text-gray-500 mb-2" />
                        <span className="text-base font-bold">
                          Click to Upload or drag and drop
                        </span>
                        <span className="text-sm text-slate-600">
                          Max 10mb file size, Only png and jpeg files.
                        </span>
                      </label>
                    </div>
                  )}
                </div>
                {fileName && (
                  <div className="mt-2 text-gray-600 text-sm">
                    <span>File terpilih: </span>
                    <strong>{fileName}</strong>
                  </div>
                )}
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
                    value={barang?.harga || ""}
                    onChange={(e) =>
                      setBarang({ ...barang, harga: e.target.value })
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
