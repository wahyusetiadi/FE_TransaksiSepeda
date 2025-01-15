import React, { useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ArrowUpTrayIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

export const DetailItems = () => {
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

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
  return (
    <div>
      <ContentLayout>
        <div className="p-6">
          <ButtonIcon
            icon={<ChevronLeftIcon className="size-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-500 font-semibold text-base"
            showArrow={false}
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
                  name=""
                  id=""
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="Pilih Kategori">Pilih Kategori</option>
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
                  name=""
                  id=""
                  className="w-full h-[180px] px-4 py-2 border rounded mt-2"
                  placeholder="Masukkan Deskripsi Barang"
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
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col justify-center items-center text-gray-600 cursor-pointer"
                  >
                    <ArrowUpTrayIcon className="h-10 w-10 text-gray-500 mb-2" />
                    <span className="text-base font-bold">
                      Click to Upload or drag and drop
                    </span>
                    <span className="text-sm text-slate-600">
                      Max 10mb file size, Only png and jpeg files.
                    </span>
                  </label>
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
