import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getCareer = async (filter) => {
  try {
    const response = await axiosInstance.get("/career/list", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getCareerById = async (id) => {
  try {
    const response = await axiosInstance.get(`/career/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editCareer = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/career/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addCareer = async (data) => {
  try {
    const response = await axiosInstance.post("/career", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteCareer = async (id) => {
  try {
    const response = await axiosInstance.delete(`/career/single/${id}`);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
  }
};
