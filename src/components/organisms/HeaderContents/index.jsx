import React from "react";
import { ButtonIcon } from "../../molecules/ButtonIcon";
import {
  ArrowUpOnSquareIcon,
  DocumentTextIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export const HeaderContents = ({ headerTitle, totalItems, context }) => {
  return (
    <div className="w-full flex">
      <div className="flex flex-col">
        <div className="flex gap-4">
          <h1 className="text-2xl font-bold">{headerTitle}</h1>
          <div className="flex items-center px-2 text-xs font-bold rounded-full bg-orange-100 text-orange-800">
            {totalItems}
          </div>
        </div>
        <p className="text-sm text-slate-600">{context}</p>
      </div>

      {/* Button */}
      <div className="w-full flex">
        <ButtonIcon
          icon={<ArrowUpOnSquareIcon className="size-6 text-slate-400" />}
          showArrow={false}
          title="Import"
          classNameBtn="border-2 rounded-lg"
        />
        <ButtonIcon
          icon={<ArrowUpOnSquareIcon className="size-6 text-slate-400" />}
          showArrow={false}
          title="Export"
          classNameBtn="border-2 rounded-lg"
        />
        <ButtonIcon
          icon={<ArrowUpOnSquareIcon className="size-6 text-slate-400" />}
          showArrow={false}
          title="Buat Kategori"
          classNameBtn="border-2 rounded-lg"
        />
        <ButtonIcon
          icon={<ArrowUpOnSquareIcon className="size-6 text-slate-400" />}
          showArrow={false}
          title="Tambah Barang"
          classNameBtn="border-2 rounded-lg"
        />
      </div>
    </div>
  );
};
