import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import {
  ChevronLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { TableData } from "../../../components/organisms/TableData";
import { useParams } from "react-router-dom";
import { getHistoryTransactionDetail, updatePaid } from "../../../api/api";
import { ClipLoader } from "react-spinners";

export const DetailHistoryTransactions = () => {
  const { id } = useParams();
  const [transactionsDetail, setTransactionsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [lunas, setLunas] = useState("");
  const [debt, setDebt] = useState("");
  const [isDebt, setIsDebt] = useState("");

  const handleToggleState = () => {
    setIsOn(!isOn);

    if (!isOn) {
      setTransactionsDetail({
        ...transactionsDetail,
        hutang: transactionsDetail?.hutang || 0,
      });
    }
  };

  const fetchTransactionDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getHistoryTransactionDetail(id);

      // Check if we have valid data
      if (response && response.data) {
        setTransactionsDetail(response.data);
      } else if (response) {
        setTransactionsDetail(response);
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      setError(error.message || "Failed to fetch transaction details");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

  useEffect(() => {
    if (transactionsDetail?.hutang <= 0) {
      setIsOn(true);
    }
  }, [transactionsDetail?.hutang]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hutang = isOn ? 0 : Number(transactionsDetail.hutang);
    const lunas = isOn ? true : false;

    console.log("hutang:", hutang);

    if (isNaN(hutang)) {
      console.error("Hutang harus berupa angka");
      setMessage("Hutang harus berupa angka");
      return;
    }

    const payload = {
      lunas: lunas,
      hutang: hutang,
    };

    console.log("payload yang akan dikirim:", payload);

    try {
      const result = await updatePaid(id, payload);

      setTimeout(() => {
        if (result.error.meta.status) {
          setMessage(`Update detail transaksi berhasil`);
        } else {
          setMessage("Gagal Update detail transaksi");
        }
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setLoading(false);
      });
      // console.log("update paid", result.error.meta);
    } catch (error) {
      setMessage(`Error:  ${error.message}`);
    } finally {
      fetchTransactionDetails();
      setIsModalOpen(false);
    }
  };

  const handleChange = (e) => {
    setIsDebt(e.target.value);
  };

  const handlePrintReceipt = () => {
    const {
      transactionCode,
      items,
      total,
      description,
      date,
      customer,
      hutang,
    } = transactionsDetail;

    console.log("Storing transaction data to sessionStorage:", {
      transactionCode,
      items,
      total,
      metodePembayaran: description,
      date,
      customer,
      hutang,
    });

    sessionStorage.setItem(
      "transactionData",
      JSON.stringify({
        transactionCode,
        items,
        total,
        metodePembayaran: description,
        date,
        customer,
        hutang,
      })
    );

    setTimeout(() => {
      const newTab = window.open("/payment", "_blank");
      newTab?.focus();
    }, 100);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <ContentLayout>
        <div className="p-6 flex justify-center items-center">
          <p className="text-lg">Loading...</p>
        </div>
      </ContentLayout>
    );
  }

  if (error) {
    return (
      <ContentLayout>
        <div className="p-6">
          <ButtonIcon
            icon={<ChevronLeftIcon className="h-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-600 font-semibold text-base"
            showArrow={false}
            linkTo="/riwayat-transaksi"
          />
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </ContentLayout>
    );
  }

  if (!transactionsDetail) {
    return (
      <ContentLayout>
        <div className="p-6">
          <ButtonIcon
            icon={<ChevronLeftIcon className="h-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-600 font-semibold text-base"
            showArrow={false}
            linkTo="/riwayat-transaksi"
          />
          <div className="mt-4">
            <p>No transaction details found.</p>
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      {message && (
        <>
        <div className="w-full mt-4 p-4 fixed bg-green-100 border-l-4 border-green-500 text-green-700">
          <p>{message}</p>
        </div>
        </>
      )}

      <div className="pb-6">
        <div className="p-6 w-fit">
          <ButtonIcon
            icon={<ChevronLeftIcon className="h-6 text-orange-500" />}
            title="Kembali"
            titleColor="text-orange-600 font-semibold text-base"
            showArrow={false}
            linkTo="/riwayat-transaksi"
          />
        </div>
        <div className="px-6">
          <div className="w-full flex flex-col gap-10 text-center">
            <h1 className="text-2xl font-bold">Detail Transaksi</h1>

            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-start w-full flex flex-col gap-2">
                <p className="text-slate-600 font-medium text-xs">
                  Nama Pelanggan
                </p>
                <h1 className="text-base font-bold">
                  {transactionsDetail.customer || "Wahyu Ansari"}
                </h1>
                <hr />
              </div>

              <div className="text-start w-full flex flex-col gap-2">
                <p className="text-slate-600 font-medium text-xs">
                  Kode Transaksi
                </p>
                <h1 className="text-base font-bold">
                  {transactionsDetail.transactionCode || "+6281299887766"}
                </h1>
                <hr />
              </div>

              <div className="text-start w-full flex flex-col gap-2">
                <p className="text-slate-600 font-medium text-xs">
                  Jenis Pembayaran
                </p>
                <h1 className="text-base font-bold">
                  {transactionsDetail.description || "VIP"}
                </h1>
                <hr />
              </div>

              <div className="text-start w-full flex flex-col gap-2">
                <p className="text-slate-600 font-medium text-xs">Hutang</p>
                <h1 className="text-base font-bold">
                  {transactionsDetail.hutang || 0}
                </h1>
                <hr />
              </div>
            </div>

            <div>
              <div className="text-start w-full flex items-center justify-between">
                <h1 className="text-xl font-bold">Daftar Produk</h1>
                <div className="w-auto flex gap-2">
                  <button
                    onClick={openModal}
                    className="px-6 py-2 border-2 border-orange-600 text-orange rounded-lg text-orange-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handlePrintReceipt}
                    className="px-6 py-2 border-2 border-orange-600 text-orange rounded-lg text-orange-600 font-semibold"
                  >
                    Cetak Struk
                  </button>
                </div>
              </div>
              {Array.isArray(transactionsDetail) ||
              Array.isArray(transactionsDetail?.items) ? (
                <TableData
                  data={
                    Array.isArray(transactionsDetail)
                      ? transactionsDetail.map(({ stock, ...rest }) => rest) // Menghapus kolom "stock"
                      : transactionsDetail.items.map(
                          ({ stock, ...rest }) => rest
                        )
                  }
                  showPagination={false}
                />
              ) : (
                <p className="text-center mt-4">No product data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pr-36 w-full flex justify-end text-right font-bold">
        <p>total : {transactionsDetail.total}</p>
      </div>

      {isModalOpen && (
        <div className="w-full fixed inset-0 flex items-center justify-center">
          <div className="w-full h-screen bg-black absolute opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-[480px] max-md:w-[300px] flex items-center justify-center flex-col gap-4">
            <div className="w-full flex flex-col items-center justify-center gap-5">
              <div className="w-full flex flex-col text-center items-center justify-center">
                <h3 className="text-xl max-md:text-base font-semibold">Edit</h3>
                <p className="text-base max-md:text-xs text-[#64748B] px-12">
                  Pastikan Customer sudah melakukan pelunasan.
                </p>
              </div>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
            >
              <div className="w-full flex flex-col gap-2">
                <label htmlFor="">Hutang</label>
                <input
                  type="text"
                  className="px-4 py-2 border-2 rounded max-md:text-xs"
                  value={isOn ? 0 : transactionsDetail.hutang}
                  onChange={(e) => {
                    if (!isOn) {
                      const updatedHutang = e.target.value;
                      if (/^\d*$/.test(updatedHutang)) {
                        setTransactionsDetail({
                          ...transactionsDetail,
                          hutang: updatedHutang || 0,
                        });
                      }
                    }
                  }}
                  disabled={isOn}
                />
              </div>
              <div className="">
                <div
                  className={`w-full justify-start relative inline-flex items-center cursor-pointer gap-3 ${
                    isOn ? "justify-start" : "justify-start"
                  }`}
                  onClick={handleToggleState}
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

                  {isOn ? (
                    <p className="mr-2">Lunas</p>
                  ) : (
                    <p className="mr-2">Belum Lunas</p>
                  )}
                </div>
              </div>

              <div className="w-full flex gap-4 items-center justify-between">
                <button
                  onClick={closeModal}
                  className="w-full px-10 py-3 max-md:text-xs max-md:px-7 border-2 text-red-600 text-base font-semibold border-red-600 rounded-full"
                >
                  Batal
                </button>
                <button
                  onClick={loadingSubmit}
                  className="w-full px-10 py-3 max-md:text-xs max-md:px-7 text-white text-base font-semibold bg-orange-600 rounded-full"
                >
                  {loadingSubmit ? (
                    <ClipLoader
                      size={24}
                      color="#fff"
                      loading={loadingSubmit}
                    />
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ContentLayout>
  );
};
