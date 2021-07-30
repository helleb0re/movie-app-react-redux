import React from "react";

import "./main-slider-container.css";

const MainSliderContainer = ({
  children,
  sliderTrack,
  sliderList,
  sliderBtnNext,
  sliderBtnPrev,
}) => {
  return (
    <>
      <div className="main-slider__box">
        <button ref={sliderBtnPrev} className="main-slider__btn-prev" />
      </div>
      <div ref={sliderList} className="main-slider__list">
        <div ref={sliderTrack} className="main-slider__track">
          {children}
        </div>
      </div>
      <div className="main-slider__box">
        <button ref={sliderBtnNext} className="main-slider__btn-next" />
      </div>
    </>
  );
};

export default MainSliderContainer;
