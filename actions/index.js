export const GET_DECKS_DATA = "GET_DECKS_DATA";
export const GET_DECK = "GET_DECK";

export const CREATE_DECK = "CREATE_DECK";
export const CREATE_QUESTION = "CREATE_QUESTION";

export function getDecksData() {
  return {
    type: GET_DECKS_DATA,
  };
}

export function getDeck(id) {
  return {
    type: GET_DECK,
    id,
  };
}

export function createDeck(title) {
  return {
    type: CREATE_DECK,
    title,
  };
}

export function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question,
  };
}
