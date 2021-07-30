import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import MovieService from "./services/movie-service";
import { MovieServiceProvider } from "./components/movie-service-context";

import store from "./store";

import "./main.css";

const movieService = new MovieService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <MovieServiceProvider value={movieService}>
        <Router>
          <App />
        </Router>
      </MovieServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
