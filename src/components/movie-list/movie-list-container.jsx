import React, { useState } from "react";
import { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  fetchMainPageData,
} from "../../actions";
import { withMovieService } from "../hoc";

import ErrorIndicator from "../error-indicator";
import { Container } from "../help-components";
import Spinner from "../spinner";
import MainSlider from "../main-slider-components/main-slider";
import MovieListSlider from "./movie-list-slider";

import { genresObj } from "../../genresObj";

import "./movie-list.css";

const MovieListContainer = ({

  fetchMainPageData,
  categories,
  nowPlaying,
  loading,
  error,
}) => {
  useEffect(() => {
    fetchMainPageData(Object.keys(genresObj));
  }, []);

  if (error) {
    return <ErrorIndicator />;
  }

  if (loading) {
    return (
      <section>
        <Container>
          <Spinner />
        </Container>
      </section>
    );
  }
  const listsOfMovies = Object.entries(categories).map((item, i) => {
    const { data } = item[1];

    return <MovieListSlider key={i} moviesArr={data} genreId={item[0]} />;
  });

  console.log(nowPlaying);

  return (
    <section>
      <Container>
        <MainSlider data={nowPlaying} />
        {listsOfMovies}
      </Container>
    </section>
  );
};

const mapStateToProps = ({
  movies: { categories, loading, error, nowPlaying },
}) => {
  return {
    nowPlaying,
    categories,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch, { movieService }) => {
  return {
    fetchMainPageData: (genreIdArr) => {
      return fetchMainPageData(dispatch, movieService)(genreIdArr);
    },
  };
};

export default compose(
  withMovieService(),
  connect(mapStateToProps, mapDispatchToProps)
)(MovieListContainer);
