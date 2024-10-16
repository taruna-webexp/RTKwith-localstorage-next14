"use client";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorageState from "use-local-storage-state";
import useCart from "@/component/hooks/useCart";
import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Coupon from "@/component/common/coupon/Coupon";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  decrementToCart,
  incrementToCart,
  removeAddCart,
  setAddCart,
} from "@/redux/checkOutSlice";

const Cart = () => {
  const router = useRouter();
  const session = useSession(); //  check user authentication
  const dispatch = useDispatch();

  // Local state for storing total price and cart items in localStorage
  const [totalPrices, setTotalPrice] = useLocalStorageState("totalPrices", {
    defaultValue: 0,
  });
  const cart = useSelector((state) => state.checkout.addToCart);

  // Coupon code state
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Custom hook for managing cart items

  // useEffect to recalculate total price whenever the cart changes
  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice); // Update the total price in localStorage
  }, [cart]);

  // Function to item remove from the cart
  const handleRemoveItem = (item) => {
    dispatch(removeAddCart(item)); // Update Redux store with new cart items
  };

  // Decrement item quantity in the cart
  const handleDecrement = (item) => {
    dispatch(decrementToCart(item));
  };

  // Increment item quantity in the cart
  const handleIncrement = (item) => {
    dispatch(incrementToCart(item));
  };

  // Coupon code for discount logic
  const couponCode = process.env.NEXT_PUBLIC_COUPON_CODE;

  //  Total price for all items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  setTotalPrice(totalPrice);

  // Apply coupon logic for discount
  const handleApplyCoupon = () => {
    if (coupon) {
      if (coupon === couponCode && totalPrices >= 100) {
        const priceDiscount = totalPrices - 50; // Apply $50 discount if criteria met
        setDiscount(priceDiscount);
        toast.success("Coupon added successfully");
      } else {
        toast.error("Invalid coupon code");
        setDiscount(0); // Reset discount if invalid coupon
      }
    }
  };

  // Payment handler function to
  const paymentHandler = (cartItems) => {
    if (session.data === null) {
      router.push("/auth/signin"); // Redirect to sign-in if user is not logged in
    } else {
      const itemData = JSON.stringify(cartItems);
      const encodedData = encodeURIComponent(itemData); // Encode data for URL
      router.push(`/payment?items=${encodedData}`); // Redirect to payment page
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center"
              >
                {/* Link to product page */}
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item?.images || item?.image}
                    alt={item.title}
                    className="cart-item-images w-full h-40 object-cover rounded mb-4 md:mb-0 md:w-1/6 md:mr-4"
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
                      {/* Decrement quantity */}
                      <button
                        onClick={() => handleDecrement(item)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-l"
                      >
                        -
                      </button>
                      <span className="py-1 px-3 text-lg">{item.quantity}</span>
                      {/* Increment quantity */}
                      <button
                        onClick={() => handleIncrement(item)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-1 px-2 rounded-r"
                      >
                        +
                      </button>
                    </div>
                    {/* Remove item button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Coupon
            handleApplyCoupon={handleApplyCoupon} // Apply coupon function
            coupon={coupon}
            setCoupon={setCoupon}
          />
          {/* Display total price and proceed to pay button */}
          <div className="sticky bottom-0 left-0 w-full mt-2 bg-green-600 shadow-lg rounded-t-lg p-4 text-white flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold">
                Total: $
                {discount > 0 ? discount.toFixed(2) : totalPrices.toFixed(2)}
              </h2>
              {discount > 0 && (
                <p className="text-sm text-gray-200">
                  Discount applied: ${discount}
                </p>
              )}
            </div>
            {/* Payment button */}
            <Button
              onClick={() => paymentHandler(cartItems)}
              className="px-6 py-3 bg-white text-green-600 font-semibold rounded hover:bg-gray-100"
            >
              Proceed to Pay
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
