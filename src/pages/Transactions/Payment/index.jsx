import React from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { CheckIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const Payment = () => {
  return (
    <div>
      <ContentLayout>
        <div className="w-full flex items-center justify-center bg-slate-100">
          <div className="w-1/2 flex flex-col bg-white rounded-xl p-8 gap-10">
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckIcon
                  className="text-green-600 size-8"
                  style={{ strokeWidth: 3 }}
                />
              </div>
              <h1 className="text-xl font-bold">Pembelian Berhasil</h1>
              <p className="text-base">ID Transaksi #{"12345678"}</p>
            </div>

            <div className="text-base">
              <ul className="w-full flex flex-col gap-6">
                <li className="flex flex-col gap-2">
                  <h1 className="font-bold">Tanggal Transaksi</h1>
                  <p className="text-sm">
                    {"Sabtu"}, {"04 Januari 2025"} | {"15:42"}
                  </p>
                </li>
                <li className="flex flex-col gap-2">
                  <h1 className="font-bold">Jenis Transaksi</h1>
                  <p className="text-sm">{"Ambil Ditempat"}</p>
                </li>
                <li className="flex flex-col gap-2">
                  <h1 className="font-bold">Pelanggan</h1>
                  <p className="text-sm">
                    {"Maulana"} {"+6289765431201"}
                  </p>
                </li>
                <li className="flex flex-col gap-2">
                  <h1 className="font-bold">Metode Pembayaran</h1>
                  <div className="flex gap-2">
                    <p className="text-sm">{"Transfer"}</p>
                    <div className="w-full flex gap-2 font-semibold text-orange-600 items-center justify-start">
                      <PhotoIcon className="size-4" />
                      <p className="text-sm">Bukti Pembayaran</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="w-full flex flex-col gap-6">
              <h1 className="font-bold text-xl">Daftar Pesanan</h1>

              <div className="w-full flex items-center justify-start gap-2">
                <img
                  src=""
                  alt=""
                  className="w-28 h-28 rounded-lg bg-slate-200"
                />

                <div className="text-base text-start">
                  <h1 className="font-bold">{"MTB Explorer 500"}</h1>
                  <p className="text-sm font-medium">{"x1"}</p>
                  <p className="font-semibold">{"Rp5.500.000"}</p>
                </div>
              </div>

              <div className="">
                <ul className="w-full flex flex-col gap-3 font-semibold text-sm">
                  <li>
                    <div className="w-full flex justify-between">
                      <p className="font-normal text-[#334155]">Subtotal</p>
                      <p>Rp{"5.500.000"}</p>
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex justify-between">
                      <p className="font-normal text-[#334155]">Pengiriman</p>
                      <p>Rp{"50.000"}</p>
                    </div>
                  </li>
                  <li>
                    <div className="w-full flex justify-between">
                      <p className="font-normal text-[#334155]">
                        Diskon {"(5%)"}
                      </p>
                      <p>-Rp{"100.000"}</p>
                    </div>
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li>
                    <div className="w-full flex justify-between">
                      <h1 className="text-lg">{"Total"}</h1>
                      <h1 className="text-lg">Rp{"5.450.000"}</h1>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="">
              <Link to="/transaksi">
                <button className="w-full rounded-full bg-orange-600 py-4 px-10 font-semibold text-base text-white">
                  Kembali Transaksi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
