/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import logo from "@/src/assets/store-logo.png";
import SHForm from "@/src/components/form/SHForm";
import SHInput from "@/src/components/form/SHInput";
import {
  useLoginMutation,
  useSignUpMutation,
} from "@/src/lib/redux/features/auth/auth.api";
import { setUser, TUser } from "@/src/lib/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import loginValidationSchema from "@/src/schema/login.schema";
import registerValidationSchema from "@/src/schema/register.schema";
import { verifyToken } from "@/src/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebookF, FaGithub, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export type TLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [signUp] = useSignUpMutation();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<string>("User");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Loading...");

    try {
      const res = await login(data).unwrap();
      console.log(res);
      if (res.success) {
        toast.dismiss();
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success("Logged in successfully", { duration: 3000 });
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const handleSignUp: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("Loading...");
    console.log(data);

    const signUpData = { ...data, role: selectedRole };

    try {
      const res = await signUp(signUpData).unwrap();
      console.log(res);
      if (res.success) {
        toast.dismiss();
        const user = verifyToken(res.token) as TUser;
        dispatch(setUser({ user: user, token: res.token }));
        toast.success("Account created successfully!", { duration: 3000 });
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.dismiss();
      toast.error(error?.message);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelection = (role: string) => {
    setSelectedRole(role);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10 xl:py-0">
      <div className="relative border-2 border-primary text-white rounded-2xl shadow-lg overflow-hidden w-[850px] max-w-full lg:min-h-[570px] min-h-[620px] md:min-h-[580px]">
        {/* Form Containers */}
        {/* Sign In Part */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            isActive
              ? "translate-x-full opacity-0 z-10"
              : "translate-x-0 opacity-100 z-20"
          } w-full lg:w-1/2`}
        >
          <div className="flex flex-col items-center justify-center h-full px-10 text-white">
            <h1 className="text-2xl font-semibold my-5">Sign In</h1>
            <div className="flex space-x-3 mb-5">
              <a href="#" className="icon">
                <FaGoogle className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaFacebookF className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaGithub className="w-6 h-6 text-gray-600" />
              </a>
              <a href="#" className="icon">
                <FaLinkedinIn className="w-6 h-6 text-gray-600" />
              </a>
            </div>
            <span className="text-sm text-white mb-4">
              or use your email account
            </span>

            <SHForm
              onSubmit={handleLogin}
              resolver={zodResolver(loginValidationSchema)}
            >
              <div className="py-2">
                <SHInput
                  name="email"
                  label="Email"
                  type="email"
                  pathname="/login"
                  variant="bordered"
                />
              </div>
              <div className="">
                <SHInput
                  name="password"
                  label="Password"
                  type="password"
                  variant="bordered"
                />
              </div>

              <div className="flex items-center justify-end">
                <Link href={"/forgot-password"}>
                  <button type="reset" className="-mr-3 w-max p-2 mb-4">
                    <span className="text-sm tracking-wide text-white">
                      Forgot password ?
                    </span>
                  </button>
                </Link>
              </div>

              <div className="flex justify-center items-center mb-10">
                <button
                  type="submit"
                  className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                >
                  Sign In
                </button>
              </div>
            </SHForm>
          </div>
        </div>

        {/* Sign Up Part */}
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-700 ${
            isActive
              ? "translate-x-0 lg:translate-x-full opacity-100 z-20"
              : "translate-x-full lg:translate-x-0 opacity-100 lg:opacity-0 z-10"
          } w-full lg:w-1/2`}
        >
          <div className="flex flex-col items-center justify-center h-full px-10 text-white">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                height={60}
                width={60}
                className="flex py-1 rounded-full"
              />
            </Link>
            <h1 className="text-2xl font-semibold mt-4 mb-2">
              Start Your Journey
            </h1>

            <div className="relative flex justify-center items-center gap-1 my-3">
              {/* Dropdown Trigger */}
              <button
                onClick={toggleDropdown}
                className="flex items-center text-primary text-xl cursor-pointer"
              >
                <IoIosArrowDropdownCircle />
              </button>

              {/* Selected Role */}
              <h1 className="text-center text-primary font-bold">
                SignUp as {selectedRole}
              </h1>

              {/* Dropdown Menu */}
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-[calc(100%+0.5rem)] left-0  border border-primary bg-black text-white shadow-lg rounded-md w-40 z-50"
                >
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => handleSelection("User")}
                  >
                    User
                    {selectedRole === "User" && (
                      <span className="ml-2 text-[#14b8a6]">✔</span>
                    )}
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => handleSelection("Vendor")}
                  >
                    Vendor
                    {selectedRole === "Vendor" && (
                      <span className="ml-2 text-[#14b8a6]">✔</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <SHForm
              onSubmit={handleSignUp}
              resolver={zodResolver(registerValidationSchema)}
            >
              <div className="py-2">
                <SHInput
                  name="name"
                  label="Full Name"
                  type="text"
                  variant="bordered"
                />
              </div>
              <div className="pb-2">
                <SHInput
                  name="email"
                  label="Email"
                  type="email"
                  pathname="/login"
                  variant="bordered"
                />
              </div>
              <div className="pb-2">
                <SHInput
                  name="password"
                  label="Password"
                  type="password"
                  variant="bordered"
                />
              </div>

              <div className="flex justify-center items-center mt-3 mb-10">
                <button
                  type="submit"
                  className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold"
                >
                  Sign Up
                </button>
              </div>
            </SHForm>
          </div>
        </div>

        {/* Toggle Panels */}
        <div
          className={`hidden absolute top-0 left-1/2 w-full h-1/2 md:h-full md:w-1/2 transition-all duration-700 bg-[#14b8a6] text-white lg:flex flex-col items-center justify-center px-6 ${
            isActive
              ? "translate-x-[-100%] rounded-r-[10%]"
              : "translate-x-0 rounded-l-[10%]"
          }`}
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">
              {isActive ? "Nice to see you!😊" : "Hey, Welcome!😊"}
            </h1>
            <p className="mb-5">
              {isActive
                ? "Please log in with your details."
                : "Start by creating an account to begin."}
            </p>
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-6 py-2 bg-transparent border-2 border-white rounded-lg uppercase font-bold"
            >
              {isActive ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

        {/* Mobile Toggle Text */}
        <div className="lg:hidden absolute bottom-5 left-1/2 transform  -translate-x-1/2 text-center z-50 w-60 md:w-auto">
          <p>
            {isActive ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsActive(!isActive)}
              className="text-primary font-bold hover:underline"
            >
              {isActive ? "Login Now!" : "Sign Up Now!"}
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
