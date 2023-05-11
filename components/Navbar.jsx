"use client";

import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineLaptop,
} from "react-icons/ai";
import { HiMoon, HiSun } from "react-icons/hi";
import { setCurrentUser } from "@/store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import {
  onAuthStateChangedListener,
  createUserDocument,
  SignOutUser,
} from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { openCart } from "@/store/features/cartSlice";

const Navbar = () => {
  const { setTheme } = useTheme();
  const [showThemeMenu, setThemeMenu] = useState("-top-[400px]");
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setMenu] = useState("-right-[400px]");
  // theme Menu toggler button
  const openThemeMenu = () => {
    if (showMenu === "right-0") {
      setMenu("-right-[400px]");
    }

    if (showThemeMenu === "top-[17%]") {
      setThemeMenu("-top-[400px]");
    } else {
      setThemeMenu("top-[17%]");
    }
  };
  // Menu toggler button
  const openMenu = () => {
    if (showThemeMenu === "top-[17%]") {
      setThemeMenu("-top-[400px]");
    }

    if (showMenu === "right-0") {
      setMenu("-right-[400px]");
    } else {
      setMenu("right-0");
    }
  };
  const dispatch = useDispatch();
  // check if user is already signed in
  useEffect(() => {
    console.log(
      `%cDon't worry every thing is ok hopefully ...😬`,
      "color: #32ffce"
    );
    
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocument(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  const { currentUser } = useSelector((store) => store.user);
  const { cartCount, isOpen } = useSelector((store) => store.cart);

  const handleOpenCart = () => {
    dispatch(openCart());
  };
  return (
    <div className="navbar-container flex items-center">
      <p className="logo">
        <Link href="/">
          <Image src="/crown.svg" width={50} height={70} alt="logo" />
        </Link>
      </p>
      <ul className="flex gap-6 items-center">
        <li className="relative">
          <button className="mx-4 cart-icon" onClick={openThemeMenu}>
            <HiMoon className="rotate-90 hidden transition-all hover:text-slate-900 dark:rotate-0 dark:block dark:saturate-100 dark:text-slate-400 dark:hover:text-slate-100" />
            <HiSun className="rotate-0 block transition-all hover:text-slate-900 dark:rotate-90 dark:hidden dark:text-slate-400 dark:hover:text-slate-100" />
            <span className="sr-only">Toggle theme menu</span>
          </button>
        </li>
        <ul
          className={`${showThemeMenu} menuTransition flex w-[9rem] absolute right-0 md:right-0 z-10 flex-col m-8 shadow-lg select-none`}
        >
          <li
            className="bg-slate-300 dark:bg-slate-700 pb-2 pt-4 rounded-t-md px-8 cursor-pointer text-slate-700 dark:text-slate-200 hover:text-gray-400"
            onClick={() => setTheme("dark")}
          >
            <HiMoon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </li>
          <li
            className=" bg-slate-300 dark:bg-slate-700 py-2 pl-8 cursor-pointer text-slate-700 dark:text-slate-200 hover:text-gray-400"
            onClick={() => setTheme("light")}
          >
            <HiSun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </li>
          <li
            className=" bg-slate-300 dark:bg-slate-700 pt-2 pb-4 rounded-b-md pl-8 cursor-pointer text-slate-700 dark:text-slate-200 hover:text-gray-400"
            onClick={() => setTheme("system")}
          >
            <AiOutlineLaptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </li>
        </ul>
        <li>
          <button className="signInBtn cart-icon !mr-2">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div>
                  <AiOutlineLogout onClick={SignOutUser} />
                  <span className="sr-only">Sign out</span>
                </div>
                <span className="text-slate-700 dark:text-zinc-200 text-sm">
                  {currentUser.email}
                </span>
              </div>
            ) : (
              <Link href="signup">
                <AiOutlineLogin />
              </Link>
            )}
          </button>
        </li>
        <li>
          <button className="cart-icon" onClick={handleOpenCart}>
            <AiOutlineShopping />
            <span className="cart-item-qty">{cartCount}</span>
          </button>
        </li>
      </ul>
      {isOpen && <Cart />}
    </div>
  );
};
export default Navbar;
