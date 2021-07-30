import React from "react";

import "./slider-button.css";

const SliderButton = ({ btnRef, img, classN }) => {
  return (
    <button ref={btnRef} className={classN}>
      <img src={img} alt={`${classN} slide`} />
    </button>
  );
};

export default SliderButton;
