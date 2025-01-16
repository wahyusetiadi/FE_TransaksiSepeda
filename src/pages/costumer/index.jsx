import React from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline";
import { TableData } from "../../components/organisms/TableData";

export const CostumerPage = () => {
  return (
    <div>
      <ContentLayout>
        <div className="px-6 py-4">
          {/* HEAD TITLE */}
          <div className="w-full flex items-center">
            <div className="text-nowrap w-fit">
              <h1 className="text-2xl font-bold">Pelanggan</h1>
              <p className="text-sm text-slate-700">
                Cek Riwayat Pembelian Pelanggan
              </p>
            </div>
            <div className="w-full flex items-center justify-end gap-2">
              <ButtonIcon
                icon={<DocumentTextIcon className="size-5 text-slate-400" />}
                showArrow={false}
                title="Export"
                classNameBtn="border-2 rounded-lg px-2 py-1"
              />
              <ButtonIcon
                icon={<PlusIcon className="size-5 text-white" />}
                showArrow={false}
                title="Tambah Pelanggan"
                classNameBtn="border-2 rounded-lg bg-orange-500 hover:bg-orange-600 px-2 py-1"
                titleColor="text-white"
              />
            </div>
          </div>
          <hr className="my-4"/>

          <div className="">
            <TableData 
            data={[]}
            itemsPerPage={10}
            showSearchSet={true}
            />
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
