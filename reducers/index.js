import {
  GET_DECKS_DATA,
  GET_DECK,
  CREATE_DECK,
  CREATE_QUESTION,
} from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS_DATA:
      return state;
    case GET_DECK:
      return state;
    case CREATE_DECK:
      return state;
    case CREATE_QUESTION:
      return state;

    default:
      return state;
  }
}

export default decks;
