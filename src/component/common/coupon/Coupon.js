"use client";
import React, { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export default function Coupon({ cart }) {
  console.log("CARTTTTTTTTTTT", cart);
  const [coupon, setCoupon] = useState(""); // State for coupon input
  const [totalPrices, setTotalPrice] = useLocalStorageState("totalPrices", {
    defaultValue: [],
  });
  const couponCode = process.env.NEXT_PUBLIC_COUPON_CODE;
  let totalPrice = 0;
  useEffect(() => {
    cart?.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, []);

  const handleApplyCoupon = () => {
    if (coupon) {
      if (coupon === couponCode) {
        alert("same");
      } else {
        alert("not same");
      }
    }
  };

  return (
    <>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Apply Coupon</h2>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border p-2 rounded w-full mt-2"
          placeholder="Enter coupon code"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Apply Coupon
        </button>
      </div>
    </>
  );
}
