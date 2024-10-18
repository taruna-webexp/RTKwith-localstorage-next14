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
import { setAddCart } from "@/redux/checkOutSlice";

const PaymentPage = () => {
  const { removeItemToCart, totalPrice } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openDialog, setOpenDialog] = useState(false);
  const [tokenData, setTokenData] = useState();
  const [itemData, setItemData] = useState([]); // Items in the cart
  const [orderData, setOrderData] = useState([]); // Items in the cart

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensures the component only runs on the client side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const searchParams = new URLSearchParams(window.location.search);
      const searchParmData = searchParams.get("items"); // Get cart items from URL parameters

      if (searchParmData) {
        const decodedData = decodeURIComponent(searchParmData);
        const parsedData = JSON.parse(decodedData); // Parse the item data
        setItemData(parsedData);
        setOrderData(parsedData);
      }
    }
  }, [isClient]);

  const handleClickOpen = () => setOpenDialog(true);

  const handleClose = () => {
    setOpenDialog(false);
    router.push("/"); // Navigate to the home page
  };

  const handlePaymentSuccess = () => {
    // Show success message
    toast.success("Payment successful!");

    // Clear the cart after successful payment
    dispatch(setOrderItems(orderData));
    dispatch(setAddCart([])); // Clear the cart
    localStorage.setItem("addToCartItems", JSON.stringify([]));

    // Redirect to home after 3 seconds
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const token = (token) => {
    setTokenData(token);
    handlePaymentSuccess(); // Trigger the success flow
  };

  const handleRadioChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);

    if (selectedMethod === "cash") {
      handleCashPayment();
    }
  };

  const handleCashPayment = () => {
    dispatch(setOrderItems(orderData));
    toast.success("Payment successful via cash!");
    dispatch(setAddCart([])); // Clear the cart after payment
    localStorage.setItem("addToCartItems", JSON.stringify([]));
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const removeItemToCartHandle = (id) => {
    removeItemToCart(id);
    setItemData((prev) => prev.filter((item) => item.id !== id));
  };

  const total = itemData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (itemData.length === 0) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="py-10">
      <Typography
        variant="h4"
        className="font-bold text-center mb-6"
        style={{ color: "#1976d2" }}
      >
        Complete Your Purchase
      </Typography>

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
          {itemData.map((item) => (
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
          ))}
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
            <GooglePayButtonComponent
              totalPrice={total}
              onPaymentSuccess={handlePaymentSuccess} // Handle Google Pay success
            />
            <StripePayment
              totalPrice={total}
              onToken={token} // Stripe token handling with success
            />
          </div>
        )}
      </Card>

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
