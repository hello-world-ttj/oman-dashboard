import { toast } from "react-toastify";
import axiosInstance from "./axiosintercepter";

export const getMember = async (filter) => {
  try {
    const response = await axiosInstance.get(`/user/list`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
export const getSingleUser = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addMember = async (data) => {
  try {
    const response = await axiosInstance.post("/user", data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getMemberById = async (id) => {
  try {
    const response = await axiosInstance.get(`/user/single/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteMember = async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/single/${id}`);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const editMember = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/user/single/${id}`, data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};


