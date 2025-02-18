import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { updateCustomerData } from "../../../api/api";

export const ModalCustomerEdit = ({
  onClick,
  id,
  name,
  telp,
  type,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name,
    telp,
    type,
  });

  const customerType = ["VIP", "Reguler"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      name: formData.name,
      telp: formData.telp,
      type: formData.type,
    };

    try {
      const response = await updateCustomerData(id, updateData);
      console.log("Customer berhasil di update", response);
      onClick();
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  return (
    <div className="w-[560px] p-8 h-auto rounded-lg bg-white z-50 max-md:w-[300px] max-md:p-6">
      <div className="w-full flex">
        <div className="w-full flex items-center justify-start">
          <h1 className="text-2xl max-md:text-lg font-bold">Edit Customer</h1>
        </div>
        <div className="w-full flex items-center justify-end">
          <button onClick={onClick}>
            <XMarkIcon className="text-black size-6 max-md:size-5" />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="w-full flex gap-4">
        <div className="w-full flex flex-col gap-2">
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col">
              <label
                htmlFor="name"
                className="text-base max-md:text-xs font-bold text-slate-700"
              >
                Nama
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded max-md:text-xs"
                placeholder="Masukkan Nama"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full flex flex-col mt-4">
              <label
                htmlFor="telp"
                className="text-base max-md:text-xs font-bold text-slate-700"
              >
                No. Telp
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded max-md:text-xs"
                value={formData.telp}
                onChange={handleInputChange}
                name="telp"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="w-full flex flex-col">
                <label
                  htmlFor="type"
                  className="text-base max-md:text-xs font-bold text-slate-700"
                >
                  Tipe
                </label>
                <select
                  className="w-full px-4 py-2 border rounded max-md:text-xs"
                  value={formData.type}
                  onChange={handleInputChange}
                  name="type"
                >
                  <option value="" disabled>
                    Pilih Tipe
                  </option>
                  {customerType
                    .filter((option) => option !== formData.type)
                    .map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  {formData.type && (
                    <option value={formData.type} selected>
                      {formData.type}
                    </option>
                  )}
                </select>
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
