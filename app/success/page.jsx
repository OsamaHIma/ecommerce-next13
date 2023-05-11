"use client";

import { setEveryThingToDefault } from "@/store/features/cartSlice";
import Link from "next/link";
import {useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { playFireWorks } from "@/lib/utils";
import { useDispatch } from "react-redux";

const Success = () => {
 const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setEveryThingToDefault())
    playFireWorks();
  }, []);
  return (
    <div className="success-wrapper text-gray-600">
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
