"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useCart from "@/component/hooks/useCart";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Card,
  Grid,
  Divider,
} from "@mui/material";
import PaymentSuccess from "@/component/modal/PaymentSuccessModal";
import StripePayment from "@/component/common/payment/StripePayment";
import GooglePayButtonComponent from "@/component/common/payment/GooglePayButton";
import { useDispatch } from "react-redux";
import { setOrderItems } from "@/redux/cartSlice";

const PaymentPage = () => {
  // Custom hook for managing cart items and total price
  const { removeItemToCart, totalPrice } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  // Payment state management
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openDialog, setOpenDialog] = useState(false);
  const [tokenData, setTokenData] = useState();
  // URL search parameters for handling item data passed to the payment page
  const searchParams = useSearchParams();
  const [itemData, setItemData] = useState([]); // Items in the cart
  const [orderData, setOrderData] = useState([]); // Items in the cart

  useEffect(() => {
    const searchParmData = searchParams.get("items"); // Get cart items from URL parameters
    if (searchParmData) {
      const decodedData = searchParmData;
      const parsedData = JSON.parse(decodedData); // Parse the item data
      setItemData(parsedData);
      setOrderData(parsedData);
    }
  }, [searchParams]);

  // Opens the modal on successful payment
  const handleClickOpen = () => setOpenDialog(true);

  // Closes the modal and redirects to the homepage
  const handleClose = () => {
    setOpenDialog(false);
    router.push("/");
  };

  // Stores the payment token received from Stripe and opens the modal
  const token = (token) => {
    setTokenData(token);
    handleClickOpen();
  };

  // Handles payment method selection
  const handleRadioChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);

    // If cash is selected, process the payment and show success message
    if (selectedMethod === "cash") {
      dispatch(setOrderItems(orderData));
      toast.success(`Payment successful via ${selectedMethod}!`);
      router.push("/order");
    }
  };

  // Remove an item from the cart and updates the state
  const removeItemToCartHandle = (id) => {
    removeItemToCart(id); // Remove item from cart custom hook
    setItemData((prev) => prev.filter((item) => item.id !== id)); // Update local state
  };

  // If there are no items in the cart, display an empty cart message
  if (itemData.length === 0) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      </Container>
    );
  }

  let total = 0; // Initialize total price
  return (
    <Container maxWidth="md" className="py-10">
      {/* Page Header */}
      <Typography
        variant="h4"
        className="font-bold text-center mb-6"
        style={{ color: "#1976d2" }}
      >
        Complete Your Purchase
      </Typography>

      {/* Review Cart Section */}
      <Card
        elevation={3}
        className="mb-6"
        style={{ padding: "20px", borderRadius: "15px" }}
      >
        <Typography
          variant="h6"
          className="mb-4 text-center"
          style={{ fontWeight: 600 }}
        >
          Review Your Cart
        </Typography>
        <Divider />
        <Grid container spacing={2} className="my-4">
          {itemData.map((item) => {
            total = item.price * item.quantity + total; // Calculate total price
            return (
              <Grid
                item
                xs={12}
                key={item.id}
                className="flex justify-between items-center"
                style={{ padding: "10px 0" }}
              >
                <Grid item xs={2}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {item.title} (x{item.quantity})
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1" className="text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    onClick={() => removeItemToCartHandle(item.id)}
                    className="text-red-500"
                    style={{ color: "#f44336", fontWeight: 500 }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Divider />
        <Typography
          variant="h6"
          className="text-right mt-4"
          style={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Total Price: ${total.toFixed(2)}
        </Typography>
      </Card>

      {/* Payment Method Section */}
      <Card
        elevation={3}
        className="mb-6"
        style={{ padding: "20px", borderRadius: "15px" }}
      >
        <Typography
          variant="h6"
          className="mb-4 text-center"
          style={{ fontWeight: 600 }}
        >
          Select Payment Method
        </Typography>
        <Grid container justifyContent="center">
          <Button
            onClick={() => handleRadioChange({ target: { value: "online" } })}
          >
            Pay Online
          </Button>
          <Button
            onClick={() => handleRadioChange({ target: { value: "cash" } })}
          >
            Cash on Delivery
          </Button>
        </Grid>

        {paymentMethod === "online" && (
          <div className="text-center justify-center alignItem-center gap-4 flex">
            {/* Google Pay Button */}
            <GooglePayButtonComponent
              totalPrice={total}
              onPaymentSuccess={() => handleClickOpen()}
            />

            {/* Stripe Payment Button */}
            <StripePayment totalPrice={total} onToken={token} />
          </div>
        )}
      </Card>

      {/* Modal for Payment Success */}
      <PaymentSuccess
        open={openDialog}
        handleClose={handleClose}
        tokenData={tokenData}
        totalPrice={total}
        itemData={itemData}
      />
    </Container>
  );
};

export default PaymentPage;
