"use client";
import { useDispatch } from 'react-redux';
import { setCartItems, updateCart } from '@/store/productSlice';
import useLocalStorageState from 'use-local-storage-state';
import React from 'react';
import { productList }  from "../app/components/utils/DummyData"
import useCart from './components/hooks/useCart';
export default function Home() {
  const dispatch = useDispatch();
  
  const { cartItems, addItemToCart, removeItemFromCart } = useCart();

  // Add item to cart and update Redux state
  const handleAddToCart = (item) => {
    addItemToCart(item);
    dispatch(setCartItems(cartItems));
  };
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {productList.map((product) => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
          <img src={product.images} alt={product.title} className="w-full h-68 object-cover" />
          <div className="p-4">
            <h1 className="text-lg font-bold">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-blue-500">${product.price.toFixed(2)}</p>
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
