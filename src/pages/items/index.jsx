import React, { useEffect, useState } from "react";
import {
  ArrowUpOnSquareIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { SearchSet } from "../../components/organisms/SearchSet";
import { TableData } from "../../components/organisms/TableData";
import { getBarang } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const ItemsPage = () => {
  const [barang, setBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBarang, setSelectedBarang] = useState({
    namaBarang: "",
    captionBarang: "",
    hargaBarang: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataBarang = async () => {
      try {
        const data = await getBarang();
        setBarang(data);
      } catch (error) {
        console.error("Error fetching barang data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataBarang();
  }, []);

  const handleEdit = (id) => {
    // Implement the edit action (e.g., show an edit modal, update state, or redirect)
    const item = barang.find((barangItem) => barangItem.id === id);
    if (item) {
      setSelectedBarang({
        namaBarang: item.namaBarang,
        captionBarang: item.deskripsi,
        hargaBarang: item.harga,
      });
      console.log("Selected Item for edit:", item);
    }
  };

  const handleDelete = (id) => {
    const item = barang.find((barangItem) => barangItem.id === id);
    if (item) {
      setSelectedBarang({
        namaBarang: item.namaBarang,
        captionBarang: item.deskripsi,
        hargaBarang: item.harga,
      });
    }
    // Implement the delete action (e.g., show a confirmation modal, delete item, or make API call)
    console.log("Delete item with id:", id);
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
            <ButtonIcon
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
            />
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
              linkTo='/barang/tambah-barang'
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
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </ContentLayout>
    </div>
  );
};
