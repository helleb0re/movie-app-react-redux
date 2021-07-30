const personDetailsLoaded = (details) => {
  return {
    type: "FETCH_PERSON_DETAILS_SUCCESS",
    payload: { details },
  };
};

const personRequested = () => {
  return {
    type: "FETCH_PERSON_REQUESTED",
  };
};

const personError = (error) => {
  return {
    type: "FETCH_PERSON_FAILURE",
    payload: error,
  };
};

const fetchPersonDetails = (dispatch, movieService) => (actorId) => {
  dispatch(personRequested());
  movieService
    .getActorDetails(actorId)
    .then((data) => dispatch(personDetailsLoaded(data)))
    .catch((err) => dispatch(personError(err)));
};

export { fetchPersonDetails };
