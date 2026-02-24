import React, { useContext } from "react";
import { User } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { userToken, setUserToken } = useContext(User);
  if (userToken) {
    console.log("enter");
    return props.children;
  } else {
    console.log("out");
    return <Navigate to={"/login"}></Navigate>;
  }
}
