import axios from 'axios';

// Menentukan path relatif menuju file data.json yang ada di folder public
const API_URL = '/data.json';

// Fungsi untuk mendapatkan data login (users)
export const login = async (username, password) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data.users;
    
    // Mencari user berdasarkan username dan password
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error: ", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan data barang (produk)
export const getBarang = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.stokBarang;
  } catch (error) {
    console.error("Error fetching barang data: ", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan data barang berdasarkan idBarang
export const getBarangById = async (idBarang) => {
  try {
    const response = await axios.get(API_URL); // Mengambil data dari API atau file JSON
    const barang = response.data.stokBarang;
    
    // Mencari barang berdasarkan ID
    const barangDetail = barang.find(item => item.id === parseInt(idBarang)); // Mencocokkan ID
    
    if (barangDetail) {
      return barangDetail; // Mengembalikan barang yang sesuai dengan ID
    } else {
      throw new Error("Barang tidak ditemukan");
    }
  } catch (error) {
    console.error("Error fetching barang data:", error);
    throw error;
  }
};


export const getTransaksi = async () => {
  try {
    const response = await axios.get(API_URL);
    // Memastikan response.data.transaksi ada
    if (response.data && response.data.transaksi) {
      return response.data.transaksi;
    } else {
      throw new Error("Data transaksi tidak ditemukan.");
    }
  } catch (error) {
    console.log("Error fetching data transaksi:", error);
    throw error;    
  }
};

