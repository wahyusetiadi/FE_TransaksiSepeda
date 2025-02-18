import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getAllProducts, getAllProductTransactions } from "../../api/api";
import { TableData } from "../../components/organisms/TableData";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils";

export const Transactions = () => {
  const [barang, setBarang] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [reloadKey, setReloadKey] = useState(0); // State untuk memaksa re-render
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchDataBarang = async () => {
      try {
        const data = await getAllProductTransactions();
        console.log("databarang:", data);
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

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        if (item.quantity === 0) {
          updatedItems.splice(existingItemIndex, 1);
        } else {
          updatedItems[existingItemIndex] = item;
        }
        return updatedItems;
      } else if (item.quantity > 0) {
        return [...prevItems, item];
      }
      return prevItems;
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
      const harga = item.price && !isNaN(item.price) ? Number(item.price) : 0;
      return total + harga * item.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return addedItems.reduce((total, item) => total + item.quantity, 0);
  };



  const handleCheckout = () => {
    navigate("/transaksi/tambah-transaksi", {
      state: { addedItems },
    });
  };

  return (
    <div>
      <ContentLayout key={reloadKey}>
        <div className="pb-2 mb-12">
          <div className="w-full py-4 px-6 flex max-md:flex-col max-md:gap-2">
            <div className="text-nowrap w-fit">
              <h1 className="text-2xl max-md:text-lg font-bold">Transaksi</h1>
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
              <div className="w-[1000px] h-[100px] max-md:w-[332px] border bg-white rounded-lg fixed bottom-0 right-6 max-md:right-3 flex flex-grow items-center px-12 max-md:px-2">
                <div className="w-full flex text-nowrap gap-2 max-md:flex-col max-md:items-start max-md:text-xs items-center justify-start">
                  <p>Total Pesanan</p>
                  <p>({calculateTotalItems()} barang)</p>
                  <h1 className="text-2xl max-md:text-lg font-bold text-orange-600">
                    {formatCurrency(calculateTotalPrice())}
                  </h1>
                </div>
                <div className="w-full max-h-32 overflow-y-auto">
                  <ul className="space-y-2">
                    {addedItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full max-md:w-fit flex flex-grow items-center justify-end">
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
