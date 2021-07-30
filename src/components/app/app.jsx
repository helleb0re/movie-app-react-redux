import React from "react";

import { Route, Switch } from "react-router-dom";

import Header from "../header";
import { MovieListContainer } from "../movie-list";
import MoviePage from "../movie-page";
import PeoplePage from "../people-page";
import MoviesListPage from "../movies-list-page";

import "./app.css";

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={MovieListContainer} exact />
        <Route
          path="/movie/:id"
          render={({
            match: {
              params: { id },
            },
          }) => {
            return <MoviePage movieId={id} />;
          }}
        />
        <Route
          path="/people/:id"
          render={({
            match: {
              params: { id },
            },
          }) => {
            return <PeoplePage peopleId={id} />;
          }}
        />
        <Route
          path="/movies&with_genre=:genreId"
          render={({
            match: {
              params: { genreId },
            },
          }) => {
            return <MoviesListPage genreId={genreId} />;
          }}
        />
      </Switch>
    </>
  );
};

export default App;
