import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getReport = async (filter) => {
  try {
    const response = await axiosInstance.get("/report/list", {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getReportById = async (id) => {
  try {
    const response = await axiosInstance.get(`/report/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const editReport = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/report/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const addReport = async (data) => {
  try {
    const response = await axiosInstance.post("/report", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteReport = async (id) => {
  try {
    const response = await axiosInstance.delete(`/report/single/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
