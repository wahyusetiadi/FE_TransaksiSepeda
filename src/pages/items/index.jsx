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
  const [alert, setAlert] = useState(false);

  const fetchDataBarang = async () => {
    try {
      const data = await getAllProducts();
      setBarang(data);
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
      setLoading(true); // Set loading true sebelum mengambil data
      const data = await fetchDataBarang(); // Ambil data terbaru
      setBarang(data); // Perbarui state barang dengan data yang terbaru
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false); // Set loading false setelah data selesai diambil
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProductData(id);
      if (response.meta.status === "success") {
        await handleUpdate(); // Perbarui data setelah penghapusan
        setAlert(true); // Tampilkan alert sukses
        setTimeout(() => setAlert(false), 3000); // Hapus alert setelah 3 detik
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleRecovery = async (id) => {
    try {
      const response = await recoveryProductData(id);
      if (response.meta.status === "success") {
        await handleUpdate(); // Perbarui data setelah pemulihan
        setAlert(true); // Tampilkan alert sukses
        setTimeout(() => setAlert(false), 3000); // Hapus alert setelah 3 detik
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
