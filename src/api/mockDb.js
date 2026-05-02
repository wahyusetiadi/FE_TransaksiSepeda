const STORAGE_KEY = "fts:mockdb:v1";

const getStorage = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage;
};

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const todayYmd = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const toProductType = (kategori) => {
  const label = String(kategori || "").toLowerCase();
  if (label.includes("spare") || label.includes("part")) return "SPAREPART";
  return "SEPEDA";
};

const normalizeProductStatus = (stock, status) => {
  if (Number(stock) <= 0) return "Tidak Tersedia";
  const st = String(status || "").toLowerCase();
  if (st.includes("tidak") || st.includes("habis")) return "Tidak Tersedia";
  return "Tersedia";
};

const defaultSeed = () => ({
  version: 1,
  users: [
    {
      id: 1,
      username: "owner",
      password: "owner",
      name: "Owner Demo",
      email: "owner@demo.local",
      role: "owner",
    },
    {
      id: 2,
      username: "admin",
      password: "admin",
      name: "Admin Demo",
      email: "admin@demo.local",
      role: "admin",
    },
  ],
  products: [
    {
      id: 1,
      productCode: "SP-0001",
      name: "Ban Dalam 26\"",
      type: "SPAREPART",
      price_ecer: 25000,
      price_grosir: 22000,
      stock: 50,
      status: "Tersedia",
      isDeleted: 0,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      productCode: "SP-0002",
      name: "Lampu Sepeda LED",
      type: "SPAREPART",
      price_ecer: 45000,
      price_grosir: 40000,
      stock: 20,
      status: "Tersedia",
      isDeleted: 0,
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      productCode: "SD-0001",
      name: "Sepeda MTB Explorer 500",
      type: "SEPEDA",
      price_ecer: 5500000,
      price_grosir: 5300000,
      stock: 10,
      status: "Tersedia",
      isDeleted: 0,
      updatedAt: new Date().toISOString(),
    },
  ],
  customers: [
    {
      id: 1,
      name: "Budi Santoso",
      telp: "081234567890",
      type: "VIP",
      nik: "-",
      npwp: "-",
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Siti Aisyah",
      telp: "089912345678",
      type: "Regular",
      nik: "-",
      npwp: "-",
      updatedAt: new Date().toISOString(),
    },
  ],
  transactions: [],
  outbonds: [],
  counters: { product: 3, customer: 2, transaction: 0 },
  seededAt: new Date().toISOString(),
  today: todayYmd(),
});

const seedFromPublicDataJson = async () => {
  try {
    const response = await fetch("/data.json", { cache: "no-store" });
    if (!response.ok) return null;

    const json = await response.json();
    const seed = defaultSeed();

    if (Array.isArray(json?.users) && json.users.length > 0) {
      seed.users = json.users.map((u, index) => ({
        id: Number(u.id) || index + 1,
        username: String(u.username || `user${index + 1}`),
        password: String(u.password || "password"),
        name: String(u.nama || u.name || u.username || `User ${index + 1}`),
        email: String(u.email || `${u.username || `user${index + 1}`}@demo.local`),
        role: index === 0 ? "owner" : "admin",
      }));
    }

    if (Array.isArray(json?.stokBarang) && json.stokBarang.length > 0) {
      seed.products = json.stokBarang.map((item, index) => {
        const stock = Number(item.stock ?? item.stok ?? 0);
        const price = Number(item.harga ?? 0);
        const id = Number(item.id) || index + 1;
        return {
          id,
          productCode: String(item.idBarang ?? `PRD-${String(id).padStart(4, "0")}`),
          name: String(item.namaBarang ?? item.name ?? `Produk ${id}`),
          type: toProductType(item.kategori),
          price_ecer: price,
          price_grosir: Math.max(0, Math.round(price * 0.96)),
          stock,
          status: normalizeProductStatus(stock, item.status),
          isDeleted: 0,
          updatedAt: new Date().toISOString(),
        };
      });

      seed.counters.product = seed.products.reduce(
        (acc, p) => Math.max(acc, Number(p.id) || 0),
        0
      );
    }

    return seed;
  } catch {
    return null;
  }
};

export const loadDb = async () => {
  const storage = getStorage();
  if (!storage) return defaultSeed();

  const raw = storage.getItem(STORAGE_KEY);
  if (raw) {
    const parsed = safeJsonParse(raw, null);
    if (parsed?.version === 1) return parsed;
  }

  const seeded = (await seedFromPublicDataJson()) || defaultSeed();
  storage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
};

export const saveDb = (db) => {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const clearDb = () => {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEY);
};

