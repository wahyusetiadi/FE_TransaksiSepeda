import React, { useEffect } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { useLocation } from "react-router-dom";

export const Payment = () => {
  const location = useLocation();
  // const { transactionCode } = location.state || {};
  // const { description } = location.state || {};
  // const addItems = location.state?.items || [];
  // const total = location.state?.total || 0;
  const date = new Date();
  const transactionCode = sessionStorage.getItem("transactionCode");
  const addedItems = JSON.parse(sessionStorage.getItem("addedItems"));
  const total = sessionStorage.getItem("total");
  const description = sessionStorage.getItem("description");
  const customer = sessionStorage.getItem("customers");
  const pelanggan = sessionStorage.getItem("pelanggan");
  const hutang = sessionStorage.getItem("hutang")

  console.log("addedItems:", addedItems);
  console.log("total:", total);
  console.log("descriptions:", description);
  console.log("customerName:", customer);
  console.log("customerNonVip:", pelanggan);
  console.log("Hutang:", hutang);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  

  const handlePrint = () => {
    const printContents = document.getElementById("print-content").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div
          id="print-content"
          className="w-[375px] my-4 flex flex-col bg-white rounded-lg p-4 text-xs font-mono border border-gray-300"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="font-bold">GMJ Bike Shop</h1>
            <p>Jl. Veteran No. 123</p>
            <p>Telp: 0812-3456-7890</p>
          </div>

          <div className="mt-2 text-sm">
            <div className="text-center">
              <p className="font-semibold">Struk Pembelian</p>
              <p>
                ID Transaksi: <br /> {transactionCode}
              </p>
            </div>
            <hr className="my-2" />
            <div className="text-start">
              <p className="text-xs">
                Pelanggan: 
                <b>
                  {customer !== "Error"
                    ? customer
                    : pelanggan !== "Error"
                    ? pelanggan
                    : "Data tidak tersedia"}
                </b>
              </p>

              <p className="text-xs">{formatTanggal(date)}</p>
              {/* <p className="text-xs">{formatTime(date)}</p> */}
            </div>
          </div>

          <hr className="my-2" />

          {/* Rincian Pembelian */}
          <div className="w-full flex flex-col gap-2">
            {addedItems.map((item, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span>
                  (x{item.quantity}) {item.name}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-sm font-semibold">
            <p>Total</p>
            <p>{formatCurrency(total)}</p>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <p>Total Bayar</p>
            <p>{formatCurrency(total-hutang)}</p>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <p>Hutang</p>
            <p>{formatCurrency(hutang)}</p>
          </div>

          <hr className="my-2" />

          {/* Metode Pembayaran */}
          <div className="text-start text-sm flex items-center justify-between">
            <p>Metode Pembayaran:</p>
            <p>
              <b>{description}</b>
            </p>
          </div>

          <hr className="my-2" />

          {/* Footer */}
          <div className="text-center text-xs text-gray-600">
            <p>
              Terima kasih telah berbelanja di <br /> GMJ Bike Shop
            </p>
            <p>www.gmjbikeshop.com</p>
            <p>Pastikan untuk menyimpan struk ini sebagai bukti transaksi.</p>
          </div>
        </div>
      </div>

      <div className="pb-4 flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Cetak Struk
        </button>
      </div>
    </div>
  );
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
};

const formatTanggal = (date) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString();
};
