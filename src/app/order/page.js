"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  CardMedia,
} from "@mui/material";
import Link from "next/link";

export default function Order() {
  const orderData = useSelector((state) => state.cart.orderItem); // Assuming the order data is in state.cart.orderItem

  return (
    <Container maxWidth="lg" className="py-10">
      <Typography variant="h4" component="h1" className="mb-8 text-center">
        Order Item's
      </Typography>

      {orderData && orderData.length > 0 ? (
        <Box className="space-y-6">
          {orderData.map((item, index) => (
            <Paper
              key={index}
              elevation={3}
              className="p-4 rounded-lg shadow-md border border-gray-200"
            >
              <Grid container spacing={4}>
                {/* Product Image */}
                <Grid item xs={12} sm={4}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    className="object-cover rounded-lg"
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} sm={8}>
                  <Box className="space-y-2">
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography className="text-gray-600">
                      {item.description}
                    </Typography>
                    <Typography className="font-bold">
                      Category: {item.category}
                    </Typography>
                    <Typography>Price: ${item.price}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography className="font-semibold">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </Typography>

                    {/* Rating */}
                    <Typography className="flex items-center">
                      Rating: {item.rating.rate} ⭐ ({item.rating.count}{" "}
                      reviews)
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}

          {/* Back to Shop Button */}
          <Box className="mt-6 flex justify-center">
            <Link href="/">
              <Button variant="contained" color="primary">
                Back to Shop
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" className="text-center">
          No orders placed yet.
        </Typography>
      )}
    </Container>
  );
}
