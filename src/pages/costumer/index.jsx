import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import {
  DocumentTextIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { TableData } from "../../components/organisms/TableData";
import { createCustomer, getAllCustomerData } from "../../api/api";

export const CostumerPage = () => {
  const [customer, setCustomer] = useState([]);
  const [isShowAddCustomer, setIsShowAddCustomer] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [telp, setTelp] = useState("");
  const [type, setType] = useState("");

  const handleOpenModalAddCustomer = () => {
    setIsShowAddCustomer(true);
  };

  const handleCloseAddCustomer = () => {
    setIsShowAddCustomer(false);
  };

  const fetchDataCustomer = async () => {
    try {
      const data = await getAllCustomerData();
      setCustomer(data);
    } catch (error) {
      console.error("Error fetching data customer", error);
    }
  };

  useEffect(() => {
    fetchDataCustomer();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const telpValue = telp.replace(/[^0-9]/g, "");

    if (!telpValue || isNaN(telpValue)) {
      setMessage("Nomor telepon tidak valid.");
      return;
    }

    const customerData = {
      name: name,
      telp: telpValue,
      type: type,
    };

    try {
      const result = await createCustomer(customerData);
      setMessage(`Customer Berhasil tambahkan: ${result.data.name}`);
      handleCloseAddCustomer();
      fetchDataCustomer();
      setName("");
      setTelp("");
      setType("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <ContentLayout>
        <div className="px-6 py-4">
          {/* HEAD TITLE */}
          <div className="w-full flex items-center">
            <div className="text-nowrap w-fit">
              <h1 className="text-2xl font-bold">Pelanggan</h1>
              <p className="text-sm text-slate-700">
                Cek Riwayat Pembelian Pelanggan
              </p>
            </div>
            <div className="w-full flex items-center justify-end gap-2">
              {/* <ButtonIcon
                icon={<DocumentTextIcon className="size-5 text-slate-400" />}
                showArrow={false}
                title="Export"
                classNameBtn="border-2 rounded-lg px-2 py-1"
              /> */}
              <ButtonIcon
                icon={<PlusIcon className="size-5 text-white" />}
                showArrow={false}
                title="Tambah Pelanggan"
                classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
                titleColor="text-white"
                onClick={handleOpenModalAddCustomer}
              />
            </div>
          </div>
          <hr className="my-4" />

          <div className="">
            <TableData
              data={customer}
              itemsPerPage={10}
              showSearchSet={true}
              sortedData={true}
            />
          </div>
        </div>

        {isShowAddCustomer && (
          <div className="w-full fixed inset-0 flex items-center justify-center">
            <div className="w-full h-screen bg-black absolute opacity-50"></div>
            <div className="bg-white px-6 py-10 rounded-lg shadow-lg z-10 w-[480px] flex items-center justify-center flex-col gap-8">
              <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center px-4">
                  <div className="w-full flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Tambah Pelanggan</h3>
                    <XMarkIcon
                      className="text-black size-7 cursor-pointer"
                      onClick={handleCloseAddCustomer}
                    />
                  </div>

                  <hr className="w-full my-4" />
                  <form action="" className="w-full" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-2">
                      <label htmlFor="" className="text-base font-bold">
                        Nama Pelanggan
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Pelanggan"
                        className="px-4 py-2 border-2 rounded"
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2 mt-8">
                      <label htmlFor="noTelp" className="text-base font-bold">
                        No. Telp Pelanggan
                      </label>
                      <input
                        type="number"
                        value={telp}
                        onChange={(e) => setTelp(e.target.value)}
                        placeholder="08XXXX"
                        className="px-4 py-2 border-2 rounded"
                        pattern="[0-9]*" // Membatasi input hanya angka
                        inputMode="numeric" // Menentukan bahwa input berupa angka
                      />
                    </div>

                    <div className="w-full flex flex-col gap-2 mt-8">
                      <label htmlFor="" className="text-base font-bold">
                        Jenis Pelanggan
                      </label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-4 py-2 border-2 rounded"
                      >
                        <option value="" disabled>
                          Pilih jenis
                        </option>
                        <option value="VIP">VIP</option>
                        <option value="Regular">Regular</option>
                      </select>
                    </div>

                    <div className="w-full flex gap-4 items-center justify-between mt-8">
                      <button className="w-full px-10 py-3 text-white text-base font-semibold bg-orange-600 rounded-full">
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </ContentLayout>
    </div>
  );
};
