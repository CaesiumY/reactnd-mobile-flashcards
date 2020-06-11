import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";

import useCachedResources from "./hooks/useCachedResources";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import StatusBarComponent from "./components/StatusBarComponent";

const store = createStore(reducer);

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        {/* <StatusBarComponent barStyle="light-content"></StatusBarComponent> */}
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <BottomTabNavigator />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
