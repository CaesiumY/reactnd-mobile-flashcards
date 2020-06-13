import {
  GET_DECKS_DATA,
  GET_DECK,
  CREATE_DECK,
  CREATE_QUESTION,
  DELETE_DECK,
} from "../actions";
import { sampleState } from "../utils/helpers";

function decks(state = sampleState, action) {
  const { decks, id, title, question } = action;
  switch (action.type) {
    case GET_DECKS_DATA:
      return {
        ...state,
        ...decks,
      };
    case GET_DECK:
      return state[id];
    case CREATE_DECK:
      return {
        ...state,
        [title]: {
          title: title,
          questions: [],
        },
      };
    case CREATE_QUESTION:
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [
            ...state[title].questions,
            {
              question: question.question,
              answer: question.answer,
            },
          ],
        },
      };

    case DELETE_DECK:
      delete state[action.title];
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default decks;
