import { create } from "zustand";
import { addProduct, deleteProduct, editProduct, getProductById } from "../api/productapi";

const useProductStore = create((set) => ({
  singleProduct: [],

  addProducts: async (data) => {
    await addProduct(data);
  },
  updateProduct: async (id, data) => {
    await editProduct(id, data);
  },
  fetchProductById: async (id) => {
    const allData = await getProductById(id);

    set({ singleProduct: allData?.data });
  },
  deleteProducts: async (id) => {
    await deleteProduct(id);
  },
}));

export { useProductStore };
