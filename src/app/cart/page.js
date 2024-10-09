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
import { useSession } from "next-auth/react";

const Cart = () => {
  const router = useRouter();
  const session = useSession();
  console.log("sessionsession", session.data);
  const [totalPrices, setTotalPrice] = useLocalStorageState("totalPrices", {
    defaultValue: 0,
  });
  const [cart, setCart] = useLocalStorageState("cartItems", {
    defaultValue: [],
  });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const validCoupons = { SAVE10: 10, SAVE20: 20 };
  const { cartItems, removeItemToCart, incrementToCart, decrementToCart } =
    useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate total price whenever cart changes
    let totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [cart, setTotalPrice]);

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
    if (coupon && validCoupons[coupon]) {
      const discountValue = validCoupons[coupon];
      if (totalPrices >= 100) {
        const newTotal = totalPrices - discountValue;
        setDiscount(newTotal);
        toast.success("Coupon applied successfully");
      } else {
        toast.error("Minimum cart value should be $100 to apply this coupon.");
      }
    } else {
      toast.error("Invalid coupon code");
      setDiscount(0);
    }
  };
  const paymentHandler = (cartItems) => {
    if (session.data === null) {
      router.push("/auth/signin");
    } else {
      const itemData = JSON.stringify(cartItems);
      const encodedData = encodeURIComponent(itemData);
      router.push(`/payment?items=${encodedData}`);
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
            ))}
          </div>
          <Coupon
            handleApplyCoupon={handleApplyCoupon}
            coupon={coupon}
            setCoupon={setCoupon}
          />
          <div className="sticky bottom-0 left-0 w-full mt-2 bg-green-600 shadow-lg rounded-t-lg p-4 text-white flex justify-between items-center transition-transform transform hover:translate-y-[-10px]">
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
