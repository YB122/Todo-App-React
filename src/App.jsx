import "./App.css";
import Layout from "./component/Layout/Layout";
import Home from "./component/Home/Home";
import Profile from "./component/Profile/Profile";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./component/NotFound/NotFound";
import UserProvider from "./contexts/UserContext";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./component/GuestRoute/GuestRoute";
import { Toaster } from "react-hot-toast";

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
      { path: "login", element: <GuestRoute><Login /></GuestRoute> },
      { path: "register", element: <GuestRoute><Register /></GuestRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserProvider>
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            // Standard toasts will now respect dark mode classes
            className: 'dark:bg-slate-900 dark:text-white dark:border-slate-800',
            style: {
              borderRadius: '16px',
            },
            success: {
              className: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 shadow-xl',
            },
            error: {
              className: 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 shadow-xl',
            }
          }}
        />
        <RouterProvider router={routes}></RouterProvider>
      </UserProvider>
    </>
  );
}

export default App;
