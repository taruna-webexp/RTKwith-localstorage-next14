"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useLocalStorageState from "use-local-storage-state";

export default function Navbar() {
  const [cart, setCart] = useLocalStorageState('cartItems');

  const cartQuantity = cart.length;
console.log("cartQuantity",cart)
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-extrabold text-indigo-600">
                Logo
              </Link>
            </div>
            <div className="hidden md:flex md:space-x-8 ml-10">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-indigo-600 font-medium">
                About
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-indigo-600 font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-indigo-600 font-medium">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/login" className="text-gray-700 hover:text-indigo-600 mr-4">
              Login
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCartIcon />
              {cartQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                  {cartQuantity}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
