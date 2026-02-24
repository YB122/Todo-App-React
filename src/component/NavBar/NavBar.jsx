import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import ToggleMode from "../ToggleMode/ToggleMode";

export default function NavBar() {
  const navigate = useNavigate();
  const { userToken, setUserToken, userData, setUserData } = useContext(User);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function logOut() {
    setUserToken(null);
    setUserData(null);
    toast.success("Signed out successfully");
    setIsDropdownOpen(false);
    navigate("/login");
  }

  return (
    <nav className="fixed w-full z-40 top-0 start-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4 px-6 md:px-8">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-900 dark:text-white tracking-tight">
            Todo<span className="text-blue-600">Sun</span>
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-4 rtl:space-x-reverse">
          <ToggleMode />

          {userToken ? (
            <div className="flex items-center gap-4 text-sm font-medium">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex text-sm bg-slate-100 dark:bg-slate-800 rounded-full md:me-0 focus:ring-4 focus:ring-blue-500/20 transition-all hover:scale-105"
                id="user-menu-button"
              >
                <span className="sr-only">Open user menu</span>
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </button>

              <div
                className={`z-50 ${isDropdownOpen ? "block" : "hidden"} absolute right-0 top-full mt-2 text-base list-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl shadow-xl`}
                id="user-dropdown"
              >
                {userData && (
                  <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                      {userData.name}
                    </span>
                    <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {userData.email}
                    </span>
                  </div>
                )}
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
              <Link
                to="/login"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 font-medium rounded-xl text-sm px-4 py-2.5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all py-2! px-5! text-sm! whitespace-nowrap dark:bg-blue-600 dark:hover:bg-blue-700 dark:shadow-blue-900/20"
              >
                Get Started
              </Link>
            </div>
          )}

          <button
            onClick={() => {
              const menu = document.getElementById("navbar-sticky");
              menu.classList.toggle("hidden");
            }}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 dark:text-slate-400 rounded-lg md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-100 dark:focus:ring-slate-800"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          {userToken && (
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 md:p-0 transition-colors"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block py-2 px-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 md:p-0 transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
