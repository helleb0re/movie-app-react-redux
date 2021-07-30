import React from "react";

import MovieListItem from "../movie-list-item";
import Slider from "../slider-components/slider";
import MoreBtn from "../more-btn";

import { genresObj } from "../../genresObj";

import questionMark from "../../images/question-mark.png";

const MovieListSlider = ({ moviesArr, genreId, title = "" }) => {
  let configuredMoviesArr = moviesArr.map(
    ({ id, title, release_date, vote_average, vote_count, poster_path }) => (
      <MovieListItem
        key={id}
        id={id}
        title={title}
        release_date={release_date}
        vote_average={vote_average}
        vote_count={vote_count}
        poster_path={
          poster_path
            ? "https://image.tmdb.org/t/p/w500" + poster_path
            : questionMark
        }
      />
    )
  );

  if (!title) {
    const link = `/movies&with_genre=${genreId}`;
    configuredMoviesArr.push(<MoreBtn link={link} />);
  }

  return (
    <div className="items">
      <Slider
        sliderItemsContent={configuredMoviesArr}
        itemSize={230}
        title={title ? title : genresObj[genreId]}
      />
    </div>
  );
};

export default MovieListSlider;
