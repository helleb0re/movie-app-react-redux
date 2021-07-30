import React from "react";
import src from "./cinema.svg";
import "./logo.css";

const Logotype = ({ classNames = [] }) => {
  const classNamesStr = classNames.join(" ");

  return (
    <img className={"logo" + " " + classNamesStr} src={src} alt="logotype" />
  );
};

export default Logotype;
