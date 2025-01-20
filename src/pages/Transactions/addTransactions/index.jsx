import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { addTransaction, getAllCustomerData } from "../../../api/api";

export const AddTransactions = () => {
  const location = useLocation();
  const { addedItems } = location.state || {};
  const [isOn, setIson] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pelanggan, setPelanggan] = useState("");
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const [transactionCode, setTransactionCode] = useState("");
  const [customerId, setCustomerId] = useState(''); //ubah jadi number
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState("");
  const [descriptions, setDescriptions] = useState("");

  const handlePayment = (e) => {
    setDescriptions(e.target.value);
  };

  const handleToggle = () => {
    setIson(!isOn);
  };

  const handleCustomer = (e) => {
    setPelanggan(e.target.value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      transactionCode: transactionCode,
      customerId: customerId,
      total: calculateTotal(),
      items: addedItems?.map((item) => ({
        product_id: item.id,
        price: item.price,
        amount: item.quantity,
        total: item.price * item.quantity,
      })),
      description: descriptions,
      hutang: 0,
    };
    console.log(JSON.stringify(payload, null, 2));

    try {
      const result = await addTransaction(payload);
      setMessage(`Transaksi Berhasil dibuat: ${result.data.transaction_code}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const calculateTotal = () => {
    return addedItems?.reduce((total, item) => {
      const price = item.price && !isNaN(item.price) ? Number(item.price) : 0;
      return total + price * item.quantity;
    }, 0);
  };

  const generateTransactionCode = () => {
    const date = new Date();
    const randomNumber = Math.floor(Math.random() * 1000000); 
    return `GMJ-${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${randomNumber}`;
  };

  useEffect(() => {
    if (isOn) {
      const fetchCustomers = async () => {
        setLoading(true);
        try {
          const response = await getAllCustomerData();
          setCustomers(response);
        } catch (error) {
          console.error("Error fetching customers:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCustomers();
    }
    setTransactionCode(generateTransactionCode);
  }, [isOn]);

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
        <form action="" onSubmit={handleSubmit}>
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
                      className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        isOn ? "bg-orange-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                          isOn ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-base font-bold">
                    {isOn ? "Pilih Pelanggan" : "Nama Pelanggan"}
                  </label>

                  {isOn ? (
                    <select
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="px-4 py-2 border-2 rounded"
                    >
                      <option value="" disabled>
                        Pilih Pelanggan
                      </option>
                      {loading ? (
                        <option value="" disabled>
                          Loading...
                        </option>
                      ) : (
                        customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))
                      )}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={pelanggan}
                      onChange={handleCustomer}
                      className="px-4 py-2 border-2 rounded"
                      placeholder="Masukkan Nama Pelanggan"
                    />
                  )}
                </div>
              </div>

              <div className="w-gull flex flex-col gap-1">
                <label htmlFor="" className=" font-bold">Kode Transaksi</label>
                <input
                  type="text"
                  className="px-4 py-2 border-2 rounded"
                  placeholder="Masukkan Kode Transaksi"
                  value={transactionCode}
                  onChange={(e) => setTransactionCode(e.target.value)}
                  disabled
                />
              </div>

              {/* <div className="w-full flex flex-col gap-6">
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
              </div> */}

              <div className="w-full flex flex-col gap-6">
                <h1 className="text-xl font-bold">Informasi Pembayaran</h1>
                <div className="w-full">
                  <h1>Metode Pembayaran</h1>
                  <div className="w-full flex gap-4 text-sm font-semibold">
                    <div
                      className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg"
                      onClick={() => document.getElementById("tunai").click()} // Menambahkan handler klik
                    >
                      <input
                        id="tunai"
                        type="radio"
                        name="pembayaran"
                        value="Tunai"
                        checked={descriptions === "Tunai"} // Cek jika ini yang dipilih
                        onChange={handlePayment} // Update state ketika dipilih
                        className="w-4 h-4 focus:ring-orange-600"
                      />
                      <label htmlFor="tunai">Tunai</label>
                    </div>

                    <div
                      className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg"
                      onClick={() =>
                        document.getElementById("transfer").click()
                      }
                    >
                      <input
                        id="transfer"
                        type="radio"
                        name="pembayaran"
                        value="Transfer"
                        checked={descriptions === "Transfer"}
                        onChange={handlePayment}
                        className="w-4 h-4 focus:ring-orange-600"
                      />
                      <label htmlFor="transfer">Transfer</label>
                    </div>

                    <div
                      className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg"
                      onClick={() => document.getElementById("qris").click()}
                    >
                      <input
                        id="qris"
                        type="radio"
                        name="pembayaran"
                        value="Qris"
                        checked={descriptions === "Qris"}
                        onChange={handlePayment}
                        className="w-4 h-4 focus:ring-orange-600"
                      />
                      <label htmlFor="qris">Qris</label>
                    </div>

                    <div
                      className="w-full px-2 py-4 flex gap-2 items-center justify-start border-2 rounded-lg"
                      onClick={() => document.getElementById("debit").click()}
                    >
                      <input
                        id="debit"
                        type="radio"
                        name="pembayaran"
                        value="Debit"
                        checked={descriptions === "Debit"}
                        onChange={handlePayment}
                        className="w-4 h-4 focus:ring-orange-600"
                      />
                      <label htmlFor="debit">Debit</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-2 w-full flex flex-col gap-8">
              <h1 className="text-xl font-bold">Rincian Pesanan</h1>
              <div className="">
                <div className="w-full flex items-center justify-start gap-4">
                  <div className="w-full">
                    <ul>
                      {addedItems?.length > 0 ? (
                        addedItems.map((item, index) => (
                          <li key={index}>
                            <div className="w-full flex items-center justify-between">
                              <p>
                                {`(x${item.quantity})`} {item.name}{" "}
                              </p>
                              <div className="">
                                {formatCurrency(item.price * item.quantity)}
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No items added</p>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="w-full text-sm">
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[#334155]">SubTotal</p>
                  <h1 className="font-semibold text-[#1E293B]">
                    {formatCurrency(calculateTotal())}
                  </h1>
                </div>
                {/* <div className="w-full flex justify-between">
                  <p className="font-normal text-[#334155]">Pengiriman</p>
                  <h1 className="font-semibold text-[#1E293B]">
                    {formatCurrency(50000)}
                  </h1>
                </div> */}
                {/* <div className="w-full flex justify-between">
                  <p className="font-normal text-[#334155]">Diskon (5%)</p>
                  <h1 className="font-semibold text-[#1E293B]">
                    {formatCurrency(-100000)}
                  </h1>
                </div> */}
                <hr className="mt-4" />
                <div className="w-full flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <h1>
                    {formatCurrency(calculateTotal())}
                  </h1>{" "}
                  {/* Total setelah diskon dan pengiriman */}
                </div>
              </div>
              <div className="w-full">
                {/* <Link to="/transaksi/pembayaran"> */}
                <button className="w-full rounded-full bg-orange-600 py-4 px-10 font-semibold text-base text-white">
                  Cetak Struk
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </form>
      </ContentLayout>
    </div>
  );
};
