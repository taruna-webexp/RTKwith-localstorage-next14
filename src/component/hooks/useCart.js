"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import useLocalStorageState from "use-local-storage-state";

export default function useCart() {
  const [cartItems, setCartItems] = useLocalStorageState("cartItems", {
    defaultValue: [],
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (newItem) => {
    const itemExists = cartItems.some((item) => item.id === newItem.id);

    if (itemExists) {
      toast.error("Item already exists in the cart");
    } else {
      // Add the new item to the cart
      setCartItems((prevItems) => [...prevItems, { ...newItem, quantity: 1 }]);
      toast.success("Item Added Successfully!");

      // Update the total price
      const newTotalPrice = totalPrice + newItem.price;
      setTotalPrice(newTotalPrice);
    }
  };

  const removeItemToCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    if (itemToRemove) {
      // Remove the item from the cart
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

      // Update the total price
      setTotalPrice(
        (prevPrice) => prevPrice - itemToRemove.price * itemToRemove.quantity
      );

      toast.success("Item removed successfully!");
    }
  };

  const decrementToCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const incrementToCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
          : item
      )
    );
  };

  // In useCart.js
  const removeAllItems = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  return {
    cartItems,
    addItemToCart,
    totalPrice,
    removeItemToCart,
    removeAllItems, // Add this line
    incrementToCart,
    decrementToCart,
  };
}
