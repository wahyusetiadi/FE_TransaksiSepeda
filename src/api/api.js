import axios from "axios";

// Menentukan path relatif menuju file data.json yang ada di folder public
const API_URL = "/data.json";
const BASE_URL = import.meta.env.VITE_BASE_URL;

//GET ALL PRODUCTS
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/get-all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
};
//POST NEW PRODUCT
export const createProducts = async (productData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/products/create`,
      productData,
      {
        headers: {
          "Content-Type": "application/json", // Pastikan header Content-Type sudah benar
        },
      }
    );

    // Response dari API
    if (response.status === 201) {
      return response.data; // Data dari response berhasil
    } else {
      throw new Error("Produk gagal dibuat");
    }
  } catch (error) {
    // Tangani error jika terjadi
    throw new Error(
      error.response?.data?.meta?.message ||
        error.message ||
        "Terjadi kesalahan"
    );
  }
};
//GET PRODUCTS BY ID
export const getProductData = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    if (
      response.data.meta.status === "succes" &&
      response.data.meta.code === 200
    ) {
      return response.data.data;
    } else {
      throw new Error(response.data.meta.message);
    }
  } catch (error) {
    console.error("Error fetching product data: ", error);
    throw error;
  }
};
// //UPDATEPRODUCT BY ID
export const updateProductData = async (id, data) => {
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
      isDeleted: true,
    });

    console.log("Response Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// POST RECOVERY PRODUCT DATA
export const recoveryProductData = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/products/recovery/${id}`, {
      isDeleted: false,
    });

    console.log("Response Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// POST TRANSAKSI PRODUCT
export const addTransaction = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/transactions/create`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return { success: true, data: response.data }; // Use response.data here
    } else {
      return { success: false, error: response.data }; // Use response.data here as well
    }
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
};

// GET ALL TRANSACTIONS
export const getAllTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/get-all`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching transactions data', error);
    throw error;    
  }
}

// GET ALL CUSTOMER DATA
export const getAllCustomerData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/get-all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw error;
  }
};

// GET ALL CUSTOMER TRANSACTIONS
export const getAllCustomerTransactions = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customers/transactions/get-all`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer transactions:", error);
    throw error;
  }
};

// CREATE CUSTOMER DATA

export const createCustomer = async (customersData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/customers/create`,
      customersData,
      {
        headers: {
          "Content-Type": "application/json", // Pastikan header Content-Type sudah benar
        },
      }
    );

    // Response dari API
    if (response.status === 201) {
      return response.data; // Data dari response berhasil
    } else {
      throw new Error("Customer gagal dibuat");
    }
  } catch (error) {
    // Tangani error jika terjadi
    throw new Error(
      error.response?.data?.meta?.message ||
        error.message ||
        "Terjadi kesalahan"
    );
  }
};

// GET ALL TRANSACTIONS HISTORY
export const getAllHistoryTransactions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/history/get-all`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products data:", error);
    throw error;
  }
};

// GET DETAIL TRANSACTIONS HISTORI
export const getHistoryTransactionDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/get-detail/${id}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
    
    // Check if we have data in the response
    if (response.status === 304) {
      // If we get a 304, the cached data should still be available in response.data
      return response.data;
    }
    
    if (response.data) {
      return response.data;
    }
    
    throw new Error('No data received from server');
  } catch (error) {
    console.error("Error fetching history transaction details:", error);
    throw error;
  }
};

// CREATE BARANG KELUAR
export const addOutbond = async (payloadOutbond) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/barang-keluar/create`,
      payloadOutbond,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
};

// GET ALL BARANG KELUAR
export const getAllOutbond = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/barang-keluar/get-all`);
    return response.data.data;
  } catch(error) {
    console.error("Error fetching all outbond", error);
    throw error;
  }
}


// EXPORT BARANG KELUAR
export const exportOutbond = async (fromDate, toDate) => {
  try {
    let url = `${BASE_URL}/barang-keluar/export?createdAt=`;

    if (fromDate) {
      url += `&fromDate=${fromDate}`;
    }
    if (toDate) {
      url += `&toDate=${toDate}`;
    }

    // Ensure the response type is 'blob' to handle binary data
    const response = await axios.get(url, { responseType: 'blob' });

    // Create a Blob from the response data
    const fileUrl = window.URL.createObjectURL(new Blob([response.data]));

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;

    // Set the download file name
    link.download = fromDate && toDate
      ? `barang_keluar_${fromDate}_${toDate}.xlsx`
      : fromDate
      ? `barang_keluar_${fromDate}.xlsx`
      : `barang_keluar.xlsx`;

    // Append the link to the body and trigger a click to start download
    document.body.appendChild(link);
    link.click();

    // Remove the link after downloading
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error exporting outbond data:", error);
    throw error;
  }
};
// Json Data Dummy
// Fungsi untuk mendapatkan data login (users)
export const login = async (username, password) => {
  try {
    const response = await axios.get(API_URL);
    const users = response.data.users;

    // Mencari user berdasarkan username dan password
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

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
    const barangDetail = barang.find((item) => item.id === parseInt(idBarang)); // Mencocokkan ID

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
