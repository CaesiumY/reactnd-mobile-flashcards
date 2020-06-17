import AsyncStorage from "@react-native-community/async-storage";

const DATABASE_KEY = "flash:decks";

export const getDecks = () => {
  // TODO - return all decks
  return AsyncStorage.getItem(DATABASE_KEY);
};

export const getDeck = (id) => {
  return AsyncStorage.getItem(DATABASE_KEY).then((result) => {
    const parsed = JSON.parse(result);
    return parsed[id];
  });
};

export const saveDeckTitle = (title) => {
  return AsyncStorage.mergeItem(
    DATABASE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
};

export const addCardToDeck = (title, question) => {
  return AsyncStorage.getItem(DATABASE_KEY).then((results) => {
    let state = JSON.parse(results);
    state = {
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

    AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(state));
  });
};

export const removeDeck = (title) => {
  return AsyncStorage.getItem(DATABASE_KEY).then((results) => {
    const parsed = JSON.parse(results);
    delete parsed[title];
    AsyncStorage.setItem(DATABASE_KEY, JSON.stringify(parsed));
  });
};
