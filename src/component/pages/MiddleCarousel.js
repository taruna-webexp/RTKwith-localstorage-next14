import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import { Button } from "@mui/joy";

export default function MiddleCarousel({ productChunks }) {
  return productChunks.length > 0 ? (
    <>
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Shop</h1>
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
                    className="w-full object-cover"
                    style={{ height: "300px" }} // Set a fixed height for the images
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
    </>
  ) : (
    <h2 className="text-4xl font-bold mb-6 text-red-600">
      No Products Found <SentimentDissatisfiedIcon fontSize="large" />
    </h2>
  );
}
