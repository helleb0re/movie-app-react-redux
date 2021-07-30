import React from "react";
import LinkComponent from "../link-component";
import starSrc from "../../images/star.svg";
import { convertVoteCount, convertVoteAverage } from "../help-functions";

import "./movie-list-item.css";

const MovieListItem = ({
  id,
  title,
  vote_average,
  vote_count,
  poster_path,
}) => {
  const vote_countStr = convertVoteCount(vote_count);
  const vote_averageStr = convertVoteAverage(vote_average);

  return (
    <div className="item">
      <LinkComponent to={`/movie/${id}`}>
        <img className="item__poster" src={poster_path} alt="movie poster" />
      </LinkComponent>
      <div className="item__text-content">
        <h5 title={title} className="item__title">
          <LinkComponent to={`/movie/${id}`}>{title}</LinkComponent>
        </h5>
        <div className="item__vote-container">
          <img className="item__star-img" src={starSrc} />
          <span className="item__vote-average">{vote_averageStr}</span>
          <span className="item__vote-count">({vote_countStr})</span>
        </div>
      </div>
    </div>
  );
};

export default MovieListItem;
