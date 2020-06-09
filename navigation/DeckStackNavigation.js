import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const DeckStack = createStackNavigator();

const DeckStackNavigation = ({ navigation, route }) => {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <DeckStack.Navigator>
      <DeckStack.Screen name="deck" component={} />
    </DeckStack.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Decks":
      return "How to get started";
    case "Add":
      return "Add a New Deck";
  }
}

export default DeckStackNavigation;
