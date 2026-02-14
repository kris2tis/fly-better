import { create } from "zustand";

export const useModal = create((set) => ({
  isOpen: false,
  type: null,

  openModal: (type) =>
    set({
      isOpen: true,
      type,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
    })}
));
