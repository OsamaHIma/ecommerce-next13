"use client";
import "./style.scss";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
import { signIN } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useState } from "react";

const defaultProps = {
  email: "",
  password: "",
};

const SignIn = () => {
  const signInWithGoogle = async () => {
    try {
      await signIN();
      toast.success("Singed in successfully");
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  const [validated, setValidated] = useState("");

  const [formFields, setFormFields] = useState(defaultProps);
  const { email, password } = formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setValidated("not-validated");
      toast.error("Please fill in all fields or enter a valid email address.");
      return;
    }

    setValidated("validated");

    if (!password || !email) return;
    const submitHandler = async () => {
      event.preventDefault();
      try {
        await signInUserWithEmailAndPassword(email, password);
        toast.success("Singed in successfully");
        setValidated("");
        restFormFields();
      } catch (err) {
        toast.error(err.code || err.message || err);
      }
    };
    submitHandler();
  };
  const restFormFields = () => {
    setFormFields(defaultProps);
  };
  return (
    <section className="signup-form !pt-0 sm:!pt-4 transition-all ease-in relative">
      <form
        className={`${validated} bg-slate-50 dark:!bg-slate-700`}
        onSubmit={formHandler}
        noValidate
      >
        <h2 className="dark:!text-slate-300">Sign In</h2>
        <p className="hint-text dark:!text-slate-100">
          Sign in using Google or Email and password
        </p>
        <div className="text-center">
          <button
            className="social-btn btn"
            type="button"
            onClick={signInWithGoogle}
          >
            <AiOutlineLogin className="inline mb-1 mr-2" size={23} /> Google
          </button>
        </div>
        <div className="or-seperator">
          <b className="dark:text-slate-800">Or</b>
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control shadow px-8 py-3 w-full rounded-3xl"
            name="email"
            value={email}
            onChange={onChange}
            autoComplete="email"
            placeholder="Your Email address"
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control shadow px-8 py-3 w-full rounded-3xl"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            autoComplete="current-password"
            minLength={6}
            required="required"
          />
        </div>
        <div className="form-group flex justify-between items-center">
          <button type="submit" className="btn !mt-0 !w-[50%]">
            Sign In
          </button>
          <p
            className="dark:!text-gray-400 cursor-pointer"
            onClick={() => toast.error("Not my problem")}
          >
            Forgot your password?
          </p>
        </div>
      </form>
      <div className="text-center dark:!text-slate-100">
        Don&apos;t have and account?
        <Link href="/signup" className=" dark:!text-gray-400 ml-2">
          Sign up
        </Link>
      </div>
    </section>
  );
};

export default SignIn;
