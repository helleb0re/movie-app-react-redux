import { API_CONFIG } from "./config";
import { getDate } from "../components/help-functions";

export default class MovieService {
  async getMoviesNowPlaying() {
    const response = await fetch(getConfiguredUrl("movie/now_playing"));
    return await response.json();
  }

  async getMoviesByGenre(genreId, page = 1) {
    const response = await fetch(
      getConfiguredUrl("discover/movie", [
        `&with_genres=${genreId}`,
        `&primary_release_date.lte=${getDate()}`,
        `&page=${page}`,
      ])
    );
    return await response.json();
  }

  async getAllGenres() {
    const response = await fetch(getConfiguredUrl("genre/movie/list"));
    return await response.json();
  }

  async getMovieDetails(movieId) {
    const response = await fetch(
      getConfiguredUrl(`movie/${movieId}`, [
        "&append_to_response=videos,credits,recommendations",
      ])
    );
    return await response.json();
  }

  async getActorDetails(actorId) {
    const response = await fetch(
      getConfiguredUrl(`person/${actorId}`, [
        "&append_to_response=movie_credits",
      ])
    );

    return await response.json();
  }
}

function getConfiguredUrl(mainAddress, queryParams = []) {
  return (
    API_CONFIG.url +
    mainAddress +
    `?api_key=${API_CONFIG.apiKey}` +
    queryParams.join("")
  );
}
