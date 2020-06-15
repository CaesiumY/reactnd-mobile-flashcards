import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { tintColor } from "../constants/Colors";
import Constants from "expo-constants";

const StatusBarComponent = ({ ...props }) => {
  return (
    <View style={styles.statusContainer}>
      <StatusBar translucent backgroundColor={tintColor} {...props}></StatusBar>
    </View>
  );
};

export default StatusBarComponent;

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: tintColor,
    height: Constants.statusBarHeight,
  },
});
