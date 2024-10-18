import { create } from "zustand";
import {
  addMember,
  deleteMember,
  editMember,
  getMemberById,
} from "../api/memberapi";

const useMemberStore = create((set) => ({

  member: [],
  loading: false,


  addMembers: async (data) => {
    await addMember(data);
  },
  deleteMembers: async (id) => {
    await deleteMember(id);
  },
  fetchMemberById: async (id) => {
    set({ loading: true });
    const allData = await getMemberById(id);
    set({ member: allData?.data || [] });
    set({ loading: false });
  },
  updateMember: async (id, data) => {
    await editMember(id, data);
  },

}));

export { useMemberStore };
