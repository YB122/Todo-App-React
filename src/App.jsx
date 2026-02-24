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
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={routes}></RouterProvider>
      </UserProvider>
    </>
  );
}

export default App;
