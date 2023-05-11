"use client";
import "./style.scss";
import Link from "next/link";
import { AiOutlineLogin } from "react-icons/ai";
import {
  addUserWithEmailAndPassword,
  createUserDocument,
  signIN,
} from "@/lib/firebase";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { setCurrentUser } from "@/store/features/userSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState("");

  const signInWithGoogle = async () => {
    try {
      await signIN();
      toast.success("Singed in successfully");
    } catch (error) {
      toast.error(error.message || error);
    }
  };
  const defaultProps = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  };

  const [formFields, setFormFields] = useState(defaultProps);
  const { displayName, email, password, confirmPassword, dateOfBirth } =
    formFields;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const restFormFields = () => {
    setFormFields(defaultProps);
  };
  //Handel submit
  const formHandler = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      event.stopPropagation();
      setValidated("not-validated");
      toast.error("Please fill in all fields or enter a valid email address.");
      return;
    }

    setValidated("validated");
    const submitHandler = async () => {
      if (password !== confirmPassword) {
        toast.error("Password not matched");
        return;
      }
      if (
        !password ||
        !displayName ||
        !email ||
        !confirmPassword ||
        !dateOfBirth
      )
        return;
      try {
        const { user } = await addUserWithEmailAndPassword(email, password);
        dispatch(setCurrentUser(user));
        const res = await createUserDocument(user, { displayName });
        setValidated("");
        restFormFields();
        toast.success("Singed Up successfully");
      } catch (err) {
        toast.error(err.code || err.message || err);
      }
    };
    submitHandler();
  };
  return (
    <section className="signup-form !pt-0 sm:!pt-4 transition-all ease-in relative">
      <form
        className={`${validated} bg-slate-50 dark:!bg-slate-700`}
        onSubmit={formHandler}
        noValidate
      >
        <h2 className="dark:!text-slate-300">Sign Up</h2>
        <p className="hint-text dark:!text-slate-100">
          Sign Up using Google or Email and password
        </p>
        <div className="text-center">
          <button
            className="social-btn btn"
            type="button"
            onClick={signInWithGoogle}
          >
            <AiOutlineLogin size={23} className="inline mb-1 mr-2" /> Google
          </button>
        </div>
        <div className="or-seperator">
          <b className="dark:text-slate-800">Or</b>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control shadow px-8 py-3 w-full rounded-3xl"
            name="displayName"
            value={displayName}
            placeholder="Full name"
            minLength={10}
            onChange={onChange}
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control shadow px-8 py-3 w-full rounded-3xl"
            name="email"
            value={email}
            placeholder="Your Email address"
            autoComplete="email"
            onChange={onChange}
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control shadow px-8 py-3 w-full rounded-3xl"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChange}
            autoComplete="new-password"
            minLength={6}
            required="required"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control shadow px-8 py-3 w-full rounded-3xl"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            autoComplete="new-password"
            minLength={6}
            onChange={onChange}
            required="required"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-center dark:!text-slate-100">
        Already have an account?
        <Link href="signin" className="dark:!text-gray-400 ml-2">
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default SignUp;
