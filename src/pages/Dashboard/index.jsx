import React, { useEffect, useState } from "react";
import { ContentLayout } from "../../components/organisms/ContentLayout";
import { ButtonIcon } from "../../components/molecules/ButtonIcon";
import { Card } from "../../components/molecules/Card";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { TableData } from "../../components/organisms/TableData";
import { getTransaksi } from "../../api/api";
import './style.css';

export const Dashboard = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const data = await getTransaksi();

        // Proses data transaksi untuk mengelompokkan barang berdasarkan ID Transaksi dan Tanggal
        const groupedData = data.reduce((acc, item) => {
          // Jika sudah ada transaksi dengan idTransaksi dan tanggal yang sama, gabungkan barangnya
          const existingTransaction = acc.find(
            (trans) =>
              trans.idTransaksi === item.idTransaksi &&
              trans.tanggal === item.tanggal
          );

          if (existingTransaction) {
            // Gabungkan barang baru ke transaksi yang sudah ada
            existingTransaction.barang = [
              ...existingTransaction.barang,
              ...item.barang,
            ];
          } else {
            // Jika transaksi belum ada, buat transaksi baru
            acc.push({
              idTransaksi: item.idTransaksi,
              tanggal: item.tanggal,
              pelanggan: item.pelanggan?.nama,
              noTelp: item.pelanggan?.noTelp,
              barang: item.barang,
              jenis: item.jenis,
              alamat: item.alamat,
              pembayaran: item.jenisPembayaran,
              bukti: item.bukti,
              totalTransaksi: item.total_transaksi,
              status: item.status,
            });
          }
          return acc;
        }, []);

        // Menyusun data untuk tabel
        const formattedData = groupedData.flatMap((item) => {
          // Gabungkan nama barang beserta jumlahnya dalam satu kolom
          const barangNames = item.barang
            .map((barang) => `- (${barang.jumlah}x) ${barang.namaBarang}`)
            .join("\n"); // Gabungkan setiap barang menjadi satu string

          const barangNamesList = barangNames.split("\n").map((line, index) => (
            <div key={index}>{line}</div> // Each line gets its own div to break it into lines
          ));
          const totalJumlah = item.barang.reduce(
            (sum, barang) => sum + barang.jumlah,
            0
          );
          const totalHarga = item.barang.reduce(
            (sum, barang) => sum + barang.total_harga,
            0
          );

          return {
            idTransaksi: item.idTransaksi,
            tanggal: item.tanggal,
            pelanggan: item.pelanggan,
            noTelp: item.noTelp,
            barang: barangNamesList, // Gabungkan nama barang dan jumlahnya
            // jumlah: totalJumlah,
            jenis: item.jenis,
            alamat: item.alamat,
            pembayaran: item.pembayaran,
            bukti: item.bukti, 
            total: totalHarga.toLocaleString(), // Total harga
            status: item.status,
          };
        });
        
        const sortedData = formattedData.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

        setTransaksi(sortedData);
      } catch (error) {
        console.error("Error fetching data transaksi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  return (
    <div>
      <ContentLayout>
        <div className="w-full flex px-6 py-4">
          <div className="text-nowrap w-fit">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-slate-700">
              Cek ringkasan penjualan kamu disini!
            </p>
          </div>
          <div className="w-full flex items-center justify-end gap-2">
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
          </div>
        </div>

        <hr className="mx-6" />
        {/* CONTENT */}
        <div className="px-6 py-4 w-full flex gap-4 xl:gap-2 xl:px-4">
          <Card
            title="Total Pendapatan"
            number="Rp. 15.000.000"
            icon={<ArrowTrendingUpIcon className="size-4 text-green-400" />}
            colorPercent="text-green-400"
            percentInfo="12"
            info="dari minggu lalu"
          />
          <Card
            title="Total Transaksi"
            number="60"
            icon={<ArrowTrendingUpIcon className="size-4 text-green-400" />}
            colorPercent="text-green-400"
            percentInfo="15"
            info="dari minggu lalu"
          />
          <Card
            title="Barang Terjual"
            number="86"
            icon={<ArrowTrendingDownIcon className="size-4 text-red-400" />}
            colorPercent="text-red-400"
            percentInfo="8"
            info="dari minggu lalu"
          />
          <Card
            title="Pelanggan Bertambah"
            number="16"
            icon={<ArrowTrendingDownIcon className="size-4 text-red-400" />}
            colorPercent="text-red-400"
            percentInfo="5"
            info="dari minggu lalu"
          />
        </div>

        <div className="w-full flex gap-4 px-6 xl:px-4 xl:gap-2">
          <div className="w-full h-[320px] border-2 rounded-lg"></div>

          <div className="w-full h-[320px] border-2 rounded-lg"></div>
        </div>

        <div className="px-6 py-4 xl:px-4">
          {/* Tampilkan transaksi dalam tabel */}
          <TableData
            data={transaksi}
            itemsPerPage={5}
            showAksi={true}
            showDetailBtn={true}
            showPagination={false}
            showDateTime={true}
          />
        </div>
      </ContentLayout>
    </div>
  );
};
