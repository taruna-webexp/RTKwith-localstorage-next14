import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  addToCart:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("addToCartItems")) || []
      : [], // Fallback to an empty array if window is undefined
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
        toast.error("Item Already Exists in Cart!");
      } else {
        state.addToCart.push({ ...action.payload, quantity: 1 });
        toast.success("Item Added Successfully!");
      }

      // Safely access localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
      }
    },
    removeAddCart(state, action) {
      if (action.payload) {
        state.addToCart = state.addToCart.filter(
          (item) => item.id !== action.payload
        );
        // Safely access localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "addToCartItems",
            JSON.stringify(state.addToCart)
          );
        }
        toast.success("Item Removed Successfully!");
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
      // Safely access localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
      }
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
      // Safely access localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("addToCartItems", JSON.stringify(state.addToCart));
      }
    },
  },
});

// Export actions
export const { incrementToCart, decrementToCart, setAddCart, removeAddCart } =
  checkOutSlice.actions;

// Export reducer
export default checkOutSlice.reducer;
