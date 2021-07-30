import React, { useEffect, useRef, useState } from "react";
import MainSliderContainer from "../main-slider-container";
import MainSliderItem from "../main-slider-item";

import { debounce } from "../help-function";

import "./main-slider.css";

const MainSlider = ({ data }) => {
  const sliderList = useRef(null);
  const sliderTrack = useRef(null);
  const sliderBtnPrev = useRef(null);
  const sliderBtnNext = useRef(null);
  const slider = useRef(null);

  let startX = 0;
  let clickX = 0;
  let endX = 0;
  let slideSize = 0;
  let x = 0;
  let currentSlide = 2;
  let maxSlide = data.length + 1;
  let threshold = 100;
  let changeSlideAvailable = true;

  const debounceSetParameters = debounce(setParameters);

  useEffect(() => {
    const sliderBtnPrevRef = sliderBtnPrev.current;
    const sliderBtnNextRef = sliderBtnNext.current;
    const sliderListRef = sliderList.current;
    const sliderTrackRef = sliderTrack.current;

    setParameters();
    setEvents();

    return () => {
      window.removeEventListener("resize", debounceSetParameters);

      sliderListRef.removeEventListener("touchstart", startDrag);

      sliderTrackRef.removeEventListener("transitionend", transitionEndFunc);

      sliderBtnPrevRef.removeEventListener("click", moveSlidePrev);
      sliderBtnNextRef.removeEventListener("click", moveSlideNext);
    };
  }, []);

  function setParameters() {
    if (window.screen.width >= 1300) {
      sliderBtnPrev.current.style.display = "block";
      sliderBtnNext.current.style.display = "block";
    } else {
      sliderBtnPrev.current.style.display = "none";
      sliderBtnNext.current.style.display = "none";
    }
    slideSize = sliderList.current.clientWidth;

    sliderTrack.current.style.width = `${slideSize * (maxSlide + 3)}px`;

    changeSlide();
  }

  function setEvents() {
    window.addEventListener("resize", debounceSetParameters);

    sliderList.current.addEventListener("touchstart", startDrag);

    sliderTrack.current.addEventListener("transitionend", transitionEndFunc);

    sliderBtnPrev.current.addEventListener("click", moveSlidePrev);
    sliderBtnNext.current.addEventListener("click", moveSlideNext);
  }

  function transitionEndFunc(event) {
    if (event.target === sliderTrack.current) {
      sliderTrack.current.classList.remove("shifting");

      if (currentSlide > maxSlide) {
        sliderTrack.current.children[currentSlide].classList.remove("active");
        currentSlide = 2;
      }

      if (currentSlide < 2) {
        sliderTrack.current.children[currentSlide].classList.remove("active");
        currentSlide = maxSlide;
      }

      changeSlide();
      changeSlideAvailable = true;
    }
  }

  function moveSlideNext() {
    if (changeSlideAvailable) {
      changeSlideAvailable = false;
      sliderTrack.current.children[currentSlide].classList.remove("active");
      sliderTrack.current.classList.add("shifting");
      currentSlide += 1;
      sliderTrack.current.children[currentSlide].classList.add("active");
      if (currentSlide > maxSlide) {
        sliderTrack.current.children[2].classList.add("active");
      }
      changeSlide();
    }
  }

  function moveSlidePrev() {
    if (changeSlideAvailable) {
      changeSlideAvailable = false;
      sliderTrack.current.children[currentSlide].classList.remove("active");
      sliderTrack.current.classList.add("shifting");
      currentSlide -= 1;
      sliderTrack.current.children[currentSlide].classList.add("active");
      if (currentSlide < 2) {
        sliderTrack.current.children[maxSlide].classList.add("active");
      }
      changeSlide();
    }
  }

  function startDrag(event) {
    if (changeSlideAvailable) {
      changeSlideAvailable = false;
      startX = event.touches[0].pageX;
      clickX = startX;

      window.addEventListener("touchmove", dragging);
      window.addEventListener("touchend", stopDrag);
    }
  }

  function dragging(event) {
    sliderTrack.current.classList.add("shifting");
    const dragX = event.touches[0].pageX;
    const dragShift = dragX - startX;
    startX = dragX;

    x += dragShift;

    setStylePosition();
  }

  function stopDrag(event) {
    endX = event.changedTouches[0].pageX;

    const allDragShift = endX - clickX;
    const moveSlide = allDragShift > 0 ? -1 : 1;

    if (Math.abs(allDragShift) >= threshold) {
      sliderTrack.current.children[currentSlide].classList.remove("active");
      currentSlide += moveSlide;
      sliderTrack.current.children[currentSlide].classList.add("active");
      if (currentSlide < 2) {
        sliderTrack.current.children[maxSlide].classList.add("active");
      }
      if (currentSlide > maxSlide) {
        sliderTrack.current.children[2].classList.add("active");
      }
    }

    changeSlide();

    window.removeEventListener("touchmove", dragging);
    window.removeEventListener("touchend", stopDrag);
  }

  function changeSlide() {
    x = -(currentSlide * slideSize);

    setStylePosition();
  }

  function setStylePosition() {
    sliderTrack.current.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  let sliderItems = [<MainSliderItem key={"a"} item={data[data.length - 2]} />];

  sliderItems.push(<MainSliderItem key={"b"} item={data[data.length - 1]} />);

  sliderItems.push(
    ...data.map((item, i) => {
      if (i + 2 === currentSlide) {
        return <MainSliderItem key={i + 1} item={item} active={true} />;
      }
      return <MainSliderItem key={i + 1} item={item} />;
    })
  );

  sliderItems.push(<MainSliderItem key={"c"} item={data[0]} />);

  sliderItems.push(<MainSliderItem key={"d"} item={data[1]} />);

  return (
    <div ref={slider} className="main-slider">
      <MainSliderContainer
        sliderTrack={sliderTrack}
        sliderList={sliderList}
        sliderBtnNext={sliderBtnNext}
        sliderBtnPrev={sliderBtnPrev}
      >
        {sliderItems}
      </MainSliderContainer>
    </div>
  );
};

export default MainSlider;
