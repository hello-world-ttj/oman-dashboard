import { create } from "zustand";
import { addReport, deleteReport, editReport, getReportById } from "../api/reportapi";

const useReportStore = create((set) => ({
  singleReport: [],

  addReports: async (data) => {
    await addReport(data);
  },
  updateReport: async (id, data) => {
    await editReport(id, data);
  },
  fetchReportById: async (id) => {
    const allData = await getReportById(id);

    set({ singleReport: allData?.data });
  },
  deleteReports: async (id) => {
    await deleteReport(id);
  },
}));

export { useReportStore };
