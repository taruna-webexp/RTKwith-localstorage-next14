

 


import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Adjust the path to your slice

const store = configureStore({
  reducer: {
    products: productReducer, // Assuming 'product' slice
  },
});

export default store;
