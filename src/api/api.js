import axios from 'axios';

// Menentukan path relatif menuju file data.json yang ada di folder public
const API_URL = '/data.json';
const BASE_URL = import.meta.env.VITE_BASE_URL;


//GET ALL PRODUCTS
export const getAllProducts = async () =>{
  try {
    const response = await axios.get(`${BASE_URL}/products/get-all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw  error;
  }
};
//POST NEW PRODUCT
export const createProducts = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/create`, productData, {
      headers: {
        'Content-Type': 'application/json',  // Pastikan header Content-Type sudah benar
      },
    });

    // Response dari API
    if (response.status === 200) {
      return response.data;  // Data dari response berhasil
    } else {
      throw new Error('Produk gagal dibuat');
    }
  } catch (error) {
    // Tangani error jika terjadi
    throw new Error(error.response?.data?.meta?.message || error.message || 'Terjadi kesalahan');
  }
};
//GET PRODUCTS BY ID
export const getProductData = async(id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    if (response.data.meta.status === 'succes' && response.data.meta.code === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.meta.message);
    }
  }  catch (error) {
    console.error('Error fetching product data: ', error);
    throw error;
  }
}
// //UPDATEPRODUCT BY ID
export const updateProductData = async(id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/products/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;    
  }
};
// POST DELETE PRODUCT DATA
export const deleteProductData = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/delete/${id}`, {       
      isDeleted: true
    });

    console.log('Response Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response ? error.response.data : error.message);
    throw error; 
  }
};
// POST RECOVERY PRODUCT DATA
export const recoveryProductData = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/recovery/${id}`, {       
      isDeleted: false
    });

    console.log('Response Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error.response ? error.response.data : error.message);
    throw error; 
  }
};

// POST TRANSAKSI PRODUCT
export const addTransaction = async (payload) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
};

// GET ALL CUSTOMER DATA
export const getAllCustomerData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/get-all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw  error;
  }
}

// CREATE CUSTOMER DATA

export const createCustomer = async (customersData) => {
  try {
    const response = await axios.post(`${BASE_URL}/customers/create`, customersData, {
      headers: {
        'Content-Type': 'application/json',  // Pastikan header Content-Type sudah benar
      },
    });

    // Response dari API
    if (response.status === 201) {
      return response.data;  // Data dari response berhasil
    } else {
      throw new Error('Customer gagal dibuat');
    }
  } catch (error) {
    // Tangani error jika terjadi
    throw new Error(error.response?.data?.meta?.message || error.message || 'Terjadi kesalahan');
  }
}

// Json Data Dummy
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
//
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
//
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


