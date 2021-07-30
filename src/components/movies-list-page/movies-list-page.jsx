import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withMovieService } from "../hoc";
import { fetchMoviesByGenre } from "../../actions";

import { Container } from "../help-components";
import MovieListItem from "../movie-list-item";
import Spinner from "../spinner";

import { genresObj } from "../../genresObj";
import questionMark from "../../images/question-mark.png";

import { objHaveProperty } from "../help-functions";

import "./movies-list-page.css";

const MoviesListPage = ({
  genreId,
  categories,
  loading,
  error,
  fetchMoviesByGenre,
}) => {
  const pageIsNotEmpty = objHaveProperty(categories);
  useEffect(() => {
    window.scrollTo(0, 0);
    window.onunload = function () {
      window.scrollTo(0, 0);
    };
    fetchMoviesByGenre(genreId, pageIsNotEmpty ? 2 : 1);
  }, []);

  if (loading && !pageIsNotEmpty) {
    return (
      <section className="movie-page">
        <Container>
          <Spinner />
        </Container>
      </section>
    );
  }

  const title = genresObj[genreId];
  const { data, page, total_pages } = categories[genreId];
  let configuredMoviesArr = data.map(
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
  return (
    <section className="movies-list-page">
      <Container>
        <h2 className="movies-list-page__title">{title}</h2>
        <div className="movies-list-page__grid">{configuredMoviesArr}</div>
        {loading ? <Spinner /> : null}
        {page + 1 > total_pages ? null : (
          <button
            className="movies-list-page__btn-more"
            onClick={() => {
              fetchMoviesByGenre(genreId, page + 1);
            }}
          >
            More movies
          </button>
        )}
      </Container>
    </section>
  );
};

const mapStateToProps = ({ movies: { categories, loading, error } }) => {
  return {
    categories,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, { movieService }) => {
  return {
    fetchMoviesByGenre: (genreId, page) => {
      return fetchMoviesByGenre(dispatch, movieService)(genreId, page);
    },
  };
};

export default compose(
  withMovieService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MoviesListPage);
