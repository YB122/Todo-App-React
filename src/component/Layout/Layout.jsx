import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
export default function Layout() {
  let [state, setState] = useState(0);
  useEffect(() => {
    console.log("Mounting Layout");
    return () => {};
  }, []);
  return (
    <>
      <NavBar />
      <div className="mt-25 min-h-[80vh]">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
