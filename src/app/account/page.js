import React from "react";
import { Container, Paper, Typography } from "@mui/material";
import {
  ShoppingCart,
  Favorite,
  CardGiftcard,
  HelpOutline,
  Settings,
} from "@mui/icons-material";
import Link from "next/link";

export default function Account() {
  return (
    <Container maxWidth="lg" className="py-6">
      <Typography variant="h4" className="mb-4 font-bold text-center">
        Account
      </Typography>

      {/* Order History Section */}
      <Link href="/order">
        <Paper
          elevation={3}
          className="mb-6 p-4 flex items-center cursor-pointer"
        >
          <ShoppingCart className="text-blue-500 mr-2" />
          <div>
            <Typography variant="h6" className="mb-2 font-semibold">
              Order History
            </Typography>
            <Typography>Check your order items.</Typography>
            {/* Add order details here */}
          </div>
        </Paper>
      </Link>

      {/* Wishlist Section */}
      <Link href="/wishlist">
        <Paper
          elevation={3}
          className="mb-6 p-4 flex items-center cursor-pointer"
        >
          <Favorite className="text-red-500 mr-2" />
          <div>
            <Typography variant="h6" className="mb-2 font-semibold">
              Wishlist
            </Typography>
            <Typography>Your wishlist items.</Typography>
            {/* Add wishlist items here */}
          </div>
        </Paper>
      </Link>

      {/* Coupons Section */}
      <Link href="/coupons">
        <Paper
          elevation={3}
          className="mb-6 p-4 flex items-center cursor-pointer"
        >
          <CardGiftcard className="text-green-500 mr-2" />
          <div>
            <Typography variant="h6" className="mb-2 font-semibold">
              Coupons
            </Typography>
            <Typography>No coupons available.</Typography>
            {/* Add coupon details here */}
          </div>
        </Paper>
      </Link>

      {/* Help Center Section */}
      <Link href="/help">
        <Paper
          elevation={3}
          className="mb-6 p-4 flex items-center cursor-pointer"
        >
          <HelpOutline className="text-yellow-500 mr-2" />
          <div>
            <Typography variant="h6" className="mb-2 font-semibold">
              Help Center
            </Typography>
            <Typography>Need assistance? Visit our Help Center.</Typography>
            {/* Add a link to the help center or additional details here */}
          </div>
        </Paper>
      </Link>

      {/* Profile Section */}
      <Link href="/user">
        <Paper elevation={3} className="p-4 flex items-center cursor-pointer">
          <Settings className="text-gray-500 mr-2" />
          <div>
            <Typography variant="h6" className="mb-2 font-semibold">
              Profile
            </Typography>
            {/* Add profile details here */}
          </div>
        </Paper>
      </Link>
    </Container>
  );
}
