import { createContext, useEffect, useState } from "react";

export const User = createContext();

export default function UserProvider({ children }) {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("userToken") || null,
  );
  useEffect(() => {
    userToken
      ? localStorage.setItem("userToken", userToken)
      : localStorage.removeItem("userToken");
  }, [userToken]);
  return (
    <User.Provider value={{ userToken, setUserToken }}>
      {children}
    </User.Provider>
  );
}
