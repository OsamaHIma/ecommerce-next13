"use client";
import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import {
  addItemToCart,
  removeFromCart,
  clearItemFormCart,
  updateCartItems,
  closeCart,
} from "@/store/features/cartSlice";
// import { useStateContext } from "@/app/context/stateContext";
import { urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";

const Cart = () => {
  const { cartItems, cartTotal, cartCount } = useSelector(
    (store) => store.cart
  );

  const dispatch = useDispatch();

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const cartRef = useRef();
  
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting to checkout...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      className="cart-wrapper !overflow-x-hidden dark:text-slate-900"
      ref={cartRef}
    >
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading dark:text-zinc-700"
          onClick={handleCloseCart}
        >
          <AiOutlineLeft className="!inline-block" />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({cartCount} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={handleCloseCart}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              const increaseItem = () => {
                dispatch(addItemToCart(item));
                dispatch(updateCartItems());
              };

              const decreaseItem = () => {
                dispatch(removeFromCart(item));
                dispatch(updateCartItems());
              };

              const removeItem = () => {
                dispatch(clearItemFormCart(item));
                dispatch(updateCartItems());
              };
              if (item.quantity < 1) {
                removeItem();
              }
              return (
                <div className="product" key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex justify-between w-52 bottom">
                      <div>
                        <p className="quantity-desc flex items-center">
                          <span className="minus" onClick={decreaseItem}>
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span className="plus" onClick={increaseItem}>
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={removeItem}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom dark:text-zinc-900">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${cartTotal.toFixed(2)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
