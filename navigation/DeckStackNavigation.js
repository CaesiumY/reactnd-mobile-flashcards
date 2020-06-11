import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DeckScreen } from "../screens/DeckScreen";
import { connect } from "react-redux";

const DeckStack = createStackNavigator();

const DeckStackNavigation = (props) => {
  // navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  console.log(props);

  return (
    <DeckStack.Navigator initialRouteName="Home" headerMode="screen">
      <DeckStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <DeckStack.Screen
        name="Deck"
        component={DeckScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      /> */}
    </DeckStack.Navigator>
  );
};

// function getHeaderTitle(route) {
//   const routeName =
//     route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

//   switch (routeName) {
//     case "Deck":
//       return "How to get started";
//     case "Home":
//       return "Home";
//   }
// }

export default connect()(DeckStackNavigation);
