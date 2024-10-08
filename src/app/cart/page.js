"use client";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/cart";
import useLocalStorageState from "use-local-storage-state";
import useCart from "@/component/hooks/useCart";
import { Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Coupon from "@/component/common/coupon/Coupon";
import toast from "react-hot-toast";

const Cart = () => {
  const router = useRouter();
  const [totalPrices, setTotalPrice] = useLocalStorageState("totalPrices");
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

  //coupon

  const couponCode = process.env.NEXT_PUBLIC_COUPON_CODE;
  let totalPrice = 0;

  cart?.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  console.log("totalPrice", totalPrice);
  setTotalPrice(totalPrice);

  const handleApplyCoupon = () => {
    if (coupon) {
      if (coupon === couponCode && totalPrices >= 100) {
        const priceDiscount = totalPrices - 30;
        setDiscount(priceDiscount);
        toast.success("Coupon added successfully");
        console.log("dessssssss", priceDiscount);
      } else {
        toast.error("Invalid coupon code");
        // alert("Invalid coupon code");
        setDiscount(0);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Shopping Cart
      </h1>
      {cart?.length === 0 ? (
        <p className="text-xl text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart?.map((item) => {
              console.log("totalPrice", item.price);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center"
                >
                  <Link href={`/product/${item.id}`}>
                    <img
                      src={item?.images || item?.image}
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
                        <span className="py-1 px-3 text-lg">
                          {item.quantity}
                        </span>
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
          <Coupon
            handleApplyCoupon={handleApplyCoupon}
            coupon={coupon}
            setCoupon={setCoupon}
          />
          <div className="container cart-sticky-price px-2 mt-6">
            {discount > 0 && (
              <>
                <p className="text-white">
                  Discount applied: {discount.toFixed(2)}%
                </p>
                <h2 className="text-white text-2xl">
                  Price: ${totalPrice.toFixed(2)}
                </h2>
              </>
            )}

            <h2 className="text-white text-2xl">discount $30</h2>
            <h2 className="text-white text-2xl">
              Total: $
              {discount > 0 ? discount.toFixed(2) : totalPrice.toFixed(2)}
            </h2>

            <Button
              onClick={() => router.push("/payment")} // Use the appropriate router
              className="px-4 py-4 p-2 bg-green-500 text-white rounded"
            >
              Proceed to pay
            </Button>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Cart;
