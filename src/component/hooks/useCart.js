"use client";
import { setWishList } from "@/redux/cartSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useLocalStorageState from "use-local-storage-state";

export default function useCart() {
  const [cartItems, setCartItems] = useLocalStorageState("cartItems", {
    defaultValue: [],
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const addItemToCart = (newItem) => {
    const itemExists = cartItems.some((item) => item.id === newItem.id);

    if (itemExists) {
      toast.error("Item already exists in the cart");
    } else {
      // setCartItems((prevItems) => [...prevItems, { ...newItem, quantity: 1 }]);
      toast.success("Item Added Successfully!");
    }
  };

  // const addItemToWishList = (newItem) => {
  //   const itemExists = wishListItems?.some((item) => item.id === newItem.id);

  //   if (itemExists) {
  //     toast.error("Item already exists in the Wishlist");
  //   } else {
  //     // setWishListItems((prevItems) => [
  //     //   ...prevItems,
  //     //   { ...newItem, quantity: 1 },
  //     // ]);
  //     toast.success("Item Added Successfully!");
  //   }
  // };

  const removeItemToCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.success("Item removed successfully!");
  };
  // const removeItemFromWishList = (id) => {
  //   setWishListItems((prevItems) => prevItems.filter((item) => item.id !== id));
  //   toast.success("Item removed successfully!");
  // };

  const decrementToCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const incrementToCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.min(item.quantity + 1, 10);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeAllItems = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  return {
    cartItems,

    addItemToCart,
    totalPrice,
    removeItemToCart,
    removeAllItems,
    incrementToCart,
    decrementToCart,
  };
}
