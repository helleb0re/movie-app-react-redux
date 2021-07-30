import React from "react";

import "./more-btn.css";

import btnImg from "../../images/film-reel.png";
import LinkComponent from "../link-component";

const MoreBtn = ({ link }) => {
  return (
    <div className="more-btn__flex-container">
      <LinkComponent to={link} reload={false}>
        <div className="more-btn__container">
          <img className="more-btn__image" src={btnImg} alt="more image" />
          <h6 className="more-btn__text">more</h6>
        </div>
      </LinkComponent>
    </div>
  );
};

export default MoreBtn;
