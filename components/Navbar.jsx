"use client";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "@/app/context/stateContext";
import Cart from "./Cart";
// import { signInUsingGoogle } from "@/lib/firebase/firebase";

const Navbar = () => {
  const { showCart, setShowCart } = useStateContext();
  const totalQuantities = window.localStorage.getItem("totalQuantities")
  // const SignInWithGoogle = async () => {
  //   await signInUsingGoogle();
  // };
  const openCart = () => {
    setShowCart(true);
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">CROWN STORE</Link>
      </p>
      <button className="cart-icon" onClick={openCart}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
    {/* <button onClick={SignInWithGoogle}>Google</button> */}
      {showCart && <Cart />}
    </div>
  );
};
export default Navbar;
