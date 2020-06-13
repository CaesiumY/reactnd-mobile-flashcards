import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { tintColor } from "../constants/Colors";

const TextButton = ({ children, onPress, color }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color ? color : tintColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 3,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
  },
});
