import React, { useState } from "react";
import Logo2 from "../../../assets/logo2.svg";
import {
  ArchiveBoxIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ButtonIcon } from "../../molecules/ButtonIcon";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import './style.css'

export const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };

  return (
    <div className="xl:w-[276px] static h-screen bg-white text-slate-400 p-6 text-lg overflow-y-auto no-scrollbar">
      <div className="sticky top-0 left-0 bg-white">
        <img
          src={Logo2}
          alt="Logo"
          className="xl:w-auto 2xl:max-w-[200px] max-h-[32px] mb-12"
        />
      </div>
      <div className="w-full flex flex-col 2xl:gap-12 xl:gap-6">
        <div className="">
          <h1 className="text-base mb-4">Menu</h1>
          <div className="flex flex-col gap-4">
            <ButtonIcon
              icon={<Squares2X2Icon className="size-6" />}
              title="Dashboard"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              linkTo="/dashboard"
            />
            <ButtonIcon
              icon={<ArchiveBoxIcon className="w-6 h-6" />}
              title="Barang"
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              onClick={toggleDropdown}
              linkTo="/barang"
            />
            {openDropdown && (
              <div className="">
                <ul className="text-sm ml-6">
                  <li className="mb-4">Sepeda Gunung</li>
                  <li className="mb-4">Sepeda BMX</li>
                  <li className="mb-4">Sepeda Anak</li>
                  <li className="mb-4">Sepeda Lipat</li>
                  <li className="mb-4">Sparepart</li>
                  <li className="mb-4">Aksesoris</li>
                </ul>
              </div>
            )}
            <ButtonIcon
              icon={<ShoppingBagIcon className="w-6 h-6" />}
              title="Transaksi"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              linkTo="/transaksi"
            />
            <ButtonIcon
              icon={<UserGroupIcon className="w-6 h-6" />}
              title="Pelanggan"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              linkTo="/pelanggan"
            />
          </div>
        </div>
        <div className="">
          <h1 className="text-base mb-4">Tools</h1>
          <div className="w-full flex flex-col gap-4">
            <ButtonIcon
              icon={<ReceiptPercentIcon className="size-6" />}
              title="Riwayat Transaksi"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
            />
            <ButtonIcon
              icon={<ChartBarIcon className="size-6" />}
              title="Laporan"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
            />
          </div>
        </div>
        <div className="">
          <h1 className="text-base mb-4">Support</h1>
          <div className="w-full flex flex-col gap-4">
            <ButtonIcon
              icon={<Cog6ToothIcon className="size-6" />}
              title="Pengaturan"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
            />
            <ButtonIcon
              icon={
                <ArrowLeftOnRectangleIcon className="size-6 text-red-500" />
              }
              titleColor={"text-red-500"}
              title="Log Out"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              linkTo="/"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
