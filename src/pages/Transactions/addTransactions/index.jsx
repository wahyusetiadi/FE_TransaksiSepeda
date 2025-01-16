import React, { useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export const AddTransactions = () => {
  const [isOn, setIson] = useState(false);

  const handleToggle = () => {
    setIson(!isOn);
  };
  return (
    <div>
      <ContentLayout>
        <div className="p-6">
          <ButtonIcon
            icon={<ChevronLeftIcon className="h-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-600 font-semibold text-base"
            showArrow={false}
            linkTo="/transaksi"
          />
        </div>
        <hr className="mx-3" />
        <div className="mt-4 grid grid-cols-2 px-6 gap-8">
          <div className="mx-2 w-full flex flex-col gap-10 pr-6 border-r-2">
            <div className="w-full flex flex-col gap-6">
              <h1 className="text-xl font-bold">Informasi Pelanggan</h1>
              <div className="w-full flex text-nowrap">
                <p>Apakah Pelanggan Sudah Terdaftar</p>
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
              <div className="flex flex-col">
                <label className="text-base font-bold">Pilih Pelanggan</label>
                <select name="" id="" className="px-4 py-2 border-2 rounded">
                  <option value="" disabled>
                    Pilih Pelanggan
                  </option>
                  <option value="Pelanggan 1">Pelanggan 1</option>
                  <option value="Pelanggan 2">Pelanggan 2</option>
                </select>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              <h1 className="text-xl font-bold">Informasi Transaksi</h1>
              <div className="w-full">
                <h1>Jenis Transaksi</h1>
                <div className="w-full flex gap-4">
                  <div className="w-full p-4 flex gap-2 items-center justify-start border-2 rounded-lg">
                    <input
                      type="radio"
                      name="transaksi"
                      value={"Ambil Ditempat"}
                      className="w-4 h-4 focus:ring-orange-600"
                    />
                    <label htmlFor="">Ambil Ditempat</label>
                  </div>

                  <div className="w-full p-4 flex gap-2 items-center justify-start border-2 rounded-lg">
                    <input
                      type="radio"
                      name="transaksi"
                      value={"Kirim ke Alamat"}
                      className="w-4 h-4 focus:ring-orange-600"
                    />
                    <label htmlFor="">Kirim ke Alamat</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6">
              <h1 className="text-xl font-bold">Informasi Pembayaran</h1>
              <div className="w-full">
                <h1>Metode Pembayaran</h1>
                <div className="w-full flex gap-4 text-sm font-semibold">
                  <div className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg">
                    <input
                      type="radio"
                      name="pembayaran"
                      value={"Tunai"}
                      className=" w-4 h-4 focus:ring-orange-600"
                    />{" "}
                    <label htmlFor="">Tunai</label>
                  </div>

                  <div className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg">
                    <input
                      type="radio"
                      name="pembayaran"
                      value={"Transafer"}
                      className=" w-4 h-4 focus:ring-orange-600"
                    />{" "}
                    <label htmlFor="">Transfer</label>
                  </div>

                  <div className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg">
                    <input
                      type="radio"
                      name="pembayaran"
                      value={"Qris"}
                      className=" w-4 h-4 focus:ring-orange-600"
                    />{" "}
                    <label htmlFor="">Qris</label>
                  </div>

                  <div className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg">
                    <input
                      type="radio"
                      name="pembayaran"
                      value={"Debit"}
                      className=" w-4 h-4 focus:ring-orange-600"
                    />{" "}
                    <label htmlFor="">Debit</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2 w-full flex flex-col gap-8">
            <h1 className="text-xl font-bold">Daftar Pesanan</h1>
            <div className="">
              <div className="w-full flex items-center justify-start gap-4">
                <img src="" alt="" className="w-[120px] h-[120px]" />
                <div className="">
                  <p>MTB Xplorer 500</p>
                  <p>1x</p>
                  <p>Rp5.000.000</p>
                </div>
              </div>
            </div>
            <div className="">
              <label htmlFor="" className="text-base font-bold">
                Kode Diskon
              </label>
              <input
                type="text"
                placeholder="Masukkan Kode"
                className="w-full px-4 py-2 border-2 rounded-lg"
              />
            </div>

            <div className="w-full text-sm">
              <div className="w-full flex justify-between">
                <p className="font-normal text-[#334155]">SubTotal</p>
                <h1 className="font-semibold text-[#1E293B]">Rp5.500.000</h1>
              </div>
              <div className="w-full flex justify-between">
                <p className="font-normal text-[#334155]">Pengiriman</p>
                <h1 className="font-semibold text-[#1E293B]">Rp50.000</h1>
              </div>
              <div className="w-full flex justify-between">
                <p className="font-normal text-[#334155]">Diskon (5%)</p>
                <h1 className="font-semibold text-[#1E293B]">-Rp100.000</h1>
              </div>
              <hr className="mt-4" />
              <div className="w-full flex justify-between text-lg font-semibold">
                <p>Total</p>
                <h1>Rp{"5.450.000"}</h1>
              </div>
            </div>
            <div className="w-full">
              <Link to="/transaksi/pembayaran">
                <button className="w-full rounded-full bg-orange-600 py-4 px-10 font-semibold text-base text-white">
                  Cetak Struk
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
