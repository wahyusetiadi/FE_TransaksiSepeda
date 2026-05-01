import axios from "axios";
import ExcelJS from "exceljs";
import { clearDb, loadDb, saveDb } from "./mockDb";

const API_URL = "/data.json";

const sleep = (ms = 120) => new Promise((r) => setTimeout(r, ms));

const downloadBlob = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const makeAxiosLikeError = (status, message) => {
  const error = new Error(message);
  error.response = { status, data: { message } };
  return error;
};

const okMeta = (code = 200, message = "OK") => ({
  meta: { code, status: "success", message },
});

const nowIso = () => new Date().toISOString();

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const nextId = (db, key) => {
  db.counters[key] = (db.counters[key] || 0) + 1;
  return db.counters[key];
};

const getCurrentUser = (db) => {
  const token = localStorage.getItem("jwtToken") || localStorage.getItem("token");
  if (token && String(token).startsWith("mock-token.")) {
    const [, id] = String(token).split(".");
    const user = db.users.find((u) => String(u.id) === String(id));
    if (user) return user;
  }
  return db.users[0] || null;
};

const findProductOrThrow = (db, id) => {
  const product = db.products.find((p) => String(p.id) === String(id));
  if (!product) throw makeAxiosLikeError(404, "Produk tidak ditemukan");
  return product;
};

const updateProductDerivedFields = (product) => {
  const stock = toNumber(product.stock, 0);
  product.stock = stock;
  if (stock <= 0) {
    product.status = "Tidak Tersedia";
  } else if (!product.status) {
    product.status = "Tersedia";
  }
  product.isDeleted = product.isDeleted ? 1 : 0;
  product.updatedAt = nowIso();
};

// AUTH
export const loginUser = async (username, password) => {
  await sleep();
  const db = await loadDb();

  const user = db.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    throw makeAxiosLikeError(401, "Username atau password salah");
  }

  const token = `mock-token.${user.id}.${Date.now()}`;
  localStorage.setItem("jwtToken", token);
  localStorage.setItem("token", token);

  // Meniru bentuk response yang dipakai di Auth page: response.data adalah token string
  return { data: token };
};

export const getUser = async () => {
  await sleep();
  const db = await loadDb();
  const user = getCurrentUser(db);
  if (!user) throw makeAxiosLikeError(401, "Belum login");

  const safe = { ...user };
  delete safe.password;
  return safe;
};

// PRODUCTS
export const getAllProductsOwner = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.products];
};

export const getAllProducts = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.products];
};

export const getAllProductsEceran = async () => {
  await sleep();
  const db = await loadDb();
  return db.products.filter((p) => p.isDeleted !== 1);
};

export const getAllProductsGrosir = async () => {
  await sleep();
  const db = await loadDb();
  return db.products.filter((p) => p.isDeleted !== 1);
};

export const getAllProductAdmin = async () => {
  await sleep();
  const db = await loadDb();
  return db.products.filter((p) => p.isDeleted !== 1);
};

export const getAllProductTransactions = async () => {
  await sleep();
  const db = await loadDb();
  return db.products.filter((p) => p.isDeleted !== 1);
};

export const createProducts = async (productData) => {
  await sleep();
  const db = await loadDb();

  const id = nextId(db, "product");
  const created = {
    id,
    productCode: String(productData?.productCode || `PRD-${String(id).padStart(4, "0")}`),
    name: String(productData?.name || ""),
    type: String(productData?.type || "SEPEDA"),
    price_ecer: toNumber(productData?.price_ecer, 0),
    price_grosir: toNumber(productData?.price_grosir, 0),
    stock: toNumber(productData?.stock, 0),
    status: String(productData?.status || "Tersedia"),
    isDeleted: productData?.isDeleted ? 1 : 0,
    updatedAt: nowIso(),
  };

  updateProductDerivedFields(created);
  db.products.push(created);
  saveDb(db);

  return { ...okMeta(201, "Produk berhasil dibuat"), data: created };
};

export const getProductData = async (id) => {
  await sleep();
  const db = await loadDb();
  const product = findProductOrThrow(db, id);
  return { ...product };
};

export const updateProductData = async (id, data) => {
  await sleep();
  const db = await loadDb();
  const product = findProductOrThrow(db, id);

  Object.assign(product, {
    name: data?.name ?? product.name,
    status: data?.status ?? product.status,
    price_ecer: data?.price_ecer ?? product.price_ecer,
    price_grosir: data?.price_grosir ?? product.price_grosir,
    stock: data?.stock ?? product.stock,
    type: data?.type ?? product.type,
  });
  updateProductDerivedFields(product);
  saveDb(db);

  return { ...okMeta(200, "Produk berhasil diupdate"), data: { ...product } };
};

export const updateProductDataAdmin = async (id, data) => {
  return updateProductData(id, data);
};

export const updateProductStocByAdmin = async (id, data) => {
  await sleep();
  const db = await loadDb();
  const product = findProductOrThrow(db, id);

  Object.assign(product, {
    stock: data?.stock ?? product.stock,
    status: data?.status ?? product.status,
  });
  updateProductDerivedFields(product);
  saveDb(db);

  return { ...okMeta(200, "Stock berhasil diupdate"), data: { ...product } };
};

export const deleteProductData = async (id) => {
  await sleep();
  const db = await loadDb();
  const product = findProductOrThrow(db, id);
  product.isDeleted = 1;
  product.updatedAt = nowIso();
  saveDb(db);
  return { ...okMeta(200, "Produk berhasil dihapus") };
};

export const recoveryProductData = async (id) => {
  await sleep();
  const db = await loadDb();
  const product = findProductOrThrow(db, id);
  product.isDeleted = 0;
  updateProductDerivedFields(product);
  saveDb(db);
  return { ...okMeta(200, "Produk berhasil dipulihkan") };
};

// TRANSACTIONS
export const addTransaction = async (payload) => {
  return addTransactionNonVip(payload);
};

export const addTransactionNonVip = async (payloadNonVip) => {
  await sleep();
  const db = await loadDb();

  const id = nextId(db, "transaction");
  const transactionCode = String(
    payloadNonVip?.transactionCode || `TRX-${Date.now()}-${id}`
  );

  const items = Array.isArray(payloadNonVip?.items) ? payloadNonVip.items : [];

  // update stock
  for (const item of items) {
    const productId = item?.product_id ?? item?.productId ?? item?.id;
    if (!productId) continue;
    const product = db.products.find((p) => String(p.id) === String(productId));
    if (!product) continue;

    const amount = toNumber(item?.amount, 0);
    product.stock = Math.max(0, toNumber(product.stock, 0) - amount);
    updateProductDerivedFields(product);
  }

  const createdAt = nowIso();
  const date = createdAt;

  const history = {
    id,
    transactionCode,
    customer: String(payloadNonVip?.customer || ""),
    customerId: payloadNonVip?.customerId ?? null,
    total: toNumber(payloadNonVip?.total, 0),
    items: items.map((it) => ({
      product_id: it.product_id,
      amount: toNumber(it.amount, 0),
      total: toNumber(it.total, 0),
    })),
    description: String(payloadNonVip?.description || ""),
    hutang: toNumber(payloadNonVip?.hutang, 0),
    lunas: Boolean(payloadNonVip?.lunas),
    discount: toNumber(payloadNonVip?.discount, 0),
    note: String(payloadNonVip?.note || ""),
    status: payloadNonVip?.lunas ? "Sukses" : "Sukses",
    createdAt: createdAt.slice(0, 10),
    date,
    updatedAt: createdAt,
  };

  db.transactions.push(history);
  db.outbonds.push(history);
  saveDb(db);

  return {
    data: {
      ...okMeta(201, "Transaksi berhasil dibuat"),
      transactionCode,
      id,
    },
  };
};

export const getAllTransactions = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.transactions];
};

// CUSTOMERS
export const getAllCustomerData = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.customers];
};

export const getAllCustomerTransactions = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.customers];
};

export const createCustomer = async (customersData) => {
  await sleep();
  const db = await loadDb();

  const id = nextId(db, "customer");
  const created = {
    id,
    name: String(customersData?.name || ""),
    telp: String(customersData?.telp || ""),
    type: String(customersData?.type || "Regular"),
    nik: String(customersData?.nik ?? "-"),
    npwp: String(customersData?.npwp ?? "-"),
    updatedAt: nowIso(),
  };

  db.customers.push(created);
  saveDb(db);

  return { ...okMeta(201, "Customer berhasil dibuat"), data: created };
};

export const updateCustomerData = async (id, data) => {
  await sleep();
  const db = await loadDb();
  const customer = db.customers.find((c) => String(c.id) === String(id));
  if (!customer) throw makeAxiosLikeError(404, "Customer tidak ditemukan");

  Object.assign(customer, {
    name: data?.name ?? customer.name,
    telp: data?.telp ?? customer.telp,
    type: data?.type ?? customer.type,
    nik: data?.nik ?? customer.nik,
    npwp: data?.npwp ?? customer.npwp,
    updatedAt: nowIso(),
  });

  saveDb(db);
  return { ...okMeta(200, "Customer berhasil diupdate"), data: { ...customer } };
};

export const deleteCustomerData = async (id) => {
  await sleep();
  const db = await loadDb();
  const before = db.customers.length;
  db.customers = db.customers.filter((c) => String(c.id) !== String(id));
  if (db.customers.length === before) throw makeAxiosLikeError(404, "Customer tidak ditemukan");
  saveDb(db);
  return { ...okMeta(200, "Customer berhasil dihapus") };
};

// HISTORY
export const getAllHistoryTransactions = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.transactions];
};

export const getHistoryTransactionDetail = async (id) => {
  await sleep();
  const db = await loadDb();
  const trx = db.transactions.find((t) => String(t.id) === String(id));
  if (!trx) throw makeAxiosLikeError(404, "Transaksi tidak ditemukan");
  return { data: { ...trx } };
};

export const deleteHistoryTransactionsById = async (id) => {
  await sleep();
  const db = await loadDb();
  const before = db.transactions.length;
  db.transactions = db.transactions.filter((t) => String(t.id) !== String(id));
  db.outbonds = db.outbonds.filter((t) => String(t.id) !== String(id));
  if (db.transactions.length === before) throw makeAxiosLikeError(404, "Transaksi tidak ditemukan");
  saveDb(db);
  return { ...okMeta(200, "Transaksi berhasil dihapus") };
};

export const updatePaid = async (id, payload) => {
  await sleep();
  const db = await loadDb();
  const trx = db.transactions.find((t) => String(t.id) === String(id));
  if (!trx) throw makeAxiosLikeError(404, "Transaksi tidak ditemukan");

  trx.lunas = Boolean(payload?.lunas);
  trx.hutang = toNumber(payload?.hutang, trx.hutang);
  trx.updatedAt = nowIso();
  saveDb(db);

  // Meniru pola di halaman detail (kode di sana agak inkonsisten)
  return { success: true, data: { ...okMeta(201, "Update berhasil"), data: trx } };
};

// OUTBOND (untuk demo, pakai data history)
export const addOutbond = async (payloadOutbond) => {
  return addTransactionNonVip(payloadOutbond);
};

export const getAllOutbond = async () => {
  await sleep();
  const db = await loadDb();
  return [...db.outbonds];
};

export const exportOutbond = async (fromDate, toDate) => {
  await sleep(50);
  const db = await loadDb();
  const from = String(fromDate || "");
  const to = String(toDate || "");

  const filtered = db.outbonds.filter((t) => {
    const created = String(t.createdAt || "").slice(0, 10);
    if (!from || !to) return true;
    return created >= from && created <= to;
  });

  const rows = filtered.map((t) => ({
    id: t.id,
    transactionCode: t.transactionCode,
    customer: t.customer,
    total: t.total,
    hutang: t.hutang,
    lunas: t.lunas ? "Lunas" : "Belum Lunas",
    createdAt: t.createdAt,
    note: t.note,
  }));

  const fileName =
    from && to ? `laporan_barang_keluar_${from}_${to}.xlsx` : "laporan_barang_keluar.xlsx";

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan");

  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Kode Transaksi", key: "transactionCode", width: 22 },
    { header: "Pelanggan", key: "customer", width: 24 },
    { header: "Total", key: "total", width: 14 },
    { header: "Hutang", key: "hutang", width: 14 },
    { header: "Status", key: "lunas", width: 14 },
    { header: "Tanggal", key: "createdAt", width: 14 },
    { header: "Catatan", key: "note", width: 30 },
  ];

  worksheet.addRows(rows);
  worksheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  downloadBlob(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    fileName
  );
};

// IMPORT (MOCK)
export const uploadFile = async (formData) => {
  await sleep(250);
  const db = await loadDb();

  const file = formData?.get?.("file");
  if (!file) return { status: 400, data: { message: "File tidak ditemukan" } };

  try {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(arrayBuffer);

    const worksheet = workbook.worksheets[0];
    if (!worksheet) return { status: 400, data: { message: "Sheet Excel kosong" } };

    // Ambil header (row 1) dan data mulai row 2
    const headerRow = worksheet.getRow(1);
    const headers = headerRow.values
      .slice(1)
      .map((h) => String(h || "").trim().toLowerCase());

    const headerIndex = new Map();
    headers.forEach((h, idx) => headerIndex.set(h, idx + 1));

    const getCellByHeader = (row, candidates) => {
      for (const name of candidates) {
        const col = headerIndex.get(name);
        if (col) return row.getCell(col).value;
      }
      return null;
    };

    let imported = 0;

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      const nameRaw =
        getCellByHeader(row, ["name", "nama", "nama barang", "namabarang"]) ??
        row.getCell(1).value;

      const name = String(nameRaw || "").trim();
      if (!name) return;

      const priceEcerRaw =
        getCellByHeader(row, ["price_ecer", "harga_ecer", "ecer", "harga"]) ??
        row.getCell(2).value;

      const priceGrosirRaw =
        getCellByHeader(row, ["price_grosir", "harga_grosir", "grosir"]) ??
        row.getCell(3).value;

      const stockRaw =
        getCellByHeader(row, ["stock", "stok", "qty", "jumlah"]) ??
        row.getCell(4).value;

      const typeRaw =
        getCellByHeader(row, ["type", "tipe", "kategori"]) ??
        row.getCell(5).value;

      const statusRaw =
        getCellByHeader(row, ["status"]) ?? row.getCell(6).value;

      db.counters.product = (db.counters.product || 0) + 1;
      const id = db.counters.product;

      const created = {
        id,
        productCode: `PRD-${String(id).padStart(4, "0")}`,
        name,
        type: String(typeRaw || "SEPEDA").toUpperCase(),
        price_ecer: toNumber(priceEcerRaw, 0),
        price_grosir: toNumber(priceGrosirRaw, 0),
        stock: toNumber(stockRaw, 0),
        status: String(statusRaw || "Tersedia"),
        isDeleted: 0,
        updatedAt: nowIso(),
      };

      updateProductDerivedFields(created);
      db.products.push(created);
      imported += 1;
    });

    saveDb(db);

    return {
      status: 200,
      data: { message: `Import berhasil (mock): ${imported} item` },
    };
  } catch (error) {
    return {
      status: 400,
      data: { message: `Gagal membaca file Excel: ${error?.message || error}` },
    };
  }
};

// RECEIPT
export const getTransactionByCode = async (codeTransaction) => {
  await sleep();
  const db = await loadDb();
  const trx = db.transactions.find(
    (t) => String(t.transactionCode) === String(codeTransaction)
  );
  if (!trx) throw makeAxiosLikeError(404, "Transaksi tidak ditemukan");
  return trx;
};

// Json Data Dummy (fallback file public/data.json)
export const login = async (username, password) => {
  const response = await axios.get(API_URL);
  const users = response.data.users;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    return { success: true, user };
  } else {
    return { success: false, message: "Invalid credentials" };
  }
};

export const getBarang = async () => {
  const response = await axios.get(API_URL);
  return response.data.stokBarang;
};

export const getBarangById = async (idBarang) => {
  const response = await axios.get(API_URL);
  const barang = response.data.stokBarang;
  const barangDetail = barang.find((item) => item.id === parseInt(idBarang));
  if (barangDetail) return barangDetail;
  throw new Error("Barang tidak ditemukan");
};

export const getTransaksi = async () => {
  const response = await axios.get(API_URL);
  if (response.data && response.data.transaksi) return response.data.transaksi;
  throw new Error("Data transaksi tidak ditemukan.");
};

// Optional helper for demo reset
export const __resetMockDb = async () => {
  clearDb();
  await loadDb();
};
