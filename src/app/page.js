"use client";
import { Button } from "@mui/joy";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { fetchProducts } from "@/redux/cart";
import { useDispatch, useSelector } from "react-redux";

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
  // const Category products= products.
  const menCategory = products.filter(
    (item) => item.category === "men's clothing"
  );
  const womenCategory = products.filter(
    (item) => item.category === "women's clothing"
  );
  const jawelleryCategory = products.filter(
    (item) => item.category === "jewelery"
  );
  const electronicsCategory = products.filter(
    (item) => item.category === "electronics"
  );
  console.log("menCategory", menCategory);
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
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}
          className="w-full mb-8"
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay every 3 seconds
        >
          <SwiperSlide>
            <img src="/assets/1.webp" alt="Banner 1" width="100%" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/2.webp" alt="Banner 2" width="100%" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/3.webp" alt="Banner 3" width="100%" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/5.webp" alt="Banner 4" width="100%" />
          </SwiperSlide>
        </Swiper>

        <h1 className="text-4xl font-bold mb-6">Welcome to Our Shop</h1>

        {/* Loop through each chunk (carousel) */}
        {productChunks.slice(0, 4).map((productChunk, index) => (
          <div key={index} className="w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4">Winter sale</h2>
            {/* Swiper Carousel */}
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={3}
              className="w-full"
            >
              {productChunk.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold">{product.title}</h2>
                      <p className="text-lg font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <Link href={`/product/${product.id}`}>
                        <Button className="mt-2 inline-block bg-blue-500 text-white hover:bg-blue-600">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}

        {/* Feature Section */}
        <div className="w-full mb-8">
          <h2 className="text-4xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Cards */}
            {[
              "/assets/11.webp",
              "/assets/22.webp",
              "/assets/33.webp",
              "/assets/44.webp",
              "/assets/55.webp",
              "/assets/66.webp",
            ].map((imageSrc, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={imageSrc}
                  alt={`Feature ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">
                    Featured Item {index + 1}
                  </h3>
                  <p className="text-gray-600">
                    Some brief description of the featured item.
                  </p>
                  <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
