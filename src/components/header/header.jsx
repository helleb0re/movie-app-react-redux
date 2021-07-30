import React from "react";
import { Container } from "../help-components";
import LinkComponent from "../link-component";
import Logotype from "../logo";

import "./header.css";

const Header = () => {
  const headerLogoClassNames = ["header__logo"];

  return (
    <header className="header">
      <Container>
        <LinkComponent to="/">
          <div className="flex-container">
            <Logotype classNames={headerLogoClassNames} />
            <h1 className="header__title">
              <span>Movie</span> App
            </h1>
          </div>
        </LinkComponent>
      </Container>
    </header>
  );
};

export default Header;
