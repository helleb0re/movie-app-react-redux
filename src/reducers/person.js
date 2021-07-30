const updatePerson = (state, action) => {
  if (state === undefined) {
    return {
      personDetails: {},
      loading: true,
      error: null,
    };
  }

  switch (action.type) {
    case "FETCH_PERSON_DETAILS_SUCCESS":
      const { details } = action.payload;
      return {
        ...state.person,
        personDetails: details,
        loading: false,
        error: null,
      };

    case "FETCH_PERSON_REQUESTED":
      return {
        ...state.person,
        loading: true,
        error: null,
      };

    case "FETCH_PERSON_FAILURE":
      return {
        ...state.person,
        loading: true,
        error: action.payload,
      };

    default:
      return state.person;
  }
};

export default updatePerson;
