"use client";
import Filters from "@/component/filters/Filters";
import useCart from "@/component/hooks/useCart";
import { Grid } from "@mui/joy";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addItemToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const searchParmData = searchParams.get("filter");
    if (searchParmData) {
      const parsedData = JSON.parse(searchParmData);
      setFilteredProducts(parsedData);
    }
  }, [searchParams]);

  // Helper function to truncate description to 30 words
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  const handleAddToCart = (item) => {
    if (item) {
      addItemToCart(item);
    }
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={2}>
        <Filters category={filteredProducts} filterData={setFilteredProducts} />
      </Grid>
      <Grid item xs={10}>
        <div className="container mx-auto p-5">
          <h1 className="text-3xl font-bold mb-5 text-center">
            Search Results
          </h1>
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-700">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{product.title}</h2>
                    <p className="text-gray-700 mt-2">
                      {truncateDescription(product.description, 30)}
                    </p>
                    <p className="font-bold mt-2">
                      ${product.price.toFixed(2)}
                    </p>

                    <span className="text-sm text-gray-600">
                      Rating: {product.rating.rate} ({product.rating.count}
                      reviews)
                    </span>
                    <div className="flex justify-evenly mt-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            const itemData = JSON.stringify([product]);
                            const encodedData = encodeURIComponent(itemData);
                            router.push(`/payment?items=${encodedData}`);
                          }}
                          className="bg-green-600 text-white px-12 py-2 rounded shadow hover:bg-green-700 transition duration-200"
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}
