import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  addToCart: JSON.parse(localStorage.getItem("addToCartItems")) || [],
};

export const checkOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddCart(state, action) {
      const existingItem = state.addToCart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        toast.error("Item Removed Successfully!");
      } else {
        state.addToCart.push({ ...action.payload, quantity: 1 });
        toast.success("Item Added Successfully!");
      }

      localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
    },
    removeAddCart(state, action) {
      if (action.payload) {
        state.addToCart.filter((item) => item.id !== action.payload);
        localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
      }
    },

    incrementToCart(state, action) {
      const item = state.addToCart.find(
        (item) => item.id === action.payload.id
      );
      if (item && item.quantity < 10) {
        item.quantity += 1;
      } else {
        toast.error("Maximum quantity reached");
      }
      localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
    },

    decrementToCart(state, action) {
      const item = state.addToCart.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.addToCart = state.addToCart.filter(
            (cartItem) => cartItem.id !== item.id
          );
          toast.error("Item Removed Successfully!");
        }
      }
      localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
    },
  },
});

// Export actions
export const { incrementToCart, decrementToCart, setAddCart, removeAddCart } =
  checkOutSlice.actions;

// Export reducer
export default checkOutSlice.reducer;
