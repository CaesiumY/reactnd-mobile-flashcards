import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import TextButton from "../components/TextButton";
import InputLayout from "../components/InputLayout";
import { connect } from "react-redux";
import { createDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";

export class AddDeckScreen extends Component {
  state = {
    value: "",
    errorMessage: "",
  };

  onChangeText = (value) => {
    this.setState({ value });
  };

  onSubmit = () => {
    const { dispatch, titles } = this.props;
    const { value } = this.state;

    if (value === "") {
      return this.setState({
        errorMessage: "Title is empty!",
      });
    }

    if (titles.includes(value)) {
      return this.setState({
        errorMessage: "Title already exists!",
      });
    }

    dispatch(createDeck(value));

    // TODO - save title to asyncStorage
    saveDeckTitle(value);

    this.setState({ value: "", errorMessage: "" });
    this.props.navigation.navigate("Deck", { title: value });
  };

  render() {
    const { value, errorMessage } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <InputLayout
            placeholder="Deck Title"
            onChangeText={this.onChangeText}
            value={value}
          ></InputLayout>
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
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
  errorText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 25,
  },
});

const mapStateToProps = (decks) => {
  const titles = Object.keys(decks);
  return {
    decks,
    titles,
  };
};

export default connect(mapStateToProps)(AddDeckScreen);
