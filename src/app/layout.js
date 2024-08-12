"use client"
import { Provider } from "react-redux";
import "./globals.css";
import store from "@/store/store";
import Navbar from "./components/Navbar";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Provider store={store}>
          <Navbar />
        {children}
        </Provider>
        </body>
    </html>
  );
}
