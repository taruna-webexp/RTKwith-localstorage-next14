"use client";
import React, { useEffect, useState } from "react";
import useCart from "@/component/hooks/useCart";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const SingleProduct = ({ params }) => {
  const productId = params.slug;
  const { addItemToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const products = useSelector((state) => state.cart.products);
  const session = useSession();

  useEffect(() => {
    // Fetch product details based on the productId from Redux state
    if (typeof productId === "string") {
      const singleProduct = products.find(
        (item) => item.id.toString() === productId
      );
      if (singleProduct) {
        setProduct(singleProduct);
      } else {
        console.error("Product not found:", productId);
      }
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    // Add product to cart and show success message
    if (product) {
      addItemToCart(product);
      toast.success("Item added to cart!");
    } else {
      toast.error("Product not available");
    }
  };

  const paymentHandler = (product) => {
    // Redirect to signin if not logged in, otherwise to payment page
    if (session.data === null) {
      router.push("/auth/signin");
    } else {
      const itemData = JSON.stringify([product]);
      const encodedData = encodeURIComponent(itemData);
      router.push(`/payment?items=${encodedData}`);
    }
  };

  // Show loading while product details are being fetched
  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-1/2 object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4 mt-16">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4 mt-8">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-8 mt-24">
            <span className="font-bold">Product details: </span>
            {product.description}
          </p>
          <div className="flex">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 mx-4 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
            >
              Add to Cart
            </button>
            <button
              onClick={() => paymentHandler(product)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 mx-4 px-12 rounded-lg shadow-md transition duration-200 ease-in-out"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
