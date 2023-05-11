import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  isOpen: false,
};

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToAdd._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [{ ...productToAdd, quantity: 1 }, ...cartItems];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === productToRemove._id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem._id === productToRemove._id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItems: (state, { payload }) => {
      const newCartCount = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const newCartTotal = state.cartItems.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      state.cartTotal = newCartTotal;
      state.cartCount = newCartCount;
    },
    addItemToCart: (state, { payload }) => {
      const newCartItems = addCartItem(state.cartItems, payload);
      state.cartItems = newCartItems;
    },
    removeFromCart: (state, { payload }) => {
      const newCartItems = removeCartItem(state.cartItems, payload);
      state.cartItems = newCartItems;
    },
    clearItemFormCart: (state, { payload }) => {
      const newCartItems = state.cartItems.filter(
        (product) => product.id !== payload.id
      );
      state.cartItems = newCartItems;
    },
    setEveryThingToDefault: (state, { payload }) => {
      state.cartItems = [];
      state.cartCount = 0;
      state.cartTotal = 0;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  updateCartItems,
  clearItemFormCart,
  removeFromCart,
  addItemToCart,
  setEveryThingToDefault,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
