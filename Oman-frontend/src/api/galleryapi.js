import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getGallery = async (filter) => {
  try {
    const response = await axiosInstance.get("/gallery/list", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getGalleryById = async (id) => {
  try {
    const response = await axiosInstance.get(`/gallery/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editGallery = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/gallery/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addGallery = async (data) => {
  try {
    const response = await axiosInstance.post("/gallery", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteGallery = async (id) => {
  try {
    const response = await axiosInstance.delete(`/gallery/single/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
