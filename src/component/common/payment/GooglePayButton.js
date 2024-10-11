// src/components/GooglePayButton.js
import React from "react";
import GooglePayButton from "@google-pay/button-react";

const GooglePayButtonComponent = ({ totalPrice, onPaymentSuccess }) => {
  return (
    <GooglePayButton
      environment="TEST" // Use "PRODUCTION" for live
      buttonColor="white"
      className="py-4 px-0"
      buttonSizeMode="fill"
      buttonRadius="46"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "stripe",
                "stripe:version": "2020-08-27",
                "stripe:publishableKey":
                  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "5449521994", // Replace with your merchant ID
          merchantName: "demo",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: totalPrice.toFixed(2),
          currencyCode: "USD",
          countryCode: "US",
        },
        shippingAddressRequired: true,
      }}
      onLoadPaymentData={onPaymentSuccess}
    />
  );
};

export default GooglePayButtonComponent;
