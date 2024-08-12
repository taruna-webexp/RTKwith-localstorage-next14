"use client";
import {  useDispatch } from "react-redux";
import Link from "next/link";
import { setCartItems } from "@/store/productSlice";
import useLocalStorageState from "use-local-storage-state";
import useCart from "../components/hooks/useCart";

export default function CartPage() {
  const {cartItems,removeItemToCart,incrementToCart,decrementToCart}=useCart()
  const [cart, setCart] = useLocalStorageState('cartItems');  

  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    removeItemToCart(id)
    dispatch(setCartItems(cartItems));

  };

  const handleDecrement = (id) => {
   decrementToCart(id)
   dispatch(setCartItems(cartItems));

  };

  const handleIncrement = (id) => {
    incrementToCart(id)
    dispatch(setCartItems(cartItems));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="py-2 px-4 border-b flex items-center">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    {item.title}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="px-2 py-1 text-lg font-semibold text-gray-700 border border-gray-300 rounded-l hover:bg-gray-200"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity || 1}
                        min="1"
                        className="w-16 text-center border-t border-b border-gray-300"
                        readOnly
                      />
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="px-2 py-1 text-lg font-semibold text-gray-700 border border-gray-300 rounded-r hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <Link href="/" className="text-indigo-600 hover:underline">
              Continue Shopping
            </Link>
            <Link href="/checkout" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Your cart is empty. <Link href="/shop" className="text-indigo-600 hover:underline">Shop now</Link>
        </p>
      )}
    </div>
  );
}
