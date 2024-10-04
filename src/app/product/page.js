"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCart from "@/component/hooks/useCart";
import Link from "next/link";
import { fetchProducts } from "@/redux/cart";

const Home = () => {
  const dispatch = useDispatch();
  const { cartItems, addItemToCart } = useCart();

  const products = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatching the thunk to fetch products
  }, [dispatch]);

  if (loading)
    return <div className="text-center mt-10">Loading products...</div>;
  if (error) return <div className="text-center mt-10">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 bg-white"
          >
            <div className="flex justify-center mb-4">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain cursor-pointer"
                />
              </Link>
            </div>
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <Link href={`/product/${product.id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white mb-2 font-semibold py-2 px-4 w-full rounded-md transition-colors duration-300">
                View Details
              </button>
            </Link>
            <button
              onClick={() => addItemToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-full rounded-md transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
