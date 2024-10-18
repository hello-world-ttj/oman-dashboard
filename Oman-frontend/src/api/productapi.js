import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getProduct = async (filter) => {
  try {
    const response = await axiosInstance.get("/product/list", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editProduct = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/product/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addProduct = async (data) => {
  try {
    const response = await axiosInstance.post("/product", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/single/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
