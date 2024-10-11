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

const PaymentPage = () => {
  const { removeItemToCart, totalPrice } = useCart(); // Assuming this is a hook that manages your cart
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [openDialog, setOpenDialog] = useState(false);
  const [tokenData, setTokenData] = useState();
  const searchParams = useSearchParams();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const searchParmData = searchParams.get("items");
    if (searchParmData) {
      const decodedData = searchParmData;
      const parsedData = JSON.parse(decodedData);
      setItemData(parsedData);
    }
  }, [searchParams]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    router.push("/");
  };

  const token = (token) => {
    setTokenData(token);
    handleClickOpen();
  };

  const handleRadioChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);

    if (selectedMethod === "cash") {
      toast.success(`Payment successful via ${selectedMethod}!`);
      router.push("/");
    }
  };

  const removeItemToCartHandle = (id) => {
    removeItemToCart(id); // Directly use removeItemToCart from the hook
    setItemData((prev) => prev.filter((item) => item.id !== id));
  };

  if (itemData.length === 0) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Typography variant="h6" align="center">
          Your cart is empty.
        </Typography>
      </Container>
    );
  }
  let total = 0;
  return (
    <Container maxWidth="md" className="py-10">
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
            total = item.price * item.quantity + total;
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
              onPaymentSuccess={() => {
                handleClickOpen(); // Show success modal
              }}
            />

            {/* Stripe Payment Button */}
            <StripePayment
              totalPrice={total}
              onToken={token} // Pass the token handler to Stripe component
            />
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
