import updateMovies from "./movies";
import updatePerson from "./person";

const reducer = (state, action) => {
  const res = {
    movies: updateMovies(state, action),
    person: updatePerson(state, action),
  };
  return res;
};

export default reducer;
