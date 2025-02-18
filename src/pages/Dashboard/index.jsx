import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { Card } from "../../components/molecules/Card";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { TableData } from "../../components/organisms/TableData";
import {
  getAllCustomerData,
  getAllHistoryTransactions,
  getAllOutbond,
  getAllProductAdmin,
  getAllProducts,
  getAllTransactions,
  getTransaksi,
  getUser,
} from "../../api/api";
import "./style.css";
import {
  ArchiveBoxIcon,
  ChartBarIcon,
  ReceiptPercentIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [barang, setBarang] = useState([]);
  const [countBarang, setCountBarang] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [countTransactions, setCountTransactions] = useState();
  const [customer, setCustomer] = useState([]);
  const [countCustomer, setCountCustomer] = useState(0);
  const [history, setHistory] = useState([]);
  const [countHistory, setCounthistory] = useState(0);
  const [outbond, setOutbond] = useState([]);
  const [countOutbond, setCountOutbond] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        // console.log("Data User:", userData);
      } catch (error) {
        console.error("Error get User Data:", error);
        throw error;
      }
    };

    const fetchDataBarang = async () => {
      try {
        const data = await getAllProducts();
        setBarang(data);
        setCountBarang(data.length);
        // console.log("setBarang", data);
        // console.log("setCountBarang", data.length);
      } catch (error) {
        console.error("Error fetching all product", error);
      }
    };

    const fetchDataTransaksi = async () => {
      try {
        const data = await getAllTransactions();
        setTransactions(data);
        setCountTransactions(data.length);
        // console.log("setTransactions", data);
        // console.log("setCountTransactions", data.length);
      } catch (error) {
        console.error("Error fetching all transactions", error);
      }
    };

    const fetchDataPelanggan = async () => {
      try {
        const data = await getAllCustomerData();
        setCustomer(data);
        setCountCustomer(data.length);
        // console.log('setCustomer', data);
        // console.log("setCountCustomer", data.length);
      } catch (error) {
        console.error("Error fetching all customer data", error);
        throw error;
      }
    };

    const fetchDataHistoryTransaksi = async () => {
      try {
        const data = await getAllHistoryTransactions();
        setHistory(data);
        setCounthistory(data.length);
        // console.log("setHistory", data);
        // console.log("setCountHistory", data.length);
      } catch (error) {
        console.error("Error fetching all transactions history", error);
        throw error;
      }
    };

    const fetchDataBarangKeluar = async () => {
      try {
        const data = await getAllHistoryTransactions();
        setOutbond(data);
        setCountOutbond(data.length);
        // console.log("barang keluar", data);
        // console.log("setCountOutBond", data.length);
      } catch (error) {
        console.error("Error fetching all outbond", error);
        throw error;
      }
    };

    fetchUser();
    fetchDataBarangKeluar();
    fetchDataHistoryTransaksi();
    fetchDataPelanggan();
    fetchDataTransaksi();
    fetchDataBarang();
  }, []);

  const isAdminBesar = user?.role === "owner";
  const isAdminCabang = user?.role === "admin";

  return (
    <div>
      <ContentLayout>
        <div className="mb-12">
          <div className="w-full flex px-6 py-4">
            <div className="text-nowrap max-md:text-wrap w-fit">
              <h1 className="text-2xl max-md:text-lg font-bold ">Dashboard</h1>
              <p className="text-sm max-md:text-xs text-slate-700">
                Cek ringkasan penjualan kamu disini!
              </p>
            </div>
            {/* <div className="w-full flex items-center justify-end gap-2">
            <ButtonIcon
              showArrow={false}
              title="Sehari"
              classNameBtn="border-2 rounded-lg focus:bg-orange-500 focus:text-white focus:border-orange-500 px-2 py-1"
            />
            <ButtonIcon
              showArrow={false}
              title="Seminggu"
              classNameBtn="border-2 rounded-lg focus:bg-orange-500 focus:text-white focus:border-orange-500 px-2 py-1"
            />
            <ButtonIcon
              showArrow={false}
              title="Sebulan"
              classNameBtn="border-2 rounded-lg focus:bg-orange-500 focus:text-white focus:border-orange-500 px-2 py-1"
            />
            <ButtonIcon
              showArrow={false}
              title="Setahun"
              classNameBtn="border-2 rounded-lg focus:bg-orange-500 focus:text-white focus:border-orange-500 px-2 py-1"
            />
          </div> */}
          </div>

          <hr className="mx-6" />
          {/* CONTENT */}
          <div className="px-6 py-2 w-full grid grid-cols-2 max-md:grid-cols-1 gap-4 text-nowarp text-slate-700">
            {isAdminBesar &&
              !isAdminCabang && (
                <>
                  <Link to="/barang">
                    <div className="w-full px-4 py-2 items-start flex flex-col gap-2 border rounded-lg bg-orange-100 hover:bg-orange-200">
                      <h1 className="text-base font-bold">Data Barang</h1>
                      <ArchiveBoxIcon className="text-orange-600 size-8" />
                      <h1 className="text-sm font-bold">{`${countBarang} item`}</h1>
                    </div>
                  </Link>
                </>
              )}
            <div className="w-full px-4 py-2 items-start flex flex-col gap-2 border rounded-lg bg-orange-100 hover:bg-orange-200">
              <h1 className="text-base font-bold">Transaksi</h1>
              <ShoppingBagIcon className="text-orange-600 size-8" />
              <h1 className="text-sm font-bold">{`${countTransactions} Transaksi`}</h1>
            </div>
            <Link to="/pelanggan">
              <div className="w-full px-4 py-2 items-start flex flex-col gap-2 border rounded-lg bg-orange-100 hover:bg-orange-200">
                <h1 className="text-base font-bold">Pelanggan</h1>
                <UserGroupIcon className="text-orange-600 size-8" />
                <h1 className="text-sm font-bold">{`${countCustomer} Pelanggan`}</h1>
              </div>
            </Link>
            <Link to="/riwayat-transaksi">
              <div className="w-full px-4 py-2 items-start flex flex-col gap-2 border rounded-lg bg-orange-100 hover:bg-orange-200">
                <h1 className="text-base font-bold">Riwayat Transaksi</h1>
                <ReceiptPercentIcon className="text-orange-600 size-8" />
                <h1 className="text-sm font-bold">{`${countHistory} Riwayat Transaksi`}</h1>
              </div>
            </Link>
            <Link to="/laporan-barang-keluar">
              <div className="w-full px-4 py-2 items-start flex flex-col gap-2 border rounded-lg bg-orange-100 hover:bg-orange-200">
                <h1 className="text-base font-bold">Laporan Barang Keluar</h1>
                <ChartBarIcon className="text-orange-600 size-8" />
                <h1 className="text-sm font-bold">{`${countOutbond} Laporan Barang Keluar`}</h1>
              </div>
            </Link>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
