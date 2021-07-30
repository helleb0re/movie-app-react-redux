import React from "react";

import "./slider-container.css";

const SliderContainer = ({ sliderItems, sliderTrack, sliderList }) => {
  return (
    <div ref={sliderList} className="slider-list">
      <div ref={sliderTrack} className="slider-track">
        {sliderItems}
      </div>
    </div>
  );
};

export default SliderContainer;
