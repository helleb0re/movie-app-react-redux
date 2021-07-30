import React, { useRef, useEffect } from "react";
import SliderContainer from "../slider-container";
import SliderItem from "../slider-item";
import SliderButton from "../slider-button";

import { debounce } from "../help-function";

import imgArrowLeft from "./images/left1.svg";
import imgArrowRight from "./images/right1.svg";

import "./slider.css";

const Slider = ({ sliderItemsContent, itemSize, title }) => {
  const slider = useRef(null);
  const sliderList = useRef(null);
  const sliderTrack = useRef(null);
  const sliderListContainer = useRef(null);
  const sliderBtnNext = useRef(null);
  const sliderBtnPrev = useRef(null);

  let itemsInSlide = 0;
  let newSlideSize = itemSize;
  let itemsAmount = sliderItemsContent.length;
  let slideItemWidth = 100 / itemsAmount;
  let slideSize = 0;
  let maximum = 0;
  let startX = 0;
  let x = 0;
  let sliderListMarginLeft = 0;

  const btnDisabledClassName = "disabled";
  const debounceSetParameters = debounce(setParameters);
  useEffect(() => {
    const sliderListRef = sliderList.current;
    const sliderBtnPrevRef = sliderBtnPrev.current;
    const sliderBtnNextRef = sliderBtnNext.current;

    setParameters();
    setEvents();

    return () => {
      window.removeEventListener("resize", debounceSetParameters);

      sliderListRef.removeEventListener("touchstart", startDrag);
      document.removeEventListener("touchend", stopDrag);

      sliderBtnPrevRef.removeEventListener("click", moveToLeft);
      sliderBtnNextRef.removeEventListener("click", moveToRight);
    };
  }, []);

  function setParameters() {
    removeStyleTransition();
    let currentSlide = 0;

    currentSlide = Math.round(Math.abs(x) / newSlideSize);

    const windowSize = window.innerWidth;

    let sliderBtnsHaveDN = false;

    if (windowSize < 1360) {
      sliderBtnNext.current.classList.add("d-n");
      sliderBtnPrev.current.classList.add("d-n");
      sliderBtnsHaveDN = true;
    } else {
      sliderBtnNext.current.classList.remove("d-n");
      sliderBtnPrev.current.classList.remove("d-n");
    }

    let scale = 1;

    if (600 <= windowSize && windowSize <= 1000) {
      scale = 0.75;
    } else if (windowSize <= 600) {
      scale = 0.55;
    }

    slideSize = sliderList.current.clientWidth + sliderListMarginLeft;
    itemsInSlide = Math.floor(slideSize / (itemSize * scale));

    if (itemsInSlide >= itemsAmount) {
      sliderBtnNext.current.classList.add("d-n");
      sliderBtnPrev.current.classList.add("d-n");
    } else {
      if (!sliderBtnsHaveDN) {
        sliderBtnNext.current.classList.remove("d-n");
        sliderBtnPrev.current.classList.remove("d-n");
      }
    }

    if (itemsInSlide >= itemsAmount && windowSize > 1360) {
      sliderList.current.classList.add("ml-45");
      sliderListMarginLeft = 45;
    } else {
      sliderList.current.classList.remove("ml-45");
      sliderListMarginLeft = 0;
    }

    newSlideSize = slideSize / itemsInSlide;
    sliderTrack.current.style.width = `${newSlideSize * itemsAmount}px`;

    if (itemsAmount - itemsInSlide > 0) {
      maximum = -Math.floor((itemsAmount - itemsInSlide) * newSlideSize);
    } else {
      maximum = 0;
    }

    x = -currentSlide * newSlideSize;
    if (x < maximum) x = maximum;

    moveSlide();
    setStyleTransition();
  }

  function setEvents() {
    window.addEventListener("resize", debounceSetParameters);

    sliderList.current.addEventListener("touchstart", startDrag);
    document.addEventListener("touchend", stopDrag);

    sliderBtnPrev.current.addEventListener("click", moveToLeft);
    sliderBtnNext.current.addEventListener("click", moveToRight);
  }

  function startDrag(event) {
    startX = event.touches[0].pageX;

    document.addEventListener("touchmove", dragging);
  }

  function dragging(event) {
    const dragX = event.touches[0].pageX;
    const dragShift = dragX - startX;
    const easing = dragShift / 5;
    startX = dragX;

    if (x + dragShift > 0 || x + dragShift < maximum) {
      x += easing;
    } else {
      x += dragShift;
    }

    moveSlide();
  }

  function stopDrag() {
    if (x > 0) {
      x = 0;
    } else if (x < maximum) {
      x = maximum;
    }
    moveSlide();

    document.removeEventListener("touchmove", dragging);
  }

  function moveToLeft() {
    if (x + slideSize > 0) x = 0;
    else x += slideSize;

    moveSlide();
  }

  function moveToRight() {
    if (x - slideSize <= maximum) x = maximum;
    else x -= slideSize;

    moveSlide();
  }

  function moveSlide() {
    changeDisableNav();
    setStylePosition();
  }

  function changeDisableNav() {
    if (x >= 0) {
      sliderBtnPrev.current.classList.add(btnDisabledClassName);
    } else if (maximum != 0) {
      sliderBtnPrev.current.classList.remove(btnDisabledClassName);
    }

    if (x <= maximum) {
      sliderBtnNext.current.classList.add(btnDisabledClassName);
    } else if (maximum != 0) {
      sliderBtnNext.current.classList.remove(btnDisabledClassName);
    }
  }

  function setStylePosition() {
    sliderTrack.current.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function setStyleTransition() {
    sliderTrack.current.style.transition = "all 0.3s linear 0s";
  }

  function removeStyleTransition() {
    sliderTrack.current.style.transition = null;
  }

  const sliderItems = sliderItemsContent.map((item, i) => (
    <SliderItem key={i} width={slideItemWidth}>
      {item}
    </SliderItem>
    // <SliderItem key={i} item={item} width={slideItemWidth} />
  ));

  return (
    <div ref={slider} className="slider">
      <h2 className="slider__title">{title}</h2>
      <div ref={sliderListContainer} className="slider-list-container">
        <SliderButton
          btnRef={sliderBtnPrev}
          classN={"prev"}
          img={imgArrowLeft}
        />
        <SliderContainer
          sliderItems={sliderItems}
          sliderList={sliderList}
          sliderTrack={sliderTrack}
          sliderListContainer={sliderListContainer}
        />
        <SliderButton
          btnRef={sliderBtnNext}
          classN={"next"}
          img={imgArrowRight}
        />
      </div>
    </div>
  );
};

export default Slider;
