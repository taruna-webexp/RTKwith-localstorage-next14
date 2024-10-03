"use client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ResponsiveAppBar from "../component/Navbar/Navbar";
import NextProviders from "../component/Provider";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import { Toaster } from "react-hot-toast";
import Footer from "@/component/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextProviders>
          <Provider store={store}>
            <ResponsiveAppBar />
            <Toaster position="top-right" />
            {children}
            <Footer />
          </Provider>
        </NextProviders>
        <ToastContainer />
      </body>
    </html>
  );
}
