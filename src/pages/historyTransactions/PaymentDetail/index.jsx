import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { getUser } from "../../../api/api";
import { formatCurrency } from "../../../utils";

const PaymentPage = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data dari sessionStorage
    const storedData = sessionStorage.getItem("transactionData");
    console.log("storedData", storedData);

    if (storedData) {
      setTransactionData(JSON.parse(storedData));
    } else {
      navigate("/"); // Kembali ke halaman utama jika data tidak ditemukan
    }

    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error GET userData");
        throw error;
      }
    };

    fetchUser();
  }, [navigate]);

  if (!transactionData) {
    return <div>Loading...</div>;
  }

  const {
    transactionCode,
    items,
    total,
    metodePembayaran,
    date,
    customer,
    hutang,
    discount,
    note,
  } = transactionData;

  console.log('transactions Data', transactionData);
  

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
    
    printWindow.document.close();  // Penting untuk menyelesaikan proses dokumen
    printWindow.print();           // Melakukan print
  };

  return (
    <div className="w-full h-screen flex flex-col text-center items-center justify-center">
      <div className="w-[375px] h-auto bg-white rounded-lg p-4 text-xs font-mono border border-gray-300" id="print-content">
        {/* Header struk */}
        <div className="text-center">
          <h1 className="font-bold">GMJ Bike Shop</h1>
          <p>Jl. Veteran No. 123</p>
          <p>Telp: 0812-3456-7890</p>
        </div>
        <hr className="my-2" />
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
              Pelanggan: <b>{customer || "Error"}</b>
            </p>
            <p className="text-xs">{formatTanggal(date)}</p>
            {/* <p className="text-xs">{formatTime(date)}</p> */}
          </div>
        </div>
        <hr className="my-2" />

        {/* Daftar Barang */}
        <div className="w-full flex flex-col gap-2">
          {items.map((item, index) => (
            <div key={index} className="w-full flex justify-between text-xs">
              <span>
                (x{item.amount}) {item.name}
              </span>
              <span>{formatCurrency((item.total))}</span>
            </div>
          ))}
        </div>

        {/* Total dan Metode Pembayaran */}
        <div className="flex justify-between text-sm">
            <p>diskon</p>
            <p>-{formatCurrency(discount)}</p>
          </div>
        <div className="flex justify-between text-sm font-semibold my-2">
          <p className="total">Total:</p>
          <p>{formatCurrency(total)}</p>
        </div>
        <div className="flex justify-between text-sm font-semibold my-2">
          <p className="total">Hutang:</p>
          <p className="text-red-600">{formatCurrency(hutang)}</p>
        </div>
        <div className="flex justify-between text-sm font-semibold my-2">
          <p className="total">Total Bayar:</p>
          <p>{formatCurrency(total - hutang - discount)}</p>
        </div>
        <hr className="my-2" />

        <div className="flex justify-between text-start text-sm  ">
          <p>Metode Pembayaran:</p>
          <p>
            <b>{metodePembayaran}</b>
          </p>
        </div>
        <div className="italic font-bold text-start text-sm flex items-center justify-between">
            <p>Note:</p>
            <p>
              <b>{note}</b>
            </p>
          </div>
        <hr className="my-2" />

        <div className="text-center text-xs text-gray-600">
          <p>
            Terima kasih telah berbelanja di <br /> GMJ Bike Shop
          </p>
          <p>www.gmjbikeshop.com</p>
          <p>Pastikan untuk menyimpan struk ini sebagai bukti transaksi.</p>
          {/* <p>Admin {userData.username}</p> */}
        </div>
      </div>
      <div className="print-button-container mt-4 text-white text-sm">
        <button
          onClick={handlePrint}
          className="print-button px-4 py-2 bg-orange-600 rounded-full"
        >
          Cetak Struk
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
