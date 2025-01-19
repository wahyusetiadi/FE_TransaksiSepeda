import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { TableData } from "../../components/organisms/TableData";
import {
  deleteProductData,
  getAllProducts,
  recoveryProductData,
} from "../../api/api";

export const ItemsPage = () => {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: "" });

  const showAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => setAlert({ show: false, message: "" }), 3000);
  };

  const fetchDataBarang = async () => {
    try {
      const data = await getAllProducts();
      setBarang(data);
      return data; // Return data to be used in handleUpdate
    } catch (error) {
      console.error("Error fetching barang data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataBarang();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const data = await fetchDataBarang(); 
      setBarang(data); 
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true); 
    try {
      const response = await deleteProductData(id);
      const data = await fetchDataBarang();
      setBarang(data);
      if (response.meta.status === "success") {
        showAlert("Barang berhasil dihapus");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleRecovery = async (id) => {
    try {
      const response = await recoveryProductData(id);
      const data = await fetchDataBarang();
      setBarang(data);
      if (response.meta.status === "success") {
        showAlert("Barang berhasil dipulihkan");
      }
    } catch (error) {
      console.error("Error recovering product:", error);
    }
  };

  return (
    <div className="">
      <ContentLayout>
        <div className="w-full py-4 px-6 flex">
          {/* Heading Text */}
          <div className="text-nowrap w-fit">
            <h1 className="text-2xl font-bold">Jumlah Barang</h1>
            <p className="text-sm text-slate-700">
              Tambahkan barang atau atur barang kamu disini!
            </p>
          </div>
          {/* Button */}
          <div className="w-full flex items-center justify-end gap-2">
            {/* <ButtonIcon
              icon={<ArrowUpOnSquareIcon className="size-5 text-slate-400" />}
              showArrow={false}
              title="Import"
              classNameBtn="border-2 rounded-lg px-2 py-1"
            />
            <ButtonIcon
              icon={<DocumentTextIcon className="size-5 text-slate-400" />}
              showArrow={false}
              title="Export"
              classNameBtn="border-2 rounded-lg px-2 py-1"
            /> */}
            <ButtonIcon
              icon={<PlusIcon className="size-5 text-white" />}
              showArrow={false}
              title="Buat Kategori"
              classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
              titleColor="text-white"
            />
            <ButtonIcon
              icon={<PlusIcon className="size-5 text-white" />}
              showArrow={false}
              title="Tambah Barang"
              classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
              titleColor="text-white"
              linkTo="/barang/tambah-barang"
            />
          </div>
        </div>
        <hr className="mx-4" />
        {/* Pass the handleEdit and handleDelete functions to TableData */}
        <div className="px-6">
          <TableData
            itemsPerPage={10}
            data={barang}
            showSearchSet={true}
            showAksi={true}
            showEditBtn={true}
            showDeleteBtn={true}
            onRecovery={handleRecovery}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            showRecoveryBtn={true}
          />
        </div>
      </ContentLayout>
    </div>
  );
};
