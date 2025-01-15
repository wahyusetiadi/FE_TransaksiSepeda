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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-slate-100 w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/barang" element={<ItemsPage />} />
          <Route path="/barang/tambah-barang" element={<AddItems />} />
          <Route path="/barang/edit-barang/:idBarang" element={<EditItems />} />
          <Route path="/transaksi" element={<Transactions />} />
          <Route path="/transaksi/tambah-transaksi" element={<AddTransactions />} />
          <Route path="/transaksi/pembayaran" element={<Payment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
