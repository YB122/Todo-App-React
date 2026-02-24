import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Layout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import Profile from "./component/Profile/Profile";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NotFound from "./component/NotFound/NotFound";
import UserProvider from "./contexts/UserContext";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

let routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={routes}></RouterProvider>
      </UserProvider>
    </>
  );
}

export default App;
