import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { exportOutbond, getAllHistoryTransactions } from "../../api/api";

export const ReportOutbond = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [outbond, setOutbond] = useState([]);

  useEffect(() => {
    const fetchOutbond = async () => {
      try {
        const data = await getAllHistoryTransactions();
        if (!data || data.length === 0) {
          setError("Tidak Ada data tersedia");
          return;
        }
        setOutbond(data);
      } catch (err) {
        setError("Gagal memuat data transaksi atau cabang.");
        console.error("Error fetching transactions:", err);
      }
    };
    fetchOutbond();
  }, []);

  const handleExport = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const filteredTransactions = outbond.filter(
      (outbond) => outbond.createdAt >= fromDate && outbond.createdAt <= toDate
    );

    setIsLoading(true);
    setError(null);

    try {
      await exportOutbond(fromDate, toDate);
      setFromDate("");
      setToDate("");
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError("Terjadi kesalahan saat mengekspor data.");
      console.error("Error exporting data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ContentLayout>
        <div className="">
          <div className="w-full py-4 px-6 flex">
            <div className="text-nowrap max-md:text-wrap w-fit">
              <h1 className="text-2xl max-md:text-lg font-bold">
                Laporan Barang Keluar
              </h1>
              <p className="text-sm max-md:text-xs text-slate-700">
                Cetak Laporan Barang keluar disini!
              </p>
            </div>
          </div>
          <hr className="mx-4" />
          <div className="px-6 mt-12 w-full flex items-center justify-center">
            <form onSubmit={handleExport}>
              {/* Tanggal */}
              <div className="flex gap-4">
                <div className="mb-4 flex flex-col items-start">
                  <label htmlFor="fromDate" className="font-semibold mb-2">
                    Dari Tanggal
                  </label>
                  <input
                    required
                    name="fromDate"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4 flex flex-col items-start">
                  <label htmlFor="toDate" className="font-semibold mb-2">
                    Sampai Tanggal
                  </label>
                  <input
                    required
                    name="toDate"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-12">
                <button
                  className={`w-full rounded-full bg-orange-600 py-4 px-10 font-semibold text-base max-md:text-xs text-white ${
                    isLoading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {isLoading ? 'Downloading...' : 'Export'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
