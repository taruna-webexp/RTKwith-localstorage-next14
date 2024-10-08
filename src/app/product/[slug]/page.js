"use client";
// pages/product/[id].js
import React, { useEffect, useState } from "react";
import useCart from "@/component/hooks/useCart";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { productData } from "@/component/data/apiData";

const SingleProduct = ({ params }) => {
  const productId = params.slug;
  const { addItemToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productData.length > 0) {
      const singleProduct = productData.find((item) => item.id == productId);
      if (singleProduct) {
        setProduct(singleProduct);
      }
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItemToCart(product);
    }
  };

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-1/2 object-contain rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 mt-16">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4 mt-8">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-8 mt-24">
            <span className="font-bold">Product details : </span>
            {product.description}
          </p>
          <div className="flex-1">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3  mx-4 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.push("/payment")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 mx-4 px-12 rounded-lg shadow-md transition duration-200 ease-in-out"
            >
              Buy
            </button>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
