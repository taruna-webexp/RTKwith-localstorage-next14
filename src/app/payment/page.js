// pages/payment.js
"use client";
import React from "react";
import toast from "react-hot-toast";
import useCart from "@/component/hooks/useCart";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const { cartItems, totalPrice, removeItemToCart } = useCart();
  const [paymentMethod, setPaymentMethod] = React.useState("cash"); // Default to Cash on Delivery
  const router = useRouter();

  const handlePayment = () => {
    // Here you can implement the actual payment logic, like calling an API
    // For demonstration, we're just showing a success message
    toast.success(`Payment successful via ${paymentMethod}!`);
    // Clear cart after payment (optional)
    // removeAllItems(); // Implement this function in your useCart if needed
    router.push("/"); // Redirect to the home page or a success page
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Payment Page</h1>
      <h2 className="mt-4">Review Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.title} (x{item.quantity})
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button
              onClick={() => removeItemToCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3 className="mt-4">Total Price: ${totalPrice.toFixed(2)}</h3>

      <h2 className="mt-4">Select Payment Method</h2>
      <div>
        <label>
          <input
            type="radio"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />
          Online Pay
        </label>
        <label className="ml-4">
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
          Cash on Delivery
        </label>
      </div>

      <button
        onClick={handlePayment}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default PaymentPage;
