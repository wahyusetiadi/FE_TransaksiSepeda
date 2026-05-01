import * as real from "./api.real";
import * as mock from "./api.mock";

const shouldUseMock = () => {
  const flag = import.meta.env.VITE_USE_MOCK;
  if (flag === "true") return true;
  if (flag === "false") return false;

  const baseUrl = import.meta.env.VITE_BASE_URL;
  return !baseUrl;
};

const api = shouldUseMock() ? mock : real;

export const loginUser = (...args) => api.loginUser(...args);
export const getUser = (...args) => api.getUser(...args);

export const getAllProductsOwner = (...args) => api.getAllProductsOwner(...args);
export const getAllProducts = (...args) => api.getAllProducts(...args);
export const getAllProductsEceran = (...args) => api.getAllProductsEceran(...args);
export const getAllProductsGrosir = (...args) =>
  api.getAllProductsGrosir(...args);
export const getAllProductAdmin = (...args) => api.getAllProductAdmin(...args);
export const getAllProductTransactions = (...args) =>
  api.getAllProductTransactions(...args);

export const createProducts = (...args) => api.createProducts(...args);
export const getProductData = (...args) => api.getProductData(...args);
export const updateProductData = (...args) => api.updateProductData(...args);
export const updateProductDataAdmin = (...args) =>
  api.updateProductDataAdmin(...args);
export const updateProductStocByAdmin = (...args) =>
  api.updateProductStocByAdmin(...args);
export const deleteProductData = (...args) => api.deleteProductData(...args);
export const recoveryProductData = (...args) => api.recoveryProductData(...args);

export const addTransaction = (...args) => api.addTransaction(...args);
export const addTransactionNonVip = (...args) =>
  api.addTransactionNonVip(...args);
export const getAllTransactions = (...args) => api.getAllTransactions(...args);

export const getAllCustomerData = (...args) => api.getAllCustomerData(...args);
export const getAllCustomerTransactions = (...args) =>
  api.getAllCustomerTransactions(...args);
export const createCustomer = (...args) => api.createCustomer(...args);
export const updateCustomerData = (...args) => api.updateCustomerData(...args);
export const deleteCustomerData = (...args) => api.deleteCustomerData(...args);

export const getAllHistoryTransactions = (...args) =>
  api.getAllHistoryTransactions(...args);
export const getHistoryTransactionDetail = (...args) =>
  api.getHistoryTransactionDetail(...args);
export const deleteHistoryTransactionsById = (...args) =>
  api.deleteHistoryTransactionsById(...args);
export const updatePaid = (...args) => api.updatePaid(...args);

export const addOutbond = (...args) => api.addOutbond(...args);
export const getAllOutbond = (...args) => api.getAllOutbond(...args);
export const exportOutbond = (...args) => api.exportOutbond(...args);

export const uploadFile = (...args) => api.uploadFile(...args);
export const getTransactionByCode = (...args) => api.getTransactionByCode(...args);

// Json Data Dummy (tetap tersedia untuk kompatibilitas)
export const login = (...args) => api.login(...args);
export const getBarang = (...args) => api.getBarang(...args);
export const getBarangById = (...args) => api.getBarangById(...args);
export const getTransaksi = (...args) => api.getTransaksi(...args);

