// pages/payment.js
"use client";
import React from "react";
import toast from "react-hot-toast";
import useCart from "@/component/hooks/useCart";
import { useRouter } from "next/navigation";
import useLocalStorageState from "use-local-storage-state";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const PaymentPage = () => {
  const { cartItems, totalPrice, removeItemToCart } = useCart();
  const [paymentMethod, setPaymentMethod] = React.useState("cash"); // Default to Cash on Delivery
  const router = useRouter();
  const [totalPrices, setTotalPrice] = useLocalStorageState("totalPrices");

  const handlePayment = () => {
    toast.success(`Payment successful via ${paymentMethod}!`);

    router.push("/"); // Redirect to the home page or a success page
  };

  if (cartItems.length === 0) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <Typography variant="h6">Your cart is empty.</Typography>
      </Container>
    );
  }

  return (
    <Container className="p-4">
      <Typography variant="h4" className="font-bold mb-4">
        Payment
      </Typography>
      <Typography variant="h6" className="mb-2">
        Review Your Cart
      </Typography>
      <Card className="mb-4">
        <CardContent>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span className="text-gray-700">
                  {item.title} (x{item.quantity})
                </span>
                <span className="text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  onClick={() => removeItemToCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Typography variant="h6" className="mt-4">
            Total Price: <strong>${totalPrices}</strong>
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" className="mb-2">
        Select Payment Method
      </Typography>
      <FormControl component="fieldset" className="mb-4">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          row
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="online"
            control={<Radio color="primary" />}
            label="Online Pay"
          />
          <FormControlLabel
            value="cash"
            control={<Radio color="primary" />}
            label="Cash on Delivery"
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        className="mt-4"
      >
        Proceed to Pay
      </Button>
    </Container>
  );
};

export default PaymentPage;
