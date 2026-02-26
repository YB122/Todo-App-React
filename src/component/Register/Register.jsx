import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User } from "../../contexts/UserContext";
import toast from "react-hot-toast";

export default function Register() {
  const { setUserToken, setUserData } = useContext(User);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const schema = z
    .object({
      name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be at most 30 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    setisLoading(true);
    axios
      .post("https://todo-nti.vercel.app/user/signup", data)
      .then((res) => {
        toast.success("Account created successfully! Welcome.");
        setUserToken(res.data.token);
        setUserData(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Registration failed. Try again.");
      })
      .finally(() => setisLoading(false));
  };

  return (
    <div className="pt-32 pb-12 px-6 min-h-screen flex items-center justify-center bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="w-full max-w-lg">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-all duration-300 p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-3">
              Join <span className="text-blue-600">TodoSun</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Start organizing your tasks with style</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Full Name</label>
              <input
                type="text"
                placeholder="Youssef..."
                className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.name.message}</p>
              )}
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Password</label>
                <div className="relative group/pass">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 pr-12"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Confirm Password</label>
                <div className="relative group/pass">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3.5 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500 pr-12"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all py-4 flex items-center justify-center gap-2 group dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
            >
              {isLoading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Creating Account...</>
              ) : (
                <>
                  Create Account
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
