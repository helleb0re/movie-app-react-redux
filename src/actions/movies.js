const moviesLoaded = (value, section) => {
  return {
    type: "FETCH_NEW_MOVIES_SUCCESS",
    payload: { value, sectionId: section },
  };
};

const movieDetailsLoaded = (details) => {
  return {
    type: "FETCH_MOVIE_DETAILS_SUCCESS",
    payload: { details },
  };
};

const mainPageDataLoaded = (values, section) => {
  return {
    type: "FETCH_MAIN_PAGE_DATA_SUCCESS",
    payload: { values, section },
  };
};

const moviesRequested = () => {
  return {
    type: "FETCH_MOVIES_REQUESTED",
  };
};

const moviesError = (error) => {
  return {
    type: "FETCH_MOVIES_FAILURE",
    payload: error,
  };
};

const fetchMoviesByGenre = (dispatch, movieService) => (genreId, page) => {
  dispatch(moviesRequested());
  movieService
    .getMoviesByGenre(genreId, page)
    .then((value) => dispatch(moviesLoaded(value, genreId)))
    .catch((err) => dispatch(moviesError(err)));
};

const fetchMovieDetails = (dispatch, movieService) => (movieId) => {
  dispatch(moviesRequested());
  movieService
    .getMovieDetails(movieId)
    .then((data) => dispatch(movieDetailsLoaded(data)))
    .catch((err) => dispatch(moviesError(err)));
};

const fetchMainPageData = (dispatch, movieService) => (genreIdArr) => {
  dispatch(moviesRequested());
  Promise.all([
    ...genreIdArr.map((genreId) =>
      (async function (genreId, movieService) {
        return await movieService.getMoviesByGenre(genreId);
      })(genreId, movieService)
    ),
    (async function (movieService) {
      return await movieService.getMoviesNowPlaying();
    })(movieService),
  ])
    .then((values) => {
      dispatch(mainPageDataLoaded(values, genreIdArr));
    })
    .catch((err) => dispatch(moviesError(err)));
};

export {
  fetchMoviesByGenre,
  fetchMovieDetails,
  fetchMainPageData,
};
