import React from "react";

import "./slider-item.css";

const SliderItem = ({ children, width, item }) => {
  return (
    <div className="slider__item" style={{ width: `${width}%` }}>
      <div className="slider__item-content">{children}</div>
    </div>
  );
};

export default SliderItem;
