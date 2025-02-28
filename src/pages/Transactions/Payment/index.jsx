import React, { useEffect } from "react";
import { formatCurrency } from "../../../utils";

export const Payment = () => {
  const date = new Date();
  const transactionCode = sessionStorage.getItem("transactionCode");
  const addedItems = JSON.parse(sessionStorage.getItem("addedItems"));
  const total = sessionStorage.getItem("total");
  const description = sessionStorage.getItem("description");
  const customer = sessionStorage.getItem("customers");
  const pelanggan = sessionStorage.getItem("pelanggan");
  const hutang = sessionStorage.getItem("hutang");
  const diskon = sessionStorage.getItem("discount");

  console.log("addedItems:", addedItems);
  console.log("total:", total);
  console.log("descriptions:", description);
  console.log("customerName:", customer);
  console.log("customerNonVip:", pelanggan);
  console.log("Hutang:", hutang);
  console.log("diskon: ", diskon);

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
    const printWindow = window.open("", "", "width=600,height=800");

    printWindow.document.write(`
      <html>
        <head>
          <title>Struk Pembelian</title>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 10px;
              font-size: 12px;
              color: #333;
            }
            .text-center {
              text-align: center;
            }
            .text-start {
              text-align: left;
            }
            .flex {
              display: flex;
              justify-content: space-between;
            }
            .gap-2 {
              gap: 8px;
            }
            .my-2 {
              margin-top: 8px;
              margin-bottom: 8px;
            }
            .font-semibold {
              font-weight: 600;
            }
            .font-bold {
              font-weight: 700;
            }
            .text-xs {
              font-size: 10px;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close(); // Penting untuk menyelesaikan proses dokumen
    printWindow.print(); // Melakukan print
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
                  {customer && customer !== "Error"
                    ? customer
                    : pelanggan && pelanggan !== "Error"
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
                <span>
                  {formatCurrency(
                    (item.price || item.price_ecer || item.price_grosir) *
                      item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-2" />
          <div className="flex justify-between text-sm">
            <p>diskon</p>
            <p>-{formatCurrency(diskon)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Total</p>
            <p>{formatCurrency(total)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Hutang</p>
            <p>{formatCurrency(hutang)}</p>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <p>Total Bayar</p>
            <p>{formatCurrency(total - hutang - diskon)}</p>
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
