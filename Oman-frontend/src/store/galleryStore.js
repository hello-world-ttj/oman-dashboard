import { create } from "zustand";
import { addGallery, deleteGallery, editGallery, getGalleryById } from "../api/galleryapi";

const useGalleryStore = create((set) => ({
  singleGallery: [],

  addGallerys: async (data) => {
    await addGallery(data);
  },
  updateGallery: async (id, data) => {
    await editGallery(id, data);
  },
  fetchGalleryById: async (id) => {
    const allData = await getGalleryById(id);

    set({ singleGallery: allData?.data });
  },
  deleteGallerys: async (id) => {
    await deleteGallery(id);
  },
}));

export { useGalleryStore };
