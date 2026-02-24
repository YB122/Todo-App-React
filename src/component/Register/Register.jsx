import React, { useContext, useEffect, useState } from "react";
import styles from "./Register.module.css";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../../contexts/UserContext";
export default function Register() {
  const { userToken, setUserToken } = useContext(User);
  const navigate = useNavigate();
  let [isLoading, setisLoading] = useState(false);
  let [errMsg, seterrMsg] = useState("");
  const schema = z
    .object({
      name: z
        .string()
        .min(3, "The Name Must Be Greater Than 3 Character")
        .max(30, "The Name Must Be smaller Than 30 Character"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  useEffect(() => {
    console.log("Mounting Register");
    return () => {};
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setisLoading(true);

    console.log(isLoading);

    axios
      .post("https://todo-nti.vercel.app/user/signup", data)
      .then((res) => {
        console.log(res);
        seterrMsg(res.data.message);
        setUserToken(res.data.token);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        seterrMsg(err.data.message);
      })
      .finally(setisLoading(false));
  };

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {errMsg == "user already exsist" ? (
          <>
            <div
              className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft"
              role="alert"
            >
              <span className="font-medium">{errMsg}</span>
            </div>
          </>
        ) : (
          ""
        )}
        {errMsg == "user created" ? (
          <>
            <div
              className="p-4 mb-4 text-sm text-fg-success-strong rounded-base bg-success-soft"
              role="alert"
            >
              <span className="font-medium">{errMsg}</span>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            {...register("name")}
            placeholder=" "
          />
          {errors.name && touchedFields.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          <label
            htmlFor="name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            User Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            placeholder=" "
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            {...register("email")}
          />
          {errors.email && touchedFields.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            autoComplete="new-password"
            placeholder=" "
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            {...register("password")}
          />
          {errors.password && touchedFields.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <label
            htmlFor="password"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            autoComplete="new-password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder=" "
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && touchedFields.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
          <label
            htmlFor="confirmPassword"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Confirm password
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          <span>
            {isLoading ? (
              <i class="fa-solid fa-spinner fa-spin fa-2xl"></i>
            ) : (
              "Submit"
            )}
          </span>
        </button>
      </form>
    </>
  );
}
