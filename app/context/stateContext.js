"use client";

import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  // Get all data from local storage
  if (typeof window !== "undefined") {
    var cartItemsFromStorage = JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("cartItems")
    );
    var totalPriceFromStorage = JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("totalPrice")
    );
    var totalQuantitiesFromStorage = JSON.parse(
      typeof window !== "undefined" &&  window.localStorage.getItem("totalQuantities")
    );
    var qtyFromStorage = JSON.parse(
      typeof window !== "undefined" && window.localStorage.getItem("qty")
    );
  }
  const [showCart, setShowCart] = useState(false);

  // set the data from local storage as the default state and if it doesn't exist add default state
  const [cartItems, setCartItems] = useState(cartItemsFromStorage || []);
  const [totalPrice, setTotalPrice] = useState(totalPriceFromStorage || 0);
  const [totalQuantities, setTotalQuantities] = useState(
    totalQuantitiesFromStorage || 0
  );
  const [qty, setQty] = useState(qtyFromStorage || 1);
  // set local storage data
  if (typeof window !== "undefined") {
    // Client-side-only code

    window.localStorage.setItem("totalQuantities", totalQuantities);
    window.localStorage.setItem("totalPrice", totalPrice);
    window.localStorage.setItem("qty", qty);
  }
  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
  
      typeof window !== "undefined" && window.localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedCartItems)
        );
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
      typeof window !== "undefined" &&
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify([...cartItems, { ...product }])
        );
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);
    
    typeof window !== "undefined" && window.localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      typeof window !== "undefined" &&
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify([
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity + 1 },
          ])
        );

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        typeof window !== "undefined" &&
          window.localStorage.setItem(
            "cartItems",
            JSON.stringify([
              ...newCartItems,
              { ...foundProduct, quantity: foundProduct.quantity - 1 },
            ])
          );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        typeof window !== "undefined" &&
          window.localStorage.setItem("totalQuantities", totalQuantities);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        totalQuantities,
        qty,
        totalPrice,
        cartItems,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        setQty,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
