import { create } from "zustand";

export const useOrder = create((set) => ({
  order: [],
  addOrder: (item, amount) => {
    set((state) => {
      const existingItemIndex = state.order.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].amount += 1;
        return { order: updatedCart };
      } else {
        return { order: [...state.order, { ...item, amount: amount }] };
      }
    });
  },
  deleteFromCart: (item) => {
    set((state) => {
      const existingItemIndex = state.order.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        if (updatedCart[existingItemIndex].amount > 1) {
          updatedCart[existingItemIndex].amount -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }
        return { order: updatedCart };
      }
      return { order: state.order };
    });
  },
  clearCart: () => set({ order: [] }),
}));
