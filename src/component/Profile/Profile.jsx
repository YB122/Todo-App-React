import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
export default function Profile() {
  let [state, setState] = useState(0);
  useEffect(() => {
    console.log("Mounting Profile");
    return () => {};
  }, []);
  return (
    <>
      <div>Profile</div>
      <p>Hello Profile</p>
    </>
  );
}
