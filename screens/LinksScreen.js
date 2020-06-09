import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import TextButton from "../components/TextButton";
import InputLayout from "../components/InputLayout";

export class LinksScreen extends Component {
  state = {
    value: "",
  };

  onChangeText = (value) => {
    console.log("LinksScreen -> onChangeText -> value", value);
    this.setState({ value });
  };

  onSubmit = () => {
    // TODO - save title to asyncStorage

    console.log(this.state.value);
    this.props.navigation.navigate("Decks");
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <InputLayout
            placeholder="Deck Title"
            onChangeText={this.onChangeText}
            value={this.state.value}
          ></InputLayout>
        </View>
        <TextButton onPress={this.onSubmit}>Create</TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default LinksScreen;
