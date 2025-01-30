import React, { useState } from "react";
import Logo2 from "../../../assets/logo2.svg";
import Logo from "../../../assets/logo.svg";

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
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

export const SideBar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for the burger menu

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the burger menu
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="xl:w-[276px] lg:w-[200px] fixed lg:static h-screen bg-white text-slate-400 p-6 text-lg overflow-y-auto no-scrollbar">
      <div className="sticky top-0 left-0 bg-white">
        {/* Logo for large screens, switches between Logo2 and Logo based on isOpen */}
        <img
          src={isOpen ? Logo : Logo2}
          alt="Logo"
          className="hidden lg:block xl:w-auto 2xl:max-w-[200px] max-h-[32px] mb-12"
        />
        <button className="lg:hidden" onClick={toggleSidebar}>
          <img
            src={isOpen ? Logo2 : Logo}
            alt="Logo"
            className="lg:hidden xl:w-auto 2xl:max-w-[200px] max-h-[32px] mb-12"
          />
        </button>
      </div>

      {/* Burger Menu Button for small screens */}
      {/* <button
        className="lg:hidden text-black focus:outline-none relative"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button> */}

      {/* Sidebar Content */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block w-full flex flex-col 2xl:gap-12 xl:gap-6`}
      >
        <div className="">
          <h1 className="text-base mb-4">Menu</h1>
          <div className="flex flex-col gap-4">
            <ButtonIcon
              icon={<Squares2X2Icon className="size-6" />}
              title="Dashboard"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              // linkTo="/dashboard"
              linkTo='/'
            />
            <ButtonIcon
              icon={<ArchiveBoxIcon className="w-6 h-6" />}
              title="Barang"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
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
            <ButtonIcon
              icon={<ReceiptPercentIcon className="size-6" />}
              title="Riwayat Transaksi"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              linkTo="/riwayat-transaksi"
            />
            <ButtonIcon
              icon={<ChartBarIcon className="size-6" />}
              title="Laporan Barang Keluar"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              linkTo="/laporan-barang-keluar"
            />
            <ButtonIcon
              icon={
                <ArrowLeftOnRectangleIcon className="size-6 text-red-500" />
              }
              titleColor={"text-red-500"}
              title="Log Out"
              showArrow={false}
              classNameBtn="focus:bg-orange-200 focus:text-orange-600 hover:bg-orange-200 hover:text-orange-600 px-2 py-1"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
