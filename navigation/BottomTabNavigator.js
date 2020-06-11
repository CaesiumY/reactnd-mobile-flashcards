import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import Colors from "../constants/Colors";
import DeckStackNavigation from "./DeckStackNavigation";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: Colors.tabIconSelected,
      }}
    >
      <BottomTab.Screen
        name="Decks"
        component={DeckStackNavigation}
        options={{
          title: "Decks",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-bookmarks" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-bookmarks" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={AddDeckScreen}
        options={{
          title: "Add a Deck",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-bookmark" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
