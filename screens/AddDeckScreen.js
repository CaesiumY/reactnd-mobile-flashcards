import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import TextButton from "../components/TextButton";
import InputLayout from "../components/InputLayout";
import { connect } from "react-redux";
import { createDeck } from "../actions";

export class AddDeckScreen extends Component {
  state = {
    value: "",
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const { value } = this.state;

    dispatch(createDeck(value));

    // TODO - save title to asyncStorage

    console.log("value:", this.state.value);
    this.setState({ value: "" });
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
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
});

const mapStateToProps = (decks) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(AddDeckScreen);
