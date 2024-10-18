"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function Order() {
  const orderData = useSelector((state) => state.cart.orderItem); // Assuming the order data is in state.cart.orderItem

  return (
    <Container maxWidth="lg" className="py-10">
      <Typography variant="h4" component="h1" className="mb-8 text-center">
        Order Items
      </Typography>

      {orderData && orderData.length > 0 ? (
        <Box className="space-y-4">
          <List>
            {orderData.map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                className="p-2 mb-2 rounded-lg shadow-md border border-gray-200"
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar variant="rounded">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover h-auto w-20 rounded"
                      />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={
                      <Box>
                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                        <Typography>
                          Price: ${item.price} | Quantity: {item.quantity}
                        </Typography>
                        <Typography className="font-semibold">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <Typography className="flex items-center">
                          Rating: {item?.rating?.rate} ⭐ ({item?.rating?.count}{" "}
                          reviews)
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>

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
