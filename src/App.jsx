import { useState } from "react";
import "./App.css";
import { Auth } from "./pages/Auth";
import { Transactions } from "./pages/Transactions";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { ItemsPage } from "./pages/items";
import { AddItems } from "./pages/items/AddItems";
import { EditItems } from "./pages/items/EditItems";
import { AddTransactions } from "./pages/Transactions/addTransactions";
import { Payment } from "./pages/Transactions/Payment";
import { CostumerPage } from "./pages/costumer";
import { HistoryTransactions } from "./pages/historyTransactions";
import { DetailHistoryTransactions } from "./pages/historyTransactions/DetailHistoryTransactions";
import { ReportOutbond } from "./pages/ReportOutbond";
import ProtectedLayout from "./layout/ProtectedLayout";
import { StruckTransactions } from "./components/organisms/StruckTransactions";
import PaymentPage from "./pages/historyTransactions/PaymentDetail";

function App() {
  return (
    <div className="bg-slate-100 w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/barang" element={<ItemsPage />} />
            <Route path="/barang/tambah-barang" element={<AddItems />} />
            <Route
              path="/barang/edit-barang/:idBarang"
              element={<EditItems />}
            />
            <Route path="/transaksi" element={<Transactions />} />
            <Route
              path="/transaksi/tambah-transaksi"
              element={<AddTransactions />}
            />
            <Route path="/transaksi/pembayaran" element={<Payment />} />
            <Route path="/cetak-struk" element={<StruckTransactions />} />
            <Route path="/pelanggan" element={<CostumerPage />} />
            <Route
              path="/riwayat-transaksi"
              element={<HistoryTransactions />}
            />
            <Route
              path="/riwayat-transaksi/detail/:id"
              element={<DetailHistoryTransactions />}
            />
            <Route path="/laporan-barang-keluar" element={<ReportOutbond />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
