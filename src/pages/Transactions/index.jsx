import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getAllProducts, getBarang } from "../../api/api";
import { TableData } from "../../components/organisms/TableData";

export const Transactions = () => {
  const [barang, setBarang] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchDataBarang = async () => {
      try {
        const data = await getAllProducts();
        setBarang(data);
      } catch (error) {
        console.error("Error fetching data barang:", error);
        throw error;
      }
    };

    fetchDataBarang();
  }, []);

  const handleClickCheckout = () => {
    setShowCheckout(true);
  };

  const closeCheckout = () => {
    setShowCheckout(!showCheckout);
  };

  return (
    <div>
      <ContentLayout>
        <div className="w-full py-4 px-6 flex">
          <div className="text-nowrap w-fit">
            <h1 className="text-2xl font-bold">Transaksi</h1>
            <p className="text-sm text-slate-700">Buat Transaksi disini!</p>
          </div>
          <div className="w-full flex items-center justify-end gap-2">
            <ButtonIcon
              icon={<ArrowPathIcon className="size-5 text-white" />}
              showArrow={false}
              title="Transaksi Baru"
              classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
              titleColor="text-white"
              onClick={closeCheckout}
            />
          </div>
        </div>
        <hr className="mx-4" />
        <div className="px-6 mb-12">
          <TableData
            itemsPerPage={10}
            data={barang}
            showSearchSet={true}
            showAksi={true}
            showTambahBtn={true}
            onAdd={handleClickCheckout}
            showAddBtn={true}
          />
        </div>
        {showCheckout && (
          <div className="w-fit flex justify-end">
            <div className="w-[1000px] h-[100px] border bg-white rounded-lg fixed bottom-0 right-6 flex flex-grow items-center px-12">
              <div className="w-full flex text-nowrap gap-2 items-center justify-start">
                <p>Total Pesanan</p>
                <p> ({"1"} barang)</p>
                <h1 className="text-2xl font-bold text-orange-600">
                  {"Rp 5.500.000"}
                </h1>
              </div>
              <div className="w-full flex flex-grow items-center justify-end">
                <ButtonIcon
                  title="Checkout"
                  titleColor="text-white font-bold"
                  showArrow={false}
                  classNameBtn="px-16 py-3 bg-orange-600 rounded-full"
                  linkTo='/transaksi/tambah-transaksi'
                />
                {/* <button className="text-base font-bold px-16 py-3 rounded-full bg-orange-600 text-white">
                  Checkout
                </button> */}
              </div>
            </div>
          </div>
        )}
      </ContentLayout>
    </div>
  );
};
