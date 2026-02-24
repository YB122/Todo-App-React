import React, { useContext, useState } from "react";
import { User } from "../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
  const { userData, setUserData, userToken } = useContext(User);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const schema = z.object({
    name: z
      .string()
      .min(3, "The Name Must Be Greater Than 3 Character")
      .max(30, "The Name Must Be smaller Than 30 Character"),
    password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  }).refine((data) => {
    if (data.password && data.password.length > 0) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData?.name || "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const updateData = { name: data.name };
    if (data.password) {
      updateData.password = data.password;
    }

    axios
      .patch("https://todo-nti.vercel.app/user/update-user", updateData, {
        headers: {
          token: userToken,
        },
      })
      .then(() => {
        toast.success("Profile updated successfully!");
        setUserData({ ...userData, name: data.name });
        setIsEditing(false);
        reset({
          name: data.name,
          password: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to update profile.");
      })
      .finally(() => setIsLoading(false));
  };

  if (!userData) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] shadow-gray-100">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">Authenticating...</p>
    </div>
  );

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-all duration-300 p-0 overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 h-32 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl p-1 shadow-xl">
               <div className="w-full h-full bg-blue-600 rounded-xl flex items-center justify-center text-white text-3xl font-black">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight truncate max-w-xs md:max-w-md" title={userData.name}>
                {userData.name}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{userData.email}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all py-2.5! px-5! text-sm! dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Full Name</label>
                  <input
                    {...register("name")}
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Email Address</label>
                  <input
                    value={userData.email}
                    readOnly
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3 opacity-60 cursor-not-allowed dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 ml-1">Email cannot be changed.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">New Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Leave empty to keep current"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500 transition-all outline-none font-medium px-6 w-full py-3 dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Repeat new password"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    reset();
                  }}
                  className="flex-1 py-3 text-slate-600 dark:text-slate-400 font-bold bg-slate-100 dark:bg-slate-800 rounded-full hover:opacity-80 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-2 bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
                >
                  {isLoading ? (
                    <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 animate-fade-in delay-100">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Display Name</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{userData.name}</span>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-2">Primary Email</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white break-all">{userData.email}</span>
              </div>
              
              <div className="flex p-4 bg-blue-500/5 rounded-xl gap-3 items-center mt-6">
                <i className="fa-solid fa-circle-info text-blue-500"></i>
                <p className="text-sm text-blue-600/80 font-medium leading-snug">
                  To change your password or name, click the edit button above.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
