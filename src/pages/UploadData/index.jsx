import React, { useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export const UploadData = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <ContentLayout>
        <div className="w-full flex flex-col gap-12 px-6 py-4">
          <div className="w-full text-nowrap max-md:text-wrap">
            <h1 className="text-2xl max-md:text-lg font-bold">Upload Data</h1>
            <p className="text-sm max-md:text-xs text-slate-700">
              Upload data dari excel kamu untuk menambahkan data ke list barang
              sesuai format!
            </p>
            <hr className="mt-4" />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <div
              className="w-fit border-2 border-dotted p-6 flex justify-center items-center cursor-pointer"
              onDrop={handleDrop} // Handling drag-and-drop
              onDragOver={handleDragOver} // Prevent default behavior on drag over
            >
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange} // Handling file select
                className="hidden"
                id="upload-input"
              />
              <label
                htmlFor="upload-input"
                className="flex flex-col items-center text-center"
              >
                <ArrowUpTrayIcon className="text-gray-500 w-12 h-12" />
                <span className="text-sm text-gray-500 mt-2">
                  Click or Drag and Drop to Upload
                </span>
              </label>
            </div>

            {/* Tombol untuk membuka file input */}
            <button
              className="mt-4 px-2 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
              onClick={() => document.getElementById("upload-input").click()}
            >
              Open File Explorer
            </button>

            {fileName && (
              <div className="mt-4 text-sm text-gray-700">
                <strong>Uploaded File: </strong>
                {fileName}
              </div>
            )}
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
