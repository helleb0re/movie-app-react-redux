import React from "react";
import { Link } from "react-router-dom";

import "./link-component.css";

const LinkComponent = ({ to, children, reload = true }) => {
  if (!reload) {
    return (
      <Link className="link" to={to}>
        {children}
      </Link>
    );
  }

  return (
    <a className="link" href={to}>
      {children}
    </a>
  );
};

export default LinkComponent;
