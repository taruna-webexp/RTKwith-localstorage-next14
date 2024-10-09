import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripePayment({token,totalPrices}) {
  return (
    <StripeCheckout
      name="My Store"
      token={token}
      stripeKey={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}
      amount={totalPrices * 100}
      currency="INR"
      shippingAddress
      billingAddress
      zipCode
    >
      <Button
        variant="contained"
        color="primary"
        style={{
          background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "30px",
        }}
      >
        Proceed to Pay
      </Button>
    </StripeCheckout>
  );
}
