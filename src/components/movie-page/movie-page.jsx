import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { fetchMovieDetails } from "../../actions";
import { withMovieService } from "../hoc";

import { Container } from "../help-components";
import Slider from "../slider-components/slider";
import CastListItem from "../cast-list-item";
import { MovieListSlider } from "../movie-list";
import ModalWindow from "../modal-window/modal-window";
import YouTubeVideoComponent from "../youtube-video-component";
import Spinner from "../spinner/spinner";

import { convertVoteAverage } from "../help-functions";

import starSrc from "../../images/star.svg";
import questionMark from "../../images/question-mark.png";

import "./movie-page.css";

const MoviePage = ({
  movieId,
  fetchMovieDetails,
  movieDetails,
  loading,
  error,
}) => {
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, []);

  if (loading) {
    return (
      <section className="movie-page">
        <Container>
          <Spinner />
        </Container>
      </section>
    );
  }

  const {
    genres,
    overview,
    poster_path,
    release_date,
    runtime,
    title,
    vote_average,
    videos: { results: videoResults },
    credits: { cast },
    recommendations: { results: recommendationResults },
  } = movieDetails;

  const releaseDate = release_date.replace(/-/g, ".");
  const genresStr = genres
    .slice(0, 2)
    .map((item) => item.name)
    .join(", ");

  let trailer = null;

  if (videoResults.length) {
    trailer = videoResults[0];
  }

  let voteAverage = convertVoteAverage(vote_average);

  const img = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : questionMark;

  return (
    <>
      <section className="movie-page">
        <Container>
          <div className="movie-page__preview">
            <div className="movie-page__poster-container">
              <img className="movie-page__poster" src={img} />
            </div>
            <div className="movie-page__text-container">
              <h2 className="movie-page__title">{title}</h2>
              <div className="movie-page__vote-container">
                <img
                  className="movie-page__vote-img"
                  src={starSrc}
                  alt="vote average"
                />
                <span className="movie-page__vote-text">{voteAverage}/10</span>
              </div>
              <div className="movie-page__card-container">
                <span className="movie-page__card">{releaseDate}</span>
                {runtime ? (
                  <span className="movie-page__card">{runtime} m</span>
                ) : null}
                {genresStr ? (
                  <span className="movie-page__card">{genresStr}</span>
                ) : null}
                {trailer ? (
                  <button
                    className="movie-page__card-button"
                    onClick={() => setModalActive(true)}
                  >
                    &#9658; Play trailer
                  </button>
                ) : null}
              </div>
              <div className="movie-page__overview-container">
                <h5 className="movie-page__overview-title">Overview</h5>
                <p className="movie-page__overview-text">{overview}</p>
              </div>
            </div>
          </div>
          {cast.length ? (
            <div className="movie-page__cast-slider">
              <Slider
                title={"Cast"}
                sliderItemsContent={cast.map((item) => (
                  <CastListItem item={item} />
                ))}
                itemSize={230}
              />
            </div>
          ) : null}
          {recommendationResults.length ? (
            <MovieListSlider
              title="Recommendations"
              moviesArr={recommendationResults}
            />
          ) : null}
        </Container>
      </section>
      {trailer ? (
        <ModalWindow active={modalActive} setActive={setModalActive}>
          <YouTubeVideoComponent
            trailerKey={trailer.key}
            active={modalActive}
          />
        </ModalWindow>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ movies: { movieDetails, loading, error } }) => {
  return {
    movieDetails,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, { movieService }) => {
  return {
    fetchMovieDetails: (movieId) => {
      return fetchMovieDetails(dispatch, movieService)(movieId);
    },
  };
};

export default compose(
  withMovieService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MoviePage);
