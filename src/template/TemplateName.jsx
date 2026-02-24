import React, { useEffect, useState } from "react";
import styles from "./TemplateName.module.css";
export default function TemplateName() {
  let [state, setState] = useState(0);
  useEffect(() => {
    console.log("Mounting TemplateName");
    return () => {};
  }, []);
  return (
    <>
      <div>TemplateName</div>
      <p>Hello TemplateName</p>
    </>
  );
}
