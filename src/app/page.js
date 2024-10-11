"use client";
import Head from "next/head";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchProducts } from "@/redux/cart";
import { useDispatch, useSelector } from "react-redux";
import Feature from "@/component/pages/Feature";
import BannerCarousel from "@/component/pages/BannerCarousel";
import MiddleCarousel from "@/component/pages/MiddleCarousel";

// Function to chunk the products array into chunks of 5
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export default function App() {
  const dispatch = useDispatch(); // Correct
  const products = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatching the thunk to fetch products
  }, [dispatch]);
  if (loading)
    return <div className="text-center mt-10">Loading products...</div>;
  if (error) return <div className="text-center mt-10">Error: {error}</div>;

  // Chunk the products into groups of 5
  const productChunks = chunkArray(products, 5);
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta
          name="description"
          content="Welcome to our shopping cart website!"
        />
      </Head>

      <main className="flex flex-col items-center p-6">
        {/* Banner Carousel */}
        <BannerCarousel />
        {/* Middle Carousel */}
        <MiddleCarousel productChunks={productChunks} />
        {/* Feature Section */}
        <Feature />
      </main>
    </>
  );
}
