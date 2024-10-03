"use client";
import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart";
import useLocalStorageState from "use-local-storage-state";
import useCart from "@/component/hooks/useCart";
import { Button } from "@mui/joy";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useLocalStorageState("cartItems");
  const [coupon, setCoupon] = useState(""); // State for coupon input
  const [discount, setDiscount] = useState(0); // State for applied discount
  const validCoupons = { SAVE10: 10, SAVE20: 20 }; // Example coupon codes and their discounts
  const { cartItems, removeItemToCart, incrementToCart, decrementToCart } =
    useCart();
  const dispatch = useDispatch();
  const handleRemoveItem = (id) => {
    removeItemToCart(id);
    dispatch(setCartItems(cartItems));
  };

  const handleDecrement = (id) => {
    decrementToCart(id);
    dispatch(setCartItems(cartItems));
  };

  const handleIncrement = (id) => {
    incrementToCart(id);
    dispatch(setCartItems(cartItems));
  };

  const handleApplyCoupon = () => {
    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]); // Apply discount based on the coupon
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  let totalPrice = 0;

  cart?.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  const discountedPrice = (totalPrice * (1 - discount / 100)).toFixed(2);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>
      {cart?.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cart?.map((item) => {
            totalPrice = item.price * item.quantity + totalPrice;
            console.log("totalPrice", item.price);
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center"
              >
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" cart-item-images w-full h-40 object-cover rounded mb-4 md:mb-0 md:w-1/6 md:mr-4"
                  />
                </Link>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <Link href={`/product/${item.id}`}>
                      <h2 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h2>

                      <p className="text-lg text-gray-600 mb-4">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-l"
                      >
                        -
                      </button>
                      <span className="py-1 px-3 text-lg">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
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
      <div className="container cart-sticky-price px-2 mt-6">
        <h2 className="text-white text-2xl">
          Total: ${discount > 0 ? discountedPrice : totalPrice.toFixed(2)}
        </h2>
        {discount > 0 && (
          <p className="text-white">Discount applied: {discount}%</p>
        )}
        <Button
          onClick={() => router.push("/payment")} // Use the appropriate router
          className="px-4 py-4 p-2 bg-green-500 text-white rounded"
        >
          Proceed to pay
        </Button>
      </div>
    </div>
  );
};

export default Cart;
