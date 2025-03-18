import React, { useEffect, useState } from "react";
import { ArrowUpOnSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { TableData } from "../../components/organisms/TableData";
import {
  deleteProductData,
  getAllProductAdmin,
  getAllProducts,
  getAllProductsOwner,
  getUser,
  recoveryProductData,
} from "../../api/api";

export const ItemsPage = () => {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [message, setMessage] = useState("");

  const fetchDataBarang = async () => {
    try {
      const data = await getAllProducts();
      setBarang(data);
      return data;
    } catch (error) {
      console.error("Error fetching barang data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error("Error fetch User Data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUser();
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

  const isAdminBesar = user?.role === "owner";
  const isAdminCabang = user?.role === "admin";

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await deleteProductData(id);
      console.log("delete items", response.meta.status);

      const data = await fetchDataBarang();
      setBarang(data);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setMessage("Barang berhasil dihapus");
      setLoading(false);

      // Menunggu selama 3 detik sebelum menutup pesan
      setTimeout(() => {
        setMessage(""); // Atau sesuai dengan cara untuk menutup pesan
      }, 3000); // 3000 ms = 3 detik
    }
  };

  const handleRecovery = async (id) => {
    try {
      const response = await recoveryProductData(id);
      const data = await fetchDataBarang();
      setBarang(data);
    } catch (error) {
      console.error("Error recovering product:", error);
    } finally {
      setMessage("Barang berhasil dipulihkan");
      setLoading(false);

      setTimeout(() => {
        setMessage(""); // Atau sesuai dengan cara untuk menutup pesan
      }, 3000);
    }
  };

  const handleMessage = () => {
    setMessage("Fitur sedang dalam pengerjaan...");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="">
      <ContentLayout>
        {message && (
          <>
            <div className="w-full mt-4 p-4 fixed bg-green-100 border-l-4 border-green-500 text-green-700">
              <p>{message}</p>
            </div>
          </>
        )}
        <div className="mb-12 pb-6">
          <div className="w-full py-4 px-6 flex max-md:flex-col max-md:gap-2">
            {/* Heading Text */}
            <div className="text-nowrap max-md:text-wrap w-fit">
              <h1 className="text-2xl max-md:text-lg font-bold">
                Jumlah Barang
              </h1>
              <p className="text-sm max-md:text-xs text-slate-700">
                Tambahkan barang atau atur barang kamu disini!
              </p>
            </div>
            {/* Button */}
            <div className="w-full flex items-center justify-end gap-2">
              {isAdminBesar && (
                <ButtonIcon
                  icon={
                    <ArrowUpOnSquareIcon className="size-5 text-slate-400" />
                  }
                  showArrow={false}
                  title="Import"
                  classNameBtn="border-2 rounded-lg px-2 py-1"
                  linkTo={"/import-data"}
                  onClick={handleMessage}
                />
              )}
              {/* 
            <ButtonIcon
              icon={<DocumentTextIcon className="size-5 text-slate-400" />}
              showArrow={false}
              title="Export"
              classNameBtn="border-2 rounded-lg px-2 py-1"
            /> */}
              {/* <ButtonIcon
              icon={<PlusIcon className="size-5 text-white" />}
              showArrow={false}
              title="Buat Kategori"
              classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
              titleColor="text-white"
            /> */}
              {isAdminBesar && !isAdminCabang && (
                <ButtonIcon
                  icon={<PlusIcon className="size-5 text-white" />}
                  showArrow={false}
                  title="Tambah Barang"
                  classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
                  titleColor="text-white"
                  linkTo="/barang/tambah-barang"
                />
              )}
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
              kategoriFilter={true}
              statusFilter={true}
              sortedData={true}
            />
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
