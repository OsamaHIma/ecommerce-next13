"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const totalPriceFromStorage = JSON.parse(localStorage.getItem("totalPrice"));
  const totalQuantitiesFromStorage = JSON.parse(
    localStorage.getItem("totalQuantities")
  );
  const qtyFromStorage = JSON.parse(localStorage.getItem("qty"));

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(totalPriceFromStorage || 0);
  const [totalQuantities, setTotalQuantities] = useState(
    totalQuantitiesFromStorage || 0
  );
  const [qty, setQty] = useState(qtyFromStorage || 1);
  localStorage.setItem("totalQuantities", totalQuantities);
  localStorage.setItem("totalPrice", totalPrice);
  localStorage.setItem("qty", qty);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    // localStorage.setItem("totalPrice", totalPrice);
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
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
      localStorage.setItem(
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
    // localStorage.setItem("totalPrice", totalPrice);

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    // localStorage.setItem("totalQuantities", totalQuantities);

    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
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
      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ])
      );

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      // localStorage.setItem("totalPrice", totalPrice);

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      // localStorage.setItem("totalQuantities", totalQuantities);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        localStorage.setItem(
          "cartItems",
          JSON.stringify([
            ...newCartItems,
            { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ])
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        // localStorage.setItem("totalQuantities", totalQuantities);
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
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
