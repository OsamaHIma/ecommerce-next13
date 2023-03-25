"use client";
import { useStateContext } from "@/app/context/stateContext";
import Link from "next/link";
import {useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { playFireWorks } from "@/lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities, setQty } = useStateContext();
  useEffect(() => {
    window.localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    setQty(1);
    playFireWorks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions please email:
          <a className="email" href="mailto:osamaworkeamil@gmail.com">
            osamaworkeamil@gmail.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
