import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default function StripePayment({ token, totalPrices }) {
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
      <button
        variant="contained"
        color="primary"
        className="px-6"
        style={{
          background: "white",
          padding: "10px 60px 10px 60px",
          fontWeight: "normal",
          borderRadius: "30px",
          border: "2px solid",
        }}
      >
        Pay with Stripe
      </button>
    </StripeCheckout>
  );
}
