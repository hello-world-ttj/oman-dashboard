import { create } from "zustand";
import { getEvents } from "../api/eventapi";
import { getNews } from "../api/newsapi";
import { getMember } from "../api/memberapi";
import { getCareer } from "../api/careerapi";
import { getReport } from "../api/reportapi";
import { getProduct } from "../api/productapi";

const useListStore = create((set, get) => ({
  lists: [],
  totalCount: 0,
  rowPerSize: 10,
  pageNo: 1,
  loading: false,
  coursedetails: [],
  pageInitial: (value) => {
    set({ pageNo: value });
  },
  pageInc: () => {
    const { pageNo, totalCount, rowPerSize } = get();
    const totalPages = Math.ceil(totalCount / rowPerSize);

    if (pageNo < totalPages) {
      set({ pageNo: pageNo + 1 });
    }
  },
  pageDec: () => {
    const { pageNo } = get();
    if (pageNo > 1) {
      set({ pageNo: pageNo - 1 });
    }
  },
  rowChange: (value) => {
    set({ rowPerSize: value });
  },

  fetchEvent: async (filter) => {
    set({ loading: true });
    const allData = await getEvents(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
 


  fetchNews: async (filter) => {
    set({ loading: true });
    const allData = await getNews(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
  fetchProduct: async (filter) => {
    set({ loading: true });
    const allData = await getProduct(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
  fetchMember: async (filter) => {
    set({ loading: true });
    const allData = await getMember(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
  fetchCareer: async (filter) => {
    set({ loading: true });
    const allData = await getCareer(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
  fetchReport: async (filter) => {
    set({ loading: true });
    const allData = await getReport(filter);
    set({ lists: allData?.data || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
  fetchMembers: async (id, filter) => {
    set({ loading: true });
    const allData = await getGroupById(id, filter);
    set({ lists: allData?.data?.participantsData || [] });
    set({ totalCount: allData?.totalCount || 0 });
    set({ loading: false });
  },
 

}));

export { useListStore };
