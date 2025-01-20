import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getAllProducts } from "../../api/api";
import { TableData } from "../../components/organisms/TableData";
import { useNavigate } from "react-router-dom";

export const Transactions = () => {
  const [barang, setBarang] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchDataBarang = async () => {
      try {
        const data = await getAllProducts();
        console.log("databarang:", data);
        setBarang(data);
      } catch (error) {
        console.error("Error fetching data barang:", error);
      }
    };

    fetchDataBarang();
  }, []);

  // Show checkout if there are items in the cart
  useEffect(() => {
    // Show checkout only if there are items with quantity > 0
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
          // Remove item if quantity is 0
          updatedItems.splice(existingItemIndex, 1);
        } else {
          // Update quantity
          updatedItems[existingItemIndex] = item;
        }
        return updatedItems;
      } else if (item.quantity > 0) {
        // Add new item only if quantity > 0
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  // Reset cart and hide checkout
  const handleReset = () => {
    setAddedItems([]);
    setShowCheckout(false);
  };

  // Calculate total price of the added items
  const calculateTotalPrice = () => {
    return addedItems.reduce((total, item) => {
      const harga = item.price && !isNaN(item.price) ? Number(item.price) : 0;
      return total + harga * item.quantity;
    }, 0);
  };

  const calculateTotalItems = () => {
    return addedItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Format the price to currency format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // Handle checkout button click and navigate to addTransaction
  const handleCheckout = () => {
    console.log(
      "Navigating to /transaksi/tambah-transaksi with addedItems:",
      addedItems
    );

    // Navigate to /transaksi/tambah-transaksi with addedItems state
    navigate("/transaksi/tambah-transaksi", {
      state: { addedItems }, // Passing addedItems to the destination page
    });
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
              onClick={handleReset} // Reset added items
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
          />
        </div>

        {showCheckout && (
          <div className="w-fit flex justify-end">
            <div className="w-[1000px] h-[100px] border bg-white rounded-lg fixed bottom-0 right-6 flex flex-grow items-center px-12">
              <div className="w-full flex text-nowrap gap-2 items-center justify-start">
                <p>Total Pesanan</p>
                <p>({calculateTotalItems()} barang)</p>
                <h1 className="text-2xl font-bold text-orange-600">
                  {formatCurrency(calculateTotalPrice())}
                </h1>
              </div>

              <div className="w-full flex flex-grow items-center justify-end">
                <ButtonIcon
                  title="Checkout"
                  titleColor="text-white font-bold"
                  showArrow={false}
                  classNameBtn="px-16 py-3 bg-orange-600 rounded-full"
                  onClick={handleCheckout}
                />
              </div>
            </div>
          </div>
        )}
      </ContentLayout>
    </div>
  );
};
