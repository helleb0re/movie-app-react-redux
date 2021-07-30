import React from "react";
import LinkComponent from "../../link-component";

import "./main-slider-item.css";

const MainSliderItem = ({ item, active = false }) => {
  const { backdrop_path, title, overview, id } = item;

  return (
    <div className={`main-slider__item ${active ? "active" : ""}`}>
      <LinkComponent to={`/movie/${id}`}>
        <img
          className="main-slider__item-picture"
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          alt="picture"
        />
      </LinkComponent>
      <div className="main-slider__text-content">
        <h1 title={title} className="main-slider__item-title">
          {title}
        </h1>
        <p className="main-slider__item-overview">{overview}</p>
      </div>
    </div>
  );
};

export default MainSliderItem;
