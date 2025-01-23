import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { TableData } from "../../../components/organisms/TableData";
import { useParams } from "react-router-dom";
import { getHistoryTransactionDetail } from "../../../api/api";

export const DetailHistoryTransactions = () => {
  const { id } = useParams();
  const [transactionsDetail, setTransactionsDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          throw new Error('No data received from server');
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setError(error.message || 'Failed to fetch transaction details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTransactionDetails();
    }
  }, [id]);

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
      <div className="p-6">
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
                {transactionsDetail.customer || 'Wahyu Ansari'}
              </h1>
              <hr />
            </div>

            <div className="text-start w-full flex flex-col gap-2">
              <p className="text-slate-600 font-medium text-xs">Kode Transaksi</p>
              <h1 className="text-base font-bold">
                {transactionsDetail.transactionCode || '+6281299887766'}
              </h1>
              <hr />
            </div>

            <div className="text-start w-full flex flex-col gap-2">
              <p className="text-slate-600 font-medium text-xs">Jenis Pembayaran</p>
              <h1 className="text-base font-bold">
                {transactionsDetail.description || 'VIP'}
              </h1>
              <hr />
            </div>

            <div className="text-start w-full flex flex-col gap-2">
              <p className="text-slate-600 font-medium text-xs">Hutang</p>
              <h1 className="text-base font-bold">
                {transactionsDetail.hutang || '-'}
              </h1>
              <hr />
            </div>
          </div>

          <div>
            <div className="text-start">
              <h1 className="text-xl font-bold">Daftar Produk</h1>
            </div>
            {Array.isArray(transactionsDetail) || Array.isArray(transactionsDetail?.items) ? (
              <TableData data={Array.isArray(transactionsDetail) ? transactionsDetail : transactionsDetail.items} />
            ) : (
              <p className="text-center mt-4">No product data available</p>
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};