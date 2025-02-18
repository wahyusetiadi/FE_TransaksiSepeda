import React, { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "../../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../../components/molecules/ButtonIcon";
import { TableData } from "../../../components/organisms/TableData";
import { getAllProductsGrosir } from "../../../api/api";
import { formatCurrency } from "../../../utils";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export const TransactionsGrosir = () => {
  const [barang, setBarang] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [reloadKey, setReloadKey] = useState(0); // State untuk memaksa re-render
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchDataBarang = async () => {
      try {
        const data = await getAllProductsGrosir();
        // console.log("databarang Grosir:", data);
        setBarang(data);
      } catch (error) {
        console.error("Error fetching data barang Grosir:", error);
      }
    };

    fetchDataBarang();
  }, [reloadKey]); // Fetch ulang produk saat reloadKey berubah

  useEffect(() => {
    const hasItems = addedItems.some((item) => item.quantity > 0);
    setShowCheckout(hasItems);
  }, [addedItems]);

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
  const handleIncrease = (item) => {
    setAddedItems((prevItems) => {
      return prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem
      );
    });
  };

  const handleDecrease = (item) => {
    setAddedItems((prevItems) => {
      return prevItems
        .map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity - 1 }
            : prevItem
        )
        .filter((item) => item.quantity > 0);
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
        item.price_grosir && !isNaN(item.price_grosir)
          ? Number(item.price_grosir)
          : 0;
      return total + harga * item.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return addedItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/transaksi/tambah-transaksi-grosir", {
      state: { addedItems },
    });
  };

  return (
    <div>
      <ContentLayout key={reloadKey}>
        <div className="pb-2 mb-12">
          <div className="w-full py-4 px-6 flex max-md:flex-col max-md:gap-2">
            <div className="text-nowrap w-fit">
              <h1 className="text-2xl max-md:text-lg font-bold">
                Transaksi (Grosir)
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
              <div className="w-[276px] h-full max-md:w-[332px] border bg-white rounded-lg fixed bottom-0 left-0 max-md:right-3 flex flex-grow items-start py-4 px-6 max-md:px-2">
                <div className="w-full flex flex-col gap-2 text-start items- justify-start">
                  <div className="w-fit flex flex-col text-nowrap gap-2 max-md:flex-col max-md:items-start max-md:text-xs items-start justify-start">
                    <p className="text-lg font-semibold">Daftar Pesanan</p>
                  </div>
                  <div className="w-full text-[10px] h-[300px] max-h-[300px] mx-2 py-4 overflow-y-auto">
                    <ul>
                      {addedItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center pt-2"
                        >
                          <span className=" w-[250px]">{item.name}</span>
                          <div className="flex items-center">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="w-6 h-6 flex items-center justify-center border  border-orange-600 rounded"
                              disabled={item.quantity <= 0}
                            >
                              <MinusIcon className="text-red-600 size-4" />
                            </button>
                            <span className="mx-2">x{item.quantity}</span>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="w-6 h-6 flex items-center justify-center bg-orange-600 rounded"
                            >
                              <PlusIcon className="text-white size-4" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-1 mt-6">
                    <p>Total</p>
                    <p>({calculateTotalItems()} barang)</p>
                  </div>
                  <div className="">
                    <h1 className="text-2xl max-md:text-lg font-bold text-orange-600">
                      {formatCurrency(calculateTotalPrice())}
                    </h1>
                  </div>
                  <div className="w-full flex flex-col gap-4">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-orange-600 py-3 rounded-full text-white text-sm font-bold"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full border border-orange-600 py-3 rounded-full text-orange-600 text-sm font-bold"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContentLayout>
    </div>
  );
};
