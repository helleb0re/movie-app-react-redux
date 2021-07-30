import React from "react";
import { MovieServiceConsumer } from "../movie-service-context";

const withMovieService = () => (Wrapped) => {
  return (props) => {
    return (
      <MovieServiceConsumer>
        {(movieService) => {
          return <Wrapped {...props} movieService={movieService} />;
        }}
      </MovieServiceConsumer>
    );
  };
};

export default withMovieService;
