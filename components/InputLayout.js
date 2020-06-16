import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { tintColor } from "../constants/Colors";

const InputLayout = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    ></TextInput>
  );
};

export default InputLayout;

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    backgroundColor: "white",
    height: 40,
    borderRadius: 2,
    padding: 10,
    borderColor: tintColor,
    borderWidth: 2,
  },
});
