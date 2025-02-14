import React, { useEffect, useState } from "react";
import {
  ArrowPathIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getAllProductsEceran } from "../../../api/api";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { TableData } from "../../../components/organisms/TableData";

export const TransactionsEceran = () => {
  const [barang, setBarang] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [reloadKey, setReloadKey] = useState(0); // State untuk memaksa re-render
  const navigate = useNavigate();
  const [showListBarang, setShowListBarang] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchDataBarang = async () => {
      try {
        const data = await getAllProductsEceran();
        // console.log("databarang Ecer:", data); 
        setBarang(data);
      } catch (error) {
        console.error("Error fetching data barang:", error);
      }
    };

    fetchDataBarang();
  }, [reloadKey]); // Fetch ulang produk saat reloadKey berubah

  // Show checkout if there are items in the cart
  useEffect(() => {
    const hasItems = addedItems.some((item) => item.quantity > 0);
    setShowCheckout(hasItems);
  }, [addedItems]);

  const handleAddItem = (item) => {
    setAddedItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.id === item.id
      );

      let updatedItems = [...prevItems];

      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = item;
      } else if (item.quantity > 0) {
        updatedItems.push(item);
      }

      // Hapus item dengan quantity 0
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  // Reset cart and hide checkout
  const handleReset = () => {
    setAddedItems([]); // Reset added items
    setShowCheckout(false); // Hide checkout
    setReloadKey((prevKey) => prevKey + 1); // Trigger re-render of ContentLayout by updating reloadKey
  };

  const calculateTotalPrice = () => {
    return addedItems.reduce((total, item) => {
      const harga =
        item.price_ecer && !isNaN(item.price_ecer)
          ? Number(item.price_ecer)
          : 0;
      return total + harga * item.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return addedItems.reduce((total, item) => total + item.quantity, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleCheckout = () => {
    navigate("/transaksi/tambah-transaksi-ecer", {
      state: { addedItems },
    });
  };

  const openList = () => {
    setShowListBarang(true);
  };

  const closeList = () => {
    setShowListBarang(false);
  };

  return (
    <div>
      <ContentLayout key={reloadKey}>
        <div className="pb-2 mb-12">
          <div className="w-full py-4 px-6 flex max-md:flex-col max-md:gap-2">
            <div className="text-nowrap w-fit">
              <h1 className="text-2xl max-md:text-lg font-bold">
                Transaksi (Eceran)
              </h1>
              <p className="text-sm max-md:text-xs text-slate-700">
                Buat Transaksi disini!
              </p>
            </div>

            <div className="w-full flex items-center justify-end gap-2">
              <ButtonIcon
                icon={<ArrowPathIcon className="size-5 text-white" />}
                showArrow={false}
                title="Reset"
                classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
                titleColor="text-white"
                onClick={handleReset} // Reset added items and trigger re-render
              />
            </div>
          </div>

          <hr className="mx-4" />

          <div className="px-6 mb-12">
            <TableData
              itemsPerPage={10}
              data={barang.map((item) => {
                const { quantity, ...itemWithoutQuantity } = item;
                return itemWithoutQuantity;
              })}
              showSearchSet={true}
              showAksi={true}
              showTambahBtn={true}
              onAdd={handleAddItem}
              showAddBtn={true}
              kategoriFilter={true}
              statusFilter={true}
              sortedData={true}
            />
          </div>

          {showCheckout && (
            <div className="w-fit flex justify-end">
              <div className="w-[1000px] h-[100px] max-md:w-[332px] border bg-white rounded-lg fixed bottom-0 right-6 max-md:right-3 flex flex-grow items-center px-6 max-md:px-2">
                <div className="w-full flex gap-2 text-start items- justify-start">
                  <div className="w-full flex text-nowrap gap-2 max-md:flex-col max-md:items-start max-md:text-xs items-center justify-start">
                    <p>Total Pesanan</p>
                    <p>({calculateTotalItems()} barang)</p>
                    <h1 className="text-2xl max-md:text-lg font-bold text-orange-600">
                      {formatCurrency(calculateTotalPrice())}
                    </h1>
                  </div>
                  <div className="w-full text-nowrap text-sm max-h-[90px] mx-2 py-4 overflow-y-auto">
                    <ul className="">
                      {addedItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center"
                        >
                          <span>{item.name}</span>
                          <span>x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <button
                    onClick={openList}
                    className="text-sm text-blue-500 hover:text-blue-800 hover:underline"
                  >
                    Lihat List
                  </button> */}
                </div>
                {showListBarang && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-[450px] p-6 rounded-lg shadow-lg">
                      <div className="w-full flex items-start justify-between">
                        <h3 className="text-xl font-bold mb-1">List Barang</h3>
                        <button onClick={closeList} className="text-gray-600">
                          X
                        </button>
                      </div>
                      <hr className="mb-2" />
                      <div className="w-full max-h-[300px] overflow-y-auto">
                        {" "}
                        {/* Menambahkan max height dan overflow */}
                        <ul className="space-y-2">
                          {addedItems.map((item) => (
                            <li
                              key={item.id}
                              className="flex justify-between items-center"
                            >
                              <span>{item.name}</span>
                              <span>x{item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-fit max-md:w-fit flex flex-grow items-center justify-end">
                  <ButtonIcon
                    title="Checkout"
                    titleColor="text-white font-bold"
                    showArrow={false}
                    classNameBtn="px-16 py-3 max-md:px-4 bg-orange-600 rounded-full"
                    onClick={handleCheckout}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ContentLayout>
    </div>
  );
};
