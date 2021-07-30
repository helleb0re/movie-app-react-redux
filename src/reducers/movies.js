import { objHaveProperty } from "../components/help-functions";

const updateMovies = (state, action) => {
  if (state === undefined) {
    return {
      categories: {},
      movieDetails: {},
      nowPlaying: [],
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case "FETCH_MOVIES_REQUESTED":
      return {
        ...state.movies,
        loading: true,
        error: null,
      };

    case "FETCH_MOVIES_FAILURE":
      return {
        ...state.movies,
        loading: true,
        error: action.payload,
      };

    case "FETCH_MAIN_PAGE_DATA_SUCCESS":
      let { values: mainPageData, section } = action.payload;
      const moviesByGenre = mainPageData.slice(0, mainPageData.length - 1);

      const newCategories = moviesByGenre.reduce((acc, item, i) => {
        acc[section[i]] = {
          data: item.results,
          page: item.page,
          totalPage: item.total_pages,
        };
        return acc;
      }, {});

      const nowPlayingArr = mainPageData[mainPageData.length - 1].results;

      return {
        ...state.movies,
        categories: {
          ...state.movies.categories,
          ...newCategories,
        },
        nowPlaying: nowPlayingArr,
        loading: false,
        error: null,
      };

    case "FETCH_MOVIE_DETAILS_SUCCESS":
      const { details } = action.payload;
      return {
        ...state.movies,
        movieDetails: details,
        loading: false,
        error: null,
      };

    case "FETCH_NEW_MOVIES_SUCCESS":
      const {
        value: { results, page, total_pages },
        sectionId,
      } = action.payload;

      const { categories } = state.movies;
      let newData;
      if (objHaveProperty(categories)) {
        newData = [...categories[sectionId].data, ...results];
      } else {
        newData = [...results];
      }

      return {
        ...state.movies,
        categories: {
          ...categories,
          [sectionId]: {
            page,
            total_pages,
            data: newData,
          },
        },
        loading: false,
        error: null,
      };

    default:
      return state.movies;
  }
};

export default updateMovies;
