import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { addTransaction, getAllCustomerData } from "../../../api/api";

export const AddTransactions = () => {
  const location = useLocation();
  const { addedItems } = location.state || {};
  const [isOn, setIson] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pelanggan, setPelanggan] = useState("");
  const [customers, setCustomers] = useState([]);

  const handleToggle = () => {
    setIson(!isOn);
  };

  const handleChange = () => {
    setPelanggan(e.target.value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      transaction_code: "TRX-001",
      customer_id: selectedCustomer || 2,
      total: calculateTotal() + 50000 - 100000,
      items: addedItems?.map((item) => ({
        product_id: item.id,
        price: item.price,
        amount: item.quantity,
        total: item.price * item.quantity,
      })),
      description: paymentMethod,
      hutang: 0,
    };

    const result = await addTransaction(payload);

    setLoading(false);

    if (result.success) {
      console.log("Transaction created successfully:", result.data);
    } else {
      console.error("Error creating transaction:", result.error);
    }
  };

  const calculateTotal = () => {
    return addedItems?.reduce((total, item) => {
      const price = item.price && !isNaN(item.price) ? Number(item.price) : 0;
      return total + price * item.quantity;
    }, 0);
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
                      value={pelanggan}
                      onChange={handleChange}
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
                      onChange={handleChange}
                      className="px-4 py-2 border-2 rounded"
                      placeholder="Masukkan Nama Pelanggan"
                    />
                  )}
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
                        value={"Transfer"}
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
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[#334155]">Pengiriman</p>
                  <h1 className="font-semibold text-[#1E293B]">
                    {formatCurrency(50000)}
                  </h1>
                </div>
                <div className="w-full flex justify-between">
                  <p className="font-normal text-[#334155]">Diskon (5%)</p>
                  <h1 className="font-semibold text-[#1E293B]">
                    {formatCurrency(-100000)}
                  </h1>
                </div>
                <hr className="mt-4" />
                <div className="w-full flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <h1>
                    {formatCurrency(calculateTotal() - 100000 + 50000)}
                  </h1>{" "}
                  {/* Total setelah diskon dan pengiriman */}
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
        </form>
      </ContentLayout>
    </div>
  );
};
