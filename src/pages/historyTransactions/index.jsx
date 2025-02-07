import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ArrowPathIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import { TableData } from "../../components/organisms/TableData";
import {
  deleteHistoryTransactionsById,
  getAllHistoryTransactions,
  getTransaksi,
} from "../../api/api";
import { useNavigate } from "react-router-dom";

export const HistoryTransactions = () => {
  const [historyTransaction, setHistoryTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => setAlert({ show: false, message: "" }), 3000);
  };

  const fetchTransactionsHistory = async () => {
    try {
      const data = await getAllHistoryTransactions();
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      setHistoryTransactions(sortedData);
    } catch (error) {
      console.error("Error fetch data history transactions", error);
    }
  };
  useEffect(() => {
    fetchTransactionsHistory();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await deleteHistoryTransactionsById(id);
      const data = await fetchTransactionsHistory();
      setHistoryTransactions(data);
      if (response.meta.status === "success") {
        showAlert("Barang berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle detail click
  const handleDetailClick = (id) => {
    navigate(`/riwayat-transaksi/detail/${id}`); // Navigate to the detail page with the transaction ID
  };

  return (
    <div>
      <ContentLayout>
        <div className="w-full flex flex-col">
          <div className="w-full py-4 px-6 flex">
            <div className="text-nowrap w-fit">
              <h1 className="text-2xl font-bold">Riwayat Transaksi</h1>
              <p className="text-sm text-slate-700">
                Cek Riwayat Transaksi disini!
              </p>
            </div>

            {/* <div className="w-full flex items-center justify-end gap-2">
              <ButtonIcon
                icon={<DocumentTextIcon className="size-5 text-slate-600" />}
                showArrow={false}
                title="Export"
                classNameBtn="border-2 border-slate-400 rounded-lg px-2 py-1"
                titleColor="text-slate-600"
              />
            </div> */}
          </div>
          <hr className="mx-4" />
          <div className="px-4">
            <TableData
              data={historyTransaction}
              showSearchSet={true}
              showDateTime={true}
              showAksi={true}
              showDeleteBtnPerm={true}
              onDelete={handleDelete}
              showDetailBtn={true}
              onDetail={handleDetailClick} // Pass handleDetailClick here
              sortedData={true}
            />
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
