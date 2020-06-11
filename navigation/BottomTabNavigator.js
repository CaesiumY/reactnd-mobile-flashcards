import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import AddDeckScreen from "../screens/AddDeckScreen";
import Colors from "../constants/Colors";
import DeckScreen from "../screens/DeckScreen";

const BottomTab = createBottomTabNavigator();
const DeckStack = createStackNavigator();

function DeckStackScreen() {
  return (
    <DeckStack.Navigator initialRouteName="Home" headerMode="screen">
      <DeckStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <DeckStack.Screen
        name="Deck"
        component={DeckScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </DeckStack.Navigator>
  );
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator
      initialRouteName="Decks"
      tabBarOptions={{
        activeTintColor: Colors.tabIconSelected,
      }}
    >
      <BottomTab.Screen
        name="Decks"
        component={DeckStackScreen}
        options={{
          title: "Decks",
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
