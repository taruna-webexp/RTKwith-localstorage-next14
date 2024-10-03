"use client";
import { successMsg } from "@/component/Toastmsg/toaster";
import { signOut } from "next-auth/react";
import React from "react";
const LogoutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOut(); 
      successMsg("Log out Successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleSignOut}
        className=" bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer px-6 py-2 rounded-md"
      >
        Sign out
      </button>
    </div>
  );
};
export default LogoutButton;
