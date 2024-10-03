import axios from "axios";

// Global function to fetch products
export const getProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const newData = response.data.map((item) => ({
    ...item,
    quantity: 1,
  }));
  return newData;
};
