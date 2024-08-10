import { createSlice } from "@reduxjs/toolkit";

const AllProductsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    cartProducts: [],
    wishListProducts: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    addToCart: (state, action) => {
      state.cartProducts.push({ ...action.payload, quantity: 1 });
    },
    addToWishList: (state, action) => {
      state.wishListProducts.push(action.payload);
    },
    deleteProduct: (state, action) => {
      console.log(action);
      state.cartProducts.splice(action.payload, 1);
    },
    deleteWishListProduct: (state, action) => {
      state.wishListProducts.splice(action.payload, 1);
    },
    increaseProduct: (state, action) => {
      const tempState = [...state.cartProducts];
      tempState[action.payload].quantity += 1;
      state.cartProducts = tempState;
    },
    decreaseProduct: (state, action) => {
      const temp = [...state.cartProducts];
      temp[action.payload].quantity -= 1;
      state.cartProducts = temp;
    },
  },
});

export const {
  addProducts,
  addToCart,
  increaseProduct,
  decreaseProduct,
  deleteProduct,
  addToWishList,
  deleteWishListProduct,
} = AllProductsSlice.actions;

export default AllProductsSlice.reducer;
