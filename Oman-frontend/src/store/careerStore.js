import { create } from "zustand";
import {
  addCareer,
  deleteCareer,
  editCareer,
  getCareerById,
} from "../api/careerapi";

const useCareerStore = create((set) => ({
  singleCareer: [],

  addCareers: async (data) => {
    await addCareer(data);
  },
  updateCareer: async (id, data) => {
    await editCareer(id, data);
  },
  fetchCareerById: async (id) => {
    const allData = await getCareerById(id);

    set({ singleCareer: allData?.data });
  },
  deleteCareers: async (id) => {
    await deleteCareer(id);
  },
}));

export { useCareerStore };
