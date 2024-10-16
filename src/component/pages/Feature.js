import { Button } from "@mui/material";
import React from "react";

export default function Feature() {
  return (
    <div className="w-full mb-8">
      <h2 className="text-4xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="w-full object-cover"
              style={{ height: "300px" }} // Set a fixed height for the images
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                Featured Item {index + 1}
              </h3>
              <p className="text-gray-600">
                Some brief description of the featured item.
              </p>
              <Button
                className="mt-4"
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#1976d2" }} // Customize button color
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
