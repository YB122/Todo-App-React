import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User } from "../../contexts/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { setUserToken, setUserData } = useContext(User);
  const [isLoading, setisLoading] = useState(false);

  const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    setisLoading(true);
    axios
      .post("https://todo-nti.vercel.app/user/login", data)
      .then((res) => {
        toast.success("Welcome back! Login successful.");
        setUserToken(res.data.token);
        setUserData(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
      })
      .finally(() => setisLoading(false));
  };

  return (
    <div className="pt-32 pb-12 px-6 min-h-screen flex items-center justify-center bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-all duration-300 p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-3">
              Welcome <span className="text-blue-600">Back</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your details to sign in</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="youssef@example.com"
                className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2 ml-1">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Password</label>
                <Link to="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all py-4 flex items-center justify-center gap-2 group dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
            >
              {isLoading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Signing in...</>
              ) : (
                <>
                  Sign In
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
